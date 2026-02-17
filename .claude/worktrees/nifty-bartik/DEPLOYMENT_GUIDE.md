# Arcanea Deployment Guide

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com/new

2. **Import Repository**
   - Select `frankxai/arcanea-ecosystem`
   - Framework: Next.js
   - Root Directory: `arcanea/apps/web`

3. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
   ANTHROPIC_API_KEY=your_claude_key
   OPENAI_API_KEY=your_openai_key
   ```

4. **Configure Domains**
   - Primary: `arcanea.ai`
   - Redirect: `www.arcanea.ai` → `arcanea.ai`

5. **Deploy**

### Option 2: Vercel CLI

```bash
# Login
vercel login

# Deploy from web app directory
cd arcanea-ecosystem/arcanea/apps/web
vercel --prod

# Or deploy entire monorepo
cd arcanea-ecosystem/arcanea
vercel --prod
```

### Option 3: Deploy arcanea-ai-app (Standalone)

```bash
cd arcanea.ai
vercel login
vercel --prod
```

---

## Domain Configuration

### DNS Settings for arcanea.ai

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### DNS Settings for arcanea.io

| Type | Name | Value |
|------|------|-------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |
| CNAME | docs | cname.vercel-dns.com |
| CNAME | api | cname.vercel-dns.com |

---

## Environment Variables Checklist

### Required for Production

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Auth (if using NextAuth)
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://arcanea.ai

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
VERCEL_ANALYTICS_ID=
```

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Test AI chat functionality
- [ ] Test image generation
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test error pages (404, 500)
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure rate limiting

---

## Deployment Architecture

```
GitHub (frankxai/arcanea-ecosystem)
    ↓ push to main
Vercel (auto-deploy)
    ↓ build
arcanea.ai (production)
    ├── / (landing)
    ├── /studio (creation)
    ├── /chat (luminors)
    ├── /library (wisdom)
    ├── /academy (learning)
    └── /lore (mythology)
```

---

## Troubleshooting

### Build Fails
```bash
# Check TypeScript errors
pnpm run type-check

# Check for missing dependencies
pnpm install

# Clear cache and rebuild
rm -rf .next && pnpm run build
```

### Environment Variables Not Loading
- Ensure variables are set in Vercel Dashboard
- Check variable names match exactly
- Redeploy after adding new variables

### Domain Not Working
- Verify DNS propagation: https://dnschecker.org
- Check Vercel domain configuration
- Wait up to 48 hours for DNS propagation

---

*Last Updated: February 3, 2026*
