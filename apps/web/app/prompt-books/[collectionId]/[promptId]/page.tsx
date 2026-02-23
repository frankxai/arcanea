'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import { usePromptEditor } from '@/hooks/use-prompt-editor'
import { EditorToolbar } from '@/components/prompt-books/editor/EditorToolbar'
import { PromptTypeTabs } from '@/components/prompt-books/editor/PromptTypeTabs'
import { ContentEditor } from '@/components/prompt-books/editor/ContentEditor'
import { SystemPromptEditor } from '@/components/prompt-books/editor/SystemPromptEditor'
import { NegativePromptEditor } from '@/components/prompt-books/editor/NegativePromptEditor'
import { MarkdownPreview } from '@/components/prompt-books/editor/MarkdownPreview'
import { WeightModifier } from '@/components/prompt-books/editor/WeightModifier'
import { VersionHistoryDrawer } from '@/components/prompt-books/editor/VersionHistoryDrawer'
import { TagChipBar } from '@/components/prompt-books/tags/TagChipBar'
import { TagSelector } from '@/components/prompt-books/tags/TagSelector'
import { promptToMd } from '@/lib/prompt-books/markdown'
import { applyWeight } from '@/lib/prompt-books/weight-syntax'
import * as service from '@/lib/prompt-books/service'
import type { WeightSyntaxType } from '@/lib/prompt-books/constants'
import type { TagCategory } from '@/lib/prompt-books/types'
import { cn } from '@/lib/utils'

export default function PromptEditorPage() {
  const params = useParams()
  const router = useRouter()
  const collectionId = params.collectionId as string
  const promptId = params.promptId as string

  const {
    setActiveCollection,
    setActivePrompt,
    editorSplitView,
    toggleSplitView,
    updatePrompt,
    tags,
    createTag,
    _client: client,
    _userId: userId,
  } = usePromptBooksStore()

  const {
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
  } = usePromptEditor(promptId)

  const [historyOpen, setHistoryOpen] = useState(false)
  const [tagSelectorOpen, setTagSelectorOpen] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  // Tag IDs assigned to this prompt
  const assignedTagIds = (prompt?.tags ?? []).map((t) => t.id)

  // Set active collection and prompt on mount
  useEffect(() => {
    if (collectionId) setActiveCollection(collectionId)
    if (promptId) setActivePrompt(promptId)
    return () => setActivePrompt(null)
  }, [collectionId, promptId, setActiveCollection, setActivePrompt])

  const handleBack = useCallback(() => {
    router.push(`/prompt-books/${collectionId}`)
  }, [router, collectionId])

  const handleDeleteAndBack = useCallback(async () => {
    await handleDelete()
    handleBack()
  }, [handleDelete, handleBack])

  const handleExport = useCallback(() => {
    if (!prompt) return
    const md = promptToMd(prompt)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }, [prompt])

  const handleToggleFavorite = useCallback(async () => {
    if (!prompt) return
    await updatePrompt(prompt.id, { isFavorite: !prompt.isFavorite })
  }, [prompt, updatePrompt])

  const handleWeightApply = useCallback(
    (weight: number, syntax: WeightSyntaxType) => {
      // Get selection from textarea — find the focused textarea
      const activeEl = document.activeElement as HTMLTextAreaElement
      if (!activeEl || activeEl.tagName !== 'TEXTAREA') return

      const start = activeEl.selectionStart
      const end = activeEl.selectionEnd
      if (start === end) return

      const newContent = applyWeight(state.content, start, end, weight, syntax)
      updateField('content', newContent)
    },
    [state.content, updateField],
  )

  const handleTagAssign = useCallback(async (tagId: string) => {
    if (!client || !promptId) return
    await service.assignTagsToPrompt(client, promptId, [tagId])
    // Reload prompt to get updated tags
    const updated = await service.getPrompt(client, promptId)
    if (updated) usePromptBooksStore.getState().updatePromptInStore(updated)
  }, [client, promptId])

  const handleTagUnassign = useCallback(async (tagId: string) => {
    if (!client || !promptId) return
    await service.removeTagFromPrompt(client, promptId, tagId)
    const updated = await service.getPrompt(client, promptId)
    if (updated) usePromptBooksStore.getState().updatePromptInStore(updated)
  }, [client, promptId])

  const handleCreateTag = useCallback(async (name: string, category: TagCategory) => {
    return await createTag({ name, category, isGlobal: false, collectionId })
  }, [createTag, collectionId])

  const handleRestore = useCallback(
    async (version: { content: string; negativeContent: string | null; systemPrompt: string | null }) => {
      updateField('content', version.content)
      if (version.negativeContent !== null) updateField('negativeContent', version.negativeContent)
      if (version.systemPrompt !== null) updateField('systemPrompt', version.systemPrompt)
      setHistoryOpen(false)
    },
    [updateField],
  )

  // Cmd+S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [save])

  if (!prompt) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="text-text-muted text-sm font-sans">Loading prompt...</span>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Editor Toolbar */}
      <EditorToolbar
        title={state.title}
        onTitleChange={(t) => updateField('title', t)}
        isDirty={isDirty}
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
        wordCount={wordCount}
        charCount={charCount}
        isFavorite={prompt.isFavorite}
        splitView={editorSplitView}
        onSave={save}
        onCopy={handleCopy}
        onDelete={handleDeleteAndBack}
        onBack={handleBack}
        onToggleSplit={toggleSplitView}
        onToggleFavorite={handleToggleFavorite}
        onShowHistory={() => setHistoryOpen(true)}
        onExport={handleExport}
      />

      {/* Prompt Type Tabs */}
      <div className="border-b border-white/5 px-4">
        <PromptTypeTabs
          value={state.promptType}
          onChange={(type) => updateField('promptType', type)}
        />
      </div>

      {/* Tags */}
      <div className="border-b border-white/[0.04] px-4 py-2 relative">
        <TagChipBar
          tags={prompt.tags ?? []}
          selectedIds={assignedTagIds}
          onToggle={(id) =>
            assignedTagIds.includes(id) ? handleTagUnassign(id) : handleTagAssign(id)
          }
          onRemove={handleTagUnassign}
          onAddClick={() => setTagSelectorOpen(!tagSelectorOpen)}
        />
        {tagSelectorOpen && (
          <div className="absolute top-full left-4 mt-1 z-40">
            <TagSelector
              tags={tags}
              assignedTagIds={assignedTagIds}
              onAssign={handleTagAssign}
              onUnassign={handleTagUnassign}
              onCreateTag={handleCreateTag}
              open={tagSelectorOpen}
              onClose={() => setTagSelectorOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Weight modifier bar (show for image types) */}
      {typeConfig.hasNegativePrompt && (
        <div className="border-b border-white/[0.04] px-4 py-2">
          <WeightModifier onApply={handleWeightApply} />
        </div>
      )}

      {/* Editor + Preview */}
      <div className={cn('flex-1 flex overflow-hidden', editorSplitView && 'divide-x divide-white/5')}>
        {/* Editor pane */}
        <div className={cn('flex-1 overflow-y-auto', editorSplitView ? 'w-1/2' : 'w-full')}>
          <div className="px-6 py-4 space-y-0">
            {/* Main content editor */}
            <ContentEditor
              value={state.content}
              onChange={(v) => updateField('content', v)}
              placeholder={typeConfig.hasNegativePrompt ? 'masterpiece, best quality, 1girl...' : 'Write your prompt here...'}
              label="Content"
              showToolbar={!typeConfig.hasNegativePrompt}
            />

            {/* Negative prompt (image types) */}
            {typeConfig.hasNegativePrompt && (
              <NegativePromptEditor
                value={state.negativeContent}
                onChange={(v) => updateField('negativeContent', v)}
              />
            )}

            {/* System prompt (chat/code/writing types) */}
            {typeConfig.hasSystemPrompt && (
              <SystemPromptEditor
                value={state.systemPrompt}
                onChange={(v) => updateField('systemPrompt', v)}
              />
            )}
          </div>
        </div>

        {/* Preview pane (split view) */}
        {editorSplitView && (
          <div className="w-1/2 overflow-y-auto px-6 py-4 bg-white/[0.01]">
            <div className="text-[10px] font-sans text-text-muted uppercase tracking-wider mb-3">
              Preview
            </div>
            <MarkdownPreview content={state.content} />
          </div>
        )}
      </div>

      {/* Version History Drawer */}
      <VersionHistoryDrawer
        promptId={promptId}
        currentContent={state.content}
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onRestore={handleRestore}
      />
    </div>
  )
}
