# Arcanea Web (`apps/web`)

The consolidated Arcanea web experience: public gateway, Academy, Studio, Gallery, Library, lore surfaces, and creator-facing routes.

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS with the Arcanean design system
- Supabase session refresh via app-level middleware

## Run locally

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm --filter @arcanea/web dev
```

The app runs on port `3001` by default.

## Quality checks

```bash
pnpm --filter @arcanea/web type-check
pnpm --filter @arcanea/web lint
pnpm --filter @arcanea/web build
```

## Key routes

- `/` - hub overview with quick links to Chat, Studio, Gallery, and Library
- `/academy` - creator learning and Gate-oriented Academy experience
- `/studio` - creation tools for images, stories, video, and creative workflows
- `/gallery` - visual creations and exploration surfaces
- `/library` - immersive Arcanea Library with multi-tome content
- `/lore` - Arcanea canon, Guardians, cosmology, and world surfaces
