/**
 * BLOOM BY BOTANIK — RENDU SSR & SEO DES RECETTES HERBIER MIGRÉES
 * 
 * Implémentation stricte du gabarit canonique Bloom :
 * - Section Héritage "Mémoire du vivant" (13 registres de traditions avec citations datées)
 * - Doctrina Signaturae (résonance morphologique)
 * - Terrains Bloom (T1 à T8) & Axes opératoires (A1 à A9)
 * - Protocole BloomLab® en 5 étapes (Sachet A / Sachet B)
 * - Tableau Signature Moléculaire & 6 labels de preuve scientifique
 * - Conformité DGCCRF (zéro promesse de guérison, prudence)
 * - Données structurées Schema.org :
 *     * Recipe pour phytothérapie & gastronomie
 *     * Article STRICTEMENT pour cosmétique (Recipe formellement interdit pour cosmétiques)
 *     * BreadcrumbList & WebPage
 */

import {
  HerbierRecipe,
  HERBIER_RECIPES,
  getHerbierRecipesByCategory
} from '../data/herbierRecipesRegistry';

const DOMAIN = 'https://bloombybotanik.com';
const LOGO_URL = `${DOMAIN}/assets/img/logo-bloom-square-512.png`;
const LEGAL_DISCLAIMER = `Les contenus Bloom sont éducatifs et destinés à l'accompagnement du terrain physiologique. Ils ne constituent pas un avis médical, dermatologique, pharmaceutique ou thérapeutique, et ne remplacent en aucun cas une consultation médicale. En cas de grossesse, allaitement, allergie, traitement médicamenteux en cours ou maladie chronique, consultez impérativement un professionnel de santé qualifié.`;

export function renderHerbierRecipePageHtml(recipe: HerbierRecipe): {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: string;
  bodyHtml: string;
} {
  const title = `${recipe.title} | ${recipe.categoryLabel} BloomLab®`;
  const metaDescription = `${recipe.subtitle.slice(0, 150)} Formule d'extraction botanique BloomLab®, Terrain ${recipe.terrains.join('/')}, niveau ${recipe.difficultyLabel}, durée : ${recipe.totalTimeMinutes} min.`;
  const canonical = `${DOMAIN}${recipe.canonicalUrl}`;
  const fullImage = recipe.image.startsWith('http') ? recipe.image : `${DOMAIN}${recipe.image}`;

  // 1. JSON-LD Structured Data
  let mainSchema: any;
  if (recipe.schemaType === 'Recipe') {
    mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      'name': recipe.title,
      'description': recipe.subtitle,
      'image': [fullImage],
      'author': {
        '@type': 'Organization',
        'name': 'Bloom by BotaniK',
        'url': DOMAIN
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Bloom by BotaniK',
        'logo': {
          '@type': 'ImageObject',
          'url': LOGO_URL
        }
      },
      'datePublished': recipe.datePublished,
      'dateModified': recipe.dateModified,
      'recipeCategory': recipe.categoryLabel,
      'recipeCuisine': 'Phytothérapie & Herboristerie Moderne',
      'prepTime': `PT${recipe.prepTimeMinutes}M`,
      'cookTime': `PT${recipe.machineTimeMinutes}M`,
      'totalTime': `PT${recipe.totalTimeMinutes}M`,
      'recipeYield': `${recipe.yieldMl} ml d'extrait botanique standardisé`,
      'recipeIngredient': recipe.ingredients,
      'recipeInstructions': recipe.instructions.map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'text': step
      }))
    };
  } else {
    // Strictly Article for cosmetic recipes (Recipe is illegal for non-food recipes in Google Search guidelines)
    mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': recipe.title,
      'description': recipe.subtitle,
      'image': [fullImage],
      'author': {
        '@type': 'Organization',
        'name': 'Bloom by BotaniK',
        'url': DOMAIN
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Bloom by BotaniK',
        'logo': {
          '@type': 'ImageObject',
          'url': LOGO_URL
        }
      },
      'datePublished': recipe.datePublished,
      'dateModified': recipe.dateModified,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonical
      },
      'articleSection': recipe.categoryLabel
    };
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Accueil',
        'item': `${DOMAIN}/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Recettes',
        'item': `${DOMAIN}/recettes/`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': recipe.categoryLabel,
        'item': `${DOMAIN}/recettes/${recipe.categorySlug}/`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': recipe.title,
        'item': canonical
      }
    ]
  };

  const jsonLd = `<script type="application/ld+json" id="recipe-herbier-jsonld">\n${JSON.stringify(mainSchema, null, 2)}\n</script>\n<script type="application/ld+json" id="recipe-herbier-breadcrumb-jsonld">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n</script>`;

  const related = getHerbierRecipesByCategory(recipe.category)
    .filter(r => r.id !== recipe.id)
    .slice(0, 3);

  const dotsString = '●'.repeat(recipe.difficultyLevel) + '○'.repeat(5 - recipe.difficultyLevel);

  // 2. Initial Body HTML (Crawled by Googlebot)
  const bodyHtml = `
  <article class="bloom-recipe-canonical max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-[#3E4A3D]">
    <!-- Fil d'Ariane Crawlable -->
    <nav aria-label="Fil d'Ariane" class="mb-8 text-xs sm:text-sm text-[#3E4A3D]/60">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a href="/" class="hover:text-[#3E4A3D] underline">Accueil</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/recettes/" class="hover:text-[#3E4A3D] underline">Recettes botaniques</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/recettes/${recipe.categorySlug}/" class="hover:text-[#3E4A3D] underline">${recipe.categoryLabel}</a></li>
        <li aria-hidden="true">/</li>
        <li class="text-[#3E4A3D] font-medium" aria-current="page">${recipe.title}</li>
      </ol>
    </nav>

    <!-- Header Section -->
    <header class="mb-10">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <a href="/recettes/${recipe.categorySlug}/" class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#EAE5D9] text-[#3E4A3D] hover:bg-[#ded7c8] transition-colors">
          ${recipe.categoryLabel}
        </a>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300" aria-label="Niveau : ${recipe.difficultyLabel}">
          <span class="font-mono text-emerald-600">${dotsString}</span>
          <span>${recipe.difficultyLabel}</span>
        </span>
        <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#3E4A3D]/5 text-[#3E4A3D]/80 border border-[#3E4A3D]/10">
          Lot ${recipe.batchNumber} — Priorité ${recipe.batchPriority}
        </span>
        ${recipe.category === 'cosmetique' ? '<span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200">Usage externe exclusif</span>' : ''}
      </div>

      <h1 class="text-3xl sm:text-5xl font-serif font-bold text-[#3E4A3D] tracking-tight mb-4">
        ${recipe.title}
      </h1>

      <p class="text-lg sm:text-xl text-[#3E4A3D]/80 leading-relaxed font-light max-w-3xl mb-6">
        ${recipe.subtitle}
      </p>

      <!-- Métadonnées & Paramètres BloomLab® -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#3E4A3D]/50 font-bold">Préparation</span>
          <span class="text-lg font-bold text-[#3E4A3D]">${recipe.prepTimeMinutes} min</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#3E4A3D]/50 font-bold">Cycle BloomLab®</span>
          <span class="text-lg font-bold text-[#3E4A3D]">${recipe.machineTimeMinutes} min</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#3E4A3D]/50 font-bold">Températures A / B</span>
          <span class="text-lg font-bold text-[#3E4A3D]">${recipe.tempSachetA} / ${recipe.tempSachetB}</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#3E4A3D]/50 font-bold">Rendement</span>
          <span class="text-lg font-bold text-[#3E4A3D]">${recipe.yieldMl} ml</span>
        </div>
      </div>
    </header>

    <!-- Image Illustration -->
    <figure class="mb-12 rounded-3xl overflow-hidden border border-[#EAE5D9] bg-[#FAF7F2] shadow-sm">
      <img 
        src="${recipe.image}" 
        alt="${recipe.imageAlt}" 
        class="w-full h-72 sm:h-96 object-cover object-center" 
        loading="lazy" 
        width="1200" 
        height="630"
      />
      <figcaption class="p-3 text-xs text-center text-[#3E4A3D]/60 italic bg-white border-t border-[#EAE5D9]">
        ${recipe.title} — Formulation botanique et extraction de précision au standard Totum BloomLab®
      </figcaption>
    </figure>

    <!-- SECTION 1 : MÉMOIRE DU VIVANT (13 Registres de Tradition) -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] border border-[#D8CDBA]">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-[#3E4A3D] text-white">Mémoire du vivant</span>
        <span class="text-xs font-mono text-[#3E4A3D]/70">${recipe.heritage.register}</span>
      </div>
      <blockquote class="text-base sm:text-lg italic font-serif text-[#3E4A3D] mb-3 border-l-4 border-[#3E4A3D] pl-4">
        ${recipe.heritage.quote}
      </blockquote>
      <p class="text-sm text-[#3E4A3D]/80 leading-relaxed">
        ${recipe.heritage.description}
      </p>
    </section>

    <!-- SECTION 2 : DOCTRINA SIGNATURAE & TERRAINS CIBLES -->
    <section class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#3E4A3D]/60 mb-3 flex items-center gap-2">
          <span>🌿</span> Doctrina Signaturae
        </h2>
        <p class="text-xs font-mono text-emerald-800 font-semibold mb-2">${recipe.doctrinaSignaturae?.organTarget}</p>
        <p class="text-sm text-[#3E4A3D]/80 leading-relaxed mb-3">
          <strong>Morphologie :</strong> ${recipe.doctrinaSignaturae?.visualAspect}
        </p>
        <p class="text-xs text-[#3E4A3D]/70 italic">
          ${recipe.doctrinaSignaturae?.doctrineInterpretation}
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#3E4A3D]/60 mb-3 flex items-center gap-2">
          <span>🎯</span> Terrains & Axes Bloom
        </h2>
        <div class="flex flex-wrap gap-2 mb-4">
          ${recipe.terrains.map(t => `<a href="/academie/comprendre-le-corps/" class="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200 transition-colors">Terrain ${t}</a>`).join('')}
          ${recipe.axes.map(a => `<a href="/academie/axes/a1/" class="px-3 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors">Axe ${a}</a>`).join('')}
        </div>
        <p class="text-xs text-[#3E4A3D]/70 leading-relaxed">
          Cette formule est conçue pour rééquilibrer le terrain en soutenant les capacités d'autorégulation de l'organisme sans forcer les voies métaboliques.
        </p>
      </div>
    </section>

    <!-- SECTION 3 : INGRÉDIENTS & SÉQUENÇAGE SACHET A / B -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5D9] shadow-xs">
      <h2 class="text-2xl font-serif font-bold text-[#3E4A3D] mb-6">
        Ingrédients & Séquençage Biphasé
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Sachet A -->
        <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Sachet A — Phase Hydrosoluble</span>
            <span class="text-xs font-mono font-bold text-[#3E4A3D]">${recipe.tempSachetA}</span>
          </div>
          <p class="text-xs text-[#3E4A3D]/60 mb-2"><strong>Solvant :</strong> ${recipe.sachetA.solvent} (${recipe.sachetA.duration})</p>
          <ul class="text-sm text-[#3E4A3D] space-y-1 list-disc list-inside">
            ${recipe.sachetA.composition.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <!-- Sachet B -->
        <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Sachet B — Phase Lipophile</span>
            <span class="text-xs font-mono font-bold text-[#3E4A3D]">${recipe.tempSachetB}</span>
          </div>
          <p class="text-xs text-[#3E4A3D]/60 mb-2"><strong>Solvant :</strong> ${recipe.sachetB?.solvent || 'Solvant spécifique'} (${recipe.sachetB?.duration || '1h30'})</p>
          <ul class="text-sm text-[#3E4A3D] space-y-1 list-disc list-inside">
            ${(recipe.sachetB?.composition || ['Plantes complémentaires']).map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
      <p class="text-xs text-[#3E4A3D]/60 italic">
        * Matières végétales certifiées herboristerie, récoltées à maturité biologique sans traitement de synthèse.
      </p>
    </section>

    <!-- SECTION 4 : PROTOCOLE BLOOMLAB® EN 5 ÉTAPES -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5D9] shadow-xs">
      <h2 class="text-2xl font-serif font-bold text-[#3E4A3D] mb-6">
        Protocole Opératoire BloomLab®
      </h2>
      <ol class="space-y-4">
        ${recipe.instructions.map((step, idx) => `
          <li class="flex items-start gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE5D9]/60">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-[#3E4A3D] text-white flex items-center justify-center font-bold text-xs">
              ${idx + 1}
            </span>
            <span class="text-sm sm:text-base text-[#3E4A3D] leading-relaxed pt-0.5">
              ${step}
            </span>
          </li>
        `).join('')}
      </ol>
      <div class="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
        <strong>Conservation :</strong> ${recipe.shelfLife}.
      </div>
    </section>

    <!-- SECTION 5 : SIGNATURE MOLÉCULAIRE & NIVEAUX DE PREUVE -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5D9] shadow-xs">
      <h2 class="text-2xl font-serif font-bold text-[#3E4A3D] mb-4">
        Signature Moléculaire & Niveau de Preuve
      </h2>
      <p class="text-sm text-[#3E4A3D]/70 mb-6">
        Chaque affirmation scientifique du corpus Bloom est adossée à une nomenclature rigoureuse à 6 niveaux de preuve.
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="border-b border-[#EAE5D9] text-[#3E4A3D]/60 uppercase text-[11px] tracking-wider">
              <th class="py-3 px-3">Molécule Clé</th>
              <th class="py-3 px-3">Mécanisme d'Action</th>
              <th class="py-3 px-3">Niveau de Preuve</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EAE5D9]">
            ${recipe.molecularSignature.map(sig => `
              <tr>
                <td class="py-3 px-3 font-semibold text-[#3E4A3D]">${sig.molecule}</td>
                <td class="py-3 px-3 text-[#3E4A3D]/80">${sig.mechanism}</td>
                <td class="py-3 px-3 text-emerald-800 font-mono text-xs">${sig.evidenceLevel}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 6 : SAGESSE ANCIENNE VS SCIENCE MODERNE -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE5D9]">
      <h2 class="text-xl font-serif font-bold text-[#3E4A3D] mb-3">
        Sagesse Ancienne & Distinctions
      </h2>
      <p class="text-sm text-[#3E4A3D]/80 leading-relaxed mb-4">
        ${recipe.traditionalWisdom}
      </p>
      <p class="text-xs text-[#3E4A3D]/60 italic">
        Bloom réconcilie l'intuition pluriséculaire des maîtres herboristes et la validation biophysique contemporaine, sans confondre allégations thérapeutiques et confort physiologique.
      </p>
    </section>

    <!-- SECTION 7 : PRÉCAUTIONS, CONTRE-INDICATIONS & DGCCRF -->
    <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-amber-200/80">
      <h2 class="text-xl font-serif font-bold text-amber-950 mb-4 flex items-center gap-2">
        <span>⚠️</span> Précautions d'Emploi & Sécurité Réglementaire
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-amber-900 mb-6">
        <div>
          <strong class="block mb-1 text-amber-950">Précautions générales :</strong>
          <ul class="list-disc list-inside space-y-1">
            ${recipe.precautions.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div>
          <strong class="block mb-1 text-amber-950">Contre-indications majeures :</strong>
          <ul class="list-disc list-inside space-y-1">
            ${recipe.contraindications.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-white/80 border border-amber-300 text-xs text-amber-950 leading-relaxed">
        <strong>Avertissement réglementaire DGCCRF :</strong> ${recipe.safetyWarning}
      </div>
    </section>

    <!-- SECTION 8 : OBSERVATIONS ATTENDUES (Strictement Conditionnel) -->
    <section class="mb-12 p-6 rounded-2xl bg-white border border-[#EAE5D9]">
      <h3 class="text-sm font-bold uppercase tracking-wider text-[#3E4A3D]/60 mb-2">Observations Possibles</h3>
      <p class="text-sm text-[#3E4A3D]/80 leading-relaxed">
        ${recipe.observationsExpected}
      </p>
    </section>

    <!-- SECTION 9 : LIENS CONTEXTUELS & MAILLAGE INTERNE -->
    <section class="mb-12 p-6 rounded-3xl bg-[#FAF7F2] border border-[#EAE5D9]">
      <h3 class="text-base font-bold text-[#3E4A3D] mb-4">Pour approfondir votre démarche :</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <a href="${recipe.contextualLinks.bloomLabKit?.url || '/bloomlab/'}" class="p-3 rounded-xl bg-white border border-[#EAE5D9] text-[#3E4A3D] hover:border-[#3E4A3D] transition-colors flex items-center justify-between">
          <span>⚙️ ${recipe.contextualLinks.bloomLabKit?.name}</span>
          <span>→</span>
        </a>
        <a href="${recipe.contextualLinks.academyProtocol?.url || '/academie/comprendre-le-corps/'}" class="p-3 rounded-xl bg-white border border-[#EAE5D9] text-[#3E4A3D] hover:border-[#3E4A3D] transition-colors flex items-center justify-between">
          <span>🧠 ${recipe.contextualLinks.academyProtocol?.name}</span>
          <span>→</span>
        </a>
        <a href="/academie/herbier/" class="p-3 rounded-xl bg-white border border-[#EAE5D9] text-[#3E4A3D] hover:border-[#3E4A3D] transition-colors flex items-center justify-between">
          <span>🌿 Monographies de l'Herbier Bloom</span>
          <span>→</span>
        </a>
        <a href="/articles/comment-fabriquer-huiles-infusees-teintures-maison/" class="p-3 rounded-xl bg-white border border-[#EAE5D9] text-[#3E4A3D] hover:border-[#3E4A3D] transition-colors flex items-center justify-between">
          <span>📚 Guide des Solvants Nobles</span>
          <span>→</span>
        </a>
      </div>
    </section>

    <!-- SECTION 10 : RECETTES SIMILAIRES DANS LA MÊME CATÉGORIE -->
    <aside class="pt-8 border-t border-[#EAE5D9]">
      <h3 class="text-xl font-serif font-bold text-[#3E4A3D] mb-6">
        Autres formulations en ${recipe.categoryLabel}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        ${related.map(r => `
          <a href="${r.canonicalUrl}" class="group block p-4 rounded-2xl bg-white border border-[#EAE5D9] hover:shadow-md transition-all">
            <img src="${r.image}" alt="${r.title}" class="w-full h-36 object-cover rounded-xl mb-3" loading="lazy" />
            <span class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">Terrain ${r.terrains[0]}</span>
            <h4 class="font-bold text-sm text-[#3E4A3D] group-hover:text-emerald-800 transition-colors line-clamp-1">${r.title}</h4>
            <p class="text-xs text-[#3E4A3D]/70 line-clamp-2 mt-1">${r.subtitle}</p>
          </a>
        `).join('')}
      </div>
    </aside>

    <!-- Disclaimer Légal de Bas de Page -->
    <footer class="mt-12 pt-6 border-t border-[#EAE5D9] text-xs text-[#3E4A3D]/50 leading-relaxed text-center">
      ${LEGAL_DISCLAIMER}
    </footer>
  </article>
  `;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd,
    bodyHtml
  };
}

export function renderHerbierCategoryPageHtml(
  categorySlug: 'phytotherapie' | 'cosmetiques' | 'gastronomie',
  page: number = 1
): {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: string;
  bodyHtml: string;
} {
  const categoryKey = categorySlug === 'cosmetiques' ? 'cosmetique' : categorySlug;
  const recipes = getHerbierRecipesByCategory(categoryKey as any);
  const pageSize = 18;
  const totalPages = Math.ceil(recipes.length / pageSize) || 1;
  if (page < 1 || page > totalPages) {
    return null as any;
  }
  const currentPage = page;
  const pagedRecipes = recipes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const categoryLabel = categorySlug === 'phytotherapie' 
    ? 'Recettes de Phytothérapie'
    : categorySlug === 'cosmetiques'
    ? 'Recettes de Cosmétique Botanique'
    : 'Recettes de Gastronomie Botanique';

  const title = `${categoryLabel}${currentPage > 1 ? ` (Page ${currentPage})` : ''} | Bloom by BotaniK`;
  const metaDescription = `Découvrez notre collection complète de ${recipes.length} formulations en ${categoryLabel.toLowerCase()} : protocoles biphasés, paramètres BloomLab® et mémoire du vivant.`;
  const canonical = currentPage === 1 
    ? `${DOMAIN}/recettes/${categorySlug}/`
    : `${DOMAIN}/recettes/${categorySlug}/page/${currentPage}/`;

  const jsonLd = `
  <script type="application/ld+json" id="category-jsonld">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "${categoryLabel}",
    "description": "${metaDescription}",
    "url": "${canonical}",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": ${recipes.length},
      "itemListElement": [
        ${pagedRecipes.map((r, i) => `{
          "@type": "ListItem",
          "position": ${(currentPage - 1) * pageSize + i + 1},
          "url": "${DOMAIN}${r.canonicalUrl}",
          "name": "${r.title.replace(/"/g, '\\"')}"
        }`).join(',\n        ')}
      ]
    }
  }
  </script>
  `;

  const bodyHtml = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-[#3E4A3D]">
    <nav aria-label="Fil d'Ariane" class="mb-8 text-xs sm:text-sm text-[#3E4A3D]/60">
      <ol class="flex items-center gap-2">
        <li><a href="/" class="underline">Accueil</a></li>
        <li>/</li>
        <li><a href="/recettes/" class="underline">Recettes</a></li>
        <li>/</li>
        <li class="font-medium text-[#3E4A3D]" aria-current="page">${categoryLabel}</li>
      </ol>
    </nav>

    <header class="mb-10 text-center max-w-3xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-serif font-bold mb-4">${categoryLabel}</h1>
      <p class="text-base text-[#3E4A3D]/80 leading-relaxed font-light">${metaDescription}</p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      ${pagedRecipes.map(r => `
        <article class="p-5 rounded-2xl bg-white border border-[#EAE5D9] hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <img src="${r.image}" alt="${r.title}" class="w-full h-44 object-cover rounded-xl mb-4" loading="lazy" />
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                Terrain ${r.terrains[0]}
              </span>
              <span class="text-[10px] font-mono text-[#3E4A3D]/60">
                ${r.difficultyLabel}
              </span>
            </div>
            <h2 class="font-bold text-lg text-[#3E4A3D] mb-2 leading-snug">
              <a href="${r.canonicalUrl}" class="hover:text-emerald-800 transition-colors">${r.title}</a>
            </h2>
            <p class="text-xs text-[#3E4A3D]/70 line-clamp-3 mb-4">${r.subtitle}</p>
          </div>
          <div class="pt-4 border-t border-[#EAE5D9]/60 flex items-center justify-between text-xs">
            <span class="font-mono text-[#3E4A3D]/60">${r.totalTimeMinutes} min</span>
            <a href="${r.canonicalUrl}" class="font-bold text-[#3E4A3D] hover:text-emerald-800 flex items-center gap-1">
              <span>Voir le protocole</span>
              <span>→</span>
            </a>
          </div>
        </article>
      `).join('')}
    </div>

    <!-- Pagination -->
    ${totalPages > 1 ? `
      <nav aria-label="Pagination" class="flex justify-center items-center gap-2 pt-6 border-t border-[#EAE5D9]">
        ${Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const pageUrl = pageNum === 1 ? `/recettes/${categorySlug}/` : `/recettes/${categorySlug}/page/${pageNum}/`;
          const isCurrent = pageNum === currentPage;
          return `
            <a href="${pageUrl}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold ${isCurrent ? 'bg-[#3E4A3D] text-white' : 'bg-[#FAF7F2] text-[#3E4A3D] hover:bg-[#EAE5D9]'}">
              ${pageNum}
            </a>
          `;
        }).join('')}
      </nav>
    ` : ''}
  </div>
  `;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd,
    bodyHtml
  };
}
