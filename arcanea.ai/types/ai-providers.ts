export interface AIProvider {
  id: string
  name: string
  type: 'llm' | 'image' | 'video' | 'audio' | 'multimodal'
  capabilities: string[]
  endpoint: string
  apiKey?: string
  model?: string
  maxTokens?: number
  costPerCall?: number
}

export interface LLMProvider extends AIProvider {
  type: 'llm'
  models: LLMModel[]
}

export interface LLMModel {
  id: string
  name: string
  maxTokens: number
  costPer1kTokens: number
  strengths: string[]
  description: string
}

export interface VisionProvider extends AIProvider {
  type: 'image' | 'video' | 'multimodal'
  models: VisionModel[]
  supportsStyles?: boolean
  maxResolution?: string
  costPerGeneration?: number
}

export interface AudioProvider extends AIProvider {
  type: 'audio'
  models: AudioModel[]
  costPerGeneration?: number
}

export interface AudioModel {
  id: string
  name: string
  duration?: number
  costPerGeneration: number
  features?: string[]
}

export interface VisionModel {
  id: string
  name: string
  maxResolution: string
  costPerGeneration: number
  styles?: string[]
  features: string[]
}

export interface AIRequest {
  providerId: string
  modelId?: string
  prompt: string
  options?: {
    temperature?: number
    maxTokens?: number
    style?: string
    dimensions?: { width: number; height: number }
    duration?: number
    quality?: 'standard' | 'hd'
    guardianId?: string
    autoEnhance?: boolean
    context?: any[]
  }
  context?: any[]
  guardianMode?: boolean
}

export interface AIResponse {
  success: boolean
  data?: any
  error?: string
  providerId: string
  modelId: string
  usage?: {
    tokens?: number
    cost?: number
    generationTime?: number
  }
  guardianInsight?: string
  metadata?: {
    original?: any
    enhancements?: string[]
    confidence?: number
  }
  multimodal?: any
}

export interface GuardianPersonality {
  id: string
  name: string
  element: 'fire' | 'water' | 'earth' | 'wind' | 'void'
  frequency: number
  personalityTraits: string[]
  domainExpertise: string[]
  communicationStyle: string
  promptPrefix: string
  systemPrompt: string
}