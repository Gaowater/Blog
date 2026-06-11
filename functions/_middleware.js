// Cloudflare Pages Functions — 密码保护中间件
// 所有请求先过这里，没登录显示密码页
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";

  // 已登录 → 放行
  if (cookie.includes("blog_auth=p")) return next();

  // 静态资源 → 放行（不然密码页样式也加载不了）
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|mp4|webp|avif)$/)) {
    return next();
  }

  // 处理密码提交
  if (url.pathname === "/auth" && request.method === "POST") {
    try {
      const text = await request.text();
      // 手动解析 form 数据: password=xxx
      var pass = "";
      text.split("&").forEach(function(pair) {
        var parts = pair.split("=");
        if (parts[0] === "password") pass = decodeURIComponent(parts[1] || "");
      });

      if (pass === "853697") {
        // 密码正确 → 设置 cookie (30天)，重定向首页
        const resp = Response.redirect(url.origin + "/", 302);
        resp.headers.set(
          "Set-Cookie",
          "blog_auth=p; Max-Age=2592000; Path=/; SameSite=Lax; HttpOnly"
        );
        return resp;
      }

      // 密码错误
      return new Response(getLoginPage("密码错误，再试一次"), {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    } catch(e) {
      return new Response(getLoginPage("出错了，请重试"), {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    }
  }

  // 没登录 → 显示密码页
  return new Response(getLoginPage(), {
    headers: { "Content-Type": "text/html;charset=utf-8" }
  });
}

function getLoginPage(error) {
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
  ${error ? '<p class="error">'+error+'</p>' : ''}
  <form method="post" action="/auth">
    <input type="password" name="password" placeholder="密码" autofocus>
    <button type="submit">进入</button>
  </form>
  <p class="hint">仅限受邀访客</p>
</div>
</body>
</html>`;
}
