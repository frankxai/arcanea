/**
 * @arcanea/token-optimizer — Comprehensive Test Suite
 *
 * 120+ tests covering:
 * 1. Exports — verify all public API exports
 * 2. LRUCache — basic ops, TTL, eviction, stats, prune
 * 3. ReasoningBank — store/retrieve, similarity, format, savings
 * 4. BatchOptimizer — config tiers, outcome tracking, adaptive tuning
 * 5. CostTracker — usage, profiles, budget, events, reports
 * 6. TokenOptimizer — full orchestrator integration
 * 7. Guardian Integration — all 10 Guardians, frequencies, gates
 * 8. Edge Cases — empty, zero, negative, overflow, concurrent
 */

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  // Types/constants
  COST_PER_TOKEN,
  GUARDIAN_FREQUENCIES,
  GUARDIAN_IDS,
  DEFAULT_COST_PER_TOKEN,
  // Classes
  LRUCache,
  ReasoningBank,
  BatchOptimizer,
  CostTracker,
  TokenOptimizer,
  // Singleton
  getTokenOptimizer,
  resetTokenOptimizer,
} from '../dist/index.js';

// Force exit after tests complete (node:test can hang on EventEmitter listeners)
after(() => { setTimeout(() => process.exit(0), 500); });

// =============================================================================
// 1. EXPORTS
// =============================================================================

describe('Exports', { timeout: 10000 }, () => {
  it('exports LRUCache class', () => {
    assert.ok(LRUCache);
    assert.strictEqual(typeof LRUCache, 'function');
  });

  it('exports ReasoningBank class', () => {
    assert.ok(ReasoningBank);
    assert.strictEqual(typeof ReasoningBank, 'function');
  });

  it('exports BatchOptimizer class', () => {
    assert.ok(BatchOptimizer);
    assert.strictEqual(typeof BatchOptimizer, 'function');
  });

  it('exports CostTracker class', () => {
    assert.ok(CostTracker);
    assert.strictEqual(typeof CostTracker, 'function');
  });

  it('exports TokenOptimizer class', () => {
    assert.ok(TokenOptimizer);
    assert.strictEqual(typeof TokenOptimizer, 'function');
  });

  it('exports getTokenOptimizer function', () => {
    assert.strictEqual(typeof getTokenOptimizer, 'function');
  });

  it('exports resetTokenOptimizer function', () => {
    assert.strictEqual(typeof resetTokenOptimizer, 'function');
  });

  it('exports COST_PER_TOKEN constant', () => {
    assert.ok(COST_PER_TOKEN);
    assert.strictEqual(typeof COST_PER_TOKEN, 'object');
  });

  it('exports GUARDIAN_FREQUENCIES constant', () => {
    assert.ok(GUARDIAN_FREQUENCIES);
    assert.strictEqual(typeof GUARDIAN_FREQUENCIES, 'object');
  });

  it('exports GUARDIAN_IDS constant', () => {
    assert.ok(Array.isArray(GUARDIAN_IDS));
    assert.strictEqual(GUARDIAN_IDS.length, 10);
  });

  it('exports DEFAULT_COST_PER_TOKEN constant', () => {
    assert.strictEqual(typeof DEFAULT_COST_PER_TOKEN, 'number');
    assert.ok(DEFAULT_COST_PER_TOKEN > 0);
  });

  it('all classes are instantiable', () => {
    assert.ok(new LRUCache());
    assert.ok(new ReasoningBank());
    assert.ok(new BatchOptimizer());
    assert.ok(new CostTracker());
    assert.ok(new TokenOptimizer());
  });
});

// =============================================================================
// 2. LRUCache
// =============================================================================

describe('LRUCache', { timeout: 10000 }, () => {
  let cache;

  beforeEach(() => {
    cache = new LRUCache(5, 60000);
  });

  describe('basic operations', () => {
    it('stores and retrieves a value', () => {
      cache.set('a', 42);
      assert.strictEqual(cache.get('a'), 42);
    });

    it('returns undefined for missing keys', () => {
      assert.strictEqual(cache.get('nonexistent'), undefined);
    });

    it('has() returns true for existing keys', () => {
      cache.set('x', 'hello');
      assert.ok(cache.has('x'));
    });

    it('has() returns false for missing keys', () => {
      assert.ok(!cache.has('missing'));
    });

    it('delete() removes a key', () => {
      cache.set('key', 'value');
      assert.ok(cache.delete('key'));
      assert.strictEqual(cache.get('key'), undefined);
    });

    it('delete() returns false for missing keys', () => {
      assert.ok(!cache.delete('nope'));
    });

    it('clear() empties the cache', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.clear();
      assert.strictEqual(cache.size, 0);
      assert.strictEqual(cache.get('a'), undefined);
    });

    it('stores complex objects', () => {
      const obj = { name: 'Lyria', gate: 'Sight', frequency: 639 };
      cache.set('guardian', obj);
      assert.deepStrictEqual(cache.get('guardian'), obj);
    });

    it('overwrites existing key on re-set', () => {
      cache.set('x', 1);
      cache.set('x', 2);
      assert.strictEqual(cache.get('x'), 2);
    });

    it('reports correct size', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      assert.strictEqual(cache.size, 3);
    });
  });

  describe('TTL expiration', () => {
    it('returns undefined for expired entries on get()', () => {
      const shortCache = new LRUCache(10, 1); // 1ms TTL
      shortCache.set('temp', 'value');
      // Wait for expiry
      const start = Date.now();
      while (Date.now() - start < 10) { /* spin */ }
      assert.strictEqual(shortCache.get('temp'), undefined);
    });

    it('has() returns false for expired entries', () => {
      const shortCache = new LRUCache(10, 1);
      shortCache.set('temp', 'value');
      const start = Date.now();
      while (Date.now() - start < 10) { /* spin */ }
      assert.ok(!shortCache.has('temp'));
    });

    it('respects per-entry TTL override', () => {
      cache.set('long', 'lives', 999999);
      cache.set('short', 'dies', 1);
      const start = Date.now();
      while (Date.now() - start < 10) { /* spin */ }
      assert.strictEqual(cache.get('long'), 'lives');
      assert.strictEqual(cache.get('short'), undefined);
    });
  });

  describe('LRU eviction', () => {
    it('evicts the least recently used entry when full', () => {
      // Max 5 entries
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.set('d', 4);
      cache.set('e', 5);
      // Cache is full — adding one more should evict 'a'
      cache.set('f', 6);
      assert.strictEqual(cache.get('a'), undefined);
      assert.strictEqual(cache.get('f'), 6);
    });

    it('accessing a key promotes it to MRU', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.set('d', 4);
      cache.set('e', 5);
      // Access 'a' to promote it
      cache.get('a');
      // Now 'b' is LRU
      cache.set('f', 6);
      assert.strictEqual(cache.get('a'), 1); // promoted, still alive
      assert.strictEqual(cache.get('b'), undefined); // evicted
    });

    it('never exceeds max size', () => {
      for (let i = 0; i < 20; i++) {
        cache.set(`key_${i}`, i);
      }
      assert.ok(cache.size <= 5);
    });
  });

  describe('statistics', () => {
    it('tracks hits', () => {
      cache.set('a', 1);
      cache.get('a');
      cache.get('a');
      const stats = cache.getStats();
      assert.strictEqual(stats.hits, 2);
    });

    it('tracks misses', () => {
      cache.get('nonexistent');
      cache.get('also-missing');
      const stats = cache.getStats();
      assert.strictEqual(stats.misses, 2);
    });

    it('computes hit rate', () => {
      cache.set('a', 1);
      cache.get('a'); // hit
      cache.get('b'); // miss
      const stats = cache.getStats();
      assert.strictEqual(stats.hitRate, 0.5);
    });

    it('reports maxSize', () => {
      assert.strictEqual(cache.getStats().maxSize, 5);
    });

    it('clear() resets stats', () => {
      cache.set('a', 1);
      cache.get('a');
      cache.clear();
      const stats = cache.getStats();
      assert.strictEqual(stats.hits, 0);
      assert.strictEqual(stats.misses, 0);
    });

    it('hit rate is 0 with no accesses', () => {
      assert.strictEqual(cache.getStats().hitRate, 0);
    });
  });

  describe('prune', () => {
    it('removes expired entries', () => {
      const shortCache = new LRUCache(100, 1);
      shortCache.set('a', 1);
      shortCache.set('b', 2);
      const start = Date.now();
      while (Date.now() - start < 10) { /* spin */ }
      const pruned = shortCache.prune();
      assert.strictEqual(pruned, 2);
      assert.strictEqual(shortCache.size, 0);
    });

    it('does not remove non-expired entries', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      const pruned = cache.prune();
      assert.strictEqual(pruned, 0);
      assert.strictEqual(cache.size, 2);
    });
  });
});

// =============================================================================
// 3. ReasoningBank
// =============================================================================

describe('ReasoningBank', { timeout: 10000 }, () => {
  let bank;

  beforeEach(() => {
    bank = new ReasoningBank();
  });

  describe('store', () => {
    it('stores an entry and returns an ID', () => {
      const id = bank.store('Test reasoning about authentication patterns');
      assert.ok(id);
      assert.ok(id.startsWith('mem_'));
    });

    it('increments size on store', () => {
      bank.store('First entry');
      bank.store('Second entry');
      assert.strictEqual(bank.size, 2);
    });

    it('stores with tags', () => {
      const id = bank.store('Tagged entry', ['security', 'auth']);
      assert.ok(id);
    });
  });

  describe('retrieve', () => {
    it('retrieves matching entries by word overlap', () => {
      bank.store('The authentication system uses JWT tokens for session management');
      bank.store('Database schema includes users table with email column');
      bank.store('Authentication middleware validates bearer tokens');

      const results = bank.retrieve('authentication tokens');
      assert.ok(results.length > 0);
      // Auth entries should score higher
      assert.ok(results[0].content.includes('authentication') || results[0].content.includes('Authentication'));
    });

    it('returns empty array for empty bank', () => {
      const results = bank.retrieve('anything');
      assert.strictEqual(results.length, 0);
    });

    it('respects limit option', () => {
      for (let i = 0; i < 10; i++) {
        bank.store(`Entry ${i} about testing and code quality`);
      }
      const results = bank.retrieve('testing code', { limit: 3 });
      assert.ok(results.length <= 3);
    });

    it('respects threshold option', () => {
      bank.store('The authentication system uses JWT');
      bank.store('Completely unrelated content about cooking recipes');

      const results = bank.retrieve('JWT authentication', { threshold: 0.2 });
      // Only the auth entry should pass a 0.2 threshold
      for (const r of results) {
        assert.ok(r.score >= 0.2);
      }
    });

    it('filters by tags', () => {
      bank.store('Auth entry', ['auth']);
      bank.store('DB entry', ['database']);
      bank.store('Another auth entry', ['auth']);

      const results = bank.retrieve('entry', { tags: ['auth'], threshold: 0.0 });
      for (const r of results) {
        assert.ok(r.content.includes('Auth') || r.content.includes('auth'));
      }
    });

    it('returns results sorted by score descending', () => {
      bank.store('authentication tokens JWT session');
      bank.store('the quick brown fox jumps');
      bank.store('authentication is important for security tokens');

      const results = bank.retrieve('authentication tokens', { threshold: 0.0 });
      for (let i = 1; i < results.length; i++) {
        assert.ok(results[i].score <= results[i - 1].score);
      }
    });

    it('increments totalRetrievals', () => {
      bank.retrieve('test');
      bank.retrieve('test2');
      assert.strictEqual(bank.getStats().totalRetrievals, 2);
    });
  });

  describe('formatForPrompt', () => {
    it('formats memories into numbered lines', () => {
      const memories = [
        { content: 'First memory', score: 0.9 },
        { content: 'Second memory', score: 0.7 },
      ];
      const formatted = bank.formatForPrompt(memories);
      assert.ok(formatted.includes('[1]'));
      assert.ok(formatted.includes('[2]'));
      assert.ok(formatted.includes('90%'));
      assert.ok(formatted.includes('70%'));
    });

    it('returns empty string for empty memories', () => {
      assert.strictEqual(bank.formatForPrompt([]), '');
    });

    it('truncates long content', () => {
      const memories = [
        { content: 'A'.repeat(500), score: 0.8 },
      ];
      const formatted = bank.formatForPrompt(memories, 100);
      assert.ok(formatted.includes('...'));
      assert.ok(formatted.length < 500);
    });

    it('does not truncate short content', () => {
      const memories = [
        { content: 'Short text', score: 0.5 },
      ];
      const formatted = bank.formatForPrompt(memories, 200);
      assert.ok(!formatted.includes('...'));
    });
  });

  describe('getCompactContext', () => {
    it('returns a MemoryContext object', () => {
      bank.store('Test context about database queries and optimization');
      const ctx = bank.getCompactContext('database optimization');
      assert.ok(ctx.query);
      assert.ok(Array.isArray(ctx.memories));
      assert.strictEqual(typeof ctx.compactPrompt, 'string');
      assert.strictEqual(typeof ctx.tokensSaved, 'number');
    });

    it('calculates token savings', () => {
      bank.store('Short context about auth patterns and security measures');
      const ctx = bank.getCompactContext('auth patterns', { baselineTokens: 1000 });
      assert.ok(ctx.tokensSaved >= 0);
    });

    it('accumulates totalTokensSaved', () => {
      bank.store('A relevant entry about testing strategies');
      bank.getCompactContext('testing', { baselineTokens: 1000 });
      bank.getCompactContext('testing', { baselineTokens: 1000 });
      assert.ok(bank.getStats().totalTokensSaved > 0);
    });
  });

  describe('getStats', () => {
    it('returns correct structure', () => {
      const stats = bank.getStats();
      assert.strictEqual(typeof stats.totalEntries, 'number');
      assert.strictEqual(typeof stats.totalRetrievals, 'number');
      assert.strictEqual(typeof stats.totalTokensSaved, 'number');
    });

    it('reflects stored entries', () => {
      bank.store('a');
      bank.store('b');
      assert.strictEqual(bank.getStats().totalEntries, 2);
    });
  });

  describe('clear', () => {
    it('removes all entries', () => {
      bank.store('one');
      bank.store('two');
      bank.clear();
      assert.strictEqual(bank.size, 0);
    });

    it('resets statistics', () => {
      bank.store('entry');
      bank.retrieve('entry');
      bank.clear();
      const stats = bank.getStats();
      assert.strictEqual(stats.totalEntries, 0);
      assert.strictEqual(stats.totalRetrievals, 0);
      assert.strictEqual(stats.totalTokensSaved, 0);
    });
  });
});

// =============================================================================
// 4. BatchOptimizer
// =============================================================================

describe('BatchOptimizer', { timeout: 10000 }, () => {
  let optimizer;

  beforeEach(() => {
    optimizer = new BatchOptimizer();
  });

  describe('getOptimalConfig', () => {
    it('returns mesh topology for 1-2 agents', () => {
      const config = optimizer.getOptimalConfig(1);
      assert.strictEqual(config.topology, 'mesh');
      assert.strictEqual(config.batchSize, 2);
    });

    it('returns mesh for 2 agents', () => {
      const config = optimizer.getOptimalConfig(2);
      assert.strictEqual(config.topology, 'mesh');
    });

    it('returns hierarchical for 3-4 agents', () => {
      const config = optimizer.getOptimalConfig(3);
      assert.strictEqual(config.topology, 'hierarchical');
      assert.strictEqual(config.batchSize, 4);
    });

    it('returns hierarchical for 4 agents', () => {
      const config = optimizer.getOptimalConfig(4);
      assert.strictEqual(config.topology, 'hierarchical');
    });

    it('returns hierarchical for 5-8 agents', () => {
      const config = optimizer.getOptimalConfig(6);
      assert.strictEqual(config.topology, 'hierarchical');
      assert.strictEqual(config.batchSize, 6);
    });

    it('returns adaptive for 8+ agents', () => {
      const config = optimizer.getOptimalConfig(10);
      assert.strictEqual(config.topology, 'adaptive');
      assert.strictEqual(config.batchSize, 8);
    });

    it('returns larger cache for more agents', () => {
      const small = optimizer.getOptimalConfig(2);
      const large = optimizer.getOptimalConfig(10);
      assert.ok(large.cacheSizeMB > small.cacheSizeMB);
    });

    it('expected success rate decreases with more agents', () => {
      const small = optimizer.getOptimalConfig(1);
      const large = optimizer.getOptimalConfig(10);
      assert.ok(small.expectedSuccessRate >= large.expectedSuccessRate);
    });

    it('handles zero agents', () => {
      const config = optimizer.getOptimalConfig(0);
      assert.strictEqual(config.batchSize, 1);
      assert.strictEqual(config.expectedSuccessRate, 0.5);
    });
  });

  describe('estimateTokens', () => {
    it('returns a positive number', () => {
      const config = optimizer.getOptimalConfig(4);
      const tokens = optimizer.estimateTokens(config);
      assert.ok(tokens > 0);
    });

    it('mesh costs more than hierarchical for same batch size', () => {
      const meshTokens = optimizer.estimateTokens({ batchSize: 4, cacheSizeMB: 50, topology: 'mesh', expectedSuccessRate: 0.95 });
      const hierTokens = optimizer.estimateTokens({ batchSize: 4, cacheSizeMB: 50, topology: 'hierarchical', expectedSuccessRate: 0.95 });
      assert.ok(meshTokens > hierTokens);
    });

    it('larger batch size costs more', () => {
      const small = optimizer.estimateTokens({ batchSize: 2, cacheSizeMB: 25, topology: 'hierarchical', expectedSuccessRate: 0.98 });
      const large = optimizer.estimateTokens({ batchSize: 8, cacheSizeMB: 200, topology: 'hierarchical', expectedSuccessRate: 0.88 });
      assert.ok(large > small);
    });
  });

  describe('outcome tracking', () => {
    it('records outcomes', () => {
      const config = optimizer.getOptimalConfig(4);
      optimizer.recordOutcome(config, true);
      assert.strictEqual(optimizer.totalOutcomes, 1);
    });

    it('tracks multiple outcomes', () => {
      const config = optimizer.getOptimalConfig(4);
      optimizer.recordOutcome(config, true);
      optimizer.recordOutcome(config, false);
      optimizer.recordOutcome(config, true);
      assert.strictEqual(optimizer.totalOutcomes, 3);
    });

    it('getSuccessRate returns -1 with no data', () => {
      assert.strictEqual(optimizer.getSuccessRate('mesh'), -1);
    });

    it('getSuccessRate returns correct rate', () => {
      const config = { batchSize: 4, cacheSizeMB: 50, topology: 'hierarchical', expectedSuccessRate: 0.95 };
      optimizer.recordOutcome(config, true);
      optimizer.recordOutcome(config, true);
      optimizer.recordOutcome(config, false);
      assert.ok(Math.abs(optimizer.getSuccessRate('hierarchical') - 2 / 3) < 0.01);
    });

    it('clear() resets outcomes', () => {
      const config = optimizer.getOptimalConfig(2);
      optimizer.recordOutcome(config, true);
      optimizer.clear();
      assert.strictEqual(optimizer.totalOutcomes, 0);
    });
  });

  describe('adaptive tuning', () => {
    it('getAdaptiveConfig blends observed rate with heuristic', () => {
      const config = optimizer.getOptimalConfig(4);
      // Record all failures to pull rate down
      for (let i = 0; i < 10; i++) {
        optimizer.recordOutcome(config, false);
      }
      const adaptive = optimizer.getAdaptiveConfig(4);
      // Should be lower than default 0.95
      assert.ok(adaptive.expectedSuccessRate < 0.95);
    });

    it('getAdaptiveConfig uses heuristic when no data', () => {
      const adaptive = optimizer.getAdaptiveConfig(4);
      const base = optimizer.getOptimalConfig(4);
      assert.strictEqual(adaptive.expectedSuccessRate, base.expectedSuccessRate);
    });
  });
});

// =============================================================================
// 5. CostTracker
// =============================================================================

describe('CostTracker', { timeout: 10000 }, () => {
  let tracker;

  beforeEach(() => {
    tracker = new CostTracker();
  });

  describe('recordUsage', () => {
    it('records usage for a Guardian', () => {
      tracker.recordUsage('lyria', 1000, 'claude');
      const profile = tracker.getGuardianProfile('lyria');
      assert.ok(profile);
      assert.strictEqual(profile.totalTokensUsed, 1000);
    });

    it('accumulates across multiple calls', () => {
      tracker.recordUsage('lyria', 500, 'claude');
      tracker.recordUsage('lyria', 300, 'claude');
      const profile = tracker.getGuardianProfile('lyria');
      assert.strictEqual(profile.totalTokensUsed, 800);
      assert.strictEqual(profile.callCount, 2);
    });

    it('tracks different Guardians independently', () => {
      tracker.recordUsage('lyria', 1000, 'claude');
      tracker.recordUsage('draconia', 2000, 'gemini');
      assert.strictEqual(tracker.getGuardianProfile('lyria').totalTokensUsed, 1000);
      assert.strictEqual(tracker.getGuardianProfile('draconia').totalTokensUsed, 2000);
    });

    it('uses correct model-specific cost', () => {
      tracker.recordUsage('lyria', 1000000, 'gemini');
      const profile = tracker.getGuardianProfile('lyria');
      // gemini: $1 per 1M tokens
      assert.ok(Math.abs(profile.costEstimate - 1.0) < 0.01);
    });

    it('uses default cost for unknown models', () => {
      tracker.recordUsage('lyria', 1000, 'unknown-model');
      const profile = tracker.getGuardianProfile('lyria');
      assert.ok(profile.costEstimate > 0);
    });
  });

  describe('Guardian profiles', () => {
    it('getGuardianProfile returns null for untracked Guardian', () => {
      assert.strictEqual(tracker.getGuardianProfile('nonexistent'), null);
    });

    it('includes canonical gate info', () => {
      tracker.recordUsage('lyria', 100, 'claude');
      const profile = tracker.getGuardianProfile('lyria');
      assert.strictEqual(profile.gate, 'Sight');
      assert.strictEqual(profile.frequency, 639);
    });

    it('computes avgTokensPerCall', () => {
      tracker.recordUsage('aiyami', 300, 'claude');
      tracker.recordUsage('aiyami', 900, 'claude');
      const profile = tracker.getGuardianProfile('aiyami');
      assert.strictEqual(profile.avgTokensPerCall, 600);
    });

    it('capitalizes guardianName', () => {
      tracker.recordUsage('shinkami', 100, 'claude');
      const profile = tracker.getGuardianProfile('shinkami');
      assert.strictEqual(profile.guardianName, 'Shinkami');
    });

    it('getAllProfiles returns all tracked Guardians', () => {
      tracker.recordUsage('lyria', 100, 'claude');
      tracker.recordUsage('elara', 200, 'claude');
      tracker.recordUsage('ino', 300, 'claude');
      const profiles = tracker.getAllProfiles();
      assert.strictEqual(profiles.length, 3);
    });

    it('getAllProfiles is sorted by totalTokensUsed descending', () => {
      tracker.recordUsage('lyria', 100, 'claude');
      tracker.recordUsage('elara', 300, 'claude');
      tracker.recordUsage('ino', 200, 'claude');
      const profiles = tracker.getAllProfiles();
      assert.strictEqual(profiles[0].guardianId, 'elara');
      assert.strictEqual(profiles[2].guardianId, 'lyria');
    });
  });

  describe('budget tracking', () => {
    it('setBudget sets a budget', () => {
      tracker.setBudget({
        totalBudget: 100000,
        used: 0,
        remaining: 100000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });
      const status = tracker.getBudgetStatus();
      assert.ok(status);
      assert.strictEqual(status.totalBudget, 100000);
    });

    it('getBudgetStatus returns null when no budget set', () => {
      assert.strictEqual(tracker.getBudgetStatus(), null);
    });

    it('budget.used updates with recordUsage', () => {
      tracker.setBudget({
        totalBudget: 10000,
        used: 0,
        remaining: 10000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });
      tracker.recordUsage('lyria', 5000, 'claude');
      const status = tracker.getBudgetStatus();
      assert.strictEqual(status.used, 5000);
      assert.strictEqual(status.remaining, 5000);
    });
  });

  describe('budget events', () => {
    it('emits budget-warning at warningThreshold', () => {
      let warned = false;
      tracker.on('budget-warning', () => { warned = true; });

      tracker.setBudget({
        totalBudget: 1000,
        used: 0,
        remaining: 1000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });

      tracker.recordUsage('lyria', 850, 'claude'); // 85% > 80%
      assert.ok(warned);
    });

    it('emits budget-critical at criticalThreshold', () => {
      let critical = false;
      tracker.on('budget-critical', () => { critical = true; });

      tracker.setBudget({
        totalBudget: 1000,
        used: 0,
        remaining: 1000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });

      tracker.recordUsage('lyria', 960, 'claude'); // 96% > 95%
      assert.ok(critical);
    });

    it('emits warning only once per budget cycle', () => {
      let warningCount = 0;
      tracker.on('budget-warning', () => { warningCount++; });

      tracker.setBudget({
        totalBudget: 1000,
        used: 0,
        remaining: 1000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });

      tracker.recordUsage('lyria', 850, 'claude');
      tracker.recordUsage('lyria', 50, 'claude');
      assert.strictEqual(warningCount, 1);
    });

    it('emits usage-recorded on every recordUsage', () => {
      let count = 0;
      tracker.on('usage-recorded', () => { count++; });
      tracker.recordUsage('lyria', 100, 'claude');
      tracker.recordUsage('lyria', 200, 'claude');
      assert.strictEqual(count, 2);
    });
  });

  describe('generateReport', () => {
    it('returns a complete OptimizationReport', () => {
      tracker.recordUsage('lyria', 500, 'claude');
      const report = tracker.generateReport(0.85, 10, 3000);
      assert.strictEqual(typeof report.totalTokensSaved, 'number');
      assert.strictEqual(typeof report.cacheHitRate, 'string');
      assert.ok(report.cacheHitRate.includes('%'));
      assert.strictEqual(typeof report.estimatedMonthlySavings, 'string');
      assert.ok(report.estimatedMonthlySavings.startsWith('$'));
      assert.ok(Array.isArray(report.guardianProfiles));
    });

    it('includes Guardian profiles in report', () => {
      tracker.recordUsage('lyria', 500, 'claude');
      tracker.recordUsage('draconia', 800, 'gemini');
      const report = tracker.generateReport();
      assert.strictEqual(report.guardianProfiles.length, 2);
    });
  });

  describe('reset', () => {
    it('clears all data', () => {
      tracker.recordUsage('lyria', 100, 'claude');
      tracker.setBudget({
        totalBudget: 1000, used: 0, remaining: 1000,
        warningThreshold: 0.8, criticalThreshold: 0.95,
      });
      tracker.reset();
      assert.strictEqual(tracker.getGuardianProfile('lyria'), null);
      assert.strictEqual(tracker.getBudgetStatus(), null);
      const stats = tracker.getGlobalStats();
      assert.strictEqual(stats.totalTokens, 0);
      assert.strictEqual(stats.totalCalls, 0);
    });
  });

  describe('getGlobalStats', () => {
    it('tracks totals across all Guardians', () => {
      tracker.recordUsage('lyria', 100, 'claude');
      tracker.recordUsage('draconia', 200, 'gemini');
      const stats = tracker.getGlobalStats();
      assert.strictEqual(stats.totalTokens, 300);
      assert.strictEqual(stats.totalCalls, 2);
      assert.ok(stats.totalCost > 0);
    });
  });
});

// =============================================================================
// 6. TokenOptimizer
// =============================================================================

describe('TokenOptimizer', { timeout: 10000 }, () => {
  let opt;

  beforeEach(() => {
    resetTokenOptimizer();
    opt = new TokenOptimizer();
  });

  describe('initialize', () => {
    it('initializes successfully', async () => {
      await opt.initialize();
      assert.ok(opt.isInitialized);
    });

    it('emits initialized event', async () => {
      let emitted = false;
      opt.on('initialized', () => { emitted = true; });
      await opt.initialize();
      assert.ok(emitted);
    });

    it('is idempotent', async () => {
      let count = 0;
      opt.on('initialized', () => { count++; });
      await opt.initialize();
      await opt.initialize();
      assert.strictEqual(count, 1);
    });
  });

  describe('getCompactContext', () => {
    it('returns MemoryContext', () => {
      opt.storeReasoning('Test reasoning about auth patterns and JWT tokens');
      const ctx = opt.getCompactContext('auth patterns');
      assert.ok(ctx.query);
      assert.ok(Array.isArray(ctx.memories));
      assert.strictEqual(typeof ctx.tokensSaved, 'number');
    });

    it('returns empty memories for empty bank', () => {
      const ctx = opt.getCompactContext('anything');
      assert.strictEqual(ctx.memories.length, 0);
    });
  });

  describe('storeReasoning', () => {
    it('stores and makes retrievable', () => {
      opt.storeReasoning('Database indexing strategies for PostgreSQL');
      const ctx = opt.getCompactContext('database indexing PostgreSQL');
      assert.ok(ctx.memories.length > 0);
    });
  });

  describe('cachedLookup', () => {
    it('calls generator on cache miss', async () => {
      let called = false;
      const result = await opt.cachedLookup('test-key', async () => {
        called = true;
        return 42;
      });
      assert.ok(called);
      assert.strictEqual(result, 42);
    });

    it('returns cached value on cache hit', async () => {
      let callCount = 0;
      const generator = async () => { callCount++; return 'expensive-result'; };

      await opt.cachedLookup('key', generator);
      const second = await opt.cachedLookup('key', generator);

      assert.strictEqual(callCount, 1);
      assert.strictEqual(second, 'expensive-result');
    });

    it('different keys call generator independently', async () => {
      const resultA = await opt.cachedLookup('a', async () => 'alpha');
      const resultB = await opt.cachedLookup('b', async () => 'beta');
      assert.strictEqual(resultA, 'alpha');
      assert.strictEqual(resultB, 'beta');
    });
  });

  describe('getOptimalConfig', () => {
    it('delegates to BatchOptimizer', () => {
      const config = opt.getOptimalConfig(4);
      assert.strictEqual(config.topology, 'hierarchical');
      assert.strictEqual(typeof config.batchSize, 'number');
    });
  });

  describe('recordUsage', () => {
    it('delegates to CostTracker', () => {
      opt.recordUsage('lyria', 1000, 'claude');
      const stats = opt.getStats();
      assert.strictEqual(stats.costTracker.totalTokens, 1000);
    });
  });

  describe('setBudget / getBudgetStatus', () => {
    it('sets and retrieves budget', () => {
      opt.setBudget({
        totalBudget: 50000,
        used: 0,
        remaining: 50000,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });
      const status = opt.getBudgetStatus();
      assert.ok(status);
      assert.strictEqual(status.totalBudget, 50000);
    });

    it('returns null when no budget set', () => {
      assert.strictEqual(opt.getBudgetStatus(), null);
    });
  });

  describe('event forwarding', () => {
    it('forwards budget-warning from CostTracker', () => {
      let warned = false;
      opt.on('budget-warning', () => { warned = true; });

      opt.setBudget({
        totalBudget: 1000, used: 0, remaining: 1000,
        warningThreshold: 0.8, criticalThreshold: 0.95,
      });
      opt.recordUsage('lyria', 850, 'claude');
      assert.ok(warned);
    });

    it('forwards budget-critical from CostTracker', () => {
      let critical = false;
      opt.on('budget-critical', () => { critical = true; });

      opt.setBudget({
        totalBudget: 1000, used: 0, remaining: 1000,
        warningThreshold: 0.8, criticalThreshold: 0.95,
      });
      opt.recordUsage('lyria', 960, 'claude');
      assert.ok(critical);
    });

    it('forwards usage-recorded from CostTracker', () => {
      let eventData = null;
      opt.on('usage-recorded', (data) => { eventData = data; });
      opt.recordUsage('draconia', 500, 'gemini');
      assert.ok(eventData);
      assert.strictEqual(eventData.guardianId, 'draconia');
    });
  });

  describe('getStats', () => {
    it('returns aggregated stats from all subsystems', () => {
      const stats = opt.getStats();
      assert.ok(stats.cache);
      assert.ok(stats.reasoningBank);
      assert.ok(stats.costTracker);
      assert.strictEqual(typeof stats.batchOutcomes, 'number');
      assert.strictEqual(typeof stats.initialized, 'boolean');
    });
  });

  describe('generateReport', () => {
    it('returns a complete optimization report', () => {
      opt.recordUsage('lyria', 1000, 'claude');
      opt.storeReasoning('A test entry about code optimization');
      opt.getCompactContext('code optimization');

      const report = opt.generateReport();
      assert.strictEqual(typeof report.totalTokensSaved, 'number');
      assert.strictEqual(typeof report.cacheHitRate, 'string');
      assert.strictEqual(typeof report.memoriesRetrieved, 'number');
      assert.strictEqual(typeof report.estimatedMonthlySavings, 'string');
      assert.ok(Array.isArray(report.guardianProfiles));
    });
  });

  describe('singleton', () => {
    it('getTokenOptimizer returns the same instance', () => {
      resetTokenOptimizer();
      const a = getTokenOptimizer();
      const b = getTokenOptimizer();
      assert.strictEqual(a, b);
    });

    it('resetTokenOptimizer creates a new instance', () => {
      const a = getTokenOptimizer();
      resetTokenOptimizer();
      const b = getTokenOptimizer();
      assert.notStrictEqual(a, b);
    });
  });
});

// =============================================================================
// 7. Guardian Integration
// =============================================================================

describe('Guardian Integration', { timeout: 10000 }, () => {
  it('GUARDIAN_FREQUENCIES has exactly 10 entries', () => {
    assert.strictEqual(Object.keys(GUARDIAN_FREQUENCIES).length, 10);
  });

  it('all 10 canonical Guardians are present', () => {
    const expected = [
      'lyssandria', 'leyla', 'draconia', 'maylinn', 'alera',
      'lyria', 'aiyami', 'elara', 'ino', 'shinkami',
    ];
    for (const name of expected) {
      assert.ok(GUARDIAN_FREQUENCIES[name], `Missing Guardian: ${name}`);
    }
  });

  it('each Guardian has correct gate', () => {
    const gates = {
      lyssandria: 'Foundation', leyla: 'Flow', draconia: 'Fire',
      maylinn: 'Heart', alera: 'Voice', lyria: 'Sight',
      aiyami: 'Crown', elara: 'Shift', ino: 'Unity', shinkami: 'Source',
    };
    for (const [id, gate] of Object.entries(gates)) {
      assert.strictEqual(GUARDIAN_FREQUENCIES[id].gate, gate);
    }
  });

  it('each Guardian has correct Solfeggio frequency', () => {
    const frequencies = {
      lyssandria: 174, leyla: 285, draconia: 396,
      maylinn: 417, alera: 528, lyria: 639,
      aiyami: 741, elara: 852, ino: 963, shinkami: 1111,
    };
    for (const [id, freq] of Object.entries(frequencies)) {
      assert.strictEqual(GUARDIAN_FREQUENCIES[id].frequency, freq);
    }
  });

  it('each Guardian has a valid element', () => {
    const validElements = ['Fire', 'Water', 'Earth', 'Wind', 'Void', 'Spirit'];
    for (const info of Object.values(GUARDIAN_FREQUENCIES)) {
      assert.ok(validElements.includes(info.element), `Invalid element: ${info.element}`);
    }
  });

  it('CostTracker can track all 10 Guardians', () => {
    const tracker = new CostTracker();
    for (const id of GUARDIAN_IDS) {
      tracker.recordUsage(id, 100, 'claude');
    }
    const profiles = tracker.getAllProfiles();
    assert.strictEqual(profiles.length, 10);
  });

  it('each Guardian profile has correct gate and frequency', () => {
    const tracker = new CostTracker();
    for (const id of GUARDIAN_IDS) {
      tracker.recordUsage(id, 100, 'claude');
    }
    for (const id of GUARDIAN_IDS) {
      const profile = tracker.getGuardianProfile(id);
      assert.strictEqual(profile.gate, GUARDIAN_FREQUENCIES[id].gate);
      assert.strictEqual(profile.frequency, GUARDIAN_FREQUENCIES[id].frequency);
    }
  });

  it('COST_PER_TOKEN has entries for common models', () => {
    assert.ok('gemini' in COST_PER_TOKEN);
    assert.ok('claude' in COST_PER_TOKEN);
    assert.ok('gpt4' in COST_PER_TOKEN);
  });

  it('all costs are positive numbers', () => {
    for (const [model, cost] of Object.entries(COST_PER_TOKEN)) {
      assert.ok(cost > 0, `${model} cost should be positive`);
    }
  });
});

// =============================================================================
// 8. Edge Cases
// =============================================================================

describe('Edge Cases', { timeout: 10000 }, () => {
  describe('empty queries', () => {
    it('ReasoningBank handles empty string query', () => {
      const bank = new ReasoningBank();
      bank.store('some content');
      const results = bank.retrieve('');
      // Should not throw
      assert.ok(Array.isArray(results));
    });

    it('TokenOptimizer handles empty string context query', () => {
      const opt = new TokenOptimizer();
      const ctx = opt.getCompactContext('');
      assert.ok(ctx);
      assert.strictEqual(ctx.query, '');
    });
  });

  describe('zero budget', () => {
    it('CostTracker handles zero totalBudget', () => {
      const tracker = new CostTracker();
      let critical = false;
      tracker.on('budget-critical', () => { critical = true; });

      tracker.setBudget({
        totalBudget: 0,
        used: 0,
        remaining: 0,
        warningThreshold: 0.8,
        criticalThreshold: 0.95,
      });
      // Any usage on a zero budget should not divide by zero
      // NaN >= threshold is false, so no event — this is safe
      tracker.recordUsage('lyria', 1, 'claude');
      // Should not crash
      const status = tracker.getBudgetStatus();
      assert.ok(status);
    });
  });

  describe('negative tokens', () => {
    it('CostTracker clamps negative tokens to 0', () => {
      const tracker = new CostTracker();
      tracker.recordUsage('lyria', -100, 'claude');
      const profile = tracker.getGuardianProfile('lyria');
      assert.strictEqual(profile.totalTokensUsed, 0);
    });
  });

  describe('cache overflow', () => {
    it('LRUCache handles rapid insertions beyond max size', () => {
      const cache = new LRUCache(3, 60000);
      for (let i = 0; i < 1000; i++) {
        cache.set(`key_${i}`, i);
      }
      assert.strictEqual(cache.size, 3);
      // Most recent 3 should be present
      assert.strictEqual(cache.get('key_999'), 999);
      assert.strictEqual(cache.get('key_998'), 998);
    });
  });

  describe('concurrent-like access', () => {
    it('cachedLookup handles parallel calls for same key', async () => {
      const opt = new TokenOptimizer();
      let callCount = 0;
      const generator = async () => {
        callCount++;
        return 'result';
      };

      // Simulate concurrent calls
      const [r1, r2, r3] = await Promise.all([
        opt.cachedLookup('shared-key', generator),
        opt.cachedLookup('shared-key', generator),
        opt.cachedLookup('shared-key', generator),
      ]);

      // All should get the same result
      assert.strictEqual(r1, 'result');
      assert.strictEqual(r2, 'result');
      assert.strictEqual(r3, 'result');
    });
  });

  describe('large data', () => {
    it('ReasoningBank handles large entries', () => {
      const bank = new ReasoningBank();
      const largeText = 'word '.repeat(10000);
      const id = bank.store(largeText);
      assert.ok(id);
      assert.strictEqual(bank.size, 1);
    });

    it('LRUCache stores large values', () => {
      const cache = new LRUCache(10, 60000);
      const largeObj = { data: 'x'.repeat(100000) };
      cache.set('big', largeObj);
      assert.deepStrictEqual(cache.get('big'), largeObj);
    });
  });

  describe('special characters', () => {
    it('ReasoningBank handles Unicode in entries', () => {
      const bank = new ReasoningBank();
      bank.store('Die Authentifizierung verwendet JWT-Tokens fur die Sitzungsverwaltung');
      const results = bank.retrieve('Authentifizierung', { threshold: 0.0 });
      assert.ok(results.length > 0);
    });

    it('LRUCache handles special characters in keys', () => {
      const cache = new LRUCache();
      cache.set('key/with:special!chars', 'value');
      assert.strictEqual(cache.get('key/with:special!chars'), 'value');
    });
  });

  describe('BatchOptimizer edge cases', () => {
    it('handles negative agent count', () => {
      const opt = new BatchOptimizer();
      const config = opt.getOptimalConfig(-5);
      assert.ok(config.batchSize >= 1);
    });

    it('handles very large agent count', () => {
      const opt = new BatchOptimizer();
      const config = opt.getOptimalConfig(10000);
      assert.strictEqual(config.topology, 'adaptive');
    });

    it('estimateTokens handles unknown topology', () => {
      const opt = new BatchOptimizer();
      const tokens = opt.estimateTokens({
        batchSize: 4, cacheSizeMB: 50,
        topology: 'unknown-topology',
        expectedSuccessRate: 0.9,
      });
      assert.ok(tokens > 0);
    });
  });

  describe('CostTracker model variants', () => {
    it('tracks claude-sonnet cost correctly', () => {
      const tracker = new CostTracker();
      tracker.recordUsage('lyria', 1000000, 'claude-sonnet');
      const profile = tracker.getGuardianProfile('lyria');
      // $3 per 1M tokens
      assert.ok(Math.abs(profile.costEstimate - 3.0) < 0.01);
    });

    it('tracks claude-haiku cost correctly', () => {
      const tracker = new CostTracker();
      tracker.recordUsage('lyria', 1000000, 'claude-haiku');
      const profile = tracker.getGuardianProfile('lyria');
      // $0.25 per 1M tokens
      assert.ok(Math.abs(profile.costEstimate - 0.25) < 0.01);
    });

    it('tracks gpt4-mini cost correctly', () => {
      const tracker = new CostTracker();
      tracker.recordUsage('lyria', 1000000, 'gpt4-mini');
      const profile = tracker.getGuardianProfile('lyria');
      // $0.60 per 1M tokens
      assert.ok(Math.abs(profile.costEstimate - 0.6) < 0.01);
    });
  });

  describe('TokenOptimizer options', () => {
    it('accepts custom cache options', () => {
      const opt = new TokenOptimizer({ cacheMaxSize: 10, cacheTTL: 1000 });
      const stats = opt.getStats();
      assert.strictEqual(stats.cache.maxSize, 10);
    });
  });
});
