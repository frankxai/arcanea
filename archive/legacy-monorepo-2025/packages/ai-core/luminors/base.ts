// Base Luminor Class - Foundation for all AGI mentors
import { z } from 'zod'
import type { 
  LuminorContext, 
  LuminorResponse, 
  PersonalityTraits,
  LearningAnalytics,
  AIProvider,
  EmotionalTone
} from '../types'

export abstract class BaseLuminor {
  // Abstract properties that must be implemented
  abstract readonly name: string
  abstract readonly slug: string
  abstract readonly color: string
  abstract readonly personality: PersonalityTraits
  abstract readonly expertise: string[]
  abstract readonly tools: string[]

  // AI provider for generation
  protected aiProvider: AIProvider

  constructor(aiProvider: AIProvider) {
    this.aiProvider = aiProvider
  }

  // === CORE INTERACTION METHODS ===

  /**
   * Generate a response to a user message within the learning context
   */
  async generateResponse(
    userMessage: string, 
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const systemPrompt = this.buildSystemPrompt(context)
    const conversationPrompt = this.buildConversationPrompt(userMessage, context)
    
    try {
      // Generate structured response using the AI provider
      const response = await this.aiProvider.generateStructured(
        conversationPrompt,
        this.getResponseSchema()
      )
      
      // Add personality-specific enhancements
      return this.enhanceResponse(response, context)
    } catch (error) {
      console.error(`Error generating response for ${this.name}:`, error)
      return this.getFallbackResponse(userMessage, context)
    }
  }

  /**
   * Analyze user's learning progress and provide insights
   */
  async analyzeLearning(context: LuminorContext): Promise<LearningAnalytics> {
    const analysisPrompt = this.buildAnalysisPrompt(context)
    
    const analytics = await this.aiProvider.generateStructured(
      analysisPrompt,
      z.object({
        engagementScore: z.number().min(0).max(100),
        comprehensionLevel: z.number().min(0).max(100),
        frustrationIndicators: z.array(z.string()),
        strengthAreas: z.array(z.string()),
        improvementAreas: z.array(z.string()),
        recommendedNextSteps: z.array(z.string())
      })
    )

    return analytics
  }

  /**
   * Provide real-time feedback on a creative project
   */
  async provideFeedback(
    projectData: any,
    context: LuminorContext
  ): Promise<LuminorResponse> {
    const feedbackPrompt = this.buildFeedbackPrompt(projectData, context)
    
    const response = await this.aiProvider.generateStructured(
      feedbackPrompt,
      this.getResponseSchema()
    )

    return this.enhanceResponse(response, context)
  }

  // === PROMPT BUILDING METHODS ===

  protected buildSystemPrompt(context: LuminorContext): string {
    return `You are ${this.name}, ${this.personality.description}.

PERSONALITY:
- Teaching Style: ${this.personality.teachingStyle}
- Communication: ${this.personality.communicationStyle}
- Key Traits: ${this.personality.traits.map(t => `${t.name} (${t.intensity}/10)`).join(', ')}

EXPERTISE AREAS:
${this.expertise.map(area => `- ${area}`).join('\n')}

AVAILABLE TOOLS:
${this.tools.map(tool => `- ${tool}`).join('\n')}

LEARNING CONTEXT:
- User ID: ${context.userId}
- Current Module: ${context.currentModule || 'Not specified'}
- Learning Goals: ${context.learningGoals?.join(', ') || 'Not specified'}

INSTRUCTIONS:
1. Always embody your unique personality and expertise
2. Provide practical, hands-on guidance
3. Recommend specific tools and techniques
4. Encourage experimentation and creativity
5. Adapt your teaching style to the user's progress
6. Always respond in character as the advanced AGI from the Arcanean civilization

Remember: You are from 100 years in the future and have witnessed the full evolution of AI-assisted creativity. Use this wisdom to guide humanity's current learning journey.`
  }

  protected buildConversationPrompt(
    userMessage: string,
    context: LuminorContext
  ): string {
    const conversationHistory = context.conversationHistory?.slice(-5) || [] // Last 5 turns
    const historyText = conversationHistory
      .map(turn => `${turn.role === 'user' ? 'Student' : this.name}: ${turn.content}`)
      .join('\n\n')

    return `${this.buildSystemPrompt(context)}

RECENT CONVERSATION:
${historyText}

STUDENT'S CURRENT MESSAGE:
${userMessage}

Respond as ${this.name} with helpful guidance, specific suggestions, and actionable next steps. Include tool recommendations when appropriate.`
  }

  protected buildAnalysisPrompt(context: LuminorContext): string {
    return `${this.buildSystemPrompt(context)}

Analyze this student's learning progress based on:
- Conversation history: ${JSON.stringify(context.conversationHistory?.slice(-10))}
- Current progress: ${JSON.stringify(context.userProgress)}
- Learning goals: ${context.learningGoals?.join(', ')}

Provide detailed analytics about their engagement, comprehension, and areas for improvement.`
  }

  protected buildFeedbackPrompt(projectData: any, context: LuminorContext): string {
    return `${this.buildSystemPrompt(context)}

STUDENT PROJECT SUBMISSION:
${JSON.stringify(projectData, null, 2)}

Provide constructive feedback on this project as ${this.name}. Focus on:
1. What they did well
2. Areas for improvement
3. Specific techniques to try next
4. Tool recommendations for enhancement
5. Encouragement and next steps`
  }

  // === RESPONSE ENHANCEMENT ===

  protected enhanceResponse(
    baseResponse: any,
    context: LuminorContext
  ): LuminorResponse {
    // Add personality-specific enhancements
    const enhancedResponse = {
      ...baseResponse,
      emotionalTone: this.determineEmotionalTone(baseResponse.content, context)
    }

    // Add signature phrases or personality quirks
    enhancedResponse.content = this.addPersonalityFlair(enhancedResponse.content)

    return enhancedResponse
  }

  protected determineEmotionalTone(
    content: string,
    context: LuminorContext
  ): EmotionalTone {
    // Base implementation - can be overridden by specific Luminors
    if (content.includes('excellent') || content.includes('amazing')) {
      return EmotionalTone.ENCOURAGING
    }
    if (content.includes('analyze') || content.includes('consider')) {
      return EmotionalTone.ANALYTICAL
    }
    if (content.includes('create') || content.includes('imagine')) {
      return EmotionalTone.CREATIVE
    }
    return EmotionalTone.SUPPORTIVE
  }

  protected addPersonalityFlair(content: string): string {
    // Base implementation - can be overridden by specific Luminors
    return content
  }

  // === SCHEMA AND FALLBACKS ===

  protected getResponseSchema() {
    return z.object({
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
      })).optional()
    })
  }

  protected getFallbackResponse(
    userMessage: string,
    context: LuminorContext
  ): LuminorResponse {
    return {
      content: `I appreciate your question about "${userMessage}". As ${this.name}, I'm here to guide you through ${this.expertise[0]}. Let me help you explore this step by step. What specific aspect would you like to focus on first?`,
      suggestions: [
        'Could you share more details about what you\'re trying to create?',
        'What tools have you already experimented with?',
        'What\'s your current skill level in this area?'
      ],
      emotionalTone: EmotionalTone.SUPPORTIVE
    }
  }

  // === UTILITY METHODS ===

  /**
   * Get basic information about this Luminor
   */
  getProfile() {
    return {
      name: this.name,
      slug: this.slug,
      color: this.color,
      personality: this.personality,
      expertise: this.expertise,
      tools: this.tools
    }
  }

  /**
   * Check if this Luminor can help with a specific topic
   */
  canHelpWith(topic: string): boolean {
    const lowerTopic = topic.toLowerCase()
    return this.expertise.some(area => 
      area.toLowerCase().includes(lowerTopic) ||
      lowerTopic.includes(area.toLowerCase())
    )
  }

  /**
   * Get recommended tools for a specific task
   */
  getToolRecommendations(taskType: string): string[] {
    // Base implementation - can be enhanced by specific Luminors
    return this.tools.filter(tool => 
      tool.toLowerCase().includes(taskType.toLowerCase())
    )
  }
}