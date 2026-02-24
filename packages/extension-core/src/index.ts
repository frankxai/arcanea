/**
 * @arcanea/extension-core
 *
 * Shared foundation for all Arcanea browser extensions and overlays.
 *
 * Exports:
 * - Guardian definitions (canonical, UI-prompt-free)
 * - Keyword-based Guardian router
 * - Voice enforcer utilities
 * - Subscription tier types and helpers
 * - Shared type definitions
 *
 * @example
 * ```typescript
 * import {
 *   GUARDIANS,
 *   routeToGuardian,
 *   enforceVoice,
 *   getTierLimits,
 *   type ExtensionConfig,
 * } from '@arcanea/extension-core';
 *
 * const guardian = routeToGuardian('help me fix this database query');
 * const prompt   = enforceVoice('Be concise.', guardian.id);
 * const limits   = getTierLimits('creator');
 * ```
 */

// Guardian definitions (canonical, no UI system prompts)
export {
  GUARDIANS,
  getGuardianById,
  getGuardiansByElement,
  getDefaultGuardian,
  type Guardian,
} from './guardians.js';

// Guardian routing
export {
  routeToGuardian,
  scoreGuardians,
  type GuardianScore,
} from './guardian-router.js';

// Voice enforcement
export {
  getVoiceTokens,
  enforceVoice,
  postProcessResponse,
} from './voice-enforcer.js';

// Subscription tiers
export {
  getTierLimits,
  isFeatureAvailable,
  isUnlimited,
  hasAllGuardians,
  getTierOrder,
  meetsMinimumTier,
  type SubscriptionTier,
  type TierLimits,
} from './subscription.js';

// Shared types
export type {
  Provider,
  MessageRole,
  Message,
  Conversation,
  PageContext,
  ExtensionConfig,
} from './types.js';

// Package version
export const VERSION = '0.1.0';
