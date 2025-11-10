# Profile & Gallery Setup Guide

## Quick Start

This guide will help you set up and integrate the Profile & Gallery system into your Arcanea MVP.

## Prerequisites

- Node.js 18+ installed
- Next.js 14+ app
- Supabase account and project
- Basic understanding of React and TypeScript

## Installation

All components are already created in the correct locations. No additional packages are required beyond what's already in `package.json`:

```json
{
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.302.0"
  }
}
```

## Database Setup

### 1. Create Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  social_links JSONB DEFAULT '{}',
  privacy_settings JSONB DEFAULT '{"show_email": false, "show_creations": true, "allow_follows": true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Creations table
CREATE TABLE creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'project', 'composition')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  prompt TEXT,
  luminor_id TEXT,
  academy TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stats table (materialized view)
CREATE TABLE creation_stats (
  creation_id UUID PRIMARY KEY REFERENCES creations(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0
);

-- Luminor bonds table
CREATE TABLE luminor_bonds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  luminor_id TEXT NOT NULL,
  luminor_name TEXT NOT NULL,
  luminor_avatar TEXT,
  academy TEXT NOT NULL,
  bond_level INTEGER DEFAULT 0 CHECK (bond_level >= 0 AND bond_level <= 100),
  total_conversations INTEGER DEFAULT 0,
  personality_compatibility INTEGER DEFAULT 0 CHECK (personality_compatibility >= 0 AND personality_compatibility <= 100),
  last_interaction TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, luminor_id)
);

-- Follows table
CREATE TABLE follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Likes table
CREATE TABLE likes (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  creation_id UUID NOT NULL REFERENCES creations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, creation_id)
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creation_id UUID NOT NULL REFERENCES creations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_creations_user_id ON creations(user_id);
CREATE INDEX idx_creations_created_at ON creations(created_at DESC);
CREATE INDEX idx_creations_type ON creations(type);
CREATE INDEX idx_creations_user_created ON creations(user_id, created_at DESC);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
CREATE INDEX idx_likes_creation ON likes(creation_id);
CREATE INDEX idx_comments_creation ON comments(creation_id);
CREATE INDEX idx_luminor_bonds_user ON luminor_bonds(user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creations_updated_at
  BEFORE UPDATE ON creations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2. Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE creation_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_bonds ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Creations policies
CREATE POLICY "Public creations are viewable by everyone"
  ON creations FOR SELECT
  USING (true);

CREATE POLICY "Users can create own creations"
  ON creations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own creations"
  ON creations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own creations"
  ON creations FOR DELETE
  USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can follow others"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can like creations"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike creations"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);
```

### 3. Functions and Triggers

```sql
-- Increment likes count
CREATE OR REPLACE FUNCTION increment_creation_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE creation_stats
  SET likes = likes + 1
  WHERE creation_id = NEW.creation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_added
  AFTER INSERT ON likes
  FOR EACH ROW
  EXECUTE FUNCTION increment_creation_likes();

-- Decrement likes count
CREATE OR REPLACE FUNCTION decrement_creation_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE creation_stats
  SET likes = likes - 1
  WHERE creation_id = OLD.creation_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_removed
  AFTER DELETE ON likes
  FOR EACH ROW
  EXECUTE FUNCTION decrement_creation_likes();

-- Increment comments count
CREATE OR REPLACE FUNCTION increment_creation_comments()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE creation_stats
  SET comments = comments + 1
  WHERE creation_id = NEW.creation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_added
  AFTER INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION increment_creation_comments();

-- Initialize stats on creation insert
CREATE OR REPLACE FUNCTION initialize_creation_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO creation_stats (creation_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_creation_created
  AFTER INSERT ON creations
  FOR EACH ROW
  EXECUTE FUNCTION initialize_creation_stats();
```

## API Routes Setup

Create these API routes in `/apps/web/app/api/`:

### Example: Get Profile

```typescript
// app/api/profiles/[username]/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      *,
      creations:creations(count),
      followers:follows!following_id(count),
      following:follows!follower_id(count)
    `)
    .eq('username', params.username)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json(profile);
}
```

## Environment Variables

Add to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Storage (for image uploads)
NEXT_PUBLIC_STORAGE_BUCKET=creations
```

## Storage Buckets

Create these storage buckets in Supabase:

1. **avatars** - For profile pictures
2. **creations** - For user creations
3. **thumbnails** - For optimized thumbnails

### Bucket Policies

```sql
-- Allow public read access to avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their avatars
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Testing

### Seed Data

```sql
-- Insert test profile
INSERT INTO profiles (id, username, display_name, bio)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'testuser',
  'Test User',
  'AI artist exploring the cosmos'
);

-- Insert test creation
INSERT INTO creations (user_id, title, type, media_url, academy)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'Cosmic Landscape',
  'image',
  'https://picsum.photos/800/800',
  'Lumina'
);

-- Insert test Luminor bond
INSERT INTO luminor_bonds (user_id, luminor_id, luminor_name, academy, bond_level, total_conversations)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'aria',
  'Aria',
  'Lumina',
  85,
  142
);
```

### Test Pages

Visit these URLs to test:

- http://localhost:3001/profile/testuser
- http://localhost:3001/profile/edit
- http://localhost:3001/discover

## Common Issues & Solutions

### 1. Images Not Loading

**Problem:** Images show broken links or don't load.

**Solution:**
- Check CORS settings in Supabase Storage
- Verify bucket policies are correct
- Ensure URLs are absolute paths

### 2. Optimistic Updates Not Working

**Problem:** UI doesn't update immediately when liking/following.

**Solution:**
- Verify state is being updated before API call
- Check error handling is reverting state
- Ensure React Query or SWR is configured correctly

### 3. Profile Not Found

**Problem:** Profile page shows 404 error.

**Solution:**
- Verify username exists in database
- Check RLS policies allow read access
- Ensure route parameters are correct

### 4. Slow Gallery Loading

**Problem:** Gallery takes too long to load.

**Solution:**
- Implement pagination/infinite scroll
- Use thumbnail URLs instead of full images
- Add database indexes on query columns
- Enable CDN for image delivery

## Next Steps

1. **Implement API Routes:** Create the actual API endpoints referenced in the hooks
2. **Connect to Supabase:** Replace mock data with real database queries
3. **Add Image Upload:** Implement file upload to Supabase Storage
4. **Add Authentication:** Integrate with your auth system
5. **Deploy:** Follow Vercel/Netlify deployment guides

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues or questions:
1. Check the main documentation in `/docs/mvp/PROFILE_GALLERY.md`
2. Review component source code for inline comments
3. Search existing GitHub issues
4. Create a new issue with detailed information

---

**Created for Arcanea MVP** | Last Updated: 2025-01-24
