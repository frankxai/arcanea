# Arcanea MVP - Monitoring & Observability

Comprehensive monitoring setup for the Arcanea MVP to ensure reliability, performance, and rapid incident response.

## Table of Contents

1. [Monitoring Stack Overview](#monitoring-stack-overview)
2. [Vercel Analytics](#vercel-analytics)
3. [Performance Monitoring](#performance-monitoring)
4. [Error Tracking](#error-tracking)
5. [Log Aggregation](#log-aggregation)
6. [Uptime Monitoring](#uptime-monitoring)
7. [Database Monitoring](#database-monitoring)
8. [API Monitoring](#api-monitoring)
9. [Cost Monitoring](#cost-monitoring)
10. [Alerting Strategy](#alerting-strategy)
11. [Dashboards](#dashboards)
12. [Incident Response](#incident-response)

---

## Monitoring Stack Overview

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| **Web Analytics** | Vercel Analytics | User behavior, page views | Included |
| **Performance** | Vercel Speed Insights | Core Web Vitals, performance | Included |
| **Errors** | Vercel Logs / Sentry (optional) | Error tracking, debugging | Free/$0-26 |
| **Uptime** | Vercel Health Checks | Service availability | Included |
| **Database** | Supabase Dashboard | DB health, queries | Included |
| **Logs** | Vercel Logs / Supabase Logs | Application logs | Included |
| **APM** | Vercel Observability | Request traces, metrics | Pro plan |

**Total Additional Cost:** $0-26/month (if using Sentry's free tier)

---

## Vercel Analytics

### Setup

Analytics are automatically enabled for all Vercel deployments.

**Add to your Next.js app:**

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Key Metrics

Monitor in Vercel Dashboard > Analytics:

1. **Page Views**
   - Total visits
   - Unique visitors
   - Page view trends

2. **Top Pages**
   - Most visited routes
   - Engagement by page
   - Exit pages

3. **Referrers**
   - Traffic sources
   - Campaign tracking
   - Social media referrals

4. **Locations**
   - Geographic distribution
   - Latency by region
   - Market penetration

5. **Devices**
   - Desktop vs mobile split
   - Browser distribution
   - OS distribution

### Custom Events

Track custom user actions:

```tsx
import { track } from '@vercel/analytics';

// Track custom events
function handleCreationGenerate() {
  track('creation_generated', {
    type: 'image',
    model: 'gemini-2.0',
    timestamp: Date.now()
  });
}

// Track conversions
function handlePurchase(amount: number) {
  track('purchase_completed', {
    amount,
    currency: 'ARC'
  });
}
```

### Analytics API

Access analytics data programmatically:

```typescript
// lib/analytics.ts
import { unstable_analytics } from '@vercel/analytics/server';

export async function getAnalytics() {
  const data = await unstable_analytics.get({
    start: Date.now() - 86400000, // 24 hours ago
    end: Date.now()
  });

  return data;
}
```

---

## Performance Monitoring

### Speed Insights Setup

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Core Web Vitals

Monitor in Vercel Dashboard > Speed Insights:

1. **Largest Contentful Paint (LCP)**
   - Target: < 2.5 seconds
   - Measures: Loading performance
   - Alert if: > 4 seconds

2. **First Input Delay (FID)**
   - Target: < 100 milliseconds
   - Measures: Interactivity
   - Alert if: > 300 milliseconds

3. **Cumulative Layout Shift (CLS)**
   - Target: < 0.1
   - Measures: Visual stability
   - Alert if: > 0.25

4. **Time to First Byte (TTFB)**
   - Target: < 600 milliseconds
   - Measures: Server response time
   - Alert if: > 1 second

5. **First Contentful Paint (FCP)**
   - Target: < 1.8 seconds
   - Measures: Perceived load time
   - Alert if: > 3 seconds

### Performance Budgets

Set performance budgets in `next.config.js`:

```javascript
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { dev, isServer }) => {
    // Analyze bundle size in production
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
    }
    return config;
  },
};
```

### Custom Performance Tracking

```typescript
// lib/performance.ts
export function measurePerformance(metric: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;

  // Log to analytics
  console.log(`[Performance] ${metric}: ${duration.toFixed(2)}ms`);

  // Send to monitoring service
  if (typeof window !== 'undefined') {
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify({ metric, duration })
    });
  }
}
```

---

## Error Tracking

### Vercel Logs (Built-in)

Access logs in Vercel Dashboard > Logs:

- Real-time streaming logs
- Filter by severity, function, time
- Download logs for analysis

### Sentry Integration (Recommended)

#### 1. Install Sentry

```bash
pnpm add @sentry/nextjs
```

#### 2. Configure Sentry

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV || 'development',
  tracesSampleRate: 0.1, // 10% of transactions
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

```javascript
// sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV || 'development',
  tracesSampleRate: 0.1,
});
```

#### 3. Custom Error Tracking

```typescript
// lib/errors.ts
import * as Sentry from '@sentry/nextjs';

export function logError(error: Error, context?: Record<string, any>) {
  console.error(error);

  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: { custom: context }
    });
  }
}

export function logWarning(message: string, context?: Record<string, any>) {
  console.warn(message, context);

  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, {
      level: 'warning',
      contexts: { custom: context }
    });
  }
}
```

---

## Log Aggregation

### Vercel Logs

```bash
# View logs via CLI
vercel logs <deployment-url>

# Follow logs in real-time
vercel logs --follow

# Filter by severity
vercel logs --filter error
```

### Structured Logging

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: Record<string, any>) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },

  error: (message: string, error?: Error, meta?: Record<string, any>) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },

  warn: (message: string, meta?: Record<string, any>) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
};
```

### Usage

```typescript
import { logger } from '@/lib/logger';

// In API routes
export async function POST(request: Request) {
  try {
    logger.info('Creation requested', {
      userId: user.id,
      type: 'image'
    });

    // ... process request

    logger.info('Creation completed', {
      userId: user.id,
      creationId: creation.id,
      duration: Date.now() - startTime
    });

    return Response.json({ success: true });
  } catch (error) {
    logger.error('Creation failed', error, {
      userId: user.id
    });
    throw error;
  }
}
```

---

## Uptime Monitoring

### Vercel Health Checks

Configure in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/health",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const checks = {
    api: true,
    database: false,
    timestamp: new Date().toISOString()
  };

  try {
    // Check database connection
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from('users').select('count').limit(1);
    checks.database = !error;

    // Check AI APIs (optional)
    // checks.gemini = await checkGeminiAPI();
    // checks.anthropic = await checkAnthropicAPI();

    const isHealthy = checks.database;

    return NextResponse.json(
      checks,
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    return NextResponse.json(
      { ...checks, error: 'Health check failed' },
      { status: 503 }
    );
  }
}
```

### External Uptime Monitoring (Optional)

Consider third-party services for comprehensive uptime monitoring:

1. **UptimeRobot** (Free tier)
   - Monitor every 5 minutes
   - Alert via email/SMS
   - Status page

2. **Better Uptime** ($15/mo)
   - Advanced incident management
   - On-call scheduling
   - Status page

3. **Pingdom** ($10/mo)
   - Global monitoring
   - Transaction monitoring
   - Real user monitoring

---

## Database Monitoring

### Supabase Dashboard Monitoring

Access in Supabase Dashboard:

1. **Database Health**
   - CPU usage
   - Memory usage
   - Disk usage
   - Active connections

2. **Slow Queries**
   - Identify performance bottlenecks
   - Optimize indexes
   - Query plan analysis

3. **API Logs**
   - Request volume
   - Error rates
   - Response times

4. **Storage Usage**
   - Bucket sizes
   - Bandwidth consumption
   - File counts

### Database Metrics API

```typescript
// lib/db-metrics.ts
export async function getDatabaseMetrics() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: stats } = await supabase.rpc('get_db_stats');

  return {
    connectionCount: stats.connection_count,
    databaseSize: stats.database_size,
    tableCount: stats.table_count,
    slowQueryCount: stats.slow_query_count
  };
}
```

### Alerts

Set up alerts in Supabase Dashboard > Database > Settings:

- **High CPU:** Alert when > 80% for 5 minutes
- **Low Disk Space:** Alert when < 20% remaining
- **Connection Limit:** Alert when > 80% of max connections
- **Long-running Queries:** Alert when query > 10 seconds

---

## API Monitoring

### AI API Usage Tracking

```typescript
// lib/api-monitor.ts
export async function trackAPIUsage(
  provider: 'gemini' | 'anthropic' | 'openrouter',
  endpoint: string,
  tokens: number,
  cost: number
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from('api_usage').insert({
    provider,
    endpoint,
    tokens,
    cost,
    timestamp: new Date().toISOString()
  });
}
```

### Rate Limiting Monitoring

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'unknown';

  // Check rate limit
  const isLimited = checkRateLimit(ip);

  if (isLimited) {
    // Log rate limit exceeded
    console.warn('Rate limit exceeded', { ip, path: request.nextUrl.pathname });

    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  return NextResponse.next();
}
```

---

## Cost Monitoring

### Vercel Usage

Monitor in Vercel Dashboard > Usage:

- Bandwidth
- Build minutes
- Serverless function executions
- Edge function invocations

**Budget Alerts:**
- Set up in Vercel Settings > Billing
- Alert at 80% and 100% of monthly quota

### AI API Costs

Track costs across providers:

```typescript
// lib/cost-tracker.ts
export const AI_PRICING = {
  gemini: {
    input: 0.000001, // per token
    output: 0.000002
  },
  anthropic: {
    input: 0.000003,
    output: 0.000015
  },
  openrouter: {
    // Variable by model
    input: 0.000001,
    output: 0.000002
  }
};

export function calculateCost(
  provider: keyof typeof AI_PRICING,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = AI_PRICING[provider];
  return (inputTokens * pricing.input) + (outputTokens * pricing.output);
}

export async function logCost(
  provider: string,
  cost: number,
  userId: string
) {
  // Log to database for tracking and invoicing
  await supabase.from('costs').insert({
    provider,
    cost,
    user_id: userId,
    timestamp: new Date().toISOString()
  });
}
```

### Cost Dashboard

Create a custom dashboard for cost monitoring:

```typescript
// app/admin/costs/page.tsx
export default async function CostsPage() {
  const costs = await getCostsSummary();

  return (
    <div>
      <h1>Cost Monitoring</h1>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          title="Total This Month"
          value={`$${costs.total.toFixed(2)}`}
        />
        <MetricCard
          title="Gemini API"
          value={`$${costs.gemini.toFixed(2)}`}
        />
        <MetricCard
          title="Anthropic API"
          value={`$${costs.anthropic.toFixed(2)}`}
        />
      </div>
    </div>
  );
}
```

---

## Alerting Strategy

### Alert Channels

1. **Email** (Primary)
2. **Slack** (Team notifications)
3. **SMS** (Critical only)
4. **PagerDuty** (On-call rotation)

### Alert Levels

**Critical (P0):**
- Site down (health check fails)
- Database unreachable
- Payment processing failure
- Data breach detected

**High (P1):**
- Error rate > 5%
- Response time > 5 seconds
- Disk space < 10%
- API quota near limit

**Medium (P2):**
- Error rate > 1%
- Response time > 3 seconds
- Unusual traffic patterns
- Failed background jobs

**Low (P3):**
- Performance degradation
- Warning logs increasing
- Dependency updates available

### Alert Configuration

```typescript
// lib/alerts.ts
export async function sendAlert(
  severity: 'critical' | 'high' | 'medium' | 'low',
  title: string,
  message: string,
  metadata?: Record<string, any>
) {
  const alert = {
    severity,
    title,
    message,
    timestamp: new Date().toISOString(),
    metadata
  };

  // Log to database
  await supabase.from('alerts').insert(alert);

  // Send notifications based on severity
  if (severity === 'critical' || severity === 'high') {
    await sendEmailAlert(alert);
    await sendSlackAlert(alert);

    if (severity === 'critical') {
      await sendSMSAlert(alert);
    }
  }
}
```

---

## Dashboards

### Vercel Dashboard

Primary dashboard at https://vercel.com/arcanea

Key views:
- Overview (deployments, analytics, logs)
- Analytics (user behavior, traffic)
- Speed Insights (performance metrics)
- Logs (real-time, searchable)

### Custom Admin Dashboard

Build a custom dashboard for comprehensive monitoring:

```typescript
// app/admin/dashboard/page.tsx
export default async function AdminDashboard() {
  const [
    metrics,
    costs,
    errors,
    performance
  ] = await Promise.all([
    getSystemMetrics(),
    getCostsSummary(),
    getRecentErrors(),
    getPerformanceMetrics()
  ]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <SystemHealth metrics={metrics} />
      <CostOverview costs={costs} />
      <ErrorsPanel errors={errors} />
      <PerformanceChart data={performance} />
    </div>
  );
}
```

---

## Incident Response

### Incident Severity

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| **SEV-1** | Critical service down | < 15 min | Site unreachable |
| **SEV-2** | Major feature broken | < 1 hour | Payments failing |
| **SEV-3** | Minor feature issue | < 4 hours | Slow page load |
| **SEV-4** | Cosmetic issue | < 24 hours | UI glitch |

### Response Procedures

#### 1. Detection
- Automated alerts trigger
- Manual report from user/team

#### 2. Triage
- Assess severity
- Identify affected systems
- Assign owner

#### 3. Communication
- Update status page
- Notify stakeholders
- Regular updates every 30 min (SEV-1/2)

#### 4. Resolution
- Implement fix or rollback
- Verify resolution
- Monitor for recurrence

#### 5. Post-Mortem
- Root cause analysis
- Document lessons learned
- Implement preventive measures

### Incident Tracking

```typescript
// lib/incidents.ts
export async function createIncident(
  severity: number,
  title: string,
  description: string
) {
  const incident = await supabase.from('incidents').insert({
    severity,
    title,
    description,
    status: 'investigating',
    created_at: new Date().toISOString()
  }).select().single();

  // Notify team
  await sendAlert('critical', `SEV-${severity} Incident`, title);

  return incident;
}
```

---

## Best Practices

1. **Monitor Proactively**
   - Don't wait for users to report issues
   - Set up comprehensive alerting
   - Regular dashboard reviews

2. **Keep Logs Structured**
   - Use JSON format
   - Include context
   - Consistent naming

3. **Track Trends**
   - Monitor week-over-week changes
   - Identify patterns
   - Predict capacity needs

4. **Optimize Costs**
   - Cache aggressively
   - Implement rate limiting
   - Monitor AI API usage

5. **Document Everything**
   - Alert runbooks
   - Incident post-mortems
   - Configuration changes

---

**Last Updated:** 2025-10-23
**Version:** 1.0.0 (MVP)
**Maintained By:** Arcanea DevOps Team
