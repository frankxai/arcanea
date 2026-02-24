'use client'

import { useState } from 'react'
import { Settings, Keyboard, Palette, Type, Weight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'
import type { WeightSyntaxType } from '@/lib/prompt-books/constants'

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { editorSplitView, toggleSplitView, viewMode, setViewMode } = usePromptBooksStore()
  const [defaultSyntax, setDefaultSyntax] = useState<WeightSyntaxType>('sd')
  const [autoSaveDelay, setAutoSaveDelay] = useState(2000)
  const [fontSize, setFontSize] = useState(14)

  return (
    <div className="space-y-6">
      {/* Editor Settings */}
      <section>
        <h3 className="text-xs font-display text-text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-3.5 h-3.5 text-brand-accent" />
          Editor
        </h3>
        <div className="glass-subtle rounded-xl p-4 space-y-4">
          {/* Split view */}
          <SettingRow label="Split View" description="Show preview alongside editor">
            <button
              onClick={toggleSplitView}
              className={cn(
                'w-10 h-5 rounded-full transition-colors relative',
                editorSplitView ? 'bg-brand-accent' : 'bg-white/10',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                  editorSplitView ? 'left-5' : 'left-0.5',
                )}
              />
            </button>
          </SettingRow>

          {/* Default view */}
          <SettingRow label="Default View" description="Grid or list layout for prompts">
            <div className="flex gap-1 glass-subtle rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'px-2.5 py-1 rounded-md text-[10px] font-sans transition-all',
                  viewMode === 'grid' ? 'glass text-text-primary' : 'text-text-muted',
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-2.5 py-1 rounded-md text-[10px] font-sans transition-all',
                  viewMode === 'list' ? 'glass text-text-primary' : 'text-text-muted',
                )}
              >
                List
              </button>
            </div>
          </SettingRow>

          {/* Font size */}
          <SettingRow label="Editor Font Size" description="Monospace font size in the editor">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={20}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20 accent-brand-accent"
              />
              <span className="text-[10px] font-mono text-text-muted w-6 text-right">{fontSize}px</span>
            </div>
          </SettingRow>

          {/* Auto-save */}
          <SettingRow label="Auto-save Delay" description="Milliseconds after last keystroke">
            <select
              value={autoSaveDelay}
              onChange={(e) => setAutoSaveDelay(Number(e.target.value))}
              className="bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1 text-[10px] font-mono text-text-secondary focus:outline-none"
            >
              <option value={1000}>1s</option>
              <option value={2000}>2s</option>
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={0}>Off</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* Weight Syntax */}
      <section>
        <h3 className="text-xs font-display text-text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
          <Weight className="w-3.5 h-3.5 text-brand-accent" />
          Weight Syntax
        </h3>
        <div className="glass-subtle rounded-xl p-4">
          <SettingRow label="Default Syntax" description="Wrap selected text with this syntax">
            <div className="flex gap-1 glass-subtle rounded-lg p-0.5">
              {(['sd', 'nai', 'emphasis'] as WeightSyntaxType[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setDefaultSyntax(s)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[10px] font-mono transition-all',
                    defaultSyntax === s ? 'glass text-text-primary' : 'text-text-muted',
                  )}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </SettingRow>
          <div className="mt-2 text-[10px] font-mono text-text-muted/50">
            {defaultSyntax === 'sd' && 'Example: (masterpiece:1.2)'}
            {defaultSyntax === 'nai' && 'Example: {masterpiece:1.2}'}
            {defaultSyntax === 'emphasis' && 'Example: [masterpiece:1.2]'}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section>
        <h3 className="text-xs font-display text-text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
          <Keyboard className="w-3.5 h-3.5 text-brand-accent" />
          Keyboard Shortcuts
        </h3>
        <div className="glass-subtle rounded-xl p-4 space-y-2">
          <ShortcutRow keys={['Cmd', 'K']} action="Search / Command Palette" />
          <ShortcutRow keys={['Cmd', 'Shift', 'P']} action="Quick Capture" />
          <ShortcutRow keys={['Cmd', 'S']} action="Save Prompt" />
          <ShortcutRow keys={['Cmd', 'B']} action="Bold" />
          <ShortcutRow keys={['Cmd', 'I']} action="Italic" />
          <ShortcutRow keys={['Cmd', '`']} action="Inline Code" />
          <ShortcutRow keys={['Tab']} action="Insert 2 Spaces" />
          <ShortcutRow keys={['Esc']} action="Close Panel / Modal" />
        </div>
      </section>
    </div>
  )
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs font-sans text-text-primary">{label}</span>
        <p className="text-[10px] font-sans text-text-muted/60">{description}</p>
      </div>
      {children}
    </div>
  )
}

function ShortcutRow({ keys, action }: { keys: string[]; action: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-sans text-text-secondary">{action}</span>
      <div className="flex gap-0.5">
        {keys.map((key) => (
          <kbd
            key={key}
            className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-text-muted"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  )
}
