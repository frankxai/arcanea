import { Metadata } from "next";
import { LibraryExperience } from "./library-experience";

export const metadata: Metadata = {
  title: "Arcanea Library | Luminor Codex",
  description:
    "Step into the Arcanea Library, meet the Remembering Luminor, and explore the interactive codex of living lore.",
  openGraph: {
    title: "Arcanea Library | Luminor Codex",
    description:
      "Step into the Arcanea Library, meet the Remembering Luminor, and explore the interactive codex of living lore.",
  },
};

export default function LibraryPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-20 pb-24 pt-16">
      <LibraryExperience />
    </main>
  );
}
