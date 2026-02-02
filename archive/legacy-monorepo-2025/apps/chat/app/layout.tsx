export const metadata = {
  title: "Arcanea Chat",
  description: "Public chat powered by Vercel AI SDK",
};

import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh">
          <main className="mx-auto max-w-3xl p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

