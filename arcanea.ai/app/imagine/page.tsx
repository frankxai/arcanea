'use client'

import { useState, useEffect } from 'react'
import { AIRouter } from '@/lib/ai-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { GENERATION_STYLES } from '@/lib/ai-providers'

export default function ImagineInterface() {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video' | 'audio'>('image')
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  interface GenerationHistoryItem {
    id: string
    type: 'text' | 'image' | 'video' | 'audio'
    prompt: string
    result: string
    timestamp: number
    provider: string
    usage?: {
      tokens?: number
      cost?: number
      generationTime?: number
    }
  }

  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([])
  const [aiRouter, setAiRouter] = useState<AIRouter | null>(null)

  useEffect(() => {
    const router = new AIRouter()
    router.initialize()
    setAiRouter(router)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim() || !aiRouter) return

    setIsGenerating(true)
    
    try {
      let response
      const baseRequest = {
        prompt,
        options: {
          style: selectedStyle,
          dimensions: activeTab === 'image' ? { width: 1024, height: 1024 } : undefined,
          duration: activeTab === 'video' ? 10 : undefined,
          quality: 'standard' as const
        }
      }

      switch (activeTab) {
        case 'text':
          response = await aiRouter.generateText({
            ...baseRequest,
            providerId: selectedProvider || 'claude'
          })
          break
        
        case 'image':
          response = await aiRouter.generateImage({
            ...baseRequest,
            providerId: selectedProvider || 'dalle'
          })
          break
        
        case 'video':
          response = await aiRouter.generateVideo({
            ...baseRequest,
            providerId: selectedProvider || 'runway'
          })
          break
        
        case 'audio':
          response = await aiRouter.generateAudio({
            ...baseRequest,
            providerId: selectedProvider || 'suno'
          })
          break
      }

      const newGeneration: GenerationHistoryItem = {
        id: Date.now().toString(),
        type: activeTab,
        prompt,
        provider: response.providerId,
        result: typeof response.data === 'string' ? response.data : JSON.stringify(response.data),
        usage: response.usage,
        timestamp: Date.now()
      }

      setGenerationHistory(prev => [newGeneration, ...prev])
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getProviderOptions = () => {
    switch (activeTab) {
      case 'text':
        return [
          { id: 'claude', name: 'Claude 3.5 Sonnet', desc: 'Analytical & Creative' },
          { id: 'gpt', name: 'GPT-4 Turbo', desc: 'Versatile & Fast' },
          { id: 'gemini', name: 'Gemini Pro', desc: 'Multimodal' }
        ]
      case 'image':
        return [
          { id: 'dalle', name: 'DALL-E 3', desc: 'High Quality' },
          { id: 'midjourney', name: 'Midjourney', desc: 'Artistic Excellence' },
          { id: 'stable', name: 'Stable Diffusion', desc: 'Cost Effective' }
        ]
      case 'video':
        return [
          { id: 'runway', name: 'Runway Gen-2', desc: 'Premium Video' },
          { id: 'pika', name: 'Pika Labs', desc: 'Character Animation' }
        ]
      case 'audio':
        return [
          { id: 'suno', name: 'Suno AI', desc: 'Music Generation' },
          { id: 'elevenlabs', name: 'ElevenLabs', desc: 'Voice Synthesis' }
        ]
      default:
        return []
    }
  }

  const getStyleOptions = () => {
    return GENERATION_STYLES[activeTab] || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arcane-cosmic via-arcane-shadow to-arcane-cosmic">
      {/* Header */}
      <div className="bg-arcane-shadow/80 backdrop-blur-sm border-b border-arcane-crystal/20 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display text-arcane-crystal mb-2">Imagine Studio</h1>
          <p className="text-arcane-400">Multi-Modal Generation Suite</p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Sidebar - Generation Controls */}
        <div className="w-96 bg-arcane-shadow/90 backdrop-blur-md border-r border-arcane-crystal/20 p-6 overflow-y-auto">
          {/* Tab Selection */}
          <div className="mb-6">
            <h3 className="text-arcane-300 font-medium mb-3">Generation Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'text', name: 'Text', icon: '📝' },
                { id: 'image', name: 'Image', icon: '🎨' },
                { id: 'video', name: 'Video', icon: '🎬' },
                { id: 'audio', name: 'Audio', icon: '🎵' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'image' | 'video' | 'audio')}
                  className={`p-3 rounded-lg border transition-all ${
                    activeTab === tab.id
                      ? 'bg-arcane-fire border-arcane-fire text-white'
                      : 'bg-arcane-cosmic/50 border-arcane-cosmic/50 text-arcane-300 hover:bg-arcane-cosmic/70'
                  }`}
                >
                  <div className="text-2xl mb-1">{tab.icon}</div>
                  <div className="text-sm font-medium">{tab.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Provider Selection */}
          <div className="mb-6">
            <h3 className="text-arcane-300 font-medium mb-3">AI Provider</h3>
            <div className="space-y-2">
              {getProviderOptions().map(provider => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedProvider === provider.id
                      ? 'bg-arcane-crystal/20 border-arcane-crystal/30 text-arcane-crystal'
                      : 'bg-arcane-cosmic/30 border-arcane-cosmic/40 text-arcane-300 hover:bg-arcane-cosmic/50'
                  }`}
                >
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-xs opacity-75">{provider.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          {getStyleOptions().length > 0 && (
            <div className="mb-6">
              <h3 className="text-arcane-300 font-medium mb-3">Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {getStyleOptions().map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-2 rounded-lg border text-xs transition-all ${
                      selectedStyle === style
                        ? 'bg-arcane-crystal/20 border-arcane-crystal/30 text-arcane-crystal'
                        : 'bg-arcane-cosmic/30 border-arcane-cosmic/40 text-arcane-300 hover:bg-arcane-cosmic/50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Input */}
          <div className="mb-6">
            <h3 className="text-arcane-300 font-medium mb-3">Prompt</h3>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want to generate...`}
              className="min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-arcane-fire hover:bg-arcane-fire/80"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              `Generate ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
            )}
          </Button>

          {/* Usage Stats */}
          {aiRouter && (
            <div className="mt-6 p-4 bg-arcane-cosmic/30 rounded-lg">
              <h3 className="text-arcane-300 font-medium mb-2">Session Stats</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-arcane-400">Total Cost:</span>
                  <span className="text-arcane-crystal">${aiRouter.getUsageStats().totalCost.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arcane-400">Generations:</span>
                  <span className="text-arcane-crystal">{generationHistory.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Generation History */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generationHistory.map((gen) => (
                <div key={gen.id} className="bg-arcane-shadow/80 backdrop-blur-sm border border-arcane-cosmic/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="capitalize">
                      {gen.type}
                    </Badge>
                    <Badge variant="crystal">
                      {gen.provider}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-arcane-300 text-sm line-clamp-2">{gen.prompt}</p>
                  </div>

                  {/* Result Display */}
                  <div className="bg-arcane-cosmic/30 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
                    {gen.type === 'text' && (
                      <div className="text-arcane-300 text-sm">
                        {gen.result?.substring(0, 200)}...
                      </div>
                    )}
                    {gen.type === 'image' && (
                      <div className="w-full h-32 bg-arcane-cosmic/50 rounded flex items-center justify-center">
                        <span className="text-arcane-400">🖼️ Generated Image</span>
                      </div>
                    )}
                    {gen.type === 'video' && (
                      <div className="w-full h-32 bg-arcane-cosmic/50 rounded flex items-center justify-center">
                        <span className="text-arcane-400">🎬 Generated Video</span>
                      </div>
                    )}
                    {gen.type === 'audio' && (
                      <div className="w-full h-32 bg-arcane-cosmic/50 rounded flex items-center justify-center">
                        <span className="text-arcane-400">🎵 Generated Audio</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-arcane-400">
                      {new Date(gen.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-xs text-arcane-crystal">
                      ${gen.usage?.cost?.toFixed(4) ?? '0.0000'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {generationHistory.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-display text-arcane-crystal mb-2">Ready to Create</h3>
                <p className="text-arcane-400 mb-6">
                  Start generating amazing content with Arcanea's multi-modal AI suite
                </p>
                <div className="flex justify-center gap-4">
                  <Badge variant="outline">DALL-E 3</Badge>
                  <Badge variant="outline">Midjourney</Badge>
                  <Badge variant="outline">Runway</Badge>
                  <Badge variant="outline">Suno AI</Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}