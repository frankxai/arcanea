# Arcanea Chat (apps/chat)

Minimal public chat built with Next.js 14 + Vercel AI SDK.

## Running Locally

```
pnpm install
pnpm --filter @arcanea/chat dev
```

Set environment variables:

- `OPENAI_API_KEY` (required for text, and for image generation)
- Optional: `OPENROUTER_API_KEY` (overrides base URL to OpenRouter)
- Optional: `AI_MODEL` (default `gpt-4o-mini`)
- Optional: `OPENAI_IMAGE_MODEL` (default `gpt-image-1`)

## Endpoints

- POST `/api/chat` — text streaming via Vercel AI SDK
- POST `/api/image` — image generation via OpenAI Images

## Deploy

Create a new Vercel project from `apps/chat` (or filtered build) and map to `chat.arcanea.ai`.
