import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsletterSection } from './components/NewsletterSection';
import { PaymentBadges } from './components/PaymentBadges';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Check, 
  Plus,
  FlaskConical, 
  Activity, 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  ChefHat,
  Clock,
  Thermometer,
  Zap,
  Droplets,
  Microscope,
  Sparkles,
  AlertTriangle,
  Utensils,
  Truck,
  CreditCard,
  X,
  ShoppingCart,
  BookOpen,
  Wind,
  Compass
} from 'lucide-react';
import { translations as globalTranslations } from './translations';

// import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
// import labImg from './assets/images/BloomLab_rosemary_infusion.png';
// import herbsImg from './assets/images/herbs_close_up_cleaned_1786616800877.jpg';
// import lifestyleImg from './assets/images/home_lab_vibe_cleaned_1786616854146.jpg';
// import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
// import bloomSoinsImg from './assets/images/Bloom_Soins.jpg';
// import cosmetiqueImg from './assets/images/bloom_logo_final_1784886077159.png';

const heroImg1 = "/images/bloomlab_main_1784887530345.png";
const heroImg2 = "/images/2.png";
const heroImg3 = "/images/9.png";
const bloomImg = heroImg1;
const labImg = "/assets/images/BloomLab_rosemary_infusion.png";
const shelvesImg = "/images/modern_herbalist_shelves_1786699793560.jpg";
const herbsImg = "/assets/images/herbs_close_up_cleaned_1786616800877.jpg";
const lifestyleImg = "/assets/images/BloomLab_rosemary_infusion.png";
const duoArgilesImg = "/assets/images/product_duo_argiles.jpg";
const bloomSoinsImg = "/assets/images/Bloom_Soins.jpg";
const cosmetiqueImg = "/assets/images/bloom_logo_final_1784886077159.png";

interface IndexBisContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
  scrollToId?: string;
}

type HeroType = 'culinaire' | 'cosmetique' | 'sante';
type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

const translationsIndexBis = {
  fr: {
    marquee: ["🇫🇷 Marque Française Botanique", "🚚 Expédition Prioritaire sous 24/48h", "🛡️ Satisfait ou Remboursé 30 Jours", "⚡ Garantie Constructeur 1 An"],
    hero: {
      badge: "EXTRACTION SÉQUENTIELLE A/B · ÉDITION 2026",
      overline: "CULINAIRE · COSMÉTIQUE · SYSTÉMIQUE",
      h1: "BloomLab : l'extracteur botanique de précision pour maîtriser vos préparations maison",
      h2_pre: "Le naturel ne doit plus être approximatif.",
      h2_title: "Reprenez le contrôle de votre extraction botanique.",
      h2: "Le naturel ne doit plus être approximatif. Reprenez le contrôle de votre extraction botanique.",
      subtitle: "Pendant des décennies, la préparation des plantes a été simplifiée à l'excès, appauvrissant leur potentiel. BloomLab restaure la rigueur d'un protocole de laboratoire à votre domicile : contrôle précis du temps, de la température et de l'agitation pour révéler le Totum végétal de vos huiles infusées, macérats et extraits botaniques.",
      rating: "Une conception dédiée à l’extraction botanique de précision.",
      primaryCta: "Je commence",
      secondaryCta: "Découvrir la méthode A/B",
      secondaryCtaProduct: "Découvrir la BloomLab®",
      footerLine: "CULINAIRE · COSMÉTIQUE · SYSTÉMIQUE",
      buyBtn: "Découvrir la BloomLab®",
      installment: "Paiement en 3x sans frais par Klarna",
      installmentSub: "Soit 79,66€ / mois",
      guarantee: "Garantie 1 an constructeur",
      shipping: "Expédié sous 24/48h",
      benefits: [
        { title: "Contre le gaspillage", text: "Les méthodes traditionnelles détruisent les composés thermolabiles. BloomLab préserve l'intégrité de chaque molécule." },
        { title: "Pour la souveraineté", text: "Finis les produits opaques et les dosages inconnus. Vous choisissez la plante, le solvant et la concentration." },
        { title: "Par la précision", text: "Chaque extraction est documentée, reproductible et maîtrisée. Vous ne laissez plus rien au hasard." }
      ],
      usageTags: [
        { label: "🍳 Culinaire", mode: "culinaire", desc: "Huiles infusées & beurres aromatiques" },
        { label: "🌿 Systémique", mode: "sante", desc: "Extraits concentrés & Totum végétal" },
        { label: "🧴 Cosmétique", mode: "cosmetique", desc: "Sérums & macérats botaniques purs" }
      ],
      reassuranceBadges: [
        "Paiement en 3x sans frais",
        "Garantie 1 an",
        "Expédié sous 24/48h"
      ],
      features: [
        { title: "Acier Inoxydable", sub: "Qualité alimentaire", icon: Microscope },
        { title: "Température contrôlée", sub: "Zéro Surchauffe", icon: Thermometer },
        { title: "Multi-Solvants", sub: "Eau, Huile, Alcool", icon: Droplets }
      ]
    },
    heritageTeaser: {
      badge: "Aux origines de la BloomLab®",
      text: "La BloomLab® n'est pas une simple machine. Elle est née d'une quête millénaire : celle d'extraire l'essence parfaite des plantes sans la brûler ni la gaspiller. Une technologie de précision qui réconcilie la sagesse botanique asiatique avec la science moderne.",
      cta: "Découvrir la BloomLab"
    },
    selector: {
      label: "Mode d'extraction rapide :",
      modes: {
        culinaire: { label: "Culinaire", desc: "🌿 <strong>Mode Culinaire :</strong> Extraction douce d'huiles aromatiques & beurres botaniques sans amertume à 38°C." },
        cosmetique: { label: "Cosmétique", desc: "🌸 <strong>Mode Cosmétique :</strong> Formulation de sérums visage purs et baumes régénérants à 42°C." },
        sante: { label: "Protocoles Systémiques", desc: "🧪 <strong>Mode Protocoles Systémiques :</strong> Teintures-mères et extraits concentrés de résines/racines à 45°C." }
      }
    },
    whyBloomLab: {
      title: "Pourquoi la BloomLab change votre quotidien",
      without: {
        title: "Sans la BloomLab",
        items: [
          "Vous dépendez de l'industrie pour vos soins.",
          "Les méthodes approximatives altèrent les molécules sensibles.",
          "Vous accumulez des produits opaques et coûteux."
        ]
      },
      with: {
        title: "Avec la BloomLab",
        items: [
          "Vous créez vos propres préparations, 100% transparentes.",
          "Vous révélez l'intégrité du Totum végétal sans dégradation thermique.",
          "Une seule machine pour trois univers d'usage souverain."
        ]
      }
    },
    universes: {
      title: "Une Seule Machine. Trois Univers de soin Souverain au Quotidien.",
      subtitle_part1: "La BloomLab est l'alternative concrète que vous attendiez : une machine qui transforme vos plantes en extraits actifs, sans chimie, sans déchets, sans dépendance. Reprenez le contrôle de vos préparations botaniques avec la précision du laboratoire.",
      subtitle_part2: "🔬 L'Extraction Précise, Clé de la Rigueur\nAvec les méthodes traditionnelles approximatives, les composés thermolabiles sont dégradés par les à-coups de température.",
      subtitle_part3: "La BloomLab change la donne. Grâce au contrôle millimétrique de la température, du temps et de l'agitation, elle libère le Totum végétal – l'intégralité des fractions actives hydrosolubles et liposolubles de la plante.",
      tabs: { culinaire: "Culinaire", cosmetique: "Cosmétique", phytotherapie: "Protocoles Systémiques" },
      descriptions: {
        culinaire: "1. La Gastronomie Botanique : Les plantes aromatiques et amères révèlent toute leur intensité aromatique sans surchauffe ni amertume excessive.",
        cosmetique: "2. La Beauté Naturelle : Les huiles de soin infusées à basse température préservent l'intégrité de leurs acides gras et antioxydants. Sans conservateurs.",
        phytotherapie: "3. Le Soutien Systémique : Les racines et résines extraites selon des protocoles maîtrisés soutiennent durablement votre terrain biologique."
      },
      data: {
        culinaire: {
          title: "Atelier Culinaire & Gastronomie Botanique",
          badge: "Savoir-Faire Gourmand & Précision",
          image: herbsImg,
          description: "Transformez vos aromates et plantes fraîches en beurres parfumés, huiles d'olive infusées et nectars botaniques sans jamais développer d'amertume.",
          exampleTitle: "Huile d'Olive Infusée au Romarin, Piment & Ail",
          temp: "38°C", time: "1h 30m", solvent: "Huile d'Olive",
          benefits: ["Zéro amertume par thermorégulation douce", "Conservation prolongée des arômes", "Sublime vos préparations saines du quotidien"]
        },
        cosmetique: {
          title: "Formulation Cosmétique de Grade Laboratoire",
          badge: "Haute Performance Cutanée",
          image: bloomSoinsImg,
          description: "Concevez vous-même vos propres sérums visage, macérats précieux et baumes régénérants sur-mesure sans aucun conservateur synthétique.",
          exampleTitle: "Sérum Précieux Passiflore, Rose & Jojoba",
          temp: "42°C", time: "2h 00m", solvent: "Huile de Jojoba",
          benefits: ["Pénétration cutanée optimale des actifs", "Sans solvants pétrochimiques ni parabènes", "Texture soyeuse et non grasse"]
        },
        phytotherapie: {
          title: "Protocoles Systémiques & Ethnobotanique",
          badge: "Soutien du Terrain",
          image: lifestyleImg,
          description: "Élaborez vos teintures botaniques, décoctions douces et extraits concentrés de résines pour accompagner l'équilibre du terrain.",
          exampleTitle: "Extrait Concentré Boswellia & Clou de Girofle",
          temp: "45°C", time: "3h 00m", solvent: "Alcool alimentaire 60°",
          benefits: ["Capture intégrale du Totum moléculaire", "Stabilité des composés thermolabiles", "Protocoles documentés et reproductibles"]
        }
      }
    },
    footerCTA: {
      badge: "Engagement Souverain",
      title: "La Souveraineté Sanitaire Commence Ici",
      subtitle: "Avec la BloomLab, vous ne vous contentez plus de \"consommer\" des préparations opaques. Vous créez vos soins en toute autonomie, avec la rigueur d'un laboratoire et l'intelligence de la plante. Notre mission est de vous redonner la maîtrise de votre herboristerie domestique.",
      italic: "Une alternative concrète et accessible pour soutenir votre terrain au quotidien, en respectant son équilibre profond.",
      quote: "L'intégrité des molécules actives thermolabiles est préservée grâce à la maîtrise millimétrique du temps, de la température et de l'agitation. Une rigueur qui fait de BloomLab la référence de l'extraction botanique de précision.",
      btn: "👉 Découvrir la BloomLab – Paiement en 3x sans frais",
      noteTitle: "Note Technique & Biologique Appliquée",
      totumNote: "*Le <strong>Totum</strong> d'une plante représente l'intégralité de ses principes actifs agissant en synergie. Contrairement aux molécules isolées par l'industrie pharmaceutique, le Totum respecte la complexité biologique du vivant et évite les effets secondaires liés à l'isolement chimique. Son extraction de précision à basse température garantit une biodisponibilité optimale pour l'organisme humain. En maîtrisant la thermorégulation, la BloomLab® empêche la dégradation des enzymes et des vitamines sensibles, favorisant ainsi un rééquilibrage profond et durable du terrain biologique. C'est la garantie d'un soin vivant, vibrant et pleinement actif pour votre microbiome et votre santé globale."
    },
    steps: {
      title: "3 Étapes. Du végétal brut à votre soin pur.",
      subtitle: "Aucune compétence technique nécessaire. Un bouton suffit.",
      list: [
        { step: "01", title: "Remplissez", desc: "Plantes sèches ou fraîches + votre solvant (Eau, Huile, Alcool) dans la cuve." },
        { step: "02", title: "Programmez", desc: "Choisissez votre mode d'extraction. La BloomLab® gère le reste en silence." },
        { step: "03", title: "Récupérez", desc: "En moins de 4h, votre extrait pur est prêt à l'emploi. Zéro filtration nécessaire." }
      ]
    },
    mastery: {
      title: "Votre Parcours de Maîtrise",
      subtitle: "L'apprentissage de l'extraction est un voyage. Nous vous accompagnons à chaque étape.",
      levels: [
        {
          id: "decouverte",
          title: "Découverte",
          period: "0 - 3 mois",
          description: "Maîtrisez les bases de l'infusion aqueuse et les premières extractions culinaires douces.",
          focus: "Extraction A (Hydrosoluble)"
        },
        {
          id: "initiation",
          title: "Initiation",
          period: "3 - 6 mois",
          description: "Explorez les macérats huileux et les premiers soins cosmétiques de précision.",
          focus: "Extraction B (Liposoluble)"
        },
        {
          id: "maitrise",
          title: "Maîtrise",
          period: "6 - 12 mois",
          description: "Combinez les extractions A+B pour créer des remèdes complets et des protocoles de terrain.",
          focus: "Formulation Totum"
        },
        {
          id: "expertise",
          title: "Expertise",
          period: "1 an +",
          description: "Concevez vos propres protocoles systémiques avancés et formulations expertes.",
          focus: "Souveraineté Sanitaire"
        }
      ]
    },
    faq: {
      title: "Tout ce que vous devez savoir avant de commander",
      items: [
        { q: "En quoi la BloomLab® est-elle différente d'un simple bain-marie ?", a: "Le bain-marie traditionnel ne permet aucun contrôle précis : l'eau atteint rapidement 60°C à 100°C, détruisant les molécules thermosensibles (terpènes, flavonoïdes). La BloomLab® possède un capteur thermique au degré près qui régule la chauffe pour préserver 100% du Totum sans risque de brûler vos préparations." },
        { q: "Faut-il être herboriste ou chimiste pour l'utiliser ?", a: "Absolument pas ! La BloomLab® est livrée avec un guide pratique simple et des programmes préenregistrés. Vous ajoutez vos ingrédients (eau, huile ou alcool), vous choisissez le profil (Culinaire, Cosmétique ou Remède) et la machine gère tout." },
        { q: "Quels solvants puis-je utiliser en toute sécurité ?", a: "La cuve Inox 304 de grade alimentaire est conçue pour fonctionner avec l'eau purifiée, toutes les huiles végétales (Jojoba, Olive, Argan) et les alcools alimentaires titrés de 45° à 60°. Sa conception hermétique empêche toute évaporation volatile." }
      ]
    }
  },
  en: {
    marquee: ["🇫🇷 French Botanical Brand", "🚚 Priority Shipping in 24/48h", "🛡️ 30-Day Money Back Guarantee", "⚡ 1-Year Manufacturer Warranty"],
    hero: {
      badge: "SEQUENTIAL A/B EXTRACTION · 2026 EDITION",
      overline: "CULINARY · COSMETIC · SYSTEMIC",
      h1: "BloomLab: the precision botanical extractor for mastering homemade preparations",
      h2_pre: "Natural care should no longer be approximate.",
      h2_title: "Take back control of your botanical extraction.",
      h2: "Natural care should no longer be approximate. Take back control of your botanical extraction.",
      subtitle: "For decades, plant preparation has been oversimplified, depleting its potential. BloomLab restores laboratory rigor to your home: precise control of time, temperature and stirring to reveal the vegetal Totum in your infused oils, macerates and botanical extracts.",
      rating: "A design dedicated to precision botanical extraction.",
      primaryCta: "I'm starting",
      secondaryCta: "Discover the A/B method",
      secondaryCtaProduct: "Discover BloomLab®",
      footerLine: "CULINARY · COSMETIC · SYSTEMIC",
      buyBtn: "Discover BloomLab®",
      installment: "3x interest-free payment by Klarna",
      installmentSub: "Or €79.66 / month",
      guarantee: "1-year manufacturer warranty",
      shipping: "Shipped within 24/48h",
      benefits: [
        { title: "Against waste", text: "Traditional methods destroy thermolabile compounds. BloomLab preserves the integrity of every molecule." },
        { title: "For sovereignty", text: "No more opaque products or unknown dosages. You choose the plant, solvent, and concentration." },
        { title: "Through precision", text: "Every extraction is documented, reproducible, and mastered. Nothing is left to chance." }
      ],
      usageTags: [
        { label: "🍳 Culinary", mode: "culinaire", desc: "Infused oils & aromatic butters" },
        { label: "🌿 Systemic", mode: "sante", desc: "Concentrated extracts & plant Totum" },
        { label: "🧴 Cosmetic", mode: "cosmetique", desc: "Pure serums & botanical macerates" }
      ],
      reassuranceBadges: [
        "3x interest-free payment",
        "1-year warranty",
        "Shipped within 24/48h"
      ],
      features: [
        { title: "Stainless Steel", sub: "Food Grade", icon: Microscope },
        { title: "Controlled Temperature", sub: "Zero Overheating", icon: Thermometer },
        { title: "Multi-Solvents", sub: "Water, Oil, Alcohol", icon: Droplets }
      ]
    },
    heritageTeaser: {
      badge: "The Origins of BloomLab®",
      text: "BloomLab® is not just a machine. It was born from a millennia-old quest: to extract the perfect essence of plants without burning or wasting it. A precision technology that reconciles Asian botanical wisdom with modern science.",
      cta: "Discover BloomLab"
    },
    selector: {
      label: "Fast extraction mode:",
      modes: {
        culinaire: { label: "Culinary", desc: "🌿 <strong>Culinary Mode:</strong> Gentle extraction of aromatic oils & botanical butters without bitterness at 38°C." },
        cosmetique: { label: "Cosmetic", desc: "🌸 <strong>Cosmetic Mode:</strong> Formulation of pure face serums and regenerating balms at 42°C." },
        sante: { label: "Systemic Protocols", desc: "🧪 <strong>Systemic Protocols Mode:</strong> Mother tinctures and concentrated resin/root extracts at 45°C." }
      }
    },
    whyBloomLab: {
      title: "Why BloomLab changes your daily life",
      without: {
        title: "Without BloomLab",
        items: [
          "You depend on industrial opacity for your care.",
          "Approximate methods degrade temperature-sensitive active compounds.",
          "You accumulate expensive and complex products."
        ]
      },
      with: {
        title: "With BloomLab",
        items: [
          "You create your own preparations, 100% transparent.",
          "You unlock the full botanical Totum without thermal degradation.",
          "One single machine for three sovereign universes."
        ]
      }
    },
    universes: {
      title: "One single machine. Three universes of sovereign care every day.",
      subtitle_part1: "The BloomLab is the concrete alternative you've been waiting for: a machine that transforms your plants into active extracts, without chemistry, without waste, without dependence. Regain control of your botanical preparations with laboratory precision.",
      subtitle_part2: "🔬 Precise Extraction, the Key to Scientific Rigor\nWith approximate traditional methods, heat-sensitive compounds are degraded by irregular temperature spikes.",
      subtitle_part3: "The BloomLab changes everything. Thanks to the millimetric control of temperature, time, and agitation, it releases the plant Totum – the full spectrum of water-soluble and oil-soluble active fractions.",
      tabs: { culinaire: "Culinary", cosmetique: "Cosmetic", phytotherapie: "Systemic Protocols" },
      descriptions: {
        culinaire: "1. Botanical Gastronomy: Aromatic and bitter plants reveal their full sensory complexity without burning or excessive bitterness.",
        cosmetique: "2. Natural Beauty: Care oils infused at low temperature preserve the integrity of their fatty acids and antioxidants. Preservative-free.",
        phytotherapie: "3. Systemic Support: Roots and resins extracted following documented protocols durably support your biological terrain."
      },
      data: {
        culinaire: {
          title: "Culinary Atelier & Botanical Gastronomy",
          badge: "Gourmet & Precision Know-How",
          image: herbsImg,
          description: "Transform your herbs and fresh plants into scented butters, infused olive oils, and botanical nectars without ever developing bitterness.",
          exampleTitle: "Olive Oil Infused with Rosemary, Chili & Garlic",
          temp: "38°C", time: "1h 30m", solvent: "Olive Oil",
          benefits: ["Zero bitterness with gentle thermoregulation", "Prolonged aroma preservation", "Elevates your healthy daily dishes"]
        },
        cosmetique: {
          title: "Laboratory Grade Cosmetic Formulation",
          badge: "High Skin Performance",
          image: bloomSoinsImg,
          description: "Design your own face serums, precious macerates, and tailor-made regenerating balms without any synthetic preservatives.",
          exampleTitle: "Precious Passionflower, Rose & Jojoba Serum",
          temp: "42°C", time: "2h 00m", solvent: "Jojoba Oil",
          benefits: ["Deep skin penetration of actives", "Without petrochemical solvents or parabens", "Silky non-greasy texture"]
        },
        phytotherapie: {
          title: "Systemic Protocols & Ethnobotany",
          badge: "Terrain Support",
          image: lifestyleImg,
          description: "Create your botanical tinctures, gentle decoctions, and concentrated resin extracts to support overall terrain balance.",
          exampleTitle: "Concentrated Boswellia & Clove Extract",
          temp: "45°C", time: "3h 00m", solvent: "Food Grade Alcohol 60°",
          benefits: ["Integral capture of the molecular Totum", "Stability of heat-sensitive compounds", "Documented, reproducible protocols"]
        }
      }
    },
    footerCTA: {
      badge: "Sovereign Commitment",
      title: "Health Sovereignty Starts Here",
      subtitle: "With BloomLab, you no longer just \"consume\" opaque products. You create your botanical care in total autonomy, with laboratory rigor and plant wisdom.",
      italic: "A concrete and accessible alternative to support your biological terrain daily, respecting its deep balance.",
      quote: "The integrity of delicate active molecules is preserved thanks to the millimetric control of time, temperature and agitation. A rigor that makes BloomLab the benchmark for precision botanical extraction.",
      btn: "👉 Discover BloomLab – Payment in 3x interest-free",
      noteTitle: "Applied Technical & Biological Note",
      totumNote: "*The <strong>Totum</strong> of a plant represents all of its active principles acting in synergy. Unlike industry's isolated molecules, the Totum respects the biological complexity of life. Its precision extraction at low temperature guarantees optimal bioavailability for the human organism. By mastering thermoregulation, BloomLab® prevents the degradation of sensitive enzymes and vitamins, thus promoting a deep and lasting support of the biological terrain."
    },
    steps: {
      title: "3 Steps. From raw plant to your pure care.",
      subtitle: "No technical skills required. One button is enough.",
      list: [
        { step: "01", title: "Fill", desc: "Dry or fresh plants + your solvent (Water, Oil, Alcohol) in the tank." },
        { step: "02", title: "Program", desc: "Choose your extraction mode. BloomLab® handles the rest in silence." },
        { step: "03", title: "Collect", desc: "In less than 4h, your pure extract is ready for use. Zero filtration necessary." }
      ]
    },
    mastery: {
      title: "Your Mastery Journey",
      subtitle: "Learning extraction is a journey. We accompany you every step of the way.",
      levels: [
        {
          id: "decouverte",
          title: "Discovery",
          period: "0 - 3 months",
          description: "Master the basics of aqueous infusion and the first gentle culinary extractions.",
          focus: "Extraction A (Water-soluble)"
        },
        {
          id: "initiation",
          title: "Initiation",
          period: "3 - 6 months",
          description: "Explore oily macerates and the first precision cosmetic formulations.",
          focus: "Extraction B (Oil-soluble)"
        },
        {
          id: "maitrise",
          title: "Mastery",
          period: "6 - 12 months",
          description: "Combine A+B extractions to create complete Totum extracts and terrain protocols.",
          focus: "Totum Formulation"
        },
        {
          id: "expertise",
          title: "Expertise",
          period: "1 year +",
          description: "Design your own advanced systemic protocols and expert formulations.",
          focus: "Health Sovereignty"
        }
      ]
    },
    faq: {
      title: "Everything you need to know before ordering",
      items: [
        { q: "How is BloomLab® different from a simple bain-marie?", a: "Traditional bain-marie allows no precise control: water quickly reaches 60°C to 100°C, destroying heat-sensitive molecules (terpenes, flavonoids). BloomLab® has a precision thermal sensor that regulates heating to preserve 100% of the Totum without risk of burning your preparations." },
        { q: "Do you need to be an herbalist or chemist to use it?", a: "Absolutely not! BloomLab® comes with a simple practical guide and pre-recorded programs. You add your ingredients (water, oil, or alcohol), choose the profile (Culinary, Cosmetic, or Remedy) and the machine handles everything." },
        { q: "Which solvents can I use safely?", a: "The laboratory-grade 304 Stainless Steel tank is designed to work with purified water, all vegetable oils (Jojoba, Olive, Argan) and food-grade alcohols from 45° to 60°. Its airtight design prevents volatile evaporation." }
      ]
    }
  },
  de: {
    marquee: ["🇫🇷 Französische botanische Marke", "🚚 Prioritärer Versand in 24/48h", "🛡️ 30-Tage-Geld-zurück-Garantie", "⚡ 1 Jahr Herstellergarantie"],
    hero: {
      badge: "SEQUENTIELLE A/B-EXTRAKTION · AUSGABE 2026",
      overline: "KULINARISCH · KOSMETISCH · SYSTEMISCH",
      h1: "BloomLab: der botanische Präzisionsextraktor für die Beherrschung Ihrer hausgemachten Zubereitungen",
      h2_pre: "Natürlichkeit darf nicht länger ungefähr sein.",
      h2_title: "Übernehmen Sie wieder die Kontrolle über Ihre botanische Extraktion.",
      h2: "Natürlichkeit darf nicht länger ungefähr sein. Übernehmen Sie wieder die Kontrolle über Ihre botanische Extraktion.",
      subtitle: "Über Jahrzehnte wurde die Zubereitung von Pflanzen übermäßig vereinfacht und ihr Potenzial geschwächt. BloomLab bringt die Strenge eines Laborprotokolls zu Ihnen nach Hause: präzise Kontrolle von Zeit, Temperatur und Rühren, um das pflanzliche Totum Ihrer Kräuteröle, Mazerate und botanischen Extrakte zu entfalten.",
      rating: "Ein Design für die präzise botanische Extraktion.",
      primaryCta: "Ich starte",
      secondaryCta: "Die A/B-Methode entdecken",
      secondaryCtaProduct: "Die BloomLab® entdecken",
      footerLine: "KULINARISCH · KOSMETISCH · SYSTEMISCH",
      buyBtn: "Die BloomLab® entdecken",
      installment: "Zahlung in 3 zinsfreien Raten von Klarna",
      installmentSub: "Oder 79,66 € / Monat",
      guarantee: "1 Jahr Herstellergarantie",
      shipping: "Versand innerhalb von 24/48h",
      benefits: [
        { title: "Gegen Verschwendung", text: "Traditionelle Methoden zerstören thermolabile Verbindungen. BloomLab bewahrt die Integrität jedes Moleküls." },
        { title: "Für Souveränität", text: "Schluss mit undurchsichtigen Produkten und unbekannten Dosierungen. Sie wählen Pflanze, Lösungsmittel und Konzentration." },
        { title: "Durch Präzision", text: "Jede Extraktion ist dokumentiert, reproduzierbar und beherrscht. Sie überlassen nichts dem Zufall." }
      ],
      usageTags: [
        { label: "🍳 Kulinarisch", mode: "culinaire", desc: "Infundierte Öle & aromatische Butter" },
        { label: "🌿 Systemisch", mode: "sante", desc: "Konzentrierte Extrakte & Pflanzentotum" },
        { label: "🧴 Kosmetik", mode: "cosmetique", desc: "Reine Seren & botanische Mazerate" }
      ],
      reassuranceBadges: [
        "3x zinsfreie Zahlung",
        "1 Jahr Garantie",
        "Versand in 24/48h"
      ],
      features: [
        { title: "Edelstahl", sub: "Lebensmittelqualität", icon: Microscope },
        { title: "Kontrollierte Temperatur", sub: "Keine Überhitzung", icon: Thermometer },
        { title: "Multi-Lösungsmittel", sub: "Wasser, Öl, Alkohol", icon: Droplets }
      ]
    },
    heritageTeaser: {
      badge: "Die Ursprünge von BloomLab®",
      text: "BloomLab® ist nicht nur eine Maschine. Sie wurde aus einer jahrtausendealten Suche geboren: die perfekte Essenz von Pflanzen zu extrahieren, ohne sie zu verbrennen oder zu verschwenden. Eine Präzisionstechnologie, die asiatische botanische Weisheit mit moderner Wissenschaft vereint.",
      cta: "BloomLab entdecken"
    },
    selector: {
      label: "Schnellextraktionsmodus:",
      modes: {
        culinaire: { label: "Kulinarisch", desc: "🌿 <strong>Kulinarischer Modus:</strong> Sanfte Extraktion von Aromaölen und botanischen Buttern ohne Bitterkeit bei 38°C." },
        cosmetique: { label: "Kosmetisch", desc: "🌸 <strong>Kosmetischer Modus:</strong> Formulierung von reinen Gesichtsseren und regenerierenden Balsamen bei 42°C." },
        sante: { label: "Systemische Protokolle", desc: "🧪 <strong>Systemische Protokolle Modus:</strong> Urtinkturen und konzentrierte Harz-/Wurzelextrakte bei 45°C." }
      }
    },
    whyBloomLab: {
      title: "Warum die BloomLab Ihren Alltag verändert",
      without: {
        title: "Ohne BloomLab",
        items: [
          "Sie sind für Ihre Pflege von industrieller Intransparenz abhängig.",
          "Ungenaue Methoden schädigen hitzeempfindliche Pflanzenmoleküle.",
          "Sie häufen teure und unübersichtliche Produkte an."
        ]
      },
      with: {
        title: "Mit BloomLab",
        items: [
          "Sie kreieren Ihre eigenen botanischen Zubereitungen, 100 % transparent.",
          "Sie erschließen das pflanzliche Totum ohne thermische Zersetzung.",
          "Eine einzige Maschine für drei souveräne Anwendungsbereiche."
        ]
      }
    },
    universes: {
      title: "Eine einzige Maschine. Drei Universen souveräner Pflege jeden Tag.",
      subtitle_part1: "Die BloomLab ist die konkrete Alternative, auf die Sie gewartet haben: eine Maschine, die Ihre Pflanzen in aktive Extrakte verwandelt – ohne Chemie, ohne Abfall, ohne Abhängigkeit. Übernehmen Sie wieder die Kontrolle über Ihre botanischen Zubereitungen mit Laborpräzision.",
      subtitle_part2: "🔬 Präzise Extraktion, der Schlüssel zu wissenschaftlicher Strenge\nBei ungenauen herkömmlichen Methoden werden hitzeempfindliche Verbindungen durch abrupte Temperaturspitzen zerstört.",
      subtitle_part3: "Die BloomLab ändert alles. Dank der millimetergenauen Kontrolle von Temperatur, Zeit und Rühren setzt sie das pflanzliche Totum frei – die Gesamtheit aller wasser- und fettlöslichen Wirkstofffraktionen.",
      tabs: { culinaire: "Kulinarisch", cosmetique: "Kosmetisch", phytotherapie: "Systemische Protokolle" },
      descriptions: {
        culinaire: "1. Botanische Gastronomie: Aroma- und Bitterpflanzen entfalten ihre volle geschmackliche Tiefe ohne Verbrennen oder übermäßige Bitterkeit.",
        cosmetique: "2. Natürliche Schönheit: Pflegeöle, die bei niedriger Temperatur infundiert werden, bewahren ihre wertvollen Fettsäuren und Antioxidantien. Ohne Konservierungsstoffe.",
        phytotherapie: "3. Systemische Unterstützung: Wurzeln und Harze, die nach dokumentierten Protokollen extrahiert werden, unterstützen nachhaltig Ihr biologisches Terrain."
      },
      data: {
        culinaire: {
          title: "Kulinarisches Atelier & Botanische Gastronomie",
          badge: "Gourmet- & Präzisions-Know-how",
          image: herbsImg,
          description: "Verwandeln Sie Ihre Kräuter und frischen Pflanzen in duftende Butter, infundierte Olivenöle und gastronomische Elixiere, ohne jemals Bitterkeit zu entwickeln.",
          exampleTitle: "Olivenöl infundiert mit Rosmarin, Chili & Knoblauch",
          temp: "38°C", time: "1h 30m", solvent: "Olivenöl",
          benefits: ["Null Bitterkeit durch sanfte Thermoregulation", "Länger anhaltende Aromabewahrung", "Veredelt Ihre gesunden täglichen Gerichte"]
        },
        cosmetique: {
          title: "Kosmetische Formulierung in Laborqualität",
          badge: "Hohe Hautleistung",
          image: labImg,
          description: "Entwerfen Sie Ihre eigenen Gesichtsseren, kostbaren Mazerate and maßgeschneiderten regenerierenden Balsame ohne synthetische Konservierungsstoffe.",
          exampleTitle: "Kostbares Passionsblumen-, Rosen- & Jojoba-Serum",
          temp: "42°C", time: "2h 00m", solvent: "Jojobaöl",
          benefits: ["Tiefe Hautpenetration der Wirkstoffe", "Ohne petrochemische Lösungsmittel oder Parabene", "Samtige, nicht fettende Textur"]
        },
        phytotherapie: {
          title: "Systemische Protokolle & Ethnobotanik",
          badge: "Terrain-Unterstützung",
          image: lifestyleImg,
          description: "Erstellen Sie Ihre botanischen Tinkturen, schonenden Dekokte und konzentrierten Harzextrakte zur Begleitung des biologischen Terrains.",
          exampleTitle: "Konzentrierter Boswellia- & Nelkenextrakt",
          temp: "45°C", time: "3h 00m", solvent: "Trinkalkohol 60°",
          benefits: ["Integrale Erfassung des molekularen Totums", "Stabilität hitzeempfindlicher Verbindungen", "Dokumentierte, reproduzierbare Protokolle"]
        }
      }
    },
    footerCTA: {
      badge: "Souveränes Engagement",
      title: "Sanitäre Souveränität beginnt hier",
      subtitle: "Mit der BloomLab konsumieren Sie nicht länger undurchsichtige Produkte. Sie kreieren Ihre botanische Pflege in völliger Autonomie, mit Laborstrenge und Pflanzenweisheit.",
      italic: "Eine konkrete und zugängliche Alternative, um Ihr biologisches Terrain täglich im Einklang mit seinen tiefen Bedürfnissen zu unterstützen.",
      quote: "Die Unversehrtheit empfindlicher Wirkstoffmoleküle wird dank der millimetergenauen Kontrolle von Zeit, Temperatur und Rührung bewahrt. Eine wissenschaftliche Exzellenz, die BloomLab zur Referenz der botanischen Präzisionsextraktion macht.",
      btn: "👉 BloomLab entdecken – Zahlung in 3x zinsfreien Raten",
      noteTitle: "Angewandte technische und biologische Anmerkung",
      totumNote: "*Das <strong>Totum</strong> einer Pflanze stellt die Gesamtheit ihrer Wirkstoffe dar, die synergetisch wirken. Im Gegensatz zu den isolierten Molekülen der Industrie respektiert das Totum die biologische Komplexität des Lebens. Seine Präzisionsextraktion bei niedriger Temperatur garantiert eine optimale Bioverfügbarkeit für den menschlichen Organismus. Durch die Beherrschung der Thermoregulation verhindert BloomLab® den Abbau empfindlicher Enzyme und Vitamine und fördert so eine tiefe und dauerhafte Unterstützung des biologischen Terrains."
    },
    steps: {
      title: "3 Schritte. Von der Rohpflanze zu Ihrer reinen Pflege.",
      subtitle: "Keine technischen Kenntnisse erforderlich. Ein Knopf genügt.",
      list: [
        { step: "01", title: "Füllen", desc: "Trockene oder frische Pflanzen + Ihr Lösungsmittel (Wasser, Öl, Alkohol) in den Tank." },
        { step: "02", title: "Programmieren", desc: "Wählen Sie Ihren Extraktionsmodus. BloomLab® erledigt den Rest in Stille." },
        { step: "03", title: "Sammeln", desc: "In weniger als 4 Stunden ist Ihr reiner Extrakt gebrauchsfertig. Keine Filtration erforderlich." }
      ]
    },
    mastery: {
      title: "Ihr Weg zur Meisterschaft",
      subtitle: "Das Erlernen der Extraktion ist eine Reise. Wir begleiten Sie bei jedem Schritt.",
      levels: [
        {
          id: "decouverte",
          title: "Entdeckung",
          period: "0 - 3 Monate",
          description: "Beherrschen Sie die Grundlagen der wässrigen Infusion und die ersten sanften kulinarischen Extraktionen.",
          focus: "Extraktion A (Wasserlöslich)"
        },
        {
          id: "initiation",
          title: "Einweihung",
          period: "3 - 6 Monate",
          description: "Erkunden Sie ölhaltige Mazerate und die ersten Präzisions-Kosmetikformulierungen.",
          focus: "Extraktion B (Fettlöslich)"
        },
        {
          id: "maitrise",
          title: "Meisterschaft",
          period: "6 - 12 Monate",
          description: "Kombinieren Sie A+B Extraktionen, um vollständige Totum-Extrakte und Terrain-Protokolle zu erstellen.",
          focus: "Totum-Formulierung"
        },
        {
          id: "expertise",
          title: "Expertise",
          period: "1 Jahr +",
          description: "Entwerfen Sie Ihre eigenen fortgeschrittenen systemischen Protokolle und Experten-Formulierungen.",
          focus: "Gesundheitssouveränität"
        }
      ]
    },
    faq: {
      title: "Alles, was Sie vor der Bestellung wissen müssen",
      items: [
        { q: "Wie unterscheidet sich BloomLab® von einem einfachen Wasserbad?", a: "Das traditionelle Wasserbad ermöglicht keine präzise Kontrolle: Das Wasser erreicht schnell 60°C bis 100°C und zerstört hitzeempfindliche Moleküle (Terpene, Flavonoide). BloomLab® verfügt über einen Präzisions-Thermosensor, der die Erwärmung reguliert, um 100% des Totums ohne die Gefahr des Anbrennens Ihrer Zubereitungen zu bewahren." },
        { q: "Muss man Kräuterkundler oder Chemiker sein, um es zu benutzen?", a: "Absolut nicht! BloomLab® wird mit einer einfachen praktischen Anleitung und voraufgezeichneten Programmen geliefert. Sie fügen Ihre Zutaten hinzu (Wasser, Öl oder Alkohol), wählen das Profil (Kulinarisch, Kosmetisch oder Heilmittel) und die Maschine erledigt alles." },
        { q: "Welche Lösungsmittel kann ich sicher verwenden?", a: "Der laborgeprüfte 304 Edelstahlbehälter ist für die Verwendung mit gereinigtem Wasser, allen Pflanzenölen (Jojoba, Olive, Argan) und lebensmittelechten Alkoholen von 45° à 60° ausgelegt. Sein luftdichtes Design verhindert die flüchtige Verdunstung." }
      ]
    }
  }
};

export default function IndexBisContent({ onNavigate, lang = 'fr', scrollToId }: IndexBisContentProps) {
  useEffect(() => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [scrollToId]);

  const [activeHeroType, setActiveHeroType] = useState<HeroType>('sante');
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('phytotherapie');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState({ title: "Pack Signature Rentrée — BloomLab® + Duo Argiles", price: 289 });
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(heroImg1);

  const currentT = translationsIndexBis[lang as keyof typeof translationsIndexBis] || translationsIndexBis.fr;
  const t = globalTranslations[lang];

  const marqueeItems = currentT.marquee;

  const selectPackage = (type: 'solo' | 'master', price: number) => {
    setCartItem({
      title: type === 'solo' ? (lang === 'fr' ? "Coffret BloomLab® Solo — Rentrée 2026" : "BloomLab® Solo Set") : (lang === 'fr' ? "Pack Signature Rentrée — BloomLab® + Duo Argiles" : "Signature Back-to-School Pack"),
      price: price
    });
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-slate-800 font-sans antialiased selection:bg-[#1C3F34] selection:text-white">
      
      {/* TOP ANNOUNCEMENT BAR (MARQUEE) */}
      <div className="bg-[#D97706] text-white py-1 overflow-hidden border-b border-white/10 shadow-sm relative z-50">
        <motion.div 
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12 px-12 shrink-0">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">
                {item}
              </span>
              <span className="opacity-20 text-xl font-light select-none shrink-0">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. L'IMAGE VISIBLE EN PREMIER AVEC TEXTES EN HAUT */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7DFD3] bg-[#FAF7F2] mb-10 sm:mb-12">
            <img 
              src={selectedHeroImage} 
              alt={t.seo.alt.extracteur} 
              className="w-full h-[520px] sm:h-[620px] md:h-[720px] lg:h-[820px] xl:h-[880px] object-cover object-[center_35%] brightness-110 contrast-105 filter transition-all duration-500" 
            />
            {/* Soft neutral scrim in the upper portion for legibility without green tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 via-35% to-transparent pointer-events-none" />

            {/* Badges in bottom corner: in-stock and dual-image switcher */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg1)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg1 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  Vue 1
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg2)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg2 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  Vue 2
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHeroImage(heroImg3)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs border cursor-pointer ${
                    selectedHeroImage === heroImg3 
                      ? 'bg-[#D97706] text-white border-[#D97706] shadow-md' 
                      : 'bg-black/60 text-white/80 border-white/20 hover:text-white'
                  }`}
                >
                  Vue 3
                </button>
              </div>

              <span className="bg-black/70 backdrop-blur-xs border border-white/20 text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full font-sans uppercase tracking-widest shadow-md">
                {lang === 'fr' ? 'En Stock' : 'In Stock'}
              </span>
            </div>

            {/* Badges, Overline and H1 positioned on top of the image */}
            <div className="absolute inset-x-0 top-0 p-6 sm:p-8 md:p-10 lg:p-12 z-10 space-y-3 sm:space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-block px-3.5 py-1.5 bg-black/60 border border-white/25 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-xs backdrop-blur-xs">
                  {currentT.hero.badge}
                </div>
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#D97706] uppercase drop-shadow-xs">
                  {currentT.hero.overline}
                </span>
              </div>

              {/* Main H1 */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
                {currentT.hero.h1}
              </h1>
            </div>
          </div>

          {/* 2. EN DESSOUS DE L'IMAGE */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Sentence 1 in standard body typography + Sentence 2 in title font */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
                {currentT.hero.h2_pre}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0F261E] leading-tight tracking-tight">
                {currentT.hero.h2_title}
              </h2>
            </div>

            {/* Subtitle paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-700 font-normal leading-relaxed">
              {currentT.hero.subtitle}
            </p>

            {/* Trois domaines d'application maîtrisés - CENTRÉS */}
            <div className="space-y-3 pt-2 text-center">
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider text-center">
                {lang === 'fr' ? "Trois domaines d'application maîtrisés :" : lang === 'en' ? "Three mastered fields of application:" : "Drei beherrschte Anwendungsbereiche:"}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {currentT.hero.usageTags.map((tag: any, idx: number) => {
                  const isActive = activeHeroType === tag.mode;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveHeroType(tag.mode as HeroType);
                        const universeMap: Record<HeroType, UniverseType> = {
                          culinaire: 'culinaire',
                          cosmetique: 'cosmetique',
                          sante: 'phytotherapie'
                        };
                        setActiveUniverse(universeMap[tag.mode as HeroType]);
                      }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
                        isActive 
                          ? 'bg-[#1C3F34] text-white shadow-sm ring-2 ring-[#1C3F34]/20' 
                          : 'bg-white border border-[#E7DFD3] text-slate-700 hover:bg-[#F3EEE6] hover:border-[#1C3F34]/30'
                      }`}
                    >
                      <span>{tag.label}</span>
                      <span className={`text-xs opacity-80 hidden sm:inline ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                        • {tag.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3 Benefits Cards: Contre le gaspillage / Pour la souveraineté / Par la précision */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {currentT.hero.benefits.map((b: { title: string; text: string }, i: number) => (
                <div 
                  key={i} 
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7DFD3] shadow-xs hover:border-[#D97706]/40 transition-colors"
                >
                  <div className="text-xs sm:text-sm font-black text-[#0F261E] uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                    {b.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            {/* 3. VIGNETTE : Mode d'extraction rapide : (PLACÉE APRÈS LES 3 VIGNETTES) */}
            <div className="pt-4">
              <div className="relative rounded-3xl bg-white border border-[#E7DFD3] p-6 sm:p-8 shadow-xl max-w-2xl mx-auto glow-subtle">
                <div className="absolute -top-3 -right-3 bg-[#D97706] text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md z-10">
                  {lang === 'fr' ? 'ÉCONOMISEZ 50€' : 'SAVE €50'}
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#0F261E] uppercase tracking-wider block text-center sm:text-left">
                    {currentT.selector.label}
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(currentT.selector.modes) as HeroType[]).map((mode) => (
                      <button 
                        key={mode}
                        onClick={() => {
                          setActiveHeroType(mode);
                          const universeMap: Record<HeroType, UniverseType> = {
                            culinaire: 'culinaire',
                            cosmetique: 'cosmetique',
                            sante: 'phytotherapie'
                          };
                          setActiveUniverse(universeMap[mode]);
                        }} 
                        className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all text-center flex items-center justify-center whitespace-nowrap cursor-pointer ${
                          activeHeroType === mode 
                            ? 'bg-[#1C3F34] text-white shadow-sm' 
                            : 'bg-[#F3EEE6] text-slate-700 hover:bg-[#E7DFD3]'
                        }`}
                      >
                        <span>{currentT.selector.modes[mode].label}</span>
                      </button>
                    ))}
                  </div>

                  <motion.div 
                    key={activeHeroType}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm text-slate-700 bg-[#FAF7F2] p-4 rounded-xl border border-[#F3EEE6] min-h-[52px]"
                    dangerouslySetInnerHTML={{ __html: currentT.selector.modes[activeHeroType].desc }}
                  />

                  <div className="space-y-4 pt-4 border-t border-[#F3EEE6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-black text-[#0F261E]">239€</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onNavigate('product-detail', 'bloomlab')}
                      className="w-full py-4 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white rounded-xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FlaskConical className="w-5 h-5 text-[#D97706]" />
                      <span dangerouslySetInnerHTML={{ __html: currentT.hero.buyBtn }} />
                    </button>

                    {/* Reassurance Badges DANS la vignette "Mode d'extraction rapide :" */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#F3EEE6]">
                      <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-700 font-medium bg-[#F8F4EE] py-2 px-2.5 rounded-xl border border-[#E7DFD3]/80">
                        <CreditCard className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span className="whitespace-nowrap">{currentT.hero.reassuranceBadges[0]}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-700 font-medium bg-[#F8F4EE] py-2 px-2.5 rounded-xl border border-[#E7DFD3]/80">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1C3F34] shrink-0" />
                        <span className="whitespace-nowrap">{currentT.hero.reassuranceBadges[1]}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-700 font-medium bg-[#F8F4EE] py-2 px-2.5 rounded-xl border border-[#E7DFD3]/80">
                        <Truck className="w-3.5 h-3.5 text-[#1C3F34] shrink-0" />
                        <span className="whitespace-nowrap">{currentT.hero.reassuranceBadges[2]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware micro-features: Acier Inoxydable / Température contrôlée / Multi-Solvants */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentT.hero.features.map((f, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-[#F3EEE6] shadow-xs flex items-center gap-3">
                  <f.icon className="w-5 h-5 text-[#1C3F34] shrink-0" />
                  <div>
                    <div className="text-xs font-black text-[#0F261E] uppercase tracking-tight">{f.title}</div>
                    <div className="text-[11px] text-slate-500">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Centered CTAs: Je commence & Découvrir la BloomLab */}
            <div className="space-y-4 pt-4 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#B45309] text-white font-extrabold text-base sm:text-lg px-9 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <FlaskConical className="w-5 h-5 text-[#D97706]" />
                  <span>{currentT.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                
                <button 
                  onClick={() => onNavigate('product-detail', 'bloomlab')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#F3EEE6] active:bg-[#E7DFD3] text-[#0F261E] font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-[#0F261E]/30 hover:border-[#0F261E] shadow-xs transition-all cursor-pointer"
                >
                  <span>{currentT.hero.secondaryCtaProduct}</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706]" />
                </button>
              </div>
            </div>
          </div>

          {/* Centered Footer Line */}
          <div className="mt-14 pt-8 border-t border-[#E7DFD3]/70 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-black text-[#0F261E]/80 uppercase tracking-[0.25em] text-center">
              {currentT.hero.footerLine}
            </span>
          </div>
        </div>
      </section>

      {/* TEASER HISTOIRE & ORIGINES ASIATIQUES */}
      <section className="py-12 bg-[#FAF7F2] border-y border-[#F3EEE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{currentT.heritageTeaser?.badge || (lang === 'fr' ? "Aux origines de la BloomLab®" : "Origins of BloomLab®")}</span>
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-[#0F261E] italic leading-relaxed max-w-3xl mx-auto">
            “{currentT.heritageTeaser?.text || (lang === 'fr' ? "La BloomLab® n'est pas une simple machine. Elle est née d'une quête millénaire : celle d'extraire l'essence parfaite des plantes sans la brûler ni la gaspiller. Une technologie de précision qui réconcilie la sagesse botanique asiatique avec la science moderne." : "The BloomLab® is not just a machine. It was born from a millennia-old quest: to extract the perfect essence of plants without burning or wasting it. A precision technology that reconciles Asian botanical wisdom with modern science.")}”
          </blockquote>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1C3F34] hover:bg-[#D97706] active:bg-[#B45309] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{currentT.heritageTeaser?.cta || (lang === 'fr' ? "Découvrir la BloomLab" : "Discover BloomLab")}</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </div>
      </section>

      <section id="3-univers" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center pt-2">
             <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
                {lang === 'fr' ? 'Polyvalence Absolue' : (lang === 'de' ? 'Absolute Vielseitigkeit' : 'Absolute Versatility')}
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-[#0F261E] mb-8">{currentT.universes.title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-slate-600 max-w-7xl mx-auto text-justify">
               <p className="leading-relaxed">{currentT.universes.subtitle_part1}</p>
               <p className="whitespace-pre-line leading-relaxed">{currentT.universes.subtitle_part2}</p>
               <p className="leading-relaxed">{(currentT.universes as any).subtitle_part3}</p>
             </div>
          </div>

          <div className="space-y-12">
            {/* 3-COLUMN UNIVERSES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(Object.keys(currentT.universes.tabs) as UniverseType[]).map((tab) => (
                <div 
                  key={tab} 
                  onClick={() => setActiveUniverse(tab)}
                  className={`flex flex-col p-4 md:p-6 rounded-[24px] border transition-all cursor-pointer group ${
                    activeUniverse === tab 
                      ? 'bg-white border-[#D97706] shadow-xl ring-1 ring-[#D97706]' 
                      : 'bg-[#FAF7F2] border-[#F3EEE6] shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    activeUniverse === tab ? 'bg-[#1C3F34] text-white' : 'bg-white text-[#1C3F34] shadow-sm'
                  }`}>
                    {tab === 'culinaire' && <ChefHat className="w-4 h-4" />}
                    {tab === 'cosmetique' && <Star className="w-4 h-4" />}
                    {tab === 'phytotherapie' && <Activity className="w-4 h-4" />}
                  </div>
                  <h3 className="text-sm md:text-xl font-black text-[#0F261E] mb-2">{currentT.universes.tabs[tab]}</h3>
                  <p className="text-[11px] md:text-sm text-slate-600 text-justify leading-relaxed flex-grow mb-3">
                    {currentT.universes.descriptions[tab]}
                  </p>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tab === 'culinaire') onNavigate('culinaire');
                      if (tab === 'cosmetique') onNavigate('cosmetiques');
                      if (tab === 'phytotherapie') onNavigate('phytotherapie-reset');
                    }}
                    className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${
                      activeUniverse === tab ? 'text-[#D97706]' : 'text-slate-400 group-hover:text-[#1C3F34]'
                    }`}
                  >
                    {lang === 'fr' ? 'Détails du Protocole' : 'Protocol Details'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeUniverse === tab ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeUniverse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-[48px] border border-[#F3EEE6] shadow-2xl overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F1EE] rounded-bl-full -mr-16 -mt-16 opacity-50" />
                
                <div className="space-y-8 order-2 lg:order-1 text-left relative z-10">
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 bg-[#D97706]/10 text-[#D97706] text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {currentT.universes.data[activeUniverse].badge}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-[#0F261E] leading-tight">{currentT.universes.data[activeUniverse].title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{currentT.universes.data[activeUniverse].description}</p>
                  </div>

                  <div className="bg-[#FAF7F2] p-5 md:p-6 rounded-[32px] border border-[#F3EEE6] space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] md:text-sm font-black text-[#0F261E] uppercase tracking-[0.2em]">{lang === 'fr' ? 'Configuration de Précision' : 'Precision Settings'}</h4>
                      <div className="px-2 py-0.5 bg-[#1C3F34] text-white text-[8px] font-bold rounded-full uppercase tracking-widest">Grade Laboratoire</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                      {[
                        { label: lang === 'fr' ? 'Temp.' : (lang === 'de' ? 'Temp.' : 'Temp.'), val: currentT.universes.data[activeUniverse].temp, icon: Thermometer },
                        { label: lang === 'fr' ? 'Durée' : (lang === 'de' ? 'Dauer' : 'Time'), val: currentT.universes.data[activeUniverse].time, icon: Clock },
                        { label: lang === 'fr' ? 'Solvant' : (lang === 'de' ? 'Lösungsm.' : 'Solvent'), val: currentT.universes.data[activeUniverse].solvent, icon: Droplets }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white p-3 md:p-5 rounded-2xl border border-[#F3EEE6] shadow-sm flex flex-col items-center justify-center text-center flex-1 min-w-0 transition-all hover:border-[#D97706]/30">
                          <stat.icon className="w-5 h-5 text-[#D97706] mb-1.5" />
                          <div className="text-[10px] md:text-[11px] text-slate-400 uppercase font-black tracking-widest leading-tight mb-1">
                            {stat.label}
                          </div>
                          <div className="text-[12px] md:text-base font-black text-[#0F261E] break-words w-full px-1">{stat.val}</div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-[#F3EEE6]">
                      <div className="flex items-center gap-2 overflow-visible">
                        <span className="w-2 h-2 bg-[#D97706] rounded-full shrink-0" />
                        <h5 className="text-xs md:text-base font-black text-[#1C3F34] whitespace-nowrap overflow-visible leading-tight">
                          {currentT.universes.data[activeUniverse].exampleTitle}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-black text-[#0F261E] uppercase tracking-[0.2em] mb-6">{lang === 'fr' ? 'Avantages de l\'Extraction du Totum' : 'Totum Extraction Benefits'}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentT.universes.data[activeUniverse].benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative aspect-square rounded-[32px] overflow-hidden border-8 border-white shadow-2xl">
                    <img 
                      src={currentT.universes.data[activeUniverse].image} 
                      alt={currentT.universes.data[activeUniverse].title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F261E]/40 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION COMPARATIF */}
      <section id="comparatif" className="py-12 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
              {lang === 'fr' ? "L'Argument Preuve" : (lang === 'de' ? "Beweisargument" : "Proof Argument")}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E] mt-6">Bain-Marie Classique <span className="text-slate-400">VS</span> Extracteur BloomLab®</h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-4">{lang === 'fr' ? "Découvrez pourquoi nos utilisateurs ont définitivement remisé leurs casseroles au placard." : (lang === 'de' ? "Erfahren Sie, warum unsere Nutzer ihre Töpfe endgültig in den Schrank gestellt haben." : "Discover why our users have permanently retired their pans to the closet.")}</p>
          </div>
          <div className="bg-white rounded-[32px] border border-[#F3EEE6] overflow-hidden shadow-xl">
             <div className="grid grid-cols-2 md:grid-cols-3 bg-[#FAF7F2] border-b border-[#F3EEE6]">
               <div className="p-6 md:p-8 font-black text-[#0F261E] uppercase tracking-widest text-xs hidden md:block border-r border-[#F3EEE6]">{lang === 'fr' ? 'Critères' : (lang === 'de' ? 'Kriterien' : 'Criteria')}</div>
               <div className="p-6 md:p-8 font-black text-red-600 uppercase tracking-widest text-xs text-center">Bain-Marie</div>
               <div className="p-6 md:p-8 font-black text-[#1C3F34] uppercase tracking-widest text-xs text-center bg-white border-x border-[#F3EEE6] relative">
                 BloomLab®
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#D97706]"></div>
               </div>
             </div>
             {[
               { label: lang === 'fr' ? "Contrôle Thermique" : (lang === 'de' ? "Thermische Kontrolle" : "Thermal Control"), bm: lang === 'fr' ? "Incertain (+60°C à 100°C). Destruction des terpènes fragiles." : (lang === 'de' ? "Unsicher (+60°C bis 100°C). Zerstörung empfindlicher Terpene." : "Uncertain (+60°C to 100°C). Destruction of fragile terpenes."), bl: lang === 'fr' ? "Degré près (±0.5°C). Thermorégulation MTC 2.0." : (lang === 'de' ? "Gradgenau (±0,5°C). TCM 2.0 Thermoregulation." : "Degree precision (±0.5°C). MTC 2.0 Thermoregulation.") },
               { label: lang === 'fr' ? "Rendement du Totum" : (lang === 'de' ? "Totum-Ertrag" : "Totum Yield"), bm: lang === 'fr' ? "Faible (30-40%). Dégradation des principes actifs." : (lang === 'de' ? "Gering (30-40%). Abbau der Wirkstoffe." : "Low (30-40%). Degradation of active ingredients."), bl: lang === 'fr' ? "Maximale (95-100%). Extraction intégrale." : (lang === 'de' ? "Maximal (95-100%). Integrale Extraktion." : "Maximum (95-100%). Integral extraction.") },
               { label: lang === 'fr' ? "Temps de Préparation" : (lang === 'de' ? "Vorbereitungszeit" : "Preparation Time"), bm: lang === 'fr' ? "4 à 6 Semaines de macération lente." : (lang === 'de' ? "4 bis 6 Wochen langsame Mazeration." : "4 to 6 weeks of slow maceration."), bl: lang === 'fr' ? "1 à 4 Heures selon le protocole." : (lang === 'de' ? "1 bis 4 Stunden je nach Protokoll." : "1 to 4 hours depending on the protocol.") },
               { label: lang === 'fr' ? "Nettoyage & Ergonomie" : (lang === 'de' ? "Reinigung & Ergonomie" : "Cleaning & Ergonomics"), bm: lang === 'fr' ? "Fastidieux. Étamines salissantes à presser." : (lang === 'de' ? "Mühsam. Verschmutzte Siebe zum Auspressen." : "Tedious. Messy strainers to squeeze."), bl: lang === 'fr' ? "Nettoyage Express (60s). Cuve Inox 304." : (lang === 'de' ? "Express-Reinigung (60s). 304 Edelstahlbehälter." : "Express Cleaning (60s). 304 Stainless Steel tank.") },
               { label: lang === 'fr' ? "Sécurité des Solvants" : (lang === 'de' ? "Lösungsmittelsicherheit" : "Solvent Safety"), bm: lang === 'fr' ? "Risqué. Vapeurs d'alcool sur feu vif." : (lang === 'de' ? "Riskant. Alkoholdämpfe auf offener Flamme." : "Risky. Alcohol vapors on open flame."), bl: lang === 'fr' ? "Circuit Hermétique. Zéro fuite de vapeurs." : (lang === 'de' ? "Hermetischer Kreislauf. Keine Dampflecks." : "Hermetic Circuit. Zero vapor leakage.") }
             ].map((row, i) => (
               <div key={i} className="grid grid-cols-2 md:grid-cols-3 border-b border-[#F3EEE6] last:border-0 hover:bg-[#FAF7F2]/50 transition-colors">
                 <div className="p-5 md:p-6 text-sm font-bold text-[#0F261E] hidden md:flex items-center border-r border-[#F3EEE6]">{row.label}</div>
                 <div className="p-5 md:p-6 text-sm text-red-600 text-center font-medium">{row.bm}</div>
                 <div className="p-5 md:p-6 text-sm font-bold text-[#1C3F34] text-center bg-white border-x border-[#F3EEE6] flex items-center justify-center gap-2">
                   <Check className="w-4 h-4 text-emerald-600 shrink-0" /> {row.bl}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>


      <section className="py-12 bg-[#FAF7F2] border-t border-[#F3EEE6]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center pt-2 mb-16">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
               {lang === 'fr' ? 'Simplicité Totale' : 'Total Simplicity'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E]">{currentT.steps.title}</h2>
            <p className="text-slate-600 mt-2">{currentT.steps.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentT.steps.list.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[48px] border border-[#F3EEE6] space-y-6 shadow-sm relative group hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-[24px] bg-[#1C3F34] text-[#FAF7F2] font-black text-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  {s.step}
                </div>
                <h3 className="text-xl font-black text-[#0F261E]">{s.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section id="avis" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center pt-2 space-y-4">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
              {lang === 'fr' ? 'Avis Authentiques' : 'Authentic Reviews'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F261E]">{lang === 'fr' ? 'Vus dans leurs ateliers et cuisines' : 'Seen in their workshops and kitchens'}</h2>
            <p className="text-slate-600">{lang === 'fr' ? 'Ce que disent nos clients après avoir jeté leurs casseroles au bain-marie.' : 'What our customers say after throwing away their bain-marie pans.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Clara M.", text: lang === 'fr' ? "Je brûlais constamment mes huiles au bain-marie. Avec la BloomLab, la couleur et la texture de mes sérums n'ont plus rien à voir !" : "I was constantly burning my oils in the bain-marie. With BloomLab, the color and texture of my serums are completely different!", role: lang === 'fr' ? "Univers Cosmétique" : "Cosmetic Universe" },
              { name: "Dr. Renaud P.", text: lang === 'fr' ? "Mes teintures-mères se font maintenant en 3h au lieu de 6 semaines. Un gain de temps exceptionnel pour mes préparations." : "My mother tinctures are now made in 3h instead of 6 weeks. Exceptional time saving for my preparations.", role: lang === 'fr' ? "Herbaliste" : "Herbalist" },
              { name: "Antoine L.", text: lang === 'fr' ? "Mon huile infusée au romarin sans amertume est devenue incontournable dans ma cuisine. Lavage ultra simple." : "My rosemary infused oil without bitterness has become a must in my kitchen. Super simple cleaning.", role: lang === 'fr' ? "Gastronomie" : "Gastronomy" }
            ].map((review, i) => (
              <div key={i} className="bg-[#FAF7F2] p-8 rounded-[40px] border border-[#F3EEE6] space-y-6 shadow-sm">
                <div className="flex text-[#D97706] space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-700 italic text-sm leading-relaxed">"{review.text}"</p>
                <div className="pt-4 border-t border-[#E7DFD3] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1C3F34] flex items-center justify-center text-white font-black text-xs">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0F261E]">{review.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUO ARGILES */}
      <section id="duo-argiles" className="py-12 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 bg-[#0F261E] rounded-[48px] p-12 lg:p-20 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
           <div className="space-y-6 pt-2 relative z-10">
             <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
                {lang === 'fr' ? 'Ingénierie Minérale' : 'Mineral Engineering'}
             </div>
             <h2 className="text-4xl font-black">{lang === 'fr' ? 'Duo Argiles' : 'Clay Duo'}</h2>
             <p className="text-xl text-white/70">
               {lang === 'fr' 
                 ? 'Une association de zéolithes et bentonites naturelles sélectionnées pour leurs propriétés d\'adsorption et leur structure microporeuse unique.' 
                 : 'An association of natural zeolites and bentonites selected for their adsorption properties and unique microporous structure.'}
             </p>
             <div className="space-y-4 text-sm text-white/60 font-medium leading-relaxed">
               <p>
                 {lang === 'fr' 
                   ? "Le Duo Argiles repose sur l'affinité physico-chimique de minéraux volcaniques rares. Leur porosité naturelle permet une interaction sélective au sein du cadre digestif." 
                   : "The Clay Duo is based on the physico-chemical affinity of rare volcanic minerals. Their natural porosity allows selective interaction within the digestive framework."}
               </p>
               <p>
                 {lang === 'fr' 
                   ? "Cette synergie minérale est conçue pour accompagner votre terrain sans interférer avec les processus biologiques systémiques." 
                   : "This mineral synergy is designed to support your terrain without interfering with systemic biological processes."}
               </p>
             </div>
             <button onClick={() => selectPackage('master', 289)} className="bg-[#D97706] px-8 py-4 rounded-full font-black hover:scale-105 transition-transform">
               {lang === 'fr' ? 'Ajouter au pack' : 'Add to pack'}
             </button>
           </div>
           <div className="relative group">
             <div className="absolute -inset-4 bg-[#D97706]/20 rounded-[40px] blur-2xl group-hover:bg-[#D97706]/30 transition-all"></div>
             <img src={duoArgilesImg} className="rounded-3xl shadow-2xl relative z-10 w-full object-cover" alt="Argiles Duo Zeolithe Bentonite - Cure détox et protocoles systémiques Bloom by BotaniK" />
           </div>
        </div>
      </section>

      {/* JOURNAL BOTANIQUE SECTION */}
      <section id="journal" className="py-16 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 pt-2">
              <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
                {lang === 'fr' ? 'Savoir & Transmission' : 'Knowledge & Transmission'}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F261E] leading-[1.1]">
                {lang === 'fr' ? <>Le Journal Botanique : L'Art du Totum au quotidien.</> : "The Botanical Journal: The Art of Totum in daily life."}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {lang === 'fr' 
                  ? "Explorez nos dossiers approfondis sur l'herboristerie moderne, nos guides d'extraction et les dernières découvertes sur l'intelligence des plantes." 
                  : "Explore our in-depth dossiers on modern herbalism, our extraction guides and the latest discoveries on plant intelligence."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://blog.bloombybotanik.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white font-bold px-8 py-4 rounded-full transition-all group cursor-pointer"
                >
                  {lang === 'fr' ? 'Accéder au Journal' : 'Access the Journal'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => onNavigate('herbier')}
                  className="inline-flex items-center justify-center gap-3 border-2 border-[#1C3F34] text-[#1C3F34] font-bold px-8 py-4 rounded-full hover:bg-[#D97706] hover:text-white hover:border-[#D97706] active:bg-[#D97706] active:text-white transition-all cursor-pointer"
                >
                  {lang === 'fr' ? "Explorer l'Herbier" : "Explore the Herbarium"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <div className="h-64 bg-[#FAF7F2] rounded-[40px] border border-[#F3EEE6] overflow-hidden group">
                    <img src={herbsImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.seo.alt.herbs} />
                 </div>
                 <div className="p-6 bg-[#E8F1EE] rounded-[40px] border border-[#D8CBB7]">
                    <h4 className="font-black text-[#0F261E] mb-2">{lang === 'fr' ? "L'extraction du Totum" : "Totum Extraction"}</h4>
                    <p className="text-xs text-[#1C3F34]/60">{lang === 'fr' ? "Pourquoi la température change tout." : "Why temperature changes everything."}</p>
                 </div>
               </div>
               <div className="space-y-4 pt-8">
                 <div className="p-6 bg-[#F3EEE6] rounded-[40px] border border-[#E7DFD3]">
                    <h4 className="font-black text-[#0F261E] mb-2">{lang === 'fr' ? "Souveraineté Santé" : "Health Sovereignty"}</h4>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? "L'autonomie par la connaissance." : "Autonomy through knowledge."}</p>
                 </div>
                 <div className="h-64 bg-[#FAF7F2] rounded-[40px] border border-[#F3EEE6] overflow-hidden group">
                    <img src={shelvesImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.seo.alt.lab} />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="py-24 bg-[#0F261E] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D97706] to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
              {currentT.footerCTA.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">{currentT.footerCTA.title}</h2>
            <p className="text-xl text-[#E8F1EE]/80 leading-relaxed">
              {currentT.footerCTA.subtitle}
            </p>
            <p className="text-lg text-[#E8F1EE]/60 italic leading-relaxed">
              {currentT.footerCTA.italic}
            </p>
          </div>

          <div className="pt-12 border-t border-white/10 text-center flex flex-col items-center">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-4">Engagement & Transparence</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[40px] space-y-6">
            <p className="text-sm text-[#E8F1EE]/70 leading-relaxed max-w-2xl mx-auto italic">
              "{currentT.footerCTA.quote}"
            </p>
            <div className="pt-6">
              <button 
                onClick={() => selectPackage('solo', 239)}
                className="inline-flex items-center justify-center gap-3 bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white font-black text-xl px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl cursor-pointer"
              >
                {currentT.footerCTA.btn}
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 pt-2 mb-10">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
              {lang === 'fr' ? "Le Dilemme de l'Herboristerie Maison" : (lang === 'de' ? "Dilemma der Hausapotheke" : "Home Herbalism Dilemma")}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F261E] leading-tight">
              {lang === 'fr' ? "Pour celles et ceux qui ne font plus confiance aux étiquettes industrielles ni aux macérations approximatives." : (lang === 'de' ? "Für diejenigen, die industriellen Etiketten und ungefähren Mazerationen nicht mehr vertrauen." : "For those who no longer trust industrial labels or approximate macerations.")}
            </h2>
          </div>

          <div className="overflow-hidden rounded-[40px] border border-[#F3EEE6] shadow-2xl">
            <div className="bg-[#1C3F34] text-white p-8 text-center">
              <h3 className="text-2xl font-black text-white flex items-center justify-center gap-3">
                <Check className="w-8 h-8 text-[#D97706]" />
                {currentT.whyBloomLab.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
              <div className="p-10 border-r border-[#F3EEE6] bg-red-50/20 text-left">
                <h4 className="text-red-600 font-black uppercase tracking-[0.2em] text-xs mb-8 text-center">{currentT.whyBloomLab.without.title}</h4>
                <ul className="space-y-6">
                  {currentT.whyBloomLab.without.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-slate-600 leading-relaxed">
                      <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 bg-[#E8F1EE]/30 text-left">
                <h4 className="text-[#1C3F34] font-black uppercase tracking-[0.2em] text-xs mb-8 text-center">{currentT.whyBloomLab.with.title}</h4>
                <ul className="space-y-6">
                  {currentT.whyBloomLab.with.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-slate-900 font-bold leading-relaxed">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <NewsletterSection lang={lang} />
      
      <section id="faq" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center pt-2 mb-16">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
               {lang === 'fr' ? 'Questions Fréquentes' : 'Frequent Questions'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E]">{currentT.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {currentT.faq.items.map((item, i) => (
              <div key={i} className="border border-[#F3EEE6] rounded-3xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left font-bold flex justify-between">
                   {item.q}
                   {openFaq === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFaq === i && <div className="p-6 pt-0 text-slate-600 border-t border-[#F3EEE6]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION COMMANDE */}
      <section id="commande" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center pt-2 mb-16">
            <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7] mb-8">
              {lang === 'fr' ? 'Économisez 50€' : lang === 'de' ? '50€ Sparen' : 'Save €50'}
            </div>
            <h2 className="text-3xl font-black text-[#0F261E]">{lang === 'fr' ? 'Choisissez votre configuration BloomLab®' : 'Choose your BloomLab® configuration'}</h2>
            <p className="text-slate-600">{lang === 'fr' ? 'Expédition prioritaire sous 24/48h & paiement sécurisé SSL.' : 'Priority shipping within 24/48h & SSL secure payment.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF7F2] p-8 md:p-10 rounded-[40px] md:rounded-[48px] border border-[#F3EEE6] space-y-8 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-[#0F261E]">BloomLab® Solo</h3>
                <p className="text-[13px] md:text-base text-slate-500 font-medium">{lang === 'fr' ? 'L\'essentiel pour commencer.' : 'The essentials to get started.'}</p>
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <div className="text-3xl md:text-4xl font-black text-[#0F261E]">239€</div>
                <div className="text-lg md:text-xl text-slate-400 line-through">289€</div>
                <span className="text-xs font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 px-2.5 py-0.5 rounded-full">code: Rentrée 2026</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-emerald-600" /> {lang === 'fr' ? 'Machine BloomLab® v2' : 'BloomLab® v2 Machine'}</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-emerald-600" /> {lang === 'fr' ? 'Guide Digital 100 recettes' : '100 recipes Digital Guide'}</li>
              </ul>
              <button onClick={() => selectPackage('solo', 239)} className="w-full py-5 rounded-full bg-[#E7DFD3] text-[#0F261E] font-black text-lg hover:bg-[#D8CBB7] transition-colors">{lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}</button>
            </div>

            <div className="bg-[#1C3F34] p-10 rounded-[48px] text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D97706] text-white text-[10px] font-black px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
                {lang === 'fr' ? 'Plus Populaire' : 'Most Popular'}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Pack Signature</h3>
                <p className="text-white/60 font-medium">{lang === 'fr' ? 'Le protocole complet de terrain.' : 'The complete terrain protocol.'}</p>
              </div>
              <div className="text-4xl font-black">289€ <span className="text-lg opacity-50 line-through ml-2">349€</span></div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#D97706]" /> {lang === 'fr' ? 'Machine BloomLab® v2' : 'BloomLab® v2 Machine'}</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#D97706]" /> {lang === 'fr' ? 'Duo Argiles' : 'Clay Duo'}</li>
              </ul>
              <button onClick={() => selectPackage('master', 289)} className="w-full py-5 rounded-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white font-black text-lg transition-colors shadow-lg cursor-pointer">{lang === 'fr' ? 'Commander le Pack' : 'Order the Pack'}</button>
            </div>
          </div>

          {/* Logos de paiement sécurisés exclusivement dans le bloc offre final */}
          <div className="pt-8 border-t border-[#F3EEE6] flex flex-col items-center justify-center space-y-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {lang === 'fr' ? 'Paiement 100% Sécurisé & Chiffré SSL' : lang === 'de' ? '100% Sichere & SSL-verschlüsselte Zahlung' : '100% Secure & SSL Encrypted Payment'}
            </span>
            <PaymentBadges />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col justify-between">
               <div className="space-y-8">
                 <div className="flex justify-between items-center border-b pb-4">
                   <h3 className="text-xl font-black uppercase tracking-tighter">Mon Panier</h3>
                   <button onClick={() => setIsCartOpen(false)}><X /></button>
                 </div>
                 <div className="bg-[#FAF7F2] p-6 rounded-3xl border flex justify-between items-center">
                    <div>
                      <div className="font-bold">{cartItem.title}</div>
                      <div className="text-xs opacity-50">BloomLab® Precision Extractor</div>
                    </div>
                    <div className="font-black text-xl">{cartItem.price}€</div>
                 </div>
               </div>
               <button onClick={() => onNavigate('checkout')} className="w-full bg-[#0F261E] hover:bg-[#D97706] active:bg-[#D97706] text-white py-6 rounded-full font-black text-xl cursor-pointer">Procéder au Paiement</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
