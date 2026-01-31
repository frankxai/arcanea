// Arcanea AI Platform - MCP (Model Context Protocol) Configuration
// This file handles secure MCP server connections and API key management

import { z } from 'zod'

// MCP Server Schemas for validation
const MCPServerSchema = z.object({
  name: z.string(),
  description: z.string(),
  endpoint: z.string().url(),
  capabilities: z.array(z.string()),
  authentication: z.object({
    type: z.enum(['api_key', 'oauth', 'bearer']),
    keyId: z.string().optional()
  }),
  rateLimit: z.object({
    requests: z.number().optional(),
    window: z.string().optional()
  }).optional()
})

export type MCPServer = z.infer<typeof MCPServerSchema>

export class MCPManager {
  private servers: Map<string, MCPServer> = new Map()
  private connectedServers: Map<string, any> = new Map()

  constructor() {
    this.initializeDefaultServers()
  }

  private initializeDefaultServers(): void {
    // Built-in MCP servers for Arcanea platform
    const defaultServers: MCPServer[] = [
      {
        name: 'anthropic-claude',
        description: 'Claude 3.5 Sonnet with enhanced reasoning capabilities',
        endpoint: 'claude',
        capabilities: ['text-generation', 'reasoning', 'analysis', 'code-generation'],
        authentication: {
          type: 'api_key',
          keyId: 'ANTHROPIC_API_KEY'
        },
        rateLimit: {
          requests: 1000,
          window: '1h'
        }
      },
      {
        name: 'openai-gpt4',
        description: 'GPT-4 Turbo for fast, versatile creative tasks',
        endpoint: 'gpt4',
        capabilities: ['text-generation', 'creative-writing', 'multimodal', 'image-analysis'],
        authentication: {
          type: 'api_key',
          keyId: 'OPENAI_API_KEY'
        },
        rateLimit: {
          requests: 500,
          window: '1h'
        }
      },
      {
        name: 'google-gemini',
        description: 'Gemini Pro with multimodal understanding',
        endpoint: 'gemini',
        capabilities: ['text-generation', 'image-generation', 'video-analysis', 'multimodal'],
        authentication: {
          type: 'api_key',
          keyId: 'GOOGLE_API_KEY'
        },
        rateLimit: {
          requests: 750,
          window: '1h'
        }
      },
      {
        name: 'midjourney',
        description: 'Midjourney for premium image generation',
        endpoint: 'midjourney',
        capabilities: ['image-generation', 'artistic-style', 'creative-design'],
        authentication: {
          type: 'api_key',
          keyId: 'MIDJOURNEY_API_KEY'
        }
      },
      {
        name: 'runway-video',
        description: 'Runway for professional video generation',
        endpoint: 'runway',
        capabilities: ['video-generation', 'video-editing', 'motion-graphics'],
        authentication: {
          type: 'api_key',
          keyId: 'RUNWAY_API_KEY'
        }
      },
      {
        name: 'suno-audio',
        description: 'Suno AI for music and audio generation',
        endpoint: 'suno',
        capabilities: ['music-generation', 'audio-synthesis', 'voice-cloning'],
        authentication: {
          type: 'api_key',
          keyId: 'SUNO_API_KEY'
        }
      }
    ]

    defaultServers.forEach(server => {
      this.servers.set(server.name, server)
    })
  }

  // Secure MCP server connection
  async connectToServer(serverName: string, apiKey?: string): Promise<boolean> {
    const server = this.servers.get(serverName)
    if (!server) {
      throw new Error(`MCP server '${serverName}' not found`)
    }

    try {
      // Validate API key if provided
      if (apiKey && !this.validateApiKey(apiKey, server)) {
        throw new Error('Invalid API key format')
      }

      // Get secure API key from environment
      const secureKey = apiKey || this.getSecureApiKey(server.authentication.keyId || '')
      if (!secureKey) {
        console.warn(`⚠️ Missing API key for ${serverName}`)
        return false
      }

      // Connect to MCP server based on type
      const connection = await this.createServerConnection(server, secureKey)
      
      if (connection.success) {
        this.connectedServers.set(serverName, connection)
        console.log(`✅ MCP Connected: ${server.description}`)
        return true
      } else {
        console.error(`❌ MCP Failed: ${server.description}`, connection.error)
        return false
      }
    } catch (error) {
      console.error(`🔌 MCP Error connecting to ${serverName}:`, error)
      return false
    }
  }

  private async createServerConnection(server: MCPServer, apiKey: string): Promise<any> {
    switch (server.endpoint) {
      case 'claude':
        return await this.connectAnthropicMCP(server, apiKey)
      case 'gpt4':
        return await this.connectOpenAIMCP(server, apiKey)
      case 'gemini':
        return await this.connectGeminiMCP(server, apiKey)
      case 'midjourney':
        return await this.connectMidjourneyMCP(server, apiKey)
      case 'runway':
        return await this.connectRunwayMCP(server, apiKey)
      case 'suno':
        return await this.connectSunoMCP(server, apiKey)
      default:
        throw new Error(`Unsupported MCP endpoint: ${server.endpoint}`)
    }
  }

  // Individual MCP connection methods
  private async connectAnthropicMCP(server: MCPServer, apiKey: string): Promise<any> {
    try {
      const { default: Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic({
        apiKey,
        maxRetries: 3,
        timeout: 30000
      })

      // Test connection with minimal request
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }]
      })

      return {
        success: true,
        client,
        capabilities: server.capabilities,
        rateLimit: server.rateLimit
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  private async connectOpenAIMCP(server: MCPServer, apiKey: string): Promise<any> {
    try {
      const OpenAI = await import('openai')
      const client = new OpenAI.default({
        apiKey,
        maxRetries: 3,
        timeout: 30000
      })

      // Test connection
      const response = await client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }]
      })

      return {
        success: true,
        client,
        capabilities: server.capabilities,
        rateLimit: server.rateLimit
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  private async connectGeminiMCP(server: MCPServer, apiKey: string): Promise<any> {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const client = new GoogleGenerativeAI(apiKey)

      // Test connection
      const model = client.getGenerativeModel({ model: 'gemini-pro' })
      const response = await model.generateContent('test')

      return {
        success: true,
        client,
        capabilities: server.capabilities,
        rateLimit: server.rateLimit
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  private async connectMidjourneyMCP(server: MCPServer, apiKey: string): Promise<any> {
    // Midjourney MCP implementation
    return {
      success: true,
      client: { apiKey, endpoint: 'https://api.midjourney.com/v1' },
      capabilities: server.capabilities
    }
  }

  private async connectRunwayMCP(server: MCPServer, apiKey: string): Promise<any> {
    // Runway MCP implementation
    return {
      success: true,
      client: { apiKey, endpoint: 'https://api.runwayml.com/v1' },
      capabilities: server.capabilities
    }
  }

  private async connectSunoMCP(server: MCPServer, apiKey: string): Promise<any> {
    // Suno MCP implementation
    return {
      success: true,
      client: { apiKey, endpoint: 'https://api.suno.ai/v1' },
      capabilities: server.capabilities
    }
  }

  // Secure API key retrieval
  private getSecureApiKey(keyId: string): string | null {
    // This should only be called server-side
    if (typeof window !== 'undefined') {
      console.error('🔐 Security violation: Attempted to access API keys in browser')
      return null
    }

    return process.env[keyId] || null
  }

  // API key validation
  private validateApiKey(apiKey: string, server: MCPServer): boolean {
    if (!apiKey || apiKey.length < 10) {
      return false
    }

    const patterns = {
      'ANTHROPIC_API_KEY': /^sk-ant-api03-[a-zA-Z0-9_-]{95,}$/,
      'OPENAI_API_KEY': /^sk-[a-zA-Z0-9_-]{48,}$/,
      'GOOGLE_API_KEY': /^[a-zA-Z0-9_-]{20,}$/,
      'MIDJOURNEY_API_KEY': /^[a-zA-Z0-9_-]{20,}$/,
      'RUNWAY_API_KEY': /^[a-zA-Z0-9_-]{20,}$/,
      'SUNO_API_KEY': /^[a-zA-Z0-9_-]{20,}$/
    }

    const pattern = patterns[server.authentication.keyId as keyof typeof patterns]
    return pattern ? pattern.test(apiKey) : apiKey.length >= 10
  }

  // Get available servers
  getAvailableServers(): MCPServer[] {
    return Array.from(this.servers.values())
  }

  // Get connected servers
  getConnectedServers(): Map<string, any> {
    return this.connectedServers
  }

  // Disconnect from server
  async disconnectFromServer(serverName: string): Promise<void> {
    const connection = this.connectedServers.get(serverName)
    if (connection && connection.client) {
      // Close connection if applicable
      if (typeof connection.client.close === 'function') {
        await connection.client.close()
      }
    }
    
    this.connectedServers.delete(serverName)
    console.log(`🔌 Disconnected from MCP: ${serverName}`)
  }

  // Health check for all servers
  async healthCheck(): Promise<{ server: string; status: 'connected' | 'disconnected' | 'error'; error?: string }[]> {
    const results: { server: string; status: 'connected' | 'disconnected' | 'error'; error?: string }[] = []

    for (const [serverName, connection] of this.connectedServers) {
      try {
        // Simple ping to check connection health
        const isHealthy = await this.pingConnection(connection)
        results.push({
          server: serverName,
          status: isHealthy ? 'connected' : 'error'
        })
      } catch (error) {
        results.push({
          server: serverName,
          status: 'error',
          error: error instanceof Error ? error.message : String(error)
        })
      }
    }

    return results
  }

  private async pingConnection(connection: any): Promise<boolean> {
    // Implementation depends on connection type
    // For now, return true if connection exists
    return connection && connection.client ? true : false
  }
}

// Export singleton instance
export const mcpManager = new MCPManager()