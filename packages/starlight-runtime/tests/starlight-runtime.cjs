"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextLoader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * ContextLoader (formerly StarlightRuntime)
 *
 * Reads Starlight Protocol files from disk and concatenates them into
 * a structured agent context. This is a file loader / context assembler,
 * not an execution runtime.
 */
class ContextLoader {
    constructor(config) {
        this.config = config;
    }
    // Helper to read MD content
    readMd(relativePath) {
        try {
            const fullPath = path_1.default.join(this.config.rootPath, relativePath);
            if (fs_1.default.existsSync(fullPath)) {
                return fs_1.default.readFileSync(fullPath, 'utf-8');
            }
            return `[MISSING: ${relativePath}]`;
        }
        catch (e) {
            console.warn(`Starlight Warning: Could not read ${relativePath}`);
            return '';
        }
    }
    /**
     * Loads the active context for a specific Agent and Strategy.
     * Reads and concatenates the relevant protocol files.
     */
    loadContext(dept, agentFile, strategyFile) {
        return {
            constitution: this.readMd('00_IDENTITY/LUMINOR_CONSTITUTION.md'),
            role: this.readMd(`03_AGENCY/${dept}/${agentFile}`),
            strategy: this.readMd(`02_PROTOCOL/STRATEGIES/${strategyFile}`),
            techStack: this.readMd('01_INTELLECT/VAULT_TECH/STARLIGHT_STACK.md')
        };
    }
    /**
     * Generates a System Prompt string from the loaded context.
     * Compatible with Vercel AI SDK, LangChain, or raw API calls.
     */
    generateSystemPrompt(context) {
        return `
# 🌟 STARLIGHT PROTOCOL: ACTIVE CONTEXT

## 0. THE CONSTITUTION (LUMINOR)
${context.constitution}

## 1. THE TECH STACK
${context.techStack}

## 2. THE ACTIVE AGENT
${context.role}

## 3. THE COGNITIVE STRATEGY
${context.strategy}

## 4. IMMEDIATE INSTRUCTION
Act as the agent defined above. Adhere strictly to the Constitution.
    `.trim();
    }
}
exports.ContextLoader = ContextLoader;
// Backwards compatibility alias
exports.StarlightRuntime = ContextLoader;
