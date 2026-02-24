/**
 * Streaming utilities for Gemini responses
 * Converts Vercel AI SDK stream to Server-Sent Events (SSE) format
 */

import { StreamTextResult, streamToResponse } from 'ai';

/**
 * Convert a Vercel AI SDK stream to a Response with SSE
 */
export function createStreamResponse(stream: StreamTextResult<any>['textStream']): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const data = `data: ${JSON.stringify({ text: chunk })}\n\n`;
          controller.enqueue(encoder.encode(data));
        }

        // Send completion event
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

/**
 * Create a Response object from a stream result
 * Simpler version that uses Vercel AI SDK's built-in conversion
 */
export function toStreamResponse(result: StreamTextResult<any>): Response {
  return result.toTextStreamResponse();
}

export default createStreamResponse;
