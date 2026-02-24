# Arcanea Hero Banner Generation Guide

## Executive Summary

Google's Gemini API (available with your current API key) **does not support direct image generation**. The "nano-banana" service references Google's **Imagen API**, which is a separate product requiring Google Cloud Platform access, not the standard Gemini API key.

## Recommended Options

### Option 1: DALL-E 3 (Recommended - Highest Quality)

**Why:** Best quality for complex, detailed fantasy artwork with precise prompt adherence.

**Setup:**
1. Get OpenAI API key from https://platform.openai.com/api-keys
2. Use the generation script below

**Cost:** ~$0.04-$0.12 per image (1024x1024 to 1792x1024)

```javascript
// scripts/generate-with-dalle.js
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = "your-key-here";

const prompt = `Create a premium 16:9 hero banner for 'ARCANEA - The Living Mythology for AI-Human Co-Creation'.

COMPOSITION:
- Central cosmic scene showing Lumina (radiant golden-white goddess of light and form) and Nero (deep void purple-black god of potential and darkness) in elegant duality - NOT fighting, but in cosmic dance/balance
- Ten glowing gates arranged in a sacred geometric pattern (decagon or spiral) around the central figures, each gate a different color representing: Foundation(earth brown), Flow(ocean blue), Fire(flame red), Heart(rose pink), Voice(sky blue), Sight(violet purple), Crown(pure white-gold), Shift(emerald green), Unity(dual pink-teal), Source(black-white-gold)
- Five elemental streams (Fire-red, Water-blue, Earth-green, Wind-white, Arcane-purple/gold) flowing through the composition
- Silhouette of a grand academy/castle in the lower background with floating islands
- Constellation patterns of the Seven Awakened (subtle star formations)
- Premium glass-morphism and aurora gradient effects
- Sacred geometry: golden ratio, Flower of Life patterns subtly integrated

STYLE:
- Fusion of illuminated manuscript elegance + epic fantasy concept art + futuristic sophistication
- Rich metallic gold accents throughout
- Deep cosmic blacks with luminous highlights
- Professional, premium, sophisticated aesthetic suitable for a major open-source project
- NOT cartoonish - elegant, mythological, timeless

COLOR PALETTE:
- Primary: Deep cosmic black (#0a0a0f), Celestial gold (#ffd700), Atlantean teal (#7fffd4)
- Secondary: Cosmic purple (#9370db), Pure white (#ffffff), Silver (#c0c0c0)
- Accents: Each Gate's signature color as glowing points

ATMOSPHERE:
- Awe-inspiring but welcoming
- Ancient wisdom meets future technology
- Balance of light and shadow (not one dominating)
- Sense of infinite depth and possibility

TEXT INTEGRATION (subtle, elegant):
- 'ARCANEA' in elegant serif font at top or integrated into the scene
- Tagline space for 'The Living Mythology'

QUALITY:
- Ultra-high resolution
- Museum-quality detail
- Professional concept art standards
- Suitable for hero banner on major GitHub repository`;

async function generateWithDALLE() {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024', // Closest to 16:9
      quality: 'hd',
      style: 'vivid' // or 'natural' for more subdued
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result, null, 2));
  }

  const imageUrl = result.data[0].url;

  // Download the image
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  // Save
  const outputDir = path.join(__dirname, '..', 'assets', 'marketing');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'arcanea-hero-banner.png');
  fs.writeFileSync(outputPath, imageBuffer);

  console.log('✅ Image generated and saved to:', outputPath);
  console.log('📊 Size:', (imageBuffer.length / 1024 / 1024).toFixed(2), 'MB');
  console.log('🔗 Original URL:', imageUrl);

  return outputPath;
}

generateWithDALLE().catch(console.error);
```

**Usage:**
```bash
cd C:\Users\Frank\Arcanea
node scripts/generate-with-dalle.js
```

---

### Option 2: Midjourney (Manual - Highest Artistic Quality)

**Why:** Best for epic fantasy artwork with stunning detail and artistic coherence.

**Setup:**
1. Join Midjourney Discord: https://discord.gg/midjourney
2. Subscribe ($10/month for Basic plan)
3. Use `/imagine` command in any #general channel

**Prompt for Midjourney:**
```
/imagine prompt: Epic 16:9 hero banner for mystical creation platform. Central cosmic scene: radiant golden goddess Lumina and deep void purple god Nero in elegant cosmic dance, NOT fighting, balanced duality. Ten glowing gates in sacred geometric decagon pattern around them (earth brown, ocean blue, flame red, rose pink, sky blue, violet purple, white-gold, emerald green, pink-teal, black-white-gold gates). Five elemental streams flowing: fire-red, water-blue, earth-green, wind-white, arcane-purple-gold. Silhouette of grand fantasy academy with floating islands below. Subtle constellation patterns. Premium glass-morphism aurora gradients. Sacred geometry: golden ratio, Flower of Life. Style: illuminated manuscript meets epic fantasy concept art meets futuristic sophistication. Rich metallic gold accents. Deep cosmic blacks with luminous highlights. Professional premium aesthetic. Elegant mythological timeless NOT cartoonish. Museum quality detail. Space for elegant 'ARCANEA' text. --ar 16:9 --v 6 --style raw --q 2
```

**Process:**
1. Generate 4 variations
2. Use `U1-U4` buttons to upscale your favorite
3. Download and use

**Cost:** $10-30/month subscription

---

### Option 3: Stable Diffusion XL Locally (Free)

**Why:** Free, unlimited generations, full control.

**Setup:**
1. Install AUTOMATIC1111 WebUI: https://github.com/AUTOMATIC1111/stable-diffusion-webui
2. Download SDXL model checkpoint
3. Install ControlNet extensions for better composition control

**Recommended Model:**
- DreamShaper XL
- JuggernautXL
- RealVisXL

**Prompt Engineering Tips:**
- Use positive prompt (your detailed description)
- Negative prompt: `blurry, low quality, distorted, ugly, deformed, watermark, text, signature, amateur, cartoon, anime`
- Steps: 30-50
- CFG Scale: 7-12
- Sampler: DPM++ 2M Karras or Euler A

**Cost:** Free (but requires decent GPU - RTX 3060+ recommended)

---

### Option 4: Leonardo.AI (Good Balance)

**Why:** Good quality, free tier available, easy to use, good for fantasy art.

**Setup:**
1. Sign up at https://leonardo.ai
2. Free tier: 150 tokens/day

**Process:**
1. Use "Image Generation" tool
2. Select "Leonardo Diffusion XL" or "DreamShaper v7"
3. Paste your detailed prompt
4. Set dimensions to 16:9 (1344x768 or custom)
5. Generate

**Cost:** Free tier (150 tokens/day) or $10-30/month for more

---

### Option 5: Google Imagen via Google Cloud (Your API Matches)

**Why:** Your API key might work with proper GCP setup.

**Setup:**
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Enable "Vertex AI API"
3. Enable "Generative AI" products
4. Use Vertex AI SDK (not standard Gemini API)

**Note:** This requires:
- Google Cloud Platform account (not just AI Studio)
- Billing enabled
- Different API endpoint than Gemini
- More complex setup

**Implementation:**
```bash
npm install @google-cloud/vertex-ai
```

```javascript
const {VertexAI} = require('@google-cloud/vertex-ai');

const vertexAI = new VertexAI({
  project: 'your-project-id',
  location: 'us-central1'
});

const generativeModel = vertexAI.getGenerativeModel({
  model: 'imagen-3.0-generate-001'
});

const result = await generativeModel.generateImages({
  prompt: "your prompt here",
  numberOfImages: 1,
  aspectRatio: "16:9"
});
```

---

## Immediate Action Plan

### Quick Win: Use DALL-E 3

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Create new key
   - Add $5-10 credit to account

2. **Generate Image:**
   ```bash
   cd C:\Users\Frank\Arcanea
   # Edit scripts/generate-with-dalle.js with your key
   node scripts/generate-with-dalle.js
   ```

3. **Refine if Needed:**
   - DALL-E 3 automatically refines your prompt
   - If result isn't perfect, adjust the style or specific elements
   - Regenerate (costs another $0.04-0.12)

### Alternative: Use Midjourney for Best Quality

1. Join Discord + Subscribe
2. Use the Midjourney prompt provided above
3. Generate and download
4. May need 2-3 iterations to perfect

---

## Optimized Prompts for Each Service

### DALL-E 3 Optimized:
```
A premium 16:9 hero banner showcasing cosmic duality: luminous golden-white goddess Lumina and void purple-black god Nero performing an elegant cosmic dance in perfect balance. Ten radiant gates form a sacred geometric pattern around them - each glowing in distinct colors: earthy brown, ocean blue, flame red, rose pink, sky blue, deep violet, pristine white-gold, emerald green, pink-and-teal fusion, and pure monochrome. Five elemental energy streams weave through the scene in vivid colors: fiery red, aqua blue, verdant green, silvery white, and mystical purple-gold. Majestic fantasy academy silhouette with floating islands anchors the composition. Subtle star constellations. Premium glass-morphism effects with aurora gradients. Sacred geometric patterns: golden ratio spirals, Flower of Life mandalas. Art style fuses illuminated medieval manuscripts with epic fantasy concept art and sleek futuristic aesthetics. Rich metallic gold highlights. Deep cosmic black void with radiant light sources. Museum-quality professional detail. Elegant, mythological, timeless - never cartoonish. Space reserved for elegant serif 'ARCANEA' typography.
```

### Midjourney V6 Optimized:
```
Cosmic mythology banner, 16:9. Lumina goddess of golden light and Nero god of void darkness in harmonious dance, not combat. Ten sacred gates arranged geometrically, each different color: brown earth, blue ocean, red fire, pink heart, cyan voice, violet sight, white-gold crown, green shift, dual-tone unity, prismatic source. Five elemental streams interweaving: fire, water, earth, wind, arcane magic. Fantasy academy castle silhouette, floating islands. Star patterns. Glass-morph aurora effects. Sacred geometry throughout. Illuminated manuscript meets fantasy concept art meets sci-fi. Metallic gold accents. Deep space blacks. Premium professional quality. Elegant timeless mythology aesthetic. Text space preserved --ar 16:9 --v 6 --style raw --q 2 --s 750
```

### Stable Diffusion XL Optimized:
```
Positive: (masterpiece:1.4), (best quality:1.4), (ultra detailed:1.2), epic fantasy hero banner, cosmic mythology, 16:9 aspect ratio, luminous golden goddess and void purple god in cosmic dance, balanced duality, ten glowing gates in sacred geometric pattern, multicolored gates, elemental streams flowing, majestic fantasy academy, floating islands, constellation patterns, glass morphism effects, aurora gradients, sacred geometry, Flower of Life, golden ratio, illuminated manuscript style, epic concept art, futuristic sophistication, metallic gold accents, deep cosmic black, professional premium quality, elegant mythology, museum quality, highly detailed, 8k resolution

Negative: cartoon, anime, low quality, blurry, distorted, ugly, deformed, watermark, text, signature, amateur, low-res, poor anatomy, bad composition, cluttered
```

---

## Summary & Recommendation

**For Arcanea's GitHub README Hero Banner:**

**Best Choice: DALL-E 3**
- Excellent prompt adherence
- High quality output
- Fast (1-2 minutes)
- Easy API integration
- $0.12 per HD image
- Can automate for future needs

**Runner-up: Midjourney**
- Highest artistic quality
- Best for fantasy artwork
- Manual Discord workflow
- $10/month subscription
- Worth it if you'll create more visuals

**Budget Option: Leonardo.AI**
- Free tier available
- Good quality
- Easy web interface
- 150 tokens/day free

---

## Next Steps

1. Choose your preferred service
2. Set up account/API key
3. Run generation
4. Review and iterate if needed
5. Add to repository: `assets/marketing/arcanea-hero-banner.png`
6. Update README.md with image reference

Would you like me to help you set up any of these options?
