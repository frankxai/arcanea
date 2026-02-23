'use client'

import { Plus } from 'lucide-react'

interface QuickCaptureFABProps {
  onClick: () => void
}

export function QuickCaptureFAB({ onClick }: QuickCaptureFABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center shadow-[0_0_30px_rgba(127,255,212,0.3)] hover:shadow-[0_0_40px_rgba(127,255,212,0.5)] hover:scale-110 transition-all duration-300 animate-breathe"
      aria-label="Quick capture prompt"
      title="Quick capture (Cmd+Shift+P)"
    >
      <Plus className="w-6 h-6 text-cosmic-void" />
    </button>
  )
}
