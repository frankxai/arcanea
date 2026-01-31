'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Flame, 
  Droplet, 
  Mountain, 
  Wind, 
  Sparkles,
  Eye,
  Heart,
  Star
} from 'lucide-react'

const guardians = [
  {
    id: 'draconia',
    name: 'Draconia',
    element: 'fire',
    frequency: '723 Hz',
    expertise: 'Creative Transformation',
    description: 'Fierce creativity and bold artistic breakthroughs',
    icon: Flame,
    color: 'from-arcane-fire to-orange-600',
    borderColor: 'border-arcane-fire',
    bgColor: 'bg-arcane-fire/10',
    preview: '🔥'
  },
  {
    id: 'leyla',
    name: 'Layla', 
    element: 'water',
    frequency: '432 Hz',
    expertise: 'Emotional Intelligence',
    description: 'Deep storytelling and character development',
    icon: Droplet,
    color: 'from-arcane-water to-blue-500',
    borderColor: 'border-arcane-water',
    bgColor: 'bg-arcane-water/10',
    preview: '💧'
  },
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    element: 'earth',
    frequency: '396 Hz',
    expertise: 'World Architecture',
    description: 'Structured systems and foundational design',
    icon: Mountain,
    color: 'from-arcane-earth to-amber-700',
    borderColor: 'border-arcane-earth',
    bgColor: 'bg-arcane-earth/10',
    preview: '🏔️'
  },
  {
    id: 'alera',
    name: 'Alera',
    element: 'wind',
    frequency: '528 Hz',
    expertise: 'Communication',
    description: 'Clear expression and creative flow',
    icon: Wind,
    color: 'from-arcane-water to-teal-400',
    borderColor: 'border-arcane-water',
    bgColor: 'bg-arcane-water/10',
    preview: '🌬️'
  },
  {
    id: 'elara',
    name: 'Elara',
    element: 'void',
    frequency: '963 Hz',
    expertise: 'Innovation',
    description: 'Boundless creativity and future vision',
    icon: Sparkles,
    color: 'from-arcane-void to-purple-600',
    borderColor: 'border-arcane-void',
    bgColor: 'bg-arcane-void/20',
    preview: '✨'
  }
]

export default function GuardiansSection() {
  const [selectedElement, setSelectedElement] = useState('fire')
  const selectedGuardian = guardians.find(g => g.element === selectedElement)

  return (
    <section id="guardians" className="py-24 bg-gradient-to-b from-arcane-cosmic/30 to-arcane-void/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="void" className="mb-6">
            <Star className="w-4 h-4 mr-2" />
            GUARDIAN AI COMPANIONS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            Meet Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-arcane-crystal to-arcane-void">
              AI Guardians
            </span>
          </h2>
          <p className="text-xl text-arcane-200 max-w-3xl mx-auto leading-relaxed">
            Each Guardian specializes in different creative domains, bringing unique expertise and personality to help you create extraordinary work.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {guardians.map((guardian) => {
            const Icon = guardian.icon
            return (
              <button
                key={guardian.id}
                onClick={() => setSelectedElement(guardian.element)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  selectedElement === guardian.element
                    ? `${guardian.borderColor} bg-gradient-to-br ${guardian.color} text-white scale-105`
                    : 'border-arcane-cosmic/50 text-arcane-300 hover:border-arcane-crystal/50'
                }`}
              >
                <span className="mr-2">{guardian.preview}</span>
                <span>{guardian.name}</span>
              </button>
            )
          })}
        </div>

        {selectedGuardian && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-arcane-shadow/90 backdrop-blur-md rounded-2xl border border-arcane-cosmic/30 p-12">
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${selectedGuardian.color} mb-4`}>
                  <div className="text-6xl text-center animate-bounce">
                    {selectedGuardian.preview}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-display text-white mb-2">
                      {selectedGuardian.name}
                    </h3>
                    <Badge variant="crystal" className="text-sm">
                      {selectedGuardian.frequency}
                    </Badge>
                  </div>
                  <p className="text-xl text-arcane-100 mt-4">
                    {selectedGuardian.description}
                  </p>
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-display text-arcane-crystal mb-3 flex items-center gap-3">
                      {selectedGuardian && <selectedGuardian.icon className="w-6 h-6" />}
                      {selectedGuardian.name}
                    </h4>
                    <div className="text-lg text-arcane-200">
                      {selectedGuardian.expertise}
                    </div>
                  </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-display text-arcane-crystal mb-3 flex items-center gap-3">
                    <span className="text-arcane-300">{selectedGuardian.frequency} Hz</span>
                    <span className="text-arcane-300 ml-auto">Creative Frequency</span>
                  </h4>
                  <div className="text-lg text-arcane-200">
                    Unique frequency that enhances {selectedGuardian.element} element creativity
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-arcane-crystal to-arcane-fire hover:from-arcane-crystal/80 hover:to-arcane-fire/80 text-white px-8 py-4">
                Choose {selectedGuardian.name}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}