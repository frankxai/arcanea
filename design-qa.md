# The Living Arc — Design QA

## Comparison evidence

- Selected source: `release-evidence/living-arc/selected-unwritten-gate.png`
- Desktop implementation capture: `release-evidence/living-arc/qa/implementation-desktop-1348x926.jpg`
- Same-viewport source/implementation comparison: `release-evidence/living-arc/qa/source-vs-implementation-final.jpg`
- Mobile implementation capture: `release-evidence/living-arc/qa/implementation-mobile-390x844-in-frame.jpg`
- Exact-width production captures: `release-evidence/living-arc/visual-proof/story-{375,768,1440}.jpg`
- Wallpaper and webtoon captures: `release-evidence/living-arc/visual-proof/story-wallpapers-1440.jpg` and `webtoon-{375,768,1440}.jpg`
- Machine-readable browser report: `release-evidence/living-arc/visual-proof/report.json`
- Verified preview route: `/story/the-living-arc`
- Verified webtoon route: `/story/the-living-arc/webtoon/episode-0`

## Visual comparison history

1. Desktop source comparison, opening state: the production hero preserves the selected split-world threshold, cyan central staff, opposing cities, moonbone/gold typography, minimal navigation, and binary choice dock. The production copy was intentionally sharpened from a series title to the moral hook, “He can save everyone. He only has to end choice.”
2. First desktop pass found a P1 horizontal overflow caused by a full-bleed `100vw` shell inside the existing padded application layout. The route-scoped document overflow was clipped and the browser recheck measured `scrollWidth === clientWidth`.
3. First 390×844 pass found a P1 overlap between the mobile hero summary and the absolute choice dock. The mobile hero was changed to normal document flow: fixed artwork stage, relative story copy, then relative decision controls. The final capture shows the full hook, premise, and book label with no collision or horizontal scrolling.
4. Webtoon pass found the same full-bleed P1 overflow. The episode received the same scoped overflow correction. Desktop recheck measured `scrollWidth === clientWidth`; the 390×844 prologue and first vertical art panel remained centered and uncropped.
5. Final source/implementation comparison was made at the same 1348×926 content viewport. Hierarchy, focal triangle, threshold geometry, split-world palette, cinematic density, and decision placement all remain faithful. Differences are intentional production decisions: accessible flat controls replace ornamental mock controls, and the stronger moral hook replaces the concept title inside the hero.
6. Release-copy review found one P2 proof claim that overstated completed prose. It now states exactly what is present in the candidate: the opening chapter and Episode 00.
7. Final production-bundle proof at 375, 768, and 1440 px found no horizontal overflow, no broken visible images, no missing image labels, and no WCAG 2 A/AA or 2.1 A/AA automated violations on either route. The muted tab and scroll-cue colors were corrected before the final captures.

## Interaction and content checks

- Opening choice: both options set `aria-pressed`, update the remembered response, emit a non-sensitive local event, and persist across reloads.
- Elemental Concord: Earth, Water, Fire, Wind, and Void / Spirit tabs update one labeled tab panel.
- Living Codex: the first memory expands and reveals the Saelith beat without navigation.
- Format system: Read, Scroll, Watch, and Listen tabs update one labeled tab panel; Scroll exposes a working Episode 00 link.
- Episode 00: semantic long-form article, reading-progress indicator, three generated vertical panels, and working continuation links.
- Navigation and downloads: story anchors, Arcanea lore links, Episode 00 links, and desktop/phone wallpaper assets resolve to real targets.
- Accessibility: one H1 per route, semantic regions, descriptive non-decorative image alt text, visible focus rings, reduced-motion rules, and no color-only selection state.
- Assets: all website artwork is project-bound; the rights ledger is stored at `release-evidence/living-arc/ASSET_RIGHTS_LEDGER.md`.
- Browser matrix: both routes passed at 375×844, 768×1024, and 1440×1000; the choice persistence, Water Concord selection, and Scroll-to-Episode-00 path passed in the same production run.

## Severity status

- P0: 0 open
- P1: 0 open
- P2: 0 open

final result: passed
