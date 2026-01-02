# Executive Dashboard

> **High-level metrics for leadership decision-making**

## Purpose

The Executive Dashboard provides a single-pane view of:
- Business health and growth
- Key performance indicators
- Revenue and adoption metrics
- Strategic insights

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                  EXECUTIVE DASHBOARD                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   MRR    │ │   DAU    │ │  Compl.  │ │  Health  │  │
│  │  $45.2K  │ │   892    │ │   34%    │ │   98%    │  │
│  │  ▲ 12%   │ │  ▲ 8%    │ │  ▲ 2%    │ │  ▼ 1%    │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Revenue Trend (12 months)           │   │
│  │     📈 [Line chart showing MRR growth]          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │  Tier Distribution  │ │    Top Skills           │   │
│  │  🥧 [Pie chart]     │ │    1. Design Systems    │   │
│  │                     │ │    2. Teacher Team      │   │
│  │  Community: 60%     │ │    3. Agent Orch.       │   │
│  │  Pro: 25%           │ │    4. Dev Workflows     │   │
│  │  Team: 12%          │ │    5. Testing           │   │
│  │  Enterprise: 3%     │ │                         │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Key Metrics Summary                 │   │
│  │  ┌─────────┬─────────┬─────────┬─────────┐     │   │
│  │  │  This   │  Last   │  This   │  Last   │     │   │
│  │  │  Week   │  Week   │  Month  │  Month  │     │   │
│  │  ├─────────┼─────────┼─────────┼─────────┤     │   │
│  │  │ New: 45 │ New: 38 │ New: 180│ New: 156│     │   │
│  │  │ Act: 892│ Act: 845│ Act:2.3K│ Act:2.1K│     │   │
│  │  │ Churn:2%│ Churn:3%│ Churn:2%│ Churn:3%│     │   │
│  │  └─────────┴─────────┴─────────┴─────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Widgets Specification

### 1. KPI Cards (Top Row)

#### Monthly Recurring Revenue (MRR)
```yaml
Widget: kpi_card
Metric: mrr
Data Source: billing.subscriptions
Calculation: SUM(subscription_amount) WHERE status = 'active'
Refresh: Hourly
Format: Currency (USD)
Trend: Month-over-month change
Drill Down: Revenue breakdown by tier
```

#### Daily Active Users (DAU)
```yaml
Widget: kpi_card
Metric: dau
Data Source: analytics.sessions
Calculation: COUNT(DISTINCT user_id) WHERE date = today
Refresh: Every 5 minutes
Format: Number with K suffix
Trend: Day-over-day change
Drill Down: User activity details
```

#### Completion Rate
```yaml
Widget: kpi_card
Metric: training_completion_rate
Data Source: training.enrollments
Calculation: completed_count / enrolled_count * 100
Refresh: Hourly
Format: Percentage
Trend: Week-over-week change
Drill Down: Completion by path
```

#### System Health Score
```yaml
Widget: kpi_card
Metric: health_score
Data Source: operations.health
Calculation: Composite of uptime, error rate, latency
Components:
  - Uptime (40%): 100 - downtime_minutes/1440 * 100
  - Error Rate (30%): 100 - error_rate * 10
  - Latency (30%): 100 - (avg_latency/target_latency - 1) * 50
Refresh: Real-time
Format: Percentage
Threshold: Green > 95%, Yellow > 90%, Red < 90%
```

### 2. Revenue Trend Chart

```yaml
Widget: line_chart
Title: Revenue Trend (12 months)
Data Source: billing.monthly_revenue
Metrics:
  - MRR (primary)
  - ARR (secondary)
  - New Revenue (stacked)
  - Churned Revenue (stacked negative)
Time Range: Last 12 months
Granularity: Monthly
Features:
  - Hover tooltips with exact values
  - Click to see breakdown
  - Forecast line (next 3 months)
Annotations:
  - Product launches
  - Major feature releases
  - Pricing changes
```

### 3. Tier Distribution

```yaml
Widget: donut_chart
Title: Customer Tier Distribution
Data Source: billing.subscriptions
Segments:
  - Community (Free): COUNT WHERE tier = 'community'
  - Pro: COUNT WHERE tier = 'pro'
  - Team: COUNT WHERE tier = 'team'
  - Enterprise: COUNT WHERE tier = 'enterprise'
Colors:
  - Community: #6B7280 (gray)
  - Pro: #8B5CF6 (purple)
  - Team: #3B82F6 (blue)
  - Enterprise: #10B981 (green)
Center Value: Total customers
Click Action: Filter dashboard by tier
```

### 4. Top Skills Leaderboard

```yaml
Widget: leaderboard
Title: Top Skills This Month
Data Source: analytics.skills_usage
Metrics:
  - Skill Name
  - Access Count
  - Unique Users
  - Trend (vs last month)
Ranking: By access_count DESC
Limit: 5 (expandable to 20)
Features:
  - Rank badges (1st, 2nd, 3rd)
  - Trend arrows
  - Click to see skill details
```

### 5. Key Metrics Summary Table

```yaml
Widget: comparison_table
Title: Key Metrics Summary
Data Source: analytics.aggregated_metrics
Columns:
  - This Week
  - Last Week
  - This Month
  - Last Month
Rows:
  - New Users
  - Active Users
  - Churn Rate
  - Agent Invocations
  - Skills Accessed
Formatting:
  - Positive change: Green ▲
  - Negative change: Red ▼
  - No change: Gray ─
```

## Filters

```yaml
Global Filters:
  Date Range:
    - Preset: Today, This Week, This Month, This Quarter, This Year
    - Custom: Date picker
    Default: This Month

  Tier:
    - All Tiers
    - Community
    - Pro
    - Team
    - Enterprise
    Default: All Tiers

  Region (if applicable):
    - All Regions
    - North America
    - Europe
    - Asia Pacific
    Default: All Regions
```

## Alerts Configuration

```yaml
Critical Alerts:
  - MRR drops > 10% month-over-month
  - Health score < 90%
  - Churn rate > 5%
  - DAU drops > 20% day-over-day

Warning Alerts:
  - MRR growth < 5%
  - Completion rate < 25%
  - New signups < weekly average

Delivery:
  - Slack: #executive-alerts
  - Email: leadership@arcanea.io
  - SMS: On-call for critical
```

## Scheduled Reports

```yaml
Daily Digest:
  Time: 8:00 AM local
  Recipients: Leadership team
  Contents:
    - Yesterday's KPIs
    - Notable changes
    - Active alerts

Weekly Summary:
  Time: Monday 9:00 AM
  Recipients: All stakeholders
  Contents:
    - Week-over-week comparison
    - Top performing skills
    - Growth metrics
    - Churn analysis

Monthly Report:
  Time: 1st of month, 10:00 AM
  Recipients: Board, investors
  Contents:
    - Full financial summary
    - User growth analysis
    - Product metrics
    - Market comparison
    Format: PDF attachment
```

## Access Control

```yaml
Viewers:
  - CEO, COO, CFO
  - VP/Director level
  - Board members (read-only)

Editors:
  - Analytics team
  - Operations team

Sharing:
  - Can share to stakeholders
  - Time-limited public links
  - Embedded views allowed
```
