'use client'

import { useState, useCallback, useMemo } from 'react'
import { Copy, Check, Code, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContextPackage } from '@/lib/prompt-books/types'

// =====================================================================
// Token Estimate — rough approximation (chars / 4)
// =====================================================================

function estimateTokens(pkg: ContextPackage): number {
  let chars = 0
  if (pkg.system) chars += pkg.system.length
  for (const msg of pkg.messages) {
    chars += msg.content.length
  }
  return Math.ceil(chars / 4)
}

// =====================================================================
// Message Bubble
// =====================================================================

interface MessageBubbleProps {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user'
  const isSystem = role === 'system'

  return (
    <div
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 space-y-1',
          isSystem && 'bg-brand-gold/10 border border-brand-gold/20 w-full max-w-full',
          isUser && 'bg-brand-accent/10 border border-brand-accent/20',
          !isUser && !isSystem && 'bg-brand-primary/10 border border-brand-primary/20',
        )}
      >
        <div
          className={cn(
            'text-[10px] font-sans font-semibold uppercase tracking-wider',
            isSystem && 'text-brand-gold',
            isUser && 'text-brand-accent',
            !isUser && !isSystem && 'text-brand-primary',
          )}
        >
          {role}
        </div>
        <div className="text-xs font-mono text-text-primary whitespace-pre-wrap break-words leading-relaxed">
          {content || '(empty)'}
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// Main Component
// =====================================================================

type ViewMode = 'chat' | 'json'

interface ContextPreviewProps {
  contextPackage: ContextPackage | null
  className?: string
}

export function ContextPreview({ contextPackage, className }: ContextPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('chat')
  const [copied, setCopied] = useState(false)

  const jsonStr = useMemo(() => {
    if (!contextPackage) return ''
    return JSON.stringify(contextPackage, null, 2)
  }, [contextPackage])

  const tokenCount = useMemo(() => {
    if (!contextPackage) return 0
    return estimateTokens(contextPackage)
  }, [contextPackage])

  const handleCopy = useCallback(async () => {
    if (!jsonStr) return
    try {
      await navigator.clipboard.writeText(jsonStr)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }, [jsonStr])

  if (!contextPackage) {
    return (
      <div className={cn('text-center py-6', className)}>
        <p className="text-xs font-sans text-text-muted">
          Save or modify the prompt to generate a preview.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* View mode toggle + Copy + Token count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode('chat')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-sans',
              'transition-colors',
              viewMode === 'chat'
                ? 'bg-brand-accent/10 text-brand-accent'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            <MessageSquare className="w-3 h-3" />
            Chat
          </button>
          <button
            type="button"
            onClick={() => setViewMode('json')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-sans',
              'transition-colors',
              viewMode === 'json'
                ? 'bg-brand-accent/10 text-brand-accent'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            <Code className="w-3 h-3" />
            JSON
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-text-muted">
            ~{tokenCount.toLocaleString()} tokens
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'p-1 rounded text-text-muted hover:text-text-primary',
              'hover:bg-white/[0.04] transition-colors',
              copied && 'text-brand-accent',
            )}
            title="Copy compiled output"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Chat view */}
      {viewMode === 'chat' && (
        <div className="space-y-2">
          {contextPackage.messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {/* Parameters */}
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="text-[10px] font-sans font-semibold text-text-muted uppercase tracking-wider mb-2">
              Parameters
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {Object.entries(contextPackage.parameters).map(([key, val]) => {
                if (val === undefined || val === null) return null
                const display = Array.isArray(val) ? val.join(', ') : String(val)
                return (
                  <div key={key} className="flex items-baseline gap-1.5">
                    <span className="text-[10px] font-sans text-text-muted">
                      {key}:
                    </span>
                    <span className="text-[10px] font-mono text-text-primary truncate">
                      {display}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* JSON view */}
      {viewMode === 'json' && (
        <div
          className={cn(
            'bg-white/[0.02] border border-white/5 rounded-lg',
            'p-3 overflow-x-auto',
            'max-h-64 overflow-y-auto scrollbar-thin',
          )}
        >
          <pre className="text-[10px] font-mono text-text-primary leading-relaxed whitespace-pre">
            {jsonStr}
          </pre>
        </div>
      )}
    </div>
  )
}
