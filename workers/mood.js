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

    // ═══════════ Meting 音乐接口（自带缓存层 + 直链解析，替代公共 API 直连） ═══════════
    // GET /api/meting?server=netease&type=playlist&id=xxx        → 歌单/专辑/搜索数据（字段已规范化）
    // GET /api/meting/media?server=netease&type=url|pic|lrc&id=x  → 302 跳转到真实资源
    if (path === "/api/meting" || path === "/api/meting/media") {
      const isMedia = path === "/api/meting/media";
      const server = url.searchParams.get("server") || "netease";
      const type = url.searchParams.get("type") || "playlist";
      const id = url.searchParams.get("id") || "";

      if (!id) {
        return new Response(JSON.stringify({ error: "id required" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // 缓存键：只保留白名单参数，避免 :r 随机数把缓存打散
      const cacheKey = new Request(
        "https://meting-cache.internal/" +
          (isMedia ? "media" : "data") +
          "?server=" + encodeURIComponent(server) +
          "&type=" + encodeURIComponent(type) +
          "&id=" + encodeURIComponent(id),
        { method: "GET" },
      );

      const cache = caches.default;
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      // url 直链带时间戳签名，缓存要短；封面/歌词/歌单可以长
      const ttl = isMedia ? (type === "url" ? 240 : 86400) : 1800;

      try {
        const qs =
          "server=" + encodeURIComponent(server) +
          "&type=" + encodeURIComponent(type) +
          "&id=" + encodeURIComponent(id) +
          "&r=" + Date.now();
        const upstream = await metingUpstream(qs);

        if (isMedia) {
          const location = upstream.headers.get("Location");
          let resp;
          if (location) {
            // 上游给的是 302 直链 → 原样透传，前端少一次解析
            resp = new Response(null, {
              status: 302,
              headers: {
                Location: location,
                "Cache-Control": "public, max-age=" + ttl,
                ...corsHeaders,
              },
            });
          } else {
            const body = await upstream.arrayBuffer();
            resp = new Response(body, {
              status: upstream.status === 200 ? 200 : 502,
              headers: {
                "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream",
                "Cache-Control": "public, max-age=" + ttl,
                ...corsHeaders,
              },
            });
          }
          ctx.waitUntil(cache.put(cacheKey, resp.clone()));
          return resp;
        }

        const raw = await upstream.json();
        const list = Array.isArray(raw) ? raw : [];
        const mediaUrl = function (kind, src) {
          const mid = idFromUrl(src);
          if (!mid) return typeof src === "string" ? src : "";
          return "/api/meting/media?server=" + encodeURIComponent(server) +
            "&type=" + kind + "&id=" + encodeURIComponent(mid);
        };
        const normalized = list.map(function (item) {
          return {
            name: item.name || item.title || "Unknown",
            artist: item.artist || item.author || "Unknown",
            url: mediaUrl("url", item.url),
            pic: mediaUrl("pic", item.pic || item.cover),
            lrc: mediaUrl("lrc", item.lrc),
          };
        });

        const resp = new Response(JSON.stringify(normalized), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=" + ttl,
            ...corsHeaders,
          },
        });
        ctx.waitUntil(cache.put(cacheKey, resp.clone()));
        return resp;
      } catch (e) {
        return new Response(JSON.stringify({ error: "upstream failed", detail: String(e) }), {
          status: 502,
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders },
        });
      }
    }

    // 404
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};

// ═══════════ Meting 上游请求（多接口 + 超时，避免单个接口挂起拖死整个请求） ═══════════
const METING_UPSTREAM_APIS = [
  "https://api.i-meto.com/meting/api?",
  "https://api.injahow.cn/meting/?",
  "https://api.moeyao.cn/meting/?",
];

function idFromUrl(v) {
  if (typeof v !== "string" || !v) return "";
  const m = v.match(/[?&]id=([^&#]+)/);
  return m ? m[1] : "";
}

async function metingUpstream(qs) {
  let lastError = null;
  for (const base of METING_UPSTREAM_APIS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const resp = await fetch(base + qs, {
        signal: controller.signal,
        redirect: "manual",
        headers: { Accept: "application/json, */*" },
      });
      clearTimeout(timer);
      // 302 是媒体直链的正常表现；200 是数据接口
      if (resp.status === 200 || resp.status === 302) return resp;
      lastError = new Error("HTTP " + resp.status);
    } catch (e) {
      clearTimeout(timer);
      lastError = e;
    }
  }
  throw lastError || new Error("all upstreams failed");
}
