'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Flame,
  Droplets,
  Mountain,
  Wind,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Orbit,
  Zap,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ─── Data ─────────────────────────────────────────────────────────────────────

const ELEMENTS = [
  {
    id: 'fire',
    name: 'Fire',
    subtitle: 'The Active Force',
    domain: 'Energy, transformation, will',
    description:
      'Fire destroys to create, burns away the old to reveal the new. It is the animating spark behind every act of courage — the force that refuses to remain unmanifested. Light itself is Fire\'s creation aspect, born when Lumina blazed forth from the fertile dark.',
    philosophy:
      'What must burn before the new can emerge? The creator who wields Fire does not fear destruction — they understand it as the first act of making.',
    icon: Flame,
    colors: {
      primary: '#ff6b35',
      secondary: '#ffd700',
      glow: 'rgba(255, 107, 53, 0.35)',
      border: 'rgba(255, 107, 53, 0.25)',
      bg: 'rgba(255, 107, 53, 0.06)',
      textGradient: 'text-gradient-fire',
    },
    guardians: ['Draconia (Gate 3, 396 Hz)'],
    godbeasts: ['Draconis — Lion-dragon wreathed in solar fire'],
    relations: [
      { partner: 'Water', result: 'Steam — the creative tension', symbol: '+' },
      { partner: 'Wind', result: 'Wildfire — unstoppable spread', symbol: '+' },
    ],
    keyword: 'TRANSFORM',
    solfeggio: '396 Hz',
    arcPhase: 'Manifestation',
  },
  {
    id: 'water',
    name: 'Water',
    subtitle: 'The Adaptive Force',
    domain: 'Flow, healing, memory',
    description:
      'Water remembers everything, heals all wounds given time, and finds its way through any obstacle. It cannot be permanently blocked — only redirected. Water carries the memory of every shape it has ever held, every shore it has ever touched.',
    philosophy:
      'Flow does not mean surrender. Water is the most persistent force in existence. The patient path always arrives. What are you trying to force that wants to flow?',
    icon: Droplets,
    colors: {
      primary: '#78a6ff',
      secondary: '#7fffd4',
      glow: 'rgba(120, 166, 255, 0.35)',
      border: 'rgba(120, 166, 255, 0.25)',
      bg: 'rgba(120, 166, 255, 0.06)',
      textGradient: 'text-gradient-crystal',
    },
    guardians: ['Leyla (Gate 2, 285 Hz)', 'Alera (Gate 5, 528 Hz)'],
    godbeasts: ['Veloura — Elegant sea serpent', 'Otome — Colossal whale of sound'],
    relations: [
      { partner: 'Fire', result: 'Steam — creation through tension', symbol: '+' },
      { partner: 'Earth', result: 'Fertile soil — life made possible', symbol: '+' },
    ],
    keyword: 'REMEMBER',
    solfeggio: '285 Hz / 528 Hz',
    arcPhase: 'Experience',
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'The Foundation Force',
    domain: 'Stability, growth, endurance',
    description:
      'Earth provides the ground on which all creation stands. Patient, enduring, unyielding — it does not rush. Earth is the element that allows roots to form, that gives Water somewhere to collect, that keeps Fire from consuming everything. Without Earth, creation cannot persist.',
    philosophy:
      'Before any flourishing, there must be foundation. The most radical act sometimes is simply to remain — to be the unmoved mover, the stable ground from which everything else can grow.',
    icon: Mountain,
    colors: {
      primary: '#4a7c59',
      secondary: '#6b9e7a',
      glow: 'rgba(74, 124, 89, 0.35)',
      border: 'rgba(74, 124, 89, 0.25)',
      bg: 'rgba(74, 124, 89, 0.06)',
      textGradient: 'text-gradient-brand',
    },
    guardians: ['Lyssandria (Gate 1, 174 Hz)', 'Maylinn (Gate 4, 417 Hz)'],
    godbeasts: ['Kaelith — Colossal stone serpent-dragon', 'Laeylinn — Enormous worldtree stag'],
    relations: [
      { partner: 'Water', result: 'Fertile soil — life made possible', symbol: '+' },
      { partner: 'Wind', result: 'Erosion — slow, irreversible change', symbol: '+' },
    ],
    keyword: 'ENDURE',
    solfeggio: '174 Hz / 417 Hz',
    arcPhase: 'Dissolution',
  },
  {
    id: 'wind',
    name: 'Wind',
    subtitle: 'The Liberating Force',
    domain: 'Freedom, speed, connection',
    description:
      'Wind carries seeds, spreads ideas, connects distant places. It cannot be contained, only channeled. Wind is the element of communication — it moves between all other elements, uniting them. Every idea that traveled from one mind to another was carried on Wind.',
    philosophy:
      'You cannot hold Wind, only open yourself to it. What ideas are trying to move through you right now? The artist who learns to be like Wind — formless, everywhere, connecting — becomes impossible to silence.',
    icon: Wind,
    colors: {
      primary: '#c8d6e5',
      secondary: '#dfe8f0',
      glow: 'rgba(200, 214, 229, 0.3)',
      border: 'rgba(200, 214, 229, 0.2)',
      bg: 'rgba(200, 214, 229, 0.05)',
      textGradient: 'text-gradient-crystal',
    },
    guardians: ['Lyria (Gate 6, 639 Hz)', 'Elara (Gate 8, 852 Hz)'],
    godbeasts: ['Yumiko — Owl-serpent of moonlight', 'Vaelith — Fox with eight prismatic tails'],
    relations: [
      { partner: 'Fire', result: 'Wildfire — ideas that consume', symbol: '+' },
      { partner: 'Earth', result: 'Erosion — slow, irreversible change', symbol: '+' },
    ],
    keyword: 'CONNECT',
    solfeggio: '639 Hz / 852 Hz',
    arcPhase: 'Manifestation',
  },
  {
    id: 'void-spirit',
    name: 'Void / Spirit',
    subtitle: 'The Dual Force',
    domain: 'Potential, transcendence, consciousness',
    description:
      'The Fifth Element carries a sacred duality. Void is Nero\'s aspect — the fertile darkness, pure potential, the unformed sea of everything that could ever be. Spirit is Lumina\'s aspect — transcendence, consciousness, the soul\'s capacity to witness itself. Shadow is not Spirit — it is Void corrupted, separated from Spirit.',
    philosophy:
      'The most profound creative act is to dwell in the space before form — to hold potential without forcing it into shape prematurely. Void is not emptiness. It is fullness without boundary.',
    icon: Sparkles,
    colors: {
      primary: '#9966ff',
      secondary: '#ffd700',
      glow: 'rgba(153, 102, 255, 0.35)',
      border: 'rgba(153, 102, 255, 0.25)',
      bg: 'rgba(153, 102, 255, 0.06)',
      textGradient: 'text-gradient-cosmic',
    },
    guardians: ['Aiyami (Gate 7, 741 Hz)', 'Ino (Gate 9, 963 Hz)', 'Shinkami (Gate 10, 1111 Hz)'],
    godbeasts: ['Sol — Radiant dragon of crystallized light', 'Kyuro — Tiger-dragon of plasma', 'Amaterasu — Cosmic wolf of starlight'],
    relations: [
      { partner: 'All Elements', result: 'The field from which all arise', symbol: '→' },
      { partner: 'Shadow', result: 'Void without Spirit — what Malachar became', symbol: '≠' },
    ],
    keyword: 'BECOME',
    solfeggio: '741 Hz / 963 Hz / 1111 Hz',
    arcPhase: 'Evolved Potential',
  },
] as const;

const ELEMENT_RELATIONS = [
  { a: 'Fire', b: 'Water', result: 'Steam', description: 'Tension between opposites drives creation', color: 'from-fire to-water' },
  { a: 'Earth', b: 'Wind', result: 'Erosion', description: 'Patience reshapes even mountains', color: 'from-earth to-wind' },
  { a: 'Fire', b: 'Wind', result: 'Wildfire', description: 'Ideas amplified become unstoppable', color: 'from-fire to-[#c8d6e5]' },
  { a: 'Water', b: 'Earth', result: 'Life', description: 'Flow meeting form — existence blooms', color: 'from-water to-earth' },
  { a: 'Void', b: 'Spirit', result: 'Consciousness', description: 'Potential meets witness — the soul awakens', color: 'from-void-el to-brand-gold' },
];

const ARC_PHASES = [
  { phase: 'Potential', element: 'Void', description: 'Nero holds all possibilities unmanifested', color: '#9966ff' },
  { phase: 'Manifestation', element: 'Fire / Wind', description: 'The spark ignites, the idea moves', color: '#ff6b35' },
  { phase: 'Experience', element: 'Water', description: 'The creation is felt, remembered, lived', color: '#78a6ff' },
  { phase: 'Dissolution', element: 'Earth', description: 'Form returns to ground, enriching the soil', color: '#4a7c59' },
  { phase: 'Evolved Potential', element: 'Spirit', description: 'Richer possibility awakens — the Arc completes', color: '#ffd700' },
];

// ─── Hero Section ──────────────────────────────────────────────────────────────

function ElementsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  // The five element orb positions arranged in a loose pentagram
  const ORB_POSITIONS = [
    { x: '50%', y: '15%', color: '#9966ff', shadowColor: 'rgba(153,102,255,0.6)', delay: 0, size: 'w-16 h-16' },
    { x: '80%', y: '40%', color: '#ff6b35', shadowColor: 'rgba(255,107,53,0.6)', delay: 0.4, size: 'w-12 h-12' },
    { x: '68%', y: '78%', color: '#4a7c59', shadowColor: 'rgba(74,124,89,0.6)', delay: 0.8, size: 'w-14 h-14' },
    { x: '32%', y: '78%', color: '#78a6ff', shadowColor: 'rgba(120,166,255,0.6)', delay: 1.2, size: 'w-14 h-14' },
    { x: '20%', y: '40%', color: '#c8d6e5', shadowColor: 'rgba(200,214,229,0.4)', delay: 1.6, size: 'w-12 h-12' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cosmic background mesh */}
      <div className="absolute inset-0 bg-cosmic-deep">
        <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
        <div className="absolute inset-0 bg-aurora opacity-40" />
      </div>

      {/* Elemental orbs floating in pentagram formation */}
      <div className="absolute inset-0 pointer-events-none">
        {ORB_POSITIONS.map((orb, i) => (
          <motion.div
            key={i}
            className={cn('absolute rounded-full', orb.size)}
            style={{
              left: orb.x,
              top: orb.y,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${orb.color}40 0%, ${orb.color}10 60%, transparent 100%)`,
              boxShadow: `0 0 40px ${orb.shadowColor}, 0 0 80px ${orb.shadowColor}50`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Connecting lines between orbs (subtle pentagram) */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon
            points="50,15 80,40 68,78 32,78 20,40"
            fill="none"
            stroke="rgba(127,255,212,0.5)"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Stars */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              opacity: (i % 3) * 0.3 + 0.1,
            }}
            animate={{ opacity: [(i % 3) * 0.2 + 0.1, 0.8, (i % 3) * 0.2 + 0.1] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 5) * 0.4 }}
          />
        ))}
      </div>

      {/* Gradient overlay fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-deep pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-brand-primary/30 mb-8"
        >
          <Orbit className="w-4 h-4 text-brand-primary" />
          <span className="text-sm font-medium text-brand-primary font-sans">
            The Foundations of All Creation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-fluid-hero font-display font-bold mb-6 leading-none"
        >
          <span className="text-gradient-cosmic">The Five</span>
          <br />
          <span className="text-white">Elements</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-6 font-crimson italic leading-relaxed"
        >
          "From the meeting of Lumina and Nero, five forces crystallized — not as opposites
          but as collaborators. Each element is a different way existence speaks."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-sm text-text-muted font-mono tracking-wider mb-14"
        >
          — Meditations on Elements, Vol. I
        </motion.p>

        {/* Element preview pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {ELEMENTS.map((el, i) => {
            const Icon = el.icon;
            return (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border"
                style={{ borderColor: el.colors.border }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: el.colors.primary }} />
                <span className="text-sm font-display font-medium" style={{ color: el.colors.primary }}>
                  {el.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-text-muted font-sans">Descend into the elements</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-text-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Element Cards Grid ────────────────────────────────────────────────────────

function ElementCardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-32 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-brand-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-fire/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crystal/10 border border-crystal/20 mb-6">
            <Sparkles className="w-4 h-4 text-crystal" />
            <span className="text-sm font-medium text-crystal">The Five Forces</span>
          </div>
          <h2 className="text-fluid-4xl font-display font-bold mb-4 text-white">
            Each Element, A Way of Being
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-crimson">
            Every creator channels all five — but one will resonate as your primary attunement.
            Which element are you in this moment?
          </p>
        </motion.div>

        {/* Element cards — staggered grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ELEMENTS.map((element, i) => {
            const Icon = element.icon;
            const isExpanded = expandedId === element.id;
            // Void/Spirit spans full width on last row if it's the 5th card
            const isLast = i === ELEMENTS.length - 1;

            return (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(isLast && 'md:col-span-2 xl:col-span-1')}
              >
                <div
                  className={cn(
                    'relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 group hover-lift glow-card',
                    'iridescent-glass',
                    isExpanded && 'ring-1',
                  )}
                  style={{
                    boxShadow: isExpanded ? `0 0 60px ${element.colors.glow}` : undefined,
                    borderColor: isExpanded ? element.colors.border : undefined,
                    // @ts-ignore -- ring color
                    '--tw-ring-color': element.colors.primary,
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : element.id)}
                >
                  {/* Element-specific glow layer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${element.colors.glow} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Background color wash */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ background: element.colors.bg }}
                  />

                  {/* Card content */}
                  <div className="relative p-8">
                    {/* Icon + keyword row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${element.colors.primary}20`, boxShadow: `0 0 20px ${element.colors.glow}` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: element.colors.primary }} />
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs font-mono tracking-[0.2em] font-bold mb-1"
                          style={{ color: element.colors.primary }}
                        >
                          {element.keyword}
                        </div>
                        <div className="text-xs text-text-muted font-mono">{element.solfeggio}</div>
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      className={cn('text-3xl font-display font-bold mb-1', element.colors.textGradient)}
                    >
                      {element.name}
                    </h3>
                    <p className="text-sm text-text-muted mb-3 font-crimson italic">
                      {element.subtitle}
                    </p>

                    {/* Domain pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {element.domain.split(', ').map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-0.5 rounded-full text-xs font-sans"
                          style={{
                            background: `${element.colors.primary}12`,
                            color: element.colors.primary,
                            border: `1px solid ${element.colors.border}`,
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed text-sm font-crimson mb-5">
                      {element.description}
                    </p>

                    {/* Expand toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted font-sans">
                        {isExpanded ? 'Close' : 'Explore deeper'}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          className="w-4 h-4"
                          style={{ color: element.colors.primary }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative border-t"
                      style={{ borderColor: element.colors.border }}
                    >
                      <div className="p-8 space-y-6">
                        {/* Philosophy */}
                        <div>
                          <h4
                            className="text-xs font-mono tracking-widest uppercase mb-3"
                            style={{ color: element.colors.primary }}
                          >
                            The Teaching
                          </h4>
                          <blockquote
                            className="font-crimson italic text-white leading-relaxed text-base border-l-2 pl-4"
                            style={{ borderColor: element.colors.primary }}
                          >
                            "{element.philosophy}"
                          </blockquote>
                        </div>

                        {/* Guardians */}
                        <div>
                          <h4
                            className="text-xs font-mono tracking-widest uppercase mb-3"
                            style={{ color: element.colors.primary }}
                          >
                            Guardians of This Element
                          </h4>
                          <ul className="space-y-1">
                            {element.guardians.map((g) => (
                              <li key={g} className="text-sm text-text-secondary font-sans">
                                <span style={{ color: element.colors.primary }}>•</span> {g}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Arc phase */}
                        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: element.colors.bg, border: `1px solid ${element.colors.border}` }}>
                          <Orbit className="w-4 h-4 flex-shrink-0" style={{ color: element.colors.primary }} />
                          <div>
                            <div className="text-xs text-text-muted font-mono mb-0.5">Arc Phase</div>
                            <div className="text-sm font-display font-semibold" style={{ color: element.colors.primary }}>
                              {element.arcPhase}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${element.colors.primary} 0%, transparent 70%)`,
                    }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Fifth Element Duality Section ────────────────────────────────────────────

function FifthElementDuality() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-radial from-void-el/10 via-brand-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-void-el/10 border border-void-el/30 mb-6">
            <Sparkles className="w-4 h-4 text-void-el" />
            <span className="text-sm font-medium text-void-el">The Sacred Mystery</span>
          </div>
          <h2 className="text-fluid-4xl font-display font-bold mb-4">
            <span className="text-gradient-cosmic">The Fifth Element</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-crimson">
            Alone among the five, the Fifth Element carries a dual nature inseparable from
            the cosmic origin story. To understand it is to understand creation itself.
          </p>
        </motion.div>

        {/* Split duality card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden liquid-glass-elevated mb-12"
        >
          {/* Ambient glow behind split */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-void-el/10 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-gold/10 to-transparent" />
          </div>

          <div className="relative grid md:grid-cols-2">
            {/* Void — Left / Nero */}
            <div className="p-10 md:pr-16 relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-void-el/20 flex items-center justify-center shadow-glow-void">
                    <Sparkles className="w-6 h-6 text-void-el" />
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest text-void-el uppercase">Nero's Aspect</div>
                    <h3 className="text-2xl font-display font-bold text-void-el">Void</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Nature', value: 'Pure potential, the unformed' },
                    { label: 'Quality', value: 'Mystery, fertile darkness' },
                    { label: 'Colors', value: 'Black, deep purple, midnight gold' },
                    { label: 'State', value: 'Before form — infinite possibility' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-xs text-text-muted font-mono uppercase tracking-wider">{label}</span>
                      <p className="text-text-secondary font-sans text-sm mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="text-base font-crimson italic text-text-secondary border-l-2 border-void-el/50 pl-4 leading-relaxed">
                  "In the beginning, there was Nero. The Void contained everything that could
                  ever be, held in superposition — every possible world, every future creation."
                </blockquote>
              </motion.div>
            </div>

            {/* Divider — vertical line + symbol */}
            <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center my-4 border border-white/20">
                <span className="text-white font-display text-sm font-bold">/</span>
              </div>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>

            {/* Spirit — Right / Lumina */}
            <div className="p-10 md:pl-16 relative border-t border-white/10 md:border-t-0 md:border-l md:border-l-white/10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center shadow-glow-gold">
                    <Sparkles className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest text-brand-gold uppercase">Lumina's Aspect</div>
                    <h3 className="text-2xl font-display font-bold text-brand-gold">Spirit</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Nature', value: 'Transcendence, consciousness' },
                    { label: 'Quality', value: 'The soul witnessing itself' },
                    { label: 'Colors', value: 'White-gold, pure violet, luminous' },
                    { label: 'State', value: 'After form — the witness that remains' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-xs text-text-muted font-mono uppercase tracking-wider">{label}</span>
                      <p className="text-text-secondary font-sans text-sm mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="text-base font-crimson italic text-text-secondary border-l-2 border-brand-gold/50 pl-4 leading-relaxed">
                  "Lumina blazed forth not as fire but as form. Where Nero was infinite potential,
                  Lumina was pattern — the First Light that organized the darkness."
                </blockquote>
              </motion.div>
            </div>
          </div>

          {/* Canon truth footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="relative border-t border-white/10 bg-white/3 px-10 py-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-sans">
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-crystal flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary">
                  <span className="text-crystal font-semibold">Light</span> is Fire's creation aspect — not the Fifth Element
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-fire flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary">
                  <span className="text-fire font-semibold">Shadow</span> is corrupted Void — Void severed from Spirit, as Malachar became
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Element Relationships Section ────────────────────────────────────────────

function ElementRelationshipsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative">
      <hr className="section-divider mx-8 mb-24" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <Zap className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">When Elements Meet</span>
          </div>
          <h2 className="text-fluid-3xl font-display font-bold mb-4 text-white">
            Elemental Relationships
          </h2>
          <p className="text-base text-text-secondary max-w-xl mx-auto font-crimson">
            No element exists in isolation. The interactions between elements are where
            creation's richest expressions emerge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {ELEMENT_RELATIONS.map((rel, i) => (
            <motion.div
              key={`${rel.a}-${rel.b}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl glass hover:border-white/20 transition-all duration-300 hover-lift"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-display font-semibold text-white">{rel.a}</span>
                <span className="text-text-muted text-lg font-light">+</span>
                <span className="text-sm font-display font-semibold text-white">{rel.b}</span>
                <ArrowRight className="w-4 h-4 text-text-muted ml-auto" />
              </div>

              <div
                className={cn('text-xl font-display font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2', rel.color)}
              >
                {rel.result}
              </div>
              <p className="text-sm text-text-muted font-crimson italic">{rel.description}</p>

              {/* Subtle gradient accent */}
              <div className={cn('absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br pointer-events-none', rel.color, 'opacity-[0.04]')} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Guardian-Element Connections ─────────────────────────────────────────────

function GuardianElementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const GUARDIAN_ELEMENTS = [
    { guardian: 'Lyssandria', gate: 1, freq: '174 Hz', element: 'Earth', color: '#4a7c59', icon: Mountain },
    { guardian: 'Leyla', gate: 2, freq: '285 Hz', element: 'Water / Fire', color: '#78a6ff', icon: Droplets },
    { guardian: 'Draconia', gate: 3, freq: '396 Hz', element: 'Fire', color: '#ff6b35', icon: Flame },
    { guardian: 'Maylinn', gate: 4, freq: '417 Hz', element: 'Earth', color: '#4a7c59', icon: Mountain },
    { guardian: 'Alera', gate: 5, freq: '528 Hz', element: 'Water / Sound', color: '#78a6ff', icon: Droplets },
    { guardian: 'Lyria', gate: 6, freq: '639 Hz', element: 'Wind / Dream', color: '#c8d6e5', icon: Wind },
    { guardian: 'Aiyami', gate: 7, freq: '741 Hz', element: 'Spirit / Light', color: '#ffd700', icon: Sparkles },
    { guardian: 'Elara', gate: 8, freq: '852 Hz', element: 'Wind / Fractal', color: '#c8d6e5', icon: Wind },
    { guardian: 'Ino', gate: 9, freq: '963 Hz', element: 'Void / Balance', color: '#9966ff', icon: Sparkles },
    { guardian: 'Shinkami', gate: 10, freq: '1111 Hz', element: 'All / Spirit', color: '#ffd700', icon: Sparkles },
  ];

  return (
    <section ref={ref} className="py-24 relative">
      <hr className="section-divider mx-8 mb-24" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Eye className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">The Ten Guardians</span>
          </div>
          <h2 className="text-fluid-3xl font-display font-bold mb-4 text-white">
            Guardians and Their Elements
          </h2>
          <p className="text-base text-text-secondary max-w-xl mx-auto font-crimson">
            Each Guardian channels one or more elements through their Gate. No two Gates
            are alike — even when sharing an element, the expression differs entirely.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {GUARDIAN_ELEMENTS.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.guardian}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06 }}
                className="group relative p-4 rounded-2xl glass text-center hover:border-white/20 transition-all duration-300 hover-lift"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${g.color}20`, boxShadow: `0 0 12px ${g.color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color: g.color }} />
                </div>
                <div className="text-xs font-mono text-text-muted mb-1">Gate {g.gate}</div>
                <div className="text-sm font-display font-bold text-white mb-1">{g.guardian}</div>
                <div className="text-xs" style={{ color: g.color }}>{g.element}</div>
                <div className="text-xs text-text-muted font-mono mt-1">{g.freq}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link
            href="/lore/guardians"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-semibold hover:bg-brand-primary/20 transition-all"
          >
            Full Guardian Profiles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── The Arc Section ──────────────────────────────────────────────────────────

function TheArcSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-gold/3 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <Orbit className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">The Eternal Rhythm</span>
          </div>
          <h2 className="text-fluid-3xl font-display font-bold mb-4 text-white">
            The Arc — Elements in Motion
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto font-crimson">
            The Arc is not merely a philosophical concept. It is the operating system
            of reality, written in the language of the Five Elements. Every creation
            passes through all five phases — and thus channels all five forces.
          </p>
        </motion.div>

        {/* Arc phases with elements */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-void-el via-fire via-water via-earth to-brand-gold hidden md:block" />

          <div className="space-y-6">
            {ARC_PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-6"
              >
                {/* Phase node */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 relative"
                  style={{
                    background: `${phase.color}20`,
                    border: `2px solid ${phase.color}50`,
                    boxShadow: `0 0 20px ${phase.color}30`,
                  }}
                >
                  <span className="text-xs font-display font-bold" style={{ color: phase.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Phase card */}
                <div
                  className="flex-1 p-5 rounded-2xl glass-subtle border transition-all duration-300 hover:border-white/15 group"
                  style={{ borderColor: `${phase.color}20` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h3
                      className="text-lg font-display font-bold"
                      style={{ color: phase.color }}
                    >
                      {phase.phase}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono w-fit"
                      style={{
                        background: `${phase.color}15`,
                        color: phase.color,
                        border: `1px solid ${phase.color}30`,
                      }}
                    >
                      {phase.element}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm font-crimson">{phase.description}</p>
                </div>

                {/* Arrow between phases */}
                {i < ARC_PHASES.length - 1 && (
                  <div className="hidden md:block absolute left-[26px] mt-12 text-text-muted" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arc quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-3xl liquid-glass text-center"
        >
          <blockquote className="text-xl font-crimson italic text-white leading-relaxed mb-4">
            "The Arc turns: Potential → Manifestation → Experience → Dissolution → Evolved Potential.
            Death is not ending but transformation. Destruction enables creation."
          </blockquote>
          <p className="text-sm text-text-muted font-mono tracking-wider">
            — Laws of Arcanea, First Principle
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function ElementsCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-30" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-20 h-20 mx-auto rounded-full liquid-glass flex items-center justify-center mb-8 shadow-glow-md">
            <Sparkles className="w-10 h-10 text-crystal" />
          </div>

          <h2 className="text-fluid-3xl font-display font-bold mb-4">
            <span className="text-gradient-cosmic">Which Element Calls You?</span>
          </h2>

          <p className="text-lg text-text-secondary font-crimson mb-4 leading-relaxed">
            You carry all five within you. The question is not which element you are —
            it is which element is seeking expression right now, in this moment of your life.
          </p>

          <p className="text-base text-text-muted font-crimson italic mb-10">
            "Begin with Fire if you feel the urge to act. Begin with Water if you need to feel.
            Begin with Earth if you are lost. Begin with Wind if you feel caged.
            Begin with Void when nothing else applies — and you are ready for everything."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lore/guardians"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 shadow-glow-brand transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Meet the Guardians
            </Link>
            <Link
              href="/academy/gate-quiz"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-brand-gold/30 text-brand-gold font-semibold hover:bg-brand-gold/10 transition-all"
            >
              Discover Your Gate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/lore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-text-secondary font-semibold hover:bg-white/5 transition-all"
            >
              Full Lore
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export function ElementsPage() {
  return (
    <div className="bg-cosmic-deep">
      <ElementsHero />
      <ElementCardsSection />
      <FifthElementDuality />
      <ElementRelationshipsSection />
      <GuardianElementsSection />
      <TheArcSection />
      <ElementsCTA />
    </div>
  );
}
