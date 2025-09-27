// Arcanea Chat Provider Routing System
export * from './types';
export * from './router';
export * from './providers/base';
export * from './providers/openrouter';
export * from './providers/direct';

// Factory function for creating a configured router
import { ProviderRouter } from './router';
import { OpenRouterProvider } from './providers/openrouter';
import { DirectOpenAIProvider, DirectAnthropicProvider } from './providers/direct';
import type { ProviderConfig } from './types';

export function createProviderRouter(configs: {
  openrouter?: ProviderConfig;
  openai?: ProviderConfig;
  anthropic?: ProviderConfig;
}): ProviderRouter {
  const providers = [];

  if (configs.openrouter) {
    providers.push(new OpenRouterProvider(configs.openrouter));
  }

  if (configs.openai) {
    providers.push(new DirectOpenAIProvider(configs.openai));
  }

  if (configs.anthropic) {
    providers.push(new DirectAnthropicProvider(configs.anthropic));
  }

  // Default fallback chain: Direct APIs first, then OpenRouter
  const fallbackChain = [
    ...(configs.anthropic ? ['anthropic-direct'] : []),
    ...(configs.openai ? ['openai-direct'] : []),
    ...(configs.openrouter ? ['openrouter'] : []),
  ];

  return new ProviderRouter(providers, fallbackChain);
}

// Default configurations for common setups
export const defaultConfigs = {
  openrouter: {
    name: 'openrouter',
    apiKey: process.env.OPENROUTER_API_KEY || '',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'anthropic/claude-3.5-sonnet',
    availableModels: [
      'anthropic/claude-3.5-sonnet',
      'openai/gpt-4-turbo',
      'openai/gpt-3.5-turbo',
      'meta-llama/llama-3.1-8b-instruct',
    ],
    maxTokens: 4096,
    rateLimit: {
      requestsPerMinute: 60,
      tokensPerMinute: 100000,
    },
    pricing: {
      inputTokens: 0.003, // $3 per 1M input tokens (average)
      outputTokens: 0.015, // $15 per 1M output tokens (average)
    },
    latency: {
      avgResponseTime: 2000, // 2 seconds average
      reliability: 0.95,
    },
  },

  openai: {
    name: 'openai-direct',
    apiKey: process.env.OPENAI_API_KEY || '',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4-turbo',
    availableModels: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    maxTokens: 4096,
    rateLimit: {
      requestsPerMinute: 500,
      tokensPerMinute: 150000,
    },
    pricing: {
      inputTokens: 0.01, // $10 per 1M tokens
      outputTokens: 0.03, // $30 per 1M tokens
    },
    latency: {
      avgResponseTime: 1500, // 1.5 seconds average
      reliability: 0.98,
    },
  },

  anthropic: {
    name: 'anthropic-direct',
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    baseUrl: 'https://api.anthropic.com',
    defaultModel: 'claude-3-5-sonnet-20241022',
    availableModels: ['claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'],
    maxTokens: 4096,
    rateLimit: {
      requestsPerMinute: 1000,
      tokensPerMinute: 200000,
    },
    pricing: {
      inputTokens: 0.003, // $3 per 1M tokens
      outputTokens: 0.015, // $15 per 1M tokens
    },
    latency: {
      avgResponseTime: 1800, // 1.8 seconds average
      reliability: 0.97,
    },
  },
} as const;