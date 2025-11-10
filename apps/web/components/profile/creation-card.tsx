'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye, Play, Image as ImageIcon } from 'lucide-react';
import { Creation } from '@/lib/types/profile';
import { useState } from 'react';

interface CreationCardProps {
  creation: Creation;
  onClick?: () => void;
  index?: number;
}

export function CreationCard({ creation, onClick, index = 0 }: CreationCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = () => {
    switch (creation.type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (creation.type) {
      case 'video':
        return 'from-red-500 to-pink-500';
      case 'image':
        return 'from-blue-500 to-cyan-500';
      case 'project':
        return 'from-purple-500 to-indigo-500';
      case 'composition':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getAcademyColor = () => {
    switch (creation.academy) {
      case 'Lumina':
        return 'from-yellow-400 to-orange-400';
      case 'Umbra':
        return 'from-purple-600 to-indigo-600';
      case 'Aether':
        return 'from-cyan-400 to-blue-400';
      case 'Terra':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20"
    >
      {/* Image/Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse" />
        )}

        <img
          src={creation.thumbnail_url || creation.media_url}
          alt={creation.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getTypeColor()} text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm`}
          >
            {getTypeIcon()}
            <span className="capitalize">{creation.type}</span>
          </motion.div>
        </div>

        {/* Academy Badge */}
        {creation.academy && (
          <div className="absolute top-3 right-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getAcademyColor()} text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}
            >
              {creation.academy}
            </motion.div>
          </div>
        )}

        {/* Video Play Overlay */}
        {creation.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-white/30"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Title */}
            <h3 className="text-white font-bold text-lg line-clamp-2">
              {creation.title}
            </h3>

            {/* Description */}
            {creation.description && (
              <p className="text-slate-300 text-sm line-clamp-2">
                {creation.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1.5 text-sm">
                <Heart className="w-4 h-4" />
                <span>{creation.stats.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>{creation.stats.comments.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Eye className="w-4 h-4" />
                <span>{creation.stats.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Info Bar (visible on mobile) */}
      <div className="md:hidden p-3 bg-slate-900/90 backdrop-blur-sm">
        <h3 className="text-white font-semibold text-sm line-clamp-1 mb-2">
          {creation.title}
        </h3>
        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{creation.stats.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{creation.stats.comments}</span>
          </div>
        </div>
      </div>

      {/* Luminor Badge (if present) */}
      {creation.luminor_id && (
        <div className="absolute bottom-3 right-3 hidden md:block">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-xs font-medium"
          >
            With {creation.luminor_id}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
