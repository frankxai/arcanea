import { useState, useCallback, useEffect } from 'react';
import { Comment } from '@/lib/types/profile';

export function useLike(creationId: string, initialLikes: number, initialIsLiked: boolean) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    const previousLikes = likes;
    const previousIsLiked = isLiked;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      const response = await fetch(`/api/creations/${creationId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      const data = await response.json();
      setLikes(data.likes);
      setIsLiked(data.isLiked);
    } catch (err) {
      // Revert on error
      setLikes(previousLikes);
      setIsLiked(previousIsLiked);
      throw err instanceof Error ? err : new Error('Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [creationId, likes, isLiked]);

  return { likes, isLiked, toggleLike, isLoading };
}

export function useComments(creationId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Replace with actual API call
      const response = await fetch(`/api/creations/${creationId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [creationId]);

  // Fetch comments on mount and when creationId changes
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = useCallback(
    async (content: string) => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/creations/${creationId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          throw new Error('Failed to add comment');
        }

        const newComment = await response.json();

        // Optimistic update
        setComments((prev) => [newComment, ...prev]);

        return newComment;
      } catch (err) {
        throw err instanceof Error ? err : new Error('Unknown error');
      }
    },
    [creationId]
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      try {
        // Optimistic update
        setComments((prev) => prev.filter((c) => c.id !== commentId));

        // TODO: Replace with actual API call
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete comment');
          // Revert on error - you'd want to re-fetch comments here
        }
      } catch (err) {
        // Re-fetch comments on error
        fetchComments();
        throw err instanceof Error ? err : new Error('Unknown error');
      }
    },
    [fetchComments]
  );

  const likeComment = useCallback(async (commentId: string) => {
    try {
      // Optimistic update
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
      );

      // TODO: Replace with actual API call
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like comment');
      }
    } catch (err) {
      // Revert on error
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes - 1 } : c))
      );
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  }, []);

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    deleteComment,
    likeComment,
  };
}

export function useFollow(userId: string, initialIsFollowing: boolean) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFollow = useCallback(async () => {
    const previousIsFollowing = isFollowing;

    // Optimistic update
    setIsFollowing(!isFollowing);

    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      const response = await fetch(`/api/follows/${userId}`, {
        method: isFollowing ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle follow');
      }

      const data = await response.json();
      setIsFollowing(data.isFollowing);
    } catch (err) {
      // Revert on error
      setIsFollowing(previousIsFollowing);
      throw err instanceof Error ? err : new Error('Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [userId, isFollowing]);

  return { isFollowing, toggleFollow, isLoading };
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const share = useCallback(
    async (title: string, text: string, url: string) => {
      try {
        setIsSharing(true);

        if (navigator.share) {
          await navigator.share({ title, text, url });
        } else {
          // Fallback to clipboard
          await navigator.clipboard.writeText(url);
        }

        // Track share event
        // TODO: Add analytics tracking
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          throw err;
        }
      } finally {
        setIsSharing(false);
      }
    },
    []
  );

  return { share, isSharing };
}

export function useBookmark(creationId: string, initialIsBookmarked: boolean) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = useCallback(async () => {
    const previousIsBookmarked = isBookmarked;

    // Optimistic update
    setIsBookmarked(!isBookmarked);

    try {
      setIsLoading(true);

      // TODO: Replace with actual API call
      const response = await fetch(`/api/creations/${creationId}/bookmark`, {
        method: isBookmarked ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle bookmark');
      }

      const data = await response.json();
      setIsBookmarked(data.isBookmarked);
    } catch (err) {
      // Revert on error
      setIsBookmarked(previousIsBookmarked);
      throw err instanceof Error ? err : new Error('Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [creationId, isBookmarked]);

  return { isBookmarked, toggleBookmark, isLoading };
}

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUnreadCount = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/notifications/unread-count');
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      await fetch('/api/notifications/read-all', {
        method: 'POST',
      });
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  }, []);

  return {
    unreadCount,
    isLoading,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
  };
}
