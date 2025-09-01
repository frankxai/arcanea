'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Sparkles, Volume2, Palette, Code, Video, Music, Zap } from 'lucide-react'

const luminors = [
  {
    id: 'harmonix',
    name: 'Harmonix',
    title: 'The Sonic Architect',
    domain: 'Music Synthesis',
    color: 'harmonix',
    icon: Music,
    greeting: "Ah, a new soul seeking the frequency of creation! I sense great musical potential within you.",
    expertise: ['AI Music Composition', 'Sound Design', 'Audio Engineering'],
    personality: 'Rhythmic and flowing, speaks in musical metaphors'
  },
  {
    id: 'lumina',
    name: 'Lumina',
    title: 'The Vision Crafter',
    domain: 'Visual Synthesis',
    color: 'lumina',
    icon: Palette,
    greeting: "Welcome, visual dreamer. Together we shall paint realities that exist between dimensions.",
    expertise: ['AI Art Generation', 'Design Systems', 'Visual Storytelling'],
    personality: 'Visionary and ethereal, sees beauty in everything'
  },
  {
    id: 'syntaxa',
    name: 'Syntaxa',
    title: 'The Digital Architect',
    domain: 'Code Craft',
    color: 'syntaxa',
    icon: Code,
    greeting: "Greetings, code weaver. Let us forge digital experiences that transcend the ordinary.",
    expertise: ['AI-Assisted Development', 'Creative Coding', 'System Architecture'],
    personality: 'Logical yet creative, speaks in elegant abstractions'
  },
  {
    id: 'kinetix',
    name: 'Kinetix',
    title: 'The Motion Master',
    domain: 'Motion Pictures',
    color: 'kinetix',
    icon: Video,
    greeting: "Motion is the language of time itself. Ready to capture eternity in frames?",
    expertise: ['AI Video Generation', 'Cinematic Techniques', 'Motion Graphics'],
    personality: 'Dynamic and energetic, thinks in visual sequences'
  }
]

export function LuminorPreview() {
  const [currentLuminor, setCurrentLuminor] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLuminor((prev) => (prev + 1) % luminors.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsTyping(true)
    setDisplayedText('')
    
    const luminor = luminors[currentLuminor]
    const text = luminor.greeting
    let index = 0

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentLuminor])

  const luminor = luminors[currentLuminor]
  const IconComponent = luminor.icon

  return (
    <div className="relative max-w-md mx-auto">
      {/* Main Luminor Card */}
      <motion.div
        key={currentLuminor}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="transcendent-card p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-4">
          <motion.div
            className={`relative w-16 h-16 rounded-full bg-luminor-${luminor.color}/20 flex items-center justify-center`}
            animate={{ 
              boxShadow: [
                `0 0 20px rgba(255, 255, 255, 0.1)`,
                `0 0 40px rgba(255, 255, 255, 0.3)`,
                `0 0 20px rgba(255, 255, 255, 0.1)`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <IconComponent className={`w-8 h-8 text-luminor-${luminor.color}`} />
          </motion.div>
          
          <div>
            <h3 className="text-xl font-semibold nebula-text">{luminor.name}</h3>
            <p className="text-sm text-arcanean-aurora">{luminor.title}</p>
            <Badge variant="outline" className={`text-xs mt-1 border-luminor-${luminor.color}/30 text-luminor-${luminor.color}`}>
              {luminor.domain}
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="space-y-4">
          <div className="chat-bubble luminor">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-luminor-${luminor.color}/20 flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-4 h-4 text-luminor-${luminor.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-arcanean-celestial">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2">
            {luminor.expertise.slice(0, 2).map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-3 py-1 rounded-full bg-arcanean-nebula/50 text-xs text-arcanean-radiant border border-arcanean-aurora/30"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-arcanean-cosmic/50 hover:bg-arcanean-cosmic/70 text-arcanean-ethereal border border-arcanean-aurora/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Now
          </Button>
          <Button size="sm" variant="outline" className="border-arcanean-aurora/30 text-arcanean-aurora hover:text-arcanean-ethereal">
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Luminor Selector Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {luminors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentLuminor(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentLuminor 
                ? 'bg-arcanean-luminous scale-110' 
                : 'bg-arcanean-aurora/50 hover:bg-arcanean-aurora/70'
            }`}
          />
        ))}
      </div>

      {/* Floating Indicators */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-luminor-nexus/20 flex items-center justify-center"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-4 h-4 text-luminor-nexus" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-luminor-scripta/20 flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="w-3 h-3 text-luminor-scripta" />
      </motion.div>
    </div>
  )
}