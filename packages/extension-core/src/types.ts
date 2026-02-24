/**
 * @arcanea/extension-core — Shared Types
 *
 * Type definitions shared across all Arcanea browser extensions and overlays.
 * These are extension-specific types; mythology types live in @arcanea/os.
 */

// ============================================
// AI PROVIDER
// ============================================

export type Provider = 'anthropic' | 'google' | 'openai';

// ============================================
// MESSAGING
// ============================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** Guardian who generated this response, if any */
  guardianId?: string;
  /** Provider that produced the response */
  provider?: Provider;
  /** Token count, if available */
  tokens?: number;
}

// ============================================
// CONVERSATION
// ============================================

export interface Conversation {
  id: string;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
  messages: Message[];
  /** Active guardian for this conversation */
  guardianId?: string;
  /** Page URL when conversation was started */
  pageUrl?: string;
  /** User-assigned title */
  title?: string;
}

// ============================================
// PAGE CONTEXT
// ============================================

/**
 * Structured context extracted from the current browser page.
 * Injected by content scripts; consumed by Guardian responses.
 */
export interface PageContext {
  /** Current page URL */
  url: string;
  /** Page <title> */
  title: string;
  /** Meta description, if present */
  description?: string;
  /** Main text content, truncated to a safe length */
  bodyText?: string;
  /** User's text selection, if any */
  selectedText?: string;
  /** Active input field value, if any */
  activeInput?: string;
  /** Detected page category (e.g. 'article', 'code', 'form') */
  pageType?: string;
  /** ISO 8601 timestamp of extraction */
  extractedAt: string;
}

// ============================================
// EXTENSION CONFIG
// ============================================

/**
 * Runtime configuration for any Arcanea extension instance.
 * Persisted to chrome.storage.sync (or equivalent).
 */
export interface ExtensionConfig {
  /** API key for the selected provider */
  apiKey?: string;
  /** Active AI provider */
  provider: Provider;
  /** Model identifier within that provider, e.g. 'claude-opus-4-6' */
  model: string;
  /** Guardian to use by default; 'auto' means keyword-based routing */
  defaultGuardianId: string | 'auto';
  /** Subscription tier controlling feature access */
  subscriptionTier: import('./subscription.js').SubscriptionTier;
  /** Whether to inject page context into prompts automatically */
  injectPageContext: boolean;
  /** Maximum tokens per response */
  maxTokens: number;
  /** UI theme override; 'system' follows the OS preference */
  theme: 'dark' | 'light' | 'system';
  /** Extension version at time config was last written */
  version: string;
}
