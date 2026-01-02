# Agents Dashboard

> **Performance metrics for agent invocations and orchestration**

## Purpose

The Agents Dashboard provides visibility into:
- Agent invocation patterns
- Performance and response times
- Success and error rates
- Team utilization and coordination

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                   AGENTS DASHBOARD                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Total   │ │ Success  │ │   Avg    │ │  Active  │  │
│  │ Invocat. │ │   Rate   │ │ Latency  │ │  Agents  │  │
│  │   8.9K   │ │  97.2%   │ │ 2.34s    │ │    19    │  │
│  │  ▲ 22%   │ │  ▲ 0.5%  │ │  ▼ 0.2s  │ │  ─ 0     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Agent Invocations Over Time              │   │
│  │  📈 [Multi-line chart by team]                  │   │
│  │                                                  │   │
│  │  Legend: ─ Developer ─ Teacher ─ Visionary      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │   Team Utilization  │ │   Response Time Dist.   │   │
│  │                     │ │                         │   │
│  │  ██████████░ Dev 58%│ │  📊 [Histogram]         │   │
│  │  ████░░░░░░░ Tea 24%│ │                         │   │
│  │  ███░░░░░░░░ Vis 13%│ │  P50: 1.8s              │   │
│  │  █░░░░░░░░░░ Aut 5% │ │  P95: 4.2s              │   │
│  └─────────────────────┘ │  P99: 8.1s              │   │
│                          └─────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Agent Performance Table             │   │
│  │  ┌────────────────┬────────┬───────┬─────────┐ │   │
│  │  │ Agent          │Invocat.│Success│Avg Time │ │   │
│  │  ├────────────────┼────────┼───────┼─────────┤ │   │
│  │  │ Frontend       │ 2,341  │ 97.2% │  2.1s   │ │   │
│  │  │ Mentor         │ 1,567  │ 99.1% │  1.8s   │ │   │
│  │  │ Backend        │ 1,234  │ 96.8% │  2.4s   │ │   │
│  │  │ Architect      │   892  │ 98.3% │  3.2s   │ │   │
│  │  │ QA Engineer    │   756  │ 95.4% │  4.8s   │ │   │
│  │  └────────────────┴────────┴───────┴─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │   Error Breakdown   │ │   Orchestration Stats   │   │
│  │                     │ │                         │   │
│  │  Timeout: 45%       │ │  Multi-agent: 234       │   │
│  │  Context: 32%       │ │  Avg agents/workflow: 3 │   │
│  │  Invalid: 15%       │ │  Success rate: 94%      │   │
│  │  Other: 8%          │ │  Avg duration: 45s      │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Widgets Specification

### 1. KPI Cards

#### Total Invocations
```yaml
Widget: kpi_card
Metric: total_invocations
Query: |
  SELECT COUNT(*)
  FROM agent_invocations
  WHERE timestamp >= :period_start
Refresh: Every minute
Trend: Period-over-period
```

#### Success Rate
```yaml
Widget: kpi_card
Metric: success_rate
Query: |
  SELECT
    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 /
    COUNT(*)
  FROM agent_invocations
  WHERE timestamp >= :period_start
Refresh: Every minute
Threshold:
  Green: > 95%
  Yellow: > 90%
  Red: < 90%
```

#### Average Latency
```yaml
Widget: kpi_card
Metric: avg_latency
Query: |
  SELECT AVG(duration_ms) / 1000.0
  FROM agent_invocations
  WHERE timestamp >= :period_start
  AND status = 'completed'
Format: Seconds (1 decimal)
Trend: Lower is better (inverted)
```

#### Active Agents
```yaml
Widget: kpi_card
Metric: active_agents
Query: |
  SELECT COUNT(DISTINCT agent_id)
  FROM agent_invocations
  WHERE timestamp >= :period_start
Refresh: Hourly
```

### 2. Invocations Over Time

```yaml
Widget: multi_line_chart
Title: Agent Invocations by Team
Lines:
  - Developer Team (sum of all dev agents)
  - Teacher Team
  - Visionary Team
  - Author Team
Query: |
  SELECT
    DATE_TRUNC('hour', timestamp) as time,
    team,
    COUNT(*) as invocations
  FROM agent_invocations ai
  JOIN agents a ON ai.agent_id = a.id
  WHERE timestamp >= :period_start
  GROUP BY time, team
Time Range: Configurable
Granularity: Hourly / Daily
Features:
  - Hover shows all values
  - Click to filter by team
  - Toggle lines
```

### 3. Team Utilization

```yaml
Widget: horizontal_bar_chart
Title: Team Utilization
Query: |
  SELECT
    team,
    COUNT(*) as invocations,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
  FROM agent_invocations ai
  JOIN agents a ON ai.agent_id = a.id
  WHERE timestamp >= :period_start
  GROUP BY team
Colors:
  Developer: #3B82F6
  Teacher: #10B981
  Visionary: #8B5CF6
  Author: #F59E0B
```

### 4. Response Time Distribution

```yaml
Widget: histogram
Title: Response Time Distribution
Query: |
  SELECT
    FLOOR(duration_ms / 500) * 500 as bucket,
    COUNT(*) as count
  FROM agent_invocations
  WHERE timestamp >= :period_start
  AND status = 'completed'
  GROUP BY bucket
Buckets: 0-500ms, 500-1000ms, 1000-2000ms, etc.
Annotations:
  - P50 line
  - P95 line
  - P99 line
Stats Display:
  - P50 (median)
  - P95
  - P99
```

### 5. Agent Performance Table

```yaml
Widget: data_table
Title: Agent Performance
Columns:
  - agent_name: Agent (sortable)
  - invocations: Invocations (sortable)
  - success_rate: Success Rate (sortable, color-coded)
  - avg_duration: Avg Duration (sortable)
  - p95_duration: P95 Duration
  - trend: 7-day trend
Query: |
  SELECT
    a.name as agent_name,
    COUNT(*) as invocations,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*) as success_rate,
    AVG(CASE WHEN status = 'completed' THEN duration_ms END) as avg_duration,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) as p95_duration
  FROM agent_invocations ai
  JOIN agents a ON ai.agent_id = a.id
  WHERE timestamp >= :period_start
  GROUP BY a.id, a.name
  ORDER BY invocations DESC
Features:
  - Row click → agent detail view
  - Export to CSV
  - Column sorting
```

### 6. Error Breakdown

```yaml
Widget: donut_chart
Title: Error Type Breakdown
Query: |
  SELECT
    error_type,
    COUNT(*) as count
  FROM agent_invocations
  WHERE timestamp >= :period_start
  AND status = 'error'
  GROUP BY error_type
Segments:
  - Timeout
  - Context Length Exceeded
  - Invalid Request
  - Rate Limited
  - Internal Error
Center Value: Total errors
Click Action: Filter to error type
```

### 7. Orchestration Stats

```yaml
Widget: stat_card_group
Title: Orchestration Statistics
Metrics:
  - multi_agent_workflows: Count of orchestrated workflows
  - avg_agents_per_workflow: Average agents in workflow
  - orchestration_success_rate: % completed successfully
  - avg_workflow_duration: Average total duration
Query: |
  SELECT
    COUNT(*) as multi_agent_workflows,
    AVG(agent_count) as avg_agents_per_workflow,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*) as success_rate,
    AVG(duration_ms) as avg_duration
  FROM workflows
  WHERE timestamp >= :period_start
```

## Real-Time Views

### Live Invocations Stream

```yaml
Widget: live_stream
Title: Live Agent Activity
Display:
  - Real-time feed of invocations
  - Color-coded by team
  - Status indicators
  - Duration display
Refresh: Streaming (WebSocket)
Buffer: Last 50 events
```

### Active Sessions

```yaml
Widget: gauge
Title: Current Active Sessions
Query: |
  SELECT COUNT(*)
  FROM agent_sessions
  WHERE status = 'active'
Range: 0 to max_capacity
Thresholds:
  Normal: < 70%
  Warning: 70-90%
  Critical: > 90%
```

## Agent Detail View

When drilling into specific agent:

```yaml
Agent: arcanea-frontend
View: Detailed Performance

Sections:
  1. Performance Overview:
     - Invocations (chart over time)
     - Success rate trend
     - Latency percentiles

  2. Task Analysis:
     - Most common tasks
     - Task success rates
     - Average tokens per task

  3. Error Analysis:
     - Error breakdown
     - Common error patterns
     - Error timeline

  4. User Analysis:
     - Unique users
     - Heavy users
     - User satisfaction

  5. Comparison:
     - vs. other dev agents
     - vs. previous period
     - vs. team average
```

## Alerts

```yaml
Performance Alerts:
  - Success rate < 95% for 5 minutes
  - P95 latency > 5s for 10 minutes
  - Error spike > 3x normal rate

Capacity Alerts:
  - Active sessions > 80% capacity
  - Queue depth > 100
  - Agent unresponsive > 30s

Quality Alerts:
  - Specific agent error rate > 10%
  - Orchestration failure rate > 10%
  - Token usage spike > 200%
```

## Filters

```yaml
Agent Filters:
  Team: All / Developer / Teacher / Visionary / Author
  Agent: Specific agent selection
  Status: All / Completed / Error / Timeout

Time Filters:
  Period: Real-time / Today / Week / Month / Custom
  Comparison: Previous period / Same time last week

Request Filters:
  Type: Single / Orchestrated
  Streaming: All / Streamed / Non-streamed
```
