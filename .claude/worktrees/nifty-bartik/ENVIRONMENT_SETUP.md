# Environment Setup Guide
**Arcanea Platform - Comprehensive Environment Configuration**

---

## Quick Start

### 1. Copy Environment Template

```bash
# Navigate to web app directory
cd apps/web

# Copy the example file
cp .env.example .env.local
```

### 2. Get Your API Keys

| Service | Get Key From | Required |
|---------|-------------|----------|
| **Supabase** | [app.supabase.com](https://app.supabase.com) → Project Settings → API | ✅ Yes |
| **Google Gemini** | [aistudio.google.com/apikey](https://aistudio.google.com/app/apikey) | ✅ Yes |
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Optional |
| **Anthropic** | [console.anthropic.com](https://console.anthropic.com) | Optional |
| **Stability AI** | [platform.stability.ai/account/keys](https://platform.stability.ai/account/keys) | Optional |

### 3. Fill in .env.local

```bash
# Open in your editor
code apps/web/.env.local

# Or use nano
nano apps/web/.env.local
```

**Minimum Required Configuration**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY=AIzaSyYourKeyHere
```

### 4. Verify Configuration

```bash
# Run environment check
pnpm run check:env

# Expected output:
# ✅ All required environment variables are set
# ✅ Environment configuration is valid
```

### 5. Start Development

```bash
# Start dev server
pnpm run dev

# Open browser
# http://localhost:3001
```

---

## Detailed Setup Instructions

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Choose organization and enter project details
   - Wait for provisioning (~2 minutes)

2. **Get Your Keys**
   - Navigate to: Project Settings → API
   - Copy these three values:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

3. **Security Note**
   - ✅ `anon` key is safe for client-side (respects RLS)
   - ⚠️ `service_role` key bypasses RLS - NEVER expose to client
   - ⚠️ `service_role` key should only be used in API routes

### Google Gemini Setup

1. **Get API Key**
   - Go to [aistudio.google.com/apikey](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Select Google Cloud project or create new one
   - Copy the key → `GEMINI_API_KEY`

2. **Enable Required APIs** (if prompted)
   - Generative Language API
   - Gemini API

3. **Set Usage Limits** (recommended)
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - APIs & Services → Generative Language API → Quotas
   - Set daily limits to prevent unexpected costs

### NextAuth.js Setup (Future Feature)

1. **Generate Secret**
   ```bash
   openssl rand -base64 32
   ```

2. **Add to .env.local**
   ```env
   NEXTAUTH_SECRET=your-generated-secret-here
   NEXTAUTH_URL=http://localhost:3001
   ```

3. **Production Deployment**
   ```env
   NEXTAUTH_URL=https://arcanea.ai
   ```

### Stripe Setup (Future Feature)

1. **Get Keys**
   - Go to [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - Copy:
     - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - **Secret key** → `STRIPE_SECRET_KEY`

2. **Setup Webhooks**
   - Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `https://arcanea.ai/api/webhooks/stripe`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

---

## Environment Variables Reference

### Public Variables (Safe for Client)

These variables are embedded in the client-side JavaScript bundle and can be seen by users. Only use `NEXT_PUBLIC_` for non-sensitive data.

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key (RLS enforced) | `eyJhbG...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry project identifier | `https://...` |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics (auto-set) | Auto |

### Private Variables (Server-Side Only)

These variables are ONLY available in API routes and server components. They are never sent to the client.

| Variable | Purpose | Example |
|----------|---------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Supabase access | `eyJhbG...` |
| `GEMINI_API_KEY` | Google Gemini API | `AIzaSy...` |
| `ANTHROPIC_API_KEY` | Claude API | `sk-ant-...` |
| `OPENAI_API_KEY` | OpenAI API | `sk-...` |
| `STABILITY_API_KEY` | Stability AI | `sk-...` |
| `NEXTAUTH_SECRET` | JWT signing secret | 32+ char string |
| `STRIPE_SECRET_KEY` | Stripe server key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature | `whsec_...` |
| `SENTRY_AUTH_TOKEN` | Sentry source maps | Token |

### System Variables (Auto-Set)

| Variable | Set By | Values |
|----------|--------|--------|
| `NODE_ENV` | Node.js | `development`, `production`, `test` |
| `VERCEL_ENV` | Vercel | `production`, `preview`, `development` |
| `VERCEL_URL` | Vercel | Auto-generated deployment URL |

---

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add GEMINI_API_KEY production

# Add optional variables
vercel env add ANTHROPIC_API_KEY production
vercel env add OPENAI_API_KEY production

# Deploy
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "feat: Add environment configuration"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework Preset: Next.js
   - Root Directory: `./`

3. **Add Environment Variables**
   - Project Settings → Environment Variables
   - Add each variable for **Production** environment
   - Click "Add" for each one

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Vercel Environment Scopes

| Scope | Usage |
|-------|-------|
| **Production** | Main site (yoursite.com) |
| **Preview** | Pull request previews |
| **Development** | Local development with `vercel dev` |

**Recommendation**: Set variables for all three scopes to ensure consistency.

---

## Security Best Practices

### ✅ DO

- ✅ **Use .env.local for local development** - Never commit this file
- ✅ **Use Vercel Environment Variables for production** - Encrypted at rest
- ✅ **Rotate API keys regularly** - Every 90 days or when team members leave
- ✅ **Set rate limits on AI APIs** - Prevent unexpected costs
- ✅ **Use different keys for dev/prod** - Stripe test mode, separate Supabase projects
- ✅ **Audit environment variables** - Run `pnpm run check:env` before deployment
- ✅ **Monitor API usage** - Set up billing alerts

### ❌ DON'T

- ❌ **Never commit .env.local or .env.production** - Add to .gitignore
- ❌ **Never use NEXT_PUBLIC_ for secrets** - Will be exposed to client
- ❌ **Never hardcode API keys in code** - Always use environment variables
- ❌ **Never share service_role keys** - Bypasses all security
- ❌ **Never log API keys** - Even in development
- ❌ **Never use production keys in development** - Use test/dev keys

---

## Type-Safe Environment Access

### Using the env Helper

```typescript
// Instead of this (unsafe):
const apiKey = process.env.GEMINI_API_KEY;

// Use this (type-safe):
import { env } from '@/lib/env';
const apiKey = env.GEMINI_API_KEY; // TypeScript autocomplete ✨
```

### Feature Flags

```typescript
import { features } from '@/lib/env';

if (features.hasOpenAI) {
  // Use OpenAI features
}

if (features.hasStripe) {
  // Show pricing page
}
```

### Environment Checks

```typescript
import { isDevelopment, isProduction } from '@/lib/env';

if (isDevelopment) {
  console.log('Debug info');
}

if (isProduction) {
  // Enable analytics
}
```

---

## Troubleshooting

### Build Fails: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Problem**: Required environment variable not set

**Solution**:
```bash
# Check if .env.local exists
ls -la apps/web/.env.local

# If not, copy from example
cp apps/web/.env.example apps/web/.env.local

# Fill in required values
nano apps/web/.env.local
```

### Runtime Error: "GEMINI_API_KEY is required"

**Problem**: API key not set or not loaded

**Solution**:
```bash
# Verify key is in .env.local
grep GEMINI_API_KEY apps/web/.env.local

# Restart dev server
pnpm run dev
```

### Vercel Deployment Fails

**Problem**: Environment variables not set in Vercel

**Solution**:
```bash
# Check what's set
vercel env ls

# Add missing variables
vercel env add GEMINI_API_KEY production
```

### Supabase Auth Not Working

**Problem**: Using wrong key or URL

**Solution**:
1. Check Project Settings → API in Supabase
2. Verify URL matches exactly (including https://)
3. Verify you're using anon key for client, service role for admin
4. Check RLS policies are enabled

### "Invalid environment variables" Error

**Problem**: Variables don't pass validation

**Solution**:
```bash
# Run validation script
pnpm run check:env

# Fix errors shown in output
# Common issues:
# - NEXTAUTH_SECRET too short (needs 32+ chars)
# - NEXT_PUBLIC_SUPABASE_URL not a valid URL
# - API keys with wrong format
```

---

## Environment Variable Rotation

### When to Rotate

- ✅ Every 90 days (scheduled)
- ✅ When team member leaves
- ✅ Suspected compromise
- ✅ After security audit

### How to Rotate

1. **Generate new key** in service dashboard
2. **Add new key** to Vercel with temporary different name
3. **Deploy** with new key
4. **Test** that everything works
5. **Remove old key** from Vercel
6. **Revoke old key** in service dashboard

---

## Additional Resources

- **Next.js Environment Variables**: [nextjs.org/docs/app/building-your-application/configuring/environment-variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- **Vercel Environment Variables**: [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
- **Supabase Security**: [supabase.com/docs/guides/auth/security](https://supabase.com/docs/guides/auth/security)
- **OWASP Secrets Management**: [cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

## Support

If you encounter issues:

1. **Run environment check**: `pnpm run check:env`
2. **Check logs**: `pnpm run dev` (look for warning messages)
3. **Verify API keys**: Test each key individually
4. **Review .env.example**: Ensure you have all required variables
5. **Check documentation**: Each service's API documentation

---

**Last Updated**: 2026-02-02
**Version**: 1.0.0
