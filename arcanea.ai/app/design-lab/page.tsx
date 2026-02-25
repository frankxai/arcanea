"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  cosmicFadeIn,
  fadeInViewport,
  floatingOrb,
  heroTitle,
  heroSubtitle,
  heroCTA,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

// ============================================
// COSMIC BACKGROUND
// ============================================

function LabCosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Mouse-tracking glow */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(127, 255, 212, 0.06), transparent 40%)",
        }}
      />

      {/* Star field */}
      <div className="absolute inset-0 bg-cosmic-stars opacity-50" />

      {/* Floating orbs */}
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-arcane-crystal/5 blur-[120px]"
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-arcane-void/8 blur-[100px]"
        style={{ animationDelay: "3s" }}
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-arcane-fire/5 blur-[80px]"
        style={{ animationDelay: "5s" }}
      />
      <motion.div
        variants={floatingOrb}
        animate="animate"
        className="absolute bottom-[30%] left-[40%] w-[250px] h-[250px] rounded-full bg-arcane-gold/6 blur-[70px]"
        style={{ animationDelay: "7s" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127, 255, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127, 255, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ============================================
// ELEMENT ORBIT — the signature visual
// ============================================

function ElementOrbit() {
  const elements = [
    { color: "#7fffd4", label: "Crystal", angle: 0 },
    { color: "#ff6b35", label: "Fire", angle: 72 },
    { color: "#78a6ff", label: "Water", angle: 144 },
    { color: "#9966ff", label: "Void", angle: 216 },
    { color: "#ffd700", label: "Gold", angle: 288 },
  ];

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] mx-auto">
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* Ring track */}
        <div className="absolute inset-4 sm:inset-6 rounded-full border border-arcane-crystal/10" />
        <div className="absolute inset-8 sm:inset-12 rounded-full border border-arcane-crystal/5" />

        {/* Orbital elements */}
        {elements.map((el) => (
          <motion.div
            key={el.label}
            className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4"
            style={{
              transform: `rotate(${el.angle}deg) translateX(${typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 155}px) rotate(-${el.angle}deg)`,
              transformOrigin: "0 0",
            }}
          >
            <div
              className="w-full h-full rounded-full animate-pulse-glow"
              style={{
                backgroundColor: el.color,
                boxShadow: `0 0 20px ${el.color}60`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Center gem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-arcane-crystal/20 to-arcane-void/20 border border-arcane-crystal/30 flex items-center justify-center backdrop-blur-sm"
        >
          <Icons.Gem className="w-8 h-8 sm:w-10 sm:h-10 text-arcane-crystal" />
        </motion.div>
      </div>

      {/* Glow behind center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-arcane-crystal/8 blur-[40px]" />
      </div>
    </div>
  );
}

// ============================================
// DATA
// ============================================

const evolutionStages = [
  {
    id: "v1",
    label: "Foundation",
    desc: "Cosmic palette, elemental colors, fluid typography, font system",
    icon: Palette,
    color: "#7fffd4",
    element: "Crystal",
  },
  {
    id: "v2",
    label: "Components",
    desc: "CVA buttons, badges, inputs, cards with elemental variants",
    icon: Component,
    color: "#78a6ff",
    element: "Water",
  },
  {
    id: "v3",
    label: "Motion",
    desc: "40+ CSS keyframes, 30+ Framer Motion variants, spring physics",
    icon: Sparkles,
    color: "#9966ff",
    element: "Void",
  },
  {
    id: "v4",
    label: "Effects",
    desc: "Glass morphism, glow systems, gradient borders, cosmic mesh",
    icon: Layers,
    color: "#ff6b35",
    element: "Fire",
  },
  {
    id: "v5",
    label: "Layout",
    desc: "Container widths, spacing scale, responsive grids, spatial rhythm",
    icon: Layout,
    color: "#00ff88",
    element: "Wind",
  },
  {
    id: "v6",
    label: "Guardians",
    desc: "Ten guardian palettes, frequency-driven tokens, elemental design",
    icon: Shield,
    color: "#ffd700",
    element: "Gold",
  },
  {
    id: "v7",
    label: "Responsive",
    desc: "WCAG compliance, touch targets, reduced motion, device testing",
    icon: Smartphone,
    color: "#8b7355",
    element: "Earth",
  },
  {
    id: "v8",
    label: "3D & Spatial",
    desc: "Three.js patterns, WebXR integration, performance tiers",
    icon: Box,
    color: "#7fffd4",
    element: "Crystal",
  },
  {
    id: "v9",
    label: "AI Patterns",
    desc: "Multi-LLM routing, generation UI, Guardian AI personalities",
    icon: Brain,
    color: "#9966ff",
    element: "Void",
  },
  {
    id: "v10",
    label: "Future Vision",
    desc: "Container queries, view transitions, scroll-driven animations",
    icon: Telescope,
    color: "#ffd700",
    element: "Gold",
  },
];

const principles = [
  {
    icon: Eye,
    title: "Cosmic Clarity",
    desc: "Dark backgrounds with luminous accents. Every element guides the eye through deliberate information hierarchy.",
    size: "large" as const,
  },
  {
    icon: Sparkles,
    title: "Mythic Modernity",
    desc: "Cinzel display meets Inter UI. Ancient gravitas, pixel-perfect precision.",
    size: "small" as const,
  },
  {
    icon: Heart,
    title: "Elemental Emotion",
    desc: "Five elements, ten guardians — distinct color, glow, and motion signatures.",
    size: "small" as const,
  },
  {
    icon: Zap,
    title: "Performance First",
    desc: "Glass blur reduced on mobile. Animations respect prefers-reduced-motion. Every effect is earned, never decorative.",
    size: "large" as const,
  },
  {
    icon: Globe,
    title: "Universal Access",
    desc: "WCAG focus states, high contrast, safe-area insets, 44px touch targets.",
    size: "small" as const,
  },
  {
    icon: Code2,
    title: "Developer Joy",
    desc: "CVA variants, Tailwind utilities, typed animation exports. Build with it.",
    size: "small" as const,
  },
];

const processSteps = [
  {
    num: "01",
    title: "Mythology as Specification",
    desc: "Colors from elements. Timings from frequencies. The lore IS the design system.",
    color: "arcane-crystal",
    icon: Gem,
  },
  {
    num: "02",
    title: "AI-Augmented Design",
    desc: "Claude Code agents generate components, test variants, iterate patterns.",
    color: "arcane-void",
    icon: Brain,
  },
  {
    num: "03",
    title: "Build in Public",
    desc: "Every evolution stage documented, versioned, shared. Watch it grow.",
    color: "arcane-fire",
    icon: Eye,
  },
  {
    num: "04",
    title: "Performance Budgets",
    desc: "Glass blur costs CPU. Animations cost GPU. We budget every visual.",
    color: "arcane-gold",
    icon: Zap,
  },
  {
    num: "05",
    title: "Continuous Evolution",
    desc: "Never done. It evolves with the platform, mythology, and community.",
    color: "arcane-water",
    icon: Star,
  },
];

// ============================================
// MAIN PAGE
// ============================================

export default function DesignLabHub() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      <LabCosmicBackground />

      {/* Floating back link */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 glass rounded-full px-4 py-2.5 text-sm font-sans text-text-secondary hover:text-white transition-all duration-300 border border-white/[0.08] hover:border-arcane-crystal/20 shadow-lg shadow-black/20 hover:shadow-arcane-crystal/5 group"
      >
        <Icons.ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
        arcanea.ai
      </Link>

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  variants={heroTitle}
                  initial="hidden"
                  animate="visible"
                  className="mb-6"
                >
                  <Badge
                    variant="crystal"
                    className="text-xs px-4 py-1.5 glass border-arcane-crystal/30 text-arcane-crystal font-sans tracking-[0.2em]"
                  >
                    <Icons.Gem className="w-3 h-3 mr-2" />
                    BUILDING IN PUBLIC
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={heroTitle}
                  initial="hidden"
                  animate="visible"
                  className="text-fluid-5xl lg:text-fluid-6xl font-display text-white mb-6 leading-[0.95] tracking-tight"
                >
                  The Arcanean
                  <span className="block text-gradient-cosmic mt-1">
                    Design System
                  </span>
                </motion.h1>

                <motion.p
                  variants={heroSubtitle}
                  initial="hidden"
                  animate="visible"
                  className="text-fluid-lg font-body text-text-secondary mb-8 leading-relaxed max-w-xl"
                >
                  A living design language born from cosmic mythology. Follow
                  every decision from first pixel to full platform — documented,
                  versioned, open.
                </motion.p>

                <motion.div
                  variants={heroCTA}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-3"
                >
                  <Link href="/design-lab/v1">
                    <Button className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold rounded-2xl px-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                      Explore Foundation
                      <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/arcanea"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="glass border-arcane-crystal/20 text-text-secondary hover:text-white font-sans rounded-2xl px-6"
                    >
                      <Icons.Github className="w-4 h-4 mr-2" />
                      Source
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right: Element Orbit */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="hidden lg:block"
              >
                <ElementOrbit />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ===== LIVE STATS BAR ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 -mt-8 mb-24"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={staggerContainerFast}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {[
                { label: "Color Tokens", value: 45, suffix: "+" },
                { label: "Animations", value: 40, suffix: "+" },
                { label: "Motion Variants", value: 30, suffix: "+" },
                { label: "Component Variants", value: 20, suffix: "+" },
                { label: "Type Sizes", value: 11, suffix: "" },
                { label: "Glass Tiers", value: 3, suffix: "" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="glass rounded-2xl p-4 text-center group hover:border-arcane-crystal/30 transition-colors"
                >
                  <div className="text-2xl font-display text-gradient-crystal mb-0.5">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-sans text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ===== DESIGN PRINCIPLES — Bento Grid ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 mb-32"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={cosmicFadeIn} className="text-center mb-12">
              <Badge
                variant="void"
                className="mb-4 font-sans text-xs tracking-[0.15em] px-3 py-1"
              >
                PHILOSOPHY
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-3">
                Design Principles
              </h2>
              <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
                Six principles guide every decision — from color to animation
                timing to accessibility.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {principles.map((p, i) => {
                const Icon = p.icon;
                const isLarge = p.size === "large";
                return (
                  <motion.div
                    key={p.title}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className={cn(
                      "relative group rounded-3xl p-6 overflow-hidden transition-colors duration-500",
                      "glass hover:border-arcane-crystal/30",
                      isLarge ? "lg:col-span-2" : "",
                    )}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-arcane-crystal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-arcane-crystal/10 flex items-center justify-center mb-4 group-hover:bg-arcane-crystal/20 transition-colors">
                        <Icon className="w-5 h-5 text-arcane-crystal" />
                      </div>
                      <h3 className="text-lg font-display text-white mb-2">
                        {p.title}
                      </h3>
                      <p
                        className={cn(
                          "font-body text-text-secondary leading-relaxed",
                          isLarge ? "text-sm" : "text-sm",
                        )}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== EVOLUTION TIMELINE ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={cosmicFadeIn} className="text-center mb-16">
              <Badge
                variant="gold"
                className="mb-4 font-sans text-xs tracking-[0.15em] px-3 py-1"
              >
                <Icons.Star className="w-3 h-3 mr-1.5" />
                EVOLUTION
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-3">
                Ten Stages of Design
              </h2>
              <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
                Each stage documents a layer of the system. From foundational
                colors to the future of spatial computing.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Glowing vertical line */}
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-px">
                <div className="absolute inset-0 bg-gradient-to-b from-arcane-crystal/40 via-arcane-void/30 to-arcane-gold/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-arcane-crystal/20 via-arcane-void/15 to-arcane-gold/20 blur-sm" />
              </div>

              <div className="space-y-6 lg:space-y-8">
                {evolutionStages.map((stage, i) => {
                  const Icon = stage.icon;
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={stage.id}
                      variants={staggerItem}
                      className={cn(
                        "relative flex items-start gap-6",
                        "lg:gap-0",
                        isLeft ? "lg:flex-row" : "lg:flex-row-reverse",
                      )}
                    >
                      {/* Dot on timeline */}
                      <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className="w-3 h-3 rounded-full mt-6"
                          style={{
                            backgroundColor: stage.color,
                            boxShadow: `0 0 12px ${stage.color}50`,
                          }}
                        />
                      </div>

                      {/* Spacer for mobile */}
                      <div className="w-12 flex-shrink-0 lg:hidden" />

                      {/* Content card */}
                      <div
                        className={cn(
                          "flex-1 lg:w-[calc(50%-2rem)]",
                          isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12",
                        )}
                      >
                        <Link
                          href={`/design-lab/${stage.id}`}
                          className="group block"
                        >
                          <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="glass rounded-2xl p-5 relative overflow-hidden hover:border-white/20 transition-colors"
                          >
                            {/* Top accent */}
                            <div
                              className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-80 transition-opacity"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`,
                              }}
                            />

                            <div
                              className={cn(
                                "flex items-start gap-4",
                                isLeft
                                  ? "lg:flex-row-reverse lg:text-left"
                                  : "",
                              )}
                            >
                              <div
                                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border transition-colors"
                                style={{
                                  backgroundColor: `${stage.color}10`,
                                  borderColor: `${stage.color}20`,
                                }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: stage.color }}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-[11px] text-text-muted">
                                    {stage.id.toUpperCase()}
                                  </span>
                                  <span className="text-[9px] font-sans text-arcane-crystal/60 uppercase tracking-widest">
                                    {stage.element}
                                  </span>
                                </div>
                                <h3 className="text-base font-display text-white mb-1 group-hover:text-arcane-crystal transition-colors">
                                  {stage.label}
                                </h3>
                                <p className="text-sm font-body text-text-secondary leading-relaxed">
                                  {stage.desc}
                                </p>
                              </div>

                              <Icons.ArrowRight className="w-4 h-4 text-text-disabled group-hover:text-arcane-crystal group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                            </div>
                          </motion.div>
                        </Link>
                      </div>

                      {/* Spacer for desktop */}
                      <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

        {/* ===== HOW WE BUILD ===== */}
        <motion.section
          {...fadeInViewport}
          variants={staggerContainer}
          className="px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={cosmicFadeIn} className="mb-16">
              <Badge
                variant="fire"
                className="mb-4 font-sans text-xs tracking-[0.15em] px-3 py-1"
              >
                <Icons.Flame className="w-3 h-3 mr-1.5" />
                PROCESS
              </Badge>
              <h2 className="text-fluid-4xl font-display text-white mb-3">
                How We Build
              </h2>
              <p className="text-fluid-base font-body text-text-secondary max-w-2xl leading-relaxed">
                Building Arcanea&apos;s design system is an act of
                world-building. Every token carries the mythology forward.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className={cn(
                      "relative group glass rounded-3xl p-6 overflow-hidden hover:border-white/20 transition-all",
                      i === 0 ? "lg:col-span-2 md:col-span-2" : "",
                    )}
                  >
                    {/* Number watermark */}
                    <div className="absolute top-4 right-6 text-6xl font-display text-white/[0.03] select-none pointer-events-none">
                      {step.num}
                    </div>

                    {/* Accent glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 20% 80%, var(--${step.color}) / 0.05, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                        style={{
                          backgroundColor: `var(--${step.color}, #7fffd4)10`,
                        }}
                      >
                        <span
                          className={cn(
                            "text-sm font-mono",
                            `text-${step.color}`,
                          )}
                        >
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-display text-white mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-sm font-body text-text-secondary leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* ===== LIVE COLOR STRIP ===== */}
        <motion.section
          {...fadeInViewport}
          variants={cosmicFadeIn}
          className="px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Icons.Palette className="w-5 h-5 text-arcane-crystal" />
                <h3 className="text-sm font-sans text-white tracking-wider uppercase">
                  Live Palette
                </h3>
              </div>

              {/* Cosmic strip */}
              <div className="flex rounded-xl overflow-hidden mb-4 h-12 sm:h-16">
                {[
                  { color: "#0b0e14", label: "Void" },
                  { color: "#121826", label: "Deep" },
                  { color: "#1a2332", label: "Surface" },
                  { color: "#242f42", label: "Raised" },
                  { color: "#2d3a52", label: "Elevated" },
                  { color: "#364562", label: "Overlay" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex-1 relative group cursor-crosshair"
                    style={{ backgroundColor: c.color }}
                  >
                    <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono text-white/60">
                        {c.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Element strip */}
              <div className="flex rounded-xl overflow-hidden h-8 sm:h-10">
                {[
                  { color: "#7fffd4", label: "Crystal" },
                  { color: "#ff6b35", label: "Fire" },
                  { color: "#78a6ff", label: "Water" },
                  { color: "#9966ff", label: "Void" },
                  { color: "#ffd700", label: "Gold" },
                  { color: "#00ff88", label: "Wind" },
                  { color: "#8b7355", label: "Earth" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex-1 relative group cursor-crosshair"
                    style={{ backgroundColor: c.color }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono text-cosmic-void font-bold">
                        {c.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">
                  6 cosmic layers + 7 elemental accents
                </span>
                <Link
                  href="/design-lab/v1"
                  className="text-xs font-sans text-arcane-crystal hover:text-arcane-crystal/80 transition-colors flex items-center gap-1"
                >
                  Explore tokens <Icons.ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== CTA ===== */}
        <motion.section
          {...fadeInViewport}
          variants={cosmicFadeIn}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative glass rounded-[2rem] p-12 sm:p-16 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-arcane-crystal/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-arcane-void/8 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <p className="text-sm font-body text-text-muted italic mb-6 max-w-lg mx-auto">
                  &ldquo;The Arc turns: Potential &rarr; Manifestation &rarr;
                  Experience &rarr; Dissolution &rarr; Evolved Potential.&rdquo;
                </p>

                <h2 className="text-fluid-4xl font-display text-white mb-4">
                  Start the Journey
                </h2>
                <p className="text-fluid-base font-body text-text-secondary max-w-xl mx-auto mb-10">
                  Dive into ten stages of design evolution. Every color has
                  meaning. Every animation has purpose. Every component carries
                  mythology.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/design-lab/v1">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-arcane-crystal to-arcane-water text-cosmic-void font-sans font-semibold px-8 rounded-2xl shadow-glow-crystal hover:shadow-glow-lg transition-all"
                    >
                      Begin with Foundation
                      <Icons.ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/design-lab/v6">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="glass border-arcane-gold/20 text-arcane-gold hover:border-arcane-gold/40 font-sans px-8 rounded-2xl transition-all"
                    >
                      <Icons.Shield className="w-5 h-5 mr-2" />
                      Meet the Guardians
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
