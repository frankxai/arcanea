import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();

  // Choose model via env; default to a small, fast model
  const modelId = model || process.env.AI_MODEL || "gpt-4o-mini";
  const result = await streamText({
    model: openai(modelId, {
      apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined,
    }),
    messages,
  });

  return result.toAIStreamResponse();
}
