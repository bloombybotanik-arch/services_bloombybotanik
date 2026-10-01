import React from 'react';
import { 
  Clock, 
  ChevronRight, 
  Share2, 
  Check, 
  Shield, 
  Sparkles, 
  Brain, 
  Zap, 
  ArrowRight, 
  AlertTriangle,
  Leaf
} from 'lucide-react';
import { View } from './types';
import { Language } from './translations';

interface BlogVieillissementMyelineContentProps {
  onNavigate: (view: View, param?: string) => void;
  lang: Language;
}

export default function BlogVieillissementMyelineContent({
  onNavigate,
  lang
}: BlogVieillissementMyelineContentProps) {
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article 
      className="min-h-screen bg-[#0d1117] text-[#f5f0e8] selection:bg-[#c9a84c]/20 selection:text-[#f5f0e8]"
      data-bloom-academie="true"
    >
      {/* 1. Fil d'Ariane & Actions */}
      <div className="border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#b8b8b8] overflow-hidden text-ellipsis whitespace-nowrap">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#c9a84c] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
            <button 
              onClick={() => onNavigate('blog')} 
              className="hover:text-[#c9a84c] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
            <span className="text-[#c9a84c] truncate">Le Vieillissement N'est Pas une Fatalité</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#b8b8b8] hover:text-[#f5f0e8] border border-[#30363d] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Partager l'article"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Copié !' : 'Partager'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="border-b border-[#30363d] relative overflow-hidden bg-gradient-to-b from-[#161b22]/50 via-transparent to-transparent py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-6">
            <Brain className="w-3.5 h-3.5" />
            <span>Neurosciences &amp; Longévité • Dossier 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#f5f0e8] font-black tracking-tight leading-[1.1] mb-6">
            Le Vieillissement N'est Pas une Fatalité : Ce que la Science Découvre en 2026
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#b8b8b8]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c9a84c]" /> 8 minutes de lecture
            </span>
            <span className="text-[#30363d]">•</span>
            <span>🎯 Public : Adultes 45+, personnes concernées par le déclin cognitif</span>
            <span className="text-[#30363d]">•</span>
            <span>✍️ Recherche &amp; Synthèse Bloom Scientific</span>
          </div>
        </div>
      </header>

      {/* 3. Corps de l'article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 leading-relaxed text-[#e6edf3]">
        
        {/* Lead Quote */}
        <div className="p-6 rounded-2xl bg-[#161b22] border-l-4 border-[#c9a84c] border-[#30363d] mb-10 text-lg italic text-[#f5f0e8]">
          "Votre cerveau ne s'use pas parce qu'il vieillit. Il ralentit parce que les signaux de maintenance de sa gaine protectrice se sont éteints sous l'effet de l'inflammation silencieuse et des carences lipidiques."
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5">
            Ce que personne ne vous dit sur le vieillissement
          </h2>
          <p className="mb-4">
            On vous a appris que le vieillissement est une pente inévitable. Que vos neurones meurent inexorablement, que votre mémoire s'efface jour après jour, que votre énergie cognitive décline — et qu'il n'y a rien à faire à part subir.
          </p>
          <p className="mb-4 font-semibold text-white text-lg">
            C'est faux.
          </p>
          <p className="mb-4">
            Ce que la recherche neuroscientifique des cinq dernières années et les publications de 2026 révèlent est infiniment plus porteur d'espoir : le vieillissement cérébral n'est pas une <em>perte définitive</em>. C'est un <strong>ralentissement de processus de régénération</strong> qui, eux, demeurent présents dans vos tissus. Ils attendent simplement les bons signaux pour se réactiver.
          </p>
          <p>
            Et ces signaux, le monde végétal et la biochimie du vivant les ont élaborés bien avant la pharmacologie de synthèse.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-12 pt-8 border-t border-[#30363d]">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5 flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#c9a84c]" />
            1. La myéline : la découverte qui change tout
          </h2>
          <p className="mb-4">
            Pendant des décennies, la myéline a été enseignée comme une simple gaine isolante inerte autour des axones, comparable au plastique entourant un fil électrique en cuivre.
          </p>
          <p className="mb-6">
            Aujourd'hui, nous savons que la myéline est une structure vivante, dynamique et extraordinairement métabolique. Elle nourrit directement l'axone en lactate et en ATP, synchronise les réseaux neuronaux complexes et détermine la vitesse de transmission de la pensée : de 1 m/s sans myéline à plus de 100 m/s avec une gaine saine et dense.
          </p>

          <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] mb-6">
            <h4 className="text-[#c9a84c] font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#c9a84c]" />
              Le tournant silencieux de la quarantaine
            </h4>
            <p className="text-sm text-[#b8b8b8] leading-relaxed">
              Dès l'âge de 40 ans, les oligodendrocytes (les cellules spécialisées chargées de synthétiser la myéline) commencent à perdre leur vitesse de synthèse. Les micro-fissures de la gaine laissent fuiter les influx nerveux : le premier symptôme n'est pas la démence, mais le <strong>brouillard mental</strong>, le mot sur le bout de la langue et la sensation de devoir faire deux fois plus d'efforts pour retenir une information nouvelle.
            </p>
          </div>

          <p className="mb-3 font-semibold text-white">
            Pour reconstituer cette gaine, les cellules ont des exigences strictes :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-[#b8b8b8] pl-2">
            <li><strong className="text-white">Des lipides complexes :</strong> cérébrosides, sphingomyélines et acides gras à très longue chaîne (acide nervonique, DHA purifié).</li>
            <li><strong className="text-white">Des modulateurs trophiques :</strong> des facteurs capables de réveiller les cellules progénitrices d'oligodendrocytes (OPC) en dormance.</li>
            <li><strong className="text-white">Une protection antioxydante hydrophile et lipophile :</strong> pour empêcher la peroxydation lipidique destructrice des membranes cérébrales.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-12 pt-8 border-t border-[#30363d]">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#c9a84c]" />
            2. Le FGF17 : la molécule qui réveille les cellules souches
          </h2>
          <p className="mb-4">
            L'une des percées les plus retentissantes des neurosciences récentes concerne le <strong>FGF17 (Fibroblast Growth Factor 17)</strong>. Mis en lumière par des travaux pionniers sur le liquide céphalo-rachidien jeune, ce facteur de croissance agit comme un véritable chef d'orchestre épigénétique.
          </p>
          <p className="mb-6">
            Lorsqu'il est activé, le FGF17 stimule directement les OPC (Oligodendrocyte Progenitor Cells), les incitant à proliférer, à migrer vers les zones dégradées et à initier une <strong>remyélinisation active</strong>. Dans les modèles expérimentaux de 2026, la restauration de cette cascade redonne aux neurones âgés la plasticité synaptique et la vivacité de neurones de plusieurs décennies plus jeunes.
          </p>

          <div className="p-5 rounded-xl bg-[#2d5016]/20 border border-[#2d5016] text-[#e6edf3]">
            <strong className="text-[#86efac] block mb-1 text-sm uppercase tracking-wider">
              ✨ La convergence avec la phytothérapie intégrale
            </strong>
            <p className="text-sm text-[#b8b8b8] leading-relaxed">
              Certaines molécules botaniques rares (les héricinones et érinacines de l'<em>Hericium erinaceus</em>, les bacosides du <em>Bacopa monnieri</em>, l'acide carnosique du romarin) activent précisément les voies de transduction intracellulaire qui convergent vers les récepteurs FGF et la libération de BDNF/NGF endogène.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12 pt-8 border-t border-[#30363d]">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5 flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#c9a84c]" />
            3. Ce que les plantes peuvent faire — et ce qu'elles ne peuvent pas faire
          </h2>
          <p className="mb-6">
            Chez Bloom by BotaniK, la rigueur scientifique prime toujours sur les promesses creuses. Il est capital de poser des frontières claires entre la physiologie du terrain et l'illusionnisme médical.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">
                ✅ Ce que la phytothérapie PEUT faire :
              </h4>
              <ul className="space-y-2 text-xs text-[#b8b8b8] leading-relaxed">
                <li>• Apporter les substrats lipidiques nobles nécessaires à la biosynthèse de la gaine.</li>
                <li>• Stimuler la synthèse endogène de BDNF et de NGF.</li>
                <li>• Éteindre la neuro-inflammation de bas grade qui détruit les oligodendrocytes.</li>
                <li>• Rétablir la microcirculation et l'oxygénation capillaire cérébrale.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d]">
              <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">
                ❌ Ce que les plantes NE PEUVENT PAS faire :
              </h4>
              <ul className="space-y-2 text-xs text-[#b8b8b8] leading-relaxed">
                <li>• Inverser un AVC massif ou des lésions nécrotiques installées.</li>
                <li>• Compenser un mode de vie délétère (sommeil bafoué, sédentarité totale, excès de sucre).</li>
                <li>• Remplacer un suivi neurologique spécialisé en cas de pathologie neurodégénérative avancée.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12 pt-8 border-t border-[#30363d]">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5">
            4. Ce que cela signifie pour vous dès aujourd'hui
          </h2>
          <p className="mb-4">
            Vous n'avez pas besoin d'attendre l'apparition d'oublis alarmants pour protéger votre capital synaptique. Chaque jour où vos oligodendrocytes reçoivent des acides gras protégés, des polyphénols stabilisés et des signaux trophiques est un jour où votre cerveau maintient son étanchéité électrique.
          </p>
          <p>
            La sensation de clarté mentale retrouvée, la rapidité d'esprit en fin de journée et la disparition du brouillard cognitif ne relèvent pas du miracle : elles traduisent simplement la reprise de l'homéostasie myélinique.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-12 pt-8 border-t border-[#30363d]">
          <h2 className="text-2xl sm:text-3xl text-[#c9a84c] font-black tracking-tight mb-5 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#c9a84c]" />
            5. Ce que vous trouverez dans le protocole
          </h2>
          <p className="mb-4">
            Pour transformer ces découvertes en une routine quotidienne accessible et reproductible, nos équipes ont développé le <strong>Protocole Clarté Mentale</strong> (Soutien Neuronal &amp; Myéline).
          </p>
          <p className="mb-4">
            Ce protocole s'appuie sur la technologie de triple extraction à température contrôlée BloomLab® pour extraire sans les dégrader :
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[#b8b8b8] mb-6 pl-2">
            <li><strong className="text-white">Le Flacon A (Hydrosoluble — 72°C) :</strong> Romarin, Épimède titré en icariine et Baicaléine pour la réactivation des gènes de myéline et des progéniteurs neuronaux OPC.</li>
            <li><strong className="text-white">Le Flacon B (Liposoluble — 58°C) :</strong> Curcumine potentialisée par la pipérine dans un bain vierge d'huile d'onagre (acides gras oméga-6 GLA) pour inhiber la neuro-inflammation NF-κB.</li>
            <li><strong className="text-white">Le Flacon C (Émulsion Protectrice — 48°C) :</strong> Quercétine pure et oméga-3 DHA pour contrer la ferroptose gliale et consolider l'isolant axonique.</li>
          </ol>
        </section>

        {/* CTA Card vers la recette */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0f261e] border border-[#c9a84c]/40 text-center mb-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-4">
            Accès au Protocole
          </div>
          <h3 className="text-2xl sm:text-3xl text-[#f5f0e8] font-black tracking-tight mb-4">
            Passez à la Pratique : Découvrez le Protocole Clarté Mentale
          </h3>
          <p className="text-sm sm:text-base text-[#b8b8b8] max-w-xl mx-auto mb-8">
            La recette d'extraction BloomLab en 3 flacons, les paramètres thermiques précis au 0,5°C près, la liste des contre-indications et le calendrier d'induction sont disponibles dès maintenant.
          </p>
          <button
            onClick={() => onNavigate('protocole-myeline')}
            className="px-8 py-4 rounded-full bg-[#c9a84c] hover:bg-[#dfbf63] text-[#0d1117] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Accéder au Protocole Clarté Mentale</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="mt-4 text-xs text-[#8b949e]">
            🎁 Prérequis et contre-indications en accès libre • Réservé aux abonnés Bloom pour la recette complète.
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/80 leading-relaxed mb-12">
          <strong>Avertissement Médical &amp; Légal :</strong> Cet article relève de la vulgarisation scientifique et de l'éducation à la santé naturelle. Il ne constitue en aucun cas un avis médical, un diagnostic ou une promesse de guérison. Consultez votre médecin traitant ou votre neurologue avant d'entreprendre toute démarche de supplémentation, particulièrement en cas de traitement anticoagulant ou de pathologie chronique.
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-12 text-center text-xs text-[#8b949e]">
        <div className="text-base text-[#f5f0e8] mb-2 font-bold">Bloom by BotaniK</div>
        <p className="mb-2">L'ingénierie au service du vivant • Phytothérapie de haute précision</p>
        <p>&copy; 2026 Bloom by BotaniK. Tous droits réservés.</p>
      </footer>
    </article>
  );
}
