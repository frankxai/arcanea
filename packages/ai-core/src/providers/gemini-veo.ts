// Stub implementation for Gemini Veo Video Provider
export function createVeoProvider() {
  console.warn('createVeoProvider not yet implemented - returning stub');
  return {
    id: 'veo-3.1',
    provider: 'google'
  };
}

export async function generateVideo(prompt: string, options?: any) {
  console.warn('generateVideo not yet implemented - returning mock data');
  return {
    url: 'https://placeholder.com/video.mp4',
    prompt
  };
}

export default createVeoProvider;
