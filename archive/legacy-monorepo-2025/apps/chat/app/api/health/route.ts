export const runtime = "edge";

export async function GET() {
  const keys = {
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    OPENROUTER_API_KEY: !!process.env.OPENROUTER_API_KEY,
    AI_MODEL: process.env.AI_MODEL || null,
    OPENAI_IMAGE_MODEL: process.env.OPENAI_IMAGE_MODEL || null,
  };
  return Response.json({ ok: true, env: keys });
}

