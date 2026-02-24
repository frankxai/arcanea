/**
 * Streaming utilities for Gemini AI operations
 * Server-Sent Events (SSE) for chat streaming
 * Progress updates for image/video generation
 */

export interface StreamOptions {
  signal?: AbortSignal;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export interface ProgressUpdate {
  type: 'progress' | 'status' | 'complete' | 'error';
  message?: string;
  progress?: number; // 0-100
  data?: any;
  timestamp: Date;
}

/**
 * Convert async generator to ReadableStream for SSE
 */
export function createStreamResponse(
  generator: AsyncGenerator<string>,
  options: StreamOptions = {}
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of generator) {
          // Format as SSE
          const data = `data: ${JSON.stringify({ text: chunk, timestamp: new Date().toISOString() })}\n\n`;
          controller.enqueue(encoder.encode(data));

          // Check for abort signal
          if (options.signal?.aborted) {
            controller.close();
            return;
          }
        }

        // Send completion event
        const complete = `data: ${JSON.stringify({ type: 'complete', timestamp: new Date().toISOString() })}\n\n`;
        controller.enqueue(encoder.encode(complete));

        options.onComplete?.();
        controller.close();
      } catch (error) {
        const errorEvent = `data: ${JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        })}\n\n`;
        controller.enqueue(encoder.encode(errorEvent));

        options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
        controller.close();
      }
    },

    cancel() {
      // Cleanup on client disconnect
      console.log('Stream cancelled by client');
    },
  });
}

/**
 * Create SSE response for progress updates
 */
export function createProgressStream(
  updates: AsyncGenerator<ProgressUpdate>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const update of updates) {
          const data = `data: ${JSON.stringify(update)}\n\n`;
          controller.enqueue(encoder.encode(data));
        }

        controller.close();
      } catch (error) {
        const errorEvent = `data: ${JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
        })}\n\n`;
        controller.enqueue(encoder.encode(errorEvent));
        controller.close();
      }
    },
  });
}

/**
 * Client-side: Parse SSE stream
 */
export async function* parseSSEStream(response: Response): AsyncGenerator<any> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');

      // Keep the last incomplete line in buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            yield data;
          } catch (e) {
            console.error('Failed to parse SSE data:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Simulate progress for image/video generation
 */
export async function* simulateProgress(
  estimatedDuration: number,
  steps: string[] = []
): AsyncGenerator<ProgressUpdate> {
  const startTime = Date.now();
  const stepDuration = estimatedDuration / (steps.length || 5);

  if (steps.length === 0) {
    steps = [
      'Initializing generation...',
      'Processing prompt...',
      'Generating content...',
      'Applying enhancements...',
      'Finalizing output...',
    ];
  }

  for (let i = 0; i < steps.length; i++) {
    const progress = ((i + 1) / steps.length) * 100;

    yield {
      type: 'progress',
      message: steps[i],
      progress,
      timestamp: new Date(),
    };

    // Wait for step duration
    await new Promise((resolve) => setTimeout(resolve, stepDuration));
  }

  yield {
    type: 'complete',
    message: 'Generation complete!',
    progress: 100,
    timestamp: new Date(),
  };
}

/**
 * Polling helper for async jobs (video generation, etc.)
 */
export async function pollJobStatus(
  jobId: string,
  checkStatusFn: (id: string) => Promise<any>,
  options: {
    interval?: number;
    maxAttempts?: number;
    onProgress?: (update: ProgressUpdate) => void;
  } = {}
): Promise<any> {
  const interval = options.interval || 5000; // 5 seconds
  const maxAttempts = options.maxAttempts || 120; // 10 minutes max
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const status = await checkStatusFn(jobId);

      if (status.status === 'completed') {
        options.onProgress?.({
          type: 'complete',
          message: 'Job completed successfully',
          progress: 100,
          data: status,
          timestamp: new Date(),
        });
        return status;
      }

      if (status.status === 'failed') {
        throw new Error(status.error || 'Job failed');
      }

      // Still processing
      const progress = status.progress || ((attempts / maxAttempts) * 100);
      options.onProgress?.({
        type: 'progress',
        message: status.message || 'Processing...',
        progress,
        timestamp: new Date(),
      });

      await new Promise((resolve) => setTimeout(resolve, interval));
      attempts++;
    } catch (error) {
      options.onProgress?.({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      });
      throw error;
    }
  }

  throw new Error('Job timeout: Maximum polling attempts reached');
}

/**
 * Create a throttled stream that limits emission rate
 */
export async function* throttleStream<T>(
  generator: AsyncGenerator<T>,
  minInterval: number
): AsyncGenerator<T> {
  let lastEmit = 0;

  for await (const value of generator) {
    const now = Date.now();
    const elapsed = now - lastEmit;

    if (elapsed < minInterval) {
      await new Promise((resolve) => setTimeout(resolve, minInterval - elapsed));
    }

    lastEmit = Date.now();
    yield value;
  }
}

/**
 * Batch stream chunks
 */
export async function* batchStream<T>(
  generator: AsyncGenerator<T>,
  batchSize: number
): AsyncGenerator<T[]> {
  let batch: T[] = [];

  for await (const value of generator) {
    batch.push(value);

    if (batch.length >= batchSize) {
      yield batch;
      batch = [];
    }
  }

  // Yield remaining items
  if (batch.length > 0) {
    yield batch;
  }
}

/**
 * Merge multiple streams
 */
export async function* mergeStreams<T>(
  ...generators: AsyncGenerator<T>[]
): AsyncGenerator<T> {
  const promises = generators.map(async (gen) => {
    const results: T[] = [];
    for await (const value of gen) {
      results.push(value);
    }
    return results;
  });

  const allResults = await Promise.all(promises);

  for (const results of allResults) {
    for (const value of results) {
      yield value;
    }
  }
}

/**
 * Transform stream values
 */
export async function* transformStream<T, U>(
  generator: AsyncGenerator<T>,
  transformer: (value: T) => U | Promise<U>
): AsyncGenerator<U> {
  for await (const value of generator) {
    yield await transformer(value);
  }
}

/**
 * Filter stream values
 */
export async function* filterStream<T>(
  generator: AsyncGenerator<T>,
  predicate: (value: T) => boolean | Promise<boolean>
): AsyncGenerator<T> {
  for await (const value of generator) {
    if (await predicate(value)) {
      yield value;
    }
  }
}

/**
 * Take only the first N items from a stream
 */
export async function* takeStream<T>(
  generator: AsyncGenerator<T>,
  count: number
): AsyncGenerator<T> {
  let taken = 0;

  for await (const value of generator) {
    if (taken >= count) break;
    yield value;
    taken++;
  }
}

/**
 * Create a stream with timeout
 */
export async function* timeoutStream<T>(
  generator: AsyncGenerator<T>,
  timeoutMs: number
): AsyncGenerator<T> {
  const startTime = Date.now();

  for await (const value of generator) {
    if (Date.now() - startTime > timeoutMs) {
      throw new Error('Stream timeout');
    }
    yield value;
  }
}
