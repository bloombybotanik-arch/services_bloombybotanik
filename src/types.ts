
export type View = 'home' | 'machine' | 'bloomlab' | 'phytotherapie-reset' | 'votre-pratique' | 'parcours' | 'boutique' | 'product-detail' | 'culinaire' | 'cosmetiques' | 'cosmetique-botanique' | 'gastronomie-botanique' | 'library-landing' | 'manifeste' | 'activation' | 'activate-bloomlab' | 'account' | 'legal' | 'chat' | 'cart' | 'checkout' | 'guide' | 'how_it_works' | 'pending' | 'library' | 'herbier' | 'pillar-extraction' | 'guide-complet' | 'qu-est-ce-que-infusion' | 'admin' | 'blog' | 'withdrawal' | 'indexbis' | 'newsletter-preferences' | 'admin-newsletter' | 'terrain' | 'hormese' | 'infuseur-botanique' | 'cgv' | 'cgu' | 'privacy' | 'mentions' | 'returns' | 'recettes' | 'guides' | 'ateliers' | 'herbarium' | 'questions-frequentes' | 'faq' | 'infusion-precision' | 'totum-definition' | 'solvants-extraction' | 'premium-info' | 'decouvrir' | 'comment-ca-marche' | 'recettes-gratuites' | 'apprendre' | 'preparations-avancees' | 'recettes-cosmetiques' | 'bibliotheque' | 'boutique-kits' | 'abonnement' | 'abonnements-numeriques' | 'la-marque' | 'contact' | 'extraction-botanique' | 'infusion-botanique' | 'infusion-botanique-maison-comment-ca-marche' | 'huile-infusee' | 'plantes-adaptogenes' | 'totum-vegetal' | 'maceration-plantes' | 'teinture-mere' | 'kits-botaniques' | 'articles' | 'lexique' | 'protocole-psoriasis' | 'protocole-sibo' | 'protocole-myeline' | 'protocole-decalcification-pineale' | 'blog-vieillissement-myeline' | 'academie' | '4-architectures' | '7-terrains' | 'comment-lire-modele-bloom' | '9-axes' | 'neuf-axes-historiques' | 'charge-allostatique' | 'reset-homeostasique' | 'metabolisme-insuline' | 'protocoles' | 'module-0' | 'axe-a1' | 'axe-a2' | 'axe-a3' | 'axe-a4' | 'axe-a5' | 'axe-a6' | 'axe-a7' | 'axe-a8' | 'axe-a9';

export const VIEW_PATHS: Record<string, string> = {
  home: '/', 
  indexbis: '/',
  academie: '/academie/',
  bloomlab: '/bloomlab/',
  machine: '/bloomlab/', 
  'phytotherapie-reset': '/academie/reset-homeostasique/',
  'reset-homeostasique': '/academie/reset-homeostasique/',
  'protocoles': '/protocoles/',
  'module-0': '/academie/choc-de-paradigme/',
  'axe-a1': '/academie/axes/a1/',
  'axe-a2': '/academie/axes/a2/',
  'axe-a3': '/academie/axes/a3/',
  'axe-a4': '/academie/axes/a4/',
  'axe-a5': '/academie/axes/a5/',
  'axe-a6': '/academie/axes/a6/',
  'axe-a7': '/academie/axes/a7/',
  'axe-a8': '/academie/axes/a8/',
  'axe-a9': '/academie/axes/a9/',
  'votre-pratique': '/academie/protocoles/',
  'parcours': '/academie/protocoles/',
  boutique: '/boutique/', 
  'product-detail': '/boutique/bloomlab/',
  'boutique-kits': '/boutique/kits/',
  'kits-botaniques': '/kits-botaniques/',
  'abonnement': '/abonnement/',
  'premium-info': '/abonnement/',
  'abonnements-numeriques': '/boutique/abonnements-numeriques/',
  culinaire: '/gastronomie-botanique/', 
  cosmetiques: '/cosmetique-botanique/',
  'cosmetique-botanique': '/cosmetique-botanique/',
  'gastronomie-botanique': '/gastronomie-botanique/',
  'library-landing': '/bibliotheque/', 
  manifeste: '/manifeste/',
  'la-marque': '/la-marque/',
  contact: '/contact/',
  faq: '/questions-frequentes/',
  activation: '/activation/', 
  'activate-bloomlab': '/activation/',
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
  'infusion-botanique': '/infusion-botanique-maison-comment-ca-marche/',
  'infusion-botanique-maison-comment-ca-marche': '/infusion-botanique-maison-comment-ca-marche/',
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
  'hormese': '/hormese/',
  cgv: '/conditions-generales-de-vente/',
  cgu: '/termes-et-conditions/',
  privacy: '/politique-de-confidentialite/',
  mentions: '/mentions-legales/',
  returns: '/retour-et-remboursement/',
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
  'lexique': '/lexique/',
  'protocole-psoriasis': '/academie/protocoles/psoriasis/',
  'protocole-sibo': '/academie/protocoles/sibo/',
  'protocole-myeline': '/academie/protocoles/clarte-mentale/',
  'protocole-decalcification-pineale': '/academie/protocoles/decalcification-pineale/',
  'blog-vieillissement-myeline': '/blog/vieillissement-myeline-fgf17-clarte-mentale/',
  '4-architectures': '/academie/comprendre-le-corps/4-architectures/',
  '7-terrains': '/academie/comprendre-le-corps/7-terrains/',
  'comment-lire-modele-bloom': '/academie/comprendre-le-corps/comment-lire-le-modele-bloom/',
  '9-axes': '/academie/comprendre-le-corps/9-axes-historiques/',
  'neuf-axes-historiques': '/academie/comprendre-le-corps/9-axes-historiques/',
  'charge-allostatique': '/academie/comprendre-le-corps/charge-allostatique/',
  'metabolisme-insuline': '/academie/comprendre-le-corps/metabolisme-glucidique-insuline/'
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
