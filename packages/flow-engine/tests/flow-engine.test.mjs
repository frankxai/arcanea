import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { FlowEngine } from '../dist/index.js';

describe('FlowEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new FlowEngine();
  });

  describe('basic execution', () => {
    it('should execute a simple linear flow', async () => {
      const log = [];

      engine.registerFlow({
        id: 'simple',
        name: 'Simple Flow',
        steps: [
          {
            id: 'step1',
            name: 'First',
            type: 'task',
            execute: async (ctx) => {
              log.push('step1');
              ctx.data.value = 1;
              return 'done-1';
            },
          },
          {
            id: 'step2',
            name: 'Second',
            type: 'task',
            dependsOn: ['step1'],
            execute: async (ctx) => {
              log.push('step2');
              ctx.data.value += 1;
              return 'done-2';
            },
          },
        ],
      });

      const run = await engine.execute('simple');

      assert.equal(run.status, 'completed');
      assert.deepEqual(log, ['step1', 'step2']);
      assert.equal(run.data.value, 2);
    });

    it('should pass initial data', async () => {
      engine.registerFlow({
        id: 'with-data',
        name: 'With Data',
        steps: [
          {
            id: 'check',
            name: 'Check',
            type: 'task',
            execute: async (ctx) => ctx.data.input,
          },
        ],
      });

      const run = await engine.execute('with-data', { input: 'hello' });
      assert.equal(run.stepRecords.check.result, 'hello');
    });
  });

  describe('conditional branching', () => {
    it('should take the correct branch', async () => {
      const log = [];

      engine.registerFlow({
        id: 'branching',
        name: 'Branching Flow',
        steps: [
          {
            id: 'decide',
            name: 'Decision',
            type: 'condition',
            condition: async (ctx) => ctx.data.path,
            branches: {
              a: ['do-a'],
              b: ['do-b'],
            },
          },
          {
            id: 'do-a',
            name: 'Path A',
            type: 'task',
            execute: async () => { log.push('A'); },
          },
          {
            id: 'do-b',
            name: 'Path B',
            type: 'task',
            execute: async () => { log.push('B'); },
          },
        ],
      });

      const run = await engine.execute('branching', { path: 'b' });
      assert.equal(run.status, 'completed');
      assert.deepEqual(log, ['B']);
    });
  });

  describe('parallel execution', () => {
    it('should execute steps in parallel', async () => {
      const log = [];

      engine.registerFlow({
        id: 'parallel',
        name: 'Parallel Flow',
        steps: [
          {
            id: 'fork',
            name: 'Fork',
            type: 'parallel',
            parallel: ['task-a', 'task-b'],
          },
          {
            id: 'task-a',
            name: 'Task A',
            type: 'task',
            execute: async () => { log.push('A'); return 'A'; },
          },
          {
            id: 'task-b',
            name: 'Task B',
            type: 'task',
            execute: async () => { log.push('B'); return 'B'; },
          },
        ],
      });

      const run = await engine.execute('parallel');
      assert.equal(run.status, 'completed');
      assert.ok(log.includes('A'));
      assert.ok(log.includes('B'));
    });
  });

  describe('loop execution', () => {
    it('should iterate over items', async () => {
      const results = [];

      engine.registerFlow({
        id: 'loopy',
        name: 'Loop Flow',
        steps: [
          {
            id: 'loop',
            name: 'Iterate',
            type: 'loop',
            loop: {
              itemsKey: 'items',
              body: ['process'],
              maxIterations: 10,
            },
          },
          {
            id: 'process',
            name: 'Process Item',
            type: 'task',
            execute: async (ctx) => {
              results.push(ctx.data.__loopItem);
            },
          },
        ],
      });

      const run = await engine.execute('loopy', { items: ['x', 'y', 'z'] });
      assert.equal(run.status, 'completed');
      assert.deepEqual(results, ['x', 'y', 'z']);
    });
  });

  describe('retry', () => {
    it('should retry failed steps', async () => {
      let attempts = 0;

      engine.registerFlow({
        id: 'retry-flow',
        name: 'Retry Flow',
        steps: [
          {
            id: 'flaky',
            name: 'Flaky Step',
            type: 'task',
            retry: { maxAttempts: 3, delayMs: 10 },
            execute: async () => {
              attempts++;
              if (attempts < 3) throw new Error('Not yet');
              return 'success';
            },
          },
        ],
      });

      const run = await engine.execute('retry-flow');
      assert.equal(run.status, 'completed');
      assert.equal(attempts, 3);
      assert.equal(run.stepRecords.flaky.result, 'success');
    });
  });

  describe('compensation (saga)', () => {
    it('should compensate completed steps on failure', async () => {
      const log = [];

      engine.registerFlow({
        id: 'saga',
        name: 'Saga Flow',
        enableCompensation: true,
        steps: [
          {
            id: 'step1',
            name: 'Step 1',
            type: 'task',
            execute: async () => { log.push('exec-1'); return 'ok'; },
            compensate: async () => { log.push('compensate-1'); },
          },
          {
            id: 'step2',
            name: 'Step 2',
            type: 'task',
            dependsOn: ['step1'],
            execute: async () => { log.push('exec-2'); throw new Error('Boom'); },
            compensate: async () => { log.push('compensate-2'); },
          },
        ],
      });

      const run = await engine.execute('saga');
      assert.equal(run.status, 'failed');
      assert.ok(log.includes('exec-1'));
      assert.ok(log.includes('exec-2'));
      assert.ok(log.includes('compensate-1'));
      // step2 failed, so it shouldn't be compensated (it was never completed)
      assert.ok(!log.includes('compensate-2'));
    });
  });

  describe('wait step', () => {
    it('should wait the specified duration', async () => {
      engine.registerFlow({
        id: 'wait-flow',
        name: 'Wait Flow',
        steps: [
          {
            id: 'pause',
            name: 'Pause',
            type: 'wait',
            waitMs: 50,
          },
        ],
      });

      const start = Date.now();
      const run = await engine.execute('wait-flow');
      const elapsed = Date.now() - start;

      assert.equal(run.status, 'completed');
      assert.ok(elapsed >= 40); // Allow some tolerance
    });
  });

  describe('snapshot / restore', () => {
    it('should create and restore a snapshot', async () => {
      engine.registerFlow({
        id: 'snap',
        name: 'Snapshot Flow',
        steps: [
          {
            id: 's1',
            name: 'S1',
            type: 'task',
            execute: async (ctx) => { ctx.data.done = true; },
          },
        ],
      });

      const run = await engine.execute('snap');
      const snapshot = engine.snapshot(run.runId);

      assert.ok(snapshot);
      assert.equal(snapshot.run.flowId, 'snap');
      assert.ok(snapshot.run.data.done);

      // Restore into a new engine
      const engine2 = new FlowEngine();
      const restored = engine2.restore(snapshot);
      assert.equal(restored.flowId, 'snap');
      assert.ok(restored.data.done);
    });
  });

  describe('trace', () => {
    it('should record trace entries', async () => {
      engine.registerFlow({
        id: 'traced',
        name: 'Traced Flow',
        steps: [
          {
            id: 'log-step',
            name: 'Logger',
            type: 'task',
            execute: async (ctx) => {
              ctx.log('Hello from step');
              return 'logged';
            },
          },
        ],
      });

      const run = await engine.execute('traced');
      assert.ok(run.trace.some(t => t.message === 'Hello from step'));
    });
  });

  describe('stats', () => {
    it('should track engine statistics', async () => {
      engine.registerFlow({
        id: 'stat-flow',
        name: 'Stat Flow',
        steps: [
          { id: 's1', name: 'S1', type: 'task', execute: async () => 'ok' },
        ],
      });

      await engine.execute('stat-flow');
      await engine.execute('stat-flow');

      const stats = engine.getStats();
      assert.equal(stats.totalFlows, 1);
      assert.equal(stats.completedRuns, 2);
      assert.equal(stats.failedRuns, 0);
    });
  });

  describe('subflow', () => {
    it('should execute a nested subflow', async () => {
      const log = [];

      engine.registerFlow({
        id: 'child',
        name: 'Child Flow',
        steps: [
          {
            id: 'child-step',
            name: 'Child Step',
            type: 'task',
            execute: async (ctx) => {
              log.push('child');
              ctx.data.childResult = 'from-child';
            },
          },
        ],
      });

      engine.registerFlow({
        id: 'parent',
        name: 'Parent Flow',
        steps: [
          {
            id: 'before',
            name: 'Before',
            type: 'task',
            execute: async () => { log.push('before'); },
          },
          {
            id: 'run-child',
            name: 'Run Child',
            type: 'subflow',
            subflowId: 'child',
            dependsOn: ['before'],
          },
          {
            id: 'after',
            name: 'After',
            type: 'task',
            dependsOn: ['run-child'],
            execute: async () => { log.push('after'); },
          },
        ],
      });

      const run = await engine.execute('parent');
      assert.equal(run.status, 'completed');
      assert.deepEqual(log, ['before', 'child', 'after']);
    });
  });
});
