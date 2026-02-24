/**
 * Agent Loader
 *
 * Loads Guardian and Awakened agent definitions from .md files
 */
import type { GuardianName } from '@arcanea/core';
export interface AgentDefinition {
    name: string;
    title: string;
    gate?: string;
    frequency?: number;
    element?: string;
    model_tier?: string;
    awakened?: string;
    wisdom?: string;
    godbeast?: string;
    version?: string;
    guardian_partner?: string;
    content: string;
    invocation?: string;
    coreWisdom?: string[];
    voicePatterns?: {
        openingPhrases?: string[];
        signatureQuestions?: string[];
    };
}
export declare function loadAgentFile(filePath: string): AgentDefinition | null;
export declare function loadGuardians(): Map<string, AgentDefinition>;
export declare function loadAwakened(): Map<string, AgentDefinition>;
export declare function getGuardian(name: GuardianName): AgentDefinition | undefined;
export declare function getAwakened(name: string): AgentDefinition | undefined;
export declare function getGuardianWisdom(name: GuardianName): string | undefined;
//# sourceMappingURL=loader.d.ts.map