'use client'

import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import { CollectionTree } from './CollectionTree'
import { SidebarSearch } from './SidebarSearch'
import { SyncStatusIndicator } from './SyncStatusIndicator'

interface PromptBooksSidebarProps {
  onCreateCollection: () => void
}

export function PromptBooksSidebar({ onCreateCollection }: PromptBooksSidebarProps) {
  const {
    collections,
    activeCollectionId,
    setActiveCollection,
    sidebarCollapsed,
    toggleSidebar,
    syncStatus,
    lastSyncAt,
  } = usePromptBooksStore()

  const [searchQuery, setSearchQuery] = useState('')

  const filteredCollections = searchQuery
    ? collections.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : collections

  const rootCollections = filteredCollections
    .filter((c) => !c.parentId && !c.isArchived)
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
      return a.sortOrder - b.sortOrder
    })

  return (
    <aside
      className={cn(
        'glass-strong flex flex-col border-r border-white/5 transition-all duration-300 h-full',
        sidebarCollapsed ? 'w-16' : 'w-72',
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-brand-accent" />
        </div>
        {!sidebarCollapsed && (
          <h2 className="text-sm font-display font-bold text-text-primary tracking-wide">
            PROMPT BOOKS
          </h2>
        )}
      </div>

      {/* New Collection Button */}
      {!sidebarCollapsed && (
        <div className="p-3">
          <Button
            onClick={onCreateCollection}
            className="w-full glass-subtle justify-start gap-2 hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4 text-brand-accent" />
            <span className="font-sans font-medium text-sm">New Collection</span>
          </Button>
        </div>
      )}

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="px-3 pb-2">
          <SidebarSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
      )}

      {/* Collection Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center gap-1 pt-2">
            {rootCollections.slice(0, 8).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCollection(c.id)}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                  activeCollectionId === c.id
                    ? 'glass text-brand-accent'
                    : 'text-text-muted hover:text-text-secondary hover:bg-cosmic-raised',
                )}
                title={c.name}
              >
                <BookOpen className="w-4 h-4" />
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* All Prompts */}
            <button
              onClick={() => setActiveCollection(null)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm',
                activeCollectionId === null
                  ? 'glass text-text-primary font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised',
              )}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-sans">All Prompts</span>
            </button>

            <CollectionTree
              collections={rootCollections}
              allCollections={filteredCollections}
              activeId={activeCollectionId}
              onSelect={setActiveCollection}
            />
          </>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 flex items-center justify-between">
        <SyncStatusIndicator status={syncStatus} lastSyncAt={lastSyncAt} />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-text-muted hover:text-text-primary hover:bg-cosmic-raised"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>
    </aside>
  )
}
