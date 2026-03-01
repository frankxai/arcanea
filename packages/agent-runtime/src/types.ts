import type { ProviderType, ToolDefinition, ChatMessage } from '@arcanea/model-runtime';

export interface AgentConfig {
  id: string;
  name: string;
  avatar?: string;
  systemPrompt: string;
  model: string;
  provider: ProviderType;
  temperature?: number;
  maxTokens?: number;
  tools?: ToolDefinition[];
  mcpServers?: string[];
  plugins?: string[];
  knowledgeBases?: string[];
  metadata?: Record<string, unknown>;
}

export interface AgentGroupConfig {
  id: string;
  name: string;
  supervisorId: string;
  members: Array<{
    agentId: string;
    role: 'member' | 'supervisor';
  }>;
  description?: string;
  routingStrategy: 'supervisor' | 'round-robin' | 'parallel';
}

export interface ConversationThread {
  id: string;
  title?: string;
  agentId?: string;
  groupId?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentResponse {
  agentId: string;
  agentName: string;
  content: string;
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: string;
    result?: string;
  }>;
  reasoning?: string;
  model: string;
  provider: ProviderType;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamEvent {
  type: 'text_delta' | 'tool_call_start' | 'tool_call_result' | 'agent_switch' | 'done';
  agentId: string;
  agentName: string;
  delta?: string;
  toolCall?: { id: string; name: string; arguments?: string; result?: string };
  nextAgentId?: string;
}

export interface ToolExecutor {
  execute(name: string, args: Record<string, unknown>): Promise<string>;
  listAvailable(): ToolDefinition[];
}

export interface CronJobConfig {
  id: string;
  agentId: string;
  cronExpression: string;
  payload?: Record<string, unknown>;
  maxExecutions?: number;
  active: boolean;
}
