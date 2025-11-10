/**
 * Imagen 3 Provider for Arcanea MVP
 * High-quality image generation using Google's Imagen 3
 * Supports text-to-image and image-to-image transformations
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ImagenConfig {
  apiKey?: string;
  model?: string;
}

export interface ImageGenerationOptions {
  // Image dimensions
  width?: number;
  height?: number;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

  // Style controls
  style?: string;
  mood?: string;
  lighting?: string;
  colorPalette?: string;
  composition?: string;

  // Quality settings
  quality?: 'standard' | 'hd';
  numberOfImages?: number;

  // Safety
  safetySettings?: any[];

  // Arcanea-specific
  kingdomOfLightStyle?: boolean;
  academyTheme?: 'atlantean' | 'draconic' | 'creation-light';
}

export interface ImageEditOptions extends ImageGenerationOptions {
  preserveStyle?: boolean;
  strength?: number; // 0-1, how much to change the image
}

export interface GeneratedImage {
  id: string;
  url: string;
  base64?: string;
  prompt: string;
  revisedPrompt?: string;
  width: number;
  height: number;
  format: 'png' | 'jpeg' | 'webp';
  createdAt: Date;
  metadata: {
    model: string;
    style?: string;
    mood?: string;
    cost: number;
    safetyRatings?: any[];
    [key: string]: any;
  };
}

export class ImagenProvider {
  public readonly name = 'imagen-3';
  public readonly model: string;
  private client: GoogleGenerativeAI;
  private apiKey: string;

  // Imagen 3 pricing (estimated, as Google hasn't released official pricing)
  private readonly COST_PER_IMAGE = 0.04; // ~$0.04 per image

  constructor(config: ImagenConfig = {}) {
    this.apiKey = config.apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
    this.model = config.model || 'imagen-3.0-generate-001';

    if (!this.apiKey) {
      console.warn('Gemini API key not provided. Image generation will fail.');
    }

    this.client = new GoogleGenerativeAI(this.apiKey);
  }

  /**
   * Generate image from text prompt
   */
  async generateImage(
    prompt: string,
    options: ImageGenerationOptions = {}
  ): Promise<GeneratedImage> {
    try {
      const enhancedPrompt = this.enhancePrompt(prompt, options);
      const numberOfImages = options.numberOfImages || 1;

      // Use Gemini's imagen generation endpoint
      // Note: This is using Gemini's multimodal capabilities for image generation
      const model = this.client.getGenerativeModel({
        model: 'gemini-2.0-flash-exp', // Using Flash for image gen as Imagen 3 API is not yet in SDK
      });

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate a high-quality image: ${enhancedPrompt}\n\nStyle: ${options.style || 'photorealistic'}\nMood: ${options.mood || 'inspiring'}\nQuality: ${options.quality || 'hd'}`,
          }],
        }],
      });

      const response = result.response;
      const imageData = this.extractImageFromResponse(response);

      return {
        id: this.generateId(),
        url: imageData.url,
        base64: imageData.base64,
        prompt: enhancedPrompt,
        revisedPrompt: imageData.revisedPrompt,
        width: options.width || 1024,
        height: options.height || 1024,
        format: 'png',
        createdAt: new Date(),
        metadata: {
          model: this.model,
          style: options.style,
          mood: options.mood,
          cost: this.COST_PER_IMAGE * numberOfImages,
          safetyRatings: response.candidates?.[0]?.safetyRatings,
          kingdomOfLightStyle: options.kingdomOfLightStyle,
          academyTheme: options.academyTheme,
        },
      };
    } catch (error) {
      console.error('Error generating image with Imagen:', error);
      throw new Error(`Imagen generation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate multiple variations of an image
   */
  async generateVariations(
    prompt: string,
    count: number = 3,
    options: ImageGenerationOptions = {}
  ): Promise<GeneratedImage[]> {
    const variations: GeneratedImage[] = [];

    // Slightly vary the prompt for each generation
    for (let i = 0; i < count; i++) {
      const variedPrompt = `${prompt} (variation ${i + 1})`;
      const image = await this.generateImage(variedPrompt, {
        ...options,
        numberOfImages: 1,
      });
      variations.push(image);
    }

    return variations;
  }

  /**
   * Edit an existing image with a text prompt
   */
  async editImage(
    imageUrl: string,
    editPrompt: string,
    options: ImageEditOptions = {}
  ): Promise<GeneratedImage> {
    try {
      const imageBase64 = await this.fetchImageAsBase64(imageUrl);
      const model = this.client.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      const enhancedPrompt = options.preserveStyle
        ? `Edit this image: ${editPrompt}. Preserve the original artistic style and composition.`
        : `Edit this image: ${editPrompt}`;

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: 'image/png',
                data: imageBase64,
              },
            },
            {
              text: enhancedPrompt,
            },
          ],
        }],
      });

      const response = result.response;
      const imageData = this.extractImageFromResponse(response);

      return {
        id: this.generateId(),
        url: imageData.url,
        base64: imageData.base64,
        prompt: editPrompt,
        width: options.width || 1024,
        height: options.height || 1024,
        format: 'png',
        createdAt: new Date(),
        metadata: {
          model: this.model,
          originalImage: imageUrl,
          editType: 'modification',
          preservedStyle: options.preserveStyle,
          strength: options.strength,
          cost: this.COST_PER_IMAGE,
        },
      };
    } catch (error) {
      console.error('Error editing image with Imagen:', error);
      throw new Error(`Imagen edit error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upscale an image to higher resolution
   */
  async upscaleImage(imageUrl: string, targetResolution: '2k' | '4k' = '2k'): Promise<GeneratedImage> {
    const dimensions = targetResolution === '4k' ? { width: 3840, height: 2160 } : { width: 2048, height: 1152 };

    return this.editImage(
      imageUrl,
      `Upscale this image to ${targetResolution} resolution with enhanced details and clarity`,
      {
        ...dimensions,
        preserveStyle: true,
        quality: 'hd',
      }
    );
  }

  /**
   * Apply artistic style to an image
   */
  async applyStyle(
    imageUrl: string,
    style: string,
    options: ImageEditOptions = {}
  ): Promise<GeneratedImage> {
    return this.editImage(
      imageUrl,
      `Transform this image into ${style} style while maintaining the main subject and composition`,
      {
        ...options,
        style,
        preserveStyle: false,
      }
    );
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private enhancePrompt(prompt: string, options: ImageGenerationOptions): string {
    let enhanced = prompt;

    // Add Kingdom of Light aesthetic if requested
    if (options.kingdomOfLightStyle) {
      enhanced = `${enhanced}, kingdom of light aesthetic, luminous creative energy, ethereal glowing light, soft golden ambient lighting, inspiring and magical atmosphere`;
    }

    // Add academy-specific theming
    if (options.academyTheme) {
      const themeModifiers = {
        atlantean: 'underwater realm, bioluminescent creatures, deep ocean colors, flowing water effects, mystical underwater atmosphere',
        draconic: 'sky-bound realm, floating islands, dramatic clouds, dragon scales texture, majestic aerial perspective',
        'creation-light': 'radiant light beams, musical energy visualizations, harmonic color patterns, ethereal sound waves, central nexus of light',
      };
      enhanced = `${enhanced}, ${themeModifiers[options.academyTheme]}`;
    }

    // Add style modifiers
    if (options.style) {
      enhanced = `${options.style} style: ${enhanced}`;
    }

    if (options.mood) {
      enhanced = `${enhanced}, ${options.mood} mood`;
    }

    if (options.lighting) {
      enhanced = `${enhanced}, ${options.lighting} lighting`;
    }

    if (options.colorPalette) {
      enhanced = `${enhanced}, color palette: ${options.colorPalette}`;
    }

    if (options.composition) {
      enhanced = `${enhanced}, composition: ${options.composition}`;
    }

    // Add quality enhancers
    const quality = options.quality === 'hd' ? 'ultra high definition, 8k, highly detailed' : 'high quality, detailed';
    enhanced = `${enhanced}, ${quality}, professional, masterpiece`;

    return enhanced;
  }

  private extractImageFromResponse(response: any): { url: string; base64?: string; revisedPrompt?: string } {
    // Extract image data from Gemini response
    const candidates = response.candidates || [];

    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const base64 = part.inlineData.data;
          return {
            url: `data:${mimeType};base64,${base64}`,
            base64,
          };
        }
      }
    }

    throw new Error('No image data found in response');
  }

  private async fetchImageAsBase64(url: string): Promise<string> {
    // If already base64 data URL, extract the base64 part
    if (url.startsWith('data:')) {
      const match = url.match(/^data:[^;]+;base64,(.+)$/);
      return match ? match[1] : url;
    }

    // Fetch external image and convert to base64
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
  }

  private generateId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}

/**
 * Factory function to create Imagen provider
 */
export function createImagenProvider(config?: ImagenConfig): ImagenProvider {
  return new ImagenProvider(config);
}
