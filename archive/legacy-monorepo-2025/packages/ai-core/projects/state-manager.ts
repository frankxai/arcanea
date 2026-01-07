/**
 * Project State Manager
 * Manages project state persistence, snapshots, and restoration
 */

import {
  ProjectFlowState,
  ProjectFlowStatus,
  IntermediateResult,
} from '../types/projects';

export class ProjectStateManager {
  private states: Map<string, ProjectFlowState> = new Map();
  private snapshots: Map<string, ProjectSnapshot[]> = new Map();

  /**
   * Save project state
   */
  async saveState(state: ProjectFlowState): Promise<void> {
    this.states.set(state.projectId, { ...state });

    // Create automatic snapshot
    await this.createSnapshot(state.projectId, `Step ${state.currentStep}`, true);
  }

  /**
   * Load project state
   */
  async loadState(projectId: string): Promise<ProjectFlowState | null> {
    const state = this.states.get(projectId);
    return state ? { ...state } : null;
  }

  /**
   * Delete project state
   */
  async deleteState(projectId: string): Promise<void> {
    this.states.delete(projectId);
    this.snapshots.delete(projectId);
  }

  /**
   * Check if project exists
   */
  async hasState(projectId: string): Promise<boolean> {
    return this.states.has(projectId);
  }

  /**
   * Create manual snapshot
   */
  async createSnapshot(
    projectId: string,
    label: string,
    isAuto: boolean = false
  ): Promise<ProjectSnapshot> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    const snapshot: ProjectSnapshot = {
      id: this.generateSnapshotId(),
      projectId,
      label,
      state: { ...state },
      createdAt: new Date(),
      isAutomatic: isAuto,
    };

    // Get or create snapshots array
    let projectSnapshots = this.snapshots.get(projectId) || [];

    // Add new snapshot
    projectSnapshots.push(snapshot);

    // Limit automatic snapshots to last 10
    if (isAuto) {
      const autoSnapshots = projectSnapshots.filter(s => s.isAutomatic);
      if (autoSnapshots.length > 10) {
        const toRemove = autoSnapshots[0];
        projectSnapshots = projectSnapshots.filter(s => s.id !== toRemove.id);
      }
    }

    this.snapshots.set(projectId, projectSnapshots);

    return snapshot;
  }

  /**
   * List snapshots for project
   */
  async listSnapshots(projectId: string): Promise<ProjectSnapshot[]> {
    return this.snapshots.get(projectId) || [];
  }

  /**
   * Restore from snapshot
   */
  async restoreSnapshot(projectId: string, snapshotId: string): Promise<ProjectFlowState> {
    const projectSnapshots = this.snapshots.get(projectId);
    if (!projectSnapshots) {
      throw new Error(`No snapshots found for project ${projectId}`);
    }

    const snapshot = projectSnapshots.find(s => s.id === snapshotId);
    if (!snapshot) {
      throw new Error(`Snapshot ${snapshotId} not found`);
    }

    // Restore state
    const restoredState = { ...snapshot.state };
    await this.saveState(restoredState);

    return restoredState;
  }

  /**
   * Get project progress summary
   */
  async getProgressSummary(projectId: string): Promise<ProjectProgressSummary | null> {
    const state = await this.loadState(projectId);
    if (!state) return null;

    const stepProgress = (state.currentStep / state.totalSteps) * 100;
    const goalProgress = (state.completedGoals.length /
      (state.completedGoals.length + state.pendingGoals.length)) * 100;

    return {
      projectId,
      currentStep: state.currentStep,
      totalSteps: state.totalSteps,
      status: state.status,
      stepProgress: Math.round(stepProgress),
      goalProgress: Math.round(goalProgress),
      overallProgress: Math.round((stepProgress + goalProgress) / 2),
      assetsGenerated: state.generatedAssets.length,
      goalsCompleted: state.completedGoals.length,
      goalsPending: state.pendingGoals.length,
      startedAt: state.startedAt,
      lastActiveAt: state.lastActiveAt,
      estimatedTimeRemaining: state.estimatedTimeRemaining,
    };
  }

  /**
   * Update intermediate result
   */
  async addIntermediateResult(
    projectId: string,
    result: Omit<IntermediateResult, 'timestamp'>
  ): Promise<void> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    state.intermediateResults.push({
      ...result,
      timestamp: new Date(),
    });

    await this.saveState(state);
  }

  /**
   * Get user's active projects
   */
  async getUserActiveProjects(userId: string): Promise<ProjectFlowState[]> {
    const activeProjects: ProjectFlowState[] = [];

    for (const [_, state] of this.states) {
      if (
        state.userId === userId &&
        state.status !== ProjectFlowStatus.COMPLETED &&
        state.status !== ProjectFlowStatus.CANCELLED
      ) {
        activeProjects.push({ ...state });
      }
    }

    return activeProjects.sort(
      (a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime()
    );
  }

  /**
   * Get user's completed projects
   */
  async getUserCompletedProjects(userId: string): Promise<ProjectFlowState[]> {
    const completedProjects: ProjectFlowState[] = [];

    for (const [_, state] of this.states) {
      if (
        state.userId === userId &&
        state.status === ProjectFlowStatus.COMPLETED
      ) {
        completedProjects.push({ ...state });
      }
    }

    return completedProjects.sort(
      (a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0)
    );
  }

  /**
   * Pause project
   */
  async pauseProject(projectId: string): Promise<void> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    state.status = ProjectFlowStatus.PAUSED;
    await this.saveState(state);
  }

  /**
   * Resume project
   */
  async resumeProject(projectId: string): Promise<void> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    if (state.status !== ProjectFlowStatus.PAUSED) {
      throw new Error('Project is not paused');
    }

    state.status = ProjectFlowStatus.WAITING_FOR_INPUT;
    state.lastActiveAt = new Date();
    await this.saveState(state);
  }

  /**
   * Cancel project
   */
  async cancelProject(projectId: string): Promise<void> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    state.status = ProjectFlowStatus.CANCELLED;
    await this.saveState(state);
  }

  /**
   * Clean up old projects (for maintenance)
   */
  async cleanupOldProjects(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    let deletedCount = 0;

    for (const [projectId, state] of this.states) {
      if (
        state.status === ProjectFlowStatus.COMPLETED &&
        state.completedAt &&
        state.completedAt < cutoffDate
      ) {
        await this.deleteState(projectId);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  /**
   * Get project statistics
   */
  async getProjectStats(projectId: string): Promise<ProjectStats | null> {
    const state = await this.loadState(projectId);
    if (!state) return null;

    const duration = state.completedAt
      ? state.completedAt.getTime() - state.startedAt.getTime()
      : Date.now() - state.startedAt.getTime();

    const totalCost = state.generatedAssets.reduce((sum, asset) => sum + (asset.cost || 0), 0);

    return {
      duration: Math.round(duration / 1000 / 60), // minutes
      totalSteps: state.totalSteps,
      completedSteps: state.currentStep,
      conversationTurns: state.conversationHistory.length,
      assetsGenerated: state.generatedAssets.length,
      totalCost,
      status: state.status,
    };
  }

  /**
   * Export project state for backup
   */
  async exportProject(projectId: string): Promise<ProjectExport> {
    const state = await this.loadState(projectId);
    if (!state) {
      throw new Error(`Project ${projectId} not found`);
    }

    const snapshots = await this.listSnapshots(projectId);

    return {
      version: '1.0',
      exportedAt: new Date(),
      state,
      snapshots,
    };
  }

  /**
   * Import project state from backup
   */
  async importProject(exportData: ProjectExport): Promise<string> {
    const projectId = exportData.state.projectId;

    // Save state
    await this.saveState(exportData.state);

    // Restore snapshots
    if (exportData.snapshots && exportData.snapshots.length > 0) {
      this.snapshots.set(projectId, exportData.snapshots);
    }

    return projectId;
  }

  /**
   * Generate snapshot ID
   */
  private generateSnapshotId(): string {
    return `snap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ============ INTERFACES ============

export interface ProjectSnapshot {
  id: string;
  projectId: string;
  label: string;
  state: ProjectFlowState;
  createdAt: Date;
  isAutomatic: boolean;
}

export interface ProjectProgressSummary {
  projectId: string;
  currentStep: number;
  totalSteps: number;
  status: ProjectFlowStatus;
  stepProgress: number;
  goalProgress: number;
  overallProgress: number;
  assetsGenerated: number;
  goalsCompleted: number;
  goalsPending: number;
  startedAt: Date;
  lastActiveAt: Date;
  estimatedTimeRemaining?: number;
}

export interface ProjectStats {
  duration: number;
  totalSteps: number;
  completedSteps: number;
  conversationTurns: number;
  assetsGenerated: number;
  totalCost: number;
  status: ProjectFlowStatus;
}

export interface ProjectExport {
  version: string;
  exportedAt: Date;
  state: ProjectFlowState;
  snapshots: ProjectSnapshot[];
}

// Create singleton instance
export const projectStateManager = new ProjectStateManager();
