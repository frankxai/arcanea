-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
-- Purpose: Secure data access patterns ensuring users can only access
--          their own data while allowing public read for creator profiles
-- =====================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminors ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE luminor_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- PROFILES POLICIES
-- =====================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can view public profiles (for creator discovery)
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (is_active = TRUE);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger on auth.users)
CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =====================================================================
-- LUMINORS POLICIES
-- =====================================================================

-- Everyone can view active/public Luminors
CREATE POLICY "Anyone can view public Luminors"
    ON luminors FOR SELECT
    USING (is_active = TRUE AND is_public = TRUE);

-- Only authenticated users can interact with Luminors
-- (No direct INSERT/UPDATE for users on luminors table)

-- =====================================================================
-- CONVERSATIONS POLICIES
-- =====================================================================

-- Users can view their own conversations
CREATE POLICY "Users can view own conversations"
    ON luminor_conversations FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own conversations
CREATE POLICY "Users can create own conversations"
    ON luminor_conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own conversations
CREATE POLICY "Users can update own conversations"
    ON luminor_conversations FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own conversations
CREATE POLICY "Users can delete own conversations"
    ON luminor_conversations FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================================
-- MESSAGES POLICIES
-- =====================================================================

-- Users can view messages in their conversations
CREATE POLICY "Users can view own messages"
    ON luminor_messages FOR SELECT
    USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM luminor_conversations
            WHERE luminor_conversations.id = luminor_messages.conversation_id
            AND luminor_conversations.user_id = auth.uid()
        )
    );

-- Users can create messages in their conversations
CREATE POLICY "Users can create own messages"
    ON luminor_messages FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM luminor_conversations
            WHERE luminor_conversations.id = conversation_id
            AND luminor_conversations.user_id = auth.uid()
        )
    );

-- Users can update their own messages (for ratings/feedback)
CREATE POLICY "Users can update own messages"
    ON luminor_messages FOR UPDATE
    USING (auth.uid() = user_id);

-- =====================================================================
-- RELATIONSHIPS POLICIES
-- =====================================================================

-- Users can view their own Luminor relationships
CREATE POLICY "Users can view own relationships"
    ON luminor_relationships FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own relationships
CREATE POLICY "Users can create own relationships"
    ON luminor_relationships FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own relationships
CREATE POLICY "Users can update own relationships"
    ON luminor_relationships FOR UPDATE
    USING (auth.uid() = user_id);

-- =====================================================================
-- CREATIONS POLICIES
-- =====================================================================

-- Users can view their own creations (all statuses)
CREATE POLICY "Users can view own creations"
    ON creations FOR SELECT
    USING (auth.uid() = user_id);

-- Anyone can view published public creations
CREATE POLICY "Anyone can view published creations"
    ON creations FOR SELECT
    USING (is_public = TRUE AND status = 'published');

-- Users can create their own creations
CREATE POLICY "Users can create own creations"
    ON creations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own creations
CREATE POLICY "Users can update own creations"
    ON creations FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own creations
CREATE POLICY "Users can delete own creations"
    ON creations FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================================
-- LIKES POLICIES
-- =====================================================================

-- Users can view likes on public creations
CREATE POLICY "Users can view likes on public creations"
    ON likes FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM creations
            WHERE creations.id = likes.creation_id
            AND creations.is_public = TRUE
        )
    );

-- Users can view their own likes
CREATE POLICY "Users can view own likes"
    ON likes FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own likes
CREATE POLICY "Users can create own likes"
    ON likes FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM creations
            WHERE creations.id = creation_id
            AND creations.is_public = TRUE
        )
    );

-- Users can delete their own likes
CREATE POLICY "Users can delete own likes"
    ON likes FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================================
-- COMMENTS POLICIES
-- =====================================================================

-- Anyone can view comments on public creations
CREATE POLICY "Anyone can view public comments"
    ON comments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM creations
            WHERE creations.id = comments.creation_id
            AND creations.is_public = TRUE
        )
    );

-- Users can create comments on public creations
CREATE POLICY "Users can create comments"
    ON comments FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM creations
            WHERE creations.id = creation_id
            AND creations.is_public = TRUE
        )
    );

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
    ON comments FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================================
-- FOLLOWS POLICIES
-- =====================================================================

-- Users can view their own follows (following list)
CREATE POLICY "Users can view own follows"
    ON follows FOR SELECT
    USING (auth.uid() = follower_id OR auth.uid() = following_id);

-- Anyone can view follow counts (for public profiles)
CREATE POLICY "Anyone can view follow relationships"
    ON follows FOR SELECT
    USING (TRUE); -- Controlled by profiles visibility

-- Users can create their own follows
CREATE POLICY "Users can create own follows"
    ON follows FOR INSERT
    WITH CHECK (auth.uid() = follower_id);

-- Users can delete their own follows (unfollow)
CREATE POLICY "Users can delete own follows"
    ON follows FOR DELETE
    USING (auth.uid() = follower_id);

-- =====================================================================
-- NOTIFICATIONS POLICIES
-- =====================================================================

-- Users can only view their own notifications
CREATE POLICY "Users can view own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

-- System can create notifications (done via service role)
-- No INSERT policy for users

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
    ON notifications FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================================
-- HELPER FUNCTIONS FOR RLS
-- =====================================================================

-- Check if user is creator of a creation
CREATE OR REPLACE FUNCTION is_creation_owner(creation_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM creations
        WHERE id = creation_id AND creations.user_id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if creation is public
CREATE OR REPLACE FUNCTION is_creation_public(creation_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM creations
        WHERE id = creation_id AND is_public = TRUE AND status = 'published'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- GRANT PERMISSIONS
-- =====================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT SELECT ON profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON profiles TO authenticated;

GRANT SELECT ON luminors TO anon, authenticated;

GRANT ALL ON luminor_conversations TO authenticated;
GRANT ALL ON luminor_messages TO authenticated;
GRANT ALL ON luminor_relationships TO authenticated;
GRANT ALL ON creations TO authenticated;
GRANT ALL ON likes TO authenticated;
GRANT ALL ON comments TO authenticated;
GRANT ALL ON follows TO authenticated;
GRANT ALL ON notifications TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================================
-- COMMENTS
-- =====================================================================

COMMENT ON POLICY "Users can view own profile" ON profiles IS
    'Users can always view their complete profile data';

COMMENT ON POLICY "Public profiles are viewable by everyone" ON profiles IS
    'Active user profiles are discoverable for social features';

COMMENT ON POLICY "Anyone can view published creations" ON creations IS
    'Published public creations are visible to everyone for discovery';

COMMENT ON POLICY "Users can create comments" ON comments IS
    'Authenticated users can comment on public creations';
