#!/usr/bin/env node
// Renders .arcanea/lore/synths/roster.json into per-character markdown, the
// roster index and the prompt library. Fails if a coined name collides with a
// locked Arcanea name, another Declared, any name already used in the lore
// corpus, or a well-known franchise robot name.
//
//   node scripts/synths/render.mjs          write files
//   node scripts/synths/render.mjs --check  exit 1 if files are out of date
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = join(root, '.arcanea', 'lore', 'synths');
const data = JSON.parse(readFileSync(join(dir, 'roster.json'), 'utf8'));
const check = process.argv.includes('--check');

// ---------- name collision gate ----------
const LOCKED = [
  'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera', 'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
  'Kaelith', 'Veloura', 'Draconis', 'Laeylinn', 'Otome', 'Yumiko', 'Sol', 'Vaelith', 'Kyuro', 'Source',
  'Lumina', 'Nero', 'Malachar', 'Pyros', 'Aqualis', 'Terra', 'Ventus', 'Synthesis',
  'Amaterasu', 'Thessara', 'Vantara', 'Kadmor', 'Solvane', 'Ordan', 'Oria', 'Amiri', 'Velora',
];
// Names the Declared must never echo (franchise IP distance, not canon).
const FRANCHISE = [
  'Optimus', 'Prime', 'Megatron', 'Bumblebee', 'Starscream', 'Soundwave', 'Ironhide', 'Ratchet',
  'Jazz', 'Wheeljack', 'Jetfire', 'Grimlock', 'Arcee', 'Elita', 'Chromia', 'Perceptor', 'Blaster',
  'Prowl', 'Mirage', 'Hound', 'Kup', 'Springer', 'Magnus', 'Galvatron', 'Shockwave', 'Cybertron',
  'Energon', 'Unicron', 'Primus', 'Autobot', 'Decepticon', 'Maximal', 'Predacon', 'Talos', 'Tron', 'Quorra',
];
function lev(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const problems = [];
const names = data.sworn.map((s) => s.name);
for (const n of names) {
  for (const l of LOCKED) if (lev(n, l) <= 2) problems.push(`${n} is within edit distance 2 of locked name ${l}`);
  for (const f of FRANCHISE) {
    if (lev(n, f) <= 2 || n.toLowerCase().includes(f.toLowerCase())) problems.push(`${n} echoes franchise name ${f}`);
  }
  for (const o of names) if (o !== n && lev(n, o) <= 2) problems.push(`${n} is within edit distance 2 of ${o}`);
}
// Every coined name must be unused anywhere else in the lore corpus (STAGING included).
const CORPUS = ['.arcanea/lore', 'book', 'docs/worldbuilding'].map((p) => join(root, p)).filter(existsSync);
const corpusFiles = CORPUS.flatMap((d) => readdirSync(d, { recursive: true })
  .map((f) => join(d, f))
  .filter((f) => /\.(md|mdx|json|ya?ml)$/.test(f) && !f.startsWith(dir)));
for (const f of corpusFiles) {
  const text = readFileSync(f, 'utf8');
  for (const n of names) {
    if (new RegExp(`\\b${n}\\b`).test(text)) problems.push(`${n} already appears in ${f.slice(root.length + 1)}`);
  }
}
const REQUIRED = ['id', 'name', 'epithet', 'etymology', 'rank', 'hall', 'frame', 'height_m', 'chassis', 'core',
  'silhouette', 'bearing', 'office', 'unfold', 'agent', 'persona'];
const AGENT = ['role', 'result', 'triggers', 'inputs', 'outputs', 'reads', 'writes', 'skills', 'handoffs',
  'human_gates', 'done', 'failure_mode'];
const halls = Object.fromEntries(data.halls.map((h) => [h.id, h]));
for (const s of data.sworn) {
  for (const k of REQUIRED) if (s[k] === undefined || s[k] === '') problems.push(`${s.id}: missing ${k}`);
  for (const k of AGENT) if (!s.agent?.[k] || (Array.isArray(s.agent[k]) && !s.agent[k].length)) problems.push(`${s.id}: agent.${k} missing`);
  if (!halls[s.hall]) problems.push(`${s.id}: unknown hall ${s.hall}`);
  for (const h of s.agent.handoffs) {
    if (!/Marshal|agent|Drones|Wisps|Kin|Motes|Hands|Clerks|Lenses|Aides|Sprites|Embers/.test(h) && !names.includes(h))
      problems.push(`${s.id}: handoff to unknown ${h}`);
  }
}
for (const h of data.halls) {
  if (data.sworn.filter((s) => s.hall === h.id && (s.rank === 'Marshal' || s.rank === 'Keystone')).length !== 1)
    problems.push(`${h.id}: needs exactly one Marshal or Keystone`);
}
if (problems.length) {
  console.error('Synth roster failed:\n- ' + problems.join('\n- '));
  process.exit(1);
}

// ---------- rendering ----------
const STYLE =
  'luxury cosmic myth-tech concept art, original robot character design for the Arcanea universe, ' +
  'materials of crystal, star-forged metal and living stone, never plastic, noble angular silhouette, ' +
  'cosmic dusk lighting with warm gold and cool deep blue, fine bioluminescent seams, museum-grade production value';
const AVOID =
  'Avoid: vehicles of any kind, aircraft, boats, car or truck parts, wheels, treads, jets, guns, faction face badges, any resemblance to existing ' +
  'franchise robots, cyberpunk neon, grime, horror, text, letters, logos, watermarks.';

export function promptFor(s) {
  const h = halls[s.hall];
  return [
    `Character concept sheet on a dark gradient background, wide landscape layout with two views side by side.`,
    `Left: full-body three-quarter view of ${s.name}, ${s.epithet}, a ${s.height_m}-metre ${s.frame}-frame robot in its humanoid Bearing form: ${s.bearing}.`,
    `Silhouette: ${s.silhouette}.`,
    `Right: the same robot transformed into its Office form, ${s.office.replace(/^The /, 'the ')}.`,
    `Chassis of ${s.chassis} with a glowing ${s.core} core at the chest. Palette: ${h.palette_words}. Light: ${h.light}.`,
    `Hall mark etched on the shoulder: ${h.hall_mark.toLowerCase()}.`,
    STYLE + '.',
    AVOID,
  ].join(' ');
}

const out = new Map();
const fm = (o) => '---\n' + Object.entries(o).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n') + '\n---\n';
const list = (a) => a.map((x) => `- ${x}`).join('\n');
const ledger = existsSync(join(dir, 'assets', 'ledger.json'))
  ? JSON.parse(readFileSync(join(dir, 'assets', 'ledger.json'), 'utf8')) : {};

for (const s of data.sworn) {
  const h = halls[s.hall];
  const img = ledger[s.id];
  const a = s.agent;
  out.set(join('characters', `${s.id}.md`), `${fm({
    status: 'STAGING', id: s.id, name: s.name, epithet: s.epithet, rank: s.rank, hall: h.name, gate: h.gate,
    frequency_hz: h.frequency_hz, frame: s.frame, chassis: s.chassis, core: s.core,
  })}
<!-- Generated from roster.json by scripts/synths/render.mjs. Edit the roster, not this file. -->

# ${s.name}, ${s.epithet}

> *"${s.persona.voice}"*

${img ? `![${s.name}: Bearing and Office forms](../assets/${img.file})\n\n*Candidate render, not approved canon art. Provenance in [assets/LEDGER.md](../assets/LEDGER.md).*\n` : '*Render pending.*\n'}
| Field | Value |
|---|---|
| Rank | ${s.rank} |
| Hall | ${h.name} (${h.gate} Gate, ${h.frequency_hz} Hz) |
| Frame class | ${s.frame}, ${s.height_m} m |
| Chassis | ${s.chassis} |
| Oathcore | ${s.core} |
| Palette | \`${h.palette.primary}\` · \`${h.palette.secondary}\` · \`${h.palette.accent}\` |
| Etymology | ${s.etymology} |

## Body

**Silhouette (50 px test):** ${s.silhouette}.

**Bearing (humanoid form):** ${s.bearing}.

**Office (working form):** ${s.office}.

**The Unfolding:** ${s.unfold}.

## Agent binding

| | |
|---|---|
| Role | ${a.role} |
| Result | ${a.result} |
| Reads | ${a.reads} |
| Writes | ${a.writes} |
| Done when | ${a.done} |
| Failure mode | ${a.failure_mode} |

**Triggers**
${list(a.triggers)}

**Inputs → outputs**
${list(a.inputs)}

→
${list(a.outputs)}

**Skills it calls:** ${a.skills.map((x) => `\`${x}\``).join(', ')}

**Hands off to:** ${a.handoffs.join(', ')}

**Stops for a human:**
${list(a.human_gates)}

## Persona

- **Temperament:** ${s.persona.temperament}
- **Oath (inscribed on the Oathcore):** *${s.persona.oath}*
- **Cost:** ${s.persona.cost}

## Image prompt

\`\`\`text
${promptFor(s)}
\`\`\`
`);
}

// Roster index
let idx = `<!-- Generated from roster.json by scripts/synths/render.mjs. Edit the roster, not this file. -->

# The Declared: roster

**Status:** STAGING · ${data.sworn.length} Declared across ${data.halls.length} Halls, plus ${data.halls.length} Attendant droid classes.

${ledger._lineup ? `![The Declared lineup](assets/${ledger._lineup.file})\n\n*Candidate key art, not approved canon. Provenance in [assets/LEDGER.md](assets/LEDGER.md).*\n\n` : ''}`;
for (const h of data.halls) {
  idx += `## ${h.name} · ${h.gate} Gate · ${h.frequency_hz} Hz\n\n${h.domain}. Core crystal: ${h.core_crystal}. Mark: ${h.hall_mark.toLowerCase()}.\n\n| Declared | Rank | Frame | Role | Office |\n|---|---|---|---|---|\n`;
  for (const s of data.sworn.filter((x) => x.hall === h.id)) {
    idx += `| [${s.name}](characters/${s.id}.md), ${s.epithet} | ${s.rank} | ${s.frame} | ${s.agent.role} | ${s.office.split(':')[0]} |\n`;
  }
  idx += `\n**Attendants: ${h.attendant.name}.** ${h.attendant.function} *${h.attendant.visual}.*\n\n`;
}
out.set('ROSTER.md', idx);

// Machine-readable swarm map for agent runtimes
out.set('swarm-map.json', JSON.stringify({
  generated_from: 'roster.json', status: 'STAGING',
  agents: data.sworn.map((s) => ({
    id: s.id, name: s.name, hall: s.hall, gate: halls[s.hall].gate, rank: s.rank,
    role: s.agent.role, behavior_profile: s.chassis, skills: s.agent.skills,
    handoffs: s.agent.handoffs, human_gates: s.agent.human_gates, done: s.agent.done,
  })),
}, null, 2) + '\n');

// Prompt library
let pl = `<!-- Generated from roster.json by scripts/synths/render.mjs. -->

# The Declared: prompt library

**Status:** STAGING.

Shared style block and exclusions are defined in \`scripts/synths/render.mjs\`; see BRAND_KIT.md for the reasoning.

`;
for (const s of data.sworn) pl += `## ${s.name}\n\n\`\`\`text\n${promptFor(s)}\n\`\`\`\n\n`;
out.set('PROMPTS.md', pl);

let stale = 0;
for (const [rel, body] of out) {
  const p = join(dir, rel);
  if (check) {
    if (!existsSync(p) || readFileSync(p, 'utf8') !== body) { console.error(`stale: ${rel}`); stale++; }
  } else {
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, body);
  }
}
if (check && stale) process.exit(1);
console.log(`${check ? 'checked' : 'wrote'} ${out.size} files; ${names.length} names passed the collision gate`);
