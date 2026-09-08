import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaymentBadges } from './components/PaymentBadges';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Check, 
  FlaskConical, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChefHat, 
  Clock, 
  Thermometer, 
  Droplets, 
  Microscope, 
  Sparkles, 
  AlertTriangle, 
  Utensils, 
  Truck, 
  X, 
  BookOpen, 
  Wind, 
  FileText, 
  Layers, 
  Lock, 
  HelpCircle,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { translations as globalTranslations } from './translations';

const heroImg1 = "/images/bloomlab_main_1784887530345.png";
const heroImg2 = "/images/2.png";
const heroImg3 = "/images/8.png";
const shelvesImg = "/images/modern_herbalist_shelves_1786699793560.jpg";
const herbsImg = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const duoArgilesImg = "/assets/images/product_duo_argiles.jpg";

interface IndexBisContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
  scrollToId?: string;
}

type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

export default function IndexBisContent({ onNavigate, lang = 'fr', scrollToId }: IndexBisContentProps) {
  useEffect(() => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [scrollToId]);

  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('culinaire');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState({ title: "Pack Signature Rentrée — BloomLab® + Duo Argiles Bloom", price: 289 });
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(heroImg1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Sticky bar visible UNIQUEMENT après 60% de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = scrollY / docHeight;
        setShowStickyBar(scrollPercent >= 0.6);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = globalTranslations[lang as keyof typeof globalTranslations] || globalTranslations.fr;
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const selectPackage = (type: 'solo' | 'signature', price: number) => {
    setCartItem({
      title: type === 'solo' 
        ? (isFR ? "Coffret BloomLab® Solo — Rentrée 2026" : isDE ? "BloomLab® Solo Set — 2026" : "BloomLab® Solo Set — 2026 Edition") 
        : (isFR ? "Pack Signature Rentrée — BloomLab® + Duo Argiles Bloom" : isDE ? "Signatur-Paket — BloomLab® + Bloom Erden-Duo" : "Signature Pack — BloomLab® + Bloom Clay Duo"),
      price: price
    });
    setIsCartOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      setTimeout(() => {
        setNewsletterSent(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const marqueeItems = isFR
    ? ["🇫🇷 Marque Botanique Française", "🚚 Expédition Prioritaire sous 24/48h", "🛡️ Garantie Satisfait ou Remboursé 30 Jours", "⚡ Garantie Fabricant 1 An"]
    : isDE
    ? ["🇫🇷 Französische botanische Marke", "🚚 Prioritärer Versand in 24/48h", "🛡️ 30-Tage-Geld-zurück-Garantie", "⚡ 1 Jahr Herstellergarantie"]
    : ["🇫🇷 French Botanical Brand", "🚚 Priority Shipping in 24/48h", "🛡️ 30-Day Money Back Guarantee", "⚡ 1-Year Manufacturer Warranty"];

  return (
    <div className="bg-[#FAF7F2] text-slate-800 font-sans antialiased selection:bg-[#1C3F34] selection:text-white">

      {/* ========================================================================= */}
      {/* BANDEAU ANNONCE DÉFILANT (Marquee Réassurance Réelle) */}
      {/* ========================================================================= */}
      <div className="bg-[#D97706] text-white py-2 overflow-hidden border-b border-white/10 shadow-sm relative z-30">
        <motion.div 
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12 px-8 shrink-0">
              <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.25em] whitespace-nowrap">
                {item}
              </span>
              <span className="opacity-30 text-lg font-light select-none shrink-0">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* BLOC 1 : HERO (Rôle : Accueil & Promesse Fondatrice) */}
      {/* Règle : 1 seul H1, vraies photos, aucun prix ici */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Galerie Visuelle Produit Réel */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7DFD3] bg-[#FAF7F2] mb-10 sm:mb-12">
            <img 
              src={selectedHeroImage} 
              alt={t.seo.alt.extracteur} 
              className="w-full h-[580px] sm:h-[700px] md:h-[820px] lg:h-[920px] object-cover object-[center_28%] brightness-105 contrast-105 filter transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 via-40% to-transparent pointer-events-none" />
            
            {/* Contrôles de vues produit & badge stock */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg1)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg1 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  {isFR ? 'Vue Extracteur' : isDE ? 'Extraktor-Ansicht' : 'Extractor View'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg2)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg2 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  {isFR ? 'Vue Préparation' : isDE ? 'Zubereitung' : 'Preparation View'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg3)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg3 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  {isFR ? 'Vue Totum' : isDE ? 'Totum-Ansicht' : 'Totum View'}
                </button>
              </div>
              <span className="bg-[#1C3F34]/90 backdrop-blur-xs border border-white/20 text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isFR ? 'En Stock · Expédition 24/48h' : isDE ? 'Auf Lager · 24/48h' : 'In Stock · 24/48h Shipping'}
              </span>
            </div>

            {/* Titre H1 validé positionné sur l'image */}
            <div className="absolute inset-x-0 top-0 p-6 sm:p-8 md:p-10 lg:p-12 z-10 space-y-3 sm:space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-block px-3.5 py-1.5 bg-black/60 border border-white/25 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-xs">
                  {isFR ? 'SÉQUENÇAGE ACTIF A/B · ÉDITION 2026' : isDE ? 'SEQUENTIELLE A/B-EXTRAKTION · AUSGABE 2026' : 'SEQUENTIAL A/B EXTRACTION · 2026 EDITION'}
                </div>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#D97706] uppercase">
                  {isFR ? 'CULINAIRE · COSMÉTIQUE · SYSTÉMIQUE' : isDE ? 'KULINARISCH · KOSMETISCH · SYSTEMISCH' : 'CULINARY · COSMETIC · SYSTEMIC'}
                </span>
              </div>
              {/* Le SEUL H1 de la page */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
                {isFR 
                  ? "BloomLab : l'extracteur botanique de précision pour maîtriser vos préparations maison" 
                  : isDE 
                  ? "BloomLab: der botanische Präzisionsextraktor für die Beherrschung Ihrer hausgemachten Zubereitungen"
                  : "BloomLab: the precision botanical extractor for mastering homemade preparations"}
              </h1>
            </div>
          </div>

          {/* Textes du Manifeste & CTAs Hero (Sans aucun prix) */}
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-3">
              <p className="text-base sm:text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
                {isFR 
                  ? "La naturalité ne doit plus être approximative." 
                  : isDE 
                  ? "Natürlichkeit darf nicht länger ungefähr sein." 
                  : "Natural care should no longer be approximate."}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0F261E] leading-tight tracking-tight">
                {isFR 
                  ? "Reprenez le contrôle de votre extraction botanique." 
                  : isDE 
                  ? "Übernehmen Sie wieder die Kontrolle über Ihre botanische Extraktion." 
                  : "Take back control of your botanical extraction."}
              </h2>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 font-normal leading-relaxed">
              {isFR 
                ? "Depuis des décennies, la préparation des plantes est simplifiée à l'excès, affaiblissant leur potentiel. BloomLab réintroduit la rigueur d'un protocole chez vous : contrôle rigoureux du temps, de la température et de l'agitation pour révéler le Totum végétal de vos huiles infusées, macérats et extraits botaniques."
                : isDE
                ? "Über Jahrzehnte wurde die Zubereitung von Pflanzen übermäßig vereinfacht und ihr Potenzial geschwächt. BloomLab bringt die Strenge eines Laborprotokolls zu Ihnen nach Hause: präzise Kontrolle von Zeit, Temperatur und Rühren, um das pflanzliche Totum Ihrer Kräuteröle, Mazerate und botanischen Extrakte zu entfalten."
                : "For decades, plant preparation has been oversimplified, depleting its potential. BloomLab restores protocol rigor to your home: precise control of time, temperature and stirring to reveal the vegetal Totum in your infused oils, macerates and botanical extracts."}
            </p>

            {/* CTAs Héroïques (Aucun prix) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-[#1C3F34] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-xl shadow-[#1C3F34]/20 cursor-pointer"
              >
                <span>{isFR ? "Je commence" : isDE ? "Ich starte" : "Start Here"}</span>
                <Sparkles className="w-4 h-4 text-[#D97706]" />
              </button>
              <button
                onClick={() => onNavigate('product-detail', 'bloomlab')}
                className="px-8 py-4 bg-white hover:bg-[#FAF7F2] border-2 border-[#1C3F34] text-[#1C3F34] rounded-2xl font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-sm cursor-pointer"
              >
                <span>{isFR ? "Découvrir la BloomLab" : isDE ? "Die BloomLab entdecken" : "Discover BloomLab"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 2 : CONNAISSANCE (CRÉÉ) */}
      {/* Rôle : Éveil & Pédagogie sur la matière végétale */}
      {/* ========================================================================= */}
      <section id="connaissance" className="py-16 md:py-20 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '1. Connaissance Botanique' : isDE ? '1. Botanisches Wissen' : '1. Botanical Knowledge'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "Vous avez des plantes. Mais les connaissez-vous vraiment ?" 
                : isDE 
                ? "Sie haben Pflanzen. Aber kennen Sie sie wirklich?" 
                : "You have plants. But do you truly know them?"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Entre l'herboristerie empirique et les promesses marketing, la matière végétale exige une méthode claire. Chaque plante possède son propre code d'extraction."
                : isDE 
                ? "Zwischen empirischer Kräuterkunde und Marketingversprechen verlangt Pflanzenmaterial eine klare Methode."
                : "Between empirical herbalism and marketing claims, botanical matter demands a clear method."}
            </p>
          </div>

          {/* 3 Cartes Fondamentales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#F3EEE6] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] text-[#D97706] flex items-center justify-center font-black">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "Quelle partie utiliser ?" : isDE ? "Welchen Pflanzenteil nutzen?" : "Which part to use?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Feuilles, sommités fleuries, écorces, racines ou résines : chaque organe végétal concentre des familles moléculaires spécifiques aux résistances thermiques opposées."
                  : isDE 
                  ? "Blätter, Blüten, Rinden, Wurzeln oder Harze: Jeder Pflanzenteil konzentriert spezifische Molekülfamilien."
                  : "Leaves, flowering tops, barks, roots or resins: each plant organ concentrates distinct molecular families."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#F3EEE6] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] text-[#D97706] flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "Quelles précautions ?" : isDE ? "Welche Vorsichtsmaßnahmen?" : "Which precautions?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Contre-indications, choix des solvants nobles, synergies et respect strict des dosages journaliers adaptés au terrain biologique sans jamais improviser."
                  : isDE 
                  ? "Kontraindikationen, Wahl edler Lösungsmittel und strikte Einhaltung sicherer Tagesdosierungen."
                  : "Contraindications, noble solvent choices, synergies and strict adherence to safe daily dosages."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#F3EEE6] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1C3F34] text-[#D97706] flex items-center justify-center font-black">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "Comment l'extraire ?" : isDE ? "Wie extrahieren?" : "How to extract?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Hydrosoluble, liposoluble ou hydroalcoolique : la température ciblée, la durée et le brassage continu déterminent si vous capturez le Totum ou détruisez les actifs."
                  : isDE 
                  ? "Wasserlöslich, fettlöslich oder hydroalkoholisch: Gezielte Temperatur und Rühren entscheiden über den Erfolg."
                  : "Water-soluble, fat-soluble or hydroalcoholic: targeted temperature and continuous stirring determine success."}
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('herbier')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1C3F34] hover:bg-[#D97706] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{isFR ? "Explorer l'Herbier" : isDE ? "Das Herbarium erkunden" : "Explore the Herbarium"}</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 3 : MÉTHODE (Le Problème & Les 3 Barrières) */}
      {/* Rôle : Révéler les limites de l'improvisation artisanale */}
      {/* ========================================================================= */}
      <section id="methode" className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '2. Le Verrou Méthodologique' : isDE ? '2. Die methodische Hürde' : '2. The Methodological Barrier'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "Le problème n'est pas la plante. C'est la méthode qui sous-exploite sa puissance." 
                : isDE 
                ? "Das Problem ist nicht die Pflanze. Es ist die Methode, die ihr Potenzial vergeudet." 
                : "The problem isn't the plant. It's the method under-extracting its power."}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "L'extraction végétale domestique se heurte traditionnellement à 3 barrières physiques invisibles." 
                : isDE 
                ? "Die traditionelle Pflanzenextraktion stößt auf 3 unsichtbare physikalische Barrieren." 
                : "Traditional domestic plant extraction encounters 3 invisible physical barriers."}
            </p>
          </div>

          {/* Les 3 Barrières Physiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-amber-900/10 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-black">
                <Thermometer className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "1. Le Choc Thermique" : isDE ? "1. Thermischer Schock" : "1. Thermal Shock"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "L'eau bouillante ou un bain-marie incontrôlé dépasse les 60°C à 100°C : les terpènes volatils s'évaporent et les flavonoïdes thermolabiles sont dégradés avant usage." 
                  : isDE 
                  ? "Kochendes Wasser oder unkontrollierte Erhitzung zerstören hitzeempfindliche Terpene und Flavonoide." 
                  : "Boiling water or uncontrolled heating destroys heat-sensitive terpenes and delicate flavonoids."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-amber-900/10 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-black">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "2. La Barrière de Polarité" : isDE ? "2. Polaritätsbarriere" : "2. Polarity Barrier"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Une plante contient à la fois des principes hydrosolubles et liposolubles. Une extraction unique à l'aveugle laisse la moitié des principes actifs captifs de la fibre végétale." 
                  : isDE 
                  ? "Eine Pflanze enthält sowohl wasser- als auch fettlösliche Verbindungen. Eine einfache Extraktion lässt die Hälfte ungenutzt zurück." 
                  : "A plant contains both water and fat-soluble compounds. Single blind extraction leaves half captive in plant fibers."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-amber-900/10 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-black">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-[#0F261E]">
                {isFR ? "3. L'Oxydation à l'Air Libre" : isDE ? "3. Oxidation an der Luft" : "3. Open-Air Oxidation"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Les bocaux ouverts ou casseroles exposent les lipides et molécules actives à l'oxygène ambiant, accélérant le rancissement et la déperdition aromatique." 
                  : isDE 
                  ? "Offene Gefäße setzen Lipide und Wirkstoffe Sauerstoff aus, was Ranzigkeit und Aromaverlust beschleunigt." 
                  : "Open containers expose lipids and active molecules to oxygen, accelerating rancidity and aroma loss."}
              </p>
            </div>
          </div>

          {/* Cartes Fusionnées : Gaspillage / Souveraineté / Précision */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E7DFD3] shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h4 className="text-lg font-black text-[#1C3F34] flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#D97706]" />
                  {isFR ? "Contre le Gaspillage" : isDE ? "Gegen Verschwendung" : "Against Waste"}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isFR 
                    ? "Ne jetez plus de matière végétale mal extraite. Chaque gramme de plante libère son profil complet sous conditions adaptées." 
                    : isDE 
                    ? "Werfen Sie kein schlecht extrahiertes Pflanzenmaterial mehr weg. Jedes Gramm entfaltet sein volles Profil." 
                    : "No more discarded poorly extracted plant matter. Every gram releases its full profile under proper conditions."}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-black text-[#1C3F34] flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#D97706]" />
                  {isFR ? "Pour l'Autonomie Botanique" : isDE ? "Für botanische Autonomie" : "For Botanical Autonomy"}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isFR 
                    ? "Reprenez le contrôle complet sur vos préparations. Vous choisissez la plante, le solvant noble et la concentration exacte." 
                    : isDE 
                    ? "Übernehmen Sie wieder die Kontrolle. Sie wählen Pflanze, Lösungsmittel und genaue Konzentration." 
                    : "Take full control of your preparations. You select the plant, noble solvent, and exact concentration."}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-black text-[#1C3F34] flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#D97706]" />
                  {isFR ? "Par la Précision" : isDE ? "Durch Präzision" : "Through Precision"}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isFR 
                    ? "Chaque extraction devient un protocole documenté, reproductible à volonté sans incertitude ni risque de brûler vos actifs." 
                    : isDE 
                    ? "Jede Extraktion wird zu einem dokumentierten, reproduzierbaren Protokoll ohne Unsicherheiten." 
                    : "Every extraction becomes a documented, reproducible protocol without guesswork."}
                </p>
              </div>
            </div>

            {/* Pivot Sentence */}
            <div className="mt-10 pt-8 border-t border-[#F3EEE6] text-center">
              <p className="text-xl md:text-2xl font-black text-[#0F261E] italic">
                {isFR 
                  ? "« La fin de l'improvisation. Le début de la précision. »" 
                  : isDE 
                  ? "« Das Ende der Improvisation. Der Beginn der Präzision. »" 
                  : "« The end of guesswork. The beginning of precision. »"}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 4 : SOLUTION (Le Séquençage Actif A/B & L'Architecture BloomLab) */}
      {/* Rôle : Présenter l'ingénierie concrète sans aucune allégation interdite */}
      {/* ========================================================================= */}
      <section id="solution" className="py-16 md:py-24 bg-white border-b border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '3. La Solution Technologique' : isDE ? '3. Die technologische Lösung' : '3. The Technological Solution'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "Le Séquençage Actif A/B : respecter le spectre biochimique complet" 
                : isDE 
                ? "Sequentielle A/B-Extraktion: das vollständige biochemische Spektrum respektieren" 
                : "Active A/B Sequencing: respecting the full biochemical spectrum"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "La BloomLab orchestre la séparation et la capture des molécules selon leurs températures et solvants d'affinité." 
                : isDE 
                ? "BloomLab steuert die Trennung und Erfassung von Molekülen nach optimalen Temperaturen und Lösungsmitteln." 
                : "BloomLab orchestrates the separation and capture of molecules according to optimal temperatures and solvents."}
            </p>
          </div>

          {/* Les 3 Paliers Thermiques A/B */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#D97706]">
                {isFR ? "Phase A · Hydrosoluble" : isDE ? "Phase A · Wasserlöslich" : "Phase A · Water-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#0F261E]">70 - 75°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Extraction douce des tanins protecteurs, mucilages et polyphénols solubles dans l'eau sans dépasser le seuil critique de cuisson." 
                  : isDE 
                  ? "Sanfte Extraktion schützender Tannine, Schleimstoffe und wasserlöslicher Polyphenole." 
                  : "Gentle extraction of protective tannins, mucilages, and water-soluble polyphenols without scorching."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#D97706]">
                {isFR ? "Phase B · Liposoluble" : isDE ? "Phase B · Fettlöslich" : "Phase B · Fat-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#0F261E]">45 - 55°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Préservation intégrale des acides gras nobles, huiles essentielles et terpènes volatils dans les solvants huileux et alcooliques." 
                  : isDE 
                  ? "Vollständige Erhaltung wertvoller Fettsäuren, ätherischer Öle und flüchtiger Terpene." 
                  : "Integral preservation of noble fatty acids, essential oils, and volatile terpenes in oil and alcohol."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#D97706]">
                {isFR ? "Activation Thermique" : isDE ? "Thermische Aktivierung" : "Thermal Activation"}
              </div>
              <div className="text-3xl font-black text-[#0F261E]">121°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Palier de décarboxylation et d'ouverture des résines denses selon protocole spécifique, programmé avec précision de sécurité." 
                  : isDE 
                  ? "Gezielte Stufe zur Decarboxylierung und Öffnung dichter Harze nach spezifischem Protokoll." 
                  : "Targeted step for decarboxylation and resin release according to documented protocols."}
              </p>
            </div>
          </div>

          {/* 4 Cartes Caractéristiques Matérielles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Microscope className="w-6 h-6 text-[#1C3F34]" />
              <div className="text-sm font-black text-[#0F261E]">Inox 304 Alimentaire</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Cuve neutre inerte, zéro transfert métallique ni relargage plastique." : "Food-grade 304 stainless steel inert tank."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Thermometer className="w-6 h-6 text-[#1C3F34]" />
              <div className="text-sm font-black text-[#0F261E]">Précision ±0,5°C</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Sonde numérique continue prévenant toute dégradation thermique des molécules." : "Digital continuous sensor preventing overheating."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Activity className="w-6 h-6 text-[#1C3F34]" />
              <div className="text-sm font-black text-[#0F261E]">Agitation Cyclique</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Brassage régulier automatisé maximisant l'échange solvant-plante." : "Automated cyclic stirring optimizing solvent-plant contact."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Lock className="w-6 h-6 text-[#1C3F34]" />
              <div className="text-sm font-black text-[#0F261E]">Milieu Clos Hermétique</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Chambre étanche piégeant 100% des arômes et terpènes volatils." : "Airtight chamber trapping all volatile terpenes and aromas."}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 5 : DÉMONSTRATION (5 Étapes, Aucune Improvisation) */}
      {/* Rôle : Rendre la méthode limpide et dédramatiser la pratique */}
      {/* ========================================================================= */}
      <section id="demonstration" className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '4. Protocole en Action' : isDE ? '4. Protokoll in Aktion' : '4. Protocol in Action'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR ? "5 étapes, aucune improvisation" : isDE ? "5 Schritte, keine Improvisation" : "5 steps, zero guesswork"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Pensé pour une prise en main progressive. Chaque geste s'appuie sur des repères précis." 
                : isDE 
                ? "Entwickelt für einen schrittweisen Einstieg. Jeder Handgriff basiert auf präzisen Richtwerten." 
                : "Designed for progressive onboarding. Every gesture is grounded in precise guidelines."}
            </p>
          </div>

          {/* Les 5 Étapes Détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: "01",
                title: isFR ? "Choisir la recette" : "Choose recipe",
                desc: isFR ? "Sélectionnez un protocole validé selon votre objectif culinaire, cosmétique ou de terrain." : "Select a documented protocol suited to your goal."
              },
              {
                num: "02",
                title: isFR ? "Peser les plantes" : "Prepare plants",
                desc: isFR ? "Pesez vos plantes sèches ou fraîches avec rigueur et disposez-les dans le panier d'infusion." : "Weigh dry or fresh herbs and place them in the tank basket."
              },
              {
                num: "03",
                title: isFR ? "Régler les paramètres" : "Set parameters",
                desc: isFR ? "Associez temps, température et solvant (eau, huile végétale ou alcool titré) selon la fiche." : "Set time, temperature, and noble solvent according to the sheet."
              },
              {
                num: "04",
                title: isFR ? "Lancer le cycle" : "Run cycle",
                desc: isFR ? "BloomLab maintient la température exacte et l'agitation douce en continu de manière autonome." : "BloomLab autonomously maintains exact temperature and gentle stirring."
              },
              {
                num: "05",
                title: isFR ? "Filtrer & documenter" : "Filter & record",
                desc: isFR ? "Recueillez votre extrait Totum pur en flacon stérile et notez vos observations dans votre carnet." : "Collect your Totum extract into amber glass and note your results."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D97706]/40 transition-all">
                <div className="space-y-3">
                  <div className="text-3xl font-black text-[#D97706] opacity-80">{step.num}</div>
                  <h3 className="text-base font-black text-[#0F261E]">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                <div className="w-full h-1 bg-[#FAF7F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1C3F34]" style={{ width: `${(idx + 1) * 20}%` }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 6 : PROJECTION (De votre cuisine à la maîtrise du Totum : 3 niveaux) */}
      {/* Rôle : Fusionner la triade (culinaire, cosmétique, systémique) en une seule section */}
      {/* ========================================================================= */}
      <section id="projection" className="py-16 md:py-24 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '5. Les 3 Niveaux de Pratique' : isDE ? '5. Die 3 Praxisebenen' : '5. 3 Practice Levels'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "De votre cuisine à la maîtrise du Totum : 3 niveaux de pratique" 
                : isDE 
                ? "Von Ihrer Küche zur Totum-Meisterschaft: 3 Praxisebenen" 
                : "From your kitchen to Totum mastery: 3 practice levels"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Une seule machine polyvalente qui grandit avec votre savoir-faire au fil des mois." 
                : isDE 
                ? "Eine einzige vielseitige Maschine, die mit Ihrer Erfahrung wächst." 
                : "A single versatile machine that grows with your evolving botanical expertise."}
            </p>
          </div>

          {/* Sélecteur d'Univers Interactif */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'culinaire', label: isFR ? "1. Atelier Culinaire" : "1. Culinary Workshop", icon: ChefHat, desc: isFR ? "Huiles parfumées, beurres infusés, nectars" : "Infused oils, compound butters, botanical vinegars" },
              { id: 'cosmetique', label: isFR ? "2. Cosmétique Botanique" : "2. Botanical Cosmetics", icon: Droplets, desc: isFR ? "Sérums précieux, macérats ciblés, baumes purs" : "Precious face serums, targeted macerates, pure balms" },
              { id: 'phytotherapie', label: isFR ? "3. Protocoles Systémiques" : "3. Systemic Protocols", icon: Activity, desc: isFR ? "Teintures végétales, extraits concentrés de résines" : "Botanical tinctures, concentrated resin extracts" },
            ].map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveUniverse(u.id as UniverseType)}
                className={`p-6 rounded-[28px] border text-left transition-all cursor-pointer ${
                  activeUniverse === u.id
                    ? 'bg-[#1C3F34] text-white border-[#1C3F34] shadow-xl ring-2 ring-[#D97706]/50'
                    : 'bg-[#FAF7F2] text-slate-800 border-[#E7DFD3] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${activeUniverse === u.id ? 'bg-[#D97706] text-white' : 'bg-white text-[#1C3F34]'}`}>
                    <u.icon className="w-5 h-5" />
                  </div>
                  <div className="font-black text-lg">{u.label}</div>
                </div>
                <div className={`text-xs leading-relaxed ${activeUniverse === u.id ? 'text-white/80' : 'text-slate-500'}`}>
                  {u.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Détail de l'Univers Actif */}
          <div className="bg-[#FAF7F2] rounded-[40px] p-8 md:p-12 border border-[#E7DFD3] shadow-md grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {activeUniverse === 'culinaire' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#D97706]/15 text-[#D97706] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 1 · Gastronomie & Arômes" : "Level 1 · Gastronomy & Aromas"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                    {isFR ? "L'Art Culinaire sans amertume ni surchauffe" : "Culinary Art without bitterness"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Révélez l'intensité pure des herbes fraîches et aromates. L'extraction thermique douce empêche l'apparition des composés brûlés et acides." 
                      : "Reveal pure aromatics without scorching delicate herbs."}
                  </p>
                  
                  {/* Fiche Exemple Concret */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#D97706] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole culinaire :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#0F261E]">
                      {isFR ? "Huile d'olive infusée au Romarin, Piment doux & Ail" : "Rosemary, Mild Chili & Garlic Infused Olive Oil"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">38°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">1h 30m</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">{isFR ? "Huile d'olive" : "Olive oil"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('culinaire')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1C3F34] hover:text-[#D97706] transition-colors"
                  >
                    <span>{isFR ? "Explorer les recettes culinaires" : "Explore culinary recipes"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'cosmetique' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#D97706]/15 text-[#D97706] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 2 · Cosmétique Vivante" : "Level 2 · Living Cosmetics"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                    {isFR ? "Formulations Botaniques Cutanées Pures" : "Pure Botanical Skin Formulations"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Concevez vos propres sérums et macérats de soin sur-mesure. Les acides gras essentiels et antioxydants végétaux sont conservés intacts sans solvants pétrochimiques." 
                      : "Formulate your own custom serums and restorative macerates."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#D97706] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole cosmétique :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#0F261E]">
                      {isFR ? "Sérum précieux Passiflore, Rose de Damas & Jojoba" : "Passionflower, Damask Rose & Jojoba Serum"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">42°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">2h 00m</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">{isFR ? "Huile de Jojoba" : "Jojoba oil"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('cosmetiques')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1C3F34] hover:text-[#D97706] transition-colors"
                  >
                    <span>{isFR ? "Découvrir la cosmétique maison" : "Discover homemade cosmetics"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'phytotherapie' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#D97706]/15 text-[#D97706] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 3 · Soutien du Terrain" : "Level 3 · Terrain Support"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
                    {isFR ? "Protocoles Systémiques & Extraits de Totum" : "Systemic Protocols & Totum Extracts"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Capturez la richesse intégrale des racines, sommités et gommes-résines dans des solutions hydroalcooliques calibrées pour soutenir le terrain biologique." 
                      : "Capture the full richness of roots and resins in calibrated solutions."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#D97706] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole systémique :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#0F261E]">
                      {isFR ? "Extrait concentré Boswellia, Gingembre & Girofle" : "Boswellia, Ginger & Clove Concentrated Extract"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">45°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">3h 00m</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#1C3F34] block">{isFR ? "Alcool titré 60°" : "Food alcohol 60°"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('phytotherapie-reset')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1C3F34] hover:text-[#D97706] transition-colors"
                  >
                    <span>{isFR ? "Accéder aux protocoles systémiques" : "Access systemic protocols"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Visuel immersif de pratique */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E7DFD3] h-[340px] sm:h-[420px]">
              <img 
                src={activeUniverse === 'culinaire' ? herbsImg : activeUniverse === 'cosmetique' ? bloomSoinsImg : shelvesImg} 
                alt="Pratique BloomLab" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-medium">
                {isFR ? "Précision reproductible à domicile · Extraction du Totum végétal" : "Reproducible home extraction of the botanical Totum"}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 7 : JUSTIFICATION (Le Comparatif Honnête) */}
      {/* Règle : Aucun pourcentage (30-40%, 95-100%), aucun MTC 2.0, pas de table sans/avec */}
      {/* ========================================================================= */}
      <section id="comparatif" className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '6. Comparatif Technique' : isDE ? '6. Technischer Vergleich' : '6. Technical Comparison'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "BloomLab vs méthodes improvisées : le comparatif honnête" 
                : isDE 
                ? "BloomLab vs improvisierte Methoden: der ehrliche Vergleich" 
                : "BloomLab vs improvised methods: an honest comparison"}
            </h2>
          </div>

          {/* Tableau Comparatif Rigoureux */}
          <div className="bg-white rounded-[32px] border border-[#E7DFD3] overflow-hidden shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FAF7F2] border-b border-[#E7DFD3] p-6 text-xs font-black uppercase tracking-widest text-[#0F261E]">
              <div className="hidden md:block">{isFR ? "Paramètre d'extraction" : "Parameter"}</div>
              <div className="text-red-800">{isFR ? "Méthodes improvisées (casserole / bain-marie)" : "Improvised methods"}</div>
              <div className="text-[#1C3F34] mt-2 md:mt-0 font-extrabold">{isFR ? "Extracteur BloomLab®" : "BloomLab® Extractor"}</div>
            </div>

            <div className="divide-y divide-[#F3EEE6] text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center">
                <div className="font-bold text-[#0F261E]">{isFR ? "Contrôle thermique" : "Thermal control"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Température estimée et incontrôlée (+60°C à 100°C), risque permanent de surchauffe." : "Estimated, uncontrolled heat with thermal degradation."}</div>
                <div className="font-bold text-[#1C3F34] text-xs sm:text-sm">{isFR ? "Régulation au degré près (±0,5°C) adaptée au profil de chaque végétal." : "Degree-precise control (±0.5°C) preserving fragile terpenes."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center bg-[#FAF7F2]/40">
                <div className="font-bold text-[#0F261E]">{isFR ? "Contact avec l'air" : "Contact with air"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Oxydation à l'air libre et évaporation rapide des terpènes aromatiques volatils." : "Open-air oxidation and rapid aroma evaporation."}</div>
                <div className="font-bold text-[#1C3F34] text-xs sm:text-sm">{isFR ? "Environnement clos hermétique piégeant 100% des vapeurs aromatiques." : "Airtight closed vessel trapping 100% of volatile fractions."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center">
                <div className="font-bold text-[#0F261E]">{isFR ? "Agitation & percolation" : "Stirring & percolation"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Agitation manuelle irrégulière ou macération statique à faible rendement." : "Irregular manual stirring or static weak diffusion."}</div>
                <div className="font-bold text-[#1C3F34] text-xs sm:text-sm">{isFR ? "Agitation cyclique automatisée assurant un échange continu plante-solvant." : "Automated cyclic stirring ensuring optimal continuous exchange."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center bg-[#FAF7F2]/40">
                <div className="font-bold text-[#0F261E]">{isFR ? "Reproductibilité" : "Reproducibility"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Aléatoire d'un lot à l'autre, dosage et concentration impossibles à reproduire." : "Unpredictable results, impossible to repeat precisely."}</div>
                <div className="font-bold text-[#1C3F34] text-xs sm:text-sm">{isFR ? "Protocole documenté, précis et parfaitement reproductible à chaque préparation." : "Documented, reproducible protocol every single time."}</div>
              </div>
            </div>
          </div>

          {/* Ligne Clé Pivot */}
          <div className="text-center pt-4">
            <p className="text-lg md:text-xl font-black text-[#0F261E] max-w-2xl mx-auto leading-relaxed">
              {isFR 
                ? "« Vous n'avez pas besoin de plus de recettes. Vous avez besoin d'une méthode que vous pouvez répéter. »" 
                : isDE 
                ? "« Sie brauchen nicht mehr Rezepte. Sie brauchen eine Methode, die Sie wiederholen können. »" 
                : "« You don't need more recipes. You need a method you can repeat. »"}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 8 : PREUVE SOCIALE (Ils ont remisé leurs casseroles) */}
      {/* Règle : "Dr. Renaud P." devient "Renaud P., herbaliste" */}
      {/* ========================================================================= */}
      <section id="avis" className="py-16 md:py-24 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '7. Retours de Pratique' : isDE ? '7. Erfahrungsberichte' : '7. Practice Feedback'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR ? "Ils ont remisé leurs casseroles" : isDE ? "Sie haben ihre Kochtöpfe weggeräumt" : "They put away their saucepans"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR 
                ? "Découvrez l'expérience de praticiens et de passionnés de botanique qui préparent leurs extraits au quotidien." 
                : "Practitioners and botanical enthusiasts sharing their daily extraction experience."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  {isFR 
                    ? "« En herboristerie, la maîtrise de la température au degré près change tout. La préservation des terpènes volatils est incomparable par rapport à une macération artisanale classique. »"
                    : "« In herbal practice, exact temperature control changes everything. The preservation of volatile terpenes is remarkable. »"}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7DFD3]">
                <div className="font-black text-sm text-[#0F261E]">Renaud P.</div>
                <div className="text-xs text-slate-500 font-medium">Herbaliste & formateur en botanique</div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  {isFR 
                    ? "« Je prépare mes huiles de soin pour mes consultants. Zéro amertume, arômes intacts, et surtout une régularité parfaite d'un flacon à l'autre. »"
                    : "« I prepare botanical care oils for my clients. No bitterness, intact aromas, and flawless consistency. »"}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7DFD3]">
                <div className="font-black text-sm text-[#0F261E]">Claire M.</div>
                <div className="text-xs text-slate-500 font-medium">Naturopathe & conseillère de terrain</div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  {isFR 
                    ? "« J'ai enfin arrêté de brûler mes macérats au bain-marie. En 2h, mon huile de romarin et piment pour la cuisine est prête et parfumée comme jamais. »"
                    : "« I finally stopped burning my macerates in double-boilers. In 2 hours, my herb oils are aromatic and clean. »"}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7DFD3]">
                <div className="font-black text-sm text-[#0F261E]">Thomas D.</div>
                <div className="text-xs text-slate-500 font-medium">Passionné d'herboristerie maison</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 9 : ORIGINES (Sagesse Ancienne & Instrument Moderne) */}
      {/* Rôle : Donner du sens et de la profondeur sans surcharge */}
      {/* ========================================================================= */}
      <section id="origines" className="py-16 md:py-20 bg-[#FAF7F2] border-y border-[#F3EEE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-xs border border-[#D8CBB7]">
            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isFR ? "Aux origines de la BloomLab®" : isDE ? "Ursprünge der BloomLab®" : "Origins of BloomLab®"}</span>
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-[#0F261E] italic leading-relaxed max-w-3xl mx-auto">
            {isFR 
              ? "« La BloomLab® n'est pas une simple machine. Elle est née d'une quête millénaire : celle d'extraire l'essence parfaite des plantes sans la brûler ni la gaspiller. Une technologie de précision qui réconcilie la sagesse botanique asiatique avec la science moderne. »" 
              : isDE 
              ? "« Die BloomLab® ist nicht nur eine Maschine. Sie entstand aus einer jahrtausendealten Suche: die vollkommene Essenz der Pflanzen zu extrahieren, ohne sie zu verbrennen. Eine Präzisionstechnologie, die asiatische botanische Weisheit mit moderner Wissenschaft versöhnt. »" 
              : "« The BloomLab® is not just a machine. It was born from a millennia-old quest: to extract the perfect essence of plants without burning or wasting it. A precision technology that reconciles Asian botanical wisdom with modern science. »"}
          </blockquote>
          <p className="text-base sm:text-lg font-black text-[#1C3F34] tracking-tight">
            {isFR 
              ? "Les sagesses anciennes avaient la connaissance. Nous leur apportons l'instrument." 
              : isDE 
              ? "Alte Weisheiten hatten das Wissen. Wir bringen ihnen das Präzisionsinstrument." 
              : "Ancient wisdom held the knowledge. We bring them the instrument."}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1C3F34] hover:bg-[#D97706] active:bg-[#B45309] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{isFR ? "Découvrir la BloomLab" : isDE ? "Die BloomLab entdecken" : "Discover BloomLab"}</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 10 : FAQ (Avant le prix) */}
      {/* Rôle : Lever tous les doutes rationnels avant le closing */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '9. Foire Aux Questions' : isDE ? '9. Häufige Fragen' : '9. FAQ'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F261E] tracking-tight">
              {isFR 
                ? "Tout ce que vous devez savoir avant de commander" 
                : isDE 
                ? "Alles, was Sie vor der Bestellung wissen sollten" 
                : "Everything you need to know before ordering"}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: isFR ? "En quoi la BloomLab® est-elle différente d'un simple bain-marie ?" : "How is BloomLab® different from a bain-marie?",
                a: isFR ? "Le bain-marie traditionnel ne permet aucun réglage fin : l'eau atteint rapidement des températures fluctuantes détruisant les molécules thermosensibles. La BloomLab® intègre un capteur de température au degré près (±0,5°C) combiné à un brassage cyclique doux en milieu hermétique clos, empêchant tout contact dégradant avec l'oxygène." : "Traditional double-boilers cannot accurately control heat. BloomLab provides ±0.5°C thermal control, cyclic stirring, and an airtight closed chamber."
              },
              {
                q: isFR ? "Faut-il être herboriste ou chimiste pour l'utiliser ?" : "Do I need to be an herbalist or chemist?",
                a: isFR ? "Absolument pas. L'appareil a été pensé pour une prise en main progressive. Vous disposez d'un guide pratique de 100 recettes et de l'Herbier en ligne qui détaillent chaque paramètre temps, température et solvant étape par étape." : "Not at all. It is designed for progressive onboarding with our 100-recipe practical guide."
              },
              {
                q: isFR ? "Quels solvants puis-je utiliser en toute sécurité ?" : "Which solvents can I use safely?",
                a: isFR ? "La cuve en Inox 304 de grade alimentaire est conçue pour fonctionner avec l'eau purifiée, toutes les huiles végétales nobles (jojoba, olive, amande douce, argan) et les alcools alimentaires titrés jusqu'à 60°. Sa conception hermétique prévient tout risque d'évaporation volatile." : "The food-grade 304 stainless steel tank works with purified water, noble plant oils, and food-grade alcohols up to 60°."
              },
              {
                q: isFR ? "Combien de temps dure une extraction ?" : "How long does an extraction take?",
                a: isFR ? "La durée varie entre 1h30 pour une huile infusée culinaire douce et 3h pour une extraction concentrée de racines denses, sans surveillance constante requise." : "Duration ranges between 1.5 hours for culinary oils and 3 hours for dense root extracts."
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-[#F3EEE6] rounded-2xl overflow-hidden transition-all bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-[#0F261E] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#D97706] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-[#F3EEE6] bg-white">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 11 : DÉPART GUIDÉ (CRÉÉ) */}
      {/* Rôle : Orienter chaque profil d'utilisateur selon sa situation */}
      {/* ========================================================================= */}
      <section id="depart-guide" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '10. Orientation Personnalisée' : isDE ? '10. Orientierung' : '10. Guided Start'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR ? "Par où commencer sans vous tromper ?" : isDE ? "Wo beginnen, ohne Fehler zu machen?" : "Where to start without making mistakes?"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR 
                ? "Choisissez votre point d'entrée selon votre niveau de pratique actuel." 
                : "Choose your entry point according to your current experience level."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#0F261E]">
                  {isFR ? "Je découvre les plantes" : "Discovering plants"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isFR ? "Apprenez à reconnaître les familles moléculaires et leurs précautions d'usage." : "Learn to identify molecular families and safe botanical practices."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('herbier')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1C3F34] hover:text-white text-[#1C3F34] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Explorer l'Herbier" : "Explore Herbarium"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#0F261E]">
                  {isFR ? "Je veux ma 1ère recette" : "My first recipe"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isFR ? "Accédez à nos 10 protocoles d'initiation culinaire et cosmétique gratuits." : "Access our 10 free culinary and cosmetic beginner recipes."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('recettes')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1C3F34] hover:text-white text-[#1C3F34] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Voir les recettes" : "View recipes"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E7DFD3] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#0F261E]">
                  {isFR ? "J'ai déjà BloomLab" : "I own BloomLab"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isFR ? "Consultez la Bibliothèque Scientifique et les fiches techniques avancées." : "Consult the Scientific Library and advanced technical protocols."}
                </p>
              </div>
              <button
                onClick={() => onNavigate('library-landing')}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#1C3F34] hover:text-white text-[#1C3F34] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Accéder aux fiches" : "Access Library"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#1C3F34] text-white p-6 rounded-[28px] border border-[#1C3F34] flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg">
                  {isFR ? "Je veux m'équiper" : "I want to equip"}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {isFR ? "Passez commande avec l'offre de rentrée 2026 et démarrez dès cette semaine." : "Order with the 2026 back-to-school offer and start this week."}
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('commande');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFR ? "Choisir mon pack" : "Choose my pack"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Passerelle Atelier à Façon */}
          <div className="p-6 md:p-8 bg-white rounded-3xl border border-[#E7DFD3] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-wider text-[#D97706]">
                {isFR ? "Service d'extraction à façon" : "Custom extraction workshop"}
              </div>
              <p className="text-sm md:text-base text-slate-700 font-bold">
                {isFR 
                  ? "« Envie de tester sans la machine ? Confiez vos plantes à notre atelier d'extraction à façon. »" 
                  : "« Want to test without the machine? Entrust your herbs to our custom extraction workshop. »"}
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#FAF7F2] hover:bg-[#1C3F34] hover:text-white border border-[#E7DFD3] text-[#1C3F34] text-xs font-black rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {isFR ? "Contacter l'atelier" : "Contact the workshop"}
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 12 : CLOSING / OFFRES (SEUL BLOC PRIX DE LA PAGE) */}
      {/* Règle : Solo 239€, Pack Signature 289€ (inclut Duo Argiles avec disclaimer), */}
      {/* CODE RENTRÉE 2026 une seule fois, Logos paiement ici uniquement */}
      {/* ========================================================================= */}
      <section id="commande" className="py-16 md:py-24 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '11. Offres & Configurations' : isDE ? '11. Konfigurationen' : '11. Configurations & Offers'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F261E] tracking-tight">
              {isFR ? "Choisissez votre configuration BloomLab" : isDE ? "Wählen Sie Ihre BloomLab-Konfiguration" : "Choose your BloomLab configuration"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR 
                ? "Expédition prioritaire sous 24/48h & paiement sécurisé chiffré SSL." 
                : "Priority shipping within 24/48h & SSL encrypted secure payment."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Offre 1 : Solo 239€ */}
            <div className="bg-[#FAF7F2] p-8 md:p-10 rounded-[40px] border border-[#E7DFD3] space-y-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                    {isFR ? "L'essentiel pour débuter" : "The essentials"}
                  </span>
                  <h3 className="text-2xl font-black text-[#0F261E] pt-2">BloomLab® Solo</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {isFR ? "L'extracteur de précision avec son guide complet." : "Precision extractor with complete practical guide."}
                  </p>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="text-4xl font-black text-[#0F261E]">239€</div>
                  <div className="text-xl text-slate-400 line-through">289€</div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 px-2.5 py-0.5 rounded-full">
                    code: Rentrée 2026
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{isFR ? "Machine BloomLab® v2 (Cuve Inox 304)" : "BloomLab® v2 Machine (304 Stainless)"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{isFR ? "Guide Digital 100 recettes pas-à-pas" : "100-recipe Digital Guide"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{isFR ? "Garantie constructeur 1 an" : "1-Year Manufacturer Warranty"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{isFR ? "Paiement en 3x sans frais disponible" : "3x fee-free installment payment"}</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => selectPackage('solo', 239)} 
                className="w-full py-5 rounded-full bg-[#E7DFD3] text-[#0F261E] font-black text-lg hover:bg-[#D8CBB7] transition-colors cursor-pointer"
              >
                {isFR ? "Ajouter au panier — 239€" : "Add to Cart — 239€"}
              </button>
            </div>

            {/* Offre 2 : Pack Signature 289€ (PLUS POPULAIRE, inclut Duo Argiles) */}
            <div className="bg-[#1C3F34] p-8 md:p-10 rounded-[40px] text-white space-y-8 shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-[#D97706]/40">
              <div className="absolute top-0 right-0 bg-[#D97706] text-white text-[10px] font-black px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
                {isFR ? "PLUS POPULAIRE" : "MOST POPULAR"}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 px-3 py-1 rounded-full">
                    {isFR ? "Protocole Complet" : "Complete Protocol"}
                  </span>
                  <h3 className="text-2xl font-black pt-2">Pack Signature</h3>
                  <p className="text-white/70 text-sm font-medium">
                    {isFR ? "L'extracteur BloomLab® v2 + Duo Argiles minérales documentées." : "BloomLab® v2 extractor + documented Clay Duo."}
                  </p>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="text-4xl font-black text-white">289€</div>
                  <div className="text-xl text-white/50 line-through">349€</div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#D97706] text-white px-2.5 py-0.5 rounded-full">
                    code: Rentrée 2026
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#D97706] shrink-0" />
                    <span>{isFR ? "Machine BloomLab® v2 (Cuve Inox 304)" : "BloomLab® v2 Machine"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#D97706] shrink-0" />
                    <span>{isFR ? "Duo Argiles Bloom — Purification Systémique Zeolithe-Bentonite" : "Bloom Clay Duo — Systemic Purification Zeolite-Bentonite"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#D97706] shrink-0" />
                    <span>{isFR ? "Guide Digital 100 recettes pas-à-pas" : "100-recipe Digital Guide"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <Check className="w-5 h-5 text-[#D97706] shrink-0" />
                    <span>{isFR ? "Garantie constructeur 1 an & support prioritaire" : "1-Year Warranty & Priority Support"}</span>
                  </li>
                </ul>

                {/* Cadre Éducatif & Disclaimer Duo Argiles */}
                <div className="p-4 rounded-2xl bg-black/20 border border-white/10 text-xs text-white/70 leading-relaxed">
                  <p>
                    {isFR 
                      ? "📌 Note : Le Duo Argiles Bloom (Purification Systémique Zeolithe-Bentonite) est une matière première minérale documentée sélectionnée pour les synergies botaniques. Usage éducatif documenté dans le guide. Ne se substitue à aucun traitement médical." 
                      : "📌 Note: Bloom Clay Duo (Systemic Purification Zeolite-Bentonite) is a documented mineral raw material. Educational use as detailed in guide. Not a substitute for medical advice."}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => selectPackage('signature', 289)} 
                className="w-full py-5 rounded-full bg-[#D97706] hover:bg-[#B45309] active:bg-[#B45309] text-white font-black text-lg transition-colors shadow-lg cursor-pointer"
              >
                {isFR ? "Commander le Pack Signature — 289€" : "Order Signature Pack — 289€"}
              </button>
            </div>

          </div>

          {/* Réassurance & Logos de Paiement (ICI UNIQUEMENT) */}
          <div className="pt-10 border-t border-[#F3EEE6] space-y-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-xs text-slate-600 font-bold">
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 text-[#D97706]" />
                <span>{isFR ? "Expédition 24/48h" : "24/48h Shipping"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>{isFR ? "Garantie 1 an constructeur" : "1-Year Warranty"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>{isFR ? "Paiement en 3x sans frais" : "3x fee-free Klarna"}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {isFR ? "Paiement 100% Sécurisé & Chiffré SSL" : "100% Secure & SSL Encrypted Payment"}
              </span>
              <PaymentBadges />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOC 13 : FILET DE SORTIE (Journal Botanique + Newsletter Fusionnés) */}
      {/* Rôle : Rétention douce, CTA de remontée finale et signature */}
      {/* ========================================================================= */}
      <section id="sortie" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? '12. Transmission Continue' : isDE ? '12. Wissenstransfer' : '12. Continuous Knowledge'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F261E] tracking-tight">
              {isFR ? "Pas encore prêt ? Apprenez quand même." : isDE ? "Noch nicht bereit? Lernen Sie trotzdem." : "Not ready yet? Learn anyway."}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR 
                ? "Découvrez les analyses et protocoles de fond publiés chaque semaine par notre équipe scientifique." 
                : "Explore in-depth articles and weekly protocols published by our botanical team."}
            </p>
          </div>

          {/* 2 Articles du Journal Botanique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => onNavigate('articles', 'extraction-botanique-vs-huiles-essentielles-pourquoi-choisir-le-totum')}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD3] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100">
                <img 
                  src={shelvesImg} 
                  alt="Journal Botanique" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">Article de fond</span>
                  <h3 className="text-xl font-black text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                    {isFR ? "L'Art du Totum végétal : pourquoi extraire l'ensemble plutôt qu'une molécule isolée" : "The Art of Plant Totum"}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isFR ? "Comprendre la synergie naturelle entre flavonoïdes, tanins et terpènes pour préserver le plein potentiel végétal." : "Understanding the biological synergy of whole plant compounds."}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#1C3F34]">
                  <span>{isFR ? "Lire l'analyse" : "Read analysis"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('articles', 'macers-huileux-maison-les-5-erreurs-qui-detruisent-vos-actifs')}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD3] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100">
                <img 
                  src={herbsImg} 
                  alt="Herbier de précision" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">Guide pratique</span>
                  <h3 className="text-xl font-black text-[#0F261E] group-hover:text-[#1C3F34] transition-colors">
                    {isFR ? "Le choix des solvants nobles : quand utiliser l'eau, l'huile ou l'alcool titré ?" : "Choosing noble solvents"}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isFR ? "Table de polarité simplifiée pour réussir vos extractions sans gaspiller vos plantes précieuses." : "Simplified polarity guide for successful botanical extraction."}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#1C3F34]">
                  <span>{isFR ? "Consulter le guide" : "View guide"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Liens vers tous les articles & Blog Officiel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('extraction-botanique')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C3F34] hover:bg-[#D97706] text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>{isFR ? "Guide Pilier : Extraction Botanique" : "Pillar Guide: Botanical Extraction"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('articles')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] border-2 border-[#1C3F34] text-[#1C3F34] font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>{isFR ? "Consulter tous les articles du Journal" : "Explore all botanical articles"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="https://blog.bloombybotanik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E8F1EE] hover:bg-[#D8CBB7]/30 text-[#1C3F34] border border-[#D8CBB7] font-bold text-sm transition-all cursor-pointer"
            >
              <span>{isFR ? "Visiter le blog officiel (blog.bloombybotanik.com)" : "Visit official blog"}</span>
              <ArrowUpRight className="w-4 h-4 text-[#D97706]" />
            </a>
          </div>

          {/* Formulaire Newsletter Sans Engagement */}
          <div className="bg-[#1C3F34] text-white rounded-[36px] p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black">
                {isFR ? "La Lettre Botanique Hebdomadaire" : "The Weekly Botanical Letter"}
              </h3>
              <p className="text-white/70 text-sm max-w-xl mx-auto">
                {isFR 
                  ? "Recevez un protocole inédit chaque dimanche matin, sans publicité ni spam." 
                  : "Receive an exclusive botanical protocol every Sunday morning."}
              </p>
            </div>

            {newsletterSent ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-400/40 rounded-2xl text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>{isFR ? "Merci ! Vous recevrez le prochain protocole ce dimanche." : "Thank you! You will receive the next protocol."}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={isFR ? "Votre adresse email..." : "Your email address..."}
                  className="px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#D97706] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-black transition-colors cursor-pointer shrink-0"
                >
                  {isFR ? "S'inscrire" : "Subscribe"}
                </button>
              </form>
            )}

            <div className="text-[11px] text-white/40">
              {isFR ? "Désinscription en un clic. Vos données restent confidentielles." : "One-click unsubscribe. Your data remains strictly confidential."}
            </div>
          </div>

          {/* CTA Final de Remontée & Signature de Marque */}
          <div className="text-center pt-8 border-t border-[#E7DFD3] space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              {isFR ? "Prêt à maîtriser votre extraction botanique ?" : isDE ? "Bereit, Ihre botanische Extraktion zu meistern?" : "Ready to master your botanical extraction?"}
            </h3>
            <button
              onClick={() => {
                const el = document.getElementById('commande');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white font-black text-base shadow-xl transition-all cursor-pointer"
            >
              <span>{isFR ? "Rejoindre l'expérience BloomLab" : "Join the BloomLab experience"}</span>
              <ArrowRight className="w-5 h-5 text-[#D97706]" />
            </button>

            <div className="pt-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {isFR ? "L'Ingénierie au service du vivant." : "Engineering for life."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* BARRE FIXE COLLANTE (STICKY BAR) */}
      {/* Règle : Apparaît UNIQUEMENT après 60% de scroll : "BloomLab — 239€" + CTA ancre vers bloc 12 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#0F261E]/95 backdrop-blur-md border-t border-[#D97706]/30 text-white py-3 px-4 sm:px-8 shadow-2xl"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] shrink-0">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                    <span>BloomLab® — 239€</span>
                    <span className="text-[10px] uppercase font-bold bg-[#D97706] text-white px-2 py-0.5 rounded-full hidden sm:inline-block">
                      Rentrée 2026
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/60 hidden sm:block">
                    {isFR ? 'Expédition 24/48h · Garantie 1 an constructeur' : '24/48h Shipping · 1-Year Warranty'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('commande');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer shrink-0"
              >
                {isFR ? 'Commander' : isDE ? 'Bestellen' : 'Order Now'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TIROIR PANIER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#0F261E]">
                    {isFR ? "Mon Panier" : "My Cart"}
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E7DFD3] flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#0F261E]">{cartItem.title}</div>
                    <div className="text-xs text-slate-500">BloomLab® Precision Extractor</div>
                  </div>
                  <div className="font-black text-xl text-[#1C3F34]">{cartItem.price}€</div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isFR ? "Expédition prioritaire 24/48h incluse" : "Priority 24/48h shipping included"}</span>
                  </div>
                  <div className="text-emerald-700/80">
                    {isFR ? "Garantie constructeur 1 an & Satisfait ou remboursé 30 jours." : "1-year warranty & 30-day money-back guarantee."}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('checkout');
                  }} 
                  className="w-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white py-5 rounded-full font-black text-lg transition-colors cursor-pointer shadow-lg"
                >
                  {isFR ? "Procéder au Paiement" : "Proceed to Checkout"}
                </button>
                <div className="flex justify-center">
                  <PaymentBadges />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
