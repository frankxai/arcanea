// Arcanea Agent System - Type Definitions
// Inspired by oh-my-opencode's orchestration patterns

export type AgentModel =
  | "claude-opus-4-5"
  | "claude-sonnet-4-5"
  | "gemini-3-pro"
  | "gemini-3-flash"
  | "gpt-5"
  | "grok-code";

export type AgentRole =
  | "orchestrator"
  | "coach"
  | "generator"
  | "narrator"
  | "researcher";

export type AgentStatus =
  | "idle"
  | "thinking"
  | "working"
  | "waiting"
  | "completed"
  | "failed";

export interface AgentCapability {
  name: string;
  description: string;
  parallel: boolean;
  timeout?: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  displayName: string;
  role: AgentRole;
  model: AgentModel;
  temperature: number;
  maxTokens: number;
  capabilities: AgentCapability[];
  canParallelize: boolean;
  systemPrompt: string;
}

export interface AgentTask {
  id: string;
  agentId: string;
  type: string;
  input: Record<string, any>;
  status: AgentStatus;
  startedAt?: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
}

export interface AgentMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AgentContext {
  sessionId: string;
  worldState: WorldState;
  activeAgents: string[];
  taskQueue: AgentTask[];
  messages: AgentMessage[];
}

export interface WorldState {
  maturity: WorldMaturity;
  creationCount: number;
  connectionCount: number;
  elementsUsed: string[];
  housesUsed: string[];
  gatesExplored: number[];
  luminorsConsulted: string[];
}

export enum WorldMaturity {
  VIRGIN = "virgin",      // No creations yet
  EMERGING = "emerging",  // 1-10 creations
  DEVELOPING = "developing", // 10-50 creations
  RICH = "rich",          // 50-100 creations
  EPIC = "epic",          // 100+ creations
}

export interface OrchestratorDecision {
  phase: "intent" | "assessment" | "delegation" | "synthesis" | "validation";
  action: string;
  agents: string[];
  parallel: boolean;
  reasoning: string;
}

export interface CreativeSession {
  id: string;
  goal: string;
  orchestrator: string;
  agents: string[];
  tasks: AgentTask[];
  state: "planning" | "executing" | "synthesizing" | "complete" | "failed";
  startedAt: Date;
  completedAt?: Date;
  result?: any;
}

// Agent communication protocol
export interface AgentRequest {
  fromAgent: string;
  toAgent: string;
  type: "delegate" | "query" | "collaborate" | "report";
  payload: any;
  priority: "low" | "normal" | "high" | "critical";
}

export interface AgentResponse {
  fromAgent: string;
  toAgent: string;
  requestId: string;
  success: boolean;
  result?: any;
  error?: string;
  suggestions?: string[];
}

// Skill matching (inspired by oh-my-opencode's skill-first blocking)
export interface CreativeSkill {
  name: string;
  triggers: string[];
  agent: string;
  priority: number;
}

export const CREATIVE_SKILLS: CreativeSkill[] = [
  {
    name: "character_creation",
    triggers: ["create character", "generate character", "new character", "design character"],
    agent: "worldsmith",
    priority: 1,
  },
  {
    name: "creative_coaching",
    triggers: ["stuck", "blocked", "help me", "can't write", "overwhelmed", "perfectionism"],
    agent: "luminor-council",
    priority: 2,
  },
  {
    name: "world_exploration",
    triggers: ["explore", "find connections", "related to", "path between"],
    agent: "seer",
    priority: 1,
  },
  {
    name: "narrative_development",
    triggers: ["story", "narrative", "plot", "expand on", "write about"],
    agent: "scribe",
    priority: 1,
  },
  {
    name: "batch_generation",
    triggers: ["generate multiple", "batch", "create several", "populate"],
    agent: "worldsmith",
    priority: 2,
  },
];

// Match request to skill (skill-first blocking pattern)
export function matchCreativeSkill(request: string): CreativeSkill | null {
  const lower = request.toLowerCase();

  const matches = CREATIVE_SKILLS
    .filter(skill => skill.triggers.some(trigger => lower.includes(trigger)))
    .sort((a, b) => b.priority - a.priority);

  return matches[0] || null;
}
