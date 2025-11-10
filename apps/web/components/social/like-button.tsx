'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  creationId: string;
  initialLikes: number;
  initialIsLiked?: boolean;
  onLike?: (creationId: string, isLiked: boolean) => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function LikeButton({
  creationId,
  initialLikes,
  initialIsLiked = false,
  onLike,
  size = 'md',
  showCount = true,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleLike = async () => {
    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes((prev) => (newIsLiked ? prev + 1 : prev - 1));
    setIsAnimating(true);

    try {
      // Call API
      if (onLike) {
        await onLike(creationId, newIsLiked);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikes((prev) => (newIsLiked ? prev - 1 : prev + 1));
      console.error('Failed to update like:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      className={`flex items-center gap-2 transition-colors duration-300 ${
        isLiked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'
      }`}
    >
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`${sizeClasses[size]} ${isLiked ? 'fill-current' : ''}`}
        />
      </motion.div>

      {showCount && (
        <motion.span
          key={likes}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-medium text-sm"
        >
          {likes.toLocaleString()}
        </motion.span>
      )}
    </motion.button>
  );
}
