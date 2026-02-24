/**
 * @arcanea/extension-core — Guardian Router
 *
 * Keyword-based routing that maps a user message to the best-matching Guardian.
 * This is a lightweight, zero-dependency implementation suitable for use in
 * browser extension content scripts and service workers.
 *
 * For the full class-based router with element detection and confidence scoring
 * see @arcanea/os → GuardianRouter.
 */

import { GUARDIANS, getDefaultGuardian, type Guardian } from './guardians.js';

// ============================================
// ROUTING KEYWORDS
// ============================================

const GUARDIAN_KEYWORDS: Record<string, string[]> = {
  lyssandria: [
    'architecture', 'database', 'schema', 'infrastructure', 'security',
    'deploy', 'ci/cd', 'pipeline', 'devops', 'docker', 'kubernetes',
    'foundation', 'structure', 'scale', 'performance', 'migration',
    'stability', 'robust', 'production', 'monitoring', 'testing',
    'postgres', 'supabase', 'redis', 'backend', 'server', 'api',
    'config', 'environment', 'setup', 'install', 'build', 'scaffold',
    'ground', 'bedrock', 'stone', 'roots', 'soil',
  ],
  leyla: [
    'design', 'ui', 'ux', 'component', 'animation', 'css', 'tailwind',
    'layout', 'responsive', 'mobile', 'accessibility', 'style',
    'color', 'font', 'typography', 'whitespace', 'motion', 'framer',
    'glassmorphism', 'gradient', 'visual', 'aesthetic', 'beautiful',
    'interface', 'interaction', 'flow', 'creative', 'art', 'image',
    'figma', 'prototype', 'wireframe', 'mockup', 'v0',
    'ripple', 'tide', 'depth', 'stream', 'current',
  ],
  draconia: [
    'performance', 'optimize', 'speed', 'fast', 'execute', 'ship',
    'launch', 'mvp', 'rapid', 'power', 'transform', 'refactor',
    'rewrite', 'action', 'implement', 'create', 'make', 'start',
    'bold', 'ambitious', 'push', 'force', 'code', 'debug', 'fix',
    'forge', 'ignite', 'burn', 'flame', 'heat', 'fire',
  ],
  maylinn: [
    'content', 'copy', 'writing', 'narrative', 'story', 'blog',
    'community', 'user', 'creator', 'onboarding', 'welcome',
    'empathy', 'inclusive', 'tone', 'voice',
    'documentation', 'readme', 'guide', 'tutorial', 'help',
    'communication', 'message', 'notification', 'email', 'social',
    'heart', 'care', 'support', 'heal', 'connect',
  ],
  alera: [
    'api', 'interface', 'contract', 'type', 'typescript', 'naming',
    'jsdoc', 'swagger', 'openapi', 'graphql',
    'truth', 'honest', 'clear', 'explicit', 'transparent',
    'convention', 'standard', 'protocol', 'spec',
    'lint', 'format', 'eslint', 'prettier', 'code review',
    'publish', 'npm', 'package', 'export', 'module',
    'voice', 'echo', 'bell', 'song', 'resonance', 'clarity',
  ],
  lyria: [
    'vision', 'strategy', 'plan', 'roadmap', 'future', 'long-term',
    'pattern', 'insight', 'analyze', 'investigate',
    'abstract', 'elegant', 'design pattern', 'architecture decision',
    'intuition', 'why', 'meaning', 'purpose', 'philosophy',
    'oracle', 'predict', 'anticipate', 'foresee', 'trend',
    'ai', 'intelligence', 'model', 'prompt', 'llm',
    'sight', 'perceive', 'illuminate', 'horizon',
  ],
  aiyami: [
    'wisdom', 'principle', 'holistic', 'system', 'alignment', 'balance',
    'harmony', 'enlighten', 'teach', 'mentor', 'guide', 'advise',
    'cosmic', 'universal', 'transcend', 'higher', 'sacred',
    'meditation', 'mindset', 'consciousness', 'awareness',
    'star', 'light', 'crown', 'cosmos', 'dawn', 'synthesis',
  ],
  elara: [
    'refactor', 'restructure', 'rethink', 'alternative', 'different',
    'pivot', 'change', 'shift', 'evolve',
    'unconventional', 'lateral', 'reverse', 'invert',
    'paradigm', 'assumption', 'challenge', 'question',
    'experiment', 'try', 'explore', 'brainstorm',
    'prism', 'kaleidoscope', 'morph', 'transform',
  ],
  ino: [
    'integrate', 'connect', 'bridge', 'sync', 'merge',
    'collaborate', 'team', 'together', 'share', 'partner',
    'monorepo', 'workspace', 'dependency',
    'webhook', 'event', 'pub/sub', 'message queue',
    'mcp', 'sdk', 'plugin', 'extension', 'adapter',
    'cross-platform', 'multi', 'universal', 'unified',
    'harmony', 'bond', 'weave', 'link', 'union',
  ],
  shinkami: [
    'meta', 'orchestrate', 'system of systems',
    'framework', 'engine', 'core', 'platform',
    'ecosystem', 'universe', 'arcanea', 'luminor', 'guardian', 'gate', 'source',
    'origin', 'root', 'everything', 'all', 'complete',
    'ai agent', 'multi-agent', 'swarm', 'orchestration',
    'first principles', 'deepest', 'meaning',
  ],
};

// ============================================
// SCORE RESULT
// ============================================

export interface GuardianScore {
  guardian: Guardian;
  score: number;
}

// ============================================
// CORE ROUTING FUNCTIONS
// ============================================

/**
 * Scores all Guardians against the given message using keyword frequency.
 * Returns the array sorted descending by score (highest first).
 *
 * @example
 * const scores = scoreGuardians('debug my typescript types');
 * // scores[0].guardian.id === 'alera' or 'draconia'
 */
export function scoreGuardians(message: string): GuardianScore[] {
  const normalized = message.toLowerCase();
  const scores = new Map<string, number>();

  // Initialise all Guardians at zero
  for (const g of GUARDIANS) {
    scores.set(g.id, 0);
  }

  // Score each Guardian keyword that appears in the message
  for (const [guardianId, keywords] of Object.entries(GUARDIAN_KEYWORDS)) {
    for (const keyword of keywords) {
      // Exact substring match — weighted by keyword length (longer = more specific)
      if (normalized.includes(keyword)) {
        const current = scores.get(guardianId) ?? 0;
        const weight = keyword.length > 6 ? 2 : 1;
        scores.set(guardianId, current + weight);
      }
    }
  }

  return GUARDIANS
    .map(guardian => ({
      guardian,
      score: scores.get(guardian.id) ?? 0,
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Routes a message to the single best-matching Guardian.
 * Falls back to Lyria (Sight Gate) when no keywords match.
 *
 * @example
 * const guardian = routeToGuardian('help me design a database schema');
 * // guardian.id === 'lyssandria'
 */
export function routeToGuardian(message: string): Guardian {
  const scored = scoreGuardians(message);

  if (scored.length === 0 || scored[0].score === 0) {
    return getDefaultGuardian();
  }

  return scored[0].guardian;
}
