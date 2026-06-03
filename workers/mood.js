// Mood API - 两人心情共享
// GET  /api/mood?user=mouhe  → 获取某人的心情
// GET  /api/mood            → 获取两人的心情
// POST /api/mood  body:{user,mood} → 设置心情（mood为空字符串=重置）

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const path = url.pathname;

    // GET /api/mood
    if (request.method === "GET" && path === "/api/mood") {
      const user = url.searchParams.get("user");
      if (user) {
        const mood = await env.MOOD_KV.get(user);
        return new Response(JSON.stringify({ user, mood: mood || null }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        const mouhe = await env.MOOD_KV.get("mouhe");
        const yiliu = await env.MOOD_KV.get("yiliu");
        return new Response(JSON.stringify({
          mouhe: mouhe || null,
          yiliu: yiliu || null,
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // POST /api/mood
    if (request.method === "POST" && path === "/api/mood") {
      const body = await request.json();
      const { user, mood } = body;
      // user 必填；mood 可以是空字符串（重置）
      if (!user || mood === undefined) {
        return new Response(JSON.stringify({ error: "user required, mood can be empty" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (mood) {
        await env.MOOD_KV.put(user, mood);
      } else {
        await env.MOOD_KV.delete(user);
      }
      return new Response(JSON.stringify({ ok: true, user, mood }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 404
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};
