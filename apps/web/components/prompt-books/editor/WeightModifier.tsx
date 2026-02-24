'use client'

import { useState, useCallback } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatWeight } from '@/lib/prompt-books/weight-syntax'
import type { WeightSyntaxType } from '@/lib/prompt-books/constants'

interface WeightModifierProps {
  /**
   * Called when the user wraps selected text with a weight.
   * Parent should handle text insertion.
   */
  onApply: (weight: number, syntax: WeightSyntaxType) => void
  className?: string
}

export function WeightModifier({ onApply, className }: WeightModifierProps) {
  const [weight, setWeight] = useState(1.0)
  const [syntax, setSyntax] = useState<WeightSyntaxType>('sd')

  const increment = useCallback(() => {
    setWeight((w) => Math.min(2.0, Math.round((w + 0.05) * 100) / 100))
  }, [])

  const decrement = useCallback(() => {
    setWeight((w) => Math.max(0.1, Math.round((w - 0.05) * 100) / 100))
  }, [])

  const handleApply = useCallback(() => {
    onApply(weight, syntax)
  }, [weight, syntax, onApply])

  const syntaxOptions: { value: WeightSyntaxType; label: string; example: string }[] = [
    { value: 'sd', label: 'SD', example: formatWeight('text', weight, 'sd') },
    { value: 'nai', label: 'NAI', example: formatWeight('text', weight, 'nai') },
    { value: 'emphasis', label: 'Emph', example: formatWeight('text', weight, 'emphasis') },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Syntax picker */}
      <div className="flex gap-0.5 glass-subtle rounded-lg p-0.5">
        {syntaxOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSyntax(opt.value)}
            className={cn(
              'px-2 py-1 rounded-md text-[10px] font-mono transition-all',
              syntax === opt.value
                ? 'glass text-text-primary'
                : 'text-text-muted hover:text-text-secondary',
            )}
            title={opt.example}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Weight control */}
      <div className="flex items-center gap-1 glass-subtle rounded-lg px-2 py-0.5">
        <button
          onClick={decrement}
          className="text-text-muted hover:text-text-primary p-0.5"
          type="button"
          aria-label="Decrease weight"
        >
          <ChevronDown className="w-3 h-3" />
        </button>

        <span className={cn(
          'text-xs font-mono w-8 text-center tabular-nums',
          weight > 1 ? 'text-brand-accent' : weight < 1 ? 'text-error/70' : 'text-text-secondary',
        )}>
          {weight.toFixed(2)}
        </span>

        <button
          onClick={increment}
          className="text-text-muted hover:text-text-primary p-0.5"
          type="button"
          aria-label="Increase weight"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className={cn(
          'px-2.5 py-1 rounded-lg text-xs font-sans font-medium',
          'glass text-text-primary hover:scale-[1.02] transition-transform',
        )}
        type="button"
      >
        Wrap
      </button>

      {/* Preview */}
      <span className="text-[10px] font-mono text-text-muted/60">
        {formatWeight('selected', weight, syntax)}
      </span>
    </div>
  )
}
