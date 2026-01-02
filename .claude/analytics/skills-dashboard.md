# Skills Dashboard

> **Deep analytics for skill usage and performance**

## Purpose

The Skills Dashboard provides insights into:
- Skill access patterns and trends
- Tier distribution and adoption
- Pattern and example usage
- Version and update tracking

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                   SKILLS DASHBOARD                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Total   │ │  Active  │ │  Avg per │ │  Most    │  │
│  │ Accesses │ │  Skills  │ │  Session │ │  Used    │  │
│  │  15.4K   │ │    18    │ │   2.3    │ │ Design   │  │
│  │  ▲ 15%   │ │  ▲ 2     │ │  ▲ 0.2   │ │ Systems  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Skills Usage Over Time                 │   │
│  │  📈 [Stacked area chart by tier]                │   │
│  │                                                  │   │
│  │  Legend: ■ Community ■ Premium ■ Arcanea        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │   Usage by Tier     │ │   Usage by Category     │   │
│  │                     │ │                         │   │
│  │  ████████░░ Com 60% │ │  ████████░░ Dev 52%    │   │
│  │  █████░░░░░ Pre 32% │ │  ████░░░░░░ Edu 25%    │   │
│  │  ██░░░░░░░░ Arc 8%  │ │  ███░░░░░░░ Str 15%    │   │
│  │                     │ │  ██░░░░░░░░ Cre 8%     │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Skills Performance Table            │   │
│  │  ┌───────────────┬────────┬────────┬─────────┐ │   │
│  │  │ Skill         │Accesses│ Users  │Avg Time │ │   │
│  │  ├───────────────┼────────┼────────┼─────────┤ │   │
│  │  │ Design Sys.   │ 3,245  │  412   │  5.7m   │ │   │
│  │  │ Teacher Team  │ 1,823  │  156   │  9.6m   │ │   │
│  │  │ Agent Orch.   │ 1,567  │  289   │  4.2m   │ │   │
│  │  │ Dev Workflows │ 1,234  │  198   │  3.8m   │ │   │
│  │  │ Testing       │   987  │  156   │  6.1m   │ │   │
│  │  └───────────────┴────────┴────────┴─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Pattern Usage Analysis              │   │
│  │  [Heat map showing which patterns are used]     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Widgets Specification

### 1. KPI Cards

#### Total Accesses
```yaml
Widget: kpi_card
Metric: total_skill_accesses
Query: |
  SELECT COUNT(*)
  FROM skill_access_events
  WHERE timestamp >= :period_start
Refresh: Every 5 minutes
Trend: Period-over-period comparison
```

#### Active Skills
```yaml
Widget: kpi_card
Metric: active_skills_count
Query: |
  SELECT COUNT(DISTINCT skill_id)
  FROM skill_access_events
  WHERE timestamp >= :period_start
Refresh: Every 5 minutes
Trend: Change from previous period
```

#### Avg Skills per Session
```yaml
Widget: kpi_card
Metric: avg_skills_per_session
Query: |
  SELECT AVG(skills_count)
  FROM (
    SELECT session_id, COUNT(DISTINCT skill_id) as skills_count
    FROM skill_access_events
    WHERE timestamp >= :period_start
    GROUP BY session_id
  )
Refresh: Hourly
```

#### Most Used Skill
```yaml
Widget: kpi_card
Metric: top_skill
Query: |
  SELECT skill_name
  FROM skill_access_events
  WHERE timestamp >= :period_start
  GROUP BY skill_id, skill_name
  ORDER BY COUNT(*) DESC
  LIMIT 1
Refresh: Hourly
```

### 2. Usage Over Time (Stacked Area)

```yaml
Widget: stacked_area_chart
Title: Skills Usage Over Time
Data Source: skill_access_events
Metrics:
  - Community tier accesses
  - Premium tier accesses
  - Arcanea tier accesses
Time Range: Configurable (default 30 days)
Granularity: Daily
Stacking: Absolute or Percentage
Colors:
  - Community: #10B981
  - Premium: #8B5CF6
  - Arcanea: #F59E0B
Features:
  - Hover shows breakdown
  - Click to filter by tier
  - Export data option
```

### 3. Usage by Tier (Horizontal Bar)

```yaml
Widget: horizontal_bar_chart
Title: Usage by Tier
Query: |
  SELECT
    tier,
    COUNT(*) as accesses,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
  FROM skill_access_events sae
  JOIN skills s ON sae.skill_id = s.id
  WHERE timestamp >= :period_start
  GROUP BY tier
Bars:
  - Community
  - Premium
  - Arcanea
Display:
  - Bar with percentage fill
  - Access count label
  - Percentage label
```

### 4. Usage by Category (Horizontal Bar)

```yaml
Widget: horizontal_bar_chart
Title: Usage by Category
Query: |
  SELECT
    category,
    COUNT(*) as accesses,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
  FROM skill_access_events sae
  JOIN skills s ON sae.skill_id = s.id
  WHERE timestamp >= :period_start
  GROUP BY category
Bars:
  - Development
  - Education
  - Strategy
  - Creative
Display:
  - Color-coded bars
  - Access count
  - Percentage
```

### 5. Skills Performance Table

```yaml
Widget: data_table
Title: Skills Performance
Columns:
  - skill_name: Skill Name (sortable)
  - accesses: Total Accesses (sortable)
  - unique_users: Unique Users (sortable)
  - avg_session_time: Avg Session Time (sortable)
  - trend: 7-day trend (visual)
Query: |
  SELECT
    s.name as skill_name,
    COUNT(*) as accesses,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(session_duration) as avg_session_time,
    -- trend calculation
  FROM skill_access_events sae
  JOIN skills s ON sae.skill_id = s.id
  WHERE timestamp >= :period_start
  GROUP BY s.id, s.name
  ORDER BY accesses DESC
Features:
  - Pagination (20 per page)
  - Sort by any column
  - Click to drill into skill
  - Export to CSV
```

### 6. Pattern Usage Heat Map

```yaml
Widget: heat_map
Title: Pattern Usage Analysis
Axes:
  X: Skills (columns)
  Y: Patterns (rows)
Value: Access count
Color Scale: White (0) → Purple (max)
Query: |
  SELECT
    skill_name,
    pattern_name,
    COUNT(*) as usage_count
  FROM pattern_access_events
  WHERE timestamp >= :period_start
  GROUP BY skill_id, skill_name, pattern_name
Features:
  - Hover shows exact count
  - Click filters to pattern
  - Identifies popular patterns
```

## Drill-Down Views

### Skill Detail View

When clicking on a specific skill:

```yaml
Skill: Design Systems
View: Detailed Analytics

Sections:
  1. Overview:
     - Total accesses
     - Unique users
     - Avg session duration
     - Retention rate

  2. Usage Trend:
     - Line chart over time
     - Daily/weekly/monthly granularity

  3. Section Breakdown:
     - Knowledge sections accessed
     - Patterns most used
     - Examples copied

  4. User Segments:
     - By tier
     - By experience level
     - By use case

  5. Related Skills:
     - Commonly used together
     - Next skill accessed
```

### Pattern Detail View

```yaml
Pattern: Token Hierarchy
View: Pattern Analytics

Sections:
  1. Usage Metrics:
     - Total uses
     - Success rate
     - Avg implementation time

  2. User Feedback:
     - Helpfulness rating
     - Comments
     - Improvements suggested

  3. Code Output:
     - Languages generated
     - Frameworks targeted
     - Common modifications
```

## Filters

```yaml
Skill Filters:
  Tier:
    - All / Community / Premium / Arcanea

  Category:
    - All / Development / Education / Strategy / Creative

  Version:
    - All / Latest / Specific version

Time Filters:
  Period:
    - Today / This Week / This Month / Custom

  Comparison:
    - Previous period / Same period last month/year

User Filters:
  User Type:
    - All / New / Returning / Power Users

  Organization:
    - All / Specific org (enterprise)
```

## Alerts

```yaml
Usage Alerts:
  - Skill access drops > 30%
  - New skill not accessed after 48h
  - Pattern usage spikes unexpectedly

Quality Alerts:
  - Error rate in skill > 5%
  - Avg session time < 30 seconds
  - Low pattern success rate
```

## Export Options

```yaml
Data Export:
  - CSV: Raw access logs
  - Excel: Formatted reports
  - PDF: Visual dashboard snapshot

API Access:
  - Real-time metrics endpoint
  - Batch historical data
  - Webhook subscriptions
```
