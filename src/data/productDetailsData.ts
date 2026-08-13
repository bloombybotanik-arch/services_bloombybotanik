import { Language } from '../translations';
import { Thermometer, Timer, RefreshCw, FlaskConical, Leaf, ShieldCheck, Info, Award, ShoppingBag, ChefHat } from 'lucide-react';
import bloomLabImg from '../assets/images/bloomlab_main_1784887530345.jpeg';
import duoArgilesImg from '../assets/images/product_duo_argiles.jpg';
import trioPouchesImg from '../assets/images/product_trio_pouches.jpg';
import feuArticulaireImg from '../assets/images/product_feu_articulaire.jpg';
import nuitProfondeImg from '../assets/images/product_nuit_profonde.jpg';
import seveFondamentaleImg from '../assets/images/product_seve_fondamentale.jpg';
import digestionImg from '../assets/images/product_digestion.jpeg';
import img2 from '../assets/images/2-1.png';
import img3 from '../assets/images/3-1.png';
import img4 from '../assets/images/4-1.png';
import img5 from '../assets/images/5-1.png';
import img6 from '../assets/images/6-1.png';

export const getProductSheets = (lang: Language): Record<string, any> => {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  return {
    'bloomlab': (() => {
      const now = new Date();
      const isPromoActive = now >= new Date('2026-09-01') && now < new Date('2027-01-01');
      const bloomLabPrice = isPromoActive ? 239 : 289;
      
      return {
        name: "BloomLab®",
        subtitle: isFR ? "SOUVERAINETÉ SANTÉ — ÉDITION 2026" : isDE ? "GESUNDHEITSSOUVERÄNITÄT — EDITION 2026" : "HEALTH SOVEREIGNTY — 2026 EDITION",
        price: bloomLabPrice,
        originalPrice: isPromoActive ? 289 : null,
        images: [bloomLabImg, img2, img3, img4, img5, img6],
        description: isFR 
          ? "L'extracteur botanique de précision n°1 en France. Capable d'extraire le Totum intégral des plantes avec une précision thermique absolue (±0,5°C)."
          : isDE 
          ? "Der botanische Präzisionsextraktor Nr. 1 in Frankreich. In der Lage, das integrale Totum von Pflanzen mit absoluter thermischer Präzision (±0,5°C) zu extrahieren."
          : "The #1 precision botanical extractor. Capable of extracting the integral Totum of plants with absolute thermal precision (±0.5°C).",
        fullDescription: isFR ? `
          <div class="prose prose-botanik max-w-none">
            <p class="text-lg mb-8">La BloomLab est la première machine 6-en-1 grand public capable de réaliser à domicile des extractions botaniques complexes — huiles infusées, sérums, teintures, macérats — avec un contrôle de paramètres (temps, température, séquençage) habituellement réservé aux laboratoires professionnels.</p>
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Température PID</h4>
                <p class="text-sm">Maintien à ±0,5°C pour protéger les actifs fragiles.</p>
              </div>
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Agitation Totum</h4>
                <p class="text-sm">Extraction mécanique douce pour libérer les molécules.</p>
              </div>
              <div class="bg-[#1B3022]/5 p-6 rounded-2xl">
                <h4 class="font-bold text-[#F97316] mb-2">Inox 304</h4>
                <p class="text-sm">Matériaux grade alimentaire sans BPA ni phtalates.</p>
              </div>
            </div>
          </div>
        ` : `
          <div class="prose prose-botanik max-w-none">
            <p class="text-lg mb-8">${isDE ? "BloomLab ist das erste 6-in-1-Gerät..." : "BloomLab is the first 6-in-1 device..."}</p>
          </div>
        `,
        specs: [
          { label: isFR ? "Contrôle" : "Control", value: "0 °C à 121 °C", icon: Thermometer },
          { label: isFR ? "Matériau" : "Material", value: "Inox 304 Certifié", icon: FlaskConical },
          { label: isFR ? "Garantie" : "Guarantee", value: "1 An Bloom", icon: ShieldCheck }
        ]
      };
    })(),
    'bundle-apothicaire': {
      name: isFR ? "L'Herbier Complet — Pack Rentrée 2026" : isDE ? "Das vollständige Herbarium — Paket Rente 2026" : "Complete Herbarium — 2026 Back-to-School Pack",
      subtitle: isFR ? "TOUS LES REMÈDES + DUO ARGILES" : isDE ? "ALLE HEILMITTEL + ERDEN-DUO" : "ALL REMEDIES + CLAYS DUO",
      price: 59,
      originalPrice: 87.50,
      images: [trioPouchesImg, duoArgilesImg, seveFondamentaleImg],
      description: isFR 
        ? "L'offre la plus irrésistible de la rentrée. Regroupe l'intégralité de nos mélanges de plantes et le Duo Argiles Renaissance pour un reset total."
        : "The most irresistible offer of the season. Includes all our plant blends and the Renaissance Clays Duo for a total reset.",
      fullDescription: isFR ? `
        <div class="prose prose-botanik max-w-none">
          <p class="text-lg mb-8">Ce pack exclusif regroupe l'expertise botanique de Bloom dans une offre unique pour la rentrée 2026.</p>
          <h3 class="text-xl font-bold mb-4">Contenu de l'offre :</h3>
          <ul class="space-y-2 mb-8">
            <li>• <strong>Duo Renaissance :</strong> Zéolithe & Plantes drainantes</li>
            <li>• <strong>Kit Sève Fondamentale :</strong> Vitalité et Structure</li>
            <li>• <strong>Kit Nuit Profonde :</strong> Sommeil et Ancrage</li>
            <li>• <strong>Kit Confort Digestif :</strong> Équilibre intestinal</li>
            <li>• <strong>Kit Feu Articulaire :</strong> Souplesse et Mobilité</li>
          </ul>
        </div>
      ` : `<div class="prose prose-botanik max-w-none"><p>The complete collection...</p></div>`,
      specs: [
        { label: isFR ? "Économie" : "Savings", value: "28,50€", icon: Award },
        { label: isFR ? "Contenu" : "Content", value: "5 Kits", icon: Leaf }
      ]
    },
    'pack-signature': {
      name: "Pack Signature — BloomLab + Kit Démarrage",
      subtitle: isFR ? "IDÉAL POUR DÉBUTER" : "IDEAL FOR BEGINNERS",
      price: 319,
      originalPrice: 349,
      images: [bloomLabImg, seveFondamentaleImg],
      description: "Everything you need to start.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Signature Solution...</p></div>`,
      specs: [
        { label: "Savings", value: "30€", icon: Award }
      ]
    },
    'kit-starter': {
      name: "Kit de Démarrage — Sève Fondamentale",
      subtitle: "VITALITÉ",
      price: 12.90,
      images: [seveFondamentaleImg],
      description: "Ideal for first extractions.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Fundamental Sap...</p></div>`,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-nuit': {
      name: "Remède Nuit Profonde",
      subtitle: "SOMMEIL",
      price: 9.90,
      images: [nuitProfondeImg],
      description: "Sleep blend.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Night protocol...</p></div>`,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-digestion': {
      name: "Remède Confort Digestif",
      subtitle: "DIGESTION",
      price: 9.90,
      images: [digestionImg],
      description: "Digestive comfort.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Digestion protocol...</p></div>`,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-articulaire': {
      name: "Remède Feu Articulaire",
      subtitle: "MOBILITÉ",
      price: 9.90,
      images: [feuArticulaireImg],
      description: "Joint fire.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Joint protocol...</p></div>`,
      specs: [{ label: "Format", value: "50g", icon: Leaf }]
    },
    'kit-reset': {
      name: "Duo RESET Renaissance",
      subtitle: "DÉTOX",
      price: 44.90,
      originalPrice: 49.00,
      images: [duoArgilesImg],
      description: "Zeolite and plants.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Reset protocol...</p></div>`,
      specs: [{ label: "Grade", value: "Pharma", icon: ShieldCheck }]
    },
    'freemium-access': {
      name: "Accès Découverte",
      subtitle: "FREE",
      price: 0,
      images: [img5],
      description: "10 Free Recipes.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Free recipes...</p></div>`,
      specs: [{ label: "Type", value: "Digital", icon: Info }]
    },
    'premium-access': {
      name: "Abonnement Premium",
      subtitle: "FULL",
      price: 9,
      images: [img6],
      description: "All access.",
      fullDescription: `<div class="prose prose-botanik max-w-none"><p>Full access...</p></div>`,
      specs: [{ label: "Type", value: "Digital", icon: Info }]
    }
  };
};
