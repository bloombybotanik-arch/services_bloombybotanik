import React, { useState } from 'react';
import { 
  Thermometer, 
  Clock, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight, 
  Check, 
  Sparkles, 
  AlertCircle, 
  HelpCircle, 
  Sliders, 
  ChevronDown, 
  Utensils, 
  Sparkle, 
  Layers, 
  Scale, 
  FlaskConical,
  Filter
} from 'lucide-react';
import { Language } from './translations';
import { TooltipLexique } from './components/TooltipLexique';

interface PillarInfusionProps {
  lang: Language;
  onNavigate: (view: any, param?: string) => void;
}

export default function PillarInfusion({ lang, onNavigate }: PillarInfusionProps) {
  const isFR = lang === 'fr';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqItems = [
    {
      q: "Quelle différence entre une tisane et une infusion botanique ?",
      a: "La tisane traditionnelle est le plus souvent une boisson d'agrément préparée en versant une eau bouillante sur des plantes sans contrôle précis de la température ni du temps. L'infusion botanique adopte une démarche structurée : sélection de la partie végétale, adaptation de la température selon la fragilité des composés, calibrage de la durée et recherche d'une meilleure régularité dans la préparation."
    },
    {
      q: "Quelle différence entre infusion, décoction et macération ?",
      a: "L'infusion consiste à immerger des parties végétales fragiles (fleurs, feuilles tendres) dans un liquide chauffé sans ébullition continue. La décoction maintient une ébullition douce pour extraire les principes de parties denses (écorces, racines, graines dures). La macération, quant à elle, s'effectue à température ambiante ou à froid pendant une durée prolongée dans de l'eau, de l'huile ou un autre solvant."
    },
    {
      q: "Comment choisir un solvant ?",
      a: "Le choix du solvant dépend de la nature des constituants recherchés : l'eau convient aux molécules hydrosolubles (mucilages, tanins, certains polyphénols) ; l'huile végétale est adaptée aux molécules liposolubles (caroténoïdes, arômes, principes actifs pour soins cutanés) ; la glycérine végétale permet des préparations douces sans alcool. Chaque solvant possède ses exigences d'hygiène et de conservation."
    },
    {
      q: "BloomLab remplace-t-elle un bain-marie ?",
      a: "BloomLab remplit la fonction d'un bain-marie régulé avec une précision accrue : elle maintient une température stable au degré près, intègre une minuterie programmable et propose une agitation magnétique douce selon les programmes, évitant ainsi la surveillance manuelle et les risques de surchauffe locale propres au bain-marie traditionnel."
    },
    {
      q: "Quelles plantes peut-on infuser ?",
      a: "La plupart des plantes aromatiques, médicinales et culinaires documentées peuvent être infusées : camomille, mélisse, menthe, romarin, thym, ortie, calendula ou verveine. Il est toutefois impératif de respecter l'usage documenté de chaque espèce, la partie de plante adéquate (fleur, feuille, sommité) et les précautions d'emploi associées."
    },
    {
      q: "Peut-on préparer des huiles infusées ?",
      a: "Oui. L'infusion dans une huile végétale (comme l'huile d'olive, de jojoba, d'amande douce ou de tournesol) permet de confectionner des huiles aromatiques culinaires ou des macérats huileux pour soins cutanés (ex. macérat de calendula). Une maîtrise fine de la température (généralement entre 40°C et 60°C) est essentielle pour préserver la qualité de l'huile."
    },
    {
      q: "Les kits de plantes sont-ils biologiques ?",
      a: "Les mélanges proposés par Bloom by BotaniK proviennent de filières rigoureusement sélectionnées, privilégiant les plantes issues de l'agriculture biologique et des récoltes respectueuses de la biodiversité. Chaque fiche de kit détaille précisément l'origine, les certifications éventuelles et la composition exacte du lot."
    },
    {
      q: "Peut-on utiliser une préparation botanique comme un médicament ?",
      a: "Non. Les préparations présentées par Bloom by BotaniK ne remplacent ni un diagnostic, ni un avis médical, ni un traitement. En cas de grossesse, d’allaitement, d’allergie, de traitement ou de situation particulière, demandez conseil à un professionnel de santé."
    },
    {
      q: "Comment conserver une préparation ?",
      a: "Une infusion aqueuse fraîche doit être consommée dans les 24 à 48 heures et conservée au réfrigérateur. Une huile infusée filtrée avec soin se conserve plusieurs mois à l'abri de la lumière, de l'air et de la chaleur, idéalement dans un flacon en verre ambré hermétiquement fermé."
    },
    {
      q: "Où commencer lorsqu’on ne connaît pas encore les plantes ?",
      a: "Le meilleur point de départ consiste à explorer notre Herbier pour comprendre les profils de quelques plantes simples (mélisse, camomille, ortie), puis de tester une première recette guidée gratuite avec de l'eau ou de l'huile avant d'envisager des méthodes plus avancées."
    }
  ];

  return (
    <main className="bg-[#FAF7F2] text-[#0F261E] min-h-screen">
      {/* SECTION 0 — EN-TÊTE & INTRODUCTION AU-DESSUS DU PLI */}
      <header className="relative bg-[#1C3F34] text-white pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Fil d'Ariane sémantique */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs text-white/70">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li><span className="text-white/40">/</span></li>
              <li className="text-[#D97706] font-medium" aria-current="page">
                Infusion botanique maison
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase border border-white/15">
                <Leaf className="w-3.5 h-3.5 text-[#D97706]" />
                Guide Méthode & Pratique Domestique
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Infusion botanique maison : de la plante à la préparation
              </h1>

              <div className="space-y-4 text-white/85 text-base sm:text-lg leading-relaxed">
                <p>
                  L’infusion botanique ne se limite pas à verser de l’eau chaude sur une plante. Elle repose sur un équilibre entre la plante choisie, le solvant utilisé, la température, la durée et le mouvement du mélange.
                </p>
                <p>
                  Avec Bloom by BotaniK, vous découvrez une approche plus précise de la préparation botanique à domicile : comprendre les plantes, suivre des recettes guidées, préparer des huiles infusées et progresser avec BloomLab.
                </p>
                <p className="text-xs sm:text-sm text-white/70 bg-white/5 p-3 rounded-xl border border-white/10">
                  BloomLab est un outil de préparation botanique domestique. Il ne remplace pas un avis médical, un diagnostic ou un traitement. Les informations proposées sont pédagogiques.
                </p>
              </div>

              {/* Deux CTA visibles immédiatement */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/bloomlab/"
                  onClick={(e) => handleLinkClick(e, 'machine')}
                  id="hero-cta-bloomlab"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Je découvre BloomLab</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/recettes-gratuites/"
                  onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
                  id="hero-cta-recettes"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
                >
                  <span>Commencer avec les recettes gratuites</span>
                </a>
              </div>
            </div>

            {/* Image principale LCP */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 aspect-[16/10]">
                <img
                  src="/img/produit/bloomlab-cuisine-1200x630.jpg"
                  alt="BloomLab en situation d'infusion botanique de précision dans une cuisine"
                  width={1200}
                  height={630}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  Préparation botanique guidée à domicile
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL ÉDITORIAL */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16 sm:space-y-20">

        {/* SECTION 1 — COMPRENDRE L’INFUSION BOTANIQUE */}
        <section id="comprendre-infusion-botanique" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Fondamentaux</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Qu’est-ce qu’une infusion botanique ?
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-[#1C3F34]/90 leading-relaxed space-y-4">
            <p>
              L’infusion botanique consiste à immerger des matières végétales dans un solvant liquide maintenu à une température donnée pendant une durée précise. L'eau constitue historiquement le solvant le plus universel et accessible : elle dissout efficacement les composés <TooltipLexique terme="hydrosoluble">hydrosolubles</TooltipLexique> comme les sels minéraux, les mucilages, certains acides organiques et les tanins.
            </p>
            <p>
              Il convient de distinguer clairement deux méthodes thermiques complémentaires :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>L’infusion :</strong> le liquide chaud est versé ou maintenu au contact de parties végétales tendres (fleurs, feuilles, sommités fleuries) sans maintenir d’ébullition vive, afin de limiter la dégradation thermique des constituants fragiles.
              </li>
              <li>
                <strong>La décoction :</strong> la matière végétale est immergée dans de l'eau portée et maintenue à frémissement ou ébullition pendant plusieurs dizaines de minutes. Cette technique est principalement réservée aux parties dures et denses comme les écorces, racines, graines ou bois.
              </li>
            </ul>
            <p>
              Alors qu’une simple tisane renvoie fréquemment à un rituel gustatif informel, l’infusion botanique relève d’une démarche structurée. Le résultat dépend de la plante choisie, de la partie récoltée, du solvant sélectionné, de la température et de la durée d'exposition. Chaque méthode extrait certaines familles de constituants selon les caractéristiques propres à chaque plante et les paramètres employés, sans qu’aucune méthode ne prétende extraire « tous les principes » de manière absolue.
            </p>
          </div>

          {/* Encadré obligatoire Section 1 */}
          <div className="bg-[#1C3F34]/5 border-l-4 border-[#1C3F34] p-5 rounded-r-2xl space-y-1 text-sm text-[#0F261E]">
            <p className="font-semibold text-[#1C3F34]">À retenir :</p>
            <p className="italic leading-relaxed">
              « Une préparation botanique n’est pas définie uniquement par la plante utilisée. Le résultat dépend aussi du solvant, de la température, de la durée, de la granulométrie, de l’agitation, de la filtration et de la conservation. »
            </p>
          </div>
        </section>

        {/* SECTION 2 — POURQUOI LES PARAMÈTRES COMPTENT */}
        <section id="pourquoi-parametres" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Science du paramétrage</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Pourquoi contrôler la température, le temps et l’agitation ?
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">
            Dans toute préparation botanique, l'équilibre entre dissolution et dégradation est étroitement lié aux conditions du milieu. Une gestion rigoureuse des variables permet de guider la préparation selon les objectifs recherchés :
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Thermometer className="w-4 h-4" />
                <span>Impact de la température</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">
                Une température trop élevée peut altérer certains constituants sensibles ou dissiper des molécules aromatiques volatiles. À l'inverse, une température trop basse peut ralentir ou restreindre certains phénomènes de diffusion et d’extraction.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Gestion de la durée</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">
                Une durée trop courte peut produire une préparation différente d’une exposition plus longue. Selon la plante, prolonger l'infusion peut libérer davantage d’astringence ou de tanins, modifiant le profil sensoriel de la solution.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Rôle de l’agitation</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">
                L’agitation peut améliorer l’homogénéité dans certains protocoles en renouvelant le liquide en contact direct avec la matière végétale et en limitant les zones locales de saturation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                <Filter className="w-4 h-4" />
                <span>Filtration et conditionnement</span>
              </div>
              <p className="text-sm text-[#1C3F34]/85 leading-relaxed">
                La finesse de la filtration et le choix de contenants propres et opaques influencent directement la stabilité, la clarté et la conservation dans le temps de votre préparation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — LES DIFFÉRENTS SOLVANTS */}
        <section id="solvants-extraction" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Chimie douce</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Eau, huile, glycérine ou alcool : quel solvant choisir ?
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 leading-relaxed">
            Le milieu d’extraction conditionne la famille de molécules extraites. Voici un récapitulatif comparatif des quatre principaux solvants utilisés en pratique botanique :
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#0F261E]/10 shadow-xs bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1C3F34] text-white font-semibold">
                  <th className="py-3 px-4">Solvant</th>
                  <th className="py-3 px-4">Caractéristique générale</th>
                  <th className="py-3 px-4">Exemples d’usage</th>
                  <th className="py-3 px-4">Précaution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F261E]/10 text-[#0F261E]">
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3 px-4 font-bold text-[#1C3F34]">Eau</td>
                  <td className="py-3 px-4">Solvant adapté à de nombreux composés hydrosolubles</td>
                  <td className="py-3 px-4">Infusions, boissons, certaines préparations</td>
                  <td className="py-3 px-4 text-xs text-[#0F261E]/80">Conservation souvent limitée sans protocole approprié</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3 px-4 font-bold text-[#1C3F34]">Huile végétale</td>
                  <td className="py-3 px-4">Solvant adapté à certaines molécules liposolubles</td>
                  <td className="py-3 px-4">Macérats et soins cosmétiques, huiles culinaires</td>
                  <td className="py-3 px-4 text-xs text-[#0F261E]/80">Risque d’oxydation, hygiène et conservation à maîtriser</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3 px-4 font-bold text-[#1C3F34]">Glycérine</td>
                  <td className="py-3 px-4">Solvant utilisé dans certaines préparations</td>
                  <td className="py-3 px-4">Préparations sans alcool selon la formule</td>
                  <td className="py-3 px-4 text-xs text-[#0F261E]/80">Vérifier la qualité, la compatibilité et la conservation</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3 px-4 font-bold text-[#1C3F34]">Alcool</td>
                  <td className="py-3 px-4">Solvant utilisé dans certaines extractions</td>
                  <td className="py-3 px-4">Protocoles spécifiques de laboratoire</td>
                  <td className="py-3 px-4 text-xs text-[#0F261E]/80">Risques liés à l’ingestion, à la concentration et à l’inflammabilité</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Avertissement impératif Section 3 */}
          <div className="bg-[#D97706]/10 border-l-4 border-[#D97706] p-4 rounded-r-xl text-xs sm:text-sm text-[#0F261E] space-y-1">
            <p className="font-semibold text-[#D97706] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Précision réglementaire et sécurité</span>
            </p>
            <p className="leading-relaxed">
              « Le choix du solvant dépend de la plante, de la partie utilisée, de la préparation visée et du cadre réglementaire. Une préparation alcoolisée chauffée nécessite une vérification spécifique de la compatibilité du matériel et des consignes du fabricant. »
            </p>
          </div>
        </section>

        {/* SECTION 4 — L’APPROCHE BLOOM BY BOTANIK */}
        <section id="approche-bloom" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Méthodologie</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Une approche plus précise de la préparation botanique
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#1C3F34] text-white flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Comprendre la plante</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Identifier ses parties actives, sa saisonnalité, ses usages traditionnels documentés et ses précautions d'emploi.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#1C3F34] text-white flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Choisir une méthode cohérente</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Sélectionner le solvant pertinent et le ratio végétal/liquide adapté à la préparation recherchée.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#1C3F34] text-white flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Reproduire les paramètres</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Appliquer des repères stables de température et de temps pour obtenir une préparation régulière et soignée.
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#1C3F34]/90 leading-relaxed bg-[#FAF7F2] p-5 rounded-2xl border border-[#0F261E]/10">
            « Bloom by BotaniK relie l’étude des plantes, la formulation de recettes et la maîtrise des paramètres de préparation. L’objectif n’est pas de promettre une extraction totale, mais de rendre la pratique plus compréhensible, plus documentée et plus régulière. »
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <span className="text-[#0F261E]/70">Explorer nos espaces pédagogiques :</span>
            <a 
              href="/herbier/" 
              onClick={(e) => handleLinkClick(e, 'herbier')}
              className="inline-flex items-center gap-1 text-[#1C3F34] underline hover:text-[#D97706]"
            >
              L’Herbier
            </a>
            <span>•</span>
            <a 
              href="/extraction-botanique/" 
              onClick={(e) => handleLinkClick(e, 'extraction-botanique')}
              className="inline-flex items-center gap-1 text-[#1C3F34] underline hover:text-[#D97706]"
            >
              L’Extraction botanique
            </a>
            <span>•</span>
            <a 
              href="/bibliotheque/" 
              onClick={(e) => handleLinkClick(e, 'bibliotheque')}
              className="inline-flex items-center gap-1 text-[#1C3F34] underline hover:text-[#D97706]"
            >
              La Bibliothèque
            </a>
          </div>
        </section>

        {/* SECTION 5 — BLOOMLAB */}
        <section id="decouvrir-bloomlab" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#0F261E]/10 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Outil domestique</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              BloomLab : l’outil de préparation botanique à domicile
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-sm text-[#1C3F34]/90 leading-relaxed">
              <p>
                BloomLab a été conçue comme un instrument de précision pour les passionnés de plantes et de préparations maison. Elle vous aide à structurer vos protocoles autour de paramètres stables :
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Thermorégulation stable :</strong> maintien d'une consigne thermique ajustée selon le modèle.</li>
                <li><strong>Durée chronométrée :</strong> contrôle automatique du cycle pour respecter chaque protocole.</li>
                <li><strong>Agitation douce :</strong> homogénéisation lorsque le programme sélectionné le prévoit.</li>
                <li><strong>Répétabilité :</strong> facilité à reproduire une recette culinaire ou cosmétique réussie.</li>
                <li><strong>Entretien :</strong> conception pensée pour un nettoyage simple après usage.</li>
              </ul>
              <p className="italic text-[#0F261E] font-medium pt-1">
                « BloomLab vous aide à appliquer certains protocoles avec davantage de régularité. Elle ne remplace ni la connaissance de la plante, ni l’évaluation de la qualité des matières premières, ni le respect des règles d’hygiène et de conservation. »
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#0F261E]/10 shadow-sm aspect-square bg-[#FAF7F2]">
                <img
                  src="/img/produit/bloomlab-face-1200x1200.jpg"
                  alt="BloomLab, extracteur et infuseur botanique de précision à domicile"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Sous-section « Ce que BloomLab ne fait pas » */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#0F261E]/10 space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-[#1C3F34] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Ce que BloomLab ne fait pas</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#0F261E]/85">
              <li className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>Elle ne transforme pas une plante en médicament ;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>Elle ne garantit pas un résultat identique pour toutes les plantes ;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>Elle ne remplace pas un professionnel de santé ;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>Elle ne permet pas de déduire un effet thérapeutique ;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>Elle ne dispense pas de vérifier chaque recette et chaque précaution.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/bloomlab/"
              onClick={(e) => handleLinkClick(e, 'machine')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C3F34] hover:bg-[#0F261E] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Découvrir BloomLab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/boutique/"
              onClick={(e) => handleLinkClick(e, 'boutique')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent hover:bg-[#0F261E]/5 text-[#0F261E] font-bold text-xs uppercase tracking-wider border border-[#0F261E]/20 transition-all"
            >
              <span>Voir les offres disponibles</span>
            </a>
          </div>
        </section>

        {/* SECTION 6 — DE LA PLANTE À LA PRÉPARATION */}
        <section id="etapes-preparation" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Protocole pas à pas</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Une préparation botanique en quatre étapes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2.5">
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Étape 1</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Identifier la plante et la partie utilisée</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Feuilles, fleurs délicates, écorces ou racines ne se travaillent pas de la même façon. Ajustez la coupe et la granulométrie pour faciliter le contact avec le solvant.
              </p>
              <a 
                href="/herbier/" 
                onClick={(e) => handleLinkClick(e, 'herbier')}
                className="text-xs font-semibold text-[#1C3F34] underline hover:text-[#D97706] inline-block pt-1"
              >
                Consulter les profils dans l’Herbier →
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2.5">
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Étape 2</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Choisir le solvant et le protocole</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Optez pour une eau de source, une huile végétale de première pression ou de la glycérine selon l'affinité moléculaire recherchée et l'usage final prévu.
              </p>
              <a 
                href="/recettes-gratuites/" 
                onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
                className="text-xs font-semibold text-[#1C3F34] underline hover:text-[#D97706] inline-block pt-1"
              >
                Parcourir les recettes gratuites →
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2.5">
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Étape 3</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Contrôler les paramètres de préparation</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Réglez la température cible sans dépasser le seuil de tolérance de la plante. Activez l'agitation douce si le programme le prévoit afin d’harmoniser l'extraction.
              </p>
              <a 
                href="/extraction-botanique/" 
                onClick={(e) => handleLinkClick(e, 'extraction-botanique')}
                className="text-xs font-semibold text-[#1C3F34] underline hover:text-[#D97706] inline-block pt-1"
              >
                Comprendre la cinétique d'extraction →
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-2.5">
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Étape 4</div>
              <h3 className="font-bold text-base text-[#1C3F34]">Filtrer, conditionner et conserver</h3>
              <p className="text-xs text-[#0F261E]/80 leading-relaxed">
                Filtrez délicatement à l'aide d'un tamis fin ou d'un tissu adapté. Transvasez dans un flacon propre étiqueté (date et composition) et respectez la durée de conservation spécifique à la recette.
              </p>
              <a 
                href="/bibliotheque/" 
                onClick={(e) => handleLinkClick(e, 'bibliotheque')}
                className="text-xs font-semibold text-[#1C3F34] underline hover:text-[#D97706] inline-block pt-1"
              >
                Guides de conservation en bibliothèque →
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 7 — PLANTES ET KITS */}
        <section id="kits-plantes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Matières premières</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Des plantes sélectionnées et des recettes guidées
            </h2>
          </div>

          <p className="text-[#1C3F34]/90 text-sm sm:text-base leading-relaxed">
            Pour accompagner votre pratique, nous proposons des mélanges de plantes préparés selon des standards rigoureux : granulométrie calibrée pour l'infusion, absence d’arômes artificiels ou d’adjuvants, et fiches d'instructions transparentes.
          </p>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white p-4 rounded-2xl border border-[#0F261E]/10 space-y-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img 
                  src="/img/produit/seve-fondamentale-1200x1200.jpg" 
                  alt="Sève Fondamentale - plantes sélectionnées pour infusion"
                  width={300} 
                  height={300} 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1C3F34]">Sève Fondamentale</h3>
                <p className="text-xs text-[#0F261E]/70">Ortie, Prêle, Cassis • Sachet 50g</p>
                <p className="text-xs font-semibold text-[#D97706] mt-1">12,90 €</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#0F261E]/10 space-y-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img 
                  src="/img/produit/nuit-profonde-1200x1200.jpg" 
                  alt="Nuit Profonde - mélange apaisant camomille et passiflore"
                  width={300} 
                  height={300} 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1C3F34]">Nuit Profonde</h3>
                <p className="text-xs text-[#0F261E]/70">Camomille matricaire, Mélisse • Sachet 50g</p>
                <p className="text-xs font-semibold text-[#D97706] mt-1">12,90 €</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#0F261E]/10 space-y-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img 
                  src="/img/produit/digestion-1200x1200.jpg" 
                  alt="Confort Digestif - romarin, menthe et artichaut"
                  width={300} 
                  height={300} 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1C3F34]">Confort Digestif</h3>
                <p className="text-xs text-[#0F261E]/70">Romarin, Menthe poivrée, Artichaut • Sachet 50g</p>
                <p className="text-xs font-semibold text-[#D97706] mt-1">12,90 €</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/herbier/"
              onClick={(e) => handleLinkClick(e, 'herbier')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C3F34] hover:bg-[#0F261E] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explorer l’Herbier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/boutique/"
              onClick={(e) => handleLinkClick(e, 'boutique')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent hover:bg-[#0F261E]/5 text-[#0F261E] font-bold text-xs uppercase tracking-wider border border-[#0F261E]/20 transition-all"
            >
              <span>Découvrir les kits de plantes</span>
            </a>
          </div>
        </section>

        {/* SECTION 8 — CE QUE VOUS POUVEZ PRÉPARER */}
        <section id="univers-preparations" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Domaines d'application</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Que pouvez-vous préparer avec BloomLab ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Univers Culinaire */}
            <div className="bg-white p-6 rounded-3xl border border-[#0F261E]/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#1C3F34]/10 text-[#1C3F34] flex items-center justify-center font-bold">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1C3F34]">A. Préparations culinaires</h3>
                <ul className="text-xs text-[#0F261E]/80 space-y-1.5">
                  <li>• Huiles aromatiques (romarin, piment doux, ail des ours)</li>
                  <li>• Beurres végétaux et animaliers infusés</li>
                  <li>• Vinaigres botaniques et réductions d'herbes</li>
                  <li>• Recettes de saison guidées pas à pas</li>
                </ul>
              </div>
              <a
                href="/gastronomie-botanique/"
                onClick={(e) => handleLinkClick(e, 'culinaire')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:text-[#b45309]"
              >
                <span>Accéder à l'Atelier Culinaire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Univers Cosmétique */}
            <div className="bg-white p-6 rounded-3xl border border-[#0F261E]/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#1C3F34]/10 text-[#1C3F34] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1C3F34]">B. Préparations cosmétiques</h3>
                <ul className="text-xs text-[#0F261E]/80 space-y-1.5">
                  <li>• Huiles végétales de soin (calendula, camomille, hélichryse)</li>
                  <li>• Baumes et onguents nourrissants</li>
                  <li>• Sérums lipidiques botaniques</li>
                  <li>• Soins capillaires et mélanges pour masques aux argiles</li>
                </ul>
              </div>
              <a
                href="/cosmetique-botanique/"
                onClick={(e) => handleLinkClick(e, 'cosmetiques')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:text-[#b45309]"
              >
                <span>Voir les Recettes Cosmétiques</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Univers Botanique */}
            <div className="bg-white p-6 rounded-3xl border border-[#0F261E]/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#1C3F34]/10 text-[#1C3F34] flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1C3F34]">C. Préparations botaniques</h3>
                <ul className="text-xs text-[#0F261E]/80 space-y-1.5">
                  <li>• Macérats doux sans alcool</li>
                  <li>• Infusions aqueuses de précision</li>
                  <li>• Préparations guidées pour l'équilibre du terrain</li>
                  <li>• Protocoles pédagogiques d'apprentissage</li>
                </ul>
              </div>
              <a
                href="/bibliotheque/"
                onClick={(e) => handleLinkClick(e, 'bibliotheque')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:text-[#b45309]"
              >
                <span>Explorer la Bibliothèque</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 9 — COMPARAISON DES MÉTHODES */}
        <section id="comparaison-methodes" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Repères comparatifs</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Préparation traditionnelle et protocole mieux paramétré
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#0F261E]/10 shadow-xs bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1C3F34] text-white font-semibold">
                  <th className="py-3.5 px-4">Critère</th>
                  <th className="py-3.5 px-4">Préparation traditionnelle</th>
                  <th className="py-3.5 px-4">Avec BloomLab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F261E]/10 text-[#0F261E]">
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Contrôle de la température</td>
                  <td className="py-3.5 px-4">Dépend du matériel et de la surveillance manuelle</td>
                  <td className="py-3.5 px-4 font-medium text-[#1C3F34]">Paramètre réglable selon le modèle</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Durée</td>
                  <td className="py-3.5 px-4">Estimée ou surveillée manuellement</td>
                  <td className="py-3.5 px-4 font-medium text-[#1C3F34]">Programme défini selon la recette</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Agitation</td>
                  <td className="py-3.5 px-4">Manuelle ou variable</td>
                  <td className="py-3.5 px-4 font-medium text-[#1C3F34]">Automatisée uniquement lorsque le programme le prévoit</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Reproductibilité</td>
                  <td className="py-3.5 px-4">Dépendante de l'expérience et du hasard</td>
                  <td className="py-3.5 px-4 font-medium text-[#1C3F34]">Facilite la répétition du protocole</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3.5 px-4 font-bold text-[#1C3F34]">Apprentissage</td>
                  <td className="py-3.5 px-4">Repose sur des essais empiriques</td>
                  <td className="py-3.5 px-4 font-medium text-[#1C3F34]">Accompagné par des recettes et guides documentés</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-[#0F261E]/80 italic">
            « BloomLab facilite le contrôle de certains paramètres ; elle ne garantit pas la composition, la concentration ou l’efficacité d’une préparation. »
          </p>
        </section>

        {/* SECTION 10 — PARCOURS UTILISATEUR */}
        <section id="parcours-utilisateur" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Orientation</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Par où commencer ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Profil 1</span>
                <h3 className="font-bold text-base text-[#1C3F34] mt-1">Vous découvrez les plantes</h3>
                <p className="text-xs text-[#0F261E]/80 mt-1 leading-relaxed">
                  Apprenez à reconnaître les familles botaniques, les parties de plantes et leurs usages traditionnels.
                </p>
              </div>
              <a
                href="/herbier/"
                onClick={(e) => handleLinkClick(e, 'herbier')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3F34] hover:text-[#D97706]"
              >
                <span>Explorer l’Herbier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Profil 2</span>
                <h3 className="font-bold text-base text-[#1C3F34] mt-1">Vous voulez tester une première préparation</h3>
                <p className="text-xs text-[#0F261E]/80 mt-1 leading-relaxed">
                  Accédez à des fiches recettes gratuites simples et guidées pour votre cuisine ou vos soins naturels.
                </p>
              </div>
              <a
                href="/recettes-gratuites/"
                onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3F34] hover:text-[#D97706]"
              >
                <span>Recevoir les recettes gratuites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Profil 3</span>
                <h3 className="font-bold text-base text-[#1C3F34] mt-1">Vous souhaitez préparer régulièrement</h3>
                <p className="text-xs text-[#0F261E]/80 mt-1 leading-relaxed">
                  Découvrez l'outil BloomLab pour fiabiliser vos protocoles avec une régularité thermique constante.
                </p>
              </div>
              <a
                href="/bloomlab/"
                onClick={(e) => handleLinkClick(e, 'machine')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3F34] hover:text-[#D97706]"
              >
                <span>Découvrir BloomLab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#0F261E]/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Profil 4</span>
                <h3 className="font-bold text-base text-[#1C3F34] mt-1">Vous voulez progresser</h3>
                <p className="text-xs text-[#0F261E]/80 mt-1 leading-relaxed">
                  Consultez notre bibliothèque de savoirs, nos dossiers d'extraction et nos guides thématiques approfondis.
                </p>
              </div>
              <a
                href="/bibliotheque/"
                onClick={(e) => handleLinkClick(e, 'bibliotheque')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3F34] hover:text-[#D97706]"
              >
                <span>Accéder à la bibliothèque</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 11 — FAQ */}
        <section id="faq-infusion" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Foire aux questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F261E] tracking-tight">
              Questions fréquentes sur l’infusion botanique
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-[#0F261E]/10 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#1C3F34] hover:text-[#D97706] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{idx + 1}. {item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#D97706]' : 'text-[#0F261E]/50'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#0F261E]/85 leading-relaxed border-t border-[#0F261E]/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 12 — CONVERSION FINALE */}
        <section id="conversion-finale" className="bg-[#1C3F34] text-white rounded-3xl p-8 sm:p-10 md:p-12 text-center space-y-6 shadow-xl border border-white/10">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Votre pratique botanique commence par une première préparation
            </h2>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Comprenez la plante, choisissez une méthode cohérente et progressez à votre rythme. Bloom by BotaniK vous accompagne avec des guides, des recettes, un Herbier, des kits de plantes et BloomLab comme outil de préparation botanique à domicile.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/bloomlab/"
              onClick={(e) => handleLinkClick(e, 'machine')}
              id="footer-cta-bloomlab"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Je découvre BloomLab</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/boutique/"
              onClick={(e) => handleLinkClick(e, 'boutique')}
              id="footer-cta-boutique"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>Voir la boutique</span>
            </a>
            <a
              href="/recettes-gratuites/"
              onClick={(e) => handleLinkClick(e, 'recettes-gratuites')}
              id="footer-cta-recettes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white/90 hover:text-white font-medium text-sm underline transition-all"
            >
              <span>Commencer gratuitement</span>
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
