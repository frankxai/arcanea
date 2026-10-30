# Creature atlas operating procedure

## Scope and evidence

Default batch: one named source, at most 20 pages, 10 permitted images and a declared monetary ceiling. Configure a per-host rate budget, descriptive user-agent and retry limits. A source approval records terms/robots/TDM reservation review date, permitted purposes, retention and next review. Do not treat robots permission as a copyright license.

1. **Recall:** load current atlas, source registry, prior runs and authoritative brand/canon instructions. Search entity IDs and aliases before adding records.
2. **Discover:** use API/export/sitemap/URL map before crawling. Record discovered URLs and actual retrieval separately; preserve redirects, canonical URL, status, ETag/Last-Modified and source revision when available. HEAD failure is not proof of a dead page; GET only when permitted.
3. **Assess rights:** classify source and each asset. Unknown/blocked remains link-only. Review screenshot rights separately. Do not upload restricted source content to another AI provider by default.
4. **Acquire:** download permitted exact bytes once, with MIME/size limits, redirect and host validation, no private-network fetches, decompression limits, EXIF/location sanitization for public derivatives and malicious-file quarantine. Reject executable/HTML masquerading as images.
5. **Deduplicate:** SHA-256 exact bytes, then perceptual-hash candidate matches. Preserve source relationships and attribution even when the same bytes are shared.
6. **Extract:** use deterministic metadata before model calls. Human/model-written descriptions must be independently worded; attach evidence to factual claims. For models, validate structured output and store uncertainty; do not fill unknown author or historical dates.
7. **Distinguish:** maintain tradition → interpretation → individual → asset without guessing edges. AI novelty candidates stay proposals. Search for prior art and name collisions; lack of a match is not proof of originality.
8. **Review:** decide permissions, culture/source context, visual distinctiveness, anatomy, source fidelity and canon state independently. Record reviewer and reason. An original AI image is not automatically free of third-party rights.
9. **Publish:** generate an allowlisted projection; omit private evidence and object keys. Serve approved assets through the permission check. Record attribution and modification notes with each public image.
10. **Index:** FTS first. Embed only granted content, one versioned vector per approved revision; record actual token/vision spend and vector IDs. Run retrieval evals before changing encoders.
11. **Receipt:** write counts (discovered/read/accepted/rejected), source coverage, asset hashes, API status, actual costs and remaining uncertainty. Record failed/revoked stages rather than silently omitting them.

## Durable job contract

Proposed job key: SHA-256(source ID + canonical URL + source revision/content digest + pipeline version + requested operation). States: discovered → rights_checked → acquired → normalized → review_pending → approved → published → indexed; also blocked/failed/revoked. Rights change invalidates all downstream capabilities. Queue retries are bounded, honor Retry-After and send exhausted jobs to review. Current release implements catalog/permissions/read API; the durable ingestion consumer remains a follow-up, not a live claim.

Incremental runs check changed sources; they do not recrawl the whole corpus. Link-check cadence depends on use and source policy (active official sources monthly; low-use historic references less frequently). Integrate a bounded run into the existing Arcanea Product Intelligence loop once the source adapter is enabled. No additional scheduled task was created in this session.

## Acceptance

- Every factual trait has a source claim or is explicitly a proposal/inference.
- Every public image has a current grant and complete attribution.
- No unknown creator, model version, seed, publication date or earliest attestation is guessed.
- Private records are absent from FTS public results and vector hydration.
- Tests cover expiry, revocation, independent permissions and private-projection leakage.
- A representative search succeeds; a blocked asset remains blocked.
- Counts and deployment statements match receipts.
