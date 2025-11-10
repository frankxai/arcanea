/**
 * Gemini Chat Provider for Arcanea MVP
 * Implements streaming chat with Gemini 2.0 Flash
 * Supports multimodal input (text + images)
 */

import { GoogleGenerativeAI, GenerativeModel, ChatSession, Content, Part } from '@google/generative-ai';
import type { ArcaneanProvider, GenerateOptions } from '../types';

export interface GeminiChatConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  safetySettings?: any[];
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Part[];
}

export interface GeminiChatOptions extends GenerateOptions {
  systemPrompt?: string;
  images?: string[]; // URLs or base64 data URIs
  history?: GeminiMessage[];
}

export interface GeminiChatResponse {
  text: string;
  tokensUsed?: {
    input: number;
    output: number;
    total: number;
  };
  cost?: number;
  finishReason?: string;
  safetyRatings?: any[];
}

export class GeminiChatProvider implements ArcaneanProvider {
  public readonly name = 'gemini-chat';
  public readonly model: string;
  private client: GoogleGenerativeAI;
  private generativeModel: GenerativeModel;
  private chatSession?: ChatSession;

  // Gemini 2.0 Flash pricing (as of Dec 2024)
  private readonly PRICE_PER_1M_INPUT_TOKENS = 0.075; // $0.075 per 1M tokens
  private readonly PRICE_PER_1M_OUTPUT_TOKENS = 0.30; // $0.30 per 1M tokens

  constructor(config: GeminiChatConfig = {}) {
    const apiKey = config.apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error('Gemini API key is required. Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.');
    }

    this.model = config.model || 'gemini-2.0-flash-exp';
    this.client = new GoogleGenerativeAI(apiKey);

    this.generativeModel = this.client.getGenerativeModel({
      model: this.model,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxTokens ?? 8192,
        topP: 0.95,
        topK: 40,
      },
      safetySettings: config.safetySettings || this.getDefaultSafetySettings(),
    });
  }

  /**
   * Generate text response (non-streaming)
   */
  async generateText(prompt: string, options: GeminiChatOptions = {}): Promise<string> {
    try {
      const parts = this.buildParts(prompt, options.images);

      let model = this.generativeModel;

      // If system prompt is provided, create new model with system instruction
      if (options.systemPrompt) {
        model = this.client.getGenerativeModel({
          model: this.model,
          systemInstruction: options.systemPrompt,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 8192,
          },
          safetySettings: this.getDefaultSafetySettings(),
        });
      }

      // Use chat session if history exists
      if (options.history && options.history.length > 0) {
        const chat = model.startChat({
          history: options.history.map(msg => ({
            role: msg.role,
            parts: msg.parts,
          })),
        });

        const result = await chat.sendMessage(parts);
        return result.response.text();
      }

      // Single generation without history
      const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
      return result.response.text();
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      throw new Error(`Gemini chat error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Stream text generation
   */
  async *streamText(prompt: string, options: GeminiChatOptions = {}): AsyncGenerator<string> {
    try {
      const parts = this.buildParts(prompt, options.images);

      let model = this.generativeModel;

      // If system prompt is provided, create new model with system instruction
      if (options.systemPrompt) {
        model = this.client.getGenerativeModel({
          model: this.model,
          systemInstruction: options.systemPrompt,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 8192,
          },
          safetySettings: this.getDefaultSafetySettings(),
        });
      }

      // Use chat session if history exists
      if (options.history && options.history.length > 0) {
        const chat = model.startChat({
          history: options.history.map(msg => ({
            role: msg.role,
            parts: msg.parts,
          })),
        });

        const result = await chat.sendMessageStream(parts);

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            yield text;
          }
        }
        return;
      }

      // Single generation without history
      const result = await model.generateContentStream({ contents: [{ role: 'user', parts }] });

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error('Error streaming text with Gemini:', error);
      throw new Error(`Gemini stream error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate with full response metadata
   */
  async chat(prompt: string, options: GeminiChatOptions = {}): Promise<GeminiChatResponse> {
    try {
      const parts = this.buildParts(prompt, options.images);

      let model = this.generativeModel;

      if (options.systemPrompt) {
        model = this.client.getGenerativeModel({
          model: this.model,
          systemInstruction: options.systemPrompt,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 8192,
          },
          safetySettings: this.getDefaultSafetySettings(),
        });
      }

      const result = options.history && options.history.length > 0
        ? await model.startChat({ history: options.history }).sendMessage(parts)
        : await model.generateContent({ contents: [{ role: 'user', parts }] });

      const response = result.response;
      const usageMetadata = response.usageMetadata;

      const tokensUsed = usageMetadata ? {
        input: usageMetadata.promptTokenCount || 0,
        output: usageMetadata.candidatesTokenCount || 0,
        total: usageMetadata.totalTokenCount || 0,
      } : undefined;

      const cost = tokensUsed ? this.calculateCost(tokensUsed.input, tokensUsed.output) : undefined;

      return {
        text: response.text(),
        tokensUsed,
        cost,
        finishReason: response.candidates?.[0]?.finishReason,
        safetyRatings: response.candidates?.[0]?.safetyRatings,
      };
    } catch (error) {
      console.error('Error in Gemini chat:', error);
      throw new Error(`Gemini chat error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Start a persistent chat session
   */
  startSession(options: { systemPrompt?: string; history?: GeminiMessage[] } = {}): ChatSession {
    let model = this.generativeModel;

    if (options.systemPrompt) {
      model = this.client.getGenerativeModel({
        model: this.model,
        systemInstruction: options.systemPrompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
        safetySettings: this.getDefaultSafetySettings(),
      });
    }

    this.chatSession = model.startChat({
      history: options.history || [],
    });

    return this.chatSession;
  }

  /**
   * Send message in existing session
   */
  async sendMessage(message: string, images?: string[]): Promise<GeminiChatResponse> {
    if (!this.chatSession) {
      throw new Error('No active chat session. Call startSession() first.');
    }

    try {
      const parts = this.buildParts(message, images);
      const result = await this.chatSession.sendMessage(parts);
      const response = result.response;
      const usageMetadata = response.usageMetadata;

      const tokensUsed = usageMetadata ? {
        input: usageMetadata.promptTokenCount || 0,
        output: usageMetadata.candidatesTokenCount || 0,
        total: usageMetadata.totalTokenCount || 0,
      } : undefined;

      return {
        text: response.text(),
        tokensUsed,
        cost: tokensUsed ? this.calculateCost(tokensUsed.input, tokensUsed.output) : undefined,
        finishReason: response.candidates?.[0]?.finishReason,
        safetyRatings: response.candidates?.[0]?.safetyRatings,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error(`Send message error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get chat history from current session
   */
  async getHistory(): Promise<Content[]> {
    if (!this.chatSession) {
      return [];
    }
    return await this.chatSession.getHistory();
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private buildParts(text: string, images?: string[]): Part[] {
    const parts: Part[] = [{ text }];

    if (images && images.length > 0) {
      for (const image of images) {
        if (image.startsWith('data:')) {
          // Extract base64 data from data URI
          const matches = image.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2],
              },
            });
          }
        } else if (image.startsWith('http')) {
          // For HTTP(S) URLs, we need to fetch and convert to base64
          // Note: In production, this should be done on the server side
          parts.push({
            fileData: {
              fileUri: image,
              mimeType: 'image/jpeg', // Default, adjust as needed
            },
          });
        }
      }
    }

    return parts;
  }

  private calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1_000_000) * this.PRICE_PER_1M_INPUT_TOKENS;
    const outputCost = (outputTokens / 1_000_000) * this.PRICE_PER_1M_OUTPUT_TOKENS;
    return inputCost + outputCost;
  }

  private getDefaultSafetySettings() {
    return [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ];
  }
}

/**
 * Factory function to create Gemini chat provider
 */
export function createGeminiChatProvider(config?: GeminiChatConfig): GeminiChatProvider {
  return new GeminiChatProvider(config);
}
