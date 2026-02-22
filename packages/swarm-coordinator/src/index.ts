/**
 * @arcanea/swarm-coordinator
 *
 * Multi-agent swarm coordination with topology-aware task distribution,
 * workflow execution, and Guardian-integrated consensus.
 *
 * Absorbed from arcanea-flow V3 coordination + task-execution modules.
 *
 * @example
 * ```ts
 * import { SwarmCoordinator, WorkflowEngine, Agent, Task } from '@arcanea/swarm-coordinator';
 *
 * const coordinator = new SwarmCoordinator({ topology: 'hierarchical' });
 * await coordinator.initialize();
 *
 * const leader = await coordinator.spawnAgent({
 *   id: 'leader-1', type: 'coordinator', role: 'leader',
 *   capabilities: ['coordinate', 'manage'],
 * });
 *
 * const coder = await coordinator.spawnAgent({
 *   id: 'coder-1', type: 'coder',
 *   capabilities: ['code', 'refactor', 'debug'],
 * });
 *
 * const result = await coordinator.executeTask('coder-1', {
 *   id: 'task-1', type: 'code', description: 'Implement feature',
 *   priority: 'high',
 * });
 * ```
 */

// Types
export type {
  AgentConfig,
  AgentMessage,
  AgentMetrics,
  AgentRole,
  AgentStatus,
  AgentType,
  ConsensusDecision,
  ConsensusResult,
  IAgent,
  Memory,
  MemoryBackend,
  MeshConnection,
  SwarmConfig,
  SwarmHierarchy,
  SwarmState,
  SwarmTopology,
  TaskAssignment,
  TaskConfig,
  TaskPriority,
  TaskResult,
  TaskStatus,
  TaskType,
  WorkflowDebugInfo,
  WorkflowDefinition,
  WorkflowMetrics,
  WorkflowResult,
  WorkflowState,
  WorkflowStatus,
} from './types.js';

// Domain Entities
export { Agent } from './agent.js';
export { Task } from './task.js';

// Coordination
export { SwarmCoordinator, type SwarmCoordinatorOptions } from './swarm-coordinator.js';

// Workflow
export { WorkflowEngine, type WorkflowEngineOptions } from './workflow-engine.js';
