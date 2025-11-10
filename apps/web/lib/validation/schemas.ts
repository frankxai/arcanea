import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Zod validation schemas for API endpoints
 */

// Common validation patterns
const uuidSchema = z.string().uuid({ message: 'Invalid UUID format' });
const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

// === Social Feature Schemas ===

/**
 * Like/Unlike validation
 */
export const likeSchema = z.object({
  userId: uuidSchema,
  creationId: uuidSchema,
});

/**
 * Comment creation validation
 */
export const createCommentSchema = z.object({
  userId: uuidSchema,
  creationId: uuidSchema,
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(2000, 'Comment must be less than 2000 characters')
    .trim(),
  parentCommentId: uuidSchema.optional(),
});

/**
 * Comment query validation
 */
export const commentQuerySchema = z.object({
  creationId: uuidSchema,
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

/**
 * Follow/Unfollow validation
 */
export const followSchema = z.object({
  followerId: uuidSchema,
  followingId: uuidSchema,
});

/**
 * Notifications query validation
 */
export const notificationQuerySchema = z.object({
  userId: uuidSchema,
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

/**
 * Mark notifications as read validation
 */
export const markNotificationsReadSchema = z.object({
  userId: uuidSchema,
});

/**
 * Activity feed query validation
 */
export const activityFeedQuerySchema = z.object({
  userId: uuidSchema,
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

// === Helper Functions ===

/**
 * Validate request body against a Zod schema
 */
export async function validateBody<T extends z.ZodType>(
  req: NextRequest,
  schema: T
): Promise<{ success: true; data: z.infer<T> } | { success: false; error: NextResponse }> {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        ),
      };
    }

    return {
      success: false,
      error: NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
        },
        { status: 400 }
      ),
    };
  }
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQuery<T extends z.ZodType>(
  req: NextRequest,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; error: NextResponse } {
  try {
    const { searchParams } = new URL(req.url);
    const params: Record<string, any> = {};

    // Convert search params to object
    searchParams.forEach((value, key) => {
      // Try to parse numbers
      const numValue = Number(value);
      params[key] = isNaN(numValue) ? value : numValue;
    });

    const validated = schema.parse(params);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        ),
      };
    }

    return {
      success: false,
      error: NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
        },
        { status: 400 }
      ),
    };
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .substring(0, 10000); // Limit length
}

/**
 * Sanitize all string fields in an object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key] as string) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }

  return sanitized;
}
