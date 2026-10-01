import React, { useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  History, 
  ShieldAlert, 
  Microscope, 
  Flame, 
  Snowflake, 
  Layers, 
  Award, 
  Compass, 
  CheckCircle2, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { View } from '../types';
import { Language } from '../translations';
import AcademyNavigation from '../components/AcademyNavigation';
import FreemiumPaywallGate from '../components/FreemiumPaywallGate';

interface Module0ChocParadigmeContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang?: Language;
}

export default function Module0ChocParadigmeContent({
  onNavigate,
  lang = 'fr'
}: Module0ChocParadigmeContentProps) {
  useEffect(() => {
    document.title = lang === 'fr'
      ? "Module 0 : Le Choc de Paradigme | Pourquoi votre corps est verrouillé | Bloom Académie"
      : lang === 'de'
      ? "Modul 0: Der Paradigmenwechsel | Bloom Akademie"
      : "Module 0: The Paradigm Shift | Bloom Academy";

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view_module_0', {
        page_title: 'Module 0 - Le Choc de Paradigme',
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
        currentView="module-0"
        onNavigate={onNavigate}
        currentPageTitle={lang === 'fr' ? 'Module 0 : Le Choc de Paradigme' : lang === 'de' ? 'Modul 0 : Paradigmenwechsel' : 'Module 0 : The Paradigm Shift'}
        sectionName={lang === 'fr' ? 'Porte d\'Entrée de l\'Académie' : lang === 'de' ? 'Eingangstor der Akademie' : 'Academy Gateway'}
        lang={lang}
      />

      {/* 2. Hero Section */}
      <header className="relative border-b border-[#30363d] bg-gradient-to-b from-[#161b22] via-[#0d1117] to-[#161b22] pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-[#c9a84c]" />
            <span>Fondation Épistémique &amp; Histoire des Savoirs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f5f0e8] tracking-tight leading-[1.1]">
            Le Choc de Paradigme : pourquoi votre corps est verrouillé
          </h1>

          <p className="text-base sm:text-lg text-[#b8b8b8] max-w-3xl mx-auto font-normal leading-relaxed">
            Avant de comprendre les 9 axes de régulation systémique, il est indispensable de comprendre pourquoi ce savoir vous a été rendu invisible. Une traversée historique et biochimique sans complaisance, là où la rigueur rencontre la mémoire.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('axe-a1')}
              className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Continuer vers l'Axe A1 (Émonctoires)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/boutique/bloomlab/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('product-detail', 'bloomlab');
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] hover:border-[#c9a84c] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c9a84c]" />
              <span>Voir l'extracteur BloomLab®</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-16">

        {/* Foundational Axiom (Aperçu libre) */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1c180e] via-[#261f0d] to-[#1c180e] border border-[#c9a84c]/40 text-center space-y-3 shadow-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9a84c] font-mono font-bold">
            Axiome Fondateur Bloom
          </p>
          <blockquote className="text-2xl sm:text-3xl font-black text-white italic tracking-tight">
            « Votre corps n’est pas cassé. Il est verrouillé. »
          </blockquote>
          <p className="text-xs sm:text-sm text-[#e5d7b7] max-w-xl mx-auto">
            Le vivant ne commet pas d'erreur absurde : il compense, il s'adapte, il signale. Pour le déverrouiller, il faut cesser de faire taire ses signaux et lui redonner les molécules exactes avec lesquelles il a co-évolué.
          </p>
        </div>

        {/* Gate Freemium pour l'investigation historique complète */}
        <FreemiumPaywallGate
          onNavigate={onNavigate}
          lang={lang}
          title="Débloquez le Module 0 : Le Choc de Paradigme"
          subtitle="L'introduction et l'axiome fondateur sont en accès libre. Débloquez l'investigation historique intégrale (Rapport Flexner 1910, les 4 ruptures épistémiques et les solutions Bloom) avec votre abonnement."
          bulletPoints={[
            "Rapport Flexner (1910) et bascule de l'enseignement médical",
            "La perte du Totum : pourquoi la molécule isolée ne guérit pas le terrain",
            "Biochimie de pointe vs tradition empirique : la 3e voie Bloom",
            "Accès illimité à l'Axe A1 et l'ensemble des 9 axes historiques"
          ]}
        >
          <div className="space-y-16">
            {/* SECTION 1: RAPPORT FLEXNER (1910) */}
            <section className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                Section 1 • Histoire Médicale Documentée
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                1910 : Le Rapport Flexner et l'effacement académique de l'herboristerie
              </h2>
            </div>
          </div>

          <div className="text-sm leading-relaxed space-y-4 text-[#c9d1d9]">
            <p>
              Au tournant du XXe siècle, la médecine occidentale était pluraliste. Aux États-Unis et en Europe, les médecins éclectiques, les herboristes cliniciens et les praticiens allopathes cohabitaient au sein des universités et des hôpitaux.
            </p>
            <p>
              En 1910, commandité par la Fondation Carnegie avec l'appui financier du trust pétrolier et chimique Rockefeller, Abraham Flexner publie le rapport *Medical Education in the United States and Canada* (Bulletin numéro 4). L'objectif affiché : normaliser les cursus médicaux.
            </p>
            <div className="p-5 rounded-2xl bg-[#0d1117] border-l-4 border-[#c9a84c] font-mono text-xs space-y-2 text-[#b8b8b8]">
              <p className="text-white font-bold">Les faits historiques vérifiables :</p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Fermeture immédiate de plus de la moitié des facultés de médecine nord-américaines qui enseignaient la phytothérapie clinique.</li>
                <li>Conditionnement des dotations philanthropiques à l'adoption exclusive d'une pharmacopée synthétique dérivée de la carbochimie et des brevets exclusifs.</li>
                <li>Éviction progressive des matières végétales des manuels officiels, non pour inefficacité biologique, mais par incapacité structurelle à breveter une plante naturelle.</li>
              </ul>
            </div>
            <p>
              Ce moment charnière n'a pas seulement réorganisé l'économie médicale : il a rompu un fil de transmission ininterrompu depuis l'Antiquité, convainquant le grand public que la santé reposait uniquement sur la molécule isolée de synthèse.
            </p>
          </div>
        </section>

        {/* SECTION 2: GE HONG -> TU YOUYOU */}
        <section className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#86efac]/15 text-[#86efac] flex items-center justify-center shrink-0">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#86efac] font-bold">
                Section 2 • Preuve Scientifique &amp; Thermolabilité
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                De Ge Hong (340 ap. J.-C.) à Tu Youyou (Prix Nobel 2015)
              </h2>
            </div>
          </div>

          <div className="text-sm leading-relaxed space-y-4 text-[#c9d1d9]">
            <p>
              Comment l'humanité a-t-elle redécouvert le traitement le plus efficace contre le paludisme, sauvant des millions de vies au XXIe siècle ? Grâce à la lecture attentive d'un texte d'herboristerie vieux de 1 700 ans.
            </p>
            <p>
              Durant les années 1970, la chercheuse chinoise Tu Youyou teste sans succès des centaines d'extraits d'armoise annuelle (*Artemisia annua*) bouillis selon les méthodes modernes de laboratoire. L'activité antiparasitaire est systématiquement détruite.
            </p>
            <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#86efac]">
                <BookOpen className="w-4 h-4" />
                <span>Le manuscrit de Ge Hong — <em>Zhouhou Beiji Fang</em> (340 ap. J.-C.)</span>
              </div>
              <p className="text-xs italic text-[#e5d7b7] ">
                « Prenez une poignée d'armoise, trempez-la dans deux litres d'eau fraîche, exprimez le jus et buvez-le tout entier. »
              </p>
              <p className="text-xs text-[#b8b8b8]">
                En comprenant que l'ébullition détruisait la molécule active (l'artémisinine, thermolabile au-delà de 60°C), Tu Youyou met au point une extraction à l'éther à basse température (35°C). L'efficacité contre le plasmodium passe instantanément à 100 %.
              </p>
            </div>
            <p>
              Cette découverte, récompensée par le <strong>Prix Nobel de Médecine en 2015</strong>, apporte la preuve définitive : <strong>la température et le procédé d'extraction déterminent la survie des principes actifs</strong>. Faire bouillir de l'eau sur une plante fragile revient souvent à en détruire la pharmacie intérieure.
            </p>
          </div>
        </section>

        {/* SECTION 3: TOTUM VS MOLÉCULE ISOLÉE */}
        <section className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#93c5fd]/15 text-[#93c5fd] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] font-bold">
                Section 3 • Network Pharmacology &amp; Synergie
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Totum végétal versus Molécule isolée : la révolution des réseaux
              </h2>
            </div>
          </div>

          <div className="text-sm leading-relaxed space-y-4 text-[#c9d1d9]">
            <p>
              La pharmacologie conventionnelle repose sur le paradigme <em>« une cible, une molécule, un brevet »</em>. Mais le corps humain n'est pas une machine linéaire : c'est un réseau complexe d'informations interconnectées.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 my-4 font-sans">
              <div className="p-5 rounded-2xl bg-[#0d1117] border border-rose-500/30 space-y-2">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">Approche Isolée Réductionniste</span>
                <h4 className="text-sm font-bold text-white">La Molécule Unique</h4>
                <p className="text-xs text-[#8b949e]">
                  Frappe une cible enzymatique unique à forte dose. Risque d'accoutumance, toxicité hépatique et effets secondaires en chaîne par saturation des récepteurs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0d1117] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Approche Systémique Bloom</span>
                <h4 className="text-sm font-bold text-white">Le Totum Végétal Intégral</h4>
                <p className="text-xs text-[#8b949e]">
                  Action pléiotropique (multicible) à doses modérées. Les flavones améliorent l'absorption des alcaloïdes, tandis que les tanins protègent les muqueuses.
                </p>
              </div>
            </div>

            <p>
              Les publications modernes en <em>Network Pharmacology</em> (Hopkins, <em>Nature Biotechnology</em>) démontrent que l'effet matrice de la plante entière module simultanément plusieurs cascades biologiques sans saturer les cytochromes hépatiques.
            </p>
          </div>
        </section>

        {/* SECTION 4: LA TROISIÈME VOIE BLOOM */}
        <section className="p-8 rounded-3xl bg-[#161b22] border-2 border-[#c9a84c]/50 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] text-[#0d1117] flex items-center justify-center shrink-0 font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                Section 4 • Manifeste Méthodologique
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                La Troisième Voie Bloom : là où la rigueur rencontre la mémoire
              </h2>
            </div>
          </div>

          <div className="text-sm leading-relaxed space-y-4 text-[#c9d1d9]">
            <p>
              Bloom by BotaniK refuse le faux dilemme contemporain qui oppose la science académique et les savoirs traditionnels :
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pl-2">
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✗</span>
                <span>Nous refusons la pharmacologie aveugle qui isole un actif au détriment de l'équilibre du terrain vivant.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c9a84c] font-bold">✗</span>
                <span>Nous refusons l'empirisme naïf qui ignore la cinétique biochimique, la dégradation thermique et les interactions médicamenteuses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-white font-semibold">
                  Nous incarnons la troisième voie : doter l'individu des outils de laboratoire (thermorégulation ±0,5°C, vortex cinétique, double solvant) pour extraire avec une exactitude absolue ce que des millénaires d'observation humaine ont validé.
                </span>
              </li>
            </ul>
          </div>

          {/* Mandatory Closing Phrase */}
          <div className="mt-8 pt-6 border-t border-[#30363d] text-center">
            <p className="text-sm sm:text-base italic text-[#f5f0e8] leading-relaxed">
              « Bloom by BotaniK, 2026. Pas comme une tradition. Comme une rigueur. Dans la continuité de 6 000 ans d'observation — et de 150 ans de biochimie. »
            </p>
          </div>
        </section>

        {/* 4. Action Banner to Continue into Axe A1 */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#161b22] to-[#21262d] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase text-[#c9a84c] font-bold">Prochaine Étape</span>
            <h3 className="text-lg font-black text-white">
              Prêt à explorer le premier axe du corps vivant ?
            </h3>
            <p className="text-xs text-[#8b949e]">
              Axe A1 : Émonctoires &amp; Élimination physiologique (Foie, Reins, Intestins, Peau, Poumons).
            </p>
          </div>
          <button
            onClick={() => onNavigate('axe-a1')}
            className="px-6 py-3.5 rounded-xl bg-[#c9a84c] hover:bg-[#d8b85c] text-[#0d1117] font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Explorer l'Axe A1</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

          </div>
        </FreemiumPaywallGate>

      </main>
    </div>
  );
}
