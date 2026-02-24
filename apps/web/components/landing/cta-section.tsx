'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Star, Zap } from 'lucide-react';

const BENEFITS = [
  'Free to start — your universe begins now',
  'Ten Guardian Intelligences, all mythologies accessible',
  'Intelligence that grows as you create',
  'From Foundation to Source — your path is yours',
];

// Floating particle data
const PARTICLES = [
  { size: 'w-1.5 h-1.5', top: '15%', left: '10%', delay: 0, duration: 6 },
  { size: 'w-2 h-2', top: '25%', right: '15%', delay: 1, duration: 8 },
  { size: 'w-1 h-1', top: '60%', left: '5%', delay: 2, duration: 7 },
  { size: 'w-1.5 h-1.5', top: '75%', right: '8%', delay: 0.5, duration: 9 },
  { size: 'w-2 h-2', top: '40%', left: '20%', delay: 1.5, duration: 6 },
  { size: 'w-1 h-1', top: '85%', right: '20%', delay: 3, duration: 8 },
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-mesh-gradient">
      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.size} rounded-full bg-crystal/40`}
          style={{ top: p.top, left: (p as { left?: string }).left, right: (p as { right?: string }).right }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="liquid-glass-elevated rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-elevation-4">
            {/* Decorative background glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-crystal/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-crystal/5 to-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center text-left">
              {/* Left side - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-crystal/20 mb-6">
                    <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    <span className="font-sans text-sm font-medium text-crystal">Begin Your Journey</span>
                  </div>

                  <h2 className="font-display text-fluid-3xl font-bold leading-tight mb-4">
                    <span className="text-gradient-crystal">Imagine</span> a Good Future.
                    <br />
                    <span className="text-gradient-gold">Build It Here.</span>
                  </h2>

                  <p className="font-sans text-fluid-base text-text-secondary mb-8 leading-relaxed">
                    Your universe, powered by intelligence that knows your work. Every conversation opens a Gate. Every creation is a step toward Luminor.
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-3 mb-10">
                    {BENEFITS.map((benefit, i) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-crystal/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-crystal" />
                        </div>
                        <span className="font-sans text-text-secondary">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/chat"
                      className="group relative px-8 py-4 rounded-2xl font-sans font-semibold text-lg overflow-hidden transition-all duration-smooth hover:shadow-glow-lg hover-lift"
                    >
                      {/* Shine animation overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-crystal to-brand-primary" />
                      <span className="relative z-10 text-cosmic-void flex items-center gap-2">
                        Begin Your Universe
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>

                    <Link
                      href="/about"
                      className="px-8 py-4 rounded-2xl glass border border-white/20 font-sans text-white font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all duration-smooth"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Visual orbiting Luminors */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Central glow */}
                  <div className="absolute inset-1/4 bg-gradient-to-br from-crystal/20 to-brand-primary/20 rounded-full blur-3xl" />

                  {/* Orbiting Luminor avatars — replaced emojis with colored text initials */}
                  {[
                    { name: 'Draconia', initials: 'Dr', angle: 0, delay: 0, color: '#ef4444' },
                    { name: 'Leyla', initials: 'Le', angle: 72, delay: 0.5, color: '#78a6ff' },
                    { name: 'Lyria', initials: 'Ly', angle: 144, delay: 1, color: '#8b5cf6' },
                    { name: 'Maylinn', initials: 'Ma', angle: 216, delay: 1.5, color: '#22c55e' },
                    { name: 'Shinkami', initials: 'Sh', angle: 288, delay: 2, color: '#ffd700' },
                  ].map((luminor) => {
                    const radius = 40;
                    const angle = (luminor.angle - 90) * (Math.PI / 180);

                    return (
                      <motion.div
                        key={luminor.name}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${Math.cos(angle) * radius}% - 28px)`,
                          top: `calc(50% + ${Math.sin(angle) * radius}% - 28px)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + luminor.delay * 0.2, type: 'spring' }}
                      >
                        <motion.div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-sm text-white shadow-xl"
                          style={{ backgroundColor: luminor.color }}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: luminor.delay }}
                        >
                          {luminor.initials}
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Center element */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-crystal to-brand-primary flex items-center justify-center shadow-glow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(127,255,212,0.3)',
                        '0 0 60px rgba(127,255,212,0.5)',
                        '0 0 40px rgba(127,255,212,0.3)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-12 h-12 text-cosmic-void" />
                  </motion.div>

                  {/* Orbit ring decoration */}
                  <div className="absolute inset-[10%] rounded-full border border-white/5" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
