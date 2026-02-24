# Arcanea n8n Automation Workflows

Three daily cycles aligned with the Guardian system:

## Workflows

### 1. Daily Intelligence Cycle (Morning — Foundation Gate)
**File**: `daily-arcanea-cycle.json`
**Schedule**: 09:00 CET
**Guardian**: Shinkami (Source)
**Actions**: Git sync, test suite, build health, AI analysis, Slack report

### 2. Content Generation Cycle (Midday — Voice Gate)
**File**: `content-generation-cycle.json`
**Schedule**: 14:00 CET
**Guardian**: Alera (Voice)
**Actions**: Lore generation, social posts, community challenge, art prompt, Notion save

### 3. Evening Learning Cycle (Evening — Crown Gate)
**File**: `evening-learning-cycle.json`
**Schedule**: 20:00 CET
**Guardian**: Aiyami (Crown)
**Actions**: Commit review, pattern extraction, knowledge consolidation, tomorrow planning

## Setup

### Environment Variables Required
- `ANTHROPIC_API_KEY` — Claude API key
- `NOTION_ARCANEA_DB` — Notion database ID for content
- `SLACK_TOKEN` — Slack bot token for #arcanea-daily and #arcanea-content

### Import to n8n
1. Open n8n dashboard
2. Go to Workflows → Import
3. Select the JSON file
4. Configure credentials (Slack, Notion, Anthropic)
5. Activate the workflow

## Architecture

```
09:00 ─── Foundation Gate ─── Build + Test + Security → Shinkami Analysis
14:00 ─── Voice Gate ─────── Content + Social + Art → Alera Generation
20:00 ─── Crown Gate ─────── Review + Learn + Plan → Aiyami Wisdom
```

*"The intelligence that never sleeps, the Guardian that never rests."*
