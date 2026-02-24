'use client'

import { useState } from 'react'
import { MessageSquare, Sparkles, BookOpen, Wand2, Plus, ChevronLeft, ChevronRight, Settings, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Tab = 'chat' | 'imagine' | 'library' | 'studio'

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

interface ChatHistoryItem {
  id: string
  title: string
  timestamp: string
  category: 'today' | 'yesterday' | 'week' | 'older'
  guardianColor: string
}

const chatHistory: ChatHistoryItem[] = [
  { id: '1', title: 'The Five Elements Explained', timestamp: '2h ago', category: 'today', guardianColor: '#9966ff' },
  { id: '2', title: 'Guardian Lyria Character Design', timestamp: '5h ago', category: 'today', guardianColor: '#9966ff' },
  { id: '3', title: 'Academy of Luminous Arts', timestamp: 'Yesterday', category: 'yesterday', guardianColor: '#78a6ff' },
  { id: '4', title: 'Ten Gates of Consciousness', timestamp: '2 days ago', category: 'week', guardianColor: '#00ff88' },
  { id: '5', title: 'Cosmic Origins Mythology', timestamp: '5 days ago', category: 'week', guardianColor: '#ff6b35' },
]

export function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'chat' as Tab, icon: MessageSquare, label: 'Chat' },
    { id: 'imagine' as Tab, icon: Sparkles, label: 'Imagine' },
    { id: 'library' as Tab, icon: BookOpen, label: 'Library' },
    { id: 'studio' as Tab, icon: Wand2, label: 'Studio' },
  ]

  const filteredHistory = chatHistory.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside
      className={cn(
        'glass-strong flex flex-col border-r border-white/5 transition-all duration-300 relative h-screen',
        collapsed ? 'w-16' : 'w-72'
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 flex items-center justify-center animate-pulse-glow">
          <div className="w-4 h-4 bg-brand-accent rounded-sm animate-float" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
        </div>
        {!collapsed && (
          <h1 className="text-xl font-display font-bold text-text-primary tracking-wide">
            ARCANEA
          </h1>
        )}
      </div>

      {/* New Chat Button */}
      {!collapsed && (
        <div className="p-3">
          <Button className="w-full liquid-glass justify-start gap-2 hover:scale-[1.02] transition-transform group">
            <Plus className="w-4 h-4 text-brand-accent" />
            <span className="font-sans font-medium">New Chat</span>
          </Button>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="p-2 border-b border-white/5" role="tablist" aria-label="Main navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group',
                isActive
                  ? 'bg-cosmic-elevated text-text-primary border-l-2 border-brand-accent'
                  : 'text-text-secondary hover:text-text-primary hover:bg-cosmic-raised'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 transition-all',
                  isActive ? 'text-brand-accent' : 'text-text-muted group-hover:text-text-secondary'
                )}
              />
              {!collapsed && (
                <span className="font-sans font-medium text-sm">{tab.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Chat History */}
      {!collapsed && activeTab === 'chat' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Search Bar */}
          <div className="px-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..."
                className="glass-subtle border-white/10 pl-9 h-9 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-brand-accent/50"
              />
            </div>
          </div>

          {['today', 'yesterday', 'week', 'older'].map((category) => {
            const items = filteredHistory.filter((item) => item.category === category)
            if (items.length === 0) return null

            const labels = {
              today: 'Today',
              yesterday: 'Yesterday',
              week: 'Previous 7 Days',
              older: 'Older',
            }

            return (
              <div key={category}>
                <h3 className="px-3 py-2 text-xs font-sans font-semibold text-text-muted uppercase tracking-wider">
                  {labels[category as keyof typeof labels]}
                </h3>
                {items.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left hover:bg-cosmic-raised transition-all group relative border-l-2 border-transparent hover:border-brand-accent/50"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: item.guardianColor,
                        boxShadow: `0 0 8px ${item.guardianColor}60`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-sans text-text-secondary group-hover:text-text-primary transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-text-muted">{item.timestamp}</p>
                    </div>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-auto border-t border-white/5 p-3 space-y-3">
        {!collapsed && (
          <div className="glass-subtle rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <User className="w-5 h-5 text-cosmic-void" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans font-medium text-text-primary truncate">Explorer</p>
                <p className="text-xs font-display text-brand-accent">Apprentice</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-sans text-text-muted">Gates Progress</span>
                <span className="font-sans font-medium text-brand-accent">3/10</span>
              </div>
              <div className="h-1.5 bg-cosmic-raised rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-accent to-brand-primary transition-all"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="flex-1 text-text-muted hover:text-text-primary hover:bg-cosmic-raised"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-text-muted hover:text-text-primary hover:bg-cosmic-raised"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </aside>
  )
}
