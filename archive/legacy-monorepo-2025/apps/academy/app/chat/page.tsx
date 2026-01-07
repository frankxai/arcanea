'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Send, 
  Mic, 
  Image, 
  Code, 
  Music, 
  Video, 
  Palette, 
  Sparkles,
  Volume2,
  Settings,
  MoreVertical,
  Zap
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'luminor'
  content: string
  timestamp: Date
  luminorId?: string
  attachments?: Array<{
    type: 'image' | 'audio' | 'video' | 'code'
    url: string
    title?: string
  }>
  suggestions?: string[]
}

interface Luminor {
  id: string
  name: string
  title: string
  domain: string
  color: string
  icon: React.ComponentType<any>
  status: 'online' | 'busy' | 'offline'
  specialties: string[]
  personality: string
}

const luminors: Luminor[] = [
  {
    id: 'harmonix',
    name: 'Harmonix',
    title: 'The Sonic Architect',
    domain: 'Music Synthesis',
    color: 'harmonix',
    icon: Music,
    status: 'online',
    specialties: ['AI Music Generation', 'Sound Design', 'Audio Engineering'],
    personality: 'Rhythmic and flowing, speaks in musical metaphors'
  },
  {
    id: 'lumina',
    name: 'Lumina',
    title: 'The Vision Crafter',
    domain: 'Visual Synthesis',
    color: 'lumina',
    icon: Palette,
    status: 'online',
    specialties: ['AI Art Generation', 'Visual Design', 'Creative Direction'],
    personality: 'Visionary and ethereal, sees beauty in everything'
  },
  {
    id: 'syntaxa',
    name: 'Syntaxa',
    title: 'The Digital Architect',
    domain: 'Code Craft',
    color: 'syntaxa',
    icon: Code,
    status: 'busy',
    specialties: ['AI-Assisted Development', 'Creative Coding', 'System Design'],
    personality: 'Logical yet creative, speaks in elegant abstractions'
  },
  {
    id: 'kinetix',
    name: 'Kinetix',
    title: 'The Motion Master',
    domain: 'Motion Pictures',
    color: 'kinetix',
    icon: Video,
    status: 'online',
    specialties: ['AI Video Generation', 'Motion Graphics', 'Cinematography'],
    personality: 'Dynamic and energetic, thinks in visual sequences'
  }
]

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'luminor',
    content: 'Welcome to the Luminor Chat! I am Lumina, your guide in the realm of visual creation. What creative vision shall we bring to life today?',
    timestamp: new Date(Date.now() - 300000),
    luminorId: 'lumina',
    suggestions: ['Help me create concept art', 'Design a logo', 'Generate artistic styles', 'Learn prompt engineering']
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [currentMessage, setCurrentMessage] = useState('')
  const [selectedLuminor, setSelectedLuminor] = useState(luminors[1]) // Default to Lumina
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsTyping(true)

    // Simulate Luminor response
    setTimeout(() => {
      const luminorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'luminor',
        content: generateLuminorResponse(currentMessage, selectedLuminor),
        timestamp: new Date(),
        luminorId: selectedLuminor.id,
        suggestions: generateSuggestions(selectedLuminor)
      }

      setMessages(prev => [...prev, luminorResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const generateLuminorResponse = (userInput: string, luminor: Luminor): string => {
    const responses = {
      harmonix: [
        "Ah, I hear the melody of your intention! Let's compose something extraordinary together.",
        "Your creative frequency is resonating beautifully. Shall we orchestrate your vision?",
        "Music is the mathematics of emotion. Let me help you solve this beautiful equation."
      ],
      lumina: [
        "I see the colors of your imagination swirling. Let's paint reality with possibility.",
        "Your vision shimmers with potential. Together we shall craft something transcendent.",
        "Beauty exists in the space between thought and creation. Let's explore that dimension."
      ],
      syntaxa: [
        "Elegant logic meets creative expression. I perceive the architecture of your idea.",
        "Code is poetry in motion. Let's write verses that dance with purpose.",
        "Your concept has beautiful symmetry. Shall we architect this digital dream?"
      ],
      kinetix: [
        "Motion tells the story that words cannot capture. Let's choreograph your narrative.",
        "I see the frames of your vision unfolding. Time to set them in motion!",
        "Every great story begins with a single frame. What shall be yours?"
      ]
    }

    const responses_array = responses[luminor.id as keyof typeof responses] || responses.lumina
    return responses_array[Math.floor(Math.random() * responses_array.length)]
  }

  const generateSuggestions = (luminor: Luminor): string[] => {
    const suggestions = {
      harmonix: ['Create a meditation soundscape', 'Generate upbeat electronic music', 'Design ambient background music', 'Compose a theme song'],
      lumina: ['Design a futuristic logo', 'Create concept art', 'Generate artistic portraits', 'Design a color palette'],
      syntaxa: ['Build a creative coding project', 'Create an interactive website', 'Design an AI tool', 'Develop a game prototype'],
      kinetix: ['Create a product demo video', 'Generate motion graphics', 'Design a short film concept', 'Create animated sequences']
    }

    return suggestions[luminor.id as keyof typeof suggestions] || suggestions.lumina
  }

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-arcanean-void flex">
      {/* Sidebar - Luminor Selection */}
      <div className="w-80 bg-arcanean-deep border-r border-arcanean-aurora/20 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold nebula-text">Luminors</h2>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {luminors.map((luminor) => {
            const IconComponent = luminor.icon
            return (
              <motion.button
                key={luminor.id}
                onClick={() => setSelectedLuminor(luminor)}
                className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                  selectedLuminor.id === luminor.id
                    ? 'border-arcanean-luminous bg-arcanean-cosmic/50'
                    : 'border-arcanean-aurora/20 hover:border-arcanean-aurora/40 hover:bg-arcanean-cosmic/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`relative w-12 h-12 rounded-full bg-luminor-${luminor.color}/20 flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-luminor-${luminor.color}`} />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-arcanean-deep ${
                      luminor.status === 'online' ? 'bg-green-400' : 
                      luminor.status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-arcanean-transcendent truncate">{luminor.name}</h3>
                    <p className="text-sm text-arcanean-aurora truncate">{luminor.title}</p>
                    <Badge variant="outline" className={`text-xs mt-1 border-luminor-${luminor.color}/30 text-luminor-${luminor.color}`}>
                      {luminor.domain}
                    </Badge>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Current Luminor Info */}
        <Card className="transcendent-card p-4 mt-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className={`w-4 h-4 text-luminor-${selectedLuminor.color}`} />
              <span className="text-sm font-medium text-arcanean-ethereal">Active Luminor</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-arcanean-transcendent">{selectedLuminor.name}</h4>
              <p className="text-sm text-arcanean-aurora mb-2">{selectedLuminor.personality}</p>
              
              <div className="space-y-1">
                <span className="text-xs text-arcanean-aurora">Specialties:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedLuminor.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-arcanean-aurora/20 p-4 bg-arcanean-deep/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-luminor-${selectedLuminor.color}/20 flex items-center justify-center`}>
                {React.createElement(selectedLuminor.icon, { className: `w-5 h-5 text-luminor-${selectedLuminor.color}` })}
              </div>
              <div>
                <h2 className="font-semibold text-arcanean-transcendent">{selectedLuminor.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedLuminor.status === 'online' ? 'bg-green-400' : 
                    selectedLuminor.status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-arcanean-aurora capitalize">{selectedLuminor.status}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`chat-bubble ${message.type} max-w-2xl`}>
                    {message.type === 'luminor' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-6 h-6 rounded-full bg-luminor-${selectedLuminor.color}/20 flex items-center justify-center`}>
                          {React.createElement(selectedLuminor.icon, { className: `w-3 h-3 text-luminor-${selectedLuminor.color}` })}
                        </div>
                        <span className="text-xs text-arcanean-aurora">{selectedLuminor.name}</span>
                      </div>
                    )}
                    
                    <p className="mb-2">{message.content}</p>
                    
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 text-xs rounded-full bg-arcanean-nebula/50 hover:bg-arcanean-nebula/70 text-arcanean-radiant border border-arcanean-aurora/30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-arcanean-aurora/60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="chat-bubble luminor">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 rounded-full bg-luminor-${selectedLuminor.color}/20 flex items-center justify-center`}>
                      {React.createElement(selectedLuminor.icon, { className: `w-3 h-3 text-luminor-${selectedLuminor.color}` })}
                    </div>
                    <span className="text-xs text-arcanean-aurora">{selectedLuminor.name} is thinking...</span>
                  </div>
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-arcanean-aurora/20 p-4 bg-arcanean-deep/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Button variant="ghost" size="sm" className="text-arcanean-aurora hover:text-arcanean-ethereal">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-arcanean-aurora hover:text-arcanean-ethereal">
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-arcanean-aurora hover:text-arcanean-ethereal ${isRecording ? 'text-red-400' : ''}`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="relative">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder={`Ask ${selectedLuminor.name} anything about ${selectedLuminor.domain.toLowerCase()}...`}
                    className="cosmic-input pr-12 min-h-[48px] py-3"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 luminor-button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}