// Arcanea AI Platform - Environment Configuration & Security
// This file handles secure API key management and MCP (Model Context Protocol) configuration

export interface EnvConfig {
  // AI Providers
  ANTHROPIC_API_KEY?: string
  OPENAI_API_KEY?: string
  GOOGLE_API_KEY?: string
  MIDJOURNEY_API_KEY?: string
  RUNWAY_API_KEY?: string
  PIKA_API_KEY?: string
  SUNO_API_KEY?: string
  ELEVENLABS_API_KEY?: string
  
  // Authentication
  NEXTAUTH_SECRET?: string
  NEXTAUTH_URL?: string
  DATABASE_URL?: string
  
  // Premium Features
  STRIPE_PUBLISHABLE_KEY?: string
  STRIPE_SECRET_KEY?: string
  SENTRY_DSN?: string
  
  // Development
  NODE_ENV?: string
  DEBUG?: string
}

class SecureEnvManager {
  private static instance: SecureEnvManager
  private config!: EnvConfig
  private initialized = false

  static getInstance(): SecureEnvManager {
    if (!SecureEnvManager.instance) {
      SecureEnvManager.instance = new SecureEnvManager()
    }
    return SecureEnvManager.instance
  }

  private constructor() {
    this.loadSecureConfig()
  }

  private loadSecureConfig(): void {
    // Only load in server-side environment
    if (typeof window !== 'undefined') {
      console.warn('🔐 Environment access blocked in browser')
      return
    }

    this.config = {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      MIDJOURNEY_API_KEY: process.env.MIDJOURNEY_API_KEY,
      RUNWAY_API_KEY: process.env.RUNWAY_API_KEY,
      PIKA_API_KEY: process.env.PIKA_API_KEY,
      SUNO_API_KEY: process.env.SUNO_API_KEY,
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      DATABASE_URL: process.env.DATABASE_URL,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
      NODE_ENV: process.env.NODE_ENV,
      DEBUG: process.env.DEBUG
    }

    this.validateConfig()
    this.initialized = true
  }

  private validateConfig(): void {
    const requiredKeys = ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'GOOGLE_API_KEY']
    const missingKeys = requiredKeys.filter(key => !this.config[key as keyof EnvConfig])

    if (missingKeys.length > 0) {
      console.error('🔐 Missing required API keys:', missingKeys)
      console.error('📝 Please check your .env.local file')
    } else {
      console.log('✅ All required API keys are configured')
    }
  }

  // Secure API key access with validation
  getApiKey(provider: string): string | null {
    if (!this.initialized) {
      console.error('🔐 SecureEnvManager not initialized')
      return null
    }

    const key = this.config[`${provider.toUpperCase()}_API_KEY` as keyof EnvConfig]
    
    if (!key) {
      console.error(`🔐 API key not found for provider: ${provider}`)
      return null
    }

    if (key.length < 10) {
      console.error(`🔐 Invalid API key format for provider: ${provider}`)
      return null
    }

    return key
  }

  // MCP Server Configuration
  getMCPServers(): any[] {
    return [
      {
        name: 'anthropic-claude',
        description: 'Claude 3.5 Sonnet with enhanced reasoning',
        endpoint: 'claude',
        capabilities: ['text', 'reasoning', 'analysis'],
        authentication: {
          type: 'api_key',
          keyId: 'ANTHROPIC_API_KEY'
        }
      },
      {
        name: 'openai-gpt',
        description: 'GPT-4 Turbo for creative tasks',
        endpoint: 'gpt',
        capabilities: ['text', 'image', 'multimodal'],
        authentication: {
          type: 'api_key',
          keyId: 'OPENAI_API_KEY'
        }
      },
      {
        name: 'google-gemini',
        description: 'Gemini Pro for multimodal tasks',
        endpoint: 'gemini',
        capabilities: ['text', 'image', 'multimodal'],
        authentication: {
          type: 'api_key',
          keyId: 'GOOGLE_API_KEY'
        }
      }
    ]
  }

  // Security validation
  validateApiKey(key: string, provider: string): boolean {
    const patterns = {
      anthropic: /^sk-ant-api03-/,
      openai: /^sk-/,
      google: /^[a-zA-Z0-9_-]{20,}$/
    }

    const pattern = patterns[provider as keyof typeof patterns]
    return pattern ? pattern.test(key) : key.length >= 10
  }

  // Development safety checks
  isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development'
  }

  isProduction(): boolean {
    return this.config.NODE_ENV === 'production'
  }
}

export const secureEnv = SecureEnvManager.getInstance()

// Export secure getter functions
export const getEnv = {
  anthropicKey: () => secureEnv.getApiKey('anthropic'),
  openaiKey: () => secureEnv.getApiKey('openai'),
  googleKey: () => secureEnv.getApiKey('google'),
  mcpServers: () => secureEnv.getMCPServers(),
  isDev: () => secureEnv.isDevelopment(),
  isProd: () => secureEnv.isProduction()
}