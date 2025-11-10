/**
 * Project Flow Optimizer
 * Minimizes costs and maximizes performance in project flows
 */

import {
  ProjectTemplate,
  ProjectStep,
  AIAction,
  OptimizationContext,
  OptimizationPlan,
  OptimizationStrategy,
} from '../types/projects';

export class ProjectFlowOptimizer {
  /**
   * Optimize project flow for cost and performance
   */
  async optimizeFlow(
    template: ProjectTemplate,
    context: OptimizationContext
  ): Promise<OptimizationPlan> {
    const strategies: OptimizationStrategy[] = [];
    let totalSavings = 0;

    // Apply optimization strategies
    if (context.enableCaching !== false) {
      const cachingStrategy = this.analyzeCachingOpportunities(template);
      if (cachingStrategy) {
        strategies.push(cachingStrategy);
        totalSavings += cachingStrategy.costSaving;
      }
    }

    if (context.batchRequests !== false) {
      const batchingStrategy = this.analyzeBatchingOpportunities(template);
      if (batchingStrategy) {
        strategies.push(batchingStrategy);
        totalSavings += batchingStrategy.costSaving;
      }
    }

    if (context.prioritizeSpeed) {
      const parallelStrategy = this.analyzeParallelizationOpportunities(template);
      if (parallelStrategy) {
        strategies.push(parallelStrategy);
        totalSavings += parallelStrategy.costSaving;
      }
    }

    // Model selection optimization
    const modelStrategy = this.optimizeModelSelection(template, context);
    if (modelStrategy) {
      strategies.push(modelStrategy);
      totalSavings += modelStrategy.costSaving;
    }

    // Context pruning
    const pruningStrategy = this.analyzeContextPruning(template);
    if (pruningStrategy) {
      strategies.push(pruningStrategy);
      totalSavings += pruningStrategy.costSaving;
    }

    const originalCost = template.estimatedCost.apiCost || 0;
    const optimizedCost = Math.max(0, originalCost - totalSavings);

    return {
      originalCost,
      optimizedCost,
      savings: totalSavings,
      strategies,
    };
  }

  /**
   * Analyze caching opportunities
   */
  private analyzeCachingOpportunities(template: ProjectTemplate): OptimizationStrategy | null {
    const cacheableSteps = template.steps.filter(step => step.cacheable);

    if (cacheableSteps.length === 0) return null;

    const estimatedSaving = cacheableSteps.length * 0.02; // $0.02 per cached step

    return {
      name: 'Response Caching',
      description: `Cache results from ${cacheableSteps.length} steps to avoid redundant API calls`,
      costSaving: estimatedSaving,
      qualityImpact: 'none',
      appliedAt: cacheableSteps.map(s => s.stepNumber),
    };
  }

  /**
   * Analyze batching opportunities
   */
  private analyzeBatchingOpportunities(template: ProjectTemplate): OptimizationStrategy | null {
    const batchableActions: AIAction[] = [];

    for (const step of template.steps) {
      if (step.aiActions) {
        batchableActions.push(...step.aiActions.filter(a => step.batchable));
      }
    }

    if (batchableActions.length < 2) return null;

    const estimatedSaving = Math.floor(batchableActions.length / 2) * 0.01;

    return {
      name: 'Request Batching',
      description: `Batch ${batchableActions.length} similar requests to reduce API overhead`,
      costSaving: estimatedSaving,
      qualityImpact: 'none',
    };
  }

  /**
   * Analyze parallelization opportunities
   */
  private analyzeParallelizationOpportunities(
    template: ProjectTemplate
  ): OptimizationStrategy | null {
    let parallelizableSteps = 0;

    for (let i = 0; i < template.steps.length - 1; i++) {
      const currentStep = template.steps[i];
      const nextStep = template.steps[i + 1];

      // Check if steps are independent
      if (
        !nextStep.expectedInput?.some(input =>
          currentStep.expectedOutputs?.includes(input)
        )
      ) {
        parallelizableSteps++;
      }
    }

    if (parallelizableSteps === 0) return null;

    // Time savings, not cost savings, but still valuable
    return {
      name: 'Parallel Execution',
      description: `Execute ${parallelizableSteps} independent steps in parallel to reduce wait time`,
      costSaving: 0, // Time savings, not cost
      qualityImpact: 'none',
    };
  }

  /**
   * Optimize model selection
   */
  private optimizeModelSelection(
    template: ProjectTemplate,
    context: OptimizationContext
  ): OptimizationStrategy | null {
    if (context.prioritizeQuality) {
      return null; // Don't downgrade if quality is priority
    }

    let potentialSavings = 0;
    let stepsOptimized = 0;

    for (const step of template.steps) {
      if (!step.aiActions) continue;

      for (const action of step.aiActions) {
        // Check if we can use a cheaper model
        if (action.model === 'claude-opus-4-20250514') {
          // Could use Sonnet instead for non-critical steps
          if (step.type !== 'finalization') {
            potentialSavings += 0.05;
            stepsOptimized++;
          }
        }

        if (action.model === 'imagen-3.0-generate-001') {
          // Could use faster mode for intermediate images
          if (step.type !== 'finalization' && !action.parameters.quality) {
            potentialSavings += 0.02;
            stepsOptimized++;
          }
        }
      }
    }

    if (stepsOptimized === 0) return null;

    return {
      name: 'Smart Model Selection',
      description: `Use cost-effective models for ${stepsOptimized} intermediate steps`,
      costSaving: potentialSavings,
      qualityImpact: 'minimal',
    };
  }

  /**
   * Analyze context pruning opportunities
   */
  private analyzeContextPruning(template: ProjectTemplate): OptimizationStrategy | null {
    const stepsWithContext = template.steps.filter(
      step => step.aiActions?.some(a => a.usePreviousContext)
    ).length;

    if (stepsWithContext < 3) return null;

    const estimatedSaving = stepsWithContext * 0.005; // Small saving per pruned context

    return {
      name: 'Context Pruning',
      description: `Intelligently prune conversation history to reduce token usage`,
      costSaving: estimatedSaving,
      qualityImpact: 'none',
    };
  }

  /**
   * Estimate project cost with optimizations
   */
  estimateCost(
    template: ProjectTemplate,
    context: OptimizationContext
  ): ProjectCostEstimate {
    const baseCost = template.estimatedCost.apiCost || 0;
    const baseArc = template.estimatedCost.arcPoints;

    // Apply budget constraints
    if (context.userBudget?.maxCost && baseCost > context.userBudget.maxCost) {
      // Need to reduce features or quality
      return {
        estimatedCost: context.userBudget.maxCost,
        estimatedArc: Math.round(context.userBudget.maxCost * 100),
        breakdown: this.generateCostBreakdown(template),
        warnings: ['Cost exceeds budget - some features may be limited'],
      };
    }

    return {
      estimatedCost: baseCost,
      estimatedArc: baseArc,
      breakdown: this.generateCostBreakdown(template),
      warnings: [],
    };
  }

  /**
   * Generate cost breakdown
   */
  private generateCostBreakdown(template: ProjectTemplate): CostBreakdownItem[] {
    const breakdown: CostBreakdownItem[] = [];

    for (const step of template.steps) {
      if (!step.aiActions) continue;

      for (const action of step.aiActions) {
        let cost = 0;

        switch (action.action) {
          case 'generate_text':
            cost = 0.03; // Claude Sonnet estimate
            break;
          case 'generate_image':
            cost = 0.04; // Imagen estimate
            break;
          case 'generate_music':
            cost = 0.05; // Suno estimate
            break;
          case 'analyze':
            cost = 0.02;
            break;
          case 'combine':
            cost = 0.01;
            break;
        }

        breakdown.push({
          step: step.name,
          action: action.action,
          tool: action.tool,
          estimatedCost: cost,
        });
      }
    }

    return breakdown;
  }

  /**
   * Optimize context for step
   */
  pruneContext(
    conversationHistory: any[],
    maxTokens: number = 4000
  ): any[] {
    if (conversationHistory.length <= 5) {
      return conversationHistory; // Keep all if short
    }

    // Keep first 2 messages (setup) and last 3 messages (recent context)
    const important = [
      ...conversationHistory.slice(0, 2),
      ...conversationHistory.slice(-3),
    ];

    // If still too long, keep only last 3
    if (important.length > 5) {
      return conversationHistory.slice(-3);
    }

    return important;
  }

  /**
   * Check if requests can be batched
   */
  canBatch(action1: AIAction, action2: AIAction): boolean {
    // Same tool and model
    if (action1.tool !== action2.tool) return false;
    if (action1.model !== action2.model) return false;

    // Same action type
    if (action1.action !== action2.action) return false;

    // Compatible parameters
    if (action1.action === 'generate_image' && action2.action === 'generate_image') {
      return (
        action1.parameters.aspectRatio === action2.parameters.aspectRatio &&
        action1.parameters.style === action2.parameters.style
      );
    }

    return true;
  }

  /**
   * Calculate optimal batch size
   */
  calculateBatchSize(actionCount: number, priority: 'speed' | 'cost'): number {
    if (priority === 'speed') {
      // Smaller batches for faster response
      return Math.min(actionCount, 2);
    } else {
      // Larger batches for better cost efficiency
      return Math.min(actionCount, 5);
    }
  }

  /**
   * Recommend optimizations for user
   */
  recommendOptimizations(
    template: ProjectTemplate,
    userBudget?: number
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    const estimatedCost = template.estimatedCost.apiCost || 0;

    if (userBudget && estimatedCost > userBudget) {
      recommendations.push({
        priority: 'high',
        title: 'Reduce Image Quality',
        description: 'Use standard quality instead of premium to save ~30%',
        estimatedSaving: estimatedCost * 0.3,
        impact: 'Some images will be less detailed',
      });

      recommendations.push({
        priority: 'medium',
        title: 'Limit Asset Count',
        description: 'Generate fewer variations and iterations',
        estimatedSaving: estimatedCost * 0.2,
        impact: 'Fewer assets to choose from',
      });
    }

    // Always recommend caching
    recommendations.push({
      priority: 'low',
      title: 'Enable Result Caching',
      description: 'Cache intermediate results for faster iterations',
      estimatedSaving: estimatedCost * 0.1,
      impact: 'None - improves performance',
    });

    return recommendations;
  }
}

// ============ INTERFACES ============

export interface ProjectCostEstimate {
  estimatedCost: number;
  estimatedArc: number;
  breakdown: CostBreakdownItem[];
  warnings: string[];
}

export interface CostBreakdownItem {
  step: string;
  action: string;
  tool: string;
  estimatedCost: number;
}

export interface OptimizationRecommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedSaving: number;
  impact: string;
}

// Create singleton instance
export const projectFlowOptimizer = new ProjectFlowOptimizer();
