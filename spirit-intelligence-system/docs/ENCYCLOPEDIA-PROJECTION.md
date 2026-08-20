# Spirit Encyclopedia and Memory Projection

Status: STAGING

Git records are authoritative. Starlight Memory and encyclopedia indexes are signed, rebuildable views.

## Projection namespaces

| Namespace | Content | Default retrieval |
|---|---|---|
| arcanea.staging.archetypes | mutable narrative functions | explicit staging filter |
| arcanea.staging.spirits | validated original spirit records | explicit staging filter |
| arcanea.staging.spirit-worlds | world-local institutions and law | explicit staging filter |
| arcanea.staging.spirit-bonds | safe spirit–artifact relations | explicit staging filter |
| arcanea.canon.* | human-approved equivalents | approved only |

Research sources and reference entities have no projection namespace. They remain an internal comparison and rights surface.

## Event envelope

Each generated JSONL event contains:

- event ID and entity ID;
- entity type and schema version;
- namespace and canon status;
- version and world scope;
- stable content hash;
- source commit;
- projection timestamp;
- validated payload with Accord Names removed.

Projection excludes quarantined records, high-similarity designs, prohibited cultural sources, and any bond whose endpoint cannot project.

## Retrieval contract

Default public and agent retrieval:

1. returns approved canon only;
2. never returns Accord Names or raw Source-tones;
3. distinguishes the Spirit Element from spirit-beings;
4. presents archetypes as current functions rather than alignment or species;
5. preserves world scope and canon status;
6. exposes costs, consent, release, and counterplay with capabilities;
7. never treats a reference entity as an Arcanean option.

STAGING results must be visibly labeled and intentionally requested. QUARANTINED and research-only records are excluded from generative context.

## Promotion and invalidation

Only a reviewed Git change can move a record from staging to canon. Promotion requires:

- explicit human approval;
- resolved rights and cultural review;
- originality review;
- valid cross-references and world scope;
- updated content hash and source commit;
- a migration or retirement note for any superseded ID.

If memory disagrees with Git, the memory record is discarded. If a source is later restricted or a similarity issue is discovered, affected entities are quarantined in Git and removed on the next projection.

## Community encyclopedia submissions

Community-created spirits use the same schema and must provide source-pattern attribution, an originality statement, creator and license fields, a world profile, consent mechanics, and a release path. Community scope never implies official canon. Maintainers may reject technically valid records that flatten living traditions, copy protected expression, or undermine the locked cosmology.
