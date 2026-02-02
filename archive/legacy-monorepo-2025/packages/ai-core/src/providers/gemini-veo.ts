/**
 * Google Veo 3.1 Provider
 * Video generation using Google's Veo 3.1 model
 */

export interface VeoConfig {
  apiKey?: string;
  projectId?: string;
  location?: string;
}

export interface GenerateVideoOptions {
  duration?: 5 | 10;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  resolution?: '720p' | '1080p';
  fps?: 24 | 30;
}

export interface VideoResult {
  url: string;
  prompt: string;
  operationId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export function createVeoProvider(config: VeoConfig = {}) {
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
    id: 'veo-3.1',
    provider: 'google',

    /**
     * Generate a video from text prompt
     * Note: Video generation is asynchronous - returns operation ID
     */
    async generateVideo(
      prompt: string,
      options: GenerateVideoOptions = {}
    ): Promise<VideoResult> {
      const {
        duration = 5,
        aspectRatio = '16:9',
        resolution = '720p',
        fps = 24,
      } = options;

      const response = await fetch(`${baseUrl}/publishers/google/models/veo-3.1:predict`, {
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
            duration,
            aspectRatio,
            resolution,
            fps,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Veo API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Video generation is async, returns an operation ID
      return {
        url: '', // Will be populated when operation completes
        prompt,
        operationId: data.name,
        status: 'processing',
      };
    },

    /**
     * Check the status of a video generation operation
     */
    async getOperationStatus(operationId: string): Promise<VideoResult> {
      const response = await fetch(`${baseUrl}/operations/${operationId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Operation status error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.done) {
        if (data.error) {
          return {
            url: '',
            prompt: '',
            operationId,
            status: 'failed',
          };
        }

        return {
          url: data.response.videoUri || '',
          prompt: data.response.prompt || '',
          operationId,
          status: 'completed',
        };
      }

      return {
        url: '',
        prompt: '',
        operationId,
        status: 'processing',
      };
    },
  };
}

// Standalone function for backward compatibility
export async function generateVideo(
  prompt: string,
  options?: GenerateVideoOptions
): Promise<VideoResult> {
  const provider = createVeoProvider();
  return provider.generateVideo(prompt, options);
}

export default createVeoProvider;
