import { NextRequest } from "next/server";

export const runtime = "edge";

const REPLICATE_API = "https://api.replicate.com/v1";

export async function POST(req: NextRequest) {
  const token = process.env.REPLICATE_API_TOKEN;
  const version = process.env.REPLICATE_MODEL_VERSION; // e.g. pika or another text-to-video model version id
  if (!token) return new Response("Missing REPLICATE_API_TOKEN", { status: 400 });
  if (!version) return new Response("Missing REPLICATE_MODEL_VERSION", { status: 400 });

  const { prompt } = await req.json();
  if (!prompt) return new Response("Missing prompt", { status: 400 });

  const res = await fetch(`${REPLICATE_API}/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version,
      input: { prompt },
      webhook: process.env.REPLICATE_WEBHOOK_URL || undefined,
    }),
  });

  if (!res.ok) return new Response(await res.text(), { status: res.status });
  const json = await res.json();
  return Response.json({ id: json.id, status: json.status, urls: json.urls });
}

export async function GET(req: NextRequest) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return new Response("Missing REPLICATE_API_TOKEN", { status: 400 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const res = await fetch(`${REPLICATE_API}/predictions/${id}`, {
    headers: { Authorization: `Token ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return new Response(await res.text(), { status: res.status });
  const json = await res.json();
  // Attempt to standardize an output URL if available
  const outputUrl = Array.isArray(json.output) ? json.output[0] : json.output?.url || null;
  return Response.json({ status: json.status, outputUrl });
}

