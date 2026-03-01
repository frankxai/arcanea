import { createProvider } from './providers';
import type {
  ModelConfig,
  ModelProvider,
  ChatCompletionOptions,
  ChatCompletionResponse,
  StreamChunk,
  ModelCapabilities,
  ProviderType,
} from './types';

export class ModelRuntime {
  private providers = new Map<string, ModelProvider>();
  private defaultProvider: string | null = null;

  addProvider(name: string, config: ModelConfig): void {
    this.providers.set(name, createProvider(config));
    if (!this.defaultProvider) {
      this.defaultProvider = name;
    }
  }

  removeProvider(name: string): void {
    this.providers.delete(name);
    if (this.defaultProvider === name) {
      this.defaultProvider = this.providers.keys().next().value ?? null;
    }
  }

  setDefault(name: string): void {
    if (!this.providers.has(name)) {
      throw new Error(`Provider "${name}" not registered`);
    }
    this.defaultProvider = name;
  }

  getProvider(name?: string): ModelProvider {
    const key = name ?? this.defaultProvider;
    if (!key) throw new Error('No provider registered');
    const provider = this.providers.get(key);
    if (!provider) throw new Error(`Provider "${key}" not found`);
    return provider;
  }

  listProviders(): Array<{ name: string; type: ProviderType }> {
    return Array.from(this.providers.entries()).map(([name, p]) => ({
      name,
      type: p.type,
    }));
  }

  async chat(options: ChatCompletionOptions & { provider?: string }): Promise<ChatCompletionResponse> {
    const provider = this.getProvider(options.provider);
    return provider.chat(options);
  }

  async *chatStream(options: ChatCompletionOptions & { provider?: string }): AsyncIterable<StreamChunk> {
    const provider = this.getProvider(options.provider);
    yield* provider.chatStream(options);
  }

  getCapabilities(model: string, providerName?: string): ModelCapabilities {
    const provider = this.getProvider(providerName);
    return provider.getCapabilities(model);
  }

  async listModels(providerName?: string): Promise<string[]> {
    const provider = this.getProvider(providerName);
    return provider.listModels();
  }
}
