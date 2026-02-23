// @arcanea/prompt-books — Shared Prompt Books Library
// Platform-agnostic types, constants, engines, and utilities

// Types
export type {
  Collection, Prompt, Tag, PromptVersion, Template,
  TemplateVariable, ContextConfig, FewShotExample, ChainStep,
  ContextPackage,
  GuardianId, ElementType, Visibility, PromptType,
  InjectPosition, TagCategory,
  CreateCollectionInput, UpdateCollectionInput,
  CreatePromptInput, UpdatePromptInput,
  CreateTagInput, UpdateTagInput,
  PromptFilters, TemplateFilters,
  DiffLine, SyncStatus, SyncEvent,
} from './types'

// Constants
export {
  GUARDIAN_THEMES,
  PROMPT_TYPES,
  DEFAULT_TAGS,
  TAG_CATEGORIES,
  WEIGHT_SYNTAX,
} from './constants'
export type { GuardianTheme, PromptTypeConfig, DefaultTag, WeightSyntaxType } from './constants'

// Context Engine
export { compilePrompt, compileChain, resolveVariables, extractVariables } from './context-engine'

// Markdown
export { parseMd, serializeMd, promptToMd, mdToPromptData, isPromptMarkdown } from './markdown'

// Weight Syntax
export { parseWeight, formatWeight, extractWeights, applyWeight, stripWeights } from './weight-syntax'
