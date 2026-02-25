/**
 * Vault Classifier — Maps content to the appropriate Starlight Vault
 *
 * Uses keyword matching, pattern analysis, and Guardian context
 * to determine which of the six semantic vaults best fits incoming content.
 */

import type {
  VaultType,
  ClassificationResult,
  ClassificationRule,
  GuardianName,
} from './types.js';

// ── Default Classification Rules ────────────────────────

const CLASSIFICATION_RULES: ClassificationRule[] = [
  {
    vault: 'strategic',
    keywords: [
      'architecture', 'decision', 'roadmap', 'strategy', 'migration',
      'plan', 'phase', 'milestone', 'stakeholder', 'business',
      'revenue', 'partnership', 'positioning', 'market', 'tradeoff',
      'priority', 'scope', 'risk', 'governance', 'objective',
    ],
    patterns: [/ADR-\d+/, /phase \d/i, /milestone/i, /roadmap/i, /strategic/i],
    weight: 0.9,
  },
  {
    vault: 'technical',
    keywords: [
      'pattern', 'algorithm', 'api', 'database', 'typescript', 'react',
      'component', 'endpoint', 'schema', 'query', 'optimization',
      'refactor', 'debug', 'build', 'deploy', 'test', 'config',
      'npm', 'git', 'function', 'class', 'interface', 'module',
      'dependency', 'performance', 'cache', 'index', 'migration',
    ],
    patterns: [
      /function\s+\w+/,
      /class\s+\w+/,
      /import\s+\{/,
      /export\s+(default\s+)?/,
      /npm\s+(run|install|publish)/,
      /\.ts\b/,
      /\.tsx\b/,
      /```\w+/,
    ],
    weight: 0.85,
  },
  {
    vault: 'creative',
    keywords: [
      'voice', 'tone', 'style', 'narrative', 'story', 'brand',
      'design', 'aesthetic', 'color', 'typography', 'animation',
      'ux', 'copy', 'tagline', 'myth', 'lore', 'canon',
      'guardian', 'godbeast', 'element', 'mythology', 'art',
    ],
    patterns: [
      /voice\s+bible/i,
      /brand\s+guide/i,
      /design\s+system/i,
      /canon/i,
      /guardian\s+\w+/i,
    ],
    weight: 0.8,
  },
  {
    vault: 'operational',
    keywords: [
      'session', 'current', 'today', 'now', 'working', 'progress',
      'status', 'todo', 'next', 'blocking', 'context', 'active',
      'recent', 'sprint', 'standup', 'update', 'ticket', 'issue',
    ],
    patterns: [/today/i, /right now/i, /currently/i, /in progress/i, /blocked by/i],
    weight: 0.7,
  },
  {
    vault: 'wisdom',
    keywords: [
      'meta', 'insight', 'lesson', 'principle', 'philosophy',
      'observation', 'recurring', 'universal', 'cross-domain',
      'fundamental', 'always', 'never', 'truth', 'pattern',
      'realization', 'epiphany', 'heuristic', 'axiom',
    ],
    patterns: [
      /lesson learned/i,
      /key insight/i,
      /fundamental/i,
      /principle/i,
      /meta-pattern/i,
      /rule of thumb/i,
    ],
    weight: 0.75,
  },
  {
    vault: 'horizon',
    keywords: [
      'wish', 'future', 'hope', 'dream', 'envision', 'imagine',
      'beautiful', 'benevolent', 'aligned', 'humanity', 'purpose',
      'golden age', 'consciousness', 'aspiration', 'intention',
      'vision', 'better world', 'flourish',
    ],
    patterns: [
      /wish for/i,
      /I hope/i,
      /imagine a/i,
      /in the future/i,
      /golden age/i,
      /good future/i,
      /one day/i,
    ],
    weight: 0.85,
  },
];

// ── Guardian Vault Affinity ─────────────────────────────

/** Maps each Guardian to their preferred vault types (primary first) */
const GUARDIAN_VAULT_AFFINITY: Record<GuardianName, VaultType[]> = {
  'Lyssandria': ['strategic', 'technical'],   // Foundation — structure, infrastructure
  'Leyla':      ['creative', 'operational'],   // Flow — creativity, emotion
  'Draconia':   ['strategic', 'technical'],    // Fire — power, transformation
  'Maylinn':    ['creative', 'wisdom'],        // Heart — connection, healing
  'Alera':      ['creative', 'wisdom'],        // Voice — expression, truth
  'Lyria':      ['wisdom', 'horizon'],         // Sight — vision, intuition
  'Aiyami':     ['wisdom', 'horizon'],         // Crown — enlightenment
  'Elara':      ['strategic', 'horizon'],      // Shift — perspective
  'Ino':        ['operational', 'creative'],   // Unity — partnership
  'Shinkami':   ['wisdom', 'horizon'],         // Source — meta-consciousness
};

// ── Classifier ──────────────────────────────────────────

export class VaultClassifier {
  private rules: ClassificationRule[];

  constructor(customRules?: ClassificationRule[]) {
    this.rules = customRules ?? CLASSIFICATION_RULES;
  }

  /**
   * Classify content into the most appropriate vault.
   *
   * Scoring algorithm:
   * 1. Each keyword match adds `rule.weight` to that vault's score
   * 2. Each pattern match adds `rule.weight * 1.5` (patterns are stronger signals)
   * 3. If a Guardian is provided, their preferred vaults get a +0.5 affinity bonus
   * 4. The vault with the highest total score wins
   * 5. Confidence = top score / total scores (normalized)
   */
  classify(content: string, guardian?: GuardianName): ClassificationResult {
    const scores = new Map<VaultType, number>();
    const contentLower = content.toLowerCase();

    // Score each vault based on keyword and pattern matches
    for (const rule of this.rules) {
      let score = 0;

      // Keyword matching — each keyword in content adds weight
      for (const keyword of rule.keywords) {
        if (contentLower.includes(keyword.toLowerCase())) {
          score += rule.weight;
        }
      }

      // Pattern matching — regex patterns get higher weight
      for (const pattern of rule.patterns) {
        if (pattern.test(content)) {
          score += rule.weight * 1.5;
        }
      }

      scores.set(rule.vault, (scores.get(rule.vault) ?? 0) + score);
    }

    // Apply Guardian affinity bonus
    if (guardian && GUARDIAN_VAULT_AFFINITY[guardian]) {
      for (const preferredVault of GUARDIAN_VAULT_AFFINITY[guardian]) {
        const current = scores.get(preferredVault) ?? 0;
        scores.set(preferredVault, current + 0.5);
      }
    }

    // Find top two vaults
    let topVault: VaultType = 'operational'; // Default fallback
    let topScore = 0;
    let secondVault: VaultType | undefined;
    let secondScore = 0;

    for (const [vault, score] of scores) {
      if (score > topScore) {
        secondVault = topVault;
        secondScore = topScore;
        topVault = vault;
        topScore = score;
      } else if (score > secondScore) {
        secondVault = vault;
        secondScore = score;
      }
    }

    // Normalize confidence to 0-1
    const totalScore = Array.from(scores.values()).reduce((a, b) => a + b, 0);
    const confidence = totalScore > 0 ? topScore / totalScore : 0.5;

    return {
      vault: topVault,
      confidence: Math.min(confidence, 1),
      reasoning: this.buildReasoning(topVault, topScore, guardian),
      alternateVault: secondVault !== topVault ? secondVault : undefined,
    };
  }

  /**
   * Classify with details — returns scores for all vaults for debugging.
   */
  classifyDetailed(
    content: string,
    guardian?: GuardianName,
  ): ClassificationResult & { allScores: Map<VaultType, number> } {
    const result = this.classify(content, guardian);
    // Re-run scoring to capture all scores
    const scores = this.computeScores(content, guardian);
    return { ...result, allScores: scores };
  }

  /**
   * Get the Guardians most associated with a vault type.
   */
  getGuardiansForVault(vault: VaultType): GuardianName[] {
    const guardians: GuardianName[] = [];
    for (const [guardian, vaults] of Object.entries(GUARDIAN_VAULT_AFFINITY)) {
      if (vaults.includes(vault)) {
        guardians.push(guardian as GuardianName);
      }
    }
    return guardians;
  }

  /**
   * Get a Guardian's preferred vault types.
   */
  getVaultsForGuardian(guardian: GuardianName): VaultType[] {
    return GUARDIAN_VAULT_AFFINITY[guardian] ?? [];
  }

  // ── Internal ────────────────────────────────────────────

  private computeScores(content: string, guardian?: GuardianName): Map<VaultType, number> {
    const scores = new Map<VaultType, number>();
    const contentLower = content.toLowerCase();

    for (const rule of this.rules) {
      let score = 0;
      for (const keyword of rule.keywords) {
        if (contentLower.includes(keyword.toLowerCase())) {
          score += rule.weight;
        }
      }
      for (const pattern of rule.patterns) {
        if (pattern.test(content)) {
          score += rule.weight * 1.5;
        }
      }
      scores.set(rule.vault, (scores.get(rule.vault) ?? 0) + score);
    }

    if (guardian && GUARDIAN_VAULT_AFFINITY[guardian]) {
      for (const preferredVault of GUARDIAN_VAULT_AFFINITY[guardian]) {
        const current = scores.get(preferredVault) ?? 0;
        scores.set(preferredVault, current + 0.5);
      }
    }

    return scores;
  }

  private buildReasoning(
    vault: VaultType,
    score: number,
    guardian?: GuardianName,
  ): string {
    const guardianNote = guardian ? ` (Guardian: ${guardian})` : '';
    return `Matched ${vault} vault with score ${score.toFixed(2)}${guardianNote}`;
  }
}
