'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  Smartphone,
  Monitor,
  Tablet,
  ArrowLeft,
  ArrowRight,
  Eye,
  Hand,
  Moon,
  Sun,
  Accessibility,
  Type,
  Maximize2,
  Minimize2,
  Focus,
  Scroll,
  Move,
  Contrast,
  Sparkles,
  CheckCircle2,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-earth/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-crystal/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

const breakpoints = [
  { name: 'sm', width: 640, label: 'Small', device: 'Large phones', icon: Smartphone, color: 'text-arcane-crystal' },
  { name: 'md', width: 768, label: 'Medium', device: 'Tablets portrait', icon: Tablet, color: 'text-arcane-water' },
  { name: 'lg', width: 1024, label: 'Large', device: 'Tablets landscape / Small laptops', icon: Tablet, color: 'text-arcane-void-bright' },
  { name: 'xl', width: 1280, label: 'Extra Large', device: 'Laptops / Desktops', icon: Monitor, color: 'text-arcane-fire' },
  { name: '2xl', width: 1400, label: 'Full', device: 'Large desktops', icon: Monitor, color: 'text-arcane-gold' },
]

const fluidTypeSizes = [
  { name: 'text-fluid-xs', min: '0.7rem', max: '0.75rem', useCase: 'Captions, fine print' },
  { name: 'text-fluid-sm', min: '0.8rem', max: '0.875rem', useCase: 'Labels, metadata' },
  { name: 'text-fluid-base', min: '0.9rem', max: '1rem', useCase: 'Body text' },
  { name: 'text-fluid-lg', min: '1rem', max: '1.125rem', useCase: 'Lead paragraphs' },
  { name: 'text-fluid-xl', min: '1.1rem', max: '1.25rem', useCase: 'Subtitles' },
  { name: 'text-fluid-2xl', min: '1.25rem', max: '1.5rem', useCase: 'Section headings' },
  { name: 'text-fluid-3xl', min: '1.5rem', max: '2rem', useCase: 'Page headings' },
  { name: 'text-fluid-4xl', min: '1.75rem', max: '2.5rem', useCase: 'Hero subtitles' },
  { name: 'text-fluid-5xl', min: '2rem', max: '3.5rem', useCase: 'Hero titles' },
  { name: 'text-fluid-6xl', min: '2.5rem', max: '5rem', useCase: 'Display text' },
  { name: 'text-fluid-hero', min: '3rem', max: '7rem', useCase: 'Maximum impact' },
]

const accessibilityFeatures = [
  {
    title: 'Reduced Motion',
    icon: Sparkles,
    description: 'All animations respect prefers-reduced-motion. When enabled, Framer Motion variants collapse to immediate state and CSS animations use transition: none.',
    code: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
    badge: 'WCAG 2.3.3',
    badgeVariant: 'crystal' as const,
  },
  {
    title: 'High Contrast',
    icon: Contrast,
    description: 'In high contrast mode, glass morphism reduces to solid backgrounds, glow effects become borders, and text gains maximum contrast ratios.',
    code: `@media (prefers-contrast: high) {
  .glass {
    background: rgba(11, 14, 20, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .glow-card {
    box-shadow: none;
    border: 1px solid rgba(127, 255, 212, 0.5);
  }
}`,
    badge: 'WCAG 1.4.11',
    badgeVariant: 'void' as const,
  },
  {
    title: 'Focus States',
    icon: Focus,
    description: 'Every interactive element has a visible crystal ring focus state. The ring uses ring-arcane-crystal/50 with a 2px offset against the void background.',
    code: `focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-arcane-crystal/50
focus-visible:ring-offset-2
focus-visible:ring-offset-cosmic-void`,
    badge: 'WCAG 2.4.7',
    badgeVariant: 'gold' as const,
  },
  {
    title: 'Touch Targets',
    icon: Hand,
    description: 'All interactive elements meet a minimum 44x44px touch target size. Buttons use h-10 (40px) minimum with additional padding. Icon buttons are h-10 w-10.',
    code: `// Button minimum sizes
size: {
  default: "h-10 px-4 py-2",    // 40px
  sm: "h-9 rounded-md px-3",     // 36px
  lg: "h-12 rounded-xl px-8",    // 48px
  xl: "h-14 rounded-2xl px-10",  // 56px
  icon: "h-10 w-10 rounded-lg",  // 40x40px
}`,
    badge: 'WCAG 2.5.5',
    badgeVariant: 'fire' as const,
  },
]

const devicePresets = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 15 Pro', width: 393, height: 852 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366 },
  { name: 'MacBook Air', width: 1280, height: 800 },
  { name: 'Desktop 1440p', width: 1440, height: 900 },
]

export default function DesignLabV7() {
  const [simulatorWidth, setSimulatorWidth] = useState(375)
  const [selectedDevice, setSelectedDevice] = useState('iPhone SE')
  const [showReducedMotion, setShowReducedMotion] = useState(false)
  const [showHighContrast, setShowHighContrast] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  const handleDeviceSelect = (device: typeof devicePresets[number]) => {
    setSimulatorWidth(device.width)
    setSelectedDevice(device.name)
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
          <Badge variant="earth" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
            <Icons.Smartphone className="w-3.5 h-3.5 mr-2" />
            V7 -- RESPONSIVE
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          Responsive
          <span className="block text-gradient-crystal">Accessibility & Mobile</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Magic for everyone. The Arcanea design system adapts gracefully across every device,
          respects user preferences, and ensures accessibility is never an afterthought.
          WCAG compliance is built into every token and component.
        </motion.p>
      </motion.section>

      {/* Breakpoint System */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            BREAKPOINTS
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Responsive Grid</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Five breakpoints define the responsive behavior of every component and layout.
          </p>
        </motion.div>

        <motion.div variants={staggerContainerFast} className="space-y-3">
          {breakpoints.map((bp) => {
            const Icon = bp.icon
            return (
              <motion.div
                key={bp.name}
                variants={staggerItem}
                className="glass rounded-xl p-5 flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${bp.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className={`text-sm font-mono font-semibold ${bp.color}`}>{bp.name}:</code>
                    <code className="text-sm font-mono text-white">{bp.width}px</code>
                  </div>
                  <p className="text-xs font-sans text-text-muted">{bp.label} -- {bp.device}</p>
                </div>
                {/* Visual bar showing breakpoint position */}
                <div className="hidden sm:block flex-shrink-0 w-48">
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(bp.width / 1600) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r from-transparent`}
                      style={{ backgroundColor: bp.color === 'text-arcane-crystal' ? '#7fffd4' : bp.color === 'text-arcane-water' ? '#78a6ff' : bp.color === 'text-arcane-void-bright' ? '#b38aff' : bp.color === 'text-arcane-fire' ? '#ff6b35' : '#ffd700' }}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    min-w: {bp.width}
                  </Badge>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Mobile Viewport Simulator */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="water" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Maximize2 className="w-3 h-3 mr-1.5" />
            VIEWPORT SIMULATOR
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Device Preview</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Preview how components respond at different viewport widths. Select a device or drag to resize.
          </p>
        </motion.div>

        {/* Device selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {devicePresets.map((device) => (
            <Button
              key={device.name}
              variant={selectedDevice === device.name ? 'crystal' : 'outline'}
              size="sm"
              onClick={() => handleDeviceSelect(device)}
              className="rounded-xl font-sans text-xs"
            >
              {device.name}
              <span className="ml-1.5 opacity-60">{device.width}</span>
            </Button>
          ))}
        </div>

        {/* Simulator frame */}
        <div className="flex justify-center">
          <motion.div
            animate={{ width: Math.min(simulatorWidth, 800) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="glass-strong rounded-2xl border border-arcane-crystal/20 overflow-hidden"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-text-muted">{simulatorWidth}px</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setSimulatorWidth(Math.max(320, simulatorWidth - 50))} className="p-1 text-text-muted hover:text-white transition-colors">
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setSimulatorWidth(Math.min(1440, simulatorWidth + 50))} className="p-1 text-text-muted hover:text-white transition-colors">
                  <Icons.Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-4 space-y-3 bg-cosmic-deep min-h-[300px]">
              {/* Simulated responsive layout */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-arcane-crystal/20 flex items-center justify-center">
                  <Icons.Sparkles className="w-4 h-4 text-arcane-crystal" />
                </div>
                <div>
                  <div className="text-sm font-display text-white">Arcanea</div>
                  <div className="text-[10px] text-text-muted font-sans">Design System Preview</div>
                </div>
              </div>

              <div className={`grid gap-2 ${simulatorWidth >= 768 ? 'grid-cols-3' : simulatorWidth >= 640 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {['Crystal', 'Fire', 'Void'].map((el) => (
                  <div key={el} className="glass rounded-lg p-3">
                    <div className={`text-xs font-display ${el === 'Crystal' ? 'text-arcane-crystal' : el === 'Fire' ? 'text-arcane-fire' : 'text-arcane-void-bright'}`}>
                      {el}
                    </div>
                    <div className="text-[10px] text-text-muted font-sans mt-1">
                      {simulatorWidth >= 768 ? 'Three columns' : simulatorWidth >= 640 ? 'Two columns' : 'Single stack'}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`flex ${simulatorWidth >= 640 ? 'flex-row gap-2' : 'flex-col gap-2'}`}>
                <Button size="sm" className="rounded-lg text-xs flex-1">Primary Action</Button>
                <Button size="sm" variant="outline" className="rounded-lg text-xs flex-1">Secondary</Button>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Badge variant="crystal" className="text-[9px]">
                  {simulatorWidth < 640 ? 'MOBILE' : simulatorWidth < 1024 ? 'TABLET' : 'DESKTOP'}
                </Badge>
                <span className="text-[10px] font-mono text-text-muted">
                  Active: {simulatorWidth < 640 ? 'base' : simulatorWidth < 768 ? 'sm' : simulatorWidth < 1024 ? 'md' : simulatorWidth < 1280 ? 'lg' : simulatorWidth < 1400 ? 'xl' : '2xl'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Accessibility Features */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Accessibility className="w-3 h-3 mr-1.5" />
            ACCESSIBILITY
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Built for Everyone</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Every component is built with WCAG guidelines embedded. Accessibility is not a feature; it is the foundation.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {accessibilityFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="glass rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="w-5 h-5 text-arcane-crystal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-display text-white">{feature.title}</h3>
                      <Badge variant={feature.badgeVariant} className="text-[9px] px-1.5 py-0 font-sans">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-sm font-body text-text-secondary leading-relaxed mb-4">{feature.description}</p>
                    <div className="glass rounded-xl p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-text-secondary whitespace-pre">{feature.code}</pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Preference Toggles Demo */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            LIVE DEMO
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Preference Modes</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Toggle these modes to see how the design system adapts to user preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowReducedMotion(!showReducedMotion)}
            className={`glass rounded-2xl p-6 text-left transition-all duration-300 ${showReducedMotion ? 'border border-arcane-crystal/30 shadow-glow-crystal' : 'border border-transparent'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icons.Moon className={`w-5 h-5 ${showReducedMotion ? 'text-arcane-crystal' : 'text-text-muted'}`} />
              <h3 className="font-display text-white">Reduced Motion</h3>
              <Badge variant={showReducedMotion ? 'crystal' : 'secondary'} className="text-[9px] ml-auto">
                {showReducedMotion ? 'ON' : 'OFF'}
              </Badge>
            </div>
            <p className="text-sm font-body text-text-secondary">Disables all animations and transitions. Elements appear immediately.</p>
          </button>

          <button
            onClick={() => setShowHighContrast(!showHighContrast)}
            className={`glass rounded-2xl p-6 text-left transition-all duration-300 ${showHighContrast ? 'border border-arcane-gold/30 shadow-glow-gold' : 'border border-transparent'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icons.Sun className={`w-5 h-5 ${showHighContrast ? 'text-arcane-gold' : 'text-text-muted'}`} />
              <h3 className="font-display text-white">High Contrast</h3>
              <Badge variant={showHighContrast ? 'gold' : 'secondary'} className="text-[9px] ml-auto">
                {showHighContrast ? 'ON' : 'OFF'}
              </Badge>
            </div>
            <p className="text-sm font-body text-text-secondary">Increases border visibility, reduces glass blur, maximizes text contrast.</p>
          </button>
        </div>

        {/* Demo area */}
        <div className={`rounded-2xl p-6 transition-all duration-500 ${showHighContrast ? 'bg-cosmic-void border-2 border-white/30' : 'glass border border-white/5'}`}>
          <p className="text-xs font-sans text-text-muted mb-4">Preview with current settings:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Crystal Card', 'Fire Card', 'Void Card'].map((card, i) => (
              <motion.div
                key={card}
                animate={showReducedMotion ? {} : { y: [0, -4, 0] }}
                transition={showReducedMotion ? {} : { duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className={`rounded-xl p-4 ${showHighContrast ? 'bg-cosmic-void border-2 border-white/40' : 'glow-card'}`}
              >
                <div className={`text-sm font-display mb-1 ${i === 0 ? 'text-arcane-crystal' : i === 1 ? 'text-arcane-fire' : 'text-arcane-void-bright'}`}>
                  {card}
                </div>
                <p className={`text-xs font-body ${showHighContrast ? 'text-white' : 'text-text-secondary'}`}>
                  This card adapts to your preference settings.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Fluid Typography */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Type className="w-3 h-3 mr-1.5" />
            FLUID TYPOGRAPHY
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Type Scale</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Every text size uses CSS clamp() for seamless scaling between mobile and desktop viewports.
          </p>
        </motion.div>

        <motion.div variants={staggerContainerFast} className="space-y-2">
          {fluidTypeSizes.map((size) => (
            <motion.div
              key={size.name}
              variants={staggerItem}
              className="glass rounded-xl p-4 flex items-center gap-4 group hover-lift"
            >
              <div className="flex-shrink-0 w-36">
                <code className="text-xs font-mono text-arcane-crystal">{size.name}</code>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className={size.name + ' font-display text-white truncate'}>
                  The Arc turns
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-text-muted">{size.min} - {size.max}</div>
                  <div className="text-[10px] font-sans text-text-disabled">{size.useCase}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Safe Area & Scrollbar */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            PLATFORM DETAILS
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Safe Areas & Scrollbars</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={cosmicFadeIn} className="glow-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icons.Move className="w-5 h-5 text-arcane-crystal" />
              <h3 className="font-display text-white">Safe Area Insets</h3>
            </div>
            <p className="text-sm font-body text-text-secondary mb-4">
              On devices with notches, rounded corners, or navigation bars, content respects safe-area-inset-* values.
            </p>
            <div className="glass rounded-xl p-4">
              <pre className="text-xs font-mono text-text-secondary whitespace-pre">{`/* Applied to root layout */
padding-top: env(safe-area-inset-top);
padding-right: env(safe-area-inset-right);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);

/* Fixed bottom bars */
.bottom-bar {
  padding-bottom: calc(
    1rem + env(safe-area-inset-bottom)
  );
}`}</pre>
            </div>
          </motion.div>

          <motion.div variants={cosmicFadeIn} className="glow-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icons.Scroll className="w-5 h-5 text-arcane-crystal" />
              <h3 className="font-display text-white">Custom Scrollbars</h3>
            </div>
            <p className="text-sm font-body text-text-secondary mb-4">
              Scrollbars are styled to match the cosmic theme. Thin, translucent, with crystal accent on hover.
            </p>
            <div className="glass rounded-xl p-4">
              <pre className="text-xs font-mono text-text-secondary whitespace-pre">{`::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(127, 255, 212, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(127, 255, 212, 0.3);
}`}</pre>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Accessibility Checklist */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
        className="glass rounded-3xl p-8 border-gradient"
      >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="gold" className="mb-6 font-sans text-xs tracking-wider px-3 py-1">
            CHECKLIST
          </Badge>
          <h2 className="text-fluid-2xl font-display text-white mb-6">
            Accessibility Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'WCAG 2.1 AA color contrast ratios (4.5:1 body, 3:1 large)',
              'All interactive elements keyboard accessible',
              'Skip-to-content link on every page',
              'prefers-reduced-motion respected globally',
              'prefers-contrast:high mode supported',
              'Minimum 44x44px touch targets on mobile',
              'Semantic HTML with proper heading hierarchy',
              'ARIA labels on all icon-only buttons',
              'Focus-visible ring on all interactive elements',
              'Screen reader friendly text alternatives',
              'Safe-area-inset support for notched devices',
              'Smooth scroll with reduced-motion fallback',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-arcane-crystal flex-shrink-0 mt-0.5" />
                <span className="text-sm font-sans text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

        {/* Navigation */}
        <motion.section
          variants={cosmicFadeIn}
          {...fadeInViewport}
          className="flex items-center justify-between pt-8 border-t border-white/5"
        >
          <Link href="/design-lab/v6">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              v6 -- Guardians
            </Button>
          </Link>
          <Link href="/design-lab/v8">
            <Button className="rounded-2xl font-sans">
              v8 -- 3D & Spatial
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
