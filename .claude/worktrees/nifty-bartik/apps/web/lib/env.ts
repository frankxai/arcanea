/**
 * Type-Safe Environment Variables
 *
 * Provides runtime validation and TypeScript types for all environment variables.
 * Uses Zod for schema validation with helpful error messages.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   const apiKey = env.GEMINI_API_KEY; // TypeScript autocomplete ✨
 */

import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // ===========================================
  // DATABASE (Supabase)
  // ===========================================
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
    .refine(
      (url) => url.includes('supabase.co') || url.includes('localhost'),
      'NEXT_PUBLIC_SUPABASE_URL must be a Supabase URL'
    ),

  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(20, 'NEXT_PUBLIC_SUPABASE_ANON_KEY must be at least 20 characters')
    .startsWith('eyJ', 'NEXT_PUBLIC_SUPABASE_ANON_KEY must be a valid JWT'),

  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(20, 'SUPABASE_SERVICE_ROLE_KEY must be at least 20 characters')
    .startsWith('eyJ', 'SUPABASE_SERVICE_ROLE_KEY must be a valid JWT'),

  // ===========================================
  // AI PROVIDERS
  // ===========================================
  GEMINI_API_KEY: z
    .string()
    .min(10, 'GEMINI_API_KEY must be at least 10 characters')
    .describe('Google Gemini API key for AI features'),

  // Optional AI providers
  ANTHROPIC_API_KEY: z
    .string()
    .min(10)
    .startsWith('sk-ant-', 'ANTHROPIC_API_KEY must start with sk-ant-')
    .optional()
    .describe('Anthropic Claude API key'),

  OPENAI_API_KEY: z
    .string()
    .min(10)
    .startsWith('sk-', 'OPENAI_API_KEY must start with sk-')
    .optional()
    .describe('OpenAI API key for GPT models'),

  STABILITY_API_KEY: z
    .string()
    .min(10)
    .optional()
    .describe('Stability AI API key for image generation'),

  // ===========================================
  // AUTHENTICATION (NextAuth.js)
  // ===========================================
  NEXTAUTH_SECRET: z
    .string()
    .min(32, 'NEXTAUTH_SECRET must be at least 32 characters for security')
    .optional()
    .describe('Secret for NextAuth.js JWT signing'),

  NEXTAUTH_URL: z
    .string()
    .url('NEXTAUTH_URL must be a valid URL')
    .optional()
    .describe('Base URL for NextAuth.js callbacks'),

  // ===========================================
  // PAYMENTS (Stripe)
  // ===========================================
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith('pk_', 'Stripe publishable key must start with pk_')
    .optional()
    .describe('Stripe publishable key (safe for client-side)'),

  STRIPE_SECRET_KEY: z
    .string()
    .startsWith('sk_', 'Stripe secret key must start with sk_')
    .optional()
    .describe('Stripe secret key (server-side only)'),

  STRIPE_WEBHOOK_SECRET: z
    .string()
    .startsWith('whsec_', 'Stripe webhook secret must start with whsec_')
    .optional()
    .describe('Stripe webhook signing secret'),

  // ===========================================
  // MONITORING & ANALYTICS
  // ===========================================
  NEXT_PUBLIC_SENTRY_DSN: z
    .string()
    .url('NEXT_PUBLIC_SENTRY_DSN must be a valid URL')
    .optional()
    .describe('Sentry DSN for error tracking'),

  SENTRY_AUTH_TOKEN: z
    .string()
    .optional()
    .describe('Sentry authentication token for source maps'),

  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z
    .string()
    .optional()
    .describe('Vercel Analytics ID (auto-set on Vercel)'),

  // ===========================================
  // SYSTEM CONFIGURATION
  // ===========================================
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development')
    .describe('Node.js environment'),

  VERCEL_ENV: z
    .enum(['production', 'preview', 'development'])
    .optional()
    .describe('Vercel deployment environment'),

  NEXT_TELEMETRY_DISABLED: z
    .enum(['1', '0'])
    .optional()
    .describe('Disable Next.js telemetry'),

  // ===========================================
  // DEVELOPMENT
  // ===========================================
  DEBUG: z
    .string()
    .optional()
    .describe('Debug logging namespaces (e.g., arcanea:*)'),
});

// Parse and validate environment variables
const parseEnv = () => {
  // In production, all required vars must be set
  // In development, we can be more lenient with fallbacks
  const isDevelopment = process.env.NODE_ENV === 'development';

  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });

      // In production, fail hard
      if (!isDevelopment) {
        console.error('\n💀 Cannot start application with invalid environment variables');
        process.exit(1);
      }

      // In development, warn but allow continuation
      console.warn('\n⚠️  Continuing in development mode with invalid env vars');
      console.warn('⚠️  Some features may not work correctly\n');
    }

    throw error;
  }
};

// Export validated environment variables
export const env = parseEnv();

// Export TypeScript type for environment variables
export type Env = z.infer<typeof envSchema>;

// Helper functions for common checks
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
export const isVercelProduction = env.VERCEL_ENV === 'production';
export const isVercelPreview = env.VERCEL_ENV === 'preview';

// Helper to check if optional features are enabled
export const features = {
  hasClaudeAPI: !!env.ANTHROPIC_API_KEY,
  hasOpenAI: !!env.OPENAI_API_KEY,
  hasStabilityAI: !!env.STABILITY_API_KEY,
  hasStripe: !!env.STRIPE_SECRET_KEY,
  hasSentry: !!env.NEXT_PUBLIC_SENTRY_DSN,
  hasAuth: !!env.NEXTAUTH_SECRET,
} as const;

// Log configuration on startup (development only)
if (isDevelopment && typeof window === 'undefined') {
  console.log('🔧 Environment Configuration:');
  console.log(`  - Node Environment: ${env.NODE_ENV}`);
  console.log(`  - Vercel Environment: ${env.VERCEL_ENV || 'N/A'}`);
  console.log('  - Features:');
  console.log(`    - Supabase: ✅`);
  console.log(`    - Gemini AI: ✅`);
  console.log(`    - Claude API: ${features.hasClaudeAPI ? '✅' : '❌'}`);
  console.log(`    - OpenAI: ${features.hasOpenAI ? '✅' : '❌'}`);
  console.log(`    - Stability AI: ${features.hasStabilityAI ? '✅' : '❌'}`);
  console.log(`    - Stripe: ${features.hasStripe ? '✅' : '❌'}`);
  console.log(`    - Sentry: ${features.hasSentry ? '✅' : '❌'}`);
  console.log(`    - Auth: ${features.hasAuth ? '✅' : '❌'}\n`);
}
