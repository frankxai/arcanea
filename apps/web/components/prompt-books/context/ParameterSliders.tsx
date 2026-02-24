'use client'

import { useState, useCallback, useRef, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContextConfig } from '@/lib/prompt-books/types'

// =====================================================================
// Slider Component — Custom-styled with brand-accent track
// =====================================================================

interface SliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  // Calculate fill percentage for the track
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-sans text-text-secondary w-28 shrink-0">
        {label}
      </label>
      <div className="flex-1 relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="parameter-slider w-full"
          style={{
            background: `linear-gradient(to right, rgba(127,255,212,0.5) 0%, rgba(127,255,212,0.5) ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
      </div>
      <span className="text-xs font-mono text-text-primary w-12 text-right tabular-nums">
        {value}
      </span>
    </div>
  )
}

// =====================================================================
// Number Input Row
// =====================================================================

interface NumberRowProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

function NumberRow({ label, value, min, max, onChange }: NumberRowProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-sans text-text-secondary w-28 shrink-0">
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!isNaN(v) && v >= min && v <= max) onChange(v)
        }}
        className={cn(
          'flex-1 bg-white/[0.03] border border-white/5 rounded-md',
          'px-2 py-1 text-xs font-mono text-text-primary',
          'focus:outline-none focus:border-brand-accent/30',
          'transition-colors',
        )}
      />
    </div>
  )
}

// =====================================================================
// Stop Sequences — Tag-like input
// =====================================================================

interface StopSequencesInputProps {
  value: string[]
  onChange: (sequences: string[]) => void
}

function StopSequencesInput({ value, onChange }: StopSequencesInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addSequence = useCallback(() => {
    const trimmed = input.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
      setInput('')
    }
  }, [input, value, onChange])

  const removeSequence = useCallback(
    (seq: string) => {
      onChange(value.filter((s) => s !== seq))
    },
    [value, onChange],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        addSequence()
      }
      if (e.key === 'Backspace' && input === '' && value.length > 0) {
        removeSequence(value[value.length - 1])
      }
    },
    [addSequence, input, value, removeSequence],
  )

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-sans text-text-secondary">
        Stop Sequences
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'flex flex-wrap gap-1.5 p-2',
          'bg-white/[0.03] border border-white/5 rounded-md',
          'min-h-[32px] cursor-text',
          'transition-colors focus-within:border-brand-accent/30',
        )}
      >
        {value.map((seq) => (
          <span
            key={seq}
            className={cn(
              'inline-flex items-center gap-1',
              'px-2 py-0.5 rounded-md',
              'bg-brand-accent/10 border border-brand-accent/20',
              'text-xs font-mono text-brand-accent',
            )}
          >
            {seq}
            <button
              type="button"
              onClick={() => removeSequence(seq)}
              className="hover:text-brand-accent/70 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addSequence}
          placeholder={value.length === 0 ? 'Type + Enter to add...' : ''}
          className={cn(
            'flex-1 min-w-[80px] bg-transparent',
            'text-xs font-mono text-text-primary',
            'placeholder:text-text-muted/40',
            'focus:outline-none',
          )}
        />
      </div>
    </div>
  )
}

// =====================================================================
// Main Component
// =====================================================================

interface ParameterSlidersProps {
  config: ContextConfig
  onChange: (config: ContextConfig) => void
  className?: string
}

export function ParameterSliders({ config, onChange, className }: ParameterSlidersProps) {
  const update = useCallback(
    <K extends keyof ContextConfig>(key: K, value: ContextConfig[K]) => {
      onChange({ ...config, [key]: value })
    },
    [config, onChange],
  )

  return (
    <div className={cn('space-y-3', className)}>
      <SliderRow
        label="Temperature"
        value={config.temperature ?? 0.7}
        min={0}
        max={2}
        step={0.1}
        onChange={(v) => update('temperature', v)}
      />

      <NumberRow
        label="Max Tokens"
        value={config.maxTokens ?? 4096}
        min={1}
        max={128000}
        onChange={(v) => update('maxTokens', v)}
      />

      <SliderRow
        label="Top P"
        value={config.topP ?? 1}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('topP', v)}
      />

      <SliderRow
        label="Freq. Penalty"
        value={config.frequencyPenalty ?? 0}
        min={-2}
        max={2}
        step={0.1}
        onChange={(v) => update('frequencyPenalty', v)}
      />

      <SliderRow
        label="Pres. Penalty"
        value={config.presencePenalty ?? 0}
        min={-2}
        max={2}
        step={0.1}
        onChange={(v) => update('presencePenalty', v)}
      />

      <StopSequencesInput
        value={config.stopSequences ?? []}
        onChange={(seqs) => update('stopSequences', seqs)}
      />

      {/* Slider custom styles — injected once */}
      <style dangerouslySetInnerHTML={{ __html: `
        .parameter-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .parameter-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7fffd4;
          border: 2px solid rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: box-shadow 0.15s;
        }
        .parameter-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 8px rgba(127, 255, 212, 0.4);
        }
        .parameter-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7fffd4;
          border: 2px solid rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
        .parameter-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
        }
      ` }} />
    </div>
  )
}
