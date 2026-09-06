import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Cpu, 
  Flame, 
  Droplets, 
  Wind, 
  FlaskConical, 
  BookOpen, 
  ArrowRight,
  Layers,
  HeartPulse,
  CheckCircle2
} from 'lucide-react';
import { Language } from './translations';

interface ManifesteContentProps {
  onBack: () => void;
  onNavigate?: (view: any, id?: any) => void;
  lang: Language;
}

export default function ManifesteContent({ onBack, onNavigate, lang }: ManifesteContentProps) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const navigate = (view: string, id?: string) => {
    if (onNavigate) {
      onNavigate(view, id);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F261E]">
      {/* Navigation Sticky */}
      <div className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7DFD3]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0F261E]/60 hover:text-[#0F261E] transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isFR ? 'Retour' : isDE ? 'Zurück' : 'Back'}
          </button>
          <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D97706]">
            {isFR ? 'Manifeste Fondateur' : isDE ? 'Gründungsmanifest' : 'Founding Manifesto'}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 text-[#D97706] text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {isFR ? 'La Troisième Voie de la préparation botanique' : isDE ? 'Der Dritte Weg der botanischen Zubereitung' : 'The Third Way of botanical preparation'}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F261E] mb-6 leading-[1.15] tracking-tight">
            {isFR 
              ? "Bloom by BotaniK : la Troisième Voie de la préparation botanique" 
              : isDE
              ? "Bloom by BotaniK: der Dritte Weg der botanischen Zubereitung"
              : "Bloom by BotaniK: The Third Way of Botanical Preparation"}
          </h1>

          <div className="max-w-3xl mx-auto space-y-3 pt-2">
            <p className="text-lg sm:text-xl md:text-2xl text-[#D97706] font-bold leading-snug">
              {isFR 
                ? "La rigueur de votre extraction détermine la réponse de votre terrain." 
                : isDE
                ? "Die Strenge Ihrer Extraktion bestimmt die Antwort Ihres biologischen Terrains."
                : "The rigor of your extraction determines the response of your terrain."}
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {isFR 
                ? "Le corps humain et le végétal partagent la même logique : celle de la complexité. Pour que le Totum d'une plante puisse dialoguer avec votre biologie, il ne suffit pas de la faire infuser. Il faut la révéler avec précision." 
                : isDE
                ? "Der menschliche Körper und die Pflanze teilen die gleiche Logik: die der Komplexität. Damit das Totum einer Pflanze mit Ihrer Biologie in Dialog treten kann, reicht ein einfacher Aufguss nicht aus. Es muss präzise aufgeschlossen werden."
                : "The human body and the plant world share the same logic: complexity. For a plant's Totum to communicate with your biology, simple infusion is not enough. It must be revealed with precision."}
            </p>
          </div>
        </motion.header>

        {/* Content Body */}
        <div className="space-y-10 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
          {isFR ? (
            <>
              {/* 1. Le Postulat Fondateur */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#D97706]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    1. Le Postulat Fondateur : Écouter le Signal, Éteindre le Bruit
                  </h2>
                </div>
                <p>
                  Dans notre société hyper-accélérée, chaque signal envoyé par notre organisme — fatigue persistante, lourdeur digestive, brouillard mental, tensions — est immédiatement perçu comme une avarie. Une panne qu'il faudrait faire taire au plus vite.
                </p>
                <p>
                  Chez <strong>Bloom by BotaniK</strong>, nous refusons cette vision mécanique.
                </p>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D97706] text-[#0F261E] font-medium">
                  « Le corps ne vous trahit jamais. Il vous informe. »
                </div>
                <p>
                  Ce que l'on nomme hâtivement un « inconfort » est souvent la réponse adaptative la plus intelligente de votre biologie pour maintenir son équilibre face à une charge allostatique devenue trop lourde. Nous ne cherchons pas à faire taire le signal. Nous cherchons à comprendre le terrain qui l'émet.
                </p>
              </section>

              {/* 2. Le Premier Problème */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#1C3F34]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    2. Le Premier Problème : Vous avez des plantes, mais les connaissez-vous vraiment ?
                  </h2>
                </div>
                <p>
                  Une feuille n'est pas une racine. Une fleur n'est pas une graine. Chaque partie d'une plante contient des composés différents, avec des propriétés, des précautions et des méthodes d'extraction spécifiques.
                </p>
                <ul className="space-y-2 pl-4 border-l-2 border-[#E7DFD3] text-slate-700">
                  <li>• Le romarin en infusion n'apporte pas les mêmes composés que le romarin en huile infusée.</li>
                  <li>• L'ortie en tisane ne se prépare pas comme l'ortie en teinture.</li>
                  <li>• Et certaines plantes, mal préparées ou mal dosées, peuvent présenter des risques.</li>
                </ul>
                <p className="font-semibold text-[#0F261E]">
                  Le premier problème n'est pas l'outil. C'est le manque de connaissance.
                </p>
                <p>
                  C'est pourquoi Bloom by BotaniK a construit un <strong>Herbier Scientifique</strong> : chaque plante y est documentée avec ses parties utilisables, ses actifs clés, sa polarité (hydrosoluble ou liposoluble), ses synergies et ses précautions. Avant d'extraire, il faut comprendre.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('herbier')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1C3F34] hover:text-[#D97706] hover:underline cursor-pointer"
                  >
                    <span>Consulter l'Herbier Scientifique</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* 3. Le Deuxième Problème */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#D97706]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    3. Le Deuxième Problème : Les Méthodes Traditionnelles Sous-Exploitent la Puissance de Vos Plantes
                  </h2>
                </div>
                <p>
                  Une fois que vous savez quoi faire, encore faut-il pouvoir le faire correctement. L'herboristerie traditionnelle détient des millénaires d'observations empiriques inestimables. Cependant, nos méthodes de préparation domestique sont restées figées.
                </p>

                <div className="space-y-3">
                  <div className="text-sm font-black text-[#0F261E] uppercase tracking-wider">
                    Les 3 barrières invisibles des méthodes traditionnelles :
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Barrière 1 */}
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#0F261E]">
                        <Flame className="w-5 h-5 text-amber-600" />
                        <span>1. Le Choc Thermique</span>
                      </div>
                      <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">(La destruction)</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        L'eau bouillante (100°C) soumet les composés les plus précieux (enzymes, monoterpènes, flavonoïdes délicats) à une dénaturation brutale. La chaleur non maîtrisée dégrade l'intelligence chimique de la plante.
                      </p>
                    </div>

                    {/* Barrière 2 */}
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#0F261E]">
                        <Droplets className="w-5 h-5 text-sky-600" />
                        <span>2. La Barrière de Polarité</span>
                      </div>
                      <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">(L'oubli)</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        L'eau seule est incapable de dissoudre les résines, les huiles essentielles et les principes liposolubles. En faisant une simple tisane, vous ignorez jusqu'à la moitié de la matrice végétale.
                      </p>
                    </div>

                    {/* Barrière 3 */}
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[#0F261E]">
                        <Wind className="w-5 h-5 text-teal-600" />
                        <span>3. L'Oxydation</span>
                      </div>
                      <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">(La dégradation)</div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Les macérations à l'air libre exposent les extraits à la lumière et à l'oxygène, dégradant les antioxydants et altérant la pureté de votre préparation jour après jour.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-center font-bold text-[#0F261E]">
                  Le problème n'est pas la plante. C'est l'outil qui ne sait pas la révéler.
                </div>
              </section>

              {/* 4. La Solution BloomLab */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#1C3F34]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    4. La Solution BloomLab : La Fin de l'Improvisation. Le Début de la Précision.
                  </h2>
                </div>
                <p>
                  L'héritage des sagesses anciennes — Médecine Traditionnelle Chinoise, Ayurveda, traditions chamaniques — a compris une vérité fondamentale : la plante n'est pas une molécule, c'est un écosystème. Les phytochimistes modernes l'ont redécouvert sous le nom de <strong>Totum végétal</strong> : la synergie complexe des actifs hydrosolubles et liposolubles.
                </p>
                <p>
                  <strong>BloomLab</strong> a été conçu pour faire sauter les 3 verrous des méthodes traditionnelles. Notre extracteur de précision orchestre des cycles thermiques au demi-degré près et permet l'<strong>extraction séquentielle A/B</strong> :
                </p>

                {/* Tableau Séquentiel A/B */}
                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-[#E7DFD3] text-[#0F261E]">
                        <th className="py-3 px-4 font-black uppercase tracking-wider">Phase</th>
                        <th className="py-3 px-4 font-black uppercase tracking-wider">Solvant</th>
                        <th className="py-3 px-4 font-black uppercase tracking-wider">Température</th>
                        <th className="py-3 px-4 font-black uppercase tracking-wider">Cible</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3]">
                      <tr className="hover:bg-[#FAF7F2]/50">
                        <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Phase A</td>
                        <td className="py-3.5 px-4 font-medium">Eau / Glycérine</td>
                        <td className="py-3.5 px-4 text-slate-600">40°C à 80°C (selon matrice)</td>
                        <td className="py-3.5 px-4 text-slate-700">Composés hydrosolubles & minéraux</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/50">
                        <td className="py-3.5 px-4 font-bold text-[#D97706]">Phase B</td>
                        <td className="py-3.5 px-4 font-medium">Alcool / Huile</td>
                        <td className="py-3.5 px-4 text-slate-600">40°C à 50°C</td>
                        <td className="py-3.5 px-4 text-slate-700">Composés liposolubles, résines & volatils</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  En maîtrisant les paramètres critiques — temps, température, agitation — vous ne vous contentez pas de préparer une plante. Vous capturez son intelligence chimique intacte. Vous ne faites plus une simple infusion. Vous réalisez une extraction botanique documentée, d'une richesse et d'une régularité inégalées.
                </p>
              </section>

              {/* 5. Ce Que Vous Extrayez */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#D97706]">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    5. Ce Que Vous Extrayez Détermine Ce Que Votre Corps Reçoit
                  </h2>
                </div>
                <p>
                  Une plante mal préparée est une ressource perdue. Si l'extraction est approximative, les composés les plus précieux du Totum végétal n'atteindront jamais leur cible. En maîtrisant le geste d'extraction avec BloomLab, vous ne faites pas qu'obtenir un meilleur liquide : vous offrez à votre organisme les conditions exactes dont il a besoin pour soutenir son propre équilibre.
                </p>
                <p>
                  Une méthode approximative appauvrit le vivant ; une extraction de précision, guidée par BloomLab, offre à votre organisme des matières premières pures, complètes et documentées. Ne subissez plus l'improvisation. Devenez l'artisan de la qualité que vous ingérez.
                </p>
              </section>

              {/* 6. Les Protocoles Systémiques */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#1C3F34]">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    6. Les Protocoles Systémiques Bloom : L'Ingénierie du Terrain Biologique
                  </h2>
                </div>
                <p>
                  Retrouver son équilibre ne se fait pas par hasard. Notre approche des Protocoles Systémiques s'articule autour d'une logique de soutien biologique, inspirée des sagesses anciennes et structurée par la biochimie moderne.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                    <div className="text-xs font-black uppercase tracking-wider text-[#1C3F34]">Phase 0</div>
                    <div className="font-bold text-[#0F261E]">L'Ouverture des Émonctoires</div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Accompagner les voies d'élimination physiologiques (foie, reins, intestins, peau) pour alléger la charge de l'organisme avant toute mobilisation profonde.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                    <div className="text-xs font-black uppercase tracking-wider text-[#1C3F34]">Phase 1</div>
                    <div className="font-bold text-[#0F261E]">La Capture et la Purification</div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Utiliser la force adsorbante des argiles (montmorillonite, zéolithe) pour capter les perturbateurs environnementaux et soutenir la clarté du terrain.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                    <div className="text-xs font-black uppercase tracking-wider text-[#D97706]">Phase 2</div>
                    <div className="font-bold text-[#0F261E]">La Modulation et l'Apaisement</div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Soutenir les réactions de défense de l'organisme grâce à la synergie des polyphénols et des extraits de racines, respectant l'intégrité de la barrière intestinale.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                    <div className="text-xs font-black uppercase tracking-wider text-[#D97706]">Phase 3</div>
                    <div className="font-bold text-[#0F261E]">La Consolidation et la Vitalité</div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Nourrir le microbiome, soutenir la production d'énergie mitochondrique et offrir au corps les cofacteurs nécessaires pour qu'il retrouve sa propre capacité d'auto-régulation.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Engagement d'Éthique, de Transparence et de Rigueur */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] flex items-center justify-center text-[#D97706]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    7. Engagement d'Éthique, de Transparence et de Rigueur
                  </h2>
                </div>
                <p>
                  Bloom by BotaniK n'est pas un cabinet médical. Nous ne délivrons pas de diagnostics et nous ne remplaçons pas la médecine d'urgence, dont nous reconnaissons l'excellence pour les crises aiguës.
                </p>
                <p>
                  Notre combat est ailleurs. Nous combattons l'obsolescence du geste, l'opacité des compositions industrielles et la dépendance à des solutions standardisées.
                </p>

                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-3">
                  <div className="text-xs font-black uppercase tracking-widest text-[#0F261E]">Notre serment :</div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Identifier clairement les plantes utilisées et leur provenance.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Privilégier un sourcing éthique et certifié biologique.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Documenter les méthodes avec précision et transparence.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Utiliser des matériaux inertes (inox 304, absence de solvants pétrochimiques).</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Distinguer les faits, les usages traditionnels et les hypothèses.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3F34] shrink-0 mt-0.5" />
                      <span>Reconnaître les limites de ce que nous savons.</span>
                    </div>
                  </div>
                </div>

                <p>
                  Nous mettons entre vos mains la connaissance, la technologie de précision et les matières premières les plus pures pour vous redonner une souveraineté authentique sur votre pratique botanique.
                </p>
              </section>

              {/* Le Pont Final (Conclusion) */}
              <section className="p-8 sm:p-12 bg-[#0F261E] text-white rounded-3xl shadow-xl space-y-4 text-center">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706]">
                  Le Pont Final
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                  Les sagesses anciennes avaient la connaissance.<br className="hidden sm:inline" /> Nous leur apportons l'instrument.
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  Bloom by BotaniK se tient à cette jonction : entre l'intuition ancienne et la rigueur moderne, entre la simplicité du végétal et la complexité du vivant, entre l'autonomie et la précision.
                </p>
                <p className="text-white/90 font-medium max-w-2xl mx-auto text-sm sm:text-base leading-relaxed pt-2">
                  Notre mission n'est pas de remplacer la médecine. Notre mission est de redonner aux systèmes biologiques humains les conditions de leur propre intelligence.
                </p>
              </section>
            </>
          ) : isDE ? (
            <>
              {/* DE Translation */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#D97706]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    1. Das Grundpostulat: Dem Signal lauschen, den Lärm abschalten
                  </h2>
                </div>
                <p>
                  In unserer beschleunigten Gesellschaft wird jedes Signal unseres Körpers — anhaltende Müdigkeit, schwere Verdauung, mentale Trübheit, Spannungen — sofort als Panne interpretiert, die möglichst schnell zum Schweigen gebracht werden muss.
                </p>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D97706] text-[#0F261E] font-medium">
                  « Ihr Körper betrügt Sie nicht. Er informiert Sie. »
                </div>
                <p>
                  Wir suchen nicht danach, das Signal stummzuschalten. Wir suchen danach, das biologische Terrain zu verstehen, das es aussendet.
                </p>
              </section>

              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#1C3F34]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    2. Das erste Problem: Kennen Sie Ihre Pflanzen wirklich?
                  </h2>
                </div>
                <p>
                  Ein Blatt ist keine Wurzel. Eine Blüte ist kein Samen. Jeder Teil enthält unterschiedliche Wirkstoffe mit spezifischen Extraktionsmethoden. Deshalb hat Bloom by BotaniK ein wissenschaftliches Herbarium aufgebaut.
                </p>
              </section>

              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#D97706]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    3. Die BloomLab-Lösung: Sequentielle A/B-Extraktion
                  </h2>
                </div>
                <p>
                  BloomLab schützt das pflanzliche Totum durch thermische Präzisionszyklen und sequenzierte Extraktion (Phase A wässrig, Phase B fettlöslich/alkoholisch).
                </p>
              </section>
            </>
          ) : (
            <>
              {/* EN Translation */}
              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#D97706]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    1. The Founding Postulate: Listening to the Signal, Silencing the Noise
                  </h2>
                </div>
                <p>
                  In our hyper-accelerated society, every signal sent by our organism — persistent fatigue, sluggish digestion, brain fog, tension — is immediately perceived as a malfunction to be suppressed.
                </p>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#D97706] text-[#0F261E] font-medium">
                  “Your body never betrays you. It informs you.”
                </div>
                <p>
                  We do not seek to silence the signal. We seek to understand the biological terrain that emits it.
                </p>
              </section>

              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#1C3F34]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    2. The First Problem: You have plants, but do you truly know them?
                  </h2>
                </div>
                <p>
                  A leaf is not a root. A flower is not a seed. Each plant part holds different compounds with specific polarities and precautions. This is why Bloom by BotaniK built a Scientific Herbarium.
                </p>
              </section>

              <section className="p-8 sm:p-10 bg-white rounded-3xl border border-[#E7DFD3] shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#D97706]" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F261E]">
                    3. The BloomLab Solution: Sequential A/B Extraction
                  </h2>
                </div>
                <p>
                  BloomLab unlocks the vegetal Totum through ±0.5°C thermal precision cycles and dual A/B sequential extraction (water/glycerin Phase A, alcohol/oil Phase B).
                </p>
              </section>
            </>
          )}
        </div>

        {/* 🎯 CTA de Fin de Manifeste */}
        <section className="mt-14 pt-10 border-t border-[#E7DFD3]">
          <div className="text-center space-y-3 mb-8">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-[#D97706]">
              {isFR ? "Passer à l'Action" : isDE ? "Jetzt Handeln" : "Take Action"}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F261E]">
              {isFR ? "Trois façons d'entrer dans la démarche Bloom" : isDE ? "Drei Wege in den Bloom-Ansatz" : "Three ways to begin your Bloom journey"}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* CTA 1 : Découvrir BloomLab */}
            <button 
              onClick={() => navigate('product-detail', 'bloomlab')}
              className="w-full sm:w-auto px-7 py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-full font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#D97706]" />
              <span>{isFR ? 'Découvrir BloomLab' : isDE ? 'BloomLab entdecken' : 'Discover BloomLab'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* CTA 2 : Explorer l'Herbier Scientifique */}
            <button 
              onClick={() => navigate('herbier')}
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F3EEE6] active:bg-[#E7DFD3] text-[#0F261E] border border-[#0F261E]/30 hover:border-[#0F261E] rounded-full font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#1C3F34]" />
              <span>{isFR ? "Explorer l'Herbier Scientifique" : isDE ? 'Wissenschaftliches Herbarium' : 'Explore Scientific Herbarium'}</span>
            </button>

            {/* CTA 3 : Commencer mon parcours */}
            <button 
              onClick={() => navigate('phytotherapie-reset')}
              className="w-full sm:w-auto px-7 py-4 bg-[#1C3F34] hover:bg-[#0F261E] active:bg-black text-white rounded-full font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartPulse className="w-4 h-4 text-[#D97706]" />
              <span>{isFR ? 'Commencer mon parcours' : isDE ? 'Meinen Weg beginnen' : 'Begin my journey'}</span>
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}
