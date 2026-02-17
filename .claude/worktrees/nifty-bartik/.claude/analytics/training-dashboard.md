# Training Dashboard

> **Learning analytics and educational outcomes**

## Purpose

The Training Dashboard provides insights into:
- Learning path adoption and progress
- Assessment performance
- Certification completion
- Learning effectiveness

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                  TRAINING DASHBOARD                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Total   │ │ Complet. │ │   Cert.  │ │  Learn   │  │
│  │ Enrolled │ │   Rate   │ │  Issued  │ │  Hours   │  │
│  │  1,245   │ │   34%    │ │    89    │ │  3,420   │  │
│  │  ▲ 18%   │ │  ▲ 2%    │ │  ▲ 15%   │ │  ▲ 22%   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Enrollment & Completion Funnel         │   │
│  │                                                  │   │
│  │   Enrolled    ███████████████████████ 1,245     │   │
│  │   Started     █████████████████░░░░░░   892     │   │
│  │   50% Done    ████████████░░░░░░░░░░░   567     │   │
│  │   Completed   █████████░░░░░░░░░░░░░░   423     │   │
│  │   Certified   ██████░░░░░░░░░░░░░░░░░    89     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────┐ ┌─────────────────────────┐   │
│  │  Path Performance   │ │  Assessment Scores      │   │
│  │                     │ │                         │   │
│  │  Foundation  ██ 55% │ │  Avg Score: 78.5%      │   │
│  │  Developer   █░ 26% │ │  Pass Rate: 82%        │   │
│  │  Teacher     █░ 32% │ │                         │   │
│  │  Visionary   █░ 28% │ │  📊 [Distribution]     │   │
│  │  Master      ░░ 15% │ │                         │   │
│  └─────────────────────┘ └─────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Module Progress Table               │   │
│  │  ┌────────────────┬────────┬────────┬────────┐ │   │
│  │  │ Module         │Enrolled│Complete│Avg Time│ │   │
│  │  ├────────────────┼────────┼────────┼────────┤ │   │
│  │  │ Ecosystem Ovr. │   567  │  89%   │  42m   │ │   │
│  │  │ Claude Basics  │   512  │  78%   │  55m   │ │   │
│  │  │ Skill System   │   423  │  65%   │  48m   │ │   │
│  │  │ MCP Fundament. │   356  │  58%   │  62m   │ │   │
│  │  │ Dev Onboarding │   245  │  45%   │  72m   │ │   │
│  │  └────────────────┴────────┴────────┴────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Drop-off Analysis                   │   │
│  │  [Heat map showing where learners stop]         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Widgets Specification

### 1. KPI Cards

#### Total Enrolled
```yaml
Widget: kpi_card
Metric: total_enrolled
Query: |
  SELECT COUNT(DISTINCT user_id)
  FROM enrollments
  WHERE created_at >= :period_start
Refresh: Hourly
Trend: Period-over-period
```

#### Completion Rate
```yaml
Widget: kpi_card
Metric: completion_rate
Query: |
  SELECT
    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 /
    COUNT(*)
  FROM enrollments
  WHERE created_at >= :period_start
Format: Percentage
Threshold:
  Green: > 40%
  Yellow: > 25%
  Red: < 25%
```

#### Certifications Issued
```yaml
Widget: kpi_card
Metric: certifications_issued
Query: |
  SELECT COUNT(*)
  FROM certifications
  WHERE issued_at >= :period_start
Trend: Period-over-period growth
```

#### Total Learning Hours
```yaml
Widget: kpi_card
Metric: total_learning_hours
Query: |
  SELECT SUM(time_spent_seconds) / 3600.0
  FROM progress_events
  WHERE timestamp >= :period_start
Format: Number with comma separators
```

### 2. Enrollment Funnel

```yaml
Widget: funnel_chart
Title: Enrollment to Certification Funnel
Stages:
  - Enrolled: Total users who enrolled
  - Started: Completed at least one section
  - 50% Done: Reached halfway point
  - Completed: Finished all modules
  - Certified: Passed final assessment
Query: |
  SELECT
    COUNT(*) as enrolled,
    COUNT(CASE WHEN progress > 0 THEN 1 END) as started,
    COUNT(CASE WHEN progress >= 50 THEN 1 END) as halfway,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
    COUNT(CASE WHEN certified = true THEN 1 END) as certified
  FROM enrollments
  WHERE created_at >= :period_start
Conversion Rates:
  - Show drop-off % between stages
  - Highlight problem areas in red
```

### 3. Path Performance

```yaml
Widget: horizontal_bar_chart
Title: Completion Rate by Path
Query: |
  SELECT
    path_name,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 /
    COUNT(*) as completion_rate
  FROM enrollments
  WHERE created_at >= :period_start
  GROUP BY path_id, path_name
Bars:
  - Foundation (55%)
  - Developer (26%)
  - Teacher (32%)
  - Visionary (28%)
  - Master (15%)
Color Scale: Green (high) → Red (low)
Benchmark Line: 40% target
```

### 4. Assessment Performance

```yaml
Widget: stat_card_with_histogram
Title: Assessment Performance
Stats:
  - Average Score: 78.5%
  - Pass Rate: 82%
  - Retake Rate: 12%
Histogram:
  - Score distribution
  - Buckets: 0-20, 20-40, 40-60, 60-80, 80-100
  - Pass threshold line at 80%
Query: |
  SELECT
    AVG(score) as avg_score,
    COUNT(CASE WHEN score >= 80 THEN 1 END) * 100.0 / COUNT(*) as pass_rate,
    COUNT(CASE WHEN attempt > 1 THEN 1 END) * 100.0 / COUNT(*) as retake_rate
  FROM assessments
  WHERE completed_at >= :period_start
```

### 5. Module Progress Table

```yaml
Widget: data_table
Title: Module Progress
Columns:
  - module_name: Module (sortable)
  - enrolled: Enrolled (sortable)
  - completion_rate: Completion % (sortable, bar)
  - avg_time: Avg Time (sortable)
  - avg_score: Avg Assessment Score
  - drop_off_rate: Drop-off Rate (color-coded)
Query: |
  SELECT
    m.name as module_name,
    COUNT(DISTINCT e.user_id) as enrolled,
    COUNT(CASE WHEN p.status = 'completed' THEN 1 END) * 100.0 /
    COUNT(*) as completion_rate,
    AVG(p.time_spent_seconds) / 60.0 as avg_time,
    AVG(a.score) as avg_score
  FROM modules m
  LEFT JOIN enrollments e ON m.path_id = e.path_id
  LEFT JOIN progress p ON m.id = p.module_id
  LEFT JOIN assessments a ON m.id = a.module_id
  WHERE e.created_at >= :period_start
  GROUP BY m.id, m.name
Features:
  - Click to drill into module
  - Export data
  - Column sorting
```

### 6. Drop-off Analysis Heat Map

```yaml
Widget: heat_map
Title: Drop-off Analysis
Axes:
  X: Module sequence (1, 2, 3...)
  Y: Learning paths
Value: Drop-off rate at that point
Color Scale: Green (low drop-off) → Red (high)
Annotations:
  - Highlight problem areas > 25%
  - Show exact percentages on hover
Query: |
  SELECT
    path_name,
    module_order,
    drop_off_rate
  FROM (
    SELECT
      path_id,
      module_id,
      module_order,
      (prev_enrolled - current_enrolled) * 100.0 / prev_enrolled as drop_off_rate
    FROM enrollment_progression
  )
```

## Learning Effectiveness Views

### Time to Competency

```yaml
Widget: line_chart
Title: Time to Certification by Path
Lines:
  - Foundation path
  - Developer path
  - Teacher path
  - Visionary path
Metric: Average days from enrollment to certification
Trend: Show improvement over time
```

### Learning Outcomes

```yaml
Widget: comparison_cards
Title: Learning Outcomes
Cards:
  1. Skill Application:
     - % applying skills within 7 days
     - Agent invocations post-certification

  2. Knowledge Retention:
     - Assessment score 30 days later
     - Module revisit rate

  3. Satisfaction:
     - NPS score
     - Recommendation rate
```

### Cohort Analysis

```yaml
Widget: cohort_table
Title: Cohort Completion Analysis
Rows: Enrollment month cohorts
Columns: Weeks since enrollment
Values: % still active at that week
Color: Retention gradient
Features:
  - Compare cohorts
  - Identify trends
```

## Drill-Down Views

### Path Detail

```yaml
Path: Developer Track
View: Detailed Analytics

Sections:
  1. Funnel Analysis:
     - Module-by-module progression
     - Drop-off points identified

  2. Time Analysis:
     - Time per module
     - Completion velocity

  3. Assessment Analysis:
     - Question performance
     - Common mistakes

  4. User Segments:
     - By prior experience
     - By learning pace
     - By engagement level
```

### Module Detail

```yaml
Module: Developer Onboarding
View: Module Analytics

Sections:
  1. Section Performance:
     - Time per section
     - Completion rates

  2. Exercise Analysis:
     - Completion rates
     - Success rates
     - Common issues

  3. Assessment Details:
     - Question-level analysis
     - Difficulty calibration
```

## Alerts

```yaml
Progress Alerts:
  - Completion rate drops > 10%
  - Module drop-off > 30%
  - Assessment pass rate < 70%

Engagement Alerts:
  - No new enrollments for 24h
  - Avg session length < 5 minutes
  - High retake rate > 25%

Quality Alerts:
  - Specific question fail rate > 50%
  - Module completion time > 2x expected
  - Negative feedback spike
```

## Filters

```yaml
Path Filters:
  - All Paths
  - Foundation
  - Developer / Teacher / Visionary
  - Master

Module Filters:
  - All Modules
  - Specific module

User Filters:
  - All Users
  - New (< 30 days)
  - Active learners
  - Certified users

Time Filters:
  - This week / month / quarter
  - Custom date range
  - Cohort-based
```
