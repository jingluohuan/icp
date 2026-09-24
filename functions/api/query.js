import { CORS_HEADERS } from "./config.js";
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const domain = url.searchParams.get('domain')?.toLowerCase();
  const icp = url.searchParams.get('icp');
  let sites = [];
  const stored = await env.SITES_KV.get('all_sites');
  if (stored) sites = JSON.parse(stored);
  let result = null;
  if (domain) result = sites.find(s => s.url.toLowerCase().includes(domain) && s.status === 'approved');
  else if (icp) result = sites.find(s => s.icp === icp && s.status === 'approved');
  if (result) {
    const { email, ...safe } = result;
    return new Response(JSON.stringify({success:true, data: safe}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
  }
  return new Response(JSON.stringify({success:false, message:'未找到备案信息，请检查输入或站点尚未审核通过'}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestOptions() { return new Response(null, {headers: CORS_HEADERS}); }
