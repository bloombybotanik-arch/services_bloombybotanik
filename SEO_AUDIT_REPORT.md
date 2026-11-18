# Rapport d'Audit SEO / SEA — Bloom by BotaniK (`bloombybotanik.com`)

**Date de l'audit :** 18 novembre 2026  
**Périmètre :** Indexabilité technique, balisage On-Page (`server.ts`, `index.html`, `src/utils/seoManager.ts`), pertinence sémantique de marque (`Bloom by BotaniK` / `BloomLab®`), maillage interne et validation serveur SSR/CSR.

---

## 1. Statut Global & Résolution du Problème d'Indexation

L'audit complet a identifié et corrigé les causes structurelles pouvant bloquer ou diluer l'indexation de `bloombybotanik.com` sur les requêtes de marque (**« Bloom by BotaniK »**, **« BloomLab »**) :

1. **Rendu HTML Serveur (`#root`) pour les robots d'indexation** : `registerCatchAll` + `injectServerSEO` dans `server.ts` injectaient auparavant les balises `<head>` mais laissaient `<div id="root"></div>` vide avant hydratation JS. Un fallback HTML sémantique (navigation `<nav>` avec liens internes, `<h1>`, paragraphe descriptif et fiche produit) est désormais injecté dans `#root` pour toutes les pages indexables, puis remplacé proprement par React au montage.
2. **Cohérence `robots`, `canonical` et `hreflang`** :
   - Suppression des liens `hreflang="en"` et `hreflang="de"` pointant vers `/en` et `/de` non servis côté SSR ; mise en place de `hreflang="fr"` et `hreflang="x-default"` auto-référençants vers l'URL canonique exacte.
   - Conservation stricte de `index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1` sur toutes les pages publiques, et bascule `noindex, nofollow` uniquement sur les routes privées/transactionnelles (`/admin/`, `/panier/`, `/checkout/`, `/commande/`, `/compte/`, `/activation/`, `/en-attente/`, `/newsletter/`).
3. **Suppression des redirections 301 conflictuelles** : suppression des anciennes redirections sur `/contact` et `/academie/comprendre-le-modele-bloom` afin que chaque page cible réponde directement en `HTTP 200` avec sa propre canonique.
4. **Uniformisation Marque & Produit (`Bloom by BotaniK` + `BloomLab®`)** : renforcement systématique de la co-occurrence marque/produit dans les `<title>`, `<meta name="description">`, `<h1>` et les 100 premiers mots de la page d'accueil.

---

## 2. Vérification `robots.txt` & `sitemap.xml`

### `public/robots.txt` (Statut : Conforme — HTTP 200)
```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /panier
Disallow: /commande
Disallow: /checkout
Disallow: /compte
Disallow: /activation
Disallow: /en-attente
Disallow: /newsletter/
Disallow: /api/

Sitemap: https://bloombybotanik.com/sitemap.xml
Sitemap: https://bloombybotanik.com/sitemap-fr.xml
Sitemap: https://bloombybotanik.com/sitemap-recettes.xml
Sitemap: https://bloombybotanik.com/sitemap-images.xml
```

### `public/sitemap.xml` & `public/sitemap-fr.xml` (Statut : Conforme — HTTP 200)
- `public/sitemap.xml` agit comme `<sitemapindex>` et référence `sitemap-fr.xml` (mis à jour au `2026-11-18`), `sitemap-en.xml`, `sitemap-de.xml`, `sitemap-recettes.xml`, et `sitemap-images.xml`.
- `public/sitemap-fr.xml` contient **42 URLs canoniques françaises**, incluant explicitement toutes les URLs stratégiques vérifiées :
  - `https://bloombybotanik.com/`
  - `https://bloombybotanik.com/bloomlab/`
  - `https://bloombybotanik.com/infusion-botanique/` *(ajouté lors de l'audit)*
  - `https://bloombybotanik.com/extraction-botanique/`
  - `https://bloombybotanik.com/reset-homeostasique/` *(ajouté lors de l'audit)*
  - `https://bloombybotanik.com/boutique/`
  - `https://bloombybotanik.com/boutique/kits/`
  - `https://bloombybotanik.com/guide-solvants/`

---

## 3. Inventaire des Balises `<title>` et `<meta name="description">` par Route

Toutes les routes ci-dessous sont servies côté serveur (`SERVER_SEO_ROUTES` dans `server.ts`) et synchronisées côté client (`src/utils/seoManager.ts`), sans aucune occurrence de valeur par défaut `"indexbis"` ou `"home"`.

### Accueil & Pages Piliers
| Route | `<title>` | `<meta name="description">` |
| :--- | :--- | :--- |
| `/` | `Bloom by BotaniK \| Extracteur Botanique de Précision & Infusion Végétale Maîtrisée` | `Bloom by BotaniK conçoit BloomLab®, l'extracteur et infuseur botanique de précision. Vortex cinétique et thermorégulation ±0,5°C pour extraire le Totum actif.` |
| `/infusion-botanique/` | `Infusion Botanique Maison : Guide Complet & Bienfaits \| Bloom` | `Découvrez l'art de l'infusion botanique de précision. Températures, solvants et recettes pour préserver le Totum végétal et booster vos bienfaits.` |
| `/extraction-botanique/` | `Extraction Botanique : Méthodes & Séquençage A/B \| Bloom` | `Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.` |
| `/guide-solvants/` | `Guide des Solvants d'Extraction : Eau, Huile, Alcool \| Bloom` | `Eau, huile végétale, alcool, glycérine : comprenez la polarité et les affinités de chaque solvant pour libérer le Totum Végétal et maîtriser vos extractions botaniques.` |
| `/reset-homeostasique/` | `Reset Homéostasique : Accordage Systémique en 6 Phases \| Bloom` | `Comprenez la charge allostatique et explorez l'accordage biologique en 6 phases pour soutenir les boucles d'autorégulation du terrain.` |
| `/academie/reset-homeostasique/` | `Reset Homéostasique : Protocoles de Drainage & Terrain \| Bloom` | `Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.` |
| `/la-marque/` | `La Marque Bloom by BotaniK \| Terroirs & Exigence` | `Découvrez l'histoire de Bloom by BotaniK : sélection rigoureuse des plantes brutes, conception française des protocoles et transparence scientifique.` |
| `/manifeste/` | `Manifeste Bloom \| Souveraineté Sanitaire & Plantes` | `Manifeste Bloom by BotaniK : souveraineté sanitaire, ingénierie biologique et réconciliation entre rigueur scientifique et sagesse végétale ancestrale.` |
| `/contact/` | `Contact & Assistance Botanique \| Bloom by BotaniK` | `Une question sur BloomLab® ou nos kits botaniques ? Contactez nos conseillers en phytothérapie. Équipe basée en France, réponse sous 24 à 48 heures.` |

### Produits, Boutique & Abonnement (Co-occurrence Marque + Produit vérifiée)
| Route | `<title>` | `<meta name="description">` |
| :--- | :--- | :--- |
| `/bloomlab/` | `BloomLab® Extracteur Botanique de Précision \| Bloom by BotaniK` | `La BloomLab® de Bloom by BotaniK est l'extracteur de plantes qui préserve le Totum végétal : thermorégulation ±0,5°C et vortex cinétique.` |
| `/produit/bloomlab/` | `BloomLab® Extracteur Inox 304 ±0,5°C \| Bloom by BotaniK` | `Commandez l'extracteur botanique BloomLab® de Bloom by BotaniK. Inox chirurgical 304, vortex cinétique et thermorégulation ±0,5°C.` |
| `/boutique/bloomlab/` | `Acheter BloomLab® Officiel \| Garantie 1 An — Bloom by BotaniK` | `Achetez l'extracteur botanique BloomLab® sur la boutique Bloom by BotaniK : cuve inox 304, séquençage A/B et expédition France 24-48h.` |
| `/boutique/` | `Boutique Bloom by BotaniK \| BloomLab® & Plantes Bio` | `Boutique officielle Bloom by BotaniK : commandez l'extracteur BloomLab®, nos formules de plantes médicinales bio, filtres et accessoires maison.` |
| `/boutique/kits/` | `Kits Plantes Médicinales Bio \| Bloom by BotaniK` | `Kits de plantes bio Bloom by BotaniK sélectionnés pour le sommeil, la digestion ou l'immunité. Prêts à être extraits avec l'appareil BloomLab®.` |
| `/boutique/pack-signature/` | `Pack Signature BloomLab® + Trio Plantes \| Bloom by BotaniK` | `Pack Signature Bloom by BotaniK : l'extracteur BloomLab®, nos sélections de plantes médicinales bio et les protocoles d'extraction guidés.` |
| `/boutique/bundle-apothicaire/` | `Trio Apothicaire \| 3 Kits Plantes Bio \| Bloom by BotaniK` | `Trio Apothicaire par Bloom by BotaniK : formules botaniques calibrées pour BloomLab® (Sève Fondamentale, Nuit Profonde et Feu Digestif).` |
| `/boutique/kit-starter/` | `Kit Sève Fondamentale \| Plantes Bio \| Bloom by BotaniK` | `Kit Sève Fondamentale Bloom by BotaniK : ortie, romarin et cynorrhodon bio sélectionnés pour l'extraction végétale de précision sur BloomLab®.` |
| `/boutique/kit-nuit/` | `Kit Nuit Profonde \| Sommeil & Plantes Bio \| Bloom by BotaniK` | `Kit Nuit Profonde par Bloom by BotaniK : synergie de passiflore, mélisse et camomille matricaire bio calibrée pour l'extraction douce sur BloomLab®.` |
| `/boutique/kit-digestion/` | `Kit Feu Digestif \| Confort & Plantes Bio \| Bloom by BotaniK` | `Kit Feu Digestif Bloom by BotaniK : fenouil doux, menthe poivrée et gentiane bio calibrés pour une extraction botanique de précision.` |
| `/boutique/kit-articulaire/` | `Kit Feu Articulaire \| Mobilité & Plantes Bio \| Bloom by BotaniK` | `Kit Feu Articulaire par Bloom by BotaniK : harpagophytum, reine-des-prés et cassis bio sélectionnés pour préserver le Totum végétal.` |
| `/boutique/kit-hiver/` | `Kit Bouclier Hivernal \| Plantes Bio \| Bloom by BotaniK` | `Kit Bouclier Hivernal Bloom by BotaniK : échinacée pourpre, thym à linalol et sureau noir bio pour des infusions riches en polyphénols.` |
| `/boutique/duo-argiles/` | `Duo Argiles & Terres Rares \| Purification \| Bloom by BotaniK` | `Duo Argiles Zéolithe-Bentonite Bloom by BotaniK : argiles surfines ventilées pour vos préparations d'herboristerie et soins du terrain.` |
| `/abonnement/` | `Abonnement Bloom by BotaniK \| Protocoles & Suivi ALMA` | `Abonnement Bloom by BotaniK : accédez aux protocoles de reset homéostatique, au suivi d'anamnèse ALMA et aux formules d'extraction BloomLab®.` |

### Académie & Pages Éditoriales Complémentaires
- `/academie/`, `/academie/comprendre-le-modele-bloom/`, `/academie/comprendre-le-corps/4-architectures/`, `/academie/comprendre-le-corps/7-terrains/`, `/academie/comprendre-le-corps/9-axes-historiques/`, `/academie/comprendre-le-corps/charge-allostatique/`, `/academie/comprendre-le-corps/metabolisme-glucidique-insuline/`, `/academie/choc-de-paradigme/`, `/academie/axes/a1-emonctoires/`, `/academie/herbier/`, `/academie/bibliotheque/`, `/academie/protocoles/`, `/academie/protocoles/sibo/`, `/academie/protocoles/clarte-mentale/`, `/academie/protocoles/decalcification-pineale/` : tous couverts dans `SERVER_SEO_ROUTES` et `VIEW_SEO_MAP` avec balises uniques et JSON-LD `Article` / `WebSite`.

---

## 4. Audit de Pertinence On-Page (H1 & 100 premiers mots) & Maillage Interne

### Balises `<h1>` & Densité de Marque
- **Page d'accueil (`src/IndexBisContent.tsx`)** :
  - `<h1>` : `Bloom by BotaniK | BloomLab®, Extracteur Botanique de Précision & Infusion Végétale Maîtrisée` (contient `Bloom by BotaniK` et `BloomLab®`).
  - **100 premiers mots** : `Bloom by BotaniK` apparaît désormais **3 fois** dans le bloc d'ouverture (H1 + paragraphe 1 + paragraphe 2), accompagné de `BloomLab®`.
- **Page Produit BloomLab (`src/MachineLanding.tsx`)** : `<h1>` inclut `BloomLab®` et `Bloom by BotaniK`.
- **Page Infusion Botanique (`src/PillarInfusion.tsx` & `src/data/pillarInfusionTranslations.ts`)** : `<h1>` inclut `BloomLab®` et `Bloom by BotaniK` (FR, EN, DE) et le paragraphe d'introduction mentionne les deux entités.
- **Page Extraction Botanique (`src/PillarExtraction.tsx`)** : `<h1>` et le paragraphe d'introduction mentionnent `Bloom by BotaniK` et `BloomLab®`.
- **Page Reset Homéostasique (`src/PhytotherapyResetPage.tsx`)** : `<h1>` et le sous-titre mentionnent `Bloom by BotaniK` et `BloomLab®`.
- **Boutique (`src/StoreContent.tsx` & `src/translations.ts`)** : `<h1>` inclut `Bloom by BotaniK` et `BloomLab®` (FR, EN, DE) avec description dédiée à l'univers Bloom by BotaniK.
- **Fiches Produits (`src/ProductDetail.tsx`)** : tous les produits affichent leur `<h1>` dédié (y compris `Duo Argiles Bloom by BotaniK`) ainsi que le schéma structuré `Product` + `BreadcrumbList` attribuant la marque `Bloom by BotaniK`.

### Maillage Interne de Marque
- **Depuis la page d'accueil (`/`)** :
  - Ajout d'un lien interne direct `<a href="/la-marque/">Découvrir la marque Bloom by BotaniK</a>` dans la zone d'actions du Hero de `IndexBisContent.tsx` (en plus du lien `<a href="/la-marque/">La Marque</a>` présent dans la barre de navigation SSR).
- **Depuis les fiches produits (`/bloomlab/`, `/boutique/*`)** :
  - `ProductDetail.tsx` : fil d'Ariane HTML (`<a href="/">Accueil</a>`, `<a href="/boutique/">Boutique</a>`) + lien retour `<a href="/boutique/">`.
  - `MachineLanding.tsx` : ajout d'un fil d'Ariane HTML (`<a href="/">Accueil Bloom by BotaniK</a>`, `<a href="/boutique/">Boutique</a>`), d'un lien `← Retour à la boutique` et d'un bouton lien `<a href="/boutique/">Voir toute la Boutique Bloom by BotaniK</a>` en bas de page.

---

## 5. Validation Technique & Recommandations Google Search Console

- **Build & TypeScript** : `npm run build` (`vite build`) et `npm run lint` (`tsc --noEmit`) exécutés avec succès sans erreur ni avertissement bloquant.
- **Tests HTTP SSR en direct (`http://localhost:3000/`)** :
  - `/` retourne `<title>Bloom by BotaniK | Extracteur Botanique de Précision & Infusion Végétale Maîtrisée</title>`, `<meta name="robots" content="index, follow, ..." />`, `<link rel="canonical" href="https://bloombybotanik.com/" />` et `<a href="/la-marque/">`.
  - `/robots.txt` et `/sitemap.xml` retournent `200 OK` avec les directives valides.
  - Toutes les routes produit et piliers testées (`/bloomlab/`, `/infusion-botanique/`, `/extraction-botanique/`, `/reset-homeostasique/`, `/boutique/`, `/boutique/kits/`, `/guide-solvants/`, `/boutique/kit-nuit/`, `/abonnement/`) injectent leurs titres, descriptions et canoniques uniques côté serveur ; `/panier/` injecte bien `noindex, nofollow`.
- **Actions recommandées côté Google Search Console (hors code)** :
  1. Soumettre `https://bloombybotanik.com/sitemap.xml` dans Search Console.
  2. Utiliser l'outil *Inspection de l'URL* sur `/`, `/bloomlab/`, `/boutique/` et `/la-marque/` puis demander l'indexation après déploiement en production.
