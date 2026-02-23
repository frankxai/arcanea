'use client'

import { useState, useCallback } from 'react'
import { Trash2, Pencil, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TAG_CATEGORIES } from '@/lib/prompt-books/constants'
import type { Tag, TagCategory, UpdateTagInput } from '@/lib/prompt-books/types'

interface TagManagerProps {
  tags: Tag[]
  onUpdate: (id: string, input: UpdateTagInput) => Promise<void>
  onDelete: (id: string) => Promise<void>
  open: boolean
  onClose: () => void
}

export function TagManager({
  tags,
  onUpdate,
  onDelete,
  open,
  onClose,
}: TagManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editCategory, setEditCategory] = useState<TagCategory>('custom')
  const [editWeight, setEditWeight] = useState<string>('')
  const [editInject, setEditInject] = useState('')

  const startEdit = useCallback((tag: Tag) => {
    setEditingId(tag.id)
    setEditName(tag.name)
    setEditCategory(tag.category || 'custom')
    setEditWeight(tag.weightModifier?.toString() || '')
    setEditInject(tag.injectText || '')
  }, [])

  const saveEdit = useCallback(async () => {
    if (!editingId) return
    await onUpdate(editingId, {
      name: editName,
      category: editCategory,
      weightModifier: editWeight ? parseFloat(editWeight) : null,
      injectText: editInject || null,
    })
    setEditingId(null)
  }, [editingId, editName, editCategory, editWeight, editInject, onUpdate])

  const handleDelete = useCallback(async (id: string) => {
    await onDelete(id)
  }, [onDelete])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl border border-white/10 w-[520px] max-h-[70vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-display text-text-primary">Manage Tags</h2>
          <p className="text-[10px] font-sans text-text-muted mt-1">
            Edit tag names, categories, weights, and injection text.
          </p>
        </div>

        {/* Tag list */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.03]">
          {tags.length === 0 ? (
            <div className="text-center py-8 text-xs text-text-muted">
              No tags yet. Add tags from the editor.
            </div>
          ) : (
            tags.map((tag) => {
              const isEditing = editingId === tag.id
              const catColor = tag.category ? TAG_CATEGORIES[tag.category]?.color : '#78a6ff'

              return (
                <div key={tag.id} className="px-5 py-3">
                  {isEditing ? (
                    /* Edit mode */
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-sans text-text-primary focus:outline-none focus:border-brand-accent/40"
                          placeholder="Tag name"
                          autoFocus
                        />
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as TagCategory)}
                          className="bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1.5 text-xs font-sans text-text-primary focus:outline-none"
                        >
                          {(Object.keys(TAG_CATEGORIES) as TagCategory[]).map((cat) => (
                            <option key={cat} value={cat}>{TAG_CATEGORIES[cat].label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editInject}
                          onChange={(e) => setEditInject(e.target.value)}
                          className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-text-secondary focus:outline-none focus:border-brand-accent/40"
                          placeholder="Inject text (appended to prompt)"
                        />
                        <input
                          type="number"
                          value={editWeight}
                          onChange={(e) => setEditWeight(e.target.value)}
                          className="w-20 bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-text-secondary focus:outline-none"
                          placeholder="Weight"
                          step="0.05"
                          min="0.1"
                          max="2.0"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          className="text-xs liquid-glass"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Display mode */
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-3 h-3 text-text-muted/30 shrink-0" />

                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: catColor }}
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-sans text-text-primary">{tag.name}</span>
                        {tag.injectText && (
                          <span className="text-[10px] font-mono text-text-muted ml-2 truncate">
                            → {tag.injectText}
                          </span>
                        )}
                      </div>

                      {tag.weightModifier && tag.weightModifier !== 1 && (
                        <span className={cn(
                          'text-[10px] font-mono tabular-nums',
                          tag.weightModifier > 1 ? 'text-brand-accent' : 'text-error/70',
                        )}>
                          ×{tag.weightModifier}
                        </span>
                      )}

                      <span className="text-[10px] font-sans text-text-muted/50">
                        {tag.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => startEdit(tag)}
                        className="p-1 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(tag.id)}
                        className="p-1 text-text-muted hover:text-error transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 flex justify-end">
          <Button onClick={onClose} className="text-xs liquid-glass">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
