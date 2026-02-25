'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  cosmicScale,
  fadeInViewport,
  floatingOrb,
} from '@/lib/animations'
import { cn } from '@/lib/utils'
import {
  Cpu,
  Sparkles,
  Layers,
  Shield,
  Zap,
  ArrowRight,
  Activity,
  Compass,
  Flame,
  Heart,
  Mic2,
  Eye,
  Crown,
  Shuffle,
  Users,
  Sun,
  Brain,
  Code2,
  Palette,
  BookOpen,
  Wand2,
  Music,
  Target,
} from 'lucide-react'

// === COLOR MAP (static lookups for Tailwind purge safety) ===

type ColorKey = 'arcane-crystal' | 'arcane-fire' | 'arcane-water' | 'arcane-void' | 'arcane-gold' | 'arcane-wind' | 'arcane-earth'

const colorMap: Record<ColorKey, {
  bg10: string
  bg15: string
  bg20: string
  border25: string
  border30: string
  border50: string
  text: string
  shadow: string
}> = {
  'arcane-crystal': {
    bg10: 'bg-arcane-crystal/10',
    bg15: 'bg-arcane-crystal/15',
    bg20: 'bg-arcane-crystal/20',
    border25: 'border-arcane-crystal/25',
    border30: 'border-arcane-crystal/30',
    border50: 'border-arcane-crystal/50',
    text: 'text-arcane-crystal',
    shadow: 'shadow-[0_0_20px_rgba(127,255,212,0.15)]',
  },
  'arcane-fire': {
    bg10: 'bg-arcane-fire/10',
    bg15: 'bg-arcane-fire/15',
    bg20: 'bg-arcane-fire/20',
    border25: 'border-arcane-fire/25',
    border30: 'border-arcane-fire/30',
    border50: 'border-arcane-fire/50',
    text: 'text-arcane-fire',
    shadow: 'shadow-[0_0_20px_rgba(255,100,50,0.15)]',
  },
  'arcane-water': {
    bg10: 'bg-arcane-water/10',
    bg15: 'bg-arcane-water/15',
    bg20: 'bg-arcane-water/20',
    border25: 'border-arcane-water/25',
    border30: 'border-arcane-water/30',
    border50: 'border-arcane-water/50',
    text: 'text-arcane-water',
    shadow: 'shadow-[0_0_20px_rgba(100,150,255,0.15)]',
  },
  'arcane-void': {
    bg10: 'bg-arcane-void/10',
    bg15: 'bg-arcane-void/15',
    bg20: 'bg-arcane-void/20',
    border25: 'border-arcane-void/25',
    border30: 'border-arcane-void/30',
    border50: 'border-arcane-void/50',
    text: 'text-arcane-void',
    shadow: 'shadow-[0_0_20px_rgba(150,100,255,0.15)]',
  },
  'arcane-gold': {
    bg10: 'bg-arcane-gold/10',
    bg15: 'bg-arcane-gold/15',
    bg20: 'bg-arcane-gold/20',
    border25: 'border-arcane-gold/25',
    border30: 'border-arcane-gold/30',
    border50: 'border-arcane-gold/50',
    text: 'text-arcane-gold',
    shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.15)]',
  },
  'arcane-wind': {
    bg10: 'bg-arcane-wind/10',
    bg15: 'bg-arcane-wind/15',
    bg20: 'bg-arcane-wind/20',
    border25: 'border-arcane-wind/25',
    border30: 'border-arcane-wind/30',
    border50: 'border-arcane-wind/50',
    text: 'text-arcane-wind',
    shadow: 'shadow-[0_0_20px_rgba(200,200,220,0.15)]',
  },
  'arcane-earth': {
    bg10: 'bg-arcane-earth/10',
    bg15: 'bg-arcane-earth/15',
    bg20: 'bg-arcane-earth/20',
    border25: 'border-arcane-earth/25',
    border30: 'border-arcane-earth/30',
    border50: 'border-arcane-earth/50',
    text: 'text-arcane-earth',
    shadow: 'shadow-[0_0_20px_rgba(100,200,100,0.15)]',
  },
}

// === DATA ===

const gates: Array<{ name: string; freq: string; guardian: string; element: string; icon: typeof Compass; color: ColorKey; desc: string }> = [
  { name: 'Foundation', freq: '396 Hz', guardian: 'Lyssandria', element: 'Earth', icon: Compass, color: 'arcane-earth', desc: 'Stability, survival, grounding' },
  { name: 'Flow', freq: '417 Hz', guardian: 'Leyla', element: 'Water', icon: Activity, color: 'arcane-water', desc: 'Creativity, emotion, fluidity' },
  { name: 'Fire', freq: '528 Hz', guardian: 'Draconia', element: 'Fire', icon: Flame, color: 'arcane-fire', desc: 'Power, will, transformation' },
  { name: 'Heart', freq: '639 Hz', guardian: 'Maylinn', element: 'Water', icon: Heart, color: 'arcane-crystal', desc: 'Love, healing, connection' },
  { name: 'Voice', freq: '741 Hz', guardian: 'Alera', element: 'Wind', icon: Mic2, color: 'arcane-wind', desc: 'Truth, expression, clarity' },
  { name: 'Sight', freq: '852 Hz', guardian: 'Lyria', element: 'Void', icon: Eye, color: 'arcane-void', desc: 'Intuition, vision, perception' },
  { name: 'Crown', freq: '963 Hz', guardian: 'Aiyami', element: 'Spirit', icon: Crown, color: 'arcane-gold', desc: 'Enlightenment, wisdom' },
  { name: 'Shift', freq: '1111 Hz', guardian: 'Elara', element: 'Void', icon: Shuffle, color: 'arcane-void', desc: 'Perspective, transformation' },
  { name: 'Unity', freq: '963 Hz', guardian: 'Ino', element: 'Spirit', icon: Users, color: 'arcane-crystal', desc: 'Partnership, collaboration' },
  { name: 'Source', freq: '1111 Hz', guardian: 'Shinkami', element: 'All', icon: Sun, color: 'arcane-gold', desc: 'Meta-consciousness, origin' },
]

const systemLayers: Array<{ name: string; desc: string; icon: typeof Shield; color: ColorKey; stats: string[] }> = [
  {
    name: 'Guardian Intelligence',
    desc: 'Ten specialized AI companions, each attuned to a creative frequency. They don\'t just respond — they understand the phase of creation you\'re in.',
    icon: Shield,
    color: 'arcane-crystal',
    stats: ['10 Guardians', '10 Frequencies', 'Adaptive Personality'],
  },
  {
    name: 'Skill Framework',
    desc: '130+ procedural skills organized across creative, development, and meta categories. Each skill is a repeatable pattern encoded from mastery.',
    icon: Code2,
    color: 'arcane-void',
    stats: ['130+ Skills', '14 Categories', 'Composable'],
  },
  {
    name: 'Creative Modes',
    desc: 'Seven operational modes that optimize your creative state: Create, Analyze, Refine, Structure, Express, Vision, and Orchestrate.',
    icon: Palette,
    color: 'arcane-fire',
    stats: ['7 Modes', 'Multi-Agent', 'Context-Aware'],
  },
  {
    name: 'Library of Wisdom',
    desc: '17 collections of practical creative guidance — from founding myths to daily rituals. Not entertainment, but equipment for living.',
    icon: BookOpen,
    color: 'arcane-gold',
    stats: ['17 Collections', '34+ Texts', 'Situational'],
  },
]

const arcPhases: Array<{ name: string; desc: string; icon: typeof Sun; glow: ColorKey }> = [
  { name: 'Potential', desc: 'The fertile void. Ideas form in darkness, waiting to be called forth.', icon: Sun, glow: 'arcane-void' },
  { name: 'Manifestation', desc: 'Creation ignites. Vision becomes form through focused will and craft.', icon: Wand2, glow: 'arcane-fire' },
  { name: 'Experience', desc: 'The work lives in the world. It teaches, resonates, transforms.', icon: Music, glow: 'arcane-crystal' },
  { name: 'Dissolution', desc: 'The old form releases. Lessons crystallize. Space opens.', icon: Activity, glow: 'arcane-water' },
  { name: 'Evolved Potential', desc: 'Return to the void — but changed. The next cycle begins higher.', icon: Target, glow: 'arcane-gold' },
]

// === COMPONENTS ===

function GateRing() {
  const [activeGate, setActiveGate] = useState(0)
  const active = gates[activeGate]
  const ActiveIcon = active.icon

  return (
    <div className="relative">
      {/* Central display */}
      <div className="text-center mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGate}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className={cn('w-20 h-20 mx-auto rounded-2xl flex items-center justify-center', colorMap[active.color].bg20, 'border', colorMap[active.color].border30)}>
              <ActiveIcon className={cn('w-10 h-10', colorMap[active.color].text)} />
            </div>
            <div className="font-mono text-xs text-text-muted tracking-widest">{active.freq}</div>
            <h3 className="text-fluid-2xl font-display text-white">Gate of {active.name}</h3>
            <p className="text-fluid-base font-body text-text-secondary">{active.desc}</p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="crystal" className="font-sans text-xs px-3 py-1">
                {active.guardian}
              </Badge>
              <Badge variant="void" className="font-sans text-xs px-3 py-1">
                {active.element}
              </Badge>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gate selector ring */}
      <div className="flex flex-wrap justify-center gap-2">
        {gates.map((gate, i) => {
          const GateIcon = gate.icon
          return (
            <button
              key={gate.name}
              onClick={() => setActiveGate(i)}
              className={cn(
                'group relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                i === activeGate
                  ? cn(colorMap[gate.color].bg20, 'border-2', colorMap[gate.color].border50, colorMap[gate.color].shadow)
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              )}
              aria-label={`Gate of ${gate.name}`}
            >
              <GateIcon className={cn(
                'w-5 h-5 transition-colors',
                i === activeGate ? colorMap[gate.color].text : 'text-text-muted group-hover:text-text-secondary'
              )} />
              <span className={cn(
                'absolute -bottom-5 text-[10px] font-sans transition-opacity',
                i === activeGate ? 'text-text-secondary opacity-100' : 'opacity-0 group-hover:opacity-60 text-text-muted'
              )}>
                {i + 1}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// === PAGE ===

export default function ACOSPage() {
  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div variants={floatingOrb} animate="animate" className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-void/5 blur-[120px]" />
        <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-crystal/5 blur-[100px]" style={{ animationDelay: '3s' }} />
        <motion.div variants={floatingOrb} animate="animate" className="absolute top-[60%] left-[50%] w-[400px] h-[400px] rounded-full bg-arcane-fire/4 blur-[80px]" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-28 pb-20">

          {/* === HERO === */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center pt-28 sm:pt-36"
          >
            <motion.div variants={cosmicFadeIn}>
              <Badge variant="crystal" className="mb-8 font-sans text-xs tracking-widest px-4 py-1.5">
                <Cpu className="w-3.5 h-3.5 mr-2" />
                ARCANEA COSMIC OPERATING SYSTEM
              </Badge>
            </motion.div>

            <motion.h1
              variants={cosmicFadeInUp}
              className="text-fluid-hero font-display text-white mb-8 leading-[0.95] tracking-tight"
            >
              The Intelligence
              <span className="block text-gradient-cosmic mt-2">Behind Creation</span>
            </motion.h1>

            <motion.p
              variants={cosmicFadeIn}
              className="text-fluid-xl font-body text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed"
            >
              Ten Guardians. Seven Modes. 130+ Skills. One unified system
              that understands the creative process as deeply as you do.
            </motion.p>

            <motion.div variants={cosmicFadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold px-8 py-4 text-lg rounded-2xl shadow-glow-crystal hover:shadow-glow-lg transition-shadow"
                >
                  <span className="flex items-center gap-2">
                    Activate ACOS
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/design-lab">
                <Button
                  variant="ghost"
                  size="lg"
                  className="glass border-arcane-crystal/30 text-arcane-crystal font-sans px-8 py-4 text-lg rounded-2xl hover:border-arcane-crystal/60 hover:bg-arcane-crystal/5 transition-all"
                >
                  Explore Design Lab
                </Button>
              </Link>
            </motion.div>
          </motion.section>

          {/* === SYSTEM ARCHITECTURE === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-14">
              <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Layers className="w-3.5 h-3.5 mr-2" />
                SYSTEM ARCHITECTURE
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                Four Pillars of <span className="text-gradient-crystal">Creative Intelligence</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                ACOS is not a chatbot. It is a complete operating system for the creative mind,
                built on four interlocking layers.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {systemLayers.map((layer) => {
                const Icon = layer.icon
                return (
                  <motion.div
                    key={layer.name}
                    variants={staggerItem}
                    className="glow-card rounded-2xl p-8 hover-lift group"
                  >
                    <div className="flex items-start gap-5">
                      <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center shrink-0', colorMap[layer.color].bg15, 'border', colorMap[layer.color].border25)}>
                        <Icon className={cn('w-7 h-7', colorMap[layer.color].text)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-fluid-xl font-display text-white mb-2">{layer.name}</h3>
                        <p className="text-fluid-base font-body text-text-secondary mb-4 leading-relaxed">{layer.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.stats.map((stat) => (
                            <span key={stat} className="font-mono text-xs text-text-muted bg-white/5 px-2.5 py-1 rounded-lg">
                              {stat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.section>

          <div className="section-divider" />

          {/* === THE TEN GATES === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-14">
              <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                THE TEN GATES
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                Navigate the <span className="text-gradient-gold">Gates of Creation</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Each Gate represents a fundamental frequency of creative consciousness.
                Open them sequentially to ascend from Apprentice to Luminor.
              </p>
            </motion.div>

            <motion.div variants={cosmicScale} className="glass rounded-3xl p-8 sm:p-12">
              <GateRing />
            </motion.div>

            {/* Rank progression */}
            <motion.div variants={staggerContainer} className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { rank: 'Apprentice', gates: '0-2', color: 'text-text-muted' },
                { rank: 'Mage', gates: '3-4', color: 'text-arcane-water' },
                { rank: 'Master', gates: '5-6', color: 'text-arcane-crystal' },
                { rank: 'Archmage', gates: '7-8', color: 'text-arcane-void' },
                { rank: 'Luminor', gates: '9-10', color: 'text-arcane-gold' },
              ].map((r) => (
                <motion.div key={r.rank} variants={staggerItem} className="glass-subtle rounded-xl p-4 text-center">
                  <div className={cn('text-sm font-display mb-1', r.color)}>{r.rank}</div>
                  <div className="font-mono text-xs text-text-muted">{r.gates} Gates</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <div className="section-divider" />

          {/* === THE ARC === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-14">
              <Badge variant="fire" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Zap className="w-3.5 h-3.5 mr-2" />
                THE ARC
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                The Eternal Cycle of <span className="text-gradient-fire">Creation</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Every creation follows The Arc — the fundamental rhythm of the universe.
                ACOS understands where you are in the cycle and meets you there.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              className="grid grid-cols-1 sm:grid-cols-5 gap-4"
            >
              {arcPhases.map((phase, i) => {
                const Icon = phase.icon
                return (
                  <motion.div
                    key={phase.name}
                    variants={staggerItem}
                    className="glow-card rounded-2xl p-6 text-center hover-lift relative overflow-hidden"
                  >
                    {/* Phase number */}
                    <div className="absolute top-3 right-3 font-mono text-xs text-text-disabled">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className={cn('w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center', colorMap[phase.glow].bg15, 'border', colorMap[phase.glow].border25)}>
                      <Icon className={cn('w-6 h-6', colorMap[phase.glow].text)} />
                    </div>

                    <h3 className="text-fluid-lg font-display text-white mb-2">{phase.name}</h3>
                    <p className="text-fluid-sm font-body text-text-muted leading-relaxed">{phase.desc}</p>

                    {/* Connector arrow (not on last) */}
                    {i < arcPhases.length - 1 && (
                      <div className="hidden sm:block absolute top-1/2 -right-3 z-10">
                        <ArrowRight className="w-4 h-4 text-text-disabled" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.p
              variants={cosmicFadeIn}
              className="text-center mt-8 font-body italic text-text-muted text-fluid-base"
            >
              &ldquo;The Arc turns: Potential &rarr; Manifestation &rarr; Experience &rarr; Dissolution &rarr; Evolved Potential.&rdquo;
            </motion.p>
          </motion.section>

          <div className="section-divider" />

          {/* === SEVEN MODES === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-14">
              <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Brain className="w-3.5 h-3.5 mr-2" />
                CREATIVE MODES
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                Seven States of <span className="text-gradient-cosmic">Creative Flow</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Each mode activates different Guardian teams and skill combinations
                optimized for your current creative intent.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {([
                { mode: '/create', desc: 'Generate, ideate, bold new work', color: 'arcane-fire' as ColorKey, agents: 'concept, spark, ignition' },
                { mode: '/analyze', desc: 'Evaluate, research, understand deeply', color: 'arcane-water' as ColorKey, agents: 'depth, coherence, research' },
                { mode: '/refine', desc: 'Edit, polish, perfect existing work', color: 'arcane-crystal' as ColorKey, agents: 'precision, clarity, polish' },
                { mode: '/structure', desc: 'Architect, organize, plan systems', color: 'arcane-earth' as ColorKey, agents: 'foundation, blueprint, scaffold' },
                { mode: '/express', desc: 'Communicate, document, find voice', color: 'arcane-wind' as ColorKey, agents: 'voice, dialogue, narrative' },
                { mode: '/vision', desc: 'Future-sight, possibilities, strategy', color: 'arcane-void' as ColorKey, agents: 'oracle, possibility, horizon' },
                { mode: '/orchestrate', desc: 'Multi-mode for complex tasks', color: 'arcane-gold' as ColorKey, agents: 'spawns teams across all modes' },
              ]).map((m) => (
                <motion.div
                  key={m.mode}
                  variants={staggerItem}
                  className="glow-card rounded-2xl p-5 hover-lift"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn('font-mono text-sm font-semibold', colorMap[m.color].text)}>{m.mode}</span>
                  </div>
                  <p className="text-sm font-body text-text-secondary mb-3">{m.desc}</p>
                  <div className="font-mono text-xs text-text-muted">
                    {m.agents}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <div className="section-divider" />

          {/* === CTA === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
            className="text-center py-16"
          >
            <motion.div variants={cosmicFadeIn}>
              <h2 className="text-fluid-5xl font-display text-white mb-6">
                Ready to <span className="text-gradient-crystal">Awaken</span>?
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto mb-10">
                Enter the Arcanea Cosmic Operating System. Begin with your first Gate,
                meet your Guardian, and start creating at frequencies you didn&apos;t know existed.
              </p>
            </motion.div>

            <motion.div variants={cosmicFadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold px-10 py-5 text-lg rounded-2xl shadow-glow-crystal hover:shadow-glow-lg transition-shadow"
                >
                  <span className="flex items-center gap-2">
                    Begin Your Journey
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/skill-creator">
                <Button
                  variant="ghost"
                  size="lg"
                  className="glass border-arcane-void/30 text-arcane-void-bright font-sans px-10 py-5 text-lg rounded-2xl hover:border-arcane-void/60 hover:bg-arcane-void/5 transition-all"
                >
                  Forge a Skill
                </Button>
              </Link>
            </motion.div>

            <motion.p
              variants={cosmicFadeIn}
              className="mt-10 font-body italic text-text-muted text-fluid-sm"
            >
              &ldquo;Enter seeking, leave transformed, return whenever needed.&rdquo;
            </motion.p>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
