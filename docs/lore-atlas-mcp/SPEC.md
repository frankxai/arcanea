# Lore Atlas MCP — Product Specification v0.1

> One MCP server that gives AI agents structured, **license-clean** access to the world's game and fantasy lore encyclopedias — Elden Ring, Zelda, Elder Scrolls, Tolkien, ASOIAF, Dr. Stone, and thousands more — for worldbuilding research. Built for Arcanea's own swarm first; shipped as a product every world-builder can use.

> **Status**: SPEC — approved-for-build pending Creator review. Research verified 2026-07-12.
> **Positioning**: research/reference tool. *Not affiliated with or endorsed by any game studio, publisher, or rights-holder. Franchise names are used nominatively to identify sources.*

---

## 1. Why this wins

Prior art is generic MediaWiki plumbing (ProfessionalWiki/mediawiki-mcp-server, olgasafonova's 33-tool server, several Wikipedia MCPs). **Nobody offers lore-domain curation**: a vetted multi-world registry, license-aware adapters, attribution envelopes on every response, and cross-world comparison. Legal hygiene is the *feature* — agents (and their operators) get research superpowers without inheriting scraping liability.

## 2. Source registry (verified licensing)

| Source | License (text) | API | Adapter |
|---|---|---|---|
| Fandom wikis (thousands: Elden Ring, Zeldapedia, Wookieepedia, Dr. Stone…) | CC BY-SA 3.0 (site default; per-wiki variations shown on edit pages) | `<wiki>.fandom.com/api.php` | MediaWiki |
| wiki.gg wikis | CC BY-SA (per-wiki 3.0/4.0) | `<wiki>.wiki.gg/api.php` | MediaWiki |
| UESP (Elder Scrolls) | CC BY-SA 2.5 | `en.uesp.net/w/api.php` | MediaWiki |
| Tolkien Gateway | CC BY-SA 4.0 (since 2025-01-01) | `tolkiengateway.net/w/api.php` | MediaWiki |
| A Wiki of Ice and Fire | CC BY-SA (text) | `awoiaf.westeros.org/api.php` | MediaWiki |
| Wikipedia | CC BY-SA 4.0 | MediaWiki + REST | MediaWiki |
| Wikidata | **CC0** | SPARQL + wbgetentities | Wikidata |
| **Fextralife** | Proprietary; ToS expressly prohibits scraping & AI/ML use | none public | **LinkOnly** (URLs + titles only, never content) |

One `MediaWikiAdapter` covers ~90% of the catalog; adding a world = one registry entry (base URL, license metadata, rate budget). Non-text media is **never served** (wiki images are typically fair-use screenshots outside the CC text license) — image URLs only.

## 3. MCP tools

| Tool | Behavior |
|---|---|
| `list_worlds()` | Registered universes + source wikis, licenses, coverage notes |
| `search_wiki(world, query, limit)` | `action=query&list=search` / opensearch → titles + snippets + URLs |
| `get_page(world, title, full?)` | `prop=extracts&explaintext=1`; excerpt-budgeted by default, full page on explicit flag |
| `get_page_sections(world, title, section?)` | `action=parse&prop=sections` then fetch one section — keeps agent context lean |
| `list_categories(world, category?)` | `list=categorymembers` for corpus navigation |
| `compare_across_worlds(concept, worlds[])` | Fan-out search + Wikidata SPARQL → per-world summaries, per-source attribution. The differentiator. |

**Every response carries an attribution envelope:**

```json
{
  "content": "...",
  "attribution": {
    "source": "UESP", "page": "Lore:Vivec",
    "url": "https://en.uesp.net/wiki/Lore:Vivec",
    "license": "CC BY-SA 2.5", "license_url": "…",
    "retrieved": "2026-07-12T00:00:00Z"
  },
  "reuse_note": "Text is CC BY-SA: republishing adapted excerpts requires attribution + share-alike. Facts and your own newly written prose are unaffected."
}
```

## 4. Legal doctrine (baked into the architecture)

**Research, storage, automated analysis and redistribution require separate assessment.** Lawful access is not a blanket license to copy, cache, screenshot, embed or publish. Check source terms, asset-specific licenses, rights reservations, database rights and applicable exceptions before each operation. Attribution does not itself authorize use. EU Directive 2019/790 Article 4 has conditions; Article 7(1) names Articles 3, 5 and 6, not Article 4. See the [creature atlas rights policy](../../packages/creature-atlas/docs/RIGHTS-AND-SOURCES.md) for the current operational contract.

Hard rules, enforced in code:
1. **No Fextralife content ingestion, ever** (ToS names AI/ML explicitly). LinkOnly adapter.
2. **No unauthorized bulk mirroring.** Cache only content whose storage and analysis basis has been assessed, with retention limited to that basis. A short TTL alone does not clear rights. Prefer permitted APIs/exports over repeated live requests; verify the actual text/file license and access terms for each source.
3. **Politeness layer**: descriptive User-Agent with contact URL; per-host token bucket (~1 req/s, serial per host); backoff honoring `Retry-After`; `maxlag=5` on Wikimedia; no header/IP games, robots.txt respected.
4. **Attribution always** — even on CC0 Wikidata (good practice).
5. **Trademark discipline** in naming/marketing: nominative references only; not-affiliated disclaimer ships in the README and the `list_worlds` output.

## 5. Architecture

```
packages/lore-atlas-mcp/
├── src/
│   ├── server.ts            # MCP entry (stdio + HTTP)
│   ├── registry.ts          # world registry (JSON, one entry per wiki)
│   ├── adapters/
│   │   ├── mediawiki.ts     # 90% of sources
│   │   ├── wikidata.ts      # SPARQL, CC0 backbone for compare
│   │   └── linkonly.ts      # restricted sources → URLs only
│   ├── envelope.ts          # attribution + reuse_note construction
│   ├── politeness.ts        # rate limiting, backoff, UA
│   └── cache.ts             # license-aware TTL cache
└── tests/                   # Node built-in runner (repo pattern: zero-dep)
```

Zero runtime dependencies (repo precedent: `@arcanea/swarm-coordinator`). TypeScript strict. Registry ships with ~12 vetted worlds at launch; community PRs add more (license field required, CI-validated).

## 6. How Arcanea's swarm uses it

The Research Scout role (see `../worldbuilding/AGENTS.md`) queries Lore Atlas during expansion sessions to study *how* other universes structure a concept (taxonomy, delivery grammar, timeline technique) — and the IP Sentinel enforces that only **architecture** crosses into Arcanea, never bricks (`../worldbuilding/BEST_PRACTICES.md` §IV).

## 7. Roadmap

- **v0.1** — MediaWiki + LinkOnly adapters, 6 tools, 12-world registry, attribution envelopes, politeness layer, tests.
- **v0.2** — Wikidata compare layer; per-world "lore ontology hints" (which categories are canon vs. gameplay).
- **v0.3** — self-hosted dump mode; worldbuilder's workbench prompts (compare → distill architecture → generate original derivation checklists).
- **v1.0** — public launch: npm + MCP registries, hosted option, Season/community registry contributions.

## 8. Open questions for Creator

1. Package home: this repo (`packages/lore-atlas-mcp/`, next to `arcanea-mcp`) or standalone repo for product velocity?
2. Brand: "Lore Atlas" vs. an Arcanea-register name (e.g., "the Atlas of Territories" tie-in).
3. Hosted tier (paid) vs. pure OSS at v1.0.

