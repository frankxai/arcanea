import { useState, useEffect } from 'react';
import { Profile } from '@/lib/types/profile';

export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProfile() {
      try {
        setIsLoading(true);
        setError(null);
        // TODO: Replace with actual API call
        const response = await fetch(`/api/profiles/${username}`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();

    return () => {
      abortController.abort();
    };
  }, [username]);

  return { profile, isLoading, error };
}

export function useUpdateProfile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      setIsUpdating(true);
      setError(null);

      // TODO: Replace with actual API call
      const response = await fetch('/api/profiles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      return updatedProfile;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating, error };
}

export function useFollowUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const followUser = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      const response = await fetch('/api/follows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to follow user');
      }

      return await response.json();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      const response = await fetch(`/api/follows/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }

      return await response.json();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { followUser, unfollowUser, isLoading, error };
}

export function useIsFollowing(userId: string | null) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();

    async function checkFollowing() {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/follows/check/${userId}`, {
          signal: abortController.signal,
        });
        if (response.ok) {
          const data = await response.json();
          setIsFollowing(data.isFollowing);
        }
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        console.error('Failed to check following status:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkFollowing();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return { isFollowing, isLoading, setIsFollowing };
}
