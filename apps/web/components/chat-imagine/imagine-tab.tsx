'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, Heart, Download, Maximize2, Share2, Film, X, Check, Search, Palette, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface GeneratedImage {
  id: string
  url: string
  prompt: string
  liked: boolean
  animated: boolean
  timestamp: Date
}

const initialImages: GeneratedImage[] = [
  {
    id: '1',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'Guardian Lyria standing in a crystal citadel, ethereal lighting, fantasy art',
    liked: true,
    animated: false,
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: '2',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'The Five Elements swirling in cosmic harmony, abstract mystical art',
    liked: false,
    animated: false,
    timestamp: new Date(Date.now() - 5400000),
  },
  {
    id: '3',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'Academy of Luminous Arts at twilight, magical architecture, cinematic',
    liked: true,
    animated: true,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'Portal through the Ten Gates, dimensional gateway, photorealistic',
    liked: false,
    animated: false,
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '5',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'Void element manifestation, dark energy swirls, cosmic horror aesthetic',
    liked: true,
    animated: false,
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: '6',
    url: '/placeholder.svg?height=512&width=512',
    prompt: 'Crystal dragon soaring through aurora skies, majestic fantasy creature',
    liked: false,
    animated: false,
    timestamp: new Date(Date.now() - 300000),
  },
]

const styles = ['Photorealistic', 'Anime', 'Fantasy Art', 'Abstract', 'Cosmic', 'Oil Painting']
const aspectRatios = [
  { label: '1:1', value: '1:1' },
  { label: '16:9', value: '16:9' },
  { label: '9:16', value: '9:16' },
  { label: '4:3', value: '4:3' },
]

type SubTab = 'create' | 'gallery'

interface AnimationStage {
  id: string
  label: string
  icon: any
  duration: string
  completed: boolean
}

export function ImagineTab() {
  const [subTab, setSubTab] = useState<SubTab>('create')
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Fantasy Art')
  const [selectedRatio, setSelectedRatio] = useState('1:1')
  const [images, setImages] = useState<GeneratedImage[]>(initialImages)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationStages, setAnimationStages] = useState<AnimationStage[]>([
    { id: '1', label: 'Scene Analysis', icon: Search, duration: '3s', completed: false },
    { id: '2', label: 'Motion Planning', icon: Film, duration: '5s', completed: false },
    { id: '3', label: 'Frame Synthesis', icon: Palette, duration: '8s', completed: false },
    { id: '4', label: 'Composition', icon: Layers, duration: '4s', completed: false },
  ])
  const [filter, setFilter] = useState<'all' | 'liked' | 'animated' | 'recent'>('all')

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)

    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: '/placeholder.svg?height=512&width=512',
        prompt,
        liked: false,
        animated: false,
        timestamp: new Date(),
      }
      setImages((prev) => [newImage, ...prev])
      setIsGenerating(false)
      setPrompt('')
    }, 3000)
  }

  const handleLike = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, liked: !img.liked } : img))
    )
  }

  const handleAnimate = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, liked: true } : img))
    )
    setShowAnimation(true)
    
    // Simulate animation pipeline
    const stages = [0, 1, 2, 3]
    stages.forEach((index) => {
      setTimeout(() => {
        setAnimationStages((prev) =>
          prev.map((stage, i) => (i === index ? { ...stage, completed: true } : stage))
        )
      }, index * 2000 + 500)
    })

    setTimeout(() => {
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, animated: true } : img))
      )
      setShowAnimation(false)
      setAnimationStages((prev) => prev.map((stage) => ({ ...stage, completed: false })))
    }, 9000)
  }

  const filteredImages = images.filter((img) => {
    if (filter === 'liked') return img.liked
    if (filter === 'animated') return img.animated
    if (filter === 'recent') return Date.now() - img.timestamp.getTime() < 86400000
    return true
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSubTab('create')}
            className={`px-4 py-2 rounded-lg font-sans font-medium transition-all ${
              subTab === 'create'
                ? 'bg-cosmic-elevated text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Create
          </button>
          <button
            onClick={() => setSubTab('gallery')}
            className={`px-4 py-2 rounded-lg font-sans font-medium transition-all ${
              subTab === 'gallery'
                ? 'bg-cosmic-elevated text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Gallery
          </button>
        </div>
      </header>

      {/* Create Mode */}
      {subTab === 'create' && (
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Prompt Input */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-brand-accent" />
                <h3 className="text-lg font-display text-text-primary">Imagine</h3>
              </div>
              
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="glass-subtle border-white/10 text-text-primary placeholder:text-text-muted h-12 text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleGenerate()
                  }
                }}
              />

              {/* Style Selector */}
              <div>
                <label className="text-sm font-sans font-medium text-text-secondary mb-2 block">Style</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 rounded-lg font-sans text-sm transition-all ${
                        selectedStyle === style
                          ? 'liquid-glass text-text-primary'
                          : 'glass-subtle text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="text-sm font-sans font-medium text-text-secondary mb-2 block">Aspect Ratio</label>
                <div className="flex gap-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.value}
                      onClick={() => setSelectedRatio(ratio.value)}
                      className={`px-4 py-2 rounded-lg font-sans text-sm transition-all ${
                        selectedRatio === ratio.value
                          ? 'liquid-glass text-text-primary'
                          : 'glass-subtle text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full liquid-glass hover:scale-[1.02] transition-all gap-2 h-12"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-sans font-medium">{isGenerating ? 'Generating...' : 'Generate'}</span>
              </Button>
            </div>

            {/* Results Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.slice(0, 6).map((image, index) => (
                <div
                  key={image.id}
                  className="break-inside-avoid animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="glass rounded-xl overflow-hidden group relative hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.prompt}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void/90 via-cosmic-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleLike(image.id)}
                              className={`glass-subtle hover:scale-110 transition-transform ${
                                image.liked ? 'text-brand-gold' : 'text-text-muted'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${image.liked ? 'fill-current' : ''}`} />
                            </Button>
                            <Button size="icon" variant="ghost" className="glass-subtle hover:scale-110 transition-transform text-text-muted">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="glass-subtle hover:scale-110 transition-transform text-text-muted">
                              <Maximize2 className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="glass-subtle hover:scale-110 transition-transform text-text-muted">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div>
                            <p className="text-xs font-sans text-text-secondary line-clamp-2 mb-3">
                              {image.prompt}
                            </p>
                            {!image.animated && (
                              <Button
                                onClick={() => handleAnimate(image.id)}
                                size="sm"
                                className="liquid-glass gap-2 animate-pulse-glow"
                              >
                                <Film className="w-4 h-4" />
                                <span className="text-xs font-sans">Animate</span>
                              </Button>
                            )}
                            {image.animated && (
                              <div className="flex items-center gap-2 text-brand-accent">
                                <Film className="w-4 h-4" />
                                <span className="text-xs font-sans">Animated</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Mode */}
      {subTab === 'gallery' && (
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Filters */}
            <div className="flex gap-2">
              {['all', 'liked', 'animated', 'recent'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as typeof filter)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-all ${
                    filter === f
                      ? 'liquid-glass text-text-primary'
                      : 'glass-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="break-inside-avoid">
                  <div className="glass rounded-xl overflow-hidden group relative hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.prompt}
                        fill
                        className="object-cover"
                      />
                      {image.liked && (
                        <div className="absolute top-2 right-2">
                          <Heart className="w-5 h-5 text-brand-gold fill-current" />
                        </div>
                      )}
                      {image.animated && (
                        <div className="absolute bottom-2 right-2">
                          <Film className="w-5 h-5 text-brand-accent" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animation Pipeline Modal */}
      {showAnimation && (
        <div className="fixed inset-0 bg-cosmic-void/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-scale-in">
          <div className="liquid-glass rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display text-text-primary">MoE Animation Pipeline</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAnimation(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {animationStages.map((stage, index) => {
                const StageIcon = stage.icon
                return (
                  <div key={stage.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            stage.completed
                              ? 'bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 animate-pulse-glow'
                              : 'glass-subtle opacity-50'
                          }`}
                        >
                          <StageIcon className={`w-6 h-6 ${stage.completed ? 'text-brand-accent' : 'text-text-muted'}`} />
                        </div>
                        <div>
                          <p className="font-sans font-medium text-text-primary">{stage.label}</p>
                          <p className="text-sm text-text-muted">{stage.duration}</p>
                        </div>
                      </div>
                      {stage.completed && (
                        <Check className="w-5 h-5 text-brand-accent" />
                      )}
                    </div>
                    <div className="h-2 bg-cosmic-raised rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-brand-accent to-brand-primary transition-all duration-1000 ${
                          stage.completed ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                    {index < animationStages.length - 1 && (
                      <div className="flex justify-center">
                        <div
                          className={`w-0.5 h-4 transition-all ${
                            stage.completed ? 'bg-brand-accent' : 'bg-cosmic-raised'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 glass-subtle rounded-xl p-4 aspect-video flex items-center justify-center">
              <p className="text-text-muted font-sans">Animation preview will appear here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
