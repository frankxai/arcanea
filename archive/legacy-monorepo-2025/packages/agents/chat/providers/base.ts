// Base provider class for consistent interface
import type { ChatRequest, ChatResponse, ProviderConfig } from '../types';

export abstract class BaseProvider {
  protected config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
  }

  abstract initialize(): Promise<void>;
  abstract chat(request: ChatRequest): Promise<ChatResponse>;
  abstract checkHealth(): Promise<boolean>;
  abstract estimateCost(request: ChatRequest): number;
  abstract estimateLatency(request: ChatRequest): number;

  getName(): string {
    return this.config.name;
  }

  getAvailableModels(): string[] {
    return this.config.availableModels;
  }

  getDefaultModel(): string {
    return this.config.defaultModel;
  }

  getRateLimit() {
    return this.config.rateLimit;
  }

  protected generateRequestId(): string {
    return `${this.config.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  protected calculateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  protected calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1000) * this.config.pricing.inputTokens;
    const outputCost = (outputTokens / 1000) * this.config.pricing.outputTokens;
    return inputCost + outputCost;
  }
}