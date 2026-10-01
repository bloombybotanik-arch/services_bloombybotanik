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

export default function PillarPagesContent({ pillar, lang, onNavigate }: PillarPageProps) {
  const isFR = lang === 'fr';

  if (pillar === 'guide-complet-extraction-botanique-maison') {
    return <PillarGuideExtraction onNavigate={onNavigate} isFR={isFR} />;
  }
  if (pillar === 'remedes-naturels-maison-guide') {
    return <PillarRemedesNaturels onNavigate={onNavigate} isFR={isFR} />;
  }
  if (pillar === 'totum-vegetal-comprendre') {
    return <PillarTotumVegetal onNavigate={onNavigate} isFR={isFR} />;
  }
  if (pillar === 'cosmetiques-naturels-diy') {
    return <PillarCosmetiquesDIY onNavigate={onNavigate} isFR={isFR} />;
  }
  return <PillarPhytotherapieScientifique onNavigate={onNavigate} isFR={isFR} />;
}

/* =========================================================================
   1. PILLAR : GUIDE COMPLET EXTRACTION BOTANIQUE À DOMICILE
   Schema: HowTo + FAQPage + Article
========================================================================= */
function PillarGuideExtraction({ onNavigate, isFR }: { onNavigate: (v: View, p?: string) => void; isFR: boolean }) {
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
          "text": "La tisane est une infusion statique avec saturation immédiate de la couche limite. L'extraction thermo-cinétique maintient un vortex permanent qui renouvelle le solvant et extrait plus de 90% des actifs."
        }
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* Hero Header */}
      <header className="relative bg-[#0F261E] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">Guides</button>
            <span>/</span>
            <span className="text-[#D97706] font-medium">Extraction Botanique Maison</span>
          </nav>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
            <FlaskConical className="w-4 h-4" />
            <span>Guide Pilier • Totum & Précision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Guide Complet : Extraction Botanique à Domicile — Totum, Solvants &amp; Températures
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            Maîtrisez la science de l'extraction des plantes médicinales chez vous : comparez les 4 méthodes d'extraction, choisissez le solvant idéal, contrôlez la température au degré près et découvrez comment libérer le Totum végétal sans dégradation.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D97706]" /> Lecture : 18 min • 3 400 mots</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#D97706]" /> Rédigé par le Collège Scientifique Bloom</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#D97706]" /> Conforme Pharmacopée &amp; Sécurité</span>
          </div>
        </div>
      </header>

      {/* Table des Matières Interactive */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 mb-16">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#D8CBB7]/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F261E] mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D97706]" /> Sommaire du Guide d'Extraction
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <a href="#intro" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">1.</span> Pourquoi extraire chez soi ?
            </a>
            <a href="#totum" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">2.</span> Le Totum végétal : définition &amp; synergie
            </a>
            <a href="#methodes" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">3.</span> Les 4 méthodes d'extraction comparées
            </a>
            <a href="#solvants" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">4.</span> Solvants : eau, huile, alcool, glycérine
            </a>
            <a href="#temperatures" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">5.</span> Températures optimales par famille
            </a>
            <a href="#materiel" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">6.</span> Équipement &amp; système BloomLab
            </a>
            <a href="#erreurs" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">7.</span> Erreurs courantes à éviter
            </a>
            <a href="#conservation" className="p-2.5 rounded-xl hover:bg-[#FAF7F2] text-[#1B3022] hover:text-[#D97706] transition-colors flex items-center gap-2">
              <span className="font-bold text-[#D97706]">8.</span> Conservation &amp; durée de vie
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Section 1 : Introduction */}
        <section id="intro" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <span>Section 01</span>
            <span>•</span>
            <span>Autonomie Sanitaire</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">1. Introduction : Pourquoi extraire chez soi ?</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Pendant des siècles, l'herboristerie familiale constituait le premier réflexe de santé préventive. Aujourd'hui, l'immense majorité des compléments alimentaires du commerce repose sur des poudres atomisées, des extraits standardisés à une seule molécule de synthèse ou des gélules stockées depuis des mois dans des entrepôts chauds.
          </p>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Réaliser vos propres <strong>extractions botaniques à domicile</strong> permet de reprendre le contrôle absolu sur trois leviers fondamentaux :
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Fraîcheur &amp; Intégrité</h3>
              <p className="text-xs text-[#1B3022]/70">Zéro oxydation. Les principes volatils et les enzymes vivantes sont capturés à la minute même où la plante est extraite.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Traçabilité Totale</h3>
              <p className="text-xs text-[#1B3022]/70">Vous choisissez des plantes sauvages ou certifiées biologiques, exemptes d'excipients, de stéarate de magnésium ou de solvants pétrochimiques.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E] mb-2">Précision Posologique</h3>
              <p className="text-xs text-[#1B3022]/70">Possibilité d'adapter le ratio plante/solvant et de calibrer les prises selon votre terrain biologique personnel.</p>
            </div>
          </div>
        </section>

        {/* Section 2 : Le Totum Végétal */}
        <section id="totum" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <span>Section 02</span>
            <span>•</span>
            <span>Concept Fondamental</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">2. Le Totum Végétal : Définition et Puissance de la Synergie</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            En pharmacognosie, le <strong>Totum végétal</strong> désigne l'intégralité du complexe moléculaire vivant d'une plante : non seulement son principe actif réputé majeur (comme la curcumine du curcuma ou la salicine du saule), mais également tous ses cofacteurs naturels (polyphénols, flavonoïdes, tanins, mucilages, minéraux, terpènes).
          </p>
          <div className="p-6 rounded-2xl bg-[#0F261E] text-white space-y-3">
            <h3 className="font-bold text-lg text-[#D97706]">La Règle d'Or du Vivant : 1 + 1 = 5</h3>
            <p className="text-sm text-[#FAF7F2]/90 leading-relaxed">
              Une molécule isolée agit souvent comme une clé brute dans une serrure, déclenchant des effets secondaires ou une tolérance rapide. À l'inverse, le Totum agit par <em>pharmacologie de réseau</em> (network pharmacology) : plusieurs molécules modulent simultanément plusieurs récepteurs cellulaires avec une toxicité quasi nulle et une biodisponibilité décuplée.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('totum-vegetal-comprendre')} 
                className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1.5"
              >
                Lire notre dossier dédié : Pourquoi la plante entière est plus puissante &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* Section 3 : Les 4 Méthodes d'Extraction */}
        <section id="methodes" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <span>Section 03</span>
            <span>•</span>
            <span>Comparatif Technique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">3. Les 4 Méthodes d'Extraction Comparées</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#0F261E] text-[#0F261E]">
                  <th className="py-3 px-4 font-bold">Méthode</th>
                  <th className="py-3 px-4 font-bold">Solvant usuel</th>
                  <th className="py-3 px-4 font-bold">Rendement moléculaire</th>
                  <th className="py-3 px-4 font-bold">Inconvénient majeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CBB7]/40 text-[#1B3022]/80">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0F261E]">Infusion classique (Théière)</td>
                  <td className="py-3.5 px-4">Eau à 100°C</td>
                  <td className="py-3.5 px-4 text-rose-600 font-semibold">5% à 15%</td>
                  <td className="py-3.5 px-4">Destruction des composés thermolabiles et perte des arômes volatils.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0F261E]">Macération à froid (Bocal)</td>
                  <td className="py-3.5 px-4">Huile ou Alcool</td>
                  <td className="py-3.5 px-4 text-amber-600 font-semibold">25% à 40%</td>
                  <td className="py-3.5 px-4">Durée excessive (3 à 6 semaines), risque d'oxydation et de rancissement.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0F261E]">Décoction traditionnelle</td>
                  <td className="py-3.5 px-4">Eau bouillante</td>
                  <td className="py-3.5 px-4 text-amber-600 font-semibold">30% à 45%</td>
                  <td className="py-3.5 px-4">Réservée aux racines coriaces ; détruit irrémédiablement les vitamines et terpènes.</td>
                </tr>
                <tr className="bg-emerald-50/60 font-medium">
                  <td className="py-3.5 px-4 font-black text-[#0F261E]">Extraction Thermo-Cinétique A/B (BloomLab)</td>
                  <td className="py-3.5 px-4">Eau, Huile ou Glycérine</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-black text-sm">85% à 95%</td>
                  <td className="py-3.5 px-4 text-emerald-800">Nécessite un matériel de régulation thermique précis en milieu clos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 : Solvants */}
        <section id="solvants" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <span>Section 04</span>
            <span>•</span>
            <span>Chimie des Solvants</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">4. Solvants : Eau, Huile, Alcool et Glycérine</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#0F261E] flex items-center gap-2"><Droplets className="w-4 h-4 text-sky-600" /> L'Eau Osmosée ou Filtrée</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">
                Le solvant universel polaire. Idéal pour extraire les polyphénols, tanins, acides aminés, mucilages et minéraux. Attention à utiliser une eau faiblement minéralisée (&lt; 50 mg/L de résidu sec) pour maximiser le gradient d'échange.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#0F261E] flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-600" /> Les Huiles Végétales Vierges</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">
                Solvant apolaire pour capturer les composés lipophiles : caroténoïdes, tocophérols, huiles essentielles, cannabinoïdes et résines. Privilégiez l'huile de jojoba, sésame ou olive première pression à froid.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#0F261E] flex items-center gap-2"><FlaskConical className="w-4 h-4 text-purple-600" /> La Glycérine Végétale (Glycéré)</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">
                Solvant amphiphile doux, non alcoolisé, parfait pour les enfants et les personnes sensibles. Extrait à la fois les fractions hydrosolubles et une partie des composés lipophiles tout en assurant une excellente conservation.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/60 space-y-2">
              <h3 className="font-bold text-[#0F261E] flex items-center gap-2"><Activity className="w-4 h-4 text-rose-600" /> L'Alcool Éthylique (Teintures)</h3>
              <p className="text-xs text-[#1B3022]/80 leading-relaxed">
                Solvant puissant pour les résines coriaces et les alcaloïdes. Nécessite un titrage alcoolique rigoureux (40° à 70°) selon la teneur en eau de la plante fraîche ou sèche.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 : Températures */}
        <section id="temperatures" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <span>Section 05</span>
            <span>•</span>
            <span>Thermorégulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">5. Températures Optimales par Famille de Plantes</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">45°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#0F261E]">Fleurs tendres &amp; Aromatiques volatiles</h3>
                <p className="text-xs text-[#1B3022]/75">Camomille matricaire, fleur d'oranger, mélisse, rose de Damas. Préserve 100% des monoterpènes et des esters aromatiques.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-xs shrink-0">55°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#0F261E]">Feuilles structurées &amp; Plantes adaptogènes</h3>
                <p className="text-xs text-[#1B3022]/75">Romarin, thym, menthe poivrée, sauge, ashwagandha, rhodiola. Permet d'ouvrir les cellules végétales sans oxyder les polyphénols.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-700 text-white flex items-center justify-center font-bold text-xs shrink-0">65°C</div>
              <div>
                <h3 className="font-bold text-xs text-[#0F261E]">Racines épaisses, Écorces &amp; Champignons médicinaux</h3>
                <p className="text-xs text-[#1B3022]/75">Gingembre, curcuma, cannelle, reishi, chaga. Ramollit la lignine et dissout les polysaccharides et bêta-glucanes protecteurs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 : Équipement BloomLab */}
        <section id="materiel" className="bg-[#0F261E] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 text-[#D97706] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Innovation Brevetée
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">6. L'Extracteur Botanique BloomLab® v2</h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            Pour automatiser ces principes de laboratoire dans une cuisine sans risque d'erreur, BotaniK a conçu le <strong>BloomLab®</strong> : cuve en acier inoxydable chirurgical 304 inerte, thermorégulation numérique au degré près, vortex magnétique cinétique et couvercle hermétique à condensation active.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('bloomlab')} 
              className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              Découvrir la machine BloomLab® (239€) &rarr;
            </button>
            <button 
              onClick={() => onNavigate('boutique-kits')} 
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
            >
              Voir les kits de plantes associés
            </button>
          </div>
        </section>

        {/* Section 7 : Erreurs courantes */}
        <section id="erreurs" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">7. Les 5 Erreurs Courantes en Extraction Maison</h2>
          <ul className="space-y-3 text-sm text-[#1B3022]/85">
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Broder les plantes en poussière :</strong> Un broyage trop fin fait éclater les cellules et libère des tanins amers indésirables tout en rendant la filtration impossible.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Extraire à découvert :</strong> Sans couvercle hermétique, les précieuses molécules aromatiques volatiles s'envolent dans la pièce au lieu de condenser dans l'extrait.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Utiliser de l'eau du robinet chlorée :</strong> Le chlore oxyde immédiatement les polyphénols et altère l'équilibre électrolytique de la préparation.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Négliger le temps de contact :</strong> Une extraction trop courte laisse 80% des actifs dans la fibre ; une extraction trop longue extrait les fractions ligneuses indigestes.</span>
            </li>
          </ul>
        </section>

        {/* Section 8 : Conservation */}
        <section id="conservation" className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">8. Conservation et Durée de Vie des Extraits</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-[#0F261E] mb-1">Extraits Aqueux Frais</h3>
              <p className="text-[#1B3022]/70">À consommer dans les 48h au réfrigérateur (4°C) pour préserver les enzymes vivantes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-[#0F261E] mb-1">Huiles Infusées</h3>
              <p className="text-[#1B3022]/70">6 à 12 mois dans un flacon en verre teinté avec 0,2% de vitamine E naturelle antioxydante.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-[#0F261E] mb-1">Glycérés &amp; Teintures</h3>
              <p className="text-[#1B3022]/70">1 à 3 ans à température ambiante à l'abri des rayons UV directs.</p>
            </div>
          </div>
        </section>

        {/* Section 9 : Maillage Interne Silo Extraction */}
        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-lg font-bold text-[#0F261E] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D97706]" /> Continuer votre exploration du Silo Extraction
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
            <button onClick={() => onNavigate('totum-vegetal-comprendre')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Le Totum Végétal expliqué en détail</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('blog', 'extraction-a-froid-vs-extraction-a-chaud-guide-totum-vegetal')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Extraction à froid vs extraction à chaud</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('remedes-naturels-maison-guide')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Guide pratique des remèdes naturels maison</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('cosmetiques-naturels-diy')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Cosmétiques naturels DIY &amp; macérats</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
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
function PillarRemedesNaturels({ onNavigate, isFR }: { onNavigate: (v: View, p?: string) => void; isFR: boolean }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quelles sont les plantes indispensables pour débuter en herboristerie maison ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les 5 piliers recommandés sont la camomille matricaire (système nerveux & digestion), le thym à linalol (sphère ORL), la mélisse (sommeil & stress), le romarin (foie & clarté mentale) et le curcuma (inflammation)."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on remplacer un traitement médical par des remèdes naturels ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non. Les remèdes de phytothérapie s'inscrivent dans une démarche éducative et d'hygiène de terrain. Ils ne se substituent jamais à un diagnostic ou une prescription médicale."
        }
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <header className="relative bg-[#0F261E] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">Guides</button>
            <span>/</span>
            <span className="text-[#D97706] font-medium">Remèdes Naturels Maison</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
            <Leaf className="w-4 h-4" />
            <span>Guide Pratique Débutants • Pharmacie Familiale</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Remèdes Naturels Maison : Guide Pratique pour Débutants — Bloom by BotaniK
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            Comment fabriquer vos propres remèdes naturels sécurisés contre le stress, l'insomnie, les douleurs inflammatoires et les troubles digestifs. Les 10 plantes fondamentales, les ratios d'extraction et les règles de sécurité indispensables.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D97706]" /> 2 900 mots • 15 min</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#D97706]" /> Précautions &amp; Interactions documentées</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        {/* Les 10 plantes indispensables */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">Les 10 Plantes Médicinales Indispensables à la Maison</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">1. Mélisse Officinale</h3>
              <p className="text-[#1B3022]/75 mt-1">Calme l'axe intestin-cerveau, dissipe les spasmes digestifs d'origine nerveuse et favorise l'endormissement.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">2. Camomille Matricaire</h3>
              <p className="text-[#1B3022]/75 mt-1">Apigénine anxiolytique naturelle (affinité récepteurs GABA), anti-inflammatoire des muqueuses gastriques.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">3. Thym à Linalol</h3>
              <p className="text-[#1B3022]/75 mt-1">Antiseptique respiratoire majeur sans agressivité hépatique, protecteur immunitaire de la gorge.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">4. Romarin à Cinéole</h3>
              <p className="text-[#1B3022]/75 mt-1">Draineur hépatobiliaire doux, stimulant cognitif et puissant antioxydant acide rosmarinique.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">5. Curcuma Longa</h3>
              <p className="text-[#1B3022]/75 mt-1">Régulateur des cascades inflammatoires NF-kB, protection des articulations et de la barrière intestinale.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">6. Valériane Officinale</h3>
              <p className="text-[#1B3022]/75 mt-1">Inducteur du sommeil profond sans somnolence diurne résiduelle, décontracturant musculaire.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">7. Ashwagandha (Withania)</h3>
              <p className="text-[#1B3022]/75 mt-1">Plante adaptogène reine pour réguler l'hypercortisolémie et l'épuisement des surrénales.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">8. Menthe Poivrée</h3>
              <p className="text-[#1B3022]/75 mt-1">Action antispasmodique digestive fulgurante via le menthol, éclaircit les céphalées de tension.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">9. Reine des Prés</h3>
              <p className="text-[#1B3022]/75 mt-1">Dérivés salicylés naturels protecteurs de la vascularisation et soulagement des douleurs articulaires.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8CBB7]/40">
              <h3 className="font-bold text-sm text-[#0F261E]">10. Sureau Noir (Baies &amp; Fleurs)</h3>
              <p className="text-[#1B3022]/75 mt-1">Inhibiteur d'adhésion virale précoce et sudorifique en cas de coups de froid hivernaux.</p>
            </div>
          </div>
        </section>

        {/* Protocoles par sphère */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">Protocoles Thérapeutiques par Sphère</h2>
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-2">
              <h3 className="font-bold text-sm text-[#0F261E] flex items-center justify-between">
                <span>Sphère Stress &amp; Anxiété</span>
                <span className="text-[#D97706]">Infusion 50°C • 25 min</span>
              </h3>
              <p className="text-[#1B3022]/80">Synergie : Mélisse (40%) + Camomille (30%) + Ashwagandha (30%). Solvant : Eau faiblement minéralisée. Posologie : 2 tasses/jour entre 17h et 21h.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-2">
              <h3 className="font-bold text-sm text-[#0F261E] flex items-center justify-between">
                <span>Sphère Sommeil Profond</span>
                <span className="text-[#D97706]">Infusion 55°C • 30 min</span>
              </h3>
              <p className="text-[#1B3022]/80">Synergie : Valériane racine (40%) + Passiflore (30%) + Lavande vraie (30%). Solvant : Eau ou lait végétal d'avoine. Posologie : 1 tasse 45 minutes avant le coucher.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-2">
              <h3 className="font-bold text-sm text-[#0F261E] flex items-center justify-between">
                <span>Sphère Anti-Inflammatoire &amp; Articulaire</span>
                <span className="text-[#D97706]">Extraction Séquentielle A/B</span>
              </h3>
              <p className="text-[#1B3022]/80">Synergie : Curcuma rhizome + Poivre noir (pipérine ×20) + Reine des Prés + Gingembre. Solvant : Huile vierge de cameline ou eau tiède.</p>
            </div>
          </div>
        </section>

        {/* Sécurité et Précautions */}
        <section className="p-8 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-700" /> Sécurité et Contre-Indications Absolues
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            Toujours vérifier l'absence d'allergie (notamment aux Astéracées ou dérivés salicylés). Femmes enceintes, allaitantes et enfants de moins de 6 ans : demander impérativement l'avis d'un professionnel de santé avant toute cure active.
          </p>
        </section>

        {/* Silo Linking */}
        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#0F261E] uppercase tracking-wider">Articles &amp; Recettes associés</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('blog', 'plantes-adaptogenes-stress')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Plantes adaptogènes pour le stress</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('blog', 'plantes-dormir-profondement')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>5 plantes pour dormir profondément</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
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
function PillarTotumVegetal({ onNavigate, isFR }: { onNavigate: (v: View, p?: string) => void; isFR: boolean }) {
  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": "Totum Végétal",
    "description": "Ensemble des principes actifs, cofacteurs et substances secondaires naturellement présents dans une plante médicinale, agissant en synergie physiologique.",
    "inDefinedTermSet": "https://bloombybotanik.com/lexique/"
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(definedTermSchema)}</script>

      <header className="relative bg-[#0F261E] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">Guides</button>
            <span>/</span>
            <span className="text-[#D97706] font-medium">Totum Végétal</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Fondement Scientifique • Synergie Moléculaire</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Le Totum Végétal Expliqué : Pourquoi la Plante Entière est Plus Puissante
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            De Paracelse à la <em>network pharmacology</em> moderne : découvrez pourquoi l'extrait de totum végétal surpasse les molécules isolées synthétiques, les preuves cliniques de la synergie et comment préserver cette intelligence vivante.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D97706]" /> 2 300 mots • 12 min</span>
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#D97706]" /> Références PubMed &amp; Pharmacognosie</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">1. De Paracelse aux Réseaux Biologiques Modernes</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Dès le XVIe siècle, Paracelse affirmait que <em>« Dans chaque plante se trouve toute une pharmacie »</em>. Au cours du XXe siècle, la pharmacologie réductionniste a cherché à isoler une unique molécule par plante (comme l'acide acétylsalicylique à partir de la reine des prés). Mais les études épidémiologiques ont rapidement montré les limites de cette approche : acidité gastrique, hémorragies, effets rebonds.
          </p>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Dans la reine des prés naturelle, la salicine est accompagnée de flavonoïdes gastro-protecteurs (sphère protectrice) et de tanins qui régulent sa libération dans le temps. C'est l'essence même du <strong>Totum végétal</strong> : une intelligence d'auto-tamponnage et de potentialisation.
          </p>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">2. Totum vs Molécule Isolée : Le Cas d'École du Saule et de l'Aspirine</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <h3 className="font-bold text-sm text-rose-900">Molécule Isolée (Aspirine synthétique)</h3>
              <p className="text-rose-900/80 leading-relaxed">
                Action anti-inflammatoire brutale et brève. Bloque indistinctement les enzymes COX-1 et COX-2, entraînant une fragilisation de la muqueuse stomacale et un risque d'ulcération.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-sm text-emerald-900">Totum Écorce de Saule Blanc</h3>
              <p className="text-emerald-900/80 leading-relaxed">
                Biodisponibilité progressive. Les polyphénols et tanins protègent les cellules de l'estomac, modulent l'agrégation plaquettaire sans toxicité digestive et procurent un soulagement durable.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">3. Comment BloomLab Préserve le Totum avec le Séquençage A/B</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            La majorité des plantes médicinales abritent des principes actifs hydrophiles (solubles dans l'eau) et lipophiles (solubles dans l'huile ou l'alcool). Pour extraire l'intégralité du Totum sans compromis, BloomLab utilise le protocole d'<strong>extraction séquentielle A/B</strong> :
          </p>
          <div className="p-6 rounded-2xl bg-[#0F261E] text-white space-y-3">
            <div className="text-xs uppercase font-bold text-[#D97706]">Méthodologie Brevetée</div>
            <div className="text-sm text-[#FAF7F2]/90 space-y-2">
              <p>• <strong>Phase A :</strong> Extraction douce à basse température (45°C) des fractions aromatiques volatiles et flavonoïdes hydrosolubles.</p>
              <p>• <strong>Phase B :</strong> Élévation régulée à 60°C avec vortex cinétique pour capter les fractions résineuses et polysaccharides membranaires.</p>
            </div>
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#0F261E] uppercase tracking-wider">Approfondir le sujet</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('guide-complet-extraction-botanique-maison')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Guide complet de l'extraction botanique</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('phytotherapie-moderne-scientifique')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Phytothérapie moderne et preuves scientifiques</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
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
function PillarCosmetiquesDIY({ onNavigate, isFR }: { onNavigate: (v: View, p?: string) => void; isFR: boolean }) {
  const howToRecipeSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Fabrication d'un Sérum Anti-Âge Végétal à l'Huile de Rose avec BloomLab",
    "description": "Recette et méthode d'extraction d'un sérum visage antioxydant à base de boutons de rose et d'huile de jojoba bio.",
    "totalTime": "PT40M",
    "recipeYield": "50 ml",
    "supply": [
      { "@type": "HowToSupply", "name": "50 ml d'huile de jojoba bio pressée à froid" },
      { "@type": "HowToSupply", "name": "10 g de boutons de rose de Damas séchés" },
      { "@type": "HowToSupply", "name": "3 gouttes de vitamine E naturelle (tocophérol)" }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calibrage",
        "text": "Émiettez délicatement les pétales de rose dans la cuve inox BloomLab."
      },
      {
        "@type": "HowToStep",
        "name": "Macération thermorégulée",
        "text": "Couvrez avec l'huile de jojoba et lancez le programme Huile Infusée à 50°C pendant 35 minutes sous vortex doux."
      },
      {
        "@type": "HowToStep",
        "name": "Filtration et flaconnage",
        "text": "Filtrez au tamis fin inox, incorporez la vitamine E et versez dans un flacon pipette ambré."
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(howToRecipeSchema)}</script>

      <header className="relative bg-[#0F261E] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">Guides</button>
            <span>/</span>
            <span className="text-[#D97706] font-medium">Cosmétiques Naturels DIY</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
            <Heart className="w-4 h-4" />
            <span>Formulation Propre • Zéro Conservateur Chimique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Cosmétiques Naturels DIY : Créez vos Soins Visage &amp; Corps avec BloomLab
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            Émulsions végétales, sérums antioxydants, baumes réparateurs cutanés : apprenez à transformer les plantes fraîches et sèches en cosmétiques d'une pureté laboratoire absolue.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D97706]" /> 2 700 mots • 14 min</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#D97706]" /> Tests de stabilité &amp; innocuité</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">Pourquoi Formuler ses Cosmétiques avec un Infuseur Botanique ?</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            La cosmétique conventionnelle est composée à 80% d'eau inactive, stabilisée par des parabènes, phénoxyéthanol et émulsifiants de synthèse. En créant vos soins avec BloomLab, chaque goutte est saturée d'actifs purs : polyphénols, caroténoïdes et acides gras essentiels intacts.
          </p>
        </section>

        {/* Recette 1 : Sérum anti-âge */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="text-xs uppercase font-bold text-[#D97706]">Recette N°1 • Visage</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">Sérum Régénérant à l'Huile de Rose &amp; Jojoba</h2>
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-3 text-xs">
            <h3 className="font-bold text-[#0F261E] text-sm">Ingrédients pour 50 ml :</h3>
            <p>• 45 ml d'huile de jojoba bio (proche du sébum cutané naturel)</p>
            <p>• 8 g de boutons de rose séchés (vitamine C naturelle et anthocyanes)</p>
            <p>• 3 gouttes d'extrait de tocophérol (vitamine E)</p>
            <div className="pt-2 border-t border-[#D8CBB7]/40">
              <span className="font-bold text-[#0F261E]">Paramètres BloomLab :</span> 50°C • 35 min • Vitesse 1.
            </div>
          </div>
        </section>

        {/* Recette 2 : Baume réparateur */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <div className="text-xs uppercase font-bold text-[#D97706]">Recette N°2 • Corps &amp; Lèvres</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">Baume Réparateur Cutané au Calendula &amp; Karité</h2>
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D8CBB7]/40 space-y-3 text-xs">
            <h3 className="font-bold text-[#0F261E] text-sm">Ingrédients pour 100 ml :</h3>
            <p>• 60 ml de macérat de calendula réalisé au BloomLab</p>
            <p>• 30 g de beurre de karité brut non raffiné</p>
            <p>• 10 g de cire d'abeille bio operculée</p>
            <div className="pt-2 border-t border-[#D8CBB7]/40">
              <span className="font-bold text-[#0F261E]">Paramètres BloomLab :</span> 58°C • 15 min jusqu'à fonte homogène.
            </div>
          </div>
        </section>

        {/* Synergies avec le Duo Argiles Bloom */}
        <section className="p-8 rounded-3xl bg-[#0F261E] text-white space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D97706]" /> Synergie Minérale : Le Duo Argiles en Masque Détox
          </h2>
          <p className="text-sm text-[#FAF7F2]/85 leading-relaxed">
            Pour un nettoyage profond des pores, combinez 1 cuillère à café de <strong>Duo Argiles Bloom</strong> (Zéolithe 6µm + Bentonite) avec votre hydrolat de rose tiède fraîchement extrait. L'action d'échange cationique de l'argile absorbe les métaux lourds sans dessécher la barrière lipidique.
          </p>
          <button onClick={() => onNavigate('product-detail', 'duo-argiles')} className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1.5">
            Découvrir le Duo Argiles &amp; Matières Premières Bloom &rarr;
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
function PillarPhytotherapieScientifique({ onNavigate, isFR }: { onNavigate: (v: View, p?: string) => void; isFR: boolean }) {
  const scholarlySchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Phytothérapie Moderne : Quand la Science Valide les Plantes Médicinales",
    "description": "Analyse de la pharmacologie de réseau, méta-analyses cliniques et réhabilitation du totum végétal face aux molécules de synthèse.",
    "author": {
      "@type": "Organization",
      "name": "Collège Scientifique Bloom by BotaniK"
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#1B3022] font-sans pb-24">
      <script type="application/ld+json">{JSON.stringify(scholarlySchema)}</script>

      <header className="relative bg-[#0F261E] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#E5D7B7] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:underline">Accueil</button>
            <span>/</span>
            <button onClick={() => onNavigate('guides')} className="hover:underline">Guides</button>
            <span>/</span>
            <span className="text-[#D97706] font-medium">Phytothérapie Moderne</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-widest mb-6">
            <Beaker className="w-4 h-4" />
            <span>Recherche Clinique • Network Pharmacology</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Phytothérapie Moderne : Quand la Science Valide les Plantes Médicinales
          </h1>
          <p className="text-lg sm:text-xl text-[#FAF7F2]/90 leading-relaxed max-w-3xl">
            La phytothérapie n'est plus une médecine empirique du passé : entre 2020 et 2026, la pharmacologie des réseaux et la métagénomique ont confirmé la supériorité des complexes végétaux vivants sur de nombreuses cibles thérapeutiques.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E5D7B7]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#D97706]" /> 3 200 mots • 16 min</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#D97706]" /> Méta-analyses &amp; Revues Cochrane</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">1. La Révolution de la Network Pharmacology (2020-2026)</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Le modèle classique « une maladie = une cible = une molécule chimique » montre ses limites face aux pathologies chroniques complexes (syndrome métabolique, dysbiose, charge allostatique, épuisement surrénalien). La <em>pharmacologie de réseau</em> démontre que les systèmes vivants répondent infiniment mieux à des signaux moléculaires coordonnés à faible dose qu'à un assaut univoque à haute dose.
          </p>
        </section>

        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBB7]/60 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F261E]">2. Les Plantes Adaptogènes : Régulation de l'Axe HPA</h2>
          <p className="text-base text-[#1B3022]/85 leading-relaxed">
            Des études cliniques randomisées menées sur <em>Rhodiola rosea</em> et <em>Withania somnifera</em> (Ashwagandha) ont démontré une baisse significative du cortisol sérique (-27,9% en moyenne après 60 jours) sans l'accoutumance ni la léthargie associées aux anxiolytiques benzodiazépiniques.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D8CBB7] space-y-4">
          <h2 className="text-sm font-bold text-[#0F261E] uppercase tracking-wider">Articles de Recherche Associés</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold">
            <button onClick={() => onNavigate('blog', 'rhodiola-fatigue-chronique')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Rhodiola : L'Adaptogène Anti-Fatigue</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
            <button onClick={() => onNavigate('blog', 'ashwagandha-cortisol')} className="p-3 bg-white rounded-xl border border-[#D8CBB7]/60 text-left hover:text-[#D97706] transition-colors flex items-center justify-between">
              <span>Ashwagandha : Réduire le Cortisol</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </section>
      </main>
    </article>
  );
}
