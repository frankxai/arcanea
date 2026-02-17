# Arcanea Platform - RESTful API Design

## API Design Principles

### Core Principles
1. **RESTful**: Resource-oriented URLs, HTTP verbs, standard status codes
2. **Versioned**: All APIs under `/api/v1/` for future compatibility
3. **Consistent**: Uniform response structure, error handling, pagination
4. **Secure**: Authentication required, rate-limited, input validated
5. **Fast**: Edge-optimized, cached when possible, streaming for AI

### Base URL Structure
```
Production:
  https://api.arcanea.ai/v1/*

Development:
  http://localhost:3000/api/v1/*
```

### Authentication
All requests (except public endpoints) require Bearer token:
```http
Authorization: Bearer <jwt_token>
```

### Standard Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

---

## 1. Authentication & Users

### POST /auth/register
Register a new user and create their Arcanean identity.

**Request:**
```json
{
  "email": "creator@example.com",
  "password": "securePassword123",
  "username": "mystic_creator",
  "name": "Alex Rivera"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "creator@example.com",
      "username": "mystic_creator",
      "name": "Alex Rivera",
      "arcaneanId": "ARC-001234",
      "tier": "EXPLORER",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "session": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresAt": "2024-01-15T22:30:00Z"
    }
  }
}
```

### POST /auth/login
Authenticate existing user.

**Request:**
```json
{
  "email": "creator@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "session": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresAt": "2024-01-15T22:30:00Z"
    }
  }
}
```

### POST /auth/logout
Invalidate current session.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Successfully logged out"
  }
}
```

### GET /users/me
Get current user profile and Arcanean identity.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "creator@example.com",
    "username": "mystic_creator",
    "name": "Alex Rivera",
    "arcaneanId": "ARC-001234",
    "tier": "CREATOR",
    "profile": {
      "avatar": "https://cdn.arcanea.ai/avatars/usr_abc123.webp",
      "bio": "Creating magical worlds through AI",
      "location": "San Francisco, CA",
      "website": "https://alex-creates.com"
    },
    "stats": {
      "essencesCreated": 47,
      "realmsOwned": 3,
      "remixesMade": 12,
      "arcBalance": 1500,
      "neaBalance": 50
    },
    "guardian": {
      "id": "grd_xyz789",
      "name": "Lumina",
      "bondLevel": 12
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "lastActiveAt": "2024-01-15T10:30:00Z"
  }
}
```

### PATCH /users/me
Update current user profile.

**Request:**
```json
{
  "name": "Alex Rivera",
  "profile": {
    "bio": "Creating magical worlds through AI and code",
    "website": "https://alex-creates.com"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "name": "Alex Rivera",
    "profile": { ... }
  }
}
```

---

## 2. Creators & Arcanean Identity

### GET /creators/:username
Get public creator profile by username.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "username": "mystic_creator",
    "arcaneanId": "ARC-001234",
    "name": "Alex Rivera",
    "avatar": "https://cdn.arcanea.ai/avatars/usr_abc123.webp",
    "bio": "Creating magical worlds through AI",
    "tier": "CREATOR",
    "stats": {
      "essencesCreated": 47,
      "realmsOwned": 3,
      "followers": 234,
      "following": 89
    },
    "badges": [
      {
        "id": "badge_001",
        "name": "First Essence",
        "icon": "✨",
        "rarity": "COMMON"
      }
    ],
    "featuredRealms": [
      {
        "id": "rlm_001",
        "name": "Crystal Gardens",
        "thumbnail": "https://cdn.arcanea.ai/realms/rlm_001/thumb.webp"
      }
    ],
    "joinedAt": "2024-01-01T10:00:00Z"
  }
}
```

### GET /creators/:username/essences
Get creator's public essences.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `perPage` (number): Items per page (default: 20, max: 100)
- `type` (string): Filter by type (IMAGE, MUSIC, VIDEO, TEXT, CODE)
- `sort` (string): Sort order (recent, popular, oldest)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ess_001",
      "title": "Ethereal Dawn",
      "type": "IMAGE",
      "description": "A sunrise over magical crystal gardens",
      "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp",
      "likes": 128,
      "remixes": 12,
      "createdAt": "2024-01-10T14:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 3. Guardian - Personal AI Companion

### GET /guardian/profile
Get user's Guardian information.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "grd_xyz789",
    "name": "Lumina",
    "avatar": "https://cdn.arcanea.ai/guardians/lumina.webp",
    "personality": {
      "traits": ["wise", "encouraging", "creative", "patient"],
      "voice": "warm and inspiring"
    },
    "bondLevel": 12,
    "bondXp": 2450,
    "nextLevelXp": 3000,
    "memoriesCount": 147,
    "conversationsCount": 89,
    "specializations": ["visual creation", "storytelling", "motivation"],
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### POST /guardian/chat
Send message to Guardian and get response.

**Request:**
```json
{
  "message": "I want to create a magical forest scene but I'm not sure where to start",
  "context": {
    "currentRealm": "rlm_001",
    "recentEssences": ["ess_045", "ess_046"],
    "mood": "creative"
  }
}
```

**Response (200 OK) - Streaming:**
```json
{
  "success": true,
  "data": {
    "id": "msg_001",
    "guardianId": "grd_xyz789",
    "message": "What a wonderful vision! Let's create something truly magical together. Start by thinking about the atmosphere...",
    "suggestions": [
      {
        "type": "tool",
        "tool": "image-generation",
        "prompt": "magical forest at twilight, bioluminescent plants, ethereal atmosphere"
      },
      {
        "type": "lesson",
        "academy": "draconic",
        "module": "visual-composition"
      }
    ],
    "bondXpGained": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /guardian/memories
Retrieve Guardian's memories of user.

**Query Parameters:**
- `page` (number): Page number
- `type` (string): Filter by memory type
- `search` (string): Semantic search query

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "mem_001",
      "type": "creation_insight",
      "content": "Creator loves fantasy themes with ethereal lighting",
      "importance": 8,
      "relatedEssences": ["ess_001", "ess_023"],
      "createdAt": "2024-01-05T15:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 4. Luminors - Specialized AI Assistants

### GET /luminors
List all available Luminors.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "lum_001",
      "name": "Lumina",
      "slug": "lumina",
      "title": "The Vision Crafter",
      "specialty": "Visual Creation",
      "avatar": "https://cdn.arcanea.ai/luminors/lumina.webp",
      "color": "#4444FF",
      "academyId": "acd_draconic",
      "description": "Master of visual synthesis and artistic expression",
      "expertise": ["image generation", "art direction", "visual storytelling"],
      "available": true
    },
    {
      "id": "lum_002",
      "name": "Harmonix",
      "slug": "harmonix",
      "title": "The Sound Shaper",
      "specialty": "Music Creation",
      "avatar": "https://cdn.arcanea.ai/luminors/harmonix.webp",
      "color": "#FF4444",
      "academyId": "acd_creation",
      "description": "Conductor of melodies and master of sonic magic",
      "expertise": ["music composition", "sound design", "audio production"],
      "available": true
    }
  ]
}
```

### GET /luminors/:slug
Get detailed Luminor profile.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "lum_001",
    "name": "Lumina",
    "slug": "lumina",
    "title": "The Vision Crafter",
    "specialty": "Visual Creation",
    "avatar": "https://cdn.arcanea.ai/luminors/lumina.webp",
    "color": "#4444FF",
    "personality": {
      "traits": ["inspiring", "artistic", "patient", "perceptive"],
      "teachingStyle": "Visual metaphors and hands-on creation",
      "voice": "Encouraging and aesthetically focused"
    },
    "expertise": ["image generation", "art direction", "visual storytelling"],
    "tools": ["midjourney", "stable-diffusion", "dalle"],
    "academy": {
      "id": "acd_draconic",
      "name": "Draconic Academy",
      "slug": "draconic"
    },
    "stats": {
      "studentsGuided": 1247,
      "essencesCreated": 15678,
      "averageRating": 4.8
    }
  }
}
```

### POST /luminors/:slug/consult
Get guidance from a specific Luminor.

**Request:**
```json
{
  "question": "How can I improve the composition of my fantasy landscape?",
  "context": {
    "essenceId": "ess_045",
    "currentSkillLevel": "intermediate"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "luminorId": "lum_001",
    "response": "Your composition has great potential! Let's enhance it with the rule of thirds...",
    "suggestions": [
      {
        "type": "technique",
        "name": "Rule of Thirds",
        "description": "Position key elements at intersection points"
      },
      {
        "type": "example",
        "essenceId": "ess_reference_001",
        "title": "Mastering Composition"
      }
    ],
    "nextSteps": [
      "Try regenerating with focal point shifted",
      "Experiment with foreground elements"
    ]
  }
}
```

---

## 5. Academies & Learning

### GET /academies
List all Academies.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "acd_atlantean",
      "name": "Atlantean Academy",
      "slug": "atlantean",
      "tagline": "Master the Art of Story",
      "description": "Underwater realm of narrative wisdom",
      "color": "#0088CC",
      "icon": "🌊",
      "luminorId": "lum_scripta",
      "focus": "Storytelling & Lore Creation",
      "difficulty": "BEGINNER",
      "estimatedHours": 40,
      "studentCount": 2341,
      "courseCount": 6,
      "thumbnail": "https://cdn.arcanea.ai/academies/atlantean/thumb.webp"
    }
  ]
}
```

### GET /academies/:slug
Get detailed Academy information.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "acd_draconic",
    "name": "Draconic Academy",
    "slug": "draconic",
    "tagline": "Craft Visual Magic",
    "description": "Sky-bound academy in the clouds of Arcanea",
    "color": "#4444FF",
    "luminor": {
      "id": "lum_001",
      "name": "Lumina",
      "avatar": "https://cdn.arcanea.ai/luminors/lumina.webp"
    },
    "curriculum": [
      {
        "id": "crs_001",
        "title": "Foundations of Visual Creation",
        "slug": "visual-foundations",
        "difficulty": "BEGINNER",
        "durationWeeks": 4,
        "moduleCount": 12,
        "enrolled": false
      }
    ],
    "stats": {
      "totalStudents": 3456,
      "activeStudents": 1234,
      "completionRate": 0.67,
      "averageRating": 4.7
    }
  }
}
```

### POST /academies/:slug/enroll
Enroll in an Academy (creates enrollment for all courses).

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "academyId": "acd_draconic",
    "enrolledCourses": [
      {
        "courseId": "crs_001",
        "enrollmentId": "enr_001",
        "startedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### GET /courses/:id
Get course details and modules.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "crs_001",
    "title": "Foundations of Visual Creation",
    "slug": "visual-foundations",
    "description": "Learn the fundamentals of AI-assisted visual art",
    "difficulty": "BEGINNER",
    "durationWeeks": 4,
    "academyId": "acd_draconic",
    "modules": [
      {
        "id": "mod_001",
        "title": "Understanding AI Image Generation",
        "weekNumber": 1,
        "orderIndex": 1,
        "duration": "2 hours",
        "status": "COMPLETED"
      },
      {
        "id": "mod_002",
        "title": "Prompt Engineering Basics",
        "weekNumber": 1,
        "orderIndex": 2,
        "duration": "3 hours",
        "status": "IN_PROGRESS"
      }
    ],
    "enrollment": {
      "id": "enr_001",
      "progressPercent": 25.5,
      "currentModuleId": "mod_002",
      "enrolledAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### GET /modules/:id
Get module content and projects.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "mod_002",
    "title": "Prompt Engineering Basics",
    "description": "Master the art of crafting effective prompts",
    "weekNumber": 1,
    "content": {
      "sections": [
        {
          "type": "lesson",
          "title": "Anatomy of a Prompt",
          "content": "...",
          "media": []
        },
        {
          "type": "exercise",
          "title": "Practice: Write Your First Prompt",
          "instructions": "..."
        }
      ]
    },
    "projects": [
      {
        "id": "prj_spec_001",
        "title": "Create a Fantasy Character",
        "description": "Use prompt engineering to generate a unique character",
        "requiredTools": ["stable-diffusion"],
        "estimatedTime": "30 minutes"
      }
    ],
    "userProgress": {
      "status": "IN_PROGRESS",
      "timeSpent": 45,
      "completedSections": 2,
      "totalSections": 5
    }
  }
}
```

### POST /modules/:id/complete
Mark module as completed.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "moduleId": "mod_002",
    "status": "COMPLETED",
    "completedAt": "2024-01-15T11:30:00Z",
    "arcAwarded": 50,
    "achievements": [
      {
        "id": "ach_001",
        "name": "First Steps",
        "description": "Complete your first module"
      }
    ]
  }
}
```

---

## 6. Realms - Creator Universes

### GET /realms
Get user's Realms or discover public Realms.

**Query Parameters:**
- `mine` (boolean): Only my Realms
- `public` (boolean): Only public Realms
- `featured` (boolean): Featured Realms
- `search` (string): Search query

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "rlm_001",
      "name": "Crystal Gardens",
      "slug": "crystal-gardens",
      "description": "A mystical world of bioluminescent flora",
      "thumbnail": "https://cdn.arcanea.ai/realms/rlm_001/thumb.webp",
      "isPublic": true,
      "creator": {
        "username": "mystic_creator",
        "arcaneanId": "ARC-001234"
      },
      "stats": {
        "essences": 23,
        "visitors": 1547,
        "remixes": 12
      },
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### POST /realms
Create a new Realm.

**Request:**
```json
{
  "name": "Neon Cyberpunk City",
  "slug": "neon-city",
  "description": "A futuristic metropolis of light and technology",
  "isPublic": false,
  "theme": {
    "primaryColor": "#FF00FF",
    "atmosphere": "cyberpunk",
    "mood": "energetic"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "rlm_002",
    "name": "Neon Cyberpunk City",
    "slug": "neon-city",
    "url": "https://realms.arcanea.ai/mystic_creator/neon-city",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /realms/:id
Get detailed Realm information.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "rlm_001",
    "name": "Crystal Gardens",
    "slug": "crystal-gardens",
    "description": "A mystical world of bioluminescent flora",
    "isPublic": true,
    "creator": {
      "id": "usr_abc123",
      "username": "mystic_creator",
      "arcaneanId": "ARC-001234",
      "avatar": "https://cdn.arcanea.ai/avatars/usr_abc123.webp"
    },
    "theme": {
      "primaryColor": "#4444FF",
      "atmosphere": "magical",
      "mood": "serene"
    },
    "essences": [
      {
        "id": "ess_001",
        "title": "Ethereal Dawn",
        "type": "IMAGE",
        "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp"
      }
    ],
    "stats": {
      "totalEssences": 23,
      "visitors": 1547,
      "likes": 234,
      "remixes": 12
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-15T09:00:00Z"
  }
}
```

### PATCH /realms/:id
Update Realm details.

**Request:**
```json
{
  "description": "Updated description",
  "isPublic": true
}
```

### DELETE /realms/:id
Delete a Realm.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Realm deleted successfully"
  }
}
```

### GET /realms/:id/export
Export Realm as .realm file.

**Response (200 OK):**
```
Content-Type: application/arcanea.realm+json
Content-Disposition: attachment; filename="crystal-gardens.realm"

{
  "version": "1.0",
  "realm": { ... },
  "essences": [ ... ],
  "manifest": { ... }
}
```

---

## 7. Essences - Creations

### GET /essences
Browse essences (user's own or public).

**Query Parameters:**
- `mine` (boolean): Only my essences
- `type` (string): Filter by type
- `realmId` (string): Filter by Realm
- `search` (string): Search query
- `sort` (string): Sort order

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ess_001",
      "title": "Ethereal Dawn",
      "type": "IMAGE",
      "description": "A sunrise over magical crystal gardens",
      "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp",
      "url": "https://cdn.arcanea.ai/essences/ess_001/original.webp",
      "creator": {
        "username": "mystic_creator",
        "arcaneanId": "ARC-001234"
      },
      "realmId": "rlm_001",
      "stats": {
        "likes": 128,
        "views": 1234,
        "remixes": 12
      },
      "aiTools": ["midjourney"],
      "isPublic": true,
      "createdAt": "2024-01-10T14:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### POST /essences
Create a new Essence.

**Request (multipart/form-data):**
```
title: "Mystical Forest"
description: "A magical forest scene"
type: IMAGE
realmId: rlm_001
isPublic: true
aiTools: ["stable-diffusion"]
metadata: { ... }
file: <binary>
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "ess_047",
    "title": "Mystical Forest",
    "type": "IMAGE",
    "url": "https://cdn.arcanea.ai/essences/ess_047/original.webp",
    "thumbnail": "https://cdn.arcanea.ai/essences/ess_047/thumb.webp",
    "arcAwarded": 10,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /essences/:id
Get detailed Essence information.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "ess_001",
    "title": "Ethereal Dawn",
    "type": "IMAGE",
    "description": "A sunrise over magical crystal gardens",
    "url": "https://cdn.arcanea.ai/essences/ess_001/original.webp",
    "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp",
    "creator": {
      "id": "usr_abc123",
      "username": "mystic_creator",
      "arcaneanId": "ARC-001234",
      "avatar": "https://cdn.arcanea.ai/avatars/usr_abc123.webp"
    },
    "realm": {
      "id": "rlm_001",
      "name": "Crystal Gardens",
      "slug": "crystal-gardens"
    },
    "metadata": {
      "width": 1024,
      "height": 1024,
      "format": "webp",
      "size": 245678
    },
    "aiTools": ["midjourney"],
    "generationParams": {
      "prompt": "ethereal dawn over crystal gardens, bioluminescent flora",
      "model": "midjourney-v6",
      "seed": 12345
    },
    "stats": {
      "likes": 128,
      "views": 1234,
      "remixes": 12,
      "comments": 23
    },
    "isPublic": true,
    "createdAt": "2024-01-10T14:00:00Z"
  }
}
```

### DELETE /essences/:id
Delete an Essence.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Essence deleted successfully"
  }
}
```

### GET /essences/:id/download
Download Essence as .arc file.

**Response (200 OK):**
```
Content-Type: application/arcanea.essence+json
Content-Disposition: attachment; filename="ethereal-dawn.arc"

{
  "version": "1.0",
  "essence": { ... },
  "manifest": { ... }
}
```

---

## 8. Remixes - Collaboration

### POST /essences/:id/remix
Create a remix of an Essence.

**Request:**
```json
{
  "title": "Ethereal Sunset (Remix)",
  "description": "A warmer take on the original",
  "modifications": {
    "prompt": "warm sunset colors, golden hour lighting",
    "baseEssenceId": "ess_001"
  },
  "realmId": "rlm_001",
  "creditOriginal": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "ess_048",
    "title": "Ethereal Sunset (Remix)",
    "originalEssence": {
      "id": "ess_001",
      "title": "Ethereal Dawn",
      "creator": "mystic_creator"
    },
    "remixChain": ["ess_001", "ess_048"],
    "arcShared": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /essences/:id/remixes
Get all remixes of an Essence.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ess_048",
      "title": "Ethereal Sunset (Remix)",
      "thumbnail": "https://cdn.arcanea.ai/essences/ess_048/thumb.webp",
      "creator": {
        "username": "another_creator",
        "arcaneanId": "ARC-005678"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "totalRemixes": 12,
    "remixTree": { ... }
  }
}
```

---

## 9. Economy - ARC & NEA

### GET /economy/balance
Get user's ARC and NEA balance.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "arc": {
      "balance": 1500,
      "earned": 2300,
      "spent": 800,
      "dailyRegeneration": 100,
      "nextRegen": "2024-01-16T00:00:00Z"
    },
    "nea": {
      "balance": 50,
      "earned": 75,
      "spent": 25,
      "votingPower": 50
    }
  }
}
```

### GET /economy/transactions
Get transaction history.

**Query Parameters:**
- `type` (string): Filter by ARC or NEA
- `page` (number): Page number

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "txn_001",
      "type": "ARC",
      "amount": 10,
      "balance": 1500,
      "reason": "Essence created",
      "metadata": {
        "essenceId": "ess_047"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "txn_002",
      "type": "ARC",
      "amount": -50,
      "balance": 1490,
      "reason": "AI generation",
      "metadata": {
        "tool": "stable-diffusion",
        "count": 5
      },
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 10. AI Tools Integration

### POST /ai/generate/image
Generate an image using AI.

**Request:**
```json
{
  "prompt": "mystical forest with bioluminescent plants",
  "model": "stable-diffusion-xl",
  "parameters": {
    "width": 1024,
    "height": 1024,
    "steps": 30,
    "guidance": 7.5
  },
  "saveAsEssence": true,
  "realmId": "rlm_001"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "jobId": "job_img_001",
    "status": "processing",
    "estimatedTime": 15,
    "arcCost": 10
  }
}
```

### GET /ai/jobs/:id
Check AI generation job status.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "jobId": "job_img_001",
    "status": "completed",
    "result": {
      "url": "https://cdn.arcanea.ai/generations/job_img_001.webp",
      "essenceId": "ess_049"
    },
    "processingTime": 12,
    "completedAt": "2024-01-15T10:30:12Z"
  }
}
```

### POST /ai/generate/music
Generate music using Suno.

**Request:**
```json
{
  "prompt": "epic fantasy orchestral theme",
  "duration": 60,
  "genre": "orchestral",
  "mood": "heroic",
  "saveAsEssence": true,
  "realmId": "rlm_001"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "jobId": "job_music_001",
    "status": "processing",
    "estimatedTime": 120,
    "arcCost": 50
  }
}
```

---

## 11. Social Features

### POST /essences/:id/like
Like an Essence.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "essenceId": "ess_001",
    "liked": true,
    "totalLikes": 129
  }
}
```

### DELETE /essences/:id/like
Unlike an Essence.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "essenceId": "ess_001",
    "liked": false,
    "totalLikes": 128
  }
}
```

### POST /essences/:id/comments
Add comment to an Essence.

**Request:**
```json
{
  "content": "This is absolutely beautiful! Love the color palette."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "cmt_001",
    "essenceId": "ess_001",
    "content": "This is absolutely beautiful! Love the color palette.",
    "author": {
      "username": "art_lover",
      "arcaneanId": "ARC-009876"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /essences/:id/comments
Get comments for an Essence.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmt_001",
      "content": "This is absolutely beautiful!",
      "author": {
        "username": "art_lover",
        "arcaneanId": "ARC-009876",
        "avatar": "https://cdn.arcanea.ai/avatars/..."
      },
      "likes": 5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 12. Rate Limiting

All API endpoints are rate limited by tier:

| Tier | Requests/Minute | AI Generations/Day |
|------|----------------|-------------------|
| EXPLORER | 60 | 20 |
| CREATOR | 120 | 100 |
| REALM_BUILDER | 300 | Unlimited |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705323000
```

**Rate Limit Exceeded (429):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 30 seconds.",
    "retryAfter": 30
  }
}
```

---

## 13. Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| VALIDATION_ERROR | 400 | Invalid input data |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
| SERVICE_UNAVAILABLE | 503 | Temporary unavailable |

---

## 14. Webhooks

Subscribe to events for real-time notifications:

### Available Events
- `essence.created`
- `essence.remixed`
- `essence.liked`
- `realm.updated`
- `guardian.message`
- `module.completed`
- `achievement.earned`

### Webhook Payload
```json
{
  "event": "essence.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "essenceId": "ess_047",
    "creatorId": "usr_abc123",
    "realmId": "rlm_001"
  }
}
```

---

This API design provides a complete, scalable foundation for all Arcanea Platform features while maintaining consistency, security, and developer experience.
