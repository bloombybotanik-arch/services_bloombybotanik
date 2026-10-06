/**
 * BLOOM BY BOTANIK — RENDU SSR & SEO DES RECETTES PUBLIQUES
 * 
 * Génère le balisage HTML complet, crawlable par Googlebot, avec :
 * - URLs canoniques strictes
 * - Données structurées Schema.org :
 *     * Recipe (pour culinaire UNIQUEMENT)
 *     * Article (pour cosmétique et parcours guidé, JAMAIS Recipe)
 *     * BreadcrumbList & ItemList
 * - Parité HTML initial et HTML rendu
 * - Vrais liens <a> pour l'exploration
 * - Avertissements de sécurité et disclaimers conformes
 */

import {
  CanonicalRecipe,
  CANONICAL_RECIPES,
  CATEGORY_METADATA,
  getRecipeByPath,
  RECIPES_BY_CATEGORY
} from '../data/canonicalRecipesRegistry';

const DOMAIN = 'https://bloombybotanik.com';
const LOGO_URL = `${DOMAIN}/assets/img/logo-bloom-square-512.png`;
const LEGAL_DISCLAIMER = `Les contenus Bloom sont éducatifs. Ils ne remplacent pas un avis médical, dermatologique, pharmaceutique ou nutritionnel. En cas de grossesse, allaitement, allergie, traitement, maladie chronique ou symptôme persistant, demandez conseil à un professionnel de santé.`;

export function renderRecipePageHtml(recipe: CanonicalRecipe): {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: string;
  bodyHtml: string;
} {
  const title = `${recipe.title} | Recette Botanique Bloom`;
  const metaDescription = `${recipe.summary.slice(0, 150)}... Formule d'extraction botanique BloomLab®, niveau ${recipe.difficultyLabel}, temps : ${recipe.totalTimeMinutes} min.`;
  const canonical = `${DOMAIN}${recipe.canonicalUrl}`;
  const fullImage = recipe.image.startsWith('http') ? recipe.image : `${DOMAIN}${recipe.image}`;

  // 1. JSON-LD Structured Data
  let mainSchema: any;
  if (recipe.schemaType === 'Recipe') {
    mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      'name': recipe.title,
      'description': recipe.summary,
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
      'recipeCuisine': 'Botanique & Herboristerie',
      'prepTime': `PT${recipe.activeTimeMinutes}M`,
      'cookTime': `PT${recipe.machineTimeMinutes}M`,
      'totalTime': `PT${recipe.totalTimeMinutes}M`,
      'recipeYield': recipe.dosageOrUsage || '1 préparation BloomLab®',
      'recipeIngredient': recipe.ingredients,
      'recipeInstructions': recipe.instructions.map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'text': step
      }))
    };
  } else {
    // Strictly Article for cosmetic and guided paths
    mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': recipe.title,
      'description': recipe.summary,
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

  const jsonLd = `<script type="application/ld+json" id="recipe-jsonld">\n${JSON.stringify(mainSchema, null, 2)}\n</script>\n<script type="application/ld+json" id="recipe-breadcrumb-jsonld">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n</script>`;

  // Related recipes in same category
  const related = RECIPES_BY_CATEGORY[recipe.category]
    .filter(r => r.id !== recipe.id)
    .slice(0, 3);

  const dotsString = '●'.repeat(recipe.difficultyLevel) + '○'.repeat(5 - recipe.difficultyLevel);

  // 2. Initial Body HTML (Crawled by Googlebot)
  const bodyHtml = `
  <div class="bloom-recipe-container max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-[#0F261E]">
    <!-- Fil d'Ariane Crawlable -->
    <nav aria-label="Fil d'Ariane" class="mb-8 text-xs sm:text-sm text-[#0F261E]/60">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a href="/" class="hover:text-[#0F261E] underline">Accueil</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/recettes/" class="hover:text-[#0F261E] underline">Recettes botaniques</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/recettes/${recipe.categorySlug}/" class="hover:text-[#0F261E] underline">${recipe.categoryLabel}</a></li>
        <li aria-hidden="true">/</li>
        <li class="text-[#0F261E] font-medium" aria-current="page">${recipe.title}</li>
      </ol>
    </nav>

    <!-- En-tête Recette -->
    <header class="mb-10">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <a href="/recettes/${recipe.categorySlug}/" class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#EAE5D9] text-[#0F261E] hover:bg-[#ded7c8] transition-colors">
          ${recipe.categoryLabel}
        </a>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300" aria-label="Difficulté technique : ${recipe.difficultyLabel} (${recipe.difficultyLevel} sur 5)">
          <span class="font-mono">${dotsString}</span>
          <span>${recipe.difficultyLabel} (Score ${recipe.difficultyFinalScore}/100)</span>
        </span>
        ${recipe.category === 'cosmetique' ? '<span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200">Usage externe</span>' : ''}
        ${recipe.category === 'parcours-guide' ? '<span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">Atelier éducatif non médical</span>' : ''}
      </div>

      <h1 class="text-3xl sm:text-5xl font-serif font-bold text-[#0F261E] tracking-tight mb-4">
        ${recipe.title}
      </h1>

      <p class="text-lg sm:text-xl text-[#0F261E]/80 leading-relaxed font-light max-w-3xl mb-6">
        ${recipe.summary}
      </p>

      <!-- Métriques Clés -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#0F261E]/50 font-bold">Temps actif</span>
          <span class="text-lg font-bold text-[#0F261E]">${recipe.activeTimeMinutes} min</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#0F261E]/50 font-bold">Cycle BloomLab®</span>
          <span class="text-lg font-bold text-[#0F261E]">${recipe.machineTimeMinutes} min</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#0F261E]/50 font-bold">Durée totale</span>
          <span class="text-lg font-bold text-[#0F261E]">${recipe.totalTimeMinutes} min</span>
        </div>
        <div>
          <span class="block text-xs uppercase tracking-wider text-[#0F261E]/50 font-bold">Température</span>
          <span class="text-lg font-bold text-[#0F261E]">${recipe.temperatures}</span>
        </div>
      </div>
    </header>

    <!-- Image principale -->
    <div class="mb-12 rounded-3xl overflow-hidden border border-[#EAE5D9] shadow-sm max-h-[460px] bg-[#FAF7F2]">
      <img 
        src="${recipe.image}" 
        alt="${recipe.imageAlt}" 
        width="1200" 
        height="630" 
        class="w-full h-full object-cover" 
        loading="eager"
      />
    </div>

    <!-- Contenu Principal : Ingrédients & Instructions -->
    <div class="grid md:grid-cols-3 gap-10 mb-12">
      <!-- Ingrédients & Matériel -->
      <aside class="md:col-span-1 space-y-8">
        <section class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9]">
          <h2 class="text-xl font-serif font-bold text-[#0F261E] mb-4 flex items-center gap-2">
            Ingrédients (${recipe.ingredientCount})
          </h2>
          <ul class="space-y-2.5 text-sm text-[#0F261E]/80">
            ${recipe.ingredients.map(ing => `<li class="flex items-start gap-2"><span class="text-emerald-700 font-bold">•</span><span>${ing}</span></li>`).join('\n')}
          </ul>
        </section>

        <section class="p-6 rounded-2xl bg-white border border-[#EAE5D9]">
          <h3 class="text-lg font-serif font-bold text-[#0F261E] mb-3">
            Matériel requis
          </h3>
          <ul class="space-y-2 text-sm text-[#0F261E]/80">
            ${recipe.materialsNeeded.map(m => `<li class="flex items-start gap-2"><span class="text-[#c9a84c]">✔</span><span>${m}</span></li>`).join('\n')}
          </ul>
        </section>

        <!-- Conservation & Précautions -->
        <section class="p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
          <h3 class="text-lg font-serif font-bold text-amber-950 mb-3">
            Conservation & Sécurité
          </h3>
          <p class="text-sm text-amber-900/80 mb-3">
            <strong>Conditionnement :</strong> ${recipe.conservationRequirement}
          </p>
          ${recipe.allergensOrPrecautions.length > 0 ? `
            <ul class="space-y-1.5 text-xs text-amber-950">
              ${recipe.allergensOrPrecautions.map(p => `<li>⚠️ ${p}</li>`).join('\n')}
            </ul>
          ` : ''}
          ${recipe.category === 'cosmetique' ? '<p class="mt-3 text-xs text-rose-900 font-semibold">Test de tolérance cutanée recommandé : appliquer une goutte au creux du coude 48h avant utilisation.</p>' : ''}
        </section>
      </aside>

      <!-- Protocole Pas à Pas -->
      <section class="md:col-span-2 space-y-6">
        <div class="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAE5D9] shadow-xs">
          <h2 class="text-2xl font-serif font-bold text-[#0F261E] mb-6">
            Protocole d'extraction pas à pas
          </h2>
          <ol class="space-y-5">
            ${recipe.instructions.map((step, idx) => `
              <li class="flex items-start gap-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-[#EAE5D9] text-[#0F261E] font-bold text-sm flex items-center justify-center">
                  ${idx + 1}
                </span>
                <div class="flex-1 pt-1 text-sm sm:text-base text-[#0F261E]/85 leading-relaxed">
                  ${step}
                </div>
              </li>
            `).join('\n')}
          </ol>

          ${recipe.dosageOrUsage ? `
            <div class="mt-8 pt-6 border-t border-[#EAE5D9]">
              <h3 class="text-lg font-bold text-[#0F261E] mb-2">Conseils d'utilisation & dosage</h3>
              <p class="text-sm text-[#0F261E]/80">${recipe.dosageOrUsage}</p>
            </div>
          ` : ''}

          ${recipe.bloomNote ? `
            <div class="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
              <strong>Note de l'herboriste Bloom :</strong> ${recipe.bloomNote}
            </div>
          ` : ''}
        </div>

        <!-- Décharge Légale Vocation Éducative -->
        <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
          <p><strong>Avertissement :</strong> ${LEGAL_DISCLAIMER}</p>
        </div>
      </section>
    </div>

    <!-- Recettes associées de la catégorie -->
    ${related.length > 0 ? `
      <section class="mt-16 pt-12 border-t border-[#EAE5D9]">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-serif font-bold text-[#0F261E]">
            Autres recettes de la catégorie ${recipe.categoryLabel}
          </h2>
          <a href="/recettes/${recipe.categorySlug}/" class="text-sm font-bold text-emerald-800 hover:underline">
            Voir toute la catégorie &rarr;
          </a>
        </div>
        <div class="grid sm:grid-cols-3 gap-6">
          ${related.map(r => `
            <article class="rounded-2xl border border-[#EAE5D9] bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <a href="${r.canonicalUrl}" class="block group">
                <div class="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                  <img src="${r.image}" alt="${r.imageAlt}" width="400" height="250" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div class="p-5">
                  <div class="flex items-center justify-between text-xs text-[#0F261E]/60 mb-2">
                    <span>${r.difficultyLabel}</span>
                    <span>${r.totalTimeMinutes} min</span>
                  </div>
                  <h3 class="font-serif font-bold text-base text-[#0F261E] group-hover:text-emerald-800 transition-colors line-clamp-2">
                    ${r.title}
                  </h3>
                </div>
              </a>
            </article>
          `).join('\n')}
        </div>
      </section>
    ` : ''}
  </div>
  `;

  return { title, metaDescription, canonical, jsonLd, bodyHtml };
}

export function renderCategoryPageHtml(categoryKey: 'culinaires' | 'cosmetiques' | 'parcours-botaniques', pageNumber: number = 1): {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: string;
  bodyHtml: string;
} {
  const catMeta = CATEGORY_METADATA[categoryKey];
  const allRecipes = RECIPES_BY_CATEGORY[catMeta.id];
  const totalRecipes = allRecipes.length;
  const pageSize = catMeta.pageSize;
  const totalPages = Math.ceil(totalRecipes / pageSize);
  const currentPage = Math.max(1, Math.min(pageNumber, totalPages));

  const startIdx = (currentPage - 1) * pageSize;
  const pageRecipes = allRecipes.slice(startIdx, startIdx + pageSize);

  const canonical = currentPage === 1 
    ? `${DOMAIN}${catMeta.url}` 
    : `${DOMAIN}/recettes/${catMeta.slug}/page/${currentPage}/`;

  const pageTitleSuffix = currentPage > 1 ? ` — Page ${currentPage}` : '';
  const title = `${catMeta.title}${pageTitleSuffix}`;
  const metaDescription = `${catMeta.metaDescription} (Page ${currentPage}/${totalPages}). Consultez l'ensemble des formules détaillées avec BloomLab®.`;

  // Pagination URLs
  const prevUrl = currentPage === 2 
    ? catMeta.url 
    : currentPage > 2 
      ? `/recettes/${catMeta.slug}/page/${currentPage - 1}/` 
      : null;
  const nextUrl = currentPage < totalPages 
    ? `/recettes/${catMeta.slug}/page/${currentPage + 1}/` 
    : null;

  // ItemList Schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': catMeta.title,
    'description': catMeta.metaDescription,
    'itemListElement': pageRecipes.map((r, idx) => ({
      '@type': 'ListItem',
      'position': startIdx + idx + 1,
      'url': `${DOMAIN}${r.canonicalUrl}`,
      'name': r.title
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': `${DOMAIN}/` },
      { '@type': 'ListItem', 'position': 2, 'name': 'Recettes', 'item': `${DOMAIN}/recettes/` },
      { '@type': 'ListItem', 'position': 3, 'name': catMeta.h1, 'item': `${DOMAIN}${catMeta.url}` }
    ]
  };

  const jsonLd = `<script type="application/ld+json" id="category-itemlist-jsonld">\n${JSON.stringify(itemListSchema, null, 2)}\n</script>\n<script type="application/ld+json" id="category-breadcrumb-jsonld">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n</script>`;

  const bodyHtml = `
  <div class="bloom-category-container max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-[#0F261E]">
    <!-- Fil d'Ariane -->
    <nav aria-label="Fil d'Ariane" class="mb-8 text-xs sm:text-sm text-[#0F261E]/60">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a href="/" class="hover:text-[#0F261E] underline">Accueil</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/recettes/" class="hover:text-[#0F261E] underline">Recettes botaniques</a></li>
        <li aria-hidden="true">/</li>
        <li class="text-[#0F261E] font-medium" aria-current="page">${catMeta.h1}</li>
      </ol>
    </nav>

    <!-- En-tête Catégorie -->
    <header class="mb-12">
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#EAE5D9] text-[#0F261E]">
          Catégorie Botanique • ${totalRecipes} préparations
        </span>
        ${catMeta.id === 'cosmetique' ? '<span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200">Usage externe</span>' : ''}
        ${catMeta.id === 'parcours-guide' ? '<span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">Ateliers éducatifs</span>' : ''}
      </div>

      <h1 class="text-3xl sm:text-5xl font-serif font-bold text-[#0F261E] mb-6">
        ${catMeta.h1}
      </h1>

      <p class="text-base sm:text-lg text-[#0F261E]/80 leading-relaxed font-light max-w-4xl mb-8">
        ${catMeta.intro}
      </p>

      <!-- Navigation Catégories Sœurs & Hub -->
      <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EAE5D9]">
        <span class="text-xs uppercase tracking-wider font-bold text-[#0F261E]/50 mr-2">Catégories :</span>
        <a href="/recettes/" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600 transition-colors">
          Toutes (${CANONICAL_RECIPES.length})
        </a>
        <a href="/recettes/culinaires/" class="px-3.5 py-1.5 rounded-full text-xs font-semibold ${catMeta.slug === 'culinaires' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'} transition-colors">
          Culinaires (${CATEGORY_METADATA.culinaires.totalRecipes})
        </a>
        <a href="/recettes/cosmetiques/" class="px-3.5 py-1.5 rounded-full text-xs font-semibold ${catMeta.slug === 'cosmetiques' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'} transition-colors">
          Cosmétiques (${CATEGORY_METADATA.cosmetiques.totalRecipes})
        </a>
        <a href="/recettes/parcours-botaniques/" class="px-3.5 py-1.5 rounded-full text-xs font-semibold ${catMeta.slug === 'parcours-botaniques' ? 'bg-[#0F261E] text-white' : 'bg-white border border-[#EAE5D9] text-[#0F261E] hover:border-emerald-600'} transition-colors">
          Parcours guidés (${CATEGORY_METADATA['parcours-botaniques'].totalRecipes})
        </a>
      </div>
    </header>

    <!-- Grille des Recettes Publiques -->
    <main>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        ${pageRecipes.map(r => {
          const dots = '●'.repeat(r.difficultyLevel) + '○'.repeat(5 - r.difficultyLevel);
          return `
          <article class="group bg-white rounded-3xl border border-[#EAE5D9] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <a href="${r.canonicalUrl}" class="block overflow-hidden relative aspect-[16/10] bg-[#FAF7F2]">
              <img 
                src="${r.image}" 
                alt="${r.imageAlt}" 
                width="600" 
                height="375" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                <span class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/95 text-[#0F261E] shadow-xs">
                  ${r.subcategory || r.categoryLabel}
                </span>
              </div>
            </a>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between text-xs text-[#0F261E]/70 mb-2.5 font-medium">
                  <span class="inline-flex items-center gap-1">
                    <span class="font-mono text-emerald-700">${dots}</span>
                    <span>${r.difficultyLabel}</span>
                  </span>
                  <span>${r.totalTimeMinutes} min • ${r.ingredientCount} ing.</span>
                </div>

                <h2 class="text-xl font-serif font-bold text-[#0F261E] group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                  <a href="${r.canonicalUrl}">
                    ${r.title}
                  </a>
                </h2>

                <p class="text-xs sm:text-sm text-[#0F261E]/70 line-clamp-2 leading-relaxed">
                  ${r.summary}
                </p>
              </div>

              <div class="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#0F261E]/40 font-bold uppercase">
                  ${r.temperatures}
                </span>
                <a href="${r.canonicalUrl}" class="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Consulter la fiche &rarr;
                </a>
              </div>
            </div>
          </article>
          `;
        }).join('\n')}
      </div>

      <!-- Pagination Crawlable -->
      ${totalPages > 1 ? `
        <nav aria-label="Pagination des recettes" class="flex items-center justify-between pt-8 border-t border-[#EAE5D9] text-sm">
          <div>
            ${prevUrl ? `<a href="${prevUrl}" rel="prev" class="px-4 py-2 rounded-xl bg-white border border-[#EAE5D9] font-medium text-[#0F261E] hover:bg-[#FAF7F2] transition-colors">&larr; Page précédente</a>` : '<span class="text-[#0F261E]/30">&larr; Page précédente</span>'}
          </div>
          <div class="text-[#0F261E]/70 font-medium">
            Page ${currentPage} sur ${totalPages}
          </div>
          <div>
            ${nextUrl ? `<a href="${nextUrl}" rel="next" class="px-4 py-2 rounded-xl bg-white border border-[#EAE5D9] font-medium text-[#0F261E] hover:bg-[#FAF7F2] transition-colors">Page suivante &rarr;</a>` : '<span class="text-[#0F261E]/30">Page suivante &rarr;</span>'}
          </div>
        </nav>
      ` : ''}
    </main>

    <!-- Disclaimer légal -->
    <footer class="mt-16 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
      <p><strong>Avertissement :</strong> ${LEGAL_DISCLAIMER}</p>
    </footer>
  </div>
  `;

  return { title, metaDescription, canonical, jsonLd, bodyHtml };
}

export function renderHubPageHtml(): {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: string;
  bodyHtml: string;
} {
  const title = 'Recettes botaniques : cuisine et cosmétique maison | Bloom';
  const metaDescription = "Catalogue public des recettes et formulations botaniques BloomLab® : extractions gastronomiques, soins cosmétiques externes et ateliers d'herboristerie.";
  const canonical = `${DOMAIN}/recettes/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': `${DOMAIN}/` },
      { '@type': 'ListItem', 'position': 2, 'name': 'Recettes botaniques', 'item': canonical }
    ]
  };

  const jsonLd = `<script type="application/ld+json" id="hub-breadcrumb-jsonld">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n</script>`;

  const featuredRecipes = CANONICAL_RECIPES.slice(0, 12);

  const bodyHtml = `
  <div class="bloom-hub-container max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-[#0F261E]">
    <!-- Fil d'Ariane -->
    <nav aria-label="Fil d'Ariane" class="mb-8 text-xs sm:text-sm text-[#0F261E]/60">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a href="/" class="hover:text-[#0F261E] underline">Accueil</a></li>
        <li aria-hidden="true">/</li>
        <li class="text-[#0F261E] font-medium" aria-current="page">Recettes botaniques</li>
      </ol>
    </nav>

    <!-- En-tête Hub -->
    <header class="mb-14">
      <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#EAE5D9] text-[#0F261E] mb-4">
        Bibliothèque de formulations • ${CANONICAL_RECIPES.length} recettes publiques
      </span>
      <h1 class="text-3xl sm:text-5xl font-serif font-bold text-[#0F261E] mb-6">
        Recettes botaniques : cuisine et cosmétique maison
      </h1>
      <p class="text-base sm:text-xl text-[#0F261E]/80 leading-relaxed font-light max-w-3xl">
        Explorez nos protocoles d'extraction végétale à domicile. Du totum des plantes aux huiles de finition gastronomiques, en passant par les macérats de soin cutané, chaque recette est calibrée pour restituer la quintessence des principes actifs grâce à la précision thermique et cinétique de BloomLab®.
      </p>
    </header>

    <!-- 3 Cartes Catégories Piliers -->
    <section class="grid md:grid-cols-3 gap-8 mb-16" aria-label="Catégories de recettes">
      <!-- Culinaire -->
      <article class="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE5D9] flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[#92400e]/10 text-[#92400e] mb-4">
            ${CATEGORY_METADATA.culinaires.totalRecipes} recettes
          </span>
          <h2 class="text-2xl font-serif font-bold text-[#0F261E] mb-3">
            <a href="/recettes/culinaires/" class="hover:underline">
              Recettes culinaires botaniques
            </a>
          </h2>
          <p class="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
            Huiles aromatiques de finition, vinaigres vivants, beurres infusés et miels botaniques sans dégradation thermique des arômes.
          </p>
        </div>
        <a href="/recettes/culinaires/" class="inline-flex items-center gap-2 font-bold text-sm text-emerald-800 hover:text-emerald-950">
          Explorer les recettes culinaires &rarr;
        </a>
      </article>

      <!-- Cosmétique -->
      <article class="p-8 rounded-3xl bg-rose-50/40 border border-rose-200/60 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 mb-4">
            ${CATEGORY_METADATA.cosmetiques.totalRecipes} soins • Usage externe
          </span>
          <h2 class="text-2xl font-serif font-bold text-[#0F261E] mb-3">
            <a href="/recettes/cosmetiques/" class="hover:underline">
              Recettes cosmétiques botaniques
            </a>
          </h2>
          <p class="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
            Sérums bi-phase, huiles de soin, baumes protecteurs et macérats actifs pour nourrir et régénérer la peau sans conservateurs agressifs.
          </p>
        </div>
        <a href="/recettes/cosmetiques/" class="inline-flex items-center gap-2 font-bold text-sm text-rose-900 hover:text-rose-950">
          Explorer les soins cosmétiques &rarr;
        </a>
      </article>

      <!-- Parcours Botaniques -->
      <article class="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-900 mb-4">
            ${CATEGORY_METADATA['parcours-botaniques'].totalRecipes} parcours guidés
          </span>
          <h2 class="text-2xl font-serif font-bold text-[#0F261E] mb-3">
            <a href="/recettes/parcours-botaniques/" class="hover:underline">
              Parcours botaniques guidés
            </a>
          </h2>
          <p class="text-sm text-[#0F261E]/75 leading-relaxed mb-6">
            Ateliers techniques et éducatifs pour appréhender l'extraction séquentielle, les solvants multiples et le totum végétal à la maison.
          </p>
        </div>
        <a href="/recettes/parcours-botaniques/" class="inline-flex items-center gap-2 font-bold text-sm text-emerald-900 hover:text-emerald-950">
          Explorer les ateliers &rarr;
        </a>
      </article>
    </section>

    <!-- Sélection de Formulations Publiques -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#0F261E]">
          Sélection de recettes récentes
        </h2>
        <span class="text-sm text-[#0F261E]/60">Affichage de 12 recettes</span>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${featuredRecipes.map(r => {
          const dots = '●'.repeat(r.difficultyLevel) + '○'.repeat(5 - r.difficultyLevel);
          return `
          <article class="group bg-white rounded-3xl border border-[#EAE5D9] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <a href="${r.canonicalUrl}" class="block overflow-hidden relative aspect-[16/10] bg-[#FAF7F2]">
              <img 
                src="${r.image}" 
                alt="${r.imageAlt}" 
                width="600" 
                height="375" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/95 text-[#0F261E] shadow-xs">
                  ${r.categoryLabel}
                </span>
              </div>
            </a>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between text-xs text-[#0F261E]/70 mb-2 font-medium">
                  <span class="inline-flex items-center gap-1 font-mono text-emerald-700">
                    ${dots} ${r.difficultyLabel}
                  </span>
                  <span>${r.totalTimeMinutes} min</span>
                </div>

                <h3 class="text-xl font-serif font-bold text-[#0F261E] group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                  <a href="${r.canonicalUrl}">
                    ${r.title}
                  </a>
                </h3>

                <p class="text-xs sm:text-sm text-[#0F261E]/70 line-clamp-2 leading-relaxed">
                  ${r.summary}
                </p>
              </div>

              <div class="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                <span class="text-xs text-[#0F261E]/50 font-bold">
                  ${r.ingredientCount} ingrédients
                </span>
                <a href="${r.canonicalUrl}" class="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Découvrir &rarr;
                </a>
              </div>
            </div>
          </article>
          `;
        }).join('\n')}
      </div>
    </section>

    <!-- Footer Disclaimers -->
    <footer class="mt-16 p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D9] text-xs text-[#0F261E]/60 leading-relaxed">
      <p><strong>Avertissement :</strong> ${LEGAL_DISCLAIMER}</p>
    </footer>
  </div>
  `;

  return { title, metaDescription, canonical, jsonLd, bodyHtml };
}
