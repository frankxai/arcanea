'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Settings, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SettingsPanel } from '@/components/prompt-books/settings/SettingsPanel'
import { ImportExportPanel } from '@/components/prompt-books/settings/ImportExportPanel'

type SettingsTab = 'preferences' | 'import-export'

export default function PromptBooksSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SettingsTab>('preferences')

  const tabs: { value: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { value: 'preferences', label: 'Preferences', icon: <Settings className="w-3.5 h-3.5" /> },
    { value: 'import-export', label: 'Import / Export', icon: <Download className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/prompt-books')}
          className="text-text-muted hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-display text-text-primary">Settings</h1>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 glass-subtle rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all',
              activeTab === tab.value
                ? 'glass text-text-primary'
                : 'text-text-muted hover:text-text-secondary',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'preferences' && <SettingsPanel onClose={() => router.push('/prompt-books')} />}
      {activeTab === 'import-export' && <ImportExportPanel onClose={() => router.push('/prompt-books')} />}
    </div>
  )
}
