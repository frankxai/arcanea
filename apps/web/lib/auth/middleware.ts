import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Authentication Middleware
 * Validates user sessions and attaches user info to requests
 */

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Get authenticated user from request
 * Validates session token and returns user info
 */
export async function getAuthenticatedUser(req: NextRequest) {
  try {
    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    // Extract token
    const token = authHeader.substring(7);

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Verify token and get user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
      role: user.role || 'user',
    };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return null;
  }
}

/**
 * Require authentication middleware
 * Returns 401 if user is not authenticated
 */
export async function requireAuth(req: NextRequest) {
  const user = await getAuthenticatedUser(req);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized - Authentication required',
      },
      { status: 401 }
    );
  }

  return { user };
}

/**
 * Optional authentication middleware
 * Attaches user info if available, but doesn't require it
 */
export async function optionalAuth(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  return { user: user || null };
}

/**
 * Validate user owns resource
 * Used for endpoints that require ownership (edit profile, delete own content)
 */
export function validateOwnership(userId: string, resourceUserId: string) {
  if (userId !== resourceUserId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden - You do not have permission to access this resource',
      },
      { status: 403 }
    );
  }
  return null;
}

/**
 * Extract user ID from query params or request body
 */
export async function extractUserId(req: NextRequest, paramName = 'userId') {
  // Try query params first
  const { searchParams } = new URL(req.url);
  const queryUserId = searchParams.get(paramName);
  if (queryUserId) return queryUserId;

  // Try request body for POST/PATCH/PUT
  if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
    try {
      const body = await req.json();
      return body[paramName] || null;
    } catch {
      return null;
    }
  }

  return null;
}
