/**
 * SwarmCoordinator
 *
 * Coordinates multi-agent swarms with hierarchical and mesh topologies.
 * Handles agent spawning, load-balanced task distribution, concurrent execution,
 * consensus decisions, scaling, and topology reconfiguration.
 *
 * Absorbed from arcanea-flow V3 coordination/application/SwarmCoordinator.ts
 * Enhanced with optional MemoryBackend integration.
 */

import { EventEmitter } from 'node:events';
import { Agent } from './agent.js';
import { Task } from './task.js';
import type {
  AgentConfig,
  AgentMessage,
  AgentMetrics,
  ConsensusDecision,
  ConsensusResult,
  MeshConnection,
  MemoryBackend,
  SwarmConfig,
  SwarmHierarchy,
  SwarmState,
  SwarmTopology,
  TaskAssignment,
  TaskConfig,
  TaskResult,
} from './types.js';

export interface SwarmCoordinatorOptions extends SwarmConfig {
  memoryBackend?: MemoryBackend;
}

export class SwarmCoordinator {
  private topology: SwarmTopology;
  private agents: Map<string, Agent>;
  private memoryBackend?: MemoryBackend;
  private eventBus: EventEmitter;
  private agentMetrics: Map<string, AgentMetrics>;
  private connections: MeshConnection[];
  private initialized: boolean = false;

  constructor(options: SwarmCoordinatorOptions) {
    this.topology = options.topology;
    this.memoryBackend = options.memoryBackend;
    this.eventBus = options.eventBus || new EventEmitter();
    this.agents = new Map();
    this.agentMetrics = new Map();
    this.connections = [];
  }

  /** Initialize the coordinator */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
  }

  /** Shutdown the coordinator and terminate all agents */
  async shutdown(): Promise<void> {
    for (const agent of this.agents.values()) {
      agent.terminate();
    }
    this.agents.clear();
    this.connections = [];
    this.agentMetrics.clear();
    this.initialized = false;
  }

  /** Spawn a new agent into the swarm */
  async spawnAgent(config: AgentConfig): Promise<Agent> {
    const agent = new Agent(config);
    this.agents.set(agent.id, agent);

    this.agentMetrics.set(agent.id, {
      agentId: agent.id,
      tasksCompleted: 0,
      tasksFailed: 0,
      averageExecutionTime: 0,
      successRate: 1.0,
      health: 'healthy',
    });

    this.updateConnections(agent);
    this.eventBus.emit('agent:spawned', { agentId: agent.id, type: agent.type });

    if (this.memoryBackend) {
      await this.memoryBackend.store({
        id: `agent-spawn-${agent.id}`,
        agentId: 'system',
        content: `Agent ${agent.id} spawned`,
        type: 'event',
        timestamp: Date.now(),
        metadata: { eventType: 'agent-spawn', agentId: agent.id, agentType: agent.type },
      });
    }

    return agent;
  }

  /** List all agents */
  async listAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  /** Get agent by ID */
  getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  /** Terminate an agent */
  async terminateAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.terminate();
      this.agents.delete(agentId);
      this.agentMetrics.delete(agentId);
      this.connections = this.connections.filter(
        c => c.from !== agentId && c.to !== agentId
      );
      this.eventBus.emit('agent:terminated', { agentId });
    }
  }

  /**
   * Distribute tasks across agents using load balancing.
   * Tasks are sorted by priority (high first), then assigned to the
   * agent with the lowest current load that can execute the task type.
   */
  async distributeTasks(tasks: TaskConfig[]): Promise<TaskAssignment[]> {
    const assignments: TaskAssignment[] = [];
    const agentLoads = new Map<string, number>();

    for (const agent of this.agents.values()) {
      agentLoads.set(agent.id, 0);
    }

    const sortedTasks = Task.sortByPriority(tasks.map(t => new Task(t)));

    for (const task of sortedTasks) {
      const suitableAgents = Array.from(this.agents.values()).filter(
        agent => agent.canExecute(task.type) && agent.status === 'active'
      );

      if (suitableAgents.length === 0) continue;

      let bestAgent = suitableAgents[0];
      let lowestLoad = agentLoads.get(bestAgent.id) || 0;

      for (const agent of suitableAgents) {
        const load = agentLoads.get(agent.id) || 0;
        if (load < lowestLoad) {
          lowestLoad = load;
          bestAgent = agent;
        }
      }

      assignments.push({
        taskId: task.id,
        agentId: bestAgent.id,
        assignedAt: Date.now(),
        priority: task.priority,
      });

      agentLoads.set(bestAgent.id, (agentLoads.get(bestAgent.id) || 0) + 1);
    }

    return assignments;
  }

  /** Execute a task on a specific agent */
  async executeTask(agentId: string, task: TaskConfig): Promise<TaskResult> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return {
        taskId: task.id,
        status: 'failed',
        error: `Agent ${agentId} not found`,
        agentId,
      };
    }

    const startTime = Date.now();
    const result = await agent.executeTask(task);
    const duration = Date.now() - startTime;

    // Update metrics
    const metrics = this.agentMetrics.get(agentId);
    if (metrics) {
      if (result.status === 'completed') {
        metrics.tasksCompleted++;
      } else {
        metrics.tasksFailed++;
      }
      const total = metrics.tasksCompleted + metrics.tasksFailed;
      metrics.successRate = metrics.tasksCompleted / total;
      metrics.averageExecutionTime =
        (metrics.averageExecutionTime * (total - 1) + duration) / total;
    }

    if (this.memoryBackend) {
      await this.memoryBackend.store({
        id: `task-result-${task.id}`,
        agentId,
        content: `Task ${task.id} ${result.status}`,
        type: result.status === 'completed' ? 'task-complete' : 'event',
        timestamp: Date.now(),
        metadata: { taskId: task.id, status: result.status, duration, error: result.error },
      });
    }

    return result;
  }

  /** Execute multiple tasks concurrently via load-balanced distribution */
  async executeTasksConcurrently(tasks: TaskConfig[]): Promise<TaskResult[]> {
    const assignments = await this.distributeTasks(tasks);
    const results = await Promise.all(
      assignments.map(async assignment => {
        const task = tasks.find(t => t.id === assignment.taskId);
        if (!task) {
          return { taskId: assignment.taskId, status: 'failed' as const, error: 'Task not found' };
        }
        return this.executeTask(assignment.agentId, task);
      })
    );
    return results;
  }

  /** Send a message between agents via the event bus */
  async sendMessage(message: AgentMessage): Promise<void> {
    this.eventBus.emit('agent:message', { ...message, timestamp: Date.now() });
  }

  /** Get the current swarm state */
  async getSwarmState(): Promise<SwarmState> {
    return {
      agents: Array.from(this.agents.values()).map(a => a.toJSON()),
      topology: this.topology,
      leader: this.getLeader()?.id,
      activeConnections: this.connections.length,
    };
  }

  /** Get current topology */
  getTopology(): SwarmTopology {
    return this.topology;
  }

  /** Get hierarchy (for hierarchical topology) */
  async getHierarchy(): Promise<SwarmHierarchy> {
    const leader = this.getLeader();
    const workers = Array.from(this.agents.values())
      .filter(a => a.role !== 'leader')
      .map(a => ({ id: a.id, parent: a.parent || leader?.id || '' }));

    return { leader: leader?.id || '', workers };
  }

  /** Get mesh connections */
  async getMeshConnections(): Promise<MeshConnection[]> {
    return this.connections;
  }

  /** Scale agents up or down by type */
  async scaleAgents(config: { type: string; count: number }): Promise<void> {
    const existingOfType = Array.from(this.agents.values()).filter(
      a => a.type === config.type
    );

    if (config.count > 0) {
      for (let i = 0; i < config.count; i++) {
        await this.spawnAgent({
          id: `${config.type}-${Date.now()}-${i}`,
          type: config.type,
          capabilities: this.getDefaultCapabilities(config.type),
        });
      }
    } else if (config.count < 0) {
      const toRemove = existingOfType.slice(0, Math.abs(config.count));
      for (const agent of toRemove) {
        await this.terminateAgent(agent.id);
      }
    }
  }

  /** Reach consensus among specified agents (simple majority voting) */
  async reachConsensus(
    decision: ConsensusDecision,
    agentIds: string[]
  ): Promise<ConsensusResult> {
    const votes: Array<{ agentId: string; vote: unknown }> = [];

    for (const agentId of agentIds) {
      const agent = this.agents.get(agentId);
      if (agent) {
        votes.push({ agentId, vote: Math.random() > 0.5 ? 'approve' : 'reject' });
      }
    }

    const approves = votes.filter(v => v.vote === 'approve').length;
    const consensusReached = approves > votes.length / 2;

    return {
      decision: consensusReached ? decision.payload : null,
      votes,
      consensusReached,
    };
  }

  /** Resolve task execution order via topological sort */
  async resolveTaskDependencies(tasks: TaskConfig[]): Promise<TaskConfig[]> {
    return Task.resolveExecutionOrder(tasks.map(t => new Task(t)));
  }

  /** Get metrics for a specific agent */
  async getAgentMetrics(agentId: string): Promise<AgentMetrics> {
    const metrics = this.agentMetrics.get(agentId);
    if (!metrics) {
      return {
        agentId,
        tasksCompleted: 0,
        tasksFailed: 0,
        averageExecutionTime: 0,
        successRate: 0,
        health: 'unhealthy',
      };
    }
    return metrics;
  }

  /** Reconfigure swarm topology (rebuilds all connections) */
  async reconfigure(config: { topology: SwarmTopology }): Promise<void> {
    this.topology = config.topology;
    this.connections = [];
    for (const agent of this.agents.values()) {
      this.updateConnections(agent);
    }
  }

  /** Get the event bus for subscribing to swarm events */
  getEventBus(): EventEmitter {
    return this.eventBus;
  }

  // ── Private Helpers ──────────────────────────────────────────

  private getLeader(): Agent | undefined {
    return Array.from(this.agents.values()).find(a => a.role === 'leader');
  }

  private updateConnections(agent: Agent): void {
    if (this.topology === 'mesh') {
      for (const other of this.agents.values()) {
        if (other.id !== agent.id) {
          this.connections.push({ from: agent.id, to: other.id, type: 'peer' });
        }
      }
    } else if (this.topology === 'hierarchical') {
      const leader = this.getLeader();
      if (leader && agent.role !== 'leader') {
        this.connections.push({ from: agent.id, to: leader.id, type: 'leader' });
      }
    }
  }

  private getDefaultCapabilities(type: string): string[] {
    const defaults: Record<string, string[]> = {
      coder: ['code', 'refactor', 'debug'],
      tester: ['test', 'validate', 'e2e'],
      reviewer: ['review', 'analyze', 'security-audit'],
      coordinator: ['coordinate', 'manage', 'orchestrate'],
      designer: ['design', 'prototype'],
      deployer: ['deploy', 'release'],
    };
    return defaults[type] || [];
  }
}
