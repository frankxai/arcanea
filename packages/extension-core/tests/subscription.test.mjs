/**
 * @arcanea/extension-core — Subscription Tier tests
 *
 * Tests getTierLimits(), isFeatureAvailable(), isUnlimited(),
 * hasAllGuardians(), getTierOrder(), and meetsMinimumTier()
 * for all 4 canonical subscription tiers.
 * Run: node --test packages/extension-core/tests/subscription.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  getTierLimits,
  isFeatureAvailable,
  isUnlimited,
  hasAllGuardians,
  getTierOrder,
  meetsMinimumTier,
} from '../dist/index.js';

// ============================================
// getTierLimits
// ============================================

describe('getTierLimits', () => {
  it('free tier has 10 queries per day', () => {
    const limits = getTierLimits('free');
    assert.equal(limits.queriesPerDay, 10);
  });

  it('creator tier has 100 queries per day', () => {
    const limits = getTierLimits('creator');
    assert.equal(limits.queriesPerDay, 100);
  });

  it('luminor tier has unlimited queries (-1)', () => {
    const limits = getTierLimits('luminor');
    assert.equal(limits.queriesPerDay, -1);
  });

  it('academy tier has unlimited queries (-1)', () => {
    const limits = getTierLimits('academy');
    assert.equal(limits.queriesPerDay, -1);
  });

  it('free tier has 3 Guardians available', () => {
    const limits = getTierLimits('free');
    assert.equal(limits.guardiansAvailable, 3);
  });

  it('creator tier has 7 Guardians available', () => {
    const limits = getTierLimits('creator');
    assert.equal(limits.guardiansAvailable, 7);
  });

  it('luminor tier has all Guardians (-1)', () => {
    const limits = getTierLimits('luminor');
    assert.equal(limits.guardiansAvailable, -1);
  });

  it('academy tier has all Guardians (-1)', () => {
    const limits = getTierLimits('academy');
    assert.equal(limits.guardiansAvailable, -1);
  });

  it('every tier has a features array', () => {
    for (const tier of ['free', 'creator', 'luminor', 'academy']) {
      const limits = getTierLimits(/** @type {any} */ (tier));
      assert.ok(Array.isArray(limits.features), `${tier} must have a features array`);
    }
  });

  it('academy tier includes all luminor features plus team features', () => {
    const luminorFeatures = getTierLimits('luminor').features;
    const academyFeatures = getTierLimits('academy').features;
    for (const f of luminorFeatures) {
      assert.ok(academyFeatures.includes(f), `academy must include luminor feature "${f}"`);
    }
    // Academy-exclusive features
    assert.ok(academyFeatures.includes('team-sharing'), 'academy should have team-sharing');
    assert.ok(academyFeatures.includes('realm-sync'), 'academy should have realm-sync');
    assert.ok(academyFeatures.includes('admin-dashboard'), 'academy should have admin-dashboard');
  });
});

// ============================================
// isFeatureAvailable
// ============================================

describe('isFeatureAvailable', () => {
  it('free tier has guardian-chat', () => {
    assert.equal(isFeatureAvailable('free', 'guardian-chat'), true);
  });

  it('free tier does NOT have guardian-routing', () => {
    assert.equal(isFeatureAvailable('free', 'guardian-routing'), false);
  });

  it('free tier does NOT have voice-enforcement', () => {
    assert.equal(isFeatureAvailable('free', 'voice-enforcement'), false);
  });

  it('creator tier has voice-enforcement', () => {
    assert.equal(isFeatureAvailable('creator', 'voice-enforcement'), true);
  });

  it('creator tier has conversation-history', () => {
    assert.equal(isFeatureAvailable('creator', 'conversation-history'), true);
  });

  it('creator tier does NOT have multi-guardian', () => {
    assert.equal(isFeatureAvailable('creator', 'multi-guardian'), false);
  });

  it('luminor tier has analytics', () => {
    assert.equal(isFeatureAvailable('luminor', 'analytics'), true);
  });

  it('luminor tier has custom-system-prompts', () => {
    assert.equal(isFeatureAvailable('luminor', 'custom-system-prompts'), true);
  });

  it('luminor tier does NOT have team-sharing', () => {
    assert.equal(isFeatureAvailable('luminor', 'team-sharing'), false);
  });

  it('academy tier has priority-support', () => {
    assert.equal(isFeatureAvailable('academy', 'priority-support'), true);
  });

  it('returns false for a feature that does not exist on any tier', () => {
    assert.equal(isFeatureAvailable('academy', 'nonexistent-feature'), false);
  });
});

// ============================================
// isUnlimited
// ============================================

describe('isUnlimited', () => {
  it('free tier is NOT unlimited', () => {
    assert.equal(isUnlimited('free'), false);
  });

  it('creator tier is NOT unlimited', () => {
    assert.equal(isUnlimited('creator'), false);
  });

  it('luminor tier IS unlimited', () => {
    assert.equal(isUnlimited('luminor'), true);
  });

  it('academy tier IS unlimited', () => {
    assert.equal(isUnlimited('academy'), true);
  });
});

// ============================================
// hasAllGuardians
// ============================================

describe('hasAllGuardians', () => {
  it('free tier does NOT have all Guardians', () => {
    assert.equal(hasAllGuardians('free'), false);
  });

  it('creator tier does NOT have all Guardians', () => {
    assert.equal(hasAllGuardians('creator'), false);
  });

  it('luminor tier HAS all Guardians', () => {
    assert.equal(hasAllGuardians('luminor'), true);
  });

  it('academy tier HAS all Guardians', () => {
    assert.equal(hasAllGuardians('academy'), true);
  });
});

// ============================================
// getTierOrder
// ============================================

describe('getTierOrder', () => {
  it('returns an array of 4 tiers', () => {
    const order = getTierOrder();
    assert.equal(order.length, 4);
  });

  it('returns tiers in ascending capability order: free → creator → luminor → academy', () => {
    const order = getTierOrder();
    assert.deepEqual(order, ['free', 'creator', 'luminor', 'academy']);
  });
});

// ============================================
// meetsMinimumTier
// ============================================

describe('meetsMinimumTier', () => {
  it('free meets minimum free', () => {
    assert.equal(meetsMinimumTier('free', 'free'), true);
  });

  it('free does NOT meet minimum creator', () => {
    assert.equal(meetsMinimumTier('free', 'creator'), false);
  });

  it('creator meets minimum free', () => {
    assert.equal(meetsMinimumTier('creator', 'free'), true);
  });

  it('creator meets minimum creator', () => {
    assert.equal(meetsMinimumTier('creator', 'creator'), true);
  });

  it('creator does NOT meet minimum luminor', () => {
    assert.equal(meetsMinimumTier('creator', 'luminor'), false);
  });

  it('luminor meets minimum creator', () => {
    assert.equal(meetsMinimumTier('luminor', 'creator'), true);
  });

  it('luminor meets minimum luminor', () => {
    assert.equal(meetsMinimumTier('luminor', 'luminor'), true);
  });

  it('luminor does NOT meet minimum academy', () => {
    assert.equal(meetsMinimumTier('luminor', 'academy'), false);
  });

  it('academy meets every tier minimum', () => {
    for (const minimum of ['free', 'creator', 'luminor', 'academy']) {
      assert.equal(
        meetsMinimumTier('academy', /** @type {any} */ (minimum)),
        true,
        `academy should meet minimum tier "${minimum}"`,
      );
    }
  });
});
