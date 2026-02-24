'use client'

import { useRef, useCallback } from 'react'
import {
  Bold, Italic, Code, Heading1, Heading2, List, ListOrdered,
  Quote, LinkIcon, Braces, WrapText, Minus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  minRows?: number
  className?: string
  showToolbar?: boolean
}

interface ToolbarAction {
  icon: React.ReactNode
  label: string
  wrap: [string, string]
  block?: boolean
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { icon: <Bold className="w-3.5 h-3.5" />, label: 'Bold', wrap: ['**', '**'] },
  { icon: <Italic className="w-3.5 h-3.5" />, label: 'Italic', wrap: ['_', '_'] },
  { icon: <Code className="w-3.5 h-3.5" />, label: 'Inline code', wrap: ['`', '`'] },
  { icon: <Braces className="w-3.5 h-3.5" />, label: 'Code block', wrap: ['```\n', '\n```'], block: true },
  { icon: <Heading1 className="w-3.5 h-3.5" />, label: 'Heading 1', wrap: ['# ', ''], block: true },
  { icon: <Heading2 className="w-3.5 h-3.5" />, label: 'Heading 2', wrap: ['## ', ''], block: true },
  { icon: <List className="w-3.5 h-3.5" />, label: 'List', wrap: ['- ', ''], block: true },
  { icon: <ListOrdered className="w-3.5 h-3.5" />, label: 'Numbered list', wrap: ['1. ', ''], block: true },
  { icon: <Quote className="w-3.5 h-3.5" />, label: 'Quote', wrap: ['> ', ''], block: true },
  { icon: <LinkIcon className="w-3.5 h-3.5" />, label: 'Link', wrap: ['[', '](url)'] },
  { icon: <Minus className="w-3.5 h-3.5" />, label: 'Divider', wrap: ['\n---\n', ''], block: true },
]

export function ContentEditor({
  value,
  onChange,
  placeholder = 'Write your prompt here...',
  label,
  minRows = 12,
  className,
  showToolbar = true,
}: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = useCallback(
    (action: ToolbarAction) => {
      const el = textareaRef.current
      if (!el) return

      const start = el.selectionStart
      const end = el.selectionEnd
      const selected = value.slice(start, end)
      const [prefix, suffix] = action.wrap

      const newText =
        value.slice(0, start) + prefix + (selected || 'text') + suffix + value.slice(end)

      onChange(newText)

      // Restore cursor position
      requestAnimationFrame(() => {
        el.focus()
        const cursorPos = start + prefix.length + (selected ? selected.length : 4) // 'text'.length
        el.setSelectionRange(cursorPos, cursorPos)
      })
    },
    [value, onChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Tab inserts 2 spaces
      if (e.key === 'Tab') {
        e.preventDefault()
        const el = textareaRef.current
        if (!el) return

        const start = el.selectionStart
        const end = el.selectionEnd
        const newText = value.slice(0, start) + '  ' + value.slice(end)
        onChange(newText)

        requestAnimationFrame(() => {
          el.setSelectionRange(start + 2, start + 2)
        })
      }

      // Cmd+B for bold
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        insertMarkdown(TOOLBAR_ACTIONS[0])
      }

      // Cmd+I for italic
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault()
        insertMarkdown(TOOLBAR_ACTIONS[1])
      }

      // Cmd+` for code
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault()
        insertMarkdown(TOOLBAR_ACTIONS[2])
      }
    },
    [value, onChange, insertMarkdown],
  )

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Label */}
      {label && (
        <label className="text-xs font-sans font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Markdown toolbar */}
      {showToolbar && (
        <div className="flex items-center gap-0.5 py-1.5 px-1 border-b border-white/[0.04] mb-1">
          {TOOLBAR_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => insertMarkdown(action)}
              className={cn(
                'p-1.5 rounded-md text-text-muted hover:text-text-primary',
                'hover:bg-white/[0.04] transition-colors',
              )}
              title={action.label}
              type="button"
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={minRows}
        className={cn(
          'w-full bg-transparent text-sm font-mono text-text-primary',
          'placeholder:text-text-muted/40 focus:outline-none',
          'resize-none leading-relaxed',
          'scrollbar-thin',
        )}
        spellCheck={false}
      />
    </div>
  )
}
