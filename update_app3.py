import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I want to replace the `currentView === 'article' ? ( ... )` part.
# The part starts with `        {currentView === 'article' ? (`
# And ends before `        ) : currentView === 'library' ? (`

replacement = """        {currentView === 'article' ? (
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24 animate-in fade-in duration-700">
            {/* HERO SECTION - "Le Protocole" */}
            <header className="mb-20 text-center max-w-4xl mx-auto">
              <h1 className="leading-[1.1] tracking-tight text-botanik-green mb-8">
                <span className="block text-[40px] md:text-[64px] font-bold mb-2">
                  Trois Niveaux. Une Seule Machine.
                </span>
                <span className="block text-[32px] md:text-[48px] text-botanik-green/80 font-light">
                  L'Autonomie Complète.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-botanik-green/80 font-medium leading-relaxed mb-12">
                De la cuisine aromatique aux protocoles thérapeutiques avancés, la BloomLab s'adapte à votre niveau d'expertise.
              </p>
            </header>

            <div className="space-y-8 max-w-4xl mx-auto mb-24">
              {/* Niveau 1 */}
              <div className="bg-botanik-green/5 border border-botanik-green/10 rounded-3xl p-8 md:p-12 hover:border-botanik-green/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-botanik-green flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">1</span>
                      L'Art Culinaire Botanique
                    </h3>
                    <p className="text-botanik-green/60 font-medium uppercase tracking-wider text-sm mt-2">Accessible à tous · Gratuit</p>
                  </div>
                  <button onClick={() => setCurrentView('library')} className="px-6 py-3 border border-botanik-green/20 rounded-full text-botanik-green font-medium hover:bg-botanik-green/5 transition-colors whitespace-nowrap">
                    Voir les 4 recettes gratuites →
                  </button>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-botanik-green/80">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Huiles aromatiques</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Miel infusé</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Vinaigres botaniques</li>
                </ul>
              </div>

              {/* Niveau 2 */}
              <div className="bg-botanik-green/5 border border-botanik-green/10 rounded-3xl p-8 md:p-12 hover:border-botanik-green/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-botanik-green flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm">2</span>
                      La Cosmétique Systémique
                    </h3>
                    <p className="text-botanik-green/60 font-medium uppercase tracking-wider text-sm mt-2">Intermédiaire · Gratuit</p>
                  </div>
                  <button onClick={() => setCurrentView('cosmetiques')} className="px-6 py-3 border border-botanik-green/20 rounded-full text-botanik-green font-medium hover:bg-botanik-green/5 transition-colors whitespace-nowrap">
                    Voir les 4 soins gratuits →
                  </button>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-botanik-green/80">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Sérum Réparateur</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Élixir Capillaire</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Huile Massage</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-botanik-green/40" /> Lotion Tonique</li>
                </ul>
              </div>

              {/* Niveau 3 */}
              <div className="bg-botanik-green text-[#F5F3EB] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Lock className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#F5F3EB] text-botanik-green flex items-center justify-center text-sm">3</span>
                      La Phytothérapie de Précision
                    </h3>
                    <p className="text-[#F5F3EB]/60 font-medium uppercase tracking-wider text-sm mt-2">Expert · Réservé BloomLab</p>
                  </div>
                  <button onClick={() => setCurrentView('library')} className="px-6 py-3 border border-[#F5F3EB]/20 rounded-full text-[#F5F3EB] font-medium hover:bg-[#F5F3EB]/10 transition-colors whitespace-nowrap">
                    Découvrir les 56 kits →
                  </button>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[#F5F3EB]/80 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#F5F3EB]/40" /> Kit Renaissance</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#F5F3EB]/40" /> Kit Pureté</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#F5F3EB]/40" /> Kit Peaux</li>
                  <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#F5F3EB]/40" /> 56 recettes avancées</li>
                </ul>
              </div>

              {/* CTA Final */}
              <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-botanik-green mb-8">Prêt à choisir votre niveau d'autonomie ?</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => setCurrentView('library')} className="w-full sm:w-auto px-8 py-4 bg-botanik-green text-white rounded-full font-medium hover:bg-botanik-green/90 transition-colors shadow-lg">
                    Explorer la Bibliothèque
                  </button>
                  <a href="#choix" onClick={(e) => { e.preventDefault(); document.getElementById('choix')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto px-8 py-4 border border-botanik-green/20 text-botanik-green rounded-full font-medium hover:bg-botanik-green/5 transition-colors">
                    Voir les options d'extraction
                  </a>
                </div>
              </div>
            </div>

            {/* Hybrid Offer */}
            <div className="max-w-4xl mx-auto">
              <HybridOffer />
            </div>
          </div>
        )"""

# Use regex to find and replace
content = re.sub(
    r'\{currentView === \'article\' \? \([\s\S]*?(?=\) : currentView === \'library\' \? \()',
    replacement,
    content
)

# And make sure Lock is imported!
if 'import { Lock' not in content and 'Lock,' not in content:
    content = content.replace('import { ShoppingBag', 'import { Lock, ShoppingBag')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
