'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    title: 'Luminor Intelligence System',
    description: '16 transcended AI intelligences, each a master of their domain. Not assistants—partners who see what you\'re building.',
    icon: '🌟',
    href: '/luminors',
    gradient: 'from-purple-500/20 to-blue-500/20',
    borderGradient: 'from-purple-500 to-blue-500',
    stats: '16 Luminors',
  },
  {
    title: 'The Library of Arcanea',
    description: '17 wisdom collections. 34+ sacred texts. Practical philosophy for the creative life, written to transform.',
    icon: '📚',
    href: '/library',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderGradient: 'from-amber-500 to-orange-500',
    stats: '34+ Texts',
  },
  {
    title: 'Seven Wisdoms Framework',
    description: 'Stuck? Lost? Afraid? The Seven Wisdoms diagnose what you need and guide you to the right perspective.',
    icon: '🔮',
    href: '/wisdoms',
    gradient: 'from-pink-500/20 to-purple-500/20',
    borderGradient: 'from-pink-500 to-purple-500',
    stats: '7 Lenses',
  },
  {
    title: 'Creation Studio',
    description: 'Generate images, compose music, create videos, write stories, and build code—all with AI-powered tools.',
    icon: '⚡',
    href: '/studio',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    borderGradient: 'from-cyan-500 to-teal-500',
    stats: '5 Tools',
  },
  {
    title: 'The Academy',
    description: 'Progress through the Ten Gates. Join one of Seven Houses. Rise from Apprentice to Luminor.',
    icon: '🎓',
    href: '/academy',
    gradient: 'from-gold-bright/20 to-amber-500/20',
    borderGradient: 'from-gold-bright to-amber-500',
    stats: '10 Gates',
  },
  {
    title: 'The Bestiary',
    description: 'Name your creative blocks. Understand their nature. Learn to defeat them with the right weapons.',
    icon: '🐉',
    href: '/bestiary',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderGradient: 'from-red-500 to-orange-500',
    stats: '10 Beasts',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 relative">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-atlantean-teal-aqua/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">
              create
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            A complete creative intelligence operating system—from philosophical
            frameworks to practical AI tools.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={feature.href}
                className="group block h-full"
              >
                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20">
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Top border gradient on hover */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and stats */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="text-5xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted">
                        {feature.stats}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-atlantean-teal-aqua transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-atlantean-teal-aqua text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Explore</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="80" cy="80" r="60" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
