/**
 * AI Core - Gemini Chat Provider
 *
 * Unified interface for Gemini AI interactions using AI SDK
 */

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, streamText as aiStreamText, type LanguageModel } from 'ai';

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
  const model = google(modelName) as unknown as LanguageModel;

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
        maxOutputTokens: options.maxTokens ?? defaultConfig.maxTokens,
      });

      // Handle both V1 and V2 SDK usage property names
      const usage = result.usage as Record<string, number> | undefined;
      const promptTokens = usage?.promptTokens ?? usage?.inputTokens ?? 0;
      const completionTokens = usage?.completionTokens ?? usage?.outputTokens ?? 0;

      return {
        text: result.text,
        tokensUsed: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
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
        maxOutputTokens: options.maxTokens ?? defaultConfig.maxTokens,
      });

      return result;
    },
  };
}

/**
 * Image Generation Types
 */
interface ImageGenerationOptions {
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numberOfImages?: number;
  negativePrompt?: string;
}

interface GeneratedImage {
  id: string;
  url: string;
  base64?: string;
  metadata: {
    cost: number;
    model: string;
    prompt: string;
  };
}

/**
 * Imagen Provider for image generation
 * TODO: Connect to Gemini 2.5 Flash Image (Nano Banana) when available
 */
export function createImagenProvider(config: { apiKey?: string } = {}) {
  const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

  return {
    async generateImage(prompt: string, options: ImageGenerationOptions = {}): Promise<GeneratedImage> {
      // Stub implementation - returns placeholder
      console.warn('Imagen Provider is a STUB - connect to Gemini 2.5 Flash Image (Nano Banana)');
      return {
        id: `stub-${Date.now()}`,
        url: 'https://placehold.co/1024x1024/1a2332/e6eefc?text=Imagen+Stub',
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        },
      };
    },

    async editImage(imageUrl: string, prompt: string, options: ImageGenerationOptions = {}): Promise<GeneratedImage> {
      console.warn('Imagen Edit is a STUB');
      return {
        id: `stub-edit-${Date.now()}`,
        url: 'https://placehold.co/1024x1024/1a2332/e6eefc?text=Edited+Image+Stub',
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        },
      };
    },

    async generateVariations(prompt: string, count: number, options: ImageGenerationOptions = {}): Promise<GeneratedImage[]> {
      console.warn('Imagen Variations is a STUB');
      return Array.from({ length: count }, (_, i) => ({
        id: `stub-var-${Date.now()}-${i}`,
        url: 'https://placehold.co/1024x1024/1a2332/e6eefc?text=Variation+Stub',
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        },
      }));
    },
  };
}

/**
 * Video Generation Types
 */
interface VideoGenerationOptions {
  duration?: number;
  resolution?: '480p' | '720p' | '1080p';
  fps?: 24 | 30 | 60;
  style?: string;
  mood?: string;
  cameraMovement?: 'static' | 'pan' | 'zoom' | 'tracking' | 'dolly' | 'crane';
  pacing?: 'slow' | 'medium' | 'fast';
  includeAudio?: boolean;
  audioStyle?: 'ambient' | 'cinematic' | 'upbeat' | 'dramatic';
  quality?: 'standard' | 'high';
  academyTheme?: 'atlantean' | 'draconic' | 'creation-light';
  aspectRatio?: '16:9' | '9:16';
  imageUrl?: string;
}

interface GeneratedVideo {
  id: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  url?: string;
  prompt: string;
  cost: number;
  estimatedCompletionTime?: Date;
  metadata: {
    duration: number;
    resolution: string;
    fps: number;
  };
}

/**
 * Veo Provider for video generation
 * TODO: Connect to Veo 3.1 API when available
 */
export function createVeoProvider(config: { apiKey?: string } = {}) {
  const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

  return {
    async generateVideo(prompt: string, options: VideoGenerationOptions = {}): Promise<GeneratedVideo> {
      // Stub implementation
      console.warn('Veo Provider is a STUB - connect to Veo 3.1 API');
      return {
        id: `veo-stub-${Date.now()}`,
        status: 'completed',
        url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        prompt,
        cost: 0,
        estimatedCompletionTime: new Date(),
        metadata: {
          duration: options.duration || 5,
          resolution: options.resolution || '720p',
          fps: options.fps || 24,
        },
      };
    },

    async generateFromImage(imageUrl: string, prompt: string, options: VideoGenerationOptions = {}): Promise<GeneratedVideo> {
      console.warn('Veo Image-to-Video is a STUB');
      return {
        id: `veo-i2v-stub-${Date.now()}`,
        status: 'completed',
        url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        prompt,
        cost: 0,
        estimatedCompletionTime: new Date(),
        metadata: {
          duration: options.duration || 5,
          resolution: options.resolution || '720p',
          fps: options.fps || 24,
        },
      };
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
