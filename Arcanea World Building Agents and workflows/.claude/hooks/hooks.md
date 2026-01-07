# Arcanea World Building Hooks

> Automated triggers that fire based on context and actions

## Hook System Overview

Hooks are automatic behaviors that trigger when certain conditions are met. They ensure consistency, quality, and proper workflow without manual invocation.

---

## Pre-Write Hooks

### `pre-write:canon-check`
**Trigger**: Before writing any `.arc` file with `status: canon`
**Action**: Automatically invoke consistency validation

```yaml
hook: pre-write:canon-check
trigger:
  file_pattern: "**/*.arc"
  content_match: "status: canon"
action:
  - invoke_skill: arcanea-consistency-check
  - block_if: validation_failed
  - message: "Cannot write canon status without passing validation"
```

### `pre-write:foundation-lock`
**Trigger**: Before modifying any foundation file
**Action**: Require explicit confirmation and backup

```yaml
hook: pre-write:foundation-lock
trigger:
  file_pattern: "foundations/*.md"
action:
  - create_backup: true
  - require_confirmation: "Modifying world foundation. This affects all canon. Continue?"
  - log_change: true
```

---

## Post-Write Hooks

### `post-write:relationship-sync`
**Trigger**: After writing any entity with `related_entities`
**Action**: Check and prompt for reciprocal relationships

```yaml
hook: post-write:relationship-sync
trigger:
  file_pattern: "**/*.arc"
  content_match: "related_entities:"
action:
  - parse_relationships: true
  - for_each_relationship:
      - check_reciprocal_exists
      - if_missing:
          prompt: "Entity [target] doesn't have reciprocal relationship. Add it?"
          auto_fix: optional
```

### `post-write:timeline-update`
**Trigger**: After writing entity with dates/events
**Action**: Prompt to update master timeline

```yaml
hook: post-write:timeline-update
trigger:
  file_pattern: "**/*.arc"
  content_match: "(year|born|died|founded|established):"
action:
  - extract_dates: true
  - compare_with: foundations/history-timeline.md
  - if_new_events:
      prompt: "New historical events detected. Update master timeline?"
      invoke_agent: timeline-historian
```

### `post-write:cross-reference-index`
**Trigger**: After any canon entity is written
**Action**: Update cross-reference index

```yaml
hook: post-write:cross-reference-index
trigger:
  file_pattern: "**/*.arc"
  content_match: "status: canon"
action:
  - update_index: _integration/entity-index.md
  - log: "Added [entity] to cross-reference index"
```

---

## On-Read Hooks

### `on-read:load-context`
**Trigger**: When reading any world file
**Action**: Load relevant foundation context

```yaml
hook: on-read:load-context
trigger:
  file_pattern: 
    - "characters/**/*.arc"
    - "geography/**/*.arc"
    - "cultures/**/*.arc"
action:
  - lazy_load:
      - foundations/history-timeline.md (if dates referenced)
      - foundations/magic-system.md (if magic referenced)
      - related entities (1 level deep)
```

### `on-read:draft-warning`
**Trigger**: When reading draft content
**Action**: Display warning about non-canon status

```yaml
hook: on-read:draft-warning
trigger:
  file_pattern: "**/*.arc"
  content_match: "status: draft"
action:
  - display_warning: "This content is DRAFT - not yet validated as canon"
```

---

## Validation Hooks

### `validate:before-export`
**Trigger**: Before any export/publish operation
**Action**: Full world consistency check

```yaml
hook: validate:before-export
trigger:
  command: "export|publish|share"
action:
  - invoke_agent: consistency-validator
  - invoke_agent: lore-master
  - require: all_checks_pass
  - block_if: critical_issues > 0
```

### `validate:weekly-audit`
**Trigger**: Scheduled (weekly or on-demand)
**Action**: Comprehensive world audit

```yaml
hook: validate:weekly-audit
trigger:
  schedule: "weekly"
  manual: "/audit-world"
action:
  - full_consistency_scan: true
  - generate_report: _integration/audit-report.md
  - notify_issues: true
```

---

## Creative Flow Hooks

### `creative:brainstorm-mode`
**Trigger**: User indicates brainstorming
**Action**: Relax validation, enable free creation

```yaml
hook: creative:brainstorm-mode
trigger:
  phrases:
    - "brainstorm"
    - "just exploring"
    - "draft ideas"
    - "what if"
action:
  - set_mode: creative
  - disable_hooks:
      - pre-write:canon-check
      - post-write:relationship-sync
  - auto_status: draft
  - message: "Creative mode enabled. Validation relaxed. All content marked as draft."
```

### `creative:canonize-session`
**Trigger**: User wants to finalize brainstorm content
**Action**: Run validation on all session drafts

```yaml
hook: creative:canonize-session
trigger:
  phrases:
    - "canonize this"
    - "make it canon"
    - "finalize session"
action:
  - collect_session_drafts: true
  - invoke_skill: arcanea-consistency-check
  - for_each_draft:
      - validate
      - if_pass: prompt_canonize
      - if_fail: show_issues
```

---

## Agent Coordination Hooks

### `agent:pre-delegation`
**Trigger**: Before delegating to any agent
**Action**: Load relevant context

```yaml
hook: agent:pre-delegation
trigger:
  action: task_delegation
action:
  - load_skill: arcanea-canon-knowledge
  - attach_context:
      - relevant foundations
      - related entities (2 levels)
      - recent session history
```

### `agent:post-delegation`
**Trigger**: After agent returns results
**Action**: Validate and integrate

```yaml
hook: agent:post-delegation
trigger:
  action: task_completion
action:
  - validate_output: basic_structure
  - check_conflicts: against_existing_canon
  - if_conflicts:
      escalate_to: lore-master
```

---

## Error Recovery Hooks

### `error:contradiction-detected`
**Trigger**: When consistency check finds contradiction
**Action**: Structured resolution workflow

```yaml
hook: error:contradiction-detected
trigger:
  event: consistency_failure
  type: contradiction
action:
  - pause_writes: true
  - display:
      - what_conflicts
      - where_conflicts
      - priority_hierarchy
  - options:
      - "Revise new content"
      - "Retcon existing content (requires Lore Master)"
      - "Create in-world explanation"
      - "Discard new content"
```

### `error:orphan-reference`
**Trigger**: When entity references non-existent target
**Action**: Offer to create or fix

```yaml
hook: error:orphan-reference
trigger:
  event: validation_failure
  type: missing_reference
action:
  - identify: target_entity
  - options:
      - "Create [target] now"
      - "Remove reference"
      - "Mark as 'future content'"
```

---

## Hook Configuration

### Enabling/Disabling Hooks

```yaml
# In claude.md or session config
hooks:
  enabled:
    - pre-write:canon-check
    - post-write:relationship-sync
    - validate:before-export
  disabled:
    - validate:weekly-audit  # Manual only
  
  # Mode-based overrides
  creative_mode:
    disable:
      - pre-write:canon-check
      - post-write:relationship-sync
```

### Hook Priority

When multiple hooks trigger:
1. **Error hooks** - Highest (stop bad things)
2. **Validation hooks** - High (ensure quality)
3. **Sync hooks** - Medium (maintain consistency)
4. **Creative hooks** - Low (convenience features)

---

## Integration with Agents

Hooks automatically inform agents:
- **Lore Master**: Receives all validation hook results
- **The Weaver**: Can override hooks when orchestrating
- **All Agents**: Respect hook-imposed constraints

## Future Hooks (Planned)

- `mcp:image-generation` - Auto-generate images for locations
- `mcp:music-generation` - Create ambient music for realms
- `export:format-conversion` - Convert to various output formats
