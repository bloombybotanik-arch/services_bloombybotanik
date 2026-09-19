import React from 'react';
import { Youtube, Instagram, Facebook } from 'lucide-react';
import { Language, translations } from '../translations';
import { VIEW_PATHS } from '../types';
import BloomLogo from './ui/BloomLogo';

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

const Footer = ({ onNavigate, lang = 'fr' }: { onNavigate: (view: any, productId?: string, type?: any) => void, lang?: Language }) => {
  const t = translations[lang];
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
  const NavLink = ({ view, param, children }: { view: string; param?: string; children: React.ReactNode }) => (
    <a
      href={(VIEW_PATHS as Record<string, string>)[view] ?? '#'}
      onClick={(e) => { e.preventDefault(); onNavigate(view, param); }}
      className="hover:text-white transition-colors"
    >
      {children}
    </a>
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      setSubState(res.ok ? 'ok' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setSubState('error');
    }
  };

  return (
    <footer className="bg-[#0F261E] text-white py-16 px-6 md:px-12 mt-24 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div
              className="flex items-center gap-3 md:gap-4 mb-6 cursor-pointer group/footer-logo w-fit notranslate"
              onClick={() => onNavigate('home')}
              translate="no"
            >
              <BloomLogo variant="footer" className="w-14 h-14 md:w-20 md:h-20 flex-shrink-0" />
              <div className="flex flex-col leading-tight uppercase text-white group-hover/footer-logo:text-[#D97706] transition-colors">
                <span className="text-[10px] md:text-[12px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
                <span className="text-xl md:text-2xl font-black tracking-widest">BotaniK</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              {t.footer.description}
            </p>

            {/* Capture email — branchée sur l'API existante */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mb-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'fr' ? 'Votre email — protocole du dimanche' : 'Your email — Sunday protocol'}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D97706]"
              />
              <button type="submit" className="px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white text-sm font-bold transition-colors cursor-pointer">
                {lang === 'fr' ? "S'inscrire" : 'Subscribe'}
              </button>
            </form>
            {subState === 'ok' && <p className="text-emerald-300 text-xs mb-4">✓ Merci ! Confirme via l'email reçu (double opt-in).</p>}
            {subState === 'error' && <p className="text-rose-300 text-xs mb-4">Une erreur est survenue. Réessayez.</p>}

            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-white/40 hover:text-[#D97706] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation (liens crawlables) */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#F5F3EB]">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><NavLink view="machine">La machine & niveaux</NavLink></li>
              <li><NavLink view="boutique">{t.nav.shop}</NavLink></li>
              <li><NavLink view="herbier">{t.nav.herbarium}</NavLink></li>
              <li><NavLink view="culinaire">{t.nav.culinary}</NavLink></li>
              <li><NavLink view="cosmetiques">Cosmétique</NavLink></li>
              <li><NavLink view="phytotherapie-reset">{t.nav.guide}</NavLink></li>
              <li><NavLink view="manifeste">Le Manifeste</NavLink></li>
              <li><NavLink view="lexique">Lexique & preuves</NavLink></li>
              <li><a href="https://blog.bloombybotanik.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.nav.blog}</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#F5F3EB]">Informations Légales</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><button onClick={() => onNavigate('legal', undefined, 'mentions')} className="hover:text-white transition-colors">{t.footer.legal}</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'cgv')} className="hover:text-white transition-colors">{t.footer.cgv}</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'cgu')} className="hover:text-white transition-colors">CGU</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'privacy')} className="hover:text-white transition-colors">{t.footer.privacy}</button></li>
              <li><button onClick={() => onNavigate('legal', undefined, 'withdrawal')} className="hover:text-white transition-colors">Droit de Rétractation</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            © {new Date().getFullYear()} Bloom by BotaniK — Tous droits réservés
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/30 text-center md:text-right">
            Dispositif d'extraction végétale à usage personnel. Ceci n'est pas un dispositif médical.
            Contenus éducatifs — ne remplace pas un avis médical.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;