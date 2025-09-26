# Arcanea Brand Assets

This directory contains static brand assets that are version-controlled with the codebase.

## Directory Structure

```
brand/
├── logos/           # Arcanea logos (SVG, PNG variants)
├── icons/           # App icons and favicons
├── backgrounds/     # Hero backgrounds and patterns
├── ui-elements/     # Design system elements
├── characters/      # Brand character illustrations
└── mockups/         # Marketing and showcase mockups
```

## Asset Guidelines

### Logos
- Use SVG format for scalability
- Provide PNG fallbacks in multiple sizes
- Include light/dark variants

### Icons
- 16x16, 32x32, 180x180, 512x512 sizes
- SVG and PNG formats
- Follow app icon guidelines

### Backgrounds
- High resolution (2x for retina)
- WebP format preferred for web
- Include dark mode variants

## Usage

Import assets in components:
```tsx
import Arcanea from '/brand/logos/arcanea.svg'
```

Reference in HTML:
```html
<img src="/brand/logos/arcanea-logo.png" alt="Arcanea" />
```