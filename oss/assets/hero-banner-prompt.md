# Arcanea GitHub Hero Banner - Image Generation Prompt

## Recommended Service
- **Midjourney** (best for mystical/fantasy aesthetics)
- **DALL-E 3** via ChatGPT Plus
- **Stable Diffusion XL** with DreamShaper or similar fantasy model
- **Google Imagen 3** (via Arcanea's own API if available)

## Image Specifications
- **Aspect Ratio**: 3:1 (GitHub banner optimal)
- **Resolution**: 3000x1000 pixels minimum
- **Format**: PNG with transparency support
- **File Size**: Under 1MB for GitHub
- **Color Space**: sRGB

## Master Prompt

### Primary Prompt (Use this first)
```
An ethereal cosmic gateway portal floating in deep space, mystical fantasy concept art. Central luminous portal made of swirling teal (#7fffd4) and gold (#ffd700) energy, radiating soft light. Seven brilliant points of light arranged in constellation pattern around the portal - each representing a celestial guardian. Deep purple nebula background (hex #2D1B69) with cosmic blues (#4A148C, #1A237E) and subtle star field. Ancient magical runes and glyphs float gracefully around the edges, glowing softly in teal and gold. The word "ARCANEA" integrated naturally into the cosmic design as if written in stardust and light. Professional banner format, cinematic composition, high fantasy meets cosmic mysticism aesthetic. Mysterious yet inviting atmosphere, suggesting infinite creative possibility. Clean modern style suitable for GitHub, not cartoonish. Epic fantasy art, ultra detailed, 8k quality, dramatic lighting, ethereal glow effects.
```

### Alternative Prompt (More mystical focus)
```
Epic mystical banner art: a luminous portal gateway at center of deep space, surrounded by seven glowing constellation points representing divine guardians. Portal radiates atlantean teal (#7fffd4) and bright gold (#ffd700) energy wisps. Background features rich purple nebula clouds (#2D1B69), cosmic blue stardust (#4A148C), and subtle distant galaxies. Floating ancient runes and magical glyphs orbit the portal, glowing with soft teal light. Text "ARCANEA" formed from cosmic energy and stardust, integrated naturally. High fantasy aesthetic with modern clean composition, professional banner art, cinematic lighting, mysterious and powerful atmosphere. Not cartoonish or cute - should feel epic and inviting. Ultra detailed, 8k, dramatic composition, suitable for GitHub repository hero image.
```

### Negative Prompt (Things to avoid)
```
cartoon, anime, low quality, blurry, text overlays, watermarks, logos, people, faces, characters, cluttered, busy composition, childish, cute style, bright neon colors, modern UI elements, buttons, realistic photography, lens flare, chromatic aberration, noise, grain, oversaturated, undersaturated, flat, 2D illustration
```

## Style Keywords for Fine-Tuning
- **Art Style**: Epic fantasy concept art, mystical digital painting, cosmic surrealism
- **Lighting**: Ethereal glow, volumetric light rays, soft luminescence, dramatic rim lighting
- **Mood**: Mysterious, inviting, powerful, infinite possibility, transcendent
- **Quality**: Ultra detailed, 8k resolution, professional banner art, cinematic composition
- **Color Palette**: Deep space purples, cosmic blues, atlantean teal, bright gold, black depths

## Color Palette Reference
```css
Primary Teal:     #7fffd4 (Atlantean Teal - portal glow)
Gold Accent:      #ffd700 (Gold Bright - energy wisps)
Deep Purple:      #2D1B69 (Nebula base)
Cosmic Purple:    #4A148C (Mid-tone space)
Cosmic Blue:      #1A237E (Deep space blue)
Secondary Blue:   #78a6ff (Star highlights)
Black Depths:     #0a0a0f (Deep space)
```

## Composition Guidelines

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│  Rune     *     Rune        *        Rune       │ Top third: Floating runes
│     *        ╱───╲      *      *                │
│        *    │  ⚬  │  *              *      Rune │
│  *     ⚬   │ ▓▓▓ │   ⚬        ⚬          *    │ Middle: Portal + Seven lights
│        │╲  │▓▓▓▓▓│  ╱│                         │
│   Rune  ╲══╣PORTAL╠══╱   Rune         *        │
│     *    ⚬ │▓▓▓▓▓│ ⚬      *      *            │
│              │▓▓▓│                              │
│  *      *     ╲─╱  *    ╭─────────╮            │
│           *      *       │ARCANEA  │      Rune  │ Bottom third: Text + stars
└─────────────────────────────────────────────────┘
```

### Element Placement
1. **Central Portal**: Positioned at horizontal center, slightly above vertical center
2. **Seven Lights**: Arranged in mystical constellation pattern around portal
   - 3 above (forming triangle)
   - 2 on sides (left and right)
   - 2 below (flanking bottom)
3. **Runes**: 5-7 ancient glyphs floating around edges, more concentrated at top and sides
4. **Text "ARCANEA"**: Bottom quarter, integrated as cosmic energy/stardust
5. **Background**: Deep space with purple nebula, brightest behind portal

### Visual Hierarchy
1. **Primary Focus**: Luminous portal (brightest element)
2. **Secondary**: Seven constellation lights
3. **Tertiary**: Floating runes
4. **Background**: "ARCANEA" text, subtle enough to not compete

## Seven Guardian Lights Details
Each light represents one of the Ten Gates guardians (using seven as mystical number):

1. **Foundation Light** (Bottom Left) - Earth-toned glow
2. **Flow Light** (Left Side) - Water-blue shimmer
3. **Fire Light** (Top Left) - Red-orange flare
4. **Heart Light** (Top Center) - Pink-gold warmth
5. **Voice Light** (Top Right) - Cyan brilliance
6. **Sight Light** (Right Side) - Purple-indigo glow
7. **Crown Light** (Bottom Right) - White-gold radiance

## Rune Style Reference
- **Style**: Ancient, mystical, not specific to any real culture
- **Form**: Geometric with flowing curves, suggests meaning without being readable
- **Glow**: Soft teal (#7fffd4) with slight gold highlights
- **Size**: Varied, smaller than portal, larger than distant stars
- **Examples**: Circular sigils, angular glyphs, spiral patterns, geometric mandala fragments

## Technical Specifications for Delivery

### File Requirements
- **Filename**: `hero-banner.png`
- **Format**: PNG-24 (not PNG-8)
- **Color Profile**: sRGB IEC61966-2.1
- **Dimensions**: 3000x1000px (scales down to 1500x500px for mobile)
- **Compression**: Optimized but not lossy (use tools like TinyPNG after generation)
- **Transparency**: Optional alpha channel for overlay effects

### GitHub Optimization
```bash
# After generation, optimize with:
pngquant --quality=85-95 hero-banner.png
# or
optipng -o7 hero-banner.png
```

## Generation Workflow

### Step 1: Initial Generation
1. Use the primary prompt in your chosen AI image generator
2. Set aspect ratio to 3:1 or closest available (then crop/extend)
3. Generate 4 variations
4. Select best composition

### Step 2: Refinement
1. If portal not prominent enough: Add "dramatic glowing portal at center" to prompt
2. If too cluttered: Add "clean composition, minimal elements" to prompt
3. If colors off: Specify hex codes in prompt more explicitly
4. If text doesn't integrate: Generate without text, add in post

### Step 3: Post-Processing (Optional)
1. **Color Correction**: Adjust to match Arcanea color palette exactly
2. **Text Overlay**: If "ARCANEA" didn't generate well, overlay manually with:
   - Font: Cinzel Decorative (Arcanea's display font)
   - Effect: Outer glow, gradient (teal to gold)
   - Position: Bottom center or subtly worked into cosmic elements
3. **Optimization**: Compress to under 1MB
4. **Variants**: Create mobile version (1500x500px) by cropping center

### Step 4: Validation
- [ ] Portal is central and luminous
- [ ] Seven lights clearly visible in constellation pattern
- [ ] Teal and gold colors prominent
- [ ] Purple/blue cosmic background
- [ ] Runes subtle but present
- [ ] "ARCANEA" text integrated (or ready for overlay)
- [ ] Professional, not cartoonish
- [ ] Mysterious yet inviting mood
- [ ] High resolution and detail
- [ ] File size appropriate for web

## Alternative Tools & Methods

### If Using Midjourney
```
/imagine prompt: [paste primary prompt] --ar 3:1 --style raw --v 6 --quality 2
```

### If Using DALL-E 3
1. Use ChatGPT Plus
2. Paste primary prompt
3. Request "wide banner format"
4. May need to generate square first, then use "extend image" for 3:1

### If Using Stable Diffusion
- **Model**: DreamShaper XL, Juggernaut XL, or similar fantasy-focused model
- **Sampler**: DPM++ 2M Karras or Euler A
- **Steps**: 30-50
- **CFG Scale**: 7-9
- **Size**: 1536x512 (will upscale to 3000x1000)
- **Upscaler**: R-ESRGAN 4x+ for final quality

### If Using Arcanea's Own API
```bash
curl -X POST https://arcanea.app/api/ai/generate-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "[paste primary prompt]",
    "width": 3000,
    "height": 1000,
    "quality": "hd",
    "style": "cosmic fantasy banner",
    "kingdomOfLightStyle": true
  }'
```

## Fallback: Manual Creation in Figma/Photoshop

If AI generation doesn't achieve desired result:

1. **Background**: Create purple-blue gradient nebula with layer effects
2. **Portal**: Use gradient circles with outer glow effects (teal/gold)
3. **Lights**: Seven solid circles with layer styles (glow, color overlay)
4. **Runes**: Use geometric shape tools or import vector glyphs
5. **Stars**: Scatter small white dots with varied opacity
6. **Text**: Cinzel Decorative font with gradient and outer glow
7. **Effects**: Add lens blur, color grading for mystical atmosphere

## Quality Checklist

Before finalizing:
- [ ] Meets 3000x1000px minimum resolution
- [ ] Portal clearly visible and luminous
- [ ] Seven lights distinguishable
- [ ] Color palette matches Arcanea brand (teal #7fffd4, gold #ffd700, purple #2D1B69)
- [ ] Runes present but not distracting
- [ ] Text legible but integrated
- [ ] Professional quality, not amateurish
- [ ] File size under 1MB
- [ ] Tests well on both light and dark GitHub themes
- [ ] Conveys mystery, power, and invitation
- [ ] No copyright issues with style/elements

## Notes

This banner will be the first visual impression of Arcanea on GitHub. It should:
- Instantly communicate "mystical creative platform"
- Feel professional and polished
- Stand out from typical tech project banners
- Align with the cosmic fantasy aesthetic throughout Arcanea
- Invite exploration and curiosity

The portal represents the gateway to infinite creative possibility. The seven lights represent the guardians guiding creators. The runes represent the ancient wisdom and modern magic combined.
