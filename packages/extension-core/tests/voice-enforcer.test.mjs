/**
 * @arcanea/extension-core — Voice Enforcer tests
 *
 * Tests the Arcanea Voice Bible enforcement utilities:
 * getVoiceTokens(), enforceVoice(), and postProcessResponse().
 * Run: node --test packages/extension-core/tests/voice-enforcer.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  getVoiceTokens,
  enforceVoice,
  postProcessResponse,
} from '../dist/index.js';

// ============================================
// getVoiceTokens
// ============================================

describe('getVoiceTokens', () => {
  it('returns an array for a valid Guardian id', () => {
    const tokens = getVoiceTokens('draconia');
    assert.ok(Array.isArray(tokens), 'should return an array');
    assert.ok(tokens.length > 0, 'array should not be empty');
  });

  it('returns the correct tokens for Draconia (fire archetype)', () => {
    const tokens = getVoiceTokens('draconia');
    assert.ok(tokens.includes('direct'), 'Draconia should be direct');
    assert.ok(tokens.includes('confident'), 'Draconia should be confident');
    assert.ok(tokens.includes('action-first'), 'Draconia should be action-first');
  });

  it('returns the correct tokens for Lyssandria (earth archetype)', () => {
    const tokens = getVoiceTokens('lyssandria');
    assert.ok(tokens.includes('measured'), 'Lyssandria should be measured');
    assert.ok(tokens.includes('grounded'), 'Lyssandria should be grounded');
  });

  it('returns the correct tokens for Shinkami (source archetype)', () => {
    const tokens = getVoiceTokens('shinkami');
    assert.ok(tokens.includes('vast'), 'Shinkami should be vast');
    assert.ok(tokens.includes('still'), 'Shinkami should be still');
  });

  it('returns all 10 Guardian token sets without fallback', () => {
    const ids = ['lyssandria', 'leyla', 'draconia', 'maylinn', 'alera', 'lyria', 'aiyami', 'elara', 'ino', 'shinkami'];
    for (const id of ids) {
      const tokens = getVoiceTokens(id);
      assert.ok(tokens.length > 0, `${id} should have at least one voice token`);
    }
  });

  it('falls back to default tokens for an unknown Guardian id', () => {
    const tokens = getVoiceTokens('unknown-guardian-xyz');
    assert.ok(Array.isArray(tokens), 'should return an array even for unknown id');
    assert.ok(tokens.length > 0, 'fallback should not be empty');
    // The default tokens include these Voice Bible pillars
    assert.ok(
      tokens.some(t => t.includes('creator') || t.includes('arcane') || t.includes('visionary')),
      'fallback tokens should contain Voice Bible pillar terms',
    );
  });

  it('falls back to default tokens for empty string id', () => {
    const tokens = getVoiceTokens('');
    assert.ok(Array.isArray(tokens), 'should handle empty string gracefully');
    assert.ok(tokens.length > 0, 'fallback should not be empty');
  });
});

// ============================================
// enforceVoice
// ============================================

describe('enforceVoice', () => {
  it('prepends a voice block to the text', () => {
    const result = enforceVoice('Explain async/await', 'draconia');
    assert.ok(result.startsWith('[Voice:'), 'result should start with [Voice: block');
  });

  it('includes the capitalised Guardian name in the voice block', () => {
    const result = enforceVoice('Hello', 'lyria');
    assert.ok(result.includes('Lyria'), 'result should contain "Lyria"');
  });

  it('includes at least one voice token from the Guardian in the block', () => {
    const tokens = getVoiceTokens('draconia');
    const result = enforceVoice('Ship it', 'draconia');
    const hasToken = tokens.some(t => result.includes(t));
    assert.ok(hasToken, 'voice block should contain at least one voice token');
  });

  it('preserves the original text after a double newline separator', () => {
    const text = 'Build the feature now.';
    const result = enforceVoice(text, 'draconia');
    assert.ok(result.includes('\n\n' + text), 'original text should appear after double newline');
  });

  it('works with an unknown Guardian id (uses default tokens)', () => {
    const result = enforceVoice('Test text', 'mystery-guardian');
    assert.ok(result.startsWith('[Voice:'), 'should still produce a voice block');
    assert.ok(result.includes('Mystery-guardian'), 'should capitalise the guardian id');
  });

  it('formats the block as [Voice: Name — token1, token2, ...]', () => {
    const result = enforceVoice('Do the thing', 'alera');
    assert.match(result, /^\[Voice: Alera — .+\]\n\nDo the thing/, 'format should match expected pattern');
  });
});

// ============================================
// postProcessResponse
// ============================================

describe('postProcessResponse', () => {
  it('replaces "the user" with "the creator"', () => {
    const result = postProcessResponse('The solution helps the user save time.', 'lyria');
    assert.ok(result.includes('the creator'), 'should replace "the user"');
    assert.ok(!result.includes('the user'), '"the user" should be gone');
  });

  it('replaces "your users" with "your creators" (case-insensitive)', () => {
    const result = postProcessResponse('Think about Your Users first.', 'leyla');
    assert.ok(result.toLowerCase().includes('your creators'), 'should replace "your users"');
  });

  it('strips the condescending word "simply"', () => {
    const result = postProcessResponse('You can simply click the button.', 'alera');
    assert.ok(!result.includes('simply'), '"simply" should be stripped');
  });

  it('strips the condescending word "just "', () => {
    const result = postProcessResponse('Just run the command.', 'draconia');
    assert.ok(!result.includes('just ') && !result.includes('Just '), '"just" should be stripped');
  });

  it('strips "basically" as a condescending minimiser', () => {
    const result = postProcessResponse('This is basically a wrapper.', 'alera');
    assert.ok(!result.includes('basically'), '"basically" should be stripped');
  });

  it('replaces "leverage" with "use"', () => {
    const result = postProcessResponse('We should leverage this library.', 'aiyami');
    assert.ok(result.includes('use'), '"leverage" should become "use"');
    assert.ok(!result.includes('leverage'), '"leverage" should be gone');
  });

  it('replaces "synergy" with "alignment"', () => {
    const result = postProcessResponse('There is great synergy between the teams.', 'ino');
    assert.ok(result.includes('alignment'), '"synergy" should become "alignment"');
  });

  it('replaces "bandwidth" with "capacity"', () => {
    const result = postProcessResponse('I do not have the bandwidth for this.', 'draconia');
    assert.ok(result.includes('capacity'), '"bandwidth" should become "capacity"');
  });

  it('leaves other words unchanged', () => {
    const text = 'Build, test, and ship the feature.';
    const result = postProcessResponse(text, 'draconia');
    assert.equal(result.trim(), text.trim(), 'unchanged text should pass through intact');
  });

  it('the second argument (_guardianId) is accepted without error', () => {
    // Reserved for future per-Guardian rules — must not throw
    assert.doesNotThrow(() => postProcessResponse('Some text', 'shinkami'));
  });
});
