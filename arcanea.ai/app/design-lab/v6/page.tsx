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
  Shield,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Sparkles,
  Eye,
  Crown,
  Shuffle,
  Users,
  Sun,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Zap,
  Music,
  Heart,
  Waves,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-gold/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

const guardians = [
  {
    gate: 'Foundation',
    frequency: 396,
    guardian: 'Lyssandria',
    godbeast: 'Kaelith',
    element: 'Earth',
    domain: 'Earth, survival, grounding',
    icon: Mountain,
    primaryColor: '#8b7355',
    brightColor: '#a0845c',
    deepColor: '#6b5640',
    glowColor: 'rgba(139, 115, 85, 0.4)',
    bgClass: 'bg-arcane-earth',
    textClass: 'text-arcane-earth',
    badgeVariant: 'earth' as const,
    gradientFrom: 'from-arcane-earth',
    gradientTo: 'to-amber-700',
    shadowClass: 'shadow-[0_0_30px_rgba(139,115,85,0.3)]',
    tokens: {
      surface: 'bg-arcane-earth/10',
      border: 'border-arcane-earth/20',
      text: 'text-arcane-earth',
      glow: 'shadow-[0_0_20px_rgba(139,115,85,0.3)]',
      ring: 'ring-arcane-earth/50',
    },
    animationDuration: '2.53s', // 1000/396
  },
  {
    gate: 'Flow',
    frequency: 417,
    guardian: 'Leyla',
    godbeast: 'Veloura',
    element: 'Water',
    domain: 'Creativity, emotion, flow',
    icon: Droplets,
    primaryColor: '#78a6ff',
    brightColor: '#93bbff',
    deepColor: '#5b8de0',
    glowColor: 'rgba(120, 166, 255, 0.4)',
    bgClass: 'bg-arcane-water',
    textClass: 'text-arcane-water',
    badgeVariant: 'water' as const,
    gradientFrom: 'from-arcane-water',
    gradientTo: 'to-blue-600',
    shadowClass: 'shadow-[0_0_30px_rgba(120,166,255,0.3)]',
    tokens: {
      surface: 'bg-arcane-water/10',
      border: 'border-arcane-water/20',
      text: 'text-arcane-water',
      glow: 'shadow-[0_0_20px_rgba(120,166,255,0.3)]',
      ring: 'ring-arcane-water/50',
    },
    animationDuration: '2.40s',
  },
  {
    gate: 'Fire',
    frequency: 528,
    guardian: 'Draconia',
    godbeast: 'Draconis',
    element: 'Fire',
    domain: 'Power, will, transformation',
    icon: Flame,
    primaryColor: '#ff6b35',
    brightColor: '#ff8f66',
    deepColor: '#cc4a1a',
    glowColor: 'rgba(255, 107, 53, 0.4)',
    bgClass: 'bg-arcane-fire',
    textClass: 'text-arcane-fire',
    badgeVariant: 'fire' as const,
    gradientFrom: 'from-arcane-fire',
    gradientTo: 'to-orange-600',
    shadowClass: 'shadow-[0_0_30px_rgba(255,107,53,0.3)]',
    tokens: {
      surface: 'bg-arcane-fire/10',
      border: 'border-arcane-fire/20',
      text: 'text-arcane-fire',
      glow: 'shadow-[0_0_20px_rgba(255,107,53,0.3)]',
      ring: 'ring-arcane-fire/50',
    },
    animationDuration: '1.89s',
  },
  {
    gate: 'Heart',
    frequency: 639,
    guardian: 'Maylinn',
    godbeast: 'Laeylinn',
    element: 'Water/Spirit',
    domain: 'Love, healing, compassion',
    icon: Heart,
    primaryColor: '#ff69b4',
    brightColor: '#ff8dc7',
    deepColor: '#cc4a8a',
    glowColor: 'rgba(255, 105, 180, 0.4)',
    bgClass: 'bg-pink-500',
    textClass: 'text-pink-400',
    badgeVariant: 'crystal' as const,
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-600',
    shadowClass: 'shadow-[0_0_30px_rgba(255,105,180,0.3)]',
    tokens: {
      surface: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      text: 'text-pink-400',
      glow: 'shadow-[0_0_20px_rgba(255,105,180,0.3)]',
      ring: 'ring-pink-500/50',
    },
    animationDuration: '1.57s',
  },
  {
    gate: 'Voice',
    frequency: 741,
    guardian: 'Alera',
    godbeast: 'Otome',
    element: 'Wind',
    domain: 'Truth, expression, resonance',
    icon: Music,
    primaryColor: '#00ff88',
    brightColor: '#33ffa0',
    deepColor: '#00cc6d',
    glowColor: 'rgba(0, 255, 136, 0.4)',
    bgClass: 'bg-arcane-wind',
    textClass: 'text-arcane-wind',
    badgeVariant: 'crystal' as const,
    gradientFrom: 'from-arcane-wind',
    gradientTo: 'to-emerald-500',
    shadowClass: 'shadow-[0_0_30px_rgba(0,255,136,0.3)]',
    tokens: {
      surface: 'bg-arcane-wind/10',
      border: 'border-arcane-wind/20',
      text: 'text-arcane-wind',
      glow: 'shadow-[0_0_20px_rgba(0,255,136,0.3)]',
      ring: 'ring-arcane-wind/50',
    },
    animationDuration: '1.35s',
  },
  {
    gate: 'Sight',
    frequency: 852,
    guardian: 'Lyria',
    godbeast: 'Yumiko',
    element: 'Void',
    domain: 'Intuition, vision, perception',
    icon: Eye,
    primaryColor: '#9966ff',
    brightColor: '#b38aff',
    deepColor: '#7744dd',
    glowColor: 'rgba(153, 102, 255, 0.4)',
    bgClass: 'bg-arcane-void',
    textClass: 'text-arcane-void-bright',
    badgeVariant: 'void' as const,
    gradientFrom: 'from-arcane-void',
    gradientTo: 'to-purple-600',
    shadowClass: 'shadow-[0_0_30px_rgba(153,102,255,0.3)]',
    tokens: {
      surface: 'bg-arcane-void/10',
      border: 'border-arcane-void/20',
      text: 'text-arcane-void-bright',
      glow: 'shadow-[0_0_20px_rgba(153,102,255,0.3)]',
      ring: 'ring-arcane-void/50',
    },
    animationDuration: '1.17s',
  },
  {
    gate: 'Crown',
    frequency: 963,
    guardian: 'Aiyami',
    godbeast: 'Sol',
    element: 'Spirit',
    domain: 'Enlightenment, consciousness',
    icon: Crown,
    primaryColor: '#ffd700',
    brightColor: '#ffe44d',
    deepColor: '#cca800',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    bgClass: 'bg-arcane-gold',
    textClass: 'text-arcane-gold',
    badgeVariant: 'gold' as const,
    gradientFrom: 'from-arcane-gold',
    gradientTo: 'to-yellow-600',
    shadowClass: 'shadow-[0_0_30px_rgba(255,215,0,0.3)]',
    tokens: {
      surface: 'bg-arcane-gold/10',
      border: 'border-arcane-gold/20',
      text: 'text-arcane-gold',
      glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]',
      ring: 'ring-arcane-gold/50',
    },
    animationDuration: '1.04s',
  },
  {
    gate: 'Shift',
    frequency: 1111,
    guardian: 'Elara',
    godbeast: 'Thessara',
    element: 'Void/Spirit',
    domain: 'Perspective, transformation',
    icon: Shuffle,
    primaryColor: '#7fffd4',
    brightColor: '#a0ffe0',
    deepColor: '#5ccfa8',
    glowColor: 'rgba(127, 255, 212, 0.4)',
    bgClass: 'bg-arcane-crystal',
    textClass: 'text-arcane-crystal',
    badgeVariant: 'crystal' as const,
    gradientFrom: 'from-arcane-crystal',
    gradientTo: 'to-teal-400',
    shadowClass: 'shadow-[0_0_30px_rgba(127,255,212,0.3)]',
    tokens: {
      surface: 'bg-arcane-crystal/10',
      border: 'border-arcane-crystal/20',
      text: 'text-arcane-crystal',
      glow: 'shadow-[0_0_20px_rgba(127,255,212,0.3)]',
      ring: 'ring-arcane-crystal/50',
    },
    animationDuration: '0.90s',
  },
  {
    gate: 'Unity',
    frequency: 963,
    guardian: 'Ino',
    godbeast: 'Kyuro',
    element: 'Spirit',
    domain: 'Partnership, bond, harmony',
    icon: Users,
    primaryColor: '#78a6ff',
    brightColor: '#93bbff',
    deepColor: '#5b8de0',
    glowColor: 'rgba(120, 166, 255, 0.35)',
    bgClass: 'bg-arcane-water',
    textClass: 'text-arcane-water',
    badgeVariant: 'water' as const,
    gradientFrom: 'from-arcane-water',
    gradientTo: 'to-indigo-500',
    shadowClass: 'shadow-[0_0_30px_rgba(120,166,255,0.3)]',
    tokens: {
      surface: 'bg-arcane-water/10',
      border: 'border-arcane-water/20',
      text: 'text-arcane-water',
      glow: 'shadow-[0_0_20px_rgba(120,166,255,0.3)]',
      ring: 'ring-arcane-water/50',
    },
    animationDuration: '1.04s',
  },
  {
    gate: 'Source',
    frequency: 1111,
    guardian: 'Shinkami',
    godbeast: 'Amaterasu',
    element: 'All / Meta',
    domain: 'Meta-consciousness, origin',
    icon: Sun,
    primaryColor: '#ffd700',
    brightColor: '#ffe44d',
    deepColor: '#cca800',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    bgClass: 'bg-arcane-gold',
    textClass: 'text-arcane-gold',
    badgeVariant: 'gold' as const,
    gradientFrom: 'from-arcane-gold',
    gradientTo: 'to-arcane-crystal',
    shadowClass: 'shadow-[0_0_40px_rgba(255,215,0,0.4)]',
    tokens: {
      surface: 'bg-arcane-gold/10',
      border: 'border-arcane-gold/20',
      text: 'text-arcane-gold',
      glow: 'shadow-[0_0_30px_rgba(255,215,0,0.4)]',
      ring: 'ring-arcane-gold/50',
    },
    animationDuration: '0.90s',
  },
]

function TokenRow({ label, value, copied, onCopy }: { label: string; value: string; copied: string | null; onCopy: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs font-sans text-text-muted">{label}</span>
      <button
        onClick={() => onCopy(value)}
        className="flex items-center gap-1.5 group"
      >
        <code className="text-xs font-mono text-text-secondary group-hover:text-white transition-colors">{value}</code>
        {copied === value ? (
          <Icons.Check className="w-3 h-3 text-arcane-crystal" />
        ) : (
          <Icons.Copy className="w-3 h-3 text-text-muted group-hover:text-text-secondary transition-colors" />
        )}
      </button>
    </div>
  )
}

function FrequencyBar({ frequency, maxFreq, color }: { frequency: number; maxFreq: number; color: string }) {
  const width = (frequency / maxFreq) * 100
  return (
    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  )
}

export default function DesignLabV6() {
  const [selectedGuardian, setSelectedGuardian] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  const active = guardians[selectedGuardian]

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(value)
    setTimeout(() => setCopied(null), 2000)
  }

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
          <Badge variant="gold" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
            <Icons.Shield className="w-3.5 h-3.5 mr-2" />
            V6 -- GUARDIANS
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          Guardians
          <span className="block text-gradient-gold">Elemental Design Language</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Each of the Ten Guardians carries a unique visual identity within the Arcanea design system.
          Their elements, frequencies, and domains translate directly into color palettes, glow signatures,
          animation timings, and design tokens. The mythology is the specification.
        </motion.p>

        {/* Frequency spectrum visualization */}
        <motion.div
          variants={cosmicFadeIn}
          className="max-w-4xl mx-auto glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Icons.Waves className="w-4 h-4 text-arcane-crystal" />
            <span className="text-sm font-sans text-text-secondary">Frequency Spectrum (Hz)</span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {guardians.map((g, i) => {
              const Icon = g.icon
              return (
                <motion.button
                  key={g.gate}
                  onClick={() => setSelectedGuardian(i)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                    selectedGuardian === i
                      ? `${g.tokens.surface} ${g.tokens.border} border`
                      : 'hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-4 h-4 ${selectedGuardian === i ? g.textClass : 'text-text-muted'}`} />
                  <span className={`text-[9px] font-mono ${selectedGuardian === i ? g.textClass : 'text-text-disabled'}`}>
                    {g.frequency}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </motion.section>

      {/* Guardian Palette Generator */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant={active.badgeVariant} className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            GUARDIAN PALETTE GENERATOR
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">
            Select a Guardian
          </h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Click any Guardian to reveal their complete design token set, color palette, and glow signature.
          </p>
        </motion.div>

        {/* Guardian selector grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {guardians.map((g, i) => {
            const Icon = g.icon
            const isActive = selectedGuardian === i
            return (
              <motion.button
                key={g.gate}
                onClick={() => setSelectedGuardian(i)}
                className={`relative glow-card rounded-2xl p-4 text-center transition-all duration-300 overflow-hidden ${
                  isActive ? g.shadowClass : ''
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="guardian-active"
                    className={`absolute inset-0 ${g.tokens.surface} border ${g.tokens.border} rounded-2xl`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? g.textClass : 'text-text-muted'}`} />
                  <div className={`text-sm font-display ${isActive ? 'text-white' : 'text-text-secondary'}`}>
                    {g.guardian}
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${isActive ? g.textClass : 'text-text-disabled'}`}>
                    {g.gate}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Active guardian detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGuardian}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`glass rounded-3xl p-8 border ${active.tokens.border} ${active.shadowClass}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Guardian identity */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = active.icon
                      return <Icon className={`w-8 h-8 ${active.textClass}`} />
                    })()}
                    <div>
                      <h3 className="text-2xl font-display text-white">{active.guardian}</h3>
                      <p className="text-sm font-sans text-text-muted">Gate of {active.gate}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icons.Sparkles className={`w-3.5 h-3.5 ${active.textClass}`} />
                      <span className="text-sm font-body text-text-secondary">Godbeast: <strong className="text-white">{active.godbeast}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.Zap className={`w-3.5 h-3.5 ${active.textClass}`} />
                      <span className="text-sm font-body text-text-secondary">Element: <strong className="text-white">{active.element}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.Waves className={`w-3.5 h-3.5 ${active.textClass}`} />
                      <span className="text-sm font-body text-text-secondary">Frequency: <strong className="text-white">{active.frequency} Hz</strong></span>
                    </div>
                  </div>
                </div>

                {/* Domain */}
                <div className={`${active.tokens.surface} rounded-xl p-4 border ${active.tokens.border}`}>
                  <p className="text-xs font-sans text-text-muted mb-1">Domain</p>
                  <p className="text-sm font-body text-white">{active.domain}</p>
                </div>

                {/* Color swatches */}
                <div>
                  <p className="text-xs font-sans text-text-muted mb-3">Color Palette</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Primary', color: active.primaryColor },
                      { label: 'Bright', color: active.brightColor },
                      { label: 'Deep', color: active.deepColor },
                    ].map((swatch) => (
                      <button
                        key={swatch.label}
                        onClick={() => handleCopy(swatch.color)}
                        className="flex items-center gap-3 w-full group"
                      >
                        <div
                          className="w-8 h-8 rounded-lg border border-white/10 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: swatch.color }}
                        />
                        <div className="flex-1 text-left">
                          <span className="text-xs font-sans text-text-secondary">{swatch.label}</span>
                        </div>
                        <code className="text-xs font-mono text-text-muted group-hover:text-white transition-colors">
                          {swatch.color}
                        </code>
                        {copied === swatch.color ? (
                          <Icons.Check className="w-3 h-3 text-arcane-crystal" />
                        ) : (
                          <Icons.Copy className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle: Glow signature and visual demo */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-sans text-text-muted mb-3">Glow Signature</p>
                  <div className="relative aspect-square rounded-2xl bg-cosmic-deep border border-white/5 overflow-hidden flex items-center justify-center">
                    {/* Animated glow orb */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: parseFloat(active.animationDuration),
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-32 h-32 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${active.primaryColor}40 0%, ${active.primaryColor}10 50%, transparent 70%)`,
                        boxShadow: `0 0 60px ${active.glowColor}, 0 0 120px ${active.glowColor}`,
                      }}
                    />
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {(() => {
                        const Icon = active.icon
                        return <Icon className={`w-12 h-12 ${active.textClass}`} style={{ filter: `drop-shadow(0 0 12px ${active.glowColor})` }} />
                      })()}
                    </div>
                    {/* Frequency label */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-mono" style={{ color: active.primaryColor }}>{active.frequency} Hz</span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs font-mono text-text-muted">T = {active.animationDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Frequency bar */}
                <div>
                  <p className="text-xs font-sans text-text-muted mb-2">Frequency Influence on Animation</p>
                  <FrequencyBar
                    frequency={active.frequency}
                    maxFreq={1200}
                    color={`${active.gradientFrom} ${active.gradientTo}`}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] font-mono text-text-disabled">Slower / Grounded</span>
                    <span className="text-[10px] font-mono text-text-disabled">Faster / Ethereal</span>
                  </div>
                </div>

                {/* Button & badge preview */}
                <div>
                  <p className="text-xs font-sans text-text-muted mb-3">Component Preview</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={active.badgeVariant}>{active.gate}</Badge>
                    <Badge variant={active.badgeVariant} className="font-mono text-[10px]">{active.frequency} Hz</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button size="sm" className={`${active.bgClass} text-cosmic-void hover:opacity-80 rounded-xl`}>
                      {active.guardian}
                    </Button>
                    <Button size="sm" variant="outline" className={`${active.tokens.border} ${active.textClass} hover:${active.tokens.surface} rounded-xl`}>
                      {active.godbeast}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right: Design tokens */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-sans text-text-muted mb-3">Design Tokens</p>
                  <div className="glass rounded-xl p-4 space-y-0">
                    <TokenRow label="Surface" value={active.tokens.surface} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Border" value={active.tokens.border} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Text" value={active.tokens.text} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Glow" value={active.tokens.glow} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Ring" value={active.tokens.ring} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Primary" value={active.primaryColor} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Bright" value={active.brightColor} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Deep" value={active.deepColor} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Glow RGBA" value={active.glowColor} copied={copied} onCopy={handleCopy} />
                    <TokenRow label="Anim Duration" value={active.animationDuration} copied={copied} onCopy={handleCopy} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-sans text-text-muted mb-3">Usage Example</p>
                  <div className="glass rounded-xl p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-text-secondary whitespace-pre-wrap">
{`<div className="${active.tokens.surface}
  ${active.tokens.border} border
  ${active.tokens.text}
  ${active.tokens.glow}
  rounded-xl p-4">

  <Badge variant="${active.badgeVariant}">
    ${active.gate}
  </Badge>
</div>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Gate to Frequency Mapping */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Waves className="w-3 h-3 mr-1.5" />
            FREQUENCY MAP
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">
            Frequency-Driven Animation
          </h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Each Guardian&apos;s frequency determines their animation cycle duration. Lower frequencies produce
            slower, more grounded motion. Higher frequencies create faster, more ethereal transitions.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerFast}
          className="space-y-3"
        >
          {guardians.map((g, i) => {
            const Icon = g.icon
            return (
              <motion.div
                key={g.gate}
                variants={staggerItem}
                className="glass rounded-xl p-4 flex items-center gap-4 group hover-lift cursor-pointer"
                onClick={() => setSelectedGuardian(i)}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${active.primaryColor === g.primaryColor ? g.primaryColor : g.primaryColor}15` }}>
                  <Icon className={`w-5 h-5 ${g.textClass}`} />
                </div>

                <div className="flex-shrink-0 w-24">
                  <div className="text-sm font-display text-white">{g.guardian}</div>
                  <div className="text-[10px] font-mono text-text-muted">{g.gate}</div>
                </div>

                <div className="flex-shrink-0 w-16 text-right">
                  <span className={`text-sm font-mono ${g.textClass}`}>{g.frequency}</span>
                  <span className="text-[10px] font-mono text-text-muted ml-0.5">Hz</span>
                </div>

                <div className="flex-1">
                  <FrequencyBar
                    frequency={g.frequency}
                    maxFreq={1200}
                    color={`${g.gradientFrom} ${g.gradientTo}`}
                  />
                </div>

                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-xs font-mono text-text-muted">{g.animationDuration}</span>
                </div>

                {/* Live animation indicator */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: parseFloat(g.animationDuration), repeat: Infinity, ease: 'easeInOut' }}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: g.primaryColor }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Elemental UI Differentiation */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            ELEMENTAL UI
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">
            Element-Driven Differentiation
          </h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The Five Elements (plus Spirit and Void) define distinct visual regions across the UI.
            Each element carries its own mood, motion quality, and visual weight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { element: 'Earth', desc: 'Grounded, stable, warm. Low-frequency animations. Textured surfaces.', colors: ['#8b7355', '#a0845c', '#6b5640'], textClass: 'text-arcane-earth', guardians: 'Lyssandria' },
            { element: 'Water', desc: 'Flowing, adaptive, cool. Medium-frequency ripple effects. Translucent layers.', colors: ['#78a6ff', '#93bbff', '#5b8de0'], textClass: 'text-arcane-water', guardians: 'Leyla, Ino' },
            { element: 'Fire', desc: 'Intense, transformative, hot. Energetic pulse animations. High-contrast glow.', colors: ['#ff6b35', '#ff8f66', '#cc4a1a'], textClass: 'text-arcane-fire', guardians: 'Draconia' },
            { element: 'Wind', desc: 'Swift, free, ephemeral. Fast slide animations. Subtle transparency shifts.', colors: ['#00ff88', '#33ffa0', '#00cc6d'], textClass: 'text-arcane-wind', guardians: 'Alera' },
            { element: 'Void', desc: 'Deep, mysterious, boundless. Slow reveal animations. Dark gradients with purple glow.', colors: ['#9966ff', '#b38aff', '#7744dd'], textClass: 'text-arcane-void-bright', guardians: 'Lyria' },
            { element: 'Spirit', desc: 'Transcendent, radiant, golden. Crown-like illumination. Highest clarity.', colors: ['#ffd700', '#ffe44d', '#cca800'], textClass: 'text-arcane-gold', guardians: 'Aiyami, Shinkami' },
          ].map((el) => (
            <motion.div
              key={el.element}
              variants={staggerItem}
              className="glow-card rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {el.colors.map((c, ci) => (
                    <div key={ci} className="w-5 h-5 rounded-md border border-white/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <h3 className={`text-lg font-display ${el.textClass}`}>{el.element}</h3>
              </div>
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-3">{el.desc}</p>
              <p className="text-xs font-sans text-text-muted">Guardians: {el.guardians}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

        {/* Navigation */}
        <motion.section
          variants={cosmicFadeIn}
          {...fadeInViewport}
          className="flex items-center justify-between pt-8 border-t border-white/5"
        >
          <Link href="/design-lab/v5">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              v5 -- Layout
            </Button>
          </Link>
          <Link href="/design-lab/v7">
            <Button className="rounded-2xl font-sans">
              v7 -- Responsive
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
