// Stub implementation for Gemini Streaming
export function createStreamResponse(stream: any) {
  console.warn('createStreamResponse not yet implemented - returning stub');
  return new Response('Mock stream response', {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

export default createStreamResponse;
