# Arcanea Skills API

> **Programmatic access to skills and agents**

## Overview

The Arcanea Skills API provides programmatic interfaces for:
- Skill discovery and retrieval
- Agent invocation and orchestration
- Training module delivery
- Usage analytics and tracking

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    API ARCHITECTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │               API Gateway                        │   │
│  │  • Authentication                               │   │
│  │  • Rate Limiting                                │   │
│  │  • Request Routing                              │   │
│  └──────────────────────┬──────────────────────────┘   │
│                         │                               │
│    ┌────────────────────┼────────────────────────┐     │
│    │                    │                        │     │
│    ▼                    ▼                        ▼     │
│ ┌────────┐        ┌────────┐              ┌────────┐  │
│ │Skills  │        │Agents  │              │Training│  │
│ │  API   │        │  API   │              │  API   │  │
│ └────────┘        └────────┘              └────────┘  │
│    │                    │                        │     │
│    └────────────────────┼────────────────────────┘     │
│                         │                               │
│              ┌──────────────────┐                      │
│              │   Analytics API  │                      │
│              │  (All endpoints  │                      │
│              │   report here)   │                      │
│              └──────────────────┘                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## API Sections

### Core APIs
- [Skills API](./skills-api.md) - Skill discovery and content
- [Agents API](./agents-api.md) - Agent invocation and orchestration
- [Training API](./training-api.md) - Learning modules and progress
- [Analytics API](./analytics-api.md) - Usage tracking and metrics

### Authentication

All API requests require authentication:

```yaml
Header:
  Authorization: Bearer <api_key>

API Key Tiers:
  - community: Free tier, limited requests
  - pro: Pro tier, standard limits
  - team: Team tier, elevated limits
  - enterprise: Enterprise, custom limits
```

### Rate Limits

```yaml
Community (Free):
  - 100 requests/hour
  - 1,000 requests/day

Pro:
  - 1,000 requests/hour
  - 10,000 requests/day

Team:
  - 5,000 requests/hour
  - 50,000 requests/day

Enterprise:
  - Custom limits
  - SLA guarantees
```

## Quick Start

### 1. Get an API Key

```bash
# Register at api.arcanea.io
curl -X POST https://api.arcanea.io/v1/register \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "tier": "community"}'
```

### 2. List Available Skills

```bash
curl https://api.arcanea.io/v1/skills \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3. Get Skill Content

```bash
curl https://api.arcanea.io/v1/skills/design-systems \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 4. Invoke an Agent

```bash
curl -X POST https://api.arcanea.io/v1/agents/invoke \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "frontend",
    "task": "Review this component code",
    "context": { "code": "..." }
  }'
```

## SDK Support

### JavaScript/TypeScript

```typescript
import { ArcaneaClient } from '@arcanea/sdk';

const client = new ArcaneaClient({
  apiKey: process.env.ARCANEA_API_KEY
});

// List skills
const skills = await client.skills.list();

// Get skill content
const skill = await client.skills.get('design-systems');

// Invoke agent
const result = await client.agents.invoke({
  agent: 'frontend',
  task: 'Build a button component',
  options: { style: 'cosmic' }
});
```

### Python

```python
from arcanea import ArcaneaClient

client = ArcaneaClient(api_key=os.environ['ARCANEA_API_KEY'])

# List skills
skills = client.skills.list()

# Get skill content
skill = client.skills.get('design-systems')

# Invoke agent
result = client.agents.invoke(
    agent='frontend',
    task='Build a button component',
    options={'style': 'cosmic'}
)
```

## Webhooks

Register webhooks for async notifications:

```bash
curl -X POST https://api.arcanea.io/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhook",
    "events": ["agent.completed", "training.progress"]
  }'
```

### Webhook Events

```yaml
Skills:
  - skill.accessed
  - skill.updated

Agents:
  - agent.invoked
  - agent.completed
  - agent.error

Training:
  - training.started
  - training.progress
  - training.completed
  - training.certified

Analytics:
  - analytics.threshold_exceeded
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset_at": "2024-01-15T12:00:00Z"
    }
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `unauthorized` | 401 | Invalid or missing API key |
| `forbidden` | 403 | Insufficient permissions |
| `not_found` | 404 | Resource doesn't exist |
| `rate_limit_exceeded` | 429 | Too many requests |
| `server_error` | 500 | Internal server error |

## Versioning

API versioning is included in the URL:

```
https://api.arcanea.io/v1/skills
https://api.arcanea.io/v2/skills  (future)
```

Breaking changes will increment the version number. We maintain backward compatibility for at least 12 months after a new version is released.

## Support

- **Documentation**: docs.arcanea.io/api
- **Status**: status.arcanea.io
- **Support**: api-support@arcanea.io
