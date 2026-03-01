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
  LuminorTeam,
  WisdomName,
  Luminor,
  IntelligenceTier,
  LuminaIntelligence,
  DarkLord,
  ArcaneaWorld,
} from './mythology.js';

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
} from './content.js';

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
} from './profile.js';

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
} from './agents.js';

// Overlay & Auth Types
export type {
  ProviderType,
  OverlayLevel,
  OverlayCapability,
  AuthSession,
  AuthAdapter,
  Keystore,
  OverlayConfig,
  MCPServerConfig,
  ToolDetection,
  OverlayManifest,
  InstallResult,
  InstallPreview,
  OverlayInstaller,
  OverlayManifestFile,
  LevelDefinition,
} from './overlay.js';

export { PROVIDER_CAPABILITIES, OVERLAY_LEVELS } from './overlay.js';
