/**
 * API Utilities
 *
 * Shared utilities for API routes including:
 * - Response formatting
 * - Error handling
 * - Validation helpers
 * - Rate limiting (placeholder)
 */

import { NextResponse } from 'next/server';
import type { ApiResponse, ApiError, ErrorCode } from '@/lib/database/types/api-responses';

/**
 * Create success response
 *
 * @param data - Response data
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with formatted data
 */
export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

/**
 * Create error response
 *
 * @param code - Error code
 * @param message - Error message
 * @param status - HTTP status code (default: 500)
 * @param details - Additional error details (optional)
 * @returns NextResponse with formatted error
 */
export function errorResponse(
  code: ErrorCode,
  message: string,
  status = 500,
  details?: Record<string, unknown> | { errors: unknown[] }
): NextResponse<ApiResponse> {
  const error: ApiError = {
    code,
    message,
    ...(details ? { details: details as Record<string, unknown> } : {}),
  };

  return NextResponse.json(
    {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

/**
 * Handle API errors with appropriate status codes
 *
 * @param error - Error object
 * @returns NextResponse with error
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof Error) {
    // Check for common error patterns
    if (error.message.includes('not found')) {
      return errorResponse('NOT_FOUND', error.message, 404);
    }

    if (error.message.includes('permission') || error.message.includes('unauthorized')) {
      return errorResponse('FORBIDDEN', error.message, 403);
    }

    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      return errorResponse('ALREADY_EXISTS', error.message, 409);
    }

    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return errorResponse('VALIDATION_ERROR', error.message, 400);
    }

    // Generic error
    return errorResponse('INTERNAL_ERROR', error.message, 500);
  }

  // Unknown error type
  return errorResponse('INTERNAL_ERROR', 'An unexpected error occurred', 500);
}

/**
 * Validate required fields in request body
 *
 * @param body - Request body
 * @param fields - Required field names
 * @returns Validation result
 */
export function validateRequiredFields(
  body: Record<string, unknown>,
  fields: string[]
): { valid: boolean; missing?: string[] } {
  const missing = fields.filter((field) => {
    return body[field] === undefined || body[field] === null || body[field] === '';
  });

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  return { valid: true };
}

/**
 * Parse request body safely
 *
 * @param request - Request object
 * @returns Parsed body or null if invalid
 */
export async function parseRequestBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body as Record<string, unknown>;
  } catch (error) {
    return null;
  }
}

/**
 * Extract user ID from authorization header
 *
 * This is a placeholder - in production, you'd verify the JWT token
 * and extract the user ID from it.
 *
 * @param request - Request object
 * @returns User ID or null
 */
export function getUserIdFromAuth(request: Request): string | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  // In production, verify JWT and extract user ID
  // For now, this is a placeholder
  // You would integrate with NextAuth or Supabase Auth here
  return null;
}

/**
 * Check if request method is allowed
 *
 * @param request - Request object
 * @param allowedMethods - Array of allowed HTTP methods
 * @returns True if allowed, false otherwise
 */
export function isMethodAllowed(request: Request, allowedMethods: string[]): boolean {
  return allowedMethods.includes(request.method);
}

/**
 * Create method not allowed response
 *
 * @param allowedMethods - Array of allowed HTTP methods
 * @returns NextResponse with 405 status
 */
export function methodNotAllowedResponse(allowedMethods: string[]): NextResponse<ApiResponse> {
  return errorResponse(
    'INVALID_INPUT',
    `Method not allowed. Allowed methods: ${allowedMethods.join(', ')}`,
    405
  );
}

/**
 * Parse pagination parameters from URL search params
 *
 * Ensures page is at least 1 and pageSize is between 1 and 100.
 *
 * @param searchParams - URL search parameters
 * @returns Validated pagination params
 */
export function parsePaginationParams(
  searchParams: URLSearchParams
): { page: number; pageSize: number; offset: number } {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '20', 10) || 20))
  const offset = (page - 1) * pageSize

  return { page, pageSize, offset }
}

/**
 * Parse boolean query parameter
 *
 * @param value - Query parameter value
 * @param defaultValue - Default value if not provided
 * @returns Boolean value
 */
export function parseBoolean(value: string | null, defaultValue = false): boolean {
  if (value === null) return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Sanitize string input
 *
 * Trims whitespace and optionally limits length.
 * Does NOT remove HTML/special characters - use a dedicated
 * sanitization library for that.
 *
 * @param input - String to sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized string
 */
export function sanitizeString(input: string, maxLength?: number): string {
  if (typeof input !== 'string') {
    return ''
  }

  let sanitized = input.trim()

  if (maxLength && maxLength > 0 && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}
