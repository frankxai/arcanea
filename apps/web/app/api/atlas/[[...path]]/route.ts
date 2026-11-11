/** Server-side bridge: no Cloudflare credentials or private R2 URLs reach browsers. */
export async function GET(request: Request, context: {params: Promise<{path?: string[]}>}) {
 const {path=[]}=await context.params;
 if(path.length>1)return Response.json({error:'not_found'},{status:404});
 const base=process.env.ARCANEA_ATLAS_API_URL || 'https://arcanea-creature-atlas.frankxai.workers.dev';
 const upstream=new URL('/v1/entities'+(path[0]?'/'+encodeURIComponent(path[0]):''),base);
 if(upstream.protocol!=='https:')return Response.json({error:'invalid_atlas_configuration'},{status:503});
 const input=new URL(request.url);
 for(const key of ['q','kind','cursor','limit']){const value=input.searchParams.get(key);if(value!==null)upstream.searchParams.set(key,value);}
 try{
  const result=await fetch(upstream,{signal:AbortSignal.timeout(5000),cache:'no-store'});
  const body=await result.json();
  return Response.json(body,{status:result.status,headers:{'Cache-Control':'public, max-age=30'}});
 }catch{return Response.json({error:'atlas_unavailable'},{status:503});}
}
