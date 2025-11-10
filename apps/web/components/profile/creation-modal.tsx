'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Heart, MessageCircle, Share2, Calendar, Sparkles } from 'lucide-react';
import { Creation } from '@/lib/types/profile';
import { useEffect, useState } from 'react';
import { Button } from '@arcanea/ui';

interface CreationModalProps {
  creation: Creation;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onLike?: () => void;
  onComment?: (comment: string) => void;
}

export function CreationModal({
  creation,
  onClose,
  onNext,
  onPrevious,
  onLike,
  onComment,
}: CreationModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike();
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() && onComment) {
      onComment(commentText);
      setCommentText('');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = creation.media_url;
    link.download = `${creation.title}.${creation.type === 'video' ? 'mp4' : 'png'}`;
    link.click();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/creation/${creation.id}`;
    if (navigator.share) {
      navigator.share({
        title: creation.title,
        text: creation.description || 'Check out this creation on Arcanea!',
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Navigation Buttons */}
      {onPrevious && (
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-6 z-50 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}

      {onNext && (
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 z-50 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      )}

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-7xl h-full max-h-[90vh] m-6 flex flex-col lg:flex-row gap-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Media Section */}
        <div className="flex-1 flex items-center justify-center bg-black p-4 lg:p-8">
          {creation.type === 'video' ? (
            <video
              src={creation.media_url}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
          ) : (
            <img
              src={creation.media_url}
              alt={creation.title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          )}
        </div>

        {/* Details Sidebar */}
        <div className="w-full lg:w-96 flex flex-col bg-slate-900 overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-2">{creation.title}</h2>
            {creation.description && (
              <p className="text-slate-400 leading-relaxed">{creation.description}</p>
            )}
          </div>

          {/* Stats and Actions */}
          <div className="p-6 border-b border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLiked
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{(creation.stats.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
              </Button>

              <Button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5" />
              </Button>

              <Button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{creation.stats.comments.toLocaleString()} comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(creation.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Creation Details */}
          <div className="p-6 space-y-4">
            {creation.prompt && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Prompt</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-purple-500/20">
                  {creation.prompt}
                </p>
              </div>
            )}

            {creation.luminor_id && (
              <div className="space-y-2">
                <div className="text-slate-400 text-sm font-semibold">Created with</div>
                <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                  <span className="text-purple-300 font-medium">{creation.luminor_id}</span>
                </div>
              </div>
            )}

            {creation.academy && (
              <div className="space-y-2">
                <div className="text-slate-400 text-sm font-semibold">Academy</div>
                <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
                  <span className="text-blue-300 font-medium">{creation.academy}</span>
                </div>
              </div>
            )}

            {creation.metadata?.tags && creation.metadata.tags.length > 0 && (
              <div className="space-y-2">
                <div className="text-slate-400 text-sm font-semibold">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {creation.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="flex-1 p-6 border-t border-slate-800">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Comments ({creation.stats.comments})
              </h3>

              {/* Comment Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommentSubmit();
                    }
                  }}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:border-purple-500 outline-none"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Post
                </Button>
              </div>

              {/* Comments would be listed here */}
              <div className="text-slate-500 text-sm text-center py-4">
                Comments feature coming soon
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
