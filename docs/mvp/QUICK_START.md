# Arcanea MVP - Quick Start Guide

Fast-track deployment guide for getting Arcanea MVP live in production.

## One-Command Deploy

Once configured, deploy with:

```bash
git push origin main
```

That's it! GitHub Actions will handle the rest.

---

## Initial Setup (First Time Only)

### 1. Prerequisites (5 minutes)

- [ ] GitHub account with repo access
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Supabase account (sign up at [supabase.com](https://supabase.com))

### 2. Create Supabase Project (2 minutes)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Name: `arcanea-mvp`
4. Generate password (save it!)
5. Region: `us-east-1` (or closest to you)
6. Click "Create Project" (takes 2-3 minutes)

### 3. Get Supabase Credentials (1 minute)

Once project is ready:

1. Go to Settings > API
2. Copy these values:
   - Project URL
   - `anon` public key
   - `service_role` secret key (click "Reveal")

### 4. Get AI API Keys (10 minutes)

**Gemini (Required):**
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AIzaSy`)

**Anthropic (Required):**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Login
3. Go to API Keys
4. Create new key
5. Copy key (starts with `sk-ant-`)

**OpenRouter (Optional but recommended):**
1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Create account
3. Generate API key
4. Copy key (starts with `sk-or-v1-`)

### 5. Connect to Vercel (3 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Connect your GitHub account
4. Select `frankxai/arcanea` repository
5. Click "Import"
6. **Don't deploy yet!** Click "Environment Variables" first

### 6. Add Environment Variables to Vercel (5 minutes)

In Vercel project settings, add these environment variables:

**Required variables:**

```bash
# Application
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=<generate-below>

# Supabase (from step 3)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI APIs (from step 4)
GEMINI_API_KEY=AIzaSy...
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENROUTER_API_KEY=sk-or-v1-...
```

**Generate NEXTAUTH_SECRET:**

Run this in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and use it for `NEXTAUTH_SECRET`.

**Important:** Set all variables to **Production** scope!

### 7. Deploy to Vercel (1 minute)

1. Click "Deploy"
2. Wait 2-3 minutes
3. Visit your deployment URL
4. You're live!

### 8. Setup GitHub Actions (5 minutes)

Add these secrets to GitHub repository (Settings > Secrets and variables > Actions):

```bash
VERCEL_TOKEN=<get-from-vercel-account>
NEXT_PUBLIC_APP_URL=https://arcanea.ai
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

**To get Vercel token:**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create new token
3. Copy and add to GitHub secrets

### 9. Setup Custom Domain (Optional, 5 minutes)

1. In Vercel project > Settings > Domains
2. Add `arcanea.ai`
3. Update DNS records at your registrar:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)

---

## Development Setup

### Local Development (2 minutes)

```bash
# Clone repository
git clone https://github.com/frankxai/arcanea.git
cd arcanea

# Install dependencies
pnpm install

# Copy environment template
cp .env.mvp.example .env.local

# Fill in your values in .env.local
# (use same values as Vercel)

# Start development server
pnpm dev:web
```

Visit `http://localhost:3001`

---

## Daily Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request on GitHub
# Preview deployment will be created automatically!
```

### Deploying to Production

```bash
# Merge PR to main (via GitHub UI)
# Or push directly to main:
git checkout main
git merge feature/my-feature
git push origin main

# Deployment happens automatically!
# Check status: https://github.com/frankxai/arcanea/actions
```

---

## Monitoring

### Check Status

1. **Application Health**
   - Visit: `https://arcanea.ai/api/health`
   - Should return `{"api":true,"database":true}`

2. **Vercel Dashboard**
   - Go to [vercel.com/arcanea](https://vercel.com)
   - Check Analytics, Logs, Performance

3. **Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Check Database health, API logs

4. **GitHub Actions**
   - Go to repository > Actions
   - Check CI/CD pipeline status

---

## Common Issues & Quick Fixes

### 1. Deployment Fails

**Check:**
- GitHub Actions logs
- Vercel deployment logs
- Environment variables are set correctly

**Fix:**
```bash
# Redeploy manually
vercel --prod

# Or trigger workflow manually
# Go to GitHub Actions > Run workflow
```

### 2. "Environment variable not found"

**Fix:**
1. Check Vercel dashboard > Environment Variables
2. Ensure variable is set for "Production"
3. Redeploy after adding variables

### 3. Database Connection Error

**Fix:**
1. Check Supabase project is active (not paused)
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
3. Check `SUPABASE_SERVICE_ROLE_KEY` is set

### 4. API Key Errors

**Fix:**
1. Verify API keys are valid
2. Check provider dashboards for key status
3. Check billing status (some APIs require payment method)

### 5. Build Fails

**Fix:**
```bash
# Test build locally
pnpm build

# Clear cache and rebuild
pnpm clean
rm -rf node_modules .next
pnpm install
pnpm build
```

---

## Quick Commands Reference

```bash
# Development
pnpm dev:web              # Start dev server
pnpm build                # Build for production
pnpm start                # Start production server locally

# Testing
pnpm lint                 # Lint code
pnpm type-check           # Check TypeScript
pnpm test                 # Run tests

# Deployment
vercel                    # Deploy to preview
vercel --prod             # Deploy to production
vercel logs               # View deployment logs
vercel env pull           # Pull environment variables

# Database
cd packages/database
pnpm prisma generate      # Generate Prisma client
pnpm prisma db push       # Push schema to database
pnpm prisma studio        # Open database GUI

# Maintenance
pnpm clean                # Clean build artifacts
pnpm audit                # Check for vulnerabilities
pnpm outdated             # Check for updates
```

---

## Cost Estimate

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Gemini API | Pay-as-you-go | $50-100 |
| Anthropic API | Pay-as-you-go | $100-200 |
| OpenRouter | Pay-as-you-go | $50 |
| **Total** | | **$245-395** |

Set up billing alerts at 80% of budget!

---

## Next Steps

After deployment:

1. **Test Everything**
   - [ ] User registration/login
   - [ ] Image generation
   - [ ] Story creation
   - [ ] Profile management

2. **Setup Monitoring**
   - [ ] Enable Vercel Analytics
   - [ ] Setup error tracking
   - [ ] Configure alerts

3. **Performance Optimization**
   - [ ] Check Core Web Vitals
   - [ ] Optimize images
   - [ ] Enable caching

4. **Security Hardening**
   - [ ] Review RLS policies
   - [ ] Setup rate limiting
   - [ ] Configure CORS

5. **Documentation**
   - [ ] Update README
   - [ ] Document API endpoints
   - [ ] Create user guides

---

## Getting Help

| Issue Type | Resource |
|------------|----------|
| **Deployment** | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| **Security** | [SECURITY.md](./SECURITY.md) |
| **Monitoring** | [MONITORING.md](./MONITORING.md) |
| **Vercel Issues** | [Vercel Docs](https://vercel.com/docs) |
| **Supabase Issues** | [Supabase Docs](https://supabase.com/docs) |
| **Code Issues** | GitHub Issues |

---

## Emergency Contacts

| Role | Contact | Use For |
|------|---------|---------|
| Lead Developer | frank@arcanea.ai | Critical issues |
| Vercel Support | support@vercel.com | Platform issues |
| Supabase Support | Discord | Database issues |

---

**Congratulations!** You now have Arcanea MVP deployed and running in production.

For detailed information on any topic, refer to the comprehensive guides in the `docs/mvp/` directory.

---

**Last Updated:** 2025-10-23
**Version:** 1.0.0 (MVP)
**Maintained By:** Arcanea DevOps Team
