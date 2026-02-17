# 03 · Arcanea Stagecraft Design System

## 3.1 Visual Ethos
- **Cinematic Minimalism** – widescreen compositions, deep gradients, precise lighting.
- **Arcane Geometry** – concentric circles, sigils, constellation nodes anchoring layouts.
- **Tactile Light** – luminous edges, glass layers, subtle volumetric shadows.

## 3.2 Stagecraft Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--stagecraft-void` | `#05040D` | Nebula backdrops |
| `--stagecraft-deep` | `#0A0C19` | Cards, panels |
| `--stagecraft-lumen` | `#6E6BFF` | Primary accents |
| `--stagecraft-flare` | `#BE73FF` | Highlights, emphasis |
| `--stagecraft-ice` | `#F4F7FF` | Light text |
| `--stagecraft-ember` | `#FF9F6E` | Alerts, momentum |

Optional **Arcane Radiance Overlays** (`--radiance-dawn`, `--radiance-starlit`, `--radiance-noir`) for hero sections.

## 3.3 Typography
- **Display**: Playfair Display 600–700.
- **Body**: Inter 100–900 (letter-spacing +1%).
- **Code**: JetBrains Mono for prompts and developer surfaces.

## 3.4 Signature Components
- **Constellation Navigation** – orbital map for Realm/Portal selection.
- **Studio Canvas Panels** – modular sections for Story, Visual, Audio, Systems creation.
- **Pulse Cards** – gradient status cards for rituals, releases.
- **Essence Timeline** – Echo Log view showing Spark/Shadow + remix lineage.
- **Guardian Badges** – hexagon crest with glow tiers (Bronze, Silver, Lumen, Etheric).

## 3.5 Motion Guidelines
- Standard UI transitions: 180–300ms ease-out.
- Arcane Radiance loops: 3–5s low-frequency “breath” on hero visuals only.
- Trigger on interaction/scroll to preserve performance; include Still Mode toggle.

## 3.6 Accessibility
- Contrast ≥ 4.5:1 for text; test overlays at all opacity levels.
- Provide Still Mode (no motion) and High Contrast options.
- ARIA labels align mythic terminology with functional descriptions (e.g., “Generate Essence button”).

## 3.7 Asset Library
- Store vector sigils in `public/sigils/` + PNG fallbacks.
- Lottie animations for Portal transitions, Soul Guardians visuals.
- Document hero ratios (16:9, 3:2, 1:1) for Studio, Profiles, Gallery.

## 3.8 Implementation
- Tailwind + NativeWind configs export Stagecraft tokens (`stagecraft.*`, `radiance.*`).
- Provide `@arcanea/stagecraft` package for CSS variables, gradients, shadows.
- React Native theme includes gradient utilities and Reanimated presets.

## 3.9 Review Rituals
- Monthly **Stagecraft Council** reviews design updates.
- Keep Figma library “Arcanea Stagecraft v1” in sync; log changes via `design-change` references in Sanctuary.
