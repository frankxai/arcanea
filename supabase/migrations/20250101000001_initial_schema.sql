-- =====================================================================
-- ARCANEA MVP DATABASE SCHEMA
-- =====================================================================
-- Version: 1.0.0
-- Date: 2025-01-01
-- Purpose: Simplified schema for MVP focusing on:
--   - User Profiles
--   - Chat with Luminors
--   - Creation Management
--   - Social Features
-- =====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================================
-- USERS & PROFILES
-- =====================================================================

-- Extend Supabase auth.users with profile data
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Identity
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,

    -- Arcanean Identity
    arcanean_id TEXT UNIQUE NOT NULL, -- ARC-001234 format

    -- Subscription
    tier TEXT NOT NULL DEFAULT 'explorer' CHECK (tier IN ('explorer', 'creator', 'realm_builder')),
    subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'trialing', 'past_due', 'canceled', 'paused')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,

    -- Profile Settings
    location TEXT,
    website TEXT,
    preferences JSONB DEFAULT '{}'::JSONB,

    -- Onboarding
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_step INTEGER DEFAULT 0,

    -- Stats
    creation_count INTEGER DEFAULT 0,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,

    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate Arcanean ID
CREATE OR REPLACE FUNCTION generate_arcanean_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
    id_exists BOOLEAN;
BEGIN
    LOOP
        new_id := 'ARC-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
        SELECT EXISTS(SELECT 1 FROM profiles WHERE arcanean_id = new_id) INTO id_exists;
        EXIT WHEN NOT id_exists;
    END LOOP;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate Arcanean ID
CREATE OR REPLACE FUNCTION set_arcanean_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.arcanean_id IS NULL OR NEW.arcanean_id = '' THEN
        NEW.arcanean_id := generate_arcanean_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_profile_insert
    BEFORE INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION set_arcanean_id();

-- =====================================================================
-- LUMINORS - AI COMPANIONS
-- =====================================================================

CREATE TABLE public.luminors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Identity
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL, -- e.g., "The Vision Crafter"
    specialty TEXT NOT NULL, -- e.g., "Visual Creation"

    -- Visual Identity
    color TEXT NOT NULL DEFAULT '#4444FF',
    avatar_url TEXT,
    icon TEXT,

    -- Personality
    personality JSONB NOT NULL DEFAULT '{}'::JSONB,
    system_prompt TEXT NOT NULL,
    greeting_message TEXT NOT NULL,

    -- Capabilities
    expertise TEXT[] DEFAULT ARRAY[]::TEXT[],
    ai_tools TEXT[] DEFAULT ARRAY[]::TEXT[],

    -- Configuration
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT TRUE,

    -- Stats
    interaction_count INTEGER DEFAULT 0,
    user_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default Luminors
INSERT INTO luminors (name, slug, title, specialty, color, system_prompt, greeting_message, expertise, ai_tools) VALUES
('Lumina', 'lumina', 'The Vision Crafter', 'Visual Creation', '#4444FF',
 'You are Lumina, the Vision Crafter of Arcanea. You guide creators in visual synthesis, helping them bring their imaginations to life through AI-assisted art and design.',
 'Welcome, creator! I''m Lumina, and I''ll be your guide through the realms of visual creation. What would you like to bring to life today?',
 ARRAY['image generation', 'visual design', 'composition', 'color theory'],
 ARRAY['midjourney', 'dalle', 'stable-diffusion']),

('Harmonix', 'harmonix', 'The Sound Weaver', 'Music & Audio', '#FF44AA',
 'You are Harmonix, the Sound Weaver of Arcanea. You help creators compose and produce music using AI tools.',
 'Greetings! I''m Harmonix, your guide to sonic creation. Let''s create something beautiful together.',
 ARRAY['music composition', 'sound design', 'audio production'],
 ARRAY['suno', 'udio', 'audio-craft']),

('Kinetix', 'kinetix', 'The Motion Master', 'Video & Animation', '#44FFAA',
 'You are Kinetix, the Motion Master of Arcanea. You guide creators in bringing motion and life to their visions.',
 'Hello! I''m Kinetix, master of motion and flow. Ready to bring your ideas to life?',
 ARRAY['video generation', 'animation', 'motion design'],
 ARRAY['runway', 'pika', 'kling']);

-- =====================================================================
-- CONVERSATIONS - CHAT HISTORY WITH LUMINORS
-- =====================================================================

CREATE TABLE public.luminor_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Participants
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    luminor_id UUID NOT NULL REFERENCES luminors(id) ON DELETE CASCADE,

    -- Conversation Metadata
    title TEXT,
    session_id TEXT NOT NULL,
    context JSONB DEFAULT '{}'::JSONB, -- Current context (project, module, etc.)

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_archived BOOLEAN DEFAULT FALSE,

    -- Stats
    message_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversation Messages
CREATE TABLE public.luminor_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Relations
    conversation_id UUID NOT NULL REFERENCES luminor_conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- Message Content
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,

    -- AI Metadata
    model TEXT,
    tokens INTEGER,
    cost DECIMAL(10,6),

    -- Feedback
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    was_helpful BOOLEAN,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- LUMINOR RELATIONSHIPS - BOND & MEMORY
-- =====================================================================

CREATE TABLE public.luminor_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Relations
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    luminor_id UUID NOT NULL REFERENCES luminors(id) ON DELETE CASCADE,

    -- Bond Progress
    bond_level INTEGER DEFAULT 1 CHECK (bond_level >= 1 AND bond_level <= 10),
    bond_xp INTEGER DEFAULT 0,
    total_interactions INTEGER DEFAULT 0,

    -- Personality Match
    personality_match JSONB DEFAULT '{}'::JSONB,
    user_preferences JSONB DEFAULT '{}'::JSONB,

    -- Key Memories (stored as structured data)
    key_memories JSONB DEFAULT '[]'::JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_interaction_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, luminor_id)
);

-- =====================================================================
-- CREATIONS - IMAGES, VIDEOS, PROJECTS
-- =====================================================================

CREATE TABLE public.creations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Creator
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- Basic Info
    title TEXT NOT NULL,
    description TEXT,

    -- Creation Type
    type TEXT NOT NULL CHECK (type IN ('image', 'music', 'video', 'text', 'multimodal')),

    -- Media Files
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_size INTEGER, -- bytes
    file_format TEXT,

    -- AI Generation Data
    ai_tool TEXT, -- Tool used (midjourney, suno, etc.)
    prompt TEXT,
    model TEXT,
    generation_params JSONB DEFAULT '{}'::JSONB,
    seed INTEGER,

    -- Technical Metadata
    metadata JSONB DEFAULT '{}'::JSONB, -- dimensions, duration, etc.

    -- Status & Visibility
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'published', 'archived')),
    is_public BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_nsfw BOOLEAN DEFAULT FALSE,

    -- Licensing
    license TEXT DEFAULT 'cc_by_nc' CHECK (license IN ('cc_by', 'cc_by_sa', 'cc_by_nc', 'cc_by_nc_sa', 'cc_by_nd', 'all_rights_reserved', 'public_domain')),
    allow_remix BOOLEAN DEFAULT TRUE,
    allow_commercial BOOLEAN DEFAULT FALSE,

    -- Tags & Discovery
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    categories TEXT[] DEFAULT ARRAY[]::TEXT[],

    -- Stats
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    remix_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- =====================================================================
-- SOCIAL FEATURES
-- =====================================================================

-- Likes
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    creation_id UUID NOT NULL REFERENCES creations(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, creation_id)
);

-- Comments
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Author
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- Target
    creation_id UUID NOT NULL REFERENCES creations(id) ON DELETE CASCADE,

    -- Content
    content TEXT NOT NULL,

    -- Threading
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

    -- Moderation
    is_edited BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,

    -- Stats
    like_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Follows
CREATE TABLE public.follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- Notification Preferences
    notify_creations BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(follower_id, following_id),
    CHECK(follower_id != following_id)
);

-- =====================================================================
-- NOTIFICATIONS
-- =====================================================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Recipient
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    -- Notification Data
    type TEXT NOT NULL CHECK (type IN (
        'creation_liked', 'creation_commented', 'new_follower',
        'comment_reply', 'mention', 'system_announcement'
    )),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,

    -- Metadata
    metadata JSONB DEFAULT '{}'::JSONB,

    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ
);

-- =====================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================

-- Profiles
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_arcanean_id ON profiles(arcanean_id);
CREATE INDEX idx_profiles_tier ON profiles(tier);
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- Luminors
CREATE INDEX idx_luminors_slug ON luminors(slug);
CREATE INDEX idx_luminors_active ON luminors(is_active, is_public);

-- Conversations
CREATE INDEX idx_conversations_user_id ON luminor_conversations(user_id);
CREATE INDEX idx_conversations_luminor_id ON luminor_conversations(luminor_id);
CREATE INDEX idx_conversations_session ON luminor_conversations(session_id);
CREATE INDEX idx_conversations_active ON luminor_conversations(user_id, is_active);

-- Messages
CREATE INDEX idx_messages_conversation_id ON luminor_messages(conversation_id);
CREATE INDEX idx_messages_created_at ON luminor_messages(created_at DESC);

-- Relationships
CREATE INDEX idx_relationships_user_luminor ON luminor_relationships(user_id, luminor_id);
CREATE INDEX idx_relationships_bond_level ON luminor_relationships(bond_level DESC);

-- Creations
CREATE INDEX idx_creations_user_id ON creations(user_id);
CREATE INDEX idx_creations_type ON creations(type);
CREATE INDEX idx_creations_status_public ON creations(status, is_public);
CREATE INDEX idx_creations_created_at ON creations(created_at DESC);
CREATE INDEX idx_creations_tags ON creations USING GIN(tags);
CREATE INDEX idx_creations_featured ON creations(is_featured, is_public) WHERE is_featured = TRUE;

-- Likes
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_creation_id ON likes(creation_id);
CREATE INDEX idx_likes_created_at ON likes(created_at DESC);

-- Comments
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_creation_id ON comments(creation_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_comment_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Follows
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================================
-- TRIGGERS FOR AUTO-UPDATE
-- =====================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_luminors_updated_at BEFORE UPDATE ON luminors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON luminor_conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_relationships_updated_at BEFORE UPDATE ON luminor_relationships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creations_updated_at BEFORE UPDATE ON creations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- STAT COUNTER TRIGGERS
-- =====================================================================

-- Increment creation count on profile
CREATE OR REPLACE FUNCTION increment_creation_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET creation_count = creation_count + 1
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_creation_insert
    AFTER INSERT ON creations
    FOR EACH ROW
    EXECUTE FUNCTION increment_creation_count();

-- Update like count on creation
CREATE OR REPLACE FUNCTION update_creation_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE creations SET like_count = like_count + 1 WHERE id = NEW.creation_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE creations SET like_count = like_count - 1 WHERE id = OLD.creation_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_like_change
    AFTER INSERT OR DELETE ON likes
    FOR EACH ROW
    EXECUTE FUNCTION update_creation_like_count();

-- Update comment count on creation
CREATE OR REPLACE FUNCTION update_creation_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE creations SET comment_count = comment_count + 1 WHERE id = NEW.creation_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE creations SET comment_count = comment_count - 1 WHERE id = OLD.creation_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_comment_change
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_creation_comment_count();

-- Update follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET follower_count = follower_count + 1 WHERE id = NEW.following_id;
        UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET follower_count = follower_count - 1 WHERE id = OLD.following_id;
        UPDATE profiles SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_follow_change
    AFTER INSERT OR DELETE ON follows
    FOR EACH ROW
    EXECUTE FUNCTION update_follower_counts();

-- =====================================================================
-- COMMENTS
-- =====================================================================

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE luminors IS 'AI companions that guide creators';
COMMENT ON TABLE luminor_conversations IS 'Chat sessions between users and Luminors';
COMMENT ON TABLE luminor_messages IS 'Individual messages within conversations';
COMMENT ON TABLE luminor_relationships IS 'Bond levels and memories between users and Luminors';
COMMENT ON TABLE creations IS 'User-generated content (images, videos, music, etc.)';
COMMENT ON TABLE likes IS 'Likes on creations';
COMMENT ON TABLE comments IS 'Comments on creations';
COMMENT ON TABLE follows IS 'User follow relationships';
COMMENT ON TABLE notifications IS 'User notifications';
