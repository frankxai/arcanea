# Arcanea execution alignment — 14 September 2026

Status: proposed engineering brief; documentation only. Target review: 21 September 2026.
Tracking: [issue #125](https://github.com/frankxai/arcanea/issues/125).

## Decision

Prove one author-owned world bible → scene → validation → export workflow using
the existing monorepo and worldbuilding method. Make every exported claim about
rules, rights and review traceable to the exact source revision.

This is an integration specification, not new lore or a new product platform.
It supersedes no locked canon, accepted licensing policy or existing worldbuilding
method. An author's original world is a separate rule namespace; adopting the
toolkit never automatically adopts Arcanea cosmology.

## Evidence and existing work

Audit search snapshot: main `fc1d1c00b2819c7514ce9061caae20c7a2d24fc1`.
Individual files were fetched from main on 14 September. Recheck the current tree
before implementation.

| Surface | Observed evidence | Disposition |
| --- | --- | --- |
| `docs/worldbuilding/SYSTEM.md` | Canon tiers, fragments, provenance, timeline and mystery boundaries | Reuse the model and rule boundaries |
| `docs/worldbuilding/README.md` | Worldbuilding method and canon authority entry points | Follow current release-gate read order |
| `packages/arcanea-mcp/src/tools/creation-graph.ts` | Process-memory graph; creation nodes/relationships and visualization export | Reuse behind an explicitly revisioned persistence/export adapter |
| `packages/arcanea-mcp/src/tools/generators.ts` | Randomized template generation and embedded reference tables | Label execution mode honestly; do not claim model-generated scenes |
| `packages/arcanea-mcp/src/tools/validate.ts` | Independent hardcoded lexical canon checks | Consolidate authority through a versioned profile seam |
| `packages/os/src/canon-validator.ts` | Embedded constants conflict with current root canon instructions | Do not treat a green result as current-canon proof |
| `packages/arcanea-mcp/src/index.ts` | Existing MCP graph/export/validation handlers | Extend the existing tool path; no new MCP platform |
| `.claude/ci/lore-lint.mjs` | Changed-line ratchet; not a whole-corpus correctness certificate | Preserve this distinction in evidence |
| `LICENSING.md` | Layer-specific rights, historical-license preservation and creator ownership | Do not widen rights by default or redistribute restricted inputs |

The runtime discrepancy is implementation drift, not permission to rewrite canon.
The code paths contain older names/tables; the existing naming sweep owns their
corpus-wide repair.

Duplicate-work boundaries:

- [Issue #98](https://github.com/frankxai/arcanea/issues/98) owns the corpus name
  sweep; this issue owns profile provenance and validation/export binding.
- [Issue #103](https://github.com/frankxai/arcanea/issues/103) owns World Genome
  and future simulation; consume its eventual projection rather than duplicating it.
- [PR #116](https://github.com/frankxai/arcanea/pull/116) owns canon, rights,
  inventory and release governance.
- [PR #122](https://github.com/frankxai/arcanea/pull/122) and
  [PR #123](https://github.com/frankxai/arcanea/pull/123) contain unresolved
  authority/ontology proposals. Their draft content is not accepted authority.
- [PR #90](https://github.com/frankxai/arcanea/pull/90) and
  [PR #104](https://github.com/frankxai/arcanea/pull/104) own existing story and
  graph content. Preserve those artifacts.

## Bounded author workflow

1. Import a small original world bible with declared ownership, a rule-profile ID,
   an immutable revision/digest and source references.
2. Select one scene objective: viewpoint, character need, obstacle, consequence
   and facts the scene may reveal. Retrieve only the relevant world fragments.
3. Draft or import one editable scene. Record model/recipe when a real provider
   ran; record template/manual/import mode when it did not.
4. Run supported structural/rule checks and independent literary review. Show
   unresolved contradictions, unsupported assertions and protected mysteries.
5. Export Markdown/JSON plus the minimal graph projection, rights/provenance
   manifest, exact validation report and author review receipt.

The graph communicates useful relationships: character → scene → event → place
→ relevant rule. A larger node count is not an acceptance criterion.

The first implementation may remain local and portable. A successful export and
clean-process restoration must precede any promise of persistent managed author
workspaces. Do not create a second web editor or a graph database to prove this
slice.

## Contract and authority seam

Reuse or adapt existing core, graph and MCP contracts. Add only missing fields,
with explicit schema versions and migration behavior:

- project/world ID and workspace boundary;
- world-bible revision and source digest;
- rule-profile ID, version, digest, source authority and domain;
- scene ID/revision/content digest and selected source/fragment references;
- validation run ID, supported checks, unknown scope, findings and rule digest;
- rights basis per source/asset, permitted use and attribution;
- review status and decision bound to the exact scene and rule-profile digests;
- export manifest containing checksums and required restoration references.

For official Arcanea content, the existing locked-vault and owner promotion rules
remain authoritative. The locked file is read-only to agents. Use a reviewed
versioned projection without shipping the full vault verbatim. Do not invent a
new authority table to sidestep unresolved rulings.

For an original author world, validate against that author's chosen rules. The
result must state the evaluated domain. It cannot imply official Arcanea approval,
legal clearance or complete literary coherence.

Fail closed for claims of validation when the selected profile is missing,
conflicting or stale. Preserve the private draft and explain the missing evidence.
An engine may still report the checks it actually ran. A lexical pass never
proves every narrative assertion or author intent.

Imported story text is untrusted data. It cannot change the selected rule profile,
grant file access, publish a manuscript or promote canon. Credentials remain
outside exports. Provider calls require bounded cost, cancellation and deadlines.

## Acceptance matrix

| Case | Required evidence |
| --- | --- |
| Original bible + one scene | Stable IDs, selected facts, editable scene and honest draft status |
| Clean-process export/import | Exact text, graph references, source rights and review state restored |
| Scene edited after validation | Previous report/approval becomes stale |
| Rule profile changed after review | Previous authority binding cannot remain approved |
| Missing or conflicting authority | Inconclusive/blocked for affected claims; private draft retained |
| Original-world profile | No compulsory Arcanea entities, names or magic rules |
| Protected mystery | Finding identifies the boundary without manufacturing an answer |
| Foreign workspace or malicious import path | Denied; no cross-project read/write or path traversal |
| Rights unknown | Public-release preparation blocked; private work remains available |
| Provider failure or budget exhaustion | No fabricated prose/receipt; resumable source state survives |
| Locked-vault preservation | Byte-identical before/after; no automatic promotion |
| Shared interfaces | MCP and any UI adapter expose the same versioned result |

Test actual handler behavior and round-trip restoration, including a negative
fixture. String searches alone do not establish runtime safety. Use package.json
as command authority; the root uses pnpm/Turbo. Existing quick tests may require
building core, extension-core, MCP and auth packages as AGENTS.md documents.

For lore creation, use the repository lore-release-gate and its independent canon
evaluation. For later UI changes, use the web-release-gate and before/after evidence
at 375/768/1440 pixels. Neither gate is satisfied by this documentation.

## Commercial validation

The initial product result is an author's usable scene and portable world memory.
Evaluate time to first useful export, restoration success, second writing session,
contradictions caught, author revisions accepted and support burden.

Keep pricing, public claims and rights grants unchanged here. A paid promise requires
a reproducible authored output, current license/terms clarity and a verified
delivery path. Do not package third-party fiction, unrestricted character rights
or provider credits merely because the framework can process them.

## Implementation-agent prompt

> Read root AGENTS.md and CLAUDE.md, scoped instructions, LICENSING.md and
> docs/worldbuilding/README.md and SYSTEM.md. Inspect current main, issue #98,
> issue #103, and PRs #90/#104/#116/#122/#123 before writing code. Produce a
> disposition table: reusable implementation, unmerged proposal, actual missing
> seam and authority conflict. Do not replace the current worldbuilding system.
>
> In an isolated branch, implement one original-world bible → scene → validation
> → export slice through existing packages and MCP handlers. Introduce only the
> missing revision/authority/rights bindings. Keep an original-world profile
> separate from official Arcanea. Reference a pinned reviewed canon projection;
> leave unresolved official-canon scopes blocked. The locked vault remains
> read-only, and the existing owner gate retains promotion authority.
>
> Use one implementation owner and an independent verification role where useful.
> If writing actual lore, follow lore-release-gate before drafting; if changing UI,
> follow web-release-gate before editing. Do not duplicate the work owned by
> linked issues/PRs. Do not turn this task into a new orchestration framework.
>
> Prove clean-process restoration, stale-review rejection, workspace/path denial,
> rights preservation and honest unknown results. Record exact commit, commands,
> observed outputs, remaining blockers and rollback. Open a draft PR with the
> smallest coherent change. No merge, deployment, external spend, paid offer,
> broad license change, public manuscript release or canon promotion is included.

## Handoff status

This brief records inspected code and proposed acceptance criteria. No runtime,
browser, live provider, migration, customer workflow or production verification
was performed by the documentation change. Existing production-health issues are
separate work; this document neither resolves nor diagnoses them.
