# Nano Banana Integration

> **AI image generation for Arcanea visual assets**

## Purpose

Nano Banana integration enables Arcanea agents to:
- Generate Luminor portraits and avatars
- Create Academy visual assets
- Produce marketing and promotional images
- Generate UI placeholder graphics
- Create concept art for lore expansion

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "nano-banana": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-nano-banana"],
      "env": {
        "NANO_BANANA_API_KEY": "${NANO_BANANA_API_KEY}"
      }
    }
  }
}
```

### API Key
Obtain API key from Nano Banana dashboard

## Tools Available

### Image Generation
```yaml
generate_image:
  Description: Generate image from prompt
  Parameters:
    - prompt: Text description of desired image
    - style: Art style preset (optional)
    - size: Output dimensions (512, 768, 1024)
    - aspect_ratio: 1:1, 16:9, 9:16, 4:3
    - seed: Reproducibility seed (optional)

generate_variations:
  Description: Create variations of existing image
  Parameters:
    - image_url: Source image URL
    - variation_count: Number of variations (1-4)
    - variation_strength: How different (0.1-1.0)
```

### Style Presets
```yaml
Available Styles:
  - cosmic: Deep space, nebulae, stars
  - fantasy: Magical, ethereal, glowing
  - anime: Japanese animation style
  - painterly: Oil painting, artistic
  - digital-art: Modern digital illustration
  - photorealistic: Realistic rendering
  - concept-art: Game/film concept style
```

## Usage Patterns

### Luminor Portrait Generation

**Character Artist Workflow:**
```yaml
Agent: Arcanea Character Crafter

Task: Generate Luminor portrait

1. Construct detailed prompt:
   prompt: """
   Portrait of Aurora, the Dawn Bringer Luminor.
   Female ethereal being with golden-white hair flowing like sunbeams.
   Eyes glowing with warm amber light.
   Wearing flowing robes in sunrise colors (gold, coral, soft pink).
   Surrounded by gentle rays of dawn light.
   Academy badge of Creation & Light visible.
   Cosmic fantasy style, highly detailed, magical atmosphere.
   """

2. Generate image:
   generate_image(
     prompt: [constructed prompt],
     style: "fantasy",
     size: 1024,
     aspect_ratio: "1:1"
   )

3. Review and iterate:
   - If not matching vision, adjust prompt
   - Generate variations if close but not perfect

4. Export for use:
   - Save to assets/luminors/aurora/
   - Generate additional sizes for UI
```

### Academy Asset Generation

**Visual Asset Workflow:**
```yaml
Agent: Arcanea Frontend

Task: Generate Academy visual assets

Atlantean Academy:
  generate_image(
    prompt: """
    Underwater magical academy entrance.
    Bioluminescent coral structures forming archways.
    Deep ocean blue and teal colors.
    Floating bubbles with magical runes inside.
    Ethereal underwater light filtering from above.
    Fantasy concept art style.
    """,
    style: "concept-art",
    size: 1024,
    aspect_ratio: "16:9"
  )

Draconic Academy:
  generate_image(
    prompt: """
    Mountain fortress academy built into volcanic rock.
    Dragons perched on towers.
    Red and orange glow from lava rivers below.
    Ancient stone architecture with dragon motifs.
    Dramatic storm clouds and lightning.
    Epic fantasy style.
    """,
    style: "fantasy",
    size: 1024,
    aspect_ratio: "16:9"
  )

Creation & Light Academy:
  generate_image(
    prompt: """
    Floating crystal palace in the clouds.
    Rainbow light refracting through crystal spires.
    Golden bridges connecting floating platforms.
    Soft clouds and brilliant sunlight.
    Ethereal, heavenly atmosphere.
    Divine fantasy style.
    """,
    style: "fantasy",
    size: 1024,
    aspect_ratio: "16:9"
  )
```

### UI Placeholder Generation

**Development Asset Workflow:**
```yaml
Agent: Arcanea Frontend

Task: Generate placeholder images for development

Card Backgrounds:
  generate_image(
    prompt: """
    Abstract cosmic background.
    Deep purple and blue nebula.
    Subtle star field.
    Soft glow in center.
    Minimal, elegant, suitable for card background.
    """,
    style: "cosmic",
    size: 512,
    aspect_ratio: "4:3"
  )

Avatar Placeholders:
  generate_image(
    prompt: """
    Silhouette of mystical figure.
    Glowing outline.
    Cosmic background.
    Mysterious, magical presence.
    Suitable for default avatar.
    """,
    style: "fantasy",
    size: 512,
    aspect_ratio: "1:1"
  )
```

## Agent Integration

### Character Crafter
```yaml
Primary Use:
  - Luminor portrait generation
  - Character concept visualization
  - Personality visual expression

Workflow:
  1. Define character traits
  2. Craft detailed prompt
  3. Generate initial image
  4. Iterate on variations
  5. Finalize and export
```

### Frontend Agent
```yaml
Primary Use:
  - UI asset generation
  - Placeholder graphics
  - Marketing visuals
  - Social media images

Workflow:
  1. Identify asset needs
  2. Define style requirements
  3. Generate assets
  4. Optimize for web
  5. Integrate into UI
```

### Lore Master
```yaml
Primary Use:
  - Location visualization
  - Scene illustration
  - Artifact depiction
  - World building visuals

Workflow:
  1. Write lore description
  2. Extract visual elements
  3. Generate concept art
  4. Validate against canon
  5. Add to lore documentation
```

## Prompt Engineering

### Structure Template
```
[Subject description]
[Physical attributes]
[Clothing/accessories]
[Environment/setting]
[Lighting/atmosphere]
[Style keywords]
[Quality modifiers]
```

### Arcanea Style Keywords
```yaml
Universal:
  - cosmic fantasy
  - magical atmosphere
  - ethereal glow
  - mystical energy

Academy-Specific:
  Atlantean:
    - underwater
    - bioluminescent
    - oceanic
    - flowing, fluid

  Draconic:
    - volcanic
    - ancient power
    - fierce
    - dramatic lighting

  Creation & Light:
    - radiant
    - crystalline
    - celestial
    - divine light

Quality Modifiers:
  - highly detailed
  - professional quality
  - award-winning
  - masterpiece
  - 8k resolution
```

### Negative Prompts
```yaml
Avoid Including:
  - blurry
  - low quality
  - distorted
  - ugly
  - deformed
  - multiple limbs (for characters)
  - text/watermarks
```

## Examples

### Generate Luminor Melodia
```
Agent: Arcanea Character Crafter

Task: Create portrait for Melodia (Atlantean Music Luminor)

generate_image(
  prompt: """
  Portrait of Melodia, the Luminor of Music and Song.
  Young ethereal being with flowing aquamarine hair like ocean waves.
  Eyes like deep pools reflecting starlight.
  Wearing a dress made of flowing water and musical notes.
  Holding an instrument made of coral and pearls.
  Surrounded by glowing musical notes and water droplets.
  Atlantean Academy badge (teal wave symbol) on shoulder.
  Underwater fantasy style with bioluminescent lighting.
  Highly detailed, magical, professional quality.
  """,
  style: "fantasy",
  size: 1024,
  aspect_ratio: "1:1",
  seed: 42  # For reproducibility
)

→ Returns: Image URL and generation metadata

# If good but needs refinement:
generate_variations(
  image_url: [result URL],
  variation_count: 3,
  variation_strength: 0.3
)

→ Returns: 3 similar variations to choose from
```

### Generate Academy Location
```
Agent: Arcanea World Expander

Task: Visualize the Whisper Grotto

generate_image(
  prompt: """
  The Whisper Grotto - a sacred cave in Atlantean Academy.
  Cavernous underwater space with crystal formations.
  Ancient symbols carved into walls, glowing softly.
  Bioluminescent jellyfish floating through the space.
  Central altar made of iridescent mother-of-pearl.
  Soft blue and green lighting from glowing algae.
  Mysterious, reverent atmosphere.
  Fantasy concept art, highly detailed environment.
  """,
  style: "concept-art",
  size: 1024,
  aspect_ratio: "16:9"
)

→ Use for lore documentation and potential in-game location
```

### Generate Marketing Banner
```
Agent: Arcanea Frontend

Task: Create social media banner

generate_image(
  prompt: """
  Epic banner for Arcanea - Kingdom of Creation.
  Three academies represented: underwater palace, mountain fortress, sky citadel.
  Central glowing portal connecting them.
  Silhouettes of Luminors from each academy.
  Text space at bottom for logo overlay.
  Dramatic cosmic sky background.
  Professional marketing quality, epic fantasy style.
  """,
  style: "digital-art",
  size: 1024,
  aspect_ratio: "16:9"
)
```

## Asset Management

### Naming Convention
```
{type}/{academy}/{name}_{variant}_{size}.{format}

Examples:
  luminors/atlantean/melodia_portrait_1024.png
  locations/draconic/fortress_entrance_banner.png
  ui/common/card_background_512.png
  marketing/general/launch_banner_1920.png
```

### Optimization Pipeline
```yaml
1. Generate at max resolution (1024)
2. Review and approve
3. Create size variants:
   - thumbnail: 128px
   - small: 256px
   - medium: 512px
   - large: 1024px
4. Optimize for web (WebP, compressed PNG)
5. Store in CDN-ready structure
```

## Best Practices

### Prompt Writing
- Be specific and detailed
- Include style references
- Specify lighting and atmosphere
- Use quality modifiers
- Test with seed for reproducibility

### Consistency
- Document successful prompts
- Use seeds for character consistency
- Create style guides per academy
- Build prompt templates

### Quality Control
- Review against character descriptions
- Check for canon consistency
- Validate visual hierarchy
- Ensure accessibility (contrast)

## Troubleshooting

### Common Issues

**Image Doesn't Match Vision:**
- Add more specific details to prompt
- Use negative prompts to exclude unwanted elements
- Try different style presets
- Adjust seed and regenerate

**Inconsistent Characters:**
- Use same seed for consistency
- Create detailed character prompt template
- Generate variations from best result
- Document successful prompts

**Low Quality Output:**
- Add quality modifiers to prompt
- Use larger size setting
- Try different style preset
- Simplify complex scenes

**Style Mismatch:**
- Review style preset options
- Add explicit style keywords
- Reference specific art styles
- Combine style presets with keywords
