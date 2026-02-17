/**
 * Database entity types for Arcanea
 */

// Profile types
export interface Profile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  academyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileStats {
  creationsCount: number;
  followersCount: number;
  followingCount: number;
  likesReceived: number;
  totalViews: number;
}

export interface ProfileWithStats extends Profile {
  stats: ProfileStats;
}

// Creation types
export interface Creation {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'music' | 'video' | 'story' | 'other';
  mediaUrl?: string;
  thumbnailUrl?: string;
  userId: string;
  luminorId?: string;
  visibility: 'public' | 'private' | 'unlisted';
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreationWithCreator extends Creation {
  creator: Profile;
}

// Comment types
export interface Comment {
  id: string;
  creationId: string;
  userId: string;
  content: string;
  parentId?: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentWithUser extends Comment {
  user: Profile;
  replies?: CommentWithUser[];
}

// Follow types
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface FollowWithProfile extends Follow {
  follower?: Profile;
  following?: Profile;
}

// Like types
export interface Like {
  id: string;
  userId: string;
  creationId: string;
  createdAt: string;
}

export interface LikeWithUser extends Like {
  user: Profile;
}

// Bond types
export interface LuminorBond {
  id: string;
  userId: string;
  luminorId: string;
  level: number;
  bondLevel: number; // Alias for level (for backward compatibility)
  xp: number;
  relationshipType: 'acquaintance' | 'friend' | 'companion' | 'trusted_ally' | 'soul_bonded';
  memories: Memory[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Memory {
  id: string;
  content: string;
  type: 'conversation' | 'creation' | 'milestone';
  importance: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Activity types
export interface Activity {
  id: string;
  type: 'creation' | 'like' | 'comment' | 'follow' | 'achievement';
  userId: string;
  targetId?: string;
  targetType?: 'creation' | 'user' | 'comment';
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityWithDetails extends Activity {
  user?: Profile;
  creation?: Creation;
  targetUser?: Profile;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Essence types (for Studio creations)
export interface Essence {
  id: string;
  creatorId: string;
  type: 'visual' | 'audio' | 'text' | 'video' | 'mixed';
  title: string;
  content: EssenceContent;
  metadata?: EssenceMetadata;
  visibility: 'public' | 'private' | 'unlisted';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface EssenceContent {
  type: 'visual' | 'audio' | 'text' | 'video' | 'mixed';
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  text?: string;
  prompt?: string;
  style?: string;
}

export interface EssenceMetadata {
  academy?: 'atlantean' | 'draconic' | 'creation-light';
  luminorUsed?: string;
  tags?: string[];
  remixable?: boolean;
  sourceEssenceId?: string;
  techniqueUsed?: string;
  [key: string]: unknown;
}

// AI Usage tracking
export interface AIUsage {
  id: string;
  userId: string;
  operation: string;
  model: string;
  tokensInput?: number;
  tokensOutput?: number;
  cost: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Academy types
export interface Academy {
  id: string;
  name: string;
  type: 'atlantean' | 'draconic' | 'creation-light';
  description: string;
  element: 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'spirit';
  createdAt: string;
}

// Gate progress types
export interface GateProgress {
  id: string;
  userId: string;
  gateId: string;
  level: number;
  xp: number;
  unlockedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gate {
  id: string;
  name: string;
  frequency: number;
  guardian: string;
  godbeast: string;
  element: string;
  domain: string;
  order: number;
}

// Validation rules
export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  bio: {
    maxLength: 500,
  },
  title: {
    minLength: 1,
    maxLength: 200,
  },
  description: {
    maxLength: 2000,
  },
  tags: {
    maxCount: 10,
    maxLength: 50,
  },
  comment: {
    minLength: 1,
    maxLength: 1000,
  },
} as const;
