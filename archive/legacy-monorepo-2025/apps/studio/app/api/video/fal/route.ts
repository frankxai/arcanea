import { NextRequest } from "next/server";

export const runtime = "edge";

// Fal supports invoking pipelines via fal.run; allow configuring endpoint
// Set FAL_API_URL to a pipeline URL like: https://fal.run/fal-ai/flux-lora (example)

export async function POST(req: NextRequest) {
  const key = process.env.FAL_KEY;
  const endpoint = process.env.FAL_API_URL; // e.g. https://fal.run/fal-ai/stable-video
  if (!key) return new Response("Missing FAL_KEY", { status: 400 });
  if (!endpoint) return new Response("Missing FAL_API_URL", { status: 400 });

  const { prompt } = await req.json();
  if (!prompt) return new Response("Missing prompt", { status: 400 });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) return new Response(await res.text(), { status: res.status });
  const json = await res.json();
  // Assume Fal returns an id and a status/url or a job object
  return Response.json({ id: json.id || json.request_id || null, status: json.status || 'queued', raw: json });
}

export async function GET(req: NextRequest) {
  // Some Fal endpoints return result instantly; others require polling through a returned URL.
  // Provide a generic passthrough to a status endpoint defined in FAL_STATUS_URL?id=
  const key = process.env.FAL_KEY;
  const statusUrl = process.env.FAL_STATUS_URL; // e.g. https://api.fal.ai/v1/jobs/status
  if (!key) return new Response("Missing FAL_KEY", { status: 400 });
  if (!statusUrl) return new Response("Missing FAL_STATUS_URL", { status: 400 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const res = await fetch(`${statusUrl}?id=${encodeURIComponent(id)}`, {
    headers: { "Authorization": `Key ${key}` },
    cache: "no-store",
  });
  if (!res.ok) return new Response(await res.text(), { status: res.status });
  const json = await res.json();
  const outputUrl = json.output?.url || json.video || json.result?.video_url || null;
  return Response.json({ status: json.status || json.state || 'unknown', outputUrl });
}

