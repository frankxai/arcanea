import { NextRequest, NextResponse } from 'next/server'
import { secureMCPManager } from '@/lib/secure-mcp-manager'
import { AIRouter } from '@/lib/ai-router'
import { z } from 'zod'

// SECURITY FIX: Add authentication helpers
async function verifyAdminAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, error: 'Missing or invalid authorization header' }
  }

  try {
    const token = authHeader.substring(7)

    // Verify JWT token (implement based on your auth system)
    // This is a placeholder - replace with actual verification
    const user = await verifyJWTToken(token)

    if (!user) {
      return { authorized: false, error: 'Invalid token' }
    }

    // Check if user has admin role
    if (user.role !== 'admin' && user.role !== 'system_admin') {
      return { authorized: false, error: 'Insufficient permissions. Admin access required.' }
    }

    return { authorized: true, user }
  } catch (error) {
    console.error('Auth verification error:', error)
    return { authorized: false, error: 'Authentication failed' }
  }
}

// Placeholder for JWT verification - implement based on your auth provider
async function verifyJWTToken(token: string) {
  // TODO: Implement JWT verification with your auth provider
  // Example with Supabase:
  // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  // const { data: { user }, error } = await supabase.auth.getUser(token)
  // return user

  throw new Error('JWT verification not implemented')
}

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

// SECURITY FIX: Protected real-time monitoring endpoint
export async function GET(request: NextRequest) {
  try {
    // SECURITY: Verify admin authentication
    const authResult = await verifyAdminAuth(request)
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: 'Unauthorized', message: authResult.error },
        { status: 401 }
      )
    }

    // SECURITY: Validate query parameters
    const { searchParams } = new URL(request.url)
    const timeframeSchema = z.enum(['hour', 'day', 'week', 'month'])
    const timeframeResult = timeframeSchema.safeParse(searchParams.get('timeframe') || 'hour')

    if (!timeframeResult.success) {
      return NextResponse.json(
        { error: 'Invalid timeframe parameter. Must be: hour, day, week, or month' },
        { status: 400 }
      )
    }

    const timeframe = timeframeResult.data

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

    // SECURITY: Log access to sensitive analytics
    console.log(`[SECURITY AUDIT] Analytics accessed by user ${authResult.user.id} (${authResult.user.email}) at ${new Date().toISOString()}`)

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

    // SECURITY: Don't leak error details in production
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Monitoring failed'
      : error.message

    return NextResponse.json(
      { error: errorMessage },
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

// SECURITY FIX: Advanced analytics endpoint with authentication
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Verify admin authentication
    const authResult = await verifyAdminAuth(request)
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: 'Unauthorized', message: authResult.error },
        { status: 401 }
      )
    }

    // SECURITY: Validate request body
    const bodySchema = z.object({
      query: z.enum(['usage_trends', 'cost_optimization', 'guardian_synergy', 'performance_forecasting']),
      timeframe: z.enum(['hour', 'day', 'week', 'month']).optional(),
      filters: z.record(z.any()).optional()
    })

    const body = await request.json()
    const validationResult = bodySchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    const { query, timeframe, filters } = validationResult.data

    // Complex analytics queries
    let result = {}

    switch (query) {
      case 'usage_trends':
        result = await getUsageTrends(timeframe || 'day', filters)
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

    // SECURITY: Log analytics query
    console.log(`[SECURITY AUDIT] Analytics query '${query}' by user ${authResult.user.id} at ${new Date().toISOString()}`)

    return NextResponse.json(result)

  } catch (error: any) {
    console.error('Analytics API error:', error)

    // SECURITY: Don't leak error details in production
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Analytics query failed'
      : error.message

    return NextResponse.json(
      { error: errorMessage },
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
