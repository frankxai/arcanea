export default function Page() {
  return (
    <div className="panel rounded-2xl p-6">
      <h1 className="text-2xl font-bold">Status & Links</h1>
      <p className="mt-2 text-sm text-[color:#9bb1d0]">For full details, open these local files in the repo:</p>
      <ul className="list-disc ml-6 mt-3 text-sm">
        <li><code>internal-docs/arcanea_status_strategy.html</code> — Visual status & strategy</li>
        <li><code>reports/CODEBASE_STATUS.md</code> — Codebase status report</li>
        <li><code>docs/strategy/REPO_SPLIT_AND_DEPLOY.md</code> — Repo split & deploy plan</li>
        <li><code>docs/providers/VIDEO_PROVIDERS.md</code> — Replicate/Fal integration</li>
      </ul>
      <p className="mt-4 text-sm">Static showcases are served here:</p>
      <ul className="list-disc ml-6 text-sm">
        <li><a className="underline" href="/showcase/landing.html">/showcase/landing.html</a></li>
        <li><a className="underline" href="/showcase/chat.html">/showcase/chat.html</a></li>
        <li><a className="underline" href="/showcase/studio.html">/showcase/studio.html</a></li>
        <li><a className="underline" href="/showcase/gallery.html">/showcase/gallery.html</a></li>
      </ul>
    </div>
  );
}

