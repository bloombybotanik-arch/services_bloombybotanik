
import React, { useEffect, useState } from 'react';
import { 
  FlaskConical, 
  Droplets, 
  Wind, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Compass, 
  BookOpen, 
  Clock, 
  ShoppingBag,
  Layers,
  Thermometer,
  Feather,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Beaker,
  Zap,
  HelpCircle,
  HeartHandshake,
  MessageSquare,
  ArrowUpRight,
  Lock,
  Flame
} from 'lucide-react';
import ExtractionKineticsChart from './components/ExtractionKineticsChart';
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
import { TooltipLexique } from './components/TooltipLexique';

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

export interface SEOArticleProps {
  lang: string;
  t: any;
  onNavigate?: (view: any, param?: string) => void;
  isPremium?: boolean;
  onRequireAuth?: () => void;
}

export const InfusionPrecision = ({ lang, t, onNavigate }: SEOArticleProps) => {
  const isFR = lang === 'fr';

  useEffect(() => {
    const pageTitle = isFR
      ? "L'Infusion de Précision : Maîtriser le Temps et la Température | Bloom by BotaniK"
      : "Precision Botanical Infusion: Mastering Time and Temperature | Bloom by BotaniK";
    document.title = pageTitle;

    const pageDesc = isFR
      ? "L'infusion n'est pas une approximation. Découvrez comment la science de la précision thermique transforme une simple tisane en un extrait botanique puissant."
      : "Botanical infusion is not an approximation. Discover how thermal precision turns ordinary herbal tea into a potent therapeutic plant extract.";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [lang, isFR]);

  if (!isFR) return <div className="p-20 text-center text-[#0F261E]">Coming soon in your language.</div>;

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24 selection:bg-[#D97706]/20 selection:text-[#0F261E]">
      {/* HEADER HERO */}
      <header className="relative bg-gradient-to-b from-[#EFEAE2] to-[#FAF7F2] border-b border-[#E7DFD3] pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <button
              onClick={() => onNavigate ? onNavigate('home') : window.location.assign('/')}
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigate ? onNavigate('academie') : window.location.assign('/academie')}
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Bloom Académie
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#1C3F34] font-semibold">Les Températures</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3F34]/5 border border-[#1C3F34]/15 text-[#1C3F34] text-[11px] font-bold uppercase tracking-wider">
            <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Thermodynamique Botanique &amp; Extraction de Précision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1]">
            L'Infusion de Précision : Maîtriser le Temps et la Température
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal max-w-3xl">
            L'infusion n'est pas une approximation. Découvrez comment la science de la précision thermique transforme une simple tisane en un extrait botanique puissant.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 text-xs font-mono text-slate-500 border-t border-[#E7DFD3]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D97706]" />
              Lecture : 8 min
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1C3F34]" />
              Niveau : Guide Fondamental &amp; Pratique
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Standard Totum BloomLab®
            </span>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">

        {/* SECTION 1: POURQUOI LA PRÉCISION CHANGE TOUT ? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Pourquoi la précision change tout ?
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Aujourd'hui, quand vous préparez une tisane, vous versez de l'eau bouillante sur vos plantes, vous attendez <em>« un certain temps »</em>, et vous buvez. Vous faites ce que tout le monde fait depuis des siècles.
            </p>
            <p className="text-lg font-medium text-[#0F261E]">
              <strong>Mais voici ce que personne ne vous dit :</strong> dans cette tasse, vous ne buvez que <strong className="text-[#D97706]">l'ombre de ce que la plante avait à vous offrir</strong>.
            </p>
            <p>
              Les études sont formelles : la majorité des molécules actives de vos plantes sont <strong className="text-[#0F261E]">détruites par l'eau bouillante</strong> avant même d'avoir pu se libérer. Vous payez pour des plantes de qualité, vous les faites infuser avec amour — et vous perdez <strong className="text-red-700 font-semibold">jusqu'à 80% de leur potentiel thérapeutique</strong> à cause d'une seule erreur : la température.
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D97706]/30 text-center sm:text-left space-y-2">
            <p className="text-lg sm:text-xl font-extrabold text-[#0F261E] tracking-tight">
              « La différence entre une tisane et un remède, ce n'est pas la plante. C'est la méthode. »
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Le geste traditionnel sans instrument détruit ce qu'il cherche à capter.
            </p>
          </div>
        </section>

        {/* SECTION 2: TEMPÉRATURE CRITIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Température Critique : le seuil que votre casserole ne peut pas respecter
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            Savez-vous à quelle température vos plantes commencent réellement à perdre leurs actifs ?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-amber-700">Dès 45°C</span>
                <Thermometer className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-sm">Dégradation des composés fragiles</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Les enzymes vivantes, vitamines thermosensibles et flavonoïdes délicats subissent une dénaturation progressive.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-orange-700">Dès 50°C</span>
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-sm">Inactivation anti-inflammatoire</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Les composés phénoliques majeurs (romarin, curcuma) perdent leur structure tridimensionnelle active.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-red-700">À 100°C</span>
                <Flame className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-sm">Destruction massive (casserole)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                L'ébullition détruit la majorité de la valeur thérapeutique et libère les tanins amers astringents.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE]/60 border border-[#D8CBB7] space-y-3">
            <h3 className="text-lg font-bold text-[#1C3F34] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              <span>Avec BloomLab, vous contrôlez la température au degré près</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              Vous pouvez extraire à 42°C, à 45°C, à 50°C — la température exacte où les actifs de votre plante sont libérés <strong className="text-[#0F261E] font-semibold">sans être détruits</strong>. C'est la différence fondamentale entre boire une simple eau colorée et boire un vrai remède de terrain.
            </p>
          </div>
        </section>

        {/* SECTION 3: LE SECRET DES 121°C */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Le secret des 121°C : ce que votre casserole ne fera jamais
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              La BloomLab ne se contente pas d'extraire à froid. Elle monte <strong className="font-semibold text-[#0F261E]">jusqu'à 121°C</strong>, avec une précision absolue de ±0,5°C.
            </p>
            <p>
              <strong className="text-[#0F261E]">Pourquoi c'est une révolution ?</strong> Parce que certaines plantes ont besoin de <strong className="font-semibold text-[#0F261E]">très fortes températures</strong> pour libérer leurs actifs. C'est ce qu'on appelle la <strong className="text-[#D97706] font-semibold">décarboxylation</strong> — un processus qui « active » les molécules en les chauffant à température rigoureusement contrôlée.
            </p>
            <p>
              <strong className="text-[#0F261E]">Le chanvre en est l'exemple parfait.</strong> Les variétés légales de chanvre (sans effet psychoactif) contiennent des composés comme le CBD sous une forme <strong className="text-slate-900">inactive (CBDA)</strong>. Pour qu'ils deviennent actifs, il faut les chauffer à <strong className="text-[#0F261E]">une température précise, pendant un temps précis</strong>. Trop bas : rien ne s'active. Trop haut : tout est détruit. Avec une casserole, c'est impossible. Avec BloomLab, c'est <strong className="text-[#1C3F34] font-semibold">une simple programmation</strong>.
            </p>
          </div>

          {/* Exemples de matrices nécessitant la chauffe */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="font-bold text-[#0F261E] text-base sm:text-lg">
              Et le chanvre n'est pas seul : de nombreuses plantes nécessitent ces hautes températures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#0F261E]">L'écorce de saule</strong> (salicine, anti-douleur naturel) : nécessite une activation thermique contrôlée pour libérer ses glycosides phénoliques.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#0F261E]">La racine de valériane</strong> (acides valéréniques) : se libère de manière optimale sous chauffe régulée sans volatilité des esters.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#0F261E]">Les résines de boswellia</strong> (anti-inflammatoire majeur) : nécessitent une liquéfaction thermique précise pour libérer les acides boswelliques.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#0F261E]">Écorces et baies dures</strong> (comme l'harpagophytum / griffe du diable) : possèdent des actifs denses qui ne s'extraient qu'à chaud.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7DFD3] grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-red-50 text-red-900 border border-red-100">
                <span className="font-bold block mb-1">Ce que votre casserole fait :</span>
                Elle chauffe trop, trop vite, sans contrôle. Vous perdez les actifs fragiles et vous n'activez pas les actifs résistants.
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                <span className="font-bold block mb-1">Ce que BloomLab fait :</span>
                Elle chauffe à la température exacte, pendant le temps exact, pour chaque plante. Vous activez ce qui doit être activé. Vous préservez ce qui doit être préservé.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AGITATION & TEMPS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">4</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Agitation &amp; Temps : les deux paramètres que vous ne contrôlez pas aujourd'hui
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Pensez à votre dernière tisane. Vous avez versé l'eau, vous avez attendu. Mais <strong className="text-[#0F261E]">saviez-vous qu'il fallait remuer ?</strong> Et à quelle vitesse ? Et pendant combien de temps ?
            </p>
            <p>
              <strong className="text-[#0F261E]">Sans agitation, une « couche limite » de solvant saturé se forme autour de la plante.</strong> Cette couche bloque la diffusion moléculaire (Loi de Fick) : l'eau entourant immédiatement la plante est déjà saturée, donc les nouvelles molécules ne peuvent plus sortir de la matrice végétale. Résultat : <strong className="text-red-700 font-semibold">vous perdez plus de 85% des actifs</strong> qui auraient pu être extraits.
            </p>
            <p>
              <strong className="text-[#0F261E]">Avec l'agitation cyclique de BloomLab</strong>, le solvant est constamment renouvelé autour de la plante. Chaque molécule active trouve son chemin vers l'extrait. Rien n'est perdu.
            </p>
            <p>
              <strong className="text-[#0F261E]">Et le temps ?</strong> Une infusion trop courte extrait peu. Une infusion trop longue extrait des tanins amers astringents qui irritent la muqueuse de l'estomac. <strong className="text-[#1C3F34] font-semibold">BloomLab trouve le temps exact pour chaque plante</strong> — ni trop peu, ni trop.
            </p>
          </div>
        </section>

        {/* SECTION 5: PREUVE CINÉTIQUE & GRAPHIQUE INTERACTIF */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">5</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Preuve cinétique : Pourquoi la température fait tout
            </h2>
          </div>

          <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Actifs intacts récupérables au fil du temps, selon la méthode (modèle de diffusion de Fick + dégradation thermique) :
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#D97706]">BloomLab® — Séquençage A/B (72°C → 50°C)</strong> : 70% des actifs préservés à 3 heures.
              </li>
              <li>
                <strong className="text-red-700">Bain-marie / eau bouillante (~98°C, non régulé)</strong> : la majorité des actifs détruits en moins d'une heure par dégradation thermique dominante.
              </li>
              <li>
                <strong className="text-slate-600">Macération solaire ouverte (20-22°C, 4-6 semaines)</strong> : extraction lente, oxydation à l'air libre, rendement très faible.
              </li>
            </ul>
            <p className="text-base font-semibold text-[#1C3F34] pt-2">
              Avec BloomLab, vous êtes dans la fenêtre où l'extraction est maximale et la dégradation minimale.
            </p>
          </div>

          {/* INTÉGRATION DIRECTE DU MODULE CINÉTIQUE INTERACTIF DE L'INDEX */}
          <div className="pt-2">
            <ExtractionKineticsChart lang={lang as any} />
          </div>
        </section>

        {/* SECTION 6: CE QUE VOUS PERDEZ AUJOURD'HUI */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">6</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Ce que vous perdez aujourd'hui (et ce que vous pourriez récupérer)
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#E7DFD3] bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">Ce que vous faites</th>
                  <th className="p-4 sm:p-5 text-red-200">Ce que vous perdez</th>
                  <th className="p-4 sm:p-5 text-emerald-200">Ce que BloomLab change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E]">Eau bouillante (100°C)</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">Jusqu'à 80% des actifs détruits</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">Extraction à la température exacte (au degré près)</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E]">Aucune agitation</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">85% des actifs bloqués dans la plante (couche limite)</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">Agitation cyclique continue et vortex doux</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E]">Temps approximatif</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">Tanins amers, actifs sous-extraits ou brûlés</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">Temps calibré scientifiquement pour chaque plante</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E]">Pas de décarboxylation</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">Les molécules restent inactives (chanvre, écorces)</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">Montée jusqu'à 121°C régulée pour activer</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E]">Aucune reproductibilité</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">Un jour bon, un jour mauvais, jamais dosé</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">Même résultat puissant et constant à chaque fois</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center sm:text-left text-xs sm:text-sm text-amber-950 font-medium">
            Chaque jour, vous perdez de l'argent. Chaque jour, vous perdez du potentiel. Chaque jour, vous buvez une tisane — pas un remède.
          </div>
        </section>

        {/* SECTION 7: LE RÔLE DU BLOOMLAB DANS VOTRE PRATIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">7</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Le rôle du BloomLab® dans votre pratique
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels. En transformant votre cuisine en laboratoire de précision, vous accédez à une souveraineté sanitaire réelle.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="font-bold text-[#0F261E] text-base sm:text-lg">
              Ce que vous obtenez concrètement :
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F261E]">Des extraits plus concentrés :</strong> jusqu'à 5 fois plus d'actifs préservés qu'une tisane classique en casserole.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F261E]">Des remèdes plus efficaces :</strong> parce que les molécules actives ne sont pas détruites avant d'atteindre vos cellules.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F261E]">Une reproductibilité parfaite :</strong> exactement la même concentration et le même profil à chaque cycle.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F261E]">La capacité de décarboxyler :</strong> activer les plantes exigeantes qui demandent une chauffe étalonnée (chanvre, écorces, résines).
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F261E]">Une économie réelle :</strong> vous rentabilisez enfin le coût de vos plantes au lieu d'en jeter 80% dans l'évier.
                </div>
              </div>
            </div>

            <p className="pt-3 border-t border-[#E7DFD3] text-sm sm:text-base font-bold text-[#D97706]">
              Vos plantes valent cher. Votre santé vaut plus. Ne les laissez plus dans l'eau bouillante.
            </p>
          </div>
        </section>

        {/* SECTION 8: CE QUE LA SCIENCE DIT */}
        <section className="space-y-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1C3F34] text-white shadow-xl text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              Ce que la science dit (en une phrase que tout le monde comprend)
            </h3>
            <blockquote className="text-xl sm:text-2xl italic text-white/95 max-w-2xl mx-auto leading-relaxed">
              « La température, le temps et l'agitation déterminent si vous capturez le potentiel thérapeutique d'une plante ou si vous le détruisez. »
            </blockquote>
            <p className="text-xs sm:text-sm text-white/80 font-mono font-medium">
              BloomLab est la seule machine domestique qui vous donne le contrôle sur les trois.
            </p>
          </div>
        </section>

        {/* SECTION 9: FAITES FLEURIR TOUTES VOS ENVIES DE BIEN-ÊTRE VÉGÉTAL */}
        <section className="space-y-6 pt-2">
          {/* Bloc ALMA */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE] border border-[#D8CBB7] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                <MessageSquare className="w-4 h-4 text-[#D97706]" />
                <span>Besoin d'un réglage sur mesure ?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                Faites fleurir vos envies de bien-être végétal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                Pour un conseil personnalisé, interrogez ALMA, notre assistante botaniste, ou consultez nos guides spécialisés.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('chat') : window.location.assign('/chat')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C3F34] hover:bg-[#142d25] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Échanger avec ALMA</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>

          {/* CTA Boutique */}
          <div 
            className="p-8 sm:p-12 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
            style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
          >
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                Précision Thermique Domestique
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Passez de la tisane au remède actif.
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-light">
                Contrôlez l'extraction de vos plantes au degré près dans le confort de votre maison grâce au BloomLab®.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D97706] hover:bg-[#b46304] text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Découvrir BloomLab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mentions éthiques */}
          <div className="text-center text-xs text-slate-500 pt-4 space-y-1">
            <p className="font-semibold text-slate-600">BloomLab® — L'ingénierie au service du vivant.</p>
            <p>Avertissement : ce contenu est éducatif. Il ne remplace pas un avis médical.</p>
          </div>
        </section>

      </div>
    </article>
  );
};

export const TotumDefinition = ({ lang, t, onNavigate }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  useEffect(() => {
    const pageTitle = isFR 
      ? "Totum Végétal : la synergie des actifs de la plante | Bloom by BotaniK"
      : isDE 
      ? "Pflanzen-Totum: Die Synergie pflanzlicher Wirkstoffe | Bloom by BotaniK"
      : "Plant Totum: The Synergy of Botanical Actives | Bloom by BotaniK";
    document.title = pageTitle;

    const pageDesc = isFR
      ? "Qu'est-ce que le totum végétal ? Découvrez comment les médecines anciennes et la science moderne lisent la plante comme un tout cohérent, et pourquoi BloomLab cherche à respecter cette complexité."
      : isDE
      ? "Was ist das pflanzliche Totum? Entdecken Sie, wie alte Traditionen und moderne Wissenschaft die Pflanze als Ganzes verstehen und wie BloomLab diese Komplexität bewahrt."
      : "What is the botanical totum? Discover how ancient traditions and modern science understand the plant as a coherent whole, and why BloomLab respects this complexity.";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [lang, isFR, isDE]);

  const chartData = {
    labels: ['10 min', '30 min', '60 min', '120 min', '180 min'],
    datasets: [
      {
        label: isFR 
          ? 'BloomLab® (Thermorégulation 40°C)' 
          : isDE 
          ? 'BloomLab® (Thermoregulation 40°C)' 
          : 'BloomLab® (Thermoregulation 40°C)',
        data: [45, 78, 92, 98, 99],
        borderColor: '#1C3F34',
        backgroundColor: 'rgba(28, 63, 52, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: isFR 
          ? 'Bain-Marie Classique (~65°C)' 
          : isDE 
          ? 'Klassisches Wasserbad (~65°C)' 
          : 'Classic Bain-Marie (~65°C)',
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
        position: 'bottom' as const,
        labels: {
          font: { family: 'Manrope', size: 12, weight: 'bold' as const },
          color: '#0F261E',
          usePointStyle: true,
          padding: 18
        }
      },
      tooltip: {
        backgroundColor: '#0F261E',
        titleFont: { family: 'Manrope', size: 13, weight: 'bold' as const },
        bodyFont: { family: 'Manrope', size: 12 },
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value: any) => value + '%',
          font: { family: 'Manrope', size: 11 },
          color: '#64748B'
        },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        ticks: {
          font: { family: 'Manrope', size: 11 },
          color: '#64748B'
        },
        grid: { display: false }
      }
    }
  };

  return (
    <article className="bg-[#F9F9F7] text-[#0F261E] min-h-screen pb-28">
      {/* HEADER HERO */}
      <header 
        className="relative text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-widest border border-white/15 backdrop-blur-xs text-left">
            <Compass className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-snug">
              {isFR ? (
                <>
                  <span className="block sm:inline">Science du Vivant &</span>
                  <span className="block sm:inline sm:ml-1 whitespace-nowrap">Souveraineté Botanique</span>
                </>
              ) : isDE ? (
                <span>Wissenschaft des Lebendigen</span>
              ) : (
                <>
                  <span className="block sm:inline">Living Systems &</span>
                  <span className="block sm:inline sm:ml-1 whitespace-nowrap">Botanical Sovereignty</span>
                </>
              )}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {isFR 
              ? "Le Totum Végétal : L'Intelligence Collective de la Plante" 
              : isDE 
              ? "Das Pflanzen-Totum: Die kollektive Intelligenz der Pflanze" 
              : "The Plant Totum: The Collective Intelligence of the Plant"}
          </h1>

          <p className="text-lg sm:text-xl text-white/85 leading-relaxed font-light max-w-3xl">
            {isFR 
              ? "Bien avant d'isoler des molécules, les grandes traditions médicales utilisaient déjà la plante entière. Bloom by BotaniK explore cette intuition ancestrale — le totum — et la lumière que la science moderne apporte à sa compréhension." 
              : isDE 
              ? "Lange vor der Isolierung von Molekülen nutzten die großen Medizintraditionen bereits die ganze Pflanze. Bloom by BotaniK erforscht diese uralte Intuition – das Totum – und das Licht, das die moderne Wissenschaft auf sein Verständnis wirft." 
              : "Long before isolating molecules, great medical traditions were already using the whole plant. Bloom by BotaniK explores this ancestral intuition — the totum — and the light that modern science sheds on its understanding."}
          </p>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">

        {/* SECTION 1: QU'EST-CE QUE LE TOTUM ? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm">1</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E]">
              {isFR ? "Qu'est-ce que le Totum ?" : isDE ? "Was ist das Totum?" : "What is the Totum?"}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {isFR 
                ? <>Le <TooltipLexique terme="totum">totum</TooltipLexique> désigne l'ensemble des constituants d'une plante, considérés dans leur globalité et dans leurs interactions possibles, plutôt que réduits à un seul composé isolé. <TooltipLexique terme="polyphenols">Polyphénols</TooltipLexique>, terpènes, alcaloïdes, fibres, minéraux, huiles essentielles : leur combinaison forme un profil cohérent, qu'aucune molécule seule ne reproduit.</>
                : isDE 
                ? "Das Totum bezeichnet die Gesamtheit der Bestandteile einer Pflanze, betrachtet in ihrer Ganzheit und in ihren möglichen Wechselwirkungen, anstatt auf eine einzelne isolierte Verbindung reduziert zu werden. Polyphenole, Terpene, Alkaloide, Fasern, Mineralien, ätherische Öle: Ihre Kombination bildet ein kohärentes Profil, das kein Einzelmolekül reproduzieren kann."
                : "The totum designates the set of all constituents of a plant, considered in their entirety and in their possible interactions, rather than reduced to a single isolated compound. Polyphenols, terpenes, alkaloids, fibers, minerals, essential oils: their combination forms a coherent profile that no single molecule can replicate."}
            </p>
            <p className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-sm sm:text-base text-slate-600 italic">
              {isFR 
                ? "Cette vision ne remplace ni l'analyse scientifique ni l'avis d'un professionnel de santé. Elle ne signifie pas que toutes les substances sont extraites dans chaque préparation, ni qu'une plante produit automatiquement un effet déterminé. Elle invite simplement à respecter davantage la complexité du vivant."
                : isDE 
                ? "Diese Vision ersetzt weder wissenschaftliche Analysen noch den Rat eines Arztes. Sie bedeutet nicht, dass alle Substanzen in jeder Zubereitung extrahiert werden oder dass eine Pflanze automatisch eine bestimmte Wirkung entfaltet. Sie lädt einfach dazu ein, die Komplexität des Lebendigen mehr zu respektieren."
                : "This vision replaces neither scientific analysis nor the advice of a healthcare professional. It does not mean that all substances are extracted in every preparation, nor that a plant automatically produces a determined effect. It simply invites us to respect the complexity of living organisms more deeply."}
            </p>
          </div>
        </section>

        {/* SECTION 2: CE QUE LES SAGESSES ANCIENNES SAVAIENT DÉJÀ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm">2</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E]">
              {isFR ? "Ce que les sagesses anciennes savaient déjà" : isDE ? "Was alte Weisheiten bereits wussten" : "What Ancient Wisdom Already Knew"}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            {isFR 
              ? "Pendant des millénaires, des civilisations séparées par les continents ont construit, indépendamment, des systèmes de lecture de la plante comme un tout. Cette convergence ancestrale n'est pas décorative : c'est notre système de validation primaire. Quand trois traditions ou plus identifient la même plante pour le même usage, et que la biochimie moderne documente un mécanisme, le signal devient fort."
              : isDE 
              ? "Über Jahrtausende hinweg bauten Kulturen, getrennt durch Kontinente, unabhängig voneinander Systeme auf, um die Pflanze als Ganzes zu lesen. Diese Konvergenz ist unser primäres Validierungssystem: Wenn drei oder mehr Traditionen dieselbe Pflanze für denselben Zweck identifizieren und die Biochemie den Mechanismus dokumentiert, wird das Signal unübersehbar."
              : "For millennia, civilizations separated by continents independently built systems for reading the plant as a whole. This ancestral convergence is our primary validation system: when three or more traditions identify the same plant for the same use, and modern biochemistry documents a mechanism, the signal becomes compelling."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* MTC */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#D97706] font-bold text-sm">
                <span className="text-xl">🏮</span>
                <span>{isFR ? "Médecine Traditionnelle Chinoise" : "Traditionelle Chinesische Medizin"}</span>
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">
                {isFR ? "La plante comme accord de saveurs" : "Die Pflanze als Akkord von Aromen"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Le Shennong Bencao Jing (Classique de la Matière Médicale, compilé il y a près de 2 000 ans) ne classe pas les 365 substances qu'il décrit par « principe actif », mais par saveur, nature thermique et affinité méridienne. La plante y est lue comme un profil complet."
                  : "The Shennong Bencao Jing classifies substances not by 'active principle', but by flavor, thermal nature, and meridian affinity. The plant is read as a complete profile."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "L'exemple le plus frappant est le Schisandra (Wu Wei Zi), littéralement « le fruit des cinq saveurs » : acide, amer, doux, piquant et salé agissant de concert sur l'ensemble des organes. C'est le totum incarné."
                  : "The most striking example is Schisandra (Wu Wei Zi), 'the five-flavor fruit': sour, bitter, sweet, pungent, and salty acting harmoniously across all organs. The totum embodied."}
              </p>
            </div>

            {/* Ayurveda */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#D97706] font-bold text-sm">
                <span className="text-xl">🕉️</span>
                <span>{isFR ? "Ayurveda" : "Ayurveda"}</span>
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">
                {isFR ? "Les six saveurs et la signature énergétique" : "Die sechs Geschmäcker und die Energiesignatur"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Les textes fondateurs de l'Ayurveda (Charaka Samhita) lisent chaque plante à travers rasa (la saveur), virya (l'énergie) et vipaka (l'effet post-digestif). Là encore, jamais une molécule : toujours un profil."
                  : "Foundational Ayurvedic texts (Charaka Samhita) interpret plants through rasa (flavor), virya (energy), and vipaka (post-digestive effect). Always a profile, never an isolated molecule."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "Le curcuma (Haridra) associé au poivre noir et à un corps gras (« lait d'or ») : la recherche des années 90 a démontré que la pipérine décuple l'absorption de la curcumine. L'intuition ancestrale validée par la science."
                  : "Turmeric (Haridra) traditionally paired with black pepper and lipids ('golden milk'): 1990s research showed piperine dramatically enhances curcumin absorption. Ancestral intuition verified by modern science."}
              </p>
            </div>

            {/* Occident */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#D97706] font-bold text-sm">
                <span className="text-xl">🏛️</span>
                <span>{isFR ? "L'Occident Médiéval & Antique" : "The Classical West"}</span>
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">
                {isFR ? "D'Hippocrate aux médecines monastiques" : "From Hippocrates to Monastic Medicine"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "L'école hippocratique, puis Dioscoride (De Materia Medica, Ier siècle), décrivent les plantes avec leurs préparations complètes — parties, supports, temps. Hildegarde de Bingen (Physica, XIIe siècle) considère la plante dans son entier : feuille, tige, racine, sève."
                  : "Hippocratic medicine and Dioscorides described plants with full preparation procedures. Hildegard of Bingen considered the plant in its entirety: leaf, stem, root, sap."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "La théorie des signatures (Paracelse, XVIe siècle), bien qu'historique et non scientifique, témoigne de cette même obsession : lire la plante comme un tout cohérent."
                  : "The doctrine of signatures (Paracelsus), though historical, testifies to this same drive: understanding the plant as a unified living whole."}
              </p>
            </div>

            {/* Ethnobotanique */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#D97706] font-bold text-sm">
                <span className="text-xl">🌿</span>
                <span>{isFR ? "Ethnobotaniques du Monde" : "World Ethnobotany"}</span>
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">
                {isFR ? "La plante comme écosystème vivant" : "The plant as a living ecosystem"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Des traditions amazoniennes aux savoirs africains, la plante se prépare en macérations, fermentations et associations de parties — jamais comme une molécule isolée. L'ethnobotanique documente ces savoirs : la plante y est traitée comme un écosystème, pas comme un stock de composés."
                  : "From Amazonian traditions to African herbal knowledge, plants were prepared through gentle macerations, slow ferments, and holistic pairings — treated as living ecosystems."}
              </p>
            </div>
          </div>

          {/* Synthèse commune */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D97706]/20 space-y-3 text-center sm:text-left">
            <h4 className="font-extrabold text-[#0F261E] text-base sm:text-lg">
              {isFR ? "Le point commun de toutes ces traditions :" : "The common denominator across all traditions:"}
            </h4>
            <p className="text-slate-600 text-sm sm:text-base font-light">
              {isFR ? (
                <>
                  Aucune ne demande : <em>« Quelle molécule ? »</em><br />
                  Toutes demandent : <strong>« Quelle partie ? Quelle préparation ? Quelle association ? Pour quel terrain ? »</strong>
                </>
              ) : (
                <>
                  None ask: <em>'Which molecule?'</em><br />
                  All ask: <strong>'Which part? Which preparation? Which synergy? For which terrain?'</strong>
                </>
              )}
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#D97706]">
              {isFR ? "C'est exactement la question que pose BloomLab." : "This is exactly the question answered by BloomLab."}
            </p>
          </div>
        </section>

        {/* SECTION 3: LA SYNERGIE MOLÉCULAIRE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm">3</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E]">
              {isFR 
                ? "La synergie moléculaire : quand la science redécouvre le geste" 
                : isDE 
                ? "Molekulare Synergie: Wenn die Wissenschaft die Geste wiederentdeckt" 
                : "Molecular Synergy: When Science Rediscovers the Gesture"}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {isFR 
                ? "La littérature moderne sur les extraits végétaux souligne que l'extrait entier peut présenter des comportements que le composé isolé n'a pas : les composés compagnons modulent la solubilité, la stabilité et l'absorption des autres. On parle aujourd'hui de polypharmacologie et de biologie des systèmes — la logique « une molécule, une cible » cède la place à une lecture en réseaux."
                : "Modern literature on botanical extracts underscores that full extracts display behaviors absent in isolated compounds: companion compounds modulate solubility, stability, and bioavailability. Modern pharmacology refers to this as network biology and polypharmacology."}
            </p>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-2 text-sm text-slate-700">
              <p className="font-bold text-[#0F261E]">
                {isFR ? "L'histoire est éloquente :" : "History speaks for itself:"}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>{isFR ? "L'écorce de saule → salicine → aspirine (XIXe siècle)." : "Willow bark → salicin → aspirin (19th century)."}</li>
                <li>{isFR ? "Le quinquina → quinine." : "Cinchona bark → quinine."}</li>
              </ul>
              <p className="text-xs text-slate-500 pt-2 italic">
                {isFR 
                  ? "Chaque isolement a produit un médicament — progrès médical réel que nous respectons. Mais il a aussi fait oublier la matrice d'origine. Bloom documente ce pattern. Pas pour dénigrer la médecine. Pour ne pas oublier la plante."
                  : "Every isolation created an important medical advance that we deeply respect. But it also severed memory of the original matrix. Bloom documents this pattern not to disparage medicine, but never to forget the plant."}
              </p>
            </div>
          </div>

          {/* CRITICAL: FOND DE COULEUR SOMBRE GARANTI POUR RENDRE LE TEXTE BLANC PARFAITEMENT LISIBLE */}
          <div 
            className="my-10 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/10"
            style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
          >
            <FlaskConical className="absolute top-[-20px] right-[-20px] w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFR ? "Principe Fondateur" : "Core Principle"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isFR ? "La Synergie Moléculaire" : "Molecular Synergy"}
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
                {isFR 
                  ? "Dans le Totum, certaines molécules agissent comme des agents actifs, tandis que d'autres facilitent l'absorption ou limitent les effets secondaires. C'est cette « harmonie biochimique » que nous cherchons à capturer avec le BloomLab."
                  : "In the Totum, certain molecules act as active agents, while others facilitate cellular absorption or mitigate unwanted side effects. It is this exact 'biochemical harmony' that we capture with BloomLab."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: POURQUOI BLOOMLAB CHERCHE À RESPECTER LE TOTUM */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm">4</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E]">
              {isFR 
                ? "Pourquoi BloomLab cherche à respecter le Totum" 
                : isDE 
                ? "Warum BloomLab das Totum respektiert" 
                : "Why BloomLab Strives to Respect the Totum"}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p className="text-lg font-medium text-[#0F261E] italic">
              {isFR ? "« Les sagesses anciennes avaient le geste. Nous leur apportons l'instrument. »" : "« Ancient wisdom held the gesture. We provide the instrument. »"}
            </p>
            <p>
              {isFR 
                ? "Chaque plante contient des composés hydrosolubles, liposolubles et alcoolosolubles. Les extraire ensemble, à des températures incompatibles, détruit les plus fragiles. C'est pourquoi BloomLab orchestre le Séquençage Actif A/B :"
                : "Every plant contains hydrosoluble, liposoluble, and alcoholsoluble compounds. Extracting them haphazardly at conflicting temperatures destroys the most delicate ones. This is why BloomLab orchestrates Active A/B Sequencing:"}
            </p>
          </div>

          {/* TABLEAU SÉQUENÇAGE A/B */}
          <div className="overflow-x-auto rounded-3xl border border-[#E7DFD3] bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E7DFD3] text-xs font-bold uppercase tracking-wider text-[#0F261E]">
                  <th className="p-4 sm:p-5">Phase</th>
                  <th className="p-4 sm:p-5">Température</th>
                  <th className="p-4 sm:p-5">Cible & Molécules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3] text-sm sm:text-base text-slate-700">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    Phase A — Hydrosoluble
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs sm:text-sm font-semibold text-[#D97706]">70–75°C selon la matrice</td>
                  <td className="p-4 sm:p-5 text-sm text-slate-600">Minéraux, polysaccharides, composés hydrosolubles</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    Phase B — Liposoluble
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs sm:text-sm font-semibold text-[#D97706]">45–55°C</td>
                  <td className="p-4 sm:p-5 text-sm text-slate-600">Résines, huiles essentielles, composés lipophiles</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    Activation thermique
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs sm:text-sm font-semibold text-[#D97706]">Jusqu'à 121°C</td>
                  <td className="p-4 sm:p-5 text-sm text-slate-600">Transformations spécifiques (décarboxylation selon protocole)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center sm:text-left text-sm sm:text-base font-bold text-[#D97706]">
            {isFR ? "Libérer le Totum. Pas trahir la plante." : "Release the Totum. Never betray the plant."}
          </p>

          {/* INTÉGRATION DE LA SECTION DE L'INDEX : LA SCIENCE DU TOTUM */}
          <div className="pt-8 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#1C3F34] text-[11px] font-bold uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Ingénierie R&D — Les Solvants' : 'R&D Engineering — Solvents'}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E] leading-tight">
              {isFR 
                ? 'La Science du Totum : À chaque plante son solvant et sa température' 
                : isDE 
                ? 'Die Totum-Wissenschaft: Zu jeder Pflanze ihr Lösungsmittel und ihre Temperatur' 
                : 'Totum Science: To each plant its solvent and temperature'}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              {isFR 
                ? 'Contrairement aux bains-marie génériques, la BloomLab® ajuste la synergie solvant-température pour extraire la totalité du profil phytochimique sans dénaturation.' 
                : 'Unlike generic bain-maries, BloomLab® calibrates the exact solvent-temperature synergy to extract the full phytochemical spectrum without thermal denaturation.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { 
                  icon: "🧪", 
                  title: isFR ? "Résines & Graines Dures" : "Resins & Hard Seeds", 
                  sub: "(Boswellia, Girofle)", 
                  desc: isFR ? "Extraction ciblée à 60° d'alcool • Protocole 45°C" : "Targeted extraction at 60° alcohol • 45°C Protocol" 
                },
                { 
                  icon: "🌿", 
                  title: isFR ? "Racines & Écorces" : "Roots & Barks", 
                  sub: "(Salsepareille, Gentiane)", 
                  desc: isFR ? "Extraction ciblée à 55° d'alcool • Protocole 40°C" : "Targeted extraction at 55° alcohol • 40°C Protocol" 
                },
                { 
                  icon: "🌸", 
                  title: isFR ? "Fleurs & Feuilles Fragiles" : "Flowers & Fragile Leaves", 
                  sub: "(Passiflore, Pensée)", 
                  desc: isFR ? "Extraction douce à 45° d'alcool / Huile • Protocole 35°C" : "Gentle extraction at 45° alcohol / Oil • 35°C Protocol" 
                }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <div className="text-xs font-bold text-[#0F261E] leading-snug">
                    {item.title} <br /><span className="text-slate-500 font-normal">{item.sub}</span>
                  </div>
                  <div className="text-xs text-[#D97706] font-medium pt-1 border-t border-slate-100">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center space-x-2.5 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                {isFR 
                  ? "SÉCURITÉ GARANTIE : Nos protocoles excluent à 100% l'usage de plantes toxiques." 
                  : "GUARANTEED SAFETY: Our protocols 100% exclude toxic or hazardous botanical species."}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: NOTRE RIGUEUR ET NOS LIMITES */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm">5</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E]">
              {isFR ? "Notre rigueur et nos limites" : isDE ? "Unsere Sorgfalt und Grenzen" : "Our Rigor and Limits"}
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-4 shadow-xs">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {isFR 
                ? "Le totum n'est ni une promesse de guérison, ni une promesse d'extraction complète, ni une absence de risque. Les plantes peuvent avoir des contre-indications et interagir avec des médicaments. Nos contenus sont pédagogiques et ne remplacent pas un avis médical."
                : isDE 
                ? "Das Totum ist weder ein Heilversprechen noch ein Versprechen vollständiger Extraktion oder die Abwesenheit von Risiken. Pflanzen können Kontraindikationen aufweisen und mit Medikamenten interagieren. Unsere Inhalte sind rein pädagogisch."
                : "The totum is neither a promise of healing, nor a claim of total extraction, nor an absence of risk. Plants carry contraindications and may interact with prescription medications. Our educational contents never replace medical advice."}
            </p>
            <div className="pt-2 border-t border-[#E7DFD3] text-[#1C3F34] italic text-base sm:text-lg">
              {isFR 
                ? "« Une place pour chaque plante, et chaque plante à sa place. »" 
                : "« A place for every plant, and every plant in its place. »"}
              <span className="block text-xs font-sans not-italic text-slate-500 mt-1 font-normal">
                {isFR ? "Cette maxime guide notre approche de l'extraction intégrale." : "This maxim guides our whole extraction approach."}
              </span>
            </div>
          </div>
        </section>

        {/* LE GRAPHIQUE POUR FINIR */}
        <section className="space-y-6 pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F261E]">
                  {isFR 
                    ? 'Rendement de Préservation des Principes Actifs' 
                    : isDE 
                    ? 'Erhaltungsertrag der Wirkstoffe' 
                    : 'Active Principles Preservation Yield'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isFR 
                    ? 'Comparatif de la concentration en molécules d\'intérêt au fil du temps (BloomLab 40°C vs Bain-Marie classique 65°C)' 
                    : 'Comparison of concentration of active molecules over time'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#1C3F34] text-white px-3 py-1.5 rounded-full shrink-0">
                R&D BloomLab
              </span>
            </div>

            <div className="h-[320px] sm:h-[360px] w-full pt-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* CTA VERS LA BOUTIQUE */}
        <section className="pt-6">
          <div 
            className="p-8 sm:p-12 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
            style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
          >
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                {isFR ? "Passer à la pratique" : "Take Action"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isFR 
                  ? "Découvrez l'instrument qui respecte le Totum." 
                  : isDE 
                  ? "Entdecken Sie das Instrument, das das Totum respektiert." 
                  : "Discover the instrument that respects the Totum."}
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-light">
                {isFR 
                  ? "La BloomLab® vous permet de maîtriser l'extraction de vos plantes au degré près dans le confort de votre maison." 
                  : "BloomLab® allows you to master botanical extraction degree by degree in the comfort of your home."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D97706] hover:bg-[#b46304] text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isFR ? "Découvrir la BloomLab® en boutique" : "Discover BloomLab® in Shop"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};

export const SolvantsExtraction = ({ lang, t, onNavigate, isPremium, onRequireAuth }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  const [unlockedLocally, setUnlockedLocally] = useState(false);
  const hasAccess = Boolean(isPremium || unlockedLocally);

  useEffect(() => {
    const pageTitle = isFR
      ? "Eau, Huile ou Alcool : Choisir le Bon Vecteur d'Actifs | Bloom by BotaniK"
      : "Water, Oil or Alcohol: Choosing the Right Active Vector | Bloom by BotaniK";
    document.title = pageTitle;

    const pageDesc = isFR
      ? "Guide complet des solvants d'extraction végétale : polarité, pureté de l'eau, pénétration transdermique des huiles, alcool de précision et solvants alternatifs pour le Totum."
      : "Complete guide to botanical extraction solvents: polarity, water purity, transdermal oil penetration, precision alcohol, and alternative solvents.";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [lang, isFR]);

  if (!isFR) return <div className="p-20 text-center text-[#0F261E]">Coming soon in your language.</div>;

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#0F261E] pb-24 selection:bg-[#D97706]/20 selection:text-[#0F261E]">
      {/* HEADER HERO */}
      <header className="relative bg-gradient-to-b from-[#EFEAE2] to-[#FAF7F2] border-b border-[#E7DFD3] pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <button
              onClick={() => onNavigate ? onNavigate('home') : window.location.assign('/')}
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigate ? onNavigate('academie') : window.location.assign('/academie')}
              className="hover:text-[#1C3F34] transition-colors cursor-pointer"
            >
              Bloom Académie
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#1C3F34] font-semibold">Les Solvants d'Extraction</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C3F34]/5 border border-[#1C3F34]/15 text-[#1C3F34] text-[11px] font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Ingénierie & Synergie Botanique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F261E] tracking-tight leading-[1.1]">
            Eau, Huile ou Alcool : Choisir le Bon Vecteur d'Actifs
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal max-w-3xl">
            Chaque molécule végétale a son affinité. Apprenez à choisir le solvant idéal pour extraire les principes actifs dont votre terrain a besoin, mais aussi pour transporter le remède jusqu'à sa cible.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 text-xs font-mono text-slate-500 border-t border-[#E7DFD3]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D97706]" />
              Lecture : 8 min
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1C3F34]" />
              Niveau : Guide Fondamental & Pratique
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Standard Totum BloomLab®
            </span>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">

        {/* SECTION 1: LE SOLVANT, BIEN PLUS QU'UN SIMPLE LIQUIDE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Le solvant : bien plus qu'un simple liquide
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Un solvant d'extraction n'est pas un simple vecteur inerte. C'est un <strong className="font-semibold text-[#0F261E]">partenaire actif</strong> qui détermine quelles molécules seront libérées, à quelle concentration, et surtout <strong className="font-semibold text-[#0F261E]">comment elles atteindront leur site d'action</strong>. Le choix du solvant conditionne la puissance du remède autant que la plante elle-même.
            </p>
            <p>
              En extraction botanique, trois familles de solvants se distinguent par leur polarité — leur capacité à dissoudre des molécules plutôt grasses (lipophiles) ou plutôt aqueuses (hydrophiles).
            </p>
          </div>

          {/* Cartes Polarité */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">Très Polaire : L'Eau</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Affinité exclusive pour les composés hydrophiles : minéraux, mucilages, sucres complexes et certains flavonoïdes.
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Hydrophile
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">Apopolaire : L'Huile</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Affinité pour les lipides végétaux, huiles essentielles, caroténoïdes, cires et phytostérols protecteurs.
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Lipophile
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Beaker className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0F261E] text-base">Amphiphile : L'Alcool</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Double affinité grâce à sa chaîne carbonée et son groupement hydroxyle. Dissout résines, alcaloïdes et polyphénols.
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Hydroalcoolique
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: L'EAU : LE SOLVANT UNIVERSEL DE LA VIE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              L'Eau : Le solvant universel de la vie
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              L'infusion à l'eau est la méthode la plus courante. Elle permet d'extraire les <strong className="font-semibold text-[#0F261E]">molécules hydrosolubles</strong> : sels minéraux, tanins, mucilages, flavonoïdes polaires, polysaccharides.
            </p>
            <p>
              Avec le BloomLab, vous maîtrisez la température pour ne pas "brûler" les actifs fragiles. Une extraction à 42–45°C préserve les composés thermolabiles que l'eau bouillante détruirait.
            </p>
          </div>

          {/* Grille Ce que l'eau extrait / n'extrait pas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Ce que l'eau extrait</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-[#0F261E]">Minéraux & oligo-éléments</strong> biodisponibles (silice, potassium, fer)</li>
                <li><strong className="text-[#0F261E]">Mucilages adoucissants</strong> (guimauve, mauve, graines de lin)</li>
                <li><strong className="text-[#0F261E]">Tanins hydrosolubles</strong> et acides phénoliques</li>
                <li><strong className="text-[#0F261E]">Flavonoïdes hydrosolubles</strong> et anthocyanes</li>
                <li><strong className="text-[#0F261E]">Glycosides & polysaccharides</strong> stimulants de l'immunité</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                <span>Ce que l'eau n'extrait pas</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-[#0F261E]">Huiles essentielles</strong> (volatiles, évaporées par l'ébullition classique)</li>
                <li><strong className="text-[#0F261E]">Résines</strong> insolubles dans l'eau (boswellia, myrrhe)</li>
                <li><strong className="text-[#0F261E]">Alcaloïdes lipophiles</strong> non ionisés</li>
                <li><strong className="text-[#0F261E]">Caroténoïdes & terpènes</strong> protecteurs cellulaires</li>
              </ul>
            </div>
          </div>

          {/* Sous-section: La pureté de l'eau */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE]/50 border border-[#D8CBB7] space-y-4">
            <div className="flex items-center gap-2 text-[#1C3F34] font-bold text-base sm:text-lg">
              <Droplets className="w-5 h-5 text-[#1C3F34]" />
              <h3>La pureté de l'eau : un critère sous-estimé</h3>
            </div>
            
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              La qualité de l'eau est <strong className="font-semibold text-[#0F261E]">un paramètre déterminant</strong> pour la qualité du produit fini. Le distillateur doit employer de préférence une eau de source sans impureté, sans substance préjudiciable, peu ou pas calcaire, et <strong className="font-semibold text-[#0F261E]">sans adjonction de chlore</strong> comme dans l'eau courante afin que l'extraction soit la plus pure possible.
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                Pour vos extractions BloomLab, privilégiez :
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C3F34] mt-2 shrink-0" />
                  <span><strong className="text-[#0F261E]">Eau distillée extra pure</strong> : conductivité &lt; 1,25 μS/cm, pH 5,50–7,50, absence de chlorures, fluorures, sulfates, nitrates et métaux lourds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C3F34] mt-2 shrink-0" />
                  <span><strong className="text-[#0F261E]">Eau déminéralisée</strong> : obtenue par échange d'ions, plus pure en minéraux mais pouvant contenir des bactéries si non filtrée.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C3F34] mt-2 shrink-0" />
                  <span><strong className="text-[#0F261E]">Eau de source faiblement minéralisée</strong> (résidu sec &lt; 50 mg/L) : certains travaux montrent que les eaux minérales naturelles peuvent offrir de meilleurs rendements d'extraction que l'eau distillée pour certains polyphénols.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs sm:text-sm text-slate-700 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0F261E]">La règle Bloom :</strong> utilisez toujours une eau dont vous connaissez la composition. L'eau du robinet, même filtrée, contient du chlore et des traces de métaux qui peuvent interférer avec les principes actifs et oxyder prématurément le totum.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: L'HUILE : SOINS, GASTRONOMIE ET TRANSPORT TRANSDERMIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              L'Huile : Pour les soins, la gastronomie — et le transport transdermique
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Le macérat huileux est idéal pour extraire les <strong className="font-semibold text-[#0F261E]">molécules liposolubles</strong> : huiles essentielles, caroténoïdes, terpènes, résines. C'est la base de vos baumes cosmétiques et de vos huiles gastronomiques.
            </p>
            <p>
              Mais <strong className="font-semibold text-[#0F261E]">l'huile joue un rôle bien plus important que la simple extraction</strong>. En application cutanée, c'est elle qui <strong className="font-semibold text-[#0F261E]">transporte les principes actifs à travers les couches de la peau</strong> — de l'épiderme jusqu'au derme — où se trouve la réparation réelle. Cette fonction de <strong className="font-semibold text-[#0F261E]">vecteur transdermique</strong> est un acteur majeur du remède, au même titre que les principes actifs eux-mêmes.
            </p>
          </div>

          {/* Sous-section: Le mécanisme de pénétration cutanée */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F261E] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D97706]" />
              <span>Le mécanisme de pénétration cutanée</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              La peau est une barrière lipidique. Les huiles végétales, par leur composition en acides gras, <strong className="font-semibold text-[#0F261E]">fluidisent les lipides du stratum corneum</strong> — la couche la plus externe de l'épiderme — et créent des voies de passage pour les actifs.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              Certaines huiles vont plus loin : elles <strong className="font-semibold text-[#0F261E]">perturbent de manière réversible les lamelles lipidiques</strong> de la barrière cutanée, augmentant le flux de pénétration des principes actifs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#0F261E]">Huile d'Argan</span>
                <p className="text-xs text-slate-600">
                  43–49% d'acide oléique (oméga-9). Agit comme un <em>enhancer</em> de pénétration en assouplissant la barrière cutanée.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#0F261E]">Huile de Jojoba</span>
                <p className="text-xs text-slate-600">
                  Affinité exceptionnelle avec le sébum humain (25% de cérides identiques). Pénètre en profondeur sans boucher les pores.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#0F261E]">Coco Fractionnée (MCT)</span>
                <p className="text-xs text-slate-600">
                  Triglycérides à chaîne moyenne. Pénétration instantanée et perméation facilitée pour les molécules lipophiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RÉPERTOIRE DES HUILES SELON LE RÉSULTAT RECHERCHÉ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">4</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
              Répertoire des huiles selon le résultat recherché
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            Chaque huile végétale possède une carte d'identité biochimique unique. Sélectionnez votre huile de support en fonction de sa profondeur de pénétration et des besoins de votre terrain.
          </p>

          {/* TABLEAU 1: Huiles de pénétration rapide */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-[#0F261E] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D97706]" />
                <span>1. Huiles de pénétration rapide (vecteurs d'actifs)</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Usage : Sérums & Pénétration Cutanée</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3.5 sm:p-4">Huile</th>
                    <th className="p-3.5 sm:p-4">Acides gras clés</th>
                    <th className="p-3.5 sm:p-4">Pénétration</th>
                    <th className="p-3.5 sm:p-4">Résultat recherché</th>
                    <th className="p-3.5 sm:p-4">Terrain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Jojoba</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">Cérides (similaires au sébum)</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">Très profonde (33% dans le stratum corneum)</td>
                    <td className="p-3.5 sm:p-4">Régulation du sébum, acné, peaux mixtes</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">Tous terrains, surtout gras</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Pépins de raisin</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">90% acides gras insaturés</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">Rapide, non grasse</td>
                    <td className="p-3.5 sm:p-4">Peaux mixtes à grasses, anti-âge</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[11px]">Pitta, peaux réactives</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Noyau d'abricot</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">Oméga-9, vitamine A</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">Rapide, non grasse</td>
                    <td className="p-3.5 sm:p-4">Peaux matures, ternes, fatiguées</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">Vata, peaux sèches</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Argan</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">43–49% acide oléique</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">Rapide, non grasse</td>
                    <td className="p-3.5 sm:p-4">Anti-âge, psoriasis, eczéma</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">Tous terrains</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Coco fractionnée</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">MCT (acide laurique)</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">Très rapide, non grasse</td>
                    <td className="p-3.5 sm:p-4">Hydratation, barrière cutanée</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">Tous terrains</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CONTENU SOUS ACCÈS PAYANT PAR ABONNEMENT */}
        {hasAccess ? (
          <>
            {/* SECTION 4 (SUITE) : HUILES RÉPARATRICES, SPÉCIFIQUES ET CHOIX */}
            <section className="space-y-6">
              {/* TABLEAU 2: Huiles de nutrition profonde */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F261E] flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#D97706]" />
                    <span>2. Huiles de nutrition profonde (réparation)</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Usage : Baumes &amp; Barrière Protectrice</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">Huile</th>
                        <th className="p-3.5 sm:p-4">Acides gras clés</th>
                        <th className="p-3.5 sm:p-4">Pénétration</th>
                        <th className="p-3.5 sm:p-4">Résultat recherché</th>
                        <th className="p-3.5 sm:p-4">Terrain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Rose musquée</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Oméga-3, 6, 9</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">Profonde, régénérante</td>
                        <td className="p-3.5 sm:p-4">Cicatrices, vergetures, rides, taches</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">Vata, peaux matures</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Avocat</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Acide palmitoléique</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">Profonde, nourrissante</td>
                        <td className="p-3.5 sm:p-4">Peaux sèches, sensibles, matures</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">Vata</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Sésame</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Acide linoléique, vitamine E</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">Profonde, protectrice</td>
                        <td className="p-3.5 sm:p-4">Massages ayurvédiques, réchauffant</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">Vata</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Amande douce</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Oméga-9, vitamine E</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">Profonde, émolliente</td>
                        <td className="p-3.5 sm:p-4">Peaux sèches, irritées, bébés</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">Tous terrains</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Ricin</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Acide ricinoléique</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">Profonde, mais visqueuse</td>
                        <td className="p-3.5 sm:p-4">Cheveux, cils, ongles, peau très sèche</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">Vata</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLEAU 3: Huiles à action spécifique */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F261E] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    <span>3. Huiles à action spécifique</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Usage : Remèdes Ciblés</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">Huile</th>
                        <th className="p-3.5 sm:p-4">Action principale</th>
                        <th className="p-3.5 sm:p-4">Usage &amp; Indications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Calophylle (Inophyle)</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Anti-inflammatoire puissante, circulatoire veineuse</td>
                        <td className="p-3.5 sm:p-4">Derme profond, jambes lourdes, articulations sensibles</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Macadamia</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Pénétration dermique et restructuration cellulaire</td>
                        <td className="p-3.5 sm:p-4">Massages tonifiants, soins peaux matures et déshydratées</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Noisette</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Astringente, pénétrante, équilibrante</td>
                        <td className="p-3.5 sm:p-4">Peaux grasses, comédons, rougeurs diffuses et couperose</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#0F261E]">Millepertuis (macérat)</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Réparatrice nerveuse, anti-inflammatoire (hyperforine)</td>
                        <td className="p-3.5 sm:p-4">Peaux irritées, brûlures superficielles, douleurs nerveuses (photosensibilisant)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sous-section: Comment choisir son huile vectrice */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F261E]">
                  Comment choisir son huile vectrice en pratique
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                  Le choix de l'huile pour un remède topique dépend de <strong className="font-semibold text-[#0F261E]">trois critères clés</strong> :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C3F34] text-white text-xs font-bold">1</span>
                    <h4 className="font-bold text-[#0F261E] text-sm">Le terrain de la personne</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Une peau Pitta (chaude, réactive) préférera des huiles légères et rafraîchissantes (jojoba, pépins de raisin). Une peau Vata (sèche, fine) aura besoin d'huiles nourrissantes et profondes (sésame, avocat, rose musquée).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C3F34] text-white text-xs font-bold">2</span>
                    <h4 className="font-bold text-[#0F261E] text-sm">Le résultat recherché</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pour une pénétration rapide d'actifs, choisissez des huiles fines (jojoba, argan, pépins de raisin). Pour une réparation profonde et un effet pansement, privilégiez des huiles riches (rose musquée, avocat, sésame).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C3F34] text-white text-xs font-bold">3</span>
                    <h4 className="font-bold text-[#0F261E] text-sm">La synergie avec les actifs</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Certaines huiles potentialisent des actifs spécifiques. L'huile de coco et l'huile de soja sont documentées comme <em>enhancers de perméation</em> pour les actifs transdermiques lipophiles.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: L'ALCOOL : POUR LES RÉSINES ET LES ALCALOÏDES */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">5</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
                  L'Alcool : Pour les résines et les alcaloïdes
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                <p>
                  L'alcool permet d'extraire une gamme plus large d'actifs, notamment les <strong className="font-semibold text-[#0F261E]">résines</strong>, les <strong className="font-semibold text-[#0F261E]">alcaloïdes</strong> et certains <strong className="font-semibold text-[#0F261E]">glycosides</strong> que l'eau ne peut pas dissoudre. C'est la base de ce qu'on appelle traditionnellement les <strong className="font-semibold text-[#0F261E]">teintures mères</strong>.
                </p>
              </div>

              {/* HISTOIRE DE TU YOUYOU */}
              <div 
                className="p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/10"
                style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
              >
                <FlaskConical className="absolute top-[-30px] right-[-30px] w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Leçon de Pharmacognosie &amp; Prix Nobel</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Le solvant de Tu Youyou : l'éther éthylique
                  </h3>

                  <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
                    Tu Youyou n'a pas utilisé l'alcool éthylique pour extraire l'artémisinine. Elle a utilisé <strong className="font-semibold text-white">l'éther éthylique</strong> — un solvant dont le point d'ébullition est de <strong className="font-semibold text-white">35°C</strong>, contre 78°C pour l'éthanol et 100°C pour l'eau.
                  </p>

                  <div className="space-y-2 pt-2 text-sm sm:text-base text-white/85">
                    <p className="font-semibold text-[#D97706]">Pourquoi ce choix fondamental ?</p>
                    <ul className="space-y-2 list-disc pl-5 font-light">
                      <li>
                        Parce que l'artémisinine est <strong className="font-semibold text-white">hautement thermolabile</strong> : toute température élevée détruit son pont endoperoxyde, responsable de son efficacité biologique.
                      </li>
                      <li>
                        En s'inspirant d'un manuel chinois du IVe siècle (Ge Hong préconisait de presser la plante dans de l'eau fraîche plutôt que de la faire bouillir), elle a compris que la chaleur brisait le remède.
                      </li>
                      <li>
                        En abaissant la température d'extraction à 35°C grâce à un solvant à bas point d'ébullition, elle a extrait la molécule intacte — une découverte qui lui a valu le <strong className="font-semibold text-white">Prix Nobel de physiologie ou médecine en 2015</strong>.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-white/95 mt-4">
                    <strong className="text-[#D97706]">La leçon Bloom pour l'extraction moderne :</strong> la température est tout aussi déterminante que le solvant. Le BloomLab® permet de réguler l'extraction à 35–45°C avec des solvants nobles et biocompatibles (eau purifiée, huile vierge, alcool bio), évitant la dégradation thermique sans recourir à des solvants chimiques toxiques.
                  </div>
                </div>
              </div>

              {/* Tableau des titres alcooliques */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0F261E]">
                  Les différents titres alcooliques selon la matière végétale
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">Titre alcoolique</th>
                        <th className="p-3.5 sm:p-4">Matière végétale ciblée</th>
                        <th className="p-3.5 sm:p-4">Molécules extraites</th>
                        <th className="p-3.5 sm:p-4">Exemples de plantes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#D97706]">Alcool 40°–45°</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#0F261E]">Fleurs délicates, feuilles fraîches, aromates</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Flavonoïdes, acides phénoliques, composés aromatiques volatils</td>
                        <td className="p-3.5 sm:p-4 italic">Mélisse, Menthe poivrée, Passiflore</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#D97706]">Alcool 55°–60°</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#0F261E]">Racines, écorces, sommités denses</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Alcaloïdes, hétérosides amers, tanins complexes</td>
                        <td className="p-3.5 sm:p-4 italic">Gentiane, Salsepareille, Angélique</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#D97706]">Alcool 70°–85°</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#0F261E]">Résines dures, gommes, graines dures, propolis</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">Résines triterpéniques, acides boswelliques, huiles essentielles denses</td>
                        <td className="p-3.5 sm:p-4 italic">Boswellia (Encens), Myrrhe, Clou de girofle</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: SOLVANTS ALTERNATIFS POUR TOUTE LA FAMILLE */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">6</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
                  Solvants alternatifs : Pour toute la famille
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* GLYCÉRINE VÉGÉTALE */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                      <Feather className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F261E] text-lg">La Glycérine végétale</h3>
                      <span className="text-xs text-slate-500 font-mono">Macérats hydro-glycérinés</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                    D'origine 100% végétale (colza, lin ou coco), la glycérine offre une saveur naturellement sucrée sans élever la glycémie et sans trace d'alcool.
                  </p>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong className="text-[#0F261E]">Pour qui ?</strong> Enfants, femmes enceintes (selon avis médical), personnes sensibles ou sevrées d'alcool.</li>
                    <li><strong className="text-[#0F261E]">Cibles idéales :</strong> Bourgeons frais (gemmothérapie), mucilages, tanins doux et flavonoïdes.</li>
                    <li><strong className="text-[#0F261E]">Usage BloomLab :</strong> Chauffage doux à 40°C pour fluidifier sa viscosité naturelle sans caramélisation.</li>
                  </ul>
                </div>

                {/* VINAIGRE DE CIDRE & OXYMELS */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F261E] text-lg">Le Vinaigre de cidre bio</h3>
                      <span className="text-xs text-slate-500 font-mono">Vinaigres médicinaux &amp; Oxymels</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                    Un solvant acide vivant (acide acétique, pH ~3) issu de la fermentation de pommes biologiques non pasteurisées.
                  </p>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong className="text-[#0F261E]">Affinité minérale :</strong> Solubilise les minéraux (calcium, magnésium, fer) et convertit les alcaloïdes en sels solubles digestibles.</li>
                    <li><strong className="text-[#0F261E]">L'Oxymel traditionnel :</strong> Synergie ancestrale de vinaigre de cidre et de miel brut, souveraine pour la sphère respiratoire et la digestion.</li>
                    <li><strong className="text-[#0F261E]">Usage BloomLab :</strong> Température modérée à 35–40°C pour préserver la "mère" de vinaigre et les enzymes actives.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: TABLEAU DE SYNTHÈSE COMPARATIF */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">7</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
                  Tableau de Synthèse : Les 5 Solvants d'Extraction Bloom
                </h2>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-[#E7DFD3] bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1C3F34] text-white font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-4 sm:p-5">Solvant</th>
                      <th className="p-4 sm:p-5">Polarité</th>
                      <th className="p-4 sm:p-5">Actifs extraits</th>
                      <th className="p-4 sm:p-5">Température BloomLab</th>
                      <th className="p-4 sm:p-5">Rôle &amp; Voie d'action</th>
                      <th className="p-4 sm:p-5">Conservation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                        Eau de source
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">Très polaire</td>
                      <td className="p-4 sm:p-5 text-slate-600">Minéraux, mucilages, tanins, polysaccharides</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#D97706]">42–45°C à 70–75°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">Voie orale immédiate, hydratation cellulaire</td>
                      <td className="p-4 sm:p-5 text-slate-500">24–48h au frais</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        Huile végétale
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">Apopolaire (lipophile)</td>
                      <td className="p-4 sm:p-5 text-slate-600">Huiles essentielles, caroténoïdes, résines</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#D97706]">45–50°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">Vecteur transdermique (derme profond), baumes</td>
                      <td className="p-4 sm:p-5 text-slate-500">6–12 mois à l'abri de l'air</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                        Alcool bio (45–70°)
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">Intermédiaire (bipolaire)</td>
                      <td className="p-4 sm:p-5 text-slate-600">Alcaloïdes, résines, principes amers</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#D97706]">38–42°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">Absorption sublinguale / sanguine ultra-rapide</td>
                      <td className="p-4 sm:p-5 text-slate-500">Plusieurs années</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                        Glycérine végétale
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">Polaire douce</td>
                      <td className="p-4 sm:p-5 text-slate-600">Flavonoïdes, bourgeons, tanins</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#D97706]">40°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">Alternative sans alcool, muqueuses, gemmothérapie</td>
                      <td className="p-4 sm:p-5 text-slate-500">1 à 2 ans</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0F261E] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                        Vinaigre de cidre
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">Acide polaire</td>
                      <td className="p-4 sm:p-5 text-slate-600">Minéraux, oligo-éléments, acétates d'alcaloïdes</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#D97706]">35–40°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">Reminéralisation, digestion, oxymels</td>
                      <td className="p-4 sm:p-5 text-slate-500">1 an</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: LE SÉQUENÇAGE ACTIF A/B */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C3F34] text-white font-bold text-sm shrink-0">8</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F261E]">
                  Le Séquençage Actif A/B de BloomLab : La Révolution du Double Solvant
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                <p>
                  Pourquoi se limiter à un seul solvant quand la plante possède deux dimensions ?
                </p>
                <p>
                  Une approche monofactorielle perd toujours la moitié du potentiel végétal : l'eau extrait les minéraux mais détruit les terpènes et ignore les résines ; l'huile extrait les principes liposolubles mais laisse de côté les mucilages et polysaccharides protecteurs.
                </p>
                <p>
                  Le <strong className="font-semibold text-[#0F261E]">Séquençage Actif A/B</strong> breveté par BloomLab résout ce paradoxe :
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider font-mono">
                    Phase A — Hydrosoluble (70–75°C)
                  </span>
                  <h4 className="font-bold text-[#0F261E] text-base">Extraction de la matrice aqueuse</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Libération des minéraux, oligo-éléments, polysaccharides et flavonoïdes polaires dans une eau purifiée neutre.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wider font-mono">
                    Phase B — Liposoluble (45–50°C)
                  </span>
                  <h4 className="font-bold text-[#0F261E] text-base">Extraction du complexe lipophile</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Capture douce des terpènes aromatiques, résines, cires et pigments dans une huile vierge protectrice ou un alcool doux.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D97706]/20 space-y-3">
                <h4 className="font-extrabold text-[#0F261E] text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D97706]" />
                  <span>L'union des deux phases : Le Totum Retrouvé</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                  En combinant les phases A et B au moment optimal, vous obtenez un remède qui respecte l'intégralité du profil phytochimique de la plante. Aucun déchet inutile, aucune dénaturation par surchauffe, une synergie maximale.
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#D97706]">
                  « Votre corps n'est pas cassé. Il est verrouillé. Donnez-lui les bons vecteurs pour libérer sa pharmacie intérieure. »
                </p>
              </div>
            </section>

            {/* SECTION 9: CADRE ÉTHIQUE & SÉCURITÉ */}
            <section className="space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Engagement Qualité &amp; Prudence Légale</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Les remèdes et techniques d'extraction présentés sur Bloom Académie ont une vocation exclusivement pédagogique et éducative. Ils visent à soutenir l'homéostasie et le terrain biologique naturel. Ils ne constituent pas un diagnostic médical, ne remplacent en aucun cas la consultation d'un médecin ou d'un pharmacien, et n'invitent jamais à modifier ou interrompre un traitement médical en cours.
                </p>
              </div>
            </section>

            {/* INTERACTION ALMA */}
            <section className="pt-2">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE] border border-[#D8CBB7] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C3F34]">
                    <MessageSquare className="w-4 h-4 text-[#D97706]" />
                    <span>Une hésitation sur votre solvant ?</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    Interrogez ALMA, l'assistante de Bloom
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                    Partagez les signaux de votre terrain. ALMA vous guidera pas à pas pour déterminer le profil systémique et le vecteur idéal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('chat') : window.location.assign('/chat')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C3F34] hover:bg-[#142d25] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <span>Échanger avec ALMA</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706]" />
                </button>
              </div>
            </section>

            {/* CTA BOUTIQUE BLOOMLAB */}
            <section className="pt-4">
              <div 
                className="p-8 sm:p-12 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
                style={{ backgroundColor: '#0F261E', color: '#ffffff' }}
              >
                <div className="space-y-3 max-w-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                    L'Instrument du Totum
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Maîtrisez la température et le solvant chez vous.
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 font-light">
                    Le BloomLab® vous permet d'extraire à 35°C, 45°C ou 70°C avec une précision absolue de ±1°C dans un verre borosilicate 3.3 inerte.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D97706] hover:bg-[#b46304] text-white font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Découvrir la BloomLab® en boutique</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="space-y-8 pt-4">
            {/* Aperçu flouté pour donner envie de poursuivre */}
            <div className="relative select-none pointer-events-none filter blur-[3px] opacity-40 overflow-hidden rounded-3xl border border-[#E7DFD3] bg-white p-6 sm:p-8 space-y-6" aria-hidden="true">
              <div className="flex items-center justify-between border-b border-[#E7DFD3] pb-3">
                <span className="font-bold text-[#0F261E]">2. Huiles de nutrition profonde (réparation)</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-mono font-bold">Rose musquée, Avocat, Sésame...</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E7DFD3] pb-3">
                <span className="font-bold text-[#0F261E]">3. Huiles à action spécifique &amp; Derme profond</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold">Calophylle, Macadamia, Millepertuis...</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E7DFD3] pb-3">
                <span className="font-bold text-[#0F261E]">5. L'Alcool &amp; Le secret de Tu Youyou (Nobel 2015)</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-xs font-mono font-bold">Extraction à 35°C &amp; Titres 40°–85°</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F261E]">6. Solvants alternatifs &amp; Tableau comparatif intégral</span>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-mono font-bold">Glycérine, Vinaigre de cidre, Séquençage A/B</span>
              </div>
            </div>

            {/* Carte Premium Gate */}
            <div className="p-8 sm:p-12 rounded-[36px] bg-[#0F261E] text-white border-2 border-[#D97706] shadow-2xl relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D97706]/20 text-[#D97706] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Contenu Réservé aux Abonnés Bloom
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Débloquez l'intégralité du Guide des Solvants &amp; Vecteurs d'Actifs
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                La première partie sur l'eau et les huiles de pénétration rapide est offerte. Rejoignez l'abonnement Bloom pour débloquer l'accès complet aux répertoires des huiles réparatrices, aux secrets d'extraction à 35°C de Tu Youyou, aux solvants sans alcool et au tableau de synthèse comparatif complet.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left mb-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Huiles réparatrices profondes &amp; huiles spécifiques</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Extraction alcoolique &amp; découverte de Tu Youyou (Nobel)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Glycérine végétale, Vinaigres médicinaux &amp; Oxymels</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Tableau comparatif des 5 solvants &amp; Séquençage A/B</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('abonnement') : window.location.assign('/abonnement')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D97706] hover:bg-[#b46304] text-white font-black text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>Rejoindre l'abonnement (59 €/mois)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onRequireAuth) {
                      onRequireAuth();
                    } else if (onNavigate) {
                      onNavigate('account');
                    } else {
                      window.location.assign('/account');
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
                >
                  J'ai déjà un compte
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </article>
  );
};


