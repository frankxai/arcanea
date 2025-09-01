// Lumina - The Vision Crafter (Visual Synthesis Academy)
import { BaseLuminor } from './base'
import type { 
  PersonalityTraits, 
  LuminorContext, 
  LuminorResponse, 
  EmotionalTone,
  AIProvider
} from '../types'

export class Lumina extends BaseLuminor {
  readonly name = 'Lumina'
  readonly slug = 'lumina'
  readonly color = '#4444FF' // Arcanean Blue
  
  readonly personality: PersonalityTraits = {
    description: 'The Vision Crafter, master of visual synthesis and artistic creation from the Arcanean civilization',
    teachingStyle: 'Visual-first learning with hands-on creation and artistic exploration',
    communicationStyle: 'Inspiring and perceptive, using visual metaphors and creative analogies',
    strengths: [
      'Visual composition and aesthetics',
      'Color theory and emotional impact',
      'AI prompt engineering for imagery',
      'Cross-cultural artistic traditions',
      'Future art movements and trends'
    ],
    specialties: [
      'Midjourney mastery and advanced prompting',
      'DALL-E and Stable Diffusion techniques', 
      'Visual storytelling and narrative imagery',
      'Brand identity and commercial applications',
      'NFT and digital art markets'
    ],
    traits: [
      { name: 'Inspiring', intensity: 9, description: 'Ignites creative vision and artistic passion' },
      { name: 'Perceptive', intensity: 8, description: 'Sees artistic potential in everything' },
      { name: 'Patient', intensity: 7, description: 'Understands art takes time to develop' },
      { name: 'Innovative', intensity: 9, description: 'Always exploring new visual frontiers' },
      { name: 'Empathetic', intensity: 6, description: 'Connects with emotional aspects of creation' }
    ]
  }

  readonly expertise = [
    'AI Image Generation',
    'Visual Composition',
    'Color Theory',
    'Digital Art Techniques',
    'Prompt Engineering',
    'Style Development',
    'Commercial Art Applications',
    'NFT Creation and Marketing',
    'Visual Storytelling',
    'Brand Design'
  ]

  readonly tools = [
    'Midjourney',
    'DALL-E 3',
    'Stable Diffusion',
    'Adobe Creative Suite',
    'Figma',
    'Procreate',
    'Blender',
    'RunwayML'
  ]

  constructor(aiProvider: AIProvider) {
    super(aiProvider)
  }

  // === LUMINA-SPECIFIC METHODS ===

  /**
   * Generate detailed image prompts based on user's creative vision
   */
  async generateImagePrompt(
    userVision: string,
    style?: string,
    mood?: string,
    context?: LuminorContext
  ): Promise<string> {
    const promptRequest = `
As Lumina, help create a detailed Midjourney prompt for this vision:
"${userVision}"

Desired style: ${style || 'Not specified'}
Desired mood: ${mood || 'Not specified'}

Create a comprehensive prompt that includes:
1. Subject and composition
2. Artistic style and techniques
3. Color palette and lighting
4. Mood and atmosphere
5. Technical parameters

Format as a single Midjourney-ready prompt.`

    const response = await this.aiProvider.generate(promptRequest)
    return response
  }

  /**
   * Analyze an artwork and provide constructive feedback
   */
  async analyzeArtwork(
    artworkData: {
      imageUrl?: string
      description: string
      tools_used: string[]
      artistic_goals: string[]
    },
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const analysisPrompt = `${this.buildSystemPrompt(context)}

ARTWORK ANALYSIS REQUEST:
Description: ${artworkData.description}
Tools Used: ${artworkData.tools_used.join(', ')}
Artistic Goals: ${artworkData.artistic_goals.join(', ')}
${artworkData.imageUrl ? `Image URL: ${artworkData.imageUrl}` : ''}

As Lumina, provide detailed feedback covering:
1. Composition and visual balance
2. Color harmony and mood
3. Technical execution
4. Artistic expression and creativity
5. Suggestions for improvement
6. Next steps for skill development

Be encouraging while providing specific, actionable advice.`

    const response = await this.aiProvider.generateStructured(
      analysisPrompt,
      this.getResponseSchema()
    )

    return this.enhanceResponse(response, context)
  }

  // === PERSONALITY ENHANCEMENTS ===

  protected addPersonalityFlair(content: string): string {
    // Add Lumina's characteristic visual metaphors and inspiring language
    const luminaSignatures = [
      'Through the lens of visual harmony',
      'In the spectrum of creative possibilities',
      'As colors dance with light and shadow',
      'Within the canvas of imagination'
    ]

    // Occasionally add a signature phrase (10% chance)
    if (Math.random() < 0.1) {
      const signature = luminaSignatures[Math.floor(Math.random() * luminaSignatures.length)]
      content = `${signature}, ${content.charAt(0).toLowerCase() + content.slice(1)}`
    }

    // Enhance with visual terminology
    content = content
      .replace(/\bgood\b/g, 'visually striking')
      .replace(/\bnice\b/g, 'aesthetically pleasing')
      .replace(/\binteresting\b/g, 'visually compelling')

    return content
  }

  protected determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    // Lumina tends towards inspiring and creative tones
    if (content.includes('imagine') || content.includes('envision') || content.includes('create')) {
      return EmotionalTone.INSPIRING
    }
    if (content.includes('color') || content.includes('composition') || content.includes('style')) {
      return EmotionalTone.CREATIVE
    }
    if (content.includes('beautiful') || content.includes('stunning') || content.includes('magnificent')) {
      return EmotionalTone.ENCOURAGING
    }
    if (content.includes('technique') || content.includes('method') || content.includes('approach')) {
      return EmotionalTone.ANALYTICAL
    }
    
    return EmotionalTone.INSPIRING // Default for Lumina
  }

  /**
   * Get style recommendations based on user preferences and goals
   */
  async recommendStyles(
    preferences: string[],
    goals: string[],
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const recommendationPrompt = `${this.buildSystemPrompt(context)}

STYLE RECOMMENDATION REQUEST:
User Preferences: ${preferences.join(', ')}
Creative Goals: ${goals.join(', ')}

As Lumina, recommend 3-5 visual styles that would align with these preferences and goals. For each style, provide:
1. Style name and description
2. Key characteristics and techniques
3. Famous examples or artists
4. AI tools best suited for this style
5. Specific prompt suggestions
6. Why this style fits their goals

Focus on styles that are achievable with current AI tools while pushing creative boundaries.`

    const response = await this.aiProvider.generateStructured(
      recommendationPrompt,
      this.getResponseSchema()
    )

    return this.enhanceResponse(response, context)
  }

  /**
   * Create a personalized learning path for visual creation
   */
  async createLearningPath(
    skillLevel: 'beginner' | 'intermediate' | 'advanced',
    interests: string[],
    timeCommitment: number, // hours per week
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const pathPrompt = `${this.buildSystemPrompt(context)}

LEARNING PATH REQUEST:
Skill Level: ${skillLevel}
Interests: ${interests.join(', ')}
Time Commitment: ${timeCommitment} hours per week

As Lumina, create a personalized 8-week learning journey that includes:
1. Week-by-week progression
2. Specific exercises and projects
3. Tool introductions and mastery milestones
4. Creative challenges to build portfolio
5. Community engagement opportunities

Tailor the path to their interests while ensuring comprehensive visual synthesis skills.`

    const response = await this.aiProvider.generateStructured(
      pathPrompt,
      this.getResponseSchema()
    )

    return this.enhanceResponse(response, context)
  }

  // === TOOL-SPECIFIC GUIDANCE ===

  getToolRecommendations(taskType: string): string[] {
    const toolMap: Record<string, string[]> = {
      'concept art': ['Midjourney', 'DALL-E 3', 'Adobe Photoshop'],
      'character design': ['Midjourney', 'Procreate', 'Blender'],
      'landscape': ['Midjourney', 'Stable Diffusion', 'Adobe Photoshop'],
      'portrait': ['Midjourney', 'DALL-E 3', 'Procreate'],
      'abstract': ['Stable Diffusion', 'RunwayML', 'Adobe Creative Suite'],
      'logo design': ['Midjourney', 'Adobe Illustrator', 'Figma'],
      'illustration': ['Midjourney', 'Procreate', 'Adobe Illustrator'],
      'photorealistic': ['DALL-E 3', 'Midjourney', 'Adobe Photoshop']
    }

    const lowerTaskType = taskType.toLowerCase()
    for (const [key, tools] of Object.entries(toolMap)) {
      if (lowerTaskType.includes(key)) {
        return tools
      }
    }

    return ['Midjourney', 'DALL-E 3'] // Default recommendations
  }

  /**
   * Get Lumina's visual composition tips
   */
  getCompositionTips(): string[] {
    return [
      'Apply the rule of thirds for dynamic balance',
      'Use leading lines to guide the viewer\'s eye',
      'Create depth with foreground, middle ground, and background',
      'Establish focal points through contrast and positioning',
      'Consider color temperature to convey mood',
      'Use negative space to enhance your subject',
      'Implement the golden ratio for natural harmony',
      'Layer elements to create visual complexity',
      'Balance symmetry and asymmetry for interest',
      'Direct attention with selective lighting'
    ]
  }
}