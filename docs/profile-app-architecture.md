# Profile App Architecture

Future `apps/profile/` - Personal showcase and portfolio app.

## Overview

**URL:** `profile.arcanea.ai` or `frank.arcanea.ai`
**Purpose:** Personal portfolio showcasing AI creations, characters, and worlds
**Target:** When you have substantial AI content to display

## Features

### Core Sections
- **About Frank** - Bio, background, Arcanea vision
- **AI Character Gallery** - Generated characters with stories
- **World Collection** - Created realms and environments
- **Artifact Showcase** - Notable AI creations and experiments
- **Creative Process** - Behind-the-scenes content
- **Contact & Collaboration** - Professional connections

### Technical Features
- **Asset Integration** - Pulls from Supabase storage buckets
- **Collection Management** - Curated portfolios and galleries
- **Search & Filter** - Find creations by tags, type, date
- **Sharing** - Social sharing of individual pieces
- **Interactive Elements** - 3D previews, animations

## Data Model

### Profile Collections
```typescript
interface ProfileCollection {
  id: string;
  name: string;
  description: string;
  category: 'characters' | 'worlds' | 'artifacts' | 'experiments';
  featured_asset_id?: string;
  sort_order: number;
  is_public: boolean;
}
```

### Featured Content
```typescript
interface FeaturedContent {
  id: string;
  asset_id: string;
  title: string;
  description: string;
  story_text?: string;
  technical_notes?: string;
  creation_date: string;
  tags: string[];
}
```

## Integration Points

### Asset Manager Package
- Uses `@arcanea/asset-manager` for storage operations
- Connects to existing Supabase buckets
- Leverages asset metadata and collections

### Cross-App Links
- Deep links to Studio for editing
- Links to Chat for character conversations
- Integration with Gallery for public showcases

## Development Priority

**Phase 1** (Later): Basic portfolio structure
**Phase 2** (Future): Interactive elements and advanced features
**Phase 3** (Advanced): AI-powered content organization

## Notes

- Can start as simple static pages
- Evolve into dynamic portfolio as content grows
- Focus on storytelling and presentation
- Professional showcase for collaborations