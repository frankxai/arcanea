'use client'

import { Sparkles, Copy, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PROMPT_TYPES, GUARDIAN_THEMES } from '@/lib/prompt-books/constants'
import type { Template, GuardianId } from '@/lib/prompt-books/types'

interface TemplateCardProps {
  template: Template
  onUse: (template: Template) => void
  onPreview: (template: Template) => void
}

export function TemplateCard({ template, onUse, onPreview }: TemplateCardProps) {
  const typeConfig = PROMPT_TYPES[template.promptType]
  const guardian = template.guardianId
    ? GUARDIAN_THEMES[template.guardianId as GuardianId]
    : null

  return (
    <div
      className={cn(
        'glass rounded-xl p-4 border border-white/5',
        'hover:border-white/10 hover:shadow-lg transition-all duration-200',
        'cursor-pointer group',
      )}
      onClick={() => onPreview(template)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {guardian && (
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: guardian.color }}
            />
          )}
          <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded glass-subtle text-text-muted">
            {typeConfig?.label || template.promptType}
          </span>
        </div>

        {template.isPublic && (
          <span className="text-[10px] font-sans text-brand-accent/60">Public</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-sm font-display text-text-primary mb-1.5 line-clamp-1">
        {template.name}
      </h3>

      {/* Description */}
      {template.description && (
        <p className="text-xs font-sans text-text-muted line-clamp-2 mb-3">
          {template.description}
        </p>
      )}

      {/* Variables */}
      {template.variables.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {template.variables.slice(0, 4).map((v) => (
            <span
              key={v.name}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold/70"
            >
              {'{{' + v.name + '}}'}
            </span>
          ))}
          {template.variables.length > 4 && (
            <span className="text-[10px] font-sans text-text-muted/50">
              +{template.variables.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans px-1.5 py-0.5 rounded-full border border-white/[0.06] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
        <span className="text-[10px] font-sans text-text-muted/50">
          Used {template.useCount} time{template.useCount !== 1 ? 's' : ''}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onUse(template)
          }}
          className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-sans font-medium',
            'liquid-glass hover:scale-[1.03] transition-transform',
            'opacity-0 group-hover:opacity-100',
          )}
        >
          <Sparkles className="w-3 h-3" />
          Use
        </button>
      </div>
    </div>
  )
}
