// Cloudflare Pages Functions — 不带验证，显示实际错误
export async function onRequest(context) {
  try {
    const { request, env, next } = context;
    // 尝试用 ASSETS.fetch
    if (typeof env !== 'undefined' && env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    // 备选: next()
    return await next();
  } catch(e) {
    return new Response(
      "MIDDLEWARE ERROR:\\n" + e.toString() + "\\n\\nSTACK:\\n" + (e.stack || "no stack"),
      { status: 500, headers: { "Content-Type": "text/plain;charset=utf-8" } }
    );
  }
}
