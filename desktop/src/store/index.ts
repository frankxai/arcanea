import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UIState,
  UserConfig,
  AppState,
  Agent,
  Prompt,
  Workflow,
  Skill,
  AppMetrics,
} from '../types';

interface ArcaneaStore extends AppState {
  // UI State
  ui: UIState;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: UIState['activeTab']) => void;
  setSelectedAgent: (agentId: string | null) => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setSelectedWorkflow: (workflowId: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setTheme: (theme: UIState['theme']) => void;
  setMode: (mode: UIState['mode']) => void;
  toggleSidebar: () => void;

  // Data State
  setAgents: (agents: Agent[]) => void;
  setPrompts: (prompts: Prompt[]) => void;
  setWorkflows: (workflows: Workflow[]) => void;
  setSkills: (skills: Skill[]) => void;
  addPrompt: (prompt: Prompt) => void;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;

  // Config State
  setConfig: (config: Partial<UserConfig>) => void;
  updateAIConfig: (aiConfig: Partial<UserConfig['ai']>) => void;
  updateUIConfig: (uiConfig: Partial<UserConfig['ui']>) => void;

  // Metrics
  incrementInvocations: () => void;
  incrementCacheHits: () => void;
  incrementCacheMisses: () => void;
  updateAvgExecutionTime: (time: number) => void;
  incrementErrors: () => void;
  incrementWorkflowsCompleted: () => void;
  incrementWorkflowsFailed: () => void;

  // Cache
  getCached: <T>(key: string) => T | undefined;
  setCached: <T>(key: string, value: T, ttl?: number) => void;
  clearCache: () => void;
}

const defaultConfig: UserConfig = {
  ai: {
    primary: 'hybrid',
    hybrid: {
      enabled: true,
      thresholds: {
        simple: 0.3,
        medium: 0.7,
      },
    },
  },
  ui: {
    mode: 'arcane',
    theme: 'dark',
    sidebarOpen: true,
    fontSize: 'medium',
  },
  cache: {
    enabled: true,
    maxSize: 1000,
    ttl: 3600000, // 1 hour
  },
};

const defaultMetrics: AppMetrics = {
  totalInvocations: 0,
  cacheHits: 0,
  cacheMisses: 0,
  avgExecutionTime: 0,
  errors: 0,
  workflowsCompleted: 0,
  workflowsFailed: 0,
};

export const useArcaneaStore = create<ArcaneaStore>()(
  persist(
    (set, get) => ({
      // Initial State
      agents: [],
      prompts: [],
      workflows: [],
      skills: [],
      config: defaultConfig,
      cache: new Map(),
      metrics: defaultMetrics,
      ui: {
        sidebarOpen: true,
        activeTab: 'prompts',
        selectedAgent: null,
        selectedPrompt: null,
        selectedWorkflow: null,
        isLoading: false,
        error: null,
        theme: 'dark',
        mode: 'arcane',
      },

      // UI Actions
      setSidebarOpen: (open) =>
        set((state) => ({ ui: { ...state.ui, sidebarOpen: open } })),

      setActiveTab: (tab) =>
        set((state) => ({ ui: { ...state.ui, activeTab: tab } })),

      setSelectedAgent: (agentId) =>
        set((state) => ({ ui: { ...state.ui, selectedAgent: agentId } })),

      setSelectedPrompt: (prompt) =>
        set((state) => ({ ui: { ...state.ui, selectedPrompt: prompt } })),

      setSelectedWorkflow: (workflowId) =>
        set((state) => ({ ui: { ...state.ui, selectedWorkflow: workflowId } })),

      setLoading: (loading) =>
        set((state) => ({ ui: { ...state.ui, isLoading: loading } })),

      setError: (error) =>
        set((state) => ({ ui: { ...state.ui, error } })),

      setTheme: (theme) =>
        set((state) => ({
          ui: { ...state.ui, theme },
          config: { ...state.config, ui: { ...state.config.ui, theme } },
        })),

      setMode: (mode) =>
        set((state) => ({
          ui: { ...state.ui, mode },
          config: { ...state.config, ui: { ...state.config.ui, mode } },
        })),

      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        })),

      // Data Actions
      setAgents: (agents) => set({ agents }),
      setPrompts: (prompts) => set({ prompts }),
      setWorkflows: (workflows) => set({ workflows }),
      setSkills: (skills) => set({ skills }),

      addPrompt: (prompt) =>
        set((state) => ({ prompts: [prompt, ...state.prompts] })),

      updatePrompt: (id, updates) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),

      deletePrompt: (id) =>
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
        })),

      // Config Actions
      setConfig: (config) =>
        set((state) => ({ config: { ...state.config, ...config } })),

      updateAIConfig: (aiConfig) =>
        set((state) => ({
          config: { ...state.config, ai: { ...state.config.ai, ...aiConfig } },
        })),

      updateUIConfig: (uiConfig) =>
        set((state) => ({
          config: { ...state.config, ui: { ...state.config.ui, ...uiConfig } },
        })),

      // Metrics Actions
      incrementInvocations: () =>
        set((state) => ({
          metrics: { ...state.metrics, totalInvocations: state.metrics.totalInvocations + 1 },
        })),

      incrementCacheHits: () =>
        set((state) => ({
          metrics: { ...state.metrics, cacheHits: state.metrics.cacheHits + 1 },
        })),

      incrementCacheMisses: () =>
        set((state) => ({
          metrics: { ...state.metrics, cacheMisses: state.metrics.cacheMisses + 1 },
        })),

      updateAvgExecutionTime: (time) =>
        set((state) => {
          const { totalInvocations, avgExecutionTime } = state.metrics;
          const newAvg =
            (avgExecutionTime * totalInvocations + time) / (totalInvocations + 1);
          return {
            metrics: { ...state.metrics, avgExecutionTime: newAvg },
          };
        }),

      incrementErrors: () =>
        set((state) => ({
          metrics: { ...state.metrics, errors: state.metrics.errors + 1 },
        })),

      incrementWorkflowsCompleted: () =>
        set((state) => ({
          metrics: {
            ...state.metrics,
            workflowsCompleted: state.metrics.workflowsCompleted + 1,
          },
        })),

      incrementWorkflowsFailed: () =>
        set((state) => ({
          metrics: {
            ...state.metrics,
            workflowsFailed: state.metrics.workflowsFailed + 1,
          },
        })),

      // Cache Actions
      getCached: <T>(key: string): T | undefined => {
        const { cache, config } = get();
        const entry = cache.get(key);
        if (!entry) return undefined;
        
        if (config.cache.enabled && entry.expires && Date.now() > entry.expires) {
          cache.delete(key);
          return undefined;
        }
        
        return entry.value as T;
      },

      setCached: <T>(key: string, value: T, ttl?: number) => {
        const { cache, config } = get();
        const expires = ttl || config.cache.ttl ? Date.now() + (ttl || config.cache.ttl) : undefined;
        
        if (cache.size >= config.cache.maxSize) {
          const firstKey = cache.keys().next().value;
          if (firstKey) {
            cache.delete(firstKey);
          }
        }
        
        cache.set(key, { value, expires });
        set({ cache: new Map(cache) });
      },

      clearCache: () => set({ cache: new Map() }),
    }),
    {
      name: 'arcanea-storage',
      partialize: (state) => ({
        config: state.config,
        metrics: state.metrics,
        ui: {
          theme: state.ui.theme,
          mode: state.ui.mode,
          sidebarOpen: state.ui.sidebarOpen,
        },
      }),
    }
  )
);
