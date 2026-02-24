'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// =====================================================================
// Model Definitions — Grouped by Provider
// =====================================================================

interface ModelOption {
  id: string
  name: string
  description: string
}

interface ModelGroup {
  provider: string
  models: ModelOption[]
}

const MODEL_GROUPS: ModelGroup[] = [
  {
    provider: 'Anthropic',
    models: [
      { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', description: 'Most capable, deep reasoning' },
      { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', description: 'Fast + intelligent balance' },
      { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', description: 'Fastest, cost-efficient' },
    ],
  },
  {
    provider: 'Google',
    models: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Advanced reasoning, 1M context' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast, multimodal, cost-effective' },
    ],
  },
  {
    provider: 'OpenAI',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Flagship multimodal model' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Small, fast, affordable' },
      { id: 'o1', name: 'o1', description: 'Deep reasoning chain-of-thought' },
      { id: 'o3-mini', name: 'o3 Mini', description: 'Efficient reasoning model' },
    ],
  },
]

// =====================================================================
// Component
// =====================================================================

interface ModelSelectorProps {
  value: string
  onChange: (model: string) => void
  className?: string
}

export function ModelSelector({ value, onChange, className }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Find current model display info
  const currentModel = MODEL_GROUPS
    .flatMap((g) => g.models)
    .find((m) => m.id === value)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-3 py-2 rounded-lg',
          'glass-subtle border border-white/5 hover:border-white/10',
          'text-sm font-sans text-text-primary',
          'transition-all duration-150',
          'focus:outline-none focus:ring-1 focus:ring-brand-accent/40',
        )}
      >
        <div className="flex flex-col items-start min-w-0">
          <span className="truncate">
            {currentModel?.name ?? value}
          </span>
          {currentModel?.description && (
            <span className="text-[10px] text-text-muted truncate">
              {currentModel.description}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-text-muted shrink-0 transition-transform duration-150',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            'absolute z-50 top-full left-0 right-0 mt-1',
            'glass-subtle border border-white/10 rounded-lg',
            'shadow-xl shadow-black/20',
            'max-h-72 overflow-y-auto scrollbar-thin',
            'py-1',
          )}
        >
          {MODEL_GROUPS.map((group) => (
            <div key={group.provider}>
              {/* Provider header */}
              <div className="px-3 py-1.5 text-[10px] font-sans font-semibold text-text-muted uppercase tracking-wider">
                {group.provider}
              </div>

              {/* Models */}
              {group.models.map((model) => {
                const isSelected = model.id === value
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      onChange(model.id)
                      setOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2',
                      'text-left text-sm font-sans',
                      'hover:bg-white/[0.04] transition-colors',
                      isSelected && 'bg-brand-accent/[0.06]',
                    )}
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={cn(
                          'truncate',
                          isSelected ? 'text-brand-accent' : 'text-text-primary',
                        )}
                      >
                        {model.name}
                      </span>
                      <span className="text-[10px] text-text-muted truncate">
                        {model.description}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
