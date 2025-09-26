# Vercel Deployment Guide

## 📱 **Applications Ready for Deployment**

### Studio App (`studio.arcanea.ai`)
- **Framework:** Next.js 14
- **Port:** 3002 (development)
- **Build Command:** `pnpm build --filter=@arcanea/studio`
- **Output Directory:** `.next`

### Gallery App (`gallery.arcanea.ai`)
- **Framework:** Next.js 14
- **Port:** 3003 (development)
- **Build Command:** `pnpm build --filter=@arcanea/gallery`
- **Output Directory:** `.next`

### Library App (`library.arcanea.ai`)
- **Framework:** Next.js 14
- **Port:** 3005 (development)
- **Build Command:** `pnpm build --filter=@arcanea/library`
- **Output Directory:** `.next`

## 🚀 **Deployment Process**

### Manual Deployment via Vercel CLI
```bash
# Login to Vercel (one-time setup)
vercel login

# Deploy Studio App
cd apps/studio
vercel --prod

# Deploy Gallery App
cd apps/gallery
vercel --prod

# Deploy Library App
cd apps/library
vercel --prod
```

### GitHub Integration (Recommended)
1. Connect Arcanea repository to Vercel
2. Configure project settings for each app
3. Set custom domains:
   - `studio.arcanea.ai` → `apps/studio`
   - `gallery.arcanea.ai` → `apps/gallery`
   - `library.arcanea.ai` → `apps/library`

## ⚙️ **Environment Variables**

### Required for All Apps
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://[subdomain].arcanea.ai
```

### Studio App Specific
```env
NEXT_PUBLIC_STUDIO_API_URL=https://api.arcanea.ai/studio
```

### Gallery App Specific
```env
NEXT_PUBLIC_GALLERY_API_URL=https://api.arcanea.ai/gallery
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-key]
```

### Library App Specific
```env
NEXT_PUBLIC_LIBRARY_API_URL=https://api.arcanea.ai/library
NEXT_PUBLIC_CONTENT_BASE_URL=https://content.arcanea.ai
```

## 🔧 **Vercel Configuration Files**

Each app has a `vercel.json` configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd ../.. && pnpm build --filter=@arcanea/[app-name]",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && pnpm install",
  "devCommand": "cd ../.. && pnpm dev --filter=@arcanea/[app-name]"
}
```

## 🏗️ **Build Requirements**

### Prerequisites
- **Node.js:** 18.x or later
- **Package Manager:** pnpm (configured in repository)
- **Build Tool:** Turbo (for monorepo management)

### Build Process
1. Install dependencies: `pnpm install`
2. Build specific app: `pnpm build --filter=@arcanea/[app-name]`
3. Start production server: `pnpm start --filter=@arcanea/[app-name]`

## 🌐 **Domain Configuration**

### Custom Domains
- **Studio:** `studio.arcanea.ai`
- **Gallery:** `gallery.arcanea.ai`
- **Library:** `library.arcanea.ai`
- **API:** `api.arcanea.ai` (backend services)

### DNS Configuration
```
CNAME studio.arcanea.ai -> cname.vercel-dns.com
CNAME gallery.arcanea.ai -> cname.vercel-dns.com
CNAME library.arcanea.ai -> cname.vercel-dns.com
```

## 📊 **Monitoring & Analytics**

### Vercel Analytics
- Enable for all production deployments
- Track Core Web Vitals
- Monitor deployment performance

### Error Tracking
- Configure Sentry or similar service
- Set up alerts for critical errors
- Monitor build failures

## 🔄 **CI/CD Integration**

### Automatic Deployments
- **Main Branch:** Automatic production deployment
- **Feature Branches:** Preview deployments
- **Pull Requests:** Deployment previews

### Build Optimization
- **Caching:** Leverage Vercel's build cache
- **Incremental Static Regeneration:** For dynamic content
- **Edge Functions:** For global performance

## ⚠️ **Common Issues & Solutions**

### Build Timeout
- Increase build timeout in Vercel settings
- Optimize bundle size and dependencies
- Use build cache effectively

### Memory Limits
- Configure Node.js memory options
- Optimize large dependencies
- Consider splitting large apps

### Environment Variables
- Ensure all required env vars are set
- Use Vercel's environment variable management
- Separate staging and production configs

This guide ensures reliable deployment of all Arcanea applications to Vercel with proper configuration and monitoring.