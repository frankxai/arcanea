// Client-safe AI data - no server imports, no API keys
// Use this in 'use client' components instead of server-side modules

export interface GuardianInfo {
  id: string
  name: string
  element: 'fire' | 'water' | 'earth' | 'wind' | 'void'
  frequency: number
  traits: string[]
  expertise: string[]
  style: string
}

export const GUARDIANS: Record<string, GuardianInfo> = {
  draconia: {
    id: 'draconia',
    name: 'Draconia',
    element: 'fire',
    frequency: 528,
    traits: ['passionate', 'transformative', 'creative', 'intense'],
    expertise: ['character-transformation', 'creative-breakthroughs', 'artistic-vision'],
    style: 'Energetic and inspiring, pushes creative boundaries',
  },
  lyssandria: {
    id: 'lyssandria',
    name: 'Lyssandria',
    element: 'earth',
    frequency: 396,
    traits: ['foundational', 'secure', 'methodical', 'protective'],
    expertise: ['world-foundation', 'character-backstory', 'system-design'],
    style: 'Grounded and methodical, builds solid foundations',
  },
  maylinn: {
    id: 'maylinn',
    name: 'Maylinn',
    element: 'water',
    frequency: 639,
    traits: ['empathetic', 'community-focused', 'nurturing', 'flow-oriented'],
    expertise: ['character-relationships', 'community-building', 'emotional-impact'],
    style: 'Warm and empathetic, focuses on human connections',
  },
  aiyami: {
    id: 'aiyami',
    name: 'Aiyami',
    element: 'void',
    frequency: 963,
    traits: ['architectural', 'systemic', 'comprehensive', 'wisdom-focused'],
    expertise: ['world-architecture', 'magic-systems', 'cosmology', 'complex-systems'],
    style: 'Comprehensive and insightful, sees the big picture',
  },
  leyla: {
    id: 'leyla',
    name: 'Leyla',
    element: 'water',
    frequency: 417,
    traits: ['creative', 'fluid', 'emotional', 'intuitive'],
    expertise: ['creative-flow', 'emotional-expression', 'artistic-intuition'],
    style: 'Flowing and creative, unlocks emotional expression',
  },
  alera: {
    id: 'alera',
    name: 'Alera',
    element: 'wind',
    frequency: 741,
    traits: ['truthful', 'expressive', 'clear', 'articulate'],
    expertise: ['voice-finding', 'truth-expression', 'communication-mastery'],
    style: 'Clear and articulate, helps find authentic voice',
  },
}

export const GENERATION_STYLES = {
  text: [
    'creative-writing', 'technical-documentation', 'storytelling', 'poetry',
    'screenplay', 'dialogue', 'worldbuilding', 'character-development',
  ],
  image: [
    'cinematic', 'photorealistic', 'artistic', 'anime', 'fantasy-art',
    'concept-art', 'character-design', 'environment-design',
  ],
  video: [
    'cinematic', 'anime-style', 'documentary', 'music-video', 'animation',
  ],
  audio: [
    'cinematic-score', 'ambient', 'electronic', 'orchestral', 'character-voice',
  ],
}
