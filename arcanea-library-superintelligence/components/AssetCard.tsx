'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Copy, Download, ExternalLink, Calendar, FileImage, Palette, Tag } from 'lucide-react';
import { Asset } from '@/lib/database';

interface AssetCardProps {
  asset: Asset;
  viewMode: 'grid' | 'list';
  onClick: () => void;
  onFavorite: () => void;
}

export default function AssetCard({ asset, viewMode, onClick, onFavorite }: AssetCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const getElementColor = (element?: string) => {
    const colors = {
      fire: 'bg-draconia-500',
      water: 'bg-blue-500',
      earth: 'bg-leyline-500',
      wind: 'bg-cyan-500',
      void: 'bg-purple-500'
    };
    return element && colors[element as keyof typeof colors] || 'bg-cosmic-500';
  };

  const getGuardianIcon = (guardian?: string) => {
    const icons = {
      draconia: '🔥',
      aethon: '⚡',
      leyla: '💧',
      maylinn: '🌱',
      lyssandria: '🏛️',
      kaelix: '💎',
      alera: '🌪️',
      yumiko: '🎯',
      elara: '🔮',
      shinkami: '✨'
    };
    return guardian && icons[guardian as keyof typeof icons] || '📁';
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(asset.format);

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        onClick={onClick}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all duration-200"
      >
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
            {isImage ? (
              <img
                src={asset.path}
                alt={asset.filename}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <FileImage className="w-6 h-6 text-cosmic-400" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{asset.filename}</h3>
                <p className="text-sm text-cosmic-400 truncate">
                  {asset.analysis.description || 'No description available'}
                </p>
              </div>
              
              {/* Badges */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {asset.analysis.element && (
                  <div className={`w-2 h-2 rounded-full ${getElementColor(asset.analysis.element)}`} />
                )}
                <span className="text-xs">{getGuardianIcon(asset.analysis.guardian)}</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 mt-2 text-xs text-cosmic-400">
              <span>{asset.format.toUpperCase()}</span>
              <span>{formatFileSize(asset.size)}</span>
              {asset.dimensions && (
                <span>{asset.dimensions.width}×{asset.dimensions.height}</span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {asset.usage.views}
              </span>
            </div>

            {/* Tags */}
            {asset.analysis.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {asset.analysis.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300"
                  >
                    {tag}
                  </span>
                ))}
                {asset.analysis.tags.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 rounded text-xs text-cosmic-300">
                    +{asset.analysis.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className={`p-2 rounded-lg transition-colors ${
                asset.usage.favorites
                  ? 'text-red-400 bg-red-400/20'
                  : 'text-cosmic-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${asset.usage.favorites ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-200">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-white/5">
          {isImage ? (
            <img
              src={asset.path}
              alt={asset.filename}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileImage className="w-8 h-8 text-cosmic-400" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute top-2 left-2 flex items-center gap-1">
              {asset.analysis.element && (
                <div className={`w-3 h-3 rounded-full ${getElementColor(asset.analysis.element)}`} />
              )}
              <span className="text-white text-sm drop-shadow-lg">
                {getGuardianIcon(asset.analysis.guardian)}
              </span>
            </div>
            
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite();
                }}
                className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
                  asset.usage.favorites
                    ? 'text-red-400 bg-red-400/20'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${asset.usage.favorites ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center gap-2 text-white text-xs backdrop-blur-sm bg-black/20 rounded px-2 py-1">
                <Eye className="w-3 h-3" />
                {asset.usage.views}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-white text-sm truncate mb-1">{asset.filename}</h3>
          <p className="text-xs text-cosmic-400 truncate mb-2">
            {asset.analysis.description || 'No description'}
          </p>

          {/* Tags */}
          {asset.analysis.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {asset.analysis.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-white/10 rounded text-xs text-cosmic-300"
                >
                  {tag}
                </span>
              ))}
              {asset.analysis.tags.length > 2 && (
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-cosmic-300">
                  +{asset.analysis.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-cosmic-400">
            <span className="flex items-center gap-2">
              <span>{asset.format.toUpperCase()}</span>
              {asset.dimensions && (
                <span>{asset.dimensions.width}×{asset.dimensions.height}</span>
              )}
            </span>
            <span>{formatFileSize(asset.size)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}