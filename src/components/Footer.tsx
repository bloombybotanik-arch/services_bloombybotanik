import React from 'react';
import { Youtube, Instagram, Facebook, Pin as Pinterest, Music2 as TikTok } from 'lucide-react';
import logoSidebar from '../assets/images/logo_sidebar_1784886108085.png';
import { Language, translations } from '../translations';

const Footer = ({ onNavigate, lang = 'fr' }: { onNavigate: (view: any, productId?: string, type?: any) => void, lang?: Language }) => {
  const t = translations[lang];
  
  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@BloomByBotanik', label: 'YouTube' },
    {
      customIcon: <img src="https://cdn.simpleicons.org/pinterest/white" className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-all" alt="Pinterest" />,
      href: 'https://fr.pinterest.com/bloombybotanik',
      label: 'Pinterest'
    },
    { icon: Instagram, href: 'https://www.instagram.com/bloombybotanik/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61577892110122', label: 'Facebook' },
    {
      customIcon: <img src="https://cdn.simpleicons.org/tiktok/white" className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-all" alt="TikTok" />,
      href: 'https://www.tiktok.com/@bloombybotanik',
      label: 'TikTok'
    },
  ];

  const FooterGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{title}</h4>
      <ul className="flex flex-col gap-3">
        {children}
      </ul>
    </div>
  );

  const FooterLink = ({ onClick, label }: { onClick: () => void, label: string }) => (
    <li>
      <button 
        onClick={onClick}
        className="text-sm text-white/60 hover:text-botanik-orange transition-colors text-left"
      >
        {label}
      </button>
    </li>
  );

  return (
    <footer className="bg-botanik-green text-white border-t border-white/5 selection:bg-botanik-orange/30">
      {/* Upper Footer: Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Column 1: Brand & Mantra */}
          <div className="lg:col-span-5 space-y-10">
            <div
              className="flex items-center gap-4 cursor-pointer group/f-logo w-fit"
              onClick={() => onNavigate('home')}
            >
              <img src={logoSidebar} alt="Bloom" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
              <div className="flex flex-col leading-tight uppercase">
                <span className="text-[9px] font-bold tracking-[0.2em] opacity-50">Bloom by</span>
                <span className="text-xl font-black tracking-widest">botaniK</span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold leading-snug text-white/90">
                {lang === 'fr' ? "L'Ingénierie au service du vivant." : "Engineering for life."}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                Bloom by BotaniK réconcilie l'herboristerie ancestrale et l'ingénierie moléculaire de pointe pour libérer le plein potentiel de votre pharmacie intérieure.
              </p>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.customIcon ? social.customIcon : <social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Groups */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            <FooterGroup title="Boutique">
              <FooterLink label="Tous les produits" onClick={() => onNavigate('boutique')} />
              <FooterLink label="BloomLab®" onClick={() => onNavigate('indexbis')} />
              <FooterLink label="Atelier Culinaire" onClick={() => onNavigate('culinaire')} />
              <FooterLink label="Soin Cosmétique" onClick={() => onNavigate('cosmetiques')} />
              <FooterLink label="Reset Homéostatique" onClick={() => onNavigate('phytotherapie-reset')} />
            </FooterGroup>

            <FooterGroup title="Savoir">
              <FooterLink label="La Bibliothèque" onClick={() => onNavigate('blog')} />
              <FooterLink label="Le Manifeste" onClick={() => onNavigate('manifesto')} />
              <FooterLink label="Science du Totum" onClick={() => onNavigate('indexbis')} />
              <FooterLink label="FAQ" onClick={() => onNavigate('indexbis')} />
            </FooterGroup>

            <FooterGroup title="Légal">
              <FooterLink label="Mentions Légales" onClick={() => onNavigate('legal', undefined, 'mentions')} />
              <FooterLink label="CGV / CGU" onClick={() => onNavigate('legal', undefined, 'cgv')} />
              <FooterLink label="Confidentialité" onClick={() => onNavigate('legal', undefined, 'privacy')} />
              <FooterLink 
                label={lang === 'fr' ? "Gestion des cookies" : lang === 'en' ? "Manage cookies" : "Cookie-Einstellungen"} 
                onClick={() => window.dispatchEvent(new CustomEvent('bloom-open-cookies'))} 
              />
              <FooterLink label="Contact" onClick={() => window.location.href = 'mailto:bloombybotanik@gmail.com'} />
            </FooterGroup>
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright & Disclaimers */}
      <div className="border-t border-white/5 bg-black/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.15em] text-white/20">
            <span>© 2024 Bloom by BotaniK</span>
            <span className="hidden md:inline">•</span>
            <span>N°1 de l'extraction botanique de précision</span>
          </div>
          
          <div className="text-[10px] text-white/30 text-center md:text-right leading-relaxed max-w-sm">
            Dispositif d'extraction végétale à usage personnel. Ceci n'est pas un dispositif médical. Consultez toujours un professionnel de santé.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
