# Arcanea MCP Integrations

> Model Context Protocol servers that extend world-building capabilities

## Overview

These MCP integrations connect the Arcanea World Building system to external tools for enhanced creative output.

---

## Image Generation - Nano Banana MCP

### Purpose
Generate visual content for world-building:
- Character portraits
- Location concept art
- Artifact illustrations
- Map elements
- Scene visualizations

### Connection
```yaml
mcp_server: nano-banana
connection: skill_mcp
status: available
```

### Usage Patterns

#### Character Portrait
```typescript
// Generate character portrait
skill_mcp({
  mcp_name: "nano-banana",
  tool_name: "generate_image",
  arguments: JSON.stringify({
    prompt: `
      Fantasy character portrait: ${character.name}
      
      Physical: ${character.physical_description}
      Style: ${character.culture} aesthetic
      Expression: ${character.personality.dominant_trait}
      
      Art style: Detailed fantasy illustration
      Lighting: Dramatic, cinematic
    `,
    aspect_ratio: "3:4",  // Portrait orientation
    style: "fantasy_illustration"
  })
})
```

#### Location Art
```typescript
// Generate location concept art
skill_mcp({
  mcp_name: "nano-banana",
  tool_name: "generate_image",
  arguments: JSON.stringify({
    prompt: `
      Fantasy landscape: ${location.name}
      
      Terrain: ${location.terrain}
      Climate: ${location.climate}
      Time of day: ${preferred_time || "golden hour"}
      Key features: ${location.notable_features.join(", ")}
      
      Art style: Epic fantasy concept art
      Mood: ${location.atmosphere}
    `,
    aspect_ratio: "16:9",  // Landscape orientation
    style: "concept_art"
  })
})
```

#### Artifact Illustration
```typescript
// Generate artifact image
skill_mcp({
  mcp_name: "nano-banana",
  tool_name: "generate_image",
  arguments: JSON.stringify({
    prompt: `
      Magical artifact: ${artifact.name}
      
      Type: ${artifact.type}
      Material: ${artifact.material}
      Magical properties: ${artifact.effects}
      Visual effects: ${artifact.visual_manifestation}
      
      Art style: Detailed prop design
      Background: Dark, neutral
    `,
    aspect_ratio: "1:1",  // Square for items
    style: "item_design"
  })
})
```

### Integration with Agents

**World Architect** can trigger:
- Location concept art after creating geography

**Character Weaver** can trigger:
- Character portraits after creating profiles

**Magic Systems** can trigger:
- Artifact illustrations after creating items
- Spell effect visualizations

### Auto-Generation Hook
```yaml
hook: post-write:generate-art
trigger:
  file_pattern: "**/*.arc"
  entity_types: ["character", "location", "artifact"]
  status: "canon"
action:
  prompt: "Generate visual for new canon entity?"
  if_yes:
    invoke_mcp: nano-banana
    save_to: "[entity-folder]/gallery/"
```

---

## Music Generation - Suno MCP

### Purpose
Create ambient music and themes for:
- Realm atmospheres
- Character themes
- Cultural music
- Battle/conflict soundscapes
- Magical phenomena audio

### Connection
```yaml
mcp_server: suno
connection: skill_mcp
status: available
```

### Usage Patterns

#### Realm Theme
```typescript
// Generate realm ambient music
skill_mcp({
  mcp_name: "suno",
  tool_name: "generate_music",
  arguments: JSON.stringify({
    prompt: `
      Epic fantasy ambient music for: ${realm.name}
      
      Mood: ${realm.atmosphere}
      Cultural influence: ${realm.primary_culture.musical_tradition}
      Key themes: ${realm.themes.join(", ")}
      
      Style: Orchestral with ethnic instruments
      Duration: 3-4 minutes
      Loop-friendly: true
    `,
    style: "ambient_orchestral"
  })
})
```

#### Character Theme
```typescript
// Generate character leitmotif
skill_mcp({
  mcp_name: "suno",
  tool_name: "generate_music",
  arguments: JSON.stringify({
    prompt: `
      Character theme for: ${character.name}
      
      Personality: ${character.personality.summary}
      Role: ${character.archetype}
      Emotional core: ${character.core_emotion}
      
      Style: ${character.culture.musical_style}
      Instruments: ${suggested_instruments}
      Duration: 2-3 minutes
    `,
    style: "character_theme"
  })
})
```

#### Battle Music
```typescript
// Generate conflict soundtrack
skill_mcp({
  mcp_name: "suno",
  tool_name: "generate_music",
  arguments: JSON.stringify({
    prompt: `
      Battle music for: ${conflict.name}
      
      Scale: ${conflict.scale}
      Factions involved: ${conflict.factions.join(" vs ")}
      Emotional tone: ${conflict.emotional_tone}
      
      Style: Epic orchestral battle music
      Tempo: Fast, intense
      Duration: 4-5 minutes
    `,
    style: "battle_orchestral"
  })
})
```

### Integration with Agents

**World Architect** can trigger:
- Realm ambient themes after creating regions

**Character Weaver** can trigger:
- Character themes for major characters

**Narrative Director** can trigger:
- Conflict soundtracks
- Quest adventure music

### Auto-Generation Hook
```yaml
hook: post-write:generate-music
trigger:
  file_pattern: "**/*.arc"
  entity_types: ["realm", "region", "character", "conflict"]
  status: "canon"
  importance: "major"  # Only for significant entities
action:
  prompt: "Generate musical theme for new canon entity?"
  if_yes:
    invoke_mcp: suno
    save_to: "[entity-folder]/audio/"
```

---

## Content Management - File Operations

### Purpose
Manage world files, exports, and organization:
- Bulk file operations
- Export to various formats
- Backup and versioning
- Cross-reference management

### Built-in Operations

#### Export World
```typescript
// Export world to shareable format
async function exportWorld(worldName: string, format: "json" | "markdown" | "pdf") {
  const worldFiles = await glob(`worlds/${worldName}/**/*.arc`)
  
  // Compile all entities
  const entities = await Promise.all(worldFiles.map(f => read(f)))
  
  // Generate export
  switch(format) {
    case "json":
      return JSON.stringify(compileWorldJson(entities), null, 2)
    case "markdown":
      return generateWorldBook(entities)
    case "pdf":
      return generateWorldPdf(entities)
  }
}
```

#### Backup World
```typescript
// Create versioned backup
async function backupWorld(worldName: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = `_backups/${worldName}/${timestamp}`
  
  await bash(`cp -r worlds/${worldName} ${backupDir}`)
  
  return {
    backup_path: backupDir,
    timestamp,
    file_count: await countFiles(backupDir)
  }
}
```

#### Generate Index
```typescript
// Rebuild cross-reference index
async function regenerateIndex(worldName: string) {
  const allEntities = await glob(`worlds/${worldName}/**/*.arc`)
  
  const index = {
    characters: [],
    locations: [],
    artifacts: [],
    cultures: [],
    conflicts: [],
    // ... etc
  }
  
  for (const file of allEntities) {
    const entity = await parseArcFile(file)
    index[entity.type].push({
      id: entity.id,
      name: entity.name,
      path: file,
      relationships: entity.related_entities
    })
  }
  
  await write(`worlds/${worldName}/_integration/entity-index.json`, JSON.stringify(index))
  await write(`worlds/${worldName}/_integration/cross-references.md`, generateCrossRefDoc(index))
}
```

---

## Future MCP Integrations (Planned)

### Map Generation
```yaml
mcp_server: map-generator (future)
purpose: Generate actual maps from geographic descriptions
features:
  - Terrain rendering
  - City placement
  - Trade route visualization
  - Political boundaries
```

### Voice Generation
```yaml
mcp_server: voice-generator (future)
purpose: Generate character voices for dialogue
features:
  - Character voice profiles
  - Dialogue recordings
  - Narration audio
```

### 3D Model Generation
```yaml
mcp_server: 3d-generator (future)
purpose: Create 3D assets from descriptions
features:
  - Character models
  - Location environments
  - Artifact objects
```

---

## MCP Usage in Slash Commands

### /generate-realm with visuals
```bash
/generate-realm "The Sunken Isles" --with-art --with-music
```
Automatically generates:
- Concept art for each region
- Ambient music for the realm
- Character portraits for key figures

### /create-character with portrait
```bash
/create-character "Admiral Vex" --with-portrait --with-theme
```
Automatically generates:
- Character portrait
- Character theme music

### /visualize-entity
```bash
/visualize-entity characters/kael-stormborn
```
Generates all visual/audio content for existing entity.

---

## Configuration

### Enable/Disable MCPs
```yaml
# In world.arcanea config
mcp_integrations:
  nano-banana:
    enabled: true
    auto_generate: false  # Require manual trigger
  suno:
    enabled: true
    auto_generate: false
  
  # Auto-generation settings
  auto_art_on_canon: false
  auto_music_for_major_entities: false
```

### Quality Settings
```yaml
image_generation:
  default_quality: high
  default_style: fantasy_illustration
  save_format: png

music_generation:
  default_duration: 180  # seconds
  default_quality: high
  save_format: mp3
```
