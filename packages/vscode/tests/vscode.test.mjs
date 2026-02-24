import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// guardians.ts compiled to ESM by the test script (no vscode dependency)
const {
  GUARDIANS,
  GUARDIAN_ORDER,
  routeToGuardian,
  cycleGuardian,
  getGuardian,
} = await import('./_guardians.mjs');

// ── GUARDIANS Record ────────────────────────────────────────────────────────

describe('GUARDIANS', () => {
  it('contains exactly 10 guardians', () => {
    assert.equal(Object.keys(GUARDIANS).length, 10);
  });

  it('all guardians have required fields', () => {
    const requiredFields = [
      'id', 'name', 'gate', 'frequency', 'element',
      'godbeast', 'color', 'symbol', 'domain',
      'shortDescription', 'keywords', 'systemPromptSummary',
    ];

    for (const [id, guardian] of Object.entries(GUARDIANS)) {
      for (const field of requiredFields) {
        assert.ok(
          guardian[field] !== undefined && guardian[field] !== null,
          `${id} missing field: ${field}`
        );
      }
    }
  });

  it('all guardians have non-empty keywords array', () => {
    for (const [id, guardian] of Object.entries(GUARDIANS)) {
      assert.ok(Array.isArray(guardian.keywords), `${id}: keywords should be an array`);
      assert.ok(guardian.keywords.length > 0, `${id}: keywords should not be empty`);
    }
  });

  it('guardian ids match their record keys', () => {
    for (const [key, guardian] of Object.entries(GUARDIANS)) {
      assert.equal(guardian.id, key, `Guardian key "${key}" doesn't match id "${guardian.id}"`);
    }
  });

  it('all colors are valid hex codes', () => {
    const hexPattern = /^#[0-9a-f]{6}$/i;
    for (const [id, guardian] of Object.entries(GUARDIANS)) {
      assert.match(guardian.color, hexPattern, `${id}: invalid color "${guardian.color}"`);
    }
  });

  it('all frequencies end with Hz', () => {
    for (const [id, guardian] of Object.entries(GUARDIANS)) {
      assert.ok(
        guardian.frequency.endsWith(' Hz'),
        `${id}: frequency "${guardian.frequency}" should end with " Hz"`
      );
    }
  });

  it('canonical guardian names match expected', () => {
    const expected = [
      'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
      'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
    ];
    const actual = Object.values(GUARDIANS).map(g => g.name).sort();
    assert.deepEqual(actual, [...expected].sort());
  });

  it('canonical gates match expected', () => {
    const expectedGates = [
      'Foundation', 'Flow', 'Fire', 'Heart', 'Voice',
      'Sight', 'Crown', 'Shift', 'Unity', 'Source',
    ];
    const actualGates = Object.values(GUARDIANS).map(g => g.gate).sort();
    assert.deepEqual(actualGates, [...expectedGates].sort());
  });

  it('canonical godbeasts match expected', () => {
    const expected = [
      'Kaelith', 'Veloura', 'Draconis', 'Laeylinn', 'Otome',
      'Yumiko', 'Sol', 'Thessara', 'Kyuro', 'Amaterasu',
    ];
    const actual = Object.values(GUARDIANS).map(g => g.godbeast).sort();
    assert.deepEqual(actual, [...expected].sort());
  });
});

// ── GUARDIAN_ORDER ───────────────────────────────────────────────────────────

describe('GUARDIAN_ORDER', () => {
  it('contains exactly 10 entries', () => {
    assert.equal(GUARDIAN_ORDER.length, 10);
  });

  it('starts with lyssandria and ends with shinkami', () => {
    assert.equal(GUARDIAN_ORDER[0], 'lyssandria');
    assert.equal(GUARDIAN_ORDER[9], 'shinkami');
  });

  it('all entries exist in GUARDIANS', () => {
    for (const id of GUARDIAN_ORDER) {
      assert.ok(GUARDIANS[id], `${id} not found in GUARDIANS`);
    }
  });

  it('has no duplicates', () => {
    const unique = new Set(GUARDIAN_ORDER);
    assert.equal(unique.size, GUARDIAN_ORDER.length);
  });

  it('follows canonical frequency ordering', () => {
    const expected = [
      'lyssandria', 'leyla', 'draconia', 'maylinn', 'alera',
      'lyria', 'aiyami', 'elara', 'ino', 'shinkami',
    ];
    assert.deepEqual(GUARDIAN_ORDER, expected);
  });
});

// ── routeToGuardian ─────────────────────────────────────────────────────────

describe('routeToGuardian', () => {
  it('returns an object with guardian, confidence, and alternatives', () => {
    const result = routeToGuardian('fix the database');
    assert.ok(typeof result.guardian === 'string');
    assert.ok(typeof result.confidence === 'number');
    assert.ok(Array.isArray(result.alternatives));
  });

  it('routes database tasks to lyssandria (Earth/Foundation)', () => {
    const result = routeToGuardian('fix the database schema migration');
    assert.equal(result.guardian, 'lyssandria');
  });

  it('routes design tasks to leyla (Water/Flow)', () => {
    const result = routeToGuardian('design a responsive ui layout with animations');
    assert.equal(result.guardian, 'leyla');
  });

  it('routes execution tasks to draconia (Fire)', () => {
    const result = routeToGuardian('ship this build fast and optimize performance');
    assert.equal(result.guardian, 'draconia');
  });

  it('routes documentation tasks to maylinn (Heart)', () => {
    const result = routeToGuardian('write documentation and readme for onboarding');
    assert.equal(result.guardian, 'maylinn');
  });

  it('routes voice/brand tasks to alera (Voice)', () => {
    const result = routeToGuardian('check the brand voice and tone of our copy');
    assert.equal(result.guardian, 'alera');
  });

  it('routes strategy tasks to lyria (Sight)', () => {
    const result = routeToGuardian('review the architecture strategy and ai patterns');
    assert.equal(result.guardian, 'lyria');
  });

  it('routes teaching tasks to aiyami (Crown)', () => {
    const result = routeToGuardian('teach best practices and mentor the team');
    assert.equal(result.guardian, 'aiyami');
  });

  it('routes innovation tasks to elara (Shift)', () => {
    const result = routeToGuardian('find an alternative perspective to reframe this');
    assert.equal(result.guardian, 'elara');
  });

  it('routes integration tasks to ino (Unity)', () => {
    const result = routeToGuardian('integrate the api plugin with the mcp sdk');
    assert.equal(result.guardian, 'ino');
  });

  it('routes meta/orchestration tasks to shinkami (Source)', () => {
    const result = routeToGuardian('orchestrate the entire system ecosystem with first principles');
    assert.equal(result.guardian, 'shinkami');
  });

  it('defaults to shinkami for unrecognized input', () => {
    const result = routeToGuardian('xyzzy plugh 12345');
    assert.equal(result.guardian, 'shinkami');
    assert.equal(result.confidence, 50);
    assert.deepEqual(result.alternatives, ['lyria', 'elara']);
  });

  it('multi-word keywords score higher than single-word', () => {
    // "code review" is a multi-word keyword for lyria (3 points)
    const result = routeToGuardian('I need a code review of this module');
    assert.equal(result.guardian, 'lyria');
  });

  it('confidence increases with more keyword matches', () => {
    const weak = routeToGuardian('database');
    const strong = routeToGuardian('database schema migration infrastructure deploy');
    assert.ok(strong.confidence > weak.confidence);
  });

  it('confidence is capped at 95', () => {
    const result = routeToGuardian(
      'database schema infrastructure deploy security ci/cd production server architecture backend sql migration docker kubernetes monitoring'
    );
    assert.ok(result.confidence <= 95);
  });

  it('provides alternatives when multiple guardians score', () => {
    // "deploy" matches both lyssandria and draconia
    const result = routeToGuardian('deploy the production build');
    assert.ok(result.alternatives.length > 0);
  });

  it('is case-insensitive', () => {
    const lower = routeToGuardian('DATABASE SCHEMA');
    const upper = routeToGuardian('database schema');
    assert.equal(lower.guardian, upper.guardian);
  });
});

// ── cycleGuardian ───────────────────────────────────────────────────────────

describe('cycleGuardian', () => {
  it('cycles from lyssandria to leyla', () => {
    assert.equal(cycleGuardian('lyssandria'), 'leyla');
  });

  it('cycles from shinkami back to lyssandria (wrap-around)', () => {
    assert.equal(cycleGuardian('shinkami'), 'lyssandria');
  });

  it('cycles through all 10 guardians in order', () => {
    let current = 'lyssandria';
    const visited = [current];
    for (let i = 0; i < 9; i++) {
      current = cycleGuardian(current);
      visited.push(current);
    }
    assert.deepEqual(visited, GUARDIAN_ORDER);
  });

  it('returns first guardian for unknown id', () => {
    // indexOf returns -1, (-1+1)%10 = 0 → lyssandria
    assert.equal(cycleGuardian('nonexistent'), 'lyssandria');
  });

  it('full cycle returns to start', () => {
    let current = 'draconia';
    for (let i = 0; i < 10; i++) {
      current = cycleGuardian(current);
    }
    assert.equal(current, 'draconia');
  });
});

// ── getGuardian ─────────────────────────────────────────────────────────────

describe('getGuardian', () => {
  it('returns correct guardian by id', () => {
    const g = getGuardian('draconia');
    assert.equal(g.name, 'Draconia');
    assert.equal(g.gate, 'Fire');
    assert.equal(g.element, 'Fire');
    assert.equal(g.godbeast, 'Draconis');
  });

  it('returns shinkami for unknown id', () => {
    const g = getGuardian('nonexistent');
    assert.equal(g.name, 'Shinkami');
    assert.equal(g.id, 'shinkami');
  });

  it('returns shinkami for empty string', () => {
    const g = getGuardian('');
    assert.equal(g.id, 'shinkami');
  });

  it('retrieves each guardian correctly', () => {
    for (const id of GUARDIAN_ORDER) {
      const g = getGuardian(id);
      assert.equal(g.id, id);
      assert.equal(g, GUARDIANS[id]);
    }
  });
});
