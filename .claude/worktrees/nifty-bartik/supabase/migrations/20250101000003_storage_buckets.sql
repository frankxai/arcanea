-- =====================================================================
-- STORAGE BUCKETS CONFIGURATION
-- =====================================================================
-- Purpose: Setup storage buckets for user-generated content
-- Buckets: avatars, creations, thumbnails
-- =====================================================================

-- =====================================================================
-- CREATE STORAGE BUCKETS
-- =====================================================================

-- Avatars bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    TRUE,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Creations bucket (public for published, private for drafts)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'creations',
    'creations',
    FALSE, -- Controlled by policies
    104857600, -- 100MB
    ARRAY[
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/webm', 'video/quicktime',
        'audio/mpeg', 'audio/wav', 'audio/ogg',
        'application/pdf'
    ]
);

-- Thumbnails bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'thumbnails',
    'thumbnails',
    TRUE,
    2097152, -- 2MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- =====================================================================
-- STORAGE POLICIES FOR AVATARS
-- =====================================================================

-- Anyone can view avatars
CREATE POLICY "Avatars are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- =====================================================================
-- STORAGE POLICIES FOR CREATIONS
-- =====================================================================

-- Users can view their own creations
CREATE POLICY "Users can view own creations"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'creations' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Anyone can view public creations (if marked as public in DB)
CREATE POLICY "Anyone can view public creations"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'creations' AND
        EXISTS (
            SELECT 1 FROM creations
            WHERE creations.file_url LIKE '%' || name || '%'
            AND creations.is_public = TRUE
            AND creations.status = 'published'
        )
    );

-- Users can upload their own creations
CREATE POLICY "Users can upload own creations"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'creations' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can update their own creations
CREATE POLICY "Users can update own creations"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'creations' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can delete their own creations
CREATE POLICY "Users can delete own creations"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'creations' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- =====================================================================
-- STORAGE POLICIES FOR THUMBNAILS
-- =====================================================================

-- Anyone can view thumbnails
CREATE POLICY "Thumbnails are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'thumbnails');

-- Users can upload their own thumbnails
CREATE POLICY "Users can upload own thumbnails"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'thumbnails' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can update their own thumbnails
CREATE POLICY "Users can update own thumbnails"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'thumbnails' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- Users can delete their own thumbnails
CREATE POLICY "Users can delete own thumbnails"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'thumbnails' AND
        auth.uid()::TEXT = (storage.foldername(name))[1]
    );

-- =====================================================================
-- HELPER FUNCTIONS FOR STORAGE
-- =====================================================================

-- Get file extension
CREATE OR REPLACE FUNCTION get_file_extension(filename TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(SUBSTRING(filename FROM '\.([^.]*)$'));
END;
$$ LANGUAGE plpgsql;

-- Validate file size
CREATE OR REPLACE FUNCTION validate_file_size(size BIGINT, max_size BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN size <= max_size;
END;
$$ LANGUAGE plpgsql;

-- Generate unique filename
CREATE OR REPLACE FUNCTION generate_unique_filename(user_id UUID, original_filename TEXT)
RETURNS TEXT AS $$
DECLARE
    extension TEXT;
    unique_name TEXT;
BEGIN
    extension := get_file_extension(original_filename);
    unique_name := user_id::TEXT || '/' || gen_random_uuid()::TEXT || '.' || extension;
    RETURN unique_name;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- STORAGE ORGANIZATION GUIDELINES
-- =====================================================================

/*
File Organization Structure:

avatars/
  {user_id}/
    avatar.{ext}
    avatar-{timestamp}.{ext} (for history)

creations/
  {user_id}/
    images/
      {creation_id}.{ext}
    videos/
      {creation_id}.{ext}
    music/
      {creation_id}.{ext}

thumbnails/
  {user_id}/
    {creation_id}-thumb.{ext}

Example paths:
- avatars/550e8400-e29b-41d4-a716-446655440000/avatar.png
- creations/550e8400-e29b-41d4-a716-446655440000/images/abc123.png
- thumbnails/550e8400-e29b-41d4-a716-446655440000/abc123-thumb.jpg
*/

-- =====================================================================
-- COMMENTS
-- =====================================================================

COMMENT ON POLICY "Avatars are publicly accessible" ON storage.objects IS
    'Profile avatars are public for display in UI';

COMMENT ON POLICY "Users can upload own creations" ON storage.objects IS
    'Users can only upload files to their own folder in creations bucket';

COMMENT ON POLICY "Anyone can view public creations" ON storage.objects IS
    'Published public creations are accessible to anyone via direct URL';
