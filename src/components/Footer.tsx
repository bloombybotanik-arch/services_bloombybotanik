import React from 'react';
import { Youtube, Instagram, Facebook, Pin as Pinterest, Music2 as TikTok } from 'lucide-react';
import logoSidebar from '../assets/images/logo_sidebar_1784886108085.png';
import { Language, translations } from '../translations';

const Footer = ({ onNavigate, lang = 'fr' }: { onNavigate: (view: any, productId?: string, type?: any) => void, lang?: Language }) => {
  const t = translations[lang];
  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@BloomByBotanik', label: 'YouTube' },
    {
      customIcon: <img src="https://cdn.simpleicons.org/pinterest/white" className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:filter group-hover:sepia group-hover:hue-rotate-[15deg] group-hover:saturate-[500%] transition-all" alt="Pinterest" />,
      href: 'https://fr.pinterest.com/bloombybotanik',
      label: 'Pinterest'
    },
    { icon: Instagram, href: 'https://www.instagram.com/bloombybotanik/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61577892110122', label: 'Facebook' },
    {
      customIcon: <img src="https://cdn.simpleicons.org/tiktok/white" className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:filter group-hover:sepia group-hover:hue-rotate-[15deg] group-hover:saturate-[500%] transition-all" alt="TikTok" />,
      href: 'https://www.tiktok.com/@bloombybotanik',
      label: 'TikTok'
    },
  ];

  return (
    <footer className="bg-[#293228] text-white py-16 px-6 md:px-12 mt-24 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div
              className="flex items-center gap-3 md:gap-4 mb-6 cursor-pointer group/footer-logo w-fit notranslate"
              onClick={() => onNavigate('home')}
              translate="no"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={logoSidebar} alt="Logo Bloom by BotaniK" loading="lazy" className="w-full h-full object-contain scale-125 group-hover/footer-logo:brightness-0 group-hover/footer-logo:invert-[51%] group-hover/footer-logo:sepia-[95%] group-hover/footer-logo:saturate-[2180%] group-hover/footer-logo:hue-rotate-[1deg] group-hover/footer-logo:brightness-[101%] group-hover/footer-logo:contrast-[101%] transition-all" />
              </div>
              <div className="flex flex-col leading-tight uppercase text-white group-hover/footer-logo:text-[#F97316] transition-colors">
                <span className="text-[10px] md:text-[12px] font-bold tracking-[0.22em] opacity-80">Bloom by</span>
                <span className="text-xl md:text-2xl font-black tracking-widest">botaniK</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-8">
              {t.footer.description}
            </p>
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4 text-[#F5F3EB]">Contact</h4>
              <a href="mailto:bloombybotanik@gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
                bloombybotanik@gmail.com
              </a>
            </div>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-botanik-orange transition-colors group"
                  aria-label={social.label}
                >
                  {social.customIcon ? social.customIcon : <social.icon className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#F5F3EB]">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><button onClick={() => onNavigate('phytotherapie-reset')} className="hover:text-white transition-colors">{t.nav.guide}</button></li>
              <li><button onClick={() => onNavigate('machine')} className="hover:text-white transition-colors">{lang === 'fr' ? 'La Machine & Niveaux' : lang === 'en' ? 'The Machine & Levels' : 'Die Maschine & Level'}</button></li>
              <li><button onClick={() => onNavigate('boutique')} className="hover:text-white transition-colors">{t.nav.shop}</button></li>
              <li><button onClick={() => onNavigate('culinaire')} className="hover:text-white transition-colors">{t.nav.culinary}</button></li>
              <li><button onClick={() => onNavigate('cosmetiques')} className="hover:text-white transition-colors">{t.nav.cosmetics}</button></li>
              <li><button onClick={() => onNavigate('library-landing')} className="hover:text-white transition-colors">{t.nav.herbarium}</button></li>
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
              <li><button onClick={() => onNavigate('legal', undefined, 'cgv')} className="hover:text-white transition-colors">Droit de Rétractation</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            copyright @ 2024 Bloom by botaniK
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/30 text-center md:text-right">
            Dispositif d'extraction végétale à usage personnel.
            Ceci n'est pas un dispositif médical.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
