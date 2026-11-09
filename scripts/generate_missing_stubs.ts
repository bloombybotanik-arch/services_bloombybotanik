import fs from 'fs';
import path from 'path';

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
  console.log(`Created ${relPath}`);
}

// 1. Data files
writeFile('src/data/therapeuticData.ts', `
export const therapeuticData = [
  { plant_id: 'romarin', name: 'Romarin', latin: 'Rosmarinus officinalis', terrain: 'T1' },
  { plant_id: 'thym', name: 'Thym', latin: 'Thymus vulgaris', terrain: 'T2' },
  { plant_id: 'calendula', name: 'Calendula', latin: 'Calendula officinalis', terrain: 'T9' }
];
export default therapeuticData;
`);

writeFile('src/data/blogPosts.ts', `
export const blogPosts = [
  { id: '1', slug: 'vieillissement-myeline-fgf17', title: 'Vieillissement et Myéline : le facteur FGF17', excerpt: 'Comprendre la plasticité cérébrale et le rôle du terrain neuronal.', date: '2026-09-15', category: 'Neuro-Science' },
  { id: '2', slug: 'totum-vegetal-synergie', title: 'Le Totum Végétal face aux molécules isolées', excerpt: 'Pourquoi la synergie naturelle surpasse les extractions sélectives.', date: '2026-09-20', category: 'Herboristerie' }
];
export default blogPosts;
`);

writeFile('src/data/lexique.ts', `
export const lexiqueTerms = [
  { id: 'homeostasie', term: 'Homéostasie', definition: 'Capacité dynamique de l\\'organisme à maintenir son équilibre physiologique.' },
  { id: 'totum', term: 'Totum végétal', definition: 'Ensemble intégral des molécules actives d\\'une plante agissant en synergie.' },
  { id: 'terrain', term: 'Terrain biologique', definition: 'État global de l\\'écosystème corporel conditionnant la vitalité.' }
];
export const lexiqueCategories: Record<string, { label: string; terms: string[] }> = {
  general: { label: 'Général', terms: ['homeostasie', 'totum', 'terrain'] }
};
export default lexiqueTerms;
`);

writeFile('src/data/lexiqueDefinitions.ts', `
export const lexiqueDefinitions: Record<string, { term: string; def: string; category?: string }> = {
  'homeostasie': { term: 'Homéostasie', def: 'Équilibre dynamique des systèmes vivants.' },
  'totum': { term: 'Totum', def: 'Ensemble moléculaire complet de la plante.' },
  'terrain': { term: 'Terrain', def: 'Configuration biologique et énergétique individuelle.' }
};
export default lexiqueDefinitions;
`);

writeFile('src/data/resetDetails.ts', `
export const resetDetails: Record<string, any> = {
  'T1': { id: 'T1', title: 'Terrain Émonctoires & Détoxication', summary: 'Soutien hépato-rénal doux.' },
  'T2': { id: 'T2', title: 'Terrain Barrière Intestinale', summary: 'Intégrité de la muqueuse et équilibre du microbiote.' }
};
export default resetDetails;
`);

writeFile('src/data/translations/psoriasisTranslations.ts', `
export const psoriasisTranslations = {
  fr: { title: 'Protocole Psoriasis & Terrain Cutané' },
  en: { title: 'Psoriasis & Skin Terrain Protocol' },
  de: { title: 'Psoriasis & Haut-Terrain Protokoll' }
};
export default psoriasisTranslations;
`);

writeFile('src/lib/textUtils.ts', `
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
`);

// 2. UI Components
writeFile('src/components/AcademyNavigation.tsx', `
import React from 'react';
export const AcademyNavigation: React.FC<{ currentSlug?: string; onNavigate?: (view: any) => void }> = () => {
  return (
    <nav className="flex gap-4 text-xs font-mono py-4 border-b border-stone-200">
      <a href="/academie" className="hover:text-emerald-700">Académie Bloom</a>
      <a href="/comprendre-le-modele-bloom" className="hover:text-emerald-700">Modèle Bloom</a>
      <a href="/protocoles" className="hover:text-emerald-700">Protocoles</a>
    </nav>
  );
};
export default AcademyNavigation;
`);

writeFile('src/components/AdminDashboard.tsx', `
import React from 'react';
export const AdminDashboard: React.FC = () => {
  return <div className="p-8"><h1 className="text-xl font-bold">Administration Bloom</h1></div>;
};
export default AdminDashboard;
`);

writeFile('src/components/AdminNewsletter.tsx', `
import React from 'react';
export const AdminNewsletter: React.FC = () => {
  return <div className="p-8"><h1 className="text-xl font-bold">Gestion Newsletter</h1></div>;
};
export default AdminNewsletter;
`);

writeFile('src/components/AmazonSocialProof.tsx', `
import React from 'react';
export const AmazonSocialProof: React.FC = () => {
  return <div className="py-2 text-xs text-stone-500">Noté 4.9/5 par plus de 1 200 utilisateurs</div>;
};
export default AmazonSocialProof;
`);

writeFile('src/components/ExtractionCalculator.tsx', `
import React from 'react';
export const ExtractionCalculator: React.FC<{ isOpen?: boolean; onClose?: () => void }> = () => {
  return null;
};
export default ExtractionCalculator;
`);

writeFile('src/components/ExtractionKineticsChart.tsx', `
import React from 'react';
export const ExtractionKineticsChart: React.FC = () => {
  return <div className="p-4 bg-stone-100 rounded-xl text-center text-xs text-stone-600">Courbe de cinétique d'extraction active</div>;
};
export default ExtractionKineticsChart;
`);

writeFile('src/components/FreemiumPaywallGate.tsx', `
import React from 'react';
export const FreemiumPaywallGate: React.FC<{ onUnlock?: () => void }> = ({ children }: any) => {
  return <div>{children}</div>;
};
export default FreemiumPaywallGate;
`);

writeFile('src/components/OptimizedImage.tsx', `
import React from 'react';
export const OptimizedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};
export default OptimizedImage;
`);

writeFile('src/components/PaymentBadges.tsx', `
import React from 'react';
export const PaymentBadges: React.FC = () => {
  return <div className="flex gap-2 text-xs text-stone-400">Paiement sécurisé SSL • CB • Visa • Mastercard</div>;
};
export default PaymentBadges;
`);

writeFile('src/components/StoreSequencingSection.tsx', `
import React from 'react';
export const StoreSequencingSection: React.FC = () => {
  return null;
};
export default StoreSequencingSection;
`);

writeFile('src/components/TooltipLexique.tsx', `
import React from 'react';
export const TooltipLexique: React.FC<{ term: string; children: React.ReactNode }> = ({ children }) => {
  return <span>{children}</span>;
};
export default TooltipLexique;
`);

// 3. Content Views
const dummyViews = [
  'HomeContent',
  'HerbariumContent',
  'CartContent',
  'CheckoutFlow',
  'ProductDetail',
  'CulinarySection',
  'CosmeticsContent',
  'LibraryLanding',
  'ActivationPage',
  'LegalPages',
  'ChatContent',
  'AccountContent',
  'ManifesteContent',
  'MachineLanding',
  'PhytotherapyResetPage',
  'PillarExtraction',
  'PillarInfusion',
  'PillarOil',
  'PillarAdaptogens',
  'PendingContent',
  'BlogContent',
  'FaqContent',
  'ContactContent',
  'PremiumInfoContent',
  'TerrainPillar',
  'ProtocolePsoriasisContent',
  'ProtocoleSiboContent',
  'ProtocoleMyelineContent',
  'BloomAcademiePage',
  'Les4ArchitecturesContent',
  'NeufAxesHistoriquesContent',
  'ChargeAllostatiqueContent',
  'MetabolismeInsulineContent',
  'ProtocolesSystemiquesContent',
  'PillarPagesContent'
];

dummyViews.forEach((name) => {
  writeFile(`src/${name}.tsx`, `
import React from 'react';
export const ${name}: React.FC<any> = ({ onNavigate, t, lang }: any) => {
  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1B3022] mb-4">${name}</h1>
      <p className="text-stone-600 text-sm leading-relaxed">Bloom by BotaniK — Herboristerie moderne et extractions botaniques.</p>
    </div>
  );
};
export default ${name};
`);
});

writeFile('src/academie/AxeA1EmonctoiresContent.tsx', `
import React from 'react';
export const AxeA1EmonctoiresContent: React.FC<any> = () => {
  return <div className="p-8"><h1>Axe A1 Émonctoires</h1></div>;
};
export default AxeA1EmonctoiresContent;
`);

writeFile('src/SEOArticlesContent.tsx', `
import React from 'react';
export const InfusionPrecision: React.FC<any> = () => <div>Infusion Précision</div>;
export const TotumDefinition: React.FC<any> = () => <div>Totum Définition</div>;
export const SolvantsExtraction: React.FC<any> = () => <div>Solvants Extraction</div>;
`);
console.log('Finished generating stubs!');
