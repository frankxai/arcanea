'use client'

import { useState, type ReactNode } from 'react'
import { ChevronRight, Pin, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import type { Collection } from '@/lib/prompt-books/types'

interface CollectionItemProps {
  collection: Collection
  isActive: boolean
  depth: number
  onSelect: (id: string) => void
  hasChildren: boolean
  children?: ReactNode
}

export function CollectionItem({
  collection,
  isActive,
  depth,
  onSelect,
  hasChildren,
  children,
}: CollectionItemProps) {
  const [expanded, setExpanded] = useState(true)

  const theme = collection.guardianId
    ? GUARDIAN_THEMES[collection.guardianId]
    : null

  const guardianColor = theme?.color

  return (
    <div>
      <button
        onClick={() => onSelect(collection.id)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150 group text-sm',
          isActive
            ? cn('glass text-text-primary font-medium', theme?.glowClass)
            : 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised',
        )}
        style={{
          paddingLeft: `${12 + depth * 16}px`,
          borderLeft: isActive && guardianColor
            ? `2px solid ${guardianColor}`
            : isActive
              ? '2px solid rgba(127, 255, 212, 0.5)'
              : '2px solid transparent',
        }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
            className="p-0.5 -ml-1 rounded hover:bg-cosmic-raised/50"
          >
            <ChevronRight
              className={cn(
                'w-3 h-3 transition-transform',
                expanded && 'rotate-90',
              )}
            />
          </button>
        )}

        {/* Icon */}
        <BookOpen
          className={cn(
            'w-4 h-4 flex-shrink-0',
            isActive ? 'text-brand-accent' : 'text-text-muted group-hover:text-text-secondary',
          )}
          style={isActive && guardianColor ? { color: guardianColor } : undefined}
        />

        {/* Name */}
        <span className="font-sans truncate flex-1 text-left">{collection.name}</span>

        {/* Badges */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {collection.isPinned && (
            <Pin className="w-3 h-3 text-brand-gold" />
          )}
          {collection.promptCount > 0 && (
            <span className="text-xs font-mono text-text-muted">
              {collection.promptCount}
            </span>
          )}
        </div>
      </button>

      {/* Children */}
      {hasChildren && expanded && children}
    </div>
  )
}
