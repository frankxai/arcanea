'use client'

import { cn } from '@/lib/utils'
import { GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import type { GuardianId } from '@/lib/prompt-books/types'

interface GuardianPickerProps {
  value: GuardianId | null
  onChange: (id: GuardianId | null) => void
}

const guardians = Object.entries(GUARDIAN_THEMES) as [GuardianId, typeof GUARDIAN_THEMES[GuardianId]][]

export function GuardianPicker({ value, onChange }: GuardianPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-sans font-medium text-text-muted uppercase tracking-wider">
        Guardian Theme
      </label>

      <div className="grid grid-cols-5 gap-2">
        {/* None option */}
        <button
          onClick={() => onChange(null)}
          className={cn(
            'flex flex-col items-center gap-1 p-2 rounded-lg transition-all',
            value === null
              ? 'glass border border-brand-accent/30'
              : 'glass-subtle hover:bg-cosmic-raised',
          )}
        >
          <div className="w-8 h-8 rounded-full bg-cosmic-raised flex items-center justify-center">
            <span className="text-xs text-text-muted">-</span>
          </div>
          <span className="text-[10px] font-sans text-text-muted">None</span>
        </button>

        {guardians.map(([id, theme]) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-lg transition-all',
              value === id
                ? cn('glass border', theme.glowClass)
                : 'glass-subtle hover:bg-cosmic-raised',
            )}
            style={value === id ? { borderColor: `${theme.color}50` } : undefined}
            title={`${theme.gate} Gate - ${theme.frequency} Hz`}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.color}30, ${theme.colorBright}15)`,
              }}
            >
              <span className="text-xs font-display font-bold" style={{ color: theme.color }}>
                {id[0].toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] font-sans text-text-muted capitalize truncate w-full text-center">
              {id.slice(0, 6)}
            </span>
          </button>
        ))}
      </div>

      {value && (
        <div className="glass-subtle rounded-lg p-2 flex items-center gap-2 mt-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: GUARDIAN_THEMES[value].color }}
          />
          <span className="text-xs font-sans text-text-secondary">
            {GUARDIAN_THEMES[value].gate} Gate &middot; {GUARDIAN_THEMES[value].frequency} Hz &middot;{' '}
            <span className="capitalize">{GUARDIAN_THEMES[value].element}</span>
          </span>
        </div>
      )}
    </div>
  )
}
