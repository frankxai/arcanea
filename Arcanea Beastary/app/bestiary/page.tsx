'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Globe, Sparkles, BookOpen } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import Fuse from 'fuse.js';

// Import the JSON data (in a real app, this would come from an API)
import creaturesData from '../../data/initial-creatures-dataset.json';

interface Creature {
  id: string;
  name: string;
  culture_id: string;
  alternative_names: string[];
  pronunciation: string;
  classification: string;
  creature_type: string;
  physical_description: string;
  size_category: string;
  primary_colors: string[];
  cultural_significance: string;
  symbolic_meaning: string[];
  semantic_tags: string[];
  verification_status: string;
  age_appropriateness: string;
}

interface Culture {
  id: string;
  name: string;
  indigenous_name: string;
  region: string;
  continent: string;
}

const BestiaryPage = () => {
  const [creatures] = useState<Creature[]>(creaturesData.creatures as Creature[]);
  const [cultures] = useState<Culture[]>(creaturesData.cultures as Culture[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCulture, setSelectedCulture] = useState<string>('all');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'culture' | 'classification'>('name');

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(creatures, {
      keys: ['name', 'alternative_names', 'classification', 'semantic_tags', 'cultural_significance'],
      threshold: 0.4,
      includeScore: true,
    });
  }, [creatures]);

  // Filter and search creatures
  const filteredCreatures = useMemo(() => {
    let result = creatures;

    // Apply fuzzy search if search term exists
    if (debouncedSearchTerm) {
      const searchResults = fuse.search(debouncedSearchTerm);
      result = searchResults.map(result => result.item);
    }

    // Filter by culture
    if (selectedCulture !== 'all') {
      result = result.filter(creature => creature.culture_id === selectedCulture);
    }

    // Filter by classification
    if (selectedClassification !== 'all') {
      result = result.filter(creature => creature.classification === selectedClassification);
    }

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'culture':
          const cultureA = cultures.find(c => c.id === a.culture_id)?.name || '';
          const cultureB = cultures.find(c => c.id === b.culture_id)?.name || '';
          return cultureA.localeCompare(cultureB);
        case 'classification':
          return a.classification.localeCompare(b.classification);
        default:
          return 0;
      }
    });

    return result;
  }, [creatures, debouncedSearchTerm, selectedCulture, selectedClassification, sortBy, cultures, fuse]);

  // Get unique classifications for filter
  const classifications = useMemo(() => {
    const uniqueSet = new Set(creatures.map(c => c.classification));
    const unique = Array.from(uniqueSet);
    return unique.sort();
  }, [creatures]);

  // Get culture name by ID
  const getCultureName = (cultureId: string) => {
    return cultures.find(c => c.id === cultureId)?.name || 'Unknown';
  };

  // Get culture region by ID
  const getCultureRegion = (cultureId: string) => {
    return cultures.find(c => c.id === cultureId)?.region || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/50" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-primary-400 mr-4" />
              <h1 className="text-6xl font-bold font-fantasy text-gradient">
                Arcanean Bestiary
              </h1>
              <Sparkles className="w-12 h-12 text-mystical-400 ml-4 animate-pulse" />
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore the most comprehensive database of mythological creatures from cultures around the world.
              Each entry is verified for cultural authenticity and respect.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-8 text-sm text-slate-400">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>{cultures.length} Cultures</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>{creatures.length} Creatures</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>AI-Powered Search</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search creatures, cultures, or abilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input pl-10"
              />
            </div>

            {/* Culture Filter */}
            <select
              value={selectedCulture}
              onChange={(e) => setSelectedCulture(e.target.value)}
              className="search-input"
            >
              <option value="all">All Cultures</option>
              {cultures.map(culture => (
                <option key={culture.id} value={culture.id}>
                  {culture.name} ({culture.region})
                </option>
              ))}
            </select>

            {/* Classification Filter */}
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
              className="search-input"
            >
              <option value="all">All Classifications</option>
              {classifications.map(classification => (
                <option key={classification} value={classification}>
                  {classification}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'culture' | 'classification')}
              className="search-input"
            >
              <option value="name">Sort by Name</option>
              <option value="culture">Sort by Culture</option>
              <option value="classification">Sort by Classification</option>
            </select>
          </div>

          {/* View Toggle and Results Count */}
          <div className="flex items-center justify-between">
            <div className="text-slate-400">
              Showing {filteredCreatures.length} of {creatures.length} creatures
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Creatures Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${debouncedSearchTerm}-${selectedCulture}-${selectedClassification}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredCreatures.map((creature, index) => (
              <CreatureCard
                key={creature.id}
                creature={creature}
                culture={cultures.find(c => c.id === creature.culture_id)!}
                viewMode={viewMode}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredCreatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🐉</div>
            <h3 className="text-2xl font-semibold text-slate-300 mb-2">No creatures found</h3>
            <p className="text-slate-400">
              Try adjusting your search terms or filters to discover new mythological beings.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Creature Card Component
interface CreatureCardProps {
  creature: Creature;
  culture: Culture;
  viewMode: 'grid' | 'list';
  delay: number;
}

const CreatureCard = ({ creature, culture, viewMode, delay }: CreatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`creature-card group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
    >
      {/* Creature Image Placeholder */}
      <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-full h-48'} bg-gradient-to-br from-primary-900/50 to-secondary-900/50 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative`}>
        <div className="text-4xl opacity-60">
          {creature.classification === 'Dragon' && '🐉'}
          {creature.classification === 'Divine Wolf' && '🐺'}
          {creature.classification === 'Serpentine Monster' && '🐍'}
          {creature.classification === 'Divine Guardian' && '🦁'}
          {creature.classification === 'Fairy Spirit' && '👻'}
          {creature.classification === 'Fox Spirit' && '🦊'}
          {creature.classification === 'Sea Monster' && '🐙'}
          {creature.classification === 'Divine Bird' && '🔥'}
          {creature.classification === 'Divine Guide' && '⚱️'}
          {!['Dragon', 'Divine Wolf', 'Serpentine Monster', 'Divine Guardian', 'Fairy Spirit', 'Fox Spirit', 'Sea Monster', 'Divine Bird', 'Divine Guide'].includes(creature.classification) && '✨'}
        </div>
        
        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        />
      </div>

      {/* Creature Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors">
            {creature.name}
          </h3>
          <span className="badge text-xs">
            {creature.verification_status === 'verified' ? '✅' : '⏳'}
          </span>
        </div>

        {/* Pronunciation */}
        {creature.pronunciation && (
          <p className="text-sm text-slate-400 mb-2 font-mono">
            /{creature.pronunciation}/
          </p>
        )}

        {/* Culture and Classification */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge badge-secondary">
            {culture?.name} • {culture?.region}
          </span>
          <span className="badge">
            {creature.classification}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-3 mb-4">
          {creature.physical_description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {creature.semantic_tags.slice(0, 5).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-primary-500/10 text-primary-300 rounded">
              {tag}
            </span>
          ))}
          {creature.semantic_tags.length > 5 && (
            <span className="px-2 py-1 text-xs bg-slate-500/10 text-slate-400 rounded">
              +{creature.semantic_tags.length - 5} more
            </span>
          )}
        </div>

        {/* Cultural Significance Teaser */}
        {viewMode === 'list' && (
          <p className="text-slate-500 text-sm italic line-clamp-2">
            "{creature.cultural_significance?.substring(0, 120)}..."
          </p>
        )}
      </div>

      {/* Hover Effects */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={isHovered ? {
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
        } : {
          boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default BestiaryPage;