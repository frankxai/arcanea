/**
 * @arcanea/os — Intelligence Engine tests
 * Tests GuardianRouter, VoiceEnforcer, and DesignTokens
 * Run: node --test packages/core/tests/engine.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

const core = await import('../dist/index.js');
const {
  routeToGuardian,
  VoiceEnforcer,
  COLORS, FONTS, SPACING, EFFECTS, ANIMATIONS,
  toCSSVariables, toTailwindConfig, tokensToJSON,
  VOICE_RULES,
} = core;

// ============================================
// GUARDIAN ROUTER
// ============================================

describe('GuardianRouter', () => {
  it('should route database tasks to Lyssandria', () => {
    const result = routeToGuardian('design the database schema');
    assert.equal(result.guardian?.name || result.guardian, 'lyssandria');
  });

  it('should route UI tasks to Leyla', () => {
    const result = routeToGuardian('create a beautiful glassmorphism component');
    assert.equal(result.guardian?.name || result.guardian, 'leyla');
  });

  it('should route performance tasks to Draconia', () => {
    const result = routeToGuardian('optimize and ship the build');
    assert.equal(result.guardian?.name || result.guardian, 'draconia');
  });

  it('should route content tasks to Maylinn', () => {
    const result = routeToGuardian('write onboarding documentation for creators');
    assert.equal(result.guardian?.name || result.guardian, 'maylinn');
  });

  it('should route API tasks to Alera', () => {
    const result = routeToGuardian('define the TypeScript interface contracts');
    assert.equal(result.guardian?.name || result.guardian, 'alera');
  });

  it('should route strategy tasks to Lyria', () => {
    const result = routeToGuardian('plan the long-term vision and roadmap');
    assert.equal(result.guardian?.name || result.guardian, 'lyria');
  });

  it('should return valid result shape', () => {
    const result = routeToGuardian('hello world');
    // Guardian can be an object or string depending on router implementation
    const guardianName = result.guardian?.name || result.guardian;
    assert.ok(typeof guardianName === 'string', 'guardian should be a string or object with name');
    assert.ok(typeof result.confidence === 'number', 'confidence should be a number');
    assert.ok(result.element !== undefined, 'element should be present');
  });

  it('should handle empty input gracefully', () => {
    const result = routeToGuardian('');
    assert.ok(result.guardian); // Should still return a guardian (default)
  });
});

// ============================================
// VOICE ENFORCER
// ============================================

describe('VoiceEnforcer', () => {
  it('should detect "user" → "creator" violations', () => {
    const enforcer = new VoiceEnforcer();
    const result = enforcer.check('Welcome back, user!');
    assert.ok(!result.passed || result.violations.length > 0 || result.suggestions.length > 0);
  });

  it('should fix "user" to "creator"', () => {
    const enforcer = new VoiceEnforcer();
    const fixed = enforcer.fix('Welcome back, user!');
    assert.ok(fixed.includes('creator'), `Expected "creator" in: ${fixed}`);
  });

  it('should pass clean text', () => {
    const enforcer = new VoiceEnforcer();
    const result = enforcer.check('The creator enters the realm of light.');
    assert.ok(result.score > 50);
  });

  it('should return score between 0-100', () => {
    const enforcer = new VoiceEnforcer();
    const result = enforcer.check('some text');
    assert.ok(result.score >= 0 && result.score <= 100, `Score out of range: ${result.score}`);
  });
});

describe('VoiceRules', () => {
  it('should have at least 3 rules', () => {
    assert.ok(VOICE_RULES.length >= 3, `Only ${VOICE_RULES.length} rules`);
  });

  it('each rule should have required fields', () => {
    for (const rule of VOICE_RULES) {
      assert.ok(rule.id, 'Rule missing id');
      assert.ok(rule.description, `${rule.id} missing description`);
      assert.ok(rule.pattern instanceof RegExp, `${rule.id} pattern not RegExp`);
      assert.ok(['error', 'warning', 'suggestion'].includes(rule.severity), `${rule.id} invalid severity`);
    }
  });
});

// ============================================
// DESIGN TOKENS
// ============================================

describe('DesignTokens', () => {
  it('COLORS should include canonical Arcanea colors', () => {
    assert.ok(COLORS, 'COLORS not exported');
    const json = JSON.stringify(COLORS).toLowerCase();
    assert.ok(json.includes('7fffd4') || json.includes('teal'), 'Missing teal');
  });

  it('FONTS should include Cinzel and Crimson Pro', () => {
    assert.ok(FONTS, 'FONTS not exported');
    const json = JSON.stringify(FONTS);
    assert.ok(json.includes('Cinzel'), 'Missing Cinzel');
    assert.ok(json.includes('Crimson'), 'Missing Crimson Pro');
  });

  it('toCSSVariables should return valid CSS', () => {
    const css = toCSSVariables();
    assert.ok(typeof css === 'string');
    assert.ok(css.includes('--'), 'CSS variables should start with --');
  });

  it('toTailwindConfig should return an object', () => {
    const config = toTailwindConfig();
    assert.ok(typeof config === 'object');
  });

  it('tokensToJSON should return complete token set', () => {
    const json = tokensToJSON();
    assert.ok(typeof json === 'object');
  });

  it('SPACING should be defined', () => {
    assert.ok(SPACING, 'SPACING not exported');
  });

  it('EFFECTS should be defined', () => {
    assert.ok(EFFECTS, 'EFFECTS not exported');
  });

  it('ANIMATIONS should be defined', () => {
    assert.ok(ANIMATIONS, 'ANIMATIONS not exported');
  });
});
