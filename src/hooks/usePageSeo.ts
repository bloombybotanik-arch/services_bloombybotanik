import { useEffect } from 'react';
import { Language } from '../translations';
import { VIEW_PATHS } from '../types';
import { getRouteMeta, SITE_ORIGIN } from '../seo/routesMeta';
import { updateDocumentSEO } from '../utils/seoManager';

interface UsePageSeoOptions {
  view: string;
  lang: Language;
  productId?: string;
  slug?: string;
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageSeo({ view, lang, productId, slug }: UsePageSeoOptions) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    updateDocumentSEO(view, lang, productId, slug);

    const hasActiveSeoHead = Boolean(
      document.head.querySelector('meta[name="seo-head-active"][content="true"]')
    );
    if (
      hasActiveSeoHead &&
      (view === 'indexbis' ||
        view === 'home' ||
        view === 'machine' ||
        view === 'bloomlab' ||
        view === 'product-detail')
    ) {
      return;
    }

    const currentPath =
      typeof window !== 'undefined' ? window.location.pathname : VIEW_PATHS[view] || '/';
    const routeMeta =
      getRouteMeta(currentPath) ||
      (VIEW_PATHS[view] ? getRouteMeta(VIEW_PATHS[view]) : undefined);

    if (routeMeta && lang === 'fr') {
      const fullImage = `${SITE_ORIGIN}${routeMeta.image1200}`;
      upsertMeta('property', 'og:image', fullImage);
      upsertMeta('property', 'og:image:secure_url', fullImage);
      upsertMeta('property', 'og:image:alt', routeMeta.alt);
      upsertMeta('name', 'twitter:image', fullImage);
      upsertMeta('name', 'twitter:image:alt', routeMeta.alt);
    }
  }, [view, lang, productId, slug]);
}

export default usePageSeo;
