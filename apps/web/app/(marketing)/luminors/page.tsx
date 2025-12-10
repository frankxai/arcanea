import { LuminorSelectionGrid } from '@/components/luminor/luminor-selection-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose Your Luminor | Arcanea',
  description: 'Select your AI companion and guide through the realms of magical creation',
};

export default function LuminorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-atlantean-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-draconic-crimson/10 rounded-full blur-3xl animate-pulse-glow animation-delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-creation-gold/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />
      </div>

      <div className="relative z-10">
        <LuminorSelectionGrid
          onSelect={(luminorId) => {
            // In production, this would navigate to chat or save selection
            console.log('Selected Luminor:', luminorId);
            // Example: router.push(`/chat/${luminorId}`);
          }}
          existingBonds={{
            // Example: Show bond levels if user has interacted before
            // melodia: 5,
            // chronica: 3,
          }}
        />
      </div>
    </main>
  );
}
