
import React, { useEffect } from 'react';
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
  Feather
} from 'lucide-react';
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
}

export const InfusionPrecision = ({ lang, t }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  if (!isFR) return <div className="p-20 text-center">Coming soon in your language.</div>;

  return (
    <div className="bg-[#F9F9F7] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <span className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          Cluster : Infusion Botanique
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-[1.1]">
          {t.seo.infusion_precision?.h1 || "L'Infusion Botanique de Précision"}
        </h1>
        <p className="text-xl text-botanik-green/70 mb-12 leading-relaxed font-medium">
          {t.seo.infusion_precision?.intro || "Comprendre la température, le temps et le solvant pour révéler le plein potentiel des plantes."}
        </p>

        <div className="prose prose-botanik max-w-none">
          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Pourquoi la précision change tout ?</h2>
          <p>
            Dans l'herboristerie traditionnelle, l'infusion est souvent une étape approximative. On verse de l'eau bouillante, on attend "un certain temps", et on consomme. Pourtant, chaque plante possède une structure moléculaire unique qui réagit différemment à la chaleur.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-white p-8 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-botanik-orange">
                <Activity className="w-5 h-5" /> Température Critique
              </h3>
              <p className="text-sm opacity-80">
                Certaines molécules, comme les enzymes ou les vitamines thermosensibles, se dégradent dès 45°C. La BloomLab permet de rester sous ce seuil pour une extraction à froid ou tiède de haute qualité.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-botanik-orange">
                <Wind className="w-5 h-5" /> Agitation & Temps
              </h3>
              <p className="text-sm opacity-80">
                La durée de contact entre le solvant et la plante détermine la concentration en actifs. Une infusion trop longue peut extraire des tanins amers non désirés, là où une précision au degré près cible uniquement le bénéfice recherché.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Le rôle du BloomLab® dans votre pratique</h2>
          <p>
            BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels. En transformant votre cuisine en laboratoire de précision, vous accédez à une souveraineté sanitaire réelle. Nos équipes vous accompagnent dans votre projet de soins sur mesure en vous fournissant les outils et les connaissances nécessaires.
          </p>
        </div>
      </div>
    </div>
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
      <header className="relative bg-[#0F261E] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D97706] text-xs font-bold uppercase tracking-widest border border-white/15 backdrop-blur-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{isFR ? "Science du Vivant & Souveraineté Botanique" : isDE ? "Wissenschaft des Lebendigen" : "Living Systems & Botanical Sovereignty"}</span>
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
                ? "Le totum désigne l'ensemble des constituants d'une plante, considérés dans leur globalité et dans leurs interactions possibles, plutôt que réduits à un seul composé isolé. Polyphénols, terpènes, alcaloïdes, fibres, minéraux, huiles essentielles : leur combinaison forme un profil cohérent, qu'aucune molécule seule ne reproduit."
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
            <div className="pt-2 border-t border-[#E7DFD3] text-[#1C3F34] font-serif italic text-base sm:text-lg">
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
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F261E] to-[#1C3F34] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
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

export const SolvantsExtraction = ({ lang, t }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  if (!isFR) return <div className="p-20 text-center">Coming soon in your language.</div>;

  return (
    <div className="bg-[#F9F9F7] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <span className="inline-block px-3 py-1 bg-botanik-orange/5 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          Cluster : Pratique de l'Extraction
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-[1.1]">
          {t.seo.solvants_extraction?.h1 || "L'Art des Solvants en Extraction Botanique"}
        </h1>
        <p className="text-xl text-botanik-green/70 mb-12 leading-relaxed font-medium">
          {t.seo.solvants_extraction?.intro || "Eau, huiles végétales, glycérine ou alcool : choisir le bon vecteur pour chaque famille moléculaire."}
        </p>

        <div className="prose prose-botanik max-w-none">
          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">L'Eau : Le solvant universel</h2>
          <p>
            L'infusion à l'eau est la méthode la plus courante. Elle permet d'extraire les molécules hydrosolubles (sels minéraux, tanins, mucilages). Avec le BloomLab, vous maîtrisez la température pour ne pas "brûler" les actifs fragiles.
          </p>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">L'Huile : Pour les soins et la gastronomie</h2>
          <p>
            Le macérat huileux est idéal pour extraire les molécules liposolubles (huiles essentielles, caroténoïdes). C'est la base de vos baumes cosmétiques et de vos huiles gastronomiques. La BloomLab permet une extraction à chaud stabilisée, accélérant le processus de macération sans rancissement de l'huile.
          </p>

          <div className="my-12 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-botanik-orange/5 p-8 rounded-2xl border border-botanik-orange/10">
              <h3 className="font-bold text-botanik-orange mb-2 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> Macérat Hydroalcoolique
              </h3>
              <p className="text-sm opacity-80">
                L'alcool permet d'extraire une gamme plus large d'actifs, notamment les résines et certains alcaloïdes. C'est la base de ce qu'on appelle traditionnellement les teintures mères.
              </p>
            </div>
            <div className="flex-1 bg-botanik-orange/5 p-8 rounded-2xl border border-botanik-orange/10">
              <h3 className="font-bold text-botanik-orange mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Glycérine & Vinaigre
              </h3>
              <p className="text-sm opacity-80">
                D'autres solvants comme la glycérine végétale ou le vinaigre de cidre offrent des alternatives intéressantes pour des extractions sans alcool adaptées à toute la famille.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Faites fleurir toutes vos envies de bien-être végétal</h2>
          <p>
            BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels en choisissant le solvant le plus adapté à vos besoins. Pour un conseil personnalisé, n'hésitez pas à interroger ALMA, notre assistante botaniste, ou à consulter nos guides spécialisés.
          </p>
        </div>
      </div>
    </div>
  );
};

