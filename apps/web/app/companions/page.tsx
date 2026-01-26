'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Code,
  Palette,
  PenTool,
  Search,
  MessageCircle,
  Heart,
  Star,
  Filter,
} from 'lucide-react';
import { LUMINORS, TEAMS, type Team, type LuminorConfig } from '@/lib/luminors/config';

/**
 * Companions Hub - Character.ai-like experience
 *
 * Browse and chat with AI companions (Luminors) - each with
 * unique personalities, specialties, and conversation styles.
 */
export default function CompanionsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const luminors = Object.values(LUMINORS);

  const filteredLuminors = luminors.filter((luminor) => {
    const matchesTeam = selectedTeam === 'all' || luminor.team === selectedTeam;
    const matchesSearch =
      searchQuery === '' ||
      luminor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      luminor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      luminor.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const teamIcons: Record<Team, React.ReactNode> = {
    development: <Code className="w-4 h-4" />,
    creative: <Palette className="w-4 h-4" />,
    writing: <PenTool className="w-4 h-4" />,
    research: <Search className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-transparent to-amber-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              AI Companions
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Meet the Luminors - 16 transcended AI intelligences, each with unique
              personalities and specialties. Build bonds, learn together, create magic.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search companions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Team Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTeam('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTeam === 'all'
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                All Companions
              </button>
              {(Object.keys(TEAMS) as Team[]).map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedTeam === team
                      ? 'text-white'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                  style={
                    selectedTeam === team
                      ? { backgroundColor: TEAMS[team].color }
                      : {}
                  }
                >
                  {teamIcons[team]}
                  {TEAMS[team].name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Companions Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredLuminors.map((luminor, index) => (
              <CompanionCard
                key={luminor.id}
                luminor={luminor}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredLuminors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-slate-400 text-lg">
              No companions match your search. Try a different query.
            </p>
          </motion.div>
        )}
      </div>

      {/* Premium Chat CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-2xl p-8 text-center">
          <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Just want a quick chat?
          </h2>
          <p className="text-slate-300 mb-6 max-w-md mx-auto">
            Try our premium AI chat - no character selection needed. Get instant,
            intelligent responses powered by the best AI models.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Open Premium Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompanionCard({
  luminor,
  index,
}: {
  luminor: LuminorConfig;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/chat/${luminor.id}`}
        className="block group"
      >
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-800/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1">
          {/* Avatar & Badge */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg"
              style={{
                backgroundColor: `${luminor.color}20`,
                boxShadow: `0 4px 20px ${luminor.color}30`,
              }}
            >
              {luminor.avatar}
            </div>
            <div
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${luminor.color}20`,
                color: luminor.color,
              }}
            >
              {TEAMS[luminor.team].name}
            </div>
          </div>

          {/* Name & Title */}
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
            {luminor.name}
          </h3>
          <p
            className="text-sm font-medium mb-2"
            style={{ color: luminor.color }}
          >
            {luminor.title}
          </p>

          {/* Tagline */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {luminor.tagline}
          </p>

          {/* Specialty */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Star className="w-3 h-3" />
            <span>{luminor.specialty}</span>
          </div>

          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {luminor.personality.slice(0, 3).map((trait) => (
              <span
                key={trait}
                className="px-2 py-0.5 bg-slate-700/50 rounded-full text-xs text-slate-400"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-sm text-slate-400">Start chatting</span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-opacity-100"
              style={{ backgroundColor: `${luminor.color}30` }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: luminor.color }} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
