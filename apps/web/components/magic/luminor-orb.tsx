"use client";

import { motion } from "framer-motion";

interface LuminorOrbProps {
  name: string;
  domain: string;
  color: string;
  glowColor: string;
  description: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

export function LuminorOrb({ name, domain, color, glowColor, description, size = "md" }: LuminorOrbProps) {
  return (
    <motion.div
      className="group flex flex-col items-center text-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className={`${sizes[size]} rounded-full relative cursor-pointer`}
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}, ${glowColor})` }}
        animate={{
          boxShadow: [
            `0 0 20px ${glowColor}40`,
            `0 0 40px ${glowColor}60`,
            `0 0 20px ${glowColor}40`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-2 rounded-full opacity-50"
          style={{ background: `radial-gradient(circle at 40% 40%, white, transparent)` }}
        />
      </motion.div>

      <motion.div
        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <h3 className="font-cinzel font-bold text-lg" style={{ color }}>{name}</h3>
        <p className="text-sm text-text-secondary">{domain}</p>
      </motion.div>

      <motion.p
        className="mt-2 text-xs text-text-muted max-w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export function LuminorCouncil() {
  const luminors = [
    { name: "Valora", domain: "Courage", color: "#DC143C", glowColor: "#FF6B6B", description: "Face your fears and begin" },
    { name: "Sophron", domain: "Wisdom", color: "#1E3A8A", glowColor: "#3B82F6", description: "Find clarity in complexity" },
    { name: "Kardia", domain: "Heart", color: "#DB2777", glowColor: "#F472B6", description: "Connect with feeling" },
    { name: "Poiesis", domain: "Creation", color: "#F59E0B", glowColor: "#FCD34D", description: "Break free and create" },
    { name: "Enduran", domain: "Endurance", color: "#78350F", glowColor: "#A16207", description: "Persist through challenges" },
    { name: "Orakis", domain: "Vision", color: "#7C3AED", glowColor: "#A78BFA", description: "See the path ahead" },
    { name: "Eudaira", domain: "Joy", color: "#F97316", glowColor: "#FDBA74", description: "Celebrate and delight" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      {luminors.map((luminor, i) => (
        <motion.div
          key={luminor.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <LuminorOrb {...luminor} />
        </motion.div>
      ))}
    </div>
  );
}
