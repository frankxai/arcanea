// Arcanea AI - Vercel AI Gateway (single key, all models)
// No individual provider API keys needed - Vercel handles auth + billing

import { createGateway } from 'ai'

// Gateway auto-authenticates via OIDC when deployed on Vercel
// For local dev, set AI_GATEWAY_API_KEY in .env.local
const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
})

// Model registry - all accessed through one gateway
export const models = {
  // Text models (cheap → expensive)
  'flash': gateway('google/gemini-2.5-flash'),
  'pro': gateway('google/gemini-2.5-pro'),
  'claude': gateway('anthropic/claude-sonnet-4-5'),

  // Image generation
  'image-flash': gateway('google/gemini-2.5-flash-image'),
  'image-pro': gateway('google/gemini-3-pro-image-preview'),
} as const

export type ModelId = keyof typeof models

// Resolve model by ID with fallback
export function getModel(id: ModelId) {
  return models[id] ?? models['flash']
}

// Check which providers are available (all via gateway)
export function getAvailableProviders() {
  return ['google', 'anthropic', 'openai', 'meta', 'mistral', 'deepseek']
}
