/**
 * Arcanea TypeScript Type Definitions
 * Central export for all types used across the application
 */

// AI types
export type {
  EmotionalTone,
  AIModelConfig,
  GeminiConfig,
  SafetySettings,
  ChatMessage,
  ConversationHistory,
  TokenUsage,
  ChatResponse,
  StreamingChunk,
  ThinkingState,
  BondState,
  ImageGenerationOptions,
  GeneratedImage,
  VideoGenerationOptions,
  GeneratedVideo,
  ChatProvider,
  ChatOptions,
  StreamTextResult,
  ImageProvider,
  VideoProvider,
  AcademyContext,
  AIUsageRecord,
} from './ai';

// API types
export type {
  ApiResponse,
  ApiMeta,
  ApiError,
  ErrorCode,
  ValidationResult,
  ChatRequest,
  ImageGenerationRequest,
  VideoGenerationRequest,
  CreateCreationRequest,
  UpdateCreationRequest,
  CreateCommentRequest,
  FollowRequest,
  LikeRequest,
  BondUpdateRequest,
  PaginationParams,
  SortParams,
  CreationFilters,
  ActivityFilters,
  TypedNextRequest,
  RateLimitInfo,
  RateLimitConfig,
} from './api';

// Database types
export type {
  Profile,
  ProfileStats,
  ProfileWithStats,
  Creation,
  CreationWithCreator,
  Comment,
  CommentWithUser,
  Follow,
  FollowWithProfile,
  Like,
  LikeWithUser,
  LuminorBond,
  Memory,
  Activity,
  ActivityWithDetails,
  Notification,
  Essence,
  EssenceContent,
  EssenceMetadata,
  AIUsage,
  Academy,
  GateProgress,
  Gate,
} from './database';

export { VALIDATION_RULES } from './database';

// Profile types (re-exported for backward compatibility)
export type { UserProfile, UserStats, UserSettings } from './profile';

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'cosmic' | 'glass';
  hover?: boolean;
  onClick?: () => void;
}

// Form types
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

// Hook return types
export interface UseAsyncReturn<T, E = Error> {
  data: T | null;
  error: E | null;
  loading: boolean;
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = (...args: unknown[]) => Promise<T>;
export type VoidFunction = () => void;

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type ConnectionState = 'connected' | 'disconnected' | 'reconnecting';
export type PublishState = 'draft' | 'published' | 'archived';

// File upload types
export interface FileUploadResult {
  url: string;
  path: string;
  size: number;
  mimeType: string;
}

export interface FileUploadError {
  code: 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'UPLOAD_FAILED';
  message: string;
}

// Search types
export interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  query: string;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  tags?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}
