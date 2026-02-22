/**
 * Agent Domain Entity
 *
 * Represents an AI agent in the swarm coordination system.
 * Handles lifecycle (active → busy → idle → terminated),
 * capability checking, and task execution.
 *
 * Absorbed from arcanea-flow V3 agent-lifecycle/domain/Agent.ts
 */

import type {
  AgentConfig,
  AgentStatus,
  AgentRole,
  AgentType,
  IAgent,
  TaskConfig,
  TaskResult,
} from './types.js';

export class Agent implements IAgent {
  public readonly id: string;
  public readonly type: AgentType;
  public status: AgentStatus;
  public capabilities: string[];
  public role?: AgentRole;
  public parent?: string;
  public metadata?: Record<string, unknown>;
  public createdAt: number;
  public lastActive: number;

  constructor(config: AgentConfig) {
    this.id = config.id;
    this.type = config.type;
    this.status = 'active';
    this.capabilities = config.capabilities || [];
    this.role = config.role;
    this.parent = config.parent;
    this.metadata = config.metadata || {};
    this.createdAt = Date.now();
    this.lastActive = Date.now();
  }

  /**
   * Execute a task assigned to this agent.
   * Actual work is done via task.onExecute() callback — the agent provides
   * lifecycle management (status transitions, timing, error handling).
   */
  async executeTask(task: TaskConfig): Promise<TaskResult> {
    if (this.status !== 'active' && this.status !== 'idle') {
      return {
        taskId: task.id,
        status: 'failed',
        error: `Agent ${this.id} is not available (status: ${this.status})`,
        agentId: this.id,
      };
    }

    const startTime = Date.now();
    this.status = 'busy';
    this.lastActive = startTime;

    try {
      if (task.onExecute) {
        await task.onExecute();
      }

      // Minimal processing overhead based on priority
      const overhead: Record<string, number> = { high: 1, medium: 5, low: 10 };
      await new Promise(resolve => setTimeout(resolve, overhead[task.priority] || 5));

      const duration = Date.now() - startTime;
      this.status = 'active';
      this.lastActive = Date.now();

      return {
        taskId: task.id,
        status: 'completed',
        result: `Task ${task.id} completed successfully`,
        duration,
        agentId: this.id,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      this.status = 'active';

      return {
        taskId: task.id,
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        duration,
        agentId: this.id,
      };
    }
  }

  /** Check if agent has a specific capability */
  hasCapability(capability: string): boolean {
    return this.capabilities.includes(capability);
  }

  /** Check if agent can execute a given task type */
  canExecute(taskType: string): boolean {
    const typeToCapability: Record<string, string> = {
      code: 'code',
      test: 'test',
      review: 'review',
      design: 'design',
      deploy: 'deploy',
      refactor: 'refactor',
      debug: 'debug',
    };
    const required = typeToCapability[taskType];
    return required ? this.hasCapability(required) : true;
  }

  /** Terminate the agent */
  terminate(): void {
    this.status = 'terminated';
    this.lastActive = Date.now();
  }

  /** Mark agent as idle */
  setIdle(): void {
    if (this.status === 'active' || this.status === 'busy') {
      this.status = 'idle';
      this.lastActive = Date.now();
    }
  }

  /** Activate the agent */
  activate(): void {
    if (this.status !== 'terminated') {
      this.status = 'active';
      this.lastActive = Date.now();
    }
  }

  /** Serialize to plain object */
  toJSON(): IAgent {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      capabilities: this.capabilities,
      role: this.role,
      parent: this.parent,
      metadata: this.metadata,
      createdAt: this.createdAt,
      lastActive: this.lastActive,
    };
  }

  /** Factory method */
  static fromConfig(config: AgentConfig): Agent {
    return new Agent(config);
  }
}
