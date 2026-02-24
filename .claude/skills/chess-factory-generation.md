---
description: Generate AI-powered chess piece images using nano-banana MCP or other image generation APIs
always_apply: false
---

# ♟️ Arcanea Chess Factory - Image Generation Skill

This skill generates high-quality 3D chess piece images using AI image generation.

## Prerequisites

This skill works with:

- **nano-banana-mcp**: Primary image generator
- **OpenAI DALL-E** (via API): Alternative
- **Google Gemini** (via API): Alternative

## High-Quality Prompt Templates

### Template A: Cosmic Liquid Glass

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
COSMIC AESTHETIC with flowing liquid glass body, inner galaxy nebula visible through transparent form,
stars and cosmic dust swirling inside, crystalline surface with prismatic light refraction,
ethereal glow emanating from core, iridescent color shifting between deep violet and bright cyan,
studio lighting, dramatic rim light, isolated on black background,
ultra-detailed, 8k resolution, octane render, unreal engine 5,
cinematic composition --ar 1:1 --stylize 250 --v 6.0
```

### Template B: Starlight Morphic

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
MORPHIC ENERGY ENTITY composed of living starlight, plasma tendrils flowing from core,
morphing surface that shifts between solid and energy states,
ancient runes glowing on surface, cosmic wind blowing through form,
PHOTOREALISTIC with volumetric lighting, nebula backdrop,
stars being born and dying within the body,
subtle morphing animation frozen in time,
premium collectible figurine quality,
studio photography, dark void background --ar 1:1 --q 2 --v 6.0
```

### Template C: Arcane Crystal Godbeast

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
CRYSTALLINE GODBEAST FORM with gem-encrusted surface, each facet a different color of magic,
arcane sigils carved into crystal, ancient divine being awakened,
glowing from within with pure arcane energy,
ethereal wings or tendrils of light, SERENE but POWERFUL expression,
VALRA or OPUS style, highly detailed, ray tracing,
dark mystical background with floating crystals --ar 1:1 --stylize 300
```

### Template D: Void Abyssal Lord

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
VOID ABYSSAL ENTITY emanating from darkness, negative space forming the body,
edges dissolving into the void, eyes glowing with primordial energy,
SHADOWS AND DARKNESS swirling around form, cosmic horror aesthetic,
ELDITCH APPROACHING DIVINE POWER, tentacles of dark matter,
GRAVITY bending around the figure, INVERTED COLOR palette with hints of impossible purple,
H.R. GIGER meets LOVELACE style, --ar 1:1 --v 6.0 --no bright lights
```

### Template E: Solar Stellar Phoenix

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
SOLAR STELLAR PHOENIX with body of living plasma and fire,
corona effect around form, solar flares erupting from surface,
feathers of pure light, REGAL AND MAJESTIC pose,
GOLD AND ORANGE color palette with white-hot core,
KACHING NEWMAN style astrophotography,
DYNAMIC pose with motion blur of light trails,
cosmic background with distant galaxies --ar 1:1 --q 2 --v 6.0
```

### Template F: Forest Sylvan Ent

```
A high-detail 3D render of a [CHARACTER_NAME] as a [PIECE_TYPE] chess piece,
FOREST SYLVAN ENT composed of ancient living wood and moss,
leaves and vines growing from body, glowing nature spirits orbiting,
ROOT SYSTEM forming the base, bark textured with ancient runes,
NATURE MAGIC emanating as particle effects,
WARM EARTH AND GREEN palette with golden morning light,
FANTASY ART STYLE, John Howe or Alan Lee inspiration,
mystical forest clearing background --ar 1:1 --v 6.0
```

## Image Generation Workflow

### Step 1: Generate Prompt

Based on the theme selected in the Chess Factory:

- Cyberpunk Oceanic → Template A or D
- Eldritch Victorian → Template D
- Solar Stellar → Template E
- Forest Sylvan → Template F
- Void Abyssal → Template D
- Crystal Arcane → Template C

### Step 2: Call Image Generation

#### Using nano-banana-mcp:

```bash
# Check if MCP is available
npx nano-banana-mcp generate --prompt "YOUR_PROMPT"
```

#### Using OpenAI DALL-E (via direct API):

```bash
curl -X POST https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "YOUR_PROMPT",
    "n": 1,
    "size": "1024x1024",
    "quality": "hd"
  }'
```

#### Using Google Gemini (via API):

```bash
# Use gemini-pro-vision for image generation
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{"text": "Generate an image: YOUR_PROMPT"}]
    }]
  }'
```

### Step 3: Post-Process

1. Save image to `/assets/chess-pieces/{faction}/{piece}.png`
2. Generate thumbnail for UI
3. Update JSON manifest with image URL

## Output Structure

```
assets/
└── chess-pieces/
    ├── white/
    │   ├── king.png
    │   ├── queen.png
    │   ├── bishop.png
    │   ├── knight.png
    │   ├── rook.png
    │   └── pawn.png
    └── black/
        └── [same structure]
```

## Chess Piece JSON Manifest

Save to `chess-sets/{set-name}/manifest.json`:

```json
{
  "id": "set-001",
  "name": "Kingdom of Crystal",
  "theme": "crystal-arcane",
  "pieces": {
    "white": {
      "king": {
        "name": "Crystal Sovereign",
        "archetype": "The Eternal Monarch",
        "imageUrl": "/assets/chess-pieces/white/king.png",
        "mutation": null
      }
    }
  },
  "generatedAt": "2026-02-23T12:00:00Z"
}
```

## Usage in Chess Factory

This skill is invoked when the user clicks "Generate Prompt" or "Download Set" in the Chess Factory.

## Notes

- Always use `--ar 1:1` for square chess piece images
- Include "isolated on black background" to ensure clean edges
- Use `--q 2` or `--quality hd` for highest quality
- Consider generating 2-3 variants and let user choose
