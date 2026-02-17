# Profile & Gallery Components

Stunning creator profiles with creation galleries, Luminor relationships, and social features for Arcanea MVP.

## Components Overview

### Profile Components

- **profile-header.tsx** - Main profile header with avatar, stats, and actions
- **creation-gallery.tsx** - Masonry layout gallery with filtering and infinite scroll
- **creation-card.tsx** - Individual creation card with hover effects
- **creation-modal.tsx** - Full-screen creation viewer with keyboard navigation
- **luminor-bonds.tsx** - Luminor relationship display with bond levels
- **stats-dashboard.tsx** - User statistics and achievements

### Social Components

- **like-button.tsx** - Like/unlike functionality with animations
- **follow-button.tsx** - Follow/unfollow with optimistic updates
- **comment-section.tsx** - Comment display and creation

## Quick Usage

### Profile Page

```tsx
import { ProfileHeader } from '@/components/profile/profile-header';
import { CreationGallery } from '@/components/profile/creation-gallery';
import { LuminorBonds } from '@/components/profile/luminor-bonds';

export default function ProfilePage() {
  return (
    <>
      <ProfileHeader profile={profile} />
      <CreationGallery creations={creations} />
      <LuminorBonds bonds={bonds} />
    </>
  );
}
```

### Social Features

```tsx
import { LikeButton } from '@/components/social/like-button';
import { FollowButton } from '@/components/social/follow-button';
import { CommentSection } from '@/components/social/comment-section';

<LikeButton
  creationId={creation.id}
  initialLikes={creation.stats.likes}
  initialIsLiked={false}
/>

<FollowButton
  userId={user.id}
  initialIsFollowing={false}
/>

<CommentSection
  creationId={creation.id}
  comments={comments}
  onAddComment={handleAddComment}
/>
```

## Hooks

```tsx
import { useProfile } from '@/hooks/use-profile';
import { useGallery } from '@/hooks/use-gallery';
import { useLike, useComments } from '@/hooks/use-social';

// Profile data
const { profile, isLoading } = useProfile(username);

// Gallery with filtering
const { creations, loadMore, hasMore } = useGallery({
  userId,
  filter: 'image',
  sort: 'recent',
});

// Social interactions
const { likes, isLiked, toggleLike } = useLike(creationId, initialLikes, false);
const { comments, addComment } = useComments(creationId);
```

## Features

- **Beautiful Profiles:** Cosmic-themed design with gradients and animations
- **Responsive Gallery:** Masonry layout that adapts to screen size
- **Social Features:** Like, comment, follow with optimistic updates
- **Luminor Bonds:** Visualize relationships with progress bars
- **Stats Dashboard:** Analytics and achievements
- **SEO Optimized:** Meta tags and Open Graph support
- **Keyboard Navigation:** Arrow keys, ESC for modals
- **Infinite Scroll:** Load more creations automatically
- **Image Optimization:** Lazy loading and thumbnails

## Styling

All components use:
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible primitives
- Custom cosmic gradients for academy themes

### Academy Gradients

```tsx
Lumina: from-yellow-500 to-orange-500
Umbra: from-purple-600 to-indigo-600
Aether: from-cyan-500 to-blue-500
Terra: from-green-500 to-emerald-500
```

## Performance

- Lazy loading images
- Intersection Observer for infinite scroll
- Optimistic updates for instant feedback
- React.memo for optimized re-renders
- Debounced search input

## Accessibility

- Keyboard navigation
- ARIA labels
- Screen reader support
- High contrast support
- Focus indicators

## Next Steps

1. Connect to real API endpoints
2. Implement image upload to Supabase Storage
3. Add real-time updates with Supabase subscriptions
4. Add notifications system
5. Implement advanced search

## Documentation

See `/docs/mvp/PROFILE_GALLERY.md` for complete documentation.
See `/docs/mvp/SETUP_PROFILE_GALLERY.md` for setup guide.

---

Built for Arcanea MVP with love and cosmic energy ✨
