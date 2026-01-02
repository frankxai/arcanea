/**
 * Supabase Client Configuration
 *
 * Provides Supabase client instances for both server and client-side usage.
 * Uses environment variables for configuration with proper type safety.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database/types/supabase';

// Validate required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

/**
 * Public Supabase Client
 *
 * Use this for client-side operations and user-authenticated requests.
 * Respects Row Level Security (RLS) policies.
 * Safe to use in browser and API routes.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Admin Supabase Client
 *
 * Use this ONLY for server-side operations that require elevated permissions.
 * BYPASSES Row Level Security (RLS) - use with extreme caution!
 * NEVER expose this to the client.
 *
 * @throws {Error} If SUPABASE_SERVICE_ROLE_KEY is not set
 */
export function getSupabaseAdmin() {
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations require service role key.');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Server-side Supabase Client
 *
 * Use this for API routes where you want to respect RLS but make server-side requests.
 * Can be configured with user session for authenticated requests.
 */
export const supabaseServer = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Helper to get user session from request
 *
 * @param request - Next.js Request object
 * @returns User ID if authenticated, null otherwise
 */
export async function getUserFromRequest(request: Request): Promise<string | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return user.id;
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}

/**
 * Type exports for use throughout the application
 */
export type { Database };
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
