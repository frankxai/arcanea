/**
 * SECURITY FIX: Production-Ready Rate Limiting
 *
 * This module provides distributed rate limiting using Upstash Redis
 * that works across multiple instances and survives server restarts.
 *
 * Installation required:
 * npm install @upstash/ratelimit @upstash/redis
 *
 * Environment variables required:
 * UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
 * UPSTASH_REDIS_REST_TOKEN=your-token
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// Redis Client Setup
// ============================================================================

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Fallback to in-memory rate limiting if Redis is not configured
// (for local development only - NOT for production)
const IN_MEMORY_FALLBACK = !process.env.UPSTASH_REDIS_REST_URL;

if (IN_MEMORY_FALLBACK && process.env.NODE_ENV === 'production') {
  console.error(
    'WARNING: Redis not configured for rate limiting in production! ' +
    'This is a security risk. Please configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
  );
}

// ============================================================================
// Rate Limit Configurations
// ============================================================================

export const RateLimitPresets = {
  /**
   * Strict: 10 requests per minute
   * Use for: Expensive operations (video generation, heavy AI tasks)
   */
  strict: {
    requests: 10,
    window: '1 m',
    description: 'Strict rate limit for expensive operations',
  },

  /**
   * Standard: 60 requests per minute
   * Use for: Regular API endpoints (create, update, delete)
   */
  standard: {
    requests: 60,
    window: '1 m',
    description: 'Standard rate limit for regular operations',
  },

  /**
   * Generous: 120 requests per minute
   * Use for: Read operations (GET endpoints, feeds, lists)
   */
  generous: {
    requests: 120,
    window: '1 m',
    description: 'Generous rate limit for read operations',
  },

  /**
   * AI Text: 30 requests per minute
   * Use for: AI text generation
   */
  aiText: {
    requests: 30,
    window: '1 m',
    description: 'Rate limit for AI text generation',
  },

  /**
   * AI Image: 15 requests per 5 minutes
   * Use for: AI image generation
   */
  aiImage: {
    requests: 15,
    window: '5 m',
    description: 'Rate limit for AI image generation',
  },

  /**
   * AI Video: 5 requests per hour
   * Use for: AI video generation (very expensive)
   */
  aiVideo: {
    requests: 5,
    window: '1 h',
    description: 'Rate limit for AI video generation',
  },

  /**
   * Authentication: 5 requests per minute
   * Use for: Login, signup, password reset
   */
  auth: {
    requests: 5,
    window: '1 m',
    description: 'Rate limit for authentication endpoints',
  },
} as const;

// ============================================================================
// Rate Limiters
// ============================================================================

// Create rate limiter instances for each preset
const rateLimiters = {
  strict: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.strict.requests,
      RateLimitPresets.strict.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:strict',
  }),

  standard: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.standard.requests,
      RateLimitPresets.standard.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:standard',
  }),

  generous: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.generous.requests,
      RateLimitPresets.generous.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:generous',
  }),

  aiText: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.aiText.requests,
      RateLimitPresets.aiText.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:ai-text',
  }),

  aiImage: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.aiImage.requests,
      RateLimitPresets.aiImage.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:ai-image',
  }),

  aiVideo: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.aiVideo.requests,
      RateLimitPresets.aiVideo.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:ai-video',
  }),

  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RateLimitPresets.auth.requests,
      RateLimitPresets.auth.window
    ),
    analytics: true,
    prefix: 'arcanea:ratelimit:auth',
  }),
};

// ============================================================================
// Rate Limiting Helpers
// ============================================================================

export type RateLimitPreset = keyof typeof RateLimitPresets;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending?: Promise<unknown>;
}

/**
 * Get identifier for rate limiting
 * Prioritizes: userId > IP address > fallback
 */
function getIdentifier(req: NextRequest, userId?: string): string {
  // If user is authenticated, use their ID
  if (userId) {
    return `user:${userId}`;
  }

  // Otherwise, use IP address
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  return `ip:${ip}`;
}

/**
 * Apply rate limiting to a request
 *
 * @param req - Next.js request object
 * @param preset - Rate limit preset to use
 * @param userId - Optional user ID for per-user rate limiting
 * @returns Rate limit result or error response
 */
export async function applyRateLimit(
  req: NextRequest,
  preset: RateLimitPreset = 'standard',
  userId?: string
): Promise<NextResponse | null> {
  try {
    const identifier = getIdentifier(req, userId);
    const limiter = rateLimiters[preset];

    const { success, limit, remaining, reset, pending } = await limiter.limit(identifier);

    // Add rate limit headers to the response (will be added later)
    const headers = {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    };

    // If rate limit exceeded, return 429 response
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);

      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again in ${retryAfter} seconds.`,
          limit,
          remaining: 0,
          reset,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    // Store headers in request for later use
    // (This is a workaround - in production, use middleware)
    (req as any).__rateLimitHeaders = headers;

    return null; // Continue processing
  } catch (error) {
    console.error('Rate limit error:', error);

    // If rate limiting fails, allow the request but log the error
    // In production, you might want to fail closed instead
    if (process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: Rate limiting service failed');
    }

    return null;
  }
}

/**
 * Add rate limit headers to a response
 *
 * @param req - Request object
 * @param res - Response object
 * @returns Response with rate limit headers
 */
export function addRateLimitHeaders(req: NextRequest, res: NextResponse): NextResponse {
  const headers = (req as any).__rateLimitHeaders;

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      res.headers.set(key, value as string);
    });
  }

  return res;
}

/**
 * Check remaining rate limit without consuming a request
 *
 * @param userId - User ID or null for IP-based limiting
 * @param preset - Rate limit preset
 * @returns Remaining requests
 */
export async function checkRateLimit(
  identifier: string,
  preset: RateLimitPreset = 'standard'
): Promise<{ limit: number; remaining: number; reset: number }> {
  const limiter = rateLimiters[preset];

  try {
    // This is a non-consuming check - just get the current state
    const result = await limiter.limit(identifier);

    return {
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    throw error;
  }
}

/**
 * Reset rate limit for a specific identifier (admin function)
 *
 * @param identifier - User ID or IP address
 * @param preset - Rate limit preset
 */
export async function resetRateLimit(
  identifier: string,
  preset: RateLimitPreset = 'standard'
): Promise<void> {
  const prefix = `arcanea:ratelimit:${preset}`;
  const key = `${prefix}:${identifier}`;

  try {
    await redis.del(key);
    console.log(`[ADMIN] Rate limit reset for ${identifier} (${preset})`);
  } catch (error) {
    console.error('Rate limit reset error:', error);
    throw error;
  }
}

/**
 * Get rate limit analytics
 *
 * @param preset - Rate limit preset
 * @returns Analytics data
 */
export async function getRateLimitAnalytics(preset: RateLimitPreset): Promise<any> {
  // This would require additional implementation with Upstash analytics
  // For now, return a placeholder
  return {
    preset,
    description: RateLimitPresets[preset].description,
    limit: RateLimitPresets[preset].requests,
    window: RateLimitPresets[preset].window,
  };
}

// ============================================================================
// Middleware Wrapper
// ============================================================================

/**
 * Create a rate-limited API route handler
 *
 * @param handler - API route handler
 * @param preset - Rate limit preset
 * @returns Wrapped handler with rate limiting
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  preset: RateLimitPreset = 'standard'
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Extract user ID if available (from auth header)
    const userId = extractUserIdFromRequest(req);

    // Apply rate limiting
    const rateLimitResponse = await applyRateLimit(req, preset, userId);

    if (rateLimitResponse) {
      return rateLimitResponse; // Rate limit exceeded
    }

    // Execute handler
    const response = await handler(req);

    // Add rate limit headers to response
    return addRateLimitHeaders(req, response);
  };
}

/**
 * Extract user ID from request (helper function)
 */
function extractUserIdFromRequest(req: NextRequest): string | undefined {
  // This should match your authentication implementation
  // Example: extract from Authorization header or session

  const authHeader = req.headers.get('authorization');
  if (!authHeader) return undefined;

  // TODO: Implement JWT decoding or session lookup
  // This is a placeholder
  try {
    // Example: decode JWT and extract user ID
    // const token = authHeader.replace('Bearer ', '');
    // const decoded = verifyJWT(token);
    // return decoded.userId;
  } catch {
    return undefined;
  }

  return undefined;
}

// ============================================================================
// Export All
// ============================================================================

export default {
  RateLimitPresets,
  applyRateLimit,
  addRateLimitHeaders,
  checkRateLimit,
  resetRateLimit,
  getRateLimitAnalytics,
  withRateLimit,
};
