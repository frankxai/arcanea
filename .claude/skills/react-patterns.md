---
name: React Patterns
description: Component patterns for Next.js + React 19
---

# React Patterns Skill

## Purpose
Component patterns and best practices for Next.js 16 + React 19.

## Server vs Client Components

### Server Components (Default)
- Data fetching, database queries
- Access to backend resources
- No useState, useEffect, event handlers
- Smaller bundle size

### Client Components ('use client')
- Interactive UI, form handling
- Browser APIs, event listeners
- useState, useEffect, useRef
- Animations (Framer Motion)

## Pattern: Composition Over Props
```tsx
// Good: Composable slots
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// Avoid: Prop explosion
<Card title="Title" body="Content" footer="..." />
```

## Pattern: Server Action Forms
```tsx
async function submitAction(formData: FormData) {
  'use server';
  // Validate, process, redirect
}

<form action={submitAction}>
  <input name="field" />
  <button type="submit">Submit</button>
</form>
```

## Pattern: Suspense Boundaries
```tsx
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>
```

## Anti-Patterns
- Don't import server modules in client components
- Don't use `useEffect` for data fetching (use Server Components)
- Don't prop-drill more than 2 levels (use Context or composition)
- Don't create client components unless interactivity is required