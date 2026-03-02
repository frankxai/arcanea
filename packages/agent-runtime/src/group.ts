import type { ChatMessage } from '@arcanea/model-runtime';
import type { Agent } from './agent';
import type { AgentGroupConfig, StreamEvent } from './types';

export class AgentGroup {
  readonly config: AgentGroupConfig;
  private agents: Map<string, Agent>;
  private supervisor: Agent;

  constructor(config: AgentGroupConfig, agents: Map<string, Agent>) {
    this.config = config;
    this.agents = agents;

    const sup = agents.get(config.supervisorId);
    if (!sup) {
      throw new Error(`Supervisor agent "${config.supervisorId}" not found in group`);
    }
    this.supervisor = sup;
  }

  async *chat(
    messages: ChatMessage[],
    options?: { signal?: AbortSignal; maxRounds?: number }
  ): AsyncIterable<StreamEvent> {
    const maxRounds = options?.maxRounds ?? 5;

    switch (this.config.routingStrategy) {
      case 'supervisor':
        yield* this.supervisorRoute(messages, maxRounds, options?.signal);
        break;
      case 'round-robin':
        yield* this.roundRobinRoute(messages, options?.signal);
        break;
      case 'parallel':
        yield* this.parallelRoute(messages, options?.signal);
        break;
    }
  }

  private async *supervisorRoute(
    messages: ChatMessage[],
    maxRounds: number,
    signal?: AbortSignal
  ): AsyncIterable<StreamEvent> {
    const routingPrompt = this.buildRoutingPrompt();
    const conversationHistory = [...messages];

    for (let round = 0; round < maxRounds; round++) {
      // Ask supervisor who should respond
      const routingMessages: ChatMessage[] = [
        { role: 'system', content: routingPrompt },
        ...conversationHistory,
        {
          role: 'user',
          content: `Based on the conversation, which agent should respond next? Available agents: ${
            this.config.members.map((m) => {
              const agent = this.agents.get(m.agentId);
              return `${m.agentId} (${agent?.config.name ?? 'unknown'})`;
            }).join(', ')
          }. Respond with ONLY the agent ID, or "DONE" if the conversation is complete.`,
        },
      ];

      const routingResponse = await this.supervisor.chat(routingMessages, { signal });
      const selectedAgentId = routingResponse.content.trim();

      if (selectedAgentId === 'DONE') {
        yield { type: 'done', agentId: this.supervisor.config.id, agentName: this.supervisor.config.name };
        return;
      }

      const selectedAgent = this.agents.get(selectedAgentId);
      if (!selectedAgent) {
        // Supervisor selected invalid agent, try the first non-supervisor member
        const fallback = this.config.members.find((m) => m.role !== 'supervisor');
        if (!fallback) break;
        const fallbackAgent = this.agents.get(fallback.agentId);
        if (!fallbackAgent) break;
        yield* this.delegateToAgent(fallbackAgent, conversationHistory, signal);
        break;
      }

      yield {
        type: 'agent_switch',
        agentId: this.supervisor.config.id,
        agentName: this.supervisor.config.name,
        nextAgentId: selectedAgentId,
      };

      yield* this.delegateToAgent(selectedAgent, conversationHistory, signal);
    }
  }

  private async *roundRobinRoute(
    messages: ChatMessage[],
    signal?: AbortSignal
  ): AsyncIterable<StreamEvent> {
    for (const member of this.config.members) {
      const agent = this.agents.get(member.agentId);
      if (!agent) continue;

      yield {
        type: 'agent_switch',
        agentId: agent.config.id,
        agentName: agent.config.name,
      };

      yield* this.delegateToAgent(agent, messages, signal);
    }
  }

  private async *parallelRoute(
    messages: ChatMessage[],
    signal?: AbortSignal
  ): AsyncIterable<StreamEvent> {
    // Run all agents in parallel, yield results as they come
    const promises = this.config.members.map(async (member) => {
      const agent = this.agents.get(member.agentId);
      if (!agent) return null;
      return agent.chat(messages, { signal });
    });

    const results = await Promise.allSettled(promises);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const member = this.config.members[i];
      const agent = this.agents.get(member.agentId);

      if (result.status === 'fulfilled' && result.value && agent) {
        yield {
          type: 'agent_switch',
          agentId: agent.config.id,
          agentName: agent.config.name,
        };
        yield {
          type: 'text_delta',
          agentId: agent.config.id,
          agentName: agent.config.name,
          delta: result.value.content,
        };
      }
    }

    yield {
      type: 'done',
      agentId: this.supervisor.config.id,
      agentName: this.supervisor.config.name,
    };
  }

  private async *delegateToAgent(
    agent: Agent,
    messages: ChatMessage[],
    signal?: AbortSignal
  ): AsyncIterable<StreamEvent> {
    for await (const event of agent.chatStream(messages, { signal })) {
      yield event;
    }
  }

  private buildRoutingPrompt(): string {
    const memberDescriptions = this.config.members
      .map((m) => {
        const agent = this.agents.get(m.agentId);
        return `- ${m.agentId}: ${agent?.config.name ?? 'Unknown'} (${m.role})`;
      })
      .join('\n');

    return `You are a supervisor agent coordinating a group of specialized agents.
Your job is to decide which agent should respond to the user's message.

Group: ${this.config.name}
${this.config.description ? `Description: ${this.config.description}` : ''}

Members:
${memberDescriptions}

Rules:
1. Route the message to the most appropriate agent based on expertise
2. If the conversation is complete and needs no further agent input, respond with "DONE"
3. Respond with ONLY the agent ID — no explanations`;
  }
}
