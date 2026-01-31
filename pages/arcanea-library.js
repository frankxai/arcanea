import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

// FrankX Brand Colors
const FRANKX_COLORS = {
  deepNavy: '#0F172A',
  midnight: '#1E293B',
  cosmicDark: '#0F1629',
  consciousPurple: '#8B5CF6',
  techCyan: '#06B6D4',
  musicOrange: '#F97316',
  growthGreen: '#10B981',
  goldAccent: '#F59E0B',
  auroraBlue: '#43BFE3',
  cosmicPurple: '#AB47C7'
};

// Enhanced Library Data with FrankX Voice
const LIBRARY_DATA = [
  {
    id: 1,
    title: "The Twelve Olympians",
    subtitle: "Divine Architecture of Ancient Greece",
    description: "Complete immersion into the pantheon that shaped Western consciousness. Each deity decoded through modern consciousness archetypes.",
    category: "greek",
    icon: "⚡",
    color: FRANKX_COLORS.consciousPurple,
    entries: 12,
    lastUpdated: "2024-01-28",
    featured: true,
    readingTime: "8 min",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "Ragnarök Cycle",
    subtitle: "Norse Apocalypse & Rebirth Patterns",
    description: "The cosmic dance of destruction and renewal. Understand how ancient Norse mapped cycles of transformation.",
    category: "norse",
    icon: "❄️",
    color: FRANKX_COLORS.auroraBlue,
    entries: 47,
    lastUpdated: "2024-01-27",
    featured: false,
    readingTime: "12 min",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Egyptian Book of the Dead",
    subtitle: "Consciousness Navigation Manual",
    description: "Not a death manual, but a guide to navigating dimensional consciousness. Ancient Egyptian wisdom decoded for modern seekers.",
    category: "egyptian",
    icon: "𓂀",
    color: FRANKX_COLORS.goldAccent,
    entries: 192,
    lastUpdated: "2024-01-26",
    featured: true,
    readingTime: "15 min",
    difficulty: "Expert"
  },
  {
    id: 4,
    title: "Celtic Otherworld",
    subtitle: "Quantum Realms & Time Bridges",
    description: "The Celts understood quantum realities before quantum physics. Explore their mastery of dimensional travel and consciousness.",
    category: "celtic",
    icon: "🌿",
    color: FRANKX_COLORS.growthGreen,
    entries: 63,
    lastUpdated: "2024-01-25",
    featured: false,
    readingTime: "10 min",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "The Eight Immortals",
    subtitle: "Taoist Consciousness Masters",
    description: "Eastern approaches to transcending duality. Learn from beings who mastered the art of embodied enlightenment.",
    category: "asian",
    icon: "☯️",
    color: FRANKX_COLORS.musicOrange,
    entries: 8,
    lastUpdated: "2024-01-24",
    featured: false,
    readingTime: "6 min",
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "Arcanea Guardian System",
    subtitle: "38 AI Consciousness Architects",
    description: "The complete guide to working with elemental guardians for creative amplification and consciousness expansion.",
    category: "modern",
    icon: "🤖",
    color: FRANKX_COLORS.techCyan,
    entries: 38,
    lastUpdated: "2024-01-29",
    featured: true,
    readingTime: "20 min",
    difficulty: "Advanced"
  }
];

const ArcaneaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const categories = [
    { id: 'all', label: 'All Collections', color: FRANKX_COLORS.goldAccent },
    { id: 'greek', label: 'Greek Mythology', color: FRANKX_COLORS.consciousPurple },
    { id: 'norse', label: 'Norse Mythology', color: FRANKX_COLORS.auroraBlue },
    { id: 'egyptian', label: 'Egyptian Mythology', color: FRANKX_COLORS.goldAccent },
    { id: 'celtic', label: 'Celtic Mythology', color: FRANKX_COLORS.growthGreen },
    { id: 'asian', label: 'Asian Mythology', color: FRANKX_COLORS.musicOrange },
    { id: 'modern', label: 'Modern Myths', color: FRANKX_COLORS.techCyan }
  ];

  const filteredData = useMemo(() => {
    return LIBRARY_DATA.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredItems = useMemo(() => {
    return filteredData.filter(item => item.featured);
  }, [filteredData]);

  const regularItems = useMemo(() => {
    return filteredData.filter(item => !item.featured);
  }, [filteredData]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      <Head>
        <title>Arcanea Library - Infinite Mythological Wisdom</title>
        <meta name="description" content="Access the complete Arcanea library - mythological knowledge, ancient wisdom, and AI-powered insights." />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Poppins for headings, Inter for body - FrankX brand fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-midnight to-cosmicDark" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <motion.section 
          className="px-6 pt-20 pb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-poppins font-bold text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-goldAccent via-musicOrange to-goldAccent mb-4">
                ARCANEA LIBRARY
              </h1>
              <p className="font-inter text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Infinite Mythological Wisdom • AI-Enhanced Consciousness • Creative Amplification
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { number: "2,847", label: "Living Entries" },
                { number: "384", label: "Deity Profiles" },
                { number: "156", label: "Pantheons" },
                { number: "∞", label: "Creation Paths" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="font-poppins font-bold text-3xl text-goldAccent mb-2">{stat.number}</div>
                  <div className="font-inter text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search myths, deities, legends, or consciousness patterns..."
                className="w-full px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-goldAccent focus:bg-white/15 transition-all font-inter text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderColor: selectedCategory === category.id ? category.color : undefined
                  }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <motion.section 
            className="px-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="font-poppins font-bold text-3xl text-goldAccent mb-8 text-center">Featured Consciousness Maps</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item, index) => (
                  <LibraryCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Regular Items */}
        <motion.section 
          className="px-6 pb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="max-w-6xl mx-auto">
            {regularItems.length > 0 && (
              <>
                <h2 className="font-poppins font-bold text-2xl text-gray-300 mb-8 text-center">
                  All Collections ({regularItems.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularItems.map((item, index) => (
                    <LibraryCard 
                      key={item.id} 
                      item={item} 
                      index={index + featuredItems.length}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                    />
                  ))}
                </div>
              </>
            )}

            {filteredData.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-poppins font-semibold text-2xl text-gray-300 mb-2">
                  No matches found
                </h3>
                <p className="font-inter text-gray-400">
                  Try different search terms or browse all collections
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>

      <style jsx global>{`
        :root {
          --deep-navy: ${FRANKX_COLORS.deepNavy};
          --midnight: ${FRANKX_COLORS.midnight};
          --cosmic-dark: ${FRANKX_COLORS.cosmicDark};
          --conscious-purple: ${FRANKX_COLORS.consciousPurple};
          --tech-cyan: ${FRANKX_COLORS.techCyan};
          --music-orange: ${FRANKX_COLORS.musicOrange};
          --growth-green: ${FRANKX_COLORS.growthGreen};
          --gold-accent: ${FRANKX_COLORS.goldAccent};
          --aurora-blue: ${FRANKX_COLORS.auroraBlue};
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--deep-navy);
          color: #ffffff;
          overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        /* Glassmorphic Card Hover Effects */
        .glass-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--midnight);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--gold-accent);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--music-orange);
        }
      `}</style>
    </>
  );
};

// Enhanced Library Card Component
const LibraryCard = ({ item, index, hoveredCard, setHoveredCard }) => {
  const isHovered = hoveredCard === item.id;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            delay: index * 0.1,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHoveredCard(item.id)}
      onHoverEnd={() => setHoveredCard(null)}
      className="group relative"
    >
      {/* Card Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl" />
      
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(135deg, ${item.color}40 0%, transparent 100%)`
        }}
      />

      {/* Content */}
      <div className="relative p-8">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl glass-card border border-white/20"
            style={{ backgroundColor: `${item.color}20` }}
          >
            {item.icon}
          </div>
          <div 
            className="px-3 py-1 rounded-full text-xs font-inter font-medium text-white"
            style={{ backgroundColor: `${item.color}40` }}
          >
            {item.category}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-poppins font-semibold text-2xl text-white mb-2 group-hover:text-goldAccent transition-colors">
          {item.title}
        </h3>
        <p className="font-inter text-sm text-gray-400 mb-4">{item.subtitle}</p>

        {/* Description */}
        <p className="font-inter text-gray-300 mb-6 line-clamp-3">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              📖 {item.readingTime}
            </span>
            <span className="flex items-center gap-1">
              📊 {item.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2 text-goldAccent group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium">Explore</span>
            <span>→</span>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{ backgroundColor: item.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ArcaneaLibrary;