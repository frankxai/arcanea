'use client'

import { useCallback } from 'react'
import { Plus, Trash2, ArrowUp, ArrowDown, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FewShotExample } from '@/lib/prompt-books/types'

// =====================================================================
// Single Example Pair
// =====================================================================

interface ExamplePairProps {
  example: FewShotExample
  index: number
  total: number
  onChange: (updated: FewShotExample) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function ExamplePair({
  example,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: ExamplePairProps) {
  return (
    <div className="group relative glass-subtle rounded-lg border border-white/5 p-3 space-y-2">
      {/* Header: role toggle + actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Role pill toggle */}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...example,
                role: example.role === 'user' ? 'assistant' : 'user',
              })
            }
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium',
              'transition-all duration-150 cursor-pointer',
              example.role === 'user'
                ? 'bg-brand-accent/15 text-brand-accent border border-brand-accent/20'
                : 'bg-brand-primary/15 text-brand-primary border border-brand-primary/20',
            )}
          >
            {example.role === 'user' ? 'User' : 'Assistant'}
          </button>
          <span className="text-[10px] text-text-muted font-mono ml-1">
            #{index + 1}
          </span>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className={cn(
              'p-1 rounded text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04] transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed',
            )}
            title="Move up"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index >= total - 1}
            className={cn(
              'p-1 rounded text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04] transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed',
            )}
            title="Move down"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'p-1 rounded text-text-muted hover:text-error',
              'hover:bg-white/[0.04] transition-colors',
            )}
            title="Remove example"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content textarea */}
      <textarea
        value={example.content}
        onChange={(e) => onChange({ ...example, content: e.target.value })}
        placeholder={
          example.role === 'user'
            ? 'Example user message...'
            : 'Expected assistant response...'
        }
        rows={2}
        className={cn(
          'w-full bg-transparent text-xs font-mono text-text-primary',
          'placeholder:text-text-muted/30 focus:outline-none',
          'resize-none leading-relaxed',
          'min-h-[48px] max-h-[96px]',
        )}
        onInput={(e) => {
          const el = e.currentTarget
          el.style.height = 'auto'
          el.style.height = Math.min(el.scrollHeight, 96) + 'px'
        }}
      />
    </div>
  )
}

// =====================================================================
// Main Component
// =====================================================================

interface FewShotEditorProps {
  examples: FewShotExample[]
  onChange: (examples: FewShotExample[]) => void
  className?: string
}

export function FewShotEditor({ examples, onChange, className }: FewShotEditorProps) {
  const addPair = useCallback(() => {
    onChange([...examples, { role: 'user', content: '' }])
  }, [examples, onChange])

  const updateExample = useCallback(
    (index: number, updated: FewShotExample) => {
      const next = [...examples]
      next[index] = updated
      onChange(next)
    },
    [examples, onChange],
  )

  const removeExample = useCallback(
    (index: number) => {
      onChange(examples.filter((_, i) => i !== index))
    },
    [examples, onChange],
  )

  const moveUp = useCallback(
    (index: number) => {
      if (index <= 0) return
      const next = [...examples]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      onChange(next)
    },
    [examples, onChange],
  )

  const moveDown = useCallback(
    (index: number) => {
      if (index >= examples.length - 1) return
      const next = [...examples]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      onChange(next)
    },
    [examples, onChange],
  )

  return (
    <div className={cn('space-y-2', className)}>
      {/* Example list */}
      {examples.length === 0 && (
        <div className="text-center py-4">
          <p className="text-xs font-sans text-text-muted">
            No examples yet. Add user/assistant pairs to teach the model.
          </p>
        </div>
      )}

      {examples.map((example, index) => (
        <ExamplePair
          key={index}
          example={example}
          index={index}
          total={examples.length}
          onChange={(updated) => updateExample(index, updated)}
          onRemove={() => removeExample(index)}
          onMoveUp={() => moveUp(index)}
          onMoveDown={() => moveDown(index)}
        />
      ))}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={addPair}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md',
            'text-xs font-sans text-brand-accent',
            'bg-brand-accent/[0.06] hover:bg-brand-accent/10',
            'border border-brand-accent/10 hover:border-brand-accent/20',
            'transition-all duration-150',
          )}
        >
          <Plus className="w-3 h-3" />
          Add Example
        </button>

        <button
          type="button"
          disabled
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md',
            'text-xs font-sans text-text-muted',
            'bg-white/[0.02] hover:bg-white/[0.04]',
            'border border-white/5',
            'transition-all duration-150',
            'opacity-50 cursor-not-allowed',
          )}
          title="Coming soon"
        >
          <Upload className="w-3 h-3" />
          Import from Conversation
        </button>
      </div>
    </div>
  )
}
