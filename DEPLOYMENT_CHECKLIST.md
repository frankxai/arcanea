# Arcanea Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables Configuration

#### Required Environment Variables

**Supabase Configuration**
```env
# Supabase Project URL (from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anonymous Key (safe for client-side)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your-anon-key

# Supabase Service Role Key (server-side only, NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
```

**Google Gemini AI Configuration**
```env
# Gemini API Key (get from Google AI Studio: https://aistudio.google.com/)
GEMINI_API_KEY=AIzaSy...your-gemini-api-key
```

**Next.js Configuration**
```env
# Node environment
NODE_ENV=production

# Next.js URL (for production)
NEXT_PUBLIC_APP_URL=https://arcanea.com
```

#### Optional Environment Variables

**Analytics & Monitoring**
```env
# Vercel Analytics (auto-configured on Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto

# Error tracking (Sentry)
SENTRY_DSN=https://...your-sentry-dsn
```

**Feature Flags**
```env
# Enable/disable specific features
NEXT_PUBLIC_ENABLE_VIDEO_GENERATION=true
NEXT_PUBLIC_ENABLE_MUSIC_GENERATION=true
NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB=10
```

---

## Supabase Setup

### 1. Database Migration
```bash
# Run all migrations
cd supabase
supabase db push

# Verify migrations
supabase db diff
```

### 2. Row Level Security (RLS) Policies
Ensure all 40+ RLS policies are enabled:
- ✅ Profiles table (6 policies)
- ✅ Creations table (8 policies)
- ✅ Likes table (4 policies)
- ✅ Comments table (6 policies)
- ✅ Follows table (4 policies)
- ✅ Notifications table (4 policies)
- ✅ Luminor relationships (5 policies)
- ✅ Conversations & messages (8 policies)

### 3. Storage Buckets
Create and configure storage buckets:
```sql
-- Creations bucket (for AI-generated content)
INSERT INTO storage.buckets (id, name, public)
VALUES ('creations', 'creations', true);

-- Avatars bucket (for user profile pictures)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Configure RLS for storage
CREATE POLICY "Users can upload their own creations"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'creations' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Database Functions
Verify all triggers and functions are created:
- `update_updated_at_column()` trigger
- `increment_comment_count()` trigger
- `increment_like_count()` trigger
- `update_follower_count()` trigger

---

## Vercel Deployment

### 1. Project Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

### 2. Environment Variables in Vercel
Add all environment variables to Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. **Critical**: Mark `SUPABASE_SERVICE_ROLE_KEY` and `GEMINI_API_KEY` as sensitive

### 3. Build Configuration
Verify `vercel.json` or project settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "regions": ["iad1"]
}
```

### 4. Deploy
```bash
# Deploy to production
vercel --prod

# Or deploy via Git push (recommended)
git push origin main
```

---

## Post-Deployment Verification

### 1. Health Checks
Test all API endpoints:
```bash
# Health check
curl https://arcanea.com/api/health

# Gemini chat (requires auth)
curl -X POST https://arcanea.com/api/ai/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### 2. Database Connection
- ✅ Verify Supabase connection from Vercel
- ✅ Test RLS policies with authenticated requests
- ✅ Check real-time subscriptions

### 3. AI Services
- ✅ Test Gemini 2.0 Flash chat
- ✅ Test Imagen 3 image generation
- ✅ Test Veo video generation (if enabled)

### 4. Frontend Routes
Test all main pages:
- ✅ `/` - Landing page
- ✅ `/chat` - Luminor chat interface
- ✅ `/discover` - Discovery feed
- ✅ `/profile/[username]` - User profiles
- ✅ `/library` - Creation library

---

## Security Checklist

### 1. API Security
- ✅ Rate limiting enabled (in-memory for MVP, Redis for production)
- ✅ Authentication middleware on all protected routes
- ✅ Input validation with Zod schemas
- ✅ XSS protection with sanitization
- ✅ CORS configured correctly

### 2. Database Security
- ✅ All RLS policies enabled
- ✅ Service role key only in server-side code
- ✅ No sensitive data in client-side code
- ✅ Proper indexes for query performance

### 3. Secrets Management
- ✅ All secrets in environment variables (not in code)
- ✅ `.env` files in `.gitignore`
- ✅ Vercel environment variables encrypted
- ✅ No API keys in frontend code

---

## Performance Optimization

### 1. Caching Strategy
```typescript
// API routes with caching
export const revalidate = 3600; // 1 hour

// Static pages
export const dynamic = 'force-static';
```

### 2. Image Optimization
- ✅ Use Next.js Image component
- ✅ Optimize Imagen 3 outputs
- ✅ CDN for static assets

### 3. Database Optimization
- ✅ Indexes on frequently queried columns
- ✅ Connection pooling configured
- ✅ Query optimization for feeds

---

## Monitoring & Alerts

### 1. Error Tracking
```bash
# Set up Sentry (optional)
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### 2. Performance Monitoring
- Vercel Analytics (built-in)
- Core Web Vitals tracking
- API response time monitoring

### 3. Database Monitoring
- Supabase dashboard metrics
- Query performance insights
- Connection pool status

---

## Cost Management

### Current Projected Costs (1K users/month)

**Infrastructure:**
- Vercel: $0-20/month (Hobby: $0, Pro: $20)
- Supabase: $0-25/month (Free tier: $0, Pro: $25)

**AI APIs:**
- Gemini 2.0 Flash: ~$50/month (text generation)
- Imagen 3: ~$150/month ($0.04/image)
- Veo 3.1: ~$300/month ($6/video, 50 videos/month)

**Total: ~$500-545/month**

### Cost Optimization Tips
1. Implement request caching to reduce AI API calls (30% savings)
2. Use Gemini free tier quota first (1500 requests/day free)
3. Batch image generation requests when possible
4. Limit video generation to premium users

---

## Rollback Plan

### Quick Rollback
```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific deployment
vercel --prod [DEPLOYMENT_URL]
```

### Database Rollback
```bash
# Restore from Supabase backup
supabase db restore --backup-id [BACKUP_ID]
```

---

## Launch Day Checklist

**24 Hours Before:**
- [ ] Run final full build and test
- [ ] Verify all environment variables
- [ ] Test authentication flow end-to-end
- [ ] Check AI generation limits and quotas
- [ ] Prepare rollback plan
- [ ] Brief team on monitoring procedures

**Launch Day:**
- [ ] Deploy to production
- [ ] Monitor error rates
- [ ] Watch API response times
- [ ] Check database performance
- [ ] Test user registration flow
- [ ] Verify AI generation works
- [ ] Monitor costs/usage

**Post-Launch (First Week):**
- [ ] Daily error log review
- [ ] User feedback collection
- [ ] Performance optimization
- [ ] Bug fixes and hot patches
- [ ] Cost monitoring and optimization

---

## Support & Resources

**Documentation:**
- Next.js 16: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Gemini API: https://ai.google.dev/docs

**Emergency Contacts:**
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/dashboard/support
- Google AI Support: https://ai.google.dev/support

**Internal:**
- Development Team: [Your team contact]
- DevOps Lead: [DevOps contact]
- Product Manager: [PM contact]

---

## Notes

- This checklist assumes MVP deployment
- Production scale will require Redis for rate limiting
- Consider CDN for global performance
- Monitor AI costs closely in first month
- Set up budget alerts on Google Cloud and Vercel
