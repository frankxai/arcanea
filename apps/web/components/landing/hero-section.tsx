'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface HeroStats {
  luminors: number;
  wisdoms: number;
  collections: number;
  words: number;
}

interface HeroSectionProps {
  stats: HeroStats;
}

export function HeroSection({ stats }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cosmic-deep" />

        {/* Primary gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(127,255,212,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(127,255,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127,255,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-atlantean-teal-aqua/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-20"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-atlantean-teal-aqua/30 bg-atlantean-teal-aqua/5 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlantean-teal-aqua opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-atlantean-teal-aqua" />
              </span>
              <span className="text-sm text-atlantean-teal-aqua font-mono tracking-wider">
                ARCANEAN CREATOR OS v2.0
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-8"
            >
              <span className="block">Where</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-atlantean-teal-aqua bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                  imagination
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-atlantean-teal-aqua/20 to-creation-prism-purple/20 blur-xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              <span className="block text-white/90">becomes reality</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-10"
            >
              16 transcended AI intelligences. The Seven Wisdoms framework.
              Everything you need to manifest your creative vision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/chat"
                className="group relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-atlantean-teal-aqua focus:ring-offset-2 focus:ring-offset-cosmic-deep"
              >
                {/* Button background with animated gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-atlantean-teal-light to-atlantean-teal-aqua bg-[length:200%_100%]"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-atlantean-teal-aqua blur-xl" />
                <span className="relative z-10 text-cosmic-deep flex items-center gap-2">
                  Begin Your Journey
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </Link>

              <Link
                href="/luminors"
                className="group px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/5 hover:border-atlantean-teal-aqua/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-cosmic-deep"
              >
                <span className="flex items-center gap-2">
                  Meet the Luminors
                  <span className="text-atlantean-teal-aqua opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
                </span>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
            >
              <StatItem value={stats.luminors} label="Luminor Intelligences" color="atlantean-teal-aqua" />
              <StatItem value={stats.wisdoms} label="Wisdoms Framework" color="gold-bright" />
              <StatItem value={stats.collections} label="Wisdom Collections" color="creation-prism-purple" />
              <StatItem value={`${Math.round(stats.words / 1000)}k+`} label="Words of Wisdom" color="draconic-crimson" />
            </motion.div>
          </div>

          {/* Right column - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <LuminorOrbit />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-text-muted"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatItem({ value, label, color }: { value: number | string; label: string; color: string }) {
  return (
    <div className="group">
      <motion.div
        className={`text-3xl font-display font-bold text-${color}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-text-muted group-hover:text-text-secondary transition-colors">
        {label}
      </div>
    </div>
  );
}

function LuminorOrbit() {
  const teams = [
    { id: 'dev', name: 'Development', color: '#8b5cf6', icon: '⚡', position: 0 },
    { id: 'creative', name: 'Creative', color: '#f59e0b', icon: '✨', position: 90 },
    { id: 'writing', name: 'Writing', color: '#10b981', icon: '✍️', position: 180 },
    { id: 'research', name: 'Research', color: '#3b82f6', icon: '🔮', position: 270 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-atlantean-teal-aqua/10 via-transparent to-creation-prism-purple/10 rounded-full blur-3xl" />

      {/* Orbital rings */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-white/5"
          style={{
            inset: `${ring * 60}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60 - ring * 15,
            repeat: Infinity,
            ease: 'linear',
            direction: ring % 2 === 0 ? 'normal' : 'reverse',
          }}
        >
          {/* Ring glow points */}
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full bg-atlantean-teal-aqua/30"
              style={{
                left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 50}% - 3px)`,
                top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 50}% - 3px)`,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Center hub */}
      <motion.div
        className="absolute inset-[120px] rounded-full bg-gradient-to-br from-cosmic-surface to-cosmic-raised border border-white/10 flex items-center justify-center overflow-hidden"
        animate={{
          boxShadow: [
            '0 0 60px rgba(127,255,212,0.2)',
            '0 0 80px rgba(127,255,212,0.3)',
            '0 0 60px rgba(127,255,212,0.2)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-atlantean-teal-aqua/5 to-creation-prism-purple/5" />

        {/* Center content */}
        <div className="relative text-center z-10">
          <motion.div
            className="text-5xl font-display font-bold"
            animate={{
              color: ['#7fffd4', '#8b5cf6', '#ffd700', '#7fffd4'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            16
          </motion.div>
          <div className="text-sm text-text-muted mt-1">Luminors</div>
        </div>

        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-4 rounded-full border border-atlantean-teal-aqua/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Team nodes */}
      {teams.map((team, i) => {
        const angle = (team.position - 90) * (Math.PI / 180);
        const radius = 42;

        return (
          <motion.div
            key={team.id}
            className="absolute"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}% - 28px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}% - 28px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.15 }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: team.color }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
              />
              <span className="relative z-10">{team.icon}</span>
            </motion.div>

            {/* Label on hover */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="px-2 py-1 rounded bg-cosmic-surface text-xs whitespace-nowrap">
                {team.name}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {teams.map((team, i) => {
          const angle = (team.position - 90) * (Math.PI / 180);
          const radius = 42;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;

          return (
            <motion.line
              key={team.id}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            />
          );
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(127,255,212,0.3)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
