<div align="center">

<img src="assets/premium/arcanea-wordmark.png" alt="Arcanea" width="520" />

# Build living worlds with AI agents

Turn one idea into a connected world of lore, characters, rules, media, and agent work that can grow across sessions.

[Explore Arcanea](https://arcanea.ai/) · [Deutsch](README.de.md) · [Community](https://arcanea.ai/community) · [Contribute](CONTRIBUTING.md)

[![Website](https://img.shields.io/badge/Explore-arcanea.ai-00bcd4?style=flat-square&labelColor=0d1117)](https://arcanea.ai/)
[![License](https://img.shields.io/badge/License-see%20terms-c9a96e?style=flat-square&labelColor=0d1117)](LICENSE)

</div>

![Concentric gold gates around a teal light on a dark background](assets/premium/arcanea-hero-premium.png)

## Start with a world

Arcanea is a creative intelligence universe for writers, artists, and world builders. Its central idea is continuity: a character, a place, a rule, and a scene should belong to the same world instead of living in disconnected prompts.

The [live experience](https://arcanea.ai/) introduces the world through portals, canon guides, and creation paths. Some experiences on the site are marked **Preview** or **Dev preview**; those labels describe their current availability.

## Explore the universe

| Path | Where to begin |
| --- | --- |
| **Experience** | [Enter arcanea.ai](https://arcanea.ai/) and explore the available portals. |
| **Lore** | Read the [Arcanea Library](book/README.md) and the [German collection](book-de/README.md). |
| **Build** | Explore the [web app](apps/web/) and the [packages](packages/) in this public code mirror. |
| **Community** | Share ideas and questions in [Discussions](https://github.com/frankxai/arcanea/discussions) or visit the [community page](https://arcanea.ai/community). |

### One world, many forms

1. Begin with an idea.
2. Give it rules, characters, and places.
3. Create stories and media from that shared context.
4. Revise the world as each creation adds something new.

Arcanea's Ten Gates, Five Elements, Guardians, and creator ranks provide a shared vocabulary for its world. The [canon](.arcanea/lore/CANON_LOCKED.md) governs those names and relationships.

## Develop locally

This repository is the public code mirror of arcanea.ai and a pnpm/Turborepo monorepo. The active web application is in [`apps/web`](apps/web/).

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web
```

The app uses environment variables for its authenticated and AI features. See [`apps/web/.env.example`](apps/web/.env.example) before configuring a local instance. Public pages can be explored without those credentials; full Supabase and generation flows require the appropriate services.

### Check a change

```bash
pnpm turbo run type-check --filter=@arcanea/web
pnpm turbo run lint --filter=@arcanea/web
pnpm turbo run build --filter=@arcanea/web
```

`pnpm test:quick` also covers selected packages and may require their build artifacts first. See [contributing guidance](CONTRIBUTING.md) for the broader workflow.

## Arcanea ecosystem

| Project | Role |
| --- | --- |
| [arcanea-code](https://github.com/frankxai/arcanea-code) | Coding CLI for the Arcanea ecosystem |
| [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator) | Agent orchestration workflows |
| [arcanea-claw](https://github.com/frankxai/arcanea-claw) | Creator media engine |
| [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea) | Arcanea overlay for oh-my-opencode |

## Contribute and usage terms

Creators and developers can start with [CONTRIBUTING.md](CONTRIBUTING.md) or open a [Discussion](https://github.com/frankxai/arcanea/discussions). Public visibility does not grant permission to reuse all repository content. Read the [repository license notice](LICENSE) and any separate license attached to a component before reuse.

<div align="center">

*Enter seeking, leave transformed, return whenever needed.*

</div>

<!-- STARLIGHT:OPERATING:BEGIN v2 sha=9f8fecc91edc source=794db1e51a55a128816f7aa266eb0ac1dbd452c3 -->

## Agent operating guidance

Repository agents use the shared Starlight operating contract in `AGENTS.md` alongside local instructions.
The contract asks agents to establish a useful outcome, select relevant skills, complete authorized work,
verify current sources, refine the actual artifact, and report evidence and remaining gates.
It covers human agency, privacy, rights, resource stewardship and bounded proactivity.
Repository identity, brand, canon, build commands and release gates remain local.

[Pinned contract](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/agents-md/band-a.md)
· [Projection and verification](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/AGENTS-MD-CONTRACT.md)

These files supply operating guidance. They do not activate an agent, grant tool permissions,
schedule recurring work, certify compliance or prove a live capability.

<!-- STARLIGHT:OPERATING:END -->
