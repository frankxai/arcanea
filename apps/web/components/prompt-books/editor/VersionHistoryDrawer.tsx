'use client'

import { useState, useEffect } from 'react'
import { X, RotateCcw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import * as service from '@/lib/prompt-books/service'
import type { PromptVersion, DiffLine } from '@/lib/prompt-books/types'
import { createClient } from '@/lib/supabase/client'

interface VersionHistoryDrawerProps {
  promptId: string
  currentContent: string
  open: boolean
  onClose: () => void
  onRestore: (version: PromptVersion) => void
}

export function VersionHistoryDrawer({
  promptId,
  currentContent,
  open,
  onClose,
  onRestore,
}: VersionHistoryDrawerProps) {
  const [versions, setVersions] = useState<PromptVersion[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !promptId) return

    const loadVersions = async () => {
      setLoading(true)
      try {
        const client = createClient()
        const data = await service.listVersions(client, promptId)
        setVersions(data)
        if (data.length > 0) setSelectedId(data[0].id)
      } finally {
        setLoading(false)
      }
    }
    loadVersions()
  }, [open, promptId])

  const selectedVersion = versions.find((v) => v.id === selectedId)
  const diff = selectedVersion ? computeDiff(selectedVersion.content, currentContent) : []

  if (!open) return null

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] glass-strong border-l border-white/10 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-accent" />
          <h3 className="text-sm font-display text-text-primary">Version History</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-text-muted hover:text-text-primary"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Version list */}
      <div className="border-b border-white/5 max-h-48 overflow-y-auto">
        {loading ? (
          <div className="px-4 py-6 text-center text-xs text-text-muted">Loading versions...</div>
        ) : versions.length === 0 ? (
          <div className="px-4 py-6 text-center text-xs text-text-muted">
            No previous versions yet. Versions are created automatically on save.
          </div>
        ) : (
          versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-left',
                'transition-colors border-b border-white/[0.02]',
                selectedId === v.id
                  ? 'bg-white/[0.05] text-text-primary'
                  : 'text-text-muted hover:bg-white/[0.02] hover:text-text-secondary',
              )}
            >
              <div>
                <span className="text-xs font-mono">v{v.version}</span>
                {v.changeSummary && (
                  <span className="text-[10px] text-text-muted ml-2">{v.changeSummary}</span>
                )}
              </div>
              <span className="text-[10px] text-text-muted/60">
                {new Date(v.createdAt).toLocaleString()}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Diff view */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedVersion ? (
          <div className="space-y-0">
            <div className="text-[10px] font-sans text-text-muted mb-2 uppercase tracking-wider">
              Changes from v{selectedVersion.version} to current
            </div>
            <div className="font-mono text-xs leading-relaxed">
              {diff.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'px-2 py-0.5',
                    line.type === 'added' && 'bg-success/10 text-success',
                    line.type === 'removed' && 'bg-error/10 text-error/80',
                    line.type === 'unchanged' && 'text-text-muted/60',
                  )}
                >
                  <span className="select-none mr-2 text-text-muted/30">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                  </span>
                  {line.content || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-xs text-text-muted py-8">
            Select a version to see changes
          </div>
        )}
      </div>

      {/* Restore button */}
      {selectedVersion && (
        <div className="px-4 py-3 border-t border-white/5">
          <Button
            onClick={() => onRestore(selectedVersion)}
            className="w-full liquid-glass gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restore v{selectedVersion.version}
          </Button>
        </div>
      )}
    </div>
  )
}

/**
 * Simple line-by-line diff. Not a full Myers diff — good enough for prompt comparison.
 */
function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  const result: DiffLine[] = []

  const maxLen = Math.max(oldLines.length, newLines.length)
  let lineNum = 1

  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i]
    const newLine = newLines[i]

    if (oldLine === undefined) {
      result.push({ type: 'added', content: newLine, lineNumber: lineNum++ })
    } else if (newLine === undefined) {
      result.push({ type: 'removed', content: oldLine, lineNumber: lineNum++ })
    } else if (oldLine === newLine) {
      result.push({ type: 'unchanged', content: newLine, lineNumber: lineNum++ })
    } else {
      result.push({ type: 'removed', content: oldLine, lineNumber: lineNum })
      result.push({ type: 'added', content: newLine, lineNumber: lineNum++ })
    }
  }

  return result
}
