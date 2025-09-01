import { config } from './config'
import fetch from 'node-fetch'

export interface MessageRequest {
  prompt: string
}

export async function sendMessage(req: MessageRequest): Promise<string> {
  const res = await fetch(config.claudeApiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.claudeApiKey}`
    },
    body: JSON.stringify({ prompt: req.prompt, model: config.defaultModel })
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  const data = await res.json() as { completion: string }
  return data.completion
}

export function createClient() {
  return { sendMessage }
}
