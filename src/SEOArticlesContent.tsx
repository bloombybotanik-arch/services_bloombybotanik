
import React from 'react';
import { ChevronRight, FlaskConical, Droplets, Wind, Activity } from 'lucide-react';

interface SEOArticleProps {
  lang: string;
  t: any;
}

export const InfusionPrecision = ({ lang, t }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  if (!isFR) return <div className="p-20 text-center">Coming soon in your language.</div>;

  return (
    <div className="bg-[#F9F9F7] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <span className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          Cluster : Infusion Botanique
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-[1.1]">
          {t.seo.infusion_precision.h1}
        </h1>
        <p className="text-xl text-botanik-green/70 mb-12 leading-relaxed font-medium">
          {t.seo.infusion_precision.intro}
        </p>

        <div className="prose prose-botanik max-w-none">
          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Pourquoi la précision change tout ?</h2>
          <p>
            Dans l'herboristerie traditionnelle, l'infusion est souvent une étape approximative. On verse de l'eau bouillante, on attend "un certain temps", et on consomme. Pourtant, chaque plante possède une structure moléculaire unique qui réagit différemment à la chaleur.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-white p-8 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-botanik-orange">
                <Activity className="w-5 h-5" /> Température Critique
              </h3>
              <p className="text-sm opacity-80">
                Certaines molécules, comme les enzymes ou les vitamines thermosensibles, se dégradent dès 45°C. La BloomLab permet de rester sous ce seuil pour une extraction à froid ou tiède de haute qualité.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-botanik-green/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-botanik-orange">
                <Wind className="w-5 h-5" /> Agitation & Temps
              </h3>
              <p className="text-sm opacity-80">
                La durée de contact entre le solvant et la plante détermine la concentration en actifs. Une infusion trop longue peut extraire des tanins amers non désirés, là où une précision au degré près cible uniquement le bénéfice recherché.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Le rôle du BloomLab® dans votre pratique</h2>
          <p>
            BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels. En transformant votre cuisine en laboratoire de précision, vous accédez à une souveraineté sanitaire réelle. Nos équipes vous accompagnent dans votre projet de soins sur mesure en vous fournissant les outils et les connaissances nécessaires.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TotumDefinition = ({ lang, t }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  if (!isFR) return <div className="p-20 text-center">Coming soon in your language.</div>;

  return (
    <div className="bg-[#F9F9F7] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <span className="inline-block px-3 py-1 bg-botanik-magenta/5 text-botanik-magenta text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          Cluster : Science du Vivant
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-[1.1]">
          {t.seo.totum_definition.h1}
        </h1>
        <p className="text-xl text-botanik-green/70 mb-12 leading-relaxed font-medium">
          {t.seo.totum_definition.intro}
        </p>

        <div className="prose prose-botanik max-w-none">
          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Qu'est-ce que le Totum ?</h2>
          <p>
            Le concept de <strong>Totum</strong> est central dans la phytothérapie de précision pratiquée chez Bloom by BotaniK. Il désigne l'ensemble des molécules actives d'une plante agissant en synergie. Contrairement à l'industrie pharmaceutique qui isole un "principe actif" unique, nous considérons que l'intelligence végétale réside dans l'équilibre global de la plante.
          </p>

          <div className="my-12 bg-botanik-green text-white p-10 rounded-3xl relative overflow-hidden">
            <FlaskConical className="absolute top-[-20px] right-[-20px] w-64 h-64 text-white/5 rotate-12" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">La Synergie Moléculaire</h3>
            <p className="text-lg opacity-90 relative z-10 leading-relaxed">
              Dans le Totum, certaines molécules agissent comme des agents actifs, tandis que d'autres facilitent l'absorption ou limitent les effets secondaires. C'est cette "harmonie biochimique" que nous cherchons à capturer avec le BloomLab.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Pourquoi privilégier le Totum intégral ?</h2>
          <p>
            Le corps humain a évolué avec les plantes pendant des millénaires. Nos récepteurs biologiques sont conçus pour interagir avec des structures complexes. Extraire le Totum, c'est parler la langue du vivant. Cela permet un travail de terrain profond, agissant sur le microbiome et l'inflammation chronique de manière plus douce et durable.
          </p>
          
          <p className="mt-8 italic text-botanik-green/60">
            "Une place pour chaque plante et chaque plante à sa place." — Cette maxime guide notre approche de l'extraction intégrale.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SolvantsExtraction = ({ lang, t }: SEOArticleProps) => {
  const isFR = lang === 'fr';
  if (!isFR) return <div className="p-20 text-center">Coming soon in your language.</div>;

  return (
    <div className="bg-[#F9F9F7] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        <span className="inline-block px-3 py-1 bg-botanik-orange/5 text-botanik-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
          Cluster : Pratique de l'Extraction
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-botanik-green mb-8 leading-[1.1]">
          {t.seo.solvants_extraction.h1}
        </h1>
        <p className="text-xl text-botanik-green/70 mb-12 leading-relaxed font-medium">
          {t.seo.solvants_extraction.intro}
        </p>

        <div className="prose prose-botanik max-w-none">
          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">L'Eau : Le solvant universel</h2>
          <p>
            L'infusion à l'eau est la méthode la plus courante. Elle permet d'extraire les molécules hydrosolubles (sels minéraux, tanins, mucilages). Avec le BloomLab, vous maîtrisez la température pour ne pas "brûler" les actifs fragiles.
          </p>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">L'Huile : Pour les soins et la gastronomie</h2>
          <p>
            Le macérat huileux est idéal pour extraire les molécules liposolubles (huiles essentielles, caroténoïdes). C'est la base de vos baumes cosmétiques et de vos huiles gastronomiques. La BloomLab permet une extraction à chaud stabilisée, accélérant le processus de macération sans rancissement de l'huile.
          </p>

          <div className="my-12 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-botanik-orange/5 p-8 rounded-2xl border border-botanik-orange/10">
              <h3 className="font-bold text-botanik-orange mb-2 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> Macérat Hydroalcoolique
              </h3>
              <p className="text-sm opacity-80">
                L'alcool permet d'extraire une gamme plus large d'actifs, notamment les résines et certains alcaloïdes. C'est la base de ce qu'on appelle traditionnellement les teintures mères.
              </p>
            </div>
            <div className="flex-1 bg-botanik-orange/5 p-8 rounded-2xl border border-botanik-orange/10">
              <h3 className="font-bold text-botanik-orange mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Glycérine & Vinaigre
              </h3>
              <p className="text-sm opacity-80">
                D'autres solvants comme la glycérine végétale ou le vinaigre de cidre offrent des alternatives intéressantes pour des extractions sans alcool adaptées à toute la famille.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-botanik-green mt-12 mb-6">Faites fleurir toutes vos envies de bien-être végétal</h2>
          <p>
            BloomLab® vous offre toutes les clés pour réaliser vos propres remèdes naturels en choisissant le solvant le plus adapté à vos besoins. Pour un conseil personnalisé, n'hésitez pas à interroger ALMA, notre assistante botaniste, ou à consulter nos guides spécialisés.
          </p>
        </div>
      </div>
    </div>
  );
};
