# Arcanea Creature Atlas

A research lexicon, a permission-aware image registry and a provenance graph. This extends `docs/lore-atlas-mcp/SPEC.md` and `docs/worldbuilding/patterns/ENCYCLOPEDIA_IA.md`; it does not replace accepted canon or the existing gallery.

Seed: 35 entities (22 official Wizarding World links, 12 tradition research candidates, 1 original proposal), 35 source records, 4 name-match edges and 1 private generated study. Only the Niffler official page was retrieved; other franchise links were discovered by a bounded URL map. No third-party creature images were downloaded. The franchise inventory is incomplete.

## Surfaces and state

- Live read-only API: https://arcanea-creature-atlas.frankxai.workers.dev/v1/entities
- Search example: https://arcanea-creature-atlas.frankxai.workers.dev/v1/entities?q=Niffler
- Next.js research UI: proposed `/atlas` route in this change. Not claimed deployed to arcanea.ai.
- Same-origin Next.js bridge: `/api/atlas`, optionally configured with server-only `ARCANEA_ATLAS_API_URL`.
- Catalog authority for this seed: `data/catalog.json`; D1 is the operational projection. Future editorial writes need an explicit sync/revision contract rather than editing both independently.
- Live D1: `arcanea-creature-atlas`, EU jurisdiction, seeded and query-tested.
- R2: existing `starlight-media-private`, prefix `arcanea/creature-atlas/`. Snapshot and generated WebP stored and ETags verified against local MD5. SHA-256 is the durable content identity; ETag is transfer verification here, not assumed SHA-256.
- Public image delivery checks entity visibility and independent asset grants. The sole generated study is review-pending and returns 404 publicly.
- Text vectors, image embeddings, bulk crawlers and a write API are not deployed. They have explicit activation criteria in the architecture and SOP.

Private image bytes do not belong in this public code mirror. `media/` is deliberately excluded. Local validation verifies their SHA-256 when present; CI validates registry integrity without requiring private media downloads.

## Verify

Run from this package:

```sh
node scripts/build-public.mjs
node scripts/validate.mjs
node --test tests/*.test.mjs
```

To regenerate the seed, run from the repository root:

```sh
node packages/creature-atlas/scripts/seed-sql.mjs > workers/creature-atlas/migrations/0002_seed.sql
```

Run the repository's normal web type-check/lint/build for the Next.js change. This session validates the isolated modules and SQL; a full monorepo build is a separate PR check.

Migrations use `IF NOT EXISTS` and seed `ON CONFLICT DO NOTHING`: replays do not overwrite reviewed records. Apply with Wrangler from `workers/creature-atlas`, or use the Cloudflare D1 API. Future migrations must be reviewed and versioned; do not rebuild production by dropping tables.

See [architecture](docs/ARCHITECTURE.md), [rights and sources](docs/RIGHTS-AND-SOURCES.md), [ingestion SOP](docs/INGESTION-SOP.md), [design prompts](prompts/CREATURE-DESIGN.md) and [deployment receipt](docs/DEPLOYMENT-RECEIPT.md).
