import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';
import ExtractionCalculator from './components/ExtractionCalculator';
import { TooltipLexique } from './components/TooltipLexique';

const bloomLabImg = "/img/produit/bloomlab-1200x1200.jpg";

export default function PillarExtraction({ lang, onNavigate }: { lang: Language, onNavigate: (v: any, productId?: string) => void }) {
  const _t = translations[lang];
  const isFR = lang === 'fr';
  const isDE = lang === 'de';
  const tr = (fr: string, en: string, de: string) => (isFR ? fr : isDE ? de : en);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const extractionFaqs = isFR
    ? [
        {
          q: "Quelle est la différence entre infusion, décoction et macération botanique ?",
          a: "L'infusion extrait les parties tendres (fleurs, feuilles) entre 45°C et 80°C sans ébullition continue. La décoction concerne les parties ligneuses (racines, écorces) à frémissement prolongé. La macération s'effectue à froid ou à basse température (45°C dans la BloomLab®) dans de l'huile, de la glycérine ou de l'alcool pour capter les molécules liposolubles ou thermosensibles."
        },
        {
          q: "Pourquoi le séquençage actif A/B préserve-t-il le Totum végétal ?",
          a: "Une plante contient à la fois des actifs hydrosolubles (Phase A) et liposolubles ou amphiphiles (Phase B). Un seul solvant n'extrait qu'une fraction partielle. En adaptant solvant, température et durée avec Bloom by BotaniK et BloomLab®, vous capturez un spectre complet sans dégrader les composés fragiles."
        },
        {
          q: "Comment contrôler efficacement la température et l'agitation lors de l'extraction ?",
          a: "Une eau bouillante à 100°C évapore les huiles essentielles volatiles et détruit certains flavonoïdes. L'extracteur BloomLab® maintient la consigne thermique à ±0,5°C en cuve close inox 304 avec un vortex doux qui renouvelle le solvant au contact de la plante."
        },
        {
          q: "Quels solvants utiliser pour une extraction botanique maison ?",
          a: "L'eau filtrée convient aux extraits aqueux consommables sous 24–48 h, les huiles végétales vierges (jojoba, olive, sésame) aux macérats cutanés et culinaires à 45°C, et la glycérine ou l'alcool alimentaire aux extraits longue conservation."
        }
      ]
    : isDE
    ? [
        {
          q: "Was ist der Unterschied zwischen Infusion, Dekoktion und Mazeration?",
          a: "Bei der Infusion werden empfindliche Blätter und Blüten zwischen 45 °C und 80 °C ohne Kochen extrahiert. Die Dekoktion eignet sich für harte Wurzeln und Rinden durch sanftes Sieden. Die Mazeration erfasst fettlösliche oder hitzeempfindliche Moleküle bei niedriger Temperatur (45 °C in BloomLab®) in Öl, Glycerin oder Alkohol."
        },
        {
          q: "Warum bewahrt die sequenzielle A/B-Extraktion das pflanzliche Totum?",
          a: "Pflanzen enthalten sowohl wasserlösliche (Phase A) als auch fettlösliche Verbindungen (Phase B). Durch die Abstimmung von Lösungsmittelpolarität, kontrollierter Temperatur und Zeit mit BloomLab® erfassen Sie das gesamte Synergiespektrum."
        },
        {
          q: "Wie verbessern Temperatur und Bewegung die botanische Extraktion?",
          a: "Kochendes Wasser bei 100 °C verdampft flüchtige Aromen und baut empfindliche Polyphenole ab. BloomLab® hält die Temperatur in einer geschlossenen 304-Edelstahlkammer auf ±0,5 °C genau, während ein sanfter Vortex Sättigungsschichten verhindert."
        },
        {
          q: "Welche Lösungsmittel eignen sich für die heimische Pflanzenextraktion?",
          a: "Gefiltertes Wasser eignet sich für frische wässrige Auszüge, native Pflanzenöle für Haut- und Küchenmazerate bei 45 °C und pflanzliches Glycerin oder Lebensmittelalkohol für langzeitstabile Extrakte."
        }
      ]
    : [
        {
          q: "What is the difference between infusion, decoction, and maceration?",
          a: "Infusion extracts delicate leaves and flowers between 45°C and 80°C without boiling. Decoction targets dense roots and barks via gentle simmering. Maceration extracts lipophilic or heat-sensitive compounds at low temperature (45°C in BloomLab®) using oil, glycerin, or alcohol."
        },
        {
          q: "Why does A/B sequential extraction preserve the plant Totum?",
          a: "Plants hold both water-soluble (Phase A) and fat-soluble (Phase B) compounds. Pairing solvent polarity, controlled temperature, and time with Bloom by BotaniK's BloomLab® captures the full synergistic spectrum."
        },
        {
          q: "How do temperature and agitation improve botanical extraction?",
          a: "Boiling water destroys fragile polyphenols and evaporates volatile aromatics. BloomLab® holds temperature within ±0.5°C in a closed 304 stainless steel chamber while gentle vortex motion prevents saturation layers."
        },
        {
          q: "Which natural solvents can be used at home?",
          a: "Filtered water suits fresh aqueous infusions, virgin plant oils suit 45°C skin or culinary macerates, and vegetable glycerin or food-grade alcohol support stable multi-month extracts."
        }
      ];

  return (
    <div className="flex-1 bg-[#FAF7F2]">
      {/* Hero Section Vert Forêt avec Fil d'Ariane */}
      <section 
        className="w-full bg-[#1E2E25] text-white border-b border-white/10 relative overflow-hidden"
      >
        {/* Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
        <div className="w-full bg-[#0F261E] border-b border-white/10 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 relative z-20">
          <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrumennavigation")} className="max-w-7xl mx-auto">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs text-white">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  {tr("Accueil", "Home", "Startseite")}
                </button>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  {tr("La Méthode A/B", "The A/B Method", "Die A/B-Methode")}
                </button>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-white font-bold" aria-current="page">
                {tr("Guide de l'extraction", "Extraction Guide", "Extraktions-Leitfaden")}
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
              alt={tr("Extraction botanique : guide complet des méthodes, solvants et paramètres", "Botanical extraction guide", "Leitfaden für botanische Extraktion")} 
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
            {tr("Guide Pilier • Autonomie Botanique", "Pillar Guide • Botanical Autonomy", "Pfeiler-Leitfaden • Botanische Autonomie")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 font-sans tracking-tight leading-tight text-white"
          >
            {isFR ? (
              <>Guide Complet : Extraction Botanique à Domicile | Bloom by BotaniK &amp; BloomLab®</>
            ) : isDE ? (
              <>Kompletter Guide: Botanische Extraktion | Bloom by BotaniK &amp; BloomLab®</>
            ) : (
              <>Complete Guide: Botanical Extraction at Home | Bloom by BotaniK &amp; BloomLab®</>
            )}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-3xl mx-auto font-light"
          >
            {isFR 
              ? <>Infusion, décoction, macération, <TooltipLexique terme="sequencage-ab">extraction séquentielle</TooltipLexique> avec BloomLab® de Bloom by BotaniK : comparez les méthodes, choisissez le bon solvant et maîtrisez température et agitation pour libérer le <TooltipLexique terme="totum">Totum</TooltipLexique> végétal.</>
              : isDE
              ? "Infusion, Dekoktion, Mazeration und sequenzielle Extraktion mit BloomLab® von Bloom by BotaniK: Vergleichen Sie die Methoden, wählen Sie das passende Lösungsmittel und steuern Sie Temperatur und Bewegung für das volle pflanzliche Totum."
              : "Infusion, decoction, maceration, sequential extraction with BloomLab® by Bloom by BotaniK: compare methods, choose the right solvent and master temperature and agitation to unlock the botanical Totum."}
          </motion.div>

          {/* Boutons d'action harmonisés */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('machine')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>{tr("Découvrir BloomLab®", "Discover BloomLab®", "BloomLab® entdecken")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('calculator');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E2E25] font-bold text-sm border border-white/20 transition-all shadow-xs"
            >
              <span>{tr("Calculateur & Paramètres", "Calculator & Settings", "Rechner & Parameter")}</span>
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
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Totum Végétal", "Botanical Totum", "Pflanzliches Totum")}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Préservez l'intégralité du profil moléculaire végétal.", "Preserve the complete molecular profile.", "Bewahren Sie das gesamte pflanzliche Molekularprofil.")}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7', color: '#E8772E' }}>
              <Thermometer className="w-6 h-6 text-[#E8772E]" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Thermorégulation", "Thermoregulation", "Thermoregulation")}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Stabilité thermique rigoureuse sans dénaturation.", "Rigorous thermal stability without breakdown.", "Strikte Temperaturstabilität ohne Denaturierung.")}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FAF5FF', color: '#9333EA' }}>
              <ShieldCheck className="w-6 h-6 text-[#9333EA]" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Inox 304 Inerte", "Inert 304 Stainless Steel", "Inerter 304-Edelstahl")}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Cuve alimentaire inerte, facile à nettoyer et durable.", "Inert food-grade bowl, easy to clean and durable.", "Inerter Lebensmittelbehälter, leicht zu reinigen und langlebig.")}</p>
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
            {tr("Infusion Botanique vs Bain-Marie : Principes de l'Extraction", "Botanical Infusion vs Water Bath: Extraction Principles", "Botanische Infusion vs. Wasserbad: Prinzipien der Extraktion")}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Définition et principes fondamentaux", "Definition and fundamental principles", "Definition und Grundprinzipien")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr(
                "L'extraction botanique est le processus physique et chimique par lequel un solvant (eau, huile, glycérine ou alcool) dissout et capture les principes actifs contenus dans la matrice d'une plante. Loin d'une simple dissolution passive, une extraction réussie repose sur un équilibre rigoureux entre le choix du solvant, le gradient de concentration, la température et la cinétique d'agitation.",
                "Botanical extraction is the physical and chemical process through which a solvent dissolves and captures the active compounds inside a plant matrix.",
                "Botanische Extraktion ist der physikalische und chemische Prozess, bei dem ein Lösungsmittel Wirkstoffe aus der Pflanzenmatrix löst und aufnimmt."
              )}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr(
                "Chaque plante recèle des composés hydrophiles (solubles dans l'eau) et lipophiles (solubles dans les corps gras). Comprendre ces affinités permet de concevoir des préparations botaniques riches, équilibrées et fidèles à la plante d'origine.",
                "Every plant contains hydrophilic and lipophilic components. Mastering these affinities allows creating balanced, faithful botanical preparations.",
                "Jede Pflanze enthält hydrophile und lipophile Verbindungen. Wer diese Affinitäten versteht, stellt ausgewogene, pflanzengetreue Zubereitungen her."
              )}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#E7DFD3' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Différence avec l'infusion classique", "Difference with classic infusion", "Unterschied zur klassischen Infusion")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>L'infusion classique consiste à verser de l'eau chaude sur une plante et à laisser reposer. Si elle est agréable et accessible, elle présente deux limites majeures : l'eau bouillante détruit les fractions <TooltipLexique terme="thermolabile">thermolabiles</TooltipLexique> fragiles, et l'absence d'agitation continue crée une couche de saturation autour des feuilles, limitant le rendement d'extraction.</>
                : isDE
                ? "Bei der klassischen Infusion wird heißes Wasser über eine Pflanze gegossen. Dabei denaturiert kochendes Wasser empfindliche Moleküle, und fehlende Bewegung bremst den Stoffübergang."
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
            {tr("Pourquoi l'extraction séquentielle change tout", "Why sequential extraction changes everything", "Warum sequenzielle Extraktion alles verändert")}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Les limites des méthodes traditionnelles", "The limitations of traditional methods", "Die Grenzen traditioneller Methoden")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr(
                "Les méthodes traditionnelles à solvant unique sont confrontées à une contradiction physique : un solvant aqueux ne peut pas solubiliser les résines ou les flavonoïdes lipophiles, tandis qu'un corps gras ne capte pas les minéraux ou les mucilages. Tenter d'extraire une plante entière en une seule étape mène souvent à un profil moléculaire incomplet.",
                "Single-solvent traditional methods face a physical contradiction: an aqueous solvent cannot dissolve lipophilic resins, while oils cannot capture water-soluble minerals.",
                "Traditionelle Ein-Lösungsmittel-Methoden stehen vor einem physikalischen Widerspruch: Ein wässriges Lösungsmittel löst keine lipophilen Harze, während Öle keine wasserlöslichen Mineralien binden."
              )}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#D6E3DC' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Le défi du totum végétal", "The challenge of the plant totum", "Die Herausforderung des pflanzlichen Totums")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>Le <TooltipLexique terme="totum">totum</TooltipLexique> désigne l'ensemble des substances actives et secondaires contenues dans le végétal vivant, agissant en <TooltipLexique terme="synergie">synergie</TooltipLexique> naturelle. Pour </>
                : isDE
                ? "Das Totum bezeichnet alle aktiven und sekundären Verbindungen in Synergie. Um "
                : "The totum represents all active compounds acting in synergy. To "}
              <button 
                onClick={() => onNavigate('totum-vegetal')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {tr("comprendre le totum végétal et sa synergie", "understand the plant totum and its synergy", "das pflanzliche Totum und seine Synergie zu verstehen")}
              </button>
              {tr(
                ", il est indispensable de préserver ces interactions moléculaires sans isoler artificiellement une seule molécule chimique.",
                ", it is essential to preserve these molecular interactions.",
                ", müssen diese molekularen Wechselwirkungen bewahrt bleiben."
              )}
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
            {tr("Décoctions de Racines & Phase A Hydrosoluble", "Root Decoctions & Water-Soluble Phase A", "Wurzeldekoktionen & wasserlösliche Phase A")}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Solvants adaptés : eau, glycérine", "Suitable solvents: water, glycerin", "Geeignete Lösungsmittel: Wasser, Glycerin")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {isFR 
                ? <>La Phase A mobilise des solvants à polarité élevée. L'eau déminéralisée ou filtrée extrait les tanins, les <TooltipLexique terme="polyphenols">polyphénols</TooltipLexique> <TooltipLexique terme="hydrosoluble">hydrosolubles</TooltipLexique> et les mucilages. La glycérine végétale, solvant doux et émollient, capture les flavonoïdes tout en stabilisant la préparation dans le temps.</>
                : isDE
                ? "Phase A nutzt stark polare Lösungsmittel wie gefiltertes Wasser oder pflanzliches Glycerin."
                : "Phase A uses high polarity solvents such as filtered water or vegetable glycerin."}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#D4E5DC' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Températures selon la matrice végétale", "Temperatures according to plant matrix", "Temperaturen je nach Pflanzenmatrix")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr("La sensibilité thermique varie considérablement selon la partie de la plante utilisée :", "Thermal sensitivity varies widely depending on the plant part used:", "Die Temperaturempfindlichkeit variiert je nach Pflanzenteil erheblich:")}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">45°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Fleurs tendres", "Delicate flowers", "Zarte Blüten")}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Camomille, mauve, calendula. Préserve les mucilages et arômes subtils.", "Chamomile, mallow, calendula. Preserves mucilages and subtle aromas.", "Kamille, Malve, Ringelblume. Bewahrt Schleimstoffe und feine Aromen.")}</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">55°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Feuilles & tiges", "Leaves & stems", "Blätter & Stängel")}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Menthe, mélisse, ortie. Assure une diffusion sans surchauffe enzymatique.", "Mint, lemon balm, nettle. Ensures diffusion without overheating.", "Minze, Melisse, Brennnessel. Sorgt für Diffusion ohne Überhitzung.")}</p>
              </li>
              <li className="p-5 bg-white rounded-2xl border shadow-xs" style={{ borderColor: '#E7DFD3' }}>
                <div className="font-black text-base mb-1 text-[#E8772E]">60°C</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1E2E25' }}>{tr("Écorces & racines", "Barks & roots", "Rinden & Wurzeln")}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5D4A' }}>{tr("Cannelle, réglisse, gingembre. Pénètre les tissus fibreux denses.", "Cinnamon, licorice, ginger. Penetrates dense fibrous tissues.", "Zimt, Süßholz, Ingwer. Durchdringt dichtes Fasergewebe.")}</p>
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
            {tr("Macération Huileuse Précise : Phase B Liposoluble", "Precise Oil Maceration: Lipid-Soluble Phase B", "Präzise Ölmazeration: Fettlösliche Phase B")}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Solvants adaptés : alcool, huiles", "Suitable solvents: alcohol, oils", "Geeignete Lösungsmittel: Alkohol, Öle")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr(
                "La Phase B mobilise des solvants apolaires ou semi-polaires. Les huiles végétales stables (jojoba, sésame, olive) sont idéales pour ",
                "Phase B leverages lipid or hydroalcoholic solvents. Stable vegetable oils are ideal to ",
                "Phase B nutzt apolare oder semipolare Lösungsmittel. Stabile Pflanzenöle sind ideal, um "
              )}
              <button 
                onClick={() => onNavigate('huile-infusee')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {tr("réussir une huile infusée maison", "succeed in making homemade infused oil", "ein selbstgemachtes infundiertes Öl herzustellen")}
              </button>
              {tr(
                ". En milieu hydroalcoolique dosé avec rigueur, l'alcool éthylique permet de ",
                ". With accurate hydroalcoholic dilution, alcohol allows you to ",
                ". In präziser hydroalkoholischer Dosierung ermöglicht Alkohol es, "
              )}
              <button 
                onClick={() => onNavigate('teinture-mere')}
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {tr("préparer une teinture mère hydroalcoolique", "prepare a hydroalcoholic mother tincture", "eine hydroalkoholische Urtinktur zuzubereiten")}
              </button>
              {tr(" capable de capter les résines et principes amers.", " capable of capturing dense resins.", " um Harze und Bitterstoffe aufzunehmen.")}
            </p>
          </div>

          <div className="pt-4 border-t space-y-4" style={{ borderColor: '#EBDCBF' }}>
            <h3 className="text-xl font-bold" style={{ color: '#1E2E25' }}>
              {tr("Préservation des fractions thermolabiles", "Preserving thermolabile fractions", "Erhalt hitzeempfindlicher Fraktionen")}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr(
                "Les terpènes aromatiques et les acides gras insaturés rancissent ou s'évaporent rapidement sous l'effet des UV et d'une chaleur incontrôlée. Une extraction fermée à température modérée garantit l'intégrité de ces molécules protectrices.",
                "Volatile terpenes and unsaturated fatty acids evaporate or oxidize quickly under direct light and excess heat. Closed extraction at controlled temperature protects them.",
                "Aromatische Terpene und ungesättigte Fettsäuren oxidieren oder verdampfen schnell bei UV-Licht und unkontrollierter Hitze. Geschlossene Extraktion bei moderater Temperatur schützt sie."
              )}
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
            {tr("Teintures & Teintures-Mères : Paramètres Critiques d'Extraction", "Tinctures & Mother Tinctures: Critical Extraction Parameters", "Tinkturen & Urtinkturen: Kritische Extraktionsparameter")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#FEF3C7', color: '#E8772E' }}>
                  <Thermometer className="w-6 h-6 text-[#E8772E]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>{tr("1. Température stable", "1. Stable temperature", "1. Stabile Temperatur")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {tr("Contrôle précis sans pics thermiques pour respecter les seuils de tolérance de chaque famille végétale.", "Precise control without heat spikes to preserve each plant family.", "Präzise Steuerung ohne Temperaturspitzen zum Schutz jeder Pflanzenfamilie.")}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
                  <Activity className="w-6 h-6 text-[#166534]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>{tr("2. Agitation cinétique", "2. Kinetic agitation", "2. Kinetische Bewegung")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {tr("Le vortex continu brise la couche de saturation statique et renouvelle le solvant au cœur des tissus.", "Continuous movement breaks the static boundary layer and renews solvent contact.", "Der kontinuierliche Vortex bricht die Sättigungsschicht und erneuert den Lösungsmittelkontakt.")}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border flex flex-col justify-between shadow-xs" style={{ backgroundColor: '#FFF1F2', borderColor: '#FECDD3' }}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-xs" style={{ backgroundColor: '#FFE4E6', color: '#BE123C' }}>
                  <ShieldCheck className="w-6 h-6 text-[#BE123C]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2E25' }}>{tr("3. Environnement clos", "3. Closed environment", "3. Geschlossene Kammer")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                  {tr("Cuve en acier inoxydable 304 inerte et étanche : pas de perte de composés volatils, ni d'oxydation prématurée.", "Inert food-grade 304 stainless steel chamber preventing volatile loss and oxidation.", "Inerter, dichter 304-Edelstahlbehälter: kein Verlust flüchtiger Stoffe und keine Oxidation.")}
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
            {tr("Tableau Comparatif : Tisane vs Macération vs Décoction vs BloomLab", "Comparison Table: Herbal Tea vs Maceration vs Decoction vs BloomLab", "Vergleichstabelle: Aufguss vs. Mazeration vs. Dekoktion vs. BloomLab")}
          </h2>

          <p className="text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {tr("Chaque méthode historique possède des atouts et des limites qu'il convient de distinguer :", "Each traditional method has strengths and constraints:", "Jede traditionelle Methode besitzt eigene Stärken und Grenzen:")}
          </p>

          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: '#E7DFD3' }}>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: '#E7DFD3', color: '#1E2E25' }}>
                  <th className="py-3.5 px-4 font-bold">{tr("Méthode", "Method", "Methode")}</th>
                  <th className="py-3.5 px-4 font-bold">{tr("Solvant", "Solvent", "Lösungsmittel")}</th>
                  <th className="py-3.5 px-4 font-bold">{tr("Température", "Temperature", "Temperatur")}</th>
                  <th className="py-3.5 px-4 font-bold">{tr("Forces & Limites", "Strengths & Limits", "Stärken & Grenzen")}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E7DFD3' }}>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>{tr("Infusion", "Infusion", "Infusion")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>{tr("Eau", "Water", "Wasser")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>70°C - 90°C</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>{tr("Rapide, mais perte des composés volatils. Pour aller plus loin : ", "Fast, but loses volatile compounds. Learn more: ", "Schnell, aber Verlust flüchtiger Verbindungen. Mehr: ")}<button onClick={() => onNavigate('infusion-botanique')} className="font-bold underline hover:text-[#E8772E] cursor-pointer" style={{ color: '#1E2E25' }}>{tr("comprendre l'infusion botanique et ses limites", "understanding botanical infusion and its limits", "Botanische Infusion und Grenzen verstehen")}</button>.</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>{tr("Décoction", "Decoction", "Dekoktion")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>{tr("Eau", "Water", "Wasser")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>{tr("100°C ébullition", "100°C boiling", "100 °C kochend")}</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>{tr("Efficace pour les racines dures, mais dénature les molécules thermolabiles.", "Effective for hard roots, but denatures heat-sensitive molecules.", "Wirksam für harte Wurzeln, denaturiert jedoch empfindliche Moleküle.")}</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>{tr("Macération", "Maceration", "Mazeration")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>{tr("Huile, Alcool, Eau", "Oil, Alcohol, Water", "Öl, Alkohol, Wasser")}</td>
                  <td className="py-3.5 px-4" style={{ color: '#1E2E25' }}>{tr("Ambiante (semaines)", "Ambient (weeks)", "Raumtemperatur (Wochen)")}</td>
                  <td className="py-3.5 px-4 leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>{tr("Respectueuse mais très lente avec risques d'oxydation. Découvrez comment ", "Gentle yet very slow with oxidation risks. Learn how to ", "Schonend, aber langsam mit Oxidationsrisiko. So lernen Sie, ")}<button onClick={() => onNavigate('maceration-plantes')} className="font-bold underline hover:text-[#E8772E] cursor-pointer" style={{ color: '#1E2E25' }}>{tr("maîtriser la macération de plantes", "master plant maceration", "Pflanzenmazeration zu meistern")}</button>.</td>
                </tr>
                <tr className="font-medium" style={{ backgroundColor: '#E2EFE7' }}>
                  <td className="py-3.5 px-4 font-black" style={{ color: '#1E2E25' }}>{tr("Méthode A/B de précision", "Precision A/B Method", "Präzisions-A/B-Methode")}</td>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>{tr("Multi-solvants", "Multi-solvent", "Multi-Lösungsmittel")}</td>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: '#1E2E25' }}>{tr("40°C - 60°C régulée", "40°C - 60°C regulated", "40 °C - 60 °C geregelt")}</td>
                  <td className="py-3.5 px-4 font-medium leading-relaxed" style={{ color: '#1E2E25' }}>{tr("Extraction séquentielle rapide en milieu clos avec agitation vortex, respectant le Totum.", "Fast sequential extraction in closed chamber with vortex agitation, respecting the Totum.", "Schnelle sequenzielle Extraktion in geschlossener Kammer mit Vortex unter Erhalt des Totums.")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: '#E7DFD3' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
              {tr("Avant d'engager une extraction, prenez le temps de ", "Before starting an extraction, take time to ", "Nehmen Sie sich vor einer Extraktion Zeit, ")}
              <button 
                onClick={() => onNavigate('library-landing')} 
                className="font-bold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {tr("choisir les plantes adaptées à votre extraction", "select the appropriate plants for your extraction", "die passenden Pflanzen auszuwählen")}
              </button>
              {tr(" au sein de notre Herbier documenté.", " inside our documented Herbarium.", " in unserem dokumentierten Herbarium.")}
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
            {tr("Comment BloomLab applique la méthode A/B", "How BloomLab applies the A/B method", "Wie BloomLab die A/B-Methode anwendet")}
          </h2>

          <p className="text-base text-white/90 leading-relaxed font-medium">
            {tr(
              "La machine BloomLab® intègre un système breveté combinant cuve en acier inoxydable 304, inerte et facile à nettoyer, contrôle thermique au degré près et cinétique vortex brevetée. Elle permet de conduire successivement la Phase A hydrosoluble et la Phase B liposoluble pour obtenir des préparations botaniques de haute pureté directement dans votre cuisine.",
              "The BloomLab® instrument brings laboratory precision into your kitchen with 304 stainless steel, degree-level thermal regulation and continuous agitation.",
              "Das Gerät BloomLab® bringt Laborpräzision in Ihre Küche: 304-Edelstahl, gradgenaue Thermoregulation und kontinuierliche Vortex-Bewegung für Phase A und B."
            )}
          </p>

          <div className="pt-4">
            <button 
              onClick={() => onNavigate('machine')}
              className="px-8 py-4 bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold rounded-2xl transition-all duration-300 inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {tr("Voir comment BloomLab applique la méthode A/B", "See how BloomLab applies the A/B method", "Sehen, wie BloomLab die A/B-Methode anwendet")}
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
            {tr("Questions fréquentes sur l'extraction botanique", "Frequently Asked Questions", "Häufig gestellte Fragen")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {tr("Quelle est la différence entre infusion et extraction ?", "What is the difference between infusion and extraction?", "Worin liegt der Unterschied zwischen Infusion und Extraktion?")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {tr(
                  "L'infusion est une forme particulière d'extraction n'utilisant que l'eau. L'extraction au sens large utilise divers solvants (eau, glycérine, huile, alcool) avec un contrôle strict du temps, de la température et de l'agitation pour mobiliser l'ensemble du Totum végétal.",
                  "Infusion uses only water. Broad extraction utilizes various solvents under tight control of temperature and agitation.",
                  "Die Infusion nutzt nur Wasser. Extraktion im weiteren Sinne verwendet verschiedene Lösungsmittel mit genauer Temperatur- und Zeitkontrolle."
                )}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {tr("Qu'est-ce que l'extraction séquentielle A/B ?", "What is sequential A/B extraction?", "Was ist sequenzielle A/B-Extraktion?")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {tr(
                  "C'est un procédé en deux étapes distinctes : la Phase A capture les principes hydrosolubles (eau, glycérine) à température douce, puis la Phase B capture les composés liposolubles (huiles végétales, alcool) sans altérer les molécules fragiles.",
                  "It is a two-phase protocol: Phase A captures water-soluble compounds, and Phase B extracts lipophilic fractions.",
                  "Ein zweistufiges Protokoll: Phase A gewinnt wasserlösliche Stoffe, Phase B extrahiert lipophile Fraktionen."
                )}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {tr("Combien de temps se conserve un extrait maison ?", "How long does a homemade extract keep?", "Wie lange hält ein selbstgemachter Extrakt?")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {tr(
                  "Une infusion aqueuse se consomme dans les 24 heures. Un macérat huileux stabilisé et conservé à l'abri de la lumière se conserve environ 6 mois, et une préparation hydroalcoolique peut durer plusieurs années.",
                  "Water infusions should be consumed within 24 hours. Oil macerates last about 6 months, and hydroalcoholic tinctures keep for years.",
                  "Wässrige Auszüge sollten innerhalb von 24 Stunden verbraucht werden. Ölmazerate halten etwa 6 Monate, Tinkturen mehrere Jahre."
                )}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border shadow-xs space-y-2" style={{ borderColor: '#E7DFD3' }}>
              <h3 className="font-bold text-base" style={{ color: '#1E2E25' }}>
                {tr("Pourquoi l'acier inoxydable 304 est-il important ?", "Why is 304 stainless steel important?", "Warum ist 304-Edelstahl so wichtig?")}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
                {tr(
                  "Contrairement aux plastiques ou métaux poreux, l'acier inoxydable 304 est inerte chimiquement, facile à nettoyer et résistant aux acides végétaux. Il ne migre pas dans vos préparations.",
                  "Unlike porous metals, 304 stainless steel is chemically inert, food-safe, and does not leach into preparations.",
                  "Im Gegensatz zu Kunststoff oder porösen Metallen ist 304-Edelstahl chemisch inert, lebensmittelecht und gibt nichts ab."
                )}
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
              {tr("L'Écosystème du Cocoon 'Extraction Botanique'", "The Botanical Extraction Ecosystem", "Das Ökosystem der Botanischen Extraktion")}
            </h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {tr(
              "Approfondissez chaque dimension de l'extraction végétale pour orchestrer vos préparations avec exactitude :",
              "Explore every branch of our botanical extraction cluster:",
              "Entdecken Sie alle Dimensionen unseres Extraktions-Ökosystems:"
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'infusion-botanique', title: tr("Infusion Botanique", "Botanical Infusion", "Botanische Infusion"), desc: tr("L'eau comme solvant doux : températures idéales et principes hydrosolubles.", "Low-temperature water extraction.", "Wasser als sanftes Lösungsmittel bei idealer Temperatur.") },
              { id: 'maceration-plantes', title: tr("Macération de Plantes", "Plant Maceration", "Pflanzenmazeration"), desc: tr("Extraction lente à froid pour les actifs fragiles et résines.", "Slow, light-protected maceration.", "Langsame Kaltextraktion für empfindliche Wirkstoffe und Harze.") },
              { id: 'huile-infusee', title: tr("Huiles Infusées & Macérâts", "Infused Oils", "Infundierte Öle & Mazerate"), desc: tr("Extraction lipidique des fractions liposolubles et soins de peau.", "Lipophilic plant concentrates.", "Lipid-Extraktion fettlöslicher Fraktionen.") },
              { id: 'teinture-mere', title: tr("Teintures Mères", "Mother Tinctures", "Urtinkturen"), desc: tr("Solvants hydroalcooliques et extraction des principes amers.", "Hydroalcoholic extraction.", "Hydroalkoholische Extraktion von Bitterstoffen.") },
              { id: 'totum-vegetal', title: tr("Le Totum Végétal", "The Plant Totum", "Das Pflanzliche Totum"), desc: tr("Pourquoi préserver la synergie intégrale de la plante vivante.", "Whole plant synergy vs isolates.", "Volle Pflanzensynergie vs. isolierte Moleküle.") },
              { id: 'kits-botaniques', title: tr("Kits Botaniques Prêts à l'Emploi", "Curated Botanical Kits", "Gebrauchsfertige Botanik-Kits"), desc: tr("Plantes pures sélectionnées pour réussir vos protocoles chez vous.", "Ready-to-use botanical kits.", "Ausgewählte Bio-Pflanzen für Protokolle zu Hause.") },
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

        {/* Section 8.5: FAQ Extraction Botanique */}
        <section id="faq-extraction" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8772E]">
              {tr("Questions Fréquentes", "Frequently Asked Questions", "Häufig gestellte Fragen")}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1E2E25] tracking-tight">
              {tr("Comprendre l'extraction botanique en pratique", "Botanical extraction FAQ", "Botanische Extraktion in der Praxis")}
            </h2>
          </div>

          <div className="space-y-3">
            {extractionFaqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E7DFD3] overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#1E2E25] hover:text-[#E8772E] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="text-xs font-mono text-[#E8772E] shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed border-t border-[#E7DFD3]/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
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
            {tr("Développez votre autonomie botanique", "Build your botanical autonomy", "Entwickeln Sie Ihre botanische Autonomie")}
          </h2>

          <p className="text-base max-w-xl mx-auto leading-relaxed font-medium" style={{ color: '#1E2E25', opacity: 0.85 }}>
            {tr(
              "Découvrez l'extracteur BloomLab®, nos kits de plantes sélectionnés avec rigueur et nos guides pas-à-pas pour réussir vos premières extractions.",
              "Discover the BloomLab® extractor, our curated botanical kits, and step-by-step guides.",
              "Entdecken Sie den Extraktor BloomLab®, unsere sorgfältig ausgewählten Pflanzen-Kits und unsere Schritt-für-Schritt-Anleitungen."
            )}
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <a
              href="/bloomlab/"
              onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('machine'); } }}
              className="px-7 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-orange-900/20 hover:shadow-xl hover:bg-[#D4651F] cursor-pointer inline-flex items-center justify-center gap-2 bg-[#E8772E] text-white"
            >
              {tr("Découvrir la BloomLab®", "Discover BloomLab®", "BloomLab® entdecken")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/infusion-botanique/"
              onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('infusion-botanique'); } }}
              className="px-7 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer border inline-flex items-center justify-center"
              style={{ backgroundColor: '#FFFFFF', color: '#1E2E25', borderColor: '#D8CFBF' }}
            >
              {tr("Guide Infusion Botanique", "Botanical Infusion Guide", "Infusions-Leitfaden")}
            </a>
            <a
              href="/guide-solvants/"
              onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('guide-solvants'); } }}
              className="px-7 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer border inline-flex items-center justify-center"
              style={{ backgroundColor: '#FFFFFF', color: '#1E2E25', borderColor: '#D8CFBF' }}
            >
              {tr("Guide des Solvants", "Solvents Guide", "Lösungsmittel-Leitfaden")}
            </a>
            <a
              href="/boutique/kits/"
              onClick={(e) => { if (!e.ctrlKey && !e.metaKey && !e.shiftKey) { e.preventDefault(); onNavigate('boutique-kits'); } }}
              className="px-7 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer border inline-flex items-center justify-center"
              style={{ backgroundColor: '#FFFFFF', color: '#1E2E25', borderColor: '#D8CFBF' }}
            >
              {tr("Découvrir nos Kits Botaniques", "Explore Botanical Kits", "Unsere Botanik-Kits entdecken")}
            </a>
          </div>

          {/* Bloc Pour aller plus loin */}
          <div className="pt-8 border-t max-w-lg mx-auto text-center space-y-2" style={{ borderColor: '#D8CFBF' }}>
            <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#4A5D4A' }}>
              {tr("Articles de fond dans le Journal Botanique", "Botanical Journal Articles", "Artikel im Botanischen Journal")}
            </div>
            <div>
              <button 
                onClick={() => onNavigate('blog', 'saule-salicine-aspirine-histoire-totum')}
                className="text-sm font-semibold underline hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#1E2E25' }}
              >
                {tr(
                  "Du saule à l'aspirine : ce que l'isolement nous apprend du totum →",
                  "From willow to aspirin: what molecular isolation teaches us about totum →",
                  "Von der Weide zu Aspirin: Was Isolierung uns über das Totum lehrt →"
                )}
              </button>
            </div>
            <div>
              <button 
                onClick={() => onNavigate('blog')}
                className="text-xs font-semibold hover:text-[#E8772E] transition-colors cursor-pointer"
                style={{ color: '#4A5D4A' }}
              >
                {tr("Consulter l'ensemble du Journal Botanique & Blog →", "Browse the Botanical Journal & Blog →", "Zum gesamten Botanischen Journal & Blog →")}
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
            <strong style={{ color: '#1E2E25' }}>{tr("Avertissement éducatif : ", "Educational disclaimer: ", "Bildungshinweis: ")}</strong>
            {tr(
              "Bloom by BotaniK propose une approche éducative de la préparation botanique. Nos contenus ne remplacent pas un avis médical, un diagnostic ou un traitement.",
              "Bloom by BotaniK offers an educational approach to botanical preparation. Our content does not replace medical advice, diagnosis, or treatment.",
              "Bloom by BotaniK bietet einen pädagogischen Ansatz zur Pflanzenzubereitung. Unsere Inhalte ersetzen weder ärztlichen Rat noch eine Diagnose oder Behandlung."
            )}
          </p>
        </section>

      </div>
    </div>
  );
}