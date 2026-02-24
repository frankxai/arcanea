# @arcanea/auth

> **Universal AI provider authentication for the Arcanea ecosystem.**

Manages API keys and credentials across AI providers — Anthropic, OpenAI, Google, GitHub Copilot, and more.

## Features

- Secure keystore with platform-native credential storage
- Provider adapters for Claude, ChatGPT, Gemini, Copilot, OpenCode
- Key validation before storage
- Unified authentication interface for `@arcanea/cli`

## Usage

```typescript
import { AuthManager, validateKey } from '@arcanea/auth';

const auth = new AuthManager();

// Store a key
await auth.set('anthropic', process.env.ANTHROPIC_API_KEY);

// Retrieve a key
const key = await auth.get('anthropic');

// Validate before storing
const valid = await validateKey('anthropic', key);
```

## Supported Providers

| Provider | Adapter | Key Format |
|----------|---------|------------|
| Anthropic (Claude) | `anthropic` | `sk-ant-*` |
| OpenAI (ChatGPT) | `openai` | `sk-*` |
| Google (Gemini) | `google` | API key |
| GitHub (Copilot) | `github` | `gho_*` / `ghp_*` |
| OpenCode | `opencode` | Various |

## License

MIT
