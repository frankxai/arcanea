# Security Fixes Implementation Guide

This guide provides step-by-step instructions for implementing the security fixes identified in the audit.

---

## Quick Priority Overview

| Priority | Issue | Time to Fix | Risk if Not Fixed |
|----------|-------|-------------|-------------------|
| P0 | Analytics endpoint auth | 2 hours | CRITICAL - Data exposure |
| P0 | Rate limiting (Redis) | 4 hours | HIGH - DoS vulnerability |
| P1 | Prompt validation | 2 hours | HIGH - Cost overrun |
| P1 | XSS sanitization | 3 hours | HIGH - User attack vector |
| P1 | CSRF protection | 4 hours | MEDIUM - Request forgery |

**Total estimated time for P0/P1**: 15 hours (2 days)

---

## Prerequisites

### 1. Install Required Dependencies

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea.ai
npm install @upstash/ratelimit @upstash/redis isomorphic-dompurify csrf-csrf

cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web
npm install @upstash/ratelimit @upstash/redis isomorphic-dompurify csrf-csrf
```

### 2. Setup Upstash Redis (for rate limiting)

1. Go to https://upstash.com/ and create a free account
2. Create a new Redis database
3. Copy the REST URL and token
4. Add to `.env.local`:

```bash
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

---

## P0 Fixes (Deploy Immediately)

### Fix 1: Add Authentication to Analytics Endpoint

**File**: `arcanea.ai/app/api/analytics/route.ts`

**Steps**:

1. Copy the fixed version:
   ```bash
   cp SECURITY_FIXES/analytics-route-SECURED.ts arcanea.ai/app/api/analytics/route.ts
   ```

2. Implement JWT verification function:

   Create `arcanea.ai/lib/auth-helpers.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   export async function verifyJWTToken(token: string) {
     const supabase = createClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.SUPABASE_SERVICE_ROLE_KEY!
     );

     const { data: { user }, error } = await supabase.auth.getUser(token);

     if (error || !user) {
       return null;
     }

     // Get user role from database
     const { data: profile } = await supabase
       .from('user_profiles')
       .select('role')
       .eq('id', user.id)
       .single();

     return {
       id: user.id,
       email: user.email,
       role: profile?.role || 'user',
     };
   }
   ```

3. Update the import in `analytics/route.ts`:
   ```typescript
   import { verifyJWTToken } from '@/lib/auth-helpers';
   ```

4. Test the endpoint:
   ```bash
   # Without auth - should return 401
   curl http://localhost:3000/api/analytics

   # With auth - should return data
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/analytics
   ```

**Verification**:
- [ ] Analytics GET returns 401 without auth header
- [ ] Analytics GET returns 401 with invalid token
- [ ] Analytics GET returns 403 for non-admin users
- [ ] Analytics GET returns 200 for admin users
- [ ] Analytics POST has same auth checks

---

### Fix 2: Implement Distributed Rate Limiting

**Files**: All AI generation routes

**Steps**:

1. Copy the improved rate limiter:
   ```bash
   mkdir -p arcanea-ecosystem/arcanea/apps/web/lib/rate-limit
   cp SECURITY_FIXES/rate-limit-IMPROVED.ts arcanea-ecosystem/arcanea/apps/web/lib/rate-limit/upstash-limiter.ts
   ```

2. Update `ai/chat/route.ts`:

   **Before**:
   ```typescript
   // Line 13-16: In-memory rate limiting
   const rateLimits = new Map<string, { count: number; resetAt: number }>();
   const RATE_LIMIT_WINDOW = 60000;
   const MAX_REQUESTS_PER_WINDOW = 20;
   ```

   **After**:
   ```typescript
   import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/upstash-limiter';

   export async function POST(req: NextRequest) {
     try {
       // ... auth code ...

       // Rate limiting (distributed)
       const rateLimitResult = await applyRateLimit(req, 'aiText', userId);
       if (rateLimitResult) return rateLimitResult;

       // ... rest of endpoint ...
     }
   }
   ```

3. Update `ai/generate-image/route.ts`:
   ```typescript
   const rateLimitResult = await applyRateLimit(req, 'aiImage', userId);
   if (rateLimitResult) return rateLimitResult;
   ```

4. Update `ai/generate-video/route.ts`:
   ```typescript
   const rateLimitResult = await applyRateLimit(req, 'aiVideo', userId);
   if (rateLimitResult) return rateLimitResult;
   ```

5. Test rate limiting:
   ```bash
   # Send 6 requests quickly - 6th should be rate limited
   for i in {1..6}; do
     curl -X POST http://localhost:3000/api/ai/generate-video \
       -H "Authorization: Bearer YOUR_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"prompt": "test"}' &
   done
   ```

**Verification**:
- [ ] Rate limits persist across server restarts
- [ ] Rate limits work correctly with multiple instances
- [ ] 429 response includes Retry-After header
- [ ] Rate limit headers included in all responses

---

## P1 Fixes (Deploy This Week)

### Fix 3: Enhanced Prompt Validation

**Files**: AI generation routes

**Steps**:

1. Copy improved sanitization:
   ```bash
   cp SECURITY_FIXES/sanitization-IMPROVED.ts arcanea-ecosystem/arcanea/apps/web/lib/validation/sanitization.ts
   ```

2. Update `ai/generate-video/route.ts`:

   **Before** (line 111):
   ```typescript
   if (!prompt) {
     return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
   }
   ```

   **After**:
   ```typescript
   import { sanitizedPromptSchema, performSecurityCheck } from '@/lib/validation/sanitization';

   // Validate prompt
   const promptValidation = sanitizedPromptSchema.safeParse(prompt);
   if (!promptValidation.success) {
     return NextResponse.json(
       {
         error: 'Invalid prompt',
         details: promptValidation.error.errors
       },
       { status: 400 }
     );
   }

   const validatedPrompt = promptValidation.data;

   // Additional security check
   const securityCheck = performSecurityCheck(validatedPrompt);
   if (!securityCheck.safe) {
     console.warn(`[SECURITY] Blocked prompt from user ${userId}: ${securityCheck.threats.join(', ')}`);
     return NextResponse.json(
       { error: 'Prompt contains invalid content' },
       { status: 400 }
     );
   }
   ```

3. Apply same validation to:
   - `ai/chat/route.ts`
   - `ai/generate-image/route.ts`

4. Test with malicious inputs:
   ```bash
   # Test SQL injection
   curl -X POST http://localhost:3000/api/ai/chat \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"message": "Generate'; DROP TABLE users;--"}'

   # Should return 400 with validation error
   ```

**Verification**:
- [ ] Prompts over 5000 characters are rejected
- [ ] Prompts with SQL injection patterns are blocked
- [ ] Prompts with profanity are rejected
- [ ] Prompts with excessively long words are rejected
- [ ] Security events are logged

---

### Fix 4: Upgrade XSS Sanitization

**Files**: Comment and content endpoints

**Steps**:

1. Update `lib/validation/schemas.ts`:

   **Replace** entire file with imports from improved sanitization:

   ```typescript
   import { z } from 'zod';
   import { NextRequest, NextResponse } from 'next/server';
   import {
     sanitizeComment,
     sanitizePlainText,
     sanitizeRichText,
     sanitizedCommentSchema,
     sanitizedPromptSchema,
     performSecurityCheck
   } from './sanitization';

   // Common validation patterns
   const uuidSchema = z.string().uuid({ message: 'Invalid UUID format' });
   const paginationSchema = z.object({
     page: z.number().int().positive().default(1),
     pageSize: z.number().int().positive().max(100).default(20),
   });

   // === Social Feature Schemas ===

   export const likeSchema = z.object({
     userId: uuidSchema,
     creationId: uuidSchema,
   });

   export const createCommentSchema = z.object({
     userId: uuidSchema,
     creationId: uuidSchema,
     content: sanitizedCommentSchema, // Use improved sanitization
     parentCommentId: uuidSchema.optional(),
   });

   // ... rest of schemas ...
   ```

2. Test XSS prevention:
   ```bash
   # Test XSS attack
   curl -X POST http://localhost:3000/api/comments \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "userId": "...",
       "creationId": "...",
       "content": "<script>alert(\"XSS\")</script>Hello"
     }'

   # Response should have sanitized content
   # Content should be: "Hello" (script tag removed)
   ```

**Verification**:
- [ ] Script tags are completely removed
- [ ] Event handlers (onclick, onerror) are removed
- [ ] javascript: URLs are blocked
- [ ] data: URLs are blocked
- [ ] Only safe HTML tags are allowed in rich text
- [ ] External links are validated

---

### Fix 5: Add CSRF Protection

**Files**: All POST/PUT/DELETE endpoints

**Steps**:

1. Create CSRF middleware:

   Create `lib/csrf-protection.ts`:

   ```typescript
   import { createCsrfProtect } from 'csrf-csrf';
   import { NextRequest, NextResponse } from 'next/server';

   const { generateToken, validateRequest } = createCsrfProtect({
     getSecret: () => process.env.CSRF_SECRET || 'default-secret-change-in-production',
     cookieName: '__Host-arcanea.csrf-token',
     cookieOptions: {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
     },
   });

   export async function validateCsrfToken(req: NextRequest): Promise<boolean> {
     try {
       // Extract token from header
       const token = req.headers.get('x-csrf-token');
       if (!token) return false;

       // Extract cookie
       const cookie = req.cookies.get('__Host-arcanea.csrf-token')?.value;
       if (!cookie) return false;

       // Validate
       return validateRequest({ token, cookie });
     } catch (error) {
       console.error('CSRF validation error:', error);
       return false;
     }
   }

   export async function csrfMiddleware(req: NextRequest): Promise<NextResponse | null> {
     // Only check CSRF on state-changing methods
     if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
       return null;
     }

     const isValid = await validateCsrfToken(req);

     if (!isValid) {
       return NextResponse.json(
         { error: 'Invalid CSRF token' },
         { status: 403 }
       );
     }

     return null;
   }

   export { generateToken };
   ```

2. Add to environment variables:
   ```bash
   CSRF_SECRET=your-random-secret-at-least-32-characters
   ```

3. Update mutation endpoints:

   Example for `api/comments/route.ts`:

   ```typescript
   import { csrfMiddleware } from '@/lib/csrf-protection';

   export async function POST(req: NextRequest) {
     try {
       // CSRF protection
       const csrfResult = await csrfMiddleware(req);
       if (csrfResult) return csrfResult;

       // Rest of endpoint...
     }
   }
   ```

4. Client-side: Add CSRF token to requests:

   Create `lib/api-client.ts`:

   ```typescript
   export async function fetchWithCsrf(url: string, options: RequestInit = {}) {
     // Get CSRF token from cookie
     const csrfToken = getCookie('__Host-arcanea.csrf-token');

     const response = await fetch(url, {
       ...options,
       headers: {
         ...options.headers,
         'X-CSRF-Token': csrfToken,
       },
     });

     return response;
   }

   function getCookie(name: string): string {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${name}=`);
     if (parts.length === 2) return parts.pop()!.split(';').shift()!;
     return '';
   }
   ```

**Verification**:
- [ ] POST without CSRF token returns 403
- [ ] POST with invalid CSRF token returns 403
- [ ] POST with valid CSRF token succeeds
- [ ] GET requests don't require CSRF token

---

## P2 Fixes (Next Sprint)

### Fix 6: Add Security Headers

Create `middleware.ts` at project root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // CSP
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
```

---

### Fix 7: Implement Audit Logging

Create `lib/audit-logger.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

export interface AuditLog {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  error?: string;
}

export async function logAuditEvent(event: AuditLog) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    await supabase.from('audit_logs').insert({
      ...event,
      timestamp: new Date().toISOString(),
    });

    // Also log to console for debugging
    console.log('[AUDIT]', JSON.stringify(event));
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

// Usage in API routes
export async function logApiCall(
  req: NextRequest,
  userId: string | undefined,
  action: string,
  success: boolean,
  error?: string
) {
  await logAuditEvent({
    userId,
    action,
    resource: 'api',
    metadata: {
      method: req.method,
      url: req.url,
    },
    ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
    userAgent: req.headers.get('user-agent') || undefined,
    success,
    error,
  });
}
```

Create audit_logs table:

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  resource_id UUID,
  metadata JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  error TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
```

---

## Testing Checklist

After implementing all fixes, test the following:

### Authentication
- [ ] Unauthenticated requests to protected endpoints return 401
- [ ] Invalid tokens return 401
- [ ] Expired tokens return 401
- [ ] Valid tokens allow access

### Rate Limiting
- [ ] Exceeding limit returns 429
- [ ] Rate limit headers present in all responses
- [ ] Retry-After header present in 429 responses
- [ ] Rate limits persist across server restarts
- [ ] Different users have separate rate limits

### Input Validation
- [ ] SQL injection attempts are blocked
- [ ] XSS attempts are sanitized
- [ ] Path traversal attempts are blocked
- [ ] Excessively long inputs are rejected
- [ ] Invalid data types are rejected

### CSRF Protection
- [ ] Missing CSRF token returns 403
- [ ] Invalid CSRF token returns 403
- [ ] Valid CSRF token allows mutation
- [ ] GET requests don't require CSRF

### Content Safety
- [ ] Profanity is filtered
- [ ] Inappropriate content is blocked
- [ ] Malicious URLs are rejected

---

## Deployment Checklist

Before deploying to production:

- [ ] All P0 fixes implemented and tested
- [ ] Redis/Upstash configured in production
- [ ] Environment variables set correctly
- [ ] CSRF secret generated and set
- [ ] Security headers configured
- [ ] Audit logging enabled
- [ ] Admin users configured for analytics access
- [ ] Rate limits tuned for production traffic
- [ ] Monitoring/alerting configured
- [ ] Error tracking configured (Sentry, etc.)

---

## Monitoring & Maintenance

### Daily Checks
- Monitor rate limit violations
- Review security audit logs
- Check for failed authentication attempts

### Weekly Checks
- Review rate limit analytics
- Analyze blocked requests (false positives?)
- Update profanity filters if needed

### Monthly Checks
- Review and update security policies
- Analyze trends in security incidents
- Update dependencies for security patches

---

## Getting Help

If you encounter issues:

1. Check the main security audit report: `SECURITY_AUDIT_REPORT.md`
2. Review implementation logs
3. Test in development environment first
4. Roll back if production issues occur

---

## Conclusion

Following this guide will address all critical security vulnerabilities. Start with P0 fixes and work your way down.

**Estimated total implementation time**: 15-20 hours
**Recommended deployment schedule**:
- Day 1: P0 fixes (authentication + rate limiting)
- Day 2: P1 fixes (validation + CSRF)
- Week 2: P2 fixes (headers + logging)

Good luck! The Arcanea platform will be much more secure after these fixes.
