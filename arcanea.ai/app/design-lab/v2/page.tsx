'use client'

import { useState, useRef, useEffect } from 'react'
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
  Component,
  ArrowLeft,
  ArrowRight,
  MousePointer2,
  Sparkles,
  Star,
  Heart,
  Zap,
  Send,
  Search,
  Shield,
  Crown,
  Eye,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Moon,
  Layers,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-water/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

// ============================================
// DATA
// ============================================

const buttonVariants = [
  { variant: 'default' as const, label: 'Default', desc: 'Crystal-water gradient with glow' },
  { variant: 'crystal' as const, label: 'Crystal', desc: 'Solid arcane-crystal' },
  { variant: 'fire' as const, label: 'Fire', desc: 'Fire-orange gradient' },
  { variant: 'gold' as const, label: 'Gold', desc: 'Solid arcane-gold' },
  { variant: 'void' as const, label: 'Void', desc: 'Solid arcane-void' },
  { variant: 'outline' as const, label: 'Outline', desc: 'Transparent with border' },
  { variant: 'secondary' as const, label: 'Secondary', desc: 'Subtle background' },
  { variant: 'ghost' as const, label: 'Ghost', desc: 'No background' },
  { variant: 'destructive' as const, label: 'Destructive', desc: 'Red danger action' },
  { variant: 'link' as const, label: 'Link', desc: 'Text with underline' },
]

const buttonSizes = [
  { size: 'sm' as const, label: 'Small', desc: 'h-9 px-3' },
  { size: 'default' as const, label: 'Default', desc: 'h-10 px-4' },
  { size: 'lg' as const, label: 'Large', desc: 'h-12 px-8' },
  { size: 'xl' as const, label: 'Extra Large', desc: 'h-14 px-10' },
  { size: 'icon' as const, label: 'Icon', desc: 'h-10 w-10' },
]

const badgeVariants = [
  { variant: 'default' as const, label: 'Default' },
  { variant: 'secondary' as const, label: 'Secondary' },
  { variant: 'outline' as const, label: 'Outline' },
  { variant: 'crystal' as const, label: 'Crystal' },
  { variant: 'gold' as const, label: 'Gold' },
  { variant: 'void' as const, label: 'Void' },
  { variant: 'fire' as const, label: 'Fire' },
  { variant: 'water' as const, label: 'Water' },
  { variant: 'earth' as const, label: 'Earth' },
  { variant: 'destructive' as const, label: 'Destructive' },
]

// ============================================
// SUB-COMPONENTS
// ============================================

function GlowCardDemo() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { icon: Sparkles, title: 'Crystal Gate', desc: 'The path of creation begins.' },
        { icon: Flame, title: 'Fire Gate', desc: 'Power rises through will.' },
        { icon: Moon, title: 'Void Gate', desc: 'Potential in the darkness.' },
      ].map((card, i) => (
        <div
          key={i}
          onMouseMove={handleMouseMove}
          className="glow-card p-6 rounded-2xl cursor-pointer"
        >
          <card.icon className="w-8 h-8 text-arcane-crystal mb-4" />
          <h4 className="font-display text-white mb-2">{card.title}</h4>
          <p className="text-sm text-text-secondary font-body">{card.desc}</p>
        </div>
      ))}
    </div>
  )
}

function PlaygroundSection() {
  const [selectedVariant, setSelectedVariant] = useState<string>('crystal')
  const [selectedSize, setSelectedSize] = useState<string>('default')
  const [withIcon, setWithIcon] = useState(true)
  const [withBadge, setWithBadge] = useState(true)

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Icons.MousePointer2 className="w-5 h-5 text-arcane-crystal" />
        <h3 className="text-fluid-xl font-display text-white">Component Playground</h3>
      </div>
      <p className="text-sm text-text-secondary font-sans">
        Mix and match variants, sizes, icons, and badges to compose components live.
      </p>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Variant picker */}
        <div className="space-y-3">
          <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
            Variant
          </label>
          <div className="flex flex-wrap gap-2">
            {['default', 'crystal', 'fire', 'gold', 'void', 'outline', 'secondary', 'ghost'].map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
                  selectedVariant === v
                    ? 'bg-arcane-crystal/20 text-arcane-crystal border border-arcane-crystal/30'
                    : 'bg-white/5 text-text-secondary hover:text-white border border-transparent'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Size picker */}
        <div className="space-y-3">
          <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {['sm', 'default', 'lg', 'xl'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
                  selectedSize === s
                    ? 'bg-arcane-crystal/20 text-arcane-crystal border border-arcane-crystal/30'
                    : 'bg-white/5 text-text-secondary hover:text-white border border-transparent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setWithIcon(!withIcon)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans transition-all ${
            withIcon
              ? 'bg-arcane-crystal/10 text-arcane-crystal border border-arcane-crystal/20'
              : 'bg-white/5 text-text-muted border border-white/5'
          }`}
        >
          <Icons.Zap className="w-3.5 h-3.5" /> Icon
        </button>
        <button
          onClick={() => setWithBadge(!withBadge)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans transition-all ${
            withBadge
              ? 'bg-arcane-crystal/10 text-arcane-crystal border border-arcane-crystal/20'
              : 'bg-white/5 text-text-muted border border-white/5'
          }`}
        >
          <Icons.Star className="w-3.5 h-3.5" /> Badge
        </button>
      </div>

      {/* Preview */}
      <div className="bg-cosmic-void/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 min-h-[160px] border border-white/5">
        <div className="flex items-center gap-3">
          {withBadge && (
            <Badge variant="crystal" className="font-sans text-[10px]">NEW</Badge>
          )}
          <Button
            variant={selectedVariant as any}
            size={selectedSize as any}
          >
            {withIcon && <Icons.Sparkles className="w-4 h-4 mr-2" />}
            Arcanea Button
          </Button>
        </div>

        {/* Code hint */}
        <p className="text-xs font-mono text-text-disabled text-center">
          {'<Button variant="'}<span className="text-arcane-crystal">{selectedVariant}</span>
          {'" size="'}<span className="text-arcane-crystal">{selectedSize}</span>{'" />'}
        </p>
      </div>
    </div>
  )
}

// ============================================
// PAGE
// ============================================

export default function DesignLabV2() {
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
          <Badge variant="water" className="font-sans">
            <Icons.Component className="w-3 h-3 mr-1" />
            V2 &mdash; Components
          </Badge>
        </motion.div>

        <motion.h1
          variants={heroTitle}
          className="text-fluid-4xl md:text-fluid-5xl font-display text-gradient-crystal"
        >
          Buttons, Badges & Cards
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          className="text-fluid-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed"
        >
          The interactive building blocks of Arcanea. Every component is crafted with
          elemental variants, responsive sizing, and cosmic glow effects.
        </motion.p>
      </motion.section>

      {/* === BUTTON VARIANTS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
              <Icons.MousePointer2 className="w-4 h-4 text-arcane-crystal" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Button Variants</h2>
              <p className="text-sm font-sans text-text-muted">
                10 variants for every context. Hover to see interactions.
              </p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {buttonVariants.map(({ variant, label, desc }) => (
              <motion.div
                key={variant}
                variants={staggerItem}
                className="glass rounded-xl p-5 flex items-center gap-4 group hover:border-arcane-crystal/20 transition-all"
              >
                <Button variant={variant} className="flex-shrink-0">
                  {label}
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sans font-medium text-white">{label}</p>
                  <p className="text-xs text-text-muted truncate">{desc}</p>
                  <p className="text-[10px] font-mono text-arcane-crystal/50 mt-1">
                    variant=&quot;{variant}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === BUTTON SIZES === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-water/10 flex items-center justify-center">
              <Icons.Layers className="w-4 h-4 text-arcane-water" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Button Sizes</h2>
              <p className="text-sm font-sans text-text-muted">
                5 sizes from compact to hero call-to-action.
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 space-y-6">
            <div className="flex flex-wrap items-end gap-4">
              {buttonSizes.map(({ size, label, desc }) => (
                <div key={size} className="text-center space-y-2">
                  <Button variant="crystal" size={size}>
                    {size === 'icon' ? <Icons.Star className="w-4 h-4" /> : label}
                  </Button>
                  <p className="text-[10px] font-mono text-text-muted">{desc}</p>
                </div>
              ))}
            </div>

            {/* With icons across sizes */}
            <div className="border-t border-white/5 pt-6">
              <p className="text-xs font-sans text-text-muted mb-4 uppercase tracking-widest">With Icons</p>
              <div className="flex flex-wrap items-end gap-4">
                <Button size="sm"><Icons.Send className="w-3 h-3 mr-1.5" />Send</Button>
                <Button size="default" variant="crystal"><Icons.Heart className="w-4 h-4 mr-2" />Favorite</Button>
                <Button size="lg" variant="fire"><Icons.Zap className="w-4 h-4 mr-2" />Power Up</Button>
                <Button size="xl" variant="gold"><Icons.Crown className="w-5 h-5 mr-2" />Ascend</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === BADGE VARIANTS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-gold/10 flex items-center justify-center">
              <Icons.Shield className="w-4 h-4 text-arcane-gold" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Badge Variants</h2>
              <p className="text-sm font-sans text-text-muted">
                10 badge styles for status, categories, and labels.
              </p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {badgeVariants.map(({ variant, label }) => (
              <motion.div key={variant} variants={staggerItem}>
                <Badge variant={variant} className="font-sans text-sm px-4 py-1.5">
                  {label}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Badge compositions */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <p className="text-xs font-sans text-text-muted uppercase tracking-widest">Common Compositions</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="crystal" className="font-sans text-xs">
                  <Icons.Sparkles className="w-3 h-3 mr-1" />Active
                </Badge>
                <span className="text-xs text-text-muted font-sans">Status indicator</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="fire" className="font-sans text-xs">
                  <Icons.Flame className="w-3 h-3 mr-1" />Hot
                </Badge>
                <span className="text-xs text-text-muted font-sans">Trending tag</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="font-sans text-xs">
                  <Icons.Crown className="w-3 h-3 mr-1" />Premium
                </Badge>
                <span className="text-xs text-text-muted font-sans">Tier label</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="void" className="font-sans text-xs">v2.0</Badge>
                <span className="text-xs text-text-muted font-sans">Version number</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="water" className="font-sans text-xs">
                  <Icons.Droplets className="w-3 h-3 mr-1" />Atlantean
                </Badge>
                <span className="text-xs text-text-muted font-sans">Academy affiliation</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === GLOW CARDS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-void/10 flex items-center justify-center">
              <Icons.Sparkles className="w-4 h-4 text-arcane-void-bright" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Glow Card</h2>
              <p className="text-sm font-sans text-text-muted">
                Interactive mouse-tracking glow. Move your cursor across the cards.
              </p>
            </div>
          </div>

          <GlowCardDemo />

          <p className="text-xs font-mono text-text-disabled text-center">
            .glow-card &mdash; Uses CSS <span className="text-arcane-crystal/50">--mouse-x</span> / <span className="text-arcane-crystal/50">--mouse-y</span> custom properties with radial-gradient
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === GLASS MORPHISM === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
              <Icons.Eye className="w-4 h-4 text-arcane-crystal" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Glass Morphism</h2>
              <p className="text-sm font-sans text-text-muted">
                Three tiers of translucency layered over cosmic backgrounds.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden p-1">
            {/* Colorful background behind glass */}
            <div className="absolute inset-0 bg-cosmic-mesh">
              <div className="absolute top-8 left-12 w-32 h-32 rounded-full bg-arcane-crystal/30 blur-3xl" />
              <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-arcane-void/30 blur-3xl" />
              <div className="absolute bottom-8 left-1/2 w-36 h-36 rounded-full bg-arcane-fire/20 blur-3xl" />
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 p-8">
              {[
                { className: 'glass-subtle', name: 'Subtle', blur: '8px', opacity: '0.4', border: '0.08' },
                { className: 'glass', name: 'Standard', blur: '16px', opacity: '0.7', border: '0.15' },
                { className: 'glass-strong', name: 'Strong', blur: '24px', opacity: '0.85', border: '0.2' },
              ].map((tier) => (
                <div key={tier.name} className={`${tier.className} rounded-2xl p-6 space-y-3`}>
                  <h4 className="font-display text-white text-lg">{tier.name}</h4>
                  <p className="text-sm text-text-secondary font-body">
                    Glass morphism with controlled depth and blur.
                  </p>
                  <div className="space-y-1 pt-2 border-t border-white/10">
                    <p className="text-[10px] font-mono text-text-muted">blur: {tier.blur}</p>
                    <p className="text-[10px] font-mono text-text-muted">opacity: {tier.opacity}</p>
                    <p className="text-[10px] font-mono text-text-muted">border: {tier.border}</p>
                  </div>
                  <p className="text-xs font-mono text-arcane-crystal/50">.{tier.className}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === INPUT COMPONENTS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-arcane-water/10 flex items-center justify-center">
              <Icons.Search className="w-4 h-4 text-arcane-water" />
            </div>
            <div>
              <h2 className="text-fluid-2xl font-display text-white">Input Components</h2>
              <p className="text-sm font-sans text-text-muted">
                Styled form elements with cosmic theming and focus states.
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
                Text Input
              </label>
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search the Arcanea Library..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-cosmic-void/50 border border-white/10 text-text-primary font-sans text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/40 focus:ring-2 focus:ring-arcane-crystal/20 transition-all"
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
                Textarea
              </label>
              <textarea
                placeholder="Speak your incantation..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-cosmic-void/50 border border-white/10 text-text-primary font-body text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/40 focus:ring-2 focus:ring-arcane-crystal/20 transition-all resize-none"
              />
            </div>

            {/* Select-like buttons row */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">
                Element Selection
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Fire', icon: Flame, color: 'arcane-fire' },
                  { label: 'Water', icon: Droplets, color: 'arcane-water' },
                  { label: 'Earth', icon: Mountain, color: 'arcane-earth' },
                  { label: 'Wind', icon: Wind, color: 'arcane-wind' },
                  { label: 'Void', icon: Moon, color: 'arcane-void' },
                ].map((el) => (
                  <button
                    key={el.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cosmic-void/50 border border-white/10 text-text-secondary font-sans text-sm hover:border-arcane-crystal/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-arcane-crystal/20 transition-all"
                  >
                    <el.icon className="w-4 h-4" style={{ color: `var(--${el.color})` }} />
                    {el.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === PLAYGROUND === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <PlaygroundSection />
      </motion.section>

        {/* === NAVIGATION === */}
        <motion.div
          {...fadeInViewport}
          variants={cosmicFadeInUp}
          className="flex items-center justify-between pt-8"
        >
          <Link href="/design-lab/v1">
            <Button variant="outline" size="lg" className="group">
              <Icons.ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              V1: Foundation
            </Button>
          </Link>
          <Link href="/design-lab/v3">
            <Button variant="crystal" size="lg" className="group">
              V3: Motion
              <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
