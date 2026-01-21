# Arcanea Visual Assets

This directory contains visual assets for the Arcanea project, including hero banners, logos, and promotional imagery.

## Hero Banner

### Current Status
Two versions are available:

1. **hero-banner-placeholder.svg** - SVG placeholder that can be used immediately
   - Fully scalable vector graphics
   - Implements Arcanea color palette
   - Features portal, seven guardian lights, mystical runes, and text
   - Ready for immediate use on GitHub

2. **hero-banner-prompt.md** - Comprehensive AI image generation guide
   - Detailed prompts for Midjourney, DALL-E 3, Stable Diffusion, or Google Imagen
   - Specifications, color codes, composition guidelines
   - Step-by-step workflow for creating the final hero banner

### Quick Start

#### Option 1: Use SVG Placeholder Immediately
The SVG placeholder is production-ready and can be used right now:

```markdown
<!-- In your GitHub README.md -->
![Arcanea - Kingdom of Creation](./oss/assets/hero-banner-placeholder.svg)
```

**Pros:**
- Available immediately
- Scalable to any size
- Small file size (~15KB)
- Fully implements Arcanea design system

**Cons:**
- Less photorealistic/artistic than AI-generated version
- Simpler aesthetic

#### Option 2: Generate AI-Enhanced Banner
Follow the detailed guide in `hero-banner-prompt.md` to create a premium AI-generated banner:

1. Choose your AI image generation service (Midjourney recommended)
2. Use the provided master prompt
3. Follow refinement workflow
4. Optimize and export as PNG
5. Replace placeholder with final version

**Pros:**
- Professional concept art quality
- Photorealistic cosmic effects
- More visually striking
- Better first impression

**Cons:**
- Requires AI image generation service access
- May need iteration to perfect
- Larger file size (~500KB-1MB)

### Converting SVG to PNG

If you prefer to use the SVG version but need PNG format:

#### Using Inkscape (Recommended)
```bash
inkscape hero-banner-placeholder.svg --export-png=hero-banner.png --export-width=3000 --export-height=1000
```

#### Using ImageMagick (Alternative)
```bash
convert -density 300 -background transparent hero-banner-placeholder.svg -resize 3000x1000 hero-banner.png
```

#### Using Online Tools
- [Vectr](https://vectr.com/) - Free online SVG editor with PNG export
- [CloudConvert](https://cloudconvert.com/svg-to-png) - Online SVG to PNG converter

#### Using Browser
1. Open `hero-banner-placeholder.svg` in Chrome/Firefox
2. Right-click and select "Save Image As"
3. Some browsers support direct PNG export

### Specifications

#### Dimensions
- **Width**: 3000px
- **Height**: 1000px
- **Aspect Ratio**: 3:1
- **Mobile Variant**: 1500x500px (cropped/scaled)

#### Color Palette
```css
--atlantean-teal:   #7fffd4;  /* Primary portal glow */
--gold-bright:      #ffd700;  /* Accent energy */
--deep-purple:      #2D1B69;  /* Nebula base */
--cosmic-purple:    #4A148C;  /* Space mid-tone */
--cosmic-blue:      #1A237E;  /* Deep space */
--secondary-blue:   #78a6ff;  /* Star highlights */
--black-depths:     #0a0a0f;  /* Deep space black */
```

#### File Formats
- **SVG**: Recommended for maximum scalability
- **PNG**: For platforms requiring raster (GitHub supports both)
- **WebP**: For web optimization (convert from PNG)

### Usage Guidelines

#### GitHub README
```markdown
<div align="center">
  <img src="./oss/assets/hero-banner-placeholder.svg" alt="Arcanea - Kingdom of Creation" width="100%">
</div>

# Arcanea
> A living mythology for the age of AI-human co-creation
```

#### Social Media
Export at platform-specific dimensions:
- **Twitter/X Header**: 1500x500px
- **LinkedIn Banner**: 1584x396px
- **Facebook Cover**: 820x312px
- **YouTube Channel Art**: 2560x1440px

#### Documentation
Use the banner consistently across:
- GitHub repository
- Documentation sites
- Landing pages
- Presentation slides
- Marketing materials

### Customization

The SVG file can be easily customized:

1. **Colors**: Edit hex values in `<defs>` section
2. **Text**: Modify the `<text>` elements
3. **Elements**: Add/remove stars, runes, or lights
4. **Effects**: Adjust opacity, glow intensity, gradients

Example - Change portal color to blue:
```xml
<!-- Find this line -->
<stop offset="40%" style="stop-color:#7fffd4;stop-opacity:0.8" />

<!-- Change to -->
<stop offset="40%" style="stop-color:#4da6ff;stop-opacity:0.8" />
```

### Optimization

#### SVG Optimization
```bash
# Using SVGO
npx svgo hero-banner-placeholder.svg -o hero-banner-optimized.svg

# Manual: Remove comments, whitespace, unnecessary attributes
```

#### PNG Optimization
```bash
# Using pngquant (lossy, smaller size)
pngquant --quality=85-95 hero-banner.png -o hero-banner-optimized.png

# Using optipng (lossless, better quality)
optipng -o7 hero-banner.png

# Using TinyPNG API (recommended)
curl --location --request POST 'https://api.tinify.com/shrink' \
  --header 'Authorization: Basic YOUR_API_KEY' \
  --data-binary '@hero-banner.png' > hero-banner-optimized.png
```

### Future Versions

Planned enhancements:
- [ ] Animated SVG version with subtle cosmic movement
- [ ] Dark mode variant with adjusted contrast
- [ ] Seasonal variations (different color palettes)
- [ ] Interactive version with hover effects
- [ ] Mobile-optimized vertical banner (1000x3000px)

### Asset Inventory

Current assets:
- ✅ `hero-banner-placeholder.svg` - SVG placeholder
- ✅ `hero-banner-prompt.md` - AI generation guide
- ⏳ `hero-banner.png` - AI-generated PNG (pending creation)
- ⏳ `hero-banner-mobile.svg` - Mobile variant (planned)
- ⏳ `hero-banner-animated.svg` - Animated version (planned)

### Credits

- **Design**: Based on Arcanea canonical lore and design system
- **Concept**: Seven Guardians constellation, cosmic portal gateway
- **Colors**: Arcanean Design System (Atlantean Teal, Gold Bright, Cosmic Purple)
- **Typography**: Georgia (placeholder), target: Cinzel Decorative

### License

All Arcanea visual assets are part of the Arcanea project and follow the project's licensing terms.

### Support

For questions or custom asset requests:
- Open an issue on GitHub
- Reference the Arcanea Design System documentation
- Consult `.claude/lore/ARCANEA_CANON.md` for canonical consistency

---

## Quick Commands Reference

```bash
# Convert SVG to PNG (3000x1000)
inkscape hero-banner-placeholder.svg --export-png=hero-banner.png -w 3000 -h 1000

# Create mobile version (1500x500)
inkscape hero-banner-placeholder.svg --export-png=hero-banner-mobile.png -w 1500 -h 500

# Optimize PNG
pngquant --quality=85-95 hero-banner.png

# Preview SVG
# Just open in any modern browser

# Generate AI version
# See hero-banner-prompt.md for detailed instructions
```

## Visual Preview

### SVG Placeholder Features:
- Central luminous portal with teal and gold energy
- Seven Guardian constellation lights
- Mystical runes floating around edges
- Deep purple cosmic nebula background
- "ARCANEA" text integrated with cosmic energy
- Subtle star field throughout
- Professional banner composition

The placeholder SVG provides an immediate, high-quality solution while the AI-generated version is being created. Both versions align with Arcanea's mystical, cosmic aesthetic and can be used in production.
