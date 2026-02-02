export interface GuardianConfig {
  name: string
  element: 'fire' | 'water' | 'earth' | 'wind' | 'void'
  frequency: number
  description: string
  power?: number
}

export interface CreationNode {
  id: string
  type: 'character' | 'location' | 'story' | 'realm'
  position: [number, number, number]
  title: string
  description: string
  guardian: string
  status: 'inactive' | 'active' | 'complete'
}

export interface WorldbuildingSession {
  id: string
  userId: string
  guardian: string
  creationType: string
  nodes: CreationNode[]
  createdAt: Date
  updatedAt: Date
}

export interface SpatialInteraction {
  type: 'click' | 'hover' | 'drag' | 'gesture'
  position: [number, number, number]
  timestamp: Date
  data?: Record<string, unknown>
}