import json, os, glob
dialog_dir = r'D:\QwenPawData\workspaces\default\dialog'
for f in sorted(glob.glob(os.path.join(dialog_dir, '*.jsonl'))):
    date = os.path.basename(f).replace('.jsonl', '')
    with open(f, 'r', encoding='utf-8', errors='replace') as fh:
        content = fh.read()
        if '音乐' in content or 'music' in content.lower():
            print(f'{date}: 包含音乐相关')
