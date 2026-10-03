import React, { useState, useMemo } from 'react';
import { Calculator, AlertCircle, Info, ShieldCheck, Check } from 'lucide-react';

interface Omega3ProductSample {
  id: string;
  name: string;
  price: number;
  servings: number;
  epaPerServingMg: number;
  dhaPerServingMg: number;
  origin: string;
  allergens: string;
  storage: string;
}

const DEFAULT_SAMPLES: Omega3ProductSample[] = [
  {
    id: 'sample-concentre',
    name: 'Huile de poisson concentrée (TG sauvage)',
    price: 34.0,
    servings: 60,
    epaPerServingMg: 400,
    dhaPerServingMg: 300,
    origin: 'Pêche durable Atlantique Nord',
    allergens: 'Poisson',
    storage: 'Au frais après ouverture, à l\'abri de l\'oxydation'
  },
  {
    id: 'sample-standard',
    name: 'Huile de poisson standard (18/12 classique)',
    price: 18.0,
    servings: 90,
    epaPerServingMg: 180,
    dhaPerServingMg: 120,
    origin: 'Anchois Pacifique Sud',
    allergens: 'Poisson',
    storage: 'Température ambiante sèche (<25°C)'
  },
  {
    id: 'sample-algues',
    name: 'Huile de micro-algues (Schizochytrium Vegan)',
    price: 38.0,
    servings: 60,
    epaPerServingMg: 150,
    dhaPerServingMg: 350,
    origin: 'Fermentation close de micro-algues',
    allergens: 'Aucun allergène marin majeur',
    storage: 'Au réfrigérateur de préférence'
  }
];

export function Omega3Comparator() {
  const [products, setProducts] = useState<Omega3ProductSample[]>(DEFAULT_SAMPLES);
  const [customPrice, setCustomPrice] = useState<number>(29);
  const [customServings, setCustomServings] = useState<number>(60);
  const [customEpa, setCustomEpa] = useState<number>(300);
  const [customDha, setCustomDha] = useState<number>(200);

  const customCalculations = useMemo(() => {
    const totalActivePerServingMg = customEpa + customDha;
    const totalActiveGrams = (totalActivePerServingMg * customServings) / 1000;
    const costPerGramActive = totalActiveGrams > 0 ? customPrice / totalActiveGrams : 0;
    return {
      totalActivePerServingMg,
      totalActiveGrams,
      costPerGramActive
    };
  }, [customPrice, customServings, customEpa, customDha]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD3] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3F34]/10 text-[#1C3F34] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Outil d'Aide à la Décision</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F261E]">
            Comparateur de Valeur Réelle Oméga-3 (EPA + DHA)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Ne comparez pas le prix au flacon : comparez le coût par gramme d'acides gras réellement actifs (EPA + DHA) et vérifiez la pureté.
          </p>
        </div>
      </div>

      {/* Exemples comparatifs */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FAF7F2] text-[#0F261E] border-b border-[#E7DFD3]">
              <th className="p-3 font-bold">Produit type</th>
              <th className="p-3 font-bold">Prix</th>
              <th className="p-3 font-bold">Portions</th>
              <th className="p-3 font-bold">EPA / portion</th>
              <th className="p-3 font-bold">DHA / portion</th>
              <th className="p-3 font-bold">EPA+DHA total</th>
              <th className="p-3 font-bold bg-[#FAF7F2] text-[#D97706]">Coût / g actif</th>
              <th className="p-3 font-bold">Origine & Conservation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {products.map((p) => {
              const totalActiveGrams = ((p.epaPerServingMg + p.dhaPerServingMg) * p.servings) / 1000;
              const costPerG = totalActiveGrams > 0 ? (p.price / totalActiveGrams).toFixed(2) : '0';
              return (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-semibold text-[#0F261E]">{p.name}</td>
                  <td className="p-3 whitespace-nowrap">{p.price.toFixed(2)} €</td>
                  <td className="p-3">{p.servings}</td>
                  <td className="p-3 font-medium text-emerald-800">{p.epaPerServingMg} mg</td>
                  <td className="p-3 font-medium text-blue-800">{p.dhaPerServingMg} mg</td>
                  <td className="p-3 font-bold">{p.epaPerServingMg + p.dhaPerServingMg} mg</td>
                  <td className="p-3 font-black text-[#D97706] whitespace-nowrap bg-amber-50/40">
                    {costPerG} € / g
                  </td>
                  <td className="p-3 text-[11px] text-slate-500">
                    <div>{p.origin}</div>
                    <div className="italic text-slate-400">{p.storage}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simulateur Produit Personnalisé */}
      <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E7DFD3] space-y-4">
        <h4 className="font-bold text-sm text-[#0F261E] flex items-center gap-2">
          <span>Tester avec l'étiquette de votre produit :</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Prix flacon (€)</label>
            <input 
              type="number"
              min="1"
              value={customPrice}
              onChange={(e) => setCustomPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#E7DFD3] text-xs font-bold text-[#0F261E]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Portions / flacon</label>
            <input 
              type="number"
              min="1"
              value={customServings}
              onChange={(e) => setCustomServings(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#E7DFD3] text-xs font-bold text-[#0F261E]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">EPA (mg / portion)</label>
            <input 
              type="number"
              min="0"
              value={customEpa}
              onChange={(e) => setCustomEpa(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#E7DFD3] text-xs font-bold text-[#0F261E]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">DHA (mg / portion)</label>
            <input 
              type="number"
              min="0"
              value={customDha}
              onChange={(e) => setCustomDha(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#E7DFD3] text-xs font-bold text-[#0F261E]"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#E7DFD3] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-slate-600 font-medium">Actifs par portion : </span>
            <strong className="text-[#0F261E]">{customCalculations.totalActivePerServingMg} mg (EPA + DHA)</strong>
            <span className="text-slate-400 ml-2">({customCalculations.totalActiveGrams.toFixed(1)} g par flacon)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Coût de l'actif réel :</span>
            <span className="px-3 py-1 rounded-lg bg-[#0F261E] text-white font-black text-sm">
              {customCalculations.costPerGramActive.toFixed(2)} € / gramme
            </span>
          </div>
        </div>
      </div>

      {/* Rappel réglementaire & Prudence */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Précautions indispensables & Allégations autorisées :</span>
          <p className="leading-relaxed">
            L'effet bénéfique sur la fonction cardiaque normale est obtenu dès la consommation journalière de <strong>250 mg d'EPA et de DHA</strong>. Cet outil a une vocation strictement mathématique et éducative : il ne recommande aucune posologie personnalisée. 
            Les personnes sous <strong>traitements anticoagulants</strong> ou devant subir une <strong>intervention chirurgicale</strong> doivent obligatoirement solliciter l'avis de leur médecin prescripteur avant toute prise.
          </p>
        </div>
      </div>
    </div>
  );
}
