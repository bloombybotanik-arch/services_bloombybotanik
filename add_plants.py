import json

with open('new_plants.json', 'r') as f:
    new_plants = f.read().strip()

with open('src/HerbariumContent.tsx', 'r') as f:
    content = f.read()

# We need to find the ending `];` of plantsDatabase which is right before `const PlantAccordion`
insertion_point = content.find("];\n\nconst PlantAccordion")
if insertion_point != -1:
    # Insert a comma and the new plants (minus the starting '[' and ending ']')
    # Wait, the new_plants is a JSON array. We can just extract the inner content.
    inner_content = new_plants[1:-1].strip()
    
    # We also need to add a comma after the last existing object if it doesn't have one
    # Actually, the easiest way is to find the last '  }' before the insertion point
    # and replace `  }\n];` with `  },\n` + inner_content + `\n];`
    
    last_brace_index = content.rfind("  }\n];", 0, insertion_point + 6)
    if last_brace_index != -1:
        new_content = content[:last_brace_index] + "  },\n" + inner_content + "\n];" + content[insertion_point + 2:]
        with open('src/HerbariumContent.tsx', 'w') as f:
            f.write(new_content)
        print("Plants added successfully.")
    else:
        print("Could not find the last brace before ];")
else:
    print("Insertion point not found.")
