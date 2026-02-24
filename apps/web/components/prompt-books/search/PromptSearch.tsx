'use client'

// Arcanea Prompt Books — Command Palette Search
// Full-screen overlay with debounced search, keyboard nav, grouped results

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, ArrowUp, ArrowDown, CornerDownLeft, Command,
  MessageSquare, Image, ImagePlus, MessagesSquare, Link,
  ListOrdered, Code, PenTool, BarChart3, Clock, Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import { PROMPT_TYPES } from '@/lib/prompt-books/constants'
import type { Prompt, PromptType } from '@/lib/prompt-books/types'

// =====================================================================
// Icon Map — maps PROMPT_TYPES.icon string to Lucide component
// =====================================================================

const PROMPT_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image,
  ImagePlus,
  MessagesSquare,
  Link,
  ListOrdered,
  Code,
  PenTool,
  BarChart3,
}

function getTypeIcon(promptType: PromptType) {
  const config = PROMPT_TYPES[promptType]
  return PROMPT_TYPE_ICONS[config.icon] ?? MessageSquare
}

// =====================================================================
// Animation Variants
// =====================================================================

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

const paletteVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 32,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -10,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

// =====================================================================
// Types
// =====================================================================

interface PromptSearchProps {
  isOpen: boolean
  onClose: () => void
  onSelectPrompt: (promptId: string) => void
}

interface GroupedResults {
  collectionName: string
  collectionId: string | null
  prompts: Prompt[]
}

// =====================================================================
// Component
// =====================================================================

export function PromptSearch({ isOpen, onClose, onSelectPrompt }: PromptSearchProps) {
  const {
    searchResults,
    isSearching,
    search,
    clearSearch,
    prompts,
    collections,
  } = usePromptBooksStore()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Portal mount guard ──────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // ── Focus input on open ─────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Small delay to let framer-motion render
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    } else {
      setQuery('')
      setSelectedIndex(0)
      clearSearch()
    }
  }, [isOpen, clearSearch])

  // ── Scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ── Debounced search ────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      clearSearch()
      setSelectedIndex(0)
      return
    }

    debounceRef.current = setTimeout(() => {
      search(query.trim())
      setSelectedIndex(0)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, search, clearSearch])

  // ── Recent prompts (when query is empty) ────────────────────────────
  const recentPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => {
        // Prioritize lastUsedAt, fall back to updatedAt
        const aTime = a.lastUsedAt || a.updatedAt
        const bTime = b.lastUsedAt || b.updatedAt
        return new Date(bTime).getTime() - new Date(aTime).getTime()
      })
      .slice(0, 10)
  }, [prompts])

  // ── Displayed results ───────────────────────────────────────────────
  const displayedResults = query.trim() ? searchResults : recentPrompts

  // ── Group results by collection ─────────────────────────────────────
  const groupedResults = useMemo((): GroupedResults[] => {
    const groups = new Map<string | null, Prompt[]>()

    for (const prompt of displayedResults) {
      const key = prompt.collectionId
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(prompt)
    }

    return Array.from(groups.entries()).map(([collectionId, groupPrompts]) => {
      const collection = collectionId
        ? collections.find((c) => c.id === collectionId)
        : null
      return {
        collectionName: collection?.name ?? 'Uncategorized',
        collectionId,
        prompts: groupPrompts,
      }
    })
  }, [displayedResults, collections])

  // ── Flat list for keyboard nav ──────────────────────────────────────
  const flatResults = useMemo(
    () => groupedResults.flatMap((g) => g.prompts),
    [groupedResults],
  )

  // ── Scroll selected into view ───────────────────────────────────────
  useEffect(() => {
    const item = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    item?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // ── Keyboard navigation ─────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1,
          )
          break
        case 'Enter':
          e.preventDefault()
          if (flatResults[selectedIndex]) {
            onSelectPrompt(flatResults[selectedIndex].id)
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    },
    [flatResults, selectedIndex, onSelectPrompt, onClose],
  )

  // ── Select handler ──────────────────────────────────────────────────
  const handleSelect = useCallback(
    (promptId: string) => {
      onSelectPrompt(promptId)
      onClose()
    },
    [onSelectPrompt, onClose],
  )

  // ── Compute flat index for a prompt in grouped list ─────────────────
  const getFlatIndex = useCallback(
    (prompt: Prompt): number => {
      return flatResults.indexOf(prompt)
    },
    [flatResults],
  )

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]"
          role="presentation"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Palette */}
          <motion.div
            key="search-palette"
            variants={paletteVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Search prompts"
            className={cn(
              'relative z-10 w-full max-w-2xl mx-4',
              'rounded-2xl overflow-hidden',
              'bg-[rgba(12,16,28,0.96)] backdrop-blur-[24px]',
              'border border-[rgba(127,255,212,0.12)]',
              'shadow-[0_16px_64px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.06)]',
            )}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-text-muted flex-shrink-0" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search prompts..."
                className={cn(
                  'flex-1 bg-transparent text-base font-sans text-text-primary',
                  'placeholder:text-text-muted',
                  'focus:outline-none',
                )}
                aria-label="Search prompts"
                aria-autocomplete="list"
                aria-controls="search-results-list"
                aria-activedescendant={
                  flatResults[selectedIndex]
                    ? `search-result-${flatResults[selectedIndex].id}`
                    : undefined
                }
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); clearSearch() }}
                  className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-all duration-150"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="search-results-list"
              role="listbox"
              aria-label="Search results"
              className="max-h-[50vh] overflow-y-auto overscroll-contain"
            >
              {/* Loading state */}
              {isSearching && (
                <div className="px-5 py-8 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-text-muted text-sm font-sans">
                    <div className="w-4 h-4 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </div>
                </div>
              )}

              {/* Empty state with query */}
              {!isSearching && query.trim() && flatResults.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <Search className="w-8 h-8 text-text-muted/50 mx-auto mb-3" />
                  <p className="text-sm font-sans text-text-muted">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs font-sans text-text-muted/60 mt-1">
                    Try a different search term
                  </p>
                </div>
              )}

              {/* Empty state without query and no recents */}
              {!isSearching && !query.trim() && flatResults.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <Clock className="w-8 h-8 text-text-muted/50 mx-auto mb-3" />
                  <p className="text-sm font-sans text-text-muted">
                    No recent prompts
                  </p>
                  <p className="text-xs font-sans text-text-muted/60 mt-1">
                    Create your first prompt to get started
                  </p>
                </div>
              )}

              {/* Section header: Recent or Results */}
              {!isSearching && flatResults.length > 0 && (
                <div className="px-5 pt-3 pb-1">
                  <span className="text-[11px] font-sans font-semibold text-text-muted uppercase tracking-widest">
                    {query.trim() ? 'Results' : 'Recent'}
                  </span>
                </div>
              )}

              {/* Grouped results */}
              {!isSearching &&
                groupedResults.map((group) => (
                  <div key={group.collectionId ?? '_uncategorized'}>
                    {/* Collection group header */}
                    <div className="px-5 pt-2 pb-1">
                      <span className="text-[10px] font-sans font-medium text-text-muted/70 uppercase tracking-wider">
                        In {group.collectionName}
                      </span>
                    </div>

                    {/* Items */}
                    {group.prompts.map((prompt) => {
                      const flatIdx = getFlatIndex(prompt)
                      const isSelected = flatIdx === selectedIndex
                      const TypeIcon = getTypeIcon(prompt.promptType)
                      const typeConfig = PROMPT_TYPES[prompt.promptType]
                      const preview = prompt.content.slice(0, 80)
                      const tagCount = prompt.tags?.length ?? 0

                      return (
                        <div
                          key={prompt.id}
                          id={`search-result-${prompt.id}`}
                          role="option"
                          aria-selected={isSelected}
                          data-index={flatIdx}
                          onClick={() => handleSelect(prompt.id)}
                          onMouseEnter={() => setSelectedIndex(flatIdx)}
                          className={cn(
                            'mx-2 px-3 py-2.5 rounded-lg cursor-pointer',
                            'flex items-start gap-3',
                            'transition-all duration-100',
                            isSelected
                              ? 'bg-white/[0.06] border border-white/[0.08]'
                              : 'border border-transparent hover:bg-white/[0.04]',
                          )}
                        >
                          {/* Type icon */}
                          <div
                            className={cn(
                              'mt-0.5 w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0',
                              'glass-subtle',
                            )}
                          >
                            <TypeIcon className="w-3.5 h-3.5 text-brand-accent" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-sans font-medium text-text-primary truncate">
                                {prompt.title}
                              </span>
                              <span className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-sans font-medium text-text-muted flex-shrink-0">
                                {typeConfig.label}
                              </span>
                            </div>
                            <p className="text-xs font-sans text-text-muted truncate mt-0.5">
                              {preview}{prompt.content.length > 80 ? '...' : ''}
                            </p>
                            {tagCount > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <Tag className="w-3 h-3 text-text-muted/60" />
                                <span className="text-[10px] font-sans text-text-muted/60">
                                  {tagCount} tag{tagCount !== 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Selected indicator */}
                          {isSelected && (
                            <div className="flex-shrink-0 mt-1">
                              <CornerDownLeft className="w-3.5 h-3.5 text-text-muted/50" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
            </div>

            {/* Footer — keyboard hints */}
            <div className="px-5 py-2.5 border-t border-white/5 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px] font-sans text-text-muted/60">
                <kbd className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-mono">
                  <ArrowUp className="w-3 h-3 inline" />
                </kbd>
                <kbd className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-mono">
                  <ArrowDown className="w-3 h-3 inline" />
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-sans text-text-muted/60">
                <kbd className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-mono">
                  <CornerDownLeft className="w-3 h-3 inline" />
                </kbd>
                <span>Open</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-sans text-text-muted/60">
                <kbd className="glass-subtle px-1.5 py-0.5 rounded text-[10px] font-mono text-[10px]">
                  esc
                </kbd>
                <span>Close</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[11px] font-sans text-text-muted/40">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
