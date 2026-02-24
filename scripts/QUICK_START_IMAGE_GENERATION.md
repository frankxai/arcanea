# Quick Start: Generate Arcanea Hero Banner

## The Issue

Your current Gemini API key **does not support image generation**. The Gemini API only generates text, not images. Image generation requires different services.

## Recommended Solution: DALL-E 3 (5 minutes to set up)

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-...`)

### Step 2: Add Credits

1. Go to https://platform.openai.com/account/billing
2. Add payment method
3. Add at least $5 credit
4. **Cost for our banner:** ~$0.12 (one HD image)

### Step 3: Generate Image

**Option A: Environment Variable (Recommended)**
```bash
# Windows Command Prompt:
set OPENAI_API_KEY=your-key-here
node scripts/generate-with-dalle3.js

# Windows PowerShell:
$env:OPENAI_API_KEY="your-key-here"
node scripts/generate-with-dalle3.js

# Or set it permanently in System Environment Variables
```

**Option B: Edit Script**
```bash
# Edit scripts/generate-with-dalle3.js
# Replace line 13: const OPENAI_API_KEY = "your-openai-api-key-here";
# With your actual key

node scripts/generate-with-dalle3.js
```

### Step 4: Use the Image

Image will be saved to:
- `assets/marketing/arcanea-hero-banner.png` (main file)
- `assets/marketing/arcanea-hero-banner-[timestamp].png` (backup with version)

Add to README.md:
```markdown
![Arcanea Hero Banner](./assets/marketing/arcanea-hero-banner.png)
```

---

## Alternative: Free Option with Leonardo.AI

### Setup (2 minutes)

1. Go to https://leonardo.ai
2. Sign up (free - no credit card needed)
3. You get **150 free tokens per day**

### Generate Image

1. Click "Image Generation"
2. Select model: **"Leonardo Diffusion XL"** or **"DreamShaper v7"**
3. Set dimensions: **Custom 1344x768** (16:9 ratio)
4. Paste this prompt:

```
Epic fantasy hero banner 16:9, cosmic mythology scene. Central: radiant golden goddess Lumina and deep void purple god Nero in elegant cosmic dance, balanced duality not fighting. Ten glowing sacred gates arranged geometrically around them, each different vibrant color: earthy brown, ocean blue, flame red, rose pink, sky blue, violet purple, white-gold, emerald green, pink-teal gradient, black-white-gold prismatic. Five elemental energy streams flowing through: fire-red, water-blue, earth-green, wind-white, arcane-purple-gold. Majestic fantasy academy castle silhouette below with floating islands. Subtle constellation star patterns. Premium glass-morphism aurora gradient effects. Sacred geometry: golden ratio, Flower of Life patterns. Art style: illuminated medieval manuscript meets epic fantasy concept art meets futuristic sophistication. Rich metallic gold accents. Deep cosmic black backgrounds. Museum quality ultra-detailed. Professional premium aesthetic. Elegant mythological timeless NOT cartoonish. Space for elegant ARCANEA text.
```

5. Advanced Settings:
   - **Prompt Magic:** Enabled
   - **Prompt Magic Strength:** 0.5
   - **PhotoReal:** Off (for fantasy art)
   - **Alchemy:** Enabled (for better quality)
   - **Number of Images:** 4

6. Click **Generate**

7. Download your favorite variation

8. **Cost:** Free! (Uses ~10-20 tokens from your daily 150)

### Tips for Leonardo.AI

- Generate 4 images at once to compare
- If not satisfied, tweak the prompt and regenerate (still free)
- Can generate 7-15 images per day on free tier
- Use "Upscale" feature for even higher resolution (costs more tokens)

---

## Alternative: Midjourney (Best Quality)

### Why Midjourney?

- **Highest artistic quality** for fantasy artwork
- Professional concept art level
- Best for complex mythological scenes like Arcanea

### Setup

1. Join Discord: https://discord.gg/midjourney
2. Subscribe: $10/month for Basic plan
   - Includes ~200 generations/month
   - Worth it if you'll create more visuals for Arcanea

### Generate

1. Open Discord, go to any #general channel
2. Type this command:

```
/imagine prompt: Cosmic mythology banner 16:9. Lumina goddess of golden light and Nero god of void darkness in harmonious dance not combat. Ten sacred gates arranged geometrically each different color: brown earth, blue ocean, red fire, pink heart, cyan voice, violet sight, white-gold crown, green shift, dual-tone unity, prismatic source. Five elemental streams interweaving: fire water earth wind arcane magic. Fantasy academy castle silhouette floating islands. Star patterns. Glass-morph aurora effects. Sacred geometry throughout. Illuminated manuscript meets fantasy concept art meets sci-fi. Metallic gold accents deep space blacks. Premium professional quality elegant timeless mythology aesthetic text space preserved --ar 16:9 --v 6 --style raw --q 2 --s 750
```

3. Wait 60 seconds for 4 variations
4. Click button `U1`, `U2`, `U3`, or `U4` to upscale your favorite
5. Download full resolution image

### Midjourney Tips

- Generate multiple batches, pick the best
- Use "Remix" to iterate on a good result
- Can use `--seed` parameter for consistency
- Join #newbies channels to practice

---

## Comparison Table

| Service | Cost | Quality | Speed | Ease of Use | Best For |
|---------|------|---------|-------|-------------|----------|
| **DALL-E 3** | $0.12/image | Excellent | 1-2 min | ⭐⭐⭐⭐⭐ Easy | API integration, precise prompts |
| **Leonardo.AI** | Free (150/day) | Very Good | 30-60 sec | ⭐⭐⭐⭐ Easy | Budget-conscious, experimentation |
| **Midjourney** | $10/month | Outstanding | 1 min | ⭐⭐⭐ Medium | Professional artwork, best quality |
| **Stable Diffusion** | Free (local) | Good-Great | 2-5 min | ⭐⭐ Complex | Full control, unlimited generations |
| **Gemini/Imagen** | N/A | N/A | N/A | ⭐ Very Hard | Currently not accessible |

---

## My Recommendation

### For Immediate Results: Leonardo.AI (Free)

1. Sign up at leonardo.ai (2 minutes)
2. Generate image (1 minute)
3. Download and use (1 minute)
4. **Total: 5 minutes, $0 cost**

### For Best Quality: DALL-E 3

1. Get OpenAI key + add $5 credit (3 minutes)
2. Run script (1 minute)
3. **Total: 4 minutes, $0.12 cost**

### For Professional Portfolio: Midjourney

1. Subscribe to Midjourney (2 minutes)
2. Generate and iterate (5-10 minutes)
3. **Total: 15 minutes, $10/month**

---

## Next Steps

Choose your preferred option and follow the steps above. Each method will produce a high-quality hero banner suitable for your GitHub README.

Need help with any of these? Just ask!

**Quick Links:**
- OpenAI Platform: https://platform.openai.com
- Leonardo.AI: https://leonardo.ai
- Midjourney: https://discord.gg/midjourney

---

## Files Ready for You

✅ `scripts/generate-with-dalle3.js` - Ready to use with OpenAI API key
📖 `docs/HERO_BANNER_GENERATION_GUIDE.md` - Complete detailed guide
📋 This file - Quick start instructions

Choose your path and let's create something amazing! 🎨✨
