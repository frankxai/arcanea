// Stub implementation for Project Flow Engine
export class ProjectFlowEngine {
  async startFlow(templateId: string, userId: string) {
    console.warn('ProjectFlowEngine.startFlow not yet implemented');
    return { projectId: 'mock-project-id', status: 'started' };
  }

  async continueFlow(projectId: string, input: any) {
    console.warn('ProjectFlowEngine.continueFlow not yet implemented');
    return { projectId, status: 'continuing' };
  }

  async completeFlow(projectId: string) {
    console.warn('ProjectFlowEngine.completeFlow not yet implemented');
    return { projectId, status: 'completed' };
  }
}

// Legacy object export for backward compatibility
export const projectFlowEngine = new ProjectFlowEngine();

export default projectFlowEngine;
