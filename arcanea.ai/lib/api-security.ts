import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limiter'

// Security middleware for API routes
export async function securityMiddleware(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(request)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // Security audit
  const auditResult = await performSecurityAudit(request)
  if (auditResult && 'safe' in auditResult && !auditResult.safe) {
    return NextResponse.json(
      { error: 'Security check failed' },
      { status: 403 }
    )
  }

  return null // Continue to actual handler
}

async function performSecurityAudit(request: Request) {
  const url = new URL(request.url)
  
  // Basic security checks
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /union.*select/i,
    /\.\.[\/\\]/
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url.search) || pattern.test(url.pathname)) {
      return { safe: false, threat: 'suspicious_pattern' }
    }
  }
  
  // Authentication check for protected routes
  // Note: Full authentication implementation pending (NextAuth.js or Supabase Auth integration)
  // Currently blocking all /api/protected routes until auth is implemented
  if (url.pathname.startsWith('/api/protected')) {
    return { safe: false, threat: 'authentication_required' }
  }

  return { safe: true }
}

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://arcanea.ai', 'https://www.arcanea.ai']
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}

// Extended request interface with start time
interface TimedNextRequest extends NextRequest {
  _startTime?: number
}

// Request logging
export function logRequest(request: NextRequest, response?: NextResponse) {
  const timedRequest = request as TimedNextRequest
  const duration = timedRequest._startTime ? Date.now() - timedRequest._startTime : 0

  const log = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    status: response?.status,
    duration
  }

  console.log(`[API] ${log.method} ${log.url} - ${log.status} (${log.duration}ms)`)

  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Integration with monitoring service (placeholder for future implementation)
  }
}