# Profile & Gallery System Documentation

## Overview

The Profile & Gallery system is a comprehensive feature set that enables creators to showcase their AI-generated creations, build relationships with Luminors, and engage with the Arcanea community. This system is designed to be beautiful, performant, and social-first.

## Architecture

### Component Structure

```
apps/web/
├── components/
│   ├── profile/
│   │   ├── profile-header.tsx        # Avatar, stats, bio, actions
│   │   ├── creation-gallery.tsx      # Masonry grid with filtering
│   │   ├── creation-card.tsx         # Individual creation preview
│   │   ├── creation-modal.tsx        # Full-screen creation view
│   │   ├── luminor-bonds.tsx         # Relationship display
│   │   └── stats-dashboard.tsx       # Analytics & achievements
│   └── social/
│       ├── like-button.tsx           # Like functionality
│       ├── follow-button.tsx         # Follow/unfollow
│       └── comment-section.tsx       # Comments UI
├── app/
│   ├── profile/
│   │   ├── [username]/
│   │   │   ├── page.tsx             # Public profile
│   │   │   └── profile-view.tsx     # Client component
│   │   └── edit/
│   │       └── page.tsx             # Edit profile
│   └── discover/
│       └── page.tsx                 # Discovery feed
├── hooks/
│   ├── use-profile.ts               # Profile data hooks
│   ├── use-gallery.ts               # Gallery & creations
│   └── use-social.ts                # Social interactions
└── lib/
    └── types/
        └── profile.ts               # TypeScript types
```

## Core Components

### 1. Profile Header (`profile-header.tsx`)

**Purpose:** Display user information, stats, and primary actions.

**Features:**
- Cosmic gradient avatar with border
- Display name and username
- Bio/description
- Academy affiliations with badges
- Stats bar (creations, followers, following, likes, streak)
- Follow/unfollow button (with optimistic updates)
- Share profile button
- Message button (for other users)
- Edit profile button (own profile only)

**Props:**
```typescript
interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
}
```

**Usage:**
```tsx
<ProfileHeader
  profile={profile}
  isOwnProfile={false}
  isFollowing={isFollowing}
  onFollow={handleFollow}
  onShare={handleShare}
/>
```

### 2. Creation Gallery (`creation-gallery.tsx`)

**Purpose:** Display user creations in a responsive masonry layout.

**Features:**
- Masonry and grid layout toggle
- Filter by type (all, image, video, project, composition)
- Sort options (recent, popular, oldest)
- Infinite scroll support
- Loading states
- Empty states
- Opens creation modal on click

**Props:**
```typescript
interface CreationGalleryProps {
  creations: Creation[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}
```

**Performance Optimizations:**
- Lazy loading images
- Intersection Observer for infinite scroll
- Optimized re-renders with React.memo
- Image thumbnails for faster loading

### 3. Creation Card (`creation-card.tsx`)

**Purpose:** Individual creation preview with hover effects.

**Features:**
- Responsive aspect ratio
- Type badge (image, video, project)
- Academy badge with gradient
- Hover overlay with details
- Stats (likes, comments, views)
- Video play icon
- Luminor badge

**Design Principles:**
- Smooth hover animations
- Gradient borders matching academy
- Responsive to screen size
- Touch-friendly on mobile

### 4. Creation Modal (`creation-modal.tsx`)

**Purpose:** Full-screen view of a creation with details and interactions.

**Features:**
- Full-screen media display (image/video)
- Keyboard navigation (ESC, arrow keys)
- Previous/next navigation
- Like button with animation
- Comment section
- Download button
- Share button
- Creation metadata (prompt, Luminor, academy, tags)
- Stats display

**Keyboard Shortcuts:**
- `ESC` - Close modal
- `←` - Previous creation
- `→` - Next creation

### 5. Luminor Bonds (`luminor-bonds.tsx`)

**Purpose:** Display and visualize relationships with Luminors.

**Features:**
- Bond level progress bars
- Personality compatibility scores
- Total conversations count
- Academy-themed gradients
- Chat with Luminor button
- Summary statistics
- Last interaction timestamp

**Bond Levels:**
- 0-20%: New Connection
- 20-40%: Emerging Link
- 40-60%: Growing Bond
- 60-80%: Deep Connection
- 80-100%: Master Bond

### 6. Stats Dashboard (`stats-dashboard.tsx`)

**Purpose:** Visualize user statistics and achievements.

**Features:**
- Creation type breakdown
- Most used Luminor
- Favorite styles
- Activity stats (streak, likes)
- Achievement badges
- Journey summary

**Achievement System:**
- First Creation - Created first masterpiece
- 10 Creations - Reached 10 total creations
- 100 Likes - Received 100 likes
- 7 Day Streak - Created for 7 days straight

## Pages

### Profile Page (`/profile/[username]`)

**Server Component:** Fetches initial data (profile, creations, bonds)
**Client Component:** Handles interactions and tab navigation

**Tabs:**
1. **Gallery** - All creations with filtering
2. **Luminor Bonds** - Relationship display
3. **Stats** - Analytics dashboard
4. **About** - Bio, links, member since

**SEO Features:**
- Dynamic meta tags
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Structured data (future)

### Edit Profile Page (`/profile/edit`)

**Features:**
- Avatar upload with preview
- Display name and username
- Bio editor (200 char limit)
- Social links (Twitter, Instagram, Website)
- Privacy settings:
  - Show email
  - Show creations
  - Allow follows
- Form validation
- Optimistic updates
- Save/cancel actions

### Discovery Page (`/discover`)

**Features:**
- Search bar (titles, descriptions, tags)
- Filter tabs (Trending, Recent, Following)
- Academy filters
- Responsive grid
- Load more pagination
- Empty states

## React Hooks

### useProfile

```typescript
const { profile, isLoading, error } = useProfile(username);
const { updateProfile, isUpdating, error } = useUpdateProfile();
const { followUser, unfollowUser, isLoading } = useFollowUser();
const { isFollowing, isLoading } = useIsFollowing(userId);
```

### useGallery

```typescript
const {
  creations,
  isLoading,
  error,
  hasMore,
  loadMore,
  refresh
} = useGallery({
  userId,
  filter: 'image',
  sort: 'recent',
  limit: 20
});

const { creation, isLoading, error } = useCreation(creationId);
const { uploadCreation, isUploading, progress } = useUploadCreation();
const { deleteCreation, isDeleting } = useDeleteCreation();
```

### useSocial

```typescript
const { likes, isLiked, toggleLike } = useLike(creationId, initialLikes, initialIsLiked);
const { comments, addComment, deleteComment, likeComment } = useComments(creationId);
const { isFollowing, toggleFollow } = useFollow(userId, initialIsFollowing);
const { share, isSharing } = useShare();
const { isBookmarked, toggleBookmark } = useBookmark(creationId, initialIsBookmarked);
```

## Social Features

### Like System

**Features:**
- Optimistic updates
- Animated heart icon
- Real-time count updates
- Error handling with rollback

**Implementation:**
```tsx
<LikeButton
  creationId={creation.id}
  initialLikes={creation.stats.likes}
  initialIsLiked={false}
  onLike={handleLike}
  size="md"
  showCount={true}
/>
```

### Follow System

**Features:**
- Follow/unfollow toggle
- Optimistic updates
- Visual state changes
- Error handling

### Comment System

**Features:**
- Real-time comment posting
- Comment likes
- Comment deletion (own comments)
- Reply functionality (future)
- Optimistic updates
- Avatar display
- Relative timestamps

## Image Optimization

### Best Practices

1. **Thumbnails:**
   - Generate 400x400px thumbnails
   - Use WebP format
   - Progressive loading
   - Lazy loading

2. **Full Images:**
   - Max 2048x2048px
   - Compress with quality 85
   - Use CDN for delivery
   - Cache headers

3. **Video:**
   - Generate poster images
   - Adaptive streaming (HLS/DASH)
   - Compress with H.264
   - Max 30 seconds for uploads

### Storage Strategy

```
/uploads/
  /{user_id}/
    /creations/
      /{creation_id}/
        /original.{ext}
        /thumbnail.webp
        /medium.webp
        /large.webp
```

## Database Schema Reference

### Tables

**profiles:**
- id (uuid)
- username (unique)
- display_name
- bio
- avatar_url
- created_at
- updated_at

**creations:**
- id (uuid)
- user_id (fk)
- title
- description
- type (enum)
- media_url
- thumbnail_url
- prompt
- luminor_id
- academy
- metadata (jsonb)
- created_at
- updated_at

**luminor_bonds:**
- id (uuid)
- user_id (fk)
- luminor_id
- bond_level (0-100)
- total_conversations
- personality_compatibility (0-100)
- last_interaction
- created_at

**follows:**
- follower_id (fk)
- following_id (fk)
- created_at
- PRIMARY KEY (follower_id, following_id)

**likes:**
- user_id (fk)
- creation_id (fk)
- created_at
- PRIMARY KEY (user_id, creation_id)

**comments:**
- id (uuid)
- creation_id (fk)
- user_id (fk)
- content (text)
- created_at
- updated_at

## API Endpoints (To Implement)

### Profiles
- `GET /api/profiles/:username` - Get profile by username
- `PATCH /api/profiles` - Update own profile
- `POST /api/profiles/avatar` - Upload avatar

### Creations
- `GET /api/creations` - List creations (with filters)
- `GET /api/creations/:id` - Get single creation
- `POST /api/creations/upload` - Upload creation
- `DELETE /api/creations/:id` - Delete creation

### Social
- `POST /api/follows` - Follow user
- `DELETE /api/follows/:userId` - Unfollow user
- `GET /api/follows/check/:userId` - Check if following
- `POST /api/creations/:id/like` - Like creation
- `DELETE /api/creations/:id/like` - Unlike creation
- `GET /api/creations/:id/comments` - Get comments
- `POST /api/creations/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/like` - Like comment

## Performance Considerations

### Frontend Optimization

1. **Code Splitting:**
   - Lazy load creation modal
   - Lazy load stats dashboard
   - Dynamic imports for heavy components

2. **Image Loading:**
   - Use next/image component
   - Implement blur placeholders
   - Lazy load below the fold

3. **State Management:**
   - Optimistic updates for better UX
   - Cache API responses
   - Debounce search input

4. **Bundle Size:**
   - Tree shake unused icons
   - Code split by route
   - Compress assets

### Backend Optimization

1. **Database:**
   - Index on username, user_id, creation_id
   - Composite index on (user_id, created_at)
   - Pagination with cursors

2. **Caching:**
   - Redis for profile data
   - CDN for images
   - Browser cache headers

3. **API:**
   - Rate limiting
   - Response compression
   - GraphQL or tRPC (future)

## Accessibility

### WCAG 2.1 AA Compliance

1. **Keyboard Navigation:**
   - All interactive elements focusable
   - Visible focus indicators
   - Skip links
   - Modal trap focus

2. **Screen Readers:**
   - Semantic HTML
   - ARIA labels
   - Alt text for images
   - Live regions for updates

3. **Visual:**
   - High contrast mode support
   - Minimum 4.5:1 contrast ratio
   - Resizable text
   - No color-only indicators

## Future Enhancements

### Phase 2
- [ ] Collections/playlists
- [ ] Advanced search filters
- [ ] Bulk upload
- [ ] Creation versioning
- [ ] Collaborative creations

### Phase 3
- [ ] Creator analytics dashboard
- [ ] Monetization features
- [ ] NFT minting integration
- [ ] Live streaming
- [ ] Creator marketplace

### Phase 4
- [ ] AI-powered recommendations
- [ ] Auto-tagging with AI
- [ ] Style transfer tools
- [ ] Community challenges
- [ ] Achievement badges

## Testing Strategy

### Unit Tests
- Component rendering
- Hook logic
- Utility functions
- Form validation

### Integration Tests
- API integration
- User flows
- Optimistic updates
- Error handling

### E2E Tests
- Profile viewing
- Creation upload
- Social interactions
- Gallery filtering

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] CDN configured for images
- [ ] Analytics tracking setup
- [ ] Error monitoring (Sentry)
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] SSL certificates valid
- [ ] Backup strategy in place
- [ ] Load testing completed

## Support & Maintenance

### Monitoring
- Error rates
- Page load times
- API response times
- User engagement metrics

### Alerts
- High error rates
- Slow queries
- Storage limits
- Rate limit breaches

## Conclusion

The Profile & Gallery system provides a robust foundation for creators to showcase their work and build community on Arcanea. The architecture is designed for scale, performance, and extensibility, with clear paths for future enhancements.

For questions or contributions, please refer to the main Arcanea documentation or contact the development team.
