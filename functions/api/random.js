import { CORS_HEADERS } from "./config.js";
export async function onRequestGet(context) {
  const { env } = context;
  let sites = [];
  const stored = await env.SITES_KV.get('all_sites');
  if (stored) sites = JSON.parse(stored);
  const approved = sites.filter(s => s.status === 'approved');
  if (approved.length === 0) return new Response(JSON.stringify({success:false, message:'暂无站点'}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
  const random = approved[Math.floor(Math.random() * approved.length)];
  const { email, ...safe } = random;
  return new Response(JSON.stringify({success:true, data: safe}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestOptions() { return new Response(null, {headers: CORS_HEADERS}); }
