/**
 * Arcanea Agent Types
 *
 * Type definitions for AI agents, skills, and orchestration.
 */

import type { GateName, GuardianName, Element, LuminorId } from './mythology';

// ============================================
// AGENT DEFINITIONS
// ============================================

export type AgentRole =
  | 'orchestrator'
  | 'specialist'
  | 'guardian'
  | 'companion'
  | 'worker';

export type AgentStatus = 'idle' | 'active' | 'processing' | 'error' | 'offline';

export interface Agent {
  id: string;
  name: string;
  displayName: string;
  role: AgentRole;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  tools?: string[];
  guardian?: GuardianName;
  element?: Element;
  status?: AgentStatus;
}

// ============================================
// SKILL DEFINITIONS
// ============================================

export type SkillCategory =
  | 'creative'
  | 'development'
  | 'research'
  | 'communication'
  | 'meta'
  | 'arcanea';

export interface Skill {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: SkillCategory;
  gate?: GateName;
  frequency?: number;
  instructions: string;
  triggers?: string[];
  examples?: string[];
}

// ============================================
// SWARM ORCHESTRATION
// ============================================

export type SwarmProtocol =
  | 'sequential'
  | 'parallel'
  | 'consensus'
  | 'hierarchical'
  | 'adaptive';

export interface SwarmConfig {
  protocol: SwarmProtocol;
  maxAgents: number;
  timeout?: number;
  retryPolicy?: {
    maxRetries: number;
    backoffMs: number;
  };
}

export interface SwarmTask {
  id: string;
  description: string;
  assignedAgent?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  dependencies?: string[];
  result?: unknown;
  error?: string;
}

export interface SwarmSession {
  id: string;
  config: SwarmConfig;
  agents: Agent[];
  tasks: SwarmTask[];
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
}

// ============================================
// PLATFORM ADAPTERS
// ============================================

export type PlatformType =
  | 'claude'
  | 'gemini'
  | 'opencode'
  | 'codex'
  | 'local';

export interface PlatformConfig {
  type: PlatformType;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface PlatformAdapter {
  type: PlatformType;
  name: string;
  initialize: (config: PlatformConfig) => Promise<void>;
  execute: (prompt: string, context?: unknown) => Promise<string>;
  stream?: (prompt: string, context?: unknown) => AsyncIterable<string>;
}

// ============================================
// INTELLIGENCE OS
// ============================================

export interface IntelligenceOSConfig {
  defaultPlatform: PlatformType;
  platforms: Record<PlatformType, PlatformConfig>;
  agents: Agent[];
  skills: Skill[];
  swarmDefaults: SwarmConfig;
}

export interface ChannelRequest {
  guardian: GuardianName;
  prompt: string;
  context?: Record<string, unknown>;
  platform?: PlatformType;
}

export interface ChannelResponse {
  guardian: GuardianName;
  response: string;
  metadata?: {
    tokensUsed?: number;
    duration?: number;
    model?: string;
  };
}
