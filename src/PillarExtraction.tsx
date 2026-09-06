import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Thermometer, Clock, Droplets, Leaf, ShieldCheck, ChevronRight, BookOpen, Activity, ArrowRight, Check, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { Language, translations } from './translations';
import { OptimizedImage } from './components/OptimizedImage';
import ExtractionCalculator from './components/ExtractionCalculator';

const bloomLabImg = "https://images.unsplash.com/photo-1611078767398-fcfe88fdb728?auto=format&fit=crop&w=1200&q=80";

export default function PillarExtraction({ lang, onNavigate }: { lang: Language, onNavigate: (v: any, productId?: string) => void }) {
  const t = translations[lang];
  const isFR = lang === 'fr';

  return (
    <div className="flex-1 bg-[#F9F9F7]">
      {/* Hero Section - Single H1 on page */}
      <section className="relative py-24 px-6 overflow-hidden bg-botanik-green text-white">
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <OptimizedImage 
              src={bloomLabImg} 
              width={1200}
              height={800}
              className="w-full h-full object-cover opacity-20" 
              alt={isFR ? "Extraction botanique : guide complet des méthodes, solvants et paramètres" : "Botanical extraction guide"} 
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 text-botanik-orange"
          >
            {isFR ? "Guide Pilier • Autonomie Botanique" : "Pillar Guide • Botanical Autonomy"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 font-sans tracking-tight leading-tight"
          >
            {isFR ? (
              <>Extraction botanique : guide complet des méthodes, solvants et paramètres</>
            ) : lang === 'de' ? (
              <>Botanische Extraktion: der komplette Guide zu Methoden, Lösungsmitteln und Parametern</>
            ) : (
              <>Botanical extraction: a complete guide to methods, solvents and parameters</>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            {isFR 
              ? "Infusion, décoction, macération, extraction séquentielle : comparez les méthodes, choisissez le bon solvant et maîtrisez température et agitation pour libérer le Totum végétal."
              : "Infusion, decoction, maceration, sequential extraction: compare methods, choose the right solvent and master temperature and agitation to unlock the botanical Totum."}
          </motion.p>
        </div>
      </section>

      {/* Sommaire Rapide */}
      <section className="max-w-4xl mx-auto -mt-12 px-6 mb-20 relative z-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-botanik-green/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-green/5 flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-botanik-green" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">{isFR ? "Totum Végétal" : "Botanical Totum"}</h3>
              <p className="text-xs text-botanik-green/70">{isFR ? "Préservez l'intégralité du profil moléculaire végétal." : "Preserve the complete molecular profile."}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-orange/10 flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-5 h-5 text-botanik-orange" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">{isFR ? "Thermorégulation" : "Thermoregulation"}</h3>
              <p className="text-xs text-botanik-green/70">{isFR ? "Stabilité thermique rigoureuse sans dénaturation." : "Rigorous thermal stability without breakdown."}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-botanik-magenta/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-botanik-magenta" />
            </div>
            <div>
              <h3 className="font-bold text-botanik-green text-sm mb-1">{isFR ? "Inox 304 Inerte" : "Inert 304 Stainless Steel"}</h3>
              <p className="text-xs text-botanik-green/70">{isFR ? "Cuve alimentaire inerte, facile à nettoyer et durable." : "Inert food-grade bowl, easy to clean and durable."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-20">
        
        {/* Section 1: Qu'est-ce que l'extraction botanique ? */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">1</span>
            {isFR ? "Qu'est-ce que l'extraction botanique ?" : "What is botanical extraction?"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Définition et principes fondamentaux" : "Definition and fundamental principles"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "L'extraction botanique est le processus physique et chimique par lequel un solvant (eau, huile, glycérine ou alcool) dissout et capture les principes actifs contenus dans la matrice d'une plante. Loin d'une simple dissolution passive, une extraction réussie repose sur un équilibre rigoureux entre le choix du solvant, le gradient de concentration, la température et la cinétique d'agitation."
                : "Botanical extraction is the physical and chemical process through which a solvent dissolves and captures the active compounds inside a plant matrix."}
            </p>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "Chaque plante recèle des composés hydrophiles (solubles dans l'eau) et lipophiles (solubles dans les corps gras). Comprendre ces affinités permet de concevoir des préparations botaniques riches, équilibrées et fidèles à la plante d'origine."
                : "Every plant contains hydrophilic and lipophilic components. Mastering these affinities allows creating balanced, faithful botanical preparations."}
            </p>
          </div>

          <div className="pt-4 border-t border-botanik-green/10 space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Différence avec l'infusion classique" : "Difference with classic infusion"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "L'infusion classique consiste à verser de l'eau chaude sur une plante et à laisser reposer. Si elle est agréable et accessible, elle présente deux limites majeures : l'eau bouillante détruit les fractions thermolabiles fragiles, et l'absence d'agitation continue crée une couche de saturation autour des feuilles, limitant le rendement d'extraction."
                : "Classic infusion pours boiling water over a plant. While traditional, boiling water denatures fragile compounds, and the absence of agitation limits molecular transfer."}
            </p>
          </div>
        </section>

        {/* Section 2: Pourquoi l'extraction séquentielle change tout */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">2</span>
            {isFR ? "Pourquoi l'extraction séquentielle change tout" : "Why sequential extraction changes everything"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Les limites des méthodes traditionnelles" : "The limitations of traditional methods"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "Les méthodes traditionnelles à solvant unique sont confrontées à une contradiction physique : un solvant aqueux ne peut pas solubiliser les résines ou les flavonoïdes lipophiles, tandis qu'un corps gras ne capte pas les minéraux ou les mucilages. Tenter d'extraire une plante entière en une seule étape mène souvent à un profil moléculaire incomplet."
                : "Single-solvent traditional methods face a physical contradiction: an aqueous solvent cannot dissolve lipophilic resins, while oils cannot capture water-soluble minerals."}
            </p>
          </div>

          <div className="pt-4 border-t border-botanik-green/10 space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Le défi du totum végétal" : "The challenge of the plant totum"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "Le totum désigne l'ensemble des substances actives et secondaires contenues dans le végétal vivant, agissant en synergie naturelle. Pour "
                : "The totum represents all active compounds acting in synergy. To "}
              <button 
                onClick={() => onNavigate('totum-definition')}
                className="text-botanik-green font-bold underline hover:text-botanik-orange transition-colors cursor-pointer"
              >
                {isFR ? "comprendre le totum végétal" : "understand the plant totum"}
              </button>
              {isFR 
                ? ", il est indispensable de préserver ces interactions moléculaires sans isoler artificiellement une seule molécule chimique."
                : ", it is essential to preserve these molecular interactions."}
            </p>
          </div>
        </section>

        {/* Section 3: Phase A : extraction des composés hydrosolubles */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">3</span>
            {isFR ? "Phase A : extraction des composés hydrosolubles" : "Phase A: extracting water-soluble compounds"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Solvants adaptés : eau, glycérine" : "Suitable solvents: water, glycerin"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "La Phase A mobilise des solvants à polarité élevée. L'eau déminéralisée ou filtrée extrait les tanins, les polyphénols hydrosolubles et les mucilages. La glycérine végétale, solvant doux et émollient, capture les flavonoïdes tout en stabilisant la préparation dans le temps."
                : "Phase A uses high polarity solvents such as filtered water or vegetable glycerin."}
            </p>
          </div>

          <div className="pt-4 border-t border-botanik-green/10 space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Températures selon la matrice végétale" : "Temperatures according to plant matrix"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "La sensibilité thermique varie considérablement selon la partie de la plante utilisée :"
                : "Thermal sensitivity varies widely depending on the plant part used:"}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <li className="p-4 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10">
                <div className="text-botanik-orange font-bold text-sm mb-1">45°C</div>
                <div className="font-semibold text-botanik-green text-sm mb-1">Fleurs tendres</div>
                <p className="text-xs text-botanik-green/70">Camomille, mauve, calendula. Préserve les mucilages et arômes subtils.</p>
              </li>
              <li className="p-4 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10">
                <div className="text-botanik-orange font-bold text-sm mb-1">55°C</div>
                <div className="font-semibold text-botanik-green text-sm mb-1">Feuilles & tiges</div>
                <p className="text-xs text-botanik-green/70">Menthe, mélisse, ortie. Assure une diffusion sans surchauffe enzymatique.</p>
              </li>
              <li className="p-4 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10">
                <div className="text-botanik-orange font-bold text-sm mb-1">60°C</div>
                <div className="font-semibold text-botanik-green text-sm mb-1">Écorces & racines</div>
                <p className="text-xs text-botanik-green/70">Cannelle, réglisse, gingembre. Pénètre les tissus fibreux denses.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Phase B : extraction des composés liposolubles */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">4</span>
            {isFR ? "Phase B : extraction des composés liposolubles" : "Phase B: extracting lipid-soluble compounds"}
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Solvants adaptés : alcool, huiles" : "Suitable solvents: alcohol, oils"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "La Phase B mobilise des solvants apolaires ou semi-polaires. Les huiles végétales stables (jojoba, sésame, olive) sont idéales pour "
                : "Phase B leverages lipid or hydroalcoholic solvents. Stable vegetable oils are ideal to "}
              <button 
                onClick={() => onNavigate('huile-infusee')}
                className="text-botanik-green font-bold underline hover:text-botanik-orange transition-colors cursor-pointer"
              >
                {isFR ? "réussir une huile infusée maison" : "succeed in making homemade infused oil"}
              </button>
              {isFR 
                ? ". En milieu hydroalcoolique dosé avec rigueur, l'alcool éthylique permet de "
                : ". With accurate hydroalcoholic dilution, alcohol allows you to "}
              <button 
                onClick={() => onNavigate('solvants-extraction')}
                className="text-botanik-green font-bold underline hover:text-botanik-orange transition-colors cursor-pointer"
              >
                {isFR ? "préparer une teinture mère hydroalcoolique" : "prepare a hydroalcoholic mother tincture"}
              </button>
              {isFR ? " capable de capter les résines et principes amers." : " capable of capturing dense resins."}
            </p>
          </div>

          <div className="pt-4 border-t border-botanik-green/10 space-y-4">
            <h3 className="text-xl font-bold text-botanik-green/90">
              {isFR ? "Préservation des fractions thermolabiles" : "Preserving thermolabile fractions"}
            </h3>
            <p className="text-base text-botanik-green/80 leading-relaxed">
              {isFR 
                ? "Les terpènes aromatiques et les acides gras insaturés rancissent ou s'évaporent rapidement sous l'effet des UV et d'une chaleur incontrôlée. Une extraction fermée à température modérée garantit l'intégrité de ces molécules protectrices."
                : "Volatile terpenes and unsaturated fatty acids evaporate or oxidize quickly under direct light and excess heat. Closed extraction at controlled temperature protects them."}
            </p>
          </div>
        </section>

        {/* Section 5: Les 3 paramètres critiques */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">5</span>
            {isFR ? "Les 3 paramètres critiques : température, agitation, environnement clos" : "The 3 critical parameters: temperature, agitation, closed chamber"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-botanik-orange/10 flex items-center justify-center text-botanik-orange mb-4">
                  <Thermometer className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-botanik-green text-lg mb-2">1. Température stable</h3>
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  {isFR ? "Contrôle précis sans pics thermiques pour respecter les seuils de tolérance de chaque famille végétale." : "Precise control without heat spikes to preserve each plant family."}
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-botanik-green/10 flex items-center justify-center text-botanik-green mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-botanik-green text-lg mb-2">2. Agitation cinétique</h3>
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  {isFR ? "Le vortex continu brise la couche de saturation statique et renouvelle le solvant au cœur des tissus." : "Continuous movement breaks the static boundary layer and renews solvent contact."}
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#F9F9F7] rounded-2xl border border-botanik-green/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-botanik-magenta/10 flex items-center justify-center text-botanik-magenta mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-botanik-green text-lg mb-2">3. Environnement clos</h3>
                <p className="text-sm text-botanik-green/80 leading-relaxed">
                  {isFR ? "Cuve en acier inoxydable 304 inerte et étanche : pas de perte de composés volatils, ni d'oxydation prématurée." : "Inert food-grade 304 stainless steel chamber preventing volatile loss and oxidation."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Comparaison des méthodes */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">6</span>
            {isFR ? "Infusion, décoction, macération : comparaison des méthodes" : "Infusion, decoction, maceration: comparison of methods"}
          </h2>

          <p className="text-base text-botanik-green/80 leading-relaxed">
            {isFR ? "Chaque méthode historique possède des atouts et des limites qu'il convient de distinguer :" : "Each traditional method has strengths and constraints:"}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-botanik-green/15 text-botanik-green">
                  <th className="py-3 px-4 font-bold">Méthode</th>
                  <th className="py-3 px-4 font-bold">Solvant</th>
                  <th className="py-3 px-4 font-bold">Température</th>
                  <th className="py-3 px-4 font-bold">Forces & Limites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-botanik-green/10 text-botanik-green/80">
                <tr>
                  <td className="py-3 px-4 font-semibold text-botanik-green">Infusion</td>
                  <td className="py-3 px-4">Eau</td>
                  <td className="py-3 px-4">70°C - 90°C</td>
                  <td className="py-3 px-4">Rapide, mais perte des composés volatils. Pour aller plus loin : <button onClick={() => onNavigate('infusion-botanique')} className="text-botanik-green font-bold underline hover:text-botanik-orange cursor-pointer">comprendre l'infusion botanique et ses limites</button>.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-botanik-green">Décoction</td>
                  <td className="py-3 px-4">Eau</td>
                  <td className="py-3 px-4">100°C ébullition</td>
                  <td className="py-3 px-4">Efficace pour les racines dures, mais dénature les molécules thermolabiles.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-botanik-green">Macération</td>
                  <td className="py-3 px-4">Huile, Alcool, Eau</td>
                  <td className="py-3 px-4">Ambiante (semaines)</td>
                  <td className="py-3 px-4">Respectueuse mais très lente avec risques d'oxydation. Découvrez comment <button onClick={() => onNavigate('huile-infusee')} className="text-botanik-green font-bold underline hover:text-botanik-orange cursor-pointer">maîtriser la macération de plantes</button>.</td>
                </tr>
                <tr className="bg-botanik-green/5 font-medium">
                  <td className="py-3 px-4 font-bold text-botanik-green">Méthode A/B de précision</td>
                  <td className="py-3 px-4">Multi-solvants</td>
                  <td className="py-3 px-4">40°C - 60°C régulée</td>
                  <td className="py-3 px-4">Extraction séquentielle rapide en milieu clos avec agitation vortex, respectant le Totum.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-botanik-green/10">
            <p className="text-sm text-botanik-green/80 leading-relaxed">
              {isFR ? "Avant d'engager une extraction, prenez le temps de " : "Before starting an extraction, take time to "}
              <button 
                onClick={() => onNavigate('library-landing')} 
                className="text-botanik-green font-bold underline hover:text-botanik-orange transition-colors cursor-pointer"
              >
                {isFR ? "choisir les plantes adaptées à votre extraction" : "select the appropriate plants for your extraction"}
              </button>
              {isFR ? " au sein de notre Herbier documenté." : " inside our documented Herbarium."}
            </p>
          </div>
        </section>

        {/* Dynamic Calculator Section */}
        <section className="scroll-mt-32" id="calculator">
          <ExtractionCalculator />
        </section>

        {/* Section 7: Comment BloomLab applique la méthode A/B */}
        <section className="bg-[#1C3F34] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-orange text-white flex items-center justify-center text-sm font-bold">7</span>
            {isFR ? "Comment BloomLab applique la méthode A/B" : "How BloomLab applies the A/B method"}
          </h2>

          <p className="text-base text-white/85 leading-relaxed">
            {isFR 
              ? "La machine BloomLab® intègre un système breveté combinant cuve en acier inoxydable 304, inerte et facile à nettoyer, contrôle thermique au degré près et cinétique vortex brevetée. Elle permet de conduire successivement la Phase A hydrosoluble et la Phase B liposoluble pour obtenir des préparations botaniques de haute pureté directement dans votre cuisine."
              : "The BloomLab® instrument brings laboratory precision into your kitchen with 304 stainless steel, degree-level thermal regulation and continuous agitation."}
          </p>

          <div className="pt-4">
            <button 
              onClick={() => onNavigate('product-detail', 'bloomlab')}
              className="px-8 py-4 bg-botanik-orange hover:bg-white hover:text-botanik-green text-white font-bold rounded-2xl transition-all duration-300 inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {isFR ? "Voir comment BloomLab applique la méthode A/B" : "See how BloomLab applies the A/B method"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Section 8: Questions fréquentes sur l'extraction botanique */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-botanik-green/10 shadow-sm space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-botanik-green flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-botanik-green text-white flex items-center justify-center text-sm font-bold">8</span>
            {isFR ? "Questions fréquentes sur l'extraction botanique" : "Frequently Asked Questions"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-botanik-green text-base">
                {isFR ? "Quelle est la différence entre infusion et extraction ?" : "What is the difference between infusion and extraction?"}
              </h3>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "L'infusion est une forme particulière d'extraction n'utilisant que l'eau. L'extraction au sens large utilise divers solvants (eau, glycérine, huile, alcool) avec un contrôle strict du temps, de la température et de l'agitation pour mobiliser l'ensemble du Totum végétal."
                  : "Infusion uses only water. Broad extraction utilizes various solvents under tight control of temperature and agitation."}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-botanik-green text-base">
                {isFR ? "Qu'est-ce que l'extraction séquentielle A/B ?" : "What is sequential A/B extraction?"}
              </h3>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "C'est un procédé en deux étapes distinctes : la Phase A capture les principes hydrosolubles (eau, glycérine) à température douce, puis la Phase B capture les composés liposolubles (huiles végétales, alcool) sans altérer les molécules fragiles."
                  : "It is a two-phase protocol: Phase A captures water-soluble compounds, and Phase B extracts lipophilic fractions."}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-botanik-green text-base">
                {isFR ? "Combien de temps se conserve un extrait maison ?" : "How long does a homemade extract keep?"}
              </h3>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "Une infusion aqueuse se consomme dans les 24 heures. Un macérat huileux stabilisé et conservé à l'abri de la lumière se conserve environ 6 mois, et une préparation hydroalcoolique peut durer plusieurs années."
                  : "Water infusions should be consumed within 24 hours. Oil macerates last about 6 months, and hydroalcoholic tinctures keep for years."}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-botanik-green text-base">
                {isFR ? "Pourquoi l'acier inoxydable 304 est-il important ?" : "Why is 304 stainless steel important?"}
              </h3>
              <p className="text-sm text-botanik-green/80 leading-relaxed">
                {isFR 
                  ? "Contrairement aux plastiques ou métaux poreux, l'acier inoxydable 304 est inerte chimiquement, facile à nettoyer et résistant aux acides végétaux. Il ne migre pas dans vos préparations."
                  : "Unlike porous metals, 304 stainless steel is chemically inert, food-safe, and does not leach into preparations."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: CTA Final & Maillage */}
        <section className="text-center bg-[#F4F4F0] rounded-3xl p-10 md:p-16 border border-botanik-green/10 shadow-sm space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-botanik-green/10 text-botanik-green mb-2">
            <Compass className="w-7 h-7" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-botanik-green tracking-tight">
            {isFR ? "Développez votre autonomie botanique" : "Build your botanical autonomy"}
          </h2>

          <p className="text-base text-botanik-green/70 max-w-xl mx-auto leading-relaxed">
            {isFR 
              ? "Découvrez notre sélection de plantes sélectionnées avec rigueur et nos kits guidés pour réussir vos premières extractions."
              : "Discover our botanicals and curated kits to master your first extractions."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button 
              onClick={() => onNavigate('boutique-kits')}
              className="px-8 py-4 bg-botanik-green hover:bg-botanik-orange text-white rounded-2xl font-bold text-sm transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {isFR ? "Démarrer avec un kit de plantes guidé" : "Start with a guided herbal kit"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('library-landing')}
              className="px-8 py-4 bg-white text-botanik-green border border-botanik-green/15 rounded-2xl font-bold text-sm hover:bg-botanik-green/5 transition-all shadow-sm cursor-pointer"
            >
              {isFR ? "Explorer l'Herbier" : "Explore Herbarium"}
            </button>
          </div>

          {/* Bloc Pour aller plus loin */}
          <div className="pt-8 border-t border-botanik-green/10 max-w-lg mx-auto text-center">
            <div className="text-xs uppercase tracking-widest font-bold text-botanik-green/60 mb-2">
              {isFR ? "Pour aller plus loin dans le Journal" : "Further reading"}
            </div>
            <button 
              onClick={() => onNavigate('blog', 'saule-salicine-aspirine-histoire-totum')}
              className="text-sm font-semibold text-botanik-green underline hover:text-botanik-orange transition-colors cursor-pointer"
            >
              {isFR 
                ? "Du saule à l'aspirine : ce que l'isolement nous apprend du totum →"
                : "From willow to aspirin: what molecular isolation teaches us about totum →"}
            </button>
          </div>
        </section>

        {/* Mandatory Educational Disclaimer */}
        <section className="p-6 bg-botanik-green/5 rounded-2xl border border-botanik-green/10 flex items-start gap-4 text-xs text-botanik-green/80 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-botanik-green flex-shrink-0 mt-0.5" />
          <p>
            <strong>{isFR ? "Avertissement éducatif : " : "Educational disclaimer: "}</strong>
            {isFR 
              ? "Bloom by BotaniK propose une approche éducative de la préparation botanique. Nos contenus ne remplacent pas un avis médical, un diagnostic ou un traitement."
              : "Bloom by BotaniK offers an educational approach to botanical preparation. Our content does not replace medical advice, diagnosis, or treatment."}
          </p>
        </section>

      </div>
    </div>
  );
}
