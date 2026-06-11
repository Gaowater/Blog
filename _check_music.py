import subprocess, sys
commit = sys.argv[1] if len(sys.argv) > 1 else '7e7e046'
result = subprocess.run(['git', 'show', f'{commit}:src/data/collections.ts'], capture_output=True, text=False, cwd=r'C:\Users\mouha\Desktop\博客\Blog')
text = result.stdout.decode('utf-8', errors='replace')
lines = text.split('\n')
for i, line in enumerate(lines):
    if 'musicList' in line:
        start = i
        for j in range(start, min(start+30, len(lines))):
            try:
                print(f'{j}: {lines[j]}')
            except:
                print(f'{j}: [编码错误]')
        break
