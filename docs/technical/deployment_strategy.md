# Arcanea Platform - Deployment Strategy

## Overview

Arcanea uses a modern, globally distributed deployment architecture optimized for performance, scalability, and developer velocity. This document outlines our complete deployment strategy from development to production.

## Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GLOBAL EDGE NETWORK                      │
│                   (Vercel Edge - 300+ POPs)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌────────┐    ┌────────┐    ┌────────┐
   │  US     │    │  EU     │    │  APAC   │
   │ Region  │    │ Region  │    │ Region  │
   └────┬───┘    └────┬───┘    └────┬───┘
        │             │             │
        └─────────────┼─────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
   ┌─────────┐               ┌──────────┐
   │Supabase │               │   CDN     │
   │Database │               │Cloudflare │
   │+ Storage│               │  Assets   │
   └─────────┘               └──────────┘
```

## 1. Frontend Deployment - Vercel

### Platform Selection: Vercel

**Why Vercel:**
- Built by Next.js creators (first-class framework support)
- 300+ global edge locations
- Automatic HTTPS and DDoS protection
- Preview deployments for every PR
- Edge Runtime for global compute
- Built-in analytics and monitoring
- Zero configuration for Next.js apps

### Project Configuration

**vercel.json:**
```json
{
  "version": 2,
  "buildCommand": "turbo run build",
  "devCommand": "turbo run dev",
  "installCommand": "pnpm install",
  "framework": null,
  "outputDirectory": null,
  "projects": [
    {
      "name": "arcanea-web",
      "buildCommand": "turbo run build --filter=@arcanea/web",
      "outputDirectory": "apps/web/.next"
    },
    {
      "name": "arcanea-academy",
      "buildCommand": "turbo run build --filter=@arcanea/academy",
      "outputDirectory": "apps/academy/.next"
    },
    {
      "name": "arcanea-studio",
      "buildCommand": "turbo run build --filter=@arcanea/studio",
      "outputDirectory": "apps/studio/.next"
    },
    {
      "name": "arcanea-realms",
      "buildCommand": "turbo run build --filter=@arcanea/realms",
      "outputDirectory": "apps/realms/.next"
    },
    {
      "name": "arcanea-nexus",
      "buildCommand": "turbo run build --filter=@arcanea/nexus",
      "outputDirectory": "apps/nexus/.next"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Access-Control-Allow-Credentials",
          "value": "true"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://arcanea.ai"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
        }
      ]
    }
  ],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Domain Configuration

**Production Domains:**
```
arcanea.ai                  → apps/web (marketing)
academy.arcanea.ai          → apps/academy (learning platform)
studio.arcanea.ai           → apps/studio (creation tools)
realms.arcanea.ai           → apps/realms (realm explorer)
nexus.arcanea.ai            → apps/nexus (social network)
api.arcanea.ai              → Supabase Edge Functions
cdn.arcanea.ai              → Cloudflare CDN (assets)
```

**Staging Domains:**
```
staging.arcanea.ai
staging-academy.arcanea.ai
staging-studio.arcanea.ai
...
```

### Environment Variables

**Production (.env.production):**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Database
DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# Authentication
NEXTAUTH_URL=https://arcanea.ai
NEXTAUTH_SECRET=your-production-secret

# AI Providers
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
REPLICATE_API_TOKEN=r8_...
SUNO_API_KEY=...

# Storage
NEXT_PUBLIC_CDN_URL=https://cdn.arcanea.ai

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
SENTRY_DSN=https://...

# Feature Flags
NEXT_PUBLIC_ENABLE_REALMS=true
NEXT_PUBLIC_ENABLE_ECONOMY=true

# Rate Limiting
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Development (.env.local):**
```bash
# Use Supabase local instance
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-development-secret

# AI Providers (use test/dev keys)
ANTHROPIC_API_KEY=sk-ant-dev-...
OPENAI_API_KEY=sk-dev-...

NEXT_PUBLIC_CDN_URL=http://localhost:3000

# Disable analytics in dev
NEXT_PUBLIC_POSTHOG_KEY=
```

### Edge Configuration

**middleware.ts:**
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
  runtime: 'edge',
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Geolocation-based routing
  const country = request.geo?.country || 'US'
  response.headers.set('x-user-country', country)

  // A/B Testing
  const isTestGroup = Math.random() > 0.5
  response.cookies.set('ab-test-group', isTestGroup ? 'A' : 'B')

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')

  return response
}
```

## 2. Backend Deployment - Supabase

### Platform Selection: Supabase

**Why Supabase:**
- Managed PostgreSQL with global replication
- Built-in authentication and authorization
- Real-time subscriptions
- Object storage (S3-compatible)
- Edge Functions (Deno runtime)
- Row-level security
- Database branching (for preview environments)

### Project Structure

```
Supabase Projects:
  - arcanea-production (US West primary)
  - arcanea-staging (US West)
  - arcanea-development (local via Docker)
```

### Database Configuration

**supabase/config.toml:**
```toml
[project]
name = "arcanea"

[database]
pooler_enabled = true
pooler_pool_mode = "transaction"
pooler_default_pool_size = 20
pooler_max_client_conn = 100

[auth]
site_url = "https://arcanea.ai"
additional_redirect_urls = [
  "https://academy.arcanea.ai",
  "https://studio.arcanea.ai"
]
jwt_expiry = 3600
enable_signup = true

[storage]
file_size_limit = 50000000  # 50MB

[[storage.buckets]]
name = "avatars"
public = true
file_size_limit = 5000000  # 5MB
allowed_mime_types = ["image/png", "image/jpeg", "image/webp"]

[[storage.buckets]]
name = "essences"
public = false
file_size_limit = 50000000  # 50MB

[[storage.buckets]]
name = "realms"
public = false
file_size_limit = 100000000  # 100MB
```

### Edge Functions

**supabase/functions/generate-image/index.ts:**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'

serve(async (req) => {
  try {
    const { prompt, userId } = await req.json()

    // Check ARC balance
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Generate image via Replicate
    // Deduct ARC
    // Store in database

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

**Deploy Edge Functions:**
```bash
supabase functions deploy generate-image
supabase functions deploy generate-music
supabase functions deploy guardian-chat
supabase functions deploy process-remix
```

### Database Migrations

**Migration Workflow:**
```bash
# Create new migration
supabase migration new add_remix_tables

# Apply locally
supabase db reset

# Test migrations
pnpm db:test

# Deploy to staging
supabase db push --db-url $STAGING_DATABASE_URL

# Deploy to production (with approval)
supabase db push --db-url $PRODUCTION_DATABASE_URL
```

**Auto-migration in CI/CD:**
```yaml
- name: Run Database Migrations
  run: |
    npx supabase db push --db-url ${{ secrets.DATABASE_URL }}
  if: github.ref == 'refs/heads/main'
```

## 3. CDN & Static Assets - Cloudflare

### Platform Selection: Cloudflare

**Why Cloudflare:**
- 300+ edge locations globally
- Free tier with generous limits
- Image optimization and resizing
- DDoS protection
- Page Rules for caching
- Web Analytics

### Configuration

**Cloudflare Page Rules:**
```
cdn.arcanea.ai/static/*
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 week

cdn.arcanea.ai/avatars/*
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 day
  - Browser Cache TTL: 1 hour

cdn.arcanea.ai/essences/*
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 week
  - Browser Cache TTL: 1 day
```

**Cloudflare Workers (Image Optimization):**
```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Extract image parameters
    const width = url.searchParams.get('w')
    const format = url.searchParams.get('f') || 'webp'

    // Fetch original
    const imageRequest = new Request(url.pathname)
    const image = await fetch(imageRequest)

    // Transform
    const transformedImage = await resizeImage(image, {
      width: parseInt(width),
      format
    })

    return new Response(transformedImage, {
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000',
      }
    })
  }
}
```

## 4. CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/deploy.yml:**
```yaml
name: Deploy Arcanea Platform

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

jobs:
  # =====================================
  # Quality Checks
  # =====================================
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm@8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm turbo run lint

      - name: Type check
        run: pnpm turbo run type-check

      - name: Test
        run: pnpm turbo run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  # =====================================
  # Build
  # =====================================
  build:
    name: Build Applications
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm@8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm turbo run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: |
            apps/*/.next
            packages/*/dist

  # =====================================
  # Database Migration
  # =====================================
  migrate:
    name: Database Migration
    runs-on: ubuntu-latest
    needs: quality
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Supabase CLI
        run: npm install -g supabase

      - name: Run migrations
        run: |
          supabase db push --db-url ${{ secrets.DATABASE_URL }}
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

  # =====================================
  # Deploy Preview (PR)
  # =====================================
  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

      - name: Comment PR with preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Preview deployment ready at: https://preview-${{ github.event.pull_request.number }}.arcanea.ai'
            })

  # =====================================
  # Deploy Staging
  # =====================================
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build, migrate]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.arcanea.ai
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          vercel-args: '--prod'

  # =====================================
  # Deploy Production
  # =====================================
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build, migrate]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://arcanea.ai
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          vercel-args: '--prod'
          alias-domains: |
            arcanea.ai
            www.arcanea.ai
            academy.arcanea.ai
            studio.arcanea.ai
            realms.arcanea.ai
            nexus.arcanea.ai

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: arcanea
          SENTRY_PROJECT: platform
        with:
          environment: production
          version: ${{ github.sha }}

      - name: Notify deployment
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{"text":"✅ Production deployment successful: https://arcanea.ai"}'

  # =====================================
  # Smoke Tests
  # =====================================
  smoke-tests:
    name: Production Smoke Tests
    runs-on: ubuntu-latest
    needs: deploy-production
    steps:
      - uses: actions/checkout@v4

      - name: Run Playwright tests
        run: npx playwright test smoke
        env:
          BASE_URL: https://arcanea.ai

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## 5. Monitoring & Observability

### Application Performance Monitoring

**Vercel Analytics:**
- Web Vitals (LCP, FID, CLS)
- Real User Monitoring
- Edge Function performance

**Sentry Configuration:**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

**Logging - Axiom:**
```typescript
// lib/logger.ts
import { Axiom } from '@axiomhq/js'

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
  orgId: process.env.AXIOM_ORG_ID,
})

export function log(level: string, message: string, metadata?: object) {
  axiom.ingest('arcanea-logs', [{
    level,
    message,
    timestamp: new Date().toISOString(),
    ...metadata,
  }])
}
```

### Database Monitoring

**Supabase Dashboard:**
- Query performance
- Connection pool metrics
- Storage usage
- Real-time subscriptions

**Custom Metrics:**
```sql
-- Monitor slow queries
CREATE OR REPLACE FUNCTION log_slow_queries()
RETURNS trigger AS $$
BEGIN
  IF (EXTRACT(EPOCH FROM (clock_timestamp() - query_start)) > 1) THEN
    INSERT INTO slow_query_log (query, duration, timestamp)
    VALUES (NEW.query, EXTRACT(EPOCH FROM (clock_timestamp() - query_start)), NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## 6. Disaster Recovery

### Backup Strategy

**Database Backups (Supabase):**
- Continuous WAL archiving
- Daily full backups (retained 30 days)
- Point-in-time recovery (7 days)
- Manual backups before major deployments

**Storage Backups:**
- Cross-region replication (Supabase Storage)
- Versioned objects (7-day retention)

**Code & Infrastructure:**
- Git repository (source of truth)
- Vercel deployment history (30 days)
- Infrastructure as Code (committed)

### Recovery Procedures

**Database Recovery:**
```bash
# List available backups
supabase backups list

# Restore from backup
supabase db restore --backup-id <backup-id>

# Point-in-time recovery
supabase db restore --time "2024-01-15 10:30:00"
```

**Application Rollback:**
```bash
# Vercel instant rollback
vercel rollback

# Or redeploy specific commit
vercel --prod --force
```

### RTO/RPO Targets

| Component | RTO | RPO |
|-----------|-----|-----|
| Frontend | < 5 min | 0 (Git) |
| Database | < 1 hour | < 15 min |
| Storage | < 1 hour | < 1 hour |
| Overall System | < 1 hour | < 15 min |

## 7. Security & Compliance

### SSL/TLS
- Automatic HTTPS (Vercel + Cloudflare)
- TLS 1.3 minimum
- HSTS enabled
- Certificate auto-renewal

### Secrets Management
- Vercel Environment Variables (encrypted)
- GitHub Secrets (for CI/CD)
- Never commit secrets to Git

### Security Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### DDoS Protection
- Cloudflare DDoS mitigation
- Vercel Edge rate limiting
- Supabase connection pooling

## 8. Cost Optimization

### Vercel Costs
```
Pro Plan: $20/month
  - Unlimited deployments
  - 100 GB bandwidth
  - Serverless function executions

Estimated monthly: $50-200 (based on traffic)
```

### Supabase Costs
```
Pro Plan: $25/month base
  - 8 GB database
  - 100 GB bandwidth
  - 100 GB storage

Estimated monthly: $100-300 (based on usage)
```

### Cloudflare Costs
```
Free Plan: $0
  - Unlimited requests
  - 100k Workers requests/day

Pro Plan: $20/month (if needed)
```

### Total Infrastructure
```
MVP (1K users): ~$200/month
Growth (10K users): ~$500/month
Scale (100K users): ~$2,000/month
```

## 9. Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Type checks passing
- [ ] Linting passing
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Secrets rotated
- [ ] Backup created
- [ ] Monitoring configured

### Deployment
- [ ] Run database migrations
- [ ] Deploy to staging
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Run smoke tests (production)

### Post-deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify user flows
- [ ] Update documentation
- [ ] Notify team
- [ ] Tag release in Git

## 10. Rollout Strategy

### Feature Flags
```typescript
// lib/features.ts
export const features = {
  realms: process.env.NEXT_PUBLIC_ENABLE_REALMS === 'true',
  economy: process.env.NEXT_PUBLIC_ENABLE_ECONOMY === 'true',
  newGuardianUI: process.env.NEXT_PUBLIC_NEW_GUARDIAN_UI === 'true',
}
```

### Gradual Rollout
1. Deploy to 5% of users
2. Monitor metrics for 24 hours
3. Increase to 25%
4. Monitor for 24 hours
5. Increase to 50%
6. Monitor for 24 hours
7. Full rollout (100%)

### Canary Deployments
```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  const isCanary = req.cookies.get('canary') === 'true'

  if (isCanary) {
    // Route to canary deployment
    return NextResponse.rewrite(new URL('/canary', req.url))
  }

  return NextResponse.next()
}
```

---

This deployment strategy ensures Arcanea can scale globally while maintaining high availability, security, and developer velocity.
