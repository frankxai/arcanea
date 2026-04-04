# ADR-001: Canvas Substrate Choice

## Status
Accepted

## Date
2026-04-04

## Context
Arcanea needs a spatial canvas product where humans and AI agents co-create architectures, workflows, knowledge maps, and system diagrams. The canvas must support rich React components as first-class objects (iframes, live previews, markdown, code blocks, charts), not just drawing primitives.

## Decision
Build a custom DOM-based infinite canvas using React + CSS transforms + @use-gesture/react.

## Alternatives Considered

### tldraw ($6K/yr commercial license)
- Best-in-class whiteboard SDK with semantic metadata, multiplayer, agent starter kit
- **Rejected**: $6K/yr license cost; Canvas API-based rendering cannot embed React components, iframes, or live previews as first-class objects

### Excalidraw (MIT)
- Free, good for diagramming
- **Rejected**: Canvas API-based (same DOM limitation), limited custom shape API, no built-in multiplayer, stale npm releases (~1 year)

### tldraw v1 MIT fork / v2-alpha Apache fork
- Free older versions exist
- **Rejected**: v1 is 2021 codebase (outdated); v2-alpha is unfinished. Both are Canvas API-based.

### AFFiNE Edgeless (MIT)
- Full knowledge base + whiteboard application
- **Rejected**: Full application, not a library. Too heavy to embed or fork for our use case.

### Konva / Fabric.js (MIT)
- Low-level canvas libraries
- **Rejected**: Canvas API (no DOM rendering), 500+ hours to build whiteboard features from scratch

### xyflow / React Flow (MIT)
- Excellent for node-graph UIs
- **Considered for Phase 3**: Will embed within Frame nodes for mind map / workflow views. Not suitable as primary spatial canvas (node-based, not freeform).

## Rationale

A DOM-based canvas renders each object as a React component using absolute positioning within a CSS-transformed viewport. This uniquely enables:

1. **Rich content nodes**: Markdown, syntax-highlighted code, charts, forms - all as native React
2. **iframe embedding**: Live localhost previews, YouTube embeds, generated UI mockups
3. **Full Tailwind/CSS styling**: Arcanea design system applies directly to canvas objects
4. **AI-generated HTML**: Agent outputs render directly in sandboxed iframes
5. **Zero license cost**: All dependencies are MIT/Apache 2.0

The canvas shell (~300 lines) handles viewport transforms and gesture handling. The real product value is in content nodes and AI integration - areas where DOM rendering has a decisive advantage.

## Consequences

### Positive
- $0 license cost
- Full React component ecosystem available for canvas objects
- Complete control over UX and design
- No vendor lock-in or API constraints
- Arcanea design system integration is native

### Negative
- Must build zoom/pan/selection from scratch (~1-2 weeks)
- Performance ceiling with 1000+ DOM nodes (mitigate with virtualization)
- No built-in multiplayer (add via Yjs in Phase 4)
- No freehand drawing (add via Canvas/SVG overlay in Phase 2)

## Dependencies (all MIT/free)
- `@use-gesture/react` - Gesture handling
- `react-markdown` - Markdown rendering
- `prism-react-renderer` - Code syntax highlighting
- `@xyflow/react` - Mind map views (Phase 3)
- Vercel AI SDK - AI streaming (Phase 3)
