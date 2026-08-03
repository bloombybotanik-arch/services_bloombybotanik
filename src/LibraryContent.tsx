import React from 'react';
import { Lock, Droplets, Sparkles, Wind, CheckCircle2, ChevronRight, TestTube } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';

interface LibraryContentProps {
  onNavigatePending?: () => void;
  isPremium: boolean;
  onRequirePremium: () => void;
  onNavigate?: (view: any) => void;
}

export default function LibraryContent({ isPremium, onRequirePremium, onNavigate, onNavigatePending }: LibraryContentProps) {
  const freeRecipes = [
    {
      id: "respiration",
      name: "Respiration Vague & Thymus",
      target: "Système Nerveux Autonome",
      icon: <Wind className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-900 border-blue-200",
      description: "Exercices de respiration pour activer le nerf vague et stimuler le thymus."
    },
    {
      id: "mouvement",
      name: "Mouvement Lymphe & Fascia",
      target: "Système Lymphatique",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-900 border-emerald-200",
      description: "Exercices physiques à son rythme pour activer la lymphe et libérer le fascia."
    },
    {
      id: "sommeil",
      name: "Hygiène du Sommeil",
      target: "Apaisement des tensions",
      icon: <Droplets className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-900 border-indigo-200",
      description: "Sommeil à heure régulière pour apaiser les tensions et la fatigue chronique."
    },
    {
      id: "chronobiologie",
      name: "Chronobiologie & Alimentation",
      target: "Métabolisme",
      icon: <TestTube className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-900 border-amber-200",
      description: "Respecter la chronobiologie du corps. Jeûne de 8h, 12h, ou 16h quand on le peut."
    }
  ];

  const premiumRecipes = [
    { id: "kit-renaissance", name: "Kit Renaissance (Foie)", desc: "Protocole complet · 12 plantes · 84 jours" },
    { id: "kit-purete", name: "Kit Pureté Sanguine", desc: "Protocole complet · 10 plantes · 84 jours" },
    { id: "kit-nerveux", name: "Élixir Système Nerveux", desc: "Séquençage Actif · 6 plantes" },
    { id: "reset-84", name: "Protocole Reset 84 Jours", desc: "Systémique complète · 15 plantes" },
    { id: "p1", name: "Élixir Immunité", desc: "Extraction Biphasique · 4 plantes" },
    { id: "p2", name: "Tonique Digestif Profond", desc: "Extraction Aqueuse · 3 plantes" },
    { id: "p3", name: "Soutien Surrénalien", desc: "Séquençage Actif · 5 plantes" },
    { id: "p4", name: "Macérat Articulaire", desc: "Extraction Huileuse · 6 plantes" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-botanik-green/5 pb-8">
          <div className="flex gap-4 text-[10px] font-black text-botanik-green/40 uppercase tracking-[0.3em] items-center">
            <span>Reset Systémique</span>
            <span className="w-1 h-1 rounded-full bg-botanik-green/20" />
            <span>Fiches Protocoles</span>
          </div>
          <div className="text-[10px] font-black text-botanik-orange uppercase tracking-[0.3em]">
            Reset O inclus • 93 fiches premium
          </div>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-botanik-green mb-6 leading-[1.1] tracking-tight">
          {wrapTitle("Reset Homéostatique")}
        </h1>
        <p className="text-lg md:text-xl text-botanik-green/60 max-w-2xl leading-relaxed font-light">
          Un protocole de régulation systémique profonde.
        </p>
      </div>

      {/* FREE RECIPES */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-botanik-green">{wrapTitle("Reset O (Fondamentaux)")}</h2>
          <span className="bg-botanik-green/10 text-botanik-green text-xs font-bold px-3 py-1 rounded-full">ACCÈS LIBRE</span>
        </div>
        <p className="text-botanik-green/70 mb-8 max-w-3xl">
          L'hygiène quotidienne sans compromis. Adoptez ces pratiques fondamentales avant d'engager les protocoles systémiques de phytothérapie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freeRecipes.map((recipe) => (
            <div key={recipe.id} onClick={() => onNavigatePending && onNavigatePending()} className={`p-6 rounded-2xl border ${recipe.color} relative group cursor-pointer hover:shadow-lg transition-all flex flex-col h-full`}>
              <div className="absolute top-4 right-4 text-green-600 bg-white/50 p-1 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="mb-4 bg-white/50 w-12 h-12 rounded-xl flex items-center justify-center">
                {recipe.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
              <p className="text-sm opacity-80 mb-4">{recipe.target}</p>
              <button onClick={(e) => { e.stopPropagation(); onNavigatePending && onNavigatePending(); }} className="flex items-center text-sm font-bold group-hover:underline mt-auto">
                Action <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM RECIPES */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-botanik-green">Les Protocoles Premium</h2>
          {!isPremium && <span className="bg-botanik-magenta/10 text-botanik-magenta text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Lock className="w-3 h-3" /> VERROUILLÉ</span>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => {
                if (!isPremium) onRequirePremium();
                else onNavigatePending && onNavigatePending();
              }}
              className={`p-6 rounded-2xl border border-botanik-green/10 bg-white relative transition-all ${!isPremium ? 'cursor-pointer hover:border-botanik-magenta/30 hover:shadow-md group' : 'cursor-pointer hover:border-botanik-green/30 hover:shadow-md'}`}
            >
              {!isPremium && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button onClick={() => onNavigatePending && onNavigatePending()} className="bg-botanik-magenta text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Débloquer
                  </button>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-botanik-green/5 flex items-center justify-center text-botanik-green">
                  {isPremium ? <Sparkles className="w-5 h-5" /> : <Lock className="w-5 h-5 opacity-50" />}
                </div>
              </div>
              <h3 className={`font-bold text-lg mb-2 ${!isPremium ? 'text-botanik-green/70' : 'text-botanik-green'}`}>{recipe.name}</h3>
              <p className="text-sm text-botanik-green/50">{recipe.desc}</p>
            </div>
          ))}
          
          <div className="p-6 rounded-2xl border border-dashed border-botanik-green/20 bg-[#F9F9F7] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-botanik-green/5 transition-colors min-h-[160px]" onClick={onRequirePremium}>
             <p className="font-medium text-botanik-green mb-2">+ 48 autres recettes</p>
             <span className="text-sm text-botanik-magenta font-semibold underline">Découvrir Bloom Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}
