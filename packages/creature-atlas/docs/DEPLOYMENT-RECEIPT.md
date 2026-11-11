# Deployment receipt · 30 October 2026

- D1 `arcanea-creature-atlas`, EU jurisdiction, schema and bounded seed applied successfully.
- Remote query counts: 22 franchise references, 12 tradition candidates, 1 original proposal.
- FTS5 remote query returned Niffler.
- Read-only Worker deployed successfully; workers.dev enabled, version previews disabled.
- `GET /health`: 200, schema 0.1.0.
- `GET /v1/entities?q=Niffler`: 200, expected entity, no private asset metadata.
- `GET /v1/assets/asset%3Atideglass-loomer-v1`: 404, as intended for review-pending art.
- Private R2 snapshot: `arcanea/creature-atlas/snapshots/2026-10-30/catalog-v0.1.0.json`, 63,666 bytes, ETag/local MD5 `2f2f36c1f0c425934e93df95e03ee1f6`.
- Private R2 generated WebP: 258,060 bytes; SHA-256 `83b2869a3269946ab3cc2e36a3f1ce943146747548230f1541069555fe6ae33f`; ETag/local MD5 `1cdbf9c65337492c3759f7150383edb5`.
- Local checks: catalog referential integrity, asset SHA-256, SQLite schema/seed, FK check, FTS query, append-only event trigger, JS syntax, five permission/privacy tests.
- Full Next.js monorepo build not run here. Frontend is a PR candidate, not claimed live on arcanea.ai.
- Vectorize and managed AI Search were not provisioned. No third-party media mirror, bulk crawl or fine-tuning dataset was created.

The API intentionally has no mutation endpoint, arbitrary URL fetcher or arbitrary R2-key resolver. Current public records are research metadata only.
