
export type View = 'home' | 'machine' | 'phytotherapie-reset' | 'votre-pratique' | 'parcours' | 'boutique' | 'product-detail' | 'culinaire' | 'cosmetiques' | 'library-landing' | 'manifeste' | 'activation' | 'account' | 'legal' | 'chat' | 'cart' | 'checkout' | 'guide' | 'how_it_works' | 'pending' | 'library' | 'herbier' | 'pillar-extraction' | 'guide-complet' | 'qu-est-ce-que-infusion' | 'admin' | 'blog' | 'withdrawal' | 'indexbis' | 'newsletter-preferences' | 'admin-newsletter' | 'terrain' | 'infuseur-botanique' | 'cgv' | 'cgu' | 'privacy' | 'mentions' | 'returns' | 'recettes' | 'guides' | 'ateliers' | 'herbarium' | 'questions-frequentes' | 'faq' | 'infusion-precision' | 'totum-definition' | 'solvants-extraction' | 'premium-info' | 'decouvrir' | 'comment-ca-marche' | 'recettes-gratuites' | 'apprendre' | 'preparations-avancees' | 'recettes-cosmetiques' | 'bibliotheque' | 'boutique-kits' | 'abonnement' | 'la-marque' | 'contact' | 'extraction-botanique' | 'infusion-botanique' | 'huile-infusee' | 'plantes-adaptogenes' | 'totum-vegetal' | 'maceration-plantes' | 'teinture-mere' | 'kits-botaniques' | 'articles';

export const VIEW_PATHS: Record<string, string> = {
  home: '/', 
  machine: '/produit/bloomlab/', 
  'phytotherapie-reset': '/phytotherapie-reset/',
  'votre-pratique': '/phytotherapie-reset/',
  'parcours': '/phytotherapie-reset/',
  boutique: '/boutique/', 
  'boutique-kits': '/boutique/kits/',
  'kits-botaniques': '/kits-botaniques/',
  'abonnement': '/abonnement/',
  culinaire: '/gastronomie-botanique/', 
  cosmetiques: '/cosmetique-botanique/',
  'library-landing': '/herbier/', 
  manifeste: '/manifeste/',
  'la-marque': '/la-marque/',
  contact: '/contact/',
  faq: '/questions-frequentes/',
  activation: '/activation/', 
  account: '/compte/', 
  legal: '/legal/', 
  chat: '/chat/',
  cart: '/panier/', 
  checkout: '/checkout/', 
  guide: '/infusion-botanique/',
  how_it_works: '/comment-ca-marche/', 
  'comment-ca-marche': '/comment-ca-marche/',
  'decouvrir': '/decouvrir/',
  'recettes-gratuites': '/recettes-gratuites/',
  'apprendre': '/apprendre/',
  'preparations-avancees': '/preparations-avancees/',
  'recettes-cosmetiques': '/recettes-cosmetiques/',
  'bibliotheque': '/bibliotheque/',
  pending: '/en-attente/',
  library: '/herbier/', 
  herbier: '/herbier/', 
  'pillar-extraction': '/extraction-botanique/',
  'extraction-botanique': '/extraction-botanique/',
  'infusion-botanique': '/infusion-botanique/',
  'huile-infusee': '/huile-infusee/',
  'maceration-plantes': '/maceration-plantes/',
  'teinture-mere': '/teinture-mere/',
  'totum-vegetal': '/totum-vegetal/',
  'plantes-adaptogenes': '/plantes-adaptogenes/',
  'guide-complet': '/extraction-botanique/',
  'articles': '/articles/',
  'qu-est-ce-que-infusion': '/qu-est-ce-que-l-infusion-botanique/',
  admin: '/admin/', 
  blog: '/blog/', 
  withdrawal: '/droit-de-retractation/', 
  'infuseur-botanique': '/infuseur-botanique/',
  'terrain': '/terrain/',
  cgv: '/conditions-generales-de-vente/',
  cgu: '/termes-et-conditions/',
  privacy: '/politique-de-confidentialite/',
  mentions: '/mentions-legales/',
  returns: '/retour-et-remboursement/',
  indexbis: '/indexbis/',
  'newsletter-preferences': '/newsletter/preferences/',
  'admin-newsletter': '/admin/newsletter/',
  'recettes': '/recettes/',
  'guides': '/guides/',
  'ateliers': '/ateliers/',
  'herbarium': '/herbier/',
  'questions-frequentes': '/questions-frequentes/',
  'infusion-precision': '/infusion-precision/',
  'totum-definition': '/totum-definition/',
  'solvants-extraction': '/solvants-extraction/',
  'premium-info': '/premium-info/'
};

export type SchoolCalendarZone = 'A' | 'B' | 'C' | 'non_precise' | 'hors_france';

export interface SubscriberPreferences {
  family_rhythm: boolean;
  school_calendar_zone: SchoolCalendarZone;
  content_context: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  first_name: string;
  marketing_consent: boolean;
  email_status: 'active' | 'unsubscribed';
  preferences: SubscriberPreferences;
  created_at: any;
  updated_at: any;
}

export interface NewsletterCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent' | 'archived' | 'approved';
  theme?: string;
  created_at?: any;
  sent_at?: any;
  recipient_count?: number;
}

export interface NewsletterGenerationSession {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
}
