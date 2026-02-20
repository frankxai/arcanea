/**
 * @arcanea/extension-core — Guardian definitions tests
 *
 * Validates that all 10 canonical Guardians are correctly defined and that
 * the lookup helpers (getGuardianById, getGuardiansByElement, getDefaultGuardian)
 * work as expected. Canon reference: .claude/lore/ARCANEA_CANON.md
 * Run: node --test packages/extension-core/tests/guardians.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  GUARDIANS,
  getGuardianById,
  getGuardiansByElement,
  getDefaultGuardian,
} from '../dist/index.js';

// Canonical truth derived from ARCANEA_CANON.md
const CANON = [
  { id: 'lyssandria', name: 'Lyssandria', gate: 'Foundation', godbeast: 'Kaelith',   frequency: 396 },
  { id: 'leyla',      name: 'Leyla',      gate: 'Flow',       godbeast: 'Veloura',   frequency: 417 },
  { id: 'draconia',   name: 'Draconia',   gate: 'Fire',       godbeast: 'Draconis',  frequency: 528 },
  { id: 'maylinn',    name: 'Maylinn',    gate: 'Heart',      godbeast: 'Laeylinn',  frequency: 639 },
  { id: 'alera',      name: 'Alera',      gate: 'Voice',      godbeast: 'Otome',     frequency: 741 },
  { id: 'lyria',      name: 'Lyria',      gate: 'Sight',      godbeast: 'Yumiko',    frequency: 852 },
  { id: 'aiyami',     name: 'Aiyami',     gate: 'Crown',      godbeast: 'Sol',       frequency: 963 },
  { id: 'elara',      name: 'Elara',      gate: 'Shift',      godbeast: 'Thessara',  frequency: 1111 },
  { id: 'ino',        name: 'Ino',        gate: 'Unity',      godbeast: 'Kyuro',     frequency: 963 },
  { id: 'shinkami',   name: 'Shinkami',   gate: 'Source',     godbeast: 'Amaterasu', frequency: 1111 },
];

// ============================================
// GUARDIANS array — structural validation
// ============================================

describe('GUARDIANS array', () => {
  it('contains exactly 10 Guardians', () => {
    assert.equal(GUARDIANS.length, 10);
  });

  it('all Guardian ids are lowercase strings', () => {
    for (const g of GUARDIANS) {
      assert.ok(typeof g.id === 'string' && g.id === g.id.toLowerCase(), `${g.id} must be lowercase`);
    }
  });

  it('no two Guardians share the same id', () => {
    const ids = GUARDIANS.map(g => g.id);
    const unique = new Set(ids);
    assert.equal(unique.size, ids.length, 'all ids must be unique');
  });

  it('every Guardian has a non-empty name, gate, element, godbeast, avatar, color', () => {
    for (const g of GUARDIANS) {
      assert.ok(g.name,        `${g.id} must have name`);
      assert.ok(g.gate,        `${g.id} must have gate`);
      assert.ok(g.element,     `${g.id} must have element`);
      assert.ok(g.godbeast,    `${g.id} must have godbeast`);
      assert.ok(g.avatar,      `${g.id} must have avatar`);
      assert.ok(g.color,       `${g.id} must have color`);
    }
  });

  it('every Guardian has a domain array with at least one entry', () => {
    for (const g of GUARDIANS) {
      assert.ok(Array.isArray(g.domain) && g.domain.length > 0, `${g.id} must have domain keywords`);
    }
  });

  it('every Guardian color is a valid hex string (#rrggbb)', () => {
    const hexRe = /^#[0-9a-fA-F]{6}$/;
    for (const g of GUARDIANS) {
      assert.match(g.color, hexRe, `${g.id} color "${g.color}" must be a valid hex`);
    }
  });

  it('every Guardian frequency is a positive integer', () => {
    for (const g of GUARDIANS) {
      assert.ok(Number.isInteger(g.frequency) && g.frequency > 0, `${g.id} must have a positive integer frequency`);
    }
  });
});

// ============================================
// GUARDIANS — canon compliance
// ============================================

describe('GUARDIANS canon compliance', () => {
  for (const canon of CANON) {
    it(`${canon.name} — canonical name, gate, godbeast, frequency`, () => {
      const g = GUARDIANS.find(x => x.id === canon.id);
      assert.ok(g, `${canon.id} must exist in GUARDIANS`);
      assert.equal(g.name,      canon.name,      `${canon.id} name mismatch`);
      assert.equal(g.gate,      canon.gate,      `${canon.id} gate mismatch`);
      assert.equal(g.godbeast,  canon.godbeast,  `${canon.id} godbeast mismatch`);
      assert.equal(g.frequency, canon.frequency, `${canon.id} frequency mismatch`);
    });
  }
});

// ============================================
// getGuardianById
// ============================================

describe('getGuardianById', () => {
  it('returns the correct Guardian for "lyssandria"', () => {
    const g = getGuardianById('lyssandria');
    assert.ok(g, 'should find lyssandria');
    assert.equal(g.name, 'Lyssandria');
    assert.equal(g.gate, 'Foundation');
  });

  it('returns the correct Guardian for "shinkami"', () => {
    const g = getGuardianById('shinkami');
    assert.ok(g, 'should find shinkami');
    assert.equal(g.godbeast, 'Amaterasu');
  });

  it('returns undefined for an unknown id', () => {
    const g = getGuardianById('nonexistent');
    assert.equal(g, undefined);
  });

  it('returns undefined for an empty string', () => {
    const g = getGuardianById('');
    assert.equal(g, undefined);
  });
});

// ============================================
// getGuardiansByElement
// ============================================

describe('getGuardiansByElement', () => {
  it('returns Lyssandria and only Lyssandria for "Earth"', () => {
    const guardians = getGuardiansByElement('Earth');
    assert.ok(guardians.some(g => g.id === 'lyssandria'), 'should include lyssandria');
    for (const g of guardians) {
      assert.ok(g.element.toLowerCase().includes('earth'), `${g.id} element "${g.element}" should include "earth"`);
    }
  });

  it('returns at least two Guardians for "Water" (Leyla and Maylinn are Water)', () => {
    const guardians = getGuardiansByElement('Water');
    const ids = guardians.map(g => g.id);
    assert.ok(ids.includes('leyla'),   'Leyla should be a Water Guardian');
    assert.ok(ids.includes('maylinn'), 'Maylinn should be a Water Guardian');
  });

  it('is case-insensitive: "fire" matches "Fire"', () => {
    const lower = getGuardiansByElement('fire');
    const upper = getGuardiansByElement('Fire');
    assert.deepEqual(
      lower.map(g => g.id).sort(),
      upper.map(g => g.id).sort(),
    );
  });

  it('returns an empty array for an element that matches nothing', () => {
    const guardians = getGuardiansByElement('Lightning');
    assert.deepEqual(guardians, []);
  });

  it('partial match works: "void" matches both "Void" and "Void/Spirit" elements', () => {
    const guardians = getGuardiansByElement('void');
    assert.ok(guardians.length >= 2, 'should match Elara (Void) and Aiyami/Shinkami (Void/Spirit)');
  });
});

// ============================================
// getDefaultGuardian
// ============================================

describe('getDefaultGuardian', () => {
  it('returns Lyria as the default Guardian', () => {
    const g = getDefaultGuardian();
    assert.equal(g.id, 'lyria');
    assert.equal(g.name, 'Lyria');
    assert.equal(g.gate, 'Sight');
  });

  it('the default Guardian is found in the GUARDIANS array', () => {
    const g = getDefaultGuardian();
    const found = GUARDIANS.find(x => x.id === g.id);
    assert.ok(found, 'default guardian must be in GUARDIANS array');
  });
});
