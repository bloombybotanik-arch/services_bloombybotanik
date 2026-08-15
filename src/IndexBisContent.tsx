import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Check, 
  Plus,
  FlaskConical, 
  Activity, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Thermometer,
  Zap,
  Droplets,
  Microscope,
  Sparkles,
  AlertTriangle,
  Utensils,
  Truck,
  CreditCard,
  X,
  ShoppingCart
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import labImg from './assets/images/lab_detail_cleaned_1786616788618.jpg';
import herbsImg from './assets/images/herbs_close_up_cleaned_1786616800877.jpg';
import lifestyleImg from './assets/images/home_lab_vibe_cleaned_1786616854146.jpg';
import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
import bloomSoinsImg from './assets/images/Bloom_Soins.jpg';
import cosmetiqueImg from './assets/images/bloom_logo_final_1784886077159.png';

interface IndexBisContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
}

type HeroType = 'culinaire' | 'cosmetique' | 'sante';
type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

const translationsIndexBis = {
  fr: {
    marquee: ["🇫🇷 Marque Française Botanique", "🚚 Expédition Prioritaire sous 24/48h", "🛡️ Satisfait ou Remboursé 30 Jours", "⚡ Garantie Constructeur 2 Ans"],
    hero: {
      badge: "N°1 France — Édition Limitée 2026 : Thermorégulation MTC 2.0",
      title: "L'extracteur botanique qui révèle le <span class='text-[#D97706]'>totum</span> de vos plantes.",
      subtitle: "<strong>BloomLab® : L'infuseur botanique de précision.</strong> Un seul appareil pour l'extraction du totum à basse température : huiles culinaires, soins cosmétiques et remèdes de plantes.",
      rating: "Basé sur +2 500 utilisateurs passionnés",
      buyBtn: "Acheter la BloomLab® — <span class='line-through opacity-60 mr-2'>289€</span> 239€",
      installment: "Paiement en 3x sans frais par Klarna",
      installmentSub: "Soit 79,66€ / mois",
      guarantee: "Testez 30 jours sans risque",
      shipping: "Expédié sous 24/48h",
      features: [
        { title: "Inox 304 Pur", sub: "Grade Laboratoire", icon: Microscope },
        { title: "Précision ±0.5°C", sub: "Zéro Surchauffe", icon: Thermometer },
        { title: "3 Solvants", sub: "Eau, Huile, Alcool", icon: Droplets }
      ]
    },
    selector: {
      label: "Mode d'extraction rapide :",
      modes: {
        culinaire: { label: "Culinaire", desc: "🌿 <strong>Mode Culinaire :</strong> Extraction douce d'huiles aromatiques & beurres botaniques sans amertume à 38°C." },
        cosmetique: { label: "Cosmétique", desc: "🌸 <strong>Mode Cosmétique :</strong> Formulation de sérums visage purs et baumes régénérants à 42°C." },
        sante: { label: "Phytothérapie", desc: "🧪 <strong>Mode Phytothérapie :</strong> Teintures-mères et extraits concentrés de résines/racines à 45°C." }
      }
    },
    universes: {
      title: "Une seule machine. Trois univers de soin souverain au quotidien.",
      subtitle: "Explorez les recettes et protocoles réalisables en un clic avec la BloomLab®.",
      tabs: { culinaire: "Culinaire", cosmetique: "Cosmétique", phytotherapie: "Phytothérapie" },
      data: {
        culinaire: {
          title: "Atelier Culinaire & Gastronomie Botanique",
          badge: "Savoir-Faire Gourmand & Santé",
          image: bloomSoinsImg,
          description: "Transformez vos aromates et plantes fraîches en beurres parfumés, huiles d'olive infusées et élixirs gastronomiques sans jamais développer d'amertume.",
          exampleTitle: "Huile d'Olive Infusée au Romarin, Piment & Ail",
          temp: "38°C", time: "1h 30m", solvent: "Huile d'Olive",
          benefits: ["Zéro amertume par thermorégulation douce", "Conservation prolongée des arômes", "Sublime vos plats sains du quotidien"]
        },
        cosmetique: {
          title: "Formulation Cosmétique de Grade Laboratoire",
          badge: "Haute Performance Cutanée",
          image: bloomSoinsImg,
          description: "Concevez vous-même vos propres sérums visage, macérats précieux et baumes régénérants sur-mesure sans aucun conservateur synthétique.",
          exampleTitle: "Sérum Précieux Passiflore, Rose & Jojoba",
          temp: "42°C", time: "2h 00m", solvent: "Huile de Jojoba",
          benefits: ["Pénétration cutanée profonde des actifs", "Sans allergènes synthétiques ni parabènes", "Texture veloutée non grasse"]
        },
        phytotherapie: {
          title: "Remèdes Phytothérapeutiques & MTC 2.0",
          badge: "Rééquilibrage du Terrain",
          image: lifestyleImg,
          description: "Créez vos teintures-mères, décoctions d'écorces et extraits concentrés de résines pour traiter le terrain biologique global.",
          exampleTitle: "Extrait Concentré de Boswellia & Girofle",
          temp: "45°C", time: "3h 00m", solvent: "Alcool 60°",
          benefits: ["Capture intégrale du Totum moléculaire", "Assimilation cellulaire instantanée", "Protocoles testés 100% sécurisés"]
        }
      }
    },
    steps: {
      title: "3 Étapes. Du végétal brut à votre soin pur.",
      subtitle: "Aucune compétence technique nécessaire. Un bouton suffit.",
      list: [
        { step: "01", title: "Remplissez", desc: "Plantes sèches ou fraîches + votre solvant (Eau, Huile, Alcool) dans la cuve." },
        { step: "02", title: "Programmez", desc: "Choisissez votre mode d'extraction. La BloomLab® gère le reste en silence." },
        { step: "03", title: "Récupérez", desc: "En moins de 4h, votre extrait pur est prêt à l'emploi. Zéro filtration nécessaire." }
      ]
    },
    faq: {
      title: "Tout ce que vous devez savoir avant de commander",
      items: [
        { q: "En quoi la BloomLab® est-elle différente d'un simple bain-marie ?", a: "Le bain-marie traditionnel ne permet aucun contrôle précis : l'eau atteint rapidement 60°C à 100°C, détruisant les molécules thermosensibles (terpènes, flavonoïdes). La BloomLab® possède un capteur thermique au degré près qui régule la chauffe pour préserver 100% du Totum sans risque de brûler vos préparations." },
        { q: "Faut-il être herboriste ou chimiste pour l'utiliser ?", a: "Absolument pas ! La BloomLab® est livrée avec un guide pratique simple et des programmes préenregistrés. Vous ajoutez vos ingrédients (eau, huile ou alcool), vous choisissez le profil (Culinaire, Cosmétique ou Remède) et la machine gère tout." },
        { q: "Quels solvants puis-je utiliser en toute sécurité ?", a: "La cuve Inox 304 de grade laboratoire est conçue pour fonctionner avec l'eau purifiée, toutes les huiles végétales (Jojoba, Olive, Argan) et les alcools alimentaires titrés de 45° à 60°. Sa conception hermétique empêche toute évaporation volatile." }
      ]
    }
  },
  en: {
    marquee: ["🇫🇷 French Botanical Brand", "🚚 Priority Shipping in 24/48h", "🛡️ 30-Day Money Back Guarantee", "⚡ 2-Year Manufacturer Warranty"],
    hero: {
      badge: "2026 Limited Edition: MTC 2.0 Thermoregulation",
      title: "The Botanical Extractor that releases the <span class='text-[#D97706] underline underline-offset-8 decoration-[#D97706]/30'>pure Totum</span> of your plants.",
      subtitle: "<strong>Say goodbye to the chore of approximate bain-marie.</strong> A single precision device to easily prepare your Culinary oils, Cosmetic Skincare, and Health Remedies at home.",
      rating: "Based on +2,500 passionate users",
      buyBtn: "Buy the BloomLab® — €239",
      installment: "3x interest-free payment by Klarna",
      installmentSub: "Or €79.66 / month",
      guarantee: "Test risk-free for 30 days",
      shipping: "Shipped within 24/48h",
      features: [
        { title: "Pure 304 Inox", sub: "Laboratory Grade", icon: Microscope },
        { title: "Precision ±0.5°C", sub: "Zero Overheating", icon: Thermometer },
        { title: "3 Solvents", sub: "Water, Oil, Alcohol", icon: Droplets }
      ]
    },
    selector: {
      label: "Fast extraction mode:",
      modes: {
        culinaire: { label: "Culinary", desc: "🌿 <strong>Culinary Mode:</strong> Gentle extraction of aromatic oils & botanical butters without bitterness at 38°C." },
        cosmetique: { label: "Cosmetic", desc: "🌸 <strong>Cosmetic Mode:</strong> Formulation of pure face serums and regenerating balms at 42°C." },
        sante: { label: "Phytotherapy", desc: "🧪 <strong>Phytotherapy Mode:</strong> Mother tinctures and concentrated resin/root extracts at 45°C." }
      }
    },
    universes: {
      title: "One single machine. Three universes of sovereign care every day.",
      subtitle: "Explore recipes and protocols achievable in one click with BloomLab®.",
      tabs: { culinaire: "Culinary", cosmetique: "Cosmetic", phytotherapie: "Phytotherapy" },
      data: {
        culinaire: {
          title: "Culinary Atelier & Botanical Gastronomy",
          badge: "Gourmet & Health Know-How",
          image: bloomSoinsImg,
          description: "Transform your herbs and fresh plants into scented butters, infused olive oils, and gastronomic elixirs without ever developing bitterness.",
          exampleTitle: "Olive Oil Infused with Rosemary, Chili & Garlic",
          temp: "38°C", time: "1h 30m", solvent: "Olive Oil",
          benefits: ["Zero bitterness with gentle thermoregulation", "Prolonged aroma preservation", "Elevates your healthy daily dishes"]
        },
        cosmetique: {
          title: "Laboratory Grade Cosmetic Formulation",
          badge: "High Skin Performance",
          image: bloomSoinsImg,
          description: "Design your own face serums, precious macerates, and tailor-made regenerating balms without any synthetic preservatives.",
          exampleTitle: "Precious Passionflower, Rose & Jojoba Serum",
          temp: "42°C", time: "2h 00m", solvent: "Jojoba Oil",
          benefits: ["Deep skin penetration of actives", "Without synthetic allergens or parabens", "Non-greasy velvety texture"]
        },
        phytotherapie: {
          title: "Phytotherapeutic Remedies & MTC 2.0",
          badge: "Terrain Rebalancing",
          image: lifestyleImg,
          description: "Create your mother tinctures, bark decoctions, and concentrated resin extracts to treat the global biological terrain.",
          exampleTitle: "Concentrated Boswellia & Clove Extract",
          temp: "45°C", time: "3h 00m", solvent: "60° Alcohol",
          benefits: ["Integral capture of the molecular Totum", "Instant cellular assimilation", "100% secure tested protocols"]
        }
      }
    },
    steps: {
      title: "3 Steps. From raw plant to your pure care.",
      subtitle: "No technical skills required. One button is enough.",
      list: [
        { step: "01", title: "Fill", desc: "Dry or fresh plants + your solvent (Water, Oil, Alcohol) in the tank." },
        { step: "02", title: "Program", desc: "Choose your extraction mode. BloomLab® handles the rest in silence." },
        { step: "03", title: "Collect", desc: "In less than 4h, your pure extract is ready for use. Zero filtration necessary." }
      ]
    },
    faq: {
      title: "Everything you need to know before ordering",
      items: [
        { q: "How is BloomLab® different from a simple bain-marie?", a: "Traditional bain-marie allows no precise control: water quickly reaches 60°C to 100°C, destroying heat-sensitive molecules (terpenes, flavonoids). BloomLab® has a precision thermal sensor that regulates heating to preserve 100% of the Totum without risk of burning your preparations." },
        { q: "Do you need to be an herbalist or chemist to use it?", a: "Absolutely not! BloomLab® comes with a simple practical guide and pre-recorded programs. You add your ingredients (water, oil, or alcohol), choose the profile (Culinary, Cosmetic, or Remedy) and the machine handles everything." },
        { q: "Which solvents can I use safely?", a: "The laboratory-grade 304 Stainless Steel tank is designed to work with purified water, all vegetable oils (Jojoba, Olive, Argan) and food-grade alcohols from 45° to 60°. Its airtight design prevents volatile evaporation." }
      ]
    }
  },
  de: {
    marquee: ["🇫🇷 Französische botanische Marke", "🚚 Prioritärer Versand in 24/48h", "🛡️ 30-Tage-Geld-zurück-Garantie", "⚡ 2 Jahre Herstellergarantie"],
    hero: {
      badge: "Limitierte Auflage 2026: TCM 2.0 Thermoregulation",
      title: "Der botanische Extraktor, der das <span class='text-[#D97706] underline underline-offset-8 decoration-[#D97706]/30'>reine Totum</span> Ihrer Pflanzen freisetzt.",
      subtitle: "<strong>Verabschieden Sie sich von der mühsamen Arbeit des ungefähren Wasserbads.</strong> Ein einziges Präzisionsgerät, um Ihre kulinarischen Öle, kosmetischen Hautpflegeprodukte und Heilmittel ganz einfach zu Hause zuzubereiten.",
      rating: "Basierend auf über 2.500 leidenschaftlichen Nutzern",
      buyBtn: "BloomLab® kaufen — 239 €",
      installment: "Zahlung in 3 zinsfreien Raten von Klarna",
      installmentSub: "Oder 79,66 € / Monat",
      guarantee: "30 Tage risikofrei testen",
      shipping: "Versand innerhalb von 24/48h",
      features: [
        { title: "Reiner 304 Edelstahl", sub: "Laborqualität", icon: Microscope },
        { title: "Präzision ±0,5°C", sub: "Keine Überhitzung", icon: Thermometer },
        { title: "3 Lösungsmittel", sub: "Wasser, Öl, Alkohol", icon: Droplets }
      ]
    },
    selector: {
      label: "Schnellextraktionsmodus:",
      modes: {
        culinaire: { label: "Kulinarisch", desc: "🌿 <strong>Kulinarischer Modus:</strong> Sanfte Extraktion von Aromaölen und botanischen Buttern ohne Bitterkeit bei 38°C." },
        cosmetique: { label: "Kosmetisch", desc: "🌸 <strong>Kosmetischer Modus:</strong> Formulierung von reinen Gesichtsseren und regenerierenden Balsamen bei 42°C." },
        sante: { label: "Phytotherapie", desc: "🧪 <strong>Phytotherapie-Modus:</strong> Urtinkturen und konzentrierte Harz-/Wurzelextrakte bei 45°C." }
      }
    },
    universes: {
      title: "Eine einzige Maschine. Drei Universen souveräner Pflege jeden Tag.",
      subtitle: "Entdecken Sie Rezepte und Protokolle, die mit einem Klick mit BloomLab® erreichbar sind.",
      tabs: { culinaire: "Kulinarisch", cosmetique: "Kosmetisch", phytotherapie: "Phytotherapie" },
      data: {
        culinaire: {
          title: "Kulinarisches Atelier & Botanische Gastronomie",
          badge: "Gourmet- & Gesundheits-Know-how",
          image: herbsImg,
          description: "Verwandeln Sie Ihre Kräuter und frischen Pflanzen in duftende Butter, infundierte Olivenöle und gastronomische Elixiere, ohne jemals Bitterkeit zu entwickeln.",
          exampleTitle: "Olivenöl infundiert mit Rosmarin, Chili & Knoblauch",
          temp: "38°C", time: "1h 30m", solvent: "Olivenöl",
          benefits: ["Null Bitterkeit durch sanfte Thermoregulation", "Länger anhaltende Aromabewahrung", "Veredelt Ihre gesunden täglichen Gerichte"]
        },
        cosmetique: {
          title: "Kosmetische Formulierung in Laborqualität",
          badge: "Hohe Hautleistung",
          image: labImg,
          description: "Entwerfen Sie Ihre eigenen Gesichtsseren, kostbaren Mazerate and maßgeschneiderten regenerierenden Balsame ohne synthetische Konservierungsstoffe.",
          exampleTitle: "Kostbares Passionsblumen-, Rosen- & Jojoba-Serum",
          temp: "42°C", time: "2h 00m", solvent: "Jojobaöl",
          benefits: ["Tiefe Hautpenetration der Wirkstoffe", "Ohne synthetische Allergene oder Parabene", "Samtige, nicht fettende Textur"]
        },
        phytotherapie: {
          title: "Phytotherapeutische Heilmittel & TCM 2.0",
          badge: "Terrain-Rebalancing",
          image: lifestyleImg,
          description: "Erstellen Sie Ihre Urtinkturen, Rindendekokte und konzentrierten Harzextrakte zur Behandlung des globalen biologischen Terrains.",
          exampleTitle: "Konzentrierter Boswellia- & Nelkenextrakt",
          temp: "45°C", time: "3h 00m", solvent: "60° Alkohol",
          benefits: ["Integrale Erfassung des molekularen Totums", "Sofortige zelluläre Assimilation", "100% sicher getestete Protokolle"]
        }
      }
    },
    steps: {
      title: "3 Schritte. Von der Rohpflanze zu Ihrer reinen Pflege.",
      subtitle: "Keine technischen Kenntnisse erforderlich. Ein Knopf genügt.",
      list: [
        { step: "01", title: "Füllen", desc: "Trockene oder frische Pflanzen + Ihr Lösungsmittel (Wasser, Öl, Alkohol) in den Tank." },
        { step: "02", title: "Programmieren", desc: "Wählen Sie Ihren Extraktionsmodus. BloomLab® erledigt den Rest in Stille." },
        { step: "03", title: "Sammeln", desc: "In weniger als 4 Stunden ist Ihr reiner Extrakt gebrauchsfertig. Keine Filtration erforderlich." }
      ]
    },
    faq: {
      title: "Alles, was Sie vor der Bestellung wissen müssen",
      items: [
        { q: "Wie unterscheidet sich BloomLab® von einem einfachen Wasserbad?", a: "Das traditionelle Wasserbad ermöglicht keine präzise Kontrolle: Das Wasser erreicht schnell 60°C bis 100°C und zerstört hitzeempfindliche Moleküle (Terpene, Flavonoide). BloomLab® verfügt über einen Präzisions-Thermosensor, der die Erwärmung reguliert, um 100% des Totums ohne die Gefahr des Anbrennens Ihrer Zubereitungen zu bewahren." },
        { q: "Muss man Kräuterkundler oder Chemiker sein, um es zu benutzen?", a: "Absolut nicht! BloomLab® wird mit einer einfachen praktischen Anleitung und voraufgezeichneten Programmen geliefert. Sie fügen Ihre Zutaten hinzu (Wasser, Öl oder Alkohol), wählen das Profil (Kulinarisch, Kosmetisch oder Heilmittel) und die Maschine erledigt alles." },
        { q: "Welche Lösungsmittel kann ich sicher verwenden?", a: "Der laborgeprüfte 304 Edelstahlbehälter ist für die Verwendung mit gereinigtem Wasser, allen Pflanzenölen (Jojoba, Olive, Argan) und lebensmittelechten Alkoholen von 45° à 60° ausgelegt. Sein luftdichtes Design verhindert die flüchtige Verdunstung." }
      ]
    }
  }
};

export default function IndexBisContent({ onNavigate, lang = 'fr' }: IndexBisContentProps) {
  const [activeHeroType, setActiveHeroType] = useState<HeroType>('culinaire');
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('culinaire');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState({ title: "Pack Signature Rentrée — BloomLab® + Duo Argiles", price: 289 });

  const currentT = translationsIndexBis[lang as keyof typeof translationsIndexBis] || translationsIndexBis.fr;

  const marqueeItems = currentT.marquee;

  const selectPackage = (type: 'solo' | 'master', price: number) => {
    setCartItem({
      title: type === 'solo' ? (lang === 'fr' ? "Coffret BloomLab® Solo — Rentrée 2026" : "BloomLab® Solo Set") : (lang === 'fr' ? "Pack Signature Rentrée — BloomLab® + Duo Argiles" : "Signature Back-to-School Pack"),
      price: price
    });
    setIsCartOpen(true);
  };

  const chartData = {
    labels: ['10 min', '30 min', '60 min', '120 min', '180 min'],
    datasets: [
      {
        label: lang === 'fr' ? 'BloomLab® (Thermorégulation 40°C)' : 'BloomLab® (Thermoregulation 40°C)',
        data: [45, 78, 92, 98, 99],
        borderColor: '#1C3F34',
        backgroundColor: 'rgba(28, 63, 52, 0.08)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: lang === 'fr' ? 'Bain-Marie Classique (~65°C)' : 'Classic Bain-Marie (~65°C)',
        data: [30, 45, 52, 40, 32],
        borderColor: '#DC2626',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#0F261E',
          font: { size: 12, weight: 'bold' as const }
        }
      }
    },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#52635B' } },
      y: { min: 0, max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#52635B', callback: (val: any) => val + '%' } }
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-slate-800 font-sans antialiased selection:bg-[#1C3F34] selection:text-white pb-20">
      
      {/* TOP ANNOUNCEMENT BAR (MARQUEE) */}
      <div className="bg-[#0F261E] text-[#FAF7F2] py-4 overflow-hidden border-b border-white/10 shadow-sm relative z-50">
        <motion.div 
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12 px-12 shrink-0">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">
                {item}
              </span>
              <span className="opacity-20 text-xl font-light select-none shrink-0">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-[#1C3F34] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]"></span>
                    </span>
                    {currentT.hero.badge}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F261E] leading-[1.1]" dangerouslySetInnerHTML={{ __html: currentT.hero.title }} />

                <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: currentT.hero.subtitle }} />

                <div className="flex items-center space-x-3 pt-1">
                  <div className="flex text-[#D97706] space-x-1 text-sm">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm font-bold text-[#0F261E]">4,9/5</span>
                  <span className="text-xs text-slate-500">— {currentT.hero.rating}</span>
                </div>
              </div>

              <div className="space-y-8 mt-12">
                <div className="grid grid-cols-3 gap-4 pb-8 border-b border-[#F3EEE6]">
                  {currentT.hero.features.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#F3EEE6] text-center shadow-sm">
                      <f.icon className="w-6 h-6 text-[#1C3F34] mx-auto mb-1" />
                      <div className="text-xs font-bold text-[#0F261E]">{f.title}</div>
                      <div className="text-[11px] text-slate-500">{f.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a href="#commande" className="inline-flex items-center justify-center space-x-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-lg px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                      <FlaskConical className="w-5 h-5" />
                      <span dangerouslySetInnerHTML={{ __html: currentT.hero.buyBtn }} />
                    </a>
                    <div className="text-xs text-slate-600 bg-[#F3EEE6] p-3 rounded-2xl border border-[#E7DFD3] flex flex-col justify-center">
                      <span className="font-bold text-[#0F261E] flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-[#D97706]" /> {currentT.hero.installment}</span>
                      <span>{currentT.hero.installmentSub}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pt-2">
                    <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-[#1C3F34] mr-1.5" /> {currentT.hero.guarantee}</span>
                    <span className="flex items-center"><Truck className="w-4 h-4 text-[#1C3F34] mr-1.5" /> {currentT.hero.shipping}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white border border-[#F3EEE6] p-6 shadow-xl flex flex-col h-full glow-subtle">
                <div className="absolute -top-3 -right-3 bg-[#D97706] text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md z-10">
                  {lang === 'fr' ? 'ÉCONOMISEZ 50€' : 'SAVE €50'}
                </div>

                <div className="flex-1 flex flex-col min-h-[400px]">
                  <div className="relative rounded-2xl overflow-hidden border border-[#F3EEE6] bg-[#F3EEE6] flex-1 group mb-6">
                    <img src={bloomImg} alt="BloomLab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F261E]/80 via-transparent to-transparent flex flex-col justify-between p-6">
                      <div className="flex justify-between items-start">
                        <span className="bg-white/90 backdrop-blur-sm text-[#0F261E] text-xs font-bold px-3 py-1 rounded-full border border-[#F3EEE6] font-sans">L'ingénierie du Vivant</span>
                        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full font-sans">{lang === 'fr' ? 'En Stock' : 'In Stock'}</span>
                      </div>
                      <div className="text-white mt-auto">
                        <p className="text-xs font-semibold text-[#E8F1EE] uppercase tracking-wider">{lang === 'fr' ? 'Thermorégulation Intelligente' : 'Intelligent Thermoregulation'}</p>
                        <h3 className="text-xl font-black">{lang === 'fr' ? 'Totum Botanique Conservé à 100%' : '100% Preserved Botanical Totum'}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-[#0F261E] uppercase tracking-wider block">{currentT.selector.label}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(currentT.selector.modes) as HeroType[]).map((mode) => (
                        <button 
                          key={mode}
                          onClick={() => setActiveHeroType(mode)} 
                          className={`px-2 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-sans transition-all text-center flex items-center justify-center whitespace-nowrap overflow-hidden ${activeHeroType === mode ? 'bg-[#1C3F34] text-white shadow-sm' : 'bg-[#F3EEE6] text-slate-700 hover:bg-[#E7DFD3]'}`}
                        >
                          <span className="truncate">{currentT.selector.modes[mode].label}</span>
                        </button>
                      ))}
                    </div>
                    <motion.div 
                      key={activeHeroType}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] sm:text-xs text-slate-700 bg-[#FAF7F2] p-3 rounded-xl border border-[#F3EEE6] min-h-[50px]"
                      dangerouslySetInnerHTML={{ __html: currentT.selector.modes[activeHeroType].desc }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PROBLÈME VS SOLUTION */}
      <section className="py-12 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
              {lang === 'fr' ? "Le Dilemme de l'Herboristerie Maison" : "Home Herbalism Dilemma"}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E]">
              Pour celles et ceux qui ne font plus confiance aux étiquettes industrielles ni aux macérations approximatives.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-red-50/50 p-8 rounded-[40px] border border-red-100 space-y-6">
              <div className="flex items-center space-x-4 text-red-600">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-xl">
                  <AlertTriangle />
                </div>
                <h3 className="font-black text-xl text-slate-900">{lang === 'fr' ? 'Le piège de la Casserole' : 'The Pot Trap'}</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span><strong>{lang === 'fr' ? 'Température incontrôlée' : 'Uncontrolled Temperature'} :</strong> {lang === 'fr' ? 'Le bain-marie dépasse vite 60°C, brûlant les terpènes.' : 'Bain-marie quickly exceeds 60°C, burning terpenes.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span><strong>{lang === 'fr' ? 'Attente interminable' : 'Endless Waiting'} :</strong> {lang === 'fr' ? '4 à 6 semaines de macération passive avec risque d\'oxydation.' : '4 to 6 weeks of passive maceration with oxidation risk.'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#E8F1EE] p-8 rounded-[40px] border border-[#D8CBB7] space-y-6">
              <div className="flex items-center space-x-4 text-[#1C3F34]">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm">
                  <Sparkles />
                </div>
                <h3 className="font-black text-xl text-[#0F261E]">{lang === 'fr' ? 'L\'Alternative BloomLab®' : 'The BloomLab® Alternative'}</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>{lang === 'fr' ? 'Précision au degré près' : 'Degree Precision'} :</strong> {lang === 'fr' ? 'Garantit la conservation intégrale du Totum.' : 'Guarantees full Totum preservation.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>{lang === 'fr' ? 'Résultat en 1 à 4h' : 'Results in 1 to 4h'} :</strong> {lang === 'fr' ? 'Une extraction purifiée utilisable immédiatement.' : 'Purified extraction ready to use immediately.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMPARATIF */}
      <section id="comparatif" className="py-12 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
              {lang === 'fr' ? "L'Argument Preuve" : "Proof Argument"}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E] mt-6">Bain-Marie Classique <span className="text-slate-400">VS</span> Extracteur BloomLab®</h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-4">{lang === 'fr' ? "Découvrez pourquoi nos utilisateurs ont définitivement remisé leurs casseroles au placard." : "Discover why our users have permanently retired their pans to the closet."}</p>
          </div>
          <div className="bg-white rounded-[32px] border border-[#F3EEE6] overflow-hidden shadow-xl">
             <div className="grid grid-cols-2 md:grid-cols-3 bg-[#FAF7F2] border-b border-[#F3EEE6]">
               <div className="p-6 md:p-8 font-black text-[#0F261E] uppercase tracking-widest text-xs hidden md:block">{lang === 'fr' ? 'Critères' : 'Criteria'}</div>
               <div className="p-6 md:p-8 font-black text-red-600 uppercase tracking-widest text-xs text-center">Bain-Marie</div>
               <div className="p-6 md:p-8 font-black text-[#1C3F34] uppercase tracking-widest text-xs text-center bg-white border-x border-[#F3EEE6] relative">
                 BloomLab®
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#D97706]"></div>
               </div>
             </div>
             {[
               { label: lang === 'fr' ? "Contrôle Thermique" : "Thermal Control", bm: lang === 'fr' ? "Incertain (+60°C à 100°C). Destruction des terpènes fragiles." : "Uncertain (+60°C to 100°C). Destruction of fragile terpenes.", bl: lang === 'fr' ? "Degré près (±0.5°C). Thermorégulation MTC 2.0." : "Degree precision (±0.5°C). MTC 2.0 Thermoregulation." },
               { label: lang === 'fr' ? "Rendement du Totum" : "Totum Yield", bm: lang === 'fr' ? "Faible (30-40%). Dégradation des principes actifs." : "Low (30-40%). Degradation of active ingredients.", bl: lang === 'fr' ? "Maximale (95-100%). Extraction intégrale." : "Maximum (95-100%). Integral extraction." },
               { label: lang === 'fr' ? "Temps de Préparation" : "Preparation Time", bm: lang === 'fr' ? "4 à 6 Semaines de macération lente." : "4 to 6 weeks of slow maceration.", bl: lang === 'fr' ? "1 à 4 Heures selon le protocole." : "1 to 4 hours depending on the protocol." },
               { label: lang === 'fr' ? "Nettoyage & Ergonomie" : "Cleaning & Ergonomics", bm: lang === 'fr' ? "Fastidieux. Étamines salissantes à presser." : "Tedious. Messy strainers to squeeze.", bl: lang === 'fr' ? "Nettoyage Express (60s). Cuve Inox 304." : "Express Cleaning (60s). 304 Stainless Steel tank." },
               { label: lang === 'fr' ? "Sécurité des Solvants" : "Solvent Safety", bm: lang === 'fr' ? "Risqué. Vapeurs d'alcool sur feu vif." : "Risky. Alcohol vapors on open flame.", bl: lang === 'fr' ? "Circuit Hermétique. Zéro fuite de vapeurs." : "Hermetic Circuit. Zero vapor leakage." }
             ].map((row, i) => (
               <div key={i} className="grid grid-cols-2 md:grid-cols-3 border-b border-[#F3EEE6] last:border-0 hover:bg-[#FAF7F2]/50 transition-colors">
                 <div className="p-5 md:p-6 text-sm font-bold text-[#0F261E] hidden md:flex items-center">{row.label}</div>
                 <div className="p-5 md:p-6 text-sm text-red-600 text-center font-medium">{row.bm}</div>
                 <div className="p-5 md:p-6 text-sm font-bold text-[#1C3F34] text-center bg-white border-x border-[#F3EEE6] flex items-center justify-center gap-2">
                   <Check className="w-4 h-4 text-emerald-600 shrink-0" /> {row.bl}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* UNIVERSES */}
      <section id="3-univers" className="py-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 relative">
             <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
                {lang === 'fr' ? 'Polyvalence Absolue' : 'Absolute Versatility'}
             </div>
             <h2 className="text-3xl sm:text-4xl font-black text-[#0F261E] mt-4">{currentT.universes.title}</h2>
             <p className="text-slate-600">{currentT.universes.subtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {(Object.keys(currentT.universes.tabs) as UniverseType[]).map((key) => (
              <button 
                key={key} 
                onClick={() => setActiveUniverse(key)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeUniverse === key ? 'bg-[#1C3F34] text-white' : 'bg-[#FAF7F2] text-slate-500'}`}
              >
                {currentT.universes.tabs[key]}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeUniverse} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <div className="text-[#D97706] font-black uppercase text-xs">{currentT.universes.data[activeUniverse].badge}</div>
                 <h3 className="text-3xl font-black text-[#0F261E]">{currentT.universes.data[activeUniverse].title}</h3>
                 <p className="text-slate-600">{currentT.universes.data[activeUniverse].description}</p>
                 <ul className="space-y-3">
                   {currentT.universes.data[activeUniverse].benefits.map((b, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-600" /> {b}</li>
                   ))}
                 </ul>
               </div>
               <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                 <img src={currentT.universes.data[activeUniverse].image} className="w-full aspect-[4/3] object-cover" alt="Universe" />
               </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-12 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
               {lang === 'fr' ? 'Simplicité Totale' : 'Total Simplicity'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E] mt-4">{currentT.steps.title}</h2>
            <p className="text-slate-600 mt-2">{currentT.steps.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentT.steps.list.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[48px] border border-[#F3EEE6] space-y-6 shadow-sm relative group hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-[24px] bg-[#1C3F34] text-[#FAF7F2] font-black text-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  {s.step}
                </div>
                <h3 className="text-xl font-black text-[#0F261E]">{s.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION SCIENCE DES SOLVANTS */}
      <section id="solvants" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
                {lang === 'fr' ? 'Ingénierie R&D' : 'Engineering R&D'}
              </div>
              <h2 className="text-3xl font-black text-[#0F261E] leading-tight mt-4">
                {lang === 'fr' ? 'La Science du Totum : À chaque plante son solvant et sa température' : 'Totum Science: To each plant its solvent and temperature'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === 'fr' ? 'Contrairement aux bains-marie génériques, la BloomLab® ajuste la synergie solvant-température pour extraire la totalité du profil phytochimique sans dénaturation.' : 'Unlike generic bain-maries, BloomLab® adjusts the solvent-temperature synergy to extract the entire phytochemical profile without denaturation.'}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: "🧪", title: lang === 'fr' ? "Résines & Graines Dures (Boswellia, Girofle)" : "Resins & Hard Seeds (Boswellia, Clove)", desc: lang === 'fr' ? "Extraction ciblée à 60° d'alcool • Protocole 45°C" : "Targeted extraction at 60° alcohol • 45°C Protocol" },
                  { icon: "🌿", title: lang === 'fr' ? "Racines & Écorces (Salsepareille, Gentiane)" : "Roots & Bark (Sarsaparilla, Gentian)", desc: lang === 'fr' ? "Extraction ciblée à 55° d'alcool • Protocole 40°C" : "Targeted extraction at 55° alcohol • 40°C Protocol" },
                  { icon: "🌸", title: lang === 'fr' ? "Fleurs & Feuilles Fragiles (Passiflore, Pensée)" : "Flowers & Fragile Leaves (Passionflower, Pansy)", desc: lang === 'fr' ? "Extraction douce à 45° d'alcool / Huile • Protocole 35°C" : "Gentle extraction at 45° alcohol / Oil • 35°C Protocol" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F3EEE6] flex items-start space-x-3.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-[#0F261E]">{item.title}</div>
                      <div className="text-xs text-slate-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center space-x-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'fr' ? 'SÉCURITÉ GARANTIE : Nos protocoles excluent à 100% l\'usage de plantes toxiques.' : 'GUARANTEED SAFETY: Our protocols 100% exclude the use of toxic plants.'}</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 md:p-8 rounded-3xl border border-[#F3EEE6] space-y-4 shadow-sm h-[450px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F261E]">{lang === 'fr' ? 'Rendement de Préservation des Principes Actifs' : 'Active Principles Preservation Yield'}</h3>
                  <p className="text-xs text-slate-500">{lang === 'fr' ? 'Comparatif de la concentration en molécules d\'intérêt au fil du temps' : 'Comparison of concentration of molecules of interest over time'}</p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#1C3F34] text-white px-3 py-1 rounded-full">R&D BloomLab</span>
              </div>
              <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AVIS */}
      <section id="avis" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
              {lang === 'fr' ? 'Avis Authentiques' : 'Authentic Reviews'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F261E] mt-4">{lang === 'fr' ? 'Vus dans leurs ateliers et cuisines' : 'Seen in their workshops and kitchens'}</h2>
            <p className="text-slate-600">{lang === 'fr' ? 'Ce que disent nos clients après avoir jeté leurs casseroles au bain-marie.' : 'What our customers say after throwing away their bain-marie pans.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Clara M.", text: lang === 'fr' ? "Je brûlais constamment mes huiles au bain-marie. Avec la BloomLab, la couleur et la texture de mes sérums n'ont plus rien à voir !" : "I was constantly burning my oils in the bain-marie. With BloomLab, the color and texture of my serums are completely different!", role: lang === 'fr' ? "Univers Cosmétique" : "Cosmetic Universe" },
              { name: "Dr. Renaud P.", text: lang === 'fr' ? "Mes teintures-mères se font maintenant en 3h au lieu de 6 semaines. Un gain de temps exceptionnel pour mes préparations." : "My mother tinctures are now made in 3h instead of 6 weeks. Exceptional time saving for my preparations.", role: lang === 'fr' ? "Herbaliste" : "Herbalist" },
              { name: "Antoine L.", text: lang === 'fr' ? "Mon huile infusée au romarin sans amertume est devenue incontournable dans ma cuisine. Lavage ultra simple." : "My rosemary infused oil without bitterness has become a must in my kitchen. Super simple cleaning.", role: lang === 'fr' ? "Gastronomie" : "Gastronomy" }
            ].map((review, i) => (
              <div key={i} className="bg-[#FAF7F2] p-8 rounded-[40px] border border-[#F3EEE6] space-y-6 shadow-sm">
                <div className="flex text-[#D97706] space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed">"{review.text}"</p>
                <div className="pt-4 border-t border-[#E7DFD3] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1C3F34] flex items-center justify-center text-white font-black text-xs">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0F261E]">{review.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUO ARGILES */}
      <section id="duo-argiles" className="py-12 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 bg-[#0F261E] rounded-[48px] p-12 lg:p-20 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
           <div className="space-y-6 relative z-10">
             <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
                {lang === 'fr' ? 'Ingénierie Minérale' : 'Mineral Engineering'}
             </div>
             <h2 className="text-4xl font-black mt-4">{lang === 'fr' ? 'Duo Argiles' : 'Clay Duo'}</h2>
             <p className="text-xl text-white/70">
               {lang === 'fr' 
                 ? 'Une association de zéolithes et bentonites naturelles sélectionnées pour leurs propriétés d\'adsorption et leur structure microporeuse unique.' 
                 : 'An association of natural zeolites and bentonites selected for their adsorption properties and unique microporous structure.'}
             </p>
             <div className="space-y-4 text-sm text-white/60 font-medium leading-relaxed">
               <p>
                 {lang === 'fr' 
                   ? "Le Duo Argiles repose sur l'affinité physico-chimique de minéraux volcaniques rares. Leur porosité naturelle permet une interaction sélective au sein du cadre digestif." 
                   : "The Clay Duo is based on the physico-chemical affinity of rare volcanic minerals. Their natural porosity allows selective interaction within the digestive framework."}
               </p>
               <p>
                 {lang === 'fr' 
                   ? "Cette synergie minérale est conçue pour accompagner votre terrain sans interférer avec les processus biologiques systémiques." 
                   : "This mineral synergy is designed to support your terrain without interfering with systemic biological processes."}
               </p>
             </div>
             <button onClick={() => selectPackage('master', 289)} className="bg-[#D97706] px-8 py-4 rounded-full font-black hover:scale-105 transition-transform">
               {lang === 'fr' ? 'Ajouter au pack' : 'Add to pack'}
             </button>
           </div>
           <div className="relative group">
             <div className="absolute -inset-4 bg-[#D97706]/20 rounded-[40px] blur-2xl group-hover:bg-[#D97706]/30 transition-all"></div>
             <img src={duoArgilesImg} className="rounded-3xl shadow-2xl relative z-10 w-full object-cover" alt="Duo Argiles" />
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
               {lang === 'fr' ? 'Questions Fréquentes' : 'Frequent Questions'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E] mt-4">{currentT.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {currentT.faq.items.map((item, i) => (
              <div key={i} className="border border-[#F3EEE6] rounded-3xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left font-bold flex justify-between">
                   {item.q}
                   {openFaq === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFaq === i && <div className="p-6 pt-0 text-slate-600 border-t border-[#F3EEE6]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION COMMANDE */}
      <section id="commande" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
              {lang === 'fr' ? 'Offre Exclusive Web' : 'Exclusive Web Offer'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E] mt-4">{lang === 'fr' ? 'Choisissez votre configuration BloomLab®' : 'Choose your BloomLab® configuration'}</h2>
            <p className="text-slate-600">{lang === 'fr' ? 'Expédition prioritaire sous 24/48h & paiement sécurisé SSL.' : 'Priority shipping within 24/48h & SSL secure payment.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF7F2] p-10 rounded-[48px] border border-[#F3EEE6] space-y-8 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0F261E]">BloomLab® Solo</h3>
                <p className="text-slate-500 font-medium">{lang === 'fr' ? 'L\'essentiel pour commencer.' : 'The essentials to get started.'}</p>
              </div>
              <div className="text-4xl font-black text-[#0F261E]">239€</div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-emerald-600" /> {lang === 'fr' ? 'Machine BloomLab® v2' : 'BloomLab® v2 Machine'}</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-emerald-600" /> {lang === 'fr' ? 'Guide Digital 100 recettes' : '100 recipes Digital Guide'}</li>
              </ul>
              <button onClick={() => selectPackage('solo', 239)} className="w-full py-5 rounded-full bg-[#E7DFD3] text-[#0F261E] font-black text-lg hover:bg-[#D8CBB7] transition-colors">{lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}</button>
            </div>

            <div className="bg-[#1C3F34] p-10 rounded-[48px] text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D97706] text-white text-[10px] font-black px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
                {lang === 'fr' ? 'Plus Populaire' : 'Most Popular'}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Pack Signature</h3>
                <p className="text-white/60 font-medium">{lang === 'fr' ? 'Le protocole complet de terrain.' : 'The complete terrain protocol.'}</p>
              </div>
              <div className="text-4xl font-black">289€ <span className="text-lg opacity-50 line-through ml-2">349€</span></div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#D97706]" /> {lang === 'fr' ? 'Machine BloomLab® v2' : 'BloomLab® v2 Machine'}</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#D97706]" /> {lang === 'fr' ? 'Duo Argiles' : 'Clay Duo'}</li>
              </ul>
              <button onClick={() => selectPackage('master', 289)} className="w-full py-5 rounded-full bg-[#D97706] text-white font-black text-lg hover:bg-[#B45309] transition-colors shadow-lg">{lang === 'fr' ? 'Commander le Pack' : 'Order the Pack'}</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & NEWSLETTER REMOVED (Handled by global Footer) */}
      <div className="h-px bg-[#F3EEE6] mt-20" />
      
      {/* CART MODAL (SIMPLIFIED) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between">
               <div className="space-y-8">
                 <div className="flex justify-between items-center border-b pb-4">
                   <h3 className="text-xl font-black uppercase tracking-tighter">Mon Panier</h3>
                   <button onClick={() => setIsCartOpen(false)}><X /></button>
                 </div>
                 <div className="bg-[#FAF7F2] p-6 rounded-3xl border flex justify-between items-center">
                    <div>
                      <div className="font-bold">{cartItem.title}</div>
                      <div className="text-xs opacity-50">BloomLab® Precision Extractor</div>
                    </div>
                    <div className="font-black text-xl">{cartItem.price}€</div>
                 </div>
               </div>
               <button onClick={() => onNavigate('checkout')} className="w-full bg-[#1C3F34] text-white py-6 rounded-full font-black text-xl">Procéder au Paiement</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
