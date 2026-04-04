# Arcanea Canvas - Backlog

## Phase 1: Thin Slice MVP [COMPLETE]

- [x] Architecture docs (ADR-001, ARCHITECTURE.md, PRODUCT-VISION.md, DOMAIN-MODEL.md)
- [x] packages/canvas-core scaffold with types
- [x] InfiniteCanvas engine (zoom/pan/viewport)
- [x] CanvasNode wrapper (position/drag/resize)
- [x] Content nodes: StickyNote, Card, Frame
- [x] ConnectorLayer (SVG arrows with curved Bezier paths)
- [x] BoardState (state management with useReducer + Context)
- [x] apps/canvas Next.js app scaffold
- [x] Board editor page with canvas + toolbar + sidebar
- [x] Board dashboard page with grid view
- [x] Supabase migration for boards table
- [x] BoardStore (localStorage persistence with index)
- [x] AutoSave hook (debounced 500ms)
- [x] Monorepo config (package.json, turbo pipeline)
- [x] Keyboard shortcuts (Delete, N=note, C=card)
- [x] Undo/Redo (Ctrl+Z, Ctrl+Shift+Z) with 50-state history
- [x] Multi-select with Shift+click
- [x] SVG icons in toolbar (replaced HTML entities)
- [x] NodeRegistry pattern for extensible node types

## Phase 2: Content Richness + URL Magic [COMPLETE]

- [x] MarkdownDoc node (inline markdown renderer - headers, bold, italic, code, lists, blockquotes, links)
- [x] CodeBlock node (zero-dep syntax highlighting for TS/JS/Python/Rust/Go/SQL/HTML/CSS)
- [x] MediaEmbed node (YouTube embed, images, video, audio with type detection)
- [x] URLCard node (auto-OG metadata extraction with favicon, image, content)
- [x] LivePreview node (sandboxed iframe with HTML/srcdoc and URL modes, Tailwind CDN)
- [x] URL drop handler (drag URLs/files onto canvas, auto-detect type)
- [x] File drop handler (images as media, code files as code blocks, .md as docs)
- [x] YouTube transcript extraction (API route - parses caption tracks from page data)
- [x] URL metadata extraction (API route - OG tags, favicon, article content)
- [x] Properties panel with full metadata editing (title, description, tags, position)
- [x] Node type badges and provenance indicators
- [x] Drop zone overlay with visual feedback
- [ ] Board version history (snapshots table)
- [ ] Node search/filter within board
- [ ] Copy/paste nodes
- [ ] Grid snapping
- [ ] Minimap
- [ ] Freehand drawing overlay (SVG/Canvas)

## Phase 3: AI Agent Integration [IN PROGRESS]

- [x] AI sidebar panel with chat interface
- [x] Canvas context builder (selected nodes + board summary -> AI prompt)
- [x] Quick action presets (Summarize, Brainstorm, Connect, Expand)
- [x] AI agent API route (/api/canvas-ai) with streaming response
- [x] Dual AI provider support (Google Gemini + Anthropic Claude)
- [x] Action command parser (AI can create nodes via [ACTION:CREATE:...] syntax)
- [x] Provenance tracking on AI-generated nodes (createdBy: 'agent')
- [ ] MindMap node (React Flow embedded within frame)
- [ ] Infographic node (SVG/HTML generation)
- [ ] UIPreview node (AI-generated full UI mockup in iframe)
- [ ] WorkflowBlock node (agent workflow step)
- [ ] Smart clustering (semantic similarity grouping)
- [ ] Auto-layout (force-directed graph positioning)
- [ ] Template suggestions based on board content
- [ ] Multi-step agent workflows (brainstorm -> organize -> connect)

## Phase 4: Collaboration + Productization

- [ ] Real-time collaboration (Yjs + WebSocket or Supabase Realtime)
- [ ] Board sharing (public link, team access controls)
- [ ] Template system (pre-built board layouts)
- [ ] Export to PNG/SVG/JSON/PDF
- [ ] Board embedding (iframe for other Arcanea apps)
- [ ] Cursor presence (see other users' cursors)
- [ ] Comments on nodes
- [ ] Board permissions (view, edit, admin)
- [ ] Activity feed per board

## Phase 5: Arcanea Differentiation

- [ ] Guardian-themed board templates (one per Gate)
- [ ] Elemental styling for nodes (Fire/Water/Earth/Wind/Void colors)
- [ ] Luminor companion as canvas AI agent with personality
- [ ] Library content embedding (link texts to canvas objects)
- [ ] Academy integration (canvas work counts toward Gate progression)
- [ ] Lore-aware AI suggestions (Guardian-specific responses)
- [ ] Cosmic effects (glow, particles on selected nodes)
- [ ] Arcanea Canvas integration with main Arcanea app
- [ ] Board marketplace (share/discover templates)

## Technical Debt / Infrastructure

- [ ] Virtualization for 1000+ DOM nodes (off-screen culling)
- [ ] Supabase persistence (replace localStorage with real DB)
- [ ] Auth integration with main Arcanea auth
- [ ] E2E tests with Playwright
- [ ] Performance benchmarks
- [ ] Accessibility audit (keyboard navigation, screen reader)
- [ ] Mobile/tablet touch support
- [ ] PWA support for offline boards

## Current Implementation Stats

| Metric | Count |
|--------|-------|
| Total files created | 28+ |
| canvas-core modules | 16 |
| Node types implemented | 8 (of 13 planned) |
| API routes | 3 |
| Lines of production code | ~4500+ |
