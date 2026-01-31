# Notion Integration

> **Documentation, knowledge management, and collaboration**

## Purpose

Notion integration enables Arcanea agents to:
- Store and retrieve documentation
- Manage project wikis
- Track curriculum and learning content
- Maintain strategic documents
- Collaborate on specifications

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_TOKEN}"
      }
    }
  }
}
```

### Required Setup
1. Create Notion integration at notion.so/my-integrations
2. Get API key
3. Share relevant pages/databases with integration

## Tools Available

### Pages
```yaml
create_page:
  Description: Create new page
  Parameters:
    - parent_id: Parent page or database ID
    - title: Page title
    - content: Page content (blocks)

get_page:
  Description: Retrieve page content
  Parameters:
    - page_id: Page ID

update_page:
  Description: Update page properties/content
  Parameters:
    - page_id: Page ID
    - properties: Updated properties
    - content: Updated content blocks

search:
  Description: Search across workspace
  Parameters:
    - query: Search query
    - filter: Optional filters
```

### Databases
```yaml
query_database:
  Description: Query database entries
  Parameters:
    - database_id: Database ID
    - filter: Query filters
    - sorts: Sort order

create_database_entry:
  Description: Add entry to database
  Parameters:
    - database_id: Database ID
    - properties: Entry properties

update_database_entry:
  Description: Update database entry
  Parameters:
    - page_id: Entry page ID
    - properties: Updated properties
```

### Blocks
```yaml
append_blocks:
  Description: Add content blocks to page
  Parameters:
    - page_id: Target page ID
    - blocks: Array of block objects

get_block_children:
  Description: Get child blocks of a block
  Parameters:
    - block_id: Parent block ID
```

## Usage Patterns

### Documentation Management

**Arcanea Workspace Structure:**
```
Arcanea Workspace/
├── 📚 Lore & Canon/
│   ├── Universe Bible
│   ├── Luminor Profiles
│   ├── Academy Descriptions
│   └── Timeline
├── 🎨 Design System/
│   ├── Color Tokens
│   ├── Component Library
│   └── Animation Standards
├── 💻 Technical Docs/
│   ├── Architecture
│   ├── API Reference
│   └── Deployment Guides
├── 📋 Project Management/
│   ├── Roadmap
│   ├── Sprint Planning
│   └── Meeting Notes
└── 🎓 Academy Curriculum/
    ├── Music Path
    ├── Story Path
    └── Visual Path
```

### Team-Specific Usage

**Developer Team:**
```yaml
Primary Databases:
  - Technical Specifications
  - API Documentation
  - Architecture Decisions

Workflows:
  - Store technical specs before implementation
  - Document API changes
  - Record architecture decision records (ADRs)
```

**Author Team:**
```yaml
Primary Databases:
  - Lore Encyclopedia
  - Character Registry
  - World Building Notes

Workflows:
  - Expand lore entries
  - Track canon changes
  - Document new Luminor personalities
```

**Teacher Team:**
```yaml
Primary Databases:
  - Curriculum Database
  - Learning Paths
  - Assessment Bank

Workflows:
  - Store lesson content
  - Track curriculum versions
  - Manage assessment questions
```

**Visionary Team:**
```yaml
Primary Databases:
  - Strategy Documents
  - Market Analysis
  - Scenario Planning

Workflows:
  - Document strategic decisions
  - Store competitive analysis
  - Track scenario models
```

## Agent Integration

### Storing Documentation
```yaml
Agent: Arcanea Lore Master
Task: Document new Luminor

Actions:
1. search(query: "Luminor Registry")
   → Find the Luminor database

2. create_database_entry(
     database_id: "luminor-registry-id",
     properties: {
       Name: "Aurora",
       Title: "The Dawn Bringer",
       Academy: "Creation & Light",
       Domain: "Inspiration",
       Status: "Draft"
     }
   )

3. update_page(
     page_id: [new entry ID],
     content: [
       {type: "heading_2", text: "Personality"},
       {type: "paragraph", text: "Aurora embodies..."},
       {type: "heading_2", text: "Voice Patterns"},
       {type: "bulleted_list", items: ["Speaks in...", "Often uses..."]}
     ]
   )
```

### Retrieving Specifications
```yaml
Agent: Arcanea Frontend
Task: Implement feature per spec

Actions:
1. search(query: "Luminor Selection Grid Spec")
   → Find the specification page

2. get_page(page_id: [spec page ID])
   → Retrieve full specification

3. get_block_children(block_id: [requirements section])
   → Get detailed requirements

4. [Implement based on retrieved spec]
```

### Curriculum Management
```yaml
Agent: Teacher Curriculum Designer
Task: Update learning module

Actions:
1. query_database(
     database_id: "curriculum-db",
     filter: {
       property: "Module",
       equals: "Music Basics"
     }
   )

2. update_database_entry(
     page_id: [module ID],
     properties: {
       Version: "2.1",
       Status: "Updated",
       LastModified: [today]
     }
   )

3. append_blocks(
     page_id: [module ID],
     blocks: [new lesson content]
   )
```

## Database Templates

### Luminor Registry
```yaml
Properties:
  Name: title
  Title: text
  Academy: select [Atlantean, Draconic, Creation & Light, Cross-Academy]
  Domain: text
  Status: select [Draft, Review, Canon]
  Voice Tone: multi_select
  Catchphrases: rich_text
  Created: created_time
  Last Updated: last_edited_time
```

### Curriculum Database
```yaml
Properties:
  Module Name: title
  Academy: select
  Level: select [Novice, Apprentice, Journeyman, Master]
  Prerequisites: relation [Curriculum]
  Duration: number (minutes)
  Status: select [Draft, Active, Retired]
  Version: text
  Luminor Guide: relation [Luminor Registry]
```

### Technical Specs
```yaml
Properties:
  Feature Name: title
  Type: select [Feature, Enhancement, Bug Fix]
  Priority: select [P0, P1, P2, P3]
  Status: select [Draft, Review, Approved, Implemented]
  Owner: person
  Sprint: relation [Sprints]
  Dependencies: relation [Technical Specs]
```

## Examples

### Create Technical Specification
```
Agent: Arcanea Architect

Task: Document new feature spec

create_page(
  parent_id: "technical-docs-id",
  title: "Guardian Evolution System v2",
  content: [
    {
      type: "callout",
      icon: "📋",
      text: "Status: Draft | Owner: Backend Team"
    },
    {
      type: "heading_2",
      text: "Overview"
    },
    {
      type: "paragraph",
      text: "This specification describes the enhanced Guardian evolution..."
    },
    {
      type: "heading_2",
      text: "Requirements"
    },
    {
      type: "numbered_list",
      items: [
        "Guardians must track XP across 50 levels",
        "Each level unlocks new capabilities",
        "Evolution milestones at levels 10, 25, 40, 50"
      ]
    },
    {
      type: "heading_2",
      text: "Technical Design"
    },
    {
      type: "code",
      language: "typescript",
      content: "interface GuardianLevel {\n  level: number;\n  xp: number;\n  capabilities: string[];\n}"
    }
  ]
)
```

### Query and Update Lore
```
Agent: Arcanea World Expander

Task: Add new location to Atlantean Academy

1. query_database(
     database_id: "locations-db",
     filter: {
       property: "Academy",
       equals: "Atlantean"
     }
   )
   → Get existing Atlantean locations

2. create_database_entry(
     database_id: "locations-db",
     properties: {
       Name: "The Whisper Grotto",
       Academy: "Atlantean",
       Type: "Sacred Space",
       Access: "Level 3+",
       Description: "A hidden cave where stories echo forever..."
     }
   )

3. append_blocks(
     page_id: [new location ID],
     blocks: [
       {type: "heading_2", text: "Description"},
       {type: "paragraph", text: "Deep beneath the Atlantean Academy..."},
       {type: "heading_2", text: "Traditions"},
       {type: "bulleted_list", items: ["The Whisper Ceremony", "Echo Reading"]}
     ]
   )
```

## Best Practices

### Page Organization
- Use consistent heading hierarchy
- Include status callouts at top
- Link related pages
- Use databases for structured data

### Database Design
- Keep properties focused
- Use relations to connect data
- Include status and timestamp properties
- Design for querying

### Content Structure
```markdown
# Page Title

> Brief description or status

## Overview
[Summary section]

## Details
[Main content]

## Related
- [Link to related page]
- [Link to related page]

---
Last updated: [date]
```

## Troubleshooting

### Common Issues

**Page Not Found:**
- Verify page is shared with integration
- Check page ID format
- Ensure integration has access

**Permission Denied:**
- Check integration permissions
- Verify page sharing settings
- Confirm API key is valid

**Content Not Updating:**
- Check block ID is correct
- Verify content format
- Ensure page isn't archived
