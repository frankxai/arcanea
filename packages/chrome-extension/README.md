# @arcanea/chrome-extension

Arcanea Intelligence OS for Chrome. Guardian-powered AI assistance on every webpage.

## Features

- **Guardian Panel** - Access all 10 Guardians from the side panel
- **Content Overlay** - Arcanea intelligence injected into web pages
- **Auto-Routing** - Tasks automatically routed to the optimal Guardian
- **Voice Enforcement** - Arcanea Voice Bible applied to all AI interactions
- **Options Page** - Configure Guardian preferences and element resonance

## Development

```bash
pnpm --filter @arcanea/chrome-extension run dev    # Watch mode
pnpm --filter @arcanea/chrome-extension run build  # Production build
pnpm --filter @arcanea/chrome-extension run test   # Run tests
```

## Architecture

- `background.ts` - Service worker for extension lifecycle
- `content.ts` - Content script injected into web pages
- `popup.ts` - Browser action popup
- `sidepanel.ts` - Chrome side panel UI
- `guardians.ts` - Guardian data and routing logic
- `ai-service.ts` - AI integration layer

Built on `@arcanea/extension-core` shared package.

## Part of the Arcanea Ecosystem

Built by [FrankX](https://frankx.ai) | [GitHub](https://github.com/frankxai/arcanea)
