import type { ToolExecutor, ToolDefinition } from '@arcanea/agent-runtime';

export const knowledgebaseToolDefinition: ToolDefinition = {
  type: 'function',
  function: {
    name: 'arcanea_knowledge_base',
    description: 'Arcanea built-in knowledge base tool',
    parameters: { type: 'object', properties: {} },
  },
};

export class knowledgebaseTool implements Partial<ToolExecutor> {
  async execute(_name: string, _args: Record<string, unknown>): Promise<string> {
    return JSON.stringify({ status: 'not_implemented', tool: 'knowledge-base' });
  }

  listAvailable(): ToolDefinition[] {
    return [knowledgebaseToolDefinition];
  }
}
