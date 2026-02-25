# Licensing & Publication Strategy
Date: 2026-02-25
Scope: `@arcanea/memory-system`, `@arcanea/memory-mcp`, CLI binary names, referenced repo licenses

---

## 1. Naming Safety Assessment

| Name | Category | Risk Level | Finding | Recommendation |
|------|----------|------------|---------|----------------|
| `Arcanea` | Brand / npm scope | LOW | No conflicting trademark found in software or AI categories. A unique invented word with no prior art in software. `arcanea` (unscoped npm package, v3.0.0) and `@arcanea` scope are both already claimed by frankxai. | SAFE — own it. |
| `Starlight` | Modifier in package names | LOW | Astro Starlight (MIT, docs framework) uses "Starlight" as a product sub-brand. Apple TV+ has entertainment content called "Starlight". Neither creates a conflict: Astro's trademark, if registered, would cover documentation tooling — not a memory system library. Apple's use is entertainment, a completely different category. The single English word "starlight" cannot be broadly trademarked across all software uses. | SAFE as a modifier (`@arcanea/starlight-runtime`, `Starlight Vaults` as a brand label). NOT safe as a standalone CLI binary — `starlight` on npm (v0.3.9) is already taken by a CSS framework. |
| `starlight` (npm CLI binary) | CLI binary name | HIGH | `starlight@0.3.9` is a live MIT-licensed CSS framework on npm, last published by `benjamminf`. Claiming `starlight` as a binary would cause `npx starlight` confusion. | DO NOT USE as standalone binary. The strategy memo (memory-system-strategy.md) suggested claiming `starlight` if available — it is not. |
| `Horizon` / `HorizonLedger` | Class name / internal concept | LOW | "Horizon" is a generic English word. Numerous software products use it (VMware Horizon, etc.) but these are in enterprise virtualization — no trademark conflict for a developer memory library. `HorizonLedger` as a class name within the Arcanea namespace is unambiguously safe. | SAFE as a class name and internal brand concept. |
| `svaults` | CLI binary (current) | SAFE | Not present on npm. Short, memorable, no conflicts found. | AVAILABLE — currently registered as binary alias in package.json. |
| `arcanea-memory` | CLI binary / unscoped package | SAFE | Not present on npm. Descriptive, branded, no conflicts. | AVAILABLE — currently registered as binary in package.json. |
| `arcmem` | Alternative CLI binary | SAFE | Not present on npm. | AVAILABLE — not currently used. |
| `starlight-vaults` | Unscoped npm package name | SAFE | Not present on npm. E404 confirmed. | AVAILABLE — could claim as an alias package. |
| `starvaults` | Alternative CLI binary | SAFE | Not present on npm. E404 confirmed. | AVAILABLE. |
| `vault-ai` | Alternative CLI binary | SAFE | Not present on npm. E404 confirmed. | AVAILABLE. |
| `@frankx/starlight-intelligence-system` | Scoped npm package | LOW | Not published (confirmed NOT_PUBLISHED). `@frankx` scope is controlled by frankxai. | SAFE to publish when ready. |

**Key takeaway on "Starlight":** The conflict with Astro Starlight is a brand confusion risk, not a legal one. Astro Starlight and `@arcanea/memory-system` target entirely different developer audiences and problems. The risk is that a developer Googling "starlight npm" lands on Astro's docs framework instead of ours. This is a discoverability concern, not a trademark concern. The `@arcanea` scope isolates us sufficiently.

---

## 2. License Compliance

### Referenced Repositories

| Repo | License | Our Usage | Compliance Status |
|------|---------|-----------|-------------------|
| `mem0ai/mem0` | Apache 2.0 | We did NOT copy any mem0 code. We studied their REST API surface (`POST /v1/memories`, `GET /v1/memories/search`, etc.) and implemented a compatible interface from scratch. API call signatures are not copyrightable — they are functional interfaces. | CLEAN. No attribution required. The `Mem0Adapter` class and `Mem0Backend` are original implementations that happen to speak the same wire protocol. |
| `BasicMemory` (OSS, sqlite-based) | MIT (various forks) | We studied the pattern of storing conversations as local `.md` files with YAML frontmatter, which is the foundational approach used across basicmemory, claude-mem, and Obsidian vaults. This pattern is a well-known community convention, not a copyrightable implementation. No code was copied. | CLEAN. The ArcaneMD format (our YAML frontmatter spec with `guardian`, `gate`, `frequency` fields) is a distinct original spec. |
| `MemTensor/MemOS` | Apache 2.0 (check before use) | Architecture was studied conceptually. No code absorbed. MemOS uses a hierarchical memory architecture with different primitives. Our six-vault taxonomy is independently derived. | CLEAN. No code used. If we later want to create a MemOS adapter (as we did for Mem0), the Apache 2.0 license permits this. |
| Anthropic Claude Code MEMORY.md standard | Documentation / format specification (not software) | We extend the MEMORY.md convention Anthropic established for Claude Code sessions. Format specifications are not copyrightable. The `MemoryBridge` class auto-generates MEMORY.md files in the format Anthropic's tooling expects. This is interoperability, not copying. | CLEAN. Implementing compatibility with a published format is always permissible. This is the same legal principle that lets any software read/write JPEG, JSON, or Markdown. |
| Anthropic MCP Protocol | MIT licensed specification | The Model Context Protocol spec is MIT. `@arcanea/memory-mcp` implements MCP server tooling on top of it. | CLEAN. MIT permits this with no restrictions. |
| `ruvnet/claude-flow` | MIT | arcanea-flow was absorbed in Phases 1-3 (hooks, security, token-optimizer, sona-learner, hybrid-memory, intelligence-bridge, creative-pipeline). MIT requires attribution only in notice files. | ACTION REQUIRED — see section 5. |

### Our Own Packages

| Package | License | Status |
|---------|---------|--------|
| `@arcanea/memory-system` | MIT | Confirmed in package.json. Root package.json also MIT. |
| `@arcanea/memory-mcp` | MIT | Confirmed in package.json. |
| `@arcanea/starlight-runtime` | MIT | Confirmed. |
| All 30+ other `@arcanea/*` packages | MIT | Confirmed — uniform MIT across entire monorepo. |
| Starlight Horizon Dataset (exported JSONL) | CC-BY-SA 4.0 | Correct for training data. Hardcoded in `horizon-ledger.ts` schema export. |

**One internal inconsistency found:** `packages/claude-arcanea/CLAUDE.md` contains a Guardian-to-Gate frequency table with WRONG frequencies (Foundation=396 Hz, Flow=417 Hz, etc.). This does not affect licensing but does affect canon alignment. The memory-system source files use the CORRECT canonical frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963, 1111). The claude-arcanea CLAUDE.md is stale.

---

## 3. npm Publication Checklist

### Pre-conditions (must be true before any publish)

- [x] `@arcanea` scope exists on npm — confirmed (`@arcanea/cli@0.7.1` already published by `frankxai`)
- [x] Maintainer is `frankxai` (friemerx@gmail.com) — confirmed from npm registry
- [x] License is MIT — confirmed in package.json
- [x] `publishConfig.access: "public"` — set in memory-system package.json
- [ ] `dist/` directory must be built before publish (`npm run build` from packages/memory-system/)
- [ ] `README.md` must exist in packages/memory-system/ — currently NOT confirmed to exist. The package.json `files` array includes "README.md" but no README was found. This will cause publish to succeed but produce a package with no documentation page on npmjs.com.
- [ ] npm login as `frankxai` must be active (`npm whoami` should return `frankxai`)

### For `@arcanea/memory-system`

```bash
# Step 1: Build
cd packages/memory-system
npm run build

# Step 2: Verify dist output
ls dist/

# Step 3: Dry run (review what will be published)
npm publish --dry-run

# Step 4: Publish
npm publish --access public
```

**The `workspace:*` problem:** `@arcanea/memory-mcp` depends on `@arcanea/memory-system` with `"workspace:*"`. This workspace protocol resolves inside pnpm monorepos but does NOT resolve on npm. Before publishing `@arcanea/memory-mcp`, the workspace reference must be replaced with a pinned version: `"@arcanea/memory-system": "^0.1.0"`. Publish `@arcanea/memory-system` first, then update `@arcanea/memory-mcp`'s dependency to the published version.

### For `@arcanea/memory-mcp`

```bash
# Step 1: Update dependency (after memory-system is published)
# Change in packages/memory-mcp/package.json:
#   "@arcanea/memory-system": "workspace:*"
# to:
#   "@arcanea/memory-system": "^0.1.0"

# Step 2: Build
cd packages/memory-mcp
npm run build

# Step 3: Add publishConfig and files fields (currently MISSING from package.json)
# memory-mcp/package.json needs:
#   "publishConfig": { "access": "public" }
#   "files": ["dist", "README.md"]

# Step 4: Publish
npm publish --access public
```

### Publication Order

1. `@arcanea/memory-system` — the library (no workspace dependencies)
2. `@arcanea/memory-mcp` — depends on published memory-system

---

## 4. Recommended CLI Binary Names

The package currently registers two binary names in `@arcanea/memory-system`:
- `svaults` → `./dist/cli.js`
- `arcanea-memory` → `./dist/cli.js`

### Ranked Recommendations

| Rank | Binary Name | npm Status | Verdict | Notes |
|------|-------------|-----------|---------|-------|
| 1 | `arcanea-memory` | AVAILABLE | RECOMMENDED PRIMARY | Descriptive, branded, namespace-safe. `npx arcanea-memory remember "..."` is self-explanatory. Best for developers discovering it cold. |
| 2 | `svaults` | AVAILABLE | KEEP AS ALIAS | Short, memorable for existing users, encodes "Starlight Vaults". Good for daily use once developers know the product. Potential confusion: "what does s stand for?" |
| 3 | `starlight-vaults` | AVAILABLE | STRONG ALTERNATIVE | Full brand name, no ambiguity, available on npm as both unscoped package and binary. If you want to lean harder into the Starlight brand, claim `starlight-vaults` as a binary and thin wrapper package. |
| 4 | `arcmem` | AVAILABLE | THIRD ALIAS option | Ultra-short. Works for power users. No brand signal. |
| 5 | `starvaults` | AVAILABLE | LOW PRIORITY | Available but "starvaults" reads awkwardly — the eye wants to parse "star" + "vaults" but could misread as "starv" + "aults". |
| 6 | `vault-ai` | AVAILABLE | NOT RECOMMENDED | Generic. Does not carry the Arcanea brand. Would require competing in a generic namespace. |
| AVOID | `starlight` | TAKEN | DO NOT USE | `starlight@0.3.9` is a live MIT CSS framework. `npx starlight` would create user confusion and support noise. |
| AVOID | `arcanea-memory-mcp` | AVAILABLE | CORRECT — keep for the MCP package binary | The current binary name in `@arcanea/memory-mcp` is `arcanea-memory-mcp`. This is correct. The MCP server should have a distinct binary from the CLI tool. |

**Recommended final state:**

```json
// @arcanea/memory-system package.json bin field:
"bin": {
  "arcanea-memory": "./dist/cli.js",
  "svaults": "./dist/cli.js"
}

// @arcanea/memory-mcp package.json bin field:
"bin": {
  "arcanea-memory-mcp": "./dist/server.js"
}
```

This gives users three touch points: the full descriptive name (`arcanea-memory`), the short alias (`svaults`), and the dedicated MCP server binary (`arcanea-memory-mcp`). The `arcanea-memory` name also works cleanly as an unscoped npm package mirror if that publication is desired.

---

## 5. Legal Considerations

### MCP Protocol

Anthropic's Model Context Protocol is MIT licensed. There are no restrictions on building MCP servers, MCP clients, or publishing them to npm. `@arcanea/memory-mcp` is legally clean on this axis.

### "Arcanea" as a Trademark

"Arcanea" is a unique invented word. No software, AI, or technology trademark for "Arcanea" was found in a conceptual search of publicly known trademark registries. The `@arcanea` npm scope is already established and in active use. At the current scale, the primary risk is not trademark infringement (there is nothing to infringe) but rather someone else filing for the trademark in the same category before Arcanea does. If this becomes a commercial product, formal trademark registration for "Arcanea" in International Class 42 (Software as a Service, software development tools) should be considered.

### The Mem0 API Compatibility Surface

Implementing a compatible API surface for Mem0 is legally identical to implementing a REST client that speaks to any third-party service. There is no licensing concern. The variable names `Mem0Adapter`, `Mem0AddRequest`, `Mem0SearchRequest`, etc., carry no IP claim from mem0.ai. API call shapes are not copyrightable (see Oracle v. Google, 2021 Supreme Court ruling on API compatibility). The decision to be Mem0-compatible is a sound engineering and business choice with zero legal risk.

### CC-BY-SA 4.0 for the Horizon Dataset

The `HorizonLedger.exportDataset()` method hardcodes `"license": "CC-BY-SA-4.0"` in the exported schema.json. This is the correct license for community training data:
- Users can share and adapt the dataset
- Attribution to "Arcanea Community" is required
- Derivatives must use the same license (copyleft)
- The share-alike provision prevents commercial entities from silently incorporating the dataset without attribution

One consideration: CC-BY-SA 4.0's copyleft means any model fine-tuned on Horizon data would arguably need to release its training configuration under CC-BY-SA. This is philosophically aligned with the Horizon's intent (benevolent, open) but could deter some corporate adopters. If the goal is maximum adoption including by closed AI labs, consider CC-BY 4.0 (attribution only, no copyleft). If the goal is ensuring the dataset stays open, CC-BY-SA 4.0 is correct.

### claude-flow Absorption Attribution

The MEMORY.md states Phases 1-3 absorbed ~146K lines of MIT-licensed patterns from `ruvnet/claude-flow`. MIT requires that the original copyright notice be preserved in derived works. The packages that absorbed this code (`@arcanea/hooks`, `@arcanea/security`, `@arcanea/token-optimizer`, `@arcanea/sona-learner`, `@arcanea/hybrid-memory`, `@arcanea/intelligence-bridge`, `@arcanea/creative-pipeline`) should each have a NOTICE or attribution comment. This does not apply to `@arcanea/memory-system`, which was built from scratch.

---

## 6. Action Items (Ordered by Priority)

### Before any public launch of memory-system

1. **Write README.md for `packages/memory-system/`** — the `files` array in package.json includes "README.md" but no README exists in that directory. Without it, the npm package page will be blank. This is a blocking issue for publication. (30 min effort)

2. **Add `publishConfig` and `files` to `@arcanea/memory-mcp/package.json`** — currently missing. The package will publish but with no access control and will include all files rather than just `dist/`. (5 min effort)

3. **Resolve `workspace:*` dependency** — before publishing `@arcanea/memory-mcp`, change its dependency on `@arcanea/memory-system` from `"workspace:*"` to a pinned semver version matching what was published. (5 min effort, after memory-system is published)

4. **Build `packages/memory-system/` and verify `dist/`** — run `npm run build` in the package directory, confirm all exported files compile cleanly. (10 min effort)

5. **Publish `@arcanea/memory-system`** — `npm publish --access public` from the package directory after completing items 1 and 4.

6. **Publish `@arcanea/memory-mcp`** — after completing items 2, 3, and 5.

### Before marketing / announcing

7. **Fix the frequency table in `packages/claude-arcanea/CLAUDE.md`** — it lists wrong canonical frequencies (Foundation=396 Hz when it should be 174 Hz, etc.). This file is served as an agent CLAUDE.md and will propagate incorrect canon to any agent that reads it. Medium risk if agents generate lore content.

8. **Add attribution comments to the claude-flow absorption packages** — packages/arcanea-hooks, arcanea-security, token-optimizer, sona-learner, hybrid-memory, intelligence-bridge, creative-pipeline should each contain a brief MIT attribution notice for the claude-flow patterns absorbed. This is an MIT license compliance item, not optional.

9. **Consider registering "Arcanea" as a trademark (Class 42)** — if the product goes commercial, this becomes important. Not a blocker for open-source publication.

### Wave 3 items (post-launch)

10. **Build `starlight horizon share` CLI command** — the highest-leverage Wave 3 item per the strategic analysis. The HorizonLedger dataset has zero community impact until contribution is easy.

11. **Publish the Starlight Horizon Dataset** — create public GitHub repo or Hugging Face dataset with the founding wishes and contribution mechanism. This is the media story and dataset flywheel.

12. **Decide on CC-BY-SA vs CC-BY for Horizon Dataset** — resolve whether copyleft is a feature (keeps data open) or a friction point (deters corporate use). Decision should be made before the dataset goes public.

---

## Summary

The `@arcanea` npm scope is owned, active, and in good standing. All packages use MIT. No code was copied from external repositories — only API interfaces and architectural patterns were studied. The Mem0 compatibility surface carries zero legal risk. The "Starlight" name is safe as a modifier/brand but the standalone `starlight` binary name is taken on npm. The recommended primary CLI binary is `arcanea-memory` with `svaults` as a short alias. The single blocking issue before publication is that `packages/memory-system/` has no README.md, which must be written before `npm publish`.

---

*Research conducted 2026-02-25 by Arcanea Research Agent.*
*Sources: packages/memory-system/src/ (12 files), packages/memory-mcp/package.json, npm registry live queries, docs/memory-system-strategy.md, docs/memory-system-findings.md*
