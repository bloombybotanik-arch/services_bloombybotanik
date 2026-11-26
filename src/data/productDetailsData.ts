import { Language } from '../translations';
import { Thermometer, Timer, RefreshCw, FlaskConical, Leaf, ShieldCheck, Info, Award, ShoppingBag, ChefHat, Check, ArrowRight } from 'lucide-react';
// import bloomLabImg from '../assets/images/bloomlab_main_1784887530345.jpeg';
// import duoArgilesImg from '../assets/images/product_duo_argiles.jpg';
// import trioPouchesImg from '../assets/images/product_trio_pouches.jpg';
// import feuArticulaireImg from '../assets/images/product_feu_articulaire.jpg';
// import nuitProfondeImg from '../assets/images/product_nuit_profonde.jpg';
// import seveFondamentaleImg from '../assets/images/product_seve_fondamentale.jpg';
// import digestionImg from '../assets/images/product_digestion.jpeg';
// import bouclierHiverImg from '../assets/images/product_bouclier_hiver.jpg';
// import modernShelvesImg from '../assets/images/modern_herbalist_shelves_1786699793560.jpg';
// import img2 from '../assets/images/family_care_cleaned_1786616776823.jpg';
// import img3 from '../assets/images/lab_detail_cleaned_1786616788618.jpg';
// import img4 from '../assets/images/herbs_close_up_cleaned_1786616800877.jpg';
// import img5 from '../assets/images/lifestyle_botanik_cleaned_1786616810137.jpg';
// import img6 from '../assets/images/extraction_precision_cleaned_1786616821723.jpg';
// import img7 from '../assets/images/natural_remedies_cleaned_1786616831671.jpg';
// import img8 from '../assets/images/7.png';
// import img9 from '../assets/images/home_lab_vibe_cleaned_1786616854146.jpg';
// import img2_1 from '../assets/images/2-1.png';
// import img3_1 from '../assets/images/3-1.png';
// import img4_1 from '../assets/images/4-1.png';
// import img5_1 from '../assets/images/5-1.png';
// import img6_1 from '../assets/images/6-1.png';

const bloomLabImg = "/img/produit/bloomlab-1200x1200.jpg";
const duoArgilesImg = "/img/produit/duo-argiles-1200x1200.jpg";
const trioPouchesImg = "/img/produit/trio-pouches-1200x1200.jpg";
const feuArticulaireImg = "/img/produit/feu-articulaire-1200x1200.jpg";
const nuitProfondeImg = "/img/produit/nuit-profonde-1200x1200.jpg";
const seveFondamentaleImg = "/img/produit/seve-fondamentale-1200x1200.jpg";
const digestionImg = "/img/produit/digestion-1200x1200.jpg";
const bouclierHiverImg = "/img/produit/bouclier-hiver-1200x1200.jpg";
const modernShelvesImg = "/assets/images/modern_herbalist_shelves_1786699793560.jpg";
const img2 = "/assets/images/family_care_cleaned_1786616776823.jpg";
const img3 = "/assets/images/lab_detail_cleaned_1786616788618.jpg";
const img4 = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const img5 = "/assets/images/lifestyle_botanik_cleaned_1786616810137.jpg";
const img6 = "/assets/images/extraction_precision_cleaned_1786616821723.jpg";
const img7 = "/assets/images/natural_remedies_cleaned_1786616831671.jpg";
const img8 = "/assets/images/7.png";
const img9 = "/assets/images/home_lab_vibe_cleaned_1786616854146.jpg";
const img2_1 = "/assets/images/2-1.png";
const img3_1 = "/assets/images/3-1.png";
const img4_1 = "/assets/images/4-1.png";
const img5_1 = "/assets/images/5-1.png";
const img6_1 = "/assets/images/6-1.png";

export const getProductSheets = (lang: Language): Record<string, any> => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const sheets: Record<string, any> = {
    'bloomlab': (() => {
      const bloomLabPrice = 229.00;
      
      return {
        name: "BloomLab®",
        subtitle: isFR ? "EXTRACTION BOTANIQUE DE PRÉCISION — ÉDITION 2026" : isDE ? "BOTANISCHE PRÄZISIONSEXTRAKTION — EDITION 2026" : "PRECISION BOTANICAL EXTRACTION — 2026 EDITION",
        price: bloomLabPrice,
        originalPrice: 289.00,
        images: [bloomLabImg, img2_1, img3_1, img4_1, img5_1, img6_1],
        description: isFR 
          ? "Transformez vos plantes brutes en sérums capillaires, huiles de soin et infusions concentrées en quelques heures. La BloomLab® remplace l'improvisation du bain-marie par une régulation thermique automatisée, en préservant l'intégralité du Totum végétal."
          : isDE 
          ? "Verwandeln Sie Rohpflanzen in wenigen Stunden in Haarseren, Pflegeöle und konzentrierte Aufgüsse. Die BloomLab® ersetzt das Wasserbad durch kontrollierte Temperaturführung und bewahrt das gesamte Pflanzen-Totum."
          : "Transform raw botanicals into hair serums, skincare oils, and concentrated infusions in hours. BloomLab® replaces stovetop guesswork with controlled thermal regulation, preserving the full plant Totum.",
        fullDescription: isFR ? `
          <div class="prose prose-botanik max-w-none">
            <div class="bg-[#1B3022]/5 p-8 rounded-[32px] mb-12">
              <p class="text-xl leading-relaxed text-botanik-green/80">
                La BloomLab® est l'<strong>infuseur botanique</strong> de référence, un appareil multi-programmes conçu pour réaliser à domicile des <strong>préparations botaniques</strong> variées — huiles infusées, sérums, macérats glycérinés et infusions concentrées — grâce au réglage du temps, de la température et du brassage doux en cuve inox 304 (grade alimentaire).
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

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Une extraction à paramètres régulés</h3>
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

            <h3 class="text-2xl font-bold text-botanik-green mb-6">Un cycle guidé en 6 étapes</h3>
            <div class="space-y-4 mb-12">
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">1</span>
                <span>Préparation de la plante</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">2</span>
                <span>Infusion dynamique par agitation</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">3</span>
                <span>Régulation thermique contrôlée (spécification fabricant)</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">4</span>
                <span>Liaison homogène plante / solvant</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">5</span>
                <span>Filtration nette pour un extrait limpide</span>
              </div>
              <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
                <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">6</span>
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

            <div class="bg-[#3E4A3D] text-white p-6 md:p-10 rounded-[32px] shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
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
                  <span class="text-sm font-medium">0 °C à 121 °C (plage fabricant indicative, non certifiée tiers)</span>
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
                  <span class="text-sm font-medium">Garantie commerciale 1 an (+ garantie légale de conformité 2 ans UE)</span>
                </div>
              </div>
            </div>
            
            <p class="mt-8 text-sm italic text-botanik-green/40">
              BloomLab est un appareil de préparation botanique. Il ne constitue pas un dispositif médical.
            </p>
          </div>
        ` : `
          <div class="prose prose-botanik max-w-none">
            <div class="bg-[#1B3022]/5 p-8 rounded-[32px] mb-12">
              <p class="text-xl leading-relaxed text-botanik-green/80">
                ${isDE
                  ? "Die <strong>BloomLab®</strong> ist ein vielseitiger Kräuterextraktor für zu Hause: ein Gerät mit 6 Programmen für botanische Ölauszüge, Seren, wässrige Aufgüsse und Glycerin-Mazerate mit geführter A/B-Temperatursteuerung in einem 304-Edelstahlbehälter (Lebensmittelqualität)."
                  : "The <strong>BloomLab®</strong> is a versatile home botanical extractor built for crafting infused oils, serums, aqueous infusions, and vegetable glycerin macerates with guided control over temperature, timing, and A/B sequencing inside a food-grade 304 stainless steel chamber."}
              </p>
            </div>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">
              ${isDE ? "Extraktion des pflanzlichen Totums" : "Totum Extraction: Unlocking Living Plant Synergy"}
            </h3>
            <p class="mb-6">
              ${isDE
                ? "Bisher fehlte es der häuslichen Extraktion an Präzision. BloomLab® ermöglicht die schonende Gewinnung des vollständigen Pflanzenspektrums (Totum) ohne thermische Zerstörung."
                : "Until now, home extraction lacked repeatability. BloomLab® preserves the full-spectrum Totum of your herbs without thermal degradation."}
            </p>

            <h3 class="text-2xl font-bold text-botanik-green mb-6">
              ${isDE ? "Im Lieferumfang enthalten" : "Everything Included to Start"}
            </h3>
            <div class="bg-white border border-botanik-green/5 p-4 md:p-8 rounded-[32px] mb-12">
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 list-none p-0 m-0">
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "90-Mikron-Filterbeutel" : "90-micron filter bag"}</span></li>
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "Hitzeschutz-Silikonhandschuh" : "Heat-resistant silicone glove"}</span></li>
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "100-ml-Pipettenflasche (Bambusverschluss)" : "100ml opaque glass dropper bottle"}</span></li>
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "Kopfhaut-Serum-Spender" : "Scalp serum dispenser"}</span></li>
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "50-g-Cremetiegel mit Bambusdeckel" : "50g bamboo-lid cream jar"}</span></li>
                <li class="flex items-center gap-3 text-botanik-green"><span class="w-2 h-2 rounded-full bg-botanik-orange shrink-0"></span><span class="font-medium text-sm md:text-base">${isDE ? "Rezeptbuch & Bloom Academy Zugang" : "Recipe guide & Bloom Academy access"}</span></li>
              </ul>
            </div>

            <div class="bg-[#3E4A3D] text-white p-6 md:p-10 rounded-[32px] shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
              <h3 class="text-xl font-bold mb-6 text-white">${isDE ? "Technische Spezifikationen" : "Technical Specifications"}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/85 text-sm">
                <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10">${isDE ? "Edelstahlkammer SU304 (1,2 L)" : "Food-grade SU304 steel tank (1.2 L)"}</div>
                <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10">${isDE ? "0 °C bis 121 °C (Herstellerangabe, nicht extern zertifiziert)" : "0 °C to 121 °C (nominal manufacturer spec, uncertified)"}</div>
                <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10">${isDE ? "6 Automatikprogramme + Selbstreinigung (5 Min.)" : "6 automatic modes + 5-min self-cleaning"}</div>
                <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10">${isDE ? "1 J. + 2 J. gesetzlich-Garantie (zzgl. 2 Jahre gesetzliche Gewährleistung)" : "1-year commercial warranty (+ 2-year EU legal conformity warranty)"}</div>
              </div>
            </div>

            <p class="mt-8 text-sm italic text-botanik-green/50">
              ${isDE
                ? "BloomLab ist ein Gerät zur botanischen Haushaltszubereitung und kein Medizinprodukt."
                : "BloomLab is a home botanical preparation appliance and is not a medical device."}
            </p>
          </div>
        `,
        specs: [
          { label: isFR ? "Contrôle" : isDE ? "Steuerung" : "Control", value: isFR ? "0 °C à 121 °C (spécification fabricant)" : isDE ? "0 °C bis 121 °C (Herstellerangabe)" : "0 °C to 121 °C (manufacturer spec)", icon: Thermometer },
          { label: isFR ? "Matériau" : isDE ? "Material" : "Material", value: isFR ? "Inox 304 Alimentaire" : isDE ? "Lebensmittel-Edelstahl 304" : "Food-Grade 304 Steel", icon: FlaskConical },
          { label: isFR ? "Garantie" : isDE ? "Garantie" : "Warranty", value: isFR ? "1 an commerciale + 2 ans légale" : isDE ? "1 J. + 2 J. gesetzlich" : "1-Yr Commercial + 2-Yr Legal", icon: ShieldCheck }
        ]
      };
    })(),
    'bundle-apothicaire': {
      name: isFR ? "Pack Herbier Complet — 4 Mélanges + Duo Argiles" : isDE ? "Vollständiges Herbarium — 4 Mischungen + Erden-Duo" : "Complete Herbarium Pack — 4 Blends + Clay Duo",
      subtitle: isFR ? "TOUS LES KITS BOTANIQUES + DUO ARGILES" : isDE ? "ALLE PFLANZEN-SETS + ERDEN-DUO" : "ALL BOTANICAL KITS + CLAY DUO",
      price: 49.00,
      originalPrice: 87.50,
      images: [trioPouchesImg, duoArgilesImg, seveFondamentaleImg],
      description: isFR 
        ? "Le coffret complet réunissant l'intégralité de nos 4 mélanges de plantes (Sève, Nuit, Digestion, Articulaire) et le Duo Argiles."
        : isDE
        ? "Das Komplett-Set mit allen 4 Bio-Pflanzenmischungen (Saft, Nacht, Verdauung, Gelenke) und dem Erden-Duo."
        : "Our complete botanical bundle bringing together all 4 organic plant blends (Sap, Night, Digestion, Joint) and the Clay Duo.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Ce pack complet regroupe l'expertise botanique et minérale de Bloom dans un coffret prêt à extraire.</p>
          <h3 class="text-xl font-bold mb-4">Contenu de l'offre :</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Duo Argiles :</strong> Zéolithe & Bentonite micronisées (6µm)</li>
            <li>• <strong>Kit Sève Fondamentale :</strong> Prêle, Ortie, Romarin & Ginkgo</li>
            <li>• <strong>Kit Nuit Profonde :</strong> Valériane & Passiflore — Rituel du soir</li>
            <li>• <strong>Kit Équilibre Botanique :</strong> Brou de Noix, Gingembre, Romarin & Ginkgo</li>
            <li>• <strong>Kit Mouvement Libre :</strong> Reine des Prés, Gingembre & Boswellia</li>
          </ul>
        </div>
      ` : isDE ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Dieses Komplettpaket vereint die botanische und mineralische Expertise von Bloom in einem sofort einsetzbaren Set.</p>
          <h3 class="text-xl font-bold mb-4">Inhalt des Angebots:</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Erden-Duo:</strong> Zeolith & Bentonit (6µm)</li>
            <li>• <strong>Set Fundamentaler Saft:</strong> Ackerschachtelhalm, Brennnessel, Rosmarin & Ginkgo</li>
            <li>• <strong>Set Tiefe Nacht:</strong> Baldrian & Passionsblume — Abendritual</li>
            <li>• <strong>Set Botanisches Gleichgewicht:</strong> Walnussschale, Ingwer, Rosmarin & Ginkgo</li>
            <li>• <strong>Set Freie Bewegung:</strong> Mädesüß, Ingwer & Boswellia</li>
          </ul>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">This complete bundle brings together Bloom's botanical and mineral expertise in one ready-to-extract kit.</p>
          <h3 class="text-xl font-bold mb-4">Offer Content:</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Clay Duo:</strong> Micronized Zeolite & Bentonite (6µm)</li>
            <li>• <strong>Fundamental Sap Kit:</strong> Horsetail, Nettle, Rosemary & Ginkgo</li>
            <li>• <strong>Deep Night Kit:</strong> Valerian & Passionflower — Evening Ritual</li>
            <li>• <strong>Botanical Balance Kit:</strong> Walnut Hull, Ginger, Rosemary & Ginkgo</li>
            <li>• <strong>Free Movement Kit:</strong> Meadowsweet, Ginger & Boswellia</li>
          </ul>
        </div>
      `,
      specs: [
        { label: isFR ? "Économie" : isDE ? "Ersparnis" : "Savings", value: "38,50€", icon: Award },
        { label: isFR ? "Contenu" : isDE ? "Inhalt" : "Content", value: "5 Kits", icon: Leaf }
      ]
    },
    'pack-signature': {
      name: isFR ? "PACK SIGNATURE — BloomLab® + Herbier Complet + 3 Mois Premium Académie" : isDE ? "SIGNATURE-PAKET — BloomLab® + Vollständiges Herbarium + 3 Monate Premium" : "SIGNATURE PACK — BloomLab® + Complete Herbarium + 3 Months Premium Academy",
      subtitle: isFR ? "LE PLUS POPULAIRE — L'AUTONOMIE BOTANIQUE TOTALE" : isDE ? "AM BELIEBTESTEN — VOLLE BOTANISCHE AUTONOMIE" : "MOST POPULAR — TOTAL BOTANICAL AUTONOMY",
      price: 289.00,
      originalPrice: 349.00,
      images: ["/img/produit/pack-signature-1200x1200.jpg", bloomLabImg, trioPouchesImg, duoArgilesImg, seveFondamentaleImg, nuitProfondeImg],
      description: isFR 
        ? "Machine BloomLab® Inox 304, Kit accessoires apothicaire, L'Herbier Complet (4 mélanges), Duo Argiles (Zéolithe-Bentonite) et 3 mois d'accès Premium Académie."
        : isDE
        ? "BloomLab® 304-Edelstahl, Apotheker-Zubehörset, Vollständiges Herbarium (4 Mischungen), Erden-Duo (Zeolith-Bentonit) und 3 Monate Premium-Zugang zur Akademie."
        : "BloomLab® 304 Steel Machine, Apothecary Kit, Complete Herbarium (4 blends), Clay Duo (Zeolite-Bentonite), and 3 months Premium Academy access.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#3E4A3D] text-white p-8 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
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
                <li><strong>Découpe Adaptée :</strong> Des coupes de plantes calibrées pour le panier filtrant et l'extraction séquencée douce.</li>
                <li><strong>Formule Simple :</strong> 0% conservateurs, 0% additifs, 0% chimie industrielle. Juste la plante, dans sa forme la plus noble.</li>
                <li><strong>Autonomie Pratique :</strong> Chaque sachet de 50g permet de préparer un batch d'extraction domestique jusqu'à 700ml de solvant.</li>
                <li><strong>Polyvalence Totale :</strong> Une seule préparation pour deux usages. Transformez votre mélange en huile de massage ou en gouttes à boire selon le solvant choisi.</li>
              </ul>
            </div>
            <div class="bg-[#1B3022]/5 p-8 rounded-3xl">
              <h4 class="font-bold text-botanik-green mb-4">Critères de Sélection Bloom</h4>
              <p class="text-sm mb-4">Chaque kit est le résultat d'un sourcing sans compromis :</p>
              <ul class="space-y-4 text-xs">
                <li class="flex items-start gap-3 w-full">
                  <svg class="w-5 h-5 text-botanik-orange mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="flex-1">Plantes issues de l'agriculture biologique (sans garantie analytique publiée sur le site).</span>
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

          <div class="bg-[#C8AB8A] text-[#0F261E] p-10 rounded-[40px] mb-12 shadow-xl shadow-[#C8AB8A]/20 relative overflow-hidden" style="background-color: #C8AB8A; color: #ffffff;">
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
                  <h4 class="font-bold mb-2">Cosmétique Botanique Maison</h4>
                  <p class="text-xs text-white/70">Protocoles de formulation pour sérums, baumes et soins du corps.</p>
                </div>
                <div class="bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <svg class="w-6 h-6 mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <h4 class="font-bold mb-2">Reset Homéostasique</h4>
                  <p class="text-xs text-white/70">Guides de rééquilibrage homéostatique et maintenance du terrain profond.</p>
                </div>
              </div>
            </div>
            <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <p class="text-center italic text-botanik-green/60">"Faites fleurir toutes vos envies de bien-être végétal. Une place pour chaque plante et chaque plante à sa place."</p>
        </div>
        ` : `
        <div class="prose prose-botanik max-w-none space-y-6">
          <div class="bg-[#3E4A3D] text-white p-8 rounded-[32px] shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
            <h2 class="text-2xl font-bold text-white mb-2 text-center">${isDE ? "SIGNATURE-PAKET 2026" : "2026 SIGNATURE PACK"}</h2>
            <p class="text-base text-white/90 text-center">${isDE ? "BloomLab® + Vollständiges Herbarium + Erden-Duo + 3 Monate Premium Akademie" : "BloomLab® + Complete Herbarium + Clay Duo + 3 Months Premium Academy"}</p>
          </div>
          <p class="text-lg">${isDE ? "Das umfassende Komplettpaket: Extrahieren Sie das volle pflanzliche Totum zu Hause mit präziser A/B-Temperatursteuerung, dem Zeolith-Bentonit-Erden-Duo und 4 Bio-Pflanzenmischungen." : "The complete autonomy pack including the BloomLab® 304 steel extractor, apothecary kit, Complete Herbarium (4 blends), Clay Duo, and 3 months Premium Academy access."}</p>
        </div>
      `,
      specs: [
        { label: isFR ? "Économie" : isDE ? "Ersparnis" : "Savings", value: "60€", icon: Award },
        { label: isFR ? "Plantes" : isDE ? "Pflanzen" : "Botanicals", value: isFR ? "L'Herbier Complet" : isDE ? "Vollständiges Herbarium" : "Complete Herbarium", icon: Leaf },
        { label: isFR ? "Accès" : isDE ? "Zugang" : "Access", value: isFR ? "3 mois Premium Académie" : isDE ? "3 Monate Premium" : "3 Months Premium Academy", icon: ShieldCheck }
      ]
    },
    'kit-starter': {
      name: isFR ? "SÈVE FONDAMENTALE" : isDE ? "GRUNDLEGENDER SAFT" : "FUNDAMENTAL SAP",
      subtitle: isFR ? "VITALITÉ & STRUCTURE" : isDE ? "VITALITÄT & STRUKTUR" : "VITALITY & STRUCTURE",
      price: 12.90,
      images: [seveFondamentaleImg, trioPouchesImg, "/assets/images/herbs_close_up_cleaned_1786616800877.jpg", "/assets/images/home_lab_vibe_cleaned_1786616854146.jpg"],
      description: isFR 
        ? "La SÈVE FONDAMENTALE est un mélange séquentiel (Prêle, Ortie, Romarin, Ginkgo) pensé pour préparer des extraits minéraux et aromatiques dans une démarche éducative non médicale."
        : isDE
        ? "GRUNDLEGENDER SAFT ist ein sequenzielles Kräuterset (Ackerschachtelhalm, Brennnessel, Rosmarin, Ginkgo) zur Remineralisierung und strukturellen Vitalität."
        : "FUNDAMENTAL SAP is a sequential botanical formulation (Horsetail, Nettle Root, Rosemary, Ginkgo) designed for structural vitality and remineralization.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              La SÈVE FONDAMENTALE est un mélange botanique séquentiel de Prêle des champs, Ortie racine, Romarin et Ginkgo destiné aux préparations domestiques dans un cadre éducatif et bien-être (non médical). En utilisant la technologie BloomLab, nous extrayons la silice et les minéraux là où une infusion classique échoue.
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
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase de Dissolution Structurelle (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Libère la silice et les minéraux des fibres denses de la Prêle et de l'Ortie (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">2</div>
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
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Spécificités Botaniques de la Synergie</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Fraction Silice & Minéraux (Sachet A) :</strong> Extraction à haute température des parties fibreuses de prêle et d'ortie.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Fraction Aromatique (Sachet B) :</strong> Macération douce des feuilles de romarin et de ginkgo pour préserver leurs notes volatiles.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Polyvalence d'Usage :</strong> Préparable en base aqueuse/glycérinée ou en macérat huileux cosmétique pour soins externes.</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#3E4A3D] text-white p-10 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
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
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes issues de l'agriculture biologique.</p>
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
                <div class="font-bold text-botanik-orange text-sm">Sélection Botanique</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes brutes sélectionnées sans additif ni conservateur ajouté.</p>
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
        <div class="prose prose-botanik max-w-none space-y-6">
          <p class="text-lg">${isDE ? "Sequenzielles Remineralisierungs-Set in zwei Beuteln: Beutel A (Ackerschachtelhalm & Brennnesselwurzel, 90°C / 2h) für Kieselsäure und Mineralstoffe, gefolgt von Beutel B (Rosmarin & Ginkgo Biloba, 55°C / 4h) für empfindliche Flavonoide." : "Dual-pouch sequential mineralizing botanical kit: Pouch A (Field Horsetail & Nettle Root, 90°C / 2h) extracts structural silica, followed by Pouch B (Rosemary & Ginkgo Biloba, 55°C / 4h) to safeguard delicate flavonoids."}</p>
          <div class="bg-red-50 p-4 rounded-2xl text-xs text-red-900 italic">
            <strong>⚠️ ${isDE ? "Vorsichtshinweise:" : "Precautions:"}</strong> ${isDE ? "Nur für Erwachsene. Nicht empfohlen bei gleichzeitiger Einnahme von Blutverdünnern (Ginkgo) sowie während Schwangerschaft oder Stillzeit." : "Adults only. Not recommended alongside anticoagulants/antiplatelets (Ginkgo) or during pregnancy/nursing."}
          </div>
        </div>
      `,
      specs: [{ label: isFR ? "Format" : isDE ? "Inhalt" : "Size", value: "50g", icon: Leaf }]
    },
    'kit-nuit': {
      name: isFR ? "NUIT PROFONDE" : isDE ? "TIEFE NACHT" : "DEEP NIGHT",
      subtitle: isFR ? "RITUEL DU SOIR" : isDE ? "ABENDRITUAL" : "EVENING RITUAL",
      price: 9.90,
      images: [nuitProfondeImg, trioPouchesImg, "/assets/images/herbs_close_up_cleaned_1786616800877.jpg", "/assets/images/modern_herbalist_shelves_1786699793560.jpg"],
      description: isFR 
        ? "Le MÉLANGE NUIT PROFONDE associe racines de Valériane et parties aériennes de Passiflore pour vos rituels botaniques du soir."
        : isDE
        ? "TIEFE NACHT kombiniert Baldrianwurzeln (Beutel A) und Passionsblume (Beutel B) in einer zweiphasigen Extraktion für Ihr Abendritual."
        : "DEEP NIGHT pairs dense Valerian root (Pouch A) and delicate Passionflower aerial parts (Pouch B) for your evening botanical ritual.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le MÉLANGE NUIT PROFONDE associe deux plantes classiques des rituels herboristes de fin de journée : les racines de Valériane et les parties aériennes de Passiflore. Grâce au séquençage en deux paliers thermiques, les parties ligneuses et les sommités fleuries sont extraites séparément dans le respect de leur fragilité aromatique.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Botanique</h3>
          <p class="mb-12">En herboristerie traditionnelle, les racines (Valériane) sont denses et fibreuses, tandis que les parties aériennes (Passiflore) sont plus délicates. Le double palier permet d'adapter la température à chaque matière végétale.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "Racines de Valériane" (30g)</h4>
              <p class="text-sm"><strong>Valériane (Racines) :</strong> Une structure ligneuse dense. Elle reçoit un premier palier thermique adapté à la libération des acides valéréniques et composés aromatiques de la racine.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "Sommités de Passiflore" (20g)</h4>
              <p class="text-sm"><strong>Passiflore (Parties Aériennes) :</strong> Riche en flavonoïdes délicats (vitexine). Elle reçoit une température modérée pour préserver ses arômes et sa fraction florale.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Préparation (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase Racines (80°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Extraction des racines de Valériane (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase Parties Aériennes (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Ajout de la Passiflore à température modérée pour préserver les composés délicats.</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Atouts de la Préparation</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Double Extraction Ciblée :</strong> Séparation des paliers thermiques entre racines denses et parties aériennes.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Rituel Aromatique du Soir :</strong> Préparation sans additif pensée pour les routines calmes de fin de journée.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Usage Polyvalent :</strong> Boisson tiède aromatique ou macérat huileux de massage cosmétique.</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#3E4A3D] text-white p-10 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "NUIT PROFONDE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Rituel du soir)</span>
                <p class="text-sm text-white/80">50 gouttes diluées dans une boisson tiède (type tisane) ou un peu d'eau en soirée.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Massage cosmétique)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base huileuse, massez doucement les poignets ou le plexus en soin aromatique du soir.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes issues de l'agriculture biologique.</p>
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
                <div class="font-bold text-botanik-orange text-sm">Sélection Botanique</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes brutes sélectionnées sans additif ni conservateur ajouté.</p>
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
        <div class="prose prose-botanik max-w-none space-y-6">
          <p class="text-lg">${isDE ? "Zweistufiges Extraktionsprotokoll: Beutel A mit Baldrianwurzel (80°C / 2h) löst wertvolle Wurzelstoffe, während Beutel B mit Passionsblume (55°C / 4h) flüchtige Flavonoide bewahrt." : "Dual-stage extraction protocol: Pouch A Valerian roots (80°C / 2h) unlock dense grounding fractions, while Pouch B Passionflower (55°C / 4h) preserves fragile calming flavonoids."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Format" : isDE ? "Inhalt" : "Size", value: "50g", icon: Leaf }]
    },
    'kit-digestion': {
      name: isFR ? "ÉQUILIBRE BOTANIQUE" : isDE ? "BOTANISCHES GLEICHGEWICHT" : "BOTANICAL BALANCE",
      subtitle: isFR ? "AROMATES & INFUSIONS" : isDE ? "KRÄUTER & AUFGÜSSE" : "HERBS & INFUSIONS",
      price: 9.90,
      images: [digestionImg, trioPouchesImg, "/assets/images/herbs_close_up_cleaned_1786616800877.jpg", "/assets/images/natural_remedies_cleaned_1786616831671.jpg"],
      description: isFR 
        ? "Le MÉLANGE ÉQUILIBRE BOTANIQUE associe Brou de Noix, Gingembre, Romarin et Ginkgo dans un rituel aromatique traditionnel d'après-repas."
        : isDE
        ? "BOTANISCHES GLEICHGEWICHT kombiniert Walnussschale, Ingwer, Rosmarin und Ginkgo als klassische Kräutermischung nach dem Essen."
        : "BOTANICAL BALANCE pairs Walnut Hull, Ginger, Rosemary, and Ginkgo via sequential extraction for traditional after-meal herbal infusions.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le MÉLANGE ÉQUILIBRE BOTANIQUE réunit des plantes aromatiques et taniques issues de l'herboristerie traditionnelle (Brou de Noix, Gingembre, Romarin et Ginkgo). Préparé en deux paliers thermiques distincts, il permet d'extraire les fractions ligneuses puis les essences aromatiques dans un rituel d'infusion d'après-repas.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage des Tanins</h3>
          <p class="mb-12">Le Brou de Noix et le Gingembre sont des matières denses riches en tanins et oléorésines, tandis que le Romarin et le Ginkgo renferment des composés aromatiques volatils plus sensibles à la chaleur prolongée.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "Racines & Écorces" (20g)</h4>
              <p class="text-sm"><strong>Brou de Noix & <a href=\"/boutique\" class=\"text-botanik-orange font-bold hover:underline\">Gingembre</a> :</strong> Des composants denses et fibreux nécessitant une extraction à 90°C pour libérer tanins et principes piquants.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "Feuilles Aromatiques" (30g)</h4>
              <p class="text-sm"><strong><a href=\"/boutique\" class=\"text-botanik-orange font-bold hover:underline\">Romarin</a> & Ginkgo Biloba :</strong> Des feuilles contenant des essences volatiles délicates qui bénéficient d'une extraction modérée à 55°C.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Préparation (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase Tanins & Rhizomes (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Extraction du Brou de Noix et du <a href=\"/boutique\" class=\"text-botanik-orange font-bold hover:underline\">Gingembre</a> (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase Aromatique (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Macération douce du <a href=\"/boutique\" class=\"text-botanik-orange font-bold hover:underline\">Romarin</a> et du Ginkgo pour préserver le profil aromatique.</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Spécificités de la Synergie</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Profil Aromatique Épicé & Boisé :</strong> Alliance de notes piquantes de gingembre, tanins de noyer et fraîcheur de romarin.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Double Palier Thermique :</strong> Respecte la différence de structure entre coques/rhizomes et feuilles fines.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Tradition Herboriste :</strong> Formulation brute 100 % plantes sans conservateur ni arôme artificiel.</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#3E4A3D] text-white p-10 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "ÉQUILIBRE BOTANIQUE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Rituel d'après-repas)</span>
                <p class="text-sm text-white/80">50 gouttes diluées dans un verre d'eau ou une boisson tiède, après les repas.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Massage aromatique)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base huileuse, utilisable en huile de massage cosmétique réchauffante.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-12 border-t border-botanik-green/10">
            <h3 class="text-xl font-bold text-botanik-green mb-6">Engagement Qualité Bloom</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <div class="font-bold text-botanik-orange text-sm">100% Bio</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes issues de l'agriculture biologique.</p>
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
                <div class="font-bold text-botanik-orange text-sm">Sélection Botanique</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes brutes sélectionnées sans additif ni conservateur ajouté.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux femmes enceintes ou allaitantes. En raison de la présence de Ginkgo, demandez l'avis d'un professionnel en cas de prise d'anticoagulants.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "Respecter chaque matière végétale à sa juste température : c'est toute la logique de l'extraction séquencée." — Bloom by BotaniK
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none space-y-6">
          <p class="text-lg">${isDE ? "Beutel A (Walnussschale & Ingwer, 90°C / 2h) gefolgt von Beutel B (Rosmarin & Ginkgo Biloba, 55°C / 4h) als traditioneller Kräuteraufguss nach dem Essen." : "Pouch A (Black Walnut Hull & Ginger, 90°C / 2h) followed by Pouch B (Rosemary & Ginkgo Biloba, 55°C / 4h) for traditional after-meal botanical infusions."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Format" : isDE ? "Inhalt" : "Size", value: "50g", icon: Leaf }]
    },
    'kit-articulaire': {
      name: isFR ? "MOUVEMENT LIBRE" : isDE ? "FREIE BEWEGUNG" : "FREE MOVEMENT",
      subtitle: isFR ? "SYNERGIE RÉSINE & HERBORISTERIE" : isDE ? "HARZ & KRÄUTER-SYNERGIE" : "RESIN & HERBAL SYNERGY",
      price: 9.90,
      images: [feuArticulaireImg, trioPouchesImg, "/assets/images/herbs_close_up_cleaned_1786616800877.jpg", "/assets/images/extraction_precision_cleaned_1786616821723.jpg"],
      description: isFR 
        ? "Le MÉLANGE MOUVEMENT LIBRE associe Reine des Prés, Gingembre et résine de Boswellia Serrata dans une extraction séquencée en deux paliers."
        : isDE
        ? "FREIE BEWEGUNG kombiniert Mädesüß, Ingwer und Boswellia Serrata Harz in sequenzieller Extraktion."
        : "FREE MOVEMENT combines Meadowsweet, Ginger, and Boswellia Serrata resin in a two-step sequential extraction.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le MÉLANGE MOUVEMENT LIBRE associe des sommités de Reine des Prés, du rhizome de Gingembre et de la gomme-résine de Boswellia Serrata. Grâce à l'extraction séquentielle en deux paliers, les dérivés aromatiques des plantes feuillées et la fraction résineuse du Boswellia sont extraits séparément selon leur solubilité.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Botanique</h3>
          <p class="mb-12">La Reine des Prés renferme des composés aromatiques délicats, tandis que la résine de Boswellia est une matière dense riche en acides boswelliques nécessitant un palier d'extraction adapté sous agitation.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "Sommités & Rhizomes" (30g)</h4>
              <p class="text-sm"><strong>Reine des Prés & <a href=\"/boutique/\" class=\"text-botanik-orange font-bold hover:underline\">Gingembre</a> :</strong> Sélectionnés pour leurs dérivés salicylés naturels et leur richesse aromatique.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "Gomme-Résine de Boswellia" (20g)</h4>
              <p class="text-sm"><strong><a href=\"/boutique/kit-articulaire/\" class=\"text-botanik-orange font-bold hover:underline\">Boswellia Serrata</a> (Gomme-Résine) :</strong> Substance résineuse traditionnelle riche en acides boswelliques, extraite lors du second palier.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Préparation (Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase Végétale (80°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Extraction de la Reine des Prés et du Gingembre (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase Résineuse (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Dispersion et extraction de la gomme-résine de Boswellia sous agitation mécanique.</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-botanik-green/10 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Spécificités de la Synergie</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Alliance Plante & Résine :</strong> Associe une plante européenne traditionnelle (Reine des Prés) et une résine aromatique (Boswellia).</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Base Huileuse Cosmétique :</strong> Adapté à la préparation d'huiles de massage aromatiques après l'effort.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Sans Additifs :</strong> Plantes et résine brutes sélectionnées sans conservateurs ajoutés.</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#3E4A3D] text-white p-10 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
            <h4 class="font-bold mb-6 text-white text-xl">Usage du Concentré "MOUVEMENT LIBRE"</h4>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Interne (Boisson botanique)</span>
                <p class="text-sm text-white/80">50 gouttes diluées dans un verre d'eau, dans le respect des précautions d'emploi.</p>
              </div>
              <div>
                <span class="block font-bold text-botanik-orange mb-2">Usage Externe (Huile de massage cosmétique)</span>
                <p class="text-sm text-white/80">Si réalisé avec une base huileuse, massez localement pour un soin cutané aromatique et réchauffant.</p>
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
                <span class="flex-1"><strong>Boswellia Serrata :</strong> Résine sélectionnée pour sa richesse naturelle en acides boswelliques.</span>
              </li>
              <li class="flex items-start gap-3 w-full">
                <svg class="w-5 h-5 text-botanik-orange mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="flex-1"><strong>Gingembre :</strong> Frais et déshydraté à basse température (&lt;35°C) pour préserver ses composés aromatiques.</span>
              </li>
            </ul>
          </div>

          <div class="bg-botanik-orange/5 p-8 rounded-[32px] border border-botanik-orange/10 mb-12">
            <h3 class="text-xl font-bold text-botanik-green mb-4">L'approche Bloom</h3>
            <p class="italic text-botanik-green/80 leading-relaxed">
              "Grâce à l'agitation constante et au contrôle thermique de la BloomLab, la résine de Boswellia est dispersée de façon homogène dans la préparation selon votre choix de solvant."
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
            Note légale : Ce mélange de plantes est un produit alimentaire/cosmétique destiné à un usage culinaire et de soin maison. Il ne constitue pas un médicament et ne peut se substituer à un avis médical.
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none space-y-6">
          <p class="text-lg">${isDE ? "Zweiphasiges Protokoll: Beutel A mit Mädesüß & Ingwer (80°C / 2h) und Beutel B mit Boswellia Serrata Harz (55°C / 4h). Nicht geeignet bei Salicylat-Unverträglichkeit oder Einnahme von Blutverdünnern." : "Dual-stage protocol: Pouch A with Meadowsweet & Ginger (80°C / 2h) and Pouch B with Boswellia Serrata resin (55°C / 4h). Avoid if allergic to salicylates or taking anticoagulants."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Format" : isDE ? "Inhalt" : "Size", value: "50g", icon: Leaf }]
    },
    'kit-bouclier-hiver': {
      name: isFR ? "BOUCLIER HIVER" : isDE ? "WINTERSCHUTZ" : "WINTER SHIELD",
      subtitle: isFR ? "BOTANIQUE DE SAISON" : isDE ? "SAISONALE KRÄUTERMISCHUNG" : "SEASONAL BOTANICALS",
      price: 9.90,
      images: [bouclierHiverImg, trioPouchesImg, "/assets/images/herbs_close_up_cleaned_1786616800877.jpg", "/assets/images/natural_remedies_cleaned_1786616831671.jpg"],
      description: isFR 
        ? "Le MÉLANGE BOUCLIER HIVER associe Gingembre, Girofle, baies de Sureau, Thym et Romarin dans une extraction séquencée de saison."
        : isDE
        ? "WINTERSCHUTZ kombiniert Ingwer, Nelken, Holunderbeeren, Thymian und Rosmarin als aromatische Wintermischung."
        : "WINTER SHIELD pairs Ginger, Clove, Elderberry, Thyme, and Rosemary in sequential extraction for seasonal herbal infusions.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <p class="text-xl leading-relaxed text-botanik-green">
              Le MÉLANGE BOUCLIER HIVER réunit des épices et plantes aromatiques de la tradition hivernale (Gingembre, Girofle, baies de Sureau, Thym, Romarin). Le séquençage en deux paliers respecte la différence entre épices/baies denses et herbes aromatiques délicates.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">La Technologie de Séquençage Bloom</h3>
          <p class="mb-12">Certaines matières (racines, épices, baies) nécessitent un palier plus chaud pour libérer leurs pigments et composés piquants, tandis que les herbes aromatiques (thym, romarin) demandent une extraction modérée pour conserver leurs notes volatiles.</p>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET A : "Épices & Baies" (25g)</h4>
              <p class="text-sm"><strong>Gingembre & Girofle :</strong> Épices denses riches en gingérol et eugénol aromatiques.<br/><strong>Sureau (Baies) :</strong> Baies riches en anthocyanes et pigments sombres.</p>
            </div>
            <div class="bg-white border border-botanik-green/10 p-8 rounded-3xl shadow-sm">
              <h4 class="font-bold text-botanik-green mb-4">SACHET B : "Herbes Aromatiques" (25g)</h4>
              <p class="text-sm"><strong>Thym & Romarin :</strong> Plantes aromatiques méditerranéennes dont les notes essentielles bénéficient d'une température modérée.</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-botanik-green mb-6">Protocole de Création (Le Mode d'Emploi)</h3>
          <div class="space-y-8 mb-12">
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">1</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 1 : Phase Épices & Baies (90°C / 2h)</h4>
                <p class="text-sm text-botanik-green/70">Extraction des baies de Sureau, du Gingembre et du Girofle (Sachet A + 700ml base).</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#C8AB8A] text-[#0F261E] rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md" style="background-color: #C8AB8A; color: #ffffff;">2</div>
              <div>
                <h4 class="font-bold text-botanik-green">Étape 2 : Phase Aromatique (55°C / 4h)</h4>
                <p class="text-sm text-botanik-green/70">Capture des arômes de Thym et Romarin à température douce (Sachet B).</p>
              </div>
            </div>
          </div>

          <div class="bg-[#1B3022]/5 p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold text-botanik-green mb-6">Atouts de la Synergie</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Profil Aromatique Chaleureux :</strong> Mélange traditionnel d'épices hivernales et d'aromates méditerranéens.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Richesse en Pigments & Polyphénols :</strong> Baies de sureau et plantes brutes sans additifs.</span>
              </li>
              <li class="flex items-start gap-3">
                <Check class="w-5 h-5 text-botanik-orange mt-1" />
                <span><strong>Polyvalence Maison :</strong> Boisson chaude aromatique ou macérat huileux de friction cosmétique.</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#3E4A3D] text-white p-10 rounded-[40px] mb-12 shadow-lg" style="background-color: #3E4A3D; color: #ffffff;">
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
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes issues de l'agriculture biologique.</p>
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
                <div class="font-bold text-botanik-orange text-sm">Sélection Botanique</div>
                <p class="text-[10px] leading-tight text-botanik-green/70">Plantes brutes sélectionnées sans additif ni conservateur ajouté.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl mt-8 text-xs text-red-900 italic">
            <strong>⚠️ Précautions & Sécurité :</strong> Adulte uniquement. Déconseillé aux femmes enceintes, allaitantes, ou personnes sensibles aux dérivés salicylés. Demandez conseil à votre praticien de santé.
          </div>

          <p class="text-center italic text-botanik-green/40 mt-12">
            "Ce kit est révolutionnaire car il s'inscrit en routine hivernale sans prétendre traiter une affection, mais comme un signal pour renforcer votre propre structure." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none space-y-6">
          <p class="text-lg">${isDE ? "Beutel A (Ingwer, Nelke & Holunderbeere, 90°C / 2h) gefolgt von Beutel B (Thymian & Rosmarin, 55°C / 4h) zum Schutz flüchtiger ätherischer Öle." : "Pouch A (Ginger, Clove & Elderberry, 90°C / 2h) followed by Pouch B (Thyme & Rosemary, 55°C / 4h) to preserve volatile aromatic compounds."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Format" : isDE ? "Inhalt" : "Size", value: "50g", icon: Leaf }]
    },
    'kit-reset': {
      name: isFR ? "Duo Argiles — Purification Systémique Zeolithe-Bentonite" : isDE ? "Erden-Duo — Systemische Reinigung Zeolith-Bentonit" : "Clays Duo — Systemic Purification Zeolite-Bentonite",
      subtitle: isFR ? "CHÉLATION NATURELLE & RÉÉQUILIBRAGE DE TERRAIN" : isDE ? "MINERALISCHE SYNERGIE & TERRAIN" : "MINERAL SYNERGY & TERRAIN",
      price: 34.00,
      originalPrice: 49.00,
      images: [duoArgilesImg],
      description: isFR 
        ? "Une association de zéolithes et bentonites naturelles sélectionnées pour leurs propriétés d'adsorption et leur structure microporeuse unique."
        : isDE
        ? "Eine Kombination aus natürlichen Zeolithen und Bentoniten, ausgewählt aufgrund ihrer Adsorptionseigenschaften und ihrer einzigartigen mikroporösen Struktur."
        : "An association of natural zeolites and bentonites selected for their adsorption properties and unique microporous structure.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none space-y-8">
          <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#1B3022]/10 text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-[#3E4A3D] mb-2.5">L'Ingénierie Minérale de Précision</h3>
            <p class="text-xs sm:text-sm leading-relaxed text-[#1B3022]/75 max-w-xl mx-auto">
              Le Duo Argiles repose sur l'affinité physico-chimique de minéraux volcaniques purs. Une approche rigoureuse du <strong>rééquilibrage du terrain</strong> par la maîtrise des polarités minérales.
            </p>
          </div>

          <div>
            <h3 class="text-lg sm:text-xl font-bold text-[#3E4A3D] mb-2.5">Propriétés Physico-Chimiques & Granulométrie</h3>
            <p class="text-xs sm:text-sm text-[#1B3022]/75 leading-relaxed mb-6">
              Grâce à une activation tribomécanique, ces minéraux atteignent une finesse optimale de <strong>6 microns</strong>. Cette réduction granulométrique démultiplie la surface d'échange active, permettant une dispersion homogène et une capture douce au sein du tractus digestif.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="bg-white border border-[#1B3022]/10 p-5 sm:p-6 rounded-2xl shadow-xs">
              <h4 class="font-bold text-[#3E4A3D] text-sm sm:text-base mb-2">Zéolithe Clinoptilolite (6μm)</h4>
              <p class="text-xs sm:text-sm text-[#1B3022]/70 leading-relaxed">
                Minéral à structure cristalline microporeuse agissant par échange cationique sélectif, piégeant les molécules indésirables sans franchir la barrière intestinale.
              </p>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-5 sm:p-6 rounded-2xl shadow-xs">
              <h4 class="font-bold text-[#3E4A3D] text-sm sm:text-base mb-2">Bentonite Montmorillonite</h4>
              <p class="text-xs sm:text-sm text-[#1B3022]/70 leading-relaxed">
                Argile smectite de haute pureté reconnue pour son pouvoir tapissant et sa capacité d'adsorption protectrice au niveau du film muqueux digestif.
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg sm:text-xl font-bold text-[#3E4A3D] mb-4">Protocole d'Usage Recommandé</h3>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="flex items-start gap-3.5 bg-white border border-[#1B3022]/8 p-4 rounded-xl">
                <div class="w-7 h-7 bg-[#3E4A3D] text-[#C8AB8A] rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                <div>
                  <h4 class="font-bold text-xs sm:text-sm text-[#3E4A3D] mb-1">Mise en Suspension</h4>
                  <p class="text-xs text-[#1B3022]/70 leading-relaxed">Diluez une dosette rase dans un grand verre d'eau tempérée. Privilégiez une cuillère en bois ou en verre pour respecter les polarités ioniques.</p>
                </div>
              </div>
              <div class="flex items-start gap-3.5 bg-white border border-[#1B3022]/8 p-4 rounded-xl">
                <div class="w-7 h-7 bg-[#3E4A3D] text-[#C8AB8A] rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                <div>
                  <h4 class="font-bold text-xs sm:text-sm text-[#3E4A3D] mb-1">Rythme & Espacement</h4>
                  <p class="text-xs text-[#1B3022]/70 leading-relaxed">À consommer à jeun le matin ou au coucher, en respectant un intervalle minimum de 2 heures avec tout repas, complément ou traitement.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#3E4A3D] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-sm text-center">
            <h4 class="font-semibold text-white text-base sm:text-lg mb-2">Sélection Minérale Rigoureuse</h4>
            <p class="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed mb-0">
              Minéraux volcaniques naturels sans conservateur ni irradiation. Sans conservateur, sans irradiation, sans nanoparticules. Une formulation transparente respectant l'intégrité biologique de votre organisme.
            </p>
          </div>

          <div class="bg-amber-50/70 border border-amber-200/50 p-4 rounded-xl text-xs text-amber-900/80 leading-relaxed">
            <strong>Recommandations d'usage :</strong> Ce produit s'inscrit dans une démarche de bien-être et ne constitue pas un médicament ni un diagnostic médical. Femmes enceintes, allaitantes ou personnes sous traitement médical : demander conseil à un professionnel de santé.
          </div>

          <p class="text-center italic text-[11px] text-[#1B3022]/40 pt-2">
            "L'Ingénierie minérale au service de l'équilibre homéostasique." — L'Architecte Bloom
          </p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none space-y-8">
          <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#1B3022]/10 text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-[#3E4A3D] mb-2.5">
              ${isDE ? "Präzise Mineralstoff-Ingenieurkunst" : "Precision Mineral Engineering"}
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed text-[#1B3022]/75 max-w-xl mx-auto">
              ${isDE ? "Das Duo basiert auf reinen vulkanischen Mineralien für die gezielte Neuausrichtung des biologischen Terrains." : "The Duo relies on pure volcanic minerals for the deliberate rebalancing of the biological terrain."}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="bg-white border border-[#1B3022]/10 p-5 rounded-2xl shadow-xs">
              <h4 class="font-bold text-[#3E4A3D] text-sm sm:text-base mb-2">
                ${isDE ? "Klinoptilolith-Zeolith (6μm)" : "Clinoptilolite Zeolite (6μm)"}
              </h4>
              <p class="text-xs sm:text-sm text-[#1B3022]/70 leading-relaxed">
                ${isDE ? "Mikroporöse Struktur für selektiven Kationenaustausch ohne systemische Aufnahme." : "Microporous crystalline structure acting through selective cation exchange without systemic absorption."}
              </p>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-5 rounded-2xl shadow-xs">
              <h4 class="font-bold text-[#3E4A3D] text-sm sm:text-base mb-2">
                ${isDE ? "Montmorillonit-Bentonit" : "Montmorillonite Bentonite"}
              </h4>
              <p class="text-xs sm:text-sm text-[#1B3022]/70 leading-relaxed">
                ${isDE ? "Hohe Bindekraft und schützende Abdeckung der Schleimhautbarriere." : "High purity smectite clay renowned for mucosal soothing and protective barrier adsorption."}
              </p>
            </div>
          </div>
        </div>
      `,
      specs: [
        { label: isFR ? "Grade" : isDE ? "Qualität" : "Grade", value: isFR ? "Pharma / Européen" : isDE ? "Pharma-Qualität" : "European Pharma Grade", icon: ShieldCheck },
        { label: isFR ? "Finesse" : isDE ? "Feinheit" : "Fineness", value: "6μm (Micron)", icon: RefreshCw }
      ]
    },
    'freemium-access': {
      name: isFR ? "Accès Découverte" : isDE ? "Entdecker-Zugang" : "Discovery Access",
      subtitle: isFR ? "OFFERT" : isDE ? "KOSTENLOS" : "FREE",
      price: 0,
      images: [img4],
      description: isFR
        ? "Commencez votre voyage avec nos 10 recettes fondamentales en accès libre."
        : isDE
        ? "Starten Sie mit unseren 10 kostenlosen Basisrezepten in die botanische Extraktion."
        : "Start your journey with our 10 foundational free recipes.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Découvrez la puissance de l'extraction maison avec ces 10 recettes cultes, spécialement sélectionnées pour débuter avec votre BloomLab.</p>
          <h3 class="text-xl font-bold mb-6">Vos 10 Recettes Offertes :</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">01</span>
              <span class="font-medium text-botanik-green">Infusion Sommeil Profond</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">02</span>
              <span class="font-medium text-botanik-green">Huile de Massage Articulaire</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">03</span>
              <span class="font-medium text-botanik-green">Sérum Visage Éclat Botanique</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">04</span>
              <span class="font-medium text-botanik-green">Baume à Lèvres au Calendula</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">05</span>
              <span class="font-medium text-botanik-green">Teinture Mère de Propolis (Extraction Hydroalcoolique)</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">06</span>
              <span class="font-medium text-botanik-green">Sirop de Sureau Immunité</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">07</span>
              <span class="font-medium text-botanik-green">Eau Florale de Lavande</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">08</span>
              <span class="font-medium text-botanik-green">Macérat de Pâquerette Tenseur</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">09</span>
              <span class="font-medium text-botanik-green">Gel d'Aloe Vera Frais</span>
            </div>
            <div class="flex items-center gap-3 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="w-8 h-8 bg-[#3E4A3D] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm" style="background-color: #3E4A3D; color: #ffffff;">10</span>
              <span class="font-medium text-botanik-green">Infusion Digestive au Gingembre</span>
            </div>
          </div>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-4">${isDE ? "Entdecken Sie die botanische Extraktion mit 10 ausgewählten Basisrezepten (Schlafaufguss, Gelenk-Massageöl, Gesichtsserum, Calendula-Lippenbalsam, Ingwer-Aufguss u. v. m.)." : "Discover home botanical extraction with 10 curated starter recipes (Evening Infusion, Joint Massage Oil, Radiance Serum, Calendula Lip Balm, Ginger Digestive Infusion, and more)."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Type" : isDE ? "Typ" : "Type", value: "Digital", icon: Info }]
    },
    'premium-access': {
      name: isFR ? "Abonnement Précision" : isDE ? "Präzisions-Abo" : "Precision Subscription",
      subtitle: isFR ? "ACCÈS TOTAL ILLIMITÉ" : isDE ? "UNBEGRENZTER VOLLZUGANG" : "UNLIMITED FULL ACCESS",
      price: 9.00,
      images: [modernShelvesImg],
      description: isFR
        ? "L'intégralité des protocoles et savoirs Bloom en accès illimité : protocoles, vidéos et bibliothèque de recettes."
        : isDE
        ? "Unbegrenzter Zugriff auf alle Bloom-Protokolle, Anleitungen und die komplette Rezeptbibliothek."
        : "Unlimited access to all Bloom protocols, guides, and the complete recipe library.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Rejoignez les membres Bloom Précision et débloquez tout le potentiel de votre souveraineté botanique.</p>
          <div class="bg-botanik-orange/5 border border-botanik-orange/20 p-6 rounded-2xl mb-8">
            <h4 class="font-bold text-botanik-green mb-4">Conditions & Réglementations :</h4>
            <ul class="space-y-3 text-sm text-botanik-green/80">
              <li class="flex items-start gap-2">
                <span class="text-botanik-orange font-bold">•</span>
                <span><strong>Liberté Totale :</strong> Abonnement résiliable à tout moment en un clic depuis votre espace membre.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-botanik-orange font-bold">•</span>
                <span><strong>Accès Immédiat :</strong> Bibliothèque complète des protocoles validés.</span>
              </li>
            </ul>
          </div>
          <p class="text-sm italic text-botanik-green/60">Tarif : 9 € TTC par mois.</p>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isDE ? "Erhalten Sie unbegrenzten Zugriff auf alle 60+ Extraktionsprotokolle, Temperaturkurven und monatlichen Updates – jederzeit mit 1 Klick kündbar (9 € / Monat)." : "Unlock unlimited access to 60+ botanical extraction protocols, temperature curves, and monthly updates—cancelable anytime in 1 click (9 € / month)."}</p>
        </div>
      `,
      specs: [{ label: isFR ? "Type" : isDE ? "Typ" : "Type", value: isFR ? "Abonnement Mensuel" : isDE ? "Monats-Abo" : "Monthly Plan", icon: Info }]
    },
    'abonnement-decouverte': {
      name: isFR ? "Abonnement Découverte" : isDE ? "Entdecker-Abo" : "Discovery Plan",
      subtitle: isFR ? "L'ESSENTIEL BOTANIQUE" : isDE ? "BOTANISCHE GRUNDLAGEN" : "BOTANICAL ESSENTIALS",
      price: 4.90,
      images: [img4],
      description: isFR ? "Accès aux 10 recettes fondamentales et guides d'initiation." : isDE ? "Zugriff auf die 10 Basisrezepte und Einführungsleitfäden." : "Access to 10 fundamental recipes and beginner guides.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Formule idéale pour découvrir la puissance de l'extraction végétale domestique.</p>
          <p class="text-sm italic text-botanik-green/60">Tarif : 4,90 € TTC par an.</p>
        </div>
      ` : `<p>${isDE ? "Idealer Einstieg in die Welt der präzisen Pflanzenextraktion zu Hause (4,90 € / Jahr)." : "Ideal entry plan to explore home botanical extraction (4.90 € / year)."}</p>`,
      specs: [{ label: isFR ? "Type" : isDE ? "Typ" : "Type", value: isFR ? "Abonnement Annuel" : isDE ? "Jahres-Abo" : "Annual Plan", icon: Info }]
    },
    'abonnement-precision': {
      name: isFR ? "Abonnement Précision" : isDE ? "Präzisions-Abo" : "Precision Plan",
      subtitle: isFR ? "ACCÈS TOTAL ILLIMITÉ" : isDE ? "UNBEGRENZTER VOLLZUGANG" : "UNLIMITED FULL ACCESS",
      price: 9.00,
      images: [modernShelvesImg],
      description: isFR ? "Protocoles complets, fiches botaniques et mises à jour mensuelles." : isDE ? "Alle Protokolle, Pflanzenmonografien und monatliche Updates." : "Full access to botanical protocols, monographs, and monthly updates.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Accès intégral à l'intelligence Bloom et aux protocoles interactifs.</p>
          <p class="text-sm italic text-botanik-green/60">Tarif : 9 € TTC par mois.</p>
        </div>
      ` : `<p>${isDE ? "Vollzugriff auf alle Bloom-Protokolle und Monografien (9 € / Monat)." : "Full access to all Bloom protocols and botanical monographs (9 € / month)."}</p>`,
      specs: [{ label: isFR ? "Type" : isDE ? "Typ" : "Type", value: isFR ? "Abonnement Mensuel" : isDE ? "Monats-Abo" : "Monthly Plan", icon: Info }]
    },
    'abonnement-integral': {
      name: isFR ? "Abonnement Intégral" : isDE ? "Integral-Abo" : "Integral Plan",
      subtitle: isFR ? "ACCOMPAGNEMENT & EXPERTISE" : isDE ? "BEGLEITUNG & EXPERTISE" : "GUIDANCE & EXPERTISE",
      price: 79.00,
      images: [bloomLabImg],
      description: isFR ? "Accès total à la bibliothèque, masterclasses exclusives et ressources complètes." : isDE ? "Vollzugriff auf Bibliothek, exklusive Masterclasses und alle Fachressourcen." : "Comprehensive annual access including exclusive masterclasses and full library.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">L'expérience annuelle complète Bloom avec masterclasses et bibliothèque intégrale.</p>
          <p class="text-sm italic text-botanik-green/60">Tarif : 79,00 € TTC par an.</p>
        </div>
      ` : `<p>${isDE ? "Das vollständige Jahreserlebnis inklusive Bibliothek und exklusiver Masterclasses (79,00 € / Jahr)." : "The complete annual Bloom experience with full library and exclusive masterclasses (79.00 € / year)."}</p>`,
      specs: [{ label: isFR ? "Type" : isDE ? "Typ" : "Type", value: isFR ? "Abonnement Annuel" : isDE ? "Jahres-Abo" : "Annual Plan", icon: Info }]
    }
  };
  
  // SEO aliases for direct canonical URLs and alternate slugs
  if (sheets['kit-reset']) sheets['duo-argiles'] = sheets['kit-reset'];
  if (sheets['kit-starter']) sheets['seve-fondamentale'] = sheets['kit-starter'];
  if (sheets['kit-nuit']) sheets['nuit-profonde'] = sheets['kit-nuit'];
  if (sheets['kit-digestion']) {
    sheets['confort-digestif'] = sheets['kit-digestion'];
    sheets['digestion'] = sheets['kit-digestion'];
  }
  if (sheets['kit-articulaire']) sheets['feu-articulaire'] = sheets['kit-articulaire'];
  if (sheets['kit-bouclier-hiver']) {
    sheets['bouclier-hiver'] = sheets['kit-bouclier-hiver'];
    sheets['kit-hiver'] = sheets['kit-bouclier-hiver'];
  }
  if (sheets['bundle-apothicaire']) {
    sheets['herbier-complet-rentree-2026'] = sheets['bundle-apothicaire'];
  }

  return sheets;
};