import React from 'react';
import { 
  FlaskConical, 
  Thermometer, 
  Clock, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  ChevronRight, 
  BookOpen, 
  Activity, 
  ArrowRight, 
  Check, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Award,
  Layers,
  Heart,
  Scale,
  Zap,
  Info,
  Beaker,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import { TooltipLexique } from './components/TooltipLexique';

interface PillarPageProps {
  pillar: 'guide-complet-extraction-botanique-maison' | 'remedes-naturels-maison-guide' | 'totum-vegetal-comprendre' | 'cosmetiques-naturels-diy' | 'phytotherapie-moderne-scientifique';
  lang: Language;
  onNavigate: (view: View, param?: string) => void;
}

const getTr = (lang: Language) => (fr: string, en: string, de: string) =>
  lang === 'fr' ? fr : lang === 'de' ? de : en;

export default function PillarPagesContent({ pillar, lang, onNavigate }: PillarPageProps) {
  if (pillar === 'guide-complet-extraction-botanique-maison') {
    return <PillarGuideExtraction onNavigate={onNavigate} lang={lang} />;
  }
  if (pillar === 'remedes-naturels-maison-guide') {
    return <PillarRemedesNaturels onNavigate={onNavigate} lang={lang} />;
  }
  if (pillar === 'totum-vegetal-comprendre') {
    return <PillarTotumVegetal onNavigate={onNavigate} lang={lang} />;
  }
  if (pillar === 'cosmetiques-naturels-diy') {
    return <PillarCosmetiquesDIY onNavigate={onNavigate} lang={lang} />;
  }
  return <PillarPhytotherapieScientifique onNavigate={onNavigate} lang={lang} />;
}

/* =========================================================================
   1. PILLAR : GUIDE COMPLET EXTRACTION BOTANIQUE À DOMICILE
   Schema: HowTo + FAQPage + Article
========================================================================= */
function PillarGuideExtraction({ onNavigate, lang }: { onNavigate: (v: View, p?: string) => void; lang: Language }) {
  const tr = getTr(lang);
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment réaliser une extraction botanique de précision à domicile",
    "description": "Guide technique d'extraction des principes actifs végétaux : choix des solvants, thermorégulation et préservation du totum.",
    "totalTime": "PT45M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sélection et calibrage de la matière végétale",
        "text": "Coupez les plantes médicinales en fragments réguliers de 2 à 4 mm pour maximiser la surface de contact sans écraser les parois cellulaires."
      },
      {
        "@type": "HowToStep",
        "name": "Choix du solvant adapté",
        "text": "Sélectionnez l'eau osmosée pour les polyphénols hydrosolubles ou une huile végétale vierge pour les terpènes lipophiles."
      },
      {
        "@type": "HowToStep",
        "name": "Thermorégulation contrôlée",
        "text": "Chauffez entre 45°C et 60°C maximum en milieu hermétique avec agitation vortex pour éviter la dégradation thermique."
      },
      {
        "@type": "HowToStep",
        "name": "Filtration et conservation",
        "text": "Filtrez à 60 microns et conditionnez en flacon verre ambré à l'abri de l'oxygène."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi ne faut-il pas faire bouillir l'eau pour extraire les plantes ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'eau à 100°C détruit instantanément les fractions aromatiques volatiles (monoterpènes) et dénature les flavonoïdes protecteurs thermolabiles au-delà de 65°C."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre une tisane et une extraction thermo-cinétique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La tisane est une infusion statique exposée à l'air libre. L'extraction thermo-cinétique en chambre close maintient une agitation régulière et une température régulée pour favoriser le transfert des actifs sans ébullition prolongée (rendement variable selon la plante et le solvant, sans mesure chiffrée universelle)."
        }
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* Hero Header */}
      <header className="relative bg-[#3E4A3D] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8AB8A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrumennavigation")} className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">{tr("Accueil", "Home", "Startseite")}</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">{tr("Guides", "Guides", "Leitfäden")}</button>
            <span>/</span>
            <span className="text-[#C8AB8A] font-medium">{tr("Extraction Botanique Maison", "Home Botanical Extraction", "Botanische Extraktion zu Hause")}</span>
          </nav>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest mb-6">
            <FlaskConical className="w-4 h-4" />
            <span>{tr("Guide Pilier • Totum & Précision", "Pillar Guide • Totum & Precision", "Pfeiler-Guide • Totum & Präzision")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            {tr(
              "Guide Complet : Extraction Botanique à Domicile — Totum, Solvants & Températures",
              "Complete Guide: Home Botanical Extraction — Totum, Solvents & Temperatures",
              "Kompletter Guide: Botanische Extraktion zu Hause — Totum, Lösungsmittel & Temperaturen"
            )}
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            {tr(
              "Maîtrisez la science de l'extraction des plantes médicinales chez vous : comparez les 4 méthodes d'extraction, choisissez le solvant idéal, régulez la température et découvrez comment préserver le Totum végétal sans dégradation.",
              "Master home botanical extraction science: compare the 4 extraction methods, choose the ideal solvent, regulate temperature, and preserve the plant Totum without thermal degradation.",
              "Meistern Sie die Wissenschaft der häuslichen Pflanzenextraktion: Vergleichen Sie die 4 Methoden, wählen Sie das passende Lösungsmittel und bewahren Sie das pflanzliche Totum ohne Hitzeschäden."
            )}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8AB8A]" /> {tr("Lecture : 18 min • 3 400 mots", "Reading: 18 min • 3,400 words", "Lesezeit: 18 Min. • 3.400 Wörter")}</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#C8AB8A]" /> {tr("Rédaction éditoriale Bloom by BotaniK", "Bloom by BotaniK Editorial Team", "Redaktion Bloom by BotaniK")}</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C8AB8A]" /> {tr("Précautions & Sécurité d'usage", "Usage Precautions & Safety", "Vorsichts- & Sicherheitshinweise")}</span>
          </div>
        </div>
      </header>

      {/* Table des Matières Interactive */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#D8CBB7]/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#3E4A3D] mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C8AB8A]" /> {tr("Sommaire du Guide d'Extraction", "Extraction Guide Contents", "Inhalt des Extraktions-Guides")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <a href="#intro" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">1.</span> {tr("Pourquoi extraire chez soi ?", "Why extract at home?", "Warum zu Hause extrahieren?")}</a>
            <a href="#totum" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">2.</span> {tr("Le Totum végétal : définition & synergie", "The plant Totum: definition & synergy", "Das pflanzliche Totum: Definition & Synergie")}</a>
            <a href="#methodes" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">3.</span> {tr("Les 4 méthodes d'extraction comparées", "The 4 extraction methods compared", "Die 4 Extraktionsmethoden im Vergleich")}</a>
            <a href="#solvants" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">4.</span> {tr("Solvants : eau, huile, alcool, glycérine", "Solvents: water, oil, alcohol, glycerin", "Lösungsmittel: Wasser, Öl, Alkohol, Glycerin")}</a>
            <a href="#temperatures" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">5.</span> {tr("Températures optimales par famille", "Optimal temperatures by family", "Optimale Temperaturen nach Familie")}</a>
            <a href="#materiel" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">6.</span> {tr("Équipement & système BloomLab", "Equipment & BloomLab system", "Ausstattung & BloomLab-System")}</a>
            <a href="#erreurs" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">7.</span> {tr("Erreurs courantes à éviter", "Common mistakes to avoid", "Häufige Fehler vermeiden")}</a>
            <a href="#conservation" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#C8AB8A] transition-colors flex items-center gap-2"><span className="font-bold text-[#C8AB8A]">8.</span> {tr("Conservation & durée de vie", "Storage & shelf life", "Aufbewahrung & Haltbarkeit")}</a>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-6 space-y-16">
        
        <section id="intro" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#C8AB8A]">
            <span>{tr("Section 01", "Section 01", "Abschnitt 01")}</span><span>•</span><span>{tr("Autonomie Botanique", "Botanical Autonomy", "Botanische Autonomie")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("1. Introduction : Pourquoi extraire chez soi ?", "1. Introduction: Why extract at home?", "1. Einführung: Warum zu Hause extrahieren?")}</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">{tr("Pendant des siècles, l'herboristerie familiale constituait le premier réflexe de santé préventive. Aujourd'hui, l'immense majorité des compléments alimentaires du commerce repose sur des poudres atomisées, des extraits standardisés à une seule molécule de synthèse ou des gélules stockées depuis des mois dans des entrepôts chauds.", "For centuries, home herbalism offered an everyday preventive approach. Today, most commercial supplements rely on spray-dried powders or isolated standardized extracts stored for months before use.", "Über Jahrhunderte war die familiäre Pflanzenkunde Teil der täglichen Routine. Heute basieren die meisten industriellen Produkte auf sprühgetrockneten Pulvern oder isolierten Einzelextrakten.")}</p>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">{tr("Réaliser vos propres extractions botaniques à domicile permet de reprendre le contrôle absolu sur trois leviers fondamentaux :", "Preparing your own botanical extracts at home restores direct control over three essential pillars:", "Eigene botanische Extraktionen zu Hause geben Ihnen volle Kontrolle über drei zentrale Säulen:")}</p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#3E4A3D] mb-2">{tr("Fraîcheur & Intégrité", "Freshness & Integrity", "Frische & Integrität")}</h3>
              <p className="text-xs text-[#1B3022]/70">{tr("Zéro oxydation. Les principes volatils et les enzymes vivantes sont capturés à la minute même où la plante est extraite.", "Minimal oxidation. Volatile fractions are captured fresh at the moment of preparation.", "Minimale Oxidation. Flüchtige Bestandteile werden frisch bei der Zubereitung erfasst.")}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#3E4A3D] mb-2">{tr("Traçabilité Totale", "Full Traceability", "Volle Rückverfolgbarkeit")}</h3>
              <p className="text-xs text-[#1B3022]/70">{tr("Vous choisissez des plantes sauvages ou certifiées biologiques, exemptes d'excipients, de stéarate de magnésium ou de solvants pétrochimiques.", "You choose organic or wildcrafted plants free from synthetic binders or petrochemical solvents.", "Sie wählen Bio- oder Wildpflanzen ohne synthetische Hilfsstoffe.")}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#3E4A3D] mb-2">{tr("Précision d'Usage", "Preparation Precision", "Präzise Dosierung")}</h3>
              <p className="text-xs text-[#1B3022]/70">{tr("Possibilité d'adapter le ratio plante/solvant et de calibrer les prises selon votre routine botanique.", "Adapt plant-to-solvent ratios cleanly to match your everyday botanical routine.", "Passen Sie das Pflanzen-Lösungsmittel-Verhältnis gezielt an Ihre Routine an.")}</p>
            </div>
          </div>
        </section>

        <section id="totum" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#C8AB8A]"><span>{tr("Section 02", "Section 02", "Abschnitt 02")}</span><span>•</span><span>{tr("Concept Fondamental", "Core Concept", "Grundkonzept")}</span></div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("2. Le Totum Végétal : Définition et Puissance de la Synergie", "2. The Plant Totum: Definition and Synergy", "2. Das Pflanzliche Totum: Definition und Synergie")}</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">{tr("En pharmacognosie, le Totum végétal désigne l'intégralité du complexe moléculaire vivant d'une plante : non seulement son principe actif réputé majeur, mais également tous ses cofacteurs naturels (polyphénols, flavonoïdes, tanins, mucilages, minéraux, terpènes).", "In pharmacognosy, the plant Totum designates the full molecular ensemble of a plant: not only its headline compound, but all natural cofactors (polyphenols, flavonoids, tannins, mucilages, minerals, terpenes).", "In der Pharmakognosie bezeichnet das pflanzliche Totum das gesamte molekulare Spektrum einer Pflanze einschließlich aller natürlichen Kofaktoren.")}</p>
          <div className="p-6 rounded-2xl bg-[#3E4A3D] text-white space-y-3">
            <h3 className="font-bold text-lg text-[#C8AB8A]">{tr("La Règle d'Or du Vivant : 1 + 1 = 5", "The Living Rule of Synergy: 1 + 1 = 5", "Die goldene Regel der Synergie: 1 + 1 = 5")}</h3>
            <p className="text-sm text-[#FAF7F2]/90 leading-relaxed">{tr("Une molécule isolée agit souvent de manière brutale. À l'inverse, le Totum agit par synergie de réseau (network pharmacology) : plusieurs molécules interagissent ensemble de façon équilibrée et biodisponible.", "Isolated compounds act on a single target, whereas the whole Totum works via network synergy across cofactors for balanced bioavailability.", "Isolierte Moleküle wirken eindimensional, während das Totum über Netzwerksynergie ausgewogen zusammenwirkt.")}</p>
            <div className="pt-2">
              <button onClick={() => onNavigate('totum-vegetal-comprendre')} className="text-xs font-bold text-[#C8AB8A] hover:underline flex items-center gap-1.5">
                {tr("Lire notre dossier dédié : Pourquoi la plante entière est plus puissante →", "Read our dedicated file: Whole plant synergy explained →", "Unser Dossier lesen: Warum die ganze Pflanze stärker ist →")}
              </button>
            </div>
          </div>
        </section>

        <section id="methodes" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#C8AB8A]"><span>{tr("Section 03", "Section 03", "Abschnitt 03")}</span><span>•</span><span>{tr("Comparatif Technique", "Technical Comparison", "Technischer Vergleich")}</span></div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("3. Les 4 Méthodes d'Extraction Comparées", "3. The 4 Extraction Methods Compared", "3. Die 4 Extraktionsmethoden im Vergleich")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3E4A3D] text-[#3E4A3D]">
                  <th className="py-3 px-4 font-bold">{tr("Méthode", "Method", "Methode")}</th>
                  <th className="py-3 px-4 font-bold">{tr("Solvant usuel", "Typical solvent", "Lösungsmittel")}</th>
                  <th className="py-3 px-4 font-bold">{tr("Rendement moléculaire", "Molecular yield", "Molekulare Ausbeute")}</th>
                  <th className="py-3 px-4 font-bold">{tr("Inconvénient majeur", "Main limitation", "Hauptnachteil")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CBB7]/40 text-[#1B3022]/80">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#3E4A3D]">{tr("Infusion classique (Théière)", "Classic infusion (Teapot)", "Klassische Infusion (Kanne)")}</td>
                  <td className="py-3.5 px-4">{tr("Eau à 100°C", "100°C Water", "Wasser bei 100 °C")}</td>
                  <td className="py-3.5 px-4 text-rose-600 font-semibold">{tr("Partiel (non régulé)", "Partial (unregulated)", "Teilweise (ungeregelt)")}</td>
                  <td className="py-3.5 px-4">{tr("Destruction des composés thermolabiles et perte des arômes volatils.", "Degrades heat-sensitive compounds and loses volatile aromatics.", "Zerstört hitzeempfindliche Stoffe und flüchtige Aromen.")}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#3E4A3D]">{tr("Macération à froid (Bocal)", "Cold maceration (Jar)", "Kaltmazeration (Glas)")}</td>
                  <td className="py-3.5 px-4">{tr("Huile (ou alcool à froid)", "Oil (or cold alcohol)", "Öl (oder kalter Alkohol)")}</td>
                  <td className="py-3.5 px-4 text-amber-600 font-semibold">{tr("Lent et hétérogène", "Slow & uneven", "Langsam & ungleichmäßig")}</td>
                  <td className="py-3.5 px-4">{tr("Durée excessive (3 à 6 semaines), risque d'oxydation et de rancissement.", "Excessive duration (3–6 weeks), higher risk of oxidation.", "Lange Dauer (3–6 Wochen), Risiko von Oxidation.")}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#3E4A3D]">{tr("Décoction traditionnelle", "Traditional decoction", "Traditionelle Dekoktion")}</td>
                  <td className="py-3.5 px-4">{tr("Eau bouillante", "Boiling water", "Kochendes Wasser")}</td>
                  <td className="py-3.5 px-4 text-amber-600 font-semibold">{tr("Ciblé fibres dures", "Targets tough fibers", "Für harte Fasern")}</td>
                  <td className="py-3.5 px-4">{tr("Réservée aux racines coriaces ; détruit irrémédiablement les vitamines et terpènes.", "Limited to tough roots; damages delicate vitamins and terpenes.", "Nur für harte Wurzeln; schädigt empfindliche Vitamine und Terpene.")}</td>
                </tr>
                <tr className="bg-emerald-50/60 font-medium">
                  <td className="py-3.5 px-4 font-black text-[#3E4A3D]">{tr("Extraction Thermo-Cinétique A/B (BloomLab)", "Thermo-Kinetic A/B Extraction (BloomLab)", "Thermokinetische A/B-Extraktion (BloomLab)")}</td>
                  <td className="py-3.5 px-4">{tr("Eau, Huile ou Glycérine", "Water, Oil, or Glycerin", "Wasser, Öl oder Glycerin")}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-black text-sm">{tr("Optimisé par conception (sans dosage labo certifié)", "Optimized by design (no lab assay claimed)", "Konzeptoptimiert (ohne Labormesswert)")}</td>
                  <td className="py-3.5 px-4 text-emerald-800">{tr("Nécessite un matériel de régulation thermique en milieu clos (usage alcool chauffé suspendu).", "Requires sealed temperature-controlled instrumentation (heated alcohol suspended).", "Erfordert geschlossene Temperaturregelung (erhitzter Alkohol ausgesetzt).")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="solvants" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#C8AB8A]"><span>{tr("Section 04", "Section 04", "Abschnitt 04")}</span><span>•</span><span>{tr("Chimie des Solvants", "Solvent Chemistry", "Chemie der Lösungsmittel")}</span></div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("4. Solvants : Eau, Huile, Alcool et Glycérine", "4. Solvents: Water, Oil, Alcohol, and Glycerin", "4. Lösungsmittel: Wasser, Öl, Alkohol und Glycerin")}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#3E4A3D] flex items-center gap-2"><Droplets className="w-4 h-4 text-sky-600" /> {tr("L'Eau Osmosée ou Filtrée", "Filtered or Soft Water", "Gefiltertes Wasser")}</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">{tr("Le solvant universel polaire. Idéal pour extraire les polyphénols, tanins, acides aminés, mucilages et minéraux.", "The universal polar solvent for polyphenols, tannins, amino acids, mucilages, and minerals.", "Das universelle polare Lösungsmittel für Polyphenole, Tannine, Aminosäuren, Schleimstoffe und Mineralien.")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#3E4A3D] flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-600" /> {tr("Les Huiles Végétales Vierges", "Virgin Vegetable Oils", "Native Pflanzenöle")}</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">{tr("Solvant apolaire pour capturer les composés lipophiles : caroténoïdes, tocophérols, huiles essentielles et résines.", "Non-polar solvent capturing lipophilic carotenoids, tocopherols, aromatic oils, and resins.", "Unpolares Lösungsmittel für fettlösliche Carotinoide, Tocopherole, ätherische Öle und Harze.")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#3E4A3D] flex items-center gap-2"><FlaskConical className="w-4 h-4 text-purple-600" /> {tr("La Glycérine Végétale (Glycéré)", "Vegetable Glycerin (Glycerite)", "Pflanzliches Glycerin (Glyzerit)")}</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">{tr("Solvant amphiphile doux, sans alcool, qui capte les flavonoïdes tout en assurant une excellente conservation.", "Gentle alcohol-free solvent capturing water-soluble polyphenols while extending shelf stability.", "Sanftes, alkoholfreies Lösungsmittel für empfindliche Routinen mit langer Haltbarkeit.")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#3E4A3D] flex items-center gap-2"><Activity className="w-4 h-4 text-rose-600" /> {tr("L'Alcool Éthylique (Hors appareil à froid)", "Food-Grade Alcohol (Cold outside appliance)", "Speisealkohol (Kalt außerhalb des Geräts)")}</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">{tr("Solvant historique pour les résines, utilisé uniquement par macération à froid hors appareil électrique (l'extraction alcoolique chauffée en cuve BloomLab® est suspendue).", "Traditional resin solvent used strictly by ambient cold maceration outside electric appliances (heated alcohol inside BloomLab® is suspended).", "Traditionelles Harzlösungsmittel nur zur Kaltmazeration außerhalb elektrischer Geräte (erhitzter Alkohol im BloomLab® ausgesetzt).")} </p>
            </div>
          </div>
        </section>

        <section id="temperatures" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#C8AB8A]"><span>{tr("Section 05", "Section 05", "Abschnitt 05")}</span><span>•</span><span>{tr("Thermorégulation", "Thermoregulation", "Thermoregulation")}</span></div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("5. Températures Optimales par Famille de Plantes", "5. Optimal Temperatures by Plant Family", "5. Optimale Temperaturen nach Pflanzenfamilie")}</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">45°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#3E4A3D]">{tr("Fleurs tendres & Aromatiques volatiles", "Delicate flowers & volatile aromatics", "Zarte Blüten & flüchtige Aromen")}</h3>
                <p className="text-xs text-[#1B3022]/75">{tr("Camomille matricaire, fleur d'oranger, mélisse, rose de Damas.", "Chamomile, orange blossom, lemon balm, Damask rose.", "Kamille, Orangenblüte, Melisse, Damaszener-Rose.")}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-xs shrink-0">55°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#3E4A3D]">{tr("Feuilles structurées & Plantes adaptogènes", "Structured leaves & adaptogenic herbs", "Strukturierte Blätter & Adaptogene")}</h3>
                <p className="text-xs text-[#1B3022]/75">{tr("Romarin, thym, menthe poivrée, sauge, ashwagandha, rhodiola.", "Rosemary, thyme, peppermint, sage, ashwagandha, rhodiola.", "Rosmarin, Thymian, Pfefferminze, Salbei, Ashwagandha, Rhodiola.")}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-700 text-white flex items-center justify-center font-bold text-xs shrink-0">65°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#3E4A3D]">{tr("Racines épaisses, Écorces & Champignons", "Dense roots, barks & botanical mushrooms", "Feste Wurzeln, Rinden & Vitalpilze")}</h3>
                <p className="text-xs text-[#1B3022]/75">{tr("Gingembre, curcuma, cannelle, reishi, chaga.", "Ginger, turmeric, cinnamon, reishi, chaga.", "Ingwer, Kurkuma, Zimt, Reishi, Chaga.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="materiel" className="bg-[#3E4A3D] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8AB8A]/20 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> {tr("Ingénierie Domestique Bloom", "Bloom Home Engineering", "Bloom Haushaltstechnik")}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">{tr("6. L'Extracteur Botanique BloomLab®", "6. The BloomLab® Botanical Extractor", "6. Der Botanische Extraktor BloomLab®")}</h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">{tr("Pour faciliter ces préparations aqueuses et huileuses dans une cuisine, BloomLab® associe une cuve en acier inoxydable 304 alimentaire, une régulation thermique suivie (spécification nominale fabricant), un brassage cinétique et un couvercle hermétique.", "To simplify aqueous and oil preparations at home, BloomLab® combines a food-grade 304 stainless steel chamber, regulated heating (manufacturer nominal specification), kinetic agitation, and a sealed lid.", "Für wässrige und ölige Hauszubereitungen kombiniert BloomLab® eine lebensmittelechte 304-Edelstahlkammer, geregelte Erwärmung (Herstellerangabe), Vortex-Rührung und einen dichten Deckel.")}</p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button onClick={() => onNavigate('bloomlab')} className="px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2">
              {tr("Découvrir la machine BloomLab® (229€) →", "Discover BloomLab® Machine (229€) →", "BloomLab® entdecken (229 €) →")}
            </button>
            <button onClick={() => onNavigate('boutique-kits')} className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer">
              {tr("Voir les kits de plantes associés", "View curated botanical kits", "Passende Pflanzen-Kits ansehen")}
            </button>
          </div>
        </section>

        <section id="erreurs" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("7. Les Erreurs Courantes en Extraction Maison", "7. Common Mistakes in Home Extraction", "7. Häufige Fehler bei der Extraktion zu Hause")}</h2>
          <ul className="space-y-3 text-sm text-[#1B3022]/85">
            <li className="flex items-start gap-3"><AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /><span>{tr("Broyer les plantes en poussière : libère des tanins amers indésirables et complique la filtration.", "Grinding herbs into dust: releases harsh bitter tannins and clogs filtration.", "Kräuter zu Staub mahlen: setzt bittere Tannine frei und erschwert die Filtration.")}</span></li>
            <li className="flex items-start gap-3"><AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /><span>{tr("Extraire à découvert : laisse s'échapper les molécules aromatiques volatiles.", "Extracting uncovered: delicate volatile aromatics evaporate instead of condensing inside the extract.", "Offen extrahieren: flüchtige Aromastoffe entweichen ungenutzt.")}</span></li>
            <li className="flex items-start gap-3"><AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /><span>{tr("Utiliser de l'eau chlorée : le chlore oxyde les polyphénols fragiles.", "Using chlorinated tap water: chlorine rapidly oxidizes fragile polyphenols.", "Gechlortes Wasser nutzen: Chlor oxidiert empfindliche Polyphenole.")}</span></li>
            <li className="flex items-start gap-3"><AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /><span>{tr("Négliger le temps de contact : trop court laisse les actifs dans la fibre, trop long extrait l'amertume ligneuse.", "Ignoring contact time: too short leaves compounds behind; too long extracts woody bitterness.", "Kontaktzeit vernachlässigen: zu kurz verschenkt Wirkstoffe, zu lang löst Bitterstoffe.")}</span></li>
          </ul>
        </section>

        <section id="conservation" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">{tr("8. Conservation et Durée de Vie des Extraits", "8. Storage and Shelf Life of Extracts", "8. Aufbewahrung und Haltbarkeit der Extrakte")}</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40"><h3 className="font-bold text-[#3E4A3D] mb-1">{tr("Extraits Aqueux Frais", "Fresh Aqueous Extracts", "Frische wässrige Extrakte")}</h3><p className="text-[#1B3022]/70">{tr("Préparer à la demande et consommer rapidement au réfrigérateur (vérifier odeur et aspect).", "Prepare fresh and consume promptly refrigerated (check odor and clarity).", "Frisch zubereiten und rasch gekühlt verbrauchen (Geruch und Aussehen prüfen).")}</p></div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40"><h3 className="font-bold text-[#3E4A3D] mb-1">{tr("Huiles Infusées", "Infused Oils", "Infundierte Öle")}</h3><p className="text-[#1B3022]/70">{tr("En flacon verre ambré hermétique, à l'abri de la lumière et de la chaleur (selon l'huile support).", "In an airtight amber glass bottle away from light and heat (depends on carrier oil).", "In luftdichter Braunglasflasche licht- und wärmegeschützt (abhängig vom Basisöl).")}</p></div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40"><h3 className="font-bold text-[#3E4A3D] mb-1">{tr("Macérats Glycérinés", "Glycerin Macerates", "Glyzerin-Mazerate")}</h3><p className="text-[#1B3022]/70">{tr("Flacon ambré à l'abri de la lumière directe et des sources de chaleur.", "Amber glass away from direct light and heat sources.", "Braunglas geschützt vor direktem Licht und Wärmequellen.")}</p></div>
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-lg font-bold text-[#3E4A3D] flex items-center gap-2"><Compass className="w-5 h-5 text-[#C8AB8A]" /> {tr("Continuer votre exploration du Silo Extraction", "Continue exploring the Extraction Cluster", "Weitere Inhalte zur Extraktion entdecken")}</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
            <button onClick={() => onNavigate('totum-vegetal-comprendre')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between"><span>{tr("Le Totum Végétal expliqué en détail", "The Plant Totum explained in detail", "Das pflanzliche Totum im Detail erklärt")}</span><ArrowRight className="w-4 h-4 text-[#C8AB8A]" /></button>
            <button onClick={() => onNavigate('blog', 'extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between"><span>{tr("Extraction à froid vs extraction à chaud", "Cold extraction vs hot extraction", "Kaltextraktion vs. Heißextraktion")}</span><ArrowRight className="w-4 h-4 text-[#C8AB8A]" /></button>
            <button onClick={() => onNavigate('remedes-naturels-maison-guide')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between"><span>{tr("Guide pratique des soins botaniques maison", "Practical home botanical care guide", "Praxisleitfaden für botanische Hauspflege")}</span><ArrowRight className="w-4 h-4 text-[#C8AB8A]" /></button>
            <button onClick={() => onNavigate('cosmetiques-naturels-diy')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between"><span>{tr("Cosmétiques naturels DIY & macérats", "DIY Natural Cosmetics & Macerates", "DIY Naturkosmetik & Mazerate")}</span><ArrowRight className="w-4 h-4 text-[#C8AB8A]" /></button>
          </div>
        </section>
      </main>
    </article>
  );
}

/* =========================================================================
   2. PILLAR : REMÈDES NATURELS MAISON
   Schema: Article + FAQPage
========================================================================= */
function PillarRemedesNaturels({ onNavigate, lang }: { onNavigate: (v: View, p?: string) => void; lang: Language }) {
  const tr = getTr(lang);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": tr(
          "Quelles sont les plantes indispensables pour débuter en herboristerie maison ?",
          "What are the essential plants to start home herbalism?",
          "Welche Pflanzen sind für den Einstieg in die Hauskräuterkunde unverzichtbar?"
        ),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": tr(
            "Les 5 piliers recommandés sont la camomille matricaire (système nerveux & digestion), le thym à linalol (sphère ORL), la mélisse (sommeil & stress), le romarin (foie & clarté mentale) et le curcuma (équilibre tissulaire).",
            "The 5 recommended pillars are German chamomile (nervous system & digestion), linalool thyme (respiratory comfort), lemon balm (sleep & stress), rosemary (liver & mental clarity), and turmeric (cellular balance).",
            "Die 5 empfohlenen Säulen sind Echte Kamille (Nervensystem & Verdauung), Linalool-Thymian (Atemwege), Zitronenmelisse (Schlaf & Stress), Rosmarin (Leber & geistige Klarheit) und Kurkuma (Gewebebalance)."
          )
        }
      },
      {
        "@type": "Question",
        "name": tr(
          "Peut-on remplacer un traitement médical par des soins botaniques ?",
          "Can botanical home care replace a prescribed medical treatment?",
          "Können pflanzliche Hausmittel eine ärztliche Behandlung ersetzen?"
        ),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": tr(
            "Non. Les préparations botaniques s'inscrivent dans une démarche éducative et d'hygiène de terrain. Elles ne se substituent jamais à un diagnostic ou une prescription médicale.",
            "No. Botanical preparations are part of an educational and terrain-hygiene approach. They never replace a medical diagnosis or prescription.",
            "Nein. Pflanzliche Zubereitungen dienen einem pädagogischen Ansatz zur Terrain-Pflege. Sie ersetzen niemals eine ärztliche Diagnose oder Verordnung."
          )
        }
      }
    ]
  };

  const tenPlants = [
    {
      name: tr("1. Mélisse Officinale", "1. Lemon Balm (Melissa officinalis)", "1. Zitronenmelisse"),
      desc: tr(
        "Apaise l'axe intestin-cerveau, calme les tensions digestives d'origine nerveuse et favorise l'endormissement.",
        "Soothes the gut-brain axis, eases nervous digestive tension, and supports restful sleep.",
        "Beruhigt die Darm-Hirn-Achse, entspannt nervöse Verdauungsbeschwerden und fördert das Einschlafen."
      )
    },
    {
      name: tr("2. Camomille Matricaire", "2. German Chamomile", "2. Echte Kamille"),
      desc: tr(
        "Apigénine apaisante naturelle (affinité récepteurs GABA), douceur pour les muqueuses gastriques.",
        "Natural apigenin (GABA receptor affinity) supporting calm and comfort for sensitive digestive mucosa.",
        "Natürliches Apigenin (GABA-Rezeptor-Affinität) und milde Beruhigung für die Magenschleimhaut."
      )
    },
    {
      name: tr("3. Thym à Linalol", "3. Linalool Thyme", "3. Linalool-Thymian"),
      desc: tr(
        "Grand protecteur de la sphère respiratoire sans agressivité hépatique, idéal pour le confort hivernal.",
        "Gentle respiratory ally with high liver tolerance, ideal for seasonal throat and airway comfort.",
        "Sanfter Begleiter für die Atemwege mit hoher Leberverträglichkeit, ideal für die Winterzeit."
      )
    },
    {
      name: tr("4. Romarin à Cinéole", "4. Cineole Rosemary", "4. Cineol-Rosmarin"),
      desc: tr(
        "Soutien hépatobiliaire doux, clarté mentale et richesse en acide rosmarinique antioxydant.",
        "Gentle hepatobiliary support, mental clarity, and rich in antioxidant rosmarinic acid.",
        "Sanfte Leber-Galle-Unterstützung, geistige Klarheit und reich an antioxidativer Rosmarinsäure."
      )
    },
    {
      name: tr("5. Curcuma Longa", "5. Curcuma Longa (Turmeric)", "5. Kurkuma Longa"),
      desc: tr(
        "Soutien de la souplesse articulaire et de l'équilibre de la barrière intestinale.",
        "Supports joint flexibility, cellular antioxidant balance, and intestinal barrier integrity.",
        "Unterstützt die Gelenkflexibilität und das Gleichgewicht der Darmbarriere."
      )
    },
    {
      name: tr("6. Valériane Officinale", "6. Valerian Root", "6. Echter Baldrian"),
      desc: tr(
        "Favorise la détente musculaire et un sommeil profond sans somnolence diurne résiduelle.",
        "Encourages muscular relaxation and deep sleep without residual daytime drowsiness.",
        "Fördert Muskelentspannung und tiefen Schlaf ohne Tagesmüdigkeit."
      )
    },
    {
      name: tr("7. Ashwagandha (Withania)", "7. Ashwagandha (Withania somnifera)", "7. Ashwagandha (Schlafbeere)"),
      desc: tr(
        "Plante adaptogène majeure pour accompagner l'équilibre nerveux face au stress chronique.",
        "Major adaptogenic root traditionally used to support nervous balance and stress resilience.",
        "Bedeutende adaptogene Wurzel zur Unterstützung der Stressresistenz und inneren Ruhe."
      )
    },
    {
      name: tr("8. Menthe Poivrée", "8. Peppermint", "8. Pfefferminze"),
      desc: tr(
        "Confort digestif rapide grâce au menthol naturel et sensation de fraîcheur apaisante.",
        "Fast digestive comfort via natural menthol and soothing cooling relief.",
        "Schnelles Verdauungswohl durch natürliches Menthol und wohltuende Frische."
      )
    },
    {
      name: tr("9. Reine des Prés", "9. Meadowsweet", "9. Echtes Mädesüß"),
      desc: tr(
        "Dérivés salicylés végétaux tamponnés par les tanins protecteurs pour le confort articulaire.",
        "Natural salicylate precursors buffered by protective tannins for gentle joint comfort.",
        "Natürliche Salicylat-Vorstufen, gepuffert durch schützende Gerbstoffe für Gelenkkomfort."
      )
    },
    {
      name: tr("10. Sureau Noir (Baies & Fleurs)", "10. Black Elderberry (Berries & Flowers)", "10. Schwarzer Holunder (Beeren & Blüten)"),
      desc: tr(
        "Allié traditionnel de l'immunité saisonnière et du confort respiratoire lors des premiers froids.",
        "Traditional ally for seasonal immunity and respiratory comfort during cold weather.",
        "Traditioneller Begleiter für die saisonale Abwehrkraft und Atemwegskomfort in der kalten Jahreszeit."
      )
    }
  ];

  const protocols = [
    {
      title: tr("Sphère Stress & Sérénité", "Stress & Serenity Sphere", "Bereich Stress & Gelassenheit"),
      badge: tr("Infusion 50°C • 25 min", "Infusion 50°C • 25 min", "Aufguss 50°C • 25 Min."),
      text: tr(
        "Synergie : Mélisse (40%) + Camomille (30%) + Ashwagandha (30%). Solvant : Eau faiblement minéralisée. Usage général : 2 tasses/jour entre 17h et 21h.",
        "Synergy: Lemon Balm (40%) + Chamomile (30%) + Ashwagandha (30%). Solvent: Low-mineral water. General use: 2 cups/day between 5 PM and 9 PM.",
        "Synergie: Melisse (40%) + Kamille (30%) + Ashwagandha (30%). Lösungsmittel: Mineralarmes Wasser. Anwendung: 2 Tassen/Tag zwischen 17 und 21 Uhr."
      )
    },
    {
      title: tr("Sphère Sommeil Profond", "Deep Sleep Sphere", "Bereich Tiefer Schlaf"),
      badge: tr("Infusion 55°C • 30 min", "Infusion 55°C • 30 min", "Aufguss 55°C • 30 Min."),
      text: tr(
        "Synergie : Valériane racine (40%) + Passiflore (30%) + Lavande vraie (30%). Solvant : Eau ou lait végétal d'avoine. Usage général : 1 tasse 45 minutes avant le coucher.",
        "Synergy: Valerian root (40%) + Passionflower (30%) + True Lavender (30%). Solvent: Water or oat milk. General use: 1 cup 45 minutes before bedtime.",
        "Synergie: Baldrianwurzel (40%) + Passionsblume (30%) + Echter Lavendel (30%). Lösungsmittel: Wasser oder Haferdrink. Anwendung: 1 Tasse 45 Min. vor dem Schlafengehen."
      )
    },
    {
      title: tr("Sphère Confort Articulaire", "Joint Comfort Sphere", "Bereich Gelenkkomfort"),
      badge: tr("Extraction Séquentielle A/B", "Sequential A/B Extraction", "Sequentielle A/B-Extraktion"),
      text: tr(
        "Synergie : Curcuma rhizome + Poivre noir (pipérine) + Reine des Prés + Gingembre. Solvant : Huile vierge de cameline puis eau tiède.",
        "Synergy: Turmeric rhizome + Black pepper (piperine) + Meadowsweet + Ginger. Solvent: Virgin camelina oil followed by warm water.",
        "Synergie: Kurkuma-Rhizom + Schwarzer Pfeffer (Piperin) + Mädesüß + Ingwer. Lösungsmittel: Natives Leindotteröl und warmes Wasser."
      )
    }
  ];

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <header className="relative bg-[#3E4A3D] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrümel")} className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">{tr("Accueil", "Home", "Startseite")}</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">{tr("Guides", "Guides", "Leitfäden")}</button>
            <span>/</span>
            <span className="text-[#C8AB8A] font-medium">{tr("Soins Botaniques Maison", "Home Botanical Care", "Botanische Hauspflege")}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest mb-6">
            <Leaf className="w-4 h-4" />
            <span>{tr("Guide Pratique Débutants • Herboristerie Familiale", "Beginner's Practical Guide • Home Herbalism", "Praxisleitfaden für Einsteiger • Hauskräuterkunde")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            {tr(
              "Soins Botaniques Maison : Guide Pratique pour Débutants — Bloom by BotaniK",
              "Home Botanical Care: Practical Guide for Beginners — Bloom by BotaniK",
              "Botanische Hauspflege: Praxisleitfaden für Einsteiger — Bloom by BotaniK"
            )}
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            {tr(
              "Comment préparer vos propres extraits botaniques sécurisés pour accompagner le stress, le sommeil, la récupération et la digestion. Les 10 plantes fondamentales, les ratios d'extraction et les règles de prudence indispensables.",
              "How to prepare safe botanical extracts at home to support stress balance, sleep, recovery, and digestion. The 10 foundational plants, extraction ratios, and essential safety rules.",
              "Wie Sie sichere Pflanzenextrakte für Zuhause zubereiten, um Stressabbau, Schlaf, Regeneration und Verdauung zu begleiten. Die 10 Basispflanzen, Extraktionsverhältnisse und Sicherheitsregeln."
            )}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8AB8A]" /> {tr("2 900 mots • 15 min", "2,900 words • 15 min", "2.900 Wörter • 15 Min.")}</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C8AB8A]" /> {tr("Précautions & Interactions documentées", "Documented Precautions & Interactions", "Dokumentierte Vorsichtsmaßnahmen & Wechselwirkungen")}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("Les 10 Plantes Indispensables à la Maison", "The 10 Essential Plants for Home Preparation", "Die 10 unverzichtbaren Pflanzen für Zuhause")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            {tenPlants.map((plant, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
                <h3 className="font-bold text-sm text-[#3E4A3D]">{plant.name}</h3>
                <p className="text-[#1B3022]/75 mt-1">{plant.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("Protocoles Éducatifs par Sphère", "Educational Protocols by Sphere", "Pädagogische Protokolle nach Wirkbereich")}
          </h2>
          <div className="space-y-4 text-xs">
            {protocols.map((proto, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-2">
                <h3 className="font-bold text-sm text-[#3E4A3D] flex items-center justify-between gap-2">
                  <span>{proto.title}</span>
                  <span className="text-[#C8AB8A]">{proto.badge}</span>
                </h3>
                <p className="text-[#1B3022]/80">{proto.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-700" /> {tr("Sécurité et Contre-Indications Absolues", "Safety and Absolute Contraindications", "Sicherheit und absolute Gegenanzeigen")}
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            {tr(
              "Toujours vérifier l'absence d'allergie (notamment aux Astéracées ou dérivés salicylés). Femmes enceintes, allaitantes, enfants et personnes sous traitement médical : demander impérativement l'avis d'un professionnel de santé avant toute préparation active.",
              "Always check for allergies (especially to Asteraceae or salicylate derivatives). Pregnant or breastfeeding women, children, and individuals under medical treatment must consult a healthcare professional before active use.",
              "Immer auf mögliche Allergien prüfen (insbesondere Korbblütler oder Salicylat-Derivate). Schwangere, Stillende, Kinder und Personen unter ärztlicher Behandlung müssen vor der Anwendung einen Arzt konsultieren."
            )}
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#3E4A3D] uppercase tracking-wider">{tr("Articles & Recettes associés", "Related Articles & Recipes", "Zugehörige Artikel & Rezepte")}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('blog', 'plantes-adaptogenes-stress')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("Plantes adaptogènes pour le stress", "Adaptogenic plants for stress", "Adaptogene Pflanzen bei Stress")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
            <button onClick={() => onNavigate('blog', 'plantes-dormir-profondement')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("5 plantes pour un sommeil profond", "5 plants for deep sleep", "5 Pflanzen für tiefen Schlaf")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
          </div>
        </section>
      </main>
    </article>
  );
}

/* =========================================================================
   3. PILLAR : LE TOTUM VÉGÉTAL EXPLIQUÉ
   Schema: Article + DefinedTerm
========================================================================= */
function PillarTotumVegetal({ onNavigate, lang }: { onNavigate: (v: View, p?: string) => void; lang: Language }) {
  const tr = getTr(lang);
  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": tr("Totum Végétal", "Plant Totum", "Pflanzen-Totum"),
    "description": tr(
      "Ensemble des principes actifs, cofacteurs et substances secondaires naturellement présents dans une plante, agissant en synergie physiologique.",
      "The complete ensemble of active compounds, cofactors, and secondary metabolites naturally present in a plant, working in physiological synergy.",
      "Die Gesamtheit aller Wirkstoffe, Kofaktoren und sekundären Pflanzenstoffe einer Pflanze, die in physiologischer Synergie zusammenwirken."
    ),
    "inDefinedTermSet": "https://bloombybotanik.com/lexique/"
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(definedTermSchema)}</script>

      <header className="relative bg-[#3E4A3D] text-white py-16 px-6 overflow-hidden border-b border-white/10">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrümel")} className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
                <button onClick={() => onNavigate('home')} className="hover:underline">{tr("Accueil", "Home", "Startseite")}</button>
                <span>/</span>
                <button onClick={() => onNavigate('guides')} className="hover:underline">{tr("Guides", "Guides", "Leitfäden")}</button>
                <span>/</span>
                <span className="text-[#C8AB8A] font-medium">{tr("Totum Végétal", "Plant Totum", "Pflanzen-Totum")}</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{tr("Fondement Scientifique • Synergie Moléculaire", "Scientific Foundation • Molecular Synergy", "Wissenschaftliche Basis • Molekulare Synergie")}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                {tr(
                  "Le Totum Végétal Expliqué : Pourquoi la Plante Entière est Plus Puissante",
                  "The Plant Totum Explained: Why the Whole Plant Is Stronger",
                  "Das Pflanzen-Totum erklärt: Warum die ganze Pflanze wirksamer ist"
                )}
              </h1>
              <p className="text-base sm:text-lg text-[#FAF7F2]/90 leading-relaxed max-w-2xl">
                {tr(
                  "De Paracelse à la network pharmacology moderne : découvrez pourquoi l'extrait de totum végétal surpasse les molécules isolées synthétiques, les preuves scientifiques de la synergie et comment préserver cette intelligence vivante.",
                  "From Paracelsus to modern network pharmacology: discover why whole-plant totum extracts surpass isolated synthetic molecules, the scientific evidence for synergy, and how to preserve this living intelligence.",
                  "Von Paracelsus bis zur modernen Netzwerkpharmakologie: Erfahren Sie, warum das gesamte Pflanzen-Totum isolierte Moleküle übertrifft und wie diese Synergie bewahrt wird."
                )}
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8AB8A]" /> {tr("2 300 mots • 12 min", "2,300 words • 12 min", "2.300 Wörter • 12 Min.")}</span>
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#C8AB8A]" /> {tr("Références PubMed & Pharmacognosie", "PubMed & Pharmacognosy References", "PubMed- & Pharmakognosie-Referenzen")}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 aspect-[16/10] w-full max-w-md max-h-[280px]">
                <img
                  src="/images/8.png"
                  alt={tr("Le Totum Végétal — Extraction et synergie intégrale de la plante", "The Plant Totum — Full plant extraction and synergy", "Das Pflanzen-Totum — Ganzheitliche Pflanzenextraktion")}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-center">
                  {tr("Totum végétal : préservation de l'intégrité moléculaire", "Plant totum: preserving molecular integrity", "Pflanzen-Totum: Bewahrung der molekularen Integrität")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("1. De Paracelse aux Réseaux Biologiques Modernes", "1. From Paracelsus to Modern Biological Networks", "1. Von Paracelsus zu modernen biologischen Netzwerken")}
          </h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "Dès le XVIe siècle, Paracelse affirmait que « Dans chaque plante se trouve toute une pharmacie ». Au XXe siècle, la chimie réductionniste a cherché à isoler une unique molécule par plante (comme l'acide acétylsalicylique issu de la reine des prés), révélant rapidement des limites comme l'irritation gastrique.",
              "In the 16th century, Paracelsus wrote that 'Every plant contains an entire pharmacy.' In the 20th century, reductionist chemistry sought to isolate single molecules (like acetylsalicylic acid from meadowsweet), quickly exposing limitations such as gastric irritation.",
              "Bereits im 16. Jahrhundert betonte Paracelsus, dass in jeder Pflanze eine ganze Apotheke steckt. Die reduktionistische Chemie des 20. Jahrhunderts isolierte Einzelmoleküle (wie Acetylsalicylsäure aus Mädesüß) und stieß bald auf Grenzen wie Magenreizungen."
            )}
          </p>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "Dans la reine des prés naturelle, la salicine est accompagnée de flavonoïdes protecteurs et de tanins qui régulent sa libération dans le temps. C'est l'essence même du Totum végétal : une intelligence d'auto-tamponnage et de synergie.",
              "In whole meadowsweet, salicin is naturally paired with protective flavonoids and tannins that regulate its release. This is the essence of the Plant Totum: self-buffering intelligence and synergy.",
              "Im natürlichen Mädesüß wird Salicin von schützenden Flavonoiden und Gerbstoffen begleitet, die seine Freisetzung regulieren. Das ist die Essenz des Pflanzen-Totums: natürliche Pufferung und Synergie."
            )}
          </p>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("2. Totum vs Molécule Isolée : Le Cas d'École du Saule Blanc", "2. Totum vs. Isolated Molecule: The White Willow Case", "2. Totum vs. isoliertes Molekül: Der Fall der Silberweide")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <h3 className="font-bold text-sm text-rose-900">{tr("Molécule Isolée (Synthèse)", "Isolated Molecule (Synthetic)", "Isoliertes Molekül (Synthese)")}</h3>
              <p className="text-rose-900/80 leading-relaxed">
                {tr(
                  "Action brutale et brève sans composés tampons, pouvant fragiliser l'équilibre de la muqueuse stomacale.",
                  "Abrupt, short-lived action without natural buffering companions, risking irritation of the gastric lining.",
                  "Abrupte, kurze Wirkung ohne natürliche Begleitstoffe, was die Magenschleimhaut reizen kann."
                )}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-sm text-emerald-900">{tr("Totum Écorce de Saule Blanc", "White Willow Bark Totum", "Silberweidenrinden-Totum")}</h3>
              <p className="text-emerald-900/80 leading-relaxed">
                {tr(
                  "Biodisponibilité progressive : les polyphénols et tanins accompagnent les dérivés salicylés dans le respect du terrain digestif.",
                  "Gradual bioavailability: polyphenols and tannins accompany salicylate precursors while respecting digestive balance.",
                  "Schrittweise Bioverfügbarkeit: Polyphenole und Gerbstoffe begleiten Salicylat-Vorstufen schonend für den Verdauungstrakt."
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("3. Comment BloomLab Préserve le Totum avec le Séquençage A/B", "3. How BloomLab Preserves the Totum with A/B Sequencing", "3. Wie BloomLab das Totum mit A/B-Sequenzierung bewahrt")}
          </h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "La majorité des plantes abritent des composés hydrophiles (solubles dans l'eau ou la glycérine) et lipophiles (solubles dans l'huile végétale). Pour approcher l'intégralité du Totum sans solvant inflammable chauffé en cuve, BloomLab utilise le protocole d'extraction séquentielle A/B :",
              "Most plants contain both hydrophilic (water- or glycerin-soluble) and lipophilic (oil-soluble) compounds. To approach the full Totum without heated flammable solvents, BloomLab uses sequential A/B extraction:",
              "Die meisten Pflanzen enthalten sowohl hydrophile (wasser- oder glycerinlöslich) als auch lipophile (öllöslich) Stoffe. Für das vollständige Totum ohne erhitzte brennbare Lösungsmittel nutzt BloomLab die sequentielle A/B-Extraktion:"
            )}
          </p>
          <div className="p-6 rounded-2xl bg-[#3E4A3D] text-white space-y-3">
            <div className="text-xs uppercase font-bold text-[#C8AB8A]">{tr("Méthodologie de Précision", "Precision Methodology", "Präzisionsmethodik")}</div>
            <div className="text-sm text-[#FAF7F2]/90 space-y-2">
              <p>• <strong>{tr("Phase A :", "Phase A:", "Phase A:")}</strong> {tr("Extraction douce à basse température (45°C) des fractions aromatiques volatiles et flavonoïdes hydrosolubles.", "Gentle low-temperature extraction (45°C) of volatile aromatic fractions and water-soluble flavonoids.", "Sanfte Niedertemperatur-Extraktion (45°C) flüchtiger Aromastoffe und wasserlöslicher Flavonoide.")}</p>
              <p>• <strong>{tr("Phase B :", "Phase B:", "Phase B:")}</strong> {tr("Élévation régulée à 60°C avec vortex cinétique pour capter les fractions résineuses et polysaccharides membranaires.", "Regulated rise to 60°C with kinetic vortex to capture resinous fractions and membrane polysaccharides.", "Kontrollierte Erwärmung auf 60°C mit kinetischem Vortex zur Erfassung harziger Fraktionen und Polysaccharide.")}</p>
            </div>
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#3E4A3D] uppercase tracking-wider">{tr("Approfondir le sujet", "Explore Further", "Weiterführende Inhalte")}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('guide-complet-extraction-botanique-maison')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("Guide complet de l'extraction botanique", "Complete botanical extraction guide", "Vollständiger Leitfaden zur Pflanzenextraktion")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
            <button onClick={() => onNavigate('phytotherapie-moderne-scientifique')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("Phytothérapie moderne et preuves scientifiques", "Modern phytotherapy & scientific evidence", "Moderne Phytotherapie & Wissenschaft")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
          </div>
        </section>
      </main>
    </article>
  );
}

/* =========================================================================
   4. PILLAR : COSMÉTIQUES NATURELS DIY
   Schema: HowTo + Recipe + Article
========================================================================= */
function PillarCosmetiquesDIY({ onNavigate, lang }: { onNavigate: (v: View, p?: string) => void; lang: Language }) {
  const tr = getTr(lang);
  const howToRecipeSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tr(
      "Fabrication d'un Sérum Anti-Âge Végétal à l'Huile de Rose avec BloomLab",
      "Making a Botanical Anti-Aging Rose Oil Serum with BloomLab",
      "Herstellung eines botanischen Anti-Aging-Rosenöl-Serums mit BloomLab"
    ),
    "description": tr(
      "Recette et méthode d'extraction d'un sérum visage antioxydant à base de boutons de rose et d'huile de jojoba bio.",
      "Recipe and extraction method for an antioxidant facial serum made from dried rosebuds and organic jojoba oil.",
      "Rezept und Extraktionsmethode für ein antioxidatives Gesichtsserum aus Rosenknospen und Bio-Jojobaöl."
    ),
    "totalTime": "PT40M",
    "recipeYield": "50 ml",
    "supply": [
      { "@type": "HowToSupply", "name": tr("50 ml d'huile de jojoba bio pressée à froid", "50 ml cold-pressed organic jojoba oil", "50 ml kaltgepresstes Bio-Jojobaöl") },
      { "@type": "HowToSupply", "name": tr("10 g de boutons de rose de Damas séchés", "10 g dried Damask rosebuds", "10 g getrocknete Damaszener-Rosenknospen") },
      { "@type": "HowToSupply", "name": tr("3 gouttes de vitamine E naturelle (tocophérol)", "3 drops natural vitamin E (tocopherol)", "3 Tropfen natürliches Vitamin E (Tocopherol)") }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": tr("Calibrage", "Calibration", "Kalibrierung"),
        "text": tr(
          "Émiettez délicatement les pétales de rose dans la cuve inox BloomLab.",
          "Gently crumble the rose petals into the BloomLab stainless-steel vessel.",
          "Die Rosenblätter vorsichtig in den Edelstahlbehälter der BloomLab zerbröseln."
        )
      },
      {
        "@type": "HowToStep",
        "name": tr("Macération thermorégulée", "Thermoregulated Maceration", "Thermoregulierte Mazeration"),
        "text": tr(
          "Couvrez avec l'huile de jojoba et lancez le programme Huile Infusée à 50°C pendant 35 minutes sous vortex doux.",
          "Cover with jojoba oil and start the Infused Oil program at 50°C for 35 minutes under gentle vortex agitation.",
          "Mit Jojobaöl bedecken und das Infusionsöl-Programm bei 50°C für 35 Minuten mit sanftem Vortex starten."
        )
      },
      {
        "@type": "HowToStep",
        "name": tr("Filtration et flaconnage", "Filtration & Bottling", "Filtration & Abfüllung"),
        "text": tr(
          "Filtrez au tamis fin inox, incorporez la vitamine E et versez dans un flacon pipette ambré.",
          "Filter through a fine stainless mesh, blend in vitamin E, and pour into an amber dropper bottle.",
          "Durch ein feines Edelstahlsieb filtern, Vitamin E einrühren und in eine Braunglas-Pipettenflasche abfüllen."
        )
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(howToRecipeSchema)}</script>

      <header className="relative bg-[#3E4A3D] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrümel")} className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">{tr("Accueil", "Home", "Startseite")}</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">{tr("Guides", "Guides", "Leitfäden")}</button>
            <span>/</span>
            <span className="text-[#C8AB8A] font-medium">{tr("Cosmétiques Naturels DIY", "DIY Natural Cosmetics", "DIY Naturkosmetik")}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest mb-6">
            <Heart className="w-4 h-4" />
            <span>{tr("Formulation Propre • Zéro Conservateur Chimique", "Clean Formulation • Zero Synthetic Preservatives", "Reine Formulierung • Ohne synthetische Konservierungsstoffe")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            {tr(
              "Cosmétiques Naturels DIY : Créez vos Soins Visage & Corps avec BloomLab",
              "DIY Natural Cosmetics: Craft Face & Body Care with BloomLab",
              "DIY Naturkosmetik: Gesichts- & Körperpflege mit BloomLab herstellen"
            )}
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            {tr(
              "Émulsions végétales, sérums et baumes cutanés : apprenez à préparer vos propres soins botaniques à domicile en choisissant des plantes et huiles végétales de qualité.",
              "Botanical emulsions, serums, and nourishing skin balms: learn how to craft clean home skincare using quality dried botanicals and virgin carrier oils.",
              "Pflanzliche Emulsionen, Seren und Pflegebalsame: Lernen Sie, frische und getrocknete Pflanzen mit hochwertigen Ölen zu Hauskosmetik zu verarbeiten."
            )}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8AB8A]" /> {tr("2 700 mots • 14 min", "2,700 words • 14 min", "2.700 Wörter • 14 Min.")}</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C8AB8A]" /> {tr("Tests de stabilité & tolérance", "Stability & tolerance guidance", "Stabilitäts- & Verträglichkeitshinweise")}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("Pourquoi Formuler ses Cosmétiques avec un Infuseur Botanique ?", "Why Formulate Skincare with a Precision Botanical Extractor?", "Warum Naturkosmetik mit einem botanischen Extraktor herstellen?")}
          </h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "La cosmétique conventionnelle est souvent composée majoritairement d'eau inerte et d'émulsifiants de synthèse. En créant vos soins avec BloomLab, chaque goutte concentre des polyphénols, caroténoïdes et acides gras essentiels préservés.",
              "Conventional skincare is often mostly inactive water stabilized with synthetic emulsifiers. When formulating with BloomLab, every drop is concentrated with intact polyphenols, carotenoids, and essential fatty acids.",
              "Herkömmliche Kosmetik besteht oft überwiegend aus Wasser und synthetischen Emulgatoren. Mit BloomLab bleibt jeder Tropfen reich an intakten Polyphenolen, Carotinoiden und essenziellen Fettsäuren."
            )}
          </p>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="text-xs uppercase font-bold text-[#C8AB8A]">{tr("Recette N°1 • Visage", "Recipe #1 • Face", "Rezept Nr. 1 • Gesicht")}</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("Sérum Éclat à l'Huile de Rose & Jojoba", "Radiance Serum with Rose & Jojoba Oil", "Glanz-Serum mit Rosen- & Jojobaöl")}
          </h2>
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-3 text-xs">
            <h3 className="font-bold text-[#3E4A3D] text-sm">{tr("Ingrédients pour 50 ml :", "Ingredients for 50 ml:", "Zutaten für 50 ml:")}</h3>
            <p>• {tr("45 ml d'huile de jojoba bio (proche du sébum cutané naturel)", "45 ml organic jojoba oil (closely matches skin sebum)", "45 ml Bio-Jojobaöl (hautidentisches Profil)")}</p>
            <p>• {tr("8 g de boutons de rose séchés (vitamine C naturelle et anthocyanes)", "8 g dried rosebuds (natural vitamin C and anthocyanins)", "8 g getrocknete Rosenknospen (natürliches Vitamin C & Anthocyane)")}</p>
            <p>• {tr("3 gouttes d'extrait de tocophérol (vitamine E)", "3 drops tocopherol extract (vitamin E)", "3 Tropfen Tocopherol-Extrakt (Vitamin E)")}</p>
            <div className="pt-2 border-t border-[#D8CBB7]/40">
              <span className="font-bold text-[#3E4A3D]">{tr("Paramètres BloomLab :", "BloomLab Settings:", "BloomLab-Parameter:")}</span> {tr("50°C • 35 min • Vitesse 1.", "50°C • 35 min • Speed 1.", "50°C • 35 Min. • Stufe 1.")}
            </div>
          </div>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="text-xs uppercase font-bold text-[#C8AB8A]">{tr("Recette N°2 • Corps & Lèvres", "Recipe #2 • Body & Lips", "Rezept Nr. 2 • Körper & Lippen")}</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("Baume Réparateur Cutané au Calendula & Karité", "Nourishing Skin Balm with Calendula & Shea", "Pflegebalsam mit Calendula & Sheabutter")}
          </h2>
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-3 text-xs">
            <h3 className="font-bold text-[#3E4A3D] text-sm">{tr("Ingrédients pour 100 ml :", "Ingredients for 100 ml:", "Zutaten für 100 ml:")}</h3>
            <p>• {tr("60 ml de macérat de calendula réalisé au BloomLab", "60 ml calendula oil macerate crafted in BloomLab", "60 ml im BloomLab hergestelltes Calendula-Mazerat")}</p>
            <p>• {tr("30 g de beurre de karité brut non raffiné", "30 g raw unrefined shea butter", "30 g unraffinierte Bio-Sheabutter")}</p>
            <p>• {tr("10 g de cire d'abeille bio operculée", "10 g organic beeswax", "10 g reines Bio-Bienenwachs")}</p>
            <div className="pt-2 border-t border-[#D8CBB7]/40">
              <span className="font-bold text-[#3E4A3D]">{tr("Paramètres BloomLab :", "BloomLab Settings:", "BloomLab-Parameter:")}</span> {tr("58°C • 15 min jusqu'à fonte homogène.", "58°C • 15 min until smoothly melted.", "58°C • 15 Min. bis zum gleichmäßigen Schmelzen.")}
            </div>
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-[#3E4A3D] text-white space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C8AB8A]" /> {tr("Synergie Minérale : Le Duo Argiles en Masque Purifiant", "Mineral Synergy: Clay Duo Purifying Mask", "Mineralische Synergie: Das Tonerde-Duo als klärende Maske")}
          </h2>
          <p className="text-sm text-[#FAF7F2]/85 leading-relaxed">
            {tr(
              "Pour un nettoyage doux des pores, combinez 1 cuillère à café de Duo Argiles Bloom (Zéolithe 6µm + Bentonite) avec votre hydrolat de rose tiède. Note : matière première minérale documentée à usage cosmétique et éducatif.",
              "For gentle pore cleansing, blend 1 teaspoon of Bloom Clay Duo (6µm Zeolite + Bentonite) with warm rose hydrosol. Note: documented mineral raw material for external and educational use.",
              "Für eine sanfte Porenreinigung 1 TL Bloom Tonerde-Duo (Zeolith 6µm + Bentonit) mit warmem Rosenhydrolat mischen. Hinweis: Dokumentierter mineralischer Rohstoff zur äußerlichen Anwendung."
            )}
          </p>
          <button onClick={() => onNavigate('product-detail', 'duo-argiles')} className="text-xs font-bold text-[#C8AB8A] hover:underline flex items-center gap-1.5">
            {tr("Découvrir le Duo Argiles & Matières Premières Bloom →", "Discover Bloom Clay Duo & Raw Materials →", "Bloom Tonerde-Duo & Rohstoffe entdecken →")}
          </button>
        </section>
      </main>
    </article>
  );
}

/* =========================================================================
   5. PILLAR : PHYTOTHÉRAPIE MODERNE ET SCIENTIFIQUE
   Schema: Article + ScholarlyArticle
========================================================================= */
function PillarPhytotherapieScientifique({ onNavigate, lang }: { onNavigate: (v: View, p?: string) => void; lang: Language }) {
  const tr = getTr(lang);
  const scholarlySchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": tr(
      "Phytothérapie Moderne : Quand la Science Documente les Plantes",
      "Modern Phytotherapy: How Science Documents Whole Plants",
      "Moderne Phytotherapie: Wie die Wissenschaft Heilpflanzen erforscht"
    ),
    "description": tr(
      "Analyse de la pharmacologie de réseau, revues scientifiques et étude du totum végétal face aux molécules isolées.",
      "Analysis of network pharmacology, scientific reviews, and whole-plant totum synergy compared with isolated molecules.",
      "Analyse der Netzwerkpharmakologie, wissenschaftlicher Übersichtsarbeiten und des Pflanzen-Totums im Vergleich zu Einzelmolekülen."
    ),
    "author": {
      "@type": "Organization",
      "name": tr("Rédaction Bloom by BotaniK", "Bloom by BotaniK Editorial Team", "Redaktion Bloom by BotaniK")
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(scholarlySchema)}</script>

      <header className="relative bg-[#3E4A3D] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label={tr("Fil d'Ariane", "Breadcrumb", "Brotkrümel")} className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">{tr("Accueil", "Home", "Startseite")}</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">{tr("Guides", "Guides", "Leitfäden")}</button>
            <span>/</span>
            <span className="text-[#C8AB8A] font-medium">{tr("Phytothérapie Moderne", "Modern Phytotherapy", "Moderne Phytotherapie")}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-widest mb-6">
            <Beaker className="w-4 h-4" />
            <span>{tr("Recherche Scientifique • Network Pharmacology", "Scientific Research • Network Pharmacology", "Wissenschaftliche Forschung • Netzwerkpharmakologie")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            {tr(
              "Phytothérapie Moderne : Quand la Science Documente les Plantes",
              "Modern Phytotherapy: When Science Validates Traditional Plants",
              "Moderne Phytotherapie: Wenn Wissenschaft Tradition bestätigt"
            )}
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            {tr(
              "La phytothérapie contemporaine s'appuie sur la pharmacologie des réseaux et la métagénomique pour comprendre la synergie multi-cibles des complexes végétaux complets.",
              "Contemporary phytotherapy relies on network pharmacology and metagenomics to study the multi-target synergy of whole botanical complexes.",
              "Die zeitgenössische Phytotherapie nutzt Netzwerkpharmakologie und Metagenomik, um die Multitarget-Synergie ganzer Pflanzenkomplexe zu erforschen."
            )}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8AB8A]" /> {tr("3 200 mots • 16 min", "3,200 words • 16 min", "3.200 Wörter • 16 Min.")}</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#C8AB8A]" /> {tr("Méta-analyses & Littérature PubMed", "Meta-analyses & PubMed Literature", "Meta-Analysen & PubMed-Literatur")}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("1. La Révolution de la Network Pharmacology (2020-2026)", "1. The Network Pharmacology Revolution (2020–2026)", "1. Die Revolution der Netzwerkpharmakologie (2020–2026)")}
          </h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "Le modèle classique « une cible = une molécule » montre ses limites face aux équilibres biologiques complexes (microbiote, charge allostatique, stress oxydatif). La pharmacologie de réseau démontre que les systèmes vivants répondent finement à des signaux moléculaires coordonnés à dose modérée.",
              "The classical 'one target = one molecule' model shows limits when facing complex biological balances such as microbiome health and allostatic load. Network pharmacology shows living systems respond remarkably to coordinated multi-compound signals.",
              "Das klassische Modell »ein Ziel = ein Molekül« stößt bei komplexen Gleichgewichten wie Mikrobiom und allostatischer Last an Grenzen. Netzwerkpharmakologie zeigt, wie lebende Systeme auf koordinierte Vielstoffgemische reagieren."
            )}
          </p>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3E4A3D]">
            {tr("2. Les Plantes Adaptogènes : Équilibre de l'Axe HPA", "2. Adaptogenic Plants: Supporting the HPA Axis", "2. Adaptogene Pflanzen: Balance der HPA-Achse")}
          </h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            {tr(
              "Plusieurs études observationnelles et essais randomisés sur Rhodiola rosea et Withania somnifera (Ashwagandha) documentent un accompagnement significatif de la réponse au stress et de la vitalité dans le cadre d'une hygiène de vie équilibrée. Ressource éducative ne remplaçant pas un suivi médical.",
              "Randomized trials on Rhodiola rosea and Withania somnifera (Ashwagandha) document measurable support for stress resilience and cortisol balance alongside healthy lifestyle habits. Educational resource, not medical advice.",
              "Studien zu Rhodiola rosea und Withania somnifera (Ashwagandha) dokumentieren eine messbare Unterstützung der Stressresistenz und Cortisol-Balance. Pädagogischer Inhalt, kein Ersatz für ärztliche Beratung."
            )}
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#3E4A3D] uppercase tracking-wider">{tr("Articles de Recherche Associés", "Related Research Articles", "Verwandte Forschungsartikel")}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('blog', 'rhodiola-fatigue-chronique')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("Rhodiola : L'Adaptogène Vitalité", "Rhodiola: The Vitality Adaptogen", "Rhodiola: Das Vitalitäts-Adaptogen")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
            <button onClick={() => onNavigate('blog', 'ashwagandha-cortisol')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#C8AB8A] transition-colors flex items-center justify-between">
              <span>{tr("Ashwagandha : Équilibre & Cortisol", "Ashwagandha: Balance & Cortisol", "Ashwagandha: Balance & Cortisol")}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
          </div>
        </section>
      </main>
    </article>
  );
}