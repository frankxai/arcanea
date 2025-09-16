# Vercel Monorepo Setup (Arcanea)

Goal: Deploy each app as its own Vercel Project with a root directory override.

## Projects and Roots
- arcanea-web → Root: `apps/web`
- arcanea-chat → Root: `apps/chat`
- arcanea-studio → Root: `apps/studio`
- arcanea-gallery → Root: `apps/gallery`
- (optional) arcanea-academy → Root: `apps/academy`

## Steps
1. Push repo to GitHub (private or public as desired).
2. In Vercel, import the repo and create a project per app.
3. For each project, set "Root Directory" to the app folder.
4. Build & Install Commands can remain default (Vercel auto-detects Next.js). CI uses `pnpm` from the repo.
5. Add ENV vars under Project Settings → Environment Variables.

## Environment Variables
Chat & Studio:
- `OPENAI_API_KEY` (text, image)
- `OPENROUTER_API_KEY` (optional; sets baseURL to OpenRouter)
- `AI_MODEL` (optional; default: `gpt-4o-mini`)
- `OPENAI_IMAGE_MODEL` (optional; default: `gpt-image-1`)

Studio Video (Replicate/Fal):
- `REPLICATE_API_TOKEN`
- `REPLICATE_MODEL_VERSION`
- `REPLICATE_WEBHOOK_URL` (optional)
- `FAL_KEY`
- `FAL_API_URL`
- `FAL_STATUS_URL`

## Domains
- arcanea.ai → arcanea-web
- chat.arcanea.ai → arcanea-chat
- studio.arcanea.ai → arcanea-studio
- gallery.arcanea.ai → arcanea-gallery
- nexus.arcanea.ai → arcanea-nexus (when ready)

## Tips
- Use branch previews for rapid iteration on features.
- Protect production env vars; use Vercel Environments (Preview/Production).
- For long video jobs, prefer webhooks over polling in production.
