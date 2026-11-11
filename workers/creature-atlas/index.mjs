// Read-only public catalog API. Ingestion and editorial writes use a separate trusted operator path.
const json=(v,status=200,cache=false)=>Response.json(v,{status,headers:{'Cache-Control':cache?'public, max-age=60':'no-store','X-Content-Type-Options':'nosniff'}});
const publicWhere="e.visibility='public' AND e.publication_status IN ('metadata-only','published')";
const metadata=e=>({id:e.id,name:e.name,kind:e.kind,world:e.world,canon_state:e.canon_state,summary:e.summary,tags:JSON.parse(e.tags_json),verification:e.verification});
export default {
 async fetch(request,env){
  if(request.method!=='GET'&&request.method!=='HEAD') return json({error:'method_not_allowed'},405);
  const url=new URL(request.url);
  if(url.pathname==='/health')return json({service:'arcanea-creature-atlas',schema_version:'0.1.0'});
  if(url.pathname==='/v1/entities'){
   const q=(url.searchParams.get('q')??'').trim().slice(0,120);
   const kind=(url.searchParams.get('kind')??'').slice(0,60);
   const limit=Math.min(50,Math.max(1,Number.parseInt(url.searchParams.get('limit')??'24',10)||24));
   const cursor=(url.searchParams.get('cursor')??'').slice(0,200);
   // Literal tokenization prevents untrusted FTS operators; all values remain bound parameters.
   const tokens=q.match(/[\p{L}\p{N}]+/gu)?.slice(0,10)??[];
   const clauses=[publicWhere,'e.id > ?'];const params=[cursor];let from='atlas_entities e';
   if(kind){clauses.push('e.kind = ?');params.push(kind);}
   if(tokens.length){from+=' JOIN atlas_fts f ON f.entity_id=e.id';clauses.push('atlas_fts MATCH ?');params.push(tokens.map(t=>'"'+t+'"*').join(' AND '));}
   params.push(limit+1);
   const result=await env.DB.prepare(`SELECT e.id,e.name,e.kind,e.world,e.canon_state,e.summary,e.tags_json,e.verification FROM ${from} WHERE ${clauses.join(' AND ')} ORDER BY e.id LIMIT ?`).bind(...params).all();
   const rows=result.results??[]; const more=rows.length>limit;
   return json({items:rows.slice(0,limit).map(metadata),next_cursor:more?rows[limit-1].id:null,search:'fts5'},200,true);
  }
  if(url.pathname.startsWith('/v1/entities/')){
   let id;try{id=decodeURIComponent(url.pathname.slice('/v1/entities/'.length));}catch{return json({error:'bad_id'},400);}
   const e=await env.DB.prepare(`SELECT e.* FROM atlas_entities e WHERE e.id=? AND ${publicWhere}`).bind(id).first();
   if(!e)return json({error:'not_found'},404);
   const sources=await env.DB.prepare('SELECT record_json FROM atlas_sources WHERE entity_id=? AND url IS NOT NULL').bind(id).all();
   const relationships=await env.DB.prepare(`SELECT r.id,r.subject_id,r.predicate,r.object_id,r.status FROM atlas_relationships r JOIN atlas_entities e ON e.id=r.object_id JOIN atlas_entities subject ON subject.id=r.subject_id WHERE (r.subject_id=? OR r.object_id=?) AND ${publicWhere} AND subject.visibility='public' AND subject.publication_status IN ('metadata-only','published')`).bind(id,id).all();
   return json({...metadata(e),sources:(sources.results??[]).map(row=>{const s=JSON.parse(row.record_json);return {id:s.id,url:s.url,title:s.title,publisher:s.publisher,retrieval_status:s.retrieval_status,observed_at:s.observed_at};}),relationships:relationships.results??[]},200,true);
  }
  if(url.pathname.startsWith('/v1/assets/')){
   let id;try{id=decodeURIComponent(url.pathname.slice('/v1/assets/'.length));}catch{return json({error:'bad_id'},400);}
   const a=await env.DB.prepare(`SELECT a.r2_key,a.bucket,a.sha256,a.record_json FROM atlas_assets a JOIN atlas_entities e ON e.id=a.entity_id WHERE a.id=? AND ${publicWhere} AND a.state='approved' AND a.allow_display_public=1 AND a.reviewer IS NOT NULL AND a.reviewed_at IS NOT NULL AND length(a.rights_evidence)>0 AND (a.expires_at IS NULL OR a.expires_at > ?)`).bind(id,new Date().toISOString()).first();
   if(!a||a.bucket!=='starlight-media-private')return json({error:'not_found'},404);
   const obj=await env.MEDIA.get(a.r2_key);if(!obj)return json({error:'not_found'},404);
   const headers=new Headers({'Content-Type':JSON.parse(a.record_json).mime_type??'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store','ETag':'"'+a.sha256+'"'});
   return new Response(request.method==='HEAD'?null:obj.body,{headers});
  }
  return json({error:'not_found'},404);
 }
};
