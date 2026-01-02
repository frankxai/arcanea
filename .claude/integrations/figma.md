# Figma Integration

> **UI/UX design access and design token extraction**

## Purpose

Figma integration enables Arcanea agents to:
- Access design files and specifications
- Extract component details
- Retrieve design tokens
- Reference visual designs during implementation
- Ensure design-to-code fidelity

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "figma-remote-mcp": {
      "command": "npx",
      "args": ["-y", "figma-remote-mcp"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_TOKEN}"
      }
    }
  }
}
```

### Required Permissions
- Read access to design files
- Access to team libraries

## Tools Available

### File Access
```yaml
get_file:
  Description: Get Figma file structure
  Parameters:
    - fileKey: Figma file key (from URL)

get_file_nodes:
  Description: Get specific nodes from file
  Parameters:
    - fileKey: File key
    - nodeIds: Array of node IDs

get_images:
  Description: Export images from file
  Parameters:
    - fileKey: File key
    - nodeIds: Nodes to export
    - format: png/jpg/svg/pdf
    - scale: Export scale
```

### Components
```yaml
get_file_components:
  Description: List components in file
  Parameters:
    - fileKey: File key

get_component:
  Description: Get component details
  Parameters:
    - componentKey: Component key
```

### Styles
```yaml
get_file_styles:
  Description: Get styles (colors, text, effects)
  Parameters:
    - fileKey: File key

get_style:
  Description: Get specific style details
  Parameters:
    - styleKey: Style key
```

## Usage Patterns

### Design Reference During Implementation

**Frontend Agent Workflow:**
```yaml
1. Get component specification:
   get_file_nodes(
     fileKey: "abc123",
     nodeIds: ["luminor-card-component"]
   )
   → Returns component structure, dimensions, styles

2. Extract design tokens:
   get_file_styles(fileKey: "abc123")
   → Returns colors, typography, effects

3. Get visual reference:
   get_images(
     fileKey: "abc123",
     nodeIds: ["luminor-card-component"],
     format: "png",
     scale: 2
   )
   → Returns rendered preview

4. Implement matching code
```

### Design Token Extraction

**Extract Color Tokens:**
```yaml
Agent: Arcanea Frontend

get_file_styles(fileKey: "design-system-file")

→ Returns:
  colors:
    - name: "cosmic/900"
      color: {r: 0.04, g: 0.04, b: 0.1, a: 1}
    - name: "primary/500"
      color: {r: 0.55, g: 0.36, b: 0.96, a: 1}
    ...

Transform to CSS:
  --color-cosmic-900: #0a0a1a;
  --color-primary-500: #8b5cf6;
```

### Component Specification

**Retrieve Component Details:**
```yaml
get_file_nodes(
  fileKey: "component-library",
  nodeIds: ["button-primary"]
)

→ Returns:
  {
    name: "Button/Primary",
    type: "COMPONENT",
    children: [...],
    styles: {
      fills: ["color/primary-500"],
      strokes: [],
      effects: ["shadow/sm"]
    },
    constraints: {
      horizontal: "SCALE",
      vertical: "FIXED"
    },
    absoluteBoundingBox: {
      width: 120,
      height: 44
    }
  }
```

## Agent Integration

### Frontend Agent
```yaml
Primary Use:
  - Reference designs during implementation
  - Extract exact specifications
  - Verify implementation matches design

Workflow:
  1. Receive implementation task
  2. Fetch design from Figma
  3. Extract dimensions, colors, spacing
  4. Implement component
  5. Compare visual output
```

### Design System Maintenance
```yaml
Agent: Arcanea Frontend

Task: Sync design tokens

1. get_file_styles(fileKey: "design-system")
   → Extract all styles

2. Transform to CSS variables

3. Compare with existing tokens

4. Update token file if needed

5. Create PR with changes
```

## Arcanea Design Files

### File Structure
```
Arcanea Design System/
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Effects
├── 🧩 Components
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   └── Navigation
├── 📱 Patterns
│   ├── Luminor Selection
│   ├── Academy Navigation
│   └── Creation Flow
└── 📐 Templates
    ├── Dashboard
    ├── Profile
    └── Academy
```

### Key File References
```yaml
Design System: "figma.com/file/[design-system-key]"
Components: "figma.com/file/[components-key]"
Screens: "figma.com/file/[screens-key]"
```

## Examples

### Implement Component from Design
```
Agent: Arcanea Frontend

Task: Build LuminorCard component

1. Get component spec:
   get_file_nodes(
     fileKey: "components-key",
     nodeIds: ["luminor-card"]
   )

   → Returns:
   {
     name: "LuminorCard",
     width: 280,
     height: 360,
     cornerRadius: 16,
     children: [
       {name: "Avatar", type: "FRAME", ...},
       {name: "Name", type: "TEXT", ...},
       {name: "Title", type: "TEXT", ...},
       {name: "Academy Badge", type: "INSTANCE", ...}
     ],
     styles: {
       background: "cosmic/800",
       border: "primary/500/20"
     }
   }

2. Get visual reference:
   get_images(
     fileKey: "components-key",
     nodeIds: ["luminor-card"],
     format: "png",
     scale: 2
   )

3. Implement:
   ```tsx
   export function LuminorCard({ luminor }) {
     return (
       <div className="w-[280px] h-[360px] rounded-2xl
                       bg-cosmic-800 border border-primary-500/20">
         <Avatar src={luminor.avatar} />
         <h3 className="text-xl font-semibold">{luminor.name}</h3>
         <p className="text-secondary">{luminor.title}</p>
         <AcademyBadge academy={luminor.academy} />
       </div>
     );
   }
   ```

4. Compare output to design image
```

### Extract Academy Color Palette
```
Agent: Arcanea Frontend

Task: Get Atlantean Academy colors

get_file_styles(fileKey: "design-system-key")

→ Filter for Atlantean:
  {
    "atlantean/primary": "#0ea5e9",
    "atlantean/secondary": "#06b6d4",
    "atlantean/accent": "#5eead4",
    "atlantean/glow": "#0ea5e9/30"
  }

→ Generate CSS:
  :root[data-academy="atlantean"] {
    --academy-primary: #0ea5e9;
    --academy-secondary: #06b6d4;
    --academy-accent: #5eead4;
    --academy-glow: rgba(14, 165, 233, 0.3);
  }
```

## Best Practices

### Design-Code Sync
- Extract tokens programmatically
- Version design system files
- Automate token updates
- Document design decisions

### Component Implementation
- Match dimensions exactly
- Use extracted color tokens
- Respect spacing values
- Implement all states (hover, active, disabled)

### Collaboration
- Reference specific frames
- Link Figma URLs in issues
- Comment on design discrepancies
- Request clarification early

## Troubleshooting

### Common Issues

**File Not Found:**
- Verify file key from URL
- Check file is shared with token owner
- Ensure file isn't deleted

**Styles Not Exported:**
- Verify styles are published
- Check team library access
- Ensure style naming convention

**Image Export Failed:**
- Check node IDs are valid
- Verify format is supported
- Ensure adequate permissions
