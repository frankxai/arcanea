import { useState, useEffect } from 'react'
import { aiService, LuminorSlug } from '../lib/ai'
import { ConversationTurn } from '../lib/ai/types'
import { ulid } from 'ulid'

const initialMessages: Record<string, ConversationTurn[]> = {
  scripta: [
    {
      role: 'luminor',
      content: 'Greetings, seeker of stories. I am Scripta. How can I help you weave a new narrative today?',
      timestamp: new Date(),
    },
  ],
  // Add initial messages for other luminors here
}

export const useChat = (module: string) => {
  const [messages, setMessages] = useState<ConversationTurn[]>(
    initialMessages[module] || []
  )
  const [loading, setLoading] = useState(false)

  const sendMessage = async (userMessage: string) => {
    setLoading(true)
    const newMessage: ConversationTurn = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])

    try {
      const response = await aiService.generateResponse(
        userMessage,
        {
          userId: '123', // Replace with actual user ID
          sessionId: ulid(),
          currentModule: module,
          conversationHistory: [...messages, newMessage],
        },
        module as LuminorSlug
      )

      const luminorMessage: ConversationTurn = {
        role: 'luminor',
        content: response.content,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, luminorMessage])
    } catch (error) {
      console.error(error)
      const errorMessage: ConversationTurn = {
        role: 'luminor',
        content: 'I\'m sorry, I seem to be having trouble connecting. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMessages(initialMessages[module] || [])
  }, [module])

  return { messages, loading, sendMessage }
}