'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, LayoutGrid, Filter, SortAsc } from 'lucide-react';
import { Creation, FilterType, SortOption } from '@/lib/types/profile';
import { CreationCard } from './creation-card';
import { CreationModal } from './creation-modal';
import { Button } from '@arcanea/ui';

interface CreationGalleryProps {
  creations: Creation[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function CreationGallery({
  creations,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: CreationGalleryProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortOption>('recent');
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const [filteredCreations, setFilteredCreations] = useState<Creation[]>(creations);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter and sort creations
  useEffect(() => {
    let filtered = [...creations];

    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter((creation) => creation.type === filter);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'popular':
          return b.stats.likes - a.stats.likes;
        default:
          return 0;
      }
    });

    setFilteredCreations(filtered);
  }, [creations, filter, sort]);

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !onLoadMore || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  const handleCreationClick = (creation: Creation) => {
    setSelectedCreation(creation);
  };

  const handleCloseModal = () => {
    setSelectedCreation(null);
  };

  const handleNext = () => {
    if (!selectedCreation) return;
    const currentIndex = filteredCreations.findIndex((c) => c.id === selectedCreation.id);
    const nextIndex = (currentIndex + 1) % filteredCreations.length;
    setSelectedCreation(filteredCreations[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedCreation) return;
    const currentIndex = filteredCreations.findIndex((c) => c.id === selectedCreation.id);
    const prevIndex = (currentIndex - 1 + filteredCreations.length) % filteredCreations.length;
    setSelectedCreation(filteredCreations[prevIndex]);
  };

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'project', label: 'Projects' },
    { value: 'composition', label: 'Compositions' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                filter === option.value
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Sort and Layout Controls */}
        <div className="flex gap-2">
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-purple-500/20 focus:border-purple-500/40 outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Layout Toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-slate-800">
            <Button
              onClick={() => setLayout('masonry')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                layout === 'masonry'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                layout === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-slate-400 text-sm">
        Showing {filteredCreations.length} {filter === 'all' ? 'creations' : filter + 's'}
      </div>

      {/* Gallery Grid */}
      {filteredCreations.length > 0 ? (
        <motion.div
          layout
          className={`grid gap-4 ${
            layout === 'masonry'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence>
            {filteredCreations.map((creation, index) => (
              <motion.div
                key={creation.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CreationCard
                  creation={creation}
                  onClick={() => handleCreationClick(creation)}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <div className="text-slate-400 text-lg">No creations found</div>
          <p className="text-slate-500 mt-2">Try adjusting your filters</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
        </div>
      )}

      {/* Load More Trigger */}
      {hasMore && <div ref={loadMoreRef} className="h-10" />}

      {/* Creation Modal */}
      <AnimatePresence>
        {selectedCreation && (
          <CreationModal
            creation={selectedCreation}
            onClose={handleCloseModal}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
