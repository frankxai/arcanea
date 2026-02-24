/**
 * Guardian Router
 *
 * Routes tasks to the appropriate Guardian based on intent analysis.
 * This is the core intelligence that makes Arcanea feel alive —
 * every request flows through the right Gate.
 */

import type { GuardianName, Element } from '../types/mythology.js';
import type { Guardian } from '../types/mythology.js';
import { GUARDIANS } from '../constants/mythology.js';

// ============================================
// ROUTING KEYWORDS
// ============================================

const GUARDIAN_KEYWORDS: Record<GuardianName, string[]> = {
  lyssandria: [
    'architecture', 'database', 'schema', 'infrastructure', 'security',
    'deploy', 'ci/cd', 'pipeline', 'devops', 'docker', 'kubernetes',
    'foundation', 'structure', 'scale', 'performance', 'migration',
    'stability', 'robust', 'production', 'monitoring', 'testing',
    'postgres', 'supabase', 'redis', 'backend', 'server', 'api',
    'config', 'environment', 'setup', 'install', 'build', 'scaffold',
  ],
  leyla: [
    'design', 'ui', 'ux', 'component', 'animation', 'css', 'tailwind',
    'layout', 'responsive', 'mobile', 'accessibility', 'style',
    'color', 'font', 'typography', 'whitespace', 'motion', 'framer',
    'glassmorphism', 'gradient', 'visual', 'aesthetic', 'beautiful',
    'interface', 'interaction', 'flow', 'creative', 'art', 'image',
    'figma', 'prototype', 'wireframe', 'mockup', 'v0',
  ],
  draconia: [
    'performance', 'optimize', 'speed', 'fast', 'execute', 'ship',
    'build', 'launch', 'deploy', 'mvp', 'prototype', 'rapid',
    'power', 'transform', 'refactor', 'rewrite', 'migrate',
    'action', 'do', 'implement', 'create', 'make', 'start',
    'bold', 'ambitious', 'aggressive', 'push', 'force',
  ],
  maylinn: [
    'content', 'copy', 'writing', 'narrative', 'story', 'blog',
    'community', 'user', 'creator', 'onboarding', 'welcome',
    'empathy', 'inclusive', 'accessible', 'tone', 'voice',
    'documentation', 'readme', 'guide', 'tutorial', 'help',
    'communication', 'message', 'notification', 'email', 'social',
    'heart', 'care', 'support', 'heal', 'connect',
  ],
  alera: [
    'api', 'interface', 'contract', 'type', 'typescript', 'naming',
    'documentation', 'jsdoc', 'swagger', 'openapi', 'graphql',
    'truth', 'honest', 'clear', 'explicit', 'transparent',
    'naming', 'convention', 'standard', 'protocol', 'spec',
    'lint', 'format', 'eslint', 'prettier', 'code review',
    'publish', 'npm', 'package', 'export', 'module',
  ],
  lyria: [
    'vision', 'strategy', 'plan', 'roadmap', 'future', 'long-term',
    'pattern', 'insight', 'analyze', 'debug', 'investigate',
    'abstract', 'elegant', 'design pattern', 'architecture decision',
    'intuition', 'why', 'meaning', 'purpose', 'philosophy',
    'oracle', 'predict', 'anticipate', 'foresee', 'trend',
    'ai', 'intelligence', 'model', 'prompt', 'llm',
  ],
  aiyami: [
    'wisdom', 'principle', 'philosophy', 'purpose', 'meaning',
    'holistic', 'system', 'alignment', 'balance', 'harmony',
    'enlighten', 'teach', 'mentor', 'guide', 'advise',
    'cosmic', 'universal', 'transcend', 'higher', 'sacred',
    'meditation', 'mindset', 'consciousness', 'awareness',
  ],
  elara: [
    'refactor', 'restructure', 'rethink', 'alternative', 'different',
    'pivot', 'change', 'shift', 'transform', 'evolve',
    'creative', 'unconventional', 'lateral', 'reverse', 'invert',
    'paradigm', 'assumption', 'challenge', 'question', 'why not',
    'experiment', 'try', 'explore', 'what if', 'brainstorm',
  ],
  ino: [
    'integrate', 'connect', 'bridge', 'sync', 'merge',
    'collaborate', 'team', 'together', 'share', 'partner',
    'monorepo', 'workspace', 'package', 'module', 'dependency',
    'api', 'webhook', 'event', 'pub/sub', 'message queue',
    'mcp', 'sdk', 'plugin', 'extension', 'adapter',
    'cross-platform', 'multi', 'universal', 'unified',
  ],
  shinkami: [
    'meta', 'orchestrate', 'system of systems', 'architecture',
    'framework', 'engine', 'core', 'foundation', 'platform',
    'strategy', 'vision', 'roadmap', 'ecosystem', 'universe',
    'arcanea', 'luminor', 'guardian', 'gate', 'source',
    'origin', 'root', 'everything', 'all', 'complete',
    'ai agent', 'multi-agent', 'swarm', 'orchestration',
  ],
};

// ============================================
// ELEMENT KEYWORDS
// ============================================

const ELEMENT_KEYWORDS: Record<Element, string[]> = {
  fire: ['fast', 'bold', 'power', 'transform', 'energy', 'execute', 'ship', 'launch'],
  water: ['flow', 'creative', 'design', 'feel', 'emotion', 'heal', 'story', 'art'],
  earth: ['stable', 'foundation', 'structure', 'database', 'security', 'robust', 'ground'],
  wind: ['communicate', 'express', 'clear', 'document', 'name', 'api', 'interface', 'free'],
  void: ['vision', 'meta', 'transcend', 'pattern', 'insight', 'cosmic', 'source', 'all'],
};

// ============================================
// ROUTING RESULT
// ============================================

export interface RouteResult {
  guardian: Guardian;
  confidence: number;
  element: Element;
  reasoning: string;
  alternatives: Array<{ guardian: Guardian; confidence: number }>;
}

// ============================================
// GUARDIAN ROUTER CLASS
// ============================================

export class GuardianRouter {
  private keywordMap: Map<string, Array<{ guardian: GuardianName; weight: number }>>;

  constructor() {
    this.keywordMap = new Map();
    this.buildIndex();
  }

  /**
   * Route a task description to the best Guardian.
   */
  route(input: string): RouteResult {
    const normalized = input.toLowerCase();
    const words = normalized.split(/\s+/);
    const scores = new Map<GuardianName, number>();

    // Initialize scores
    for (const g of GUARDIANS) {
      scores.set(g.name, 0);
    }

    // Score by keyword matches
    for (const word of words) {
      const matches = this.keywordMap.get(word);
      if (matches) {
        for (const m of matches) {
          scores.set(m.guardian, (scores.get(m.guardian) || 0) + m.weight);
        }
      }
      // Partial matching for compound words
      for (const [keyword, entries] of this.keywordMap) {
        if (keyword.length > 3 && normalized.includes(keyword)) {
          for (const e of entries) {
            scores.set(e.guardian, (scores.get(e.guardian) || 0) + e.weight * 0.5);
          }
        }
      }
    }

    // Sort by score
    const ranked = Array.from(scores.entries())
      .map(([name, score]) => ({
        guardian: GUARDIANS.find(g => g.name === name)!,
        confidence: score,
      }))
      .sort((a, b) => b.confidence - a.confidence);

    const best = ranked[0];
    const maxScore = Math.max(...ranked.map(r => r.confidence), 1);

    // Normalize confidence to 0-1
    const normalizedConfidence = Math.min(1, best.confidence / Math.max(maxScore, 5));

    // Determine element
    const element = this.detectElement(normalized);

    return {
      guardian: best.guardian,
      confidence: normalizedConfidence,
      element,
      reasoning: this.generateReasoning(best.guardian, normalizedConfidence, input),
      alternatives: ranked.slice(1, 4).map(r => ({
        guardian: r.guardian,
        confidence: Math.min(1, r.confidence / Math.max(maxScore, 5)),
      })),
    };
  }

  /**
   * Route directly to a Guardian by name.
   */
  channel(guardianName: string): Guardian | undefined {
    return GUARDIANS.find(
      g => g.name === guardianName.toLowerCase() ||
           g.displayName.toLowerCase() === guardianName.toLowerCase()
    );
  }

  /**
   * Get all Guardians sorted by relevance to a query.
   */
  rank(input: string): Array<{ guardian: Guardian; confidence: number }> {
    const result = this.route(input);
    return [
      { guardian: result.guardian, confidence: result.confidence },
      ...result.alternatives,
    ];
  }

  private buildIndex(): void {
    for (const [guardian, keywords] of Object.entries(GUARDIAN_KEYWORDS)) {
      for (const keyword of keywords) {
        const existing = this.keywordMap.get(keyword) || [];
        existing.push({ guardian: guardian as GuardianName, weight: 1 });
        this.keywordMap.set(keyword, existing);
      }
    }
  }

  private detectElement(input: string): Element {
    const elementScores: Record<Element, number> = {
      fire: 0, water: 0, earth: 0, wind: 0, void: 0,
    };

    for (const [element, keywords] of Object.entries(ELEMENT_KEYWORDS)) {
      for (const keyword of keywords) {
        if (input.includes(keyword)) {
          elementScores[element as Element] += 1;
        }
      }
    }

    const sorted = Object.entries(elementScores).sort(([, a], [, b]) => b - a);
    return (sorted[0][1] > 0 ? sorted[0][0] : 'void') as Element;
  }

  private generateReasoning(guardian: Guardian, confidence: number, input: string): string {
    if (confidence > 0.7) {
      return `Strong match for ${guardian.displayName} (${guardian.role}). Domain: ${guardian.domain}.`;
    }
    if (confidence > 0.3) {
      return `${guardian.displayName} is the best fit for this task. ${guardian.vibe}`;
    }
    return `Routing to ${guardian.displayName} as default. Consider being more specific about your intent.`;
  }
}

/**
 * Singleton router instance for convenience.
 */
let _router: GuardianRouter | undefined;

export function getRouter(): GuardianRouter {
  if (!_router) {
    _router = new GuardianRouter();
  }
  return _router;
}

/**
 * Quick route — convenience function for one-off routing.
 */
export function routeToGuardian(input: string): RouteResult {
  return getRouter().route(input);
}
