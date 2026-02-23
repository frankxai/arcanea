// Arcanea Prompt Books — Realtime Sync
// Cross-device synchronization via Supabase Realtime channels

import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js'
import { usePromptBooksStore } from './store'
import type { Collection, Prompt, Tag, GuardianId, ElementType, Visibility, PromptType, InjectPosition, TagCategory, ContextConfig, FewShotExample, TemplateVariable, ChainStep } from './types'

// =====================================================================
// Data Mappers (duplicated from service for client-side use)
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

// =====================================================================
// Sync Manager
// =====================================================================

export class PromptBooksSync {
  private channels: RealtimeChannel[] = []
  private client: SupabaseClient
  private userId: string

  constructor(client: SupabaseClient, userId: string) {
    this.client = client
    this.userId = userId
  }

  subscribe(): void {
    const store = usePromptBooksStore.getState()
    store.setSyncStatus('syncing')

    // Channel 1: Collections
    const collectionsChannel = this.client
      .channel('pb_collections_sync')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pb_collections',
          filter: `user_id=eq.${this.userId}`,
        },
        (payload) => {
          const store = usePromptBooksStore.getState()
          switch (payload.eventType) {
            case 'INSERT':
              store.addCollection(mapCollection(payload.new))
              break
            case 'UPDATE':
              store.updateCollectionInStore(mapCollection(payload.new))
              break
            case 'DELETE':
              if (payload.old.id) store.removeCollection(payload.old.id as string)
              break
          }
          store.setLastSyncAt(new Date().toISOString())
        },
      )
      .subscribe()

    this.channels.push(collectionsChannel)

    // Channel 2: Prompts
    const promptsChannel = this.client
      .channel('pb_prompts_sync')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pb_prompts',
          filter: `user_id=eq.${this.userId}`,
        },
        (payload) => {
          const store = usePromptBooksStore.getState()
          switch (payload.eventType) {
            case 'INSERT':
              store.addPrompt(mapPrompt(payload.new))
              break
            case 'UPDATE':
              store.updatePromptInStore(mapPrompt(payload.new))
              break
            case 'DELETE':
              if (payload.old.id) store.removePrompt(payload.old.id as string)
              break
          }
          store.setLastSyncAt(new Date().toISOString())
        },
      )
      .subscribe()

    this.channels.push(promptsChannel)

    // Channel 3: Tags
    const tagsChannel = this.client
      .channel('pb_tags_sync')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pb_tags',
          filter: `user_id=eq.${this.userId}`,
        },
        (payload) => {
          const store = usePromptBooksStore.getState()
          switch (payload.eventType) {
            case 'INSERT':
              store.addTag(mapTag(payload.new))
              break
            case 'UPDATE':
              store.updateTagInStore(mapTag(payload.new))
              break
            case 'DELETE':
              if (payload.old.id) store.removeTag(payload.old.id as string)
              break
          }
          store.setLastSyncAt(new Date().toISOString())
        },
      )
      .subscribe()

    this.channels.push(tagsChannel)

    store.setSyncStatus('synced')
    store.setLastSyncAt(new Date().toISOString())
  }

  unsubscribe(): void {
    for (const channel of this.channels) {
      this.client.removeChannel(channel)
    }
    this.channels = []

    const store = usePromptBooksStore.getState()
    store.setSyncStatus('offline')
  }
}
