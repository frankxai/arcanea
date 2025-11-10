# API Quick Reference Guide

Quick reference for Arcanea MVP API endpoints.

## Base URL
```
Development: http://localhost:3001/api
Production: https://arcanea.ai/api
```

## Authentication
All requests require Bearer token:
```
Authorization: Bearer <jwt-token>
```

---

## 📋 Profile APIs

### Get Profile
```http
GET /profile/{userId}
```
Returns profile + statistics

### Update Profile
```http
PATCH /profile/{userId}
Content-Type: application/json

{
  "username": "new_username",
  "bio": "My bio",
  "avatarUrl": "https://..."
}
```

### Get Stats Only
```http
GET /profile/{userId}/stats
```

---

## 🎨 Creation APIs

### List Creations
```http
GET /creations?type=image&page=1&pageSize=20&sortBy=like_count&sortOrder=desc
```

**Query Parameters:**
- `type`: image | music | video | text | multimodal
- `status`: draft | processing | published | archived
- `isPublic`: true | false
- `tags`: comma-separated
- `dateFrom`, `dateTo`: ISO date strings
- `sortBy`: created_at | updated_at | like_count | view_count
- `sortOrder`: asc | desc
- `page`, `pageSize`: pagination

### Create Creation
```http
POST /creations
Content-Type: application/json

{
  "userId": "uuid",
  "title": "My Art",
  "type": "image",
  "fileUrl": "https://...",
  "thumbnailUrl": "https://...",
  "prompt": "creation prompt",
  "tags": ["fantasy", "landscape"],
  "isPublic": true,
  "status": "published"
}
```

### Get Single Creation
```http
GET /creations/{id}
```

### Update Creation
```http
PATCH /creations/{id}
Content-Type: application/json

{
  "userId": "uuid",
  "title": "Updated Title",
  "tags": ["new", "tags"],
  "status": "published"
}
```

### Delete Creation
```http
DELETE /creations/{id}
Content-Type: application/json

{
  "userId": "uuid"
}
```

---

## 🔮 Bond APIs

### Get All Bonds
```http
GET /bonds/{userId}
```

### Get Specific Bond
```http
GET /bonds/{userId}/{luminorId}
```
Auto-creates if doesn't exist

### Get Memories
```http
GET /bonds/{userId}/memories?luminorId={luminorId}
```

### Update Progress
```http
POST /bonds/progress
Content-Type: application/json

{
  "userId": "uuid",
  "luminorId": "uuid",
  "interactionType": "message"
}
```

**Interaction Types & XP:**
- `message`: 5 XP
- `creation`: 20 XP
- `achievement`: 50 XP
- `daily_streak`: 10 XP

---

## 🎯 Bond Levels

| Level | XP Required |
|-------|-------------|
| 1     | 0           |
| 2     | 100         |
| 3     | 250         |
| 4     | 500         |
| 5     | 1,000       |
| 6     | 2,000       |
| 7     | 4,000       |
| 8     | 7,000       |
| 9     | 12,000      |
| 10    | 20,000      |

---

## 📦 Response Format

### Success
```json
{
  "success": true,
  "data": {...},
  "meta": {
    "timestamp": "ISO-8601",
    "pagination": {...}
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

---

## ⚠️ Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | No permission |
| NOT_FOUND | 404 | Resource not found |
| ALREADY_EXISTS | 409 | Duplicate resource |
| VALIDATION_ERROR | 400 | Invalid input |
| INTERNAL_ERROR | 500 | Server error |

---

## 🔧 Validation Rules

### Username
- Length: 3-20 characters
- Pattern: `^[a-zA-Z0-9_-]+$`

### Bio
- Max length: 500 characters

### Title
- Length: 1-100 characters

### Description
- Max length: 2000 characters

### Tags
- Max count: 10 per creation
- Max length: 30 characters each

---

## 🧪 Testing Examples

### cURL
```bash
# Get profile
curl http://localhost:3001/api/profile/user-id \
  -H "Authorization: Bearer token"

# Create creation
curl -X POST http://localhost:3001/api/creations \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid","title":"Art","type":"image","fileUrl":"https://..."}'

# Update bond
curl -X POST http://localhost:3001/api/bonds/progress \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid","luminorId":"uuid","interactionType":"message"}'
```

### JavaScript/TypeScript
```typescript
// Get profile
const response = await fetch('/api/profile/user-id', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();

// Create creation
const response = await fetch('/api/creations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'uuid',
    title: 'My Art',
    type: 'image',
    fileUrl: 'https://...'
  })
});
```

---

## 🚀 React Hook Example

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

// Get profile
function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });
}

// Update profile
function useUpdateProfile() {
  return useMutation({
    mutationFn: async ({ userId, data }) => {
      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  });
}

// List creations
function useCreations(filters: CreationFilters) {
  const params = new URLSearchParams(filters as any);
  return useQuery({
    queryKey: ['creations', filters],
    queryFn: async () => {
      const res = await fetch(`/api/creations?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });
}
```

---

## 📁 Import Paths

```typescript
// Service functions
import {
  getProfile,
  updateProfile,
  getProfileStats
} from '@arcanea/database/services/profile-service';

import {
  listCreations,
  createCreation,
  getCreation
} from '@arcanea/database/services/creation-service';

import {
  getUserBonds,
  updateBondProgress,
  addMemory
} from '@arcanea/database/services/bond-service';

// Types
import type {
  Profile,
  ProfileStats,
  Creation,
  CreationWithCreator,
  LuminorBond,
  ApiResponse
} from '@arcanea/database/types/api-responses';

// Supabase client
import { supabase, supabaseServer } from '@/lib/supabase';
```

---

## 🔗 Related Files

- Full API Docs: `/apps/web/app/api/README.md`
- Database Schema: `/supabase/migrations/`
- Service Layer: `/packages/database/services/`
- Type Definitions: `/packages/database/types/`
- Complete Summary: `/PROFILE_SYSTEM_BACKEND_COMPLETE.md`

---

**Last Updated:** October 24, 2025
