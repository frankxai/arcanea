'use client'

// Arcanea Prompt Books — Zustand Store
// Client-side state management with localStorage persistence

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Collection, Prompt, Tag, PromptType, SyncStatus,
  CreateCollectionInput, UpdateCollectionInput,
  CreatePromptInput, UpdatePromptInput,
  CreateTagInput, UpdateTagInput,
  PromptFilters,
} from './types'
import * as service from './service'
import type { SupabaseClient } from '@supabase/supabase-js'

// =====================================================================
// Store Interface
// =====================================================================

interface PromptBooksState {
  // Data
  collections: Collection[]
  prompts: Prompt[]
  tags: Tag[]

  // Active state
  activeCollectionId: string | null
  activePromptId: string | null
  activePromptType: PromptType | null

  // UI state
  sidebarCollapsed: boolean
  editorSplitView: boolean
  viewMode: 'grid' | 'list'

  // Search
  searchQuery: string
  searchResults: Prompt[]
  isSearching: boolean

  // Sync
  syncStatus: SyncStatus
  lastSyncAt: string | null

  // Supabase client reference (set on init)
  _client: SupabaseClient | null
  _userId: string | null

  // Actions — Initialization
  initialize: (client: SupabaseClient, userId: string) => Promise<void>

  // Actions — Collections
  loadCollections: () => Promise<void>
  addCollection: (collection: Collection) => void
  updateCollectionInStore: (collection: Collection) => void
  removeCollection: (id: string) => void
  createCollection: (input: CreateCollectionInput) => Promise<Collection>
  updateCollection: (id: string, input: UpdateCollectionInput) => Promise<Collection>
  deleteCollection: (id: string) => Promise<void>
  setActiveCollection: (id: string | null) => void

  // Actions — Prompts
  loadPrompts: (filters?: PromptFilters) => Promise<void>
  addPrompt: (prompt: Prompt) => void
  updatePromptInStore: (prompt: Prompt) => void
  removePrompt: (id: string) => void
  createPrompt: (input: CreatePromptInput) => Promise<Prompt>
  updatePrompt: (id: string, input: UpdatePromptInput) => Promise<Prompt>
  deletePrompt: (id: string) => Promise<void>
  duplicatePrompt: (id: string) => Promise<Prompt>
  setActivePrompt: (id: string | null) => void
  setActivePromptType: (type: PromptType | null) => void

  // Actions — Tags
  loadTags: (collectionId?: string) => Promise<void>
  addTag: (tag: Tag) => void
  updateTagInStore: (tag: Tag) => void
  removeTag: (id: string) => void
  createTag: (input: CreateTagInput) => Promise<Tag>
  updateTag: (id: string, input: UpdateTagInput) => Promise<Tag>
  deleteTag: (id: string) => Promise<void>

  // Actions — Search
  search: (query: string) => Promise<void>
  clearSearch: () => void

  // Actions — UI
  toggleSidebar: () => void
  toggleSplitView: () => void
  setViewMode: (mode: 'grid' | 'list') => void

  // Actions — Sync
  setSyncStatus: (status: SyncStatus) => void
  setLastSyncAt: (time: string) => void
}

// =====================================================================
// Store Implementation
// =====================================================================

export const usePromptBooksStore = create<PromptBooksState>()(
  persist(
    (set, get) => ({
      // Initial data
      collections: [],
      prompts: [],
      tags: [],

      // Active state
      activeCollectionId: null,
      activePromptId: null,
      activePromptType: null,

      // UI state
      sidebarCollapsed: false,
      editorSplitView: false,
      viewMode: 'grid',

      // Search
      searchQuery: '',
      searchResults: [],
      isSearching: false,

      // Sync
      syncStatus: 'offline',
      lastSyncAt: null,

      // Internal
      _client: null,
      _userId: null,

      // =====================================================
      // Initialization
      // =====================================================

      initialize: async (client, userId) => {
        set({ _client: client, _userId: userId, syncStatus: 'syncing' })

        try {
          await get().loadCollections()
          await get().loadTags()
          set({ syncStatus: 'synced', lastSyncAt: new Date().toISOString() })
        } catch {
          set({ syncStatus: 'error' })
        }
      },

      // =====================================================
      // Collections
      // =====================================================

      loadCollections: async () => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) return

        const collections = await service.listCollections(client, userId)
        set({ collections })
      },

      addCollection: (collection) => {
        set((s) => ({
          collections: [...s.collections.filter((c) => c.id !== collection.id), collection],
        }))
      },

      updateCollectionInStore: (collection) => {
        set((s) => ({
          collections: s.collections.map((c) => c.id === collection.id ? collection : c),
        }))
      },

      removeCollection: (id) => {
        set((s) => ({
          collections: s.collections.filter((c) => c.id !== id),
          activeCollectionId: s.activeCollectionId === id ? null : s.activeCollectionId,
        }))
      },

      createCollection: async (input) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) throw new Error('Not initialized')

        const collection = await service.createCollection(client, userId, input)
        get().addCollection(collection)
        return collection
      },

      updateCollection: async (id, input) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        const collection = await service.updateCollection(client, id, input)
        get().updateCollectionInStore(collection)
        return collection
      },

      deleteCollection: async (id) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        await service.deleteCollection(client, id)
        get().removeCollection(id)
      },

      setActiveCollection: (id) => {
        set({ activeCollectionId: id, activePromptId: null })
        if (id) {
          get().loadPrompts({ collectionId: id })
          get().loadTags(id)
        }
      },

      // =====================================================
      // Prompts
      // =====================================================

      loadPrompts: async (filters) => {
        const { _client: client, _userId: userId, activeCollectionId } = get()
        if (!client || !userId) return

        const prompts = await service.listPrompts(client, {
          userId,
          collectionId: filters?.collectionId || activeCollectionId || undefined,
          promptType: filters?.promptType || undefined,
          ...filters,
        })
        set({ prompts })
      },

      addPrompt: (prompt) => {
        set((s) => ({
          prompts: [...s.prompts.filter((p) => p.id !== prompt.id), prompt],
        }))
      },

      updatePromptInStore: (prompt) => {
        set((s) => ({
          prompts: s.prompts.map((p) => p.id === prompt.id ? prompt : p),
        }))
      },

      removePrompt: (id) => {
        set((s) => ({
          prompts: s.prompts.filter((p) => p.id !== id),
          activePromptId: s.activePromptId === id ? null : s.activePromptId,
        }))
      },

      createPrompt: async (input) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) throw new Error('Not initialized')

        const prompt = await service.createPrompt(client, userId, input)
        get().addPrompt(prompt)
        return prompt
      },

      updatePrompt: async (id, input) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        const prompt = await service.updatePrompt(client, id, input)
        get().updatePromptInStore(prompt)
        return prompt
      },

      deletePrompt: async (id) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        await service.deletePrompt(client, id)
        get().removePrompt(id)
      },

      duplicatePrompt: async (id) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) throw new Error('Not initialized')

        const prompt = await service.duplicatePrompt(client, id, userId)
        get().addPrompt(prompt)
        return prompt
      },

      setActivePrompt: (id) => set({ activePromptId: id }),
      setActivePromptType: (type) => set({ activePromptType: type }),

      // =====================================================
      // Tags
      // =====================================================

      loadTags: async (collectionId) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) return

        const tags = await service.listTags(client, userId, collectionId)
        set({ tags })
      },

      addTag: (tag) => {
        set((s) => ({
          tags: [...s.tags.filter((t) => t.id !== tag.id), tag],
        }))
      },

      updateTagInStore: (tag) => {
        set((s) => ({
          tags: s.tags.map((t) => t.id === tag.id ? tag : t),
        }))
      },

      removeTag: (id) => {
        set((s) => ({ tags: s.tags.filter((t) => t.id !== id) }))
      },

      createTag: async (input) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) throw new Error('Not initialized')

        const tag = await service.createTag(client, userId, input)
        get().addTag(tag)
        return tag
      },

      updateTag: async (id, input) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        const tag = await service.updateTag(client, id, input)
        get().updateTagInStore(tag)
        return tag
      },

      deleteTag: async (id) => {
        const { _client: client } = get()
        if (!client) throw new Error('Not initialized')

        await service.deleteTag(client, id)
        get().removeTag(id)
      },

      // =====================================================
      // Search
      // =====================================================

      search: async (query) => {
        const { _client: client, _userId: userId } = get()
        if (!client || !userId) return

        set({ searchQuery: query, isSearching: true })

        try {
          const results = await service.searchPrompts(client, userId, query)
          set({ searchResults: results, isSearching: false })
        } catch {
          set({ searchResults: [], isSearching: false })
        }
      },

      clearSearch: () => {
        set({ searchQuery: '', searchResults: [], isSearching: false })
      },

      // =====================================================
      // UI
      // =====================================================

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      toggleSplitView: () => set((s) => ({ editorSplitView: !s.editorSplitView })),
      setViewMode: (mode) => set({ viewMode: mode }),

      // =====================================================
      // Sync
      // =====================================================

      setSyncStatus: (status) => set({ syncStatus: status }),
      setLastSyncAt: (time) => set({ lastSyncAt: time }),
    }),
    {
      name: 'arcanea-prompt-books',
      partialize: (state) => ({
        // Only persist UI preferences, not data
        sidebarCollapsed: state.sidebarCollapsed,
        editorSplitView: state.editorSplitView,
        viewMode: state.viewMode,
        activeCollectionId: state.activeCollectionId,
      }),
    },
  ),
)
