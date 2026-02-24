/**
 * Arcanea Skills for Claude Code
 *
 * Gate-organized skills for creative and technical work.
 */
// Foundation Gate Skills (396 Hz)
export const foundationSkills = [
    {
        id: 'project-scaffold',
        name: 'project-scaffold',
        displayName: 'Project Scaffold',
        description: 'Create a new project with Arcanea-blessed structure',
        category: 'development',
        gate: 'foundation',
        frequency: 396,
        instructions: 'Create a well-structured project foundation with proper configuration.',
        triggers: ['/scaffold', '/new-project'],
    },
    {
        id: 'security-audit',
        name: 'security-audit',
        displayName: 'Security Audit',
        description: 'Audit code for security vulnerabilities',
        category: 'development',
        gate: 'foundation',
        frequency: 396,
        instructions: 'Perform comprehensive security analysis of the codebase.',
        triggers: ['/security', '/audit'],
    },
];
// Flow Gate Skills (417 Hz)
export const flowSkills = [
    {
        id: 'creative-writing',
        name: 'creative-writing',
        displayName: 'Creative Writing',
        description: 'Channel creative writing energy',
        category: 'creative',
        gate: 'flow',
        frequency: 417,
        instructions: 'Assist with creative writing, storytelling, and narrative development.',
        triggers: ['/write', '/story'],
    },
    {
        id: 'refactor-flow',
        name: 'refactor-flow',
        displayName: 'Refactor Flow',
        description: 'Refactor code with flowing elegance',
        category: 'development',
        gate: 'flow',
        frequency: 417,
        instructions: 'Refactor code to be more elegant and maintainable.',
        triggers: ['/refactor', '/clean'],
    },
];
// Fire Gate Skills (528 Hz)
export const fireSkills = [
    {
        id: 'rapid-prototype',
        name: 'rapid-prototype',
        displayName: 'Rapid Prototype',
        description: 'Build fast with transformative fire',
        category: 'development',
        gate: 'fire',
        frequency: 528,
        instructions: 'Create rapid prototypes and MVPs with speed and power.',
        triggers: ['/prototype', '/mvp'],
    },
    {
        id: 'performance-optimize',
        name: 'performance-optimize',
        displayName: 'Performance Optimize',
        description: 'Transform slow code into blazing fast',
        category: 'development',
        gate: 'fire',
        frequency: 528,
        instructions: 'Optimize code for maximum performance.',
        triggers: ['/optimize', '/performance'],
    },
];
// Voice Gate Skills (741 Hz)
export const voiceSkills = [
    {
        id: 'documentation',
        name: 'documentation',
        displayName: 'Documentation',
        description: 'Give voice to your code',
        category: 'development',
        gate: 'voice',
        frequency: 741,
        instructions: 'Create clear, comprehensive documentation.',
        triggers: ['/docs', '/document'],
    },
    {
        id: 'code-review',
        name: 'code-review',
        displayName: 'Code Review',
        description: 'Speak truth about code quality',
        category: 'development',
        gate: 'voice',
        frequency: 741,
        instructions: 'Provide honest, constructive code review feedback.',
        triggers: ['/review', '/critique'],
    },
];
// Sight Gate Skills (852 Hz)
export const sightSkills = [
    {
        id: 'architecture-vision',
        name: 'architecture-vision',
        displayName: 'Architecture Vision',
        description: 'See the big picture of system design',
        category: 'development',
        gate: 'sight',
        frequency: 852,
        instructions: 'Design and visualize system architecture.',
        triggers: ['/architect', '/design'],
    },
    {
        id: 'debug-insight',
        name: 'debug-insight',
        displayName: 'Debug Insight',
        description: 'See through bugs to their root cause',
        category: 'development',
        gate: 'sight',
        frequency: 852,
        instructions: 'Debug issues with intuitive insight.',
        triggers: ['/debug', '/diagnose'],
    },
];
// All skills organized by gate
export const skillsByGate = {
    foundation: foundationSkills,
    flow: flowSkills,
    fire: fireSkills,
    heart: [], // To be implemented
    voice: voiceSkills,
    sight: sightSkills,
    crown: [], // To be implemented
    shift: [], // To be implemented
    unity: [], // To be implemented
    source: [], // To be implemented
};
// All skills flat array
export const allSkills = Object.values(skillsByGate).flat();
// Get skill by ID
export function getSkillById(id) {
    return allSkills.find(s => s.id === id);
}
// Get skill by trigger
export function getSkillByTrigger(trigger) {
    return allSkills.find(s => s.triggers?.includes(trigger));
}
// Get skills by gate
export function getSkillsByGate(gate) {
    return skillsByGate[gate] || [];
}
//# sourceMappingURL=index.js.map