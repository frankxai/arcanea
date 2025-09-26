import { createClient } from '@supabase/supabase-js';

export interface AssetMetadata {
  id?: string;
  storage_path: string;
  bucket_id: string;
  original_name?: string;
  content_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  user_id?: string;
  tags?: string[];
  description?: string;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AssetCollection {
  id?: string;
  name: string;
  description?: string;
  user_id?: string;
  is_public?: boolean;
  created_at?: string;
}

export class AssetManager {
  private supabase: any;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Upload file to storage
  async uploadAsset(
    bucket: string,
    path: string,
    file: File | Buffer,
    metadata?: Partial<AssetMetadata>
  ) {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(path, file, {
          metadata: metadata ? { user_id: metadata.user_id } : undefined,
        });

      if (error) throw error;

      // Save metadata to database
      if (metadata) {
        const assetData: AssetMetadata = {
          storage_path: path,
          bucket_id: bucket,
          original_name: metadata.original_name,
          content_type: metadata.content_type,
          file_size: metadata.file_size,
          width: metadata.width,
          height: metadata.height,
          user_id: metadata.user_id,
          tags: metadata.tags,
          description: metadata.description,
          is_public: metadata.is_public ?? true,
        };

        const { error: dbError } = await this.supabase
          .from('asset_metadata')
          .insert(assetData);

        if (dbError) throw dbError;
      }

      return data;
    } catch (error) {
      console.error('Asset upload failed:', error);
      throw error;
    }
  }

  // Get public URL for asset
  getPublicUrl(bucket: string, path: string) {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  // Search assets by tags
  async searchAssets(tags?: string[], userId?: string, isPublic?: boolean) {
    let query = this.supabase.from('asset_metadata').select('*');

    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (isPublic !== undefined) {
      query = query.eq('is_public', isPublic);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data as AssetMetadata[];
  }

  // Create asset collection
  async createCollection(collection: AssetCollection) {
    const { data, error } = await this.supabase
      .from('asset_collections')
      .insert(collection)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Add asset to collection
  async addToCollection(collectionId: string, assetId: string, sortOrder = 0) {
    const { data, error } = await this.supabase
      .from('asset_collection_items')
      .insert({
        collection_id: collectionId,
        asset_id: assetId,
        sort_order: sortOrder,
      });

    if (error) throw error;
    return data;
  }

  // Get collection with assets
  async getCollection(collectionId: string) {
    const { data, error } = await this.supabase
      .from('asset_collections')
      .select(`
        *,
        asset_collection_items (
          sort_order,
          asset_metadata (*)
        )
      `)
      .eq('id', collectionId)
      .single();

    if (error) throw error;
    return data;
  }
}

// Utility functions for common asset operations
export const AssetUtils = {
  // Generate optimized path for assets
  generateAssetPath: (type: string, userId: string, filename: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `${type}/${userId}/${timestamp}/${sanitized}`;
  },

  // Extract metadata from file
  getFileMetadata: (file: File): Partial<AssetMetadata> => ({
    original_name: file.name,
    content_type: file.type,
    file_size: file.size,
  }),

  // Common bucket names
  buckets: {
    AI_CHARACTERS: 'ai-characters',
    AI_WORLDS: 'ai-worlds',
    AI_ARTIFACTS: 'ai-artifacts',
    USER_CREATIONS: 'user-creations',
    BRAND_ASSETS: 'brand-assets',
    PROFILE_ASSETS: 'profile-assets',
  } as const,
};

export default AssetManager;