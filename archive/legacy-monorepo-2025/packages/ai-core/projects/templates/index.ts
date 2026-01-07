/**
 * Project Templates Index
 * Export all available project templates
 */

import { ProjectTemplate } from '../../types/projects';
import { characterDesignTemplate } from './character-design';
import { worldBuildingTemplate } from './world-building';
import { storyCreationTemplate } from './story-creation';
import { musicCompositionTemplate } from './music-composition';
import { visualSeriesTemplate } from './visual-series';

export const projectTemplates: ProjectTemplate[] = [
  characterDesignTemplate,
  worldBuildingTemplate,
  storyCreationTemplate,
  musicCompositionTemplate,
  visualSeriesTemplate,
];

export const projectTemplatesMap = new Map(
  projectTemplates.map(template => [template.slug, template])
);

export function getTemplateBySlug(slug: string): ProjectTemplate | undefined {
  return projectTemplatesMap.get(slug);
}

export function getTemplateById(id: string): ProjectTemplate | undefined {
  return projectTemplates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): ProjectTemplate[] {
  return projectTemplates.filter(t => t.category === category);
}

export function getTemplatesByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ProjectTemplate[] {
  return projectTemplates.filter(t => t.difficulty === difficulty);
}

export {
  characterDesignTemplate,
  worldBuildingTemplate,
  storyCreationTemplate,
  musicCompositionTemplate,
  visualSeriesTemplate,
};
