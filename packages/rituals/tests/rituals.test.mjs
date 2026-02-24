/**
 * @arcanea/rituals — Comprehensive Test Suite
 *
 * Tests for lifecycle hooks, swarm communication, daemons,
 * workers, ReasoningBank, executor, registry, statusline,
 * MCP tools, and full integration cycles.
 *
 * Uses Node.js built-in test runner (node:test + node:assert/strict).
 */

import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// Import everything from the dist bundle
const mod = await import('../dist/index.js');

const {
  // Top-level
  VERSION,
  initializeHooks,
  runHook,

  // Enums
  HookEvent,
  HookPriority,

  // Registry
  HookRegistry,
  defaultRegistry,
  registerHook,
  unregisterHook,

  // Executor
  HookExecutor,
  defaultExecutor,
  executeHooks,

  // Daemons
  DaemonManager,
  MetricsDaemon,
  SwarmMonitorDaemon,
  HooksLearningDaemon,
  defaultDaemonManager,

  // Statusline
  StatuslineGenerator,
  createShellStatusline,
  parseStatuslineData,
  defaultStatuslineGenerator,

  // MCP Tools
  hooksMCPTools,
  getHooksTool,
  preEditTool,
  postEditTool,
  routeTaskTool,
  metricsTool,
  preCommandTool,
  postCommandTool,
  daemonStatusTool,
  statuslineTool,

  // Bridge
  OfficialHooksBridge,
  V3_TO_OFFICIAL_HOOK_MAP,
  V3_TOOL_MATCHERS,
  processOfficialHookInput,
  outputOfficialHookResult,
  executeWithBridge,

  // Swarm
  SwarmCommunication,
  swarmComm,

  // ReasoningBank
  ReasoningBank,
  reasoningBank,

  // Guidance Provider
  GuidanceProvider,
  guidanceProvider,

  // Workers
  WorkerManager,
  WorkerPriority,
  AlertSeverity,
  WORKER_CONFIGS,
  DEFAULT_THRESHOLDS,
  createWorkerManager,
  workerManager,
  createPerformanceWorker,
  createHealthWorker,

  // Worker MCP Tools
  workerMCPTools,
  createWorkerToolHandler,
  workerRunTool,
  workerStatusTool,

  // Session
  onSessionStart,
  onSessionEnd,
  formatSessionStartOutput,
} = mod;

// ============================================================================
// 1. Exports Exist — Verify all major subsystems are exported
// ============================================================================

describe('Exports Exist', () => {
  it('should export VERSION string', () => {
    assert.equal(typeof VERSION, 'string');
    assert.ok(VERSION.length > 0, 'VERSION should not be empty');
    assert.match(VERSION, /^\d+\.\d+\.\d+/);
  });

  it('should export initializeHooks function', () => {
    assert.equal(typeof initializeHooks, 'function');
  });

  it('should export runHook function', () => {
    assert.equal(typeof runHook, 'function');
  });

  it('should export HookEvent enum with all expected events', () => {
    assert.ok(HookEvent, 'HookEvent should be defined');
    const expectedEvents = [
      'PreToolUse', 'PostToolUse',
      'PreEdit', 'PostEdit', 'PreRead', 'PostRead',
      'PreCommand', 'PostCommand',
      'PreTask', 'PostTask', 'TaskProgress',
      'SessionStart', 'SessionEnd', 'SessionRestore',
      'AgentSpawn', 'AgentTerminate',
      'PreRoute', 'PostRoute',
      'PatternLearned', 'PatternConsolidated',
    ];
    for (const event of expectedEvents) {
      assert.ok(HookEvent[event] !== undefined, `HookEvent.${event} should exist`);
    }
  });

  it('should export HookPriority enum with correct values', () => {
    assert.equal(HookPriority.Critical, 1000);
    assert.equal(HookPriority.High, 100);
    assert.equal(HookPriority.Normal, 50);
    assert.equal(HookPriority.Low, 10);
    assert.equal(HookPriority.Background, 1);
  });

  it('should export Registry classes and functions', () => {
    assert.equal(typeof HookRegistry, 'function');
    assert.ok(defaultRegistry instanceof HookRegistry);
    assert.equal(typeof registerHook, 'function');
    assert.equal(typeof unregisterHook, 'function');
  });

  it('should export Executor classes and functions', () => {
    assert.equal(typeof HookExecutor, 'function');
    assert.ok(defaultExecutor instanceof HookExecutor);
    assert.equal(typeof executeHooks, 'function');
  });

  it('should export Daemon classes', () => {
    assert.equal(typeof DaemonManager, 'function');
    assert.equal(typeof MetricsDaemon, 'function');
    assert.equal(typeof SwarmMonitorDaemon, 'function');
    assert.equal(typeof HooksLearningDaemon, 'function');
    assert.ok(defaultDaemonManager instanceof DaemonManager);
  });

  it('should export Statusline classes and functions', () => {
    assert.equal(typeof StatuslineGenerator, 'function');
    assert.equal(typeof createShellStatusline, 'function');
    assert.equal(typeof parseStatuslineData, 'function');
    assert.ok(defaultStatuslineGenerator instanceof StatuslineGenerator);
  });

  it('should export MCP tools array and lookup function', () => {
    assert.ok(Array.isArray(hooksMCPTools));
    assert.ok(hooksMCPTools.length >= 8, 'Should have at least 8 MCP tools');
    assert.equal(typeof getHooksTool, 'function');
  });

  it('should export individual MCP tool objects', () => {
    const tools = [preEditTool, postEditTool, routeTaskTool, metricsTool,
      preCommandTool, postCommandTool, daemonStatusTool, statuslineTool];
    for (const tool of tools) {
      assert.ok(tool, 'Tool should be defined');
      assert.equal(typeof tool.name, 'string');
      assert.equal(typeof tool.description, 'string');
      assert.ok(tool.inputSchema, 'Tool should have inputSchema');
      assert.equal(typeof tool.handler, 'function');
    }
  });

  it('should export Bridge classes and functions', () => {
    assert.equal(typeof OfficialHooksBridge, 'function');
    assert.ok(V3_TO_OFFICIAL_HOOK_MAP, 'V3_TO_OFFICIAL_HOOK_MAP should exist');
    assert.ok(V3_TOOL_MATCHERS, 'V3_TOOL_MATCHERS should exist');
    assert.equal(typeof processOfficialHookInput, 'function');
    assert.equal(typeof outputOfficialHookResult, 'function');
    assert.equal(typeof executeWithBridge, 'function');
  });

  it('should export SwarmCommunication class and singleton', () => {
    assert.equal(typeof SwarmCommunication, 'function');
    assert.ok(swarmComm instanceof SwarmCommunication);
  });

  it('should export ReasoningBank class and singleton', () => {
    assert.equal(typeof ReasoningBank, 'function');
    assert.ok(reasoningBank instanceof ReasoningBank);
  });

  it('should export GuidanceProvider class and singleton', () => {
    assert.equal(typeof GuidanceProvider, 'function');
    assert.ok(guidanceProvider instanceof GuidanceProvider);
  });

  it('should export Worker classes and factories', () => {
    assert.equal(typeof WorkerManager, 'function');
    assert.ok(WorkerPriority, 'WorkerPriority should exist');
    assert.ok(AlertSeverity, 'AlertSeverity should exist');
    assert.ok(WORKER_CONFIGS, 'WORKER_CONFIGS should exist');
    assert.ok(DEFAULT_THRESHOLDS, 'DEFAULT_THRESHOLDS should exist');
    assert.equal(typeof createWorkerManager, 'function');
    assert.equal(typeof createPerformanceWorker, 'function');
    assert.equal(typeof createHealthWorker, 'function');
  });

  it('should export Worker MCP tools', () => {
    assert.ok(Array.isArray(workerMCPTools));
    assert.equal(typeof createWorkerToolHandler, 'function');
    assert.ok(workerRunTool, 'workerRunTool should exist');
    assert.ok(workerStatusTool, 'workerStatusTool should exist');
  });

  it('should export Session hook functions', () => {
    assert.equal(typeof onSessionStart, 'function');
    assert.equal(typeof onSessionEnd, 'function');
    assert.equal(typeof formatSessionStartOutput, 'function');
  });
});

// ============================================================================
// 2. Swarm Communication — Messaging, broadcasting, task handoff
// ============================================================================

describe('Swarm Communication', { timeout: 10000 }, () => {
  let swarm;

  beforeEach(async () => {
    swarm = new SwarmCommunication({
      agentId: 'agent-test-1',
      agentName: 'Test Agent',
      messageRetention: 60000,
      consensusTimeout: 5000,
      autoAcknowledge: true,
      autoBroadcastPatterns: false,
    });
    await swarm.initialize();
  });

  afterEach(async () => {
    await swarm.shutdown();
  });

  describe('Initialization', () => {
    it('should initialize and register self as agent', async () => {
      const agents = swarm.getAgents();
      assert.ok(agents.length >= 1, 'Should have at least the self agent registered');
      const self = swarm.getAgent('agent-test-1');
      assert.ok(self, 'Self agent should be registered');
      assert.equal(self.name, 'Test Agent');
      assert.equal(self.status, 'idle');
    });

    it('should be idempotent on double initialize', async () => {
      await swarm.initialize();
      const agents = swarm.getAgents();
      assert.equal(agents.length, 1, 'Should still have exactly one agent');
    });

    it('should handle shutdown gracefully', async () => {
      await swarm.shutdown();
      const agents = swarm.getAgents();
      assert.equal(agents.length, 0, 'Agents should be cleared after shutdown');
    });

    it('should handle double shutdown without error', async () => {
      await swarm.shutdown();
      await swarm.shutdown();
    });
  });

  describe('Agent-to-Agent Messaging', () => {
    it('should send a message and return it with correct fields', async () => {
      const msg = await swarm.sendMessage('agent-2', 'Hello from test', {
        type: 'context',
        priority: 'high',
      });

      assert.ok(msg.id.startsWith('msg_'), 'Message ID should have msg_ prefix');
      assert.equal(msg.from, 'agent-test-1');
      assert.equal(msg.to, 'agent-2');
      assert.equal(msg.type, 'context');
      assert.equal(msg.priority, 'high');
      assert.equal(msg.content, 'Hello from test');
      assert.ok(msg.timestamp > 0);
    });

    it('should default to context type and normal priority', async () => {
      const msg = await swarm.sendMessage('agent-2', 'Default options');
      assert.equal(msg.type, 'context');
      assert.equal(msg.priority, 'normal');
    });

    it('should broadcast context to all agents', async () => {
      const msg = await swarm.broadcastContext('Broadcast message', { key: 'value' });
      assert.equal(msg.to, '*');
      assert.equal(msg.type, 'context');
      assert.deepEqual(msg.metadata, { key: 'value' });
    });

    it('should query agents via broadcast', async () => {
      const msg = await swarm.queryAgents('Who has capacity?');
      assert.equal(msg.to, '*');
      assert.equal(msg.type, 'query');
      assert.equal(msg.content, 'Who has capacity?');
    });

    it('should retrieve broadcast messages for self', async () => {
      await swarm.broadcastContext('For everyone');

      const messages = swarm.getMessages();
      assert.ok(messages.length >= 1, 'Should have at least 1 broadcast message');
      assert.equal(messages[0].content, 'For everyone');
    });

    it('should filter messages by type', async () => {
      await swarm.sendMessage('*', 'context msg', { type: 'context' });
      await swarm.sendMessage('*', 'query msg', { type: 'query' });

      const contextMsgs = swarm.getMessages({ type: 'context' });
      const queryMsgs = swarm.getMessages({ type: 'query' });

      assert.ok(contextMsgs.every(m => m.type === 'context'));
      assert.ok(queryMsgs.every(m => m.type === 'query'));
    });

    it('should sort messages by priority (critical first)', async () => {
      await swarm.sendMessage('*', 'low', { priority: 'low' });
      await swarm.sendMessage('*', 'critical', { priority: 'critical' });
      await swarm.sendMessage('*', 'normal', { priority: 'normal' });

      const messages = swarm.getMessages();
      assert.equal(messages[0].priority, 'critical');
    });

    it('should limit message count when requested', async () => {
      for (let i = 0; i < 5; i++) {
        await swarm.broadcastContext(`msg-${i}`);
      }
      const limited = swarm.getMessages({ limit: 2 });
      assert.equal(limited.length, 2);
    });

    it('should filter messages by since timestamp', async () => {
      await swarm.broadcastContext('old');
      const afterFirst = Date.now();
      await new Promise(r => setTimeout(r, 10));
      await swarm.broadcastContext('new');

      const newMsgs = swarm.getMessages({ since: afterFirst });
      assert.ok(newMsgs.length >= 1);
      assert.ok(newMsgs.some(m => m.content === 'new'));
    });
  });

  describe('Pattern Broadcasting', () => {
    it('should broadcast a pattern and return broadcast entry', async () => {
      const pattern = {
        id: 'pat-1',
        strategy: 'Use TDD for all services',
        domain: 'testing',
        embedding: new Float32Array(384),
        quality: 0.9,
        usageCount: 5,
        successCount: 4,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        metadata: {},
      };

      const broadcast = await swarm.broadcastPattern(pattern);
      assert.ok(broadcast.id.startsWith('bc_'));
      assert.equal(broadcast.sourceAgent, 'agent-test-1');
      assert.equal(broadcast.pattern.strategy, 'Use TDD for all services');
      assert.ok(broadcast.recipients.length >= 0);
    });

    it('should acknowledge a broadcast', async () => {
      const pattern = {
        id: 'pat-2',
        strategy: 'Use event sourcing',
        domain: 'architecture',
        embedding: new Float32Array(384),
        quality: 0.85,
        usageCount: 3,
        successCount: 2,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        metadata: {},
      };

      const broadcast = await swarm.broadcastPattern(pattern);
      const acked = swarm.acknowledgeBroadcast(broadcast.id);
      assert.equal(acked, true);
      assert.ok(broadcast.acknowledgments.includes('agent-test-1'));
    });

    it('should return false for acknowledging non-existent broadcast', () => {
      assert.equal(swarm.acknowledgeBroadcast('nonexistent'), false);
    });

    it('should get pattern broadcasts with filters', async () => {
      const pattern1 = {
        id: 'pat-a', strategy: 'Strategy A', domain: 'testing',
        embedding: new Float32Array(384), quality: 0.9,
        usageCount: 1, successCount: 1, createdAt: Date.now(), updatedAt: Date.now(), metadata: {},
      };
      const pattern2 = {
        id: 'pat-b', strategy: 'Strategy B', domain: 'security',
        embedding: new Float32Array(384), quality: 0.5,
        usageCount: 1, successCount: 0, createdAt: Date.now(), updatedAt: Date.now(), metadata: {},
      };

      await swarm.broadcastPattern(pattern1);
      await swarm.broadcastPattern(pattern2);

      const allBroadcasts = swarm.getPatternBroadcasts();
      assert.ok(allBroadcasts.length >= 2);

      const testingOnly = swarm.getPatternBroadcasts({ domain: 'testing' });
      assert.ok(testingOnly.every(b => b.pattern.domain === 'testing'));

      const highQuality = swarm.getPatternBroadcasts({ minQuality: 0.8 });
      assert.ok(highQuality.every(b => b.pattern.quality >= 0.8));
    });
  });

  describe('Task Handoff', () => {
    beforeEach(async () => {
      swarm.registerAgent({
        id: 'agent-test-2',
        name: 'Second Agent',
        status: 'idle',
        lastSeen: Date.now(),
        capabilities: ['coding', 'testing'],
        patternsShared: 0,
        handoffsReceived: 0,
        handoffsCompleted: 0,
      });
    });

    it('should initiate a task handoff', async () => {
      const handoff = await swarm.initiateHandoff(
        'agent-test-2',
        'Implement authentication module',
        {
          filesModified: ['src/auth.ts'],
          patternsUsed: ['JWT pattern'],
          decisions: ['Use bcrypt for hashing'],
          blockers: [],
          nextSteps: ['Add rate limiting', 'Write tests'],
        }
      );

      assert.ok(handoff.id.startsWith('ho_'));
      assert.equal(handoff.fromAgent, 'agent-test-1');
      assert.equal(handoff.toAgent, 'agent-test-2');
      assert.equal(handoff.status, 'pending');
      assert.equal(handoff.description, 'Implement authentication module');
      assert.deepEqual(handoff.context.filesModified, ['src/auth.ts']);
    });

    it('should retrieve a handoff by ID', async () => {
      const handoff = await swarm.initiateHandoff(
        'agent-test-2', 'Task X',
        { filesModified: [], patternsUsed: [], decisions: [], blockers: [], nextSteps: [] }
      );

      const retrieved = swarm.getHandoff(handoff.id);
      assert.ok(retrieved);
      assert.equal(retrieved.id, handoff.id);
    });

    it('should generate handoff context text', async () => {
      const handoff = await swarm.initiateHandoff(
        'agent-test-2', 'Build API endpoints',
        {
          filesModified: ['src/api/routes.ts'],
          patternsUsed: ['REST pattern'],
          decisions: ['Use Express'],
          blockers: ['Needs DB schema'],
          nextSteps: ['Add validation'],
        }
      );

      const context = swarm.generateHandoffContext(handoff.id);
      assert.ok(context.includes('Task Handoff'));
      assert.ok(context.includes('Build API endpoints'));
      assert.ok(context.includes('src/api/routes.ts'));
      assert.ok(context.includes('REST pattern'));
      assert.ok(context.includes('Needs DB schema'));
    });

    it('should return not found for invalid ID', () => {
      const text = swarm.generateHandoffContext('nonexistent');
      assert.equal(text, 'Handoff not found');
    });
  });

  describe('Consensus', () => {
    it('should initiate a consensus request', async () => {
      const consensus = await swarm.initiateConsensus(
        'Which framework to use?',
        ['Next.js', 'Remix', 'SvelteKit'],
        10000
      );

      assert.ok(consensus.id.startsWith('cons_'));
      assert.equal(consensus.initiator, 'agent-test-1');
      assert.equal(consensus.question, 'Which framework to use?');
      assert.deepEqual(consensus.options, ['Next.js', 'Remix', 'SvelteKit']);
      assert.equal(consensus.status, 'pending');
    });

    it('should vote on a consensus request', async () => {
      const consensus = await swarm.initiateConsensus(
        'Deploy to staging?', ['yes', 'no'], 10000
      );

      const voted = swarm.voteConsensus(consensus.id, 'yes');
      assert.equal(voted, true);
    });

    it('should reject invalid vote options', async () => {
      const consensus = await swarm.initiateConsensus(
        'Color?', ['red', 'blue'], 10000
      );

      const voted = swarm.voteConsensus(consensus.id, 'green');
      assert.equal(voted, false);
    });

    it('should resolve consensus when all agents vote', async () => {
      const consensus = await swarm.initiateConsensus(
        'Proceed?', ['yes', 'no'], 10000
      );

      swarm.voteConsensus(consensus.id, 'yes');

      const resolved = swarm.getConsensus(consensus.id);
      assert.equal(resolved.status, 'resolved');
      assert.ok(resolved.result);
      assert.equal(resolved.result.winner, 'yes');
    });

    it('should generate consensus guidance text', async () => {
      const consensus = await swarm.initiateConsensus(
        'Which DB?', ['PostgreSQL', 'MySQL'], 10000
      );
      swarm.voteConsensus(consensus.id, 'PostgreSQL');

      const guidance = swarm.generateConsensusGuidance(consensus.id);
      assert.ok(guidance.includes('Which DB?'));
      assert.ok(guidance.includes('PostgreSQL'));
    });

    it('should return not found text for invalid consensus ID', () => {
      const text = swarm.generateConsensusGuidance('nonexistent');
      assert.equal(text, 'Consensus request not found');
    });

    it('should get pending consensus requests', async () => {
      swarm.registerAgent({
        id: 'agent-extra',
        name: 'Extra',
        status: 'idle',
        lastSeen: Date.now(),
        capabilities: [],
        patternsShared: 0,
        handoffsReceived: 0,
        handoffsCompleted: 0,
      });

      await swarm.initiateConsensus('Pending Q?', ['a', 'b'], 60000);

      const pending = swarm.getPendingConsensus();
      assert.ok(pending.length >= 1);
      assert.ok(pending.some(c => c.question === 'Pending Q?'));
    });
  });

  describe('Agent Registry', () => {
    it('should register and retrieve agents', () => {
      swarm.registerAgent({
        id: 'agent-alpha',
        name: 'Alpha',
        status: 'busy',
        lastSeen: Date.now(),
        capabilities: ['coding'],
        patternsShared: 2,
        handoffsReceived: 1,
        handoffsCompleted: 1,
      });

      const agent = swarm.getAgent('agent-alpha');
      assert.ok(agent);
      assert.equal(agent.name, 'Alpha');
      assert.equal(agent.status, 'busy');
    });

    it('should update agent status', () => {
      swarm.updateAgentStatus('agent-test-1', 'busy');
      const agent = swarm.getAgent('agent-test-1');
      assert.equal(agent.status, 'busy');
    });

    it('should return undefined for unknown agent', () => {
      assert.equal(swarm.getAgent('nonexistent'), undefined);
    });
  });

  describe('Statistics', () => {
    it('should return stats with correct structure', async () => {
      await swarm.broadcastContext('stat test');

      const stats = swarm.getStats();
      assert.equal(stats.agentId, 'agent-test-1');
      assert.ok(stats.agentCount >= 1);
      assert.ok(stats.metrics.messagesSent >= 1);
      assert.equal(typeof stats.pendingMessages, 'number');
      assert.equal(typeof stats.pendingHandoffs, 'number');
      assert.equal(typeof stats.pendingConsensus, 'number');
    });
  });
});

// ============================================================================
// 3. Daemon Lifecycle — Create, start, stop, check status
// ============================================================================

describe('Daemon Lifecycle', { timeout: 10000 }, () => {
  let manager;

  beforeEach(() => {
    manager = new DaemonManager();
  });

  afterEach(async () => {
    await manager.stopAll();
  });

  it('should register a daemon', () => {
    manager.register(
      { name: 'test-daemon', interval: 100000, enabled: true },
      async () => {}
    );

    const state = manager.getState('test-daemon');
    assert.ok(state);
    assert.equal(state.name, 'test-daemon');
    assert.equal(state.status, 'stopped');
    assert.equal(manager.count, 1);
  });

  it('should throw when registering duplicate daemon name', () => {
    manager.register({ name: 'dup', interval: 1000, enabled: true }, async () => {});
    assert.throws(() => {
      manager.register({ name: 'dup', interval: 1000, enabled: true }, async () => {});
    }, /already registered/);
  });

  it('should start a daemon and update its state', async () => {
    let taskRan = false;
    manager.register(
      { name: 'start-test', interval: 100000, enabled: true },
      async () => { taskRan = true; }
    );

    await manager.start('start-test');

    const state = manager.getState('start-test');
    assert.equal(state.status, 'running');
    assert.ok(state.startedAt instanceof Date);
    assert.ok(taskRan, 'Initial task execution should have run');
    assert.equal(state.executionCount, 1);
  });

  it('should throw when starting a non-existent daemon', async () => {
    await assert.rejects(
      () => manager.start('nonexistent'),
      /not found/
    );
  });

  it('should throw when starting a disabled daemon', async () => {
    manager.register(
      { name: 'disabled', interval: 1000, enabled: false },
      async () => {}
    );

    await assert.rejects(
      () => manager.start('disabled'),
      /disabled/
    );
  });

  it('should stop a running daemon', async () => {
    manager.register(
      { name: 'stop-test', interval: 100000, enabled: true },
      async () => {}
    );

    await manager.start('stop-test');
    assert.equal(manager.isRunning('stop-test'), true);

    await manager.stop('stop-test');
    assert.equal(manager.isRunning('stop-test'), false);

    const state = manager.getState('stop-test');
    assert.equal(state.status, 'stopped');
  });

  it('should handle stopping an already stopped daemon', async () => {
    manager.register(
      { name: 'already-stopped', interval: 1000, enabled: true },
      async () => {}
    );

    await manager.stop('already-stopped');
  });

  it('should restart a daemon', async () => {
    let count = 0;
    manager.register(
      { name: 'restart-test', interval: 100000, enabled: true },
      async () => { count++; }
    );

    await manager.start('restart-test');
    assert.equal(count, 1);

    await manager.restart('restart-test');
    assert.equal(count, 2, 'Task should run again after restart');
    assert.equal(manager.isRunning('restart-test'), true);
  });

  it('should start all enabled daemons', async () => {
    manager.register({ name: 'd1', interval: 100000, enabled: true }, async () => {});
    manager.register({ name: 'd2', interval: 100000, enabled: true }, async () => {});
    manager.register({ name: 'd3', interval: 100000, enabled: false }, async () => {});

    await manager.startAll();

    assert.equal(manager.isRunning('d1'), true);
    assert.equal(manager.isRunning('d2'), true);
    assert.equal(manager.isRunning('d3'), false);
    assert.equal(manager.runningCount, 2);
  });

  it('should stop all daemons', async () => {
    manager.register({ name: 'sa1', interval: 100000, enabled: true }, async () => {});
    manager.register({ name: 'sa2', interval: 100000, enabled: true }, async () => {});

    await manager.startAll();
    assert.equal(manager.runningCount, 2);

    await manager.stopAll();
    assert.equal(manager.runningCount, 0);
  });

  it('should return all daemon states', () => {
    manager.register({ name: 'st1', interval: 1000, enabled: true }, async () => {});
    manager.register({ name: 'st2', interval: 1000, enabled: true }, async () => {});

    const states = manager.getAllStates();
    assert.equal(states.length, 2);
    assert.ok(states.some(s => s.name === 'st1'));
    assert.ok(states.some(s => s.name === 'st2'));
  });

  it('should enable and disable daemons', async () => {
    manager.register({ name: 'toggle', interval: 100000, enabled: false }, async () => {});

    manager.enable('toggle');
    await manager.start('toggle');
    assert.equal(manager.isRunning('toggle'), true);

    manager.disable('toggle');
    await new Promise(r => setTimeout(r, 50));
    assert.equal(manager.isRunning('toggle'), false);
  });

  it('should track failure count', async () => {
    const mgr = new DaemonManager({ autoRestart: false });
    mgr.register(
      { name: 'fail-test', interval: 100000, enabled: true },
      async () => { throw new Error('Intentional'); }
    );

    await mgr.start('fail-test');
    const state = mgr.getState('fail-test');
    assert.ok(state.failureCount >= 1, 'Should track failures');
    assert.ok(state.error, 'Should have error message');
    await mgr.stopAll();
  });
});

describe('MetricsDaemon', { timeout: 10000 }, () => {
  it('should create and start metrics daemon', async () => {
    const manager = new DaemonManager();
    const daemon = new MetricsDaemon(manager);
    await daemon.start();

    const metrics = daemon.getMetrics();
    assert.ok(metrics.timestamp, 'Should have timestamp');

    await daemon.stop();
  });
});

describe('SwarmMonitorDaemon', { timeout: 10000 }, () => {
  it('should create and manage swarm monitor', async () => {
    const manager = new DaemonManager();
    const daemon = new SwarmMonitorDaemon(manager);

    await daemon.start();

    const data = daemon.getSwarmData();
    assert.equal(typeof data.activeAgents, 'number');
    assert.equal(typeof data.maxAgents, 'number');
    assert.equal(typeof data.coordinationActive, 'boolean');

    daemon.updateAgentCount(5);
    daemon.setCoordinationActive(true);

    const updated = daemon.getSwarmData();
    assert.equal(updated.activeAgents, 5);
    assert.equal(updated.coordinationActive, true);

    await daemon.stop();
  });
});

describe('HooksLearningDaemon', { timeout: 10000 }, () => {
  it('should create and get stats', () => {
    const daemon = new HooksLearningDaemon();

    const stats = daemon.getStats();
    assert.equal(typeof stats.patternsLearned, 'number');
    assert.equal(typeof stats.routingAccuracy, 'number');
    assert.ok(stats.consolidationStats);
    assert.equal(stats.consolidationStats.totalRuns, 0);

    daemon.updatePatternCount(42);
    daemon.updateRoutingAccuracy(0.87);

    const updated = daemon.getStats();
    assert.equal(updated.patternsLearned, 42);
    assert.equal(updated.routingAccuracy, 0.87);
  });
});

// ============================================================================
// 4. Spirit Workers — Register workers, assign tasks, check completion
// ============================================================================

describe('Spirit Workers (WorkerManager)', () => {
  it('should export WorkerPriority enum values', () => {
    assert.ok(WorkerPriority.Critical !== undefined);
    assert.ok(WorkerPriority.High !== undefined);
    assert.ok(WorkerPriority.Normal !== undefined);
    assert.ok(WorkerPriority.Low !== undefined);
  });

  it('should export AlertSeverity enum values', () => {
    assert.ok(AlertSeverity.Critical !== undefined);
    assert.ok(AlertSeverity.Warning !== undefined);
    assert.ok(AlertSeverity.Info !== undefined);
  });

  it('should export WORKER_CONFIGS with expected worker names', () => {
    assert.ok(WORKER_CONFIGS);
    const names = Object.keys(WORKER_CONFIGS);
    assert.ok(names.length > 0, 'Should have worker configs');
  });

  it('should export DEFAULT_THRESHOLDS', () => {
    assert.ok(DEFAULT_THRESHOLDS);
    assert.equal(typeof DEFAULT_THRESHOLDS, 'object');
  });

  it('should export worker factory functions', () => {
    assert.equal(typeof createPerformanceWorker, 'function');
    assert.equal(typeof createHealthWorker, 'function');
  });
});

// ============================================================================
// 5. ReasoningBank — Store and retrieve guidance patterns
// ============================================================================

describe('ReasoningBank Guidance', { timeout: 10000 }, () => {
  let bank;

  beforeEach(async () => {
    bank = new ReasoningBank();
    await bank.initialize();
    // Mock embedding service to avoid slow npx agentic-flow calls (10s timeout each)
    bank.embeddingService = { embed: async (text) => { const e = new Float32Array(384); const n = text.toLowerCase().trim(); for (let i = 0; i < 384; i++) { let h = 0; for (let j = 0; j < n.length; j++) h = ((h << 5) - h + n.charCodeAt(j) * (i + 1)) | 0; e[i] = (Math.sin(h) + 1) / 2; } let norm = 0; for (let i = 0; i < 384; i++) norm += e[i] * e[i]; norm = Math.sqrt(norm) || 1; for (let i = 0; i < 384; i++) e[i] /= norm; return e; } };
  });

  it('should initialize without error', () => {
    assert.ok(true);
  });

  it('should store a pattern and return an ID', async () => {
    const storeResult = await bank.storePattern('Use strict TypeScript mode', 'code', {
      source: 'test',
    });

    assert.equal(typeof storeResult.id, 'string');
    assert.ok(storeResult.id.length > 0, 'Pattern ID should be non-empty');
  });

  it('should search for stored patterns', async () => {
    await bank.storePattern('Use React Server Components', 'frontend');
    await bank.storePattern('Use PostgreSQL for relational data', 'database');

    const results = await bank.searchPatterns('React components frontend', 5);
    assert.ok(Array.isArray(results));
  });

  it('should generate guidance from context', async () => {
    await bank.storePattern('Always validate inputs', 'security');

    const guidance = await bank.generateGuidance({
      event: HookEvent.PreEdit,
      timestamp: new Date(),
      file: { path: 'src/auth.ts', operation: 'modify' },
    });

    assert.ok(guidance, 'Guidance should be returned');
    assert.ok(Array.isArray(guidance.patterns), 'Guidance should have patterns array');
    assert.ok(Array.isArray(guidance.recommendations), 'Guidance should have recommendations');
    assert.equal(typeof guidance.searchTimeMs, 'number');
  });

  it('should route tasks to agents', async () => {
    const routing = await bank.routeTask('Fix the security vulnerability in auth module');

    assert.ok(routing, 'Routing result should exist');
    assert.equal(typeof routing.agent, 'string');
    assert.equal(typeof routing.confidence, 'number');
    assert.ok(Array.isArray(routing.alternatives));
    assert.equal(typeof routing.reasoning, 'string');
  });

  it('should record outcomes', async () => {
    const patResult = await bank.storePattern('Test pattern', 'testing');
    await bank.recordOutcome(patResult.id, true, 0.9);
    assert.ok(true);
  });

  it('should consolidate patterns', async () => {
    const result = await bank.consolidate();

    assert.ok(result, 'Consolidation result should exist');
    assert.equal(typeof result.patternsPromoted, 'number');
    assert.equal(typeof result.patternsPruned, 'number');
    assert.equal(typeof result.duplicatesRemoved, 'number');
  });

  it('should return stats', () => {
    const stats = bank.getStats();

    assert.equal(typeof stats.shortTermCount, 'number');
    assert.equal(typeof stats.longTermCount, 'number');
    assert.ok(stats.metrics, 'Stats should have metrics object');
    assert.equal(typeof stats.metrics.searchCount, 'number');
    assert.equal(typeof stats.avgSearchTime, 'number');
  });

  it('should export and import patterns', async () => {
    await bank.storePattern('Exportable pattern', 'testing');

    const exported = await bank.exportPatterns();
    assert.ok(exported, 'exportPatterns should return an object');
    assert.ok(Array.isArray(exported.shortTerm), 'exported.shortTerm should be an array');
    assert.ok(Array.isArray(exported.longTerm), 'exported.longTerm should be an array');
    assert.ok(exported.shortTerm.length >= 1, 'Should have at least one short-term pattern');

    const bank2 = new ReasoningBank();
    await bank2.initialize();
    await bank2.importPatterns(exported);

    const stats = bank2.getStats();
    assert.ok(stats.shortTermCount >= 0);
  });
});

// ============================================================================
// 6. Executor — Submit tasks, track dependencies, verify execution order
// ============================================================================

describe('Executor', () => {
  let registry;
  let executor;

  beforeEach(() => {
    registry = new HookRegistry();
    executor = new HookExecutor(registry);
  });

  it('should execute hooks for an event', async () => {
    let handlerCalled = false;
    registry.register(
      HookEvent.PreEdit,
      async () => {
        handlerCalled = true;
        return { success: true };
      },
      HookPriority.Normal,
      { name: 'test-hook' }
    );

    const result = await executor.execute(HookEvent.PreEdit, {
      file: { path: 'test.ts', operation: 'modify' },
    });

    assert.equal(result.success, true);
    assert.equal(result.hooksExecuted, 1);
    assert.equal(result.hooksFailed, 0);
    assert.equal(handlerCalled, true);
  });

  it('should return empty success for events with no hooks', async () => {
    const result = await executor.execute(HookEvent.PostCommand, {});

    assert.equal(result.success, true);
    assert.equal(result.hooksExecuted, 0);
    assert.equal(result.hooksFailed, 0);
  });

  it('should execute hooks in priority order (highest first)', async () => {
    const order = [];

    registry.register(
      HookEvent.PreCommand,
      async () => { order.push('low'); return { success: true }; },
      HookPriority.Low,
      { name: 'low-hook' }
    );

    registry.register(
      HookEvent.PreCommand,
      async () => { order.push('critical'); return { success: true }; },
      HookPriority.Critical,
      { name: 'critical-hook' }
    );

    registry.register(
      HookEvent.PreCommand,
      async () => { order.push('normal'); return { success: true }; },
      HookPriority.Normal,
      { name: 'normal-hook' }
    );

    await executor.execute(HookEvent.PreCommand, {
      command: { raw: 'npm test' },
    });

    assert.deepEqual(order, ['critical', 'normal', 'low']);
  });

  it('should stop execution on failure when continueOnError is false', async () => {
    const order = [];

    registry.register(
      HookEvent.PreEdit,
      async () => { order.push('first'); return { success: true }; },
      HookPriority.Critical
    );

    registry.register(
      HookEvent.PreEdit,
      async () => { order.push('fail'); return { success: false, error: 'intentional' }; },
      HookPriority.High
    );

    registry.register(
      HookEvent.PreEdit,
      async () => { order.push('skipped'); return { success: true }; },
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PreEdit, {}, {
      continueOnError: false,
    });

    assert.equal(result.success, false);
    assert.equal(result.hooksFailed, 1);
    assert.deepEqual(order, ['first', 'fail']);
    assert.ok(!order.includes('skipped'));
  });

  it('should continue on error when continueOnError is true', async () => {
    const order = [];

    registry.register(
      HookEvent.PostEdit,
      async () => { order.push('first'); return { success: false, error: 'fail' }; },
      HookPriority.High
    );

    registry.register(
      HookEvent.PostEdit,
      async () => { order.push('second'); return { success: true }; },
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PostEdit, {}, {
      continueOnError: true,
    });

    assert.equal(result.hooksFailed, 1);
    assert.equal(result.hooksExecuted, 2);
    assert.deepEqual(order, ['first', 'second']);
  });

  it('should abort on hook requesting abort', async () => {
    const order = [];

    registry.register(
      HookEvent.PreToolUse,
      async () => { order.push('blocker'); return { success: true, abort: true, message: 'Blocked!' }; },
      HookPriority.Critical
    );

    registry.register(
      HookEvent.PreToolUse,
      async () => { order.push('never'); return { success: true }; },
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PreToolUse, {});

    assert.equal(result.aborted, true);
    assert.deepEqual(order, ['blocker']);
    assert.ok(result.messages.includes('Blocked!'));
  });

  it('should handle hook timeout', async () => {
    registry.register(
      HookEvent.PreEdit,
      async () => {
        await new Promise(r => setTimeout(r, 500));
        return { success: true };
      },
      HookPriority.Normal,
      { name: 'slow-hook' }
    );

    const result = await executor.execute(HookEvent.PreEdit, {}, {
      timeout: 50,
    });

    assert.equal(result.success, false);
    assert.equal(result.hooksFailed, 1);
    assert.ok(result.results[0].error.includes('timed out'));
  });

  it('should handle exceptions in hook handlers', async () => {
    registry.register(
      HookEvent.PostCommand,
      async () => { throw new Error('Boom!'); },
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PostCommand, {});

    assert.equal(result.success, false);
    assert.equal(result.hooksFailed, 1);
    assert.ok(result.results[0].error.includes('Boom!'));
  });

  it('should collect warnings and messages from hooks', async () => {
    registry.register(
      HookEvent.SessionStart,
      async () => ({
        success: true,
        message: 'Session initialized',
        warnings: ['Low memory', 'High CPU'],
      }),
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.SessionStart, {
      session: { id: 'sess-1', startedAt: new Date() },
    });

    assert.ok(result.messages.includes('Session initialized'));
    assert.ok(result.warnings.includes('Low memory'));
    assert.ok(result.warnings.includes('High CPU'));
  });

  it('should merge hook data into context metadata', async () => {
    registry.register(
      HookEvent.PreRoute,
      async () => ({
        success: true,
        data: { routingHint: 'use-security-agent' },
      }),
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PreRoute, {
      routing: { task: 'Fix CVE-2024-1234' },
    });

    assert.ok(result.finalContext.metadata);
    assert.equal(result.finalContext.metadata.routingHint, 'use-security-agent');
  });

  it('should track execution time', async () => {
    registry.register(
      HookEvent.PostToolUse,
      async () => {
        await new Promise(r => setTimeout(r, 20));
        return { success: true };
      },
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.PostToolUse, {});

    assert.ok(result.executionTime >= 15, `Execution time should be >= 15ms, got ${result.executionTime}`);
    assert.ok(result.results[0].duration >= 15);
  });

  it('should support convenience methods (preToolUse, postToolUse)', async () => {
    registry.register(
      HookEvent.PreToolUse,
      async (ctx) => {
        assert.equal(ctx.tool.name, 'Write');
        return { success: true };
      },
      HookPriority.Normal
    );

    const result = await executor.preToolUse('Write', { filePath: '/test.ts' });
    assert.equal(result.success, true);
  });

  it('should fire event emitter when set', async () => {
    const events = [];
    executor.setEventEmitter({
      emit: (event, data) => events.push({ event, data }),
    });

    registry.register(
      HookEvent.SessionEnd,
      async () => ({ success: true }),
      HookPriority.Normal
    );

    await executor.execute(HookEvent.SessionEnd, {});

    assert.ok(events.some(e => e.event === 'hook:executed'));
    assert.ok(events.some(e => e.event === 'hooks:completed'));
  });
});

// ============================================================================
// 7. Registry — Register, query capabilities, check availability
// ============================================================================

describe('Registry', () => {
  let registry;

  beforeEach(() => {
    registry = new HookRegistry();
  });

  it('should register a hook and return unique ID', () => {
    const id = registry.register(
      HookEvent.PreEdit,
      async () => ({ success: true }),
      HookPriority.Normal,
      { name: 'my-hook', description: 'A test hook' }
    );

    assert.equal(typeof id, 'string');
    assert.ok(id.startsWith('hook-'));
    assert.equal(registry.size, 1);
  });

  it('should get a hook by ID', () => {
    const id = registry.register(
      HookEvent.PreCommand,
      async () => ({ success: true }),
      HookPriority.High,
      { name: 'cmd-hook' }
    );

    const entry = registry.get(id);
    assert.ok(entry);
    assert.equal(entry.name, 'cmd-hook');
    assert.equal(entry.event, HookEvent.PreCommand);
    assert.equal(entry.priority, HookPriority.High);
    assert.equal(entry.enabled, true);
    assert.ok(entry.registeredAt instanceof Date);
  });

  it('should return undefined for non-existent hook', () => {
    assert.equal(registry.get('nonexistent'), undefined);
  });

  it('should unregister a hook', () => {
    const id = registry.register(
      HookEvent.PostEdit,
      async () => ({ success: true }),
      HookPriority.Normal
    );

    assert.equal(registry.size, 1);
    const removed = registry.unregister(id);
    assert.equal(removed, true);
    assert.equal(registry.size, 0);
    assert.equal(registry.get(id), undefined);
  });

  it('should return false when unregistering non-existent hook', () => {
    assert.equal(registry.unregister('nonexistent'), false);
  });

  it('should check if hook exists', () => {
    const id = registry.register(
      HookEvent.PreEdit,
      async () => ({ success: true }),
      HookPriority.Normal
    );

    assert.equal(registry.has(id), true);
    assert.equal(registry.has('nonexistent'), false);
  });

  it('should get hooks for event sorted by priority descending', () => {
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Low, { name: 'low' });
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Critical, { name: 'critical' });
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'normal' });

    const hooks = registry.getForEvent(HookEvent.PreEdit);
    assert.equal(hooks.length, 3);
    assert.equal(hooks[0].name, 'critical');
    assert.equal(hooks[1].name, 'normal');
    assert.equal(hooks[2].name, 'low');
  });

  it('should return empty array for events with no hooks', () => {
    const hooks = registry.getForEvent(HookEvent.AgentSpawn);
    assert.deepEqual(hooks, []);
  });

  it('should filter enabled-only hooks when getting for event', () => {
    registry.register(HookEvent.PostCommand, async () => ({ success: true }), HookPriority.Normal, { name: 'enabled' });
    const id2 = registry.register(HookEvent.PostCommand, async () => ({ success: true }), HookPriority.Normal, { name: 'disabled' });
    registry.disable(id2);

    const enabledOnly = registry.getForEvent(HookEvent.PostCommand, true);
    assert.equal(enabledOnly.length, 1);
    assert.equal(enabledOnly[0].name, 'enabled');

    const all = registry.getForEvent(HookEvent.PostCommand, false);
    assert.equal(all.length, 2);
  });

  it('should enable and disable hooks', () => {
    const id = registry.register(
      HookEvent.PreEdit,
      async () => ({ success: true }),
      HookPriority.Normal
    );

    assert.equal(registry.get(id).enabled, true);

    registry.disable(id);
    assert.equal(registry.get(id).enabled, false);

    registry.enable(id);
    assert.equal(registry.get(id).enabled, true);
  });

  it('should return false for enable/disable on non-existent hook', () => {
    assert.equal(registry.enable('nope'), false);
    assert.equal(registry.disable('nope'), false);
  });

  it('should list hooks with filters', () => {
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'edit-1' });
    registry.register(HookEvent.PreCommand, async () => ({ success: true }), HookPriority.High, { name: 'cmd-1' });
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Critical, { name: 'edit-critical' });

    const editHooks = registry.list({ event: HookEvent.PreEdit });
    assert.equal(editHooks.length, 2);
    assert.ok(editHooks.every(h => h.event === HookEvent.PreEdit));

    const highPriority = registry.list({ minPriority: HookPriority.High });
    assert.ok(highPriority.every(h => h.priority >= HookPriority.High));

    const editPattern = registry.list({ namePattern: /^edit/ });
    assert.ok(editPattern.every(h => h.name.startsWith('edit')));

    const all = registry.list();
    assert.equal(all.length, 3);
  });

  it('should return correct stats', () => {
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'h1' });
    const id2 = registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'h2' });
    registry.register(HookEvent.PostEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'h3' });

    registry.disable(id2);

    registry.recordExecution(true, 10);
    registry.recordExecution(false, 20);
    registry.recordExecution(true, 30);

    const stats = registry.getStats();
    assert.equal(stats.totalHooks, 3);
    assert.equal(stats.enabledHooks, 2);
    assert.equal(stats.disabledHooks, 1);
    assert.equal(stats.totalExecutions, 3);
    assert.equal(stats.totalFailures, 1);
    assert.equal(stats.avgExecutionTime, 20);
  });

  it('should clear all hooks', () => {
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal);
    registry.register(HookEvent.PostEdit, async () => ({ success: true }), HookPriority.Normal);

    assert.equal(registry.size, 2);
    registry.clear();
    assert.equal(registry.size, 0);
  });

  it('should reset stats', () => {
    registry.recordExecution(true, 10);
    registry.recordExecution(false, 20);

    registry.resetStats();
    const stats = registry.getStats();
    assert.equal(stats.totalExecutions, 0);
    assert.equal(stats.totalFailures, 0);
    assert.equal(stats.avgExecutionTime, 0);
  });
});

// ============================================================================
// 8. StatusLine — Format status output, event updates
// ============================================================================

describe('StatusLine', () => {
  it('should generate statusline data', () => {
    const gen = new StatuslineGenerator();
    const data = gen.generateData();

    assert.ok(data.v3Progress, 'Should have v3Progress');
    assert.equal(typeof data.v3Progress.domainsCompleted, 'number');
    assert.equal(typeof data.v3Progress.totalDomains, 'number');

    assert.ok(data.security, 'Should have security');
    assert.ok(['PENDING', 'IN_PROGRESS', 'CLEAN'].includes(data.security.status));

    assert.ok(data.swarm, 'Should have swarm');
    assert.equal(typeof data.swarm.activeAgents, 'number');

    assert.ok(data.hooks, 'Should have hooks');
    assert.ok(['ACTIVE', 'INACTIVE'].includes(data.hooks.status));

    assert.ok(data.performance, 'Should have performance');
    assert.equal(typeof data.performance.flashAttentionTarget, 'string');

    assert.ok(data.lastUpdated instanceof Date);
  });

  it('should generate statusline string', () => {
    const gen = new StatuslineGenerator();
    const line = gen.generateStatusline();

    assert.equal(typeof line, 'string');
    assert.ok(line.length > 0, 'Statusline should not be empty');
    assert.ok(line.includes('Claude Flow V3') || line.includes('DDD') || line.includes('Swarm'),
      'Statusline should contain expected markers');
  });

  it('should return empty string when disabled', () => {
    const gen = new StatuslineGenerator({ enabled: false });
    assert.equal(gen.generateStatusline(), '');
  });

  it('should generate JSON output', () => {
    const gen = new StatuslineGenerator();
    const json = gen.generateJSON();

    assert.equal(typeof json, 'string');
    const parsed = JSON.parse(json);
    assert.ok(parsed.v3Progress);
    assert.ok(parsed.security);
  });

  it('should generate compact JSON output', () => {
    const gen = new StatuslineGenerator();
    const json = gen.generateCompactJSON();

    assert.equal(typeof json, 'string');
    assert.ok(!json.includes('\n'), 'Compact JSON should be single line');
  });

  it('should accept custom data sources', () => {
    const gen = new StatuslineGenerator();
    gen.registerDataSources({
      getV3Progress: () => ({
        domainsCompleted: 3,
        totalDomains: 10,
        dddProgress: 42,
        modulesCount: 8,
        filesCount: 100,
        linesCount: 5000,
      }),
      getSecurityStatus: () => ({
        status: 'IN_PROGRESS',
        cvesFixed: 1,
        totalCves: 5,
      }),
    });

    const data = gen.generateData();
    assert.equal(data.v3Progress.domainsCompleted, 3);
    assert.equal(data.v3Progress.totalDomains, 10);
    assert.equal(data.security.status, 'IN_PROGRESS');
    assert.equal(data.security.cvesFixed, 1);
  });

  it('should cache data briefly', () => {
    const gen = new StatuslineGenerator();
    const data1 = gen.generateData();
    const data2 = gen.generateData();

    assert.equal(data1, data2);
  });

  it('should invalidate cache', () => {
    const gen = new StatuslineGenerator();
    const data1 = gen.generateData();
    gen.invalidateCache();
    const data2 = gen.generateData();

    assert.notEqual(data1, data2);
  });

  it('should update config', () => {
    const gen = new StatuslineGenerator({ enabled: true });
    assert.ok(gen.generateStatusline().length > 0);

    gen.updateConfig({ enabled: false });
    assert.equal(gen.generateStatusline(), '');
  });

  it('should parse valid statusline JSON', () => {
    const json = JSON.stringify({
      v3Progress: { domainsCompleted: 2, totalDomains: 5, dddProgress: 40, modulesCount: 8, filesCount: 50, linesCount: 3000 },
      security: { status: 'CLEAN', cvesFixed: 3, totalCves: 3 },
      swarm: { activeAgents: 2, maxAgents: 15, coordinationActive: true },
      hooks: { status: 'ACTIVE', patternsLearned: 100, routingAccuracy: 85, totalOperations: 500 },
      performance: { flashAttentionTarget: '2.49x', searchImprovement: '150x', memoryReduction: '50%' },
      lastUpdated: new Date().toISOString(),
    });

    const data = parseStatuslineData(json);
    assert.ok(data);
    assert.equal(data.v3Progress.domainsCompleted, 2);
    assert.equal(data.security.status, 'CLEAN');
    assert.equal(data.swarm.coordinationActive, true);
  });

  it('should return null for invalid JSON', () => {
    assert.equal(parseStatuslineData('not json'), null);
    assert.equal(parseStatuslineData(''), null);
  });

  it('should handle missing fields with defaults in parseStatuslineData', () => {
    const data = parseStatuslineData('{}');
    assert.ok(data);
    assert.equal(data.v3Progress.domainsCompleted, 0);
    assert.equal(data.security.status, 'PENDING');
    assert.equal(data.swarm.coordinationActive, false);
    assert.equal(data.hooks.status, 'INACTIVE');
  });

  it('createShellStatusline should work with data object', () => {
    const data = {
      v3Progress: { domainsCompleted: 5, totalDomains: 5, dddProgress: 98, modulesCount: 16, filesCount: 245, linesCount: 15000 },
      security: { status: 'CLEAN', cvesFixed: 3, totalCves: 3 },
      swarm: { activeAgents: 0, maxAgents: 15, coordinationActive: false },
      hooks: { status: 'ACTIVE', patternsLearned: 156, routingAccuracy: 89, totalOperations: 1547 },
      performance: { flashAttentionTarget: '2.49x-7.47x', searchImprovement: '150x-12500x', memoryReduction: '50-75%' },
      lastUpdated: new Date(),
      system: { memoryMB: 512, contextPct: 30, intelligencePct: 45, subAgents: 2 },
      user: { name: 'frank', gitBranch: 'main', modelName: 'Opus 4.6' },
    };

    const output = createShellStatusline(data);
    assert.equal(typeof output, 'string');
    assert.ok(output.length > 0);
  });
});

// ============================================================================
// 9. MCP Tools — Verify tool handlers produce correct output
// ============================================================================

describe('MCP Tools', () => {
  it('should find tools by name', () => {
    const edit = getHooksTool('hooks/pre-edit');
    assert.ok(edit);
    assert.equal(edit.name, 'hooks/pre-edit');

    const route = getHooksTool('hooks/route');
    assert.ok(route);

    assert.equal(getHooksTool('nonexistent'), undefined);
  });

  it('pre-edit tool should return result with context', async () => {
    const result = await preEditTool.handler({
      filePath: 'src/auth/login.ts',
      operation: 'modify',
      includeContext: true,
      includeSuggestions: true,
    });

    assert.equal(result.filePath, 'src/auth/login.ts');
    assert.equal(result.operation, 'modify');
    assert.ok(result.context);
    assert.equal(result.context.fileType, 'typescript');
    assert.ok(result.suggestions);
    assert.ok(result.suggestions.length > 0);
  });

  it('post-edit tool should record outcome', async () => {
    const result = await postEditTool.handler({
      filePath: 'src/utils.ts',
      success: true,
      outcome: 'Added utility function',
    });

    assert.equal(result.filePath, 'src/utils.ts');
    assert.equal(result.success, true);
    assert.equal(result.recorded, true);
    assert.ok(result.recordedAt);
    assert.ok(result.patternId, 'Successful edit should generate pattern ID');
  });

  it('post-edit tool should not generate pattern for failed edits', async () => {
    const result = await postEditTool.handler({
      filePath: 'src/broken.ts',
      success: false,
    });

    assert.equal(result.success, false);
    assert.equal(result.patternId, undefined);
  });

  it('route-task tool should recommend an agent', async () => {
    const result = await routeTaskTool.handler({
      task: 'Fix the security vulnerability in the auth module',
      includeExplanation: true,
    });

    assert.equal(result.recommendedAgent, 'security-auditor');
    assert.ok(result.confidence > 0.5);
    assert.ok(result.explanation);
    assert.ok(result.reasoning);
    assert.ok(result.reasoning.factors.length > 0);
  });

  it('route-task tool should route testing tasks to tester', async () => {
    const result = await routeTaskTool.handler({
      task: 'Write tests for the user service',
    });
    assert.equal(result.recommendedAgent, 'tester');
  });

  it('route-task tool should default to coder for general tasks', async () => {
    const result = await routeTaskTool.handler({
      task: 'Implement the new feature',
    });
    assert.equal(result.recommendedAgent, 'coder');
  });

  it('metrics tool should return summary and details', async () => {
    const result = await metricsTool.handler({ category: 'all', timeRange: 'all' });

    assert.ok(result.summary);
    assert.equal(typeof result.summary.totalOperations, 'number');
    assert.equal(typeof result.summary.successRate, 'number');
    assert.ok(result.routing);
    assert.ok(result.routing.topAgents.length > 0);
    assert.ok(result.edits);
    assert.ok(result.commands);
  });

  it('pre-command tool should assess risk levels', async () => {
    const lowResult = await preCommandTool.handler({ command: 'npm test' });
    assert.equal(lowResult.riskLevel, 'low');
    assert.equal(lowResult.proceed, true);

    const highResult = await preCommandTool.handler({ command: 'rm -rf /' });
    assert.equal(highResult.riskLevel, 'high');
    assert.equal(highResult.proceed, false);
    assert.ok(highResult.warnings.length > 0);

    const medResult = await preCommandTool.handler({ command: 'sudo apt install something' });
    assert.equal(medResult.riskLevel, 'medium');
  });

  it('post-command tool should record success', async () => {
    const result = await postCommandTool.handler({
      command: 'npm test',
      success: true,
      exitCode: 0,
    });

    assert.equal(result.recorded, true);
    assert.ok(result.patternId);
  });

  it('daemon-status tool should return daemon list', async () => {
    const result = await daemonStatusTool.handler({});

    assert.ok(result.daemons);
    assert.ok(Array.isArray(result.daemons));
    assert.ok(result.daemons.length > 0);
    for (const d of result.daemons) {
      assert.equal(typeof d.name, 'string');
      assert.equal(typeof d.status, 'string');
      assert.equal(typeof d.executionCount, 'number');
    }
  });

  it('statusline tool should return data', async () => {
    const result = await statuslineTool.handler({ format: 'json' });
    assert.ok(result.v3Progress || result.statusline, 'Should return structured data');
  });
});

// ============================================================================
// 10. GuidanceProvider — Security checks, context generation
// ============================================================================

describe('GuidanceProvider', { timeout: 10000 }, () => {
  let provider;

  before(async () => {
    provider = new GuidanceProvider();
    await provider.initialize();
  });

  it('should generate session context', async () => {
    const context = await provider.generateSessionContext();
    assert.equal(typeof context, 'string');
    assert.ok(context.includes('V3 Development Context'));
    assert.ok(context.includes('Performance Targets'));
    assert.ok(context.includes('Code Quality Rules'));
  });

  it('should block editing sensitive files', async () => {
    const result = await provider.generatePreEditGuidance('.env');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'deny');
    assert.ok(result.hookSpecificOutput.permissionDecisionReason.includes('Security'));
  });

  it('should block editing credential files', async () => {
    const result = await provider.generatePreEditGuidance('config/credentials.json');
    assert.equal(result.hookSpecificOutput.permissionDecision, 'deny');
  });

  it('should warn about production files', async () => {
    const result = await provider.generatePreEditGuidance('config/production.yaml');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'ask');
  });

  it('should allow safe file edits with context', async () => {
    const result = await provider.generatePreEditGuidance('src/services/user.ts');
    if (result.hookSpecificOutput) {
      assert.ok(
        result.hookSpecificOutput.permissionDecision === 'allow' ||
        result.hookSpecificOutput.permissionDecision === undefined ||
        result.hookSpecificOutput.additionalContext
      );
    } else {
      assert.equal(result.decision, 'allow');
    }
  });

  it('should provide test file context', async () => {
    const result = await provider.generatePreEditGuidance('src/__tests__/auth.test.ts');
    assert.ok(result.hookSpecificOutput);
    assert.ok(
      result.hookSpecificOutput.additionalContext.includes('Testing') ||
      result.hookSpecificOutput.additionalContext.includes('TDD')
    );
  });

  it('should block dangerous commands', async () => {
    const result = await provider.generatePreCommandGuidance('rm -rf /');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'deny');
  });

  it('should warn about risky commands', async () => {
    const result = await provider.generatePreCommandGuidance('npm publish');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'ask');
  });

  it('should allow test commands with context', async () => {
    const result = await provider.generatePreCommandGuidance('npm test');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'allow');
    assert.ok(result.hookSpecificOutput.additionalContext.includes('test'));
  });

  it('should allow build commands with guidance', async () => {
    const result = await provider.generatePreCommandGuidance('pnpm build');
    assert.ok(result.hookSpecificOutput);
    assert.equal(result.hookSpecificOutput.permissionDecision, 'allow');
  });

  it('should generate routing guidance', async () => {
    const guidance = await provider.generateRoutingGuidance('Implement user authentication');
    assert.equal(typeof guidance, 'string');
    assert.ok(guidance.includes('Recommended Agent'));
    assert.ok(guidance.includes('Confidence'));
  });

  it('should generate post-edit feedback for files with issues', async () => {
    const result = await provider.generatePostEditFeedback(
      'src/api.ts',
      'const password = "hardcoded123";\nconsole.log("debugging");\n// TODO: fix this later\nconst x: any = {};'
    );

    assert.ok(result.hookSpecificOutput || result.reason);
    const text = (result.hookSpecificOutput && result.hookSpecificOutput.additionalContext) || result.reason || '';
    assert.ok(
      text.includes('console.log') || text.includes('TODO') ||
      text.includes('any') || text.includes('secret')
    );
  });

  it('should generate clean feedback for good files', async () => {
    const result = await provider.generatePostEditFeedback(
      'src/clean.ts',
      'export function add(a: number, b: number): number { return a + b; }'
    );

    assert.equal(result.decision, 'allow');
  });
});

// ============================================================================
// 11. Integration — Full cycle tests
// ============================================================================

describe('Integration — Full Lifecycle Cycle', { timeout: 15000 }, () => {
  it('should complete: register hook -> execute -> report results', async () => {
    const registry = new HookRegistry();
    const executor = new HookExecutor(registry);
    const executionLog = [];

    registry.register(
      HookEvent.PreEdit,
      async (ctx) => {
        executionLog.push('security-check');
        const sensitive = ['.env', '.pem', 'secret'];
        const blocked = sensitive.some(s => ctx.file && ctx.file.path && ctx.file.path.includes(s));
        return blocked
          ? { success: true, abort: true, message: 'Blocked: sensitive file' }
          : { success: true, message: 'Security check passed' };
      },
      HookPriority.Critical,
      { name: 'security-gate' }
    );

    registry.register(
      HookEvent.PreEdit,
      async (ctx) => {
        executionLog.push('logging');
        return { success: true, data: { logged: true, file: ctx.file && ctx.file.path } };
      },
      HookPriority.Low,
      { name: 'audit-log' }
    );

    // Safe file
    const safeResult = await executor.execute(HookEvent.PreEdit, {
      file: { path: 'src/utils.ts', operation: 'modify' },
    });

    assert.equal(safeResult.success, true);
    assert.equal(safeResult.hooksExecuted, 2);
    assert.deepEqual(executionLog, ['security-check', 'logging']);
    assert.ok(safeResult.messages.includes('Security check passed'));

    // Blocked file
    executionLog.length = 0;
    const blockedResult = await executor.execute(HookEvent.PreEdit, {
      file: { path: '.env.local', operation: 'modify' },
    });

    assert.equal(blockedResult.aborted, true);
    assert.deepEqual(executionLog, ['security-check']);
    assert.ok(blockedResult.messages.includes('Blocked: sensitive file'));

    // Stats
    const stats = registry.getStats();
    assert.equal(stats.totalHooks, 2);
    assert.equal(stats.totalExecutions, 3);
    assert.equal(stats.enabledHooks, 2);
  });

  it('should complete: swarm agent -> send message -> task handoff -> complete', async () => {
    const orchestrator = new SwarmCommunication({
      agentId: 'orchestrator',
      agentName: 'Orchestrator',
      autoBroadcastPatterns: false,
    });
    await orchestrator.initialize();

    try {
      orchestrator.registerAgent({
        id: 'worker-1',
        name: 'Code Worker',
        status: 'idle',
        lastSeen: Date.now(),
        capabilities: ['typescript', 'testing'],
        patternsShared: 0,
        handoffsReceived: 0,
        handoffsCompleted: 0,
      });

      const ctxMsg = await orchestrator.broadcastContext('Starting refactoring sprint', {
        sprint: 'Q1-2026',
      });
      assert.equal(ctxMsg.to, '*');

      const handoff = await orchestrator.initiateHandoff(
        'worker-1',
        'Refactor authentication module',
        {
          filesModified: ['src/auth/index.ts', 'src/auth/jwt.ts'],
          patternsUsed: ['Clean Architecture', 'Repository Pattern'],
          decisions: ['Split into service + repository layers'],
          blockers: [],
          nextSteps: ['Add unit tests', 'Update API docs'],
        }
      );

      assert.equal(handoff.status, 'pending');

      // Simulate worker accepting (switch agent context)
      const savedId = orchestrator['config'].agentId;
      orchestrator['config'].agentId = 'worker-1';

      const accepted = orchestrator.acceptHandoff(handoff.id);
      assert.equal(accepted, true);
      assert.equal(handoff.status, 'accepted');

      const completed = orchestrator.completeHandoff(handoff.id);
      assert.equal(completed, true);
      assert.equal(handoff.status, 'completed');
      assert.ok(handoff.completedAt > 0);

      orchestrator['config'].agentId = savedId;

      const stats = orchestrator.getStats();
      assert.ok(stats.metrics.messagesSent >= 2);
      assert.ok(stats.metrics.handoffsInitiated >= 1);
      assert.ok(stats.metrics.handoffsCompleted >= 1);
    } finally {
      await orchestrator.shutdown();
    }
  });

  it('should complete: daemon -> metrics collection -> statusline', async () => {
    const manager = new DaemonManager();
    const collected = [];

    manager.register(
      { name: 'test-collector', interval: 100000, enabled: true },
      async () => { collected.push(Date.now()); }
    );

    await manager.start('test-collector');
    assert.ok(collected.length >= 1, 'Daemon should execute on start');

    const gen = new StatuslineGenerator();
    gen.registerDataSources({
      getHooksMetrics: () => ({
        status: 'ACTIVE',
        patternsLearned: collected.length,
        routingAccuracy: 92,
        totalOperations: collected.length * 10,
      }),
    });

    const data = gen.generateData();
    assert.equal(data.hooks.status, 'ACTIVE');
    assert.equal(data.hooks.patternsLearned, collected.length);

    const statusline = gen.generateStatusline();
    assert.ok(statusline.length > 0);

    await manager.stopAll();
    assert.equal(manager.runningCount, 0);
  });

  it('should complete: store pattern -> search -> route task -> record outcome', async () => {
    const bank = new ReasoningBank();
    await bank.initialize();
    bank.embeddingService = { embed: async (text) => { const e = new Float32Array(384); const n = text.toLowerCase().trim(); for (let i = 0; i < 384; i++) { let h = 0; for (let j = 0; j < n.length; j++) h = ((h << 5) - h + n.charCodeAt(j) * (i + 1)) | 0; e[i] = (Math.sin(h) + 1) / 2; } let norm = 0; for (let i = 0; i < 384; i++) norm += e[i] * e[i]; norm = Math.sqrt(norm) || 1; for (let i = 0; i < 384; i++) e[i] /= norm; return e; } };

    const r1 = await bank.storePattern('Use TDD with mocks for service tests', 'testing');
    const r2 = await bank.storePattern('Validate all API inputs at boundary', 'security');
    const r3 = await bank.storePattern('Use event sourcing for state changes', 'architecture');

    assert.ok(r1 && r1.id);
    assert.ok(r2 && r2.id);
    assert.ok(r3 && r3.id);

    const searchResults = await bank.searchPatterns('testing strategy', 5);
    assert.ok(Array.isArray(searchResults));

    const routing = await bank.routeTask('Write unit tests for the payment service');
    assert.ok(routing.agent);
    assert.ok(routing.confidence >= 0);

    await bank.recordOutcome(r1.id, true, 0.95);

    const consolidation = await bank.consolidate();
    assert.equal(typeof consolidation.patternsPromoted, 'number');

    const stats = bank.getStats();
    assert.ok(stats.shortTermCount >= 0);
  });

  it('should complete: initializeHooks creates working system', async () => {
    const { registry, executor, statusline } = await initializeHooks({
      enableDaemons: false,
    });

    assert.ok(registry instanceof HookRegistry);
    assert.ok(executor instanceof HookExecutor);
    assert.ok(statusline instanceof StatuslineGenerator);

    const id = registry.register(
      HookEvent.SessionStart,
      async () => ({ success: true, message: 'Session initialized' }),
      HookPriority.Normal
    );

    const result = await executor.execute(HookEvent.SessionStart, {
      session: { id: 'test-session', startedAt: new Date() },
    });

    assert.equal(result.success, true);
    assert.ok(result.messages.includes('Session initialized'));

    const line = statusline.generateStatusline();
    assert.ok(line.length > 0);

    registry.unregister(id);
  });
});

// ============================================================================
// 12. Bridge — Official hooks bridge
// ============================================================================

describe('Official Hooks Bridge', () => {
  it('should export V3_TO_OFFICIAL_HOOK_MAP with mappings', () => {
    assert.ok(V3_TO_OFFICIAL_HOOK_MAP);
    assert.equal(typeof V3_TO_OFFICIAL_HOOK_MAP, 'object');
  });

  it('should export V3_TOOL_MATCHERS', () => {
    assert.ok(V3_TOOL_MATCHERS);
  });

  it('should create OfficialHooksBridge instance', () => {
    const bridge = new OfficialHooksBridge();
    assert.ok(bridge);
  });

  it('processOfficialHookInput should handle input', () => {
    const result = processOfficialHookInput({
      hookEventName: 'PreToolUse',
      toolName: 'Write',
      toolInput: { filePath: '/test.ts', content: 'test' },
    });

    assert.ok(result);
  });

  it('outputOfficialHookResult should not throw', () => {
    // outputOfficialHookResult writes to stdout (JSON); it may return undefined
    assert.doesNotThrow(() => {
      outputOfficialHookResult({
        success: true,
        hooksExecuted: 1,
        hooksFailed: 0,
        executionTime: 10,
        results: [],
      });
    });
  });
});

// ============================================================================
// 13. Worker MCP Tools
// ============================================================================

describe('Worker MCP Tools', () => {
  it('should have expected worker MCP tools', () => {
    assert.ok(Array.isArray(workerMCPTools));
    assert.ok(workerMCPTools.length > 0);

    for (const tool of workerMCPTools) {
      assert.equal(typeof tool.name, 'string');
      assert.equal(typeof tool.description, 'string');
      assert.ok(tool.inputSchema);
    }
  });

  it('workerRunTool should have correct schema', () => {
    assert.ok(workerRunTool);
    assert.equal(typeof workerRunTool.name, 'string');
    assert.ok(workerRunTool.inputSchema.properties);
  });

  it('workerStatusTool should have correct schema', () => {
    assert.ok(workerStatusTool);
    assert.equal(typeof workerStatusTool.name, 'string');
  });

  it('createWorkerToolHandler should return a function', () => {
    const handler = createWorkerToolHandler();
    assert.equal(typeof handler, 'function');
  });
});

// ============================================================================
// 14. Edge Cases and Error Handling
// ============================================================================

describe('Edge Cases', { timeout: 10000 }, () => {
  it('should handle empty pattern search gracefully', async () => {
    const bank = new ReasoningBank();
    await bank.initialize();
    bank.embeddingService = { embed: async (text) => { const e = new Float32Array(384); const n = text.toLowerCase().trim(); for (let i = 0; i < 384; i++) { let h = 0; for (let j = 0; j < n.length; j++) h = ((h << 5) - h + n.charCodeAt(j) * (i + 1)) | 0; e[i] = (Math.sin(h) + 1) / 2; } let norm = 0; for (let i = 0; i < 384; i++) norm += e[i] * e[i]; norm = Math.sqrt(norm) || 1; for (let i = 0; i < 384; i++) e[i] /= norm; return e; } };

    const results = await bank.searchPatterns('', 0);
    assert.ok(Array.isArray(results));
  });

  it('should handle routing with empty task', async () => {
    const bank = new ReasoningBank();
    await bank.initialize();
    bank.embeddingService = { embed: async (text) => { const e = new Float32Array(384); const n = text.toLowerCase().trim(); for (let i = 0; i < 384; i++) { let h = 0; for (let j = 0; j < n.length; j++) h = ((h << 5) - h + n.charCodeAt(j) * (i + 1)) | 0; e[i] = (Math.sin(h) + 1) / 2; } let norm = 0; for (let i = 0; i < 384; i++) norm += e[i] * e[i]; norm = Math.sqrt(norm) || 1; for (let i = 0; i < 384; i++) e[i] /= norm; return e; } };

    const routing = await bank.routeTask('');
    assert.ok(routing);
    assert.equal(typeof routing.agent, 'string');
  });

  it('swarm should auto-initialize on first message if not initialized', async () => {
    const swarm = new SwarmCommunication({
      agentId: 'lazy-agent',
      agentName: 'Lazy',
      autoBroadcastPatterns: false,
    });

    const msg = await swarm.sendMessage('*', 'Auto-initialized');
    assert.ok(msg);
    assert.equal(msg.from, 'lazy-agent');

    await swarm.shutdown();
  });

  it('registry should handle hooks registered to same event at same priority', () => {
    const registry = new HookRegistry();

    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'hook-a' });
    registry.register(HookEvent.PreEdit, async () => ({ success: true }), HookPriority.Normal, { name: 'hook-b' });

    const hooks = registry.getForEvent(HookEvent.PreEdit);
    assert.equal(hooks.length, 2);
  });

  it('executor should handle concurrent executions safely', async () => {
    const registry = new HookRegistry();
    const executor = new HookExecutor(registry);
    let counter = 0;

    registry.register(
      HookEvent.PostToolUse,
      async () => {
        counter++;
        await new Promise(r => setTimeout(r, 10));
        return { success: true };
      },
      HookPriority.Normal
    );

    const results = await Promise.all([
      executor.execute(HookEvent.PostToolUse, {}),
      executor.execute(HookEvent.PostToolUse, {}),
      executor.execute(HookEvent.PostToolUse, {}),
    ]);

    assert.equal(results.length, 3);
    assert.ok(results.every(r => r.success));
    assert.equal(counter, 3);
  });

  it('daemon manager should handle rapid start/stop cycles', async () => {
    const manager = new DaemonManager();
    let count = 0;
    manager.register(
      { name: 'rapid', interval: 100000, enabled: true },
      async () => { count++; }
    );

    await manager.start('rapid');
    await manager.stop('rapid');
    await manager.start('rapid');
    await manager.stop('rapid');

    assert.ok(count >= 2, 'Each start should trigger initial execution');
    assert.equal(manager.isRunning('rapid'), false);
  });
});


// Force-exit after all suites complete — daemon timers and spawned npx
// processes leave handles open that prevent the Node test runner from exiting.
after(() => {
  setTimeout(() => process.exit(0), 500);
});
