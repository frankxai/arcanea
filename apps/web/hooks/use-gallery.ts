import { useState, useEffect, useCallback } from 'react';
import { Creation, FilterType, SortOption } from '@/lib/types/profile';

interface UseGalleryOptions {
  userId?: string;
  filter?: FilterType;
  sort?: SortOption;
  limit?: number;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const { userId, filter = 'all', sort = 'recent', limit = 20 } = options;

  const [creations, setCreations] = useState<Creation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCreations = useCallback(
    async (pageNum: number, reset = false) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: limit.toString(),
          ...(userId && { userId }),
          ...(filter !== 'all' && { type: filter }),
          sort,
        });

        // TODO: Replace with actual API call
        const response = await fetch(`/api/creations?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch creations');
        }

        const data = await response.json();

        setCreations((prev) => (reset ? data.creations : [...prev, ...data.creations]));
        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    },
    [userId, filter, sort, limit]
  );

  useEffect(() => {
    setPage(1);
    fetchCreations(1, true);
  }, [fetchCreations]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCreations(nextPage);
    }
  }, [page, isLoading, hasMore, fetchCreations]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchCreations(1, true);
  }, [fetchCreations]);

  return {
    creations,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}

export function useCreation(creationId: string) {
  const [creation, setCreation] = useState<Creation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCreation() {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch(`/api/creations/${creationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch creation');
        }
        const data = await response.json();
        setCreation(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCreation();
  }, [creationId]);

  return { creation, isLoading, error };
}

export function useUploadCreation() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadCreation = async (
    file: File,
    metadata: Partial<Creation>
  ): Promise<Creation> => {
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      // TODO: Implement actual file upload with progress tracking
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch('/api/creations/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload creation');
      }

      const creation = await response.json();
      setProgress(100);
      return creation;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadCreation, isUploading, progress, error };
}

export function useDeleteCreation() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCreation = async (creationId: string) => {
    try {
      setIsDeleting(true);

      // TODO: Replace with actual API call
      const response = await fetch(`/api/creations/${creationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete creation');
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteCreation, isDeleting };
}
