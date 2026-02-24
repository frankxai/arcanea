import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "fs";
import { join } from "path";

// Test the skill-rules engine logic directly (no TS compilation needed)
// We test the matching algorithm against the actual skill-rules.json

const RULES_PATH = join(process.cwd(), ".claude", "skill-rules.json");

let rulesData;
try {
  rulesData = JSON.parse(readFileSync(RULES_PATH, "utf-8"));
} catch {
  console.log("skill-rules.json not found, skipping tests");
  process.exit(0);
}

const PRIORITY_WEIGHT = { critical: 1000, high: 100, medium: 10, low: 1 };

// Minimal engine reimplementation for testing without TS compilation
function matchRules(input, context = {}) {
  const lower = input.toLowerCase();
  const results = [];

  for (const rule of rulesData.rules) {
    // Keyword matching
    for (const keyword of rule.triggers.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        results.push({
          rule,
          matchType: "keyword",
          matchedOn: keyword,
          score: PRIORITY_WEIGHT[rule.priority] + keyword.split(" ").length,
        });
        break;
      }
    }

    // Command matching
    if (context.command) {
      for (const cmd of rule.triggers.commands) {
        if (context.command === cmd || context.command.startsWith(cmd + " ")) {
          results.push({
            rule,
            matchType: "command",
            matchedOn: cmd,
            score: PRIORITY_WEIGHT[rule.priority] + 50,
          });
          break;
        }
      }
    }
  }

  return results;
}

function activate(input, context = {}) {
  const matches = matchRules(input, context);

  // Deduplicate by skill name (keep highest score)
  const bySkill = new Map();
  for (const match of matches) {
    const existing = bySkill.get(match.rule.skill);
    if (!existing || match.score > existing.score) {
      bySkill.set(match.rule.skill, match);
    }
  }

  // Sort by score descending
  let sorted = Array.from(bySkill.values()).sort((a, b) => b.score - a.score);

  // Always include alwaysActive
  for (const skillName of rulesData.config.alwaysActive) {
    if (!bySkill.has(skillName)) {
      const rule = rulesData.rules.find((r) => r.skill === skillName);
      if (rule) sorted.push({ rule, matchType: "keyword", matchedOn: "alwaysActive", score: PRIORITY_WEIGHT[rule.priority] });
    }
  }

  // Enforce maxConcurrent
  const activated = sorted.slice(0, rulesData.config.maxConcurrent);

  const primary = activated[0];
  return {
    activated: activated.map((m) => m.rule),
    guardian: primary?.rule.guardian || rulesData.config.defaultGuardian,
    gate: primary?.rule.gate || rulesData.config.defaultGate,
    frequency: primary?.rule.frequency || "1111 Hz",
  };
}

// --- Tests ---

describe("Skill Rules JSON Structure", () => {
  it("has valid version and schema", () => {
    assert.equal(rulesData.version, "1.0.0");
    assert.equal(rulesData.schema, "arcanea-skill-rules/v1");
  });

  it("has config with required fields", () => {
    assert.ok(rulesData.config.maxConcurrent);
    assert.ok(rulesData.config.priorityOrder);
    assert.ok(rulesData.config.alwaysActive);
    assert.ok(rulesData.config.defaultGuardian);
  });

  it("has 35 rules", () => {
    assert.equal(rulesData.rules.length, 35);
  });

  it("has 10 Guardians in index", () => {
    assert.equal(Object.keys(rulesData.guardianIndex).length, 10);
  });

  it("every rule has required fields", () => {
    for (const rule of rulesData.rules) {
      assert.ok(rule.id, `Rule missing id`);
      assert.ok(rule.skill, `${rule.id} missing skill`);
      assert.ok(rule.guardian, `${rule.id} missing guardian`);
      assert.ok(rule.gate, `${rule.id} missing gate`);
      assert.ok(rule.frequency, `${rule.id} missing frequency`);
      assert.ok(rule.priority, `${rule.id} missing priority`);
      assert.ok(rule.triggers, `${rule.id} missing triggers`);
      assert.ok(rule.triggers.keywords.length > 0, `${rule.id} has no keywords`);
    }
  });
});

describe("Guardian Frequency Canonicality", () => {
  const CANONICAL = {
    Lyssandria: "174 Hz",
    Leyla: "285 Hz",
    Draconia: "396 Hz",
    Maylinn: "417 Hz",
    Alera: "528 Hz",
    Lyria: "639 Hz",
    Aiyami: "741 Hz",
    Elara: "852 Hz",
    Ino: "963 Hz",
    Shinkami: "1111 Hz",
  };

  it("guardianIndex has correct frequencies", () => {
    for (const [name, expected] of Object.entries(CANONICAL)) {
      const entry = rulesData.guardianIndex[name];
      assert.ok(entry, `Missing guardian: ${name}`);
      assert.equal(entry.frequency, expected, `${name}: expected ${expected}, got ${entry.frequency}`);
    }
  });

  it("individual rules match their Guardian frequency", () => {
    for (const rule of rulesData.rules) {
      const expected = CANONICAL[rule.guardian];
      if (expected) {
        assert.equal(
          rule.frequency,
          expected,
          `${rule.id} (${rule.guardian}): expected ${expected}, got ${rule.frequency}`
        );
      }
    }
  });
});

describe("Keyword Matching", () => {
  it("routes 'database schema' to Lyssandria (Foundation)", () => {
    const result = activate("I need to design a database schema");
    assert.equal(result.guardian, "Lyssandria");
    assert.equal(result.gate, "Foundation");
  });

  it("routes 'deploy production' to Draconia (Fire)", () => {
    const result = activate("We need to deploy to production");
    assert.equal(result.guardian, "Draconia");
  });

  it("routes 'security audit' to Alera (Voice)", () => {
    const result = activate("Run a security audit on the codebase");
    assert.equal(result.guardian, "Alera");
  });

  it("routes 'creative writing' to Leyla (Flow)", () => {
    const result = activate("Help me with creative writing for the story");
    assert.equal(result.guardian, "Leyla");
  });

  it("routes 'ARIA' to Maylinn (Heart)", () => {
    const result = activate("Add ARIA labels for screen reader users");
    assert.equal(result.guardian, "Maylinn");
  });

  it("routes 'roadmap' to Lyria (Sight)", () => {
    const result = activate("Create a roadmap with milestones for next quarter");
    assert.equal(result.guardian, "Lyria");
  });

  it("routes 'glassmorphism' to Aiyami (Crown)", () => {
    const result = activate("Generate glassmorphism visuals for the landing");
    assert.equal(result.guardian, "Aiyami");
  });

  it("routes 'refactor' to Elara (Shift)", () => {
    const result = activate("We should refactor this module");
    assert.equal(result.guardian, "Elara");
  });

  it("routes 'merge branch' to Ino (Unity)", () => {
    const result = activate("Merge this branch and tag a new release");
    assert.equal(result.guardian, "Ino");
  });

  it("routes 'orchestrate' to Shinkami (Source)", () => {
    const result = activate("We need to orchestrate this complex plan");
    assert.equal(result.guardian, "Shinkami");
  });
});

describe("Command Matching", () => {
  it("routes /arcanea command to arcanea-canon", () => {
    const result = activate("", { command: "/arcanea" });
    const skills = result.activated.map((r) => r.skill);
    assert.ok(skills.includes("arcanea-canon"));
  });

  it("routes /luminor command to arcanea-canon", () => {
    const result = activate("", { command: "/luminor" });
    const skills = result.activated.map((r) => r.skill);
    assert.ok(skills.includes("arcanea-canon"));
  });
});

describe("Priority Resolution", () => {
  it("critical rules win over high priority", () => {
    // 'canon' triggers arcanea-canon (critical) AND potentially others
    const result = activate("Check canon lore for the guardian gates");
    assert.equal(result.activated[0].priority, "critical");
  });

  it("respects maxConcurrent limit", () => {
    // A query that matches many rules should be capped
    const result = activate(
      "orchestrate deploy security audit design system writing"
    );
    assert.ok(result.activated.length <= rulesData.config.maxConcurrent);
  });
});

describe("Deduplication", () => {
  it("deduplicates by skill name", () => {
    const result = activate("canon lore guardian lumina nero");
    const skillNames = result.activated.map((r) => r.skill);
    const unique = new Set(skillNames);
    assert.equal(skillNames.length, unique.size, "Duplicate skills found");
  });
});

describe("AlwaysActive Skills", () => {
  it("includes alwaysActive skills even with no match", () => {
    const result = activate("hello world how are you");
    const skills = result.activated.map((r) => r.skill);
    for (const always of rulesData.config.alwaysActive) {
      assert.ok(skills.includes(always), `Missing alwaysActive: ${always}`);
    }
  });
});

describe("Engine Stats", () => {
  it("reports correct rule count", () => {
    assert.equal(rulesData.rules.length, 35);
  });

  it("all Guardian rule references are valid", () => {
    for (const [name, entry] of Object.entries(rulesData.guardianIndex)) {
      for (const ruleId of entry.rules) {
        const found = rulesData.rules.find((r) => r.id === ruleId);
        assert.ok(found, `${name} references non-existent rule: ${ruleId}`);
        assert.equal(
          found.guardian,
          name,
          `${ruleId} assigned to ${name} in index but guardian is ${found.guardian}`
        );
      }
    }
  });
});
