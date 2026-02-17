-- Arcanea Supabase Storage Setup
-- Run these commands in your Supabase SQL editor

-- Create storage buckets for different asset types
INSERT INTO storage.buckets (id, name, public) VALUES
  ('ai-characters', 'ai-characters', true),
  ('ai-worlds', 'ai-worlds', true),
  ('ai-artifacts', 'ai-artifacts', true),
  ('user-creations', 'user-creations', true),
  ('brand-assets', 'brand-assets', true),
  ('profile-assets', 'profile-assets', false);

-- Public access policies for public buckets
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('ai-characters', 'ai-worlds', 'ai-artifacts', 'user-creations', 'brand-assets'));

-- Upload policies (authenticated users only)
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id IN ('ai-characters', 'ai-worlds', 'ai-artifacts', 'user-creations', 'brand-assets')
    AND auth.uid() IS NOT NULL
  );

-- Update/Delete policies (owner only)
CREATE POLICY "Owner Update" ON storage.objects
  FOR UPDATE USING (auth.uid()::text = (metadata->>'user_id'));

CREATE POLICY "Owner Delete" ON storage.objects
  FOR DELETE USING (auth.uid()::text = (metadata->>'user_id'));

-- Profile assets (private, user-specific)
CREATE POLICY "Profile Access" ON storage.objects
  FOR ALL USING (
    bucket_id = 'profile-assets'
    AND auth.uid()::text = (metadata->>'user_id')
  );

-- Asset metadata table
CREATE TABLE IF NOT EXISTS asset_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL,
  bucket_id TEXT NOT NULL,
  original_name TEXT,
  content_type TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  user_id UUID REFERENCES auth.users(id),
  tags TEXT[],
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset collections (for grouping related assets)
CREATE TABLE IF NOT EXISTS asset_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset collection items
CREATE TABLE IF NOT EXISTS asset_collection_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES asset_collections(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES asset_metadata(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_asset_metadata_user_id ON asset_metadata(user_id);
CREATE INDEX idx_asset_metadata_bucket ON asset_metadata(bucket_id);
CREATE INDEX idx_asset_metadata_tags ON asset_metadata USING GIN(tags);
CREATE INDEX idx_asset_collection_user ON asset_collections(user_id);

-- RLS policies for tables
ALTER TABLE asset_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_collection_items ENABLE ROW LEVEL SECURITY;

-- Asset metadata policies
CREATE POLICY "Public asset metadata read" ON asset_metadata
  FOR SELECT USING (is_public = true);

CREATE POLICY "Owner asset metadata full access" ON asset_metadata
  FOR ALL USING (auth.uid() = user_id);

-- Collection policies
CREATE POLICY "Public collection read" ON asset_collections
  FOR SELECT USING (is_public = true);

CREATE POLICY "Owner collection full access" ON asset_collections
  FOR ALL USING (auth.uid() = user_id);

-- Collection items policies
CREATE POLICY "Collection items access" ON asset_collection_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM asset_collections
      WHERE id = collection_id
      AND (is_public = true OR user_id = auth.uid())
    )
  );