#!/usr/bin/env tsx
/**
 * Environment Variables Validation Script
 *
 * Checks that all required environment variables are set before deployment.
 * Run this before building or deploying to catch configuration issues early.
 *
 * Usage:
 *   npm run check:env
 *   pnpm run check:env
 */

import { z } from 'zod';

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  error: (msg: string) => console.error(`${colors.red}${colors.bold}❌ ${msg}${colors.reset}`),
  success: (msg: string) => console.log(`${colors.green}${colors.bold}✅ ${msg}${colors.reset}`),
  warn: (msg: string) => console.warn(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  section: (msg: string) => console.log(`\n${colors.blue}${colors.bold}${msg}${colors.reset}\n`),
};

// Required environment variables for basic functionality
const REQUIRED_VARS = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    description: 'Supabase project URL',
    example: 'https://your-project.supabase.co',
    docs: 'https://app.supabase.com → Project Settings → API',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    description: 'Supabase anonymous key',
    example: 'eyJhbG...',
    docs: 'https://app.supabase.com → Project Settings → API',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    description: 'Supabase service role key (server-side only)',
    example: 'eyJhbG...',
    docs: 'https://app.supabase.com → Project Settings → API',
  },
  {
    name: 'GEMINI_API_KEY',
    description: 'Google Gemini API key',
    example: 'AIzaSy...',
    docs: 'https://aistudio.google.com/app/apikey',
  },
] as const;

// Optional environment variables for enhanced features
const OPTIONAL_VARS = [
  {
    name: 'ANTHROPIC_API_KEY',
    description: 'Anthropic Claude API key',
    feature: 'Claude AI models',
  },
  {
    name: 'OPENAI_API_KEY',
    description: 'OpenAI API key',
    feature: 'GPT models and DALL-E',
  },
  {
    name: 'STABILITY_API_KEY',
    description: 'Stability AI API key',
    feature: 'Stable Diffusion image generation',
  },
  {
    name: 'NEXTAUTH_SECRET',
    description: 'NextAuth.js JWT secret',
    feature: 'Authentication',
  },
  {
    name: 'STRIPE_SECRET_KEY',
    description: 'Stripe API secret key',
    feature: 'Payment processing',
  },
] as const;

function checkRequired(): boolean {
  log.section('🔍 Checking Required Environment Variables');

  const missing: typeof REQUIRED_VARS = [];
  const found: typeof REQUIRED_VARS = [];

  for (const varInfo of REQUIRED_VARS) {
    const value = process.env[varInfo.name];

    if (!value || value.trim() === '') {
      missing.push(varInfo);
      log.error(`${varInfo.name} - ${varInfo.description}`);
    } else {
      found.push(varInfo);
      // Show partial value for confirmation (hide most of the key)
      const preview = value.length > 20 ? value.substring(0, 10) + '...' + value.substring(value.length - 5) : '****';
      log.success(`${varInfo.name} - ${preview}`);
    }
  }

  if (missing.length > 0) {
    log.section('📝 How to Fix Missing Variables');

    console.log('For local development:');
    console.log(`  1. Copy .env.example to .env.local:`);
    console.log(`     ${colors.cyan}cp apps/web/.env.example apps/web/.env.local${colors.reset}\n`);
    console.log(`  2. Fill in the missing values:\n`);

    for (const varInfo of missing) {
      console.log(`     ${colors.bold}${varInfo.name}${colors.reset}=${varInfo.example}`);
      console.log(`     ${colors.yellow}# ${varInfo.description}${colors.reset}`);
      console.log(`     ${colors.yellow}# Get from: ${varInfo.docs}${colors.reset}\n`);
    }

    console.log('\nFor production deployment on Vercel:');
    console.log(`  1. Add environment variables via CLI:`);
    for (const varInfo of missing) {
      console.log(`     ${colors.cyan}vercel env add ${varInfo.name} production${colors.reset}`);
    }
    console.log(`\n  2. Or use Vercel Dashboard:`);
    console.log(`     ${colors.cyan}https://vercel.com → Project → Settings → Environment Variables${colors.reset}\n`);

    return false;
  }

  log.success(`All ${found.length} required environment variables are set`);
  return true;
}

function checkOptional(): void {
  log.section('🎁 Checking Optional Features');

  const enabled: string[] = [];
  const disabled: string[] = [];

  for (const varInfo of OPTIONAL_VARS) {
    const value = process.env[varInfo.name];

    if (value && value.trim() !== '') {
      enabled.push(varInfo.feature);
      log.success(`${varInfo.feature} - enabled`);
    } else {
      disabled.push(varInfo.feature);
      log.warn(`${varInfo.feature} - disabled (${varInfo.name} not set)`);
    }
  }

  console.log();
  if (enabled.length > 0) {
    log.info(`${enabled.length} optional features enabled`);
  }
  if (disabled.length > 0) {
    log.info(`${disabled.length} optional features disabled`);
  }
}

function checkSecurity(): void {
  log.section('🔒 Security Checks');

  const checks = {
    'No NEXT_PUBLIC_ prefix on secrets': () => {
      const publicSecrets: string[] = [];
      const secretPatterns = ['KEY', 'SECRET', 'TOKEN', 'PASSWORD'];

      for (const [key, value] of Object.entries(process.env)) {
        if (
          key.startsWith('NEXT_PUBLIC_') &&
          secretPatterns.some((pattern) => key.includes(pattern)) &&
          !key.includes('SUPABASE') // Supabase keys are designed to be public
        ) {
          publicSecrets.push(key);
        }
      }

      if (publicSecrets.length > 0) {
        log.error('Found secrets with NEXT_PUBLIC_ prefix:');
        publicSecrets.forEach((key) => {
          console.log(`  - ${key} ${colors.red}(EXPOSED TO CLIENT!)${colors.reset}`);
        });
        return false;
      }

      log.success('No secrets exposed with NEXT_PUBLIC_ prefix');
      return true;
    },

    'NEXTAUTH_SECRET length': () => {
      const secret = process.env.NEXTAUTH_SECRET;
      if (secret && secret.length < 32) {
        log.error('NEXTAUTH_SECRET should be at least 32 characters');
        log.info('Generate a secure secret with: openssl rand -base64 32');
        return false;
      }
      if (secret) {
        log.success('NEXTAUTH_SECRET has sufficient length');
      }
      return true;
    },

    'NODE_ENV is set': () => {
      const nodeEnv = process.env.NODE_ENV;
      if (!nodeEnv) {
        log.warn('NODE_ENV is not set (defaulting to development)');
        return true; // Not critical
      }
      log.success(`NODE_ENV is ${nodeEnv}`);
      return true;
    },
  };

  let allPassed = true;
  for (const [name, check] of Object.entries(checks)) {
    if (!check()) {
      allPassed = false;
    }
  }

  if (!allPassed) {
    log.error('Some security checks failed');
  }
}

function main() {
  console.log(`${colors.bold}${colors.magenta}`);
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   🔐 Arcanea Environment Variables Check                  ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  const requiredOk = checkRequired();
  checkOptional();
  checkSecurity();

  log.section('📊 Summary');

  if (requiredOk) {
    log.success('Environment configuration is valid');
    log.info('You can now run: npm run build');
    process.exit(0);
  } else {
    log.error('Environment configuration is incomplete');
    log.info('Fix the issues above before building or deploying');
    process.exit(1);
  }
}

// Run the checks
main();
