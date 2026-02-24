/**
 * Swarm Intelligence Module
 *
 * Multi-agent orchestration for complex tasks.
 */
import type { SwarmConfig, SwarmTask, SwarmSession, Agent, GuardianName } from '@arcanea/core';
export declare const DEFAULT_SWARM_CONFIG: SwarmConfig;
export declare const SISYPHUS: Agent;
export declare class SwarmManager {
    private sessions;
    private config;
    constructor(config?: Partial<SwarmConfig>);
    createSession(task: string): Promise<SwarmSession>;
    getSession(id: string): SwarmSession | undefined;
    addAgent(sessionId: string, agent: Agent): void;
    addTask(sessionId: string, task: SwarmTask): void;
    updateTaskStatus(sessionId: string, taskId: string, status: SwarmTask['status'], result?: unknown): void;
    completeSession(sessionId: string): void;
}
export declare function createGuardianAgent(guardianName: GuardianName): Agent;
export declare const swarmManager: SwarmManager;
//# sourceMappingURL=index.d.ts.map