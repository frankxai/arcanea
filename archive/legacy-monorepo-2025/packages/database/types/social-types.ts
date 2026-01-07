/**
 * Social Features Type Definitions
 *
 * Type definitions for social features including likes, comments,
 * follows, notifications, and activity feeds.
 */

// =====================================================================
// LIKE TYPES
// =====================================================================

export interface Like {
  id: string;
  userId: string;
  creationId: string;
  createdAt: string;
}

export interface LikeWithProfile {
  id: string;
  userId: string;
  creationId: string;
  createdAt: string;
  profile: {
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  };
}

export interface LikeResponse {
  liked: boolean;
  likeCount: number;
  like?: Like;
}

export interface LikesListResponse {
  likes: LikeWithProfile[];
  pagination: PaginationInfo;
}

// =====================================================================
// COMMENT TYPES
// =====================================================================

export interface Comment {
  id: string;
  userId: string;
  creationId: string;
  content: string;
  parentCommentId: string | null;
  isEdited: boolean;
  isFlagged: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentWithProfile {
  id: string;
  userId: string;
  creationId: string;
  content: string;
  parentCommentId: string | null;
  isEdited: boolean;
  isFlagged: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  profile: {
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    isVerified: boolean;
  };
  replies?: CommentWithProfile[];
  replyCount?: number;
}

export interface CreateCommentRequest {
  creationId: string;
  content: string;
  parentCommentId?: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface CommentsListResponse {
  comments: CommentWithProfile[];
  pagination: PaginationInfo;
}

// =====================================================================
// FOLLOW TYPES
// =====================================================================

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  notifyCreations: boolean;
  createdAt: string;
}

export interface FollowWithProfile {
  id: string;
  followerId: string;
  followingId: string;
  notifyCreations: boolean;
  createdAt: string;
  profile: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    isVerified: boolean;
    followerCount: number;
  };
}

export interface FollowResponse {
  following: boolean;
  follow?: Follow;
}

export interface FollowersListResponse {
  followers: FollowWithProfile[];
  pagination: PaginationInfo;
}

export interface FollowingListResponse {
  following: FollowWithProfile[];
  pagination: PaginationInfo;
}

export interface FollowCheckResponse {
  isFollowing: boolean;
  notifyCreations: boolean;
}

// =====================================================================
// NOTIFICATION TYPES
// =====================================================================

export enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  REPLY = 'reply',
  FOLLOW = 'follow',
  MENTION = 'mention',
  BOND_LEVEL_UP = 'bond_level_up',
  CREATION_FEATURED = 'creation_featured',
}

export interface NotificationData {
  // Common fields
  actorId?: string;
  actorUsername?: string;
  actorAvatar?: string;

  // Like notifications
  creationId?: string;
  creationTitle?: string;
  creationThumbnail?: string;

  // Comment/Reply notifications
  commentId?: string;
  commentContent?: string;

  // Bond level up notifications
  luminorId?: string;
  luminorName?: string;
  bondLevel?: number;

  // Additional context
  url?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  data: NotificationData;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsListResponse {
  notifications: Notification[];
  unreadCount: number;
  pagination: PaginationInfo;
}

// =====================================================================
// ACTIVITY FEED TYPES
// =====================================================================

export enum ActivityType {
  CREATION = 'creation',
  LIKE = 'like',
  COMMENT = 'comment',
  FOLLOW = 'follow',
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  userId: string;
  createdAt: string;
  weight: number; // For feed ranking

  // User info
  profile: {
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    isVerified: boolean;
  };

  // Creation activities
  creation?: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    thumbnailUrl: string | null;
    likeCount: number;
    commentCount: number;
  };

  // Like activities
  like?: {
    creationId: string;
    creationTitle: string;
    creationThumbnail: string | null;
  };

  // Comment activities
  comment?: {
    id: string;
    content: string;
    creationId: string;
    creationTitle: string;
  };

  // Follow activities
  follow?: {
    followingId: string;
    followingUsername: string;
  };
}

export interface ActivityFeedResponse {
  activities: ActivityItem[];
  pagination: PaginationInfo;
}

export interface UserActivityResponse {
  activities: ActivityItem[];
  pagination: PaginationInfo;
}

// =====================================================================
// REAL-TIME EVENT TYPES
// =====================================================================

export interface LikeEvent {
  type: 'INSERT' | 'DELETE';
  creationId: string;
  userId: string;
  likeCount: number;
  like?: Like;
}

export interface CommentEvent {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  creationId: string;
  commentId: string;
  comment?: CommentWithProfile;
}

export interface NotificationEvent {
  type: 'INSERT';
  notification: Notification;
}

// =====================================================================
// PAGINATION TYPES
// =====================================================================

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

// =====================================================================
// VALIDATION SCHEMAS (for Zod)
// =====================================================================

export const COMMENT_MAX_LENGTH = 2000;
export const COMMENT_MIN_LENGTH = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const LIKES_RATE_LIMIT = 100; // per hour
export const FOLLOWS_RATE_LIMIT = 50; // per hour
export const COMMENTS_RATE_LIMIT = 50; // per hour
