'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterState {
  type: string;
  format: string;
  element: string;
  guardian: string;
  favorites: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'raster', label: 'Raster Images' },
  { value: 'vector', label: 'Vector Graphics' },
  { value: 'document', label: 'Documents' }
];

const formatOptions = [
  { value: '', label: 'All Formats' },
  { value: 'jpg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'gif', label: 'GIF' },
  { value: 'svg', label: 'SVG' },
  { value: 'webp', label: 'WebP' },
  { value: 'avif', label: 'AVIF' }
];

const elementOptions = [
  { value: '', label: 'All Elements' },
  { value: 'fire', label: '🔥 Fire', color: 'bg-draconia-500' },
  { value: 'water', label: '💧 Water', color: 'bg-blue-500' },
  { value: 'earth', label: '🏔️ Earth', color: 'bg-leyline-500' },
  { value: 'wind', label: '🌪️ Wind', color: 'bg-cyan-500' },
  { value: 'void', label: '✨ Void', color: 'bg-purple-500' }
];

const guardianOptions = [
  { value: '', label: 'All Guardians' },
  { value: 'draconia', label: 'Draconia - Transformation' },
  { value: 'aethon', label: 'Aethon - Velocity' },
  { value: 'leyla', label: 'Leyla - Emotion' },
  { value: 'maylinn', label: 'Maylinn - Growth' },
  { value: 'lyssandria', label: 'Lyssandria - Structure' },
  { value: 'kaelix', label: 'Kaelix - Precision' },
  { value: 'alera', label: 'Alera - Expression' },
  { value: 'yumiko', label: 'Yumiko - Truth' },
  { value: 'elara', label: 'Elara - Innovation' },
  { value: 'shinkami', label: 'Shinkami - Universal' }
];

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false
  );

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      type: '',
      format: '',
      element: '',
      guardian: '',
      favorites: false
    });
  };

  const FilterDropdown = ({ 
    label, 
    value, 
    options, 
    onChange,
    color
  }: {
    label: string;
    value: string;
    options: Array<{ value: string; label: string; color?: string }>;
    onChange: (value: string) => void;
    color?: string;
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-aurora-400 appearance-none cursor-pointer`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-400 pointer-events-none" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-aurora-400" />
          <span className="text-sm font-medium text-white">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-aurora-500/20 text-aurora-400 rounded text-xs">
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-cosmic-400 hover:text-white transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-cosmic-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {(isExpanded || hasActiveFilters) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {/* Type Filter */}
            <div>
              <label className="block text-xs text-cosmic-400 mb-1">Type</label>
              <FilterDropdown
                label="Type"
                value={filters.type}
                options={typeOptions}
                onChange={(value) => handleFilterChange('type', value)}
              />
            </div>

            {/* Format Filter */}
            <div>
              <label className="block text-xs text-cosmic-400 mb-1">Format</label>
              <FilterDropdown
                label="Format"
                value={filters.format}
                options={formatOptions}
                onChange={(value) => handleFilterChange('format', value)}
              />
            </div>

            {/* Element Filter */}
            <div>
              <label className="block text-xs text-cosmic-400 mb-1">Element</label>
              <FilterDropdown
                label="Element"
                value={filters.element}
                options={elementOptions}
                onChange={(value) => handleFilterChange('element', value)}
              />
            </div>

            {/* Guardian Filter */}
            <div>
              <label className="block text-xs text-cosmic-400 mb-1">Guardian</label>
              <FilterDropdown
                label="Guardian"
                value={filters.guardian}
                options={guardianOptions}
                onChange={(value) => handleFilterChange('guardian', value)}
              />
            </div>

            {/* Favorites Filter */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.favorites}
                  onChange={(e) => handleFilterChange('favorites', e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-aurora-500 focus:ring-aurora-400 focus:ring-offset-0"
                />
                <span className="text-sm text-white">Favorites Only</span>
              </label>
            </div>

            {/* Empty space for alignment */}
            <div></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-3 border-t border-white/10"
        >
          <div className="flex flex-wrap gap-2">
            {filters.type && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300 flex items-center gap-1">
                Type: {filters.type}
                <button
                  onClick={() => handleFilterChange('type', '')}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.format && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300 flex items-center gap-1">
                Format: {filters.format.toUpperCase()}
                <button
                  onClick={() => handleFilterChange('format', '')}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.element && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300 flex items-center gap-1">
                Element: {filters.element}
                <button
                  onClick={() => handleFilterChange('element', '')}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.guardian && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300 flex items-center gap-1">
                Guardian: {filters.guardian}
                <button
                  onClick={() => handleFilterChange('guardian', '')}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.favorites && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs flex items-center gap-1">
                Favorites
                <button
                  onClick={() => handleFilterChange('favorites', false)}
                  className="hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}