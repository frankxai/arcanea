'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Flame,
  Eye,
  ScrollText,
  Skull,
  Shield,
  ArrowRight,
  Compass,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const EXPLORATIONS = [
  {
    href: '/lore/guardians',
    title: 'The Ten Guardians',
    description: 'Gods and Goddesses who guard the Gates of creation',
    icon: Shield,
    gradient: 'from-crystal/20 to-brand-primary/10',
    accentColor: 'text-crystal',
    borderColor: 'border-crystal/20 hover:border-crystal/40',
  },
  {
    href: '/lore/godbeasts',
    title: 'The Godbeasts',
    description: 'Primal divine creatures bonded to each Guardian',
    icon: Eye,
    gradient: 'from-brand-gold/20 to-amber-500/10',
    accentColor: 'text-brand-gold',
    borderColor: 'border-brand-gold/20 hover:border-brand-gold/40',
  },
  {
    href: '/lore/elements',
    title: 'Five Elements',
    description: 'Fire, Water, Earth, Wind, and the Void/Spirit duality',
    icon: Flame,
    gradient: 'from-fire/20 to-orange-500/10',
    accentColor: 'text-fire',
    borderColor: 'border-fire/20 hover:border-fire/40',
  },
  {
    href: '/lore/wisdoms',
    title: 'Seven Wisdoms',
    description: 'Sacred teachings that guide the creative path',
    icon: ScrollText,
    gradient: 'from-brand-primary/20 to-purple-500/10',
    accentColor: 'text-brand-primary',
    borderColor: 'border-brand-primary/20 hover:border-brand-primary/40',
  },
  {
    href: '/lore/malachar',
    title: 'Malachar',
    description: 'The Dark Lord sealed in the Shadowfen — a cautionary tale',
    icon: Skull,
    gradient: 'from-red-500/20 to-purple-900/10',
    accentColor: 'text-red-400',
    borderColor: 'border-red-400/20 hover:border-red-400/40',
  },
];

export function LoreExploreGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Compass className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">
              Explore the Universe
            </span>
          </div>
          <h2 className="text-fluid-3xl md:text-fluid-4xl font-display font-bold mb-4">
            Deeper into Arcanea
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-body">
            Every corner of this universe holds wisdom. Choose a path and discover
            the forces that shape all creation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPLORATIONS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group block p-6 rounded-2xl liquid-glass border transition-all duration-300',
                    'hover-lift',
                    item.borderColor
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                      item.gradient
                    )}
                  >
                    <Icon className={cn('w-6 h-6', item.accentColor)} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-crystal transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 text-sm font-medium',
                      item.accentColor
                    )}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
