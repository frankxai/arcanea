'use client'

import { cn } from '@/lib/utils'
import { PromptCard } from './PromptCard'
import type { Prompt } from '@/lib/prompt-books/types'

interface CollectionGridProps {
  prompts: Prompt[]
  viewMode: 'grid' | 'list'
  onSelect: (id: string) => void
  onFavorite: (id: string) => void
  onCopy: (prompt: Prompt) => void
}

export function CollectionGrid({
  prompts,
  viewMode,
  onSelect,
  onFavorite,
  onCopy,
}: CollectionGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 flex items-center justify-center mb-4 animate-pulse-glow">
          <span className="text-2xl text-brand-accent">+</span>
        </div>
        <h3 className="text-lg font-display text-text-primary mb-2">No prompts yet</h3>
        <p className="text-sm text-text-secondary font-serif max-w-sm">
          Create your first prompt or use Cmd+Shift+P for quick capture
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-1',
      )}
    >
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          viewMode={viewMode}
          onClick={() => onSelect(prompt.id)}
          onFavorite={() => onFavorite(prompt.id)}
          onCopy={() => onCopy(prompt)}
        />
      ))}
    </div>
  )
}
