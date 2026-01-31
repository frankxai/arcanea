import { z } from 'zod'

// Rate limiting implementation
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(request: Request, options: {
  requests?: number
  window?: number
} = {}) {
  const { requests = 100, window = 60000 } = options // 100 requests per minute by default
  
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  const now = Date.now()
  const key = `${ip}:${request.method}:${new URL(request.url).pathname}`
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + window })
    return { success: true, remaining: requests - 1 }
  }
  
  if (record.count >= requests) {
    return { 
      success: false, 
      remaining: 0,
      resetTime: record.resetTime
    }
  }
  
  record.count++
  return { success: true, remaining: requests - record.count }
}

// Security audit patterns
const securityPatterns = {
  sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b|union.*select|'.*(OR|AND).*=)/i,
  xss: /(<script|javascript:|on\w+\s*=)/i,
  pathTraversal: /(\.\.[\/\\])/,
  commandInjection: /[;&|`$(){}[\]]/,
  malformedInput: /[^\w\s\-.,@#$%^&*()+=?[\]{}|\\:"'<>]/
}

export async function securityAudit(request: Request) {
  const url = new URL(request.url)
  const body = request.body ? await request.text() : ''
  
  // Check URL parameters
  for (const [key, value] of url.searchParams) {
    for (const [patternName, pattern] of Object.entries(securityPatterns)) {
      if (pattern.test(value)) {
        console.warn(`Security alert: ${patternName} detected in parameter ${key}`)
        return { safe: false, threat: patternName, location: `parameter:${key}` }
      }
    }
  }
  
  // Check request body
  for (const [patternName, pattern] of Object.entries(securityPatterns)) {
    if (pattern.test(body)) {
      console.warn(`Security alert: ${patternName} detected in request body`)
      return { safe: false, threat: patternName, location: 'body' }
    }
  }
  
  // Check headers
  const userAgent = request.headers.get('user-agent') || ''
  if (!userAgent || userAgent.length < 10) {
    console.warn('Security alert: Suspicious user agent')
    return { safe: false, threat: 'suspicious_ua', location: 'header' }
  }
  
  return { safe: true }
}

// Input validation schemas
export const apiSchemas = {
  chatMessage: z.object({
    message: z.string().min(1).max(10000),
    providerId: z.string().optional(),
    guardianId: z.string().optional(),
    options: z.object({
      temperature: z.number().min(0).max(2).optional(),
      maxTokens: z.number().min(1).max(4000).optional(),
    }).optional()
  }),
  
  imageGeneration: z.object({
    prompt: z.string().min(1).max(1000),
    style: z.string().optional(),
    dimensions: z.object({
      width: z.number().min(64).max(2048),
      height: z.number().min(64).max(2048)
    }).optional(),
    quality: z.enum(['standard', 'hd']).optional()
  }),
  
  worldbuilding: z.object({
    title: z.string().min(1).max(200),
    type: z.enum(['character', 'location', 'story', 'realm']),
    description: z.string().min(1).max(2000),
    guardianId: z.string().optional()
  })
}

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      return { success: false, error: errorMessages.join(', ') }
    }
    return { success: false, error: 'Validation failed' }
  }
}