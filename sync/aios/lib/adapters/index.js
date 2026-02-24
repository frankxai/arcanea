/**
 * Platform Adapters
 *
 * Unified interface for different AI platforms.
 */
// Claude Adapter
export class ClaudeAdapter {
    type = 'claude';
    name = 'Claude Code';
    config;
    async isAvailable() {
        // Check if claude CLI is available
        return true; // Simplified for now
    }
    async initialize(config) {
        this.config = config;
    }
    async execute(prompt, _context) {
        // In full implementation, this would use Claude API or CLI
        return `[Claude] Processing: ${prompt.slice(0, 50)}...`;
    }
}
// Gemini Adapter
export class GeminiAdapter {
    type = 'gemini';
    name = 'Google Gemini';
    config;
    async isAvailable() {
        return !!process.env.GEMINI_API_KEY;
    }
    async initialize(config) {
        this.config = config;
    }
    async execute(prompt, _context) {
        return `[Gemini] Processing: ${prompt.slice(0, 50)}...`;
    }
}
// OpenCode Adapter (Sisyphus)
export class OpenCodeAdapter {
    type = 'opencode';
    name = 'OpenCode (Sisyphus)';
    config;
    async isAvailable() {
        return true; // Check for opencode CLI
    }
    async initialize(config) {
        this.config = config;
    }
    async execute(prompt, _context) {
        return `[Sisyphus] Processing: ${prompt.slice(0, 50)}...`;
    }
}
// Codex Adapter (ChatGPT)
export class CodexAdapter {
    type = 'codex';
    name = 'ChatGPT Codex';
    config;
    async isAvailable() {
        return !!process.env.OPENAI_API_KEY;
    }
    async initialize(config) {
        this.config = config;
    }
    async execute(prompt, _context) {
        return `[Codex] Processing: ${prompt.slice(0, 50)}...`;
    }
}
// Adapter registry
const adapters = new Map();
adapters.set('claude', new ClaudeAdapter());
adapters.set('gemini', new GeminiAdapter());
adapters.set('opencode', new OpenCodeAdapter());
adapters.set('codex', new CodexAdapter());
// Get adapter by platform type
export function getAdapter(platform) {
    return adapters.get(platform);
}
// Get all available adapters
export async function getAvailableAdapters() {
    const available = [];
    for (const adapter of adapters.values()) {
        if (await adapter.isAvailable()) {
            available.push(adapter);
        }
    }
    return available;
}
// Register a custom adapter
export function registerAdapter(adapter) {
    adapters.set(adapter.type, adapter);
}
//# sourceMappingURL=index.js.map