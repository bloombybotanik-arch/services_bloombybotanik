# Rapport d'Audit SEO & Déblocage d'Indexation — Bloom by BotaniK (`bloombybotanik.com`)

**Date de l'audit :** 20 novembre 2026  
**Périmètre :** Indexabilité SSR (`server.ts`, `index.html`), directives `robots` / `canonical` / `sitemap.xml`, pertinence sémantique de marque (`Bloom by BotaniK` + `BloomLab®`), stratégie longue traîne (H1, H2/H3, FAQ 3–5 Q/R, maillage interne) et validation HTTP en direct.

---

## 1. Résolution des Blocages Techniques d'Indexation (Étapes 1 à 3)

1. **Absence totale de `noindex` sur les pages publiques** :
   - `index.html` porte `<meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1" />`.
   - `registerCatchAll` dans `server.ts` injecte systématiquement `X-Robots-Tag: index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1` sur toutes les routes publiques (réservant `noindex, nofollow` aux seules routes privées/transactionnelles : `/admin/`, `/panier/`, `/checkout/`, `/commande/`, `/compte/`, `/activation/`, `/en-attente/`, `/newsletter/`).
2. **Injection SSR HTML complète (`injectServerSEO`)** :
   - Chaque requête HTTP sur une route publique reçoit côté serveur son `<title>`, sa `<meta name="description">`, sa `<link rel="canonical">` unique, ses balises OpenGraph/Twitter, son JSON-LD structuré et un fallback HTML sémantique dans `#root` (`<header>`, `<nav>` avec liens internes, `<h1>`, paragraphes descriptifs).
3. **`robots.txt` et `sitemap.xml` conformes (`HTTP 200`)** :
   - `public/robots.txt` autorise `Allow: /` (en bloquant `/admin`, `/panier`, `/commande`, `/checkout`, `/compte`, `/activation`, `/en-attente`, `/newsletter/`, `/api/`) et déclare `Sitemap: https://bloombybotanik.com/sitemap.xml`.
   - `public/sitemap.xml` référence `sitemap-fr.xml`, `sitemap-en.xml`, `sitemap-de.xml`, `sitemap-recettes.xml` et `sitemap-images.xml`.
   - `public/sitemap-fr.xml` inclut explicitement l'ensemble des URLs stratégiques vérifiées :
     - `https://bloombybotanik.com/`
     - `https://bloombybotanik.com/bloomlab/`
     - `https://bloombybotanik.com/infusion-botanique/` *(ajouté dans `sitemap-fr.xml`)*
     - `https://bloombybotanik.com/extraction-botanique/`
     - `https://bloombybotanik.com/reset-homeostasique/` *(ajouté dans `sitemap-fr.xml`)*
     - `https://bloombybotanik.com/boutique/`
     - `https://bloombybotanik.com/boutique/kits/`
     - `https://bloombybotanik.com/guide-solvants/`
     - `https://bloombybotanik.com/la-marque/`
4. **Correction critique de la canonique auto-référençante (`/infusion-botanique/` & `/reset-homeostasique/`)** :
   - Avant correction, `/infusion-botanique/` et `/reset-homeostasique/` n'étaient pas enregistrées dans `PATH_VIEWS` (`src/App.tsx`), provoquant côté client un repli vers la vue d'accueil (`indexbis`) et un écrasement de la canonique vers `/`, tandis que `redirects301` dans `server.ts` redirigeait `/infusion-botanique` et `/reset-homeostasique/` vers d'autres URLs.
   - Après correction dans `server.ts`, `src/App.tsx` et `src/utils/seoManager.ts`, `/infusion-botanique/` et `/reset-homeostasique/` répondent en `HTTP 200` avec leur propre `<link rel="canonical">` auto-référençant (`https://bloombybotanik.com/infusion-botanique/` et `https://bloombybotanik.com/reset-homeostasique/`), sans aucune balise `<link rel="canonical">` en double.

---

## 2. Inventaire des Balises `<title>`, `<meta name="description">` & `<link rel="canonical">` Vérifiées

| Route | Statut | `<title>` | `<meta name="description">` | Canonical |
| :--- | :--- | :--- | :--- | :--- |
| `/` | 200 | `Bloom by BotaniK \| Extracteur Botanique de Précision & Infusion Végétale Maîtrisée` | `Bloom by BotaniK conçoit la BloomLab®, extracteur de précision pour fabriquer vos soins naturels maison dans le respect du totum végétal.` | `https://bloombybotanik.com/` |
| `/bloomlab/` | 200 | `BloomLab® \| Extracteur Botanique de Précision pour Soins Maison` | `Réglez temps (30 min–12 h) et température (0–121 °C) pour extraire le totum végétal de vos plantes. Fabrication de soins cosmétiques et botaniques maison.` | `https://bloombybotanik.com/bloomlab/` |
| `/infusion-botanique/` | 200 | `Infusion Botanique Maison : Guide Complet & Bienfaits \| Bloom` | `Découvrez l'art de l'infusion botanique de précision. Températures, solvants et recettes pour préserver le Totum végétal et booster vos bienfaits.` | `https://bloombybotanik.com/infusion-botanique/` |
| `/extraction-botanique/` | 200 | `Extraction Botanique : Méthodes & Séquençage A/B \| Bloom` | `Maîtrisez l'extraction végétale : macération, infusion, séquençage A/B. Découvrez comment la BloomLab préserve les principes actifs.` | `https://bloombybotanik.com/extraction-botanique/` |
| `/reset-homeostasique/` | 200 | `Reset Homéostasique : Accordage Systémique en 6 Phases \| Bloom` | `Comprenez la charge allostatique et explorez l'accordage biologique en 6 phases pour soutenir les boucles d'autorégulation du terrain.` | `https://bloombybotanik.com/reset-homeostasique/` |
| `/academie/reset-homeostasique/` | 200 | `Reset Homéostasique : Protocoles de Drainage & Terrain \| Bloom` | `Libérez vos émonctoires et réactivez votre pharmacie intérieure. Découvrez nos protocoles de phytothérapie de précision pour un drainage profond.` | `https://bloombybotanik.com/academie/reset-homeostasique/` |
| `/boutique/` | 200 | `Kits Plantes & Soins Botaniques Maison \| Bloom by BotaniK` | `Boutique officielle Bloom by BotaniK : commandez l'extracteur BloomLab®, nos formules de plantes médicinales bio, filtres et accessoires maison.` | `https://bloombybotanik.com/boutique/` |
| `/boutique/kits/` | 200 | `Kits & Soins Botaniques Maison \| Bloom by BotaniK` | `Kits d'ingrédients et protocoles pour préparer vos sérums, infusions et soins à la BloomLab®. Traçabilité et qualité botanique.` | `https://bloombybotanik.com/boutique/kits/` |
| `/boutique/abonnements-numeriques/` | 200 | `Abonnements Numériques Bloom Académie & ALMA \| Bloom by BotaniK` | `Accédez aux protocoles systémiques Bloom by BotaniK, fiches d'extraction BloomLab® avancées et suivi personnalisé ALMA.` | `https://bloombybotanik.com/boutique/abonnements-numeriques/` |
| `/guide-solvants/` | 200 | `Guide des Solvants d'Extraction : Eau, Huile, Alcool \| Bloom by BotaniK` | `Eau, huile végétale, alcool, glycérine : choisissez le solvant adapté avec Bloom by BotaniK et BloomLab® pour libérer le Totum Végétal.` | `https://bloombybotanik.com/guide-solvants/` |
| `/la-marque/` | 200 | `La Marque Bloom by BotaniK \| Terroirs & Exigence` | `Découvrez l'histoire de Bloom by BotaniK : sélection rigoureuse des plantes brutes, conception française des protocoles et transparence scientifique.` | `https://bloombybotanik.com/la-marque/` |

---

## 3. Pertinence Sémantique, Stratégie Longue Traîne (H1/H2/FAQ) & Maillage Interne (Étapes 4 à 6)

### Page d'accueil (`/` — `src/IndexBisContent.tsx`)
- **`<h1>` unique** : `Bloom by BotaniK — BloomLab® : L'Extracteur Botanique qui Préserve le Totum Végétal` (inclut explicitement `Bloom by BotaniK` et `BloomLab®`).
- **100 premiers mots** : `Bloom by BotaniK` et `BloomLab®` apparaissent à 3 reprises dès le bloc Hero et les premiers paragraphes d'introduction.
- **Maillage de marque** : lien `<a href="/la-marque/">Découvrir la marque Bloom by BotaniK</a>` dans la zone d'action principale.

### Pages Clés (H1, Enrichissement Sémantique, FAQ 3–5 Q/R & Liens `<a href>`)
1. **BloomLab (`/bloomlab/` — `src/MachineLanding.tsx`)** :
   - Mention explicite de `Bloom by BotaniK` et `BloomLab®` dès l'introduction et dans le `<h1>`.
   - FAQ de 5 questions-réponses conservée et maillage interne enrichi avec liens `<a href="/guide-solvants/">`, `<a href="/boutique/">` et `<a href="/">`.
2. **Infusion Botanique (`/infusion-botanique/` — `src/PillarInfusion.tsx` & `src/data/pillarInfusionTranslations.ts`)** :
   - `<h1>` et introduction mentionnant `BloomLab®` et `Bloom by BotaniK`.
   - FAQ enrichie avec les requêtes exactes *« Quelle est la différence entre une infusion et une décoction ? »*, *« Pourquoi la température de l'eau est-elle importante ? »* et *« Comment faire une infusion avec un extracteur ? »*.
   - Maillage interne `<a href="/bloomlab/">`, `<a href="/extraction-botanique/">`, `<a href="/boutique/">` et `<a href="/recettes-gratuites/">`.
3. **Extraction Botanique (`/extraction-botanique/` — `src/PillarExtraction.tsx`)** :
   - Ajout d'une section **FAQ de 4 questions-réponses** sur la différence infusion/décoction/macération, le séquençage actif A/B, la régulation thermique ±0,5°C et les solvants.
   - Remplacement des boutons par de véritables liens HTML `<a href>` vers `/bloomlab/`, `/infusion-botanique/`, `/guide-solvants/` et `/boutique/kits/`.
4. **Guide des Solvants (`/guide-solvants/` — `src/SolventsGuide.tsx`)** :
   - Intégration explicite de `Bloom by BotaniK` et `BloomLab®` dans le paragraphe d'introduction.
   - Ajout d'une section **FAQ de 4 questions-réponses** sur la polarité des solvants, la température des macérats huileux (45°C), le séquençage A/B et la conservation.
   - Maillage interne HTML `<a href>` vers `/extraction-botanique/`, `/bloomlab/` et `/boutique/`.
5. **Reset Homéostasique (`/reset-homeostasique/` — `src/PhytotherapyResetPage.tsx`)** :
   - `<h1>` et sous-titre intégrant `Bloom by BotaniK` et `BloomLab®`.
   - Ajout d'une section **FAQ de 4 questions-réponses** sur le reset homéostasique, les 5 émonctoires, le Totum végétal et l'usage éducatif sans allégation thérapeutique.
   - Maillage interne HTML `<a href>` vers `/bloomlab/`, `/extraction-botanique/` et `/boutique/`.
6. **Boutique & Fiches Produits (`/boutique/`, `/boutique/*` — `src/StoreContent.tsx`, `src/ProductDetail.tsx`)** :
   - Ajout d'un bandeau de maillage interne (`<a href="/bloomlab/">`, `<a href="/guide-solvants/">`, `<a href="/extraction-botanique/">`, `<a href="/">`) et d'une **FAQ Boutique de 4 questions-réponses** dans `StoreContent.tsx`.
   - Conservation des fils d'Ariane HTML vers `/` et `/boutique/` sur `ProductDetail.tsx`, avec lien canonique corrigé vers `/extraction-botanique/`.

---

## 4. Validation Build, Lint & Contrôle Serveur (Étape 7)

- **Compilation Vite & TypeScript (`npm run build` + `tsc --noEmit`)** : réussie sans erreur ni avertissement bloquant.
- **Vérification HTTP locale après redémarrage serveur** :
  - `GET /`, `/bloomlab/`, `/infusion-botanique/`, `/extraction-botanique/`, `/reset-homeostasique/`, `/academie/reset-homeostasique/`, `/boutique/`, `/boutique/kits/`, `/boutique/abonnements-numeriques/`, `/guide-solvants/`, `/la-marque/` → tous en `HTTP 200`, balise `<link rel="canonical">` unique et auto-référençante, `robots = index, follow...`.
  - `GET /robots.txt`, `GET /sitemap.xml`, `GET /sitemap-fr.xml` → `HTTP 200` et structure XML valide incluant toutes les URLs clés.
