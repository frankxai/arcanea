'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { extractWeights } from '@/lib/prompt-books/weight-syntax'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  const html = useMemo(() => renderPromptPreview(content), [content])

  return (
    <div
      className={cn(
        'prose prose-invert prose-sm max-w-none',
        'prose-headings:font-display prose-headings:text-text-primary',
        'prose-p:text-text-secondary prose-p:leading-relaxed',
        'prose-code:text-brand-accent prose-code:bg-white/5 prose-code:rounded prose-code:px-1',
        'prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/5',
        'prose-blockquote:border-brand-primary/30 prose-blockquote:text-text-secondary',
        'prose-strong:text-text-primary',
        'prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * Minimal markdown + weight syntax renderer.
 * No external dependencies — handles the subset relevant to prompts.
 */
function renderPromptPreview(text: string): string {
  if (!text) return '<p class="text-text-muted/40 italic">No content yet</p>'

  // Escape HTML
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Highlight weight syntax: (text:1.1) → colored span
  html = html.replace(
    /\(([^()]+):([0-9.]+)\)/g,
    (_m, t, w) => {
      const weight = parseFloat(w)
      const color = weight > 1 ? 'text-brand-accent' : weight < 1 ? 'text-error/70' : 'text-text-secondary'
      return `<span class="${color} font-mono text-xs">(${t}:<strong>${w}</strong>)</span>`
    },
  )

  // NAI syntax
  html = html.replace(
    /\{([^{}]+):([0-9.]+)\}/g,
    (_m, t, w) => {
      const weight = parseFloat(w)
      const color = weight > 1 ? 'text-brand-primary' : 'text-text-muted'
      return `<span class="${color} font-mono text-xs">{${t}:<strong>${w}</strong>}</span>`
    },
  )

  // Template variables: {{var}}
  html = html.replace(
    /\{\{(\w+)\}\}/g,
    '<span class="text-brand-gold bg-brand-gold/10 rounded px-1 font-mono text-xs">{{$1}}</span>',
  )

  // Code blocks
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="bg-white/[0.03] rounded-lg p-3 border border-white/5 overflow-x-auto"><code>$2</code></pre>',
  )

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold / Italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-white/10" />')

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  )

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')

  // Paragraphs — wrap remaining plain text lines
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<li')
      ) {
        return trimmed
      }
      if (trimmed) {
        return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`
      }
      return ''
    })
    .join('\n')

  return html
}
