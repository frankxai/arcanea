/**
 * Arcanea Overlay Types
 * Type definitions for the auth + overlay system.
 */

export type ProviderType = 'claude' | 'openai' | 'gemini' | 'copilot' | 'opencode';

export type OverlayLevel = 'minimal' | 'standard' | 'full' | 'luminor';

export type OverlayCapability =
  | 'system-prompt'
  | 'slash-commands'
  | 'skills'
  | 'agents'
  | 'mcp-servers'
  | 'hooks'
  | 'custom-gpt'
  | 'assistants-api'
  | 'plugins'
  | 'vision'
  | 'file-injection'
  | 'workspace-context';

export interface AuthSession {
  provider: ProviderType;
  validated: boolean;
  accountId?: string;
  accountName?: string;
  models: string[];
  capabilities: string[];
  expiresAt?: string;
}

export interface AuthAdapter {
  provider: ProviderType;
  displayName: string;
  validate(credential: string): Promise<AuthSession>;
  detectFromEnv(): Promise<AuthSession | null>;
  envVarNames(): string[];
  getSetupUrl(): string;
}

export interface Keystore {
  save(provider: ProviderType, credential: string): Promise<void>;
  load(provider: ProviderType): Promise<string | null>;
  delete(provider: ProviderType): Promise<void>;
  list(): Promise<ProviderType[]>;
}

export interface OverlayConfig {
  version: string;
  provider: ProviderType;
  level: OverlayLevel;
  guardianDefault?: string;
  enabledSkills: string[];
  enabledAgents: string[];
  customPersonality?: string;
  mcpServers?: Record<string, MCPServerConfig>;
  installedAt: string;
  updatedAt: string;
}

export interface MCPServerConfig {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  type?: 'http' | 'sse' | 'stdio';
  url?: string;
  description?: string;
}

export interface ToolDetection {
  provider: ProviderType;
  detected: boolean;
  version?: string;
  configPath?: string;
  existingOverlay?: OverlayConfig;
}

export interface OverlayManifest {
  provider: ProviderType;
  name: string;
  version: string;
  supportedLevels: OverlayLevel[];
  capabilities: OverlayCapability[];
}

export interface InstallResult {
  success: boolean;
  filesCreated: string[];
  filesModified: string[];
  warnings: string[];
  nextSteps: string[];
}

export interface InstallPreview {
  filesToCreate: Array<{ path: string; description: string }>;
  filesToModify: Array<{ path: string; description: string }>;
  estimatedSize: string;
}

export interface OverlayInstaller {
  canInstall(projectDir: string): Promise<boolean>;
  detect(projectDir: string): Promise<ToolDetection>;
  install(projectDir: string, level: OverlayLevel, config?: Partial<OverlayConfig>): Promise<InstallResult>;
  update(projectDir: string): Promise<InstallResult>;
  uninstall(projectDir: string): Promise<void>;
  getManifest(): OverlayManifest;
  preview(projectDir: string, level: OverlayLevel): Promise<InstallPreview>;
}

export interface OverlayManifestFile {
  arcanea: {
    coreVersion: string;
    installedAt: string;
    updatedAt: string;
  };
  overlays: Partial<Record<ProviderType, {
    packageVersion: string;
    level: OverlayLevel;
    installedAt: string;
    updatedAt: string;
    filesManaged: string[];
    filesCustomized: string[];
  }>>;
}

export interface LevelDefinition {
  level: OverlayLevel;
  description: string;
  includes: {
    personality: boolean;
    guardians: boolean;
    skills: boolean;
    agents: boolean;
    mcpServers: boolean;
    commands: boolean;
    lore: boolean;
    designSystem: boolean;
  };
}

export const PROVIDER_CAPABILITIES: Record<ProviderType, OverlayCapability[]> = {
  claude: ['system-prompt', 'slash-commands', 'skills', 'agents', 'mcp-servers', 'hooks', 'file-injection', 'workspace-context'],
  openai: ['system-prompt', 'custom-gpt', 'assistants-api', 'vision'],
  gemini: ['system-prompt', 'vision'],
  copilot: ['system-prompt', 'file-injection', 'workspace-context'],
  opencode: ['system-prompt', 'slash-commands', 'skills', 'agents', 'mcp-servers', 'hooks', 'plugins', 'file-injection'],
};

export const OVERLAY_LEVELS: LevelDefinition[] = [
  {
    level: 'minimal',
    description: 'Voice and personality injection only',
    includes: { personality: true, guardians: false, skills: false, agents: false, mcpServers: false, commands: false, lore: false, designSystem: false },
  },
  {
    level: 'standard',
    description: 'Voice + Guardian routing + 4 core skills',
    includes: { personality: true, guardians: true, skills: true, agents: false, mcpServers: false, commands: false, lore: false, designSystem: false },
  },
  {
    level: 'full',
    description: 'Everything: skills, agents, commands, MCP servers',
    includes: { personality: true, guardians: true, skills: true, agents: true, mcpServers: true, commands: true, lore: false, designSystem: false },
  },
  {
    level: 'luminor',
    description: 'The complete Arcanea OS with full lore and design system',
    includes: { personality: true, guardians: true, skills: true, agents: true, mcpServers: true, commands: true, lore: true, designSystem: true },
  },
];
