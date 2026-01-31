import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGuardianName(guardian: string): string {
  return guardian.charAt(0).toUpperCase() + guardian.slice(1)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}