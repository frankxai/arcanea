'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Shell,
  Bird,
  Flame,
  TreePine,
  Fish,
  Eye,
  Sun,
  Cat,
  Zap,
  Star,
  ArrowRight,
  Shield,
  Heart,
  Infinity as InfinityIcon,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Godbeast Data ─────────────────────────────────────────────────────────────

interface Godbeast {
  id: string;
  name: string;
  type: string;
  element: string;
  elementColor: string;
  elementDotColor: string;
  guardian: string;
  guardianId: string;
  gate: string;
  gateNumber: number;
  frequency: number;
  frequencyLabel: string;
  icon: React.FC<LucideProps>;
  lore: string;
  power: string;
  gradient: string;
  glowColor: string;
  accentHex: string;
}

const GODBEASTS: Godbeast[] = [
  {
    id: 'kaelith',
    name: 'Kaelith',
    type: 'Colossal Stone Serpent-Dragon',
    element: 'Earth',
    elementColor: 'text-earth-bright',
    elementDotColor: 'bg-earth',
    guardian: 'Lyssandria',
    guardianId: 'lyssandria',
    gate: 'Foundation',
    gateNumber: 1,
    frequency: 174,
    frequencyLabel: '174 Hz',
    icon: Shell,
    lore:
      'Kaelith is the oldest of the Godbeasts — a creature so vast that mountains were formed by the impression of its ancient body. Its scales are indistinguishable from bedrock. To stand in its presence is to understand permanence.',
    power: 'Geological shaping, tectonic stability, root-deep survival instinct',
    gradient: 'from-amber-900/30 via-stone-800/20 to-earth-deep/30',
    glowColor: 'rgba(74, 124, 89, 0.4)',
    accentHex: '#4a7c59',
  },
  {
    id: 'veloura',
    name: 'Veloura',
    type: 'Elegant Phoenix-Serpent',
    element: 'Water-Fire / Steam',
    elementColor: 'text-water-bright',
    elementDotColor: 'bg-water',
    guardian: 'Leyla',
    guardianId: 'leyla',
    gate: 'Flow',
    gateNumber: 2,
    frequency: 285,
    frequencyLabel: '285 Hz',
    icon: Bird,
    lore:
      'Veloura is paradox made manifest — a serpent that soars, fire that flows, water that burns. Its feathers shed both steam and song. Wherever Veloura passes, creative tension births new forms that neither fire nor water could produce alone.',
    power: 'Elemental fusion, creative catalysis, the generative tension of opposites',
    gradient: 'from-blue-800/30 via-orange-800/20 to-cyan-900/30',
    glowColor: 'rgba(120, 166, 255, 0.4)',
    accentHex: '#78a6ff',
  },
  {
    id: 'draconis',
    name: 'Draconis',
    type: 'Lion-Dragon Wreathed in Solar Fire',
    element: 'Fire / Solar',
    elementColor: 'text-fire-bright',
    elementDotColor: 'bg-fire',
    guardian: 'Draconia',
    guardianId: 'draconia',
    gate: 'Fire',
    gateNumber: 3,
    frequency: 396,
    frequencyLabel: '396 Hz',
    icon: Flame,
    lore:
      'Draconis was born in the heart of a star. Its roar can ignite volcanoes; its silence can still them. The mane of living flame it wears is not decoration but a crown of will-made-real — a testament that power, once claimed, never dims.',
    power: 'Solar amplification, will-forging, the liberation of latent strength',
    gradient: 'from-fire-deep/30 via-orange-900/20 to-amber-900/30',
    glowColor: 'rgba(255, 107, 53, 0.45)',
    accentHex: '#ff6b35',
  },
  {
    id: 'laeylinn',
    name: 'Laeylinn',
    type: 'The Worldtree Deer',
    element: 'Nature / Verdant',
    elementColor: 'text-earth-bright',
    elementDotColor: 'bg-earth-bright',
    guardian: 'Maylinn',
    guardianId: 'maylinn',
    gate: 'Heart',
    gateNumber: 4,
    frequency: 417,
    frequencyLabel: '417 Hz',
    icon: TreePine,
    lore:
      'Laeylinn is an enormous glowing stag whose antlers reach into the canopy of any forest it enters. Where Laeylinn rests, ancient trees grow in a single season. It does not merely nurture — it holds the emotional memory of every living thing within its territory.',
    power: 'Accelerated growth, emotional healing, the preservation of living memory',
    gradient: 'from-green-900/30 via-emerald-900/20 to-teal-900/30',
    glowColor: 'rgba(107, 158, 122, 0.4)',
    accentHex: '#6b9e7a',
  },
  {
    id: 'otome',
    name: 'Otome',
    type: 'Colossal Whale of Deep Song',
    element: 'Sound / Sonic',
    elementColor: 'text-crystal',
    elementDotColor: 'bg-crystal',
    guardian: 'Alera',
    guardianId: 'alera',
    gate: 'Voice',
    gateNumber: 5,
    frequency: 528,
    frequencyLabel: '528 Hz',
    icon: Fish,
    lore:
      'Otome does not swim — it moves through the resonance of reality itself. Its songs are older than language. Those who hear a full Otome song cannot lie for three days afterward; truth has a way of loosening every knot.',
    power: 'Reality-resonance, compulsive truth, the dissolution of deception',
    gradient: 'from-cyan-900/30 via-blue-900/20 to-teal-900/30',
    glowColor: 'rgba(127, 255, 212, 0.4)',
    accentHex: '#7fffd4',
  },
  {
    id: 'yumiko',
    name: 'Yumiko',
    type: 'Owl-Serpent Hybrid',
    element: 'Dream / Moonlight',
    elementColor: 'text-void-el-bright',
    elementDotColor: 'bg-void-el',
    guardian: 'Lyria',
    guardianId: 'lyria',
    gate: 'Sight',
    gateNumber: 6,
    frequency: 639,
    frequencyLabel: '639 Hz',
    icon: Eye,
    lore:
      'Yumiko exists partially in the waking world and partially in the Dreaming Beyond. Its body shifts like smoke over still water. It does not see with its eyes — it sees with the space between your thoughts, finding the visions you did not know you were already having.',
    power: 'Prophetic sight, dream-walking, revealing patterns hidden within intuition',
    gradient: 'from-purple-900/30 via-indigo-900/20 to-violet-900/30',
    glowColor: 'rgba(153, 102, 255, 0.4)',
    accentHex: '#9966ff',
  },
  {
    id: 'sol',
    name: 'Sol',
    type: 'Radiant Dragon of Crystallized Light',
    element: 'Light / Divine',
    elementColor: 'text-gold-bright',
    elementDotColor: 'bg-brand-gold',
    guardian: 'Aiyami',
    guardianId: 'aiyami',
    gate: 'Crown',
    gateNumber: 7,
    frequency: 741,
    frequencyLabel: '741 Hz',
    icon: Sun,
    lore:
      'Sol is not made of fire but of crystallized divine light — a dragon whose scales refract into every visible hue and many that are not. To look upon Sol directly causes temporary blindness, not from damage, but from the mind\'s attempt to process a beauty beyond its current capacity.',
    power: 'Divine illumination, the shattering of illusion, transcendence crystallized',
    gradient: 'from-yellow-800/30 via-amber-700/20 to-brand-gold/20',
    glowColor: 'rgba(255, 215, 0, 0.45)',
    accentHex: '#ffd700',
  },
  {
    id: 'thessara',
    name: 'Vaelith',
    type: 'Fox of Eight Prismatic Tails',
    element: 'Echo / Fractal',
    elementColor: 'text-brand-secondary',
    elementDotColor: 'bg-brand-secondary',
    guardian: 'Elara',
    guardianId: 'elara',
    gate: 'Shift',
    gateNumber: 8,
    frequency: 852,
    frequencyLabel: '852 Hz',
    icon: Cat,
    lore:
      'Vaelith\'s eight tails each reflect a different facet of the same moment. When all eight are visible simultaneously, observers experience every possible interpretation of their current situation at once. This is not confusion — it is perspective, given primal form.',
    power: 'Reality refraction, simultaneous perspective, the echo of infinite possibility',
    gradient: 'from-pink-900/30 via-rose-900/20 to-purple-900/30',
    glowColor: 'rgba(120, 166, 255, 0.4)',
    accentHex: '#78a6ff',
  },
  {
    id: 'kyuro',
    name: 'Kyuro',
    type: 'Tiger-Dragon of Nine Plasma Tails',
    element: 'Plasma / Balance',
    elementColor: 'text-white',
    elementDotColor: 'bg-white',
    guardian: 'Ino',
    guardianId: 'ino',
    gate: 'Unity',
    gateNumber: 9,
    frequency: 963,
    frequencyLabel: '963 Hz',
    icon: Zap,
    lore:
      'Kyuro\'s nine plasma tails represent the nine forms of sacred partnership recognized in Arcanean cosmology. When Kyuro and Ino merge their presences, the resulting field cannot be entered by those whose commitments are false. Only authentic bonds survive this Godbeast\'s proximity.',
    power: 'Partnership amplification, covenant-testing, plasma equilibrium',
    gradient: 'from-white/10 via-slate-700/20 to-gray-800/30',
    glowColor: 'rgba(200, 214, 229, 0.35)',
    accentHex: '#c8d6e5',
  },
  {
    id: 'amaterasu',
    name: 'Amaterasu',
    type: 'Cosmic Wolf of Starlight',
    element: 'All / None',
    elementColor: 'text-gradient-gold',
    elementDotColor: 'bg-brand-gold',
    guardian: 'Shinkami',
    guardianId: 'shinkami',
    gate: 'Source',
    gateNumber: 10,
    frequency: 1111,
    frequencyLabel: '1111 Hz',
    icon: Star,
    lore:
      'Amaterasu is not entirely present in any single moment. Its body is made of the space between stars — the fertile void from which light is born. Shinkami is the only Guardian to achieve complete fusion with their Godbeast; they exist as one being who wears two names.',
    power: 'Omnipresent awareness, the meta-consciousness of all creation, source-level manifestation',
    gradient: 'from-brand-gold/20 via-brand-primary/20 to-crystal/20',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    accentHex: '#ffd700',
  },
];

// ─── Particle Field ─────────────────────────────────────────────────────────────

function ParticleField() {
  const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────────

function GodbeastsHero() {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Deep space background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-brand-gold/8 via-brand-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-brand-primary/8 blur-3xl" />
      </div>

      {/* Floating godbeast frequency orbs — one per gate */}
      {GODBEASTS.map((beast, i) => {
        const angle = (i / GODBEASTS.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 36;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius * 0.55;
        return (
          <motion.div
            key={beast.id}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: 10,
              height: 10,
              background: beast.accentHex,
              boxShadow: `0 0 16px ${beast.glowColor}, 0 0 4px ${beast.accentHex}`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Particle field */}
      <ParticleField />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-brand-gold/25 mb-8"
        >
          <Star className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-medium text-brand-gold tracking-wide">
            Primal Cosmic Companions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-fluid-hero font-display font-bold mb-6 leading-none"
        >
          <span className="text-gradient-gold">The Godbeasts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-crimson italic mb-6 leading-relaxed"
        >
          "Before the Guardians took their posts, the Godbeasts already existed — primal forces
          given form, older than memory, shaped from the raw frequencies of Lumina and Nero's
          first accord."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-text-muted font-mono tracking-widest uppercase"
        >
          — The Codex of Primal Bonds
        </motion.p>

        {/* Frequency range indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="text-xs font-mono text-text-muted">174 Hz</span>
          <div className="relative h-px w-48 md:w-72">
            <div className="absolute inset-0 bg-gradient-to-r from-earth via-crystal via-brand-gold to-brand-gold rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="text-xs font-mono text-brand-gold">1111 Hz</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Individual Godbeast Card ────────────────────────────────────────────────────

interface GodbeastCardProps {
  beast: Godbeast;
  index: number;
  isInView: boolean;
}

function GodbeastCard({ beast, index, isInView }: GodbeastCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = beast.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        className={cn(
          'iridescent-glass rounded-2xl hover-lift glow-card transition-all duration-500 cursor-pointer',
          expanded && 'shadow-elevation-3'
        )}
        style={{
          boxShadow: expanded
            ? `0 0 40px ${beast.glowColor}, 0 16px 48px rgba(0,0,0,0.4)`
            : undefined,
        }}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        aria-expanded={expanded}
        aria-label={`${beast.name} — click to ${expanded ? 'collapse' : 'expand'} details`}
      >
        {/* Colored gradient underlay */}
        <div
          className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', beast.gradient)}
        />

        {/* Card header — always visible */}
        <div className="relative p-6">
          <div className="flex items-start gap-5">
            {/* Icon area with elemental glow */}
            <div
              className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at center, ${beast.glowColor} 0%, rgba(0,0,0,0.3) 100%)`,
                boxShadow: `0 0 20px ${beast.glowColor}`,
                border: `1px solid ${beast.accentHex}30`,
              }}
            >
              <Icon
                className="w-8 h-8"
                style={{ color: beast.accentHex, filter: `drop-shadow(0 0 6px ${beast.glowColor})` }}
              />
              {/* Frequency badge */}
              <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md bg-cosmic-void/80 border border-white/10">
                <span className="text-xs font-mono" style={{ color: beast.accentHex }}>
                  {beast.gateNumber.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Name + type + badges */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-2xl font-display font-bold mb-1 transition-all duration-300"
                style={{
                  textShadow: expanded ? `0 0 20px ${beast.glowColor}` : undefined,
                  color: expanded ? beast.accentHex : undefined,
                }}
              >
                {beast.name}
              </h3>
              <p className="text-sm text-text-secondary mb-3">{beast.type}</p>

              <div className="flex flex-wrap gap-2">
                {/* Element badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: beast.accentHex, boxShadow: `0 0 4px ${beast.glowColor}` }}
                  />
                  <span className="text-text-secondary">{beast.element}</span>
                </span>
                {/* Guardian bond badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/8 border border-brand-gold/20 text-xs text-brand-gold">
                  <Shield className="w-3 h-3 flex-shrink-0" />
                  Bonded to {beast.guardian}
                </span>
              </div>
            </div>

            {/* Right meta column */}
            <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Gate</div>
                <div className="text-sm font-semibold text-text-primary">{beast.gate}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Frequency</div>
                <div className="text-sm font-mono" style={{ color: beast.accentHex }}>
                  {beast.frequencyLabel}
                </div>
              </div>
              {/* Expand chevron */}
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1"
              >
                <ArrowRight className="w-4 h-4 text-text-muted" />
              </motion.div>
            </div>
          </div>

          {/* Mobile meta row */}
          <div className="sm:hidden mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-text-muted">
                Gate: <span className="text-text-primary font-medium">{beast.gate}</span>
              </span>
              <span className="text-text-muted font-mono" style={{ color: beast.accentHex }}>
                {beast.frequencyLabel}
              </span>
            </div>
            <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowRight className="w-4 h-4 text-text-muted" />
            </motion.div>
          </div>
        </div>

        {/* Expanded lore panel */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative border-t border-white/8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle glow bar at the top of the expansion */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${beast.accentHex}60, transparent)` }}
            />

            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Lore */}
              <div>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">
                  Ancient Record
                </h4>
                <p className="font-crimson text-base text-text-secondary leading-relaxed italic">
                  {beast.lore}
                </p>
              </div>

              {/* Power + links */}
              <div>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">
                  Primal Powers
                </h4>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">{beast.power}</p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/lore/guardians/${beast.guardianId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-glow-sm"
                    style={{
                      background: `${beast.accentHex}18`,
                      border: `1px solid ${beast.accentHex}30`,
                      color: beast.accentHex,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Shield className="w-4 h-4" />
                    Guardian: {beast.guardian}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Godbeasts Grid Section ─────────────────────────────────────────────────────

function GodbeastsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-3xl font-display font-bold mb-4">
            <span className="text-gradient-cosmic">The Ten</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Each Godbeast embodies one of the Ten Solfeggio Frequencies — primal resonances
            that govern how reality organizes itself. Click any card to reveal its ancient record.
          </p>
        </motion.div>

        {/* Cards in a 2-column grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {GODBEASTS.map((beast, i) => (
            <GodbeastCard key={beast.id} beast={beast} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bond Mechanics Section ─────────────────────────────────────────────────────

function BondMechanicsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const mechanics: Array<{ icon: React.FC<LucideProps>; color: string; hex: string; title: string; body: string }> = [
    {
      icon: Eye,
      color: 'crystal',
      hex: '#7fffd4',
      title: 'First Recognition',
      body: 'A Godbeast does not choose its Guardian. The Guardian must demonstrate resonance with the frequency the Godbeast embodies — not through proof, but through being.',
    },
    {
      icon: Heart,
      color: 'fire',
      hex: '#ff6b35',
      title: 'The Tethering',
      body: 'Once recognized, a bond forms. The Guardian does not command the Godbeast. They enter a permanent conversation — a living dialogue between consciousness and primal force.',
    },
    {
      icon: Zap,
      color: 'brand-gold',
      hex: '#ffd700',
      title: 'Harmonic Amplification',
      body: 'Together, Guardian and Godbeast can express frequencies no single being could reach. The Guardian provides direction; the Godbeast provides scale. Separated, both diminish.',
    },
    {
      icon: InfinityIcon,
      color: 'brand-primary',
      hex: '#8b5cf6',
      title: 'Complete Fusion',
      body: 'Shinkami is the sole Guardian to achieve complete fusion with Amaterasu. They are no longer two presences sharing space — they are one entity who occasionally wears a name.',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-brand-primary/6 to-transparent rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-brand-primary/20 mb-6">
            <Shield className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary">The Sacred Covenant</span>
          </div>
          <h2 className="text-fluid-4xl font-display font-bold mb-6">
            How Bonds Are Formed
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-crimson text-lg leading-relaxed">
            A Guardian-Godbeast bond is not a contract. It is a permanent recognition — the
            moment when consciousness and primal force realize they are two expressions of the
            same cosmic intention.
          </p>
        </motion.div>

        {/* Four mechanics cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {mechanics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                className="liquid-glass rounded-2xl p-6 glow-card hover-lift"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${m.hex}18`,
                    border: `1px solid ${m.hex}30`,
                    boxShadow: `0 0 16px ${m.hex}25`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: m.hex }} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{m.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{m.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Shinkami fusion callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="iridescent-glass rounded-2xl p-8 text-center border-gradient"
        >
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(139,92,246,0.15) 50%, transparent 100%)',
              boxShadow: '0 0 40px rgba(255,215,0,0.3)',
              border: '1px solid rgba(255,215,0,0.25)',
            }}
          >
            <Star className="w-10 h-10 text-brand-gold" style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))' }} />
          </div>
          <h3 className="text-2xl font-display font-bold mb-4 text-gradient-gold">
            Shinkami and Amaterasu
          </h3>
          <p className="font-crimson text-lg text-text-secondary max-w-2xl mx-auto italic leading-relaxed mb-6">
            "When Shinkami finally ceased the effort to remain separate, Amaterasu ceased the
            effort to remain wild. In that mutual release, they discovered they had always been
            one. The Source Gate did not open — it was already open. It had been open since the
            first dawn."
          </p>
          <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
            — Chronicles of Guardians, Book of Source
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Frequency Spectrum Section ─────────────────────────────────────────────────

function FrequencySpectrum() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10 bg-aurora opacity-60" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-4xl font-display font-bold mb-4">
            The Solfeggio Spectrum
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            The ten frequencies form a resonance ladder — each one a higher harmonic
            expression of the same fundamental truth.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Central spine line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, rgba(74,124,89,0.6), rgba(127,255,212,0.6), rgba(255,215,0,0.8))',
            }}
          />

          <div className="space-y-4">
            {GODBEASTS.map((beast, i) => {
              const isLeft = i % 2 === 0;
              const Icon = beast.icon;
              return (
                <motion.div
                  key={beast.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'flex items-center gap-4',
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  {/* Content card */}
                  <div className={cn('flex-1', isLeft ? 'text-right' : 'text-left')}>
                    <div
                      className={cn(
                        'inline-block glass rounded-xl px-4 py-3 hover-lift glow-card transition-all duration-300'
                      )}
                      style={{
                        borderColor: `${beast.accentHex}25`,
                      }}
                    >
                      <div
                        className={cn(
                          'flex items-center gap-3',
                          isLeft ? 'flex-row-reverse' : 'flex-row'
                        )}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${beast.accentHex}20`,
                            boxShadow: `0 0 10px ${beast.glowColor}`,
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: beast.accentHex }}
                          />
                        </div>
                        <div className={cn(isLeft ? 'text-right' : 'text-left')}>
                          <div className="text-sm font-display font-semibold" style={{ color: beast.accentHex }}>
                            {beast.name}
                          </div>
                          <div className="text-xs text-text-muted">{beast.gate} Gate</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{
                        background: beast.accentHex,
                        borderColor: beast.accentHex,
                        boxShadow: `0 0 12px ${beast.glowColor}, 0 0 4px ${beast.accentHex}`,
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 8px ${beast.glowColor}`,
                          `0 0 20px ${beast.glowColor}`,
                          `0 0 8px ${beast.glowColor}`,
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.25,
                      }}
                    />
                  </div>

                  {/* Frequency label */}
                  <div className={cn('flex-1', isLeft ? 'text-left' : 'text-right')}>
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: beast.accentHex }}
                    >
                      {beast.frequencyLabel}
                    </span>
                    <div className="text-xs text-text-muted">{beast.guardian}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center text-sm text-text-muted mt-12 font-crimson italic"
        >
          The frequencies ascend from survival to source — each Godbeast a rung on the
          ladder of consciousness.
        </motion.p>
      </div>
    </section>
  );
}

// ─── CTA Footer Section ─────────────────────────────────────────────────────────

function GodbestsCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-fluid-3xl font-display font-bold mb-6">
            Find Your Bond
          </h2>
          <p className="text-text-secondary font-crimson text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Every creator resonates with a particular frequency. Discover which Guardian and
            Godbeast pair reflects your creative nature — and what powers await when that bond
            is acknowledged.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/academy/gate-quiz"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-gold text-cosmic-deep font-semibold text-sm hover:bg-gold-medium transition-all duration-200 shadow-glow-gold hover:shadow-glow-xl"
            >
              <Star className="w-4 h-4" />
              Discover Your Gate
            </Link>
            <Link
              href="/lore/guardians"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-crystal/20 text-crystal font-semibold text-sm hover:border-crystal/40 hover:shadow-glow-md transition-all duration-200"
            >
              <Shield className="w-4 h-4" />
              Meet the Guardians
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Composition ───────────────────────────────────────────────────────────

export function GodbeastsPage() {
  return (
    <div className="bg-cosmic-mesh">
      <GodbeastsHero />
      <hr className="section-divider mx-8" />
      <GodbeastsGrid />
      <hr className="section-divider mx-8" />
      <BondMechanicsSection />
      <hr className="section-divider mx-8" />
      <FrequencySpectrum />
      <GodbestsCTA />
    </div>
  );
}
