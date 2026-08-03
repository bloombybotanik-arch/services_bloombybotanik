import os
import re

def fix_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace the exact broken string if we can, or just clean up any array entry containing "Filtrez"
    # Actually my previous regex `re.sub(r'"\d*\.?\s*Filtrez.*?(?:\.|\",|",)', ...` was flawed.
    
    # Let's clean up line by line.
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'Filtrez ' in line or 'Filtrez"' in line or "Filtrez TRÈS" in line:
            # We want to keep the numbering and quotes if any, but replace the instruction.
            # e.g., '        "1. Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède.", Pressez fermement.",'
            # Let's extract the number if present.
            match = re.search(r'"(\d+\.\s+)?Filtrez.*?"', line)
            if match:
                prefix = match.group(1) or ""
                # Replace the entire string literal
                lines[i] = re.sub(r'"\d+\.\s+Filtrez.*?"', f'"{prefix}Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc."', line)
            elif 'Filtrez' in line:
                 lines[i] = re.sub(r'"(\d+\.\s+)?.*Filtrez.*?"', r'"\g<1>Filtrez TRÈS finement avec le sac filtre fournit, la préparation encore tiède. Pressez fermement le marc."', line)

    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

fix_file('src/CosmeticsContent.tsx')
fix_file('src/HerbariumContent.tsx')
fix_file('src/CulinarySection.tsx')
