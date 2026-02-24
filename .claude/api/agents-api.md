# Agents API

> **Programmatic agent invocation and orchestration**

## Overview

The Agents API enables:
- Invoking individual agents
- Orchestrating multi-agent workflows
- Streaming agent responses
- Managing agent sessions

## Base URL

```
https://api.arcanea.io/v1/agents
```

## Endpoints

### List Agents

Retrieve available agents.

```http
GET /v1/agents
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `team` | string | Filter by team: `developer`, `teacher`, `visionary`, `author` |
| `role` | string | Filter by role |

**Response**

```json
{
  "data": [
    {
      "id": "arcanea-frontend",
      "name": "Frontend Developer",
      "team": "developer",
      "role": "ui_implementation",
      "description": "React, Next.js, Tailwind expert",
      "capabilities": [
        "component_building",
        "styling",
        "animations",
        "responsive_design"
      ],
      "mcps": ["figma", "github", "next-devtools"]
    },
    {
      "id": "teacher-mentor",
      "name": "Mentor",
      "team": "teacher",
      "role": "personal_guidance",
      "description": "Adaptive teaching and personalized learning",
      "capabilities": [
        "socratic_method",
        "scaffolded_learning",
        "personalized_feedback"
      ],
      "mcps": ["notion"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 19
  }
}
```

---

### Get Agent

Retrieve agent details.

```http
GET /v1/agents/{agent_id}
```

**Response**

```json
{
  "data": {
    "id": "arcanea-frontend",
    "name": "Frontend Developer",
    "team": "developer",
    "role": "ui_implementation",
    "description": "Expert in React, Next.js, Tailwind CSS",
    "capabilities": [
      "component_building",
      "styling",
      "animations",
      "responsive_design",
      "accessibility"
    ],
    "mcps": ["figma", "github", "next-devtools", "playwright"],
    "skills_used": ["design-systems", "development-workflows"],
    "config": {
      "temperature": 0.7,
      "max_tokens": 4096,
      "timeout": 120
    }
  }
}
```

---

### Invoke Agent

Execute an agent task.

```http
POST /v1/agents/invoke
```

**Request Body**

```json
{
  "agent": "arcanea-frontend",
  "task": "Build a responsive card component",
  "context": {
    "design_reference": "figma://file/abc123/node/card-component",
    "existing_code": "// current implementation...",
    "requirements": [
      "Responsive from mobile to desktop",
      "Cosmic theme styling",
      "Hover animations"
    ]
  },
  "options": {
    "stream": false,
    "timeout": 60,
    "max_tokens": 2048
  }
}
```

**Response**

```json
{
  "data": {
    "invocation_id": "inv_abc123",
    "agent": "arcanea-frontend",
    "status": "completed",
    "result": {
      "code": "export function Card({ title, description, image }) {\n  return (\n    <div className=\"group relative rounded-2xl bg-cosmic-800...\">\n      ...\n    </div>\n  );\n}",
      "files_created": [
        "components/Card.tsx",
        "components/Card.test.tsx"
      ],
      "explanation": "Created a responsive card component with..."
    },
    "usage": {
      "input_tokens": 450,
      "output_tokens": 890,
      "duration_ms": 3420
    },
    "completed_at": "2024-01-15T12:00:00Z"
  }
}
```

---

### Invoke with Streaming

Stream agent responses in real-time.

```http
POST /v1/agents/invoke
```

**Request Body**

```json
{
  "agent": "arcanea-frontend",
  "task": "Build a card component",
  "options": {
    "stream": true
  }
}
```

**Response (SSE)**

```
event: start
data: {"invocation_id": "inv_abc123", "agent": "arcanea-frontend"}

event: thinking
data: {"step": "Analyzing design requirements..."}

event: progress
data: {"step": "Creating component structure...", "progress": 25}

event: content
data: {"type": "code", "content": "export function Card({..."}

event: progress
data: {"step": "Adding styling...", "progress": 50}

event: content
data: {"type": "code", "content": "  className=\"rounded-2xl..."}

event: complete
data: {"status": "completed", "result": {...}}
```

**JavaScript SSE Client**

```typescript
const response = await fetch('https://api.arcanea.io/v1/agents/invoke', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agent: 'arcanea-frontend',
    task: 'Build a card component',
    options: { stream: true }
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      console.log('Event:', data);
    }
  }
}
```

---

### Orchestrate Workflow

Execute multi-agent workflows.

```http
POST /v1/agents/orchestrate
```

**Request Body**

```json
{
  "workflow": "feature_development",
  "context": {
    "feature_name": "User Profile Editor",
    "requirements": "Allow users to edit their profile..."
  },
  "agents": [
    {
      "agent": "arcanea-architect",
      "task": "Design the feature architecture",
      "output_key": "architecture"
    },
    {
      "agent": "arcanea-backend",
      "task": "Implement API based on {architecture}",
      "depends_on": ["arcanea-architect"],
      "output_key": "api"
    },
    {
      "agent": "arcanea-frontend",
      "task": "Build UI based on {architecture}",
      "depends_on": ["arcanea-architect"],
      "output_key": "ui"
    },
    {
      "agent": "developer-qa-engineer",
      "task": "Test {api} and {ui}",
      "depends_on": ["arcanea-backend", "arcanea-frontend"]
    }
  ],
  "options": {
    "parallel": true,
    "timeout": 300
  }
}
```

**Response**

```json
{
  "data": {
    "workflow_id": "wf_xyz789",
    "status": "completed",
    "steps": [
      {
        "agent": "arcanea-architect",
        "status": "completed",
        "output": { "architecture": "..." }
      },
      {
        "agent": "arcanea-backend",
        "status": "completed",
        "output": { "api": "..." }
      },
      {
        "agent": "arcanea-frontend",
        "status": "completed",
        "output": { "ui": "..." }
      },
      {
        "agent": "developer-qa-engineer",
        "status": "completed",
        "output": { "tests": "..." }
      }
    ],
    "total_duration_ms": 45000,
    "usage": {
      "total_tokens": 15000
    }
  }
}
```

---

### Get Invocation Status

Check status of an agent invocation.

```http
GET /v1/agents/invocations/{invocation_id}
```

**Response**

```json
{
  "data": {
    "invocation_id": "inv_abc123",
    "agent": "arcanea-frontend",
    "status": "running",
    "progress": {
      "step": "Building component",
      "percentage": 65
    },
    "started_at": "2024-01-15T12:00:00Z"
  }
}
```

---

### Cancel Invocation

Cancel a running agent invocation.

```http
DELETE /v1/agents/invocations/{invocation_id}
```

**Response**

```json
{
  "data": {
    "invocation_id": "inv_abc123",
    "status": "cancelled",
    "cancelled_at": "2024-01-15T12:01:00Z"
  }
}
```

---

## Agent Teams

### Developer Team

```yaml
Agents:
  - arcanea-architect: System design
  - arcanea-frontend: UI implementation
  - arcanea-backend: API/database
  - arcanea-ai-specialist: AI integrations
  - arcanea-devops: Infrastructure
  - developer-qa-engineer: Testing
  - developer-documentation: Docs
  - arcanea-development: Coordination

Invoke Full Team:
  POST /v1/agents/teams/developer/invoke
```

### Teacher Team

```yaml
Agents:
  - teacher-mentor: Personal guidance
  - teacher-curriculum-designer: Path design
  - teacher-assessor: Evaluation
  - teacher-companion: Support

Invoke Full Team:
  POST /v1/agents/teams/teacher/invoke
```

### Visionary Team

```yaml
Agents:
  - visionary-strategist: Direction
  - visionary-innovator: Ideas
  - visionary-futurist: Trends
  - visionary-synthesizer: Integration

Invoke Full Team:
  POST /v1/agents/teams/visionary/invoke
```

---

## SDK Examples

### JavaScript

```typescript
import { ArcaneaClient } from '@arcanea/sdk';

const client = new ArcaneaClient({
  apiKey: process.env.ARCANEA_API_KEY
});

// Invoke single agent
const result = await client.agents.invoke({
  agent: 'arcanea-frontend',
  task: 'Build a login form',
  context: { designUrl: 'figma://...' }
});

// Stream response
const stream = await client.agents.invoke({
  agent: 'arcanea-frontend',
  task: 'Build a login form',
  options: { stream: true }
});

for await (const event of stream) {
  console.log(event.type, event.data);
}

// Orchestrate workflow
const workflow = await client.agents.orchestrate({
  workflow: 'feature_development',
  context: { feature: 'User Profile' },
  agents: [
    { agent: 'arcanea-architect', task: 'Design' },
    { agent: 'arcanea-frontend', task: 'Build', depends_on: ['arcanea-architect'] }
  ]
});
```

### Python

```python
from arcanea import ArcaneaClient

client = ArcaneaClient(api_key=os.environ['ARCANEA_API_KEY'])

# Invoke agent
result = client.agents.invoke(
    agent='arcanea-frontend',
    task='Build a login form'
)

# Stream response
for event in client.agents.invoke(
    agent='arcanea-frontend',
    task='Build a login form',
    stream=True
):
    print(event)

# Invoke team
result = client.agents.teams.invoke(
    team='developer',
    task='Build complete feature'
)
```

---

## Rate Limits

Agents API specific limits:

| Tier | Invoke | Orchestrate | Concurrent |
|------|--------|-------------|------------|
| Community | 20/hour | 5/hour | 1 |
| Pro | 200/hour | 50/hour | 5 |
| Team | 1000/hour | 200/hour | 20 |
| Enterprise | Custom | Custom | Custom |
