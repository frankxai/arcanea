# Video Providers: Replicate and Fal

This repo includes minimal adapters in `apps/studio` for Replicate and Fal-based text-to-video pipelines.

## Replicate

Environment variables:
- `REPLICATE_API_TOKEN`: your API token
- `REPLICATE_MODEL_VERSION`: model version ID (e.g., a text-to-video model)
- Optional `REPLICATE_WEBHOOK_URL`: webhook for completion events

Endpoints:
- `POST /api/video/replicate` { prompt }
- `GET  /api/video/replicate?id=...` — poll status

Notes:
- Choose a model that supports text-to-video (e.g., Pika or other available models on Replicate). Copy the version ID into `REPLICATE_MODEL_VERSION`.

## Fal

Fal supports invoking pipelines via `fal.run` and other endpoints.

Environment variables:
- `FAL_KEY`: your API key
- `FAL_API_URL`: pipeline invoke endpoint (e.g., `https://fal.run/fal-ai/stable-video`)
- `FAL_STATUS_URL`: endpoint to poll status with `?id=...` (depends on chosen pipeline)

Endpoints:
- `POST /api/video/fal` { prompt } — creates a job
- `GET  /api/video/fal?id=...` — polls status

Notes:
- Different pipelines return different shapes; the adapter normalizes `status` and `outputUrl` when possible. Adjust as needed for your chosen Fal pipeline.

## Roadmap
- Add provider registry and queue/webhook based processing for long-running jobs.
- Persist results to database and auto-publish to Gallery.
