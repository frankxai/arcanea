/**
 * Supabase Server Client
 *
 * Use this in Server Components, Server Actions, and Route Handlers
 * Properly handles cookies for auth session management
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database/types/supabase';

/**
 * Create Supabase client for server-side usage
 * Respects RLS policies and user sessions via cookies
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Server Component context - cannot set cookies
            // This is expected in initial render, cookies are set via middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Server Component context - cannot remove cookies
          }
        },
      },
    }
  );
}

/**
 * Create Supabase admin client for server-side usage
 *
 * WARNING: This client BYPASSES Row Level Security
 * Only use for admin operations that require elevated permissions
 * NEVER expose this client to the browser
 *
 * @throws {Error} If SUPABASE_SERVICE_ROLE_KEY is not set
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required for admin operations. ' +
      'Please set this environment variable.'
    );
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get() { return undefined; },
        set() { },
        remove() { },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Type exports for convenience
 */
export type { Database };
export type SupabaseClient = ReturnType<typeof createClient>;
export type SupabaseAdminClient = ReturnType<typeof createAdminClient>;
