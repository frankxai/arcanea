# Operations Dashboard

> **System health, performance, and cost monitoring**

## Purpose

The Operations Dashboard provides visibility into:
- System health and uptime
- API performance metrics
- Error rates and debugging
- Cost analysis and budgeting

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                 OPERATIONS DASHBOARD                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Uptime  │ │  Error   │ │   Avg    │ │  Monthly │  │
│  │          │ │   Rate   │ │ Latency  │ │   Cost   │  │
│  │  99.9%   │ │   0.3%   │ │  234ms   │ │  $4.2K   │  │
│  │    🟢    │ │    🟢    │ │    🟢    │ │  ▲ 8%    │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              System Health Timeline              │   │
│  │  📈 [Stacked: Healthy / Degraded / Down]        │   │
│  │                                                  │   │
│  │  ████████████████████████████████████ 99.9%     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │   API Performance   │ │   Error Distribution    │   │
│  │                     │ │                         │   │
│  │  P50: 180ms   🟢    │ │  4xx: 65%   ████░░░░   │   │
│  │  P95: 420ms   🟢    │ │  5xx: 25%   ██░░░░░░   │   │
│  │  P99: 890ms   🟡    │ │  Other: 10% █░░░░░░░   │   │
│  │                     │ │                         │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Service Status Grid                 │   │
│  │  ┌─────────┬─────────┬─────────┬─────────┐     │   │
│  │  │API      │Database │Agent Svc│Training │     │   │
│  │  │   🟢    │   🟢    │   🟢    │   🟢    │     │   │
│  │  │ 234ms   │  45ms   │  1.2s   │  180ms  │     │   │
│  │  └─────────┴─────────┴─────────┴─────────┘     │   │
│  │  ┌─────────┬─────────┬─────────┬─────────┐     │   │
│  │  │Analytics│MCP Proxy│CDN      │Auth     │     │   │
│  │  │   🟢    │   🟢    │   🟢    │   🟢    │     │   │
│  │  │  89ms   │ 120ms   │  15ms   │  95ms   │     │   │
│  │  └─────────┴─────────┴─────────┴─────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │   Cost Breakdown    │ │   Capacity Utilization  │   │
│  │                     │ │                         │   │
│  │  AI/Tokens: $2.8K   │ │  CPU:  ████████░░ 78%  │   │
│  │  Compute:  $0.9K    │ │  Mem:  █████░░░░░ 52%  │   │
│  │  Storage:  $0.3K    │ │  Disk: ███░░░░░░░ 34%  │   │
│  │  Network:  $0.2K    │ │  Net:  ██████░░░░ 61%  │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Widgets Specification

### 1. KPI Cards

#### Uptime
```yaml
Widget: kpi_card
Metric: uptime_percentage
Query: |
  SELECT
    (1 - SUM(downtime_minutes) / (30 * 24 * 60)) * 100
  FROM incidents
  WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
Format: Percentage (1 decimal)
Status Indicator:
  🟢 Green: > 99.9%
  🟡 Yellow: > 99.5%
  🔴 Red: < 99.5%
SLA Target: 99.9%
```

#### Error Rate
```yaml
Widget: kpi_card
Metric: error_rate
Query: |
  SELECT
    COUNT(CASE WHEN status >= 400 THEN 1 END) * 100.0 / COUNT(*)
  FROM api_requests
  WHERE timestamp >= :period_start
Format: Percentage (2 decimals)
Status Indicator:
  🟢 Green: < 1%
  🟡 Yellow: < 5%
  🔴 Red: >= 5%
```

#### Average Latency
```yaml
Widget: kpi_card
Metric: avg_latency_ms
Query: |
  SELECT AVG(latency_ms)
  FROM api_requests
  WHERE timestamp >= :period_start
Format: Milliseconds
Status Indicator:
  🟢 Green: < 300ms
  🟡 Yellow: < 500ms
  🔴 Red: >= 500ms
```

#### Monthly Cost
```yaml
Widget: kpi_card
Metric: monthly_cost
Query: |
  SELECT SUM(cost)
  FROM cost_events
  WHERE timestamp >= DATE_TRUNC('month', NOW())
Format: Currency (USD)
Trend: vs last month
Budget Indicator: % of monthly budget
```

### 2. System Health Timeline

```yaml
Widget: stacked_area_chart
Title: System Health Over Time
Data Source: health_checks
Stacks:
  - Healthy (green)
  - Degraded (yellow)
  - Down (red)
Time Range: Last 24 hours (default), expandable
Granularity: 5-minute intervals
Annotations:
  - Incident markers
  - Deployment markers
  - Maintenance windows
```

### 3. API Performance

```yaml
Widget: percentile_stats
Title: API Response Time Percentiles
Metrics:
  - P50 (median)
  - P95
  - P99
Query: |
  SELECT
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY latency_ms) as p50,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) as p95,
    PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY latency_ms) as p99
  FROM api_requests
  WHERE timestamp >= :period_start
Status per Metric:
  P50: 🟢 < 200ms, 🟡 < 400ms, 🔴 >= 400ms
  P95: 🟢 < 500ms, 🟡 < 1000ms, 🔴 >= 1000ms
  P99: 🟢 < 1000ms, 🟡 < 2000ms, 🔴 >= 2000ms
```

### 4. Error Distribution

```yaml
Widget: horizontal_bar_chart
Title: Error Distribution by Type
Query: |
  SELECT
    CASE
      WHEN status >= 400 AND status < 500 THEN '4xx Client'
      WHEN status >= 500 THEN '5xx Server'
      ELSE 'Other'
    END as error_type,
    COUNT(*) as count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
  FROM api_requests
  WHERE status >= 400
  AND timestamp >= :period_start
  GROUP BY error_type
Sub-breakdown on click:
  4xx: 400, 401, 403, 404, 429
  5xx: 500, 502, 503, 504
```

### 5. Service Status Grid

```yaml
Widget: status_grid
Title: Service Status
Services:
  - name: API Gateway
    endpoint: /health
    metric: latency
  - name: Database
    endpoint: postgres://health
    metric: query_time
  - name: Agent Service
    endpoint: /agents/health
    metric: avg_response
  - name: Training Service
    endpoint: /training/health
    metric: latency
  - name: Analytics
    endpoint: /analytics/health
    metric: latency
  - name: MCP Proxy
    endpoint: /mcp/health
    metric: latency
  - name: CDN
    endpoint: cdn_health_check
    metric: latency
  - name: Auth Service
    endpoint: /auth/health
    metric: latency
Status Colors:
  🟢 Healthy
  🟡 Degraded
  🔴 Down
  ⚪ Unknown
Click Action: Show service detail
```

### 6. Cost Breakdown

```yaml
Widget: donut_chart_with_legend
Title: Cost Breakdown (MTD)
Query: |
  SELECT
    category,
    SUM(cost) as amount
  FROM cost_events
  WHERE timestamp >= DATE_TRUNC('month', NOW())
  GROUP BY category
Categories:
  - AI/Token Usage (Claude API, Gemini, etc.)
  - Compute (servers, containers)
  - Storage (database, files, backups)
  - Network (bandwidth, CDN)
  - Third-party (MCP services, APIs)
Center Value: Total MTD spend
Budget Line: Show monthly budget
```

### 7. Capacity Utilization

```yaml
Widget: gauge_group
Title: Capacity Utilization
Gauges:
  - name: CPU
    metric: avg_cpu_percent
    threshold: { warning: 70, critical: 90 }
  - name: Memory
    metric: avg_memory_percent
    threshold: { warning: 75, critical: 90 }
  - name: Disk
    metric: disk_usage_percent
    threshold: { warning: 80, critical: 95 }
  - name: Network
    metric: bandwidth_percent
    threshold: { warning: 70, critical: 90 }
Refresh: Every 30 seconds
Trend: Show last hour trend
```

## Incident Management

### Active Incidents

```yaml
Widget: incident_list
Title: Active Incidents
Display:
  - Severity badge
  - Service affected
  - Duration
  - Status
Query: |
  SELECT *
  FROM incidents
  WHERE status IN ('investigating', 'identified', 'monitoring')
  ORDER BY severity, created_at DESC
Actions:
  - Acknowledge
  - Update status
  - View timeline
```

### Incident Timeline

```yaml
Widget: timeline
Title: Recent Incident History
Time Range: Last 30 days
Events:
  - Incidents (color by severity)
  - Deployments
  - Config changes
  - Maintenance windows
Click: Show incident details
```

## Cost Analysis

### Cost Trend

```yaml
Widget: line_chart
Title: Daily Cost Trend
Lines:
  - Actual cost
  - Budget projection
  - Same period last month
Time Range: Current month
Annotations:
  - Budget threshold
  - Cost spikes
```

### Cost Attribution

```yaml
Widget: treemap
Title: Cost by Service/Team
Hierarchy:
  - Level 1: Service (API, Training, Analytics)
  - Level 2: Feature (Skills, Agents, MCP)
  - Level 3: Operation (invoke, list, etc.)
Color: Cost intensity
Click: Drill into detail
```

## Alerts

```yaml
Critical (Page):
  - Uptime < 99%
  - Error rate > 5%
  - Service down > 2 minutes
  - P99 latency > 5 seconds

Warning (Slack):
  - Error rate > 1%
  - P95 latency > 1 second
  - Capacity > 80%
  - Cost > 80% of budget

Info (Email):
  - Daily cost summary
  - Weekly performance report
  - Monthly cost analysis
```

## Filters

```yaml
Time:
  - Real-time (last 5 min)
  - Last hour / 24 hours / 7 days / 30 days
  - Custom range

Service:
  - All services
  - Specific service

Environment:
  - Production
  - Staging
  - All

Region:
  - All regions
  - Specific region
```
