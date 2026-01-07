// Arcanea AI Core Types
import { z } from 'zod'

// === CORE TYPES ===
export interface LuminorContext {
  userId: string
  sessionId: string
  currentModule?: string
  learningGoals?: string[]
  userProgress?: Record<string, any>
  conversationHistory?: ConversationTurn[]
}

export interface ConversationTurn {
  role: 'user' | 'luminor'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface LuminorResponse {
  content: string
  suggestions?: string[]
  exercises?: Exercise[]
  resources?: Resource[]
  toolRecommendations?: ToolRecommendation[]
  emotionalTone?: EmotionalTone
}

export interface Exercise {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number // minutes
  tools: string[]
  successCriteria: string[]
}

export interface Resource {
  title: string
  type: 'article' | 'video' | 'tutorial' | 'example'
  url?: string
  content?: string
  relevance: number // 0-1
}

export interface ToolRecommendation {
  tool: string
  reason: string
  settings?: Record<string, any>
  tutorialUrl?: string
}

// === PERSONALITY TYPES ===
export interface PersonalityTraits {
  description: string
  teachingStyle: string
  communicationStyle: string
  strengths: string[]
  specialties: string[]
  traits: PersonalityTrait[]
}

export interface PersonalityTrait {
  name: string
  intensity: number // 1-10
  description: string
}

export enum EmotionalTone {
  ENCOURAGING = 'encouraging',
  ANALYTICAL = 'analytical',
  CREATIVE = 'creative',
  SUPPORTIVE = 'supportive',
  CHALLENGING = 'challenging',
  INSPIRING = 'inspiring'
}

// === AI PROVIDER TYPES ===
export interface AIProvider {
  name: string
  generate(prompt: string, options?: AIGenerationOptions): Promise<string>
  generateStructured<T>(prompt: string, schema: z.ZodSchema<T>): Promise<T>
}

export interface AIGenerationOptions {
  temperature?: number
  maxTokens?: number
  model?: string
  systemPrompt?: string
}

// === TOOL INTEGRATION TYPES ===
export interface AITool {
  name: string
  description: string
  category: ToolCategory
  pricing: 'free' | 'paid' | 'freemium'
  apiEndpoint?: string
  authenticate?: () => Promise<boolean>
  generate?(prompt: string, options?: any): Promise<any>
}

export enum ToolCategory {
  TEXT_GENERATION = 'text_generation',
  IMAGE_GENERATION = 'image_generation',
  MUSIC_GENERATION = 'music_generation',
  VIDEO_GENERATION = 'video_generation',
  CODE_GENERATION = 'code_generation',
  AUDIO_PROCESSING = 'audio_processing',
  IMAGE_PROCESSING = 'image_processing'
}

// === LEARNING ANALYTICS ===
export interface LearningAnalytics {
  engagementScore: number // 0-100
  comprehensionLevel: number // 0-100
  frustrationIndicators: string[]
  strengthAreas: string[]
  improvementAreas: string[]
  recommendedNextSteps: string[]
}

// === VALIDATION SCHEMAS ===
export const LuminorContextSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  currentModule: z.string().optional(),
  learningGoals: z.array(z.string()).optional(),
  userProgress: z.record(z.any()).optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'luminor']),
    content: z.string(),
    timestamp: z.date(),
    metadata: z.record(z.any()).optional()
  })).optional()
})

export const LuminorResponseSchema = z.object({
  content: z.string(),
  suggestions: z.array(z.string()).optional(),
  exercises: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedTime: z.number(),
    tools: z.array(z.string()),
    successCriteria: z.array(z.string())
  })).optional(),
  resources: z.array(z.object({
    title: z.string(),
    type: z.enum(['article', 'video', 'tutorial', 'example']),
    url: z.string().optional(),
    content: z.string().optional(),
    relevance: z.number().min(0).max(1)
  })).optional(),
  toolRecommendations: z.array(z.object({
    tool: z.string(),
    reason: z.string(),
    settings: z.record(z.any()).optional(),
    tutorialUrl: z.string().optional()
  })).optional(),
  emotionalTone: z.nativeEnum(EmotionalTone).optional()
})

export type ValidatedLuminorContext = z.infer<typeof LuminorContextSchema>
export type ValidatedLuminorResponse = z.infer<typeof LuminorResponseSchema>