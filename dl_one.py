import urllib.request, os
url = 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900.jpg'
path = r'C:\Users\mouha\Desktop\博客\Blog\public\assets\images\black_myth_wukong.jpg'
if not os.path.exists(path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=20).read()
    with open(path, 'wb') as f: f.write(data)
    print(f'OK: {len(data)} bytes')
else:
    print('SKIP: exists')
