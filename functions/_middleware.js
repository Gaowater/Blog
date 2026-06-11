// Cloudflare Pages Functions — 先测试 ASSETS.fetch 是否正常
export async function onRequest(context) {
  const { request, env } = context;
  // 直接输出站点页面，不带验证
  return env.ASSETS.fetch(request);
}
