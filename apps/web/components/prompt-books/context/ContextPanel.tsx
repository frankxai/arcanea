'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  ChevronDown, ChevronRight, PanelRightClose, PanelRightOpen,
  Settings2, MessageSquareText, Link2, Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { compilePrompt } from '@/lib/prompt-books/context-engine'
import type { Prompt, ContextConfig, FewShotExample, ChainStep } from '@/lib/prompt-books/types'
import type { PromptTypeConfig } from '@/lib/prompt-books/constants'
import { ModelSelector } from './ModelSelector'
import { ParameterSliders } from './ParameterSliders'
import { FewShotEditor } from './FewShotEditor'
import { ChainBuilder } from './ChainBuilder'
import { ContextPreview } from './ContextPreview'

// =====================================================================
// Collapsible Section
// =====================================================================

interface SectionProps {
  title: string
  icon: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

function Section({ title, icon, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-2 px-4 py-2.5',
          'text-left text-xs font-sans font-semibold text-text-secondary',
          'hover:text-text-primary hover:bg-white/[0.02]',
          'transition-all duration-150',
        )}
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        )}
        {icon}
        <span className="uppercase tracking-wider">{title}</span>
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  )
}

// =====================================================================
// Main ContextPanel
// =====================================================================

interface ContextPanelProps {
  prompt: Prompt
  typeConfig: PromptTypeConfig
  contextConfig: ContextConfig
  fewShotExamples: FewShotExample[]
  chainSteps: ChainStep[]
  availablePrompts: Prompt[]
  onContextConfigChange: (config: ContextConfig) => void
  onFewShotChange: (examples: FewShotExample[]) => void
  onChainStepsChange: (steps: ChainStep[]) => void
}

export function ContextPanel({
  prompt,
  typeConfig,
  contextConfig,
  fewShotExamples,
  chainSteps,
  availablePrompts,
  onContextConfigChange,
  onFewShotChange,
  onChainStepsChange,
}: ContextPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  // Compile preview
  const compiledPackage = useMemo(() => {
    try {
      return compilePrompt({
        ...prompt,
        contextConfig,
        fewShotExamples,
        chainSteps,
      })
    } catch {
      return null
    }
  }, [prompt, contextConfig, fewShotExamples, chainSteps])

  const handleModelChange = useCallback(
    (model: string) => {
      onContextConfigChange({ ...contextConfig, model })
    },
    [contextConfig, onContextConfigChange],
  )

  if (collapsed) {
    return (
      <div className="border-l border-white/5">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className={cn(
            'p-2 text-text-muted hover:text-text-primary',
            'hover:bg-white/[0.04] transition-colors',
            'w-full flex items-center justify-center',
          )}
          title="Open context panel"
        >
          <PanelRightOpen className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-80 shrink-0 flex flex-col',
        'glass-strong border-l border-white/5',
        'overflow-hidden',
      )}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <h3 className="text-xs font-display font-semibold text-text-primary uppercase tracking-wider">
          Context
        </h3>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className={cn(
            'p-1 rounded text-text-muted hover:text-text-primary',
            'hover:bg-white/[0.04] transition-colors',
          )}
          title="Close context panel"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Model & Parameters */}
        <Section
          title="Model & Parameters"
          icon={<Settings2 className="w-3.5 h-3.5" />}
          defaultOpen
        >
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-sans text-text-muted uppercase tracking-wider mb-1.5 block">
                Model
              </label>
              <ModelSelector
                value={contextConfig.model ?? 'gemini-2.5-flash'}
                onChange={handleModelChange}
              />
            </div>
            <ParameterSliders
              config={contextConfig}
              onChange={onContextConfigChange}
            />
          </div>
        </Section>

        {/* Few-Shot Examples — only if type supports it */}
        {typeConfig.hasFewShot && (
          <Section
            title="Few-Shot Examples"
            icon={<MessageSquareText className="w-3.5 h-3.5" />}
            defaultOpen={fewShotExamples.length > 0}
          >
            <FewShotEditor
              examples={fewShotExamples}
              onChange={onFewShotChange}
            />
          </Section>
        )}

        {/* Chain Steps — only if type supports it */}
        {typeConfig.hasChain && (
          <Section
            title="Chain Steps"
            icon={<Link2 className="w-3.5 h-3.5" />}
            defaultOpen={chainSteps.length > 0}
          >
            <ChainBuilder
              steps={chainSteps}
              onChange={onChainStepsChange}
              availablePrompts={availablePrompts}
            />
          </Section>
        )}

        {/* Preview */}
        <Section
          title="Preview"
          icon={<Eye className="w-3.5 h-3.5" />}
          defaultOpen={false}
        >
          <ContextPreview contextPackage={compiledPackage} />
        </Section>
      </div>
    </div>
  )
}
