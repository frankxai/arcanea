# Arcanea Analytics Dashboards

> **Comprehensive tracking and visualization for the skills ecosystem**

## Overview

The Analytics Dashboard system provides real-time insights into:
- Skill usage and adoption
- Agent performance metrics
- Learning progress and outcomes
- Business and revenue analytics

## Dashboard Architecture

```
┌─────────────────────────────────────────────────────────┐
│              ANALYTICS DASHBOARD SYSTEM                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Data Collection Layer              │   │
│  │  Events → Queue → Processor → Data Warehouse   │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│  ┌──────────────────────┼──────────────────────────┐   │
│  │                      │                          │   │
│  ▼                      ▼                          ▼   │
│ ┌────────┐        ┌────────┐              ┌────────┐  │
│ │Skills  │        │Agents  │              │Training│  │
│ │Metrics │        │Metrics │              │Metrics │  │
│ └────────┘        └────────┘              └────────┘  │
│      │                 │                       │       │
│      └─────────────────┼───────────────────────┘       │
│                        │                               │
│            ┌───────────────────────┐                  │
│            │  Dashboard Renderer   │                  │
│            │  • Charts & Graphs    │                  │
│            │  • Real-time Updates  │                  │
│            │  • Export/Reports     │                  │
│            └───────────────────────┘                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Available Dashboards

### 1. [Executive Dashboard](./executive-dashboard.md)
High-level overview for leadership
- KPI summaries
- Revenue metrics
- Growth indicators
- Health scores

### 2. [Skills Dashboard](./skills-dashboard.md)
Skill usage and performance
- Access patterns
- Popular skills
- Tier distribution
- Version adoption

### 3. [Agents Dashboard](./agents-dashboard.md)
Agent invocation and performance
- Invocation counts
- Success rates
- Response times
- Team utilization

### 4. [Training Dashboard](./training-dashboard.md)
Learning metrics and outcomes
- Enrollment trends
- Completion rates
- Assessment performance
- Certification tracking

### 5. [Operations Dashboard](./operations-dashboard.md)
System health and performance
- API latency
- Error rates
- Capacity metrics
- Cost analysis

## Key Metrics

### Core KPIs

```yaml
Usage Metrics:
  - Daily Active Users (DAU)
  - Monthly Active Users (MAU)
  - Total API Calls
  - Skills Accessed

Engagement Metrics:
  - Session Duration
  - Skills per Session
  - Return Rate
  - Feature Adoption

Learning Metrics:
  - Enrollment Rate
  - Completion Rate
  - Certification Rate
  - Time to Completion

Business Metrics:
  - Revenue (MRR/ARR)
  - Conversion Rate
  - Churn Rate
  - Customer Lifetime Value
```

### Metric Definitions

| Metric | Definition | Calculation |
|--------|------------|-------------|
| DAU | Unique users per day | `COUNT(DISTINCT user_id) WHERE date = today` |
| MAU | Unique users per month | `COUNT(DISTINCT user_id) WHERE date >= month_start` |
| Completion Rate | % of enrollments completed | `completions / enrollments * 100` |
| Success Rate | % of successful agent calls | `successful / total * 100` |

## Dashboard Components

### Widget Types

```yaml
Charts:
  - Line Chart: Time series data
  - Bar Chart: Comparisons
  - Pie/Donut: Distributions
  - Area Chart: Cumulative data

Tables:
  - Data Grid: Detailed records
  - Leaderboard: Ranked items
  - Comparison: Side-by-side

Single Values:
  - KPI Card: Single metric with trend
  - Gauge: Progress toward goal
  - Scorecard: Multiple related metrics

Maps:
  - Geographic: Location-based data
  - Heat Map: Density visualization
```

### Interactivity

```yaml
Filters:
  - Date Range: Custom period selection
  - Segment: User/org/tier filters
  - Dimension: Skill/agent/path filters

Actions:
  - Drill Down: Click to see details
  - Export: Download data/reports
  - Share: Generate shareable link
  - Alert: Set threshold notifications
```

## Implementation Specifications

### Data Refresh Rates

```yaml
Real-time (< 1 minute):
  - Active sessions
  - Live error rates
  - Current API load

Near Real-time (1-5 minutes):
  - Usage counts
  - Agent invocations
  - Event streams

Batch (hourly):
  - Aggregated metrics
  - Trend calculations
  - Report generation

Daily:
  - Historical analysis
  - Cohort calculations
  - Cost analysis
```

### Data Retention

```yaml
Hot Storage (30 days):
  - Raw events
  - Detailed logs
  - Full resolution

Warm Storage (1 year):
  - Aggregated hourly
  - Summarized daily
  - Key events only

Cold Storage (Forever):
  - Monthly summaries
  - Annual reports
  - Audit logs
```

## Access Control

### Role-Based Access

```yaml
Admin:
  - All dashboards
  - Raw data access
  - Export capabilities
  - Alert management

Manager:
  - Team dashboards
  - Aggregated data
  - Limited export
  - View alerts

User:
  - Personal dashboard
  - Own usage data
  - No export
  - No alerts
```

### Sharing

```yaml
Public Links:
  - Read-only access
  - Time-limited
  - Filtered views

Embedded:
  - iframe support
  - API integration
  - White-label option
```

## Alerting System

### Alert Types

```yaml
Threshold Alerts:
  - "Error rate > 5%"
  - "API latency > 2000ms"
  - "Daily usage < 80% of average"

Anomaly Alerts:
  - "Unusual traffic pattern"
  - "Unexpected drop in completions"
  - "Spike in agent failures"

Scheduled Alerts:
  - Daily digest
  - Weekly summary
  - Monthly report
```

### Delivery Channels

```yaml
Email:
  - Immediate alerts
  - Digest summaries
  - Report attachments

Slack:
  - Real-time notifications
  - Interactive buttons
  - Thread replies

Webhook:
  - Custom integrations
  - Event-driven
  - Payload customization
```

## Quick Start

### Accessing Dashboards

1. Navigate to `analytics.arcanea.io`
2. Authenticate with API key or OAuth
3. Select dashboard from sidebar
4. Apply filters as needed

### Creating Custom Dashboards

1. Click "New Dashboard"
2. Add widgets from library
3. Configure data sources
4. Set refresh intervals
5. Save and share

### Setting Up Alerts

1. Navigate to widget or metric
2. Click "Create Alert"
3. Define conditions
4. Choose delivery channel
5. Activate

## Files in This Directory

```
analytics/
├── README.md               # This file
├── executive-dashboard.md  # Leadership view
├── skills-dashboard.md     # Skills metrics
├── agents-dashboard.md     # Agent performance
├── training-dashboard.md   # Learning analytics
├── operations-dashboard.md # System health
└── custom-widgets.md       # Widget specifications
```
