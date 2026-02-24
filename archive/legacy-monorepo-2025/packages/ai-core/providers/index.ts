/**
 * Arcanea AI Providers Index
 * Export all AI providers for easy importing
 */

// Gemini Chat Provider
export {
  GeminiChatProvider,
  createGeminiChatProvider,
  type GeminiChatConfig,
  type GeminiChatOptions,
  type GeminiChatResponse,
  type GeminiMessage,
} from './gemini-chat';

// Imagen 3 Provider
export {
  ImagenProvider,
  createImagenProvider,
  type ImagenConfig,
  type ImageGenerationOptions,
  type ImageEditOptions,
  type GeneratedImage,
} from './gemini-imagen';

// Veo 3.1 Provider
export {
  VeoProvider,
  createVeoProvider,
  type VeoConfig,
  type VideoGenerationOptions,
  type VideoMetadata,
  type GeneratedVideo,
  type ImageToVideoOptions,
  extractVideoThumbnail,
  getVideoDuration,
} from './gemini-veo';

// Unified Provider (Recommended)
export {
  UnifiedAIProvider,
  createUnifiedProvider,
  getGlobalProvider,
  resetGlobalProvider,
  type UnifiedProviderConfig,
  type GenerationJob,
  type UsageStats,
} from './unified-provider';

// Legacy providers (keep for backwards compatibility)
export { GeminiProvider, createGeminiProvider, type GeminiConfig } from './gemini';
export { ClaudeProvider, createClaudeProvider, type ClaudeConfig } from './claude';
export { SunoProvider, createSunoProvider, type SunoConfig } from './suno';
