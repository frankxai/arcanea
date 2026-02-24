/**
 * Voice Enforcer
 *
 * Validates and transforms text to align with the Arcanea Voice Bible.
 * Ensures all output maintains the arcane + authoritative tone.
 */

// ============================================
// VOICE RULES
// ============================================

export interface VoiceRule {
  id: string;
  description: string;
  pattern: RegExp;
  replacement?: string;
  severity: 'error' | 'warning' | 'suggestion';
}

export interface VoiceCheckResult {
  passed: boolean;
  score: number; // 0-100
  violations: VoiceViolation[];
  suggestions: string[];
}

export interface VoiceViolation {
  rule: VoiceRule;
  match: string;
  position: number;
  suggestion: string;
}

/**
 * Canonical voice rules from the Voice Bible v2.0.
 */
export const VOICE_RULES: VoiceRule[] = [
  // Terminology rules
  {
    id: 'term-user',
    description: 'Use "creator" not "user"',
    pattern: /\buser\b/gi,
    replacement: 'creator',
    severity: 'warning',
  },
  {
    id: 'term-ai',
    description: 'Use "intelligence" not "artificial intelligence" or "AI"',
    pattern: /\bartificial intelligence\b/gi,
    replacement: 'intelligence',
    severity: 'suggestion',
  },
  {
    id: 'term-magical',
    description: 'Use "arcane" not "magical" or "mystical"',
    pattern: /\b(magical|mystical)\b/gi,
    replacement: 'arcane',
    severity: 'suggestion',
  },
  {
    id: 'term-mythology',
    description: 'Use "living universe" not "mythology" in user-facing text',
    pattern: /\bmythology\b/gi,
    replacement: 'living universe',
    severity: 'suggestion',
  },
  {
    id: 'term-platform',
    description: 'Arcanea is a "realm" or "universe", not a "platform" or "app"',
    pattern: /\b(platform|app|application|tool)\b/gi,
    severity: 'suggestion',
  },

  // Tone rules
  {
    id: 'tone-condescending',
    description: 'Avoid condescending phrases',
    pattern: /\b(simply|just|obviously|basically|easy|trivial)\b/gi,
    severity: 'warning',
  },
  {
    id: 'tone-weak',
    description: 'Avoid weak language — be definitive',
    pattern: /\b(maybe|perhaps|kind of|sort of|a little bit|somewhat)\b/gi,
    severity: 'suggestion',
  },
  {
    id: 'tone-corporate',
    description: 'Avoid corporate jargon',
    pattern: /\b(synergy|leverage|paradigm shift|stakeholder|deliverable|bandwidth|circle back)\b/gi,
    severity: 'warning',
  },

  // Structure rules
  {
    id: 'structure-exclamation',
    description: 'Limit exclamation marks — use sparingly for genuine emphasis',
    pattern: /!{2,}/g,
    severity: 'warning',
  },
  {
    id: 'structure-emoji-excess',
    description: 'Avoid excessive emoji use',
    pattern: /[\u{1F300}-\u{1F9FF}]{3,}/gu,
    severity: 'warning',
  },
];

// ============================================
// VOICE ENFORCER
// ============================================

export class VoiceEnforcer {
  private rules: VoiceRule[];

  constructor(customRules?: VoiceRule[]) {
    this.rules = customRules || VOICE_RULES;
  }

  /**
   * Check text against voice rules.
   */
  check(text: string): VoiceCheckResult {
    const violations: VoiceViolation[] = [];

    for (const rule of this.rules) {
      const matches = text.matchAll(new RegExp(rule.pattern.source, rule.pattern.flags));
      for (const match of matches) {
        violations.push({
          rule,
          match: match[0],
          position: match.index || 0,
          suggestion: rule.replacement
            ? `Replace "${match[0]}" with "${rule.replacement}"`
            : `Consider rephrasing: ${rule.description}`,
        });
      }
    }

    const errorCount = violations.filter(v => v.rule.severity === 'error').length;
    const warningCount = violations.filter(v => v.rule.severity === 'warning').length;
    const suggestionCount = violations.filter(v => v.rule.severity === 'suggestion').length;

    // Score: start at 100, deduct for violations
    const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 10) - (suggestionCount * 3));

    return {
      passed: errorCount === 0 && warningCount <= 2,
      score,
      violations,
      suggestions: violations
        .filter(v => v.rule.severity === 'suggestion')
        .map(v => v.suggestion),
    };
  }

  /**
   * Auto-fix text by applying replacement rules.
   */
  fix(text: string): string {
    let result = text;
    for (const rule of this.rules) {
      if (rule.replacement) {
        result = result.replace(rule.pattern, rule.replacement);
      }
    }
    return result;
  }

  /**
   * Add custom rules.
   */
  addRule(rule: VoiceRule): void {
    this.rules.push(rule);
  }

  /**
   * Get all active rules.
   */
  getRules(): readonly VoiceRule[] {
    return this.rules;
  }
}
