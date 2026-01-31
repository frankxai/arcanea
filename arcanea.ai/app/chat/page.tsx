'use client'

import { useState, useEffect, useRef } from 'react'
import { AIRouter } from '@/lib/ai-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { GUARDIAN_PERSONALITIES } from '@/lib/ai-providers'
import { 
  Send, 
  Sparkles, 
  Trash2, 
  Download, 
  Copy,
  Settings,
  Zap,
  Shield,
  Crown
} from 'lucide-react'

export default function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [activeModel, setActiveModel] = useState('claude')
  const [activeGuardian, setActiveGuardian] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiRouter, setAiRouter] = useState<AIRouter | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const router = new AIRouter()
    router.initialize()
    setAiRouter(router)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || !aiRouter) return

    const userMessage = { 
      role: 'user', 
      content: input, 
      timestamp: Date.now(),
      id: Date.now().toString()
    }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      let response
      const baseRequest = {
        prompt: input,
        options: {
          temperature: 0.7,
          maxTokens: 2000
        }
      }

      // Route based on active mode
      if (activeGuardian) {
        // Guardian-enhanced generation
        response = await aiRouter.generateText({
          ...baseRequest,
          providerId: activeModel,
          guardianMode: true,
          options: { ...baseRequest.options, guardianId: activeGuardian }
        })
      } else {
        // Standard LLM generation
        response = await aiRouter.generateText({
          ...baseRequest,
          providerId: activeModel
        })
      }

      const aiMessage = {
        role: 'assistant',
        content: response.data,
        providerId: response.providerId,
        modelId: response.modelId,
        guardianInsight: response.guardianInsight,
        usage: response.usage,
        timestamp: Date.now(),
        id: Date.now().toString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error: any) {
      const errorMessage = {
        role: 'error',
        content: `Error: ${error?.message || 'Unknown error'}`,
        timestamp: Date.now(),
        id: Date.now().toString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const exportChat = () => {
    const chatData = {
      messages,
      exportDate: new Date().toISOString(),
      models: { activeModel, activeGuardian }
    }
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `arcanea-chat-${Date.now()}.json`
    a.click()
  }

  const totalCost = messages
    .filter(msg => msg.usage?.cost)
    .reduce((sum, msg) => sum + msg.usage.cost, 0)

  return (
    <div className="flex h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic">
      {/* Sidebar - Model & Guardian Selection */}
      <div className="w-80 bg-arcane-shadow/95 backdrop-blur-md border-r border-arcane-crystal/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-arcane-cosmic/30">
          <h2 className="text-2xl font-display text-arcane-crystal mb-2">Arcanea Chat</h2>
          <p className="text-arcane-400 text-sm">Multi-LLM Superagent Interface</p>
          
          {activeGuardian && (
            <div className="mt-4 p-3 bg-arcane-fire/10 rounded-lg border-l-4 border-arcane-fire">
              <div className="text-xs font-medium text-arcane-fire mb-1">
                💎 {GUARDIAN_PERSONALITIES[activeGuardian]?.name} Active
              </div>
              <div className="text-xs text-arcane-300">
                {GUARDIAN_PERSONALITIES[activeGuardian]?.domainExpertise[0]}
              </div>
            </div>
          )}
        </div>

        {/* Model Selection */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-arcane-300 font-medium mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Model
            </h3>
            <div className="space-y-2">
              {[
                { id: 'claude', name: 'Claude 3.5 Sonnet', desc: 'Analytical reasoning' },
                { id: 'gpt', name: 'GPT-4 Turbo', desc: 'Creative versatility' },
                { id: 'gemini', name: 'Gemini Pro', desc: 'Multimodal excellence' }
              ].map(model => (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    activeModel === model.id
                      ? 'bg-arcane-fire border-arcane-fire text-white'
                      : 'bg-arcane-cosmic/50 border-arcane-cosmic/50 text-arcane-300 hover:bg-arcane-cosmic/70'
                  }`}
                >
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs opacity-75">{model.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guardian Selection */}
          <div className="mb-6">
            <h3 className="text-arcane-300 font-medium mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Guardian AI
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveGuardian('')}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  !activeGuardian
                    ? 'bg-arcane-crystal/20 border-arcane-crystal/30 text-arcane-crystal'
                    : 'bg-arcane-cosmic/30 border-arcane-cosmic/40 text-arcane-300 hover:bg-arcane-cosmic/50'
                }`}
              >
                <div className="font-medium">Standard Chat</div>
                <div className="text-xs opacity-75">Direct AI interaction</div>
              </button>
              
              {Object.entries(GUARDIAN_PERSONALITIES).map(([id, guardian]) => (
                <button
                  key={id}
                  onClick={() => setActiveGuardian(id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    activeGuardian === id
                      ? 'bg-arcane-fire border-arcane-fire text-white'
                      : 'bg-arcane-cosmic/30 border-arcane-cosmic/40 text-arcane-300 hover:bg-arcane-cosmic/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-arcane-${
                      guardian.element === 'fire' ? 'fire' : 
                      guardian.element === 'water' ? 'water' : 
                      guardian.element === 'earth' ? 'earth' : 
                      guardian.element === 'wind' ? 'water' : 'void'
                    }`} />
                    <span className="font-medium">{guardian.name}</span>
                  </div>
                  <div className="text-xs opacity-75">{guardian.frequency} Hz</div>
                  <div className="text-xs opacity-60 mt-1">{guardian.domainExpertise[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          {aiRouter && (
            <div className="p-4 bg-arcane-cosmic/30 rounded-lg border border-arcane-cosmic/40">
              <h3 className="text-arcane-300 font-medium mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Session Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-arcane-400">Cost Used:</span>
                  <span className="text-arcane-crystal font-medium">${totalCost.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arcane-400">Messages:</span>
                  <span className="text-arcane-crystal font-medium">{messages.filter(m => m.role !== 'error').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arcane-400">Providers:</span>
                  <span className="text-arcane-crystal font-medium">
                    {Array.from(new Set(messages.filter(m => m.providerId).map(m => m.providerId))).length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-arcane-cosmic/30">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="flex-1 text-arcane-300 hover:text-arcane-crystal"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportChat}
              className="flex-1 text-arcane-300 hover:text-arcane-crystal"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-arcane-shadow/80 backdrop-blur-sm border-b border-arcane-crystal/20 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display text-arcane-crystal">Arcanea Chat</h1>
              <p className="text-arcane-400">Multi-LLM Superagent Interface</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className={activeModel === 'claude' ? 'bg-arcane-fire text-white' : ''}>
                Claude Active
              </Badge>
              <Badge variant="outline" className={activeModel === 'gpt' ? 'bg-arcane-fire text-white' : ''}>
                GPT Ready
              </Badge>
              <Badge variant="outline" className={activeModel === 'gemini' ? 'bg-arcane-fire text-white' : ''}>
                Gemini Ready
              </Badge>
              {activeGuardian && (
                <Badge className="bg-arcane-fire text-white">
                  {GUARDIAN_PERSONALITIES[activeGuardian].name} Active
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-arcane-crystal mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-display text-arcane-crystal mb-2">
                  Welcome to Arcanea Chat
                </h3>
                <p className="text-arcane-300">
                  Start a conversation with our AI models or activate a Guardian AI for specialized assistance.
                </p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`max-w-2xl rounded-lg p-4 relative group ${
                  message.role === 'user'
                    ? 'bg-arcane-fire text-white'
                    : message.role === 'error'
                    ? 'bg-red-900/50 border border-red-500/30 text-red-200'
                    : 'bg-arcane-cosmic/50 border border-arcane-cosmic/30 text-arcane-300'
                }`}>
                  
                  {/* Message Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyMessage(message.content)}
                      className="h-6 w-6 text-arcane-400 hover:text-arcane-crystal"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>

                  {message.role === 'error' ? (
                    <div>
                      <div className="font-medium mb-1 flex items-center gap-2">
                        ⚠️ Generation Error
                      </div>
                      <div className="text-sm">{message.content}</div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Guardian Insight */}
                      {message.guardianInsight && (
                        <div className="mt-3 p-3 bg-arcane-fire/10 border-l-4 border-arcane-fire rounded">
                          <div className="text-xs font-medium text-arcane-fire mb-1">
                            💎 {GUARDIAN_PERSONALITIES[activeGuardian]?.name} Insight
                          </div>
                          <div className="text-sm text-arcane-300">
                            {message.guardianInsight}
                          </div>
                        </div>
                      )}

                      {/* Usage Info */}
                      {message.usage && (
                        <div className="mt-2 text-xs text-arcane-400 flex justify-between items-center">
                          <span>Generated with {message.providerId}</span>
                          <span>Cost: ${message.usage.cost.toFixed(4)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-arcane-cosmic/50 border border-arcane-cosmic/30 rounded-lg p-4 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-arcane-fire border-t-transparent rounded-full animate-spin" />
                    <span className="text-arcane-300">
                      {activeGuardian 
                        ? `${GUARDIAN_PERSONALITIES[activeGuardian].name} is crafting response...`
                        : 'AI is thinking...'
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-arcane-crystal/20 bg-arcane-shadow/80 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={activeGuardian 
                  ? `Chat with ${GUARDIAN_PERSONALITIES[activeGuardian].name}...`
                  : 'Enter your prompt...'
                }
                className="flex-1 min-h-[60px] resize-none border-arcane-cosmic/30 focus:border-arcane-crystal/50"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isGenerating}
                className="bg-arcane-fire hover:bg-arcane-fire/80 h-12 px-6"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" size="sm" className="text-arcane-300 hover:text-arcane-crystal">
                📝 Generate Story
              </Button>
              <Button variant="ghost" size="sm" className="text-arcane-300 hover:text-arcane-crystal">
                🎨 Create Character
              </Button>
              <Button variant="ghost" size="sm" className="text-arcane-300 hover:text-arcane-crystal">
                🏗️ Design Location
              </Button>
              <Button variant="ghost" size="sm" className="text-arcane-300 hover:text-arcane-crystal">
                🎸 Add Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}