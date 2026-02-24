/**
 * Gemini/Nano-Banana Provider for Arcanea
 * Visual generation for the Draconic Academy
 * Integrates Google Gemini for image generation and editing
 */

import type {
  ArcaneanProvider,
  GenerateOptions,
  ImageGenerationOptions,
  ImageEditOptions,
  ArcaneanImage
} from '../types';

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
}

export class GeminiProvider implements ArcaneanProvider {
  public readonly name = 'gemini';
  public readonly model: string;
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(config: GeminiConfig = {}) {
    this.apiKey = config.apiKey || process.env.GEMINI_API_KEY || '';
    this.model = config.model || 'gemini-2.0-flash-exp';

    if (!this.apiKey) {
      console.warn('Gemini API key not provided. Image generation will fail.');
    }
  }

  /**
   * Generate an image from a text prompt
   * Uses Gemini's Imagen capabilities
   */
  async generateImage(
    prompt: string,
    options: ImageGenerationOptions = {}
  ): Promise<ArcaneanImage> {
    const enhancedPrompt = this.enhanceImagePrompt(prompt, options);

    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Generate an image: ${enhancedPrompt}`
              }]
            }],
            generationConfig: {
              temperature: options.temperature || 0.9,
              topK: options.topK || 40,
              topP: options.topP || 0.95,
              maxOutputTokens: options.maxTokens || 2048,
            },
            safetySettings: options.safetySettings || this.getDefaultSafetySettings(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract image from response
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        const imageData = this.extractImageFromResponse(candidate);

        return {
          id: this.generateId(),
          url: imageData.url,
          prompt: enhancedPrompt,
          width: options.width || 1024,
          height: options.height || 1024,
          format: options.format || 'png',
          createdAt: new Date(),
          metadata: {
            model: this.model,
            style: options.style,
            mood: options.mood,
            safetyRatings: candidate.safetyRatings,
          },
        };
      }

      throw new Error('No image generated from Gemini');
    } catch (error) {
      console.error('Error generating image with Gemini:', error);
      throw error;
    }
  }

  /**
   * Edit an existing image with Gemini
   * Uses Nano-Banana approach for iterative editing
   */
  async editImage(
    imageUrl: string,
    editPrompt: string,
    options: ImageEditOptions = {}
  ): Promise<ArcaneanImage> {
    try {
      // Fetch the image as base64
      const imageBase64 = await this.fetchImageAsBase64(imageUrl);

      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  inline_data: {
                    mime_type: 'image/png',
                    data: imageBase64,
                  }
                },
                {
                  text: `Edit this image: ${editPrompt}. ${options.preserveStyle ? 'Preserve the original artistic style.' : ''}`
                }
              ]
            }],
            generationConfig: {
              temperature: options.temperature || 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const candidate = data.candidates[0];
      const imageData = this.extractImageFromResponse(candidate);

      return {
        id: this.generateId(),
        url: imageData.url,
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
        },
      };
    } catch (error) {
      console.error('Error editing image with Gemini:', error);
      throw error;
    }
  }

  /**
   * Continue editing - iterative Nano-Banana style workflow
   */
  async continueEditing(
    previousImage: ArcaneanImage,
    prompt: string,
    referenceImages?: string[]
  ): Promise<ArcaneanImage> {
    const parts: any[] = [
      {
        inline_data: {
          mime_type: 'image/png',
          data: await this.fetchImageAsBase64(previousImage.url),
        }
      },
      {
        text: `Continue editing: ${prompt}`
      }
    ];

    // Add reference images if provided
    if (referenceImages && referenceImages.length > 0) {
      for (const refUrl of referenceImages) {
        parts.push({
          inline_data: {
            mime_type: 'image/png',
            data: await this.fetchImageAsBase64(refUrl),
          }
        });
      }
      parts.push({
        text: 'Use the reference images above for style or elements to incorporate.'
      });
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              temperature: 0.8,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const candidate = data.candidates[0];
      const imageData = this.extractImageFromResponse(candidate);

      return {
        id: this.generateId(),
        url: imageData.url,
        prompt: prompt,
        width: previousImage.width,
        height: previousImage.height,
        format: 'png',
        createdAt: new Date(),
        metadata: {
          model: this.model,
          previousImageId: previousImage.id,
          editChain: [...(previousImage.metadata?.editChain || [previousImage.id]), this.generateId()],
          referenceCount: referenceImages?.length || 0,
        },
      };
    } catch (error) {
      console.error('Error continuing edit with Gemini:', error);
      throw error;
    }
  }

  /**
   * Generate text with Gemini (for story/lore support)
   */
  async generateText(prompt: string, options: GenerateOptions = {}): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: options.temperature || 0.7,
              maxOutputTokens: options.maxTokens || 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      throw error;
    }
  }

  /**
   * Stream text generation
   */
  async *streamText(prompt: string, options: GenerateOptions = {}): AsyncGenerator<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:streamGenerateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: options.temperature || 0.7,
              maxOutputTokens: options.maxTokens || 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;

          try {
            const data = JSON.parse(line);
            if (data.candidates && data.candidates[0]?.content?.parts) {
              const text = data.candidates[0].content.parts[0].text;
              if (text) yield text;
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }
    } catch (error) {
      console.error('Error streaming text with Gemini:', error);
      throw error;
    }
  }

  // ============ PRIVATE HELPERS ============

  private enhanceImagePrompt(prompt: string, options: ImageGenerationOptions): string {
    let enhanced = prompt;

    if (options.style) {
      enhanced = `${options.style} style: ${enhanced}`;
    }

    if (options.mood) {
      enhanced = `${enhanced}, ${options.mood} mood`;
    }

    if (options.composition) {
      enhanced = `${enhanced}. Composition: ${options.composition}`;
    }

    if (options.lighting) {
      enhanced = `${enhanced}. Lighting: ${options.lighting}`;
    }

    if (options.colorPalette) {
      enhanced = `${enhanced}. Color palette: ${options.colorPalette}`;
    }

    // Add quality enhancers
    enhanced = `${enhanced}. High quality, detailed, professional`;

    return enhanced;
  }

  private extractImageFromResponse(candidate: any): { url: string } {
    // Gemini returns base64 encoded images in the response
    // This is a simplified extraction - actual implementation may vary
    const parts = candidate.content?.parts || [];

    for (const part of parts) {
      if (part.inline_data && part.inline_data.data) {
        // Convert base64 to data URL
        const mimeType = part.inline_data.mime_type || 'image/png';
        return {
          url: `data:${mimeType};base64,${part.inline_data.data}`
        };
      }
    }

    throw new Error('No image data found in Gemini response');
  }

  private async fetchImageAsBase64(url: string): Promise<string> {
    // If already base64 data URL, extract the base64 part
    if (url.startsWith('data:')) {
      return url.split(',')[1];
    }

    // Fetch external image and convert to base64
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }

  private generateId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private getDefaultSafetySettings() {
    return [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ];
  }
}

/**
 * Factory function to create Gemini provider
 */
export function createGeminiProvider(config?: GeminiConfig): GeminiProvider {
  return new GeminiProvider(config);
}
