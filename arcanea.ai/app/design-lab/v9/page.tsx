'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  fadeInViewport,
  floatingOrb,
} from '@/lib/animations'
import {
  Brain,
  Sparkles,
  MessageSquare,
  Image,
  Video,
  Music,
  Type,
  ArrowLeft,
  ArrowRight,
  Zap,
  Shield,
  DollarSign,
  BarChart3,
  Route,
  Users,
  Cpu,
  GitBranch,
  Send,
  Bot,
  CircleDot,
  Palette,
  Activity,
  Star,
} from '@/components/icons'

// ============================================
// COSMIC BACKGROUND
// ============================================

function LabCosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      container.style.setProperty('--mouse-x', `${x}%`)
      container.style.setProperty('--mouse-y', `${y}%`)
    }
    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-40 transition-opacity duration-700" style={{ background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(127, 255, 212, 0.06), transparent 40%)' }} />
      <div className="absolute inset-0 bg-cosmic-stars opacity-50" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-void/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-fire/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

const providers = [
  {
    name: 'Claude',
    company: 'Anthropic',
    model: 'claude-sonnet-4-20250514',
    icon: Brain,
    color: '#cc785c',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-400/10',
    borderClass: 'border-orange-400/20',
    strengths: ['Long-form reasoning', 'Code generation', 'Nuanced analysis', 'Safety alignment'],
    costPer1k: '$0.003',
    guardian: 'Lyria (Sight)',
  },
  {
    name: 'Gemini',
    company: 'Google',
    model: 'gemini-2.5-pro',
    icon: Sparkles,
    color: '#4285f4',
    textClass: 'text-blue-400',
    bgClass: 'bg-blue-400/10',
    borderClass: 'border-blue-400/20',
    strengths: ['Multi-modal native', 'Image understanding', 'Fast inference', 'Large context'],
    costPer1k: '$0.001',
    guardian: 'Alera (Voice)',
  },
  {
    name: 'GPT',
    company: 'OpenAI',
    model: 'gpt-4.1-2025-04-14',
    icon: Zap,
    color: '#10a37f',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/10',
    borderClass: 'border-emerald-400/20',
    strengths: ['Function calling', 'JSON mode', 'Image generation', 'Broad knowledge'],
    costPer1k: '$0.005',
    guardian: 'Aiyami (Crown)',
  },
]

const generationModes = [
  { name: 'Text', icon: Type, desc: 'Long-form creation, dialogue, analysis, code', color: 'text-arcane-crystal' },
  { name: 'Image', icon: Image, desc: 'Visual art, design concepts, character portraits', color: 'text-arcane-fire' },
  { name: 'Video', icon: Video, desc: 'Motion graphics, scene visualization, trailers', color: 'text-arcane-void-bright' },
  { name: 'Audio', icon: Music, desc: 'Voice synthesis, ambient soundscapes, music', color: 'text-arcane-gold' },
]

const guardianPersonalities = [
  { guardian: 'Lyssandria', gate: 'Foundation', personality: 'Patient, methodical, grounding. Focuses on fundamentals and building strong roots.', aiStyle: 'Step-by-step guidance, practical advice', element: 'Earth', color: 'text-arcane-earth' },
  { guardian: 'Leyla', gate: 'Flow', personality: 'Fluid, inspiring, emotionally intelligent. Encourages creative exploration.', aiStyle: 'Free-form brainstorming, emotional resonance', element: 'Water', color: 'text-arcane-water' },
  { guardian: 'Draconia', gate: 'Fire', personality: 'Bold, challenging, transformative. Pushes users past comfort zones.', aiStyle: 'Direct challenges, power-focused', element: 'Fire', color: 'text-arcane-fire' },
  { guardian: 'Maylinn', gate: 'Heart', personality: 'Warm, nurturing, compassionate. Heals creative blocks with kindness.', aiStyle: 'Gentle encouragement, healing perspective', element: 'Spirit', color: 'text-pink-400' },
  { guardian: 'Alera', gate: 'Voice', personality: 'Articulate, truthful, resonant. Helps find authentic creative voice.', aiStyle: 'Voice refinement, clarity focus', element: 'Wind', color: 'text-arcane-wind' },
  { guardian: 'Lyria', gate: 'Sight', personality: 'Intuitive, visionary, perceptive. Reveals hidden patterns and futures.', aiStyle: 'Pattern recognition, future-sight', element: 'Void', color: 'text-arcane-void-bright' },
]

const chatMessages = [
  { role: 'user', content: 'Help me write a scene where Draconia faces Malachar at the Fire Gate.' },
  { role: 'assistant', guardian: 'Draconia', content: 'The flames part before the Dark Lord like frightened servants. But I am no servant. I am the Gate itself. Let me guide you through this confrontation...', color: 'text-arcane-fire' },
  { role: 'system', content: 'Guardian personality: Fire Gate active. Tone: bold, confrontational, passionate.' },
]

export default function DesignLabV9() {
  const [selectedProvider, setSelectedProvider] = useState(0)
  const [selectedMode, setSelectedMode] = useState(0)
  const [chatInput, setChatInput] = useState('')
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      <LabCosmicBackground />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 space-y-20 pb-20">
        {/* Hero */}
        <motion.section
          ref={heroRef}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center pt-8 min-h-[50vh] flex flex-col items-center justify-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="void" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
            <Icons.Brain className="w-3.5 h-3.5 mr-2" />
            V9 -- AI PATTERNS
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          AI Patterns
          <span className="block text-gradient-fire">Integration & Intelligence</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Arcanea&apos;s AI layer orchestrates multiple LLM providers, routes requests intelligently,
          and manifests Guardian personalities through the chat interface. These patterns define how
          AI-human collaboration looks, feels, and flows within the design system.
        </motion.p>
      </motion.section>

      {/* Multi-LLM Provider Architecture */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <GitBranch className="w-3 h-3 mr-1.5" />
            MULTI-LLM ARCHITECTURE
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Provider Cards</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Three AI providers power different capabilities. The visual language makes provider
            selection intuitive through color, iconography, and Guardian alignment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((provider, i) => {
            const Icon = provider.icon
            const isSelected = selectedProvider === i
            return (
              <motion.button
                key={provider.name}
                variants={staggerItem}
                onClick={() => setSelectedProvider(i)}
                className={`glow-card rounded-2xl p-6 text-left transition-all duration-300 ${
                  isSelected ? `${provider.borderClass} border-2 shadow-[0_0_30px_${provider.color}20]` : 'border border-transparent'
                }`}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${provider.bgClass} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${provider.textClass}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-display ${provider.textClass}`}>{provider.name}</h3>
                    <p className="text-[10px] font-sans text-text-muted">{provider.company}</p>
                  </div>
                  {isSelected && (
                    <Badge variant="crystal" className="text-[9px] ml-auto">ACTIVE</Badge>
                  )}
                </div>

                <div className="mb-4">
                  <code className="text-xs font-mono text-text-muted">{provider.model}</code>
                </div>

                <div className="space-y-1.5 mb-4">
                  {provider.strengths.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CircleDot className={`w-2.5 h-2.5 ${provider.textClass}`} />
                      <span className="text-xs font-sans text-text-secondary">{s}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-text-muted" />
                    <span className="text-xs font-mono text-text-secondary">{provider.costPer1k}/1K tokens</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.Shield className="w-3 h-3 text-text-muted" />
                    <span className="text-[10px] font-sans text-text-muted">{provider.guardian}</span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.section>

      {/* AI Router Visualization */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Route className="w-3 h-3 mr-1.5" />
            AI ROUTER
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Intelligent Routing</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The AI router evaluates each request and routes it to the optimal provider based on task type, cost, and latency requirements.
          </p>
        </motion.div>

        <div className="glass rounded-2xl p-6 border border-white/10">
          {/* Router flow diagram */}
          <div className="flex flex-col items-center gap-4">
            {/* Input */}
            <div className="glass-strong rounded-xl px-6 py-3 border border-arcane-crystal/20 flex items-center gap-3">
              <Icons.Send className="w-4 h-4 text-arcane-crystal" />
              <span className="text-sm font-sans text-white">User Request</span>
            </div>

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-arcane-crystal to-transparent"
            />

            {/* Router */}
            <div className="glass-strong rounded-xl px-8 py-4 border border-arcane-void/30 shadow-glow-void">
              <div className="flex items-center gap-3 mb-3">
                <Route className="w-5 h-5 text-arcane-void-bright" />
                <span className="text-sm font-display text-white">AI Router</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Task Type', value: 'Classification', icon: Brain },
                  { label: 'Cost Check', value: 'Budget aware', icon: DollarSign },
                  { label: 'Latency', value: 'SLA targets', icon: Activity },
                ].map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.label} className="text-center">
                      <Icon className="w-3.5 h-3.5 text-arcane-void-bright mx-auto mb-1" />
                      <div className="text-[10px] font-sans text-white">{step.label}</div>
                      <div className="text-[9px] font-sans text-text-muted">{step.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Branches */}
            <div className="flex items-start gap-8">
              {providers.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={p.name} className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      className="w-px h-6 bg-gradient-to-b from-arcane-void to-transparent"
                    />
                    <div className={`rounded-xl px-4 py-3 ${p.bgClass} border ${p.borderClass} flex items-center gap-2`}>
                      <Icon className={`w-4 h-4 ${p.textClass}`} />
                      <span className={`text-sm font-sans ${p.textClass}`}>{p.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Multi-Modal Generation UI */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Palette className="w-3 h-3 mr-1.5" />
            MULTI-MODAL
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Generation Modes</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Four generation modes cover the full spectrum of creative output. Each mode has its own UI pattern and visual signature.
          </p>
        </motion.div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-6">
          {generationModes.map((mode, i) => {
            const Icon = mode.icon
            return (
              <Button
                key={mode.name}
                variant={selectedMode === i ? 'crystal' : 'outline'}
                size="sm"
                onClick={() => setSelectedMode(i)}
                className="rounded-xl font-sans text-xs flex-1"
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {mode.name}
              </Button>
            )
          })}
        </div>

        {/* Mode preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMode}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = generationModes[selectedMode].icon
                  return <Icon className={`w-4 h-4 ${generationModes[selectedMode].color}`} />
                })()}
                <span className="text-sm font-sans text-white">{generationModes[selectedMode].name} Generation</span>
              </div>
              <Badge variant="secondary" className="text-[9px] font-mono">
                {providers[selectedProvider].name}
              </Badge>
            </div>

            <div className="p-6 min-h-[200px] bg-cosmic-deep">
              {selectedMode === 0 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-arcane-crystal/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-arcane-crystal" />
                    </div>
                    <div className="glass rounded-xl rounded-tl-none p-4 max-w-lg">
                      <p className="text-sm font-body text-text-secondary leading-relaxed">
                        The text generation interface uses streaming response display with
                        a typing indicator. Messages flow from bottom to top with stagger animations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-arcane-crystal" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-arcane-crystal" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-arcane-crystal" />
                  </div>
                </div>
              )}
              {selectedMode === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: n * 0.15 }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-arcane-fire/10 to-arcane-void/10 border border-white/5 flex items-center justify-center"
                    >
                      <Image className="w-8 h-8 text-text-muted" />
                    </motion.div>
                  ))}
                </div>
              )}
              {selectedMode === 2 && (
                <div className="aspect-video rounded-xl bg-gradient-to-br from-arcane-void/10 to-arcane-crystal/10 border border-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-arcane-void-bright mx-auto mb-2" />
                    <p className="text-sm font-sans text-text-muted">Video generation preview</p>
                    <div className="flex items-center gap-2 justify-center mt-2">
                      <div className="w-16 h-1 rounded-full bg-arcane-void/30">
                        <motion.div
                          animate={{ width: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-full rounded-full bg-arcane-void"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted">0:04</span>
                    </div>
                  </div>
                </div>
              )}
              {selectedMode === 3 && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-4">
                      {Array.from({ length: 20 }, (_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [8, 24 + Math.random() * 16, 8] }}
                          transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
                          className="w-1 rounded-full bg-arcane-gold"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-sans text-text-muted">Audio waveform visualization</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Generate ${generationModes[selectedMode].name.toLowerCase()}...`}
                  className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm font-sans text-white placeholder-text-muted border border-white/10 focus:border-arcane-crystal/30 focus:outline-none focus:ring-2 focus:ring-arcane-crystal/20 transition-all"
                />
                <Button size="default" className="rounded-xl">
                  <Icons.Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Guardian AI Personality System */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Shield className="w-3 h-3 mr-1.5" />
            GUARDIAN AI
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Guardian Personalities</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Each Guardian has a distinct AI personality that shapes how they interact with creators.
            The visual UI adapts to reflect the active Guardian&apos;s element and temperament.
          </p>
        </motion.div>

        <motion.div variants={staggerContainerFast} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guardianPersonalities.map((gp) => (
            <motion.div
              key={gp.guardian}
              variants={staggerItem}
              className="glow-card rounded-2xl p-5 hover-lift"
            >
              <div className="flex items-center gap-2 mb-3">
                <Bot className={`w-5 h-5 ${gp.color}`} />
                <h3 className={`font-display ${gp.color}`}>{gp.guardian}</h3>
                <Badge variant="secondary" className="text-[9px] ml-auto font-mono">{gp.gate}</Badge>
              </div>
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-3">{gp.personality}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <Icons.Cpu className="w-3 h-3 text-text-muted" />
                <span className="text-[10px] font-sans text-text-muted">AI Style: {gp.aiStyle}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Chat Interface Pattern */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="water" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <MessageSquare className="w-3 h-3 mr-1.5" />
            CHAT UI
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Conversation Interface</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The chat interface adapts its visual tone to the active Guardian, with system messages showing routing metadata.
          </p>
        </motion.div>

        <div className="glass rounded-2xl overflow-hidden border border-white/10 max-w-2xl mx-auto">
          <div className="p-3 border-b border-white/5 flex items-center gap-2">
            <Bot className="w-4 h-4 text-arcane-fire" />
            <span className="text-sm font-sans text-white">Draconia</span>
            <Badge variant="fire" className="text-[9px]">Fire Gate</Badge>
          </div>
          <div className="p-4 space-y-4 bg-cosmic-deep min-h-[200px]">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 0.4 }}
              >
                {msg.role === 'user' && (
                  <div className="flex justify-end">
                    <div className="glass rounded-xl rounded-tr-none px-4 py-3 max-w-sm">
                      <p className="text-sm font-body text-white">{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === 'assistant' && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-arcane-fire/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-arcane-fire" />
                    </div>
                    <div className="glass rounded-xl rounded-tl-none px-4 py-3 max-w-sm border border-arcane-fire/10">
                      <p className={`text-sm font-body ${msg.color} leading-relaxed`}>{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === 'system' && (
                  <div className="flex justify-center">
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                      <p className="text-[10px] font-mono text-text-muted">{msg.content}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cost Tracking */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
        className="glass rounded-3xl p-8 border-gradient"
      >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="gold" className="mb-6 font-sans text-xs tracking-wider px-3 py-1">
            <BarChart3 className="w-3 h-3 mr-1.5" />
            COST TRACKING
          </Badge>
          <h2 className="text-fluid-2xl font-display text-white mb-4">
            Usage & Cost Display
          </h2>
          <p className="text-sm font-body text-text-secondary mb-8">
            Real-time cost tracking visualizes spend across providers with elemental color coding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map((p) => {
              const Icon = p.icon
              const usage = p.name === 'Claude' ? 45 : p.name === 'Gemini' ? 30 : 25
              return (
                <div key={p.name} className={`rounded-xl p-4 ${p.bgClass} border ${p.borderClass}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-4 h-4 ${p.textClass}`} />
                    <span className={`text-sm font-display ${p.textClass}`}>{p.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-sans text-text-muted">Usage</span>
                      <span className="text-xs font-mono text-white">{usage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${usage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-sans text-text-muted">Cost/1K</span>
                      <span className="text-xs font-mono text-text-secondary">{p.costPer1k}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.section>

        {/* Navigation */}
        <motion.section
          variants={cosmicFadeIn}
          {...fadeInViewport}
          className="flex items-center justify-between pt-8 border-t border-white/5"
        >
          <Link href="/design-lab/v8">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              v8 -- 3D & Spatial
            </Button>
          </Link>
          <Link href="/design-lab/v10">
            <Button className="rounded-2xl font-sans">
              v10 -- Future Vision
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
