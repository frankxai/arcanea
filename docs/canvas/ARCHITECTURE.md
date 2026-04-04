# Arcanea Canvas - Architecture

## Overview

Arcanea Canvas is an AI-native spatial intelligence product built as a DOM-based infinite canvas. Every object on the canvas is a React component, enabling rich content rendering including iframes, live previews, markdown, code blocks, and AI-generated UI.

## Architecture Layers

```
┌─────────────────────────────────────────────┐
│  Layer 1: App Shell (apps/canvas/)          │
│  Next.js 16 · Routing · Auth · Board CRUD   │
├─────────────────────────────────────────────┤
│  Layer 2: Canvas Engine                      │
│  InfiniteCanvas · Viewport · Gestures · DnD  │
├─────────────────────────────────────────────┤
│  Layer 3: Content Nodes                      │
│  StickyNote · Card · Frame · Code · Preview  │
├─────────────────────────────────────────────┤
│  Layer 4: Semantic Graph                     │
│  BoardState · Connections · Query · Relations │
├─────────────────────────────────────────────┤
│  Layer 5: Persistence                        │
│  Supabase · AutoSave · Version History       │
├─────────────────────────────────────────────┤
│  Layer 6: AI & Collaboration (future)        │
│  Agent Actions · URL Extraction · Realtime   │
└─────────────────────────────────────────────┘
```

## Layer Details

### Layer 1: App Shell (`apps/canvas/`)
- **Technology**: Next.js 16 App Router, React 19
- **Responsibility**: Product chrome, routing, auth, board CRUD
- **Routes**: `/` (dashboard), `/board/[id]` (editor)
- **Components**: BoardEditor, Toolbar, Sidebar, CommandPalette

### Layer 2: Canvas Engine (`packages/canvas-core/src/engine/`)
- **Technology**: React + @use-gesture/react + CSS transforms
- **How it works**: A viewport div applies `transform: scale(zoom) translate(x, y)` to position all content. Gestures (wheel, pinch, drag) update the viewport state. Each node is absolutely positioned within the transformed container.
- **Key components**: InfiniteCanvas, CanvasViewport, CanvasNode, SelectionManager, ConnectorLayer

### Layer 3: Content Nodes (`packages/canvas-core/src/nodes/`)
- **Technology**: React components, each rendering a specific content type
- **Node types (Phase 1)**: StickyNote, Card, Frame
- **Node types (Phase 2)**: MarkdownDoc, CodeBlock, MediaEmbed, URLCard, LivePreview
- **Node types (Phase 3)**: MindMap, Infographic, WorkflowBlock, UIPreview

### Layer 4: Semantic Graph (`packages/canvas-core/src/graph/`)
- **Technology**: TypeScript interfaces + in-memory state
- **Responsibility**: Every visual node has semantic metadata (title, description, tags, relations, provenance). Supports querying by type, tags, and graph traversal.

### Layer 5: Persistence (`packages/canvas-core/src/persistence/`)
- **Technology**: Supabase (PostgreSQL)
- **Board table**: Stores serialized board state as JSONB
- **Auto-save**: Debounced saves on state changes

### Layer 6: AI & Collaboration (Phase 2-3)
- **AI**: Vercel AI SDK streaming, URL content extraction, agent canvas actions
- **Collaboration**: Yjs CRDT or Supabase Realtime (Phase 4)

## Data Flow

```
User Gesture → @use-gesture → Viewport State → CSS Transform → Re-render
User Action  → BoardState.dispatch() → State Update → React Re-render → AutoSave → Supabase
Board Load   → Supabase fetch → BoardState.load() → React Render → Canvas Display
```

## Key Design Decisions

1. **DOM over Canvas API**: Enables React components, iframes, Tailwind styling as canvas objects
2. **State in React**: BoardState uses React context + useReducer for predictable updates
3. **Semantic-first**: Every node has metadata beyond visual properties
4. **Separation of engine and app**: canvas-core is a reusable package; apps/canvas is the product shell
