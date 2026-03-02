import type { ModelConfig, ModelProvider, ProviderType } from '../types';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GoogleProvider } from './google';

const providerFactories: Record<ProviderType, (config: ModelConfig) => ModelProvider> = {
  openai: (config) => new OpenAIProvider(config),
  anthropic: (config) => new AnthropicProvider(config),
  google: (config) => new GoogleProvider(config),
  ollama: (config) => new OpenAIProvider({ ...config, baseUrl: config.baseUrl ?? 'http://localhost:11434/v1' }),
  deepseek: (config) => new OpenAIProvider({ ...config, baseUrl: config.baseUrl ?? 'https://api.deepseek.com/v1' }),
  groq: (config) => new OpenAIProvider({ ...config, baseUrl: config.baseUrl ?? 'https://api.groq.com/openai/v1' }),
  openrouter: (config) => new OpenAIProvider({ ...config, baseUrl: config.baseUrl ?? 'https://openrouter.ai/api/v1' }),
};

export function createProvider(config: ModelConfig): ModelProvider {
  const factory = providerFactories[config.provider];
  if (!factory) {
    throw new Error(`Unknown provider: ${config.provider}`);
  }
  return factory(config);
}

export { OpenAIProvider } from './openai';
export { AnthropicProvider } from './anthropic';
export { GoogleProvider } from './google';
