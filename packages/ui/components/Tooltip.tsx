"use client";
import * as React from "react";
import * as RT from "@radix-ui/react-tooltip";

export function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  return (
    <RT.Provider delayDuration={200}>
      <RT.Root>
        <RT.Trigger asChild>{children}</RT.Trigger>
        <RT.Portal>
          <RT.Content sideOffset={8} className="rounded-md border border-[color:var(--border,#233049)] bg-[#0c1120] px-2 py-1 text-xs text-[color:#e6eefc] shadow">
            {content}
            <RT.Arrow className="fill-[#0c1120]" />
          </RT.Content>
        </RT.Portal>
      </RT.Root>
    </RT.Provider>
  );
}

