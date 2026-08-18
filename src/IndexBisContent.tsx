import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ShoppingCart
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

// Register ChartJS components
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

import bloomImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import labImg from './assets/images/Gemini_Generated_Image_r0bctrr0bctrr0bc.png';
import herbsImg from './assets/images/herbs_close_up_cleaned_1786616800877.jpg';
import lifestyleImg from './assets/images/home_lab_vibe_cleaned_1786616854146.jpg';
import duoArgilesImg from './assets/images/product_duo_argiles.jpg';
import bloomSoinsImg from './assets/images/Bloom_Soins.jpg';
import cosmetiqueImg from './assets/images/bloom_logo_final_1784886077159.png';

interface IndexBisContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
}

type HeroType = 'culinaire' | 'cosmetique' | 'sante';
type UniverseType = 'culinaire' | 'cosmetique' | 'phytotherapie';

const translationsIndexBis = {
  fr: {
    marquee: ["🇫🇷 Marque Française Botanique", "🚚 Expédition Prioritaire sous 24/48h", "🛡️ Satisfait ou Remboursé 30 Jours", "⚡ Garantie Constructeur 1 An"],
    hero: {
      badge: "N°1 France — Édition Limitée 2026 : Thermorégulation MTC 2.0",
      title: "L'extracteur botanique qui révèle le <span class='text-[#D97706]'>totum</span> de vos plantes.",
      subtitle: "<strong>BloomLab® : L'infuseur botanique de précision.</strong> Un seul appareil pour l'extraction du totum à basse température : huiles culinaires, soins cosmétiques et remèdes de plantes.",
      rating: "Une conception dédiée à l’extraction botanique de précision.",
      buyBtn: "Acheter la BloomLab® — 239€ <span class='line-through opacity-60 ml-2'>289€</span> offre rentrée",
      installment: "Paiement en 3x sans frais par Klarna",
      installmentSub: "Soit 79,66€ / mois",
      guarantee: "Testez 30 jours sans risque",
      shipping: "Expédié sous 24/48h",
      features: [
        { title: "Acier Inoxydable", sub: "Qualité alimentaire", icon: Microscope },
        { title: "Température contrôlée", sub: "Zéro Surchauffe", icon: Thermometer },
        { title: "Multi-Solvants", sub: "Eau, Huile, Alcool", icon: Droplets }
      ]
    },
    selector: {
      label: "Mode d'extraction rapide :",
      modes: {
        culinaire: { label: "Culinaire", desc: "🌿 <strong>Mode Culinaire :</strong> Extraction douce d'huiles aromatiques & beurres botaniques sans amertume à 38°C." },
        cosmetique: { label: "Cosmétique", desc: "🌸 <strong>Mode Cosmétique :</strong> Formulation de sérums visage purs et baumes régénérants à 42°C." },
        sante: { label: "Phytothérapie", desc: "🧪 <strong>Mode Phytothérapie :</strong> Teintures-mères et extraits concentrés de résines/racines à 45°C." }
      }
    },
    whyBloomLab: {
      title: "Pourquoi la BloomLab change votre quotidien",
      without: {
        title: "Sans la BloomLab",
        items: [
          "Vous dépendez de l'industrie pour vos soins.",
          "Vous perdez 80% des bienfaits de vos plantes.",
          "Vous accumulez des produits coûteux et complexes."
        ]
      },
      with: {
        title: "Avec la BloomLab",
        items: [
          "Vous créez vos propres remèdes, 100% transparents.",
          "Vous extrayez jusqu'à 98% de leurs actifs.",
          "Une seule machine pour trois univers de soin."
        ]
      }
    },
    universes: {
      title: "Une Seule Machine. Trois Univers de soin Souverain au Quotidien.",
      subtitle_part1: "La BloomLab est l'alternative concrète que vous attendiez : une machine qui transforme vos plantes en soins actifs, sans chimie, sans déchets, sans dépendance. En 2026, il ne s'agit plus seulement de consommer, mais de (re)devenir acteur de sa santé. Et ça commence par la bonne extraction.",
      subtitle_part2: "🔬 L'Extraction Précise, Clé de l'Efficacité\nAvec les méthodes traditionnelles (infusion, bain-marie, macération), vous perdez jusqu'à 80% des principes actifs de vos plantes. Ils restent prisonniers des fibres.",
      subtitle_part3: "La BloomLab change la donne. Grâce au contrôle millimétré de la température, du temps et de l'agitation, elle libère jusqu'à 98% du totum végétal – l'intégralité du spectre d'action de la plante. C'est la différence entre une \"tisane améliorée\" et un véritable élixir de soin.",
      tabs: { culinaire: "Culinaire", cosmetique: "Cosmétique", phytotherapie: "Phytothérapie" },
      descriptions: {
        culinaire: "1. La Santé Digestive : Les plantes amères (gentiane, artichaut) sont des alliées précieuses. Avec l'extraction de précision, vous récupérez toute leur puissance amère et cholagogue.",
        cosmetique: "2. La Beauté Naturelle : Les huiles de soin (calendula, arnica) infusées à basse température préservent leurs propriétés émollientes et régénérantes. Sans conservateurs.",
        phytotherapie: "3. Le Bien-Être Global : Les plantes dépuratives (pissenlit, bardane) extraites selon le protocole optimal soutiennent votre vitalité sans agresser votre corps."
      },
      data: {
        culinaire: {
          title: "Atelier Culinaire & Gastronomie Botanique",
          badge: "Savoir-Faire Gourmand & Santé",
          image: herbsImg,
          description: "Transformez vos aromates et plantes fraîches en beurres parfumés, huiles d'olive infusées et élixirs gastronomiques sans jamais développer d'amertume.",
          exampleTitle: "Huile d'Olive Infusée au Romarin, Piment & Ail",
          temp: "38°C", time: "1h 30m", solvent: "Huile d'Olive",
          benefits: ["Zéro amertume par thermorégulation douce", "Conservation prolongée des arômes", "Sublime vos plats sains du quotidien"]
        },
        cosmetique: {
          title: "Formulation Cosmétique de Grade Laboratoire",
          badge: "Haute Performance Cutanée",
          image: bloomSoinsImg,
          description: "Concevez vous-même vos propres sérums visage, macérats précieux et baumes régénérants sur-mesure sans aucun conservateur synthétique.",
          exampleTitle: "Sérum Précieux Passiflore, Rose & Jojoba",
          temp: "42°C", time: "2h 00m", solvent: "Huile de Jojoba",
          benefits: ["Pénétration cutanée profonde des actifs", "Sans allergènes synthétiques ni parabènes", "Texture veloutée non grasse"]
        },
        phytotherapie: {
          title: "Remèdes Phytothérapeutiques & MTC 2.0",
          badge: "Rééquilibrage du Terrain",
          image: lifestyleImg,
          description: "Créez vos teintures-mères, décoctions d'écorces et extraits concentrés de résines pour traiter le terrain biologique global.",
          exampleTitle: "Extrait Concentré de Boswellia & Girofle",
          temp: "45°C", time: "3h 00m", solvent: "Alcool 60°",
          benefits: ["Capture intégrale du Totum moléculaire", "Assimilation cellulaire instantanée", "Protocoles testés 100% sécurisés"]
        }
      }
    },
    footerCTA: {
      badge: "Engagement Souverain",
      title: "La Souveraineté Sanitaire Commence Ici",
      subtitle: "Avec la BloomLab, vous ne vous contentez plus de \"consommer\" des soins. Vous les créez – en toute autonomie, avec la rigueur d'un laboratoire et la sagesse ancestrale des plantes médicinales. Notre mission est de vous redonner le pouvoir sur votre pharmacie naturelle en vous fournissant l'outil ultime d'extraction.",
      italic: "C'est une alternative réelle, concrète et accessible pour soutenir votre corps au quotidien, en respectant son rythme et ses besoins profonds.",
      quote: "Jusqu'à 98% des principes actifs sont préservés et extraits grâce à la maîtrise millimétrique du temps, de la température et de l'agitation. Un rendement optimal qui fait de la BloomLab une alternative crédible, durable et efficace aux méthodes traditionnelles d'herboristerie souvent trop approximatives.",
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
      badge: "2026 Limited Edition: MTC 2.0 Thermoregulation",
      title: "The Botanical Extractor that releases the <span class='text-[#D97706] underline underline-offset-8 decoration-[#D97706]/30'>pure Totum</span> of your plants.",
      subtitle: "<strong>Say goodbye to the chore of approximate bain-marie.</strong> A single precision device to easily prepare your Culinary oils, Cosmetic Skincare, and Health Remedies at home.",
      rating: "A design dedicated to precision botanical extraction.",
      buyBtn: "Buy the BloomLab® — €239",
      installment: "3x interest-free payment by Klarna",
      installmentSub: "Or €79.66 / month",
      guarantee: "Test risk-free for 30 days",
      shipping: "Shipped within 24/48h",
      features: [
        { title: "Stainless Steel", sub: "Food Grade", icon: Microscope },
        { title: "Controlled Temperature", sub: "Zero Overheating", icon: Thermometer },
        { title: "Multi-Solvents", sub: "Water, Oil, Alcohol", icon: Droplets }
      ]
    },
    selector: {
      label: "Fast extraction mode:",
      modes: {
        culinaire: { label: "Culinary", desc: "🌿 <strong>Culinary Mode:</strong> Gentle extraction of aromatic oils & botanical butters without bitterness at 38°C." },
        cosmetique: { label: "Cosmetic", desc: "🌸 <strong>Cosmetic Mode:</strong> Formulation of pure face serums and regenerating balms at 42°C." },
        sante: { label: "Phytotherapy", desc: "🧪 <strong>Phytotherapy Mode:</strong> Mother tinctures and concentrated resin/root extracts at 45°C." }
      }
    },
    whyBloomLab: {
      title: "Why BloomLab changes your daily life",
      without: {
        title: "Without BloomLab",
        items: [
          "You depend on industry for your care.",
          "You lose 80% of your plants' benefits.",
          "You accumulate expensive and complex products."
        ]
      },
      with: {
        title: "With BloomLab",
        items: [
          "You create your own 100% transparent remedies.",
          "You extract up to 98% of their active ingredients.",
          "One single machine for three worlds of care."
        ]
      }
    },
    universes: {
      title: "One single machine. Three universes of sovereign care every day.",
      subtitle_part1: "The BloomLab is the concrete alternative you've been waiting for: a machine that transforms your plants into active treatments, without chemistry, without waste, without dependence. In 2026, it is no longer just about consuming, but about (re)becoming an actor in your own health. And it starts with the right extraction.",
      subtitle_part2: "🔬 Precise Extraction, the Key to Efficacy\nWith traditional methods (infusion, bain-marie, maceration), you lose up to 80% of your plants' active principles. They remain trapped in the fibers.",
      subtitle_part3: "The BloomLab changes the game. Thanks to the millimetric control of temperature, time, and agitation, it releases up to 98% of the plant totum – the entire spectrum of action of the plant. This is the difference between an 'improved herbal tea' and a true elixir of care.",
      tabs: { culinaire: "Culinary", cosmetique: "Cosmetic", phytotherapie: "Phytotherapy" },
      descriptions: {
        culinaire: "1. Digestive Health: Bitter plants (gentian, artichoke) are precious allies. With precision extraction, you recover all their bitter and cholagogue power.",
        cosmetique: "2. Natural Beauty: Care oils (calendula, arnica) infused at low temperature preserve their emollient and regenerating properties. Without preservatives.",
        phytotherapie: "3. Global Well-being: Depurative plants (dandelion, burdock) extracted according to the optimal protocol support your vitality without agressing your body."
      },
      data: {
        culinaire: {
          title: "Culinary Atelier & Botanical Gastronomy",
          badge: "Gourmet & Health Know-How",
          image: herbsImg,
          description: "Transform your herbs and fresh plants into scented butters, infused olive oils, and gastronomic elixirs without ever developing bitterness.",
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
          benefits: ["Deep skin penetration of actives", "Without synthetic allergens or parabens", "Non-greasy velvety texture"]
        },
        phytotherapie: {
          title: "Phytotherapeutic Remedies & MTC 2.0",
          badge: "Terrain Rebalancing",
          image: lifestyleImg,
          description: "Create your mother tinctures, bark decoctions, and concentrated resin extracts to treat the global biological terrain.",
          exampleTitle: "Concentrated Boswellia & Clove Extract",
          temp: "45°C", time: "3h 00m", solvent: "60° Alcohol",
          benefits: ["Integral capture of the molecular Totum", "Instant cellular assimilation", "100% secure tested protocols"]
        }
      }
    },
    footerCTA: {
      badge: "Sovereign Commitment",
      title: "Health Sovereignty Starts Here",
      subtitle: "With BloomLab, you no longer just \"consume\" care. You create it – in total autonomy, with laboratory rigor and the ancestral wisdom of medicinal plants. Our mission is to give you back power over your natural pharmacy by providing the ultimate extraction tool.",
      italic: "It is a real, concrete, and accessible alternative to support your body daily, respecting its rhythm and deep needs.",
      quote: "Up to 98% of active principles are preserved and extracted thanks to the millimetric control of time, temperature and agitation. An optimal yield that makes BloomLab a credible, sustainable and effective alternative to traditional herbal methods that are often too approximate.",
      btn: "👉 Discover BloomLab – Payment in 3x interest-free",
      noteTitle: "Applied Technical & Biological Note",
      totumNote: "*The <strong>Totum</strong> of a plant represents all of its active principles acting in synergy. Unlike industry's isolated molecules, the Totum respects the biological complexity of life and avoids the side effects associated with chemical isolation. Its precision extraction at low temperature guarantees optimal bioavailability for the human organism. By mastering thermoregulation, BloomLab® prevents the degradation of sensitive enzymes and vitamins, thus promoting a deep and lasting rebalancing of the biological terrain. It is the guarantee of a living, vibrant and fully active care for your microbiome and your global health."
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
      badge: "Limitierte Auflage 2026: TCM 2.0 Thermoregulation",
      title: "Der botanische Extraktor, der das <span class='text-[#D97706] underline underline-offset-8 decoration-[#D97706]/30'>reine Totum</span> Ihrer Pflanzen freisetzt.",
      subtitle: "<strong>Verabschieden Sie sich von der mühsamen Arbeit des ungefähren Wasserbads.</strong> Ein einziges Präzisionsgerät, um Ihre kulinarischen Öle, kosmetischen Hautpflegeprodukte und Heilmittel ganz einfach zu Hause zuzubereiten.",
      rating: "Ein Design für die präzise botanische Extraktion.",
      buyBtn: "BloomLab® kaufen — 239 €",
      installment: "Zahlung in 3 zinsfreien Raten von Klarna",
      installmentSub: "Oder 79,66 € / Monat",
      guarantee: "30 Tage risikofrei testen",
      shipping: "Versand innerhalb von 24/48h",
      features: [
        { title: "Edelstahl", sub: "Lebensmittelqualität", icon: Microscope },
        { title: "Kontrollierte Temperatur", sub: "Keine Überhitzung", icon: Thermometer },
        { title: "Multi-Lösungsmittel", sub: "Wasser, Öl, Alkohol", icon: Droplets }
      ]
    },
    selector: {
      label: "Schnellextraktionsmodus:",
      modes: {
        culinaire: { label: "Kulinarisch", desc: "🌿 <strong>Kulinarischer Modus:</strong> Sanfte Extraktion von Aromaölen und botanischen Buttern ohne Bitterkeit bei 38°C." },
        cosmetique: { label: "Kosmetisch", desc: "🌸 <strong>Kosmetischer Modus:</strong> Formulierung von reinen Gesichtsseren und regenerierenden Balsamen bei 42°C." },
        sante: { label: "Phytotherapie", desc: "🧪 <strong>Phytotherapie-Modus:</strong> Urtinkturen und konzentrierte Harz-/Wurzelextrakte bei 45°C." }
      }
    },
    whyBloomLab: {
      title: "Warum die BloomLab Ihren Alltag verändert",
      without: {
        title: "Ohne BloomLab",
        items: [
          "Sie sind für Ihre Pflege von der Industrie abhängig.",
          "Sie verlieren 80 % der Vorteile Ihrer Pflanzen.",
          "Sie häufen teure und komplexe Produkte an."
        ]
      },
      with: {
        title: "Mit BloomLab",
        items: [
          "Sie kreieren Ihre eigenen, 100 % transparenten Heilmittel.",
          "Sie extrahieren bis zu 98 % ihrer Wirkstoffe.",
          "Eine einzige Maschine für drei Welten der Pflege."
        ]
      }
    },
    universes: {
      title: "Eine einzige Maschine. Drei Universen souveräner Pflege jeden Tag.",
      subtitle_part1: "Die BloomLab ist die konkrete Alternative, auf die Sie gewartet haben: eine Maschine, die Ihre Pflanzen in aktive Heilmittel verwandelt – ohne Chemie, ohne Abfall, ohne Abhängigkeit. Im Jahr 2026 geht es nicht mehr nur um Konsum, sondern darum, wieder zum Akteur der eigenen Gesundheit zu werden. Und das beginnt mit der richtigen Extraktion.",
      subtitle_part2: "🔬 Präzise Extraktion, der Schlüssel zur Wirksamkeit\nBei herkömmlichen Methoden (Infusion, Wasserbad, Mazeration) verlieren Sie bis zu 80 % der Wirkstoffe Ihrer Pflanzen. Sie bleiben in den Fasern gefangen.",
      subtitle_part3: "Die BloomLab ändert alles. Dank der millimetergenauen Kontrolle von Temperatur, Zeit und Rühren setzt sie bis zu 98 % des pflanzlichen Totums frei – das gesamte Wirkungsspektrum der Pflanze. Das ist der Unterschied zwischen einem „verbesserten Kräutertee“ und einem echten Pflegeelixier.",
      tabs: { culinaire: "Kulinarisch", cosmetique: "Kosmetisch", phytotherapie: "Phytotherapie" },
      descriptions: {
        culinaire: "1. Verdauungsgesundheit: Bitterpflanzen (Enzian, Artischocke) sind wertvolle Verbündete. Mit der Präzisionsextraktion gewinnen Sie ihre volle Bitter- und Cholerika-Kraft zurück.",
        cosmetique: "2. Natürliche Schönheit: Pflegeöle (Ringelblume, Arnika), die bei niedriger Temperatur infundiert werden, bewahren ihre weichmachenden und regenerierenden Eigenschaften. Ohne Konservierungsstoffe.",
        phytotherapie: "3. Globales Wohlbefinden: Reinigungspflanzen (Löwenzahn, Klette), die nach dem optimalen Protokoll extrahiert werden, unterstützen Ihre Vitalität, ohne Ihren Körper zu belasten."
      },
      data: {
        culinaire: {
          title: "Kulinarisches Atelier & Botanische Gastronomie",
          badge: "Gourmet- & Gesundheits-Know-how",
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
          benefits: ["Tiefe Hautpenetration der Wirkstoffe", "Ohne synthetische Allergene oder Parabene", "Samtige, nicht fettende Textur"]
        },
        phytotherapie: {
          title: "Phytotherapeutische Heilmittel & TCM 2.0",
          badge: "Terrain-Rebalancing",
          image: lifestyleImg,
          description: "Erstellen Sie Ihre Urtinkturen, Rindendekokte und konzentrierten Harzextrakte zur Behandlung des globalen biologischen Terrains.",
          exampleTitle: "Konzentrierter Boswellia- & Nelkenextrakt",
          temp: "45°C", time: "3h 00m", solvent: "60° Alkohol",
          benefits: ["Integrale Erfassung des molekularen Totums", "Sofortige zelluläre Assimilation", "100% sicher getestete Protokolle"]
        }
      }
    },
    footerCTA: {
      badge: "Souveränes Engagement",
      title: "Sanitäre Souveränität beginnt hier",
      subtitle: "Mit der BloomLab konsumieren Sie Pflegeprodukte nicht mehr nur. Sie kreieren sie – in völliger Autonomie, mit Laborstrenge und der uralten Weisheit der Heilpflanzen. Unsere Mission ist es, Ihnen die Macht über Ihre natürliche Apotheke zurückzugeben, indem wir Ihnen das ultimative Extraktionswerkzeug zur Verfügung stellen.",
      italic: "Es ist eine reale, konkrete und zugängliche Alternative, um Ihren Körper täglich zu unterstützen und dabei seinen Rhythmus und seine tiefen Bedürfnisse zu respektieren.",
      quote: "Bis zu 98 % der Wirkstoffe werden dank der millimetergenauen Kontrolle von Zeit, Temperatur und Rührung erhalten und extrahiert. Ein optimaler Ertrag, der BloomLab zu einer glaubwürdigen, nachhaltigen und effektiven Alternative zu herkömmlichen Kräutermethoden macht, die oft zu ungenau sind.",
      btn: "👉 BloomLab entdecken – Zahlung in 3x zinsfreien Raten",
      noteTitle: "Angewandte technische und biologische Anmerkung",
      totumNote: "*Das <strong>Totum</strong> einer Pflanze stellt die Gesamtheit ihrer Wirkstoffe dar, die synergetisch wirken. Im Gegensatz zu den isolierten Molekülen der Industrie respektiert das Totum die biologische Komplexität des Lebens und vermeidet die mit chemischer Isolation verbundenen Nebenwirkungen. Seine Präzisionsextraktion bei niedriger Temperatur garantiert eine optimale Bioverfügbarkeit für den menschlichen Organismus. Durch die Beherrschung der Thermoregulation verhindert BloomLab® den Abbau empfindlicher Enzyme und Vitamine und fördert so eine tiefe und dauerhafte Neuausrichtung des biologischen Terrains. Es ist die Garantie für eine lebendige, vitale und voll aktive Pflege für Ihr Mikrobiom und Ihre globale Gesundheit."
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

export default function IndexBisContent({ onNavigate, lang = 'fr' }: IndexBisContentProps) {
  const [activeHeroType, setActiveHeroType] = useState<HeroType>('culinaire');
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('culinaire');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState({ title: "Pack Signature Rentrée — BloomLab® + Duo Argiles", price: 289 });

  const currentT = translationsIndexBis[lang as keyof typeof translationsIndexBis] || translationsIndexBis.fr;

  const marqueeItems = currentT.marquee;

  const selectPackage = (type: 'solo' | 'master', price: number) => {
    setCartItem({
      title: type === 'solo' ? (lang === 'fr' ? "Coffret BloomLab® Solo — Rentrée 2026" : "BloomLab® Solo Set") : (lang === 'fr' ? "Pack Signature Rentrée — BloomLab® + Duo Argiles" : "Signature Back-to-School Pack"),
      price: price
    });
    setIsCartOpen(true);
  };

  const chartData = {
    labels: ['10 min', '30 min', '60 min', '120 min', '180 min'],
    datasets: [
      {
        label: lang === 'fr' ? 'BloomLab® (Thermorégulation 40°C)' : 'BloomLab® (Thermoregulation 40°C)',
        data: [45, 78, 92, 98, 99],
        borderColor: '#1C3F34',
        backgroundColor: 'rgba(28, 63, 52, 0.08)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      },
      {
        label: lang === 'fr' ? 'Bain-Marie Classique (~65°C)' : 'Classic Bain-Marie (~65°C)',
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
        labels: {
          color: '#0F261E',
          font: { size: 12, weight: 'bold' as const }
        }
      }
    },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#52635B' } },
      y: { min: 0, max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#52635B', callback: (val: any) => val + '%' } }
    }
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

      {/* MOBILE ONLY TOP HERO SECTION */}
      <section className="lg:hidden relative bg-[#0F261E] overflow-hidden">
        <div className="flex flex-col">
          <div className="relative h-[600px]">
            <img 
              src={bloomImg} 
              alt="BloomLab" 
              className="w-full h-full object-cover brightness-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F261E]/40 via-transparent to-[#0F261E]/60 pb-10" />
            <div className="absolute inset-0 flex flex-col p-6">
              <div className="flex flex-col space-y-1.5 mt-2 max-w-[90%]">
                <div className="inline-block self-start px-3 py-1.5 border border-[#1C3F34] rounded-md text-white bg-[#0F261E] text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                  {lang === 'fr' ? 'N°1 EN FRANCE · ÉDITION LIMITÉE 2026' : (lang === 'de' ? 'NR. 1 IN FRANKREICH · LIMITIERTE AUSGABE 2026' : 'No. 1 IN FRANCE · LIMITED EDITION 2026')}
                </div>
                <div className="inline-block self-start px-3 py-1.5 border border-[#D97706] rounded-md text-white bg-[#D97706] text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                  {lang === 'fr' ? 'THERMORÉGULATION INTELLIGENTE' : (lang === 'de' ? 'INTELLIGENTE THERMOREGULATION' : 'INTELLIGENT THERMOREGULATION')}
                </div>
                <h2 
                  className="text-[28px] xs:text-[32px] sm:text-[36px] font-black text-white leading-[1.1] tracking-tighter mt-2 drop-shadow-md" 
                  style={{ width: '90%' }}
                  dangerouslySetInnerHTML={{ __html: currentT.hero.title }} 
                />
              </div>
              
              <div className="mt-auto pb-4">
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[11px] font-bold text-white uppercase tracking-widest bg-black/20 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/10">
                  <span className="whitespace-nowrap">{lang === 'fr' ? 'CULINAIRE' : (lang === 'de' ? 'KULINARISCH' : 'CULINARY')}</span>
                  <span className="text-[#D97706]">·</span>
                  <span className="whitespace-nowrap">{lang === 'fr' ? 'COSMÉTIQUE' : (lang === 'de' ? 'KOSMETISCH' : 'COSMETIC')}</span>
                  <span className="text-[#D97706]">·</span>
                  <span className="whitespace-nowrap">{lang === 'fr' ? 'PHYTO-THÉRAPEUTIQUE' : (lang === 'de' ? 'PHYTO-THERAPEUTISCH' : 'PHYTO-THERAPEUTIC')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="hidden lg:flex flex-wrap gap-2 mb-4">
                  <div className="inline-block px-3 py-1 bg-[#1C3F34] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                    N°1 EN FRANCE
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#D97706] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                    {lang === 'fr' ? 'THERMORÉGULATION INTELLIGENTE' : 'INTELLIGENT THERMOREGULATION'}
                  </div>
                </div>
                <h1 className="hidden lg:block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F261E] leading-[1.1] tracking-tighter" dangerouslySetInnerHTML={{ __html: currentT.hero.title }} />

                {lang === 'fr' && (
                  <div className="space-y-4 pt-4 border-l-4 border-[#D97706] pl-6 bg-[#D97706]/5 py-4 rounded-r-2xl">
                    <h3 className="text-xl font-bold text-[#D97706]">"Vos plantes ont un trésor caché. La BloomLab le révèle."</h3>
                    <p className="text-base text-slate-700 leading-relaxed">
                      Une simple infusion ne libère que 20% des bienfaits d'une plante. L'extraction de précision BloomLab libère 98% de son <strong>Totum*</strong> – l'intégralité de ses actifs synergiques.
                    </p>
                    <p className="text-base text-slate-700 leading-relaxed">
                      Résultat : des remèdes et soins maison d'une efficacité inégalée, comme si vous aviez un laboratoire dans votre cuisine.
                    </p>
                    <p className="text-base font-black text-[#0F261E]">
                      La souveraineté sanitaire commence par la bonne extraction.
                    </p>
                    <div className="mt-4 p-4 bg-white/50 rounded-xl border border-[#D97706]/20 text-xs text-slate-600 leading-relaxed italic">
                      <span className="font-bold text-[#0F261E] block mb-1">Note Technique & Biologique :</span>
                      Le Totum d'une plante représente l'intégralité de ses principes actifs agissant en synergie. Contrairement aux molécules isolées de l'industrie, le Totum respecte la complexité biologique du vivant. Son extraction de précision garantit une biodisponibilité optimale pour l'organisme humain, favorisant un rééquilibrage profond et durable du terrain sans les effets secondaires des extractions incomplètes ou surchauffées.
                    </div>
                  </div>
                )}

                <p className="hidden lg:block text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: currentT.hero.subtitle }} />

                <div className="flex items-center lg:items-start flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-[#1C3F34]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#0F261E]">
                      {currentT.hero.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 mt-12">
                <div className="grid grid-cols-3 gap-1 pb-8 border-b border-[#F3EEE6]">
                  {currentT.hero.features.map((f, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white border border-[#F3EEE6] text-center shadow-sm">
                      <f.icon className="w-4 h-4 text-[#1C3F34] mx-auto mb-1" />
                      <div className="text-[9px] font-black text-[#0F261E] uppercase tracking-tighter whitespace-nowrap overflow-visible leading-none">{f.title}</div>
                      <div className="text-[8px] text-slate-500 mt-1">{f.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a href="#commande" className="inline-flex items-center justify-center space-x-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-lg px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                      <FlaskConical className="w-5 h-5" />
                      <span dangerouslySetInnerHTML={{ __html: currentT.hero.buyBtn }} />
                    </a>
                    <div className="text-xs text-slate-600 bg-[#F3EEE6] p-3 rounded-2xl border border-[#E7DFD3] flex flex-col justify-center">
                      <span className="font-bold text-[#0F261E] flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-[#D97706]" /> {currentT.hero.installment}</span>
                      <span>{currentT.hero.installmentSub}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                      <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-[#1C3F34] mr-1.5" /> {currentT.hero.guarantee}</span>
                      <span className="flex items-center"><Truck className="w-4 h-4 text-[#1C3F34] mr-1.5" /> {currentT.hero.shipping}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative rounded-3xl bg-white border border-[#F3EEE6] p-6 shadow-xl flex flex-col h-full glow-subtle">
                <div className="absolute -top-3 -right-3 bg-[#D97706] text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md z-10">
                  {lang === 'fr' ? 'ÉCONOMISEZ 50€' : 'SAVE €50'}
                </div>

                <div className="flex-1 flex flex-col min-h-[550px]">
                  <div className="relative rounded-2xl overflow-hidden border border-[#F3EEE6] bg-[#F3EEE6] flex-1 group mb-6">
                    <img src={bloomImg} alt="BloomLab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F261E]/80 via-transparent to-transparent flex flex-col p-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-end items-start">
                          <span className="bg-[#1C3F34] text-white text-[10px] font-black px-3 py-1 rounded-full font-sans uppercase tracking-widest">
                            {lang === 'fr' ? 'En Stock' : 'In Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-[#0F261E] uppercase tracking-wider block">{currentT.selector.label}</label>
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
                            const el = document.getElementById('3-univers');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }} 
                          className={`px-2 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-sans transition-all text-center flex items-center justify-center whitespace-nowrap overflow-hidden ${activeHeroType === mode ? 'bg-[#1C3F34] text-white shadow-sm' : 'bg-[#F3EEE6] text-slate-700 hover:bg-[#E7DFD3]'}`}
                        >
                          <span className="truncate">{currentT.selector.modes[mode].label}</span>
                        </button>
                      ))}
                    </div>
                    <motion.div 
                      key={activeHeroType}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] sm:text-xs text-slate-700 bg-[#FAF7F2] p-3 rounded-xl border border-[#F3EEE6] min-h-[50px]"
                      dangerouslySetInnerHTML={{ __html: currentT.selector.modes[activeHeroType].desc }}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#F3EEE6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#0F261E]">239€</span>
                        <span className="text-lg text-slate-400 line-through">289€</span>
                        <span className="text-[10px] font-black text-[#D97706] uppercase tracking-wider ml-2">{lang === 'fr' ? 'Offre Rentrée' : 'Back to school'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate('commande')}
                      className="w-full py-4 bg-[#D97706] text-white rounded-xl font-black shadow-lg hover:bg-[#B45309] transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span dangerouslySetInnerHTML={{ __html: currentT.hero.buyBtn }} />
                    </button>

                    {/* Payment Logos under Buy Button */}
                    <div className="flex flex-wrap justify-center items-center gap-3 pt-2 opacity-100 transition-all">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/American_Express_logo_%282018%29.svg" alt="Amex" className="h-5" />
                      <div className="px-1.5 py-0.5 border border-slate-300 rounded-[2px] text-[8px] font-black tracking-tighter text-[#1C3F34]">KLARNA</div>
                      <div className="px-1.5 py-0.5 border border-slate-300 rounded-[2px] text-[8px] font-black tracking-tighter text-[#1C3F34]">CB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      if (tab === 'culinaire') onNavigate('atelier-culinaire');
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
                      alt={activeUniverse} 
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

      {/* SECTION SCIENCE DES SOLVANTS */}
      <section id="solvants" className="py-12 bg-white border-t border-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-4 py-2 bg-[#E8F1EE] text-[#1C3F34] text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm border border-[#D8CBB7]">
                {lang === 'fr' ? 'Ingénierie R&D' : 'Engineering R&D'}
              </div>
              <h2 className="text-3xl font-black text-[#0F261E] leading-tight mt-4">
                {lang === 'fr' ? 'La Science du Totum : À chaque plante son solvant et sa température' : 'Totum Science: To each plant its solvent and temperature'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === 'fr' ? 'Contrairement aux bains-marie génériques, la BloomLab® ajuste la synergie solvant-température pour extraire la totalité du profil phytochimique sans dénaturation.' : 'Unlike generic bain-maries, BloomLab® adjusts the solvent-temperature synergy to extract the entire phytochemical profile without denaturation.'}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: "🧪", title: lang === 'fr' ? "Résines & Graines Dures (Boswellia, Girofle)" : "Resins & Hard Seeds (Boswellia, Clove)", desc: lang === 'fr' ? "Extraction ciblée à 60° d'alcool • Protocole 45°C" : "Targeted extraction at 60° alcohol • 45°C Protocol" },
                  { icon: "🌿", title: lang === 'fr' ? "Racines & Écorces (Salsepareille, Gentiane)" : "Roots & Bark (Sarsaparilla, Gentian)", desc: lang === 'fr' ? "Extraction ciblée à 55° d'alcool • Protocole 40°C" : "Targeted extraction at 55° alcohol • 40°C Protocol" },
                  { icon: "🌸", title: lang === 'fr' ? "Fleurs & Feuilles Fragiles (Passiflore, Pensée)" : "Flowers & Fragile Leaves (Passionflower, Pansy)", desc: lang === 'fr' ? "Extraction douce à 45° d'alcool / Huile • Protocole 35°C" : "Gentle extraction at 45° alcohol / Oil • 35°C Protocol" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F3EEE6] flex items-start space-x-3.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-[#0F261E]">{item.title}</div>
                      <div className="text-xs text-slate-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center space-x-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'fr' ? 'SÉCURITÉ GARANTIE : Nos protocoles excluent à 100% l\'usage de plantes toxiques.' : 'GUARANTEED SAFETY: Our protocols 100% exclude the use of toxic plants.'}</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 md:p-8 rounded-3xl border border-[#F3EEE6] space-y-4 shadow-sm h-[450px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F261E]">{lang === 'fr' ? 'Rendement de Préservation des Principes Actifs' : 'Active Principles Preservation Yield'}</h3>
                  <p className="text-xs text-slate-500">{lang === 'fr' ? 'Comparatif de la concentration en molécules d\'intérêt au fil du temps' : 'Comparison of concentration of molecules of interest over time'}</p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#1C3F34] text-white px-3 py-1 rounded-full">R&D BloomLab</span>
              </div>
              <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

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
             <img src={duoArgilesImg} className="rounded-3xl shadow-2xl relative z-10 w-full object-cover" alt="Duo Argiles" />
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
                {lang === 'fr' ? "Le Journal Botanique : L'Art du Totum au quotidien." : "The Botanical Journal: The Art of Totum in daily life."}
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
                  className="inline-flex items-center justify-center gap-3 bg-[#1C3F34] text-white font-bold px-8 py-4 rounded-full hover:bg-[#2A5245] transition-all group"
                >
                  {lang === 'fr' ? 'Accéder au Journal' : 'Access the Journal'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => onNavigate('herbarium')}
                  className="inline-flex items-center justify-center gap-3 border-2 border-[#1C3F34] text-[#1C3F34] font-bold px-8 py-4 rounded-full hover:bg-[#1C3F34]/5 transition-all"
                >
                  {lang === 'fr' ? "Explorer l'Herbier" : "Explore the Herbarium"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <div className="h-64 bg-[#FAF7F2] rounded-[40px] border border-[#F3EEE6] overflow-hidden group">
                    <img src={herbsImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Blog 1" />
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
                    <img src={labImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Blog 2" />
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
                className="inline-flex items-center justify-center gap-3 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xl px-10 py-5 rounded-full transition-all hover:scale-105 shadow-2xl"
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
              {lang === 'fr' ? 'Offre Exclusive Web' : 'Exclusive Web Offer'}
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
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl md:text-4xl font-black text-[#0F261E]">239€</div>
                <div className="text-lg md:text-xl text-slate-400 line-through">289€</div>
                <div className="text-[10px] md:text-sm font-bold text-[#D97706] uppercase tracking-wider">{lang === 'fr' ? '(OFFRE RENTRÉE)' : '(BACK TO SCHOOL)'}</div>
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
              <button onClick={() => selectPackage('master', 289)} className="w-full py-5 rounded-full bg-[#D97706] text-white font-black text-lg hover:bg-[#B45309] transition-colors shadow-lg">{lang === 'fr' ? 'Commander le Pack' : 'Order the Pack'}</button>
            </div>
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
               <button onClick={() => onNavigate('checkout')} className="w-full bg-[#1C3F34] text-white py-6 rounded-full font-black text-xl">Procéder au Paiement</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
