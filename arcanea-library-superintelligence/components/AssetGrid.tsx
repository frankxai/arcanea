'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, Eye, Copy, ExternalLink, Sparkles, Zap } from 'lucide-react';
import AssetCard from '@/components/AssetCard';
import AssetModal from '@/components/AssetModal';
import SearchFilters from '@/components/SearchFilters';
import { Asset } from '@/lib/database';

interface AssetGridProps {
  assets: Asset[];
  onAssetSelect: (asset: Asset) => void;
  loading?: boolean;
}

export default function AssetGrid({ assets, onAssetSelect, loading }: AssetGridProps) {
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    type: '',
    format: '',
    element: '',
    guardian: '',
    favorites: false
  });
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'usage'>('date');

  // Apply filters and search
  useEffect(() => {
    let filtered = [...assets];

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(asset =>
        asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.analysis.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.analysis.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(asset => asset.type === filters.type);
    }
    if (filters.format) {
      filtered = filtered.filter(asset => asset.format === filters.format);
    }
    if (filters.element) {
      filtered = filtered.filter(asset => asset.analysis.element === filters.element);
    }
    if (filters.guardian) {
      filtered = filtered.filter(asset => asset.analysis.guardian === filters.guardian);
    }
    if (filters.favorites) {
      filtered = filtered.filter(asset => asset.usage.favorites);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.filename.localeCompare(b.filename);
        case 'date':
          return new Date(b.metadata.modified).getTime() - new Date(a.metadata.modified).getTime();
        case 'usage':
          return b.usage.views - a.usage.views;
        default:
          return 0;
      }
    });

    setFilteredAssets(filtered);
  }, [assets, searchQuery, filters, sortBy]);

  const handleAssetClick = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
    onAssetSelect(asset);
  }, [onAssetSelect]);

  const handleAssetFavorite = useCallback(async (asset: Asset) => {
    // This would update the database
    asset.usage.favorites = !asset.usage.favorites;
    setFilteredAssets(prev => 
      prev.map(a => a.id === asset.id ? asset : a)
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and Controls */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assets by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-aurora-400 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-aurora-500 text-white' 
                  : 'bg-white/10 text-cosmic-300 hover:bg-white/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-aurora-500 text-white' 
                  : 'bg-white/10 text-cosmic-300 hover:bg-white/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-aurora-400"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="usage">Sort by Usage</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <SearchFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <p className="text-cosmic-300">
          {searchQuery || Object.values(filters).some(v => v) 
            ? `Found ${filteredAssets.length} assets` 
            : `${filteredAssets.length} total assets`}
        </p>
        {loading && (
          <div className="flex items-center gap-2 text-aurora-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
      </motion.div>

      {/* Asset Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAssets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-cosmic-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No assets found</h3>
            <p className="text-cosmic-400">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <motion.div
            key="assets"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'space-y-2'
            }
          >
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                viewMode={viewMode}
                onClick={() => handleAssetClick(asset)}
                onFavorite={() => handleAssetFavorite(asset)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <AssetModal
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            onFavorite={() => handleAssetFavorite(selectedAsset)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}