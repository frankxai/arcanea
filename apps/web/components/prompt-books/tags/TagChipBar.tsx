'use client'

import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TagChip } from './TagChip'
import type { Tag } from '@/lib/prompt-books/types'

interface TagChipBarProps {
  tags: Tag[]
  selectedIds: string[]
  onToggle: (tagId: string) => void
  onRemove: (tagId: string) => void
  onAddClick: () => void
  maxVisible?: number
  className?: string
}

export function TagChipBar({
  tags,
  selectedIds,
  onToggle,
  onRemove,
  onAddClick,
  maxVisible = 10,
  className,
}: TagChipBarProps) {
  const visibleTags = tags.slice(0, maxVisible)
  const overflow = tags.length - maxVisible

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {visibleTags.map((tag) => (
        <TagChip
          key={tag.id}
          tag={tag}
          selected={selectedIds.includes(tag.id)}
          removable={selectedIds.includes(tag.id)}
          onClick={() => onToggle(tag.id)}
          onRemove={() => onRemove(tag.id)}
        />
      ))}

      {overflow > 0 && (
        <span className="text-[10px] font-sans text-text-muted/60 px-1">
          +{overflow} more
        </span>
      )}

      <button
        type="button"
        onClick={onAddClick}
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
          'text-[10px] font-sans text-text-muted hover:text-text-secondary',
          'border border-dashed border-white/[0.08] hover:border-white/15',
          'transition-all',
        )}
      >
        <Plus className="w-2.5 h-2.5" />
        <span>Tag</span>
      </button>
    </div>
  )
}
