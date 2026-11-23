
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

const getTr = (lang: string) => (fr: string, en: string, de: string) =>
  lang === 'de' ? de : lang === 'fr' ? fr : en;

export const InfusionPrecision = ({ lang, t, onNavigate }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';
  const tr = getTr(lang);

  useEffect(() => {
    const pageTitle = tr(
      "L'Infusion de Précision : Maîtriser le Temps et la Température | Bloom by BotaniK",
      'Precision Botanical Infusion: Mastering Time and Temperature | Bloom by BotaniK',
      'Präzisionsaufguss: Zeit und Temperatur meistern | Bloom by BotaniK'
    );
    document.title = pageTitle;

    const pageDesc = tr(
      "L'infusion n'est pas une approximation. Découvrez comment la science de la précision thermique transforme une simple tisane en un extrait botanique puissant.",
      'Botanical infusion is not guesswork. Discover how thermal precision transforms a simple herbal tea into a concentrated botanical extract.',
      'Ein Aufguss ist keine Schätzung. Entdecken Sie, wie thermische Präzision aus einem einfachen Kräutertee einen gehaltvollen Pflanzenextrakt macht.'
    );

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [lang, isFR, isDE]);

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#3E4A3D] pb-24 selection:bg-[#C8AB8A]/20 selection:text-[#3E4A3D]">
      {/* HEADER HERO */}
      <header className="relative bg-gradient-to-b from-[#EFEAE2] to-[#FAF7F2] border-b border-[#E7DFD3] pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Fil d'Ariane */}
          <nav aria-label={tr("Fil d'Ariane", 'Breadcrumb', 'Brotkrumennavigation')} className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <button
              onClick={() => onNavigate ? onNavigate('home') : window.location.assign('/')}
              className="hover:text-[#A8B8A0] transition-colors cursor-pointer"
            >
              {tr('Accueil', 'Home', 'Startseite')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigate ? onNavigate('academie') : window.location.assign('/academie')}
              className="hover:text-[#A8B8A0] transition-colors cursor-pointer"
            >
              {tr('Bloom Académie', 'Bloom Academy', 'Bloom Akademie')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#A8B8A0] font-semibold">{tr('Les Températures', 'Temperatures', 'Die Temperaturen')}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8B8A0]/5 border border-[#A8B8A0]/15 text-[#A8B8A0] text-[11px] font-bold uppercase tracking-wider">
            <Thermometer className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{tr('Thermodynamique Botanique & Extraction de Précision', 'Botanical Thermodynamics & Precision Extraction', 'Botanische Thermodynamik & Präzisionsextraktion')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#3E4A3D] tracking-tight leading-[1.1]">
            {tr(
              "L'Infusion de Précision : Maîtriser le Temps et la Température",
              'Precision Botanical Infusion: Mastering Time and Temperature',
              'Der Präzisionsaufguss: Zeit und Temperatur meistern'
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal max-w-3xl">
            {tr(
              "L'infusion n'est pas une approximation. Découvrez comment la science de la précision thermique transforme une simple tisane en un extrait botanique puissant.",
              'Botanical infusion is not guesswork. Discover how thermal precision transforms a simple herbal tea into a potent botanical extract.',
              'Ein Pflanzenaufguss ist keine Schätzung. Entdecken Sie, wie die Wissenschaft thermischer Präzision einen einfachen Kräutertee in einen gehaltvollen Pflanzenauszug verwandelt.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 text-xs font-mono text-slate-500 border-t border-[#E7DFD3]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C8AB8A]" />
              {tr('Lecture : 8 min', 'Read time: 8 min', 'Lesezeit: 8 Min.')}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#A8B8A0]" />
              {tr('Niveau : Guide Fondamental & Pratique', 'Level: Foundational & Practical Guide', 'Niveau: Grundlagen- & Praxisleitfaden')}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {tr('Standard Totum BloomLab®', 'BloomLab® Totum Standard', 'BloomLab® Totum-Standard')}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">

        {/* SECTION 1: POURQUOI LA PRÉCISION CHANGE TOUT ? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr('Pourquoi la précision change tout ?', 'Why does precision change everything?', 'Warum Präzision alles verändert')}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr(
                "Aujourd'hui, quand vous préparez une tisane, vous versez de l'eau bouillante sur vos plantes, vous attendez « un certain temps », et vous buvez. Vous faites ce que tout le monde fait depuis des siècles.",
                'When making an ordinary herbal tea today, you pour boiling water over dried plants, wait "some time," and drink. You do what people have done for centuries.',
                'Wenn man heute einen Kräutertee zubereitet, gießt man kochendes Wasser über die Pflanzen, wartet „eine gewisse Zeit“ und trinkt. Man macht es so wie seit Jahrhunderten.'
              )}
            </p>
            <p className="text-lg font-medium text-[#3E4A3D]">
              <strong>{tr('Mais voici ce que personne ne vous dit :', 'Here is what few people explain:', 'Doch das erklärt kaum jemand:')}</strong>{' '}
              {tr('dans cette tasse, vous ne buvez que ', 'in that cup, you only get ', 'in dieser Tasse trinken Sie oft nur ')}
              <strong className="text-[#C8AB8A]">
                {tr("l'ombre de ce que la plante avait à vous offrir", 'a fraction of what the plant actually contains', 'einen Bruchteil dessen, was die Pflanze zu bieten hat')}
              </strong>
              .
            </p>
            <p>
              {tr(
                "Les études sont formelles : la majorité des molécules actives de vos plantes sont ",
                'Phytochemical research is clear: many delicate compounds in botanicals are ',
                'Untersuchungen zeigen klar: Viele empfindliche Pflanzenstoffe werden '
              )}
              <strong className="text-[#3E4A3D]">
                {tr("détruites par l'eau bouillante", 'degraded by boiling water', 'durch kochendes Wasser zerstört')}
              </strong>{' '}
              {tr(
                "avant même d'avoir pu se libérer. Vous payez pour des plantes de qualité, vous les faites infuser avec amour — et vous perdez ",
                'before they can gently diffuse. You invest in high-quality herbs and brew them with care — yet you lose ',
                'noch bevor sie sich lösen können. Sie investieren in hochwertige Pflanzen und verlieren '
              )}
              <strong className="text-red-700 font-semibold">
                {tr("jusqu'à 80% de leur potentiel thérapeutique", 'up to 80% of their active aromatic potential', 'bis zu 80 % ihres aktiven Potenzials')}
              </strong>{' '}
              {tr("à cause d'une seule erreur : la température.", 'from a single variable: uncontrolled temperature.', 'durch einen einzigen Faktor: die Temperatur.')}
            </p>
          </div>

          {/* Citation clé */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#C8AB8A]/30 text-center sm:text-left space-y-2">
            <p className="text-lg sm:text-xl font-extrabold text-[#3E4A3D] tracking-tight">
              {tr(
                "« La différence entre une tisane et un remède, ce n'est pas la plante. C'est la méthode. »",
                '“The difference between an ordinary infusion and a rich botanical extract is not the plant. It is the method.”',
                '„Der Unterschied zwischen einem einfachen Tee und einem gehaltvollen Pflanzenauszug ist nicht die Pflanze, sondern die Methode.“'
              )}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              {tr(
                "Le geste traditionnel sans instrument détruit ce qu'il cherche à capter.",
                'Traditional guesswork without temperature control damages what it seeks to capture.',
                'Traditionelles Zubereiten ohne Kontrolle zerstört oft genau das, was es gewinnen will.'
              )}
            </p>
          </div>
        </section>

        {/* SECTION 2: TEMPÉRATURE CRITIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr(
                'Température Critique : le seuil que votre casserole ne peut pas respecter',
                'Critical Temperature: the threshold an ordinary kettle cannot maintain',
                'Kritische Temperatur: Die Schwelle, die ein Kochtopf nicht halten kann'
              )}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            {tr(
              'Savez-vous à quelle température vos plantes commencent réellement à perdre leurs actifs ?',
              'Do you know at what exact temperature herbs begin losing delicate compounds?',
              'Wissen Sie, ab welcher Temperatur Pflanzen ihre empfindlichen Stoffe verlieren?'
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-amber-700">{tr('Dès 45°C', 'From 45°C', 'Ab 45°C')}</span>
                <Thermometer className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-sm">{tr('Dégradation des composés fragiles', 'Degradation of delicate compounds', 'Abbau empfindlicher Verbindungen')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tr(
                  'Les enzymes vivantes, vitamines thermosensibles et flavonoïdes délicats subissent une dénaturation progressive.',
                  'Living enzymes, heat-sensitive vitamins and delicate flavonoids undergo progressive denaturation.',
                  'Empfindliche Enzyme, wärmesensible Vitamine und zarte Flavonoide beginnen schrittweise zu denaturieren.'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-orange-700">{tr('Dès 50°C', 'From 50°C', 'Ab 50°C')}</span>
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-sm">{tr('Inactivation anti-inflammatoire', 'Phenolic structure shifts', 'Veränderung von Phenolstrukturen')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tr(
                  'Les composés phénoliques majeurs (romarin, curcuma) perdent leur structure tridimensionnelle active.',
                  'Key phenolic structures (rosemary, turmeric) gradually lose their native spatial conformation.',
                  'Wichtige Phenolverbindungen (Rosmarin, Kurkuma) verlieren schrittweise ihre natürliche Struktur.'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-red-700">{tr('À 100°C', 'At 100°C', 'Bei 100°C')}</span>
                <Flame className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-sm">{tr('Destruction massive (casserole)', 'Severe thermal loss (kettle/pot)', 'Starker thermischer Verlust (Kochtopf)')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tr(
                  "L'ébullition détruit la majorité de la valeur thérapeutique et libère les tanins amers astringents.",
                  'Rolling boiling degrades volatile aromatics and extracts harsh, bitter astringent tannins.',
                  'Siedehitze zerstört flüchtige Aromastoffe und löst vermehrt bittere, adstringierende Gerbstoffe.'
                )}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE]/60 border border-[#D8CBB7] space-y-3">
            <h3 className="text-lg font-bold text-[#A8B8A0] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C8AB8A]" />
              <span>{tr('Avec BloomLab, vous contrôlez la température au degré près', 'With BloomLab, you control temperature to the degree', 'Mit BloomLab steuern Sie die Temperatur aufs Grad genau')}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {tr(
                'Vous pouvez extraire à 42°C, à 45°C, à 50°C — la température exacte où les actifs de votre plante sont libérés ',
                'You can extract at 42°C, 45°C, or 50°C — the exact temperature where plant compounds release ',
                'Sie extrahieren bei 42°C, 45°C oder 50°C — genau dort, wo sich Pflanzenstoffe lösen, '
              )}
              <strong className="text-[#3E4A3D] font-semibold">{tr('sans être détruits', 'without thermal destruction', 'ohne zerstört zu werden')}</strong>.{' '}
              {tr(
                "C'est la différence fondamentale entre boire une simple eau colorée et boire un vrai remède de terrain.",
                'That is the core difference between colored hot water and a calibrated botanical preparation.',
                'Das ist der entscheidende Unterschied zwischen gefärbtem Wasser und einem präzisen Pflanzenauszug.'
              )}
            </p>
          </div>
        </section>

        {/* SECTION 3: LE SECRET DES 121°C */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr(
                'Le secret des 121°C : ce que votre casserole ne fera jamais',
                'The 121°C secret: what an ordinary pot can never replicate',
                'Das 121°C-Geheimnis: Was ein normaler Topf niemals leistet'
              )}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr("La BloomLab ne se contente pas d'extraire à froid. Elle monte ", 'BloomLab does not stop at gentle extraction. It reaches ', 'Die BloomLab extrahiert nicht nur schonend warm, sondern erreicht auch ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr("jusqu'à 121°C", 'up to 121°C', 'bis zu 121°C')}</strong>
              {tr(', avec une précision absolue de ±0,5°C.', ', with ±0.5°C regulated precision.', ' mit ±0,5°C Präzision.')}
            </p>
            <p>
              <strong className="text-[#3E4A3D]">{tr('Pourquoi c’est une révolution ?', 'Why does that matter?', 'Warum ist das so entscheidend?')}</strong>{' '}
              {tr('Parce que certaines plantes ont besoin de ', 'Some botanicals require ', 'Einige Pflanzen benötigen ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('très fortes températures', 'calibrated high-heat cycles', 'präzise Hochtemperaturzyklen')}</strong>{' '}
              {tr("pour libérer leurs actifs. C'est ce qu'on appelle la ", 'to unlock dense matrices. This step is known as ', 'um gebundene Moleküle zu aktivieren. Man nennt das ')}{' '}
              <strong className="text-[#C8AB8A] font-semibold">{tr('décarboxylation', 'decarboxylation', 'Decarboxylierung')}</strong>{' '}
              {tr(
                '— un processus qui « active » les molécules en les chauffant à température rigoureusement contrôlée.',
                '— a controlled thermal transformation under strictly regulated timing.',
                '— eine kontrollierte thermische Umwandlung bei exakt geregelter Temperatur.'
              )}
            </p>
            <p>
              <strong className="text-[#3E4A3D]">{tr("Le chanvre en est l'exemple parfait.", 'Legal hemp is a textbook example.', 'Faserhanf ist das beste Beispiel.')}</strong>{' '}
              {tr(
                'Les variétés légales de chanvre (sans effet psychoactif) contiennent des composés comme le CBD sous une forme ',
                'Compliant legal hemp varieties (non-psychoactive) hold compounds in an ',
                'Zugelassene Nutzhanfsorten enthalten Verbindungen zunächst in '
              )}
              <strong className="text-slate-900">{tr('inactive (CBDA)', 'acidic precursor form (CBDA)', 'inaktiver Säureform (CBDA)')}</strong>.{' '}
              {tr('Pour qu’ils deviennent actifs, il faut les chauffer à ', 'To convert them accurately, they must be heated at ', 'Für die Umwandlung braucht es ')}{' '}
              <strong className="text-[#3E4A3D]">{tr('une température précise, pendant un temps précis', 'a precise temperature for an exact duration', 'eine exakte Temperatur über eine exakte Zeit')}</strong>.{' '}
              {tr(
                "Trop bas : rien ne s'active. Trop haut : tout est détruit. Avec une casserole, c'est impossible. Avec BloomLab, c'est ",
                'Too low: incomplete conversion. Too high: thermal degradation. Impossible on a stovetop. With BloomLab, it is ',
                'Zu niedrig: keine Umwandlung. Zu hoch: Abbau. Auf dem Herd unmöglich. Mit BloomLab ist es '
              )}
              <strong className="text-[#A8B8A0] font-semibold">{tr('une simple programmation', 'a one-touch program', 'ein einziges Programm')}</strong>.
            </p>
          </div>

          {/* Exemples de matrices nécessitant la chauffe */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="font-bold text-[#3E4A3D] text-base sm:text-lg">
              {tr(
                "Et le chanvre n'est pas seul : de nombreuses plantes nécessitent ces hautes températures",
                'And hemp is not alone: many dense botanicals require calibrated heat',
                'Nicht nur Hanf: Zahlreiche harte Pflanzenstrukturen brauchen gezielte Wärme'
              )}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#C8AB8A] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr("L'écorce de saule", 'White willow bark', 'Silberweidenrinde')}</strong>{' '}
                  {tr('(salicine, anti-douleur naturel) : nécessite une activation thermique contrôlée pour libérer ses glycosides phénoliques.', '(salicin): requires controlled thermal conditioning to release phenolic glycosides from dense bark fibers.', '(Salicin): benötigt kontrollierte Wärme, um phenolische Glykoside aus der harten Rinde zu lösen.')}
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#C8AB8A] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('La racine de valériane', 'Valerian root', 'Baldrianwurzel')}</strong>{' '}
                  {tr('(acides valéréniques) : se libère de manière optimale sous chauffe régulée sans volatilité des esters.', '(valerenic acids): releases smoothly under sealed temperature regulation without losing aromatic esters.', '(Valerensäuren): löst sich optimal unter geschlossener Temperaturführung ohne Ester-Verlust.')}
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#C8AB8A] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Les résines de boswellia', 'Boswellia resin', 'Weihrauchharz (Boswellia)')}</strong>{' '}
                  {tr('(anti-inflammatoire majeur) : nécessitent une liquéfaction thermique précise pour libérer les acides boswelliques.', '(boswellic acids): require gentle thermal softening in lipid or hydroalcoholic media for proper release.', '(Boswelliasäuren): erfordern gezielte Erwärmung zur Verflüssigung der Harzfraktionen.')}
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3]">
                <span className="w-2 h-2 rounded-full bg-[#C8AB8A] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Écorces et baies dures', 'Hard barks and berries', 'Harte Rinden und Beeren')}</strong>{' '}
                  {tr("(comme l'harpagophytum / griffe du diable) : possèdent des actifs denses qui ne s'extraient qu'à chaud.", "(such as devil's claw): contain dense structural fractions requiring sustained thermal energy.", '(wie Teufelskralle): enthalten feste Bestandteile, die sich nur bei gezielter Wärme lösen.')}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7DFD3] grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-red-50 text-red-900 border border-red-100">
                <span className="font-bold block mb-1">{tr('Ce que votre casserole fait :', 'What a kitchen saucepan does:', 'Was ein Kochtopf macht:')}</span>
                {tr(
                  "Elle chauffe trop, trop vite, sans contrôle. Vous perdez les actifs fragiles et vous n'activez pas les actifs résistants.",
                  'It heats too unevenly and too fast without regulation — damaging delicate fractions while failing dense ones.',
                  'Er erhitzt zu schnell und unkontrolliert — empfindliche Stoffe leiden, feste werden nicht erschlossen.'
                )}
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                <span className="font-bold block mb-1">{tr('Ce que BloomLab fait :', 'What BloomLab does:', 'Was BloomLab macht:')}</span>
                {tr(
                  'Elle chauffe à la température exacte, pendant le temps exact, pour chaque plante. Vous activez ce qui doit être activé. Vous préservez ce qui doit être préservé.',
                  'It holds the exact target temperature for the exact duration for every botanical — activating dense fractions while protecting fragile ones.',
                  'Sie hält die exakte Zieltemperatur über die exakte Dauer für jede Pflanze — aktiviert und schützt zugleich.'
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AGITATION & TEMPS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">4</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr(
                "Agitation & Temps : les deux paramètres que vous ne contrôlez pas aujourd'hui",
                'Stirring & Time: the two parameters missing from everyday brewing',
                'Bewegung & Zeit: Die zwei meist übersehenen Parameter'
              )}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr("Pensez à votre dernière tisane. Vous avez versé l'eau, vous avez attendu. Mais ", 'Think of your last herbal tea. You poured water and waited. Yet ', 'Denken Sie an Ihren letzten Kräutertee. Sie gossen Wasser auf und warteten. Doch ')}{' '}
              <strong className="text-[#3E4A3D]">{tr("saviez-vous qu'il fallait remuer ?", 'did you know continuous agitation matters?', 'wussten Sie, wie wichtig gezieltes Rühren ist?')}</strong>{' '}
              {tr('Et à quelle vitesse ? Et pendant combien de temps ?', 'At what speed? And for how long?', 'Mit welcher Geschwindigkeit? Und wie lange?')}
            </p>
            <p>
              <strong className="text-[#3E4A3D]">
                {tr(
                  'Sans agitation, une « couche limite » de solvant saturé se forme autour de la plante.',
                  'Without agitation, a stagnant boundary layer of saturated solvent forms around the plant.',
                  'Ohne Bewegung bildet sich eine gesättigte Grenzschicht um die Pflanze.'
                )}
              </strong>{' '}
              {tr(
                "Cette couche bloque la diffusion moléculaire (Loi de Fick) : l'eau entourant immédiatement la plante est déjà saturée, donc les nouvelles molécules ne peuvent plus sortir de la matrice végétale. Résultat : ",
                "According to Fick's Law, saturated liquid right against the leaf halts further diffusion. Result: ",
                'Diese Schicht blockiert die molekulare Diffusion (Ficksches Gesetz): Das umliegende Wasser ist gesättigt und nimmt kaum noch Neues auf. Ergebnis: '
              )}
              <strong className="text-red-700 font-semibold">
                {tr("vous perdez plus de 85% des actifs", 'you leave over 85% of extractable compounds behind', 'über 85 % bleiben ungelöst')}
              </strong>{' '}
              {tr('qui auraient pu être extraits.', 'inside the botanical fibers.', 'in der Pflanzenstruktur zurück.')}
            </p>
            <p>
              <strong className="text-[#3E4A3D]">
                {tr("Avec l'agitation cyclique de BloomLab", "With BloomLab's cyclic agitation", 'Mit der zyklischen Vortex-Bewegung der BloomLab')}
              </strong>
              {tr(
                ", le solvant est constamment renouvelé autour de la plante. Chaque molécule active trouve son chemin vers l'extrait. Rien n'est perdu.",
                ', fresh unsaturated solvent continuously sweeps the botanical surface so compounds diffuse cleanly into the extract.',
                ' wird das Lösungsmittel ständig an der Pflanzenoberfläche erneuert, sodass sich Wirkstoffe gleichmäßig lösen.'
              )}
            </p>
            <p>
              <strong className="text-[#3E4A3D]">{tr('Et le temps ?', 'And what about time?', 'Und die Zeit?')}</strong>{' '}
              {tr(
                "Une infusion trop courte extrait peu. Une infusion trop longue extrait des tanins amers astringents qui irritent la muqueuse de l'estomac. ",
                'Too short yields weak extraction. Too long over-extracts harsh bitter tannins. ',
                'Zu kurz liefert kaum Ausbeute. Zu lang löst übermäßig bittere Gerbstoffe. '
              )}
              <strong className="text-[#A8B8A0] font-semibold">
                {tr('BloomLab trouve le temps exact pour chaque plante', 'BloomLab times every plant cycle accurately', 'BloomLab wählt die exakte Zeit für jede Pflanze')}
              </strong>{' '}
              {tr('— ni trop peu, ni trop.', '— neither under-extracted nor scorched.', '— weder zu kurz noch zu lang.')}
            </p>
          </div>
        </section>

        {/* SECTION 5: PREUVE CINÉTIQUE & GRAPHIQUE INTERACTIF */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">5</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr('Preuve cinétique : Pourquoi la température fait tout', 'Kinetic proof: Why temperature determines everything', 'Kinetischer Nachweis: Warum die Temperatur alles entscheidet')}
            </h2>
          </div>

          <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr(
                'Actifs intacts récupérables au fil du temps, selon la méthode (modèle de diffusion de Fick + dégradation thermique) :',
                "Intact compounds recovered over time by method (Fick's diffusion + thermal degradation model):",
                'Unversehrte Wirkstoffe im Zeitverlauf je Methode (Ficksches Diffusions- & Wärmeabbaumodell):'
              )}
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#C8AB8A]">{tr('BloomLab® — Séquençage A/B (72°C → 50°C)', 'BloomLab® — A/B Sequencing (72°C → 50°C)', 'BloomLab® — A/B-Sequenzierung (72°C → 50°C)')}</strong>{' '}
                {tr(': 70% des actifs préservés à 3 heures.', ': 70% of active compounds preserved at 3 hours.', ': 70 % der Wirkstoffe nach 3 Stunden bewahrt.')}
              </li>
              <li>
                <strong className="text-red-700">{tr('Bain-marie / eau bouillante (~98°C, non régulé)', 'Water bath / boiling water (~98°C, unregulated)', 'Wasserbad / kochendes Wasser (~98°C, ungeregelt)')}</strong>{' '}
                {tr(": la majorité des actifs détruits en moins d'une heure par dégradation thermique dominante.", ': most compounds degraded within one hour under dominant thermal breakdown.', ': Großteil der Wirkstoffe innerhalb einer Stunde durch Hitzeschäden abgebaut.')}
              </li>
              <li>
                <strong className="text-slate-600">{tr('Macération solaire ouverte (20-22°C, 4-6 semaines)', 'Open solar maceration (20–22°C, 4–6 weeks)', 'Offene Sonnenmazeration (20–22°C, 4–6 Wochen)')}</strong>{' '}
                {tr(": extraction lente, oxydation à l'air libre, rendement très faible.", ': slow extraction, open-air oxidation, very low yield.', ': langsame Extraktion, Oxidation an der Luft, sehr geringe Ausbeute.')}
              </li>
            </ul>
            <p className="text-base font-semibold text-[#A8B8A0] pt-2">
              {tr(
                "Avec BloomLab, vous êtes dans la fenêtre où l'extraction est maximale et la dégradation minimale.",
                'With BloomLab, you stay inside the window where extraction peaks and thermal degradation stays minimal.',
                'Mit BloomLab arbeiten Sie exakt im Fenster maximaler Ausbeute und minimaler Zersetzung.'
              )}
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
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">6</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr(
                "Ce que vous perdez aujourd'hui (et ce que vous pourriez récupérer)",
                'What you lose today (and what you can recover)',
                'Was Sie heute verlieren (und zurückgewinnen können)'
              )}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#E7DFD3] bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">{tr('Ce que vous faites', 'Traditional habit', 'Heutige Methode')}</th>
                  <th className="p-4 sm:p-5 text-red-900">{tr('Ce que vous perdez', 'What is lost', 'Was verloren geht')}</th>
                  <th className="p-4 sm:p-5 text-emerald-950">{tr('Ce que BloomLab change', 'With BloomLab', 'Was BloomLab ändert')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#3E4A3D]">{tr('Eau bouillante (100°C)', 'Boiling water (100°C)', 'Kochendes Wasser (100°C)')}</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">{tr("Jusqu'à 80% des actifs détruits", 'Up to 80% of compounds degraded', 'Bis zu 80 % der Stoffe zerstört')}</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">{tr('Extraction à la température exacte (au degré près)', 'Exact temperature extraction (to the degree)', 'Extraktion bei exakter Zieltemperatur (aufs Grad genau)')}</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#3E4A3D]">{tr('Aucune agitation', 'No stirring', 'Keine Bewegung')}</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">{tr('85% des actifs bloqués dans la plante (couche limite)', '85% trapped inside the herb (boundary layer)', '85 % bleiben in der Pflanze (Grenzschicht)')}</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">{tr('Agitation cyclique continue et vortex doux', 'Continuous cyclic stirring & gentle vortex', 'Kontinuierliches Rühren & sanfter Vortex')}</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#3E4A3D]">{tr('Temps approximatif', 'Guesswork timing', 'Ungefähre Ziehzeit')}</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">{tr('Tanins amers, actifs sous-extraits ou brûlés', 'Bitter tannins, under-extracted or scorched compounds', 'Bittere Gerbstoffe, unterextrahiert oder überhitzt')}</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">{tr('Temps calibré scientifiquement pour chaque plante', 'Scientifically calibrated duration per plant', 'Wissenschaftlich kalibrierte Dauer je Pflanze')}</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#3E4A3D]">{tr('Pas de décarboxylation', 'No decarboxylation', 'Keine Decarboxylierung')}</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">{tr('Les molécules restent inactives (chanvre, écorces)', 'Compounds remain in precursor state (hemp, barks)', 'Moleküle bleiben inaktiv (Hanf, Rinden)')}</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">{tr("Montée jusqu'à 121°C régulée pour activer", 'Regulated ramp up to 121°C for activation', 'Geregelter Anstieg bis 121°C zur Aktivierung')}</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-[#3E4A3D]">{tr('Aucune reproductibilité', 'No repeatability', 'Keine Reproduzierbarkeit')}</td>
                  <td className="p-4 sm:p-5 text-red-700 font-medium">{tr('Un jour bon, un jour mauvais, jamais dosé', 'Inconsistent results, never reliably dosed', 'Mal stark, mal schwach, nie exakt dosierbar')}</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold">{tr('Même résultat puissant et constant à chaque fois', 'Consistent, repeatable concentration every cycle', 'Konstantes, reproduzierbares Ergebnis bei jedem Zyklus')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center sm:text-left text-xs sm:text-sm text-amber-950 font-medium">
            {tr(
              "Chaque jour, vous perdez de l'argent. Chaque jour, vous perdez du potentiel. Chaque jour, vous buvez une tisane — pas un remède.",
              'Without precision, you waste both raw botanicals and active potential — settling for flavored water instead of a complete botanical extract.',
              'Ohne Präzision verschenken Sie wertvolle Pflanzenstoffe und Ausbeute — und trinken gefärbtes Wasser statt eines vollständigen Pflanzenauszugs.'
            )}
          </div>
        </section>

        {/* SECTION 7: LE RÔLE DU BLOOMLAB DANS VOTRE PRATIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">7</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr('Le rôle du BloomLab® dans votre pratique', 'The role of BloomLab® in your daily practice', 'Die Rolle der BloomLab® in Ihrer Praxis')}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr(
                'BloomLab® vous accompagne pour réaliser vos propres préparations botaniques maison avec une chauffe douce régulée et une méthodologie reproductible.',
                'BloomLab® helps you craft homemade botanical preparations in your kitchen with gentle regulated heating and clear, repeatable steps.',
                'Die BloomLab® unterstützt Sie dabei, pflanzliche Zubereitungen zu Hause mit sanfter Wärmeregelung und klaren Schritten herzustellen.'
              )}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="font-bold text-[#3E4A3D] text-base sm:text-lg">
              {tr('Ce que vous obtenez concrètement :', 'What you gain in practice:', 'Was Sie konkret gewinnen:')}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Une chauffe douce mieux maîtrisée :', 'More controlled gentle heating:', 'Besser gesteuerte sanfte Wärme:')}</strong>{' '}
                  {tr("pour limiter la surchauffe et l'évaporation des arômes par rapport à une casserole bouillante ouverte.", 'helping limit overheating and aromatic evaporation compared with an open boiling pot.', 'um Überhitzung und das Verdampfen empfindlicher Aromen im offenen Kochtopf zu begrenzen.')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Des préparations plus soignées :', 'Cleaner botanical preparations:', 'Sorgfältigere Pflanzenauszüge:')}</strong>{' '}
                  {tr('parce que les molécules aromatiques et polyphénols sensibles ne sont pas soumis à une ébullition prolongée.', 'because sensitive aromatic and phenolic compounds avoid prolonged boiling.', 'weil empfindliche Aromastoffe und Polyphenole nicht dauerhaft aufgekocht werden.')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Des cycles reproductibles :', 'Repeatable cycles:', 'Wiederholbare Abläufe:')}</strong>{' '}
                  {tr('les mêmes réglages nominaux de temps et de température à chaque préparation.', 'the same nominal time and temperature settings on each preparation cycle.', 'dieselben nominalen Zeit- und Temperaturvorgaben in jedem Zubereitungszyklus.')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Activation thermique douce :', 'Calibrated thermal activation:', 'Gezielte Wärmeführung:')}</strong>{' '}
                  {tr('adapter le palier thermique selon la matière végétale (décarboxylation spécifique des fleurs résineuses selon la réglementation locale, ou macération douce).', 'adapt thermal steps to dense botanicals (or specific decarboxylation protocols where legally applicable).', 'Anpassung der Wärmestufe an anspruchsvolle Pflanzenteile oder spezielle Protokolle im jeweiligen Rechtsrahmen.')}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#3E4A3D]">{tr('Une meilleure valorisation des plantes :', 'Better use of botanical raw material:', 'Bessere Nutzung Ihrer Pflanzen:')}</strong>{' '}
                  {tr("vous adaptez le solvant (eau, huile, glycérine) et la température à la plante utilisée, sans surchauffe inutile.", 'match solvent (water, oil, glycerin) and temperature to the plant without unnecessary boiling.', 'Sie stimmen Lösungsmittel (Wasser, Öl, Glycerin) und Temperatur gezielt auf die Pflanze ab.')}
                </div>
              </div>
            </div>

            <p className="pt-3 border-t border-[#E7DFD3] text-sm sm:text-base font-bold text-[#C8AB8A]">
              {tr(
                "Vos plantes valent cher. Votre santé vaut plus. Ne les laissez plus dans l'eau bouillante.",
                'Your botanicals are precious. Stop losing their potential in boiling water.',
                'Ihre Pflanzen sind wertvoll. Verschwenden Sie ihr Potenzial nicht länger in kochendem Wasser.'
              )}
            </p>
          </div>
        </section>

        {/* SECTION 8: CE QUE LA SCIENCE DIT */}
        <section className="space-y-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#A8B8A0] text-[#0F261E] shadow-xl text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C8AB8A]">
              {tr('Ce que la science dit (en une phrase que tout le monde comprend)', 'What science confirms in plain terms', 'Was die Wissenschaft klar bestätigt')}
            </h3>
            <blockquote className="text-xl sm:text-2xl italic text-white/95 max-w-2xl mx-auto leading-relaxed">
              {tr(
                "« La température, le temps et l'agitation déterminent si vous capturez le potentiel thérapeutique d'une plante ou si vous le détruisez. »",
                '“Temperature, time, and agitation determine whether you preserve a plant’s full potential or destroy it.”',
                '„Temperatur, Zeit und Bewegung entscheiden darüber, ob Sie das Potenzial einer Pflanze bewahren oder zerstören.“'
              )}
            </blockquote>
            <p className="text-xs sm:text-sm text-white/80 font-mono font-medium">
              {tr(
                'BloomLab est la seule machine domestique qui vous donne le contrôle sur les trois.',
                'BloomLab is the countertop extractor designed to control all three together.',
                'BloomLab ist das Gerät für zu Hause, mit dem Sie alle drei Faktoren gemeinsam steuern.'
              )}
            </p>
          </div>
        </section>

        {/* SECTION 9: FAITES FLEURIR TOUTES VOS ENVIES DE BIEN-ÊTRE VÉGÉTAL */}
        <section className="space-y-6 pt-2">
          {/* Bloc ALMA */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE] border border-[#D8CBB7] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A8B8A0]">
                <MessageSquare className="w-4 h-4 text-[#C8AB8A]" />
                <span>{tr("Besoin d'un réglage sur mesure ?", 'Looking for tailored parameters?', 'Individuelle Parameter gesucht?')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#3E4A3D]">
                {tr('Faites fleurir vos envies de bien-être végétal', 'Explore precision botanical craftsmanship', 'Entdecken Sie präzise Pflanzenkunde')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                {tr(
                  'Pour un conseil personnalisé, interrogez ALMA, notre assistante botaniste, ou consultez nos guides spécialisés.',
                  'Ask ALMA, our botanical assistant, for guidance on recipes and protocols or explore our Academy guides.',
                  'Fragen Sie ALMA, unsere botanische Assistentin, nach Rezepten und Protokollen oder entdecken Sie unsere Akademie.'
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('chat') : window.location.assign('/chat')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>{tr('Échanger avec ALMA', 'Chat with ALMA', 'Mit ALMA sprechen')}</span>
              <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
            </button>
          </div>

          {/* CTA Boutique */}
          <div 
            className="p-8 sm:p-12 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
            style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
          >
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
                {tr('Précision Thermique Domestique', 'Countertop Thermal Precision', 'Thermische Präzision für zu Hause')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {tr('Passez de la tisane au remède actif.', 'Move from ordinary tea to calibrated botanicals.', 'Vom einfachen Aufguss zum präzisen Pflanzenextrakt.')}
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-light">
                {tr(
                  "Contrôlez la température de préparation de vos plantes à domicile grâce à la régulation thermique de la BloomLab®.",
                  'Control your botanical preparation temperatures at home with BloomLab® thermal regulation.',
                  'Steuern Sie die Zubereitungstemperatur Ihrer Pflanzen zu Hause mit der Wärmeregelung der BloomLab®.'
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C8AB8A] hover:bg-[#d8bca0] text-[#0F261E] font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{tr('Découvrir BloomLab', 'Discover BloomLab', 'BloomLab entdecken')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mentions éthiques */}
          <div className="text-center text-xs text-slate-500 pt-4 space-y-1">
            <p className="font-semibold text-slate-600">{tr("BloomLab® — L'ingénierie au service du vivant.", 'BloomLab® — Engineering in service of living plants.', 'BloomLab® — Präzisionstechnik im Dienst lebendiger Pflanzen.')}</p>
            <p>{tr('Avertissement : ce contenu est éducatif. Il ne remplace pas un avis médical.', 'Disclaimer: this content is educational only and does not replace medical advice.', 'Hinweis: Diese Inhalte dienen ausschließlich der Information und ersetzen keinen ärztlichen Rat.')}</p>
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
          ? 'Modèle pédagogique à 40°C (courbe illustrative)' 
          : isDE 
          ? 'Pädagogisches Modell bei 40°C (illustrativ)' 
          : 'Educational model at 40°C (illustrative)',
        data: [45, 78, 92, 98, 99],
        borderColor: '#A8B8A0',
        backgroundColor: 'rgba(168, 184, 160, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: isFR 
          ? 'Chauffe non régulée 70–100°C (courbe illustrative)' 
          : isDE 
          ? 'Ungeregelte Hitze 70–100°C (illustrativ)' 
          : 'Unregulated heat 70–100°C (illustrative)',
        data: [40, 55, 30, 15, 5],
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
          color: '#3E4A3D',
          usePointStyle: true,
          padding: 18
        }
      },
      tooltip: {
        backgroundColor: '#3E4A3D',
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
    <article className="bg-[#F9F9F7] text-[#3E4A3D] min-h-screen pb-28">
      {/* 1. Barre de fil d'Ariane tout en haut : Vert Profond du Menu #0F261E */}
      <div className="w-full bg-[#0F261E] border-b border-white/10 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 text-left">
        <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs text-white">
            <li>
              <button 
                onClick={() => { onNavigate?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                {isFR ? "Accueil" : isDE ? "Startseite" : "Home"}
              </button>
            </li>
            <li><span className="text-white/40">/</span></li>
            <li>
              <button 
                onClick={() => { onNavigate?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-white/80 hover:text-[#F5F0E6] transition-colors cursor-pointer"
              >
                {isFR ? "La Méthode A/B" : isDE ? "Die A/B-Methode" : "The A/B Method"}
              </button>
            </li>
            <li><span className="text-white/40">/</span></li>
            <li className="text-white font-bold" aria-current="page">
              {isFR ? "le Totum végétal" : isDE ? "Das Pflanzen-Totum" : "Plant Totum"}
            </li>
          </ol>
        </nav>
      </div>

      {/* HEADER HERO */}
      <header 
        className="relative text-white pt-16 pb-16 md:pt-20 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10 bg-[#1E2E25]"
        style={{ backgroundColor: '#1E2E25', color: '#ffffff' }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8AB8A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
              <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-xs text-left">
                <Compass className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 text-[#E8772E]" />
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {isFR 
                  ? "Le Totum Végétal : L'Intelligence Collective de la Plante" 
                  : isDE 
                  ? "Das Pflanzen-Totum: Die kollektive Intelligenz der Pflanze" 
                  : "The Plant Totum: The Collective Intelligence of the Plant"}
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-2xl">
                {isFR 
                  ? "Bien avant d'isoler des molécules, les grandes traditions médicales utilisaient déjà la plante entière. Bloom by BotaniK explore cette intuition ancestrale — le totum — et la lumière que la science moderne apporte à sa compréhension." 
                  : isDE 
                  ? "Lange vor der Isolierung von Molekülen nutzten die großen Medizintraditionen bereits die ganze Pflanze. Bloom by BotaniK erforscht diese uralte Intuition – das Totum – und das Licht, das die moderne Wissenschaft auf sein Verständnis wirft." 
                  : "Long before isolating molecules, great medical traditions were already using the whole plant. Bloom by BotaniK explores this ancestral intuition — the totum — and the light that modern science sheds on its understanding."}
              </p>
            </div>

            {/* Header Image - échelle équilibrée pas trop grande */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 aspect-[16/10] w-full max-w-md max-h-[280px]">
                <img
                  src="/images/8.png"
                  alt={isFR ? "Le Totum Végétal — Synergie intégrale de la plante et extraction BloomLab" : isDE ? "Das Pflanzen-Totum — Vollständige Pflanzensynergie und BloomLab-Extraktion" : "The Plant Totum — Whole botanical synergy"}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-center">
                  {isFR ? "Totum végétal : préservation de l'intégrité moléculaire" : isDE ? "Pflanzen-Totum: Bewahrung der molekularen Integrität" : "Plant Totum: molecular integrity"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">

        {/* SECTION 1: QU'EST-CE QUE LE TOTUM ? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm">1</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D]">
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
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm">2</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D]">
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
              <div className="flex items-center gap-2.5 text-[#C8AB8A] font-bold text-sm">
                <span className="text-xl">🏮</span>
                <span>{isFR ? "Médecine Traditionnelle Chinoise" : isDE ? "Traditionelle Chinesische Medizin" : "Traditional Chinese Medicine"}</span>
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">
                {isFR ? "La plante comme accord de saveurs" : isDE ? "Die Pflanze als Akkord von Aromen" : "The plant as a harmony of flavors"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Le Shennong Bencao Jing (Classique de la Matière Médicale, compilé il y a près de 2 000 ans) ne classe pas les 365 substances qu'il décrit par « principe actif », mais par saveur, nature thermique et affinité méridienne. La plante y est lue comme un profil complet."
                  : isDE
                  ? "Das Shennong Bencao Jing klassifiziert die 365 beschriebenen Substanzen nicht nach „Wirkstoffen“, sondern nach Geschmack, thermischer Natur und Meridian-Affinität. Die Pflanze wird als vollständiges Profil gelesen."
                  : "The Shennong Bencao Jing classifies substances not by 'active principle', but by flavor, thermal nature, and meridian affinity. The plant is read as a complete profile."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "L'exemple le plus frappant est le Schisandra (Wu Wei Zi), littéralement « le fruit des cinq saveurs » : acide, amer, doux, piquant et salé agissant de concert sur l'ensemble des organes. C'est le totum incarné."
                  : isDE
                  ? "Das eindrucksvollste Beispiel ist Schisandra (Wu Wei Zi), die „Frucht der fünf Geschmacksrichtungen“: sauer, bitter, süß, scharf und salzig wirken gemeinsam im gesamten Organismus. Das verkörperte Totum."
                  : "The most striking example is Schisandra (Wu Wei Zi), 'the five-flavor fruit': sour, bitter, sweet, pungent, and salty acting harmoniously across all organs. The totum embodied."}
              </p>
            </div>

            {/* Ayurveda */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#C8AB8A] font-bold text-sm">
                <span className="text-xl">🕉️</span>
                <span>{isFR ? "Ayurveda" : "Ayurveda"}</span>
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">
                {isFR ? "Les six saveurs et la signature énergétique" : isDE ? "Die sechs Geschmäcker und die Energiesignatur" : "The six tastes and energetic signature"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Les textes fondateurs de l'Ayurveda (Charaka Samhita) lisent chaque plante à travers rasa (la saveur), virya (l'énergie) et vipaka (l'effet post-digestif). Là encore, jamais une molécule : toujours un profil."
                  : isDE
                  ? "Die Grundlagentexte des Ayurveda (Charaka Samhita) lesen jede Pflanze über Rasa (Geschmack), Virya (Energie) und Vipaka (Nachwirkung). Auch hier gilt: immer ein Gesamtprofil, niemals ein isoliertes Molekül."
                  : "Foundational Ayurvedic texts (Charaka Samhita) interpret plants through rasa (flavor), virya (energy), and vipaka (post-digestive effect). Always a profile, never an isolated molecule."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "Le curcuma (Haridra) associé au poivre noir et à un corps gras (« lait d'or ») : la recherche des années 90 a démontré que la pipérine décuple l'absorption de la curcumine. L'intuition ancestrale validée par la science."
                  : isDE
                  ? "Kurkuma (Haridra) zusammen mit schwarzem Pfeffer und Fett („Goldene Milch“): Forschungen der 1990er-Jahre zeigten, dass Piperin die Aufnahme von Curcumin vervielfacht. Traditionelle Intuition wissenschaftlich bestätigt."
                  : "Turmeric (Haridra) traditionally paired with black pepper and lipids ('golden milk'): 1990s research showed piperine dramatically enhances curcumin absorption. Ancestral intuition verified by modern science."}
              </p>
            </div>

            {/* Occident */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#C8AB8A] font-bold text-sm">
                <span className="text-xl">🏛️</span>
                <span>{isFR ? "L'Occident Médiéval & Antique" : isDE ? "Antike & Mittelalterliches Europa" : "The Classical West"}</span>
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">
                {isFR ? "D'Hippocrate aux médecines monastiques" : isDE ? "Von Hippokrates bis zur Klostermedizin" : "From Hippocrates to Monastic Medicine"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "L'école hippocratique, puis Dioscoride (De Materia Medica, Ier siècle), décrivent les plantes avec leurs préparations complètes — parties, supports, temps. Hildegarde de Bingen (Physica, XIIe siècle) considère la plante dans son entier : feuille, tige, racine, sève."
                  : isDE
                  ? "Die hippokratische Schule und Dioskurides beschrieben Pflanzen stets samt vollständiger Zubereitung – Pflanzenteil, Träger und Dauer. Hildegard von Bingen betrachtete die Pflanze als Ganzes: Blatt, Stängel, Wurzel und Saft."
                  : "Hippocratic medicine and Dioscorides described plants with full preparation procedures. Hildegard of Bingen considered the plant in its entirety: leaf, stem, root, sap."}
              </p>
              <p className="text-xs text-slate-500 italic bg-[#FAF7F2] p-3 rounded-xl">
                {isFR 
                  ? "La théorie des signatures (Paracelse, XVIe siècle), bien qu'historique et non scientifique, témoigne de cette même obsession : lire la plante comme un tout cohérent."
                  : isDE
                  ? "Die Signaturenlehre (Paracelsus) zeugt – historisch betrachtet – von demselben Bestreben: die Pflanze als zusammenhängendes Ganzes zu verstehen."
                  : "The doctrine of signatures (Paracelsus), though historical, testifies to this same drive: understanding the plant as a unified living whole."}
              </p>
            </div>

            {/* Ethnobotanique */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#C8AB8A] font-bold text-sm">
                <span className="text-xl">🌿</span>
                <span>{isFR ? "Ethnobotaniques du Monde" : isDE ? "Ethnobotanik der Welt" : "World Ethnobotany"}</span>
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">
                {isFR ? "La plante comme écosystème vivant" : isDE ? "Die Pflanze als lebendiges Ökosystem" : "The plant as a living ecosystem"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {isFR 
                  ? "Des traditions amazoniennes aux savoirs africains, la plante se prépare en macérations, fermentations et associations de parties — jamais comme une molécule isolée. L'ethnobotanique documente ces savoirs : la plante y est traitée comme un écosystème, pas comme un stock de composés."
                  : isDE
                  ? "Von amazonischen Traditionen bis zu afrikanischem Pflanzenwissen wurden Kräuter durch sanfte Mazerationen, Fermentationen und Kombinationen ganzer Pflanzenteile genutzt – als lebendige Ökosysteme."
                  : "From Amazonian traditions to African herbal knowledge, plants were prepared through gentle macerations, slow ferments, and holistic pairings — treated as living ecosystems."}
              </p>
            </div>
          </div>

          {/* Synthèse commune */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#C8AB8A]/20 space-y-3 text-center sm:text-left">
            <h4 className="font-extrabold text-[#3E4A3D] text-base sm:text-lg">
              {isFR ? "Le point commun de toutes ces traditions :" : isDE ? "Der gemeinsame Nenner aller Traditionen:" : "The common denominator across all traditions:"}
            </h4>
            <p className="text-slate-600 text-sm sm:text-base font-light">
              {isFR ? (
                <>
                  Aucune ne demande : <em>« Quelle molécule ? »</em><br />
                  Toutes demandent : <strong>« Quelle partie ? Quelle préparation ? Quelle association ? Pour quel terrain ? »</strong>
                </>
              ) : isDE ? (
                <>
                  Keine fragt: <em>„Welches Einzelmolekül?“</em><br />
                  Alle fragen: <strong>„Welcher Pflanzenteil? Welche Zubereitung? Welche Synergie? Für welches Terrain?“</strong>
                </>
              ) : (
                <>
                  None ask: <em>'Which molecule?'</em><br />
                  All ask: <strong>'Which part? Which preparation? Which synergy? For which terrain?'</strong>
                </>
              )}
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#C8AB8A]">
              {isFR ? "C'est exactement la question que pose BloomLab." : isDE ? "Genau diese Frage beantwortet die BloomLab." : "This is exactly the question answered by BloomLab."}
            </p>
          </div>
        </section>

        {/* SECTION 3: LA SYNERGIE MOLÉCULAIRE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm">3</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D]">
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
                : isDE
                ? "Die moderne Fachliteratur über Pflanzenextrakte betont, dass Gesamtextrakte Eigenschaften zeigen, die einem isolierten Einzelstoff fehlen: Begleitstoffe modulieren Löslichkeit, Stabilität und Aufnahme. Man spricht heute von Systembiologie und Netzwerk-Synergie."
                : "Modern literature on botanical extracts underscores that full extracts display behaviors absent in isolated compounds: companion compounds modulate solubility, stability, and bioavailability. Modern pharmacology refers to this as network biology and polypharmacology."}
            </p>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] space-y-2 text-sm text-slate-700">
              <p className="font-bold text-[#3E4A3D]">
                {isFR ? "L'histoire est éloquente :" : isDE ? "Die Geschichte zeigt es deutlich:" : "History speaks for itself:"}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>{isFR ? "L'écorce de saule → salicine → aspirine (XIXe siècle)." : isDE ? "Weidenrinde → Salicin → Aspirin (19. Jahrhundert)." : "Willow bark → salicin → aspirin (19th century)."}</li>
                <li>{isFR ? "Le quinquina → quinine." : isDE ? "Chinarinde → Chinin." : "Cinchona bark → quinine."}</li>
              </ul>
              <p className="text-xs text-slate-500 pt-2 italic">
                {isFR 
                  ? "Chaque isolement a produit un médicament — progrès médical réel que nous respectons. Mais il a aussi fait oublier la matrice d'origine. Bloom documente ce pattern. Pas pour dénigrer la médecine. Pour ne pas oublier la plante."
                  : isDE
                  ? "Jede Isolierung brachte medizinischen Fortschritt, den wir achten – ließ aber oft die ursprüngliche Matrix vergessen. Bloom dokumentiert dieses Prinzip: um die ganze Pflanze nicht zu vergessen."
                  : "Every isolation created an important medical advance that we deeply respect. But it also severed memory of the original matrix. Bloom documents this pattern not to disparage medicine, but never to forget the plant."}
              </p>
            </div>
          </div>

          {/* CRITICAL: FOND DE COULEUR SOMBRE GARANTI POUR RENDRE LE TEXTE BLANC PARFAITEMENT LISIBLE */}
          <div 
            className="my-10 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/10"
            style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
          >
            <FlaskConical className="absolute top-[-20px] right-[-20px] w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFR ? "Principe Fondateur" : isDE ? "Grundprinzip" : "Core Principle"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isFR ? "La Synergie Moléculaire" : isDE ? "Molekulare Synergie" : "Molecular Synergy"}
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
                {isFR 
                  ? "Dans le Totum, certaines molécules agissent comme des agents actifs, tandis que d'autres facilitent l'absorption ou limitent les effets secondaires. C'est cette « harmonie biochimique » que nous cherchons à capturer avec le BloomLab."
                  : isDE
                  ? "Im Totum wirken manche Moleküle direkt aktiv, während andere die Bioverfügbarkeit fördern oder abpuffernd wirken. Genau diese „biochemische Harmonie“ bewahren wir mit der BloomLab."
                  : "In the Totum, certain molecules act as active agents, while others facilitate cellular absorption or mitigate unwanted side effects. It is this exact 'biochemical harmony' that we capture with BloomLab."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: POURQUOI BLOOMLAB CHERCHE À RESPECTER LE TOTUM */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm">4</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D]">
              {isFR 
                ? "Pourquoi BloomLab cherche à respecter le Totum" 
                : isDE 
                ? "Warum BloomLab das Totum respektiert" 
                : "Why BloomLab Strives to Respect the Totum"}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p className="text-lg font-medium text-[#3E4A3D] italic">
              {isFR ? "« Les sagesses anciennes avaient le geste. Nous leur apportons l'instrument. »" : isDE ? "„Alte Weisheit besaß die Geste. Wir liefern das Instrument.“" : "« Ancient wisdom held the gesture. We provide the instrument. »"}
            </p>
            <p>
              {isFR 
                ? "Chaque plante contient des composés hydrosolubles, liposolubles et alcoolosolubles. Les extraire ensemble, à des températures incompatibles, détruit les plus fragiles. C'est pourquoi BloomLab orchestre le Séquençage Actif A/B :"
                : isDE
                ? "Jede Pflanze enthält wasserlösliche, fettlösliche und alkohollösliche Stoffe. Wer sie wahllos zusammen erhitzt, zerstört die empfindlichsten Fraktionen. Deshalb steuert BloomLab die aktive A/B-Sequenzierung:"
                : "Every plant contains hydrosoluble, liposoluble, and alcoholsoluble compounds. Extracting them haphazardly at conflicting temperatures destroys the most delicate ones. This is why BloomLab orchestrates Active A/B Sequencing:"}
            </p>
          </div>

          {/* TABLEAU SÉQUENÇAGE A/B */}
          <div className="md:overflow-x-auto md:rounded-3xl md:border md:border-[#E7DFD3] md:bg-white md:shadow-xs">
            <table className="totum-table block md:table w-full text-left border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="bg-[#FAF7F2] border-b border-[#E7DFD3] text-xs font-bold uppercase tracking-wider text-[#3E4A3D]">
                  <th className="p-4 sm:p-5">{isFR ? 'Phase' : isDE ? 'Phase' : 'Phase'}</th>
                  <th className="p-4 sm:p-5">{isFR ? 'Température' : isDE ? 'Temperatur' : 'Temperature'}</th>
                  <th className="p-4 sm:p-5">{isFR ? 'Cible & Molécules' : isDE ? 'Ziel & Moleküle' : 'Target & Molecules'}</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group md:divide-y md:divide-[#E7DFD3] text-sm sm:text-base text-slate-700">
                <tr className="block md:table-row mb-4 last:mb-0 md:mb-0 border border-[#E0E0E0] md:border-0 rounded-lg md:rounded-none p-3 md:p-0 bg-[#FAFAFA] md:bg-transparent hover:bg-[#FAF7F2]/60 transition-colors">
                  <td
                    data-label={isFR ? 'Phase' : isDE ? 'Phase' : 'Phase'}
                    className="flex md:table-cell justify-between items-center gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 text-sm md:text-base font-semibold md:font-bold text-[#3E4A3D] text-left whitespace-nowrap break-keep before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap break-keep">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="whitespace-nowrap break-keep">
                        {isFR ? 'Phase A — Hydrosoluble' : isDE ? 'Phase A — Wasserlöslich' : 'Phase A — Water-Soluble'}
                      </span>
                    </span>
                  </td>
                  <td
                    data-label={isFR ? 'Température' : isDE ? 'Temperatur' : 'Temperature'}
                    className="flex md:table-cell justify-between items-start gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 font-mono text-sm font-semibold text-[#C8AB8A] text-left before:content-[attr(data-label)] before:font-sans before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left">
                      {isFR ? '70–75°C selon la matrice' : isDE ? '70–75°C je nach Rohstoff' : '70–75°C by matrix'}
                    </span>
                  </td>
                  <td
                    data-label={isFR ? 'Cible & Molécules' : isDE ? 'Ziel & Moleküle' : 'Target & Molecules'}
                    className="flex md:table-cell justify-between items-start gap-3 pt-2 pb-0 md:p-5 text-sm text-slate-600 text-left before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left break-normal">
                      {isFR ? 'Minéraux, polysaccharides, composés hydrosolubles' : isDE ? 'Mineralien, Polysaccharide, wasserlösliche Verbindungen' : 'Minerals, polysaccharides, water-soluble compounds'}
                    </span>
                  </td>
                </tr>
                <tr className="block md:table-row mb-4 last:mb-0 md:mb-0 border border-[#E0E0E0] md:border-0 rounded-lg md:rounded-none p-3 md:p-0 bg-[#FAFAFA] md:bg-transparent hover:bg-[#FAF7F2]/60 transition-colors">
                  <td
                    data-label={isFR ? 'Phase' : isDE ? 'Phase' : 'Phase'}
                    className="flex md:table-cell justify-between items-center gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 text-sm md:text-base font-semibold md:font-bold text-[#3E4A3D] text-left whitespace-nowrap break-keep before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap break-keep">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="whitespace-nowrap break-keep">
                        {isFR ? 'Phase B — Liposoluble' : isDE ? 'Phase B — Fettlöslich' : 'Phase B — Fat-Soluble'}
                      </span>
                    </span>
                  </td>
                  <td
                    data-label={isFR ? 'Température' : isDE ? 'Temperatur' : 'Temperature'}
                    className="flex md:table-cell justify-between items-start gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 font-mono text-sm font-semibold text-[#C8AB8A] text-left before:content-[attr(data-label)] before:font-sans before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left">45–55°C</span>
                  </td>
                  <td
                    data-label={isFR ? 'Cible & Molécules' : isDE ? 'Ziel & Moleküle' : 'Target & Molecules'}
                    className="flex md:table-cell justify-between items-start gap-3 pt-2 pb-0 md:p-5 text-sm text-slate-600 text-left before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left break-normal">
                      {isFR ? 'Résines, huiles essentielles, composés lipophiles' : isDE ? 'Harze, ätherische Öle, lipophile Verbindungen' : 'Resins, essential oils, lipophilic compounds'}
                    </span>
                  </td>
                </tr>
                <tr className="block md:table-row mb-4 last:mb-0 md:mb-0 border border-[#E0E0E0] md:border-0 rounded-lg md:rounded-none p-3 md:p-0 bg-[#FAFAFA] md:bg-transparent hover:bg-[#FAF7F2]/60 transition-colors">
                  <td
                    data-label={isFR ? 'Phase' : isDE ? 'Phase' : 'Phase'}
                    className="flex md:table-cell justify-between items-center gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 text-sm md:text-base font-semibold md:font-bold text-[#3E4A3D] text-left whitespace-nowrap break-keep before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap break-keep">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="whitespace-nowrap break-keep">
                        {isFR ? 'Activation thermique' : isDE ? 'Thermische Aktivierung' : 'Thermal activation'}
                      </span>
                    </span>
                  </td>
                  <td
                    data-label={isFR ? 'Température' : isDE ? 'Temperatur' : 'Temperature'}
                    className="flex md:table-cell justify-between items-start gap-3 py-2 md:p-5 border-b border-[#EEEEEE] md:border-b-0 font-mono text-sm font-semibold text-[#C8AB8A] text-left before:content-[attr(data-label)] before:font-sans before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left">
                      {isFR ? "Jusqu'à 121°C" : isDE ? 'Bis zu 121°C' : 'Up to 121°C'}
                    </span>
                  </td>
                  <td
                    data-label={isFR ? 'Cible & Molécules' : isDE ? 'Ziel & Moleküle' : 'Target & Molecules'}
                    className="flex md:table-cell justify-between items-start gap-3 pt-2 pb-0 md:p-5 text-sm text-slate-600 text-left before:content-[attr(data-label)] before:font-semibold before:text-[#666666] before:mr-3 before:shrink-0 md:before:content-none"
                  >
                    <span className="text-right md:text-left break-normal">
                      {isFR ? 'Transformations spécifiques (décarboxylation selon protocole)' : isDE ? 'Gezielte Umwandlungen (Decarboxylierung nach Protokoll)' : 'Specific transformations (decarboxylation per protocol)'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center sm:text-left text-sm sm:text-base font-bold text-[#C8AB8A]">
            {isFR ? "Libérer le Totum. Pas trahir la plante." : isDE ? "Das Totum freisetzen. Die Pflanze nicht verfälschen." : "Release the Totum. Never betray the plant."}
          </p>

          {/* INTÉGRATION DE LA SECTION DE L'INDEX : LA SCIENCE DU TOTUM */}
          <div className="pt-8 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#E8F1EE] text-[#A8B8A0] text-[11px] font-bold uppercase tracking-widest rounded-md border border-[#D8CBB7]">
              {isFR ? 'Ingénierie R&D — Les Solvants' : isDE ? 'F&E-Technik — Die Lösungsmittel' : 'R&D Engineering — Solvents'}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D] leading-tight">
              {isFR 
                ? 'La Science du Totum : À chaque plante son solvant et sa température' 
                : isDE 
                ? 'Die Totum-Wissenschaft: Zu jeder Pflanze ihr Lösungsmittel und ihre Temperatur' 
                : 'Totum Science: To each plant its solvent and temperature'}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              {isFR 
                ? 'Contrairement aux bains-marie génériques, la BloomLab® ajuste la synergie solvant-température pour extraire la totalité du profil phytochimique sans dénaturation.' 
                : isDE
                ? 'Im Gegensatz zu herkömmlichen Wasserbädern kalibriert die BloomLab® exakt das Zusammenspiel von Lösungsmittel und Temperatur, um das volle Phytospektrum schonend zu lösen.'
                : 'Unlike generic bain-maries, BloomLab® calibrates the exact solvent-temperature synergy to extract the full phytochemical spectrum without thermal denaturation.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { 
                  icon: "🧪", 
                  title: isFR ? "Résines & Graines Dures" : isDE ? "Harze & harte Samen" : "Resins & Hard Seeds", 
                  sub: isFR ? "(Boswellia, Girofle)" : isDE ? "(Boswellia, Nelken)" : "(Boswellia, Clove)", 
                  desc: isFR ? "Phase B huileuse en BloomLab® (45°C) ; alcool à froid hors appareil uniquement" : isDE ? "Ölige Phase B in BloomLab® (45°C); Alkohol nur kalt außerhalb des Geräts" : "Oil Phase B in BloomLab® (45°C); cold alcohol outside appliance only" 
                },
                { 
                  icon: "🌿", 
                  title: isFR ? "Racines & Écorces" : isDE ? "Wurzeln & Rinden" : "Roots & Barks", 
                  sub: isFR ? "(Salsepareille, Gentiane)" : isDE ? "(Sarsaparilla, Enzian)" : "(Sarsaparilla, Gentian)", 
                  desc: isFR ? "Phase A aqueuse ou glycérine en BloomLab® (65–85°C / 40°C)" : isDE ? "Wässrige oder Glycerin-Phase in BloomLab® (65–85°C / 40°C)" : "Aqueous or glycerin extraction in BloomLab® (65–85°C / 40°C)" 
                },
                { 
                  icon: "🌸", 
                  title: isFR ? "Fleurs & Feuilles Fragiles" : isDE ? "Blüten & empfindliche Blätter" : "Flowers & Fragile Leaves", 
                  sub: isFR ? "(Passiflore, Pensée)" : isDE ? "(Passionsblume, Stiefmütterchen)" : "(Passionflower, Pansy)", 
                  desc: isFR ? "Phase A douce ou macérat huileux en BloomLab® (40–45°C)" : isDE ? "Sanfte Phase A oder Ölmazerat in BloomLab® (40–45°C)" : "Gentle Phase A or oil macerate in BloomLab® (40–45°C)" 
                }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <div className="text-xs font-bold text-[#3E4A3D] leading-snug">
                    {item.title} <br /><span className="text-slate-500 font-normal">{item.sub}</span>
                  </div>
                  <div className="text-xs text-[#C8AB8A] font-medium pt-1 border-t border-slate-100">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center space-x-2.5 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                {isFR 
                  ? "PRUDENCE BOTANIQUE : Nos fiches privilégient les plantes usuelles documentées ; vérifiez toujours l'identification botanique et vos contre-indications individuelles." 
                  : isDE
                  ? "BOTANISCHE SORGFALT: Unsere Leitfäden konzentrieren sich auf dokumentierte traditionelle Pflanzen; prüfen Sie stets botanische Identität und individuelle Gegenanzeigen."
                  : "BOTANICAL CAUTION: Our guides focus on documented everyday herbs; always verify botanical identity, contraindications, and individual tolerance."}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: NOTRE RIGUEUR ET NOS LIMITES */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm">5</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E4A3D]">
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
            <div className="pt-2 border-t border-[#E7DFD3] text-[#A8B8A0] italic text-base sm:text-lg">
              {isFR 
                ? "« Une place pour chaque plante, et chaque plante à sa place. »" 
                : isDE
                ? "„Ein Platz für jede Pflanze und jede Pflanze an ihrem Platz.“"
                : "« A place for every plant, and every plant in its place. »"}
              <span className="block text-xs font-sans not-italic text-slate-500 mt-1 font-normal">
                {isFR ? "Cette maxime guide notre approche de l'extraction intégrale." : isDE ? "Dieser Leitsatz prägt unseren Ansatz der ganzheitlichen Extraktion." : "This maxim guides our whole extraction approach."}
              </span>
            </div>
          </div>
        </section>

        {/* LE GRAPHIQUE POUR FINIR */}
        <section className="space-y-6 pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D]">
                  {isFR 
                    ? 'Simulation pédagogique — paramètres illustratifs (thermique vs ébullition)' 
                    : isDE 
                    ? 'Pädagogische Simulation — illustrative Parameter (Temperatur vs. Kochen)' 
                    : 'Educational simulation — illustrative parameters (temperature vs. boiling)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isFR 
                    ? 'Simulation pédagogique — paramètres illustratifs, non issus de mesures de performance BloomLab (courbe conceptuelle 40°C vs 70–100°C).' 
                    : isDE
                    ? 'Pädagogische Simulation — illustrative Parameter, nicht aus BloomLab-Leistungsmessungen (konzeptionelle Kurve 40°C vs. 70–100°C).'
                    : 'Educational simulation — illustrative parameters, not derived from BloomLab performance measurements (conceptual 40°C vs. 70–100°C curve).'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#A8B8A0] text-[#0F261E] px-3 py-1.5 rounded-full shrink-0">
                {isFR ? 'Simulation pédagogique' : isDE ? 'Pädagogische Simulation' : 'Illustrative Simulation'}
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
            style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
          >
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
                {isFR ? "Passer à la pratique" : isDE ? "In die Praxis gehen" : "Take Action"}
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
                  ? "La BloomLab® vous aide à conduire vos préparations aqueuses et huileuses à température régulée dans le confort de votre maison." 
                  : isDE
                  ? "Mit der BloomLab® steuern Sie wässrige und ölige Auszüge mit geregelter Wärme bequem von zu Hause aus."
                  : "BloomLab® helps you run regulated aqueous and oil preparations in the comfort of your home."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C8AB8A] hover:bg-[#d8bca0] text-[#0F261E] font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isFR ? "Découvrir la BloomLab® en boutique" : isDE ? "BloomLab® im Shop entdecken" : "Discover BloomLab® in Shop"}</span>
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
  const isDE = lang === 'de';
  const tr = getTr(lang);
  const [unlockedLocally, setUnlockedLocally] = useState(false);
  const hasAccess = Boolean(isPremium || unlockedLocally);

  useEffect(() => {
    const pageTitle = tr(
      "Eau, Huile ou Alcool : Choisir le Bon Vecteur d'Actifs | Bloom by BotaniK",
      'Water, Oil or Alcohol: Choosing the Right Active Vector | Bloom by BotaniK',
      'Wasser, Öl oder Alkohol: Den richtigen Wirkstoffträger wählen | Bloom by BotaniK'
    );
    document.title = pageTitle;

    const pageDesc = tr(
      "Guide complet des solvants d'extraction végétale : polarité, pureté de l'eau, pénétration transdermique des huiles, alcool de précision et solvants alternatifs pour le Totum.",
      'Complete guide to botanical extraction solvents: polarity, water purity, transdermal oil penetration, precision alcohol, and alternative solvents for the plant Totum.',
      'Vollständiger Leitfaden zu pflanzlichen Extraktionslösungsmitteln: Polarität, Wasserreinheit, transdermale Ölaufnahme, Präzisionsalkohol und Alternativen für das Pflanzen-Totum.'
    );

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [lang, isFR, isDE]);

  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#3E4A3D] pb-24 selection:bg-[#C8AB8A]/20 selection:text-[#3E4A3D]">
      {/* HEADER HERO */}
      <header className="relative bg-gradient-to-b from-[#EFEAE2] to-[#FAF7F2] border-b border-[#E7DFD3] pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav aria-label={tr("Fil d'Ariane", 'Breadcrumb', 'Brotkrumennavigation')} className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <button
              onClick={() => onNavigate ? onNavigate('home') : window.location.assign('/')}
              className="hover:text-[#A8B8A0] transition-colors cursor-pointer"
            >
              {tr('Accueil', 'Home', 'Startseite')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigate ? onNavigate('academie') : window.location.assign('/academie')}
              className="hover:text-[#A8B8A0] transition-colors cursor-pointer"
            >
              {tr('Bloom Académie', 'Bloom Academy', 'Bloom Akademie')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#A8B8A0] font-semibold">{tr("Les Solvants d'Extraction", 'Extraction Solvents', 'Extraktionslösungsmittel')}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A8B8A0]/5 border border-[#A8B8A0]/15 text-[#A8B8A0] text-[11px] font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{tr('Ingénierie & Synergie Botanique', 'Botanical Engineering & Synergy', 'Botanische Technik & Synergie')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#3E4A3D] tracking-tight leading-[1.1]">
            {tr(
              "Eau, Huile ou Alcool : Choisir le Bon Vecteur d'Actifs",
              'Water, Oil or Alcohol: Choosing the Right Active Vector',
              'Wasser, Öl oder Alkohol: Den richtigen Wirkstoffträger wählen'
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal max-w-3xl">
            {tr(
              "Chaque molécule végétale a son affinité. Apprenez à choisir le solvant idéal pour extraire les principes actifs dont votre terrain a besoin, mais aussi pour transporter le remède jusqu'à sa cible.",
              'Every plant molecule has its own affinity. Learn how to choose the ideal solvent both to extract the compounds your terrain calls for and to carry them effectively.',
              'Jedes Pflanzenmolekül hat seine eigene Affinität. Lernen Sie, das ideale Lösungsmittel zu wählen, um Wirkstoffe gezielt zu lösen und optimal zu transportieren.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 text-xs font-mono text-slate-500 border-t border-[#E7DFD3]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C8AB8A]" />
              {tr('Lecture : 8 min', 'Read time: 8 min', 'Lesezeit: 8 Min.')}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#A8B8A0]" />
              {tr('Niveau : Guide Fondamental & Pratique', 'Level: Foundational & Practical Guide', 'Niveau: Grundlagen- & Praxisleitfaden')}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {tr('Standard Totum BloomLab®', 'BloomLab® Totum Standard', 'BloomLab® Totum-Standard')}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">

        {/* SECTION 1: LE SOLVANT, BIEN PLUS QU'UN SIMPLE LIQUIDE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr("Le solvant : bien plus qu'un simple liquide", 'The solvent: far more than a simple liquid', 'Das Lösungsmittel: Weit mehr als nur eine Flüssigkeit')}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr("Un solvant d'extraction n'est pas un simple vecteur inerte. C'est un ", 'An extraction solvent is not an inert medium. It is an ', 'Ein Extraktionslösungsmittel ist kein neutraler Träger. Es ist ein ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('partenaire actif', 'active partner', 'aktiver Partner')}</strong>{' '}
              {tr('qui détermine quelles molécules seront libérées, à quelle concentration, et surtout ', 'that determines which molecules dissolve, at what concentration, and ', 'der bestimmt, welche Moleküle in welcher Konzentration gelöst werden und ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr("comment elles atteindront leur site d'action", 'how they reach their target tissue', 'wie sie ihr Ziel erreichen')}</strong>.{' '}
              {tr("Le choix du solvant conditionne la puissance du remède autant que la plante elle-même.", 'Solvent selection shapes extract quality just as much as the herb itself.', 'Die Wahl des Lösungsmittels prägt die Qualität des Auszugs ebenso stark wie die Pflanze selbst.')}
            </p>
            <p>
              {tr(
                'En extraction botanique, trois familles de solvants se distinguent par leur polarité — leur capacité à dissoudre des molécules plutôt grasses (lipophiles) ou plutôt aqueuses (hydrophiles).',
                'In botanical extraction, three primary solvent families are classified by polarity — their affinity for fatty (lipophilic) or water-loving (hydrophilic) compounds.',
                'In der botanischen Extraktion unterscheiden sich drei Lösungsmittelfamilien durch ihre Polarität — ihre Affinität zu fettliebenden (lipophilen) oder wasserliebenden (hydrophilen) Stoffen.'
              )}
            </p>
          </div>

          {/* Cartes Polarité */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">{tr("Très Polaire : L'Eau", 'Highly Polar: Water', 'Stark polar: Wasser')}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tr(
                  'Affinité exclusive pour les composés hydrophiles : minéraux, mucilages, sucres complexes et certains flavonoïdes.',
                  'High affinity for hydrophilic molecules: minerals, mucilage, polysaccharides and polar flavonoids.',
                  'Hohe Affinität für hydrophile Verbindungen: Mineralstoffe, Schleimstoffe, komplexe Zucker und polare Flavonoide.'
                )}
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {tr('Hydrophile', 'Hydrophilic', 'Hydrophil')}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">{tr("Apopolaire : L'Huile", 'Non-Polar: Oil', 'Unpolar: Öl')}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tr(
                  'Affinité pour les lipides végétaux, huiles essentielles, caroténoïdes, cires et phytostérols protecteurs.',
                  'Draws botanical lipids, aromatic essential oils, carotenoids, waxes and protective phytosterols.',
                  'Löst Pflanzenlipide, ätherische Öle, Carotinoide, Wachse und schützende Phytosterole.'
                )}
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {tr('Lipophile', 'Lipophilic', 'Lipophil')}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Beaker className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#3E4A3D] text-base">{tr("Amphiphile : L'Alcool", 'Amphiphilic: Alcohol', 'Amphiphil: Alkohol')}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tr(
                  'Double affinité grâce à sa chaîne carbonée et son groupement hydroxyle. Dissout résines, alcaloïdes et polyphénols.',
                  'Dual affinity via its carbon chain and hydroxyl group. Dissolves resins, alkaloids and polyphenols.',
                  'Doppelte Affinität durch Kohlenstoffkette und Hydroxylgruppe. Löst Harze, Alkaloide und Polyphenole.'
                )}
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {tr('Hydroalcoolique', 'Hydroalcoholic', 'Hydroalkoholisch')}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: L'EAU : LE SOLVANT UNIVERSEL DE LA VIE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr("L'Eau : Le solvant universel de la vie", 'Water: The universal solvent of life', 'Wasser: Das universelle Lösungsmittel des Lebens')}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr("L'infusion à l'eau est la méthode la plus courante. Elle permet d'extraire les ", 'Water infusion is the most common method. It extracts ', 'Der wässrige Aufguss ist die bekannteste Methode und löst ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('molécules hydrosolubles', 'water-soluble molecules', 'wasserlösliche Moleküle')}</strong>{' '}
              {tr(': sels minéraux, tanins, mucilages, flavonoïdes polaires, polysaccharides.', ': mineral salts, tannins, mucilage, polar flavonoids and polysaccharides.', ': Mineralstoffe, Gerbstoffe, Schleimstoffe, polare Flavonoide und Polysaccharide.')}
            </p>
            <p>
              {tr(
                'Avec le BloomLab, vous maîtrisez la température pour ne pas "brûler" les actifs fragiles. Une extraction à 42–45°C préserve les composés thermolabiles que l\'eau bouillante détruirait.',
                'With BloomLab, you control temperature precisely so delicate fractions are never scorched. Extraction at 42–45°C preserves heat-sensitive compounds that boiling destroys.',
                'Mit BloomLab regulieren Sie die Temperatur exakt, sodass empfindliche Stoffe nicht verbrennen. Eine Extraktion bei 42–45°C bewahrt wärmesensible Bestandteile.'
              )}
            </p>
          </div>

          {/* Grille Ce que l'eau extrait / n'extrait pas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{tr("Ce que l'eau extrait", 'What water extracts', 'Was Wasser löst')}</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-[#3E4A3D]">{tr('Minéraux & oligo-éléments', 'Bioavailable minerals & trace elements', 'Bioverfügbare Mineralien & Spurenelemente')}</strong> {tr('biodisponibles (silice, potassium, fer)', '(silica, potassium, iron)', '(Kieselsäure, Kalium, Eisen)')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Mucilages adoucissants', 'Soothing plant mucilage', 'Beruhigende Schleimstoffe')}</strong> {tr('(guimauve, mauve, graines de lin)', '(marshmallow root, mallow, flaxseed)', '(Eibisch, Malve, Leinsamen)')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Tanins hydrosolubles', 'Water-soluble tannins', 'Wasserlösliche Gerbstoffe')}</strong> {tr('et acides phénoliques', 'and phenolic acids', 'und Phenolsäuren')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Flavonoïdes hydrosolubles', 'Water-soluble flavonoids', 'Wasserlösliche Flavonoide')}</strong> {tr('et anthocyanes', 'and anthocyanins', 'und Anthocyane')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Glycosides & polysaccharides', 'Glycosides & polysaccharides', 'Glykoside & Polysaccharide')}</strong> {tr("stimulants de l'immunité", 'supporting natural defenses', 'zur Unterstützung der natürlichen Abwehrkräfte')}</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#C8AB8A] font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-[#C8AB8A]" />
                <span>{tr("Ce que l'eau n'extrait pas", 'What water cannot extract', 'Was Wasser nicht löst')}</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-[#3E4A3D]">{tr('Huiles essentielles', 'Essential oils', 'Ätherische Öle')}</strong> {tr("(volatiles, évaporées par l'ébullition classique)", '(volatile, lost during open boiling)', '(flüchtig, verdampfen beim Kochen)')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Résines', 'Resins', 'Harze')}</strong> {tr("insolubles dans l'eau (boswellia, myrrhe)", 'insoluble in water (boswellia, myrrh)', 'wasserunlöslich (Boswellia, Myrrhe)')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Alcaloïdes lipophiles', 'Lipophilic alkaloids', 'Lipophile Alkaloide')}</strong> {tr('non ionisés', 'in neutral form', 'in ungeladener Form')}</li>
                <li><strong className="text-[#3E4A3D]">{tr('Caroténoïdes & terpènes', 'Carotenoids & terpenes', 'Carotinoide & Terpene')}</strong> {tr('protecteurs cellulaires', 'fat-soluble antioxidants', 'fettlösliche Schutzstoffe')}</li>
              </ul>
            </div>
          </div>

          {/* Sous-section: La pureté de l'eau */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE]/50 border border-[#D8CBB7] space-y-4">
            <div className="flex items-center gap-2 text-[#A8B8A0] font-bold text-base sm:text-lg">
              <Droplets className="w-5 h-5 text-[#A8B8A0]" />
              <h3>{tr("La pureté de l'eau : un critère sous-estimé", 'Water purity: an overlooked parameter', 'Wasserreinheit: Ein oft unterschätzter Faktor')}</h3>
            </div>
            
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {tr("La qualité de l'eau est ", 'Water quality is ', 'Die Wasserqualität ist ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('un paramètre déterminant', 'a decisive factor', 'ein entscheidender Faktor')}</strong>{' '}
              {tr('pour la qualité du produit fini. Le distillateur doit employer de préférence une eau de source sans impureté, sans substance préjudiciable, peu ou pas calcaire, et ', 'for final extract stability. Prefer low-mineral spring or purified water free of limescale and ', 'für die Stabilität des fertigen Auszugs. Ideal ist weiches, reines Quellwasser ohne Kalk und ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('sans adjonction de chlore', 'free of added chlorine', 'ohne Chlorzusatz')}</strong>{' '}
              {tr("comme dans l'eau courante afin que l'extraction soit la plus pure possible.", 'found in municipal tap water so extraction remains clean.', 'wie im Leitungswasser, damit die Extraktion möglichst rein gelingt.')}
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#A8B8A0]">
                {tr('Pour vos extractions BloomLab, privilégiez :', 'Recommended water types for BloomLab:', 'Empfohlene Wasserarten für BloomLab:')}
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B8A0] mt-2 shrink-0" />
                  <span><strong className="text-[#3E4A3D]">{tr('Eau distillée extra pure', 'Ultra-pure distilled water', 'Reinstes destilliertes Wasser')}</strong> : {tr('conductivité < 1,25 μS/cm, pH 5,50–7,50, absence de chlorures, fluorures, sulfates, nitrates et métaux lourds.', 'conductivity < 1.25 μS/cm, pH 5.5–7.5, free of chlorides, sulfates, nitrates and heavy metals.', 'Leitfähigkeit < 1,25 μS/cm, pH 5,5–7,5, frei von Chloriden, Sulfaten, Nitraten und Schwermetallen.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B8A0] mt-2 shrink-0" />
                  <span><strong className="text-[#3E4A3D]">{tr('Eau déminéralisée', 'Demineralized water', 'Demineralisiertes Wasser')}</strong> : {tr("obtenue par échange d'ions, plus pure en minéraux mais pouvant contenir des bactéries si non filtrée.", 'ion-exchange purified, low in dissolved solids; ensure microbiological freshness.', 'über Ionenaustausch gereinigt, mineralarm; auf hygienische Frische achten.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B8A0] mt-2 shrink-0" />
                  <span><strong className="text-[#3E4A3D]">{tr('Eau de source faiblement minéralisée', 'Low-mineral spring water', 'Mineralarmes Quellwasser')}</strong> {tr('(résidu sec < 50 mg/L) : certains travaux montrent que les eaux minérales naturelles peuvent offrir de meilleurs rendements d\'extraction que l\'eau distillée pour certains polyphénols.', '(dry residue < 50 mg/L): ideal mineral balance supporting clean polyphenol extraction.', '(Trockenrückstand < 50 mg/L): unterstützt eine ausgewogene Polyphenol-Extraktion.')}</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs sm:text-sm text-slate-700 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E4A3D]">{tr('La règle Bloom :', 'The Bloom rule:', 'Die Bloom-Regel:')}</strong>{' '}
                {tr(
                  "utilisez toujours une eau dont vous connaissez la composition. L'eau du robinet, même filtrée, contient du chlore et des traces de métaux qui peuvent interférer avec les principes actifs et oxyder prématurément le totum.",
                  'always use water with known mineral composition. Unfiltered tap water carries chlorine and trace metals that can oxidize delicate botanical compounds.',
                  'Verwenden Sie stets Wasser mit bekannter Zusammensetzung. Leitungswasser enthält oft Chlor und Spurenmetalle, die empfindliche Pflanzenstoffe oxidieren können.'
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: L'HUILE : SOINS, GASTRONOMIE ET TRANSPORT TRANSDERMIQUE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr("L'Huile : Pour les soins, la gastronomie — et le transport transdermique", 'Oil: For skin care, culinary use — and dermal delivery', 'Öl: Für Pflege, Kulinarik — und transdermale Aufnahme')}
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            <p>
              {tr('Le macérat huileux est idéal pour extraire les ', 'Oil maceration excels at drawing ', 'Ölmazerate eignen sich ideal für ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('molécules liposolubles', 'fat-soluble molecules', 'fettlösliche Moleküle')}</strong>{' '}
              {tr(': huiles essentielles, caroténoïdes, terpènes, résines. C\'est la base de vos baumes cosmétiques et de vos huiles gastronomiques.', ': volatile oils, carotenoids, terpenes and resins — forming the base of balms and culinary oils.', ': ätherische Öle, Carotinoide, Terpene und Harze — die Grundlage für Balsame und Feinkostöle.')}
            </p>
            <p>
              {tr('Mais ', 'Yet ', 'Doch ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr("l'huile joue un rôle bien plus important que la simple extraction", 'oil plays a deeper role than extraction alone', 'Öl übernimmt weit mehr als nur die Extraktion')}</strong>.{' '}
              {tr("En application cutanée, c'est elle qui ", 'In topical care, it gently ', 'Bei äußerer Anwendung ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('transporte les principes actifs à travers les couches de la peau', 'carries botanical compounds through the outer skin barrier', 'transportiert es die Wirkstoffe gezielt in die oberen Hautschichten')}</strong>{' '}
              {tr("— de l'épiderme jusqu'au derme — où se trouve la réparation réelle. Cette fonction de ", 'toward deeper skin layers. This role as a ', 'bis in tiefere Hautregionen. Diese Rolle als ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('vecteur transdermique', 'dermal carrier', 'transdermaler Träger')}</strong>{' '}
              {tr('est un acteur majeur du remède, au même titre que les principes actifs eux-mêmes.', 'is as important as the botanical extract itself.', 'ist für das Pflegeergebnis ebenso wichtig wie die Pflanze selbst.')}
            </p>
          </div>

          {/* Sous-section: Le mécanisme de pénétration cutanée */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C8AB8A]" />
              <span>{tr('Le mécanisme de pénétration cutanée', 'How dermal lipid transport works', 'Wie die Aufnahme über die Haut funktioniert')}</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {tr('La peau est une barrière lipidique. Les huiles végétales, par leur composition en acides gras, ', 'The skin is a lipid-rich barrier. Through their fatty acid profile, botanical carrier oils ', 'Die Haut ist eine Lipidbarriere. Pflanzenöle machen dank ihres Fettsäureprofils die Lipide des ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('fluidisent les lipides du stratum corneum', 'soften stratum corneum lipids', 'Stratum corneum geschmeidig')}</strong>{' '}
              {tr("— la couche la plus externe de l'épiderme — et créent des voies de passage pour les actifs.", '— the outermost epidermal layer — improving surface diffusion.', '— der äußersten Hautschicht — und erleichtern die Aufnahme.')}
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {tr('Certaines huiles vont plus loin : elles ', 'Specific oils even ', 'Einzelne Öle gehen noch weiter: Sie ')}{' '}
              <strong className="font-semibold text-[#3E4A3D]">{tr('perturbent de manière réversible les lamelles lipidiques', 'reversibly fluidize outer lipid lamellae', 'lockern reversibel die äußeren Lipidlamellen')}</strong>{' '}
              {tr('de la barrière cutanée, augmentant le flux de pénétration des principes actifs.', 'to enhance topical absorption of lipophilic plant compounds.', 'und verbessern so den Transport fettlöslicher Pflanzenstoffe.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#3E4A3D]">{tr("Huile d'Argan", 'Argan Oil', 'Arganöl')}</span>
                <p className="text-xs text-slate-600">
                  {tr("43–49% d'acide oléique (oméga-9). Agit comme un enhancer de pénétration en assouplissant la barrière cutanée.", '43–49% oleic acid (Omega-9). Softens the outer barrier to aid lipid absorption.', '43–49 % Ölsäure (Omega-9). Macht die Hautbarriere geschmeidig für bessere Aufnahme.')}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#3E4A3D]">{tr('Huile de Jojoba', 'Jojoba Oil', 'Jojobaöl')}</span>
                <p className="text-xs text-slate-600">
                  {tr('Affinité exceptionnelle avec le sébum humain (25% de cérides identiques). Pénètre en profondeur sans boucher les pores.', 'Close structural affinity to skin sebum (liquid wax esters). Absorbs cleanly without clogging pores.', 'Hohe Verwandtschaft mit dem Hauttalg (flüssiges Wachs). Zieht tief ein, ohne zu verstopfen.')}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-1.5">
                <span className="text-xs font-bold text-[#3E4A3D]">{tr('Coco Fractionnée (MCT)', 'Fractionated Coconut (MCT)', 'Fraktioniertes Kokosöl (MCT)')}</span>
                <p className="text-xs text-slate-600">
                  {tr('Triglycérides à chaîne moyenne. Pénétration instantanée et perméation facilitée pour les molécules lipophiles.', 'Medium-chain triglycerides. Ultra-light feel with fast absorption for lipophilic infusions.', 'Mittelkettige Triglyceride. Zieht sofort ein, ideal als leichter Träger für Ölauszüge.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RÉPERTOIRE DES HUILES SELON LE RÉSULTAT RECHERCHÉ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">4</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
              {tr('Répertoire des huiles selon le résultat recherché', 'Carrier oil directory by desired feel & care goal', 'Öl-Verzeichnis nach Pflegeziel')}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
            {tr(
              "Chaque huile végétale possède une carte d'identité biochimique unique. Sélectionnez votre huile de support en fonction de sa profondeur de pénétration et des besoins de votre terrain.",
              'Every botanical oil carries a unique fatty acid signature. Select your carrier oil according to absorption speed and skin needs.',
              'Jedes Pflanzenöl besitzt ein eigenes Fettsäureprofil. Wählen Sie Ihr Trägeröl passend zu Einziehverhalten und Hautbedürfnis.'
            )}
          </p>

          {/* TABLEAU 1: Huiles de pénétration rapide */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C8AB8A]" />
                <span>{tr("1. Huiles de pénétration rapide (vecteurs d'actifs)", '1. Fast-absorbing oils (dry-touch carriers)', '1. Schnell einziehende Öle (leichte Trägeröle)')}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500 uppercase">{tr('Usage : Sérums & Pénétration Cutanée', 'Use: Serums & Light Topical Care', 'Anwendung: Seren & leichte Hautpflege')}</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3.5 sm:p-4">{tr('Huile', 'Oil', 'Öl')}</th>
                    <th className="p-3.5 sm:p-4">{tr('Acides gras clés', 'Key lipids', 'Wichtige Lipide')}</th>
                    <th className="p-3.5 sm:p-4">{tr('Pénétration', 'Absorption', 'Einziehverhalten')}</th>
                    <th className="p-3.5 sm:p-4">{tr('Résultat recherché', 'Cosmetic focus', 'Pflegefokus')}</th>
                    <th className="p-3.5 sm:p-4">{tr('Terrain', 'Profile', 'Hauttyp')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Jojoba', 'Jojoba', 'Jojoba')}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">{tr('Cérides (similaires au sébum)', 'Wax esters (sebum-like)', 'Wachsester (talgähnlich)')}</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">{tr('Très profonde (33% dans le stratum corneum)', 'Deep & silky into outer epidermis', 'Tief einziehend, seidiges Finish')}</td>
                    <td className="p-3.5 sm:p-4">{tr('Régulation du sébum, acné, peaux mixtes', 'Balancing oily or combination skin', 'Ausgleichend für Misch- & ölige Haut')}</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">{tr('Tous terrains, surtout gras', 'All types, especially oily', 'Alle Hauttypen, v. a. ölig')}</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Pépins de raisin', 'Grapeseed', 'Traubenkern')}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">{tr('90% acides gras insaturés', '90% unsaturated fatty acids', '90 % ungesättigte Fettsäuren')}</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">{tr('Rapide, non grasse', 'Fast, dry finish', 'Schnell, nicht fettend')}</td>
                    <td className="p-3.5 sm:p-4">{tr('Peaux mixtes à grasses, anti-âge', 'Combination skin, antioxidant care', 'Mischhaut, antioxidative Pflege')}</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[11px]">{tr('Pitta, peaux réactives', 'Reactive skin', 'Empfindliche Haut')}</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr("Noyau d'abricot", 'Apricot Kernel', 'Aprikosenkern')}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">{tr('Oméga-9, vitamine A', 'Omega-9, Vitamin A', 'Omega-9, Vitamin A')}</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">{tr('Rapide, non grasse', 'Light, radiant finish', 'Schnell einziehend, leicht')}</td>
                    <td className="p-3.5 sm:p-4">{tr('Peaux matures, ternes, fatiguées', 'Dull or tired skin radiance', 'Frische für müde, reife Haut')}</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">{tr('Vata, peaux sèches', 'Dry skin', 'Trockene Haut')}</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Argan', 'Argan', 'Argan')}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">{tr('43–49% acide oléique', '43–49% oleic acid', '43–49 % Ölsäure')}</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">{tr('Rapide, non grasse', 'Fast & supple', 'Schnell, geschmeidig')}</td>
                    <td className="p-3.5 sm:p-4">{tr('Anti-âge, psoriasis, eczéma', 'Elasticity & barrier comfort', 'Elastizität & Hautkomfort')}</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">{tr('Tous terrains', 'All skin types', 'Alle Hauttypen')}</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Coco fractionnée', 'Fractionated Coconut', 'Fraktioniertes Kokosöl')}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600">{tr('MCT (acide laurique)', 'MCT lipids', 'MCT-Lipide')}</td>
                    <td className="p-3.5 sm:p-4 font-medium text-emerald-800">{tr('Très rapide, non grasse', 'Instant dry feel', 'Sehr schnell, nicht fettend')}</td>
                    <td className="p-3.5 sm:p-4">{tr('Hydratation, barrière cutanée', 'Moisture retention & softness', 'Feuchtigkeitsschutz & Geschmeidigkeit')}</td>
                    <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">{tr('Tous terrains', 'All skin types', 'Alle Hauttypen')}</span></td>
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
                  <h3 className="text-base sm:text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#C8AB8A]" />
                    <span>{tr('2. Huiles de nutrition profonde (réparation)', '2. Deeply nourishing oils (barrier support)', '2. Tiefennährende Öle (Barrierepflege)')}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">{tr('Usage : Baumes & Barrière Protectrice', 'Use: Balms & Protective Barrier', 'Anwendung: Balsame & Schutzbarriere')}</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">{tr('Huile', 'Oil', 'Öl')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Acides gras clés', 'Key fatty acids', 'Wichtige Fettsäuren')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Pénétration', 'Absorption', 'Einziehverhalten')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Résultat recherché', 'Cosmetic focus', 'Pflegefokus')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Terrain', 'Profile', 'Hauttyp')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Rose musquée', 'Rosehip', 'Hagebuttenkern')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Oméga-3, 6, 9', 'Omega-3, 6, 9', 'Omega-3, 6, 9')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">{tr('Profonde, régénérante', 'Deep, replenishing', 'Tief, regenerierend')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Cicatrices, vergetures, rides, taches', 'Skin texture, tone & elasticity', 'Hautstruktur, Ebenmäßigkeit & Elastizität')}</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">{tr('Vata, peaux matures', 'Dry or mature skin', 'Trockene, reife Haut')}</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Avocat', 'Avocado', 'Avocado')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Acide palmitoléique', 'Palmitoleic acid', 'Palmitoleinsäure')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">{tr('Profonde, nourrissante', 'Deep, rich feel', 'Tief, reichhaltig')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Peaux sèches, sensibles, matures', 'Dry, delicate & mature skin', 'Trockene, sensible, reife Haut')}</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">{tr('Vata', 'Dry skin', 'Trockene Haut')}</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Sésame', 'Sesame', 'Sesam')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Acide linoléique, vitamine E', 'Linoleic acid, vitamin E', 'Linolsäure, Vitamin E')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">{tr('Profonde, protectrice', 'Deep, protective', 'Tief, schützend')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Massages ayurvédiques, réchauffant', 'Ayurvedic-style warming massage', 'Wärmende Körpermassagen')}</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">{tr('Vata', 'Dry skin', 'Trockene Haut')}</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Amande douce', 'Sweet Almond', 'Süßmandel')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Oméga-9, vitamine E', 'Omega-9, vitamin E', 'Omega-9, Vitamin E')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">{tr('Profonde, émolliente', 'Deep, emollient', 'Tief, geschmeidig')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Peaux sèches, irritées, bébés', 'Soothing softness for delicate skin', 'Sanfte Pflege für empfindliche Haut')}</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">{tr('Tous terrains', 'All skin types', 'Alle Hauttypen')}</span></td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Ricin', 'Castor', 'Rizinus')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Acide ricinoléique', 'Ricinoleic acid', 'Rizinolsäure')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-amber-800">{tr('Profonde, mais visqueuse', 'Rich & viscous', 'Tief, zähflüssig')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Cheveux, cils, ongles, peau très sèche', 'Hair, lashes, nails & very dry areas', 'Haare, Wimpern, Nägel & sehr trockene Haut')}</td>
                        <td className="p-3.5 sm:p-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px]">{tr('Vata', 'Very dry skin', 'Sehr trockene Haut')}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLEAU 3: Huiles à action spécifique */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#3E4A3D] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8AB8A]" />
                    <span>{tr('3. Huiles à action spécifique', '3. Targeted botanical oils', '3. Spezialisierte Pflegeöle')}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">{tr('Usage : Soins Ciblés', 'Use: Targeted Topical Care', 'Anwendung: Gezielte Pflege')}</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">{tr('Huile', 'Oil', 'Öl')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Action principale', 'Key characteristic', 'Haupteigenschaft')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Usage & Indications', 'Traditional cosmetic uses', 'Traditionelle Anwendung')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Calophylle (Inophyle)', 'Tamanu (Calophyllum)', 'Tamanu (Calophyllum)')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Apaisante intense, tonique cutané', 'Soothing lipid richness & skin tonicity', 'Intensiv pflegend & hauttonisierend')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Derme profond, massages des jambes et zones articulaires', 'Deep topical massage for tired legs & joint comfort', 'Tiefe Massagen für Beine & beanspruchte Gelenkzonen')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Macadamia', 'Macadamia', 'Macadamia')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Pénétration dermique et confort cellulaire', 'Smooth dermal absorption & lipid replenishment', 'Gute Aufnahme & Rückfettung der Hautbarriere')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Massages tonifiants, soins peaux matures et déshydratées', 'Toning massage, dry or dehydrated skin care', 'Tonisierende Massagen, trockene & reife Haut')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Noisette', 'Hazelnut', 'Haselnuss')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Astringente, pénétrante, équilibrante', 'Balancing, fast-absorbing & dry touch', 'Ausgleichend, schnell einziehend')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Peaux mixtes à grasses, confort des peaux réactives', 'Combination to oily skin & delicate facial blends', 'Misch- bis ölige Haut & ausgleichende Gesichtspflege')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-[#3E4A3D]">{tr('Millepertuis (macérat)', "St. John's Wort (macerate)", 'Johanniskraut (Mazerat)')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Apaisante cutanée (hyperforine liposoluble)', 'Traditional soothing botanical oil (lipophilic extract)', 'Traditionell hautberuhigendes Mazerat (lipophile Auszüge)')}</td>
                        <td className="p-3.5 sm:p-4">{tr('Massages musculaires, après-soleil doux (photosensibilisant : usage soir uniquement)', 'Soothing evening body massage (photosensitizing: avoid sun exposure)', 'Wohltuende Abendmassagen (photosensibilisierend: Sonne meiden)')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sous-section: Comment choisir son huile vectrice */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D]">
                  {tr('Comment choisir son huile vectrice en pratique', 'How to Choose Your Carrier Oil in Practice', 'So wählen Sie Ihr Trägeröl in der Praxis')}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                  {tr("Le choix de l'huile pour un soin topique dépend de ", 'Selecting the right oil for a topical preparation depends on ', 'Die Wahl des passenden Öls für eine topische Zubereitung hängt von ')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('trois critères clés', 'three key criteria', 'drei Kernkriterien')}</strong> :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A8B8A0] text-[#0F261E] text-xs font-bold">1</span>
                    <h4 className="font-bold text-[#3E4A3D] text-sm">{tr('Le terrain de la personne', 'Skin & user profile', 'Haut- & Anwendungstyp')}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tr(
                        "Une peau réactive ou mixte préférera des huiles légères et sèches (jojoba, pépins de raisin). Une peau sèche ou mature appréciera des huiles plus nourrissantes (sésame, avocat, rose musquée).",
                        'Reactive or combination skin prefers light, dry-touch oils (jojoba, grapeseed). Dry or mature skin benefits from richer nourishing oils (sesame, avocado, rosehip).',
                        'Empfindliche oder Mischhaut bevorzugt leichte Öle (Jojoba, Traubenkern). Trockene oder reife Haut schätzt reichhaltigere Öle (Sesam, Avocado, Hagebuttenkern).'
                      )}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A8B8A0] text-[#0F261E] text-xs font-bold">2</span>
                    <h4 className="font-bold text-[#3E4A3D] text-sm">{tr('Le résultat recherché', 'Desired skin finish', 'Gewünschtes Pflegegefühl')}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tr(
                        "Pour une pénétration rapide d'actifs, choisissez des huiles fines (jojoba, argan, pépins de raisin). Pour un confort durable et un effet protecteur, privilégiez des huiles riches (rose musquée, avocat, sésame).",
                        'For fast serum absorption, pick fine oils (jojoba, argan, grapeseed). For a cocooning protective barrier, choose richer oils (rosehip, avocado, sesame).',
                        'Für schnelles Einziehen eignen sich leichte Öle (Jojoba, Argan, Traubenkern). Für langanhaltenden Schutz greifen Sie zu reichhaltigen Ölen (Hagebutte, Avocado, Sesam).'
                      )}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] space-y-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A8B8A0] text-[#0F261E] text-xs font-bold">3</span>
                    <h4 className="font-bold text-[#3E4A3D] text-sm">{tr('La synergie avec les actifs', 'Synergy with botanicals', 'Synergie mit Pflanzenstoffen')}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tr(
                        "Certaines huiles potentialisent la solubilisation de composés spécifiques grâce à leurs acides gras (ex : coco fractionnée ou jojoba) pour les préparations lipophiles.",
                        'Certain carrier oils enhance the solubility and skin spread of lipophilic plant fractions thanks to their specific fatty acid structures.',
                        'Bestimmte Trägeröle fördern durch ihr Fettsäureprofil die Löslichkeit und Verteilung fettlöslicher Pflanzenfraktionen auf der Haut.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: L'ALCOOL : POUR LES RÉSINES ET LES ALCALOÏDES */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">5</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
                  {tr("L'Alcool : Pour les résines et les alcaloïdes", 'Alcohol: For Resins & Alkaloids', 'Alkohol: Für Harze & Alkaloide')}
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                <p>
                  {tr("L'alcool permet d'extraire une gamme plus large d'actifs, notamment les ", 'Alcohol captures a broad spectrum of plant compounds, notably ', 'Alkohol erschließt ein breites Spektrum an Pflanzenstoffen, darunter ')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('résines', 'resins', 'Harze')}</strong>, {tr('les ', '', '')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('alcaloïdes', 'alkaloids', 'Alkaloide')}</strong> {tr('et certains ', 'and ', 'sowie bestimmte ')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('glycosides', 'glycosides', 'Glykoside')}</strong> {tr("que l'eau ne peut pas dissoudre. C'est la base de ce qu'on appelle traditionnellement les ", 'that pure water cannot dissolve. It is the foundation of traditional ', 'die reines Wasser nicht lösen kann. Das bildet die Grundlage traditioneller ')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('teintures mères', 'mother tinctures', 'Urtinkturen')}</strong>.
                </p>
              </div>

              {/* HISTOIRE DE TU YOUYOU */}
              <div 
                className="p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/10"
                style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
              >
                <FlaskConical className="absolute top-[-30px] right-[-30px] w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tr('Leçon de Pharmacognosie & Prix Nobel', 'Pharmacognosy & Nobel Prize Lesson', 'Pharmakognosie & Nobelpreis-Lektion')}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {tr("Le solvant de Tu Youyou : l'éther éthylique", "Tu Youyou's Solvent Discovery: Low-Temperature Extraction", 'Tu Youyous Lösungsmittel-Durchbruch: Niedrigtemperatur')}
                  </h3>

                  <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
                    {tr("Tu Youyou n'a pas utilisé l'alcool éthylique pour extraire l'artémisinine. Elle a utilisé ", 'Tu Youyou did not rely on boiling ethanol to isolate artemisinin. She turned to ', 'Tu Youyou verwendete für Artemisinin kein heißes Ethanol, sondern ')}
                    <strong className="font-semibold text-white">{tr("l'éther éthylique", 'ethyl ether', 'Diethylether')}</strong> — {tr("un solvant dont le point d'ébullition est de ", 'a solvent boiling at just ', 'ein Lösungsmittel mit einem Siedepunkt von nur ')}
                    <strong className="font-semibold text-white">35°C</strong>{tr(", contre 78°C pour l'éthanol et 100°C pour l'eau.", ', compared with 78°C for ethanol and 100°C for water.', ' – gegenüber 78°C bei Ethanol und 100°C bei Wasser.')}
                  </p>

                  <div className="space-y-2 pt-2 text-sm sm:text-base text-white/85">
                    <p className="font-semibold text-[#C8AB8A]">{tr('Pourquoi ce choix fondamental ?', 'Why was this choice decisive?', 'Warum war diese Wahl so entscheidend?')}</p>
                    <ul className="space-y-2 list-disc pl-5 font-light">
                      <li>
                        {tr("Parce que l'artémisinine est ", 'Because artemisinin is ', 'Weil Artemisinin ')}
                        <strong className="font-semibold text-white">{tr('hautement thermolabile', 'highly heat-sensitive', 'äußerst hitzeempfindlich')}</strong> : {tr('toute température élevée détruit son pont endoperoxyde, responsable de sa structure active.', 'excess heat destroys its delicate endoperoxide bridge.', 'ist: Hohe Temperaturen zerstören seine empfindliche Endoperoxid-Brücke.')}
                      </li>
                      <li>
                        {tr("En s'inspirant d'un manuel chinois du IVe siècle (Ge Hong préconisait de presser la plante dans de l'eau fraîche plutôt que de la faire bouillir), elle a compris que la chaleur dégradait l'extrait.", 'Inspired by a 4th-century Chinese text by Ge Hong advising cold pressing rather than boiling, she realized high heat degraded the plant extract.', 'Inspiriert von einer chinesischen Schrift des 4. Jahrhunderts (Ge Hong empfahl kaltes Auspressen statt Kochen) erkannte sie den thermischen Abbau.')}
                      </li>
                      <li>
                        {tr("En abaissant la température d'extraction à 35°C grâce à un solvant à bas point d'ébullition, elle a extrait la molécule intacte — une découverte qui lui a valu le ", 'By lowering extraction to 35°C, she preserved the molecule intact — an achievement awarded the ', 'Durch das Absenken der Extraktion auf 35°C blieb das Molekül intakt — ausgezeichnet mit dem ')}
                        <strong className="font-semibold text-white">{tr('Prix Nobel de physiologie ou médecine en 2015', '2015 Nobel Prize in Physiology or Medicine', 'Nobelpreis für Physiologie oder Medizin 2015')}</strong>.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-white/95 mt-4">
                    <strong className="text-[#C8AB8A]">{tr("La leçon Bloom pour la pratique domestique :", 'The Bloom takeaway for home practice:', 'Die Bloom-Erkenntnis für zu Hause:')}</strong> {tr("la température est tout aussi déterminante que le solvant. Dans BloomLab®, on travaille exclusivement à l'eau purifiée, à l'huile vierge ou à la glycérine/vinaigre sans chauffage d'alcool : par sécurité électrique domestique, toute extraction alcoolique (45–85°) reste suspendue dans la cuve chauffante et se réalise uniquement à froid en bocal fermé.", 'temperature matters just as much as solvent polarity. In BloomLab®, heated extractions use water, virgin oil, glycerin, or cider vinegar only — never heated alcohol inside the electrical chamber.', 'Die Temperatur ist ebenso entscheidend wie das Lösungsmittel. In der BloomLab® werden ausschließlich Wasser, Öl, Glycerin oder Essig erwärmt — Alkohol wird aus Sicherheitsgründen nie im beheizten Gerät verwendet.')}
                  </div>
                </div>
              </div>

              {/* Tableau des titres alcooliques */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-bold text-[#3E4A3D]">
                  {tr('Les différents titres alcooliques selon la matière végétale', 'Alcohol Strengths by Botanical Part', 'Alkoholstärken nach Pflanzenteil')}
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-[#E7DFD3] bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                        <th className="p-3.5 sm:p-4">{tr('Titre alcoolique', 'Alcohol strength', 'Alkoholstärke')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Matière végétale ciblée', 'Target plant material', 'Ziel-Pflanzenmaterial')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Molécules extraites', 'Extracted compounds', 'Gelöste Stoffe')}</th>
                        <th className="p-3.5 sm:p-4">{tr('Exemples de plantes', 'Plant examples', 'Pflanzenbeispiele')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#C8AB8A]">{tr('Alcool 40°–45°', '40–45% ABV', '40–45 % Vol.')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#3E4A3D]">{tr('Fleurs délicates, feuilles fraîches, aromates', 'Delicate flowers, fresh leaves, aromatics', 'Zarte Blüten, frische Blätter, Aromapflanzen')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Flavonoïdes, acides phénoliques, composés aromatiques volatils', 'Flavonoids, phenolic acids, volatile aromatics', 'Flavonoide, Phenolsäuren, flüchtige Aromastoffe')}</td>
                        <td className="p-3.5 sm:p-4 italic">{tr('Mélisse, Menthe poivrée, Passiflore', 'Lemon Balm, Peppermint, Passionflower', 'Melisse, Pfefferminze, Passionsblume')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#C8AB8A]">{tr('Alcool 55°–60°', '55–60% ABV', '55–60 % Vol.')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#3E4A3D]">{tr('Racines, écorces, sommités denses', 'Roots, barks, dense aerial parts', 'Wurzeln, Rinden, dichte Pflanzenteile')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Alcaloïdes, hétérosides amers, tanins complexes', 'Alkaloids, bitter glycosides, complex tannins', 'Alkaloide, Bitterstoffglykoside, komplexe Gerbstoffe')}</td>
                        <td className="p-3.5 sm:p-4 italic">{tr('Gentiane, Salsepareille, Angélique', 'Gentian, Sarsaparilla, Angelica', 'Enzian, Sarsaparille, Engelwurz')}</td>
                      </tr>
                      <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-[#C8AB8A]">{tr('Alcool 70°–85°', '70–85% ABV', '70–85 % Vol.')}</td>
                        <td className="p-3.5 sm:p-4 font-medium text-[#3E4A3D]">{tr('Résines dures, gommes, graines dures, propolis', 'Hard resins, gums, tough seeds, propolis', 'Harte Harze, Gummen, harte Samen, Propolis')}</td>
                        <td className="p-3.5 sm:p-4 text-slate-600">{tr('Résines triterpéniques, acides boswelliques, huiles essentielles denses', 'Triterpene resins, boswellic acids, dense aromatics', 'Triterpenharze, Boswelliasäuren, dichte ätherische Öle')}</td>
                        <td className="p-3.5 sm:p-4 italic">{tr('Boswellia (Encens), Myrrhe, Clou de girofle', 'Boswellia, Myrrh, Clove', 'Weihrauch (Boswellia), Myrrhe, Gewürznelke')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: SOLVANTS ALTERNATIFS POUR TOUTE LA FAMILLE */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">6</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
                  {tr('Solvants alternatifs : Pour toute la famille', 'Alcohol-Free Alternatives: Glycerin & Cider Vinegar', 'Alkoholfreie Alternativen: Glycerin & Apfelessig')}
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
                      <h3 className="font-bold text-[#3E4A3D] text-lg">{tr('La Glycérine végétale', 'Vegetable Glycerin', 'Pflanzliches Glycerin')}</h3>
                      <span className="text-xs text-slate-500 font-mono">{tr('Macérats hydro-glycérinés', 'Hydro-glycerin macerates', 'Hydro-Glycerin-Mazerate')}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                    {tr(
                      "D'origine 100% végétale (colza, lin ou coco), la glycérine offre une saveur naturellement sucrée sans élever la glycémie et sans trace d'alcool.",
                      '100% plant-derived (rapeseed, flax, or coconut), glycerin delivers a naturally gentle sweet taste completely free of alcohol.',
                      'Zu 100 % pflanzlich (Raps, Lein oder Kokos) gewonnen, bietet Glycerin eine milde Süße ganz ohne Alkohol.'
                    )}
                  </p>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong className="text-[#3E4A3D]">{tr('Pour qui ?', 'Ideal for:', 'Für wen?')}</strong> {tr("Profils souhaitant éviter l'alcool (sur avis d'un professionnel de santé pour enfants ou grossesse).", 'Anyone seeking an alcohol-free extraction (seek medical advice for children or pregnancy).', 'Ideal für alkoholfreie Auszüge (bei Kindern oder Schwangerschaft vorab ärztlichen Rat einholen).')}</li>
                    <li><strong className="text-[#3E4A3D]">{tr('Cibles idéales :', 'Best targets:', 'Geeignete Pflanzenteile:')}</strong> {tr('Bourgeons frais (gemmothérapie), mucilages, tanins doux et flavonoïdes.', 'Fresh buds (gemmotherapy), mucilage, gentle tannins and flavonoids.', 'Frische Knospen (Gemmotherapie), Schleimstoffe, milde Gerbstoffe & Flavonoide.')}</li>
                    <li><strong className="text-[#3E4A3D]">{tr('Usage BloomLab :', 'BloomLab setting:', 'BloomLab-Einsatz:')}</strong> {tr('Chauffage doux à 40°C pour fluidifier sa viscosité naturelle sans altération.', 'Gentle heating at 40°C to lower viscosity smoothly without overheating.', 'Sanfte Erwärmung auf 40°C zur Verringerung der Zähflüssigkeit ohne Überhitzung.')}</li>
                  </ul>
                </div>

                {/* VINAIGRE DE CIDRE & OXYMELS */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3E4A3D] text-lg">{tr('Le Vinaigre de cidre bio', 'Organic Apple Cider Vinegar', 'Bio-Apfelessig')}</h3>
                      <span className="text-xs text-slate-500 font-mono">{tr('Vinaigres aromatiques & Oxymels', 'Botanical vinegars & Oxymels', 'Kräuteressige & Oxymels')}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                    {tr(
                      "Un solvant acide vivant (acide acétique, pH ~3) issu de la fermentation de pommes biologiques non pasteurisées.",
                      'A mild acidic solvent (acetic acid, pH ~3) produced from unpasteurized organic apple fermentation.',
                      'Ein mildes saures Lösungsmittel (Essigsäure, pH ~3) aus unpasteurisiert vergorenen Bio-Äpfeln.'
                    )}
                  </p>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong className="text-[#3E4A3D]">{tr('Affinité minérale :', 'Mineral affinity:', 'Mineralstoff-Affinität:')}</strong> {tr('Solubilise les minéraux (calcium, magnésium, fer) et aide à extraire certains alcaloïdes végétaux.', 'Helps solubilize plant minerals (calcium, magnesium, iron) and polar alkaloids.', 'Löst pflanzliche Mineralstoffe (Calcium, Magnesium, Eisen) und polare Alkaloide effektiv.')}</li>
                    <li><strong className="text-[#3E4A3D]">{tr("L'Oxymel traditionnel :", 'Traditional Oxymel:', 'Traditionelles Oxymel:')}</strong> {tr('Synergie culinaire ancestrale de vinaigre de cidre et de miel brut pour vos préparations saisonnières.', 'Time-honored culinary blend of cider vinegar and raw honey for seasonal herbal tonics.', 'Bewährte Mischung aus Apfelessig und Rohhonig für saisonale Kräuteransätze.')}</li>
                    <li><strong className="text-[#3E4A3D]">{tr('Usage BloomLab :', 'BloomLab setting:', 'BloomLab-Einsatz:')}</strong> {tr('Température modérée à 35–40°C pour préserver les enzymes naturelles du vinaigre.', 'Moderate 35–40°C cycle to protect raw vinegar enzymes and plant aromatics.', 'Moderate 35–40°C zum Schutz natürlicher Essigenzyme und feiner Aromen.')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: TABLEAU DE SYNTHÈSE COMPARATIF */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">7</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
                  {tr("Tableau de Synthèse : Les 5 Solvants d'Extraction Bloom", 'Summary Chart: The 5 Bloom Extraction Solvents', 'Übersichtstabelle: Die 5 Bloom-Extraktionslösungsmittel')}
                </h2>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-[#E7DFD3] bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#A8B8A0] text-[#0F261E] font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-4 sm:p-5">{tr('Solvant', 'Solvent', 'Lösungsmittel')}</th>
                      <th className="p-4 sm:p-5">{tr('Polarité', 'Polarity', 'Polarität')}</th>
                      <th className="p-4 sm:p-5">{tr('Actifs extraits', 'Extracted compounds', 'Gelöste Stoffe')}</th>
                      <th className="p-4 sm:p-5">{tr('Température BloomLab', 'BloomLab temp', 'BloomLab-Temp.')}</th>
                      <th className="p-4 sm:p-5">{tr("Rôle & Voie d'action", 'Role & Delivery', 'Rolle & Aufnahme')}</th>
                      <th className="p-4 sm:p-5">{tr('Conservation', 'Shelf life', 'Haltbarkeit')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3] text-slate-700">
                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#3E4A3D] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                        {tr('Eau de source', 'Spring water', 'Quellwasser')}
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">{tr('Très polaire', 'Highly polar', 'Stark polar')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Minéraux, mucilages, tanins, polysaccharides', 'Minerals, mucilage, tannins, polysaccharides', 'Mineralstoffe, Schleimstoffe, Gerbstoffe, Polysaccharide')}</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#C8AB8A]">{tr('42–45°C à 70–75°C', '42–45°C to 70–75°C', '42–45°C bis 70–75°C')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Voie orale immédiate, hydratation cellulaire', 'Immediate oral infusion, daily hydration', 'Sofortiger Aufguss, tägliche Hydration')}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{tr('Préparation fraîche au réfrigérateur (usage rapide)', 'Fresh refrigerated use (short-term)', 'Frisch gekühlt rasch verbrauchen')}</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#3E4A3D] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        {tr('Huile végétale', 'Carrier oil', 'Pflanzenöl')}
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">{tr('Apolaire (lipophile)', 'Non-polar (lipophilic)', 'Unpolar (lipophil)')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Huiles essentielles, caroténoïdes, résines', 'Essential oils, carotenoids, resins', 'Ätherische Öle, Carotinoide, Harze')}</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#C8AB8A]">45–50°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Vecteur cutané (derme profond), baumes', 'Topical carrier, serums & balms', 'Hautträgeröl für Seren & Balsame')}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{tr("Flacon ambré à l'abri de la lumière (jusqu'à rancissement)", 'Amber bottle away from heat/light', 'Lichtgeschützt bis zu Geruchsveränderung')}</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#3E4A3D] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                        {tr('Alcool bio (macération à froid uniquement)', 'Organic alcohol (cold maceration only)', 'Bio-Alkohol (nur Kaltmazeration)')}
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">{tr('Intermédiaire (bipolaire)', 'Intermediate (bipolar)', 'Intermediär (bipolar)')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Alcaloïdes, résines, principes amers', 'Alkaloids, resins, bitter principles', 'Alkaloide, Harze, Bitterstoffe')}</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#C8AB8A]">{tr('Ambiante (hors appareil)', 'Ambient only (no device heating)', 'Raumtemperatur (ohne Gerät)')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Macération traditionnelle en bocal fermé (suspendu dans BloomLab®)', 'Traditional jar maceration (suspended in BloomLab®)', 'Klassische Glasmazeration (in BloomLab® ausgesetzt)')}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{tr("Flacon opaque fermé, à l'abri de la chaleur", 'Sealed opaque bottle away from heat', 'Licht- und wärmegeschützt lagern')}</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#3E4A3D] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                        {tr('Glycérine végétale', 'Vegetable glycerin', 'Pflanzliches Glycerin')}
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">{tr('Polaire douce', 'Gentle polar', 'Mild polar')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Flavonoïdes, bourgeons, tanins', 'Flavonoids, buds, gentle tannins', 'Flavonoide, Knospen, milde Gerbstoffe')}</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#C8AB8A]">40°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Alternative sans alcool, gemmothérapie', 'Alcohol-free extracts & gemmotherapy', 'Alkoholfreie Auszüge & Gemmotherapie')}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{tr("Au frais à l'abri de la lumière (vérifier aspect)", 'Cool dark storage (inspect before use)', 'Kühl & dunkel lagern')}</td>
                    </tr>

                    <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#3E4A3D] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                        {tr('Vinaigre de cidre', 'Apple cider vinegar', 'Bio-Apfelessig')}
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs">{tr('Acide polaire', 'Acidic polar', 'Sauer polar')}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr("Minéraux, oligo-éléments, acétates d'alcaloïdes", 'Minerals, trace elements, botanical acetates', 'Mineralstoffe, Spurenelemente, Pflanzenacetate')}</td>
                      <td className="p-4 sm:p-5 font-mono font-semibold text-[#C8AB8A]">35–40°C</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tr('Cuisine botanique, toniques, oxymels', 'Botanical vinegar tonics & oxymels', 'Kräuteressig-Tonika & Oxymels')}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{tr('Flacon verre fermé au frais (vérifier odeur/aspect)', 'Sealed glass bottle in cool place', 'Kühl in verschlossener Glasflasche')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: LE SÉQUENÇAGE ACTIF A/B */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A8B8A0] text-[#0F261E] font-bold text-sm shrink-0">8</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E4A3D]">
                  {tr('Le Séquençage Actif A/B de BloomLab : La Révolution du Double Solvant', 'BloomLab Active A/B Sequencing: Dual-Solvent Precision', 'Aktive A/B-Sequenzierung mit BloomLab: Zwei-Phasen-Präzision')}
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                <p>
                  {tr('Pourquoi se limiter à un seul solvant quand la plante possède deux dimensions ?', 'Why stop at a single solvent when every whole plant contains two distinct polarities?', 'Warum sich auf ein Lösungsmittel beschränken, wenn jede Pflanze zwei Pole besitzt?')}
                </p>
                <p>
                  {tr(
                    "Une approche monofactorielle perd toujours la moitié du potentiel végétal : l'eau extrait les minéraux mais ignore les résines ; l'huile extrait les principes liposolubles mais laisse de côté les mucilages et polysaccharides protecteurs.",
                    'A single-solvent extraction captures only half the botanical spectrum: water draws out minerals yet leaves resins behind; oil captures lipophilic fractions yet misses water-soluble polysaccharides.',
                    'Ein einziger Auszug erfasst stets nur die Hälfte des Pflanzenspektrums: Wasser löst Mineralstoffe, lässt aber Harze zurück; Öl erfasst lipophile Fraktionen, übersieht jedoch wasserlösliche Polysaccharide.'
                  )}
                </p>
                <p>
                  {tr('Le ', 'The ', 'Die ')}
                  <strong className="font-semibold text-[#3E4A3D]">{tr('Séquençage Actif A/B', 'Active A/B Sequencing', 'Aktive A/B-Sequenzierung')}</strong> {tr('développé pour BloomLab résout ce paradoxe :', 'method developed for BloomLab bridges both phases cleanly:', 'von BloomLab löst dieses Problem elegant:')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider font-mono">
                    {tr('Phase A — Hydrosoluble (70–75°C)', 'Phase A — Water-Soluble (70–75°C)', 'Phase A — Wasserlöslich (70–75°C)')}
                  </span>
                  <h4 className="font-bold text-[#3E4A3D] text-base">{tr('Extraction de la matrice aqueuse', 'Aqueous Matrix Extraction', 'Extraktion der wässrigen Matrix')}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tr(
                      'Libération des minéraux, oligo-éléments, polysaccharides et flavonoïdes polaires dans une eau purifiée neutre.',
                      'Captures minerals, trace elements, polysaccharides, and polar flavonoids cleanly in purified water.',
                      'Löst Mineralstoffe, Spurenelemente, Polysaccharide und polare Flavonoide sauber in gereinigtem Wasser.'
                    )}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wider font-mono">
                    {tr('Phase B — Liposoluble (45–50°C)', 'Phase B — Oil-Soluble (45–50°C)', 'Phase B — Fettlöslich (45–50°C)')}
                  </span>
                  <h4 className="font-bold text-[#3E4A3D] text-base">{tr('Extraction du complexe lipophile', 'Lipophilic Complex Extraction', 'Extraktion des lipophilen Komplexes')}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tr(
                      'Capture douce des terpènes aromatiques, résines, cires et pigments dans une huile vierge protectrice (en BloomLab®) ; macération alcoolique à froid hors appareil uniquement.',
                      'Gently gathers aromatic terpenes, resins, waxes, and pigments in cold-pressed virgin oil (in BloomLab®); cold alcohol maceration outside the heated device only.',
                      'Nimmt aromatische Terpene, Harze, Wachse und Pigmente schonend in nativem Öl auf (in der BloomLab®); Alkoholauszüge nur kalt außerhalb des Geräts.'
                    )}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#C8AB8A]/20 space-y-3">
                <h4 className="font-extrabold text-[#3E4A3D] text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C8AB8A]" />
                  <span>{tr("L'union des deux phases : Le Totum Retrouvé", 'Uniting Both Phases: The Complete Totum', 'Beide Phasen vereint: Das vollständige Totum')}</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                  {tr(
                    "En combinant les phases A et B au moment optimal, vous obtenez une préparation qui respecte l'intégralité du profil phytochimique de la plante. Aucun déchet inutile, aucune dénaturation par surchauffe, une synergie maximale.",
                    'Combining Phases A and B yields a complete botanical preparation that respects the full phytochemical profile of the plant — zero thermal scorching and full spectrum harmony.',
                    'Durch die Kombination von Phase A und B erhalten Sie eine vollständige Pflanzenzubereitung, die das gesamte phytochemische Profil ohne Überhitzung bewahrt.'
                  )}
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#C8AB8A]">
                  {tr(
                    "« Votre corps n'est pas cassé. Il est verrouillé. Donnez-lui les bons vecteurs pour libérer sa pharmacie intérieure. »",
                    '"Your body is not broken — it is locked. Give it clean botanical carriers to support natural self-regulation."',
                    '„Ihr Körper ist nicht kaputt — er ist blockiert. Geben Sie ihm reine botanische Träger für seine innere Balance.“'
                  )}
                </p>
              </div>
            </section>

            {/* SECTION 9: CADRE ÉTHIQUE & SÉCURITÉ */}
            <section className="space-y-4">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD3] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{tr('Engagement Qualité & Prudence Légale', 'Quality Commitment & Educational Notice', 'Qualitätsanspruch & Rechtlicher Hinweis')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {tr(
                    "Les préparations et techniques d'extraction présentées sur Bloom Académie ont une vocation exclusivement pédagogique et éducative. Elles visent à soutenir l'homéostasie et le terrain biologique naturel. Elles ne constituent pas un diagnostic médical, ne remplacent en aucun cas la consultation d'un médecin ou d'un pharmacien, et n'invitent jamais à modifier ou interrompre un traitement médical en cours.",
                    'All guides and extraction methods presented on Bloom Academy are strictly educational. They support general well-being and botanical literacy, do not diagnose or treat medical conditions, and never replace consultation with a physician or pharmacist or ongoing medical care.',
                    'Alle Anleitungen und Extraktionsmethoden der Bloom Academy dienen ausschließlich der Weiterbildung. Sie ersetzen weder ärztliche oder apothekerliche Beratung noch Diagnosen oder laufende Therapien.'
                  )}
                </p>
              </div>
            </section>

            {/* INTERACTION ALMA */}
            <section className="pt-2">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#E8F1EE] border border-[#D8CBB7] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A8B8A0]">
                    <MessageSquare className="w-4 h-4 text-[#C8AB8A]" />
                    <span>{tr('Une hésitation sur votre solvant ?', 'Unsure which solvent fits?', 'Unsicher bei der Wahl des Lösungsmittels?')}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#3E4A3D]">
                    {tr("Interrogez ALMA, l'assistante de Bloom", 'Ask ALMA, Your Bloom Guide', 'Fragen Sie ALMA, Ihre Bloom-Begleiterin')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                    {tr(
                      'Partagez les signaux de votre terrain. ALMA vous guidera pas à pas pour déterminer votre profil et le vecteur idéal.',
                      'Share your priorities with ALMA for a step-by-step educational orientation toward the right botanical carrier.',
                      'Teilen Sie Ihre Schwerpunkte mit ALMA für eine strukturierte Orientierung zum passenden botanischen Träger.'
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('chat') : window.location.assign('/chat')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#3E4A3D] hover:bg-[#2D372C] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <span>{tr('Échanger avec ALMA', 'Chat with ALMA', 'Mit ALMA sprechen')}</span>
                  <ArrowRight className="w-4 h-4 text-[#C8AB8A]" />
                </button>
              </div>
            </section>

            {/* CTA BOUTIQUE BLOOMLAB */}
            <section className="pt-4">
              <div 
                className="p-8 sm:p-12 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl"
                style={{ backgroundColor: '#3E4A3D', color: '#ffffff' }}
              >
                <div className="space-y-3 max-w-xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#C8AB8A] text-xs font-bold uppercase tracking-wider">
                    {tr("L'Instrument du Totum", 'The Totum Instrument', 'Das Totum-Instrument')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {tr('Maîtrisez la température et le solvant chez vous.', 'Master Temperature & Solvents at Home.', 'Temperatur & Lösungsmittel zuhause meistern.')}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 font-light">
                    {tr(
                      "Le BloomLab® permet de programmer des paliers de chauffe doux (35°C, 45°C, 70°C ; précision nominale fabricant non certifiée indépendamment) en cuve inox 304 alimentaire et verrerie dédiée.",
                      'BloomLab® lets you run gentle heating steps (35°C, 45°C, 70°C; nominal manufacturer rating not independently certified) in a 304 food-grade stainless-steel chamber.',
                      'BloomLab® ermöglicht sanfte Heizstufen (35°C, 45°C, 70°C; herstellerseitige Nennangabe ohne unabhängige Zertifizierung) in einer 304-Edelstahlkammer.'
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('product-detail', 'bloomlab') : window.location.assign('/bloomlab')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C8AB8A] hover:bg-[#d8bca0] text-[#0F261E] font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{tr('Découvrir la BloomLab® en boutique', 'Explore BloomLab® in Shop', 'BloomLab® im Shop entdecken')}</span>
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
                <span className="font-bold text-[#3E4A3D]">{tr('2. Huiles de nutrition profonde (réparation)', '2. Deeply nourishing oils (barrier support)', '2. Tiefennährende Öle (Barrierepflege)')}</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-mono font-bold">{tr('Rose musquée, Avocat, Sésame...', 'Rosehip, Avocado, Sesame...', 'Hagebutte, Avocado, Sesam...')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E7DFD3] pb-3">
                <span className="font-bold text-[#3E4A3D]">{tr('3. Huiles à action spécifique & Derme profond', '3. Targeted botanical oils & deep care', '3. Spezialöle & Tiefenpflege')}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold">{tr('Calophylle, Macadamia, Millepertuis...', "Tamanu, Macadamia, St. John's Wort...", 'Tamanu, Macadamia, Johanniskraut...')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E7DFD3] pb-3">
                <span className="font-bold text-[#3E4A3D]">{tr("5. L'Alcool & Le secret de Tu Youyou (Nobel 2015)", "5. Alcohol & Tu Youyou's 35°C Discovery (Nobel 2015)", '5. Alkohol & Tu Youyous 35°C-Entdeckung (Nobel 2015)')}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-xs font-mono font-bold">{tr('Extraction à 35°C & Titres 40°–85°', 'Extraction at 35°C & 40–85% ABV', 'Extraktion bei 35°C & 40–85 % Vol.')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#3E4A3D]">{tr('6. Solvants alternatifs & Tableau comparatif intégral', '6. Alcohol-free solvents & full comparison chart', '6. Alkoholfreie Alternativen & Komplettübersicht')}</span>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-mono font-bold">{tr('Glycérine, Vinaigre de cidre, Séquençage A/B', 'Glycerin, Cider Vinegar, A/B Sequencing', 'Glycerin, Apfelessig, A/B-Sequenzierung')}</span>
              </div>
            </div>

            {/* Carte Premium Gate */}
            <div className="p-8 sm:p-12 rounded-[36px] bg-[#3E4A3D] text-white border-2 border-[#C8AB8A] shadow-2xl relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#C8AB8A]/20 border border-[#C8AB8A]/40 text-[#C8AB8A] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8AB8A]/20 text-[#C8AB8A] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                {tr('Contenu Réservé aux Abonnés Bloom', 'Bloom Members Exclusive Content', 'Exklusiv für Bloom-Abonnenten')}
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                {tr("Débloquez l'intégralité du Guide des Solvants & Vecteurs d'Actifs", 'Unlock the Complete Solvent & Carrier Matrix Guide', 'Schalten Sie den kompletten Lösungsmittel- & Träger-Guide frei')}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                {tr(
                  "La première partie sur l'eau et les huiles de pénétration rapide est offerte. Rejoignez l'abonnement Bloom pour débloquer l'accès complet aux répertoires des huiles réparatrices, aux secrets d'extraction à 35°C de Tu Youyou, aux solvants sans alcool et au tableau de synthèse comparatif complet.",
                  "Part 1 covering water and fast-absorbing oils is free to read. Join Bloom's subscription to unlock the full carrier oil directory, Tu Youyou's 35°C Nobel extraction insight, alcohol-free solvents, and the complete 5-solvent comparison matrix.",
                  'Teil 1 über Wasser und schnell einziehende Öle ist frei zugänglich. Mit dem Bloom-Abo erhalten Sie Zugriff auf das komplette Trägeröl-Verzeichnis, Tu Youyous 35°C-Erkenntnis, alkoholfreie Alternativen und die vollständige 5-Lösungsmittel-Matrix.'
                )}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left mb-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('Huiles réparatrices profondes & huiles spécifiques', 'Deeply nourishing & targeted botanical oils', 'Tiefennährende & spezialisierte Pflanzenöle')}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('Extraction alcoolique & découverte de Tu Youyou (Nobel)', 'Alcohol strengths & Tu Youyou discovery (Nobel)', 'Alkoholstärken & Tu Youyous Nobelpreis-Methode')}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('Glycérine végétale, Vinaigres aromatiques & Oxymels', 'Vegetable glycerin, botanical vinegars & oxymels', 'Pflanzliches Glycerin, Kräuteressige & Oxymels')}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                  <span>{tr('Tableau comparatif des 5 solvants & Séquençage A/B', 'Full 5-solvent comparison chart & A/B Sequencing', 'Vollständige 5-Lösungsmittel-Tabelle & A/B-Sequenzierung')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('abonnement') : window.location.assign('/abonnement')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C8AB8A] hover:bg-[#d8bca0] text-[#0F261E] font-black text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>{tr("Rejoindre l'abonnement (59 €/mois)", 'Join Subscription (€59/month)', 'Abo starten (59 €/Monat)')}</span>
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
                  {tr("J'ai déjà un compte", 'I already have an account', 'Ich habe bereits ein Konto')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </article>
  );
};