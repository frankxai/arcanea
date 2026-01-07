/**
 * Unified AI Provider for Arcanea MVP
 * Single interface for all Gemini AI operations (chat, images, videos)
 * Handles loading states, queue management, and cost tracking
 */

import {
  GeminiChatProvider,
  GeminiChatOptions,
  GeminiChatResponse,
  createGeminiChatProvider,
} from './gemini-chat';
import {
  ImagenProvider,
  ImageGenerationOptions,
  ImageEditOptions,
  GeneratedImage,
  createImagenProvider,
} from './gemini-imagen';
import {
  VeoProvider,
  VideoGenerationOptions,
  GeneratedVideo,
  createVeoProvider,
} from './gemini-veo';

export interface UnifiedProviderConfig {
  apiKey?: string;
  enableChat?: boolean;
  enableImages?: boolean;
  enableVideos?: boolean;
  maxConcurrentRequests?: number;
}

export interface GenerationJob {
  id: string;
  type: 'chat' | 'image' | 'video';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface UsageStats {
  totalRequests: number;
  totalCost: number;
  chatRequests: number;
  chatCost: number;
  imageRequests: number;
  imageCost: number;
  videoRequests: number;
  videoCost: number;
  tokensUsed: {
    input: number;
    output: number;
    total: number;
  };
}

export class UnifiedAIProvider {
  private chatProvider: GeminiChatProvider;
  private imageProvider: ImagenProvider;
  private videoProvider: VeoProvider;

  private config: UnifiedProviderConfig;
  private jobQueue: Map<string, GenerationJob> = new Map();
  private activeJobs: Set<string> = new Set();
  private stats: UsageStats = {
    totalRequests: 0,
    totalCost: 0,
    chatRequests: 0,
    chatCost: 0,
    imageRequests: 0,
    imageCost: 0,
    videoRequests: 0,
    videoCost: 0,
    tokensUsed: {
      input: 0,
      output: 0,
      total: 0,
    },
  };

  constructor(config: UnifiedProviderConfig = {}) {
    this.config = {
      enableChat: true,
      enableImages: true,
      enableVideos: true,
      maxConcurrentRequests: 5,
      ...config,
    };

    // Initialize providers
    if (this.config.enableChat) {
      this.chatProvider = createGeminiChatProvider({ apiKey: config.apiKey });
    }

    if (this.config.enableImages) {
      this.imageProvider = createImagenProvider({ apiKey: config.apiKey });
    }

    if (this.config.enableVideos) {
      this.videoProvider = createVeoProvider({ apiKey: config.apiKey });
    }
  }

  // ============================================================================
  // CHAT OPERATIONS
  // ============================================================================

  async chat(prompt: string, options?: GeminiChatOptions): Promise<GeminiChatResponse> {
    if (!this.config.enableChat) {
      throw new Error('Chat is not enabled in this provider');
    }

    const jobId = this.createJob('chat');

    try {
      const response = await this.chatProvider.chat(prompt, options);

      // Update stats
      this.stats.chatRequests++;
      this.stats.totalRequests++;
      if (response.cost) {
        this.stats.chatCost += response.cost;
        this.stats.totalCost += response.cost;
      }
      if (response.tokensUsed) {
        this.stats.tokensUsed.input += response.tokensUsed.input;
        this.stats.tokensUsed.output += response.tokensUsed.output;
        this.stats.tokensUsed.total += response.tokensUsed.total;
      }

      this.completeJob(jobId);
      return response;
    } catch (error) {
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async *streamChat(prompt: string, options?: GeminiChatOptions): AsyncGenerator<string> {
    if (!this.config.enableChat) {
      throw new Error('Chat is not enabled in this provider');
    }

    const jobId = this.createJob('chat');

    try {
      for await (const chunk of this.chatProvider.streamText(prompt, options)) {
        yield chunk;
      }

      this.stats.chatRequests++;
      this.stats.totalRequests++;
      this.completeJob(jobId);
    } catch (error) {
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  // ============================================================================
  // IMAGE OPERATIONS
  // ============================================================================

  async generateImage(prompt: string, options?: ImageGenerationOptions): Promise<GeneratedImage> {
    if (!this.config.enableImages) {
      throw new Error('Image generation is not enabled in this provider');
    }

    const jobId = this.createJob('image');

    try {
      // Check queue limit
      if (this.activeJobs.size >= this.config.maxConcurrentRequests!) {
        await this.waitForSlot();
      }

      this.activeJobs.add(jobId);
      const image = await this.imageProvider.generateImage(prompt, options);

      // Update stats
      this.stats.imageRequests++;
      this.stats.totalRequests++;
      this.stats.imageCost += image.metadata.cost;
      this.stats.totalCost += image.metadata.cost;

      this.activeJobs.delete(jobId);
      this.completeJob(jobId);
      return image;
    } catch (error) {
      this.activeJobs.delete(jobId);
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async editImage(
    imageUrl: string,
    editPrompt: string,
    options?: ImageEditOptions
  ): Promise<GeneratedImage> {
    if (!this.config.enableImages) {
      throw new Error('Image generation is not enabled in this provider');
    }

    const jobId = this.createJob('image');

    try {
      if (this.activeJobs.size >= this.config.maxConcurrentRequests!) {
        await this.waitForSlot();
      }

      this.activeJobs.add(jobId);
      const image = await this.imageProvider.editImage(imageUrl, editPrompt, options);

      this.stats.imageRequests++;
      this.stats.totalRequests++;
      this.stats.imageCost += image.metadata.cost;
      this.stats.totalCost += image.metadata.cost;

      this.activeJobs.delete(jobId);
      this.completeJob(jobId);
      return image;
    } catch (error) {
      this.activeJobs.delete(jobId);
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async generateImageVariations(
    prompt: string,
    count: number,
    options?: ImageGenerationOptions
  ): Promise<GeneratedImage[]> {
    if (!this.config.enableImages) {
      throw new Error('Image generation is not enabled in this provider');
    }

    return this.imageProvider.generateVariations(prompt, count, options);
  }

  // ============================================================================
  // VIDEO OPERATIONS
  // ============================================================================

  async generateVideo(prompt: string, options?: VideoGenerationOptions): Promise<GeneratedVideo> {
    if (!this.config.enableVideos) {
      throw new Error('Video generation is not enabled in this provider');
    }

    const jobId = this.createJob('video');

    try {
      if (this.activeJobs.size >= this.config.maxConcurrentRequests!) {
        await this.waitForSlot();
      }

      this.activeJobs.add(jobId);
      const video = await this.videoProvider.generateVideo(prompt, options);

      this.stats.videoRequests++;
      this.stats.totalRequests++;
      this.stats.videoCost += video.cost;
      this.stats.totalCost += video.cost;

      this.activeJobs.delete(jobId);
      this.completeJob(jobId);
      return video;
    } catch (error) {
      this.activeJobs.delete(jobId);
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async generateVideoFromImage(
    imageUrl: string,
    prompt: string,
    options?: VideoGenerationOptions
  ): Promise<GeneratedVideo> {
    if (!this.config.enableVideos) {
      throw new Error('Video generation is not enabled in this provider');
    }

    const jobId = this.createJob('video');

    try {
      if (this.activeJobs.size >= this.config.maxConcurrentRequests!) {
        await this.waitForSlot();
      }

      this.activeJobs.add(jobId);
      const video = await this.videoProvider.generateFromImage(imageUrl, prompt, options);

      this.stats.videoRequests++;
      this.stats.totalRequests++;
      this.stats.videoCost += video.cost;
      this.stats.totalCost += video.cost;

      this.activeJobs.delete(jobId);
      this.completeJob(jobId);
      return video;
    } catch (error) {
      this.activeJobs.delete(jobId);
      this.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  // ============================================================================
  // JOB MANAGEMENT
  // ============================================================================

  private createJob(type: 'chat' | 'image' | 'video'): string {
    const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const job: GenerationJob = {
      id,
      type,
      status: 'queued',
      createdAt: new Date(),
    };

    this.jobQueue.set(id, job);
    return id;
  }

  private completeJob(jobId: string): void {
    const job = this.jobQueue.get(jobId);
    if (job) {
      job.status = 'completed';
      job.completedAt = new Date();
    }
  }

  private failJob(jobId: string, error: string): void {
    const job = this.jobQueue.get(jobId);
    if (job) {
      job.status = 'failed';
      job.completedAt = new Date();
      job.error = error;
    }
  }

  private async waitForSlot(): Promise<void> {
    // Wait until there's an available slot
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.activeJobs.size < this.config.maxConcurrentRequests!) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  getJob(jobId: string): GenerationJob | undefined {
    return this.jobQueue.get(jobId);
  }

  getAllJobs(): GenerationJob[] {
    return Array.from(this.jobQueue.values());
  }

  getActiveJobs(): GenerationJob[] {
    return this.getAllJobs().filter((job) => job.status === 'processing');
  }

  getQueuedJobs(): GenerationJob[] {
    return this.getAllJobs().filter((job) => job.status === 'queued');
  }

  // ============================================================================
  // STATS & MONITORING
  // ============================================================================

  getUsageStats(): UsageStats {
    return { ...this.stats };
  }

  resetStats(): void {
    this.stats = {
      totalRequests: 0,
      totalCost: 0,
      chatRequests: 0,
      chatCost: 0,
      imageRequests: 0,
      imageCost: 0,
      videoRequests: 0,
      videoCost: 0,
      tokensUsed: {
        input: 0,
        output: 0,
        total: 0,
      },
    };
  }

  getQueueStatus(): {
    activeJobs: number;
    queuedJobs: number;
    maxConcurrent: number;
  } {
    return {
      activeJobs: this.activeJobs.size,
      queuedJobs: this.getQueuedJobs().length,
      maxConcurrent: this.config.maxConcurrentRequests!,
    };
  }

  // ============================================================================
  // PROVIDER ACCESS (for advanced use cases)
  // ============================================================================

  getChatProvider(): GeminiChatProvider {
    if (!this.config.enableChat) {
      throw new Error('Chat is not enabled in this provider');
    }
    return this.chatProvider;
  }

  getImageProvider(): ImagenProvider {
    if (!this.config.enableImages) {
      throw new Error('Images are not enabled in this provider');
    }
    return this.imageProvider;
  }

  getVideoProvider(): VeoProvider {
    if (!this.config.enableVideos) {
      throw new Error('Videos are not enabled in this provider');
    }
    return this.videoProvider;
  }
}

/**
 * Factory function to create unified provider
 */
export function createUnifiedProvider(config?: UnifiedProviderConfig): UnifiedAIProvider {
  return new UnifiedAIProvider(config);
}

/**
 * Singleton instance for global access
 */
let globalProvider: UnifiedAIProvider | null = null;

export function getGlobalProvider(config?: UnifiedProviderConfig): UnifiedAIProvider {
  if (!globalProvider) {
    globalProvider = createUnifiedProvider(config);
  }
  return globalProvider;
}

export function resetGlobalProvider(): void {
  globalProvider = null;
}
