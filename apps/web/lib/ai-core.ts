/**
 * AI Core - Gemini Chat Provider
 *
 * Unified interface for Gemini AI interactions using AI SDK
 */

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, streamText as aiStreamText } from 'ai';

interface GeminiConfig {
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

interface ChatOptions {
  systemPrompt?: string;
  images?: string[];
  history?: Array<{ role: string; parts: Array<{ text: string }> }>;
  temperature?: number;
  maxTokens?: number;
}

interface ChatResponse {
  text: string;
  tokensUsed?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost?: number;
  finishReason?: string;
}

export function createGeminiChatProvider(config: GeminiConfig) {
  const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required');
  }

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  const modelName = config.model || 'gemini-2.0-flash-exp';
  const model = google(modelName);

  const defaultConfig = {
    temperature: config.temperature ?? 0.7,
    maxTokens: config.maxTokens ?? 8192,
  };

  return {
    async chat(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
      // Build messages from history
      const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

      if (options.history) {
        for (const msg of options.history) {
          messages.push({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts.map(p => p.text).join(''),
          });
        }
      }

      messages.push({ role: 'user', content: prompt });

      const result = await generateText({
        model,
        system: options.systemPrompt,
        messages,
        temperature: options.temperature ?? defaultConfig.temperature,
        maxTokens: options.maxTokens ?? defaultConfig.maxTokens,
      });

      return {
        text: result.text,
        tokensUsed: {
          promptTokens: result.usage?.promptTokens || 0,
          completionTokens: result.usage?.completionTokens || 0,
          totalTokens: (result.usage?.promptTokens || 0) + (result.usage?.completionTokens || 0),
        },
        finishReason: result.finishReason || 'stop',
      };
    },

    streamText(prompt: string, options: ChatOptions = {}) {
      // Build messages from history
      const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

      if (options.history) {
        for (const msg of options.history) {
          messages.push({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts.map(p => p.text).join(''),
          });
        }
      }

      messages.push({ role: 'user', content: prompt });

      const result = aiStreamText({
        model,
        system: options.systemPrompt,
        messages,
        temperature: options.temperature ?? defaultConfig.temperature,
        maxTokens: options.maxTokens ?? defaultConfig.maxTokens,
      });

      return result;
    },
  };
}

/**
 * Imagen Provider for image generation
 */
export function createImagenProvider(config: { apiKey?: string } = {}) {
  const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

  return {
    async generateImage(prompt: string, options: {
      aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
      numberOfImages?: number;
      negativePrompt?: string;
    } = {}) {
      // Placeholder for Imagen 3 integration
      // Requires Vertex AI or specific Imagen API access
      throw new Error('Image generation requires Vertex AI / Imagen 3 API access. Configure GOOGLE_CLOUD_PROJECT.');
    },
  };
}

/**
 * Veo Provider for video generation
 */
export function createVeoProvider(config: { apiKey?: string } = {}) {
  const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

  return {
    async generateVideo(prompt: string, options: {
      duration?: number;
      aspectRatio?: '16:9' | '9:16';
      imageUrl?: string;
    } = {}) {
      // Placeholder for Veo 2 integration
      // Requires Vertex AI or specific Veo API access
      throw new Error('Video generation requires Vertex AI / Veo 2 API access. Configure GOOGLE_CLOUD_PROJECT.');
    },
  };
}

export function createStreamResponse(stream: AsyncIterable<string>): Response {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
