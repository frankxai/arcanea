# Arcanea MVP - Security Configuration & Best Practices

Comprehensive security guide for protecting the Arcanea platform, user data, and infrastructure.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [API Security](#api-security)
4. [Database Security](#database-security)
5. [Environment Variables & Secrets](#environment-variables--secrets)
6. [CORS & CSP Configuration](#cors--csp-configuration)
7. [Rate Limiting](#rate-limiting)
8. [Input Validation & Sanitization](#input-validation--sanitization)
9. [File Upload Security](#file-upload-security)
10. [Dependency Security](#dependency-security)
11. [Monitoring & Incident Response](#monitoring--incident-response)
12. [Compliance & Data Protection](#compliance--data-protection)

---

## Security Overview

### Security Principles

1. **Defense in Depth:** Multiple layers of security
2. **Least Privilege:** Minimal access by default
3. **Zero Trust:** Verify everything, trust nothing
4. **Fail Securely:** Secure defaults when errors occur
5. **Separation of Concerns:** Isolate sensitive operations

### Threat Model

Key threats to protect against:

- **Unauthorized Access:** Authentication bypass, session hijacking
- **Data Breaches:** SQL injection, data exfiltration
- **API Abuse:** Rate limiting bypass, DDoS attacks
- **XSS Attacks:** Stored/reflected cross-site scripting
- **CSRF Attacks:** Cross-site request forgery
- **Supply Chain:** Compromised dependencies
- **Secrets Exposure:** API keys in code, logs

### Security Checklist

- [ ] All API keys stored securely (not in code)
- [ ] HTTPS enforced everywhere
- [ ] Authentication implemented correctly
- [ ] Authorization checks on all protected routes
- [ ] Row Level Security (RLS) enabled on database
- [ ] Input validation on all user inputs
- [ ] Rate limiting on public endpoints
- [ ] CORS configured correctly
- [ ] CSP headers implemented
- [ ] Security headers configured
- [ ] Dependency scanning enabled
- [ ] Error messages don't leak sensitive info
- [ ] Logging doesn't include sensitive data
- [ ] Regular security audits scheduled

---

## Authentication & Authorization

### NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    // Email provider with verification
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24 hours
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Log sign-in events
      console.log('User signed in:', user.id);
    },
    async signOut({ token }) {
      // Log sign-out events
      console.log('User signed out:', token.id);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Protected API Routes

```typescript
// lib/auth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireRole(role: string) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    throw new Error('Forbidden');
  }

  return session;
}
```

Usage in API routes:

```typescript
// app/api/creations/route.ts
import { requireAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await requireAuth();

    // User is authenticated, proceed
    const body = await request.json();

    // ... create creation

    return Response.json({ success: true });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    throw error;
  }
}
```

### Authorization Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin';
      }

      // Protect user routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*'],
};
```

---

## API Security

### Security Headers

Configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

### Content Security Policy

```typescript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' *.supabase.co *.anthropic.com *.googleapis.com;
  media-src 'self' blob: data:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### API Key Management

```typescript
// lib/api-keys.ts
import { createHash } from 'crypto';

export function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex');
}

export function generateApiKey(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return Buffer.from(randomBytes).toString('base64url');
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  const hashedKey = hashApiKey(apiKey);

  const { data } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key_hash', hashedKey)
    .eq('is_active', true)
    .single();

  return !!data;
}
```

### API Authentication Middleware

```typescript
// middleware/api-auth.ts
export async function apiAuthMiddleware(request: Request) {
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey) {
    return Response.json(
      { error: 'API key required' },
      { status: 401 }
    );
  }

  const isValid = await validateApiKey(apiKey);

  if (!isValid) {
    return Response.json(
      { error: 'Invalid API key' },
      { status: 401 }
    );
  }

  return null; // Continue to handler
}
```

---

## Database Security

### Row Level Security (RLS)

Enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can only view their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own creations
CREATE POLICY "Users can view own creations"
  ON creations FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Users can create creations
CREATE POLICY "Users can create creations"
  ON creations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own creations
CREATE POLICY "Users can update own creations"
  ON creations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own creations
CREATE POLICY "Users can delete own creations"
  ON creations FOR DELETE
  USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access"
  ON users FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );
```

### Parameterized Queries

Always use parameterized queries to prevent SQL injection:

```typescript
// GOOD: Parameterized query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail);

// BAD: String concatenation (SQL injection risk)
// const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
```

### Database Connection Security

```typescript
// lib/database.ts
import { createClient } from '@supabase/supabase-js';

// Use service role key only on server
export function getServiceClient() {
  if (typeof window !== 'undefined') {
    throw new Error('Service client cannot be used on client');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Use anon key for client
export function getAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

---

## Environment Variables & Secrets

### Secrets Management

1. **Never commit secrets to git**

```bash
# .gitignore (should already include)
.env
.env.local
.env*.local
.vercel
```

2. **Use Vercel Environment Variables**

- Go to Vercel Project > Settings > Environment Variables
- Store all sensitive keys there
- Use appropriate scopes (Production/Preview/Development)

3. **Rotate secrets regularly**

```bash
# Rotate NEXTAUTH_SECRET every 90 days
openssl rand -base64 32

# Update in Vercel dashboard
# Force redeployment for changes to take effect
```

4. **Validate environment variables at startup**

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Public variables
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Private variables (server-only)
  NEXTAUTH_SECRET: z.string().min(32),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  GEMINI_API_KEY: z.string().startsWith('AIzaSy'),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
});

export function validateEnv() {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}

// Call in server startup
if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}
```

### Prevent Secret Leakage

```typescript
// lib/safe-error.ts
export function sanitizeError(error: any): string {
  // Remove sensitive information from error messages
  const message = error?.message || 'An error occurred';

  // Remove API keys
  const sanitized = message
    .replace(/sk-[a-zA-Z0-9]+/g, 'sk-***')
    .replace(/AIzaSy[a-zA-Z0-9_-]+/g, 'AIzaSy***')
    .replace(/eyJ[a-zA-Z0-9_-]+/g, 'eyJ***');

  return sanitized;
}

export function safeLogError(error: any) {
  console.error(sanitizeError(error));
}
```

---

## CORS & CSP Configuration

### CORS Configuration

Already configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://arcanea.ai"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,POST,PUT,DELETE,OPTIONS,PATCH"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, X-Api-Key"
        },
        {
          "key": "Access-Control-Allow-Credentials",
          "value": "true"
        }
      ]
    }
  ]
}
```

### Dynamic CORS (if needed)

```typescript
// lib/cors.ts
const ALLOWED_ORIGINS = [
  'https://arcanea.ai',
  'https://www.arcanea.ai',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : null,
].filter(Boolean);

export function checkCorsOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export function corsHeaders(origin: string | null) {
  const allowed = checkCorsOrigin(origin);

  return {
    'Access-Control-Allow-Origin': allowed ? origin! : '',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
```

---

## Rate Limiting

### Implementation

```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(
  identifier: string,
  limit: number = 100,
  window: number = 60000 // 1 minute
): Promise<{ success: boolean; remaining: number }> {
  const key = `rate-limit:${identifier}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, Math.ceil(window / 1000));
  }

  const success = count <= limit;
  const remaining = Math.max(0, limit - count);

  return { success, remaining };
}

export function getRateLimitHeaders(
  limit: number,
  remaining: number,
  reset: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  };
}
```

### Apply to API Routes

```typescript
// app/api/creations/route.ts
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  // Check rate limit
  const { success, remaining } = await rateLimit(ip, 10, 60000); // 10 req/min

  if (!success) {
    return Response.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: getRateLimitHeaders(10, remaining, Date.now() + 60000),
      }
    );
  }

  // Process request
  // ...

  return Response.json({ success: true });
}
```

### User-based Rate Limiting

```typescript
export async function userRateLimit(userId: string) {
  return rateLimit(`user:${userId}`, 100, 3600000); // 100 req/hour
}
```

---

## Input Validation & Sanitization

### Validation with Zod

```typescript
// lib/validation.ts
import { z } from 'zod';

export const CreateCreationSchema = z.object({
  type: z.enum(['image', 'music', 'story']),
  prompt: z.string().min(1).max(1000),
  settings: z.object({
    model: z.string().optional(),
    style: z.string().optional(),
  }).optional(),
});

export type CreateCreationInput = z.infer<typeof CreateCreationSchema>;
```

### Validate in API Routes

```typescript
// app/api/creations/route.ts
import { CreateCreationSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = CreateCreationSchema.parse(body);

    // Process validated data
    // ...

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

### Sanitize User Input

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
  });
}

export function sanitizeText(text: string): string {
  // Remove control characters
  return text
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, 10000); // Max length
}
```

---

## File Upload Security

### Validate File Uploads

```typescript
// lib/file-upload.ts
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File too large (max 10MB)' };
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }

  // Additional checks
  if (!file.name || file.name.length > 255) {
    return { valid: false, error: 'Invalid file name' };
  }

  return { valid: true };
}
```

### Secure Upload to Supabase Storage

```typescript
// lib/storage.ts
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(
  file: File,
  userId: string
): Promise<string> {
  // Validate file
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate secure filename
  const ext = file.name.split('.').pop();
  const filename = `${userId}/${uuidv4()}.${ext}`;

  // Upload to Supabase
  const { data, error } = await supabase.storage
    .from('creations')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return data.path;
}
```

---

## Dependency Security

### Automated Scanning

Configure in `.github/workflows/security.yml`:

```yaml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm audit
      - run: pnpm outdated
```

### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 10
    reviewers:
      - 'frankxai'
    labels:
      - 'dependencies'
      - 'security'
```

### Manual Checks

```bash
# Check for vulnerabilities
pnpm audit

# Fix automatically fixable issues
pnpm audit --fix

# Check for outdated packages
pnpm outdated

# Update dependencies
pnpm update
```

---

## Monitoring & Incident Response

### Security Monitoring

```typescript
// lib/security-monitor.ts
export async function logSecurityEvent(
  type: 'auth_failure' | 'rate_limit' | 'suspicious_activity',
  details: Record<string, any>
) {
  await supabase.from('security_events').insert({
    type,
    details,
    ip: details.ip,
    user_agent: details.userAgent,
    timestamp: new Date().toISOString(),
  });

  // Alert if critical
  if (type === 'suspicious_activity') {
    await sendSecurityAlert(type, details);
  }
}
```

### Incident Response Plan

See [MONITORING.md](./MONITORING.md#incident-response) for full incident response procedures.

---

## Compliance & Data Protection

### GDPR Compliance

1. **Data Collection**
   - Clear consent mechanisms
   - Privacy policy accessible
   - Cookie consent banner

2. **Data Access**
   - User can view their data
   - User can export their data
   - User can delete their data

3. **Data Retention**
   - Define retention periods
   - Automatic data deletion
   - Audit logs

### Implementation

```typescript
// app/api/user/data/route.ts
export async function GET(request: Request) {
  const session = await requireAuth();

  // Export all user data
  const userData = await getUserData(session.user.id);

  return Response.json(userData);
}

export async function DELETE(request: Request) {
  const session = await requireAuth();

  // Delete user account and all data
  await deleteUserData(session.user.id);

  return Response.json({ success: true });
}
```

---

## Security Best Practices Summary

1. **Authentication**
   - Use NextAuth with secure session management
   - Implement MFA for admin accounts
   - Rotate secrets regularly

2. **Authorization**
   - Implement proper RBAC
   - Use RLS on database
   - Check permissions on every request

3. **Data Protection**
   - Encrypt data at rest (Supabase does this)
   - Use HTTPS everywhere
   - Sanitize all user inputs

4. **API Security**
   - Implement rate limiting
   - Use API keys for service access
   - Validate all inputs

5. **Monitoring**
   - Log security events
   - Monitor for suspicious activity
   - Set up alerts for incidents

6. **Updates**
   - Keep dependencies updated
   - Monitor for vulnerabilities
   - Apply security patches promptly

---

**Last Updated:** 2025-10-23
**Version:** 1.0.0 (MVP)
**Maintained By:** Arcanea DevOps Team
