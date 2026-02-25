'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  cosmicFadeIn,
  scrollReveal,
  fadeInViewport,
  floatingOrb,
  heroTitle,
  heroSubtitle,
  heroCTA,
} from '@/lib/animations'
import {
  Palette,
  Copy,
  Check,
  Type,
  ArrowRight,
  Sparkles,
  Eye,
  Droplets,
  Flame,
  Wind,
  Mountain,
  Moon,
  Sun,
  Crown,
  Gem,
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
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(127, 255, 212, 0.06), transparent 40%)',
        }}
      />
      <div className="absolute inset-0 bg-cosmic-stars opacity-50" />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-crystal/5 blur-[120px]"
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]"
        style={{ animationDelay: '3s' }}
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[50%] right-[30%] w-[350px] h-[350px] rounded-full bg-arcane-fire/5 blur-[80px]"
        style={{ animationDelay: '5s' }}
      />
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
// ANIMATED COUNTER
// ============================================

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const duration = 1200
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ============================================
// COLOR DATA
// ============================================

const cosmicPalette = [
  { name: 'Void', token: 'cosmic-void', hex: '#0b0e14', desc: 'Deepest background' },
  { name: 'Deep', token: 'cosmic-deep', hex: '#121826', desc: 'Card backgrounds' },
  { name: 'Surface', token: 'cosmic-surface', hex: '#1a2332', desc: 'Elevated surfaces' },
  { name: 'Raised', token: 'cosmic-raised', hex: '#242f42', desc: 'Interactive elements' },
  { name: 'Elevated', token: 'cosmic-elevated', hex: '#2d3a52', desc: 'Hover states' },
  { name: 'Overlay', token: 'cosmic-overlay', hex: '#364562', desc: 'Popover surfaces' },
]

const elementalColors = [
  { name: 'Crystal', token: 'arcane-crystal', hex: '#7fffd4', bright: '#99ffe0', deep: '#5ce6b8', icon: Sparkles, glow: 'rgba(127, 255, 212, 0.3)' },
  { name: 'Fire', token: 'arcane-fire', hex: '#ff6b35', bright: '#ff8c5a', deep: '#d94e1f', icon: Flame, glow: 'rgba(255, 107, 53, 0.3)' },
  { name: 'Water', token: 'arcane-water', hex: '#78a6ff', bright: '#9dbfff', deep: '#5a8ce6', icon: Droplets, glow: 'rgba(120, 166, 255, 0.3)' },
  { name: 'Void', token: 'arcane-void', hex: '#9966ff', bright: '#b38cff', deep: '#7a4dcc', icon: Moon, glow: 'rgba(153, 102, 255, 0.3)' },
  { name: 'Gold', token: 'arcane-gold', hex: '#ffd700', bright: '#ffe44d', deep: '#ccac00', icon: Crown, glow: 'rgba(255, 215, 0, 0.3)' },
  { name: 'Wind', token: 'arcane-wind', hex: '#00ff88', bright: '#33ffaa', deep: '#00cc6d', icon: Wind, glow: 'rgba(0, 255, 136, 0.3)' },
  { name: 'Earth', token: 'arcane-earth', hex: '#8b7355', bright: '#a89070', deep: '#6e5940', icon: Mountain, glow: 'rgba(139, 115, 85, 0.3)' },
]

const textHierarchy = [
  { name: 'Primary', token: 'text-primary', hex: '#e6eefc', desc: 'Headings, key content' },
  { name: 'Secondary', token: 'text-secondary', hex: '#9bb1d0', desc: 'Body text, descriptions' },
  { name: 'Muted', token: 'text-muted', hex: '#708094', desc: 'Captions, metadata' },
  { name: 'Disabled', token: 'text-disabled', hex: '#515b6b', desc: 'Inactive states' },
]

const academyColors = [
  { name: 'Atlantean Primary', token: 'arcane-atlantean-primary', hex: '#0f3566' },
  { name: 'Atlantean Glow', token: 'arcane-atlantean-glow', hex: '#00e6e6' },
  { name: 'Atlantean Bio', token: 'arcane-atlantean-bio', hex: '#26cccc' },
  { name: 'Draconic Primary', token: 'arcane-draconic-primary', hex: '#d92952' },
  { name: 'Draconic Gold', token: 'arcane-draconic-gold', hex: '#ffc61a' },
  { name: 'Creation Primary', token: 'arcane-creation-primary', hex: '#ffcc33' },
  { name: 'Creation Glow', token: 'arcane-creation-glow', hex: '#ffffff' },
]

const semanticColors = [
  { name: 'Success', hex: '#20cc73', desc: 'Confirmations, positive' },
  { name: 'Warning', hex: '#ffa500', desc: 'Caution, attention' },
  { name: 'Error', hex: '#f52952', desc: 'Errors, destructive' },
  { name: 'Info', hex: '#26b8e6', desc: 'Informational' },
]

const fluidSizes = [
  { name: 'fluid-xs', clamp: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)', sample: 'Metadata & Fine Print' },
  { name: 'fluid-sm', clamp: 'clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)', sample: 'Captions & Labels' },
  { name: 'fluid-base', clamp: 'clamp(0.9rem, 0.85rem + 0.25vw, 1rem)', sample: 'Body text and paragraphs' },
  { name: 'fluid-lg', clamp: 'clamp(1.1rem, 1rem + 0.5vw, 1.25rem)', sample: 'Lead paragraphs' },
  { name: 'fluid-xl', clamp: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', sample: 'Section introductions' },
  { name: 'fluid-2xl', clamp: 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)', sample: 'Sub-headings' },
  { name: 'fluid-3xl', clamp: 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)', sample: 'Section Titles' },
  { name: 'fluid-4xl', clamp: 'clamp(2.25rem, 1.75rem + 2.5vw, 3rem)', sample: 'Page Titles' },
  { name: 'fluid-5xl', clamp: 'clamp(3rem, 2rem + 5vw, 4.5rem)', sample: 'Display' },
  { name: 'fluid-hero', clamp: 'clamp(3rem, 1.5rem + 7.5vw, 7rem)', sample: 'HERO' },
]

// ============================================
// INTERACTIVE COLOR SWATCH
// ============================================

function ColorSwatch({ name, token, hex, desc, size = 'md' }: {
  name: string
  token: string
  hex: string
  desc?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [copied, setCopied] = useState(false)

  const copyHex = useCallback(() => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [hex])

  const sizeClasses = {
    sm: 'h-14 w-full',
    md: 'h-20 w-full',
    lg: 'h-28 w-full',
  }

  return (
    <motion.button
      onClick={copyHex}
      variants={staggerItem}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="group text-left w-full"
    >
      <div
        className={`${sizeClasses[size]} rounded-xl border border-white/10 group-hover:border-arcane-crystal/40 transition-all duration-300 relative overflow-hidden shadow-lg group-hover:shadow-xl`}
        style={{ backgroundColor: hex }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-sm">
          {copied ? (
            <Icons.Check className="w-5 h-5 text-arcane-crystal" />
          ) : (
            <Icons.Copy className="w-4 h-4 text-white/80" />
          )}
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="text-sm font-sans font-medium text-text-primary">{name}</p>
        <p className="text-xs font-mono text-arcane-crystal/70">{hex}</p>
        {token && (
          <p className="text-[10px] font-mono text-text-muted">{token}</p>
        )}
        {desc && (
          <p className="text-xs text-text-muted font-sans">{desc}</p>
        )}
      </div>
    </motion.button>
  )
}

// ============================================
// ELEMENTAL COLOR CARD — Premium
// ============================================

function ElementalColorCard({ name, token, hex, bright, deep, glow, icon: Icon }: {
  name: string
  token: string
  hex: string
  bright: string
  deep: string
  glow: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)

  const copyColor = useCallback((color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass rounded-2xl p-5 group relative overflow-hidden transition-all duration-500"
      style={{
        borderColor: hovered ? `${hex}40` : undefined,
      }}
    >
      {/* Ambient glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 70%)`,
          opacity: 0,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: `${hex}20`,
              boxShadow: hovered ? `0 0 30px ${glow}` : 'none',
            }}
          >
            <Icon className="w-6 h-6" style={{ color: hex }} />
          </div>
          <div>
            <h4 className="font-display text-white text-base">{name}</h4>
            <p className="text-xs font-mono text-text-muted">{token}</p>
          </div>
        </div>

        {/* Color spectrum bar */}
        <div className="h-3 rounded-full overflow-hidden mb-4 flex">
          <div className="flex-1 transition-all duration-300 hover:flex-[2]" style={{ backgroundColor: deep }} />
          <div className="flex-[2] transition-all duration-300 hover:flex-[3]" style={{ backgroundColor: hex }} />
          <div className="flex-1 transition-all duration-300 hover:flex-[2]" style={{ backgroundColor: bright }} />
        </div>

        <div className="flex gap-2">
          {[
            { label: 'Deep', color: deep },
            { label: 'Base', color: hex },
            { label: 'Bright', color: bright },
          ].map(({ label, color }) => (
            <button
              key={label}
              onClick={() => copyColor(color)}
              className="flex-1 group/swatch"
            >
              <div
                className="h-14 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-200 relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                  {copied === color ? (
                    <Icons.Check className="w-3 h-3 text-white" />
                  ) : (
                    <Icons.Copy className="w-3 h-3 text-white/70" />
                  )}
                </div>
              </div>
              <p className="text-[10px] font-sans text-text-muted mt-1.5 text-center">{label}</p>
              <p className="text-[10px] font-mono text-text-disabled text-center">{color}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// GRADIENT TEXT THEATER
// ============================================

function GradientTextTheater() {
  const gradients = [
    { name: 'Crystal', className: 'text-gradient-crystal', token: 'text-gradient-crystal', desc: 'Crystal to Void — the signature Arcanea gradient' },
    { name: 'Fire', className: 'text-gradient-fire', token: 'text-gradient-fire', desc: 'Fire to Gold — transformation and power' },
    { name: 'Cosmic', className: 'text-gradient-cosmic', token: 'text-gradient-cosmic', desc: 'Crystal to Water to Void — the full spectrum' },
    { name: 'Gold', className: 'text-gradient-gold', token: 'text-gradient-gold', desc: 'Gold to Fire — divine illumination' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {gradients.map((gradient) => (
        <motion.div
          key={gradient.name}
          variants={staggerItem}
          whileHover={{ scale: 1.03, y: -4 }}
          className="glass rounded-2xl p-8 text-center space-y-4 group relative overflow-hidden hover:border-white/20 transition-all"
        >
          {/* Background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <p className={`text-fluid-4xl font-display ${gradient.className} leading-tight`}>
              {gradient.name}
            </p>
            <p className="text-xs font-mono text-arcane-crystal/50 mt-2">.{gradient.token}</p>
            <p className="text-xs font-body text-text-muted mt-2">{gradient.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function DesignLabV1() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96])

  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      <LabCosmicBackground />

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <motion.div variants={heroTitle} initial="hidden" animate="visible" className="mb-6">
                  <Badge variant="crystal" className="text-xs px-4 py-1.5 glass border-arcane-crystal/30 text-arcane-crystal font-sans tracking-[0.2em]">
                    <Icons.Palette className="w-3 h-3 mr-2" />
                    V1 — FOUNDATION
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={heroTitle}
                  initial="hidden"
                  animate="visible"
                  className="text-fluid-5xl lg:text-fluid-hero font-display text-white mb-6 leading-[0.95] tracking-tight"
                >
                  Colors &
                  <span className="block text-gradient-crystal mt-1">Typography</span>
                </motion.h1>

                <motion.p
                  variants={heroSubtitle}
                  initial="hidden"
                  animate="visible"
                  className="text-fluid-lg font-body text-text-secondary mb-8 leading-relaxed max-w-xl"
                >
                  The visual language of Arcanea. A cosmic color system drawn from elemental forces
                  and a fluid type scale that breathes across every viewport.
                </motion.p>

                <motion.div
                  variants={heroCTA}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { label: 'Color Tokens', value: 45, suffix: '+' },
                    { label: 'Type Sizes', value: 11, suffix: '' },
                    { label: 'Font Families', value: 4, suffix: '' },
                    { label: 'Gradients', value: 4, suffix: '' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl px-4 py-3 text-center min-w-[80px]">
                      <div className="text-lg font-display text-gradient-crystal">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] font-sans text-text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Live Color Wheel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-[340px] h-[340px]">
                  {/* Rotating color ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    {elementalColors.map((el, i) => {
                      const angle = (360 / elementalColors.length) * i
                      return (
                        <div
                          key={el.name}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)`,
                            transformOrigin: '0 0',
                          }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                            style={{
                              backgroundColor: `${el.hex}30`,
                              boxShadow: `0 0 25px ${el.glow}`,
                              border: `1px solid ${el.hex}40`,
                            }}
                          >
                            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: el.hex }} />
                          </motion.div>
                        </div>
                      )
                    })}
                  </motion.div>

                  {/* Orbital rings */}
                  <div className="absolute inset-8 rounded-full border border-arcane-crystal/10" />
                  <div className="absolute inset-16 rounded-full border border-arcane-crystal/5" />

                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-arcane-crystal/20 to-arcane-void/20 border border-arcane-crystal/30 flex items-center justify-center backdrop-blur-sm"
                    >
                      <Icons.Gem className="w-10 h-10 text-arcane-crystal" />
                    </motion.div>
                    <div className="absolute w-40 h-40 rounded-full bg-arcane-crystal/8 blur-[40px] pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ===== COSMIC DEPTH PALETTE ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-arcane-crystal/10 flex items-center justify-center">
                <Icons.Moon className="w-5 h-5 text-arcane-crystal" />
              </div>
              <div>
                <h2 className="text-fluid-3xl font-display text-white">Cosmic Depth Palette</h2>
                <p className="text-sm font-body text-text-secondary">
                  Six depth layers from the void to the surface. Click any swatch to copy its hex value.
                </p>
              </div>
            </motion.div>

            {/* Full-width depth gradient — interactive */}
            <motion.div
              variants={staggerItem}
              className="h-20 sm:h-24 rounded-2xl overflow-hidden flex shadow-xl"
            >
              {cosmicPalette.map((color) => (
                <div
                  key={color.token}
                  className="flex-1 transition-all duration-500 hover:flex-[3] relative group cursor-crosshair"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-sans text-white/90 font-medium">{color.name}</span>
                    <span className="text-[10px] font-mono text-white/50 mt-0.5">{color.hex}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Individual swatches */}
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-6 gap-4"
            >
              {cosmicPalette.map((color) => (
                <ColorSwatch key={color.token} {...color} size="lg" />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== ELEMENTAL COLORS ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-arcane-fire/10 flex items-center justify-center">
                <Icons.Flame className="w-5 h-5 text-arcane-fire" />
              </div>
              <div>
                <h2 className="text-fluid-3xl font-display text-white">Elemental Colors</h2>
                <p className="text-sm font-body text-text-secondary">
                  Seven elements, each with deep, base, and bright variants. Hover to reveal the spectrum.
                </p>
              </div>
            </motion.div>

            {/* Full elemental spectrum bar */}
            <motion.div
              variants={staggerItem}
              className="h-6 rounded-full overflow-hidden flex shadow-lg"
            >
              {elementalColors.map((color) => (
                <div
                  key={color.token}
                  className="flex-1 transition-all duration-500 hover:flex-[3] relative group cursor-crosshair"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono font-bold" style={{ color: color.name === 'Earth' ? '#fff' : '#0b0e14' }}>{color.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {elementalColors.map((color) => (
                <ElementalColorCard key={color.token} {...color} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== TEXT HIERARCHY ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-arcane-water/10 flex items-center justify-center">
                <Icons.Eye className="w-5 h-5 text-arcane-water" />
              </div>
              <div>
                <h2 className="text-fluid-3xl font-display text-white">Text Hierarchy</h2>
                <p className="text-sm font-body text-text-secondary">
                  Four levels of emphasis for clear information architecture.
                </p>
              </div>
            </motion.div>

            <div className="space-y-4">
              {textHierarchy.map((item, i) => (
                <motion.div
                  key={item.token}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 group hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-14 h-14 rounded-xl border border-white/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div>
                      <p className="text-lg font-display" style={{ color: item.hex }}>
                        {item.name} — {item.desc}
                      </p>
                      <p className="text-xs font-mono text-text-muted mt-1">
                        color: {item.token} | {item.hex}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-body" style={{ color: item.hex }}>
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== ACADEMY & SEMANTIC — Bento Layout ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Academy Colors */}
              <motion.div variants={staggerItem} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-arcane-gold/10 flex items-center justify-center">
                    <Icons.Crown className="w-5 h-5 text-arcane-gold" />
                  </div>
                  <div>
                    <h3 className="text-fluid-2xl font-display text-white">Academy Colors</h3>
                    <p className="text-xs font-body text-text-muted">Atlantean, Draconic, and Creation themes</p>
                  </div>
                </div>
                <motion.div
                  variants={staggerContainerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-3"
                >
                  {academyColors.map((color) => (
                    <ColorSwatch key={color.token} {...color} size="sm" />
                  ))}
                </motion.div>
              </motion.div>

              {/* Semantic Colors */}
              <motion.div variants={staggerItem} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icons.Sun className="w-5 h-5 text-arcane-gold" />
                  </div>
                  <div>
                    <h3 className="text-fluid-2xl font-display text-white">Semantic Colors</h3>
                    <p className="text-xs font-body text-text-muted">Feedback states and system UI</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {semanticColors.map((color) => (
                    <motion.div
                      key={color.name}
                      whileHover={{ x: 4 }}
                      className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-white/20 transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-sans font-medium text-white">{color.name}</p>
                        <p className="text-xs text-text-muted">{color.desc}</p>
                      </div>
                      <span className="text-xs font-mono text-text-muted">{color.hex}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== GRADIENT TEXT THEATER ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-arcane-void/10 flex items-center justify-center">
                <Icons.Sparkles className="w-5 h-5 text-arcane-void-bright" />
              </div>
              <div>
                <h2 className="text-fluid-3xl font-display text-white">Gradient Text</h2>
                <p className="text-sm font-body text-text-secondary">
                  Four gradient presets for headlines and accent text. Hover for scale.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GradientTextTheater />
            </motion.div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== FLUID TYPOGRAPHY SCALE ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-arcane-crystal/10 flex items-center justify-center">
                <Icons.Type className="w-5 h-5 text-arcane-crystal" />
              </div>
              <div>
                <h2 className="text-fluid-3xl font-display text-white">Fluid Type Scale</h2>
                <p className="text-sm font-body text-text-secondary">
                  10 sizes using <span className="font-mono text-arcane-crystal/70">clamp()</span> — fluid from mobile to 4K.
                </p>
              </div>
            </motion.div>

            <div className="space-y-2">
              {fluidSizes.map((size, i) => (
                <motion.div
                  key={size.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="glass rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 group hover:border-arcane-crystal/20 transition-all"
                >
                  <div className="sm:w-36 flex-shrink-0">
                    <span className="text-xs font-mono text-arcane-crystal">.text-{size.name}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-${size.name} font-display text-white truncate`}>
                      {size.sample}
                    </p>
                  </div>
                  <div className="sm:w-80 flex-shrink-0 hidden lg:block">
                    <span className="text-[10px] font-mono text-text-disabled">{size.clamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== FONT FAMILIES ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div variants={cosmicFadeIn}>
              <h2 className="text-fluid-3xl font-display text-white">Font Families</h2>
              <p className="text-sm font-body text-text-secondary mt-2">
                Four typefaces, each optimized for its role in the hierarchy.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                {
                  name: 'Cinzel',
                  token: 'font-display',
                  usage: 'Headlines, Titles, Gates',
                  sample: 'The First Dawn Illuminates',
                  sampleClass: 'font-display text-fluid-3xl text-white',
                },
                {
                  name: 'Crimson Pro',
                  token: 'font-body',
                  usage: 'Body text, Library content',
                  sample: 'Through the gates of creation, every soul discovers its light.',
                  sampleClass: 'font-body text-fluid-lg text-text-secondary',
                },
                {
                  name: 'Inter',
                  token: 'font-sans',
                  usage: 'UI labels, navigation, metadata',
                  sample: 'Dashboard settings and interface elements',
                  sampleClass: 'font-sans text-fluid-base text-text-secondary',
                },
                {
                  name: 'JetBrains Mono',
                  token: 'font-mono',
                  usage: 'Code, tokens, technical values',
                  sample: 'const arcane = { crystal: "#7fffd4" }',
                  sampleClass: 'font-mono text-fluid-sm text-arcane-crystal',
                },
              ].map((font) => (
                <motion.div
                  key={font.name}
                  variants={staggerItem}
                  whileHover={{ y: -6 }}
                  className="glass rounded-2xl p-6 space-y-4 hover:border-arcane-crystal/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-arcane-crystal/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display text-xl text-white">{font.name}</h3>
                      <Badge variant="crystal" className="font-mono text-[10px]">
                        {font.token}
                      </Badge>
                    </div>
                    <p className="text-xs font-sans text-text-muted">{font.usage}</p>
                    <div className="border-t border-white/5 pt-5 mt-4">
                      <p className={font.sampleClass}>{font.sample}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== CSS CUSTOM PROPERTIES ===== */}
        <motion.section
          {...fadeInViewport}
          variants={scrollReveal}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-fluid-3xl font-display text-white">CSS Custom Properties</h2>
            <p className="text-text-secondary font-body">
              All design tokens are available as CSS variables on <span className="font-mono text-arcane-crystal">:root</span>.
            </p>

            <div className="glass rounded-2xl p-6 sm:p-8 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-arcane-void-bright">{':root'}</span> {'{\n'}
                  {'  '}<span className="text-text-muted">/* Cosmic palette */</span>{'\n'}
                  {'  '}<span className="text-arcane-crystal">--cosmic-void</span>: <span className="text-arcane-gold">#0b0e14</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--cosmic-deep</span>: <span className="text-arcane-gold">#121826</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--cosmic-surface</span>: <span className="text-arcane-gold">#1a2332</span>;{'\n'}
                  {'\n'}
                  {'  '}<span className="text-text-muted">/* Elemental accents */</span>{'\n'}
                  {'  '}<span className="text-arcane-crystal">--arcane-crystal</span>: <span className="text-arcane-gold">#7fffd4</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--arcane-fire</span>: <span className="text-arcane-gold">#ff6b35</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--arcane-water</span>: <span className="text-arcane-gold">#78a6ff</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--arcane-void</span>: <span className="text-arcane-gold">#9966ff</span>;{'\n'}
                  {'\n'}
                  {'  '}<span className="text-text-muted">/* Glass tokens */</span>{'\n'}
                  {'  '}<span className="text-arcane-crystal">--glass-bg</span>: <span className="text-arcane-gold">rgba(18, 24, 38, 0.7)</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--glass-border</span>: <span className="text-arcane-gold">rgba(127, 255, 212, 0.15)</span>;{'\n'}
                  {'  '}<span className="text-arcane-crystal">--glass-blur</span>: <span className="text-arcane-gold">16px</span>;{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* ===== NAVIGATION ===== */}
        <motion.section
          {...fadeInViewport}
          variants={cosmicFadeIn}
          className="px-4 sm:px-6 lg:px-8 pb-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div />
              <Link href="/design-lab/v2">
                <Button
                  variant="crystal"
                  size="lg"
                  className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold rounded-2xl px-6 shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  V2: Components
                  <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
