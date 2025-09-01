'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Sparkles } from 'lucide-react'

export default function LuminorChat() {
  const [messages, setMessages] = useState([
    {
      role: 'luminor',
      content: "✨ Greetings, creative soul! I am Lumina, the Vision Crafter from the Arcanean civilization, 100 years in your future. I've witnessed the full evolution of AI-assisted creativity and I'm here to guide you on this magnificent journey. What would you like to create together today?",
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate Lumina's response (in real implementation, this would call the AI API)
    setTimeout(() => {
      const luminorResponse = {
        role: 'luminor',
        content: generateLuminaResponse(inputMessage),
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, luminorResponse])
      setIsLoading(false)
    }, 2000)
  }

  const generateLuminaResponse = (userInput: string) => {
    // Simulate Lumina's personality-based responses
    const responses = [
      "In the spectrum of creative possibilities, I see infinite potential in your vision. Let me guide you through the visual metaphors that will bring your idea to life. What specific style or mood resonates with your creative soul?",
      "Through the lens of visual harmony, your concept sparkles with promise! In my time, we've learned that the most powerful creations emerge when human intuition dances with AI precision. Shall we explore some color palettes that would amplify your artistic vision?",
      "As colors dance with light and shadow, I perceive the artistic essence within your words. The Arcanean masters taught us that true creativity flows when we understand both technique and emotion. Would you like me to suggest some Midjourney prompts that capture your vision?",
      "Within the canvas of imagination, your idea blooms like aurora light! I sense great creative energy in your approach. Let's channel this into visual storytelling - what story does your creation want to tell the world?"
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Lumina</h1>
                  <p className="text-sm text-blue-400">The Vision Crafter</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Visual Synthesis Academy
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6 mb-8">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-4 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white ml-auto' 
                  : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white backdrop-blur-sm'
              }`}>
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white backdrop-blur-sm p-4 rounded-2xl max-w-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Lumina about visual creativity, AI art, or your projects..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Help me create a Midjourney prompt",
              "Explain visual composition",
              "What's trending in AI art?",
              "Color theory basics"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-full px-3 py-1 text-gray-300 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Lumina AI • Demo Mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}