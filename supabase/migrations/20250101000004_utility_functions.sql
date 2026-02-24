-- =====================================================================
-- UTILITY FUNCTIONS & PROCEDURES
-- =====================================================================
-- Purpose: Helper functions for common operations and business logic
-- =====================================================================

-- =====================================================================
-- USER PROFILE FUNCTIONS
-- =====================================================================

-- Create profile automatically when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::TEXT, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update last_active_at
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET last_active_at = NOW()
    WHERE id = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- CONVERSATION FUNCTIONS
-- =====================================================================

-- Create or get conversation
CREATE OR REPLACE FUNCTION get_or_create_conversation(
    p_user_id UUID,
    p_luminor_id UUID,
    p_session_id TEXT
)
RETURNS UUID AS $$
DECLARE
    v_conversation_id UUID;
BEGIN
    -- Try to find existing active conversation
    SELECT id INTO v_conversation_id
    FROM luminor_conversations
    WHERE user_id = p_user_id
        AND luminor_id = p_luminor_id
        AND session_id = p_session_id
        AND is_active = TRUE
    LIMIT 1;

    -- Create new conversation if not found
    IF v_conversation_id IS NULL THEN
        INSERT INTO luminor_conversations (user_id, luminor_id, session_id, title)
        VALUES (p_user_id, p_luminor_id, p_session_id, 'New Conversation')
        RETURNING id INTO v_conversation_id;

        -- Create or update relationship
        INSERT INTO luminor_relationships (user_id, luminor_id, total_interactions, last_interaction_at)
        VALUES (p_user_id, p_luminor_id, 0, NOW())
        ON CONFLICT (user_id, luminor_id) DO NOTHING;
    END IF;

    RETURN v_conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add message to conversation
CREATE OR REPLACE FUNCTION add_message_to_conversation(
    p_conversation_id UUID,
    p_user_id UUID,
    p_role TEXT,
    p_content TEXT,
    p_model TEXT DEFAULT NULL,
    p_tokens INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_message_id UUID;
    v_luminor_id UUID;
BEGIN
    -- Insert message
    INSERT INTO luminor_messages (conversation_id, user_id, role, content, model, tokens)
    VALUES (p_conversation_id, p_user_id, p_role, p_content, p_model, p_tokens)
    RETURNING id INTO v_message_id;

    -- Update conversation
    UPDATE luminor_conversations
    SET message_count = message_count + 1,
        last_message_at = NOW(),
        updated_at = NOW()
    WHERE id = p_conversation_id
    RETURNING luminor_id INTO v_luminor_id;

    -- Update relationship
    UPDATE luminor_relationships
    SET total_interactions = total_interactions + 1,
        bond_xp = bond_xp + 10,
        last_interaction_at = NOW()
    WHERE user_id = p_user_id AND luminor_id = v_luminor_id;

    -- Check for level up
    PERFORM check_bond_level_up(p_user_id, v_luminor_id);

    RETURN v_message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- LUMINOR RELATIONSHIP FUNCTIONS
-- =====================================================================

-- Check and update bond level
CREATE OR REPLACE FUNCTION check_bond_level_up(
    p_user_id UUID,
    p_luminor_id UUID
)
RETURNS VOID AS $$
DECLARE
    v_current_xp INTEGER;
    v_current_level INTEGER;
    v_new_level INTEGER;
    v_xp_required INTEGER;
BEGIN
    -- Get current XP and level
    SELECT bond_xp, bond_level INTO v_current_xp, v_current_level
    FROM luminor_relationships
    WHERE user_id = p_user_id AND luminor_id = p_luminor_id;

    -- Calculate XP required for next level (exponential: 100 * level^1.5)
    v_xp_required := FLOOR(100 * POWER(v_current_level, 1.5));

    -- Check if level up
    IF v_current_xp >= v_xp_required AND v_current_level < 10 THEN
        v_new_level := v_current_level + 1;

        UPDATE luminor_relationships
        SET bond_level = v_new_level,
            bond_xp = v_current_xp - v_xp_required,
            updated_at = NOW()
        WHERE user_id = p_user_id AND luminor_id = p_luminor_id;

        -- Create notification
        INSERT INTO notifications (user_id, type, title, message)
        VALUES (
            p_user_id,
            'system_announcement',
            'Bond Level Up!',
            'Your bond with your Luminor has reached level ' || v_new_level || '!'
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add key memory to relationship
CREATE OR REPLACE FUNCTION add_key_memory(
    p_user_id UUID,
    p_luminor_id UUID,
    p_memory_type TEXT,
    p_content TEXT,
    p_importance INTEGER DEFAULT 5
)
RETURNS UUID AS $$
DECLARE
    v_memory_id UUID;
    v_memory JSONB;
BEGIN
    v_memory_id := gen_random_uuid();

    v_memory := jsonb_build_object(
        'id', v_memory_id,
        'type', p_memory_type,
        'content', p_content,
        'importance', p_importance,
        'created_at', NOW()
    );

    UPDATE luminor_relationships
    SET key_memories = key_memories || v_memory
    WHERE user_id = p_user_id AND luminor_id = p_luminor_id;

    RETURN v_memory_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- CREATION FUNCTIONS
-- =====================================================================

-- Publish creation
CREATE OR REPLACE FUNCTION publish_creation(
    p_creation_id UUID,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE creations
    SET status = 'published',
        is_public = TRUE,
        published_at = NOW()
    WHERE id = p_creation_id
        AND user_id = p_user_id
        AND status = 'draft';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Archive creation
CREATE OR REPLACE FUNCTION archive_creation(
    p_creation_id UUID,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE creations
    SET status = 'archived',
        is_public = FALSE
    WHERE id = p_creation_id
        AND user_id = p_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment view count
CREATE OR REPLACE FUNCTION increment_creation_views(
    p_creation_id UUID
)
RETURNS VOID AS $$
BEGIN
    UPDATE creations
    SET view_count = view_count + 1
    WHERE id = p_creation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- SOCIAL FUNCTIONS
-- =====================================================================

-- Toggle like on creation
CREATE OR REPLACE FUNCTION toggle_like(
    p_user_id UUID,
    p_creation_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_liked BOOLEAN;
BEGIN
    -- Check if already liked
    SELECT EXISTS(
        SELECT 1 FROM likes
        WHERE user_id = p_user_id AND creation_id = p_creation_id
    ) INTO v_liked;

    IF v_liked THEN
        -- Unlike
        DELETE FROM likes
        WHERE user_id = p_user_id AND creation_id = p_creation_id;
        RETURN FALSE;
    ELSE
        -- Like
        INSERT INTO likes (user_id, creation_id)
        VALUES (p_user_id, p_creation_id);

        -- Create notification for creator
        INSERT INTO notifications (user_id, type, title, message, action_url, metadata)
        SELECT
            c.user_id,
            'creation_liked',
            'Someone liked your creation!',
            p.display_name || ' liked your creation: ' || c.title,
            '/creations/' || c.id,
            jsonb_build_object('liker_id', p_user_id, 'creation_id', c.id)
        FROM creations c
        JOIN profiles p ON p.id = p_user_id
        WHERE c.id = p_creation_id AND c.user_id != p_user_id;

        RETURN TRUE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Follow user
CREATE OR REPLACE FUNCTION follow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO follows (follower_id, following_id)
    VALUES (p_follower_id, p_following_id)
    ON CONFLICT (follower_id, following_id) DO NOTHING;

    -- Create notification
    IF FOUND THEN
        INSERT INTO notifications (user_id, type, title, message, metadata)
        SELECT
            p_following_id,
            'new_follower',
            'New Follower!',
            p.display_name || ' started following you',
            jsonb_build_object('follower_id', p_follower_id)
        FROM profiles p
        WHERE p.id = p_follower_id;
    END IF;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Unfollow user
CREATE OR REPLACE FUNCTION unfollow_user(
    p_follower_id UUID,
    p_following_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    DELETE FROM follows
    WHERE follower_id = p_follower_id AND following_id = p_following_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- NOTIFICATION FUNCTIONS
-- =====================================================================

-- Mark notification as read
CREATE OR REPLACE FUNCTION mark_notification_read(
    p_notification_id UUID,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE notifications
    SET is_read = TRUE,
        read_at = NOW()
    WHERE id = p_notification_id
        AND user_id = p_user_id
        AND is_read = FALSE;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mark all notifications as read
CREATE OR REPLACE FUNCTION mark_all_notifications_read(
    p_user_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE notifications
    SET is_read = TRUE,
        read_at = NOW()
    WHERE user_id = p_user_id
        AND is_read = FALSE;

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- SEARCH & DISCOVERY FUNCTIONS
-- =====================================================================

-- Search creations
CREATE OR REPLACE FUNCTION search_creations(
    p_query TEXT,
    p_type TEXT DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    type TEXT,
    thumbnail_url TEXT,
    user_id UUID,
    username TEXT,
    avatar_url TEXT,
    like_count INTEGER,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.title,
        c.description,
        c.type,
        c.thumbnail_url,
        c.user_id,
        p.username,
        p.avatar_url,
        c.like_count,
        c.created_at
    FROM creations c
    JOIN profiles p ON p.id = c.user_id
    WHERE c.is_public = TRUE
        AND c.status = 'published'
        AND (p_query IS NULL OR (
            c.title ILIKE '%' || p_query || '%' OR
            c.description ILIKE '%' || p_query || '%' OR
            p_query = ANY(c.tags)
        ))
        AND (p_type IS NULL OR c.type = p_type)
    ORDER BY c.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user feed (from followed creators)
CREATE OR REPLACE FUNCTION get_user_feed(
    p_user_id UUID,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    type TEXT,
    thumbnail_url TEXT,
    user_id UUID,
    username TEXT,
    avatar_url TEXT,
    like_count INTEGER,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.title,
        c.description,
        c.type,
        c.thumbnail_url,
        c.user_id,
        p.username,
        p.avatar_url,
        c.like_count,
        c.created_at
    FROM creations c
    JOIN profiles p ON p.id = c.user_id
    JOIN follows f ON f.following_id = c.user_id
    WHERE f.follower_id = p_user_id
        AND c.is_public = TRUE
        AND c.status = 'published'
    ORDER BY c.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- ANALYTICS FUNCTIONS
-- =====================================================================

-- Get user stats
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
    creation_count INTEGER,
    total_likes INTEGER,
    total_comments INTEGER,
    follower_count INTEGER,
    following_count INTEGER,
    total_conversations INTEGER,
    total_messages INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        CAST(COUNT(DISTINCT c.id) AS INTEGER) AS creation_count,
        CAST(SUM(c.like_count) AS INTEGER) AS total_likes,
        CAST(SUM(c.comment_count) AS INTEGER) AS total_comments,
        p.follower_count,
        p.following_count,
        CAST(COUNT(DISTINCT conv.id) AS INTEGER) AS total_conversations,
        CAST(COUNT(DISTINCT msg.id) AS INTEGER) AS total_messages
    FROM profiles p
    LEFT JOIN creations c ON c.user_id = p.id AND c.status = 'published'
    LEFT JOIN luminor_conversations conv ON conv.user_id = p.id
    LEFT JOIN luminor_messages msg ON msg.user_id = p.id
    WHERE p.id = p_user_id
    GROUP BY p.id, p.follower_count, p.following_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================
-- COMMENTS
-- =====================================================================

COMMENT ON FUNCTION handle_new_user() IS
    'Automatically create profile when user signs up via Supabase Auth';

COMMENT ON FUNCTION get_or_create_conversation(UUID, UUID, TEXT) IS
    'Get existing or create new conversation between user and Luminor';

COMMENT ON FUNCTION add_message_to_conversation(UUID, UUID, TEXT, TEXT, TEXT, INTEGER) IS
    'Add message to conversation and update relationships';

COMMENT ON FUNCTION toggle_like(UUID, UUID) IS
    'Like or unlike a creation, returns TRUE if liked, FALSE if unliked';

COMMENT ON FUNCTION search_creations(TEXT, TEXT, INTEGER, INTEGER) IS
    'Full-text search across public creations';

COMMENT ON FUNCTION get_user_feed(UUID, INTEGER, INTEGER) IS
    'Get personalized feed of creations from followed creators';
