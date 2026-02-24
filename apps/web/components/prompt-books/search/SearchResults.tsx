'use client'

// Arcanea Prompt Books — Search Results Display
// Renders search results with highlighted matches, loading skeleton, and empty states

import { useMemo, Fragment } from 'react'
import { Search, FileQuestion } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import { Skeleton } from '@/components/ui/skeleton'
import { PROMPT_TYPES } from '@/lib/prompt-books/constants'
import type { Prompt } from '@/lib/prompt-books/types'

// =====================================================================
// Types
// =====================================================================

interface SearchResultsProps {
  onSelectPrompt: (id: string) => void
  className?: string
}

// =====================================================================
// Highlight Helper
// =====================================================================

/**
 * Highlights matching substrings in text by wrapping them in <mark>.
 * Case-insensitive, escapes regex special chars in the query.
 */
function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text

  // Escape regex special characters
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  if (parts.length === 1) return text

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-brand-accent/20 text-brand-accent rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

// =====================================================================
// Loading Skeleton
// =====================================================================

function SearchResultsSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading search results">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="glass rounded-lg px-4 py-3 flex items-center gap-3"
        >
          <Skeleton variant="rect" className="w-7 h-7 rounded-md flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/3 h-4" />
            <Skeleton variant="text" className="w-2/3 h-3" />
          </div>
          <Skeleton variant="rect" className="w-14 h-5 rounded-md flex-shrink-0" />
        </div>
      ))}
    </div>
  )
}

// =====================================================================
// Single Result Row
// =====================================================================

interface ResultRowProps {
  prompt: Prompt
  query: string
  onClick: () => void
}

function ResultRow({ prompt, query, onClick }: ResultRowProps) {
  const typeConfig = PROMPT_TYPES[prompt.promptType]
  const preview = prompt.content.slice(0, 120)
  const tagCount = prompt.tags?.length ?? 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full glass rounded-lg px-4 py-3',
        'flex items-start gap-3 text-left',
        'hover:bg-cosmic-raised/50 transition-all duration-150',
        'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-0',
      )}
    >
      {/* Type indicator bar */}
      <div className="w-1 h-8 rounded-full bg-brand-primary/30 flex-shrink-0 mt-0.5" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-sans font-medium text-text-primary truncate group-hover:text-brand-accent transition-colors">
            {highlightMatches(prompt.title, query)}
          </h4>
          <span className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-sans font-medium text-text-muted flex-shrink-0">
            {typeConfig.label}
          </span>
        </div>
        <p className="text-xs text-text-muted font-sans line-clamp-2">
          {highlightMatches(preview, query)}
          {prompt.content.length > 120 ? '...' : ''}
        </p>

        {/* Tags */}
        {tagCount > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            {prompt.tags!.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="glass-subtle px-1.5 py-0.5 rounded text-[9px] font-sans text-text-muted"
              >
                {tag.name}
              </span>
            ))}
            {tagCount > 3 && (
              <span className="text-[9px] font-sans text-text-muted/60">
                +{tagCount - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Use count */}
      {prompt.useCount > 0 && (
        <span className="text-[10px] font-sans text-text-muted/60 flex-shrink-0 mt-1">
          {prompt.useCount} use{prompt.useCount !== 1 ? 's' : ''}
        </span>
      )}
    </button>
  )
}

// =====================================================================
// Main Component
// =====================================================================

export function SearchResults({ onSelectPrompt, className }: SearchResultsProps) {
  const {
    searchQuery,
    searchResults,
    isSearching,
    collections,
  } = usePromptBooksStore()

  // ── Group results by collection ─────────────────────────────────────
  const groupedResults = useMemo(() => {
    const groups = new Map<string | null, Prompt[]>()
    for (const prompt of searchResults) {
      const key = prompt.collectionId
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(prompt)
    }
    return Array.from(groups.entries()).map(([collectionId, prompts]) => ({
      collectionName: collectionId
        ? collections.find((c) => c.id === collectionId)?.name ?? 'Unknown'
        : 'Uncategorized',
      collectionId,
      prompts,
    }))
  }, [searchResults, collections])

  // ── Not searching — don't render ────────────────────────────────────
  if (!searchQuery.trim()) return null

  return (
    <div
      className={cn('px-6 py-4', className)}
      role="region"
      aria-label="Search results"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
          {isSearching
            ? 'Searching...'
            : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`}
        </h3>
      </div>

      {/* Loading */}
      {isSearching && <SearchResultsSkeleton />}

      {/* Empty state */}
      {!isSearching && searchResults.length === 0 && (
        <div className="py-12 text-center">
          <FileQuestion className="w-10 h-10 text-text-muted/30 mx-auto mb-3" />
          <p className="text-sm font-sans text-text-muted">
            No results for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs font-sans text-text-muted/60 mt-1">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Results */}
      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-4">
          {groupedResults.map((group) => (
            <div key={group.collectionId ?? '_uncategorized'}>
              {/* Collection header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-sans font-medium text-text-muted/60 uppercase tracking-wider flex-shrink-0">
                  {group.collectionName}
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              {/* Result rows */}
              <div className="space-y-1.5">
                {group.prompts.map((prompt) => (
                  <ResultRow
                    key={prompt.id}
                    prompt={prompt}
                    query={searchQuery}
                    onClick={() => onSelectPrompt(prompt.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
