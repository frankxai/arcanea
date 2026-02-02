import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AIRouter } from '@/lib/ai-router'
import { securityMiddleware, logRequest } from '@/lib/api-security'
import { validateInput, apiSchemas } from '@/lib/rate-limiter'

const aiRouter = new AIRouter()

// Initialize AI router
aiRouter.initialize().catch(console.error)

export async function POST(request: NextRequest) {
  try {
    // Security checks
    const securityResult = await securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }

    const body = await request.json()
    
    // Enhanced validation with auto-enhancement options
    const schema = apiSchemas.chatMessage.extend({
      autoEnhance: z.boolean().optional(),
      multimodal: z.boolean().optional(),
      context: z.array(z.any()).optional()
    })
    
    const validation = validateInput(schema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { message, providerId, guardianId, options, autoEnhance, multimodal, context } = validation.data

    // Use auto-enhanced generation if requested
    const response = autoEnhance 
      ? await aiRouter.generateAutoEnhanced({
          providerId: providerId || 'anthropic-claude',
          prompt: message,
          options: {
            ...options,
            guardianId,
            autoEnhance: true,
            context
          },
          guardianMode: !!guardianId
        })
      : await aiRouter.generateText({
          providerId: providerId || 'anthropic-claude',
          prompt: message,
          options: {
            ...options,
            guardianId,
            context
          },
          guardianMode: !!guardianId
        })

    // Add multimodal suggestions if requested
    if (multimodal && response.success) {
      const multimodalSuggestions = await generateMultimodalSuggestions(response.data)
      response.multimodal = multimodalSuggestions
    }

    const nextResponse = NextResponse.json(response)
    logRequest(request, nextResponse)
    
    return nextResponse

  } catch (error: unknown) {
    console.error('Enhanced chat API error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error';

    const errorResponse = NextResponse.json(
      {
        error: 'Processing failed',
        message: process.env.NODE_ENV === 'development' ? message : undefined
      },
      { status: 500 }
    )

    logRequest(request, errorResponse)
    return errorResponse
  }
}

async function generateMultimodalSuggestions(content: string) {
  try {
    const suggestions = await aiRouter.generateText({
      providerId: 'google-gemini',
      prompt: `
        Analyze this content and suggest multimodal enhancements:
        "${content}"
        
        Provide JSON response with:
        1. Image generation prompts (max 3)
        2. Audio mood suggestions
        3. Visual style recommendations
        
        Format as valid JSON only.
      `,
      options: { temperature: 0.7, maxTokens: 800 }
    })

    if (suggestions.success) {
      try {
        return JSON.parse(suggestions.data)
      } catch {
        return {
          images: ['cinematic scene based on content'],
          audio: ['atmospheric ambient'],
          visual: ['ethereal lighting']
        }
      }
    }
  } catch (error) {
    console.warn('Multimodal suggestions failed:', error)
  }

  return null
}

export async function GET() {
  try {
    const stats = aiRouter.getUsageStats()
    const health = await aiRouter.healthCheck()
    
    return NextResponse.json({
      status: 'healthy',
      version: '2.0.0',
      features: {
        autoEnhance: true,
        multimodal: true,
        guardianMode: true,
        adaptiveRouting: true
      },
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