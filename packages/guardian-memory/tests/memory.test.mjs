/**
 * @arcanea/guardian-memory — Comprehensive Test Suite
 *
 * Tests for GuardianMemory, HNSWIndex, constants, and utilities.
 * Uses Node's built-in test runner (node:test).
 *
 * Run: node --test packages/guardian-memory/tests/memory.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, rmSync, existsSync } from 'node:fs';

// Import from dist (compiled output)
const mod = await import('../dist/index.js');
const {
  GuardianMemory,
  HNSWIndex,
  GUARDIANS,
  ELEMENT_AFFINITY,
  GUARDIAN_VAULT_MAP,
  generateMemoryId,
  createGuardianEntry,
} = mod;

// ── Helpers ──────────────────────────────────────────────────────

const DIMS = 768;

/** Create a random Float32Array vector of given dimensionality */
function randomVector(dims = DIMS) {
  const v = new Float32Array(dims);
  for (let i = 0; i < dims; i++) {
    v[i] = Math.random() * 2 - 1;
  }
  return v;
}

/** Create a vector that is a noisy copy of another (for similarity testing) */
function similarVector(base, noise = 0.05) {
  const v = new Float32Array(base.length);
  for (let i = 0; i < base.length; i++) {
    v[i] = base[i] + (Math.random() * 2 - 1) * noise;
  }
  return v;
}

const CANONICAL_GUARDIANS = [
  'lyssandria', 'leyla', 'draconia', 'maylinn', 'alera',
  'lyria', 'aiyami', 'elara', 'ino', 'shinkami',
];

const MEMORY_TYPES = ['episodic', 'semantic', 'procedural', 'pattern', 'decision', 'insight'];
const VAULT_CATEGORIES = ['strategic', 'technical', 'creative', 'operational', 'wisdom', 'horizon'];
const ELEMENTS = ['fire', 'water', 'earth', 'wind', 'void', 'spirit'];

// ═════════════════════════════════════════════════════════════════
// 1. Exports
// ═════════════════════════════════════════════════════════════════

describe('Exports', { timeout: 10000 }, () => {
  it('should export GuardianMemory class', () => {
    assert.equal(typeof GuardianMemory, 'function');
  });

  it('should export HNSWIndex class', () => {
    assert.equal(typeof HNSWIndex, 'function');
  });

  it('should export GUARDIANS constant', () => {
    assert.ok(GUARDIANS != null);
    assert.equal(typeof GUARDIANS, 'object');
  });

  it('should export ELEMENT_AFFINITY constant', () => {
    assert.ok(ELEMENT_AFFINITY != null);
    assert.equal(typeof ELEMENT_AFFINITY, 'object');
  });

  it('should export GUARDIAN_VAULT_MAP constant', () => {
    assert.ok(GUARDIAN_VAULT_MAP != null);
    assert.equal(typeof GUARDIAN_VAULT_MAP, 'object');
  });

  it('should export generateMemoryId function', () => {
    assert.equal(typeof generateMemoryId, 'function');
  });

  it('should export createGuardianEntry function', () => {
    assert.equal(typeof createGuardianEntry, 'function');
  });
});

// ═════════════════════════════════════════════════════════════════
// 2. HNSW Index
// ═════════════════════════════════════════════════════════════════

describe('HNSWIndex', { timeout: 10000 }, () => {
  it('should construct with default config', () => {
    const index = new HNSWIndex();
    assert.equal(index.size, 0);
  });

  it('should construct with custom dimensions', () => {
    const index = new HNSWIndex({ dimensions: 384 });
    const stats = index.getStats();
    assert.equal(stats.vectorCount, 0);
  });

  it('should add a point and report size', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    await index.addPoint('v1', randomVector());
    assert.equal(index.size, 1);
    assert.ok(index.has('v1'));
  });

  it('should add multiple points', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    for (let i = 0; i < 10; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }
    assert.equal(index.size, 10);
  });

  it('should reject vectors with wrong dimensions', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    await assert.rejects(
      () => index.addPoint('bad', new Float32Array(100)),
      { message: /dimension mismatch/ }
    );
  });

  it('should search and return nearest neighbors', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    const base = randomVector();

    // Add the base vector and several distant ones
    await index.addPoint('target', base);
    for (let i = 0; i < 20; i++) {
      await index.addPoint(`rand${i}`, randomVector());
    }

    // Search with a vector very similar to base
    const query = similarVector(base, 0.01);
    const results = await index.search(query, 5);

    assert.ok(results.length > 0);
    assert.ok(results.length <= 5);
    // The target should be among the top results (closest neighbor)
    assert.equal(results[0].id, 'target', 'Nearest neighbor should be the similar vector');
    // Distances should be sorted ascending
    for (let i = 1; i < results.length; i++) {
      assert.ok(results[i].distance >= results[i - 1].distance,
        'Results should be sorted by ascending distance');
    }
  });

  it('should return empty array when searching empty index', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    const results = await index.search(randomVector(), 5);
    assert.deepEqual(results, []);
  });

  it('should search with filters', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    for (let i = 0; i < 20; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }

    // Filter to only even-numbered IDs
    const results = await index.searchWithFilters(
      randomVector(),
      5,
      (id) => parseInt(id.replace('v', '')) % 2 === 0
    );

    assert.ok(results.length > 0);
    assert.ok(results.length <= 5);
    for (const r of results) {
      const num = parseInt(r.id.replace('v', ''));
      assert.equal(num % 2, 0, `Filtered result ${r.id} should be even`);
    }
  });

  it('should remove a point', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    await index.addPoint('v1', randomVector());
    await index.addPoint('v2', randomVector());
    assert.equal(index.size, 2);

    const removed = await index.removePoint('v1');
    assert.equal(removed, true);
    assert.equal(index.size, 1);
    assert.ok(!index.has('v1'));
    assert.ok(index.has('v2'));
  });

  it('should return false when removing non-existent point', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    const removed = await index.removePoint('nonexistent');
    assert.equal(removed, false);
  });

  it('should rebuild index from entries', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    const entries = [];
    for (let i = 0; i < 15; i++) {
      entries.push({ id: `e${i}`, vector: randomVector() });
    }

    await index.rebuild(entries);
    assert.equal(index.size, 15);
    for (const e of entries) {
      assert.ok(index.has(e.id));
    }
  });

  it('should clear the index', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    for (let i = 0; i < 5; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }
    assert.equal(index.size, 5);

    index.clear();
    assert.equal(index.size, 0);
  });

  it('should report stats', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    for (let i = 0; i < 5; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }

    const stats = index.getStats();
    assert.equal(stats.vectorCount, 5);
    assert.equal(typeof stats.memoryUsage, 'number');
    assert.ok(stats.memoryUsage > 0);
    assert.equal(typeof stats.avgSearchTime, 'number');
    assert.equal(typeof stats.buildTime, 'number');
  });

  it('should track avgSearchTime after searches', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    for (let i = 0; i < 10; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }

    await index.search(randomVector(), 3);
    await index.search(randomVector(), 3);

    const stats = index.getStats();
    assert.ok(stats.avgSearchTime >= 0, 'Average search time should be non-negative');
  });

  it('should work with euclidean metric', async () => {
    const index = new HNSWIndex({ dimensions: DIMS, metric: 'euclidean' });
    const base = randomVector();
    await index.addPoint('target', base);
    for (let i = 0; i < 10; i++) {
      await index.addPoint(`rand${i}`, randomVector());
    }

    const query = similarVector(base, 0.01);
    const results = await index.search(query, 3);
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'target');
  });

  it('should work with dot product metric', async () => {
    const index = new HNSWIndex({ dimensions: DIMS, metric: 'dot' });
    for (let i = 0; i < 10; i++) {
      await index.addPoint(`v${i}`, randomVector());
    }
    const results = await index.search(randomVector(), 3);
    assert.ok(results.length > 0);
  });

  it('should work with manhattan metric', async () => {
    const index = new HNSWIndex({ dimensions: DIMS, metric: 'manhattan' });
    const base = randomVector();
    await index.addPoint('target', base);
    for (let i = 0; i < 10; i++) {
      await index.addPoint(`rand${i}`, randomVector());
    }

    const query = similarVector(base, 0.01);
    const results = await index.search(query, 3);
    assert.ok(results.length > 0);
    assert.equal(results[0].id, 'target');
  });

  it('should check existence with has()', async () => {
    const index = new HNSWIndex({ dimensions: DIMS });
    assert.equal(index.has('missing'), false);
    await index.addPoint('exists', randomVector());
    assert.equal(index.has('exists'), true);
    assert.equal(index.has('missing'), false);
  });
});

// ═════════════════════════════════════════════════════════════════
// 3. GuardianMemory Core
// ═════════════════════════════════════════════════════════════════

describe('GuardianMemory — Core Operations', { timeout: 10000 }, () => {
  const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-core`;
  let memory;

  before(() => {
    memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });
  });

  after(async () => {
    memory.shutdown();
    if (existsSync(storagePath)) {
      rmSync(storagePath, { recursive: true, force: true });
    }
  });

  it('should construct without arguments', () => {
    const m = new GuardianMemory();
    assert.ok(m);
    assert.equal(m.size, 0);
  });

  it('should store a memory entry', async () => {
    const entry = await memory.store({
      key: 'db-schema',
      content: 'Users table uses UUID primary keys with RLS policies',
      guardian: 'lyssandria',
      type: 'procedural',
      tags: ['database', 'supabase'],
      confidence: 0.9,
    });

    assert.ok(entry.id);
    assert.ok(entry.id.startsWith('gmem_'));
    assert.equal(entry.key, 'db-schema');
    assert.equal(entry.content, 'Users table uses UUID primary keys with RLS policies');
    assert.equal(entry.guardian, 'lyssandria');
    assert.equal(entry.type, 'procedural');
    assert.deepEqual(entry.tags, ['database', 'supabase']);
    assert.equal(entry.confidence, 0.9);
    assert.equal(entry.version, 1);
    assert.equal(entry.accessCount, 0);
    assert.ok(entry.createdAt > 0);
    assert.ok(entry.updatedAt > 0);
  });

  it('should auto-assign vault from guardian profile', async () => {
    const entry = await memory.store({
      key: 'test-vault-auto',
      content: 'Test vault auto-assignment',
      guardian: 'shinkami',
    });
    assert.equal(entry.vault, 'strategic');
  });

  it('should auto-assign element from guardian profile', async () => {
    const entry = await memory.store({
      key: 'test-element-auto',
      content: 'Test element auto-assignment',
      guardian: 'draconia',
    });
    assert.equal(entry.element, 'fire');
  });

  it('should default type to semantic when not provided', async () => {
    const entry = await memory.store({
      key: 'default-type',
      content: 'Default type test',
      guardian: 'lyria',
    });
    assert.equal(entry.type, 'semantic');
  });

  it('should default confidence to 0.5 when not provided', async () => {
    const entry = await memory.store({
      key: 'default-confidence',
      content: 'Default confidence test',
      guardian: 'alera',
    });
    assert.equal(entry.confidence, 0.5);
  });

  it('should recall by ID', async () => {
    const stored = await memory.store({
      key: 'recall-test',
      content: 'Recallable memory',
      guardian: 'leyla',
      confidence: 0.8,
    });

    const recalled = memory.recall(stored.id);
    assert.ok(recalled);
    assert.equal(recalled.id, stored.id);
    assert.equal(recalled.content, 'Recallable memory');
    assert.equal(recalled.accessCount, 1, 'Access count should increment on recall');
  });

  it('should return undefined for non-existent recall', () => {
    const result = memory.recall('nonexistent-id');
    assert.equal(result, undefined);
  });

  it('should recall by guardian', async () => {
    // Store several for maylinn
    await memory.store({ key: 'may-1', content: 'Healing protocol alpha', guardian: 'maylinn' });
    await memory.store({ key: 'may-2', content: 'Heart gate activation', guardian: 'maylinn' });

    const results = memory.recallByGuardian('maylinn');
    assert.ok(results.length >= 2);
    for (const r of results) {
      assert.equal(r.guardian, 'maylinn');
    }
  });

  it('should respect limit in recallByGuardian', async () => {
    // Store 5 entries for aiyami
    for (let i = 0; i < 5; i++) {
      await memory.store({ key: `aiy-${i}`, content: `Wisdom scroll ${i}`, guardian: 'aiyami' });
    }

    const results = memory.recallByGuardian('aiyami', 3);
    assert.ok(results.length <= 3);
  });

  it('should recall by vault', async () => {
    // lyssandria and draconia both map to 'technical'
    await memory.store({ key: 'tech-1', content: 'Infrastructure config', guardian: 'lyssandria' });
    await memory.store({ key: 'tech-2', content: 'Fire execution plan', guardian: 'draconia' });

    const results = memory.recallByVault('technical');
    assert.ok(results.length >= 2);
    for (const r of results) {
      assert.equal(r.vault, 'technical');
    }
  });

  it('should respect limit in recallByVault', async () => {
    const results = memory.recallByVault('technical', 1);
    assert.ok(results.length <= 1);
  });

  it('should update an entry', async () => {
    const stored = await memory.store({
      key: 'update-test',
      content: 'Original content',
      guardian: 'elara',
      confidence: 0.5,
      tags: ['original'],
    });

    const updated = memory.update(stored.id, {
      content: 'Updated content',
      confidence: 0.95,
      tags: ['updated', 'revised'],
      metadata: { reviewedBy: 'architect' },
    });

    assert.ok(updated);
    assert.equal(updated.content, 'Updated content');
    assert.equal(updated.confidence, 0.95);
    assert.deepEqual(updated.tags, ['updated', 'revised']);
    assert.equal(updated.metadata.reviewedBy, 'architect');
    assert.equal(updated.version, 2, 'Version should increment on update');
    assert.ok(updated.updatedAt >= stored.createdAt);
  });

  it('should return undefined when updating non-existent entry', () => {
    const result = memory.update('nonexistent-id', { content: 'nope' });
    assert.equal(result, undefined);
  });

  it('should remove an entry', async () => {
    const stored = await memory.store({
      key: 'remove-test',
      content: 'To be removed',
      guardian: 'ino',
    });

    const sizeBefore = memory.size;
    const removed = await memory.remove(stored.id);
    assert.equal(removed, true);
    assert.equal(memory.size, sizeBefore - 1);
    assert.equal(memory.recall(stored.id), undefined);
  });

  it('should return false when removing non-existent entry', async () => {
    const result = await memory.remove('nonexistent-id');
    assert.equal(result, false);
  });

  it('should store with embedding via storeWithEmbedding', async () => {
    const embedding = randomVector();
    const entry = await memory.storeWithEmbedding(
      {
        key: 'embedded-entry',
        content: 'Entry with vector embedding',
        guardian: 'lyria',
        tags: ['vector', 'test'],
      },
      embedding
    );

    assert.ok(entry.id);
    assert.ok(entry.embedding);
    assert.equal(entry.embedding.length, DIMS);
  });
});

// ═════════════════════════════════════════════════════════════════
// 4. Text Search
// ═════════════════════════════════════════════════════════════════

describe('GuardianMemory — Text Search', { timeout: 10000 }, () => {
  const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-text`;
  let memory;

  before(async () => {
    memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    // Populate with diverse entries
    await memory.store({ key: 'db-schema', content: 'Database schema with users table and RLS policies', guardian: 'lyssandria', type: 'procedural', tags: ['database', 'schema'], confidence: 0.9 });
    await memory.store({ key: 'api-design', content: 'REST API design patterns for microservices', guardian: 'lyssandria', type: 'semantic', tags: ['api', 'design'], confidence: 0.85 });
    await memory.store({ key: 'creative-flow', content: 'Creative flow state techniques for artists', guardian: 'leyla', type: 'episodic', tags: ['creativity', 'flow'], confidence: 0.7 });
    await memory.store({ key: 'healing-ritual', content: 'Heart healing ritual with water element meditation', guardian: 'maylinn', type: 'procedural', tags: ['healing', 'ritual'], confidence: 0.95 });
    await memory.store({ key: 'fire-strategy', content: 'Fire element execution strategy for rapid deployment', guardian: 'draconia', type: 'strategic', tags: ['fire', 'strategy'], confidence: 0.6 });
    await memory.store({ key: 'vision-oracle', content: 'Oracle vision prediction for next quarter trends', guardian: 'lyria', type: 'insight', tags: ['vision', 'prediction'], confidence: 0.8 });
    await memory.store({ key: 'unity-protocol', content: 'Unity integration protocol for cross-system sync', guardian: 'ino', type: 'procedural', tags: ['integration', 'protocol'], confidence: 0.75 });
    await memory.store({ key: 'low-conf', content: 'Unverified speculation about database performance', guardian: 'lyssandria', type: 'semantic', tags: ['database'], confidence: 0.2 });
  });

  after(() => {
    memory.shutdown();
    if (existsSync(storagePath)) {
      rmSync(storagePath, { recursive: true, force: true });
    }
  });

  it('should find entries by text query', () => {
    const results = memory.searchByText('database schema');
    assert.ok(results.length > 0);
    // The db-schema entry should appear
    const found = results.some(r => r.key === 'db-schema');
    assert.ok(found, 'Should find the database schema entry');
  });

  it('should return empty array for no matches', () => {
    const results = memory.searchByText('xylophone zephyr');
    assert.equal(results.length, 0);
  });

  it('should filter by guardian', () => {
    const results = memory.searchByText('database', { guardians: ['lyssandria'] });
    for (const r of results) {
      assert.equal(r.guardian, 'lyssandria');
    }
  });

  it('should filter by vault', () => {
    const results = memory.searchByText('ritual healing', { vault: 'creative' });
    for (const r of results) {
      assert.equal(r.vault, 'creative');
    }
  });

  it('should filter by minimum confidence', () => {
    const results = memory.searchByText('database', { minConfidence: 0.8 });
    for (const r of results) {
      assert.ok(r.confidence >= 0.8, `Confidence ${r.confidence} should be >= 0.8`);
    }
    // The low-confidence entry should be excluded
    const lowConf = results.find(r => r.key === 'low-conf');
    assert.equal(lowConf, undefined, 'Low confidence entry should be filtered out');
  });

  it('should respect k limit', () => {
    const results = memory.searchByText('database', { k: 1 });
    assert.ok(results.length <= 1);
  });

  it('should combine guardian and confidence filters', () => {
    const results = memory.searchByText('database', {
      guardians: ['lyssandria'],
      minConfidence: 0.5,
    });
    for (const r of results) {
      assert.equal(r.guardian, 'lyssandria');
      assert.ok(r.confidence >= 0.5);
    }
  });
});

// ═════════════════════════════════════════════════════════════════
// 5. Vector Search
// ═════════════════════════════════════════════════════════════════

describe('GuardianMemory — Vector Search', { timeout: 10000 }, () => {
  const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-vector`;
  let memory;
  const baseVector = randomVector();
  let targetEntryId;

  before(async () => {
    memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    // Store entries with embeddings
    const targetEntry = await memory.storeWithEmbedding(
      { key: 'target-vec', content: 'Target vector entry', guardian: 'lyria', type: 'semantic', tags: ['target'], confidence: 0.9 },
      baseVector
    );
    targetEntryId = targetEntry.id;

    // Add distant vectors for other guardians
    for (let i = 0; i < 5; i++) {
      await memory.storeWithEmbedding(
        { key: `lyssandria-vec-${i}`, content: `Lyssandria vector ${i}`, guardian: 'lyssandria', type: 'procedural', tags: ['earth'], confidence: 0.7 },
        randomVector()
      );
    }
    for (let i = 0; i < 3; i++) {
      await memory.storeWithEmbedding(
        { key: `draconia-vec-${i}`, content: `Draconia vector ${i}`, guardian: 'draconia', type: 'strategic', tags: ['fire'], confidence: 0.8 },
        randomVector()
      );
    }
    // Add a similar vector for cross-guardian matching
    await memory.storeWithEmbedding(
      { key: 'similar-to-target', content: 'Similar entry from different guardian', guardian: 'aiyami', type: 'insight', tags: ['similar'], confidence: 0.85 },
      similarVector(baseVector, 0.05)
    );
  });

  after(() => {
    memory.shutdown();
    if (existsSync(storagePath)) {
      rmSync(storagePath, { recursive: true, force: true });
    }
  });

  it('should search by vector and find nearest neighbor', async () => {
    const query = similarVector(baseVector, 0.01);
    const results = await memory.search(query, { k: 3 });
    assert.ok(results.length > 0);
    assert.ok(results.length <= 3);
    // Target should be the closest match
    assert.equal(results[0].entry.id, targetEntryId, 'Target should be nearest neighbor');
    assert.ok(results[0].score > 0, 'Score should be positive');
    assert.equal(typeof results[0].distance, 'number');
  });

  it('should filter vector search by guardian', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 10, guardians: ['lyssandria'] });
    for (const r of results) {
      assert.equal(r.entry.guardian, 'lyssandria');
    }
  });

  it('should filter vector search by vault', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 10, vault: 'technical' });
    for (const r of results) {
      assert.equal(r.entry.vault, 'technical');
    }
  });

  it('should filter vector search by type', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 10, type: 'procedural' });
    for (const r of results) {
      assert.equal(r.entry.type, 'procedural');
    }
  });

  it('should filter vector search by minConfidence', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 10, minConfidence: 0.8 });
    for (const r of results) {
      assert.ok(r.entry.confidence >= 0.8);
    }
  });

  it('should filter vector search by tags', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 10, tags: ['earth'] });
    for (const r of results) {
      assert.ok(r.entry.tags.includes('earth'), `Entry should have 'earth' tag`);
    }
  });

  it('should apply element affinity bonus', async () => {
    const query = similarVector(baseVector, 0.01);
    const results = await memory.search(query, { k: 5, elementAffinity: 'void' });
    // Lyria (void element) entries should potentially get affinity bonus
    const lyriResult = results.find(r => r.entry.guardian === 'lyria');
    if (lyriResult && lyriResult.affinityBonus !== undefined) {
      assert.ok(lyriResult.affinityBonus >= 0, 'Affinity bonus should be non-negative');
    }
    // Results should still be sorted by score descending
    for (let i = 1; i < results.length; i++) {
      assert.ok(results[i].score <= results[i - 1].score,
        'Results should be sorted by descending score');
    }
  });

  it('should return search results with correct structure', async () => {
    const query = randomVector();
    const results = await memory.search(query, { k: 3 });
    for (const r of results) {
      assert.ok(r.entry, 'Result should have entry');
      assert.equal(typeof r.score, 'number', 'Result should have numeric score');
      assert.equal(typeof r.distance, 'number', 'Result should have numeric distance');
      assert.ok(r.entry.id, 'Entry should have id');
      assert.ok(r.entry.guardian, 'Entry should have guardian');
    }
  });
});

// ═════════════════════════════════════════════════════════════════
// 6. Statistics
// ═════════════════════════════════════════════════════════════════

describe('GuardianMemory — Statistics', { timeout: 10000 }, () => {
  const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-stats`;
  let memory;

  before(async () => {
    memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    await memory.store({ key: 's1', content: 'Schema design', guardian: 'lyssandria', type: 'procedural', confidence: 0.9 });
    await memory.store({ key: 's2', content: 'Code architecture', guardian: 'lyssandria', type: 'semantic', confidence: 0.8 });
    await memory.store({ key: 's3', content: 'Creative concept', guardian: 'leyla', type: 'episodic', confidence: 0.7 });
    await memory.storeWithEmbedding(
      { key: 's4', content: 'Vectorized entry', guardian: 'shinkami', type: 'strategic', confidence: 0.95 },
      randomVector()
    );
    await memory.storeWithEmbedding(
      { key: 's5', content: 'Another vectorized', guardian: 'draconia', type: 'procedural', confidence: 0.85 },
      randomVector()
    );
  });

  after(() => {
    memory.shutdown();
    if (existsSync(storagePath)) {
      rmSync(storagePath, { recursive: true, force: true });
    }
  });

  it('should report correct size', () => {
    assert.equal(memory.size, 5);
  });

  it('should report correct guardianCount', () => {
    assert.equal(memory.guardianCount('lyssandria'), 2);
    assert.equal(memory.guardianCount('leyla'), 1);
    assert.equal(memory.guardianCount('shinkami'), 1);
    assert.equal(memory.guardianCount('draconia'), 1);
    assert.equal(memory.guardianCount('maylinn'), 0);
  });

  it('should return comprehensive stats from getStats()', () => {
    const stats = memory.getStats();

    assert.equal(stats.totalEntries, 5);

    // byGuardian
    assert.equal(stats.byGuardian.lyssandria, 2);
    assert.equal(stats.byGuardian.leyla, 1);
    assert.equal(stats.byGuardian.shinkami, 1);
    assert.equal(stats.byGuardian.draconia, 1);

    // byVault
    assert.ok(stats.byVault.technical >= 2, 'technical vault should have lyssandria + draconia entries');
    assert.ok(stats.byVault.creative >= 1, 'creative vault should have leyla entry');
    assert.ok(stats.byVault.strategic >= 1, 'strategic vault should have shinkami entry');

    // byType
    assert.ok(stats.byType.procedural >= 2);
    assert.ok(stats.byType.semantic >= 1);
    assert.ok(stats.byType.episodic >= 1);
    assert.ok(stats.byType.strategic >= 1);

    // vectorized count
    assert.equal(stats.vectorized, 2, 'Should have 2 vectorized entries');

    // HNSW stats
    assert.ok(stats.hnswStats);
    assert.equal(stats.hnswStats.vectorCount, 2);
    assert.equal(typeof stats.hnswStats.memoryUsage, 'number');
  });
});

// ═════════════════════════════════════════════════════════════════
// 7. Guardian Constants
// ═════════════════════════════════════════════════════════════════

describe('Guardian Constants', { timeout: 10000 }, () => {
  it('GUARDIANS should have all 10 canonical Guardians', () => {
    const keys = Object.keys(GUARDIANS);
    assert.equal(keys.length, 10);
    for (const name of CANONICAL_GUARDIANS) {
      assert.ok(GUARDIANS[name], `Missing Guardian: ${name}`);
    }
  });

  it('each Guardian should have complete profile', () => {
    for (const [name, profile] of Object.entries(GUARDIANS)) {
      assert.equal(profile.name, name, `${name}: name should match key`);
      assert.ok(profile.gate, `${name}: missing gate`);
      assert.equal(typeof profile.frequency, 'number', `${name}: frequency should be number`);
      assert.ok(profile.frequency > 0, `${name}: frequency should be positive`);
      assert.ok(ELEMENTS.includes(profile.element), `${name}: invalid element '${profile.element}'`);
      assert.ok(VAULT_CATEGORIES.includes(profile.vault), `${name}: invalid vault '${profile.vault}'`);
      assert.ok(profile.godbeast, `${name}: missing godbeast`);
    }
  });

  it('each Guardian should have unique frequency (Extended Solfeggio)', () => {
    const frequencies = Object.values(GUARDIANS).map(g => g.frequency);
    const unique = new Set(frequencies);
    assert.equal(unique.size, 10, 'All 10 Guardians should have unique frequencies');
  });

  it('frequencies should match canonical Extended Solfeggio mapping', () => {
    assert.equal(GUARDIANS.lyssandria.frequency, 174);
    assert.equal(GUARDIANS.leyla.frequency, 285);
    assert.equal(GUARDIANS.draconia.frequency, 396);
    assert.equal(GUARDIANS.maylinn.frequency, 417);
    assert.equal(GUARDIANS.alera.frequency, 528);
    assert.equal(GUARDIANS.lyria.frequency, 639);
    assert.equal(GUARDIANS.aiyami.frequency, 741);
    assert.equal(GUARDIANS.elara.frequency, 852);
    assert.equal(GUARDIANS.ino.frequency, 963);
    assert.equal(GUARDIANS.shinkami.frequency, 1111);
  });

  it('ELEMENT_AFFINITY should be a symmetric-ish matrix for all 6 elements', () => {
    for (const elem of ELEMENTS) {
      assert.ok(ELEMENT_AFFINITY[elem], `Missing element affinity row: ${elem}`);
      for (const other of ELEMENTS) {
        const score = ELEMENT_AFFINITY[elem][other];
        assert.equal(typeof score, 'number', `${elem}-${other}: should be number`);
        assert.ok(score >= 0 && score <= 1, `${elem}-${other}: score ${score} should be in [0,1]`);
      }
      // Self-affinity should be 1.0
      assert.equal(ELEMENT_AFFINITY[elem][elem], 1.0, `${elem} self-affinity should be 1.0`);
    }
  });

  it('ELEMENT_AFFINITY void-spirit should have high affinity', () => {
    assert.ok(ELEMENT_AFFINITY.void.spirit >= 0.8, 'Void-Spirit affinity should be high');
    assert.ok(ELEMENT_AFFINITY.spirit.void >= 0.8, 'Spirit-Void affinity should be high');
  });

  it('GUARDIAN_VAULT_MAP should map all 10 Guardians to vault categories', () => {
    assert.equal(Object.keys(GUARDIAN_VAULT_MAP).length, 10);
    for (const name of CANONICAL_GUARDIANS) {
      assert.ok(GUARDIAN_VAULT_MAP[name], `Missing vault mapping for: ${name}`);
      assert.ok(VAULT_CATEGORIES.includes(GUARDIAN_VAULT_MAP[name]),
        `${name}: invalid vault category '${GUARDIAN_VAULT_MAP[name]}'`);
    }
  });

  it('GUARDIAN_VAULT_MAP should be consistent with GUARDIANS profiles', () => {
    for (const [name, vault] of Object.entries(GUARDIAN_VAULT_MAP)) {
      assert.equal(GUARDIANS[name].vault, vault,
        `${name}: GUARDIAN_VAULT_MAP ('${vault}') should match GUARDIANS profile ('${GUARDIANS[name].vault}')`);
    }
  });

  it('GUARDIAN_VAULT_MAP should have canonical mappings', () => {
    assert.equal(GUARDIAN_VAULT_MAP.shinkami, 'strategic');
    assert.equal(GUARDIAN_VAULT_MAP.lyssandria, 'technical');
    assert.equal(GUARDIAN_VAULT_MAP.draconia, 'technical');
    assert.equal(GUARDIAN_VAULT_MAP.leyla, 'creative');
    assert.equal(GUARDIAN_VAULT_MAP.maylinn, 'creative');
    assert.equal(GUARDIAN_VAULT_MAP.alera, 'operational');
    assert.equal(GUARDIAN_VAULT_MAP.ino, 'operational');
    assert.equal(GUARDIAN_VAULT_MAP.lyria, 'horizon');
    assert.equal(GUARDIAN_VAULT_MAP.aiyami, 'wisdom');
    assert.equal(GUARDIAN_VAULT_MAP.elara, 'wisdom');
  });
});

// ═════════════════════════════════════════════════════════════════
// 8. Utility Functions
// ═════════════════════════════════════════════════════════════════

describe('Utility Functions', { timeout: 10000 }, () => {
  it('generateMemoryId should return a string starting with gmem_', () => {
    const id = generateMemoryId();
    assert.equal(typeof id, 'string');
    assert.ok(id.startsWith('gmem_'), `ID '${id}' should start with 'gmem_'`);
  });

  it('generateMemoryId should produce unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateMemoryId());
    }
    assert.equal(ids.size, 100, 'All 100 generated IDs should be unique');
  });

  it('createGuardianEntry should create a well-formed entry', () => {
    const entry = createGuardianEntry({
      key: 'test-key',
      content: 'Test content',
      guardian: 'lyria',
      type: 'insight',
      tags: ['test', 'vision'],
      confidence: 0.88,
    });

    assert.ok(entry.id.startsWith('gmem_'));
    assert.equal(entry.key, 'test-key');
    assert.equal(entry.content, 'Test content');
    assert.equal(entry.guardian, 'lyria');
    assert.equal(entry.type, 'insight');
    assert.equal(entry.vault, 'horizon'); // Lyria maps to horizon
    assert.equal(entry.element, 'void');  // Lyria's element
    assert.deepEqual(entry.tags, ['test', 'vision']);
    assert.equal(entry.confidence, 0.88);
    assert.equal(entry.version, 1);
    assert.equal(entry.accessCount, 0);
    assert.equal(entry.accessLevel, 'guardian');
    assert.deepEqual(entry.references, []);
    assert.ok(entry.createdAt > 0);
    assert.equal(entry.createdAt, entry.updatedAt);
  });

  it('createGuardianEntry should apply defaults for optional fields', () => {
    const entry = createGuardianEntry({
      key: 'minimal',
      content: 'Minimal entry',
      guardian: 'shinkami',
    });

    assert.equal(entry.type, 'semantic');       // default type
    assert.equal(entry.vault, 'strategic');     // from shinkami profile
    assert.equal(entry.element, 'void');         // from shinkami profile
    assert.deepEqual(entry.tags, []);
    assert.equal(entry.confidence, 0.5);
    assert.deepEqual(entry.metadata, {});
    assert.equal(entry.accessLevel, 'guardian');
    assert.equal(entry.expiresAt, undefined);
    assert.deepEqual(entry.references, []);
    assert.equal(entry.source, undefined);
  });

  it('createGuardianEntry should respect overrides for vault and element', () => {
    const entry = createGuardianEntry({
      key: 'override',
      content: 'Override test',
      guardian: 'lyssandria',
      vault: 'wisdom',       // override from default 'technical'
      element: 'fire',       // override from default 'earth'
    });

    assert.equal(entry.vault, 'wisdom');
    assert.equal(entry.element, 'fire');
  });
});

// ═════════════════════════════════════════════════════════════════
// 9. Edge Cases
// ═════════════════════════════════════════════════════════════════

describe('Edge Cases', { timeout: 10000 }, () => {
  it('should handle empty text search gracefully', () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge1`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });
    const results = memory.searchByText('');
    assert.equal(results.length, 0);
    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle search on empty memory', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge2`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    const textResults = memory.searchByText('anything');
    assert.equal(textResults.length, 0);

    const vectorResults = await memory.search(randomVector(), { k: 5 });
    assert.equal(vectorResults.length, 0);

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle recallByGuardian for guardian with no entries', () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge3`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });
    const results = memory.recallByGuardian('shinkami');
    assert.equal(results.length, 0);
    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle recallByVault for empty vault', () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge4`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });
    const results = memory.recallByVault('horizon');
    assert.equal(results.length, 0);
    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should clearGuardian and return count', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge5`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    await memory.store({ key: 'c1', content: 'First', guardian: 'draconia' });
    await memory.store({ key: 'c2', content: 'Second', guardian: 'draconia' });
    await memory.store({ key: 'c3', content: 'Third', guardian: 'draconia' });
    await memory.store({ key: 'other', content: 'Keep this', guardian: 'leyla' });

    assert.equal(memory.guardianCount('draconia'), 3);
    assert.equal(memory.size, 4);

    const cleared = await memory.clearGuardian('draconia');
    assert.equal(cleared, 3);
    assert.equal(memory.guardianCount('draconia'), 0);
    assert.equal(memory.size, 1); // Only leyla's entry remains
    assert.equal(memory.guardianCount('leyla'), 1);

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should clearGuardian return 0 for empty guardian', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge6`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    const cleared = await memory.clearGuardian('shinkami');
    assert.equal(cleared, 0);

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should clearAll remove everything', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge7`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    await memory.store({ key: 'a1', content: 'Entry 1', guardian: 'lyssandria' });
    await memory.store({ key: 'a2', content: 'Entry 2', guardian: 'leyla' });
    await memory.store({ key: 'a3', content: 'Entry 3', guardian: 'shinkami' });
    assert.equal(memory.size, 3);

    await memory.clearAll();
    assert.equal(memory.size, 0);
    assert.equal(memory.guardianCount('lyssandria'), 0);
    assert.equal(memory.guardianCount('leyla'), 0);
    assert.equal(memory.guardianCount('shinkami'), 0);

    const stats = memory.getStats();
    assert.equal(stats.totalEntries, 0);

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle double remove gracefully', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge8`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    const entry = await memory.store({ key: 'double-rm', content: 'Remove me twice', guardian: 'alera' });
    assert.equal(await memory.remove(entry.id), true);
    assert.equal(await memory.remove(entry.id), false);

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle storing entries for all 10 guardians', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge9`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    for (const name of CANONICAL_GUARDIANS) {
      await memory.store({ key: `${name}-entry`, content: `Entry for ${name}`, guardian: name });
    }

    assert.equal(memory.size, 10);
    for (const name of CANONICAL_GUARDIANS) {
      assert.equal(memory.guardianCount(name), 1, `${name} should have exactly 1 entry`);
    }

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should handle update with partial fields', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge10`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    const entry = await memory.store({
      key: 'partial-update',
      content: 'Original',
      guardian: 'elara',
      tags: ['initial'],
      confidence: 0.5,
    });

    // Update only confidence
    const updated = memory.update(entry.id, { confidence: 0.99 });
    assert.equal(updated.confidence, 0.99);
    assert.equal(updated.content, 'Original'); // unchanged
    assert.deepEqual(updated.tags, ['initial']); // unchanged

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });

  it('should update word index when content changes', async () => {
    const storagePath = `/tmp/arcanea-memory-test-${Date.now()}-edge11`;
    const memory = new GuardianMemory({ storagePath, hnsw: { dimensions: DIMS } });

    await memory.store({
      key: 'word-reindex',
      content: 'original unique keyword zorblax',
      guardian: 'ino',
    });

    // Search should find by original keyword
    let results = memory.searchByText('zorblax');
    assert.ok(results.length > 0, 'Should find by original keyword');

    // Update content
    const entry = memory.recallByGuardian('ino')[0];
    memory.update(entry.id, { content: 'updated content with flamberge' });

    // Old keyword should no longer match
    results = memory.searchByText('zorblax');
    assert.equal(results.length, 0, 'Should not find by old keyword after update');

    // New keyword should match
    results = memory.searchByText('flamberge');
    assert.ok(results.length > 0, 'Should find by new keyword after update');

    memory.shutdown();
    if (existsSync(storagePath)) rmSync(storagePath, { recursive: true, force: true });
  });
});
