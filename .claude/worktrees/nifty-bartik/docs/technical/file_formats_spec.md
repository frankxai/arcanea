# Arcanea Platform - File Format Specifications

## Overview

Arcanea uses custom file formats to encapsulate creations, realms, and creator identities as portable, shareable entities. These formats are designed to be:

- **Human-readable**: JSON-based for easy inspection
- **Version-controlled**: Clear versioning for backwards compatibility
- **Interoperable**: Can be imported/exported across platforms
- **Extensible**: Support for future features and metadata

## 1. .arc - Essence File Format

The `.arc` file format represents a single creative essence (image, music, video, text, etc.).

### File Structure

```json
{
  "arcanea": {
    "version": "1.0",
    "format": "essence",
    "created": "2024-01-15T10:30:00Z"
  },
  "essence": {
    "id": "ess_abc123",
    "title": "Ethereal Dawn",
    "description": "A sunrise over magical crystal gardens",
    "type": "IMAGE",
    "creator": {
      "id": "usr_xyz789",
      "username": "mystic_creator",
      "arcaneanId": "ARC-001234",
      "profile": {
        "avatar": "https://cdn.arcanea.ai/avatars/usr_xyz789.webp",
        "name": "Alex Rivera"
      }
    },
    "realm": {
      "id": "rlm_001",
      "name": "Crystal Gardens",
      "slug": "crystal-gardens"
    },
    "files": [
      {
        "type": "primary",
        "url": "https://cdn.arcanea.ai/essences/ess_abc123/original.webp",
        "format": "webp",
        "width": 1024,
        "height": 1024,
        "size": 245678,
        "hash": "sha256:a1b2c3d4e5f6..."
      },
      {
        "type": "thumbnail",
        "url": "https://cdn.arcanea.ai/essences/ess_abc123/thumb.webp",
        "format": "webp",
        "width": 400,
        "height": 400,
        "size": 12345
      }
    ],
    "generation": {
      "aiTools": ["midjourney"],
      "model": "midjourney-v6",
      "prompt": "ethereal dawn over crystal gardens, bioluminescent flora, magical atmosphere, volumetric lighting",
      "negativePrompt": "dark, gloomy, monochrome",
      "seed": 1234567890,
      "parameters": {
        "aspectRatio": "1:1",
        "stylization": 750,
        "chaos": 20,
        "quality": 2
      },
      "iterations": 1,
      "generatedAt": "2024-01-15T10:25:00Z"
    },
    "metadata": {
      "dimensions": {
        "width": 1024,
        "height": 1024
      },
      "colorPalette": [
        "#4444FF",
        "#FF88AA",
        "#88FFAA",
        "#FFAA88"
      ],
      "dominantColors": ["blue", "pink", "green"],
      "technicalData": {
        "format": "webp",
        "colorSpace": "sRGB",
        "bitDepth": 8,
        "compression": "lossy"
      }
    },
    "licensing": {
      "license": "CC_BY_NC",
      "allowRemix": true,
      "allowCommercial": false,
      "attribution": "Alex Rivera (@mystic_creator) - Arcanea Platform"
    },
    "remixing": {
      "isRemix": false,
      "originalEssence": null,
      "remixGeneration": 0,
      "remixChain": [],
      "modifications": null
    },
    "stats": {
      "views": 1234,
      "likes": 128,
      "comments": 23,
      "remixes": 12,
      "downloads": 45
    },
    "tags": [
      "fantasy",
      "ethereal",
      "gardens",
      "magical",
      "sunrise",
      "bioluminescent"
    ],
    "categories": ["art", "landscape", "fantasy"],
    "timestamps": {
      "created": "2024-01-10T14:00:00Z",
      "updated": "2024-01-15T10:30:00Z",
      "published": "2024-01-10T14:30:00Z"
    }
  },
  "manifest": {
    "exportedBy": "usr_xyz789",
    "exportedAt": "2024-01-15T10:30:00Z",
    "exportVersion": "1.0",
    "includesFiles": true,
    "checksum": "sha256:xyz123abc456..."
  }
}
```

### Essence Type Variations

**IMAGE Essence:**
```json
{
  "type": "IMAGE",
  "metadata": {
    "dimensions": { "width": 1024, "height": 1024 },
    "colorPalette": ["#4444FF", "#FF88AA"],
    "dominantColors": ["blue", "pink"]
  }
}
```

**MUSIC Essence:**
```json
{
  "type": "MUSIC",
  "metadata": {
    "duration": 180,
    "tempo": 120,
    "key": "C Major",
    "genre": "orchestral",
    "mood": "epic",
    "instruments": ["strings", "brass", "percussion"],
    "format": "mp3",
    "bitrate": 320,
    "sampleRate": 44100
  }
}
```

**VIDEO Essence:**
```json
{
  "type": "VIDEO",
  "metadata": {
    "duration": 60,
    "dimensions": { "width": 1920, "height": 1080 },
    "frameRate": 30,
    "codec": "h264",
    "format": "mp4",
    "hasAudio": true,
    "audioCodec": "aac"
  }
}
```

**TEXT Essence:**
```json
{
  "type": "TEXT",
  "metadata": {
    "wordCount": 1247,
    "characterCount": 6543,
    "language": "en",
    "genre": "fantasy",
    "format": "markdown"
  }
}
```

### Import/Export Usage

**Export Essence:**
```typescript
// Export single essence
const essenceData = await exportEssence('ess_abc123', {
  includeFiles: true,
  includeMetadata: true,
})

// Save as .arc file
await fs.writeFile('ethereal-dawn.arc', JSON.stringify(essenceData, null, 2))
```

**Import Essence:**
```typescript
// Read .arc file
const arcData = JSON.parse(await fs.readFile('ethereal-dawn.arc', 'utf-8'))

// Validate version
if (arcData.arcanea.version !== '1.0') {
  throw new Error('Unsupported .arc version')
}

// Import into platform
const essence = await importEssence(arcData, {
  preserveIds: false,        // Generate new IDs
  assignToUser: currentUserId,
  assignToRealm: currentRealmId,
})
```

---

## 2. .realm - Realm Export Format

The `.realm` file format represents a complete realm with all its essences and configuration.

### File Structure

```json
{
  "arcanea": {
    "version": "1.0",
    "format": "realm",
    "created": "2024-01-15T10:30:00Z"
  },
  "realm": {
    "id": "rlm_001",
    "name": "Crystal Gardens",
    "slug": "crystal-gardens",
    "description": "A mystical world of bioluminescent flora and ethereal landscapes",
    "tagline": "Where light takes form",
    "creator": {
      "id": "usr_xyz789",
      "username": "mystic_creator",
      "arcaneanId": "ARC-001234",
      "profile": {
        "avatar": "https://cdn.arcanea.ai/avatars/usr_xyz789.webp",
        "name": "Alex Rivera"
      }
    },
    "visual": {
      "thumbnail": "https://cdn.arcanea.ai/realms/rlm_001/thumb.webp",
      "coverImage": "https://cdn.arcanea.ai/realms/rlm_001/cover.webp",
      "color": "#4444FF",
      "theme": {
        "primaryColor": "#4444FF",
        "secondaryColor": "#FF88AA",
        "accentColor": "#88FFAA",
        "backgroundColor": "#0A0A1A",
        "textColor": "#FFFFFF"
      }
    },
    "atmosphere": {
      "mood": "serene",
      "feeling": "magical",
      "keywords": ["ethereal", "luminescent", "peaceful", "mysterious"]
    },
    "configuration": {
      "isPublic": true,
      "isFeatured": false,
      "allowRemix": true,
      "allowCollaboration": true,
      "permissions": {
        "viewing": "public",
        "commenting": "all",
        "remixing": "all"
      }
    },
    "collaborators": [
      {
        "userId": "usr_abc456",
        "username": "co_creator",
        "role": "editor",
        "joinedAt": "2024-01-12T00:00:00Z"
      }
    ],
    "portals": [
      {
        "id": "prt_001",
        "name": "Gateway to Neon City",
        "description": "A portal connecting fantasy and cyberpunk",
        "type": "CROSSOVER",
        "connectedRealmId": "rlm_002",
        "connectedRealm": {
          "name": "Neon Cyberpunk City",
          "slug": "neon-city",
          "creator": "mystic_creator"
        }
      }
    ],
    "essences": [
      {
        "id": "ess_001",
        "title": "Ethereal Dawn",
        "type": "IMAGE",
        "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp",
        "arcFile": "essences/ethereal-dawn.arc",
        "orderIndex": 1
      },
      {
        "id": "ess_023",
        "title": "Garden Melody",
        "type": "MUSIC",
        "thumbnail": "https://cdn.arcanea.ai/essences/ess_023/thumb.webp",
        "arcFile": "essences/garden-melody.arc",
        "orderIndex": 2
      }
    ],
    "stats": {
      "essenceCount": 23,
      "visitors": 1547,
      "likes": 234,
      "remixes": 12,
      "totalViews": 8932
    },
    "tags": [
      "fantasy",
      "magical",
      "bioluminescent",
      "serene",
      "ethereal"
    ],
    "seo": {
      "metaTitle": "Crystal Gardens - A Mystical Realm",
      "metaDescription": "Explore a world of bioluminescent flora and ethereal landscapes",
      "ogImage": "https://cdn.arcanea.ai/realms/rlm_001/og-image.webp"
    },
    "timestamps": {
      "created": "2024-01-01T10:00:00Z",
      "updated": "2024-01-15T10:30:00Z",
      "published": "2024-01-02T00:00:00Z"
    }
  },
  "manifest": {
    "exportedBy": "usr_xyz789",
    "exportedAt": "2024-01-15T10:30:00Z",
    "exportVersion": "1.0",
    "includesEssences": true,
    "essenceFiles": [
      "essences/ethereal-dawn.arc",
      "essences/garden-melody.arc"
    ],
    "totalSize": 15678923,
    "checksum": "sha256:realm123abc456..."
  }
}
```

### Realm Package Structure

When exported as a package, a `.realm` file is accompanied by essence files:

```
crystal-gardens.realm        # Main manifest
essences/
  ethereal-dawn.arc          # Individual essence files
  garden-melody.arc
  mystic-waterfall.arc
  ...
assets/
  thumbnail.webp             # Realm thumbnail
  cover.webp                 # Cover image
  portal-icons/              # Portal visuals
README.md                    # Human-readable description
```

### Import/Export Usage

**Export Realm:**
```typescript
// Export complete realm with all essences
const realmData = await exportRealm('rlm_001', {
  includeEssences: true,
  includeCollaborators: true,
  includePortals: true,
  includeAssets: true,
})

// Create package
await createRealmPackage(realmData, 'crystal-gardens.realm')
```

**Import Realm:**
```typescript
// Read realm package
const realmData = await readRealmPackage('crystal-gardens.realm')

// Import into platform
const realm = await importRealm(realmData, {
  preserveIds: false,
  assignToUser: currentUserId,
  importEssences: true,
  createCollaboratorInvites: true,
})
```

---

## 3. .arcanea - Creator Identity Export

The `.arcanea` file format represents a creator's complete identity and portfolio.

### File Structure

```json
{
  "arcanea": {
    "version": "1.0",
    "format": "identity",
    "created": "2024-01-15T10:30:00Z"
  },
  "creator": {
    "id": "usr_xyz789",
    "username": "mystic_creator",
    "arcaneanId": "ARC-001234",
    "profile": {
      "name": "Alex Rivera",
      "avatar": "https://cdn.arcanea.ai/avatars/usr_xyz789.webp",
      "bio": "Creating magical worlds through AI and imagination",
      "location": "San Francisco, CA",
      "website": "https://alex-creates.com",
      "social": {
        "twitter": "@alexcreates",
        "instagram": "@mystic.creator",
        "discord": "mystic_creator#1234"
      }
    },
    "tier": "CREATOR",
    "stats": {
      "essencesCreated": 47,
      "realmsOwned": 3,
      "remixesMade": 12,
      "followers": 234,
      "following": 89,
      "totalLikes": 1843,
      "totalViews": 15234,
      "arcBalance": 1500,
      "neaBalance": 50
    },
    "guardian": {
      "id": "grd_abc123",
      "name": "Lumina",
      "avatar": "https://cdn.arcanea.ai/guardians/lumina.webp",
      "bondLevel": 12,
      "specializations": ["visual creation", "storytelling", "motivation"]
    },
    "academies": [
      {
        "id": "acd_draconic",
        "name": "Draconic Academy",
        "enrolledAt": "2024-01-01T10:00:00Z",
        "coursesCompleted": 2,
        "totalCourses": 6,
        "certificates": [
          {
            "courseId": "crs_001",
            "courseName": "Foundations of Visual Creation",
            "completedAt": "2024-01-10T00:00:00Z",
            "certificateUrl": "https://certificates.arcanea.ai/cert_123.pdf"
          }
        ]
      }
    ],
    "realms": [
      {
        "id": "rlm_001",
        "name": "Crystal Gardens",
        "slug": "crystal-gardens",
        "essenceCount": 23,
        "featured": true,
        "realmFile": "realms/crystal-gardens.realm"
      },
      {
        "id": "rlm_002",
        "name": "Neon Cyberpunk City",
        "slug": "neon-city",
        "essenceCount": 18,
        "featured": false,
        "realmFile": "realms/neon-city.realm"
      }
    ],
    "featuredEssences": [
      {
        "id": "ess_001",
        "title": "Ethereal Dawn",
        "type": "IMAGE",
        "thumbnail": "https://cdn.arcanea.ai/essences/ess_001/thumb.webp",
        "arcFile": "essences/ethereal-dawn.arc"
      }
    ],
    "achievements": [
      {
        "id": "ach_001",
        "name": "First Essence",
        "description": "Created your first magical essence",
        "icon": "✨",
        "rarity": "COMMON",
        "earnedAt": "2024-01-01T11:00:00Z"
      },
      {
        "id": "ach_012",
        "name": "Master Creator",
        "description": "Created 50 essences",
        "icon": "🎨",
        "rarity": "RARE",
        "earnedAt": "2024-01-14T00:00:00Z"
      }
    ],
    "preferences": {
      "theme": "dark",
      "language": "en",
      "notifications": {
        "essenceLiked": true,
        "essenceCommented": true,
        "essenceRemixed": true,
        "newFollower": true
      },
      "privacy": {
        "showEmail": false,
        "showRealms": true,
        "showStats": true
      }
    },
    "timestamps": {
      "joined": "2024-01-01T10:00:00Z",
      "lastActive": "2024-01-15T10:30:00Z"
    }
  },
  "manifest": {
    "exportedBy": "usr_xyz789",
    "exportedAt": "2024-01-15T10:30:00Z",
    "exportVersion": "1.0",
    "includesRealms": true,
    "includesEssences": true,
    "totalSize": 125678923,
    "checksum": "sha256:identity123abc..."
  }
}
```

### Creator Package Structure

```
mystic_creator.arcanea       # Main identity file
realms/
  crystal-gardens.realm      # Realm exports
  neon-city.realm
essences/
  ethereal-dawn.arc          # Featured essences
  garden-melody.arc
assets/
  avatar.webp                # Profile assets
  banner.webp
certificates/
  visual-foundations.pdf     # Academy certificates
README.md                    # Profile overview
```

### Import/Export Usage

**Export Creator Identity:**
```typescript
// Export complete creator profile
const creatorData = await exportCreatorIdentity('usr_xyz789', {
  includeRealms: true,
  includeFeaturedEssences: true,
  includeAchievements: true,
  includeCertificates: true,
  includeGuardianData: false, // Privacy option
})

// Create package
await createCreatorPackage(creatorData, 'mystic_creator.arcanea')
```

**Import Creator Identity:**
```typescript
// Read creator package
const creatorData = await readCreatorPackage('mystic_creator.arcanea')

// Import (for migration or backup restoration)
const creator = await importCreatorIdentity(creatorData, {
  mergeWithExisting: true,
  preserveIds: true,
  importRealms: true,
  importEssences: true,
})
```

---

## 4. File Format Validation

### JSON Schema

Each format has a JSON Schema for validation:

**essence.schema.json:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Arcanea Essence Format",
  "type": "object",
  "required": ["arcanea", "essence", "manifest"],
  "properties": {
    "arcanea": {
      "type": "object",
      "required": ["version", "format", "created"],
      "properties": {
        "version": { "type": "string", "pattern": "^\\d+\\.\\d+$" },
        "format": { "const": "essence" },
        "created": { "type": "string", "format": "date-time" }
      }
    },
    "essence": {
      "type": "object",
      "required": ["id", "title", "type", "creator"]
      // ... full schema
    }
  }
}
```

### Validation Library

```typescript
import Ajv from 'ajv'
import essenceSchema from './schemas/essence.schema.json'
import realmSchema from './schemas/realm.schema.json'
import identitySchema from './schemas/identity.schema.json'

const ajv = new Ajv()

export function validateEssenceFile(data: unknown): boolean {
  const validate = ajv.compile(essenceSchema)
  return validate(data)
}

export function validateRealmFile(data: unknown): boolean {
  const validate = ajv.compile(realmSchema)
  return validate(data)
}

export function validateIdentityFile(data: unknown): boolean {
  const validate = ajv.compile(identitySchema)
  return validate(data)
}
```

---

## 5. Version Migration

### Handling Version Updates

```typescript
interface VersionMigration {
  from: string
  to: string
  migrate: (data: any) => any
}

const migrations: VersionMigration[] = [
  {
    from: '1.0',
    to: '1.1',
    migrate: (data) => {
      // Add new fields
      return {
        ...data,
        essence: {
          ...data.essence,
          accessibility: {
            altText: data.essence.description,
            contentWarnings: []
          }
        }
      }
    }
  }
]

export function migrateFile(data: any, targetVersion: string): any {
  let currentVersion = data.arcanea.version
  let migratedData = { ...data }

  while (currentVersion !== targetVersion) {
    const migration = migrations.find(m => m.from === currentVersion)
    if (!migration) {
      throw new Error(`No migration path from ${currentVersion} to ${targetVersion}`)
    }

    migratedData = migration.migrate(migratedData)
    currentVersion = migration.to
  }

  return migratedData
}
```

---

## 6. Use Cases

### Portability

**Export and share your creation:**
```bash
# Export single essence
arcanea export essence ess_abc123 --output ethereal-dawn.arc

# Export entire realm
arcanea export realm rlm_001 --output crystal-gardens.realm --include-essences

# Export creator portfolio
arcanea export identity usr_xyz789 --output mystic_creator.arcanea --full
```

### Collaboration

**Share work with collaborators:**
```bash
# Collaborator receives .arc file
# Imports into their own realm
arcanea import essence ethereal-dawn.arc --realm my-realm

# Proper attribution and remix chain maintained
```

### Migration

**Move between platforms or backup:**
```bash
# Full backup
arcanea export identity usr_xyz789 --output backup-2024-01-15.arcanea

# Restore on new device
arcanea import identity backup-2024-01-15.arcanea --merge
```

### Marketplace

**Package creations for sale/distribution:**
```bash
# Create marketplace package
arcanea package essence ess_abc123 \
  --include-license \
  --include-generation-params \
  --output marketplace/ethereal-dawn.arc
```

---

## 7. MIME Types

Register custom MIME types for Arcanea formats:

```
application/arcanea.essence+json     (.arc files)
application/arcanea.realm+json       (.realm files)
application/arcanea.identity+json    (.arcanea files)
```

### Browser Handling

```html
<!-- Download with proper MIME type -->
<a href="/api/essences/ess_123/download" download="essence.arc"
   type="application/arcanea.essence+json">
  Download Essence
</a>
```

---

**These file formats enable true portability and ownership of Arcanean creations, making magic shareable across the platform and beyond.**
