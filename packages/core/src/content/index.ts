/**
 * Shared Content Layer
 *
 * Canonical content constants and markdown generators
 * consumed by all Arcanea overlay packages.
 */

// Voice constants
export {
  VOICE_PILLARS,
  ANTIDOTE_PRINCIPLE,
  SACRED_TERMINOLOGY,
  BANNED_PHRASES,
  CONTEXT_SENSITIVE_PHRASES,
  GUARDIAN_VERBS,
} from './voice.js';
export type { TerminologyMapping, BannedPhrase } from './voice.js';

// Routing constants
export {
  GUARDIAN_ROUTING_PATTERNS,
  MODEL_KEYWORD_TIERS,
  TOOL_COST_ESTIMATES,
  CONTEXT_ZONES,
} from './routing.js';
export type { GuardianRoutingPattern, ModelKeywordTier, ContextZone } from './routing.js';

// Markdown generators
export {
  generateGuardianTable,
  generateGuardianQuickReference,
  generateVoiceSection,
  generateTerminologyTable,
  generateLoreSection,
  generateLoreSectionCondensed,
  generateDesignTokensSection,
  generateStackSection,
  generateGuardianProfile,
} from './markdown.js';
