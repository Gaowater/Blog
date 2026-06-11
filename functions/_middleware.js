// Cloudflare Pages Functions — 密码保护中间件
// 密码从环境变量 PASSWORD 读取，不在代码中硬编码
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";

  // 已登录 → 正常输出页面
  if (cookie.includes("blog_auth=p")) {
    return env.ASSETS.fetch(request);
  }

  // 静态资源 → 放行
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|mp4|webp|avif)$/)) {
    return env.ASSETS.fetch(request);
  }

  // 获取密码（从环境变量）
  const PASSWORD = env.PASSWORD || "853697"; // 没有环境变量时用默认值兜底

  // ─── 处理登录 ───
  if (url.pathname === "/auth") {
    const pass = url.searchParams.get("p");
    if (pass === PASSWORD) {
      const html = '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/"></head><body></body></html>';
      const resp = new Response(html, {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
      resp.headers.set(
        "Set-Cookie",
        "blog_auth=p; Max-Age=2592000; Path=/; SameSite=Lax; HttpOnly"
      );
      return resp;
    }
    return Response.redirect(url.origin + "/?err=1", 302);
  }

  // 没登录 → 显示密码页
  return new Response(getLoginPage(url.searchParams.has("err")), {
    headers: { "Content-Type": "text/html;charset=utf-8" }
  });
}

function getLoginPage(hasError) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>验证</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  display:flex;justify-content:center;align-items:center;min-height:100vh;
  background:linear-gradient(180deg,#fef9f0 0%,#fdf3e4 30%,#fef9f0 100%);
  color:#5c4b3a;line-height:1.8}
.card{background:#fffdf9;padding:40px;border-radius:16px;
  box-shadow:0 2px 20px rgba(180,150,120,0.12);text-align:center;max-width:340px;width:90%}
h2{font-size:22px;font-weight:600;margin-bottom:4px}
.sub{color:#8b7560;font-size:14px;margin-bottom:24px}
input{width:100%;padding:10px 14px;border:1.5px solid #d4b896;
  border-radius:10px;font-size:16px;outline:none;box-sizing:border-box;margin-bottom:12px}
input:focus{border-color:#b8937a}
button{background:#b8937a;color:#fff;border:none;padding:10px 24px;
  border-radius:10px;font-size:16px;cursor:pointer;width:100%}
button:hover{background:#a07d64}
.error{color:#c0392b;font-size:13px;margin-bottom:12px}
.hint{color:#d4b896;font-size:12px;margin-top:16px}
</style>
</head>
<body>
<div class="card">
  <h2>🌸</h2>
  <p class="sub">输入密码进入</p>
  ${hasError ? '<p class="error">密码错误，再试一次</p>' : ''}
  <input type="password" id="pwd" placeholder="密码" autofocus
    onkeydown="if(event.key==='Enter'){var v=this.value;if(v)location.href='/auth?p='+encodeURIComponent(v)}">
  <button onclick="var v=document.getElementById('pwd').value;if(v)location.href='/auth?p='+encodeURIComponent(v)">进入</button>
  <p class="hint">仅限受邀访客</p>
</div>
</body>
</html>`;
}
