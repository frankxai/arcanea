import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'Arcanea Library Superintelligence',
  description: '🧠 The most intelligent file management system for your visual assets',
  keywords: 'arcania, library, superintelligence, file management, visual assets, AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-cosmic-900 text-white min-h-screen`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Aurora Background Animation */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-900 via-purple-900/20 to-cosmic-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aurora-400/10 via-transparent to-transparent animate-aurora" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-draconia-400/5 via-transparent to-transparent animate-aurora" style={{ animationDelay: '5s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent animate-aurora" style={{ animationDelay: '10s' }} />
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}