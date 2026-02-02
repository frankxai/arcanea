/**
 * AI Provider Type Definitions for Arcanea
 */

import { z } from 'zod';

export interface ArcaneanProvider {
  readonly name: string;
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;
  streamText?(prompt: string, options?: GenerateOptions): AsyncGenerator<string>;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  stopSequences?: string[];
  tools?: ToolDefinition[];
  systemPrompt?: string;
  safetySettings?: SafetySetting[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: z.ZodSchema<any>;
}

export interface SafetySetting {
  category: string;
  threshold: string;
}
