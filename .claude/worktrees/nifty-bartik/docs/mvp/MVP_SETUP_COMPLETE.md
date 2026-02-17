# Arcanea MVP - Complete Setup Guide

**Version:** 1.0.0
**Last Updated:** October 23, 2025
**Target:** Vercel AI Chatbot Template + Gemini AI + Supabase

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Detailed Setup](#detailed-setup)
5. [Gemini AI Configuration](#gemini-ai-configuration)
6. [Development Workflow](#development-workflow)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Arcanea MVP leverages the **Vercel AI Chatbot template** as its foundation, customized with:

- **Google Gemini 2.0 Flash** for AI conversations
- **Supabase** for PostgreSQL database and auth
- **Next.js 15.3+** with App Router
- **Radix UI + Tailwind CSS** for interface
- **Drizzle ORM** for type-safe database access

**Philosophy:** Build fast, deploy faster. We're using proven templates and focusing on Arcanea-specific features.

---

## Prerequisites

Ensure you have:

- **Node.js** >= 18.0.0 (check: `node --version`)
- **pnpm** >= 8.0.0 (check: `pnpm --version`)
- **Git** configured
- **Google Cloud Account** (for Gemini API)
- **Supabase Account** (free tier works)
- **Vercel Account** (for deployment)

### Install pnpm (if needed)

```bash
npm install -g pnpm
```

---

## Quick Start

Get up and running in 5 minutes:

```bash
# 1. Navigate to project
cd /mnt/c/Users/Frank/Arcanea

# 2. Install dependencies
pnpm install

# 3. Create environment file
cd apps/web
cp ../../.env.example .env.local

# 4. Edit .env.local with your credentials
# (See Environment Variables section below)

# 5. Start development server
pnpm dev
```

App will be at: **http://localhost:3001**

---

## Detailed Setup

### Step 1: Install Dependencies

```bash
cd /mnt/c/Users/Frank/Arcanea
pnpm install
```

This installs:
- Vercel AI SDK (`ai` package)
- Gemini provider (`@ai-sdk/google`)
- React hooks (`@ai-sdk/react`)
- Database tools (Drizzle ORM)
- UI components (Radix UI)
- Auth (NextAuth.js v5)

### Step 2: Get Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click **"Get API Key"**
3. Create new project or select existing
4. Copy API key (starts with `AI...`)
5. Save for `.env.local`

**Free Tier Limits:**
- 15 requests/minute
- 1M tokens/minute
- 1,500 requests/day

### Step 3: Set Up Supabase

Follow the detailed database setup guide:

See: [`SETUP_GUIDE.md`](./SETUP_GUIDE.md) (existing file)

**Quick version:**
1. Create project at [supabase.com](https://supabase.com)
2. Note database password
3. Get connection strings from Settings > Database
4. Copy to `.env.local`

### Step 4: Configure Environment Variables

Create `/apps/web/.env.local`:

```env
# ============================================
# ARCANEA MVP - ENVIRONMENT VARIABLES
# ============================================

# --------------------------------------------
# Application
# --------------------------------------------
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001

# --------------------------------------------
# Google Gemini AI
# --------------------------------------------
GOOGLE_GENERATIVE_AI_API_KEY=AIza...your-key-here

# Model settings (optional, these are defaults)
GEMINI_MODEL=gemini-2.0-flash-001
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.7

# --------------------------------------------
# Supabase Database
# --------------------------------------------
# From: Supabase Dashboard > Settings > Database > Connection String

# Connection Pooler (recommended for serverless)
POSTGRES_URL=postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres

# Direct Connection (for migrations)
POSTGRES_URL_NON_POOLING=postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres

# Prisma format (if needed)
POSTGRES_PRISMA_URL=postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1

# --------------------------------------------
# NextAuth.js v5
# --------------------------------------------
# Generate with: openssl rand -base64 32
AUTH_SECRET=your-secret-here-use-openssl-to-generate

# For production, set to your domain
NEXTAUTH_URL=http://localhost:3001

# --------------------------------------------
# Feature Flags (MVP Phase 1)
# --------------------------------------------
# Enable only chat for MVP
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_WORLD_BUILDING=false
NEXT_PUBLIC_ENABLE_MUSIC_LAB=false
NEXT_PUBLIC_ENABLE_ART_STUDIO=false
NEXT_PUBLIC_ENABLE_CODE_ACADEMY=false

# --------------------------------------------
# Optional: OAuth Providers
# --------------------------------------------
# AUTH_GOOGLE_ID=
# AUTH_GOOGLE_SECRET=
# AUTH_GITHUB_ID=
# AUTH_GITHUB_SECRET=

# --------------------------------------------
# Optional: Rate Limiting (add later)
# --------------------------------------------
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=

# --------------------------------------------
# Optional: File Storage (add when needed)
# --------------------------------------------
# BLOB_READ_WRITE_TOKEN=
```

### Step 5: Generate Auth Secret

```bash
openssl rand -base64 32
```

Copy output to `AUTH_SECRET` in `.env.local`

### Step 6: Initialize Database

```bash
cd /mnt/c/Users/Frank/Arcanea/apps/web

# Push schema to Supabase
pnpm db:push

# Open Drizzle Studio (optional - database GUI)
pnpm db:studio
```

---

## Gemini AI Configuration

### Understanding the Integration

The Vercel AI SDK provides a unified interface for AI providers. We're using Google's Gemini 2.0 Flash model.

### Model Specifications

**Gemini 2.0 Flash:**
- **Context Window:** 1M tokens (huge!)
- **Speed:** Fast responses (<2s typical)
- **Cost:** Free tier available
- **Best For:** Conversational AI, creative tasks
- **Multimodal:** Text, images, audio (future)

### Alternative Models

If you need different capabilities:

- **`gemini-2.5-pro`** - Most powerful, slower, higher cost
- **`gemini-2.5-flash-lite`** - Fastest, cheapest, less capable

Change in `.env.local`:
```env
GEMINI_MODEL=gemini-2.5-pro
```

### Rate Limits & Quotas

**Free Tier:**
- 15 RPM (requests per minute)
- 1M TPM (tokens per minute)
- 1,500 RPD (requests per day)

**Monitoring:**
- Dashboard: https://ai.google.dev/
- Enable billing for production usage
- Set up alerts for quota limits

### Testing Gemini Connection

Create `/apps/web/test-gemini.ts`:

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';

async function testGemini() {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
  });

  const model = google('gemini-2.0-flash-001');

  const { text } = await model.generateText({
    prompt: 'Say hello in a creative way!',
  });

  console.log('Gemini says:', text);
}

testGemini().catch(console.error);
```

Run:
```bash
npx tsx test-gemini.ts
```

---

## Development Workflow

### Start Development Server

```bash
# From monorepo root
pnpm dev:web

# Or from apps/web
cd apps/web && pnpm dev
```

Access at: **http://localhost:3001**

### Available Scripts

**In `/apps/web/`:**
```bash
pnpm dev          # Start dev server (port 3001)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check
pnpm type-check   # TypeScript validation
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
pnpm db:migrate   # Generate migrations
```

**From monorepo root:**
```bash
pnpm dev          # Start all apps
pnpm dev:web      # Start web app only
pnpm build        # Build all apps
pnpm lint         # Lint all packages
pnpm type-check   # Type check all packages
pnpm format       # Format with Prettier
```

### Project Structure

```
/mnt/c/Users/Frank/Arcanea/
├── apps/
│   └── web/                    # Main MVP app
│       ├── app/                # Next.js app directory
│       │   ├── (auth)/        # Auth pages
│       │   ├── (chat)/        # Chat interface
│       │   ├── api/           # API routes
│       │   └── layout.tsx     # Root layout
│       ├── components/         # React components
│       │   ├── ui/            # Radix UI components
│       │   ├── chat/          # Chat components
│       │   └── ...
│       ├── lib/               # Utilities
│       │   ├── ai/            # Gemini client
│       │   ├── db/            # Database schema
│       │   └── auth/          # Auth config
│       ├── public/            # Static assets
│       ├── .env.local         # Local environment
│       └── package.json       # Dependencies
├── packages/
│   └── ui/                    # Shared UI components
├── docs/
│   └── mvp/                   # MVP documentation
└── pnpm-workspace.yaml        # Workspace config
```

### Hot Reload

Next.js automatically reloads when you edit:
- ✅ React components
- ✅ API routes
- ✅ Server actions
- ✅ Styles (Tailwind CSS)
- ❌ Environment variables (requires restart)

### Database Schema Changes

When you modify schema in `/apps/web/lib/db/schema.ts`:

```bash
# Push changes to Supabase
pnpm db:push

# Or generate migration file (recommended for prod)
pnpm db:migrate
```

---

## Deployment

### Deploy to Vercel

**Recommended for MVP - zero config, automatic scaling**

#### Option 1: GitHub Integration (Easiest)

1. Push code to GitHub:
```bash
git add .
git commit -m "MVP setup complete"
git push origin main
```

2. Visit [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Select your repository
5. Framework: **Next.js** (auto-detected)
6. Root Directory: `apps/web`
7. Click **"Deploy"**

#### Option 2: Vercel CLI

```bash
# Install CLI
pnpm add -g vercel

# From apps/web directory
cd /mnt/c/Users/Frank/Arcanea/apps/web

# Link project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Environment Variables in Vercel

**IMPORTANT:** Set these in Vercel Dashboard:

1. Go to Project Settings > Environment Variables
2. Add each variable:

```
GOOGLE_GENERATIVE_AI_API_KEY
POSTGRES_URL
POSTGRES_URL_NON_POOLING
AUTH_SECRET
NEXT_PUBLIC_APP_URL (set to your vercel domain)
```

3. Set for: **Production**, **Preview**, **Development**
4. Click **"Save"**

### Vercel Deployment Settings

**Build Settings:**
- Framework Preset: **Next.js**
- Build Command: `cd ../.. && pnpm build --filter=@arcanea/web`
- Output Directory: `.next` (default)
- Install Command: `pnpm install`
- Root Directory: `apps/web`

**Environment:**
- Node.js Version: **18.x** or **20.x**

### Custom Domain (Optional)

1. In Vercel Dashboard > Settings > Domains
2. Add your domain (e.g., `app.arcanea.ai`)
3. Configure DNS records as shown
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Troubleshooting

### Common Issues

#### 1. `pnpm install` fails

**Error:** `ERR_PNPM_PEER_DEP_ISSUES`

**Solution:**
```bash
# Clear everything
rm -rf node_modules
rm pnpm-lock.yaml
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Reinstall
pnpm install
```

#### 2. Database connection errors

**Error:** `ECONNREFUSED` or `Connection timeout`

**Solutions:**
- ✅ Check Supabase project is active (not paused)
- ✅ Verify connection string is correct
- ✅ Check your IP is allowlisted in Supabase Network settings
- ✅ Try direct connection URL instead of pooler
- ✅ Verify database password is correct

```bash
# Test connection
psql $POSTGRES_URL_NON_POOLING
```

#### 3. Gemini API errors

**Error:** `403 Forbidden` or `429 Too Many Requests`

**Solutions:**

**403 - API Key Invalid:**
- Verify key is correct in `.env.local`
- Check key has Gemini API enabled
- Ensure billing is set up (required even for free tier)

**429 - Rate Limit:**
- You've exceeded free tier limits
- Wait 1 minute and try again
- Upgrade to paid tier
- Implement request queuing/caching

#### 4. NextAuth errors

**Error:** `[auth][error] MissingSecret`

**Solution:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
AUTH_SECRET=<generated-secret>
```

**Error:** `[auth][error] Configuration`

**Solution:**
- Verify `NEXTAUTH_URL` matches your domain
- Check OAuth credentials (if using)
- Ensure `AUTH_SECRET` is set

#### 5. TypeScript errors after install

**Error:** Module not found or type errors

**Solution:**
```bash
# Delete TypeScript cache
rm -rf apps/web/.next
rm -rf apps/web/tsconfig.tsbuildinfo

# Rebuild
cd apps/web
pnpm build
```

#### 6. Port 3001 already in use

**Error:** `EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
next dev -p 3002
```

### Debug Mode

Enable verbose logging:

```env
# Add to .env.local
DEBUG=true
LOG_LEVEL=debug
NODE_ENV=development
```

### Check System Health

```bash
# Node version
node --version

# pnpm version
pnpm --version

# Check dependencies
pnpm list

# TypeScript check
pnpm type-check

# Lint check
pnpm lint

# Database connection
pnpm db:push --dry-run
```

---

## Next Steps After Setup

### For Database Designer

1. Review existing schema in `/apps/web/lib/db/schema.ts`
2. Add tables for 5-department system
3. Create indexes for performance
4. Set up RLS policies in Supabase
5. Generate TypeScript types

**See:** [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

### For Backend Engineer

1. Create API routes in `/apps/web/app/api/`
2. Implement chat server actions
3. Build Gemini integration layer
4. Add error handling and logging
5. Implement rate limiting

**Key Files:**
- `/apps/web/lib/ai/gemini-client.ts`
- `/apps/web/app/api/chat/route.ts`
- `/apps/web/app/actions/chat.ts`

### For Frontend Engineer

1. Set up chat UI components
2. Implement streaming responses
3. Build department selection interface
4. Add loading states and error handling
5. Create responsive layouts

**Key Directories:**
- `/apps/web/components/chat/`
- `/apps/web/app/(chat)/`

### For DevOps Engineer

1. Set up Vercel project
2. Configure environment variables
3. Set up monitoring (Sentry, LogDNA)
4. Configure CI/CD pipeline
5. Set up staging environment

**Resources:**
- [VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md)

### For Everyone

1. **Read MVP Architecture:** [MVP_ARCHITECTURE.md](./MVP_ARCHITECTURE.md)
2. **Join team meetings** to coordinate
3. **Use GitHub Issues** for task tracking
4. **Test your changes** before pushing
5. **Document as you build**

---

## Resources

### Documentation

- **MVP Architecture:** [MVP_ARCHITECTURE.md](./MVP_ARCHITECTURE.md)
- **Database Schema:** [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- **Database Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md) (existing)
- **Quick Reference:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

### External Links

- **Vercel AI SDK:** https://sdk.vercel.ai/docs
- **Gemini API Docs:** https://ai.google.dev/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs
- **Radix UI:** https://www.radix-ui.com/docs

### Getting Help

- **GitHub Issues:** https://github.com/frankxai/arcanea/issues
- **Team Chat:** [Your team communication]
- **Email:** frank@arcanea.ai

---

## Success Checklist

Before considering setup complete:

- [ ] Repository cloned and up to date
- [ ] Dependencies installed (`pnpm install` successful)
- [ ] `.env.local` created with all required variables
- [ ] Gemini API key obtained and tested
- [ ] Supabase project created
- [ ] Database schema pushed (`pnpm db:push`)
- [ ] Development server starts without errors
- [ ] Can access app at http://localhost:3001
- [ ] TypeScript compiles without errors
- [ ] Lint passes (`pnpm lint`)
- [ ] Read MVP architecture document
- [ ] Understand your role in the team
- [ ] Ready to start building!

---

**Setup Complete!** Welcome to the Arcanea MVP team! 🎉

Start building the future of creative AI. Your journey begins now.
