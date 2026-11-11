import {readFileSync,writeFileSync} from 'node:fs';
import {publicProjection} from '../src/policy.mjs';
const catalog=JSON.parse(readFileSync(new URL('../data/catalog.json',import.meta.url),'utf8'));
const view=publicProjection(catalog);
const seed={entities:view.entities,sources:view.sources,relationships:view.relationships,coverage_note:catalog.coverage_note};
writeFileSync(new URL('../../../apps/web/app/atlas/catalog.json',import.meta.url),JSON.stringify(seed,null,2)+'\n');
console.log(`Built public projection: ${seed.entities.length} entities, ${seed.sources.length} sources`);
