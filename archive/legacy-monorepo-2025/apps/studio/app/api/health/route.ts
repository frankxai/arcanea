export const runtime = "edge";

export async function GET() {
  const keys = {
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    REPLICATE_API_TOKEN: !!process.env.REPLICATE_API_TOKEN,
    REPLICATE_MODEL_VERSION: !!process.env.REPLICATE_MODEL_VERSION,
    FAL_KEY: !!process.env.FAL_KEY,
    FAL_API_URL: !!process.env.FAL_API_URL,
    FAL_STATUS_URL: !!process.env.FAL_STATUS_URL,
  };
  return Response.json({ ok: true, env: keys });
}

