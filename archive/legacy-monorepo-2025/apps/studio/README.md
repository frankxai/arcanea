# Arcanea Studio (apps/studio)

Image and video generation adapters.

- Image: `/api/image` (OpenAI Images)
- Video: `/api/video/replicate` and `/api/video/fal`

Run locally:

```
pnpm install
pnpm --filter @arcanea/studio dev
```

Environment variables:

- `OPENAI_API_KEY` (image)
- `REPLICATE_API_TOKEN`, `REPLICATE_MODEL_VERSION` (video)
- `FAL_KEY`, `FAL_API_URL`, `FAL_STATUS_URL` (video)
