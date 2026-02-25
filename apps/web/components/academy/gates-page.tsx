'use client';

/**
 * GatesPage — The Ten Gates of Creation
 *
 * A vertical pathway visualization of all ten Gates, from Foundation (174 Hz)
 * to Source (1111 Hz). Alternating left/right layout on desktop, stacked on
 * mobile. Scroll-triggered stagger animations create a sense of ascending
 * through the Gates as the user progresses down the page.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Mountain,
  Droplets,
  Flame,
  Heart,
  Wind,
  Eye,
  Crown,
  Zap,
  Infinity as InfinityIcon,
  Circle,
  ArrowRight,
  Sparkles,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL GATE DATA
// ─────────────────────────────────────────────────────────────────────────────

interface GateData {
  number: number;
  name: string;
  frequency: string;
  hz: number;
  guardian: string;
  godbeast: string;
  element: string;
  domain: string;
  domainTags: string[];
  color: string;
  glowColor: string;
  description: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
}

const TEN_GATES: GateData[] = [
  {
    number: 1,
    name: 'Foundation',
    frequency: '174 Hz',
    hz: 174,
    guardian: 'Lyssandria',
    godbeast: 'Kaelith',
    element: 'Earth',
    domain: 'Survival, grounding, stability',
    domainTags: ['Survival', 'Grounding', 'Stability'],
    color: '#6b7280',
    glowColor: 'rgba(107,114,128,0.35)',
    description:
      'The root of all creation. Before you can build anything lasting, you must know where you stand. Lyssandria teaches the patient architecture of foundations — that every cathedral begins with a single stone placed with intention.',
    icon: Mountain,
  },
  {
    number: 2,
    name: 'Flow',
    frequency: '285 Hz',
    hz: 285,
    guardian: 'Leyla',
    godbeast: 'Veloura',
    element: 'Water-Fire',
    domain: 'Creativity, emotion, sensation',
    domainTags: ['Creativity', 'Emotion', 'Intuition'],
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.35)',
    description:
      'The second Gate is where creativity ceases to be a discipline and becomes a current. Leyla does not create — she releases. She trusts. She lets the river find its own path through the terrain of her craft.',
    icon: Droplets,
  },
  {
    number: 3,
    name: 'Fire',
    frequency: '396 Hz',
    hz: 396,
    guardian: 'Draconia',
    godbeast: 'Draconis',
    element: 'Fire',
    domain: 'Power, will, courage',
    domainTags: ['Power', 'Will', 'Transformation'],
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.35)',
    description:
      'Draconia burns away everything that is not the work. At the Fire Gate, potential becomes action, hesitation becomes momentum, and the creator discovers the terrifying freedom of full commitment.',
    icon: Flame,
  },
  {
    number: 4,
    name: 'Heart',
    frequency: '417 Hz',
    hz: 417,
    guardian: 'Maylinn',
    godbeast: 'Laeylinn',
    element: 'Nature',
    domain: 'Love, healing, growth',
    domainTags: ['Love', 'Healing', 'Growth'],
    color: '#22c55e',
    glowColor: 'rgba(34,197,94,0.35)',
    description:
      'The Heart Gate is where creation stops being about the creator and becomes about the created. Maylinn teaches that the most powerful work is the work that heals — yourself, your audience, the living world.',
    icon: Heart,
  },
  {
    number: 5,
    name: 'Voice',
    frequency: '528 Hz',
    hz: 528,
    guardian: 'Alera',
    godbeast: 'Otome',
    element: 'Sound',
    domain: 'Truth, expression, communication',
    domainTags: ['Truth', 'Expression', 'Authenticity'],
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.35)',
    description:
      'At the Voice Gate, the creator discovers that their unique perspective is itself the gift. Alera teaches the courage to speak when silence would be safer, and the clarity to know what is genuinely yours to say.',
    icon: Wind,
  },
  {
    number: 6,
    name: 'Sight',
    frequency: '639 Hz',
    hz: 639,
    guardian: 'Lyria',
    godbeast: 'Yumiko',
    element: 'Dream',
    domain: 'Intuition, vision, memory',
    domainTags: ['Intuition', 'Vision', 'Pattern'],
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.35)',
    description:
      'Lyria sees what others cannot — the hidden patterns beneath the surface of things, the emerging forms before they take shape, the deep currents that govern what rises and what recedes. Her creations are portals.',
    icon: Eye,
  },
  {
    number: 7,
    name: 'Crown',
    frequency: '741 Hz',
    hz: 741,
    guardian: 'Aiyami',
    godbeast: 'Sol',
    element: 'Light',
    domain: 'Enlightenment, divinity, mastery',
    domainTags: ['Enlightenment', 'Mastery', 'Divinity'],
    color: '#ffd700',
    glowColor: 'rgba(255,215,0,0.35)',
    description:
      'Aiyami has integrated all aspects of the creative path. At the Crown Gate, the creator no longer creates to express — they transmit. Something larger moves through them: wisdom, light, transcendent understanding.',
    icon: Crown,
  },
  {
    number: 8,
    name: 'Shift',
    frequency: '852 Hz',
    hz: 852,
    guardian: 'Elara',
    godbeast: 'Vaelith',
    element: 'Echo',
    domain: 'Perspective, possibility, transformation',
    domainTags: ['Perspective', 'Possibility', 'Reframe'],
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.35)',
    description:
      'Elara is the master of seeing from every angle simultaneously. The Shift Gate teaches that creative breakthroughs come from releasing attachment to a single viewpoint — every assumption released opens a new dimension.',
    icon: Zap,
  },
  {
    number: 9,
    name: 'Unity',
    frequency: '963 Hz',
    hz: 963,
    guardian: 'Ino',
    godbeast: 'Kyuro',
    element: 'Plasma',
    domain: 'Partnership, collaboration, fusion',
    domainTags: ['Partnership', 'Fusion', 'Co-Creation'],
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.35)',
    description:
      'Ino understands that the greatest creations emerge from the space between two souls working in harmony. At the Unity Gate, individual voices weave into something neither could achieve alone — the whole exceeds the sum.',
    icon: InfinityIcon,
  },
  {
    number: 10,
    name: 'Source',
    frequency: '1111 Hz',
    hz: 1111,
    guardian: 'Shinkami',
    godbeast: 'Amaterasu',
    element: 'All / None',
    domain: 'Meta-consciousness, infinite potential',
    domainTags: ['Meta-Consciousness', 'Infinite', 'Origin'],
    color: '#ffffff',
    glowColor: 'rgba(255,255,255,0.25)',
    description:
      'At the Source Gate, the boundary between creator and creation dissolves. Shinkami exists at the point where all creation begins and to which all creation returns. To open this Gate is to become a living channel.',
    icon: Circle,
  },
];

// Frequency spectrum min/max for the bar visualization
const MIN_HZ = 174;
const MAX_HZ = 1111;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay },
  }),
};

const slideFromSide = (direction: 'left' | 'right') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -48 : 48 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay },
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// GATE NODE — individual gate card in the pathway
// ─────────────────────────────────────────────────────────────────────────────

interface GateNodeProps {
  gate: GateData;
  side: 'left' | 'right';
  index: number;
}

function GateNode({ gate, side, index }: GateNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = gate.icon;

  const slideVariants = slideFromSide(side);

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center gap-0',
        // On desktop: odd gates left, even gates right
        // On mobile: always full-width
        'flex-col md:flex-row',
        side === 'right' && 'md:flex-row-reverse',
      )}
    >
      {/* Gate card — takes up 45% of the row */}
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0.05 * index}
        className={cn(
          'relative w-full md:w-[45%]',
          side === 'left' ? 'md:pr-8' : 'md:pl-8',
        )}
      >
        <div
          className="liquid-glass rounded-2xl p-6 hover-lift transition-all duration-500 group cursor-default"
          style={{
            borderColor: `${gate.color}25`,
          }}
        >
          {/* Inner shimmer top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Header row */}
          <div className="mb-4 flex items-start justify-between gap-3">
            {/* Icon + number cluster */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${gate.color}18`,
                  border: `1px solid ${gate.color}35`,
                  boxShadow: `0 0 18px ${gate.glowColor}`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color: gate.color }} />
              </div>
              <div>
                <p className="text-xs font-sans uppercase tracking-[0.3em] text-text-muted">
                  Gate {gate.number}
                </p>
                <h3
                  className="font-display text-xl font-bold leading-tight"
                  style={{ color: gate.color }}
                >
                  {gate.name}
                </h3>
              </div>
            </div>

            {/* Frequency badge */}
            <div
              className="flex-shrink-0 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold"
              style={{
                color: gate.color,
                backgroundColor: `${gate.color}12`,
                border: `1px solid ${gate.color}28`,
              }}
            >
              {gate.frequency}
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 font-sans text-sm leading-relaxed text-text-secondary">
            {gate.description}
          </p>

          {/* Meta row */}
          <div className="mb-4 grid grid-cols-2 gap-3 text-xs font-sans">
            <div>
              <span className="block text-text-muted uppercase tracking-wider mb-0.5">Guardian</span>
              <Link
                href="/lore/guardians"
                className="font-semibold text-text-primary transition-colors hover:text-crystal"
                style={{ color: gate.color }}
              >
                {gate.guardian}
              </Link>
            </div>
            <div>
              <span className="block text-text-muted uppercase tracking-wider mb-0.5">Godbeast</span>
              <span className="font-semibold text-text-primary">{gate.godbeast}</span>
            </div>
            <div>
              <span className="block text-text-muted uppercase tracking-wider mb-0.5">Element</span>
              <span className="text-text-secondary">{gate.element}</span>
            </div>
          </div>

          {/* Domain tags */}
          <div className="flex flex-wrap gap-1.5">
            {gate.domainTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-sans font-medium"
                style={{
                  color: gate.color,
                  backgroundColor: `${gate.color}12`,
                  border: `1px solid ${gate.color}22`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Central connector node — desktop only */}
      <div className="hidden md:flex md:w-[10%] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.05 * index + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: `${gate.color}18`,
            border: `2px solid ${gate.color}60`,
            boxShadow: `0 0 24px ${gate.glowColor}, inset 0 0 12px ${gate.color}10`,
          }}
        >
          {/* Gate number */}
          <span
            className="font-display text-sm font-bold"
            style={{ color: gate.color }}
          >
            {gate.number}
          </span>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${gate.color}40` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Spacer for the opposite side — desktop */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY CONNECTOR LINE — the vertical beam connecting gates
// Each instance manages its own scroll detection to avoid hooks-in-loop.
// ─────────────────────────────────────────────────────────────────────────────

interface PathwayLineProps {
  color: string;
  nextColor: string;
  delay: number;
}

function PathwayLine({ color, nextColor, delay }: PathwayLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="hidden md:flex relative justify-center">
      {/* The gradient line segment between two gate nodes */}
      <div className="relative w-[2px] h-16 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 rounded-full animate-glow-pulse"
          style={{
            background: `linear-gradient(to bottom, ${color}80, ${nextColor}80)`,
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }}
        />
        {/* Traveling particle */}
        <motion.div
          className="absolute left-0 right-0 h-4 rounded-full"
          style={{
            background: `linear-gradient(to bottom, transparent, ${nextColor}, transparent)`,
          }}
          animate={isInView ? { y: ['-100%', '400%'] } : { y: '-100%' }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear', delay: delay + 0.5 }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FREQUENCY SPECTRUM BAR
// ─────────────────────────────────────────────────────────────────────────────

function FrequencySpectrum() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative mt-24 mb-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
        className="mb-8 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-crystal/20 bg-crystal/5 px-4 py-1.5">
          <Radio className="h-3.5 w-3.5 text-crystal" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-crystal">
            Solfeggio Frequency Spectrum
          </span>
        </div>
        <p className="font-sans text-sm text-text-muted">
          Each Gate resonates at a specific frequency — a vibrational signature that defines its creative dimension.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0.1}
        className="glass-strong rounded-2xl p-6 md:p-8"
      >
        {/* Spectrum track */}
        <div className="relative">
          {/* Background track */}
          <div className="relative h-3 w-full rounded-full bg-white/5 overflow-hidden">
            {/* Gradient fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  'linear-gradient(to right, #6b7280, #f97316, #ef4444, #22c55e, #06b6d4, #8b5cf6, #ffd700, #a855f7, #3b82f6, #ffffff)',
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          {/* Gate markers */}
          <div className="relative mt-3">
            {TEN_GATES.map((gate) => {
              const position = ((gate.hz - MIN_HZ) / (MAX_HZ - MIN_HZ)) * 100;
              return (
                <motion.div
                  key={gate.number}
                  className="absolute -translate-x-1/2 flex flex-col items-center gap-1"
                  style={{ left: `${position}%` }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + gate.number * 0.06, duration: 0.4 }}
                >
                  {/* Dot */}
                  <div
                    className="h-2.5 w-2.5 rounded-full border-2 border-cosmic-deep"
                    style={{
                      backgroundColor: gate.color,
                      boxShadow: `0 0 8px ${gate.glowColor}`,
                    }}
                  />
                  {/* Gate name — alternating above/below to prevent overlap */}
                  <div
                    className={cn(
                      'flex flex-col items-center gap-0.5',
                      gate.number % 2 === 0 ? 'order-first -mt-10' : '',
                    )}
                  >
                    <span
                      className="font-display text-[10px] font-semibold whitespace-nowrap"
                      style={{ color: gate.color }}
                    >
                      {gate.name}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted whitespace-nowrap">
                      {gate.frequency}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Spacer for the label rows above/below */}
          <div className="h-12" />
        </div>

        {/* Min/Max labels */}
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-text-muted">
          <span>174 Hz — Foundation</span>
          <span>1111 Hz — Source</span>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OPENING GATES PANEL
// ─────────────────────────────────────────────────────────────────────────────

function OpeningGatesPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const points = [
    {
      title: 'A Gate is a Dimension of Creation',
      body: 'Each Gate is not a course to complete — it is a dimension of creative capacity to inhabit. You do not "finish" the Foundation Gate. You deepen your relationship with it.',
    },
    {
      title: 'Opening is a Practice, Not an Event',
      body: 'Gates open through lived creative experience: through work made, failures metabolized, truths articulated. The Guardians do not grant access — they witness your readiness.',
    },
    {
      title: 'All Gates Are Available, Not All Are Open',
      body: 'You can visit any Gate at any time. But a Gate truly opens when its wisdom lives in your body, your decisions, and the work you put into the world.',
    },
    {
      title: 'The Path Ascends But Also Deepens',
      body: 'Higher Gates do not supersede lower ones. A Luminor holds all ten simultaneously. Ascending the path means becoming more fully present at every level, not transcending the earlier ones.',
    },
  ];

  return (
    <section ref={ref} className="mt-20 mb-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
        className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(139,92,246,0.08)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(255,215,0,0.06)' }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative">
          {/* Section eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.05}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/15 border border-brand-gold/25">
              <Sparkles className="h-4 w-4 text-brand-gold" />
            </div>
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold">
              What it means to open a Gate
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
            className="mb-4 font-display text-3xl font-bold md:text-4xl text-gradient-gold"
          >
            Opening a Gate
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.15}
            className="mb-10 max-w-2xl font-crimson text-lg italic text-text-secondary leading-relaxed"
          >
            "A Gate does not open because you have studied enough. It opens because you have
            become enough — and then you realize the study continues, only deeper."
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.2 + i * 0.08}
                className="glass rounded-2xl p-6"
              >
                <h3 className="mb-3 font-display text-base font-semibold text-text-primary">
                  {point.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-text-secondary">
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Magic ranks reference */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.5}
            className="mt-8 border-t border-white/8 pt-8"
          >
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-text-muted">
              The Path of Mastery
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { rank: 'Apprentice', gates: '0-2', color: '#6b7280' },
                { rank: 'Mage', gates: '3-4', color: '#3b82f6' },
                { rank: 'Master', gates: '5-6', color: '#8b5cf6' },
                { rank: 'Archmage', gates: '7-8', color: '#f59e0b' },
                { rank: 'Luminor', gates: '9-10', color: '#ffd700' },
              ].map((level) => (
                <div
                  key={level.rank}
                  className="flex items-center gap-2 rounded-xl glass px-4 py-2.5"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: level.color,
                      boxShadow: `0 0 8px ${level.color}`,
                    }}
                  />
                  <span className="font-sans text-xs text-text-muted">{level.gates} Gates</span>
                  <span
                    className="font-display text-sm font-semibold"
                    style={{ color: level.color }}
                  >
                    {level.rank}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────

function GatesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative mb-20 pt-16 text-center">
      {/* Vertical beam of light */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px overflow-hidden h-40 hidden md:block">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.6), rgba(139,92,246,0.4), transparent)',
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/6 blur-3xl" />
        <div className="absolute right-1/4 top-16 h-64 w-64 translate-x-1/2 rounded-full bg-brand-primary/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.1}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/8 px-5 py-2"
        >
          <Crown className="h-4 w-4 text-brand-gold" />
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold">
            The Academy of Creation
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.15}
          className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient-gold">The Ten Gates</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.22}
          className="mb-4 font-crimson text-xl italic leading-relaxed text-text-secondary md:text-2xl"
        >
          "Ten dimensions of creative power. One ascending path. No destination — only
          perpetual deepening."
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.28}
          className="font-sans text-base leading-relaxed text-text-secondary max-w-2xl mx-auto"
        >
          From Foundation at 174 Hz to Source at 1111 Hz, each Gate opens a new dimension of
          creative mastery. Guided by Ten Guardians and their Godbeasts, the journey is not a
          curriculum — it is a transformation.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.34}
          className="mt-10 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '10', label: 'Gates' },
            { value: '10', label: 'Guardians' },
            { value: '174 – 1111', label: 'Hz Range' },
            { value: '5', label: 'Magic Ranks' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-text-primary md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-0.5 font-sans text-xs uppercase tracking-wider text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL PATHWAY — the centerpiece gate journey
// ─────────────────────────────────────────────────────────────────────────────

function GatesPathway() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 md:px-6">
      {/* Central vertical line — full height background guide */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden md:block">
        <div className="h-full bg-gradient-to-b from-transparent via-white/6 to-transparent" />
      </div>

      <div className="relative space-y-0">
        {TEN_GATES.map((gate, index) => {
          const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
          const isLast = index === TEN_GATES.length - 1;
          const nextGate = TEN_GATES[index + 1];

          return (
            <div key={gate.number}>
              {/* Gate node card */}
              <GateNode gate={gate} side={side} index={index} />

              {/* Connector line to next gate — each PathwayLine owns its own useInView */}
              {!isLast && nextGate && (
                <PathwayLine
                  color={gate.color}
                  nextColor={nextGate.color}
                  delay={0.05 * index}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────

function GatesCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="mt-20 pb-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.4em] text-text-muted">
          Ready to begin
        </p>
        <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
          Your journey starts at Foundation
        </h2>
        <p className="mb-10 font-sans text-base leading-relaxed text-text-secondary">
          Every Luminor began as an Apprentice. The path is long, the work is real, and the
          Guardians are waiting. Your first Gate is open.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/academy"
            className="liquid-glass group inline-flex items-center gap-3 rounded-xl border border-brand-primary/30 px-8 py-4 font-sans font-semibold text-text-primary transition-all hover:border-brand-primary/60 hover-lift"
          >
            Begin Your Journey
            <ArrowRight className="h-5 w-5 text-brand-primary transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/academy/gate-quiz"
            className="group inline-flex items-center gap-2 font-sans text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            <Sparkles className="h-4 w-4 text-brand-gold" />
            Find your Guardian first
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function GatesPage() {
  return (
    <div className="relative">
      {/* Page-level ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-gold/4 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-crystal/3 blur-[140px]" />
      </div>

      {/* Breadcrumb */}
      <div className="relative mx-auto max-w-5xl px-4 pt-8 md:px-6">
        <nav className="flex items-center gap-2 font-sans text-xs text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-text-secondary">
            Arcanea
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/academy" className="transition-colors hover:text-text-secondary">
            Academy
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-text-secondary">The Ten Gates</span>
        </nav>
      </div>

      {/* Hero */}
      <GatesHero />

      {/* Pathway */}
      <GatesPathway />

      {/* Frequency Spectrum */}
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <FrequencySpectrum />
      </div>

      {/* Opening Gates Explanation */}
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <OpeningGatesPanel />
      </div>

      {/* CTA */}
      <GatesCTA />
    </div>
  );
}
