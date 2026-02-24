/**
 * Arcanea Skill-Rules Runtime Engine
 *
 * Loads skill-rules.json and provides real-time intent matching,
 * Guardian routing, and execution tracking. This is the bridge
 * between the declarative skill-rules metadata and the live
 * orchestrator pipeline.
 *
 * Activation Protocol (from skill-rules.json):
 * 1. Scan input for keyword matches (case-insensitive)
 * 2. Check active file paths against filePatterns (glob matching)
 * 3. Check if any registered command was invoked
 * 4. Collect matches, deduplicate by skill name
 * 5. Sort by priority: critical > high > medium > low
 * 6. Enforce maxConcurrent limit
 * 7. Always include alwaysActive skills
 * 8. Apply cascade rules
 * 9. Log activation with Guardian name
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

// --- Types ---

export interface SkillRule {
  id: string;
  skill: string;
  skillPath: string;
  guardian: string;
  gate: string;
  frequency: string;
  priority: "critical" | "high" | "medium" | "low";
  description: string;
  triggers: {
    keywords: string[];
    filePatterns: string[];
    commands: string[];
  };
  activationMessage: string;
}

export interface GuardianEntry {
  gate: string;
  frequency: string;
  godbeast: string;
  domain: string;
  rules: string[];
}

export interface CascadeRule {
  when: string;
  also: string;
  reason: string;
}

export interface SkillRulesConfig {
  maxConcurrent: number;
  priorityOrder: string[];
  alwaysActive: string[];
  defaultGuardian: string;
  defaultGate: string;
  conflictResolution: string;
  cascadeEnabled: boolean;
}

export interface SkillRulesFile {
  version: string;
  schema: string;
  config: SkillRulesConfig;
  rules: SkillRule[];
  guardianIndex: Record<string, GuardianEntry>;
  activationProtocol: {
    steps: string[];
    cascadeRules: CascadeRule[];
  };
}

export interface MatchResult {
  rule: SkillRule;
  matchType: "keyword" | "filePattern" | "command";
  matchedOn: string;
  score: number;
}

export interface ActivationResult {
  activated: SkillRule[];
  guardian: string;
  gate: string;
  frequency: string;
  cascaded: string[];
  reasoning: string;
  timestamp: Date;
}

export interface ExecutionLog {
  id: string;
  activation: ActivationResult;
  startedAt: Date;
  completedAt?: Date;
  success?: boolean;
  feedback?: "positive" | "negative" | "neutral";
}

// --- Priority weights ---
const PRIORITY_WEIGHT: Record<string, number> = {
  critical: 1000,
  high: 100,
  medium: 10,
  low: 1,
};

// --- Engine ---

export class SkillRulesEngine {
  private rules: SkillRule[] = [];
  private config: SkillRulesConfig;
  private guardianIndex: Record<string, GuardianEntry> = {};
  private cascadeRules: CascadeRule[] = [];
  private executionLog: ExecutionLog[] = [];
  private loaded = false;

  constructor(private rulesPath?: string) {
    this.config = {
      maxConcurrent: 3,
      priorityOrder: ["critical", "high", "medium", "low"],
      alwaysActive: [],
      defaultGuardian: "Shinkami",
      defaultGate: "Source",
      conflictResolution: "highest-priority-wins",
      cascadeEnabled: true,
    };
  }

  /**
   * Load skill-rules.json from disk
   */
  load(path?: string): void {
    const filePath =
      path ||
      this.rulesPath ||
      join(process.cwd(), ".claude", "skill-rules.json");

    if (!existsSync(filePath)) {
      console.warn(`[SkillRulesEngine] Rules file not found: ${filePath}`);
      return;
    }

    try {
      const raw = readFileSync(filePath, "utf-8");
      const data: SkillRulesFile = JSON.parse(raw);

      this.rules = data.rules;
      this.config = { ...this.config, ...data.config };
      this.guardianIndex = data.guardianIndex || {};
      this.cascadeRules = data.activationProtocol?.cascadeRules || [];
      this.loaded = true;
    } catch (err) {
      console.error(`[SkillRulesEngine] Failed to load rules:`, err);
    }
  }

  /**
   * Step 1-3: Match input against all rules
   */
  matchRules(
    input: string,
    context?: { filePaths?: string[]; command?: string }
  ): MatchResult[] {
    if (!this.loaded) this.load();

    const lower = input.toLowerCase();
    const results: MatchResult[] = [];

    for (const rule of this.rules) {
      // Step 1: Keyword matching
      for (const keyword of rule.triggers.keywords) {
        if (lower.includes(keyword.toLowerCase())) {
          results.push({
            rule,
            matchType: "keyword",
            matchedOn: keyword,
            score:
              PRIORITY_WEIGHT[rule.priority] +
              keyword.split(" ").length, // longer phrases score higher
          });
          break; // one keyword match per rule is enough
        }
      }

      // Step 2: File pattern matching
      if (context?.filePaths) {
        for (const pattern of rule.triggers.filePatterns) {
          const regex = globToRegex(pattern);
          for (const fp of context.filePaths) {
            if (regex.test(fp)) {
              results.push({
                rule,
                matchType: "filePattern",
                matchedOn: `${pattern} → ${fp}`,
                score: PRIORITY_WEIGHT[rule.priority] + 5, // file matches get bonus
              });
              break;
            }
          }
        }
      }

      // Step 3: Command matching
      if (context?.command) {
        for (const cmd of rule.triggers.commands) {
          if (
            context.command === cmd ||
            context.command.startsWith(cmd + " ")
          ) {
            results.push({
              rule,
              matchType: "command",
              matchedOn: cmd,
              score: PRIORITY_WEIGHT[rule.priority] + 50, // command matches are high confidence
            });
            break;
          }
        }
      }
    }

    return results;
  }

  /**
   * Steps 4-9: Full activation pipeline
   */
  activate(
    input: string,
    context?: { filePaths?: string[]; command?: string }
  ): ActivationResult {
    const matches = this.matchRules(input, context);

    // Step 4: Deduplicate by skill name (keep highest score)
    const bySkill = new Map<string, MatchResult>();
    for (const match of matches) {
      const existing = bySkill.get(match.rule.skill);
      if (!existing || match.score > existing.score) {
        bySkill.set(match.rule.skill, match);
      }
    }

    // Step 5: Sort by priority (score descending)
    let sorted = Array.from(bySkill.values()).sort(
      (a, b) => b.score - a.score
    );

    // Step 7: Always include alwaysActive skills
    for (const skillName of this.config.alwaysActive) {
      if (!bySkill.has(skillName)) {
        const rule = this.rules.find((r) => r.skill === skillName);
        if (rule) {
          sorted.push({
            rule,
            matchType: "keyword",
            matchedOn: "alwaysActive",
            score: PRIORITY_WEIGHT[rule.priority],
          });
        }
      }
    }

    // Step 6: Enforce maxConcurrent
    const activated = sorted.slice(0, this.config.maxConcurrent);
    const activatedRules = activated.map((m) => m.rule);

    // Step 8: Apply cascade rules
    const cascaded: string[] = [];
    if (this.config.cascadeEnabled) {
      for (const cascade of this.cascadeRules) {
        if (this.shouldCascade(cascade, activatedRules)) {
          const cascadeRule = this.rules.find(
            (r) => r.skill === cascade.also
          );
          if (
            cascadeRule &&
            !activatedRules.find((r) => r.skill === cascade.also)
          ) {
            activatedRules.push(cascadeRule);
            cascaded.push(`${cascade.also} (${cascade.reason})`);
          }
        }
      }
    }

    // Determine primary Guardian (from highest-priority activated rule)
    const primary = activatedRules[0];
    const guardian = primary?.guardian || this.config.defaultGuardian;
    const guardianInfo = this.guardianIndex[guardian];

    // Step 9: Build result
    const reasoning = activated
      .map(
        (m) =>
          `${m.rule.skill} [${m.matchType}: "${m.matchedOn}"] → ${m.rule.guardian}`
      )
      .join("; ");

    return {
      activated: activatedRules,
      guardian,
      gate: guardianInfo?.gate || primary?.gate || this.config.defaultGate,
      frequency:
        guardianInfo?.frequency || primary?.frequency || "1111 Hz",
      cascaded,
      reasoning: reasoning || "No rules matched. Default routing.",
      timestamp: new Date(),
    };
  }

  /**
   * Check if a cascade rule should fire
   */
  private shouldCascade(
    cascade: CascadeRule,
    activated: SkillRule[]
  ): boolean {
    const when = cascade.when.toLowerCase();

    // "any rule with gate X activates"
    const gateMatch = when.match(
      /gate\s+([\w,\s]+(?:or\s+\w+)?)\s+activates/
    );
    if (gateMatch) {
      const gates = gateMatch[1]
        .split(/,\s*|\s+or\s+/)
        .map((g) => g.trim().toLowerCase());
      return activated.some((r) => gates.includes(r.gate.toLowerCase()));
    }

    // "any 3+ rules activate simultaneously"
    const countMatch = when.match(/any\s+(\d+)\+?\s+rules/);
    if (countMatch) {
      return activated.length >= parseInt(countMatch[1], 10);
    }

    // "gate X activates alongside gate Y"
    const alongsideMatch = when.match(
      /gate\s+(\w+)\s+activates\s+alongside\s+gate\s+(\w+)/
    );
    if (alongsideMatch) {
      const gateA = alongsideMatch[1].toLowerCase();
      const gateB = alongsideMatch[2].toLowerCase();
      return (
        activated.some((r) => r.gate.toLowerCase() === gateA) &&
        activated.some((r) => r.gate.toLowerCase() === gateB)
      );
    }

    return false;
  }

  /**
   * Log an execution for RL feedback
   */
  logExecution(activation: ActivationResult): string {
    const id = `exec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.executionLog.push({
      id,
      activation,
      startedAt: new Date(),
    });
    return id;
  }

  /**
   * Record feedback on an execution (for RL training)
   */
  recordFeedback(
    executionId: string,
    feedback: "positive" | "negative" | "neutral"
  ): void {
    const entry = this.executionLog.find((e) => e.id === executionId);
    if (entry) {
      entry.completedAt = new Date();
      entry.feedback = feedback;
      entry.success = feedback === "positive";
    }
  }

  /**
   * Get execution history for a Guardian (for RL analysis)
   */
  getGuardianHistory(guardian: string): ExecutionLog[] {
    return this.executionLog.filter(
      (e) => e.activation.guardian === guardian
    );
  }

  /**
   * Get all execution logs (for ReasoningBank integration)
   */
  getExecutionLogs(): ExecutionLog[] {
    return [...this.executionLog];
  }

  /**
   * Get Guardian info
   */
  getGuardian(name: string): GuardianEntry | undefined {
    return this.guardianIndex[name];
  }

  /**
   * Get all rules for a Guardian
   */
  getRulesForGuardian(guardian: string): SkillRule[] {
    return this.rules.filter((r) => r.guardian === guardian);
  }

  /**
   * Get stats
   */
  getStats(): {
    totalRules: number;
    guardians: number;
    loaded: boolean;
    executions: number;
    positiveRate: number;
  } {
    const withFeedback = this.executionLog.filter((e) => e.feedback);
    const positive = withFeedback.filter(
      (e) => e.feedback === "positive"
    ).length;

    return {
      totalRules: this.rules.length,
      guardians: Object.keys(this.guardianIndex).length,
      loaded: this.loaded,
      executions: this.executionLog.length,
      positiveRate:
        withFeedback.length > 0 ? positive / withFeedback.length : 0,
    };
  }
}

// --- Utilities ---

/**
 * Convert a glob pattern to a regex
 * Supports: *, **, ?, [abc]
 */
function globToRegex(pattern: string): RegExp {
  let regex = pattern
    .replace(/\./g, "\\.")
    .replace(/\*\*/g, "{{GLOBSTAR}}")
    .replace(/\*/g, "[^/]*")
    .replace(/\{\{GLOBSTAR\}\}/g, ".*")
    .replace(/\?/g, "[^/]");

  return new RegExp(`^${regex}$`);
}

// --- Singleton ---

let _instance: SkillRulesEngine | null = null;

export function getSkillRulesEngine(): SkillRulesEngine {
  if (!_instance) {
    _instance = new SkillRulesEngine();
  }
  return _instance;
}
