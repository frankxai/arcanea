/**
 * Supabase Browser Client
 *
 * Use this ONLY in Client Components (marked with 'use client')
 * Handles auth sessions via browser cookies
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/lib/database/types/supabase';

/**
 * Create Supabase client for client-side usage
 * Automatically handles session refresh and persistence
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Type exports for convenience
 */
export type { Database };
export type SupabaseClient = ReturnType<typeof createClient>;
