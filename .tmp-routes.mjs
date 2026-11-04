import { dev } from "astro";
const server = await dev({ root: ".", logLevel: "error", server: { port: 4408, host: "127.0.0.1" } });
const routes = ["/", "/archive/", "/xiaolinshuo/", "/about/", "/journal/", "/friends/", "/guestbook/", "/search/", "/todo/"];
for (const r of routes) {
  try {
    const res = await fetch("http://127.0.0.1:4408" + r);
    const html = await res.text();
    let extra = "";
    if (res.status !== 200) {
      const t = html.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      extra = " :: " + t.slice(0, 300);
    }
    console.log(String(res.status).padEnd(4), r, extra);
  } catch (e) {
    console.log("FAIL", r, e.message);
  }
}
await server.stop();
process.exit(0);
