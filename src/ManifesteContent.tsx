import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Leaf, Activity, FlaskConical, HeartPulse } from 'lucide-react';
import { translations, Language } from './translations';

interface ManifesteContentProps {
  onBack: () => void;
  lang: Language;
}

export default function ManifesteContent({ onBack, lang }: ManifesteContentProps) {
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
            {lang === 'fr' ? 'Retour' : 'Back'}
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-botanik-orange">
            {lang === 'fr' ? 'Manifeste' : 'Manifesto'}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-12 leading-tight tracking-tight">
            Bloom by BotaniK : plantes, préparations botaniques et extraction maîtrisée
          </h1>
          <p className="text-2xl md:text-3xl text-botanik-orange font-bold leading-tight mb-12">
            Le corps ne vous trahit pas. Il vous informe.
          </p>
          <div className="space-y-6 text-lg text-botanik-green/80 leading-relaxed">
            <p>Nous vivons souvent avec l’idée que notre corps devrait fonctionner sans bruit, sans fatigue, sans tension et sans déséquilibre.</p>
            <p>Lorsqu’un inconfort apparaît, nous cherchons rapidement à le faire disparaître. Nous oublions parfois de nous demander ce qu’il peut nous apprendre sur nos rythmes, nos habitudes et notre environnement.</p>
            <p>Chez Bloom by BotaniK, nous choisissons une autre posture : écouter avant d’interpréter, comprendre avant d’agir, préparer avec méthode plutôt que chercher des solutions instantanées.</p>
            <p>Nous ne considérons pas le corps comme une machine défaillante. Nous le considérons comme un système vivant, complexe et en interaction permanente avec son environnement.</p>
          </div>
        </motion.header>

        <div className="space-y-16 prose prose-botanik max-w-none">
          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">Pourquoi Bloom by BotaniK existe</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>Bloom est né d’une conviction simple : prendre soin de soi ne devrait pas se limiter à acheter un produit et à suivre une promesse.</p>
              <p>Nous voulons rendre les pratiques botaniques plus compréhensibles, plus accessibles et plus régulières.</p>
              <p>Pendant des générations, les plantes ont été choisies, préparées et transmises dans les foyers. Aujourd’hui, beaucoup de personnes souhaitent renouer avec cette relation, mais ne savent plus toujours quelle plante utiliser, quelle méthode choisir, combien de temps préparer ou comment conserver le résultat.</p>
              <p>Entre la tradition parfois difficile à décoder et la technologie souvent déconnectée du vivant, il manquait un lien.</p>
              <p className="font-bold text-botanik-green">Bloom by BotaniK construit ce lien.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">Notre vision de la botanique moderne</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>Nous imaginons un quotidien où chacun peut :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>mieux comprendre les plantes qu’il utilise ;</li>
                <li>distinguer les usages traditionnels des faits établis ;</li>
                <li>préparer avec des méthodes claires ;</li>
                <li>documenter ses expériences ;</li>
                <li>choisir ses outils avec discernement ;</li>
                <li>développer une relation plus consciente à son environnement ;</li>
                <li>savoir aussi quand l’avis d’un professionnel est nécessaire.</li>
              </ul>
              <p>Notre vision n’est pas celle d’une autonomie absolue ou d’un refus de la médecine. Elle repose sur une autonomie éclairée : être capable d’apprendre, de choisir et d’agir sans renoncer à la prudence.</p>
              
              <h3 className="text-xl font-bold text-botanik-green mt-8 mb-4">Une troisième voie</h3>
              <p>Bloom by BotaniK se situe à la rencontre de deux héritages.</p>
              <p>Le premier est celui des savoirs botaniques : l’observation, la transmission, la saisonnalité, le respect des plantes et la connaissance des usages.</p>
              <p>Le second est celui des méthodes contemporaines : la précision, la traçabilité, la reproductibilité, la qualité des matériaux et la documentation.</p>
              <p>Nous ne voulons ni idéaliser le passé ni croire que la technologie suffit à tout résoudre.</p>
              <p>Nous construisons une troisième voie : une botanique moderne, exigeante et accessible, qui associe la richesse du végétal à des outils conçus pour mieux préparer.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">De la plante à la préparation</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>Une plante n’est pas un ingrédient interchangeable.</p>
              <p>Son espèce, sa partie utilisée, son origine, son mode de culture, son séchage, sa conservation et sa préparation influencent son caractère et son usage.</p>
              <p>Nous parlons de <strong>totum végétal</strong> pour désigner cette complexité : une plante considérée dans son ensemble, avec ses différents constituants et leurs interactions possibles, plutôt que réduite à un seul composant isolé.</p>
              <p>Cette approche ne signifie pas que toutes les substances sont extraites dans chaque préparation, ni qu’une plante produit automatiquement un effet déterminé.</p>
              <p>Elle invite à davantage de respect, de précision et d’humilité.</p>
              
              <h3 className="text-xl font-bold text-botanik-green mt-8 mb-4">Notre méthode : comprendre, préparer, observer</h3>
              <p>Bloom repose sur une méthode en trois temps.</p>
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-botanik-orange">Comprendre</h4>
                  <p className="text-sm">Avant d’utiliser une plante, il faut savoir ce que l’on prépare. Nous expliquons les différences entre infusion, décoction, macération et autres méthodes.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-botanik-orange">Préparer</h4>
                  <p className="text-sm">L’extraction est déterminante. Temps, température, agitation, support. BloomLab aide à encadrer ces paramètres.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-botanik-orange">Observer</h4>
                  <p className="text-sm">Il est important de noter ce qui a été utilisé et comment. Cette culture de l’observation permet de progresser.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">BloomLab : un outil pour préparer avec méthode</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>BloomLab est plus qu’un appareil qui chauffe.</p>
              <p>C’est un outil domestique conçu pour accompagner les personnes qui souhaitent préparer leurs plantes avec davantage de méthode.</p>
              <p>BloomLab aide à encadrer : le temps, la température, l’agitation, la répétition d’un protocole et la documentation d’une préparation.</p>
              <p>BloomLab ne remplace pas un professionnel de santé. Elle ne transforme pas une préparation botanique en médicament et ne garantit pas l’extraction de chaque constituant d’une plante.</p>
              <p>Sa valeur est ailleurs : elle aide à passer de l’approximation à une pratique plus maîtrisée.</p>
              
              <h3 className="text-xl font-bold text-botanik-green mt-8 mb-4">Un écosystème, pas un catalogue</h3>
              <p>Bloom ne se résume pas à une machine. Notre projet réunit plusieurs éléments complémentaires : BloomLab, les kits botaniques, les recettes, l’Herbier, la bibliothèque et le contenu éditorial.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">Pour qui construisons-nous Bloom ?</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>Bloom s’adresse aux personnes qui souhaitent reprendre une place active dans leurs habitudes de bien-être, sans chercher une solution miracle.</p>
              <p>À celles et ceux qui aiment comprendre, souhaitent retrouver un lien avec les plantes, veulent préparer avec régularité et recherchent des outils exigeants.</p>
              <p>Bloom s’adresse aussi aux débutants. Il n’est pas nécessaire d’être herboriste pour commencer. Il faut surtout être curieux, attentif et prêt à apprendre.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-botanik-green mb-6">Notre exigence et nos limites</h2>
            <div className="space-y-4 text-lg text-botanik-green/80 leading-relaxed">
              <p>Le vivant mérite mieux que des slogans. Notre exigence repose sur des engagements concrets : identifier les plantes, expliquer les méthodes, distinguer les faits des usages traditionnels, ne pas exagérer les résultats.</p>
              <p><strong>Notre responsabilité :</strong> Les produits Bloom by BotaniK ne sont pas des médicaments. Ils ne sont pas destinés à diagnostiquer, traiter ou guérir une maladie. Les informations proposées sont pédagogiques et ne remplacent pas l’avis d’un professionnel de santé.</p>
            </div>
          </section>

          <section className="bg-botanik-green text-white p-10 rounded-[40px] mt-12">
            <h3 className="text-2xl font-black mb-6">Faites fleurir votre pratique</h3>
            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Mieux comprendre ce que l’on prépare, c’est déjà commencer à mieux prendre soin de soi. BloomLab apporte la précision du geste. Les plantes apportent leur richesse.
            </p>
            <p className="font-bold text-xl">
              Bloom by BotaniK<br/>
              <span className="font-normal text-base opacity-70 italic">Une botanique moderne, entre savoirs transmis et précision contemporaine.</span>
            </p>
          </section>
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-[#1B3022] py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black mb-10">Rejoindre la démarche Bloom</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onBack()}
              className="px-10 py-5 bg-botanik-orange text-white rounded-full font-bold hover:bg-[#F97316] transition-all shadow-xl"
            >
              Découvrir la BloomLab
            </button>
            <button 
              onClick={() => onBack()}
              className="px-10 py-5 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Explorer l'Herbier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
