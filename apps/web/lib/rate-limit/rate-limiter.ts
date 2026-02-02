import { NextRequest, NextResponse } from 'next/server';

/**
 * In-Memory Rate Limiter
 * Production apps should use Redis (Upstash) or similar
 * This is a simple implementation for MVP
 */

interface RateLimitConfig {
  /** Number of requests allowed in the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Custom error message */
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Get client identifier from request
 * Uses user ID if authenticated, otherwise IP address
 */
export function getClientIdentifier(req: NextRequest, userId?: string): string {
  if (userId) {
    return `user:${userId}`;
  }

  // Try to get real IP from headers (for proxies/load balancers)
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Check rate limit for a client
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No entry or window expired - create new entry
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Rate limit middleware
 * Returns 429 if rate limit exceeded
 */
export function rateLimit(config: RateLimitConfig) {
  return async (req: NextRequest, userId?: string) => {
    const identifier = getClientIdentifier(req, userId);
    const result = checkRateLimit(identifier, config);

    // Add rate limit headers
    const headers = {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    };

    if (!result.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: config.message || 'Too many requests, please try again later',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers,
        }
      );
    }

    return { allowed: true, headers };
  };
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  /** Standard API rate limit: 100 requests per 15 minutes */
  standard: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Rate limit exceeded. Maximum 100 requests per 15 minutes.',
  },

  /** Strict rate limit for expensive operations: 10 requests per 15 minutes */
  strict: {
    maxRequests: 10,
    windowMs: 15 * 60 * 1000,
    message: 'Rate limit exceeded. Maximum 10 requests per 15 minutes.',
  },

  /** Generous rate limit for read operations: 200 requests per 15 minutes */
  generous: {
    maxRequests: 200,
    windowMs: 15 * 60 * 1000,
    message: 'Rate limit exceeded. Maximum 200 requests per 15 minutes.',
  },

  /** Auth rate limit: 5 attempts per 15 minutes */
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Too many authentication attempts. Please try again later.',
  },
} as const;

/**
 * Apply rate limit to endpoint
 * Usage example:
 *
 * export async function POST(req: NextRequest) {
 *   const rateLimitResult = await applyRateLimit(req, RateLimitPresets.standard);
 *   if (rateLimitResult) return rateLimitResult; // Rate limit exceeded
 *
 *   // Continue with request handling...
 * }
 */
export async function applyRateLimit(
  req: NextRequest,
  config: RateLimitConfig,
  userId?: string
): Promise<NextResponse | null> {
  const limiter = rateLimit(config);
  const result = await limiter(req, userId);

  if ('allowed' in result && result.allowed) {
    return null; // Rate limit not exceeded, continue
  }

  return result as NextResponse; // Rate limit exceeded, return error response
}
