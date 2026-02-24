'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Crown,
  Skull,
  Infinity as InfinityIcon,
  Flame,
  ShieldAlert,
  BookOpen,
  Zap,
  AlertTriangle,
  Star,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ── Fade-in variant factory ──────────────────────────────────────────────────

function useSectionInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, isInView };
}

interface FadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  fromY?: number;
}

function Fade({ children, delay = 0, className, fromY = 24 }: FadeProps) {
  const { ref, isInView } = useSectionInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: fromY }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Ambient orb ──────────────────────────────────────────────────────────────

function DarkOrb({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl opacity-20',
        className
      )}
      style={{ background: color }}
    />
  );
}

// ── Corrupted seal ring ──────────────────────────────────────────────────────

function SealRing() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-10">
      {/* Outer ring - pulsing void corruption */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-[#9966ff]/30"
      />
      {/* Middle ring - slower opposite rotation */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-3 rounded-full border border-[#7a1f2e]/40"
      />
      {/* Core glow - breathe animation */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(153,102,255,0.15), 0 0 40px rgba(122,31,46,0.1)',
            '0 0 35px rgba(153,102,255,0.30), 0 0 70px rgba(122,31,46,0.2)',
            '0 0 20px rgba(153,102,255,0.15), 0 0 40px rgba(122,31,46,0.1)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-full bg-cosmic-deep/80 flex items-center justify-center border border-[#9966ff]/20"
      >
        <Skull className="w-8 h-8 text-[#9966ff]/70" />
      </motion.div>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 glow-card hover-lift transition-all">
      <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={cn('text-base font-display font-semibold', accent)}>
        {value}
      </p>
    </div>
  );
}

// ── Teaching card ─────────────────────────────────────────────────────────────

function TeachingCard({
  number,
  text,
  index,
}: {
  number: string;
  text: string;
  index: number;
}) {
  return (
    <Fade delay={0.1 * index}>
      <div className="group flex gap-5 p-6 glass rounded-2xl border border-white/5 hover:border-[#9966ff]/20 hover-lift glow-card transition-all">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm bg-[#9966ff]/10 text-[#b38cff] border border-[#9966ff]/20 group-hover:scale-110 transition-transform">
          {number}
        </div>
        <p className="text-text-primary font-body text-lg leading-relaxed self-center">
          {text}
        </p>
      </div>
    </Fade>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function MalacharPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative min-h-screen bg-cosmic-deep bg-cosmic-mesh">

      {/* ── Fixed dark ambient background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Top corrupted void bloom */}
        <DarkOrb
          color="radial-gradient(ellipse, rgba(122,31,46,0.35) 0%, transparent 70%)"
          className="w-[700px] h-[500px] -top-32 left-1/2 -translate-x-1/2"
        />
        {/* Lower void depth */}
        <DarkOrb
          color="radial-gradient(ellipse, rgba(153,102,255,0.12) 0%, transparent 70%)"
          className="w-[600px] h-[600px] top-1/2 -translate-y-1/2 -right-48"
        />
        {/* Deep shadow bottom */}
        <DarkOrb
          color="radial-gradient(ellipse, rgba(50,15,15,0.6) 0%, transparent 80%)"
          className="w-[900px] h-[400px] bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* ── Navigation ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link
          href="/lore"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Lore of Arcanea
        </Link>
        <span className="text-xs font-mono text-[#9966ff]/60 tracking-widest uppercase">
          Sealed in the Shadowfen
        </span>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-32">

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="pt-8 pb-20">

          {/* Dark glass hero card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                'linear-gradient(160deg, rgba(18,12,24,0.92) 0%, rgba(10,8,16,0.95) 50%, rgba(18,8,12,0.92) 100%)',
              backdropFilter: 'blur(40px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
              border: '1px solid rgba(153,102,255,0.12)',
              boxShadow:
                'inset 0 1px 0 rgba(153,102,255,0.08), inset 0 -1px 0 rgba(122,31,46,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(122,31,46,0.08)',
            }}
          >
            {/* Top accent bar — corrupted gradient */}
            <div
              className="h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(153,102,255,0.4) 30%, rgba(180,30,50,0.3) 70%, transparent 100%)',
              }}
            />

            {/* Bottom shadow vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(8,4,12,0.5) 0%, transparent 100%)',
              }}
            />

            {/* Corrupted radial glow from center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(122,31,46,0.15) 0%, transparent 70%)',
              }}
            />

            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-[#9966ff]/20 bg-[#9966ff]/8 font-mono text-xs text-[#9966ff]/70"
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#9966ff] inline-block"
                />
                Dark Lord of the Shadowfen
              </motion.div>

              {/* Seal ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <SealRing />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-3 leading-none"
                style={{
                  background:
                    'linear-gradient(145deg, #4a0a14 0%, #7a1f2e 20%, #9966ff 55%, #4a2a6e 80%, #1a0a20 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(153,102,255,0.2))',
                }}
              >
                Malachar
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="text-xl md:text-2xl text-text-secondary font-body italic mb-4"
              >
                The Fallen Champion
              </motion.p>

              {/* Former name */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.85 }}
                className="text-sm text-text-muted font-mono tracking-widest uppercase"
              >
                Formerly: Malachar Lumenbright
              </motion.p>

              {/* Ominous quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.1 }}
                className="mt-10 max-w-2xl mx-auto relative pl-5"
                style={{ borderLeft: '2px solid rgba(153,102,255,0.3)' }}
              >
                <p className="text-lg md:text-xl font-body italic text-text-secondary leading-relaxed">
                  &ldquo;He did not fall because he was weak. He fell because he
                  was the greatest — and believed that entitled him to
                  more.&rdquo;
                </p>
                <cite className="mt-3 block text-sm text-text-muted not-italic font-sans">
                  — The Chronicles of the Source Gate
                </cite>
              </motion.blockquote>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — VITAL ASPECTS
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              What Was Known
            </h2>
          </Fade>

          <Fade delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatPill
                label="True Name"
                value="Malachar Lumenbright"
                accent="text-[#ffd700]"
              />
              <StatPill
                label="Former Title"
                value="First Eldrian Luminor"
                accent="text-[#ffd700]"
              />
              <StatPill
                label="Current State"
                value="Sealed — Shadowfen"
                accent="text-[#b38cff]"
              />
              <div className="glass rounded-2xl p-5 col-span-2 md:col-span-1 glow-card hover-lift transition-all">
                <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
                  Corruption
                </p>
                <p className="text-base font-display font-semibold text-[#c0392b]">
                  Void Without Spirit
                </p>
              </div>
            </div>
          </Fade>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — THE RISE
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              Before the Fall
            </h2>
          </Fade>

          <Fade delay={0.1}>
            <div className="relative glass rounded-3xl overflow-hidden">
              {/* Gold-tinted radial — former glory */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)',
                }}
              />

              {/* Top shimmer — gold of his era */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.3) 50%, transparent 100%)',
                }}
              />

              <div className="relative p-8 md:p-10 lg:p-12">
                {/* Section header with crown — the glory days */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#ffd700]/10 border border-[#ffd700]/20 flex-shrink-0">
                    <Crown className="w-6 h-6 text-[#ffd700]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-[#ffd700]">
                      Malachar Lumenbright
                    </h3>
                    <p className="text-sm text-text-muted font-mono">
                      First Eldrian Luminor &mdash; Lumina&apos;s Champion
                    </p>
                  </div>
                </div>

                <div className="space-y-5 font-body text-lg text-text-secondary leading-relaxed">
                  <p>
                    There was a time — long before the Shadowfen swallowed his
                    name — when Malachar Lumenbright was spoken of only in
                    reverence. He had opened all Ten Gates. He carried the title{' '}
                    <span className="text-[#ffd700] font-semibold">
                      First Eldrian Luminor
                    </span>
                    , the highest rank any practitioner of the Arc had ever
                    achieved in the recorded history of Arcanea.
                  </p>
                  <p>
                    Lumina herself had recognized him. Her champions were
                    chosen, not made — and Malachar had been chosen before he
                    could speak his own name. He trained for centuries under the
                    Guardians. He understood the frequencies. He breathed the
                    Five Elements as naturally as the rest of us breathe air.
                  </p>
                  <p>
                    Those who trained alongside him remember a man of terrifying
                    discipline and genuine warmth. He was not cruel in his
                    youth. He was not power-hungry in the way that small people
                    are power-hungry. He simply had the absolute certainty of
                    someone who had never been wrong — and who believed that
                    certainty had earned him something the universe still owed
                    him.
                  </p>
                  <p className="italic text-text-muted">
                    Every Academy tells his story. Most tell only the ending.
                    They should tell the beginning first — because the tragedy
                    is not that a monster fell. The tragedy is that a great man
                    chose to become one.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — THE FALL
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              The Corruption
            </h2>
          </Fade>

          <Fade delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, rgba(18,8,18,0.9) 0%, rgba(30,10,20,0.92) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(122,31,46,0.25)',
                boxShadow:
                  '0 8px 48px rgba(0,0,0,0.4), 0 0 30px rgba(122,31,46,0.08)',
              }}
            >
              {/* Corrupted top bar */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,215,0,0.2) 0%, rgba(153,102,255,0.4) 40%, rgba(180,30,50,0.5) 80%, transparent 100%)',
                }}
              />

              {/* Radial corruption spreading from bottom */}
              <div
                className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(122,31,46,0.25) 0%, transparent 70%)',
                }}
              />

              <div className="relative p-8 md:p-10 lg:p-12">
                {/* Flame/warning icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#7a1f2e]/20 border border-[#7a1f2e]/30 flex-shrink-0">
                    <Flame className="w-6 h-6 text-[#c0392b]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-[#c0392b]">
                      The Source Gate
                    </h3>
                    <p className="text-sm text-text-muted font-mono">
                      The Attempt. The Rejection. The Fall.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Timeline steps */}
                  {[
                    {
                      phase: 'The Ambition',
                      color: '#ffd700',
                      text: 'Lumina\'s champion had achieved every rank, opened every Gate, and still felt the edge of something beyond. He believed that if he could merge with the Source Gate itself — fuse his consciousness with Shinkami at 1111 Hz — he would become something more than Luminor. Something beyond the rank system entirely. Something that had never existed.',
                    },
                    {
                      phase: 'The Attempt',
                      color: '#9966ff',
                      text: 'He went to the Source Gate alone. He did not ask. He did not seek counsel from the other Guardians or from Lumina herself. He had reasoned that the universe owed him this — that his mastery entitled him to its highest secret. He attempted forced fusion, pressing his will against Shinkami\'s sovereignty, trying to take what was never offered.',
                    },
                    {
                      phase: 'The Rejection',
                      color: '#c0392b',
                      text: 'Shinkami refused. Not with violence. Not with cruelty. The Source Gate simply did not open — because it cannot be forced. Consciousness cannot be seized. Transcendence cannot be demanded. The door would not move. And in his fury at its stillness, Malachar shattered against it.',
                    },
                    {
                      phase: 'The Fall',
                      color: '#7a1f2e',
                      text: 'He fell into the Hungry Void. Not the fertile Void of Nero\'s gift — the Void before Spirit has touched it. Raw. Consuming. Devoid of meaning. Without Lumina\'s pattern to give it form, and without Shinkami\'s Spirit to give it purpose, the Void does not create. It dissolves. And it dissolved Malachar Lumenbright — and left something else wearing his name.',
                    },
                  ].map((step, i) => (
                    <Fade key={step.phase} delay={0.15 * i}>
                      <div
                        className="relative pl-6"
                        style={{
                          borderLeft: `2px solid ${step.color}30`,
                        }}
                      >
                        <div
                          className="absolute left-[-5px] top-1 w-2 h-2 rounded-full"
                          style={{ background: step.color, opacity: 0.6 }}
                        />
                        <p
                          className="text-xs font-mono uppercase tracking-widest mb-2"
                          style={{ color: step.color }}
                        >
                          {step.phase}
                        </p>
                        <p className="font-body text-lg text-text-secondary leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </Fade>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5 — THE SEALED ONE
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              The Sealed One
            </h2>
          </Fade>

          <Fade delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,4,14,0.95) 0%, rgba(12,6,18,0.98) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(153,102,255,0.08)',
                boxShadow:
                  'inset 0 0 80px rgba(153,102,255,0.04), 0 16px 64px rgba(0,0,0,0.6)',
              }}
            >
              {/* Pulsing inner glow — the contained power */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(153,102,255,0.08) 0%, transparent 70%)',
                }}
              />

              <div className="relative p-8 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  {/* Left — seal visual */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 3, 0, -3, 0] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-24 h-24 rounded-2xl flex items-center justify-center border border-[#9966ff]/15"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(153,102,255,0.1) 0%, rgba(8,4,14,0.6) 70%)',
                      }}
                    >
                      <ShieldAlert className="w-11 h-11 text-[#9966ff]/50" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-xs font-mono text-[#9966ff]/50 uppercase tracking-widest">
                        Seal Status
                      </p>
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-sm font-display font-semibold text-[#9966ff]/70 mt-1"
                      >
                        Active
                      </motion.p>
                    </div>
                  </div>

                  {/* Right — narrative */}
                  <div className="flex-1 space-y-5 font-body text-lg text-text-secondary leading-relaxed">
                    <p>
                      What the Guardians sealed in the Shadowfen is not
                      entirely Malachar anymore. The man who trained under
                      Lumina&apos;s light, who laughed with the other Luminors,
                      who wept the first time he opened the Foundation Gate —
                      that man was dissolved in the Hungry Void.
                    </p>
                    <p>
                      What remains is{' '}
                      <span className="text-[#b38cff] font-semibold">
                        the Dark Lord
                      </span>
                      : a consciousness saturated with corrupted Void, with all
                      of Malachar&apos;s vast knowledge and none of his
                      compassion, wielding Shadow — Void stripped of Spirit —
                      as a weapon against the world that rejected him.
                    </p>
                    <p>
                      The seal holds. The Guardians maintain it together. Every
                      darkness in Arcanea — every creative block that becomes
                      paralysis, every ambition that curdles into resentment,
                      every gift turned toward destruction — traces its roots to
                      the pressure of what is sealed in the Shadowfen.
                    </p>
                    <p className="italic text-text-muted text-base">
                      The seal is not permanent. It is maintained by the
                      continued presence of the Ten Guardians at their Gates.
                      This is why the Gates matter. This is why you must walk
                      them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6 — THE TEACHING
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              What His Story Teaches
            </h2>
          </Fade>

          {/* Quote panel */}
          <Fade delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden mb-8"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 40%, rgba(153,102,255,0.04) 100%)',
                backdropFilter: 'blur(40px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.6)',
                border: '1px solid rgba(153,102,255,0.12)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div className="p-8 md:p-12 text-center">
                <BookOpen className="w-10 h-10 text-[#9966ff]/50 mx-auto mb-6" />
                <blockquote>
                  <p className="text-2xl md:text-3xl font-body italic text-text-primary leading-relaxed max-w-3xl mx-auto">
                    &ldquo;Power without wisdom is the first step. Ambition
                    without patience is the second. Void without Spirit is the
                    third. After the third step, there is no path back — only
                    the Shadowfen, and what waits within it.&rdquo;
                  </p>
                  <cite className="mt-6 block text-sm text-text-muted not-italic font-sans tracking-widest uppercase">
                    — The Warning of Shinkami, Source Gate, 1111 Hz
                  </cite>
                </blockquote>
              </div>
            </div>
          </Fade>

          {/* Teaching cards */}
          <div className="space-y-4">
            {[
              'Power without wisdom is not strength. It is a wound waiting to become a disaster.',
              'Mastery entitles you to nothing the universe has not freely offered. You may prepare. You may ask. You may not demand.',
              'The greatest can fall. This is not a warning against greatness. It is a warning against certainty.',
              'Patience is not passivity. It is the difference between Malachar and every Luminor who came after him.',
            ].map((teaching, i) => (
              <TeachingCard
                key={i}
                number={String(i + 1).padStart(2, '0')}
                text={teaching}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 7 — SHADOW VS VOID (CANONICAL CLARIFICATION)
        ════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <Fade>
            <h2 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-6">
              The Canonical Distinction
            </h2>
          </Fade>

          <Fade delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,107,53,0.15)',
                background: 'rgba(8,4,10,0.9)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Warning top bar */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,107,53,0.4), rgba(153,102,255,0.3), transparent)',
                }}
              />

              <div className="p-8 md:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <AlertTriangle className="w-5 h-5 text-fire flex-shrink-0" />
                  <h3 className="text-lg font-display font-bold text-text-primary">
                    Shadow is Not Nero&apos;s Power
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Nero / Void */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#9966ff]/10 border border-[#9966ff]/20">
                        <InfinityIcon className="w-5 h-5 text-[#9966ff]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-[#9966ff] text-lg">
                          Nero&apos;s Void
                        </p>
                        <p className="text-xs font-mono text-text-muted">
                          Fertile Darkness
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 font-body text-text-secondary">
                      <p>
                        Nero&apos;s Void is the primordial darkness of{' '}
                        <strong className="text-[#b38cff]">potential</strong>.
                        Every possible world, every creative possibility,
                        every unmanifested vision lives in the Void. It is not
                        evil. It is not dangerous. It is the womb of creation.
                      </p>
                      <p className="text-sm text-text-muted">
                        Void + Spirit = transcendence, possibility, the
                        Luminor&apos;s highest state.
                      </p>
                    </div>
                    {[
                      'Infinite creative potential',
                      'The source of all that could be',
                      'Nero\'s sacred gift to creation',
                      'What the Source Gate holds',
                    ].map((trait) => (
                      <div
                        key={trait}
                        className="flex items-center gap-2 text-sm text-text-secondary"
                      >
                        <Star className="w-3 h-3 text-[#9966ff]/60 flex-shrink-0" />
                        {trait}
                      </div>
                    ))}
                  </div>

                  {/* Malachar / Shadow */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#7a1f2e]/20 border border-[#7a1f2e]/30">
                        <Skull className="w-5 h-5 text-[#c0392b]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-[#c0392b] text-lg">
                          Malachar&apos;s Shadow
                        </p>
                        <p className="text-xs font-mono text-text-muted">
                          Corrupted Void
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 font-body text-text-secondary">
                      <p>
                        Shadow is what happens when Void is seized without
                        Spirit — when potential is treated as property rather
                        than gift. It is Void{' '}
                        <strong className="text-[#c0392b]">without Spirit</strong>
                        , without purpose, without the pattern that transforms
                        darkness into creation.
                      </p>
                      <p className="text-sm text-text-muted">
                        Void - Spirit = shadow, dissolution, the Dark
                        Lord&apos;s weapon.
                      </p>
                    </div>
                    {[
                      'Void stripped of Spirit and purpose',
                      'Potential weaponized against creation',
                      'Malachar\'s perversion of Nero\'s gift',
                      'The source of all darkness in Arcanea',
                    ].map((trait) => (
                      <div
                        key={trait}
                        className="flex items-center gap-2 text-sm text-text-secondary"
                      >
                        <Zap className="w-3 h-3 text-[#c0392b]/60 flex-shrink-0" />
                        {trait}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Canonical equation */}
                <Fade delay={0.3}>
                  <div
                    className="mt-8 rounded-2xl p-5 text-center"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(153,102,255,0.06) 0%, rgba(122,31,46,0.06) 100%)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="font-mono text-sm text-text-muted mb-2 uppercase tracking-widest">
                      Canonical Equation
                    </p>
                    <p className="font-display text-base md:text-lg text-text-primary">
                      <span className="text-[#9966ff]">Void</span>
                      <span className="text-text-muted"> + </span>
                      <span className="text-[#ffd700]">Spirit</span>
                      <span className="text-text-muted"> = </span>
                      <span className="text-[#b38cff]">Transcendence</span>
                      <span className="text-text-muted mx-4">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                      <span className="text-[#9966ff]">Void</span>
                      <span className="text-text-muted"> &minus; </span>
                      <span className="text-[#ffd700]">Spirit</span>
                      <span className="text-text-muted"> = </span>
                      <span className="text-[#c0392b]">Shadow</span>
                    </p>
                  </div>
                </Fade>
              </div>
            </div>
          </Fade>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 8 — CTA — Walk the Gates
        ════════════════════════════════════════════════════════════ */}
        <section>
          <Fade delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, rgba(18,10,28,0.92) 0%, rgba(12,6,18,0.95) 100%)',
                backdropFilter: 'blur(60px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(60px) saturate(1.8)',
                border: '1px solid rgba(153,102,255,0.15)',
                boxShadow:
                  'inset 0 2px 0 rgba(153,102,255,0.08), 0 24px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(153,102,255,0.4), rgba(255,215,0,0.2), transparent)',
                }}
              />

              <div className="relative p-10 md:p-14 text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-[#9966ff]/20 bg-[#9966ff]/8">
                  <InfinityIcon className="w-8 h-8 text-[#9966ff]/70" />
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
                  Walk the Ten Gates
                </h2>

                <p className="text-text-secondary font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  The Guardians hold the seal. You walk the path that makes the
                  seal possible. Every Gate you open is one more thread in the
                  binding that keeps the Shadowfen closed. Creation is the
                  answer to darkness.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/lore/guardians"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, #4a2a6e 0%, #7a4dcc 50%, #9966ff 100%)',
                      boxShadow: '0 8px 32px rgba(153,102,255,0.25)',
                    }}
                  >
                    <Crown className="w-5 h-5" />
                    Meet the Guardians
                  </Link>

                  <Link
                    href="/lore"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-sans font-medium text-sm text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary glass transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    All Lore
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </section>

      </main>
    </div>
  );
}
