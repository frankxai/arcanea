# Arcanea

Arcanea is a transitional public mirror for selected code, public lore snapshots, and the [arcanea.ai](https://arcanea.ai) experience. Arcanea is an original entertainment universe; its Connector also helps creators build worlds they own.

![Arcanea GitHub Hero](.github/assets/arcanea-github-main-hero.jpg)

> Premium visual identity per .github/ARCANEA_VISUAL_ECOSYSTEM.md (Lumina & Nero dance + Ten Gates; God of War meets Destiny ethereal 8K; Atlantean Teal #00bcd4 / Arcanean Gold #ffd700 / Cosmic Blue on Deep Void). Full alignment to DESIGN.md (tokens, Geist/Instrument/Mono, glass, no raw hex/emojis/Inter), TASTE.md 7 gates (AI-lab premium restraint, no slop), .arcanea/lore/VISUAL_DOCTRINE.md (luxury cosmic myth-tech, franchise eq, faction grammars).

## What this repo is

- A transitional mirror of selected Arcanea web and technical work
- A public snapshot for studying architecture and explicitly released components
- A pnpm/Turborepo monorepo centered on the active `apps/web` Next.js application

This is a mixed repository. Public visibility does not make its story content,
brand, media, prompts, datasets, or every package open source. Read
[`governance/REPOSITORY_BOUNDARIES.md`](governance/REPOSITORY_BOUNDARIES.md)
before reusing anything.

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

Arcanea.ai is the live experience. Private repositories and approved release
manifests control production and unpublished canon. This repository is not the
master canon vault. For new work, the authority and conflict rules live in
[`governance/README.md`](governance/README.md).

## Community

- [Discussions](https://github.com/frankxai/arcanea/discussions) — questions, ideas, and showcases
- [arcanea.ai/community](https://arcanea.ai/community) — ways to contribute lore, agents, skills, code, art, and music

## Ecosystem

- [arcanea-code](https://github.com/frankxai/arcanea-code): Guardian-routed coding CLI for the Arcanea ecosystem
- [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator): multi-agent orchestration for Arcanea swarm workflows
- [arcanea-claw](https://github.com/frankxai/arcanea-claw): AI-powered creator media engine for Arcanea
- [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea): Arcanea overlay for oh-my-opencode

## License

The root repository notice is the default. Separately licensed technical
components keep their express licenses. Arcanea canon and media are covered by
[`LICENSE-CONTENT.md`](LICENSE-CONTENT.md); no code license grants story,
adaptation, merchandise, training, or trademark rights. Historical grants
remain attached to the revisions that carried them.
