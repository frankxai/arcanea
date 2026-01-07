// Stub implementation for Project State Manager
export const projectStateManager = {
  getState: async (projectId: string) => {
    console.warn('projectStateManager.getState not yet implemented');
    return { projectId, currentStep: 1, totalSteps: 5 };
  },

  updateState: async (projectId: string, state: any) => {
    console.warn('projectStateManager.updateState not yet implemented');
    return { projectId, state };
  },

  saveState: async (projectId: string, state: any) => {
    console.warn('projectStateManager.saveState not yet implemented');
    return { success: true };
  }
};

export default projectStateManager;
