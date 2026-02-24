/**
 * @arcanea/extension-core — Subscription Tiers
 *
 * Defines the subscription tiers available in the Arcanea ecosystem
 * and the feature limits associated with each. Used by all extensions
 * to gate features without a network round-trip.
 */

// ============================================
// SUBSCRIPTION TIER
// ============================================

/**
 * Canonical subscription tiers for Arcanea.
 *
 * - free:     Entry tier, limited daily queries, default Guardian only
 * - creator:  Mid tier, expanded queries, all Guardians
 * - luminor:  Power tier, unlimited queries, advanced features
 * - academy:  Institutional / team tier, all luminor features + collaboration
 */
export type SubscriptionTier = 'free' | 'creator' | 'luminor' | 'academy';

// ============================================
// TIER LIMITS
// ============================================

export interface TierLimits {
  /** Maximum AI queries allowed per day. -1 means unlimited. */
  queriesPerDay: number;
  /**
   * Number of Guardians available to this tier.
   * -1 means all 10 are available.
   */
  guardiansAvailable: number;
  /** Named features enabled for this tier. */
  features: string[];
}

// ============================================
// TIER DEFINITIONS
// ============================================

const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  free: {
    queriesPerDay: 10,
    guardiansAvailable: 3,
    features: [
      'guardian-chat',
      'page-context',
    ],
  },
  creator: {
    queriesPerDay: 100,
    guardiansAvailable: 7,
    features: [
      'guardian-chat',
      'page-context',
      'guardian-routing',
      'conversation-history',
      'voice-enforcement',
    ],
  },
  luminor: {
    queriesPerDay: -1,
    guardiansAvailable: -1,
    features: [
      'guardian-chat',
      'page-context',
      'guardian-routing',
      'conversation-history',
      'voice-enforcement',
      'multi-guardian',
      'custom-system-prompts',
      'export-conversations',
      'analytics',
    ],
  },
  academy: {
    queriesPerDay: -1,
    guardiansAvailable: -1,
    features: [
      'guardian-chat',
      'page-context',
      'guardian-routing',
      'conversation-history',
      'voice-enforcement',
      'multi-guardian',
      'custom-system-prompts',
      'export-conversations',
      'analytics',
      'team-sharing',
      'realm-sync',
      'admin-dashboard',
      'priority-support',
    ],
  },
};

// ============================================
// PUBLIC HELPERS
// ============================================

/**
 * Returns the feature limits for a given subscription tier.
 */
export function getTierLimits(tier: SubscriptionTier): TierLimits {
  return TIER_LIMITS[tier];
}

/**
 * Returns true if the given feature is available for the tier.
 *
 * @example
 * isFeatureAvailable('creator', 'voice-enforcement') // true
 * isFeatureAvailable('free', 'analytics')            // false
 */
export function isFeatureAvailable(
  tier: SubscriptionTier,
  feature: string,
): boolean {
  return TIER_LIMITS[tier].features.includes(feature);
}

/**
 * Returns true if the tier has unlimited daily queries.
 */
export function isUnlimited(tier: SubscriptionTier): boolean {
  return TIER_LIMITS[tier].queriesPerDay === -1;
}

/**
 * Returns true if the tier has access to all 10 Guardians.
 */
export function hasAllGuardians(tier: SubscriptionTier): boolean {
  return TIER_LIMITS[tier].guardiansAvailable === -1;
}

/**
 * Returns the ordered list of tiers from least to most capable.
 */
export function getTierOrder(): SubscriptionTier[] {
  return ['free', 'creator', 'luminor', 'academy'];
}

/**
 * Returns true if `tier` is at least as capable as `minimum`.
 */
export function meetsMinimumTier(
  tier: SubscriptionTier,
  minimum: SubscriptionTier,
): boolean {
  const order = getTierOrder();
  return order.indexOf(tier) >= order.indexOf(minimum);
}
