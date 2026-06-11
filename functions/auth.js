// Cloudflare Pages Function — 处理密码提交
// URL: /auth (POST)
// 验证密码 → 设置 cookie → 重定向到首页
export async function onRequest(context) {
  const { request } = context;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const form = await request.formData();
    const password = form.get("password") || "";

    // ─── 密码设置 ───
    // 以后想换密码直接改下面的 PASSWORD 值
    const PASSWORD = "853697";

    if (password !== PASSWORD) {
      return new Response(getLoginPage("密码错误，再试一次"), {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    }

    // 密码正确 → 设置 cookie（有效期 30 天），重定向到首页
    const url = new URL(request.url);
    const resp = Response.redirect(`${url.origin}/`, 302);
    resp.headers.set(
      "Set-Cookie",
      "blog_auth=p; Max-Age=2592000; Path=/; SameSite=Lax; HttpOnly"
    );
    return resp;
  } catch (e) {
    return new Response(getLoginPage("出错了，请重试"), {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  }
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
  <p class="error">${error}</p>
  <form method="post" action="/auth">
    <input type="password" name="password" placeholder="密码" autofocus>
    <button type="submit">进入</button>
  </form>
  <p class="hint">仅限受邀访客</p>
</div>
</body>
</html>`;
}
