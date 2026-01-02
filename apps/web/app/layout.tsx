export const metadata = {
  title: "Arcanea — Where Imagination Becomes Reality",
  description: "Create realms, summon guardians, and build with AI.",
};

import "./globals.css";
import { CosmicBackground } from "@/lib/arcanea-ui";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-dvh">
          <CosmicBackground />
          <main className="relative mx-auto max-w-6xl p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
