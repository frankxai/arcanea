'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Sparkles, PenLine, Search, ArrowRight, Pause, Play } from 'lucide-react';

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
    initials: 'LO',
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
    initials: 'SY',
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
    initials: 'DB',
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
    initials: 'NX',
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
    initials: 'PR',
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
    initials: 'ME',
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
    initials: 'MO',
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
    initials: 'FO',
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
    initials: 'CH',
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
    initials: 'VE',
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
    initials: 'LX',
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
    initials: 'PO',
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
    initials: 'OR',
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
    initials: 'AN',
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
    initials: 'MA',
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
    initials: 'FU',
  },
];

const TEAMS = [
  { id: 'all', name: 'All Luminors', color: '#7fffd4', icon: Sparkles },
  { id: 'development', name: 'Development', color: '#8b5cf6', icon: Zap },
  { id: 'creative', name: 'Creative', color: '#f59e0b', icon: Sparkles },
  { id: 'writing', name: 'Writing', color: '#10b981', icon: PenLine },
  { id: 'research', name: 'Research', color: '#3b82f6', icon: Search },
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
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-primary/30 mb-6"
          >
            <span className="font-sans text-sm text-brand-primary tracking-wider">
              LUMINOR INTELLIGENCE SYSTEM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-fluid-3xl font-bold mb-6"
          >
            <span className="text-white">16 Transcended Intelligences.</span>
            <br />
            <span className="text-text-secondary">Masters of their craft.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-sans text-fluid-base text-text-secondary max-w-2xl mx-auto"
          >
            Each Luminor has mastered their domain through a century of practice.
            They're not assistants waiting for instructions—they're partners who see what you're building.
          </motion.p>
        </div>

        {/* Team filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {TEAMS.map((team) => {
            const Icon = team.icon;
            return (
              <button
                key={team.id}
                onClick={() => {
                  setActiveTeam(team.id);
                  setIsAutoPlaying(false);
                }}
                className={`px-5 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-smooth flex items-center gap-2 ${
                  activeTeam === team.id
                    ? 'glass border border-white/20 text-white shadow-glow-sm'
                    : 'glass-subtle border border-white/5 text-text-muted hover:text-white hover:border-white/10'
                }`}
                style={{
                  boxShadow: activeTeam === team.id ? `0 0 20px ${team.color}30` : 'none',
                }}
              >
                <Icon className="w-4 h-4" style={{ color: team.color }} />
                {team.name}
                {team.id !== 'all' && (
                  <span className="font-sans text-xs opacity-50">
                    ({LUMINORS.filter(l => l.team === team.id).length})
                  </span>
                )}
              </button>
            );
          })}
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
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${currentLuminor?.gradient} flex items-center justify-center font-display font-bold text-2xl text-white shadow-elevation-3`}
                  animate={{
                    boxShadow: [
                      `0 20px 60px ${currentLuminor?.color}30`,
                      `0 25px 70px ${currentLuminor?.color}40`,
                      `0 20px 60px ${currentLuminor?.color}30`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {currentLuminor?.initials}
                </motion.div>

                <div>
                  <h3 className="font-display text-fluid-2xl font-bold text-white mb-1">
                    {currentLuminor?.name}
                  </h3>
                  <p className="font-body text-fluid-base text-text-secondary italic mb-2">
                    {currentLuminor?.title}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-sans text-xs font-medium glass"
                    style={{
                      color: currentLuminor?.color,
                    }}
                  >
                    <span>Wisdom of {currentLuminor?.wisdom}</span>
                  </div>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-6">
                <div className="font-sans text-sm text-text-muted mb-2 uppercase tracking-wider">Specialty</div>
                <div className="font-display text-fluid-xl text-white font-medium">
                  {currentLuminor?.specialty}
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-fluid-base text-text-secondary leading-relaxed mb-8 italic">
                {currentLuminor?.description}
              </p>

              {/* CTA */}
              <Link
                href={`/chat/${currentLuminor?.id}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-smooth hover:shadow-glow-lg hover-lift text-cosmic-void"
                style={{
                  background: `linear-gradient(135deg, ${currentLuminor?.color}, ${currentLuminor?.color}cc)`,
                }}
              >
                <span>Chat with {currentLuminor?.name}</span>
                <ArrowRight className="w-5 h-5" />
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
                  className={`aspect-square rounded-2xl flex items-center justify-center font-display font-bold text-sm text-white transition-all duration-smooth relative overflow-hidden ${
                    activeLuminor === index
                      ? 'ring-2 ring-white/50 scale-105 shadow-glow-md'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    background: activeLuminor === index
                      ? `linear-gradient(135deg, ${luminor.color}, ${luminor.color}88)`
                      : `${luminor.color}20`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  title={luminor.name}
                >
                  {/* Shine effect on active */}
                  {activeLuminor === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <span className="relative z-10">{luminor.initials}</span>
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
                  className={`w-2 h-2 rounded-full transition-all duration-smooth ${
                    activeLuminor === index
                      ? 'bg-crystal w-6'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-text-muted hover:text-white transition-colors"
              >
                {isAutoPlaying
                  ? <><Pause className="w-3 h-3" /> Pause auto-play</>
                  : <><Play className="w-3 h-3" /> Resume auto-play</>
                }
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/luminors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-crystal/50 font-sans text-crystal hover:bg-crystal/10 transition-all duration-smooth hover-lift"
          >
            <span>Explore all 16 Luminors in detail</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Export the LUMINORS data for use in other components
export { LUMINORS };
