export type MCPTransport = 'stdio' | 'sse' | 'websocket';

export interface MCPServerConfig {
  id: string;
  name: string;
  description?: string;
  transport: MCPTransport;
  endpoint: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  icon?: string;
  category?: string;
  healthCheckInterval?: number;
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  serverId: string;
  serverName: string;
}

export interface MCPToolResult {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export type MCPServerStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface MCPServerState {
  config: MCPServerConfig;
  status: MCPServerStatus;
  tools: MCPTool[];
  resources: MCPResource[];
  error?: string;
  lastConnected?: Date;
}
