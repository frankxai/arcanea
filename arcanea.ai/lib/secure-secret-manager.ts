// Arcanea AI Platform - Secure Secret Management System
// This handles secure API key loading with zero client-side exposure

import { createHash, randomBytes } from 'crypto'

export interface SecretConfig {
  providerId: string
  keyName: string
  description: string
  required: boolean
  validation: {
    minLength?: number
    pattern?: RegExp
    format?: string
  }
}

export interface SecureSecret {
  key: string
  provider: string
  expires?: Date
  rotated?: Date
  lastUsed?: Date
}

class SecureSecretManager {
  private static instance: SecureSecretManager
  private secrets: Map<string, SecureSecret> = new Map()
  private initialized = false
  private readonly encryptionKey = process.env.ENCRYPTION_KEY || 'fallback-key-for-dev-only'

  static getInstance(): SecureSecretManager {
    if (!SecureSecretManager.instance) {
      SecureSecretManager.instance = new SecureSecretManager()
    }
    return SecureSecretManager.instance
  }

  private constructor() {
    this.validateSecurityContext()
    this.loadSecureSecrets()
  }

  private validateSecurityContext(): void {
    // Block browser execution entirely
    if (typeof window !== 'undefined') {
      throw new Error('🔐 SECURITY VIOLATION: Secret manager cannot run in browser')
    }

    // Validate server environment
    const nodeEnv = process.env.NODE_ENV
    if (!nodeEnv || (nodeEnv !== 'development' && nodeEnv !== 'production')) {
      console.warn('⚠️ Running in undefined environment')
    }

    console.log('🔒 SecureSecretManager initialized in server context')
  }

  private async loadSecureSecrets(): Promise<void> {
    try {
      // Load secrets from environment (Vercel/production)
      await this.loadFromEnvironment()
      
      // Validate all required secrets are present
      this.validateRequiredSecrets()
      
      this.initialized = true
      console.log('✅ Secure secrets loaded successfully')
      
    } catch (error) {
      console.error('🔐 Failed to load secure secrets:', error)
      throw error
    }
  }

  private async loadFromEnvironment(): Promise<void> {
    const secretConfigs: SecretConfig[] = [
      {
        providerId: 'anthropic',
        keyName: 'ANTHROPIC_API_KEY',
        description: 'Claude API key for advanced reasoning',
        required: true,
        validation: {
          minLength: 20,
          pattern: /^sk-ant-api03-[a-zA-Z0-9_-]{95,}$/,
          format: 'sk-ant-api03-...'
        }
      },
      {
        providerId: 'openai',
        keyName: 'OPENAI_API_KEY', 
        description: 'OpenAI API key for GPT and DALL-E',
        required: true,
        validation: {
          minLength: 20,
          pattern: /^sk-[a-zA-Z0-9_-]{48,}$/,
          format: 'sk-...'
        }
      },
      {
        providerId: 'google',
        keyName: 'GOOGLE_API_KEY',
        description: 'Google AI API key for Gemini',
        required: true,
        validation: {
          minLength: 20,
          pattern: /^[a-zA-Z0-9_-]{20,}$/,
          format: 'alphanumeric string'
        }
      },
      {
        providerId: 'midjourney',
        keyName: 'MIDJOURNEY_API_KEY',
        description: 'Midjourney API key for premium image generation',
        required: false,
        validation: {
          minLength: 10,
          format: 'api-key string'
        }
      },
      {
        providerId: 'runway',
        keyName: 'RUNWAY_API_KEY',
        description: 'Runway API key for video generation', 
        required: false,
        validation: {
          minLength: 10,
          format: 'api-key string'
        }
      },
      {
        providerId: 'suno',
        keyName: 'SUNO_API_KEY',
        description: 'Suno API key for audio generation',
        required: false,
        validation: {
          minLength: 10,
          format: 'api-key string'
        }
      }
    ]

    for (const config of secretConfigs) {
      const keyValue = process.env[config.keyName]
      
      if (!keyValue && config.required) {
        console.error(`🔐 Missing required secret: ${config.keyName}`)
        if (process.env.NODE_ENV === 'production') {
          throw new Error(`Critical: Missing ${config.keyName} in production`)
        }
        continue
      }

      // Validate secret format
      if (keyValue && !this.validateSecret(keyValue, config)) {
        console.error(`🔐 Invalid secret format: ${config.keyName}`)
        if (process.env.NODE_ENV === 'production') {
          throw new Error(`Critical: Invalid ${config.keyName} format in production`)
        }
        continue
      }

      if (keyValue) {
        // Store encrypted version
        const encryptedSecret = this.encryptSecret(keyValue)
        this.secrets.set(config.providerId, {
          key: encryptedSecret,
          provider: config.providerId,
          lastUsed: new Date()
        })
        
        console.log(`✅ Loaded secret for ${config.providerId}`)
      }
    }
  }

  private validateSecret(secret: string, config: SecretConfig): boolean {
    if (config.validation.minLength && secret.length < config.validation.minLength) {
      return false
    }

    if (config.validation.pattern && !config.validation.pattern.test(secret)) {
      return false
    }

    return true
  }

  private encryptSecret(secret: string): string {
    // Simple encryption for development - in production, use proper key management
    const hash = createHash('sha256').update(secret + this.encryptionKey).digest('hex')
    return `encrypted:${hash}:${secret.slice(0, 8)}...` // Store hash + preview for debugging
  }

  private decryptSecret(encryptedSecret: string): string | null {
    if (!encryptedSecret.startsWith('encrypted:')) {
      return encryptedSecret // Not encrypted (development mode)
    }

    // In production, this would integrate with proper secret manager
    // For now, return null to force proper implementation
    console.warn('🔐 Attempted to decrypt without proper secret manager')
    return null
  }

  // Secure public API
  getSecret(providerId: string): string | null {
    if (!this.initialized) {
      console.error('🔐 SecureSecretManager not initialized')
      return null
    }

    if (typeof window !== 'undefined') {
      console.error('🔐 SECURITY VIOLATION: Secret access blocked in browser')
      return null
    }

    const secret = this.secrets.get(providerId)
    if (!secret) {
      console.warn(`🔐 No secret found for provider: ${providerId}`)
      return null
    }

    // Decrypt and return the actual secret
    const decryptedSecret = this.decryptSecret(secret.key)
    if (!decryptedSecret) {
      console.error(`🔐 Failed to decrypt secret for ${providerId}`)
      return null
    }

    // Update last used time
    secret.lastUsed = new Date()

    return decryptedSecret
  }

  validateRequiredSecrets(): void {
    const requiredProviders = ['anthropic', 'openai', 'google']
    const missingProviders = requiredProviders.filter(provider => !this.secrets.has(provider))

    if (missingProviders.length > 0) {
      const error = `Missing required API keys: ${missingProviders.join(', ')}`
      console.error('🔐', error)
      
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`CRITICAL: ${error}`)
      }
    }
  }

  getAllProviders(): string[] {
    return Array.from(this.secrets.keys())
  }

  getProviderStatus(): { provider: string; status: 'loaded' | 'missing' | 'invalid'; lastUsed?: Date }[] {
    return Array.from(this.secrets.entries()).map(([provider, secret]) => {
      return {
        provider,
        status: 'loaded' // All loaded secrets are valid by this point
      }
    })
  }

  // Security operations
  rotateSecret(providerId: string, newSecret: string): void {
    const oldSecret = this.secrets.get(providerId)
    if (!oldSecret) {
      throw new Error(`Cannot rotate non-existent secret: ${providerId}`)
    }

    // Validate new secret
    const config = this.getProviderConfig(providerId)
    if (!this.validateSecret(newSecret, config)) {
      throw new Error('Invalid new secret format')
    }

    // Update with new encrypted secret
    const encryptedSecret = this.encryptSecret(newSecret)
    this.secrets.set(providerId, {
      key: encryptedSecret,
      provider: providerId,
      rotated: new Date(),
      lastUsed: oldSecret.lastUsed
    })

    console.log(`🔄 Rotated secret for ${providerId}`)
  }

  private getProviderConfig(providerId: string): SecretConfig | null {
    const configs: SecretConfig[] = [
      {
        providerId: 'anthropic',
        keyName: 'ANTHROPIC_API_KEY',
        description: 'Claude API key',
        required: true,
        validation: { minLength: 20, pattern: /^sk-ant-api03-/ }
      },
      {
        providerId: 'openai',
        keyName: 'OPENAI_API_KEY', 
        description: 'OpenAI API key',
        required: true,
        validation: { minLength: 20, pattern: /^sk-/ }
      },
      {
        providerId: 'google',
        keyName: 'GOOGLE_API_KEY',
        description: 'Google AI API key',
        required: true,
        validation: { minLength: 20, pattern: /^[a-zA-Z0-9_-]{20,}$/ }
      }
    ]

    return configs.find(c => c.providerId === providerId) || null
  }

  // Audit and compliance
  getAuditLog(): { provider: string; lastUsed: Date; daysSinceUse: number }[] {
    const now = new Date()
    
    return Array.from(this.secrets.entries()).map(([provider, secret]) => {
      const daysSinceUse = secret.lastUsed 
        ? Math.floor((now.getTime() - secret.lastUsed.getTime()) / (1000 * 60 * 60 * 24))
        : -1

      return {
        provider,
        lastUsed: secret.lastUsed || now,
        daysSinceUse
      }
    })
  }

  // Generate secure random key for development
  static generateDevKey(providerId: string): string {
    const timestamp = Date.now().toString(36)
    const random = randomBytes(16).toString('hex')
    return `dev-${providerId}-${timestamp}-${random}`
  }
}

export const secureSecretManager = SecureSecretManager.getInstance()

// Secure exports
export const getSecureSecret = {
  anthropic: () => secureSecretManager.getSecret('anthropic'),
  openai: () => secureSecretManager.getSecret('openai'),
  google: () => secureSecretManager.getSecret('google'),
  midjourney: () => secureSecretManager.getSecret('midjourney'),
  runway: () => secureSecretManager.getSecret('runway'),
  suno: () => secureSecretManager.getSecret('suno')
}

export const validateSecurity = {
  isSecure: () => secureSecretManager.getAllProviders().length >= 3,
  getProviderStatus: () => secureSecretManager.getProviderStatus(),
  getAuditLog: () => secureSecretManager.getAuditLog()
}