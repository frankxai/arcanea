// Arcanea Database - Shared Prisma Client
import { PrismaClient } from './generated/client'

// Singleton pattern for Prisma Client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma }
export * from './generated/client'

// Export useful types for the application
export type {
  User,
  Academy,
  Luminor,
  Course,
  Module,
  UserEnrollment,
  UserProgress,
  Project,
  LuminorInteraction,
  CommunityPost,
  Achievement,
  UserAchievement,
  StarlightNote,
  SystemEvent,
  SubscriptionTier,
  Difficulty,
  EnrollmentStatus,
  ProgressStatus,
  ProjectType,
  ProjectStatus,
  PostType,
  AchievementRarity,
  NoteType
} from './generated/client'

// =====================================================================
// Supabase Services & Types (MVP)
// =====================================================================

// Services
export * from './services/profile-service'
export * from './services/creation-service'
export * from './services/bond-service'

// Types
export * from './types/api-responses'
export * from './types/supabase'