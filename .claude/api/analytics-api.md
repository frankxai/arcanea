# Analytics API

> **Usage tracking, metrics, and insights**

## Overview

The Analytics API provides:
- Usage metrics for skills and agents
- Learning analytics
- Performance monitoring
- Custom event tracking

## Base URL

```
https://api.arcanea.io/v1/analytics
```

## Endpoints

### Skills Usage

Get skill usage metrics.

```http
GET /v1/analytics/skills/usage
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `skill_id` | string | Filter by specific skill |
| `tier` | string | Filter by tier |
| `period` | string | Time period: `day`, `week`, `month`, `year` |
| `start_date` | string | Start date (ISO 8601) |
| `end_date` | string | End date (ISO 8601) |

**Response**

```json
{
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "total_accesses": 15420,
      "unique_users": 892,
      "skills_used": 18
    },
    "by_skill": [
      {
        "skill_id": "design-systems",
        "name": "Design Systems",
        "tier": "community",
        "accesses": 3245,
        "unique_users": 412,
        "avg_session_duration_seconds": 342
      },
      {
        "skill_id": "teacher-team",
        "name": "Teacher Team",
        "tier": "premium",
        "accesses": 1823,
        "unique_users": 156,
        "avg_session_duration_seconds": 580
      }
    ],
    "trends": {
      "daily_average": 497,
      "growth_rate": 0.12,
      "peak_day": "2024-01-15",
      "peak_value": 892
    }
  }
}
```

---

### Agent Usage

Get agent invocation metrics.

```http
GET /v1/analytics/agents/usage
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `agent_id` | string | Filter by specific agent |
| `team` | string | Filter by team |
| `period` | string | Time period |

**Response**

```json
{
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "total_invocations": 8934,
      "unique_users": 567,
      "total_tokens": 4500000,
      "avg_response_time_ms": 2340
    },
    "by_agent": [
      {
        "agent_id": "arcanea-frontend",
        "name": "Frontend Developer",
        "team": "developer",
        "invocations": 2341,
        "success_rate": 0.97,
        "avg_duration_ms": 2100,
        "total_tokens": 1200000
      },
      {
        "agent_id": "teacher-mentor",
        "name": "Mentor",
        "team": "teacher",
        "invocations": 1567,
        "success_rate": 0.99,
        "avg_duration_ms": 1800,
        "total_tokens": 890000
      }
    ],
    "by_team": [
      {
        "team": "developer",
        "invocations": 5234,
        "percentage": 58.6
      },
      {
        "team": "teacher",
        "invocations": 2100,
        "percentage": 23.5
      }
    ]
  }
}
```

---

### Training Analytics

Get learning analytics.

```http
GET /v1/analytics/training
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `path_id` | string | Filter by learning path |
| `module_id` | string | Filter by module |
| `period` | string | Time period |

**Response**

```json
{
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "enrollments": 1245,
      "completions": 423,
      "completion_rate": 0.34,
      "certifications_issued": 89,
      "total_learning_hours": 3420
    },
    "by_path": [
      {
        "path_id": "foundation",
        "name": "Foundation Track",
        "enrollments": 567,
        "completions": 312,
        "completion_rate": 0.55,
        "avg_duration_hours": 2.8
      },
      {
        "path_id": "developer",
        "name": "Developer Track",
        "enrollments": 342,
        "completions": 89,
        "completion_rate": 0.26,
        "avg_duration_hours": 5.2
      }
    ],
    "assessment_performance": {
      "avg_score": 78.5,
      "pass_rate": 0.82,
      "hardest_questions": [
        {
          "question_id": "dev-q15",
          "module": "developer-onboarding",
          "fail_rate": 0.45
        }
      ]
    },
    "drop_off_points": [
      {
        "module_id": "backend-workflows",
        "section_id": "section-3",
        "drop_off_rate": 0.23
      }
    ]
  }
}
```

---

### User Analytics

Get user-level analytics.

```http
GET /v1/analytics/users/{user_id}
```

**Response**

```json
{
  "data": {
    "user_id": "user_abc123",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "activity": {
      "total_sessions": 45,
      "total_time_hours": 12.5,
      "avg_session_minutes": 16.7,
      "last_active": "2024-01-30T15:30:00Z"
    },
    "skills_usage": [
      {
        "skill_id": "design-systems",
        "accesses": 23,
        "time_spent_minutes": 89
      }
    ],
    "agents_usage": [
      {
        "agent_id": "arcanea-frontend",
        "invocations": 34,
        "success_rate": 0.97
      }
    ],
    "learning": {
      "modules_completed": 6,
      "certifications": 2,
      "total_learning_hours": 4.5
    }
  }
}
```

---

### Organization Analytics

Get organization-wide analytics.

```http
GET /v1/analytics/organizations/{org_id}
```

**Response**

```json
{
  "data": {
    "org_id": "org_xyz123",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "overview": {
      "total_users": 45,
      "active_users": 38,
      "total_api_calls": 12340,
      "total_tokens_used": 5600000
    },
    "usage_by_tier": {
      "community_skills": 4560,
      "premium_skills": 3210,
      "arcanea_skills": 980
    },
    "top_users": [
      {
        "user_id": "user_abc",
        "invocations": 234,
        "tokens_used": 450000
      }
    ],
    "cost_analysis": {
      "estimated_cost": 145.50,
      "cost_by_category": {
        "agents": 120.00,
        "training": 25.50
      }
    }
  }
}
```

---

### Track Custom Event

Record custom analytics events.

```http
POST /v1/analytics/events
```

**Request Body**

```json
{
  "event_type": "feature_used",
  "event_name": "dark_mode_enabled",
  "user_id": "user_abc123",
  "properties": {
    "source": "settings_page",
    "previous_theme": "light"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response**

```json
{
  "data": {
    "event_id": "evt_123456",
    "recorded": true,
    "timestamp": "2024-01-15T12:00:00Z"
  }
}
```

---

### Query Custom Events

Query custom events with filters.

```http
GET /v1/analytics/events
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_type` | string | Filter by event type |
| `event_name` | string | Filter by event name |
| `user_id` | string | Filter by user |
| `start_date` | string | Start date |
| `end_date` | string | End date |

**Response**

```json
{
  "data": {
    "events": [
      {
        "event_id": "evt_123456",
        "event_type": "feature_used",
        "event_name": "dark_mode_enabled",
        "user_id": "user_abc123",
        "properties": {
          "source": "settings_page"
        },
        "timestamp": "2024-01-15T12:00:00Z"
      }
    ],
    "aggregations": {
      "total_events": 145,
      "unique_users": 67,
      "by_event_name": {
        "dark_mode_enabled": 45,
        "dark_mode_disabled": 12
      }
    }
  }
}
```

---

### Export Analytics

Export analytics data.

```http
POST /v1/analytics/export
```

**Request Body**

```json
{
  "type": "full",
  "format": "csv",
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "include": ["skills", "agents", "training"],
  "delivery": {
    "method": "email",
    "email": "analytics@company.com"
  }
}
```

**Response**

```json
{
  "data": {
    "export_id": "exp_xyz789",
    "status": "processing",
    "estimated_completion": "2024-01-15T12:10:00Z",
    "download_url": null
  }
}
```

---

## Dashboards

### Get Dashboard Configuration

Retrieve dashboard widgets configuration.

```http
GET /v1/analytics/dashboards/{dashboard_id}
```

**Response**

```json
{
  "data": {
    "id": "main_dashboard",
    "name": "Main Analytics Dashboard",
    "widgets": [
      {
        "id": "skills_usage",
        "type": "line_chart",
        "title": "Skills Usage Over Time",
        "data_source": "skills_usage",
        "config": {
          "period": "30d",
          "group_by": "day"
        }
      },
      {
        "id": "top_agents",
        "type": "bar_chart",
        "title": "Top Agents by Invocations",
        "data_source": "agents_usage",
        "config": {
          "limit": 10,
          "sort": "invocations_desc"
        }
      }
    ]
  }
}
```

---

## SDK Examples

### JavaScript

```typescript
import { ArcaneaClient } from '@arcanea/sdk';

const client = new ArcaneaClient({
  apiKey: process.env.ARCANEA_API_KEY
});

// Get skills usage
const skillsUsage = await client.analytics.skills.usage({
  period: 'month'
});

// Get agent metrics
const agentMetrics = await client.analytics.agents.usage({
  team: 'developer'
});

// Track custom event
await client.analytics.track({
  eventType: 'feature_used',
  eventName: 'component_generated',
  properties: { component_type: 'button' }
});

// Export data
const export_ = await client.analytics.export({
  format: 'csv',
  include: ['skills', 'agents']
});
```

### Python

```python
from arcanea import ArcaneaClient

client = ArcaneaClient(api_key=os.environ['ARCANEA_API_KEY'])

# Get usage overview
usage = client.analytics.skills.usage(period='month')

# Get training analytics
training = client.analytics.training.summary()

# Track event
client.analytics.track(
    event_type='feature_used',
    event_name='skill_accessed',
    properties={'skill_id': 'design-systems'}
)
```

---

## Webhooks

Analytics-specific webhook events:

```yaml
Events:
  - analytics.threshold_exceeded
  - analytics.anomaly_detected
  - analytics.export_ready
  - analytics.daily_digest
```

---

## Rate Limits

| Tier | Usage Endpoints | Event Tracking | Export |
|------|-----------------|----------------|--------|
| Community | 100/hour | 500/hour | 1/day |
| Pro | 1000/hour | 5000/hour | 10/day |
| Team | 5000/hour | 20000/hour | 50/day |
| Enterprise | Custom | Custom | Custom |
