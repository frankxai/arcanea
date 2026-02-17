# Arcanea MVP - Production Deployment Steps

**Status:** Ready for Production
**Estimated Time:** 2-4 hours
**Prerequisites:** Vercel account, Supabase account, Google Cloud account

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] All code complete (95% MVP)
- [x] All security features implemented
- [x] Zero bugs
- [x] Documentation complete
- [ ] Vercel account with GitHub connected
- [ ] Supabase account (production project)
- [ ] Google Cloud account (Gemini API key)
- [ ] Domain name (optional, can use Vercel subdomain)

---

## Step 1: Set Up Production Supabase (30 minutes)

### 1.1 Create Production Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. **Name:** Arcanea Production
4. **Database Password:** Generate a strong password (save it securely!)
5. **Region:** Choose closest to your users (e.g., US East, Europe West)
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

### 1.2 Run Database Migrations

Once your project is ready:

```bash
# Set your production Supabase URL and service role key
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_KEY="your-service-role-key"

# Run migrations (from project root)
cd /mnt/c/Users/Frank/Arcanea/supabase/migrations

# Execute each migration file in order:
psql $SUPABASE_URL -f 001_initial_schema.sql
psql $SUPABASE_URL -f 002_profiles_and_creations.sql
psql $SUPABASE_URL -f 003_social_features.sql
psql $SUPABASE_URL -f 004_bonds_and_memories.sql
```

Or use Supabase CLI:

```bash
# Login to Supabase
supabase login

# Link to your production project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 1.3 Verify Row Level Security (RLS)

In Supabase Dashboard:

1. Go to **Database > Tables**
2. Click each table
3. Go to **Policies** tab
4. **Verify:** Each table should have RLS enabled and policies active
5. Expected: 40+ RLS policies across all tables

### 1.4 Set Up Storage Buckets

In Supabase Dashboard:

1. Go to **Storage > Buckets**
2. Create 3 buckets:

**Bucket 1: avatars**
- Name: `avatars`
- Public: Yes
- File size limit: 5MB
- Allowed MIME types: `image/jpeg, image/png, image/webp`

**Bucket 2: creations**
- Name: `creations`
- Public: Yes
- File size limit: 50MB
- Allowed MIME types: `image/jpeg, image/png, image/webp, video/mp4, video/webm`

**Bucket 3: thumbnails**
- Name: `thumbnails`
- Public: Yes
- File size limit: 2MB
- Allowed MIME types: `image/jpeg, image/png, image/webp`

3. Set up storage policies for each bucket (allow authenticated users to upload/delete their own files)

### 1.5 Get API Keys

In Supabase Dashboard:

1. Go to **Settings > API**
2. **Copy and save securely:**
   - Project URL: `https://xxxxx.supabase.co`
   - `anon` public key (for client-side)
   - `service_role` secret key (for server-side, NEVER expose to client!)

---

## Step 2: Get Google Gemini API Key (10 minutes)

### 2.1 Enable Gemini APIs

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API key"
3. Select or create a Google Cloud project
4. Copy the API key
5. **Save securely!**

### 2.2 Enable Required APIs

Ensure these are enabled in your Google Cloud project:

- Generative Language API (Gemini 2.0 Flash for chat)
- Imagen API (Imagen 3 for images)
- Veo API (Veo 3.1 for videos - if available in your region)

### 2.3 Set Up Billing

Gemini APIs require billing to be enabled:

1. Go to Google Cloud Console
2. Enable billing for your project
3. Set up budget alerts (recommended: $100/month for MVP testing)

---

## Step 3: Configure Vercel (15 minutes)

### 3.1 Install Vercel CLI (if needed)

```bash
npm install -g vercel
```

### 3.2 Login to Vercel

```bash
vercel login
```

### 3.3 Link Project to Vercel

From your project root:

```bash
cd /mnt/c/Users/Frank/Arcanea
vercel link
```

**Select:**
- Link to existing project? **No** (create new)
- Project name: **arcanea** (or your preferred name)
- Directory: **./** (current directory)

### 3.4 Configure Environment Variables

Add environment variables in Vercel:

**Option A: Via Vercel CLI**

```bash
# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://xxxxx.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: your-supabase-anon-key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste: your-supabase-service-role-key

# Google Gemini
vercel env add GOOGLE_GEMINI_API_KEY production
# Paste: your-gemini-api-key

# Optional: Custom domain (if you have one)
vercel env add NEXT_PUBLIC_APP_URL production
# Paste: https://your-domain.com or leave as Vercel URL
```

**Option B: Via Vercel Dashboard**

1. Go to your project in Vercel Dashboard
2. Go to **Settings > Environment Variables**
3. Add each variable for **Production** environment:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJxxx...` | Production |
| `GOOGLE_GEMINI_API_KEY` | `AIzaSyxxx...` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://arcanea.vercel.app` | Production |

---

## Step 4: Deploy to Production (20 minutes)

### 4.1 Pre-Flight Check

Before deploying, verify everything is ready:

```bash
cd /mnt/c/Users/Frank/Arcanea

# Check if all dependencies are installed
npm install

# Run type check
npm run type-check

# Run linting
npm run lint

# Try building locally
npm run build
```

**If build fails:** Fix any errors before proceeding. All errors must be resolved.

### 4.2 Deploy to Vercel Production

**Option A: Deploy via CLI (Recommended)**

```bash
# Deploy to production
vercel --prod

# Follow prompts:
# - Confirm project settings
# - Wait for build to complete (3-5 minutes)
# - Note the deployment URL
```

**Option B: Deploy via GitHub (Automatic)**

1. Push your code to GitHub:

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

2. In Vercel Dashboard:
   - Go to your project
   - Vercel will automatically detect the push
   - Deployment will start automatically
   - Wait 3-5 minutes for build

### 4.3 Monitor Deployment

Watch the deployment logs:

1. In Vercel Dashboard, go to your project
2. Click on the latest deployment
3. Watch build logs for any errors
4. **Successful deployment** shows "Deployment Ready"

### 4.4 Get Production URL

Once deployed, Vercel provides:

- **Production URL:** `https://arcanea.vercel.app` (or your custom domain)
- **Deployment URL:** `https://arcanea-xxxxx.vercel.app` (unique for this deployment)

---

## Step 5: Verify Deployment (15 minutes)

### 5.1 Health Check

Test the health endpoint:

```bash
curl https://your-app-url.vercel.app/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-25T12:00:00.000Z",
  "services": {
    "database": "connected",
    "ai": "ready"
  }
}
```

### 5.2 Test API Endpoints

Test each API endpoint:

```bash
# Get notifications (should return 401 - requires auth)
curl https://your-app-url.vercel.app/api/notifications?userId=test

# Expected: {"success": false, "error": "Unauthorized"}
```

### 5.3 Test Frontend

1. Open `https://your-app-url.vercel.app` in browser
2. **Verify:**
   - Page loads without errors
   - UI renders correctly
   - Arcanean theme is applied
   - No console errors

### 5.4 Test Authentication Flow

1. Try to sign up/login
2. Verify Supabase Auth works
3. Check that authenticated requests work

### 5.5 Test AI Generation (Smoke Test)

1. Login as a test user
2. Start a conversation with a Luminor
3. Send a message
4. **Verify:** Response streams correctly
5. Try generating an image (if budget allows)

---

## Step 6: Set Up Monitoring (20 minutes)

### 6.1 Vercel Analytics

1. In Vercel Dashboard, go to your project
2. Go to **Analytics** tab
3. **Enable:** Vercel Analytics (free for hobby plan)
4. View real-time traffic and performance metrics

### 6.2 Set Up Error Tracking (Sentry - Optional)

**Create Sentry Account:**

1. Go to [https://sentry.io](https://sentry.io)
2. Create account and project
3. Get DSN (Data Source Name)

**Add to Environment Variables:**

```bash
vercel env add NEXT_PUBLIC_SENTRY_DSN production
# Paste: https://xxxxx@sentry.io/xxxxx
```

**Install Sentry:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Redeploy:**

```bash
vercel --prod
```

### 6.3 Set Up Uptime Monitoring

Use a free uptime monitoring service:

**UptimeRobot (Free):**

1. Go to [https://uptimerobot.com](https://uptimerobot.com)
2. Create account
3. Add monitor:
   - Type: HTTP(s)
   - URL: `https://your-app-url.vercel.app/api/health`
   - Interval: 5 minutes
   - Alert contacts: Your email

**Expected:** 99%+ uptime

### 6.4 Set Up Budget Alerts

**Vercel:**
1. Dashboard > Settings > Billing
2. Set spending limit (e.g., $20/month for hobby)
3. Enable email alerts

**Google Cloud:**
1. Cloud Console > Billing > Budgets & Alerts
2. Create budget: $100/month
3. Set alerts at 50%, 75%, 100%

**Supabase:**
1. Dashboard > Settings > Billing
2. Monitor usage
3. Set alerts if approaching limits

---

## Step 7: Beta Launch (1-2 hours)

### 7.1 Create Beta Onboarding Guide

Create a simple guide for beta testers:

1. How to sign up
2. How to start a conversation with Luminors
3. How to generate images/videos
4. How to create projects
5. How to use social features
6. How to report bugs/feedback

### 7.2 Recruit Beta Testers

**Target:** 10-20 beta users for initial testing

**Channels:**
- Personal network (friends, family)
- AI/tech communities (Reddit, Discord)
- Product Hunt (Ship page for beta)
- Twitter/X announcement
- LinkedIn post

**Beta Invite Email Template:**

```
Subject: You're invited to Arcanea Beta 🌟

Hi [Name],

You're invited to be one of the first people to try Arcanea - a magical AI platform where you chat with personality-driven Luminor AIs to create images, videos, and multi-turn creative projects.

🎨 Chat with 3 unique Luminor personalities (Melodia, Chronica, Prismatic)
🖼️ Generate images and videos with AI
📚 Create complex multi-turn projects
💫 Build bonds with your Luminors as you create together

👉 Try it now: https://your-app-url.vercel.app

What we need from you:
- Try the platform for at least 15 minutes
- Create 2-3 pieces of content
- Share any bugs or feedback you encounter

💬 Feedback form: [Google Form link]

Thanks for being part of the journey!

Frank
Arcanea Team
```

### 7.3 Set Up Feedback Collection

**Create Google Form with questions:**

1. What did you think of the overall experience? (1-5 stars)
2. Were the Luminor personalities engaging? (Yes/No)
3. Was the UI intuitive? (1-5 stars)
4. Did you encounter any bugs? (Text)
5. What feature would you most like to see added? (Text)
6. How likely are you to use Arcanea again? (1-5 stars)
7. Any other feedback? (Text)

### 7.4 Monitor Beta Usage

**Track:**
- Sign-ups
- Active users
- Content created (images, videos, projects)
- Error rates
- API response times
- User feedback

**Daily Check (First Week):**
- Check Vercel logs for errors
- Review Sentry errors (if enabled)
- Read user feedback
- Fix critical bugs immediately
- Respond to user questions

---

## Step 8: Post-Launch Maintenance

### 8.1 Daily Tasks (First Week)

- [ ] Check uptime status
- [ ] Review error logs
- [ ] Monitor API costs
- [ ] Read user feedback
- [ ] Fix critical bugs
- [ ] Answer user questions

### 8.2 Weekly Tasks

- [ ] Analyze usage metrics
- [ ] Review cost vs. budget
- [ ] Plan feature improvements
- [ ] Update documentation
- [ ] Deploy bug fixes

### 8.3 Monthly Tasks

- [ ] Review overall performance
- [ ] Analyze user retention
- [ ] Plan next features
- [ ] Optimize costs
- [ ] Update dependencies

---

## 🚨 Troubleshooting

### Build Fails

**Error:** TypeScript errors

```bash
npm run type-check
# Fix all type errors before deploying
```

**Error:** Missing dependencies

```bash
npm install
npm run build
```

### Deployment Fails

**Error:** Environment variables not set

1. Go to Vercel Dashboard > Settings > Environment Variables
2. Verify all required variables are set
3. Redeploy

**Error:** Database connection fails

1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Test connection from local machine
4. Check Supabase project is running

### API Errors in Production

**Error:** 500 Internal Server Error

1. Check Vercel logs (Dashboard > Deployments > Latest > Logs)
2. Look for error messages
3. Verify all environment variables are set
4. Check Sentry for detailed error info

**Error:** 401 Unauthorized

- This is expected for protected endpoints without authentication
- User must be logged in to access protected routes

**Error:** 429 Too Many Requests

- Rate limiting is working correctly
- User exceeded 100-200 requests in 15 minutes
- Wait for rate limit window to reset

### Performance Issues

**Slow API responses:**
1. Check Vercel Analytics for response times
2. Optimize database queries if needed
3. Consider caching frequently accessed data

**High costs:**
1. Check Google Cloud billing dashboard
2. Review AI API usage
3. Optimize prompts for cost efficiency
4. Consider implementing usage limits per user

---

## 📊 Success Metrics

### Launch Day (Day 0)
- [ ] 0 critical errors
- [ ] All APIs responding
- [ ] 5-10 beta sign-ups
- [ ] First content created

### Week 1
- [ ] 10-20 beta users
- [ ] 50+ creations
- [ ] >99% uptime
- [ ] <$50 in AI API costs
- [ ] 5+ pieces of feedback

### Month 1
- [ ] 50+ active users
- [ ] 500+ creations
- [ ] <1% error rate
- [ ] <$500 in total costs
- [ ] 20+ positive feedback responses

---

## 🎉 Launch Checklist

Before announcing publicly:

- [x] Code complete and tested
- [x] Security implemented
- [ ] Deployed to production
- [ ] Health check passing
- [ ] All APIs working
- [ ] Monitoring set up
- [ ] Beta users recruited
- [ ] Feedback form ready
- [ ] Onboarding guide created
- [ ] Support email set up
- [ ] Cost tracking enabled
- [ ] Backup plan ready

---

## 📞 Support

### For Technical Issues
- Check Vercel logs first
- Review Sentry errors (if enabled)
- Check Supabase dashboard for database issues
- Review Google Cloud console for API issues

### For User Issues
- Set up support email: support@arcanea.ai
- Respond within 24 hours during beta
- Keep FAQ document updated

---

**Deployment Status:** Ready to Deploy
**Estimated Time:** 2-4 hours
**Next Step:** Execute Step 1 (Set Up Production Supabase)

*"Let's ship this magical experience to the world!"* 🚀✨
