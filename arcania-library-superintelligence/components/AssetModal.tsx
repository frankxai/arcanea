'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Copy, Download, ExternalLink, Eye, Calendar, FileImage, Palette, Tag, Shield, Wind, Droplets, Mountain, Zap, Sparkles } from 'lucide-react';
import { Asset } from '@/lib/database';

interface AssetModalProps {
  asset: Asset;
  onClose: () => void;
  onFavorite: () => void;
}

export default function AssetModal({ asset, onClose, onFavorite }: AssetModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(asset.format);

  const getElementIcon = (element?: string) => {
    const icons = {
      fire: <Zap className="w-4 h-4" />,
      water: <Droplets className="w-4 h-4" />,
      earth: <Mountain className="w-4 h-4" />,
      wind: <Wind className="w-4 h-4" />,
      void: <Sparkles className="w-4 h-4" />
    };
    return element && icons[element as keyof typeof icons] || <Shield className="w-4 h-4" />;
  };

  const getElementColor = (element?: string) => {
    const colors = {
      fire: 'text-draconia-400 bg-draconia-400/10',
      water: 'text-blue-400 bg-blue-400/10',
      earth: 'text-leyline-400 bg-leyline-400/10',
      wind: 'text-cyan-400 bg-cyan-400/10',
      void: 'text-purple-400 bg-purple-400/10'
    };
    return element && colors[element as keyof typeof colors] || 'text-cosmic-400 bg-cosmic-400/10';
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(asset.path);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy path:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = asset.path;
    link.download = asset.filename;
    link.click();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-cosmic-900 border border-white/20 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-white">{asset.filename}</h2>
              <div className="flex items-center gap-2">
                {asset.analysis.element && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getElementColor(asset.analysis.element)}`}>
                    {getElementIcon(asset.analysis.element)}
                    <span className="text-sm font-medium capitalize">{asset.analysis.element}</span>
                  </div>
                )}
                {asset.analysis.guardian && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aurora-400/10 text-aurora-400">
                    <span className="text-sm">{asset.analysis.guardian === 'draconia' ? '🔥' : '✨'}</span>
                    <span className="text-sm font-medium capitalize">{asset.analysis.guardian}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-cosmic-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-200px)]">
            {/* Image Preview */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="w-full h-full flex items-center justify-center">
                {isImage ? (
                  <div className="relative max-w-full max-h-full">
                    <img
                      src={asset.path}
                      alt={asset.filename}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-cosmic-800 rounded-lg">
                        <div className="animate-pulse text-cosmic-400">Loading image...</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <FileImage className="w-16 h-16 text-cosmic-400 mx-auto mb-4" />
                    <p className="text-cosmic-300">Preview not available for {asset.format} files</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details Panel */}
            <div className="w-96 border-l border-white/10 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-300 mb-2">Description</h3>
                  <p className="text-white text-sm">
                    {asset.analysis.description || 'No description available for this asset.'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onFavorite}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      asset.usage.favorites
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-cosmic-300 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${asset.usage.favorites ? 'fill-current' : ''}`} />
                    {asset.usage.favorites ? 'Favorited' : 'Favorite'}
                  </button>
                  <button
                    onClick={handleCopyPath}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 text-cosmic-300 hover:bg-white/20 transition-colors"
                  >
                    {copySuccess ? (
                      <span className="text-green-400 text-sm">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 text-cosmic-300 hover:bg-white/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Metadata */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-300 mb-3">File Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Type</span>
                      <span className="text-white capitalize">{asset.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Format</span>
                      <span className="text-white uppercase">{asset.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Size</span>
                      <span className="text-white">{formatFileSize(asset.size)}</span>
                    </div>
                    {asset.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Dimensions</span>
                        <span className="text-white">{asset.dimensions.width}×{asset.dimensions.height}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Created</span>
                      <span className="text-white">{new Date(asset.metadata.created).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Modified</span>
                      <span className="text-white">{new Date(asset.metadata.modified).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-300 mb-3">Visual Analysis</h3>
                  <div className="space-y-3 text-sm">
                    {asset.analysis.style && (
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Style</span>
                        <span className="text-white capitalize">{asset.analysis.style}</span>
                      </div>
                    )}
                    {asset.analysis.mood && (
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Mood</span>
                        <span className="text-white capitalize">{asset.analysis.mood}</span>
                      </div>
                    )}
                    {asset.analysis.composition && (
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Composition</span>
                        <span className="text-white capitalize">{asset.analysis.composition}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {asset.analysis.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-cosmic-300 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {asset.analysis.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 rounded-lg text-xs text-cosmic-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Usage Stats */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-300 mb-3">Usage Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Views</span>
                      <span className="text-white">{asset.usage.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Selections</span>
                      <span className="text-white">{asset.usage.selects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-400">Copies</span>
                      <span className="text-white">{asset.usage.copies}</span>
                    </div>
                    {asset.usage.lastUsed && (
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Last Used</span>
                        <span className="text-white">{new Date(asset.usage.lastUsed).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* File Path */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-300 mb-2">File Path</h3>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-cosmic-400 break-all font-mono">{asset.path}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}