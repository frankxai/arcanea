'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  cosmicSlideInLeft,
  cosmicSlideInRight,
  cosmicScale,
  cosmicGlow,
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  scrollRevealScale,
  fadeInViewport,
  heroTitle,
  heroSubtitle,
  heroCTA,
  cardHover,
  floatingOrb,
  springTransition,
  gentleSpring,
  bouncySpring,
} from '@/lib/animations'
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Play,
  RotateCcw,
  Droplets,
  Flame,
  Wind,
  Zap,
  Star,
  Eye,
  Move,
  MousePointer2,
  Timer,
  Waves,
  Activity,
  TrendingUp,
  Orbit,
} from '@/components/icons'
import { cn } from '@/lib/utils'

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
      {/* Mouse-tracking glow */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(127, 255, 212, 0.06), transparent 40%)',
        }}
      />

      {/* Star field */}
      <div className="absolute inset-0 bg-cosmic-stars opacity-50" />

      {/* Floating orbs */}
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-crystal/5 blur-[120px]"
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]"
        style={{ animationDelay: '3s' }}
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-arcane-fire/5 blur-[80px]"
        style={{ animationDelay: '5s' }}
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute bottom-[30%] left-[40%] w-[250px] h-[250px] rounded-full bg-arcane-gold/6 blur-[70px]"
        style={{ animationDelay: '7s' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

// ============================================
// HERO WITH DRAMATIC TITLE ANIMATION
// ============================================

function HeroTitle() {
  const words = [
    { text: 'Animations', delay: 0 },
    { text: '&', delay: 0.2 },
    { text: 'Transitions', delay: 0.4 },
  ]

  return (
    <div className="space-y-2">
      {words.map((word, i) => (
        <motion.div
          key={word.text}
          initial={{ opacity: 0, y: 60, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1.2,
            delay: word.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={cn(
            'font-display tracking-tight leading-none',
            i === 1 ? 'text-fluid-4xl text-arcane-crystal/40' : 'text-fluid-5xl lg:text-fluid-6xl',
            i === 2 ? 'text-gradient-cosmic' : 'text-white'
          )}
        >
          {word.text}
        </motion.div>
      ))}
    </div>
  )
}

function OrbitingElement() {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mx-auto">
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        {/* Ring tracks */}
        <div className="absolute inset-8 rounded-full border border-arcane-crystal/10" />
        <div className="absolute inset-16 rounded-full border border-arcane-crystal/5" />

        {/* Orbital animation elements */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2 w-5 h-5"
            style={{
              transform: `rotate(${angle}deg) translateX(${typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : 175}px) rotate(-${angle}deg)`,
              transformOrigin: '0 0',
            }}
          >
            <div
              className="w-full h-full rounded-full animate-pulse-glow"
              style={{
                backgroundColor: ['#7fffd4', '#ff6b35', '#9966ff'][i],
                boxShadow: `0 0 20px ${['#7fffd4', '#ff6b35', '#9966ff'][i]}60`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-arcane-crystal/20 to-arcane-void/20 border border-arcane-crystal/30 flex items-center justify-center backdrop-blur-sm relative overflow-hidden"
        >
          <Icons.Orbit className="w-12 h-12 sm:w-14 sm:h-14 text-arcane-crystal relative z-10" />
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-arcane-crystal/10 to-transparent animate-pulse-glow" />
        </motion.div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-arcane-crystal/8 blur-[60px] animate-cosmic-pulse" />
      </div>
    </div>
  )
}

// ============================================
// EASING CURVE VISUALIZATION
// ============================================

function EasingCurveVisualizer() {
  const [playing, setPlaying] = useState(false)
  const [selectedEasing, setSelectedEasing] = useState('arcanea')

  const easings = [
    { name: 'Arcanea', value: 'arcanea', bezier: [0.25, 0.46, 0.45, 0.94], color: '#7fffd4', desc: 'Cosmic signature' },
    { name: 'Ease-Out', value: 'ease-out', bezier: [0, 0, 0.58, 1], color: '#78a6ff', desc: 'Decelerate end' },
    { name: 'Ease-In', value: 'ease-in', bezier: [0.42, 0, 1, 1], color: '#ff6b35', desc: 'Accelerate start' },
    { name: 'Linear', value: 'linear', bezier: [0, 0, 1, 1], color: '#9966ff', desc: 'Constant speed' },
  ]

  const currentEasing = easings.find(e => e.value === selectedEasing) || easings[0]

  const replay = useCallback(() => {
    setPlaying(true)
    setTimeout(() => setPlaying(false), 1200)
  }, [])

  return (
    <motion.section {...fadeInViewport} variants={scrollReveal}>
      <div className="glass rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Activity className="w-6 h-6 text-arcane-crystal" />
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Easing Curves</h2>
              <p className="text-sm text-text-muted font-sans">
                The Arcanea cubic-bezier: [0.25, 0.46, 0.45, 0.94]
              </p>
            </div>
          </div>
          <button
            onClick={replay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-arcane-crystal/10 text-arcane-crystal text-sm font-sans hover:bg-arcane-crystal/20 transition-colors"
          >
            <Icons.Play className="w-4 h-4" /> Play
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Curve visualization */}
          <div className="space-y-4">
            <div className="aspect-square bg-cosmic-void/50 rounded-2xl border border-white/5 relative overflow-hidden p-4">
              {/* Grid */}
              <div className="absolute inset-4 opacity-10">
                {[...Array(5)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute left-0 right-0 border-b border-arcane-crystal" style={{ top: `${i * 25}%` }} />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute top-0 bottom-0 border-r border-arcane-crystal" style={{ left: `${i * 25}%` }} />
                ))}
              </div>

              {/* Curve path (simplified visualization) */}
              <svg className="absolute inset-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={currentEasing.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={currentEasing.color} stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 100 C ${currentEasing.bezier[0] * 100} ${100 - currentEasing.bezier[1] * 100}, ${currentEasing.bezier[2] * 100} ${100 - currentEasing.bezier[3] * 100}, 100 0`}
                  fill="none"
                  stroke="url(#curveGradient)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated dot on curve */}
                <motion.circle
                  cx="0"
                  cy="100"
                  r="4"
                  fill={currentEasing.color}
                  animate={playing ? {
                    cx: [0, 100],
                    cy: [100, 0],
                  } : {}}
                  transition={{
                    duration: 1.2,
                    ease: currentEasing.bezier as [number, number, number, number],
                  }}
                />
              </svg>

              {/* Labels */}
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-muted">0</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-text-muted">1</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {easings.map((easing) => (
                <button
                  key={easing.value}
                  onClick={() => setSelectedEasing(easing.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-sans transition-all',
                    selectedEasing === easing.value
                      ? 'bg-arcane-crystal/20 text-arcane-crystal border border-arcane-crystal/30'
                      : 'bg-white/5 text-text-secondary hover:text-white border border-transparent'
                  )}
                >
                  {easing.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Comparison bars */}
          <div className="space-y-3">
            <p className="text-sm font-body text-text-secondary mb-4">
              Compare easing curves in real-time. The Arcanea curve provides smooth, natural motion that feels intentional.
            </p>
            {easings.map((easing) => (
              <div key={easing.value} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans text-white">{easing.name}</span>
                  <span className="text-[10px] font-mono text-text-muted">{easing.desc}</span>
                </div>
                <div className="h-12 bg-cosmic-void/50 rounded-xl relative overflow-hidden border border-white/5">
                  <motion.div
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${easing.color}20`,
                      border: `1px solid ${easing.color}40`,
                    }}
                    animate={playing ? { x: [0, 200] } : {}}
                    transition={{
                      duration: 1.2,
                      ease: easing.bezier as [number, number, number, number],
                    }}
                  >
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: easing.color }} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <span>cubic-bezier({currentEasing.bezier.join(', ')})</span>
        </div>
      </div>
    </motion.section>
  )
}

// ============================================
// INTERACTIVE SPRING PHYSICS
// ============================================

function SpringPhysicsPlayground() {
  const [dragPositions, setDragPositions] = useState({ spring: { x: 0, y: 0 }, gentle: { x: 0, y: 0 }, bouncy: { x: 0, y: 0 } })

  const springs = [
    { name: 'Spring', key: 'spring' as const, config: springTransition, desc: 'stiffness: 260, damping: 20', color: '#7fffd4' },
    { name: 'Gentle', key: 'gentle' as const, config: gentleSpring, desc: 'stiffness: 120, damping: 14', color: '#78a6ff' },
    { name: 'Bouncy', key: 'bouncy' as const, config: bouncySpring, desc: 'stiffness: 400, damping: 10', color: '#ff6b35' },
  ]

  return (
    <motion.section {...fadeInViewport} variants={scrollReveal}>
      <div className="glass rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Icons.Zap className="w-6 h-6 text-arcane-gold" />
          <div>
            <h2 className="text-fluid-2xl font-display text-white">Spring Physics</h2>
            <p className="text-sm text-text-muted font-sans">
              Drag each ball and release to see different spring behaviors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {springs.map((spring) => (
            <div key={spring.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-sans text-white">{spring.name}</span>
              </div>
              <div className="h-56 bg-cosmic-void/50 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                <motion.div
                  drag
                  dragElastic={0.2}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragTransition={spring.config}
                  onDragEnd={(_, info) => {
                    setDragPositions(prev => ({ ...prev, [spring.key]: { x: 0, y: 0 } }))
                  }}
                  className="w-16 h-16 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center relative"
                  style={{
                    backgroundColor: `${spring.color}30`,
                    border: `2px solid ${spring.color}60`,
                    boxShadow: `0 0 30px ${spring.color}40`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icons.Move className="w-6 h-6" style={{ color: spring.color }} />
                </motion.div>
              </div>
              <p className="text-[10px] font-mono text-text-muted text-center">{spring.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// ============================================
// ANIMATION DEMO CARD
// ============================================

function AnimationDemoCard({
  title,
  animationClass,
  token,
  category,
  description,
}: {
  title: string
  animationClass: string
  token: string
  category: string
  description: string
}) {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const replay = useCallback(() => {
    setPlaying(false)
    setKey((k) => k + 1)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlaying(true)
      })
    })
  }, [])

  const categoryColors: Record<string, string> = {
    Cosmic: 'text-arcane-crystal',
    Water: 'text-arcane-water',
    Fire: 'text-arcane-fire',
    Creation: 'text-arcane-gold',
    UI: 'text-arcane-void-bright',
    Special: 'text-arcane-wind',
  }

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-arcane-crystal/20 transition-all">
      {/* Demo area - LARGER */}
      <div className="h-56 bg-cosmic-void/50 relative flex items-center justify-center overflow-hidden border-b border-white/5">
        <div
          key={key}
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-arcane-crystal/30 to-arcane-void/30 border-2 border-arcane-crystal/20 flex items-center justify-center shadow-glow-sm ${
            playing ? `animate-${animationClass}` : ''
          }`}
          style={playing ? { animationFillMode: 'both' } : {}}
        >
          <Icons.Sparkles className="w-10 h-10 text-arcane-crystal" />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-medium text-white text-base">{title}</h4>
          <span className={`text-[10px] font-mono ${categoryColors[category] || 'text-text-muted'}`}>
            {category}
          </span>
        </div>
        <p className="text-sm text-text-muted font-body leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-arcane-crystal/50">.animate-{token}</span>
          <button
            onClick={replay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-arcane-crystal/10 text-arcane-crystal text-xs font-sans hover:bg-arcane-crystal/20 transition-colors"
          >
            <Icons.Play className="w-3 h-3" /> Play
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// FRAMER MOTION DEMO
// ============================================

function FramerVariantDemo({
  title,
  variant,
  token,
  description,
}: {
  title: string
  variant: Record<string, any>
  token: string
  description: string
}) {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(true)

  const replay = useCallback(async () => {
    setIsVisible(false)
    await controls.start('hidden')
    requestAnimationFrame(() => {
      setIsVisible(true)
      controls.start('visible')
    })
  }, [controls])

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="h-56 bg-cosmic-void/50 relative flex items-center justify-center overflow-hidden border-b border-white/5">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial="hidden"
              animate={controls}
              variants={variant}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-arcane-void/30 to-arcane-water/30 border-2 border-arcane-void/20 flex items-center justify-center shadow-glow-sm"
            >
              <Icons.Star className="w-10 h-10 text-arcane-void-bright" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5 space-y-2">
        <h4 className="font-sans font-medium text-white text-base">{title}</h4>
        <p className="text-sm text-text-muted font-body leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-arcane-void-bright/50">{token}</span>
          <button
            onClick={replay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-arcane-void/10 text-arcane-void-bright text-xs font-sans hover:bg-arcane-void/20 transition-colors"
          >
            <Icons.RotateCcw className="w-3 h-3" /> Replay
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SCROLL-TRIGGERED SHOWCASE
// ============================================

function ScrollTriggeredShowcase() {
  const directions = [
    { variant: scrollRevealLeft, label: 'From Left', icon: ArrowRight, color: 'arcane-crystal' },
    { variant: scrollReveal, label: 'From Bottom', icon: TrendingUp, color: 'arcane-water' },
    { variant: scrollRevealRight, label: 'From Right', icon: ArrowLeft, color: 'arcane-fire' },
    { variant: scrollRevealScale, label: 'Scale Up', icon: Orbit, color: 'arcane-void' },
  ]

  return (
    <section className="space-y-6">
      <div className="text-center">
        <Badge variant="void" className="mb-4">
          <Icons.Eye className="w-3 h-3 mr-1.5" />
          VIEWPORT-TRIGGERED
        </Badge>
        <h2 className="text-fluid-3xl font-display text-white mb-3">
          Scroll Reveals
        </h2>
        <p className="text-base text-text-secondary font-body max-w-2xl mx-auto">
          Elements animate into view as you scroll. Different directions create visual flow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {directions.map((dir) => {
          const Icon = dir.icon
          return (
            <motion.div
              key={dir.label}
              {...fadeInViewport}
              variants={dir.variant}
              className="glass rounded-2xl p-6 text-center space-y-3"
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{
                  backgroundColor: `var(--${dir.color})10`,
                  border: `1px solid var(--${dir.color})20`,
                }}
              >
                <Icon className="w-8 h-8" style={{ color: `var(--${dir.color})` }} />
              </div>
              <h3 className="text-base font-display text-white">{dir.label}</h3>
              <p className="text-xs font-mono text-text-muted">{dir.variant === scrollRevealScale ? 'scale: 0.85 → 1' : 'x/y: 80px → 0'}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// ============================================
// CSS ANIMATION DATA
// ============================================

const cssAnimations = [
  // Cosmic
  { title: 'Pulse Glow', animationClass: 'pulse-glow', token: 'pulse-glow', category: 'Cosmic', description: 'Box-shadow breathing effect for mystical emphasis' },
  { title: 'Shimmer', animationClass: 'shimmer', token: 'shimmer', category: 'Cosmic', description: 'Background position sweep creates light reflection' },
  { title: 'Float', animationClass: 'float', token: 'float', category: 'Cosmic', description: 'Gentle vertical hover motion for ambient elements' },
  { title: 'Rotate Slow', animationClass: 'rotate-slow', token: 'rotate-slow', category: 'Cosmic', description: 'Smooth 20-second full rotation cycle' },
  { title: 'Energy Flow', animationClass: 'energy-flow', token: 'energy-flow', category: 'Cosmic', description: 'Infinite background position cycling' },
  { title: 'Cosmic Pulse', animationClass: 'cosmic-pulse', token: 'cosmic-pulse', category: 'Cosmic', description: 'Combined scale and opacity breathing' },
  // Water
  { title: 'Water Flow', animationClass: 'water-flow', token: 'water-flow', category: 'Water', description: 'Fluid X/Y drift mimicking liquid motion' },
  { title: 'Wave', animationClass: 'wave', token: 'wave', category: 'Water', description: 'Undulating tilt and sway like ocean waves' },
  { title: 'Ripple', animationClass: 'ripple', token: 'ripple', category: 'Water', description: 'Expanding scale out with opacity fade' },
  // Fire
  { title: 'Fire Flicker', animationClass: 'fire-flicker', token: 'fire-flicker', category: 'Fire', description: 'Rapid opacity and scaleY pulse like flames' },
  { title: 'Flame', animationClass: 'flame', token: 'flame', category: 'Fire', description: 'Rising motion that dissolves at peak' },
  { title: 'Ember', animationClass: 'ember', token: 'ember', category: 'Fire', description: 'Float upward with gentle rotation' },
  // Creation
  { title: 'Prism Rotate', animationClass: 'prism-rotate', token: 'prism-rotate', category: 'Creation', description: 'Complete hue rotation cycle through spectrum' },
  { title: 'Radial Pulse', animationClass: 'radial-pulse', token: 'radial-pulse', category: 'Creation', description: 'Expanding ring shadow emanation' },
  // UI
  { title: 'Fade In', animationClass: 'fade-in', token: 'fade-in', category: 'UI', description: 'Simple opacity transition from 0 to 1' },
  { title: 'Fade In Up', animationClass: 'fade-in-up', token: 'fade-in-up', category: 'UI', description: 'Opacity with 30px upward translate' },
  { title: 'Fade In Left', animationClass: 'fade-in-left', token: 'fade-in-left', category: 'UI', description: 'Opacity with 30px left translate' },
  { title: 'Scale In', animationClass: 'scale-in', token: 'scale-in', category: 'UI', description: 'Scale transformation from 0.9 to 1' },
  // Special
  { title: 'Glow Breathe', animationClass: 'glow-breathe', token: 'glow-breathe', category: 'Special', description: 'Box-shadow intensity cycling for aura effects' },
  { title: 'Text Shimmer', animationClass: 'text-shimmer', token: 'text-shimmer', category: 'Special', description: 'Background gradient position sweep for text' },
  { title: 'Border Glow', animationClass: 'border-glow', token: 'border-glow', category: 'Special', description: 'Border color pulsing between states' },
]

const framerVariants = [
  { title: 'Cosmic Fade In', variant: cosmicFadeIn, token: 'cosmicFadeIn', description: 'Opacity with 30px Y translate, signature timing' },
  { title: 'Cosmic Fade In Up', variant: cosmicFadeInUp, token: 'cosmicFadeInUp', description: 'Deeper 60px Y translate for dramatic entrance' },
  { title: 'Slide In Left', variant: cosmicSlideInLeft, token: 'cosmicSlideInLeft', description: 'Horizontal entrance from -60px X offset' },
  { title: 'Slide In Right', variant: cosmicSlideInRight, token: 'cosmicSlideInRight', description: 'Horizontal entrance from +60px X offset' },
  { title: 'Cosmic Scale', variant: cosmicScale, token: 'cosmicScale', description: 'Scale from 0.8 with opacity fade in' },
  { title: 'Cosmic Glow', variant: cosmicGlow, token: 'cosmicGlow', description: 'Blur(10px) to sharp focus reveal effect' },
  { title: 'Scroll Reveal', variant: scrollReveal, token: 'scrollReveal', description: 'Viewport-triggered fade up from 50px' },
  { title: 'Scroll Left', variant: scrollRevealLeft, token: 'scrollRevealLeft', description: 'Viewport entrance from -80px left' },
  { title: 'Scroll Right', variant: scrollRevealRight, token: 'scrollRevealRight', description: 'Viewport entrance from +80px right' },
  { title: 'Scroll Scale', variant: scrollRevealScale, token: 'scrollRevealScale', description: 'Viewport scale from 0.85 with fade' },
]

// ============================================
// PAGE
// ============================================

export default function DesignLabV3() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96])

  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Cosmic', 'Water', 'Fire', 'Creation', 'UI', 'Special']
  const filteredAnimations = activeCategory === 'All'
    ? cssAnimations
    : cssAnimations.filter((a) => a.category === activeCategory)

  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      <LabCosmicBackground />

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  variants={heroTitle}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <Badge
                    variant="void"
                    className="text-xs px-4 py-1.5 glass border-arcane-void/30 text-arcane-void-bright font-sans tracking-[0.2em]"
                  >
                    <Icons.Sparkles className="w-3 h-3 mr-2" />
                    V3 — MOTION
                  </Badge>
                </motion.div>

                <HeroTitle />

                <motion.p
                  variants={heroSubtitle}
                  initial="hidden"
                  animate="visible"
                  className="text-fluid-lg font-body text-text-secondary mb-8 leading-relaxed max-w-xl mt-6"
                >
                  40+ CSS keyframes, 30+ Framer Motion variants, and spring physics.
                  Every animation is intentional, elemental, and tuned to the cosmic aesthetic.
                </motion.p>

                <motion.div
                  variants={heroCTA}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-3"
                >
                  <Link href="/design-lab/v2">
                    <Button variant="ghost" className="glass border-arcane-crystal/20 text-text-secondary hover:text-white font-sans rounded-2xl px-6">
                      <Icons.ArrowLeft className="w-4 h-4 mr-2" />
                      V2: Components
                    </Button>
                  </Link>
                  <Link href="/design-lab/v4">
                    <Button className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold rounded-2xl px-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                      V4: Effects
                      <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right: Orbiting Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:block"
              >
                <OrbitingElement />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Content sections with proper spacing */}
        <div className="px-4 sm:px-6 lg:px-8 space-y-32 pb-24">
          {/* ===== EASING CURVES ===== */}
          <EasingCurveVisualizer />

          <div className="section-divider" />

          {/* ===== SPRING PHYSICS ===== */}
          <SpringPhysicsPlayground />

          <div className="section-divider" />

          {/* ===== SCROLL REVEALS ===== */}
          <ScrollTriggeredShowcase />

          <div className="section-divider" />

          {/* ===== CSS ANIMATIONS ===== */}
          <motion.section {...fadeInViewport} variants={scrollReveal}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-arcane-crystal/10 flex items-center justify-center">
                  <Icons.Timer className="w-5 h-5 text-arcane-crystal" />
                </div>
                <div>
                  <h2 className="text-fluid-3xl font-display text-white">CSS Animations</h2>
                  <p className="text-base font-sans text-text-muted">
                    Tailwind config keyframes. Click Play to trigger each animation.
                  </p>
                </div>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-sans transition-all',
                      activeCategory === cat
                        ? 'bg-arcane-crystal/20 text-arcane-crystal border border-arcane-crystal/30'
                        : 'bg-white/5 text-text-secondary hover:text-white border border-transparent hover:border-white/10'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimations.map((anim) => (
                  <AnimationDemoCard key={anim.token} {...anim} />
                ))}
              </div>
            </div>
          </motion.section>

          <div className="section-divider" />

          {/* ===== FRAMER MOTION VARIANTS ===== */}
          <motion.section {...fadeInViewport} variants={scrollReveal}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-arcane-void/10 flex items-center justify-center">
                  <Icons.Zap className="w-5 h-5 text-arcane-void-bright" />
                </div>
                <div>
                  <h2 className="text-fluid-3xl font-display text-white">Framer Motion Variants</h2>
                  <p className="text-base font-sans text-text-muted">
                    Import from <span className="font-mono text-arcane-crystal/70">@/lib/animations</span>. Click Replay to trigger.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {framerVariants.map((item) => (
                  <FramerVariantDemo key={item.token} {...item} />
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
