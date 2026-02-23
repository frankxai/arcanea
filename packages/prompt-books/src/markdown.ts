// Arcanea Prompt Books — Markdown Parser & Serializer

import type { CreatePromptInput, PromptType, Prompt, TemplateVariable } from './types'

// Simple YAML frontmatter parser (no external dependency needed)
// Handles the subset we use: strings, numbers, arrays, booleans

interface ParsedMd {
  frontmatter: Record<string, unknown>
  body: string
}

/**
 * Parse a markdown file with YAML frontmatter.
 */
export function parseMd(raw: string): ParsedMd {
  const fmRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  const match = raw.match(fmRegex)

  if (!match) {
    return { frontmatter: {}, body: raw }
  }

  const yamlStr = match[1]
  const body = match[2].trimStart()
  const frontmatter: Record<string, unknown> = {}

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue

    const key = line.slice(0, colonIdx).trim()
    let value: unknown = line.slice(colonIdx + 1).trim()

    if (!key) continue

    // Parse value types
    if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (value === 'null' || value === '') value = null
    else if (/^-?\d+$/.test(value as string)) value = parseInt(value as string, 10)
    else if (/^-?\d+\.\d+$/.test(value as string)) value = parseFloat(value as string)
    else if ((value as string).startsWith('[') && (value as string).endsWith(']')) {
      try {
        value = JSON.parse((value as string).replace(/'/g, '"'))
      } catch {
        // Keep as string
      }
    } else if ((value as string).startsWith('"') && (value as string).endsWith('"')) {
      value = (value as string).slice(1, -1)
    }

    frontmatter[key] = value
  }

  return { frontmatter, body }
}

/**
 * Serialize frontmatter + body into markdown with YAML frontmatter.
 */
export function serializeMd(
  frontmatter: Record<string, unknown>,
  body: string,
): string {
  const lines: string[] = ['---']

  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === null || value === undefined) continue

    if (Array.isArray(value)) {
      lines.push(`${key}: ${JSON.stringify(value)}`)
    } else if (typeof value === 'string' && value.includes(':')) {
      lines.push(`${key}: "${value}"`)
    } else {
      lines.push(`${key}: ${value}`)
    }
  }

  lines.push('---', '', body)
  return lines.join('\n')
}

/**
 * Convert a Prompt to markdown with YAML frontmatter.
 */
export function promptToMd(prompt: Prompt): string {
  const fm: Record<string, unknown> = {
    title: prompt.title,
    type: prompt.promptType,
    version: prompt.version,
    created: prompt.createdAt,
    updated: prompt.updatedAt,
  }

  if (prompt.tags && prompt.tags.length > 0) {
    fm.tags = prompt.tags.map((t) => t.name)
  }
  if (prompt.systemPrompt) fm.system_prompt = prompt.systemPrompt
  if (prompt.negativeContent) fm.negative = prompt.negativeContent
  if (prompt.templateVariables.length > 0) {
    fm.variables = JSON.stringify(prompt.templateVariables)
  }
  if (prompt.contextConfig.model) fm.model = prompt.contextConfig.model
  if (prompt.contextConfig.temperature !== undefined) {
    fm.temperature = prompt.contextConfig.temperature
  }
  if (prompt.isFavorite) fm.favorite = true

  return serializeMd(fm, prompt.content)
}

/**
 * Parse a markdown file into partial prompt creation data.
 */
export function mdToPromptData(raw: string): Partial<CreatePromptInput> {
  const { frontmatter: fm, body } = parseMd(raw)

  const data: Partial<CreatePromptInput> = {
    title: (fm.title as string) || 'Imported Prompt',
    content: body,
    promptType: (fm.type as PromptType) || 'general',
  }

  if (fm.negative) data.negativeContent = fm.negative as string
  if (fm.system_prompt) data.systemPrompt = fm.system_prompt as string

  if (fm.variables) {
    try {
      data.templateVariables = typeof fm.variables === 'string'
        ? JSON.parse(fm.variables)
        : fm.variables as TemplateVariable[]
    } catch {
      // Skip invalid variables
    }
  }

  if (fm.model || fm.temperature) {
    data.contextConfig = {}
    if (fm.model) data.contextConfig.model = fm.model as string
    if (fm.temperature) data.contextConfig.temperature = fm.temperature as number
  }

  return data
}

/**
 * Detect if text content looks like a prompt (has frontmatter).
 */
export function isPromptMarkdown(text: string): boolean {
  return text.trimStart().startsWith('---')
}
