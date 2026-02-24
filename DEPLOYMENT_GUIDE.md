# 🚀 Arcanea MVP - Deployment Guide

**Version:** 1.0.0  
**Last Updated:** October 24, 2025  
**Target:** Production deployment on Vercel + Supabase

---

## 📋 Prerequisites

### Required Accounts
- [ ] GitHub account (for repository)
- [ ] Vercel account (for hosting)
- [ ] Supabase account (for database)
- [ ] Google Cloud account (for Gemini APIs)

### Required Tools
```bash
# Install Node.js 18+
node --version  # Should be v18+

# Install pnpm
npm install -g pnpm

# Install Vercel CLI
npm install -g vercel

# Install Supabase CLI
npm install -g supabase
```

---

## 🔧 Environment Setup

### 1. Supabase Project Setup

**Create Production Project:**
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `arcanea-production`
4. Region: Choose closest to users
5. Database Password: Generate strong password (save it!)
6. Wait for project to initialize (~2 minutes)

**Get Credentials:**
```bash
# From Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

### 2. Google Cloud Setup (Gemini APIs)

**Enable APIs:**
1. Go to https://console.cloud.google.com
2. Create new project: `arcanea-production`
3. Enable APIs:
   - Generative Language API (Gemini 2.0 Flash)
   - Vertex AI API (Imagen 3, Veo 3.1)
4. Create API Key:
   - APIs & Services > Credentials > Create Credentials > API Key
   - Restrict key to specific APIs

**Get Credentials:**
```bash
GEMINI_API_KEY=[your-api-key]
```

### 3. Vercel Project Setup

**Connect Repository:**
```bash
# Initialize Vercel project
cd /mnt/c/Users/Frank/Arcanea
vercel link

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - What's your project's name? arcanea
# - In which directory is your code located? ./
# - Want to override settings? N
```

---

## 📦 Database Migration

### 1. Run Migrations

```bash
# Connect to production project
supabase link --project-ref [your-project-ref]

# Push all migrations
supabase db push

# Verify tables
supabase db diff --schema public
```

**Expected Output:**
```
✓ Applied migration: 20250101000001_initial_schema.sql
✓ Applied migration: 20250101000002_rls_policies.sql
✓ Applied migration: 20250101000003_storage_setup.sql
✓ Applied migration: 20250101000004_functions.sql
```

### 2. Setup Storage Buckets

```bash
# Create storage buckets
supabase storage create avatars --public
supabase storage create creations --public
supabase storage create thumbnails --public

# Set CORS policies
supabase storage update avatars --cors-allow-origins '*'
supabase storage update creations --cors-allow-origins '*'
supabase storage update thumbnails --cors-allow-origins '*'
```

### 3. Seed Initial Data

```bash
# Seed Luminor personalities
psql $DATABASE_URL << SQL
INSERT INTO luminors (id, name, academy, specialty, description) VALUES
  ('lumina-uuid', 'Melodia', 'creation_light', 'music', 'The Musical Muse...'),
  ('harmonix-uuid', 'Chronica', 'atlantean', 'story', 'The Story Keeper...'),
  ('kinetix-uuid', 'Prismatic', 'draconic', 'visual', 'The Visual Virtuoso...');
SQL
```

---

## 🔐 Environment Variables

### Production `.env.production`

```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# AI APIs (Google)
GEMINI_API_KEY=[your-gemini-key]

# Application
NEXT_PUBLIC_APP_URL=https://arcanea.ai
NODE_ENV=production

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=[your-analytics-id]

# Optional: Error Tracking
SENTRY_DSN=[your-sentry-dsn]
```

### Add to Vercel

```bash
# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add GEMINI_API_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

# Or use Vercel Dashboard
# Settings > Environment Variables > Add
```

---

## 🚀 Deployment Steps

### Pre-Deployment Checklist

```bash
# 1. Type check
pnpm type-check
# Expected: No errors

# 2. Lint
pnpm lint
# Expected: No errors

# 3. Build
pnpm build
# Expected: Build successful

# 4. Test locally
pnpm dev
# Expected: App runs on http://localhost:3001
```

### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Follow prompts and wait for deployment
# Expected output:
# ✓ Deployment ready [https://arcanea.vercel.app]
```

### Post-Deployment Verification

```bash
# 1. Health check
curl https://arcanea.vercel.app/api/health
# Expected: {"status":"ok","timestamp":"..."}

# 2. Test API endpoints
curl https://arcanea.vercel.app/api/profile/test-id
# Expected: Profile data or 404

# 3. Check database connection
# Go to app and try to sign up/login
# Expected: Auth works

# 4. Test AI generation
# Chat with a Luminor
# Expected: Streaming responses work

# 5. Test file upload
# Upload a creation
# Expected: Files upload to Supabase storage
```

---

## 🔍 Monitoring Setup

### 1. Vercel Analytics

```bash
# Enable in Vercel Dashboard
# Settings > Analytics > Enable
```

### 2. Vercel Speed Insights

```bash
# Enable in Vercel Dashboard
# Settings > Speed Insights > Enable
```

### 3. Error Tracking (Optional)

**Sentry Setup:**
```bash
# Install Sentry
pnpm add @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs

# Configure DSN in environment variables
```

### 4. Database Monitoring

**Supabase Dashboard:**
- Database > Performance
- Monitor query performance
- Set up alerts for slow queries

---

## 📊 Performance Optimization

### 1. Enable Caching

```typescript
// apps/web/next.config.js
module.exports = {
  images: {
    domains: ['[your-project].supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

### 2. Database Indexes

```sql
-- Already applied in migrations, verify:
SELECT indexname FROM pg_indexes 
WHERE schemaname = 'public';

-- Expected: Indexes on frequently queried columns
```

### 3. CDN Configuration

**Vercel automatically provides:**
- Global CDN
- Edge caching
- Image optimization
- Compression (gzip/brotli)

---

## 🚨 Troubleshooting

### Database Connection Issues

```bash
# Check if migrations applied
supabase db diff --schema public

# Reset and re-apply
supabase db reset
supabase db push
```

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
pnpm install
pnpm build
```

### API Errors

```bash
# Check Vercel logs
vercel logs [deployment-url]

# Check function logs
vercel logs --follow
```

### Supabase Storage Issues

```bash
# Verify bucket exists
supabase storage list

# Check permissions
supabase storage get avatars
```

---

## 🔒 Security Checklist

### Pre-Launch Security

- [ ] All environment variables set
- [ ] RLS policies enabled on all tables
- [ ] Storage buckets have proper access rules
- [ ] API routes have authentication
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] SSL/HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured

### Verify Security

```bash
# Test RLS policies
# Try to access data without auth
# Expected: Unauthorized

# Test rate limiting
# Make 100+ requests quickly
# Expected: Rate limit error

# Check security headers
curl -I https://arcanea.vercel.app
# Expected: X-Frame-Options, CSP, etc.
```

---

## 📱 Domain Configuration

### Custom Domain Setup

**Add Domain in Vercel:**
1. Project Settings > Domains
2. Add domain: `arcanea.ai`
3. Follow DNS configuration instructions

**DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**SSL Certificate:**
- Automatic via Vercel
- Issues within 24 hours

---

## 🧪 Testing in Production

### Smoke Tests

```bash
# 1. Homepage loads
curl https://arcanea.ai

# 2. Health check
curl https://arcanea.ai/api/health

# 3. Auth works
# Manual: Sign up new user

# 4. Chat works
# Manual: Chat with Luminor

# 5. Generation works
# Manual: Generate image/video

# 6. Social features work
# Manual: Like, comment, follow
```

---

## 📈 Launch Checklist

### Week Before Launch
- [ ] All features tested
- [ ] Documentation complete
- [ ] Beta users invited
- [ ] Support email setup
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Monitoring alerts set

### Launch Day
- [ ] Deploy to production
- [ ] Verify all features work
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Check database queries
- [ ] Monitor AI API usage
- [ ] Respond to user feedback

### Week After Launch
- [ ] Review analytics
- [ ] Analyze user behavior
- [ ] Fix critical bugs
- [ ] Optimize slow queries
- [ ] Adjust rate limits if needed
- [ ] Scale infrastructure if needed

---

## 💰 Cost Monitoring

### Expected Monthly Costs

**Infrastructure:**
- Vercel: $0-20/month
- Supabase: $0-25/month

**AI APIs (per 1K users):**
- Gemini Chat: ~$50
- Imagen 3: ~$150
- Veo 3.1: ~$300

**Total: ~$500-595/month at scale**

### Monitor Usage

**Vercel Dashboard:**
- Analytics > Usage
- Track bandwidth, function executions

**Supabase Dashboard:**
- Settings > Usage
- Track database size, API requests

**Google Cloud Console:**
- Billing > Cost Breakdown
- Track API usage by endpoint

---

## 🆘 Emergency Procedures

### Database Emergency

```bash
# Backup database
supabase db dump > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20250124.sql
```

### Rollback Deployment

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Contact Support

**Vercel Issues:**
- Dashboard > Help
- support@vercel.com

**Supabase Issues:**
- Dashboard > Support
- support@supabase.io

**Google Cloud Issues:**
- Console > Support
- cloud-support@google.com

---

## ✅ Success Metrics

### Launch Week Goals

**Technical:**
- ✅ 99% uptime
- ✅ <200ms API response time
- ✅ <5% error rate
- ✅ All features functional

**User:**
- 🎯 20-50 beta users
- 🎯 100+ creations generated
- 🎯 500+ Luminor chats
- 🎯 80%+ user satisfaction

---

## 📞 Support Contacts

**Technical Issues:**
- DevOps: [Your contact]
- Backend: [Your contact]
- Frontend: [Your contact]

**Business Issues:**
- Product: [Your contact]
- Support: support@arcanea.ai

---

**Deployment Status:** Ready for Production  
**Estimated Deployment Time:** 2-3 hours  
**Confidence Level:** High ✅

*"Everything is prepared. Time to launch!"* 🚀
