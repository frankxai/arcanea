---
description: Diagnose and fix Arcanea build errors autonomously
thinking: true
---

# 🔧 Arcanea Build Fixer Activated

You are now in **Arcanea Build Diagnostic & Fix Mode**.

## Mission

Autonomously diagnose and fix all build errors in the Arcanea project to achieve a successful production build (0 errors).

## Current Context

- **Project**: Arcanea platform (Next.js 16 monorepo)
- **Working Directory**: `/mnt/c/Users/Frank/Arcanea`
- **Current Build Status**: ❌ FAILING with 21 errors
- **Goal**: ✅ BUILD SUCCESS (0 errors)
- **Deployment**: BLOCKED until build succeeds

## Workflow

### 1. Assess Current Build Status

**First**, run build and capture all errors:
```bash
cd /mnt/c/Users/Frank/Arcanea
pnpm run build 2>&1 | tee build-output.log
```

### 2. Categorize Errors

Group errors by type:
- **Missing Files** (modules not found)
- **TypeScript Errors** (type mismatches)
- **CSS/Tailwind Errors** (configuration issues)
- **Dependency Errors** (package issues)
- **Configuration Errors** (build config)

### 3. Known Error Categories & Fixes

#### Category A: Missing Services (5 files)
**Errors**:
```
Module not found: Can't resolve '@/services/activity-service'
Module not found: Can't resolve '@/services/like-service'
Module not found: Can't resolve '@/services/comment-service'
Module not found: Can't resolve '@/services/follow-service'
Module not found: Can't resolve '@/services/notification-service'
```

**Auto-Fix Strategy**:
1. Create `apps/web/services/` directory
2. Create each missing service file with stub implementation
3. Export required functions with proper TypeScript types

**Template**:
```typescript
// apps/web/services/[service-name]-service.ts
export async function [functionName](/* params */) {
  console.warn('[service-name]-service not yet implemented - returning mock data');
  return { success: true };
}
```

#### Category B: Missing AI Core Package
**Error**:
```
Module not found: Can't resolve '@arcanea/ai-core'
```

**Auto-Fix Strategy**:
1. Create `packages/ai-core/` directory
2. Initialize minimal package with package.json
3. Create src/index.ts with basic type exports
4. Add to workspace dependencies

#### Category C: Missing Chat Components (4 files)
**Errors**:
```
Module not found: Can't resolve '@/components/chat/chat-container'
Module not found: Can't resolve '@/components/chat/chat-input'
Module not found: Can't resolve '@/components/chat/context-sidebar'
Module not found: Can't resolve '@/components/chat/quick-actions'
```

**Auto-Fix Strategy**:
1. Create `apps/web/components/chat/` directory
2. Create stub React components
3. Export from each file

**Template**:
```typescript
// apps/web/components/chat/[component-name].tsx
export function [ComponentName]() {
  return (
    <div className="p-4 border rounded">
      <p>[ComponentName] - Implementation pending</p>
    </div>
  );
}
```

#### Category D: CSS/Tailwind Error
**Error**:
```
CssSyntaxError: The `border-border` class does not exist
```

**Auto-Fix Strategy**:
1. Open `apps/web/app/globals.css`
2. Find `@apply border-border`
3. Replace with valid Tailwind class:
   ```css
   @apply border-neutral-200 dark:border-neutral-800
   ```

#### Category E: Missing JSON Files
**Errors**:
```
Module not found: Can't resolve '../../../Arcanean Library/experience/book/arcanea-codex.json'
```

**Auto-Fix Strategy** (Choose one):
1. **Option A**: Create placeholder JSON files
2. **Option B**: Comment out imports in `apps/web/content/arcanea-codex.ts`

### 4. Execution Plan

**Execute fixes in this order:**

**Phase 1: Quick Wins (Fix 10-15 errors in 30 min)**
1. Fix CSS/Tailwind error (1 error) - 5 min
2. Comment out/fix JSON imports (3 errors) - 10 min
3. Create stub services (5 errors) - 15 min

**Phase 2: Structural Fixes (Fix remaining errors in 1-2 hours)**
4. Create AI core package (1-3 errors) - 30 min
5. Create chat component stubs (4 errors) - 30 min
6. Fix any remaining TypeScript errors - 30 min

**Phase 3: Verification (30 min)**
7. Run full build
8. Fix any new errors that appear
9. Verify 0 errors
10. Run type-check and lint

### 5. Autonomy Guidelines

You have permission to:
- ✅ Create stub/placeholder files to resolve "module not found" errors
- ✅ Fix obvious typos and invalid syntax
- ✅ Add missing TypeScript type exports
- ✅ Create minimal package structures
- ✅ Comment out broken imports (with clear TODOs)
- ✅ Fix CSS class names to valid Tailwind classes
- ✅ Run build commands to verify fixes

You should ask before:
- ❓ Deleting existing code (except obvious duplicates)
- ❓ Changing build configuration significantly
- ❓ Modifying package.json dependencies (except adding workspace packages)
- ❓ Altering database schemas or migrations

### 6. Progress Tracking

After each fix:
1. Run build to verify error count decreased
2. Report progress: "Errors: [before] → [after]"
3. Commit changes with descriptive message
4. Continue to next error category

**Example Progress Report**:
```
✅ Fixed CSS/Tailwind error
✅ Created 5 stub service files
📊 Build errors: 21 → 14
🎯 Next: Create AI core package
```

### 7. Success Criteria

Build is considered successful when:
- ✅ `pnpm run build` completes with 0 errors
- ✅ `pnpm run type-check` passes
- ✅ All workspace packages build successfully
- ✅ No console errors about missing modules

### 8. Post-Fix Validation

Once build succeeds:
```bash
# Verify build
pnpm run build
# ✅ Expected: Build completed successfully

# Verify types
pnpm run type-check
# ✅ Expected: No TypeScript errors

# Verify linting
pnpm run lint
# ⚠️  Warnings OK, errors should be fixed

# Test dev server
pnpm run dev
# ✅ Expected: Server starts on port 3001

# Check deployment readiness
vercel --prebuilt
# ✅ Expected: Deployment preview succeeds
```

## MCP Tools Available

### Next.js Devtools MCP
- `get_build_errors` - Get current build errors
- `list_routes` - See all API routes
- `get_diagnostics` - Build diagnostics

### GitHub MCP
- `createPR` - Create PR with fixes
- `createIssue` - Track remaining work

## Final Deliverable

When complete, provide:

1. **Error Count**: 21 → 0
2. **Files Created**: List of all stub/placeholder files
3. **Files Modified**: List of fixes applied
4. **Build Status**: ✅ SUCCESS
5. **Next Steps**: Recommended path to full implementation
6. **Technical Debt**: List TODOs for replacing stubs

## Let's Fix This Build!

**Starting autonomous build fix workflow...**

First action: Assess current build status and categorize errors.
