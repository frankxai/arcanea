# Rights and source strategy

## Operational boundaries

Copyright on underlying traditions, specific prose, film designs, individual photographs and database selection are separate questions. Public availability is not permission. A screenshot creates another copy; private storage, attribution and vectorization do not automatically make that copy permitted. Keep franchise media link-only until a license, permission or specifically assessed exception covers the intended use. Do not publish a searchable franchise screenshot mirror as Arcanea's reusable DAM.

EU Directive 2019/790 Article 4 conditions the general TDM exception on lawful access and absence of an appropriate rights reservation, and limits retention to what mining needs. It does not grant a public-gallery license. Article 7(1)'s contractual override names Articles 3, 5 and 6, not Article 4. National implementation, contract, database rights and access restrictions still matter. Evaluate Dutch law and the exact source/use before enabling bulk commercial copying; do not import US “fair use” as a blanket Dutch rule. This corrects the older Lore Atlas shorthand that private research is simply reading and obligations matter only on redistribution.

[EU primary text, Articles 4 and 7](https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng) · [Dutch Auteurswet](https://wetten.overheid.nl/BWBR0001886/)

Text licenses on community wikis do not necessarily cover uploaded studio images. Share-alike and attribution apply to covered adaptations under their actual terms. An image search engine's license label is a lead, not a warranty. A modern artist's interpretation of a traditional creature may remain protected. Cultural and community protocols are independent of copyright duration.

## Source ladder and API candidates

| Source | Use | Asset decision |
|---|---|---|
| Official Harry Potter Encyclopedia | Reference links, names, independently written factual catalog entries | Film/design/media permission not granted. Current seed is link-only. |
| Framestore production studies | Learn production process and credit contributors | Reference links; do not mirror stills or claim their exact pipeline for every asset. |
| Wikidata Action API / SPARQL | Structured identity, aliases, external IDs and sourced statements | Structured data is CC0; linked images retain their own terms. Resolve stable Q IDs; discovery queries are not evidence. |
| Wikimedia Commons API `imageinfo` + `extmetadata` | Per-file creator/license/source evidence | Inspect file-specific license, artwork layer, restrictions and attribution before storing. Commons metadata extraction is fallible. |
| Openverse API | Search candidate openly licensed images | Verify at original provider; preserve license URL, creator, modifications and retrieval time. |
| GBIF API | Taxonomic identity, occurrence evidence and media pointers | Occurrence dataset license and media license are separate. Avoid sensitive species locations in public projections. |
| iNaturalist API | Animal photo/reference candidates | Observation and individual photo licenses differ; many permit only noncommercial use. |
| Met Collection API | Historical depictions, bestiary artifacts | Require object-specific public-domain/Open Access eligibility; verify artwork and image rights. Current docs announce search v1.1 migration; don't hard-code an old search endpoint. |
| Fandom/wiki.gg/independent wikis | Bibliography and licensed text research | Inspect each wiki and file. No blanket license import. Preserve the existing LinkOnly restriction on Fextralife. |
| Firecrawl | Bounded permitted page extraction, URL discovery and optional screenshots | A scraper provides no additional rights. Do not bulk download before permission review. |
| Apify Actors | Optional site-specific collectors and repeatable extraction | Prefer APIs/exports. Inspect actor code, scope, credentials, output and total cost; no evasion of access controls. |

Primary documentation: [Commons metadata](https://www.mediawiki.org/wiki/Extension:CommonsMetadata), [imageinfo](https://www.mediawiki.org/wiki/API:Imageinfo), [Wikidata data access](https://www.wikidata.org/wiki/Wikidata:Data_access), [Openverse](https://api.openverse.org/), [GBIF](https://techdocs.gbif.org/en/openapi/), [iNaturalist API](https://api.inaturalist.org/v1/docs/), [Met](https://metmuseum.github.io/), [Firecrawl](https://docs.firecrawl.dev/), [Apify](https://docs.apify.com/api/v2).

The source registry distinguishes researched candidates from enabled adapters. Not every listed service was exercised in this session. No complete public, official creature-image API with redistribution rights was established. An unofficial Potter API is not an image license.

## Existing ecosystems: patterns to adopt

Wikidata separates identifiers and statements; Commons separates the file and its license; GBIF separates a taxon from occurrences; museums separate an object, its maker, provenance and digitization; MediaWiki distinguishes page history from the subject's fictional history. Our graph uses those architectural distinctions without copying source prose, infobox markup or editorial category trees.

## Permission matrix

`store`, `analyze`, `embed`, `display_public`, `generate_from`, `train` are independent booleans. Unknown is false. Store the legal/contractual basis, evidence pointer, reviewer, review date and expiry with each grant. A license review is not equivalent to a canon acceptance. Similarity review is not legal clearance.

On retraction: deny image serving immediately, remove vector entries, invalidate public projections and caches, remove disallowed bytes/derivatives, and retain only a justified minimal correction/audit record. SQL append-only triggers protect ordinary edits; an authorized retention/redaction migration may still be required. Hash chains without an external trusted anchor do not prove that an administrator has not rewritten history. C2PA credentials can record signed provenance when valid, but do not certify originality, ownership or factual truth.
