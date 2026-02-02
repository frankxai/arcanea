// Arcanea Agent Orchestrator
// Inspired by Sisyphus from oh-my-opencode
// Coordinates multi-agent creative sessions

import {
  AgentTask,
  AgentContext,
  AgentStatus,
  WorldState,
  WorldMaturity,
  OrchestratorDecision,
  CreativeSession,
  matchCreativeSkill,
} from "./types.js";
import { AGENTS, getAgent } from "./definitions.js";
import { getGraphSummary } from "../tools/creation-graph.js";
import { getSessionSummary, getOrCreateSession } from "../memory/index.js";

// Task queue for background execution
const taskQueue: Map<string, AgentTask> = new Map();
const activeSessions: Map<string, CreativeSession> = new Map();

/**
 * Assess the current state of the creative world
 * Used to determine how to handle requests
 */
export function assessWorldState(sessionId: string): WorldState {
  const graphSummary = getGraphSummary(sessionId);
  const sessionSummary = getSessionSummary(sessionId);
  const session = getOrCreateSession(sessionId);

  // Determine maturity
  let maturity: WorldMaturity;
  if (graphSummary.nodeCount === 0) {
    maturity = WorldMaturity.VIRGIN;
  } else if (graphSummary.nodeCount < 10) {
    maturity = WorldMaturity.EMERGING;
  } else if (graphSummary.nodeCount < 50) {
    maturity = WorldMaturity.DEVELOPING;
  } else if (graphSummary.nodeCount < 100) {
    maturity = WorldMaturity.RICH;
  } else {
    maturity = WorldMaturity.EPIC;
  }

  // Get elements used
  const elementsUsed = Object.keys(graphSummary.nodesByElement);

  return {
    maturity,
    creationCount: graphSummary.nodeCount,
    connectionCount: graphSummary.edgeCount,
    elementsUsed,
    housesUsed: [], // Would need to track this in graph
    gatesExplored: session.gatesExplored,
    luminorsConsulted: session.luminorsConsulted,
  };
}

/**
 * Phase 0: Intent Gate
 * Check if request matches a skill and should be routed immediately
 */
export function intentGate(request: string): OrchestratorDecision | null {
  const skill = matchCreativeSkill(request);

  if (skill) {
    return {
      phase: "intent",
      action: `route_to_skill:${skill.name}`,
      agents: [skill.agent],
      parallel: false,
      reasoning: `Request matches "${skill.name}" skill. Routing directly to ${skill.agent}.`,
    };
  }

  return null; // Continue to assessment phase
}

/**
 * Phase 1: Assessment
 * Evaluate request against world state
 */
export function assessRequest(
  request: string,
  worldState: WorldState
): OrchestratorDecision {
  const lower = request.toLowerCase();

  // Determine primary intent
  const isGeneration = /generat|creat|design|make|build|forge/.test(lower);
  const isCoaching = /stuck|block|help|can't|overwhelm|fear|perfect/.test(lower);
  const isResearch = /find|search|connect|relat|path|explore/.test(lower);
  const isNarrative = /story|narrative|write|expand|tell/.test(lower);

  // Determine agents needed based on intent and world state
  let agents: string[] = [];
  let parallel = false;
  let action = "";

  if (isCoaching) {
    agents = ["luminor-council"];
    action = "creative_coaching";
  } else if (isGeneration) {
    // For generation, behavior varies by world maturity
    switch (worldState.maturity) {
      case WorldMaturity.VIRGIN:
        // Start with foundation - suggest character + location
        agents = ["worldsmith", "seer"];
        action = "foundation_generation";
        parallel = true;
        break;
      case WorldMaturity.EMERGING:
        // Encourage connections
        agents = ["worldsmith", "seer"];
        action = "connected_generation";
        parallel = true;
        break;
      default:
        agents = ["worldsmith"];
        action = "standard_generation";
    }
  } else if (isResearch) {
    agents = ["seer"];
    action = "world_research";
  } else if (isNarrative) {
    agents = ["scribe", "seer"];
    action = "narrative_development";
    parallel = true;
  } else {
    // Default to seer for analysis
    agents = ["seer"];
    action = "general_analysis";
  }

  return {
    phase: "assessment",
    action,
    agents,
    parallel,
    reasoning: `World maturity: ${worldState.maturity}. Primary intent: ${action}. Delegating to: ${agents.join(", ")}.`,
  };
}

/**
 * Phase 2: Delegation
 * Create tasks for agents to execute
 */
export function createAgentTasks(
  decision: OrchestratorDecision,
  request: string,
  sessionId: string
): AgentTask[] {
  const tasks: AgentTask[] = [];

  for (const agentId of decision.agents) {
    const agent = getAgent(agentId);
    if (!agent) continue;

    const task: AgentTask = {
      id: `${sessionId}-${agentId}-${Date.now()}`,
      agentId,
      type: decision.action,
      input: {
        request,
        sessionId,
        decision: decision.reasoning,
      },
      status: "thinking",
      startedAt: new Date(),
    };

    tasks.push(task);
    taskQueue.set(task.id, task);
  }

  return tasks;
}

/**
 * Execute a single agent task
 * In a real implementation, this would call the actual model
 */
export async function executeAgentTask(task: AgentTask): Promise<AgentTask> {
  const agent = getAgent(task.agentId);
  if (!agent) {
    task.status = "failed";
    task.error = `Unknown agent: ${task.agentId}`;
    return task;
  }

  task.status = "working";

  try {
    // In production, this would:
    // 1. Build the prompt using agent.systemPrompt + task.input
    // 2. Call the appropriate model (agent.model)
    // 3. Parse and validate the response
    // 4. Return structured result

    // For now, return a placeholder that shows the architecture
    const result = {
      agentId: task.agentId,
      agentName: agent.displayName,
      model: agent.model,
      action: task.type,
      message: `[${agent.displayName}] would process: "${task.input.request}"`,
      capabilities: agent.capabilities.map(c => c.name),
      wouldDelegate: agent.role === "orchestrator",
    };

    task.status = "completed";
    task.completedAt = new Date();
    task.result = result;
  } catch (error) {
    task.status = "failed";
    task.error = error instanceof Error ? error.message : String(error);
  }

  taskQueue.set(task.id, task);
  return task;
}

/**
 * Execute tasks in parallel when allowed
 */
export async function executeTasks(
  tasks: AgentTask[],
  parallel: boolean
): Promise<AgentTask[]> {
  if (parallel) {
    return Promise.all(tasks.map(t => executeAgentTask(t)));
  } else {
    const results: AgentTask[] = [];
    for (const task of tasks) {
      results.push(await executeAgentTask(task));
    }
    return results;
  }
}

/**
 * Phase 3: Synthesis
 * Combine results from multiple agents
 */
export function synthesizeResults(
  tasks: AgentTask[],
  worldState: WorldState
): {
  success: boolean;
  results: any[];
  synthesis: string;
  suggestions: string[];
} {
  const completedTasks = tasks.filter(t => t.status === "completed");
  const failedTasks = tasks.filter(t => t.status === "failed");

  const results = completedTasks.map(t => t.result);

  // Generate synthesis based on what was accomplished
  let synthesis = "";
  const suggestions: string[] = [];

  if (failedTasks.length > 0) {
    synthesis = `Completed ${completedTasks.length}/${tasks.length} tasks. Some agents encountered issues.`;
  } else {
    synthesis = `All ${tasks.length} agents completed successfully.`;
  }

  // Add world-state aware suggestions
  switch (worldState.maturity) {
    case WorldMaturity.VIRGIN:
      suggestions.push("Your world is just beginning. Consider creating a founding character and their home.");
      break;
    case WorldMaturity.EMERGING:
      suggestions.push("Your world is growing. Try connecting your creations with relationships.");
      break;
    case WorldMaturity.DEVELOPING:
      suggestions.push("Your world has depth. Consider developing narrative threads between characters.");
      break;
    case WorldMaturity.RICH:
      suggestions.push("Your world is rich. Look for patterns and emergent stories in your Creation Graph.");
      break;
    case WorldMaturity.EPIC:
      suggestions.push("Your world is epic. Consider documenting its history and major events.");
      break;
  }

  return {
    success: failedTasks.length === 0,
    results,
    synthesis,
    suggestions,
  };
}

/**
 * Main orchestration function
 * Runs the full creative session
 */
export async function orchestrateCreativeSession(
  request: string,
  sessionId: string = "default"
): Promise<{
  session: CreativeSession;
  result: any;
}> {
  // Create session
  const session: CreativeSession = {
    id: `session-${Date.now()}`,
    goal: request,
    orchestrator: "creator",
    agents: [],
    tasks: [],
    state: "planning",
    startedAt: new Date(),
  };
  activeSessions.set(session.id, session);

  // Phase 0: Intent Gate
  const intentDecision = intentGate(request);
  if (intentDecision) {
    // Fast-path: route directly to skill
    const tasks = createAgentTasks(intentDecision, request, sessionId);
    session.tasks = tasks;
    session.agents = intentDecision.agents;
    session.state = "executing";

    const executedTasks = await executeTasks(tasks, intentDecision.parallel);
    session.tasks = executedTasks;
    session.state = "complete";
    session.completedAt = new Date();

    return {
      session,
      result: {
        phase: "intent_gate",
        decision: intentDecision,
        tasks: executedTasks,
      },
    };
  }

  // Phase 1: Assessment
  const worldState = assessWorldState(sessionId);
  const assessmentDecision = assessRequest(request, worldState);
  session.agents = assessmentDecision.agents;

  // Phase 2: Delegation
  session.state = "executing";
  const tasks = createAgentTasks(assessmentDecision, request, sessionId);
  session.tasks = tasks;

  const executedTasks = await executeTasks(tasks, assessmentDecision.parallel);
  session.tasks = executedTasks;

  // Phase 3: Synthesis
  session.state = "synthesizing";
  const synthesis = synthesizeResults(executedTasks, worldState);

  session.state = "complete";
  session.completedAt = new Date();
  session.result = synthesis;

  return {
    session,
    result: {
      worldState,
      decision: assessmentDecision,
      tasks: executedTasks,
      synthesis,
    },
  };
}

/**
 * Get status of a running session
 */
export function getSessionStatus(sessionId: string): CreativeSession | undefined {
  return activeSessions.get(sessionId);
}

/**
 * Get all active sessions
 */
export function getActiveSessions(): CreativeSession[] {
  return Array.from(activeSessions.values()).filter(
    s => s.state !== "complete" && s.state !== "failed"
  );
}

/**
 * Get task by ID
 */
export function getTask(taskId: string): AgentTask | undefined {
  return taskQueue.get(taskId);
}

/**
 * Cancel a running task
 */
export function cancelTask(taskId: string): boolean {
  const task = taskQueue.get(taskId);
  if (task && task.status !== "completed" && task.status !== "failed") {
    task.status = "failed";
    task.error = "Cancelled by user";
    return true;
  }
  return false;
}
