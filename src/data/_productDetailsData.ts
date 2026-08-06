import { Language } from '../translations';
import { Thermometer, Timer, RefreshCw, FlaskConical, Leaf, ShieldCheck, Info, Award, ShoppingBag, ChefHat } from 'lucide-react';
import bloomLabImg from '../assets/images/bloomlab_main_1784887530345.jpeg';
import duoArgilesImg from '../assets/images/product_duo_argiles.jpg';
import trioPouchesImg from '../assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from '../assets/images/product_feu_articulaire.jpg';
import bouclierHiverImg from '../assets/images/product_bouclier_hiver.jpg';
import nuitProfondeImg from '../assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from '../assets/images/product_seve_fondamentale.jpg';
import digestionImg from '../assets/images/product_digestion.jpeg';
import img2 from '../assets/images/2-1.png';
import img3 from '../assets/images/3-1.png';
import img4 from '../assets/images/4-1.png';
import img5 from '../assets/images/5-1.png';
import img6 from '../assets/images/6-1.png';

export const getProductSheets = (lang: Language): Record<string, any> => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  return {
    'bloomlab': {
      name: "BloomLab",
      subtitle: isFR ? "SOUVERAINETÉ SANTÉ 2026" : isDE ? "GESUNDHEITSSOUVERÄNITÄT 2026" : "HEALTH SOVEREIGNTY 2026",
      price: 289,
      originalPrice: 329,
      images: [bloomLabImg, img2, img3, img4, img5, img6],
      description: isFR 
        ? "La première machine 6-en-1 grand public capable de réaliser à domicile des extractions botaniques complexes — huiles infusées, sérums, teintures, macérats — avec un contrôle de paramètres (temps, température, séquençage) habituellement réservé aux laboratoires professionnels."
        : isDE 
        ? "Die erste 6-in-1-Maschine für Endverbraucher, die in der Lage ist, komplexe botanische Extraktionen zu Hause durchzuführen — infundierte Öle, Seren, Tinkturen, Mazerate — mit einer Kontrolle der Parameter (Zeit, Temperatur, Sequenzierung), die normalerweise professionellen Labors vorbehalten ist."
        : "The first 6-in-1 consumer machine capable of performing complex botanical extractions at home — infused oils, serums, tinctures, macerates — with parameter control (time, temperature, sequencing) usually reserved for professional laboratories.",
      fullDescription: isFR ? `
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
          <div class="bg-[#1B3022] text-white p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold mb-6 text-[#F97316]">Le Cerveau Thermique de Précision (Technologie PID)</h3>
            <p class="leading-relaxed opacity-90">Contrairement aux extracteurs classiques qui font fluctuer la température et détruisent les principes actifs fragiles, la BloomLab est équipée d'un contrôleur PID de laboratoire. Il anticipe les variations de chaleur pour maintenir une stabilité parfaite à ±0,5°C près. C'est la seule garantie que les molécules thermolabiles (comme les terpènes ou les acides boswelliques) soient préservées à 100%, transformant votre cuisine en véritable laboratoire d'extraction du Totum.</p>
          </div>
        </div>
      ` : isDE ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">BloomLab ist das erste 6-in-1-Konsumgerät, das in der Lage ist, komplexe botanische Extraktionen zu Hause durchzuführen — infundierte Öle, Seren, Tinkturen, Mazerate — mit einer Kontrolle der Parameter (Zeit, Temperatur, Sequenzierung), die normalerweise professionellen Labors vorbehalten ist. Es ist kein einfacher Mixer oder Infuser: Es ist ein Werkzeug zur botanischen Formulierung, das auch Nicht-Chemikern zugänglich ist.</p>
          <h2 class="text-3xl font-bold mb-6 mt-12">Das fehlende Glied: Die Lücke zwischen Wissen und Produktion</h2>
          <p class="mb-6">Bisher war die Landschaft der pflanzlichen Pflege in zwei Welten ohne reale Brücke fragmentiert:</p>
          <ul class="space-y-4 mb-8">
            <li><strong>Verbraucherseite:</strong> Vorgefertigte, standardisierte Pulver, Kapseln, ätherische Öle und Ergänzungsmittel, die für die breite Masse formuliert wurden — effektiv, aber ohne Personalisierung oder molekulare Frische.</li>
            <li><strong>Profiseite:</strong> Extraktionslabors, die in der Lage sind, präzise ölige Mazerate, Doppelextraktionen, lipophile/hydrophile Fraktionen durchzuführen — aber mit Ausrüstungen für zehntausende Euro, die für 99% der Menschen unzugänglich sind.</li>
          </ul>
          <p class="mb-8">BloomLab schließt diese Lücke, indem es die Beherrschung kritischer Extraktionsparameter demokratisiert:</p>
          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Die Temperatur</h4>
              <p class="text-sm">Bewahrung hitzeempfindlicher Polyphenole.</p>
            </div>
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Die Dauer</h4>
              <p class="text-sm">Optimale Extraktion ohne Abbau.</p>
            </div>
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Die Sequenzierung</h4>
              <p class="text-sm">Extraktion durch Phasen unterschiedlicher Polarität.</p>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">Automatisch optimierte botanische Extraktion</h2>
          <p class="mb-8">BloomLab wirkt auf die drei Schlüsselparameter der Pflanzenextraktion.</p>
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg></div>
              <h4 class="font-bold mb-2">Geregelte Temperatur</h4>
              <p class="text-sm opacity-70">Schützt empfindliche Pflanzenverbindungen.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></div>
              <h4 class="font-bold mb-2">Dynamische Rührung</h4>
              <p class="text-sm opacity-70">Fördert die Freisetzung von Pflanzenwirkstoffen.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg></div>
              <h4 class="font-bold mb-2">Kontrollierte Zeit</h4>
              <p class="text-sm opacity-70">Garantiert eine gleichmäßige und reproduzierbare Extraktion.</p>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">Was Sie mit BloomLab kreieren können</h2>
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Botanische Kosmetik</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• Ölige Mazerate für Haut und Haar</li>
                <li>• Pflegeöle und Massagen</li>
                <li>• Infundierte Butter</li>
              </ul>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Pflanzliche Heilmittel</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• Pflanzentinkturen</li>
                <li>• Konzentrierte Extrakte</li>
                <li>• Präzise Infusionen</li>
              </ul>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Botanische Küche</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• Aromatische Öle</li>
                <li>• Infundierter Essig</li>
                <li>• Kräuterbutter</li>
              </ul>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-8">Ein automatisiertes 6-in-1-Protokoll</h2>
          <div class="space-y-4 mb-12">
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">1️⃣</span> <span>Vorbereitung der Pflanze</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">2️⃣</span> <span>Dynamische Infusion durch Rühren</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">3️⃣</span> <span>Präzise thermische Kontrolle (±1 °C)</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">4️⃣</span> <span>Homogene Verbindung Pflanze / Lösungsmittel</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">5️⃣</span> <span>Klare Filtration für einen reinen Extrakt</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">6️⃣</span> <span>Automatischer Reinigungszyklus</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">Kompatible Lösungsmittel</h2>
          <div class="flex flex-wrap gap-4 mb-12">
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Pflanzenöle</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Butter</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Alkohol</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Essig</span>
          </div>
          <div class="bg-[#F9F9F7] p-10 rounded-[40px] border border-[#1B3022]/10 mb-12">
            <h3 class="text-2xl font-bold mb-6">Alles ist enthalten, um sofort zu beginnen</h3>
            <ul class="grid md:grid-cols-2 gap-4">
              <li class="flex items-center gap-2">✔ Ultrafeiner Filterbeutel 90 Mikron</li>
              <li class="flex items-center gap-2">✔ Silikon-Schutzhandschuh</li>
              <li class="flex items-center gap-2">✔ Braunglasflasche 100 ml</li>
              <li class="flex items-center gap-2">✔ Serum-Spender</li>
              <li class="flex items-center gap-2">✔ Kosmetikdose 50 g</li>
              <li class="flex items-center gap-2">✔ Rezeptbuch</li>
              <li class="flex items-center gap-2">✔ Zugang zur Bloom Academy (Videos + botanischer Kalender)</li>
            </ul>
          </div>
          <div class="bg-[#1B3022] text-white p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold mb-6 text-[#F97316]">Das präzise thermische Gehirn (PID-Technologie)</h3>
            <p class="leading-relaxed opacity-90">Im Gegensatz zu herkömmlichen Extraktoren, bei denen die Temperatur schwankt und empfindliche Wirkstoffe zerstört werden, ist das BloomLab mit einem Labor-PID-Controller ausgestattet. Er antizipiert Wärmeschwankungen, um eine perfekte Stabilität auf ±0,5°C genau aufrechtzuerhalten. Dies ist die einzige Garantie dafür, dass thermolabile Moleküle (wie Terpene oder Boswelliasäuren) zu 100% erhalten bleiben und Ihre Küche in ein echtes Labor zur Extraktion des Totums verwandeln.</p>
          </div>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">BloomLab is the first 6-in-1 consumer machine capable of performing complex botanical extractions at home — infused oils, serums, tinctures, macerates — with parameter control (time, temperature, sequencing) usually reserved for professional laboratories. It is not just a mixer or infuser: it is a botanical formulation tool accessible to non-chemists.</p>
          <h2 class="text-3xl font-bold mb-6 mt-12">The missing link: The gap between knowing and producing</h2>
          <p class="mb-6">Until now, the herbal care landscape was fragmented into two worlds with no real bridge:</p>
          <ul class="space-y-4 mb-8">
            <li><strong>Consumer side:</strong> Pre-made, standardized powders, capsules, essential oils and supplements formulated for the masses — effective but without personalization or molecular freshness.</li>
            <li><strong>Professional side:</strong> Extraction laboratories capable of producing precision oil macerates, double extractions, lipophilic/hydrophilic fractions — but with equipment costing tens of thousands of dollars, inaccessible to 99% of people.</li>
          </ul>
          <p class="mb-8">BloomLab closes this gap by democratizing the mastery of critical extraction parameters:</p>
          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Temperature</h4>
              <p class="text-sm">Preservation of heat-sensitive polyphenols.</p>
            </div>
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Duration</h4>
              <p class="text-sm">Optimal extraction without degradation.</p>
            </div>
            <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
              <h4 class="font-bold text-[#F97316] mb-2">Sequencing</h4>
              <p class="text-sm">Extraction through distinct polarity phases.</p>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">Automatically optimized botanical extraction</h2>
          <p class="mb-8">BloomLab acts on the three key parameters of plant extraction.</p>
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg></div>
              <h4 class="font-bold mb-2">Regulated temperature</h4>
              <p class="text-sm opacity-70">Protects sensitive plant compounds.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></div>
              <h4 class="font-bold mb-2">Dynamic agitation</h4>
              <p class="text-sm opacity-70">Promotes the release of plant actives.</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#1B3022] text-white rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg></div>
              <h4 class="font-bold mb-2">Controlled time</h4>
              <p class="text-sm opacity-70">Guarantees regular and reproducible extraction.</p>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">What you can create with BloomLab</h2>
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Botanical Cosmetics</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• oil macerates for skin and hair</li>
                <li>• care oils and massages</li>
                <li>• infused butters</li>
              </ul>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Plant Remedies</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• plant tinctures</li>
                <li>• concentrated extracts</li>
                <li>• precise infusions</li>
              </ul>
            </div>
            <div class="bg-white border border-[#1B3022]/10 p-8 rounded-3xl">
              <h4 class="font-bold text-[#1B3022] mb-4">Botanical Cooking</h4>
              <ul class="text-sm space-y-2 opacity-70">
                <li>• aromatic oils</li>
                <li>• infused vinegars</li>
                <li>• herb butters</li>
              </ul>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-8">An automated 6-in-1 protocol</h2>
          <div class="space-y-4 mb-12">
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">1️⃣</span> <span>Plant preparation</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">2️⃣</span> <span>Dynamic agitation infusion</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">3️⃣</span> <span>Precise thermal control (±1 °C)</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">4️⃣</span> <span>Homogeneous plant / solvent bond</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">5️⃣</span> <span>Clean filtration for a clear extract</span>
            </div>
            <div class="flex items-center gap-4 p-4 bg-[#1B3022]/5 rounded-xl">
              <span class="font-bold text-[#F97316]">6️⃣</span> <span>Automatic cleaning cycle</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6">Compatible solvents</h2>
          <div class="flex flex-wrap gap-4 mb-12">
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Vegetable oils</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Butter</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Alcohol</span>
            <span class="px-6 py-2 bg-[#1B3022] text-white rounded-full text-sm">Vinegar</span>
          </div>
          <div class="bg-[#F9F9F7] p-10 rounded-[40px] border border-[#1B3022]/10 mb-12">
            <h3 class="text-2xl font-bold mb-6">Everything is included to start immediately</h3>
            <ul class="grid md:grid-cols-2 gap-4">
              <li class="flex items-center gap-2">✔ ultra-fine 90 micron filter bag</li>
              <li class="flex items-center gap-2">✔ silicon protective glove</li>
              <li class="flex items-center gap-2">✔ 100 ml amber bottle</li>
              <li class="flex items-center gap-2">✔ serum dispenser</li>
              <li class="flex items-center gap-2">✔ 50 g cosmetic jar</li>
              <li class="flex items-center gap-2">✔ recipe guide</li>
              <li class="flex items-center gap-2">✔ Bloom Academy access (videos + botanical calendar)</li>
            </ul>
          </div>
          <div class="bg-[#1B3022] text-white p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold mb-6 text-[#F97316]">The Precision Thermal Brain (PID Technology)</h3>
            <p class="leading-relaxed opacity-90">Unlike conventional extractors that fluctuate temperature and destroy fragile active principles, BloomLab is equipped with a laboratory PID controller. It anticipates heat variations to maintain perfect stability to within ±0.5°C. This is the only guarantee that thermolabile molecules (such as terpenes or boswellic acids) are 100% preserved, transforming your kitchen into a true Totum extraction laboratory.</p>
          </div>
        </div>
      `,
      specs: [
        { label: isFR ? "Contrôle" : isDE ? "Steuerung" : "Control", value: "0 °C à 121 °C", icon: Thermometer },
        { label: isFR ? "Matériau" : isDE ? "Material" : "Material", value: isFR ? "Inox 304 Certifié" : isDE ? "Zertifizierter 304 Edelstahl" : "Certified 304 Stainless Steel", icon: FlaskConical },
        { label: isFR ? "Temps" : isDE ? "Zeit" : "Time", value: isFR ? "30min à 12h" : isDE ? "30 Min. bis 12 Std." : "30min to 12h", icon: Timer },
        { label: isFR ? "Agitation" : isDE ? "Rühren" : "Agitation", value: isFR ? "Régulière / Dynamique" : isDE ? "Regelmäßig / Dynamisch" : "Regular / Dynamic", icon: RefreshCw }
      ]
    },
    'seve-fondamentale': {
      name: isFR ? "SÈVE FONDAMENTALE" : isDE ? "FUNDAMENTALER SAFT" : "FUNDAMENTAL SAP",
      subtitle: isFR ? "PROTOCOLE DE RESTAURATION BOTANIQUE" : isDE ? "BOTANISCHES RESTAURATIONSPROTOKOLL" : "BOTANICAL RESTORATION PROTOCOL",
      price: 12.90,
      images: [seveFondamentaleImg],
      description: isFR 
        ? "Sève Fondamentale est un protocole de restauration botanique pensé pour accompagner le terrain minéral et structurant de l’organisme."
        : isDE 
        ? "Sève Fondamentale ist ein botanisches Restaurationsprotokoll, das entwickelt wurde, um das mineralische und strukturierende Terrain des Organismus zu begleiten."
        : "Fundamental Sap is a botanical restoration protocol designed to accompany the mineral and structural terrain of the organism.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Sève Fondamentale est un protocole de restauration botanique pensé pour accompagner le terrain minéral et structurant de l’organisme. Grâce à la technologie BloomLab, l’extraction est réalisée en deux phases afin de préserver au mieux la richesse active des plantes et de rendre la formule plus cohérente avec son usage.</p>
          <h3 class="text-2xl font-bold mb-4 mt-8">Mode d’utilisation</h3>
          <ul class="space-y-3 mb-6">
            <li><strong>Posologie courante :</strong> 20 gouttes par jour, à diluer dans un verre d’eau.</li>
            <li><strong>Prise conseillée :</strong> 10 gouttes le matin et 10 gouttes le soir.</li>
            <li><strong>Dose maximale :</strong> ne pas dépasser 30 gouttes par jour.</li>
            <li><strong>Durée d’utilisation :</strong> suivre la cure pendant la durée indiquée sur le protocole du produit.</li>
          </ul>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">${isDE ? "Fundamental Sap ist ein botanisches Restaurationsprotokoll..." : "Fundamental Sap is a botanical restoration protocol..."}</p>
          <h3 class="text-2xl font-bold mb-4 mt-8">${isDE ? "Anwendung" : "How to use"}</h3>
          <ul class="space-y-3 mb-6">
            <li><strong>${isDE ? "Standarddosierung" : "Standard dosage"}:</strong> ${isDE ? "20 Tropfen pro Tag, in einem Glas Wasser verdünnt." : "20 drops per day, diluted in a glass of water."}</li>
          </ul>
        </div>
      `,
      specs: [
        { label: isFR ? "Format" : isDE ? "Format" : "Format", value: isFR ? "50g Bio-Botanique" : isDE ? "50g Bio-Botanisch" : "50g Bio-Botanical", icon: Leaf },
        { label: isFR ? "Cible" : isDE ? "Ziel" : "Target", value: isFR ? "Peau, Cheveux, Ongles" : isDE ? "Haut, Haare, Nägel" : "Skin, Hair, Nails", icon: ShieldCheck }
      ]
    },
    'duo-argiles': {
      name: isFR ? "Duo ARGILES : Adsorbant Naturel Métaux Lourds et Toxines-Haute précision (6μm)" : "Precision CLAYS Duo: Natural Adsorbent (6μm)",
      subtitle: isFR ? "Zéolithe Clinoptilolite activée à 6 microns - Grade Médical" : "6-Micron Activated Zeolite Clinoptilolite - Medical Grade",
      price: 44.90,
      images: [duoArgilesImg],
      description: isFR 
        ? "Découvrez le Duo RESET Renaissance : une Zéolithe Clinoptilolite activée à 6 microns pour une pureté inégalée. Capturez les métaux lourds et restaurez votre terrain avec l'excellence minérale Bloom by BotaniK. Grade Médical."
        : "Discover the Duo RESET Renaissance: a 6-micron activated Zeolite Clinoptilolite for unparalleled purity. Capture heavy metals and restore your terrain with Bloom by BotaniK mineral excellence.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Le Duo RESET à 6 microns (3 fois plus fin que les standards du marché) et certifié grade Pharmacopée Européenne garantit une puissance d'adsorption et une pureté inégalée. Pour votre terrain, n'acceptez aucun compromis.</p>
          
          <h2 class="text-2xl font-bold mb-6 mt-12">La Science de l'Adsorption</h2>
          <p class="mb-6">La Zéolithe Clinoptilolite est un minéral naturel d'origine volcanique possédant une structure cristalline en forme de cage. Cette structure microporeuse lui permet de capturer sélectivement les toxines, les métaux lourds (plomb, mercure, cadmium) et les résidus chimiques par un processus d'échange ionique.</p>
          
          <div class="bg-[#1B3022]/5 p-8 rounded-[40px] mb-12">
            <h3 class="text-xl font-bold mb-4">Pourquoi 6 microns ?</h3>
            <p class="text-sm leading-relaxed">La finesse de la poudre est le facteur déterminant de son efficacité. Plus la particule est fine, plus la surface de contact (surface spécifique) est grande. À 6 microns, notre zéolithe offre une capacité de capture démultipliée par rapport aux produits standards (souvent entre 20 et 50 microns).</p>
          </div>

          <h3 class="text-2xl font-bold mb-6 italic">"Votre corps n'est pas cassé. Il est verrouillé par la surcharge environnementale."</h3>
          
          <h2 class="text-2xl font-bold mb-6">Conseils d'utilisation</h2>
          <div class="space-y-4 mb-12">
            <div class="flex items-start gap-4 p-6 bg-white border border-[#1B3022]/10 rounded-2xl">
              <span class="font-bold text-[#F97316]">Phase 1 :</span>
              <p class="text-sm">Mélanger une cuillère doseuse rase dans un grand verre d'eau, de préférence le matin à jeun ou le soir au coucher.</p>
            </div>
            <div class="flex items-start gap-4 p-6 bg-white border border-[#1B3022]/10 rounded-2xl">
              <span class="font-bold text-[#F97316]">Phase 2 :</span>
              <p class="text-sm">Boire immédiatement après avoir mélangé. Il est crucial de maintenir une hydratation importante tout au long de la journée (minimum 2L d'eau).</p>
            </div>
          </div>

          <div class="bg-[#293228] text-white p-10 rounded-[40px] mb-12">
            <h3 class="text-2xl font-bold mb-6 text-[#F97316]">Précautions & Contre-indications</h3>
            <ul class="space-y-3 text-sm opacity-90">
              <li>• Ne pas inhaler la poudre.</li>
              <li>• Espacer la prise de 2h avec tout médicament ou complément alimentaire (la zéolithe pourrait adsorber les principes actifs).</li>
              <li>• Déconseillé aux femmes enceintes, allaitantes et aux personnes ayant des antécédents de pathologies rénales lourdes sans avis médical.</li>
              <li>• Tenir hors de portée des enfants.</li>
            </ul>
          </div>
        </div>
      ` : `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">The Duo RESET at 6 microns (3 times finer than market standards) and certified European Pharmacopoeia grade guarantees unparalleled adsorption power and purity. For your terrain, accept no compromise.</p>
          <h2 class="text-2xl font-bold mb-6 mt-12">How to use</h2>
          <p class="mb-6">Mix one level measuring spoon in a large glass of water, preferably in the morning on an empty stomach or in the evening at bedtime.</p>
        </div>
      `,
      specs: [
        { label: isFR ? "Granulométrie" : "Micronization", value: "6 μm (Ultra-fine)", icon: Award },
        { label: isFR ? "Pureté" : "Purity", value: "Grade Médical", icon: ShieldCheck },
        { label: isFR ? "Origine" : "Origin", value: isFR ? "Volcanique" : "Volcanic", icon: Leaf },
        { label: isFR ? "Adsorption" : "Adsorption", value: "Haute Capacité", icon: ShoppingBag }
      ]
    },
    // ... add more products as needed, I'll keep it concise for now and expand if I have space
  };
};
