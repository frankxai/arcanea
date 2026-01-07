// Smart provider router for optimal model selection
import type {
  ChatRequest,
  ChatResponse,
  ProviderConfig,
  RouterDecision,
  ProviderMetrics,
} from './types';
import { BaseProvider } from './providers/base';

export class ProviderRouter {
  private providers: Map<string, BaseProvider> = new Map();
  private metrics: Map<string, ProviderMetrics> = new Map();
  private fallbackChain: string[] = [];

  constructor(
    providers: BaseProvider[],
    fallbackChain: string[] = []
  ) {
    providers.forEach(provider => {
      this.providers.set(provider.getName(), provider);
    });
    this.fallbackChain = fallbackChain;
  }

  /**
   * Route a chat request to the optimal provider
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const decision = this.makeRoutingDecision(request);

    let lastError: Error | null = null;
    const providersToTry = [decision.selectedProvider, ...decision.fallbackProviders];

    for (const providerName of providersToTry) {
      const provider = this.providers.get(providerName);
      if (!provider) continue;

      try {
        const response = await provider.chat(request);

        // Update metrics on success
        this.updateMetrics(providerName, true, response.metrics.latency, response.usage.totalCost);

        return response;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Provider ${providerName} failed:`, error);

        // Update metrics on failure
        this.updateMetrics(providerName, false, 0, 0);

        continue;
      }
    }

    throw new Error(`All providers failed. Last error: ${lastError?.message}`);
  }

  /**
   * Make intelligent routing decision based on request context
   */
  private makeRoutingDecision(request: ChatRequest): RouterDecision {
    const context = request.context;
    const availableProviders = Array.from(this.providers.keys());

    // Score each provider
    const scores: Array<{ provider: string; score: number; reasoning: string[] }> = [];

    for (const providerName of availableProviders) {
      const provider = this.providers.get(providerName)!;
      const metrics = this.metrics.get(providerName);
      const reasoning: string[] = [];
      let score = 100; // Base score

      // Cost consideration
      const estimatedCost = provider.estimateCost(request);
      if (context?.maxCost && estimatedCost > context.maxCost) {
        score -= 50;
        reasoning.push(`Cost too high: $${estimatedCost.toFixed(4)} > $${context.maxCost.toFixed(4)}`);
      } else {
        const costScore = Math.max(0, 20 - (estimatedCost * 100)); // Lower cost = higher score
        score += costScore;
        reasoning.push(`Cost efficient: $${estimatedCost.toFixed(4)}`);
      }

      // Latency consideration
      const estimatedLatency = provider.estimateLatency(request);
      if (context?.maxLatency && estimatedLatency > context.maxLatency) {
        score -= 40;
        reasoning.push(`Latency too high: ${estimatedLatency}ms > ${context.maxLatency}ms`);
      } else {
        const latencyScore = Math.max(0, 30 - (estimatedLatency / 100)); // Lower latency = higher score
        score += latencyScore;
        reasoning.push(`Good latency: ${estimatedLatency}ms`);
      }

      // Quality consideration
      if (context?.requiresHighQuality) {
        if (providerName.includes('claude') || providerName.includes('gpt-4')) {
          score += 30;
          reasoning.push('High quality model available');
        } else {
          score -= 20;
          reasoning.push('Quality requirements not fully met');
        }
      }

      // Priority consideration
      if (context?.priority === 'high') {
        if (providerName.includes('direct')) {
          score += 20;
          reasoning.push('Direct API for high priority');
        }
      } else if (context?.priority === 'low') {
        if (providerName.includes('openrouter')) {
          score += 15;
          reasoning.push('Cost-effective for low priority');
        }
      }

      // Reliability based on historical metrics
      if (metrics) {
        score += metrics.successRate * 20; // Success rate bonus
        score -= (1 - metrics.successRate) * 30; // Penalty for failures
        reasoning.push(`Historical success rate: ${(metrics.successRate * 100).toFixed(1)}%`);
      }

      scores.push({ provider: providerName, score, reasoning });
    }

    // Sort by score
    scores.sort((a, b) => b.score - a.score);

    const selectedProvider = scores[0].provider;
    const selectedProviderInstance = this.providers.get(selectedProvider)!;

    return {
      selectedProvider,
      selectedModel: selectedProviderInstance.getDefaultModel(),
      reasoning: scores[0].reasoning.join('; '),
      fallbackProviders: scores.slice(1).map(s => s.provider),
      estimatedCost: selectedProviderInstance.estimateCost(request),
      estimatedLatency: selectedProviderInstance.estimateLatency(request),
    };
  }

  /**
   * Update provider metrics
   */
  private updateMetrics(
    providerName: string,
    success: boolean,
    latency: number,
    cost: number
  ): void {
    const existing = this.metrics.get(providerName) || {
      provider: providerName,
      successRate: 1,
      avgLatency: 0,
      avgCost: 0,
      errorRate: 0,
      lastUpdated: new Date(),
    };

    // Exponential moving average for metrics
    const alpha = 0.1; // Learning rate

    existing.successRate = existing.successRate * (1 - alpha) + (success ? 1 : 0) * alpha;
    existing.errorRate = 1 - existing.successRate;

    if (success) {
      existing.avgLatency = existing.avgLatency * (1 - alpha) + latency * alpha;
      existing.avgCost = existing.avgCost * (1 - alpha) + cost * alpha;
    }

    existing.lastUpdated = new Date();

    this.metrics.set(providerName, existing);
  }

  /**
   * Get current metrics for all providers
   */
  getMetrics(): ProviderMetrics[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get routing decision without executing
   */
  getRoutingDecision(request: ChatRequest): RouterDecision {
    return this.makeRoutingDecision(request);
  }

  /**
   * Add a new provider
   */
  addProvider(provider: BaseProvider): void {
    this.providers.set(provider.getName(), provider);
  }

  /**
   * Remove a provider
   */
  removeProvider(providerName: string): void {
    this.providers.delete(providerName);
    this.metrics.delete(providerName);
  }

  /**
   * Check health of all providers
   */
  async checkAllProviders(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    for (const [name, provider] of this.providers) {
      try {
        results[name] = await provider.checkHealth();
      } catch {
        results[name] = false;
      }
    }

    return results;
  }
}