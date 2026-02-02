// =====================================================================
// ARCANEA MVP - DATABASE TYPES
// =====================================================================
// Auto-generated TypeScript types for Supabase database
// Use these types for type-safe database access
// =====================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// =====================================================================
// ENUMS
// =====================================================================

export enum SubscriptionTier {
  EXPLORER = 'explorer',
  CREATOR = 'creator',
  REALM_BUILDER = 'realm_builder'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  TRIALING = 'trialing',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  PAUSED = 'paused'
}

export enum CreationType {
  IMAGE = 'image',
  MUSIC = 'music',
  VIDEO = 'video',
  TEXT = 'text',
  MULTIMODAL = 'multimodal'
}

export enum CreationStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum License {
  CC_BY = 'cc_by',
  CC_BY_SA = 'cc_by_sa',
  CC_BY_NC = 'cc_by_nc',
  CC_BY_NC_SA = 'cc_by_nc_sa',
  CC_BY_ND = 'cc_by_nd',
  ALL_RIGHTS_RESERVED = 'all_rights_reserved',
  PUBLIC_DOMAIN = 'public_domain'
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export enum NotificationType {
  CREATION_LIKED = 'creation_liked',
  CREATION_COMMENTED = 'creation_commented',
  NEW_FOLLOWER = 'new_follower',
  COMMENT_REPLY = 'comment_reply',
  MENTION = 'mention',
  SYSTEM_ANNOUNCEMENT = 'system_announcement'
}

// =====================================================================
// TABLE TYPES
// =====================================================================

export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  arcanean_id: string
  tier: SubscriptionTier
  subscription_status: SubscriptionStatus
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  location: string | null
  website: string | null
  preferences: Json
  onboarding_completed: boolean
  onboarding_step: number
  creation_count: number
  follower_count: number
  following_count: number
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
  last_active_at: string
}

export interface Luminor {
  id: string
  name: string
  slug: string
  title: string
  specialty: string
  color: string
  avatar_url: string | null
  icon: string | null
  personality: Json
  system_prompt: string
  greeting_message: string
  expertise: string[]
  ai_tools: string[]
  is_active: boolean
  is_public: boolean
  interaction_count: number
  user_count: number
  average_rating: number | null
  created_at: string
  updated_at: string
}

export interface LuminorConversation {
  id: string
  user_id: string
  luminor_id: string
  title: string | null
  session_id: string
  context: Json
  is_active: boolean
  is_archived: boolean
  message_count: number
  created_at: string
  updated_at: string
  last_message_at: string
}

export interface LuminorMessage {
  id: string
  conversation_id: string
  user_id: string
  role: MessageRole
  content: string
  model: string | null
  tokens: number | null
  cost: number | null
  user_rating: number | null
  was_helpful: boolean | null
  created_at: string
}

export interface LuminorRelationship {
  id: string
  user_id: string
  luminor_id: string
  bond_level: number
  bond_xp: number
  total_interactions: number
  personality_match: Json
  user_preferences: Json
  key_memories: Json
  created_at: string
  updated_at: string
  last_interaction_at: string
}

export interface Creation {
  id: string
  user_id: string
  title: string
  description: string | null
  type: CreationType
  file_url: string
  thumbnail_url: string | null
  file_size: number | null
  file_format: string | null
  ai_tool: string | null
  prompt: string | null
  model: string | null
  generation_params: Json
  seed: number | null
  metadata: Json
  status: CreationStatus
  is_public: boolean
  is_featured: boolean
  is_nsfw: boolean
  license: License
  allow_remix: boolean
  allow_commercial: boolean
  tags: string[]
  categories: string[]
  view_count: number
  like_count: number
  comment_count: number
  remix_count: number
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface Like {
  id: string
  user_id: string
  creation_id: string
  created_at: string
}

export interface Comment {
  id: string
  user_id: string
  creation_id: string
  content: string
  parent_comment_id: string | null
  is_edited: boolean
  is_flagged: boolean
  like_count: number
  created_at: string
  updated_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  notify_creations: boolean
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  action_url: string | null
  metadata: Json
  is_read: boolean
  is_archived: boolean
  created_at: string
  read_at: string | null
}

// =====================================================================
// INSERT TYPES (for creating new records)
// =====================================================================

export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'last_active_at'> & {
  id?: string
}

export type CreationInsert = Omit<Creation, 'id' | 'created_at' | 'updated_at' | 'published_at'> & {
  id?: string
}

export type LuminorMessageInsert = Omit<LuminorMessage, 'id' | 'created_at'> & {
  id?: string
}

export type CommentInsert = Omit<Comment, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
}

export type NotificationInsert = Omit<Notification, 'id' | 'created_at' | 'read_at'> & {
  id?: string
}

// =====================================================================
// UPDATE TYPES (for updating existing records)
// =====================================================================

export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>

export type CreationUpdate = Partial<Omit<Creation, 'id' | 'user_id' | 'created_at'>>

export type LuminorConversationUpdate = Partial<Omit<LuminorConversation, 'id' | 'user_id' | 'created_at'>>

export type CommentUpdate = Partial<Omit<Comment, 'id' | 'user_id' | 'creation_id' | 'created_at'>>

// =====================================================================
// EXTENDED TYPES (with relations)
// =====================================================================

export interface CreationWithProfile extends Creation {
  profile: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
}

export interface CommentWithProfile extends Comment {
  profile: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
}

export interface ConversationWithLuminor extends LuminorConversation {
  luminor: Pick<Luminor, 'id' | 'name' | 'color' | 'avatar_url'>
}

export interface ConversationWithMessages extends ConversationWithLuminor {
  messages: LuminorMessage[]
}

export interface RelationshipWithLuminor extends LuminorRelationship {
  luminor: Pick<Luminor, 'id' | 'name' | 'color' | 'avatar_url' | 'title'>
}

// =====================================================================
// CUSTOM TYPES
// =====================================================================

export interface UserStats {
  creation_count: number
  total_likes: number
  total_comments: number
  follower_count: number
  following_count: number
  total_conversations: number
  total_messages: number
}

export interface SearchCreationResult {
  id: string
  title: string
  description: string | null
  type: CreationType
  thumbnail_url: string | null
  user_id: string
  username: string
  avatar_url: string | null
  like_count: number
  created_at: string
}

export interface FeedItem {
  id: string
  title: string
  description: string | null
  type: CreationType
  thumbnail_url: string | null
  user_id: string
  username: string
  avatar_url: string | null
  like_count: number
  created_at: string
}

// =====================================================================
// PERSONALITY & MEMORY TYPES
// =====================================================================

export interface LuminorPersonality {
  description: string
  teachingStyle: string
  traits: string[]
  voice?: string
  tone?: string
}

export interface KeyMemory {
  id: string
  type: string
  content: string
  importance: number
  created_at: string
}

export interface PersonalityMatch {
  compatibility: number
  shared_interests: string[]
  learning_style: string
}

// =====================================================================
// CONTEXT TYPES
// =====================================================================

export interface ConversationContext {
  project_id?: string
  creation_id?: string
  module_id?: string
  topic?: string
  [key: string]: any
}

export interface GenerationParams {
  model?: string
  prompt?: string
  negative_prompt?: string
  steps?: number
  cfg_scale?: number
  width?: number
  height?: number
  seed?: number
  sampler?: string
  [key: string]: any
}

// =====================================================================
// STORAGE TYPES
// =====================================================================

export interface StorageFile {
  name: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: {
    eTag: string
    size: number
    mimetype: string
    cacheControl: string
    lastModified: string
    contentLength: number
    httpStatusCode: number
  }
}

export type BucketName = 'avatars' | 'creations' | 'thumbnails'

// =====================================================================
// DATABASE TYPE
// =====================================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      luminors: {
        Row: Luminor
        Insert: never // Admin only
        Update: never // Admin only
      }
      luminor_conversations: {
        Row: LuminorConversation
        Insert: Omit<LuminorConversation, 'id' | 'created_at' | 'updated_at' | 'last_message_at'>
        Update: LuminorConversationUpdate
      }
      luminor_messages: {
        Row: LuminorMessage
        Insert: LuminorMessageInsert
        Update: Pick<LuminorMessage, 'user_rating' | 'was_helpful'>
      }
      luminor_relationships: {
        Row: LuminorRelationship
        Insert: Omit<LuminorRelationship, 'id' | 'created_at' | 'updated_at' | 'last_interaction_at'>
        Update: Partial<Omit<LuminorRelationship, 'id' | 'user_id' | 'luminor_id' | 'created_at'>>
      }
      creations: {
        Row: Creation
        Insert: CreationInsert
        Update: CreationUpdate
      }
      likes: {
        Row: Like
        Insert: Omit<Like, 'id' | 'created_at'>
        Update: never
      }
      comments: {
        Row: Comment
        Insert: CommentInsert
        Update: CommentUpdate
      }
      follows: {
        Row: Follow
        Insert: Omit<Follow, 'id' | 'created_at'>
        Update: Pick<Follow, 'notify_creations'>
      }
      notifications: {
        Row: Notification
        Insert: NotificationInsert
        Update: Pick<Notification, 'is_read' | 'is_archived' | 'read_at'>
      }
    }
    Functions: {
      get_or_create_conversation: {
        Args: {
          p_user_id: string
          p_luminor_id: string
          p_session_id: string
        }
        Returns: string
      }
      add_message_to_conversation: {
        Args: {
          p_conversation_id: string
          p_user_id: string
          p_role: MessageRole
          p_content: string
          p_model?: string
          p_tokens?: number
        }
        Returns: string
      }
      toggle_like: {
        Args: {
          p_user_id: string
          p_creation_id: string
        }
        Returns: boolean
      }
      follow_user: {
        Args: {
          p_follower_id: string
          p_following_id: string
        }
        Returns: boolean
      }
      unfollow_user: {
        Args: {
          p_follower_id: string
          p_following_id: string
        }
        Returns: boolean
      }
      search_creations: {
        Args: {
          p_query: string
          p_type?: CreationType
          p_limit?: number
          p_offset?: number
        }
        Returns: SearchCreationResult[]
      }
      get_user_feed: {
        Args: {
          p_user_id: string
          p_limit?: number
          p_offset?: number
        }
        Returns: FeedItem[]
      }
      get_user_stats: {
        Args: {
          p_user_id: string
        }
        Returns: UserStats
      }
      publish_creation: {
        Args: {
          p_creation_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      archive_creation: {
        Args: {
          p_creation_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      mark_notification_read: {
        Args: {
          p_notification_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      mark_all_notifications_read: {
        Args: {
          p_user_id: string
        }
        Returns: number
      }
    }
  }
}

// =====================================================================
// HELPER TYPES
// =====================================================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// =====================================================================
// USAGE EXAMPLES
// =====================================================================

/*
// Create typed Supabase client
import { createClient } from '@supabase/supabase-js'
import type { Database } from './DATABASE_TYPES'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Type-safe queries
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

// Type-safe inserts
const { data: creation } = await supabase
  .from('creations')
  .insert({
    user_id: userId,
    title: 'My Creation',
    type: CreationType.IMAGE,
    file_url: 'https://...',
    // TypeScript will enforce correct types
  })
  .select()
  .single()

// Type-safe RPC calls
const { data: stats } = await supabase
  .rpc('get_user_stats', {
    p_user_id: userId
  })
*/
