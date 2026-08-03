import React from 'react';
import { Sparkles, Leaf, ShieldCheck, FlaskConical, BookOpen, ChevronRight, Beaker, Clock, Thermometer, Activity, Settings, Info } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import { cosmeticsRecipes } from './cosmeticsData';

interface GuideContentProps {
  onNavigate: (view: any) => void;
}

export default function GuideContent({ onNavigate }: GuideContentProps) {
  // Get the 3 technical sheets from the data
  const technicalSheets = [
    cosmeticsRecipes.find(r => r.plant_id === "elixir_croissance_capillaire"),
    cosmeticsRecipes.find(r => r.plant_id === "serum_reparateur_nuit"),
    cosmeticsRecipes.find(r => r.plant_id === "huile_massage_recuperation")
  ].filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 animate-in fade-in duration-1000">
      
      {/* Header: Mode d'Emploi */}
      <header className="mb-24 text-center">
        <div className="inline-flex gap-4 text-[10px] font-black text-botanik-orange mb-6 uppercase tracking-[0.3em] bg-botanik-orange/5 px-4 py-2 rounded-full">
          <span>Souveraineté</span>
          <span>•</span>
          <span>Transmission</span>
          <span>•</span>
          <span>Extraction</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-botanik-green mb-8 leading-[1] tracking-tight">
          L'Écosystème Bloom.<br/>
          <span className="text-botanik-orange">Souveraineté & Précision.</span>
        </h1>
        <p className="text-xl md:text-2xl text-botanik-green/60 max-w-3xl mx-auto leading-relaxed font-light mb-12">
          Découvrez la BloomLab, notre extracteur de Totum intégral, ainsi que notre gamme de remèdes botaniques experts pour restaurer votre homéostasie.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onNavigate('boutique')}
            className="px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-xl flex items-center gap-2 group"
          >
            Voir la Boutique <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => document.getElementById('usage-levels')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white border border-botanik-green/10 text-botanik-green rounded-2xl font-bold hover:bg-[#F5F3EB] transition-all flex items-center gap-2"
          >
            Découvrir les Niveaux
          </button>
        </div>
      </header>

      {/* Machine Intro Section */}
      <section className="mb-32">
        <div className="bg-white border border-botanik-green/5 rounded-[60px] overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-8 leading-tight">Le Compagnon de votre Autonomie</h2>
              <div className="space-y-6 mb-12">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-botanik-green/5 rounded-xl flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-botanik-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-botanik-green mb-1">Précision Labo</h4>
                    <p className="text-botanik-green/60 text-sm leading-relaxed">Contrôle thermique au 0.5°C près pour préserver l'intégrité du Totum.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-botanik-green/5 rounded-xl flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5 text-botanik-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-botanik-green mb-1">Extraction 6-en-1</h4>
                    <p className="text-botanik-green/60 text-sm leading-relaxed">Huiles, sérums, teintures, macérats, sirops et infusions complexes.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-7xl font-black text-botanik-orange">289€</span>
                    <div className="flex flex-col">
                      <span className="text-sm line-through text-botanik-green/30">329€</span>
                      <span className="text-xs font-bold text-botanik-magenta uppercase tracking-widest italic">Économisez 49€</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => onNavigate('cart')}
                  className="w-full md:w-auto px-10 py-6 bg-white border-2 border-botanik-green text-botanik-green rounded-2xl font-bold hover:bg-botanik-green hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span className="uppercase tracking-widest">Ajouter au panier</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-0 overflow-hidden bg-[#F9F9F7]">
              <img 
                src={bloomLabImg} 
                alt="BloomLab Machine" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Niveaux d'Utilisation */}
      <section id="usage-levels" className="mb-32">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-botanik-green mb-6 tracking-tight">Trois Niveaux. Une Seule Machine.</h2>
          <p className="text-botanik-green/60 text-xl max-w-2xl mx-auto">Votre progression est le coeur du protocole Bloom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Niveau 1 */}
          <div 
            onClick={() => onNavigate('culinaire')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <Leaf className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">Accessible à tous • Gratuit</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">L'Art Culinaire Botanique</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              Huiles aromatiques, Miels infusés, Vinaigres botaniques. Maîtrisez l'art de l'infusion pour une gastronomie vivante.
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                Voir les 4 recettes gratuites <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Niveau 2 */}
          <div 
            onClick={() => onNavigate('cosmetiques')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <FlaskConical className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">Intermédiaire • Gratuit</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">La Cosmétique Systémique</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              Sérums, Élixirs, Huiles de massage. Créez vos propres soins topiques avec des paramètres ultra-précis.
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                Voir les 4 soins gratuits <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Niveau 3 */}
          <div 
            onClick={() => onNavigate('library')}
            className="bg-white rounded-[40px] border border-botanik-green/5 p-10 shadow-sm hover:bg-[#F5F3EB] hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-botanik-orange/10 transition-colors">
              <Activity className="w-8 h-8 text-botanik-orange" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-botanik-orange text-white text-[10px] font-bold flex items-center justify-center">3</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-orange">Expert • Réservé BloomLab</span>
            </div>
            <h3 className="text-2xl font-bold text-botanik-green mb-4 leading-tight group-hover:text-botanik-green transition-colors">La Phytothérapie de Précision</h3>
            <p className="text-botanik-green/60 text-sm mb-12 leading-relaxed">
              Protocoles avancés, Totum intégral. Accédez aux 93 fiches de précision pour un accompagnement profond.
            </p>
            <div className="pt-6 border-t border-botanik-green/10">
              <span className="text-[10px] font-bold text-botanik-orange uppercase tracking-widest flex items-center gap-2">
                Découvrir les 93 fiches <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Trouver votre voie */}
      <section className="mb-32">
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-3 py-1 bg-botanik-orange/10 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Orientation</span>
          <h2 className="text-4xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
            Trouver votre voie
          </h2>
          <p className="text-xl text-botanik-green/60 leading-relaxed font-light">
            Chaque parcours commence par une intention. Identifiez le point d'entrée qui résonne avec votre besoin actuel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">Découvrir la marque</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              Plongez dans l'univers Bloom, notre histoire et notre vision du Totum à travers nos dossiers thématiques et notre manifeste.
            </p>
            <button 
              onClick={() => onNavigate('manifeste')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              Manifeste <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">Reset Systémique</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              Prêt pour une transformation profonde ? Entrez dans le protocole de Reset pour rééquilibrer vos systèmes de régulation.
            </p>
            <button 
              onClick={() => onNavigate('phytotherapie-reset')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              Le Reset <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-botanik-green/5 shadow-sm hover:border-botanik-orange transition-all duration-300 flex flex-col group">
            <h4 className="text-xl font-bold text-botanik-green mb-4">Aller plus loin</h4>
            <p className="text-botanik-green/60 text-sm mb-8 leading-relaxed flex-grow">
              Explorez l'Herbier systémique pour approfondir votre connaissance des plantes ou participez à nos ateliers experts.
            </p>
            <button 
              onClick={() => onNavigate('herbier')}
              className="flex items-center gap-2 text-botanik-orange font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
            >
              L'Herbier <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Principes Fondamentaux d'Usage */}
      <section id="reset-homeostasique">
        <div className="bg-[#F5F3EB] rounded-[48px] p-8 md:p-16 lg:p-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-botanik-green mb-8 leading-tight">Principes d'Usage</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">La Propreté Labo</h4>
                  <p className="text-botanik-green/60 leading-relaxed">Désinfectez toujours votre cuve à l'alcool à 70° avant chaque cycle d'extraction. La pureté du solvant est la garantie de la stabilité du produit fini.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">Le Respect des Solvants</h4>
                  <p className="text-botanik-green/60 leading-relaxed">N'utilisez que des huiles bio de première pression à froid. Pour l'eau, privilégiez les hydrolats ou l'eau distillée ultra-pure pour éviter le calcaire.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 bg-botanik-green text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                <div>
                  <h4 className="font-bold text-botanik-green mb-2 text-lg">Le Séquençage Thermique</h4>
                  <p className="text-botanik-green/60 leading-relaxed">Respectez scrupuleusement les phases A et B. La Phase A extrait les principes résistants, la Phase B préserve les actifs fragiles et volatiles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
