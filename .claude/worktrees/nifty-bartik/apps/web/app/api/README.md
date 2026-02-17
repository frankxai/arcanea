# Arcanea MVP API Documentation

Complete backend API system for Arcanea's profile, creation, and bond management features.

## Overview

This API provides RESTful endpoints for:
- **Profile Management**: User profiles with statistics and settings
- **Creation Management**: User-generated content (images, music, videos) with CRUD operations
- **Luminor Bonds**: AI companion relationships with XP, levels, and memories

## Architecture

```
apps/web/app/api/
├── profile/
│   └── [userId]/
│       ├── route.ts           # GET, PATCH profile
│       └── stats/route.ts     # GET statistics
├── creations/
│   ├── route.ts               # GET list, POST create
│   └── [id]/route.ts          # GET, PATCH, DELETE single
└── bonds/
    ├── [userId]/
    │   ├── route.ts           # GET all bonds
    │   ├── [luminorId]/route.ts  # GET specific bond
    │   └── memories/route.ts  # GET memories
    └── progress/route.ts      # POST XP update

packages/database/
├── services/
│   ├── profile-service.ts     # Profile operations
│   ├── creation-service.ts    # Creation CRUD
│   └── bond-service.ts        # Bond management
└── types/
    ├── api-responses.ts       # TypeScript types
    └── supabase.ts            # Database types
```

## API Endpoints

### Profile APIs

#### GET /api/profile/[userId]
Fetch user profile with complete statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "uuid",
      "userId": "uuid",
      "username": "mystical_creator",
      "displayName": "Mystical Creator",
      "bio": "Creating magic with AI",
      "avatarUrl": "https://...",
      "arcaneanId": "ARC-001234",
      "tier": "creator",
      "subscriptionStatus": "active",
      "isVerified": false,
      "createdAt": "2025-01-15T...",
      "updatedAt": "2025-01-20T..."
    },
    "stats": {
      "totalCreations": 42,
      "totalLikes": 156,
      "totalComments": 23,
      "followers": 23,
      "following": 15,
      "activeLuminors": 3,
      "totalBondXp": 1250
    }
  }
}
```

#### PATCH /api/profile/[userId]
Update user profile information.

**Request Body:**
```json
{
  "username": "new_username",
  "displayName": "New Display Name",
  "bio": "Updated bio text",
  "avatarUrl": "https://...",
  "location": "San Francisco, CA",
  "website": "https://mysite.com"
}
```

#### GET /api/profile/[userId]/stats
Get aggregated profile statistics only.

---

### Creation APIs

#### GET /api/creations
List creations with filtering and pagination.

**Query Parameters:**
- `type`: Filter by type (image, music, video, text, multimodal)
- `luminorId`: Filter by Luminor
- `status`: Filter by status (draft, processing, published, archived)
- `isPublic`: Filter by visibility (true/false)
- `tags`: Comma-separated tags
- `dateFrom`: Start date (ISO string)
- `dateTo`: End date (ISO string)
- `sortBy`: Sort field (created_at, updated_at, like_count, view_count)
- `sortOrder`: Sort direction (asc, desc)
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "creations": [
      {
        "id": "uuid",
        "userId": "uuid",
        "title": "Mystical Landscape",
        "description": "A magical scene...",
        "type": "image",
        "fileUrl": "https://...",
        "thumbnailUrl": "https://...",
        "aiTool": "midjourney",
        "prompt": "mystical landscape...",
        "status": "published",
        "isPublic": true,
        "tags": ["fantasy", "landscape"],
        "likeCount": 42,
        "viewCount": 150,
        "createdAt": "2025-01-20T...",
        "creator": {
          "id": "uuid",
          "username": "creator",
          "displayName": "Creator",
          "avatarUrl": "https://...",
          "isVerified": false
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 100,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### POST /api/creations
Create new creation.

**Request Body:**
```json
{
  "userId": "uuid",
  "title": "My Creation",
  "description": "Description text",
  "type": "image",
  "fileUrl": "https://storage.../file.png",
  "thumbnailUrl": "https://storage.../thumb.png",
  "aiTool": "midjourney",
  "prompt": "creation prompt",
  "model": "midjourney-v6",
  "status": "published",
  "isPublic": true,
  "tags": ["tag1", "tag2"],
  "license": "cc_by_nc"
}
```

#### GET /api/creations/[id]
Get single creation with creator info.

**Query Parameters:**
- `includePrivate`: Include private creations (requires ownership)
- `incrementViews`: Increment view count (default: true)

#### PATCH /api/creations/[id]
Update creation metadata.

**Request Body:**
```json
{
  "userId": "uuid",
  "title": "Updated Title",
  "description": "Updated description",
  "status": "published",
  "isPublic": true,
  "tags": ["new", "tags"]
}
```

#### DELETE /api/creations/[id]
Soft delete (archive) creation.

**Request Body:**
```json
{
  "userId": "uuid"
}
```

---

### Bond APIs

#### GET /api/bonds/[userId]
Get all Luminor bonds for a user.

**Response:**
```json
{
  "success": true,
  "data": {
    "bonds": [
      {
        "id": "uuid",
        "name": "Lumina",
        "slug": "lumina",
        "title": "The Vision Crafter",
        "specialty": "Visual Creation",
        "color": "#4444FF",
        "avatarUrl": "https://...",
        "greetingMessage": "Welcome...",
        "bond": {
          "id": "uuid",
          "userId": "uuid",
          "luminorId": "uuid",
          "bondLevel": 3,
          "bondXp": 450,
          "totalInteractions": 25,
          "keyMemories": [...],
          "createdAt": "...",
          "updatedAt": "...",
          "lastInteractionAt": "..."
        }
      }
    ]
  }
}
```

#### GET /api/bonds/[userId]/[luminorId]
Get specific bond between user and Luminor. Creates bond if it doesn't exist.

#### GET /api/bonds/[userId]/memories
Get memories for user across all Luminors.

**Query Parameters:**
- `luminorId`: Optional filter by specific Luminor

#### POST /api/bonds/progress
Update bond XP and progress.

**Request Body:**
```json
{
  "userId": "uuid",
  "luminorId": "uuid",
  "interactionType": "message",
  "metadata": {
    "sessionId": "...",
    "messageCount": 5
  }
}
```

**XP Rewards by Type:**
- `message`: 5 XP
- `creation`: 20 XP
- `achievement`: 50 XP
- `daily_streak`: 10 XP

**Bond Levels:**
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 250 XP
- Level 4: 500 XP
- Level 5: 1,000 XP
- Level 6: 2,000 XP
- Level 7: 4,000 XP
- Level 8: 7,000 XP
- Level 9: 12,000 XP
- Level 10: 20,000 XP

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {...}
  },
  "meta": {
    "timestamp": "2025-01-20T..."
  }
}
```

**Error Codes:**
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `ALREADY_EXISTS`: Duplicate resource
- `VALIDATION_ERROR`: Invalid input
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

**HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `429`: Too Many Requests
- `500`: Internal Server Error

---

## Authentication

All API endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

The token should be obtained from Supabase Auth or NextAuth.

---

## Validation

All endpoints use Zod for input validation:

**Username Rules:**
- Min length: 3 characters
- Max length: 20 characters
- Pattern: Letters, numbers, underscores, hyphens only

**Bio Rules:**
- Max length: 500 characters

**Title Rules:**
- Min length: 1 character
- Max length: 100 characters

**Description Rules:**
- Max length: 2000 characters

**Tags:**
- Max count: 10 per creation
- Max length: 30 characters per tag

---

## Rate Limiting

API rate limits (to be implemented):
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## Database Schema

The API uses Supabase with the following tables:
- `profiles`: User profiles and settings
- `creations`: User-generated content
- `luminors`: AI companions
- `luminor_relationships`: User-Luminor bonds
- `likes`: Creation likes
- `comments`: Creation comments
- `follows`: User follows

See `/supabase/migrations/` for complete schema.

---

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
```bash
cp .env.mvp.example .env.local
```

3. Set Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run migrations:
```bash
cd supabase
supabase db push
```

5. Start dev server:
```bash
pnpm dev:web
```

---

## Testing

Example requests using curl:

```bash
# Get profile
curl http://localhost:3001/api/profile/user-id \
  -H "Authorization: Bearer <token>"

# Update profile
curl -X PATCH http://localhost:3001/api/profile/user-id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"username":"newname","bio":"New bio"}'

# List creations
curl "http://localhost:3001/api/creations?type=image&page=1&pageSize=10" \
  -H "Authorization: Bearer <token>"

# Create creation
curl -X POST http://localhost:3001/api/creations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid","title":"My Art","type":"image","fileUrl":"https://..."}'

# Get bonds
curl http://localhost:3001/api/bonds/user-id \
  -H "Authorization: Bearer <token>"

# Update bond progress
curl -X POST http://localhost:3001/api/bonds/progress \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid","luminorId":"uuid","interactionType":"message"}'
```

---

## Next Steps

1. **Authentication Integration**: Add proper JWT verification with NextAuth or Supabase Auth
2. **Rate Limiting**: Implement rate limiting middleware
3. **Caching**: Add Redis caching for frequently accessed data
4. **Real-time Updates**: Implement WebSocket connections for live updates
5. **File Upload**: Add direct file upload endpoints with Supabase Storage
6. **Analytics**: Track API usage and performance metrics
7. **API Versioning**: Add /v1/ prefix for future API versions

---

## Support

For questions or issues:
- Documentation: `/docs`
- GitHub Issues: https://github.com/frankxai/arcanea/issues
- Email: frank@arcanea.ai
