'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePromptBooksStore } from '@/lib/prompt-books/store'

export function useQuickCapture() {
  const [open, setOpen] = useState(false)
  const { createPrompt, collections } = usePromptBooksStore()

  // Global keyboard shortcut: Cmd+Shift+P / Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'p') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const capture = useCallback(
    async (text: string, collectionId?: string) => {
      await createPrompt({
        title: text.slice(0, 60).split('\n')[0] || 'Quick Capture',
        content: text,
        collectionId,
        promptType: 'general',
      })
      setOpen(false)
    },
    [createPrompt],
  )

  return { open, setOpen, capture, collections }
}
