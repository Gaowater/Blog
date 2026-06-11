lines = open('C:/Users/mouha/Desktop/博客/Blog/src/content/posts/搭建网站过程.md', 'r', encoding='utf-8').readlines()
result = []
in_frontmatter = False
for i, line in enumerate(lines):
    stripped = line.strip()
    if i == 0 and stripped == '---':
        in_frontmatter = True
        result.append(line)
        continue
    if in_frontmatter:
        result.append(line)
        if stripped == '---':
            in_frontmatter = False
        continue
    
    if (stripped == '' or 
        stripped.startswith('#') or 
        stripped.startswith('>') or 
        stripped.startswith('- ') or
        stripped.startswith('-*') or
        stripped in ['---', '___', '***']):
        result.append(line)
    else:
        result.append('- ' + line)

open('C:/Users/mouha/Desktop/博客/Blog/src/content/posts/搭建网站过程.md', 'w', encoding='utf-8').writelines(result)
print('Done')
