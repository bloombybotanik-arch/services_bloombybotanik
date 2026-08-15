import { Language } from '../translations';
import { Thermometer, Timer, RefreshCw, FlaskConical, Leaf, ShieldCheck, Info, Award, ShoppingBag, ChefHat, Check, ArrowRight } from 'lucide-react';
import bloomLabImg from '../assets/images/bloomlab_main_1784887530345.jpeg';
import duoArgilesImg from '../assets/images/product_duo_argiles.jpg';
import trioPouchesImg from '../assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from '../assets/images/product_feu_articulaire.jpg';
import nuitProfondeImg from '../assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from '../assets/images/product_seve_fondamentale.jpg';
import digestionImg from '../assets/images/product_digestion.jpeg';
import bouclierHiverImg from '../assets/images/product_bouclier_hiver.jpg';
import modernShelvesImg from '../assets/images/modern_herbalist_shelves_1786699793560.jpg';
import img2 from '../assets/images/family_care_cleaned_1786616776823.jpg';
import img3 from '../assets/images/lab_detail_cleaned_1786616788618.jpg';
import img4 from '../assets/images/herbs_close_up_cleaned_1786616800877.jpg';
import img5 from '../assets/images/lifestyle_botanik_cleaned_1786616810137.jpg';
import img6 from '../assets/images/extraction_precision_cleaned_1786616821723.jpg';
import img7 from '../assets/images/natural_remedies_cleaned_1786616831671.jpg';
import img8 from '../assets/images/7.png';
import img9 from '../assets/images/home_lab_vibe_cleaned_1786616854146.jpg';
import img2_1 from '../assets/images/2-1.png';
import img3_1 from '../assets/images/3-1.png';
import img4_1 from '../assets/images/4-1.png';
import img5_1 from '../assets/images/5-1.png';
import img6_1 from '../assets/images/6-1.png';

export const getProductSheets = (lang: Language): Record<string, any> => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  return {
    'bloomlab': (() => {
      const now = new Date();
      const isPromoActive = now >= new Date('2026-09-01') && now < new Date('2027-01-01');
      const bloomLabPrice = isPromoActive ? 239 : 289;
      
      return {
        name: "BloomLab®",
        subtitle: isFR ? "SOUVERAINETÉ SANTÉ — ÉDITION 2026" : isDE ? "GESUNDHEITSSOUVERÄNITÄT — EDITION 2026" : "HEALTH SOVEREIGNTY — 2026 EDITION",
        price: bloomLabPrice,
        originalPrice: isPromoActive ? 289 : null,
        images: [bloomLabImg, img2_1, img3_1, img4_1, img5_1, img6_1],
        description: isFR 
          ? "BloomLab® : L'extracteur botanique de précision N°1 en France. L'infuseur idéal pour extraire le Totum intégral des plantes médicinales avec une précision thermique absolue (±0,5°C)."
          : isDE 
          ? "BloomLab®: Der botanische Präzisionsextraktor Nr. 1 in Frankreich. Der ideale Infuser zur Extraktion des integralen Totums von Heilpflanzen mit absoluter thermischer Präzision (±0,5°C)."
          : "BloomLab®: The #1 precision botanical extractor. The ideal infuser for extracting the integral Totum of medicinal plants with absolute thermal precision (±0.5°C).",
        fullDescription: isFR ? `
          <div class="prose prose-botanik max-w-none">
            <div class="bg-[#1B3022]/5 p-8 rounded-[32px] mb-12">
              <p class="text-xl leading-relaxed text-botanik-green/80">
                La BloomLab® est l'<strong>infuseur botanique</strong> de référence, une machine 6-en-1 capable de réaliser à domicile des <strong>remèdes de plantes</strong> complexes — huiles infusées, sérums, teintures, macérats — avec une <strong>extraction botanique de précision</strong> (temps, température, séquençage) habituellement réservée aux laboratoires.
              </p>
            </div>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">L'extraction du Totum : Révélez la puissance du vivant</h3>
            <p class="mb-6">Jusqu'ici, l'extraction domestique manquait de rigueur. La BloomLab® change la donne en permettant l'<strong>extraction du totum</strong> : la synergie intégrale des actifs d'une plante, sans dégradation thermique.</p>
            <div class="grid md:grid-cols-2 gap-8 mb-12">
              <div class="border border-botanik-green/10 p-6 rounded-2xl">
                <h4 class="font-bold text-botanik-green mb-3">Côté consommateur</h4>
                <p class="text-sm">Des poudres, gélules, huiles essentielles et compléments préfabriqués, standardisés, formulés pour le plus grand nombre — efficaces mais sans personnalisation ni fraîcheur moléculaire.</p>
              </div>
              <div class="border border-botanik-green/10 p-6 rounded-2xl">
                <h4 class="font-bold text-botanik-green mb-3">Côté professionnel</h4>
                <p class="text-sm">Des laboratoires d'extraction capables de réaliser des macérats huileux de précision, des doubles extractions, des fractions lipophiles/hydrophiles — mais avec des équipements à des dizaines de milliers d'euros.</p>
              </div>
            </div>

            <p class="mb-12">La BloomLab ferme cet écart en démocratisant la maîtrise des paramètres critiques de l'extraction : la température, la durée et le séquençage.</p>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Pourquoi les méthodes maison déçoivent</h3>
            <div class="bg-red-50 p-6 rounded-2xl mb-12">
              <ul class="space-y-2 text-red-800">
                <li>• Température mal contrôlée</li>
                <li>• Agitation insuffisante</li>
                <li>• Extraction partielle des actifs</li>
              </ul>
              <p class="mt-4 text-sm font-medium text-red-900">Résultat : des extraits faibles, variables et une perte d'actifs.</p>
            </div>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Une extraction optimisée automatiquement</h3>
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              <div class="p-6 bg-white border border-botanik-green/5 rounded-2xl shadow-sm">
                <div class="text-botanik-orange font-bold mb-2">Température régulée</div>
                <p class="text-sm italic">Protège les composés sensibles.</p>
              </div>
              <div class="p-6 bg-white border border-botanik-green/5 rounded-2xl shadow-sm">
                <div class="text-botanik-orange font-bold mb-2">Agitation dynamique</div>
                <p class="text-sm italic">Favorise la libération des actifs.</p>
              </div>
              <div class="p-6 bg-white border border-botanik-green/5 rounded-2xl shadow-sm">
                <div class="text-botanik-orange font-bold mb-2">Temps contrôlé</div>
                <p class="text-sm italic">Garantit la reproductibilité.</p>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Un protocole automatisé 6-en-1</h3>
            <div class="space-y-4 mb-12">
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span>Préparation de la plante</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">2</span>
                <span>Infusion dynamique par agitation</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span>Contrôle thermique précis (±1 °C)</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">4</span>
                <span>Liaison homogène plante / solvant</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">5</span>
                <span>Filtration nette pour un extrait limpide</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold">6</span>
                <span>Cycle de nettoyage automatique</span>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Tout est inclus pour commencer</h3>
            <div class="bg-white border border-botanik-green/5 p-4 md:p-8 rounded-[32px] mb-12">
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 list-none p-0 m-0">
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Sac filtre 90 microns</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Gant silicone protection</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Flacon ambré 100ml</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Distributeur sérum</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Pot cosmétique 50g</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Guide de recettes</span>
                </li>
                <li class="flex items-center gap-3 text-botanik-green">
                  <span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span>
                  <span class="font-medium text-sm md:text-base">Accès Bloom Academy</span>
                </li>
              </ul>
            </div>

            <div class="bg-botanik-green text-white p-6 md:p-10 rounded-[32px]">
              <h3 class="text-xl font-bold mb-8 text-white">Spécifications techniques</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/80">
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">Cuve inox alimentaire SU304</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">Capacité : 1,2 L</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">0 °C à 121 °C (Précision ±0,5°C)</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">6 modes automatiques</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">Nettoyage intégré</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-botanik-orange shrink-0"></div>
                  <span class="text-sm font-medium">Garantie 1 an Bloom</span>
                </div>
              </div>
            </div>
            
            <p class="mt-8 text-sm italic text-botanik-green/40">
              BloomLab est un appareil de préparation botanique. Il ne constitue pas un dispositif médical.
            </p>
          </div>
        ` : `
          <div class="prose prose-botanik max-w-none">
            <p class="text-lg mb-8">${isDE ? "BloomLab ist das erste 6-in-1-Gerät..." : "BloomLab is the first 6-in-1 device..."}</p>
          </div>
        `,
        specs: [
          { label: isFR ? "Contrôle" : "Control", value: "0 °C à 121 °C", icon: Thermometer },
          { label: isFR ? "Matériau" : "Material", value: "Inox 304 Certifié", icon: FlaskConical },
          { label: isFR ? "Garantie" : "Guarantee", value: "1 An Bloom", icon: ShieldCheck }
        ]
      };
    })(),
    'bundle-apothicaire': {
      name: isFR ? "L'Herbier Complet — Pack Rentrée 2026" : isDE ? "Das vollständige Herbarium — Paket Rente 2026" : "Complete Herbarium — 2026 Back-to-School Pack",
      subtitle: isFR ? "TOUS LES REMÈDES + DUO ARGILES" : isDE ? "ALLE HEILMITTEL + ERDEN-DUO" : "ALL REMEDIES + CLAYS DUO",
      price: 59,
      originalPrice: 87.50,
      images: [trioPouchesImg, duoArgilesImg, seveFondamentaleImg],
      description: isFR 
        ? "L'offre la plus irrésistible de la rentrée. Regroupe l'intégralité de nos mélanges de plantes et le Duo Argiles Renaissance."
        : isDE
        ? "Das unwiderstehlichste Angebot der Saison. Enthält alle unsere Pflanzenmischungen und das Renaissance-Ton-Duo."
        : "The most irresistible offer of the season. Includes all our plant blends and the Renaissance Clays Duo.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Ce pack exclusif regroupe l'expertise botanique de Bloom dans une offre unique pour la rentrée 2026.</p>
          <h3 class="text-xl font-bold mb-4">Contenu de l'offre :</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Duo Renaissance :</strong> Zéolithe & Plantes drainantes</li>
            <li>• <strong>Kit Sève Fondamentale :</strong> Vitalité et Structure</li>
            <li>• <strong>Kit Nuit Profonde :</strong> Sommeil et Ancrage</li>
            <li>• <strong>Kit Confort Digestif :</strong> Équilibre intestinal</li>
            <li>• <strong>Kit Feu Articulaire :</strong> Souplesse et Mobilité</li>
          </ul>
        </div>
      ` : isDE ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Dieses exklusive Paket vereint die botanische Expertise von Bloom in einem einzigartigen Angebot für den Schulanfang 2026.</p>
          <h3 class="text-xl font-bold mb-4">Inhalt des Angebots:</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Renaissance-Duo:</strong> Zeolith & entwässernde Pflanzen</li>
            <li>• <strong>Set Fundamentaler Saft:</strong> Vitalität und Struktur</li>
            <li>• <strong>Heilmittel Tiefe Nacht:</strong> Schlaf und Erdung</li>
            <li>• <strong>Heilmittel Verdauungskomfort:</strong> Darmgleichgewicht</li>
            <li>• <strong>Heilmittel Gelenkfeuer:</strong> Flexibilität und Mobilität</li>
          </ul>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">This exclusive pack brings together Bloom's botanical expertise in a unique offer for the 2026 back-to-school season.</p>
          <h3 class="text-xl font-bold mb-4">Offer Content:</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Renaissance Duo:</strong> Zeolite & Draining Plants</li>
            <li>• <strong>Fundamental Sap Kit:</strong> Vitality and Structure</li>
            <li>• <strong>Deep Night Remedy:</strong> Sleep and Grounding</li>
            <li>• <strong>Digestive Comfort Remedy:</strong> Intestinal Balance</li>
            <li>• <strong>Joint Fire Remedy:</strong> Flexibility and Mobility</li>
          </ul>
        </div>
      `,
      specs: [
        { label: isFR ? "Économie" : isDE ? "Ersparnis" : "Savings", value: "28,50€", icon: Award },
        { label: isFR ? "Contenu" : isDE ? "Inhalt" : "Content", value: "5 Kits", icon: Leaf }
      ]
    },
    'pack-signature': {
      name: isFR ? "PACK SIGNATURE — BloomLab + Collection 2026" : "SIGNATURE PACK — BloomLab + 2026 Collection",
      subtitle: isFR ? "L'AUTONOMIE BOTANIQUE TOTALE" : "TOTAL BOTANICAL AUTONOMY",
      price: 289.90,
      originalPrice: 349.90,
      images: [bloomLabImg, seveFondamentaleImg, nuitProfondeImg, digestionImg, feuArticulaireImg, bouclierHiverImg, duoArgilesImg],
      description: isFR 
        ? "Le Pack Signature regroupe l'instrument BloomLab® et l'intégralité de la collection de kits remèdes 2026. Une solution clé en main pour votre souveraineté sanitaire."
        : "The Signature Pack includes the BloomLab® instrument and the entire 2026 remedy kit collection.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-botanik-green text-white p-8 rounded-[40px] mb-12">
            <h2 class="text-3xl font-bold text-white mb-4 text-center">DÉCOUVREZ NOS KITS</h2>
            <p class="text-xl font-medium text-white/90 text-center">Nouvelle Collection 2026</p>
          </div>

          <div class="space-y-8 mb-12">
            <h3 class="text-2xl font-bold text-botanik-green">La plante, enfin exploitée correctement.</h3>
            <p class="text-lg">Vous extrayez le totum végétal, pas une approximation :</p>
            <ul class="space-y-4">
              <li class="flex items-center gap-3">
                <div class="w-2 h-2 bg-botanik-orange rounded-full shrink-0"></div>
                <span>Vous choisissez le solvant, l’usage, le format</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-2 h-2 bg-botanik-orange rounded-full shrink-0"></div>
                <span>Vous produisez l’équivalent de plusieurs mois de produits, chez vous</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-2 h-2 bg-botanik-orange rounded-full shrink-0"></div>
                <span class="font-bold">Vous n’achetez plus. Vous fabriquez.</span>
              </li>
            </ul>
          </div>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-[#1B3022]/5 p-8 rounded-3xl">
              <h4 class="font-bold text-botanik-green mb-4">Pourquoi choisir nos mélanges ?</h4>
              <ul class="space-y-4 text-sm">
                <li><strong>Efficacité Maximale :</strong> Des coupes de plantes optimisées pour libérer l'intégralité de leurs actifs sous l'action des lames et de la chaleur Bloom.</li>
                <li><strong>Pureté Absolue :</strong> 0% conservateurs, 0% additifs, 0% chimie industrielle. Juste la plante, dans sa forme la plus noble.</li>
                <li><strong>Économie & Autonomie :</strong> Un sachet de 50g vous permet de créer jusqu'à 700ml d'élixir ultra-concentré (l'équivalent de 7 flacons du commerce).</li>
                <li><strong>Polyvalence Totale :</strong> Une seule préparation pour deux usages. Transformez votre mélange en huile de massage ou en gouttes à boire selon le solvant choisi.</li>
              </ul>
            </div>
            <div class="bg-[#1B3022]/5 p-8 rounded-3xl">
              <h4 class="font-bold text-botanik-green mb-4">La Qualité Bloom : Grade Laboratoire</h4>
              <p class="text-sm mb-4">Chaque kit est le résultat d'un sourcing sans compromis :</p>
              <ul class="space-y-4 text-xs">
                <li class="flex items-start gap-3 w-full">
                  <svg class="w-5 h-5 text-botanik-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="flex-1">Plantes certifiées BIO et Grade Pharmacopée.</span>
                </li>
                <li class="flex items-start gap-3 w-full">
                  <svg class="w-5 h-5 text-botanik-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="flex-1">Récolte manuelle pour les cultures françaises.</span>
                </li>
                <li class="flex items-start gap-3 w-full">
                  <svg class="w-5 h-5 text-botanik-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="flex-1">Séchage basse température (< 35°C) pour préserver les enzymes.</span>
                </li>
                <li class="flex items-start gap-3 w-full">
                  <svg class="w-5 h-5 text-botanik-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="flex-1">Achat écoresponsable en circuit court.</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Pourquoi ça change tout ?</h3>
          <p class="mb-8">Nos kits ne sont pas des mélanges “bien-être”. Ce sont des formulations conçues pour l’extraction, en parfaite synergie avec la machine BloomLab.</p>
          
          <div class="bg-white border border-botanik-green/10 p-8 rounded-[32px] mb-12 text-center">
            <p class="text-sm uppercase tracking-widest text-botanik-green/60 mb-4">Vous passez :</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
              <div class="font-medium text-lg">de la plante brute</div>
              <svg class="w-8 h-8 text-botanik-orange transform md:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              <div class="font-bold text-botanik-green text-lg">à un extrait cohérent, stable, reproductible</div>
            </div>
            <p class="mt-6 font-bold text-botanik-orange text-xl">En un seul geste.</p>
          </div>

          <div class="bg-[#1B3022]/5 p-8 rounded-[32px] mb-12">
            <h3 class="text-xl font-bold text-botanik-green mb-8">L'Intégrale de la Collection 2026 Incluse :</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${seveFondamentaleImg}" alt="Sève Fondamentale" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">SÈVE FONDAMENTALE</span>
              </div>
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${nuitProfondeImg}" alt="Nuit Profonde" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">NUIT PROFONDE</span>
              </div>
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${digestionImg}" alt="Équilibre & Flux" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">ÉQUILIBRE & FLUX</span>
              </div>
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${feuArticulaireImg}" alt="Mouvement Libre" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">MOUVEMENT LIBRE</span>
              </div>
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${bouclierHiverImg}" alt="Bouclier Hiver" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">BOUCLIER HIVER</span>
              </div>
              <div class="text-center group">
                <div class="aspect-square bg-white rounded-2xl mb-3 overflow-hidden border border-botanik-green/10 shadow-sm group-hover:border-botanik-orange transition-colors">
                  <img src="${duoArgilesImg}" alt="Duo RESET" class="w-full h-full object-cover p-2" />
                </div>
                <span class="text-[10px] font-bold text-botanik-green uppercase tracking-tighter">DUO RESET (6μm)</span>
              </div>
            </div>
          </div>

          <div class="bg-botanik-orange text-white p-10 rounded-[40px] mb-12 shadow-xl shadow-botanik-orange/20 relative overflow-hidden">
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="bg-white/20 p-3 rounded-2xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.143-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-0 uppercase tracking-tight">ACCÈS "SIGNATURE MEMBER"</h3>
              </div>
              <p class="text-lg mb-8 text-white/90 leading-relaxed">
                Ce pack débloque automatiquement votre accès <strong>"Signature Member"</strong> dans notre écosystème numérique.
              </p>
              <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <svg class="w-6 h-6 mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  <h4 class="font-bold mb-2">Recettes Culinaires</h4>
                  <p class="text-xs text-white/70">L'intégrale des extractions gourmandes et fonctionnelles.</p>
                </div>
                <div class="bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <svg class="w-6 h-6 mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.162 1.162a2 2 0 00.517 3.323l.035.011a2 2 0 001.447 0l.035-.011a2 2 0 011.447 0l.035.011a2 2 0 001.447 0l.035-.011a2 2 0 011.447 0l.035.011a2 2 0 001.447 0l.035-.011a2 2 0 011.447 0l.035.011a2 2 0 001.52.148l1.162-1.162a2 2 0 00.517-3.323z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11V6a2 2 0 012-2h0a2 2 0 012 2v5m-6 0V6a2 2 0 00-2-2h0a2 2 0 00-2 2v5"></path></svg>
                  <h4 class="font-bold mb-2">Cosmétique Pro</h4>
                  <p class="text-xs text-white/70">Protocoles de formulation pour sérums, baumes et soins du corps.</p>
                </div>
                <div class="bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <svg class="w-6 h-6 mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <h4 class="font-bold mb-2">Reset Homéostasique</h4>
                  <p class="text-xs text-white/70">Guides de cures détox et maintenance du terrain profond.</p>
                </div>
              </div>
            </div>
            <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <p class="text-center italic text-botanik-green/60">"Faites fleurir toutes vos envies de bien-être végétal. Une place pour chaque plante et chaque plante à sa place."</p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>The ultimate autonomy pack including BloomLab and all 2026 remedy kits.</p>
        </div>
      `,
      specs: [
        { label: isFR ? "Économie" : "Savings", value: "60€", icon: Award },
        { label: isFR ? "Plantes" : "Plants", value: "Collection Totale", icon: Leaf },
        { label: isFR ? "Accès" : "Access", value: "Illimité Premium", icon: ShieldCheck }
      ]
    },
    'kit-starter': {
      name: isFR ? "SÈVE FONDAMENTALE" : isDE ? "GRUNDLEGENDER SAFT" : "FUNDAMENTAL SAP",
      subtitle: isFR ? "VITALITÉ & STRUCTURE" : isDE ? "VITALITÄT & STRUKTUR" : "VITALITY & STRUCTURE",
      price: 12.90,
      images: [seveFondamentaleImg],
      description: isFR 
        ? "La SÈVE FONDAMENTALE est un protocole de restauration profonde pour consolider l'architecture de votre organisme."
        : "The FUNDAMENTAL SAP is a deep restoration protocol to consolidate the architecture of your organism.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              La SÈVE FONDAMENTALE est un protocole de restauration profonde. Ce mélange n'est pas une simple boisson, mais un apport de briques élémentaires conçu pour consolider l'architecture de votre organisme (peau, cheveux, tissus conjonctifs). En utilisant la technologie BloomLab, nous extrayons la silice et les minéraux là où une infusion classique échoue.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Minéral</h3>
          <p class="mb-12">Pour libérer les minéraux prisonniers des fibres végétales denses sans oxyder les antioxydants fragiles, nous avons divisé ce mélange en deux phases d'extraction distinctes.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "La Charpente Minérale" (30g)</h4>
              <p class="text-sm"><strong>Prêle des Champs & Ortie Racine :</strong> Championnes du silicium et des minéraux structurels. Leurs fibres exigent une extraction thermique haute pour libérer leur potentiel de reminéralisation.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "Le Flux Antioxydant" (20g)</h4>
              <p class="text-sm"><strong>Romarin & Ginkgo Biloba :</strong> Des feuilles délicates conçues pour soutenir la micro-circulation et protéger les tissus. Elles exigent une extraction douce pour préserver leurs principes volatils.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Restauration (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase de Dissolution Structurelle (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Libère la silice et les minéraux des fibres denses de la Prêle et de l'Ortie (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase de Protection Moléculaire (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Ajout du Sachet B pour extraire les flavonoïdes et antioxydants sans stress thermique.</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12 text-center italic">
            <p class="text-sm uppercase tracking-widest text-botanik-green/60 mb-4">Vous passez :</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
              <div class="font-medium">de la plante brute</div>
              <ArrowRight class="hidden md:block w-6 h-6 text-botanik-orange" />
              <div class="font-bold text-botanik-green">à un extrait cohérent, stable, biodisponible</div>
            </div>
          </div>

          <div class="bg-white border border-botanik-green/10 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Bénéfices de l'Architecture Biologique</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Soutien de la Structure Cutanée :</strong> Apport de silicium naturel pour une sensation de fermeté et d'élasticité des tissus.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Restauration des Phanères :</strong> Consolide la force des cheveux et des ongles à la racine.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Optimisation des Flux :</strong> Soutient la micro-circulation pour une meilleure diffusion des ressources minérales.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "SÈVE FONDAMENTALE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Souveraineté)</span>
                <p class="text-sm text-white/80">50 gouttes dans un verre d'eau, 2 fois par jour, idéalement lors des changements de saison (Cure de 21 jours).</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Soin Local)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base Huileuse, appliquez comme sérum fortifiant sur le visage, les ongles ou le cuir chevelu.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes certifiées BIO et Grade Pharmacopée Européenne.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Récolte Manuelle</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Cueillette à la main pour préserver l'intégrité de la structure végétale.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Séchage &lt; 35°C</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Basse température pour conserver enzymes et principes actifs volatils.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Éco-responsable</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Achat en circuit court et emballages 100% compostables.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Grade Laboratoire</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Pureté absolue garantie, sans aucun additif ni conservateur chimique.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux personnes sous traitement anticoagulant ou anti-plaquettaire (Ginkgo), ainsi qu'aux femmes enceintes ou allaitantes.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "La Sève Fondamentale agit comme un renforcement de l'armature de votre édifice biologique. C'est le 'reset' minéral indispensable." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Deep mineralization protocol using sequential extraction.</p>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-nuit': {
      name: isFR ? "NUIT PROFONDE" : isDE ? "TIEFE NACHT" : "DEEP NIGHT",
      subtitle: isFR ? "SOMMEIL & ANCRAGE" : isDE ? "SCHLAF & ERDUNG" : "SLEEP & GROUNDING",
      price: 9.90,
      images: [nuitProfondeImg],
      description: isFR 
        ? "Le CONCENTRÉ NUIT PROFONDE est une réponse structurelle à la charge mentale et à l'agitation nocturne."
        : "The DEEP NIGHT CONCENTRATE is a structural response to mental load and nocturnal agitation.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le CONCENTRÉ NUIT PROFONDE est une réponse structurelle à la charge mentale et à l'agitation nocturne. Ce n'est pas une simple tisane de détente, mais une intervention botanique séquencée conçue pour synchroniser votre horloge interne et apaiser l'axe du stress. Grâce à la technologie BloomLab, nous extrayons la puissance sédative des racines sans dégrader les molécules apaisantes des parties aériennes.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Nerveux</h3>
          <p class="mb-12">Le défi du sommeil réside dans la dualité des plantes : les racines (Valériane) sont des "coffres-forts" moléculaires, tandis que les fleurs (Passiflore) sont des structures fragiles. Bloom est la seule méthode permettant d'épuiser l'une sans détruire l'autre.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "L'Ancrage du Mental" (30g)</h4>
              <p class="text-sm"><strong>Valériane (Racines) :</strong> Une structure ligneuse extrêmement dense. Elle exige une extraction thermique précise pour libérer les acides valéréniques, véritables régulateurs du système nerveux central.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "La Sérénité Volatile" (20g)</h4>
              <p class="text-sm"><strong>Passiflore (Parties Aériennes) :</strong> Riche en flavonoïdes délicats. Elle agit sur la qualité du sommeil et la continuité de la nuit. Elle nécessite une température modérée pour préserver son intégrité moléculaire.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Relaxation (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase de Libération des Racines (80°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Ouvre les fibres de la Valériane pour en extraire la quintessence apaisante (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase d'Apaisement Moléculaire (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Fusionne la douceur de la Passiflore à la puissance de la Valériane sans altérer les composés fragiles.</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Bénéfices sur l'Habitacle Nerveux</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Réduction de la Charge Mentale :</strong> Aide à stabiliser le flux des pensées pour un endormissement serein.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Architecture du Sommeil :</strong> Favorise une continuité nocturne sans réveils intempestifs.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Récupération Structurelle :</strong> Permet un réveil avec une sensation de clarté, sans somnolence résiduelle.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "NUIT PROFONDE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Souveraineté)</span>
                <p class="text-sm text-white/80">50 gouttes dans une boisson tiède (type infusion) ou un peu d'eau, environ 30 à 45 minutes avant le coucher.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Onction)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base Huileuse, massez le plexus solaire et l'intérieur des poignets pour un signal de détente immédiat.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes certifiées BIO et Grade Pharmacopée Européenne.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Récolte Manuelle</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Cueillette à la main pour préserver l'intégrité de la structure végétale.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Séchage &lt; 35°C</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Basse température pour conserver enzymes et principes actifs volatils.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Éco-responsable</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Achat en circuit court et emballages 100% compostables.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Grade Laboratoire</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Pureté absolue garantie, sans aucun additif ni conservateur chimique.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-botanik-orange/5 p-6 rounded-2xl mt-8 text-xs italic text-botanik-green/60">
            <strong>Note Sensorielle :</strong> L'odeur terreuse et puissante de la Valériane est la signature de sa haute concentration en actifs.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "Le séquençage thermique Bloom garantit que la Valériane libère sa force d'ancrage, offrant une profondeur de repos inaccessible avec une infusion classique." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Sleep regulation protocol using valerian and passionflower.</p>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-digestion': {
      name: isFR ? "ÉQUILIBRE & FLUX" : isDE ? "GLEICHGEWICHT & FLUSS" : "BALANCE & FLOW",
      subtitle: isFR ? "ÉQUILIBRE INTESTINAL" : isDE ? "DARMGLEICHGEWICHT" : "INTESTINAL BALANCE",
      price: 9.90,
      images: [digestionImg],
      description: isFR 
        ? "Le CONCENTRÉ ÉQUILIBRE & FLUX est un protocole de gestion des fluides et de maintenance des réseaux internes."
        : "The BALANCE & FLOW CONCENTRATE is a fluid management and internal network maintenance protocol.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le CONCENTRÉ ÉQUILIBRE & FLUX est un protocole de gestion des fluides et de maintenance des réseaux internes. Dans notre vision architecturale, la digestion est le centre de transformation énergétique de votre édifice. Ce mélange n'est pas une simple aide après-repas, mais une intervention botanique séquencée pour assainir les circuits, optimiser le drainage et restaurer la sensation de légèreté structurelle.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage des Tanins</h3>
          <p class="mb-12">Le défi de ce mélange réside dans l'extraction du Brou de Noix, une structure ligneuse extrêmement riche en tanins purifiants, qui nécessite une énergie thermique élevée, tandis que le Romarin et le Ginkgo exigent une protection thermique pour conserver leurs molécules régulatrices.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "La Purge Structurelle" (20g)</h4>
              <p class="text-sm"><strong>Brou de Noix & Gingembre :</strong> Des composants denses et fibreux. Ils constituent les "filtres" naturels du mélange. Leur extraction à haute température (90°C) est indispensable pour libérer les principes purifiants.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "La Régulation des Flux" (30g)</h4>
              <p class="text-sm"><strong>Romarin & Ginkgo Biloba :</strong> Les ingénieurs de votre circulation interne. Leurs feuilles contiennent des essences volatiles fragiles qui nécessitent une extraction douce et contrôlée (55°C).</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Maintenance (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase de Dissolution Structurelle (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Épuise les fibres dures du Brou de Noix et active le Gingembre pour assainir le terrain (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase d'Harmonisation des Fluides (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Fusionne les propriétés toniques du Romarin et du Ginkgo sans dénaturer leurs principes actifs.</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Bénéfices sur l'Habitacle Métabolique</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Assainissement des Réseaux :</strong> Favorise une sensation de pureté et de propreté intérieure après les repas.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Optimisation du Drainage :</strong> Accompagne les fonctions naturelles d'élimination pour éviter la stagnation des fluides.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Légèreté Structurelle :</strong> Aide à maintenir un ventre plat et une sensation de dynamisme global.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "ÉQUILIBRE & FLUX"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Souveraineté)</span>
                <p class="text-sm text-white/80">50 gouttes dans un verre d'eau, de préférence après les repas principaux ou le matin à jeun.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Soin Abdominal)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base Huileuse, massez doucement la zone abdominale pour soutenir le mouvement interne.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes certifiées BIO et Grade Pharmacopée Européenne.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Récolte Manuelle</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Cueillette à la main pour préserver l'intégrité de la structure végétale.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Séchage &lt; 35°C</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Basse température pour conserver enzymes et principes actifs volatils.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Éco-responsable</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Achat en circuit court et emballages 100% compostables.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Grade Laboratoire</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Pureté absolue garantie, sans aucun additif ni conservateur chimique.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux femmes enceintes ou allaitantes. En raison de la présence de Ginkgo, demandez l'avis d'un professionnel en cas de prise d'anticoagulants.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "Le système digestif est la chaudière de votre bâtiment biologique. Équilibre & Flux n'est pas un simple remède de confort, c'est un agent de maintenance." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Digestive maintenance protocol using sequential extraction.</p>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-articulaire': {
      name: isFR ? "MOUVEMENT LIBRE" : isDE ? "GELENKFEUER" : "JOINT FIRE",
      subtitle: isFR ? "SOUPLESSE & MAINTENANCE ARTICULAIRE" : isDE ? "FLEXIBILITÄT & MOBILITÄT" : "FLEXIBILITY & MOBILITY",
      price: 9.90,
      images: [feuArticulaireImg],
      description: isFR 
        ? "Le CONCENTRÉ MOUVEMENT LIBRE est une réponse technique aux besoins de flexibilité de votre édifice biologique."
        : "The JOINT FIRE CONCENTRATE is a technical response to the flexibility needs of your biological building.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le CONCENTRÉ MOUVEMENT LIBRE est une réponse technique aux besoins de flexibilité de votre édifice biologique. Dans une architecture vivante, les zones de jonction (articulations) nécessitent une maintenance constante pour préserver la fluidité du mouvement. Ce protocole ne se contente pas d'apaiser ; il utilise une extraction séquentielle de haute précision pour libérer les acides boswelliques et les minéraux végétaux indispensables à la résilience de votre structure.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Cinétique</h3>
          <p class="mb-12">Le défi de ce mélange réside dans sa dualité : la Reine des Prés contient des molécules précieuses qui demandent une extraction rapide, tandis que la résine de Boswellia est un "coffre-fort" moléculaire qui nécessite du temps et une chaleur contrôlée pour libérer sa puissance protectrice.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "L'Ancrage Moléculaire" (30g)</h4>
              <p class="text-sm"><strong>Reine des Prés & Gingembre :</strong> Sélectionnés pour leur richesse en dérivés salicylés naturels et en catalyseurs thermiques. Cette phase prépare le "terrain" et amorce la fluidification des fluides internes.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "La Cohésion Résineuse" (20g)</h4>
              <p class="text-sm"><strong>Boswellia Serrata (Gomme-Résine) :</strong> Une substance millénaire et dense. Elle est le pilier de la souplesse structurelle. Sa structure exige une phase d'extraction spécifique pour rendre ses acides boswelliques biodisponibles.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Flexibilité (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase de Libération des Actifs (80°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Libère les principes fluides de la Reine des Prés et activer la thermogenèse du Gingembre. (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase d'Inclusion des Résines (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Permet à la résine de Boswellia de se dissoudre progressivement et de fusionner avec le concentré sans altérer les molécules de la phase A.</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-botanik-green/10 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Bénéfices sur l'Habitacle Articulaire</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Fluidité Structurelle :</strong> Accompagne la sensation de souplesse et de liberté dans les mouvements quotidiens.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Confort des Zones Sollicitées :</strong> Idéal pour apaiser les zones sensibles après un effort ou lors de changements climatiques.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Maintenance du "Mouvement" :</strong> Soutient les fonctions de réparation naturelle des tissus conjonctifs.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "MOUVEMENT LIBRE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Souveraineté)</span>
                <p class="text-sm text-white/80">50 gouttes dans un verre d'eau, jusqu'à 3 fois par jour selon les besoins de votre structure.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Baume de Mouvement)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base Huileuse, massez généreusement les zones de tension. La chaleur du massage combinée à la concentration du Boswellia favorise une pénétration optimale.</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-botanik-green/10 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Engagement Pureté & Science</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Reine des Prés :</strong> Grade herboristerie traditionnelle, récoltée pour sa pureté.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Boswellia Serrata :</strong> Certifié titré en acides boswelliques pour une efficacité garantie.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Gingembre :</strong> Frais et déshydraté à basse température (&lt;35°C) pour préserver les catalyseurs.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-orange/5 p-8 rounded-[32px] border border-botanik-orange/10 mb-12">
            <h3 class="text-xl font-bold text-botanik-green mb-4">L'avis de l'Architecte Bloom</h3>
            <p class="italic text-botanik-green/80 leading-relaxed">
              "Une structure rigide est une structure fragile. Le Mouvement Libre agit comme un lubrifiant et un consolidateur de votre charpente. Sans l'agitation constante et le contrôle thermique de la BloomLab, la résine de Boswellia resterait inerte. Notre technologie permet d'intégrer cette résine au cœur de l'extrait, garantissant une efficacité de mouvement que la nature ne livre pas sans ingénierie."
            </p>
          </div>

          <div class="bg-[#1B3022]/5 p-6 rounded-2xl mb-8">
            <div class="text-[#F97316] font-bold text-sm mb-2 uppercase tracking-widest">Offre Privilège</div>
            <p class="text-sm font-bold text-botanik-green">SOUVERAINETÉ TOTALE : L'achat de 3 mélanges séquentiels (au choix) active la LIVRAISON OFFERTE.</p>
          </div>

          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux personnes allergiques aux dérivés salicylés (aspirine) ou sous traitement anticoagulant. Femmes enceintes ou allaitantes : demandez conseil.
          </div>

          <p class="mt-8 text-[10px] text-botanik-green/40 leading-relaxed">
            Note légale : Ce concentré de plantes est un produit de bien-être destiné à accompagner votre confort quotidien. Il ne constitue pas un médicament et ne peut se substituer à un avis médical. Les bénéfices décrits sont issus de l'usage traditionnel et de l'ingénierie botanique.
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Joint and mobility maintenance protocol using sequential extraction of Boswellia and Meadowsweet.</p>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-bouclier-hiver': {
      name: isFR ? "BOUCLIER HIVER" : isDE ? "WINTERSCHUTZ" : "WINTER SHIELD",
      subtitle: isFR ? "RÉSILIENCE SAISONNIÈRE" : isDE ? "SAISONALE RESILIENZ" : "SEASONAL RESILIENCE",
      price: 9.90,
      images: [bouclierHiverImg],
      description: isFR 
        ? "L’élixir BOUCLIER TOTAL est un concentré de défense structurelle conçu selon une architecture moléculaire précise."
        : "The WINTER SHIELD elixir is a structural defense concentrate designed according to precise molecular architecture.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              L’élixir BOUCLIER TOTAL n’est pas une simple infusion. C'est un concentré de défense structurelle conçu selon une architecture moléculaire précise. Pour la première fois, nous séparons les actifs par leur résistance thermique pour garantir une extraction de grade professionnel à domicile.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Bloom</h3>
          <p class="mb-12">Certaines plantes (racines, épices) exigent une chaleur structurelle pour libérer leurs minéraux, tandis que d'autres (feuilles, fleurs) exigent une extraction douce pour préserver leurs essences volatiles. Bloom est la seule technologie capable de respecter cette hiérarchie.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "L'Ancrage Minéral" (25g)</h4>
              <p class="text-sm"><strong>Gingembre & Girofle :</strong> Des structures denses qui exigent une température élevée pour libérer le gingérol et l'eugénol (actifs purifiants).<br/><strong>Sureau (Baies) :</strong> Nécessite une chaleur constante pour libérer ses pigments antioxydants profonds.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "La Protection Volatile" (25g)</h4>
              <p class="text-sm"><strong>Thym & Romarin :</strong> Des herbes délicates dont les huiles essentielles ne supportent pas les températures extrêmes. Elles apportent la clarté et le tonus.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Création (Le Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase d'Ancrage (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Casser la cellulose et libérer les molécules de défense lourdes (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase Moléculaire (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Capture les essences aromatiques fragiles sans les dénaturer (Sachet B + Sachet A déjà présent).</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Bénéfices de la Résilience Saisonnière</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Assainissement des flux :</strong> Favorise la sensation de clarté respiratoire et de pureté interne.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Soutien de la structure :</strong> Aide l'organisme à maintenir ses barrières naturelles face aux agressions extérieures.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Optimisation Énergétique :</strong> Apporte les cofacteurs minéraux nécessaires à la vitalité quotidienne.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "BOUCLIER HIVER"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Éclaireur)</span>
                <p class="text-sm text-white/80">1 cuillère à café diluée dans un verre d'eau, 2 fois par jour, pour soutenir le terrain durant 21 jours.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Friction)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base Huileuse, massez le haut du dos et la plante des pieds pour une protection sensorielle immédiate.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes certifiées BIO et Grade Pharmacopée Européenne.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Récolte Manuelle</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Cueillette à la main pour préserver l'intégrité de la structure végétale.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Séchage &lt; 35°C</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Basse température pour conserver enzymes et principes actifs volatils.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Éco-responsable</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Achat en circuit court et emballages 100% compostables.</p>
              </div>
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">Grade Laboratoire</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Pureté absolue garantie, sans aucun additif ni conservateur chimique.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux femmes enceintes, allaitantes, ou personnes sensibles aux dérivés salicylés. Demandez conseil à votre praticien de santé.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "Ce kit est révolutionnaire car il ne traite pas le froid comme un ennemi, mais comme un signal pour renforcer votre propre structure." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Seasonal resilience protocol using sequential extraction of ginger, clove and thyme.</p>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-reset': {
      name: isFR ? "Duo Argiles" : isDE ? "Erden-Duo" : "Clay Duo",
      subtitle: isFR ? "SYNERGIE MINÉRALE & TERRAIN" : isDE ? "MINERALISCHE SYNERGIE & TERRAIN" : "MINERAL SYNERGY & TERRAIN",
      price: 44.90,
      originalPrice: 49.00,
      images: [duoArgilesImg],
      description: isFR 
        ? "Une association de zéolithes et bentonites naturelles sélectionnées pour leurs propriétés d'adsorption et leur structure microporeuse unique."
        : isDE
        ? "Eine Kombination aus natürlichen Zeolithen und Bentoniten, ausgewählt aufgrund ihrer Adsorptionseigenschaften und ihrer einzigartigen mikroporösen Struktur."
        : "An association of natural zeolites and bentonites selected for their adsorption properties and unique microporous structure.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12 border-2 border-botanik-orange">
            <h3 class="text-3xl font-bold text-botanik-green mb-6 text-center">L'Ingénierie Minérale de Précision</h3>
            <p class="text-xl leading-relaxed text-botanik-green text-center">
              Le Duo Argiles repose sur l'affinité physico-chimique de minéraux volcaniques rares. Une approche scientifique du <strong>rééquilibrage du terrain</strong> par la maîtrise des polarités minérales.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Propriétés Physico-Chimiques & Granulométrie</h3>
          <p class="mb-12">Grâce à une activation tribomécanique, ces minéraux atteignent une finesse de <strong>6 microns</strong>. Cette réduction granulométrique démultiplie la surface d'échange active, permettant une interaction optimale au sein du cadre digestif.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">Zéolithe Clinoptilolite (6μm)</h4>
              <p class="text-sm">Un minéral à structure cristalline microporeuse (cage moléculaire) agissant par échange cationique sélectif, sans interaction avec la circulation systémique.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">Bentonite / Montmorillonite</h4>
              <p class="text-sm">Une argile smectite de haute pureté, reconnue pour son pouvoir couvrant et ses capacités d'adsorption au sein de la barrière intestinale.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole d'Usage Conseillé</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Mise en Suspension</h4>
                <p class="text-sm text-botanik-green/70">Mélangez une dose dans un grand verre d'eau filtrée. Utilisez de préférence des ustensiles non métalliques pour préserver la charge électrique des minéraux.</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-botanik-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Rythme de Croisière</h4>
                <p class="text-sm text-botanik-green/70">À consommer à distance des repas et de toute prise de compléments ou médicaments (intervalle de 2h minimum).</p>
              </div>
            </div>
          </div>

          <div class="bg-botanik-green text-white p-10 rounded-[40px] mb-12">
            <h4 class="font-bold mb-6 text-white text-xl text-center">Qualité & Certification</h4>
            <p class="text-center text-sm text-white/80 mb-0">
              Grade Pharmacopée Européenne. 100% pur, sans additif, sans nanoparticules. Une intégrité minérale totale pour un respect absolu de votre physiologie.
            </p>
          </div>

          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions :</strong> Ne constitue pas un avis médical. Consultez un professionnel de santé en cas de traitement en cours. Ne pas inhaler. Tenir hors de portée des enfants.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "L'Ingénierie au service du vivant. Le Duo Argiles est l'outil minéral de votre souveraineté." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isDE ? "Dieses Duo ist ein wissenschaftlicher Ansatz zur Neuausrichtung des Terrains..." : "This duo is a scientific approach to rebalancing the terrain..."}</p>
        </div>
      `,
      specs: [
        { label: "Grade", value: "Pharma / Médical", icon: ShieldCheck },
        { label: "Finesse", value: "6μm (Micron)", icon: RefreshCw }
      ]
    },
    'freemium-access': {
      name: "Accès Découverte",
      subtitle: "OFFERT",
      price: 0,
      images: [img4],
      description: isFR ? "Commencez votre voyage avec nos 10 recettes fondamentales en accès libre." : "Start your journey with our 10 fundamental free recipes.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Découvrez la puissance de l'extraction maison avec ces 10 recettes cultes, spécialement sélectionnées pour débuter avec votre BloomLab.</p>
          <h3 class="text-xl font-bold mb-6">Vos 10 Recettes Offertes :</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">01</span>
              <span class="font-medium text-botanik-green">Infusion Sommeil Profond</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">02</span>
              <span class="font-medium text-botanik-green">Huile de Massage Articulaire</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">03</span>
              <span class="font-medium text-botanik-green">Sérum Visage Éclat Botanique</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">04</span>
              <span class="font-medium text-botanik-green">Baume à Lèvres au Calendula</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">05</span>
              <span class="font-medium text-botanik-green">Teinture de Propolis Maison</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">06</span>
              <span class="font-medium text-botanik-green">Sirop de Sureau Immunité</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">07</span>
              <span class="font-medium text-botanik-green">Eau Florale de Lavande</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">08</span>
              <span class="font-medium text-botanik-green">Macérat de Pâquerette Tenseur</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">09</span>
              <span class="font-medium text-botanik-green">Gel d'Aloe Vera Frais</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold text-xs">10</span>
              <span class="font-medium text-botanik-green">Infusion Digestive au Gingembre</span>
            </div>
          </div>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Discover home extraction with these 10 core recipes.</p>
        </div>
      `,
      specs: [{ label: "Type", value: "Digital", icon: Info }]
    },
    'premium-access': {
      name: "Abonnement Mensuel Premium",
      subtitle: "ACCÈS TOTAL",
      price: 9,
      images: [modernShelvesImg],
      description: isFR ? "L'intégralité des savoirs Bloom en accès illimité : protocoles, vidéos et bibliothèque de recettes." : "Unlimited access to all Bloom knowledge.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Rejoignez la communauté des experts Botanik et débloquez tout le potentiel de votre laboratoire maison.</p>
          <div class="bg-botanik-orange/5 border border-botanik-orange/20 p-6 rounded-2xl mb-8">
            <h4 class="font-bold text-botanik-green mb-4">Conditions & Réglementations :</h4>
            <ul class="space-y-3 text-sm text-botanik-green/80">
              <li class="flex items-start gap-2">
                <span class="text-botanik-orange font-bold">•</span>
                <span><strong>Liberté Totale :</strong> Abonnement résiliable à tout moment sur simple demande depuis votre espace membre.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-botanik-orange font-bold">•</span>
                <span><strong>Gestion du terme :</strong> En cas de résiliation, l'accès reste actif jusqu'à la fin de la période mensuelle entamée. Le mois consommé reste dû.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-botanik-orange font-bold">•</span>
                <span><strong>Produit Numérique :</strong> Conformément à la réglementation sur les contenus numériques, l'accès est immédiat après validation du paiement.</span>
              </li>
            </ul>
          </div>
          <p class="text-sm italic text-botanik-green/40">Tarif : 9,00 € TTC par mois, sans engagement de durée.</p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p>Premium access to all botanical protocols.</p>
        </div>
      `,
      specs: [{ label: "Type", value: "Abonnement", icon: Info }]
    }
  };
};
