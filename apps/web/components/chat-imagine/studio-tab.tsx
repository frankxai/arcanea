'use client'

import { Users, Globe, Image, Mic, Wand2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Tool {
  id: string
  title: string
  description: string
  icon: any
  color: string
  elementColor: string
  guardian: string
  element: string
  comingSoon?: boolean
}

const tools: Tool[] = [
  {
    id: '1',
    title: 'Character Forge',
    description: 'Create compelling characters with AI. Design rich backstories, elemental affinities, unique abilities, and generate detailed portraits.',
    icon: Users,
    color: 'from-element-water/20 to-brand-secondary/10',
    elementColor: 'text-element-water',
    guardian: 'Leyla',
    element: 'Water',
  },
  {
    id: '2',
    title: 'World Builder',
    description: 'Expand the universe with AI assistance. Craft entire realms with geography, cultures, histories, and magic systems.',
    icon: Globe,
    color: 'from-element-earth/20 to-brand-gold/10',
    elementColor: 'text-element-earth',
    guardian: 'Lyssandria',
    element: 'Earth',
  },
  {
    id: '3',
    title: 'Scene Craft',
    description: 'Compose narrative scenes with AI vision. Design detailed environments, lighting, mood, and perfect visual composition.',
    icon: Image,
    color: 'from-brand-primary/20 to-element-void/10',
    elementColor: 'text-brand-primary',
    guardian: 'Lyria',
    element: 'Void',
  },
  {
    id: '4',
    title: 'Voice Alchemy',
    description: 'Refine dialogue and voice with AI. Transform text with elemental voice styles and master the art of authentic character speech.',
    icon: Mic,
    color: 'from-element-earth/20 to-brand-gold/10',
    elementColor: 'text-element-earth',
    guardian: 'Alera',
    element: 'Earth',
    comingSoon: true,
  },
  {
    id: '5',
    title: 'Ritual Designer',
    description: 'Design creative rituals with AI power. Generate ceremonial practices, magical systems, and transformative experiences.',
    icon: Wand2,
    color: 'from-element-fire/20 to-brand-gold/10',
    elementColor: 'text-element-fire',
    guardian: 'Draconia',
    element: 'Fire',
    comingSoon: true,
  },
  {
    id: '6',
    title: 'Prophecy Engine',
    description: 'Generate future visions with AI foresight. Create prophecies, divine revelations, and glimpses of potential timelines.',
    icon: Sparkles,
    color: 'from-element-void/20 to-brand-primary/10',
    elementColor: 'text-element-void',
    guardian: 'Shinkami',
    element: 'Void',
    comingSoon: true,
  },
]

export function StudioTab() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4">
        <div>
          <h2 className="text-2xl font-display text-text-primary mb-1">Creative Studio</h2>
          <p className="text-sm text-text-secondary font-serif">
            Powerful tools for world-building and mythological creation
          </p>
        </div>
      </header>

      {/* Tools Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.id}
                  className="glass rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tool.comingSoon && (
                    <div className="absolute top-4 right-4 glass-subtle px-3 py-1 rounded-full">
                      <span className="text-xs font-sans font-medium text-brand-accent">Coming Soon</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300`}
                      style={{
                        boxShadow: 'none',
                      }}
                      onMouseEnter={(e) => {
                        const colorMap: { [key: string]: string } = {
                          'text-element-water': '#78a6ff',
                          'text-element-earth': '#8b7355',
                          'text-brand-primary': '#9966ff',
                          'text-element-fire': '#ff6b35',
                          'text-element-void': '#9966ff',
                        }
                        const color = colorMap[tool.elementColor] || '#7fffd4'
                        e.currentTarget.style.boxShadow = `0 0 32px ${color}60`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <Icon className={`w-8 h-8 ${tool.elementColor} group-hover:scale-110 transition-transform`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-display text-text-primary group-hover:text-brand-accent transition-colors">
                          {tool.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-sans text-text-muted">Guardian:</span>
                        <span className={`text-xs font-sans font-medium ${tool.elementColor}`}>{tool.guardian}</span>
                        <span className="text-text-muted">•</span>
                        <span className="text-xs font-sans text-text-muted">{tool.element} Element</span>
                      </div>
                      
                      <p className="text-sm text-text-secondary font-serif leading-relaxed mb-4">
                        {tool.description}
                      </p>
                      
                      <Button
                        disabled={tool.comingSoon}
                        className={`${
                          tool.comingSoon ? 'glass-subtle opacity-50 cursor-not-allowed' : 'liquid-glass hover:scale-[1.02]'
                        } transition-all gap-2 group/btn`}
                      >
                        <span className="font-sans font-medium">{tool.comingSoon ? 'Coming Soon' : 'Open Tool'}</span>
                        {!tool.comingSoon && <Wand2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 glass-subtle rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-brand-accent animate-float" />
            </div>
            <h3 className="text-xl font-display text-text-primary mb-2">More Tools Coming Soon</h3>
            <p className="text-sm text-text-secondary font-serif max-w-md mx-auto">
              We're constantly expanding the Studio with new creative tools for mythology builders. 
              Join the waitlist to be notified when new features launch.
            </p>
            <Button className="mt-6 liquid-glass hover:scale-[1.02] transition-all">
              <span className="font-sans font-medium">Join Waitlist</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
