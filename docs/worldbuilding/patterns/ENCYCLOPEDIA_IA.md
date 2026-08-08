# ENCYCLOPEDIA_IA.md — Information Architecture for the Arcanea Encyclopedia

> **Status**: STAGING ⏳ — Awaiting Creator approval for CANON_LOCKED promotion
> **Last Updated**: 2026-08-08
> **Purpose**: The build-ready information architecture for Layer 3 of `../SYSTEM.md` — the public, analytic encyclopedia. Extracted from how the best fandom encyclopedias actually organize hundreds of thousands of entries (the seven knowledgebases in `../research/`), then specified against Arcanea's own entities, tiers, and tooling.
> **Touches LOCKED canon**: No. This document defines *how canon is addressed, stored, and queried*. It proposes no change to any canonical fact. Where this file and `.arcanea/lore/CANON_LOCKED.md` disagree on a fact, CANON_LOCKED wins and this file is the bug.

---

## 0. The one-paragraph version

Arcanea's lore is currently a set of **documents**. An encyclopedia needs a set of **entities**. The difference is that a document is addressed by filename and a name is addressed by string-matching, while an entity is addressed by a stable ID that survives every rename, every move, and every retcon. Everything below follows from that one shift: entity types with mandatory skeletons, tier as a field rather than a header sentence, a name ledger that makes renames enforceable, and a query layer an agent can hit without reading 600 KB of prose. The architecture is stolen from UESP, Tolkien Gateway, the Marvel Database, the Final Fantasy Wiki, Wowpedia, and the Harry Potter Wiki. None of their text, templates, or names come with it.

---

## 1. What the best wikis actually do

The seven research knowledgebases each documented one franchise's encyclopedia practice. Read together, they converge on nine structural patterns. Each is a *method*, and methods are the part that is safe to take (§8).

| # | Pattern | Demonstrated by | What it actually buys |
|---|---|---|---|
| 1 | **Namespace split by voice** — in-universe, product/mechanics, and real-world material live at different addresses, not different sections | UESP's `Lore:` vs `Skyrim:` vs `General:` (`../research/elder-scrolls.md` §Fandom) | A reader always knows which voice they are in. Unofficial material is excluded *structurally*, not by policing tone |
| 2 | **Entity-type templates** — every character page has the same skeleton, every artifact page has the same skeleton | Tolkien Gateway's category-first articles; the Harry Potter Wiki's per-entity infoboxes (`../research/tolkien-middle-earth.md`, `../research/harry-potter-fantastic-beasts.md` §Canon Management) | Missing information becomes *visible*. An empty "Cost" section on a working is an open task; an omitted one is invisible debt |
| 3 | **Infobox as structured data** — the box is a typed record, and the prose is commentary on it | Harry Potter Wiki per-entity infoboxes; OHOTMU handbook entries (`../research/marvel.md` §Fandom) | The wiki becomes queryable. Marvel's transfer note says it directly: grow the canon doc "into a database, not a doc" |
| 4 | **Parenthetical disambiguation with a designed qualifier** — `Name (Qualifier)`, where the qualifier is the world or the type | Final Fantasy Wiki (`Crystal (Final Fantasy IX)`); Marvel Database (`Peter Parker (Earth-616)`) | One name, many referents, zero collisions. The FF wiki's hard-won lesson: retrofitting this after world #3 exists is agony |
| 5 | **Pattern pages above instance pages** — a franchise-level page describes the recurring *pattern*, instance pages describe each occurrence | FF Wiki's `Cid` / `Primal` hub pages (`../research/final-fantasy.md` §Fandom) | The substrate owns the pattern; creators own instances. Exactly Arcanea's substrate/community-worlds split |
| 6 | **Opaque IDs, assigned at first appearance, never ranked** | Marvel's earth-numbering — 616 is not "Earth-1" (`../research/marvel.md` §Fandom) | Nothing is unaddressable, and the ID carries no implicit hierarchy that a later decision has to fight |
| 7 | **Per-claim citation, and quarantined speculation** | UESP's Lore-namespace sourcing rule; Wowpedia's labeled speculation sections (`../research/warcraft.md` §Fandom); Tolkien Gateway's citation-to-HoMe-volume discipline | Community theorizing without record pollution. `../SYSTEM.md` §9 already adopts "unreferenced claims are speculation" |
| 8 | **Dual-axis indexing** — every fact has an in-world date *and* a source stratum | Tolkien scholarship indexing by Age and by composition date (`../research/tolkien-middle-earth.md` §Fandom) | Canon tier and in-world era are independent fields. Neither can be inferred from the other |
| 9 | **Versioned truth under a named doctrine, never a silent edit** | Wowpedia's perspective-scoped canon ("Chronicle is written from the point of view of the titans"); the Danuser doctrine (`../research/warcraft.md` §Fandom) | Superseded material stays addressable and dated instead of being erased and re-erased |

Two further patterns come as warnings rather than models:

- **Adaptation blending.** Tolkien Gateway segregates film material into marked sections; the Fandom "One Wiki to Rule Them All" merges it "and pays for it in reliability" (`../research/tolkien-middle-earth.md`). Arcanea's equivalent risk is game/product material bleeding into lore pages.
- **Retroactive canon without cost.** The Wizarding World's post-publication canon-by-announcement is the cautionary tale (`../research/harry-potter-fantastic-beasts.md` §Canon Management): additions that "never pay costs on the page are experienced as edits to the reader's memory." The IA response is that tier and its change history are visible per-entity, so nothing arrives without a date and a channel.

**Stub-marking and completeness** deserve a line of their own because they are the cheapest of these patterns and the one most often skipped. A skeleton with mandatory sections plus a computed completeness signal turns "we haven't written this" into a queryable state. Combined with pattern 2, this is what lets an encyclopedia grow to six figures of entries without anyone holding the whole thing in their head.

---

## 2. The entity-type taxonomy

Fourteen types. The set is closed: a new type is a Creator decision, the same weight as a new primitive under `../SYSTEM.md` §3. If a thing does not fit, it is almost always a `concept` or a `text`.

### 2.1 The base record (every entity, every type)

```yaml
id: arc:godbeast:vaelith          # stable, never changes, never reused
type: godbeast                    # one of the 14
world: arc:world:prime            # default; community worlds get their own ID (U5)
name: "Vaelith"                   # current canonical name — an ATTRIBUTE, not the identity
names:
  aliases: []                     # still-valid alternate forms; resolve here
  superseded:                     # see §3.3
    - form: "Thessara"
      until: "2026-01-16"
      reason: "name-lock of the Ten"
      resolution: reserved
tier: LOCKED                      # LOCKED | STAGING | EVOLVING | SPECULATION | COMMUNITY
tier_source: ".arcanea/lore/CANON_LOCKED.md#tier-2-the-ten-gates"
tier_history:
  - { tier: STAGING, on: "2026-01-16", by: "Frank", note: "proposed" }
  - { tier: LOCKED,  on: "2026-01-16", by: "Frank", note: "name-lock of the Ten" }
era: [seventh-age]                # in-world; partial order per SYSTEM.md §5
first_attested: frag:godbeast-codex-01   # earliest fragment/text bearing this entity
sources: [frag:godbeast-codex-01, text:legends/vii-godbeast-codex]
related: [arc:god:elara, arc:gate:starweave]
completeness: 2                   # 0 stub … 4 complete; computed, see §2.4
namespace: lore                   # lore | codex | meta  — see §2.3
schema_version: "3.0"
updated: "2026-08-08"
```

`id` is the whole point. Names, paths, tiers, and even types-within-reason can change; the ID is the join key that every fragment citation, every cross-link, every MCP response, and every site route resolves through.

### 2.2 Per-type required fields and required sections

Required *fields* go in the record; required *sections* must be present in the page even when empty, rendered as an explicit gap. Every type inherits the base sections: **Summary** (out-of-universe, one paragraph) · **In-world account** (Lore voice, per-claim cited) · **Relationships** · **Attestations** (first + notable appearances) · **Contested & speculation** (quarantined) · **Canon history** (tier changes, renames) · **Open questions** (mystery-ledger entries touching this entity, per `../SYSTEM.md` §7).

| Type | Additional required fields | Additional required sections |
|---|---|---|
| `character` | `register` (Naming Registry §2), `house`, `gates_open`, `rank`, `faction`, `arc_position`, `untouchable` (the one sentence no arc may change — Marvel transfer #7) | Origin · Method & voice · Costs paid · Arc position |
| `god` | `gate`, `frequency`, `element`, `wisdom`, `godbeast`, `domain` | Domain & office · Bond · Refusals (what this god will not do — Tolkien transfer #5) |
| `godbeast` | `bonded_god`, `gate`, `frequency`, `element`, `creature_type` | Form · Bond · Manifestation conditions |
| `creature` | `tier` (T1–T3), `danger_tier`, `corruption_axis`, `habitat`, `temperament`, `wound` (the collective failure it condensed from) | Field description · Habitat & range · Engagement guidance · The wound it names |
| `place` | `region`, `element_culture`, `gate_anchor`, `names.layered` (First-Age sacred → common → Eighth-Age colloquial) | Geography · History by era · Who holds it now |
| `region` | `element`, `cultures`, `bordering`, `climate_of_the_soul` | Land · People · Element-derivation · Contested ground |
| `artifact` | `material`, `maker`, `current_holder`, `gate_affinity`, `cost` | Description · Making · Custody chain · What it costs to use |
| `faction` | `premise`, `grievance`, `method`, `membership_cost`, `incompatible_with` | Premise (argued from inside) · Grievance · Practice · Who it excludes |
| `event` | `era`, `precedes`, `follows`, `world_state_before`, `world_state_after` | What happened · Accounts that disagree · What changed |
| `era` | `ordinal`, `opens_with`, `closes_with`, `dating_anchor` | Character of the age · Opening · Closing · What survives into the next |
| `gate` | `ordinal`, `frequency`, `god`, `godbeast`, `element`, `domain`, `rank_contribution` | The threshold · Opening it · What it costs · Anchor sites |
| `element` | `aspect` (Lumina / Nero), `colors`, `domain`, `movement_grammar` | Nature · Derivation into culture · Working grammar |
| `working` | `gate_root`, `tier` (Apprentice→Luminor per Naming Registry §3), `cost`, `vow_required` | Form · Cost · Failure modes · Who may teach it |
| `text` | `collection`, `in_world_author`, `register`, `bias`, `compiled_by`, `claims` | Transmission · Voice & bias · Claims it bears on · Texts it disagrees with |
| `concept` | `primitive_stance` (the one-sentence stance toward the ≤10 primitives, `../SYSTEM.md` §3) | Statement · Stance toward the primitives · Where it is contested |

The `primitive_stance` field on `concept` is the small-ontology rule made mandatory at the schema level. A concept entity that cannot fill it fails validation, which is exactly the test `../SYSTEM.md` §3 already asks humans to apply.

These 14 rows plus the base record generate cleanly into JSON Schema: one `entity.base.schema.json` with a `type` discriminator and fourteen `allOf` branches. The enums are already fixed elsewhere and should be imported, not restated — elements and gates from `.arcanea/lore/CANON_LOCKED.md`, wisdoms and registers from `.arcanea/lore/NAMING_REGISTRY.md`, working tiers from Registry §3.

### 2.3 The namespace split (pattern 1, applied)

Three namespaces, three voices, three URL prefixes:

| Namespace | Voice | Contains | Example |
|---|---|---|---|
| `lore` | In-universe, cited | The entity record and its in-world account | `/lore/vaelith` |
| `codex` | Out-of-universe, functional | Mechanics, product rules, Academy curriculum, game stats | `/codex/vaelith` |
| `meta` | Real-world | Canon decisions, staging logs, IP notes, contributor process | `/meta/canon-log/2026-01-16` |

This is the URL-level implementation of `../SYSTEM.md` §8's two registers ("functional record" and "lore record", linked but never merged). The addition here is the third namespace and the rule that makes it load-bearing: **a `lore` page may not cite a `codex` or `meta` page as a source.** Mechanics do not prove mythology. That single rule is what UESP is actually enforcing when it excludes unofficial content from `Lore:`, and it is the difference between an encyclopedia and a wiki-shaped design document.

### 2.4 Completeness, computed not claimed

`completeness` is derived at build time, not typed by an author:

| Value | Meaning |
|---|---|
| 0 — stub | Record exists; required sections empty |
| 1 — sketched | Summary + in-world account present; no attestations |
| 2 — attested | ≥1 provenance link to a Layer-2 fragment |
| 3 — corroborated | ≥3 independent fragments from different narrators (the redundancy rule, `../SYSTEM.md` §4) |
| 4 — complete | Corroborated, all required sections non-empty, no open contradictions |

The redundancy rule stops being an exhortation and becomes a number a query can sort on. `list_entities(type: character, max_completeness: 1)` is the Fragment Writers' work queue.

---

## 3. The canon-tier ladder inside the IA

### 3.1 Tier is a field, and a compound one

Arcanea's existing tiers (`../SYSTEM.md` §2) are LOCKED ✅ / STAGING ⏳ / EVOLVING 🔧 / SPECULATION 💬. The IA adds one: **COMMUNITY**, for entities that live in a registered community world and have not been promoted (§5). Tier is stored as three fields together — `tier`, `tier_source`, `tier_history` — because a tier without a pointer to the decision that set it is an assertion, and an encyclopedia's whole job is to not make those.

**Tier is per-entity, not per-file.** Today a single 133 KB document such as `.arcanea/lore/FLAGSHIP_TEAM.md` carries one header banner over dozens of characters at genuinely different maturities. Per-entity tier is the first thing the migration (§7) buys.

### 3.2 What a reader sees, and what a query sees

- **Reader**: a tier chip beside the entity name, linked to `tier_source`. LOCKED entries render normally. STAGING and EVOLVING render with a one-line band naming the open decision. SPECULATION and COMMUNITY render in a visually distinct block that cannot be styled to look like the in-world account. Individual claims inside an account inherit the tier of the *source they cite*, not the tier of the page — a LOCKED entity page can carry a SPECULATION-tier paragraph, and it must look like one.
- **Query**: `tier` is a first-class filter on every read verb (§6). The default for any agent-facing call is `min_tier: EVOLVING`, so a generation agent that forgets to filter does not silently build on speculation.

### 3.3 Promotion, supersession, and the dependency problem

When an entity is promoted (STAGING → LOCKED), three things happen atomically: a `tier_history` row, a row in the canon approval log, and a **dependency sweep**. The sweep asks: which entities cite this one as `tier_source` or list it in `related`, and does the promotion change anything they assert? Dependents are not auto-promoted — they are flagged `tier_review_pending`, which is a queryable state and a Continuity Warden work queue (`../AGENTS.md`).

Supersession is the harder direction, and Arcanea has two live examples.

### 3.4 The Name Ledger — the redirect/alias mechanism

**The problem, concretely.** `.arcanea/lore/CANON_LOCKED.md` records two renames: **Amaterasu → Source** (2026-03-30) and **Thessara → Vaelith** (name-lock of the Ten). `.arcanea/lore/NAMING_REGISTRY.md` §6 lists both as superseded and §7 requires contributors to check that list. Both records are correct. Neither was enforced, and for roughly five months neither propagated — around fifteen files went on naming the superseded entities as *current*, tracked as issue **#98**.

The drift reached every layer, including the ones meant to prevent it:

- `.arcanea/lore/metadata.yaml` (v3.0.0, dated 2026-02-23) still names Amaterasu as the Source-Gate godbeast, and carries the entry `id: godbeast-thessara` with `name: "Vaelith"` pointing at `path: godbeasts/thessara.md` — **a file that does not exist**. (The same file points Lyssandria at `gods-goddesses/lysandra.md`, also absent.)
- `.arcanea/lore/godbeasts/` contains **both** `amaterasu.md` (`status: staging`) and `source.md`. Two files, one entity, no link between them.
- `packages/os/src/canon-validator.ts` — the file `NAMING_REGISTRY.md` §4 names as the future home of these checks — hard-codes both superseded names as the current godbeasts of Elara and Shinkami, and ships a spelling-correction table that normalizes misspellings *toward* them. The validator does not merely miss the drift; it certifies it.

That is the anatomy of the failure. A rename was recorded as a *fact in a document* rather than as a *state in a system*, so nothing could check it — and the one component positioned to check it had itself drifted, because it too stored names as literals rather than resolving them.

**The mechanism.** One generated, committed file — `.arcanea/lore/NAME_LEDGER.yaml` — holding one row per name-string that has ever been canonical, plus a resolution verdict:

```yaml
schema_version: "1.0"
entries:
  - form: "Amaterasu"
    verdict: redirect              # this string resolves to an entity
    target: arc:godbeast:source
    superseded_on: "2026-03-30"
    authority: ".arcanea/lore/CANON_LOCKED.md#approval-log"
    reason: "godbeast name-lock; Source replaces Amaterasu"

  - form: "Thessara"
    verdict: redeployed            # string now names a DIFFERENT entity
    target_before: arc:godbeast:vaelith
    target_after:  arc:place:thessara-academy
    boundary: "<unset — pending #98 sweep + /lock-decision>"
    authority: ".arcanea/lore/THESSARA.md"
    reason: "superseded as godbeast; proposed for redeployment as the Drowned Academy"

  - form: "Shift"
    verdict: alias                 # alternate label in live use for the same entity
    target: arc:gate:starweave
    authority: ".arcanea/lore/CANON_LOCKED.md#tier-2-the-ten-gates"
    note: "CANON_LOCKED names the 852 Hz gate Starweave; 'Shift' circulates in several
           harness config files. CANON_LOCKED is authoritative; this row makes the
           divergence resolvable and reportable rather than silent."
```

Five verdicts, and the choice among them is the whole design:

| Verdict | Meaning | Reader behavior | Contributor behavior |
|---|---|---|---|
| `alias` | Still-valid alternate label for the same entity | Silent resolve | Allowed, not preferred |
| `redirect` | Retired label; entity unchanged | 301 to canonical, with a "formerly known as" note on the target | **Lint error** in new prose |
| `reserved` | Retired and not reusable for anything | 404 with an explanation | Lint error; blocked from coining (Registry §7 step 5) |
| `redeployed` | The string now names a *different* entity from a boundary date | Disambiguation page; citations dated before the boundary resolve to the old target, after to the new | Allowed only on the new referent |
| `ambiguous` | Two live referents, no boundary | Disambiguation page, always | Must qualify: `Name (Qualifier)` |

**Three enforcement points**, because a ledger nobody checks is exactly the document Arcanea already has:

1. **Lint gate.** Half of this now exists: `.claude/ci/lore-lint.mjs`, run on lore PRs by `.github/workflows/lore-canon.yml`, checks superseded names in *assignment position* (a table cell, a `godbeast:` field, a heading) while staying silent on prose that discusses a retired name — with a small allowlist for the documents that legitimately maintain the inventory. That design is right and this section does not propose replacing it. What it proposes is moving the linter's data out of the linter: today the superseded pairs are a constant inside the script, which is the same failure mode one level up. The linter should read `NAME_LEDGER.yaml`, so a rename adds a row rather than editing code, the allowlist becomes the ledger's `authority` fields, and `packages/os/src/canon-validator.ts` resolves names through the ledger instead of hard-coding them. Allowed contexts collapse to three: the ledger, canon approval logs, and staging logs. A ledger-driven gate would have caught #98 on the first commit after 2026-03-30 rather than five months later.
2. **Reader-facing redirect.** Every ledger row with a `target` becomes a route. Old names never 404 into nothing; they land on the current entity with the rename visible. This is Wowpedia's versioned-truth discipline (`../research/warcraft.md` §Fandom) implemented as routing rather than as editorial vigilance.
3. **Resolver, not string-matching.** The MCP exposes `resolve_name(string) → {entity_id, verdict, boundary?}` (§6). Agents resolve names through it and never by matching text. An agent that reads "Amaterasu" in an old fragment gets `arc:godbeast:source` back with the supersession date attached.

**The rule that closes the loop:** *a rename is not complete until the sweep is green.* A rename lands as one changeset containing the canon log entry, the ledger row, and the repo sweep — with the lint gate as the definition of "complete." Under that rule the Amaterasu rename would not have been mergeable in its current state, and the Thessara redeployment blocker described in `.arcanea/lore/THESSARA.md` §1 becomes mechanical rather than a matter of remembering: the `boundary` field cannot be set while any `redirect`-class occurrence of the string is live, so the two-referent collision is structurally impossible.

---

## 4. Cross-linking rules

### 4.1 Two kinds of link, and why the distinction is load-bearing

- A **reference link** asserts a relationship between entities. Vaelith is bonded to Elara. The Salt Road runs through the March. It carries no truth-weight; it is a graph edge.
- A **provenance link** asserts that a specific claim is attested by a specific source at a specific tier. It is the only kind of link that can lift a claim above SPECULATION.

They must be visually and structurally distinct, because conflating them is how a wiki quietly converts "these two things are mentioned together" into "this is established." In the record, the split is already present: `related` holds reference links, `sources` holds provenance links. In prose, reference links are inline wikilinks; provenance links are citation markers bound to fragment IDs and rendered as footnotes. A paragraph in the in-world account with zero provenance markers renders as unsourced and is auto-classified SPECULATION regardless of the page's tier. That is UESP's per-claim sourcing rule and Wowpedia's speculation quarantine, enforced by the renderer instead of by moderators.

### 4.2 The mandatory link set

Every entity must link to, at minimum:

| Link | Kind | Why |
|---|---|---|
| Its `tier_source` | provenance | A tier without its decision is an assertion |
| Its era(s) | reference | Half of the dual-axis index (pattern 8) |
| Its element and/or gate, where the type has one | reference | The primitives are the spine; an entity that touches none is failing the small-ontology test |
| Its `first_attested` fragment or text | provenance | The other half of the dual-axis index — the source stratum |
| Its world | reference | `arc:world:prime` by default; explicit for community worlds (§5) |

### 4.3 Density and orphan discipline

- First mention of any entity in a section links; later mentions in the same section do not. Roughly one link per 40–60 words of body prose. Denser reads as a link farm; sparser and the graph stops being navigable.
- **No orphans.** Every entity needs ≥3 inbound reference links. An entity nothing points at is either mis-scoped or not yet integrated, and either way it is a finding, not a page. `orphans()` is a standing query (§6).
- **No dead ends.** Every entity needs ≥5 outbound links across at least two types.
- Bidirectionality is *derived*, never hand-maintained. If Elara's record lists Vaelith, Vaelith's page shows Elara. Hand-maintained back-links are the single most reliable source of wiki rot.

---

## 5. Contribution and review flow

The flow below extends `../COLLABORATIONS.md` §"Community co-creation" and depends on the World Registry proposed in `../research/SYNTHESIS.md` U5. It is written for the state after U5 is promoted; before that, community entries have nowhere to legally live and the flow stops at step 3.

```
1. MINT       Contributor opens an entry. World-ID assigned at creation (U5 / Marvel
              earth-numbering). Entity gets an ID and tier: COMMUNITY. Nothing is
              rejected at this stage — an unaddressable contribution is worse than a
              weak one.

2. VALIDATE   Machine gate. Schema conformance (§2), Name Ledger check (§3.4),
              Naming Registry §4 collision rules, mandatory link set (§4.2),
              primitive-stance test for concepts (§2.2).
              Fails here are mechanical and self-serve — no human in the loop.

3. GRADE      Continuity Warden + IP Sentinel (../AGENTS.md). Three verdicts:
              - COMMUNITY-OK  → lands in the community world, done. This is the
                normal outcome and it is a success, not a consolation.
              - NEEDS-WORK    → returned with the specific failing rule cited.
              - PROMOTION-CANDIDATE → advances to step 4. Rare by design.

4. STAGE      Loremaster writes the STAGING vault doc. The community entry keeps its
              original ID and gains promoted_from / promoted_to links, so provenance
              of the idea survives promotion. Nobody's contribution disappears into
              canon uncredited.

5. LOCK       /lock-decision. Tier LOCKED, tier_history row, canon approval log entry,
              dependency sweep (§3.3).
```

Two properties this flow is designed to have. First, **most contributions never touch the promotion path** — the community tier is the destination, not the waiting room. This is the Marvel Ultimate→616 harvest pattern read correctly (`../research/marvel.md`): the parallel line has its own value, and occasional harvest is a bonus rather than the point. Second, **speculation never reaches the vault**. `../research/SYNTHESIS.md` §4 names canon-by-committee drift as trap #9; the structural answer is that COMMUNITY and SPECULATION tiers are queryable, styleable, and excluded from the vault by the same filter that governs everything else.

---

## 6. Machine-readability

### 6.1 What a consumer actually needs

Three consumers, one contract: a lore MCP serving agents, the site build, and the canon validator in CI. Each needs (a) stable IDs, (b) one frontmatter schema, (c) query verbs that do not require reading whole files, and (d) tier and provenance on every response.

### 6.2 Query surface

Verbs deliberately mirror the shapes in `../../lore-atlas-mcp/SPEC.md` §3, so an agent researching an external wiki and an agent reading Arcanea's own encyclopedia use the same mental model:

| Verb | Returns |
|---|---|
| `list_entities(type?, tier?, era?, gate?, element?, world?, completeness?)` | Records, no prose |
| `get_entity(id, sections?)` | One record + named sections only — the section-scoping trick from SPEC §3, which exists to keep agent context lean |
| `get_section(id, section)` | A single narrative section |
| `resolve_name(string)` | `{entity_id, verdict, boundary?}` — §3.4 |
| `list_claims(entity_id, min_tier)` | Claims with their provenance links |
| `related(id, kind: reference\|provenance, depth)` | Graph traversal with the §4.1 split preserved |
| `tier_history(id)` | The audit trail |
| `orphans() / stubs() / tier_review_pending()` | Standing health queries — the work queues |

Every internal response carries a **provenance envelope**, the inward-facing sibling of SPEC §3's attribution envelope:

```json
{
  "content": "...",
  "provenance": {
    "entity": "arc:godbeast:source",
    "tier": "LOCKED",
    "tier_source": ".arcanea/lore/CANON_LOCKED.md#tier-2-the-ten-gates",
    "claims": ["frag:godbeast-codex-01"],
    "retrieved": "2026-08-08T00:00:00Z"
  }
}
```

### 6.3 Two servers, not one

Lore Atlas (`../../lore-atlas-mcp/SPEC.md`) reads *other people's* encyclopedias and its envelope encodes license obligations. The Arcanea encyclopedia server reads *ours* and its envelope encodes canon tier. Keeping them as separate servers with a shared envelope *shape* means the license-hygiene rules in SPEC §4 cannot leak across the boundary in either direction, and no code path can accidentally treat CC BY-SA excerpt text as Arcanean canon. The shape is shared; the contents never mix.

### 6.4 Storage

Markdown-with-frontmatter remains the source of truth — it is git-native, diffable, reviewable, and already what every author and agent in this repo uses. The queryable index (`entities.json` + `NAME_LEDGER.yaml` + the derived link graph) is **generated and committed**: generated so it cannot drift from the prose, committed so a consumer can read it without a build step. `.arcanea/lore/metadata.yaml` is the ancestor of this idea and demonstrates its failure mode precisely — a hand-maintained index goes stale, and a stale index is worse than none because it is trusted.

---

## 7. Migration path

Non-destructive throughout. Nothing is deleted; the encyclopedia is built *beside* the current corpus, and the current corpus is retired only after the new one is proven.

**Stage 0 — Stop the mirroring (blocking, small).**
Three copies of `CANON_LOCKED.md` exist — `.arcanea/lore/`, `arcanea-lore/`, `sync/aios/lore/` — and **all three differ from each other**. Until exactly one is authoritative and the others are generated or archived, every later stage encodes an ambiguity. Same for the guardian records, which currently exist in four places each (`.arcanea/lore/gods-goddesses/`, `guardians/`, `guardians/production/`, `guardians/staging/`). Effort: a day of decisions, an afternoon of scripting. This stage is cheap and everything else depends on it.

**Stage 1 — Mint IDs and build the Name Ledger (mechanical).**
Walk the ~81 markdown files under `.arcanea/lore/`, assign IDs, emit `NAME_LEDGER.yaml` seeded from `NAMING_REGISTRY.md` §6 and the CANON_LOCKED approval log. No content moves, no prose edits. Output is a report: entities found, duplicates (`amaterasu.md` / `source.md`), dangling paths (`godbeasts/thessara.md`, `gods-goddesses/lysandra.md`), unresolved name-strings. Effort: one agent session plus a careful human read of the report. This stage closes issue #98 as a side effect, and it is worth doing even if nothing after it ever ships.

**Stage 2 — Normalize frontmatter (mechanical, some judgment).**
Two incompatible schemas currently coexist inside a single directory: `godbeasts/amaterasu.md` uses the `schema_version: "2.0"` shape from `.arcanea/lore/ARCHITECTURE.md` §Frontmatter, while `godbeasts/source.md` and `godbeasts/vaelith.md` use an ad-hoc six-field block with no ID, no status, and no schema version. Migrate all to the §2.1 base record. Fields that cannot be inferred are written as explicit `null` — a visible gap, per pattern 2 — never guessed. Effort: scriptable for the majority; the residue needs review.

**Stage 3 — Extract entities from the mega-documents (expensive, unavoidable).**
This is the real work and it should be estimated honestly. `FLAGSHIP_TEAM.md` (134 KB), `STARBOUND_CREWS.md` (110 KB), `LEAGUES_AND_ORDERS.md` (105 KB), `GATE_TOUCHED_UNDERGROUND.md` (107 KB), `VOID_ASCENDANTS.md` (75 KB), `STELLARIS.md` (71 KB), `STORY_ENGINE.md` (68 KB) and `STARLIGHT_CORPS_CODEX.md` (80 KB) together hold roughly three-quarters of a megabyte of prose containing hundreds of entities at mixed maturity under a single file-level tier banner. Extraction is agent-assisted but every extracted entity needs human tier assignment, because *the tier information does not exist in the source* — it has to be decided. Budget **weeks, not days**, and run it type by type (characters first, then factions, then places) rather than file by file, so the Continuity Warden reviews like against like. Source documents stay in place, untouched, throughout.

**Stage 4 — Fragment IDs and the namespace split.**
The 79 markdown files across 20 `book/` collections become the Layer-2 fragment corpus: fragment IDs per `../SYSTEM.md` §4, narrator and bias attributed per U10, and `sources` links wired from entities to fragments. Split the three namespaces (§2.3). Effort: moderate and parallelizable, and it is where the encyclopedia starts being *useful* rather than merely *correct* — Stage 4 is when the redundancy rule (§2.4, completeness 3) becomes measurable.

**Stage 5 — Wire the machine layer.**
Generator for `entities.json` and the link graph, the query verbs (§6.2), and the CI rules: schema conformance, orphan and dead-end checks, mandatory-link check. The superseded-name half already ships in `.claude/ci/lore-lint.mjs` via `.github/workflows/lore-canon.yml`; Stage 5's job there is to repoint it at `NAME_LEDGER.yaml` (§3.4) and to fix `packages/os/src/canon-validator.ts`, which currently hard-codes both superseded godbeast names as current. Effort: ordinary engineering, a week or two. Ship new rules in warn-only mode first and flip to blocking once the backlog is drained, or Stage 5 becomes a wall the other stages cannot climb.

**Stage 6 — Open the community tier.**
Gated on U5's promotion. Do not open it before Stages 0–2 are done: the Final Fantasy Wiki's lesson is that disambiguation retrofitted after world #3 exists is agony, and Arcanea currently cannot even disambiguate a superseded godbeast name from a proposed academy.

**The honest summary**: Stages 0–2 are days of work with outsized payoff and should start regardless of whether the rest is ever built. Stage 3 is genuinely expensive and no tool removes the judgment from it. Stages 4–5 are ordinary engineering. Stage 6 is a governance decision wearing an engineering costume.

---

## 8. IP red lines

This document extracts **information architecture**: entity typing, namespace separation, citation discipline, disambiguation conventions, redirect semantics, tier modeling. In US law, systems and methods of operation are outside copyright (17 U.S.C. §102(b)), and every pattern in §1 is a method. This is the same doctrine `../BEST_PRACTICES.md` §IV applies to worldbuilding, and it holds here for the same reason: architecture, never bricks.

The lines, stated plainly:

1. **No wiki text.** No prose from UESP, Tolkien Gateway, Wowpedia, the Marvel Database, the Final Fantasy Wiki, or the Harry Potter Wiki enters Arcanea, in original or paraphrase-close form. This includes their policy pages and manuals of style. Read them, learn the method, write our own sentences.
2. **No templates or infobox markup.** MediaWiki templates are authored expression and are covered by each wiki's CC BY-SA license. Copying one imports a share-alike obligation onto whatever page carries it. Arcanea's infobox schema in §2 is derived from *what fields these wikis found necessary*, which is a fact about design, not a copy of their code.
3. **No category-tree imports.** Category graphs are compiled editorial judgment. The 14 types in §2 are derived from Arcanea's own locked ontology — the Ten Gates, Five Elements, Seven Wisdoms, the Arc — not from anyone's tree.
4. **No content ingestion where it is forbidden.** `../../lore-atlas-mcp/SPEC.md` §2 records Fextralife's ToS as expressly prohibiting scraping and AI/ML use; SPEC §4 rule 1 makes it a LinkOnly source, "ever." That prohibition applies to any work seeding this encyclopedia, not only to the MCP server.
5. **Attribution obligations bite at redistribution.** SPEC §4's doctrine — research and synthesis is reading, republishing is redistribution — governs any use of external wiki material during migration. If a CC BY-SA excerpt is ever quoted in an Arcanea artifact, it carries its attribution and share-alike notice. The safe default is not to quote at all: facts are unprotectable, and the facts are all we want.
6. **Generic strings are generic.** Namespace prefixes (`Lore:`, `Codex:`), the `Name (Qualifier)` disambiguation form, and stub-marking are unprotectable conventions in wide use. Opaque numeric world-IDs likewise — but the *specific* Marvel designations (Earth-616 and siblings) are theirs, and Arcanea's ID space must not echo them.
7. **No trade dress.** Nothing in the encyclopedia's visual design may resemble any source wiki's identity. Arcanea's design system governs.

The working test is `../BEST_PRACTICES.md` §IV's, unchanged: if a fan of the source would recognize the *specific expression*, it does not cross. If only an information architect would recognize the *pattern*, it is craft commons — take it.

---

## STAGING LOG

| Date | Entry | Status |
|------|-------|--------|
| 2026-08-08 | Encyclopedia IA extracted from the seven-world research swarm: nine wiki structural patterns with attribution; 14-entity-type taxonomy with base record + per-type required fields and sections; three-namespace voice split; tier-as-field with computed completeness; the Name Ledger redirect/alias mechanism (5 verdicts, 3 enforcement points) designed against the live Amaterasu/Thessara drift (issue #98); reference-vs-provenance link split; contribution flow tied to SYNTHESIS U5; MCP query surface aligned to `docs/lore-atlas-mcp/SPEC.md`; 7-stage non-destructive migration path with honest effort estimates; IP red lines | ⏳ STAGING |
| 2026-08-08 | Review fix: §3.4 drift evidence tightened — raw grep counts replaced with the verified ~15-file figure and the specific on-disk failures (duplicate `amaterasu.md`/`source.md`, two dangling `metadata.yaml` paths, `canon-validator.ts` hard-coding both superseded names as current). Enforcement point 1 and Stage 5 updated to build on `.claude/ci/lore-lint.mjs` + `.github/workflows/lore-canon.yml`, which shipped during this session; the proposal narrows to moving the linter's superseded-pair constants into `NAME_LEDGER.yaml` | ⏳ STAGING |

---

*Copy the architecture, never the bricks.*
