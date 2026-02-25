'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  fadeInViewport,
  floatingOrb,
} from '@/lib/animations'
import {
  Telescope,
  ArrowLeft,
  ArrowRight,
  Gem,
  Sparkles,
  Layers,
  Box,
  Palette,
  Component,
  Layout,
  Shield,
  Smartphone,
  Brain,
  Star,
  ChevronUp,
  Calendar,
  GitBranch,
  Users,
  Rocket,
  Clock,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Zap,
  Globe,
  Code2,
  Heart,
  Lightbulb,
  Target,
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
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-crystal/8 blur-[100px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
    </div>
  )
}

const timelineEvents = [
  {
    date: 'Jan 2026',
    title: 'Foundation',
    version: 'v1',
    desc: 'Color palette, typography scale, and font system established. The cosmic void was born.',
    icon: Palette,
    color: 'text-arcane-crystal',
    status: 'complete' as const,
  },
  {
    date: 'Jan 2026',
    title: 'Components',
    version: 'v2',
    desc: 'Badge and Button components with CVA elemental variants. The building blocks materialized.',
    icon: Component,
    color: 'text-arcane-water',
    status: 'complete' as const,
  },
  {
    date: 'Jan 2026',
    title: 'Motion Library',
    version: 'v3',
    desc: '40+ CSS animations and 30+ Framer Motion variants. The system learned to move.',
    icon: Sparkles,
    color: 'text-arcane-void-bright',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'Effects System',
    version: 'v4',
    desc: 'Glass morphism, glow text, gradient borders, cosmic backgrounds. Light filled the void.',
    icon: Layers,
    color: 'text-arcane-fire-bright',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'Layout Patterns',
    version: 'v5',
    desc: 'Container widths, responsive grids, section spacing. Space was given meaning.',
    icon: Layout,
    color: 'text-arcane-wind',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'Guardian Language',
    version: 'v6',
    desc: 'Ten Guardians mapped to design tokens. The mythology became the specification.',
    icon: Shield,
    color: 'text-arcane-gold',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'Responsive & A11y',
    version: 'v7',
    desc: 'Breakpoints, reduced motion, high contrast, touch targets. Magic made accessible.',
    icon: Smartphone,
    color: 'text-arcane-earth-bright',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: '3D Integration',
    version: 'v8',
    desc: 'Three.js patterns, performance tiers, XR setup. The system gained depth.',
    icon: Box,
    color: 'text-arcane-crystal',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'AI Patterns',
    version: 'v9',
    desc: 'Multi-LLM routing, Guardian personalities, generation UI. Intelligence woven in.',
    icon: Brain,
    color: 'text-arcane-void-bright',
    status: 'complete' as const,
  },
  {
    date: 'Feb 2026',
    title: 'Future Vision',
    version: 'v10',
    desc: 'Roadmap, community input, evolution plan. The journey continues.',
    icon: Telescope,
    color: 'text-arcane-gold',
    status: 'current' as const,
  },
]

const upcomingFeatures = [
  {
    title: 'Container Queries',
    desc: 'Component-level responsive design. Cards, panels, and widgets adapt based on their container width, not the viewport. The @container syntax replaces many media query patterns.',
    status: 'In Research',
    eta: 'Q2 2026',
    icon: Box,
    color: 'text-arcane-crystal',
    votes: 47,
  },
  {
    title: 'CSS View Transitions API',
    desc: 'Native page transitions without Framer Motion for route changes. Smooth cross-fade, morph, and slide transitions between pages using the browser\'s compositing engine.',
    status: 'Prototyping',
    eta: 'Q2 2026',
    icon: Sparkles,
    color: 'text-arcane-void-bright',
    votes: 62,
  },
  {
    title: 'Scroll-Driven Animations',
    desc: 'CSS-only scroll-linked animations replacing JavaScript IntersectionObserver patterns. Progress bars, parallax, and reveal effects driven purely by scroll position.',
    status: 'In Research',
    eta: 'Q2 2026',
    icon: ArrowUpRight,
    color: 'text-arcane-fire',
    votes: 38,
  },
  {
    title: 'CSS Nesting',
    desc: 'Native nesting support in Tailwind and custom CSS. Reduces class verbosity and improves component style co-location. Maps naturally to component boundaries.',
    status: 'Planned',
    eta: 'Q3 2026',
    icon: Layers,
    color: 'text-arcane-water',
    votes: 29,
  },
  {
    title: 'color-mix() Functions',
    desc: 'Dynamic color blending in CSS. Create Guardian color variants on the fly: color-mix(in oklch, var(--arcane-crystal) 70%, var(--arcane-void) 30%). No build step needed.',
    status: 'Prototyping',
    eta: 'Q2 2026',
    icon: Palette,
    color: 'text-arcane-gold',
    votes: 55,
  },
  {
    title: 'Tailwind v4 Patterns',
    desc: 'Next-generation Tailwind with Lightning CSS engine. Zero-config content detection, native CSS cascade layers, and dramatically faster builds.',
    status: 'Waiting for Release',
    eta: 'Q3 2026',
    icon: Zap,
    color: 'text-arcane-wind',
    votes: 71,
  },
]

const plannedComponents = [
  { name: 'Toast / Notification', desc: 'Elemental toasts with Guardian-themed variants', status: 'Designed' },
  { name: 'Modal / Dialog', desc: 'Glass morphism modals with portal rendering', status: 'Designed' },
  { name: 'Tabs', desc: 'Animated tabs with elemental indicators', status: 'Planned' },
  { name: 'Accordion', desc: 'Collapsible sections with smooth height animation', status: 'Planned' },
  { name: 'Tooltip', desc: 'Contextual hints with glow-card styling', status: 'Planned' },
  { name: 'Dropdown Menu', desc: 'Navigation menus with glass backdrop', status: 'Designed' },
  { name: 'Avatar', desc: 'User avatars with Guardian ring indicators', status: 'Planned' },
  { name: 'Progress Bar', desc: 'Elemental progress with frequency-based animation', status: 'Designed' },
  { name: 'Slider', desc: 'Range inputs with crystal thumb and glow track', status: 'Planned' },
  { name: 'Command Palette', desc: 'Global search with AI-powered suggestions', status: 'In Development' },
]

const allVersions = [
  { id: 'v1', label: 'Foundation', icon: Palette, color: 'text-arcane-crystal' },
  { id: 'v2', label: 'Components', icon: Component, color: 'text-arcane-water' },
  { id: 'v3', label: 'Motion', icon: Sparkles, color: 'text-arcane-void-bright' },
  { id: 'v4', label: 'Effects', icon: Layers, color: 'text-arcane-fire-bright' },
  { id: 'v5', label: 'Layout', icon: Layout, color: 'text-arcane-wind' },
  { id: 'v6', label: 'Guardians', icon: Shield, color: 'text-arcane-gold' },
  { id: 'v7', label: 'Responsive', icon: Smartphone, color: 'text-arcane-earth-bright' },
  { id: 'v8', label: '3D & Spatial', icon: Box, color: 'text-arcane-crystal' },
  { id: 'v9', label: 'AI Patterns', icon: Brain, color: 'text-arcane-void-bright' },
  { id: 'v10', label: 'Future Vision', icon: Telescope, color: 'text-arcane-gold' },
]

export default function DesignLabV10() {
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set())
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

  const handleVote = (title: string) => {
    setVotedFeatures(prev => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
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
            <Icons.Telescope className="w-3.5 h-3.5 mr-2" />
            V10 -- FUTURE VISION
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          Future Vision
          <span className="block text-gradient-gold">Roadmap & Evolution</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          The Arcanea design system is never finished -- it evolves with the platform,
          the mythology, and the community. This is where we&apos;ve been, where we&apos;re going,
          and how you can help shape what comes next. Building in public means building together.
        </motion.p>

        {/* Stats */}
        <motion.div variants={cosmicFadeIn} className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'Evolution Stages', value: '10', icon: GitBranch },
            { label: 'Design Tokens', value: '100+', icon: Palette },
            { label: 'Components', value: '20+', icon: Component },
            { label: 'Planned Features', value: '6', icon: Rocket },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
                <Icon className="w-4 h-4 text-arcane-gold" />
                <div className="text-left">
                  <div className="text-lg font-display text-gradient-gold">{stat.value}</div>
                  <div className="text-[10px] font-sans text-text-muted">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Clock className="w-3 h-3 mr-1.5" />
            TIMELINE
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Design System Evolution</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Every stage documented, every decision shared. The complete journey from first token to full platform.
          </p>
        </motion.div>

        <motion.div variants={staggerContainerSlow} className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-arcane-crystal via-arcane-void to-arcane-gold" />

          <div className="space-y-4">
            {timelineEvents.map((event, i) => {
              const Icon = event.icon
              const isCurrent = event.status === 'current'
              return (
                <motion.div
                  key={event.version}
                  variants={staggerItem}
                  className="flex items-start gap-4 pl-2"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : {}}
                      transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                        isCurrent
                          ? 'border-arcane-gold bg-arcane-gold/20 shadow-glow-gold'
                          : 'border-white/20 bg-cosmic-deep'
                      }`}
                    >
                      {event.status === 'complete' ? (
                        <CheckCircle2 className={`w-4 h-4 ${event.color}`} />
                      ) : (
                        <Circle className="w-4 h-4 text-arcane-gold animate-pulse" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <Link href={`/design-lab/${event.version}`} className="group flex-1">
                    <div className={`glow-card rounded-xl p-4 hover-lift transition-all ${isCurrent ? 'border border-arcane-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.1)]' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-text-muted">{event.date}</span>
                        <Badge variant={isCurrent ? 'gold' : 'secondary'} className="text-[9px]">{event.version.toUpperCase()}</Badge>
                        {isCurrent && <Badge variant="crystal" className="text-[9px]">CURRENT</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${event.color}`} />
                        <h3 className="text-base font-display text-white group-hover:text-arcane-crystal transition-colors">{event.title}</h3>
                      </div>
                      <p className="text-sm font-body text-text-secondary">{event.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.section>

      {/* Upcoming Features with Voting */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Rocket className="w-3 h-3 mr-1.5" />
            WHAT&apos;S NEXT
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Upcoming Features</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            Vote on what matters to you. Community input shapes the roadmap.
          </p>
        </motion.div>

        <motion.div variants={staggerContainerFast} className="space-y-3">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon
            const hasVoted = votedFeatures.has(feature.title)
            const displayVotes = feature.votes + (hasVoted ? 1 : 0)
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="glass rounded-2xl p-5 flex items-start gap-4 hover-lift"
              >
                <button
                  onClick={() => handleVote(feature.title)}
                  className={`flex-shrink-0 w-14 flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all duration-300 ${
                    hasVoted
                      ? 'bg-arcane-crystal/10 border border-arcane-crystal/30'
                      : 'bg-white/5 border border-white/10 hover:border-arcane-crystal/20'
                  }`}
                >
                  <ChevronUp className={`w-4 h-4 ${hasVoted ? 'text-arcane-crystal' : 'text-text-muted'}`} />
                  <span className={`text-sm font-mono ${hasVoted ? 'text-arcane-crystal' : 'text-text-secondary'}`}>
                    {displayVotes}
                  </span>
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${feature.color}`} />
                    <h3 className="text-base font-display text-white">{feature.title}</h3>
                    <Badge variant="secondary" className="text-[9px] font-mono">{feature.status}</Badge>
                  </div>
                  <p className="text-sm font-body text-text-secondary leading-relaxed mb-2">{feature.desc}</p>
                  <div className="flex items-center gap-2">
                    <Icons.Calendar className="w-3 h-3 text-text-muted" />
                    <span className="text-[10px] font-sans text-text-muted">Target: {feature.eta}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Planned Components */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Component className="w-3 h-3 mr-1.5" />
            COMPONENT ROADMAP
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Planned Components</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The next wave of components, each carrying elemental energy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plannedComponents.map((comp) => (
            <motion.div
              key={comp.name}
              variants={staggerItem}
              className="glow-card rounded-xl p-4 flex items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-display text-white">{comp.name}</h4>
                <p className="text-xs font-body text-text-secondary">{comp.desc}</p>
              </div>
              <Badge
                variant={
                  comp.status === 'In Development' ? 'crystal' :
                  comp.status === 'Designed' ? 'gold' : 'secondary'
                }
                className="text-[9px] flex-shrink-0"
              >
                {comp.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Building in Public Philosophy */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
        className="glass rounded-3xl p-8 lg:p-12 border-gradient"
      >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="crystal" className="mb-6 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Heart className="w-3 h-3 mr-1.5" />
            PHILOSOPHY
          </Badge>
          <h2 className="text-fluid-2xl font-display text-white mb-6">
            Building in Public
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Globe,
                title: 'Transparent Process',
                desc: 'Every design decision is documented. Every evolution stage is versioned and shared. The community watches the system grow in real time.',
              },
              {
                icon: Users,
                title: 'Community Driven',
                desc: 'Feature votes, feedback loops, and open discussions shape the roadmap. The design system belongs to everyone who uses it.',
              },
              {
                icon: Lightbulb,
                title: 'Learn by Building',
                desc: 'Each stage teaches design system principles. From color theory to 3D integration, the journey IS the documentation.',
              },
              {
                icon: Target,
                title: 'Opinionated, Not Rigid',
                desc: 'Strong defaults inspired by Arcanea\'s mythology, but every token can be overridden. The system serves creators, not the other way around.',
              },
              {
                icon: Code2,
                title: 'AI-Augmented Design',
                desc: 'Claude Code agents helped build these pages. The design system is itself a product of AI-human co-creation.',
              },
              {
                icon: Star,
                title: 'Mythology as Specification',
                desc: 'The lore isn\'t decoration -- it IS the design language. Guardians define color palettes. Frequencies set animation timing. Elements shape UI regions.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-arcane-crystal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-arcane-crystal" />
                  </div>
                  <div>
                    <h4 className="font-display text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-sm font-body text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.section>

      {/* Retrospective: All Versions */}
      <motion.section
        variants={staggerContainer}
        {...fadeInViewport}
      >
        <motion.div variants={cosmicFadeIn} className="text-center mb-10">
          <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
            <Icons.Gem className="w-3 h-3 mr-1.5" />
            RETROSPECTIVE
          </Badge>
          <h2 className="text-fluid-3xl font-display text-white mb-3">Explore Every Stage</h2>
          <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
            The complete Design Lab collection. Start anywhere, explore everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {allVersions.map((v) => {
            const Icon = v.icon
            return (
              <Link key={v.id} href={`/design-lab/${v.id}`}>
                <motion.div
                  variants={staggerItem}
                  className="glow-card rounded-xl p-4 text-center hover-lift group"
                  whileHover={{ y: -4 }}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${v.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-xs font-mono text-text-muted mb-1">{v.id}</div>
                  <div className="text-sm font-display text-white group-hover:text-arcane-crystal transition-colors">{v.label}</div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        variants={cosmicFadeIn}
        {...fadeInViewport}
        className="text-center py-8"
      >
        <h2 className="text-fluid-2xl font-display text-white mb-4">
          The Arc Turns
        </h2>
        <p className="text-fluid-base font-body text-text-secondary max-w-xl mx-auto mb-8 italic">
          &quot;Enter seeking, leave transformed, return whenever needed.&quot;
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/design-lab">
            <Button className="rounded-2xl font-sans">
              <Icons.Gem className="w-4 h-4 mr-2" />
              Back to Design Lab Hub
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              Return to Arcanea
            </Button>
          </Link>
        </div>
      </motion.section>

        {/* Navigation */}
        <motion.section
          variants={cosmicFadeIn}
          {...fadeInViewport}
          className="flex items-center justify-between pt-8 border-t border-white/5"
        >
          <Link href="/design-lab/v9">
            <Button variant="outline" className="rounded-2xl font-sans">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              v9 -- AI Patterns
            </Button>
          </Link>
          <Link href="/design-lab">
            <Button variant="outline" className="rounded-2xl font-sans">
              Overview
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
