/**
 * Claude Provider for Arcanea
 * Wraps Anthropic SDK with Arcanean conventions
 */

import Anthropic from '@anthropic-ai/sdk';
import type { ArcaneanProvider, GenerateOptions, ToolDefinition } from '../types';

export class ClaudeProvider implements ArcaneanProvider {
  public readonly name = 'claude';
  public readonly model: string;
  private client: Anthropic;

  constructor(config: {
    apiKey?: string;
    model?: string;
  } = {}) {
    this.client = new Anthropic({
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    });

    this.model = config.model || 'claude-sonnet-4-5-20250929';
  }

  /**
   * Generate text from a prompt
   */
  async generateText(
    prompt: string,
    options: GenerateOptions = {}
  ): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 1.0,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stop_sequences: options.stopSequences,
      tools: options.tools ? this.convertTools(options.tools) : undefined,
    });

    const firstContent = response.content[0];
    if (firstContent.type === 'text') {
      return firstContent.text;
    }

    throw new Error('Unexpected response format from Claude');
  }

  /**
   * Stream text from a prompt
   */
  async *streamText(
    prompt: string,
    options: GenerateOptions = {}
  ): AsyncGenerator<string> {
    const stream = await this.client.messages.create({
      model: this.model,
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 1.0,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
      stop_sequences: options.stopSequences,
      tools: options.tools ? this.convertTools(options.tools) : undefined,
    });

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        yield chunk.delta.text;
      }
    }
  }

  /**
   * Convert Arcanean tool definitions to Anthropic format
   */
  private convertTools(tools: ToolDefinition[]): any[] {
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      input_schema: this.zodToJsonSchema(tool.parameters),
    }));
  }

  /**
   * Convert Zod schema to JSON Schema (simplified)
   */
  private zodToJsonSchema(schema: any): any {
    // This is a simplified conversion
    // In production, use @anatine/zod-to-openapi or similar
    if (schema._def?.typeName === 'ZodObject') {
      const shape = schema._def.shape();
      const properties: any = {};
      const required: string[] = [];

      for (const [key, value] of Object.entries(shape)) {
        properties[key] = this.zodToJsonSchema(value);
        if (!(value as any)._def.isOptional) {
          required.push(key);
        }
      }

      return {
        type: 'object',
        properties,
        required: required.length > 0 ? required : undefined,
      };
    }

    if (schema._def?.typeName === 'ZodString') {
      return {
        type: 'string',
        description: schema._def.description,
      };
    }

    if (schema._def?.typeName === 'ZodNumber') {
      return {
        type: 'number',
        description: schema._def.description,
      };
    }

    if (schema._def?.typeName === 'ZodBoolean') {
      return {
        type: 'boolean',
        description: schema._def.description,
      };
    }

    if (schema._def?.typeName === 'ZodArray') {
      return {
        type: 'array',
        items: this.zodToJsonSchema(schema._def.type),
      };
    }

    if (schema._def?.typeName === 'ZodEnum') {
      return {
        type: 'string',
        enum: schema._def.values,
      };
    }

    // Fallback
    return { type: 'string' };
  }
}

/**
 * Factory function to create Claude provider
 */
export function createClaudeProvider(config?: {
  apiKey?: string;
  model?: string;
}): ClaudeProvider {
  return new ClaudeProvider(config);
}
