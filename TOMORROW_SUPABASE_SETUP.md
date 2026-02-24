# Arcanea - Supabase Setup & Production Build

> **Date Created:** January 3, 2026
> **Status:** Ready for Supabase implementation
> **Goal:** Replace stubs with real database, build for users

---

## Current State

### What's Working
- UI pages: Home, Studio, Academy, Bestiary
- Design system and components
- Content system (Library of Arcanea)
- AI SDK integration (Gemini)

### What's Broken (74 TypeScript Errors)
The database layer has **stub implementations** that don't match what the API routes expect. We need to either:
1. Build real Supabase services, OR
2. Update all API routes to match stubs (temporary)

**Recommendation:** Build real Supabase services - it's the right time.

---

## Step 1: Supabase Project Setup

### 1.1 Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Create new project: `arcanea-prod` (or use existing)
3. Save these credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJ...`
   - Service Role Key: `eyJ...` (keep secret!)

### 1.2 Update Environment Variables
Edit `/mnt/c/Users/Frank/Arcanea/apps/web/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google AI (already configured)
GOOGLE_GENERATIVE_AI_API_KEY=your-key
```

---

## Step 2: Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  location TEXT,
  website TEXT,
  -- Arcanea-specific
  magic_rank TEXT DEFAULT 'Apprentice',
  gates_open INTEGER DEFAULT 0,
  primary_element TEXT,
  house TEXT,
  -- Stats
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  creations_count INTEGER DEFAULT 0,
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CREATIONS
-- ============================================
CREATE TABLE creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT NOT NULL, -- 'image', 'text', 'music', 'video', 'mixed'
  -- Media
  thumbnail_url TEXT,
  media_urls TEXT[], -- Array of URLs
  -- Arcanea-specific
  element TEXT, -- Fire, Water, Earth, Wind, Void
  gate TEXT, -- Which of the 10 gates
  guardian TEXT, -- Associated guardian
  -- Visibility
  is_public BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  -- Stats
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  -- Metadata
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SOCIAL: FOLLOWS
-- ============================================
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- ============================================
-- SOCIAL: LIKES
-- ============================================
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL, -- 'creation', 'comment'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_id, target_type)
);

-- ============================================
-- SOCIAL: COMMENTS
-- ============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL, -- 'creation', 'post'
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'follow', 'like', 'comment', 'mention', 'system'
  title TEXT NOT NULL,
  message TEXT,
  actor_id UUID REFERENCES profiles(id),
  target_id UUID,
  target_type TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LUMINOR BONDS (AI Companions)
-- ============================================
CREATE TABLE luminor_bonds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  luminor_id TEXT NOT NULL, -- e.g., 'lyria', 'draconia'
  bond_level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  unlocked_abilities TEXT[],
  conversation_count INTEGER DEFAULT 0,
  last_interaction TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, luminor_id)
);

CREATE TABLE luminor_memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bond_id UUID NOT NULL REFERENCES luminor_bonds(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL, -- 'conversation', 'creation', 'milestone'
  content TEXT NOT NULL,
  importance INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITY FEED
-- ============================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'creation', 'follow', 'like', 'comment', 'level_up'
  target_id UUID,
  target_type TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_creations_user ON creations(user_id);
CREATE INDEX idx_creations_public ON creations(is_public) WHERE is_public = true;
CREATE INDEX idx_creations_element ON creations(element);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_likes_target ON likes(target_id, target_type);
CREATE INDEX idx_comments_target ON comments(target_id, target_type);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_luminor_bonds_user ON luminor_bonds(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_bonds ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, own write
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Creations: Public read for public creations, own write
CREATE POLICY "Public creations are viewable" ON creations FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view own creations" ON creations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own creations" ON creations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own creations" ON creations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own creations" ON creations FOR DELETE USING (auth.uid() = user_id);

-- Follows: Public read, own write
CREATE POLICY "Follows are viewable" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can follow" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Likes: Public read, own write
CREATE POLICY "Likes are viewable" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Comments: Public read, own write
CREATE POLICY "Comments are viewable" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can comment" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Notifications: Own only
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Luminor Bonds: Own only
CREATE POLICY "Users can view own bonds" ON luminor_bonds FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own bonds" ON luminor_bonds FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bonds" ON luminor_bonds FOR UPDATE USING (auth.uid() = user_id);

-- Luminor Memories: Through bond ownership
CREATE POLICY "Users can view own memories" ON luminor_memories FOR SELECT
  USING (EXISTS (SELECT 1 FROM luminor_bonds WHERE id = bond_id AND user_id = auth.uid()));

-- Activities: Public read
CREATE POLICY "Activities are viewable" ON activities FOR SELECT USING (true);
CREATE POLICY "Users can create own activities" ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## Step 3: Enable Auth

In Supabase Dashboard:
1. Go to **Authentication** > **Providers**
2. Enable:
   - Email (for development)
   - Google (for production)
   - Discord (optional - good for creators)

---

## Step 4: What Claude Will Do

Once Supabase is set up, tell Claude:

> "Supabase is ready. Replace all database service stubs with real Supabase queries. Fix all TypeScript errors. Make the app production-ready."

Claude will:
1. Update `lib/database/services/*.ts` with real Supabase queries
2. Fix all 74 TypeScript errors
3. Update API routes to work with real data
4. Test the build

---

## Step 5: Deploy Checklist

After database is working:

- [ ] Run `pnpm build` successfully
- [ ] Test auth flow (sign up, sign in)
- [ ] Test creation flow (create, view, like)
- [ ] Test social features (follow, comment)
- [ ] Test Luminor bonding
- [ ] Deploy to Vercel
- [ ] Connect custom domain

---

## Quick Reference

### Start Dev Server
```bash
carc  # Opens Claude in Arcanea
# Then in another terminal:
cd /mnt/c/Users/Frank/Arcanea/apps/web && pnpm dev
```

### Type Check
```bash
cd /mnt/c/Users/Frank/Arcanea/apps/web && pnpm type-check
```

### Build
```bash
cd /mnt/c/Users/Frank/Arcanea/apps/web && pnpm build
```

---

## Files That Need Updating

When implementing real Supabase:

```
apps/web/lib/database/services/
├── activity-service.ts      # Replace stub
├── comment-service.ts       # Replace stub
├── creation-service.ts      # Replace stub
├── follow-service.ts        # Replace stub
├── like-service.ts          # Replace stub
├── luminor-service.ts       # Replace stub
├── notification-service.ts  # Replace stub
└── profile-service.ts       # Replace stub
```

---

*Enter seeking, leave transformed, return whenever needed.*
