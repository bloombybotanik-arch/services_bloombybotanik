import React from 'react';
import {
  Sparkles,
  FlaskConical,
  ArrowRight,
  Layers,
  CheckCircle2,
  Network,
  Activity,
  Compass,
} from 'lucide-react';
import { Language } from '../translations';

interface StoreSequencingSectionProps {
  onNavigate?: (view: any, param?: string) => void;
  lang: Language;
}

export const StoreSequencingSection: React.FC<StoreSequencingSectionProps> = ({ onNavigate, lang }) => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const t = {
    badge: isFR
      ? 'Séquençage Botanique Actif A/B & Synergies Végétales'
      : isDE
      ? 'Aktive A/B-Botanik-Sequenzierung & Pflanzliche Synergien'
      : 'Active A/B Botanical Sequencing & Plant Synergies',
    title: isFR
      ? 'Pourquoi nos Synergies sont-elles Séquencées ?'
      : isDE
      ? 'Warum sind unsere Pflanzen-Sets sequenziert?'
      : 'Why are our Botanical Sets Sequenced?',
    intro: isFR
      ? 'La phytothérapie moderne ne consiste pas à infuser une feuille au hasard. Elle répond à une architecture biologique précise, éclairée par la pharmacologie en réseau et les traditions herboristes séculaires.'
      : isDE
      ? 'Moderne Pflanzenkunde bedeutet nicht, zufällig ein Blatt aufzubrühen. Sie folgt einer präzisen biologischen Architektur, gestützt durch Netzwerk-Pharmakologie und jahrhundertealte Kräutertraditionen.'
      : 'Modern herbalism is not about steeping a random leaf. It follows a precise biological architecture informed by network pharmacology and centuries-old botanical traditions.',
    networkTitle: isFR
      ? 'Le terrain est un réseau vivant, pas une cible isolée'
      : isDE
      ? 'Ihr Organismus ist ein lebendiges Netzwerk, kein isoliertes Ziel'
      : 'Your terrain is a living network, not an isolated target',
    networkQuote: isFR
      ? "« Votre corps n'est pas une machine composée de pièces isolées. C'est un réseau vivant où chaque dimension communique avec les autres. Une raideur articulaire peut refléter un terrain hépatique surchargé. Un inconfort cutané peut accompagner une muqueuse intestinale fragilisée. Une fatigue durable peut être liée à un axe de réponse au stress sollicité. »"
      : isDE
      ? '„Ihr Körper ist keine Maschine aus isolierten Einzelteilen. Er ist ein lebendiges Netzwerk, in dem alle Systeme miteinander kommunizieren. Gelenksteifigkeit kann mit einer überlasteten Leberfunktion zusammenhängen, Hautunreinheiten mit der Darmbarriere und anhaltende Müdigkeit mit einer beanspruchten Stressachse.“'
      : '“Your body is not a machine made of isolated parts. It is a living network where every system communicates with the others. Joint stiffness can mirror hepatic overload, skin sensitivity can reflect gut barrier strain, and lasting fatigue can connect to stress-axis imbalance.”',
    ancientTitle: isFR
      ? 'Sagesses Anciennes : 君臣佐使 & Samyoga'
      : isDE
      ? 'Alte Weisheiten: 君臣佐使 & Samyoga'
      : 'Ancient Wisdom: 君臣佐使 & Samyoga',
    ancientBody: isFR
      ? "La tradition chinoise compose ses formules selon le principe du 君臣佐使 (Monarque, Ministres, Assistants, Messagers) : une plante majeure cible le déséquilibre central, d'autres la soutiennent, la modulent ou guident son action. L'Ayurveda parle de Samyoga : la combinaison crée une action supérieure à la somme des parties."
      : isDE
      ? 'Die traditionelle chinesische Kräuterlehre komponiert Rezepturen nach dem Prinzip 君臣佐使 (Monarch, Minister, Assistent, Bote): Eine Hauptpflanze adressiert das zentrale Ungleichgewicht, weitere unterstützen, modulieren oder lenken ihre Wirkung. Ayurveda nennt dies Samyoga: Die Synergie übertrifft die Summe der Einzelteile.'
      : 'Traditional Chinese herbalism composes formulas via 君臣佐使 (Monarch, Minister, Assistant, Envoy): a lead botanical addresses the core terrain pattern while companion herbs support, modulate, or guide absorption. Ayurveda calls this Samyoga: purposeful combination creates an effect greater than the sum of its parts.',
    ancientFooter: isFR
      ? 'Formulations holistiques éprouvées depuis des millénaires'
      : isDE
      ? 'Seit Jahrtausenden bewährte ganzheitliche Rezepturen'
      : 'Holistic formulations refined over millennia',
    scienceTitle: isFR
      ? 'Science Moderne : Pharmacologie en Réseau'
      : isDE
      ? 'Moderne Wissenschaft: Netzwerk-Pharmakologie'
      : 'Modern Science: Network Pharmacology',
    scienceBody: isFR
      ? "La recherche contemporaine explore cette approche sous le nom de pharmacologie en réseau (network pharmacology) : les composés d'une formule multi-plantes interagissent avec des cibles biologiques multiples et interconnectées, créant des synergies impossibles à reproduire avec une molécule isolée."
      : isDE
      ? 'Die moderne Forschung bestätigt diesen Ansatz als Netzwerk-Pharmakologie: Die Wirkstoffe einer Mehrpflanzen-Rezeptur wirken auf miteinander verknüpfte biologische Pfade und erzeugen schützende Synergien, die ein einzelnes isoliertes Molekül nicht erreicht.'
      : 'Contemporary research examines this under network pharmacology: multi-botanical compounds interact across interconnected biological pathways, generating balanced feedback synergies impossible to reproduce with a single isolated molecule.',
    scienceFooter: isFR
      ? 'Cibles biologiques multiples & équilibre du totum'
      : isDE
      ? 'Multiple biologische Pfade & Ausgewogenheit des Totums'
      : 'Multi-pathway synergy & full-spectrum balance',
    abBadge: isFR
      ? 'Séparation des Polarités'
      : isDE
      ? 'Trennung der Polaritäten'
      : 'Polarity Separation',
    abTitle: isFR
      ? "Le Séquençage A/B : Pourquoi séparer l'eau et l'alcool ?"
      : isDE
      ? 'A/B-Sequenzierung: Warum Wasser und Alkohol trennen?'
      : 'A/B Sequencing: Why separate water and alcohol?',
    abIntro: isFR
      ? "Toutes les plantes ne se comportent pas de la même façon face à la chaleur et aux solvants. Une racine dense (gentiane, bardane) nécessite une décoction chaude maîtrisée pour libérer ses composés amers hydrosolubles. Une résine ou une feuille riche en huiles essentielles (origan, romarin) se dégrade à haute température et requiert une extraction alcoolique ou glycérinée douce."
      : isDE
      ? 'Nicht jede Pflanze reagiert gleich auf Wärme und Lösungsmittel. Harte Wurzeln (Enzian, Klette) benötigen einen kontrollierten warmen Auszug, um wasserlösliche Bitterstoffe freizusetzen. Harze oder ätherisch-ölreiche Blätter (Oregano, Rosmarin) verlieren bei starker Hitze ihre flüchtigen Terpene und profitieren von einer schonenden alkoholischen Extraktion.'
      : 'Not every botanical responds the same way to heat and solvents. Dense roots (gentian, burdock) require controlled warm aqueous extraction to release water-soluble bitters. Resins or delicate aromatic leaves (oregano, rosemary) lose volatile terpenes at high heat and require gentle ethanolic extraction.',
    abSub: isFR
      ? 'C’est pourquoi nos kits séquencés sont organisés en deux sachets complémentaires :'
      : isDE
      ? 'Deshalb sind unsere sequenzierten Sets in zwei präzise abgestimmte Beutel unterteilt:'
      : 'That is why our sequenced kits are divided into two dedicated pouches:',
    pouchATitle: isFR
      ? 'Sachet A (Extraction Aqueuse Maîtrisée)'
      : isDE
      ? 'Beutel A (Kontrollierter wässriger Auszug)'
      : 'Pouch A (Controlled Aqueous Extraction)',
    pouchABody: isFR
      ? 'Pour racines, écorces et fibres denses. Température régulée pour solubiliser tanins, mucilages et principes hydrosolubles sans ébullition destructrice.'
      : isDE
      ? 'Für Wurzeln, Rinden und feste Fasern. Geregelte Temperatur löst Tannine, Schleimstoffe und wasserlösliche Pflanzenstoffe ohne Zerstörung durch Kochen.'
      : 'For roots, barks, and dense fibers. Regulated temperature solubilizes tannins, mucilages, and water-soluble compounds without destructive boiling.',
    pouchBTitle: isFR
      ? 'Sachet B (Extraction Alcoolique Douce)'
      : isDE
      ? 'Beutel B (Schonender alkoholischer Auszug)'
      : 'Pouch B (Gentle Ethanolic Extraction)',
    pouchBBody: isFR
      ? "Pour feuilles délicates, résines et fleurs. Solvant éthanolique à température modérée préservant l'intégralité des terpènes volatils et composés aromatiques."
      : isDE
      ? 'Für zarte Blätter, Harze und Blüten. Ethanolischer Auszug bei moderater Temperatur bewahrt flüchtige Terpene und empfindliche Aromastoffe.'
      : 'For delicate leaves, resins, and blossoms. Moderate-temperature ethanol extraction preserves volatile terpenes and lipophilic botanical fractions.',
    evidenceTitle: isFR
      ? 'Ce qu’explore la littérature scientifique moderne'
      : isDE
      ? 'Was die moderne Forschungsliteratur untersucht'
      : 'What modern scientific literature highlights',
    ev1Tag: isFR ? 'Méta-analyse Publiée' : isDE ? 'Veröffentlichte Metaanalyse' : 'Published Meta-Analysis',
    ev1Title: isFR ? 'Formule Gegen Qin Lian' : isDE ? 'Gegen-Qin-Lian-Formel' : 'Gegen Qin Lian Formula',
    ev1Body: isFR
      ? '42 essais documentés dans la littérature scientifique analysent la synergie multi-cibles de cette association végétale historique sur les voies métaboliques SIRT1/AMPK.'
      : isDE
      ? '42 dokumentierte Studien analysieren die Multi-Target-Synergie dieser historischen Pflanzenkombination über die Stoffwechselwege SIRT1/AMPK.'
      : '42 documented studies examine the multi-pathway synergy of this classical multi-herb combination along SIRT1/AMPK metabolic pathways.',
    ev2Tag: isFR ? 'Pharmacologie en Réseau' : isDE ? 'Netzwerk-Pharmakologie' : 'Network Pharmacology',
    ev2Title: isFR ? 'Cibles Interconnectées' : isDE ? 'Vernetzte Zielstrukturen' : 'Interconnected Targets',
    ev2Body: isFR
      ? 'Les formulations poly-herbales agissent en grappes synergiques : soutien simultané de la sphère digestive, de la microcirculation et de l’équilibre oxydatif.'
      : isDE
      ? 'Poly-pflanzliche Formeln wirken in synergistischen Clustern: gleichzeitige Unterstützung von Verdauungsmilieu, Mikrozirkulation und oxidativem Gleichgewicht.'
      : 'Poly-herbal formulations act in synergistic clusters: supporting digestive balance, microcirculation, and oxidative equilibrium together.',
    ev3Tag: isFR ? 'Synergie Pharmacocinétique' : isDE ? 'Pharmakokinetische Synergie' : 'Pharmacokinetic Synergy',
    ev3Title: isFR ? 'Biodisponibilité Amplifiée' : isDE ? 'Erhöhte Bioverfügbarkeit' : 'Amplified Bioavailability',
    ev3Body: isFR
      ? 'Exemple classique documenté : la pipérine issue du poivre noir multiplie l’assimilation de la curcumine, illustrant l’importance des plantes dites messagères.'
      : isDE
      ? 'Bekanntes Beispiel: Piperin aus schwarzem Pfeffer erhöht die Aufnahme von Curcumin erheblich und zeigt die Bedeutung klassischer Begleitpflanzen.'
      : 'Canonical documented example: piperine from black pepper multiplies curcumin uptake, demonstrating why traditional "envoy" botanicals matter.',
    matrixTag: isFR ? 'Matrice Fonctionnelle' : isDE ? 'Funktionsmatrix' : 'Functional Matrix',
    matrixTitle: isFR ? 'La Règle des 4 Fonctions Systémiques' : isDE ? 'Die Regel der 4 Systemfunktionen' : 'The 4 Systemic Functions Rule',
    matrixSub: isFR
      ? 'Chaque synergie séquencée équilibre ces 4 polarités pour un accompagnement global du terrain.'
      : isDE
      ? 'Jede sequenzierte Synergie balanciert diese 4 Polaritäten für eine ganzheitliche Terrain-Begleitung.'
      : 'Each sequenced blend balances these 4 polarities for comprehensive botanical terrain support.',
    th1: isFR ? 'Fonction' : isDE ? 'Funktion' : 'Function',
    th2: isFR ? 'Rôle dans le Système' : isDE ? 'Rolle im System' : 'Role in the System',
    th3: isFR ? 'Exemples de Plantes' : isDE ? 'Pflanzenbeispiele' : 'Botanical Examples',
    th4: isFR ? 'Apport Documenté' : isDE ? 'Dokumentierter Beitrag' : 'Documented Focus',
    rows: [
      {
        fn: isFR ? '1. RÉGULER' : isDE ? '1. REGULIEREN' : '1. REGULATE',
        role: isFR ? 'Soutenir l’axe central du terrain' : isDE ? 'Das zentrale Gleichgewicht unterstützen' : 'Support the central terrain axis',
        plants: isFR ? 'Berbérine (Coptis), Cannelle' : isDE ? 'Berberin (Coptis), Zimt' : 'Berberine (Coptis), Cinnamon',
        benefit: isFR ? 'Équilibre métabolique et glycémique physiologique' : isDE ? 'Physiologische Stoffwechsel- und Blutzuckerbalance' : 'Physiological metabolic & glycemic balance',
      },
      {
        fn: isFR ? '2. DRAINER' : isDE ? '2. AUSLEITEN' : '2. DRAIN',
        role: isFR ? 'Accompagner les émonctoires (foie, reins, peau)' : isDE ? 'Ausleitungsorgane (Leber, Nieren, Haut) begleiten' : 'Support emunctory pathways (liver, kidneys, skin)',
        plants: isFR ? 'Bardane, Radis Noir, Romarin' : isDE ? 'Klette, Schwarzer Rettich, Rosmarin' : 'Burdock, Black Radish, Rosemary',
        benefit: isFR ? 'Drainage hépatobiliaire & clarté du teint' : isDE ? 'Leber-Galle-Unterstützung & klares Hautbild' : 'Hepatobiliary drainage & skin clarity',
      },
      {
        fn: isFR ? '3. NOURRIR' : isDE ? '3. NÄHREN' : '3. NOURISH',
        role: isFR ? 'Apporter cofacteurs & apaiser les muqueuses' : isDE ? 'Cofaktoren liefern & Schleimhäute beruhigen' : 'Supply cofactors & soothe mucosal barriers',
        plants: isFR ? 'Fenugrec, Lin, Chia, Mucilages' : isDE ? 'Bockshornklee, Leinsamen, Chia, Schleimstoffe' : 'Fenugreek, Flax, Chia, Mucilages',
        benefit: isFR ? 'Confort digestif, minéraux & fibres douces' : isDE ? 'Verdauungskomfort, Mineralien & sanfte Ballaststoffe' : 'Digestive comfort, minerals & gentle fibers',
      },
      {
        fn: isFR ? '4. HARMONISER' : isDE ? '4. HARMONISIEREN' : '4. HARMONIZE',
        role: isFR ? 'Moduler la réponse au stress & l’assimilation' : isDE ? 'Stressantwort & Bioverfügbarkeit modulieren' : 'Modulate stress response & assimilation',
        plants: isFR ? 'Gingembre, Ashwagandha, Tulsi' : isDE ? 'Ingwer, Ashwagandha, Tulsi' : 'Ginger, Ashwagandha, Tulsi',
        benefit: isFR ? 'Résilience adaptogène & synergie d’absorption' : isDE ? 'Adaptogene Resilienz & optimale Aufnahme' : 'Adaptogenic resilience & absorption synergy',
      },
    ],
    closingQuote: isFR
      ? "« Ne vous contentez plus d'infusions approximatives ou de molécules isolées. Découvrez nos kits séquencés A/B et préparez des synergies végétales complètes à la maison, guidées par la tradition botanique et la précision technique. »"
      : isDE
      ? '„Geben Sie sich nicht länger mit ungenauen Aufgüssen oder isolierten Einzelextrakten zufrieden. Entdecken Sie unsere A/B-sequenzierten Sets und stellen Sie zu Hause vollständige Pflanzensynergien her – präzise, sauber und nachvollziehbar.“'
      : '“Move beyond imprecise infusions or isolated extracts. Explore our A/B sequenced botanical kits and craft full-spectrum plant synergies at home with laboratory-grade temperature precision.”',
    ctaKits: isFR
      ? 'Découvrir nos Kits Séquencés'
      : isDE
      ? 'Sequenzierte Sets entdecken'
      : 'Explore Sequenced Kits',
    ctaMachine: isFR
      ? "L'Extracteur BloomLab®"
      : isDE
      ? 'Der BloomLab® Extraktor'
      : 'The BloomLab® Extractor',
  };

  return (
    <section
      id="pourquoi-remedes-sequences"
      className="my-16 md:my-24 rounded-3xl md:rounded-[44px] bg-[#FAF7F2] border border-[#E8DFD1] p-6 sm:p-10 md:p-14 text-[#3E4A3D] relative overflow-hidden shadow-xl"
    >
      {/* Subtle decorative background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header & Title */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 md:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-[11px] font-black uppercase tracking-widest border border-[#2D5A27]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
          <span>{t.badge}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-[#3E4A3D] leading-[1.15]">
          {t.title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#3E4A3D]/80 leading-relaxed font-light max-w-3xl mx-auto">
          {t.intro}
        </p>
      </div>

      {/* 2. Introduction */}
      <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center shrink-0 mt-1">
            <Network className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D]">{t.networkTitle}</h3>
            <p className="text-sm sm:text-base text-[#3E4A3D]/80 leading-relaxed italic">
              {t.networkQuote}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Ancient Wisdom & Modern Science */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12 relative z-10">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#C49A6C]/20 text-[#3E4A3D] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#C49A6C]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D]">{t.ancientTitle}</h3>
            <p className="text-sm text-[#3E4A3D]/75 leading-relaxed">{t.ancientBody}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#2D5A27] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C49A6C]" /> {t.ancientFooter}
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#3E4A3D]">{t.scienceTitle}</h3>
            <p className="text-sm text-[#3E4A3D]/75 leading-relaxed">{t.scienceBody}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#2D5A27] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C49A6C]" /> {t.scienceFooter}
          </div>
        </div>
      </div>

      {/* 4. A/B Sequencing */}
      <div className="max-w-5xl mx-auto mb-12 bg-gradient-to-br from-[#3E4A3D] to-[#A8B8A0] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative z-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C49A6C] text-[10px] font-bold uppercase tracking-widest border border-white/15">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.abBadge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{t.abTitle}</h3>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">{t.abIntro}</p>

          <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed font-medium">{t.abSub}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>{t.pouchATitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{t.pouchABody}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#C49A6C] font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C49A6C]" />
              <span>{t.pouchBTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{t.pouchBBody}</p>
          </div>
        </div>
      </div>

      {/* 5. Scientific Evidence */}
      <div className="max-w-5xl mx-auto mb-12 space-y-4 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-[#3E4A3D] text-center mb-6">{t.evidenceTitle}</h3>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">{t.ev1Tag}</div>
            <div className="font-bold text-sm text-[#3E4A3D]">{t.ev1Title}</div>
            <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">{t.ev1Body}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">{t.ev2Tag}</div>
            <div className="font-bold text-sm text-[#3E4A3D]">{t.ev2Title}</div>
            <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">{t.ev2Body}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">{t.ev3Tag}</div>
            <div className="font-bold text-sm text-[#3E4A3D]">{t.ev3Title}</div>
            <p className="text-xs text-[#3E4A3D]/75 leading-relaxed">{t.ev3Body}</p>
          </div>
        </div>
      </div>

      {/* 6. 4 Systemic Functions Table */}
      <div className="max-w-5xl mx-auto mb-12 relative z-10">
        <div className="text-center mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C49A6C] mb-1">{t.matrixTag}</div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3E4A3D]">{t.matrixTitle}</h3>
          <p className="text-xs sm:text-sm text-[#3E4A3D]/70">{t.matrixSub}</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#2D5A27]/15 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#2D5A27] text-white uppercase text-[10px] sm:text-xs tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">{t.th1}</th>
                <th className="py-3.5 px-4 font-bold">{t.th2}</th>
                <th className="py-3.5 px-4 font-bold">{t.th3}</th>
                <th className="py-3.5 px-4 font-bold">{t.th4}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1]/60">
              {t.rows.map((row) => (
                <tr key={row.fn} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3.5 px-4 font-black text-[#2D5A27] whitespace-nowrap">{row.fn}</td>
                  <td className="py-3.5 px-4 text-[#3E4A3D]/80">{row.role}</td>
                  <td className="py-3.5 px-4 font-medium text-[#3E4A3D]">{row.plants}</td>
                  <td className="py-3.5 px-4 text-[#3E4A3D]/80 font-medium">{row.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Final Call to Action */}
      <div className="max-w-3xl mx-auto text-center space-y-6 pt-4 relative z-10">
        <p className="text-base sm:text-lg text-[#3E4A3D] font-medium leading-relaxed">{t.closingQuote}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#nos-kits"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('nos-kits');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl bg-[#3E4A3D] hover:bg-[#2D5A27] text-white font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-lg shadow-black/10 cursor-pointer"
          >
            <span>{t.ctaKits}</span>
            <ArrowRight className="w-4 h-4 text-[#C49A6C]" />
          </a>

          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('machine');
            }}
            className="px-6 py-4 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#3E4A3D] font-bold text-sm sm:text-base border border-[#2D5A27]/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.ctaMachine}</span>
            <FlaskConical className="w-4 h-4 text-[#2D5A27]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreSequencingSection;