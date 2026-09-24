import { CORS_HEADERS } from "./config.js";
export async function onRequestGet(context) {
  const { env } = context;
  let sites = [];
  const stored = await env.SITES_KV.get('all_sites');
  if (stored) sites = JSON.parse(stored);
  const safeSites = sites.map(s => { const { email, ...rest } = s; return rest; });
  return new Response(JSON.stringify({success:true, data: safeSites}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestOptions() { return new Response(null, {headers: CORS_HEADERS}); }
