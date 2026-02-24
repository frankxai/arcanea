/**
 * @arcanea/hooks — Comprehensive Test Suite
 *
 * Tests cover:
 * 1. Exports exist
 * 2. HookMatcher (glob, regex, exact, composite, caching)
 * 3. HookManager (register, execute, pipeline, priority ordering)
 * 4. ContextBuilder (fluent API)
 * 5. Individual hook types (LLM, Memory, Neural, Performance, Workflow)
 * 6. Event emission
 * 7. Edge cases
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Import everything from the package
import {
  // Types & enums
  HookPriority,
  CATEGORY_GUARDIANS,
  eventCategory,
  // Core classes
  HookMatcher,
  HookManager,
  ContextBuilder,
  // LLM hooks
  llmHooks,
  createPreCallHook,
  createPostCallHook,
  createLLMErrorHook,
  createRetryHook,
  createCacheHitHook,
  createCacheMissHook,
  createStreamChunkHook,
  // Memory hooks
  memoryHooks,
  createPreStoreHook,
  createPostStoreHook,
  createPreRetrieveHook,
  createPostRetrieveHook,
  createSyncHook,
  createEvictHook,
  // Neural hooks
  neuralHooks,
  createPatternDetectedHook,
  createPatternLearnedHook,
  createTrainingStartHook,
  createTrainingCompleteHook,
  createAdaptationHook,
  createConsolidationHook,
  // Performance hooks
  performanceHooks,
  createMetricRecordedHook,
  createThresholdExceededHook,
  createBottleneckDetectedHook,
  createOptimizationAppliedHook,
  createHealthCheckHook,
  // Workflow hooks
  workflowHooks,
  createStartHook,
  createStepHook,
  createDecisionHook,
  createCompleteHook,
  createWorkflowErrorHook,
  createRollbackHook,
} from '../dist/index.js';


// ====================================================================
// 1. EXPORTS EXIST
// ====================================================================

describe('Exports', () => {
  it('exports HookPriority enum', () => {
    assert.equal(typeof HookPriority, 'object');
    assert.equal(HookPriority.Critical, 1000);
    assert.equal(HookPriority.High, 100);
    assert.equal(HookPriority.Normal, 50);
    assert.equal(HookPriority.Low, 10);
    assert.equal(HookPriority.Background, 1);
  });

  it('exports CATEGORY_GUARDIANS mapping', () => {
    assert.ok(CATEGORY_GUARDIANS);
    assert.ok(CATEGORY_GUARDIANS.llm);
    assert.ok(CATEGORY_GUARDIANS.memory);
    assert.ok(CATEGORY_GUARDIANS.neural);
    assert.ok(CATEGORY_GUARDIANS.performance);
    assert.ok(CATEGORY_GUARDIANS.workflow);
  });

  it('exports eventCategory function', () => {
    assert.equal(typeof eventCategory, 'function');
    assert.equal(eventCategory('llm:pre-call'), 'llm');
    assert.equal(eventCategory('memory:sync'), 'memory');
    assert.equal(eventCategory('neural:adaptation'), 'neural');
    assert.equal(eventCategory('perf:metric-recorded'), 'performance');
    assert.equal(eventCategory('workflow:start'), 'workflow');
  });

  it('exports core classes', () => {
    assert.equal(typeof HookMatcher, 'function');
    assert.equal(typeof HookManager, 'function');
    assert.equal(typeof ContextBuilder, 'function');
  });

  it('exports all LLM hook factories', () => {
    assert.ok(llmHooks);
    assert.equal(typeof createPreCallHook, 'function');
    assert.equal(typeof createPostCallHook, 'function');
    assert.equal(typeof createLLMErrorHook, 'function');
    assert.equal(typeof createRetryHook, 'function');
    assert.equal(typeof createCacheHitHook, 'function');
    assert.equal(typeof createCacheMissHook, 'function');
    assert.equal(typeof createStreamChunkHook, 'function');
  });

  it('exports all Memory hook factories', () => {
    assert.ok(memoryHooks);
    assert.equal(typeof createPreStoreHook, 'function');
    assert.equal(typeof createPostStoreHook, 'function');
    assert.equal(typeof createPreRetrieveHook, 'function');
    assert.equal(typeof createPostRetrieveHook, 'function');
    assert.equal(typeof createSyncHook, 'function');
    assert.equal(typeof createEvictHook, 'function');
  });

  it('exports all Neural hook factories', () => {
    assert.ok(neuralHooks);
    assert.equal(typeof createPatternDetectedHook, 'function');
    assert.equal(typeof createPatternLearnedHook, 'function');
    assert.equal(typeof createTrainingStartHook, 'function');
    assert.equal(typeof createTrainingCompleteHook, 'function');
    assert.equal(typeof createAdaptationHook, 'function');
    assert.equal(typeof createConsolidationHook, 'function');
  });

  it('exports all Performance hook factories', () => {
    assert.ok(performanceHooks);
    assert.equal(typeof createMetricRecordedHook, 'function');
    assert.equal(typeof createThresholdExceededHook, 'function');
    assert.equal(typeof createBottleneckDetectedHook, 'function');
    assert.equal(typeof createOptimizationAppliedHook, 'function');
    assert.equal(typeof createHealthCheckHook, 'function');
  });

  it('exports all Workflow hook factories', () => {
    assert.ok(workflowHooks);
    assert.equal(typeof createStartHook, 'function');
    assert.equal(typeof createStepHook, 'function');
    assert.equal(typeof createDecisionHook, 'function');
    assert.equal(typeof createCompleteHook, 'function');
    assert.equal(typeof createWorkflowErrorHook, 'function');
    assert.equal(typeof createRollbackHook, 'function');
  });

  it('Guardian mapping has correct elements', () => {
    // LLM -> Lyria (water) + Aiyami (spirit)
    assert.equal(CATEGORY_GUARDIANS.llm[0].guardian, 'lyria');
    assert.equal(CATEGORY_GUARDIANS.llm[0].element, 'water');
    assert.equal(CATEGORY_GUARDIANS.llm[1].guardian, 'aiyami');
    assert.equal(CATEGORY_GUARDIANS.llm[1].element, 'spirit');

    // Neural -> Shinkami (void)
    assert.equal(CATEGORY_GUARDIANS.neural[0].guardian, 'shinkami');
    assert.equal(CATEGORY_GUARDIANS.neural[0].frequency, 1111);

    // Performance -> Draconia (fire) + Ino (earth)
    assert.equal(CATEGORY_GUARDIANS.performance[0].guardian, 'draconia');
    assert.equal(CATEGORY_GUARDIANS.performance[0].element, 'fire');
  });
});


// ====================================================================
// 2. HOOK MATCHER
// ====================================================================

describe('HookMatcher', () => {
  let matcher;

  beforeEach(() => {
    matcher = new HookMatcher({ cacheEnabled: true, cacheTTLMs: 60000 });
  });

  describe('glob matching', () => {
    it('matches simple glob patterns', () => {
      assert.equal(matcher.matchGlob('src/index.ts', 'src/**/*.ts'), true);
      assert.equal(matcher.matchGlob('src/hooks/llm.ts', 'src/**/*.ts'), true);
      assert.equal(matcher.matchGlob('dist/index.js', 'src/**/*.ts'), false);
    });

    it('matches wildcard patterns', () => {
      assert.equal(matcher.matchGlob('file.ts', '*.ts'), true);
      assert.equal(matcher.matchGlob('file.js', '*.ts'), false);
    });

    it('matches dot files', () => {
      assert.equal(matcher.matchGlob('.gitignore', '*'), true);
      assert.equal(matcher.matchGlob('.env', '.*'), true);
    });
  });

  describe('regex matching', () => {
    it('matches regex patterns', () => {
      assert.equal(matcher.matchRegex('hello world', 'hello'), true);
      assert.equal(matcher.matchRegex('hello world', '^hello'), true);
      assert.equal(matcher.matchRegex('hello world', '^world'), false);
    });

    it('matches complex regex', () => {
      assert.equal(matcher.matchRegex('error-42', 'error-\\d+'), true);
      assert.equal(matcher.matchRegex('warning-abc', 'error-\\d+'), false);
    });
  });

  describe('exact matching', () => {
    it('matches exact strings', () => {
      assert.equal(matcher.matchExact('hello', 'hello'), true);
      assert.equal(matcher.matchExact('hello', 'Hello'), false);
      assert.equal(matcher.matchExact('hello', 'hello '), false);
    });
  });

  describe('pattern matching', () => {
    it('matches glob pattern objects', () => {
      const result = matcher.matchPattern('src/index.ts', { type: 'glob', pattern: 'src/**/*.ts' });
      assert.equal(result, true);
    });

    it('matches regex pattern objects', () => {
      const result = matcher.matchPattern('error-42', { type: 'regex', pattern: 'error-\\d+' });
      assert.equal(result, true);
    });

    it('matches exact pattern objects', () => {
      const result = matcher.matchPattern('hello', { type: 'exact', pattern: 'hello' });
      assert.equal(result, true);
    });

    it('handles inverted patterns', () => {
      const result = matcher.matchPattern('src/index.ts', { type: 'glob', pattern: 'src/**/*.ts', inverted: true });
      assert.equal(result, false);

      const result2 = matcher.matchPattern('dist/index.js', { type: 'glob', pattern: 'src/**/*.ts', inverted: true });
      assert.equal(result2, true);
    });
  });

  describe('composite matching', () => {
    it('matches AND composite', () => {
      const result = matcher.matchComposite('src/hooks/llm.ts', {
        type: 'composite',
        operator: 'AND',
        patterns: [
          { type: 'glob', pattern: 'src/**/*.ts' },
          { type: 'regex', pattern: 'hooks' },
        ],
      });
      assert.equal(result, true);
    });

    it('fails AND when one pattern fails', () => {
      const result = matcher.matchComposite('src/hooks/llm.ts', {
        type: 'composite',
        operator: 'AND',
        patterns: [
          { type: 'glob', pattern: 'src/**/*.ts' },
          { type: 'regex', pattern: 'dist' },
        ],
      });
      assert.equal(result, false);
    });

    it('matches OR composite', () => {
      const result = matcher.matchComposite('dist/index.js', {
        type: 'composite',
        operator: 'OR',
        patterns: [
          { type: 'glob', pattern: 'src/**/*.ts' },
          { type: 'glob', pattern: 'dist/**/*.js' },
        ],
      });
      assert.equal(result, true);
    });

    it('fails OR when all patterns fail', () => {
      const result = matcher.matchComposite('test/foo.txt', {
        type: 'composite',
        operator: 'OR',
        patterns: [
          { type: 'glob', pattern: 'src/**/*.ts' },
          { type: 'glob', pattern: 'dist/**/*.js' },
        ],
      });
      assert.equal(result, false);
    });
  });

  describe('multi-pattern matching', () => {
    it('returns match result with metadata', () => {
      const result = matcher.matchPatterns('src/index.ts', [
        { type: 'glob', pattern: 'src/**/*.ts' },
      ]);
      assert.equal(result.matched, true);
      assert.equal(result.cacheHit, false);
      assert.ok(result.matchedRules.length > 0);
      assert.equal(typeof result.executionTimeMs, 'number');
    });

    it('matches empty patterns as wildcard', () => {
      const result = matcher.matchPatterns('anything', []);
      assert.equal(result.matched, true);
      assert.deepEqual(result.matchedRules, ['*']);
    });
  });

  describe('caching', () => {
    it('caches results and reports cache hits', () => {
      const patterns = [{ type: 'glob', pattern: 'src/**/*.ts' }];

      const first = matcher.matchPatterns('src/index.ts', patterns);
      assert.equal(first.cacheHit, false);

      const second = matcher.matchPatterns('src/index.ts', patterns);
      assert.equal(second.cacheHit, true);
      assert.equal(second.matched, first.matched);
    });

    it('reports cache stats', () => {
      const patterns = [{ type: 'exact', pattern: 'test' }];
      matcher.matchPatterns('test', patterns);
      matcher.matchPatterns('test', patterns); // cache hit

      const stats = matcher.getCacheStats();
      assert.equal(stats.size, 1);
      assert.equal(stats.hits, 1);
      assert.equal(stats.misses, 1);
      assert.ok(stats.hitRate > 0);
    });

    it('clears cache', () => {
      matcher.matchPatterns('test', [{ type: 'exact', pattern: 'test' }]);
      assert.equal(matcher.getCacheStats().size, 1);

      matcher.clearCache();
      assert.equal(matcher.getCacheStats().size, 0);
    });

    it('prunes expired entries', async () => {
      const shortTTL = new HookMatcher({ cacheEnabled: true, cacheTTLMs: 1 });
      shortTTL.matchPatterns('test', [{ type: 'exact', pattern: 'test' }]);

      // Wait for TTL to expire
      await new Promise(r => setTimeout(r, 10));

      const pruned = shortTTL.pruneExpired();
      assert.equal(pruned, 1);
    });

    it('works with caching disabled', () => {
      const noCache = new HookMatcher({ cacheEnabled: false });
      const r1 = noCache.matchPatterns('test', [{ type: 'exact', pattern: 'test' }]);
      const r2 = noCache.matchPatterns('test', [{ type: 'exact', pattern: 'test' }]);
      assert.equal(r1.cacheHit, false);
      assert.equal(r2.cacheHit, false);
    });
  });
});


// ====================================================================
// 3. HOOK MANAGER
// ====================================================================

describe('HookManager', () => {
  let manager;

  beforeEach(() => {
    manager = new HookManager();
  });

  describe('registration', () => {
    it('registers a hook and returns an ID', () => {
      const id = manager.register('llm:pre-call', () => ({ success: true }), {
        name: 'test-hook',
      });
      assert.ok(id);
      assert.equal(typeof id, 'string');
    });

    it('finds a registered hook by ID', () => {
      const id = manager.register('llm:pre-call', () => ({ success: true }), {
        name: 'test-hook',
      });
      const hook = manager.findHook(id);
      assert.ok(hook);
      assert.equal(hook.name, 'test-hook');
      assert.equal(hook.event, 'llm:pre-call');
      assert.equal(hook.category, 'llm');
      assert.equal(hook.enabled, true);
    });

    it('prevents duplicate names on same event', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'unique' });
      assert.throws(
        () => manager.register('llm:pre-call', () => ({ success: true }), { name: 'unique' }),
        /already registered/
      );
    });

    it('allows same name on different events', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'shared-name' });
      const id = manager.register('llm:post-call', () => ({ success: true }), { name: 'shared-name' });
      assert.ok(id);
    });

    it('unregisters a hook by ID', () => {
      const id = manager.register('llm:pre-call', () => ({ success: true }), { name: 'removable' });
      const removed = manager.unregister(id);
      assert.equal(removed, true);
      assert.equal(manager.findHook(id), undefined);
    });

    it('returns false for non-existent unregister', () => {
      const removed = manager.unregister('nonexistent');
      assert.equal(removed, false);
    });

    it('enables and disables hooks', () => {
      const id = manager.register('llm:pre-call', () => ({ success: true }), { name: 'toggle' });
      assert.equal(manager.findHook(id).enabled, true);

      manager.setEnabled(id, false);
      assert.equal(manager.findHook(id).enabled, false);

      manager.setEnabled(id, true);
      assert.equal(manager.findHook(id).enabled, true);
    });
  });

  describe('priority ordering', () => {
    it('executes hooks in priority order (highest first)', async () => {
      const order = [];

      manager.register('workflow:start', () => {
        order.push('low');
        return { success: true };
      }, { name: 'low-priority', priority: HookPriority.Low });

      manager.register('workflow:start', () => {
        order.push('critical');
        return { success: true };
      }, { name: 'critical-priority', priority: HookPriority.Critical });

      manager.register('workflow:start', () => {
        order.push('normal');
        return { success: true };
      }, { name: 'normal-priority', priority: HookPriority.Normal });

      const ctx = ContextBuilder.create('workflow:start').build();
      await manager.execute(ctx);

      assert.deepEqual(order, ['critical', 'normal', 'low']);
    });
  });

  describe('execution', () => {
    it('executes hooks for a given event', async () => {
      let called = false;
      manager.register('llm:pre-call', () => {
        called = true;
        return { success: true };
      }, { name: 'caller' });

      const ctx = ContextBuilder.create('llm:pre-call').build();
      const results = await manager.execute(ctx);

      assert.equal(called, true);
      assert.equal(results.length, 1);
      assert.equal(results[0].success, true);
    });

    it('skips disabled hooks', async () => {
      const id = manager.register('llm:pre-call', () => ({ success: true }), { name: 'disabled-hook' });
      manager.setEnabled(id, false);

      const ctx = ContextBuilder.create('llm:pre-call').build();
      const results = await manager.execute(ctx);
      assert.equal(results.length, 0);
    });

    it('merges result data into context metadata', async () => {
      manager.register('llm:pre-call', () => ({
        success: true,
        data: { injected: 'value' },
      }), { name: 'injector' });

      manager.register('llm:pre-call', (ctx) => ({
        success: true,
        data: { sawInjected: ctx.metadata.injected },
      }), { name: 'reader', priority: HookPriority.Low });

      const ctx = ContextBuilder.create('llm:pre-call').build();
      const results = await manager.execute(ctx);

      assert.equal(results.length, 2);
      assert.equal(results[1].data.sawInjected, 'value');
    });

    it('aborts chain when result.abort is true', async () => {
      const order = [];

      manager.register('workflow:start', () => {
        order.push('first');
        return { success: true, abort: true };
      }, { name: 'aborter', priority: HookPriority.High });

      manager.register('workflow:start', () => {
        order.push('second');
        return { success: true };
      }, { name: 'skipped', priority: HookPriority.Low });

      const ctx = ContextBuilder.create('workflow:start').build();
      await manager.execute(ctx);

      assert.deepEqual(order, ['first']);
    });

    it('handles errors gracefully', async () => {
      manager.register('llm:error', () => {
        throw new Error('boom');
      }, { name: 'crasher' });

      const ctx = ContextBuilder.create('llm:error').build();
      const results = await manager.execute(ctx);

      assert.equal(results.length, 1);
      assert.equal(results[0].success, false);
      assert.equal(results[0].error, 'boom');
    });

    it('supports async handlers', async () => {
      manager.register('llm:pre-call', async () => {
        await new Promise(r => setTimeout(r, 5));
        return { success: true, data: { async: true } };
      }, { name: 'async-hook' });

      const ctx = ContextBuilder.create('llm:pre-call').build();
      const results = await manager.execute(ctx);

      assert.equal(results.length, 1);
      assert.equal(results[0].success, true);
      assert.equal(results[0].data.async, true);
    });

    it('filters by pattern when matchValue is provided', async () => {
      manager.register('llm:pre-call', () => ({ success: true }), {
        name: 'ts-only',
        pattern: '*.ts',
      });

      const ctx = ContextBuilder.create('llm:pre-call').build();

      const r1 = await manager.execute(ctx, 'file.ts');
      assert.equal(r1.length, 1);

      const r2 = await manager.execute(ctx, 'file.js');
      assert.equal(r2.length, 0);
    });
  });

  describe('pipeline execution', () => {
    it('executes a pipeline with stages', async () => {
      const id1 = manager.register('workflow:start', () => ({
        success: true,
        data: { stage: 'init' },
      }), { name: 'init-hook' });

      const id2 = manager.register('workflow:start', () => ({
        success: true,
        data: { stage: 'process' },
      }), { name: 'process-hook' });

      manager.registerPipeline({
        id: 'test-pipeline',
        name: 'Test Pipeline',
        stages: [
          { name: 'init', hookIds: [id1] },
          { name: 'process', hookIds: [id2] },
        ],
        errorStrategy: 'continue',
      });

      const ctx = ContextBuilder.create('workflow:start').build();
      const result = await manager.executePipeline('test-pipeline', ctx);

      assert.equal(result.success, true);
      assert.equal(result.hooksExecuted, 2);
      assert.equal(result.hooksFailed, 0);
      assert.equal(result.aborted, false);
      assert.equal(result.rolledBack, false);
    });

    it('fail-fast strategy stops on first error', async () => {
      const id1 = manager.register('workflow:start', () => {
        throw new Error('stage1 error');
      }, { name: 'failing-hook' });

      const id2 = manager.register('workflow:start', () => ({
        success: true,
      }), { name: 'unreached-hook' });

      manager.registerPipeline({
        id: 'fail-pipe',
        name: 'Fail Pipeline',
        stages: [
          { name: 'stage1', hookIds: [id1] },
          { name: 'stage2', hookIds: [id2] },
        ],
        errorStrategy: 'fail-fast',
      });

      const ctx = ContextBuilder.create('workflow:start').build();
      const result = await manager.executePipeline('fail-pipe', ctx);

      assert.equal(result.success, false);
      assert.equal(result.aborted, true);
      assert.equal(result.hooksExecuted, 1);
    });

    it('rollback strategy sets rolledBack flag', async () => {
      const id1 = manager.register('workflow:start', () => {
        throw new Error('needs rollback');
      }, { name: 'rollback-trigger' });

      manager.registerPipeline({
        id: 'rollback-pipe',
        name: 'Rollback Pipeline',
        stages: [
          { name: 'stage1', hookIds: [id1] },
        ],
        errorStrategy: 'rollback',
      });

      const ctx = ContextBuilder.create('workflow:start').build();
      const result = await manager.executePipeline('rollback-pipe', ctx);

      assert.equal(result.rolledBack, true);
      assert.equal(result.aborted, true);
    });

    it('throws when pipeline not found', async () => {
      const ctx = ContextBuilder.create('workflow:start').build();
      await assert.rejects(
        () => manager.executePipeline('nonexistent', ctx),
        /not found/
      );
    });

    it('skips stages with failing conditions', async () => {
      const id1 = manager.register('workflow:start', () => ({
        success: true,
        data: { ran: 'stage1' },
      }), { name: 'stage1-hook' });

      const id2 = manager.register('workflow:start', () => ({
        success: true,
        data: { ran: 'stage2' },
      }), { name: 'stage2-hook' });

      manager.registerPipeline({
        id: 'conditional-pipe',
        name: 'Conditional Pipeline',
        stages: [
          { name: 'always', hookIds: [id1] },
          { name: 'never', hookIds: [id2], condition: () => false },
        ],
        errorStrategy: 'continue',
      });

      const ctx = ContextBuilder.create('workflow:start').build();
      const result = await manager.executePipeline('conditional-pipe', ctx);

      assert.equal(result.hooksExecuted, 1);
    });
  });

  describe('statistics', () => {
    it('tracks hook counts by category', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'llm-1' });
      manager.register('llm:post-call', () => ({ success: true }), { name: 'llm-2' });
      manager.register('workflow:start', () => ({ success: true }), { name: 'wf-1' });

      const stats = manager.getStats();
      assert.equal(stats.totalHooks, 3);
      assert.equal(stats.hooksByCategory.llm, 2);
      assert.equal(stats.hooksByCategory.workflow, 1);
    });

    it('tracks execution metrics', async () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'metric-hook' });

      const ctx = ContextBuilder.create('llm:pre-call').build();
      await manager.execute(ctx);

      const stats = manager.getStats();
      assert.equal(stats.totalExecutions, 1);
      assert.equal(stats.totalFailures, 0);
      assert.ok(stats.avgExecutionTimeMs >= 0);
    });

    it('reset clears all state', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'reset-hook' });
      manager.registerPipeline({
        id: 'p', name: 'P', stages: [], errorStrategy: 'continue',
      });

      manager.reset();

      const stats = manager.getStats();
      assert.equal(stats.totalHooks, 0);
      assert.equal(stats.pipelinesRegistered, 0);
    });
  });

  describe('queries', () => {
    it('getHooks returns hooks for specific event', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'a' });
      manager.register('llm:post-call', () => ({ success: true }), { name: 'b' });

      const hooks = manager.getHooks('llm:pre-call');
      assert.equal(hooks.length, 1);
      assert.equal(hooks[0].name, 'a');
    });

    it('getAllHooks returns all hooks', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'a' });
      manager.register('workflow:start', () => ({ success: true }), { name: 'b' });

      const all = manager.getAllHooks();
      assert.equal(all.length, 2);
    });

    it('getHooksByCategory filters by category', () => {
      manager.register('llm:pre-call', () => ({ success: true }), { name: 'l1' });
      manager.register('llm:post-call', () => ({ success: true }), { name: 'l2' });
      manager.register('workflow:start', () => ({ success: true }), { name: 'w1' });

      const llm = manager.getHooksByCategory('llm');
      assert.equal(llm.length, 2);

      const wf = manager.getHooksByCategory('workflow');
      assert.equal(wf.length, 1);
    });
  });
});


// ====================================================================
// 4. CONTEXT BUILDER
// ====================================================================

describe('ContextBuilder', () => {
  it('creates a context with required fields', () => {
    const ctx = ContextBuilder.create('llm:pre-call').build();
    assert.ok(ctx.executionId);
    assert.equal(ctx.event, 'llm:pre-call');
    assert.ok(ctx.timestamp);
    assert.ok(ctx.metadata);
  });

  it('sets session ID', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .session('sess-123')
      .build();
    assert.equal(ctx.sessionId, 'sess-123');
  });

  it('sets guardian', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .guardian('lyria')
      .build();
    assert.equal(ctx.guardian, 'lyria');
  });

  it('sets element', () => {
    const ctx = ContextBuilder.create('neural:adaptation')
      .element('void')
      .build();
    assert.equal(ctx.element, 'void');
  });

  it('sets typed data', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .withData({ provider: 'anthropic', model: 'claude-opus-4-6' })
      .build();
    assert.deepEqual(ctx.data, { provider: 'anthropic', model: 'claude-opus-4-6' });
  });

  it('sets individual metadata', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .meta('source', 'api')
      .meta('version', 2)
      .build();
    assert.equal(ctx.metadata.source, 'api');
    assert.equal(ctx.metadata.version, 2);
  });

  it('merges metadata', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .meta('existing', true)
      .mergeMetadata({ a: 1, b: 2 })
      .build();
    assert.equal(ctx.metadata.existing, true);
    assert.equal(ctx.metadata.a, 1);
    assert.equal(ctx.metadata.b, 2);
  });

  it('sets parent ID', () => {
    const ctx = ContextBuilder.create('workflow:step')
      .parent('parent-exec-1')
      .build();
    assert.equal(ctx.parentId, 'parent-exec-1');
  });

  it('sets elapsed time', () => {
    const ctx = ContextBuilder.create('perf:metric-recorded')
      .elapsedMs(150)
      .build();
    assert.equal(ctx.elapsed, 150);
  });

  it('overrides execution ID', () => {
    const ctx = ContextBuilder.create('llm:pre-call')
      .id('custom-id')
      .build();
    assert.equal(ctx.executionId, 'custom-id');
  });

  it('overrides timestamp', () => {
    const ts = '2026-01-01T00:00:00.000Z';
    const ctx = ContextBuilder.create('llm:pre-call')
      .at(ts)
      .build();
    assert.equal(ctx.timestamp, ts);
  });

  it('supports full chaining', () => {
    const ctx = ContextBuilder.create('workflow:start')
      .id('exec-1')
      .session('sess-1')
      .guardian('alera')
      .element('wind')
      .withData({ workflowId: 'wf-1' })
      .meta('origin', 'test')
      .parent('parent-1')
      .elapsedMs(0)
      .build();

    assert.equal(ctx.executionId, 'exec-1');
    assert.equal(ctx.sessionId, 'sess-1');
    assert.equal(ctx.guardian, 'alera');
    assert.equal(ctx.element, 'wind');
    assert.deepEqual(ctx.data, { workflowId: 'wf-1' });
    assert.equal(ctx.metadata.origin, 'test');
    assert.equal(ctx.parentId, 'parent-1');
    assert.equal(ctx.elapsed, 0);
  });
});


// ====================================================================
// 5. INDIVIDUAL HOOK TYPES
// ====================================================================

describe('LLM Hooks', () => {
  it('pre-call validates provider and model', () => {
    const hook = createPreCallHook();
    const ctx = ContextBuilder.create('llm:pre-call')
      .withData({ provider: '', model: '', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.ok(result.abort);
  });

  it('pre-call succeeds with valid payload', () => {
    const hook = createPreCallHook();
    const ctx = ContextBuilder.create('llm:pre-call')
      .withData({ provider: 'anthropic', model: 'claude-opus-4-6', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.ok(result.data.llmPreCallTimestamp);
  });

  it('pre-call runs custom validator', () => {
    const hook = createPreCallHook((p) => ({
      valid: p.model !== 'banned-model',
      reason: 'Model banned',
    }));
    const ctx = ContextBuilder.create('llm:pre-call')
      .withData({ provider: 'test', model: 'banned-model', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.equal(result.error, 'Model banned');
  });

  it('post-call records latency', () => {
    const hook = createPostCallHook();
    const ctx = ContextBuilder.create('llm:post-call')
      .withData({
        provider: 'anthropic',
        model: 'claude-opus-4-6',
        operation: 'complete',
        response: { content: 'hello', usage: { promptTokens: 10, completionTokens: 5, totalTokens: 15 } },
      })
      .meta('llmPreCallTimestamp', Date.now() - 100)
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.ok(result.data.llmLatencyMs >= 100);
    assert.equal(result.data.llmTokens, 15);
  });

  it('error hook records error info', () => {
    const hook = createLLMErrorHook();
    const ctx = ContextBuilder.create('llm:error')
      .withData({
        provider: 'anthropic',
        model: 'claude-opus-4-6',
        operation: 'complete',
        error: { name: 'RateLimitError', message: 'Too many requests', retryable: true },
      })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.equal(result.data.llmErrorType, 'RateLimitError');
    assert.equal(result.data.llmErrorRetryable, true);
  });

  it('retry hook tracks retry count', () => {
    const hook = createRetryHook(3);
    const ctx = ContextBuilder.create('llm:retry')
      .meta('llmRetryCount', 1)
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.equal(result.data.llmRetryCount, 2);
    assert.equal(result.data.llmRetryExhausted, false);
  });

  it('retry hook exhausts after max retries', () => {
    const hook = createRetryHook(2);
    const ctx = ContextBuilder.create('llm:retry')
      .meta('llmRetryCount', 2)
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.equal(result.abort, true);
    assert.equal(result.data.llmRetryExhausted, true);
  });

  it('cache hit hook records hit', () => {
    const hook = createCacheHitHook();
    const ctx = ContextBuilder.create('llm:cache-hit')
      .withData({ provider: 'google', model: 'gemini-2.5', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.equal(result.data.llmCacheHit, true);
  });

  it('cache miss hook records miss', () => {
    const hook = createCacheMissHook();
    const ctx = ContextBuilder.create('llm:cache-miss')
      .withData({ provider: 'google', model: 'gemini-2.5', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.equal(result.data.llmCacheHit, false);
  });

  it('stream chunk hook increments index', () => {
    const hook = createStreamChunkHook();
    const ctx = ContextBuilder.create('llm:stream-chunk')
      .withData({ provider: 'anthropic', model: 'claude-opus-4-6', operation: 'stream' })
      .meta('llmStreamChunkIndex', 4)
      .build();
    const result = hook(ctx);
    assert.equal(result.data.llmStreamChunkIndex, 5);
  });
});

describe('Memory Hooks', () => {
  it('pre-store validates namespace and key', () => {
    const hook = createPreStoreHook();
    const ctx = ContextBuilder.create('memory:pre-store')
      .withData({ namespace: '', key: '', operation: 'store' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.ok(result.abort);
  });

  it('pre-store succeeds with valid data', () => {
    const hook = createPreStoreHook();
    const ctx = ContextBuilder.create('memory:pre-store')
      .withData({ namespace: 'lore', key: 'canon', value: {}, operation: 'store' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
  });

  it('post-store records latency', () => {
    const hook = createPostStoreHook();
    const ctx = ContextBuilder.create('memory:post-store')
      .withData({ namespace: 'lore', key: 'canon', operation: 'store' })
      .meta('memoryPreStoreTimestamp', Date.now() - 50)
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.ok(result.data.memoryStoreLatencyMs >= 50);
  });

  it('pre-retrieve applies access check', () => {
    const hook = createPreRetrieveHook((ns) => ns !== 'secret');
    const ctx = ContextBuilder.create('memory:pre-retrieve')
      .withData({ namespace: 'secret', key: 'key', operation: 'retrieve' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.ok(result.error.includes('Access denied'));
  });

  it('post-retrieve records found status', () => {
    const hook = createPostRetrieveHook();
    const ctx = ContextBuilder.create('memory:post-retrieve')
      .withData({ namespace: 'lore', key: 'canon', operation: 'retrieve', retrieved: { data: true } })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.memoryRetrieveFound, true);
  });

  it('sync hook records source and target', () => {
    const hook = createSyncHook();
    const ctx = ContextBuilder.create('memory:sync')
      .withData({ namespace: 'lore', key: 'all', operation: 'sync', source: 'local', target: 'remote' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.memorySyncSource, 'local');
    assert.equal(result.data.memorySyncTarget, 'remote');
  });

  it('evict hook records reason', () => {
    const hook = createEvictHook();
    const ctx = ContextBuilder.create('memory:evict')
      .withData({ namespace: 'cache', key: 'old', operation: 'evict' })
      .meta('evictReason', 'lru-pressure')
      .build();
    const result = hook(ctx);
    assert.equal(result.data.memoryEvictReason, 'lru-pressure');
  });
});

describe('Neural Hooks', () => {
  it('pattern-detected filters by confidence', () => {
    const hook = createPatternDetectedHook(0.7);
    const ctx = ContextBuilder.create('neural:pattern-detected')
      .withData({ domain: 'code', confidence: 0.3 })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.neuralPatternAccepted, false);
  });

  it('pattern-detected accepts high confidence', () => {
    const hook = createPatternDetectedHook(0.5);
    const ctx = ContextBuilder.create('neural:pattern-detected')
      .withData({ domain: 'architecture', confidence: 0.9 })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.neuralPatternAccepted, true);
    assert.equal(result.data.neuralPatternDomain, 'architecture');
  });

  it('pattern-learned records pattern info', () => {
    const hook = createPatternLearnedHook();
    const ctx = ContextBuilder.create('neural:pattern-learned')
      .withData({ domain: 'testing', quality: 0.8, patternId: 'pat-1' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.neuralPatternId, 'pat-1');
    assert.equal(result.data.neuralPatternQuality, 0.8);
  });

  it('training-start records timestamp', () => {
    const hook = createTrainingStartHook();
    const ctx = ContextBuilder.create('neural:training-start')
      .withData({ domain: 'security' })
      .build();
    const result = hook(ctx);
    assert.ok(result.data.neuralTrainingStarted);
    assert.equal(result.data.neuralTrainingDomain, 'security');
  });

  it('training-complete calculates duration', () => {
    const hook = createTrainingCompleteHook();
    const ctx = ContextBuilder.create('neural:training-complete')
      .withData({ domain: 'code' })
      .meta('neuralTrainingStarted', Date.now() - 200)
      .build();
    const result = hook(ctx);
    assert.ok(result.data.neuralTrainingDurationMs >= 200);
  });

  it('adaptation records type', () => {
    const hook = createAdaptationHook();
    const ctx = ContextBuilder.create('neural:adaptation')
      .withData({ domain: 'performance', adaptationType: 'reinforcement' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.neuralAdaptationType, 'reinforcement');
  });

  it('consolidation records count', () => {
    const hook = createConsolidationHook();
    const ctx = ContextBuilder.create('neural:consolidation')
      .withData({ domain: 'general' })
      .meta('neuralConsolidationCount', 5)
      .build();
    const result = hook(ctx);
    assert.equal(result.data.neuralConsolidationCount, 5);
  });
});

describe('Performance Hooks', () => {
  it('metric-recorded records value', () => {
    const hook = createMetricRecordedHook();
    const ctx = ContextBuilder.create('perf:metric-recorded')
      .withData({ metricName: 'response_time', value: 42, unit: 'ms' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfMetricName, 'response_time');
    assert.equal(result.data.perfMetricValue, 42);
    assert.equal(result.data.perfMetricUnit, 'ms');
  });

  it('threshold-exceeded detects exceeding', () => {
    const hook = createThresholdExceededHook();
    const ctx = ContextBuilder.create('perf:threshold-exceeded')
      .withData({ metricName: 'latency', value: 500, threshold: 200 })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfThresholdExceeded, true);
    assert.equal(result.data.perfExceededBy, 300);
    assert.ok(result.warnings.length > 0);
  });

  it('threshold-exceeded passes when within limit', () => {
    const hook = createThresholdExceededHook();
    const ctx = ContextBuilder.create('perf:threshold-exceeded')
      .withData({ metricName: 'latency', value: 100, threshold: 200 })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfThresholdExceeded, false);
  });

  it('bottleneck-detected records component', () => {
    const hook = createBottleneckDetectedHook();
    const ctx = ContextBuilder.create('perf:bottleneck-detected')
      .withData({ metricName: 'cpu', value: 95, component: 'inference-engine' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfBottleneckComponent, 'inference-engine');
    assert.ok(result.warnings.length > 0);
  });

  it('optimization-applied records info', () => {
    const hook = createOptimizationAppliedHook();
    const ctx = ContextBuilder.create('perf:optimization-applied')
      .withData({ metricName: 'memory', value: 0, optimization: 'cache-prune', component: 'memory-store' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfOptimization, 'cache-prune');
    assert.equal(result.data.perfOptimizedComponent, 'memory-store');
  });

  it('health-check records status', () => {
    const hook = createHealthCheckHook();
    const ctx = ContextBuilder.create('perf:health-check')
      .withData({ metricName: 'health', value: 0, component: 'database', healthStatus: 'critical' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.perfHealthStatus, 'critical');
    assert.ok(result.warnings.length > 0);
  });
});

describe('Workflow Hooks', () => {
  it('start validates workflowId', () => {
    const hook = createStartHook();
    const ctx = ContextBuilder.create('workflow:start')
      .withData({ workflowId: '' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, false);
    assert.ok(result.abort);
  });

  it('start succeeds with valid payload', () => {
    const hook = createStartHook();
    const ctx = ContextBuilder.create('workflow:start')
      .withData({ workflowId: 'wf-1', workflowName: 'Test Workflow' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    assert.equal(result.data.workflowId, 'wf-1');
    assert.equal(result.data.workflowName, 'Test Workflow');
  });

  it('step tracks progress', () => {
    const hook = createStepHook();
    const ctx = ContextBuilder.create('workflow:step')
      .withData({ workflowId: 'wf-1', stepName: 'validate', stepIndex: 2, totalSteps: 5 })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.workflowCurrentStep, 'validate');
    assert.equal(result.data.workflowStepIndex, 2);
    assert.equal(result.data.workflowProgress, 60); // (2+1)/5 * 100
  });

  it('decision records options and selection', () => {
    const hook = createDecisionHook();
    const ctx = ContextBuilder.create('workflow:decision')
      .withData({
        workflowId: 'wf-1',
        decision: { options: ['a', 'b', 'c'], selected: 'b', reason: 'best fit' },
      })
      .build();
    const result = hook(ctx);
    assert.deepEqual(result.data.workflowDecisionOptions, ['a', 'b', 'c']);
    assert.equal(result.data.workflowDecisionSelected, 'b');
    assert.equal(result.data.workflowDecisionReason, 'best fit');
  });

  it('complete calculates duration', () => {
    const hook = createCompleteHook();
    const ctx = ContextBuilder.create('workflow:complete')
      .withData({ workflowId: 'wf-1', result: { status: 'done' } })
      .meta('workflowStartedAt', Date.now() - 500)
      .build();
    const result = hook(ctx);
    assert.ok(result.data.workflowDurationMs >= 500);
    assert.deepEqual(result.data.workflowResult, { status: 'done' });
  });

  it('error records error info', () => {
    const hook = createWorkflowErrorHook();
    const ctx = ContextBuilder.create('workflow:error')
      .withData({
        workflowId: 'wf-1',
        error: { name: 'ValidationError', message: 'Invalid input' },
      })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.workflowErrorName, 'ValidationError');
    assert.ok(result.warnings.length > 0);
  });

  it('rollback records step', () => {
    const hook = createRollbackHook();
    const ctx = ContextBuilder.create('workflow:rollback')
      .withData({ workflowId: 'wf-1', stepName: 'deploy' })
      .build();
    const result = hook(ctx);
    assert.equal(result.data.workflowRollbackStep, 'deploy');
    assert.ok(result.warnings.length > 0);
  });
});


// ====================================================================
// 6. EVENT EMISSION
// ====================================================================

describe('Event Emission', () => {
  it('emits hook:registered on registration', () => {
    const manager = new HookManager();
    let emitted = null;

    manager.on('hook:registered', (e) => { emitted = e; });

    const id = manager.register('llm:pre-call', () => ({ success: true }), {
      name: 'emit-test',
    });

    assert.ok(emitted);
    assert.equal(emitted.id, id);
    assert.equal(emitted.event, 'llm:pre-call');
    assert.equal(emitted.name, 'emit-test');
  });

  it('emits hook:unregistered on removal', () => {
    const manager = new HookManager();
    let emitted = null;

    const id = manager.register('llm:pre-call', () => ({ success: true }), { name: 'remove-test' });
    manager.on('hook:unregistered', (e) => { emitted = e; });
    manager.unregister(id);

    assert.ok(emitted);
    assert.equal(emitted.id, id);
  });

  it('emits hook:executed on successful execution', async () => {
    const manager = new HookManager();
    let emitted = null;

    manager.on('hook:executed', (e) => { emitted = e; });
    manager.register('llm:pre-call', () => ({ success: true }), { name: 'exec-test' });

    const ctx = ContextBuilder.create('llm:pre-call').build();
    await manager.execute(ctx);

    assert.ok(emitted);
    assert.equal(emitted.result.success, true);
    assert.ok(emitted.duration >= 0);
  });

  it('emits hook:failed on error', async () => {
    const manager = new HookManager();
    let emitted = null;

    manager.on('hook:failed', (e) => { emitted = e; });
    manager.register('llm:error', () => { throw new Error('test-error'); }, { name: 'fail-test' });

    const ctx = ContextBuilder.create('llm:error').build();
    await manager.execute(ctx);

    assert.ok(emitted);
    assert.equal(emitted.error, 'test-error');
  });

  it('emits pipeline:start and pipeline:complete', async () => {
    const manager = new HookManager();
    let startEvent = null;
    let completeEvent = null;

    manager.on('pipeline:start', (e) => { startEvent = e; });
    manager.on('pipeline:complete', (e) => { completeEvent = e; });

    const id = manager.register('workflow:start', () => ({ success: true }), { name: 'pipe-hook' });
    manager.registerPipeline({
      id: 'event-pipe',
      name: 'Event Pipeline',
      stages: [{ name: 'stage1', hookIds: [id] }],
      errorStrategy: 'continue',
    });

    const ctx = ContextBuilder.create('workflow:start').build();
    await manager.executePipeline('event-pipe', ctx);

    assert.ok(startEvent);
    assert.equal(startEvent.pipelineId, 'event-pipe');
    assert.equal(startEvent.stages, 1);

    assert.ok(completeEvent);
    assert.equal(completeEvent.pipelineId, 'event-pipe');
    assert.equal(completeEvent.success, true);
  });
});


// ====================================================================
// 7. EDGE CASES
// ====================================================================

describe('Edge Cases', () => {
  it('handles empty event hooks gracefully', async () => {
    const manager = new HookManager();
    const ctx = ContextBuilder.create('llm:pre-call').build();
    const results = await manager.execute(ctx);
    assert.deepEqual(results, []);
  });

  it('handles hook returning no payload data', () => {
    const hook = createPreCallHook();
    const ctx = ContextBuilder.create('llm:pre-call').build();
    // No data set on context
    const result = hook(ctx);
    assert.equal(result.success, false);
  });

  it('handles missing optional fields in payloads', () => {
    const hook = createPostCallHook();
    const ctx = ContextBuilder.create('llm:post-call')
      .withData({ provider: 'test', model: 'test', operation: 'complete' })
      .build();
    const result = hook(ctx);
    assert.equal(result.success, true);
    // latency should be undefined since no pre-call timestamp
    assert.equal(result.data.llmLatencyMs, undefined);
  });

  it('multiple managers are independent', async () => {
    const m1 = new HookManager();
    const m2 = new HookManager();

    m1.register('llm:pre-call', () => ({ success: true }), { name: 'hook-m1' });
    m2.register('workflow:start', () => ({ success: true }), { name: 'hook-m2' });

    assert.equal(m1.getStats().totalHooks, 1);
    assert.equal(m2.getStats().totalHooks, 1);

    const ctx1 = ContextBuilder.create('llm:pre-call').build();
    const r1 = await m1.execute(ctx1);
    assert.equal(r1.length, 1);

    const ctx2 = ContextBuilder.create('llm:pre-call').build();
    const r2 = await m2.execute(ctx2);
    assert.equal(r2.length, 0);
  });

  it('large number of hooks executes correctly', async () => {
    const manager = new HookManager();
    for (let i = 0; i < 100; i++) {
      manager.register('llm:pre-call', () => ({
        success: true,
        data: { hookIndex: i },
      }), { name: `hook-${i}` });
    }

    const ctx = ContextBuilder.create('llm:pre-call').build();
    const results = await manager.execute(ctx);
    assert.equal(results.length, 100);
    assert.ok(results.every(r => r.success));
  });

  it('ContextBuilder generates unique execution IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      const ctx = ContextBuilder.create('llm:pre-call').build();
      ids.add(ctx.executionId);
    }
    assert.equal(ids.size, 50);
  });

  it('hooks with callbacks receive correct arguments', () => {
    const log = [];
    const hook = createPreCallHook((payload) => {
      log.push({ provider: payload.provider, model: payload.model });
      return { valid: true };
    });

    const ctx = ContextBuilder.create('llm:pre-call')
      .withData({ provider: 'anthropic', model: 'claude-opus-4-6', operation: 'complete' })
      .build();
    hook(ctx);

    assert.equal(log.length, 1);
    assert.equal(log[0].provider, 'anthropic');
    assert.equal(log[0].model, 'claude-opus-4-6');
  });

  it('pipeline with parallel stages executes all hooks', async () => {
    const manager = new HookManager();
    const order = [];

    const id1 = manager.register('workflow:start', async () => {
      await new Promise(r => setTimeout(r, 10));
      order.push('a');
      return { success: true };
    }, { name: 'parallel-a' });

    const id2 = manager.register('workflow:start', async () => {
      await new Promise(r => setTimeout(r, 5));
      order.push('b');
      return { success: true };
    }, { name: 'parallel-b' });

    manager.registerPipeline({
      id: 'parallel-pipe',
      name: 'Parallel',
      stages: [{ name: 'parallel', hookIds: [id1, id2], parallel: true }],
      errorStrategy: 'continue',
    });

    const ctx = ContextBuilder.create('workflow:start').build();
    const result = await manager.executePipeline('parallel-pipe', ctx);

    assert.equal(result.hooksExecuted, 2);
    assert.equal(result.success, true);
    // Both should have run (order may vary due to parallel)
    assert.ok(order.includes('a'));
    assert.ok(order.includes('b'));
  });

  it('HookMatcher handles unknown pattern type gracefully', () => {
    const matcher = new HookMatcher();
    const result = matcher.matchPattern('test', { type: 'unknown', pattern: 'test' });
    assert.equal(result, false);
  });
});
