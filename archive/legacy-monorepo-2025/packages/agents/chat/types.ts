// Provider routing types for Arcanea chat system
import { z } from 'zod';

export interface ProviderConfig {
  name: string;
  apiKey: string;
  baseUrl?: string;
  defaultModel: string;
  availableModels: string[];
  maxTokens: number;
  rateLimit: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  pricing: {
    inputTokens: number; // cost per 1k tokens
    outputTokens: number; // cost per 1k tokens
  };
  latency: {
    avgResponseTime: number; // milliseconds
    reliability: number; // 0-1 score
  };
}

export interface RouterDecision {
  selectedProvider: string;
  selectedModel: string;
  reasoning: string;
  fallbackProviders: string[];
  estimatedCost: number;
  estimatedLatency: number;
}

export interface ChatRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  context?: {
    userId: string;
    sessionId: string;
    priority: 'low' | 'medium' | 'high';
    maxCost?: number; // cents
    maxLatency?: number; // milliseconds
    requiresHighQuality?: boolean;
  };
  options?: {
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  };
}

export interface ChatResponse {
  content: string;
  provider: string;
  model: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalCost: number;
  };
  metrics: {
    latency: number;
    promptTokens: number;
    completionTokens: number;
  };
  metadata: {
    requestId: string;
    timestamp: Date;
    fallbackUsed?: boolean;
    retryCount?: number;
  };
}

export interface ProviderMetrics {
  provider: string;
  successRate: number;
  avgLatency: number;
  avgCost: number;
  errorRate: number;
  lastUpdated: Date;
}

// Validation schemas
export const ProviderConfigSchema = z.object({
  name: z.string(),
  apiKey: z.string(),
  baseUrl: z.string().optional(),
  defaultModel: z.string(),
  availableModels: z.array(z.string()),
  maxTokens: z.number(),
  rateLimit: z.object({
    requestsPerMinute: z.number(),
    tokensPerMinute: z.number(),
  }),
  pricing: z.object({
    inputTokens: z.number(),
    outputTokens: z.number(),
  }),
  latency: z.object({
    avgResponseTime: z.number(),
    reliability: z.number().min(0).max(1),
  }),
});

export const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  })),
  context: z.object({
    userId: z.string(),
    sessionId: z.string(),
    priority: z.enum(['low', 'medium', 'high']),
    maxCost: z.number().optional(),
    maxLatency: z.number().optional(),
    requiresHighQuality: z.boolean().optional(),
  }).optional(),
  options: z.object({
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().optional(),
    stream: z.boolean().optional(),
  }).optional(),
});

export type ValidatedProviderConfig = z.infer<typeof ProviderConfigSchema>;
export type ValidatedChatRequest = z.infer<typeof ChatRequestSchema>;