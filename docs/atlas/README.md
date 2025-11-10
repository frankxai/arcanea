# Arcanea Atlas Microsite

The Atlas is an Astro-generated microsite that fuses canon, realm architecture, and execution telemetry into a single scroll experience.

## Project Layout

```
docs/atlas/
  ├─ package.json          # Astro workspace + data build scripts
  ├─ astro.config.mjs      # MDX + build configuration
  ├─ data/
  │   ├─ canon-manifest.json   # Curated configuration (realms, deities, luminors, open-source matrix)
  │   ├─ canon-sources.json    # Generated markdown payloads (run `npm run generate:data`)
  │   └─ README.md
  ├─ scripts/
  │   └─ build-data.ts         # Reads docs/canon/*.md → data/canon-sources.json
  └─ src/
      ├─ components/           # Constellation navigation, roadmap cards, truth list, etc.
      ├─ data/manifest.ts      # Type helpers + manifest exports
      ├─ pages/index.astro     # Atlas landing scroll
      └─ styles/global.css
```

Canon markdown lives in `docs/canon/`. Update those files first, then regenerate the derived data payload:

```bash
cd docs/atlas
npm install
npm run generate:data
npm run dev
```

## Dynamic Widgets

- **Status strategy widgets**: The roadmap and action plan cards are fed from `src/pages/index.astro`. Replace the placeholder arrays with data pulled from Notion/CSV by extending `scripts/build-data.ts` (e.g., hit Notion API, dump CSV to `data/status.csv`, and import it).
- **Real-time panels**: Astro supports server-side endpoints; add `/src/pages/api/status.json.ts` to proxy Supabase telemetry and hydrate client components via `on:visible` island architecture.
- **Constellation navigation**: Controlled by `data/canon-manifest.json → realms[]`. Add or reorder nodes to reflect Library, Sanctuary, Nexus, etc. Animations rely on CSS only.

## Archiving Legacy HTML

Once sections from the Expo-era HTML decks (`archive/old-structure/Arcanea App/*.html`) are migrated, move the originals into `docs/legacy-timelines/` and reference them from an Atlas "History" section. Tracking table:

| Legacy asset | Atlas destination | Status |
|--------------|-------------------|--------|
| `interactive-roadmap.html` | Roadmap cards (Phase I–III) | Pending refinement |
| `ecosystem-visualization.html` | Constellation navigation | Migrated (visual motifs reused) |
| `team-dashboard.html` | Guardian roster timeline | TODO |

## Next Extensions

1. Replace placeholder luminor names with canon once the Glossary is harmonized.
2. Add deity relationship diagram using D3/Canvas for Lumina ↔ Nero duality.
3. Integrate Mixpanel dashboards via embedded iframes or live charts after safety approvals.
4. Promote the build to `atlas.arcanea.ai` via Vercel output from `docs/atlas/dist/`.
