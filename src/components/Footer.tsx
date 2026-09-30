import React from 'react';
import { Youtube, Instagram, Facebook, GraduationCap, Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';
import { VIEW_PATHS, View } from '../types';
import { BloomLogo } from './ui/BloomLogo';

/* Icônes marque auto-hébergées (paths Simple Icons) — zéro CDN externe */
const PinterestIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.623.024 12.017.024z" />
  </svg>
);
const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface FooterProps {
  onNavigate: (view: View, productId?: string, type?: any) => void;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang = 'fr' }) => {
  const t = translations[lang] || translations.fr;
  const [email, setEmail] = React.useState('');
  const [subState, setSubState] = React.useState<'idle' | 'ok' | 'error'>('idle');

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@BloomByBotanik', label: 'YouTube' },
    { icon: PinterestIcon, href: 'https://fr.pinterest.com/bloombybotanik', label: 'Pinterest' },
    { icon: Instagram, href: 'https://www.instagram.com/bloombybotanik/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61577892110122', label: 'Facebook' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@bloombybotanik', label: 'TikTok' },
  ];

  /* Lien interne crawlable (SEO) + navigation SPA */
  const NavLink = ({ view, param, children }: { view: View; param?: string; children: React.ReactNode }) => (
    <a
      href={(VIEW_PATHS as Record<string, string>)[view] ?? '#'}
      onClick={(e) => { 
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault(); 
          onNavigate(view, param); 
        }
      }}
      className="hover:text-white hover:underline transition-colors"
    >
      {children}
    </a>
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_new_structure' }),
      });
      setSubState(res.ok ? 'ok' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setSubState('error');
    }
  };

  return (
    <footer className="bg-[#0F261E] text-white py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Brand & Mission + Newsletter Inscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 pb-12 border-b border-white/10">
          <div className="lg:col-span-6">
            <a
              href="/"
              className="flex items-center gap-3.5 mb-4 cursor-pointer group/footer-logo w-fit notranslate text-white hover:text-[#D97706] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('indexbis');
              }}
              translate="no"
              id="footer-brand-logo-link"
              aria-label="Bloom by BotaniK - Accueil"
            >
              <BloomLogo variant="footer" className="w-12 h-12 flex-shrink-0" />
              <div className="flex flex-col leading-tight uppercase text-white group-hover/footer-logo:text-[#D97706] transition-colors">
                <span className="text-[10px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
                <span className="text-xl font-black tracking-widest">BotaniK</span>
              </div>
            </a>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md mb-6">
              L'alliance des sagesses ancestrales et de la phytothérapie de haute précision. Votre corps n'est pas cassé, il est verrouillé.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-white/50 hover:text-[#D97706] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formulaire Newsletter Pôle dédié */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-white/5 rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-2 text-[#D97706] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>LE PROTOCOLE DU DIMANCHE &amp; BILLET DE L'ACADÉMIE</span>
            </div>
            <p className="text-xs text-white/80 mb-4">
              Recevez nos synthèses exclusives de phytochimie clinique, protocoles saisonniers et monographies du Totum végétal.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D97706]"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
              >
                S'inscrire
              </button>
            </form>
            {subState === 'ok' && <p className="text-emerald-300 text-xs mt-2.5">✓ Merci ! Un lien de confirmation vous a été envoyé.</p>}
            {subState === 'error' && <p className="text-rose-300 text-xs mt-2.5">Une erreur est survenue. Veuillez réessayer.</p>}
          </div>
        </div>

        {/* NOUVELLE STRUCTURE FOOTER EN 4 COLONNES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 mb-10 border-b border-white/10 text-xs text-white/70">
          
          {/* COLONNE 1: BLOOM BY BOTANIK */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#D97706]">
              BLOOM BY BOTANIK
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="la-marque">Histoire &amp; Philosophie</NavLink></li>
              <li><NavLink view="contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* COLONNE 2: BLOOM ACADÉMIE */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#c9a84c] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#c9a84c]" />
              <span>BLOOM ACADÉMIE</span>
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="academie">Hub Bloom Académie</NavLink></li>
              <li><NavLink view="protocoles">Protocoles Systémiques</NavLink></li>
              <li><NavLink view="phytotherapie-reset">Reset Homéostasique</NavLink></li>
              <li><NavLink view="4-architectures">Comprendre le Corps</NavLink></li>
              <li><NavLink view="pillar-extraction">Extraction &amp; Totum</NavLink></li>
              <li><NavLink view="library-landing">Bibliothèque Scientifique</NavLink></li>
            </ul>
          </div>

          {/* COLONNE 3: BOUTIQUE */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-[#D97706]">
              BOUTIQUE
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="product-detail" param="bloomlab">BloomLab®</NavLink></li>
              <li><NavLink view="boutique-kits">Packs</NavLink></li>
              <li><NavLink view="boutique">Accessoires</NavLink></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'cgv')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">CGV</button></li>
            </ul>
          </div>

          {/* COLONNE 4: RESSOURCES */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black mb-4 text-white/90">
              RESSOURCES
            </h4>
            <ul className="space-y-2.5">
              <li><NavLink view="faq">FAQ</NavLink></li>
              <li><NavLink view="returns">Livraison &amp; Retours</NavLink></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'mentions')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">Mentions Légales</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'privacy')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">Politique de Confidentialité</button></li>
            </ul>
          </div>

        </div>

        {/* Mentions légales de bas de page */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Bloom by BotaniK — Tous droits réservés
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 text-center md:text-right max-w-xl">
            Dispositif d'extraction botanique à usage personnel. Ceci n'est pas un dispositif médical.
            Contenus éducatifs et d'accompagnement de terrain — ne remplace pas une consultation médicale.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
