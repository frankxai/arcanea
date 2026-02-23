'use client'

// Arcanea Prompt Books — Prompt Editor Hook
// Auto-save, dirty tracking, undo history

import { useState, useCallback, useRef, useEffect } from 'react'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import type { Prompt, UpdatePromptInput, PromptType } from '@/lib/prompt-books/types'
import { PROMPT_TYPES } from '@/lib/prompt-books/constants'

const AUTO_SAVE_DELAY = 2000

interface EditorState {
  title: string
  content: string
  negativeContent: string
  systemPrompt: string
  promptType: PromptType
}

export function usePromptEditor(promptId: string | null) {
  const {
    prompts,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
  } = usePromptBooksStore()

  const prompt = promptId ? prompts.find((p) => p.id === promptId) ?? null : null

  const [state, setState] = useState<EditorState>({
    title: '',
    content: '',
    negativeContent: '',
    systemPrompt: '',
    promptType: 'general',
  })

  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPromptId = useRef<string | null>(null)

  // Load prompt data when promptId changes
  useEffect(() => {
    if (prompt && prompt.id !== lastPromptId.current) {
      lastPromptId.current = prompt.id
      setState({
        title: prompt.title,
        content: prompt.content,
        negativeContent: prompt.negativeContent ?? '',
        systemPrompt: prompt.systemPrompt ?? '',
        promptType: prompt.promptType,
      })
      setIsDirty(false)
      setLastSavedAt(prompt.updatedAt)
      updateCounts(prompt.content)
    }
  }, [prompt])

  const updateCounts = useCallback((text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    setWordCount(words)
    setCharCount(text.length)
  }, [])

  // Auto-save
  const scheduleSave = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(async () => {
      if (!promptId || !isDirty) return
      await save()
    }, AUTO_SAVE_DELAY)
  }, [promptId, isDirty])

  // Clean up timer
  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [])

  const updateField = useCallback(
    <K extends keyof EditorState>(field: K, value: EditorState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }))
      setIsDirty(true)

      if (field === 'content') {
        updateCounts(value as string)
      }

      scheduleSave()
    },
    [scheduleSave, updateCounts],
  )

  const save = useCallback(async () => {
    if (!promptId || isSaving) return

    setIsSaving(true)
    try {
      const input: UpdatePromptInput = {
        title: state.title,
        content: state.content,
        negativeContent: state.negativeContent || null,
        systemPrompt: state.systemPrompt || null,
        promptType: state.promptType,
      }
      await updatePrompt(promptId, input)
      setIsDirty(false)
      setLastSavedAt(new Date().toISOString())
    } finally {
      setIsSaving(false)
    }
  }, [promptId, state, updatePrompt, isSaving])

  const handleDelete = useCallback(async () => {
    if (!promptId) return
    await deletePrompt(promptId)
  }, [promptId, deletePrompt])

  const handleDuplicate = useCallback(async () => {
    if (!promptId) return
    return await duplicatePrompt(promptId)
  }, [promptId, duplicatePrompt])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.content)
      return true
    } catch {
      return false
    }
  }, [state.content])

  const typeConfig = PROMPT_TYPES[state.promptType]

  return {
    prompt,
    state,
    isDirty,
    isSaving,
    lastSavedAt,
    wordCount,
    charCount,
    typeConfig,

    updateField,
    save,
    handleDelete,
    handleDuplicate,
    handleCopy,
  }
}
