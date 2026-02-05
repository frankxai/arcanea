'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Play, X, Sparkles, Star, Users, Zap, ChevronDown } from 'lucide-react';

interface HeroV3Props {
  stats: {
    luminors: number;
    wisdoms: number;
    collections: number;
    words: number;
  };
}


export function HeroV3({ stats }: HeroV3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

  // Smooth spring for mouse movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / 30,
        y: (e.clientY - innerHeight / 2) / 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced Gradient Background */}
        <div className="absolute inset-0 -z-20">
          {/* Base dark */}
          <div className="absolute inset-0 bg-cosmic-deep" />

          {/* Animated aurora gradients */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 100% 100% at 50% -20%, rgba(127,255,212,0.15) 0%, transparent 50%),
                radial-gradient(ellipse 80% 80% at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%),
                radial-gradient(ellipse 60% 60% at 20% 80%, rgba(255,215,0,0.08) 0%, transparent 50%)
              `,
              x: springX,
              y: springY,
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Animated grid lines */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(127,255,212,0.5) 1px, transparent 1px),
                linear-gradient(rgba(127,255,212,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)',
            }}
          />

          {/* Floating light orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                background: `radial-gradient(circle, ${
                  ['rgba(127,255,212,0.08)', 'rgba(139,92,246,0.06)', 'rgba(255,215,0,0.05)', 'rgba(127,255,212,0.04)', 'rgba(139,92,246,0.03)'][i]
                } 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
              animate={{
                x: [0, 30, 0, -30, 0],
                y: [0, -20, 0, 20, 0],
                scale: [1, 1.1, 1, 0.9, 1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          className="relative max-w-7xl mx-auto px-6 py-32"
          style={{
            y,
            opacity,
            scale,
            filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
          }}
        >
          <div className="text-center">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex mb-10"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-atlantean-teal-aqua rounded-full opacity-50 group-hover:opacity-100 blur transition-opacity" />
                <Link
                  href="/hub/updates"
                  className="relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-cosmic-deep border border-white/10"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlantean-teal-aqua opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-atlantean-teal-aqua" />
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">
                    Arcanea 2.0 is here
                  </span>
                  <ArrowRight className="w-4 h-4 text-atlantean-teal-aqua" />
                </Link>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-[0.9] mb-8">
                <span className="block text-white">Every creator</span>
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple via-50% to-gold-bright bg-[length:200%_auto] bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ['0% center', '200% center'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    gets stuck
                  </motion.span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={isLoaded ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              The blank page. The lost direction. The voice that says you&apos;re not good enough.
              <span className="block text-white/90 font-normal mt-3">
                Arcanea gives you AI companions, creative wisdom, and tools to push through.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              {/* Primary CTA */}
              <Link
                href="/chat"
                className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-atlantean-teal-light to-atlantean-teal-aqua"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 100%' }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-atlantean-teal-aqua/50 blur-xl -z-10" />
                <span className="relative z-10 text-cosmic-deep flex items-center gap-2">
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Video CTA */}
              <button
                onClick={() => setShowVideo(true)}
                className="group px-10 py-5 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-4"
              >
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 text-white" />
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-white/30"
                    animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <span className="text-white font-semibold text-lg">Watch Demo</span>
              </button>
            </motion.div>

            {/* What you get - honest, not inflated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-atlantean-teal-aqua/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-atlantean-teal-aqua" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    {stats.luminors}
                  </div>
                  <div className="text-xs text-text-muted">AI Companions</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-bright/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-bright" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    {stats.collections}
                  </div>
                  <div className="text-xs text-text-muted">Wisdom Collections</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-creation-prism-purple/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-creation-prism-purple" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    Free
                  </div>
                  <div className="text-xs text-text-muted">To Start Creating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs text-text-muted uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-cosmic-surface rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Placeholder for video - replace with actual video embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-atlantean-teal-aqua ml-1" />
                  </div>
                  <p className="text-text-secondary">Demo video coming soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
