/**
 * Gemini Chat Provider using Vercel AI SDK
 * Provides text generation and multimodal chat with Gemini 2.0 Flash
 */

import { google } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';

export interface GeminiChatConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
}

export interface ChatOptions {
  systemPrompt?: string;
  images?: string[];
  history?: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponse {
  text: string;
  tokensUsed?: {
    input: number;
    output: number;
  };
  cost?: number;
  finishReason?: string;
}

export function createGeminiChatProvider(config: GeminiChatConfig = {}) {
  const {
    apiKey = process.env.GEMINI_API_KEY,
    model = 'gemini-2.0-flash-exp',
    temperature = 0.7,
    maxTokens = 8192,
    topP = 0.95,
    topK = 40,
  } = config;

  if (!apiKey) {
    throw new Error('Gemini API key is required. Set GEMINI_API_KEY environment variable.');
  }

  const geminiModel = google(model, { apiKey });

  return {
    id: 'gemini-chat',
    model,
    provider: 'google',

    /**
     * Generate a single chat completion
     */
    async chat(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
      const messages = [];

      // Add history if provided
      if (options.history && options.history.length > 0) {
        for (const msg of options.history) {
          messages.push({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts.map(p => p.text).join('\n'),
          });
        }
      }

      // Add current user message
      messages.push({
        role: 'user',
        content: prompt,
      });

      const result = await generateText({
        model: geminiModel,
        system: options.systemPrompt,
        messages,
        temperature: options.temperature ?? temperature,
        maxTokens: options.maxTokens ?? maxTokens,
        topP,
        topK,
      });

      return {
        text: result.text,
        tokensUsed: result.usage
          ? {
              input: result.usage.promptTokens,
              output: result.usage.completionTokens,
            }
          : undefined,
        finishReason: result.finishReason,
      };
    },

    /**
     * Stream a chat completion
     */
    streamText(prompt: string, options: ChatOptions = {}) {
      const messages = [];

      // Add history if provided
      if (options.history && options.history.length > 0) {
        for (const msg of options.history) {
          messages.push({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts.map(p => p.text).join('\n'),
          });
        }
      }

      // Add current user message
      messages.push({
        role: 'user',
        content: prompt,
      });

      return streamText({
        model: geminiModel,
        system: options.systemPrompt,
        messages,
        temperature: options.temperature ?? temperature,
        maxTokens: options.maxTokens ?? maxTokens,
        topP,
        topK,
      });
    },
  };
}

export default createGeminiChatProvider;
