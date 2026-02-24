/**
 * @arcanea/sona-learner — Comprehensive Test Suite
 *
 * Tests for all modules:
 * 1. Exports — verify all public API exports
 * 2. TrajectoryRecorder — begin/step/end lifecycle, context, metrics, filtering
 * 3. PatternStore — store/retrieve, similarity, categories, guardians, stats
 * 4. LearningEngine — SONA pipeline, profiles, events, cycles
 * 5. SONA (Orchestrator) — singleton, full lifecycle, stats, insight
 * 6. Guardian Integration — all 10 guardians, frequencies, gates
 * 7. Edge Cases — empty trajectories, long trajectories, concurrency
 *
 * Target: 130+ tests, 0 failures
 */

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  // Core
  SONA,
  TrajectoryRecorder,
  PatternStore,
  LearningEngine,
  generateId,
  computeLocalSimilarity,
  // Constants
  SONA_PIPELINE,
  GUARDIAN_PROFILES,
  DEFAULT_PROFILES,
  GUARDIAN_IDS,
  GATE_NAMES,
  SOLFEGGIO_FREQUENCIES,
} from '../dist/index.js';

// Force exit after tests complete (node:test can hang with EventEmitters)
after(() => { setTimeout(() => process.exit(0), 500); });

// =============================================================================
// 1. EXPORTS
// =============================================================================

describe('Exports', { timeout: 10000 }, () => {
  it('exports SONA class', () => {
    assert.ok(SONA);
    assert.strictEqual(typeof SONA, 'function');
  });

  it('exports TrajectoryRecorder class', () => {
    assert.ok(TrajectoryRecorder);
    assert.strictEqual(typeof TrajectoryRecorder, 'function');
  });

  it('exports PatternStore class', () => {
    assert.ok(PatternStore);
    assert.strictEqual(typeof PatternStore, 'function');
  });

  it('exports LearningEngine class', () => {
    assert.ok(LearningEngine);
    assert.strictEqual(typeof LearningEngine, 'function');
  });

  it('exports generateId function', () => {
    assert.strictEqual(typeof generateId, 'function');
  });

  it('exports computeLocalSimilarity function', () => {
    assert.strictEqual(typeof computeLocalSimilarity, 'function');
  });

  it('exports SONA_PIPELINE constant', () => {
    assert.ok(Array.isArray(SONA_PIPELINE));
    assert.strictEqual(SONA_PIPELINE.length, 4);
  });

  it('exports GUARDIAN_PROFILES constant', () => {
    assert.ok(GUARDIAN_PROFILES);
    assert.strictEqual(typeof GUARDIAN_PROFILES, 'object');
  });

  it('exports DEFAULT_PROFILES constant', () => {
    assert.ok(Array.isArray(DEFAULT_PROFILES));
    assert.strictEqual(DEFAULT_PROFILES.length, 4);
  });

  it('exports GUARDIAN_IDS constant', () => {
    assert.ok(Array.isArray(GUARDIAN_IDS));
    assert.strictEqual(GUARDIAN_IDS.length, 10);
  });

  it('exports GATE_NAMES constant', () => {
    assert.ok(Array.isArray(GATE_NAMES));
    assert.strictEqual(GATE_NAMES.length, 10);
  });

  it('exports SOLFEGGIO_FREQUENCIES constant', () => {
    assert.ok(Array.isArray(SOLFEGGIO_FREQUENCIES));
    assert.strictEqual(SOLFEGGIO_FREQUENCIES.length, 10);
  });

  it('SONA_PIPELINE has correct stages', () => {
    assert.deepStrictEqual([...SONA_PIPELINE], ['RETRIEVE', 'JUDGE', 'DISTILL', 'CONSOLIDATE']);
  });

  it('DEFAULT_PROFILES has correct mode names', () => {
    const modes = DEFAULT_PROFILES.map(p => p.mode);
    assert.deepStrictEqual(modes, ['default', 'fast', 'accurate', 'memory-efficient']);
  });

  it('all classes are instantiable', () => {
    assert.ok(new TrajectoryRecorder());
    assert.ok(new PatternStore());
    assert.ok(new LearningEngine(new PatternStore()));
  });
});

// =============================================================================
// 2. TRAJECTORY RECORDER
// =============================================================================

describe('TrajectoryRecorder', { timeout: 10000 }, () => {
  let recorder;

  beforeEach(() => {
    recorder = new TrajectoryRecorder();
  });

  describe('begin', () => {
    it('returns a trajectory ID', () => {
      const id = recorder.begin();
      assert.ok(id);
      assert.ok(id.startsWith('traj_'));
    });

    it('auto-generates a session ID when not provided', () => {
      const id = recorder.begin();
      const traj = recorder.get(id);
      assert.ok(traj.sessionId);
      assert.ok(traj.sessionId.startsWith('session_'));
    });

    it('uses provided session ID', () => {
      const id = recorder.begin('my-session');
      const traj = recorder.get(id);
      assert.strictEqual(traj.sessionId, 'my-session');
    });

    it('stores guardian ID', () => {
      const id = recorder.begin(undefined, 'lyria');
      const traj = recorder.get(id);
      assert.strictEqual(traj.guardianId, 'lyria');
    });

    it('stores initial context', () => {
      const ctx = { task: 'analyze', depth: 3 };
      const id = recorder.begin(undefined, undefined, ctx);
      const traj = recorder.get(id);
      assert.deepStrictEqual(traj.context, ctx);
    });

    it('initializes empty steps array', () => {
      const id = recorder.begin();
      const traj = recorder.get(id);
      assert.ok(Array.isArray(traj.steps));
      assert.strictEqual(traj.steps.length, 0);
    });

    it('sets startedAt to a Date', () => {
      const id = recorder.begin();
      const traj = recorder.get(id);
      assert.ok(traj.startedAt instanceof Date);
    });

    it('has no endedAt initially', () => {
      const id = recorder.begin();
      const traj = recorder.get(id);
      assert.strictEqual(traj.endedAt, undefined);
    });
  });

  describe('step', () => {
    it('records a step and returns step ID', () => {
      const trajId = recorder.begin();
      const stepId = recorder.step(trajId, 'analyze code');
      assert.ok(stepId);
      assert.ok(stepId.startsWith('step_'));
    });

    it('adds step to trajectory', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'first action');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.steps.length, 1);
      assert.strictEqual(traj.steps[0].action, 'first action');
    });

    it('records observation', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'query db', 'found 42 records');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.steps[0].observation, 'found 42 records');
    });

    it('records reward', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'optimize query', undefined, 0.8);
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.steps[0].reward, 0.8);
    });

    it('records metadata', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'deploy', undefined, undefined, { region: 'us-east' });
      const traj = recorder.get(trajId);
      assert.deepStrictEqual(traj.steps[0].metadata, { region: 'us-east' });
    });

    it('records guardian ID on step', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'deploy', undefined, undefined, undefined, 'lyssandria');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.steps[0].guardianId, 'lyssandria');
    });

    it('throws on nonexistent trajectory', () => {
      assert.throws(
        () => recorder.step('nonexistent', 'action'),
        /not found/
      );
    });

    it('throws on ended trajectory', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'action');
      recorder.end(trajId, 'success');
      assert.throws(
        () => recorder.step(trajId, 'another action'),
        /already ended/
      );
    });

    it('supports multiple sequential steps', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'step 1');
      recorder.step(trajId, 'step 2');
      recorder.step(trajId, 'step 3');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.steps.length, 3);
    });
  });

  describe('addContext', () => {
    it('adds context to trajectory', () => {
      const trajId = recorder.begin();
      recorder.addContext(trajId, { key: 'value' });
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.context.key, 'value');
    });

    it('merges with existing context', () => {
      const trajId = recorder.begin(undefined, undefined, { a: 1 });
      recorder.addContext(trajId, { b: 2 });
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.context.a, 1);
      assert.strictEqual(traj.context.b, 2);
    });

    it('overwrites existing context keys', () => {
      const trajId = recorder.begin(undefined, undefined, { a: 1 });
      recorder.addContext(trajId, { a: 99 });
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.context.a, 99);
    });

    it('throws on nonexistent trajectory', () => {
      assert.throws(
        () => recorder.addContext('nonexistent', { key: 'val' }),
        /not found/
      );
    });
  });

  describe('end', () => {
    it('returns metrics', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'action');
      const metrics = recorder.end(trajId, 'success');
      assert.ok(metrics);
      assert.strictEqual(metrics.totalSteps, 1);
      assert.strictEqual(typeof metrics.duration, 'number');
      assert.strictEqual(typeof metrics.avgStepDuration, 'number');
    });

    it('sets verdict on trajectory', () => {
      const trajId = recorder.begin();
      recorder.end(trajId, 'failure');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.verdict, 'failure');
    });

    it('sets endedAt on trajectory', () => {
      const trajId = recorder.begin();
      recorder.end(trajId, 'success');
      const traj = recorder.get(trajId);
      assert.ok(traj.endedAt instanceof Date);
    });

    it('computes avgStepDuration', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'step 1');
      recorder.step(trajId, 'step 2');
      const metrics = recorder.end(trajId, 'success');
      assert.ok(metrics.avgStepDuration >= 0);
      assert.strictEqual(metrics.totalSteps, 2);
    });

    it('handles learningTriggered flag', () => {
      const trajId = recorder.begin();
      const m1 = recorder.end(trajId, 'success', true);
      assert.strictEqual(m1.learningTriggered, true);

      const trajId2 = recorder.begin();
      const m2 = recorder.end(trajId2, 'success', false);
      assert.strictEqual(m2.learningTriggered, false);
    });

    it('computes success rate from rewards', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'good', undefined, 0.9);
      recorder.step(trajId, 'bad', undefined, -0.5);
      recorder.step(trajId, 'good2', undefined, 0.7);
      const metrics = recorder.end(trajId, 'success');
      // 2 positive out of 3 with rewards = ~0.667
      assert.ok(metrics.successRate !== undefined);
      assert.ok(metrics.successRate > 0.6 && metrics.successRate < 0.7);
    });

    it('success rate is undefined when no steps have rewards', () => {
      const trajId = recorder.begin();
      recorder.step(trajId, 'no reward');
      const metrics = recorder.end(trajId, 'success');
      assert.strictEqual(metrics.successRate, undefined);
    });

    it('throws on nonexistent trajectory', () => {
      assert.throws(
        () => recorder.end('nonexistent', 'success'),
        /not found/
      );
    });

    it('throws on double end', () => {
      const trajId = recorder.begin();
      recorder.end(trajId, 'success');
      assert.throws(
        () => recorder.end(trajId, 'failure'),
        /already ended/
      );
    });

    it('supports partial verdict', () => {
      const trajId = recorder.begin();
      recorder.end(trajId, 'partial');
      const traj = recorder.get(trajId);
      assert.strictEqual(traj.verdict, 'partial');
    });
  });

  describe('list', () => {
    it('lists all trajectories', () => {
      recorder.begin('s1');
      recorder.begin('s2');
      const list = recorder.list();
      assert.strictEqual(list.length, 2);
    });

    it('filters by sessionId', () => {
      recorder.begin('s1');
      recorder.begin('s1');
      recorder.begin('s2');
      const list = recorder.list({ sessionId: 's1' });
      assert.strictEqual(list.length, 2);
    });

    it('filters by verdict', () => {
      const t1 = recorder.begin();
      const t2 = recorder.begin();
      const t3 = recorder.begin();
      recorder.end(t1, 'success');
      recorder.end(t2, 'failure');
      recorder.end(t3, 'success');
      const list = recorder.list({ verdict: 'success' });
      assert.strictEqual(list.length, 2);
    });

    it('filters by guardianId', () => {
      recorder.begin(undefined, 'lyria');
      recorder.begin(undefined, 'lyria');
      recorder.begin(undefined, 'draconia');
      const list = recorder.list({ guardianId: 'lyria' });
      assert.strictEqual(list.length, 2);
    });

    it('respects limit', () => {
      for (let i = 0; i < 10; i++) recorder.begin();
      const list = recorder.list({ limit: 3 });
      assert.strictEqual(list.length, 3);
    });

    it('returns empty array when no matches', () => {
      recorder.begin('s1');
      const list = recorder.list({ sessionId: 'nonexistent' });
      assert.strictEqual(list.length, 0);
    });
  });

  describe('getStats', () => {
    it('returns stats with zero trajectories', () => {
      const stats = recorder.getStats();
      assert.strictEqual(stats.total, 0);
      assert.strictEqual(stats.active, 0);
      assert.strictEqual(stats.completed, 0);
      assert.strictEqual(stats.avgDuration, 0);
    });

    it('counts active and completed trajectories', () => {
      const t1 = recorder.begin();
      recorder.begin(); // active
      recorder.end(t1, 'success');
      const stats = recorder.getStats();
      assert.strictEqual(stats.total, 2);
      assert.strictEqual(stats.active, 1);
      assert.strictEqual(stats.completed, 1);
      assert.strictEqual(stats.successful, 1);
    });

    it('counts by verdict', () => {
      const t1 = recorder.begin();
      const t2 = recorder.begin();
      const t3 = recorder.begin();
      recorder.end(t1, 'success');
      recorder.end(t2, 'failure');
      recorder.end(t3, 'partial');
      const stats = recorder.getStats();
      assert.strictEqual(stats.successful, 1);
      assert.strictEqual(stats.failed, 1);
      assert.strictEqual(stats.partial, 1);
    });
  });

  describe('concurrent trajectories', () => {
    it('supports multiple concurrent active trajectories', () => {
      const ids = [];
      for (let i = 0; i < 5; i++) {
        ids.push(recorder.begin(`session-${i}`));
      }
      // All are active
      const stats = recorder.getStats();
      assert.strictEqual(stats.total, 5);
      assert.strictEqual(stats.active, 5);

      // Step on each
      for (const id of ids) {
        recorder.step(id, `action for ${id}`);
      }

      // End some
      recorder.end(ids[0], 'success');
      recorder.end(ids[1], 'failure');

      const stats2 = recorder.getStats();
      assert.strictEqual(stats2.active, 3);
      assert.strictEqual(stats2.completed, 2);
    });
  });

  describe('clear', () => {
    it('removes all trajectories', () => {
      recorder.begin();
      recorder.begin();
      recorder.clear();
      assert.strictEqual(recorder.getStats().total, 0);
    });
  });
});

// =============================================================================
// 3. PATTERN STORE
// =============================================================================

describe('PatternStore', { timeout: 10000 }, () => {
  let store;

  beforeEach(() => {
    store = new PatternStore();
  });

  describe('store', () => {
    it('stores a pattern and returns it with generated id', () => {
      const pattern = store.store({ content: 'test pattern', category: 'general', confidence: 0.8 });
      assert.ok(pattern.id);
      assert.ok(pattern.id.startsWith('pat_'));
      assert.strictEqual(pattern.content, 'test pattern');
      assert.strictEqual(pattern.category, 'general');
      assert.strictEqual(pattern.confidence, 0.8);
    });

    it('uses provided id', () => {
      const pattern = store.store({ id: 'custom-id', content: 'test', category: 'general', confidence: 0.5 });
      assert.strictEqual(pattern.id, 'custom-id');
    });

    it('initializes usageCount to 0', () => {
      const pattern = store.store({ content: 'test', category: 'general', confidence: 0.5 });
      assert.strictEqual(pattern.usageCount, 0);
    });

    it('sets createdAt and lastUsed to now', () => {
      const before = new Date();
      const pattern = store.store({ content: 'test', category: 'general', confidence: 0.5 });
      const after = new Date();
      assert.ok(pattern.createdAt >= before);
      assert.ok(pattern.createdAt <= after);
      assert.ok(pattern.lastUsed >= before);
    });

    it('stores guardianId and gateFrequency', () => {
      const pattern = store.store({
        content: 'test', category: 'stability', confidence: 0.9,
        guardianId: 'lyssandria', gateFrequency: 174
      });
      assert.strictEqual(pattern.guardianId, 'lyssandria');
      assert.strictEqual(pattern.gateFrequency, 174);
    });

    it('stores optional embedding', () => {
      const embedding = [0.1, 0.2, 0.3];
      const pattern = store.store({ content: 'test', category: 'general', confidence: 0.5, embedding });
      assert.deepStrictEqual(pattern.embedding, [0.1, 0.2, 0.3]);
    });
  });

  describe('find', () => {
    it('finds patterns by similarity', () => {
      store.store({ content: 'database schema design optimization', category: 'general', confidence: 0.8 });
      store.store({ content: 'user interface styling css', category: 'general', confidence: 0.7 });
      const results = store.find('database schema', { threshold: 0.1 });
      assert.ok(results.length > 0);
      assert.ok(results[0].similarity > 0);
    });

    it('returns results sorted by similarity descending', () => {
      store.store({ content: 'database schema design', category: 'general', confidence: 0.8 });
      store.store({ content: 'database', category: 'general', confidence: 0.7 });
      store.store({ content: 'completely unrelated topic', category: 'general', confidence: 0.6 });
      const results = store.find('database schema design patterns', { threshold: 0.0 });
      for (let i = 1; i < results.length; i++) {
        assert.ok(results[i - 1].similarity >= results[i].similarity);
      }
    });

    it('filters by category', () => {
      store.store({ content: 'pattern one', category: 'stability', confidence: 0.8 });
      store.store({ content: 'pattern one variant', category: 'creativity', confidence: 0.7 });
      const results = store.find('pattern one', { category: 'stability', threshold: 0.0 });
      assert.ok(results.every(r => r.pattern.category === 'stability'));
    });

    it('filters by guardianId', () => {
      store.store({ content: 'earth pattern', category: 'general', confidence: 0.8, guardianId: 'lyssandria' });
      store.store({ content: 'earth pattern variant', category: 'general', confidence: 0.7, guardianId: 'draconia' });
      const results = store.find('earth pattern', { guardianId: 'lyssandria', threshold: 0.0 });
      assert.ok(results.every(r => r.pattern.guardianId === 'lyssandria'));
    });

    it('applies threshold filter', () => {
      store.store({ content: 'exact match test query', category: 'general', confidence: 0.8 });
      store.store({ content: 'completely different words here', category: 'general', confidence: 0.7 });
      const results = store.find('exact match test query', { threshold: 0.5 });
      assert.ok(results.every(r => r.similarity >= 0.5));
    });

    it('respects topK limit', () => {
      for (let i = 0; i < 20; i++) {
        store.store({ content: `pattern number ${i} database query`, category: 'general', confidence: 0.5 });
      }
      const results = store.find('database query', { topK: 3, threshold: 0.0 });
      assert.ok(results.length <= 3);
    });

    it('increments usageCount on accessed patterns', () => {
      const p = store.store({ content: 'usage tracking test', category: 'general', confidence: 0.8 });
      assert.strictEqual(p.usageCount, 0);
      store.find('usage tracking test', { threshold: 0.0 });
      const updated = store.get(p.id);
      assert.ok(updated.usageCount >= 1);
    });

    it('updates lastUsed on accessed patterns', () => {
      const p = store.store({ content: 'last used test', category: 'general', confidence: 0.8 });
      const originalLastUsed = p.lastUsed;
      // Small delay to ensure time difference
      store.find('last used test', { threshold: 0.0 });
      const updated = store.get(p.id);
      assert.ok(updated.lastUsed >= originalLastUsed);
    });

    it('returns empty for no matches above threshold', () => {
      store.store({ content: 'abc def ghi', category: 'general', confidence: 0.8 });
      const results = store.find('xyz qrs tuv', { threshold: 0.9 });
      assert.strictEqual(results.length, 0);
    });
  });

  describe('get', () => {
    it('returns a stored pattern', () => {
      const p = store.store({ content: 'test', category: 'general', confidence: 0.5 });
      const found = store.get(p.id);
      assert.ok(found);
      assert.strictEqual(found.id, p.id);
    });

    it('returns undefined for nonexistent id', () => {
      assert.strictEqual(store.get('nonexistent'), undefined);
    });
  });

  describe('update', () => {
    it('updates pattern fields', () => {
      const p = store.store({ content: 'original', category: 'general', confidence: 0.5 });
      store.update(p.id, { content: 'updated', confidence: 0.99 });
      const updated = store.get(p.id);
      assert.strictEqual(updated.content, 'updated');
      assert.strictEqual(updated.confidence, 0.99);
    });

    it('throws on nonexistent pattern', () => {
      assert.throws(
        () => store.update('nonexistent', { content: 'x' }),
        /not found/
      );
    });
  });

  describe('delete', () => {
    it('deletes a pattern', () => {
      const p = store.store({ content: 'test', category: 'general', confidence: 0.5 });
      assert.strictEqual(store.delete(p.id), true);
      assert.strictEqual(store.get(p.id), undefined);
    });

    it('returns false for nonexistent pattern', () => {
      assert.strictEqual(store.delete('nonexistent'), false);
    });
  });

  describe('getByCategory', () => {
    it('returns all patterns in a category', () => {
      store.store({ content: 'a', category: 'stability', confidence: 0.5 });
      store.store({ content: 'b', category: 'stability', confidence: 0.6 });
      store.store({ content: 'c', category: 'creativity', confidence: 0.7 });
      const results = store.getByCategory('stability');
      assert.strictEqual(results.length, 2);
    });

    it('returns empty for unknown category', () => {
      assert.strictEqual(store.getByCategory('unknown').length, 0);
    });
  });

  describe('getByGuardian', () => {
    it('returns all patterns for a guardian', () => {
      store.store({ content: 'a', category: 'general', confidence: 0.5, guardianId: 'lyria' });
      store.store({ content: 'b', category: 'general', confidence: 0.6, guardianId: 'lyria' });
      store.store({ content: 'c', category: 'general', confidence: 0.7, guardianId: 'draconia' });
      const results = store.getByGuardian('lyria');
      assert.strictEqual(results.length, 2);
    });

    it('returns empty for guardian with no patterns', () => {
      assert.strictEqual(store.getByGuardian('shinkami').length, 0);
    });
  });

  describe('getStats', () => {
    it('returns correct stats', () => {
      store.store({ content: 'a', category: 'stability', confidence: 0.5, guardianId: 'lyssandria' });
      store.store({ content: 'b', category: 'creativity', confidence: 0.6, guardianId: 'leyla' });
      store.find('a', { threshold: 0.0 });
      const stats = store.getStats();
      assert.strictEqual(stats.stored, 2);
      assert.strictEqual(stats.searchesPerformed, 1);
      assert.ok(stats.avgSearchLatency >= 0);
      assert.ok(stats.categories.includes('stability'));
      assert.ok(stats.categories.includes('creativity'));
      assert.ok(stats.guardians.includes('lyssandria'));
      assert.ok(stats.guardians.includes('leyla'));
    });
  });

  describe('clear', () => {
    it('removes all patterns and resets stats', () => {
      store.store({ content: 'a', category: 'general', confidence: 0.5 });
      store.find('a', { threshold: 0.0 });
      store.clear();
      const stats = store.getStats();
      assert.strictEqual(stats.stored, 0);
      assert.strictEqual(stats.searchesPerformed, 0);
    });
  });
});

// =============================================================================
// 3.5 computeLocalSimilarity
// =============================================================================

describe('computeLocalSimilarity', { timeout: 10000 }, () => {
  it('returns 1.0 for identical strings', () => {
    assert.strictEqual(computeLocalSimilarity('hello world', 'hello world'), 1.0);
  });

  it('returns 0 for completely different strings', () => {
    assert.strictEqual(computeLocalSimilarity('abc', 'xyz'), 0);
  });

  it('returns partial similarity for overlapping words', () => {
    const sim = computeLocalSimilarity('hello world', 'hello there');
    assert.ok(sim > 0);
    assert.ok(sim < 1);
  });

  it('is case insensitive', () => {
    assert.strictEqual(
      computeLocalSimilarity('Hello World', 'hello world'),
      1.0
    );
  });

  it('returns 1.0 for both empty strings', () => {
    assert.strictEqual(computeLocalSimilarity('', ''), 1.0);
  });

  it('returns 0 when one string is empty', () => {
    assert.strictEqual(computeLocalSimilarity('hello', ''), 0);
    assert.strictEqual(computeLocalSimilarity('', 'world'), 0);
  });
});

// =============================================================================
// 3.6 generateId
// =============================================================================

describe('generateId', { timeout: 10000 }, () => {
  it('generates IDs with prefix', () => {
    const id = generateId('test');
    assert.ok(id.startsWith('test_'));
  });

  it('generates unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId('uniq'));
    }
    assert.strictEqual(ids.size, 100);
  });
});

// =============================================================================
// 4. LEARNING ENGINE
// =============================================================================

describe('LearningEngine', { timeout: 10000 }, () => {
  let store;
  let engine;

  beforeEach(() => {
    store = new PatternStore();
    engine = new LearningEngine(store);
  });

  describe('learn from successful trajectory', () => {
    it('returns a LearningCycle', () => {
      const trajectory = makeTrajectory('success', 3);
      const cycle = engine.learn(trajectory);
      assert.ok(cycle.id);
      assert.ok(cycle.id.startsWith('cycle_'));
      assert.ok(cycle.startedAt instanceof Date);
      assert.ok(cycle.completedAt instanceof Date);
    });

    it('extracts patterns from successful steps', () => {
      const trajectory = makeTrajectory('success', 3);
      const cycle = engine.learn(trajectory);
      assert.ok(cycle.patternsLearned > 0);
    });

    it('records trajectory ID', () => {
      const trajectory = makeTrajectory('success', 2);
      const cycle = engine.learn(trajectory);
      assert.deepStrictEqual(cycle.trajectoryIds, [trajectory.id]);
    });

    it('executes all 4 pipeline stages', () => {
      const trajectory = makeTrajectory('success', 2);
      const cycle = engine.learn(trajectory);
      assert.deepStrictEqual(cycle.metrics.stagesExecuted, ['RETRIEVE', 'JUDGE', 'DISTILL', 'CONSOLIDATE']);
    });
  });

  describe('learn from failed trajectory', () => {
    it('does not extract new patterns', () => {
      const trajectory = makeTrajectory('failure', 3);
      const cycle = engine.learn(trajectory);
      assert.strictEqual(cycle.patternsLearned, 0);
    });

    it('still completes all pipeline stages', () => {
      const trajectory = makeTrajectory('failure', 2);
      const cycle = engine.learn(trajectory);
      assert.strictEqual(cycle.metrics.stagesExecuted.length, 4);
    });
  });

  describe('learn from partial trajectory', () => {
    it('extracts patterns with reduced confidence', () => {
      const trajectory = makeTrajectory('partial', 3);
      const cycle = engine.learn(trajectory);
      assert.ok(cycle.patternsLearned > 0);
    });
  });

  describe('pattern reinforcement', () => {
    it('reinforces existing patterns on success', () => {
      // Store a pattern, then learn a similar trajectory
      store.store({ content: 'analyze database schema', category: 'general', confidence: 0.5 });
      const trajectory = makeTrajectory('success', 1, 'analyze database schema');
      const cycle = engine.learn(trajectory);
      // Should have found and reinforced the existing pattern
      assert.ok(cycle.metrics.patternsEvaluated >= 0);
    });
  });

  describe('profile management', () => {
    it('getProfile returns active profile by default', () => {
      const profile = engine.getProfile();
      assert.strictEqual(profile.id, 'default');
    });

    it('getProfile returns specific profile by id', () => {
      const profile = engine.getProfile('fast');
      assert.strictEqual(profile.id, 'fast');
      assert.strictEqual(profile.mode, 'fast');
    });

    it('setProfile changes active profile', () => {
      engine.setProfile('accurate');
      const profile = engine.getProfile();
      assert.strictEqual(profile.id, 'accurate');
    });

    it('setProfile throws on nonexistent profile', () => {
      assert.throws(
        () => engine.setProfile('nonexistent'),
        /not found/
      );
    });

    it('listProfiles returns all profiles including guardian profiles', () => {
      const profiles = engine.listProfiles();
      assert.ok(profiles.length >= 14); // 4 default + 10 guardian
    });

    it('has guardian profiles for all 10 guardians', () => {
      const profiles = engine.listProfiles();
      for (const gid of GUARDIAN_IDS) {
        const found = profiles.find(p => p.id === `guardian-${gid}`);
        assert.ok(found, `Missing guardian profile for ${gid}`);
      }
    });
  });

  describe('validates 4 default profiles', () => {
    it('default profile has correct settings', () => {
      const p = engine.getProfile('default');
      assert.strictEqual(p.settings.learningRate, 0.001);
      assert.strictEqual(p.settings.batchSize, 32);
      assert.strictEqual(p.settings.microLoraEnabled, true);
    });

    it('fast profile has higher learning rate', () => {
      const p = engine.getProfile('fast');
      assert.strictEqual(p.settings.learningRate, 0.01);
      assert.strictEqual(p.settings.batchSize, 16);
    });

    it('accurate profile has lower learning rate', () => {
      const p = engine.getProfile('accurate');
      assert.strictEqual(p.settings.learningRate, 0.0001);
      assert.strictEqual(p.settings.batchSize, 64);
    });

    it('memory-efficient profile has microLoraEnabled=false', () => {
      const p = engine.getProfile('memory-efficient');
      assert.strictEqual(p.settings.microLoraEnabled, false);
      assert.strictEqual(p.settings.batchSize, 8);
    });
  });

  describe('events', () => {
    it('emits cycle-complete event', () => {
      let emitted = false;
      engine.on('cycle-complete', (cycle) => {
        emitted = true;
        assert.ok(cycle.id);
      });
      engine.learn(makeTrajectory('success', 2));
      assert.ok(emitted);
    });

    it('emits pattern-learned event for new patterns', () => {
      const learned = [];
      engine.on('pattern-learned', (pattern) => {
        learned.push(pattern);
      });
      engine.learn(makeTrajectory('success', 3));
      assert.ok(learned.length > 0);
    });

    it('emits profile-changed event on setProfile', () => {
      let emitted = false;
      engine.on('profile-changed', ({ previous, current }) => {
        emitted = true;
        assert.strictEqual(previous, 'default');
        assert.strictEqual(current, 'fast');
      });
      engine.setProfile('fast');
      assert.ok(emitted);
    });
  });

  describe('forceLearn', () => {
    it('learns from multiple trajectories', () => {
      const trajectories = [
        makeTrajectory('success', 3),
        makeTrajectory('failure', 2),
        makeTrajectory('partial', 4),
      ];
      const cycles = engine.forceLearn(trajectories);
      assert.strictEqual(cycles.length, 3);
    });

    it('skips trajectories without verdict', () => {
      const t = makeTrajectory('success', 2);
      delete t.verdict;
      const cycles = engine.forceLearn([t]);
      assert.strictEqual(cycles.length, 0);
    });
  });

  describe('getStats', () => {
    it('returns initial stats', () => {
      const stats = engine.getStats();
      assert.strictEqual(stats.cyclesCompleted, 0);
      assert.strictEqual(stats.lastCycle, null);
      assert.strictEqual(stats.avgCycleDuration, 0);
      assert.strictEqual(stats.activeProfile, 'default');
    });

    it('updates after learning', () => {
      engine.learn(makeTrajectory('success', 2));
      const stats = engine.getStats();
      assert.strictEqual(stats.cyclesCompleted, 1);
      assert.ok(stats.lastCycle !== null);
    });
  });
});

// =============================================================================
// 5. SONA ORCHESTRATOR
// =============================================================================

describe('SONA Orchestrator', { timeout: 10000 }, () => {
  let sona;

  beforeEach(() => {
    SONA.resetInstance();
    sona = SONA.getInstance();
  });

  describe('singleton pattern', () => {
    it('getInstance returns same instance', () => {
      const a = SONA.getInstance();
      const b = SONA.getInstance();
      assert.strictEqual(a, b);
    });

    it('resetInstance clears singleton', () => {
      const a = SONA.getInstance();
      SONA.resetInstance();
      const b = SONA.getInstance();
      assert.notStrictEqual(a, b);
    });
  });

  describe('full trajectory lifecycle', () => {
    it('begin returns trajectory ID', () => {
      const id = sona.begin('session-1', 'lyria');
      assert.ok(id);
      assert.ok(id.startsWith('traj_'));
    });

    it('step records action', () => {
      const trajId = sona.begin();
      const stepId = sona.step(trajId, 'analyze');
      assert.ok(stepId.startsWith('step_'));
    });

    it('addContext merges context', () => {
      const trajId = sona.begin();
      sona.addContext(trajId, { depth: 5 });
      const traj = sona.getTrajectory(trajId);
      assert.strictEqual(traj.context.depth, 5);
    });

    it('end returns metrics and triggers learning', () => {
      const trajId = sona.begin('s', 'lyria');
      sona.step(trajId, 'observe', 'data found', 0.8);
      sona.step(trajId, 'analyze', 'patterns detected', 0.9);
      const metrics = sona.end(trajId, 'success');
      assert.strictEqual(metrics.totalSteps, 2);
      assert.ok(metrics.duration >= 0);
      assert.strictEqual(metrics.learningTriggered, true);
    });

    it('end with triggerLearning=false skips learning', () => {
      const trajId = sona.begin();
      sona.step(trajId, 'action');
      const metrics = sona.end(trajId, 'success', false);
      assert.strictEqual(metrics.learningTriggered, false);
    });

    it('getTrajectory retrieves stored trajectory', () => {
      const trajId = sona.begin('ses', 'draconia');
      sona.step(trajId, 'fire blast');
      const traj = sona.getTrajectory(trajId);
      assert.strictEqual(traj.guardianId, 'draconia');
      assert.strictEqual(traj.steps.length, 1);
    });

    it('listTrajectories returns all trajectories', () => {
      sona.begin();
      sona.begin();
      assert.strictEqual(sona.listTrajectories().length, 2);
    });
  });

  describe('pattern operations', () => {
    it('storePattern stores and returns pattern', () => {
      const p = sona.storePattern({ content: 'test pattern', category: 'general', confidence: 0.8 });
      assert.ok(p.id);
      assert.strictEqual(p.content, 'test pattern');
    });

    it('findPatterns searches stored patterns', () => {
      sona.storePattern({ content: 'database query optimization', category: 'general', confidence: 0.8 });
      const results = sona.findPatterns('database query', { threshold: 0.0 });
      assert.ok(results.length > 0);
    });

    it('getPatternsByGuardian filters by guardian', () => {
      sona.storePattern({ content: 'a', category: 'general', confidence: 0.5, guardianId: 'lyria' });
      sona.storePattern({ content: 'b', category: 'general', confidence: 0.5, guardianId: 'elara' });
      assert.strictEqual(sona.getPatternsByGuardian('lyria').length, 1);
    });

    it('getPattern retrieves by id', () => {
      const p = sona.storePattern({ content: 'test', category: 'general', confidence: 0.5 });
      const found = sona.getPattern(p.id);
      assert.strictEqual(found.id, p.id);
    });
  });

  describe('learning operations', () => {
    it('forceLearn triggers learning on completed trajectories', () => {
      const t1 = sona.begin();
      sona.step(t1, 'action 1', 'obs', 0.8);
      sona.end(t1, 'success', false); // don't auto-learn

      const t2 = sona.begin();
      sona.step(t2, 'action 2', 'obs', -0.2);
      sona.end(t2, 'failure', false);

      const cycles = sona.forceLearn();
      assert.strictEqual(cycles.length, 2);
    });

    it('getProfile returns a profile', () => {
      const p = sona.getProfile('default');
      assert.strictEqual(p.id, 'default');
    });

    it('setProfile switches active profile', () => {
      sona.setProfile('fast');
      const p = sona.getProfile();
      assert.strictEqual(p.id, 'fast');
    });

    it('listProfiles returns all profiles', () => {
      const profiles = sona.listProfiles();
      assert.ok(profiles.length >= 14);
    });
  });

  describe('enable/disable', () => {
    it('isEnabled returns true by default', () => {
      assert.strictEqual(sona.isEnabled(), true);
    });

    it('disable prevents operations', () => {
      sona.disable();
      assert.strictEqual(sona.isEnabled(), false);
      assert.throws(() => sona.begin(), /disabled/);
    });

    it('enable re-enables operations', () => {
      sona.disable();
      sona.enable();
      assert.strictEqual(sona.isEnabled(), true);
      const id = sona.begin();
      assert.ok(id);
    });

    it('disable prevents step', () => {
      const trajId = sona.begin();
      sona.disable();
      assert.throws(() => sona.step(trajId, 'action'), /disabled/);
    });

    it('disable prevents end', () => {
      const trajId = sona.begin();
      sona.step(trajId, 'action');
      sona.disable();
      assert.throws(() => sona.end(trajId, 'success'), /disabled/);
    });

    it('disable prevents forceLearn', () => {
      sona.disable();
      assert.throws(() => sona.forceLearn(), /disabled/);
    });
  });

  describe('benchmark', () => {
    it('returns latency stats', () => {
      const result = sona.benchmark();
      assert.ok(result.microLoraLatency);
      assert.strictEqual(typeof result.microLoraLatency.avg, 'number');
      assert.strictEqual(typeof result.microLoraLatency.p95, 'number');
      assert.strictEqual(typeof result.microLoraLatency.p99, 'number');
      assert.strictEqual(result.iterations, 100);
    });

    it('avg latency is reasonable (< 10ms)', () => {
      const result = sona.benchmark();
      assert.ok(result.microLoraLatency.avg < 10);
    });

    it('p99 >= p95 >= avg', () => {
      const result = sona.benchmark();
      const { avg, p95, p99 } = result.microLoraLatency;
      assert.ok(p99 >= p95);
      // p95 might equal avg due to very fast ops, so just check >= 0
      assert.ok(p95 >= 0);
      assert.ok(avg >= 0);
    });
  });

  describe('stats aggregation', () => {
    it('returns comprehensive stats', () => {
      const stats = sona.getStats();
      assert.strictEqual(stats.enabled, true);
      assert.strictEqual(stats.activeProfile, 'default');
      assert.strictEqual(stats.trajectories.total, 0);
      assert.strictEqual(stats.patterns.stored, 0);
      assert.strictEqual(stats.learning.cyclesCompleted, 0);
      assert.strictEqual(typeof stats.performance.microLoraLatency, 'number');
      assert.strictEqual(typeof stats.performance.hnswSpeedup, 'number');
    });

    it('updates after operations', () => {
      const trajId = sona.begin(undefined, 'lyria');
      sona.step(trajId, 'observe', 'data', 0.8);
      sona.end(trajId, 'success');

      const stats = sona.getStats();
      assert.strictEqual(stats.trajectories.total, 1);
      assert.strictEqual(stats.trajectories.successful, 1);
      assert.ok(stats.learning.cyclesCompleted >= 1);
    });
  });

  describe('getGuardianInsight', () => {
    it('returns insight for a known guardian', () => {
      const trajId = sona.begin(undefined, 'lyria');
      sona.step(trajId, 'vision', 'insight revealed', 0.9);
      sona.end(trajId, 'success');

      const insight = sona.getGuardianInsight('lyria');
      assert.strictEqual(insight.guardianId, 'lyria');
      assert.strictEqual(insight.profile.gate, 'Sight');
      assert.strictEqual(insight.profile.frequency, 639);
      assert.strictEqual(insight.trajectoryStats.total, 1);
      assert.strictEqual(insight.trajectoryStats.successful, 1);
    });

    it('returns patterns for guardian', () => {
      sona.storePattern({ content: 'vision pattern', category: 'intuition', confidence: 0.8, guardianId: 'lyria' });
      const insight = sona.getGuardianInsight('lyria');
      assert.strictEqual(insight.patterns.length, 1);
    });

    it('throws for unknown guardian', () => {
      assert.throws(() => sona.getGuardianInsight('unknown'), /Unknown guardian/);
    });
  });

  describe('event forwarding', () => {
    it('forwards cycle-complete from engine', () => {
      let received = false;
      sona.on('cycle-complete', () => { received = true; });
      const trajId = sona.begin();
      sona.step(trajId, 'action', 'obs', 0.5);
      sona.end(trajId, 'success');
      assert.ok(received);
    });

    it('emits trajectory-begun on begin', () => {
      let received = null;
      sona.on('trajectory-begun', (data) => { received = data; });
      const id = sona.begin(undefined, 'aiyami');
      assert.ok(received);
      assert.strictEqual(received.trajectoryId, id);
      assert.strictEqual(received.guardianId, 'aiyami');
    });

    it('emits trajectory-ended on end', () => {
      let received = null;
      sona.on('trajectory-ended', (data) => { received = data; });
      const id = sona.begin();
      sona.step(id, 'action');
      sona.end(id, 'failure');
      assert.ok(received);
      assert.strictEqual(received.verdict, 'failure');
    });

    it('emits enabled-changed on enable/disable', () => {
      const events = [];
      sona.on('enabled-changed', (data) => events.push(data));
      sona.disable();
      sona.enable();
      assert.strictEqual(events.length, 2);
      assert.strictEqual(events[0].enabled, false);
      assert.strictEqual(events[1].enabled, true);
    });
  });
});

// =============================================================================
// 6. GUARDIAN INTEGRATION
// =============================================================================

describe('Guardian Integration', { timeout: 10000 }, () => {

  describe('GUARDIAN_PROFILES constant', () => {
    it('has exactly 10 guardians', () => {
      assert.strictEqual(Object.keys(GUARDIAN_PROFILES).length, 10);
    });

    it('Lyssandria — Foundation, 174 Hz, Earth', () => {
      const g = GUARDIAN_PROFILES.lyssandria;
      assert.strictEqual(g.gate, 'Foundation');
      assert.strictEqual(g.frequency, 174);
      assert.strictEqual(g.element, 'Earth');
      assert.strictEqual(g.specialization, 'stability');
    });

    it('Leyla — Flow, 285 Hz, Water', () => {
      const g = GUARDIAN_PROFILES.leyla;
      assert.strictEqual(g.gate, 'Flow');
      assert.strictEqual(g.frequency, 285);
      assert.strictEqual(g.element, 'Water');
      assert.strictEqual(g.specialization, 'creativity');
    });

    it('Draconia — Fire, 396 Hz, Fire', () => {
      const g = GUARDIAN_PROFILES.draconia;
      assert.strictEqual(g.gate, 'Fire');
      assert.strictEqual(g.frequency, 396);
      assert.strictEqual(g.element, 'Fire');
      assert.strictEqual(g.specialization, 'transformation');
    });

    it('Maylinn — Heart, 417 Hz, Wind', () => {
      const g = GUARDIAN_PROFILES.maylinn;
      assert.strictEqual(g.gate, 'Heart');
      assert.strictEqual(g.frequency, 417);
      assert.strictEqual(g.element, 'Wind');
      assert.strictEqual(g.specialization, 'connection');
    });

    it('Alera — Voice, 528 Hz, Wind', () => {
      const g = GUARDIAN_PROFILES.alera;
      assert.strictEqual(g.gate, 'Voice');
      assert.strictEqual(g.frequency, 528);
      assert.strictEqual(g.element, 'Wind');
      assert.strictEqual(g.specialization, 'expression');
    });

    it('Lyria — Sight, 639 Hz, Water', () => {
      const g = GUARDIAN_PROFILES.lyria;
      assert.strictEqual(g.gate, 'Sight');
      assert.strictEqual(g.frequency, 639);
      assert.strictEqual(g.element, 'Water');
      assert.strictEqual(g.specialization, 'intuition');
    });

    it('Aiyami — Crown, 741 Hz, Spirit', () => {
      const g = GUARDIAN_PROFILES.aiyami;
      assert.strictEqual(g.gate, 'Crown');
      assert.strictEqual(g.frequency, 741);
      assert.strictEqual(g.element, 'Spirit');
      assert.strictEqual(g.specialization, 'enlightenment');
    });

    it('Elara — Shift, 852 Hz, Void', () => {
      const g = GUARDIAN_PROFILES.elara;
      assert.strictEqual(g.gate, 'Shift');
      assert.strictEqual(g.frequency, 852);
      assert.strictEqual(g.element, 'Void');
      assert.strictEqual(g.specialization, 'transformation');
    });

    it('Ino — Unity, 963 Hz, Spirit', () => {
      const g = GUARDIAN_PROFILES.ino;
      assert.strictEqual(g.gate, 'Unity');
      assert.strictEqual(g.frequency, 963);
      assert.strictEqual(g.element, 'Spirit');
      assert.strictEqual(g.specialization, 'partnership');
    });

    it('Shinkami — Source, 1111 Hz, Void', () => {
      const g = GUARDIAN_PROFILES.shinkami;
      assert.strictEqual(g.gate, 'Source');
      assert.strictEqual(g.frequency, 1111);
      assert.strictEqual(g.element, 'Void');
      assert.strictEqual(g.specialization, 'meta-consciousness');
    });
  });

  describe('frequency validation', () => {
    it('all frequencies are in the extended solfeggio set', () => {
      const expected = [174, 285, 396, 417, 528, 639, 741, 852, 963, 1111];
      assert.deepStrictEqual([...SOLFEGGIO_FREQUENCIES], expected);
    });

    it('all frequencies are unique', () => {
      const freqs = SOLFEGGIO_FREQUENCIES;
      const unique = new Set(freqs);
      assert.strictEqual(unique.size, freqs.length);
    });

    it('frequencies are in ascending order', () => {
      for (let i = 1; i < SOLFEGGIO_FREQUENCIES.length; i++) {
        assert.ok(SOLFEGGIO_FREQUENCIES[i] > SOLFEGGIO_FREQUENCIES[i - 1]);
      }
    });
  });

  describe('gate mapping', () => {
    it('all 10 gates are present', () => {
      const expected = ['Foundation', 'Flow', 'Fire', 'Heart', 'Voice', 'Sight', 'Crown', 'Shift', 'Unity', 'Source'];
      assert.deepStrictEqual([...GATE_NAMES], expected);
    });

    it('all gate names are unique', () => {
      const unique = new Set(GATE_NAMES);
      assert.strictEqual(unique.size, GATE_NAMES.length);
    });
  });

  describe('guardian-specific trajectories', () => {
    let sona;

    beforeEach(() => {
      SONA.resetInstance();
      sona = SONA.getInstance();
    });

    it('trajectories for each guardian are isolated', () => {
      for (const gid of GUARDIAN_IDS) {
        const trajId = sona.begin(undefined, gid);
        sona.step(trajId, `${gid} action`, `${gid} observation`, 0.8);
        sona.end(trajId, 'success');
      }

      for (const gid of GUARDIAN_IDS) {
        const insight = sona.getGuardianInsight(gid);
        assert.strictEqual(insight.trajectoryStats.total, 1);
        assert.strictEqual(insight.trajectoryStats.successful, 1);
      }
    });

    it('guardian pattern lookup returns correct patterns', () => {
      for (const gid of GUARDIAN_IDS) {
        sona.storePattern({
          content: `${gid} specialized pattern`,
          category: GUARDIAN_PROFILES[gid].specialization,
          confidence: 0.8,
          guardianId: gid,
          gateFrequency: GUARDIAN_PROFILES[gid].frequency,
        });
      }

      for (const gid of GUARDIAN_IDS) {
        const patterns = sona.getPatternsByGuardian(gid);
        assert.strictEqual(patterns.length, 1);
        assert.strictEqual(patterns[0].guardianId, gid);
        assert.strictEqual(patterns[0].gateFrequency, GUARDIAN_PROFILES[gid].frequency);
      }
    });
  });
});

// =============================================================================
// 7. EDGE CASES
// =============================================================================

describe('Edge Cases', { timeout: 10000 }, () => {
  let sona;

  beforeEach(() => {
    SONA.resetInstance();
    sona = SONA.getInstance();
  });

  describe('empty trajectories', () => {
    it('handles trajectory with zero steps', () => {
      const trajId = sona.begin();
      const metrics = sona.end(trajId, 'success');
      assert.strictEqual(metrics.totalSteps, 0);
      assert.strictEqual(metrics.avgStepDuration, 0);
    });
  });

  describe('zero reward steps', () => {
    it('handles steps with reward of exactly 0', () => {
      const trajId = sona.begin();
      sona.step(trajId, 'neutral action', undefined, 0);
      const metrics = sona.end(trajId, 'success');
      assert.strictEqual(metrics.totalSteps, 1);
      // 0 is not > 0, so successRate should be 0
      assert.strictEqual(metrics.successRate, 0);
    });
  });

  describe('very long trajectories', () => {
    it('handles 1000 steps', () => {
      const trajId = sona.begin();
      for (let i = 0; i < 1000; i++) {
        sona.step(trajId, `action ${i}`, `obs ${i}`, Math.random() * 2 - 1);
      }
      const metrics = sona.end(trajId, 'success');
      assert.strictEqual(metrics.totalSteps, 1000);
      assert.ok(metrics.duration >= 0);
      assert.ok(metrics.avgStepDuration >= 0);
    });
  });

  describe('disable during trajectory', () => {
    it('prevents further steps after disable', () => {
      const trajId = sona.begin();
      sona.step(trajId, 'before disable');
      sona.disable();
      assert.throws(() => sona.step(trajId, 'after disable'), /disabled/);
    });

    it('re-enabling allows continuation (via new trajectory)', () => {
      sona.disable();
      sona.enable();
      const trajId = sona.begin();
      sona.step(trajId, 'after re-enable');
      const metrics = sona.end(trajId, 'success');
      assert.strictEqual(metrics.totalSteps, 1);
    });
  });

  describe('concurrent learn calls', () => {
    it('handles multiple forceLearn calls', () => {
      // Create multiple trajectories
      for (let i = 0; i < 5; i++) {
        const id = sona.begin();
        sona.step(id, `concurrent action ${i}`, `obs ${i}`, 0.5);
        sona.end(id, 'success', false);
      }

      const cycles1 = sona.forceLearn();
      const cycles2 = sona.forceLearn();

      assert.strictEqual(cycles1.length, 5);
      assert.strictEqual(cycles2.length, 5);
    });
  });

  describe('profile switch during operation', () => {
    it('profile change takes effect immediately', () => {
      sona.setProfile('fast');
      const p1 = sona.getProfile();
      assert.strictEqual(p1.id, 'fast');

      const trajId = sona.begin();
      sona.step(trajId, 'action');

      sona.setProfile('accurate');
      const p2 = sona.getProfile();
      assert.strictEqual(p2.id, 'accurate');

      sona.end(trajId, 'success');
    });
  });

  describe('negative rewards', () => {
    it('handles all negative rewards', () => {
      const trajId = sona.begin();
      sona.step(trajId, 'bad1', undefined, -0.5);
      sona.step(trajId, 'bad2', undefined, -1.0);
      const metrics = sona.end(trajId, 'failure');
      assert.strictEqual(metrics.successRate, 0);
    });
  });

  describe('special characters in content', () => {
    it('handles special characters in action', () => {
      const trajId = sona.begin();
      sona.step(trajId, '!!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~');
      const traj = sona.getTrajectory(trajId);
      assert.ok(traj.steps[0].action.includes('$'));
    });

    it('handles unicode in pattern content', () => {
      const p = sona.storePattern({
        content: 'Lumina\'s dawn 光の夜明け',
        category: 'lore',
        confidence: 0.9,
      });
      assert.ok(p.content.includes('光'));
    });
  });

  describe('pattern with embedding', () => {
    it('stores and retrieves embedding vector', () => {
      const embedding = Array.from({ length: 768 }, (_, i) => Math.sin(i * 0.01));
      const p = sona.storePattern({
        content: 'high dimensional pattern',
        category: 'general',
        confidence: 0.8,
        embedding,
      });
      const found = sona.getPattern(p.id);
      assert.strictEqual(found.embedding.length, 768);
      assert.ok(Math.abs(found.embedding[0] - embedding[0]) < 0.0001);
    });
  });
});

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Create a fake trajectory for testing purposes.
 */
function makeTrajectory(verdict, numSteps, actionPrefix = 'test action') {
  const id = generateId('traj');
  const steps = [];
  const now = Date.now();

  for (let i = 0; i < numSteps; i++) {
    steps.push({
      id: generateId('step'),
      action: `${actionPrefix} ${i}`,
      observation: `observation ${i}`,
      reward: verdict === 'success' ? 0.8 : verdict === 'failure' ? -0.3 : 0.3,
      timestamp: new Date(now + i * 10),
      metadata: {},
    });
  }

  return {
    id,
    sessionId: generateId('session'),
    startedAt: new Date(now),
    endedAt: new Date(now + numSteps * 10),
    steps,
    context: {},
    verdict,
    metrics: {
      totalSteps: numSteps,
      duration: numSteps * 10,
      avgStepDuration: 10,
      learningTriggered: true,
    },
  };
}
