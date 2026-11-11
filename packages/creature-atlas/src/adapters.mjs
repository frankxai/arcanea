/** Pure API adapters: these construct requests/parse candidates; they never grant rights. */
export function commonsImageInfoURL(fileTitle) {
 if(typeof fileTitle!=='string'||!fileTitle.startsWith('File:')||fileTitle.length>300)throw new Error('A Commons File: title is required');
 const url=new URL('https://commons.wikimedia.org/w/api.php');
 url.search=new URLSearchParams({action:'query',format:'json',prop:'imageinfo',titles:fileTitle,iiprop:'url|extmetadata|sha1|size',iiurlwidth:'768',maxlag:'5'}).toString();return url.href;
}
export function wikidataEntityURL(id) {
 if(!/^Q[1-9]\d*$/.test(id))throw new Error('Stable Wikidata Q ID required');
 return 'https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbgetentities',ids:id,format:'json',props:'labels|aliases|descriptions|claims',languages:'en'});
}
export function parseCommonsCandidates(response,observedAt) {
 if(Number.isNaN(Date.parse(observedAt)))throw new Error('Observation timestamp required');
 return Object.values(response.query?.pages??{}).flatMap(page=>(page.imageinfo??[]).map(info=>({
  source_id:'commons:'+page.pageid,title:page.title,source_url:info.descriptionurl??null,
  media_url:info.url??null,thumbnail_url:info.thumburl??null,width:info.width??null,height:info.height??null,
  observed_at:observedAt,source_sha1:info.sha1??null,
  license_candidate:info.extmetadata?.LicenseShortName?.value??null,
  license_url_candidate:info.extmetadata?.LicenseUrl?.value??null,
  creator_metadata:info.extmetadata?.Artist?.value??null,
  raw_license_metadata:info.extmetadata??{},
  rights_review_status:'pending',permissions:{store:false,analyze:false,embed:false,display_public:false,generate_from:false,train:false},
 })));
}
