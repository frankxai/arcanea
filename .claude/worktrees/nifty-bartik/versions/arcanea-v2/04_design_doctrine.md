# 04 · Arcanea Stagecraft Design Doctrine

## 4.1 Palette & Tokens
- Rebrand Aureline tokens as the **Arcanea Stagecraft Palette**—cinematic lighting presets for every Portal.
- Core tokens live in `docs/Codex-v2/03_design_system.md`; add optional **Arcane Radiance overlays** (`--radiance-dawn`, `--radiance-noir`, `--radiance-starlit`) for hero moments.
- Motion guidance: subtle breathing (3–5s) on hero sections only; provide “Still Mode” toggle.

## 4.2 Component Harmonization
- **Constellation Navigation** (Atlas) remains the signature map for Realms.
- **Studio Canvas** – replaces “Loom Thread Canvas”; layout lanes for Story (Chronos), Visual (Visio), Audio (Harmonia), Systems (Logic) using Stagecraft tokens.
- **Emotion Signals** – controlled color accents for Nexus states (Calm, Ignite, Reflect) with strict contrast ratios.

## 4.3 Platform Kits
- **Web**: Tailwind theme exporting Stagecraft variables + `radiance` utilities.
- **Mobile**: NativeWind + Reanimated presets (`radiancePulse`, `portalReveal`).
- **Content Creation**: Provide Figma/After Effects kits for marketing, Soul Guardians visuals, Realm trailers.

## 4.4 Content & Identity
- Imagery blends clean interface surfaces with arcane glyphs and cinematic gradients.
- Iconography stays minimalist; allow radiant edges for key icons (Arcanea crest, ARC/NEA marks).
- Typography: Playfair Display (headlines), Inter (body). Add “Arcanea Title” variant (Playfair stylistic set) for cinematic posters.

## 4.5 Governance
- Stagecraft Council reviews proposals monthly; log changes with `design-change` references.
- Accessibility checklist: contrast ≥ 4.5:1, animation toggle, screen-reader labels aligning with new terminology (Creator, Essence, Realm).
