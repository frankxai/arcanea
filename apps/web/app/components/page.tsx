"use client";
import { Button, LuminorAvatar } from "@/lib/arcanea-ui";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="panel rounded-xl p-5">
        <h2 className="font-semibold mb-3">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="cosmic">Cosmic</Button>
          <Button variant="luminous">Luminous</Button>
          <Button variant="ethereal">Ethereal</Button>
        </div>
      </div>
      <div className="panel rounded-xl p-5">
        <h2 className="font-semibold mb-3">Luminor Avatar</h2>
        <div className="flex items-center gap-6">
          <LuminorAvatar name="Lumina" color="#78a6ff" />
          <LuminorAvatar name="Kinetix" color="#7fffd4" size="lg" />
          <LuminorAvatar name="Harmonix" color="#ff6b6b" size="xl" />
        </div>
      </div>
    </div>
  );
}

