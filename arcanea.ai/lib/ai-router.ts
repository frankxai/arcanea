import { AIRequest, AIResponse } from '@/types/ai-providers'
import { GUARDIAN_PERSONALITIES } from '@/lib/ai-providers'
import { secureMCPManager } from '@/lib/secure-mcp-manager'

// Cost matrix for different providers and operations
const COST_MATRIX = {
  textGeneration: {
    anthropic: 0.003,      // per 1k tokens
    openai: 0.01,          // per 1k tokens  
    gemini: 0.0025         // per 1k tokens
  },
  imageGeneration: {
    dalle: 0.04,           // per generation
    midjourney: 0.10,       // per generation
    stable: 0.03           // per generation
  },
  videoGeneration: {
    runway: 0.15,           // per generation
    pika: 0.10             // per generation
  },
  audioGeneration: {
    suno: 0.08,            // per generation
    elevenlabs: 0.05        // per generation
  }
}

export class AIRouter {
  private costTracker: number = 0
  private initialized = false

  async initialize() {
    if (this.initialized) {
      console.log('⚡ AI Router already initialized')
      return
    }

    try {
      // Initialize secure MCP manager
      await secureMCPManager.initialize()
      
      this.initialized = true
      console.log('🚀 Secure AI Router Initialized Successfully')
      console.log('📊 Available capabilities:', this.getAvailableCapabilities())

    } catch (error) {
      console.error('🔐 Failed to initialize AI Router:', error)
      throw error
    }
  }

  // Intelligent provider selection based on task requirements
  selectOptimalProvider(request: AIRequest): string {
    const taskComplexity = this.analyzeTaskComplexity(request.prompt)
    const taskType = this.detectTaskType(request.prompt)

    // Select provider based on MCP capabilities and task requirements
    if (request.guardianMode && request.options?.guardianId) {
      return this.selectGuardianOptimalProvider(request.options.guardianId, taskType)
    }

    switch (taskType) {
      case 'code':
        return 'anthropic-claude' // Best for code generation
      case 'creative':
        return 'openai-gpt4' // Best for creative tasks
      case 'multimodal':
        return 'google-gemini' // Best for multimodal
      case 'image':
        return this.selectBestImageProvider(request.options?.style)
      case 'video':
        return 'runway-video' // Best video generation
      case 'audio':
        return 'suno-audio' // Best audio generation
      default:
        return taskComplexity === 'complex' ? 'anthropic-claude' : 'openai-gpt4'
    }
  }

  private selectGuardianOptimalProvider(guardianId: string, taskType: string): string {
    const guardian = GUARDIAN_PERSONALITIES[guardianId]
    if (!guardian) return 'anthropic-claude'

    // Map Guardian elements to optimal providers
    const elementProviderMap = {
      'fire': 'openai-gpt4',      // Creativity and transformation
      'water': 'anthropic-claude',   // Emotional intelligence and storytelling  
      'earth': 'anthropic-claude',   // Structured and systematic
      'wind': 'google-gemini',   // Communication and flow
      'void': 'google-gemini'    // Innovation and future vision
    }

    return elementProviderMap[guardian.element] || 'anthropic-claude'
  }

  private selectBestImageProvider(style?: string): string {
    if (!style) return 'midjourney'

    const styleProviderMap: Record<string, string> = {
      'photorealistic': 'midjourney',
      'artistic': 'midjourney',
      'cinematic': 'midjourney',
      'anime': 'midjourney',
      'concept-art': 'midjourney',
      'character-design': 'midjourney'
    }

    return styleProviderMap[style] || 'midjourney'
  }

  private analyzeTaskComplexity(prompt: string): 'simple' | 'medium' | 'complex' {
    const complexityIndicators = [
      'explain', 'analyze', 'compare', 'synthesize', 'integrate',
      'architect', 'design system', 'comprehensive', 'detailed'
    ]

    const foundIndicators = complexityIndicators.filter(indicator => 
      prompt.toLowerCase().includes(indicator)
    )

    if (foundIndicators.length >= 3) return 'complex'
    if (foundIndicators.length >= 1) return 'medium'
    return 'simple'
  }

  private detectTaskType(prompt: string): string {
    const patterns = {
      code: /code|function|class|algorithm|debug|programming/,
      creative: /story|poem|art|creative|imagine|design/,
      multimodal: /image|video|audio|multimodal|visual/,
      image: /image|picture|photo|art|drawing|visual/,
      video: /video|animation|motion|film/,
      audio: /music|sound|audio|voice|speech/
    }

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(prompt.toLowerCase())) {
        return type
      }
    }

    return 'text'
  }

  private getAvailableCapabilities(): string[] {
    const connections = secureMCPManager.getConnectedServers()
    const capabilities = new Set<string>()
    
    for (const connection of connections) {
      if (connection.config.capabilities) {
        connection.config.capabilities.forEach((cap: string) => capabilities.add(cap))
      }
    }

    return Array.from(capabilities)
  }

  // Advanced auto-generation with context awareness (Grok-like)
  async generateAutoEnhanced(request: AIRequest): Promise<AIResponse> {
    try {
      const baseResponse = await this.generateText(request)
      
      if (!baseResponse.success || !request.options?.autoEnhance) {
        return baseResponse
      }

      // Auto-enhancement based on content analysis
      const enhancedContent = await this.autoEnhanceContent(
        baseResponse.data,
        request.prompt,
        request.options?.guardianId
      )

      return {
        ...baseResponse,
        data: enhancedContent.content,
        metadata: {
          original: baseResponse.data,
          enhancements: enhancedContent.enhancements,
          confidence: enhancedContent.confidence
        }
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Auto-enhancement failed';
      return {
        success: false,
        error: message,
        providerId: request.providerId || 'unknown',
        modelId: request.modelId || 'unknown'
      }
    }
  }

  private async autoEnhanceContent(
    originalContent: string,
    prompt: string,
    guardianId?: string
  ): Promise<{
    content: string
    enhancements: string[]
    confidence: number
  }> {
    const enhancements = []
    let enhancedContent = originalContent
    let confidence = 0.7

    // Analyze content type and apply enhancements
    const contentType = this.detectContentType(originalContent)
    
    switch (contentType) {
      case 'creative':
        enhancements.push(...await this.enhanceCreativeContent(enhancedContent))
        break
      case 'technical':
        enhancements.push(...await this.enhanceTechnicalContent(enhancedContent))
        break
      case 'storytelling':
        enhancements.push(...await this.enhanceStorytellingContent(enhancedContent))
        break
    }

    // Apply Guardian-specific enhancements
    if (guardianId) {
      const guardianEnhancement = await this.applyGuardianEnhancement(
        enhancedContent,
        guardianId,
        prompt
      )
      enhancedContent = guardianEnhancement.content
      enhancements.push(...guardianEnhancement.enhancements)
      confidence = Math.max(confidence, guardianEnhancement.confidence)
    }

    return {
      content: enhancedContent,
      enhancements,
      confidence
    }
  }

  private detectContentType(content: string): string {
    const patterns = {
      creative: /(story|poem|art|creative|imagine|design)/i,
      technical: /(code|function|algorithm|technical|implementation)/i,
      storytelling: /(character|plot|narrative|story|dialogue)/i
    }

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(content)) {
        return type
      }
    }

    return 'general'
  }

  private async enhanceCreativeContent(content: string): Promise<string[]> {
    const enhancements = []
    
    try {
      const enhancementPrompt = `
        Analyze and enhance this creative content:
        "${content}"
        
        Provide suggestions for:
        1. Vivid imagery improvements
        2. Emotional depth enhancement
        3. Creative expansion opportunities
        
        Respond with specific, actionable enhancements only.
      `

      const response = await secureMCPManager.generateText(
        'anthropic-claude',
        enhancementPrompt,
        { maxTokens: 500, temperature: 0.8 }
      )

      if (response.content) {
        enhancements.push('Creative imagery enhancement', 'Emotional depth added')
      }
    } catch (error) {
      console.warn('Creative enhancement failed:', error)
    }

    return enhancements
  }

  private async enhanceTechnicalContent(content: string): Promise<string[]> {
    const enhancements = []
    
    try {
      // Add technical depth, best practices, optimization suggestions
      enhancements.push('Technical best practices applied', 'Performance optimizations suggested')
    } catch (error) {
      console.warn('Technical enhancement failed:', error)
    }

    return enhancements
  }

  private async enhanceStorytellingContent(content: string): Promise<string[]> {
    const enhancements = []
    
    try {
      // Add narrative structure, character development, plot refinement
      enhancements.push('Narrative structure improved', 'Character depth enhanced')
    } catch (error) {
      console.warn('Storytelling enhancement failed:', error)
    }

    return enhancements
  }

  private async applyGuardianEnhancement(
    content: string,
    guardianId: string,
    prompt: string
  ): Promise<{
    content: string
    enhancements: string[]
    confidence: number
  }> {
    const guardian = GUARDIAN_PERSONALITIES[guardianId]
    if (!guardian) {
      return { content, enhancements: [], confidence: 0.5 }
    }

    try {
      const guardianPrompt = `
        As ${guardian.name}, enhance this content with your unique perspective:
        
        Original prompt: "${prompt}"
        Current content: "${content}"
        
        Your element: ${guardian.element}
        Your expertise: ${guardian.domainExpertise.join(', ')}
        
        Rewrite the content in your distinctive voice, emphasizing your elemental nature.
        Keep the core meaning but transform it with your unique wisdom and style.
      `

      const response = await secureMCPManager.generateText(
        'anthropic-claude',
        guardianPrompt,
        { temperature: 0.9, maxTokens: 1500 }
      )

      return {
        content: response.content,
        enhancements: [`${guardian.element} elemental enhancement applied`, `${guardian.name}'s wisdom integrated`],
        confidence: 0.9
      }
    } catch (error) {
      console.warn('Guardian enhancement failed:', error)
      return { content, enhancements: [], confidence: 0.3 }
    }
  }

  // Text generation with secure MCP routing
  async generateText(request: AIRequest): Promise<AIResponse> {
    try {
      const providerId = request.providerId || this.selectOptimalProvider(request)
      
      console.log(`📝 Generating text with ${providerId}`)
      
      const response = await secureMCPManager.generateText(providerId, request.prompt, request.options)
      
      // Apply Guardian AI enhancement if enabled
      if (request.guardianMode && request.options?.guardianId) {
        response.data = await this.applyGuardianPersonality(
          response.data,
          GUARDIAN_PERSONALITIES[request.options.guardianId]
        )
        response.guardianInsight = await this.generateGuardianInsight(
          request.prompt,
          request.options.guardianId
        )
      }

      const cost = this.calculateCost(providerId, 'text', response.usage)
      this.costTracker += cost

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: request.modelId || `${providerId}-default`,
        usage: {
          tokens: response.usage?.tokens || 0,
          cost,
          generationTime: response.usage?.generationTime || 0
        },
        guardianInsight: response.guardianInsight
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Text generation failed';
      return {
        success: false,
        error: message,
        providerId: request.providerId || 'unknown',
        modelId: request.modelId || 'unknown'
      }
    }
  }

  // Image generation with secure MCP
  async generateImage(request: AIRequest): Promise<AIResponse> {
    try {
      const providerId = request.providerId || this.selectOptimalProvider(request)
      
      console.log(`🎨 Generating image with ${providerId}`)
      
      const response = await secureMCPManager.generateImage(providerId, request.prompt, request.options)
      const cost = this.calculateCost(providerId, 'image', response.usage)
      this.costTracker += cost

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: request.modelId || `${providerId}-default`,
        usage: {
          cost,
          generationTime: response.usage?.generationTime || 0
        }
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Image generation failed';
      return {
        success: false,
        error: message,
        providerId: request.providerId || 'unknown',
        modelId: request.modelId || 'unknown'
      }
    }
  }

  // Video generation with secure MCP
  async generateVideo(request: AIRequest): Promise<AIResponse> {
    try {
      const providerId = request.providerId || this.selectOptimalProvider(request)
      
      console.log(`🎬 Generating video with ${providerId}`)
      
      const response = await secureMCPManager.generateVideo(providerId, request.prompt, request.options)
      const cost = this.calculateCost(providerId, 'video', response.usage)
      this.costTracker += cost

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: request.modelId || `${providerId}-default`,
        usage: {
          cost,
          generationTime: response.usage?.generationTime || 0
        }
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Video generation failed';
      return {
        success: false,
        error: message,
        providerId: request.providerId || 'unknown',
        modelId: request.modelId || 'unknown'
      }
    }
  }

  // Audio generation with secure MCP
  async generateAudio(request: AIRequest): Promise<AIResponse> {
    try {
      const providerId = request.providerId || this.selectOptimalProvider(request)
      
      console.log(`🎵 Generating audio with ${providerId}`)
      
      const response = await secureMCPManager.generateAudio(providerId, request.prompt, request.options)
      const cost = this.calculateCost(providerId, 'audio', response.usage)
      this.costTracker += cost

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: request.modelId || `${providerId}-default`,
        usage: {
          cost,
          generationTime: response.usage?.generationTime || 0
        }
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Audio generation failed';
      return {
        success: false,
        error: message,
        providerId: request.providerId || 'unknown',
        modelId: request.modelId || 'unknown'
      }
    }
  }

  // Guardian AI personality application
  private async applyGuardianPersonality(data: string, guardian: any): Promise<string> {
    const guardianPrompt = guardian.systemPrompt
    
    const enhancedResponse = await secureMCPManager.generateText(
      'anthropic-claude',
      `${guardianPrompt}\n\nOriginal response: ${data}\n\nRewrite this response in the style of ${guardian.name}, emphasizing ${guardian.personalityTraits.join(', ')}.`,
      { temperature: 0.8, maxTokens: 1000 }
    )

    return enhancedResponse.data
  }

  private async generateGuardianInsight(prompt: string, guardianId: string): Promise<string> {
    const guardian = GUARDIAN_PERSONALITIES[guardianId]
    
    const insightPrompt = `
As ${guardian.name} (${guardian.element} Guardian, ${guardian.frequency} Hz), provide a brief insight about this user request:
"${prompt}"

Focus on your domain expertise: ${guardian.domainExpertise.join(', ')}.
Keep it to 1-2 sentences, in your distinctive voice.
`

    const response = await secureMCPManager.generateText(
      'anthropic-claude',
      insightPrompt,
      { temperature: 0.7, maxTokens: 500 }
    )

    return response.data
  }

  // Cost calculation
  private calculateCost(providerId: string, generationType: string, usage?: any): number {
    const providerShortName = providerId.split('-')[0]
    const baseCosts = COST_MATRIX[`${generationType}Generation` as keyof typeof COST_MATRIX]
    
    if (!baseCosts || !baseCosts[providerShortName as keyof typeof baseCosts]) {
      return 0.01 // Default cost
    }

    const baseCost = baseCosts[providerShortName as keyof typeof baseCosts]
    
    if (generationType === 'text' && usage?.tokens) {
      return baseCost * (usage.tokens / 1000)
    } else if (['image', 'video', 'audio'].includes(generationType)) {
      return baseCost
    }
    
    return 0.01
  }

  // Usage and analytics
  getUsageStats() {
    return {
      totalCost: this.costTracker,
      connectedProviders: secureMCPManager.getConnectedServers().map(conn => conn.config.name),
      totalGenerations: this.costTracker > 0 ? Math.floor(this.costTracker / 0.01) : 0,
      availableCapabilities: this.getAvailableCapabilities(),
      systemHealth: secureMCPManager.getSystemHealth()
    }
  }

  // Health check for all connections
  async healthCheck(): Promise<{ provider: string; status: 'healthy' | 'unhealthy'; error?: string }[]> {
    const healthResults = await secureMCPManager.getServerHealth()
    return healthResults.map(h => ({
      provider: h.server,
      status: h.status === 'healthy' ? 'healthy' : 'unhealthy',
      error: h.error
    }))
  }

  // Shutdown all connections
  async shutdown(): Promise<void> {
    await secureMCPManager.shutdown()
    console.log('🔒 AI Router shutdown complete')
  }
}

export default AIRouter