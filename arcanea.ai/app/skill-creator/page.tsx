'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  cosmicScale,
  fadeInViewport,
  floatingOrb,
} from '@/lib/animations'
import { cn } from '@/lib/utils'
import {
  Hammer,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Code2,
  Palette,
  BookOpen,
  Wand2,
  Shield,
  Swords,
  Scroll,
  Brain,
  Flame,
  Crown,
  Target,
  Zap,
  Music,
  Compass,
  Eye,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react'

// === COLOR MAP (static lookups for Tailwind purge safety) ===

type ColorKey = 'arcane-crystal' | 'arcane-fire' | 'arcane-water' | 'arcane-void' | 'arcane-gold' | 'arcane-wind' | 'arcane-earth'

const colorMap: Record<ColorKey, {
  bg15: string
  border30: string
  text: string
}> = {
  'arcane-crystal': {
    bg15: 'bg-arcane-crystal/15',
    border30: 'border-arcane-crystal/30',
    text: 'text-arcane-crystal',
  },
  'arcane-fire': {
    bg15: 'bg-arcane-fire/15',
    border30: 'border-arcane-fire/30',
    text: 'text-arcane-fire',
  },
  'arcane-water': {
    bg15: 'bg-arcane-water/15',
    border30: 'border-arcane-water/30',
    text: 'text-arcane-water',
  },
  'arcane-void': {
    bg15: 'bg-arcane-void/15',
    border30: 'border-arcane-void/30',
    text: 'text-arcane-void',
  },
  'arcane-gold': {
    bg15: 'bg-arcane-gold/15',
    border30: 'border-arcane-gold/30',
    text: 'text-arcane-gold',
  },
  'arcane-wind': {
    bg15: 'bg-arcane-wind/15',
    border30: 'border-arcane-wind/30',
    text: 'text-arcane-wind',
  },
  'arcane-earth': {
    bg15: 'bg-arcane-earth/15',
    border30: 'border-arcane-earth/30',
    text: 'text-arcane-earth',
  },
}

// === DATA ===

const skillCategories: Array<{ name: string; icon: typeof Palette; color: ColorKey; count: number; skills: string[] }> = [
  {
    name: 'Creative',
    icon: Palette,
    color: 'arcane-fire',
    count: 8,
    skills: ['Character Forge', 'Scene Craft', 'World Build', 'Voice Alchemy', 'Story Weave', 'Dialogue Mastery', 'Revision Ritual', 'Bestiary Nav'],
  },
  {
    name: 'Development',
    icon: Code2,
    color: 'arcane-crystal',
    count: 7,
    skills: ['Architecture Patterns', 'API Design', 'TDD', 'Performance Tuning', 'Systematic Debug', 'Code Review', 'Refactoring Ritual'],
  },
  {
    name: 'Arcanea Core',
    icon: Shield,
    color: 'arcane-void',
    count: 8,
    skills: ['Arcanea Canon', 'Arcanea Voice', 'Design System', 'Luminor Council', 'Story Weaver', 'Character Alchemist', 'World Architect', 'AI Symbiosis'],
  },
  {
    name: 'Academy',
    icon: Crown,
    color: 'arcane-gold',
    count: 6,
    skills: ['Gate Foundation', 'Gate Flow', 'Gate Fire', 'Gate Opening Ceremony', 'Rank Up', 'Progress Tracker'],
  },
  {
    name: 'Meta',
    icon: Brain,
    color: 'arcane-water',
    count: 3,
    skills: ['Creative Flow', 'Deep Work', 'Skill Mastery'],
  },
  {
    name: 'Community',
    icon: Compass,
    color: 'arcane-wind',
    count: 6,
    skills: ['Agent Orchestration', 'Creative Writing', 'Design Systems', 'Dev Workflows', 'Doc Patterns', 'Testing Strategies'],
  },
]

type SkillDraft = {
  name: string
  category: string
  guardian: string
  description: string
  invocation: string
  steps: string[]
}

const guardianOptions = [
  { name: 'Lyssandria', gate: 'Foundation', element: 'Earth' },
  { name: 'Leyla', gate: 'Flow', element: 'Water' },
  { name: 'Draconia', gate: 'Fire', element: 'Fire' },
  { name: 'Maylinn', gate: 'Heart', element: 'Water' },
  { name: 'Alera', gate: 'Voice', element: 'Wind' },
  { name: 'Lyria', gate: 'Sight', element: 'Void' },
  { name: 'Aiyami', gate: 'Crown', element: 'Spirit' },
]

const exampleSkill: SkillDraft = {
  name: 'Scene Craft',
  category: 'Creative',
  guardian: 'Leyla',
  description: 'Compose vivid, emotionally resonant scenes with sensory detail, character interiority, and narrative momentum.',
  invocation: '/scene-craft "A warrior returns home after decades of exile"',
  steps: [
    'Establish the emotional core — what must the reader feel?',
    'Set the sensory landscape — sight, sound, texture, smell',
    'Position characters in space with intention',
    'Layer tension through subtext and unspoken history',
    'Close with an image that echoes the opening emotion, transformed',
  ],
}

// === COMPONENTS ===

function SkillBrowser() {
  const [activeCategory, setActiveCategory] = useState(0)
  const category = skillCategories[activeCategory]
  const CategoryIcon = category.icon

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={cn(
                'flex items-center gap-2 font-sans text-xs px-4 py-2 rounded-xl transition-all duration-300',
                i === activeCategory
                  ? cn(colorMap[cat.color].bg15, colorMap[cat.color].text, 'border', colorMap[cat.color].border30)
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-transparent'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.name}
              <span className="font-mono text-[10px] opacity-60">{cat.count}</span>
            </button>
          )
        })}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {category.skills.map((skill) => (
            <div
              key={skill}
              className="glow-card rounded-xl p-4 hover-lift group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon className={cn('w-4 h-4 shrink-0', colorMap[category.color].text)} />
                <span className="font-sans text-sm text-white group-hover:text-arcane-crystal transition-colors truncate">{skill}</span>
                <ChevronRight className="w-3 h-3 text-text-disabled group-hover:text-text-muted ml-auto shrink-0 transition-colors" />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-center">
        <span className="font-mono text-xs text-text-muted">
          {skillCategories.reduce((sum, c) => sum + c.count, 0)} skills across {skillCategories.length} categories
        </span>
      </div>
    </div>
  )
}

function SkillForge() {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<SkillDraft>({
    name: '',
    category: '',
    guardian: '',
    description: '',
    invocation: '',
    steps: [''],
  })

  const forgeSteps = [
    { label: 'Name & Category', icon: Scroll },
    { label: 'Guardian Alignment', icon: Shield },
    { label: 'Description', icon: BookOpen },
    { label: 'Invocation', icon: Wand2 },
    { label: 'Steps', icon: Layers },
  ]

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1 mb-10">
        {forgeSteps.map((s, i) => {
          const StepIcon = s.icon
          return (
            <button
              key={s.label}
              onClick={() => setStep(i)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-sans transition-all',
                i === step
                  ? 'bg-arcane-crystal/15 text-arcane-crystal border border-arcane-crystal/30'
                  : i < step
                  ? 'text-arcane-crystal/60'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <StepIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* Step content */}
      <div className="glass rounded-3xl p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">Skill Name</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="e.g. Scene Craft, World Build, Systematic Debug"
                    className="w-full px-4 py-3 bg-cosmic-surface border border-white/10 rounded-xl text-white font-sans text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/50 focus:ring-1 focus:ring-arcane-crystal/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Creative', 'Development', 'Arcanea Core', 'Academy', 'Meta', 'Community'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setDraft({ ...draft, category: cat })}
                        className={cn(
                          'px-3 py-2.5 rounded-xl font-sans text-xs transition-all',
                          draft.category === cat
                            ? 'bg-arcane-crystal/15 text-arcane-crystal border border-arcane-crystal/30'
                            : 'bg-white/5 text-text-secondary border border-transparent hover:bg-white/10'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="font-body text-text-secondary mb-6">
                  Which Guardian oversees this skill? Choose the one whose domain aligns with the skill&apos;s purpose.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guardianOptions.map((g) => (
                    <button
                      key={g.name}
                      onClick={() => setDraft({ ...draft, guardian: g.name })}
                      className={cn(
                        'flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all',
                        draft.guardian === g.name
                          ? 'bg-arcane-crystal/15 border border-arcane-crystal/30'
                          : 'bg-white/5 border border-transparent hover:bg-white/10'
                      )}
                    >
                      <Shield className={cn('w-5 h-5 shrink-0', draft.guardian === g.name ? 'text-arcane-crystal' : 'text-text-muted')} />
                      <div>
                        <div className="font-sans text-sm text-white">{g.name}</div>
                        <div className="font-mono text-xs text-text-muted">{g.gate} Gate &middot; {g.element}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">Skill Description</label>
                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  placeholder="What does this skill do? What outcome does it produce? Write it as a single, powerful sentence."
                  rows={4}
                  className="w-full px-4 py-3 bg-cosmic-surface border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/50 focus:ring-1 focus:ring-arcane-crystal/20 transition-all resize-none leading-relaxed"
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">Invocation Pattern</label>
                <input
                  type="text"
                  value={draft.invocation}
                  onChange={(e) => setDraft({ ...draft, invocation: e.target.value })}
                  placeholder='/skill-name "argument or context"'
                  className="w-full px-4 py-3 bg-cosmic-surface border border-white/10 rounded-xl text-arcane-crystal font-mono text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/50 focus:ring-1 focus:ring-arcane-crystal/20 transition-all"
                />
                <p className="mt-3 font-body text-xs text-text-muted">
                  The invocation is how users trigger the skill. Use a clear, memorable command.
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="block font-sans text-xs text-text-muted mb-3 tracking-wider uppercase">Procedural Steps</label>
                <div className="space-y-2">
                  {draft.steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-disabled w-6 text-right shrink-0">{i + 1}.</span>
                      <input
                        type="text"
                        value={s}
                        onChange={(e) => {
                          const newSteps = [...draft.steps]
                          newSteps[i] = e.target.value
                          setDraft({ ...draft, steps: newSteps })
                        }}
                        placeholder={`Step ${i + 1}`}
                        className="flex-1 px-3 py-2 bg-cosmic-surface border border-white/10 rounded-lg text-white font-body text-sm placeholder:text-text-disabled focus:outline-none focus:border-arcane-crystal/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setDraft({ ...draft, steps: [...draft.steps, ''] })}
                  className="mt-3 font-sans text-xs text-arcane-crystal hover:text-arcane-crystal/80 transition-colors"
                >
                  + Add step
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={cn(
              'flex items-center gap-2 font-sans text-sm transition-colors',
              step === 0 ? 'text-text-disabled cursor-not-allowed' : 'text-text-secondary hover:text-white'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              size="sm"
              className="bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold rounded-xl"
            >
              <span className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-gradient-to-r from-arcane-gold to-arcane-fire text-cosmic-void font-sans font-semibold rounded-xl"
            >
              <span className="flex items-center gap-2">
                Forge Skill
                <Hammer className="w-4 h-4" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function SkillPreview() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const md = `# ${exampleSkill.name}\n\n> ${exampleSkill.description}\n\n**Guardian:** ${exampleSkill.guardian}\n**Category:** ${exampleSkill.category}\n\n### Invocation\n\`\`\`\n${exampleSkill.invocation}\n\`\`\`\n\n### Steps\n${exampleSkill.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass rounded-3xl p-8 relative overflow-hidden">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center gap-1.5 font-sans text-xs text-text-muted hover:text-arcane-crystal transition-colors px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>

      {/* Skill header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-arcane-fire/15 border border-arcane-fire/25 flex items-center justify-center shrink-0">
          <Palette className="w-6 h-6 text-arcane-fire" />
        </div>
        <div>
          <h3 className="text-fluid-xl font-display text-white">{exampleSkill.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="fire" className="font-sans text-[10px] px-2 py-0.5">{exampleSkill.category}</Badge>
            <Badge variant="crystal" className="font-sans text-[10px] px-2 py-0.5">{exampleSkill.guardian}</Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-text-secondary mb-6 leading-relaxed">{exampleSkill.description}</p>

      {/* Invocation */}
      <div className="mb-6">
        <div className="font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">Invocation</div>
        <div className="font-mono text-sm text-arcane-crystal bg-cosmic-surface/80 px-4 py-3 rounded-xl border border-white/5">
          {exampleSkill.invocation}
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="font-sans text-xs text-text-muted mb-3 tracking-wider uppercase">Procedural Steps</div>
        <div className="space-y-2">
          {exampleSkill.steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-mono text-xs text-arcane-crystal mt-0.5 w-5 text-right shrink-0">{i + 1}.</span>
              <span className="font-body text-sm text-text-secondary leading-relaxed">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// === PAGE ===

export default function SkillCreatorPage() {
  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div variants={floatingOrb} animate="animate" className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-arcane-fire/5 blur-[100px]" />
        <motion.div variants={floatingOrb} animate="animate" className="absolute bottom-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-arcane-crystal/5 blur-[120px]" style={{ animationDelay: '4s' }} />
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
              <Badge variant="fire" className="mb-8 font-sans text-xs tracking-widest px-4 py-1.5">
                <Hammer className="w-3.5 h-3.5 mr-2" />
                SKILL CREATOR
              </Badge>
            </motion.div>

            <motion.h1
              variants={cosmicFadeInUp}
              className="text-fluid-hero font-display text-white mb-8 leading-[0.95] tracking-tight"
            >
              Forge Your
              <span className="block text-gradient-fire mt-2">Creative Arsenal</span>
            </motion.h1>

            <motion.p
              variants={cosmicFadeIn}
              className="text-fluid-xl font-body text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed"
            >
              Skills are procedural memory — what you know how to do, encoded as
              repeatable patterns. Browse 130+ skills or forge your own.
            </motion.p>

            <motion.div variants={cosmicFadeIn}>
              <div className="inline-flex items-center gap-6 glass rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-arcane-crystal">130+</div>
                  <div className="font-sans text-xs text-text-muted">Skills</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-arcane-fire">14</div>
                  <div className="font-sans text-xs text-text-muted">Categories</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-arcane-void">7</div>
                  <div className="font-sans text-xs text-text-muted">Guardians</div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* === SKILL BROWSER === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-12">
              <Badge variant="crystal" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Layers className="w-3.5 h-3.5 mr-2" />
                SKILL LIBRARY
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                Browse the <span className="text-gradient-crystal">Arsenal</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Every skill is a ritual. Every ritual produces consistent quality.
                Explore the full library organized by domain.
              </p>
            </motion.div>

            <motion.div variants={cosmicScale}>
              <SkillBrowser />
            </motion.div>
          </motion.section>

          <div className="section-divider" />

          {/* === SKILL PREVIEW === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-12">
              <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Eye className="w-3.5 h-3.5 mr-2" />
                ANATOMY OF A SKILL
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                How Skills <span className="text-gradient-cosmic">Work</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Each skill has a name, guardian alignment, invocation pattern, and
                procedural steps. Here&apos;s what a complete skill looks like.
              </p>
            </motion.div>

            <motion.div variants={cosmicScale} className="max-w-3xl mx-auto">
              <SkillPreview />
            </motion.div>
          </motion.section>

          <div className="section-divider" />

          {/* === SKILL FORGE === */}
          <motion.section
            variants={staggerContainer}
            {...fadeInViewport}
          >
            <motion.div variants={cosmicFadeIn} className="text-center mb-12">
              <Badge variant="gold" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
                <Hammer className="w-3.5 h-3.5 mr-2" />
                THE FORGE
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-4">
                Forge a <span className="text-gradient-gold">New Skill</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto">
                Transform your expertise into a repeatable, shareable skill.
                Five steps from concept to creation.
              </p>
            </motion.div>

            <motion.div variants={cosmicScale} className="max-w-3xl mx-auto">
              <SkillForge />
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
                Every Skill Is a <span className="text-gradient-fire">Ritual</span>
              </h2>
              <p className="text-fluid-lg font-body text-text-secondary max-w-2xl mx-auto mb-10">
                The best creators don&apos;t just have talent — they have systems.
                Build yours with ACOS.
              </p>
            </motion.div>

            <motion.div variants={cosmicFadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acos">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold px-10 py-5 text-lg rounded-2xl shadow-glow-crystal hover:shadow-glow-lg transition-shadow"
                >
                  <span className="flex items-center gap-2">
                    Explore ACOS
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  size="lg"
                  className="glass border-arcane-crystal/30 text-arcane-crystal font-sans px-10 py-5 text-lg rounded-2xl hover:border-arcane-crystal/60 hover:bg-arcane-crystal/5 transition-all"
                >
                  Start Creating
                </Button>
              </Link>
            </motion.div>

            <motion.p
              variants={cosmicFadeIn}
              className="mt-10 font-body italic text-text-muted text-fluid-sm"
            >
              &ldquo;Every skill is a ritual. Every ritual produces consistent quality.&rdquo;
            </motion.p>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
