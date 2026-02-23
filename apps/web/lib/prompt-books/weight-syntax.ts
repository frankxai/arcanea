// Arcanea Prompt Books — Weight Modifier Parser & Formatter

import { WEIGHT_SYNTAX, type WeightSyntaxType } from './constants'

export interface ParsedWeight {
  text: string
  weight: number
  syntax: WeightSyntaxType
}

/**
 * Parse a weighted token like (text:1.1) or {text:1.05} or [text:0.9]
 */
export function parseWeight(token: string): ParsedWeight | null {
  // SD syntax: (text:weight)
  const sdMatch = token.match(/^\((.+):([0-9.]+)\)$/)
  if (sdMatch) {
    return { text: sdMatch[1], weight: parseFloat(sdMatch[2]), syntax: 'sd' }
  }

  // NAI syntax: {text:weight}
  const naiMatch = token.match(/^\{(.+):([0-9.]+)\}$/)
  if (naiMatch) {
    return { text: naiMatch[1], weight: parseFloat(naiMatch[2]), syntax: 'nai' }
  }

  // Emphasis syntax: [text:weight]
  const emphMatch = token.match(/^\[(.+):([0-9.]+)\]$/)
  if (emphMatch) {
    return { text: emphMatch[1], weight: parseFloat(emphMatch[2]), syntax: 'emphasis' }
  }

  return null
}

/**
 * Format a text+weight into syntax-specific string.
 */
export function formatWeight(
  text: string,
  weight: number,
  syntax: WeightSyntaxType = 'sd',
): string {
  if (weight === 1) return text

  const s = WEIGHT_SYNTAX[syntax]
  return `${s.open}${text}${s.separator}${weight}${s.close}`
}

/**
 * Extract all weighted tokens from a prompt string.
 * Returns array of { text, weight, syntax, start, end } for each found token.
 */
export function extractWeights(content: string): Array<ParsedWeight & { start: number; end: number }> {
  const results: Array<ParsedWeight & { start: number; end: number }> = []

  // Match all three syntaxes
  const patterns = [
    { regex: /\(([^()]+):([0-9.]+)\)/g, syntax: 'sd' as WeightSyntaxType },
    { regex: /\{([^{}]+):([0-9.]+)\}/g, syntax: 'nai' as WeightSyntaxType },
    { regex: /\[([^\[\]]+):([0-9.]+)\]/g, syntax: 'emphasis' as WeightSyntaxType },
  ]

  for (const { regex, syntax } of patterns) {
    let match
    while ((match = regex.exec(content)) !== null) {
      results.push({
        text: match[1],
        weight: parseFloat(match[2]),
        syntax,
        start: match.index,
        end: match.index + match[0].length,
      })
    }
  }

  return results.sort((a, b) => a.start - b.start)
}

/**
 * Apply a weight modifier to selected text within content.
 */
export function applyWeight(
  content: string,
  selectionStart: number,
  selectionEnd: number,
  weight: number,
  syntax: WeightSyntaxType = 'sd',
): string {
  const selectedText = content.slice(selectionStart, selectionEnd)
  if (!selectedText) return content

  const weighted = formatWeight(selectedText, weight, syntax)
  return content.slice(0, selectionStart) + weighted + content.slice(selectionEnd)
}

/**
 * Remove weight syntax from text, returning plain text.
 */
export function stripWeights(content: string): string {
  return content
    .replace(/\(([^()]+):[0-9.]+\)/g, '$1')
    .replace(/\{([^{}]+):[0-9.]+\}/g, '$1')
    .replace(/\[([^\[\]]+):[0-9.]+\]/g, '$1')
}
