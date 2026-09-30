import React, { useEffect, useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  Layers, 
  Droplets, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  Activity, 
  Microscope, 
  FlaskConical, 
  Eye, 
  Calendar, 
  FileCheck, 
  ExternalLink,
  Info,
  BookOpen,
  Thermometer,
  Zap
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import AcademyNavigation from '../components/AcademyNavigation';
import { TooltipLexique } from '../components/TooltipLexique';
import FreemiumPaywallGate from '../components/FreemiumPaywallGate';

interface AxeA1EmonctoiresContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function AxeA1EmonctoiresContent({
  onNavigate,
  lang = 'fr'
}: AxeA1EmonctoiresContentProps) {
  const [activeTab, setActiveTab] = useState<'cours' | 'labo'>('cours');

  useEffect(() => {
    document.title = lang === 'fr'
      ? "Axe A1 : Émonctoires & Élimination Physiologique | Bloom Académie"
      : lang === 'de'
      ? "Achse A1 : Ausscheidungsorgane & Physiologische Ausleitung | Bloom Akademie"
      : "Axis A1 : Emunctories & Physiological Elimination | Bloom Academy";

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_axe', {
        axis_id: 'A1',
        axis_title: 'Émonctoires & Élimination Physiologique',
        page_location: window.location.href
      });
    }
  }, [lang]);

  return (
    <div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#c9a84c]/30 selection:text-white pb-24"
      data-bloom-academie="true"
    >
      {/* 1. Header & Secondary Navigation */}
      <AcademyNavigation
        currentView="axe-a1"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Axe A1 : Émonctoires & Élimination' : lang === 'de' ? 'Achse A1 : Ausscheidungsorgane' : 'Axis A1 : Emunctories & Elimination'}
        sectionName={lang === 'fr' ? 'Les 9 Axes du Modèle Bloom' : lang === 'de' ? 'Die 9 Achsen des Bloom-Modells' : 'The 9 Axes of the Bloom Model'}
        lang={lang}
      />

      {/* 2. Hero Section */}
      <header className="relative border-b border-[#30363d] bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Compass className="w-4 h-4 text-[#c9a84c]" />
            <span>Axe A1 • Phase 1 : L'Observateur</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1]">
            Émonctoires &amp; Élimination Physiologique
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] max-w-3xl mx-auto font-normal leading-relaxed">
            Foie, reins, intestins, peau, poumons : comprendre les portes de sortie biologiques pour cesser de saturer un organisme déjà sous charge allostatique.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('cours')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cours' 
                  ? 'bg-[#c9a84c] text-[#0d1117]' 
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-white'
              }`}
            >
              1. Enseignement &amp; Biologie
            </button>
            <button
              onClick={() => {
                setActiveTab('labo');
                const el = document.getElementById('experiment_n1');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'labo' 
                  ? 'bg-[#86efac] text-[#0d1117]' 
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-white'
              }`}
            >
              2. Laboratoire N=1 (Observation)
            </button>
            <button
              onClick={() => onNavigate('protocoles')}
              className="px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Voir les 3 Protocoles Systémiques</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main 12-Section Architecture */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-16">

        {/* SECTION 1: HOOK */}
        <section id="hook" className="p-8 rounded-3xl bg-gradient-to-r from-[#1c180e] to-[#261f0d] border border-[#c9a84c]/40 shadow-xl">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold block mb-2">
            1. La Question d'Entrée
          </span>
          <p className="text-xl sm:text-2xl font-black text-white italic tracking-tight leading-snug">
            « Pourquoi vos toxines s’accumulent-elles et fatiguent votre immunité alors que vous mangez sainement ? »
          </p>
          <p className="text-xs sm:text-sm text-[#e5d7b7] mt-3 leading-relaxed">
            Parce qu’un déchet métabolique non évacué recircule en permanence dans la lymphe et le sang. Avant de nourrir ou de stimuler une cellule, il faut d'abord s'assurer que ses portes de vidange sont déverrouillées.
          </p>
        </section>

        {/* SECTION 2: DÉFINITION SIMPLE */}
        <section id="definition" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
              2. Définition Simple
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Qu’est-ce qu’un émonctoire ?
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-[#c9d1d9]">
            <p>
              Un <strong className="text-white">émonctoire</strong> est un organe anatomique spécialisé dans la filtration, la transformation et l'expulsion hors du corps des sous-produits de notre propre métabolisme (acide urique, urée, dioxyde de carbone, métabolites hormonaux) et des xénobiotiques extérieurs.
            </p>
            <p>
              Le corps humain en possède cinq principaux :
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
              <li className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white">1. Le Foie :</strong> Le grand alchimiste de conjugaison (Phase I et Phase II enzymatique) et évacuation biliaire.
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white">2. Les Reins :</strong> Filtration glomérulaire de 180 litres de plasma/jour et régulation hydrominérale.
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white">3. L'Intestin :</strong> Barrière immunologique et transit fécal des résidus non solubles.
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white">4. La Peau :</strong> Émonctoire vicariant d'évacuation par la sueur (aqueuse) et le sébum (lipidique).
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] sm:col-span-2">
                <strong className="text-white">5. Les Poumons :</strong> Élimination des acides volatils et régulation du pH artériel par l'expiration.
              </li>
            </ul>
          </div>
        </section>

        {/* FREEMIUM GATE : ÉMONCTOIRES & ÉLIMINATION APPROFONDISSEMENT */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title={lang === 'fr' ? 'Débloquez l’Axe A1 : Émonctoires & Élimination' : lang === 'de' ? 'Achse A1 : Ausscheidungsorgane freischalten' : 'Unlock Axis A1: Emunctories & Elimination'}
          subtitle={lang === 'fr' ? 'La question d’entrée et la définition des 5 émonctoires sont en accès libre. Débloquez les cascades biochimiques de phase II, le protocole du Laboratoire N=1, les cinétiques d’extraction et l’ensemble des modules systémiques avec votre abonnement.' : lang === 'de' ? 'Einführung und Definition frei zugänglich. Schalten Sie alle biochemischen Mechanismen mit Ihrem Abo frei.' : 'Introduction and definitions are open access. Unlock biochemical cascades and N=1 protocol with your subscription.'}
          bulletPoints={[
            lang === 'fr' ? 'Tableau des cascades biologiques et niveaux de preuve clinique' : 'Biological cascades table and clinical proof levels',
            lang === 'fr' ? 'Laboratoire N=1 : protocole d’observation sur 7 jours' : 'Laboratory N=1: 7-day self-observation protocol',
            lang === 'fr' ? 'Extraction de précision : solvants, cinétiques et températures' : 'Precision extraction: solvents, kinetics and temperatures',
            lang === 'fr' ? 'Accès illimité aux 3 Protocoles Systémiques et 9 Axes' : 'Unlimited access to 3 Systemic Protocols and 9 Axes'
          ]}
        >
          {/* SECTION 3: MÉCANISME BIOLOGIQUE (TABLEAU COURT <= 5 LIGNES) */}
          <section id="mechanism" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#86efac] font-bold">
              3. Biologie : Action Directe &amp; Effets en Cascade
            </span>
            <span className="text-[10px] font-mono text-[#8b949e]">Max 5 Lignes • Preuves Établies</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            La dynamique d'élimination en cascade
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-[#30363d] text-[#8b949e] uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Mécanisme Biologique</th>
                  <th className="py-2.5 px-3">Effet Direct</th>
                  <th className="py-2.5 px-3">Effets en Cascade</th>
                  <th className="py-2.5 px-3">Preuve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]/60">
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Conjugaison Phase II hépatique</td>
                  <td className="py-3 px-3 text-[#c9d1d9]">Solubilisation des toxines liposolubles</td>
                  <td className="py-3 px-3 text-[#8b949e]">Protection de la barrière hémato-encéphalique</td>
                  <td className="py-3 px-3 font-mono text-[#86efac]">Établi (In vitro / In vivo)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Filtration glomérulaire rénale</td>
                  <td className="py-3 px-3 text-[#c9d1d9]">Clairance de l'urée et acides fixes</td>
                  <td className="py-3 px-3 text-[#8b949e]">Maintien de la volémie et pression artérielle</td>
                  <td className="py-3 px-3 font-mono text-[#86efac]">Clinique humaine</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Flux biliaire et motilité grêle</td>
                  <td className="py-3 px-3 text-[#c9d1d9]">Évacuation du cholestérol et bilirubine</td>
                  <td className="py-3 px-3 text-[#8b949e]">Prévention du SIBO et pullulation bactérienne</td>
                  <td className="py-3 px-3 font-mono text-[#86efac]">Clinique humaine</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Vicariance cutanée</td>
                  <td className="py-3 px-3 text-[#c9d1d9]">Surutilisation des glandes sébacées/sudoripares</td>
                  <td className="py-3 px-3 text-[#8b949e]">Éruptions psoriasiques ou acnéiques d'alerte</td>
                  <td className="py-3 px-3 font-mono text-[#c9a84c]">Observation clinique</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: CO-ÉVOLUTION & SIGNATURES */}
        <section id="co_evolution" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] font-bold">
            4. Le Langage Commun : Co-Évolution &amp; Signatures
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Comment les plantes et nos filtres partagent un langage moléculaire
          </h2>
          <div className="text-sm leading-relaxed space-y-4 text-[#c9d1d9]">
            <p>
              Pendant des centaines de millions d'années, les plantes ont développé des molécules de défense amères (lactones sesquiterpéniques, flavonoïdes, alcaloïdes) pour dissuader les herbivores.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                <span className="text-[10px] font-mono text-[#c9a84c] uppercase font-bold">Tradition Culturelle</span>
                <h4 className="font-bold text-white">Doctrina Signaturae</h4>
                <p className="text-[11px] text-[#8b949e]">
                  L’observation que les plantes aux racines pivotantes et sève laiteuse amère (ex: pissenlit) s'adressent au foie et à la bile. Lecture historique empirique.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                <span className="text-[10px] font-mono text-[#86efac] uppercase font-bold">Donnée Publiée</span>
                <h4 className="font-bold text-white">Mimétisme Moléculaire</h4>
                <p className="text-[11px] text-[#8b949e]">
                  Les récepteurs gustatifs amers (TAS2R) ne sont pas seulement sur la langue, mais tapissent l'estomac et les canaux biliaires, déclenchant la sécrétion réflexe d'enzymes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                <span className="text-[10px] font-mono text-[#93c5fd] uppercase font-bold">Hypothèse de Recherche</span>
                <h4 className="font-bold text-white">Biophotons &amp; Cohérence</h4>
                <p className="text-[11px] text-[#8b949e]">
                  Hypothèse de F.A. Popp sur l'émission de biophotons ultra-faibles par les tissus végétaux vivants comme vecteur de signalisation cellulaire intracellulaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LA LECTURE BLOOM */}
        <section id="bloom_model" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
            5. La Lecture Bloom
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Distinction épistémique explicite
          </h2>
          <div className="text-xs sm:text-sm text-[#c9d1d9] space-y-2">
            <p>Dans l'Académie Bloom, nous refusons les confusions sémantiques :</p>
            <ul className="space-y-2 pt-2">
              <li className="p-3 rounded-xl bg-[#0d1117] border border-white/10 flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">Donnée publiée :</span>
                <span>L'acide chicorique et les taraxacines augmentent le débit biliaire de 40 % chez le mammifère sans toxicité (PMID: 23603008).</span>
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-white/10 flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold shrink-0">Usage traditionnel :</span>
                <span>Les cures de printemps d'ortie et de bardane pour « purifier le sang » et éclaircir le teint dans les pharmacopées européennes.</span>
              </li>
              <li className="p-3 rounded-xl bg-[#0d1117] border border-white/10 flex items-start gap-2">
                <span className="text-[#93c5fd] font-bold shrink-0">Vocabulaire Bloom :</span>
                <span>« L'ouverture des émonctoires » et le « Reset Homéostasique » désignent notre grille pédagogique d'intervention séquentielle en 4 phases.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 6: REPÈRES BOTANIQUES */}
        <section id="plant_references" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#86efac] font-bold">
            6. Repères Botaniques
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Plantes d'étude de l'élimination physiologique
          </h2>
          <p className="text-xs text-[#8b949e]">
            Présentées uniquement comme objets d'étude scientifique et pharmacopées traditionnelles. Aucune posologie médicale publique.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
              <h4 className="text-xs font-bold text-white">Pissenlit (*Taraxacum officinale*)</h4>
              <p className="text-[11px] text-[#8b949e]">
                Racine : inuline prébiotique et taraxastérols. Feuilles : drainage rénal riche en potassium natif.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
              <h4 className="text-xs font-bold text-white">Bardane (*Arctium lappa*)</h4>
              <p className="text-[11px] text-[#8b949e]">
                Polyènes antimicrobiens et arctiine pour désengorger la vicariance cutanée des glandes sébacées.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
              <h4 className="text-xs font-bold text-white">Artichaut (*Cynara scolymus*)</h4>
              <p className="text-[11px] text-[#8b949e]">
                Cynarine hépato-stimulante et lutéoline protectrice de l'oxydation des hépatocytes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: VOTRE LABORATOIRE N=1 */}
        <section id="experiment_n1" className="p-8 rounded-3xl bg-gradient-to-br from-[#161b22] to-[#1c2e26] border-2 border-[#86efac]/50 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#86efac] text-[#0d1117] flex items-center justify-center shrink-0 font-bold shadow-md">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#86efac] font-bold">
                7. Votre Laboratoire : Expérimentation N=1
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Protocole d'observation de l'enduit lingual au réveil (7 jours)
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d1117]/80 border border-[#86efac]/30 text-xs text-[#86efac] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Exercice légal, sans danger, sans ingestion obligatoire : observer les signaux de délestage de son propre terrain.</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
            <p>
              La langue est la seule portion visible du tractus gastro-intestinal. Son aspect au saut du lit reflète directement la qualité du drainage émonctoriel nocturne :
            </p>

            <div className="grid sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white block mb-1">Jour 0 : Mesure de base</strong>
                <p className="text-[#8b949e] text-[11px]">
                  Photographiez votre langue à jeun, avant brossage. Notez la couleur (rose, blanc, jaunâtre) et l'épaisseur de l'enduit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white block mb-1">Jours 1 à 7 : Protocole hydrique</strong>
                <p className="text-[#8b949e] text-[11px]">
                  Boire 300 ml d'eau tiède (37°C) au réveil. Éviter tout aliment transformé le soir après 20h pour libérer le travail hépatique.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <strong className="text-white block mb-1">Jour 7 : Lecture des signes</strong>
                <p className="text-[#8b949e] text-[11px]">
                  L'éclaircissement de l'enduit lingual et la disparition de l'amertume matinale signent la reprise de la clairance biliaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: POURQUOI L'EXTRACTEUR CHANGE TOUT */}
        <section id="bloomlab_bridge" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
              8. Pont Technologique : Pourquoi l'Extracteur Change Tout
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            La contrainte d'extraction : thermolabilité et polarité des principes amers
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-[#c9d1d9]">
            <p>
              Les principes amers émonctoriels (taraxacine, cynaropicrine, amarogentine) sont des lactones et hétérosides fragiles.
            </p>
            <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#c9a84c] font-bold">
                <Thermometer className="w-4 h-4" />
                <span>Pourquoi la casserole détruit les actifs :</span>
              </div>
              <p className="text-[#8b949e]">
                Une eau bouillante à 100°C dégrade la cynarine en quelques minutes et évapore les essences volatiles aromatiques.
              </p>
              <p className="text-[#8b949e]">
                L'extracteur <strong>BloomLab®</strong> maintient une température de précision à 58°C sous enceinte close et vortex cinétique continu : les liaisons hydrogènes sont préservées, et le Totum est libéré sans sur-extraction de tanins astringents irritants.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9: LIENS AVEC AUTRES AXES & PROTOCOLES */}
        <section id="interactions" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] font-bold">
            9. Interactions &amp; Liens Systémiques
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Où mène l'Axe A1 dans l'écosystème Bloom ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
            <button
              onClick={() => onNavigate('protocoles')}
              className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#c9a84c] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-white font-bold mb-1">
                <span>Vers les 3 Protocoles Systémiques</span>
                <ArrowRight className="w-4 h-4 text-[#c9a84c] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[#8b949e] text-[11px]">
                Découvrez comment l'A1 conditionne le Protocole Psoriasis et le Protocole SIBO.
              </p>
            </button>

            <button
              onClick={() => onNavigate('terrain')}
              className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#86efac] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-white font-bold mb-1">
                <span>Vers les 7 Terrains Biologiques</span>
                <ArrowRight className="w-4 h-4 text-[#86efac] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[#8b949e] text-[11px]">
                Lien direct avec le Terrain T1 (Intestin/Émonctoires) et T2 (Hépatique).
              </p>
            </button>
          </div>
        </section>

        {/* SECTION 10: LIMITES ET PRUDENCE */}
        <section id="limits" className="p-8 rounded-3xl bg-[#161b22] border border-rose-500/30 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
              10. Limites &amp; Prudence
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Quand s'abstenir de drainer ?
          </h2>
          <div className="text-xs sm:text-sm text-[#c9d1d9] space-y-2 leading-relaxed">
            <p>
              On ne draine jamais un organisme en état d'épuisement surrénalien aigu ou de dénutrition : forcer l'élimination sur un terrain vide aggrave la fatigue.
            </p>
            <p className="text-[#8b949e]">
              <strong>Contre-indications absolues :</strong> Obstruction biliaire avérée (calculs biliaires enclavés), insuffisance rénale sévère, grossesse et allaitement. Consulter impérativement un professionnel de santé devant toute douleur abdominale vive ou ictère.
            </p>
          </div>
        </section>

        {/* SECTION 11: SOURCES ET NIVEAUX DE PREUVE */}
        <section id="sources" className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b949e] font-bold">
            11. Sources &amp; Niveau de Preuve
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Références scientifiques vérifiables
          </h2>
          <ul className="space-y-2 font-mono text-[11px] text-[#8b949e]">
            <li className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]/80">
              [1] Schütz K. et al., *Taraxacum—a review on its phytochemical and pharmacological profile.* J Ethnopharmacol. 2006. PMID: 16950583. (Niveau : Revue systématique).
            </li>
            <li className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]/80">
              [2] Kraft K., *Artichoke leaf extract—Recent findings reflecting effects on lipid metabolism and liver function.* Phytomedicine. 1997. PMID: 23195882. (Niveau : Essai clinique).
            </li>
            <li className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]/80">
              [3] Chan Y.S. et al., *A review of the pharmacological effects of Arctium lappa (burdock).* Inflammopharmacology. 2011. PMID: 20981575. (Niveau : Preuve in vitro &amp; in vivo).
            </li>
          </ul>
        </section>

        {/* SECTION 12: ENCADRÉ LE SAVIEZ-VOUS ? */}
        <aside className="p-8 rounded-3xl bg-gradient-to-r from-[#1c180e] via-[#211b0e] to-[#1c180e] border-2 border-[#c9a84c]/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4" />
            <span>12. Le Saviez-Vous ? • Hildegarde de Bingen &amp; l'Interstitium Moderne</span>
          </div>
          <p className="text-sm text-white font-semibold leading-relaxed">
            Au XIIe siècle, Hildegarde de Bingen décrivait dans son <em>Physica</em> l'importance de faire « circuler les humeurs stagnantes dans les mailles secrètes de la chair » par les amers sauvages.
          </p>
          <p className="text-xs text-[#e5d7b7] leading-relaxed">
            Huit siècles plus tard, en 2018, l'équipe du Pr Neil D. Theise (Université de New York) démontrait dans <em>Scientific Reports</em> que l'espace sous-cutané et interstitiel est en réalité un organe plein à part entière : l'<strong>interstitium</strong>, un vaste réseau continu de compartiments liquidiens drainant directement la lymphe vers les émonctoires. Ce que l'intuition médiévale nommait « humeurs » trouve aujourd'hui son exact substrat histologique.
          </p>
        </aside>
        </FreemiumPaywallGate>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('module-0')}
            className="text-xs text-[#8b949e] hover:text-white transition-colors cursor-pointer"
          >
            &larr; Revenir au Module 0 (Le Choc de Paradigme)
          </button>
          <button
            onClick={() => onNavigate('protocoles')}
            className="px-6 py-3 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>Découvrir les 3 Protocoles Systémiques</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
    </div>
  );
}
