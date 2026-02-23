'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TAG_CATEGORIES } from '@/lib/prompt-books/constants'
import type { Tag } from '@/lib/prompt-books/types'

interface TagChipProps {
  tag: Tag
  selected?: boolean
  removable?: boolean
  onClick?: () => void
  onRemove?: () => void
  size?: 'sm' | 'md'
}

export function TagChip({
  tag,
  selected = false,
  removable = false,
  onClick,
  onRemove,
  size = 'sm',
}: TagChipProps) {
  const categoryColor = tag.category ? TAG_CATEGORIES[tag.category]?.color : tag.color
  const chipColor = categoryColor || '#78a6ff'

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-sans transition-all',
        'border',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        selected
          ? 'bg-white/10 border-white/20 text-text-primary'
          : 'bg-transparent border-white/[0.06] text-text-muted hover:text-text-secondary hover:border-white/10',
        onClick && 'cursor-pointer',
        !onClick && 'cursor-default',
      )}
      style={{
        borderColor: selected ? chipColor : undefined,
        boxShadow: selected ? `0 0 8px ${chipColor}33` : undefined,
      }}
    >
      {/* Color dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: chipColor }}
      />

      <span>{tag.name}</span>

      {/* Weight badge */}
      {tag.weightModifier && tag.weightModifier !== 1 && (
        <span className={cn(
          'font-mono opacity-60',
          size === 'sm' ? 'text-[8px]' : 'text-[10px]',
        )}>
          {tag.weightModifier > 1 ? '+' : ''}{((tag.weightModifier - 1) * 100).toFixed(0)}%
        </span>
      )}

      {/* Remove button */}
      {removable && onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              onRemove()
            }
          }}
          className="ml-0.5 text-text-muted hover:text-error transition-colors"
          aria-label={`Remove ${tag.name}`}
        >
          <X className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
        </span>
      )}
    </button>
  )
}
