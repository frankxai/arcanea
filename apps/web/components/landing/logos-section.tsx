'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Logo components as SVGs for crisp rendering
const LOGOS = [
  {
    name: 'TechCrunch',
    svg: (
      <svg viewBox="0 0 200 30" className="h-6 w-auto fill-current">
        <text x="0" y="24" className="font-bold text-2xl">TechCrunch</text>
      </svg>
    ),
  },
  {
    name: 'Forbes',
    svg: (
      <svg viewBox="0 0 120 30" className="h-7 w-auto fill-current">
        <text x="0" y="24" className="font-serif font-bold text-2xl italic">Forbes</text>
      </svg>
    ),
  },
  {
    name: 'Wired',
    svg: (
      <svg viewBox="0 0 100 30" className="h-6 w-auto fill-current">
        <text x="0" y="24" className="font-bold text-2xl uppercase tracking-widest">WIRED</text>
      </svg>
    ),
  },
  {
    name: 'The Verge',
    svg: (
      <svg viewBox="0 0 140 30" className="h-6 w-auto fill-current">
        <text x="0" y="24" className="font-bold text-2xl">The Verge</text>
      </svg>
    ),
  },
  {
    name: 'Fast Company',
    svg: (
      <svg viewBox="0 0 170 30" className="h-6 w-auto fill-current">
        <text x="0" y="24" className="font-bold text-2xl">Fast Company</text>
      </svg>
    ),
  },
  {
    name: 'Product Hunt',
    svg: (
      <svg viewBox="0 0 180 30" className="h-6 w-auto fill-current">
        <text x="0" y="24" className="font-bold text-2xl">Product Hunt</text>
      </svg>
    ),
  },
];

export function LogosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-16 overflow-hidden glass-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center font-sans text-fluid-sm text-text-muted uppercase tracking-widest mb-10"
        >
          As seen in leading publications
        </motion.p>

        {/* Animated logo strip */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cosmic-void to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cosmic-void to-transparent z-10" />

          {/* Scrolling logos */}
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <motion.div
                key={`${logo.name}-${i}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.1 * (i % LOGOS.length) }}
                whileHover={{ opacity: 0.9 }}
                className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors duration-smooth cursor-default"
              >
                {logo.svg}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
