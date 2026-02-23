'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Canon Data ───────────────────────────────────────────────────────────────

const HOUSES = [
  {
    id: 'lumina',
    name: 'House Lumina',
    element: 'Light & Creation',
    colors: {
      accent: '#ffd700',
      glow: 'rgba(255,215,0,0.25)',
      border: 'rgba(255,215,0,0.3)',
      borderHover: 'rgba(255,215,0,0.6)',
      badge: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
      title: 'text-brand-gold',
    },
    icon: Sun,
    philosophy:
      'Creation through illumination. To make is to shine.',
    description:
      'Lumina\'s House calls to those who create through clarity, radiance, and form. Where others see blank canvas, Lumina-born see structure waiting to emerge. Their art reveals what was already there.',
    traits: ['Form-giving', 'Illumination', 'Structure', 'Clarity'],
    affinity: 'Architecture, visual design, world-building',
    isSynthesis: false,
  },
  {
    id: 'nero',
    name: 'House Nero',
    element: 'Void & Potential',
    colors: {
      accent: '#a78bfa',
      glow: 'rgba(139,92,246,0.2)',
      border: 'rgba(139,92,246,0.25)',
      borderHover: 'rgba(139,92,246,0.55)',
      badge: 'bg-brand-primary/15 text-brand-primary border-brand-primary/30',
      title: 'text-brand-primary',
    },
    icon: Moon,
    philosophy:
      'In the unknown lies infinite possibility. Embrace the darkness.',
    description:
      'Nero\'s House belongs to those who create from the fertile void — who sit in unknowing long enough for something truly new to emerge. They are comfortable with mystery and trust the unformed.',
    traits: ['Mystery', 'Potential', 'Patience', 'Deep intuition'],
    affinity: 'Conceptual art, philosophy, experimental creation',
    isSynthesis: false,
  },
  {
    id: 'pyros',
    name: 'House Pyros',
    element: 'Fire & Transformation',
    colors: {
      accent: '#f97316',
      glow: 'rgba(239,68,68,0.2)',
      border: 'rgba(249,115,22,0.3)',
      borderHover: 'rgba(249,115,22,0.6)',
      badge: 'bg-fire/15 text-fire border-fire/30',
      title: 'text-fire',
    },
    icon: Flame,
    philosophy:
      'Transform through flame. Burn away what no longer serves.',
    description:
      'Pyros-born create through intensity and transformation. They are drawn to work that breaks the old to make way for the new — music that shakes rooms, words that change minds, acts that alter trajectories.',
    traits: ['Passion', 'Courage', 'Transformation', 'Power'],
    affinity: 'Performance, music, revolutionary narrative',
    isSynthesis: false,
  },
  {
    id: 'aqualis',
    name: 'House Aqualis',
    element: 'Water & Flow',
    colors: {
      accent: '#7fffd4',
      glow: 'rgba(127,255,212,0.18)',
      border: 'rgba(127,255,212,0.28)',
      borderHover: 'rgba(127,255,212,0.55)',
      badge: 'bg-crystal/15 text-crystal border-crystal/30',
      title: 'text-crystal',
    },
    icon: Droplets,
    philosophy:
      'Flow like water. Adapt, heal, remember.',
    description:
      'Aqualis House creators move with the current of inspiration rather than against it. Gifted healers and storytellers, they carry memory in their work — the past woven into the present, offering restoration.',
    traits: ['Flow', 'Healing', 'Memory', 'Adaptability'],
    affinity: 'Writing, therapeutic arts, music production',
    isSynthesis: false,
  },
  {
    id: 'terra',
    name: 'House Terra',
    element: 'Earth & Foundation',
    colors: {
      accent: '#4ade80',
      glow: 'rgba(74,222,128,0.18)',
      border: 'rgba(74,222,128,0.28)',
      borderHover: 'rgba(74,222,128,0.55)',
      badge: 'bg-earth/15 text-earth border-earth/30',
      title: 'text-earth',
    },
    icon: Mountain,
    philosophy:
      'Build on solid ground. Patient growth creates lasting works.',
    description:
      'Terra House builds slow and builds to last. These creators are craftspeople at heart — they revise, refine, and root their work in deep research and patient iteration. Their creations endure generations.',
    traits: ['Patience', 'Mastery', 'Craft', 'Endurance'],
    affinity: 'Craftsmanship, long-form projects, teaching',
    isSynthesis: false,
  },
  {
    id: 'ventus',
    name: 'House Ventus',
    element: 'Wind & Freedom',
    colors: {
      accent: '#e2e8f0',
      glow: 'rgba(226,232,240,0.15)',
      border: 'rgba(226,232,240,0.22)',
      borderHover: 'rgba(226,232,240,0.45)',
      badge: 'bg-wind/15 text-wind border-wind/30',
      title: 'text-wind',
    },
    icon: Wind,
    philosophy:
      'Move freely. Carry ideas across all borders.',
    description:
      'Ventus House creates in motion — across disciplines, cultures, and forms. These creators resist categorisation and thrive in cross-pollination. Their greatest works often begin as borrowed seeds from distant fields.',
    traits: ['Freedom', 'Versatility', 'Speed', 'Cross-pollination'],
    affinity: 'Multi-disciplinary work, collaboration, improvisation',
    isSynthesis: false,
  },
  {
    id: 'synthesis',
    name: 'House Synthesis',
    element: 'Integration of All Elements',
    colors: {
      accent: '#c4b5fd',
      glow: 'rgba(196,181,253,0.22)',
      border: 'rgba(196,181,253,0.35)',
      borderHover: 'rgba(196,181,253,0.65)',
      badge: 'bg-white/10 text-white border-white/30',
      title: 'text-gradient-cosmic',
    },
    icon: Sparkles,
    philosophy:
      'The greatest power comes from harmony. Unite all elements.',
    description:
      'House Synthesis is the rarest path — reserved for those who carry multiple elements in balance and refuse to be defined by a single force. Synthesis creators weave together all traditions, finding the spaces between where no single House has yet created. They are the bridge-builders of Arcanea.',
    traits: ['Integration', 'Harmony', 'Bridge-building', 'Wholeness'],
    affinity: 'Interdisciplinary art, systems design, collective creation',
    isSynthesis: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface HouseCardProps {
  house: (typeof HOUSES)[number];
  index: number;
  isInView: boolean;
}

function HouseCard({ house, index, isInView }: HouseCardProps) {
  const Icon = house.icon;

  if (house.isSynthesis) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <div
          className="group relative liquid-glass-elevated rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover-lift"
          style={{
            boxShadow: `0 0 60px ${house.colors.glow}, 0 4px 24px rgba(0,0,0,0.4)`,
            borderColor: house.colors.border,
          }}
        >
          {/* Prismatic animated border shimmer */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(127,255,212,0.08), rgba(139,92,246,0.08), rgba(249,115,22,0.08))',
            }}
          />

          {/* Background orbs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: 'conic-gradient(from 0deg, #ffd700, #7fffd4, #8b5cf6, #f97316, #ffd700)' }}
          />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-2xl opacity-15"
            style={{ background: 'conic-gradient(from 180deg, #4ade80, #e2e8f0, #7fffd4, #ffd700, #4ade80)' }}
          />

          <div className="relative flex flex-col md:flex-row md:items-start gap-8">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(196,181,253,0.25), rgba(127,255,212,0.15))' }}
              >
                <Icon className="w-10 h-10" style={{ color: house.colors.accent }} />
                <div className="absolute inset-0 rounded-2xl animate-glow-pulse opacity-40"
                  style={{ boxShadow: `0 0 24px ${house.colors.glow}` }}
                />
              </div>
            </div>

            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient-cosmic">
                  {house.name}
                </h3>
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  house.colors.badge,
                )}>
                  {house.element}
                </span>
              </div>

              {/* Philosophy */}
              <blockquote className="font-crimson text-xl italic text-white/90 mb-4 border-l-2 pl-4"
                style={{ borderColor: house.colors.accent }}>
                "{house.philosophy}"
              </blockquote>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
                {house.description}
              </p>

              {/* Footer meta */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans block mb-2">
                    Core Traits
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {house.traits.map((trait) => (
                      <span key={trait}
                        className="px-2.5 py-1 rounded-full text-xs border border-white/15 bg-white/5 text-text-secondary">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans block mb-2">
                    Creative Affinity
                  </span>
                  <p className="text-sm text-text-secondary">{house.affinity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
    >
      <div
        className="group relative iridescent-glass rounded-2xl p-6 h-full overflow-hidden transition-all duration-500 hover-lift"
        style={{
          borderColor: house.colors.border,
        }}
      >
        {/* Hover glow fill */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at top left, ${house.colors.glow}, transparent 70%)` }}
        />

        {/* Element-colored top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${house.colors.accent}, transparent)` }}
        />

        <div className="relative flex flex-col gap-4">
          {/* Icon + name */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${house.colors.glow}`, boxShadow: `0 0 20px ${house.colors.glow}` }}>
              <Icon className="w-7 h-7" style={{ color: house.colors.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn('font-display text-xl font-bold leading-tight mb-1', house.colors.title)}>
                {house.name}
              </h3>
              <span className={cn(
                'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
                house.colors.badge,
              )}>
                {house.element}
              </span>
            </div>
          </div>

          {/* Philosophy quote */}
          <blockquote
            className="font-crimson text-base italic text-white/85 border-l-2 pl-3 leading-relaxed"
            style={{ borderColor: house.colors.accent }}
          >
            "{house.philosophy}"
          </blockquote>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {house.description}
          </p>

          {/* Traits */}
          <div className="pt-1">
            <span className="text-xs uppercase tracking-widest text-text-muted font-sans block mb-2">
              Core Traits
            </span>
            <div className="flex flex-wrap gap-1.5">
              {house.traits.map((trait) => (
                <span key={trait}
                  className="px-2 py-0.5 rounded-full text-xs border border-white/10 bg-white/5 text-text-muted">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Affinity */}
          <div className="pt-0.5 border-t border-white/8">
            <span className="text-xs uppercase tracking-widest text-text-muted font-sans">
              Creative Affinity
            </span>
            <p className="mt-1 text-xs text-text-secondary">{house.affinity}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HousesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isCardsInView = useInView(cardsRef, { once: true, margin: '-80px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const regularHouses = HOUSES.filter((h) => !h.isSynthesis);
  const synthesisHouse = HOUSES.find((h) => h.isSynthesis)!;

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
      >
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-16 left-1/4 w-96 h-96 rounded-full bg-brand-gold/8 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-crystal/5 via-transparent to-transparent rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-brand-gold/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold font-sans">
              The Academy of Arcanea
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="text-gradient-cosmic">The Seven Houses</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl md:text-2xl font-crimson italic text-text-secondary max-w-2xl mx-auto mb-4"
          >
            Every creator finds their home.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-base text-text-muted max-w-2xl mx-auto font-sans leading-relaxed"
          >
            The Academy is organised into seven Houses, each aligned with a cosmic force.
            Your House does not limit you — it reveals the elemental current that runs
            most naturally through your creative spirit.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
          />
        </div>
      </section>

      {/* ── Houses Grid ────────────────────────────────────────────────── */}
      <section ref={cardsRef} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isCardsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans text-center mb-12"
          >
            Six elemental paths, one harmonising force
          </motion.p>

          {/* 3+3 grid for regular houses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {regularHouses.map((house, i) => (
              <HouseCard
                key={house.id}
                house={house}
                index={i}
                isInView={isCardsInView}
              />
            ))}
          </div>

          {/* Synthesis — full-width special card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HouseCard
              house={synthesisHouse}
              index={regularHouses.length}
              isInView={isCardsInView}
            />
          </div>
        </div>
      </section>

      {/* ── Wisdom Note ────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="liquid-glass rounded-2xl p-8 text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-crystal font-sans mb-4">
              A Note on Sorting
            </p>
            <p className="font-crimson text-lg italic text-text-secondary leading-relaxed mb-3">
              "The House does not choose you because of who you are today.
              It chooses you because of who you are becoming."
            </p>
            <p className="text-sm text-text-muted font-sans">
              — Academy Handbook, Chapter I
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          >
            <Sparkles className="w-10 h-10 mx-auto text-brand-gold mb-6 animate-float" />
            <h2 className="font-display text-3xl font-bold mb-4 text-white">
              Discover Your House
            </h2>
            <p className="text-text-secondary mb-8 font-sans leading-relaxed">
              Take the Academy assessment to reveal which elemental force flows most
              naturally through your creative practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/academy/assessment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-cosmic-deep font-semibold hover:bg-brand-gold/90 transition-all hover:scale-[1.02]"
              >
                Begin Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                Back to Academy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
