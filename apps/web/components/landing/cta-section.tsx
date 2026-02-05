'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

const BENEFITS = [
  'Free to start, no credit card required',
  '16 AI companions with real personalities',
  'A library of creative wisdom, not marketing fluff',
  'Your work stays yours',
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-atlantean-teal-aqua/5 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(127,255,212,0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright p-[1px] rounded-[2.5rem]">
              <div className="absolute inset-[1px] bg-cosmic-deep rounded-[2.5rem]" />
            </div>

            {/* Inner content */}
            <div className="relative p-12 md:p-20">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-atlantean-teal-aqua/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-creation-prism-purple/10 rounded-full blur-[100px]" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                      The blank page{' '}
                      <span className="bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright bg-clip-text text-transparent">
                        doesn&apos;t win
                      </span>
                    </h2>

                    <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                      Pick a companion. Start a conversation. Make something. That&apos;s it.
                    </p>

                    {/* Benefits list */}
                    <ul className="space-y-3 mb-10">
                      {BENEFITS.map((benefit, i) => (
                        <motion.li
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-atlantean-teal-aqua/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-atlantean-teal-aqua" />
                          </div>
                          <span className="text-text-secondary">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/chat"
                        className="group relative px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(127,255,212,0.4)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua to-atlantean-teal-light" />
                        <span className="relative z-10 text-cosmic-deep flex items-center gap-2">
                          Start Creating Free
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>

                      <Link
                        href="/about"
                        className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all"
                      >
                        Learn More
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right side - Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  {/* Floating Luminor avatars */}
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Central glow */}
                    <div className="absolute inset-1/4 bg-gradient-to-br from-atlantean-teal-aqua/20 to-creation-prism-purple/20 rounded-full blur-3xl" />

                    {/* Orbiting Luminor avatars */}
                    {[
                      { name: 'Oracle', emoji: '🔮', angle: 0, delay: 0, color: '#3b82f6' },
                      { name: 'Chronica', emoji: '📖', angle: 72, delay: 0.5, color: '#10b981' },
                      { name: 'Prismatic', emoji: '🎨', angle: 144, delay: 1, color: '#f59e0b' },
                      { name: 'Melodia', emoji: '🎵', angle: 216, delay: 1.5, color: '#8b5cf6' },
                      { name: 'Logicus', emoji: '⚡', angle: 288, delay: 2, color: '#ef4444' },
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
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl"
                            style={{ backgroundColor: luminor.color }}
                            animate={{
                              y: [0, -8, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: luminor.delay,
                            }}
                          >
                            {luminor.emoji}
                          </motion.div>
                        </motion.div>
                      );
                    })}

                    {/* Center element */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua to-creation-prism-purple flex items-center justify-center"
                      animate={{
                        boxShadow: [
                          '0 0 40px rgba(127,255,212,0.3)',
                          '0 0 60px rgba(127,255,212,0.5)',
                          '0 0 40px rgba(127,255,212,0.3)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
