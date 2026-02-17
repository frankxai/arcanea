# Arcanea MVP - Deployment Guide

Complete step-by-step guide for deploying Arcanea MVP to production with Vercel and Supabase.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [CI/CD Configuration](#cicd-configuration)
7. [Domain Configuration](#domain-configuration)
8. [Monitoring Setup](#monitoring-setup)
9. [Troubleshooting](#troubleshooting)
10. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account with access to the Arcanea repository
- [ ] Vercel account (Pro plan recommended for team features)
- [ ] Supabase account
- [ ] Node.js 18+ and pnpm 8+ installed locally
- [ ] All required API keys (see [Environment Configuration](#environment-configuration))

### Required Accounts & API Keys

| Service | Purpose | Cost | Setup Link |
|---------|---------|------|------------|
| **Vercel** | Hosting & CI/CD | $20/mo (Pro) | [vercel.com](https://vercel.com) |
| **Supabase** | Database & Auth | $25/mo (Pro) | [supabase.com](https://supabase.com) |
| **Google AI Studio** | Gemini API | Free + Pay-as-you-go | [makersuite.google.com](https://makersuite.google.com/app/apikey) |
| **Anthropic** | Claude API | Pay-as-you-go | [console.anthropic.com](https://console.anthropic.com) |
| **OpenRouter** | Multi-model routing | Pay-as-you-go | [openrouter.ai](https://openrouter.ai/keys) |

**Estimated Monthly Cost:** $245-395 for MVP with moderate usage

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Verify Setup

```bash
# Check Node version (should be 18+)
node --version

# Check pnpm version (should be 8+)
pnpm --version

# Verify all workspaces are detected
pnpm list --depth 0
```

---

## Environment Configuration

### 1. Create Local Environment File

Copy the example environment file:

```bash
cp .env.mvp.example .env.local
```

### 2. Configure Required Variables

Open `.env.local` and fill in all required values. See detailed descriptions in `.env.mvp.example`.

**Critical Variables (Must Configure):**

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Supabase (from https://app.supabase.com/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI APIs
GEMINI_API_KEY=AIzaSy...
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENROUTER_API_KEY=sk-or-v1-...
```

### 3. Generate Secrets

Generate secure secrets for production:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate additional secrets if needed
openssl rand -hex 32
```

### 4. Test Local Development

```bash
pnpm dev:web
```

Visit `http://localhost:3001` to verify the app runs locally.

---

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose organization: `arcanea`
4. Project name: `arcanea-mvp`
5. Database password: Generate a strong password (save it!)
6. Region: Choose closest to your users (e.g., `us-east-1`)
7. Pricing plan: Select **Pro** ($25/mo) for production features

### 2. Configure Database

```bash
# Navigate to database package
cd packages/database

# Generate Prisma client
pnpm prisma generate

# Push schema to Supabase
pnpm prisma db push

# Seed initial data (optional)
pnpm prisma db seed
```

### 3. Setup Row Level Security (RLS)

In Supabase Dashboard > SQL Editor, run:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Add more policies as needed
```

### 4. Configure Storage Buckets

1. Go to Storage > Buckets
2. Create buckets:
   - `avatars` (public)
   - `creations` (public)
   - `private-files` (private)

3. Set up storage policies in SQL Editor:

```sql
-- Allow authenticated users to upload avatars
CREATE POLICY "Avatar upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 5. Setup Authentication

1. Go to Authentication > Providers
2. Enable providers:
   - Email (with email confirmation)
   - Google OAuth (optional)
   - GitHub OAuth (optional)

3. Configure email templates in Authentication > Email Templates

---

## Vercel Deployment

### 1. Connect to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git Repository > GitHub > `frankxai/arcanea`
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web` (or leave empty to use vercel.json)
   - **Build Command:** `pnpm turbo run build --filter=@arcanea/web`
   - **Output Directory:** `apps/web/.next`
   - **Install Command:** `pnpm install --frozen-lockfile`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
pnpm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 2. Configure Environment Variables in Vercel

1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.mvp.example`
3. Set appropriate scopes:
   - **Production:** Live environment variables
   - **Preview:** Testing/staging variables
   - **Development:** Local development (optional)

**Important:** Use Vercel's environment variable encryption for sensitive keys.

### 3. Configure Build Settings

In Vercel Project Settings > General:

- **Build Command:** `pnpm turbo run build --filter=@arcanea/web`
- **Output Directory:** `apps/web/.next`
- **Install Command:** `pnpm install --frozen-lockfile`
- **Node.js Version:** 18.x
- **Framework:** Next.js

### 4. Setup Turbo Remote Cache

1. Go to Vercel Project Settings > General
2. Enable "Remote Caching" under "Build & Development Settings"
3. Copy the Turbo token and add to GitHub secrets:
   - `TURBO_TOKEN`
   - `TURBO_TEAM`

### 5. Configure Deployment Protection

In Project Settings > Deployment Protection:

- Enable "Vercel Authentication" for preview deployments
- Add allowed email domains or team members
- Enable "Password Protection" for additional security

---

## CI/CD Configuration

### 1. Add GitHub Secrets

Go to GitHub repository > Settings > Secrets and variables > Actions

Add the following secrets:

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>
TURBO_TOKEN=<your-turbo-token>
TURBO_TEAM=<your-team-id>

# Environment variables for build
NEXT_PUBLIC_APP_URL=https://arcanea.ai
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

**To get Vercel credentials:**

```bash
# Get Vercel token
vercel whoami

# Get org and project IDs (from .vercel/project.json after linking)
cat .vercel/project.json
```

### 2. Workflow Files

The CI/CD pipeline is configured in `.github/workflows/mvp-deploy.yml` and includes:

- **Security audit:** Checks dependencies for vulnerabilities
- **Linting:** ESLint and Prettier checks
- **Type checking:** TypeScript validation
- **Build:** Compiles the application
- **Preview deployments:** Automatic for PRs
- **Production deployments:** Automatic on main branch pushes
- **Health checks:** Post-deployment verification
- **Rollback:** Automatic on failure detection

### 3. Deployment Flow

**For Pull Requests:**
```
PR Created → Security Check → Quality Check → Build → Deploy Preview → Comment PR with URL
```

**For Main Branch:**
```
Push to main → All checks → Build → Deploy Production → Health Check → Success/Rollback
```

### 4. Manual Deployment

Trigger manual deployment from GitHub Actions:

1. Go to Actions tab
2. Select "Arcanea MVP - CI/CD Pipeline"
3. Click "Run workflow"
4. Choose environment (preview/production)

---

## Domain Configuration

### 1. Add Custom Domain to Vercel

1. Go to Vercel Project > Settings > Domains
2. Add domain: `arcanea.ai`
3. Add subdomain: `www.arcanea.ai`

### 2. Configure DNS Records

Add these DNS records in your domain registrar (e.g., Cloudflare, Namecheap):

```
Type    Name    Value                   TTL
----    ----    -----                   ---
CNAME   www     cname.vercel-dns.com    Auto
CNAME   @       cname.vercel-dns.com    Auto
```

Or use A records if required:

```
Type    Name    Value            TTL
----    ----    -----            ---
A       @       76.76.21.21      Auto
AAAA    @       2606:4700:...    Auto
```

### 3. Enable SSL

Vercel automatically provisions SSL certificates. Verify:

1. Wait 24-48 hours for DNS propagation
2. Check domain status in Vercel dashboard
3. Ensure "SSL Certificate" shows "Active"

### 4. Configure Redirects

Add to `vercel.json` if needed:

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## Monitoring Setup

### 1. Vercel Analytics

Automatically enabled with Vercel deployment.

**To view:**
1. Go to Vercel Project > Analytics
2. Monitor:
   - Page views
   - Top pages
   - Referrers
   - Devices & browsers

### 2. Vercel Speed Insights

Enable in Project Settings > Speed Insights

```tsx
// Add to app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 3. Error Tracking (Optional - Sentry)

1. Create Sentry account at [sentry.io](https://sentry.io)
2. Create new project for Next.js
3. Add environment variables:

```env
SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=arcanea
SENTRY_PROJECT=web
```

4. Configure in `next.config.js`:

```js
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourceMaps: true }
);
```

### 4. Supabase Monitoring

Monitor database in Supabase Dashboard:

- Database > Disk Usage
- Database > Database Health
- API > Logs
- Storage > Usage

Set up alerts for:
- High CPU usage (>80%)
- Low disk space (<20%)
- High API error rate (>5%)

### 5. Cost Monitoring

**Vercel:**
- Dashboard > Usage
- Monitor bandwidth, build minutes, serverless executions

**Supabase:**
- Project Settings > Billing
- Monitor database size, bandwidth, API requests

**AI APIs:**
- Google AI Studio: API Console > Quotas
- Anthropic: Console > Usage
- OpenRouter: Dashboard > Usage

Set up billing alerts at:
- Warning: 80% of budget
- Critical: 100% of budget

---

## Troubleshooting

### Common Issues

#### 1. Build Fails with "Module not found"

**Cause:** Missing dependency or incorrect import path

**Solution:**
```bash
# Clear caches and reinstall
pnpm clean
rm -rf node_modules
pnpm install

# Verify imports
pnpm turbo run type-check
```

#### 2. Environment Variables Not Loading

**Cause:** Variables not set in Vercel or incorrect naming

**Solution:**
1. Check Vercel dashboard > Environment Variables
2. Ensure variables match exact names in code
3. Redeploy after adding variables

```bash
vercel env pull .env.local
```

#### 3. Database Connection Fails

**Cause:** Incorrect connection string or Supabase project paused

**Solution:**
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check Supabase project is active
3. Verify RLS policies aren't blocking access

```bash
# Test connection
pnpm prisma db pull
```

#### 4. API Routes Return 500 Error

**Cause:** Missing API keys or incorrect configuration

**Solution:**
1. Check Vercel deployment logs
2. Verify all required API keys are set
3. Check API key validity at provider dashboard

#### 5. Deployment Stuck at "Building"

**Cause:** Turbo cache issue or dependency problem

**Solution:**
```bash
# Clear Turbo cache
vercel env rm TURBO_TOKEN
vercel env rm TURBO_TEAM

# Redeploy without cache
vercel --force
```

#### 6. Preview Deployment Not Creating

**Cause:** GitHub workflow permissions or missing secrets

**Solution:**
1. Check GitHub Actions logs
2. Verify all secrets are set
3. Check repository permissions in GitHub

### Debug Commands

```bash
# Check build locally
pnpm turbo run build --filter=@arcanea/web --summarize

# View detailed logs
pnpm turbo run build --filter=@arcanea/web --verbose

# Test production build locally
pnpm build && pnpm start

# Check environment variables
vercel env ls

# View deployment logs
vercel logs <deployment-url>
```

### Getting Help

1. **Vercel Logs:** Check deployment logs in Vercel dashboard
2. **GitHub Issues:** Search existing issues or create new one
3. **Vercel Support:** support@vercel.com (Pro plan)
4. **Supabase Support:** Discord or support ticket
5. **Documentation:** Check official docs for each service

---

## Rollback Procedures

### Automatic Rollback

The CI/CD pipeline automatically rolls back on health check failure. Monitor GitHub Actions for alerts.

### Manual Rollback via Vercel Dashboard

1. Go to Vercel Project > Deployments
2. Find the last known good deployment
3. Click "..." menu > "Promote to Production"
4. Confirm promotion

### Manual Rollback via CLI

```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### Rollback Checklist

- [ ] Identify the issue and last working deployment
- [ ] Notify team of rollback
- [ ] Execute rollback procedure
- [ ] Verify site is working after rollback
- [ ] Check health endpoints
- [ ] Review error logs to identify root cause
- [ ] Create incident report
- [ ] Plan fix and re-deployment

### Post-Rollback Actions

1. **Investigate:** Review logs to identify root cause
2. **Document:** Create incident report in GitHub Issues
3. **Fix:** Address the issue in a new branch
4. **Test:** Thoroughly test the fix locally and in preview
5. **Deploy:** Re-deploy to production with fix
6. **Monitor:** Watch metrics closely after re-deployment

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] Environment variables documented and set
- [ ] Database migrations tested
- [ ] API keys verified and active
- [ ] Security audit completed
- [ ] Performance benchmarks met

### Deployment

- [ ] Code merged to main branch
- [ ] CI/CD pipeline completed successfully
- [ ] Production deployment verified
- [ ] Health checks passing
- [ ] No errors in logs

### Post-Deployment

- [ ] Site accessible at https://arcanea.ai
- [ ] All critical features working
- [ ] Analytics tracking properly
- [ ] Error tracking configured
- [ ] Monitoring dashboards reviewed
- [ ] Team notified of deployment
- [ ] Documentation updated

---

## Maintenance Windows

Schedule regular maintenance for:

- **Weekly:** Review error logs and performance metrics
- **Monthly:** Update dependencies and security patches
- **Quarterly:** Review and optimize database indexes
- **Annually:** Rotate API keys and secrets

---

## Emergency Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| Lead Developer | frank@arcanea.ai | 24/7 |
| DevOps | devops@arcanea.ai | Business hours |
| Vercel Support | support@vercel.com | 24/7 (Pro) |
| Supabase Support | Discord | 24/7 community |

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Arcanea Repository](https://github.com/frankxai/arcanea)

---

**Last Updated:** 2025-10-23
**Version:** 1.0.0 (MVP)
**Maintained By:** Arcanea DevOps Team
