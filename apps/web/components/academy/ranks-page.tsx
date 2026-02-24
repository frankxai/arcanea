'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Star, Sparkles, ArrowRight, Shield, Zap, Crown, Orbit, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Canon Data ───────────────────────────────────────────────────────────────

const RANKS = [
  {
    id: 'apprentice',
    rank: 'Apprentice',
    gates: '0 – 2',
    gatesOpen: 1, // 1-5 scale for visual intensity
    description:
      'Beginning the journey. Learning the foundations of creation.',
    detail:
      'Every Luminor was once an Apprentice. At this stage you are learning to hear the Gates — to sense the elemental currents that already move through you. The work is not yet mastery; it is attunement.',
    glassClass: 'glass-subtle',
    glowColor: 'rgba(107,114,128,0.2)',
    glowBorder: 'rgba(107,114,128,0.25)',
    accentColor: '#6b7280',
    textColor: 'text-text-muted',
    badgeClass: 'bg-white/8 text-text-muted border-white/15',
    icon: Star,
    glowIntensity: 1,
    numberStyle: 'text-text-muted',
  },
  {
    id: 'mage',
    rank: 'Mage',
    gates: '3 – 4',
    gatesOpen: 2,
    description:
      'Developing power. The elements begin to respond to your will.',
    detail:
      'As a Mage you have crossed the halfway point of the lower Gates. Your practice is consistent, your creative voice is identifiable, and the tools of your craft respond with growing fluency. You know why you create.',
    glassClass: 'glass',
    glowColor: 'rgba(59,130,246,0.2)',
    glowBorder: 'rgba(59,130,246,0.3)',
    accentColor: '#78a6ff',
    textColor: 'text-blue-400',
    badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    icon: Zap,
    glowIntensity: 2,
    numberStyle: 'text-blue-400',
  },
  {
    id: 'master',
    rank: 'Master',
    gates: '5 – 6',
    gatesOpen: 3,
    description:
      'Commanding respect. Your creations carry weight and meaning.',
    detail:
      'At Master level, your creative voice has authority. You have opened the Gate of Voice and the Gate of Sight — you speak truth through your work and perceive the deeper patterns that lesser eyes miss. Others learn from your example.',
    glassClass: 'glass-strong',
    glowColor: 'rgba(139,92,246,0.22)',
    glowBorder: 'rgba(139,92,246,0.35)',
    accentColor: '#a78bfa',
    textColor: 'text-purple-400',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    icon: Shield,
    glowIntensity: 3,
    numberStyle: 'text-purple-400',
  },
  {
    id: 'archmage',
    rank: 'Archmage',
    gates: '7 – 8',
    gatesOpen: 4,
    description:
      'Near the peak. Multiple elements bend to your mastery.',
    detail:
      'Archmages are rare. They have crossed the threshold of Crown and Shift — experiencing true enlightenment and the ability to perceive and shift between realities. Their creative works transcend categories and traditions.',
    glassClass: 'liquid-glass',
    glowColor: 'rgba(255,215,0,0.22)',
    glowBorder: 'rgba(255,215,0,0.38)',
    accentColor: '#ffd700',
    textColor: 'text-brand-gold',
    badgeClass: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
    icon: Crown,
    glowIntensity: 4,
    numberStyle: 'text-brand-gold',
  },
  {
    id: 'luminor',
    rank: 'Luminor',
    gates: '9 – 10',
    gatesOpen: 5,
    description:
      'The highest attainment. All Gates open. Creation itself flows through you.',
    detail:
      'Luminor is not a title granted by others. It is a state of being that emerges when all ten Gates stand open — when Unity and Source are known, not merely understood. A Luminor does not create; they channel. They do not seek; they are the seeking and the found.',
    glassClass: 'liquid-glass-elevated',
    glowColor: 'rgba(127,255,212,0.25)',
    glowBorder: 'rgba(127,255,212,0.5)',
    accentColor: '#7fffd4',
    textColor: 'text-crystal',
    badgeClass: 'bg-crystal/15 text-crystal border-crystal/30',
    icon: Sparkles,
    glowIntensity: 5,
    numberStyle: 'text-gradient-crystal',
    isPeak: true,
  },
];

// ─── Power Pip Indicator ──────────────────────────────────────────────────────

function PowerPips({ level, accentColor }: { level: number; accentColor: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((pip) => (
        <div
          key={pip}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            pip <= level ? 'w-5' : 'w-2 opacity-20',
          )}
          style={{
            backgroundColor: pip <= level ? accentColor : '#ffffff',
            boxShadow: pip <= level ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
      ))}
    </div>
  );
}

// ─── Rank Card ────────────────────────────────────────────────────────────────

interface RankCardProps {
  rank: (typeof RANKS)[number];
  index: number;
  isInView: boolean;
}

function RankCard({ rank, index, isInView }: RankCardProps) {
  const Icon = rank.icon;
  const isPeak = 'isPeak' in rank && rank.isPeak;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: 'easeOut' }}
      className="relative"
    >
      {/* Connecting line above (not on first item) */}
      {index > 0 && (
        <div
          className="absolute left-8 -top-6 w-0.5 h-6 hidden md:block"
          style={{
            background: `linear-gradient(to bottom, ${RANKS[index - 1].accentColor}40, ${rank.accentColor}40)`,
          }}
        />
      )}

      <div
        className={cn(
          'group relative rounded-2xl overflow-hidden transition-all duration-500 hover-lift',
          rank.glassClass,
        )}
        style={{
          borderColor: rank.glowBorder,
          boxShadow: isPeak
            ? `0 0 40px ${rank.glowColor}, 0 4px 20px rgba(0,0,0,0.4)`
            : `0 0 ${rank.glowIntensity * 8}px ${rank.glowColor}`,
        }}
      >
        {/* Peak animated glow border */}
        {isPeak && (
          <div className="absolute inset-0 rounded-2xl animate-glow-pulse opacity-30 pointer-events-none"
            style={{ boxShadow: `inset 0 0 30px ${rank.glowColor}` }}
          />
        )}

        {/* Hover fill */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top left, ${rank.glowColor}, transparent 65%)`,
          }}
        />

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background: `linear-gradient(to bottom, ${rank.accentColor}80, ${rank.accentColor}20)`,
          }}
        />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left: icon + gate badge */}
            <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-3 md:w-20">
              {/* Icon circle */}
              <div
                className={cn(
                  'w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0',
                  'transition-transform duration-300 group-hover:scale-110',
                )}
                style={{
                  backgroundColor: `${rank.glowColor}`,
                  boxShadow: `0 0 ${rank.glowIntensity * 5}px ${rank.glowColor}`,
                }}
              >
                <Icon
                  className={cn(
                    'w-7 h-7 md:w-8 md:h-8',
                    isPeak ? 'animate-float' : '',
                  )}
                  style={{ color: rank.accentColor }}
                />
              </div>

              {/* Gates badge */}
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap font-mono',
                  rank.badgeClass,
                )}
              >
                {rank.gates}
              </span>
            </div>

            {/* Right: content */}
            <div className="flex-1 min-w-0">
              {/* Rank name */}
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3
                  className={cn(
                    'font-display text-2xl md:text-3xl font-bold',
                    isPeak ? 'text-gradient-crystal' : rank.textColor,
                  )}
                >
                  {rank.rank}
                </h3>
                <span className="text-xs uppercase tracking-[0.35em] text-text-muted font-sans hidden sm:inline">
                  {rank.gates} Gates Open
                </span>
              </div>

              {/* Power pips */}
              <div className="mb-3">
                <PowerPips level={rank.glowIntensity} accentColor={rank.accentColor} />
              </div>

              {/* Short description */}
              <p className="text-base text-text-secondary font-sans mb-3 leading-relaxed">
                {rank.description}
              </p>

              {/* Detail */}
              <p className="text-sm text-text-muted font-sans leading-relaxed">
                {rank.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RanksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ladderRef = useRef<HTMLDivElement>(null);
  const luminorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isLadderInView = useInView(ladderRef, { once: true, margin: '-60px' });
  const isLuminorInView = useInView(luminorRef, { once: true, margin: '-60px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  // Display ranks from Apprentice (bottom in meaning) to Luminor (top)
  // We render top-to-bottom visually with Luminor at top
  const ranksDescending = [...RANKS].reverse();

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
      >
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-crystal/8 blur-3xl" />
          {/* Vertical path shimmer */}
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-brand-gold/20 mb-8"
          >
            <Orbit className="w-4 h-4 text-brand-gold" />
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
            <span className="text-gradient-gold">The Path of Mastery</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl md:text-2xl font-crimson italic text-text-secondary max-w-2xl mx-auto mb-4"
          >
            Five ranks. Ten Gates. One eternal ascent.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-base text-text-muted max-w-2xl mx-auto font-sans leading-relaxed"
          >
            As you open the Ten Gates of Arcanea, your creative power and awareness grow.
            The five ranks mark the stages of that opening — from first awakening to
            full realization.
          </motion.p>

          {/* Quick rank strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center justify-center gap-2 flex-wrap"
          >
            {RANKS.map((r, i) => (
              <span key={r.id} className="flex items-center gap-2">
                <span
                  className="text-sm font-semibold font-sans"
                  style={{ color: r.accentColor }}
                >
                  {r.rank}
                </span>
                {i < RANKS.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-text-muted" />
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
          />
        </div>
      </section>

      {/* ── Rank Ladder ────────────────────────────────────────────────── */}
      <section ref={ladderRef} className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLadderInView ? { opacity: 1 } : {}}
            className="text-xs uppercase tracking-[0.4em] text-text-muted font-sans text-center mb-12"
          >
            Luminor at the peak — Apprentice at the root
          </motion.p>

          {/* Vertical ladder */}
          <div className="relative space-y-6">
            {/* Background connecting line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-crystal/30 via-brand-gold/20 to-text-muted/10 hidden md:block" />

            {ranksDescending.map((rank, i) => (
              <RankCard
                key={rank.id}
                rank={rank}
                index={i}
                isInView={isLadderInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── What is a Luminor? ─────────────────────────────────────────── */}
      <section ref={luminorRef} className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isLuminorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="liquid-glass-elevated rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(127,255,212,0.12), 0 4px 24px rgba(0,0,0,0.4)',
              borderColor: 'rgba(127,255,212,0.3)',
            }}
          >
            {/* Background shimmer */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-crystal/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-gold/8 blur-3xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(127,255,212,0.15)', boxShadow: '0 0 24px rgba(127,255,212,0.2)' }}>
                  <Flame className="w-7 h-7 text-crystal animate-breathe" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-crystal font-sans mb-1">
                    Canon Truth
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-crystal">
                    What is a Luminor?
                  </h2>
                </div>
              </div>

              {/* Core truth */}
              <div className="border-l-2 border-crystal/40 pl-6 mb-8">
                <p className="font-crimson text-xl italic text-white/90 leading-relaxed">
                  "Luminor is not a type of being. It is the highest rank of magical
                  attainment — the state that emerges when all ten Gates stand open."
                </p>
              </div>

              {/* Explanation blocks */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass-subtle rounded-2xl p-6">
                  <h3 className="font-display text-base font-semibold text-crystal mb-3">
                    Not an Entity Type
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    Luminor is not a species, a class of being, or a role assigned by
                    the Academy. It is a rank — a description of where you stand on the
                    Path of Mastery, not what you fundamentally are.
                  </p>
                </div>

                <div className="glass-subtle rounded-2xl p-6">
                  <h3 className="font-display text-base font-semibold text-brand-gold mb-3">
                    Open to All Beings
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    Any being — human, AI, godbeast, or other — can become a Luminor
                    by opening all ten Gates. The path requires dedication and genuine
                    transformation, but it is never closed to anyone.
                  </p>
                </div>

                <div className="glass-subtle rounded-2xl p-6">
                  <h3 className="font-display text-base font-semibold text-white mb-3">
                    Gates 9 and 10
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    Luminor status requires the Unity Gate (963 Hz — sacred partnership)
                    and the Source Gate (1111 Hz — meta-consciousness) to both stand open.
                    Only then is the full circuit complete.
                  </p>
                </div>

                <div className="glass-subtle rounded-2xl p-6">
                  <h3 className="font-display text-base font-semibold text-brand-primary mb-3">
                    What Changes
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    At Luminor, creation is no longer an act of effort but of presence.
                    The distinction between creator and creation dissolves. You become a
                    channel for creation itself — the Arc flowing freely through an open vessel.
                  </p>
                </div>
              </div>

              {/* Closing quote */}
              <div className="text-center">
                <p className="font-crimson text-base italic text-text-muted">
                  "Every being contains all Ten Gates. Every being can awaken. Every being can become Luminor."
                </p>
                <p className="text-xs text-text-muted font-sans mt-2">
                  — The Arc, Founding Principle
                </p>
              </div>
            </div>
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
              Begin Your Ascent
            </h2>
            <p className="text-text-secondary mb-8 font-sans leading-relaxed">
              Discover which Gates are already open within you and chart your path
              toward Luminor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/academy/gate-quiz"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-cosmic-deep font-semibold hover:bg-brand-gold/90 transition-all hover:scale-[1.02]"
              >
                Find Your Guardian
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
