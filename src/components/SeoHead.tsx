import { useEffect } from 'react';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  lang?: 'fr' | 'en' | 'de';
  noindex?: boolean;
  schemas?: Record<string, any>[];
}

const DEFAULT_ORIGIN = 'https://bloombybotanik.com';
const DEFAULT_OG_IMAGE = `${DEFAULT_ORIGIN}/images/og/bloom-extracteur-infuseur-botanique-1200x630.jpg`;

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let meta = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertLinkTag(rel: string, attrs: Record<string, string>) {
  const selectorParts = Object.entries(attrs)
    .filter(([key]) => key !== 'href')
    .map(([key, val]) => `[${key}="${val}"]`)
    .join('');
  const selector = `link[rel="${rel}"]${selectorParts}`;
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    Object.entries(attrs).forEach(([key, val]) => {
      if (key !== 'href') link!.setAttribute(key, val);
    });
    document.head.appendChild(link);
  }
  if (attrs.href) {
    link.setAttribute('href', attrs.href);
  }
  return link;
}

function resolveSelfCanonical(explicitCanonical?: string): string {
  if (explicitCanonical) {
    return explicitCanonical;
  }
  if (typeof window === 'undefined') {
    return `${DEFAULT_ORIGIN}/`;
  }
  const cleanPathname = window.location.pathname || '/';
  return `${window.location.origin}${cleanPathname}`;
}

export function SeoHead({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  lang = 'fr',
  noindex = false,
  schemas = [],
}: SeoHeadProps) {
  const serializedSchemas = JSON.stringify(schemas);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const resolvedCanonical = resolveSelfCanonical(canonical);
    const isEnRoute =
      typeof window !== 'undefined' && window.location.pathname.startsWith('/en/');
    const effectiveNoindex = noindex || isEnRoute;

    // 1. Langue du document HTML
    document.documentElement.lang = lang;

    // 2. Title & Meta Description / Open Graph / Twitter
    document.title = title;
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', resolvedCanonical);
    upsertMetaTag('property', 'og:image', ogImage);
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', ogImage);

    // 3. Directive robots
    upsertMetaTag(
      'name',
      'robots',
      effectiveNoindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1'
    );

    // Marqueur indiquant à seoManager.ts que la route active est pilotée par <SeoHead />
    upsertMetaTag('name', 'seo-head-active', 'true');

    // 4. Balise canonical auto-référencée
    const canonicalEl = upsertLinkTag('canonical', { href: resolvedCanonical });
    canonicalEl.setAttribute('data-seo-head', 'true');

    // 5. Balises hreflang (fr / en / x-default)
    const frHref = resolvedCanonical.replace(`${DEFAULT_ORIGIN}/en/`, `${DEFAULT_ORIGIN}/`);
    const enHref = frHref.includes('?') ? `${frHref}&lang=en` : `${frHref}?lang=en`;

    upsertLinkTag('alternate', { hreflang: 'fr', href: frHref });
    upsertLinkTag('alternate', { hreflang: 'en', href: enHref });
    upsertLinkTag('alternate', { hreflang: 'x-default', href: frHref });

    // 6. Données structurées JSON-LD dédiées à la route
    const injectedScripts: HTMLScriptElement[] = [];
    document
      .querySelectorAll('script[data-seo-head-jsonld="true"]')
      .forEach((node) => node.remove());

    if (schemas.length > 0) {
      document.getElementById('bloom-ssr-schema')?.remove();
      // Préserver Organization + WebSite site-wide tout en évitant les doublons Product/FAQPage issus du graphe racine
      const rootSchemaEl = document.getElementById('bloom-root-schema');
      if (rootSchemaEl) {
        rootSchemaEl.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://bloombybotanik.com/#organization',
              name: 'Bloom by BotaniK',
              url: 'https://bloombybotanik.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bloombybotanik.com/assets/img/logo-bloom-square-512.png',
                width: 512,
                height: 512,
              },
              sameAs: [
                'https://www.instagram.com/bloombybotanik/',
                'https://www.tiktok.com/@bloombybotanik',
                'https://www.youtube.com/@BloomByBotanik',
                'https://fr.pinterest.com/bloombybotanik',
                'https://www.facebook.com/profile.php?id=61577892110122',
                'https://www.amazon.fr/dp/B0F7GGTMNR',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': 'https://bloombybotanik.com/#website',
              url: 'https://bloombybotanik.com',
              name: 'Bloom by BotaniK',
              publisher: { '@id': 'https://bloombybotanik.com/#organization' },
            },
          ],
        });
      }

      schemas.forEach((schemaObj, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `seo-head-jsonld-${index}`;
        script.setAttribute('data-seo-head-jsonld', 'true');
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
        injectedScripts.push(script);
      });
    }

    return () => {
      const marker = document.head.querySelector('meta[name="seo-head-active"]');
      if (marker) marker.remove();
      injectedScripts.forEach((script) => script.remove());
    };
  }, [title, description, canonical, ogType, ogImage, lang, noindex, serializedSchemas]);

  return null;
}

export default SeoHead;
