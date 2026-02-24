/**
 * @arcanea/swarm-coordinator — Type Definitions
 *
 * Core types for multi-agent swarm coordination, task execution,
 * and workflow orchestration. Adapted from arcanea-flow V3 DDD types,
 * made standalone with no external dependencies.
 */

import type { EventEmitter } from 'node:events';

// ============================================================================
// Agent Types
// ============================================================================

export type AgentStatus = 'active' | 'idle' | 'busy' | 'terminated' | 'error';
export type AgentRole = 'leader' | 'worker' | 'peer';
export type AgentType = string;

export interface AgentConfig {
  id: string;
  type: AgentType;
  capabilities?: string[];
  role?: AgentRole;
  parent?: string;
  metadata?: Record<string, unknown>;
}

export interface IAgent {
  id: string;
  type: AgentType;
  status: AgentStatus;
  capabilities: string[];
  role?: AgentRole;
  parent?: string;
  metadata?: Record<string, unknown>;
  createdAt?: number;
  lastActive?: number;
}

// ============================================================================
// Task Types
// ============================================================================

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
export type TaskType = string;

export interface TaskConfig {
  id: string;
  type: TaskType;
  description: string;
  priority: TaskPriority;
  status?: TaskStatus;
  assignedTo?: string;
  dependencies?: string[];
  metadata?: Record<string, unknown>;
  workflow?: WorkflowDefinition;
  onExecute?: () => void | Promise<void>;
  onRollback?: () => void | Promise<void>;
}

export interface TaskResult {
  taskId: string;
  status: 'completed' | 'failed';
  result?: unknown;
  error?: string;
  duration?: number;
  agentId?: string;
}

export interface TaskAssignment {
  taskId: string;
  agentId: string;
  assignedAt: number;
  priority: TaskPriority;
}

// ============================================================================
// Workflow Types
// ============================================================================

export type WorkflowStatus = 'pending' | 'in-progress' | 'paused' | 'completed' | 'failed' | 'cancelled';

export interface WorkflowDefinition {
  id: string;
  name: string;
  tasks: TaskConfig[];
  debug?: boolean;
  rollbackOnFailure?: boolean;
}

export interface WorkflowState {
  id: string;
  name: string;
  tasks: TaskConfig[];
  status: WorkflowStatus;
  completedTasks: string[];
  currentTask?: string;
  startedAt?: number;
  completedAt?: number;
}

export interface WorkflowResult {
  id: string;
  status: 'completed' | 'failed' | 'cancelled';
  tasksCompleted: number;
  errors: Error[];
  executionOrder?: string[];
  duration?: number;
}

export interface WorkflowMetrics {
  tasksTotal: number;
  tasksCompleted: number;
  totalDuration: number;
  averageTaskDuration: number;
  successRate: number;
}

export interface WorkflowDebugInfo {
  executionTrace: Array<{ taskId: string; timestamp: number; action: string }>;
  taskTimings: Record<string, { start: number; end: number; duration: number }>;
  eventLog: Array<{ timestamp: number; event: string; data: unknown }>;
}

// ============================================================================
// Swarm Types
// ============================================================================

export type SwarmTopology = 'hierarchical' | 'mesh' | 'simple' | 'adaptive';

export interface SwarmConfig {
  topology: SwarmTopology;
  maxAgents?: number;
  eventBus?: EventEmitter;
}

export interface SwarmState {
  agents: IAgent[];
  topology: SwarmTopology;
  leader?: string;
  activeConnections: number;
}

export interface SwarmHierarchy {
  leader: string;
  workers: Array<{ id: string; parent: string }>;
}

export interface MeshConnection {
  from: string;
  to: string;
  type: 'peer' | 'leader' | 'worker';
}

export interface AgentMessage {
  from: string;
  to: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp?: number;
}

export interface AgentMetrics {
  agentId: string;
  tasksCompleted: number;
  tasksFailed: number;
  averageExecutionTime: number;
  successRate: number;
  health: 'healthy' | 'degraded' | 'unhealthy';
}

// ============================================================================
// Memory Backend Interface (optional integration)
// ============================================================================

export interface Memory {
  id: string;
  agentId: string;
  content: string;
  type: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface MemoryBackend {
  store(memory: Memory): Promise<Memory>;
  retrieve(id: string): Promise<Memory | undefined>;
}

// ============================================================================
// Consensus Interface (optional integration)
// ============================================================================

export interface ConsensusDecision {
  id: string;
  type: string;
  payload: Record<string, unknown>;
}

export interface ConsensusResult {
  decision: unknown;
  votes: Array<{ agentId: string; vote: unknown }>;
  consensusReached: boolean;
}
