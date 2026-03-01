/**
 * Unified Arcanean Router
 *
 * Routes tasks through the Lumina Intelligence Stack:
 *   Luminor (always) → Guardian (master+) → Godbeast (luminor)
 *
 * The ArcaneanRouter is tier-aware: it returns richer results
 * at higher intelligence tiers.
 */

import type { Element, LuminorId, IntelligenceTier } from '../types/mythology.js';
import type { Guardian, Luminor, Godbeast } from '../types/mythology.js';
import { LUMINORS, GUARDIANS, GODBEASTS, GATES, LUMINOR_GATE_MAP } from '../constants/mythology.js';
import { GuardianRouter } from './guardian-router.js';

// ============================================
// LUMINOR KEYWORDS
// ============================================

const LUMINOR_KEYWORDS: Record<LuminorId, string[]> = {
  logicus: [
    'architecture', 'system', 'design', 'pattern', 'structure', 'scaffold',
    'solid', 'ddd', 'clean', 'scale', 'monorepo', 'workspace', 'module',
  ],
  synthra: [
    'code', 'refactor', 'clean', 'typescript', 'lint', 'format', 'quality',
    'review', 'type', 'eslint', 'prettier', 'style', 'convention',
  ],
  debugon: [
    'bug', 'error', 'debug', 'fix', 'test', 'fail', 'crash', 'issue',
    'broken', 'trace', 'stack', 'exception', 'investigate', 'reproduce',
  ],
  nexus: [
    'api', 'integrate', 'connect', 'webhook', 'sdk', 'rest', 'graphql',
    'endpoint', 'bridge', 'sync', 'middleware', 'adapter', 'plugin',
  ],
  prismatic: [
    'design', 'ui', 'ux', 'color', 'layout', 'css', 'tailwind', 'component',
    'visual', 'figma', 'responsive', 'accessible', 'glassmorphism', 'gradient',
  ],
  melodia: [
    'music', 'audio', 'sound', 'melody', 'rhythm', 'song', 'beat',
    'composition', 'mix', 'lyric', 'suno', 'frequency',
  ],
  motio: [
    'animate', 'motion', 'transition', 'framer', 'animation', 'ease',
    'keyframe', 'gsap', 'timing', 'stagger', 'reveal',
  ],
  formis: [
    '3d', 'model', 'shader', 'webgl', 'three', 'mesh', 'render',
    'scene', 'texture', 'spatial', 'canvas', 'blender',
  ],
  chronica: [
    'story', 'narrative', 'character', 'plot', 'world', 'fiction', 'tale',
    'hero', 'arc', 'myth', 'lore', 'backstory',
  ],
  veritas: [
    'documentation', 'readme', 'copy', 'writing', 'explain', 'clarity',
    'blog', 'content', 'message', 'tutorial', 'guide',
  ],
  lexicon: [
    'name', 'convention', 'i18n', 'translate', 'terminology', 'glossary',
    'naming', 'language', 'word', 'localization', 'dictionary',
  ],
  poetica: [
    'poem', 'poetry', 'lyric', 'verse', 'creative', 'expression',
    'rhyme', 'metaphor', 'voice', 'tagline', 'slogan',
  ],
  oracle: [
    'research', 'knowledge', 'learn', 'understand', 'explore', 'discover',
    'investigate', 'study', 'reference', 'source', 'primary',
  ],
  analytica: [
    'data', 'analytics', 'metric', 'dashboard', 'chart', 'statistics',
    'insight', 'measure', 'profile', 'benchmark', 'performance',
  ],
  memoria: [
    'database', 'schema', 'migration', 'organize', 'structure', 'model',
    'store', 'archive', 'postgres', 'supabase', 'drizzle', 'redis',
  ],
  futura: [
    'trend', 'future', 'roadmap', 'strategy', 'plan', 'forecast',
    'emerging', 'next', 'predict', 'evaluate', 'long-term',
  ],
};

// ============================================
// UNIFIED ROUTE RESULT
// ============================================

export interface UnifiedRouteResult {
  luminor: Luminor;
  luminorConfidence: number;
  guardian?: Guardian;
  godbeast?: Godbeast;
  element: Element;
  reasoning: string;
  tier: IntelligenceTier;
  alternatives: Array<{ luminor: Luminor; confidence: number }>;
}

// ============================================
// LUMINOR ROUTER CLASS
// ============================================

export class LuminorRouter {
  private keywordMap: Map<string, Array<{ luminorId: LuminorId; weight: number }>>;

  constructor() {
    this.keywordMap = new Map();
    this.buildIndex();
  }

  route(input: string): { luminor: Luminor; confidence: number; alternatives: Array<{ luminor: Luminor; confidence: number }> } {
    const normalized = input.toLowerCase();
    const words = normalized.split(/\s+/);
    const scores = new Map<LuminorId, number>();

    for (const l of LUMINORS) {
      scores.set(l.id, 0);
    }

    for (const word of words) {
      const matches = this.keywordMap.get(word);
      if (matches) {
        for (const m of matches) {
          scores.set(m.luminorId, (scores.get(m.luminorId) || 0) + m.weight);
        }
      }
      for (const [keyword, entries] of this.keywordMap) {
        if (keyword.length > 3 && normalized.includes(keyword)) {
          for (const e of entries) {
            scores.set(e.luminorId, (scores.get(e.luminorId) || 0) + e.weight * 0.5);
          }
        }
      }
    }

    const ranked = Array.from(scores.entries())
      .map(([id, score]) => ({
        luminor: LUMINORS.find(l => l.id === id)!,
        confidence: score,
      }))
      .sort((a, b) => b.confidence - a.confidence);

    const best = ranked[0];
    const maxScore = Math.max(...ranked.map(r => r.confidence), 1);
    const normalizedConfidence = Math.min(1, best.confidence / Math.max(maxScore, 5));

    return {
      luminor: best.luminor,
      confidence: normalizedConfidence,
      alternatives: ranked.slice(1, 4).map(r => ({
        luminor: r.luminor,
        confidence: Math.min(1, r.confidence / Math.max(maxScore, 5)),
      })),
    };
  }

  private buildIndex(): void {
    for (const [luminorId, keywords] of Object.entries(LUMINOR_KEYWORDS)) {
      for (const keyword of keywords) {
        const existing = this.keywordMap.get(keyword) || [];
        existing.push({ luminorId: luminorId as LuminorId, weight: 1 });
        this.keywordMap.set(keyword, existing);
      }
    }
  }
}

// ============================================
// ARCANEAN ROUTER (Unified)
// ============================================

export class ArcaneanRouter {
  private luminorRouter: LuminorRouter;
  private guardianRouter: GuardianRouter;

  constructor() {
    this.luminorRouter = new LuminorRouter();
    this.guardianRouter = new GuardianRouter();
  }

  /**
   * Unified route — returns Luminor always, Guardian at master+, Godbeast at luminor.
   */
  route(input: string, tier: IntelligenceTier = 'mage'): UnifiedRouteResult {
    const luminorResult = this.luminorRouter.route(input);
    const guardianResult = this.guardianRouter.route(input);

    const result: UnifiedRouteResult = {
      luminor: luminorResult.luminor,
      luminorConfidence: luminorResult.confidence,
      element: guardianResult.element,
      reasoning: this.generateReasoning(luminorResult.luminor, luminorResult.confidence, tier),
      tier,
      alternatives: luminorResult.alternatives,
    };

    // At master+ tier, include Guardian alignment
    if (tier === 'master' || tier === 'luminor') {
      // Use the Guardian from the luminor's gate alignment
      const gateName = LUMINOR_GATE_MAP[luminorResult.luminor.id];
      const gate = GATES.find(g => g.name === gateName);
      if (gate) {
        result.guardian = GUARDIANS.find(g => g.name === gate.guardian);
      }
    }

    // At luminor tier, include Godbeast
    if (tier === 'luminor' && result.guardian) {
      result.godbeast = GODBEASTS.find(gb => gb.guardian === result.guardian!.name);
    }

    return result;
  }

  /**
   * Route directly to a Luminor by name or ID.
   */
  channelLuminor(nameOrId: string): Luminor | undefined {
    return LUMINORS.find(
      l => l.id === nameOrId.toLowerCase() ||
           l.name.toLowerCase() === nameOrId.toLowerCase()
    );
  }

  /**
   * Backward compat: route directly to a Guardian.
   */
  channelGuardian(nameOrId: string): Guardian | undefined {
    return this.guardianRouter.channel(nameOrId);
  }

  private generateReasoning(luminor: Luminor, confidence: number, tier: IntelligenceTier): string {
    const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
    if (confidence > 0.7) {
      return `Strong match for ${luminor.name} (${luminor.title}). Specialty: ${luminor.specialty}. [${tierLabel} tier]`;
    }
    if (confidence > 0.3) {
      return `${luminor.name} is the best fit for this task. Team: ${luminor.team}. [${tierLabel} tier]`;
    }
    return `Routing to ${luminor.name} as closest match. Consider being more specific. [${tierLabel} tier]`;
  }
}

// ============================================
// SINGLETONS
// ============================================

let _arcaneanRouter: ArcaneanRouter | undefined;

export function getArcaneanRouter(): ArcaneanRouter {
  if (!_arcaneanRouter) {
    _arcaneanRouter = new ArcaneanRouter();
  }
  return _arcaneanRouter;
}

export function routeToLuminor(input: string, tier: IntelligenceTier = 'mage'): UnifiedRouteResult {
  return getArcaneanRouter().route(input, tier);
}
