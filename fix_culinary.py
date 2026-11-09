import re

with open('src/CulinarySection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add props to CulinarySection
content = content.replace(
    'export default function CulinarySection() {',
    'export default function CulinarySection({ isPremium = false, onRequirePremium }: { isPremium?: boolean, onRequirePremium?: () => void }) {'
)

# In CulinaryAccordion, add isLocked prop
content = content.replace(
    'const CulinaryAccordion: React.FC<{ plant: CulinaryPlantData }> = ({ plant }) => {',
    'const CulinaryAccordion: React.FC<{ plant: CulinaryPlantData, isLocked?: boolean, onRequirePremium?: () => void }> = ({ plant, isLocked, onRequirePremium }) => {'
)

# Modify button in CulinaryAccordion to handle lock
button_replacement = """      <button 
        onClick={() => isLocked ? onRequirePremium?.() : setIsOpen(!isOpen)}
        className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between bg-[#FFF8F0]/50 hover:bg-[#FFF8F0] transition-colors"
      >"""

content = re.sub(
    r'<button\s*onClick=\{\(\) => setIsOpen\(!isOpen\)\}\s*className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between bg\[#FFF8F0\]/50 hover:bg\[#FFF8F0\] transition-colors"\s*>',
    button_replacement,
    content
)

# Add Lock icon near title if locked
title_replacement = """            <h3 className="text-2xl font-bold text-[#F97316] font-serif flex items-center gap-2">
              {plant.nom_commun}
              {isLocked && <span className="text-[#F97316]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>}
            </h3>"""

content = re.sub(
    r'<h3 className="text-2xl font-bold text\[#F97316\] font-serif">\{plant\.nom_commun\}</h3>',
    title_replacement,
    content
)

# Modify the mapping to pass isLocked and onRequirePremium
mapping_replacement = """        {filteredPlants.map((plant, index) => {
          const isLocked = index >= 4 && !isPremium;
          return (
            <CulinaryAccordion 
              key={plant.plant_id} 
              plant={plant} 
              isLocked={isLocked}
              onRequirePremium={onRequirePremium}
            />
          );
        })}"""

content = re.sub(
    r'\{filteredPlants\.map\(\(plant\) => \(\s*<CulinaryAccordion key=\{plant\.plant_id\} plant=\{plant\} />\s*\)\)\}',
    mapping_replacement,
    content
)

with open('src/CulinarySection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
