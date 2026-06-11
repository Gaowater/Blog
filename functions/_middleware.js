// Cloudflare Pages Functions — 测试 next() 是否正常
export async function onRequest(context) {
  const { request, next } = context;
  try {
    return await next();
  } catch(e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
