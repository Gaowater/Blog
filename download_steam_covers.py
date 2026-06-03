"""Download Steam game covers using akamai CDN."""
import urllib.request, os, time

games = {
    550: "left4dead2.jpg",
    255710: "cities_skylines.jpg",
    323190: "frostpunk.jpg",
    582160: "assassins_creed_origins.jpg",
    588650: "dead_cells.jpg",
    601150: "devil_may_cry_5.jpg",
    750920: "shadow_of_tomb_raider.jpg",
    1057090: "ori_will_wisps.jpg",
    1174180: "rdr2.jpg",
    1222140: "detroit_become_human.jpg",
    1238810: "battlefield_5.jpg",
    1288310: "firework.jpg",
    1850570: "death_stranding_dc.jpg",
    2050650: "re4.jpg",
    2290180: "riders_republic.jpg",
    2358720: "black_myth_wukong.jpg",
    2704110: "aliya_timelink.jpg",
    3241660: "repo.jpg",
}

save_dir = r"C:\Users\mouha\Desktop\博客\Blog\public\assets\images"
os.makedirs(save_dir, exist_ok=True)

for appid, filename in games.items():
    path = os.path.join(save_dir, filename)
    if os.path.exists(path):
        print(f"  SKIP: {filename}")
        continue
    url = f"https://steamcdn-a.akamaihd.net/steam/apps/{appid}/library_600x900.jpg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=20).read()
        with open(path, "wb") as f:
            f.write(data)
        print(f"  OK: {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"  FAIL: {filename} - {e}")
    time.sleep(0.3)

print("\nDone!")
