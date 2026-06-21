# Visual Plan — Season One Key Art Set

> **Status**: STAGING
> **Locked to**: `.arcanea/lore/VISUAL_DOCTRINE.md` (the aesthetic is law — do not reinterpret it).
> **Pipeline**: native gen first — the repo's `generate-arcanea-img.mjs` at root (`GEMINI_API_KEY`); Higgsfield MCP
> for hero/video *if connected in the executor's session*; Replicate for fine-tuned models. Never invent a new look; render the doctrine.
> **Output dir**: `public/story-progression/season-one/` · specs in `docs/story-progression/visual-specs/`.

---

## The look in one line

**Luxury cosmic myth-tech.** Crystal, starlight metal, living stone, celestial gold, liquid light. Cosmic-dusk
lighting, halo particle fields, bioluminescent accents. Warm gold / cool cosmic blue — never flat gray, never neon.
Not medieval grit, not isekai oversaturation, not MCU spandex, not grimdark. Museum-grade, high-fashion heroic.

---

## The set (10 assets, one body of work)

The whole set must read as **one season**, not ten unrelated images (K-Pop lens: consistency is the cover).
Lock a single color temperature and particle language across all ten before generating any.

| ID | Asset | Purpose | Doctrine anchor |
|---|---|---|---|
| V1 | **Season key art** — the seven, backlit, in the ruined Solar Sector street, dawn breaking. | Franchise poster. The image that makes someone fall in love before they understand it. | Starlight Corps poster rule: *show the stars* — reflected in armor / particle field. |
| V2 | Character plate — **Kaelindra Voss** (tactician, Academy-trained). | Hero card. | Noble angularity; star-sigil; military grace. |
| V3 | Character plate — **Ryn** (Gate-Touched, mid-cascade energy). | Hero card. | Cascade light behavior; chaotic-consciousness silhouette. |
| V4 | Character plate — **Solenne Ashmark** (Ironhold Stance, immovable). | Hero card. | Living-stone material; protective posture. |
| V5 | Character plate — **Taura Skein + Vaerith** (the living bond). | Hero card. | Bonded pair composition; sacred-beast anchor. |
| V6 | Character plate — **Caelum** (Synth, constructed consciousness). | Hero card. | Star-forged techno-organic; *not* generic robot. |
| V7 | Character plate — **Velindris** (the witness) + **Mireth** (the foreknowing). | Hero card (paired). | Restraint; one warm key light; mystery in shadow. |
| V8 | Antagonist plate — **Selvyn Ashvale, Herald of Fracture.** | The enemy who is partly right. | Void Ascendant grammar — *corrupted Void, not cartoon evil*. Cold, elegant, persuasive. |
| V9 | Establishing — **the Solar Sector haven**, exposed but holding (E06 beat). | World-building. | Cosmic-dusk atmospherics; sanctuary-under-threat mood. |
| V10 | Emblem — the **first Starbound Crew sigil** (the precedent of D2). | Brand mark / season logo. | Multi-pointed star logic; myth-tech minimalism; reads at 50px. |

---

## Prompt scaffold (every asset starts from this)

Codex/Grok fill the `[brackets]`; the constants are non-negotiable doctrine.

```
[subject + pose + emotional beat],
Arcanea universe — luxury cosmic myth-tech.
Materials: crystal, starlight metal, living stone, celestial gold, liquid light. Never plastic.
Lighting: cosmic dusk, halo particle field, star-ember atmospherics, bioluminescent accents.
Composition: [central emblem / sacred-beast anchor / elite lineup / vertical awe].
Color temperature: warm gold + cool cosmic blue. Never flat gray. Never neon.
Tone: cinematic, high-fashion heroic, museum-grade production value.
Negative: medieval mud, anime oversaturation, superhero spandex, grimdark gothic, stock-fantasy robes, plastic, beige.
Aspect: [2:3 poster | 4:5 plate | 1:1 emblem]. Ultra-detailed. 50px-legible silhouette.
```

### Worked example — V1 (season key art)
```
Seven figures from seven origin classes standing in a ruined Solar Sector street at the first second of dawn,
backlit, three Ascendant operatives unconscious in the foreground, the team not yet a team — proximity, not trust,
Arcanea universe — luxury cosmic myth-tech.
Materials: star-forged armor that holds light like a lantern, crystalline insignia, living-stone rubble, liquid-light cascade.
Lighting: cosmic dusk breaking to gold dawn, halo particle field, faint oath-glow on the armored figures.
Composition: elite lineup, vertical awe, stars reflected in armor and particle haze (Corps poster rule).
Color temperature: warm gold breaking the cool cosmic blue of night. Never flat gray. Never neon.
Tone: cinematic, high-fashion heroic, museum-grade.
Negative: medieval mud, isekai oversaturation, spandex, grimdark, stock robes, plastic, beige.
Aspect: 2:3 poster. Ultra-detailed. Each silhouette distinct at 50px.
```

---

## Pipeline (executable)

```bash
# 1. Native generation (default — uses the repo's existing gen scripts; needs GEMINI_API_KEY)
node generate-arcanea-img.mjs --spec docs/story-progression/visual-specs/V1.json \
  --out public/story-progression/season-one/V1.png

# 2. Hero / motion key art → Higgsfield MCP (optional path).
#    Check whether the `mcp__Higgsfield__generate_image` tool is present in your toolset.
#    If present: route the V1 prompt through it; upscale_image to 4K for the poster.
#    If absent: stay on the native generate-arcanea-img.mjs (Gemini) pathway above — do not block on Higgsfield.

# 3. Consistency lock: generate V1 first, extract its palette + particle language,
#    pin them into V2–V10 specs before generating the rest. One season, one body.
```

Each asset gets a JSON spec in `docs/story-progression/visual-specs/V{n}.json` (prompt, aspect, negative,
seed, doctrine-anchor) so a render is reproducible and reviewable before pixels are spent.

---

## Visual acceptance criteria (Board-aligned)

- **Jobs:** one glance communicates the season. Nothing in frame is decorative-only. Cut it if it doesn't earn its place.
- **Musk:** the image obeys Arcanea physics — oath-glow = rank, Shadow = corrupted Void, frequencies/colors consistent.
- **Buddha:** restraint. One hero light, one focal truth per frame. No particle-soup hiding a weak composition.
- **Rock Star:** it has edge and want — someone would make V1 their wallpaper. Beige = automatic reject.
- **K-Pop:** the ten assets share palette, light, and grammar. A single off-model asset fails the *whole set*.

No asset ships to the set until the Operator's self-score is ≥4 on all five lenses and the Queen confirms the
set reads as one season.
