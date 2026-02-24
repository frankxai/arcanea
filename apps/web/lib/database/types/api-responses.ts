// Arcanea Database Types - Inlined for standalone deployment

export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'DATABASE_ERROR'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'ALREADY_EXISTS'
  | 'INVALID_INPUT'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'

export interface ApiError {
  code: ErrorCode
  message: string
  details?: Record<string, unknown>
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: {
    total?: number
    page?: number
    limit?: number
    hasMore?: boolean
    timestamp?: string
  }
}

export interface CreationFilters {
  type?: string
  luminorId?: string
  status?: string
  visibility?: string
  isPublic?: boolean
  tags?: string[]
  createdAfter?: Date
  createdBefore?: Date
  dateFrom?: string
  dateTo?: string
  sortBy?: 'recent' | 'popular' | 'trending' | 'created_at' | 'updated_at' | 'like_count' | 'view_count'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
  page?: number
  pageSize?: number
}

export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  bio: {
    maxLength: 500
  },
  title: {
    minLength: 1,
    maxLength: 200
  },
  description: {
    maxLength: 2000
  },
  tags: {
    maxCount: 10,
    maxLength: 50
  }
}

// Profile types
export interface Profile {
  id: string
  username: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  academyId?: string
  createdAt: string
  updatedAt: string
}

export interface ProfileStats {
  creationsCount: number
  followersCount: number
  followingCount: number
  likesReceived: number
  totalViews: number
}

// Creation types
export interface Creation {
  id: string
  title: string
  description?: string
  type: 'image' | 'music' | 'video' | 'story' | 'other'
  mediaUrl?: string
  thumbnailUrl?: string
  userId: string
  luminorId?: string
  visibility: 'public' | 'private' | 'unlisted'
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  likesCount: number
  commentsCount: number
  viewsCount: number
  createdAt: string
  updatedAt: string
}

// Bond types
export interface LuminorBond {
  id: string
  userId: string
  luminorId: string
  level: number
  bondLevel: number // Alias for level
  xp: number
  relationshipType: string
  memories: Memory[]
  createdAt: string
  updatedAt: string
}

export interface Memory {
  id: string
  content: string
  type: 'conversation' | 'creation' | 'milestone'
  importance: number
  createdAt: string
}

// Activity types
export interface Activity {
  id: string
  type: 'creation' | 'like' | 'comment' | 'follow' | 'achievement'
  userId: string
  targetId?: string
  targetType?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

// Notification types
export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}
