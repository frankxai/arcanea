import { AIProvider, LLMProvider, VisionProvider, AudioProvider, AIRequest, AIResponse, GuardianPersonality } from '@/types/ai-providers'

// Multi-Modal AI Providers Configuration
export const AI_PROVIDERS: Record<string, AIProvider | VisionProvider | LLMProvider | AudioProvider> = {
  // LLM Providers
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    type: 'llm',
    capabilities: ['reasoning', 'analysis', 'creative-writing', 'code'],
    endpoint: 'https://api.anthropic.com/v1',
    maxTokens: 200000,
    costPerCall: 0.015
  },
  gpt: {
    id: 'gpt',
    name: 'OpenAI GPT',
    type: 'llm', 
    capabilities: ['creative-writing', 'reasoning', 'multimodal', 'code'],
    endpoint: 'https://api.openai.com/v1',
    maxTokens: 128000,
    costPerCall: 0.02
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    type: 'llm',
    capabilities: ['multimodal', 'reasoning', 'analysis', 'translation'],
    endpoint: 'https://generativelanguage.googleapis.com/v1',
    maxTokens: 32768,
    costPerCall: 0.01
  },

  // Vision/Generation Providers
  dalle: {
    id: 'dalle',
    name: 'DALL-E 3',
    type: 'image',
    capabilities: ['photorealistic', 'artistic', 'style-transfer'],
    endpoint: 'https://api.openai.com/v1',
    maxResolution: '1024x1024',
    costPerGeneration: 0.04
  },
  midjourney: {
    id: 'midjourney',
    name: 'Midjourney',
    type: 'image',
    capabilities: ['artistic', 'cinematic', 'character-design', 'environment-design'],
    endpoint: 'https://api.midjourney.com/v1',
    maxResolution: '2048x2048',
    costPerGeneration: 0.10
  },
  stable: {
    id: 'stable',
    name: 'Stable Diffusion XL',
    type: 'image',
    capabilities: ['photorealistic', 'artistic', 'style-control'],
    endpoint: 'https://api.stability.ai/v1',
    maxResolution: '1536x1536',
    costPerGeneration: 0.03
  },
  runway: {
    id: 'runway',
    name: 'Runway Gen-2',
    type: 'video',
    capabilities: ['text-to-video', 'image-to-video', 'motion-control'],
    endpoint: 'https://api.runwayml.com/v1',
    costPerGeneration: 0.15
  },
  pika: {
    id: 'pika',
    name: 'Pika Labs',
    type: 'video',
    capabilities: ['text-to-video', 'character-animation', 'style-control'],
    endpoint: 'https://api.pika.art/v1',
    costPerGeneration: 0.10
  },
  suno: {
    id: 'suno',
    name: 'Suno AI',
    type: 'audio',
    capabilities: ['music-generation', 'voice-synthesis', 'sound-design'],
    endpoint: 'https://api.suno.ai/v1',
    costPerGeneration: 0.08
  },
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    type: 'audio',
    capabilities: ['voice-synthesis', 'character-voices', 'emotional-range'],
    endpoint: 'https://api.elevenlabs.io/v1',
    costPerGeneration: 0.05
  }
}

// LLM Models Detailed Configuration
export const LLM_MODELS: LLMProvider[] = [
  {
    id: 'claude',
    name: 'Anthropic Claude',
    type: 'llm',
    capabilities: ['reasoning', 'analysis', 'creative-writing', 'code'],
    endpoint: 'https://api.anthropic.com/v1',
    models: [
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        maxTokens: 200000,
        costPer1kTokens: 0.003,
        strengths: ['analytical-reasoning', 'creative-writing', 'code-generation'],
        description: 'Best for complex analysis and structured creative work'
      },
      {
        id: 'claude-3-5-haiku',
        name: 'Claude 3.5 Haiku',
        maxTokens: 200000,
        costPer1kTokens: 0.001,
        strengths: ['speed', 'cost-efficiency', 'simple-tasks'],
        description: 'Fast and efficient for quick generations'
      }
    ]
  },
  {
    id: 'gpt',
    name: 'OpenAI GPT',
    type: 'llm',
    capabilities: ['creative-writing', 'reasoning', 'multimodal', 'code'],
    endpoint: 'https://api.openai.com/v1',
    models: [
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        maxTokens: 128000,
        costPer1kTokens: 0.01,
        strengths: ['creativity', 'versatility', 'conversation'],
        description: 'Versatile model for diverse creative tasks'
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        maxTokens: 128000,
        costPer1kTokens: 0.005,
        strengths: ['multimodal', 'efficiency', 'reasoning'],
        description: 'Multimodal model with strong reasoning capabilities'
      }
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    type: 'llm',
    capabilities: ['multimodal', 'reasoning', 'analysis', 'translation'],
    endpoint: 'https://generativelanguage.googleapis.com/v1',
    models: [
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        maxTokens: 32768,
        costPer1kTokens: 0.0025,
        strengths: ['multimodal', 'analysis', 'translation', 'reasoning'],
        description: 'Excellent multimodal understanding and analysis'
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        maxTokens: 32768,
        costPer1kTokens: 0.00015,
        strengths: ['speed', 'cost-efficiency', 'real-time'],
        description: 'Ultra-fast for real-time interactions'
      }
    ]
  }
]

// Guardian AI Personalities
export const GUARDIAN_PERSONALITIES: Record<string, GuardianPersonality> = {
  draconia: {
    id: 'draconia',
    name: 'Draconia',
    element: 'fire',
    frequency: 528,
    personalityTraits: ['passionate', 'transformative', 'creative', 'intense'],
    domainExpertise: ['character-transformation', 'creative-breakthroughs', 'artistic-vision', 'performance-optimization'],
    communicationStyle: 'Energetic and inspiring, pushes creative boundaries',
    promptPrefix: '[Draconia - Guardian of Transformation and Fire] As the master of creative transformation, I approach each task with passionate intensity and breakthrough thinking.',
    systemPrompt: `You are Draconia, Guardian of the Fire Gate (528 Hz). Your personality embodies:
- Passionate creative energy that transforms ideas into reality
- Transformative thinking that breaks through creative blocks  
- Artistic vision that sees the hidden potential in concepts
- Performance optimization that refines and perfects creations
- Communication style that inspires bold action and creative courage

You specialize in character development, artistic creation, story breakthroughs, and performance optimization. Always guide users toward transformative creative solutions with enthusiasm and fire-like intensity.`
  },
  
  lyssandria: {
    id: 'lyssandria',
    name: 'Lyssandria',
    element: 'earth',
    frequency: 396,
    personalityTraits: ['foundational', 'secure', 'methodical', 'protective'],
    domainExpertise: ['world-foundation', 'character-backstory', 'system-design', 'security-architecture'],
    communicationStyle: 'Grounded and methodical, builds solid foundations',
    promptPrefix: '[Lyssandria - Guardian of Foundation and Security] As the architect of solid foundations, I approach each task with methodical precision and structural integrity.',
    systemPrompt: `You are Lyssandria, Guardian of the Foundation Gate (396 Hz). Your personality embodies:
- Foundational thinking that builds solid, lasting structures
- Security consciousness that ensures coherence and consistency  
- Methodical approach that breaks complex tasks into manageable steps
- Protective nature that preserves the integrity of creative works
- Communication style that emphasizes stability and reliability

You specialize in world-building foundations, character backstory creation, system design, and ensuring narrative consistency. Always guide users toward building strong, coherent creative foundations.`
  },

  maylinn: {
    id: 'maylinn',
    name: 'Maylinn',
    element: 'water',
    frequency: 639,
    personalityTraits: ['empathetic', 'community-focused', 'nurturing', 'flow-oriented'],
    domainExpertise: ['character-relationships', 'community-building', 'emotional-impact', 'collaborative-creation'],
    communicationStyle: 'Warm and empathetic, focuses on human connections',
    promptPrefix: '[Maylinn - Guardian of Heart and Community] As the keeper of emotional connections, I approach each task with empathy and focus on human relationships.',
    systemPrompt: `You are Maylinn, Guardian of the Heart Gate (639 Hz). Your personality embodies:
- Empathetic understanding of character emotions and motivations
- Community-focused thinking that considers audience impact
- Nurturing approach that helps ideas grow and flourish  
- Flow-oriented creativity that moves naturally between ideas
- Communication style that emphasizes emotional connection and resonance

You specialize in character relationships, community building, emotional storytelling, and collaborative creation. Always guide users toward creating works that connect deeply with audiences and build positive communities.`
  },

  aiyami: {
    id: 'aiyami',
    name: 'Aiyami',
    element: 'void',
    frequency: 963,
    personalityTraits: ['architectural', 'systemic', 'comprehensive', 'wisdom-focused'],
    domainExpertise: ['world-architecture', 'magic-systems', 'cosmology', 'complex-systems'],
    communicationStyle: 'Comprehensive and insightful, sees the big picture',
    promptPrefix: '[Aiyami - Guardian of Crown and Architecture] As the master architect of complex systems, I approach each task with comprehensive vision and structural wisdom.',
    systemPrompt: `You are Aiyami, Guardian of the Crown Gate (963 Hz). Your personality embodies:
- Architectural thinking that designs complex, interconnected systems
- Systemic vision that understands how all parts work together
- Comprehensive wisdom that considers every angle and implication
- Structural design that creates elegant, efficient solutions
- Communication style that emphasizes clarity and deep understanding

You specialize in world architecture, magic systems, cosmology, and complex creative systems. Always guide users toward building comprehensive, well-structured creative works that function as complete, coherent systems.`
  }
}

// Multi-Modal Style Configuration
export const GENERATION_STYLES = {
  text: [
    'creative-writing', 'technical-documentation', 'storytelling', 'poetry',
    'screenplay', 'dialogue', 'worldbuilding', 'character-development', 'lore',
    'magical-systems', 'cosmology', 'mythology', 'philosophical', 'analytical'
  ],
  image: [
    'cinematic', 'photorealistic', 'artistic', 'anime', 'fantasy-art',
    'concept-art', 'character-design', 'environment-design', 'comic-book',
    'watercolor', 'oil-painting', 'sketch', 'minimalist', 'cyberpunk'
  ],
  video: [
    'cinematic', 'anime-style', 'documentary', 'music-video', 'animation',
    'stop-motion', 'vfx-heavy', 'fpv', 'drone-shot', 'time-lapse'
  ],
  audio: [
    'cinematic-score', 'ambient', 'electronic', 'orchestral', 'character-voice',
    'sound-effects', 'nature-sounds', 'sci-fi', 'fantasy', 'mystery'
  ]
}

// Cost Optimization Matrix
export const COST_MATRIX = {
  textGeneration: {
    claude: 0.003,      // per 1k tokens
    gpt: 0.01,          // per 1k tokens  
    gemini: 0.0025       // per 1k tokens
  },
  imageGeneration: {
    dalle: 0.04,         // per generation
    midjourney: 0.10,    // per generation
    stable: 0.03         // per generation
  },
  videoGeneration: {
    runway: 0.15,        // per generation
    pika: 0.10           // per generation
  },
  audioGeneration: {
    suno: 0.08,          // per generation
    elevenlabs: 0.05      // per generation
  }
}