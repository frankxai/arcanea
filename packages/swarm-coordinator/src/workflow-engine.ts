/**
 * WorkflowEngine
 *
 * Executes and manages workflows with support for dependency ordering,
 * parallelism, rollback, pause/resume, distributed execution, and debug info.
 *
 * Absorbed from arcanea-flow V3 task-execution/application/WorkflowEngine.ts
 */

import { EventEmitter } from 'node:events';
import { Task } from './task.js';
import type { SwarmCoordinator } from './swarm-coordinator.js';
import type {
  MemoryBackend,
  TaskConfig,
  TaskResult,
  WorkflowDebugInfo,
  WorkflowDefinition,
  WorkflowMetrics,
  WorkflowResult,
  WorkflowState,
} from './types.js';

export interface WorkflowEngineOptions {
  coordinator: SwarmCoordinator;
  memoryBackend?: MemoryBackend;
  eventBus?: EventEmitter;
}

interface WorkflowExecution {
  id: string;
  state: WorkflowState;
  promise?: Promise<WorkflowResult>;
  executionOrder: string[];
  taskTimings: Record<string, { start: number; end: number; duration: number }>;
  eventLog: Array<{ timestamp: number; event: string; data: unknown }>;
}

export class WorkflowEngine {
  private coordinator: SwarmCoordinator;
  private memoryBackend?: MemoryBackend;
  private eventBus: EventEmitter;
  private workflows: Map<string, WorkflowExecution>;
  private initialized: boolean = false;

  constructor(options: WorkflowEngineOptions) {
    this.coordinator = options.coordinator;
    this.memoryBackend = options.memoryBackend;
    this.eventBus = options.eventBus || new EventEmitter();
    this.workflows = new Map();
  }

  /** Initialize the workflow engine */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
  }

  /** Shutdown — cancels all running workflows */
  async shutdown(): Promise<void> {
    for (const execution of this.workflows.values()) {
      if (execution.state.status === 'in-progress') {
        execution.state.status = 'cancelled';
      }
    }
    this.workflows.clear();
    this.initialized = false;
  }

  /** Execute a single task via the coordinator */
  async executeTask(task: TaskConfig, agentId: string): Promise<TaskResult> {
    if (this.memoryBackend) {
      await this.memoryBackend.store({
        id: `task-start-${task.id}`,
        agentId,
        content: `Task ${task.id} started`,
        type: 'task-start',
        timestamp: Date.now(),
        metadata: { taskId: task.id, agentId },
      });
    }

    const result = await this.coordinator.executeTask(agentId, task);

    if (this.memoryBackend) {
      await this.memoryBackend.store({
        id: `task-complete-${task.id}`,
        agentId,
        content: `Task ${task.id} ${result.status}`,
        type: 'task-complete',
        timestamp: Date.now(),
        metadata: { taskId: task.id, agentId, status: result.status, duration: result.duration },
      });
    }

    return result;
  }

  /** Execute a full workflow with dependency ordering */
  async executeWorkflow(workflow: WorkflowDefinition): Promise<WorkflowResult> {
    const execution = this.createExecution(workflow);
    this.workflows.set(workflow.id, execution);

    this.eventBus.emit('workflow:started', {
      workflowId: workflow.id,
      taskCount: workflow.tasks.length,
    });

    execution.eventLog.push({
      timestamp: Date.now(),
      event: 'workflow:started',
      data: { workflowId: workflow.id },
    });

    try {
      const result = await this.runWorkflow(execution, workflow);

      this.eventBus.emit('workflow:completed', { workflowId: workflow.id, result });
      return result;
    } catch (error) {
      const failedResult: WorkflowResult = {
        id: workflow.id,
        status: 'failed',
        tasksCompleted: execution.state.completedTasks.length,
        errors: [error instanceof Error ? error : new Error(String(error))],
        executionOrder: execution.executionOrder,
      };

      if (workflow.rollbackOnFailure) {
        await this.rollbackWorkflow(execution, workflow);
      }

      this.eventBus.emit('workflow:failed', { workflowId: workflow.id, error });
      return failedResult;
    }
  }

  /** Start a workflow (returns promise for later await) */
  startWorkflow(workflow: WorkflowDefinition): Promise<WorkflowResult> {
    const promise = this.executeWorkflow(workflow);
    const execution = this.workflows.get(workflow.id);
    if (execution) {
      execution.promise = promise;
    }
    return promise;
  }

  /** Pause a running workflow */
  async pauseWorkflow(workflowId: string): Promise<void> {
    const execution = this.workflows.get(workflowId);
    if (execution && execution.state.status === 'in-progress') {
      execution.state.status = 'paused';
      execution.eventLog.push({
        timestamp: Date.now(),
        event: 'workflow:paused',
        data: { workflowId },
      });
    }
  }

  /** Resume a paused workflow */
  async resumeWorkflow(workflowId: string): Promise<void> {
    const execution = this.workflows.get(workflowId);
    if (execution && execution.state.status === 'paused') {
      execution.state.status = 'in-progress';
      execution.eventLog.push({
        timestamp: Date.now(),
        event: 'workflow:resumed',
        data: { workflowId },
      });
    }
  }

  /** Get workflow state */
  async getWorkflowState(workflowId: string): Promise<WorkflowState> {
    const execution = this.workflows.get(workflowId);
    if (!execution) {
      throw new Error(`Workflow ${workflowId} not found`);
    }
    return execution.state;
  }

  /** Execute tasks in parallel via the coordinator */
  async executeParallel(tasks: TaskConfig[]): Promise<TaskResult[]> {
    return this.coordinator.executeTasksConcurrently(tasks);
  }

  /** Execute a distributed workflow across multiple coordinators */
  async executeDistributedWorkflow(
    workflow: WorkflowDefinition,
    coordinators: SwarmCoordinator[]
  ): Promise<WorkflowResult> {
    const tasksPerCoordinator = Math.ceil(workflow.tasks.length / coordinators.length);
    const results: TaskResult[] = [];
    const errors: Error[] = [];

    const taskChunks: TaskConfig[][] = [];
    for (let i = 0; i < workflow.tasks.length; i += tasksPerCoordinator) {
      taskChunks.push(workflow.tasks.slice(i, i + tasksPerCoordinator));
    }

    await Promise.all(
      taskChunks.map(async (tasks, index) => {
        const coordinator = coordinators[index % coordinators.length];
        for (const task of tasks) {
          const agents = await coordinator.listAgents();
          if (agents.length > 0) {
            const result = await coordinator.executeTask(agents[0].id, task);
            results.push(result);
            if (result.status === 'failed') {
              errors.push(new Error(result.error || 'Task failed'));
            }
          }
        }
      })
    );

    return {
      id: workflow.id,
      status: errors.length === 0 ? 'completed' : 'failed',
      tasksCompleted: results.filter(r => r.status === 'completed').length,
      errors,
      executionOrder: workflow.tasks.map(t => t.id),
    };
  }

  /** Get workflow metrics */
  async getWorkflowMetrics(workflowId: string): Promise<WorkflowMetrics> {
    const execution = this.workflows.get(workflowId);
    if (!execution) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const totalTasks = execution.state.tasks.length;
    const completedTasks = execution.state.completedTasks.length;
    const durations = Object.values(execution.taskTimings).map(t => t.duration);
    const totalDuration = durations.reduce((a, b) => a + b, 0);
    const averageDuration = durations.length > 0 ? totalDuration / durations.length : 0;

    return {
      tasksTotal: totalTasks,
      tasksCompleted: completedTasks,
      totalDuration,
      averageTaskDuration: averageDuration,
      successRate: totalTasks > 0 ? completedTasks / totalTasks : 0,
    };
  }

  /** Get workflow debug info */
  async getWorkflowDebugInfo(workflowId: string): Promise<WorkflowDebugInfo> {
    const execution = this.workflows.get(workflowId);
    if (!execution) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    return {
      executionTrace: execution.executionOrder.map(taskId => ({
        taskId,
        timestamp: execution.taskTimings[taskId]?.start || Date.now(),
        action: 'execute',
      })),
      taskTimings: execution.taskTimings,
      eventLog: execution.eventLog,
    };
  }

  /** Get the event bus */
  getEventBus(): EventEmitter {
    return this.eventBus;
  }

  // ── Private Helpers ──────────────────────────────────────────

  private createExecution(workflow: WorkflowDefinition): WorkflowExecution {
    return {
      id: workflow.id,
      state: {
        id: workflow.id,
        name: workflow.name,
        tasks: workflow.tasks,
        status: 'in-progress',
        completedTasks: [],
        startedAt: Date.now(),
      },
      executionOrder: [],
      taskTimings: {},
      eventLog: [],
    };
  }

  private async runWorkflow(
    execution: WorkflowExecution,
    workflow: WorkflowDefinition
  ): Promise<WorkflowResult> {
    const tasks = workflow.tasks.map(t => new Task(t));
    const completedTasks = new Set<string>();
    const errors: Error[] = [];

    const orderedTasks = Task.resolveExecutionOrder(tasks);

    for (const task of orderedTasks) {
      // Check if paused
      while (execution.state.status === 'paused') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (execution.state.status === 'cancelled') {
        break;
      }

      execution.state.currentTask = task.id;
      const startTime = Date.now();

      try {
        if (task.isWorkflow() && task.workflow) {
          const nestedResult = await this.executeWorkflow(task.workflow);
          if (nestedResult.status === 'failed') {
            throw new Error('Nested workflow failed');
          }
        } else {
          let agentId = task.assignedTo;
          if (!agentId) {
            const agents = await this.coordinator.listAgents();
            const suitable = agents.find(a => a.canExecute(task.type));
            agentId = suitable?.id;
          }

          if (!agentId) {
            throw new Error(`No agent available for task ${task.id}`);
          }

          const result = await this.executeTask(task, agentId);
          if (result.status === 'failed') {
            throw new Error(result.error || 'Task execution failed');
          }
        }

        const endTime = Date.now();
        execution.taskTimings[task.id] = { start: startTime, end: endTime, duration: endTime - startTime };
        completedTasks.add(task.id);
        execution.state.completedTasks.push(task.id);
        execution.executionOrder.push(task.id);

        this.eventBus.emit('workflow:taskComplete', { workflowId: workflow.id, taskId: task.id });

        execution.eventLog.push({
          timestamp: endTime,
          event: 'task:completed',
          data: { taskId: task.id, duration: endTime - startTime },
        });
      } catch (error) {
        errors.push(error instanceof Error ? error : new Error(String(error)));
        if (workflow.rollbackOnFailure) {
          throw error;
        }
      }
    }

    execution.state.status = errors.length > 0 ? 'failed' : 'completed';
    execution.state.completedAt = Date.now();

    return {
      id: workflow.id,
      status: errors.length > 0 ? 'failed' : 'completed',
      tasksCompleted: completedTasks.size,
      errors,
      executionOrder: execution.executionOrder,
      duration: execution.state.completedAt - (execution.state.startedAt || 0),
    };
  }

  private async rollbackWorkflow(
    execution: WorkflowExecution,
    workflow: WorkflowDefinition
  ): Promise<void> {
    const completedTaskIds = [...execution.state.completedTasks].reverse();

    for (const taskId of completedTaskIds) {
      const task = workflow.tasks.find(t => t.id === taskId);
      if (task?.onRollback) {
        try {
          await task.onRollback();
          execution.eventLog.push({
            timestamp: Date.now(),
            event: 'task:rolledback',
            data: { taskId },
          });
        } catch (error) {
          execution.eventLog.push({
            timestamp: Date.now(),
            event: 'rollback:error',
            data: { taskId, error: String(error) },
          });
        }
      }
    }
  }
}
