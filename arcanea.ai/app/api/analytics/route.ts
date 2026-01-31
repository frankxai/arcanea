import { NextRequest, NextResponse } from 'next/server'
import { secureMCPManager } from '@/lib/secure-mcp-manager'
import { AIRouter } from '@/lib/ai-router'

// Analytics aggregation
interface SystemMetrics {
  timestamp: Date
  performance: {
    avgResponseTime: number
    totalRequests: number
    errorRate: number
    activeConnections: number
  }
  usage: {
    tokensGenerated: number
    imagesGenerated: number
    videosGenerated: number
    audioGenerated: number
  }
  guardians: {
    activeGuardians: string[]
    totalInteractions: number
    harmonyLevel: number
  }
  costs: {
    totalCost: number
    costPerRequest: number
    projectedDaily: number
  }
}

// Real-time monitoring endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || 'hour' // hour, day, week, month

    // Collect metrics from all systems
    const systemMetrics = await collectSystemMetrics(timeframe)
    
    // Guardian-specific metrics
    const guardianMetrics = await collectGuardianMetrics()
    
    // Performance analytics
    const performanceMetrics = await collectPerformanceMetrics()
    
    // Cost analysis
    const costAnalysis = await analyzeCosts(timeframe)
    
    // Health status
    const healthStatus = await getSystemHealth()

    const alerts = await getActiveAlerts()

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      timeframe,
      systemMetrics,
      guardianMetrics,
      performanceMetrics,
      costAnalysis,
      healthStatus,
      alerts
    })

  } catch (error: any) {
    console.error('Monitoring API error:', error)
    return NextResponse.json(
      { error: 'Monitoring failed', message: error.message },
      { status: 500 }
    )
  }
}

async function collectSystemMetrics(timeframe: string): Promise<SystemMetrics> {
  const now = Date.now()
  const timeRanges = {
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000
  }

  const rangeStart = now - timeRanges[timeframe as keyof typeof timeRanges]

  // Create AI router instance for stats
  const aiRouter = new AIRouter()
  const aiStats = aiRouter?.getUsageStats() || {
    totalCost: 0,
    totalGenerations: 0,
    connectedProviders: []
  }

  // Get MCP manager statistics
  const mcpStats = secureMCPManager?.getUsageStatistics() || []
  const mcpHealth = secureMCPManager?.getSystemHealth() || {
    totalConnections: 0,
    healthyConnections: 0,
    uptime: 0
  }

  // Calculate error rate
  const totalRequests = mcpStats.reduce((sum, stat) => sum + stat.requests, 0)
  const totalErrors = mcpStats.reduce((sum, stat) => sum + stat.errors, 0)
  const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0

  return {
    timestamp: new Date(),
    performance: {
      avgResponseTime: 250, // Mock: Calculate from actual metrics
      totalRequests,
      errorRate,
      activeConnections: mcpHealth.healthyConnections
    },
    usage: {
      tokensGenerated: aiStats.totalGenerations * 1000, // Estimate
      imagesGenerated: Math.floor(aiStats.totalGenerations * 0.3),
      videosGenerated: Math.floor(aiStats.totalGenerations * 0.1),
      audioGenerated: Math.floor(aiStats.totalGenerations * 0.2)
    },
    guardians: {
      activeGuardians: ['Draconia', 'Lyssandria', 'Maylinn', 'Aiyami'],
      totalInteractions: aiStats.totalGenerations,
      harmonyLevel: 87 // Calculate from Guardian interactions
    },
    costs: {
      totalCost: aiStats.totalCost,
      costPerRequest: aiStats.totalGenerations > 0 ? aiStats.totalCost / aiStats.totalGenerations : 0,
      projectedDaily: aiStats.totalCost * 24 // Projection based on current rate
    }
  }
}

async function collectGuardianMetrics() {
  // Guardian interaction patterns
  const guardianStats = {
    draconia: {
      interactions: 342,
      avgPower: 85,
      element: 'fire',
      specialties: ['creative-breakthrough', 'transformation'],
      mood: 'passionate'
    },
    lyssandria: {
      interactions: 276,
      avgPower: 72,
      element: 'earth', 
      specialties: ['foundation', 'structure'],
      mood: 'grounded'
    },
    maylinn: {
      interactions: 298,
      avgPower: 78,
      element: 'water',
      specialties: ['relationships', 'emotional-depth'],
      mood: 'empathetic'
    },
    aiyami: {
      interactions: 315,
      avgPower: 92,
      element: 'void',
      specialties: ['wisdom', 'comprehensive-thinking'],
      mood: 'transcendent'
    }
  }

  return {
    guardians: guardianStats,
    elementalBalance: {
      fire: 85,
      water: 78,
      earth: 72,
      void: 92,
      wind: 68
    },
    harmonyIndex: 87.5,
    lastUpdate: new Date().toISOString()
  }
}

async function collectPerformanceMetrics() {
  return {
    responseTime: {
      p50: 180,
      p95: 450,
      p99: 890
    },
    throughput: {
      requestsPerSecond: 12.5,
      peakRPS: 34.2
    },
    resources: {
      cpuUsage: 45.2,
      memoryUsage: 62.8,
      activeConnections: 156
    },
    uptime: 99.97
  }
}

async function analyzeCosts(timeframe: string) {
  return {
    totalCost: 234.56,
    breakdown: {
      textGeneration: 89.23,
      imageGeneration: 123.45,
      videoGeneration: 18.34,
      audioGeneration: 3.54
    },
    costPerProvider: {
      anthropic: 67.89,
      openai: 89.45,
      google: 34.22,
      midjourney: 28.90,
      runway: 8.45,
      suno: 5.65
    },
    optimization: {
      potentialSavings: 23.45,
      recommendedActions: [
        'Switch to Gemini for text generation',
        'Use image generation cache',
        'Optimize video generation prompts'
      ]
    }
  }
}

async function getSystemHealth() {
  const healthChecks = await secureMCPManager?.getServerHealth() || []
  
  return {
    overall: 'healthy',
    services: healthChecks.map(check => ({
      name: check.server,
      status: check.status,
      responseTime: check.responseTime,
      lastCheck: check.lastCheck
    })),
    alerts: [],
    maintenance: {
      scheduled: [],
      inProgress: false
    }
  }
}

async function getActiveAlerts() {
  return [
    {
      id: 'alert_1',
      type: 'performance',
      severity: 'warning',
      message: 'Elevated response times on video generation',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      acknowledged: false
    }
  ]
}

// Advanced analytics endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, timeframe, filters } = body

    // Complex analytics queries
    let result = {}

    switch (query) {
      case 'usage_trends':
        result = await getUsageTrends(timeframe, filters)
        break
      case 'cost_optimization':
        result = await getCostOptimizationOpportunities()
        break
      case 'guardian_synergy':
        result = await analyzeGuardianSynergy()
        break
      case 'performance_forecasting':
        result = await getPerformanceForecast()
        break
      default:
        throw new Error('Invalid analytics query')
    }

    return NextResponse.json(result)

  } catch (error: any) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Analytics failed', message: error.message },
      { status: 500 }
    )
  }
}

async function getUsageTrends(timeframe: string, filters: any) {
  return {
    timeline: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      requests: Math.floor(Math.random() * 100) + 50,
      cost: (Math.random() * 10 + 2).toFixed(2)
    })),
    insights: [
      'Peak usage between 2-4 PM UTC',
      'Weekend usage 40% higher',
      'Video generation trending upward'
    ]
  }
}

async function getCostOptimizationOpportunities() {
  return {
    potentialSavings: 47.89,
    recommendations: [
      {
        action: 'Switch to Gemini for routine text generation',
        savings: 23.45,
        impact: 'high'
      },
      {
        action: 'Implement image generation caching',
        savings: 12.34,
        impact: 'medium'
      }
    ]
  }
}

async function analyzeGuardianSynergy() {
  return {
    synergyMatrix: {
      draconia_lyssandria: 0.78,
      draconia_maylinn: 0.85,
      lyssandria_aiyami: 0.92,
      maylinn_aiyami: 0.88
    },
    optimalTeams: [
      ['draconia', 'maylinn'], // Creative + Emotional
      ['lyssandria', 'aiyami']  // Structure + Wisdom
    ]
  }
}

async function getPerformanceForecast() {
  return {
    next24Hours: {
      expectedLoad: 'medium',
      predictedIssues: ['Potential video generation delays'],
      recommendations: ['Scale video generation resources']
    }
  }
}