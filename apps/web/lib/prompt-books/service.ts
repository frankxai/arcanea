// Arcanea Prompt Books — Service Layer
// All Supabase CRUD operations for prompt management

import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Collection, Prompt, Tag, PromptVersion, Template,
  CreateCollectionInput, UpdateCollectionInput,
  CreatePromptInput, UpdatePromptInput,
  CreateTagInput, UpdateTagInput,
  PromptFilters, TemplateFilters,
  GuardianId, ElementType, Visibility, PromptType,
  InjectPosition, TagCategory, ContextConfig, FewShotExample,
  TemplateVariable, ChainStep,
} from './types'

// =====================================================================
// Data Mappers — snake_case DB rows → camelCase TypeScript
// =====================================================================

function mapCollection(row: Record<string, unknown>): Collection {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    name: row.name as string,
    description: row.description as string | null,
    icon: row.icon as string | null,
    color: row.color as string | null,
    guardianId: row.guardian_id as GuardianId | null,
    element: row.element as ElementType | null,
    parentId: row.parent_id as string | null,
    sortOrder: row.sort_order as number,
    isPinned: row.is_pinned as boolean,
    isArchived: row.is_archived as boolean,
    visibility: row.visibility as Visibility,
    shareToken: row.share_token as string | null,
    promptCount: row.prompt_count as number,
    metadata: (row.metadata as Record<string, unknown>) || {},
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function mapPrompt(row: Record<string, unknown>): Prompt {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    collectionId: row.collection_id as string | null,
    title: row.title as string,
    content: row.content as string,
    negativeContent: row.negative_content as string | null,
    systemPrompt: row.system_prompt as string | null,
    promptType: row.prompt_type as PromptType,
    isTemplate: row.is_template as boolean,
    templateVariables: (row.template_variables as TemplateVariable[]) || [],
    contextConfig: (row.context_config as ContextConfig) || {},
    fewShotExamples: (row.few_shot_examples as FewShotExample[]) || [],
    chainSteps: (row.chain_steps as ChainStep[]) || [],
    sortOrder: row.sort_order as number,
    isPinned: row.is_pinned as boolean,
    isFavorite: row.is_favorite as boolean,
    isArchived: row.is_archived as boolean,
    useCount: row.use_count as number,
    lastUsedAt: row.last_used_at as string | null,
    version: row.version as number,
    metadata: (row.metadata as Record<string, unknown>) || {},
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function mapTag(row: Record<string, unknown>): Tag {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    name: row.name as string,
    category: row.category as TagCategory | null,
    color: row.color as string | null,
    icon: row.icon as string | null,
    injectText: row.inject_text as string | null,
    injectPosition: (row.inject_position as InjectPosition) || 'append',
    weightModifier: row.weight_modifier as number | null,
    isGlobal: row.is_global as boolean,
    collectionId: row.collection_id as string | null,
    sortOrder: row.sort_order as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function mapVersion(row: Record<string, unknown>): PromptVersion {
  return {
    id: row.id as string,
    promptId: row.prompt_id as string,
    userId: row.user_id as string,
    version: row.version as number,
    content: row.content as string,
    negativeContent: row.negative_content as string | null,
    systemPrompt: row.system_prompt as string | null,
    changeSummary: row.change_summary as string | null,
    diffData: row.diff_data,
    contextConfig: (row.context_config as ContextConfig) || {},
    fewShotExamples: (row.few_shot_examples as FewShotExample[]) || [],
    createdAt: row.created_at as string,
  }
}

function mapTemplate(row: Record<string, unknown>): Template {
  return {
    id: row.id as string,
    userId: row.user_id as string | null,
    name: row.name as string,
    description: row.description as string | null,
    category: row.category as string,
    content: row.content as string,
    negativeContent: row.negative_content as string | null,
    systemPrompt: row.system_prompt as string | null,
    promptType: row.prompt_type as PromptType,
    variables: (row.variables as TemplateVariable[]) || [],
    contextConfig: (row.context_config as ContextConfig) || {},
    fewShotExamples: (row.few_shot_examples as FewShotExample[]) || [],
    chainSteps: (row.chain_steps as ChainStep[]) || [],
    guardianId: row.guardian_id as string | null,
    element: row.element as string | null,
    isPublic: row.is_public as boolean,
    useCount: row.use_count as number,
    tags: (row.tags as string[]) || [],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

// =====================================================================
// COLLECTIONS
// =====================================================================

export async function listCollections(
  client: SupabaseClient,
  userId: string,
): Promise<Collection[]> {
  const { data, error } = await client
    .from('pb_collections')
    .select('*')
    .eq('user_id', userId)
    .order('is_pinned', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(mapCollection)
}

export async function getCollection(
  client: SupabaseClient,
  id: string,
): Promise<Collection | null> {
  const { data, error } = await client
    .from('pb_collections')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return mapCollection(data)
}

export async function createCollection(
  client: SupabaseClient,
  userId: string,
  input: CreateCollectionInput,
): Promise<Collection> {
  const { data, error } = await client
    .from('pb_collections')
    .insert({
      user_id: userId,
      name: input.name,
      description: input.description || null,
      icon: input.icon || null,
      color: input.color || null,
      guardian_id: input.guardianId || null,
      element: input.element || null,
      parent_id: input.parentId || null,
      visibility: input.visibility || 'private',
      metadata: input.metadata || {},
    })
    .select()
    .single()

  if (error) throw error
  return mapCollection(data)
}

export async function updateCollection(
  client: SupabaseClient,
  id: string,
  input: UpdateCollectionInput,
): Promise<Collection> {
  const update: Record<string, unknown> = {}

  if (input.name !== undefined) update.name = input.name
  if (input.description !== undefined) update.description = input.description
  if (input.icon !== undefined) update.icon = input.icon
  if (input.color !== undefined) update.color = input.color
  if (input.guardianId !== undefined) update.guardian_id = input.guardianId
  if (input.element !== undefined) update.element = input.element
  if (input.parentId !== undefined) update.parent_id = input.parentId
  if (input.sortOrder !== undefined) update.sort_order = input.sortOrder
  if (input.isPinned !== undefined) update.is_pinned = input.isPinned
  if (input.isArchived !== undefined) update.is_archived = input.isArchived
  if (input.visibility !== undefined) update.visibility = input.visibility
  if (input.metadata !== undefined) update.metadata = input.metadata

  const { data, error } = await client
    .from('pb_collections')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapCollection(data)
}

export async function deleteCollection(
  client: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await client
    .from('pb_collections')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function reorderCollections(
  client: SupabaseClient,
  items: Array<{ id: string; sortOrder: number }>,
): Promise<void> {
  for (const item of items) {
    const { error } = await client
      .from('pb_collections')
      .update({ sort_order: item.sortOrder })
      .eq('id', item.id)

    if (error) throw error
  }
}

// =====================================================================
// PROMPTS
// =====================================================================

export async function listPrompts(
  client: SupabaseClient,
  filters: PromptFilters,
): Promise<Prompt[]> {
  let query = client.from('pb_prompts').select('*')

  if (filters.userId) query = query.eq('user_id', filters.userId)
  if (filters.collectionId) query = query.eq('collection_id', filters.collectionId)
  if (filters.promptType) query = query.eq('prompt_type', filters.promptType)
  if (filters.isFavorite !== undefined) query = query.eq('is_favorite', filters.isFavorite)
  if (filters.isPinned !== undefined) query = query.eq('is_pinned', filters.isPinned)
  if (filters.isArchived !== undefined) query = query.eq('is_archived', filters.isArchived)
  else query = query.eq('is_archived', false)

  query = query
    .order('is_pinned', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })

  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, error } = await query
  if (error) throw error

  return (data || []).map(mapPrompt)
}

export async function getPrompt(
  client: SupabaseClient,
  id: string,
): Promise<Prompt | null> {
  const { data, error } = await client
    .from('pb_prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  const prompt = mapPrompt(data)

  // Fetch associated tags
  const { data: tagData } = await client
    .from('pb_prompt_tags')
    .select('tag_id')
    .eq('prompt_id', id)

  if (tagData && tagData.length > 0) {
    const tagIds = tagData.map((t) => t.tag_id)
    const { data: tags } = await client
      .from('pb_tags')
      .select('*')
      .in('id', tagIds)

    prompt.tags = (tags || []).map(mapTag)
  }

  return prompt
}

export async function createPrompt(
  client: SupabaseClient,
  userId: string,
  input: CreatePromptInput,
): Promise<Prompt> {
  const { data, error } = await client
    .from('pb_prompts')
    .insert({
      user_id: userId,
      title: input.title,
      content: input.content || '',
      negative_content: input.negativeContent || null,
      system_prompt: input.systemPrompt || null,
      prompt_type: input.promptType || 'general',
      collection_id: input.collectionId || null,
      is_template: input.isTemplate || false,
      template_variables: input.templateVariables || [],
      context_config: input.contextConfig || {},
      few_shot_examples: input.fewShotExamples || [],
      chain_steps: input.chainSteps || [],
      metadata: input.metadata || {},
    })
    .select()
    .single()

  if (error) throw error
  return mapPrompt(data)
}

export async function updatePrompt(
  client: SupabaseClient,
  id: string,
  input: UpdatePromptInput,
): Promise<Prompt> {
  const update: Record<string, unknown> = {}

  if (input.title !== undefined) update.title = input.title
  if (input.content !== undefined) update.content = input.content
  if (input.negativeContent !== undefined) update.negative_content = input.negativeContent
  if (input.systemPrompt !== undefined) update.system_prompt = input.systemPrompt
  if (input.promptType !== undefined) update.prompt_type = input.promptType
  if (input.collectionId !== undefined) update.collection_id = input.collectionId
  if (input.isTemplate !== undefined) update.is_template = input.isTemplate
  if (input.templateVariables !== undefined) update.template_variables = input.templateVariables
  if (input.contextConfig !== undefined) update.context_config = input.contextConfig
  if (input.fewShotExamples !== undefined) update.few_shot_examples = input.fewShotExamples
  if (input.chainSteps !== undefined) update.chain_steps = input.chainSteps
  if (input.sortOrder !== undefined) update.sort_order = input.sortOrder
  if (input.isPinned !== undefined) update.is_pinned = input.isPinned
  if (input.isFavorite !== undefined) update.is_favorite = input.isFavorite
  if (input.isArchived !== undefined) update.is_archived = input.isArchived
  if (input.metadata !== undefined) update.metadata = input.metadata

  const { data, error } = await client
    .from('pb_prompts')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapPrompt(data)
}

export async function deletePrompt(
  client: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await client
    .from('pb_prompts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function duplicatePrompt(
  client: SupabaseClient,
  id: string,
  userId: string,
): Promise<Prompt> {
  const original = await getPrompt(client, id)
  if (!original) throw new Error('Prompt not found')

  return createPrompt(client, userId, {
    title: `${original.title} (Copy)`,
    content: original.content,
    negativeContent: original.negativeContent || undefined,
    systemPrompt: original.systemPrompt || undefined,
    promptType: original.promptType,
    collectionId: original.collectionId || undefined,
    isTemplate: original.isTemplate,
    templateVariables: original.templateVariables,
    contextConfig: original.contextConfig,
    fewShotExamples: original.fewShotExamples,
    chainSteps: original.chainSteps,
    metadata: original.metadata,
  })
}

export async function movePrompt(
  client: SupabaseClient,
  id: string,
  collectionId: string | null,
): Promise<void> {
  const { error } = await client
    .from('pb_prompts')
    .update({ collection_id: collectionId })
    .eq('id', id)

  if (error) throw error
}

export async function incrementUseCount(
  client: SupabaseClient,
  id: string,
): Promise<void> {
  const { data } = await client
    .from('pb_prompts')
    .select('use_count')
    .eq('id', id)
    .single()

  if (data) {
    const { error } = await client
      .from('pb_prompts')
      .update({
        use_count: (data.use_count as number) + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  }
}

// =====================================================================
// TAGS
// =====================================================================

export async function listTags(
  client: SupabaseClient,
  userId: string,
  collectionId?: string,
): Promise<Tag[]> {
  let query = client
    .from('pb_tags')
    .select('*')
    .eq('user_id', userId)

  if (collectionId) {
    query = query.or(`is_global.eq.true,collection_id.eq.${collectionId}`)
  }

  query = query
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(mapTag)
}

export async function createTag(
  client: SupabaseClient,
  userId: string,
  input: CreateTagInput,
): Promise<Tag> {
  const { data, error } = await client
    .from('pb_tags')
    .insert({
      user_id: userId,
      name: input.name,
      category: input.category || null,
      color: input.color || null,
      icon: input.icon || null,
      inject_text: input.injectText || null,
      inject_position: input.injectPosition || 'append',
      weight_modifier: input.weightModifier || null,
      is_global: input.isGlobal ?? true,
      collection_id: input.collectionId || null,
    })
    .select()
    .single()

  if (error) throw error
  return mapTag(data)
}

export async function updateTag(
  client: SupabaseClient,
  id: string,
  input: UpdateTagInput,
): Promise<Tag> {
  const update: Record<string, unknown> = {}

  if (input.name !== undefined) update.name = input.name
  if (input.category !== undefined) update.category = input.category
  if (input.color !== undefined) update.color = input.color
  if (input.icon !== undefined) update.icon = input.icon
  if (input.injectText !== undefined) update.inject_text = input.injectText
  if (input.injectPosition !== undefined) update.inject_position = input.injectPosition
  if (input.weightModifier !== undefined) update.weight_modifier = input.weightModifier
  if (input.isGlobal !== undefined) update.is_global = input.isGlobal
  if (input.collectionId !== undefined) update.collection_id = input.collectionId
  if (input.sortOrder !== undefined) update.sort_order = input.sortOrder

  const { data, error } = await client
    .from('pb_tags')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapTag(data)
}

export async function deleteTag(
  client: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await client
    .from('pb_tags')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function assignTagsToPrompt(
  client: SupabaseClient,
  promptId: string,
  tagIds: string[],
): Promise<void> {
  // Remove existing assignments
  await client
    .from('pb_prompt_tags')
    .delete()
    .eq('prompt_id', promptId)

  // Insert new assignments
  if (tagIds.length > 0) {
    const rows = tagIds.map((tagId) => ({
      prompt_id: promptId,
      tag_id: tagId,
    }))

    const { error } = await client
      .from('pb_prompt_tags')
      .insert(rows)

    if (error) throw error
  }
}

export async function removeTagFromPrompt(
  client: SupabaseClient,
  promptId: string,
  tagId: string,
): Promise<void> {
  const { error } = await client
    .from('pb_prompt_tags')
    .delete()
    .eq('prompt_id', promptId)
    .eq('tag_id', tagId)

  if (error) throw error
}

// =====================================================================
// VERSIONS
// =====================================================================

export async function listVersions(
  client: SupabaseClient,
  promptId: string,
): Promise<PromptVersion[]> {
  const { data, error } = await client
    .from('pb_prompt_versions')
    .select('*')
    .eq('prompt_id', promptId)
    .order('version', { ascending: false })

  if (error) throw error
  return (data || []).map(mapVersion)
}

export async function restoreVersion(
  client: SupabaseClient,
  promptId: string,
  versionId: string,
): Promise<Prompt> {
  // Get the version to restore
  const { data: version, error: vErr } = await client
    .from('pb_prompt_versions')
    .select('*')
    .eq('id', versionId)
    .single()

  if (vErr || !version) throw new Error('Version not found')

  // Update the prompt with the old version's content
  // This triggers auto-version, preserving current state
  return updatePrompt(client, promptId, {
    content: version.content,
    negativeContent: version.negative_content,
    systemPrompt: version.system_prompt,
    contextConfig: version.context_config || {},
    fewShotExamples: version.few_shot_examples || [],
  })
}

// =====================================================================
// TEMPLATES
// =====================================================================

export async function listTemplates(
  client: SupabaseClient,
  filters?: TemplateFilters,
): Promise<Template[]> {
  let query = client.from('pb_templates').select('*')

  if (filters?.userId) {
    query = query.or(`is_public.eq.true,user_id.eq.${filters.userId}`)
  } else {
    query = query.eq('is_public', true)
  }

  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.guardianId) query = query.eq('guardian_id', filters.guardianId)

  query = query.order('use_count', { ascending: false })

  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(mapTemplate)
}

export async function getTemplate(
  client: SupabaseClient,
  id: string,
): Promise<Template | null> {
  const { data, error } = await client
    .from('pb_templates')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return mapTemplate(data)
}

export async function createTemplate(
  client: SupabaseClient,
  userId: string,
  input: Omit<Template, 'id' | 'useCount' | 'createdAt' | 'updatedAt'>,
): Promise<Template> {
  const { data, error } = await client
    .from('pb_templates')
    .insert({
      user_id: userId,
      name: input.name,
      description: input.description,
      category: input.category,
      content: input.content,
      negative_content: input.negativeContent,
      system_prompt: input.systemPrompt,
      prompt_type: input.promptType,
      variables: input.variables,
      context_config: input.contextConfig,
      few_shot_examples: input.fewShotExamples,
      chain_steps: input.chainSteps,
      guardian_id: input.guardianId,
      element: input.element,
      is_public: input.isPublic,
      tags: input.tags,
    })
    .select()
    .single()

  if (error) throw error
  return mapTemplate(data)
}

export async function instantiateTemplate(
  client: SupabaseClient,
  userId: string,
  templateId: string,
  variables: Record<string, string>,
  collectionId?: string,
): Promise<Prompt> {
  const template = await getTemplate(client, templateId)
  if (!template) throw new Error('Template not found')

  // Resolve variables in content
  let content = template.content
  for (const v of template.variables) {
    const value = variables[v.name] ?? v.default ?? ''
    content = content.replaceAll(`{{${v.name}}}`, value)
  }

  let negativeContent = template.negativeContent
  if (negativeContent) {
    for (const v of template.variables) {
      const value = variables[v.name] ?? v.default ?? ''
      negativeContent = negativeContent.replaceAll(`{{${v.name}}}`, value)
    }
  }

  // Create prompt from template
  const prompt = await createPrompt(client, userId, {
    title: template.name,
    content,
    negativeContent: negativeContent || undefined,
    systemPrompt: template.systemPrompt || undefined,
    promptType: template.promptType,
    collectionId,
    contextConfig: template.contextConfig,
    fewShotExamples: template.fewShotExamples,
    chainSteps: template.chainSteps,
  })

  // Increment template use count
  await client
    .from('pb_templates')
    .update({ use_count: template.useCount + 1 })
    .eq('id', templateId)

  return prompt
}

// =====================================================================
// SEARCH
// =====================================================================

export async function searchPrompts(
  client: SupabaseClient,
  userId: string,
  query: string,
  limit: number = 50,
  offset: number = 0,
): Promise<Array<Prompt & { rank: number }>> {
  const { data, error } = await client.rpc('pb_search_prompts', {
    p_user_id: userId,
    p_query: query,
    p_limit: limit,
    p_offset: offset,
  })

  if (error) throw error

  return (data || []).map((row: Record<string, unknown>) => ({
    ...mapPrompt(row),
    rank: row.rank as number,
  }))
}

// =====================================================================
// EXPORT / IMPORT
// =====================================================================

export async function exportCollectionAsJson(
  client: SupabaseClient,
  collectionId: string,
): Promise<{
  collection: Collection
  prompts: Prompt[]
  tags: Tag[]
}> {
  const collection = await getCollection(client, collectionId)
  if (!collection) throw new Error('Collection not found')

  const prompts = await listPrompts(client, { collectionId })
  const tags = await listTags(client, collection.userId, collectionId)

  return { collection, prompts, tags }
}

export async function importFromJson(
  client: SupabaseClient,
  userId: string,
  data: {
    collection: Partial<CreateCollectionInput>
    prompts: Array<Partial<CreatePromptInput>>
  },
): Promise<{ collection: Collection; promptCount: number }> {
  const collection = await createCollection(client, userId, {
    name: data.collection.name || 'Imported Collection',
    description: data.collection.description,
    icon: data.collection.icon,
    guardianId: data.collection.guardianId,
    element: data.collection.element,
  })

  let count = 0
  for (const promptData of data.prompts) {
    await createPrompt(client, userId, {
      ...promptData,
      title: promptData.title || 'Imported Prompt',
      collectionId: collection.id,
    })
    count++
  }

  return { collection, promptCount: count }
}

// =====================================================================
// SAVE AS TEMPLATE
// =====================================================================

export async function saveAsTemplate(
  client: SupabaseClient,
  userId: string,
  prompt: Prompt,
  data: {
    name: string
    description: string
    category: string
    variables: Array<{ name: string; label: string; type: string; default?: string; required?: boolean }>
    isPublic: boolean
  },
): Promise<Template> {
  const { data: row, error } = await client
    .from('pb_templates')
    .insert({
      user_id: userId,
      name: data.name,
      description: data.description,
      content: prompt.content,
      negative_content: prompt.negativeContent,
      system_prompt: prompt.systemPrompt,
      prompt_type: prompt.promptType,
      category: data.category,
      visibility: data.isPublic ? 'public' : 'private',
      variables: data.variables,
      tags: (prompt.tags ?? []).map((t) => t.name),
      guardian_id: prompt.collectionId ? null : null,
      context_config: prompt.contextConfig,
      few_shot_examples: prompt.fewShotExamples,
      chain_steps: prompt.chainSteps,
    })
    .select()
    .single()

  if (error) throw error
  return mapTemplate(row)
}
