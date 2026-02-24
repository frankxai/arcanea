/**
 * Project Flow Engine
 * Orchestrates multi-turn creation flows
 */

import {
  ProjectFlowState,
  ProjectFlowStatus,
  ProjectTemplate,
  ProjectStep,
  ProjectConversationTurn,
  GeneratedAsset,
  StepType,
  AIAction,
  ProjectType,
} from '../types/projects';
import { LuminorContext } from '../types/luminor';

export class ProjectFlowEngine {
  private state: ProjectFlowState;
  private template: ProjectTemplate;

  constructor(template: ProjectTemplate, initialState: Partial<ProjectFlowState>) {
    this.template = template;
    this.state = this.initializeState(initialState);
  }

  /**
   * Initialize project flow state
   */
  private initializeState(partial: Partial<ProjectFlowState>): ProjectFlowState {
    const now = new Date();
    return {
      projectId: partial.projectId || this.generateId(),
      userId: partial.userId!,
      templateId: this.template.id,
      sessionId: partial.sessionId || this.generateId(),
      currentStep: 0,
      totalSteps: this.template.steps.length,
      status: ProjectFlowStatus.INITIALIZING,
      context: partial.context!,
      collectedData: {},
      conversationHistory: [],
      generatedAssets: [],
      intermediateResults: [],
      completedGoals: [],
      pendingGoals: this.template.goals.filter(g => g.type === 'required').map(g => g.id),
      startedAt: now,
      lastActiveAt: now,
    };
  }

  /**
   * Start the project flow
   */
  async start(): Promise<ProjectFlowResponse> {
    this.state.status = ProjectFlowStatus.IN_PROGRESS;
    this.state.currentStep = 0;

    const currentStep = this.template.steps[0];
    const message = this.buildLuminorMessage(currentStep, true);

    this.addConversationTurn('luminor', message, 0);

    return {
      status: this.state.status,
      currentStep: this.state.currentStep,
      message,
      suggestions: this.buildSuggestions(currentStep),
      progress: this.calculateProgress(),
      state: this.state,
    };
  }

  /**
   * Process user input and advance flow
   */
  async processUserInput(userInput: string): Promise<ProjectFlowResponse> {
    if (this.state.status === ProjectFlowStatus.COMPLETED) {
      return this.buildResponse('Project is already completed!');
    }

    // Add user turn
    this.addConversationTurn('user', userInput, this.state.currentStep);

    const currentStep = this.template.steps[this.state.currentStep];

    // Extract and validate data from input
    const extractedData = await this.extractDataFromInput(userInput, currentStep);

    if (extractedData.isValid) {
      // Store collected data
      Object.assign(this.state.collectedData, extractedData.data);

      // Execute AI actions if any
      if (currentStep.aiActions && currentStep.aiActions.length > 0) {
        this.state.status = ProjectFlowStatus.GENERATING;
        await this.executeAIActions(currentStep.aiActions, this.state.currentStep);
      }

      // Check if goals are completed
      this.updateGoalProgress();

      // Advance to next step
      return await this.advanceToNextStep(currentStep);
    } else {
      // Invalid input, request clarification
      const clarificationMessage = this.buildClarificationMessage(
        currentStep,
        extractedData.missingFields || []
      );

      this.addConversationTurn('luminor', clarificationMessage, this.state.currentStep);

      return this.buildResponse(clarificationMessage);
    }
  }

  /**
   * Advance to next step
   */
  private async advanceToNextStep(currentStep: ProjectStep): Promise<ProjectFlowResponse> {
    const nextStepNumber = this.determineNextStep(currentStep);

    if (nextStepNumber >= this.template.steps.length) {
      // Flow completed
      return await this.completeFlow();
    }

    // Move to next step
    this.state.currentStep = nextStepNumber;
    this.state.status = ProjectFlowStatus.WAITING_FOR_INPUT;

    const nextStep = this.template.steps[nextStepNumber];
    const message = this.buildLuminorMessage(nextStep, false);

    this.addConversationTurn('luminor', message, nextStepNumber);

    return this.buildResponse(message, this.buildSuggestions(nextStep));
  }

  /**
   * Determine next step based on branching logic
   */
  private determineNextStep(currentStep: ProjectStep): number {
    if (currentStep.branchingLogic) {
      const { condition, branches } = currentStep.branchingLogic;

      // Evaluate condition based on collected data
      const conditionResult = this.evaluateCondition(condition);

      if (branches[conditionResult] !== undefined) {
        return branches[conditionResult];
      }
    }

    return this.state.currentStep + 1;
  }

  /**
   * Execute AI actions for a step
   */
  private async executeAIActions(
    actions: AIAction[],
    stepNumber: number
  ): Promise<void> {
    for (const action of actions) {
      const context = this.buildAIContext(action);
      let asset: GeneratedAsset | null = null;

      switch (action.action) {
        case 'generate_text':
          asset = await this.generateText(action, context);
          break;
        case 'generate_image':
          asset = await this.generateImage(action, context);
          break;
        case 'generate_music':
          asset = await this.generateMusic(action, context);
          break;
        case 'analyze':
          asset = await this.analyzeContent(action, context);
          break;
        case 'combine':
          asset = await this.combineResults(action, context);
          break;
      }

      if (asset) {
        asset.stepNumber = stepNumber;
        this.state.generatedAssets.push(asset);

        // Save result with key if specified
        if (action.saveAs) {
          this.state.collectedData[action.saveAs] = asset;
        }
      }
    }
  }

  /**
   * Build AI context from previous data
   */
  private buildAIContext(action: AIAction): Record<string, any> {
    const context: Record<string, any> = {
      ...action.parameters,
    };

    if (action.usePreviousContext) {
      context.collectedData = this.state.collectedData;
      context.conversationHistory = this.state.conversationHistory;
      context.projectType = this.state.context.projectType;
      context.preferences = this.state.context.preferences;
    }

    return context;
  }

  /**
   * Generate text content
   */
  private async generateText(
    action: AIAction,
    context: Record<string, any>
  ): Promise<GeneratedAsset> {
    // This would call Claude API
    const prompt = this.buildPromptFromContext(context);

    // Placeholder for actual API call
    const generatedContent = `Generated text for: ${prompt}`;

    return {
      id: this.generateId(),
      type: 'text' as any,
      content: generatedContent,
      prompt,
      tool: action.tool,
      model: action.model || 'claude-3-5-sonnet-20241022',
      metadata: context,
      stepNumber: this.state.currentStep,
      generatedAt: new Date(),
    };
  }

  /**
   * Generate image
   */
  private async generateImage(
    action: AIAction,
    context: Record<string, any>
  ): Promise<GeneratedAsset> {
    // This would call Gemini Imagen API
    const prompt = this.buildPromptFromContext(context);

    return {
      id: this.generateId(),
      type: 'image' as any,
      url: `https://generated-image-url.com/${this.generateId()}.png`,
      prompt,
      tool: action.tool,
      model: action.model || 'imagen-3.0-generate-001',
      metadata: context,
      stepNumber: this.state.currentStep,
      generatedAt: new Date(),
    };
  }

  /**
   * Generate music
   */
  private async generateMusic(
    action: AIAction,
    context: Record<string, any>
  ): Promise<GeneratedAsset> {
    // This would call Suno API
    const prompt = this.buildPromptFromContext(context);

    return {
      id: this.generateId(),
      type: 'music' as any,
      url: `https://generated-music-url.com/${this.generateId()}.mp3`,
      prompt,
      tool: action.tool,
      model: action.model || 'chirp-v3-0',
      metadata: context,
      stepNumber: this.state.currentStep,
      generatedAt: new Date(),
    };
  }

  /**
   * Analyze content
   */
  private async analyzeContent(
    action: AIAction,
    context: Record<string, any>
  ): Promise<GeneratedAsset> {
    const contentToAnalyze = context.content || this.state.collectedData;

    return {
      id: this.generateId(),
      type: 'text' as any,
      content: `Analysis of content: ${JSON.stringify(contentToAnalyze).slice(0, 100)}...`,
      tool: action.tool,
      model: action.model,
      metadata: { analysis: true, ...context },
      stepNumber: this.state.currentStep,
      generatedAt: new Date(),
    };
  }

  /**
   * Combine multiple results
   */
  private async combineResults(
    action: AIAction,
    context: Record<string, any>
  ): Promise<GeneratedAsset> {
    const assets = this.state.generatedAssets.filter(a =>
      action.parameters.assetIds?.includes(a.id)
    );

    return {
      id: this.generateId(),
      type: 'text' as any,
      content: `Combined ${assets.length} assets`,
      tool: action.tool,
      metadata: { combinedAssets: assets.map(a => a.id), ...context },
      stepNumber: this.state.currentStep,
      generatedAt: new Date(),
    };
  }

  /**
   * Build prompt from context
   */
  private buildPromptFromContext(context: Record<string, any>): string {
    const parts: string[] = [];

    if (context.basePrompt) {
      parts.push(context.basePrompt);
    }

    if (context.collectedData) {
      const relevantData = Object.entries(context.collectedData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      parts.push(relevantData);
    }

    if (context.style) parts.push(`Style: ${context.style}`);
    if (context.mood) parts.push(`Mood: ${context.mood}`);
    if (context.tone) parts.push(`Tone: ${context.tone}`);

    return parts.join('. ');
  }

  /**
   * Extract data from user input
   */
  private async extractDataFromInput(
    input: string,
    step: ProjectStep
  ): Promise<{ isValid: boolean; data?: Record<string, any>; missingFields?: string[] }> {
    const data: Record<string, any> = {};
    const missingFields: string[] = [];

    // Simple extraction based on expected inputs
    if (step.expectedInput) {
      for (const field of step.expectedInput) {
        // Basic keyword matching (in production, use NLP/LLM for extraction)
        if (input.toLowerCase().includes(field.toLowerCase())) {
          data[field] = input;
        } else if (step.validationRules?.some(r => r.field === field && r.type === 'required')) {
          missingFields.push(field);
        }
      }
    } else {
      // Store raw input
      data['userInput'] = input;
    }

    // Validate against rules
    if (step.validationRules) {
      for (const rule of step.validationRules) {
        if (rule.type === 'required' && !data[rule.field]) {
          missingFields.push(rule.field);
        }
      }
    }

    return {
      isValid: missingFields.length === 0,
      data: missingFields.length === 0 ? data : undefined,
      missingFields: missingFields.length > 0 ? missingFields : undefined,
    };
  }

  /**
   * Build Luminor message for step
   */
  private buildLuminorMessage(step: ProjectStep, isFirst: boolean): string {
    const parts: string[] = [];

    if (isFirst) {
      parts.push(this.template.luminorPersonality.openingMessage);
    }

    parts.push(step.prompt);

    return parts.join('\n\n');
  }

  /**
   * Build clarification message
   */
  private buildClarificationMessage(step: ProjectStep, missingFields: string[]): string {
    return `I need a bit more information to continue. Could you please tell me about: ${missingFields.join(', ')}?`;
  }

  /**
   * Build suggestions for current step
   */
  private buildSuggestions(step: ProjectStep): string[] {
    // Return example responses or options
    return step.expectedInput || [];
  }

  /**
   * Complete the project flow
   */
  private async completeFlow(): Promise<ProjectFlowResponse> {
    this.state.status = ProjectFlowStatus.COMPLETED;
    this.state.completedAt = new Date();

    const completionMessage = this.buildCompletionMessage();
    this.addConversationTurn('luminor', completionMessage, this.state.currentStep);

    return {
      status: this.state.status,
      currentStep: this.state.currentStep,
      message: completionMessage,
      progress: 100,
      state: this.state,
      completed: true,
      assets: this.state.generatedAssets,
    };
  }

  /**
   * Build completion message
   */
  private buildCompletionMessage(): string {
    const assetCount = this.state.generatedAssets.length;
    const celebration = this.template.luminorPersonality.celebrationMessages[0] ||
      'Congratulations!';

    return `${celebration} Your ${this.template.name} is complete! I've generated ${assetCount} assets for your project. Let's review what we've created together.`;
  }

  /**
   * Update goal progress
   */
  private updateGoalProgress(): void {
    for (const goal of this.template.goals) {
      if (this.state.completedGoals.includes(goal.id)) continue;

      // Check if goal is completed based on criteria
      const isCompleted = this.evaluateGoalCompletion(goal);

      if (isCompleted) {
        this.state.completedGoals.push(goal.id);
        this.state.pendingGoals = this.state.pendingGoals.filter(id => id !== goal.id);
      }
    }
  }

  /**
   * Evaluate goal completion
   */
  private evaluateGoalCompletion(goal: any): boolean {
    // Simple evaluation - check if required assets exist
    if (goal.assets) {
      return goal.assets.every((assetType: string) =>
        this.state.generatedAssets.some(a => a.type === assetType)
      );
    }
    return false;
  }

  /**
   * Evaluate condition
   */
  private evaluateCondition(condition: string): string {
    // Simple condition evaluation
    // In production, use a proper expression evaluator
    const data = this.state.collectedData;

    if (condition.includes('style')) {
      return data.style || 'default';
    }

    return 'default';
  }

  /**
   * Calculate progress percentage
   */
  private calculateProgress(): number {
    if (this.state.status === ProjectFlowStatus.COMPLETED) return 100;

    const stepProgress = (this.state.currentStep / this.template.steps.length) * 70;
    const goalProgress = (this.state.completedGoals.length /
      (this.template.goals.filter(g => g.type === 'required').length || 1)) * 30;

    return Math.round(stepProgress + goalProgress);
  }

  /**
   * Add conversation turn
   */
  private addConversationTurn(
    role: 'user' | 'luminor' | 'system',
    content: string,
    stepNumber: number
  ): void {
    this.state.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
      stepNumber,
    });
    this.state.lastActiveAt = new Date();
  }

  /**
   * Build response object
   */
  private buildResponse(message: string, suggestions?: string[]): ProjectFlowResponse {
    return {
      status: this.state.status,
      currentStep: this.state.currentStep,
      message,
      suggestions,
      progress: this.calculateProgress(),
      state: this.state,
    };
  }

  /**
   * Get current state
   */
  getState(): ProjectFlowState {
    return { ...this.state };
  }

  /**
   * Restore state (for resuming)
   */
  restoreState(state: ProjectFlowState): void {
    this.state = state;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export interface ProjectFlowResponse {
  status: ProjectFlowStatus;
  currentStep: number;
  message: string;
  suggestions?: string[];
  progress: number;
  state: ProjectFlowState;
  completed?: boolean;
  assets?: GeneratedAsset[];
}
