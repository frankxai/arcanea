import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Arcanean color utilities
export const luminorColors = {
  harmonix: '#FF4444',
  lumina: '#4444FF', 
  scripta: '#44FF44',
  kinetix: '#FF44FF',
  syntaxa: '#FF8844',
  nexus: '#FFFFFF',
} as const

export const arcaneColors = {
  void: '#000011',
  deep: '#001122', 
  midnight: '#112244',
  cosmic: '#224466',
  nebula: '#336688',
  aurora: '#4488aa',
  crystal: '#66aacc',
  luminous: '#88ccee',
  ethereal: '#aaeeff',
  radiant: '#ccffff',
  celestial: '#eeffff',
  transcendent: '#ffffff',
} as const

export type LuminorType = keyof typeof luminorColors
export type ArcaneanColor = keyof typeof arcaneColors