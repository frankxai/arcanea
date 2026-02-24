'use client'

import {
  Save, Copy, Trash2, ArrowLeft, Clock, History,
  SplitSquareHorizontal, Download, Star, Bookmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EditorToolbarProps {
  title: string
  onTitleChange: (title: string) => void
  isDirty: boolean
  isSaving: boolean
  lastSavedAt: string | null
  wordCount: number
  charCount: number
  isFavorite?: boolean
  splitView: boolean
  onSave: () => void
  onCopy: () => void
  onDelete: () => void
  onBack: () => void
  onToggleSplit: () => void
  onToggleFavorite?: () => void
  onShowHistory: () => void
  onExport: () => void
  onSaveAsTemplate?: () => void
}

export function EditorToolbar({
  title,
  onTitleChange,
  isDirty,
  isSaving,
  lastSavedAt,
  wordCount,
  charCount,
  isFavorite,
  splitView,
  onSave,
  onCopy,
  onDelete,
  onBack,
  onToggleSplit,
  onToggleFavorite,
  onShowHistory,
  onExport,
  onSaveAsTemplate,
}: EditorToolbarProps) {
  const savedLabel = isSaving
    ? 'Saving...'
    : isDirty
      ? 'Unsaved changes'
      : lastSavedAt
        ? `Saved ${formatTimeAgo(lastSavedAt)}`
        : ''

  return (
    <div className="border-b border-white/5">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-text-muted hover:text-text-primary shrink-0"
          aria-label="Back to collection"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Prompt"
          className={cn(
            'flex-1 bg-transparent text-lg font-display text-text-primary',
            'placeholder:text-text-muted/50 focus:outline-none',
            'border-none p-0',
          )}
        />

        <div className="flex items-center gap-1">
          {/* Save status */}
          <span className={cn(
            'text-xs font-sans mr-2',
            isDirty ? 'text-brand-gold' : 'text-text-muted',
          )}>
            {savedLabel}
          </span>

          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="text-text-muted hover:text-brand-gold"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={cn('w-4 h-4', isFavorite && 'fill-brand-gold text-brand-gold')} />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className="text-text-muted hover:text-text-primary"
            aria-label="Save"
          >
            <Save className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCopy}
            className="text-text-muted hover:text-text-primary"
            aria-label="Copy prompt"
          >
            <Copy className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSplit}
            className={cn(
              'text-text-muted hover:text-text-primary',
              splitView && 'text-brand-accent',
            )}
            aria-label="Toggle split view"
          >
            <SplitSquareHorizontal className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onShowHistory}
            className="text-text-muted hover:text-text-primary"
            aria-label="Version history"
          >
            <History className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onExport}
            className="text-text-muted hover:text-text-primary"
            aria-label="Export as markdown"
          >
            <Download className="w-4 h-4" />
          </Button>

          {onSaveAsTemplate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSaveAsTemplate}
              className="text-text-muted hover:text-brand-accent"
              aria-label="Save as template"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-text-muted hover:text-error"
            aria-label="Delete prompt"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 px-4 py-1.5 text-xs font-sans text-text-muted border-t border-white/[0.03]">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {wordCount} word{wordCount !== 1 ? 's' : ''}
        </span>
        <span>{charCount} char{charCount !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}

function formatTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
