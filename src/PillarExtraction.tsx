import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass } from 'lucide-react';
import { Language, translations } from './translations';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { OptimizedImage } from './components/OptimizedImage';

export default function PillarExtraction({ lang, onNavigate }: { lang: Language, onNavigate: (v: any) => void }) {
  const t = translations[lang];

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-botanik-green text-white">
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <OptimizedImage 
              src={bloomLabImg} 
              width={800}
              height={600}
              className="w-full h-full object-cover opacity-20" 
              alt="Extraction Botanique de précision avec BloomLab - Le Totum des plantes" 
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            Guide Complet de Souveraineté
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 font-sans tracking-tight leading-tight"
          >
            Extraction botanique : <br />
            <span className="text-botanik-orange">méthodes, paramètres et bonnes pratiques</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Nos équipes vous accompagnent dans votre projet de soins sur mesure.
          </motion.p>
        </div>
      </section>

      {/* Sommaire Rapide */}
      <section className="max-w-4xl mx-auto -mt-12 px-6 mb-24 relative z-20">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-botanik-green/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-green/5 flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-botanik-green" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Méthodes</h3>
              <p className="text-xs text-botanik-green/60">Eau, alcool, huile : choisir son solvant.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-orange/5 flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-5 h-5 text-botanik-orange" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Paramètres</h3>
              <p className="text-xs text-botanik-green/60">Température et durée : la précision ±0,5°C.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-magenta/5 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-botanik-magenta" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">Sécurité</h3>
              <p className="text-xs text-botanik-green/60">Dosage et conservation de vos extraits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-24">
        
        {/* Section 1: Qu'est-ce que l'extraction ? */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">01</span>
            {lang === 'fr' ? 'La Science du Totum : Révéler l\'Intelligence du Vivant' : 'The Science of Totum: Unlocking Life\'s Intelligence'}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-botanik-green/80">
            <p>
              L'extraction n'est pas une simple étape technique ; c'est un acte de traduction biochimique. La plante médicinale est un coffre-fort moléculaire dont l'intelligence est protégée par des parois cellulosiques et lignifiées extrêmement résistantes. L'infusion classique (verser de l'eau bouillante) est souvent insuffisante car elle ne propose qu'une seule clé pour une serrure complexe, tout en détruisant les éléments les plus fragiles par choc thermique.
            </p>
            <p>
              Le concept de <strong>Totum végétal</strong> est au cœur de la démarche Bloom. Contrairement à la pharmacologie moderne qui isole une molécule unique (le principe actif), nous cherchons à capturer la synergie naturelle. Pourquoi ? Parce que dans la nature, les molécules ne voyagent jamais seules : elles sont accompagnées de co-facteurs qui facilitent leur absorption, modulent leur toxicité potentielle et amplifient leur efficacité par effet de réseau.
            </p>
            <div className="bg-botanik-green/5 p-10 rounded-[32px] border border-botanik-green/10 my-12">
              <h4 className="font-black text-botanik-green mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Droplets className="w-5 h-5 text-botanik-orange" /> {lang === 'fr' ? 'La Polarité des Solvants' : 'Solvent Polarity'}
              </h4>
              <p className="mb-6 text-base italic">
                Chaque famille de molécules possède une affinité spécifique pour un milieu donné. Choisir son solvant, c'est choisir quelle partie de l'intelligence végétale vous souhaitez mobiliser.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li className="p-6 bg-white rounded-2xl border border-botanik-green/5 shadow-sm">
                  <div className="font-black text-botanik-orange mb-2 text-xs uppercase tracking-widest">Milieu Aqueux</div>
                  <p className="text-sm"><strong>L'eau :</strong> Indispensable pour les sels minéraux, les mucilages (apaisants), les tanins et les flavonoïdes hydrosolubles.</p>
                </li>
                <li className="p-6 bg-white rounded-2xl border border-botanik-green/5 shadow-sm">
                  <div className="font-black text-botanik-orange mb-2 text-xs uppercase tracking-widest">Milieu Lipidique</div>
                  <p className="text-sm"><strong>L'huile & Beurres :</strong> Capturent les terpènes (arômes), les vitamines liposolubles (A, D, E, K) et les acides gras essentiels.</p>
                </li>
                <li className="p-6 bg-white rounded-2xl border border-botanik-green/5 shadow-sm">
                  <div className="font-black text-botanik-orange mb-2 text-xs uppercase tracking-widest">Milieu Hydroalcoolique</div>
                  <p className="text-sm"><strong>L'alcool :</strong> Le solvant le plus universel, capable d'extraire les résines, les alcaloïdes et les molécules complexes.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: La Variable Thermique */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">02</span>
            {lang === 'fr' ? 'La Variable Critique : La Précision Thermique ±0,5°C' : 'The Critical Variable: ±0.5°C Thermal Precision'}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-botanik-green/80">
            <p>
              C'est ici que l'herboristerie classique rencontre ses limites technologiques. Une eau à 100°C détruit instantanément les enzymes fragiles (comme la myrosinase) et évapore les monoterpènes volatils avant même qu'ils n'aient pu infuser. À l'inverse, une macération trop froide ne parvient pas à fluidifier les lipides pour une extraction profonde des racines.
            </p>
            <p>
              Le <strong>BloomLab®</strong> introduit la notion de "fenêtres thermiques dynamiques". En maintenant une température stable au demi-degré près, nous pouvons cibler précisément le point de rupture des parois cellulaires sans atteindre le point de dénaturation des actifs. 
            </p>
            <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-3xl border-l-4 border-l-botanik-orange shadow-sm border border-botanik-green/5">
                <h4 className="text-xl font-bold text-botanik-green mb-3">La Décarboxylation</h4>
                <p className="text-sm leading-relaxed mb-4">
                  Certaines plantes nécessitent une étape d'activation thermique spécifique pour transformer les acides inactifs en molécules biodisponibles. Ce processus, appelé décarboxylation, exige une stabilité thermique rigoureuse que seul un outil de grade laboratoire peut garantir.
                </p>
                <div className="text-[10px] font-black text-botanik-orange uppercase tracking-widest">Température cible : 105°C - 120°C</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border-l-4 border-l-botanik-green shadow-sm border border-botanik-green/5">
                <h4 className="text-xl font-bold text-botanik-green mb-3">L'Extraction Totum Douce</h4>
                <p className="text-sm leading-relaxed mb-4">
                  Pour les fleurs délicates et les huiles de soin, nous privilégions la zone des 42°C. C'est la température du vivant, celle qui permet une agitation moléculaire suffisante pour l'échange sans aucune dégradation oxydative.
                </p>
                <div className="text-[10px] font-black text-botanik-green uppercase tracking-widest">Température cible : 38°C - 45°C</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Dynamique Moléculaire */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">03</span>
            {lang === 'fr' ? 'Cinétique et Cavitation : Au-delà de la chaleur' : 'Kinetics and Cavitation: Beyond Heat'}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-botanik-green/80">
            <p>
              La chaleur n'est qu'un vecteur. L'extraction efficace repose sur la cinétique. Dans un récipient statique (bol de tisane), une couche de saturation se forme rapidement autour de la plante, bloquant tout transfert supplémentaire de molécules. 
            </p>
            <p>
              BloomLab utilise un système d'agitation vortex contrôlée qui crée une micro-cavitation. Ce mouvement permanent renouvelle le solvant au contact de la matière végétale, créant un gradient de concentration optimal qui "aspire" littéralement les actifs hors de la plante. C'est ce qui permet d'atteindre des rendements proches de 98% là où une infusion classique plafonne à 5%.
            </p>
            <div className="bg-botanik-orange text-white p-10 rounded-[40px] relative overflow-hidden shadow-2xl shadow-botanik-orange/20">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight italic">
                  {lang === 'fr' ? 'Une place pour chaque plante.' : 'A place for every plant.'}
                </h3>
                <p className="text-lg opacity-90 mb-8 leading-relaxed font-medium">
                  {lang === 'fr' 
                    ? "Que vous travailliez l'écorce de cannelle, la racine de réglisse ou le pétale de rose, le BloomLab adapte sa signature thermique et cinétique pour respecter l'intégrité de votre matière première." 
                    : "Whether you work with cinnamon bark, licorice root, or rose petals, BloomLab adapts its thermal and kinetic signature to respect the integrity of your raw material."}
                </p>
                <button onClick={() => onNavigate('machine')} className="bg-white text-botanik-orange px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-botanik-green hover:text-white transition-all shadow-lg">
                  {lang === 'fr' ? 'Découvrir la Technologie' : 'Discover the Technology'}
                </button>
              </div>
              <Activity className="absolute bottom-[-10%] right-[-5%] w-64 h-64 text-white/10" />
            </div>
          </div>
        </section>

        {/* Section 4: Souveraineté Sanitaire */}
        <section className="prose prose-botanik max-w-none">
          <h2 className="text-3xl font-bold text-botanik-green mb-8 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-black">04</span>
            {lang === 'fr' ? 'Vers une Souveraineté Sanitaire Authentique' : 'Towards Authentic Health Sovereignty'}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-botanik-green/80">
            <p>
              Reprendre le contrôle de son extraction, c'est reprendre le pouvoir sur sa santé. En 2026, l'autonomie ne signifie pas le rejet de la science, mais son intégration intelligente au foyer. Posséder un extracteur de grade clinique en <strong>Inox 304</strong> (inerte et biocompatible) permet de s'affranchir des additifs, conservateurs et solvants pétrochimiques omniprésents dans les produits du commerce.
            </p>
            <p>
              Chaque remède que vous créez est une pièce unique, adaptée à votre terrain, à votre génétique et à votre environnement. C'est la médecine du futur : une phytothérapie de précision, préventive et souveraine.
            </p>
          </div>
        </section>

        {/* Section 5: FAQ & JSON-LD Section */}
        <section className="bg-white rounded-[48px] p-10 md:p-16 border border-botanik-green/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-botanik-orange via-botanik-green to-botanik-magenta" />
          <h2 className="text-3xl font-black text-botanik-green mb-16 text-center uppercase tracking-widest">{lang === 'fr' ? 'Foire Aux Questions' : 'Frequently Asked Questions'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-botanik-green text-lg">{lang === 'fr' ? 'Quelle est la différence entre infusion et extraction ?' : 'What is the difference between infusion and extraction?'}</h4>
              <p className="text-botanik-green/70 leading-relaxed text-sm">
                {lang === 'fr' 
                  ? "L'infusion est un type d'extraction utilisant l'eau. L'extraction au sens large inclut l'utilisation de différents solvants et des paramètres de température et de temps contrôlés pour capturer une palette moléculaire plus large (le Totum)." 
                  : "Infusion is a type of extraction using water. Extraction in a broad sense includes the use of different solvents and controlled temperature and time parameters to capture a wider molecular palette (the Totum)."}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-botanik-green text-lg">{lang === 'fr' ? 'Combien de temps se conserve un extrait maison ?' : 'How long does a homemade extract keep?'}</h4>
              <p className="text-botanik-green/70 leading-relaxed text-sm">
                {lang === 'fr'
                  ? "Cela dépend du solvant. Une infusion aqueuse se consomme dans les 24h. Un macérat huileux stabilisé peut durer 6 mois, et une teinture alcoolique plusieurs années si elle est conservée à l'abri de la lumière."
                  : "It depends on the solvent. A water-based infusion should be consumed within 24 hours. A stabilized oil macerate can last 6 months, and an alcohol tincture for several years if kept away from light."}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-botanik-green text-lg">{lang === 'fr' ? 'Peut-on extraire toutes les plantes ?' : 'Can all plants be extracted?'}</h4>
              <p className="text-botanik-green/70 leading-relaxed text-sm">
                {lang === 'fr'
                  ? "La plupart des plantes médicinales et aromatiques se prêtent à l'extraction. Cependant, il est crucial de respecter les dosages et les contre-indications propres à chaque plante. Notre Herbarium systémique est là pour vous guider."
                  : "Most medicinal and aromatic plants are suitable for extraction. However, it is crucial to respect the dosages and contraindications specific to each plant. Our systemic Herbarium is here to guide you."}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-botanik-green text-lg">{lang === 'fr' ? 'Pourquoi l\'inox 304 est-il important ?' : 'Why is 304 stainless steel important?'}</h4>
              <p className="text-botanik-green/70 leading-relaxed text-sm">
                {lang === 'fr'
                  ? "Contrairement au plastique ou à l'aluminium, l'inox 304 est neutre. Il ne libère aucun perturbateur endocrinien ou nanoparticule dans vos préparations, même lors d'extractions à haute température."
                  : "Unlike plastic or aluminum, 304 stainless steel is neutral. It does not release any endocrine disruptors or nanoparticles into your preparations, even during high-temperature extractions."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Area */}
        <section className="text-center bg-[#F4F4F0] rounded-[60px] p-12 md:p-24 border border-botanik-green/5 shadow-inner">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-botanik-orange/10 text-botanik-orange mb-10 shadow-sm border border-botanik-orange/10">
            <Compass className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-botanik-green mb-8 tracking-tight">
            {lang === 'fr' ? 'Prêt à devenir l\'artisan de votre santé ?' : 'Ready to become the architect of your health?'}
          </h2>
          <p className="text-xl text-botanik-green/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            {lang === 'fr' 
              ? "Rejoignez la révolution de l'extraction de précision. Donnez à votre corps les outils qu'il mérite pour restaurer son homéostasie naturelle." 
              : "Join the precision extraction revolution. Give your body the tools it deserves to restore its natural homeostasis."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onNavigate('machine')}
              className="px-12 py-5 bg-botanik-green text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-botanik-orange transition-all shadow-2xl shadow-botanik-green/20 flex items-center justify-center gap-3 group"
            >
              {lang === 'fr' ? 'Acquérir la BloomLab®' : 'Acquire BloomLab®'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="px-12 py-5 bg-white text-botanik-green border border-botanik-green/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-botanik-green/5 transition-all shadow-sm"
            >
              {lang === 'fr' ? 'Explorer l\'Herbier' : 'Explore the Herbarium'}
            </button>
          </div>
          <p className="mt-12 text-[10px] text-botanik-green/40 uppercase tracking-[0.3em] font-black">
            {lang === 'fr' ? 'Bloom by BotaniK — N°1 France' : 'Bloom by BotaniK — France N°1'}
          </p>
        </section>

      </div>
    </div>
  );
}
