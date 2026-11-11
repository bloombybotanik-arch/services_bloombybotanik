import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';
import ExtractionCalculator from './components/ExtractionCalculator';
import { TooltipLexique } from './components/TooltipLexique';

const bloomLabImg = "/img/produit/bloomlab-1200x1200.jpg";

export default function PillarExtraction({ lang, onNavigate }: { lang: Language, onNavigate: (v: any, productId?: string) => void }) {
  const t = translations[lang];
  const isFR = lang === 'fr';

  return (
    <div className="flex-1 bg-[#FAF7F2]">
      {/* Hero Section Vert Forêt avec Fil d'Ariane */}
      <section 
        className="w-full bg-[#1E2E25] text-white border-b border-white/10 relative overflow-hidden"
      >
        {/* Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
        <div className="w-full bg-[#0F261E] border-b border-white/10 px-4 md:px-8 py-3.5 relative z-20">
          <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm text-white">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  {isFR ? "Accueil" : "Home"}
                </button>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  {isFR ? "La Méthode A/B" : "The A/B Method"}
                </button>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-white font-bold" aria-current="page">
                {isFR ? "Guide de l'extraction" : "Extraction Guide"}
              </li>
            </ol>
          </nav>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full relative">
            <OptimizedImage 
              src={bloomLabImg} 
              width={1200}
              height={800}
              className="w-full h-full object-cover opacity-15" 
              alt={isFR ? "Extraction botanique : guide complet des méthodes, solvants et paramètres" : "Botanical extraction guide"} 
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 text-white shadow-xs"
          >
            <Leaf className="w-3.5 h-3.5 text-[#E8772E]" />
            {isFR ? "Guide Pilier • Autonomie Botanique" : "Pillar Guide • Botanical Autonomy"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 font-sans tracking-tight leading-tight text-white"
          >
            {isFR ? (
              <>Guide Complet : Extraction Botanique à Domicile</>
            ) : lang === 'de' ? (
              <>Kompletter Guide: Botanische Extraktion für zu Hause</>
            ) : (
              <>Complete Guide: Botanical Extraction at Home</>
            )}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-3xl mx-auto font-light"
          >
            {isFR 
              ? <>Infusion, décoction, macération, <TooltipLexique terme="sequencage-ab">extraction séquentielle</TooltipLexique> : comparez les méthodes, choisissez le bon solvant et maîtrisez température et agitation pour libérer le <TooltipLexique terme="totum">Totum</TooltipLexique> végétal.</>
              : "Infusion, decoction, maceration, sequential extraction: compare methods, choose the right solvent and master temperature and agitation to unlock the botanical Totum."}
          </motion.div>

          {/* Boutons d'action harmonisés */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('machine')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>{isFR ? "Découvrir BloomLab®" : "Discover BloomLab®"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('simulateur');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E2E25] font-bold text-sm border border-white/20 transition-all shadow-xs"
            >
              <span>{isFR ? "Calculateur & Paramètres" : "Calculator & Settings"}</span>
              <FlaskConical className="w-4 h-4 text-[#E8772E]" />
            </button>
          </div>
        </div>
      </section>

      {/* Sommaire Rapide */}
      <section className="max-w-4xl mx-auto -mt-12 px-6 mb-20 relative z-20">
        <div 
          className="rounded-3xl p-8 shadow-xl border grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0FDF4', color: '#166534' }}>
              <FlaskConical className="w-6 h-6 text-[#166534]" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{isFR ? "Totum Végétal" : "Botanical Totum"}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{isFR ? "Préservez l'intégralité du profil moléculaire végétal." : "Preserve the complete molecular profile."}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7', color: '#E8772E' }}>
              <Thermometer className="w-6 h-6 text-[#E8772E]" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{isFR ? "Thermorégulation" : "Thermoregulation"}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{isFR ? "Stabilité thermique rigoureuse sans dénaturation." : "Rigorous thermal stability without breakdown."}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FAF5FF', color: '#9333EA' }}>
              <ShieldCheck className="w-6 h-6 text-[#9333EA]" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{isFR ? "Inox 304 Inerte" : "Inert 304 Stainless Steel"}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{isFR ? "Cuve alimentaire inerte, facile à nettoyer et durable." : "Inert food-grade bowl, easy to clean and durable."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">

        {/* Section 1: Qu'est-ce que l'extraction botanique ? */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>1</span>
            {isFR ? "Infusion Botanique vs Bain-Marie : Principes de l'Extraction" : "Botanical Infusion vs Water Bath: Extraction Principles"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Définition et principes fondamentaux" : "Definition and fundamental principles"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "L'extraction botanique est le processus physique et chimique par lequel un solvant (eau, huile, glycérine ou alcool) dissout et capture les principes actifs contenus dans la matrice d'une plante. Loin d'une simple dissolution passive, une extraction réussie repose sur un équilibre rigoureux entre le choix du solvant, le gradient de concentration, la température et la cinétique d'agitation."
                : "Botanical extraction is the physical and chemical process through which a solvent dissolves and captures the active compounds inside a plant matrix."}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "Chaque plante recèle des composés hydrophiles (solubles dans l'eau) et lipophiles (solubles dans les corps gras). Comprendre ces affinités permet de concevoir des préparations botaniques riches, équilibrées et fidèles à la plante d'origine."
                : "Every plant contains hydrophilic and lipophilic components. Mastering these affinities allows creating balanced, faithful botanical preparations."}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#E7DFD3' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Différence avec l'infusion classique" : "Difference with classic infusion"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>L'infusion classique consiste à verser de l'eau chaude sur une plante et à laisser reposer. Si elle est agréable et accessible, elle présente deux limites majeures : l'eau bouillante détruit les fractions <TooltipLexique terme="thermolabile">thermolabiles</TooltipLexique> fragiles, et l'absence d'agitation continue crée une couche de saturation autour des feuilles, limitant le rendement d'extraction.</>
                : "Classic infusion pours boiling water over a plant. While traditional, boiling water denatures fragile compounds, and the absence of agitation limits molecular transfer."}
            </p>
          </div>
        </section>

        {/* Section 2: Pourquoi l'extraction séquentielle change tout */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#F0F5F2', borderColor: '#D6E3DC' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>2</span>
            {isFR ? "Pourquoi l'extraction séquentielle change tout" : "Why sequential extraction changes everything"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Les limites des méthodes traditionnelles" : "The limitations of traditional methods"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "Les méthodes traditionnelles à solvant unique sont confrontées à une contradiction physique : un solvant aqueux ne peut pas solubiliser les résines ou les flavonoïdes lipophiles, tandis qu'un corps gras ne capte pas les minéraux ou les mucilages. Tenter d'extraire une plante entière en une seule étape mène souvent à un profil moléculaire incomplet."
                : "Single-solvent traditional methods face a physical contradiction: an aqueous solvent cannot dissolve lipophilic resins, while oils cannot capture water-soluble minerals."}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#D6E3DC' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Le défi du totum végétal" : "The challenge of the plant totum"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>Le <TooltipLexique terme="totum">totum</TooltipLexique> désigne l'ensemble des substances actives et secondaires contenues dans le végétal vivant, agissant en <TooltipLexique terme="synergie">synergie</TooltipLexique> naturelle. Pour </>
                : "The totum represents all active compounds acting in synergy. To "}
              <button 
                onClick={() => onNavigate('totum-vegetal')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {isFR ? "comprendre le totum végétal et sa synergie" : "understand the plant totum and its synergy"}
              </button>
              {isFR 
                ? ", il est indispensable de préserver ces interactions moléculaires sans isoler artificiellement une seule molécule chimique."
                : ", it is essential to preserve these molecular interactions."}
            </p>
          </div>
        </section>

        {/* Section 3: Phase A / Décoctions de Racines */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#F2F8F6', borderColor: '#D4E5DC' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>3</span>
            {isFR ? "Décoctions de Racines & Phase A Hydrosoluble" : "Root Decoctions & Water-Soluble Phase A"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Solvants adaptés : eau, glycérine" : "Suitable solvents: water, glycerin"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>La Phase A mobilise des solvants à polarité élevée. L'eau déminéralisée ou filtrée extrait les tanins, les <TooltipLexique terme="polyphenols">polyphénols</TooltipLexique> <TooltipLexique terme="hydrosoluble">hydrosolubles</TooltipLexique> et les mucilages. La glycérine végétale, solvant doux et émollient, capture les flavonoïdes tout en stabilisant la préparation dans le temps.</>
                : "Phase A uses high polarity solvents such as filtered water or vegetable glycerin."}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#D4E5DC' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Températures selon la matrice végétale" : "Temperatures according to plant matrix"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "La sensibilité thermique varie considérablement selon la partie de la plante utilisée :"
                : "Thermal sensitivity varies widely depending on the plant part used:"}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">45°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>Fleurs tendres</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>Camomille, mauve, calendula. Préserve les mucilages et arômes subtils.</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">55°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>Feuilles & tiges</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>Menthe, mélisse, ortie. Assure une diffusion sans surchauffe enzymatique.</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">60°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>Écorces & racines</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>Cannelle, réglisse, gingembre. Pénètre les tissus fibreux denses.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Phase B / Macération Huileuse Précise */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#FDF8EE', borderColor: '#EBDCBF' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>4</span>
            {isFR ? "Macération Huileuse Précise : Phase B Liposoluble" : "Precise Oil Maceration: Lipid-Soluble Phase B"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Solvants adaptés : alcool, huiles" : "Suitable solvents: alcohol, oils"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "La Phase B mobilise des solvants apolaires ou semi-polaires. Les huiles végétales stables (jojoba, sésame, olive) sont idéales pour "
                : "Phase B leverages lipid or hydroalcoholic solvents. Stable vegetable oils are ideal to "}
              <button 
                onClick={() => onNavigate('huile-infusee')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {isFR ? "réussir une huile infusée maison" : "succeed in making homemade infused oil"}
              </button>
              {isFR 
                ? ". En milieu hydroalcoolique dosé avec rigueur, l'alcool éthylique permet de "
                : ". With accurate hydroalcoholic dilution, alcohol allows you to "}
              <button 
                onClick={() => onNavigate('teinture-mere')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {isFR ? "préparer une teinture mère hydroalcoolique" : "prepare a hydroalcoholic mother tincture"}
              </button>
              {isFR ? " capable de capter les résines et principes amers." : " capable of capturing dense resins."}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#EBDCBF' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "Préservation des fractions thermolabiles" : "Preserving thermolabile fractions"}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? "Les terpènes aromatiques et les acides gras insaturés rancissent ou s'évaporent rapidement sous l'effet des UV et d'une chaleur incontrôlée. Une extraction fermée à température modérée garantit l'intégrité de ces molécules protectrices."
                : "Volatile terpenes and unsaturated fatty acids evaporate or oxidize quickly under direct light and excess heat. Closed extraction at controlled temperature protects them."}
            </p>
          </div>
        </section>

        {/* Section 5: Teintures & Teintures-Mères */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>5</span>
            {isFR ? "Teintures & Teintures-Mères : Paramètres Critiques d'Extraction" : "Tinctures & Mother Tinctures: Critical Extraction Parameters"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#FEF3C7', color: '#E8772E' }}>
                  <Thermometer className="w-6 h-6 text-[#E8772E]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>1. Température stable</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {isFR ? "Contrôle précis sans pics thermiques pour respecter les seuils de tolérance de chaque famille végétale." : "Precise control without heat spikes to preserve each plant family."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
                  <Activity className="w-6 h-6 text-[#166534]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>2. Agitation cinétique</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {isFR ? "Le vortex continu brise la couche de saturation statique et renouvelle le solvant au cœur des tissus." : "Continuous movement breaks the static boundary layer and renews solvent contact."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#FFF1F2', borderColor: '#FECDD3' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#FFE4E6', color: '#BE123C' }}>
                  <ShieldCheck className="w-6 h-6 text-[#BE123C]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>3. Environnement clos</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {isFR ? "Cuve en acier inoxydable 304 inerte et étanche : pas de perte de composés volatils, ni d'oxydation prématurée." : "Inert food-grade 304 stainless steel chamber preventing volatile loss and oxidation."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Comparaison des méthodes */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>6</span>
            {isFR ? "Tableau Comparatif : Tisane vs Macération vs Décoction vs BloomLab" : "Comparison Table: Herbal Tea vs Maceration vs Decoction vs BloomLab"}
          </h2>

          <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {isFR ? "Chaque méthode historique possède des atouts et des limites qu'il convient de distinguer :" : "Each traditional method has strengths and constraints:"}
          </p>

          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: '#E7DFD3' }}>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3', color: '#1E2E25' }}>
                  <th className="py-3.5 px-4 font-bold">Méthode</th>
                  <th className="py-3.5 px-4 font-bold">Solvant</th>
                  <th className="py-3.5 px-4 font-bold">Température</th>
                  <th className="py-3.5 px-4 font-bold">Forces & Limites</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E7DFD3' }}>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>Infusion</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>Eau</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>70°C - 90°C</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>Rapide, mais perte des composés volatils. Pour aller plus loin : <button onClick={() => onNavigate('infusion-botanique')} className="font-bold underline hover:text-[#E8772E] cursor-pointer" style={{ color: '#1E2E25' }}>comprendre l'infusion botanique et ses limites</button>.</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>Décoction</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>Eau</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>100°C ébullition</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>Efficace pour les racines dures, mais dénature les molécules thermolabiles.</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>Macération</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>Huile, Alcool, Eau</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>Ambiante (semaines)</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>Respectueuse mais très lente avec risques d'oxydation. Découvrez comment <button onClick={() => onNavigate('maceration-plantes')} className="font-bold underline hover:text-[#E8772E] cursor-pointer" style={{ color: '#1E2E25' }}>maîtriser la macération de plantes</button>.</td>
                </tr>
                <tr className="font-medium" style={{ backgroundColor: '#E2EFE7' }}>
                  <td className="py-3.5 px-4 font-black" style={{ color: '#1E2E25' }}>Méthode A/B de précision</td>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>Multi-solvants</td>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>40°C - 60°C régulée</td>
                  <td className="py-3.5 px-4 font-medium leading-relaxed" style={{ color: '#1E2E25' }}>Extraction séquentielle rapide en milieu clos avec agitation vortex, respectant le Totum.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: '#E7DFD3' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR ? "Avant d'engager une extraction, prenez le temps de " : "Before starting an extraction, take time to "}
              <button 
                onClick={() => onNavigate('library-landing')} 
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {isFR ? "choisir les plantes adaptées à votre extraction" : "select the appropriate plants for your extraction"}
              </button>
              {isFR ? " au sein de notre Herbier documenté." : " inside our documented Herbarium."}
            </p>
          </div>
        </section>

        {/* Dynamic Calculator Section */}
        <section className="scroll-mt-32" id="calculator">
          <ExtractionCalculator />
        </section>

        {/* Section 7: Comment BloomLab applique la méthode A/B */}
        <section 
          className="text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6"
          style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#E8772E] text-white flex items-center justify-center text-sm font-bold">7</span>
            {isFR ? "Comment BloomLab applique la méthode A/B" : "How BloomLab applies the A/B method"}
          </h2>

          <p className="text-base text-white/90 leading-relaxed font-medium">
            {isFR 
              ? "La machine BloomLab® intègre un système breveté combinant cuve en acier inoxydable 304, inerte et facile à nettoyer, contrôle thermique au degré près et cinétique vortex brevetée. Elle permet de conduire successivement la Phase A hydrosoluble et la Phase B liposoluble pour obtenir des préparations botaniques de haute pureté directement dans votre cuisine."
              : "The BloomLab® instrument brings laboratory precision into your kitchen with 304 stainless steel, degree-level thermal regulation and continuous agitation."}
          </p>

          <div className="pt-4">
            <button 
              onClick={() => onNavigate('machine')}
              className="px-8 py-4 bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold rounded-2xl transition-all duration-300 inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {isFR ? "Voir comment BloomLab applique la méthode A/B" : "See how BloomLab applies the A/B method"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Section 8: Questions fréquentes sur l'extraction botanique */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-8"
          style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1E2E25' }}>
            <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}>8</span>
            {isFR ? "Questions fréquentes sur l'extraction botanique" : "Frequently Asked Questions"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {isFR ? "Quelle est la différence entre infusion et extraction ?" : "What is the difference between infusion and extraction?"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {isFR 
                  ? "L'infusion est une forme particulière d'extraction n'utilisant que l'eau. L'extraction au sens large utilise divers solvants (eau, glycérine, huile, alcool) avec un contrôle strict du temps, de la température et de l'agitation pour mobiliser l'ensemble du Totum végétal."
                  : "Infusion uses only water. Broad extraction utilizes various solvents under tight control of temperature and agitation."}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {isFR ? "Qu'est-ce que l'extraction séquentielle A/B ?" : "What is sequential A/B extraction?"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {isFR 
                  ? "C'est un procédé en deux étapes distinctes : la Phase A capture les principes hydrosolubles (eau, glycérine) à température douce, puis la Phase B capture les composés liposolubles (huiles végétales, alcool) sans altérer les molécules fragiles."
                  : "It is a two-phase protocol: Phase A captures water-soluble compounds, and Phase B extracts lipophilic fractions."}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {isFR ? "Combien de temps se conserve un extrait maison ?" : "How long does a homemade extract keep?"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {isFR 
                  ? "Une infusion aqueuse se consomme dans les 24 heures. Un macérat huileux stabilisé et conservé à l'abri de la lumière se conserve environ 6 mois, et une préparation hydroalcoolique peut durer plusieurs années."
                  : "Water infusions should be consumed within 24 hours. Oil macerates last about 6 months, and hydroalcoholic tinctures keep for years."}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {isFR ? "Pourquoi l'acier inoxydable 304 est-il important ?" : "Why is 304 stainless steel important?"}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {isFR 
                  ? "Contrairement aux plastiques ou métaux poreux, l'acier inoxydable 304 est inerte chimiquement, facile à nettoyer et résistant aux acides végétaux. Il ne migre pas dans vos préparations."
                  : "Unlike porous metals, 304 stainless steel is chemically inert, food-safe, and does not leach into preparations."}
              </p>
            </div>
          </div>
        </section>

        {/* Section Écosystème du Cocoon Extraction Botanique */}
        <section 
          className="rounded-3xl p-8 md:p-12 border shadow-sm space-y-6"
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E7DFD3' }}
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-xs" style={{ backgroundColor: '#1E2E25', color: '#F5E6D8' }}>
              <Compass className="w-5 h-5 text-[#E8772E]" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#1E2E25' }}>
              {isFR ? "L'Écosystème du Cocoon 'Extraction Botanique'" : "The Botanical Extraction Ecosystem"}
            </h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {isFR 
              ? "Approfondissez chaque dimension de l'extraction végétale pour orchestrer vos préparations avec exactitude :"
              : "Explore every branch of our botanical extraction cluster:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'infusion-botanique', title: isFR ? "Infusion Botanique" : "Botanical Infusion", desc: isFR ? "L'eau comme solvant doux : températures idéales et principes hydrosolubles." : "Low-temperature water extraction." },
              { id: 'maceration-plantes', title: isFR ? "Macération de Plantes" : "Plant Maceration", desc: isFR ? "Extraction lente à froid pour les actifs fragiles et résines." : "Slow, light-protected maceration." },
              { id: 'huile-infusee', title: isFR ? "Huiles Infusées & Macérâts" : "Infused Oils", desc: isFR ? "Extraction lipidique des fractions liposolubles et soins de peau." : "Lipophilic plant concentrates." },
              { id: 'teinture-mere', title: isFR ? "Teintures Mères" : "Mother Tinctures", desc: isFR ? "Solvants hydroalcooliques et extraction des principes amers." : "Hydroalcoholic extraction." },
              { id: 'totum-vegetal', title: isFR ? "Le Totum Végétal" : "The Plant Totum", desc: isFR ? "Pourquoi préserver la synergie intégrale de la plante vivante." : "Whole plant synergy vs isolates." },
              { id: 'kits-botaniques', title: isFR ? "Kits Botaniques Prêts à l'Emploi" : "Curated Botanical Kits", desc: isFR ? "Plantes pures sélectionnées pour réussir vos protocoles chez vous." : "Ready-to-use botanical kits." },
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="p-5 rounded-2xl border hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3' }}
              >
                <div>
                  <h3 className="font-bold text-sm group-hover:text-[#E8772E] transition-colors mb-1.5 flex items-center justify-between" style={{ color: '#1E2E25' }}>
                    <span>{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4A5D4A]/60 group-hover:text-[#E8772E] group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: CTA Final & Maillage */}
        <section 
          className="text-center rounded-3xl p-10 md:p-16 border shadow-md space-y-6"
          style={{ backgroundColor: '#F5EFE6', borderColor: '#E3D8C8' }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-xs mb-2" style={{ backgroundColor: '#1E2E25', color: '#F5E6D8' }}>
            <Compass className="w-7 h-7 text-[#E8772E]" />
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight" style={{ color: '#1E2E25' }}>
            {isFR ? "Développez votre autonomie botanique" : "Build your botanical autonomy"}
          </h2>

          <p className="text-base max-w-xl mx-auto leading-relaxed font-medium" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {isFR 
              ? "Découvrez l'extracteur BloomLab®, nos kits de plantes sélectionnés avec rigueur et nos guides pas-à-pas pour réussir vos premières extractions."
              : "Discover the BloomLab® extractor, our curated botanical kits, and step-by-step guides."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button 
              onClick={() => onNavigate('machine')}
              className="px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-orange-900/20 hover:shadow-xl hover:bg-[#D4651F] cursor-pointer inline-flex items-center justify-center gap-2 bg-[#E8772E] text-white"
            >
              {isFR ? "Découvrir la BloomLab®" : "Discover BloomLab®"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('boutique-kits')}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer border"
              style={{ backgroundColor: '#FFFFFF', color: '#1E2E25', borderColor: '#D8CFBF' }}
            >
              {isFR ? "Découvrir nos Kits Botaniques" : "Explore Botanical Kits"}
            </button>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer border"
              style={{ backgroundColor: '#FFFFFF', color: '#1E2E25', borderColor: '#D8CFBF' }}
            >
              {isFR ? "Explorer l'Herbier" : "Explore Herbarium"}
            </button>
          </div>

          {/* Bloc Pour aller plus loin */}
          <div className="pt-8 border-t max-w-lg mx-auto text-center space-y-2" style={{ borderColor: '#D8CFBF' }}>
            <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#4A5D4A' }}>
              {isFR ? "Articles de fond dans le Journal Botanique" : "Botanical Journal Articles"}
            </div>
            <div>
              <button 
                onClick={() => onNavigate('blog', 'saule-salicine-aspirine-histoire-totum')}
                className="text-sm font-semibold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {isFR 
                  ? "Du saule à l'aspirine : ce que l'isolement nous apprend du totum →"
                  : "From willow to aspirin: what molecular isolation teaches us about totum →"}
              </button>
            </div>
            <div>
              <button 
                onClick={() => onNavigate('blog')}
                className="text-xs font-semibold hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#4A5D4A' }}
              >
                {isFR ? "Consulter l'ensemble du Journal Botanique & Blog →" : "Browse the Botanical Journal & Blog →"}
              </button>
            </div>
          </div>
        </section>

        {/* Mandatory Educational Disclaimer */}
        <section 
          className="p-6 rounded-2xl border flex items-start gap-4 text-xs leading-relaxed"
          style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3', color: '#4A5D4A' }}
        >
          <AlertCircle className="w-5 h-5 text-[#E8772E] flex-shrink-0 mt-0.5" />
          <p>
            <strong style={{ color: '#1E2E25' }}>{isFR ? "Avertissement éducatif : " : "Educational disclaimer: "}</strong>
            {isFR 
              ? "Bloom by BotaniK propose une approche éducative de la préparation botanique. Nos contenus ne remplacent pas un avis médical, un diagnostic ou un traitement."
              : "Bloom by BotaniK offers an educational approach to botanical preparation. Our content does not replace medical advice, diagnosis, or treatment."}
          </p>
        </section>

      </div>
    </div>
  );
}