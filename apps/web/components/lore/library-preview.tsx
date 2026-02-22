'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ArrowRight, Scroll, Feather, Music } from 'lucide-react';
import Link from 'next/link';

const FEATURED_COLLECTIONS = [
  {
    title: 'Legends of Arcanea',
    texts: 5,
    description: 'The founding myths — from the First Dawn to the Ten Guardians',
    icon: Scroll,
    color: 'brand-gold',
    href: '/lore/library/legends-of-arcanea',
  },
  {
    title: 'The Wisdom Scrolls',
    texts: 4,
    description: 'Daily practices — morning meditations to evening reflections',
    icon: Feather,
    color: 'crystal',
    href: '/lore/library/wisdom-scrolls',
  },
  {
    title: 'Poetry of Freedom',
    texts: 4,
    description: 'Verses for liberation — from chains to wings',
    icon: Music,
    color: 'brand-primary',
    href: '/lore/library/poesie-of-freedom',
  },
  {
    title: 'Academy Handbook',
    texts: 1,
    description: 'The complete guide for students of creation',
    icon: BookOpen,
    color: 'fire',
    href: '/lore/library/academy-handbook',
  },
];

const ALL_COLLECTIONS = [
  'Laws of Arcanea',
  'Poetry of Freedom',
  'Wisdom Scrolls',
  'Legends of Arcanea',
  'Chronicles of Luminors',
  'Parables of Creation',
  'Tales of Creators',
  'Book of Rituals',
  'Dialogues of Masters',
  'Prophecies',
  'Bestiary of Creation',
  'Songs and Hymns',
  'Meditations on Elements',
  'Academy Handbook',
  'Book of Shadows',
  'Codex of Collaboration',
  'Atlas of Territories',
];

export function LibraryPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-radial from-brand-gold/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/20 mb-6">
            <BookOpen className="w-4 h-4 text-fire" />
            <span className="text-sm font-medium text-fire">The Library</span>
          </div>
          <h2 className="text-fluid-3xl md:text-fluid-4xl lg:text-6xl font-display font-bold mb-6">
            17 Collections of Wisdom
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body italic">
            "These books are not entertainment. They are equipment for living. Use them."
          </p>
        </motion.div>

        {/* Featured Collections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURED_COLLECTIONS.map((collection, i) => {
            const Icon = collection.icon;
            return (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={collection.href}
                  className="block h-full p-6 rounded-2xl glass hover:border-white/20 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      collection.color === 'brand-gold'
                        ? 'bg-brand-gold/20 text-brand-gold'
                        : collection.color === 'crystal'
                        ? 'bg-crystal/20 text-crystal'
                        : collection.color === 'brand-primary'
                        ? 'bg-brand-primary/20 text-brand-primary'
                        : 'bg-fire/20 text-fire'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-brand-gold transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">{collection.description}</p>
                  <p className="text-xs text-text-muted">{collection.texts} texts</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All Collections List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-lg font-display font-semibold text-center mb-6 text-text-muted">
            All 17 Collections
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {ALL_COLLECTIONS.map((name, i) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full glass text-sm text-text-secondary hover:border-white/20 hover:text-white transition-all cursor-pointer"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
        >
          {[
            { value: '17', label: 'Collections' },
            { value: '34+', label: 'Major Texts' },
            { value: '200K+', label: 'Words of Wisdom' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-brand-gold">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/lore/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fire/10 border border-fire/30 text-fire font-semibold hover:bg-fire hover:text-white transition-all"
          >
            Enter the Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
