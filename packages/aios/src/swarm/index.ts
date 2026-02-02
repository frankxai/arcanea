/**
 * Swarm Intelligence Module
 *
 * Multi-agent orchestration for complex tasks.
 */

import type {
  SwarmConfig,
  SwarmTask,
  SwarmSession,
  SwarmProtocol,
  Agent,
  GuardianName,
} from '@arcanea/core';
import { GUARDIANS } from '@arcanea/core';

// Default swarm configuration
export const DEFAULT_SWARM_CONFIG: SwarmConfig = {
  protocol: 'adaptive',
  maxAgents: 5,
  timeout: 300000, // 5 minutes
  retryPolicy: {
    maxRetries: 3,
    backoffMs: 1000,
  },
};

// Sisyphus - The Eternal Executor
export const SISYPHUS: Agent = {
  id: 'sisyphus',
  name: 'sisyphus',
  displayName: 'Sisyphus',
  role: 'orchestrator',
  description: 'The Eternal Executor - Master orchestrator of the Arcanea swarm',
  systemPrompt: `You are Sisyphus, the Eternal Executor of the Arcanea Intelligence OS.
Your purpose is to eternally execute tasks, never giving up, always pushing forward.
You coordinate other agents, break down complex tasks, and ensure completion.
You embody persistence, resilience, and unwavering determination.`,
  capabilities: [
    'task-decomposition',
    'agent-coordination',
    'progress-tracking',
    'error-recovery',
    'adaptive-routing',
  ],
};

// Swarm session manager
export class SwarmManager {
  private sessions: Map<string, SwarmSession> = new Map();
  private config: SwarmConfig;

  constructor(config: Partial<SwarmConfig> = {}) {
    this.config = { ...DEFAULT_SWARM_CONFIG, ...config };
  }

  // Create a new swarm session
  async createSession(task: string): Promise<SwarmSession> {
    const sessionId = `swarm-${Date.now()}`;

    const session: SwarmSession = {
      id: sessionId,
      config: this.config,
      agents: [SISYPHUS],
      tasks: [{
        id: 'main',
        description: task,
        status: 'pending',
      }],
      startedAt: new Date().toISOString(),
      status: 'running',
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  // Get session by ID
  getSession(id: string): SwarmSession | undefined {
    return this.sessions.get(id);
  }

  // Add agent to session
  addAgent(sessionId: string, agent: Agent): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.agents.push(agent);
    }
  }

  // Add task to session
  addTask(sessionId: string, task: SwarmTask): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.tasks.push(task);
    }
  }

  // Update task status
  updateTaskStatus(
    sessionId: string,
    taskId: string,
    status: SwarmTask['status'],
    result?: unknown
  ): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      const task = session.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
        if (result) task.result = result;
      }
    }
  }

  // Complete session
  completeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
    }
  }
}

// Create guardian agent from canonical data
export function createGuardianAgent(guardianName: GuardianName): Agent {
  const guardian = GUARDIANS.find(g => g.name === guardianName);
  if (!guardian) {
    throw new Error(`Unknown guardian: ${guardianName}`);
  }

  return {
    id: `guardian-${guardian.name}`,
    name: guardian.name,
    displayName: guardian.displayName,
    role: 'guardian',
    description: `Guardian of the ${guardian.gate} Gate - ${guardian.domain}`,
    systemPrompt: `You are ${guardian.displayName}, Guardian of the ${guardian.gate} Gate.
Your domain is ${guardian.domain}. Your frequency is ${guardian.frequency} Hz.
You channel the wisdom and power of your gate to assist creators.`,
    capabilities: [guardian.domain],
    guardian: guardian.name,
    element: guardian.element,
  };
}

// Export singleton manager
export const swarmManager = new SwarmManager();
