import React from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Network, 
  BookOpen, 
  Award,
  Activity,
  Compass
} from 'lucide-react';
import { Language } from '../translations';

interface StoreSequencingSectionProps {
  onNavigate?: (view: any, param?: string) => void;
  lang: Language;
}

export const StoreSequencingSection: React.FC<StoreSequencingSectionProps> = ({ onNavigate, lang }) => {
  const isFR = lang === 'fr';

  return (
    <section 
      id="pourquoi-remedes-sequences" 
      className="my-16 md:my-24 rounded-3xl md:rounded-[44px] bg-[#FAF7F2] border border-[#E8DFD1] p-6 sm:p-10 md:p-14 text-[#0F261E] relative overflow-hidden shadow-xl"
    >
      {/* Subtle decorative background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header & Title */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 md:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-[11px] font-black uppercase tracking-widest border border-[#2D5A27]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
          <span>Séquençage Botanique Actif A/B & Synergies Thérapeutiques</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-[#0F261E] leading-[1.15]">
          Pourquoi nos Remèdes sont-ils Séquencés ?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#0F261E]/80 leading-relaxed font-light max-w-3xl mx-auto">
          La phytothérapie moderne ne consiste pas à infuser une feuille au hasard. Elle répond à une architecture biologique précise, validée par la pharmacologie en réseau et les traditions médicales séculaires.
        </p>
      </div>

      {/* 2. Introduction : Le Corps est un Réseau */}
      <div className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center shrink-0 mt-1">
            <Network className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F261E]">
              La santé est un réseau vivant, pas une cible isolée
            </h3>
            <p className="text-sm sm:text-base text-[#0F261E]/80 leading-relaxed font-serif italic">
              « Votre corps n'est pas une machine composée de pièces isolées. C'est un réseau vivant où chaque organe communique avec les autres. Une douleur articulaire peut venir d'un foie engorgé. Un psoriasis peut naître d'un intestin perméable. Une fatigue chronique peut être liée à un axe HPA dérégulé. »
            </p>
          </div>
        </div>
      </div>

      {/* 3. Pourquoi plusieurs plantes ? Sagesse ancienne & Science moderne */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12 relative z-10">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#C49A6C]/20 text-[#0F261E] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#C49A6C]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F261E]">
              Sagesses Anciennes : 君臣佐使 & Samyoga
            </h3>
            <p className="text-sm text-[#0F261E]/75 leading-relaxed">
              La Médecine Traditionnelle Chinoise (MTC) compose ses formules selon le principe du <strong>君臣佐使 (Monarque, Ministres, Assistants, Messagers)</strong> : une plante principale cible le déséquilibre central, d'autres la soutiennent, la modulent ou guident son action. L'Ayurveda parle de <strong>Samyoga</strong> : la combinaison crée une action supérieure à la somme des parties.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#2D5A27] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C49A6C]" /> Formulations holistiques éprouvées depuis des millénaires
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#2D5A27]/10 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F261E]">
              Science Moderne : Pharmacologie en Réseau
            </h3>
            <p className="text-sm text-[#0F261E]/75 leading-relaxed">
              La science contemporaine a validé cette approche sous le nom de <strong>pharmacologie en réseau (network pharmacology)</strong> : les composés d'une formule multi-plantes agissent sur des cibles biologiques multiples et interconnectées, créant des boucles de rétroaction protectrices impossibles à atteindre avec une molécule isolée.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#2D5A27] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C49A6C]" /> Multi-cibles biologiques & réduction des toxicités
          </div>
        </div>
      </div>

      {/* 4. Le Séquençage A/B : la clé de l'efficacité */}
      <div className="max-w-5xl mx-auto mb-12 bg-gradient-to-br from-[#0F261E] to-[#1C3F34] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative z-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C49A6C] text-[10px] font-bold uppercase tracking-widest border border-white/15">
            <Layers className="w-3.5 h-3.5" />
            <span>Séparation des Polarités</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Le Séquençage A/B : Pourquoi séparer l'eau et l'alcool ?
          </h3>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
            Toutes les plantes ne se valent pas face à la chaleur et aux solvants. Une racine dure (gentiane, salsepareille) nécessite une décoction chaude pour libérer ses principes amers hydrosolubles. Une résine (boswellia) ou une feuille riche en huiles essentielles (origan, romarin) se dégrade à haute température et nécessite une extraction alcoolique à froid.
          </p>

          <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed font-medium">
            C'est pourquoi nos sachets sont divisés en deux compartiments rigoureusement scellés :
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>Sachet A (Extraction Aqueuse Chaude)</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Pour racines, écorces et fibres dures. Température régulée pour solubiliser tanins, mucilages et principes hydrosolubles sans ébullition destructrice.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#C49A6C] font-bold text-xs uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C49A6C]" />
              <span>Sachet B (Extraction Alcoolique à Froid)</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Pour feuilles délicates, résines et fleurs. Solvant éthanolique pur à basse température préservant l'intégralité des terpènes volatils et huiles essentielles.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Preuves Scientifiques Modernes */}
      <div className="max-w-5xl mx-auto mb-12 space-y-4 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0F261E] text-center mb-6">
          Ce que démontre la recherche clinique moderne
        </h3>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
              Méta-analyse Clinique
            </div>
            <div className="font-bold text-sm text-[#0F261E]">Formule Gegen Qin Lian</div>
            <p className="text-xs text-[#0F261E]/75 leading-relaxed">
              42 essais contrôlés randomisés (3 247 patients) démontrent une amélioration mesurable du HOMA-IR (SMD -1,24), de la glycémie à jeun et de l'HbA1c via les voies SIRT1/AMPK.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
              Pharmacologie en Réseau
            </div>
            <div className="font-bold text-sm text-[#0F261E]">Cibles Interconnectées</div>
            <p className="text-xs text-[#0F261E]/75 leading-relaxed">
              Les formules poly-herbales agissent en grappes synergiques : modulation simultanée du microbiote, de l'endothélium et des médiateurs immunitaires sans effet rebond.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D5A27]/10 shadow-xs space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2D5A27]">
              Synergie Pharmacocinétique
            </div>
            <div className="font-bold text-sm text-[#0F261E]">+2000% de Biodisponibilité</div>
            <p className="text-xs text-[#0F261E]/75 leading-relaxed">
              Exemple canonique : la pipérine issue du poivre noir démultiplie l'absorption de la curcumine de 2000%, transformant un actif mal absorbé en molécule hautement active.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Tableau Récapitulatif des 4 Fonctions */}
      <div className="max-w-5xl mx-auto mb-12 relative z-10">
        <div className="text-center mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C49A6C] mb-1">
            Matrice Fonctionnelle
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F261E]">
            La Règle des 4 Fonctions Systémiques
          </h3>
          <p className="text-xs sm:text-sm text-[#0F261E]/70">
            Chacun de nos remèdes équilibre simultanément ces 4 polarités pour un reset profond du terrain.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#2D5A27]/15 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#2D5A27] text-white uppercase text-[10px] sm:text-xs tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">Fonction</th>
                <th className="py-3.5 px-4 font-bold">Rôle dans le Système</th>
                <th className="py-3.5 px-4 font-bold">Exemples de Plantes</th>
                <th className="py-3.5 px-4 font-bold">Bénéfice Concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1]/60">
              <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-[#2D5A27] whitespace-nowrap">
                  1. RÉGULER
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80">
                  Cibler le mécanisme central du déséquilibre
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0F261E]">
                  Berbérine (Coptis), Cannelle
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80 font-medium">
                  Sensibilité à l'insuline, régulation glycémique
                </td>
              </tr>
              <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-[#2D5A27] whitespace-nowrap">
                  2. DRAINER
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80">
                  Activer les émonctoires (foie, reins, intestins)
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0F261E]">
                  Bardane, Radis Noir, Romarin
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80 font-medium">
                  Détoxification métabolique, pureté de la peau
                </td>
              </tr>
              <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-[#2D5A27] whitespace-nowrap">
                  3. NOURRIR
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80">
                  Apporter les cofacteurs & protéger les muqueuses
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0F261E]">
                  Fenugrec, Lin, Chia, Mucilages
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80 font-medium">
                  Satiété, apport de minéraux & fibres nobles
                </td>
              </tr>
              <tr className="hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-[#2D5A27] whitespace-nowrap">
                  4. HARMONISER
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80">
                  Moduler l'axe du stress & biodisponibilité
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0F261E]">
                  Gingembre, Ashwagandha, Tulsi
                </td>
                <td className="py-3.5 px-4 text-[#0F261E]/80 font-medium">
                  Résilience adaptogène, absorption maximale
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Appel à l'Action Final */}
      <div className="max-w-3xl mx-auto text-center space-y-6 pt-4 relative z-10">
        <p className="text-base sm:text-lg text-[#0F261E] font-medium leading-relaxed">
          « Ne vous contentez plus d'infusions approximatives ou de compléments isolés. Découvrez nos kits séquencés A/B et offrez à votre corps la synergie complète des plantes, guidée par la sagesse ancienne et validée par la science moderne. »
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#nos-kits"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('nos-kits');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl bg-[#0F261E] hover:bg-[#2D5A27] text-white font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-lg shadow-black/10 cursor-pointer"
          >
            <span>Découvrir nos Kits Séquencés</span>
            <ArrowRight className="w-4 h-4 text-[#C49A6C]" />
          </a>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('machine');
            }}
            className="px-6 py-4 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#0F261E] font-bold text-sm sm:text-base border border-[#2D5A27]/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>L'Extracteur BloomLab®</span>
            <FlaskConical className="w-4 h-4 text-[#2D5A27]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreSequencingSection;
