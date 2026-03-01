import type { ToolExecutor, ToolDefinition } from '@arcanea/agent-runtime';

export const webbrowseToolDefinition: ToolDefinition = {
  type: 'function',
  function: {
    name: 'arcanea_web_browse',
    description: 'Arcanea built-in web browse tool',
    parameters: { type: 'object', properties: {} },
  },
};

export class webbrowseTool implements Partial<ToolExecutor> {
  async execute(_name: string, _args: Record<string, unknown>): Promise<string> {
    return JSON.stringify({ status: 'not_implemented', tool: 'web-browse' });
  }

  listAvailable(): ToolDefinition[] {
    return [webbrowseToolDefinition];
  }
}
