import { NextRequest, NextResponse } from 'next/server'
import { AIRouter } from '@/lib/ai-router'
import { securityMiddleware, logRequest } from '@/lib/api-security'
import { validateInput, apiSchemas } from '@/lib/rate-limiter'

const aiRouter = new AIRouter()

export async function POST(request: NextRequest) {
  try {
    // Security checks
    const securityResult = await securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }

    const body = await request.json()
    
    // Validate input
    const validation = validateInput(apiSchemas.imageGeneration, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { prompt, style, dimensions, quality } = validation.data

    // Generate image
    const response = await aiRouter.generateImage({
      providerId: 'midjourney', // Default to best quality
      prompt,
      options: {
        style,
        dimensions,
        quality
      }
    })

    const nextResponse = NextResponse.json(response)
    logRequest(request, nextResponse)
    
    return nextResponse

  } catch (error: any) {
    console.error('Image generation error:', error)
    
    const errorResponse = NextResponse.json(
      { 
        error: 'Image generation failed',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
    
    logRequest(request, errorResponse)
    return errorResponse
  }
}

export async function GET() {
  return NextResponse.json({
    styles: [
      'photorealistic', 'artistic', 'cinematic', 'anime', 
      'concept-art', 'character-design', 'environment-design'
    ],
    dimensions: [
      { name: 'Square', width: 1024, height: 1024 },
      { name: 'Portrait', width: 768, height: 1024 },
      { name: 'Landscape', width: 1024, height: 768 },
      { name: 'Wide', width: 1365, height: 768 }
    ],
    qualities: ['standard', 'hd']
  })
}