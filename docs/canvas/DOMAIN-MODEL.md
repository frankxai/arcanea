# Arcanea Canvas - Domain Model

## Core Entities

### Board
The top-level container. A user creates boards to organize spatial thinking.

```typescript
interface Board {
  id: string;
  title: string;
  description?: string;
  userId: string;
  nodes: CanvasNode[];
  connections: Connection[];
  viewport: { x: number; y: number; zoom: number };
  createdAt: string;
  updatedAt: string;
}
```

### CanvasNode
Every object on the canvas. Has both visual properties (position, size) and semantic metadata.

```typescript
interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  title: string;
  description?: string;
  content?: string;
  tags: string[];
  parentId?: string;
  createdBy: 'human' | 'agent';
  agentId?: string;
  sourceUrl?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
```

### CanvasNodeType
```typescript
type CanvasNodeType =
  | 'sticky-note'    // Editable colored text
  | 'card'           // Rich content with title + body
  | 'frame'          // Grouping container
  | 'connector'      // SVG line/arrow (rendered in overlay)
  | 'markdown-doc'   // Full markdown rendering
  | 'code-block'     // Syntax-highlighted code
  | 'media-embed'    // YouTube/image/video
  | 'url-card'       // Auto-extracted URL preview
  | 'live-preview'   // iframe with URL or HTML
  | 'mind-map'       // Embedded React Flow graph
  | 'infographic'    // SVG/HTML visual
  | 'workflow-block'  // Agent workflow step
  | 'ui-preview';    // AI-generated UI in iframe
```

### Connection
Links between nodes, rendered as SVG in the connector overlay.

```typescript
interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'arrow' | 'line' | 'dashed';
  label?: string;
}
```

## Node-Specific Properties

Each node type extends CanvasNode with type-specific fields in `metadata`:

### StickyNote
```typescript
metadata: { color: 'yellow' | 'blue' | 'green' | 'pink' | 'purple' }
```

### Card
```typescript
metadata: { imageUrl?: string; links?: string[] }
```

### Frame
```typescript
metadata: { color?: string } // Child nodes have parentId = frame.id
```

### CodeBlock (Phase 2)
```typescript
metadata: { language: string }
content: string // The code
```

### MediaEmbed (Phase 2)
```typescript
metadata: { mediaType: 'youtube' | 'image' | 'video'; embedUrl: string }
```

### URLCard (Phase 2)
```typescript
metadata: { ogTitle: string; ogDescription: string; ogImage: string; extractedText?: string }
sourceUrl: string
```

### LivePreview (Phase 2)
```typescript
metadata: { previewType: 'url' | 'html'; html?: string }
sourceUrl?: string
```

## Provenance Model

Every node tracks who/what created it:
- `createdBy: 'human'` - User created manually
- `createdBy: 'agent'` + `agentId` - AI agent generated
- `sourceUrl` - If created from URL drop

## State Management

Board state is managed via React context + useReducer with these actions:
- `ADD_NODE` / `REMOVE_NODE`
- `UPDATE_NODE` / `MOVE_NODE` / `RESIZE_NODE`
- `ADD_CONNECTION` / `REMOVE_CONNECTION`
- `SET_VIEWPORT`
- `LOAD_BOARD` / `CLEAR_BOARD`
