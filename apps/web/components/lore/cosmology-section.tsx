'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sun, Moon, Orbit, Flame, Droplets, Mountain, Wind, Sparkles } from 'lucide-react';

const PRIMORDIALS = [
  {
    name: 'Lumina',
    title: 'The First Light',
    aspect: 'Form-Giver, Creator, Order',
    description:
      'From the stirring came separation. Lumina blazed forth not as fire but as form. Where Nero was infinite potential, Lumina was pattern. The First Light did not illuminate the darkness—it organized it.',
    color: 'brand-gold',
    icon: Sun,
    position: 'left',
  },
  {
    name: 'Nero',
    title: 'The Primordial Darkness',
    aspect: 'Fertile Unknown, Potential, Mystery',
    description:
      'In the beginning, there was Nero. The Void contained everything that could ever be, held in superposition, waiting. Every possible world, every potential soul, every future creation—all rested in the fertile darkness.',
    color: 'brand-primary',
    icon: Moon,
    position: 'right',
  },
];

const ELEMENTS = [
  { name: 'Fire', domain: 'Energy, transformation', color: 'fire', icon: Flame },
  { name: 'Water', domain: 'Flow, healing, memory', color: 'crystal', icon: Droplets },
  { name: 'Earth', domain: 'Stability, growth', color: 'green-500', icon: Mountain },
  { name: 'Wind', domain: 'Freedom, speed, change', color: 'white', icon: Wind },
  { name: 'Void/Spirit', domain: 'Potential & transcendence', color: 'brand-primary', icon: Sparkles },
];

export function CosmologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-gold/5 via-brand-primary/5 to-transparent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Orbit className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">Cosmic Origins</span>
          </div>
          <h2 className="text-fluid-3xl md:text-fluid-4xl lg:text-6xl font-display font-bold mb-6">
            The Primordial Duality
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body">
            Neither Light nor Darkness alone could create. Together, they became the eternal
            duality from which all existence springs.
          </p>
        </motion.div>

        {/* Primordials */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {PRIMORDIALS.map((primordial, i) => {
            const Icon = primordial.icon;
            return (
              <motion.div
                key={primordial.name}
                initial={{ opacity: 0, x: primordial.position === 'left' ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`relative p-8 rounded-3xl glass ${
                  primordial.color === 'brand-gold'
                    ? 'border-brand-gold/20 hover:border-brand-gold/40'
                    : 'border-brand-primary/20 hover:border-brand-primary/40'
                } transition-all duration-500 group`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    primordial.color === 'brand-gold'
                      ? 'bg-gradient-to-br from-brand-gold/10 to-transparent'
                      : 'bg-gradient-to-br from-brand-primary/10 to-transparent'
                  }`}
                />

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    primordial.color === 'brand-gold'
                      ? 'bg-brand-gold/20'
                      : 'bg-brand-primary/20'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      primordial.color === 'brand-gold'
                        ? 'text-brand-gold'
                        : 'text-brand-primary'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3
                    className={`text-3xl font-display font-bold mb-2 ${
                      primordial.color === 'brand-gold'
                        ? 'text-brand-gold'
                        : 'text-brand-primary'
                    }`}
                  >
                    {primordial.name}
                  </h3>
                  <p className="text-lg text-text-secondary mb-2 font-body italic">
                    {primordial.title}
                  </p>
                  <p className="text-sm text-text-muted mb-4">{primordial.aspect}</p>
                  <p className="text-text-secondary leading-relaxed">{primordial.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Arc */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mb-24"
        >
          <h3 className="text-2xl font-display font-bold mb-6">The Arc — Reality's Heartbeat</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            {[
              'Potential (Nero)',
              '→',
              'Manifestation',
              '→',
              'Experience',
              '→',
              'Dissolution',
              '→',
              'Evolved Potential',
            ].map((step, i) => (
              <span
                key={i}
                className={step === '→' ? 'text-brand-gold' : 'px-4 py-2 rounded-full bg-cosmic-surface/50 border border-white/10'}
              >
                {step}
              </span>
            ))}
          </div>
          <p className="mt-6 text-text-muted max-w-2xl mx-auto">
            Death is not ending but transformation. Destruction enables creation. Every ending
            enriches the next beginning.
          </p>
        </motion.div>

        {/* Five Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-display font-bold text-center mb-8">The Five Elements</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ELEMENTS.map((element, i) => (
              <motion.div
                key={element.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="p-6 rounded-2xl glass text-center hover:border-white/20 transition-all group"
              >
                {(() => {
                  const Icon = element.icon;
                  return (
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className={`w-8 h-8 text-${element.color}`} />
                    </div>
                  );
                })()}
                <h4 className="font-display font-semibold mb-1">{element.name}</h4>
                <p className="text-xs text-text-muted">{element.domain}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
