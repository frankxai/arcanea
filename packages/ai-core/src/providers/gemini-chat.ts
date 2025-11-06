// Stub implementation for Gemini Chat Provider
export function createGeminiChatProvider() {
  console.warn('createGeminiChatProvider not yet implemented - returning stub');
  return {
    id: 'gemini-chat',
    model: 'gemini-2.0-flash-exp',
    provider: 'google'
  };
}

export default createGeminiChatProvider;
