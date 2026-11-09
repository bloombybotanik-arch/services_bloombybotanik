import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacement_hesite = """          <div className="mt-24 text-center bg-[#F5F3EB] rounded-3xl p-12 border border-[#F5F3EB]/20">
            <h3 className="text-3xl font-bold text-botanik-green mb-6">Vous hésitez ?</h3>
            <p className="text-xl text-botanik-green/80 max-w-2xl mx-auto mb-8">
              Testez d'abord les 4 recettes gratuites de la Bibliothèque. Si vous voulez aller plus loin, choisissez votre voie.
            </p>
            <button onClick={() => setCurrentView('library')} className="px-8 py-4 bg-botanik-green text-white rounded-full font-medium hover:bg-botanik-green/90 transition-colors inline-flex items-center gap-2">
              Explorer la Bibliothèque Gratuite <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>"""

content = content.replace('        </div>\n      </section>\n\n      {/* Le Choix Final */}', replacement_hesite + '\n\n      {/* Le Choix Final */}')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
