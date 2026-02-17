
# Tech Stack (The Engineering DNA)

> **"We choose boring technology to build exciting products."**

This document defines the **Canonical Stack** for the Starlight Ecosystem.
Any deviation requires a `SWARM_CONSENSUS` vote.

## 1. The Core (Runtime)
*   **Language:** TypeScript (Strict Mode).
    *   *Why:* Type safety is the first line of defense against chaos.
*   **Framework:** Next.js (App Router).
    *   *Why:* The standard for React. Server Components reduce client load.
*   **Mobile:** React Native (Expo).
    *   *Why:* Unified codebase with Web where possible.

## 2. The Style (Aesthetics)
*   **CSS:** Tailwind CSS v4.
    *   *Why:* Utility-first allows for rapid, consistent UI.
    *   **NO** CSS-in-JS (Emotion/Styled).
    *   **NO** Bootstrap/Material.

## 3. The Data (Memory)
*   **Database:** Supabase (PostgreSQL).
    *   *Why:* Relational integrity + Realtime features.
*   **ORM:** Prisma or Drizzle.
    *   *Why:* Type-safe database access.

## 4. The Intelligence (AI)
*   **Model:** Claude 3.5 Sonnet (Primary), Gemini 1.5 Pro (Fallback).
*   **SDK:** Vercel AI SDK.
    *   *Why:* Standardized streaming and tool calling.
