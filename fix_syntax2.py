import re

def fix(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken pattern is roughly:  .", Some text",
    # Or  ", Some text",
    # We want to replace `.", ` with `. ` if it's inside what should be a string.
    # Actually, the simplest fix is to just replace the specific broken fragments
    
    content = re.sub(r'\.", La ', r'. La ', content)
    content = re.sub(r'\.", Le ', r'. Le ', content)
    content = re.sub(r'\.", Pressez ', r'. Pressez ', content)
    content = re.sub(r'\.", pour ', r'. pour ', content)
    content = re.sub(r'\.", L\'', r". L'", content)
    content = re.sub(r'\.", La racine', r". La racine", content)
    content = re.sub(r'\.", Les ', r". Les ", content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix('src/HerbariumContent.tsx')
fix('src/CosmeticsContent.tsx')
fix('src/CulinarySection.tsx')
