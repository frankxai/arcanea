import { NextRequest, NextResponse } from 'next/server'
import { AIRouter } from '@/lib/ai-router'
import { securityMiddleware, logRequest } from '@/lib/api-security'
import { validateInput, apiSchemas } from '@/lib/rate-limiter'
import { WorldbuildingSession, CreationNode } from '@/types/guardian'

const aiRouter = new AIRouter()

// Mock database (replace with real database in production)
const worldbuildingStore = new Map<string, WorldbuildingSession>()

export async function POST(request: NextRequest) {
  try {
    const securityResult = await securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }

    const body = await request.json()
    const validation = validateInput(apiSchemas.worldbuilding, body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { title, type, description, guardianId } = validation.data

    // Generate worldbuilding content
    const generationPrompt = `
      Create a detailed ${type} for a fantasy world:
      Title: ${title}
      Description: ${description}
      
      Provide:
      1. Core concept and unique elements
      2. Detailed characteristics
      3. Connections to broader world
      4. Interactive potential for users
      
      ${guardianId ? `Channel the essence of ${guardianId} Guardian in this creation.` : ''}
    `

    const response = await aiRouter.generateText({
      providerId: guardianId ? 'anthropic-claude' : 'openai-gpt4',
      prompt: generationPrompt,
      options: {
        temperature: 0.8,
        maxTokens: 2000,
        guardianId
      },
      guardianMode: !!guardianId
    })

    if (!response.success) {
      throw new Error(response.error)
    }

    // Create worldbuilding session
    const sessionId = `wb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const session: WorldbuildingSession = {
      id: sessionId,
      userId: 'demo_user', // Replace with auth user ID
      guardian: guardianId || 'universal',
      creationType: type,
      nodes: [{
        id: `${sessionId}_node_1`,
        type,
        position: [0, 0, 0],
        title,
        description: response.data,
        guardian: guardianId || 'universal',
        status: 'active'
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    worldbuildingStore.set(sessionId, session)

    const nextResponse = NextResponse.json({
      success: true,
      sessionId,
      content: response.data,
      node: session.nodes[0],
      guardian: guardianId
    })

    logRequest(request, nextResponse)
    return nextResponse

  } catch (error: any) {
    console.error('Worldbuilding API error:', error)
    
    const errorResponse = NextResponse.json(
      { 
        error: 'Worldbuilding creation failed',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
    
    logRequest(request, errorResponse)
    return errorResponse
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (sessionId) {
      const session = worldbuildingStore.get(sessionId)
      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(session)
    }

    // List all sessions (in production, filter by user)
    const sessions = Array.from(worldbuildingStore.values())
    return NextResponse.json({ sessions: sessions.slice(0, 50) }) // Limit to 50

  } catch (error: any) {
    console.error('Worldbuilding GET error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve worldbuilding data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const securityResult = await securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }

    const body = await request.json()
    const { sessionId, nodeId, updates } = body

    const session = worldbuildingStore.get(sessionId)
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Update node
    const nodeIndex = session.nodes.findIndex(n => n.id === nodeId)
    if (nodeIndex === -1) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      )
    }

    session.nodes[nodeIndex] = { ...session.nodes[nodeIndex], ...updates }
    session.updatedAt = new Date()

    worldbuildingStore.set(sessionId, session)

    return NextResponse.json({
      success: true,
      node: session.nodes[nodeIndex]
    })

  } catch (error: any) {
    console.error('Worldbuilding PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update worldbuilding data' },
      { status: 500 }
    )
  }
}