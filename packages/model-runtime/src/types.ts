import { z } from 'zod';

export type ProviderType =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'ollama'
  | 'deepseek'
  | 'groq'
  | 'openrouter';

export interface ModelCapabilities {
  vision: boolean;
  reasoning: boolean;
  functionCalling: boolean;
  extendedThinking: boolean;
  streaming: boolean;
  maxContextLength: number;
}

export interface ModelConfig {
  provider: ProviderType;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export type ChatMessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface ChatMessage {
  role: ChatMessageRole;
  content: string | MessageContent[];
  name?: string;
  toolCallId?: string;
  toolCalls?: ToolCall[];
}

export interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  imageUrl?: { url: string; detail?: 'auto' | 'low' | 'high' };
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface ChatCompletionOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  tools?: ToolDefinition[];
  toolChoice?: 'auto' | 'none' | 'required' | { type: 'function'; function: { name: string } };
  stream?: boolean;
  signal?: AbortSignal;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface ChatCompletionResponse {
  id: string;
  content: string;
  role: 'assistant';
  toolCalls?: ToolCall[];
  usage?: TokenUsage;
  finishReason: 'stop' | 'tool_calls' | 'length' | 'content_filter';
  model: string;
  provider: ProviderType;
}

export interface StreamChunk {
  id: string;
  delta: string;
  toolCalls?: Partial<ToolCall>[];
  finishReason?: ChatCompletionResponse['finishReason'];
  usage?: TokenUsage;
}

export interface ModelProvider {
  readonly type: ProviderType;
  chat(options: ChatCompletionOptions): Promise<ChatCompletionResponse>;
  chatStream(options: ChatCompletionOptions): AsyncIterable<StreamChunk>;
  listModels(): Promise<string[]>;
  getCapabilities(model: string): ModelCapabilities;
}

export const ModelConfigSchema = z.object({
  provider: z.enum(['openai', 'anthropic', 'google', 'ollama', 'deepseek', 'groq', 'openrouter']),
  model: z.string(),
  apiKey: z.string().optional(),
  baseUrl: z.string().url().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional(),
  topP: z.number().min(0).max(1).optional(),
});
