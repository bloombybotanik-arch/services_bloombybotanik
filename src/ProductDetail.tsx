import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Thermometer, Timer, RefreshCw, ShoppingBag, FlaskConical, Beaker, Leaf, ChefHat, X, Star, Heart, Share2, Info, Award } from 'lucide-react';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
import trioPouchesImg from './assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from './assets/images/product_feu_articulaire.jpg';
import bouclierHiverImg from './assets/images/product_bouclier_hiver.jpg';
import nuitProfondeImg from './assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from './assets/images/product_seve_fondamentale.jpg';
import digestionImg from './assets/images/product_digestion.jpeg';
// import headerImg from './assets/images/Header.jpeg';
import img2 from './assets/images/2-1.png';
import img3 from './assets/images/3-1.png';
import img4 from './assets/images/4-1.png';
import img5 from './assets/images/5-1.png';
import img6 from './assets/images/6-1.png';

interface ProductDetailProps {
  onBack: () => void;
  onAddToCart: (product: any) => void;
  productId?: string;
}

const productSheets: Record<string, any> = {
  'bloomlab': {
    name: "BloomLab",
    subtitle: "SOUVERAINETÉ SANTÉ 2026",
    price: 289,
    originalPrice: 329,
    images: [bloomLabImg, img2, img3, img4, img5, img6],
    description: "La première machine 6-en-1 grand public capable de réaliser à domicile des extractions botaniques complexes — huiles infusées, sérums, teintures, macérats — avec un contrôle de paramètres (temps, température, séquençage) habituellement réservé aux laboratoires professionnels.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">La BloomLab est la première machine 6-en-1 grand public capable de réaliser à domicile des extractions botaniques complexes — huiles infusées, sérums, teintures, macérats — avec un contrôle de paramètres (temps, température, séquençage) habituellement réservé aux laboratoires professionnels. Ce n'est pas un simple mixeur ou infuseur : c'est un outil de formulation botanique accessible à des non-chimistes.</p>

        <h2 class="text-3xl font-bold mb-6 mt-12">Le maillon manquant : l'écart entre savoir et produire</h2>
        <p class="mb-6">Jusqu'ici, le paysage des soins à base de plantes était fragmenté en deux mondes sans pont réel :</p>
        <ul class="space-y-4 mb-8">
          <li><strong>Côté consommateur :</strong> des poudres, gélules, huiles essentielles et compléments préfabriqués, standardisés, formulés pour le plus grand nombre — efficaces mais sans personnalisation ni fraîcheur moléculaire.</li>
          <li><strong>Côté professionnel :</strong> des laboratoires d'extraction capables de réaliser des macérats huileux de précision, des doubles extractions, des fractions lipophiles/hydrophiles — mais avec des équipements à des dizaines de milliers d'euros, inaccessibles à 99% des personnes.</li>
        </ul>
        <p class="mb-8">La BloomLab ferme cet écart en démocratisant la maîtrise des paramètres critiques de l'extraction :</p>
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
            <h4 class="font-bold text-[#F97316] mb-2">La température</h4>
            <p class="text-sm">Préservation des polyphénols sensibles à la chaleur.</p>
          </div>
          <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
            <h4 class="font-bold text-[#F97316] mb-2">La durée</h4>
            <p class="text-sm">Extraction optimale sans dégradation.</p>
          </div>
          <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
            <h4 class="font-bold text-[#F97316] mb-2">Le séquençage</h4>
            <p class="text-sm">Extraction par phases de polarité distincte.</p>
          </div>
        </div>

        <h3 class="text-2xl font-bold mb-4">Pourquoi les méthodes maison donnent souvent des résultats décevants</h3>
        <p class="mb-4">Les macérations artisanales reposent souvent sur :</p>
        <ul class="list-disc pl-6 mb-6">
          <li>une température mal contrôlée</li>
          <li>une agitation insuffisante</li>
          <li>une extraction partielle des composés végétaux</li>
        </ul>
        <div class="bg-[#F97316]/5 border-l-4 border-[#F97316] p-6 mb-12">
          <p class="font-bold mb-2">Résultat :</p>
          <p class="text-sm">Extraits faibles, résultats variables et perte d’une partie des actifs de la plante. BloomLab a été conçu pour résoudre ces limites.</p>
        </div>

        <h2 class="text-3xl font-bold mb-6">Une extraction botanique optimisée automatiquement</h2>
        <p class="mb-8">BloomLab agit sur les trois paramètres clés de l’extraction végétale.</p>
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg></div>
            <h4 class="font-bold mb-2">Température régulée</h4>
            <p class="text-sm opacity-70">Protège les composés végétaux sensibles.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></div>
            <h4 class="font-bold mb-2">Agitation dynamique</h4>
            <p class="text-sm opacity-70">Favorise la libération des actifs de la plante.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg></div>
            <h4 class="font-bold mb-2">Temps contrôlé</h4>
            <p class="text-sm opacity-70">Garantit une extraction régulière et reproductible.</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold mb-6">Ce que vous pouvez créer avec BloomLab</h2>
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
            <h4 class="font-bold text-[#1B3022] mb-4">Cosmétique botanique</h4>
            <ul class="text-sm space-y-2 opacity-70">
              <li>• macérats huileux pour la peau et les cheveux</li>
              <li>• huiles de soin et massages</li>
              <li>• beurres infusés</li>
            </ul>
          </div>
          <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
            <h4 class="font-bold text-[#1B3022] mb-4">Remèdes aux plantes</h4>
            <ul class="text-sm space-y-2 opacity-70">
              <li>• teintures végétales</li>
              <li>• extraits concentrés</li>
              <li>• infusions précises</li>
            </ul>
          </div>
          <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
            <h4 class="font-bold text-[#1B3022] mb-4">Cuisine botanique</h4>
            <ul class="text-sm space-y-2 opacity-70">
              <li>• huiles aromatiques</li>
              <li>• vinaigres infusés</li>
              <li>• beurres aux herbes</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold mb-8">Un protocole automatisé 6-en-1</h2>
        <div class="space-y-4 mb-12">
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">1️⃣</span> <span>Préparation de la plante</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">2️⃣</span> <span>Infusion dynamique par agitation</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">3️⃣</span> <span>Contrôle thermique précis (±1 °C)</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">4️⃣</span> <span>Liaison homogène plante / solvant</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">5️⃣</span> <span>Filtration nette pour un extrait limpide</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
            <span class="font-bold text-[#F97316]">6️⃣</span> <span>Cycle de nettoyage automatique</span>
          </div>
        </div>

        <h2 class="text-3xl font-bold mb-6">Solvants compatibles</h2>
        <div class="flex flex-wrap gap-4 mb-12">
          <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Huiles végétales</span>
          <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Beurre</span>
          <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Alcool</span>
          <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Vinaigre</span>
        </div>

        <div class="bg-[#F9F9F7] p-10 rounded-[40px] border border-[#1B3022]/10 mb-12">
          <h3 class="text-2xl font-bold mb-6">Tout est inclus pour commencer immédiatement</h3>
          <ul class="grid md:grid-cols-2 gap-4">
            <li class="flex items-center gap-2">✔ sac filtre ultra-fin 90 microns</li>
            <li class="flex items-center gap-2">✔ gant silicone de protection</li>
            <li class="flex items-center gap-2">✔ flacon ambré 100 ml</li>
            <li class="flex items-center gap-2">✔ distributeur sérum</li>
            <li class="flex items-center gap-2">✔ pot cosmétique 50 g</li>
            <li class="flex items-center gap-2">✔ guide de recettes</li>
            <li class="flex items-center gap-2">✔ accès Bloom Academy (vidéos + calendrier botanique)</li>
          </ul>
        </div>

        <section class="mb-12 bg-[#F9F9F7] p-12 md:p-16 rounded-[40px] border border-[#1B3022]/5">
          <div class="flex items-center gap-4 mb-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#1B3022]"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <h2 class="text-3xl font-bold text-[#1B3022] whitespace-nowrap">Spécifications techniques</h2>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Matériaux</div>
              <div class="font-bold text-xl text-[#1B3022]">Inox SU304</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Capacité</div>
              <div class="font-bold text-xl text-[#1B3022]">1,2 L</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Température</div>
              <div class="font-bold text-xl text-[#1B3022]">0 °C à 121 °C</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Modes</div>
              <div class="font-bold text-xl text-[#1B3022]">6 modes auto</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Entretien</div>
              <div class="font-bold text-xl text-[#1B3022]">Nettoyage intégré</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-[#1B3022]/40 font-bold mb-3">Garantie</div>
              <div class="font-bold text-xl text-[#1B3022]">1 an</div>
            </div>
          </div>
        </section>

        <h2 class="text-3xl font-bold mb-6">À qui s’adresse BloomLab ?</h2>
        <p class="mb-6">En 2026, le marché des soins naturels est paradoxalement saturé de produits génériques et fragmentés : des huiles vendues seules, des poudres de plantes en vrac, des compléments standardisés à dose fixe. La BloomLab répond à cette demande de souveraineté formulative : elle permet à chaque homme & femme de devenir l'architecte de ses propres soins, avec la précision d'un laboratoire et la connaissance de l'origine de chaque ingrédient.</p>

        <div class="bg-[#1B3022] text-white p-10 rounded-[40px] mb-12">
          <h3 class="text-2xl font-bold mb-6 text-[#F97316]">Le Cerveau Thermique de Précision (Technologie PID)</h3>
          <p class="leading-relaxed opacity-90">Contrairement aux extracteurs classiques qui font fluctuer la température et détruisent les principes actifs fragiles, la BloomLab est équipée d'un contrôleur PID de laboratoire. Il anticipe les variations de chaleur pour maintenir une stabilité parfaite à ±0,5°C près. C'est la seule garantie que les molécules thermolabiles (comme les terpènes ou les acides boswelliques) soient préservées à 100%, transformant votre cuisine en véritable laboratoire d'extraction du Totum.</p>
        </div>
      </div>
    `,
    specs: [
      { label: "Contrôle", value: "0 °C à 121 °C", icon: Thermometer },
      { label: "Matériau", value: "Inox 304 Certifié", icon: FlaskConical },
      { label: "Temps", value: "30min à 12h", icon: Timer },
      { label: "Agitation", value: "Régulière / Dynamique", icon: RefreshCw }
    ]
  },
  'seve-fondamentale': {
    name: "SÈVE FONDAMENTALE",
    subtitle: "PROTOCOLE DE RESTAURATION BOTANIQUE",
    price: 12.90,
    images: [seveFondamentaleImg],
    description: "Sève Fondamentale est un protocole de restauration botanique pensé pour accompagner le terrain minéral et structurant de l’organisme.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">Sève Fondamentale est un protocole de restauration botanique pensé pour accompagner le terrain minéral et structurant de l’organisme. Grâce à la technologie BloomLab, l’extraction est réalisée en deux phases afin de préserver au mieux la richesse active des plantes et de rendre la formule plus cohérente avec son usage.</p>
        
        <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
        <ul class="space-y-3 mb-6">
          <li><strong>Posologie courante :</strong> 20 gouttes par jour, à diluer dans un verre d’eau.</li>
          <li><strong>Prise conseillée :</strong> 10 gouttes le matin et 10 gouttes le soir.</li>
          <li><strong>Dose maximale :</strong> ne pas dépasser 30 gouttes par jour.</li>
          <li><strong>Durée d’utilisation :</strong> suivre la cure pendant la durée indiquée sur le protocole du produit.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8">Comment l’utiliser</h3>
        <ul class="space-y-3 mb-6">
          <li>Agiter le flacon avant emploi.</li>
          <li>Prendre les gouttes dans un peu d’eau.</li>
          <li>Commencer par la dose courante avant toute montée progressive.</li>
          <li>En cas de sensibilité, commencer à 10 gouttes par jour pendant 2 à 3 jours, puis augmenter si tout est bien toléré.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-botanik-orange">Précautions</h3>
        <div class="bg-[#F97316]/5 p-6 rounded-2xl border border-[#F97316]/10 mb-6">
          <ul class="space-y-2 text-sm">
            <li>• Ne pas dépasser la dose maximale journalière.</li>
            <li>• Déconseillé pendant la grossesse et l’allaitement sans avis professionnel.</li>
            <li>• Déconseillé en cas d’allergie connue à l’une des plantes de la formule.</li>
            <li>• Déconseillé en cas de traitement médical en cours sans validation adaptée.</li>
            <li>• Ne pas utiliser chez l’enfant sans recommandation spécifique.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-red-700">Contre-indications</h3>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
          <ul class="space-y-2 text-sm text-red-900">
            <li>• Allergie aux plantes de la formule.</li>
            <li>• Grossesse.</li>
            <li>• Allaitement.</li>
            <li>• Intolérance à l’un des constituants.</li>
            <li>• Terrain médical complexe nécessitant un avis personnalisé.</li>
          </ul>
        </div>
      </div>
    `,
    specs: [
      { label: "Format", value: "50g Bio-Botanique", icon: Leaf },
      { label: "Cible", value: "Peau, Cheveux, Ongles", icon: ShieldCheck }
    ]
  },
  'nuit-profonde': {
    name: "NUIT PROFONDE",
    subtitle: "Ingénierie du Repos & Régulation du Système Nerveux",
    price: 9.90,
    images: [nuitProfondeImg],
    description: "Réponse structurelle à la charge mentale et à l'agitation nocturne.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">Le CONCENTRÉ NUIT PROFONDE est une réponse structurelle à la charge mentale et à l'agitation nocturne. Ce n'est pas une simple tisane de détente, mais une intervention botanique séquencée conçue pour synchroniser votre horloge interne.</p>
        
        <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
        <ul class="space-y-3 mb-6">
          <li><strong>Posologie courante :</strong> 20 gouttes, environ 45 minutes avant le coucher.</li>
          <li><strong>Dose maximale :</strong> ne pas dépasser 30 gouttes par jour.</li>
          <li><strong>Durée d’utilisation :</strong> cure de 21 jours, renouvelable après 1 semaine de pause.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8">Comment l’utiliser</h3>
        <ul class="space-y-3 mb-6">
          <li>Agiter le flacon avant emploi.</li>
          <li>Prendre les gouttes dans un peu d'eau ou directement sous la langue pour un effet plus rapide.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-botanik-orange">Précautions</h3>
        <div class="bg-[#F97316]/5 p-6 rounded-2xl border border-[#F97316]/10 mb-6">
          <ul class="space-y-2 text-sm">
            <li>• Ne pas conduire ou utiliser de machines après la prise.</li>
            <li>• Déconseillé pendant la grossesse et l’allaitement.</li>
            <li>• Tenir hors de portée des enfants.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-red-700">Contre-indications</h3>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
          <ul class="space-y-2 text-sm text-red-900">
            <li>• Allergie aux plantes de la formule (Valériane, Passiflore).</li>
            <li>• Prise concomitante de somnifères ou d'alcool.</li>
          </ul>
        </div>
      </div>
    `,
    specs: [
      { label: "Usage", value: "45 min avant coucher", icon: Timer },
      { label: "Note", value: "Haute concentration", icon: Info }
    ]
  },
  'confort-digestif': {
    name: "ÉQUILIBRE & FLUX",
    subtitle: "Ingénierie du Métabolisme & Maintenance Interne",
    price: 9.90,
    images: [digestionImg],
    description: "Protocole de gestion des fluides et de maintenance des réseaux internes.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">Le CONCENTRÉ ÉQUILIBRE & FLUX est un protocole de gestion des fluides. Dans notre vision architecturale, la digestion est le centre de transformation énergétique de votre édifice.</p>
        
        <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
        <ul class="space-y-3 mb-6">
          <li><strong>Posologie courante :</strong> 20 gouttes par jour, à diluer dans un verre d’eau.</li>
          <li><strong>Prise conseillée :</strong> après le repas principal ou le matin à jeun.</li>
          <li><strong>Dose maximale :</strong> ne pas dépasser 30 gouttes par jour.</li>
          <li><strong>Durée d’utilisation :</strong> cure de 21 jours.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8">Comment l’utiliser</h3>
        <ul class="space-y-3 mb-6">
          <li>Agiter le flacon avant emploi.</li>
          <li>Diluer dans un grand verre d'eau tempérée.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-botanik-orange">Précautions</h3>
        <div class="bg-[#F97316]/5 p-6 rounded-2xl border border-[#F97316]/10 mb-6">
          <ul class="space-y-2 text-sm">
            <li>• Ne pas dépasser la dose journalière recommandée.</li>
            <li>• Un complément alimentaire ne remplace pas une alimentation variée.</li>
            <li>• Déconseillé aux femmes enceintes.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-red-700">Contre-indications</h3>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
          <ul class="space-y-2 text-sm text-red-900">
            <li>• Obstruction des voies biliaires.</li>
            <li>• Allergie aux plantes de la famille des Astéracées.</li>
          </ul>
        </div>
      </div>
    `,
    specs: [
      { label: "Moment", value: "Après repas / Matin", icon: ChefHat },
      { label: "Action", value: "Assainissement Flux", icon: RefreshCw }
    ]
  },
  'feu-articulaire': {
    name: "MOUVEMENT LIBRE",
    subtitle: "Ingénierie de la Souplesse & Maintenance Articulaire",
    price: 9.90,
    images: [feuArticulaireImg],
    description: "Réponse technique aux besoins de flexibilité de votre édifice biologique.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">Le CONCENTRÉ MOUVEMENT LIBRE utilise une extraction séquentielle de haute précision pour libérer les acides boswelliques indispensables à la résilience de votre structure.</p>
        
        <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
        <ul class="space-y-3 mb-6">
          <li><strong>Posologie courante :</strong> 20 gouttes par jour, à diluer dans un verre d’eau.</li>
          <li><strong>Prise conseillée :</strong> le matin pour un soutien structurel quotidien.</li>
          <li><strong>Dose maximale :</strong> ne pas dépasser 30 gouttes par jour.</li>
          <li><strong>Durée d’utilisation :</strong> cure de 21 jours, renouvelable.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8">Comment l’utiliser</h3>
        <ul class="space-y-3 mb-6">
          <li>Agiter le flacon avant emploi.</li>
          <li>Diluer dans un verre d'eau ou de jus.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-botanik-orange">Précautions</h3>
        <div class="bg-[#F97316]/5 p-6 rounded-2xl border border-[#F97316]/10 mb-6">
          <ul class="space-y-2 text-sm">
            <li>• Déconseillé en cas d'ulcères gastriques.</li>
            <li>• Consulter un médecin en cas de prise d'anticoagulants.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-red-700">Contre-indications</h3>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
          <ul class="space-y-2 text-sm text-red-900">
            <li>• Allergie aux salicylés (Reine des Prés).</li>
            <li>• Asthme sévère.</li>
          </ul>
        </div>
      </div>
    `,
    specs: [
      { label: "Cible", value: "Articulations", icon: ShieldCheck },
      { label: "Bénéfice", value: "Fluidité Structurelle", icon: RefreshCw }
    ]
  },
  'duo-argiles': {
    name: "Duo RESET Précision 6µm",
    subtitle: "Adsorbant Naturel & Pureté Pharmacopée",
    price: 44.90,
    originalPrice: 49.00,
    images: [duoArgilesImg],
    description: "3 fois plus fin que les standards du marché (6µm). Puissance d'adsorption inégalée.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none">
        <p class="text-lg mb-8">Le Duo RESET à 6 microns garantit une puissance d'adsorption et une pureté inégalée. Pour votre terrain, n'acceptez aucun compromis.</p>
        
        <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
        <ul class="space-y-3 mb-6">
          <li><strong>Posologie courante :</strong> 1 cuillère à café rase par jour.</li>
          <li><strong>Préparation :</strong> Verser dans un grand verre d'eau, laisser reposer 2h ou toute la nuit avant de boire.</li>
          <li><strong>Durée d’utilisation :</strong> cure de 10 à 21 jours selon les besoins du terrain.</li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-botanik-orange">Précautions</h3>
        <div class="bg-[#F97316]/5 p-6 rounded-2xl border border-[#F97316]/10 mb-6">
          <ul class="space-y-2 text-sm">
            <li>• Espacer la prise de 2 heures avec tout médicament.</li>
            <li>• Veiller à une hydratation suffisante tout au long de la journée.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-red-700">Contre-indications</h3>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
          <ul class="space-y-2 text-sm text-red-900">
            <li>• Insuffisance rénale sévère.</li>
            <li>• Constipation chronique sévère.</li>
          </ul>
        </div>

        <h3 class="text-2xl font-bold mb-4 mt-12">L'Argile 6.0 : Pourquoi la finesse change tout</h3>
        <ul class="space-y-4 mb-12">
          <li class="flex gap-4">
            <div class="w-5 h-5 bg-[#F97316]/10 rounded-full flex items-center justify-center shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p><strong>Micronisation 6μm :</strong> Une finesse chirurgicale qui multiplie radicalement la surface de contact.</p>
          </li>
          <li class="flex gap-4">
            <div class="w-5 h-5 bg-[#F97316]/10 rounded-full flex items-center justify-center shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p><strong>Supériorité Technique :</strong> Efficacité trois fois supérieure aux standards de 20 microns.</p>
          </li>
        </ul>
      </div>
    `,
    specs: [
      { label: "Finesse", value: "6 microns (Ultra)", icon: Award },
      { label: "Grade", value: "Pharmacopée Eur.", icon: ShieldCheck }
    ]
  },
  'pack-trio': {
    name: "PACK SOUVERAINETÉ",
    subtitle: "Sélection de 3 Synergies",
    price: 26.90,
    originalPrice: 29.70,
    images: [trioPouchesImg],
    description: "L'achat de 3 mélanges séquentiels (au choix) active la LIVRAISON OFFERTE.",
    fullDescription: `
      <div class="prose prose-botanik max-w-none text-center py-12">
        <h2 class="text-4xl font-bold mb-6">Optimisez votre protocole</h2>
        <p class="text-xl mb-12">L'achat de 3 mélanges séquentiels (au choix) active la <strong>LIVRAISON OFFERTE</strong>.</p>
        <Award class="w-20 h-20 text-[#F97316] mx-auto mb-8" />
        <p class="text-[#1B3022]/60">Combinez vos synergies pour un reset systémique complet.</p>
      </div>
    `,
    specs: [
      { label: "Offre", value: "Livraison Offerte", icon: ShoppingBag },
      { label: "Mix", value: "Au choix", icon: RefreshCw }
    ]
  }
};

export default function ProductDetail({ onBack, onAddToCart, productId = 'bloomlab' }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const sheet = productSheets[productId] || productSheets['bloomlab'];
  const gallery = sheet.images.map((img: string, i: number) => ({ src: img, alt: `${sheet.name} - Vue ${i + 1}` }));

  return (
    <article className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#1B3022]/60 hover:text-[#1B3022] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </button>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-[#1B3022]/5 hover:bg-[#1B3022]/10 transition-colors">
            <Heart className="w-5 h-5 text-[#1B3022]" />
          </button>
          <button className="p-2 rounded-full bg-[#1B3022]/5 hover:bg-[#1B3022]/10 transition-colors">
            <Share2 className="w-5 h-5 text-[#1B3022]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch bg-white border border-[#1B3022]/5 rounded-[48px] overflow-hidden shadow-2xl mb-24 min-h-[600px] lg:min-h-[700px]">
        {/* Left Side: Image (Occupies full space) */}
        <div className="lg:w-1/2 relative bg-[#F9F9F7] overflow-hidden min-h-[400px] lg:min-h-0">
          <img 
            src={gallery[activeImage].src} 
            alt={gallery[activeImage].alt} 
            className="w-full h-full object-cover transition-all duration-500"
          />
          {productId === 'bloomlab' && (
            <div className="absolute top-10 left-10 bg-[#F97316]/50 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl z-20">
              Souveraineté Santé 2026
            </div>
          )}
          {gallery.length > 1 && (
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex gap-2 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-fit">
                {gallery.map((img: any, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#F97316] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Info & Buy */}
        <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#F97316] font-bold uppercase tracking-widest text-xs mb-4">
            <Star className="w-4 h-4 fill-[#F97316]" /> 
            <Star className="w-4 h-4 fill-[#F97316]" /> 
            <Star className="w-4 h-4 fill-[#F97316]" /> 
            <Star className="w-4 h-4 fill-[#F97316]" /> 
            <Star className="w-4 h-4 fill-[#F97316]" />
            <span className="ml-2 text-[#1B3022]/60">4.9/5 (128 avis)</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-[#1B3022] mb-4 md:mb-6 tracking-tight">{sheet.name}</h1>
          <div className="text-[#F97316] text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6">{sheet.subtitle}</div>
          
          <p className="text-base md:text-xl text-[#1B3022]/80 font-medium mb-6 md:mb-8 leading-relaxed">
            {sheet.description}
          </p>

          <div className="bg-[#F9F9F7] p-6 md:p-8 rounded-[32px] border border-[#1B3022]/5 mb-8 md:mb-10">
            <div className="flex items-baseline gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-3xl md:text-5xl font-bold text-[#1B3022]">{sheet.price.toFixed(2)} €</span>
              {sheet.originalPrice && (
                <span className="text-[#1B3022]/40 line-through text-lg md:text-xl">{sheet.originalPrice.toFixed(2)} €</span>
              )}
            </div>
            
            <button 
              onClick={() => onAddToCart({
                id: productId,
                name: sheet.name,
                subtitle: sheet.subtitle,
                price: sheet.price,
                image: sheet.images[0]
              })}
              className="w-full bg-[#F97316] text-white px-6 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl tracking-wide hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#F97316]/20 transform hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /> Ajouter au panier
            </button>
            <p className="text-center text-sm text-[#1B3022]/50 mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Paiement sécurisé · Expédition sous 48h
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sheet.specs.map((spec: any, i: number) => (
              <div key={i} className="bg-[#1B3022]/5 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <spec.icon className="w-5 h-5 text-[#1B3022]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#1B3022]/40 tracking-wider">{spec.label}</div>
                  <div className="text-sm font-bold text-[#1B3022]">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: sheet.fullDescription }} />
      </div>
      
      <footer className="mt-20 border-t border-[#1B3022]/10 pt-10 text-center">
        <p className="text-sm text-[#1B3022]/40 italic max-w-2xl mx-auto">
          {sheet.name} est un produit de préparation botanique. Il ne constitue pas un dispositif médical et n'est pas destiné à diagnostiquer, traiter ou guérir des maladies.
        </p>
      </footer>
    </article>
  );
}

