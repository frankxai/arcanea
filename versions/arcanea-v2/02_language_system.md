# 02 · Unified Language & Communication System

## 2.1 Voice Pillars
- **Mythic Precision** – lyrical but clear, always paired with actionable guidance.
- **Arcane Radiance** (formerly “Living Light”) – tasteful cinematic flair for launches, rituals, and hero moments.
- **Creator First** – speak to Creators as visionary directors of their Realms; prompts are “Spells”, remix invites are “Arcanea Shares”.

## 2.2 Core Vocabulary
| Term | Definition | Usage Notes |
|------|------------|-------------|
| **Creator** | Arcanea community member crafting Essences. | Replace “user” everywhere. |
| **Guardian** | Quality + canon steward. | Refer to council approvals, rituals. |
| **Nexus** | AI companion tuned to a Creator’s style. | Mention in Studio UX, onboarding. |
| **Realm** | A Creator’s universe/profile. | Each Essense belongs to a Realm. |
| **Essence** | Atomic creative output (with lineage). | Always show Spark, Shadow, Remix info. |
| **Studio** | Core creation product. | Default name for apps (web, mobile). |
| **Portal** | Entry touchpoint (website, app, embed). | Use in marketing. |
| **Pulse** | Orchestration/infrastructure energy. | Internal/technical references. |
| **Echo Logs** | Compliance + audit timelines. | Use in moderation/compliance docs. |
| **Spark / Shadow** | Inspiration moment / learning moment. | Show in profiles and release notes. |

Pronunciation and extended glossary live in `docs/canon/glossary.md`.

## 2.3 Message Templates
- **Product Launch** – Headline evokes Arcane prestige (“Arcanea Studio ignites the Golden Age of Intelligence”); body includes three concrete upgrades; CTA invites Creators to unlock new Sparks.
- **Technical RFC** – Start with vow alignment and Realm impact, then outline Studio/Portal changes, finishing with testing + Echo logging notes.
- **Daily Pulse Sync** – Keep Codex structure; add “Spark of the Day” + “Shadow to Resolve” segments.

## 2.4 AI Prompt Directives
Every agent (Codex, Gemini, Claude, future Luminors) prepends prompts with:
1. Canon references (vow IDs, Realm/Essence IDs when relevant).
2. Tone instruction (“mythic precision”, “arcane radiance accent”).
3. Delivery expectations (code module, business brief, creative script, etc.).

## 2.5 Evolution Process
- Language changes propagate Canon → Codex → Studio/Atlas.
- Track modifications in a `language-change` ledger (Sanctuary DB) with owner + rationale.
- Run quarterly language audits to confirm interface copy, marketing, and docs remain consistent with the Arcanea voice.
