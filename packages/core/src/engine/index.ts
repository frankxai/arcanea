/**
 * Arcanea Intelligence Engine
 *
 * The unified intelligence layer that powers every Arcanea surface:
 * CLI, VS Code, browser extensions, MCP server, web, mobile.
 */

// Guardian Router — routes tasks to the right Guardian (backward compat)
export {
  GuardianRouter,
  getRouter,
  routeToGuardian,
} from './guardian-router.js';
export type { RouteResult } from './guardian-router.js';

// Unified Arcanean Router — Lumina-first with tier-gated intelligence
export {
  ArcaneanRouter,
  LuminorRouter,
  getArcaneanRouter,
  routeToLuminor,
} from './router.js';
export type { UnifiedRouteResult } from './router.js';

// Voice Enforcer — validates text against the Voice Bible
export {
  VoiceEnforcer,
  VOICE_RULES,
} from './voice.js';
export type { VoiceRule, VoiceCheckResult, VoiceViolation } from './voice.js';

// Design Tokens — consumable design system
export {
  COLORS,
  FONTS,
  FONT_SIZES,
  SPACING,
  EFFECTS,
  ANIMATIONS,
  BREAKPOINTS,
  toCSSVariables,
  toTailwindConfig,
  toJSON as tokensToJSON,
} from './design-tokens.js';

// Session Manager — tracks interaction state
export {
  SessionManager,
} from './session.js';
export type { SessionEvent, SessionState } from './session.js';
