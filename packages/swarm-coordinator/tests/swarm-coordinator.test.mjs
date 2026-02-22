/**
 * @arcanea/swarm-coordinator — Comprehensive Tests
 *
 * Tests for Agent, Task, SwarmCoordinator, and WorkflowEngine.
 * Covers: exports, lifecycle, load balancing, topology, consensus,
 * dependency resolution, workflow execution, pause/resume, rollback,
 * distributed workflows, metrics, and edge cases.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// ============================================================================
// 1. Module Exports
// ============================================================================

describe('Module Exports', () => {
  it('exports Agent class', async () => {
    const mod = await import('../dist/index.js');
    assert.equal(typeof mod.Agent, 'function');
  });

  it('exports Task class', async () => {
    const mod = await import('../dist/index.js');
    assert.equal(typeof mod.Task, 'function');
  });

  it('exports SwarmCoordinator class', async () => {
    const mod = await import('../dist/index.js');
    assert.equal(typeof mod.SwarmCoordinator, 'function');
  });

  it('exports WorkflowEngine class', async () => {
    const mod = await import('../dist/index.js');
    assert.equal(typeof mod.WorkflowEngine, 'function');
  });
});

// ============================================================================
// 2. Agent Domain Entity
// ============================================================================

describe('Agent', () => {
  let Agent;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    Agent = mod.Agent;
  });

  describe('Construction', () => {
    it('creates with required fields', () => {
      const agent = new Agent({ id: 'a1', type: 'coder' });
      assert.equal(agent.id, 'a1');
      assert.equal(agent.type, 'coder');
      assert.equal(agent.status, 'active');
      assert.deepEqual(agent.capabilities, []);
    });

    it('creates with capabilities and role', () => {
      const agent = new Agent({
        id: 'a2', type: 'coordinator',
        capabilities: ['coordinate', 'manage'],
        role: 'leader',
      });
      assert.deepEqual(agent.capabilities, ['coordinate', 'manage']);
      assert.equal(agent.role, 'leader');
    });

    it('sets createdAt and lastActive timestamps', () => {
      const before = Date.now();
      const agent = new Agent({ id: 'a3', type: 'tester' });
      const after = Date.now();
      assert.ok(agent.createdAt >= before && agent.createdAt <= after);
      assert.ok(agent.lastActive >= before && agent.lastActive <= after);
    });

    it('creates with parent reference', () => {
      const agent = new Agent({ id: 'w1', type: 'coder', parent: 'leader-1' });
      assert.equal(agent.parent, 'leader-1');
    });

    it('creates with metadata', () => {
      const agent = new Agent({ id: 'm1', type: 'coder', metadata: { version: 2 } });
      assert.deepEqual(agent.metadata, { version: 2 });
    });
  });

  describe('Capabilities', () => {
    it('hasCapability returns true for matching capability', () => {
      const agent = new Agent({ id: 'c1', type: 'coder', capabilities: ['code', 'debug'] });
      assert.equal(agent.hasCapability('code'), true);
      assert.equal(agent.hasCapability('debug'), true);
    });

    it('hasCapability returns false for missing capability', () => {
      const agent = new Agent({ id: 'c2', type: 'coder', capabilities: ['code'] });
      assert.equal(agent.hasCapability('deploy'), false);
    });

    it('canExecute maps task type to capability', () => {
      const agent = new Agent({ id: 'c3', type: 'coder', capabilities: ['code'] });
      assert.equal(agent.canExecute('code'), true);
      assert.equal(agent.canExecute('test'), false);
    });

    it('canExecute returns true for unknown task types', () => {
      const agent = new Agent({ id: 'c4', type: 'coder', capabilities: [] });
      assert.equal(agent.canExecute('unknown-type'), true);
    });
  });

  describe('Lifecycle', () => {
    it('starts as active', () => {
      const agent = new Agent({ id: 'l1', type: 'coder' });
      assert.equal(agent.status, 'active');
    });

    it('setIdle transitions active to idle', () => {
      const agent = new Agent({ id: 'l2', type: 'coder' });
      agent.setIdle();
      assert.equal(agent.status, 'idle');
    });

    it('activate transitions idle back to active', () => {
      const agent = new Agent({ id: 'l3', type: 'coder' });
      agent.setIdle();
      agent.activate();
      assert.equal(agent.status, 'active');
    });

    it('terminate sets status to terminated', () => {
      const agent = new Agent({ id: 'l4', type: 'coder' });
      agent.terminate();
      assert.equal(agent.status, 'terminated');
    });

    it('activate does not revive terminated agent', () => {
      const agent = new Agent({ id: 'l5', type: 'coder' });
      agent.terminate();
      agent.activate();
      assert.equal(agent.status, 'terminated');
    });

    it('setIdle does not change terminated agent', () => {
      const agent = new Agent({ id: 'l6', type: 'coder' });
      agent.terminate();
      agent.setIdle();
      assert.equal(agent.status, 'terminated');
    });
  });

  describe('Task Execution', () => {
    it('executes task successfully', async () => {
      const agent = new Agent({ id: 'e1', type: 'coder', capabilities: ['code'] });
      const result = await agent.executeTask({
        id: 't1', type: 'code', description: 'Write code', priority: 'high',
      });
      assert.equal(result.status, 'completed');
      assert.equal(result.agentId, 'e1');
      assert.ok(result.duration >= 0);
    });

    it('calls onExecute callback', async () => {
      const agent = new Agent({ id: 'e2', type: 'coder' });
      let called = false;
      await agent.executeTask({
        id: 't2', type: 'code', description: 'Test', priority: 'high',
        onExecute: () => { called = true; },
      });
      assert.equal(called, true);
    });

    it('returns failed when agent is terminated', async () => {
      const agent = new Agent({ id: 'e3', type: 'coder' });
      agent.terminate();
      const result = await agent.executeTask({
        id: 't3', type: 'code', description: 'Test', priority: 'high',
      });
      assert.equal(result.status, 'failed');
      assert.ok(result.error.includes('not available'));
    });

    it('catches errors from onExecute', async () => {
      const agent = new Agent({ id: 'e4', type: 'coder' });
      const result = await agent.executeTask({
        id: 't4', type: 'code', description: 'Fail', priority: 'high',
        onExecute: () => { throw new Error('boom'); },
      });
      assert.equal(result.status, 'failed');
      assert.equal(result.error, 'boom');
    });

    it('returns to active status after execution', async () => {
      const agent = new Agent({ id: 'e5', type: 'coder' });
      await agent.executeTask({
        id: 't5', type: 'code', description: 'Test', priority: 'high',
      });
      assert.equal(agent.status, 'active');
    });

    it('returns to active status after failed execution', async () => {
      const agent = new Agent({ id: 'e6', type: 'coder' });
      await agent.executeTask({
        id: 't6', type: 'code', description: 'Fail', priority: 'high',
        onExecute: () => { throw new Error('fail'); },
      });
      assert.equal(agent.status, 'active');
    });
  });

  describe('Serialization', () => {
    it('toJSON produces plain object', () => {
      const agent = new Agent({
        id: 's1', type: 'coder', capabilities: ['code'], role: 'worker', parent: 'leader',
      });
      const json = agent.toJSON();
      assert.equal(json.id, 's1');
      assert.equal(json.type, 'coder');
      assert.equal(json.role, 'worker');
      assert.equal(json.parent, 'leader');
      assert.deepEqual(json.capabilities, ['code']);
    });

    it('fromConfig factory produces equivalent agent', () => {
      const agent = Agent.fromConfig({ id: 'f1', type: 'tester', capabilities: ['test'] });
      assert.equal(agent.id, 'f1');
      assert.equal(agent.type, 'tester');
    });
  });
});

// ============================================================================
// 3. Task Domain Entity
// ============================================================================

describe('Task', () => {
  let Task;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    Task = mod.Task;
  });

  describe('Construction', () => {
    it('creates with required fields', () => {
      const task = new Task({ id: 't1', type: 'code', description: 'Build feature', priority: 'high' });
      assert.equal(task.id, 't1');
      assert.equal(task.type, 'code');
      assert.equal(task.priority, 'high');
      assert.equal(task.status, 'pending');
    });

    it('defaults status to pending', () => {
      const task = new Task({ id: 't2', type: 'test', description: 'Test', priority: 'low' });
      assert.equal(task.status, 'pending');
    });

    it('accepts explicit status', () => {
      const task = new Task({ id: 't3', type: 'test', description: 'Test', priority: 'low', status: 'in-progress' });
      assert.equal(task.status, 'in-progress');
    });

    it('defaults dependencies to empty array', () => {
      const task = new Task({ id: 't4', type: 'test', description: 'Test', priority: 'low' });
      assert.deepEqual(task.dependencies, []);
    });
  });

  describe('Lifecycle', () => {
    it('transitions pending → in-progress via start()', () => {
      const task = new Task({ id: 't1', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      assert.equal(task.status, 'in-progress');
    });

    it('transitions in-progress → completed via complete()', () => {
      const task = new Task({ id: 't2', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      task.complete();
      assert.equal(task.status, 'completed');
    });

    it('fail() sets status to failed', () => {
      const task = new Task({ id: 't3', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      task.fail('oops');
      assert.equal(task.status, 'failed');
      assert.equal(task.metadata.error, 'oops');
    });

    it('cancel() sets status to cancelled', () => {
      const task = new Task({ id: 't4', type: 'code', description: 'X', priority: 'medium' });
      task.cancel();
      assert.equal(task.status, 'cancelled');
    });

    it('cancel() does nothing to completed task', () => {
      const task = new Task({ id: 't5', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      task.complete();
      task.cancel();
      assert.equal(task.status, 'completed');
    });
  });

  describe('Duration', () => {
    it('returns undefined before start', () => {
      const task = new Task({ id: 'd1', type: 'code', description: 'X', priority: 'medium' });
      assert.equal(task.getDuration(), undefined);
    });

    it('returns elapsed time after start', () => {
      const task = new Task({ id: 'd2', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      const dur = task.getDuration();
      assert.ok(dur >= 0);
    });

    it('returns fixed duration after completion', () => {
      const task = new Task({ id: 'd3', type: 'code', description: 'X', priority: 'medium' });
      task.start();
      task.complete();
      const dur = task.getDuration();
      assert.ok(dur >= 0);
    });
  });

  describe('Dependencies', () => {
    it('areDependenciesResolved with no deps', () => {
      const task = new Task({ id: 'dep1', type: 'code', description: 'X', priority: 'high' });
      assert.equal(task.areDependenciesResolved(new Set()), true);
    });

    it('areDependenciesResolved false when dep missing', () => {
      const task = new Task({ id: 'dep2', type: 'code', description: 'X', priority: 'high', dependencies: ['dep1'] });
      assert.equal(task.areDependenciesResolved(new Set()), false);
    });

    it('areDependenciesResolved true when all deps met', () => {
      const task = new Task({ id: 'dep3', type: 'code', description: 'X', priority: 'high', dependencies: ['dep1', 'dep2'] });
      assert.equal(task.areDependenciesResolved(new Set(['dep1', 'dep2'])), true);
    });
  });

  describe('Priority', () => {
    it('high = 3, medium = 2, low = 1', () => {
      const high = new Task({ id: 'p1', type: 'code', description: 'X', priority: 'high' });
      const med = new Task({ id: 'p2', type: 'code', description: 'X', priority: 'medium' });
      const low = new Task({ id: 'p3', type: 'code', description: 'X', priority: 'low' });
      assert.equal(high.getPriorityValue(), 3);
      assert.equal(med.getPriorityValue(), 2);
      assert.equal(low.getPriorityValue(), 1);
    });

    it('sortByPriority orders high first', () => {
      const low = new Task({ id: 'low', type: 'code', description: 'X', priority: 'low' });
      const high = new Task({ id: 'high', type: 'code', description: 'X', priority: 'high' });
      const med = new Task({ id: 'med', type: 'code', description: 'X', priority: 'medium' });
      const sorted = Task.sortByPriority([low, high, med]);
      assert.equal(sorted[0].id, 'high');
      assert.equal(sorted[1].id, 'med');
      assert.equal(sorted[2].id, 'low');
    });
  });

  describe('Dependency Resolution', () => {
    it('resolves linear dependencies in order', () => {
      const t1 = new Task({ id: 't1', type: 'code', description: 'A', priority: 'high' });
      const t2 = new Task({ id: 't2', type: 'code', description: 'B', priority: 'high', dependencies: ['t1'] });
      const t3 = new Task({ id: 't3', type: 'code', description: 'C', priority: 'high', dependencies: ['t2'] });
      const order = Task.resolveExecutionOrder([t3, t1, t2]);
      assert.equal(order[0].id, 't1');
      assert.equal(order[1].id, 't2');
      assert.equal(order[2].id, 't3');
    });

    it('resolves independent tasks by priority', () => {
      const t1 = new Task({ id: 't1', type: 'code', description: 'A', priority: 'low' });
      const t2 = new Task({ id: 't2', type: 'code', description: 'B', priority: 'high' });
      const order = Task.resolveExecutionOrder([t1, t2]);
      assert.equal(order[0].id, 't2'); // high priority first
      assert.equal(order[1].id, 't1');
    });

    it('throws on circular dependency', () => {
      const t1 = new Task({ id: 'c1', type: 'code', description: 'X', priority: 'high', dependencies: ['c2'] });
      const t2 = new Task({ id: 'c2', type: 'code', description: 'Y', priority: 'high', dependencies: ['c1'] });
      assert.throws(
        () => Task.resolveExecutionOrder([t1, t2]),
        /Circular dependency/
      );
    });
  });

  describe('Workflow', () => {
    it('isWorkflow returns false for non-workflow tasks', () => {
      const task = new Task({ id: 'w1', type: 'code', description: 'X', priority: 'high' });
      assert.equal(task.isWorkflow(), false);
    });

    it('isWorkflow returns true with workflow definition', () => {
      const task = new Task({
        id: 'w2', type: 'workflow', description: 'Pipeline', priority: 'high',
        workflow: { id: 'wf1', name: 'Pipeline', tasks: [] },
      });
      assert.equal(task.isWorkflow(), true);
    });
  });

  describe('Assignment', () => {
    it('assignTo sets assignedTo', () => {
      const task = new Task({ id: 'a1', type: 'code', description: 'X', priority: 'high' });
      task.assignTo('agent-1');
      assert.equal(task.assignedTo, 'agent-1');
    });
  });

  describe('Serialization', () => {
    it('toJSON includes all fields', () => {
      const task = new Task({
        id: 'j1', type: 'code', description: 'Build it', priority: 'high',
        dependencies: ['dep1'], metadata: { tag: 'v1' },
      });
      const json = task.toJSON();
      assert.equal(json.id, 'j1');
      assert.equal(json.type, 'code');
      assert.equal(json.priority, 'high');
      assert.deepEqual(json.dependencies, ['dep1']);
      assert.equal(json.metadata.tag, 'v1');
    });
  });
});

// ============================================================================
// 4. SwarmCoordinator
// ============================================================================

describe('SwarmCoordinator', () => {
  let SwarmCoordinator;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    SwarmCoordinator = mod.SwarmCoordinator;
  });

  describe('Initialization', () => {
    it('creates with hierarchical topology', () => {
      const sc = new SwarmCoordinator({ topology: 'hierarchical' });
      assert.equal(sc.getTopology(), 'hierarchical');
    });

    it('creates with mesh topology', () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      assert.equal(sc.getTopology(), 'mesh');
    });

    it('initialize is idempotent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.initialize();
      await sc.initialize(); // no-op
    });
  });

  describe('Agent Spawning', () => {
    it('spawns and lists agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.initialize();
      await sc.spawnAgent({ id: 'a1', type: 'coder', capabilities: ['code'] });
      await sc.spawnAgent({ id: 'a2', type: 'tester', capabilities: ['test'] });
      const agents = await sc.listAgents();
      assert.equal(agents.length, 2);
    });

    it('getAgent returns spawned agent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      const agent = sc.getAgent('a1');
      assert.equal(agent.id, 'a1');
    });

    it('getAgent returns undefined for unknown', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      assert.equal(sc.getAgent('nope'), undefined);
    });

    it('terminates agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.terminateAgent('a1');
      const agents = await sc.listAgents();
      assert.equal(agents.length, 0);
    });

    it('terminateAgent is safe for unknown id', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.terminateAgent('nope'); // no-op
    });
  });

  describe('Task Distribution', () => {
    it('distributes tasks to suitable agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });
      await sc.spawnAgent({ id: 't1', type: 'tester', capabilities: ['test'] });

      const assignments = await sc.distributeTasks([
        { id: 'task-code', type: 'code', description: 'Code', priority: 'high' },
        { id: 'task-test', type: 'test', description: 'Test', priority: 'medium' },
      ]);

      assert.equal(assignments.length, 2);
      const codeAssignment = assignments.find(a => a.taskId === 'task-code');
      const testAssignment = assignments.find(a => a.taskId === 'task-test');
      assert.equal(codeAssignment.agentId, 'c1');
      assert.equal(testAssignment.agentId, 't1');
    });

    it('load-balances across same-type agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });
      await sc.spawnAgent({ id: 'c2', type: 'coder', capabilities: ['code'] });

      const assignments = await sc.distributeTasks([
        { id: 't1', type: 'code', description: 'A', priority: 'high' },
        { id: 't2', type: 'code', description: 'B', priority: 'high' },
      ]);

      const agents = assignments.map(a => a.agentId);
      // Both agents should get one task each
      assert.ok(agents.includes('c1'));
      assert.ok(agents.includes('c2'));
    });

    it('skips tasks with no suitable agent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

      const assignments = await sc.distributeTasks([
        { id: 't1', type: 'deploy', description: 'Deploy', priority: 'high' },
      ]);

      assert.equal(assignments.length, 0);
    });

    it('sorts tasks by priority before distribution', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

      const assignments = await sc.distributeTasks([
        { id: 'low', type: 'code', description: 'Low', priority: 'low' },
        { id: 'high', type: 'code', description: 'High', priority: 'high' },
      ]);

      assert.equal(assignments[0].taskId, 'high');
      assert.equal(assignments[1].taskId, 'low');
    });
  });

  describe('Task Execution', () => {
    it('executes task on specified agent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

      const result = await sc.executeTask('c1', {
        id: 't1', type: 'code', description: 'Build', priority: 'high',
      });

      assert.equal(result.status, 'completed');
      assert.equal(result.agentId, 'c1');
    });

    it('returns failure for unknown agent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      const result = await sc.executeTask('nonexistent', {
        id: 't1', type: 'code', description: 'Build', priority: 'high',
      });
      assert.equal(result.status, 'failed');
      assert.ok(result.error.includes('not found'));
    });

    it('executeTasksConcurrently distributes and executes', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });
      await sc.spawnAgent({ id: 'c2', type: 'coder', capabilities: ['code'] });

      const results = await sc.executeTasksConcurrently([
        { id: 't1', type: 'code', description: 'A', priority: 'high' },
        { id: 't2', type: 'code', description: 'B', priority: 'medium' },
      ]);

      assert.equal(results.length, 2);
      assert.ok(results.every(r => r.status === 'completed'));
    });
  });

  describe('Metrics', () => {
    it('tracks task completion in metrics', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

      await sc.executeTask('c1', { id: 't1', type: 'code', description: 'A', priority: 'high' });
      await sc.executeTask('c1', { id: 't2', type: 'code', description: 'B', priority: 'high' });

      const metrics = await sc.getAgentMetrics('c1');
      assert.equal(metrics.tasksCompleted, 2);
      assert.equal(metrics.tasksFailed, 0);
      assert.equal(metrics.successRate, 1.0);
      assert.equal(metrics.health, 'healthy');
    });

    it('tracks task failures in metrics', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

      await sc.executeTask('c1', {
        id: 't1', type: 'code', description: 'Fail', priority: 'high',
        onExecute: () => { throw new Error('fail'); },
      });

      const metrics = await sc.getAgentMetrics('c1');
      assert.equal(metrics.tasksFailed, 1);
      assert.equal(metrics.successRate, 0);
    });

    it('returns default metrics for unknown agent', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      const metrics = await sc.getAgentMetrics('unknown');
      assert.equal(metrics.tasksCompleted, 0);
      assert.equal(metrics.health, 'unhealthy');
    });
  });

  describe('Topology', () => {
    it('mesh creates peer connections', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.spawnAgent({ id: 'a2', type: 'tester' });
      const connections = await sc.getMeshConnections();
      assert.ok(connections.length > 0);
      assert.ok(connections.some(c => c.type === 'peer'));
    });

    it('hierarchical creates leader connections', async () => {
      const sc = new SwarmCoordinator({ topology: 'hierarchical' });
      await sc.spawnAgent({ id: 'leader', type: 'coordinator', role: 'leader' });
      await sc.spawnAgent({ id: 'worker', type: 'coder' });
      const connections = await sc.getMeshConnections();
      assert.ok(connections.some(c => c.to === 'leader' && c.type === 'leader'));
    });

    it('getHierarchy returns leader and workers', async () => {
      const sc = new SwarmCoordinator({ topology: 'hierarchical' });
      await sc.spawnAgent({ id: 'leader', type: 'coordinator', role: 'leader' });
      await sc.spawnAgent({ id: 'w1', type: 'coder' });
      await sc.spawnAgent({ id: 'w2', type: 'tester' });

      const hierarchy = await sc.getHierarchy();
      assert.equal(hierarchy.leader, 'leader');
      assert.equal(hierarchy.workers.length, 2);
    });

    it('reconfigure changes topology', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.reconfigure({ topology: 'hierarchical' });
      assert.equal(sc.getTopology(), 'hierarchical');
    });
  });

  describe('Scaling', () => {
    it('scales up agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.scaleAgents({ type: 'coder', count: 3 });
      const agents = await sc.listAgents();
      assert.equal(agents.length, 3);
      assert.ok(agents.every(a => a.type === 'coder'));
    });

    it('scales down agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'c1', type: 'coder' });
      await sc.spawnAgent({ id: 'c2', type: 'coder' });
      await sc.spawnAgent({ id: 'c3', type: 'coder' });
      await sc.scaleAgents({ type: 'coder', count: -2 });
      const agents = await sc.listAgents();
      assert.equal(agents.length, 1);
    });
  });

  describe('Consensus', () => {
    it('reaches consensus with majority approving', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.spawnAgent({ id: 'a2', type: 'coder' });
      await sc.spawnAgent({ id: 'a3', type: 'coder' });

      // Run consensus many times — at least some should reach consensus
      let anyReached = false;
      for (let i = 0; i < 50; i++) {
        const result = await sc.reachConsensus(
          { id: 'd1', type: 'deploy', payload: { version: '2.0' } },
          ['a1', 'a2', 'a3']
        );
        if (result.consensusReached) {
          anyReached = true;
          assert.deepEqual(result.decision, { version: '2.0' });
          break;
        }
      }
      assert.ok(anyReached, 'Consensus should be reached at least once in 50 trials');
    });

    it('consensus returns votes from all participating agents', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.spawnAgent({ id: 'a2', type: 'coder' });

      const result = await sc.reachConsensus(
        { id: 'd1', type: 'test', payload: {} },
        ['a1', 'a2']
      );
      assert.equal(result.votes.length, 2);
    });
  });

  describe('Swarm State', () => {
    it('getSwarmState returns full state', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      const state = await sc.getSwarmState();
      assert.equal(state.topology, 'mesh');
      assert.equal(state.agents.length, 1);
      assert.equal(typeof state.activeConnections, 'number');
    });
  });

  describe('Messaging', () => {
    it('sendMessage emits on event bus', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      let received = null;
      sc.getEventBus().on('agent:message', (msg) => { received = msg; });

      await sc.sendMessage({
        from: 'a1', to: 'a2', type: 'ping', payload: { data: 'hello' },
      });
      assert.ok(received);
      assert.equal(received.from, 'a1');
      assert.equal(received.payload.data, 'hello');
    });
  });

  describe('Memory Backend Integration', () => {
    it('stores events when memoryBackend provided', async () => {
      const stored = [];
      const mockMemory = {
        store: async (mem) => { stored.push(mem); return mem; },
        retrieve: async () => undefined,
      };

      const sc = new SwarmCoordinator({ topology: 'mesh', memoryBackend: mockMemory });
      await sc.spawnAgent({ id: 'a1', type: 'coder', capabilities: ['code'] });
      await sc.executeTask('a1', { id: 't1', type: 'code', description: 'X', priority: 'high' });

      assert.ok(stored.length >= 2); // spawn event + task result
      assert.ok(stored.some(m => m.id.startsWith('agent-spawn')));
      assert.ok(stored.some(m => m.id.startsWith('task-result')));
    });
  });

  describe('Shutdown', () => {
    it('terminates all agents on shutdown', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      await sc.spawnAgent({ id: 'a1', type: 'coder' });
      await sc.spawnAgent({ id: 'a2', type: 'tester' });
      await sc.shutdown();
      const agents = await sc.listAgents();
      assert.equal(agents.length, 0);
    });
  });

  describe('Dependency Resolution', () => {
    it('resolves task dependencies via coordinator', async () => {
      const sc = new SwarmCoordinator({ topology: 'mesh' });
      const ordered = await sc.resolveTaskDependencies([
        { id: 't2', type: 'test', description: 'Test', priority: 'high', dependencies: ['t1'] },
        { id: 't1', type: 'code', description: 'Build', priority: 'high' },
      ]);
      assert.equal(ordered[0].id, 't1');
      assert.equal(ordered[1].id, 't2');
    });
  });
});

// ============================================================================
// 5. WorkflowEngine
// ============================================================================

describe('WorkflowEngine', () => {
  let SwarmCoordinator, WorkflowEngine;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    SwarmCoordinator = mod.SwarmCoordinator;
    WorkflowEngine = mod.WorkflowEngine;
  });

  async function createEngine() {
    const coordinator = new SwarmCoordinator({ topology: 'mesh' });
    await coordinator.initialize();
    await coordinator.spawnAgent({ id: 'coder', type: 'coder', capabilities: ['code', 'test', 'review'] });

    const engine = new WorkflowEngine({ coordinator });
    await engine.initialize();
    return { coordinator, engine };
  }

  describe('Initialization', () => {
    it('initializes and shuts down', async () => {
      const { engine } = await createEngine();
      await engine.shutdown();
    });

    it('initialize is idempotent', async () => {
      const { engine } = await createEngine();
      await engine.initialize();
      await engine.initialize();
    });
  });

  describe('Single Task Execution', () => {
    it('executes a task via coordinator', async () => {
      const { engine } = await createEngine();
      const result = await engine.executeTask(
        { id: 't1', type: 'code', description: 'Build', priority: 'high' },
        'coder'
      );
      assert.equal(result.status, 'completed');
    });
  });

  describe('Workflow Execution', () => {
    it('executes a simple workflow', async () => {
      const { engine } = await createEngine();
      const result = await engine.executeWorkflow({
        id: 'wf1',
        name: 'Simple Pipeline',
        tasks: [
          { id: 't1', type: 'code', description: 'Build', priority: 'high' },
          { id: 't2', type: 'test', description: 'Test', priority: 'medium' },
        ],
      });

      assert.equal(result.status, 'completed');
      assert.equal(result.tasksCompleted, 2);
      assert.equal(result.executionOrder.length, 2);
    });

    it('executes tasks in dependency order', async () => {
      const { engine } = await createEngine();
      const executionOrder = [];

      const result = await engine.executeWorkflow({
        id: 'wf2',
        name: 'Ordered Pipeline',
        tasks: [
          { id: 't2', type: 'test', description: 'Test', priority: 'high', dependencies: ['t1'] },
          { id: 't1', type: 'code', description: 'Build', priority: 'high' },
        ],
      });

      assert.equal(result.status, 'completed');
      assert.equal(result.executionOrder[0], 't1');
      assert.equal(result.executionOrder[1], 't2');
    });

    it('handles workflow with failing task', async () => {
      const { engine } = await createEngine();
      const result = await engine.executeWorkflow({
        id: 'wf3',
        name: 'Failing Pipeline',
        tasks: [
          { id: 't1', type: 'code', description: 'Build', priority: 'high' },
          {
            id: 't2', type: 'code', description: 'Fail', priority: 'high',
            onExecute: () => { throw new Error('deliberate failure'); },
          },
        ],
      });

      assert.equal(result.status, 'failed');
      assert.equal(result.errors.length, 1);
    });

    it('startWorkflow returns promise', async () => {
      const { engine } = await createEngine();
      const promise = engine.startWorkflow({
        id: 'wf4',
        name: 'Async Pipeline',
        tasks: [
          { id: 't1', type: 'code', description: 'Build', priority: 'high' },
        ],
      });
      assert.ok(promise instanceof Promise);
      const result = await promise;
      assert.equal(result.status, 'completed');
    });
  });

  describe('Rollback', () => {
    it('rolls back completed tasks on failure', async () => {
      const { engine } = await createEngine();
      const rolledBack = [];

      const result = await engine.executeWorkflow({
        id: 'wf-rb',
        name: 'Rollback Pipeline',
        rollbackOnFailure: true,
        tasks: [
          {
            id: 't1', type: 'code', description: 'Step 1', priority: 'high',
            onRollback: () => { rolledBack.push('t1'); },
          },
          {
            id: 't2', type: 'code', description: 'Step 2', priority: 'high',
            dependencies: ['t1'],
            onExecute: () => { throw new Error('fail at step 2'); },
          },
        ],
      });

      assert.equal(result.status, 'failed');
      assert.ok(rolledBack.includes('t1'));
    });
  });

  describe('Parallel Execution', () => {
    it('executes tasks in parallel', async () => {
      const { coordinator, engine } = await createEngine();
      await coordinator.spawnAgent({ id: 'coder2', type: 'coder', capabilities: ['code'] });

      const results = await engine.executeParallel([
        { id: 'p1', type: 'code', description: 'A', priority: 'high' },
        { id: 'p2', type: 'code', description: 'B', priority: 'high' },
      ]);

      assert.equal(results.length, 2);
      assert.ok(results.every(r => r.status === 'completed'));
    });
  });

  describe('Distributed Workflow', () => {
    it('distributes across multiple coordinators', async () => {
      const c1 = new SwarmCoordinator({ topology: 'mesh' });
      const c2 = new SwarmCoordinator({ topology: 'mesh' });
      await c1.spawnAgent({ id: 'a1', type: 'coder', capabilities: ['code'] });
      await c2.spawnAgent({ id: 'a2', type: 'coder', capabilities: ['code'] });

      const engine = new WorkflowEngine({ coordinator: c1 });

      const result = await engine.executeDistributedWorkflow(
        {
          id: 'dist-wf',
          name: 'Distributed',
          tasks: [
            { id: 't1', type: 'code', description: 'A', priority: 'high' },
            { id: 't2', type: 'code', description: 'B', priority: 'high' },
          ],
        },
        [c1, c2]
      );

      assert.equal(result.status, 'completed');
      assert.equal(result.tasksCompleted, 2);
    });
  });

  describe('Workflow State', () => {
    it('getWorkflowState returns current state', async () => {
      const { engine } = await createEngine();
      await engine.executeWorkflow({
        id: 'wf-state',
        name: 'State Pipeline',
        tasks: [{ id: 't1', type: 'code', description: 'Build', priority: 'high' }],
      });

      const state = await engine.getWorkflowState('wf-state');
      assert.equal(state.status, 'completed');
      assert.ok(state.completedTasks.includes('t1'));
    });

    it('getWorkflowState throws for unknown workflow', async () => {
      const { engine } = await createEngine();
      await assert.rejects(
        () => engine.getWorkflowState('nope'),
        /not found/
      );
    });
  });

  describe('Metrics', () => {
    it('getWorkflowMetrics returns timing data', async () => {
      const { engine } = await createEngine();
      await engine.executeWorkflow({
        id: 'wf-metrics',
        name: 'Metrics Pipeline',
        tasks: [
          { id: 't1', type: 'code', description: 'A', priority: 'high' },
          { id: 't2', type: 'test', description: 'B', priority: 'high' },
        ],
      });

      const metrics = await engine.getWorkflowMetrics('wf-metrics');
      assert.equal(metrics.tasksTotal, 2);
      assert.equal(metrics.tasksCompleted, 2);
      assert.equal(metrics.successRate, 1.0);
      assert.ok(metrics.totalDuration >= 0);
      assert.ok(metrics.averageTaskDuration >= 0);
    });

    it('getWorkflowMetrics throws for unknown', async () => {
      const { engine } = await createEngine();
      await assert.rejects(
        () => engine.getWorkflowMetrics('nope'),
        /not found/
      );
    });
  });

  describe('Debug Info', () => {
    it('getWorkflowDebugInfo returns trace', async () => {
      const { engine } = await createEngine();
      await engine.executeWorkflow({
        id: 'wf-debug',
        name: 'Debug Pipeline',
        tasks: [{ id: 't1', type: 'code', description: 'Build', priority: 'high' }],
      });

      const debug = await engine.getWorkflowDebugInfo('wf-debug');
      assert.ok(debug.executionTrace.length > 0);
      assert.ok(debug.eventLog.length > 0);
      assert.ok(debug.taskTimings.t1);
    });
  });

  describe('Events', () => {
    it('emits workflow:started and workflow:completed', async () => {
      const { engine } = await createEngine();
      const events = [];
      engine.getEventBus().on('workflow:started', (e) => events.push('started'));
      engine.getEventBus().on('workflow:completed', (e) => events.push('completed'));

      await engine.executeWorkflow({
        id: 'wf-events',
        name: 'Events Pipeline',
        tasks: [{ id: 't1', type: 'code', description: 'Build', priority: 'high' }],
      });

      assert.ok(events.includes('started'));
      assert.ok(events.includes('completed'));
    });

    it('emits workflow:failed on failure', async () => {
      const { engine } = await createEngine();
      let failed = false;
      engine.getEventBus().on('workflow:failed', () => { failed = true; });

      await engine.executeWorkflow({
        id: 'wf-fail-event',
        name: 'Fail Pipeline',
        rollbackOnFailure: true,
        tasks: [{
          id: 't1', type: 'code', description: 'Fail', priority: 'high',
          onExecute: () => { throw new Error('boom'); },
        }],
      });

      assert.equal(failed, true);
    });
  });

  describe('Memory Backend', () => {
    it('stores task events when memoryBackend provided', async () => {
      const stored = [];
      const mockMemory = {
        store: async (mem) => { stored.push(mem); return mem; },
        retrieve: async () => undefined,
      };

      const coordinator = new SwarmCoordinator({ topology: 'mesh' });
      await coordinator.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });
      const engine = new WorkflowEngine({ coordinator, memoryBackend: mockMemory });

      await engine.executeTask(
        { id: 't1', type: 'code', description: 'Build', priority: 'high' },
        'c1'
      );

      assert.ok(stored.some(m => m.type === 'task-start'));
      assert.ok(stored.some(m => m.type === 'task-complete'));
    });
  });

  describe('Pause/Resume', () => {
    it('pauseWorkflow updates state', async () => {
      const { engine } = await createEngine();
      // Start a workflow and immediately pause before it can finish
      const wfId = 'wf-pause';

      // Execute a workflow first so it exists
      await engine.executeWorkflow({
        id: wfId,
        name: 'Pause Test',
        tasks: [{ id: 't1', type: 'code', description: 'Build', priority: 'high' }],
      });

      // After completion, pausing should be a no-op (already completed)
      await engine.pauseWorkflow(wfId);
      const state = await engine.getWorkflowState(wfId);
      // Status remains completed since it finished before pause
      assert.equal(state.status, 'completed');
    });

    it('resumeWorkflow on non-paused is no-op', async () => {
      const { engine } = await createEngine();
      await engine.executeWorkflow({
        id: 'wf-resume',
        name: 'Resume Test',
        tasks: [{ id: 't1', type: 'code', description: 'Build', priority: 'high' }],
      });

      await engine.resumeWorkflow('wf-resume');
      const state = await engine.getWorkflowState('wf-resume');
      assert.equal(state.status, 'completed');
    });
  });
});

// ============================================================================
// 6. Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  let SwarmCoordinator, WorkflowEngine, Task, Agent;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    SwarmCoordinator = mod.SwarmCoordinator;
    WorkflowEngine = mod.WorkflowEngine;
    Task = mod.Task;
    Agent = mod.Agent;
  });

  it('empty workflow completes immediately', async () => {
    const coordinator = new SwarmCoordinator({ topology: 'mesh' });
    const engine = new WorkflowEngine({ coordinator });

    const result = await engine.executeWorkflow({
      id: 'empty', name: 'Empty', tasks: [],
    });
    assert.equal(result.status, 'completed');
    assert.equal(result.tasksCompleted, 0);
  });

  it('agent with idle status can execute tasks', async () => {
    const agent = new Agent({ id: 'idle', type: 'coder' });
    agent.setIdle();
    const result = await agent.executeTask({
      id: 't1', type: 'code', description: 'Test', priority: 'high',
    });
    assert.equal(result.status, 'completed');
  });

  it('Task.sortByPriority does not mutate original array', () => {
    const tasks = [
      new Task({ id: 'low', type: 'code', description: 'X', priority: 'low' }),
      new Task({ id: 'high', type: 'code', description: 'X', priority: 'high' }),
    ];
    const sorted = Task.sortByPriority(tasks);
    assert.equal(tasks[0].id, 'low'); // original unchanged
    assert.equal(sorted[0].id, 'high'); // sorted has high first
  });

  it('resolveExecutionOrder handles single task', () => {
    const t1 = new Task({ id: 'only', type: 'code', description: 'Solo', priority: 'high' });
    const order = Task.resolveExecutionOrder([t1]);
    assert.equal(order.length, 1);
    assert.equal(order[0].id, 'only');
  });

  it('concurrent task execution with failing tasks', async () => {
    const sc = new SwarmCoordinator({ topology: 'mesh' });
    await sc.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });

    const results = await sc.executeTasksConcurrently([
      { id: 't1', type: 'code', description: 'OK', priority: 'high' },
      {
        id: 't2', type: 'code', description: 'Fail', priority: 'high',
        onExecute: () => { throw new Error('fail'); },
      },
    ]);

    // Both should be attempted since they go to same agent sequentially
    const completed = results.filter(r => r.status === 'completed');
    const failed = results.filter(r => r.status === 'failed');
    assert.equal(completed.length + failed.length, 2);
  });

  it('workflow with 3-deep dependency chain', async () => {
    const coordinator = new SwarmCoordinator({ topology: 'mesh' });
    await coordinator.spawnAgent({ id: 'c1', type: 'coder', capabilities: ['code'] });
    const engine = new WorkflowEngine({ coordinator });

    const result = await engine.executeWorkflow({
      id: 'wf-deep',
      name: 'Deep Chain',
      tasks: [
        { id: 't3', type: 'code', description: 'C', priority: 'high', dependencies: ['t2'] },
        { id: 't1', type: 'code', description: 'A', priority: 'high' },
        { id: 't2', type: 'code', description: 'B', priority: 'high', dependencies: ['t1'] },
      ],
    });

    assert.equal(result.status, 'completed');
    assert.deepEqual(result.executionOrder, ['t1', 't2', 't3']);
  });
});

// ============================================================================
// 7. Guardian Agent Integration
// ============================================================================

describe('Guardian Agent Integration', () => {
  let SwarmCoordinator, GUARDIAN_AGENT_PROFILES, createGuardianSwarm,
      routeTaskToGuardian, getGuardianProfile, getGuardianByGate, getGuardianByFrequency;

  beforeEach(async () => {
    const mod = await import('../dist/index.js');
    SwarmCoordinator = mod.SwarmCoordinator;
    GUARDIAN_AGENT_PROFILES = mod.GUARDIAN_AGENT_PROFILES;
    createGuardianSwarm = mod.createGuardianSwarm;
    routeTaskToGuardian = mod.routeTaskToGuardian;
    getGuardianProfile = mod.getGuardianProfile;
    getGuardianByGate = mod.getGuardianByGate;
    getGuardianByFrequency = mod.getGuardianByFrequency;
  });

  describe('Exports', () => {
    it('exports GUARDIAN_AGENT_PROFILES array', () => {
      assert.ok(Array.isArray(GUARDIAN_AGENT_PROFILES));
      assert.equal(GUARDIAN_AGENT_PROFILES.length, 10);
    });

    it('exports createGuardianSwarm function', () => {
      assert.equal(typeof createGuardianSwarm, 'function');
    });

    it('exports routeTaskToGuardian function', () => {
      assert.equal(typeof routeTaskToGuardian, 'function');
    });

    it('exports getGuardianProfile function', () => {
      assert.equal(typeof getGuardianProfile, 'function');
    });

    it('exports getGuardianByGate function', () => {
      assert.equal(typeof getGuardianByGate, 'function');
    });

    it('exports getGuardianByFrequency function', () => {
      assert.equal(typeof getGuardianByFrequency, 'function');
    });
  });

  describe('Guardian Profiles', () => {
    it('all 10 Guardians have correct canonical frequencies', () => {
      const expected = {
        lyssandria: 174, leyla: 285, draconia: 396, maylinn: 417,
        alera: 528, lyria: 639, aiyami: 741, elara: 852, ino: 963, shinkami: 1111,
      };

      for (const [name, freq] of Object.entries(expected)) {
        const profile = GUARDIAN_AGENT_PROFILES.find(p => p.guardianName === name);
        assert.ok(profile, `Profile for ${name} should exist`);
        assert.equal(profile.frequency, freq, `${name} should have frequency ${freq}`);
      }
    });

    it('each Guardian has routing domains and capabilities', () => {
      for (const profile of GUARDIAN_AGENT_PROFILES) {
        assert.ok(profile.routingDomains.length > 0, `${profile.guardianName} should have routing domains`);
        assert.ok(profile.capabilities.length > 0, `${profile.guardianName} should have capabilities`);
        assert.ok(profile.gate, `${profile.guardianName} should have a gate`);
        assert.ok(profile.element, `${profile.guardianName} should have an element`);
        assert.ok(profile.signOff, `${profile.guardianName} should have a signOff`);
      }
    });

    it('Shinkami is the only Source Guardian', () => {
      const source = GUARDIAN_AGENT_PROFILES.filter(p => p.gate === 'source');
      assert.equal(source.length, 1);
      assert.equal(source[0].guardianName, 'shinkami');
      assert.equal(source[0].frequency, 1111);
    });
  });

  describe('Guardian Swarm Creation', () => {
    it('creates all 10 Guardian agents in the swarm', async () => {
      const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
      await coordinator.initialize();

      const agents = await createGuardianSwarm(coordinator);
      assert.equal(agents.length, 10);

      const agentList = await coordinator.listAgents();
      assert.equal(agentList.length, 10);
    });

    it('Shinkami is spawned as leader', async () => {
      const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
      await coordinator.initialize();

      await createGuardianSwarm(coordinator);
      const shinkami = coordinator.getAgent('guardian-shinkami');
      assert.ok(shinkami);
      assert.equal(shinkami.role, 'leader');
    });

    it('other Guardians are spawned as workers', async () => {
      const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
      await coordinator.initialize();

      await createGuardianSwarm(coordinator);
      const leyla = coordinator.getAgent('guardian-leyla');
      assert.ok(leyla);
      assert.equal(leyla.role, 'worker');
    });

    it('Guardian agents have metadata with gate and element', async () => {
      const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
      await coordinator.initialize();

      await createGuardianSwarm(coordinator);
      const draconia = coordinator.getAgent('guardian-draconia');
      assert.ok(draconia);
      assert.equal(draconia.metadata.gate, 'fire');
      assert.equal(draconia.metadata.element, 'fire');
      assert.equal(draconia.metadata.frequency, 396);
    });
  });

  describe('Task Routing', () => {
    it('routes database tasks to Lyssandria', () => {
      const agentId = routeTaskToGuardian({
        id: 't1', type: 'infrastructure', description: 'Design database schema',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-lyssandria');
    });

    it('routes design tasks to Leyla', () => {
      const agentId = routeTaskToGuardian({
        id: 't2', type: 'creative', description: 'Design the user interface',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-leyla');
    });

    it('routes debug tasks to Lyria', () => {
      const agentId = routeTaskToGuardian({
        id: 't3', type: 'debug', description: 'Investigate the failing test',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-lyria');
    });

    it('routes API tasks to Alera', () => {
      const agentId = routeTaskToGuardian({
        id: 't4', type: 'api', description: 'Design the public API interface',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-alera');
    });

    it('routes integration tasks to Ino', () => {
      const agentId = routeTaskToGuardian({
        id: 't5', type: 'integration', description: 'Merge the two services',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-ino');
    });

    it('routes meta/orchestration tasks to Shinkami', () => {
      const agentId = routeTaskToGuardian({
        id: 't6', type: 'meta', description: 'Orchestrate the entire deployment',
        priority: 'high',
      });
      assert.equal(agentId, 'guardian-shinkami');
    });

    it('defaults to Shinkami for unrecognized tasks', () => {
      const agentId = routeTaskToGuardian({
        id: 't7', type: 'unknown', description: 'Something completely random',
        priority: 'low',
      });
      assert.equal(agentId, 'guardian-shinkami');
    });
  });

  describe('Profile Lookup', () => {
    it('getGuardianProfile returns correct profile', () => {
      const lyria = getGuardianProfile('lyria');
      assert.ok(lyria);
      assert.equal(lyria.gate, 'sight');
      assert.equal(lyria.frequency, 639);
    });

    it('getGuardianByGate returns correct profile', () => {
      const heart = getGuardianByGate('heart');
      assert.ok(heart);
      assert.equal(heart.guardianName, 'maylinn');
    });

    it('getGuardianByFrequency returns correct profile', () => {
      const g528 = getGuardianByFrequency(528);
      assert.ok(g528);
      assert.equal(g528.guardianName, 'alera');
      assert.equal(g528.gate, 'voice');
    });

    it('returns undefined for unknown name', () => {
      assert.equal(getGuardianProfile('nonexistent'), undefined);
    });

    it('returns undefined for unknown gate', () => {
      assert.equal(getGuardianByGate('nonexistent'), undefined);
    });

    it('returns undefined for unknown frequency', () => {
      assert.equal(getGuardianByFrequency(999), undefined);
    });
  });

  describe('Full Guardian Workflow', () => {
    it('creates swarm, routes task, executes on correct Guardian', async () => {
      const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
      await coordinator.initialize();

      await createGuardianSwarm(coordinator);

      const task = {
        id: 'debug-1',
        type: 'debug',
        description: 'Investigate and analyze the memory leak',
        priority: 'high',
      };

      const agentId = routeTaskToGuardian(task);
      assert.equal(agentId, 'guardian-lyria');

      const result = await coordinator.executeTask(agentId, task);
      assert.equal(result.status, 'completed');
      assert.equal(result.agentId, 'guardian-lyria');
    });
  });
});
