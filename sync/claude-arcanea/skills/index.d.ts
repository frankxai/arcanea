/**
 * Arcanea Skills for Claude Code
 *
 * Gate-organized skills for creative and technical work.
 */
import type { Skill, GateName } from '@arcanea/core';
export declare const foundationSkills: Skill[];
export declare const flowSkills: Skill[];
export declare const fireSkills: Skill[];
export declare const voiceSkills: Skill[];
export declare const sightSkills: Skill[];
export declare const skillsByGate: Record<GateName, Skill[]>;
export declare const allSkills: Skill[];
export declare function getSkillById(id: string): Skill | undefined;
export declare function getSkillByTrigger(trigger: string): Skill | undefined;
export declare function getSkillsByGate(gate: GateName): Skill[];
//# sourceMappingURL=index.d.ts.map