# Legacy Asset Migration Plan

| Source HTML | Target Module | Action |
|-------------|---------------|--------|
| archive/old-structure/Arcanea App/interactive-roadmap.html | `src/components/RoadmapCard` data feed | Extract milestone copy → convert to JSON for dynamic rendering |
| archive/old-structure/Arcanea App/team-dashboard.html | Upcoming "Guardian Roster" Atlas section | Translate team roles into timeline component |
| archive/old-structure/Arcanea App/ecosystem-visualization.html | `ConstellationNav` / future D3 map | Already referenced for visual language; store SVG assets in `src/assets/` |
| archive/old-structure/Arcanea App/deployment-checklist.html | Operational annex (Markdown export) | Convert to MDX appendix for release rituals |

Once migrated, place originals in `docs/legacy-timelines/` with a short synopsis so the historical context remains discoverable.
