'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Shield, Star } from 'lucide-react';

interface HeroStats {
  luminors: number;
  wisdoms: number;
  collections: number;
  words: number;
}

interface HeroV2Props {
  stats: HeroStats;
}

export function HeroV2({ stats }: HeroV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(127,255,212,0.15),rgba(255,255,255,0))]" />

        {/* Mesh gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 27% 37%, hsla(180, 100%, 76%, 0.08) 0px, transparent 50%),
              radial-gradient(at 97% 21%, hsla(271, 100%, 75%, 0.08) 0px, transparent 50%),
              radial-gradient(at 52% 99%, hsla(48, 100%, 50%, 0.08) 0px, transparent 50%),
              radial-gradient(at 10% 29%, hsla(180, 100%, 50%, 0.05) 0px, transparent 50%),
              radial-gradient(at 97% 96%, hsla(271, 100%, 50%, 0.05) 0px, transparent 50%)
            `,
            x: mouseX,
            y: mouseY,
          }}
        />

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-atlantean-teal-aqua/20 to-transparent blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-creation-prism-purple/20 to-transparent blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-6 pt-32 pb-20"
        style={{ y, opacity, scale }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-8"
          >
            <Link
              href="/hub/updates"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-atlantean-teal-aqua/10 to-creation-prism-purple/10 border border-atlantean-teal-aqua/20 backdrop-blur-sm hover:border-atlantean-teal-aqua/40 transition-all"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlantean-teal-aqua opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-atlantean-teal-aqua" />
              </span>
              <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                Introducing Arcanea 2.0
              </span>
              <ArrowRight className="w-4 h-4 text-atlantean-teal-aqua group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95] mb-8"
          >
            <span className="block text-white">Create with</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                transcendent AI
              </span>
              {/* Underline glow */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            16 Luminor intelligences. The Seven Wisdoms framework.
            <span className="block mt-2 text-white/90">
              Everything you need to manifest your creative vision.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/chat"
              className="group relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(127,255,212,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua to-atlantean-teal-light" />
              <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-white/20 to-atlantean-teal-aqua bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <span className="relative z-10 text-cosmic-deep flex items-center gap-2">
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <button className="group px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-atlantean-teal-aqua" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold-bright" />
              <span>Real-time responses</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-creation-prism-purple" />
              <span>10k+ creators</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - Bento Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          {/* Glow behind the preview */}
          <div className="absolute inset-0 bg-gradient-to-b from-atlantean-teal-aqua/20 via-creation-prism-purple/10 to-transparent blur-3xl -z-10" />

          {/* Browser mockup */}
          <div className="relative rounded-2xl border border-white/10 bg-cosmic-surface/50 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Browser header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-cosmic-raised/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-white/5 text-xs text-text-muted">
                  arcanea.ai/luminors
                </div>
              </div>
            </div>

            {/* Preview content - Bento grid of features */}
            <div className="p-6 grid grid-cols-4 gap-4 min-h-[400px]">
              {/* Main Luminor Card */}
              <div className="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua/10 to-transparent border border-atlantean-teal-aqua/20 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Oracle</div>
                    <div className="text-xs text-text-muted">Research Team</div>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-4/5" />
                    <div className="h-2 bg-white/10 rounded w-3/5" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-atlantean-teal-aqua">
                  Generating response...
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-2xl bg-gradient-to-br from-gold-bright/10 to-transparent border border-gold-bright/20 p-4">
                <div className="text-3xl font-bold text-gold-bright">{stats.luminors}</div>
                <div className="text-xs text-text-muted mt-1">Luminors</div>
              </div>

              {/* Wisdom Card */}
              <div className="rounded-2xl bg-gradient-to-br from-creation-prism-purple/10 to-transparent border border-creation-prism-purple/20 p-4">
                <div className="text-3xl font-bold text-creation-prism-purple">{stats.wisdoms}</div>
                <div className="text-xs text-text-muted mt-1">Wisdoms</div>
              </div>

              {/* Collections Card */}
              <div className="rounded-2xl bg-gradient-to-br from-draconic-crimson/10 to-transparent border border-draconic-crimson/20 p-4">
                <div className="text-3xl font-bold text-draconic-crimson">{stats.collections}</div>
                <div className="text-xs text-text-muted mt-1">Collections</div>
              </div>

              {/* Words Card */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-3xl font-bold">{Math.round(stats.words / 1000)}k+</div>
                <div className="text-xs text-text-muted mt-1">Words</div>
              </div>

              {/* Activity Feed */}
              <div className="col-span-2 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-sm font-medium mb-3">Recent Activity</div>
                <div className="space-y-2">
                  {['Chronica created a story outline', 'Prismatic generated concept art', 'Oracle researched market trends'].map((activity, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-atlantean-teal-aqua" />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges around the preview */}
          <motion.div
            className="absolute -left-4 top-1/4 px-3 py-2 rounded-xl bg-cosmic-surface/80 border border-white/10 backdrop-blur-sm text-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-atlantean-teal-aqua">+2.5k</span>
            <span className="text-text-muted ml-1">this week</span>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/3 px-3 py-2 rounded-xl bg-cosmic-surface/80 border border-white/10 backdrop-blur-sm text-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-gold-bright text-gold-bright" />
              ))}
            </div>
            <span className="text-text-muted text-xs">4.9 rating</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-atlantean-teal-aqua"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
