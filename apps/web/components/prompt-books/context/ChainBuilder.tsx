'use client'

import { useCallback } from 'react'
import { Plus, Trash2, ArrowDownCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChainStep, Prompt } from '@/lib/prompt-books/types'

// =====================================================================
// Transform Options
// =====================================================================

const TRANSFORMS: Array<{ value: ChainStep['transform']; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'summarize', label: 'Summarize' },
  { value: 'extract_json', label: 'Extract JSON' },
  { value: 'extract_list', label: 'Extract List' },
]

// =====================================================================
// Single Step Card
// =====================================================================

interface StepCardProps {
  step: ChainStep
  index: number
  total: number
  availablePrompts: Prompt[]
  onChange: (updated: ChainStep) => void
  onRemove: () => void
  isLast: boolean
}

function StepCard({
  step,
  index,
  availablePrompts,
  onChange,
  onRemove,
  isLast,
}: StepCardProps) {
  const useInline = !step.promptId

  return (
    <div className="relative">
      {/* Step card */}
      <div className="glass-subtle rounded-lg border border-white/5 p-3 space-y-3">
        {/* Header: step number + remove */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center',
                'bg-brand-accent/15 text-brand-accent',
                'text-xs font-mono font-bold',
              )}
            >
              {step.order}
            </span>
            <span className="text-xs font-sans text-text-secondary">
              Step {step.order}
            </span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'p-1 rounded text-text-muted hover:text-error',
              'hover:bg-white/[0.04] transition-colors',
            )}
            title="Remove step"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Source toggle: prompt selector OR inline */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (useInline) {
                  // Switch to prompt selector
                  onChange({ ...step, inlinePrompt: undefined, promptId: '' })
                } else {
                  // Switch to inline
                  onChange({ ...step, promptId: undefined, inlinePrompt: '' })
                }
              }}
              className={cn(
                'text-[10px] font-sans font-medium uppercase tracking-wider',
                'px-2 py-0.5 rounded border transition-colors',
                useInline
                  ? 'text-brand-primary border-brand-primary/20 bg-brand-primary/10'
                  : 'text-brand-accent border-brand-accent/20 bg-brand-accent/10',
              )}
            >
              {useInline ? 'Inline' : 'Reference'}
            </button>
          </div>

          {useInline ? (
            <textarea
              value={step.inlinePrompt ?? ''}
              onChange={(e) =>
                onChange({ ...step, inlinePrompt: e.target.value })
              }
              placeholder="Write the prompt for this step..."
              rows={3}
              className={cn(
                'w-full bg-white/[0.02] border border-white/5 rounded-md',
                'px-2.5 py-2 text-xs font-mono text-text-primary',
                'placeholder:text-text-muted/30 focus:outline-none',
                'focus:border-brand-accent/30',
                'resize-none leading-relaxed',
                'transition-colors',
              )}
            />
          ) : (
            <select
              value={step.promptId ?? ''}
              onChange={(e) =>
                onChange({ ...step, promptId: e.target.value || undefined })
              }
              className={cn(
                'w-full bg-white/[0.02] border border-white/5 rounded-md',
                'px-2.5 py-2 text-xs font-sans text-text-primary',
                'focus:outline-none focus:border-brand-accent/30',
                'transition-colors',
                '[&>option]:bg-[#1a1a2e] [&>option]:text-text-primary',
              )}
            >
              <option value="">Select a prompt...</option>
              {availablePrompts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Output variable + Transform */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-[10px] font-sans text-text-muted uppercase tracking-wider mb-1 block">
              Output Variable
            </label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-brand-accent/50">
                $
              </span>
              <input
                type="text"
                value={step.outputVariable ?? ''}
                onChange={(e) =>
                  onChange({
                    ...step,
                    outputVariable: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') || undefined,
                  })
                }
                placeholder="variableName"
                className={cn(
                  'w-full bg-white/[0.02] border border-white/5 rounded-md',
                  'pl-5 pr-2 py-1.5 text-xs font-mono text-text-primary',
                  'placeholder:text-text-muted/30 focus:outline-none',
                  'focus:border-brand-accent/30',
                  'transition-colors',
                )}
              />
            </div>
          </div>

          <div className="w-28">
            <label className="text-[10px] font-sans text-text-muted uppercase tracking-wider mb-1 block">
              Transform
            </label>
            <select
              value={step.transform ?? 'none'}
              onChange={(e) =>
                onChange({
                  ...step,
                  transform: e.target.value as ChainStep['transform'],
                })
              }
              className={cn(
                'w-full bg-white/[0.02] border border-white/5 rounded-md',
                'px-2 py-1.5 text-xs font-sans text-text-primary',
                'focus:outline-none focus:border-brand-accent/30',
                'transition-colors',
                '[&>option]:bg-[#1a1a2e] [&>option]:text-text-primary',
              )}
            >
              {TRANSFORMS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Arrow connector between steps */}
      {!isLast && (
        <div className="flex justify-center py-1.5">
          <ArrowDownCircle className="w-4 h-4 text-brand-accent/30" />
        </div>
      )}
    </div>
  )
}

// =====================================================================
// Main Component
// =====================================================================

interface ChainBuilderProps {
  steps: ChainStep[]
  onChange: (steps: ChainStep[]) => void
  availablePrompts: Prompt[]
  className?: string
}

export function ChainBuilder({
  steps,
  onChange,
  availablePrompts,
  className,
}: ChainBuilderProps) {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order)

  const addStep = useCallback(() => {
    const nextOrder = steps.length > 0 ? Math.max(...steps.map((s) => s.order)) + 1 : 1
    onChange([
      ...steps,
      {
        order: nextOrder,
        inlinePrompt: '',
        transform: 'none',
      },
    ])
  }, [steps, onChange])

  const updateStep = useCallback(
    (index: number, updated: ChainStep) => {
      const next = [...sortedSteps]
      next[index] = updated
      onChange(next)
    },
    [sortedSteps, onChange],
  )

  const removeStep = useCallback(
    (index: number) => {
      const next = sortedSteps.filter((_, i) => i !== index)
      // Re-number
      const renumbered = next.map((s, i) => ({ ...s, order: i + 1 }))
      onChange(renumbered)
    },
    [sortedSteps, onChange],
  )

  return (
    <div className={cn('space-y-0', className)}>
      {/* Steps */}
      {sortedSteps.length === 0 && (
        <div className="text-center py-4">
          <p className="text-xs font-sans text-text-muted">
            No chain steps. Add steps to build a multi-prompt pipeline.
          </p>
        </div>
      )}

      {sortedSteps.map((step, index) => (
        <StepCard
          key={`step-${step.order}-${index}`}
          step={step}
          index={index}
          total={sortedSteps.length}
          availablePrompts={availablePrompts}
          onChange={(updated) => updateStep(index, updated)}
          onRemove={() => removeStep(index)}
          isLast={index === sortedSteps.length - 1}
        />
      ))}

      {/* Add step button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={addStep}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md',
            'text-xs font-sans text-brand-accent',
            'bg-brand-accent/[0.06] hover:bg-brand-accent/10',
            'border border-brand-accent/10 hover:border-brand-accent/20',
            'transition-all duration-150',
          )}
        >
          <Plus className="w-3 h-3" />
          Add Step
        </button>
      </div>
    </div>
  )
}
