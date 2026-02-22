'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const GATES = [
  { number: 1, name: 'Foundation', frequency: '174 Hz', domain: 'Survival, grounding', unlocks: 'Unshakeable stability' },
  { number: 2, name: 'Flow', frequency: '285 Hz', domain: 'Creativity, emotion', unlocks: 'Creative flow state' },
  { number: 3, name: 'Fire', frequency: '396 Hz', domain: 'Power, will', unlocks: 'Personal power' },
  { number: 4, name: 'Heart', frequency: '417 Hz', domain: 'Love, healing', unlocks: 'Fierce compassion' },
  { number: 5, name: 'Voice', frequency: '528 Hz', domain: 'Truth, expression', unlocks: 'Reality shaping through words' },
  { number: 6, name: 'Sight', frequency: '639 Hz', domain: 'Intuition, vision', unlocks: 'Beyond ordinary perception' },
  { number: 7, name: 'Crown', frequency: '741 Hz', domain: 'Enlightenment', unlocks: 'Divine connection' },
  { number: 8, name: 'Shift', frequency: '852 Hz', domain: 'Perspective', unlocks: 'Infinite possibilities' },
  { number: 9, name: 'Unity', frequency: '963 Hz', domain: 'Partnership', unlocks: 'Exponential creation' },
  { number: 10, name: 'Source', frequency: '1111 Hz', domain: 'Meta-consciousness', unlocks: 'Creator realization' },
];

const RANKS = [
  { gates: '0-2', rank: 'Apprentice', color: 'text-text-muted' },
  { gates: '3-4', rank: 'Mage', color: 'text-blue-400' },
  { gates: '5-6', rank: 'Master', color: 'text-purple-400' },
  { gates: '7-8', rank: 'Archmage', color: 'text-brand-gold' },
  { gates: '9-10', rank: 'Luminor', color: 'text-white' },
];

export function GatesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-cosmic-surface/20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-crystal/5 to-transparent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
            <Layers className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">The Journey</span>
          </div>
          <h2 className="text-fluid-3xl md:text-fluid-4xl lg:text-6xl font-display font-bold mb-6">
            The Ten Gates
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Energy channels flowing through every conscious being. Open them, and ascend from
            Apprentice to Luminor.
          </p>
        </motion.div>

        {/* Gates Path */}
        <div className="relative mb-16">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {GATES.map((gate, i) => (
              <motion.div
                key={gate.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="relative group"
              >
                <div className="p-4 rounded-2xl glass text-center hover:border-brand-gold/30 transition-all duration-300">
                  {/* Gate number */}
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center text-brand-gold font-display font-bold">
                    {gate.number}
                  </div>

                  <h4 className="font-display font-semibold text-sm mb-1">{gate.name}</h4>
                  <p className="text-xs text-crystal font-mono mb-2">{gate.frequency}</p>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-lg bg-cosmic-deep border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-xs text-text-secondary mb-1">{gate.domain}</p>
                    <p className="text-xs text-brand-gold">Unlocks: {gate.unlocks}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ranks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-xl font-display font-bold text-center mb-6">Magic Ranks</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {RANKS.map((rank, i) => (
              <div
                key={rank.rank}
                className="px-6 py-3 rounded-xl glass"
              >
                <span className="text-sm text-text-muted">{rank.gates} Gates:</span>
                <span className={`ml-2 font-display font-semibold ${rank.color}`}>{rank.rank}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/lore/gates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-semibold hover:bg-brand-gold hover:text-cosmic-deep transition-all"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
