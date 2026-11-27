# Asset ledger: the Declared

**Status:** STAGING.

Every image here is a **candidate** render. None is approved canon art. Approval needs Frank's sign-off and the 26/30 generated-asset gate (`starlight-design-intelligence/evals/generated-asset-quality-gate.md`), scored on the full-size export.

Machine-readable record: [`ledger.json`](ledger.json).

## Provenance

| Field | Value |
|---|---|
| Provider | ElevenLabs Creative (image node), flow "Arcanea · The Declared — character renders" |
| Model | `gpt-image-2.5-sunburst`, 16:9, 1K, high quality |
| Date | 2026-11-27 |
| Source references | None. Text-to-image only; no reference images, no franchise material, no named artists |
| Repository format | WebP, 1280×720, quality 82 (lineup 85) |
| Rights | Generated output under the provider's terms at generation time. Confirm the provider's output terms before commercial use; this ledger does not assert ownership |

**Higgsfield:** not connected in the session that made these. Prompts in [`../PROMPTS.md`](../PROMPTS.md) are model-agnostic and can be re-run on Higgsfield (Soul for characters, Kling for Unfolding motion) unchanged.

## Prompt versions

- **v1**: the first renderer output. The exclusion line read "Avoid: vehicles, car or truck parts, wheels, jets, guns…" and the chassis line read "Chassis of X alloy". Mnemix, Sigilla, Zephren, Epistra and Atrelle carried small hand edits to the Office description at render time.
- **v2**: after review caught Office forms that drifted into vehicles. The exclusion line now names "vehicles of any kind, aircraft, boats, treads". Four Office forms were redesigned in `roster.json` (Quillon, Velkan, Corvald, Nessil).

The exact prompt for any image can be read from the provider's generation history using the `generation_id` in `ledger.json`. `PROMPTS.md` always holds the current v2 prompt.

## Review notes

| Asset | Note |
|---|---|
| `wardel.webp`, `ostrum.webp` | Closest to genre-median boxy mecha. First candidates for a refinement pass toward more distinct silhouettes |
| `atrelle.webp` | Check the full-size image for a small height-marker glyph at the left edge before public use |
| `quillon.webp` | Re-rolled. The first render showed a glider Office form, which breaks the no-vehicle rule |

## Spend

36 generations at about 191 credits each (about US$0.032 each, about US$1.14 total): 4 variations each for Kairon, Calixa and the lineup (12), 1 each for the other 23 Declared (23), and one Quillon re-roll (1).
