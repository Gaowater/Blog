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
      "Cache-Control": "no-store, no-cache, must-revalidate",
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

    // ═══════════ Journal Todo API（手账待办云端同步，与 Mood 共用 KV，key 前缀 jt: 隔离） ═══════════
    // GET  /api/journal-todos?year=2026&token=xxx         → 获取该年待办勾选全量快照
    // POST /api/journal-todos  body:{year, token, todos}   → 覆盖保存（todos:{date:{text:bool}}）
    const JOURNAL_TOKEN = "selfsync2026";
    const todoTokenOk = (a) => a === JOURNAL_TOKEN;
    const yearOk = (y) => typeof y === "string" && /^\d{4}$/.test(y);

    if (path === "/api/journal-todos") {
      if (request.method === "GET") {
        const year = url.searchParams.get("year");
        const token = url.searchParams.get("token");
        if (!yearOk(year)) {
          return new Response(JSON.stringify({ error: "year required (yyyy)" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        if (!todoTokenOk(token)) {
          return new Response(JSON.stringify({ error: "forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        const raw = await env.MOOD_KV.get("jt:" + year);
        let todos = {};
        if (raw) {
          try {
            todos = JSON.parse(raw);
          } catch (e) {
            todos = {};
          }
        }
        return new Response(JSON.stringify({ ok: true, year, todos }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (request.method === "POST") {
        let body = null;
        try {
          body = await request.json();
        } catch (e) {
          body = null;
        }
        const { year, token, todos } = body || {};
        if (!yearOk(year)) {
          return new Response(JSON.stringify({ error: "year required (yyyy)" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        if (!todoTokenOk(token)) {
          return new Response(JSON.stringify({ error: "forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        // 结构/体积防护：仅收 {date:{text:bool}}，date 必须是 YYYY-MM-DD，总量限 5000 键
        let safe = {};
        let entryCount = 0;
        try {
          for (const [date, dayMap] of Object.entries(todos || {})) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
            if (typeof dayMap !== "object" || dayMap === null || Array.isArray(dayMap)) continue;
            const d = {};
            for (const [text, done] of Object.entries(dayMap)) {
              if (entryCount >= 5000) break;
              if (typeof text !== "string" || text.length === 0 || text.length > 300) continue;
              d[text] = !!done;
              entryCount++;
            }
            if (Object.keys(d).length > 0) safe[date] = d;
          }
        } catch (e) {
          safe = {};
        }
        await env.MOOD_KV.put("jt:" + year, JSON.stringify(safe));
        return new Response(JSON.stringify({ ok: true, year, saved: entryCount }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    // 404
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};
