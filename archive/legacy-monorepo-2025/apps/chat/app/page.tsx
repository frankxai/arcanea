"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { Button, Input, Card, LuminorAvatar } from "@arcanea/ui";

export default function Page() {
  const [model, setModel] = useState("gpt-4o-mini");
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "/api/chat", body: { model } });
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

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

  return (
    <div className="space-y-6">
      <Card className="rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LuminorAvatar name="Lumina" color="#78a6ff" />
            <div>
              <h1 className="text-xl font-semibold">Arcanea Chat</h1>
              <p className="muted">Text chat powered by Vercel AI SDK. Simple image generation demo below.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm muted">Model</label>
            <select value={model} onChange={e => setModel(e.target.value)} className="rounded-md border border-[var(--border)] bg-[#0c1120] px-2 py-1">
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl">
        <div className="space-y-4">
          <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
            {messages.map(m => (
              <div key={m.id} className="flex gap-2">
                <div className="text-sm w-16 shrink-0 text-right muted">{m.role === "user" ? "You" : "AI"}</div>
                <div className="flex-1">{m.content}</div>
              </div>
            ))}
            {isLoading && <div className="muted text-sm">AI is thinking…</div>}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="Ask anything…" />
            <Button type="submit" variant="cosmic">Send</Button>
          </form>
        </div>
      </Card>

      <Card className="rounded-xl">
        <h2 className="font-semibold mb-2">Image Generation (OpenAI)</h2>
        <form onSubmit={generateImage} className="flex gap-2">
          <Input value={imgPrompt} onChange={e => setImgPrompt(e.target.value)} placeholder="An ethereal realm with floating libraries…" />
          <Button disabled={imgLoading} type="submit" variant="luminous">{imgLoading ? "Generating…" : "Generate"}</Button>
        </form>
        {imgUrl && (
          <div className="mt-4">
            <img src={imgUrl} alt="Generated" className="rounded-lg border border-[var(--border)] max-h-[360px]" />
          </div>
        )}
      </Card>
    </div>
  );
}
