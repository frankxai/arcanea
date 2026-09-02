# Arcanea Workflows

The three recurring loops that move work from idea to live artifact, each wired to the gates that already exist (`canon-check`, `lock-decision`, the visual-creation council). Nethyssa — the first Leviathan, a Wild Godbeast outside the ten Gates — is the worked example threading all three.

The loops compose: a new canonical entity is **locked** in the lore loop, **rendered** in the asset loop, then **minted** in the web3 loop. Lore gates upstream of asset gates upstream of web3 — you never mint what isn't approved, never approve what isn't locked.

---

## 1. Lore loop — idea → STAGING → LOCKED

New canon enters as STAGING and only becomes LOCKED by Frank's explicit decision. Nothing downstream (assets, mints) treats a STAGING entity as final.

```
 1. Hermes intake     a lore idea arrives (note, transcript, request)
        │
 2. producers         lore producers draft the entity — name, class, role,
        │             relationships, material
        │
 3. canon-check       run `canon-check` — does it contradict CANON_LOCKED.md?
        │             (cosmic duality, Five Elements, Ten Gates, ranks, Malachar)
        │             fail → back to producers · pass → continue
        │
 4. STAGING           written into CANON_LOCKED.md marked STAGING (provisional)
        │
 5. lock-decision     `lock-decision` — Frank-gated. Only Frank promotes
        │             STAGING → LOCKED.
        ▼
 6. LOCKED            canon is final; downstream loops may treat it as real
```

**Nethyssa:** drafted as a Leviathan / Wild Godbeast (no Gate, no frequency), passes `canon-check` because she does not collide with the ten Gate Godbeasts, sits in CANON_LOCKED.md as **STAGING**. She is **not yet LOCKED** — so she may be rendered and minted on **testnet** as a worked example, but not promoted to mainnet canon until `lock-decision` lands.

---

## 2. Asset loop — prompt → generate → review → publish

Image generation runs in external harnesses, never from Claude. The loop ends by updating the registry / `assets` table and logging the outcome back as learning.

```
 1. prompt-pack       pull the prompt + brand/material constraints
        │             (Nethyss Pearl palette for Nethyssa)
        │
 2. harness route     route to the right engine:
        │               Grok Imagine  /  Codex gpt-image-2  /  Antigravity NB2
        │
 3. generate          harness renders the asset (Claude does NOT generate)
        │
 4. DAM intake        Arcanea Hermes ingests file + gen sidecar →
        │             Supabase bucket (arcanea-gallery) → one `assets` row
        │             (status = 'pending')
        │
 5. council review    visual-creation council (Brand Guardian / Art Director /
        │             Storyteller) → APPROVED | NEEDS-REVISION | REJECTED
        │             not-approved → back to step 1 (row kept, not deleted)
        │
 6. approve           status 'pending' → 'review' → 'approved'
        │
 7. publish           status → 'published'; RLS unlocks public read
        │
 8. registry/assets   registry cache regenerates from published rows
        │             (image-registry.ts becomes a generated cache — see DAM.md)
        ▼
 9. outcome logged    result + council notes recorded as a learning-loop
                      signal (what worked, what got rejected and why)
```

**Nethyssa:** prompt-pack carries the Nethyss Pearl material (abyssal nacre, teal-over-black); routed to a harness; ingested to `arcanea-gallery/leviathans/nethyssa-v1.webp` as category `leviathans`, `status='pending'`; council reviews; on approval, published; registry regenerates to include her. Asset path: `/leviathans/nethyssa-v1.webp`.

---

## 3. Web3 loop — approved asset → IPFS → mint → IP-register (testnet)

Only an approved/published asset enters this loop. Everything stays on **Base Sepolia (84532)** — mainnet is Frank-gated, keys never in repo. The services are currently MOCKS (see arcanea-ai-app `apps/web/docs/WEB3-EXECUTION.md`).

```
 1. approved asset    an `assets` row at status='approved'/'published'
        │
 2. IPFS              pin image + metadata JSON → ipfs://<cid>
        │
 3. mint              ERC-721 mint (1/1 for Leviathans/Gods) → tokenId
        │
 4. IP-register       Story Protocol registerIPAsset(...) →
        │             ipaAddress + PIL terms (1=Non-Commercial, 2=Commercial)
        │             [testnet / mock today]
        │
 5. audit + registry  append `asset_generations` row linking
                      asset_id → cid → tokenId → ipaAddress → tx hash;
                      update the registry/`assets` row with mint state
```

**Nethyssa:** as the first Leviathan 1/1 she runs this loop end to end on testnet — metadata with `Tier: Leviathan`, `Material: Nethyss Pearl`, `Gate: None`. The mint stays on Base Sepolia until her canon is LOCKED; the full lineage (generated → published → minted → IP-registered) is reconstructable from her `asset_id` via `asset_generations`.

---

## How the loops chain (Nethyssa end to end)

```
 LORE          canon-check pass → STAGING in CANON_LOCKED.md
   │           (lock-decision pending — testnet only)
   ▼
 ASSET         /leviathans/nethyssa-v1.webp → council → published →
   │           registry/assets updated
   ▼
 WEB3          IPFS → testnet mint (1/1) → Story IP-register →
               asset_generations audit row
```

Gate order is load-bearing: **lock-decision** (Frank) gates promotion to real canon; **council** gates publish; **approved status** gates minting. Skip none of them.

---

## Cross-references

- DAM pipeline + `assets` / `asset_generations` schema + Nethyss Pearl card: `arcanea-ai-app/apps/web/docs/DAM.md`
- Web3 mock-vs-build + NFT collection spec: `arcanea-ai-app/apps/web/docs/WEB3-EXECUTION.md`
- Canon source of truth: `.arcanea/lore/CANON_LOCKED.md`
- Gates: `canon-check`, `lock-decision`, visual-creation council

Built on SIP.
