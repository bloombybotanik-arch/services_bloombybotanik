/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ShoppingBag, BookOpen, FlaskConical, Menu, X, ChevronRight, Leaf, ShieldCheck, SearchCheck, Award } from 'lucide-react';

// --- SEO & DATA UTILS ---
const POST_TITLE = "L'Élévation de l'Extraction : vers le Totum absolu";
const MAIN_KEYWORDS = "extraction totum, laboratoire botanique, souveraineté santé";

// Generates dynamic ALT text (mimicking the requested PHP script)
const generateSeoAlt = (imageContext: string) => {
  return `${POST_TITLE} - ${imageContext} - ${MAIN_KEYWORDS}`;
};

// JSON-LD Injection Component
const SEOMetadata = () => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": "BloomLab",
          "description": "Extracteur Inox 304 avec précision ±0,5°C",
          "brand": {
            "@type": "Brand",
            "name": "Bloom by BotaniK"
          },
          "offers": {
            "@type": "Offer",
            "price": "329.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "Service",
          "name": "Le Laboratoire - Extraction Déléguée",
          "description": "Nous réalisons votre Totum sur-mesure sous contrat de traçabilité signé.",
          "provider": {
            "@type": "Organization",
            "name": "Bloom by BotaniK"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

const CertificationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const certs = [
    { icon: Leaf, text: "Certifié BIO" },
    { icon: ShieldCheck, text: "Zéro Métaux Lourds" },
    { icon: SearchCheck, text: "Traçabilité 100%" },
    { icon: Award, text: "Garantie Haute Pureté" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-white/5 rounded-xl border border-white/10">
      {certs.map((cert, index) => {
        const Icon = cert.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-2 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute z-0'
            }`}
          >
            <Icon className="w-5 h-5 text-white mb-1" />
            <span className="text-[10px] uppercase tracking-widest text-[#F5F3EB] font-semibold text-center leading-tight">
              {cert.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- COMPONENTS ---

const NavigationSidebar = ({ className = "" }: { className?: string }) => (
  <aside className={`w-80 h-screen fixed sticky top-0 bg-[#293228] p-8 flex flex-col justify-between ${className}`}>
    <div>
      <div className="flex items-center gap-4 mb-12">
        <img src="/logo.png" alt="Logo Bloom by BotaniK" className="w-10 h-10 object-contain" />
        <span className="font-bold text-lg leading-tight uppercase tracking-widest text-white">
          Bloom by<br />BotaniK
        </span>
      </div>

      <nav className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-6 font-semibold">Sommaire</h3>
        <ul className="space-y-4 text-sm font-medium">
          <li><a href="#rituel" className="text-white hover:text-[#b9b9b9] transition-colors">I. La Voie du Rituel</a></li>
          <li><a href="#science" className="text-white hover:text-[#b9b9b9] transition-colors">II. Science du Totum</a></li>
          <li><a href="#alternative" className="text-white hover:text-[#b9b9b9] transition-colors">III. Alternative Souveraine</a></li>
          <li><a href="#choix" className="text-white hover:text-[#b9b9b9] transition-colors">IV. Le Choix</a></li>
        </ul>
      </nav>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F3EB] mb-4 font-semibold">Accès Rapide</h3>
        <a href="#" className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#b9b9b9] transition-colors group">
          <ShoppingBag className="w-4 h-4 group-hover:text-[#b9b9b9] transition-colors" /> Boutique (BloomLab)
        </a>
        <a href="#" className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#b9b9b9] transition-colors group">
          <FlaskConical className="w-4 h-4 group-hover:text-[#b9b9b9] transition-colors" /> Le Protocole
        </a>
        <a href="#" className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#b9b9b9] transition-colors group">
          <Leaf className="w-4 h-4 group-hover:text-[#b9b9b9] transition-colors" /> L'Herbier
        </a>
      </div>
    </div>

    {/* Product Reassurance Image - Restored per request */}
    <div className="mt-8 rounded-xl overflow-hidden relative group">
      {/* Note pour Hostinger : Utiliser /assets/images/IMG_9472.jpg */}
      <img 
        src="https://images.unsplash.com/photo-1585241936939-07ba3e827eae?q=80&w=400" 
        alt={generateSeoAlt("Machine BloomLab")} 
        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
    </div>
  </aside>
);

const MobileBottomBar = () => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-botanik-bg border-t border-[#1B3022]/10 p-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(27,48,34,0.05)]">
    <a href="#" className="flex flex-col items-center gap-1 text-botanik-green hover:text-botanik-orange">
      <Menu className="w-5 h-5" />
      <span className="text-[10px] uppercase font-semibold">Sommaire</span>
    </a>
    <a href="#" className="flex flex-col items-center gap-1 text-botanik-green hover:text-botanik-orange">
      <ShoppingBag className="w-5 h-5" />
      <span className="text-[10px] uppercase font-semibold">Boutique</span>
    </a>
    <a href="#" className="flex flex-col items-center gap-1 text-botanik-magenta relative">
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-botanik-magenta animate-pulse" />
      <FlaskConical className="w-5 h-5" />
      <span className="text-[10px] uppercase font-semibold">Labo</span>
    </a>
  </div>
);

const HybridOffer = () => (
  <section id="choix" className="my-24 scroll-mt-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-light mb-4 font-sans text-botanik-green tracking-[0.05em]">Le Choix de Souveraineté</h2>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">Deux voies d'excellence pour atteindre le Totum. Laquelle résonne avec votre essence ?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
      {/* GAUCHE : L'Unité (Autonomie) */}
      <div className="bg-white border border-botanik-green/10 rounded-2xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-xs font-bold uppercase tracking-widest rounded-full mb-6">Autonomie</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4">Maîtrisez votre autonomie</h3>
          <p className="text-lg opacity-80 mb-6 leading-relaxed">Devenez l'artisan de votre propre bien-être. Reprenez le pouvoir sur chaque étape de l'extraction.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Précision thermique absolue <strong className="font-semibold text-botanik-orange">±0,5°C</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Conception clinique en <strong>Inox 304</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Liberté d'expérimentation totale</span></li>
          </ul>
        </div>
        <div>
          <div className="text-3xl font-bold mb-6">329 €</div>
          <button className="w-full py-4 px-6 bg-botanik-green text-white rounded-lg font-semibold hover:bg-botanik-green/90 transition-colors flex items-center justify-center gap-2 group">
            Acquérir ma BloomLab
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* DROITE : Le Laboratoire (Délégation en MAGENTA) */}
      <div className="bg-white border-2 border-botanik-magenta rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(118,14,43,0.12)] hover:shadow-[0_8px_40px_rgba(118,14,43,0.2)] transition-shadow duration-300 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-botanik-magenta/5 rounded-bl-full -z-10" />
        
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-magenta text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative z-10">Service Premium</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4 text-botanik-magenta">Déléguez votre extraction</h3>
          <p className="text-lg mb-6 leading-relaxed font-medium text-gray-800">Nous réalisons votre Totum sur-mesure sous contrat de traçabilité signé.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Expertise biochimique d'<strong>Élio</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Protocoles de laboratoire certifiés</span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Pureté garantie, effort nul</span></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-botanik-magenta/80 mb-4 font-medium uppercase tracking-wide">Sur devis & disponibilité</p>
          <button className="w-full py-4 px-6 bg-botanik-magenta text-white rounded-lg font-semibold hover:bg-[#5a0b21] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(118,14,43,0.39)] group">
            Solliciter le Laboratoire
            <FlaskConical className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="flex relative min-h-screen">
      <SEOMetadata />
      
      {/* Desktop Sidebar */}
      <NavigationSidebar className="hidden lg:flex" />

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:max-w-[calc(100vw-20rem)] pb-24 lg:pb-0">
        <article className="max-w-[800px] mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24">
          
          {/* Hero Section */}
          <header className="mb-16 md:mb-24">
            
            <div className="flex gap-4 text-sm font-medium text-botanik-green/60 mb-6 uppercase tracking-widest flex-wrap">
              <span>Botanique Experte</span>
              <span>•</span>
              <time>17 Avril 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>

            <h1 className="leading-[1.1] tracking-tight text-botanik-green mb-8">
              <span className="block text-[40px] md:text-[54px] font-bold mb-2">
                L'Élévation de l'Extraction :
              </span>
              <span className="block text-[40px] md:text-[54px] text-botanik-green/80 font-bold">
                Vers le Totum Absolu
              </span>
            </h1>
            
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(27,48,34,0.1)] relative bg-[#F9F9F7]">
              {/* Note pour Hostinger : Replacer src="/hero.jpg" en production avec ta vraie image */}
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1920&auto=format&fit=crop" 
                alt={generateSeoAlt("Laboratoire botanique et extraction souveraine")} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </header>

          {/* Article Content - Elite Reading Comfort */}
          <div className="prose prose-lg max-w-none text-[20px] leading-[1.7] text-botanik-green space-y-12">
            
            <section id="rituel" className="scroll-mt-24">
              <h2 className="text-3xl font-medium tracking-wide mb-6">I. La Voie du Rituel</h2>
              <p>
                Dans le silence de l'atelier, la matière végétale attend patiemment son éveil. Extraire n'est pas une simple manipulation chimique ; c'est un acte de transmission. C’est écouter la plante, la respecter dans son intégrité, et lui offrir un espace où elle peut révéler la totalité de ses principes actifs.
              </p>
              <p>
                La plupart des méthodes industrielles sacrifient cette intégrité sur l'autel du rendement. Elles isolent, segmentent et détruisent l'équilibre naturel. Chez Bloom by BotaniK, nous refusons ce compromis. La voie du rituel, c'est le respect absolu de la matrice végétale.
              </p>

              {/* Bloc d'interruption : Protocole Associé */}
              <div className="bg-botanik-green p-8 rounded-2xl my-16 text-white shadow-lg border border-white/10 relative overflow-hidden group not-prose">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-botanik-green/50 bg-[#F5F3EB] inline-block px-3 py-1 rounded-full mb-4">
                      Protocole Associé
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Monographie de l'Achillée Millefeuille</h3>
                    <p className="text-white/80 max-w-md text-base leading-relaxed">Découvrez les constantes d'extraction optimales et les profils terpéniques de cette sélection.</p>
                  </div>
                  <div>
                    <a href="#" className="inline-flex flex-shrink-0 items-center gap-2 bg-white text-botanik-green px-6 py-3 rounded-lg font-semibold hover:bg-[#F5F3EB] transition-colors">
                      Consulter la Fiche <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section id="science" className="scroll-mt-24">
              <h2 className="text-3xl font-medium tracking-wide mb-6">II. La Science du Totum</h2>
              <p>
                Pourquoi utiliser une molécule isolée quand la nature nous offre une synergie parfaite ? Le <strong>Totum végétal</strong> représente l'ensemble cohérent et indivisible des composés d'une plante. La recherche biochimique moderne confirme ce que l'herboristerie ancienne savait d'intuition : les composés agissent de concert, se potentialisent, et annulent leurs toxicités respectives.
              </p>
              <blockquote className="border-l-4 border-botanik-green/20 pl-6 my-8 italic text-2xl font-light text-botanik-green/80">
                "La somme des parties du végétal est infiniment plus puissante, plus subtile et plus sage qu'une fraction isolée dans l'urgence."
              </blockquote>
              <p>
                Pour capturer ce Totum sans l'altérer, la maîtrise thermique doit être clinique. Une variation d'un degré peut dénaturer des terpènes volatils essentiels. C'est ici que la technologie rencontre la nature.
              </p>
            </section>

            <section id="alternative" className="scroll-mt-24">
              <h2 className="text-3xl font-medium tracking-wide mb-6">III. L'Alternative Souveraine</h2>
              <p>
                S'émanciper des solutions standardisées nécessite des outils à la hauteur de nos ambitions. Nous avons développé la technologie nécessaire pour que chacun, dans son propre espace, puisse extraire cette quintessence avec une rigueur de laboratoire.
              </p>
              <div className="bg-botanik-green/5 p-8 rounded-2xl my-8">
                <p className="font-semibold text-botanik-green m-0">
                  L'extraction devient souveraine. Ce n'est plus un produit que vous consommez, c'est un élixir que vous co-créez avec rigueur et conscience.
                </p>
              </div>
            </section>

          </div>

          {/* The Commercial Pivot */}
          <HybridOffer />

        </article>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomBar />
    </div>
  );
}
