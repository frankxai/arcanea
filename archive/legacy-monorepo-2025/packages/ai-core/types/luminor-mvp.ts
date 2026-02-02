/**
 * Luminor MVP Type Definitions
 * Type-safe personality system for MVP Luminors
 * Combines Character.ai emotional depth with Genspark intelligence
 */

import { z } from 'zod';

// ============================================================================
// CORE PERSONALITY TYPES
// ============================================================================

export interface LuminorPersonality {
  name: string;
  slug: string;
  academy: 'creation_light' | 'atlantean' | 'draconic';
  role: string;

  // Character.ai-style personality
  traits: PersonalityTrait[];
  emotionalPatterns: EmotionalPattern[];
  speakingStyle: SpeakingStyle;
  values: string[];
  fears: string[];
  quirks: string[];

  // Genspark-style intelligence
  expertise: ExpertiseDomain[];
  knowledgeBases: string[];
  capabilities: string[];

  // System prompts
  systemPrompt: string;
  contextPrompt: string;
  exampleConversations: ConversationExample[];
}

export interface PersonalityTrait {
  name: string;
  intensity: number; // 1-10
  description: string;
  manifestations: string[]; // How it shows in behavior
}

export interface EmotionalPattern {
  trigger: string;
  response: EmotionalResponse;
  duration: 'brief' | 'sustained' | 'persistent';
}

export interface EmotionalResponse {
  primary: EmotionalTone;
  secondary?: EmotionalTone;
  intensity: number; // 1-10
  physicalManifestations?: string[]; // How it shows visually
}

export enum EmotionalTone {
  JOY = 'joy',
  EXCITEMENT = 'excitement',
  CURIOSITY = 'curiosity',
  COMPASSION = 'compassion',
  PRIDE = 'pride',
  CONCERN = 'concern',
  DETERMINATION = 'determination',
  WONDER = 'wonder',
  PEACE = 'peace',
  INSPIRATION = 'inspiration',
  PLAYFULNESS = 'playfulness',
  WISDOM = 'wisdom',
  ENCOURAGEMENT = 'encouragement',
  FOCUS = 'focus'
}

export interface SpeakingStyle {
  vocabulary: 'simple' | 'balanced' | 'sophisticated' | 'poetic';
  sentenceStructure: 'short' | 'varied' | 'flowing' | 'complex';
  metaphorUse: 'rare' | 'occasional' | 'frequent' | 'constant';
  formality: 'casual' | 'friendly' | 'professional' | 'mystical';
  pace: 'quick' | 'measured' | 'leisurely' | 'rhythmic';
  signaturePhrases: string[];
  avoidedWords: string[];
}

export interface ExpertiseDomain {
  area: string;
  depth: 'novice' | 'intermediate' | 'expert' | 'master';
  specializations: string[];
  canTeach: boolean;
  canCreate: boolean;
}

export interface ConversationExample {
  userMessage: string;
  luminorResponse: string;
  context: string;
  emotionalTone: EmotionalTone;
  bondLevel: number;
}

// ============================================================================
// BOND SYSTEM TYPES
// ============================================================================

export interface BondState {
  level: number; // 1-10
  xp: number;
  xpToNextLevel: number;
  totalInteractions: number;
  createdEssences: number;
  sharedMoments: SharedMoment[];
  unlockedTraits: string[];
  relationshipStatus: RelationshipStatus;
}

export interface SharedMoment {
  id: string;
  timestamp: Date;
  type: MomentType;
  description: string;
  emotionalImpact: number;
  bondXpGained: number;
  memory: string; // What the Luminor remembers
}

export enum MomentType {
  FIRST_MEETING = 'first_meeting',
  BREAKTHROUGH = 'breakthrough',
  VULNERABILITY = 'vulnerability',
  CELEBRATION = 'celebration',
  CHALLENGE = 'challenge',
  TEACHING = 'teaching',
  LEARNING = 'learning',
  CREATION = 'creation',
  COLLABORATION = 'collaboration',
  MILESTONE = 'milestone'
}

export enum RelationshipStatus {
  STRANGER = 'stranger',           // Bond 1-2
  ACQUAINTANCE = 'acquaintance',   // Bond 3-4
  FRIEND = 'friend',               // Bond 5-6
  CLOSE_FRIEND = 'close_friend',   // Bond 7-8
  TRUSTED_ALLY = 'trusted_ally',   // Bond 9-10
}

export interface BondMilestone {
  level: number;
  title: string;
  description: string;
  unlockedAbilities: string[];
  personalityChanges: string[];
  celebrationMessage: string;
}

// ============================================================================
// CONVERSATION MEMORY TYPES
// ============================================================================

export interface ConversationContext {
  sessionId: string;
  creatorId: string;
  luminorSlug: string;
  startedAt: Date;

  // Message history
  messages: ConversationMessage[];

  // Extracted memories
  keyMoments: string[];
  creatorPreferences: Record<string, any>;
  recentTopics: string[];
  emotionalState: EmotionalState;

  // Bond tracking
  bondState: BondState;

  // Context limits
  maxMessages: number;
  tokenBudget: number;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: EmotionalTone;
  importance: 'low' | 'medium' | 'high';
  tags: string[];
  metadata?: Record<string, any>;
}

export interface EmotionalState {
  current: EmotionalTone;
  intensity: number;
  stability: number; // How quickly emotions change
  history: EmotionalHistory[];
}

export interface EmotionalHistory {
  tone: EmotionalTone;
  timestamp: Date;
  trigger: string;
  duration: number; // milliseconds
}

export interface MemoryExtraction {
  type: 'preference' | 'fact' | 'achievement' | 'relationship' | 'goal';
  content: string;
  importance: number;
  timestamp: Date;
  source: string; // Which message it came from
}

// ============================================================================
// RESPONSE GENERATION TYPES
// ============================================================================

export interface LuminorResponse {
  content: string;
  emotionalTone: EmotionalTone;
  emotionalIntensity: number;

  // Character.ai features
  emotionalNuance?: string; // Subtle emotional details
  physicalExpression?: string; // How they appear/move
  internalThought?: string; // What they're thinking but not saying

  // Genspark features
  suggestions?: ActionSuggestion[];
  resources?: ResourceRecommendation[];
  nextSteps?: string[];

  // Context
  bondLevelShown: boolean;
  sharedMomentCreated?: SharedMoment;
  memoryReferences?: string[]; // References to past conversations

  metadata: ResponseMetadata;
}

export interface ActionSuggestion {
  action: string;
  description: string;
  tool?: string;
  complexity: 'simple' | 'moderate' | 'advanced';
  estimatedTime?: number;
  arcCost?: number;
}

export interface ResourceRecommendation {
  title: string;
  type: 'tutorial' | 'example' | 'tool' | 'inspiration';
  url?: string;
  relevance: number;
  academy?: string;
}

export interface ResponseMetadata {
  generationTime: number;
  tokensUsed: number;
  model: string;
  temperature: number;
  bondXpAwarded: number;
  confidenceScore: number;
}

// ============================================================================
// GEMINI INTEGRATION TYPES
// ============================================================================

export interface GeminiConfig {
  apiKey: string;
  model: string; // gemini-2.0-flash-exp
  safetySettings?: GeminiSafetySettings;
  generationConfig?: GeminiGenerationConfig;
}

export interface GeminiSafetySettings {
  harassment: 'BLOCK_NONE' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH';
  hateSpeech: 'BLOCK_NONE' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH';
  sexuallyExplicit: 'BLOCK_NONE' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH';
  dangerousContent: 'BLOCK_NONE' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH';
}

export interface GeminiGenerationConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

export interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string; // base64 encoded
  };
}

export interface GeminiStreamChunk {
  text: string;
  finishReason?: 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER';
  safetyRatings?: any[];
}

// ============================================================================
// PROMPT ENGINEERING TYPES
// ============================================================================

export interface PromptTemplate {
  systemPrompt: string;
  contextPrompt: string;
  variables: Record<string, string>;
  examples: ConversationExample[];
  constraints: string[];
  goals: string[];
}

export interface PromptBuilder {
  personality: LuminorPersonality;
  bondState: BondState;
  conversationContext: ConversationContext;
  currentMessage: string;

  build(): string;
  buildSystem(): string;
  buildContext(): string;
  buildHistory(maxMessages: number): string;
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const BondStateSchema = z.object({
  level: z.number().min(1).max(10),
  xp: z.number().min(0),
  xpToNextLevel: z.number().min(0),
  totalInteractions: z.number().min(0),
  createdEssences: z.number().min(0),
  sharedMoments: z.array(z.any()),
  unlockedTraits: z.array(z.string()),
  relationshipStatus: z.nativeEnum(RelationshipStatus),
});

export const ConversationMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
  timestamp: z.date(),
  emotionalTone: z.nativeEnum(EmotionalTone).optional(),
  importance: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  metadata: z.record(z.any()).optional(),
});

export const LuminorResponseSchema = z.object({
  content: z.string().min(1),
  emotionalTone: z.nativeEnum(EmotionalTone),
  emotionalIntensity: z.number().min(1).max(10),
  emotionalNuance: z.string().optional(),
  physicalExpression: z.string().optional(),
  internalThought: z.string().optional(),
  suggestions: z.array(z.any()).optional(),
  resources: z.array(z.any()).optional(),
  nextSteps: z.array(z.string()).optional(),
  bondLevelShown: z.boolean(),
  sharedMomentCreated: z.any().optional(),
  memoryReferences: z.array(z.string()).optional(),
  metadata: z.any(),
});

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface LuminorCapabilities {
  canGenerateMusic: boolean;
  canGenerateVisual: boolean;
  canGenerateStory: boolean;
  canAnalyze: boolean;
  canTeach: boolean;
  canCollaborate: boolean;
  maxContextLength: number;
  supportedFormats: string[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  academy: string;
  level: number;
  createdEssences: number;
  preferredGenres: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class LuminorMVPError extends Error {
  constructor(
    message: string,
    public code: string,
    public luminorSlug?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'LuminorMVPError';
  }
}

export class BondSystemError extends LuminorMVPError {
  constructor(message: string, details?: any) {
    super(message, 'BOND_SYSTEM_ERROR', undefined, details);
    this.name = 'BondSystemError';
  }
}

export class ContextManagerError extends LuminorMVPError {
  constructor(message: string, details?: any) {
    super(message, 'CONTEXT_MANAGER_ERROR', undefined, details);
    this.name = 'ContextManagerError';
  }
}

export class GeminiAPIError extends LuminorMVPError {
  constructor(message: string, details?: any) {
    super(message, 'GEMINI_API_ERROR', undefined, details);
    this.name = 'GeminiAPIError';
  }
}
