import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {publicProjection} from '../src/policy.mjs';
const c=JSON.parse(readFileSync(new URL('../data/catalog.json',import.meta.url),'utf8'));
for(const group of ['entities','sources','relationships','assets','events']) assert.equal(new Set(c[group].map(x=>x.id)).size,c[group].length,`duplicate ${group}`);
const es=new Set(c.entities.map(e=>e.id)),ss=new Set(c.sources.map(s=>s.id)),as=new Set(c.assets.map(a=>a.id));
for(const e of c.entities){assert(es.has(e.id));assert(e.evidence_ids.every(s=>ss.has(s)));assert(e.asset_ids.every(s=>as.has(s)));assert(e.first_observed_at);assert(e.claimed_created_at===null||e.kind==='original-proposal');}
for(const s of c.sources){assert(es.has(s.entity_id));assert(!s.url||new URL(s.url).protocol==='https:');}
for(const r of c.relationships){assert(es.has(r.subject_id)&&es.has(r.object_id)&&ss.has(r.evidence_id));}
for(const a of c.assets){assert(es.has(a.entity_id));assert.match(a.sha256,/^[a-f0-9]{64}$/);assert(a.rights_evidence);if(a.id==='asset:tideglass-loomer-v1' && existsSync(new URL('../media/tideglass-loomer-v1.webp',import.meta.url))){const bytes=readFileSync(new URL('../media/tideglass-loomer-v1.webp',import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);}}
assert.equal(publicProjection(c).assets.length,0,'unreviewed generated asset must remain private');
console.log(JSON.stringify({status:'pass',entities:es.size,sources:ss.size,assets:as.size,public_assets:0}));
