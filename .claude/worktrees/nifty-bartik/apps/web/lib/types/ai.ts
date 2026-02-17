/**
 * AI-related TypeScript types for Arcanea
 */

import type { StreamTextResult as AIStreamTextResult } from 'ai';

// Type alias for StreamTextResult with default generics for no-tools usage
// The AI SDK's StreamTextResult now requires 2 type arguments: TOOLS and PARTIAL_OUTPUT
export type StreamTextResult = AIStreamTextResult<Record<string, never>, never>;

// Emotional tone for Luminor responses
export type EmotionalTone =
  | 'warm'
  | 'enthusiastic'
  | 'contemplative'
  | 'encouraging'
  | 'curious'
  | 'playful'
  | 'wise'
  | 'empathetic'
  | 'challenging'
  | 'celebratory';

// AI Model Configuration
export interface AIModelConfig {
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

// Gemini-specific configuration
export interface GeminiConfig extends AIModelConfig {
  model?: 'gemini-2.0-flash-exp' | 'gemini-2.0-flash' | 'gemini-1.5-pro';
  safetySettings?: SafetySettings[];
}

export interface SafetySettings {
  category: string;
  threshold: string;
}

// Chat message types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'model';
  content: string;
  images?: string[];
  timestamp?: Date;
  emotionalTone?: EmotionalTone;
}

// Conversation history
export interface ConversationHistory {
  role: string;
  parts: Array<{ text: string }>;
}

// Token usage tracking
export interface TokenUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  input?: number;
  output?: number;
}

// Chat response
export interface ChatResponse {
  text: string;
  tokensUsed?: TokenUsage;
  cost?: number;
  finishReason?: string;
  emotionalTone?: EmotionalTone;
}

// Streaming response
export interface StreamingChunk {
  type: 'token' | 'emotional_tone' | 'bond_update' | 'thinking' | 'complete' | 'error';
  content?: string;
  tone?: EmotionalTone;
  bondState?: BondState;
  state?: ThinkingState;
  id?: string;
  error?: string;
}

export type ThinkingState = 'idle' | 'thinking' | 'generating' | 'analyzing' | 'creating';

// Bond state
export interface BondState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  relationshipStatus: string;
}

// Image generation types
export interface ImageGenerationOptions {
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numberOfImages?: number;
  negativePrompt?: string;
  quality?: 'standard' | 'hd';
  style?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  base64?: string;
  storageUrl?: string;
  metadata: {
    cost: number;
    model: string;
    prompt: string;
  };
}

// Video generation types
export interface VideoGenerationOptions {
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  quality?: 'standard' | 'hd';
}

export interface GeneratedVideo {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  thumbnailUrl?: string;
  metadata?: {
    cost: number;
    model: string;
    prompt: string;
    duration?: number;
  };
}

// AI Provider interfaces
export interface ChatProvider {
  chat: (prompt: string, options: ChatOptions) => Promise<ChatResponse>;
  streamText: (prompt: string, options: ChatOptions) => StreamTextResult;
  generateResponse?: (messages: ChatMessage[]) => Promise<ChatResponse>;
}

export interface ChatOptions {
  systemPrompt?: string;
  images?: string[];
  history?: ConversationHistory[];
  temperature?: number;
  maxTokens?: number;
}

export interface ImageProvider {
  generateImage: (prompt: string, options?: ImageGenerationOptions) => Promise<GeneratedImage>;
  editImage: (imageUrl: string, prompt: string, options?: ImageGenerationOptions) => Promise<GeneratedImage>;
  generateVariations: (prompt: string, count: number, options?: ImageGenerationOptions) => Promise<GeneratedImage[]>;
}

export interface VideoProvider {
  generateVideo: (prompt: string, options?: VideoGenerationOptions) => Promise<GeneratedVideo>;
  generateFromImage: (imageUrl: string, prompt: string, options?: VideoGenerationOptions) => Promise<GeneratedVideo>;
}

// Academy context for themed responses
export interface AcademyContext {
  type: 'atlantean' | 'draconic' | 'creation-light';
  luminorName?: string;
  house?: string;
}

// AI usage tracking
export interface AIUsageRecord {
  user_id: string;
  operation: 'chat' | 'image_generate' | 'image_edit' | 'image_variations' | 'video_generate';
  model: string;
  tokens_input?: number;
  tokens_output?: number;
  cost: number;
  metadata?: Record<string, unknown>;
  created_at: string;
}
