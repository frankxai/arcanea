"use client";

import { LuminorSelectionGrid } from '@/components/luminor/luminor-selection-grid';
import { useRouter } from 'next/navigation';

export function LuminorsClient() {
  const router = useRouter();

  return (
    <div className="relative z-10">
      <LuminorSelectionGrid
        onSelect={(luminorId) => {
          console.log('Selected Luminor:', luminorId);
          // router.push(`/chat/${luminorId}`);
        }}
        existingBonds={{}}
      />
    </div>
  );
}
