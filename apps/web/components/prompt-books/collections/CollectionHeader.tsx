'use client'

import { Settings, Share2, Globe, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import type { Collection } from '@/lib/prompt-books/types'

interface CollectionHeaderProps {
  collection: Collection | null
  onEdit?: () => void
}

export function CollectionHeader({ collection, onEdit }: CollectionHeaderProps) {
  if (!collection) {
    return (
      <header className="glass border-b border-white/5 px-6 py-4">
        <div>
          <h2 className="text-2xl font-display text-text-primary mb-1">All Prompts</h2>
          <p className="text-sm text-text-secondary font-serif">
            Browse all your prompts across every collection
          </p>
        </div>
      </header>
    )
  }

  const theme = collection.guardianId
    ? GUARDIAN_THEMES[collection.guardianId]
    : null

  return (
    <header className="glass border-b border-white/5 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Guardian badge */}
          {theme && (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.color}20, ${theme.colorBright}10)`,
                boxShadow: `0 0 20px ${theme.glow}`,
              }}
            >
              <span className="text-lg" style={{ color: theme.color }}>
                {theme.gate[0]}
              </span>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display text-text-primary">{collection.name}</h2>

              {/* Visibility badge */}
              {collection.visibility === 'public' ? (
                <span className="flex items-center gap-1 glass-subtle px-2 py-0.5 rounded-full text-xs font-sans text-brand-accent">
                  <Globe className="w-3 h-3" />
                  Public
                </span>
              ) : (
                <span className="flex items-center gap-1 text-text-muted">
                  <Lock className="w-3 h-3" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-1">
              {collection.description && (
                <p className="text-sm text-text-secondary font-serif">{collection.description}</p>
              )}
              {theme && (
                <span className="text-xs font-sans text-text-muted">
                  {theme.gate} Gate &middot; {theme.frequency} Hz
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-muted hover:text-text-primary"
            aria-label="Share collection"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="text-text-muted hover:text-text-primary"
              aria-label="Edit collection"
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mt-3 text-xs font-sans text-text-muted">
        <span>{collection.promptCount} prompts</span>
        {collection.element && (
          <span className="capitalize">{collection.element} element</span>
        )}
      </div>
    </header>
  )
}
