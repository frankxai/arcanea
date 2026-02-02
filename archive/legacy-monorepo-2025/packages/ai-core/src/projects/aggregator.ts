// Stub implementation for Project Aggregator
export const projectAggregator = {
  aggregateResults: async (projectId: string) => {
    console.warn('projectAggregator.aggregateResults not yet implemented');
    return { projectId, results: [] };
  },

  combineEssences: async (essenceIds: string[]) => {
    console.warn('projectAggregator.combineEssences not yet implemented');
    return { combined: true, essenceIds };
  }
};

export default projectAggregator;
