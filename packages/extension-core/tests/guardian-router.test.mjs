/**
 * @arcanea/extension-core — Guardian Router tests
 *
 * Tests keyword-based routing that maps messages to the best-matching Guardian.
 * Run: node --test packages/extension-core/tests/guardian-router.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
  routeToGuardian,
  scoreGuardians,
  GUARDIANS,
  getDefaultGuardian,
} from '../dist/index.js';

// ============================================
// scoreGuardians
// ============================================

describe('scoreGuardians', () => {
  it('returns an array with exactly 10 entries (one per Guardian)', () => {
    const scores = scoreGuardians('fix the database schema');
    assert.equal(scores.length, 10);
  });

  it('returns entries sorted descending by score (highest first)', () => {
    const scores = scoreGuardians('design the database schema architecture');
    for (let i = 0; i < scores.length - 1; i++) {
      assert.ok(
        scores[i].score >= scores[i + 1].score,
        `scores[${i}].score (${scores[i].score}) should be >= scores[${i + 1}].score (${scores[i + 1].score})`,
      );
    }
  });

  it('gives Lyssandria the highest score for database/architecture keywords', () => {
    const scores = scoreGuardians('design the database schema architecture');
    assert.equal(scores[0].guardian.id, 'lyssandria');
  });

  it('gives Leyla the highest score for UI design/animation keywords', () => {
    const scores = scoreGuardians('create a glassmorphism css animation component');
    assert.equal(scores[0].guardian.id, 'leyla');
  });

  it('gives Draconia the highest score for fire/execute/ship keywords', () => {
    const scores = scoreGuardians('ship the mvp and execute the launch fast');
    assert.equal(scores[0].guardian.id, 'draconia');
  });

  it('gives Aiyami the highest score for cosmic wisdom keywords', () => {
    const scores = scoreGuardians('cosmic synthesis enlighten the star consciousness wisdom');
    assert.equal(scores[0].guardian.id, 'aiyami');
  });

  it('each entry has the shape { guardian: Guardian, score: number }', () => {
    const scores = scoreGuardians('hello world');
    for (const entry of scores) {
      assert.ok(entry.guardian, 'entry must have guardian');
      assert.ok(typeof entry.guardian.id === 'string', 'guardian.id must be a string');
      assert.ok(typeof entry.score === 'number', 'score must be a number');
      assert.ok(entry.score >= 0, 'score must be non-negative');
    }
  });

  it('returns zero score for Lyssandria on a nonsense string with no keyword overlap', () => {
    // The router uses simple substring matching so short keywords like "ux" can
    // accidentally match (e.g. "quux" contains "ux"). We only assert that a
    // Guardian with highly specific long keywords scores zero for a truly alien string.
    const scores = scoreGuardians('zzzmmmtttxxx');
    const lyssandria = scores.find(s => s.guardian.id === 'lyssandria');
    assert.ok(lyssandria, 'lyssandria must be in scores');
    assert.equal(lyssandria.score, 0, 'lyssandria should score 0 for a non-matching string');
  });

  it('awards extra weight for long keywords (> 6 chars match = 2 pts)', () => {
    // "architecture" (12 chars > 6) should score 2, not 1
    const scores = scoreGuardians('architecture');
    const lyssandria = scores.find(s => s.guardian.id === 'lyssandria');
    assert.ok(lyssandria, 'lyssandria must be in scores');
    assert.ok(lyssandria.score >= 2, 'long keyword should contribute >= 2 points');
  });
});

// ============================================
// routeToGuardian
// ============================================

describe('routeToGuardian', () => {
  it('returns a Guardian object (not a string)', () => {
    const guardian = routeToGuardian('build a REST API');
    assert.ok(typeof guardian === 'object', 'should return an object');
    assert.ok('id' in guardian, 'object must have id field');
    assert.ok('name' in guardian, 'object must have name field');
  });

  it('routes database tasks to Lyssandria', () => {
    const g = routeToGuardian('design the supabase postgres schema for users');
    assert.equal(g.id, 'lyssandria');
  });

  it('routes UI/design tasks to Leyla', () => {
    const g = routeToGuardian('create a beautiful responsive tailwind layout with framer motion');
    assert.equal(g.id, 'leyla');
  });

  it('routes performance and execution tasks to Draconia', () => {
    const g = routeToGuardian('optimize the build speed and ship the code fast');
    assert.equal(g.id, 'draconia');
  });

  it('routes API/TypeScript tasks to Alera', () => {
    const g = routeToGuardian('define clear typescript interface contracts for the openapi spec');
    assert.equal(g.id, 'alera');
  });

  it('routes vision/roadmap tasks to Lyria', () => {
    const g = routeToGuardian('plan the long-term vision roadmap and strategy');
    assert.equal(g.id, 'lyria');
  });

  it('routes integration/sync tasks to Ino', () => {
    const g = routeToGuardian('integrate the webhook mcp sdk and sync the monorepo workspace');
    assert.equal(g.id, 'ino');
  });

  it('routes meta/orchestration tasks to Shinkami', () => {
    const g = routeToGuardian('orchestrate the multi-agent swarm across the arcanea ecosystem');
    assert.equal(g.id, 'shinkami');
  });

  it('routes perspective/refactor tasks to Elara', () => {
    const g = routeToGuardian('refactor the legacy code with a different paradigm shift perspective');
    assert.equal(g.id, 'elara');
  });

  it('falls back to Lyria (default Guardian) when truly no keywords match', () => {
    // Use a string with no keyword substrings at all
    const g = routeToGuardian('zzzmmmtttxxx');
    assert.equal(g.id, 'lyria', 'should fall back to Lyria when score is 0');
  });

  it('falls back to default for empty string', () => {
    const g = routeToGuardian('');
    assert.equal(g.id, 'lyria');
  });

  it('returned Guardian is found in the canonical GUARDIANS array', () => {
    const g = routeToGuardian('help me architect a distributed backend system');
    const found = GUARDIANS.find(c => c.id === g.id);
    assert.ok(found, `Guardian "${g.id}" should exist in GUARDIANS array`);
  });
});
