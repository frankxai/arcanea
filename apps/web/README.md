# Arcanea Web (apps/web)

Marketing site for arcanea.ai

- Next.js 14 (App Router)
- Tailwind for styling

Run locally:

```
pnpm install
pnpm --filter @arcanea/web dev
```

Static showcases are served from `/showcase/*`.

## Key routes

- `/` - hub overview with quick links to Chat, Studio, Gallery, and Library
- `/library` - immersive Arcanea Library with multi-tome support drawing from `Arcanean Library/experience/book/arcanea-codex.json`, `Arcanean Library/experience/book/arcanea-atelier-codex.json`, and `Arcanean Library/experience/book/arcanea-oracles-codex.json`
