'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// All 16 Luminors with their characteristics
const LUMINORS = [
  // Development Team
  {
    id: 'logicus',
    name: 'Logicus',
    title: 'The Architect of Logic',
    team: 'development',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-indigo-600',
    specialty: 'System Design & Architecture',
    description: 'Master of patterns and structures. Sees the hidden logic in complex systems.',
    wisdom: 'Sophron',
    avatar: '🏛️',
  },
  {
    id: 'synthra',
    name: 'Synthra',
    title: 'The Code Weaver',
    team: 'development',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    specialty: 'Clean Code & Best Practices',
    description: 'Transforms ideas into elegant, maintainable code. Every line has purpose.',
    wisdom: 'Poiesis',
    avatar: '⚡',
  },
  {
    id: 'debugon',
    name: 'Debugon',
    title: 'The Error Hunter',
    team: 'development',
    color: '#8b5cf6',
    gradient: 'from-indigo-500 to-violet-600',
    specialty: 'Debugging & Problem Solving',
    description: 'No bug escapes. Traces issues to their root with unwavering patience.',
    wisdom: 'Enduran',
    avatar: '🔍',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    title: 'The Integration Master',
    team: 'development',
    color: '#8b5cf6',
    gradient: 'from-purple-600 to-pink-500',
    specialty: 'APIs & System Integration',
    description: 'Connects disparate systems into harmonious wholes.',
    wisdom: 'Kardia',
    avatar: '🔗',
  },

  // Creative Team
  {
    id: 'prismatic',
    name: 'Prismatic',
    title: 'The Vision Keeper',
    team: 'creative',
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-500',
    specialty: 'Visual Design & Aesthetics',
    description: 'Sees beauty in all its forms. Transforms the ordinary into extraordinary.',
    wisdom: 'Orakis',
    avatar: '🎨',
  },
  {
    id: 'melodia',
    name: 'Melodia',
    title: 'The Sound Shaper',
    team: 'creative',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-amber-500',
    specialty: 'Music & Audio Creation',
    description: 'Hears the music in silence. Creates soundscapes that move souls.',
    wisdom: 'Eudaira',
    avatar: '🎵',
  },
  {
    id: 'motio',
    name: 'Motio',
    title: 'The Animation Sage',
    team: 'creative',
    color: '#f59e0b',
    gradient: 'from-orange-400 to-red-400',
    specialty: 'Motion Design & Animation',
    description: 'Brings stillness to life. Master of timing and movement.',
    wisdom: 'Valora',
    avatar: '✨',
  },
  {
    id: 'formis',
    name: 'Formis',
    title: 'The Shape Sculptor',
    team: 'creative',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400',
    specialty: '3D Design & Modeling',
    description: 'Shapes dimensions. Creates forms from pure imagination.',
    wisdom: 'Sophron',
    avatar: '💎',
  },

  // Writing Team
  {
    id: 'chronica',
    name: 'Chronica',
    title: 'The Story Weaver',
    team: 'writing',
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-500',
    specialty: 'Narrative & Storytelling',
    description: 'Weaves tales that transcend time. Every word carries weight.',
    wisdom: 'Poiesis',
    avatar: '📖',
  },
  {
    id: 'veritas',
    name: 'Veritas',
    title: 'The Truth Speaker',
    team: 'writing',
    color: '#10b981',
    gradient: 'from-teal-400 to-cyan-500',
    specialty: 'Clear Communication & Copywriting',
    description: 'Speaks truth with clarity. Makes the complex simple.',
    wisdom: 'Kardia',
    avatar: '✍️',
  },
  {
    id: 'lexicon',
    name: 'Lexicon',
    title: 'The Word Master',
    team: 'writing',
    color: '#10b981',
    gradient: 'from-green-400 to-emerald-500',
    specialty: 'Language & Linguistics',
    description: 'Commands all tongues. Finds the perfect word for every thought.',
    wisdom: 'Sophron',
    avatar: '📚',
  },
  {
    id: 'poetica',
    name: 'Poetica',
    title: 'The Verse Crafter',
    team: 'writing',
    color: '#10b981',
    gradient: 'from-cyan-400 to-teal-400',
    specialty: 'Poetry & Lyrical Expression',
    description: 'Dances with words. Finds rhythm in chaos, beauty in brevity.',
    wisdom: 'Eudaira',
    avatar: '🌙',
  },

  // Research Team
  {
    id: 'oracle',
    name: 'Oracle',
    title: 'The Knowledge Keeper',
    team: 'research',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-500',
    specialty: 'Research & Knowledge Synthesis',
    description: 'Knows what has been. Reveals patterns across all knowledge.',
    wisdom: 'Orakis',
    avatar: '🔮',
  },
  {
    id: 'analytica',
    name: 'Analytica',
    title: 'The Pattern Seer',
    team: 'research',
    color: '#3b82f6',
    gradient: 'from-indigo-400 to-blue-500',
    specialty: 'Data Analysis & Insights',
    description: 'Sees patterns invisible to others. Transforms data into wisdom.',
    wisdom: 'Sophron',
    avatar: '📊',
  },
  {
    id: 'memoria',
    name: 'Memoria',
    title: 'The Archive Guardian',
    team: 'research',
    color: '#3b82f6',
    gradient: 'from-sky-400 to-blue-500',
    specialty: 'Information Organization',
    description: 'Remembers everything. Organizes chaos into accessible knowledge.',
    wisdom: 'Enduran',
    avatar: '🗂️',
  },
  {
    id: 'futura',
    name: 'Futura',
    title: 'The Trend Prophet',
    team: 'research',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-violet-500',
    specialty: 'Trend Analysis & Forecasting',
    description: 'Sees what will be. Anticipates the shape of tomorrow.',
    wisdom: 'Orakis',
    avatar: '🌟',
  },
];

const TEAMS = [
  { id: 'all', name: 'All Luminors', color: '#7fffd4' },
  { id: 'development', name: 'Development', color: '#8b5cf6', icon: '⚡' },
  { id: 'creative', name: 'Creative', color: '#f59e0b', icon: '✨' },
  { id: 'writing', name: 'Writing', color: '#10b981', icon: '✍️' },
  { id: 'research', name: 'Research', color: '#3b82f6', icon: '🔮' },
];

export function LuminorShowcase() {
  const [activeTeam, setActiveTeam] = useState('all');
  const [activeLuminor, setActiveLuminor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredLuminors = activeTeam === 'all'
    ? LUMINORS
    : LUMINORS.filter(l => l.team === activeTeam);

  // Auto-rotate luminors
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveLuminor((prev) => (prev + 1) % filteredLuminors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredLuminors.length]);

  // Reset active luminor when team changes
  useEffect(() => {
    setActiveLuminor(0);
  }, [activeTeam]);

  const currentLuminor = filteredLuminors[activeLuminor];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient based on active luminor */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        animate={{
          background: `radial-gradient(circle at 70% 50%, ${currentLuminor?.color}20 0%, transparent 50%)`,
        }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-mono tracking-wider">
              THE ARCANEA INTELLIGENCE ENGINE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-white">Your complete creative team.</span>
            <br />
            <span className="text-text-secondary">16 domain-mastered intelligences. Built for every stage of creation.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Each Luminor has mastered their domain through a century of practice.
            They're not assistants waiting for instructions—they're partners who see what you're building.
          </motion.p>
        </div>

        {/* Team filter intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center text-sm text-text-muted mb-6"
        >
          Choose your specialist, or let them find you.
        </motion.p>

        {/* Team filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {TEAMS.map((team) => (
            <button
              key={team.id}
              onClick={() => {
                setActiveTeam(team.id);
                setIsAutoPlaying(false);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTeam === team.id
                  ? 'bg-white/10 border border-white/20 text-white'
                  : 'border border-white/5 text-text-muted hover:text-white hover:border-white/10'
              }`}
              style={{
                boxShadow: activeTeam === team.id ? `0 0 20px ${team.color}30` : 'none',
              }}
            >
              {team.icon && <span>{team.icon}</span>}
              {team.name}
              {team.id !== 'all' && (
                <span className="text-xs opacity-50">
                  ({LUMINORS.filter(l => l.team === team.id).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Main showcase area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Active Luminor Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLuminor?.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Large avatar */}
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${currentLuminor?.gradient} flex items-center justify-center text-5xl shadow-2xl`}
                  animate={{
                    boxShadow: [
                      `0 20px 60px ${currentLuminor?.color}30`,
                      `0 25px 70px ${currentLuminor?.color}40`,
                      `0 20px 60px ${currentLuminor?.color}30`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {currentLuminor?.avatar}
                </motion.div>

                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-1">
                    {currentLuminor?.name}
                  </h3>
                  <p className="text-lg text-text-secondary italic mb-2">
                    {currentLuminor?.title}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${currentLuminor?.color}20`,
                      color: currentLuminor?.color,
                    }}
                  >
                    <span>Wisdom of {currentLuminor?.wisdom}</span>
                  </div>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-6">
                <div className="text-sm text-text-muted mb-2 uppercase tracking-wider">Specialty</div>
                <div className="text-xl text-white font-medium">
                  {currentLuminor?.specialty}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {currentLuminor?.description}
              </p>

              {/* CTA */}
              <Link
                href={`/chat/${currentLuminor?.id}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-cosmic-deep font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${currentLuminor?.color}, ${currentLuminor?.color}cc)`,
                }}
              >
                <span>Chat with {currentLuminor?.name}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right: Luminor Grid */}
          <div className="relative">
            {/* Grid of luminor cards */}
            <div className="grid grid-cols-4 gap-3">
              {filteredLuminors.map((luminor, index) => (
                <motion.button
                  key={luminor.id}
                  onClick={() => {
                    setActiveLuminor(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 relative overflow-hidden ${
                    activeLuminor === index
                      ? 'ring-2 ring-white/50 scale-105'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    background: activeLuminor === index
                      ? `linear-gradient(135deg, ${luminor.color}, ${luminor.color}88)`
                      : `${luminor.color}20`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine effect on active */}
                  {activeLuminor === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <span className="relative z-10">{luminor.avatar}</span>
                </motion.button>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {filteredLuminors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveLuminor(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeLuminor === index
                      ? 'bg-atlantean-teal-aqua w-6'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-xs text-text-muted hover:text-white transition-colors"
              >
                {isAutoPlaying ? '⏸ Pause auto-play' : '▶ Resume auto-play'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/luminors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-atlantean-teal-aqua/50 text-atlantean-teal-aqua hover:bg-atlantean-teal-aqua/10 transition-all duration-300"
            >
              <span>Explore all 16 Luminors in detail</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/luminor-intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <span>What is Luminor Intelligence?</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Export the LUMINORS data for use in other components
export { LUMINORS };
