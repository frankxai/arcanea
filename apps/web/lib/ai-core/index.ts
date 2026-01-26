import { google } from '@ai-sdk/google';
import { streamText, generateText, type LanguageModel } from 'ai';

// Types for the config
interface GeminiConfig {
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

export const createGeminiChatProvider = (config: GeminiConfig) => {
  const model = google('gemini-2.0-flash-exp') as unknown as LanguageModel; // Using the latest Flash model

  return {
    generateResponse: async (messages: any[]) => {
      // Legacy wrapper if needed, but chat() is preferred
      return { 
        text: "Please use chat() or streamText()",
        tokensUsed: { input: 0, output: 0 },
        cost: 0,
        finishReason: 'stop'
      };
    },
    
    streamText: (prompt: string, options: any) => {
      const { systemPrompt, images, history, temperature, maxTokens } = options;
      
      // Convert history to Vercel AI SDK format if needed
      // The SDK expects messages: CoreMessage[]
      const messages = [
        ...(history?.map((h: any) => ({
          role: h.role,
          content: h.parts[0].text
        })) || []),
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            ...(images?.map((img: string) => ({ type: 'image', image: img })) || [])
          ]
        }
      ];

      return streamText({
        model,
        messages,
        system: systemPrompt,
        temperature: temperature ?? config.temperature ?? 0.7,
        maxOutputTokens: maxTokens ?? config.maxTokens ?? 8192,
      });
    },

    chat: async (prompt: string, options: any) => {
      const { systemPrompt, images, history, temperature, maxTokens } = options;

      const messages = [
        ...(history?.map((h: any) => ({
          role: h.role,
          content: h.parts[0].text
        })) || []),
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            ...(images?.map((img: string) => ({ type: 'image', image: img })) || [])
          ]
        }
      ];

      const result = await generateText({
        model,
        messages,
        system: systemPrompt,
        temperature: temperature ?? config.temperature ?? 0.7,
        maxOutputTokens: maxTokens ?? config.maxTokens ?? 8192,
      });

      return {
        text: result.text,
        tokensUsed: result.usage,
        finishReason: result.finishReason,
        // Approximate cost calculation (Gemini Flash is free-ish in preview, but let's be safe)
        cost: 0 
      };
    }
  };
};

// Helper for consistency
export const createStreamResponse = (stream: any) => {
  return stream.toTextStreamResponse();
};

// Image Generation Types
interface ImageGenerationOptions {
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
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

// Keeping Stubs for Image/Video for now, but marking them clearly
export const createImagenProvider = (config: { apiKey?: string }) => {
  return {
    generateImage: async (prompt: string, options?: ImageGenerationOptions): Promise<GeneratedImage> => {
      console.warn("Imagen Provider is still a STUB - connect to Gemini 2.5 Flash Image (Nano Banana)");
      return {
        id: `stub-${Date.now()}`,
        url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Imagen+Stub",
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        }
      };
    },
    editImage: async (imageUrl: string, prompt: string, options?: ImageGenerationOptions): Promise<GeneratedImage> => {
      console.warn("Imagen Edit is still a STUB");
      return {
        id: `stub-edit-${Date.now()}`,
        url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Edited+Image+Stub",
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        }
      };
    },
    generateVariations: async (prompt: string, count: number, options?: ImageGenerationOptions): Promise<GeneratedImage[]> => {
      console.warn("Imagen Variations is still a STUB");
      return Array.from({ length: count }, (_, i) => ({
        id: `stub-var-${Date.now()}-${i}`,
        url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Variation+Stub",
        metadata: {
          cost: 0,
          model: 'imagen-3-stub',
          prompt,
        }
      }));
    }
  };
};

export const createVeoProvider = (config: any) => {
  return {
    generateVideo: async (prompt: string, options?: any) => {
      console.warn("Veo Provider is still a STUB");
      return {
        id: 'mock-video-id',
        url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
        status: 'completed'
      };
    },
    generateFromImage: async (image: any, prompt: string, options?: any) => {
      return {
        id: 'mock-video-id',
        url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
        status: 'completed'
      };
    }
  };
};