/**
 * Database Error Handling Utilities
 *
 * Provides standardized error types and handlers for Supabase operations
 */

/**
 * Custom error class for service layer operations
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ServiceError';

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }
}

/**
 * Database error codes mapped to HTTP status codes and user-friendly messages
 */
const ERROR_CODES: Record<string, { status: number; code: string; message: string }> = {
  // PostgreSQL error codes
  '23505': { status: 409, code: 'DUPLICATE', message: 'Resource already exists' },
  '23503': { status: 400, code: 'FOREIGN_KEY', message: 'Related resource not found' },
  '23502': { status: 400, code: 'NOT_NULL', message: 'Required field is missing' },
  '42501': { status: 403, code: 'FORBIDDEN', message: 'Permission denied' },
  '42P01': { status: 500, code: 'TABLE_NOT_FOUND', message: 'Database configuration error' },

  // PostgREST error codes
  'PGRST116': { status: 404, code: 'NOT_FOUND', message: 'Resource not found' },
  'PGRST301': { status: 400, code: 'INVALID_BODY', message: 'Invalid request body' },
  'PGRST204': { status: 400, code: 'INVALID_RANGE', message: 'Invalid range parameters' },

  // Supabase Auth error codes
  'invalid_grant': { status: 401, code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' },
  'user_not_found': { status: 404, code: 'USER_NOT_FOUND', message: 'User not found' },
  'email_exists': { status: 409, code: 'EMAIL_EXISTS', message: 'Email already registered' },
  'weak_password': { status: 400, code: 'WEAK_PASSWORD', message: 'Password is too weak' },
};

/**
 * Handle Supabase error and convert to ServiceError
 *
 * @param error - Error from Supabase operation
 * @param context - Additional context for debugging
 * @throws {ServiceError} Always throws a ServiceError
 */
export function handleSupabaseError(error: any, context?: string): never {
  // Log error for debugging (server-side only)
  if (typeof window === 'undefined') {
    console.error('[Supabase Error]', {
      context,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
  }

  // Map known error codes
  const errorCode = error.code || error.error_code;
  const knownError = ERROR_CODES[errorCode];

  if (knownError) {
    throw new ServiceError(
      knownError.message,
      knownError.code,
      knownError.status,
      {
        originalError: error.message,
        hint: error.hint,
        context,
      }
    );
  }

  // Handle RLS policy violations
  if (error.message?.includes('policy')) {
    throw new ServiceError(
      'You do not have permission to perform this action',
      'FORBIDDEN',
      403,
      { context, originalError: error.message }
    );
  }

  // Handle network errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    throw new ServiceError(
      'Network error - please check your connection',
      'NETWORK_ERROR',
      503,
      { context, originalError: error.message }
    );
  }

  // Generic error fallback
  throw new ServiceError(
    error.message || 'Database operation failed',
    'DATABASE_ERROR',
    500,
    {
      context,
      originalError: error.message,
      code: errorCode,
    }
  );
}

/**
 * Validate that operation was successful and data exists
 *
 * @param data - Data returned from Supabase operation
 * @param error - Error from Supabase operation
 * @param notFoundMessage - Custom message for not found errors
 * @throws {ServiceError} If error exists or data is null
 */
export function assertSuccess<T>(
  data: T | null,
  error: any,
  notFoundMessage: string = 'Resource not found'
): asserts data is T {
  if (error) {
    handleSupabaseError(error);
  }

  if (data === null || data === undefined) {
    throw new ServiceError(notFoundMessage, 'NOT_FOUND', 404);
  }
}

/**
 * Wrap async operation with error handling
 *
 * @param operation - Async function to execute
 * @param context - Context for error logging
 * @returns Result of operation
 * @throws {ServiceError} If operation fails
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    handleSupabaseError(error, context);
  }
}

/**
 * Type guard to check if error is a ServiceError
 */
export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}
