/**
 * Supabase Database Type Definitions
 *
 * Auto-generated types for Supabase database schema.
 * This provides type safety for all database operations.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          arcanean_id: string
          tier: 'explorer' | 'creator' | 'realm_builder'
          subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
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
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          arcanean_id?: string
          tier?: 'explorer' | 'creator' | 'realm_builder'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          location?: string | null
          website?: string | null
          preferences?: Json
          onboarding_completed?: boolean
          onboarding_step?: number
          creation_count?: number
          follower_count?: number
          following_count?: number
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          last_active_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          arcanean_id?: string
          tier?: 'explorer' | 'creator' | 'realm_builder'
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          location?: string | null
          website?: string | null
          preferences?: Json
          onboarding_completed?: boolean
          onboarding_step?: number
          creation_count?: number
          follower_count?: number
          following_count?: number
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          last_active_at?: string
        }
      }
      luminors: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          slug: string
          title: string
          specialty: string
          color?: string
          avatar_url?: string | null
          icon?: string | null
          personality?: Json
          system_prompt: string
          greeting_message: string
          expertise?: string[]
          ai_tools?: string[]
          is_active?: boolean
          is_public?: boolean
          interaction_count?: number
          user_count?: number
          average_rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          title?: string
          specialty?: string
          color?: string
          avatar_url?: string | null
          icon?: string | null
          personality?: Json
          system_prompt?: string
          greeting_message?: string
          expertise?: string[]
          ai_tools?: string[]
          is_active?: boolean
          is_public?: boolean
          interaction_count?: number
          user_count?: number
          average_rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      luminor_relationships: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          luminor_id: string
          bond_level?: number
          bond_xp?: number
          total_interactions?: number
          personality_match?: Json
          user_preferences?: Json
          key_memories?: Json
          created_at?: string
          updated_at?: string
          last_interaction_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          luminor_id?: string
          bond_level?: number
          bond_xp?: number
          total_interactions?: number
          personality_match?: Json
          user_preferences?: Json
          key_memories?: Json
          created_at?: string
          updated_at?: string
          last_interaction_at?: string
        }
      }
      creations: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          type: 'image' | 'music' | 'video' | 'text' | 'multimodal'
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
          status: 'draft' | 'processing' | 'published' | 'archived'
          is_public: boolean
          is_featured: boolean
          is_nsfw: boolean
          license: string
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
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          type: 'image' | 'music' | 'video' | 'text' | 'multimodal'
          file_url: string
          thumbnail_url?: string | null
          file_size?: number | null
          file_format?: string | null
          ai_tool?: string | null
          prompt?: string | null
          model?: string | null
          generation_params?: Json
          seed?: number | null
          metadata?: Json
          status?: 'draft' | 'processing' | 'published' | 'archived'
          is_public?: boolean
          is_featured?: boolean
          is_nsfw?: boolean
          license?: string
          allow_remix?: boolean
          allow_commercial?: boolean
          tags?: string[]
          categories?: string[]
          view_count?: number
          like_count?: number
          comment_count?: number
          remix_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          type?: 'image' | 'music' | 'video' | 'text' | 'multimodal'
          file_url?: string
          thumbnail_url?: string | null
          file_size?: number | null
          file_format?: string | null
          ai_tool?: string | null
          prompt?: string | null
          model?: string | null
          generation_params?: Json
          seed?: number | null
          metadata?: Json
          status?: 'draft' | 'processing' | 'published' | 'archived'
          is_public?: boolean
          is_featured?: boolean
          is_nsfw?: boolean
          license?: string
          allow_remix?: boolean
          allow_commercial?: boolean
          tags?: string[]
          categories?: string[]
          view_count?: number
          like_count?: number
          comment_count?: number
          remix_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          creation_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          creation_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          creation_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          creation_id: string
          content: string
          parent_comment_id?: string | null
          is_edited?: boolean
          is_flagged?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          creation_id?: string
          content?: string
          parent_comment_id?: string | null
          is_edited?: boolean
          is_flagged?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          notify_creations: boolean
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          notify_creations?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          notify_creations?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
