'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Reply, MoreVertical } from 'lucide-react';
import { Comment } from '@/lib/types/profile';
import { Button } from '@/lib/arcanea-ui';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface CommentSectionProps {
  creationId: string;
  comments: Comment[];
  onAddComment?: (content: string) => Promise<void>;
  onLikeComment?: (commentId: string) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  currentUserId?: string;
}

export function CommentSection({
  creationId,
  comments,
  onAddComment,
  onLikeComment,
  onDeleteComment,
  currentUserId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!newComment.trim() || !onAddComment) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center w-full h-full">
            ME
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={replyingTo ? 'Write a reply...' : 'Add a comment...'}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:border-purple-500 outline-none disabled:opacity-50 transition-colors"
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex gap-3 group"
            >
              {/* Avatar */}
              <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                <AvatarImage src={comment.avatar_url} alt={comment.username} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center w-full h-full">
                  {comment.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Comment Content */}
              <div className="flex-1 space-y-2">
                <div className="bg-slate-800/50 rounded-2xl px-4 py-3">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{comment.username}</span>
                    <span className="text-slate-500 text-xs">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 px-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onLikeComment && onLikeComment(comment.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-pink-500 transition-colors text-xs"
                  >
                    <Heart className="w-3 h-3" />
                    {comment.likes > 0 && (
                      <span className="font-medium">{comment.likes}</span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setReplyingTo(comment.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors text-xs"
                  >
                    <Reply className="w-3 h-3" />
                    <span>Reply</span>
                  </motion.button>

                  {currentUserId === comment.user_id && onDeleteComment && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDeleteComment(comment.id)}
                      className="ml-auto text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {comments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No comments yet</p>
            <p className="text-slate-600 text-xs mt-1">Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}
