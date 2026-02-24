# Error Handling Guide

This guide documents error handling implementation in the Arcanea web application.

## Overview

The app implements a comprehensive error handling strategy with multiple layers:

1. **Route-level error handling** - Next.js App Router `error.tsx` files
2. **Global 404 handling** - `not-found.tsx` for missing routes
3. **Loading states** - `loading.tsx` for async route transitions
4. **Component-level boundaries** - React ErrorBoundary class component
5. **Suspense boundaries** - For async Server Components

## Files Created

### Global Error Handlers

#### `/app/error.tsx`
- **Purpose**: Catches errors in any route segment
- **Type**: Client Component (must be 'use client')
- **Features**:
  - Cosmic-themed error UI with Arcanean design system
  - Shows error details in development mode only
  - Provides "Try Again" and "Return Home" actions
  - Animated error icon with glow effects
  - Helpful suggestions for users

#### `/app/not-found.tsx`
- **Purpose**: Handles 404 errors for non-existent routes
- **Type**: Server Component (default)
- **Features**:
  - Magical 404 design with cosmic effects
  - Navigation cards to key sections (Home, Discover, Academy)
  - Academy-themed color schemes
  - Maintains Arcanean mythology tone

#### `/app/loading.tsx`
- **Purpose**: Shows loading state during route transitions
- **Type**: Server Component (default)
- **Features**:
  - Animated loader with cosmic glow
  - Loading progress bar with shimmer effect
  - Mythological loading text ("Weaving cosmic threads...")

### Component-Level Error Handling

#### `/components/error-boundary.tsx`
- **Purpose**: Reusable ErrorBoundary class component
- **Type**: Client Component
- **Usage**:

```tsx
// Wrap any component that might error
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>

// With reset callback
<ErrorBoundary onReset={() => console.log('Reset!')}>
  <YourComponent />
</ErrorBoundary>

// Using HOC pattern
export default withErrorBoundary(YourComponent);
```

## Usage Patterns

### 1. Async Server Components with Suspense

For async Server Components (like data fetching pages):

```tsx
// app/library/page.tsx
import { Suspense } from 'react';
import Loading from './loading'; // or custom loading component

export default function LibraryLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}

// The actual async page
export default async function LibraryPage() {
  const collections = await getCollections(); // Server-side data fetch
  return <div>{/* ... */}</div>;
}
```

### 2. Client Components with Error Boundaries

For client-side components that might error:

```tsx
'use client';

import { ErrorBoundary } from '@/components/error-boundary';

export function ComplexClientComponent() {
  return (
    <ErrorBoundary>
      <DataVisualization />
      <InteractiveChart />
      <UserGeneratedContent />
    </ErrorBoundary>
  );
}
```

### 3. Route-Level Error Handling

Next.js automatically uses `error.tsx` for route errors. For specific routes:

```tsx
// app/chat/error.tsx - Chat-specific error handling
'use client';

export default function ChatError({ error, reset }) {
  return (
    <div>
      <h2>Chat Error</h2>
      <p>Failed to load conversation with Luminor</p>
      <button onClick={reset}>Reconnect</button>
    </div>
  );
}
```

### 4. API Route Error Handling

For API routes, use try-catch with proper status codes:

```tsx
// app/api/creations/route.ts
export async function GET(request: Request) {
  try {
    const creations = await db.creations.findMany();
    return Response.json(creations);
  } catch (error) {
    console.error('Failed to fetch creations:', error);
    return Response.json(
      { error: 'Failed to fetch creations' },
      { status: 500 }
    );
  }
}
```

## Error Types & Handling Strategy

### 1. Network Errors
- **Symptom**: Failed API calls, timeout errors
- **Handling**: Retry mechanism, offline detection, user notification
- **Example**: Chat fails to send message

### 2. Data Validation Errors
- **Symptom**: Invalid user input, type mismatches
- **Handling**: Form validation, inline error messages
- **Example**: Invalid email format

### 3. Authentication Errors
- **Symptom**: 401/403 status codes
- **Handling**: Redirect to login, token refresh
- **Example**: Session expired

### 4. Component Render Errors
- **Symptom**: JavaScript errors in component tree
- **Handling**: ErrorBoundary catches and displays fallback
- **Example**: Null reference error in UI

### 5. Server Errors
- **Symptom**: 500 status codes
- **Handling**: Global error page with helpful message
- **Example**: Database connection failure

## Best Practices

### DO:
- Use `error.tsx` for route-level errors
- Wrap complex client components in ErrorBoundary
- Show helpful, user-friendly error messages
- Provide clear recovery actions (retry, go home, contact support)
- Log errors to monitoring service (Sentry, LogRocket)
- Hide technical details from users in production
- Use Suspense boundaries for async Server Components
- Maintain Arcanean theme in error UI

### DON'T:
- Don't expose stack traces or sensitive data in production
- Don't use generic "Something went wrong" without context
- Don't forget to log errors for debugging
- Don't block user flow - always provide escape path
- Don't use ErrorBoundary for expected errors (use conditional rendering)
- Don't forget to add loading states for async operations

## Testing Error Boundaries

```tsx
// test/error-boundary.test.tsx
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/error-boundary';

const ThrowError = () => {
  throw new Error('Test error');
};

test('ErrorBoundary catches errors and displays fallback', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText(/Something Unexpected Happened/i)).toBeInTheDocument();
});
```

## Monitoring & Logging

### Integration with Error Tracking Services

```tsx
// lib/error-tracking.ts
import * as Sentry from '@sentry/nextjs';

export function logError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error:', error, context);
  }
}

// Usage in error.tsx
useEffect(() => {
  logError(error, {
    component: 'GlobalErrorBoundary',
    digest: error.digest,
  });
}, [error]);
```

## Accessibility Considerations

- Error messages have proper heading hierarchy
- Focus management on error display
- Screen reader announcements for errors
- Keyboard navigation for recovery actions
- Sufficient color contrast for error states

## Future Improvements

1. **Error Analytics Dashboard** - Track error frequency and types
2. **Automatic Error Recovery** - Retry failed requests automatically
3. **Offline Mode** - Graceful degradation when offline
4. **Error Toast Notifications** - Non-blocking error alerts
5. **Context-Aware Error Messages** - More specific guidance based on user action

## Related Files

- `/app/error.tsx` - Global error boundary
- `/app/not-found.tsx` - 404 page
- `/app/loading.tsx` - Loading state
- `/components/error-boundary.tsx` - Reusable error boundary
- `/lib/error-tracking.ts` - Error logging utilities (to be created)

---

**Last Updated**: 2026-02-02
**Maintainer**: Frontend Team
