'use client'

import { useState, useMemo } from 'react'
import { X, Save, Globe, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { extractVariables } from '@/lib/prompt-books/context-engine'
import type { Prompt, TemplateVariable } from '@/lib/prompt-books/types'

interface SaveAsTemplateDialogProps {
  prompt: Prompt
  open: boolean
  onClose: () => void
  onSave: (data: {
    name: string
    description: string
    category: string
    variables: TemplateVariable[]
    isPublic: boolean
  }) => Promise<void>
}

const CATEGORIES = ['starter', 'professional', 'creative', 'technical', 'community']

export function SaveAsTemplateDialog({
  prompt,
  open,
  onClose,
  onSave,
}: SaveAsTemplateDialogProps) {
  const [name, setName] = useState(prompt.title + ' Template')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('starter')
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)

  // Auto-detect variables from content
  const detectedVars = useMemo(() => {
    return extractVariables(prompt.content)
  }, [prompt.content])

  const [variables, setVariables] = useState<TemplateVariable[]>(() =>
    detectedVars.map((name) => ({
      name,
      label: name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      type: 'text' as const,
      default: '',
      required: false,
    })),
  )

  const updateVariable = (index: number, field: keyof TemplateVariable, value: unknown) => {
    setVariables((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave({ name, description, category, variables, isPublic })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl border border-white/10 w-[480px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-display text-text-primary">Save as Template</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-sans text-text-primary focus:outline-none focus:border-brand-accent/40"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What is this template for?"
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-sans text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-brand-accent/40 resize-none"
            />
          </div>

          {/* Category + Visibility */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-sans text-text-primary focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
                Visibility
              </label>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans border transition-all',
                  isPublic
                    ? 'border-brand-accent/30 text-brand-accent glass'
                    : 'border-white/10 text-text-muted bg-white/[0.03]',
                )}
              >
                {isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {isPublic ? 'Public' : 'Private'}
              </button>
            </div>
          </div>

          {/* Variables */}
          {variables.length > 0 && (
            <div>
              <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-2 block">
                Template Variables ({variables.length} detected)
              </label>
              <div className="space-y-2">
                {variables.map((v, i) => (
                  <div key={v.name} className="glass-subtle rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-brand-gold">{'{{' + v.name + '}}'}</span>
                      <input
                        type="text"
                        value={v.label}
                        onChange={(e) => updateVariable(i, 'label', e.target.value)}
                        className="flex-1 bg-transparent text-xs font-sans text-text-primary focus:outline-none border-b border-transparent focus:border-white/10"
                        placeholder="Label"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={v.type}
                        onChange={(e) => updateVariable(i, 'type', e.target.value)}
                        className="bg-white/[0.03] border border-white/[0.06] rounded px-2 py-1 text-[10px] font-sans text-text-secondary focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Select</option>
                        <option value="boolean">Boolean</option>
                      </select>
                      <input
                        type="text"
                        value={v.default || ''}
                        onChange={(e) => updateVariable(i, 'default', e.target.value)}
                        className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded px-2 py-1 text-[10px] font-mono text-text-secondary focus:outline-none"
                        placeholder="Default value"
                      />
                      <label className="flex items-center gap-1 text-[10px] font-sans text-text-muted cursor-pointer">
                        <input
                          type="checkbox"
                          checked={v.required || false}
                          onChange={(e) => updateVariable(i, 'required', e.target.checked)}
                          className="rounded border-white/20 bg-white/5 text-brand-accent w-3 h-3"
                        />
                        Req
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="text-xs">Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="text-xs liquid-glass gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            {loading ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </div>
    </div>
  )
}
