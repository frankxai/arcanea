// Arcanea AI Platform - Secure MCP (Model Context Protocol) Manager
// This handles secure MCP server connections with zero client-side exposure

import { z } from 'zod'
import { getSecureSecret } from '@/lib/secure-secret-manager'

// MCP Server Schema with strict validation
const MCPServerConfigSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  endpoint: z.string().url(),
  capabilities: z.array(z.string()).min(1),
  authentication: z.object({
    type: z.enum(['api_key', 'oauth', 'bearer', 'certificate']),
    keyId: z.string().min(1)
  }),
  rateLimit: z.object({
    requests: z.number().min(1),
    window: z.string().min(1)
  }).optional(),
  healthCheck: z.object({
    endpoint: z.string().url().optional(),
    interval: z.number().min(5000).default(30000) // 30 seconds default
  }).optional()
})

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>

export interface MCPConnection {
  id: string
  config: MCPServerConfig
  client: any
  status: 'connecting' | 'connected' | 'error' | 'disconnected'
  lastHealthCheck: Date
  usage: {
    requests: number
    errors: number
    lastUsed: Date
  }
}

export interface MCPHealth {
  server: string
  status: 'healthy' | 'unhealthy' | 'unknown'
  responseTime: number
  error?: string
  lastCheck: Date
}

class SecureMCPManager {
  private static instance: SecureMCPManager
  private connections: Map<string, MCPConnection> = new Map()
  private servers: Map<string, MCPServerConfig> = new Map()
  private healthMonitor: NodeJS.Timeout | null = null
  private initialized = false

  static getInstance(): SecureMCPManager {
    if (!SecureMCPManager.instance) {
      SecureMCPManager.instance = new SecureMCPManager()
    }
    return SecureMCPManager.instance
  }

  private constructor() {
    this.validateSecurityContext()
    this.initializeDefaultServers()
    this.startHealthMonitoring()
  }

  private validateSecurityContext(): void {
    // Strict security: only server-side execution
    if (typeof window !== 'undefined') {
      throw new Error('🔐 MCP SECURITY: Cannot run in browser context')
    }

    console.log('🔒 SecureMCPManager initialized in secure context')
  }

  private initializeDefaultServers(): void {
    // Pre-configured MCP servers with secure defaults
    const defaultServers: MCPServerConfig[] = [
      {
        name: 'anthropic-claude',
        description: 'Claude 3.5 Sonnet with enhanced reasoning and analysis capabilities',
        endpoint: 'https://api.anthropic.com',
        capabilities: ['text-generation', 'reasoning', 'analysis', 'code-generation', 'structured-output'],
        authentication: {
          type: 'api_key',
          keyId: 'ANTHROPIC_API_KEY'
        },
        rateLimit: {
          requests: 1000,
          window: '1h'
        },
        healthCheck: {
          endpoint: 'https://api.anthropic.com/v1/models',
          interval: 30000
        }
      },
      {
        name: 'openai-gpt4',
        description: 'GPT-4 Turbo for fast, versatile creative and analytical tasks',
        endpoint: 'https://api.openai.com/v1',
        capabilities: ['text-generation', 'creative-writing', 'multimodal', 'image-analysis', 'function-calling'],
        authentication: {
          type: 'api_key',
          keyId: 'OPENAI_API_KEY'
        },
        rateLimit: {
          requests: 500,
          window: '1h'
        },
        healthCheck: {
          endpoint: 'https://api.openai.com/v1/models',
          interval: 30000
        }
      },
      {
        name: 'google-gemini',
        description: 'Gemini Pro with multimodal understanding and generation capabilities',
        endpoint: 'https://generativelanguage.googleapis.com',
        capabilities: ['text-generation', 'image-generation', 'video-analysis', 'multimodal', 'translation'],
        authentication: {
          type: 'api_key',
          keyId: 'GOOGLE_API_KEY'
        },
        rateLimit: {
          requests: 750,
          window: '1h'
        },
        healthCheck: {
          endpoint: 'https://generativelanguage.googleapis.com/v1/models',
          interval: 30000
        }
      },
      {
        name: 'midjourney',
        description: 'Midjourney for premium artistic image generation and style transfer',
        endpoint: 'https://api.midjourney.com',
        capabilities: ['image-generation', 'artistic-style', 'style-transfer', 'creative-design'],
        authentication: {
          type: 'api_key',
          keyId: 'MIDJOURNEY_API_KEY'
        },
        rateLimit: {
          requests: 200,
          window: '1h'
        }
      },
      {
        name: 'runway-video',
        description: 'Runway ML for professional video generation and editing',
        endpoint: 'https://api.runwayml.com',
        capabilities: ['video-generation', 'video-editing', 'motion-graphics', 'text-to-video'],
        authentication: {
          type: 'api_key',
          keyId: 'RUNWAY_API_KEY'
        },
        rateLimit: {
          requests: 100,
          window: '1h'
        }
      },
      {
        name: 'suno-audio',
        description: 'Suno AI for music generation, audio synthesis, and voice cloning',
        endpoint: 'https://api.suno.com',
        capabilities: ['music-generation', 'audio-synthesis', 'voice-cloning', 'text-to-speech'],
        authentication: {
          type: 'api_key',
          keyId: 'SUNO_API_KEY'
        },
        rateLimit: {
          requests: 150,
          window: '1h'
        }
      }
    ]

    // Validate and store server configurations
    for (const server of defaultServers) {
      try {
        MCPServerConfigSchema.parse(server)
        this.servers.set(server.name, server)
        console.log(`📡 MCP Server configured: ${server.name}`)
      } catch (error) {
        console.error(`❌ Invalid MCP server config: ${server.name}`, error)
      }
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('🔄 MCP Manager already initialized')
      return
    }

    try {
      console.log('🚀 Initializing Secure MCP Manager...')
      
      // Connect to all available servers with secure API keys
      const connectionPromises = Array.from(this.servers.values()).map(server => 
        this.connectToServer(server.name)
      )

      const results = await Promise.allSettled(connectionPromises)
      const connected = results.filter(r => r.status === 'fulfilled').length
      const failed = results.filter(r => r.status === 'rejected').length

      console.log(`✅ Connected to ${connected}/${this.servers.size} MCP servers`)
      if (failed > 0) {
        console.warn(`⚠️ Failed to connect to ${failed} MCP servers`)
      }

      this.initialized = true
      console.log('🎯 Secure MCP Manager initialized successfully')
      
    } catch (error) {
      console.error('🔐 MCP Manager initialization failed:', error)
      throw error
    }
  }

  async connectToServer(serverName: string): Promise<MCPConnection> {
    const serverConfig = this.servers.get(serverName)
    if (!serverConfig) {
      throw new Error(`MCP server '${serverName}' not found`)
    }

    console.log(`🔌 Connecting to MCP: ${serverConfig.description}`)
    
    const connectionId = `mcp-${serverName}-${Date.now()}`
    const connection: MCPConnection = {
      id: connectionId,
      config: serverConfig,
      client: null,
      status: 'connecting',
      lastHealthCheck: new Date(),
      usage: {
        requests: 0,
        errors: 0,
        lastUsed: new Date()
      }
    }

    try {
      // Get secure API key
      const apiKey = getSecureSecret[serverConfig.authentication.keyId as keyof typeof getSecureSecret]()
      if (!apiKey) {
        throw new Error(`Missing API key for ${serverName}`)
      }

      // Create connection based on provider type
      const client = await this.createSecureClient(serverConfig, apiKey)
      
      connection.client = client
      connection.status = 'connected'
      
      // Test connection with health check
      await this.performHealthCheck(connectionId)
      
      this.connections.set(connectionId, connection)
      console.log(`✅ MCP Connected: ${serverName} (${connectionId})`)
      
      return connection
      
    } catch (error) {
      connection.status = 'error'
      this.connections.set(connectionId, connection)
      console.error(`❌ MCP Connection failed: ${serverName}`, error)
      throw error
    }
  }

  private async createSecureClient(serverConfig: MCPServerConfig, apiKey: string): Promise<any> {
    switch (serverConfig.name) {
      case 'anthropic-claude':
        return await this.createAnthropicClient(serverConfig, apiKey)
      case 'openai-gpt4':
        return await this.createOpenAIClient(serverConfig, apiKey)
      case 'google-gemini':
        return await this.createGeminiClient(serverConfig, apiKey)
      case 'midjourney':
        return await this.createMidjourneyClient(serverConfig, apiKey)
      case 'runway-video':
        return await this.createRunwayClient(serverConfig, apiKey)
      case 'suno-audio':
        return await this.createSunoClient(serverConfig, apiKey)
      default:
        throw new Error(`Unsupported MCP server: ${serverConfig.name}`)
    }
  }

  private async createAnthropicClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    
    return new Anthropic({
      apiKey,
      maxRetries: 3,
      timeout: 30000,
      // Add security headers
      baseURL: config.endpoint
    })
  }

  private async createOpenAIClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    const OpenAI = await import('openai')
    
    return new OpenAI.default({
      apiKey,
      maxRetries: 3,
      timeout: 30000,
      baseURL: config.endpoint,
      defaultHeaders: {
        'User-Agent': 'Arcanea-AI/1.0'
      }
    })
  }

  private async createGeminiClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    
    return new GoogleGenerativeAI(apiKey)
  }

  private async createMidjourneyClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    // Return structured client for Midjourney
    return {
      apiKey,
      endpoint: config.endpoint,
      provider: 'midjourney'
    }
  }

  private async createRunwayClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    return {
      apiKey,
      endpoint: config.endpoint,
      provider: 'runway'
    }
  }

  private async createSunoClient(config: MCPServerConfig, apiKey: string): Promise<any> {
    return {
      apiKey,
      endpoint: config.endpoint,
      provider: 'suno'
    }
  }

  private async performHealthCheck(connectionId: string): Promise<MCPHealth> {
    const connection = this.connections.get(connectionId)
    if (!connection) {
      throw new Error(`Connection ${connectionId} not found`)
    }

    const startTime = Date.now()
    
    try {
      // Perform basic health check based on provider
      let isHealthy = false
      
      if (connection.config.name === 'anthropic-claude') {
        // Test Claude API
        const testResponse = await connection.client.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'health' }]
        })
        isHealthy = !!testResponse.content
      } else if (connection.config.name === 'openai-gpt4') {
        // Test OpenAI API
        const testResponse = await connection.client.models.list()
        isHealthy = !!testResponse.data
      } else if (connection.config.name === 'google-gemini') {
        // Test Gemini API
        const model = connection.client.getGenerativeModel({ model: 'gemini-pro' })
        const testResponse = await model.generateContent('health')
        isHealthy = !!testResponse.response
      } else {
        // For other providers, assume healthy if we have a client
        isHealthy = true
      }

      const responseTime = Date.now() - startTime
      
      const health: MCPHealth = {
        server: connection.config.name,
        status: isHealthy ? 'healthy' : 'unhealthy',
        responseTime,
        lastCheck: new Date()
      }

      // Update connection health status
      connection.lastHealthCheck = new Date()
      if (!isHealthy) {
        connection.status = 'error'
        connection.usage.errors += 1
      }

      return health
      
    } catch (error) {
      const responseTime = Date.now() - startTime
      
      return {
        server: connection.config.name,
        status: 'unhealthy',
        responseTime,
        error: error instanceof Error ? error.message : String(error),
        lastCheck: new Date()
      }
    }
  }

  // Public API for secure usage
  async generateText(providerId: string, prompt: string, options?: any): Promise<any> {
    const connection = this.getConnectionForProvider(providerId, 'text-generation')
    if (!connection) {
      throw new Error(`No MCP connection available for ${providerId}`)
    }

    connection.usage.requests += 1
    connection.usage.lastUsed = new Date()

    try {
      let response
      switch (providerId) {
        case 'anthropic':
          response = await connection.client.messages.create({
            model: options?.model || 'claude-3-5-sonnet-20241022',
            max_tokens: options?.maxTokens || 2000,
            temperature: options?.temperature || 0.7,
            messages: [{ role: 'user', content: prompt }]
          })
          return { content: response.content[0].text }
          
        case 'openai':
          response = await connection.client.chat.completions.create({
            model: options?.model || 'gpt-4-turbo-preview',
            max_tokens: options?.maxTokens || 2000,
            temperature: options?.temperature || 0.7,
            messages: [{ role: 'user', content: prompt }]
          })
          return { content: response.choices[0].message.content }
          
        case 'google':
          const model = connection.client.getGenerativeModel({ 
            model: options?.model || 'gemini-pro' 
          })
          response = await model.generateContent(prompt)
          return { content: response.response.text() }
          
        default:
          throw new Error(`Unsupported text provider: ${providerId}`)
      }

      return {
        success: true,
        data: response.content,
        providerId,
        modelId: options?.model || `${providerId}-default`,
        usage: {
          tokens: response.usage?.total_tokens || 0,
          cost: this.calculateCost(providerId, 'text', response.usage)
        }
      }
      
    } catch (error) {
      connection.usage.errors += 1
      throw error
    }
  }

  async generateImage(providerId: string, prompt: string, options?: any): Promise<any> {
    const connection = this.getConnectionForProvider(providerId, 'image-generation')
    if (!connection) {
      throw new Error(`No MCP connection available for ${providerId}`)
    }

    connection.usage.requests += 1
    connection.usage.lastUsed = new Date()

    try {
      let response
      switch (providerId) {
        case 'midjourney':
          response = { data: { url: `https://placeholder.midjourney.api/images/${Date.now()}.jpg` }, usage: { generationTime: 5000 } }
          break
        case 'openai':
          response = await connection.client.images.generate({
            model: options?.model || 'dall-e-3',
            prompt,
            n: options?.n || 1,
            size: options?.size || '1024x1024'
          })
          response = { data: response.data, usage: { generationTime: 3000 } }
          break
        case 'google':
          response = { data: { url: `https://placeholder.gemini.api/images/${Date.now()}.jpg` }, usage: { generationTime: 4000 } }
          break
        default:
          throw new Error(`Unsupported image provider: ${providerId}`)
      }

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: options?.model || `${providerId}-default`,
        usage: {
          cost: this.calculateCost(providerId, 'image', response.usage),
          generationTime: response.usage?.generationTime || 0
        }
      }
    } catch (error) {
      connection.usage.errors += 1
      throw error
    }
  }

  private getConnectionForProvider(providerId: string, capability: string): MCPConnection | null {
    // Find connection that supports the requested capability
    for (const connection of this.connections.values()) {
      if (connection.config.capabilities.includes(capability) && 
          (connection.config.name.includes(providerId) || providerId.includes(connection.config.name.split('-')[0]))) {
        return connection
      }
    }
    return null
  }

  private calculateCost(providerId: string, operation: string, usage?: any): number {
    // Cost calculation logic (tokens per $, per operation, etc.)
    const costs: Record<string, { text: number; image: number; video: number; audio: number }> = {
      'anthropic': { text: 0.003, image: 0, video: 0, audio: 0 },
      'openai': { text: 0.01, image: 0.04, video: 0.15, audio: 0.08 },
      'google': { text: 0.0025, image: 0.02, video: 0.10, audio: 0.05 },
      'midjourney': { text: 0, image: 0.10, video: 0, audio: 0 },
      'runway': { text: 0, image: 0, video: 0.15, audio: 0 },
      'suno': { text: 0, image: 0, video: 0, audio: 0.08 }
    }

    const providerCosts = costs[providerId] || costs['openai']
    const operationCost = (providerCosts as any)[operation] || 0

    if (usage && usage.tokens) {
      return operationCost * (usage.tokens / 1000)
    }

    return operationCost
  }

  async generateVideo(providerId: string, prompt: string, options?: any): Promise<any> {
    const connection = this.getConnectionForProvider(providerId, 'video-generation')
    if (!connection) {
      throw new Error(`No MCP connection available for ${providerId}`)
    }

    connection.usage.requests += 1
    connection.usage.lastUsed = new Date()

    try {
      let response
      switch (providerId) {
        case 'runway':
          response = { data: { url: `https://placeholder.runway.api/videos/${Date.now()}.mp4` }, usage: { generationTime: 60000 } }
          break
        case 'suno':
          response = { data: { url: `https://placeholder.suno.api/videos/${Date.now()}.mp4` }, usage: { generationTime: 45000 } }
          break
        default:
          throw new Error(`Unsupported video provider: ${providerId}`)
      }

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: options?.model || `${providerId}-default`,
        usage: {
          cost: this.calculateCost(providerId, 'video', response.usage),
          generationTime: response.usage?.generationTime || 0
        }
      }
    } catch (error) {
      connection.usage.errors += 1
      throw error
    }
  }

  async generateAudio(providerId: string, prompt: string, options?: any): Promise<any> {
    const connection = this.getConnectionForProvider(providerId, 'audio-generation')
    if (!connection) {
      throw new Error(`No MCP connection available for ${providerId}`)
    }

    connection.usage.requests += 1
    connection.usage.lastUsed = new Date()

    try {
      let response
      switch (providerId) {
        case 'suno':
          response = { data: { url: `https://placeholder.suno.api/audio/${Date.now()}.mp3` }, usage: { generationTime: 30000 } }
          break
        default:
          throw new Error(`Unsupported audio provider: ${providerId}`)
      }

      return {
        success: true,
        data: response.data,
        providerId,
        modelId: options?.model || `${providerId}-default`,
        usage: {
          cost: this.calculateCost(providerId, 'audio', response.usage),
          generationTime: response.usage?.generationTime || 0
        }
      }
    } catch (error) {
      connection.usage.errors += 1
      throw error
    }
  }

  private startHealthMonitoring(): void {
    // Monitor all connections every 30 seconds
    this.healthMonitor = setInterval(async () => {
      await this.performGlobalHealthCheck()
    }, 30000)
  }

  private async performGlobalHealthCheck(): Promise<void> {
    const healthPromises = Array.from(this.connections.keys()).map(connectionId => 
      this.performHealthCheck(connectionId)
    )

    const results = await Promise.allSettled(healthPromises)
    const healthy = results.filter(r => r.status === 'fulfilled' && r.value.status === 'healthy').length
    const unhealthy = results.length - healthy

    if (unhealthy > 0) {
      console.warn(`⚠️ ${unhealthy} MCP connections unhealthy`)
    }
  }

  // Management API
  getConnectedServers(): MCPConnection[] {
    return Array.from(this.connections.values())
  }

  getServerHealth(): MCPHealth[] {
    const healthPromises = Array.from(this.connections.keys()).map(connectionId => 
      this.performHealthCheck(connectionId)
    )

    return Promise.all(healthPromises)
  }

  async disconnectFromServer(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    try {
      connection.status = 'disconnected'
      this.connections.delete(connectionId)
      console.log(`🔌 Disconnected from MCP: ${connection.config.name}`)
      
    } catch (error) {
      console.error(`Error disconnecting from ${connection.config.name}:`, error)
    }
  }

  async shutdown(): Promise<void> {
    if (this.healthMonitor) {
      clearInterval(this.healthMonitor)
      this.healthMonitor = null
    }

    // Disconnect all connections
    const disconnectPromises = Array.from(this.connections.keys()).map(connectionId => 
      this.disconnectFromServer(connectionId)
    )

    await Promise.all(disconnectPromises)
    console.log('🔒 Secure MCP Manager shutdown complete')
  }

  // Analytics and monitoring
  getUsageStatistics(): { provider: string; requests: number; errors: number; errorRate: number }[] {
    return Array.from(this.connections.values()).map(connection => ({
      provider: connection.config.name,
      requests: connection.usage.requests,
      errors: connection.usage.errors,
      errorRate: connection.usage.requests > 0 ? (connection.usage.errors / connection.usage.requests) * 100 : 0
    }))
  }

  getSystemHealth(): { totalConnections: number; healthyConnections: number; uptime: number } {
    const connections = Array.from(this.connections.values())
    const healthyConnections = connections.filter(c => c.status === 'connected').length

    return {
      totalConnections: connections.length,
      healthyConnections,
      uptime: this.initialized ? Date.now() - new Date().setHours(0,0,0,0).getTime() : 0 // ms since midnight
    }
  }
}

export const secureMCPManager = SecureMCPManager.getInstance()