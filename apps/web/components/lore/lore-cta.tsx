'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export function LoreCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/30 to-cosmic-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-atlantean-teal-aqua/10 via-creation-prism-purple/5 to-transparent rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          {/* Quote */}
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-secondary leading-relaxed mb-8">
            "Enter seeking, leave transformed, return whenever needed."
          </blockquote>
          <cite className="block text-sm text-text-muted font-mono tracking-wider mb-16">
            — Inscription on the Library Door
          </cite>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple text-cosmic-deep font-semibold text-lg hover:shadow-glow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Begin Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/lore/library/legends-of-arcanea/i-the-first-dawn"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
            >
              <Play className="w-5 h-5" />
              Read the First Legend
            </Link>
          </div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-16 flex justify-center gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gold-bright/50"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
