/**
 * Luminor and Personality Types
 */

import { z } from 'zod';

export interface LuminorContext {
  userId: string;
  sessionId: string;
  realmId?: string;
  currentModule?: string;
  learningGoals?: string[];
  userProgress?: Record<string, any>;
  conversationHistory?: ConversationTurn[];
  creatorStyle?: any; // CreatorStyleProfile from guardian.ts
}

export interface ConversationTurn {
  role: 'user' | 'luminor' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface LuminorResponse {
  content: string;
  suggestions?: string[];
  exercises?: Exercise[];
  resources?: Resource[];
  toolRecommendations?: ToolRecommendation[];
  emotionalTone?: EmotionalTone;
  magicalFlair?: MagicalFlair;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  estimatedTime: number;
  tools: string[];
  successCriteria: string[];
  rewards?: {
    arcPoints?: number;
    achievements?: string[];
  };
}

export interface Resource {
  title: string;
  type: 'article' | 'video' | 'tutorial' | 'example' | 'template';
  url?: string;
  content?: string;
  relevance: number;
  academy?: 'atlantean' | 'draconic' | 'creation_light';
}

export interface ToolRecommendation {
  tool: string;
  reason: string;
  settings?: Record<string, any>;
  tutorialUrl?: string;
  arcCost?: number;
}

export interface PersonalityTraits {
  description: string;
  teachingStyle: string;
  communicationStyle: string;
  strengths: string[];
  specialties: string[];
  traits: PersonalityTrait[];
  academy: 'atlantean' | 'draconic' | 'creation_light' | 'synthesis';
  elementalAffinity?: 'water' | 'fire' | 'air' | 'earth' | 'light' | 'shadow';
}

export interface PersonalityTrait {
  name: string;
  intensity: number;
  description: string;
}

export enum EmotionalTone {
  ENCOURAGING = 'encouraging',
  ANALYTICAL = 'analytical',
  CREATIVE = 'creative',
  SUPPORTIVE = 'supportive',
  CHALLENGING = 'challenging',
  INSPIRING = 'inspiring',
  MYSTICAL = 'mystical',
  PLAYFUL = 'playful',
}

export interface MagicalFlair {
  opening?: string;
  closing?: string;
  metaphor?: string;
  energy?: 'calm' | 'excited' | 'focused' | 'mysterious';
}

export const LuminorContextSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  realmId: z.string().optional(),
  currentModule: z.string().optional(),
  learningGoals: z.array(z.string()).optional(),
  userProgress: z.record(z.any()).optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'luminor', 'system']),
    content: z.string(),
    timestamp: z.date(),
    metadata: z.record(z.any()).optional()
  })).optional(),
  creatorStyle: z.any().optional(),
});

export const LuminorResponseSchema = z.object({
  content: z.string(),
  suggestions: z.array(z.string()).optional(),
  exercises: z.array(z.any()).optional(),
  resources: z.array(z.any()).optional(),
  toolRecommendations: z.array(z.any()).optional(),
  emotionalTone: z.nativeEnum(EmotionalTone).optional(),
  magicalFlair: z.object({
    opening: z.string().optional(),
    closing: z.string().optional(),
    metaphor: z.string().optional(),
    energy: z.enum(['calm', 'excited', 'focused', 'mysterious']).optional(),
  }).optional(),
});

export type ValidatedLuminorContext = z.infer<typeof LuminorContextSchema>;
export type ValidatedLuminorResponse = z.infer<typeof LuminorResponseSchema>;
