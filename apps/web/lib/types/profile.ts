// Profile and Gallery Types for Arcanea

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
  academy_affiliations: string[];
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface PrivacySettings {
  show_email: boolean;
  show_creations: boolean;
  allow_follows: boolean;
}

export interface Creation {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'project' | 'composition';
  media_url: string;
  thumbnail_url?: string;
  prompt?: string;
  luminor_id?: string;
  academy?: string;
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
}

export interface LuminorBond {
  id: string;
  user_id: string;
  luminor_id: string;
  luminor_name: string;
  luminor_avatar: string;
  academy: string;
  bond_level: number;
  total_conversations: number;
  personality_compatibility: number;
  last_interaction: string;
  created_at: string;
}

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

export type FilterType = 'all' | 'image' | 'video' | 'project' | 'composition';
export type SortOption = 'recent' | 'popular' | 'oldest';
export type TabOption = 'gallery' | 'projects' | 'about' | 'stats';
