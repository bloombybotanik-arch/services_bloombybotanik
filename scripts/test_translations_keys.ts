import { translations, Language } from '../src/translations';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Échec assertion : ${message}`);
  }
}

function checkLocale(langCode: string, localeObj: any) {
  console.log(`Vérification de la locale '${langCode}'...`);
  assert(typeof localeObj === 'object' && localeObj !== null, `Locale ${langCode} doit être un objet`);

  // 1. Clés SEO
  assert(typeof localeObj.seo === 'object' && localeObj.seo !== null, `seo doit être un objet`);
  assert(typeof localeObj.seo.alt === 'object' && localeObj.seo.alt !== null, `seo.alt doit être un objet`);
  assert(typeof localeObj.seo.alt.extracteur === 'string' && localeObj.seo.alt.extracteur.length > 0, `seo.alt.extracteur doit être une chaîne non vide`);
  assert(typeof localeObj.seo.alt.bloomlab === 'string' && localeObj.seo.alt.bloomlab.length > 0, `seo.alt.bloomlab doit être une chaîne non vide`);
  assert(typeof localeObj.seo.keywords === 'string' && localeObj.seo.keywords.length > 0, `seo.keywords doit être une chaîne non vide`);
  assert(typeof localeObj.seo.infusion_guide === 'object' && localeObj.seo.infusion_guide !== null, `seo.infusion_guide doit être un objet`);
  assert(typeof localeObj.seo.infusion_guide.title === 'string' && localeObj.seo.infusion_guide.title.length > 0, `seo.infusion_guide.title doit être une chaîne non vide`);
  assert(typeof localeObj.seo.infusion_guide.summary === 'string' && localeObj.seo.infusion_guide.summary.length > 0, `seo.infusion_guide.summary doit être une chaîne non vide`);
  assert(Array.isArray(localeObj.seo.infusion_guide.faq), `seo.infusion_guide.faq doit être un tableau`);
  assert(localeObj.seo.infusion_guide.faq.length >= 1, `seo.infusion_guide.faq doit contenir au moins 1 élément`);

  // 2. Clés Guide
  assert(typeof localeObj.guide === 'object' && localeObj.guide !== null, `guide doit être un objet`);
  assert(typeof localeObj.guide.machine === 'object', `guide.machine doit être un objet`);
  assert(typeof localeObj.guide.machine.title === 'string', `guide.machine.title doit être une chaîne`);
  assert(typeof localeObj.guide.levels === 'object', `guide.levels doit être un objet`);
  assert(typeof localeObj.guide.principles === 'object', `guide.principles doit être un objet`);

  // 3. Clés Home
  assert(typeof localeObj.home === 'object' && localeObj.home !== null, `home doit être un objet`);
  assert(typeof localeObj.home.way === 'object', `home.way doit être un objet`);
  assert(typeof localeObj.home.way.title === 'string', `home.way.title doit être une chaîne`);

  // 4. Clés Store
  assert(typeof localeObj.store === 'object' && localeObj.store !== null, `store doit être un objet`);
  assert(typeof localeObj.store.header === 'object', `store.header doit être un objet`);
  assert(typeof localeObj.store.header.title === 'string', `store.header.title doit être une chaîne`);
  assert(typeof localeObj.store.hero === 'object', `store.hero doit être un objet`);
  assert(typeof localeObj.store.hero.title === 'string', `store.hero.title doit être une chaîne`);
  assert(typeof localeObj.store.products === 'object', `store.products doit être un objet`);
  assert(typeof localeObj.store.products.bloomlab === 'object', `store.products.bloomlab doit être un objet`);
  assert(typeof localeObj.store.products.bloomlab.name === 'string', `store.products.bloomlab.name doit être une chaîne`);
  assert(Array.isArray(localeObj.store.products.bloomlab.bullets), `store.products.bloomlab.bullets doit être un tableau`);

  console.log(`  -> Locale '${langCode}' validée avec succès.`);
}

export function runTranslationsValidation() {
  console.log('=== Contrôle ciblé de la présence et du type des clés de traduction ===');

  // Test fr, en, de
  for (const lang of ['fr', 'en', 'de'] as Language[]) {
    checkLocale(lang, translations[lang]);
  }

  // Test repli sur langue invalide (ex: 'es', 'invalide', undefined)
  const invalidLang = 'es' as any;
  const fallback = translations[invalidLang as keyof typeof translations] || translations.fr;
  console.log(`Vérification du repli pour langue inconnue ('${invalidLang}')...`);
  assert(fallback === translations.fr, 'Une langue non supportée doit se replier sur translations.fr');
  checkLocale('repli-fr', fallback);

  console.log('=== Toutes les vérifications de traduction ont réussi ! ===\n');
}

runTranslationsValidation();
