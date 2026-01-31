import { NextRequest, NextResponse } from 'next/server'
import { AIRouter } from '@/lib/ai-router'
import { securityMiddleware, logRequest } from '@/lib/api-security'
import { validateInput, apiSchemas } from '@/lib/rate-limiter'

const aiRouter = new AIRouter()

// Initialize AI router on server start
aiRouter.initialize().catch(console.error)

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Security checks
    const securityResult = await securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }

    const body = await request.json()
    
    // Validate input
    const validation = validateInput(apiSchemas.chatMessage, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { message, providerId, guardianId, options } = validation.data

    // Generate AI response
    const response = await aiRouter.generateText({
      providerId: providerId || 'anthropic-claude',
      prompt: message,
      options: {
        ...options,
        guardianId
      },
      guardianMode: !!guardianId
    })

    const nextResponse = NextResponse.json(response)
    
    // Log request
    logRequest(request, nextResponse)
    
    return nextResponse

  } catch (error: any) {
    console.error('Chat API error:', error)
    
    const errorResponse = NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
    
    logRequest(request, errorResponse)
    return errorResponse
  }
}

export async function GET() {
  try {
    const stats = aiRouter.getUsageStats()
    const health = await aiRouter.healthCheck()
    
    return NextResponse.json({
      status: 'healthy',
      stats,
      health,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}