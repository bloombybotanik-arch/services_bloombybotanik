export function updateDocumentSEO(config?: any, ...rest: any[]) {
  if (typeof document === 'undefined' || !config) return;

  if (typeof config === 'string') {
    document.title = config;
    return;
  }

  if (config.title) {
    document.title = config.title;
  }

  if (config.description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.description);
  }

  if (config.canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', config.canonical);
  }

  if (config.schema) {
    let scriptTag = document.querySelector('#seo-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(config.schema);
  }
}
