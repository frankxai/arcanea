/**
 * Shared Routing Content
 *
 * Guardian routing keywords, model complexity scoring,
 * and tool cost estimates consumed by overlay hook generators.
 */

// ============================================
// GUARDIAN ROUTING PATTERNS
// ============================================

export interface GuardianRoutingPattern {
  pattern: string;
  guardian: string;
  gate: string;
  element: string;
}

/**
 * Keyword patterns that map user prompts to Guardians.
 * Patterns are pipe-separated regex fragments for use in bash hooks.
 */
export const GUARDIAN_ROUTING_PATTERNS: GuardianRoutingPattern[] = [
  { pattern: 'coordinat|orchestrat|meta|oversee|council|starlight', guardian: 'Shinkami', gate: 'Source', element: 'Void' },
  { pattern: 'debug|bug|error|fix|broken|crash|undefined', guardian: 'Elara', gate: 'Shift', element: 'Void' },
  { pattern: 'review|audit|security|quality|inspect|verify|lint', guardian: 'Alera', gate: 'Voice', element: 'Wind' },
  { pattern: 'github|merge|pr\\b|pull.*request|commit|push|branch', guardian: 'Ino', gate: 'Unity', element: 'Void' },
  { pattern: 'architect|schema|foundation|database|supabase|migration|data.*model', guardian: 'Lyssandria', gate: 'Foundation', element: 'Earth' },
  { pattern: 'strategy|plan|roadmap|priority|vision|foresight|research', guardian: 'Lyria', gate: 'Sight', element: 'Void' },
  { pattern: 'deploy|build|implement|code|compile|component|react', guardian: 'Draconia', gate: 'Fire', element: 'Fire' },
  { pattern: 'refactor|migrate|restructure|transform|modernize', guardian: 'Elara', gate: 'Shift', element: 'Void' },
  { pattern: 'test|accessibility|wellness|ux\\b|css|tailwind|design.*system', guardian: 'Maylinn', gate: 'Heart', element: 'Water' },
  { pattern: 'visual|image|world.*build|infographic|generate.*image', guardian: 'Aiyami', gate: 'Crown', element: 'Void' },
  { pattern: 'write|narrative|content|story|compose|lore|create|voice', guardian: 'Leyla', gate: 'Flow', element: 'Water' },
  { pattern: 'explain|teach|principle|wisdom|understand|enlighten', guardian: 'Aiyami', gate: 'Crown', element: 'Void' },
];

// ============================================
// MODEL COMPLEXITY KEYWORDS
// ============================================

export interface ModelKeywordTier {
  tier: 'opus' | 'sonnet-primary' | 'sonnet-secondary' | 'haiku';
  weight: number;
  keywords: string[];
}

/**
 * Keywords used to score task complexity for model routing.
 * Higher weight = more complex task = larger model needed.
 */
export const MODEL_KEYWORD_TIERS: ModelKeywordTier[] = [
  {
    tier: 'opus',
    weight: 3,
    keywords: [
      'architect', 'redesign', 'security audit', 'refactor entire',
      'migrate', 'paradigm', 'council', 'overhaul', 'infrastructure',
      'complete rewrite', 'from scratch',
    ],
  },
  {
    tier: 'sonnet-primary',
    weight: 3,
    keywords: [
      'implement', 'build', 'create', 'design', 'refactor',
      'optimize', 'integration', 'deploy',
    ],
  },
  {
    tier: 'sonnet-secondary',
    weight: 2,
    keywords: [
      'plan', 'review', 'analyze', 'write', 'strategy', 'feature',
      'component', 'api', 'database', 'schema', 'workflow', 'pipeline',
      'guardian', 'gate', 'hook', 'module', 'service', 'endpoint',
    ],
  },
  {
    tier: 'haiku',
    weight: 1,
    keywords: [
      'fix typo', 'typo', 'format', 'rename', 'simple', 'docs',
      'readme', 'lint', 'small', 'bump', 'changelog', 'trivial',
      'quick', 'tweak',
    ],
  },
];

// ============================================
// TOOL COST ESTIMATES
// ============================================

/**
 * Estimated token cost per tool invocation.
 * Used by context budget tracking hooks.
 */
export const TOOL_COST_ESTIMATES: Record<string, number> = {
  Read: 500,
  Write: 1000,
  Edit: 1000,
  Bash: 800,
  Task: 5000,
  Grep: 300,
  Glob: 300,
  WebFetch: 2000,
  WebSearch: 2000,
};

// ============================================
// CONTEXT BUDGET ZONES
// ============================================

export interface ContextZone {
  name: string;
  maxPercent: number;
  description: string;
}

export const CONTEXT_ZONES: ContextZone[] = [
  { name: 'PEAK', maxPercent: 50, description: 'Full context, all tools available' },
  { name: 'GOOD', maxPercent: 70, description: 'Healthy context, normal operation' },
  { name: 'DEGRADING', maxPercent: 85, description: 'Getting tight, prioritize essentials' },
  { name: 'REFRESH', maxPercent: 100, description: 'Context nearly full, save and refresh' },
];
