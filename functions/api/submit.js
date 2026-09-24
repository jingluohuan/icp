import { CORS_HEADERS } from "./config.js";
export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const name = formData.get('name');
  const url = formData.get('url');
  const description = formData.get('description');
  const webmaster = formData.get('webmaster');
  const email = formData.get('email');
  const category = formData.get('category') || '其他';
  const icon = formData.get('icon') || '';
  const rss = formData.get('rss') || '';
  if (!name || !url || !webmaster || !email) return new Response(JSON.stringify({success:false, message:'请填写所有必填项'}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
  let sites = [];
  const stored = await env.SITES_KV.get('all_sites');
  if (stored) sites = JSON.parse(stored);
  const nextId = sites.length + 1;
  const icp = `牢ICP备2026${String(nextId).padStart(4, '0')}号`;
  sites.push({id: nextId, name, url, description, webmaster, email, category, icon, rss, icp, join_date: new Date().toISOString().split('T')[0], visits: Math.floor(Math.random()*100), status:'pending'});
  await env.SITES_KV.put('all_sites', JSON.stringify(sites));
  return new Response(JSON.stringify({success:true, message:'提交成功，等待审核', icp}), {headers:{'Content-Type':'application/json', ...CORS_HEADERS}});
}
export async function onRequestOptions() { return new Response(null, {headers: CORS_HEADERS}); }
