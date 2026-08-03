import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Leaf, Activity, FlaskConical, HeartPulse } from 'lucide-react';

interface ManifesteContentProps {
  onBack: () => void;
}

export default function ManifesteContent({ onBack }: ManifesteContentProps) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1B3022]">
      {/* Navigation Sticky */}
      <div className="sticky top-0 z-30 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-botanik-green/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-botanik-green/40 hover:text-botanik-green transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-botanik-orange">
            Manifeste Bloom
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Intro Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 md:mb-32"
        >
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
            Conviction Fondatrice
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-botanik-green mb-12 leading-[0.9] tracking-tighter">
            Votre corps n'est pas cassé.<br/>
            <span className="text-botanik-orange">Il est verrouillé.</span>
          </h1>
          <div className="text-lg md:text-2xl text-botanik-green/70 leading-relaxed font-light italic border-l-4 border-botanik-orange pl-8 py-4">
            "Bloom by BotaniK est né d’une conviction simple : le corps n’est pas une somme de symptômes isolés, mais un système vivant qui parle, compense, sature et cherche en permanence à retrouver son équilibre."
          </div>
        </motion.header>

        {/* Content Flow */}
        <div className="space-y-32">
          {/* Section 1: La Troisième Voie */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">La Troisième Voie</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-6">
              <p>
                Quand un déséquilibre apparaît, notre rôle n’est pas seulement de regarder ce qui se voit, mais de comprendre ce qui, en profondeur, a désorganisé le terrain.
              </p>
              <p>
                Notre point de vue est celui d’une <strong>troisième voie</strong>. Ni opposition stérile à la médecine conventionnelle, ni retour à une herboristerie approximative détachée de la physiologie moderne.
              </p>
              <div className="p-8 bg-[#F5F3EB] rounded-3xl border border-botanik-green/5 my-8">
                <p className="text-base italic">
                  Bloom relie les sciences empiriques des sagesses anciennes, qui ont observé le vivant pendant des siècles, et les découvertes modernes en biochimie, microbiome, rythmes biologiques, inflammation, fascia, neurobiologie et épigénétique.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Comprendre le Signal */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">Comprendre le Signal</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-6">
              <p>
                Nous partons d’une idée fondatrice : l’inflammation chronique n’est pas forcément une erreur du corps, mais souvent un signal d’alarme face à une surcharge allostatique, toxique, émotionnelle, environnementale ou métabolique.
              </p>
              <p className="text-2xl text-botanik-green font-medium leading-tight">
                Là où beaucoup cherchent à faire taire le signal, Bloom cherche d’abord à comprendre pourquoi le corps crie, puis à restaurer les conditions dans lesquelles son autorégulation peut à nouveau émerger.
              </p>
            </div>
          </section>

          {/* Section 3: L'Intelligence de l'Extraction */}
          <section className="bg-botanik-green text-white p-12 md:p-20 rounded-[60px] -mx-4 md:-mx-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Leaf className="w-64 h-64 rotate-12" />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <Quote className="w-12 h-12 text-botanik-orange mb-8 opacity-50" />
              <h2 className="text-2xl md:text-5xl font-bold mb-12">L'exigence de la molécule.</h2>
              <div className="text-base md:text-xl text-white/80 leading-relaxed space-y-8">
                <p>
                  Chez Bloom, une plante n’est pas qu’un ingrédient. Tout dépend de ce qu’on en extrait réellement. Une plante mal extraite, extraite trop chaud, trop vite, avec le mauvais solvant ou dans le mauvais ordre, ne libère pas la même richesse moléculaire et ne produit pas la même qualité d’expérience.
                </p>
                <p className="p-8 border border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm">
                  C’est pourquoi notre démarche ne repose pas seulement sur le choix des plantes, mais sur une méthodologie d’extraction botanique séquencée pensée pour respecter la nature biochimique de leurs principes actifs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: BloomLab & Séquençage Actif */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">L'Outil de Précision</h2>
            </div>
            <div className="lg:col-span-8 text-lg text-botanik-green/80 leading-relaxed space-y-8">
              <p>
                C’est là qu’intervient BloomLab. BloomLab n’est pas un accessoire ; c’est l’outil technologique qui rend possible une extraction plus juste, plus stable et plus exigeante. Notre méthode de <strong>Séquençage Actif A/B</strong> a été conçue pour répondre à une réalité simple : toutes les familles moléculaires d’une plante ne s’extraient ni avec les mêmes solvants, ni aux mêmes températures, ni sur les mêmes durées.
              </p>
              
              <div className="space-y-6 mt-12">
                <div className="p-8 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-botanik-green text-white rounded-2xl flex items-center justify-center font-bold mb-6 text-xl shadow-lg">A</div>
                  <h4 className="text-xl font-bold text-botanik-green mb-4">Première Phase : Hydroglycérinée</h4>
                  <p className="text-base text-botanik-green/70 leading-relaxed">
                    Cette phase travaille les fondations hydrosolubles, avec des paramètres précis de température, de solvant et de temps pour extraire notamment les polysaccharides, saponines, iridoïdes, minéraux et autres composés compatibles avec cette fenêtre technique.
                  </p>
                </div>
                <div className="p-8 bg-[#F9F9F7] rounded-[40px] border border-botanik-green/5 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-botanik-orange text-white rounded-2xl flex items-center justify-center font-bold mb-6 text-xl shadow-lg">B</div>
                  <h4 className="text-xl font-bold text-botanik-green mb-4">Seconde Phase : Hydroalcoolique</h4>
                  <p className="text-base text-botanik-green/70 leading-relaxed">
                    Menée après refroidissement et dans une plage thermique plus basse, elle vise les composés plus thermolabiles et liposolubles comme certains terpènes, curcuminoïdes, flavonoïdes fragiles ou résines spécifiques.
                  </p>
                </div>
              </div>

              <p className="p-6 bg-botanik-orange/5 rounded-2xl text-sm text-botanik-green/60 italic border-l-4 border-botanik-orange">
                Ce séquençage n’est pas cosmétique : l’ordre, la température, le ratio des solvants, la durée et le moment d’ajout de l’alcool sont présentés dans vos documents comme des paramètres non négociables, justement parce qu’ils conditionnent le rendement, la préservation moléculaire et la qualité du totum final.
              </p>
            </div>
          </section>

          {/* Section 5: Distinguer Bloom */}
          <section className="bg-botanik-green/5 p-12 md:p-20 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <FlaskConical className="w-[500px] h-[500px]" />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-botanik-green mb-10">L'Exigence qui nous distingue.</h2>
              <div className="text-base md:text-lg text-botanik-green/80 leading-relaxed space-y-6">
                <p>
                  Beaucoup de produits parlent de plantes. Peu travaillent réellement la question décisive : comment obtenir, chez l’utilisateur, une extraction pertinente du spectre actif de la plante, au lieu d’une simple infusion approximative ou d’une extraction unique qui sous-extrait certaines familles moléculaires et en dégrade d’autres.
                </p>
                <p>
                  Bloom ajoute donc un chaînon manquant entre la plante brute et l’usage réel : une méthode, un protocole, un séquençage, un outil et une pédagogie pour transformer la puissance botanique en expérience plus cohérente et potentiellement plus utile.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Architecture vs Produits */}
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-botanik-green sticky top-24 uppercase tracking-wider">Une Architecture</h2>
            </div>
            <div className="lg:col-span-8 text-base md:text-lg text-botanik-green/80 leading-relaxed space-y-8">
              <p>
                Notre service consiste précisément à relier ces niveaux. Bloom propose un cadre de compréhension du terrain, des protocoles structurés, des séquences d’action, des contenus pédagogiques et des outils d’extraction conçus pour guider l’utilisateur dans un ordre logique.
              </p>
              <p className="text-xl md:text-2xl text-botanik-green font-bold leading-tight">
                Nous n’ajoutons pas une solution de plus au bruit du marché ; nous apportons une architecture là où beaucoup ne proposent que des produits isolés.
              </p>
            </div>
          </section>

          {/* Section 7: Conclusion / Mission */}
          <section className="text-center py-20">
            <div className="inline-flex p-6 bg-botanik-orange/5 rounded-full mb-12 animate-pulse">
              <Activity className="w-16 h-16 text-botanik-orange" />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-botanik-green mb-12 tracking-tight">Relier les Savoirs.</h2>
            <div className="max-w-3xl mx-auto text-base md:text-lg text-botanik-green/70 space-y-8 leading-relaxed">
              <p>
                Nous défendons une idée simple : on n’obtient pas de vrais résultats durables avec des gestes dispersés, des actifs mal extraits ou des protocoles sans hiérarchie. Il faut comprendre le terrain, ouvrir les bonnes voies, respecter le rythme du corps, choisir les bonnes plantes, puis surtout les extraire selon les paramètres qui permettent d’en libérer les principes actifs avec rigueur.
              </p>
              <div className="p-12 bg-botanik-green text-white rounded-[40px] shadow-2xl">
                <p className="text-xl md:text-3xl font-bold leading-tight">
                  Bloom by BotaniK, c’est cela : une méthode de restauration du terrain, une lecture systémique du vivant, et une technologie botanique pensée pour faire le lien entre les savoirs anciens, la biochimie moderne et les usages concrets d’aujourd’hui.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-[#1B3022] py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-botanik-orange text-[10px] font-black uppercase tracking-[0.4em] mb-8 block">Continuer l'Exploration</span>
          <h3 className="text-3xl md:text-6xl font-bold mb-12">Le voyage ne fait que commencer.</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={onBack}
              className="px-12 py-6 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-[#F97316] transition-all shadow-xl inline-flex items-center gap-3 group text-lg"
            >
              Retour à l'écosystème <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
