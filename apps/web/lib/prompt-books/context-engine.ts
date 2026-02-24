// Arcanea Prompt Books — Context Engine
// Compiles prompts into API-ready context packages

import type {
  Prompt, Tag, ContextPackage, ChainStep, TemplateVariable,
} from './types'

/**
 * Compile a prompt into an API-ready ContextPackage.
 * Resolves template variables, injects tags, builds message array.
 */
export function compilePrompt(
  prompt: Prompt,
  variableValues?: Record<string, string>,
  injectedTags?: Tag[],
): ContextPackage {
  let content = prompt.content

  // Step 1: Resolve template variables — {{variable_name}} → value
  if (prompt.templateVariables.length > 0 && variableValues) {
    for (const v of prompt.templateVariables) {
      const value = variableValues[v.name] ?? v.default ?? ''
      content = content.replaceAll(`{{${v.name}}}`, value)
    }
  }

  // Step 2: Inject tags with weight modifiers
  if (injectedTags && injectedTags.length > 0) {
    for (const tag of injectedTags) {
      if (!tag.injectText) continue
      let injection = tag.injectText
      if (tag.weightModifier && tag.weightModifier !== 1) {
        injection = `(${injection}:${tag.weightModifier})`
      }
      switch (tag.injectPosition) {
        case 'prepend':
          content = injection + ', ' + content
          break
        case 'append':
          content = content + ', ' + injection
          break
        case 'replace':
          content = injection
          break
      }
    }
  }

  // Step 3: Build messages array
  const messages: ContextPackage['messages'] = []

  if (prompt.systemPrompt) {
    messages.push({ role: 'system', content: prompt.systemPrompt })
  }

  // Step 4: Add few-shot examples
  for (const example of prompt.fewShotExamples) {
    messages.push({
      role: example.role,
      content: example.content,
    })
  }

  // Step 5: Add compiled user prompt
  messages.push({ role: 'user', content })

  // Step 6: Build parameters from context config
  const config = prompt.contextConfig
  const parameters = {
    model: config.model ?? 'google/gemini-2.5-flash',
    temperature: config.temperature ?? 0.7,
    maxTokens: config.maxTokens ?? 2048,
    topP: config.topP,
    frequencyPenalty: config.frequencyPenalty,
    presencePenalty: config.presencePenalty,
    stopSequences: config.stopSequences,
  }

  return {
    system: prompt.systemPrompt || null,
    messages,
    parameters,
    metadata: {
      promptId: prompt.id,
      version: prompt.version,
      compiledAt: new Date().toISOString(),
    },
  }
}

/**
 * Compile a chain of prompts into sequential ContextPackages.
 * Each step can reference output variables from previous steps.
 */
export function compileChain(
  steps: ChainStep[],
  allPrompts: Map<string, Prompt>,
  variableValues?: Record<string, string>,
): ContextPackage[] {
  const packages: ContextPackage[] = []
  const outputs: Record<string, string> = {}

  const sorted = [...steps].sort((a, b) => a.order - b.order)

  for (const step of sorted) {
    let prompt: Prompt | undefined

    if (step.promptId) {
      prompt = allPrompts.get(step.promptId)
    } else if (step.inlinePrompt) {
      prompt = {
        id: `chain-step-${step.order}`,
        userId: '',
        collectionId: null,
        title: `Step ${step.order}`,
        content: step.inlinePrompt,
        negativeContent: null,
        systemPrompt: null,
        promptType: 'general',
        isTemplate: false,
        templateVariables: [],
        contextConfig: {},
        fewShotExamples: [],
        chainSteps: [],
        sortOrder: 0,
        isPinned: false,
        isFavorite: false,
        isArchived: false,
        useCount: 0,
        lastUsedAt: null,
        version: 1,
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }

    if (!prompt) continue

    // Replace output variables from previous steps
    let resolvedContent = prompt.content
    for (const [key, value] of Object.entries(outputs)) {
      resolvedContent = resolvedContent.replaceAll(`$${key}`, value)
    }

    const pkg = compilePrompt(
      { ...prompt, content: resolvedContent },
      variableValues,
    )
    packages.push(pkg)

    if (step.outputVariable) {
      outputs[step.outputVariable] = `[output of step ${step.order}]`
    }
  }

  return packages
}

/**
 * Resolve template variables in a content string.
 */
export function resolveVariables(
  content: string,
  variables: TemplateVariable[],
  values: Record<string, string>,
): string {
  let resolved = content
  for (const v of variables) {
    const value = values[v.name] ?? v.default ?? ''
    resolved = resolved.replaceAll(`{{${v.name}}}`, value)
  }
  return resolved
}

/**
 * Extract all {{variable}} placeholders from content.
 */
export function extractVariables(content: string): string[] {
  const matches = content.matchAll(/\{\{(\w+)\}\}/g)
  const vars = new Set<string>()
  for (const match of matches) {
    vars.add(match[1])
  }
  return [...vars]
}
