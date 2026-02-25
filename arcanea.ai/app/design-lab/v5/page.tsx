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
  Layout,
  ArrowLeft,
  ArrowRight,
  Grid3X3,
  Ruler,
  Monitor,
  Smartphone,
  Tablet,
  Maximize2,
  Columns3,
  LayoutGrid,
  SeparatorHorizontal,
  BoxSelect,
  Move,
  AlignVerticalJustifyCenter,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-wind/5 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-earth/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

// ============================================
// BREAKPOINT DATA
// ============================================

const breakpoints = [
  { name: 'sm', width: '640px', icon: Smartphone, desc: 'Mobile landscape', color: 'arcane-crystal' },
  { name: 'md', width: '768px', icon: Tablet, desc: 'Tablet portrait', color: 'arcane-water' },
  { name: 'lg', width: '1024px', icon: Tablet, desc: 'Tablet landscape', color: 'arcane-void' },
  { name: 'xl', width: '1280px', icon: Monitor, desc: 'Desktop', color: 'arcane-fire' },
  { name: '2xl', width: '1400px', icon: Maximize2, desc: 'Wide desktop', color: 'arcane-gold' },
]

const spacingScale = [
  { name: '0', value: '0px' },
  { name: '0.5', value: '2px' },
  { name: '1', value: '4px' },
  { name: '1.5', value: '6px' },
  { name: '2', value: '8px' },
  { name: '3', value: '12px' },
  { name: '4', value: '16px' },
  { name: '5', value: '20px' },
  { name: '6', value: '24px' },
  { name: '8', value: '32px' },
  { name: '10', value: '40px' },
  { name: '12', value: '48px' },
  { name: '16', value: '64px' },
  { name: '18', value: '72px' },
  { name: '20', value: '80px' },
  { name: '24', value: '96px' },
]

const containerPadding = [
  { breakpoint: 'DEFAULT', padding: '1rem (16px)' },
  { breakpoint: 'sm', padding: '1.5rem (24px)' },
  { breakpoint: 'lg', padding: '2rem (32px)' },
]

// ============================================
// CONTAINER VISUALIZATION
// ============================================

function ContainerVisualization() {
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>('xl')

  const getContainerWidth = (bp: string) => {
    switch (bp) {
      case 'sm': return '640px'
      case 'md': return '768px'
      case 'lg': return '1024px'
      case 'xl': return '1280px'
      case '2xl': return '1400px'
      default: return '100%'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.Monitor className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Container & Breakpoints</h2>
          <p className="text-sm font-sans text-text-muted">
            Max-width container centered with responsive padding.
          </p>
        </div>
      </div>

      {/* Breakpoint selector */}
      <div className="flex flex-wrap gap-2">
        {breakpoints.map((bp) => {
          const Icon = bp.icon
          return (
            <button
              key={bp.name}
              onClick={() => setActiveBreakpoint(bp.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans transition-all ${
                activeBreakpoint === bp.name
                  ? 'bg-arcane-crystal/15 text-arcane-crystal border border-arcane-crystal/30'
                  : 'bg-white/5 text-text-secondary hover:text-white border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {bp.name}
              <span className="text-[10px] font-mono text-text-muted">{bp.width}</span>
            </button>
          )
        })}
      </div>

      {/* Visual representation */}
      <div className="glass rounded-2xl p-6 space-y-4">
        {/* Full viewport */}
        <div className="bg-cosmic-void/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-text-muted">Viewport (100%)</span>
            <span className="text-[10px] font-mono text-text-disabled">max-width: {getContainerWidth(activeBreakpoint)}</span>
          </div>

          {/* Container visualization */}
          <div className="relative">
            <div className="w-full h-24 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="h-20 rounded-lg bg-arcane-crystal/10 border border-arcane-crystal/20 flex items-center justify-center mx-auto"
                style={{
                  width: activeBreakpoint === 'sm' ? '45%'
                    : activeBreakpoint === 'md' ? '55%'
                    : activeBreakpoint === 'lg' ? '73%'
                    : activeBreakpoint === 'xl' ? '91%'
                    : '100%',
                }}
              >
                <div className="text-center">
                  <p className="text-sm font-mono text-arcane-crystal">.container</p>
                  <p className="text-[10px] font-mono text-text-muted">{getContainerWidth(activeBreakpoint)}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Container padding table */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {containerPadding.map((cp) => (
            <div
              key={cp.breakpoint}
              className="bg-cosmic-void/30 rounded-xl p-3 text-center border border-white/5"
            >
              <p className="text-xs font-mono text-arcane-crystal">{cp.breakpoint}</p>
              <p className="text-xs font-sans text-text-muted mt-1">{cp.padding}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// SPACING SCALE
// ============================================

function SpacingScale() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-water/10 flex items-center justify-center">
          <Icons.Ruler className="w-4 h-4 text-arcane-water" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Spacing Scale</h2>
          <p className="text-sm font-sans text-text-muted">
            Consistent spacing tokens from 0 to 96px. Plus custom values for large layouts.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-2">
        {spacingScale.map((space) => (
          <div
            key={space.name}
            className="flex items-center gap-4 group hover:bg-white/[0.02] rounded-lg px-2 py-1 -mx-2 transition-colors"
          >
            <span className="w-10 text-right text-xs font-mono text-arcane-crystal shrink-0">
              {space.name}
            </span>
            <div className="flex-1 relative h-6 flex items-center">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: space.value }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                className="h-4 rounded-sm bg-gradient-to-r from-arcane-crystal/40 to-arcane-water/30 border border-arcane-crystal/20"
              />
            </div>
            <span className="w-14 text-right text-[10px] font-mono text-text-muted shrink-0">
              {space.value}
            </span>
          </div>
        ))}

        {/* Custom additions */}
        <div className="border-t border-white/5 pt-4 mt-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest mb-3">Custom Spacing</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: '18', value: '4.5rem (72px)' },
              { name: '88', value: '22rem (352px)' },
              { name: '128', value: '32rem (512px)' },
              { name: '144', value: '36rem (576px)' },
            ].map((s) => (
              <div key={s.name} className="bg-cosmic-void/30 rounded-xl p-3 text-center border border-white/5">
                <p className="text-sm font-mono text-arcane-crystal">{s.name}</p>
                <p className="text-[10px] font-mono text-text-muted mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// GRID PATTERNS
// ============================================

function GridPatterns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-void/10 flex items-center justify-center">
          <Icons.LayoutGrid className="w-4 h-4 text-arcane-void-bright" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Grid Patterns</h2>
          <p className="text-sm font-sans text-text-muted">
            Common grid layouts used throughout the landing page and app.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Single column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="crystal" className="font-mono text-[10px]">1-col</Badge>
            <span className="text-xs font-sans text-text-muted">Full-width content sections</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="h-16 rounded-xl bg-arcane-crystal/5 border border-arcane-crystal/10 flex items-center justify-center">
              <span className="text-xs font-mono text-text-muted">grid-cols-1</span>
            </div>
          </div>
        </div>

        {/* Two column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="water" className="font-mono text-[10px]">2-col</Badge>
            <span className="text-xs font-sans text-text-muted">Content + sidebar, comparison layouts</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-arcane-water/5 border border-arcane-water/10 flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted">col {i}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-text-disabled">grid-cols-1 md:grid-cols-2 gap-3</p>
        </div>

        {/* Three column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="void" className="font-mono text-[10px]">3-col</Badge>
            <span className="text-xs font-sans text-text-muted">Feature cards, pricing, statistics</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-arcane-void/5 border border-arcane-void/10 flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted">col {i}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-text-disabled">grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3</p>
        </div>

        {/* Four column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="fire" className="font-mono text-[10px]">4-col</Badge>
            <span className="text-xs font-sans text-text-muted">Gallery grids, icon grids</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-arcane-fire/5 border border-arcane-fire/10 flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted">col {i}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-text-disabled">grid-cols-2 sm:grid-cols-4 gap-3</p>
        </div>

        {/* Asymmetric */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="font-mono text-[10px]">Asymmetric</Badge>
            <span className="text-xs font-sans text-text-muted">Hero with sidebar, content + image</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
            <div className="h-32 rounded-xl bg-arcane-gold/5 border border-arcane-gold/10 flex items-center justify-center">
              <span className="text-xs font-mono text-text-muted">2fr (main)</span>
            </div>
            <div className="h-32 rounded-xl bg-arcane-gold/5 border border-arcane-gold/10 flex items-center justify-center">
              <span className="text-xs font-mono text-text-muted">1fr (aside)</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-text-disabled">grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SECTION PADDING PATTERNS
// ============================================

function SectionPaddingPatterns() {
  const sections = [
    { name: 'Hero', vertical: 'py-20 lg:py-32', horizontal: 'px-4 sm:px-6 lg:px-8', desc: 'Landing hero with generous vertical space' },
    { name: 'Standard', vertical: 'py-16 lg:py-24', horizontal: 'px-4 sm:px-6 lg:px-8', desc: 'Default section spacing' },
    { name: 'Compact', vertical: 'py-8 lg:py-12', horizontal: 'px-4 sm:px-6 lg:px-8', desc: 'Dense information sections' },
    { name: 'Card Interior', vertical: 'p-6 sm:p-8', horizontal: '', desc: 'Inside glass cards' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-fire/10 flex items-center justify-center">
          <Icons.BoxSelect className="w-4 h-4 text-arcane-fire" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Section Padding Patterns</h2>
          <p className="text-sm font-sans text-text-muted">
            Consistent vertical rhythm across all landing page sections.
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {sections.map((section) => (
          <motion.div
            key={section.name}
            variants={staggerItem}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
              {/* Visual indicator */}
              <div className="sm:w-48 p-4 bg-cosmic-void/30 border-b sm:border-b-0 sm:border-r border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-white text-sm">{section.name}</p>
                  <p className="text-[10px] text-text-muted font-sans mt-1">{section.desc}</p>
                </div>
              </div>
              {/* Values */}
              <div className="flex-1 p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans text-text-muted w-16">Vertical</span>
                  <span className="text-xs font-mono text-arcane-crystal">{section.vertical}</span>
                </div>
                {section.horizontal && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans text-text-muted w-16">Horizontal</span>
                    <span className="text-xs font-mono text-arcane-water">{section.horizontal}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// SECTION DIVIDER
// ============================================

function SectionDividerDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.SeparatorHorizontal className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Section Divider</h2>
          <p className="text-sm font-sans text-text-muted">
            A single-pixel gradient line to separate content sections.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="font-body text-text-secondary">Content above the divider</p>
        </div>

        <div className="section-divider" />

        <div className="text-center space-y-2">
          <p className="font-body text-text-secondary">Content below the divider</p>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-xs font-mono text-text-muted text-center">
            .section-divider &mdash; height: 1px, linear-gradient(90deg, transparent, crystal/0.3, transparent)
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// RESPONSIVE PATTERNS
// ============================================

function ResponsivePatterns() {
  const [mockDevice, setMockDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  const deviceWidths = {
    mobile: 'w-[320px]',
    tablet: 'w-[480px]',
    desktop: 'w-full max-w-[640px]',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-gold/10 flex items-center justify-center">
          <Icons.Smartphone className="w-4 h-4 text-arcane-gold" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Responsive Mockups</h2>
          <p className="text-sm font-sans text-text-muted">
            See how a typical card layout adapts across breakpoints.
          </p>
        </div>
      </div>

      {/* Device selector */}
      <div className="flex gap-2">
        {[
          { id: 'mobile' as const, label: 'Mobile', icon: Smartphone },
          { id: 'tablet' as const, label: 'Tablet', icon: Tablet },
          { id: 'desktop' as const, label: 'Desktop', icon: Monitor },
        ].map((device) => (
          <button
            key={device.id}
            onClick={() => setMockDevice(device.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans transition-all ${
              mockDevice === device.id
                ? 'bg-arcane-gold/15 text-arcane-gold border border-arcane-gold/30'
                : 'bg-white/5 text-text-secondary hover:text-white border border-transparent'
            }`}
          >
            <device.icon className="w-4 h-4" />
            {device.label}
          </button>
        ))}
      </div>

      {/* Mockup viewport */}
      <div className="glass rounded-2xl p-6 flex justify-center overflow-hidden">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`${deviceWidths[mockDevice]} transition-all bg-cosmic-void rounded-xl border border-white/10 overflow-hidden`}
        >
          {/* Mock header */}
          <div className="h-10 glass-strong border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-arcane-crystal/30" />
            <div className="h-2 w-20 rounded-full bg-cosmic-elevated" />
          </div>

          {/* Mock content */}
          <div className="p-4 space-y-3">
            <div className="h-3 w-3/4 rounded-full bg-cosmic-elevated" />
            <div className="h-2 w-full rounded-full bg-cosmic-surface" />
            <div className="h-2 w-2/3 rounded-full bg-cosmic-surface" />

            <div className={`grid gap-3 mt-4 ${
              mockDevice === 'mobile' ? 'grid-cols-1' :
              mockDevice === 'tablet' ? 'grid-cols-2' :
              'grid-cols-3'
            }`}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-lg bg-cosmic-surface border border-white/5 flex items-center justify-center">
                  <div className="w-6 h-6 rounded bg-arcane-crystal/10" />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <div className="h-8 flex-1 rounded-lg bg-arcane-crystal/10 border border-arcane-crystal/20" />
              <div className="h-8 w-20 rounded-lg bg-cosmic-surface border border-white/5" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// SAFE AREA INSETS
// ============================================

function SafeAreaDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center">
          <Icons.Move className="w-4 h-4 text-arcane-crystal" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Safe Area Handling</h2>
          <p className="text-sm font-sans text-text-muted">
            Support for notched devices and bottom-bar browsers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest">Fixed Elements</p>
          <div className="space-y-3 font-mono text-xs text-text-secondary">
            <div>
              <p className="text-arcane-crystal mb-1">@media (max-width: 768px)</p>
              <p className="text-text-muted pl-4">.fixed {'{'}</p>
              <p className="text-text-muted pl-8">padding-left: env(safe-area-inset-left);</p>
              <p className="text-text-muted pl-8">padding-right: env(safe-area-inset-right);</p>
              <p className="text-text-muted pl-4">{'}'}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-xs font-sans text-text-muted uppercase tracking-widest">Footer Elements</p>
          <div className="space-y-3 font-mono text-xs text-text-secondary">
            <div>
              <p className="text-arcane-crystal mb-1">@supports (padding-bottom: env(...))</p>
              <p className="text-text-muted pl-4">footer {'{'}</p>
              <p className="text-text-muted pl-8">padding-bottom:</p>
              <p className="text-text-muted pl-12">env(safe-area-inset-bottom);</p>
              <p className="text-text-muted pl-4">{'}'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-3">
        <p className="text-xs font-sans text-text-muted uppercase tracking-widest">Touch Targets</p>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl border-2 border-dashed border-arcane-crystal/30 flex items-center justify-center">
            <span className="text-[10px] font-mono text-arcane-crystal">44px</span>
          </div>
          <p className="text-sm text-text-secondary font-sans">
            Minimum 44px touch target for all interactive elements on mobile.
          </p>
        </div>
        <p className="text-[10px] font-mono text-text-disabled">
          button, a, [role=&quot;button&quot;] {'{'} min-height: 44px {'}'}
        </p>
      </div>
    </div>
  )
}

// ============================================
// BORDER RADIUS SCALE
// ============================================

function BorderRadiusScale() {
  const radii = [
    { name: 'sm', value: 'calc(0.75rem - 4px)', display: '8px' },
    { name: 'md', value: 'calc(0.75rem - 2px)', display: '10px' },
    { name: 'lg', value: '0.75rem', display: '12px' },
    { name: '2xl', value: '1rem', display: '16px' },
    { name: '3xl', value: '1.5rem', display: '24px' },
    { name: '4xl', value: '2rem', display: '32px' },
    { name: 'full', value: '50%', display: '50%' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-arcane-void/10 flex items-center justify-center">
          <Icons.AlignVerticalJustifyCenter className="w-4 h-4 text-arcane-void-bright" />
        </div>
        <div>
          <h2 className="text-fluid-2xl font-display text-white">Border Radius Scale</h2>
          <p className="text-sm font-sans text-text-muted">
            Derived from the <span className="font-mono text-arcane-crystal/70">--radius</span> CSS variable (0.75rem).
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-6 items-end"
      >
        {radii.map((r) => (
          <motion.div key={r.name} variants={staggerItem} className="text-center space-y-2">
            <div
              className="w-20 h-20 bg-arcane-crystal/10 border border-arcane-crystal/20 mx-auto"
              style={{
                borderRadius: r.name === 'full' ? '50%' : r.display,
              }}
            />
            <p className="text-xs font-mono text-arcane-crystal">{r.name}</p>
            <p className="text-[10px] font-mono text-text-muted">{r.display}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// PAGE
// ============================================

export default function DesignLabV5() {
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
          <Badge variant="earth" className="font-sans">
            <Icons.Layout className="w-3 h-3 mr-1" />
            V5 &mdash; Layout
          </Badge>
        </motion.div>

        <motion.h1
          variants={heroTitle}
          className="text-fluid-4xl md:text-fluid-5xl font-display text-gradient-gold"
        >
          Spatial Grid & Spacing
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          className="text-fluid-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed"
        >
          The structural foundation of Arcanea. Containers, breakpoints, spacing scales,
          grid patterns, and responsive strategies that create harmony across every viewport.
        </motion.p>
      </motion.section>

      {/* === CONTAINER & BREAKPOINTS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <ContainerVisualization />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SPACING SCALE === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <SpacingScale />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === BORDER RADIUS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <BorderRadiusScale />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === GRID PATTERNS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <GridPatterns />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SECTION PADDING === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <SectionPaddingPatterns />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SECTION DIVIDER DEMO === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <SectionDividerDemo />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === RESPONSIVE PATTERNS === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <ResponsivePatterns />
      </motion.section>

      {/* Divider */}
      <div className="section-divider" />

      {/* === SAFE AREA === */}
      <motion.section {...fadeInViewport} variants={scrollReveal}>
        <SafeAreaDemo />
      </motion.section>

        {/* === NAVIGATION === */}
        <motion.div
          {...fadeInViewport}
          variants={cosmicFadeInUp}
          className="flex items-center justify-between pt-8"
        >
          <Link href="/design-lab/v4">
            <Button variant="outline" size="lg" className="group">
              <Icons.ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              V4: Effects
            </Button>
          </Link>
          <Link href="/design-lab/v6">
            <Button variant="gold" size="lg" className="group">
              V6: Guardians
              <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
