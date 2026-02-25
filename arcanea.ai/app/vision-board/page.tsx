'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  scrollReveal,
  scrollRevealScale,
  staggerContainer,
  staggerItem,
  cardHover,
  heroTitle,
  heroSubtitle,
  heroCTA,
  floatingOrb,
} from '@/lib/animations'
import {
  grandVision,
  ecosystemStats,
  visionAreas,
  timelinePhases,
  productSpaces,
  tenGates,
  magicRanks,
  techStack,
  differentiators,
  transformations,
} from '@/lib/vision-board/data'
import type { LucideIcon } from 'lucide-react'
import {
  Sparkles, ArrowRight, ArrowDown, Eye, Globe, BookOpen, Brain, Flame,
  Smartphone, Users, GraduationCap, Crown, Zap, Heart, Compass, Swords,
  Map, Castle, Hammer, ChevronRight, Code, Layers, Star, Target, Rocket,
  Shield, Palette, Cpu, Database, Cloud, Monitor, ChevronDown,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  castle: Castle, brain: Brain, hammer: Hammer, smartphone: Smartphone,
  globe: Globe, book: BookOpen, users: Users, graduation: GraduationCap,
  home: Castle, bug: Shield, school: GraduationCap, anvil: Hammer,
  crown: Crown, scroll: BookOpen, sparkles: Sparkles, heart: Heart,
  compass: Compass, sword: Swords, map: Map,
}

// ============================================
// CSS PARTICLE FIELD (pure CSS, no canvas)
// ============================================
function ParticleField({ count = 40, color = 'crystal' }: { count?: number; color?: string }) {
  const colorMap: Record<string, string> = {
    crystal: 'bg-arcane-crystal',
    gold: 'bg-arcane-gold',
    fire: 'bg-arcane-fire',
    void: 'bg-arcane-void',
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1
        const left = Math.random() * 100
        const delay = Math.random() * 20
        const duration = Math.random() * 20 + 15
        return (
          <div
            key={i}
            className={`absolute rounded-full ${colorMap[color] || colorMap.crystal} opacity-20`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: '-5%',
              animation: `float-up ${duration}s ${delay}s linear infinite`,
            }}
          />
        )
      })}
    </div>
  )
}

// ============================================
// 3D TILT CARD
// ============================================
function TiltCard({ children, className = '', intensity = 8 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 })

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value, isInView }: { value: string; isInView: boolean }) {
  const numericPart = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const [count, setCount] = useState(0)
  const target = parseInt(numericPart) || 0

  useEffect(() => {
    if (!isInView || target === 0) return
    let frame: number
    const start = performance.now()
    const duration = 2000
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  return <span>{target > 0 ? count : value.replace(suffix, '')}{suffix}</span>
}

// ============================================
// CINEMATIC HERO
// ============================================
function VisionHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Multi-layer parallax background */}
      <motion.div style={{ y: bgY, scale }} className="absolute inset-0">
        <Image
          src="/vision-board/hero-cinematic.png"
          alt="Arcanea Vision"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Cinematic color grading overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void/70 via-cosmic-void/30 to-cosmic-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-arcane-crystal/5 via-transparent to-arcane-gold/5" />
        <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-blue-900/20 via-transparent to-amber-900/10" />
      </motion.div>

      {/* Floating energy orbs with depth */}
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[15%] left-[15%] w-80 h-80 rounded-full bg-arcane-crystal/8 blur-[100px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-arcane-gold/6 blur-[120px]" />
      <motion.div variants={floatingOrb} animate="animate" className="absolute top-[60%] left-[60%] w-64 h-64 rounded-full bg-arcane-fire/4 blur-[80px]" />

      <ParticleField count={60} color="crystal" />

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      <motion.div ref={heroRef} style={{ y: contentY, opacity }} className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div variants={heroTitle} initial="hidden" animate="visible">
          <Badge variant="gold" className="mb-8 text-sm font-sans backdrop-blur-xl border-arcane-gold/30 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
            <Eye className="w-4 h-4 mr-2" />
            THE ARCANEA VISION BOARD
          </Badge>
        </motion.div>

        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="text-fluid-hero font-display text-white mb-8 leading-[1.05] tracking-tight"
          style={{ textShadow: '0 0 80px rgba(127,255,212,0.15), 0 4px 20px rgba(0,0,0,0.5)' }}
        >
          A Living Mythology
          <span className="block text-gradient-gold mt-2" style={{ textShadow: 'none' }}>
            for the Age of Creation
          </span>
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="text-fluid-xl text-text-secondary/90 max-w-3xl mx-auto mb-16 font-body leading-relaxed"
        >
          {grandVision.mission}
        </motion.p>

        {/* Premium stat cards with 3D depth */}
        <motion.div
          variants={heroCTA}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-5 mb-20"
        >
          {ecosystemStats.map((stat, i) => (
            <TiltCard key={stat.label} intensity={12}>
              <div className="glass-strong rounded-2xl px-7 py-5 min-w-[150px] border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="text-3xl font-display text-gradient-crystal mb-1">
                  <AnimatedCounter value={stat.value} isInView={isHeroInView} />
                </div>
                <div className="text-xs text-text-muted font-sans uppercase tracking-wider">{stat.label}</div>
                <div className="text-[10px] text-text-muted/50 font-body mt-1">{stat.description}</div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div
          variants={heroCTA}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-10 h-10 text-arcane-crystal/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// VISION AREAS (Premium 3D Cards)
// ============================================
function VisionAreasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/40 to-cosmic-void" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-arcane-crystal/20 to-transparent" />
      <ParticleField count={25} color="crystal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="crystal" className="mb-6 text-sm font-sans border-arcane-crystal/20 shadow-[0_0_20px_rgba(127,255,212,0.1)]">
            <Layers className="w-4 h-4 mr-2" />
            DEVELOPMENT AREAS
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            Eight Realms of
            <span className="block text-gradient-crystal">Development</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            Everything we build, organized by domain. Each area has its own Guardian, its own element, and its own destiny.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
          {visionAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || Sparkles
            const isExpanded = expandedId === area.id

            return (
              <TiltCard key={area.id} intensity={4} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 8 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => setExpandedId(isExpanded ? null : area.id)}
                  className="group relative h-full rounded-2xl p-8 cursor-pointer border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(127,255,212,0.06)] transition-shadow duration-500"
                >
                  {/* Hover gradient glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`} />
                  {/* Top edge highlight */}
                  <div className={`absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent ${area.gradient.includes('crystal') ? 'via-arcane-crystal/30' : area.gradient.includes('fire') ? 'via-arcane-fire/30' : area.gradient.includes('gold') ? 'via-arcane-gold/30' : 'via-arcane-void/30'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative flex items-start gap-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative shrink-0 p-3.5 rounded-2xl bg-gradient-to-br ${area.gradient} shadow-lg`}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      {/* Icon glow */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${area.gradient} blur-xl opacity-40`} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-display text-white group-hover:text-arcane-crystal transition-colors duration-300">
                          {area.title}
                        </h3>
                        <Badge
                          variant={area.status === 'active' ? 'crystal' : area.status === 'building' ? 'fire' : area.status === 'planned' ? 'water' : 'void'}
                          className="text-[10px] uppercase tracking-widest"
                        >
                          {area.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-arcane-gold/60 font-body italic mb-2">{area.tagline}</p>
                      <p className="text-text-secondary font-body leading-relaxed text-sm mb-4">{area.description}</p>

                      {/* Premium progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-text-muted mb-1.5">
                          <span className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${area.gradient}`} />
                            {area.guardianAlignment}
                          </span>
                          <span className="font-mono text-arcane-crystal/70">{area.progress}%</span>
                        </div>
                        <div className="h-2 bg-cosmic-surface/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${area.gradient} relative`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${area.progress}%` } : {}}
                            transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          >
                            {/* Shimmer effect on progress bar */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Expandable features */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/5">
                              {area.keyFeatures.map((feature, fi) => (
                                <motion.div
                                  key={feature}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: fi * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-text-secondary"
                                >
                                  <ChevronRight className="w-3 h-3 mt-1.5 text-arcane-crystal/50 shrink-0" />
                                  <span>{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap">
                              {area.repositories.map((repo) => (
                                <Badge key={repo} variant="crystal" className="text-[10px]">{repo}</Badge>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center text-xs text-arcane-crystal/40 mt-3 gap-1 group-hover:text-arcane-crystal/60 transition-colors">
                        <span>{isExpanded ? 'Collapse' : 'Expand details'}</span>
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="w-3 h-3" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CINEMATIC INFOGRAPHIC GALLERY
// ============================================
function InfographicSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const infographics = [
    { src: '/vision-board/ecosystem-3d.png', title: 'Ecosystem Architecture', subtitle: 'Floating island of 14+ interconnected repositories', gradient: 'from-arcane-crystal to-arcane-water' },
    { src: '/vision-board/product-realms.png', title: 'Product Realms', subtitle: 'Six magical spaces where creators live and create', gradient: 'from-arcane-gold to-arcane-fire' },
    { src: '/vision-board/ten-gates-spiral.png', title: 'The Ten Gates', subtitle: 'Ascending spiral from Foundation to Source', gradient: 'from-arcane-fire to-arcane-void' },
    { src: '/vision-board/roadmap-cinematic.png', title: 'Vision Roadmap', subtitle: 'From seed crystal to cosmic civilization', gradient: 'from-arcane-void to-arcane-gold' },
    { src: '/vision-board/transformation.png', title: 'The Transformation', subtitle: 'From isolated creator to Luminor conductor', gradient: 'from-arcane-crystal to-arcane-gold' },
    { src: '/vision-board/tech-tower.png', title: 'Technology Tower', subtitle: '10 layers from Turborepo to Vercel edge', gradient: 'from-arcane-water to-arcane-crystal' },
    { src: '/vision-board/infogenius-ecosystem.jpg', title: 'AI-Human Co-Creation', subtitle: 'Research-grounded ecosystem intelligence', gradient: 'from-arcane-gold to-arcane-crystal' },
    { src: '/vision-board/infogenius-gates.jpg', title: 'Creative Mastery Framework', subtitle: 'Neuroscience meets mythology', gradient: 'from-arcane-fire to-arcane-gold' },
  ]

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/20 to-cosmic-void" />
      <ParticleField count={20} color="gold" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="gold" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(255,215,0,0.1)]">
            <Palette className="w-4 h-4 mr-2" />
            VISUAL INTELLIGENCE
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            The Vision,
            <span className="block text-gradient-gold">Visualized</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body">
            AI-generated concept art and research-grounded infographics that map the entire Arcanea universe.
            Powered by Gemini + InfoGenius.
          </p>
        </motion.div>

        {/* Hero pair - large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {infographics.slice(0, 2).map((info, index) => (
            <TiltCard key={info.title} intensity={5}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                onClick={() => setActiveImage(activeImage === info.src ? null : info.src)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.04] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={info.src} alt={info.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" quality={85} />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-void/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-display text-white mb-2 group-hover:text-gradient-crystal transition-all" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {info.title}
                  </h3>
                  <p className="text-sm text-text-secondary/80">{info.subtitle}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Grid - smaller */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {infographics.slice(2).map((info, index) => (
            <TiltCard key={info.title} intensity={6}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={info.src} alt={info.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" quality={80} />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-void/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-sm font-display text-white mb-0.5">{info.title}</h4>
                  <p className="text-[11px] text-text-muted">{info.subtitle}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CINEMATIC TIMELINE
// ============================================
function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/40 to-cosmic-void" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-arcane-crystal/20 to-transparent" />

      {/* Background roadmap image */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image src="/vision-board/roadmap-cinematic.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-24">
          <Badge variant="crystal" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(127,255,212,0.1)]">
            <Rocket className="w-4 h-4 mr-2" />
            THE JOURNEY
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            From Now to
            <span className="block text-gradient-cosmic">Eternity</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body">
            A century-scale vision with immediate action. The technology changes; the mythology endures.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.04]">
            <motion.div className="w-full bg-gradient-to-b from-arcane-crystal via-arcane-gold to-arcane-void" style={{ height: lineHeight }} />
          </div>

          {timelinePhases.map((phase, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex items-start mb-20 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                {/* Node with pulse */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div whileHover={{ scale: 1.3 }} className="relative">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center shadow-[0_0_30px_rgba(127,255,212,0.2)]`}>
                      <span className="text-xs font-display text-white font-bold">
                        {phase.year === 'Now' ? 'NOW' : phase.year.replace('Year ', 'Y').replace(' Years', 'Y')}
                      </span>
                    </div>
                    {/* Pulse ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${phase.gradient} animate-ping opacity-20`} />
                  </motion.div>
                </div>

                <div className={`ml-24 md:ml-0 ${isLeft ? 'md:w-[calc(50%-48px)] md:pr-16' : 'md:w-[calc(50%-48px)] md:pl-16'} w-[calc(100%-96px)]`}>
                  <TiltCard intensity={3}>
                    <div className="rounded-2xl p-7 border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.4)] transition-shadow duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="gold" className="text-xs shadow-[0_0_15px_rgba(255,215,0,0.1)]">{phase.year}</Badge>
                        <h3 className="text-xl font-display text-white">{phase.title}</h3>
                      </div>
                      <p className="text-sm text-arcane-gold/50 italic font-body mb-3">{phase.subtitle}</p>
                      <p className="text-text-secondary font-body text-sm leading-relaxed mb-5">{phase.description}</p>

                      <div className="space-y-2.5 mb-5">
                        {phase.milestones.map((m) => (
                          <div key={m} className="flex items-start gap-2.5 text-sm text-text-secondary">
                            <Star className="w-3.5 h-3.5 mt-1 text-arcane-gold/40 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-6 pt-4 border-t border-white/5">
                        {phase.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <div className="text-xl font-display text-gradient-crystal">{m.value}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TEN GATES (Premium Circular Layout)
// ============================================
function TenGatesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [hoveredGate, setHoveredGate] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/20 to-cosmic-void" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-arcane-gold/20 to-transparent" />

      {/* Background gate spiral image */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image src="/vision-board/ten-gates-spiral.png" alt="" fill className="object-cover object-center" />
      </div>
      <ParticleField count={30} color="gold" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="gold" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(255,215,0,0.1)]">
            <Crown className="w-4 h-4 mr-2" />
            THE FRAMEWORK
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            The Ten Gates of
            <span className="block text-gradient-fire">Creation</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body">
            A developmental psychology framework mapped to frequency, element, and Guardian.
            Not prescription &mdash; progression.
          </p>
        </motion.div>

        {/* Gates grid with premium styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-16" style={{ perspective: '1000px' }}>
          {tenGates.map((gate, index) => (
            <motion.div
              key={gate.name}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ scale: 1.08, y: -10, rotateY: 5 }}
              onHoverStart={() => setHoveredGate(gate.number)}
              onHoverEnd={() => setHoveredGate(null)}
              className="group relative rounded-2xl p-5 text-center cursor-default border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            >
              {/* Gate glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gate.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <motion.div
                className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br ${gate.gradient} flex items-center justify-center shadow-lg relative`}
                animate={hoveredGate === gate.number ? { boxShadow: `0 0 40px ${gate.color}40` } : {}}
              >
                <span className="text-base font-display text-white font-bold">{gate.number}</span>
                {hoveredGate === gate.number && (
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2`}
                    style={{ borderColor: gate.color }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>

              <h4 className="font-display text-white text-sm mb-1.5 group-hover:text-arcane-crystal transition-colors">{gate.name}</h4>
              <p className="text-[11px] text-arcane-gold/50 font-mono mb-1">{gate.frequency}</p>
              <p className="text-[11px] text-text-muted font-body">{gate.guardian}</p>
              <p className="text-[10px] text-text-muted/40 font-body italic mt-0.5">{gate.godbeast}</p>
            </motion.div>
          ))}
        </div>

        {/* Magic Ranks - premium strip */}
        <motion.div
          variants={scrollRevealScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-2xl p-8 border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
        >
          <h3 className="text-lg font-display text-white mb-8 text-center">
            <span className="text-gradient-gold">Magic Ranks</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-5">
            {magicRanks.map((rank) => (
              <motion.div
                key={rank.rank}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-4 rounded-xl px-5 py-3.5 border border-white/[0.04] bg-white/[0.02]"
              >
                <div className="text-2xl font-display text-gradient-gold font-bold">{rank.gates}</div>
                <div>
                  <div className="text-sm font-display text-white">{rank.rank}</div>
                  <div className="text-[11px] text-text-muted">{rank.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// PRODUCT SPACES (Premium hexagonal feel)
// ============================================
function ProductSpacesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/40 to-cosmic-void" />
      <div className="absolute inset-0 opacity-[0.03]">
        <Image src="/vision-board/product-realms.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="crystal" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(127,255,212,0.1)]">
            <Target className="w-4 h-4 mr-2" />
            PRODUCT UNIVERSE
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            Six Magical
            <span className="block text-gradient-crystal">Spaces</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body">
            Where creators live, learn, battle, create, consult wisdom, and access knowledge.
            Not tools &mdash; transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {productSpaces.map((space, index) => {
            const Icon = iconMap[space.icon] || Sparkles

            return (
              <TiltCard key={space.id} intensity={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="group h-full rounded-2xl p-7 relative border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(127,255,212,0.04)] transition-shadow duration-500"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${space.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700`} />

                  <div className="flex items-center gap-3.5 mb-5">
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className={`p-3 rounded-xl bg-gradient-to-br ${space.gradient} shadow-lg relative`}>
                      <Icon className="w-5 h-5 text-white" />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${space.gradient} blur-xl opacity-30`} />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-white text-lg group-hover:text-arcane-crystal transition-colors duration-300">{space.name}</h3>
                      <Badge
                        variant={space.status === 'live' ? 'crystal' : space.status === 'building' ? 'fire' : 'void'}
                        className="text-[9px] uppercase tracking-widest"
                      >
                        {space.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary font-body mb-5">{space.description}</p>

                  <div className="space-y-2">
                    {space.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-text-muted group-hover:text-text-secondary transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${space.gradient} shrink-0`} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TRANSFORMATION (Cinematic split)
// ============================================
function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const transformIcons: Record<string, LucideIcon> = {
    sparkles: Sparkles, heart: Heart, compass: Compass, sword: Swords, map: Map, users: Users,
  }

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/20 to-cosmic-void" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-arcane-fire/20 to-transparent" />

      {/* Background transformation image */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image src="/vision-board/transformation.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="fire" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <Flame className="w-4 h-4 mr-2" />
            THE TRANSFORMATION
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            Not Tools.
            <span className="block text-gradient-fire">Transformation.</span>
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto font-body">
            Most creative tools help you make things. Arcanea helps you <em className="text-arcane-crystal/80">become</em> a creator.
          </p>
        </motion.div>

        <div className="space-y-4">
          {transformations.map((t, index) => {
            const Icon = transformIcons[t.icon] || Sparkles
            return (
              <motion.div
                key={t.from}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-xl p-6 flex items-center gap-5 group border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:border-white/[0.06] transition-all duration-500"
              >
                <div className="shrink-0 p-2.5 rounded-xl bg-arcane-crystal/5 group-hover:bg-arcane-crystal/10 transition-colors">
                  <Icon className="w-8 h-8 text-arcane-crystal/50 group-hover:text-arcane-crystal/80 transition-colors" />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-text-muted/70 font-body line-through decoration-red-500/30 decoration-2">{t.from}</span>
                  <ArrowRight className="w-5 h-5 text-arcane-gold/60 hidden sm:block" />
                  <span className="text-white font-display text-lg">{t.to}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TECH STACK (Premium tower)
// ============================================
function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const layerIcons: Record<string, LucideIcon> = {
    Framework: Globe, UI: Monitor, Language: Code, Styling: Palette,
    Animation: Sparkles, '3D': Eye, Database: Database, AI: Brain, Deploy: Cloud, Monorepo: Layers,
  }

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/40 to-cosmic-void" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="crystal" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(127,255,212,0.1)]">
            <Cpu className="w-4 h-4 mr-2" />
            TECHNOLOGY
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            Built on
            <span className="block text-gradient-crystal">Modern Magic</span>
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5" style={{ perspective: '800px' }}>
          {techStack.map((item, index) => {
            const Icon = layerIcons[item.layer] || Code
            return (
              <motion.div
                key={item.layer}
                variants={staggerItem}
                whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                className="group rounded-xl p-5 text-center border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(127,255,212,0.05)] transition-shadow duration-500"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-arcane-crystal/5 flex items-center justify-center group-hover:bg-arcane-crystal/10 transition-colors">
                  <Icon className="w-5 h-5 text-arcane-crystal/50 group-hover:text-arcane-crystal transition-colors" />
                </div>
                <div className="text-sm font-display text-white mb-0.5">{item.tech}</div>
                <div className="text-[10px] text-text-muted font-mono">{item.detail}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// COMPETITIVE EDGE (Premium comparison)
// ============================================
function CompetitiveEdgeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/20 to-cosmic-void" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-arcane-gold/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={scrollReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <Badge variant="gold" className="mb-6 text-sm font-sans shadow-[0_0_20px_rgba(255,215,0,0.1)]">
            <Shield className="w-4 h-4 mr-2" />
            COMPETITIVE EDGE
          </Badge>
          <h2 className="text-fluid-5xl font-display text-white mb-6">
            Nothing Else
            <span className="block text-gradient-gold">Compares</span>
          </h2>
        </motion.div>

        {/* Header row */}
        <div className="grid grid-cols-3 gap-4 mb-3 px-5">
          <div className="text-xs font-sans uppercase tracking-widest text-text-muted">Feature</div>
          <div className="text-xs font-sans uppercase tracking-widest text-text-muted text-center">Others</div>
          <div className="text-xs font-sans uppercase tracking-widest text-arcane-gold/60 text-right">Arcanea</div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-3">
          {differentiators.map((d) => (
            <motion.div
              key={d.feature}
              variants={staggerItem}
              whileHover={{ x: 4 }}
              className="rounded-xl p-5 grid grid-cols-3 gap-4 items-center border border-white/[0.04] bg-white/[0.02] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:border-arcane-gold/10 transition-all duration-300"
            >
              <div className="text-sm font-display text-arcane-crystal">{d.feature}</div>
              <div className="text-center">
                <span className="text-xs text-text-muted/40 line-through decoration-red-500/20">{d.others}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-arcane-gold/80 font-body">{d.arcanea}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// MANIFESTO (Premium cinematic)
// ============================================
function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep/40 to-cosmic-void" />
      <ParticleField count={40} color="gold" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scrollRevealScale}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="rounded-3xl p-14 md:p-20 text-center relative overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl shadow-[0_16px_80px_rgba(0,0,0,0.5)]"
        >
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-arcane-crystal/[0.03] via-transparent to-arcane-gold/[0.03]" />
          <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-arcane-gold/40 to-transparent" />
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-arcane-crystal/20 to-transparent" />

          <div className="relative">
            <Badge variant="gold" className="mb-10 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
              <Sparkles className="w-4 h-4 mr-2" />
              THE ARCANEA PROMISE
            </Badge>

            <div className="space-y-10 mb-14">
              {grandVision.mantras.map((mantra, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.4 + 0.3, duration: 0.8 }}
                  className="text-fluid-lg font-body italic text-text-secondary/80 leading-relaxed"
                >
                  &ldquo;{mantra}&rdquo;
                </motion.blockquote>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2, duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-xl font-display text-gradient-gold leading-relaxed">
                {grandVision.centuryVision}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-arcane-gold to-arcane-fire text-cosmic-void font-sans font-semibold px-10 py-5 text-lg rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:shadow-[0_0_60px_rgba(255,215,0,0.3)] transition-shadow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Join the Creation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border border-arcane-crystal/20 text-arcane-crystal font-sans px-10 py-5 text-lg rounded-2xl hover:border-arcane-crystal/40 hover:bg-arcane-crystal/5 transition-all backdrop-blur-sm"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore the Ecosystem
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function VisionBoardPage() {
  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh">
      {/* Global CSS for particle animation */}
      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>

      <Navigation />

      <main>
        <VisionHero />
        <VisionAreasSection />
        <InfographicSection />
        <TimelineSection />
        <TenGatesSection />
        <ProductSpacesSection />
        <TransformationSection />
        <TechStackSection />
        <CompetitiveEdgeSection />
        <ManifestoSection />
      </main>

      <Footer />
    </div>
  )
}
