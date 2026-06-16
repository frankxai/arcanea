# Arcanea

Arcanea is the public code mirror for [arcanea.ai](https://arcanea.ai), the creative intelligence universe for chat, lore, academy, and worldbuilding.

![Arcanea GitHub Hero](.github/assets/arcanea-github-main-hero.jpg)

> Premium visual identity per .github/ARCANEA_VISUAL_ECOSYSTEM.md (Lumina & Nero dance + Ten Gates; God of War meets Destiny ethereal 8K; Atlantean Teal #7fffd4 / Arcanean Gold #ffd700 / Cosmic Blue on Deep Void). Full alignment to DESIGN.md (tokens, Geist/Instrument/Mono, glass, no raw hex/emojis/Inter), TASTE.md 7 gates (AI-lab premium restraint, no slop), .arcanea/lore/VISUAL_DOCTRINE.md (luxury cosmic myth-tech, franchise eq, faction grammars).

## What this repo is

- The public mirror of the Arcanea web experience and supporting packages
- The best place to study the product architecture, design system, and lore model in public
- A pnpm/Turborepo monorepo centered on the active `apps/web` Next.js application

## Install

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev
```

## Quality commands

```bash
pnpm turbo run type-check --filter=@arcanea/web
pnpm turbo run lint --filter=@arcanea/web
pnpm turbo run build --filter=@arcanea/web
pnpm test:quick
```

## How this relates to Arcanea

Arcanea.ai is the live product. This repository is its public mirror. Product operations, private datasets, and some internal workflows may evolve outside this mirror, but this repo remains the canonical public code reference for the living universe.

## Ecosystem

- [arcanea-code](https://github.com/frankxai/arcanea-code): Guardian-routed coding CLI for the Arcanea ecosystem
- [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea): Arcanea overlay for oh-my-opencode
- [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator): multi-agent orchestration fork used for Arcanea swarm workflows

## Visual Ecosystem

See [.github/ARCANEA_VISUAL_ECOSYSTEM.md](.github/ARCANEA_VISUAL_ECOSYSTEM.md) for 7-repo hero prompts, badge standards (flat-square teal/gold/void), README template, and checklist. All assets generated god-mode with full doctrine (TASTE 7 + DESIGN tokens + VISUAL_DOCTRINE franchise/faction + PFP DNA where applicable). 20 Vanguard Forged PFPs + site heroes + Stellaris + factions + diagrams in production.

## License

See the repository license for usage terms.
