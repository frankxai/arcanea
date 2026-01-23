/**
 * Arcanea Core Types
 *
 * Re-exports all type definitions for the Arcanea ecosystem.
 */

// Mythology Types
export type {
  CosmicEntity,
  CosmicDuality,
  Element,
  ElementWithSpirit,
  ElementOrAll,
  ElementDefinition,
  GateName,
  GateFrequency,
  Gate,
  GuardianName,
  Guardian,
  GodbeastName,
  Godbeast,
  MagicRank,
  MagicRankDefinition,
  AcademyHouse,
  Academy,
  LuminorId,
  Luminor,
  DarkLord,
  ArcaneaWorld,
} from './mythology';

// Content Types
export type {
  ContentStatus,
  ContentFormat,
  Situation,
  Collection,
  TextFrontmatter,
  Heading,
  Text,
  CodexAuthor,
  CodexPreface,
  CodexInsight,
  CodexArtifact,
  CodexSection,
  CodexChapter,
  CodexAppendix,
  ArcaneaCodex,
  ArcaneaTomeMeta,
  ArcaneaTome,
  ContentQuery,
  SearchResult,
} from './content';

// Profile Types
export type {
  Profile,
  ProfileStats,
  SocialLinks,
  PrivacySettings,
  CreationType,
  Creation,
  CreationStats,
  CreationMetadata,
  LuminorBond,
  LuminorMemory,
  Comment,
  Follow,
  Like,
  ReadingProgress,
  Note,
  FilterType,
  SortOption,
  TabOption,
} from './profile';

// Agent Types
export type {
  AgentRole,
  AgentStatus,
  Agent,
  SkillCategory,
  Skill,
  SwarmProtocol,
  SwarmConfig,
  SwarmTask,
  SwarmSession,
  PlatformType,
  PlatformConfig,
  PlatformAdapter,
  IntelligenceOSConfig,
  ChannelRequest,
  ChannelResponse,
} from './agents';
