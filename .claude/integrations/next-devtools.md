# Next DevTools Integration

> **Next.js runtime debugging and development insights**

## Purpose

Next DevTools integration enables Arcanea agents to:
- Access runtime errors and logs
- Debug server and client issues
- Monitor page performance
- Track route information
- Analyze build errors

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-next-devtools"]
    }
  }
}
```

### Project Integration
```typescript
// next.config.js
module.exports = {
  // Enable dev tools in development
  devIndicators: {
    buildActivity: true,
  },
}
```

## Tools Available

### Error Tracking
```yaml
get_errors:
  Description: Get current errors
  Parameters:
    - type: runtime/build/all
    - limit: Number of errors

get_error_details:
  Description: Get detailed error info
  Parameters:
    - errorId: Error identifier

clear_errors:
  Description: Clear error cache
  Parameters: none
```

### Logging
```yaml
get_logs:
  Description: Get development logs
  Parameters:
    - level: info/warn/error/all
    - limit: Number of logs

get_console_output:
  Description: Get console messages
  Parameters:
    - type: log/warn/error/all
```

### Page Metadata
```yaml
get_routes:
  Description: List all routes
  Parameters: none

get_route_info:
  Description: Get route details
  Parameters:
    - path: Route path

get_page_metadata:
  Description: Get page meta info
  Parameters:
    - path: Page path
```

### Performance
```yaml
get_build_info:
  Description: Get build statistics
  Parameters: none

get_performance_metrics:
  Description: Get performance data
  Parameters:
    - path: Page path (optional)
```

## Usage Patterns

### Error Investigation

**DevOps Agent Workflow:**
```yaml
Agent: Arcanea DevOps

Task: Investigate build failure

1. Get build errors:
   get_errors(type: "build")

   → Returns:
   [
     {
       id: "err-001",
       type: "TypeScript",
       message: "Property 'luminor' does not exist",
       file: "components/LuminorCard.tsx",
       line: 42
     }
   ]

2. Get error details:
   get_error_details(errorId: "err-001")

   → Returns:
   {
     fullMessage: "...",
     stackTrace: "...",
     suggestions: ["Check prop types", "Import Luminor type"]
   }

3. Fix and verify:
   [Make code changes]
   clear_errors()
   [Rebuild and check]
```

### Runtime Debugging

**Debug Runtime Error:**
```yaml
Agent: Arcanea Frontend

Task: Debug client-side error

1. Get runtime errors:
   get_errors(type: "runtime")

   → Returns:
   [
     {
       id: "runtime-001",
       message: "Cannot read property 'name' of undefined",
       component: "LuminorProfile",
       url: "/academy/luminors/melodia"
     }
   ]

2. Get console context:
   get_console_output(type: "all")

   → Returns recent console output around error

3. Get route info:
   get_route_info(path: "/academy/luminors/[slug]")

   → Returns route config and params

4. Identify issue:
   "Luminor data not loaded before render"

5. Fix:
   Add loading state / null check
```

### Performance Analysis

**Analyze Page Performance:**
```yaml
Agent: Arcanea DevOps

Task: Optimize slow page

1. Get performance metrics:
   get_performance_metrics(path: "/dashboard")

   → Returns:
   {
     ttfb: 234,  // Time to first byte (ms)
     fcp: 1200,  // First contentful paint (ms)
     lcp: 2800,  // Largest contentful paint (ms)
     bundleSize: 245000,  // Bytes
     serverTime: 180  // Server processing (ms)
   }

2. Get build info:
   get_build_info()

   → Returns:
   {
     pages: {
       "/dashboard": {
         size: 85000,
         firstLoad: 245000,
         serverComponents: true
       }
     }
   }

3. Identify bottleneck:
   "Large bundle size, slow LCP"

4. Recommendations:
   - Code split dashboard widgets
   - Lazy load below-fold content
   - Optimize images
```

## Agent Integration

### DevOps Agent
```yaml
Primary Use:
  - Build error resolution
  - Performance monitoring
  - Deployment validation

Workflows:
  - Pre-deploy checks
  - Error investigation
  - Performance audits
```

### Frontend Agent
```yaml
Primary Use:
  - Runtime debugging
  - Component error tracking
  - Route validation

Workflows:
  - Debug client errors
  - Verify routing
  - Check metadata
```

### Architect Agent
```yaml
Primary Use:
  - Architecture validation
  - Performance oversight
  - Route structure review

Workflows:
  - Verify route architecture
  - Monitor performance trends
  - Assess build health
```

## Session Protocol

### Start of Session
```yaml
Agent: Any Developer Agent

# Always initialize at session start
init()

→ Establishes connection to Next.js dev server
→ Enables error tracking
→ Starts performance monitoring
```

### During Development
```yaml
Periodic checks:
  - get_errors(type: "all")
  - get_logs(level: "error")
  - get_performance_metrics()

On issue reported:
  - get_error_details()
  - get_console_output()
  - get_route_info()
```

## Examples

### Resolve TypeScript Error
```
Agent: Arcanea DevOps

Task: Fix build error

1. Check errors:
   get_errors(type: "build")

   → {
       type: "TypeScript",
       message: "Type 'string' is not assignable to type 'Luminor'",
       file: "app/academy/page.tsx",
       line: 15,
       column: 5
     }

2. Get file context:
   [Read file around line 15]

3. Identify issue:
   Passing luminor ID instead of Luminor object

4. Fix:
   ```typescript
   // Before
   <LuminorCard luminor={luminorId} />

   // After
   <LuminorCard luminor={luminors.find(l => l.id === luminorId)} />
   ```

5. Verify:
   clear_errors()
   get_errors(type: "build")
   → [] (no errors)
```

### Debug Hydration Mismatch
```
Agent: Arcanea Frontend

Task: Fix hydration error

1. Get runtime errors:
   get_errors(type: "runtime")

   → {
       type: "Hydration",
       message: "Text content does not match server-rendered HTML",
       component: "TimeDisplay",
       serverText: "12:00:00",
       clientText: "12:00:05"
     }

2. Identify issue:
   Date/time rendered differently on server vs client

3. Fix:
   ```typescript
   // Before
   <span>{new Date().toLocaleTimeString()}</span>

   // After
   const [time, setTime] = useState<string>()
   useEffect(() => {
     setTime(new Date().toLocaleTimeString())
   }, [])
   <span>{time ?? 'Loading...'}</span>
   ```

4. Verify hydration error resolved
```

### Performance Optimization
```
Agent: Arcanea DevOps

Task: Improve Core Web Vitals

1. Get metrics:
   get_performance_metrics()

   → {
       lcp: 3200,  // Target: < 2500
       fid: 45,    // Target: < 100 ✓
       cls: 0.15,  // Target: < 0.1
     }

2. Identify issues:
   - LCP too slow (3200 > 2500)
   - CLS too high (0.15 > 0.1)

3. Get build details:
   get_build_info()

   → Dashboard page: 320KB first load

4. Recommendations:
   LCP:
   - Add priority to hero image
   - Preload critical fonts
   - Reduce JavaScript bundle

   CLS:
   - Add size attributes to images
   - Reserve space for dynamic content
   - Use skeleton loaders

5. Implement and measure:
   [After optimizations]
   get_performance_metrics()
   → lcp: 2100, cls: 0.05 ✓
```

## Best Practices

### Error Handling
- Check errors at session start
- Clear errors after fixing
- Track error patterns
- Escalate recurring issues

### Performance Monitoring
- Baseline measurements
- Track changes over time
- Set performance budgets
- Alert on regressions

### Development Flow
- Init devtools first
- Monitor during development
- Check before commits
- Validate after deploys

## Troubleshooting

### Common Issues

**No Errors Returned:**
- Verify dev server running
- Check MCP connection
- Ensure init() called

**Performance Data Missing:**
- Wait for page load
- Check route exists
- Verify metrics enabled

**Stale Data:**
- Call clear_errors()
- Refresh dev server
- Reinitialize connection
