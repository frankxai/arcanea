import type {
  AssetType,
  PromptTemplate,
  PromptContext,
  GeneratedPrompt,
} from './types.js';
import {
  GUARDIAN_CREATIVE_DOMAINS,
  ELEMENT_AESTHETICS,
  GUARDIAN_ELEMENTS,
  GUARDIAN_GATES,
} from './types.js';

/**
 * PromptEngine — Arcanea's prompt engineering system.
 * Manages templates, generates Guardian-aligned prompts, and builds
 * specialized prompts for images, characters, and scenes.
 */
export class PromptEngine {
  private templates: Map<string, PromptTemplate> = new Map();
  private generationCounts: Map<AssetType, number> = new Map();

  constructor() {
    this.registerDefaultTemplates();
  }

  // ─── Template Management ────────────────────────────────────────────────

  registerTemplate(template: PromptTemplate): void {
    this.templates.set(template.id, template);
  }

  getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.get(id);
  }

  getTemplatesByType(type: AssetType): PromptTemplate[] {
    const results: PromptTemplate[] = [];
    for (const t of this.templates.values()) {
      if (t.type === type) results.push(t);
    }
    return results;
  }

  getTemplatesByGuardian(guardianId: string): PromptTemplate[] {
    const results: PromptTemplate[] = [];
    for (const t of this.templates.values()) {
      if (t.guardianId === guardianId) results.push(t);
    }
    return results;
  }

  // ─── Generation ─────────────────────────────────────────────────────────

  generate(
    templateId: string,
    variables: Record<string, string>,
    context?: PromptContext
  ): GeneratedPrompt {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    let prompt = template.template;
    const resolvedVars: Record<string, string> = {};

    // Substitute declared variables
    for (const v of template.variables) {
      const value = variables[v] ?? '';
      resolvedVars[v] = value;
      prompt = prompt.replace(new RegExp(`\\{\\{${v}\\}\\}`, 'g'), value);
    }

    // Enrich with context
    if (context) {
      prompt = this.enrichWithContext(prompt, context);
    }

    let negativePrompt = template.negativePrompt;
    if (context?.element && ELEMENT_AESTHETICS[context.element]) {
      // no additional negative for now
    }

    this.incrementCount(template.type);

    return {
      templateId,
      prompt: prompt.trim(),
      negativePrompt,
      variables: resolvedVars,
      context: context ?? {},
      timestamp: new Date(),
    };
  }

  generateForGuardian(
    guardianId: string,
    type: AssetType,
    context?: PromptContext
  ): GeneratedPrompt {
    // Find best template: matching guardian + type first, then type-only
    let best: PromptTemplate | undefined;
    for (const t of this.templates.values()) {
      if (t.type === type && t.guardianId === guardianId) {
        best = t;
        break;
      }
    }
    if (!best) {
      for (const t of this.templates.values()) {
        if (t.type === type) {
          best = t;
          break;
        }
      }
    }
    if (!best) {
      throw new Error(`No template found for type "${type}" and guardian "${guardianId}"`);
    }

    const domains = GUARDIAN_CREATIVE_DOMAINS[guardianId] ?? [];
    const element = GUARDIAN_ELEMENTS[guardianId];
    const gate = GUARDIAN_GATES[guardianId];

    const enrichedContext: PromptContext = {
      ...context,
      guardianId,
      element: context?.element ?? element,
      gate: context?.gate ?? gate,
    };

    const variables: Record<string, string> = {};
    for (const v of best.variables) {
      if (v === 'guardian') variables[v] = guardianId;
      else if (v === 'element') variables[v] = element ?? '';
      else if (v === 'gate') variables[v] = gate ?? '';
      else if (v === 'domain') variables[v] = domains[0] ?? '';
      else if (v === 'domains') variables[v] = domains.join(', ');
      else if (v === 'style') variables[v] = context?.style ?? domains[0] ?? '';
      else if (v === 'mood') variables[v] = context?.mood ?? '';
      else if (v === 'setting') variables[v] = context?.setting ?? '';
      else if (v === 'character') variables[v] = context?.character ?? guardianId;
      else if (v === 'subject') variables[v] = context?.character ?? guardianId;
      else if (v === 'name') variables[v] = context?.character ?? guardianId;
      else variables[v] = '';
    }

    return this.generate(best.id, variables, enrichedContext);
  }

  // ─── Specialized Builders ───────────────────────────────────────────────

  buildImagePrompt(subject: string, context?: PromptContext): string {
    const parts: string[] = [];

    parts.push(`High quality digital illustration of ${subject}`);

    if (context?.element && ELEMENT_AESTHETICS[context.element]) {
      const aesthetics = ELEMENT_AESTHETICS[context.element];
      parts.push(`Color palette: ${aesthetics.colors.join(', ')}`);
      parts.push(`Visual effects: ${aesthetics.particles}, ${aesthetics.effect}`);
    }

    if (context?.mood) {
      parts.push(`Mood: ${context.mood}`);
    }

    if (context?.style) {
      parts.push(`Style: ${context.style}`);
    }

    if (context?.setting) {
      parts.push(`Setting: ${context.setting}`);
    }

    if (context?.guardianId) {
      const domains = GUARDIAN_CREATIVE_DOMAINS[context.guardianId];
      if (domains && domains.length > 0) {
        parts.push(`Artistic themes: ${domains.slice(0, 3).join(', ')}`);
      }
    }

    parts.push('Arcanean fantasy style, cinematic lighting, highly detailed');

    return parts.join('. ') + '.';
  }

  buildCharacterPrompt(
    name: string,
    element: string,
    guardianId?: string,
    style?: string
  ): string {
    const parts: string[] = [];

    parts.push(`Full character portrait of ${name}`);

    if (ELEMENT_AESTHETICS[element]) {
      const aesthetics = ELEMENT_AESTHETICS[element];
      parts.push(`Element: ${element} — ${aesthetics.description}`);
      parts.push(`Materials and ambient effects express the element (no body transformation)`);
    }

    if (guardianId) {
      const gate = GUARDIAN_GATES[guardianId];
      if (gate) parts.push(`Gate of ${gate}`);
      const domains = GUARDIAN_CREATIVE_DOMAINS[guardianId];
      if (domains) parts.push(`Domain: ${domains[0]}`);
    }

    if (style) {
      parts.push(`Style: ${style}`);
    }

    parts.push('Arcanean design language, cinematic composition, crystalline robot chibi aesthetic compatible');

    return parts.join('. ') + '.';
  }

  buildScenePrompt(
    setting: string,
    characters: string[],
    mood: string,
    element?: string
  ): string {
    const parts: string[] = [];

    parts.push(`Epic scene: ${setting}`);

    if (characters.length > 0) {
      parts.push(`Characters: ${characters.join(', ')}`);
    }

    parts.push(`Mood: ${mood}`);

    if (element && ELEMENT_AESTHETICS[element]) {
      const aesthetics = ELEMENT_AESTHETICS[element];
      parts.push(`Elemental atmosphere: ${aesthetics.description}`);
    }

    parts.push('Wide cinematic composition, Arcanean fantasy art style, volumetric lighting, highly detailed environment');

    return parts.join('. ') + '.';
  }

  // ─── Stats ──────────────────────────────────────────────────────────────

  getStats(): { templatesRegistered: number; promptsGenerated: Record<string, number> } {
    const promptsGenerated: Record<string, number> = {};
    for (const [type, count] of this.generationCounts) {
      promptsGenerated[type] = count;
    }
    return {
      templatesRegistered: this.templates.size,
      promptsGenerated,
    };
  }

  // ─── Internals ──────────────────────────────────────────────────────────

  private enrichWithContext(prompt: string, context: PromptContext): string {
    const additions: string[] = [];

    if (context.element && ELEMENT_AESTHETICS[context.element]) {
      const aesthetics = ELEMENT_AESTHETICS[context.element];
      additions.push(`Elemental palette: ${aesthetics.colors.join(', ')}`);
    }

    if (context.mood) {
      additions.push(`Mood: ${context.mood}`);
    }

    if (context.style) {
      additions.push(`Style: ${context.style}`);
    }

    if (context.setting) {
      additions.push(`Setting: ${context.setting}`);
    }

    if (additions.length > 0) {
      return prompt + '. ' + additions.join('. ');
    }

    return prompt;
  }

  private incrementCount(type: AssetType): void {
    this.generationCounts.set(type, (this.generationCounts.get(type) ?? 0) + 1);
  }

  private registerDefaultTemplates(): void {
    this.registerTemplate({
      id: 'img-character-humanoid',
      name: 'Humanoid Character',
      type: 'image',
      template: 'Full character portrait of {{name}}, a {{element}} element warrior of the Gate of {{gate}}. Wearing elaborate armor infused with {{element}} energy. {{style}} art style, Arcanean fantasy, cinematic lighting, highly detailed.',
      variables: ['name', 'element', 'gate', 'style'],
      tags: ['character', 'humanoid', 'portrait'],
      negativePrompt: 'low quality, blurry, deformed, extra limbs, watermark, text',
      examples: ['Full character portrait of Lyria, a Water element warrior...'],
    });

    this.registerTemplate({
      id: 'img-character-chibi',
      name: 'Chibi/Mascot Character',
      type: 'image',
      template: 'Adorable chibi character of {{name}} with {{element}} element theme. Big expressive eyes, crystalline robot aesthetic, cute proportions. {{style}} style, pastel accents, Arcanean design language.',
      variables: ['name', 'element', 'style'],
      tags: ['character', 'chibi', 'mascot'],
      negativePrompt: 'realistic proportions, dark, gritty, horror',
      examples: ['Adorable chibi character of Mamoru with Spirit element theme...'],
    });

    this.registerTemplate({
      id: 'img-scene-cosmic',
      name: 'Cosmic Scene',
      type: 'image',
      template: 'Epic cosmic scene: {{setting}}. Featuring {{subject}} under a sky of swirling nebulae. {{element}} element energy radiates through the environment. Mood: {{mood}}. Wide cinematic composition, Arcanean fantasy, volumetric cosmic lighting.',
      variables: ['setting', 'subject', 'element', 'mood'],
      tags: ['scene', 'cosmic', 'environment'],
      negativePrompt: 'low quality, mundane, modern, urban',
    });

    this.registerTemplate({
      id: 'img-godbeast',
      name: 'Godbeast Portrait',
      type: 'image',
      template: 'Majestic portrait of {{name}}, the Godbeast of the Gate of {{gate}}. A divine {{element}} creature of immense power. {{style}} rendering, sacred geometry accents, cosmic backdrop, ethereal glow, Arcanean mythology art.',
      variables: ['name', 'gate', 'element', 'style'],
      tags: ['godbeast', 'divine', 'portrait'],
      negativePrompt: 'cartoon, simple, low detail, mundane animal',
    });

    this.registerTemplate({
      id: 'txt-lore-entry',
      name: 'Lore Text Entry',
      type: 'text',
      template: 'Write a lore entry for the Arcanea universe about {{subject}}. The entry should be in the voice of the Library of Arcanea — elevated but accessible, mythic but practical. Element: {{element}}. Guardian perspective: {{guardian}}. Include references to the Gate of {{gate}} and the cosmic duality of Lumina and Nero.',
      variables: ['subject', 'element', 'guardian', 'gate'],
      tags: ['lore', 'text', 'library'],
    });

    this.registerTemplate({
      id: 'txt-chronicle',
      name: 'Guardian Chronicle',
      type: 'text',
      template: 'Chronicle the tale of {{guardian}}, Guardian of the Gate of {{gate}}. Describe their domain of {{domains}} and how they wield the {{element}} element at {{frequency}} Hz. Written in the style of the Chronicles of Guardians — epic, personal, revealing their struggles and triumphs.',
      variables: ['guardian', 'gate', 'domains', 'element', 'frequency'],
      guardianId: 'lyria',
      tags: ['chronicle', 'guardian', 'narrative'],
    });

    this.registerTemplate({
      id: 'music-theme',
      name: 'Character Theme Music',
      type: 'music',
      template: 'Compose a theme for {{character}} of the {{element}} element. Frequency: {{frequency}} Hz. Mood: {{mood}}. Style: orchestral fantasy with {{element}} sonic textures. The music should evoke the Gate of {{gate}} — {{domain}} themes.',
      variables: ['character', 'element', 'frequency', 'mood', 'gate', 'domain'],
      tags: ['music', 'theme', 'character'],
    });
  }
}
