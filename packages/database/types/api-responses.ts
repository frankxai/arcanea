/**
 * API Response Types for Arcanea MVP
 *
 * Defines TypeScript interfaces for all API request and response payloads.
 * Ensures type safety across frontend and backend.
 */

// =====================================================================
// BASE RESPONSE TYPES
// =====================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ResponseMeta {
  timestamp: string;
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// =====================================================================
// PROFILE TYPES
// =====================================================================

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  arcaneanId: string;
  tier: 'explorer' | 'creator' | 'realm_builder';
  subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused';
  location: string | null;
  website: string | null;
  preferences: Record<string, any>;
  onboardingCompleted: boolean;
  onboardingStep: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export interface ProfileStats {
  totalCreations: number;
  totalLikes: number;
  totalComments: number;
  followers: number;
  following: number;
  activeLuminors: number;
  totalBondXp: number;
}

export interface ProfileResponse {
  profile: Profile;
  stats: ProfileStats;
}

export interface UpdateProfileRequest {
  username?: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  preferences?: Record<string, any>;
}

// =====================================================================
// CREATION TYPES
// =====================================================================

export interface Creation {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  type: 'image' | 'music' | 'video' | 'text' | 'multimodal';
  fileUrl: string;
  thumbnailUrl: string | null;
  fileSize: number | null;
  fileFormat: string | null;
  aiTool: string | null;
  prompt: string | null;
  model: string | null;
  generationParams: Record<string, any>;
  seed: number | null;
  metadata: Record<string, any>;
  status: 'draft' | 'processing' | 'published' | 'archived';
  isPublic: boolean;
  isFeatured: boolean;
  isNsfw: boolean;
  license: string;
  allowRemix: boolean;
  allowCommercial: boolean;
  tags: string[];
  categories: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  remixCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface CreationWithCreator extends Creation {
  creator: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    isVerified: boolean;
  };
}

export interface CreationResponse {
  creation: CreationWithCreator;
}

export interface CreationsListResponse {
  creations: CreationWithCreator[];
  pagination: PaginationMeta;
}

export interface CreateCreationRequest {
  title: string;
  description?: string;
  type: 'image' | 'music' | 'video' | 'text' | 'multimodal';
  fileUrl: string;
  thumbnailUrl?: string;
  fileSize?: number;
  fileFormat?: string;
  aiTool?: string;
  prompt?: string;
  model?: string;
  generationParams?: Record<string, any>;
  seed?: number;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published';
  isPublic?: boolean;
  tags?: string[];
  categories?: string[];
  license?: string;
  allowRemix?: boolean;
  allowCommercial?: boolean;
}

export interface UpdateCreationRequest {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  status?: 'draft' | 'published' | 'archived';
  isPublic?: boolean;
  tags?: string[];
  categories?: string[];
  license?: string;
  allowRemix?: boolean;
  allowCommercial?: boolean;
}

export interface CreationFilters {
  type?: 'image' | 'music' | 'video' | 'text' | 'multimodal';
  luminorId?: string;
  status?: 'draft' | 'processing' | 'published' | 'archived';
  isPublic?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'created_at' | 'updated_at' | 'like_count' | 'view_count';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

// =====================================================================
// LUMINOR BOND TYPES
// =====================================================================

export interface LuminorBond {
  id: string;
  userId: string;
  luminorId: string;
  bondLevel: number;
  bondXp: number;
  totalInteractions: number;
  personalityMatch: Record<string, any>;
  userPreferences: Record<string, any>;
  keyMemories: Memory[];
  createdAt: string;
  updatedAt: string;
  lastInteractionAt: string;
}

export interface Memory {
  id: string;
  content: string;
  type: 'achievement' | 'preference' | 'milestone' | 'conversation';
  importance: number;
  createdAt: string;
}

export interface LuminorWithBond {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  color: string;
  avatarUrl: string | null;
  icon: string | null;
  greetingMessage: string;
  bond: LuminorBond | null;
}

export interface BondResponse {
  bond: LuminorBond;
  luminor: {
    id: string;
    name: string;
    slug: string;
    title: string;
    specialty: string;
    color: string;
    avatarUrl: string | null;
  };
}

export interface BondsListResponse {
  bonds: LuminorWithBond[];
}

export interface UpdateBondProgressRequest {
  userId: string;
  luminorId: string;
  xpGained: number;
  interactionType?: 'message' | 'creation' | 'achievement' | 'daily_streak';
  metadata?: Record<string, any>;
}

export interface AddMemoryRequest {
  userId: string;
  luminorId: string;
  content: string;
  type: 'achievement' | 'preference' | 'milestone' | 'conversation';
  importance?: number;
}

export interface MemoriesResponse {
  memories: Memory[];
  totalCount: number;
}

// =====================================================================
// VALIDATION SCHEMAS (ZOD)
// =====================================================================

export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
  },
  bio: {
    maxLength: 500,
  },
  title: {
    minLength: 1,
    maxLength: 100,
  },
  description: {
    maxLength: 2000,
  },
  tags: {
    maxCount: 10,
    maxLength: 30,
  },
  memory: {
    maxLength: 1000,
  },
} as const;

// =====================================================================
// ERROR CODES
// =====================================================================

export const ERROR_CODES = {
  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',

  // Database
  DATABASE_ERROR: 'DATABASE_ERROR',
  QUERY_FAILED: 'QUERY_FAILED',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
