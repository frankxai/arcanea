'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { GuardianPicker } from './GuardianPicker'
import type { Collection, CreateCollectionInput, GuardianId, Visibility } from '@/lib/prompt-books/types'

interface CollectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collection?: Collection | null
  onSave: (data: CreateCollectionInput) => Promise<void>
}

export function CollectionDialog({ open, onOpenChange, collection, onSave }: CollectionDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [guardianId, setGuardianId] = useState<GuardianId | null>(null)
  const [visibility, setVisibility] = useState<Visibility>('private')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (collection) {
      setName(collection.name)
      setDescription(collection.description || '')
      setGuardianId(collection.guardianId)
      setVisibility(collection.visibility)
    } else {
      setName('')
      setDescription('')
      setGuardianId(null)
      setVisibility('private')
    }
  }, [collection, open])

  if (!open) return null

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    try {
      await onSave({
        name: name.trim(),
        description: description.trim() || undefined,
        guardianId: guardianId || undefined,
        visibility,
      })
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cosmic-void/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative liquid-glass rounded-2xl p-6 w-full max-w-md mx-4 space-y-5 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display text-text-primary">
            {collection ? 'Edit Collection' : 'New Collection'}
          </h3>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg hover:bg-cosmic-raised text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-text-muted uppercase tracking-wider">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Prompt Collection"
            className="glass-subtle border-white/10 text-text-primary"
            autoFocus
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-text-muted uppercase tracking-wider">
            Description
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            className="glass-subtle border-white/10 text-text-primary"
          />
        </div>

        {/* Guardian Picker */}
        <GuardianPicker value={guardianId} onChange={setGuardianId} />

        {/* Visibility */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans font-medium text-text-muted uppercase tracking-wider">
            Visibility
          </label>
          <div className="flex gap-2">
            {(['private', 'shared', 'public'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                className={cn(
                  'flex-1 px-3 py-2 rounded-lg text-sm font-sans capitalize transition-all',
                  visibility === v
                    ? 'glass text-text-primary font-medium'
                    : 'glass-subtle text-text-muted hover:text-text-secondary',
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-text-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className="liquid-glass hover:scale-[1.02] transition-transform"
          >
            {saving ? 'Saving...' : collection ? 'Save Changes' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  )
}
