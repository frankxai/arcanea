import type { ToolExecutor, ToolDefinition } from '@arcanea/agent-runtime';

export const memoryToolDefinition: ToolDefinition = {
  type: 'function',
  function: {
    name: 'arcanea_memory',
    description: 'Arcanea built-in memory tool',
    parameters: { type: 'object', properties: {} },
  },
};

export class memoryTool implements Partial<ToolExecutor> {
  async execute(_name: string, _args: Record<string, unknown>): Promise<string> {
    return JSON.stringify({ status: 'not_implemented', tool: 'memory' });
  }

  listAvailable(): ToolDefinition[] {
    return [memoryToolDefinition];
  }
}
