"use client";
import * as React from "react";
import * as RT from "@radix-ui/react-tooltip";

export function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  return (
    <RT.Provider delayDuration={200}>
      <RT.Root>
        <RT.Trigger asChild>{children}</RT.Trigger>
        <RT.Portal>
          <RT.Content sideOffset={8} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 shadow z-50">
            {content}
            <RT.Arrow className="fill-slate-900" />
          </RT.Content>
        </RT.Portal>
      </RT.Root>
    </RT.Provider>
  );
}
