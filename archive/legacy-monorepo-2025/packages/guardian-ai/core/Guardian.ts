/**
 * Guardian - Personal AI companion for Arcanean Creators
 * Orchestrates Luminors and manages Creator journey
 */

import type {
  GuardianConfig,
  GuardianMemory,
  ToolDefinition,
  AgentTask,
  AgentResult,
} from '@arcanea/ai-core/types';
import { ClaudeProvider } from '@arcanea/ai-core/providers/claude';
import { Luminor } from './Luminor';

export class Guardian {
  public readonly name: string;
  private provider: ClaudeProvider;
  private systemPrompt: string;
  private tools: Map<string, ToolDefinition>;
  private luminors: Map<string, Luminor>;
  private memory: GuardianMemory[];
  private memoryEnabled: boolean;

  constructor(config: GuardianConfig) {
    this.name = config.name;
    this.systemPrompt = config.systemPrompt;
    this.memoryEnabled = config.memoryEnabled ?? true;
    this.memory = [];
    this.tools = new Map();
    this.luminors = new Map();

    // Initialize provider
    this.provider = new ClaudeProvider({
      model: config.model || 'claude-sonnet-4-5-20250929',
    });

    // Register tools
    if (config.tools) {
      config.tools.forEach((tool) => {
        this.tools.set(tool.name, tool);
      });
    }

    // Initialize Luminors
    if (config.luminors) {
      config.luminors.forEach((luminorConfig) => {
        const luminor = new Luminor(luminorConfig);
        this.luminors.set(luminorConfig.name, luminor);
      });
    }
  }

  /**
   * Chat with the Guardian
   */
  async chat(message: string, context?: any): Promise<string> {
    const fullPrompt = this.buildPrompt(message, context);

    const response = await this.provider.generateText(fullPrompt, {
      tools: Array.from(this.tools.values()),
      temperature: 0.7,
    });

    // Store in memory if enabled
    if (this.memoryEnabled && context?.creatorId) {
      this.remember({
        sessionId: context.sessionId || 'default',
        creatorId: context.creatorId,
        timestamp: new Date(),
        context: message,
        summary: response.substring(0, 200),
        importance: 'medium',
      });
    }

    return response;
  }

  /**
   * Stream chat responses
   */
  async *streamChat(message: string, context?: any): AsyncGenerator<string> {
    const fullPrompt = this.buildPrompt(message, context);

    for await (const chunk of this.provider.streamText(fullPrompt, {
      tools: Array.from(this.tools.values()),
      temperature: 0.7,
    })) {
      yield chunk;
    }
  }

  /**
   * Delegate task to a specific Luminor
   */
  async delegateToLuminor(
    luminorName: string,
    task: AgentTask
  ): Promise<AgentResult> {
    const luminor = this.luminors.get(luminorName);

    if (!luminor) {
      return {
        success: false,
        error: new Error(`Luminor "${luminorName}" not found`),
      };
    }

    return await luminor.execute(task);
  }

  /**
   * Get appropriate Luminor for a task
   */
  async selectLuminor(taskDescription: string): Promise<string | null> {
    const luminorList = Array.from(this.luminors.entries())
      .map(([name, luminor]) => ({
        name,
        specialty: luminor.getSpecialty(),
        academy: luminor.getAcademy(),
      }))
      .map((l) => `- ${l.name}: ${l.specialty} (${l.academy} Academy)`)
      .join('\n');

    const prompt = `Given this task: "${taskDescription}"

Available Luminors:
${luminorList}

Which Luminor is best suited for this task? Respond with ONLY the Luminor name, or "NONE" if none are suitable.`;

    const response = await this.provider.generateText(prompt, {
      temperature: 0.3,
      maxTokens: 50,
    });

    const selectedName = response.trim();
    return this.luminors.has(selectedName) ? selectedName : null;
  }

  /**
   * Remember context for future interactions
   */
  remember(memory: GuardianMemory): void {
    this.memory.push(memory);

    // Keep only last 100 memories (simple memory management)
    if (this.memory.length > 100) {
      this.memory = this.memory.slice(-100);
    }
  }

  /**
   * Retrieve relevant memories
   */
  recall(creatorId: string, limit: number = 5): GuardianMemory[] {
    return this.memory
      .filter((m) => m.creatorId === creatorId)
      .sort((a, b) => {
        // Sort by importance and recency
        const importanceWeight = { high: 3, medium: 2, low: 1 };
        const scoreA =
          importanceWeight[a.importance] + (a.timestamp.getTime() / 1000000);
        const scoreB =
          importanceWeight[b.importance] + (b.timestamp.getTime() / 1000000);
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  /**
   * Build complete prompt with system context and memory
   */
  private buildPrompt(message: string, context?: any): string {
    let prompt = this.systemPrompt + '\n\n';

    // Add relevant memories if available
    if (this.memoryEnabled && context?.creatorId) {
      const memories = this.recall(context.creatorId, 3);
      if (memories.length > 0) {
        prompt += 'Recent context:\n';
        memories.forEach((m) => {
          prompt += `- ${m.summary}\n`;
        });
        prompt += '\n';
      }
    }

    // Add current Academy context if available
    if (context?.academyContext) {
      prompt += `Current Academy: ${context.academyContext}\n\n`;
    }

    // Add user message
    prompt += `Creator: ${message}`;

    return prompt;
  }

  /**
   * Get available Luminors
   */
  getLuminors(): string[] {
    return Array.from(this.luminors.keys());
  }

  /**
   * Get available tools
   */
  getTools(): string[] {
    return Array.from(this.tools.keys());
  }
}
