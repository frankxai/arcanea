'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck } from 'lucide-react';
import { Button } from '@arcanea/ui';

interface FollowButtonProps {
  userId: string;
  initialIsFollowing?: boolean;
  onFollow?: (userId: string, isFollowing: boolean) => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
}

export function FollowButton({
  userId,
  initialIsFollowing = false,
  onFollow,
  size = 'md',
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const handleFollow = async () => {
    setIsLoading(true);
    const newIsFollowing = !isFollowing;

    // Optimistic update
    setIsFollowing(newIsFollowing);

    try {
      // Call API
      if (onFollow) {
        await onFollow(userId, newIsFollowing);
      }
    } catch (error) {
      // Revert on error
      setIsFollowing(!newIsFollowing);
      console.error('Failed to update follow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleFollow}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-xl font-semibold transition-all duration-300 ${
          isFollowing
            ? 'bg-slate-700 hover:bg-slate-600 text-white'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/50'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex items-center gap-2">
          {isFollowing ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Following</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Follow</span>
            </>
          )}
        </div>
      </Button>
    </motion.div>
  );
}
