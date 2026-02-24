/**
 * Google Imagen 3 Provider
 * Image generation using Google's Imagen 3 model
 */

export interface ImagenConfig {
  apiKey?: string;
  projectId?: string;
  location?: string;
}

export interface GenerateImageOptions {
  negativePrompt?: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numberOfImages?: number;
  safetySettings?: 'none' | 'low' | 'medium' | 'high';
}

export interface ImageResult {
  url: string;
  prompt: string;
  base64?: string;
}

export function createImagenProvider(config: ImagenConfig = {}) {
  const {
    apiKey = process.env.GEMINI_API_KEY,
    projectId = process.env.GOOGLE_CLOUD_PROJECT_ID,
    location = 'us-central1',
  } = config;

  if (!apiKey) {
    throw new Error('Gemini API key is required. Set GEMINI_API_KEY environment variable.');
  }

  const baseUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}`;

  return {
    id: 'imagen-3',
    provider: 'google',

    async generateImage(
      prompt: string,
      options: GenerateImageOptions = {}
    ): Promise<ImageResult[]> {
      const {
        negativePrompt,
        aspectRatio = '1:1',
        numberOfImages = 1,
        safetySettings = 'medium',
      } = options;

      const response = await fetch(`${baseUrl}/publishers/google/models/imagen-3.0-generate-001:predict`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt,
            },
          ],
          parameters: {
            negativePrompt,
            aspectRatio,
            sampleCount: numberOfImages,
            safetyFilterLevel: safetySettings,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Imagen API error: ${response.statusText}`);
      }

      const data = await response.json();

      return data.predictions.map((prediction: any, index: number) => ({
        url: prediction.bytesBase64Encoded
          ? `data:image/png;base64,${prediction.bytesBase64Encoded}`
          : '',
        prompt,
        base64: prediction.bytesBase64Encoded,
      }));
    },
  };
}

// Standalone function for backward compatibility
export async function generateImage(
  prompt: string,
  options?: GenerateImageOptions
): Promise<ImageResult[]> {
  const provider = createImagenProvider();
  return provider.generateImage(prompt, options);
}

export default createImagenProvider;
