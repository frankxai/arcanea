'use client'

import { useState, useMemo } from 'react'
import { X, Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PROMPT_TYPES, GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import { extractVariables } from '@/lib/prompt-books/context-engine'
import type { Template, TemplateVariable, GuardianId } from '@/lib/prompt-books/types'

interface TemplateInstantiatorProps {
  template: Template
  collections: { id: string; name: string }[]
  onInstantiate: (templateId: string, variables: Record<string, string>, collectionId?: string) => Promise<void>
  onClose: () => void
}

export function TemplateInstantiator({
  template,
  collections,
  onInstantiate,
  onClose,
}: TemplateInstantiatorProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    for (const v of template.variables) {
      defaults[v.name] = v.default ?? ''
    }
    return defaults
  })
  const [collectionId, setCollectionId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  // Live preview of resolved content
  const preview = useMemo(() => {
    let content = template.content
    for (const [key, val] of Object.entries(values)) {
      content = content.replaceAll(`{{${key}}}`, val || `{{${key}}}`)
    }
    return content
  }, [template.content, values])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onInstantiate(template.id, values, collectionId)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const guardian = template.guardianId
    ? GUARDIAN_THEMES[template.guardianId as GuardianId]
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl border border-white/10 w-[560px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {guardian && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: guardian.color }}
                />
              )}
              <h2 className="text-sm font-display text-text-primary">{template.name}</h2>
            </div>
            {template.description && (
              <p className="text-[10px] font-sans text-text-muted">{template.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Variable form */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {template.variables.length > 0 ? (
            template.variables.map((v) => (
              <VariableField
                key={v.name}
                variable={v}
                value={values[v.name] || ''}
                onChange={(val) => setValues((prev) => ({ ...prev, [v.name]: val }))}
              />
            ))
          ) : (
            <p className="text-xs font-sans text-text-muted text-center py-4">
              This template has no variables. It will be used as-is.
            </p>
          )}

          {/* Collection selector */}
          <div>
            <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
              Save to Collection
            </label>
            <select
              value={collectionId || ''}
              onChange={(e) => setCollectionId(e.target.value || undefined)}
              className={cn(
                'w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2',
                'text-xs font-sans text-text-primary focus:outline-none focus:border-brand-accent/40',
              )}
            >
              <option value="">No collection</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Live preview */}
          <div>
            <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 block">
              Preview
            </label>
            <div className="glass-subtle rounded-lg p-3 text-xs font-mono text-text-secondary leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap">
              {preview}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="text-xs">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="text-xs liquid-glass gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {loading ? 'Creating...' : 'Create Prompt'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function VariableField({
  variable,
  value,
  onChange,
}: {
  variable: TemplateVariable
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="text-[10px] font-sans font-medium text-text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
        <span className="font-mono text-brand-gold/70">{'{{' + variable.name + '}}'}</span>
        <span className="text-text-muted">— {variable.label}</span>
        {variable.required && <span className="text-error">*</span>}
      </label>

      {variable.type === 'select' && variable.options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2',
            'text-xs font-sans text-text-primary focus:outline-none focus:border-brand-accent/40',
          )}
        >
          <option value="">Select...</option>
          {variable.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : variable.type === 'boolean' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
            className="rounded border-white/20 bg-white/5 text-brand-accent focus:ring-brand-accent/40"
          />
          <span className="text-xs font-sans text-text-secondary">Enabled</span>
        </label>
      ) : variable.type === 'number' ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={variable.default || '0'}
          className={cn(
            'w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2',
            'text-xs font-mono text-text-primary focus:outline-none focus:border-brand-accent/40',
          )}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={variable.default || `Enter ${variable.label.toLowerCase()}...`}
          className={cn(
            'w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2',
            'text-xs font-sans text-text-primary focus:outline-none focus:border-brand-accent/40',
          )}
        />
      )}
    </div>
  )
}
