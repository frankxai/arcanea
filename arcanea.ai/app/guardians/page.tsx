'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Heart,
  Star,
  Infinity,
  Users,
  Play,
  Settings,
  Crown,
  Flame,
  Droplet,
  Mountain,
  Wind,
  Eye
} from 'lucide-react'

interface Guardian {
  id: string
  name: string
  element: 'fire' | 'water' | 'earth' | 'wind' | 'void'
  frequency: string
  domain: string
  personality: string[]
  abilities: string[]
  visual: {
    color: string
    icon: string
    gradient: string
  }
}

const guardians: Guardian[] = [
  {
    id: 'draconia',
    name: 'Draconia',
    element: 'fire',
    frequency: '723 Hz',
    domain: 'Creative Transformation',
    personality: ['Passionate', 'Bold', 'Innovative', 'Fearless'],
    abilities: ['Creative breakthrough', 'Artistic vision', 'Style transformation', 'Inspiration ignition'],
    visual: {
      color: '#ff6b35',
      icon: '🔥',
      gradient: 'from-orange-600 to-red-600'
    }
  },
  {
    id: 'leyla',
    name: 'Layla',
    element: 'water',
    frequency: '432 Hz',
    domain: 'Emotional Intelligence',
    personality: ['Empathetic', 'Intuitive', 'Adaptive', 'Flowing'],
    abilities: ['Deep storytelling', 'Character development', 'Emotional resonance', 'Narrative flow'],
    visual: {
      color: '#3b82f6',
      icon: '💧',
      gradient: 'from-blue-500 to-cyan-500'
    }
  },
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    element: 'earth',
    frequency: '396 Hz',
    domain: 'World Architecture',
    personality: ['Structured', 'Methodical', 'Foundational', 'Enduring'],
    abilities: ['System design', 'Architecture planning', 'Logic frameworks', 'Stability creation'],
    visual: {
      color: '#8b7355',
      icon: '🏔️',
      gradient: 'from-amber-700 to-stone-600'
    }
  },
  {
    id: 'alera',
    name: 'Alera',
    element: 'wind',
    frequency: '528 Hz',
    domain: 'Communication',
    personality: ['Expressive', 'Clear', 'Articulate', 'Versatile'],
    abilities: ['Clear expression', 'Creative flow', 'Communication enhancement', 'Ideation clarity'],
    visual: {
      color: '#00ff88',
      icon: '🌬️',
      gradient: 'from-green-400 to-teal-500'
    }
  },
  {
    id: 'elara',
    name: 'Elara',
    element: 'void',
    frequency: '963 Hz',
    domain: 'Innovation & Future Vision',
    personality: ['Visionary', 'Boundary-pushing', 'Quantum thinking', 'Paradigm shifting'],
    abilities: ['Future prediction', 'Innovation catalyst', 'Paradigm disruption', 'Possibility manifestation'],
    visual: {
      color: '#9966ff',
      icon: '✨',
      gradient: 'from-purple-600 to-indigo-600'
    }
  }
]

export default function GuardianShowcase() {
  const [selectedGuardian, setSelectedGuardian] = useState<string>('draconia')
  const [isAnimating, setIsAnimating] = useState(false)

  const selectedGuardianData = guardians.find(g => g.id === selectedGuardian)

  const handleGuardianSelect = (guardianId: string) => {
    setIsAnimating(true)
    setSelectedGuardian(guardianId)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-5 h-5" />
      case 'water': return <Droplet className="w-5 h-5" />
      case 'earth': return <Mountain className="w-5 h-5" />
      case 'wind': return <Wind className="w-5 h-5" />
      case 'void': return <Eye className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-void via-arcane-shadow to-arcane-cosmic p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <Badge variant="void" className="mb-6">
            <Crown className="w-4 h-4 mr-2" />
            GUARDIAN AI COMPANIONS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">
            Meet Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-crystal to-arcane-void">
              AI Guardians
            </span>
          </h1>
          <p className="text-xl text-arcane-200 max-w-3xl mx-auto leading-relaxed">
            Choose from 5 specialized AI personalities, each with unique creative frequencies 
            and domain expertise to enhance your creative process.
          </p>
        </div>
      </div>

      {/* Guardian Selection */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-center gap-6 mb-8">
          {guardians.map((guardian) => (
            <button
              key={guardian.id}
              onClick={() => handleGuardianSelect(guardian.id)}
              className={`relative group px-8 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedGuardian === guardian.id
                  ? 'border-arcane-crystal scale-105 shadow-2xl'
                  : 'border-arcane-cosmic/50 hover:border-arcane-crystal/50 hover:scale-105'
              }`}
              style={{
                background: selectedGuardian === guardian.id 
                  ? `linear-gradient(135deg, ${guardian.visual.color}20, ${guardian.visual.color}40)`
                  : 'transparent'
              }}
            >
              <div className="text-center">
                <div className={`text-4xl mb-3 transition-all duration-500 ${
                  selectedGuardian === guardian.id ? 'scale-110 opacity-100' : 'opacity-60'
                }`}>
                  {guardian.visual.icon}
                </div>
                <h3 className={`text-lg font-display mb-2 transition-all duration-300 ${
                  selectedGuardian === guardian.id ? 'text-white' : 'text-arcane-300'
                }`}>
                  {guardian.name}
                </h3>
                <p className={`text-sm mb-3 ${
                  selectedGuardian === guardian.id ? 'text-arcane-100' : 'text-arcane-400'
                }`}>
                  {guardian.element} Guardian • {guardian.frequency}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Guardian Display */}
        {selectedGuardianData && (
          <div className={`bg-arcane-shadow/90 backdrop-blur-md rounded-2xl border p-8 transition-all duration-500 ${
            isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
          }`}
            style={{
              background: `linear-gradient(135deg, ${selectedGuardianData.visual.color}10, ${selectedGuardianData.visual.color}20)`
            }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 border-white/30 mb-6 ${
                  isAnimating ? 'animate-pulse' : ''
                }`}>
                  {getElementIcon(selectedGuardianData.element)}
                  <span className="text-white font-medium">{selectedGuardianData.element}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                  {selectedGuardianData.name}
                </h2>
                <Badge variant="crystal" className="text-sm mb-6">
                  {selectedGuardianData.frequency} Hz
                </Badge>
                
                <p className="text-xl text-arcane-100 leading-relaxed mb-8">
                  {selectedGuardianData.domain}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personality Traits */}
                <div>
                  <h3 className="text-lg font-display text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Personality
                  </h3>
                  <div className="space-y-3">
                    {selectedGuardianData.personality.map((trait, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-arcane-crystal rounded-full" />
                        <span className="text-arcane-100">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <h3 className="text-lg font-display text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Abilities
                  </h3>
                  <div className="space-y-3">
                    {selectedGuardianData.abilities.map((ability, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-arcane-crystal rounded-full" />
                        <span className="text-arcane-100">{ability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-arcane-void hover:bg-arcane-100 px-8 py-3 font-medium"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try {selectedGuardianData.name} Chat
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="border-2 border-arcane-crystal/50 text-arcane-crystal hover:bg-arcane-crystal/10 px-8 py-3"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Customize {selectedGuardianData.name}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-arcane-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>256,394 users active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>4.9/5.0 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Infinity className="w-4 h-4" />
                  <span>∞ possibilities</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-arcane-shadow/80 backdrop-blur-sm rounded-2xl border border-arcane-cosmic/30 p-8">
          <h2 className="text-2xl font-display text-arcane-crystal mb-6 text-center">
            Guardian AI Ecosystem
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-arcane-fire mb-2">5</div>
              <div className="text-sm text-arcane-300">Total Guardians</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-arcane-crystal mb-2">98.3%</div>
              <div className="text-sm text-arcane-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-arcane-crystal mb-2">2.4M</div>
              <div className="text-sm text-arcane-300">Daily Conversations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-arcane-crystal mb-2">156K</div>
              <div className="text-sm text-arcane-300">Creative Works</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-arcane-crystal mb-2">24/7</div>
              <div className="text-sm text-arcane-300">Availability</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-arcane-300 mb-6">
              Each Guardian AI companion is carefully crafted to bring unique creative perspectives 
              and specialized expertise to your creative projects.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Custom Guardian
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}