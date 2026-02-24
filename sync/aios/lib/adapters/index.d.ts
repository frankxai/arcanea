/**
 * Platform Adapters
 *
 * Unified interface for different AI platforms.
 */
import type { PlatformType, PlatformConfig } from '@arcanea/core';
export interface BaseAdapter {
    type: PlatformType;
    name: string;
    isAvailable(): Promise<boolean>;
    initialize(config: PlatformConfig): Promise<void>;
    execute(prompt: string, context?: Record<string, unknown>): Promise<string>;
}
export declare class ClaudeAdapter implements BaseAdapter {
    type: PlatformType;
    name: string;
    private config?;
    isAvailable(): Promise<boolean>;
    initialize(config: PlatformConfig): Promise<void>;
    execute(prompt: string, _context?: Record<string, unknown>): Promise<string>;
}
export declare class GeminiAdapter implements BaseAdapter {
    type: PlatformType;
    name: string;
    private config?;
    isAvailable(): Promise<boolean>;
    initialize(config: PlatformConfig): Promise<void>;
    execute(prompt: string, _context?: Record<string, unknown>): Promise<string>;
}
export declare class OpenCodeAdapter implements BaseAdapter {
    type: PlatformType;
    name: string;
    private config?;
    isAvailable(): Promise<boolean>;
    initialize(config: PlatformConfig): Promise<void>;
    execute(prompt: string, _context?: Record<string, unknown>): Promise<string>;
}
export declare class CodexAdapter implements BaseAdapter {
    type: PlatformType;
    name: string;
    private config?;
    isAvailable(): Promise<boolean>;
    initialize(config: PlatformConfig): Promise<void>;
    execute(prompt: string, _context?: Record<string, unknown>): Promise<string>;
}
export declare function getAdapter(platform: PlatformType): BaseAdapter | undefined;
export declare function getAvailableAdapters(): Promise<BaseAdapter[]>;
export declare function registerAdapter(adapter: BaseAdapter): void;
//# sourceMappingURL=index.d.ts.map