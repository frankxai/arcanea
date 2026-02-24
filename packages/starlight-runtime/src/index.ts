import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Interfaces
export interface ProtocolConfig {
    rootPath: string;
}

export interface AgentContext {
    constitution: string;
    role: string;
    strategy: string;
    techStack: string;
}

/**
 * ContextLoader (formerly StarlightRuntime)
 *
 * Reads Starlight Protocol files from disk and concatenates them into
 * a structured agent context. This is a file loader / context assembler,
 * not an execution runtime.
 *
 * Usage:
 *   const loader = new ContextLoader({ rootPath: './starlight-protocol' });
 *   const ctx = loader.loadContext('DEPT_ENG', 'AGENT.md', 'STRATEGY.md');
 *   const prompt = loader.generateSystemPrompt(ctx);
 */
export class ContextLoader {
    private config: ProtocolConfig;

    constructor(config: ProtocolConfig) {
        this.config = config;
    }

    // Helper to read MD content
    public readMd(relativePath: string): string {
        try {
            const fullPath = path.join(this.config.rootPath, relativePath);
            if (fs.existsSync(fullPath)) {
                return fs.readFileSync(fullPath, 'utf-8');
            }
            return `[MISSING: ${relativePath}]`;
        } catch (e) {
            console.warn(`Starlight Warning: Could not read ${relativePath}`);
            return '';
        }
    }

    /**
     * Loads the active context for a specific Agent and Strategy.
     * Reads and concatenates the relevant protocol files.
     */
    public loadContext(dept: string, agentFile: string, strategyFile: string): AgentContext {
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
    public generateSystemPrompt(context: AgentContext): string {
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

/**
 * @deprecated Use ContextLoader instead. StarlightRuntime was renamed to
 * ContextLoader to accurately reflect that it loads/concatenates files
 * rather than executing code.
 */
export const StarlightRuntime = ContextLoader;
