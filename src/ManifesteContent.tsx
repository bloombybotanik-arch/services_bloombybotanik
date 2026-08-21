import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShieldCheck, Sparkles, Compass, Cpu, HeartHandshake, ArrowRight } from 'lucide-react';
import { Language } from './translations';

interface ManifesteContentProps {
  onBack: () => void;
  onNavigate?: (view: any) => void;
  lang: Language;
}

export default function ManifesteContent({ onBack, onNavigate, lang }: ManifesteContentProps) {
  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const navigate = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1B3022]">
      {/* Navigation Sticky */}
      <div className="sticky top-0 z-30 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-botanik-green/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-botanik-green/60 hover:text-botanik-green transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isFR ? 'Retour' : isDE ? 'Zurück' : 'Back'}
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-botanik-orange">
            {isFR ? 'Manifeste Fondateur' : isDE ? 'Gründungsmanifest' : 'Founding Manifesto'}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-botanik-orange/10 text-botanik-orange text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {isFR ? 'La Troisième Voie de la Santé Naturelle' : isDE ? 'Der Dritte Weg der Natürlichen Gesundheit' : 'The Third Way in Natural Health'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-tight tracking-tight">
            {isFR 
              ? "Votre corps n'est pas cassé. Il est simplement verrouillé." 
              : isDE
              ? "Ihr Körper ist nicht kaputt. Er ist lediglich blockiert."
              : "Your body is not broken. It is simply locked."}
          </h1>
          <p className="text-xl md:text-2xl text-botanik-orange font-bold leading-relaxed max-w-2xl mx-auto">
            {isFR 
              ? "De l'illusion du symptôme isolé à la maîtrise du terrain : réconcilier herboristerie ancestrale et précision technologique." 
              : isDE
              ? "Von der Illusion des isolierten Symptoms zur Beherrschung des Terrains: Vereinigung traditioneller Kräuterkunde mit technologischer Präzision."
              : "From the illusion of isolated symptoms to terrain mastery: uniting ancient herbalism and technological precision."}
          </p>
        </motion.header>

        <div className="prose prose-lg prose-botanik max-w-none text-[#1B3022]/80 space-y-10 leading-relaxed font-normal">
          {isFR ? (
            <>
              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4 flex items-center gap-3">
                  <Compass className="w-7 h-7 text-botanik-orange" />
                  1. Le Postulat Fondateur : Le Signal vs Le Bruit
                </h2>
                <p>
                  Dans notre société moderne hyper-accélérée, chaque signal envoyé par notre organisme — fatigue persistante au réveil, lourdeur digestive après le déjeuner, tensions articulaires matinales, brouillard mental ou inconfort cutané — est immédiatement perçu comme une avarie technique. Une panne qu'il faudrait faire taire au plus vite par une molécule de synthèse ou un complément alimentaire standardisé.
                </p>
                <p>
                  Chez <strong>Bloom by BotaniK</strong>, nous refusons cette vision mécanique et réductrice. <strong>Le corps ne vous trahit jamais. Il vous informe.</strong> Ce que la médecine symptomatique nomme un « trouble » est souvent la réponse adaptative la plus intelligente que votre biologie ait trouvée pour maintenir l'homéostasie face à une surcharge toxinique, un stress oxydatif chronique ou un terrain carencé.
                </p>
              </section>

              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4 flex items-center gap-3">
                  <Cpu className="w-7 h-7 text-botanik-orange" />
                  2. La Limite des Méthodes Traditionnelles : Le Défi du Totum
                </h2>
                <p>
                  L'herboristerie traditionnelle détient des millénaires d'observations empiriques inestimables. Cependant, nos méthodes de préparation domestique sont restées figées au Moyen Âge : l'eau bouillante de la tisane détruit par choc thermique jusqu'à 95% des principes actifs thermolabiles (enzymes, monoterpènes, flavonoïdes délicats). À l'inverse, la macération artisanale au bain-marie souffre d'un manque total de contrôle thermique et d'une oxydation permanente à l'air libre.
                </p>
                <p>
                  Pour libérer la véritable « pharmacie intérieure » des plantes médicinales, il fallait concevoir un outil capable de respecter le <strong>Totum végétal</strong> — c'est-à-dire l'ensemble synergique et indissociable des molécules actives de la plante. C'est la raison d'être de notre extracteur de précision <button onClick={() => navigate('machine')} className="text-botanik-orange font-bold hover:underline inline">BloomLab®</button>.
                </p>
              </section>

              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4 flex items-center gap-3">
                  <HeartHandshake className="w-7 h-7 text-botanik-orange" />
                  3. Les Quatre Piliers du Reset Homéostatique Bloom
                </h2>
                <p>
                  Retrouver son équilibre biologique ne se fait pas par hasard. Notre protocole <button onClick={() => navigate('phytotherapie-reset')} className="text-botanik-orange font-bold hover:underline inline">Phytothérapie Reset</button> s'articule autour de 4 phases rigoureusement séquencées :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Phase 0 — Ouverture des Émonctoires :</strong> Drainer en douceur les reins, le foie, les intestins et la peau avant toute mobilisation profonde.</li>
                  <li><strong>Phase 1 — Relance Hépatique & Détoxification Cellulaire :</strong> Capter les métaux lourds et toxines circulantes grâce au duo d'argiles montmorillonite et zéolithe clinoptilolite.</li>
                  <li><strong>Phase 2 — Pureté Sanguine & Modulation Inflammatoire :</strong> Apaiser le feu digestif et systémique par des extractions d'écorces et de racines riches en polyphénols biodisponibles.</li>
                  <li><strong>Phase 3 — Stabilisation du Terrain & Vitalité :</strong> Nourrir le microbiome intestinal et consolider l'immunité à long terme.</li>
                </ul>
              </section>

              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-botanik-orange" />
                  4. Engagement d'Éthique, de Transparence et de Sécurité
                </h2>
                <p>
                  Bloom by BotaniK se positionne avec une rigueur absolue : nous ne sommes pas des médecins et nous ne délivrons aucun diagnostic médical. Nos produits, extracteurs, herbiers et protocoles ont une vocation strictement éducative, préventive et de bien-être végétal. Nous n'encourageons jamais l'arrêt d'un traitement médical prescrit.
                </p>
                <p>
                  En revanche, nous mettons entre vos mains la connaissance, la technologie de laboratoire et les matières premières les plus pures (plantes biologiques certifiées, inox 304 médical, absence totale de solvants pétrochimiques) pour vous redonner une souveraineté authentique et durable sur votre hygiène de vie.
                </p>
              </section>
            </>
          ) : isDE ? (
            <>
              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4">
                  1. Das Grundpostulat: Das Signal vs. Das Rauschen
                </h2>
                <p>
                  In unserer modernen Welt wird jedes Signal unseres Körpers — Müdigkeit beim Aufwachen, schwere Verdauung, Gelenksteifigkeit — oft sofort als Störung bekämpft. Wir glauben: <strong>Ihr Körper arbeitet nicht gegen Sie. Er informiert Sie.</strong>
                </p>
                <p>
                  Mit Bloom by BotaniK verbinden wir traditionelle Pflanzenheilkunde und moderne Niedrigtemperatur-Extraktionstechnologie, um das volle <strong>Pflanzen-Totum</strong> ohne Denaturierung nutzbar zu machen.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="p-8 bg-white rounded-3xl border border-botanik-green/10 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-botanik-green mt-0 mb-4">
                  1. The Core Postulate: Signal vs. Noise
                </h2>
                <p>
                  In modern life, every body signal — chronic fatigue, sluggish digestion, morning stiffness, or skin sensitivity — is often treated as a mechanical flaw to be suppressed. At Bloom by BotaniK, we believe: <strong>Your body is not broken. It is simply locked.</strong>
                </p>
                <p>
                  We bridge the gap between traditional herbalism and molecular precision by creating countertop laboratory tools like <button onClick={() => navigate('machine')} className="text-botanik-orange font-bold hover:underline inline">BloomLab®</button> to unlock the full healing potential of the plant Totum.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 p-8 bg-[#F4F4F0] rounded-3xl border border-botanik-green/10">
          <h3 className="text-xl font-bold text-botanik-green mb-6">
            {isFR ? 'Explorer l’Écosystème Bloom by BotaniK' : 'Explore the Bloom by BotaniK Ecosystem'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('machine')}
              className="p-5 bg-white rounded-2xl border border-botanik-green/10 hover:border-botanik-orange text-left transition-all group"
            >
              <div className="text-sm font-bold text-botanik-green group-hover:text-botanik-orange mb-1">
                {isFR ? 'Extracteur BloomLab®' : 'BloomLab® Extractor'}
              </div>
              <div className="text-xs text-botanik-green/60">
                {isFR ? 'Technologie d\'extraction Totum ±0,5°C' : 'Totum precision thermal extraction'}
              </div>
            </button>
            <button 
              onClick={() => navigate('phytotherapie-reset')}
              className="p-5 bg-white rounded-2xl border border-botanik-green/10 hover:border-botanik-orange text-left transition-all group"
            >
              <div className="text-sm font-bold text-botanik-green group-hover:text-botanik-orange mb-1">
                {isFR ? 'Protocole Reset Terrain' : 'Terrain Reset Protocol'}
              </div>
              <div className="text-xs text-botanik-green/60">
                {isFR ? 'Méthode homéostasique 4 phases' : '4-phase systemic homeostasis method'}
              </div>
            </button>
            <button 
              onClick={() => navigate('boutique')}
              className="p-5 bg-white rounded-2xl border border-botanik-green/10 hover:border-botanik-orange text-left transition-all group"
            >
              <div className="text-sm font-bold text-botanik-green group-hover:text-botanik-orange mb-1">
                {isFR ? 'Boutique & Coffrets' : 'Shop & Herbal Kits'}
              </div>
              <div className="text-xs text-botanik-green/60">
                {isFR ? 'Plantes certifiées & packs apothicaire' : 'Certified botanicals & herbal bundles'}
              </div>
            </button>
          </div>
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-botanik-green py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            {isFR ? 'Rejoindre la Démarche d’Autonomie Botanique' : 'Join the Botanical Autonomy Movement'}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-base">
            {isFR 
              ? 'Découvrez comment le BloomLab® et nos protocoles transforment votre cuisine en laboratoire de santé naturelle.' 
              : 'Discover how BloomLab® and our protocols turn your kitchen into a natural health laboratory.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('machine')}
              className="px-8 py-4 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-[#EA580C] transition-all shadow-xl flex items-center gap-2"
            >
              {isFR ? 'Découvrir BloomLab®' : 'Discover BloomLab®'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('boutique')}
              className="px-8 py-4 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              {isFR ? 'Accéder à la Boutique' : 'Visit the Shop'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
