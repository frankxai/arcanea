# Arcanea Image-Gen Harness Routing

> How Arcanea image generation is routed across harnesses. Mirrors FrankX's `lib/gen`
> substrate: the product is not any single model — it's the curated lanes + the routing
> table + the council gate. Centralize on the routing layer, never on a vendor.

---

## The core mechanic

**Claude Code does not generate images.** It emits ready-to-paste **prompt-packs** (see
`prompt-packs/`) that the image-capable harnesses consume **in their own CLIs**. The lane
(`lanes.ts`) carries the palette, prompt fragments, negative prompt, and quality bar; this
file decides *which harness* paints it.

Two rules sit above everything:

1. **One lane per asset.** Pick a single `LaneId`, hold its `qualityBar`. Never mix lanes on one image.
2. **Council-gate before any batch.** Run the council review (Brand / Art Director / Storyteller
   lenses) on a single organic-first render before fanning out a batch. No batch generation before approval.

---

## The harnesses — when and how

### 1. Grok Imagine — `grok-imagine`
- **Where it runs:** inside the **Grok CLI / TUI** (SuperGrok-included, no extra API cost).
- **When to use:** fast ideation and variation sweeps. First-pass exploration, "give me ten silhouettes," cheap iteration before committing to a hero render.
- **How:** paste the lane prompt into Grok Imagine in the Grok TUI; generate variations; pick the strongest seed to carry forward.
- **Strength:** speed and volume. **Weakness:** less reliable for legible text / fine typographic detail.

### 2. Codex gpt-image-2 — `gpt-image-2`
- **Where it runs:** inside **Codex**, via the `$imagegen` tool (counts toward the ChatGPT plan).
- **When to use:** clean single renders — one polished hero, NFT 1/1, card art where you want a controlled, predictable result.
- **How:** in Codex, invoke `$imagegen` with the lane positive prompt + negative prompt; one render at a time.
- **Strength:** clean, controllable single images. **Weakness:** one-at-a-time, plan-metered.

### 3. Antigravity / Gemini NB2 / Nano Banana Pro — `nano-banana-pro` · `nano-banana-2`
- **Where it runs:** **Antigravity / Gemini** built-in (free preview engine).
- **When to use:** lore-accurate and text-legible heroes. Search-grounded generation means labels, names, and technical/lore detail render legibly and accurately — the right call for guardian portraits, world-boss heroes, and anything carrying on-image text.
- **How:** in Antigravity/Gemini, run the built-in image engine (Nano Banana Pro for best fidelity, NB2 for fast iteration) with the lane prompt; enable search grounding for lore-heavy renders.
- **Strength:** legibility + grounding + free. **Weakness:** preview-tier availability can shift.

### 4. Higgsfield MCP — `higgsfield`
- **Where it runs:** via the **Higgsfield MCP** (paid).
- **When to use:** **reserve for video**, or when a native subscription-included quota is exhausted. Not the default for stills.
- **How:** call the Higgsfield MCP tools (`generate_image` / `generate_video`) with the lane prompt; mind the credit cost.
- **Strength:** cinematic motion + frontier models. **Weakness:** paid — last resort for stills.

**Default order of preference for stills:** native subscription-included engines first
(Grok Imagine for ideation → NB Pro / gpt-image-2 for heroes), Higgsfield only for video or when a native quota runs out.

---

## Lane → harness table

| Lane (`LaneId`)       | Primary harness                          | Fallback                          | Why |
|-----------------------|------------------------------------------|-----------------------------------|-----|
| `leviathan-abyssal`   | Nano Banana Pro (`nano-banana-pro`)       | gpt-image-2 → Higgsfield          | Lore-accurate scale + atmospheric depth; grounding keeps the abyss coherent. Higgsfield for the moving world-boss shot. |
| `godbeast-divine`     | Nano Banana Pro (`nano-banana-pro`)       | gpt-image-2 → Grok Imagine        | Radiant divine light renders best with grounded fidelity; Grok for fast variant sweeps. |
| `guardian-portrait`   | Nano Banana Pro (`nano-banana-pro`)       | gpt-image-2 → Higgsfield          | Character fidelity + legible Guardian/Gate detail; search-grounded for canon accuracy. |
| `luminor-card`        | Codex gpt-image-2 (`gpt-image-2`)         | Nano Banana Pro → Grok Imagine    | Clean controlled single render with deliberate name-plate negative space. |
| `nft-1of1`            | Codex gpt-image-2 (`gpt-image-2`)         | Nano Banana Pro → Higgsfield      | Gallery-grade controllable single mint; one careful render over volume. |

**Ideation across all lanes:** start in Grok Imagine (`grok-imagine`) for cheap variation sweeps,
then promote the winning seed to the lane's primary harness for the final render.

---

## Anti-patterns (never)

- Recenter Arcanea image-gen on one vendor — the lanes + routing table + council gate are the moat.
- Mix lanes on one asset.
- Batch-generate before the council approves the organic-first single.
- Reach for paid Higgsfield for a still when a native subscription engine can do it.
- Claim a render is "on brand" without checking it against the chosen lane's `qualityBar`.
