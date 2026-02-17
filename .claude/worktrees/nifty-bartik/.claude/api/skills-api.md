# Skills API

> **Programmatic access to skill discovery and content**

## Overview

The Skills API provides endpoints for:
- Discovering available skills
- Retrieving skill content
- Filtering by tier and category
- Accessing skill metadata

## Base URL

```
https://api.arcanea.io/v1/skills
```

## Endpoints

### List Skills

Retrieve all available skills.

```http
GET /v1/skills
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `tier` | string | Filter by tier: `community`, `premium`, `arcanea` |
| `category` | string | Filter by category: `development`, `education`, `strategy`, `creative` |
| `search` | string | Search skill names and descriptions |
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Results per page (default: 20, max: 100) |

**Response**

```json
{
  "data": [
    {
      "id": "design-systems",
      "name": "Design Systems",
      "description": "UI component architecture, tokens, and patterns",
      "version": "1.0.0",
      "tier": "community",
      "category": "development",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T00:00:00Z"
    },
    {
      "id": "teacher-team",
      "name": "Teacher Team",
      "description": "Educational AI system with mentor, curriculum, assessor",
      "version": "1.0.0",
      "tier": "premium",
      "category": "education",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

**Example**

```bash
# List all community skills
curl "https://api.arcanea.io/v1/skills?tier=community" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Search for design-related skills
curl "https://api.arcanea.io/v1/skills?search=design" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Get Skill

Retrieve a specific skill with full content.

```http
GET /v1/skills/{skill_id}
```

**Path Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `skill_id` | string | The skill identifier |

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Response format: `full`, `summary`, `metadata` |
| `sections` | string | Comma-separated sections to include |

**Response**

```json
{
  "data": {
    "id": "design-systems",
    "name": "Design Systems",
    "description": "UI component architecture, tokens, and patterns",
    "version": "1.0.0",
    "tier": "community",
    "category": "development",
    "metadata": {
      "author": "Arcanea Team",
      "license": "MIT",
      "tags": ["ui", "css", "components", "tokens"],
      "dependencies": []
    },
    "content": {
      "purpose": "This skill provides comprehensive knowledge...",
      "knowledge": {
        "token_architecture": "Design tokens are...",
        "component_patterns": "Components should..."
      },
      "patterns": [
        {
          "name": "Token Hierarchy",
          "description": "Structure tokens in layers...",
          "template": "..."
        }
      ],
      "examples": [
        {
          "title": "Color Token System",
          "code": "...",
          "explanation": "..."
        }
      ],
      "best_practices": [
        "Use semantic tokens over primitives",
        "Document all token decisions"
      ]
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z"
  }
}
```

**Example**

```bash
# Get full skill content
curl "https://api.arcanea.io/v1/skills/design-systems" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get only patterns section
curl "https://api.arcanea.io/v1/skills/design-systems?sections=patterns" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Get Skill Patterns

Retrieve just the patterns from a skill.

```http
GET /v1/skills/{skill_id}/patterns
```

**Response**

```json
{
  "data": {
    "skill_id": "design-systems",
    "patterns": [
      {
        "id": "token-hierarchy",
        "name": "Token Hierarchy",
        "when_to_use": "Building a new design system",
        "steps": [
          "Define primitive tokens",
          "Create alias tokens",
          "Build semantic tokens"
        ],
        "template": "// Primitive\n$color-blue-500: #3b82f6;\n\n// Alias\n$color-brand-primary: $color-blue-500;\n\n// Semantic\n$color-button-primary: $color-brand-primary;"
      }
    ]
  }
}
```

---

### Get Skill Examples

Retrieve examples from a skill.

```http
GET /v1/skills/{skill_id}/examples
```

**Response**

```json
{
  "data": {
    "skill_id": "design-systems",
    "examples": [
      {
        "id": "color-token-system",
        "title": "Color Token System",
        "scenario": "Setting up color tokens for a new project",
        "code": "// tokens/colors.ts\nexport const colors = {\n  primitive: {\n    blue: {\n      50: '#eff6ff',\n      500: '#3b82f6',\n      900: '#1e3a8a'\n    }\n  },\n  semantic: {\n    primary: 'var(--color-blue-500)',\n    primaryHover: 'var(--color-blue-600)'\n  }\n};",
        "explanation": "This example shows a layered token approach..."
      }
    ]
  }
}
```

---

### List Skill Versions

Get version history for a skill.

```http
GET /v1/skills/{skill_id}/versions
```

**Response**

```json
{
  "data": {
    "skill_id": "design-systems",
    "versions": [
      {
        "version": "1.0.0",
        "released_at": "2024-01-01T00:00:00Z",
        "changelog": "Initial release"
      },
      {
        "version": "1.1.0",
        "released_at": "2024-01-15T00:00:00Z",
        "changelog": "Added Tailwind integration patterns"
      }
    ],
    "current": "1.1.0"
  }
}
```

---

### Get Specific Version

Retrieve a specific version of a skill.

```http
GET /v1/skills/{skill_id}/versions/{version}
```

**Example**

```bash
curl "https://api.arcanea.io/v1/skills/design-systems/versions/1.0.0" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Skill Categories

### Available Categories

```yaml
development:
  - design-systems
  - development-workflows
  - testing-strategies

education:
  - teacher-team
  - curriculum-design
  - assessment-patterns

strategy:
  - visionary-team
  - strategic-planning
  - innovation-methods

creative:
  - creative-writing
  - world-building
  - character-design
```

---

## Premium Skill Access

Premium skills require appropriate tier:

```bash
# Attempting to access premium skill with community tier
curl "https://api.arcanea.io/v1/skills/teacher-team" \
  -H "Authorization: Bearer COMMUNITY_API_KEY"

# Response
{
  "error": {
    "code": "forbidden",
    "message": "This skill requires Pro tier or higher",
    "upgrade_url": "https://arcanea.io/pricing"
  }
}
```

---

## SDK Examples

### JavaScript

```typescript
import { ArcaneaClient } from '@arcanea/sdk';

const client = new ArcaneaClient({
  apiKey: process.env.ARCANEA_API_KEY
});

// List all skills
const skills = await client.skills.list();

// Filter by tier
const communitySkills = await client.skills.list({
  tier: 'community'
});

// Get skill with specific sections
const skill = await client.skills.get('design-systems', {
  sections: ['patterns', 'examples']
});

// Get patterns only
const patterns = await client.skills.patterns('design-systems');
```

### Python

```python
from arcanea import ArcaneaClient

client = ArcaneaClient(api_key=os.environ['ARCANEA_API_KEY'])

# List all skills
skills = client.skills.list()

# Filter by category
education_skills = client.skills.list(category='education')

# Get skill content
skill = client.skills.get('design-systems')

# Access patterns
for pattern in skill.content.patterns:
    print(f"Pattern: {pattern.name}")
```

---

## Caching

Skill content is cached:

```yaml
Cache Headers:
  Cache-Control: public, max-age=3600
  ETag: "skill-version-hash"

Conditional Requests:
  If-None-Match: "skill-version-hash"
  → Returns 304 Not Modified if unchanged
```

Recommended client-side caching:
- Cache skill metadata: 1 hour
- Cache full content: 24 hours
- Check version endpoint for updates

---

## Rate Limits

Skills API specific limits:

| Tier | List Skills | Get Skill | Get Patterns |
|------|-------------|-----------|--------------|
| Community | 60/hour | 100/hour | 100/hour |
| Pro | 600/hour | 1000/hour | 1000/hour |
| Team | 3000/hour | 5000/hour | 5000/hour |
| Enterprise | Custom | Custom | Custom |
