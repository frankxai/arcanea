'use client'

import { useState, useRef, useEffect } from 'react'
import { Zap, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuickCaptureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCapture: (text: string, collectionId?: string) => Promise<void>
  collections: Array<{ id: string; name: string }>
}

export function QuickCaptureModal({
  open,
  onOpenChange,
  onCapture,
  collections,
}: QuickCaptureModalProps) {
  const [text, setText] = useState('')
  const [collectionId, setCollectionId] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setText('')
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [open])

  if (!open) return null

  const handleCapture = async () => {
    if (!text.trim()) return
    setSaving(true)
    try {
      await onCapture(text.trim(), collectionId || undefined)
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleCapture()
    }
    if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cosmic-void/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative liquid-glass-elevated rounded-2xl p-6 w-full max-w-lg mx-4 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-accent" />
            <h3 className="text-sm font-display font-bold text-text-primary tracking-wide">
              QUICK CAPTURE
            </h3>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg hover:bg-cosmic-raised text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste or type your prompt..."
          className={cn(
            'w-full h-32 px-4 py-3 rounded-xl resize-none',
            'glass-subtle border border-white/10',
            'text-text-primary font-mono text-sm',
            'placeholder:text-text-muted',
            'focus:outline-none focus:border-brand-accent/50',
            'transition-colors',
          )}
        />

        {/* Collection selector */}
        <div className="flex items-center gap-3 mt-3">
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="flex-1 h-9 px-3 rounded-lg glass-subtle border border-white/10 text-sm font-sans text-text-secondary bg-transparent focus:outline-none focus:border-brand-accent/50"
          >
            <option value="">Inbox (No collection)</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <Button
            onClick={handleCapture}
            disabled={!text.trim() || saving}
            className="liquid-glass hover:scale-[1.02] transition-transform gap-2"
          >
            <Zap className="w-4 h-4" />
            {saving ? 'Saving...' : 'Capture'}
          </Button>
        </div>

        {/* Hint */}
        <p className="text-[11px] font-sans text-text-muted mt-2 text-right">
          Cmd+Enter to capture
        </p>
      </div>
    </div>
  )
}
