'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, X, Sparkles, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TemplateCard } from './TemplateCard'
import { TemplateInstantiator } from './TemplateInstantiator'
import { PROMPT_TYPES, GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import * as service from '@/lib/prompt-books/service'
import { createClient } from '@/lib/supabase/client'
import type { Template, PromptType, GuardianId } from '@/lib/prompt-books/types'

interface TemplateGalleryProps {
  open: boolean
  onClose: () => void
  collections: { id: string; name: string }[]
  onInstantiate: (templateId: string, variables: Record<string, string>, collectionId?: string) => Promise<void>
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'starter', label: 'Starters' },
  { value: 'professional', label: 'Professional' },
  { value: 'creative', label: 'Creative' },
  { value: 'technical', label: 'Technical' },
  { value: 'community', label: 'Community' },
]

export function TemplateGallery({
  open,
  onClose,
  collections,
  onInstantiate,
}: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeType, setActiveType] = useState<PromptType | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [instantiateTemplate, setInstantiateTemplate] = useState<Template | null>(null)

  useEffect(() => {
    if (!open) return
    loadTemplates()
  }, [open])

  const loadTemplates = async () => {
    setLoading(true)
    try {
      const client = createClient()
      const data = await service.listTemplates(client, {
        category: activeCategory === 'all' ? undefined : activeCategory,
      })
      setTemplates(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) loadTemplates()
  }, [activeCategory])

  const filtered = templates.filter((t) => {
    if (activeType && t.promptType !== activeType) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        t.name.toLowerCase().includes(q) ||
        (t.description?.toLowerCase().includes(q) ?? false) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    return true
  })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl border border-white/10 w-[800px] max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-brand-accent" />
              <h2 className="text-sm font-display text-text-primary">Template Gallery</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-text-muted hover:text-text-primary">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 glass-subtle rounded-lg px-3 py-2 mb-3">
            <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="flex-1 bg-transparent text-xs font-sans text-text-primary placeholder:text-text-muted/40 focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-text-muted hover:text-text-primary">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-sans font-medium whitespace-nowrap transition-all',
                  activeCategory === cat.value
                    ? 'glass text-text-primary'
                    : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]',
                )}
              >
                {cat.label}
              </button>
            ))}

            <div className="w-px bg-white/5 mx-1" />

            {/* Type quick-filters */}
            {(['general', 'txt2img', 'chat', 'code'] as PromptType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={cn(
                  'px-2 py-1.5 rounded-lg text-[10px] font-sans whitespace-nowrap transition-all',
                  activeType === type
                    ? 'glass text-text-primary'
                    : 'text-text-muted/60 hover:text-text-muted',
                )}
              >
                {PROMPT_TYPES[type].label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-xl h-40 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-8 h-8 text-text-muted/20 mx-auto mb-3" />
              <p className="text-sm font-sans text-text-muted">No templates found</p>
              <p className="text-xs font-sans text-text-muted/60 mt-1">
                {search ? `No matches for "${search}"` : 'Templates will appear here as they are created'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  onUse={setInstantiateTemplate}
                  onPreview={setPreviewTemplate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Template count */}
        <div className="px-6 py-2 border-t border-white/[0.04] text-[10px] font-sans text-text-muted/50">
          {filtered.length} template{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Instantiator modal */}
      {instantiateTemplate && (
        <TemplateInstantiator
          template={instantiateTemplate}
          collections={collections}
          onInstantiate={onInstantiate}
          onClose={() => setInstantiateTemplate(null)}
        />
      )}
    </div>
  )
}
