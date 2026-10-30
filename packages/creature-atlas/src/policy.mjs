/** Asset permissions are independent of entity metadata visibility. Unknown = denied. */
export function canUseAsset(asset, operation, now = new Date()) {
  if (!asset || !['store','analyze','embed','display_public','generate_from','train'].includes(operation)) return false;
  if (asset.state === 'revoked' || asset.state === 'deleted') return false;
  if (asset.expires_at && new Date(asset.expires_at) <= now) return false;
  if (asset.permissions?.[operation] !== true) return false;
  if (operation === 'store') return Boolean(asset.rights_evidence);
  return asset.state === 'approved' && Boolean(asset.reviewer && asset.reviewed_at && asset.rights_evidence);
}
export function publicProjection(catalog, now = new Date()) {
  const entities = catalog.entities.filter(e => e.visibility === 'public' && ['metadata-only','published'].includes(e.publication_status));
  const ids = new Set(entities.map(e => e.id));
  const assets = catalog.assets.filter(a => ids.has(a.entity_id) && canUseAsset(a,'display_public',now));
  const allowed = new Set(assets.map(a => a.id));
  return {
    entities: entities.map(({id,name,kind,world,canon_state,summary,tags,verification,rights_note,first_observed_at,evidence_ids,asset_ids}) => ({id,name,kind,world,canon_state,summary,tags,verification,rights_note,first_observed_at,evidence_ids,asset_ids:asset_ids.filter(id=>allowed.has(id))})),
    sources: catalog.sources.filter(s=>ids.has(s.entity_id) && s.url).map(({id,entity_id,url,title,publisher,retrieval_status,observed_at})=>({id,entity_id,url,title,publisher,retrieval_status,observed_at})),
    relationships: catalog.relationships.filter(r=>ids.has(r.subject_id)&&ids.has(r.object_id)),
    assets: assets.map(({id,entity_id,attribution,license_url,sha256})=>({id,entity_id,attribution,license_url,sha256})),
  };
}
export function vectorId({id, model, revision, modality}) {
  if (![id,model,revision,modality].every(v=>typeof v==='string'&&v.length)) throw new Error('Complete vector identity required');
  return [id,model,revision,modality].map(encodeURIComponent).join('|');
}
