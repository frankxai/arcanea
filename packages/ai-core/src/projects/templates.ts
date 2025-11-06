// Stub implementation for Project Templates
export function getTemplateById(id: string) {
  console.warn('getTemplateById not yet implemented');
  return {
    id,
    name: 'Mock Template',
    description: 'Placeholder template',
    steps: []
  };
}

export function getTemplateBySlug(slug: string) {
  console.warn('getTemplateBySlug not yet implemented');
  return {
    id: slug,
    name: 'Mock Template',
    description: 'Placeholder template',
    steps: []
  };
}

export function listTemplates() {
  console.warn('listTemplates not yet implemented');
  return [];
}

// Legacy object export for backward compatibility
export const projectTemplates = {
  getTemplate: getTemplateById,
  listTemplates
};

export default projectTemplates;
