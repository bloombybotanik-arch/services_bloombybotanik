/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, ReactNode } from 'react';
import { Lock, ShoppingBag, BookOpen, FlaskConical, Menu, X, ChevronRight, Leaf, ShieldCheck, SearchCheck, Award, Star, User, Check, ArrowRight, ChefHat, Instagram, Youtube, Facebook, Pin as Pinterest, Music2 as TikTok, MessageSquare, Sparkles, Wind, Waves, Moon, Utensils, Activity, Globe, Settings, Droplets, MessageCircle, ShoppingCart, Home, FileText, Newspaper, Microscope, HelpCircle, Package } from 'lucide-react';
import { translations, Language } from './translations';
import { getProducts } from './StoreContent';
import Footer from './components/Footer';
import { wrapTitle } from './lib/textUtils';
import { AuthModal } from './components/AuthModal';
import { PremiumModal } from './components/PremiumModal';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
// import img05 from './assets/images/Img_05.jpeg';
const bloomLabImg = "https://images.unsplash.com/photo-1611078767398-fcfe88fdb728?auto=format&fit=crop&w=800&q=80";
const img05 = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80";
// import logoSidebar from './assets/images/logo_sidebar_1784886108085.png';
const logoSidebar = "/assets/images/logo_sidebar_1784886108085.png";
import { OptimizedImage } from './components/OptimizedImage';
import { CookieBanner } from './components/CookieBanner';
import { FloatingChat } from './components/FloatingChat';
import { LanguageSelector } from './components/LanguageSelector';
import { blogPosts } from './data/blogPosts';
import { discoveryRecipes } from './data/recipesData';
import TerrainPillar from './TerrainPillar';
import { View, VIEW_PATHS } from './types';

import HomeContent from './HomeContent';
import HerbariumContent from './HerbariumContent';
import StoreContent from './StoreContent';
import GuideContent from './GuideContent';
import CartContent from './CartContent';
import CheckoutFlow from './CheckoutFlow';
import ProductDetail from './ProductDetail';
import CulinarySection from './CulinarySection';
import CosmeticsContent from './CosmeticsContent';
import LibraryLanding from './LibraryLanding';
import ActivationPage from './ActivationPage';
import LegalPages from './LegalPages';
import ChatContent from './ChatContent';
import AccountContent from './AccountContent';
import RecipesContent from './RecipesContent';
import AdminDashboard from './components/AdminDashboard';
import ManifesteContent from './ManifesteContent';
import MachineLanding from './MachineLanding';
import PhytotherapyResetPage from './PhytotherapyResetPage';
import PillarExtraction from './PillarExtraction';
import PillarInfusion from './PillarInfusion';
import PillarOil from './PillarOil';
import PillarAdaptogens from './PillarAdaptogens';
import PendingContent from './PendingContent';
import IndexBisContent from './IndexBisContent';
import * as SEOArticlesExports from './SEOArticlesContent';
import { NewsletterPreferences } from './NewsletterPreferences';
import { AdminNewsletter } from './components/AdminNewsletter';
import BlogContent from './BlogContent';
import FaqContent from './FaqContent';
import ContactContent from './ContactContent';
import ArticlesContent from './ArticlesContent';
import PremiumInfoContent from './PremiumInfoContent';

const SEOArticles = ({ view, lang, t, onNavigate }: { view: string, lang: string, t: any, onNavigate?: (view: any, param?: string) => void }) => {
  if (view === 'infusion-precision') return <SEOArticlesExports.InfusionPrecision lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'totum-definition' || view === 'totum-vegetal') return <SEOArticlesExports.TotumDefinition lang={lang} t={t} onNavigate={onNavigate} />;
  if (view === 'solvants-extraction' || view === 'teinture-mere') return <SEOArticlesExports.SolvantsExtraction lang={lang} t={t} onNavigate={onNavigate} />;
  return null;
};

const PATH_VIEWS: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(VIEW_PATHS).flatMap(([view, path]) => {
      const withSlash = path.endsWith('/') ? path : `${path}/`;
      const withoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
      return [
        [withSlash, view],
        [withoutSlash, view]
      ];
    })
  ),
  '/bloomlab': 'machine',
  '/bloomlab/': 'machine',
  '/totum-vegetal': 'totum-vegetal',
  '/totum-vegetal/': 'totum-vegetal',
  '/abonnement': 'abonnement',
  '/abonnement/': 'abonnement',
};

// --- SEO & DATA UTILS ---
const POST_TITLE = "L'Élévation de l'Extraction : vers le Totum absolu";

// Generates dynamic ALT text (mimicking the requested PHP script)
const generateSeoAlt = (imageContext: string, t: any) => {
  const extendedKeywords = t.seo.keywords || "";
  return `${POST_TITLE} - ${imageContext} - ${extendedKeywords}`;
};

// JSON-LD & Dynamic SEO Metadata Injection Component
const SEOMetadata = ({ lang, currentView, t, productId, blogPostSlug }: { lang: Language, currentView: string, t: any, productId?: string, blogPostSlug?: string }) => {
  useEffect(() => {
    // 1. Handle dynamic Title & Meta Description
    let seoKey: 'home' | 'herbarium' | 'shop' | 'blog' | 'pillar' | 'extraction' | 'infusion' | 'oil' | 'adaptogens' | 'infuseur' | 'machine' | 'manifesto' | 'how_it_works' | 'reset' | 'recettes' | 'faq' | 'infusion_precision' | 'totum_definition' | 'solvants_extraction' = 'home';
    
    if (['herbier', 'culinaire', 'cosmetiques'].includes(currentView)) {
      seoKey = 'herbarium';
    } else if (['boutique', 'product-detail', 'cart', 'checkout', 'premium-info'].includes(currentView)) {
      seoKey = 'shop';
    } else if (currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet') {
      seoKey = 'extraction';
    } else if (currentView === 'infusion-botanique' || currentView === 'guide') {
      seoKey = 'infusion';
    } else if (currentView === 'huile-infusee') {
      seoKey = 'oil';
    } else if (currentView === 'plantes-adaptogenes') {
      seoKey = 'adaptogens';
    } else if (currentView === 'how_it_works' || currentView === 'qu-est-ce-que-infusion' || currentView === 'comment-ca-marche') {
      seoKey = 'how_it_works';
    } else if (currentView === 'blog' || currentView === 'library-landing' || currentView === 'library' || currentView === 'guides') {
      seoKey = 'blog';
    } else if (currentView === 'machine') {
      seoKey = 'machine';
    } else if (currentView === 'home' || currentView === 'indexbis') {
      seoKey = 'home';
    } else if (currentView === 'manifeste') {
      seoKey = 'manifesto';
    } else if (currentView === 'infuseur-botanique') {
      seoKey = 'infuseur';
    } else if (currentView === 'phytotherapie-reset') {
      seoKey = 'reset';
    } else if (currentView === 'recettes') {
      seoKey = 'recettes';
    } else if (currentView === 'questions-frequentes') {
      seoKey = 'faq';
    } else if (currentView === 'terrain') {
      seoKey = 'herbarium'; // Fallback to herbarium for now or define a new one
    } else if (currentView === 'infusion-precision') {
      seoKey = 'infusion_precision';
    } else if (currentView === 'totum-definition') {
      seoKey = 'totum_definition';
    } else if (currentView === 'solvants-extraction') {
      seoKey = 'solvants_extraction';
    }

    const currentSeo = t.seo[seoKey];
    const isFR = lang === 'fr';

    if (!currentSeo) {
      document.title = "Bloom by BotaniK";
      return;
    }

    // Product-specific SEO when viewing a product detail page
    let finalTitle = currentSeo.title;
    let finalDescription = currentSeo.description;
    let productData: any = null;

    if (currentView === 'product-detail' && productId) {
      const products = getProducts(lang);
      productData = products.find((p: any) => p.id === productId);
      if (productData) {
        finalTitle = `${productData.name} | ${productData.subtitle} | Bloom by BotaniK`;
        finalDescription = productData.description;
      }
    }

    if (currentView === 'blog' && blogPostSlug) {
      const post = blogPosts.find(p => p.slug === blogPostSlug);
      if (post) {
        if (post.metaTitle && post.metaTitle[lang]) {
          finalTitle = post.metaTitle[lang];
        } else {
          finalTitle = `${post.title[lang]} | Journal Bloom by BotaniK`;
        }
        
        if (post.metaDescription && post.metaDescription[lang]) {
          finalDescription = post.metaDescription[lang];
        } else if (post.excerpt && post.excerpt[lang]) {
          finalDescription = post.excerpt[lang];
        }
      }
    }

    document.title = finalTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);
    
    // Update robots meta for indexing
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const noIndexViews = ['admin', 'checkout', 'cart', 'account', 'pending'];
    if (noIndexViews.includes(currentView)) {
      robots.setAttribute('content', 'noindex, nofollow');
    } else {
      robots.setAttribute('content', 'index, follow');
    }

    // 2. JSON-LD Injection
    let viewPath = currentView === 'product-detail' && productId ? `/boutique/${productId}/` : (VIEW_PATHS[currentView as string] || '/');
    
    // Normalize path for canonical: if we have a blog slug, use the blog URL
    if (currentView === 'blog' && blogPostSlug) {
      viewPath = `/blog/${blogPostSlug}/`;
    }

    // Herbarium canonical
    if (currentView === 'herbier' && productId) {
      viewPath = `/herbier/${productId}/`;
    }

    // Safety check: ensure trailing slash except for root
    if (viewPath !== '/' && !viewPath.endsWith('/')) {
      viewPath += '/';
    }

    // Safety check: if viewPath is / but we are on a known path, use the known path
    const currentPath = window.location.pathname.replace(/^\/(en|de)(\/|$)/, '/');
    if (viewPath === '/' && currentPath !== '' && currentPath !== '/') {
      viewPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    }
    
    const langPrefix = lang === 'fr' ? '' : `/${lang}`;
    const pageUrl = `https://bloombybotanik.com${langPrefix}${viewPath === '/' ? '' : viewPath}`;
    const logoUrl = "https://bloombybotanik.com/assets/img/logo-bloom-square-512.png";
    const socialLogoUrl = "https://bloombybotanik.com/assets/img/logo-bloom-square-512.png";

    // Update canonical link to use the normalized pageUrl
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // Update hreflang tags
    const langs: Language[] = ['fr', 'en', 'de'];
    langs.forEach(l => {
      let hreflang = document.querySelector(`link[hreflang="${l}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', l);
        document.head.appendChild(hreflang);
      }
      
      const lPrefix = l === 'fr' ? '' : `/${l}`;
      const href = `https://bloombybotanik.com${lPrefix}${viewPath === '/' ? '' : viewPath}`;
      hreflang.setAttribute('href', href);
    });

    // x-default
    let xDefault = document.querySelector('link[hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', `https://bloombybotanik.com${viewPath === '/' ? '' : viewPath}`);

    const breadcrumbs = [
      { name: "Bloom by BotaniK", url: "https://bloombybotanik.com" }
    ];

    if (currentView !== 'home') {
      breadcrumbs.push({
        name: finalTitle.split('|')[0].trim(),
        url: pageUrl
      });
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.url
      }))
    };

    // Social Metadata
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let tag = document.querySelector(`meta[${attr}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const bloomlabImg = "https://bloombybotanik.com/assets/img/produit/bloomlab-face-1200x1200.jpg";
    let shareImage = bloomlabImg;
    if (productData && productData.image) {
      shareImage = productData.image.startsWith('http') ? productData.image : `https://bloombybotanik.com${productData.image}`;
    }

    updateMetaTag('og:site_name', 'Bloom by BotaniK');
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', pageUrl);
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:image', shareImage);
    updateMetaTag('og:image:secure_url', shareImage);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '1200');
    updateMetaTag('og:image:type', 'image/jpeg');
    updateMetaTag('og:image:alt', 'BloomLab, extracteur botanique domestique en acier inoxydable');
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', shareImage, true);

    const graph: any[] = [
      breadcrumbSchema,
      {
        "@type": "Organization",
        "@id": "https://bloombybotanik.com/#organization",
        "name": "Bloom by BotaniK",
        "url": "https://bloombybotanik.com",
        "logo": {
          "@type": "ImageObject",
          "url": logoUrl,
          "width": 1024,
          "height": 1024
        },
        "description": isFR ? "L'ingénierie de la résilience biologique par l'extraction botanique de précision. Réalisez vos préparations botaniques maison et soins naturels visages, corps et cheveux." : "Expertise in precision botanical infusion and extraction. BloomLab® gives you all the keys to create your own natural botanical preparations.",
        "sameAs": [
          "https://www.instagram.com/bloombybotanik/",
          "https://www.youtube.com/@bloombybotanik",
          "https://www.facebook.com/bloombybotanik"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Menu principal Bloom",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "La Machine BloomLab",
            "url": "https://bloombybotanik.com/bloomlab/"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "L'Herbier",
            "url": "https://bloombybotanik.com/herbier/"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Journal Botanique",
            "url": "https://bloombybotanik.com/blog/"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Boutique",
            "url": "https://bloombybotanik.com/boutique/"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://bloombybotanik.com/#website",
        "url": "https://bloombybotanik.com",
        "name": "Bloom by BotaniK",
        "alternateName": ["Bloom by Botanik", "BloomBotanik"],
        "publisher": { "@id": "https://bloombybotanik.com/#organization" },
        "inLanguage": "fr-FR",
        "potentialAction": [{
          "@type": "SearchAction",
          "target": "https://bloombybotanik.com/herbier/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://bloombybotanik.com/#expert",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://bloombybotanik.com/#rd-lead",
          "name": "Responsable Recherche & Développement",
          "jobTitle": "Expert en Médecine des Systèmes",
          "affiliation": {
            "@type": "Organization",
            "name": "BloomLab – Ingénierie de la Vitalité"
          },
          "description": "Spécialiste de l'extraction du totum végétal et de l'homéostasie systémique."
        }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": finalTitle,
        "description": finalDescription,
        "isPartOf": { "@id": "https://bloombybotanik.com/#website" },
        "inLanguage": lang,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": lang === 'fr' ? "Accueil" : lang === 'de' ? "Startseite" : "Home",
              "item": "https://bloombybotanik.com"
            },
            ...(currentView !== 'home' ? [{
              "@type": "ListItem",
              "position": 2,
              "name": finalTitle.split('|')[0].trim(),
              "item": pageUrl
            }] : [])
          ]
        }
      }
    ];

    if (currentView === 'product-detail' && productData) {
      graph.push({
        "@type": "Product",
        "@id": `${pageUrl}/#product`,
        "name": productData.name,
        "description": productData.description,
        "image": typeof productData.image === 'string' ? `https://bloombybotanik.com${productData.image}` : (productData.image?.src ? `https://bloombybotanik.com${productData.image.src}` : undefined),
        "brand": { "@type": "Brand", "name": "Bloom by BotaniK" },
        "sku": `BLOOM-${productData.id.toUpperCase()}`,
        "mpn": `BL-${productData.id.toUpperCase()}`,
        "keywords": "tisanes, remèdes naturels, phytothérapie, extraction botanique",
        "reviewedBy": { "@id": "https://bloombybotanik.com/#rd-lead" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (productData.rating || 4.8).toString(),
          "reviewCount": (productData.reviews || 15).toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [{
          "@type": "Review",
          "author": { "@type": "Person", "name": "Client Bloom" },
          "reviewBody": "Excellent produit, conforme à la démarche Bloom et à l'extraction de précision.",
          "reviewRating": { "@type": "Rating", "ratingValue": (productData.rating || 4.8).toString() }
        }],
        "offers": {
          "@type": "Offer",
          "price": productData.price.toFixed(2),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": pageUrl,
          "itemCondition": "https://schema.org/NewCondition",
          "priceValidUntil": "2026-12-31",
          "validFrom": "2024-01-01",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "EUR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "FR"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "d"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 2,
                "maxValue": 4,
                "unitCode": "d"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "FR",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 14,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          }
        }
      });
    } else if (currentView === 'home' || currentView === 'machine' || currentView === 'indexbis' || currentView === 'how_it_works' || currentView === 'infuseur-botanique') {
      // Add BloomLab product on its dedicated landing or home page
      graph.push({
        "@type": "Product",
        "@id": "https://bloombybotanik.com/bloomlab/#product",
        "name": "BloomLab® - Extracteur Botanique",
        "description": "L'extracteur de précision qui libère jusqu'à 98% du totum végétal. Machine d'infusion de plantes pour réaliser vos remèdes naturels aux plantes, soins naturels visages, corps et cheveux à basse température.",
        "image": [
          `https://bloombybotanik.com${bloomLabImg}`,
          `https://bloombybotanik.com${img05}`,
          "https://bloombybotanik.com/assets/images/lab_detail_cleaned_1786616788618.jpg"
        ],
        "brand": { "@type": "Brand", "name": "Bloom by BotaniK" },
        "sku": "BLOOM-LAB-2026",
        "mpn": "BL-2026",
        "gtin13": "3770000000001",
        "keywords": "infuseur botanique, extracteur botanique, machine d'infusion de plantes, remèdes naturels aux plantes, soins naturels visages, soins naturels corps, soins naturels cheveux",
        "reviewedBy": { "@id": "https://bloombybotanik.com/#rd-lead" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [{
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sophie M." },
          "reviewBody": "Une révolution pour mes remèdes maison. La précision est incroyable.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" }
        }],
        "offers": {
          "@type": "Offer",
          "price": "239.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": "https://bloombybotanik.com/machine",
          "itemCondition": "https://schema.org/NewCondition",
          "priceValidUntil": "2026-12-31",
          "validFrom": "2024-01-01",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "EUR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "FR"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "d"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 2,
                "maxValue": 4,
                "unitCode": "d"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "FR",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 14,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          }
        }
      });

      // Add VideoObject Schema
      graph.push({
        "@type": "VideoObject",
        "name": "Démonstration de l'extracteur botanique BloomLab",
        "description": "Découvrez comment fonctionne la BloomLab, l'extracteur botanique de précision pour l'extraction du totum à basse température.",
        "thumbnailUrl": [
          `https://bloombybotanik.com${bloomLabImg}`
        ],
        "uploadDate": "2026-08-01T08:00:00Z",
        "contentUrl": "https://bloombybotanik.com/demo_bloomlab.mp4",
        "duration": "PT1M30S"
      });
    }

    if (currentView === 'how_it_works' || currentView === 'qu-est-ce-que-infusion' || currentView === 'machine' || currentView === 'home' || currentView === 'infuseur-botanique') {
      graph.push({
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "mainEntity": t.seo.infusion_guide.faq.map((item: any) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      });
    }

    if (currentView === 'blog' && blogPostSlug) {
      const post = blogPosts.find(p => p.slug === blogPostSlug);
      if (post) {
        graph.push({
          "@type": "Article",
          "@id": `${pageUrl}/#article`,
          "headline": post.title[lang],
          "description": post.content[lang].substring(0, 160).replace(/<[^>]*>/g, ''),
          "image": post.image ? `https://bloombybotanik.com${post.image}` : undefined,
          "datePublished": post.date,
          "author": { "@id": "https://bloombybotanik.com/#rd-lead" },
          "publisher": { "@id": "https://bloombybotanik.com/#organization" },
          "reviewedBy": { "@id": "https://bloombybotanik.com/#rd-lead" },
          "mainEntityOfPage": { "@id": pageUrl }
        });
      }
    }

    if (currentView === 'recettes') {
      discoveryRecipes.forEach(recipe => {
        graph.push({
          "@type": "Recipe",
          "@id": `${pageUrl}/${recipe.id}/#recipe`,
          "name": recipe.title,
          "description": recipe.description,
          "author": { "@type": "Organization", "name": "Bloom by BotaniK" },
          "recipeCategory": recipe.category,
          "prepTime": "PT15M",
          "cookTime": "PT30M",
          "totalTime": "PT45M",
          "recipeYield": "1 préparation",
          "recipeIngredient": recipe.ingredients,
          "recipeInstructions": recipe.instructions.map((step: string) => ({
            "@type": "HowToStep",
            "text": step
          }))
        });
      });
    }

    if (currentView === 'machine' || (currentView === 'product-detail' && productId === 'bloomlab')) {
      graph.push({
        "@type": "Product",
        "name": "BloomLab® - Extracteur Botanique de Précision",
        "image": "https://bloombybotanik.com/assets/images/bloomlab_main_1784887530345.jpeg",
        "description": lang === 'fr' ? "L'extracteur botanique qui révèle le totum de vos plantes. Thermorégulation de précision au degré près pour infusions, huiles et extraits." : "The botanical extractor that reveals the totum of your plants. Precision thermoregulation for infusions, oils, and botanical extracts.",
        "brand": {
          "@type": "Brand",
          "name": "Bloom by BotaniK"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://bloombybotanik.com/machine",
          "priceCurrency": "EUR",
          "price": "239.00",
          "availability": "https://schema.org/InStock"
        }
      });
    }

    if (currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet') {
      // 1. Specific BreadcrumbList
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isFR ? "Accueil" : "Home",
            "item": "https://bloombybotanik.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isFR ? "La Méthode A/B" : "The A/B Method",
            "item": "https://bloombybotanik.com/bloomlab/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": isFR ? "Extraction botanique" : "Botanical extraction",
            "item": "https://bloombybotanik.com/extraction-botanique/"
          }
        ]
      });

      // 2. Article Schema
      graph.push({
        "@type": "Article",
        "@id": `${pageUrl}/#article`,
        "headline": isFR ? "Extraction botanique : guide complet des méthodes, solvants et paramètres" : (currentSeo.h1 || currentSeo.title),
        "description": currentSeo.description,
        "inLanguage": isFR ? 'fr-FR' : (lang === 'de' ? 'de-DE' : 'en-US'),
        "author": { "@id": "https://bloombybotanik.com/#rd-lead" },
        "publisher": { "@id": "https://bloombybotanik.com/#organization" },
        "mainEntityOfPage": { "@id": pageUrl }
      });

      // 3. FAQPage Schema
      graph.push({
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quelle est la différence entre infusion et extraction ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'infusion est un type d'extraction utilisant l'eau comme solvant. L'extraction au sens large inclut l'utilisation de différents solvants (eau, huile, glycérine, alcool) et le contrôle précis de la température, du temps et de l'agitation pour capturer l'ensemble du Totum végétal sans le dénaturer."
            }
          },
          {
            "@type": "Question",
            "name": "Qu'est-ce que la méthode séquentielle A/B ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La méthode séquentielle A/B sépare l'extraction en deux étapes : la Phase A pour les principes hydrosolubles (solvants aqueux) et la Phase B pour les principes liposolubles (huiles végétales ou alcool), permettant de reconstituer le Totum végétal complet."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps se conserve un extrait botanique maison ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Une infusion aqueuse se consomme idéalement dans les 24 heures. Un macérat huileux stabilisé peut se conserver 6 mois à l'abri de la lumière et de la chaleur, tandis qu'une teinture mère hydroalcoolique se conserve plusieurs années."
            }
          },
          {
            "@type": "Question",
            "name": "Pourquoi l'acier inoxydable 304 est-il essentiel ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'acier inoxydable 304 est un matériau inerte et neutre. Il ne libère aucun composé indésirable ou perturbateur dans les préparations, même sous température élevée ou agitation constante."
            }
          }
        ]
      });
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": graph
    };

    let script = document.getElementById('json-ld-seo') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld-seo';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // Clean up on unmount or update
      const existing = document.getElementById('json-ld-seo');
      if (existing) document.head.removeChild(existing);
    };
    }, [lang, currentView, t, productId]);

  return null;
};

const CertificationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const certs = [
    { icon: Leaf, text: "Certifié BIO" },
    { icon: ShieldCheck, text: "Zéro Métaux Lourds" },
    { icon: SearchCheck, text: "Traçabilité 100%" },
    { icon: Award, text: "Garantie Haute Pureté" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-white/5 rounded-xl border border-white/10">
      {certs.map((cert, index) => {
        const Icon = cert.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-2 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute z-0'
            }`}
          >
            <Icon className="w-5 h-5 text-white mb-1" />
            <span className="text-[10px] uppercase tracking-widest text-[#F5F3EB] font-semibold text-center leading-tight">
              {cert.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- COMPONENTS ---

const NavigationSidebar = ({ className = "", currentView, currentProductId, navigateTo, user, handleLogout, lang, setLang, t, isDiscovery, isPremium }: { className?: string, currentView: string, currentProductId?: string, navigateTo: (v: any, p?: string) => void, user?: any, handleLogout?: () => void, lang: Language, setLang: (l: Language) => void, t: any, isDiscovery: boolean, isPremium: boolean }) => {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const NavItem = ({ id, label, icon: Icon, onClick, isActive, isSub }: { id?: string, label: string, icon?: any, onClick?: () => void, isActive?: boolean, isSub?: boolean }) => (
    <a
      href={id ? VIEW_PATHS[id as keyof typeof VIEW_PATHS] || '#' : '#'}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        else if (id) navigateTo(id as any);
      }}
      aria-label={label}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left group ${
        isActive 
          ? 'bg-[#1C3F34] text-white shadow-sm ring-1 ring-white/20' 
          : 'text-[#F9F9F7]/80 hover:text-white hover:bg-[#1C3F34]'
      } ${isSub ? 'pl-11 text-xs font-medium' : 'text-sm font-bold'}`}
    >
      {Icon && <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`} />}
      <span className="truncate">{label}</span>
    </a>
  );

  const NavGroup = ({ title, children }: { title: string, children: ReactNode }) => (
    <div className="space-y-1 mb-6">
      <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-2.5 select-none">
        {title}
      </h3>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );

  return (
    <header className={`w-[280px] h-screen sticky top-0 bg-[#0F261E] flex flex-col border-r border-white/5 z-50 ${className}`}>
      {/* Header / Logo */}
      <div className="p-8 pb-8">
        <a 
          href="/"
          className="flex items-center gap-3 cursor-pointer group/logo"
          onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
        >
          <img 
            src="/assets/images/logo_sidebar_1784886108085.png" 
            alt="Bloom by BotaniK" 
            className="h-12 w-auto"
          />
          <div className="ml-3 font-semibold tracking-wide flex flex-col leading-tight text-[#F9F9F7]">
            <span className="text-lg">Bloom</span>
            <span className="text-sm">by BotaniK</span>
          </div>
        </a>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar pb-10 text-[#F9F9F7]" aria-label="Menu principal">
        <NavGroup title={t.nav.accueil}>
          <NavItem 
            id="home" 
            label={t.nav.accueil} 
            icon={Home} 
            isActive={currentView === 'home'}
          />
        </NavGroup>

        {/* 1. POURQUOI BLOOM */}
        <NavGroup title={t.nav.pourquoi_bloom || "POURQUOI BLOOM"}>
          <NavItem 
            id="manifeste" 
            label={t.nav.pourquoi_bloom_sub?.manifeste || "Le Manifeste"} 
            icon={FileText} 
            isActive={currentView === 'manifeste'}
          />
          <NavItem 
            id="chat" 
            label={t.nav.pourquoi_bloom_sub?.audit || "Je commence / Diagnostic"} 
            icon={Sparkles} 
            isActive={currentView === 'chat'}
          />
        </NavGroup>

        {/* 2. LA MÉTHODE A/B */}
        <NavGroup title={t.nav.methode_ab || "LA MÉTHODE A/B"}>
          <NavItem 
            id="machine" 
            label={t.nav.methode_ab_sub?.extraction || "Extraction de précision"} 
            icon={FlaskConical} 
            isActive={currentView === 'machine'}
          />
          <NavItem 
            id="product-detail" 
            label={t.nav.methode_ab_sub?.bloomlab || "L'Extracteur BloomLab®"} 
            icon={Award} 
            isActive={currentView === 'product-detail' && currentProductId === 'bloomlab'}
            onClick={() => navigateTo('product-detail', 'bloomlab')}
          />
          <NavItem 
            id="pillar-extraction" 
            label={t.nav.methode_ab_sub?.guide_methodes || "Guide complet des méthodes"} 
            icon={BookOpen} 
            isActive={currentView === 'pillar-extraction' || currentView === 'extraction-botanique' || currentView === 'guide-complet'}
            onClick={() => navigateTo('pillar-extraction')}
          />
          <NavItem 
            id="totum-definition" 
            label={t.nav.methode_ab_sub?.totum || "Le Totum Végétal"} 
            icon={Leaf} 
            isActive={currentView === 'totum-definition'}
          />
        </NavGroup>

        {/* 3. VOTRE PRATIQUE */}
        <NavGroup title={t.nav.votre_pratique || "VOTRE PRATIQUE"}>
          <NavItem 
            id="culinaire" 
            label={t.nav.votre_pratique_sub?.culinaire || "Atelier Culinaire"} 
            icon={Utensils} 
            isActive={currentView === 'culinaire'}
          />
          <NavItem 
            id="cosmetiques" 
            label={t.nav.votre_pratique_sub?.cosmetique || "Cosmétique Botanique"} 
            icon={Droplets} 
            isActive={currentView === 'cosmetiques'}
          />
          <NavItem 
            id="phytotherapie-reset" 
            label={t.nav.votre_pratique_sub?.systemique || "Protocoles Systémiques"} 
            icon={Wind} 
            isActive={currentView === 'phytotherapie-reset'}
          />
          <NavItem 
            id="herbier" 
            label={t.nav.votre_pratique_sub?.herbier || "L'Herbier"} 
            icon={BookOpen} 
            isActive={currentView === 'herbier'}
          />
        </NavGroup>

        {/* 4. TRANSMISSION */}
        <NavGroup title={t.nav.transmission || "TRANSMISSION"}>
          <NavItem 
            id="library-landing" 
            label={t.nav.transmission_sub?.bibliotheque || "Bibliothèque Scientifique"} 
            icon={Microscope} 
            isActive={currentView === 'library-landing'}
          />
          <NavItem 
            id="faq" 
            label={t.nav.transmission_sub?.faq || "Questions Fréquentes"} 
            icon={HelpCircle} 
            isActive={currentView === 'faq' || currentView === 'questions-frequentes'}
            onClick={() => navigateTo('faq')}
          />
          <NavItem 
            id="contact" 
            label={t.nav.transmission_sub?.contact || "Nous Contacter"} 
            icon={MessageCircle} 
            isActive={currentView === 'contact'}
            onClick={() => navigateTo('contact')}
          />
        </NavGroup>

        <NavGroup title={t.nav.boutique_nav || "BOUTIQUE & REMÈDES"}>
          <NavItem 
            id="boutique" 
            label={lang === 'fr' ? "Toute la Boutique" : lang === 'de' ? "Gesamter Shop" : "All Products"} 
            icon={ShoppingBag} 
            isActive={currentView === 'boutique' && !searchParams.get('category')}
            onClick={() => navigateTo('boutique')}
          />
          <NavItem 
            id="boutique-kits" 
            label={t.nav.boutique_sub.kits} 
            icon={Package} 
            isActive={currentView === 'boutique' && searchParams.get('category') === 'kits'}
            onClick={() => navigateTo('boutique', 'kits')}
          />
          <NavItem 
            id="abonnement" 
            label={t.nav.boutique_sub.abonnement} 
            icon={Star} 
            isActive={currentView === 'premium-info' || currentView === 'abonnement'}
            onClick={() => navigateTo('abonnement')}
          />
        </NavGroup>

        <NavGroup title={t.nav.compte}>
          <NavItem 
            id="account" 
            label={t.nav.compte_sub.espace} 
            icon={User} 
            isActive={currentView === 'account'}
            onClick={() => navigateTo('account')}
          />
        </NavGroup>
      </nav>

      {/* Footer / User */}
      <div className="p-6 mt-auto border-t border-white/5 space-y-4">
        <button 
          onClick={() => navigateTo('cart')}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-botanik-green text-white font-bold text-sm hover:scale-[1.02] transition-all"
          aria-label={t.nav.cart}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-4 h-4" />
            <span>{t.nav.cart || 'Panier'}</span>
          </div>
        </button>

        <div className="flex items-center justify-between gap-2 px-2">
          <LanguageSelector lang={lang} setLang={setLang} variant="sidebar" />
          <button 
            onClick={() => navigateTo('account')}
            className="p-2 text-[#F9F9F7]/40 hover:text-white transition-colors"
            title={t.nav.account}
            aria-label={t.nav.account || 'Compte'}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

const HybridOffer = ({ onNavigate }: { onNavigate: (view: any) => void }) => (
  <section id="choix" className="my-24 scroll-mt-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-light mb-4 font-sans text-botanik-green tracking-[0.05em]">Le Choix de Souveraineté</h2>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">Deux voies d'excellence pour atteindre le Totum. Laquelle résonne avec votre essence ?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
      {/* GAUCHE : L'Unité (Autonomie) */}
      <div className="bg-white border border-botanik-green/10 rounded-2xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-green/5 text-botanik-green text-xs font-bold uppercase tracking-widest rounded-full mb-6">Autonomie</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4">Maîtrisez votre autonomie</h3>
          <p className="text-lg opacity-80 mb-6 leading-relaxed">Devenez l'artisan de votre propre bien-être. Reprenez le pouvoir sur chaque étape de l'extraction.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Précision thermique absolue <strong className="font-semibold text-botanik-orange">±0,5°C</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Conception clinique en <strong>Inox 304</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-orange" /> <span>Liberté d'expérimentation totale</span></li>
          </ul>
        </div>
        <div>
          <div className="text-3xl font-bold mb-6 flex items-baseline gap-2 flex-wrap">
            <span>239 €</span>
            <span className="text-lg line-through opacity-50 font-normal">289 €</span>
            <span className="text-xs font-bold uppercase tracking-wider bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">code: Rentrée 2026</span>
          </div>
          <button onClick={() => onNavigate('boutique')} className="w-full py-4 px-6 bg-botanik-green text-white rounded-lg font-semibold hover:bg-botanik-green/90 transition-colors flex items-center justify-center gap-2 group">
            Acquérir ma BloomLab
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* DROITE : Le Laboratoire (Délégation en MAGENTA) */}
      <div className="bg-white border-2 border-botanik-magenta rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(118,14,43,0.12)] hover:shadow-[0_8px_40px_rgba(118,14,43,0.2)] transition-shadow duration-300 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-botanik-magenta/5 rounded-bl-full -z-10" />
        
        <div className="mb-8 flex-1">
          <div className="inline-block px-3 py-1 bg-botanik-green text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative z-10">Service Premium</div>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-wide mb-4 text-botanik-magenta">Déléguez votre extraction</h3>
          <p className="text-lg mb-6 leading-relaxed font-medium text-gray-800">Nous réalisons votre Totum sur-mesure sous contrat de traçabilité signé.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Expertise biochimique d'<strong>Élio</strong></span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Protocoles de laboratoire certifiés</span></li>
            <li className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-botanik-magenta" /> <span>Pureté garantie, effort nul</span></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-botanik-magenta/80 mb-4 font-medium uppercase tracking-wide">Sur devis & disponibilité</p>
          <button onClick={() => onNavigate('pending')} className="w-full py-4 px-6 bg-botanik-green text-white rounded-lg font-semibold hover:bg-botanik-sage transition-colors flex items-center justify-center gap-2 shadow-xl group">
            Solliciter le Laboratoire
            <FlaskConical className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  console.log("App: Component render function called");
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'fr';
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/de')) return 'de';
    return 'fr';
  });

  const t = translations[lang];

  const [currentView, setCurrentView] = useState<View>(() => {
    if (typeof window === 'undefined') return 'home';
    
    // 1. Check Hash first (as requested for environment isolation)
    const hash = window.location.hash.replace('#', '');
    if (hash && VIEW_PATHS[hash]) return hash as View;
    
    // 2. Check Pathname with fallback to exotic prefixes
    const rawPath = window.location.pathname;
    const langMatch = rawPath.match(/^\/(en|de)(\/.*)?$/);
    let restPath = langMatch ? (langMatch[2] || '/') : rawPath;
    if (restPath !== '/' && restPath.endsWith('/')) restPath = restPath.slice(0, -1);
    
    // Check for blog/product detail/terrain patterns first
    if (restPath.startsWith('/blog/')) return 'blog';
    if (restPath === '/boutique' || restPath === '/boutique/') return 'boutique';
    if (restPath === '/boutique/kits' || restPath === '/boutique/kits/') return 'boutique';
    if (restPath.startsWith('/boutique/')) return 'product-detail';
    if (restPath.startsWith('/terrain/')) return 'terrain';
    if (restPath.startsWith('/bibliotheque/') || restPath.startsWith('/herbier/')) return 'herbier';
    if (restPath.startsWith('/articles/')) return 'articles';
    
    const LEGACY_ALIASES: Record<string, string> = {
      '/about': '/manifeste',
      '/qu-est-ce-que-l-infusion-botanique': '/infusion-botanique',
      '/guide-extraction-botanique': '/extraction-botanique',
      '/extraction-botanique-guide-complet': '/extraction-botanique',
      '/herbier': '/bibliotheque',
      '/indexbis': '/',
      '/chroniques': '/blog',
      '/duo-argiles': '/cosmetique-botanique',
      '/cosmetiques': '/cosmetique-botanique',
    };
    const normalizedPath = LEGACY_ALIASES[restPath] || restPath;
    
    // Final fallback: if nothing matches normalizedPath, return 'home' instead of undefined
    const view = (PATH_VIEWS[normalizedPath] as View);
    return view || 'home';
  });

  const [currentProductId, setCurrentProductId] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const rawPath = window.location.pathname;
    const langMatch = rawPath.match(/^\/(en|de)(\/.*)?$/);
    let restPath = langMatch ? (langMatch[2] || '/') : rawPath;
    
    const productMatch = restPath.match(/^\/boutique\/([a-z0-9-]+)$/);
    if (productMatch) return productMatch[1];
    
    const terrainMatch = restPath.match(/^\/terrain\/([A-Z0-9_]+)$/);
    if (terrainMatch) return terrainMatch[1];
    
    const herbierMatch = restPath.match(/^\/(bibliotheque|herbier)\/([a-z0-9-]+)$/);
    if (herbierMatch) return herbierMatch[2];

    const newsletterMatch = restPath.match(/^\/newsletter\/preferences\/([a-z0-9-]+)$/);
    if (newsletterMatch) return newsletterMatch[1];
    
    return undefined;
  });

  const [blogPostSlug, setBlogPostSlug] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    let rawPath = window.location.pathname;
    try {
      rawPath = (sessionStorage.getItem('spa-redirect-path') || window.location.pathname).split('?')[0].split('#')[0];
    } catch (e) {
      console.warn("sessionStorage not available", e);
    }
    const langMatch = rawPath.match(/^\/(en|de)(\/.*)?$/);
    let restPath = langMatch ? (langMatch[2] || '/') : rawPath;
    
    const blogMatch = restPath.match(/^\/blog\/([a-z0-9-]+)$/);
    if (blogMatch) return blogMatch[1];
    
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('post') || undefined;
  });

  const [previousView, setPreviousView] = useState<View>('home');
  const [legalType, setLegalType] = useState<'cgv' | 'cgu' | 'privacy' | 'mentions' | 'withdrawal' | 'terms'>('mentions');
  const [cart, setCart] = useState<any[]>([]);
  const [shippingMethod, setShippingMethod] = useState<any>('mondialrelay');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSplashFinished, setIsSplashFinished] = useState(true);

  useEffect(() => {
    // Simple splash timeout - disabled for debug
    // const timer = setTimeout(() => setIsSplashFinished(true), 2500);
    // return () => clearTimeout(timer);
    setIsSplashFinished(true);
  }, []);
  
  // --- SPA ROUTING: sync URL with state ---
  const parseCurrentUrl = () => {
    const rawPath = (sessionStorage.getItem('spa-redirect-path') || window.location.pathname).split('?')[0].split('#')[0];
    const langMatch = rawPath.match(/^\/(en|de)(\/.*)?$/);
    const detectedLang = (langMatch ? langMatch[1] : 'fr') as Language;
    let restPath = langMatch ? (langMatch[2] || '/') : rawPath;
    
    // Normalize: remove trailing slash except for root
    if (restPath !== '/' && restPath.endsWith('/')) {
      restPath = restPath.slice(0, -1);
    }
    
    setLang(detectedLang);
    const langPrefix = detectedLang !== 'fr' ? `/${detectedLang}` : '';
    sessionStorage.removeItem('spa-redirect-path');

    const searchParams = new URLSearchParams(window.location.search);
    const queryPost = searchParams.get('post');
    if (queryPost) {
      setBlogPostSlug(queryPost);
    }

    if (restPath === '/droit-de-retractation' || restPath === '/retour-et-remboursement') {
      setLegalType('withdrawal');
      setCurrentView('legal');
      return;
    }

    if (restPath === '/conditions-generales-de-vente' || restPath === '/cgv') {
      setLegalType('cgv');
      setCurrentView('legal');
      return;
    }

    if (restPath === '/termes-et-conditions' || restPath === '/cgu') {
      setLegalType('cgu');
      setCurrentView('legal');
      return;
    }

    if (restPath === '/politique-de-confidentialite') {
      setLegalType('privacy');
      setCurrentView('legal');
      return;
    }

    if (restPath === '/mentions-legales') {
      setLegalType('mentions');
      setCurrentView('legal');
      return;
    }

    // --- Legacy route aliases (pre-redesign URLs) mapped to current views ---
    const LEGACY_ALIASES: Record<string, string> = {
      '/about': '/manifeste/',
      '/contact': '/manifeste/',
      '/how-it-works-diy-natural-recipes': '/boutique/',
      '/natural-herbal-infusion-body-care-oils-': '/cosmetique-botanique/',
      '/natural-herbal-infusion-face-skincare-recipes': '/cosmetique-botanique/',
      '/duo-argiles': '/cosmetique-botanique/',
      '/cosmetiques': '/cosmetique-botanique/',
      '/qu-est-ce-que-l-infusion-botanique': '/infusion-botanique/',
      '/extraction-plantes-naturelles-bienfaits': '/extraction-botanique/',
      '/guide-extraction-botanique': '/extraction-botanique/',
      '/extraction-botanique-guide-complet': '/extraction-botanique/',
      '/infusion-botanique-maison-comment-ca-marche': '/infusion-botanique/',
      '/herbier': '/herbier/',
      '/herbier/phytotherapie': '/phytotherapie-reset/',
      '/herbier/phytotherapie/': '/phytotherapie-reset/',
      '/herbier/therapeutic': '/phytotherapie-reset/',
      '/herbier/therapeutic/': '/phytotherapie-reset/',
      '/herbier/cosmetique': '/cosmetique-botanique/',
      '/herbier/cosmetique/': '/cosmetique-botanique/',
      '/herbier/cosmetiques': '/cosmetique-botanique/',
      '/herbier/cosmetiques/': '/cosmetique-botanique/',
      '/herbier/culinaire': '/gastronomie-botanique/',
      '/herbier/culinaire/': '/gastronomie-botanique/',
      '/bloomlab-extracteur-botanique-et-infuseur-dhuile-intelligent-6-en-1': '/bloomlab/',
      '/indexbis': '/',
      '/chroniques': '/blog/',
      '/tisane-ba': '/blog/',
      '/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98': '/blog/',
    };

    if (restPath === '/tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98') {
      setBlogPostSlug('tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes-spoiler-la-difference-est-de-1-a-98');
      setCurrentView('blog');
      return;
    }

    const normalizedPathRaw = LEGACY_ALIASES[restPath] || restPath;
    const normalizedPath = normalizedPathRaw === '/' ? '/' : (normalizedPathRaw.endsWith('/') ? normalizedPathRaw : `${normalizedPathRaw}/`);

    // 301 Permanent Client Redirection when hitting legacy alias
    if (LEGACY_ALIASES[restPath] && typeof window !== 'undefined') {
      const canonicalTargetUrl = `${langPrefix}${normalizedPath}`;
      window.history.replaceState({}, '', canonicalTargetUrl);
    }

    // --- Detect Blog detail URL pattern /blog/:slug ---
    const blogMatch = normalizedPath.match(/^\/blog\/([a-z0-9-]+)\/$/);
    if (blogMatch) {
      setBlogPostSlug(blogMatch[1]);
      setCurrentView('blog');
      return;
    }

    // --- Detect Herbier detail URL pattern /herbier/:id ---
    const herbierMatch = normalizedPath.match(/^\/herbier\/([A-Za-z0-9_]+)\/$/);
    if (herbierMatch) {
      setCurrentProductId(herbierMatch[1]);
      setCurrentView('herbier');
      return;
    }

    // --- Detect legacy herbarium patterns ---
    const legacyHerbariumMatch = normalizedPath.match(/^\/(bibliotheque|bibliotheque-savoirs)\/([A-Za-z0-9_]+)\/?$/);
    if (legacyHerbariumMatch) {
      setCurrentProductId(legacyHerbariumMatch[2]);
      setCurrentView('herbier');
      return;
    }

    // --- Detect culinary detail URL pattern /gastronomie-botanique/:id ---
    const culinaryMatch = normalizedPath.match(/^\/gastronomie-botanique\/([a-z0-9-]+)\/$/);
    if (culinaryMatch) {
      setCurrentProductId(culinaryMatch[1]);
      setCurrentView('culinaire');
      return;
    }

    // --- Detect cosmetics detail URL pattern /cosmetiques/:id ---
    const cosmeticsMatch = normalizedPath.match(/^\/cosmetiques\/([a-z0-9-]+)\/$/);
    if (cosmeticsMatch) {
      setCurrentProductId(cosmeticsMatch[1]);
      setCurrentView('cosmetiques');
      return;
    }

    // --- Detect terrain detail URL pattern /terrain/:id ---
    const terrainMatch = normalizedPath.match(/^\/terrain\/([A-Z0-9_]+)\/$/);
    if (terrainMatch) {
      setCurrentProductId(terrainMatch[1]);
      setCurrentView('terrain');
      return;
    }

    // --- Detect product detail URL pattern /boutique/:id ---
    const productMatch = normalizedPath.match(/^\/boutique\/([a-z0-9-]+)\/$/);
    if (productMatch && productMatch[1] !== 'kits') {
      setCurrentProductId(productMatch[1]);
      setCurrentView('product-detail');
      return;
    }

    // --- Detect articles detail URL pattern /articles/:id ---
    const articlesMatch = normalizedPath.match(/^\/articles\/([a-z0-9-]+)\/$/);
    if (articlesMatch) {
      setCurrentProductId(articlesMatch[1]);
      setCurrentView('articles');
      return;
    }

    // --- Detect newsletter preferences URL pattern /newsletter/preferences/:id ---
    const newsletterMatch = normalizedPath.match(/^\/newsletter\/preferences\/([a-z0-9-]+)\/$/);
    if (newsletterMatch) {
      setCurrentProductId(newsletterMatch[1]);
      setCurrentView('newsletter-preferences');
      return;
    }

    const matchedView = PATH_VIEWS[normalizedPath];
    if (matchedView) {
      setCurrentView(matchedView as typeof currentView);
      
      // Handle scrolling to specific section for legacy URL
      if (normalizedPath === '/infusion-botanique-maison-comment-ca-marche/' || (matchedView === 'guide' && window.location.hash === '#comprendre-infusion-botanique')) {
        setTimeout(() => {
          const element = document.getElementById('comprendre-infusion-botanique');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500);
      }
    }
  };

  useEffect(() => {
    parseCurrentUrl();

    const handlePopState = () => {
      parseCurrentUrl();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    const langPrefix = newLang === 'fr' ? '' : `/${newLang}`;
    let basePath = (VIEW_PATHS[currentView] || '/');
    if (currentView === 'product-detail' && currentProductId) {
      basePath = `/boutique/${currentProductId}/`;
    } else if (currentView === 'blog' && blogPostSlug) {
      basePath = `/blog/${blogPostSlug}/`;
    } else if (currentView === 'herbier' && currentProductId) {
      basePath = `/herbier/${currentProductId}/`;
    } else if (currentView === 'terrain' && currentProductId) {
      basePath = `/terrain/${currentProductId}/`;
    }
    
    // Ensure trailing slash for consistent URLs
    if (basePath !== '/' && !basePath.endsWith('/')) {
      basePath += '/';
    }
    
    if (basePath === '/' && newLang !== 'fr') basePath = '';
    const newPath = `${langPrefix}${basePath}` || '/';
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    navigateTo('cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const navigateTo = (view: typeof currentView, productId?: string, type?: any) => {
    if (view === 'account' && !user) {
      setShowAuthModal(true);
      return;
    }
    if (view !== 'pending' && currentView !== 'pending') setPreviousView(currentView);
    else if (view === 'pending') setPreviousView(currentView);
    
    if (view === 'legal' && type) setLegalType(type);
    
    setCurrentProductId(productId);
    if (view === 'blog') {
      setBlogPostSlug(productId);
    } else {
      setBlogPostSlug(undefined);
    }
    setCurrentView(view);

    const langPrefix = lang === 'fr' ? '' : `/${lang}`;
    let basePath = view === 'product-detail' && productId ? `/boutique/${productId}/` : (VIEW_PATHS[view] || '/');
    
    // SEO Clean URLs for Blog
    if (view === 'blog' && productId) {
      basePath = `/blog/${productId}/`;
    }

    // SEO Clean URLs for Articles
    if (view === 'articles' && productId) {
      basePath = `/articles/${productId}/`;
    }
    
    // SEO Clean URLs for Herbarium
    if (view === 'herbier' && productId) {
      basePath = `/herbier/${productId}/`;
    }
    
    // SEO Clean URLs for Cosmetics
    if (view === 'cosmetiques' && productId) {
      basePath = `/cosmetiques/${productId}/`;
    }
    
    // SEO Clean URLs for Culinary
    if (view === 'culinaire' && productId) {
      basePath = `/gastronomie-botanique/${productId}/`;
    }

    // SEO Clean URLs for Terrains
    if (view === 'terrain' && productId) {
      basePath = `/terrain/${productId}/`;
    }
    
    // SEO Clean URLs for specific view combinations
    if (view === 'boutique' && productId === 'kits') {
      basePath = '/boutique/kits/';
    }
    if (view === 'manifeste' && productId === 'contact') {
      basePath = '/contact/';
    }
    if (view === 'legal' && productId) {
      basePath = `/legal/${productId}/`;
    }
    
    // Consistent mapping for cosmetiques
    if (view === 'cosmetiques' && !productId) {
      basePath = '/cosmetique-botanique/';
    } else if (view === 'cosmetiques' && productId) {
      basePath = `/cosmetique-botanique/${productId}/`;
    }
    
    // Ensure trailing slash for all URLs except home
    if (basePath !== '/' && !basePath.endsWith('/')) {
      basePath += '/';
    }
    
    if (basePath === '/' && lang !== 'fr') basePath = '';
    const targetPath = `${langPrefix}${basePath}` || '/';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, currentProductId]);

  const [user, setUser] = useState<FirebaseUser | any | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isDiscovery, setIsDiscovery] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAdminLogin = () => {
    const adminUser = {
      uid: 'admin-uid',
      email: 'bloombybotanik@gmail.com',
      displayName: 'Admin Bloom',
    };
    setUser(adminUser);
    setIsPremium(true);
    setAuthLoading(false);
  };

  const handleSaveAssessment = async (result: any) => {
    setAssessmentResult(result);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          assessment: result,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    }
  };

  const handleToggleFavorite = async (itemId: string) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    
    setFavorites(newFavorites);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          favorites: newFavorites,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }
  };

  const handleResetAssessment = async () => {
    setAssessmentResult(null);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          assessment: null,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error resetting assessment:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        if (user.email === 'bloombybotanik@gmail.com') {
          setIsPremium(true);
        } else {
          // Fetch user premium status from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const premium = data?.isPremium || data?.status === 'premium';
            const discovery = data?.isDiscovery || data?.status === 'freemium' || premium;
            setIsPremium(premium);
            setIsDiscovery(discovery);
            setAssessmentResult(data?.assessment || null);
            setFavorites(data?.favorites || []);
          } else {
            await setDoc(doc(db, 'users', user.uid), {
              isPremium: false,
              isDiscovery: false,
              createdAt: new Date().toISOString()
            });
            setIsPremium(false);
            setIsDiscovery(false);
            setAssessmentResult(null);
            setFavorites([]);
          }
        }
      } else {
        setIsPremium(false);
        setIsDiscovery(false);
        setAssessmentResult(null);
        setFavorites([]);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (view: any) => {
    navigateTo(view);
  };

  const handleRequirePremium = () => {
    if (!user) {
      setShowAuthModal(true);
    } else if (!isPremium) {
      setShowPremiumModal(true);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigateTo('home');
  };

  const isBotOrPrerender = typeof window !== 'undefined' && (
    /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent) ||
    navigator.webdriver || 
    window.location.search.includes('prerender=true')
  );

  useEffect(() => {
    // Security timeout for Auth loading to prevent blocking bots/users indefinitely
    const timeout = setTimeout(() => {
      if (authLoading) setAuthLoading(false);
    }, isBotOrPrerender ? 500 : 3000);
    return () => clearTimeout(timeout);
  }, [authLoading, isBotOrPrerender]);

  // FORCE BYPASS LOADER FOR DEBUGGING
  if (false && (authLoading || !isSplashFinished) && !isBotOrPrerender) return (
    <div className="min-h-screen bg-[#293228] flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
      <div className="w-12 h-1 border-2 border-white/10 overflow-hidden relative rounded-full">
        <div className="absolute inset-0 bg-white/40 animate-loading-bar" />
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'home': return <IndexBisContent onNavigate={navigateTo} lang={lang} />;
      case 'boutique':
      case 'boutique-kits':
      case 'kits-botaniques': return (
        <StoreContent 
          onNavigate={navigateTo} 
          onAddToCart={(product) => addToCart(product)} 
          lang={lang} 
        />
      );
      case 'faq':
      case 'questions-frequentes': return (
        <FaqContent 
          onNavigate={navigateTo} 
          lang={lang} 
        />
      );
      case 'contact': return (
        <ContactContent 
          onNavigate={navigateTo} 
          lang={lang} 
        />
      );
      case 'machine': return <MachineLanding onNavigate={navigateTo} lang={lang} />;
      case 'votre-pratique':
      case 'parcours':
      case 'phytotherapie-reset': return (
        <PhytotherapyResetPage 
          onNavigate={navigateTo} 
          lang={lang} 
          isPremium={isPremium} 
          user={user} 
          onRequireAuth={() => setShowAuthModal(true)} 
        />
      );
      case 'library-landing': return <LibraryLanding onNavigate={navigateTo} lang={lang} />;
      case 'indexbis': return <IndexBisContent onNavigate={navigateTo} lang={lang} />;
      case 'guide':
      case 'qu-est-ce-que-infusion':
      case 'how_it_works': return <GuideContent onNavigate={navigateTo} lang={lang} />;
      case 'ateliers': return (
        <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in duration-700">
          <h2 className="text-3xl font-bold text-botanik-green mb-8">{t.nav.guide}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigateTo('culinaire')} className="group cursor-pointer bg-white border border-botanik-green/5 p-8 rounded-3xl hover:border-botanik-orange transition-colors">
              <ChefHat className="w-12 h-12 text-botanik-orange mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-botanik-green mb-2">L'Atelier Culinaire</h3>
              <p className="text-botanik-green/60 text-sm mb-6 leading-relaxed">Maîtrisez l'art de l'infusion et des terpènes pour une gastronomie vivante.</p>
              <div className="flex items-center gap-2 text-botanik-orange font-bold text-sm">Découvrir <ArrowRight className="w-4 h-4" /></div>
            </div>
            <div onClick={() => navigateTo('cosmetiques')} className="group cursor-pointer bg-white border border-botanik-green/5 p-8 rounded-3xl hover:border-botanik-green transition-colors">
              <Star className="w-12 h-12 text-botanik-green mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-botanik-green mb-2">Les Soins Cosmétiques</h3>
              <p className="text-botanik-green/60 text-sm mb-6 leading-relaxed">Créez vos propres sérums et élixirs systémiques sans chimie de synthèse.</p>
              <div className="flex items-center gap-2 text-botanik-green font-bold text-sm">Découvrir <ArrowRight className="w-4 h-4" /></div>
            </div>
            <div onClick={() => navigateTo('library')} className="group cursor-pointer bg-botanik-green/5 border border-botanik-green/10 p-8 rounded-3xl hover:bg-botanik-green transition-colors">
              <FlaskConical className="w-12 h-12 text-botanik-green mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold text-botanik-green group-hover:text-white transition-colors mb-2">Phytothérapie Experte</h3>
              <p className="text-botanik-green/60 group-hover:text-white/60 text-sm mb-6 leading-relaxed">Accédez aux protocoles avancés et aux 56 kits de précision BloomLab.</p>
              <div className="flex items-center gap-2 text-botanik-green group-hover:text-white font-bold text-sm transition-colors">Explorer <ArrowRight className="w-4 h-4" /></div>
            </div>
          </div>
        </div>
      );
      case 'library':
      case 'herbier':
      case 'herbarium': return (
        <HerbariumContent 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialPlantId={currentProductId}
          lang={lang}
        />
      );
      case 'culinaire':
      case 'gastronomie-botanique': return (
        <CulinarySection 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialPlantId={currentProductId}
          lang={lang}
        />
      );
      case 'cosmetiques':
      case 'cosmetique-botanique': return (
        <CosmeticsContent 
          isPremium={isPremium} 
          onRequirePremium={handleRequirePremium} 
          onNavigatePending={() => navigateTo('pending')}
          onNavigate={navigateTo}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialPlantId={currentProductId}
          lang={lang}
        />
      );
      case 'pending': return <PendingContent onBack={() => navigateTo(previousView === 'pending' ? 'home' : previousView)} lang={lang} />;
      case 'product-detail': return (
        <ProductDetail 
          onBack={() => navigateTo('boutique')} 
          onAddToCart={(product) => addToCart(product)} 
          onNavigate={navigateTo}
          productId={currentProductId} 
          lang={lang} 
        />
      );
      case 'cart': return (
        <CartContent 
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onBack={() => navigateTo('boutique')}
          onCheckout={() => navigateTo('checkout')}
          onNavigate={navigateTo}
          lang={lang}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />
      );
      case 'checkout': return (
        <CheckoutFlow 
          cart={cart}
          total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          shippingMethod={shippingMethod}
          user={user}
          onSuccess={() => {
            setCart([]);
            navigateTo('home');
          }}
          onCancel={() => navigateTo('cart')}
          lang={lang}
        />
      );
      case 'recettes': return <RecipesContent onBack={() => navigateTo('home')} lang={lang} t={t} />;
      case 'guides': return <BlogContent lang={lang} onNavigate={navigateTo} initialSlug={blogPostSlug} />;
      case 'articles': return (
        <ArticlesContent 
          lang={lang} 
          onNavigate={navigateTo} 
          initialSlug={currentProductId} 
        />
      );
      case 'infusion-precision':
      case 'totum-definition':
      case 'totum-vegetal':
      case 'solvants-extraction':
      case 'teinture-mere': return (
        <SEOArticles view={currentView} lang={lang} t={t} onNavigate={navigateTo} />
      );
      case 'premium-info':
      case 'abonnement': return (
        <PremiumInfoContent 
          onNavigate={navigateTo} 
          onAddToCart={addToCart} 
          lang={lang} 
        />
      );
      case 'chat': return (
        <ChatContent 
          isPremium={isPremium} 
          onNavigate={navigateTo} 
          user={user}
          onRequireAuth={() => setShowAuthModal(true)}
          onSaveAssessment={handleSaveAssessment}
          savedAssessment={assessmentResult}
          onResetAssessment={handleResetAssessment}
          lang={lang}
        />
      );
      case 'manifeste': return <ManifesteContent onBack={() => navigateTo(previousView === 'manifeste' ? 'home' : previousView)} onNavigate={navigateTo} lang={lang} />;
      case 'terrain': return (
        <TerrainPillar 
          terrainId={currentProductId || 'T1'} 
          lang={lang} 
          onNavigate={navigateTo} 
        />
      );
      case 'pillar-extraction': 
      case 'extraction-botanique':
      case 'infuseur-botanique':
      case 'guide-complet': return <PillarExtraction onNavigate={navigateTo} lang={lang} />;
      case 'infusion-botanique': return <PillarInfusion lang={lang} onNavigate={navigateTo} />;
      case 'huile-infusee':
      case 'maceration-plantes': return <PillarOil lang={lang} onNavigate={navigateTo} />;
      case 'plantes-adaptogenes': return <PillarAdaptogens lang={lang} onNavigate={navigateTo} />;
      case 'activation': return (
        <ActivationPage 
          userId={user?.uid || null} 
          onSuccess={() => {
            setIsPremium(true);
            navigateTo('library');
          }} 
          lang={lang}
        />
      );
      case 'account': return (
        <AccountContent 
          user={user} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
          lang={lang}
        />
      );
      case 'admin': return (
        user?.email === 'bloombybotanik@gmail.com' ? <AdminDashboard lang={lang} /> : <HomeContent onNavigate={navigateTo} lang={lang} />
      );
      case 'admin-newsletter': return (
        user?.email === 'bloombybotanik@gmail.com' ? <AdminNewsletter lang={lang} /> : <HomeContent onNavigate={navigateTo} lang={lang} />
      );
      case 'blog': return <BlogContent lang={lang} onNavigate={navigateTo} initialSlug={blogPostSlug} />;
      case 'legal': return <LegalPages type={legalType} onBack={() => navigateTo(previousView)} lang={lang} />;
      case 'newsletter-preferences': return <NewsletterPreferences subscriberId={currentProductId || ''} lang={lang} />;
      default: return <IndexBisContent onNavigate={navigateTo} lang={lang} />;
    }
  };

  const MobileHeader = () => (
    <header className="lg:hidden sticky top-0 bg-[#0F261E] z-[60] border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-sm">
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigateTo('home')}
      >
        <img 
          src="/assets/images/logo_sidebar_1784886108085.png" 
          alt="Bloom by BotaniK" 
          className="h-10 w-auto"
        />
        <div className="ml-3 font-semibold tracking-wide flex flex-col leading-tight text-[#F9F9F7]">
          <span className="text-xl font-bold">Bloom</span>
          <span className="text-sm opacity-80">by BotaniK</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSelector lang={lang} setLang={handleLanguageChange} variant="mobile-header" />
        
        <button onClick={() => navigateTo('cart')} className="relative text-white p-2" aria-label={lang === 'fr' ? 'Accéder au panier Bloom' : 'Access Bloom shopping cart'}>
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#293228]">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );

  return (
    <div className="flex relative min-h-screen bg-[#F9F9F7]">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => {}}
        onAdminLogin={handleAdminLogin}
      />
      
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={async () => {
          if (user) {
            await setDoc(doc(db, 'users', user.uid), { isPremium: true }, { merge: true });
            setIsPremium(true);
          }
        }}
      />

      <CookieBanner lang={lang} />
      {currentView !== 'chat' && <FloatingChat user={user} lang={lang} />}
      
      <SEOMetadata lang={lang} currentView={currentView} t={t} productId={currentProductId} blogPostSlug={blogPostSlug} />
      
      {/* Desktop Sidebar */}
      <NavigationSidebar 
        className="hidden lg:flex" 
        currentView={currentView} 
        currentProductId={currentProductId}
        navigateTo={navigateTo} 
        user={user} 
        handleLogout={handleLogout} 
        lang={lang}
        setLang={handleLanguageChange}
        t={t}
        isDiscovery={isDiscovery}
        isPremium={isPremium}
      />

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-[#0F261E]/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0F261E] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/5">
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/10">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/images/logo_sidebar_1784886108085.png" 
                  alt="Bloom by BotaniK" 
                  className="h-10 w-auto"
                />
                <div className="ml-3 font-semibold tracking-wide flex flex-col leading-tight text-[#F9F9F7]">
                  <span className="text-lg">Bloom</span>
                  <span className="text-sm">by BotaniK</span>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-[#F9F9F7]/60 hover:text-[#F9F9F7] transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 py-8 custom-scrollbar">
              <div className="space-y-10 text-[#F9F9F7]">
                {/* 1. ACCUEIL */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.accueil}</h3>
                  <div className="space-y-3">
                    <a
                      href={VIEW_PATHS['home']}
                      onClick={(e) => { e.preventDefault(); navigateTo('home'); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all text-left group border-2 ${
                        currentView === 'home'
                          ? 'bg-botanik-orange text-white border-botanik-orange shadow-lg shadow-botanik-orange/20' 
                          : 'bg-white/5 text-[#F9F9F7] border-white/10 hover:border-botanik-orange/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Home className={`w-6 h-6 ${(currentView === 'home') ? 'text-white' : 'text-botanik-orange'}`} />
                        <div className="flex flex-col">
                          <span className="font-black text-lg tracking-tight leading-none">{t.nav.accueil.toUpperCase()}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>

                {/* 1. POURQUOI BLOOM */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.pourquoi_bloom || "POURQUOI BLOOM"}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'manifeste', label: t.nav.pourquoi_bloom_sub?.manifeste || "Le Manifeste", icon: FileText },
                      { id: 'chat', label: t.nav.pourquoi_bloom_sub?.audit || "Je commence / Diagnostic", icon: Sparkles },
                    ].map((item: any) => (
                      <a
                        key={item.id}
                        href={VIEW_PATHS[item.id]}
                        onClick={(e) => { e.preventDefault(); navigateTo(item.id); setIsMenuOpen(false); }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                          (currentView === item.id) ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-botanik-orange opacity-80" />
                        <span className="font-bold text-base tracking-tight">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 2. LA MÉTHODE A/B */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.methode_ab || "LA MÉTHODE A/B"}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'machine', label: t.nav.methode_ab_sub?.extraction || "Extraction de précision", icon: FlaskConical },
                      { id: 'product-detail', label: t.nav.methode_ab_sub?.bloomlab || "L'Extracteur BloomLab®", icon: Award, param: 'bloomlab' },
                      { id: 'pillar-extraction', label: t.nav.methode_ab_sub?.guide_methodes || "Guide complet des méthodes", icon: BookOpen },
                      { id: 'totum-definition', label: t.nav.methode_ab_sub?.totum || "Le Totum Végétal", icon: Leaf },
                    ].map((item: any) => (
                      <a
                        key={item.id}
                        href={item.param ? '#' : VIEW_PATHS[item.id]}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          if (item.param) navigateTo(item.id, item.param);
                          else navigateTo(item.id); 
                          setIsMenuOpen(false); 
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                          (currentView === item.id && (!item.param || currentProductId === item.param)) ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-botanik-orange opacity-80" />
                        <span className="font-bold text-base tracking-tight">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. VOTRE PRATIQUE */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.votre_pratique || "VOTRE PRATIQUE"}</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'culinaire', label: t.nav.votre_pratique_sub?.culinaire || "Atelier Culinaire", icon: Utensils },
                      { id: 'cosmetiques', label: t.nav.votre_pratique_sub?.cosmetique || "Cosmétique Botanique", icon: Droplets },
                      { id: 'phytotherapie-reset', label: t.nav.votre_pratique_sub?.systemique || "Protocoles Systémiques", icon: Wind },
                      { id: 'herbier', label: t.nav.votre_pratique_sub?.herbier || "L'Herbier", icon: BookOpen },
                    ].map((item: any) => (
                      <a
                        key={item.id}
                        href={VIEW_PATHS[item.id]}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          navigateTo(item.id); 
                          setIsMenuOpen(false); 
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                          (currentView === item.id) ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-botanik-orange" />
                        <span className="font-bold text-base tracking-tight">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 4. TRANSMISSION */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.transmission || "TRANSMISSION"}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'library-landing', label: t.nav.transmission_sub?.bibliotheque || "Bibliothèque Scientifique", icon: Microscope, onClick: () => navigateTo('library-landing') },
                      { id: 'faq', label: t.nav.transmission_sub?.faq || "Questions Fréquentes", icon: HelpCircle, onClick: () => navigateTo('faq') },
                      { id: 'contact', label: t.nav.transmission_sub?.contact || "Nous Contacter", icon: MessageCircle, onClick: () => navigateTo('contact') },
                    ].map((item: any) => (
                      <a
                        key={item.id}
                        href={VIEW_PATHS[item.id] || '#'}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          if (item.onClick) item.onClick();
                          else navigateTo(item.id); 
                          setIsMenuOpen(false); 
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                          (currentView === item.id) ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-botanik-orange opacity-80" />
                        <span className="font-bold text-base tracking-tight">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 5. BOUTIQUE */}
                <div>
                  <h3 className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D1D5DB] mb-3">{t.nav.boutique_nav}</h3>
                  <div className="space-y-2">
                    <a
                      href={VIEW_PATHS['boutique']}
                      onClick={(e) => { e.preventDefault(); navigateTo('boutique'); setIsMenuOpen(false); }}
                      className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                        currentView === 'boutique' && !searchParams.get('category') ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5 text-botanik-orange" />
                      <span className="font-bold text-base tracking-tight">{lang === 'fr' ? "Toute la Boutique" : "All Products"}</span>
                    </a>
                    <a
                      href={VIEW_PATHS['boutique-kits'] || '/boutique/kits/'}
                      onClick={(e) => { e.preventDefault(); navigateTo('boutique', 'kits'); setIsMenuOpen(false); }}
                      className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all text-left group ${
                        currentView === 'boutique' && searchParams.get('category') === 'kits' ? 'bg-[#1C3F34] text-white shadow-md' : 'text-[#F9F9F7]/80 hover:bg-[#1C3F34] hover:text-white'
                      }`}
                    >
                      <Package className="w-5 h-5 text-botanik-orange" />
                      <span className="font-bold text-base tracking-tight">{t.nav.boutique_sub.kits}</span>
                    </a>
                    <a
                      href={VIEW_PATHS['abonnement'] || '/abonnement/'}
                      onClick={(e) => { e.preventDefault(); navigateTo('abonnement'); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left group bg-botanik-orange text-white shadow-xl shadow-black/10`}
                    >
                      <div className="flex items-center gap-4">
                        <Star className="w-6 h-6" />
                        <div className="flex flex-col">
                          <span className="font-black text-lg tracking-tight leading-none">{t.nav.boutique_sub.abonnement.toUpperCase()}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-8 border-t border-white/5 bg-black/10 space-y-8">
              <button 
                onClick={() => { navigateTo('account'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-5 rounded-3xl bg-[#1C3F34] border border-white/5 text-[#F9F9F7] hover:bg-[#1C3F34]/80 transition-colors shadow-inner"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-botanik-orange to-[#FF9D66] flex items-center justify-center text-white shadow-lg shadow-botanik-orange/20">
                  <User className="w-6 h-6" />
                </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-base tracking-tight text-[#F9F9F7]">
                      {t.nav.compte_sub.espace}
                    </span>
                    <span className="text-xs text-[#F9F9F7]/30 uppercase tracking-widest font-black">
                      {lang === 'fr' ? 'Espace Membre' : lang === 'de' ? 'Mitgliederbereich' : 'Member Area'}
                    </span>
                  </div>
              </button>
              
              <div className="space-y-6">
                <div className="flex justify-center">
                  <LanguageSelector lang={lang} setLang={handleLanguageChange} variant="sidebar" />
                </div>
                
                <p className="text-center text-[10px] text-white/20 italic leading-relaxed px-4">
                  {lang === 'fr' 
                    ? '"L\'Ingénierie au service du vivant. Bloom by BotaniK est la clé."'
                    : lang === 'de'
                    ? '"Ingenieurwesen im Dienste des Lebens. Bloom by BotaniK ist der Schlüssel."'
                    : '"Engineering for life. Bloom by BotaniK is the key."'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full lg:max-w-[calc(100vw-20rem)] flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 w-full">
          <MobileHeader />
          {renderMainContent()}
        </div>
        <Footer onNavigate={navigateTo} lang={lang} />
      </main>
    </div>
  );
}

