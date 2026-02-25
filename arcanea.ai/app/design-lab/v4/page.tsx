'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  scrollReveal,
  fadeInViewport,
  heroTitle,
  heroSubtitle,
  floatingOrb,
} from '@/lib/animations'
import {
  Layers,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Eye,
  Sun,
  Moon,
  Flame,
  Crown,
  Droplets,
  Stars,
  Loader,
  MousePointer2,
  Scroll,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-fire/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

// ============================================
// GLASS MORPHISM SHOWCASE
// ============================================

function GlassMorphismShowcase() {
  const [bgIntensity, setBgIntensity] = useState(50)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.Eye className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Glass Morphism Tiers</h2>
          <p className="text-sm font-sans text-text-muted">
            Adjust the background intensity to see how glass layers respond.
          </p>
        </div>
      </div>

      {/* Intensity slider */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-sans text-text-muted w-24">BG Intensity</span>
        <input
          type="range"
          min={0}
          max={100}
          value={bgIntensity}
          onChange={(e) => setBgIntensity(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none bg-cosmic-elevated cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-arcane-crystal [&::-webkit-slider-thumb]:shadow-glow-sm"
        />
        <span className="text-xs font-mono text-arcane-crystal w-8">{bgIntensity}%</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0 bg-cosmic-void">
          <div
            className="absolute top-4 left-8 w-40 h-40 rounded-full bg-arcane-crystal blur-3xl transition-opacity duration-300"
            style={{ opacity: bgIntensity / 100 * 0.5 }}
          />
          <div
            className="absolute top-16 right-12 w-48 h-48 rounded-full bg-arcane-void blur-3xl transition-opacity duration-300"
            style={{ opacity: bgIntensity / 100 * 0.4 }}
          />
          <div
            className="absolute bottom-4 left-1/3 w-44 h-44 rounded-full bg-arcane-fire blur-3xl transition-opacity duration-300"
            style={{ opacity: bgIntensity / 100 * 0.3 }}
          />
          <div
            className="absolute bottom-12 right-8 w-36 h-36 rounded-full bg-arcane-gold blur-3xl transition-opacity duration-300"
            style={{ opacity: bgIntensity / 100 * 0.25 }}
          />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 min-h-[280px]">
          {[
            {
              name: 'Subtle',
              className: 'glass-subtle',
              props: {
                bg: 'rgba(18, 24, 38, 0.4)',
                blur: '8px',
                border: 'rgba(127, 255, 212, 0.08)',
              },
              usage: 'Ambient overlays, light backgrounds',
            },
            {
              name: 'Standard',
              className: 'glass',
              props: {
                bg: 'rgba(18, 24, 38, 0.7)',
                blur: '16px',
                border: 'rgba(127, 255, 212, 0.15)',
              },
              usage: 'Cards, panels, navigation',
            },
            {
              name: 'Strong',
              className: 'glass-strong',
              props: {
                bg: 'rgba(18, 24, 38, 0.85)',
                blur: '24px',
                border: 'rgba(127, 255, 212, 0.2)',
              },
              usage: 'Modals, fixed headers, overlays',
            },
          ].map((tier) => (
            <div key={tier.name} className={`${tier.className} rounded-2xl p-6 space-y-4`}>
              <h4 className="font-display text-white text-lg">{tier.name}</h4>
              <p className="text-sm text-text-secondary font-body">{tier.usage}</p>

              <div className="space-y-2 pt-3 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-[10px] font-sans text-text-muted">Background</span>
                  <span className="text-[10px] font-mono text-text-disabled">{tier.props.bg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-sans text-text-muted">Blur</span>
                  <span className="text-[10px] font-mono text-text-disabled">{tier.props.blur}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-sans text-text-muted">Border</span>
                  <span className="text-[10px] font-mono text-text-disabled">{tier.props.border}</span>
                </div>
              </div>

              <p className="text-xs font-mono text-arcane-crystal/50">.{tier.className}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// GLOW SHADOWS
// ============================================

function GlowShadowShowcase() {
  const glowShadows = [
    { name: 'Glow SM', token: 'shadow-glow-sm', className: 'shadow-glow-sm', desc: '10px radius, 0.2 opacity' },
    { name: 'Glow MD', token: 'shadow-glow-md', className: 'shadow-glow-md', desc: '20px radius, 0.3 opacity' },
    { name: 'Glow LG', token: 'shadow-glow-lg', className: 'shadow-glow-lg', desc: '40px radius, 0.4 opacity' },
    { name: 'Glow XL', token: 'shadow-glow-xl', className: 'shadow-glow-xl', desc: '60px radius, 0.5 opacity' },
    { name: 'Crystal', token: 'shadow-glow-crystal', className: 'shadow-glow-crystal', desc: 'Dual-layer crystal glow' },
    { name: 'Fire', token: 'shadow-glow-fire', className: 'shadow-glow-fire', desc: 'Dual-layer fire glow' },
    { name: 'Void', token: 'shadow-glow-void', className: 'shadow-glow-void', desc: 'Dual-layer void glow' },
    { name: 'Gold', token: 'shadow-glow-gold', className: 'shadow-glow-gold', desc: 'Dual-layer gold glow' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-gold/10 flex items-center justify-center">
          <Icons.Sun className="w-4 h-4 text-arcane-gold" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Glow Shadows</h2>
          <p className="text-sm font-sans text-text-muted">
            Eight shadow presets from subtle ambient to element-specific glows.
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {glowShadows.map((shadow) => (
          <motion.div key={shadow.token} variants={staggerItem} className="text-center space-y-3">
            <div
              className={`w-full aspect-square max-w-[120px] mx-auto rounded-2xl bg-cosmic-surface border border-white/10 ${shadow.className} flex items-center justify-center`}
            >
              <Icons.Sparkles className="w-6 h-6 text-text-muted" />
            </div>
            <div>
              <p className="text-sm font-sans font-medium text-white">{shadow.name}</p>
              <p className="text-[10px] font-mono text-arcane-crystal/50">.{shadow.token}</p>
              <p className="text-xs text-text-muted mt-1">{shadow.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// BORDER GRADIENT DEMO
// ============================================

function BorderGradientDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-void/10 flex items-center justify-center">
          <Icons.Moon className="w-4 h-4 text-arcane-void-bright" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Animated Border Gradient</h2>
          <p className="text-sm font-sans text-text-muted">
            A rotating multi-color border using mask compositing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border-gradient rounded-2xl p-8 bg-cosmic-deep text-center space-y-3">
          <Icons.Sparkles className="w-8 h-8 text-arcane-crystal mx-auto" />
          <h4 className="font-display text-white text-lg">Border Gradient Card</h4>
          <p className="text-sm text-text-secondary font-body">
            Crystal, void, and fire colors flow through the border.
          </p>
          <p className="text-xs font-mono text-arcane-crystal/50">.border-gradient</p>
        </div>

        <div className="border-gradient rounded-2xl p-8 bg-cosmic-deep space-y-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest">How It Works</p>
          <div className="space-y-3 text-sm font-mono text-text-secondary">
            <p><span className="text-arcane-crystal">background</span>: linear-gradient(135deg, crystal, void, fire)</p>
            <p><span className="text-arcane-crystal">background-size</span>: 300% 300%</p>
            <p><span className="text-arcane-crystal">mask</span>: content-box / border-box XOR</p>
            <p><span className="text-arcane-crystal">animation</span>: energy-flow 6s infinite</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// COSMIC BACKGROUNDS
// ============================================

function CosmicBackgroundsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-water/10 flex items-center justify-center">
          <Icons.Star className="w-4 h-4 text-arcane-water" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Cosmic Backgrounds</h2>
          <p className="text-sm font-sans text-text-muted">
            Two background presets for atmospheric sections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Cosmic Mesh */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div className="h-48 bg-cosmic-mesh flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="font-display text-white text-lg">Cosmic Mesh</p>
              <p className="text-xs text-text-secondary font-sans">Four radial gradients layered</p>
            </div>
          </div>
          <div className="bg-cosmic-deep p-4 space-y-2">
            <p className="text-xs font-mono text-arcane-crystal/50">.bg-cosmic-mesh</p>
            <p className="text-[10px] font-mono text-text-disabled">
              crystal(8%) + void(8%) + fire(5%) + water(5%)
            </p>
          </div>
        </div>

        {/* Cosmic Stars */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div className="h-48 bg-cosmic-void bg-cosmic-stars flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="font-display text-white text-lg">Cosmic Stars</p>
              <p className="text-xs text-text-secondary font-sans">Tiling star pattern</p>
            </div>
          </div>
          <div className="bg-cosmic-deep p-4 space-y-2">
            <p className="text-xs font-mono text-arcane-crystal/50">.bg-cosmic-stars</p>
            <p className="text-[10px] font-mono text-text-disabled">
              5 radial-gradient dots, 200x100px tile
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SHIMMER LOADING
// ============================================

function ShimmerDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.Loader className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Shimmer Loading</h2>
          <p className="text-sm font-sans text-text-muted">
            Content skeleton loading animation.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        {/* Shimmer card skeleton */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cosmic-elevated shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-lg bg-cosmic-elevated shimmer" />
            <div className="h-3 w-1/2 rounded-lg bg-cosmic-elevated shimmer" />
          </div>
        </div>

        <div className="h-32 rounded-xl bg-cosmic-elevated shimmer" />

        <div className="flex gap-3">
          <div className="h-8 w-20 rounded-lg bg-cosmic-elevated shimmer" />
          <div className="h-8 w-20 rounded-lg bg-cosmic-elevated shimmer" />
          <div className="h-8 w-20 rounded-lg bg-cosmic-elevated shimmer" />
        </div>

        <p className="text-xs font-mono text-arcane-crystal/50 text-center pt-2">.shimmer &mdash; linear-gradient sweep, 2s infinite</p>
      </div>
    </div>
  )
}

// ============================================
// INTERACTIVE GLOW CARD DEEP DIVE
// ============================================

function GlowCardDeepDive() {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-fire/10 flex items-center justify-center">
          <Icons.MousePointer2 className="w-4 h-4 text-arcane-fire" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Interactive Glow Card</h2>
          <p className="text-sm font-sans text-text-muted">
            Mouse-tracked radial gradient creates a spotlight effect. Move your cursor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live demo */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="glow-card rounded-2xl p-8 min-h-[250px] flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <motion.div
            variants={floatingOrb}
            animate="animate"
            className="w-16 h-16 rounded-full bg-arcane-crystal/10 flex items-center justify-center border border-arcane-crystal/20 shadow-glow-crystal"
          >
            <Icons.Sparkles className="w-8 h-8 text-arcane-crystal" />
          </motion.div>
          <h4 className="font-display text-white text-xl">Move Your Cursor</h4>
          <p className="text-sm text-text-secondary font-body text-center max-w-xs">
            The glow follows your mouse, creating an interactive spotlight on the card surface.
          </p>
        </div>

        {/* Technical breakdown */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest">How It Works</p>

          <div className="space-y-4 text-sm">
            <div className="bg-cosmic-void/50 rounded-xl p-4">
              <p className="font-mono text-arcane-crystal text-xs mb-2">CSS Structure</p>
              <div className="space-y-1 font-mono text-text-secondary text-xs">
                <p>.glow-card {'{'}</p>
                <p className="pl-4 text-text-muted">background: var(--glass-bg);</p>
                <p className="pl-4 text-text-muted">border: 1px solid var(--glass-border);</p>
                <p>{'}'}</p>
                <p className="mt-2">.glow-card<span className="text-arcane-fire">::before</span> {'{'}</p>
                <p className="pl-4 text-text-muted">radial-gradient(600px circle</p>
                <p className="pl-8 text-arcane-crystal">at var(--mouse-x) var(--mouse-y)</p>
                <p className="pl-4 text-text-muted">crystal/0.06, transparent 40%)</p>
                <p>{'}'}</p>
              </div>
            </div>

            <div className="bg-cosmic-void/50 rounded-xl p-4">
              <p className="font-mono text-arcane-crystal text-xs mb-2">JavaScript (onMouseMove)</p>
              <div className="space-y-1 font-mono text-text-secondary text-xs">
                <p><span className="text-arcane-void-bright">const</span> x = (clientX - left) / width * 100</p>
                <p><span className="text-arcane-void-bright">const</span> y = (clientY - top) / height * 100</p>
                <p>el.style.setProperty(<span className="text-arcane-gold">&apos;--mouse-x&apos;</span>, x + &apos;%&apos;)</p>
                <p>el.style.setProperty(<span className="text-arcane-gold">&apos;--mouse-y&apos;</span>, y + &apos;%&apos;)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// COSMIC ORB EFFECT
// ============================================

function CosmicOrbDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-void/10 flex items-center justify-center">
          <Icons.Moon className="w-4 h-4 text-arcane-void-bright" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Cosmic Orb</h2>
          <p className="text-sm font-sans text-text-muted">
            Decorative ambient orbs with blur, pulse, and float.
          </p>
        </div>
      </div>

      <div className="relative h-64 rounded-2xl overflow-hidden bg-cosmic-void border border-white/5">
        {/* Orbs */}
        <motion.div
          variants={floatingOrb}
          animate="animate"
          className="cosmic-orb absolute w-48 h-48 bg-arcane-crystal"
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div
          variants={floatingOrb}
          animate="animate"
          className="cosmic-orb absolute w-40 h-40 bg-arcane-void animation-delay-1000"
          style={{ top: '30%', right: '20%' }}
        />
        <motion.div
          variants={floatingOrb}
          animate="animate"
          className="cosmic-orb absolute w-32 h-32 bg-arcane-fire animation-delay-2000"
          style={{ bottom: '10%', left: '40%' }}
        />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="font-display text-white/80 text-lg">Ambient Orb Layer</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center text-xs font-mono text-text-muted">
        <span>.cosmic-orb &mdash; border-radius: 50%, filter: blur(60px), opacity: 0.4</span>
      </div>
    </div>
  )
}

// ============================================
// SCROLLBAR DEMO
// ============================================

function ScrollbarDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.Scroll className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Custom Scrollbar</h2>
          <p className="text-sm font-sans text-text-muted">
            Themed scrollbar for Webkit and Firefox browsers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 h-48 overflow-y-auto">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="text-sm text-text-secondary font-body py-2 border-b border-white/5">
              Through the {i + 1}th gate, the creator finds a deeper truth within the arc of creation.
            </p>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest">Scrollbar Styles</p>
          <div className="space-y-3 font-mono text-xs text-text-secondary">
            <div>
              <p className="text-arcane-crystal mb-1">::-webkit-scrollbar</p>
              <p className="text-text-muted pl-4">width: 6px</p>
            </div>
            <div>
              <p className="text-arcane-crystal mb-1">::-webkit-scrollbar-track</p>
              <p className="text-text-muted pl-4">background: cosmic-void</p>
            </div>
            <div>
              <p className="text-arcane-crystal mb-1">::-webkit-scrollbar-thumb</p>
              <p className="text-text-muted pl-4">gradient(void, crystal)</p>
            </div>
            <div>
              <p className="text-arcane-crystal mb-1">Firefox</p>
              <p className="text-text-muted pl-4">scrollbar-width: thin</p>
              <p className="text-text-muted pl-4">scrollbar-color: crystal/0.3 void</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PAGE
// ============================================

export default function DesignLabV4() {
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
        {/* === HERO === */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-6 min-h-[50vh] flex flex-col items-center justify-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="fire" className="font-sans">
            <Icons.Layers className="w-3 h-3 mr-1" />
            V4 &mdash; Effects
          </Badge>
        </motion.div>

        <motion.h1
          variants={heroTitle}
          className="text-fluid-4xl md:text-fluid-5xl font-display text-gradient-fire"
        >
          Glass & Glow Systems
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          className="text-fluid-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed"
        >
          The visual effects layer of Arcanea. Glass morphism, glow shadows,
          animated borders, cosmic backgrounds, and interactive light effects.
        </motion.p>
      </motion.section>

      {/* === GLASS MORPHISM === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <GlassMorphismShowcase />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === GLOW SHADOWS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <GlowShadowShowcase />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === BORDER GRADIENT === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <BorderGradientDemo />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === COSMIC BACKGROUNDS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <CosmicBackgroundsDemo />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SHIMMER LOADING === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <ShimmerDemo />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === INTERACTIVE GLOW CARD === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <GlowCardDeepDive />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === COSMIC ORB === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <CosmicOrbDemo />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SCROLLBAR === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <ScrollbarDemo />
      </motion.section>

        {/* === NAVIGATION === */}
        <motion.div
          {...fadeInViewport}
          variants={cosmicFadeInUp}
          className="flex items-center justify-between pt-8"
        >
          <Link href="/design-lab/v3">
            <Button variant="outline" size="lg" className="group">
              <Icons.ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              V3: Motion
            </Button>
          </Link>
          <Link href="/design-lab/v5">
            <Button variant="crystal" size="lg" className="group">
              V5: Layout
              <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
