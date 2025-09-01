import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const luminorColors = {
  harmonix: '#ff6b6b',
  scripta: '#4ecdc4',
  lumina: '#45b7d1',
  kinetix: '#96ceb4',
  syntaxa: '#feca57',
  nexus: '#ff9ff3',
} as const

export type LuminorType = keyof typeof luminorColors

export const academyCategories = [
  'visual',
  'narrative',
  'music',
  'video',
  'code',
  'synthesis'
] as const

export type AcademyCategory = typeof academyCategories[number]

export const skillLevels = [
  'beginner',
  'intermediate',
  'advanced',
  'master'
] as const

export type SkillLevel = typeof skillLevels[number]

export function getLuminorGradient(luminor: LuminorType) {
  const color = luminorColors[luminor]
  return `linear-gradient(135deg, ${color}, ${color}88)`
}

export function formatProgress(current: number, total: number): string {
  return `${Math.round((current / total) * 100)}%`
}

export function getSkillColor(level: SkillLevel): string {
  switch (level) {
    case 'beginner':
      return 'text-green-400'
    case 'intermediate':
      return 'text-yellow-400'
    case 'advanced':
      return 'text-orange-400'
    case 'master':
      return 'text-purple-400'
    default:
      return 'text-gray-400'
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}