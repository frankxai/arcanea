"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Music, 
  BookOpen, 
  Video, 
  Code, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shared UI exists or I'll need to mock/find it
import { Card } from "@/components/ui/card";

// Types
export interface Luminor {
  id: string;
  name: string;
  title: string;
  academy: string;
  element: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const LUMINORS: Luminor[] = [
  {
    id: "lumira",
    name: "Lumira",
    title: "The Visual Weaver",
    academy: "Draconic Academy (Visual)",
    element: "Fire/Light",
    description: "She teaches you to weave light into form. Master image generation, composition, and visual storytelling.",
    icon: Sparkles,
    color: "from-orange-500 to-red-600"
  },
  {
    id: "sonara",
    name: "Sonara",
    title: "The Harmonic Resonator",
    academy: "Academy of Creation (Audio)",
    element: "Water/Sound",
    description: "She guides you to hear the world's song. Master music generation, soundscapes, and auditory magic.",
    icon: Music,
    color: "from-blue-400 to-cyan-600"
  },
  {
    id: "mythara",
    name: "Mythara",
    title: "The Narrative Spinner",
    academy: "Atlantean Academy (Story)",
    element: "Wind/Thought",
    description: "She helps you structure chaos into legend. Master plot, character depth, and lore construction.",
    icon: BookOpen,
    color: "from-indigo-400 to-purple-600"
  },
  {
    id: "chronara",
    name: "Chronara",
    title: "The Motion Keeper",
    academy: "Kinetic Academy (Video)",
    element: "Time/Motion",
    description: "She teaches the flow of time. Master video generation, animation, and temporal pacing.",
    icon: Video,
    color: "from-green-400 to-emerald-600"
  },
  {
    id: "logion",
    name: "Logion",
    title: "The Logic Architect",
    academy: "Structure Academy (Code)",
    element: "Earth/Structure",
    description: "He reveals the code beneath reality. Master logic, systems, and the physics of magic.",
    icon: Code,
    color: "from-slate-500 to-zinc-700"
  },
  {
    id: "nexaris",
    name: "Nexaris",
    title: "The Synthesis",
    academy: "Academy of Unity",
    element: "Aether/Void",
    description: "The void that binds them all. For advanced creators who blend all disciplines.",
    icon: Zap,
    color: "from-fuchsia-500 to-pink-700"
  }
];

interface LuminorSelectionProps {
  onSelect: (luminorId: string) => void;
}

export function LuminorSelection({ onSelect }: LuminorSelectionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-400 mb-4">
          Choose Your Guide
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Every creator needs a mentor. Your Luminor will guide your journey through the Academy, 
          adapting their teachings to your style. You can bond with others later, but this choice defines your foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {LUMINORS.map((luminor) => (
          <motion.div
            key={luminor.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer transition-all duration-300 ${
              selected === luminor.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]' : 'opacity-80 hover:opacity-100'
            }`}
            onClick={() => setSelected(luminor.id)}
          >
            <Card className="h-full bg-slate-900/50 border-slate-800 overflow-hidden group hover:border-slate-600 transition-colors">
              {/* Header Gradient */}
              <div className={`h-2 w-full bg-gradient-to-r ${luminor.color}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-slate-800/50 text-white`}>
                    <luminor.icon className="w-6 h-6" />
                  </div>
                  {selected === luminor.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </motion.div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{luminor.name}</h3>
                <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${luminor.color} mb-3`}>
                  {luminor.title}
                </p>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {luminor.description}
                </p>

                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  {luminor.academy}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className={`
            px-8 py-6 text-lg rounded-full transition-all duration-300
            ${selected 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          Confirm Bond <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
