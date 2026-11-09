import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ExtractionKineticsChart from './components/ExtractionKineticsChart';
import AmazonSocialProof, { AmazonRatingBadge } from './components/AmazonSocialProof';
import { PaymentBadges } from './components/PaymentBadges';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';
import { MarqueeBanner } from './components/MarqueeBanner';
import { HeroVideo } from './components/HeroVideo';
import { AmazonActivationBanner } from './components/AmazonActivationBanner';
import { OfferSection, SelectedOfferData } from './components/OfferSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { StickyCTA } from './components/StickyCTA';
import { CartDrawer } from './components/CartDrawer';
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
  ArrowUpRight,
  Package,
  Flame,
  ShoppingBag
} from 'lucide-react';
import { translations as globalTranslations } from './translations';

const shelvesImg = "/images/modern_herbalist_shelves_1786699793560.jpg";
const herbsImg = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";

interface IndexBisContentProps {
  onNavigate?: (view: any, id?: string) => void;
  lang?: string;
  scrollToId?: string;
  onAddToCart?: (product: any, quantity?: number) => void;
}

type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

export default function IndexBisContent({ 
  onNavigate, 
  lang = 'fr', 
  scrollToId,
  onAddToCart 
}: IndexBisContentProps) {
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
  const [cartItem, setCartItem] = useState({ 
    title: "Kit de Démarrage Souveraineté — BloomLab® + 1 Kit Plantes", 
    price: 299,
    id: 'kit-souverainete'
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const scrollToOffers = () => {
    const el = document.getElementById('offres');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectOffer = (offer: SelectedOfferData) => {
    setCartItem({
      title: offer.name,
      price: offer.price,
      id: offer.id
    });

    if (onAddToCart) {
      onAddToCart({
        id: offer.id,
        name: offer.name,
        price: offer.price,
        selectedKitOption: offer.selectedKitOption,
        quantity: 1
      }, 1);
    }

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
    <GlossaryProvider pageKey="home">
    <div className="bg-[#FAF7F2] text-slate-800 font-sans antialiased selection:bg-[#A8B8A0] selection:text-white w-full max-w-full overflow-x-hidden">

      {/* ========================================================================= */}
      {/* BANDEAU ANNONCE DÉFILANT */}
      {/* ========================================================================= */}
      <MarqueeBanner lang={lang} />

      {/* ========================================================================= */}
      {/* 1. HERO AVEC COMPOSANT VIDÉO DÉMONSTRATION RÉACTIVE */}
      {/* ========================================================================= */}
      <HeroVideo
        onScrollToOffers={scrollToOffers}
        onDiscoverMore={() => {
          const el = document.getElementById('constat');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
      />

      {/* ========================================================================= */}
      {/* BANDEAU DE RÉASSURANCE RETENTION AMAZON */}
      {/* ========================================================================= */}
      <AmazonActivationBanner
        onActivate={() => onNavigate('activation')}
        lang={lang}
      />

      {/* ========================================================================= */}
      {/* 2. LE PROBLÈME / LE CONSTAT (Pourquoi les méthodes traditionnelles échouent) */}
      {/* ========================================================================= */}
      <section id="constat" className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C8AB8A] block">
              {isFR ? "Constat Biochimique & Cinétique" : "Biochemical & Kinetic Reality"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#3E4A3D] leading-tight">
              {isFR 
                ? "Pourquoi le bain-marie détruit l'intelligence moléculaire de vos plantes" 
                : isDE 
                ? "Warum herkömmliche Wasserbäder die pflanzlichen Moleküle zerstören" 
                : "Why traditional water baths destroy your plants' molecular intelligence"}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isFR 
                ? "L'extraction n'est pas de la cuisine. C'est un transfert de masse régi par la thermodynamique. Sans contrôle de la polarité et de la température, vous ne buvez que l'ombre de la plante." 
                : "Botanical extraction is not cooking. It is a mass transfer governed by thermodynamics. Without polarity and thermal control, you lose the essence of the plant."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#3E4A3D]">
                  {isFR ? "1. Dénaturation Thermique" : "1. Thermal Denaturation"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isFR 
                    ? "Les flavonoïdes et terpènes volatils sont thermolabiles. Au-delà de 45-60°C (le seuil de l'eau frémissante), les liaisons moléculaires se brisent. L'activité anti-inflammatoire s'effondre, ne laissant qu'un goût amer." 
                    : "Volatile terpenes and flavonoids are thermolabile. Boiling water breaks molecular bonds and destroys beneficial activities."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-rose-700 flex items-center gap-2">
                <X className="w-4 h-4"/> {isFR ? "Perte d'activité : jusqu'à 80%" : "Activity loss: up to 80%"}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#3E4A3D]">
                  {isFR ? "2. Loi de Fick & Couche Limite" : "2. Fick's Law & Boundary Layer"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isFR 
                    ? "Sans agitation calibrée, une couche limite de solvant saturé se forme autour de la feuille, bloquant la diffusion (Loi de Fick). Remuer avec une cuillère est cinétiquement inefficace pour extraire le Totum." 
                    : "Without continuous calibrated stirring, a saturated boundary layer suffocates botanical diffusion."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-amber-700 flex items-center gap-2">
                <X className="w-4 h-4"/> {isFR ? "Rendement d'extraction : < 15%" : "Extraction yield: < 15%"}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#3E4A3D]/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#3E4A3D]">
                  {isFR ? "3. Ignorance de la Polarité" : "3. Solvent Polarity Blindspot"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isFR 
                    ? "L'eau (polaire) n'extrait pas les résines ni les alcaloïdes lipophiles. L'huile seule n'extrait pas les mucilages. Les méthodes traditionnelles ignorent le Séquençage A/B des solvants." 
                    : "Water cannot extract lipophilic resins. Oil cannot dissolve mucilages. Traditional methods ignore dual solvent sequencing."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-2">
                <X className="w-4 h-4"/> {isFR ? "Spectre moléculaire : Incomplet" : "Molecular spectrum: Incomplete"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LA SOLUTION : LA BLOOMLAB (Technologie de Séquençage Actif A/B) */}
      {/* ========================================================================= */}
      <section id="solution" className="py-20 md:py-28 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'La Solution Technologique' : isDE ? 'Die technologische Lösung' : 'The Technological Solution'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E4A3D] tracking-tight">
              {isFR 
                ? "La BloomLab® & le Séquençage Actif A/B" 
                : isDE 
                ? "BloomLab® & Sequenzielle A/B-Extraktion" 
                : "BloomLab® & Active A/B Extraction Sequencing"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "La BloomLab orchestre la séparation et la capture des molécules selon leurs températures et solvants d'affinité pour révéler le Totum végétal complet de vos remèdes naturels." 
                : "BloomLab precisely orchestrates temperature, agitation, and dual-solvent extraction to deliver the intact whole-plant Totum."}
            </p>
          </div>

          {/* Les 3 Paliers Thermiques A/B */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                {isFR ? "Phase A · Hydrosoluble" : "Phase A · Water-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#3E4A3D]">70 - 75°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Extraction douce des tanins protecteurs, mucilages et polyphénols solubles dans l'eau sans dépasser le seuil critique de cuisson." 
                  : "Gentle extraction of tannins, mucilages, and polyphenols without scorching delicate plant cell walls."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                {isFR ? "Phase B · Liposoluble" : "Phase B · Fat-Soluble"}
              </div>
              <div className="text-3xl font-black text-[#3E4A3D]">45 - 55°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Préservation intégrale des acides gras nobles, huiles essentielles et terpènes volatils dans les solvants huileux et alcooliques." 
                  : "Integral preservation of fatty acids, essential oils, and volatile terpenes in oil and alcohol."}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[32px] border border-[#E7DFD3] space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                {isFR ? "Activation Thermique" : "Thermal Activation"}
              </div>
              <div className="text-3xl font-black text-[#3E4A3D]">121°C</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Palier de décarboxylation et d'ouverture des résines denses selon protocole spécifique, programmé avec précision de sécurité." 
                  : "Controlled step for decarboxylation and resin release according to scientific protocols."}
              </p>
            </div>
          </div>

          {/* 4 Caractéristiques Matérielles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Microscope className="w-6 h-6 text-[#A8B8A0]" />
              <div className="text-sm font-black text-[#3E4A3D]">Inox 304 Alimentaire</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Cuve neutre inerte, zéro transfert métallique ni relargage plastique." : "Food-grade 304 stainless steel inert tank."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Thermometer className="w-6 h-6 text-[#A8B8A0]" />
              <div className="text-sm font-black text-[#3E4A3D]">Précision ±0,5°C</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Sonde numérique continue prévenant toute dégradation thermique des molécules." : "Digital continuous sensor preventing overheating."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Activity className="w-6 h-6 text-[#A8B8A0]" />
              <div className="text-sm font-black text-[#3E4A3D]">Agitation Cyclique</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Brassage régulier automatisé maximisant l'échange solvant-plante." : "Automated cyclic stirring optimizing solvent-plant contact."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F3EEE6] shadow-sm space-y-2">
              <Lock className="w-6 h-6 text-[#A8B8A0]" />
              <div className="text-sm font-black text-[#3E4A3D]">Milieu Clos Hermétique</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isFR ? "Chambre étanche piégeant 100% des arômes et terpènes volatils." : "Airtight chamber trapping all volatile terpenes and aromas."}
              </div>
            </div>
          </div>

          {/* Cinétique d'extraction illustrative */}
          <div className="pt-4">
            <ExtractionKineticsChart lang={lang as 'fr' | 'en' | 'de'} />
          </div>

          {/* 5 Étapes Simples */}
          <div className="pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h3 className="text-2xl font-black text-[#3E4A3D]">
                {isFR ? "5 étapes simples, zéro improvisation" : "5 simple steps, zero guesswork"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {isFR ? "Une prise en main immédiate dès le premier jour." : "Immediate onboarding from day one."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { num: "01", title: isFR ? "Choisir la recette" : "Choose recipe", desc: isFR ? "Sélectionnez votre protocole dans le guide." : "Select your protocol in the guide." },
                { num: "02", title: isFR ? "Peser les plantes" : "Prepare herbs", desc: isFR ? "Placez vos herbes dans le panier d'extraction." : "Weigh herbs and place in the basket." },
                { num: "03", title: isFR ? "Régler temps & t°" : "Set parameters", desc: isFR ? "Associez durée, température et solvant noble." : "Set temperature, time, and solvent." },
                { num: "04", title: isFR ? "Lancer le cycle" : "Run cycle", desc: isFR ? "BloomLab régule et brasse automatiquement." : "BloomLab autonomously controls heat." },
                { num: "05", title: isFR ? "Filtrer & savourer" : "Filter & enjoy", desc: isFR ? "Recueillez votre extrait pur et actif." : "Collect your pure, active extract." }
              ].map((step, idx) => (
                <div key={idx} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                  <div className="text-2xl font-black text-[#C8AB8A]">{step.num}</div>
                  <div className="text-sm font-bold text-[#3E4A3D]">{step.title}</div>
                  <div className="text-xs text-slate-600 leading-snug">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LES OFFRES (Positionnées immédiatement après la solution !) */}
      {/* ========================================================================= */}
      <OfferSection
        onSelectOffer={handleSelectOffer}
        lang={lang}
      />

      {/* ========================================================================= */}
      {/* 5. PREUVE SOCIALE (Avis enrichis, carrousel, Avant/Après, widget vérifié) */}
      {/* ========================================================================= */}
      <TestimonialsCarousel lang={lang} />

      {/* Preuve sociale cross-canal Amazon */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AmazonSocialProof lang={lang as 'fr' | 'en' | 'de'} onNavigate={onNavigate} />
      </div>

      {/* ========================================================================= */}
      {/* 6. LES 3 UNIVERS (Culinaire, Cosmétique, Phytothérapie) */}
      {/* ========================================================================= */}
      <section id="univers" className="py-20 md:py-28 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Polyvalence Totale' : 'Total Versatility'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E4A3D] tracking-tight">
              {isFR 
                ? "De votre cuisine à l'apothicairerie : 3 univers de pratique" 
                : "From your kitchen to home apothecary: 3 practice realms"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Un seul appareil d'extraction de précision qui grandit avec votre savoir-faire au fil des saisons." 
                : "A single precision instrument that evolves with your botanical craft."}
            </p>
          </div>

          {/* Sélecteur d'Univers Interactif */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'culinaire', label: isFR ? "1. Atelier Culinaire" : "1. Culinary Workshop", icon: ChefHat, desc: isFR ? "Huiles parfumées, beurres infusés, vinaigres botaniques" : "Infused oils, compound butters, botanical vinegars" },
              { id: 'cosmetique', label: isFR ? "2. Cosmétique Vivante" : "2. Botanical Cosmetics", icon: Droplets, desc: isFR ? "Sérums précieux, macérats ciblés, baumes purs sans conservateur" : "Precious face serums, targeted macerates, pure balms" },
              { id: 'phytotherapie', label: isFR ? "3. Herboristerie Systémique" : "3. Systemic Herbalism", icon: Activity, desc: isFR ? "Élixirs adaptogènes, teintures concentrées, reset homéostatique" : "Adaptogenic elixirs, concentrated tinctures, homeostatic reset" },
            ].map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveUniverse(u.id as UniverseType)}
                className={`p-6 rounded-[28px] border text-left transition-all cursor-pointer ${
                  activeUniverse === u.id
                    ? 'bg-[#A8B8A0] text-[#0F261E] border-[#A8B8A0] shadow-xl ring-2 ring-[#C8AB8A]/50'
                    : 'bg-[#FAF7F2] text-slate-800 border-[#E7DFD3] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${activeUniverse === u.id ? 'bg-[#C8AB8A] text-[#0F261E]' : 'bg-white text-[#A8B8A0]'}`}>
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
                  <div className="inline-block px-3 py-1 bg-[#C8AB8A]/15 text-[#C8AB8A] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 1 · Gastronomie & Arômes" : "Level 1 · Gastronomy & Aromas"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
                    {isFR ? "L'Art Culinaire sans amertume ni surchauffe" : "Culinary Art without bitterness"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Révélez l'intensité pure des herbes fraîches et aromates. L'extraction thermique douce empêche l'apparition des composés brûlés et acides." 
                      : "Reveal pure aromatics without scorching delicate herbs."}
                  </p>
                  
                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#C8AB8A] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole culinaire :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#3E4A3D]">
                      {isFR ? "Huile d'olive infusée au Romarin, Piment doux & Ail" : "Rosemary, Mild Chili & Garlic Infused Olive Oil"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">38°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">1h 30m</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">{isFR ? "Huile d'olive" : "Olive oil"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('culinaire')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#A8B8A0] hover:text-[#C8AB8A] transition-colors"
                  >
                    <span>{isFR ? "Explorer les recettes culinaires" : "Explore culinary recipes"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'cosmetique' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#C8AB8A]/15 text-[#C8AB8A] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 2 · Cosmétique Vivante" : "Level 2 · Living Cosmetics"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
                    {isFR ? "Formulations Botaniques Cutanées Pures" : "Pure Botanical Skin Formulations"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Concevez vos propres sérums et macérats de soin sur-mesure. Les acides gras essentiels et antioxydants végétaux sont conservés intacts sans solvants pétrochimiques." 
                      : "Formulate your own custom serums and restorative macerates."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#C8AB8A] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole cosmétique :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#3E4A3D]">
                      {isFR ? "Sérum précieux Passiflore, Rose de Damas & Jojoba" : "Passionflower, Damask Rose & Jojoba Serum"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">42°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">2h 00m</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">{isFR ? "Huile de Jojoba" : "Jojoba oil"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('cosmetiques')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#A8B8A0] hover:text-[#C8AB8A] transition-colors"
                  >
                    <span>{isFR ? "Découvrir la cosmétique maison" : "Discover homemade cosmetics"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeUniverse === 'phytotherapie' && (
                <>
                  <div className="inline-block px-3 py-1 bg-[#C8AB8A]/15 text-[#C8AB8A] text-xs font-black uppercase tracking-wider rounded-full">
                    {isFR ? "Niveau 3 · Phytothérapie Systémique" : "Level 3 · Systemic Phytotherapy"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
                    {isFR ? "Herboristerie Clinique & Reset Homéostatique" : "Clinical Herbalism & Reset"}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {isFR 
                      ? "Accédez aux protocoles de Reset Homéostatique (84 jours). Ciblez précisément vos terrains biologiques avec des extraits hyper-concentrés et biodisponibles." 
                      : "Access documented 84-day systemic terrain protocols with hyper-concentrated botanical extracts."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
                    <div className="text-xs font-black text-[#C8AB8A] uppercase tracking-wider">
                      {isFR ? "Exemple de protocole de terrain :" : "Sample protocol:"}
                    </div>
                    <div className="font-black text-lg text-[#3E4A3D]">
                      {isFR ? "Élixir Adaptogène Sommeil & Clarté (Mélisse & Ashwagandha)" : "Sleep & Mind Adaptogen Elixir"}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6] text-center">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">68°C</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Température" : "Temp"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">45 min</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Durée" : "Time"}</span>
                      </div>
                      <div className="p-2 bg-[#FAF7F2] rounded-xl text-xs">
                        <span className="font-black text-[#A8B8A0] block">{isFR ? "Eau filtrée" : "Purified water"}</span>
                        <span className="text-[10px] text-slate-500">{isFR ? "Solvant" : "Solvent"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('library')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#A8B8A0] hover:text-[#C8AB8A] transition-colors"
                  >
                    <span>{isFR ? "Explorer la bibliothèque de protocoles" : "Explore protocol library"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E7DFD3] h-[340px] sm:h-[420px]">
              <img 
                src={activeUniverse === 'culinaire' ? herbsImg : activeUniverse === 'cosmetique' ? bloomSoinsImg : shelvesImg} 
                alt="Univers de pratique BloomLab" 
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
      {/* 7. COMPARATIF BAIN-MARIE VS BLOOMLAB */}
      {/* ========================================================================= */}
      <section id="comparatif" className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Comparatif Rigoureux' : 'Rigorous Comparison'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E4A3D] tracking-tight">
              {isFR 
                ? "BloomLab® vs Bain-Marie : le comparatif objectif" 
                : "BloomLab® vs Bain-Marie: An Objective Comparison"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isFR ? "Comprendre pourquoi la précision thermique transforme vos préparations." : "Understand why thermal precision revolutionizes herbal preparations."}
            </p>
          </div>

          <div className="bg-white rounded-[32px] border border-[#E7DFD3] overflow-hidden shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FAF7F2] border-b border-[#E7DFD3] p-6 text-xs font-black uppercase tracking-widest text-[#3E4A3D]">
              <div className="hidden md:block">{isFR ? "Paramètre d'extraction" : "Parameter"}</div>
              <div className="text-red-800">{isFR ? "Bain-marie traditionnel / Casserole" : "Traditional Bain-Marie"}</div>
              <div className="text-[#A8B8A0] mt-2 md:mt-0 font-extrabold">{isFR ? "Extracteur BloomLab®" : "BloomLab® Extractor"}</div>
            </div>

            <div className="divide-y divide-[#F3EEE6] text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center">
                <div className="font-bold text-[#3E4A3D]">{isFR ? "Contrôle thermique" : "Thermal control"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Température aléatoire (+60°C à 100°C), surchauffe et dégradation." : "Uncontrolled heat with thermal degradation."}</div>
                <div className="font-bold text-[#A8B8A0] text-xs sm:text-sm">{isFR ? "Régulation au degré près (±0,5°C) adaptée au profil de chaque végétal." : "Degree-precise control (±0.5°C) preserving fragile terpenes."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center bg-[#FAF7F2]/40">
                <div className="font-bold text-[#3E4A3D]">{isFR ? "Contact avec l'air & oxydation" : "Air exposure"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Oxydation à l'air libre et évaporation des terpènes aromatiques volatils." : "Open-air oxidation and rapid aroma evaporation."}</div>
                <div className="font-bold text-[#A8B8A0] text-xs sm:text-sm">{isFR ? "Environnement clos hermétique piégeant 100% des vapeurs aromatiques." : "Airtight closed vessel trapping 100% of volatile fractions."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center">
                <div className="font-bold text-[#3E4A3D]">{isFR ? "Agitation & percolation" : "Stirring"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Agitation manuelle irrégulière ou macération statique à faible rendement." : "Irregular manual stirring or static weak diffusion."}</div>
                <div className="font-bold text-[#A8B8A0] text-xs sm:text-sm">{isFR ? "Agitation cyclique automatisée assurant un échange continu plante-solvant." : "Automated cyclic stirring ensuring continuous exchange."}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-2 md:gap-4 items-center bg-[#FAF7F2]/40">
                <div className="font-bold text-[#3E4A3D]">{isFR ? "Reproductibilité" : "Reproducibility"}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{isFR ? "Aléatoire d'un lot à l'autre, dosage impossible à reproduire." : "Unpredictable results, impossible to repeat."}</div>
                <div className="font-bold text-[#A8B8A0] text-xs sm:text-sm">{isFR ? "Protocole documenté, précis et parfaitement reproductible." : "Documented, reproducible protocol every single time."}</div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={scrollToOffers}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#3E4A3D] hover:bg-[#2D372C] text-white rounded-full font-black text-sm sm:text-base shadow-xl cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isFR ? "Je commande ma BloomLab®" : "Order my BloomLab®"}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ (Foire Aux Questions) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 md:py-28 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Foire Aux Questions' : 'FAQ'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#3E4A3D] tracking-tight">
              {isFR 
                ? "Tout ce que vous devez savoir avant de commander" 
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
              },
              {
                q: isFR ? "Quelles sont les conditions de livraison et de garantie ?" : "What are the shipping and warranty conditions?",
                a: isFR ? "Toute commande est expédiée sous 24/48h ouvrées avec numéro de suivi Colissimo. Vous bénéficiez d'une garantie constructeur de 1 an ainsi que de notre garantie 30 jours satisfait ou remboursé." : "Orders ship within 24/48h with tracking. You enjoy a 1-year warranty and a 30-day money-back guarantee."
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-[#F3EEE6] rounded-2xl overflow-hidden transition-all bg-[#FAF7F2]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-[#3E4A3D] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#C8AB8A] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
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
      {/* 9. CONTENU ÉDITORIAL / HERBIER / BLOG / SORTIE */}
      {/* ========================================================================= */}
      <section id="connaissance" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[10px] font-black uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Savoirs Botaniques & Pédagogie' : 'Botanical Knowledge'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E4A3D] tracking-tight">
              {isFR 
                ? "L'Herbier Scientifique Bloom : Connaître vos plantes" 
                : "The Bloom Scientific Herbarium: Know Your Plants"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {isFR 
                ? "Chaque plante médicinale possède son code d'extraction thermique optimal. Explorez notre herbier interactif pour choisir vos prochaines préparations." 
                : "Every medicinal plant holds its optimal extraction thermal code. Explore our interactive herbarium."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#A8B8A0] text-[#C8AB8A] flex items-center justify-center font-black">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#3E4A3D]">
                {isFR ? "Quelle partie utiliser ?" : "Which part to use?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Feuilles, sommités fleuries, écorces ou racines : chaque organe végétal concentre des familles moléculaires spécifiques aux résistances thermiques opposées."
                  : "Leaves, flowering tops, barks or roots: each plant organ concentrates distinct molecular families."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#A8B8A0] text-[#C8AB8A] flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#3E4A3D]">
                {isFR ? "Quelles précautions ?" : "Which precautions?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Contre-indications, choix des solvants nobles et respect strict des dosages adaptés au terrain biologique sans jamais improviser."
                  : "Contraindications, solvent choices, and strict adherence to safe daily dosages."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-[#E7DFD3] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#A8B8A0] text-[#C8AB8A] flex items-center justify-center font-black">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#3E4A3D]">
                {isFR ? "Comment l'extraire ?" : "How to extract?"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isFR 
                  ? "Hydrosoluble, liposoluble ou hydroalcoolique : la température ciblée et le brassage doux déterminent la capture intégrale du Totum."
                  : "Water, oil or alcohol: degree-precise temperature determines full Totum capture."}
              </p>
            </div>
          </div>

          <div className="text-center pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('herbier')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
            >
              <span>{isFR ? "Consulter l'Herbier Complet" : "Browse Herbarium"}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-[#D8CBB7] text-[#3E4A3D] font-bold text-sm sm:text-base shadow-xs transition-all cursor-pointer"
            >
              <span>{isFR ? "Lire le Journal Botanique" : "Read Journal"}</span>
              <BookOpen className="w-4 h-4 text-[#C8AB8A]" />
            </button>
          </div>

          {/* Newsletter Box */}
          <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#E7DFD3] text-center max-w-2xl mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#C8AB8A]/15 text-[#C8AB8A] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-[#3E4A3D]">
              {isFR ? "Recevez nos protocoles d'extraction chaque mois" : "Receive our monthly extraction protocols"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isFR 
                ? "Dossiers botaniques, nouveaux protocoles de saison et invitation aux ateliers privés d'apothicairerie." 
                : "Botanical guides, seasonal recipes, and private workshop invitations."}
            </p>
            {!newsletterSent ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={isFR ? "Votre email..." : "Your email..."}
                  className="flex-1 px-4 py-3 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] text-sm text-[#3E4A3D]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
                >
                  {isFR ? "S'inscrire" : "Subscribe"}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                {isFR ? "Merci ! Votre inscription a bien été enregistrée." : "Thank you! You have subscribed."}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* STICKY CTA FLOATING (Desktop Pill & Mobile Fixed Bottom Bar) */}
      {/* ========================================================================= */}
      <StickyCTA
        targetSectionId="offres"
        onAction={scrollToOffers}
        lang={lang}
      />

      {/* ========================================================================= */}
      {/* TIROIR PANIER LATÉRAL (DRAWER) */}
      {/* ========================================================================= */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          onNavigate('checkout');
        }}
        cartItem={cartItem}
        lang={lang}
      />

    </div>
    </GlossaryProvider>
  );
}
