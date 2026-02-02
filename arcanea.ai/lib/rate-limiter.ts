import { z } from 'zod'

// Rate limiting implementation
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiter using in-memory store
 *
 * NOTE: This is a simple implementation. For production, use Redis or similar
 * to ensure rate limiting works across multiple server instances.
 *
 * @param request - Request object
 * @param options - Configuration options
 * @returns Rate limit status
 */
export async function rateLimit(request: Request, options: {
  requests?: number
  window?: number
} = {}) {
  const { requests = 100, window = 60000 } = options // 100 requests per minute by default

  // Get client identifier
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown'

  const now = Date.now()
  const url = new URL(request.url)
  const key = `${ip}:${request.method}:${url.pathname}`

  // Clean up old entries periodically (simple memory management)
  if (rateLimitStore.size > 10000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetTime) {
        rateLimitStore.delete(k)
      }
    }
  }

  const record = rateLimitStore.get(key)

  // Create new record if expired or doesn't exist
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + window })
    return { success: true, remaining: requests - 1 }
  }

  // Check if limit exceeded
  if (record.count >= requests) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime
    }
  }

  // Increment counter
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

/**
 * Perform security audit on incoming request
 *
 * Checks for common attack patterns including SQL injection, XSS,
 * path traversal, and command injection.
 *
 * @param request - Request object to audit
 * @returns Audit result with threat details if unsafe
 */
export async function securityAudit(request: Request): Promise<{
  safe: boolean
  threat?: string
  location?: string
}> {
  try {
    const url = new URL(request.url)

    // Check URL parameters
    for (const [key, value] of url.searchParams) {
      for (const [patternName, pattern] of Object.entries(securityPatterns)) {
        if (pattern.test(value)) {
          console.warn(`Security alert: ${patternName} detected in parameter ${key}`)
          return { safe: false, threat: patternName, location: `parameter:${key}` }
        }
      }
    }

    // Check request body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        const clonedRequest = request.clone()
        const body = await clonedRequest.text()

        for (const [patternName, pattern] of Object.entries(securityPatterns)) {
          if (pattern.test(body)) {
            console.warn(`Security alert: ${patternName} detected in request body`)
            return { safe: false, threat: patternName, location: 'body' }
          }
        }
      } catch (error) {
        // Body already consumed or invalid - skip body check
        console.debug('Could not read request body for security audit')
      }
    }

    // Check headers
    const userAgent = request.headers.get('user-agent') || ''
    if (!userAgent || userAgent.length < 10) {
      console.warn('Security alert: Suspicious user agent')
      return { safe: false, threat: 'suspicious_ua', location: 'header' }
    }

    return { safe: true }
  } catch (error) {
    console.error('Security audit error:', error)
    // Fail open to avoid breaking legitimate requests
    return { safe: true }
  }
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

/**
 * Validate input against Zod schema
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Success with parsed data or failure with error message
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => {
        const path = e.path.length > 0 ? `${e.path.join('.')}: ` : ''
        return `${path}${e.message}`
      })
      return { success: false, error: errorMessages.join(', ') }
    }
    return { success: false, error: 'Validation failed' }
  }
}