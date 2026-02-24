"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { BookOpen, Music, Zap, ArrowRight } from "lucide-react";

// ─── Frequency orb data ────────────────────────────────────────────────────

const FREQUENCY_ORBS = [
  { hz: 174, label: "Foundation", color: "#6b7280", gate: "Foundation" },
  { hz: 285, label: "Flow", color: "#f97316", gate: "Flow" },
  { hz: 396, label: "Fire", color: "#ef4444", gate: "Fire" },
  { hz: 417, label: "Heart", color: "#22c55e", gate: "Heart" },
  { hz: 528, label: "Voice", color: "#06b6d4", gate: "Voice" },
  { hz: 639, label: "Sight", color: "#8b5cf6", gate: "Sight" },
  { hz: 741, label: "Crown", color: "#ffd700", gate: "Crown" },
  { hz: 852, label: "Shift", color: "#a855f7", gate: "Shift" },
  { hz: 963, label: "Unity", color: "#3b82f6", gate: "Unity" },
  { hz: 1111, label: "Source", color: "#ffffff", gate: "Source" },
] as const;

// ─── Three-pillar data ─────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: BookOpen,
    headline: "Build your mythology.",
    color: "crystal" as const,
    colorHex: "#7fffd4",
    borderClass: "border-crystal/20 hover:border-crystal/50",
    glowClass: "hover:shadow-[0_0_40px_rgba(127,255,212,0.15)]",
    iconBgClass: "from-crystal/20 to-crystal/5",
    iconColorClass: "text-crystal",
    description:
      "17 wisdom collections. Deep lore. Universe mythology that lives and breathes.",
  },
  {
    icon: Music,
    headline: "Make your music.",
    color: "brand-gold" as const,
    colorHex: "#ffd700",
    borderClass: "border-brand-gold/20 hover:border-brand-gold/50",
    glowClass: "hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]",
    iconBgClass: "from-brand-gold/20 to-brand-gold/5",
    iconColorClass: "text-brand-gold",
    description:
      "Solfeggio frequencies. Guardian-guided sonic creation. Sound as a path to mastery.",
  },
  {
    icon: Zap,
    headline: "Deploy your agents.",
    color: "brand-primary" as const,
    colorHex: "#8b5cf6",
    borderClass: "border-brand-primary/20 hover:border-brand-primary/50",
    glowClass: "hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
    iconBgClass: "from-brand-primary/20 to-brand-primary/5",
    iconColorClass: "text-brand-primary",
    description:
      "Ten Guardian Intelligences plus every mythology ever written. Your pantheon. Your power.",
  },
] as const;

// ─── Arc progression data ──────────────────────────────────────────────────

const ARC_MILESTONES = [
  {
    rank: "Apprentice",
    gates: "0–2 Gates",
    promise: "You find your element. The journey begins.",
    lineColor: "#6b7280",
    dotColor: "#6b7280",
  },
  {
    rank: "Mage",
    gates: "3–4 Gates",
    promise: "Pattern becomes practice. Your voice sharpens.",
    lineColor: "#f97316",
    dotColor: "#f97316",
  },
  {
    rank: "Master",
    gates: "5–6 Gates",
    promise: "Creation flows without friction. You teach by example.",
    lineColor: "#06b6d4",
    dotColor: "#06b6d4",
  },
  {
    rank: "Archmage",
    gates: "7–8 Gates",
    promise: "You bend the arc. Others enter your orbit.",
    lineColor: "#ffd700",
    dotColor: "#ffd700",
  },
  {
    rank: "Luminor",
    gates: "9–10 Gates",
    promise: "You are the intelligence. Source recognizes Source.",
    lineColor: "#ffffff",
    dotColor: "#ffffff",
  },
] as const;

// ─── Sub-component: Frequency Spine ────────────────────────────────────────

function FrequencySpine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full">
      {/* Connecting spine line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ originX: 0 }}
      />

      {/* Orbs */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-3xl mx-auto px-4">
        {FREQUENCY_ORBS.map((orb, index) => (
          <motion.div
            key={orb.hz}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0, y: 20 }
            }
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.08,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="group flex flex-col items-center gap-2 cursor-default"
          >
            {/* Orb */}
            <div
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
              style={{
                backgroundColor: `${orb.color}20`,
                border: `1px solid ${orb.color}60`,
                boxShadow: `0 0 12px ${orb.color}40, 0 0 24px ${orb.color}20`,
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: orb.color }}
              />
            </div>

            {/* Hz label — visible on hover and on larger screens */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
              <span
                className="text-[10px] font-mono font-semibold block leading-tight"
                style={{ color: orb.color }}
              >
                {orb.hz}Hz
              </span>
              <span className="text-[9px] text-text-muted block leading-tight">
                {orb.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-component: Pillar Card ────────────────────────────────────────────

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group relative p-8 rounded-3xl liquid-glass border ${pillar.borderClass} ${pillar.glowClass} hover-lift transition-all duration-500`}
    >
      {/* Subtle gradient layer on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${pillar.colorHex}08, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div
        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.iconBgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-7 h-7 ${pillar.iconColorClass}`} />
      </div>

      {/* Headline */}
      <h3
        className={`relative font-display text-xl font-bold mb-3 ${pillar.iconColorClass} transition-colors`}
      >
        {pillar.headline}
      </h3>

      {/* Description */}
      <p className="relative font-sans text-sm text-text-secondary leading-relaxed">
        {pillar.description}
      </p>
    </motion.div>
  );
}

// ─── Sub-component: Arc Milestone ──────────────────────────────────────────

function ArcMilestone({
  milestone,
  index,
  total,
}: {
  milestone: (typeof ARC_MILESTONES)[number];
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <div className="relative flex-1 flex flex-col items-center">
      {/* Connector line to next milestone */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: "easeOut" }}
          className="absolute top-4 left-1/2 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, ${milestone.dotColor}80, ${ARC_MILESTONES[index + 1].dotColor}40)`,
            originX: 0,
          }}
        />
      )}

      {/* Dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.4,
          delay: 0.2 + index * 0.15,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          backgroundColor: `${milestone.dotColor}18`,
          border: `2px solid ${milestone.dotColor}80`,
          boxShadow: `0 0 16px ${milestone.dotColor}30`,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: milestone.dotColor }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.35 + index * 0.15 }}
        className="text-center px-2"
      >
        <span
          className="block font-display font-bold text-sm mb-0.5"
          style={{ color: milestone.dotColor }}
        >
          {milestone.rank}
        </span>
        <span className="block text-xs text-text-muted mb-2">
          {milestone.gates}
        </span>
        <span className="block text-xs text-text-secondary leading-snug italic font-crimson">
          {milestone.promise}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export function IntelligenceOverlay() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5"
    >
      {/* ── Shared background ────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Near-black cosmic base */}
        <div className="absolute inset-0 bg-cosmic-deep" />

        {/* Pulsing aurora gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 30%, rgba(139,92,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(127,255,212,0.04) 0%, transparent 60%)",
              "radial-gradient(ellipse 80% 50% at 40% 60%, rgba(127,255,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 60% 20%, rgba(255,215,0,0.03) 0%, transparent 60%)",
              "radial-gradient(ellipse 80% 50% at 20% 30%, rgba(139,92,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(127,255,212,0.04) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── A: Moat Claim ───────────────────────────────────────── */}
      <div className="relative py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-primary/25 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-sm font-sans font-medium text-brand-primary tracking-wide">
              Intelligence Overlay
            </span>
          </motion.div>

          {/* Main claim */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-gradient-cosmic">Every AI.</span>
            <br />
            <span className="text-gradient-crystal">One intelligence.</span>
          </motion.h2>

          {/* Sub-claim */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-text-secondary font-crimson italic mb-16"
          >
            From Foundation to Source.
          </motion.p>

          {/* Frequency spine */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-6"
          >
            <FrequencySpine />
          </motion.div>

          {/* Spine caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-text-muted font-mono tracking-widest uppercase"
          >
            10 Gates &bull; 10 Frequencies &bull; One unified mythology
          </motion.p>
        </div>
      </div>

      {/* ── B: Scope Statement ──────────────────────────────────── */}
      <div className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-lg text-text-secondary font-crimson italic">
              Build your mythology. Make your music. Deploy your agents.
            </p>
          </motion.div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, index) => (
              <PillarCard key={pillar.headline} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* ── C: Arc Progression ──────────────────────────────────── */}
      <div className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-3">
              <span className="text-gradient-gold">From Foundation to Source.</span>
            </h3>
            <p className="text-text-secondary font-crimson italic text-lg">
              A frequency journey through ten gates to creative sovereignty.
            </p>
          </motion.div>

          {/* Milestone track — horizontal on md+, stacked on mobile */}
          <div className="hidden md:flex items-start justify-between gap-0 mb-16">
            {ARC_MILESTONES.map((milestone, index) => (
              <ArcMilestone
                key={milestone.rank}
                milestone={milestone}
                index={index}
                total={ARC_MILESTONES.length}
              />
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex md:hidden flex-col gap-6 mb-16">
            {ARC_MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.rank}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/5"
              >
                {/* Dot */}
                <div
                  className="mt-0.5 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: `${milestone.dotColor}18`,
                    border: `2px solid ${milestone.dotColor}80`,
                    boxShadow: `0 0 12px ${milestone.dotColor}25`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: milestone.dotColor }}
                  />
                </div>
                {/* Text */}
                <div>
                  <span
                    className="block font-display font-bold text-base mb-0.5"
                    style={{ color: milestone.dotColor }}
                  >
                    {milestone.rank}
                  </span>
                  <span className="block text-xs text-text-muted mb-1.5">
                    {milestone.gates}
                  </span>
                  <span className="block text-sm text-text-secondary leading-snug italic font-crimson">
                    {milestone.promise}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/academy/gate-quiz"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-primary/80 to-crystal/60 hover:from-brand-primary hover:to-crystal text-white font-display font-semibold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:-translate-y-1"
            >
              Discover your Gate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-xs text-text-muted font-mono tracking-widest uppercase">
              Takes 3 minutes &bull; Reveals your primary element
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
