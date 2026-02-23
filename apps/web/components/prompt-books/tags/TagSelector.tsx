'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TagChip } from './TagChip'
import { TAG_CATEGORIES, DEFAULT_TAGS } from '@/lib/prompt-books/constants'
import type { Tag, TagCategory } from '@/lib/prompt-books/types'

interface TagSelectorProps {
  tags: Tag[]
  assignedTagIds: string[]
  onAssign: (tagId: string) => void
  onUnassign: (tagId: string) => void
  onCreateTag: (name: string, category: TagCategory) => Promise<Tag>
  open: boolean
  onClose: () => void
}

export function TagSelector({
  tags,
  assignedTagIds,
  onAssign,
  onUnassign,
  onCreateTag,
  open,
  onClose,
}: TagSelectorProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<TagCategory | 'all'>('all')
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    let result = tags
    if (activeCategory !== 'all') {
      result = result.filter((t) => t.category === activeCategory)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.name.toLowerCase().includes(q))
    }
    return result
  }, [tags, activeCategory, search])

  const handleCreateAndAssign = async () => {
    if (!search.trim()) return
    setCreating(true)
    try {
      const tag = await onCreateTag(search.trim(), activeCategory === 'all' ? 'custom' : activeCategory)
      onAssign(tag.id)
      setSearch('')
    } finally {
      setCreating(false)
    }
  }

  if (!open) return null

  return (
    <div className="glass-strong rounded-xl border border-white/10 w-72 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <span className="text-xs font-sans font-medium text-text-secondary uppercase tracking-wider">Tags</span>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary"
          type="button"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 glass-subtle rounded-lg px-2 py-1.5">
          <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search or create..."
            className="flex-1 bg-transparent text-xs font-sans text-text-primary placeholder:text-text-muted/40 focus:outline-none"
            autoFocus
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-none border-b border-white/[0.04]">
        <CategoryButton
          label="All"
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        />
        {(Object.keys(TAG_CATEGORIES) as TagCategory[]).map((cat) => (
          <CategoryButton
            key={cat}
            label={TAG_CATEGORIES[cat].label}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            color={TAG_CATEGORIES[cat].color}
          />
        ))}
      </div>

      {/* Tag list */}
      <div className="max-h-48 overflow-y-auto p-2">
        {filtered.length === 0 && !search ? (
          <div className="text-center text-xs text-text-muted py-4">No tags in this category</div>
        ) : filtered.length === 0 && search ? (
          <div className="text-center py-4">
            <p className="text-xs text-text-muted mb-2">No tags matching &quot;{search}&quot;</p>
            <button
              type="button"
              onClick={handleCreateAndAssign}
              disabled={creating}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-sans',
                'glass text-text-primary hover:scale-[1.02] transition-transform',
              )}
            >
              <Plus className="w-3 h-3" />
              Create &quot;{search}&quot;
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {filtered.map((tag) => {
              const isAssigned = assignedTagIds.includes(tag.id)
              return (
                <TagChip
                  key={tag.id}
                  tag={tag}
                  selected={isAssigned}
                  size="md"
                  onClick={() => isAssigned ? onUnassign(tag.id) : onAssign(tag.id)}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryButton({
  label,
  active,
  onClick,
  color,
}: {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-2 py-1 rounded-md text-[10px] font-sans font-medium whitespace-nowrap transition-all',
        active
          ? 'glass text-text-primary'
          : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]',
      )}
      style={active && color ? { borderColor: `${color}44`, boxShadow: `0 0 6px ${color}22` } : undefined}
    >
      {label}
    </button>
  )
}
