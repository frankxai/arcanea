"use client";

import { useState } from "react";

export default function Page() {
  const [env, setEnv] = useState<any>(null);
  async function loadEnv() {
    try { const r = await fetch('/api/health', { cache: 'no-store' }); setEnv(await r.json()); } catch {}
  }
  
  // Load on first render
  if (typeof window !== 'undefined' && !env) { loadEnv(); }
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const [vidPrompt, setVidPrompt] = useState("");
  const [vidJob, setVidJob] = useState<any>(null);
  const [vidStatus, setVidStatus] = useState<string | null>(null);
  const [vidOutput, setVidOutput] = useState<string | null>(null);
  const [vidLoading, setVidLoading] = useState(false);
  const [provider, setProvider] = useState<"replicate" | "fal">("replicate");

  async function generateImage(e: React.FormEvent) {
    e.preventDefault();
    if (!imgPrompt.trim()) return;
    setImgLoading(true);
    setImgUrl(null);
    try {
      const res = await fetch("/api/image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: imgPrompt }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setImgUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Image generation failed. Check server logs and API keys.");
    } finally {
      setImgLoading(false);
    }
  }

  async function generateVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!vidPrompt.trim()) return;
    setVidLoading(true);
    setVidStatus(null);
    setVidOutput(null);
    try {
      const res = await fetch(`/api/video/${provider}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: vidPrompt }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setVidJob(data);
      setVidStatus(data.status || "queued");
    } catch (err) {
      console.error(err);
      alert("Video job creation failed. Configure provider keys.");
    } finally {
      setVidLoading(false);
    }
  }

  async function refreshStatus() {
    if (!vidJob?.id) return;
    try {
      const res = await fetch(`/api/video/${provider}?id=${encodeURIComponent(vidJob.id)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setVidStatus(data.status);
      if (data.outputUrl) setVidOutput(data.outputUrl);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <header className="panel rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Arcanea Studio</h1>
        <p className="muted">Image and video generation via modular providers (OpenAI, Replicate, Fal).</p>
        {env && (
          <div className="mt-3 text-xs grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(env.env || {}).map(([k,v]) => (
              <div key={k} className="rounded-md border border-[#233049] px-2 py-1 flex items-center justify-between">
                <span className="text-[color:#9bb1d0]">{k}</span>
                <span className={v ? 'text-green-400' : 'text-red-400'}>{v ? 'set' : 'missing'}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <section className="panel rounded-2xl p-6">
        <h2 className="font-semibold mb-2">Image</h2>
        <form onSubmit={generateImage} className="flex gap-2">
          <input value={imgPrompt} onChange={e => setImgPrompt(e.target.value)} placeholder="An astral library with bioluminescent trees" className="flex-1 rounded-md border border-[#233049] bg-[#0c1120] px-3 py-2 outline-none" />
          <button disabled={imgLoading} className="rounded-md bg-[#78a6ff] px-4 py-2 font-semibold text-black">{imgLoading ? 'Generating…' : 'Generate'}</button>
        </form>
        {imgUrl && (
          <div className="mt-4">
            <img src={imgUrl} alt="Generated" className="rounded-lg border border-[#233049] max-h-[360px]" />
          </div>
        )}
      </section>

      <section className="panel rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-2">Video</h2>
          <select value={provider} onChange={e => setProvider(e.target.value as any)} className="rounded-md border border-[#233049] bg-[#0c1120] px-2 py-1">
            <option value="replicate">Replicate</option>
            <option value="fal">Fal</option>
          </select>
        </div>
        <form onSubmit={generateVideo} className="flex gap-2">
          <input value={vidPrompt} onChange={e => setVidPrompt(e.target.value)} placeholder="A cinematic flyover of floating islands at sunset" className="flex-1 rounded-md border border-[#233049] bg-[#0c1120] px-3 py-2 outline-none" />
          <button disabled={vidLoading} className="rounded-md bg-[#78a6ff] px-4 py-2 font-semibold text-black">{vidLoading ? 'Submitting…' : 'Create Job'}</button>
        </form>
        {vidJob && (
          <div className="mt-4 text-sm">
            <div className="muted">Job ID: {vidJob.id}</div>
            <div className="muted">Status: {vidStatus || 'unknown'}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={refreshStatus} className="rounded-md border border-[#78a6ff] px-3 py-1">Refresh Status</button>
            </div>
          </div>
        )}
        {vidOutput && (
          <video className="mt-4 rounded-lg border border-[#233049] max-h-[360px]" src={vidOutput} controls />
        )}
      </section>
    </div>
  );
}
