import re

with open('src/HerbariumContent.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The error looks like: "1. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.", Pressez fermement le marc de racine.",
# Let's just fix any line that contains that broken pattern.
lines = content.split('\n')
for i, line in enumerate(lines):
    if '"filtration_et_finition":' in line and 'Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc."' in line:
        # Just rewrite the whole line or replace the broken part
        # Let's extract everything inside the array and clean it
        # Actually it's easier to just regex replace `", Pressez fermement le marc.*",` with `",` or fix it.
        # Let's do a simple replace:
        lines[i] = re.sub(r'Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède\. Pressez fermement le marc\.",[^"]*",', r'Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc.",', lines[i])

with open('src/HerbariumContent.tsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
