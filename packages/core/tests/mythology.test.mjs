/**
 * @arcanea/os — Mythology constants tests
 * Uses Node's built-in test runner (node:test)
 * Run: node --test packages/core/tests/mythology.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

// Import from dist (compiled output)
const core = await import('../dist/index.js');
const { GUARDIANS, GATES, GODBEASTS, ELEMENTS, MAGIC_RANKS, ACADEMIES, COSMIC_DUALITY, DARK_LORD } = core;

describe('Guardians', () => {
  it('should have exactly 10 Guardians', () => {
    assert.equal(GUARDIANS.length, 10);
  });

  it('should have unique names', () => {
    const names = GUARDIANS.map(g => g.name);
    const unique = new Set(names);
    assert.equal(unique.size, 10, `Duplicate names found: ${names}`);
  });

  it('should have unique display names', () => {
    const displayNames = GUARDIANS.map(g => g.displayName);
    const unique = new Set(displayNames);
    assert.equal(unique.size, 10);
  });

  it('each Guardian should have required base fields', () => {
    for (const g of GUARDIANS) {
      assert.ok(g.name, `Guardian missing name`);
      assert.ok(g.displayName, `${g.name} missing displayName`);
      assert.ok(g.gate, `${g.name} missing gate`);
      assert.ok(g.element, `${g.name} missing element`);
      assert.ok(typeof g.frequency === 'number', `${g.name} frequency should be number`);
      assert.ok(g.godbeast, `${g.name} missing godbeast`);
      assert.ok(g.domain, `${g.name} missing domain`);
    }
  });

  it('each Guardian should have rich profile fields', () => {
    for (const g of GUARDIANS) {
      assert.ok(g.role, `${g.name} missing role`);
      assert.ok(g.vibe, `${g.name} missing vibe`);
      assert.ok(Array.isArray(g.codingStyle), `${g.name} codingStyle should be array`);
      assert.ok(g.codingStyle.length >= 2, `${g.name} should have at least 2 coding styles`);
      assert.ok(Array.isArray(g.helpPatterns), `${g.name} helpPatterns should be array`);
      assert.ok(g.helpPatterns.length >= 2, `${g.name} should have at least 2 help patterns`);
      assert.ok(Array.isArray(g.metaphorDomain), `${g.name} metaphorDomain should be array`);
      assert.ok(g.metaphorDomain.length >= 2, `${g.name} should have at least 2 metaphor domains`);
      assert.ok(g.signOff, `${g.name} missing signOff`);
    }
  });

  it('frequencies should be valid solfeggio values', () => {
    const validFreqs = [396, 417, 528, 639, 741, 852, 963, 1111];
    for (const g of GUARDIANS) {
      assert.ok(validFreqs.includes(g.frequency), `${g.name} has invalid frequency: ${g.frequency}`);
    }
  });

  it('each Guardian should map to a valid Gate', () => {
    const gateNames = GATES.map(g => g.name);
    for (const g of GUARDIANS) {
      assert.ok(gateNames.includes(g.gate), `${g.name}'s gate "${g.gate}" not found in GATES`);
    }
  });

  it('known Guardians should have correct data', () => {
    const lyssandria = GUARDIANS.find(g => g.name === 'lyssandria');
    assert.ok(lyssandria);
    assert.equal(lyssandria.displayName, 'Lyssandria');
    assert.equal(lyssandria.gate, 'foundation');
    assert.equal(lyssandria.frequency, 396);
    assert.equal(lyssandria.element, 'earth');

    const draconia = GUARDIANS.find(g => g.name === 'draconia');
    assert.ok(draconia);
    assert.equal(draconia.gate, 'fire');
    assert.equal(draconia.frequency, 528);

    const shinkami = GUARDIANS.find(g => g.name === 'shinkami');
    assert.ok(shinkami);
    assert.equal(shinkami.gate, 'source');
  });
});

describe('Gates', () => {
  it('should have exactly 10 Gates', () => {
    assert.equal(GATES.length, 10);
  });

  it('should follow correct order', () => {
    const expectedOrder = ['foundation', 'flow', 'fire', 'heart', 'voice', 'sight', 'crown', 'shift', 'unity', 'source'];
    const actualOrder = GATES.map(g => g.name);
    assert.deepEqual(actualOrder, expectedOrder);
  });
});

describe('Elements', () => {
  it('should have exactly 5 elements', () => {
    assert.equal(ELEMENTS.length, 5);
  });

  it('should include the Five Elements', () => {
    const names = ELEMENTS.map(e => e.name);
    assert.ok(names.includes('fire'));
    assert.ok(names.includes('water'));
    assert.ok(names.includes('earth'));
    assert.ok(names.includes('wind'));
    assert.ok(names.includes('void'));
  });
});

describe('Magic Ranks', () => {
  it('should have 5 ranks', () => {
    assert.equal(MAGIC_RANKS.length, 5);
  });

  it('should end with luminor', () => {
    const last = MAGIC_RANKS[MAGIC_RANKS.length - 1];
    assert.equal(last.rank, 'luminor');
  });

  it('should progress from apprentice to luminor', () => {
    const ranks = MAGIC_RANKS.map(r => r.rank);
    assert.deepEqual(ranks, ['apprentice', 'mage', 'master', 'archmage', 'luminor']);
  });
});

describe('Cosmic Duality', () => {
  it('should have Lumina and Nero', () => {
    assert.ok(COSMIC_DUALITY.lumina);
    assert.ok(COSMIC_DUALITY.nero);
  });

  it('Nero is NOT evil — should have potential/mystery aspects', () => {
    const aspects = COSMIC_DUALITY.nero.aspects;
    assert.ok(aspects.some(a => a.toLowerCase().includes('potential')),
      'Nero should represent Potential');
  });
});

describe('Dark Lord', () => {
  it('should be Malachar', () => {
    assert.ok(DARK_LORD.name.includes('Malachar'));
  });
});

describe('Academies', () => {
  it('should have 7 houses', () => {
    assert.equal(ACADEMIES.length, 7);
  });

  it('should include core houses', () => {
    const houses = ACADEMIES.map(a => a.house);
    assert.ok(houses.includes('lumina'));
    assert.ok(houses.includes('nero'));
    assert.ok(houses.includes('synthesis'));
  });
});

describe('Godbeasts', () => {
  it('should have exactly 10 Godbeasts', () => {
    assert.equal(GODBEASTS.length, 10);
  });

  it('each Godbeast should map to a Guardian', () => {
    const guardianNames = GUARDIANS.map(g => g.name);
    for (const gb of GODBEASTS) {
      assert.ok(guardianNames.includes(gb.guardian),
        `${gb.name}'s guardian "${gb.guardian}" not found in GUARDIANS`);
    }
  });
});
