export const metadata = {
  title: "Arcanea Gallery",
  description: "Showcase of Arcanean creations.",
};

import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh">
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

