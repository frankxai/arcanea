// Shim for @arcanea/ai-core
// This replaces the monorepo package with a local library

export const createGeminiChatProvider = (config: any) => {
  return {
    generateResponse: async (messages: any[]) => {
      return { 
        text: "This is a mock response from the Gemini AI provider shim.",
        tokensUsed: { input: 10, output: 20 },
        cost: 0.001,
        finishReason: 'stop'
      };
    },
    streamText: async (prompt: string, options: any) => {
      return {
        textStream: (async function* () {
          yield "Mock ";
          yield "stream ";
          yield "response.";
        })(),
        toTextStreamResponse: () => new Response("Mock stream response")
      };
    },
    chat: async (prompt: string, options: any) => {
      return {
        response: {
          text: "Mock chat response",
          tokensUsed: { input: 10, output: 20 },
          cost: 0.001,
          finishReason: 'stop'
        }
      };
    }
  };
};

export const createStreamResponse = (stream: any) => {
  return new Response("Mock stream response");
};

export const createImagenProvider = (config: any) => {
  return {
    generateImage: async (prompt: string, options?: any) => {
      // Handle the variationCount mismatch by ignoring it or accepting generic options
      return { url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Generated+Image" };
    },
    editImage: async (image: any, prompt: string, options?: any) => {
      return { url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Edited+Image" };
    },
    generateVariations: async (image: any, prompt: string, options?: any) => {
      return [{ url: "https://placehold.co/1024x1024/1a2332/e6eefc?text=Variation+1" }];
    }
  };
};

export const createVeoProvider = (config: any) => {
  const mockVideo = {
    id: 'mock-video-id',
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    status: 'completed',
    prompt: 'Mock prompt',
    metadata: {
      duration: 10,
      resolution: '1080p'
    },
    cost: 0.05,
    estimatedCompletionTime: new Date(Date.now() + 60000)
  };

  return {
    generateVideo: async (prompt: string, options?: any) => {
      return mockVideo;
    },
    generateFromImage: async (image: any, prompt: string, options?: any) => {
      return mockVideo;
    }
  };
};
