'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, Users, Sparkles } from 'lucide-react';
import { CreationCard } from '@/components/profile/creation-card';
import { Creation } from '@/lib/types/profile';
import { Button } from '@/lib/arcanea-ui';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'trending' | 'recent' | 'following'>(
    'trending'
  );
  const [selectedAcademy, setSelectedAcademy] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const mockCreations: Creation[] = Array.from({ length: 24 }, (_, i) => ({
    id: `creation-${i}`,
    user_id: `user-${i % 5}`,
    title: `Amazing Creation ${i + 1}`,
    description: 'A stunning piece of AI art that pushes the boundaries of creativity',
    type: ['image', 'video', 'project'][i % 3] as 'image' | 'video' | 'project',
    media_url: `https://picsum.photos/seed/${i}/800/800`,
    thumbnail_url: `https://picsum.photos/seed/${i}/400/400`,
    prompt: 'A mystical landscape with floating islands and cosmic energy',
    luminor_id: ['Aria', 'Luna', 'Nova', 'Sage'][i % 4],
    academy: ['Lumina', 'Umbra', 'Aether', 'Terra'][i % 4],
    created_at: new Date(Date.now() - i * 3600000).toISOString(),
    updated_at: new Date(Date.now() - i * 3600000).toISOString(),
    stats: {
      likes: Math.floor(Math.random() * 2000) + 100,
      comments: Math.floor(Math.random() * 200) + 10,
      views: Math.floor(Math.random() * 10000) + 500,
      shares: Math.floor(Math.random() * 100) + 5,
    },
    metadata: {
      width: 800,
      height: 800,
      style: ['cosmic', 'ethereal', 'mystical', 'vibrant'][i % 4],
      tags: ['ai-art', 'creative', 'luminor', 'arcanea'],
    },
  }));

  const academies = ['Lumina', 'Umbra', 'Aether', 'Terra'];

  const filteredCreations = mockCreations
    .filter((creation) => {
      if (selectedAcademy && creation.academy !== selectedAcademy) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          creation.title.toLowerCase().includes(query) ||
          creation.description?.toLowerCase().includes(query) ||
          creation.metadata?.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (selectedFilter) {
        case 'trending':
          return b.stats.likes - a.stats.likes;
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  const getAcademyGradient = (academy: string) => {
    switch (academy) {
      case 'Lumina':
        return 'from-brand-gold to-fire';
      case 'Umbra':
        return 'from-brand-primary to-[#4f46e5]';
      case 'Aether':
        return 'from-crystal to-water';
      case 'Terra':
        return 'from-earth to-[#10b981]';
      default:
        return 'from-cosmic-raised to-cosmic-elevated';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-fluid-3xl font-display font-bold text-gradient-crystal">
            Discover Creations
          </h1>
          <p className="text-text-secondary text-fluid-lg max-w-2xl mx-auto font-sans">
            Explore stunning AI creations from talented creators across all academies
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creations, styles, or tags..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass text-white placeholder-text-muted border border-white/10 focus:border-crystal focus:outline-none focus:ring-2 focus:ring-crystal/20 transition-all font-sans"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button
            onClick={() => setSelectedFilter('trending')}
            className={`px-6 py-3 rounded-xl font-semibold font-sans transition-all flex items-center gap-2 ${
              selectedFilter === 'trending'
                ? 'bg-brand-primary text-white shadow-glow-brand'
                : 'glass text-text-secondary hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </Button>

          <Button
            onClick={() => setSelectedFilter('recent')}
            className={`px-6 py-3 rounded-xl font-semibold font-sans transition-all flex items-center gap-2 ${
              selectedFilter === 'recent'
                ? 'bg-brand-primary text-white shadow-glow-brand'
                : 'glass text-text-secondary hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </Button>

          <Button
            onClick={() => setSelectedFilter('following')}
            className={`px-6 py-3 rounded-xl font-semibold font-sans transition-all flex items-center gap-2 ${
              selectedFilter === 'following'
                ? 'bg-brand-primary text-white shadow-glow-brand'
                : 'glass text-text-secondary hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Following
          </Button>
        </motion.div>

        {/* Academy Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 text-text-muted text-sm uppercase tracking-wider font-sans">
              <Sparkles className="w-4 h-4" />
              <span>Filter by Academy</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => setSelectedAcademy(null)}
              className={`px-5 py-2.5 rounded-xl font-medium font-sans transition-all ${
                selectedAcademy === null
                  ? 'glass-strong text-white'
                  : 'glass text-text-muted hover:text-white'
              }`}
            >
              All Academies
            </Button>

            {academies.map((academy) => (
              <Button
                key={academy}
                onClick={() => setSelectedAcademy(academy === selectedAcademy ? null : academy)}
                className={`px-5 py-2.5 rounded-xl font-medium font-sans transition-all ${
                  selectedAcademy === academy
                    ? `bg-gradient-to-r ${getAcademyGradient(academy)} text-white shadow-glow-sm`
                    : 'glass text-text-muted hover:text-white'
                }`}
              >
                {academy}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-muted font-sans"
        >
          Showing {filteredCreations.length} creations
        </motion.div>

        {/* Creations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCreations.map((creation, index) => (
            <CreationCard key={creation.id} creation={creation} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCreations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">No creations found</h3>
            <p className="text-text-secondary font-sans">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCreations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-8"
          >
            <Button className="px-8 py-4 rounded-xl bg-brand-primary text-white font-semibold font-sans shadow-glow-brand hover:scale-[1.02] transition-all">
              Load More Creations
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
