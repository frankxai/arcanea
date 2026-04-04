import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Arcanea Canvas',
    template: '%s | Arcanea Canvas',
  },
  description: 'Spatial Intelligence for Creators — where humans and AI co-create on an infinite canvas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cosmic-void text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
