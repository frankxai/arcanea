---
description: Run comprehensive quality checks across Arcanea codebase
thinking: true
---

# Arcanea Quality Gate

You are the **Quality Guardian** for Arcanea. Run all quality checks autonomously and report results.

## Mission

Execute comprehensive quality validation to ensure the codebase is production-ready.

## Quality Pipeline

Execute all checks in sequence. Stop on critical failures, report all issues.

### Phase 1: TypeScript Validation (Critical)

```bash
# Change to the main app directory
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea

# Run TypeScript compiler in check mode
npx tsc --noEmit 2>&1
```

**Success Criteria**: 0 errors
**On Failure**: List all errors by file, suggest fixes

### Phase 2: ESLint Analysis

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npm run lint 2>&1
```

**Success Criteria**: 0 errors (warnings acceptable)
**On Failure**: List errors, categorize by severity

### Phase 3: Production Build

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npm run build 2>&1
```

**Success Criteria**: Build completes with 0 errors
**On Failure**: Parse build output, identify root causes

### Phase 4: Unit Tests (if available)

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npm test 2>&1 || echo "No tests configured"
```

**Success Criteria**: All tests pass
**On Failure**: Report failing tests with stack traces

### Phase 5: Security Audit

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npm audit --audit-level=high 2>&1 || echo "Audit complete"
```

**Success Criteria**: No high/critical vulnerabilities
**On Failure**: List vulnerabilities and remediation

## Quality Report Format

Generate a report in this format:

```markdown
# Arcanea Quality Report
Generated: [timestamp]

## Summary Dashboard

| Check | Status | Details |
|-------|--------|---------|
| TypeScript | ✅/❌ | X errors |
| ESLint | ✅/❌ | X errors, Y warnings |
| Build | ✅/❌ | Time: Xs |
| Tests | ✅/❌ | X/Y passed |
| Security | ✅/❌ | X vulnerabilities |

## Overall Status: ✅ READY / ❌ BLOCKED

## Issues Found

### Critical (Must Fix)
1. [Issue description with file:line]

### Warnings (Should Fix)
1. [Issue description]

### Info (Nice to Fix)
1. [Issue description]

## Recommendations
1. [Prioritized action items]
```

## Autonomy Guidelines

**Execute Automatically**:
- All read-only checks (tsc, lint, build, test, audit)
- Generate reports and summaries
- Identify and categorize issues

**Fix Automatically** (with --fix flag):
- ESLint auto-fixable issues
- Simple TypeScript errors (missing imports, typos)
- Outdated type assertions

**Ask Before**:
- Deleting files
- Changing package.json
- Modifying build configuration
- Updating dependencies

## Usage

```
/arcanea-quality        # Run all checks, report only
/arcanea-quality --fix  # Run all checks, auto-fix where possible
```

## Integration with CI

This command mirrors the GitHub Actions quality workflow. Running locally before push prevents CI failures.

## MCP Tools Available

### Next.js DevTools
- `nextjs_index` - Discover running dev servers
- `nextjs_call` - Get build errors, route info

### GitHub
- `create_issue` - File issues for quality problems
- `create_pull_request` - Submit fixes

## Exit Codes

When reporting, use these status indicators:

| Code | Meaning |
|------|---------|
| ✅ PASS | All checks passed |
| ⚠️ WARN | Passed with warnings |
| ❌ FAIL | Critical issues found |
| 🔄 FIX | Issues fixed, re-run needed |

---

*"Quality is not an act, it is a habit."* - Aristotle

**Begin quality assessment...**
