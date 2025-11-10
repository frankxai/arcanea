/**
 * Luminor - Specialized AI assistant for specific creative domains
 * Base class for Prismatic, Melodia, Chronica, and Synthesis
 */

import type {
  LuminorConfig,
  AcademyType,
  AgentTask,
  AgentResult,
  Essence,
  ToolDefinition,
  ToolContext,
} from '@arcanea/ai-core/types';
import { ClaudeProvider } from '@arcanea/ai-core/providers/claude';
import { LuminorError } from '@arcanea/ai-core/types';

export class Luminor {
  public readonly name: string;
  protected readonly academy: AcademyType;
  protected readonly specialty: string;
  protected readonly systemPrompt: string;
  protected provider: ClaudeProvider;
  protected tools: Map<string, ToolDefinition>;
  protected capabilities: string[];

  constructor(config: LuminorConfig) {
    this.name = config.name;
    this.academy = config.academy;
    this.specialty = config.specialty;
    this.systemPrompt = config.systemPrompt;
    this.capabilities = config.capabilities || [];
    this.tools = new Map();

    // Initialize provider
    this.provider = new ClaudeProvider({
      model: 'claude-sonnet-4-5-20250929',
    });

    // Register tools
    config.tools.forEach((tool) => {
      this.tools.set(tool.name, tool);
    });
  }

  /**
   * Execute a task
   */
  async execute(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();
    const toolsUsed: string[] = [];

    try {
      let result: any;

      switch (task.type) {
        case 'create':
          result = await this.create(task.input, task.context);
          break;
        case 'analyze':
          result = await this.analyze(task.input, task.context);
          break;
        case 'improve':
          result = await this.improve(task.input, task.context);
          break;
        default:
          throw new LuminorError(
            `Unsupported task type: ${task.type}`,
            this.name
          );
      }

      return {
        success: true,
        data: result,
        metadata: {
          duration: Date.now() - startTime,
          toolsUsed,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
        metadata: {
          duration: Date.now() - startTime,
          toolsUsed,
        },
      };
    }
  }

  /**
   * Create new Essence
   * Override in specialized Luminors
   */
  protected async create(
    input: any,
    context?: ToolContext
  ): Promise<Essence> {
    throw new LuminorError(
      `create() not implemented for ${this.name}`,
      this.name
    );
  }

  /**
   * Analyze existing Essence
   * Override in specialized Luminors
   */
  protected async analyze(input: any, context?: ToolContext): Promise<any> {
    throw new LuminorError(
      `analyze() not implemented for ${this.name}`,
      this.name
    );
  }

  /**
   * Improve existing Essence
   * Override in specialized Luminors
   */
  protected async improve(input: any, context?: ToolContext): Promise<Essence> {
    throw new LuminorError(
      `improve() not implemented for ${this.name}`,
      this.name
    );
  }

  /**
   * Chat with the Luminor
   */
  async chat(message: string, context?: ToolContext): Promise<string> {
    const prompt = this.buildPrompt(message, context);

    return await this.provider.generateText(prompt, {
      tools: Array.from(this.tools.values()),
      temperature: 0.8, // Luminors are more creative
    });
  }

  /**
   * Stream chat responses
   */
  async *streamChat(
    message: string,
    context?: ToolContext
  ): AsyncGenerator<string> {
    const prompt = this.buildPrompt(message, context);

    for await (const chunk of this.provider.streamText(prompt, {
      tools: Array.from(this.tools.values()),
      temperature: 0.8,
    })) {
      yield chunk;
    }
  }

  /**
   * Execute a specific tool
   */
  protected async useTool(
    toolName: string,
    params: any,
    context?: ToolContext
  ): Promise<any> {
    const tool = this.tools.get(toolName);

    if (!tool) {
      throw new LuminorError(
        `Tool "${toolName}" not found in ${this.name}`,
        this.name
      );
    }

    try {
      return await tool.execute(params, context);
    } catch (error) {
      throw new LuminorError(
        `Tool execution failed: ${toolName}`,
        this.name,
        { originalError: error }
      );
    }
  }

  /**
   * Build complete prompt with system context
   */
  protected buildPrompt(message: string, context?: ToolContext): string {
    let prompt = this.systemPrompt + '\n\n';

    // Add context if available
    if (context?.academyContext) {
      prompt += `Academy Context: ${context.academyContext}\n`;
    }

    if (context?.realmId) {
      prompt += `Working in Realm: ${context.realmId}\n`;
    }

    prompt += `\nCreator: ${message}`;

    return prompt;
  }

  /**
   * Get Luminor metadata
   */
  getAcademy(): AcademyType {
    return this.academy;
  }

  getSpecialty(): string {
    return this.specialty;
  }

  getCapabilities(): string[] {
    return this.capabilities;
  }

  getTools(): string[] {
    return Array.from(this.tools.keys());
  }
}
