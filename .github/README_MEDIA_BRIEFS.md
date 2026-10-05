# Arcanea GitHub identity: media briefs

These are production prompts for **original Arcanea assets**. The README currently uses the existing `assets/premium/arcanea-wordmark.png` and `assets/premium/arcanea-hero-premium.png`. They were selected because they contain no stale numbers or false canon labels. Do not substitute `assets/premium-r3/01-hero-banner.png` (unverified counts) or `assets/premium-r3/11-creator-journey.png` (incorrect Gate and rank labeling).

## What to take from the references

- [LobeHub](https://github.com/lobehub/lobehub) makes its GitHub entry easy to scan with a short promise, language and product links, visual explanation, setup instructions, and ecosystem navigation. Its [asset repository](https://github.com/lobehub/lobe-assets) shows how one identity can provide wordmark, flat mark, high-contrast mark, and favicon variants.
- [OpenClaw](https://github.com/openclaw/openclaw) uses a memorable single-symbol identity and a direct product promise.
- [Hermes Agent](https://github.com/NousResearch/hermes-agent) pairs a distinctive symbol with a concise positioning line and practical install guidance.

These projects are references, not Arcanea partners or integrations. Their logos and trademarks remain theirs. If a future compatibility page names one of them, use an unmodified official mark only beside an accurate, tested integration and a source credit. Do not combine their marks into Arcanea's identity or imply endorsement.

## GitHub description and topics

The live repository description already leads with “build living worlds with AI agents.” Keep that product promise aligned with the README. GitHub topics currently include `creative-ai`, `storytelling`, and `world-building`, alongside developer terms. If the topic set is revised, prioritize these creator terms and consider `lore`, `worldbuilding`, and `game-writing` only where the repository content supports them. GitHub topics are repository settings; this document does not change them.

## Asset 1: responsive Arcanea logo set

**Output:** editable SVG wordmark, icon, light and dark variants; 512 px transparent PNG exports; 32 px favicon test.

**Prompt for a local Codex CLI design task:**

> Study the existing Arcanea wordmark in `assets/premium/arcanea-wordmark.png`, the local brand guidance in `.github/ARCANEA_VISUAL_ECOSYSTEM.md`, and the locked canon at `.arcanea/lore/CANON_LOCKED.md`. Design an original, simple Arcanea symbol that remains identifiable at 32 px and works beside the current wordmark. Explore a gate, arc, or light/void relationship without borrowing the shape of any third-party logo. Produce editable SVG variants on transparent backgrounds, then render both dark and light previews. Keep lettering editable as text in the source where possible. Do not use all-caps for descriptive copy. Show the 32 px result before proposing it for the README. Record the source, model/tool, prompt, revision, and rights in the visual provenance sidecar and required ledgers.

**Acceptance:** legible at 32 px; no tiny ornament; good contrast on light and dark GitHub themes; no third-party mark; source SVG and exports agree.

## Asset 2: world continuity diagram

**Output:** editable SVG and a text alternative suitable for README and docs.

**Prompt:**

> Make a restrained Arcanea diagram showing how one creator idea connects world rules, characters and places, stories and media, then feeds revisions back into the same world. Use the existing Arcanea palette and typography guidance. Make the relationships readable on a 375 px screen. Use exact text labels from the approved README; do not invent product capabilities, metrics, or Gate names. Provide a linear text equivalent. Review the output against `.arcanea/lore/CANON_LOCKED.md`.

**Acceptance:** clear reading order, mobile legibility, text alternative, editable labels, no invented feature claims.

## Asset 3: short product demonstration

**Output:** 20–30 second silent MP4 or WebM with captions, plus a static poster and transcript. A GIF may be exported only if it remains small and readable; the static poster is the default README asset.

**Prompt:**

> Record or storyboard a real Arcanea flow from one idea to a connected world artifact, using only features visible in the current product. Show the source idea, one world rule or character, the resulting creation, and the continuity link between them. Use sentence-case captions, generous pause time, and a calm Arcanea visual language. Do not fabricate screens or imply that a preview feature is live. Provide captions and a reduced-motion/static version. If a real flow cannot be captured, deliver a labeled concept storyboard rather than a fake product demo.

**Acceptance:** true to the deployed revision, readable captions, no rapid flashing, useful without audio, poster and transcript available.

## Production gate

Local Codex CLI can prepare SVG, storyboards, captions, and export scripts. Image or video generation requires a configured media engine and machine admission; having this prompt does not mean the asset has been generated. Before adding any new media to the repo, record its provenance sidecar and both Arcanea asset ledgers, check the locked canon, review on mobile and both GitHub themes, and obtain the relevant visual approval. Keep third-party reference logos out of generated outputs.

The site currently describes itself as “MIT open source,” while this repository's root `LICENSE` reserves rights unless a component has its own license. Resolve that public wording before adding an open-source badge or claim here.
