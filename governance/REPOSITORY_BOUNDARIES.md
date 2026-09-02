# Repository boundaries

## Governing distinction

Arcanea is both an original entertainment universe and the name of a creator
experience. Those may share a doorway, but they may not share an implied
license.

> Arcanea may help you build your world. That does not make your world part of
> Arcanea, and it does not grant permission to build inside Arcanea.

## Target architecture

| Layer | Brand | Default rights | Canon authority | What belongs here |
|---|---|---|---|---|
| Universe | Arcanea | All rights reserved | Private canon vault plus approved release snapshots | Stories, characters, Guardians, Godbeasts, worlds, scores, art, screen/game bibles |
| Studio | Arcanea Studios / Press / Records | Proprietary | Release manifests | Production, publishing, audio, visual development, distribution, licensing |
| Creator experience | Arcanea Connector | Commercial product terms | None over user worlds | Guided worldbuilding, writing, image/music/video briefs, cinematic sites, export |
| Technical substrate | Starlight | Per-component license | None | Schemas, SDKs, validators, transport adapters, provider routing, receipts |

MCP is one transport supported by the Connector. It is not the permanent
customer category and it is never a license boundary.

## This repository during migration

`frankxai/arcanea` is a transitional mixed public mirror. Effective
2026-08-27:

- `.arcanea/lore/` is the only potentially authoritative public lore snapshot.
- `arcanea-lore/`, `sync/aios/lore/`, `.claude/lore/`, and other copies are
  legacy mirrors. They must not be edited as canon or used to compute public
  claims.
- `book/`, `book-de/`, `content/books/`, `content/fiction/`, and similar roots
  are manuscript inventory, not released books, unless a release manifest says
  otherwise.
- An open-source package must have its own license boundary and must not embed
  proprietary canon beyond minimal fixtures that are separately identified.
- Original lore, media, and manuscripts use `LICENSE-CONTENT.md` and the root
  repository notice unless a more specific historical license controls.
- No new crown-jewel canon should be authored in this public mirror. Publish a
  release-scoped snapshot from the private vault after approval.

## Clean destination repositories

1. `arcanea-canon` — private master canon, manuscripts, mystery ledger, rights
   evidence, and release snapshots.
2. `arcanea-studios` — private production and asset orchestration.
3. `arcanea-connector` — private/commercial creator experience with explicit
   user-IP terms.
4. `starlight-world-schema`, `starlight-sdk`, and `starlight-validators` —
   intentionally open components, each with a root license and NOTICE.
5. `arcanea-public` — release notes, selected public codex pages, press assets,
   and links; no operational secrets or unpublished manuscripts.

Repository creation and migration must follow the rights registry. Moving a
file does not change its historical license.

## Contribution boundary

Community creators own their original worlds and contributions unless a
separate signed agreement says otherwise. Community work is never official
Arcanea canon by default. Future participation has three explicit lanes:

- `compatible`: built with Starlight or Arcanea Connector; no Arcanea marks.
- `fan`: narrow policy permission, non-canon, clearly labeled.
- `licensed`: written franchise license, approved assets, quality gates, and
  revenue terms.

There is no default-published or default-canon state.
