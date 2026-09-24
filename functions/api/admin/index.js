import { CORS_HEADERS } from "../config.js";
import { ADMIN_PASSWORD } from "./config.js";
export async function onRequestGet(context) {
  const { request, env } = context;
  const password = new URL(request.url).searchParams.get('password');
  if (password !== ADMIN_PASSWORD) return new Response(JSON.stringify({success:false, message:'密码错误'}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
  let sites = [];
  const stored = await env.SITES_KV.get('all_sites');
  if (stored) sites = JSON.parse(stored);
  return new Response(JSON.stringify({success:true, data:sites}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  if (body.password !== ADMIN_PASSWORD) return new Response(JSON.stringify({success:false, message:'密码错误'}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
  await env.SITES_KV.put('all_sites', JSON.stringify(body.sites));
  return new Response(JSON.stringify({success:true}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestOptions() { return new Response(null, {headers: CORS_HEADERS}); }
