'use client'

import { BookOpen, Scroll, Flame, Droplet, Wind, Mountain, Crystal, Sparkles, Shield, Eye, Brain, Heart, Star, Compass, Zap, Moon, Sun } from 'lucide-react'

interface Collection {
  id: string
  title: string
  description: string
  icon: any
  count: number
  color: string
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'The Five Elements',
    description: 'Core principles of Crystal, Fire, Water, Wind, and Void',
    icon: Sparkles,
    count: 42,
    color: 'from-element-crystal/20 to-brand-accent/10',
  },
  {
    id: '2',
    title: 'The Guardians',
    description: 'Immortal beings who watch over the elemental realms',
    icon: Shield,
    count: 28,
    color: 'from-brand-primary/20 to-brand-secondary/10',
  },
  {
    id: '3',
    title: 'Ten Gates of Consciousness',
    description: 'Levels of awareness and spiritual awakening',
    icon: Eye,
    count: 35,
    color: 'from-element-void/20 to-brand-primary/10',
  },
  {
    id: '4',
    title: 'Academy of Luminous Arts',
    description: 'The great school of mystical knowledge and practice',
    icon: BookOpen,
    count: 56,
    color: 'from-brand-gold/20 to-brand-accent/10',
  },
  {
    id: '5',
    title: 'Creation Myths',
    description: 'Stories of how the cosmos came into being',
    icon: Star,
    count: 23,
    color: 'from-brand-secondary/20 to-element-water/10',
  },
  {
    id: '6',
    title: 'Realms & Domains',
    description: 'The seven planes of existence in Arcanean cosmology',
    icon: Compass,
    count: 31,
    color: 'from-element-earth/20 to-element-crystal/10',
  },
  {
    id: '7',
    title: 'Sacred Texts',
    description: 'Ancient manuscripts and prophetic writings',
    icon: Scroll,
    count: 67,
    color: 'from-brand-gold/20 to-element-fire/10',
  },
  {
    id: '8',
    title: 'Elemental Magic',
    description: 'Techniques for channeling and wielding elemental forces',
    icon: Zap,
    count: 89,
    color: 'from-element-fire/20 to-element-wind/10',
  },
  {
    id: '9',
    title: 'Crystal Lore',
    description: 'Knowledge of crystalline structures and memory',
    icon: Crystal,
    count: 45,
    color: 'from-element-crystal/20 to-brand-accent/10',
  },
  {
    id: '10',
    title: 'Fire Teachings',
    description: 'Wisdom of transformation, passion, and energy',
    icon: Flame,
    count: 38,
    color: 'from-element-fire/20 to-destructive/10',
  },
  {
    id: '11',
    title: 'Water Wisdom',
    description: 'Flow, adaptation, and the depths of emotion',
    icon: Droplet,
    count: 41,
    color: 'from-element-water/20 to-brand-secondary/10',
  },
  {
    id: '12',
    title: 'Wind Philosophies',
    description: 'Freedom, change, and the breath of life',
    icon: Wind,
    count: 36,
    color: 'from-element-wind/20 to-brand-accent/10',
  },
  {
    id: '13',
    title: 'Void Mysteries',
    description: 'The infinite potential and creative darkness',
    icon: Moon,
    count: 29,
    color: 'from-element-void/20 to-brand-primary/10',
  },
  {
    id: '14',
    title: 'Rituals & Ceremonies',
    description: 'Sacred practices for communion with the elements',
    icon: Sun,
    count: 52,
    color: 'from-brand-gold/20 to-element-fire/10',
  },
  {
    id: '15',
    title: 'Prophecies',
    description: 'Visions of what was and what may yet be',
    icon: Eye,
    count: 18,
    color: 'from-brand-primary/20 to-element-void/10',
  },
  {
    id: '16',
    title: 'Heart Path',
    description: 'The way of compassion, connection, and love',
    icon: Heart,
    count: 34,
    color: 'from-destructive/20 to-brand-gold/10',
  },
  {
    id: '17',
    title: 'Mind Techniques',
    description: 'Methods for expanding consciousness and perception',
    icon: Brain,
    count: 47,
    color: 'from-brand-secondary/20 to-brand-primary/10',
  },
]

export function LibraryTab() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4">
        <div>
          <h2 className="text-2xl font-display text-text-primary mb-1">Knowledge Library</h2>
          <p className="text-sm text-text-secondary font-serif">
            Explore the 17 foundational collections of Arcanean wisdom
          </p>
        </div>
      </header>

      {/* Collections Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection, index) => {
              const Icon = collection.icon
              return (
                <div
                  key={collection.id}
                  className="glass rounded-xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(127, 255, 212, 0.2)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${collection.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-text-primary" />
                      </div>
                      <div className="glass-subtle px-2.5 py-1 rounded-full">
                        <span className="text-xs font-sans font-medium text-brand-accent">{collection.count}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display text-text-primary mb-2 group-hover:text-brand-accent transition-colors">
                      {collection.title}
                    </h3>
                    
                    <p className="text-sm text-text-secondary font-serif leading-relaxed mb-4">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans text-text-muted">
                        {collection.count} texts available
                      </span>
                      <span className="text-xs font-sans text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Open →
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
