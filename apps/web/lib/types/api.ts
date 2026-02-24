/**
 * API request and response types for Arcanea
 */

import type { NextRequest } from 'next/server';
import type { AcademyContext, ChatMessage, ImageGenerationOptions } from './ai';

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiMeta {
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
  timestamp?: string;
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

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
  | 'CONFLICT';

// Validation result type
export interface ValidationResult {
  valid: boolean;
  missing?: string[];
  errors?: Record<string, string>;
}

// Request body types
export interface ChatRequest {
  messages: ChatMessage[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  academyContext?: AcademyContext;
}

export interface ImageGenerationRequest {
  prompt: string;
  width?: number;
  height?: number;
  style?: string;
  mood?: string;
  quality?: 'standard' | 'hd';
  numberOfImages?: number;
  academyTheme?: 'atlantean' | 'draconic' | 'creation-light';
  kingdomOfLightStyle?: boolean;
  operation?: 'generate' | 'edit' | 'variations';
  imageUrl?: string;
  editPrompt?: string;
  variationCount?: number;
}

export interface VideoGenerationRequest {
  prompt: string;
  imageUrl?: string;
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  quality?: 'standard' | 'hd';
}

export interface CreateCreationRequest {
  title: string;
  description?: string;
  type: 'image' | 'music' | 'video' | 'story' | 'other';
  mediaUrl?: string;
  thumbnailUrl?: string;
  luminorId?: string;
  visibility?: 'public' | 'private' | 'unlisted';
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateCreationRequest {
  title?: string;
  description?: string;
  visibility?: 'public' | 'private' | 'unlisted';
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}

export interface CreateCommentRequest {
  creationId: string;
  content: string;
  parentId?: string;
}

export interface FollowRequest {
  targetUserId: string;
}

export interface LikeRequest {
  creationId: string;
}

export interface BondUpdateRequest {
  userId: string;
  luminorId: string;
  xpGained: number;
  interactionType?: string;
  metadata?: Record<string, unknown>;
}

// Query parameter types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreationFilters extends PaginationParams, SortParams {
  type?: string;
  luminorId?: string;
  status?: string;
  visibility?: string;
  isPublic?: boolean;
  tags?: string[];
  createdAfter?: Date;
  createdBefore?: Date;
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
}

export interface ActivityFilters extends PaginationParams {
  type?: string;
  userId?: string;
  targetType?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

// Extended NextRequest with typed body parsing
export interface TypedNextRequest<T> extends NextRequest {
  json(): Promise<T>;
}

// Rate limit types
export interface RateLimitInfo {
  count: number;
  resetAt: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}
