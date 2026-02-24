# Arcanea Hero Banner - Implementation Guide

Quick reference for implementing the hero banner across different platforms.

## Immediate Implementation (SVG Placeholder)

### GitHub README
```markdown
<div align="center">
  <img src="./oss/assets/hero-banner-placeholder.svg" alt="Arcanea - Kingdom of Creation" width="100%">
</div>

# Arcanea
> A living mythology for the age of AI-human co-creation

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/yourusername/arcanea)](https://github.com/yourusername/arcanea)
```

### Next.js Landing Page
```tsx
// app/page.tsx or components/HeroBanner.tsx
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Image
        src="/assets/hero-banner-placeholder.svg"
        alt="Arcanea - Kingdom of Creation"
        width={3000}
        height={1000}
        priority
        className="w-full h-auto"
      />
    </div>
  );
}
```

### React Component
```jsx
// components/HeroBanner.jsx
export const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <img
        src="/assets/hero-banner-placeholder.svg"
        alt="Arcanea - Kingdom of Creation"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};
```

### HTML Website
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcanea - Kingdom of Creation</title>
</head>
<body>
    <header>
        <div class="hero-banner">
            <img src="./assets/hero-banner-placeholder.svg"
                 alt="Arcanea - Kingdom of Creation"
                 style="width: 100%; height: auto; display: block;">
        </div>
    </header>

    <main>
        <!-- Your content -->
    </main>
</body>
</html>
```

### Markdown Documentation
```markdown
![Arcanea Hero Banner](./oss/assets/hero-banner-placeholder.svg)

# Welcome to Arcanea
*A living mythology for the age of AI-human co-creation*
```

## Social Media Implementations

### Twitter/X Header (1500x500px)
```bash
# Convert SVG to PNG at Twitter dimensions
inkscape hero-banner-placeholder.svg \
  --export-png=twitter-header.png \
  --export-width=1500 \
  --export-height=500
```

Or crop center portion of existing 3000x1000:
```bash
convert hero-banner.png -gravity center -crop 1500x500+0+0 twitter-header.png
```

### LinkedIn Banner (1584x396px)
```bash
inkscape hero-banner-placeholder.svg \
  --export-png=linkedin-banner.png \
  --export-width=1584 \
  --export-height=396
```

### Facebook Cover (820x312px)
```bash
inkscape hero-banner-placeholder.svg \
  --export-png=facebook-cover.png \
  --export-width=820 \
  --export-height=312
```

## Responsive Implementation

### CSS with Media Queries
```css
.hero-banner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-banner img {
  width: 100%;
  height: auto;
  display: block;
}

/* Mobile optimization */
@media (max-width: 768px) {
  .hero-banner {
    padding: 0;
  }

  .hero-banner img {
    /* Crop to center for mobile if needed */
    object-fit: cover;
    max-height: 300px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .hero-banner {
    /* SVG already optimized for dark backgrounds */
  }
}

@media (prefers-color-scheme: light) {
  .hero-banner img {
    /* Add subtle shadow for light backgrounds */
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
  }
}
```

### Tailwind CSS
```jsx
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <img
    src="/assets/hero-banner-placeholder.svg"
    alt="Arcanea - Kingdom of Creation"
    className="w-full h-auto block rounded-lg shadow-2xl"
  />
</div>
```

## Performance Optimization

### Lazy Loading (Below the Fold)
```html
<img
  src="./assets/hero-banner-placeholder.svg"
  alt="Arcanea - Kingdom of Creation"
  loading="lazy"
  decoding="async"
  style="width: 100%; height: auto;"
>
```

### Eager Loading (Above the Fold)
```html
<link rel="preload" as="image" href="./assets/hero-banner-placeholder.svg">

<img
  src="./assets/hero-banner-placeholder.svg"
  alt="Arcanea - Kingdom of Creation"
  loading="eager"
  style="width: 100%; height: auto;"
>
```

### Next.js Optimization
```tsx
import Image from 'next/image';

<Image
  src="/assets/hero-banner-placeholder.svg"
  alt="Arcanea - Kingdom of Creation"
  width={3000}
  height={1000}
  priority // For above-the-fold content
  quality={95}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Optional
/>
```

## Advanced Styling

### With Gradient Overlay
```css
.hero-banner-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.hero-banner-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 60%,
    rgba(10, 10, 15, 0.8) 100%
  );
  pointer-events: none;
}

.hero-banner-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}
```

### With Animation
```css
@keyframes cosmicGlow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(127, 255, 212, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(127, 255, 212, 0.6));
  }
}

.hero-banner img {
  animation: cosmicGlow 4s ease-in-out infinite;
}
```

### With Parallax Effect
```jsx
// Using react-parallax
import { Parallax } from 'react-parallax';

<Parallax
  bgImage="/assets/hero-banner-placeholder.svg"
  strength={300}
  bgImageStyle={{
    objectFit: 'cover',
    width: '100%',
    height: 'auto'
  }}
>
  <div style={{ height: 400 }}>
    {/* Content over banner */}
  </div>
</Parallax>
```

## Accessibility

### Complete Implementation
```html
<header role="banner">
  <div class="hero-banner-container">
    <img
      src="./assets/hero-banner-placeholder.svg"
      alt="Arcanea hero banner featuring a mystical cosmic portal with seven guardian lights arranged in a constellation pattern, floating mystical runes, and the text ARCANEA against a deep purple nebula background"
      role="img"
      aria-label="Arcanea - Kingdom of Creation hero banner"
    >
  </div>

  <!-- Hidden text for screen readers -->
  <div class="sr-only">
    <h1>Arcanea</h1>
    <p>A living mythology for the age of AI-human co-creation</p>
  </div>
</header>
```

### Screen Reader Optimized
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Testing Checklist

Before deploying:

- [ ] **Visual Testing**
  - [ ] Displays correctly on desktop (1920px, 1440px, 1280px)
  - [ ] Displays correctly on tablet (768px, 1024px)
  - [ ] Displays correctly on mobile (375px, 414px)
  - [ ] Works on both light and dark backgrounds
  - [ ] Colors render accurately across browsers

- [ ] **Performance Testing**
  - [ ] Loads in under 1 second
  - [ ] No layout shift (CLS score good)
  - [ ] Proper caching headers set
  - [ ] File size appropriate (SVG: ~15KB, PNG: <1MB)

- [ ] **Browser Compatibility**
  - [ ] Chrome/Edge (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Mobile Safari (iOS)
  - [ ] Chrome Mobile (Android)

- [ ] **Accessibility**
  - [ ] Alt text descriptive and meaningful
  - [ ] ARIA labels present
  - [ ] Works with screen readers
  - [ ] Sufficient contrast ratios
  - [ ] Doesn't flash or cause seizures

## Conversion Commands Reference

### SVG to PNG (High Quality)
```bash
# Using Inkscape (best quality)
inkscape hero-banner-placeholder.svg \
  --export-png=hero-banner.png \
  --export-width=3000 \
  --export-height=1000 \
  --export-background-opacity=0

# Using ImageMagick (good quality)
convert -density 300 -background none \
  hero-banner-placeholder.svg \
  -resize 3000x1000 \
  hero-banner.png

# Using librsvg (fast)
rsvg-convert -w 3000 -h 1000 \
  hero-banner-placeholder.svg \
  -o hero-banner.png
```

### PNG to WebP (Web Optimization)
```bash
# Using cwebp (best compression)
cwebp -q 90 hero-banner.png -o hero-banner.webp

# Using ImageMagick
convert hero-banner.png -quality 90 hero-banner.webp
```

### Generate Multiple Sizes
```bash
#!/bin/bash
# generate-sizes.sh

SIZES=(
  "3000:1000:hero-banner-full"
  "1500:500:hero-banner-medium"
  "750:250:hero-banner-small"
  "1500:500:twitter-header"
  "1584:396:linkedin-banner"
  "820:312:facebook-cover"
)

for size in "${SIZES[@]}"; do
  IFS=':' read -r width height name <<< "$size"
  inkscape hero-banner-placeholder.svg \
    --export-png="${name}.png" \
    --export-width=$width \
    --export-height=$height
  echo "Generated ${name}.png (${width}x${height})"
done
```

## Progressive Enhancement

### Picture Element for Multiple Formats
```html
<picture>
  <!-- WebP for modern browsers -->
  <source type="image/webp" srcset="
    /assets/hero-banner-small.webp 750w,
    /assets/hero-banner-medium.webp 1500w,
    /assets/hero-banner-full.webp 3000w
  ">

  <!-- PNG fallback -->
  <source type="image/png" srcset="
    /assets/hero-banner-small.png 750w,
    /assets/hero-banner-medium.png 1500w,
    /assets/hero-banner-full.png 3000w
  ">

  <!-- SVG ultimate fallback -->
  <img
    src="/assets/hero-banner-placeholder.svg"
    alt="Arcanea - Kingdom of Creation"
    loading="eager"
    style="width: 100%; height: auto;"
  >
</picture>
```

## Common Issues & Solutions

### Issue: Banner appears too large on mobile
**Solution:** Add max-height constraint
```css
@media (max-width: 768px) {
  .hero-banner img {
    max-height: 250px;
    object-fit: cover;
    object-position: center;
  }
}
```

### Issue: Colors look washed out
**Solution:** Check color profile and add CSS filters
```css
.hero-banner img {
  filter: contrast(1.05) saturate(1.1);
}
```

### Issue: SVG not rendering in older browsers
**Solution:** Provide PNG fallback
```html
<picture>
  <source type="image/svg+xml" srcset="hero-banner-placeholder.svg">
  <img src="hero-banner.png" alt="Arcanea - Kingdom of Creation">
</picture>
```

### Issue: Banner causes layout shift
**Solution:** Set explicit aspect ratio
```css
.hero-banner {
  aspect-ratio: 3 / 1;
  width: 100%;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Next Steps After Implementation

1. **Monitor Performance**
   - Use Lighthouse to check Core Web Vitals
   - Monitor page load times
   - Check image optimization scores

2. **Gather Feedback**
   - A/B test with different variations
   - Check analytics for user engagement
   - Get user feedback on visual appeal

3. **Iterate and Improve**
   - Generate AI-enhanced version using prompt guide
   - Create seasonal/themed variations
   - Develop animated versions

4. **Expand Asset Library**
   - Create mobile-specific variants
   - Design dark/light mode versions
   - Develop related visual assets

## Support & Resources

- **Documentation**: See README.md in this directory
- **AI Generation**: See hero-banner-prompt.md for AI version
- **Preview**: Open preview.html in browser for live preview
- **Design System**: Refer to Arcanea Design System in `.claude/CLAUDE.md`

---

## Quick Copy-Paste Implementations

### GitHub README (Minimal)
```markdown
![Arcanea](./oss/assets/hero-banner-placeholder.svg)
```

### GitHub README (Full)
```markdown
<div align="center">
  <img src="./oss/assets/hero-banner-placeholder.svg" alt="Arcanea - Kingdom of Creation" width="100%">

  <h1>Arcanea</h1>
  <p><em>A living mythology for the age of AI-human co-creation</em></p>

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Stars](https://img.shields.io/github/stars/yourusername/arcanea)](https://github.com/yourusername/arcanea)
  [![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?color=7289da&label=Discord&logo=discord)](https://discord.gg/arcanea)
</div>
```

### Landing Page Hero (React)
```jsx
export default function Hero() {
  return (
    <section className="relative w-full">
      <img
        src="/assets/hero-banner-placeholder.svg"
        alt="Arcanea - Kingdom of Creation"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Enter the Kingdom
          </h1>
          <button className="px-8 py-3 bg-teal-400 text-black rounded-lg">
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
```

Ready to implement! Choose the approach that best fits your platform and use case.
