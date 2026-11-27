import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Thermometer
} from 'lucide-react';
import { Language } from './translations';
import { View } from './types';
import { FreemiumPaywallGate } from './components/FreemiumPaywallGate';
import { TooltipLexique } from './components/TooltipLexique';
import { GlossaryProvider } from './context/GlossaryContext';

interface SolventsGuideProps {
  lang?: Language;
  onNavigate: (view: View, param?: string) => void;
}

interface SolventComparisonRow {
  name: string;
  polarity: string;
  affinity: string;
  targets: string;
  temperature: string;
  conservation: string;
  limit: string;
}

interface SolventPracticalSheet {
  id: string;
  name: string;
  polarityTag: string;
  tempRange: string;
  ratio: string;
  duration: string;
  agitation: string;
  shelfLife: string;
  idealFor: string;
  notes: string;
}

interface SignatureRecipe {
  id: string;
  name: string;
  objective: string;
  description: string;
  phaseLabel: string;
  composition: string;
  solvent: string;
  temperature: string;
  duration: string;
  administration: string;
  dosage: string;
  precautions: string;
  contraindications: string;
}

interface PlantSolventMapping {
  plantCategory: string;
  examples: string;
  dominantPolarity: string;
  recommendedSolvent: string;
  sequenceTip: string;
}

interface CarrierOilGuide {
  name: string;
  profile: string;
  temp: string;
  usage: string;
}

interface OrganSolventRow {
  organ: string;
  polarity: string;
  idealSolvent: string;
  plants: string;
}

export default function SolventsGuide({ lang = 'fr', onNavigate }: SolventsGuideProps) {
  const isDE = lang === 'de';
  const isEN = lang === 'en';
  const tr = (fr: string, en: string, de: string) => (isDE ? de : isEN ? en : fr);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const solventFaqs = [
    {
      q: tr(
        "Quel solvant choisir entre l'eau, l'huile végétale et l'alcool ?",
        "Which solvent should I choose between water, vegetable oil, and alcohol?",
        "Welches Lösungsmittel soll ich wählen: Wasser, Pflanzenöl oder Alkohol?"
      ),
      a: tr(
        "L'eau extrait les composés hydrosolubles (mucilages, tanins, flavonoïdes polaires). L'huile végétale capte les actifs liposolubles (caroténoïdes, phytostérols, composés aromatiques). L'alcool alimentaire extrait les alcaloïdes, résines et polyphénols pour des teintures mères et extraits hydroalcooliques en cuve inox 304, tandis que la glycérine végétale offre une alternative douce sans éthanol.",
        "Water extracts water-soluble compounds (mucilage, tannins, polar flavonoids). Vegetable oil captures fat-soluble actives (carotenoids, phytosterols, aromatic compounds). Food-grade alcohol extracts alkaloids, resins, and polyphenols for tinctures and hydroalcoholic extracts in the 304 stainless-steel chamber, while vegetable glycerin offers a gentle ethanol-free alternative.",
        "Wasser extrahiert wasserlösliche Stoffe (Schleimstoffe, Gerbstoffe, polare Flavonoide). Pflanzenöl bindet fettlösliche Wirkstoffe (Carotinoide, Phytosterole, Aromastoffe). Ansatzalkohol extrahiert Alkaloide, Harze und Polyphenole für Tinkturen und hydroalkoholische Auszüge im 304-Edelstahlbehälter, während Pflanzenglycerin eine alkoholfreie Alternative bietet."
      )
    },
    {
      q: tr(
        "À quelle température préparer un macérat huileux avec BloomLab® ?",
        "At what temperature should an oil infusion be prepared with BloomLab®?",
        "Bei welcher Temperatur bereitet man ein Ölmazerat mit der BloomLab® zu?"
      ),
      a: tr(
        "La plage optimale se situe autour de 45°C pendant 90 à 180 minutes en cuve close inox 304 : suffisamment tiède pour fluidifier l'huile et accélérer la diffusion, tout en protégeant les acides gras polyinsaturés de l'oxydation.",
        "The optimal range is around 45°C for 90 to 180 minutes in the sealed 304 stainless-steel vessel: warm enough to lower viscosity and accelerate diffusion while protecting polyunsaturated fatty acids from oxidation.",
        "Der optimale Bereich liegt bei etwa 45°C für 90 bis 180 Minuten im geschlossenen 304-Edelstahlbehälter: warm genug für eine schnelle Diffusion bei vollem Oxidationsschutz der Fettsäuren."
      )
    },
    {
      q: tr(
        "Pourquoi associer plusieurs solvants dans la méthode Bloom by BotaniK ?",
        "Why combine multiple solvents in the Bloom by BotaniK method?",
        "Warum kombiniert die Methode Bloom by BotaniK mehrere Lösungsmittel?"
      ),
      a: tr(
        "Le séquençage A/B permet de recueillir d'abord les fractions hydrosolubles, puis les fractions liposolubles d'une même plante ou synergie afin de se rapprocher au plus près du Totum végétal.",
        "Sequential A/B extraction first captures water-soluble fractions and then fat-soluble fractions from the same plant or synergy, getting as close as possible to the whole Plant Totum.",
        "Die sequentielle A/B-Extraktion erfasst zuerst die wasserlöslichen und anschließend die fettlöslichen Fraktionen einer Pflanze, um dem gesamten Pflanzen-Totum nahezukommen."
      )
    },
    {
      q: tr(
        "Comment conserver ses extraits aqueux ou huileux ?",
        "How should aqueous or oil-based extracts be stored?",
        "Wie lagert man wässrige oder ölige Extrakte?"
      ),
      a: tr(
        "Les infusions aqueuses se préparent à la demande et se consomment rapidement au frais en surveillant odeur et aspect. Les huiles infusées filtrées et extraits glycérinés se conservent à l'abri de la lumière et de la chaleur dans un flacon ambré hermétique, selon l'huile ou le ratio utilisé.",
        "Aqueous infusions are best prepared fresh and consumed promptly when refrigerated, monitoring smell and clarity. Filtered infused oils and glycerin extracts keep away from light and heat in airtight amber glass bottles, depending on oil stability and preparation hygiene.",
        "Wässrige Auszüge am besten frisch zubereiten und gekühlt rasch verbrauchen (Geruch und Klarheit prüfen). Gefilterte Ölmazerate und Glyzerin-Auszüge licht- und wärmegeschützt in dicht verschlossenen Braunglasflaschen aufbewahren."
      )
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, view: View, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparisonRows: SolventComparisonRow[] = [
    {
      name: tr('Eau purifiée (H₂O)', 'Purified Water (H₂O)', 'Gereinigtes Wasser (H₂O)'),
      polarity: tr('Très polaire', 'Highly polar', 'Stark polar'),
      affinity: tr('Hydrosoluble', 'Water-soluble', 'Wasserlöslich'),
      targets: tr('Mucilages, minéraux, tanins doux, flavonoïdes solubles, polysaccharides', 'Mucilage, minerals, gentle tannins, soluble flavonoids, polysaccharides', 'Schleimstoffe, Mineralien, milde Gerbstoffe, lösliche Flavonoide, Polysaccharide'),
      temperature: tr('55 – 80 °C (jamais bouillante)', '55 – 80 °C (never boiling)', '55 – 80 °C (niemals kochend)'),
      conservation: tr('Consommation rapide au réfrigérateur', 'Prompt refrigerated use', 'Rasch gekühlt verbrauchen'),
      limit: tr('N’extrait ni les résines ni les terpènes lipophiles ; oxydation rapide', 'Does not extract resins or lipophilic terpenes; short shelf life', 'Extrahiert weder Harze noch lipophile Terpene; schnelle Oxidation')
    },
    {
      name: tr('Huile végétale vierge', 'Virgin Vegetable Oil', 'Natives Pflanzenöl'),
      polarity: tr('Apolaire (Lipophile)', 'Non-polar (Lipophilic)', 'Unpolar (Lipophil)'),
      affinity: tr('Liposoluble', 'Fat-soluble', 'Fettlöslich'),
      targets: tr('Terpènes, caroténoïdes, vitamines liposolubles (A, D, E, K), phytostérols', 'Terpenes, carotenoids, fat-soluble vitamins (A, D, E, K), phytosterols', 'Terpene, Carotinoide, fettlösliche Vitamine (A, D, E, K), Phytosterole'),
      temperature: tr('40 – 52 °C en milieu clos', '40 – 52 °C sealed vessel', '40 – 52 °C im geschlossenen System'),
      conservation: tr('Flacon ambré, à l’abri de la lumière et chaleur', 'Amber glass away from light & heat', 'Braunglas, licht- und wärmegeschützt'),
      limit: tr('Laisse de côté les polysaccharides et minéraux hydrosolubles', 'Leaves behind water-soluble polysaccharides and minerals', 'Erfasst keine wasserlöslichen Polysaccharide und Mineralien')
    },
    {
      name: tr('Alcool alimentaire (Teintures mères)', 'Food-Grade Alcohol (Mother Tinctures)', 'Ansatzalkohol (Urtinkturen)'),
      polarity: tr('Amphiphile (Bipolaire)', 'Amphiphilic (Dual polarity)', 'Amphiphil (Bipolar)'),
      affinity: tr('Hydro-alcoolique (45° à 96° selon plante)', 'Hydroalcoholic (45% to 96% ABV by plant)', 'Hydroalkoholisch (45–96 Vol.-% je nach Pflanze)'),
      targets: tr('Alcaloïdes, résines denses, lactones sesquiterpéniques, polyphénols', 'Alkaloids, dense resins, sesquiterpene lactones, polyphenols', 'Alkaloide, dichte Harze, Sesquiterpenlactone, Polyphenole'),
      temperature: tr('Programme Tincture (71 °C / 4 h par défaut, réglable) pour alcool ≥ 75 % vol. sans ajout d’eau ; mode Sans chauffe (30 min–12 h) ou bocal pour dilutions hydro-alcooliques', 'Tincture mode (71 °C / 4 h default, adjustable) for ≥ 75% ABV alcohol without water; No heating mode (30 min–12 h) or jar for water dilutions', 'Tincture-Programm (Standard 71 °C / 4 Std., einstellbar) für ≥ 75 Vol.-% ohne Wasser; Sans-chauffe-Modus (30 Min.–12 Std.) oder Glas für wässrige Verdünnungen'),
      conservation: tr('Flacon ambré hermétique à l’abri de la lumière et de la chaleur', 'Airtight amber glass away from light & heat', 'Luftdicht im Braunglas licht- und wärmegeschützt'),
      limit: tr('Solvant inflammable : pièce ventilée, aucune flamme, couvercle verrouillé, respect MIN/MAX et règle manuel « Ne pas ajouter d’eau » dans l’exemple chauffé ≥ 75 % ; contre-indiqué grossesse, enfants et sensibilité à l’alcool', 'Flammable solvent: ventilated room, no open flame, locked lid, MIN/MAX levels, and manual “Do not add water” rule in the heated ≥ 75% example; contraindicated in pregnancy, children, and alcohol sensitivity', 'Entzündliches Lösungsmittel: gut lüften, keine offene Flamme, verriegelter Deckel, MIN/MAX-Füllstand und Handbuchhinweis „Kein Wasser hinzufügen“ beim beheizten ≥ 75 %-Beispiel beachten; kontraindiziert in Schwangerschaft, für Kinder und bei Alkoholunverträglichkeit')
    },
    {
      name: tr('Glycérine végétale bio', 'Organic Vegetable Glycerin', 'Bio-Pflanzenglycerin'),
      polarity: tr('Polaire douce (Triol)', 'Mild polar (Triol)', 'Mild polar (Triol)'),
      affinity: tr('Hydro-polaire sans éthanol', 'Ethanol-free hydro-polar', 'Alkoholfrei hydro-polar'),
      targets: tr('Polyphénols, anthocyanes, composés aromatiques doux, flavonoïdes', 'Polyphenols, anthocyanins, mild aromatics, flavonoids', 'Polyphenole, Anthocyane, milde Aromastoffe, Flavonoide'),
      temperature: tr('45 – 60 °C sous agitation continue', '45 – 60 °C continuous stirring', '45 – 60 °C bei kontinuierlichem Rühren'),
      conservation: tr('Flacon ambré à l’abri des UV (ratio glycérine ≥ 65 %)', 'Amber glass away from UV (glycerin ratio ≥ 65%)', 'Braunglas vor UV geschützt (Glycerinanteil ≥ 65 %)'),
      limit: tr('Viscosité élevée demandant un brassage vortex continu pour vaincre la couche limite', 'Higher viscosity requiring continuous vortex agitation to overcome the boundary layer', 'Höhere Viskosität erfordert kontinuierlichen Vortex zum Überwinden der Grenzschicht')
    }
  ];

  const practicalSheets: SolventPracticalSheet[] = [
    {
      id: 'eau',
      name: tr("L'Eau (Le Solvant de la Vie)", 'Water (The Solvent of Life)', 'Wasser (Das Lösungsmittel des Lebens)'),
      polarityTag: tr('Affinité Hydrosoluble (Polaire)', 'Water-Soluble Affinity (Polar)', 'Wasserlösliche Affinität (Polar)'),
      tempRange: tr('55°C à 80°C', '55°C to 80°C', '55°C bis 80°C'),
      ratio: tr('1:15 à 1:20 (eau faiblement minéralisée)', '1:15 to 1:20 (low-mineral water)', '1:15 bis 1:20 (mineralarmes Wasser)'),
      duration: tr('20 à 45 min en chambre close', '20 to 45 min sealed', '20 bis 45 Min. geschlossen'),
      agitation: tr('Cyclique douce (jamais d’ébullition)', 'Gentle cyclic (never boiling)', 'Sanft zyklisch (niemals kochend)'),
      shelfLife: tr('À consommer rapidement au réfrigérateur', 'Prompt refrigerated consumption', 'Rasch gekühlt verbrauchen'),
      idealFor: tr('Mucilages, minéraux, tanins doux, flavonoïdes, polysaccharides.', 'Mucilage, minerals, mild tannins, flavonoids, polysaccharides.', 'Schleimstoffe, Mineralien, milde Gerbstoffe, Flavonoide, Polysaccharide.'),
      notes: tr('Ne jamais faire bouillir, car l’ébullition détruit les flavonoïdes et rend l’infusion amère. Prolifération bactérienne possible dès température tiède ; préparer frais à la demande.', 'Never boil, as boiling degrades delicate flavonoids and draws bitter tannins. Prepare fresh and store cold for prompt use; does not extract resins or essential oils.', 'Niemals aufkochen, da Siedehitze Flavonoide zerstört und Bitterstoffe löst. Frisch zubereiten und kühl lagern; löst keine Harze oder ätherischen Öle.')
    },
    {
      id: 'alcool',
      name: tr("L'Alcool (Teintures mères & Résines)", 'Alcohol (Mother Tinctures & Resins)', 'Alkohol (Urtinkturen & Harze)'),
      polarityTag: tr('Affinité Hydro-alcoolique (45° à 96° selon plante)', 'Hydroalcoholic Affinity (45–96% ABV by plant)', 'Hydroalkoholische Affinität (45–96 % Vol.)'),
      tempRange: tr('Sans chauffe (30 min–12 h) ou Tincture (défaut 71 °C / 160 °F – 4 h, TEMP/TIME réglables selon plante)', 'No heating (30 min–12h) or Tincture (default 71°C / 160°F – 4h, TEMP/TIME adjustable per plant)', 'Ohne Heizung (30 Min.–12 Std.) oder Tincture (Standard 71 °C / 160 °F – 4 Std., TEMP/TIME anpassbar)'),
      ratio: tr('1:5 (plantes sèches) à 1:2 (plantes fraîches) ; titre adapté (45–60° feuilles/fleurs, 70° racines/écorces, 90–96° résines)', '1:5 (dry) to 1:2 (fresh); adapted strength (45–60% leaves/flowers, 70% roots/barks, 90–96% resins)', '1:5 (Trocken) bis 1:2 (Frisch); angepasst (45–60 % Blüten/Blätter, 70 % Wurzeln, 90–96 % Harze)'),
      duration: tr('Réglable (30 min–12 h ; défaut Tincture 4 h) · 2–4 sem. en bocal', 'Adjustable (30 min–12h; Tincture default 4h) · 2–4 wks in jar', 'Einstellbar (30 Min.–12 Std.; Tincture-Standard 4 Std.) · 2–4 Wo. im Glas'),
      agitation: tr('Brassage cyclique en cuve fermée BloomLab® ou agitation manuelle en bocal', 'Cyclic stirring inside sealed BloomLab® or manual shaking in glass jar', 'Zyklisches Rühren in geschlossener BloomLab® oder Schütteln im Glas'),
      shelfLife: tr('Flacon ambré hermétique à l’abri de la lumière et de la chaleur (vérifier limpidité)', 'Airtight amber glass away from light & heat (inspect clarity)', 'Luftdicht im Braunglas licht- & wärmegeschützt'),
      idealFor: tr('Teintures mères, extraits hydroalcooliques, résines, propolis, écorces denses et alcaloïdes.', 'Mother tinctures, hydroalcoholic extracts, resins, propolis, dense barks, and alkaloids.', 'Urtinkturen, hydroalkoholische Extrakte, Harze, Propolis, Rinden und Alkaloide.'),
      notes: tr('Le manuel BloomLab® indique 160 °F (71 °C) et 4 h par défaut pour Tincture (avec temps et température modifiables) et un mode Sans chauffe (30 min–12 h). Attention INRS : le point d’éclair de l’éthanol est de 13 °C pur (21 °C à 70 % vol., 49 °C à 10 % vol.) : à 50 °C comme à 71 °C, les vapeurs sont déjà inflammables et leur pression de vapeur augmente avec la chaleur. Pièce ventilée, aucune flamme, couvercle verrouillé, MIN–MAX ; en présence d’eau ajoutée (45°–70°), privilégiez Sans chauffe ou le bocal fermé (l’exemple chauffé du manuel est ≥ 75 % vol. sans eau ni lécithine).', 'The BloomLab® manual specifies 160°F (71°C) and 4h as the Tincture default (adjustable time and temperature) plus No heating (30 min–12h). Safety note: ethanol flash points are 13°C pure, 21°C at 70%, and 49°C at 10%—at both 50°C and 71°C vapors are already flammable and vapor pressure rises with temperature. Use a well-ventilated room, zero open flames, locked lid, MIN–MAX bounds; prefer No heating or a jar when water is added (the heated manual example uses ≥ 75% ABV with no water or lecithin).', 'Das BloomLab®-Handbuch nennt 160 °F (71 °C) und 4 Std. als Standard für Tincture (Zeit/Temperatur anpassbar) sowie Ohne Heizung (30 Min.–12 Std.). Hinweis: Ethanol-Flammpunkte liegen bei 13 °C (rein), 21 °C (70 %) bzw. 49 °C (10 %) – sowohl bei 50 °C als auch bei 71 °C sind Dämpfe bereits entzündlich. Nur gut belüftet, ohne Flammen, Deckel verriegelt, MIN–MAX verwenden; bei Wasserzusatz (45–70 %) Ohne Heizung oder Glas bevorzugen.')
    },
    {
      id: 'glycerine',
      name: tr('La Glycérine (Le Solvant Doux)', 'Vegetable Glycerin (The Gentle Solvent)', 'Glycerin (Das sanfte Lösungsmittel)'),
      polarityTag: tr('Affinité Hydro-polaire sans éthanol', 'Ethanol-Free Hydro-Polar Affinity', 'Alkoholfreie hydro-polare Affinität'),
      tempRange: tr('45°C à 60°C', '45°C to 60°C', '45°C bis 60°C'),
      ratio: tr('Ratio glycérine ≥ 65 % (ex. 60-70 % / 30-40 % eau)', 'Glycerin ratio ≥ 65% (e.g. 60–70% / 30–40% water)', 'Glycerinanteil ≥ 65 % (z. B. 60–70 % / 30–40 % Wasser)'),
      duration: tr('90 à 150 min sous agitation continue', '90 to 150 min continuous stirring', '90 bis 150 Min. bei Dauerrühren'),
      agitation: tr('Brassage vortex continu (viscosité élevée)', 'Continuous vortex stirring (high viscosity)', 'Kontinuierlicher Vortex (hohe Viskosität)'),
      shelfLife: tr('Flacon ambré à l’abri des UV (selon teneur en eau)', 'Amber glass away from UV (depends on water ratio)', 'Braunglas UV-geschützt (abhängig vom Wasseranteil)'),
      idealFor: tr('Polyphénols, anthocyanes, composés aromatiques doux, flavonoïdes.', 'Polyphenols, anthocyanins, mild aromatics, flavonoids.', 'Polyphenole, Anthocyane, milde Aromastoffe, Flavonoide.'),
      notes: tr('Sa viscosité élevée demande un brassage vortex continu afin d’optimiser l’extraction sans recourir à l’éthanol.', 'Its higher viscosity calls for continuous vortex stirring to optimize extraction without ethanol.', 'Seine hohe Viskosität erfordert kontinuierliches Rühren für eine optimale Extraktion ohne Ethanol.')
    },
    {
      id: 'huile',
      name: tr('Les Huiles Végétales (Les Solvants Lipophiles)', 'Vegetable Oils (Lipophilic Solvents)', 'Pflanzenöle (Lipophile Lösungsmittel)'),
      polarityTag: tr('Affinité Liposoluble (Apolaire)', 'Fat-Soluble Affinity (Non-Polar)', 'Fettlösliche Affinität (Unpolar)'),
      tempRange: tr('40°C à 50°C max', '40°C to 50°C max', '40°C bis max. 50°C'),
      ratio: tr('1:5 à 1:8 (plantes sèches < 8 % d’humidité)', '1:5 to 1:8 (dry plants < 8% moisture)', '1:5 bis 1:8 (Trockenpflanzen < 8 % Feuchte)'),
      duration: tr('90 à 180 min', '90 to 180 min', '90 bis 180 Min.'),
      agitation: tr('Vortex doux en milieu clos', 'Gentle vortex in sealed vessel', 'Sanfter Vortex im geschlossenen System'),
      shelfLife: tr('Flacon ambré à l’abri de l’air et de la lumière (surveiller l’odeur)', 'Amber glass away from air & light (monitor freshness)', 'Braunglas luft- und lichtgeschützt (Frische prüfen)'),
      idealFor: tr('Terpènes, vitamines liposolubles (A, D, E, K), caroténoïdes, phytostérols.', 'Terpenes, fat-soluble vitamins (A, D, E, K), carotenoids, phytosterols.', 'Terpene, fettlösliche Vitamine (A, D, E, K), Carotinoide, Phytosterole.'),
      notes: tr('Température maximale : 40-50°C — ne jamais dépasser pour éviter l’oxydation et préserver les acides gras essentiels (Oméga 3, 6, 9) de l’huile de support.', 'Max temperature: 40–50°C — never exceed to prevent oxidation and preserve essential fatty acids (Omega 3, 6, 9) of the carrier oil.', 'Maximaltemperatur: 40–50°C — niemals überschreiten, um Oxidation zu vermeiden und Omega-3, 6, 9-Fettsäuren zu schützen.')
    }
  ];

  const carrierOils: CarrierOilGuide[] = [
    {
      name: tr("Huile d'Olive", 'Olive Oil', 'Olivenöl'),
      profile: tr('Très stable, riche en polyphénols', 'Highly stable, polyphenol-rich', 'Sehr stabil, reich an Polyphenolen'),
      temp: '40°C - 45°C',
      usage: tr('Idéale pour les macérats de romarin ou de calendula.', 'Ideal for rosemary or calendula oil macerates.', 'Ideal für Rosmarin- oder Calendula-Mazerate.')
    },
    {
      name: tr('Huile de Nigelle', 'Black Seed (Nigella) Oil', 'Schwarzkümmelöl'),
      profile: tr('Très sensible, riche en thymoquinone', 'Heat-sensitive, rich in thymoquinone', 'Empfindlich, reich an Thymochinon'),
      temp: tr('40°C max', '40°C max', 'Max. 40°C'),
      usage: tr('Préserve la thymoquinone, son actif majeur, qu’une chaleur trop élevée détruit.', 'Preserves delicate thymoquinone that excessive heat degrades.', 'Schützt empfindliches Thymochinon vor Hitzeabbau.')
    },
    {
      name: tr("Huile d'Avocat", 'Avocado Oil', 'Avocadoöl'),
      profile: tr('Riche en insaponifiables et vitamines', 'Rich in unsaponifiables and vitamins', 'Reich an Unverseifbarem und Vitaminen'),
      temp: '45°C',
      usage: tr('Très pénétrante, parfaite pour les soins cosmétiques corporels et massages cutanés.', 'Deeply penetrating, ideal for nourishing cosmetic body oils and skin massages.', 'Sehr gut einziehend, ideal für pflegende Körperöle und Hautmassagen.')
    },
    {
      name: tr('Huile de Macadamia', 'Macadamia Oil', 'Macadamiaöl'),
      profile: tr('Riche en acide palmitoléique', 'Rich in palmitoleic acid', 'Reich an Palmitoleinsäure'),
      temp: '45°C',
      usage: tr('Très fluide, idéale pour les soins du visage.', 'Silky fluid texture, ideal for facial serums.', 'Sehr flüssig, ideal für die Gesichtspflege.')
    },
    {
      name: tr('Huile de Jojoba', 'Jojoba Oil', 'Jojobaöl'),
      profile: tr('Cire liquide, très stable', 'Liquid wax ester, ultra stable', 'Flüssiges Wachs, extrem stabil'),
      temp: '45°C - 50°C',
      usage: tr('Ne rancit pas, idéale pour le cuir chevelu.', 'Oxidation-resistant, ideal for scalp and hair care.', 'Wird nicht ranzig, ideal für Kopfhaut und Haar.')
    },
    {
      name: tr('Huile de Coco', 'Coconut Oil', 'Kokosöl'),
      profile: tr('Solide en dessous de 24°C', 'Solid below 24°C', 'Fest unter 24°C'),
      temp: '40°C - 45°C',
      usage: tr('Idéale pour les baumes cutanés, à doser selon la tolérance des pores.', 'Ideal for nourishing body balms; adjust for facial pore tolerance.', 'Ideal für Körperbalsame; bei Gesichtspflege sparsam dosieren.')
    },
    {
      name: tr('Huile de Sésame', 'Sesame Oil', 'Sesamöl'),
      profile: tr('Très stable, antioxydante', 'Very stable and antioxidant', 'Sehr stabil und antioxidativ'),
      temp: '45°C',
      usage: tr('Parfaite pour les huiles de massage traditionnelles et l’entretien cosmétique de la peau.', 'Traditional choice for warming external body oils and cosmetic skin care.', 'Perfekt für traditionelle Massageöle und geschmeidige Hautpflege.')
    },
    {
      name: tr('Huile de Moutarde', 'Mustard Seed Oil', 'Senfsamenöl'),
      profile: tr('Très piquante, riche en soufre', 'Warming, sulfur-rich profile', 'Wärmend, reich an Schwefelverbindungen'),
      temp: tr('40°C max', '40°C max', 'Max. 40°C'),
      usage: tr('Utilisée traditionnellement pour stimuler la microcirculation locale (usage externe avec précaution).', 'Traditionally used externally to stimulate local warmth and circulation (use with caution).', 'Traditionell äußerlich zur Förderung der lokalen Durchblutung (vorsichtig anwenden).')
    }
  ];

  const signatureRecipes: SignatureRecipe[] = [
    {
      id: 'serum-polyphenols',
      name: tr('Sérum Polyphénols à la Glycérine (Sans Alcool)', 'Alcohol-Free Polyphenol Glycerin Serum', 'Alkoholfreies Polyphenol-Glycerin-Serum'),
      objective: tr("Extraire un maximum de polyphénols pour un soin cosmétique protecteur du teint.", 'Extract polyphenols for an antioxidant-rich skin care elixir.', 'Polyphenole für eine schützende Hautpflege extrahieren.'),
      description: tr('Une macération glycéro-hydrolatée douce sans éthanol, conçue pour capter les polyphénols et acides phénoliques du romarin sans dénaturation thermique.', 'An ethanol-free glycerin-hydrosol extraction crafted to capture rosemary polyphenols and phenolic acids without thermal damage.', 'Eine ethanolfreie Glycerin-Hydrolat-Extraktion für Rosmarin-Polyphenole ohne Hitzeschädigung.'),
      phaseLabel: tr('Sachet A · Polarité Douce Sans Alcool', 'Phase A · Gentle Alcohol-Free Polarity', 'Phase A · Sanfte alkoholfreie Polarität'),
      composition: tr('20 g de romarin séché', '20 g dried rosemary leaves', '20 g getrockneter Rosmarin'),
      solvent: tr("60 % Glycérine végétale + 40 % Eau florale de rose", '60% Vegetable glycerin + 40% Rose hydrosol', '60 % Pflanzenglycerin + 40 % Rosenhydrolat'),
      temperature: '45°C',
      duration: tr('2h, mode agitation continu', '2h, continuous stirring mode', '2 Std., Dauerrührmodus'),
      administration: tr('Usage externe cutané : appliquer quelques gouttes sur peau propre ou incorporer dans une crème neutre après filtration sur filtre à mailles très fines.', 'External topical use: apply a few drops on clean skin or blend into a neutral cream base after fine mesh filtration.', 'Äußerliche Anwendung: nach feiner Filtration einige Tropfen auf die gereinigte Haut auftragen oder in eine neutrale Creme mischen.'),
      dosage: tr('Usage général externe : 2 à 4 gouttes matin et soir sur le visage et le cou ; maximum 8 gouttes/jour.', 'General external use: 2–4 drops morning and evening on face and neck; max 8 drops/day.', 'Äußerliche Anwendung: morgens und abends 2–4 Tropfen auf Gesicht und Hals; max. 8 Tropfen/Tag.'),
      precautions: tr('Filtrer impérativement sur un filtre à mailles très fines pour retirer toute microparticule végétale. Conserver en flacon ambré à l’abri de la lumière.', 'Always filter through ultra-fine mesh to remove microparticles. Store in an amber glass bottle away from light.', 'Unbedingt fein filtrieren, um Pflanzenpartikel zu entfernen. Im Braunglas lichtgeschützt lagern.'),
      contraindications: tr('Réaliser un test cutané préalable au pli du coude 24h avant application. Éviter le contact direct avec les yeux ; demander un avis professionnel en cas de peau réactive.', 'Perform an inner-elbow patch test 24h before use. Avoid eye contact; consult a specialist if skin is reactive.', '24 Stunden vorab einen Verträglichkeitstest in der Armbeuge durchführen. Augenkontakt vermeiden.')
    },
    {
      id: 'teinture-propolis',
      name: tr('Teinture Mère de Propolis (Alcool 90°–96° & Option Sans Alcool)', 'Propolis Mother Tincture (90–96% Alcohol & Alcohol-Free Option)', 'Propolis-Urtinktur (90–96 % Alkohol & alkoholfreie Option)'),
      objective: tr('Solubiliser efficacement les résines, cires et flavonoïdes lipophiles de la propolis brute grâce au titre alcoolique optimal (90°–96°).', 'Efficiently dissolve raw propolis resins, waxes, and lipophilic flavonoids using optimal high-proof alcohol (90–96% ABV).', 'Harze, Wachse und lipophile Flavonoide von Rohpropolis mit optimalem Hochprozent-Alkohol (90–96 %) lösen.'),
      description: tr('La propolis étant riche en résines cireuses insolubles dans l’eau, l’éthanol à 90°–96° sans ajout d’eau évite la précipitation résineuse. En BloomLab®, le programme Tincture (défaut 71 °C / 160 °F – 4 h) est réglable en temps et température : vous pouvez l’ajuster manuellement à 40–45 °C / 2h30 pour ménager les composés volatils de la propolis, ou macérer en bocal hermétique hors appareil, en respectant les consignes anti-flamme (vapeurs déjà inflammables dès 13 °C pur) et sans jamais laisser l’appareil sans surveillance en fonctionnement ni branché. Option sans alcool : macérat huileux ou glycériné à 45 °C.', 'Because propolis is rich in water-insoluble waxy resins, anhydrous 90–96% ABV ethanol prevents resin precipitation. On BloomLab®, the Tincture preset (71°C / 160°F – 4h default) allows manual TEMP/TIME programming (e.g., 40–45°C / 2.5h to preserve volatile resin fractions) or cold jar maceration outside the appliance under strict flame-free rules (ethanol vapors are already flammable at 13°C pure), and never leaving the appliance unattended during operation or while plugged in. Alcohol-free option: oil or glycerin macerate at 45°C.', 'Da Propolis reich an wasserunlöslichen Wachsen und Harzen ist, verhindert hochprozentiger Alkohol (90–96 % ohne Wasser) das Ausfällen. Auf der BloomLab® lässt sich das Tincture-Programm (Standard 71 °C / 160 °F – 4 Std.) manuell anpassen (z. B. 40–45 °C / 2,5 Std.) oder im verschlossenen Glas außerhalb des Geräts mazerieren – stets unter strengen Flammschutzregeln (Dämpfe bereits ab 13 °C entzündlich) und ohne das Gerät im Betrieb oder eingesteckten Zustand jemals unbeaufsichtigt zu lassen. Alkoholfrei: Öl- oder Glycerin-Mazerat bei 45 °C.'),
      phaseLabel: tr('Extraction Résineuse · Haute Preuve Sans Eau (90°–96°)', 'Resin Extraction · Waterless High-Proof (90–96% ABV)', 'Harzextraktion · Ohne Wasserzusatz (90–96 %)'),
      composition: tr('30 g de propolis brute finement concassée (préalablement durcie au froid)', '30 g finely crushed raw propolis (chilled beforehand for easy crushing)', '30 g fein zerkleinertes, vorgekühltes Rohpropolis'),
      solvent: tr('300 ml d’alcool éthylique bio alimentaire à 90°–96° (sans eau) — respecter le niveau MIN de cuve', '300 ml organic food-grade 90–96% ABV ethanol (no water added) — meet tank MIN level', '300 ml Bio-Speisealkohol 90–96 % (ohne Wasser) — MIN-Markierung einhalten'),
      temperature: tr('40–45 °C (réglage manuel sur Tincture, défaut 71 °C) ou bocal hors appareil', '40–45°C (manual setting on Tincture, 71°C default) or glass jar outside appliance', '40–45 °C (manuell in Tincture, Standard 71 °C) oder Glas außerhalb des Geräts'),
      duration: tr('2h30 (ou défaut 4h sous surveillance continue ; couvercle verrouillé)', '2h30 (or 4h default, constantly attended; locked lid)', '2,5 Std. (oder Standard 4 Std., unter Aufsicht; Deckel verriegelt)'),
      administration: tr('Usage adulte dilué sur support (miel, mie de pain ou eau tiède) ou application locale externe diluée après décantation et filtration.', 'Adult use diluted in honey/warm drink or diluted topical application after settling and fine filtration.', 'Für Erwachsene verdünnt auf Honig/Wasser oder äußerlich nach Dekantieren und Filtration.'),
      dosage: tr('Usage général adulte : 10 à 20 gouttes diluées, 1 à 2 fois par jour ; cure ponctuelle de 10 à 15 jours (avis professionnel si besoin).', 'General adult use: 10–20 diluted drops, 1–2 times daily for 10–15 days (seek professional guidance if needed).', 'Allgemein für Erwachsene: 10–20 verdünnte Tropfen, 1–2× täglich über 10–15 Tage.'),
      precautions: tr('Vapeurs hautement inflammables (point d’éclair éthanol pur : 13 °C ; la pression de vapeur augmente avec la chaleur) : aucune flamme nue (gaz/briquet) ni cigarette à proximité, pièce très bien ventilée, couvercle verrouillé pendant tout le cycle, ne pas ajouter d’eau ni de lécithine en chauffe, respecter les repères MIN–MAX. Laisser refroidir avant ouverture et filtrer finement pour séparer les cires.', 'Highly flammable vapors (pure ethanol flash point: 13°C; vapor pressure increases with heat): zero open flames or smoking nearby, well-ventilated room, locked lid throughout cycle, do not add water or lecithin when heating, obey MIN–MAX lines. Cool before opening and filter finely to separate waxes.', 'Leicht entzündliche Dämpfe (Flammpunkt rein 13 °C, Dampfdruck steigt mit Wärme): keine offene Flamme/Rauchen, gut belüften, Deckel verriegelt halten, kein Wasser/Lecithin bei Erhitzung zugeben, MIN–MAX beachten. Vor dem Öffnen abkühlen lassen und Wachse abfiltrieren.'),
      contraindications: tr('Allergie aux produits de la ruche, asthme allergique ; contre-indiqué grossesse, allaitement, enfants et sensibilité/restriction à l’alcool (préférer alors l’option glycérine/huile).', 'Bee-product allergy, allergic asthma; contraindicated during pregnancy, breastfeeding, in children, or with alcohol restrictions (use glycerin/oil option instead).', 'Allergie gegen Bienenprodukte, allergisches Asthma; nicht in Schwangerschaft, Stillzeit, bei Kindern oder Alkoholunverträglichkeit.')
    },
    {
      id: 'macerat-calendula',
      name: tr('Macérat Huileux Intégral de Calendula', 'Whole-Flower Calendula Infused Oil', 'Ganzblüten-Calendula-Ölmazerat'),
      objective: tr('Préserver les caroténoïdes et triterpènes apaisants des capitules entiers sans altération lipidique.', 'Preserve soothing carotenoids and triterpenes from whole calendula heads without lipid oxidation.', 'Beruhigende Carotinoide und Triterpene ganzer Ringelblumenblüten ohne Lipidoxidation bewahren.'),
      description: tr('À 45°C en milieu clos, l’huile d’olive ou de jojoba capture les composés liposolubles du calendula en 2h tout en protégeant les acides gras de l’oxydation.', 'At 45°C in a sealed chamber, olive or jojoba oil captures calendula fat-soluble compounds in 2h while safeguarding fatty acids.', 'Bei 45°C im geschlossenen Gefäß bindet Oliven- oder Jojobaöl die fettlöslichen Stoffe der Ringelblume in 2 Stunden schonend.'),
      phaseLabel: tr('Sachet B · Fraction Liposoluble', 'Phase B · Lipophilic Fraction', 'Phase B · Fettlösliche Fraktion'),
      composition: tr('25 g de capitules entiers de Calendula officinalis séchés (< 8 % humidité)', '25 g dried whole Calendula officinalis flowers (< 8% moisture)', '25 g getrocknete ganze Calendula-Blüten (< 8 % Restfeuchte)'),
      solvent: tr("200 ml d'huile végétale vierge d'Olive ou de Jojoba (ratio 1:8)", '200 ml virgin Olive or Jojoba oil (1:8 ratio)', '200 ml natives Oliven- oder Jojobaöl (Verhältnis 1:8)'),
      temperature: '45°C',
      duration: tr('2h sous agitation douce continue', '2h under continuous gentle stirring', '2 Std. unter sanftem Dauerrühren'),
      administration: tr('Application cutanée pure ou en base de baume sur les zones sèches.', 'Topical application neat or as a balm base on dry areas.', 'Pur auf trockene Hautpartien auftragen oder als Balsambasis verwenden.'),
      dosage: tr('Usage strictement externe : quelques gouttes en massage doux 1 à 2 fois par jour.', 'External use only: a few drops massaged gently 1–2 times daily.', 'Nur zur äußeren Anwendung: 1–2x täglich einige Tropfen sanft einmassieren.'),
      precautions: tr('Vérifier que les fleurs sont parfaitement sèches avant extraction pour éviter toute eau résiduelle.', 'Ensure flowers are thoroughly dried prior to extraction to prevent residual moisture.', 'Sicherstellen, dass die Blüten vollständig getrocknet sind, um Restwasser zu vermeiden.'),
      contraindications: tr('Allergie connue aux plantes de la famille des Astéracées. Réaliser un test cutané au pli du coude 24h avant usage.', 'Known allergy to Asteraceae family plants. Perform an inner-elbow patch test 24h before use.', 'Bekannte Allergie gegen Korbblütler (Asteraceae). Vorab Verträglichkeitstest durchführen.')
    }
  ];

  const organSolventMatrix: OrganSolventRow[] = [
    {
      organ: tr('Foie', 'Liver', 'Leber'),
      polarity: tr('Amphiphile', 'Amphiphilic', 'Amphiphil'),
      idealSolvent: tr('Alcool 45°, Glycérine ou Eau / Huile', '45% Alcohol, Glycerin or Water / Oil', 'Alkohol 45 %, Glycerin oder Wasser / Öl'),
      plants: tr('Chardon-Marie, Pissenlit', 'Milk Thistle, Dandelion', 'Mariendistel, Löwenzahn')
    },
    {
      organ: tr('Reins', 'Kidneys', 'Nieren'),
      polarity: tr('Polaire', 'Polar', 'Polar'),
      idealSolvent: tr('Eau', 'Water', 'Wasser'),
      plants: tr('Prêle, Orthosiphon', 'Horsetail, Orthosiphon', 'Ackerschachtelhalm, Orthosiphon')
    },
    {
      organ: tr('Cuir Chevelu', 'Scalp', 'Kopfhaut'),
      polarity: tr('Apolaire', 'Non-Polar', 'Unpolar'),
      idealSolvent: tr('Huile (Jojoba, Nigelle)', 'Oil (Jojoba, Black Seed)', 'Öl (Jojoba, Schwarzkümmel)'),
      plants: tr('Romarin, Gingembre', 'Rosemary, Ginger', 'Rosmarin, Ingwer')
    },
    {
      organ: tr('Système Nerveux', 'Nervous System', 'Nervensystem'),
      polarity: tr('Mixte', 'Dual', 'Gemischt'),
      idealSolvent: tr('Eau ou Glycérine (sans alcool)', 'Water or Glycerin (alcohol-free)', 'Wasser oder Glycerin (alkoholfrei)'),
      plants: tr('Passiflore, Valériane', 'Passionflower, Valerian', 'Passionsblume, Baldrian')
    }
  ];

  const plantMappings: PlantSolventMapping[] = [
    {
      plantCategory: tr('Fleurs aromatiques & Sommités tendres', 'Aromatic Flowers & Tender Tops', 'Aromatische Blüten & zarte Spitzen'),
      examples: tr('Camomille matricaire, Lavande, Mélisse, Tilleul', 'German Chamomile, Lavender, Lemon Balm, Linden', 'Echte Kamille, Lavendel, Zitronenmelisse, Linde'),
      dominantPolarity: tr('Mixte (Terpènes volatils + Flavonoïdes polaires)', 'Dual (Volatile terpenes + Polar flavonoids)', 'Gemischt (Flüchtige Terpene + Polare Flavonoide)'),
      recommendedSolvent: tr('Eau à 60 °C (Phase A) ou Huile à 42 °C (Phase B)', 'Water at 60 °C (Phase A) or Oil at 42 °C (Phase B)', 'Wasser bei 60 °C (Phase A) oder Öl bei 42 °C (Phase B)'),
      sequenceTip: tr('Éviter l’ébullition pour sauvegarder les huiles essentielles thermolabiles.', 'Avoid boiling to protect heat-sensitive essential oils.', 'Kochen vermeiden, um hitzeempfindliche ätherische Öle zu schützen.')
    },
    {
      plantCategory: tr('Résines, Écorces & Bourgeons cireux', 'Resins, Barks & Waxy Buds', 'Harze, Rinden & wachsartige Knospen'),
      examples: tr('Propolis, Encens (Boswellia), Cannelle, Bourgeon de Peuplier', 'Propolis, Frankincense (Boswellia), Cinnamon, Poplar Bud', 'Propolis, Weihrauch (Boswellia), Zimt, Pappelknospe'),
      dominantPolarity: tr('Lipophile / Amphiphile dense', 'Dense Lipophilic / Amphiphilic', 'Dicht lipophil / amphiphil'),
      recommendedSolvent: tr('Alcool 90–96° (résines pures) ou huile végétale (45–48 °C en BloomLab®)', '90–96% Alcohol (pure resins) or carrier oil (45–48°C in BloomLab®)', '90–96 % Alkohol (reine Harze) oder Pflanzenöl (45–48 °C in BloomLab®)'),
      sequenceTip: tr('L’eau seule ne dissout pas les résines : privilégier l’alcool 90–96° (programme Tincture sans eau sous surveillance, ou bocal hermétique) ou la Phase B huileuse en BloomLab®.', 'Water alone cannot dissolve resins: use 90–96% alcohol (attended waterless Tincture mode or sealed glass jar) or oil Phase B in BloomLab®.', 'Wasser allein löst keine Harze: 90–96 % Alkohol (Tincture ohne Wasser unter Aufsicht oder verschlossenes Glas) oder Öl-Phase B in der BloomLab® wählen.')
    },
    {
      plantCategory: tr('Racines fibreuses & Champignons adaptogènes', 'Fibrous Roots & Adaptogenic Mushrooms', 'Faserige Wurzeln & adaptogene Vitalpilze'),
      examples: tr('Reishi, Astragale, Ashwagandha, Curcuma', 'Reishi, Astragalus, Ashwagandha, Turmeric', 'Reishi, Astragalus, Ashwagandha, Kurkuma'),
      dominantPolarity: tr('Double polarité (Bêta-glucanes polaires + Triterpènes lipophiles)', 'Dual polarity (Polar beta-glucans + Lipophilic triterpenes)', 'Doppelpolarität (Polare Beta-Glucane + Lipophile Triterpene)'),
      recommendedSolvent: tr('Séquençage A/B complet (Eau 75 °C puis Huile 45 °C)', 'Full A/B Sequencing (Water 75 °C then Oil 45 °C)', 'Volle A/B-Sequenzierung (Wasser 75 °C, dann Öl 45 °C)'),
      sequenceTip: tr('Associer les deux phases restitue le Totum complet de la matrice ligneuse.', 'Combining both phases restores the full woody Totum.', 'Die Kombination beider Phasen erfasst das vollständige Totum.')
    },
    {
      plantCategory: tr('Baies & Feuilles riches en polyphénols', 'Polyphenol-Rich Berries & Leaves', 'Polyphenolreiche Beeren & Blätter'),
      examples: tr('Myrtille, Hibiscus, Vigne rouge, Romarin', 'Bilberry, Hibiscus, Red Vine, Rosemary', 'Heidelbeere, Hibiskus, Rotes Weinlaub, Rosmarin'),
      dominantPolarity: tr('Polaire à modérément polaire', 'Polar to moderately polar', 'Polar bis mäßig polar'),
      recommendedSolvent: tr('Glycérine végétale (70/30) ou Eau tempérée 65 °C', 'Vegetable glycerin (70/30) or Water at 65 °C', 'Pflanzenglycerin (70/30) oder Wasser bei 65 °C'),
      sequenceTip: tr('La glycérine stabilise durablement les anthocyanes fragiles sans éthanol.', 'Glycerin stabilizes delicate anthocyanins without ethanol.', 'Glycerin stabilisiert empfindliche Anthocyane ohne Ethanol.')
    }
  ];

  return (
    <GlossaryProvider pageKey="guide-solvants">
      <div className="flex-1 bg-[#FAF7F2] text-[#3E4A3D] min-h-screen w-full">
        {/* SECTION 0 — HERO SECTION VERT FORÊT AVEC FIL D'ARIANE */}
        <header className="w-full bg-[#1E2E25] text-white border-b border-white/10 relative overflow-hidden">
          <div className="w-full bg-[#0F261E] border-b border-white/10 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 relative z-20">
            <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto">
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs text-white">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, 'indexbis')}
                    className="text-white/80 hover:text-[#F5F0E6] transition-colors"
                  >
                    {isDE ? 'Startseite' : isEN ? 'Home' : 'Accueil'}
                  </a>
                </li>
                <li><span className="text-white/40">/</span></li>
                <li>
                  <a
                    href="/extraction-botanique/"
                    onClick={(e) => handleNavClick(e, 'guide-complet')}
                    className="text-white/80 hover:text-[#F5F0E6] transition-colors"
                  >
                    {isDE ? 'Die A/B Methode' : isEN ? 'The A/B Method' : 'La Méthode A/B'}
                  </a>
                </li>
                <li><span className="text-white/40">/</span></li>
                <li className="text-white font-bold" aria-current="page">
                  {tr('Guide des Solvants', 'Solvents Guide', 'Lösungsmittel-Leitfaden')}
                </li>
              </ol>
            </nav>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 relative z-10">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20">
                <FlaskConical className="w-3.5 h-3.5 text-[#E8772E]" />
                <span>{tr("Polarité & Ingénierie d'Extraction", 'Polarity & Extraction Engineering', 'Polarität & Extraktionstechnik')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white !text-white leading-tight font-sans">
                {tr("Le Guide des Solvants : La Clé de l'Extraction", 'The Solvents Guide: The Key to Extraction', 'Der Lösungsmittel-Leitfaden: Der Schlüssel zur Extraktion')}
              </h1>

              <p className="text-lg sm:text-xl text-white/90 !text-white leading-relaxed font-normal max-w-3xl">
                {tr(
                  'Eau, Huile, Alcool, Glycérine : apprenez à choisir le bon solvant avec la méthode ',
                  'Water, Oil, Alcohol, Glycerin: learn to select the right solvent with the ',
                  'Wasser, Öl, Alkohol, Glyzerin: lernen Sie, das richtige Lösungsmittel mit der Methode '
                )}
                <strong className="text-white">Bloom by BotaniK</strong>
                {tr(" et l'extracteur ", ' method and the ', ' und dem Extraktor ')}
                <strong className="text-white">BloomLab®</strong>
                {tr(' pour libérer le ', ' extractor to release the ', ' zu wählen, um das ')}
                <TooltipLexique terme="totum" force={true}>
                  <span className="text-white underline decoration-[#E8772E] decoration-dotted underline-offset-4">
                    {tr('Totum Végétal', 'Plant Totum', 'Pflanzen-Totum')}
                  </span>
                </TooltipLexique>
                {lang === 'de' ? ' freizusetzen' : ''}
              </p>

              <p className="text-xs sm:text-sm text-white/85 !text-white bg-white/10 p-3.5 rounded-xl border border-white/15 max-w-2xl leading-relaxed">
                {tr(
                  "Ressource éducative dédiée à la chimie douce de l'extraction botanique. Ces informations générales accompagnent la compréhension du végétal et ne remplacent jamais un avis médical ni un traitement prescrit.",
                  'Educational resource dedicated to the gentle chemistry of botanical extraction. This general information supports understanding of plant science and never replaces medical advice or prescribed treatment.',
                  'Bildungsressource zur sanften Chemie der botanischen Extraktion. Diese allgemeinen Informationen dienen dem Verständnis der Pflanzenkunde und ersetzen niemals ärztlichen Rat oder eine verordnete Behandlung.'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('comparatif-solvants')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>{tr('Comparer les 4 solvants', 'Compare the 4 solvents', 'Die 4 Lösungsmittel vergleichen')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('machine')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1E2E25] font-bold text-sm border border-white/20 transition-all shadow-xs cursor-pointer"
                >
                  <span>{tr('Découvrir la BloomLab®', 'Discover BloomLab®', 'BloomLab® entdecken')}</span>
                  <Sparkles className="w-4 h-4 text-[#E8772E]" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16 space-y-16">
          {/* ================================================================= */}
          {/* PARTIE GRATUITE (ÉDUCATION) : TABLEAU COMPARATIF DES 4 SOLVANTS   */}
          {/* ================================================================= */}
          <section id="comparatif-solvants" className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                <Droplets className="w-4 h-4 text-[#E8772E]" />
                <span>{tr('Accès Libre · Fondamentaux de Polarité', 'Open Access · Polarity Fundamentals', 'Freier Zugang · Grundlagen der Polarität')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                {tr(
                  'Pourquoi un seul solvant ne capture jamais toute la plante',
                  'Why a single solvent never captures the whole plant',
                  'Warum ein einziges Lösungsmittel niemals die gesamte Pflanze erfasst'
                )}
              </h2>
              <p className="text-sm sm:text-base text-[#3E4A3D]/85 leading-relaxed">
                {tr(
                  "En phytochimie, « qui se ressemble s'assemble » : les molécules polaires migrent vers les solvants polaires, tandis que les composés lipophiles exigent des corps gras ou amphiphiles. Comprendre cette affinité évite de gaspiller jusqu'à la moitié des principes actifs d'une plante dans votre tasse.",
                  'In phytochemistry, "like dissolves like": polar molecules migrate into polar solvents, while lipophilic compounds require oils or amphiphilic media. Understanding this affinity prevents leaving up to half of a plant’s active compounds behind.',
                  'In der Phytochemie gilt „Ähnliches löst Ähnliches“: Polare Moleküle wandern in polare Lösungsmittel, während lipophile Verbindungen Fette oder amphiphile Medien erfordern. Wer diese Affinität versteht, nutzt das gesamte Spektrum der Pflanze.'
                )}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E7DFD3] shadow-sm overflow-hidden">
              <div className="w-full overflow-x-auto pb-4">
                <table className="w-full min-w-[900px] table-auto text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1E2E25] text-white uppercase tracking-wider text-[11px]">
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[130px]">{tr('Solvant', 'Solvent', 'Lösungsmittel')}</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[120px]">{tr('Affinité', 'Affinity', 'Affinität')}</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[25%] min-w-[200px]">{tr('Molécules Extraites', 'Extracted Molecules', 'Extrahierte Moleküle')}</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[150px]">{tr('Plage Thermique', 'Temperature Range', 'Temperaturbereich')}</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[120px]">{tr('Conservation', 'Shelf Life', 'Haltbarkeit')}</th>
                      <th className="p-4 font-bold whitespace-nowrap break-normal w-[15%] min-w-[150px]">{tr('Limite Principale', 'Main Limitation', 'Hauptgrenze')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFD3]">
                    {comparisonRows.map((row) => (
                      <tr key={row.name} className="hover:bg-[#FAF7F2]/70 transition-colors">
                        <td className="p-4 align-top break-normal font-black text-[#1E2E25]">
                          <div>{row.name}</div>
                          <div className="text-[11px] font-medium text-[#C8AB8A] mt-0.5">{row.polarity}</div>
                        </td>
                        <td className="p-4 align-top break-normal font-bold text-[#E8772E] whitespace-nowrap">{row.affinity}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/85 leading-relaxed">{row.targets}</td>
                        <td className="p-4 align-top break-normal font-mono tabular-nums text-[#1E2E25] whitespace-nowrap">{row.temperature}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{row.conservation}</td>
                        <td className="p-4 align-top break-normal text-[#3E4A3D]/75 leading-relaxed">{row.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* PARTIE GRATUITE (ÉDUCATION) : CAS TU YOUYOU & L'ARTÉMISININE      */}
          {/* ================================================================= */}
          <section id="tu-youyou-artemisinine" className="bg-white rounded-3xl border border-[#E7DFD3] shadow-sm p-6 sm:p-10 md:p-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7DFD3] pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                  <Microscope className="w-4 h-4" />
                  <span>{tr('Histoire Scientifique · Leçon de Polarité', 'Scientific History · A Lesson in Polarity', 'Wissenschaftsgeschichte · Lektion in Polarität')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                  {tr(
                    "Le cas Tu Youyou : comment le choix du solvant à 60 °C a préservé l'artémisinine",
                    'The Tu Youyou case: how choosing the right solvent at 60 °C preserved artemisinin',
                    'Der Fall Tu Youyou: Wie die Lösungsmittelwahl bei 60 °C das Artemisinin schützte'
                  )}
                </h2>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E7DFD3] text-[#1E2E25] font-bold">
                {tr('Prix Nobel 2015', 'Nobel Prize 2015', 'Nobelpreis 2015')}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                <p>
                  {tr(
                    "À la fin des années 1960, la chercheuse Tu Youyou et son équipe testent plus de 2 000 préparations issues de la pharmacopée traditionnelle chinoise. L'armoise annuelle (",
                    'In the late 1960s, researcher Tu Youyou and her team tested over 2,000 preparations from traditional Chinese pharmacopoeia. Sweet wormwood (',
                    'Ende der 1960er-Jahre testete die Forscherin Tu Youyou mit ihrem Team über 2.000 Zubereitungen der traditionellen chinesischen Pharmakopöe. Der Einjährige Beifuß ('
                  )}
                  <em>Artemisia annua</em>
                  {tr(
                    ") montre d'abord des résultats prometteurs, puis déçoit : les extraits obtenus par décoction classique dans l'eau bouillante s'avèrent irréguliers et presque inactifs.",
                    ') initially looked promising, then disappointed: extracts obtained through classic decoction in boiling water proved inconsistent and nearly inactive.',
                    ') zeigte zunächst vielversprechende Hinweise, enttäuschte jedoch bei der klassischen Abkochung in kochendem Wasser mit uneinheitlichen und kaum aktiven Ergebnissen.'
                  )}
                </p>
                <p>
                  {tr(
                    "En relisant attentivement le traité du IVᵉ siècle de Ge Hong (",
                    'Upon carefully re-reading Ge Hong’s 4th-century treatise (',
                    'Bei der erneuten Lektüre von Ge Hongs Abhandlung aus dem 4. Jahrhundert ('
                  )}
                  <em>Zhouhou Beiji Fang</em>
                  {tr(
                    "), Tu Youyou relève un détail décisif : l'auteur recommande de presser le suc frais à froid plutôt que de faire bouillir la plante. Elle comprend immédiatement que la chaleur excessive détruit la molécule fragile, tandis que l'eau seule ne l'entraîne qu'imparfaitement.",
                    '), Tu Youyou spotted a decisive clue: the author recommended pressing fresh cold juice rather than boiling the plant. She immediately realized excessive heat destroyed the fragile molecule while water alone barely carried it.',
                    ') entdeckte Tu Youyou ein entscheidendes Detail: Der Autor empfahl das kalte Auspressen statt des Kochens. Sie erkannte sofort, dass übermäßige Hitze das empfindliche Molekül zerstört und Wasser es kaum löst.'
                  )}
                </p>
                <p>
                  {tr("En remplaçant l'ébullition aqueuse par une ", 'By replacing aqueous boiling with ', 'Indem sie das Auskochen durch eine ')}
                  <strong>
                    {tr(
                      "extraction à l'éther diéthylique à basse température (autour de 60 °C maximum selon les cycles de séparation)",
                      'low-temperature diethyl ether extraction (around 60 °C maximum across separation cycles)',
                      'Niedrigtemperatur-Extraktion mit Diethylether (maximal rund 60 °C je nach Trennzyklus)'
                    )}
                  </strong>
                  {tr(
                    ", la structure moléculaire sensible de l'artémisinine — notamment son pont endoperoxyde — reste intacte. Le rendement bondit et révèle toute la puissance de la plante.",
                    ', artemisinin’s sensitive molecular structure — notably its endoperoxide bridge — remained intact. Yields surged and revealed the full potential of the plant.',
                    ' ersetzte, blieb die empfindliche Molekülstruktur des Artemisinins — insbesondere die Endoperoxidbrücke — unversehrt. Die Ausbeute stieg sprunghaft an.'
                  )}
                </p>
              </div>

              <div className="lg:col-span-4 bg-[#1E2E25] text-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-[#E8772E]">{tr('Ce que cela enseigne', 'What this teaches us', 'Was uns das lehrt')}</span>
                </div>
                <p className="text-sm text-white/90 !text-white leading-relaxed">
                  {tr(
                    "Une plante « inefficace » en tisane bouillante n'est souvent qu'une plante extraite avec le mauvais solvant ou à une température trop élevée.",
                    'A plant that seems "ineffective" in boiling tea is often simply extracted with the wrong solvent or at too high a temperature.',
                    'Eine Pflanze, die im kochenden Aufguss „schwach“ wirkt, wurde oft schlicht mit dem falschen Lösungsmittel oder bei zu hoher Temperatur extrahiert.'
                  )}
                </p>
                <div className="pt-3 border-t border-white/15 space-y-2 text-xs text-white/85">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#E8772E] shrink-0" />
                    <span>{tr('100 °C eau = rupture des ponts fragiles', '100 °C water = rupture of fragile bonds', '100 °C Wasser = Zerstörung empfindlicher Bindungen')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#C8AB8A] shrink-0" />
                    <span>{tr('Solvant adapté + 40–60 °C = intégrité du Totum', 'Matched solvent + 40–60 °C = Totum integrity', 'Passendes Lösungsmittel + 40–60 °C = intaktes Totum')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* PARTIE PAYANTE (FREEMIUM PAYWALL GATE)                            */}
          {/* ================================================================= */}
          <section id="protocoles-solvants" className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E8772E]">
                <BookOpen className="w-4 h-4" />
                <span>{tr('Laboratoire Pratique · Protocoles & Formulations', 'Practical Laboratory · Protocols & Formulations', 'Praxislabor · Protokolle & Formulierungen')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                {tr(
                  'Fiches Paramètres, Recettes Signatures & Matrice Plantes/Solvants',
                  'Parameter Sheets, Signature Recipes & Plant/Solvent Matrix',
                  'Parameterblätter, Signatur-Rezepte & Pflanzen/Lösungsmittel-Matrix'
                )}
              </h2>
            </div>

            <FreemiumPaywallGate
              onNavigate={onNavigate}
              lang={lang}
              title={tr('Débloquez les Protocoles & Formulations Solvants', 'Unlock Solvent Protocols & Formulations', 'Lösungsmittel-Protokolle & Formulierungen freischalten')}
              subtitle={tr(
                'Accédez aux paramètres exacts (températures au demi-degré, ratios, durées), aux recettes signatures commentées et au guide complet des associations plantes/solvants pour votre BloomLab®.',
                'Access exact parameters (half-degree temperatures, ratios, durations), annotated signature recipes and the complete plant/solvent pairing guide for your BloomLab®.',
                'Erhalten Sie exakte Parameter (halbe Gradzahlen, Verhältnisse, Zeiten), kommentierte Signatur-Rezepte und den vollständigen Pflanzen/Lösungsmittel-Leitfaden für Ihre BloomLab®.'
              )}
              bulletPoints={[
                tr('Fiches techniques des 4 solvants (Températures, Ratios, Durées, Conservation)', 'Technical sheets for all 4 solvents (Temperatures, Ratios, Durations, Shelf Life)', 'Datenblätter aller 4 Lösungsmittel (Temperaturen, Verhältnisse, Dauer, Haltbarkeit)'),
                tr('Recette Signature : Sérum Polyphénols à la Glycérine (sans alcool)', 'Signature Recipe: Alcohol-Free Glycerin Polyphenol Serum', 'Signatur-Rezept: Alkoholfreies Glyzerin-Polyphenol-Serum'),
                tr('Teinture Mère de Propolis (90–96°) & règles de sécurité alcool / glycérine sur BloomLab®', 'Propolis Mother Tincture (90–96% ABV) & alcohol / glycerin safety guidelines on BloomLab®', 'Propolis-Urtinktur (90–96 %) & Sicherheitsregeln für Alkohol / Glycerin in der BloomLab®'),
                tr('Matrice complète des associations organes végétaux / polarité / solvants', 'Complete plant organs / polarity / solvent pairing matrix', 'Vollständige Zuordnungsmatrix: Pflanzenorgane / Polarität / Lösungsmittel')
              ]}
              teaserContent={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-90">
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">{tr('Aperçu Fiches', 'Sheet Preview', 'Blatt-Vorschau')}</div>
                    <div className="font-bold text-[#1E2E25]">{tr('Paramètres Pédagogiques Régulés', 'Regulated Educational Parameters', 'Geregelte pädagogische Parameter')}</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      {tr(
                        'Ratios exacts plante sèche / solvant et paliers thermiques pour éviter la dénaturation.',
                        'Exact dry plant / solvent ratios and thermal ramps to prevent thermal degradation.',
                        'Exakte Trockenpflanzen/Lösungsmittel-Verhältnisse und Temperaturstufen gegen Denaturierung.'
                      )}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">{tr('Aperçu Recettes', 'Recipe Preview', 'Rezept-Vorschau')}</div>
                    <div className="font-bold text-[#1E2E25]">{tr('Sérum Polyphénols & Propolis', 'Polyphenol Serum & Propolis', 'Polyphenol-Serum & Propolis')}</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      {tr(
                        "Protocoles pas à pas avec dosages, précautions d'emploi et contre-indications claires.",
                        'Step-by-step protocols with clear dosages, usage precautions and contraindications.',
                        'Schritt-für-Schritt-Protokolle mit klaren Dosierungen, Vorsichtshinweisen und Gegenanzeigen.'
                      )}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD3] space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-[#E8772E]">{tr('Aperçu Associations', 'Pairing Preview', 'Matrix-Vorschau')}</div>
                    <div className="font-bold text-[#1E2E25]">{tr('Matrice Plantes & Polarités', 'Plants & Polarity Matrix', 'Pflanzen- & Polaritätsmatrix')}</div>
                    <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">
                      {tr(
                        'Associez instantanément fleurs, racines, résines et baies au solvant optimal.',
                        'Instantly match flowers, roots, resins and berries with the optimal solvent.',
                        'Ordnen Sie Blüten, Wurzeln, Harze und Beeren sofort dem optimalen Lösungsmittel zu.'
                      )}
                    </p>
                  </div>
                </div>
              }
            >
              <div className="space-y-14">
                {/* 0. INTRODUCTION DU COURS : POURQUOI LE SOLVANT EST LA CLÉ DE TOUT */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] space-y-5 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                      {tr('Introduction du Cours · Fondamentaux BloomLab®', 'Course Introduction · BloomLab® Fundamentals', 'Kurseinführung · BloomLab®-Grundlagen')}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      {tr('Pourquoi le Solvant est la Clé de Tout', 'Why the Solvent Is the Key to Everything', 'Warum das Lösungsmittel der Schlüssel zu allem ist')}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                    {tr(
                      "Le solvant est le véhicule qui permet d'extraire les principes actifs d'une plante. Chaque solvant possède une « polarité » différente :",
                      'The solvent is the carrier that extracts active compounds from a plant. Every solvent has a different "polarity":',
                      'Das Lösungsmittel ist das Trägermedium, mit dem pflanzliche Wirkstoffe gelöst werden. Jedes Lösungsmittel hat eine eigene „Polarität“:'
                    )}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">{tr("L'eau est polaire", 'Water is polar', 'Wasser ist polar')}</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        {tr(
                          'Elle attire les molécules polaires (sucres, tanins, mucilages).',
                          'It attracts polar molecules (sugars, tannins, mucilage).',
                          'Es zieht polare Moleküle an (Zucker, Gerbstoffe, Schleimstoffe).'
                        )}
                      </p>
                    </div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">{tr("L'huile est apolaire", 'Oil is non-polar', 'Öl ist unpolar')}</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        {tr(
                          'Elle attire les molécules grasses (terpènes, résines, vitamines liposolubles).',
                          'It draws fat-soluble molecules (terpenes, resins, fat-soluble vitamins).',
                          'Es löst fettliebende Stoffe (Terpene, Harze, fettlösliche Vitamine).'
                        )}
                      </p>
                    </div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7DFD3] space-y-1">
                      <div className="font-black text-sm text-[#1E2E25]">{tr("L'alcool est amphiphile", 'Alcohol is amphiphilic', 'Alkohol ist amphiphil')}</div>
                      <p className="text-xs sm:text-sm text-[#3E4A3D]/85 leading-relaxed">
                        {tr(
                          'Il peut attirer à la fois des fractions polaires et lipophiles.',
                          'It can bridge both polar and lipophilic fractions.',
                          'Er kann sowohl polare als auch lipophile Anteile binden.'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1E2E25] text-white text-xs sm:text-sm leading-relaxed">
                    <strong className="text-[#E8772E]">{tr('Le secret de la BloomLab® :', 'The BloomLab® secret:', 'Das BloomLab®-Prinzip:')}</strong>{' '}
                    {tr(
                      "Comprendre que forcer un solvant à extraire ce qu'il ne peut pas extraire détruit la plante. Le séquençage A/B consiste à utiliser le bon solvant pour la bonne molécule.",
                      'Forcing a solvent to extract what it cannot hold degrades the plant. A/B sequencing uses the right solvent for the right molecule.',
                      'Zu erzwingen, dass ein Lösungsmittel unpassende Stoffe löst, schadet der Pflanze. Die A/B-Sequenzierung nutzt gezielt das passende Lösungsmittel pro Molekül.'
                    )}
                  </div>
                </div>

                {/* 1. FICHES TECHNIQUES PAR SOLVANT (GRILLE 4 CARTES) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      {tr('Module 1 · Fiches Techniques', 'Module 1 · Technical Sheets', 'Modul 1 · Datenblätter')}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      {tr(
                        'Les 4 Solvants : Affinités, Molécules & Plages Thermiques BloomLab®',
                        'The 4 Solvents: Affinities, Molecules & BloomLab® Thermal Ranges',
                        'Die 4 Lösungsmittel: Affinitäten, Moleküle & BloomLab®-Temperaturfenster'
                      )}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {practicalSheets.map((sheet) => (
                      <article
                        key={sheet.id}
                        className="bg-white p-6 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] shadow-xs space-y-5"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-[#F3EEE6] pb-4">
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#E8772E]">
                              {sheet.polarityTag}
                            </span>
                            <h4 className="text-lg sm:text-xl font-black text-[#1E2E25] mt-1">
                              {sheet.name}
                            </h4>
                          </div>
                          <FlaskConical className="w-5 h-5 text-[#C8AB8A] shrink-0 mt-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <Thermometer className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>{tr('Température', 'Temperature', 'Temperatur')}</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.tempRange}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <Clock className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>{tr('Durée', 'Duration', 'Dauer')}</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.duration.split(' ').slice(0, 4).join(' ')}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3]">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-[#3E4A3D]/70 mb-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#E8772E]" />
                              <span>{tr('Conservation', 'Shelf Life', 'Haltbarkeit')}</span>
                            </div>
                            <div className="font-mono tabular-nums font-black text-xs sm:text-sm text-[#1E2E25]">
                              {sheet.shelfLife.split(' ').slice(0, 4).join(' ')}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-[#3E4A3D]/90">
                          <p>
                            <strong className="text-[#1E2E25]">{tr('Molécules extraites :', 'Extracted molecules:', 'Extrahierte Moleküle:')}</strong> {sheet.idealFor}
                          </p>
                          <p>
                            <strong className="text-[#1E2E25]">{tr('Ratio & Conservation :', 'Ratio & Shelf Life:', 'Verhältnis & Haltbarkeit:')}</strong> {sheet.ratio} · {sheet.shelfLife}
                          </p>
                          <p>
                            <strong className="text-[#1E2E25]">{tr('Agitation :', 'Stirring:', 'Rühren:')}</strong> {sheet.agitation}
                          </p>
                          <p className="text-xs text-[#3E4A3D]/80 bg-[#F9F6F0] p-3 rounded-xl border border-[#E7DFD3]">
                            <strong className="text-[#1E2E25]">{tr('Limite & Précaution :', 'Limits & Precautions:', 'Grenzen & Vorsicht:')}</strong> {sheet.notes}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 2. SECTION DÉTAILLÉE SUR LES HUILES DE SUPPORT (LE CŒUR DU COURS) */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7DFD3] text-[#1E2E25] space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E8772E]">
                      {tr('Module 2 · Le Rôle Crucial des Huiles Végétales', 'Module 2 · The Key Role of Carrier Oils', 'Modul 2 · Die Rolle von Trägerölen')}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      {tr('Les Huiles de Support et leurs Températures', 'Carrier Oils and Their Ideal Temperatures', 'Trägeröle und ihre optimalen Temperaturen')}
                    </h3>
                    <p className="text-sm sm:text-base text-[#3E4A3D]/90 leading-relaxed">
                      {tr(
                        "Les huiles végétales ne sont pas seulement des « vecteurs » : ce sont des actifs à part entière. Pour extraire les principes actifs des plantes (macération huileuse) sans détruire les précieux acides gras (Oméga 3, 6, 9) de l'huile de support, la température de la BloomLab® ne doit jamais dépasser ",
                        'Vegetable oils are not merely neutral carriers: they bring their own active compounds. To macerate botanicals in oil without degrading essential fatty acids (Omega 3, 6, 9), BloomLab® keeps oil maceration below ',
                        'Pflanzenöle sind weit mehr als bloße Träger: Sie liefern eigene Wirkstoffe. Um Pflanzenölauszüge herzustellen, ohne wertvolle Fettsäuren (Omega 3, 6, 9) zu schädigen, darf die Temperatur in der BloomLab® niemals über '
                      )}
                      <strong>{tr('45°C à 50°C', '45°C to 50°C', '45°C bis 50°C')}</strong>
                      {tr(". Au-delà, l'huile s'oxyde, rancit et perd ses propriétés.", '. Above that threshold, the oil oxidizes, turns rancid, and loses quality.', ' steigen. Darüber oxidiert das Öl und verliert seine Qualität.')}
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {carrierOils.map((oil) => (
                      <li
                        key={oil.name}
                        className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E7DFD3] flex items-start gap-3"
                      >
                        <Leaf className="w-4 h-4 text-[#E8772E] shrink-0 mt-1" />
                        <div className="space-y-1 text-xs sm:text-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong className="text-[#1E2E25] font-black">{oil.name}</strong>
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-white border border-[#E7DFD3] text-[#E8772E]">
                              {oil.temp}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-[#C8AB8A] uppercase tracking-wide">
                            {oil.profile}
                          </div>
                          <p className="text-[#3E4A3D]/85 leading-relaxed">{oil.usage}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. RECETTES SIGNATURES (ENCADRÉS BG-[#F9F6F0] CONFORMES AGENTS.MD) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      {tr('Module 3 · Fiches Recettes', 'Module 3 · Recipe Sheets', 'Modul 3 · Rezeptblätter')}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      {tr('Fiches Recettes Signatures', 'Signature Recipe Sheets', 'Signatur-Rezeptblätter')}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {signatureRecipes.map((recipe) => (
                      <article
                        key={recipe.id}
                        className="bg-[#F9F6F0] rounded-2xl border border-[#E7DFD3] p-6 sm:p-8 shadow-xs space-y-5 text-[#1E2E25]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DFD3] pb-4">
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-[#E8772E]">
                              {recipe.phaseLabel}
                            </span>
                            <h4 className="text-xl font-black text-[#1E2E25] mt-0.5">{recipe.name}</h4>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white border border-[#E7DFD3] text-[#1E2E25]">
                            {recipe.temperature} · {recipe.duration}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-[#3E4A3D]/90">
                          <p>
                            <strong className="text-[#1E2E25]">{tr('Objectif :', 'Objective:', 'Ziel:')}</strong> {recipe.objective}
                          </p>
                          <p>{recipe.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E7DFD3] text-xs sm:text-sm">
                          <div className="space-y-1.5">
                            <div>
                              <strong className="text-[#1E2E25]">{tr('Ingrédients / Plante :', 'Ingredients / Plant:', 'Zutaten / Pflanze:')}</strong> {recipe.composition}
                            </div>
                            <div>
                              <strong className="text-[#1E2E25]">{tr('Solvant :', 'Solvent:', 'Lösungsmittel:')}</strong> {recipe.solvent}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div>
                              <strong className="text-[#1E2E25]">{tr("Mode d'administration :", 'Use & Application:', 'Anwendung:')}</strong> {recipe.administration}
                            </div>
                            <div>
                              <strong className="text-[#1E2E25]">{tr('Dosage indicatif :', 'Indicative dosage:', 'Richtdosierung:')}</strong> {recipe.dosage}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>{tr('Précautions & Filtration :', 'Precautions & Filtration:', 'Vorsicht & Filtration:')}</strong> {recipe.precautions}
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <strong>{tr('Contre-indications :', 'Contraindications:', 'Gegenanzeigen:')}</strong> {recipe.contraindications}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 4. MATRICE D'ASSOCIATION (ORGANES / POLARITÉ / SOLVANTS / PLANTES) */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                      {tr("Module 4 · Matrice d'Association", 'Module 4 · Pairing Matrix', 'Modul 4 · Zuordnungsmatrix')}
                    </span>
                    <h3 className="text-2xl font-black text-[#1E2E25]">
                      {tr(
                        "Matrice d'Association : Organes, Polarité, Solvants & Plantes",
                        'Pairing Matrix: Organs, Polarity, Solvents & Plants',
                        'Zuordnungsmatrix: Organe, Polarität, Lösungsmittel & Pflanzen'
                      )}
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E7DFD3] shadow-xs overflow-hidden">
                    <div className="w-full overflow-x-auto pb-4">
                      <table className="w-full min-w-[720px] table-auto text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#1E2E25] text-white uppercase tracking-wider text-[11px]">
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[150px]">{tr('Organe Cible', 'Target Focus', 'Zielbereich')}</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[130px]">{tr('Polarité', 'Polarity', 'Polarität')}</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[180px]">{tr('Solvant Idéal', 'Ideal Solvent', 'Ideales Lösungsmittel')}</th>
                            <th className="p-4 font-bold whitespace-nowrap break-normal min-w-[200px]">{tr('Plantes Types', 'Key Plants', 'Typische Pflanzen')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3]">
                          {organSolventMatrix.map((row) => (
                            <tr key={row.organ} className="hover:bg-[#F9F6F0]/70 transition-colors">
                              <td className="p-4 align-top break-normal font-black text-[#1E2E25]">{row.organ}</td>
                              <td className="p-4 align-top break-normal font-semibold text-[#3E4A3D]">{row.polarity}</td>
                              <td className="p-4 align-top break-normal font-bold text-[#E8772E]">{row.idealSolvent}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/90">{row.plants}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Complément par familles botaniques */}
                  <div className="bg-white rounded-2xl border border-[#E7DFD3] shadow-xs overflow-hidden">
                    <div className="w-full overflow-x-auto pb-4">
                      <table className="w-full min-w-[900px] table-auto text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#F9F6F0] border-b border-[#E7DFD3] text-[#1E2E25] uppercase tracking-wider text-[11px]">
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[180px]">{tr('Famille / Organe Végétal', 'Plant Part / Family', 'Pflanzenteil / Familie')}</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[160px]">{tr('Exemples', 'Examples', 'Beispiele')}</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[160px]">{tr('Polarité Dominante', 'Dominant Polarity', 'Dominante Polarität')}</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[180px]">{tr('Solvant Recommandé', 'Recommended Solvent', 'Empfohlenes Lösungsmittel')}</th>
                            <th className="p-4 font-black whitespace-nowrap break-normal w-[20%] min-w-[200px]">{tr('Conseil Séquençage', 'Sequencing Tip', 'Sequenzierungs-Tipp')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7DFD3]">
                          {plantMappings.map((item) => (
                            <tr key={item.plantCategory} className="hover:bg-[#FAF7F2]/60 transition-colors">
                              <td className="p-4 align-top break-normal font-bold text-[#1E2E25]">{item.plantCategory}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{item.examples}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/85">{item.dominantPolarity}</td>
                              <td className="p-4 align-top break-normal font-semibold text-[#E8772E]">{item.recommendedSolvent}</td>
                              <td className="p-4 align-top break-normal text-[#3E4A3D]/80">{item.sequenceTip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </FreemiumPaywallGate>
          </section>

          {/* FAQ SOLVANTS */}
          <section id="faq-solvants" className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                {tr('Questions Fréquentes · Polarité & Solvants', 'FAQ · Polarity & Solvents', 'Häufige Fragen · Polarität & Lösungsmittel')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E2E25] tracking-tight">
                {tr("Questions fréquentes sur les solvants d'extraction", 'Frequently asked questions about extraction solvents', 'Häufige Fragen zu Extraktionslösungsmitteln')}
              </h2>
            </div>

            <div className="space-y-3">
              {solventFaqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E7DFD3] overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#1E2E25] hover:text-[#E8772E] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="text-xs font-mono text-[#E8772E] shrink-0">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#3E4A3D] leading-relaxed border-t border-[#E7DFD3]/60 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA DE NAVIGATION COMPLÉMENTAIRE */}
          <section className="bg-[#1E2E25] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8AB8A]">
                <Leaf className="w-4 h-4 text-[#E8772E]" />
                <span>{tr('Poursuivre votre pratique', 'Continue your practice', 'Praxis vertiefen')}</span>
              </div>
              <h3 className="text-2xl font-black text-white !text-white">
                {tr('Passez de la théorie des solvants au Séquençage Actif A/B', 'Move from solvent theory to Active A/B Sequencing', 'Von der Lösungsmitteltheorie zur aktiven A/B-Sequenzierung')}
              </h3>
              <p className="text-sm text-white/85 !text-white leading-relaxed">
                {tr(
                  "Explorez notre guide complet d'extraction, découvrez l'extracteur BloomLab® ou parcourez nos kits sur la Boutique Bloom by BotaniK.",
                  'Explore our complete extraction guide, discover the BloomLab® extractor or browse our kits in the Bloom by BotaniK Store.',
                  'Entdecken Sie unseren vollständigen Extraktions-Leitfaden, den BloomLab®-Extraktor oder unsere Kits im Bloom by BotaniK Shop.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/extraction-botanique/"
                onClick={(e) => handleNavClick(e, 'guide-complet')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <span>{tr("Guide de l'extraction", 'Extraction guide', 'Extraktions-Leitfaden')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/bloomlab/"
                onClick={(e) => handleNavClick(e, 'machine')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8772E] hover:bg-[#D4651F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>{tr('Découvrir BloomLab®', 'Discover BloomLab®', 'BloomLab® entdecken')}</span>
                <Sparkles className="w-4 h-4" />
              </a>
              <a
                href="/boutique/"
                onClick={(e) => handleNavClick(e, 'boutique')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <span>{tr('Soins Botaniques', 'Botanical Care', 'Botanische Pflege')}</span>
                <CheckCircle2 className="w-4 h-4" />
              </a>
            </div>
          </section>
        </main>
      </div>
    </GlossaryProvider>
  );
}
