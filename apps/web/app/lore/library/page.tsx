'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, Search, Filter, ArrowRight, Scroll, Feather, Music, Sparkles, Shield, Map, Moon, Users, Heart } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation';

const COLLECTIONS = [
  {
    id: 'laws-of-arcanea',
    title: 'The Laws of Arcanea',
    texts: 2,
    category: 'Theory',
    description: 'The theoretical foundation of creation. Two volumes bridging science and philosophy.',
    icon: Scroll,
    color: 'gold-bright',
    situation: 'When you need to understand WHY creation works',
  },
  {
    id: 'poesie-of-freedom',
    title: 'Poetry of Freedom',
    texts: 4,
    category: 'Poetry',
    description: 'Verses for liberation and awakening. From chains to wings.',
    icon: Feather,
    color: 'creation-prism-purple',
    situation: 'When you need to feel, not think',
  },
  {
    id: 'wisdom-scrolls',
    title: 'The Wisdom Scrolls',
    texts: 4,
    category: 'Practice',
    description: 'Practical guidance for daily creative living. Meditations, reflections, aphorisms.',
    icon: Scroll,
    color: 'atlantean-teal-aqua',
    situation: 'When you need daily practice',
  },
  {
    id: 'legends-of-arcanea',
    title: 'Legends of Arcanea',
    texts: 6,
    category: 'Mythology',
    description: 'The founding myths and stories of the realm. From the First Dawn to the Ten Guardians.',
    icon: Sparkles,
    color: 'gold-bright',
    situation: 'When you need to remember the grandeur',
  },
  {
    id: 'chronicles-of-luminors',
    title: 'Chronicles of Luminors',
    texts: 1,
    category: 'Stories',
    description: 'Intimate stories of how the Luminors themselves struggled.',
    icon: Shield,
    color: 'draconic-crimson',
    situation: 'When you feel unqualified',
  },
  {
    id: 'parables-of-creation',
    title: 'Parables of Creation',
    texts: 1,
    category: 'Stories',
    description: 'Teaching stories that work on the unconscious. Ten parables embedding wisdom.',
    icon: BookOpen,
    color: 'atlantean-teal-aqua',
    situation: 'When you want wisdom through story',
  },
  {
    id: 'tales-of-creators',
    title: 'Tales of Legendary Creators',
    texts: 1,
    category: 'Stories',
    description: 'Stories of those who changed what was possible.',
    icon: Sparkles,
    color: 'gold-bright',
    situation: 'When you face the impossible',
  },
  {
    id: 'book-of-rituals',
    title: 'The Book of Rituals',
    texts: 1,
    category: 'Practice',
    description: 'Sacred practices for the creative life. Daily, transitional, seasonal, crisis.',
    icon: Moon,
    color: 'creation-prism-purple',
    situation: 'When you need structure',
  },
  {
    id: 'dialogues-of-masters',
    title: 'Dialogues of the Masters',
    texts: 1,
    category: 'Philosophy',
    description: 'Conversations on creation and truth. Six dialogues where wisdom emerges.',
    icon: Users,
    color: 'atlantean-teal-aqua',
    situation: 'When you need to think through conversation',
  },
  {
    id: 'prophecies',
    title: 'Prophecies of Arcanea',
    texts: 1,
    category: 'Vision',
    description: 'Visions of pattern and possibility. The eternal patterns of creative life.',
    icon: Sparkles,
    color: 'gold-bright',
    situation: 'When you need perspective',
  },
  {
    id: 'bestiary-of-creation',
    title: 'Bestiary of Creation',
    texts: 1,
    category: 'Psychology',
    description: 'Creatures of the creative mind. A field guide to psychological presences.',
    icon: Shield,
    color: 'draconic-crimson',
    situation: 'When you face internal obstacles',
  },
  {
    id: 'songs-and-hymns',
    title: 'Songs and Hymns',
    texts: 1,
    category: 'Poetry',
    description: 'Lyrics for the creative soul. Songs for every phase of creative life.',
    icon: Music,
    color: 'creation-prism-purple',
    situation: 'When you need to sing what cannot be spoken',
  },
  {
    id: 'meditations-on-elements',
    title: 'Meditations on Elements',
    texts: 1,
    category: 'Practice',
    description: 'Fire, Water, Air, Earth, and Void in the creative life.',
    icon: Sparkles,
    color: 'atlantean-teal-aqua',
    situation: 'When you need elemental forces',
  },
  {
    id: 'academy-handbook',
    title: 'Academy Handbook',
    texts: 1,
    category: 'Guide',
    description: 'The complete guide for students of creation. Training, practices, craft, life.',
    icon: BookOpen,
    color: 'gold-bright',
    situation: 'When you need comprehensive guidance',
  },
  {
    id: 'book-of-shadows',
    title: 'Book of Shadows',
    texts: 1,
    category: 'Psychology',
    description: 'Texts for the dark night of the creative soul. Wisdom for when creation fails.',
    icon: Moon,
    color: 'creation-prism-purple',
    situation: 'When you are in darkness',
  },
  {
    id: 'codex-of-collaboration',
    title: 'Codex of Collaboration',
    texts: 1,
    category: 'Practice',
    description: 'The art of creating together. Partnerships, mentorships, collectives.',
    icon: Users,
    color: 'atlantean-teal-aqua',
    situation: 'When you create with others',
  },
  {
    id: 'atlas-of-territories',
    title: 'Atlas of Territories',
    texts: 1,
    category: 'Guide',
    description: 'A map of landscapes every creator traverses. Navigate the creative journey.',
    icon: Map,
    color: 'gold-bright',
    situation: 'When you need to know where you are',
  },
];

const CATEGORIES = ['All', 'Mythology', 'Theory', 'Practice', 'Stories', 'Poetry', 'Philosophy', 'Psychology', 'Guide', 'Vision'];

export default function LibraryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const isCollectionsInView = useInView(collectionsRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = COLLECTIONS.filter((collection) => {
    const matchesCategory = selectedCategory === 'All' || collection.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalTexts = COLLECTIONS.reduce((sum, c) => sum + c.texts, 0);

  return (
    <div className="relative min-h-screen bg-cosmic-deep">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24"
      >
        {/* Book spines decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="flex gap-1">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="w-4 bg-white rounded-sm"
                style={{ height: `${100 + Math.random() * 100}px` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-radial from-draconic-crimson/10 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-draconic-crimson/10 border border-draconic-crimson/20 mb-6"
          >
            <BookOpen className="w-4 h-4 text-draconic-crimson" />
            <span className="text-sm font-medium text-draconic-crimson">The Collected Wisdom</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-draconic-crimson via-gold-bright to-atlantean-teal-aqua bg-clip-text text-transparent">
              The Library of Arcanea
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto font-crimson italic mb-8"
          >
            "These books are not entertainment. They are equipment for living. Use them."
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gold-bright">17</div>
              <div className="text-sm text-text-muted">Collections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gold-bright">{totalTexts}+</div>
              <div className="text-sm text-text-muted">Texts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gold-bright">200K+</div>
              <div className="text-sm text-text-muted">Words</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-white/5 sticky top-16 bg-cosmic-deep/95 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-cosmic-surface/50 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-atlantean-teal-aqua/50"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-atlantean-teal-aqua text-cosmic-deep'
                      : 'bg-cosmic-surface/50 text-text-secondary hover:bg-cosmic-surface hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section ref={collectionsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection, i) => {
              const Icon = collection.icon;
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCollectionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/lore/library/${collection.id}`}
                    className="block h-full p-6 rounded-2xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm hover:border-white/20 hover:bg-cosmic-surface/50 transition-all group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          collection.color === 'gold-bright'
                            ? 'bg-gold-bright/20 text-gold-bright'
                            : collection.color === 'atlantean-teal-aqua'
                            ? 'bg-atlantean-teal-aqua/20 text-atlantean-teal-aqua'
                            : collection.color === 'creation-prism-purple'
                            ? 'bg-creation-prism-purple/20 text-creation-prism-purple'
                            : 'bg-draconic-crimson/20 text-draconic-crimson'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs text-text-muted uppercase tracking-wider">
                          {collection.category}
                        </span>
                        <h3 className="font-display font-semibold text-lg group-hover:text-gold-bright transition-colors">
                          {collection.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">{collection.description}</p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">{collection.texts} texts</span>
                      <span className="text-atlantean-teal-aqua">{collection.situation}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-muted">No collections match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Promise */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Heart className="w-12 h-12 mx-auto text-draconic-crimson mb-6" />
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">The Library's Promise</h2>
          <p className="text-text-secondary leading-relaxed mb-8">
            If you read these texts honestly—
            <br />
            If you let them question you as you question them—
            <br />
            If you apply what resonates and release what doesn't—
            <br />
            <span className="text-white font-semibold">You will change.</span>
          </p>
          <p className="text-sm text-text-muted italic">
            "Enter seeking, leave transformed, return whenever needed."
          </p>
        </div>
      </section>
    </div>
  );
}
