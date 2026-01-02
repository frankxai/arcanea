# Training API

> **Programmatic access to learning modules and progress tracking**

## Overview

The Training API provides:
- Learning module discovery and delivery
- Progress tracking and persistence
- Assessment and certification
- Learning path recommendations

## Base URL

```
https://api.arcanea.io/v1/training
```

## Endpoints

### List Learning Paths

Retrieve available learning paths.

```http
GET /v1/training/paths
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `track` | string | Filter by track: `foundation`, `developer`, `teacher`, `visionary`, `master` |
| `level` | string | Filter by level: `beginner`, `intermediate`, `advanced` |

**Response**

```json
{
  "data": [
    {
      "id": "foundation",
      "name": "Foundation Track",
      "description": "Core concepts for all users",
      "level": "beginner",
      "duration_hours": 3,
      "modules_count": 4,
      "prerequisites": [],
      "certification": "foundation_certified"
    },
    {
      "id": "developer",
      "name": "Developer Track",
      "description": "Technical implementation mastery",
      "level": "intermediate",
      "duration_hours": 6,
      "modules_count": 6,
      "prerequisites": ["foundation"],
      "certification": "developer_certified"
    }
  ]
}
```

---

### Get Learning Path

Retrieve path details with modules.

```http
GET /v1/training/paths/{path_id}
```

**Response**

```json
{
  "data": {
    "id": "developer",
    "name": "Developer Track",
    "description": "Master the Developer Team agents",
    "level": "intermediate",
    "duration_hours": 6,
    "modules": [
      {
        "id": "developer-onboarding",
        "order": 1,
        "name": "Developer Team Onboarding",
        "description": "Meet the 8 developer agents",
        "duration_minutes": 45,
        "objectives": [
          "Understand all developer agents",
          "Know when to engage each agent",
          "Coordinate multi-agent workflows"
        ]
      },
      {
        "id": "frontend-workflows",
        "order": 2,
        "name": "Frontend Workflows",
        "description": "Deep dive into Frontend agent",
        "duration_minutes": 60,
        "objectives": [
          "Build UI components with Frontend agent",
          "Integrate with Figma designs",
          "Master styling patterns"
        ]
      }
    ],
    "certification": {
      "id": "developer_certified",
      "requirements": {
        "modules_completed": "all",
        "assessment_score": 80
      }
    }
  }
}
```

---

### Get Module

Retrieve module content.

```http
GET /v1/training/modules/{module_id}
```

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Content format: `full`, `sections`, `metadata` |

**Response**

```json
{
  "data": {
    "id": "developer-onboarding",
    "name": "Developer Team Onboarding",
    "path_id": "developer",
    "order": 1,
    "duration_minutes": 45,
    "objectives": [
      "Understand all developer agents",
      "Know when to engage each agent",
      "Coordinate multi-agent workflows"
    ],
    "prerequisites": ["foundation"],
    "sections": [
      {
        "id": "section-1",
        "title": "Developer Team Overview",
        "type": "content",
        "content": "The Developer Team consists of 8 specialized agents..."
      },
      {
        "id": "section-2",
        "title": "Agent Selection Guide",
        "type": "content",
        "content": "When to use each agent..."
      },
      {
        "id": "section-3",
        "title": "Exercise: Agent Selection",
        "type": "exercise",
        "content": "For each scenario, identify the primary agent..."
      },
      {
        "id": "section-4",
        "title": "Knowledge Check",
        "type": "assessment",
        "questions_count": 5
      }
    ],
    "resources": [
      {
        "type": "document",
        "title": "Agent Reference Card",
        "url": "/resources/developer-agents-reference.pdf"
      }
    ]
  }
}
```

---

### Start Module

Begin tracking progress for a module.

```http
POST /v1/training/modules/{module_id}/start
```

**Request Body**

```json
{
  "user_id": "user_abc123"
}
```

**Response**

```json
{
  "data": {
    "enrollment_id": "enr_xyz789",
    "module_id": "developer-onboarding",
    "user_id": "user_abc123",
    "status": "in_progress",
    "started_at": "2024-01-15T12:00:00Z",
    "progress": {
      "sections_completed": 0,
      "sections_total": 4,
      "percentage": 0
    }
  }
}
```

---

### Update Progress

Record progress through a module.

```http
POST /v1/training/progress
```

**Request Body**

```json
{
  "enrollment_id": "enr_xyz789",
  "section_id": "section-1",
  "action": "completed",
  "time_spent_seconds": 480
}
```

**Response**

```json
{
  "data": {
    "enrollment_id": "enr_xyz789",
    "progress": {
      "sections_completed": 1,
      "sections_total": 4,
      "percentage": 25,
      "time_spent_total": 480
    },
    "next_section": {
      "id": "section-2",
      "title": "Agent Selection Guide"
    }
  }
}
```

---

### Get User Progress

Retrieve user's learning progress.

```http
GET /v1/training/users/{user_id}/progress
```

**Response**

```json
{
  "data": {
    "user_id": "user_abc123",
    "paths": [
      {
        "path_id": "foundation",
        "status": "completed",
        "completed_at": "2024-01-10T12:00:00Z",
        "certification": "foundation_certified"
      },
      {
        "path_id": "developer",
        "status": "in_progress",
        "progress": {
          "modules_completed": 2,
          "modules_total": 6,
          "percentage": 33
        },
        "current_module": "backend-workflows"
      }
    ],
    "total_time_spent_hours": 4.5,
    "certifications": ["foundation_certified"],
    "achievements": [
      {
        "id": "quick_learner",
        "name": "Quick Learner",
        "description": "Completed Foundation in under 2 hours",
        "earned_at": "2024-01-10T12:00:00Z"
      }
    ]
  }
}
```

---

### Submit Assessment

Submit answers for module assessment.

```http
POST /v1/training/assessments
```

**Request Body**

```json
{
  "enrollment_id": "enr_xyz789",
  "module_id": "developer-onboarding",
  "section_id": "section-4",
  "answers": [
    {
      "question_id": "q1",
      "answer": "c"
    },
    {
      "question_id": "q2",
      "answer": "b"
    },
    {
      "question_id": "q3",
      "answer": ["a", "c"]
    }
  ]
}
```

**Response**

```json
{
  "data": {
    "assessment_id": "asmt_123",
    "score": 80,
    "passed": true,
    "results": [
      {
        "question_id": "q1",
        "correct": true,
        "feedback": "Correct! The Developer Team has 8 agents."
      },
      {
        "question_id": "q2",
        "correct": true,
        "feedback": "Right, Backend handles database schemas."
      },
      {
        "question_id": "q3",
        "correct": false,
        "feedback": "Almost! The answer is 'For complex multi-step features'.",
        "correct_answer": "c"
      }
    ],
    "module_completed": true
  }
}
```

---

### Get Certification

Retrieve certification details.

```http
GET /v1/training/certifications/{certification_id}
```

**Response**

```json
{
  "data": {
    "id": "developer_certified",
    "name": "Arcanea Developer Certified",
    "description": "Mastery of Developer Team agents",
    "requirements": {
      "path_completed": "developer",
      "final_assessment_score": 80
    },
    "badge_url": "https://cdn.arcanea.io/badges/developer-certified.svg",
    "credential_url": "https://credentials.arcanea.io/verify/{credential_id}"
  }
}
```

---

### Issue Certification

Award certification to user.

```http
POST /v1/training/certifications/issue
```

**Request Body**

```json
{
  "user_id": "user_abc123",
  "certification_id": "developer_certified"
}
```

**Response**

```json
{
  "data": {
    "credential_id": "cred_abc123xyz",
    "user_id": "user_abc123",
    "certification_id": "developer_certified",
    "issued_at": "2024-01-15T12:00:00Z",
    "verification_url": "https://credentials.arcanea.io/verify/cred_abc123xyz",
    "badge_url": "https://cdn.arcanea.io/badges/developer-certified.svg",
    "pdf_url": "https://cdn.arcanea.io/certs/cred_abc123xyz.pdf"
  }
}
```

---

## Learning Recommendations

### Get Recommendations

Get personalized learning recommendations.

```http
GET /v1/training/users/{user_id}/recommendations
```

**Response**

```json
{
  "data": {
    "user_id": "user_abc123",
    "recommendations": [
      {
        "type": "next_module",
        "module_id": "backend-workflows",
        "reason": "Continue your Developer Track progress"
      },
      {
        "type": "suggested_path",
        "path_id": "teacher",
        "reason": "Based on your interest in education features"
      },
      {
        "type": "skill_gap",
        "skill_id": "testing-strategies",
        "reason": "Strengthen your testing knowledge"
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

// Get learning path
const path = await client.training.paths.get('developer');

// Start module
const enrollment = await client.training.modules.start('developer-onboarding', {
  userId: 'user_abc123'
});

// Track progress
await client.training.progress.update({
  enrollmentId: enrollment.id,
  sectionId: 'section-1',
  action: 'completed',
  timeSpent: 480
});

// Submit assessment
const result = await client.training.assessments.submit({
  enrollmentId: enrollment.id,
  moduleId: 'developer-onboarding',
  answers: [
    { questionId: 'q1', answer: 'c' }
  ]
});

// Get certifications
const certs = await client.training.users.certifications('user_abc123');
```

### Python

```python
from arcanea import ArcaneaClient

client = ArcaneaClient(api_key=os.environ['ARCANEA_API_KEY'])

# Get learning paths
paths = client.training.paths.list()

# Get module content
module = client.training.modules.get('developer-onboarding')

# Track completion
client.training.progress.complete(
    enrollment_id='enr_xyz789',
    section_id='section-1'
)

# Get user progress
progress = client.training.users.progress('user_abc123')
```

---

## Webhooks

Training-specific webhook events:

```yaml
Events:
  - training.module.started
  - training.module.completed
  - training.assessment.passed
  - training.assessment.failed
  - training.path.completed
  - training.certified
```

---

## Rate Limits

| Tier | Path/Module | Progress | Assessment |
|------|-------------|----------|------------|
| Community | 100/hour | 200/hour | 50/hour |
| Pro | 1000/hour | 2000/hour | 500/hour |
| Team | 5000/hour | 10000/hour | 2000/hour |
