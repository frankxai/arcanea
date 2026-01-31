-- ============================================================
-- Arcanea Ecosystem Database Setup
-- Complete Supabase schema with RLS policies
-- Version: 3.0.0
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
    theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light', 'auto')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
    ON profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" 
    ON profiles FOR DELETE 
    USING (auth.uid() = id);

-- ============================================================
-- GAME STATE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS game_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    agents_summoned INTEGER DEFAULT 0,
    skills_mastered INTEGER DEFAULT 0,
    completed_challenges INTEGER DEFAULT 0,
    manifestations INTEGER DEFAULT 0,
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    settings JSONB DEFAULT '{}',
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own game state" 
    ON game_state FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game state" 
    ON game_state FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game state" 
    ON game_state FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own game state" 
    ON game_state FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- BUSINESS STATE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS business_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    revenue JSONB DEFAULT '{"monthly": 0, "outstanding": 0, "ytd": 0, "projected": 0}'::jsonb,
    settings JSONB DEFAULT '{"hourlyRate": 100, "currency": "USD", "businessName": "My Business"}'::jsonb,
    clients JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    invoices JSONB DEFAULT '[]'::jsonb,
    time_entries JSONB DEFAULT '[]'::jsonb,
    tasks JSONB DEFAULT '[]'::jsonb,
    content_pipeline JSONB DEFAULT '{"ideas": [], "drafting": [], "review": [], "published": []}'::jsonb,
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE business_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own business state" 
    ON business_state FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own business state" 
    ON business_state FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business state" 
    ON business_state FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own business state" 
    ON business_state FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- GAMEDEV STATE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS gamedev_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    games JSONB DEFAULT '[]'::jsonb,
    assets JSONB DEFAULT '{"visual": [], "audio": []}'::jsonb,
    characters JSONB DEFAULT '[]'::jsonb,
    levels JSONB DEFAULT '[]'::jsonb,
    playtest_sessions JSONB DEFAULT '[]'::jsonb,
    bugs JSONB DEFAULT '[]'::jsonb,
    gdd_sections JSONB DEFAULT '[]'::jsonb,
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE gamedev_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own gamedev state" 
    ON gamedev_state FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gamedev state" 
    ON gamedev_state FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gamedev state" 
    ON gamedev_state FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gamedev state" 
    ON gamedev_state FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- AGENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id TEXT NOT NULL,
    name TEXT NOT NULL,
    element TEXT NOT NULL,
    icon TEXT,
    summoned BOOLEAN DEFAULT FALSE,
    bonded BOOLEAN DEFAULT FALSE,
    bond_level INTEGER DEFAULT 0,
    bond_progress INTEGER DEFAULT 0,
    max_bond_progress INTEGER DEFAULT 100,
    abilities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, agent_id)
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own agents" 
    ON agents FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agents" 
    ON agents FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agents" 
    ON agents FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own agents" 
    ON agents FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- SKILLS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL,
    name TEXT NOT NULL,
    element TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    max_xp INTEGER DEFAULT 1000,
    icon TEXT,
    unlocked BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, skill_id)
);

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own skills" 
    ON skills FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills" 
    ON skills FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills" 
    ON skills FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills" 
    ON skills FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- CHALLENGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL,
    element TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty INTEGER DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    xp_reward INTEGER DEFAULT 100,
    rewards JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, challenge_id)
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own challenges" 
    ON challenges FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges" 
    ON challenges FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges" 
    ON challenges FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own challenges" 
    ON challenges FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- MANIFESTATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS manifestations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT,
    element TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE manifestations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own manifestations" 
    ON manifestations FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own manifestations" 
    ON manifestations FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own manifestations" 
    ON manifestations FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own manifestations" 
    ON manifestations FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- SYNC QUEUE TABLE (for offline operations)
-- ============================================================
CREATE TABLE IF NOT EXISTS sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    operation_type TEXT NOT NULL CHECK (operation_type IN ('insert', 'update', 'delete', 'upsert')),
    table_name TEXT NOT NULL,
    data JSONB NOT NULL,
    filters JSONB DEFAULT '{}'::jsonb,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own sync queue" 
    ON sync_queue FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sync queue items" 
    ON sync_queue FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sync queue items" 
    ON sync_queue FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sync queue items" 
    ON sync_queue FOR DELETE 
    USING (auth.uid() = user_id);

-- ============================================================
-- ACTIVITIES/AUDIT LOG TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own activities" 
    ON activities FOR SELECT 
    USING (auth.uid() = user_id);

-- Only service role can insert activities
CREATE POLICY "Service role can insert activities" 
    ON activities FOR INSERT 
    WITH CHECK (true); -- Actual restriction handled by application layer

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

CREATE INDEX IF NOT EXISTS idx_game_state_user_id ON game_state(user_id);
CREATE INDEX IF NOT EXISTS idx_business_state_user_id ON business_state(user_id);
CREATE INDEX IF NOT EXISTS idx_gamedev_state_user_id ON gamedev_state(user_id);

CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_element ON agents(element);
CREATE INDEX IF NOT EXISTS idx_agents_summoned ON agents(summoned);

CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_element ON skills(element);

CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_element ON challenges(element);
CREATE INDEX IF NOT EXISTS idx_challenges_completed ON challenges(completed);

CREATE INDEX IF NOT EXISTS idx_manifestations_user_id ON manifestations(user_id);
CREATE INDEX IF NOT EXISTS idx_manifestations_created ON manifestations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_sync_queue_user_id ON sync_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_queue_created ON sync_queue(created_at);
CREATE INDEX IF NOT EXISTS idx_sync_queue_processed ON sync_queue(processed_at) WHERE processed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created ON activities(created_at DESC);

-- ============================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (id, email, username, display_name, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        SPLIT_PART(NEW.email, '@', 1),
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        NOW()
    );
    
    -- Initialize game state
    INSERT INTO public.game_state (user_id, level, xp, joined_date)
    VALUES (NEW.id, 1, 0, NOW());
    
    -- Initialize business state
    INSERT INTO public.business_state (user_id)
    VALUES (NEW.id);
    
    -- Initialize gamedev state
    INSERT INTO public.gamedev_state (user_id)
    VALUES (NEW.id);
    
    -- Create default agents
    INSERT INTO public.agents (user_id, agent_id, name, element, icon)
    VALUES 
        (NEW.id, 'dragon-forge', 'Dragon-Forge', 'fire', '🐉'),
        (NEW.id, 'phoenix-artisan', 'Phoenix-Artisan', 'fire', '🔥'),
        (NEW.id, 'volcano-sculptor', 'Volcano-Sculptor', 'fire', '🌋'),
        (NEW.id, 'river-story', 'River-Story', 'water', '🌊'),
        (NEW.id, 'crystal-arch', 'Crystal-Arch', 'earth', '💎'),
        (NEW.id, 'void-gazer', 'Void-Gazer', 'void', '👁️');
    
    -- Create default skills
    INSERT INTO public.skills (user_id, skill_id, name, element, icon, unlocked)
    VALUES 
        (NEW.id, 'ignite', 'Ignition.Spark', 'fire', '🔥', true),
        (NEW.id, 'flow', 'Flow.Channel', 'water', '🌊', true),
        (NEW.id, 'foundation', 'Foundation.Stone', 'earth', '🗿', true);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to log activities
CREATE OR REPLACE FUNCTION log_activity(
    p_user_id UUID,
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
    v_activity_id UUID;
BEGIN
    INSERT INTO activities (user_id, action, entity_type, entity_id, metadata)
    VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_metadata)
    RETURNING id INTO v_activity_id;
    
    RETURN v_activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_stats JSONB;
BEGIN
    SELECT jsonb_build_object(
        'profile', jsonb_build_object(
            'display_name', p.display_name,
            'level', p.role,
            'joined_at', p.created_at
        ),
        'game', jsonb_build_object(
            'level', gs.level,
            'xp', gs.xp,
            'total_xp', gs.total_xp,
            'agents_summoned', gs.agents_summoned,
            'skills_mastered', gs.skills_mastered,
            'challenges_completed', gs.completed_challenges
        ),
        'agents_count', (SELECT COUNT(*) FROM agents WHERE user_id = p_user_id AND summoned = true),
        'skills_count', (SELECT COUNT(*) FROM skills WHERE user_id = p_user_id AND level > 1),
        'challenges_count', (SELECT COUNT(*) FROM challenges WHERE user_id = p_user_id AND completed = true),
        'manifestations_count', (SELECT COUNT(*) FROM manifestations WHERE user_id = p_user_id)
    ) INTO v_stats
    FROM profiles p
    LEFT JOIN game_state gs ON gs.user_id = p.id
    WHERE p.id = p_user_id;
    
    RETURN v_stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- SAMPLE DATA (for testing)
-- ============================================================

-- Default challenge templates (accessible to all users as templates)
CREATE TABLE IF NOT EXISTS challenge_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id TEXT UNIQUE NOT NULL,
    element TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty INTEGER DEFAULT 1,
    xp_reward INTEGER DEFAULT 100,
    rewards JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default challenges
INSERT INTO challenge_templates (challenge_id, element, title, description, difficulty, xp_reward) VALUES
    ('fire-01', 'fire', 'First Spark', 'Complete your first creative task', 1, 100),
    ('fire-02', 'fire', 'Ignition', 'Work for 2 hours without interruption', 2, 200),
    ('fire-03', 'fire', 'Blaze', 'Complete 5 tasks in one day', 3, 300),
    ('water-01', 'water', 'Flow State', 'Enter flow state for 30 minutes', 1, 100),
    ('water-02', 'water', 'Deep Dive', 'Work on a single project for 4 hours', 2, 200),
    ('water-03', 'water', 'Ocean', 'Complete a major milestone', 3, 400),
    ('earth-01', 'earth', 'Foundation', 'Set up your workspace', 1, 100),
    ('earth-02', 'earth', 'Structure', 'Create a project plan', 2, 200),
    ('earth-03', 'earth', 'Mountain', 'Complete a 30-day streak', 4, 500),
    ('wind-01', 'wind', 'Whisper', 'Share your first creation', 1, 100),
    ('wind-02', 'wind', 'Gale', 'Get feedback from 5 people', 2, 200),
    ('wind-03', 'wind', 'Storm', 'Publish a major work', 3, 400),
    ('void-01', 'void', 'Glimpse', 'Try something completely new', 1, 150),
    ('void-02', 'void', 'Threshold', 'Break a creative boundary', 2, 300),
    ('void-03', 'void', 'Infinity', 'Master a new skill', 3, 500);

-- Create index
CREATE INDEX IF NOT EXISTS idx_challenge_templates_element ON challenge_templates(element);

-- ============================================================
-- STORAGE BUCKETS (execute in Supabase Storage)
-- ============================================================
-- Note: These are executed via Supabase Dashboard or API
-- create bucket avatars;
-- create bucket manifestations;
-- create bucket game_assets;

-- ============================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================
-- Enable realtime for all tables
BEGIN;
  -- Add tables to realtime publication
  -- Execute these in Supabase SQL Editor
  -- alter publication supabase_realtime add table profiles;
  -- alter publication supabase_realtime add table game_state;
  -- alter publication supabase_realtime add table business_state;
  -- alter publication supabase_realtime add table gamedev_state;
  -- alter publication supabase_realtime add table agents;
  -- alter publication supabase_realtime add table skills;
  -- alter publication supabase_realtime add table challenges;
  -- alter publication supabase_realtime add table manifestations;
COMMIT;

-- ============================================================
-- GRANT PERMISSIONS
-- ============================================================
-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant access to anon (for specific operations)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON challenge_templates TO anon;

-- ============================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================
COMMENT ON TABLE profiles IS 'User profiles extending auth.users';
COMMENT ON TABLE game_state IS 'Player game progression and stats';
COMMENT ON TABLE business_state IS 'Solopreneur business data';
COMMENT ON TABLE gamedev_state IS 'Game development project data';
COMMENT ON TABLE agents IS 'Summoned elemental agents';
COMMENT ON TABLE skills IS 'Player skills with XP progression';
COMMENT ON TABLE challenges IS 'Completed challenges by element';
COMMENT ON TABLE manifestations IS 'User achievements and creations';
COMMENT ON TABLE sync_queue IS 'Pending offline operations';
COMMENT ON TABLE activities IS 'Audit log of user actions';
