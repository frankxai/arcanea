import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { prompt, size = "1024x1024" } = await req.json();
  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 400 });
  }
  if (!prompt || typeof prompt !== "string") {
    return new Response("Bad request: prompt is required", { status: 400 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const res = await openai.images.generate({
      prompt,
      size,
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
    });
    const url = res.data?.[0]?.url;
    if (!url) return new Response("No image URL in response", { status: 502 });
    return Response.json({ url });
  } catch (err: any) {
    return new Response(String(err?.message || err), { status: 500 });
  }
}

