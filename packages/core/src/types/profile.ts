/**
 * Arcanea Profile & Social Types
 *
 * Type definitions for user profiles, creations, and social features.
 */

import type { LuminorId, AcademyHouse } from './mythology';

// ============================================
// PROFILE
// ============================================

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  stats: ProfileStats;
  social_links?: SocialLinks;
  privacy_settings?: PrivacySettings;
}

export interface ProfileStats {
  total_creations: number;
  total_followers: number;
  total_following: number;
  total_likes_received: number;
  active_days_streak: number;
  academy_affiliations: AcademyHouse[];
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  website?: string;
  github?: string;
  discord?: string;
}

export interface PrivacySettings {
  show_email: boolean;
  show_creations: boolean;
  allow_follows: boolean;
}

// ============================================
// CREATIONS
// ============================================

export type CreationType = 'image' | 'video' | 'project' | 'composition' | 'text';

export interface Creation {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: CreationType;
  media_url: string;
  thumbnail_url?: string;
  prompt?: string;
  luminor_id?: LuminorId;
  academy?: AcademyHouse;
  created_at: string;
  updated_at: string;
  stats: CreationStats;
  metadata?: CreationMetadata;
}

export interface CreationStats {
  likes: number;
  comments: number;
  views: number;
  shares: number;
}

export interface CreationMetadata {
  width?: number;
  height?: number;
  duration?: number;
  style?: string;
  tags?: string[];
  model?: string;
  parameters?: Record<string, unknown>;
}

// ============================================
// LUMINOR BONDS
// ============================================

export interface LuminorBond {
  id: string;
  user_id: string;
  luminor_id: LuminorId;
  luminor_name: string;
  luminor_avatar: string;
  academy: AcademyHouse;
  bond_level: number;
  total_conversations: number;
  personality_compatibility: number;
  last_interaction: string;
  created_at: string;
}

export interface LuminorMemory {
  id: string;
  bond_id: string;
  content: string;
  type: 'conversation' | 'creation' | 'milestone';
  importance: number;
  created_at: string;
}

// ============================================
// SOCIAL
// ============================================

export interface Comment {
  id: string;
  creation_id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  content: string;
  created_at: string;
  likes: number;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Like {
  user_id: string;
  creation_id: string;
  created_at: string;
}

// ============================================
// READING STATE
// ============================================

export interface ReadingProgress {
  textSlug: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  scrollPosition?: number;
  bookmarks?: string[];
  notes?: Note[];
}

export interface Note {
  id: string;
  textSlug: string;
  content: string;
  headingSlug?: string;
  createdAt: string;
}

// ============================================
// FILTER/SORT
// ============================================

export type FilterType = 'all' | CreationType;
export type SortOption = 'recent' | 'popular' | 'oldest';
export type TabOption = 'gallery' | 'projects' | 'about' | 'stats';
