import { Language } from '../translations';
import { Thermometer, Timer, RefreshCw, FlaskConical, Leaf, ShieldCheck, Info, Award, ShoppingBag, ChefHat } from 'lucide-react';
import bloomLabImg from '../assets/images/bloomlab_main_1784887530345.jpeg';
import duoArgilesImg from '../assets/images/product_duo_argiles.jpg';
import trioPouchesImg from '../assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from '../assets/images/product_feu_articulaire.jpg';
import nuitProfondeImg from '../assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from '../assets/images/product_seve_fondamentale.jpg';
import digestionImg from '../assets/images/product_digestion.jpeg';
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
          ? "L'extracteur botanique de précision n°1 en France. Capable d'extraire le Totum intégral des plantes avec une précision thermique absolue (±0,5°C)."
          : isDE 
          ? "Der botanische Präzisionsextraktor Nr. 1 in Frankreich. In der Lage, das integrale Totum von Pflanzen mit absoluter thermischer Präzision (±0,5°C) zu extrahieren."
          : "The #1 precision botanical extractor. Capable of extracting the integral Totum of plants with absolute thermal precision (±0.5°C).",
        fullDescription: isFR ? `
          <div class="prose prose-botanik max-w-none">
            <p class="text-lg mb-8">La BloomLab est la première machine 6-en-1 grand public capable de réaliser à domicile des extractions botaniques complexes — huiles infusées, sérums, teintures, macérats — avec un contrôle de paramètres (temps, température, séquençage) habituellement réservé aux laboratoires professionnels.</p>
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Température PID</h4>
                <p class="text-sm">Maintien à ±0,5°C pour protéger les actifs fragiles.</p>
              </div>
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Agitation Totum</h4>
                <p class="text-sm">Extraction mécanique douce pour libérer les molécules.</p>
              </div>
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Inox 304</h4>
                <p class="text-sm">Matériaux grade alimentaire sans BPA ni phtalates.</p>
              </div>
            </div>
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
      name: isFR ? "Pack Signature — BloomLab + Kit Démarrage" : isDE ? "Signatur-Paket — BloomLab + Starter-Set" : "Signature Pack — BloomLab + Starter Kit",
      subtitle: isFR ? "IDÉAL POUR DÉBUTER" : isDE ? "IDEAL FÜR EINSTEIGER" : "IDEAL FOR BEGINNERS",
      price: 319,
      originalPrice: 349,
      images: [bloomLabImg, seveFondamentaleImg],
      description: isFR 
        ? "Tout ce dont vous avez besoin pour démarrer : la BloomLab et votre premier kit d'extraction."
        : isDE
        ? "Alles, was Sie für den Start benötigen: BloomLab und Ihr erstes Extraktionsset."
        : "Everything you need to start: the BloomLab and your first extraction kit.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Le choix privilégié pour ceux qui souhaitent une autonomie immédiate." : isDE ? "Die bevorzugte Wahl für diejenigen, die sofortige Autonomie wünschen." : "The preferred choice for those who want immediate autonomy."}</p>
          <p>${isFR ? "Ce pack inclut l'extracteur BloomLab® ainsi que le Kit Sève Fondamentale pour réaliser vos premières huiles et teintures dès réception." : isDE ? "Dieses Paket enthält den BloomLab® Extraktor sowie das Set Fundamentaler Saft, damit Sie nach Erhalt sofort Ihre ersten Öle und Tinkturen herstellen können." : "This pack includes the BloomLab® extractor as well as the Fundamental Sap Kit to make your first oils and tinctures upon receipt."}</p>
        </div>
      `,
      specs: [
        { label: isFR ? "Économie" : isDE ? "Ersparnis" : "Savings", value: "30€", icon: Award }
      ]
    },
    'kit-starter': {
      name: isFR ? "Kit Sève Fondamentale" : isDE ? "Set Fundamentaler Saft" : "Fundamental Sap Kit",
      subtitle: isFR ? "VITALITÉ & STRUCTURE" : isDE ? "VITALITÄT & STRUKTUR" : "VITALITY & STRUCTURE",
      price: 12.90,
      images: [seveFondamentaleImg],
      description: isFR 
        ? "Le mélange signature pour restaurer la vitalité profonde. Synergie adaptogène pour soutenir les surrénales."
        : isDE
        ? "Unsere Signatur-Mischung zur Wiederherstellung tiefer Vitalität. Adaptogene Synergie."
        : "Our signature blend to restore deep vitality. Adaptogenic synergy to support adrenals.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Un mélange puissant de plantes reminéralisantes et adaptogènes conçu pour nourrir le terrain en profondeur." : isDE ? "Eine kraftvolle Mischung aus remineralisierenden und adaptogenen Pflanzen, die darauf ausgelegt ist, das Gelände in der Tiefe zu nähren." : "A powerful blend of remineralizing and adaptogenic plants designed to deeply nourish the terrain."}</p>
          <h4 class="font-bold mb-2">${isFR ? "Bénéfices clés :" : isDE ? "Hauptvorteile:" : "Key Benefits:"}</h4>
          <ul class="list-disc pl-5 mb-6">
            <li>${isFR ? "Soutien des glandes surrénales (fatigue chronique)" : isDE ? "Unterstützung der Nebennieren (chronische Müdigkeit)" : "Adrenal gland support (chronic fatigue)"}</li>
            <li>${isFR ? "Reminéralisation osseuse et tissulaire" : isDE ? "Remineralisierung von Knochen und Gewebe" : "Bone and tissue remineralization"}</li>
            <li>${isFR ? "Régulation du métabolisme de base" : isDE ? "Regulierung des Grundstoffwechsels" : "Basal metabolism regulation"}</li>
          </ul>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-nuit': {
      name: isFR ? "Remède Nuit Profonde" : isDE ? "Heilmittel Tiefe Nacht" : "Deep Night Remedy",
      subtitle: isFR ? "SOMMEIL & ANCRAGE" : isDE ? "SCHLAF & ERDUNG" : "SLEEP & GROUNDING",
      price: 9.90,
      images: [nuitProfondeImg],
      description: isFR 
        ? "Un protocole d'apaisement pour un sommeil réparateur. Calme le système nerveux et favorise l'ancrage."
        : isDE
        ? "Ein beruhigendes Protokoll für erholsamen Schlaf. Beruhigt das Nervensystem."
        : "A soothing protocol for restorative sleep. Calms the nervous system and promotes grounding.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Conçu pour ceux qui peinent à débrancher le mental, ce mélange favorise une descente douce vers le sommeil." : isDE ? "Diese Mischung wurde für diejenigen entwickelt, denen es schwerfällt, den Geist abzuschalten, und fördert ein sanftes Einschlafen." : "Designed for those who struggle to switch off the mind, this blend promotes a gentle descent into sleep."}</p>
          <h4 class="font-bold mb-2">${isFR ? "Bénéfices clés :" : isDE ? "Hauptvorteile:" : "Key Benefits:"}</h4>
          <ul class="list-disc pl-5 mb-6">
            <li>${isFR ? "Réduction de l'anxiété nocturne" : isDE ? "Reduzierung nächtlicher Angstzustände" : "Reduction of nocturnal anxiety"}</li>
            <li>${isFR ? "Endormissement facilité sans accoutumance" : isDE ? "Erleichtertes Einschlafen ohne Gewöhnungseffekt" : "Easier falling asleep without habituation"}</li>
            <li>${isFR ? "Sommeil plus profond et moins fragmenté" : isDE ? "Tieferer und weniger fragmentierter Schlaf" : "Deeper and less fragmented sleep"}</li>
          </ul>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-digestion': {
      name: isFR ? "Remède Confort Digestif" : isDE ? "Heilmittel Verdauungskomfort" : "Digestive Comfort Remedy",
      subtitle: isFR ? "ÉQUILIBRE INTESTINAL" : isDE ? "DARMGLEICHGEWICHT" : "INTESTINAL BALANCE",
      price: 9.90,
      images: [digestionImg],
      description: isFR 
        ? "Équilibre le microbiote et apaise les inflammations. Pour une digestion fluide et un ventre apaisé."
        : isDE
        ? "Gleicht die Mikrobiota aus und lindert Entzündungen. Für eine flüssige Verdauung."
        : "Balances the microbiota and soothes inflammation. For fluid digestion and a soothed stomach.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Une synergie de plantes carminatives et anti-inflammatoires pour restaurer le feu digestif sans l'irriter." : isDE ? "Eine Synergie aus karminativen und entzündungshemmenden Pflanzen, um das Verdauungsfeuer wiederherzustellen, ohne es zu reizen." : "A synergy of carminative and anti-inflammatory plants to restore digestive fire without irritating it."}</p>
          <h4 class="font-bold mb-2">${isFR ? "Bénéfices clés :" : isDE ? "Hauptvorteile:" : "Key Benefits:"}</h4>
          <ul class="list-disc pl-5 mb-6">
            <li>${isFR ? "Réduction des ballonnements et gaz" : isDE ? "Reduzierung von Blähungen und Gasen" : "Reduction of bloating and gas"}</li>
            <li>${isFR ? "Apaisement de la muqueuse intestinale" : isDE ? "Beruhigung der Darmschleimhaut" : "Soothes the intestinal mucosa"}</li>
            <li>${isFR ? "Soutien enzymatique naturel" : isDE ? "Natürliche enzymatische Unterstützung" : "Natural enzymatic support"}</li>
          </ul>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-articulaire': {
      name: isFR ? "Remède Feu Articulaire" : isDE ? "Heilmittel Gelenkfeuer" : "Joint Fire Remedy",
      subtitle: isFR ? "SOUPLESSE & MOBILITÉ" : isDE ? "FLEXIBILITÄT & MOBILITÄT" : "FLEXIBILITY & MOBILITY",
      price: 9.90,
      images: [feuArticulaireImg],
      description: isFR 
        ? "Synergie anti-inflammatoire pour retrouver souplesse. Idéal pour les raideurs chroniques."
        : isDE
        ? "Entzündungshemmende Synergie für mehr Flexibilität. Ideal bei chronischer Steifheit."
        : "Anti-inflammatory synergy to regain flexibility. Ideal for chronic stiffness.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Puissant mélange de plantes ciblant les terrains inflammatoires liés aux articulations et aux muscles." : isDE ? "Kraftvolle Pflanzenmischung, die auf entzündliche Bereiche im Zusammenhang mit Gelenken und Muskeln abzielt." : "Powerful blend of plants targeting inflammatory terrains related to joints and muscles."}</p>
          <h4 class="font-bold mb-2">${isFR ? "Bénéfices clés :" : isDE ? "Hauptvorteile:" : "Key Benefits:"}</h4>
          <ul class="list-disc pl-5 mb-6">
            <li>${isFR ? "Réduction des sensibilités articulaires" : isDE ? "Reduzierung der Gelenkempfindlichkeit" : "Reduction of joint sensitivity"}</li>
            <li>${isFR ? "Action drainante sur les toxines métaboliques" : isDE ? "Entwässernde Wirkung auf Stoffwechselgifte" : "Draining action on metabolic toxins"}</li>
            <li>${isFR ? "Amélioration de la souplesse matinale" : isDE ? "Verbesserung der morgendlichen Flexibilität" : "Improvement of morning flexibility"}</li>
          </ul>
        </div>
      `,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-reset': {
      name: isFR ? "Duo RESET Renaissance" : isDE ? "RESET Renaissance Duo" : "RESET Renaissance Duo",
      subtitle: isFR ? "DÉTOX & HOMÉOSTASIE" : isDE ? "DETOX & HOMÖOSTASE" : "DETOX & HOMEOSTASIS",
      price: 44.90,
      originalPrice: 49.00,
      images: [duoArgilesImg],
      description: isFR 
        ? "L'alliance de la Zéolithe Clinoptilolite et de plantes drainantes. Le pilier de votre transformation."
        : isDE
        ? "Die Allianz aus Clinoptilolith-Zeolith und entwässernden Pflanzen. Die Säule Ihrer Transformation."
        : "The alliance of Clinoptilolite Zeolite and draining plants. The pillar of your transformation.",
      fullDescription: `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-6">${isFR ? "Ce duo est le point de départ indispensable de tout protocole Bloom. Il permet de nettoyer le terrain avant de le nourrir." : isDE ? "Dieses Duo ist der unverzichtbare Ausgangspunkt für jedes Bloom-Protokoll. Es ermöglicht die Reinigung des Geländes, bevor es genährt wird." : "This duo is the essential starting point for any Bloom protocol. It allows for cleaning the terrain before nourishing it."}</p>
          <h4 class="font-bold mb-2">${isFR ? "Composition :" : isDE ? "Zusammensetzung:" : "Composition:"}</h4>
          <ul class="list-disc pl-5 mb-6">
            <li>${isFR ? "Zéolithe Clinoptilolite micronisée (Grade Pharma)" : isDE ? "Mikronisierter Clinoptilolith-Zeolith (Pharmazeutische Qualität)" : "Micronized Clinoptilolite Zeolite (Pharma Grade)"}</li>
            <li>${isFR ? "Mélange de plantes drainantes (Aubier de Tilleul, Chicorée, etc.)" : isDE ? "Mischung aus entwässernden Pflanzen (Linden-Splintholz, Zichorie usw.)" : "Blend of draining plants (Linden sapwood, Chicory, etc.)"}</li>
          </ul>
        </div>
      `,
      specs: [{ label: "Grade", value: "Pharma", icon: ShieldCheck }]
    },
    'freemium-access': {
      name: "Accès Découverte",
      subtitle: "OFFERT",
      price: 0,
      images: [img7],
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
      name: "Abonnement Premium",
      subtitle: "ACCÈS TOTAL",
      price: 9,
      images: [img5],
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
