'use client'

import {
  MessageSquare, Image, ImagePlus, MessagesSquare, Link,
  ListOrdered, Code, PenTool, BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PROMPT_TYPES } from '@/lib/prompt-books/constants'
import type { PromptType } from '@/lib/prompt-books/types'

const ICONS: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-3.5 h-3.5" />,
  Image: <Image className="w-3.5 h-3.5" />,
  ImagePlus: <ImagePlus className="w-3.5 h-3.5" />,
  MessagesSquare: <MessagesSquare className="w-3.5 h-3.5" />,
  Link: <Link className="w-3.5 h-3.5" />,
  ListOrdered: <ListOrdered className="w-3.5 h-3.5" />,
  Code: <Code className="w-3.5 h-3.5" />,
  PenTool: <PenTool className="w-3.5 h-3.5" />,
  BarChart3: <BarChart3 className="w-3.5 h-3.5" />,
}

interface PromptTypeTabsProps {
  value: PromptType
  onChange: (type: PromptType) => void
}

export function PromptTypeTabs({ value, onChange }: PromptTypeTabsProps) {
  const types = Object.entries(PROMPT_TYPES) as [PromptType, (typeof PROMPT_TYPES)[PromptType]][]

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-none py-1 px-1">
      {types.map(([type, config]) => {
        const isActive = type === value
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium',
              'whitespace-nowrap transition-all duration-150',
              isActive
                ? 'glass text-text-primary'
                : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]',
            )}
            title={config.description}
          >
            {ICONS[config.icon]}
            <span>{config.label}</span>
          </button>
        )
      })}
    </div>
  )
}
