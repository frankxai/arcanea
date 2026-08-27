# Arcanea IP and licensing architecture

**Effective:** 2026-08-27  
**Current rights holder:** Frank Riemer

This is the canonical licensing policy for original Arcanea, Starlight
Intelligence, and FrankX repository material until a written assignment says
otherwise.

## Decision

One blanket license is structurally wrong for this estate. Apply the license at
the economic boundary:

| Layer | Default | Purpose |
|---|---|---|
| Protocols, SDKs, connectors, schemas, and interoperability plugins deliberately released as open source | Apache-2.0 | Maximum adoption with attribution, NOTICE propagation, and an explicit patent grant |
| Commercial application or server source intentionally kept public | FSL-1.1-ALv2 | Source visibility and contribution without enabling a competing hosted product; converts to Apache-2.0 after two years |
| Private applications, operations, prompts, workflows, product systems, and unreleased packages | Proprietary / `UNLICENSED` | Preserve product and licensing leverage |
| Arcanea canon, characters, lore, books, music, images, video, designs, brand systems, and product content | All rights reserved | Preserve franchise, publishing, adaptation, merchandise, and training rights |
| Tutorials or reference documentation deliberately released for broad reuse | CC BY 4.0 | Distribution with attribution; only when explicitly marked |
| Third-party or fork-derived material | Upstream license | Preserve provenance and all required notices |

CC0 is prohibited for original estate IP. CC BY-NC is not the default for canon:
its commercial boundary is ambiguous and it grants irrevocable derivative-work
rights. A separate Arcanea community/fan-content license may later grant narrow,
revocable-by-breach permissions without licensing official canon wholesale.

## Ownership

Copyright notices must name **Frank Riemer**, not FrankX, Arcanea BV, Arcanea
Labs BV, Starlight Holding, or Starlight Holding BV.

A Dutch zzp'er is not a legal form. Registration as an eenmanszaak does not
create a separate rights holder; attribution may later read “Frank Riemer,
trading as <registered trade name>.” A future BV becomes the owner only after a
written IP assignment or other valid transfer.

Repository ownership, organization membership, npm scope ownership, and brand
names do not themselves transfer copyright.

## Historical licenses

MIT, CC0, Creative Commons, and other grants attached to earlier releases remain
effective for those releases. Changing the current license protects new
copyrightable material and future releases; it does not claw back historical
rights.

The repository `Arcanea-Labs/Arcanea` previously carried CC0. Treat that
revision history as exposed. Do not copy new canon or product-defining material
into a repository or release still carrying CC0 or a blanket permissive license.

## Contributions

Do not merge external contributions into a relicensable commercial layer until
a contributor agreement is active. The agreement must grant Frank Riemer broad
copyright and patent rights sufficient to operate, sublicense, dual-license,
and later assign the project to a legal entity while leaving contributors
ownership of their work.

Apache-2.0-only components may accept contributions under Apache-2.0 when no
future proprietary relicensing is required.

## Repository rules

1. Every public repository has a root `LICENSE` or `LICENSE.md`.
2. Every package manifest matches the controlling license.
3. Mixed repositories use nested license files and an explicit licensing map.
4. Forks retain upstream copyright, license, and NOTICE files.
5. Canon and trademarks are excluded from code licenses.
6. Dataset, model-weight, and generated-media rights are licensed separately.
7. User-created worlds remain creator-owned; platform rights belong in product
   terms, not a GitHub repository license.

## Migration priority

1. Stop new CC0 and blanket MIT publication from mixed Arcanea repositories.
2. Correct all fictitious rights-holder names to Frank Riemer.
3. Extract Apache-2.0 protocol, SDK, connector, schema, and plugin repositories.
4. Move commercial application layers to private repositories or
   FSL-1.1-ALv2.
5. Add a trademark policy, third-party NOTICE inventory, and contributor
   agreement workflow.
6. Run package-level and release-artifact license checks in CI.
