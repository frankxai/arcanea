// Arcanea Prompt Books — Type Definitions

export type GuardianId =
  | 'lyssandria' | 'leyla' | 'draconia' | 'maylinn' | 'alera'
  | 'lyria' | 'aiyami' | 'elara' | 'ino' | 'shinkami'

export type ElementType = 'fire' | 'water' | 'earth' | 'wind' | 'void'

export type Visibility = 'private' | 'shared' | 'public'

export type PromptType =
  | 'general' | 'txt2img' | 'img2img' | 'chat' | 'chain'
  | 'few_shot' | 'code' | 'writing' | 'analysis'

export type InjectPosition = 'append' | 'prepend' | 'replace'

export type TagCategory = 'quality' | 'style' | 'negative' | 'model' | 'custom'

// =====================================================================
// Core Entities
// =====================================================================

export interface Collection {
  id: string
  userId: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  guardianId: GuardianId | null
  element: ElementType | null
  parentId: string | null
  sortOrder: number
  isPinned: boolean
  isArchived: boolean
  visibility: Visibility
  shareToken: string | null
  promptCount: number
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface Prompt {
  id: string
  userId: string
  collectionId: string | null
  title: string
  content: string
  negativeContent: string | null
  systemPrompt: string | null
  promptType: PromptType
  isTemplate: boolean
  templateVariables: TemplateVariable[]
  contextConfig: ContextConfig
  fewShotExamples: FewShotExample[]
  chainSteps: ChainStep[]
  sortOrder: number
  isPinned: boolean
  isFavorite: boolean
  isArchived: boolean
  useCount: number
  lastUsedAt: string | null
  version: number
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
  tags?: Tag[]
}

export interface Tag {
  id: string
  userId: string
  name: string
  category: TagCategory | null
  color: string | null
  icon: string | null
  injectText: string | null
  injectPosition: InjectPosition
  weightModifier: number | null
  isGlobal: boolean
  collectionId: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface PromptVersion {
  id: string
  promptId: string
  userId: string
  version: number
  content: string
  negativeContent: string | null
  systemPrompt: string | null
  changeSummary: string | null
  diffData: unknown
  contextConfig: ContextConfig
  fewShotExamples: FewShotExample[]
  createdAt: string
}

export interface Template {
  id: string
  userId: string | null
  name: string
  description: string | null
  category: string
  content: string
  negativeContent: string | null
  systemPrompt: string | null
  promptType: PromptType
  variables: TemplateVariable[]
  contextConfig: ContextConfig
  fewShotExamples: FewShotExample[]
  chainSteps: ChainStep[]
  guardianId: string | null
  element: string | null
  isPublic: boolean
  useCount: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

// =====================================================================
// Sub-types
// =====================================================================

export interface TemplateVariable {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'boolean'
  default?: string
  options?: string[]
  required?: boolean
}

export interface ContextConfig {
  model?: string
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stopSequences?: string[]
}

export interface FewShotExample {
  role: 'user' | 'assistant'
  content: string
}

export interface ChainStep {
  order: number
  promptId?: string
  inlinePrompt?: string
  outputVariable?: string
  transform?: 'none' | 'summarize' | 'extract_json' | 'extract_list'
}

// =====================================================================
// Context Engine Output
// =====================================================================

export interface ContextPackage {
  system: string | null
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
  parameters: {
    model: string
    temperature: number
    maxTokens: number
    topP?: number
    frequencyPenalty?: number
    presencePenalty?: number
    stopSequences?: string[]
  }
  metadata: {
    promptId: string
    version: number
    compiledAt: string
  }
}

// =====================================================================
// CRUD Input Types
// =====================================================================

export interface CreateCollectionInput {
  name: string
  description?: string
  icon?: string
  color?: string
  guardianId?: GuardianId
  element?: ElementType
  parentId?: string
  visibility?: Visibility
  metadata?: Record<string, unknown>
}

export interface UpdateCollectionInput {
  name?: string
  description?: string | null
  icon?: string | null
  color?: string | null
  guardianId?: GuardianId | null
  element?: ElementType | null
  parentId?: string | null
  sortOrder?: number
  isPinned?: boolean
  isArchived?: boolean
  visibility?: Visibility
  metadata?: Record<string, unknown>
}

export interface CreatePromptInput {
  title: string
  content?: string
  negativeContent?: string
  systemPrompt?: string
  promptType?: PromptType
  collectionId?: string
  isTemplate?: boolean
  templateVariables?: TemplateVariable[]
  contextConfig?: ContextConfig
  fewShotExamples?: FewShotExample[]
  chainSteps?: ChainStep[]
  metadata?: Record<string, unknown>
}

export interface UpdatePromptInput {
  title?: string
  content?: string
  negativeContent?: string | null
  systemPrompt?: string | null
  promptType?: PromptType
  collectionId?: string | null
  isTemplate?: boolean
  templateVariables?: TemplateVariable[]
  contextConfig?: ContextConfig
  fewShotExamples?: FewShotExample[]
  chainSteps?: ChainStep[]
  sortOrder?: number
  isPinned?: boolean
  isFavorite?: boolean
  isArchived?: boolean
  metadata?: Record<string, unknown>
}

export interface CreateTagInput {
  name: string
  category?: TagCategory
  color?: string
  icon?: string
  injectText?: string
  injectPosition?: InjectPosition
  weightModifier?: number
  isGlobal?: boolean
  collectionId?: string
}

export interface UpdateTagInput {
  name?: string
  category?: TagCategory | null
  color?: string | null
  icon?: string | null
  injectText?: string | null
  injectPosition?: InjectPosition
  weightModifier?: number | null
  isGlobal?: boolean
  collectionId?: string | null
  sortOrder?: number
}

// =====================================================================
// Filter Types
// =====================================================================

export interface PromptFilters {
  userId?: string
  collectionId?: string
  promptType?: PromptType
  isFavorite?: boolean
  isPinned?: boolean
  isArchived?: boolean
  tagIds?: string[]
  limit?: number
  offset?: number
}

export interface TemplateFilters {
  userId?: string
  category?: string
  isPublic?: boolean
  guardianId?: string
  limit?: number
  offset?: number
}

// =====================================================================
// Diff Types
// =====================================================================

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  lineNumber: number
}

// =====================================================================
// Sync Types
// =====================================================================

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error'

export interface SyncEvent {
  table: 'pb_collections' | 'pb_prompts' | 'pb_tags' | 'pb_prompt_tags'
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: Record<string, unknown>
  old?: Record<string, unknown>
}
