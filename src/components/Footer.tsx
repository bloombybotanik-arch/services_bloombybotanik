import React from 'react';
import { Youtube, Instagram, Facebook, Pin as Pinterest, Music2 as TikTok } from 'lucide-react';
import { Language, translations } from '../translations';
import { VIEW_PATHS } from '../types';

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

  const FooterLink = ({ onClick, label, id }: { onClick: () => void, label: string, id?: string }) => (
    <li>
      <a 
        href={id ? VIEW_PATHS[id as keyof typeof VIEW_PATHS] || '#' : '#'}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="text-sm text-white/60 hover:text-botanik-orange transition-colors text-left"
      >
        {label}
      </a>
    </li>
  );

  return (
    <footer className="bg-[#0F261E] text-[#F9F9F7] border-t border-white/5 selection:bg-botanik-orange/30">
      {/* Upper Footer: Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Column 1: Brand & Mantra */}
          <div className="lg:col-span-5 space-y-10">
            <div
              className="flex items-center gap-4 cursor-pointer group/f-logo w-fit"
              onClick={() => onNavigate('home')}
            >
              <img 
                src="/assets/images/logo_sidebar_1784886108085.png" 
                alt="Bloom by BotaniK" 
                className="h-12 w-auto"
              />
              <div className="ml-3 font-semibold tracking-wide flex flex-col leading-tight text-[#F9F9F7]">
                <span className="text-lg">Bloom</span>
                <span className="text-sm">by BotaniK</span>
              </div>
            </div>

              <h2 className="text-base md:text-lg font-extrabold leading-snug text-white/90">
                {lang === 'fr' ? "L'Ingénierie au service du vivant." : lang === 'de' ? "Ingenieurwesen für das Leben." : "Engineering for life."}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                {lang === 'fr' 
                  ? "Bloom by BotaniK réconcilie l'herboristerie ancestrale et l'ingénierie moléculaire de pointe pour libérer le plein potentiel végétal."
                  : lang === 'de'
                  ? "Bloom by BotaniK vereint traditionelle Kräuterkunde mit modernster Molekulartechnik, um das volle pflanzliche Potenzial freizusetzen."
                  : "Bloom by BotaniK reconciles ancestral herbalism with cutting-edge molecular engineering to release full botanical potential."
                }
              </p>

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
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            <FooterGroup title={t.nav.decouvrir}>
              <FooterLink id="machine" label={t.nav.decouvrir_sub.how_it_works} onClick={() => onNavigate('machine')} />
              <FooterLink id="herbier" label={t.nav.decouvrir_sub.herbier} onClick={() => onNavigate('herbier')} />
              <FooterLink id="recettes" label={t.nav.decouvrir_sub.recettes} onClick={() => onNavigate('recettes')} />
            </FooterGroup>

            <FooterGroup title={t.nav.apprendre}>
              <FooterLink id="phytotherapie-reset" label={t.nav.apprendre_sub.preparations} onClick={() => onNavigate('phytotherapie-reset')} />
              <FooterLink id="cosmetiques" label={t.nav.apprendre_sub.cosmetiques} onClick={() => onNavigate('cosmetiques')} />
              <FooterLink id="library-landing" label={t.nav.apprendre_sub.bibliotheque} onClick={() => onNavigate('library-landing')} />
              <FooterLink id="faq" label={t.nav.transmission_sub?.faq || "Questions Fréquentes"} onClick={() => onNavigate('faq')} />
            </FooterGroup>

            <FooterGroup title={t.nav.boutique_nav}>
              <FooterLink id="boutique" label={lang === 'fr' ? "Toute la Boutique" : "All Products"} onClick={() => onNavigate('boutique')} />
              <FooterLink id="machine" label={t.nav.boutique_sub.bloomlab} onClick={() => onNavigate('machine')} />
              <FooterLink id="boutique-kits" label={t.nav.boutique_sub.kits} onClick={() => onNavigate('boutique', 'kits')} />
              <FooterLink id="premium-info" label={t.nav.boutique_sub.abonnement} onClick={() => onNavigate('premium-info')} />
            </FooterGroup>

            <FooterGroup title={t.nav.marque}>
              <FooterLink id="manifeste" label={t.nav.marque_sub.manifeste} onClick={() => onNavigate('manifeste')} />
              <FooterLink id="contact" label={t.nav.marque_sub.contact} onClick={() => onNavigate('contact')} />
              <FooterLink id="account" label={t.nav.compte_sub.espace} onClick={() => onNavigate('account')} />
              <FooterLink id="legal" label={lang === 'fr' ? "Mentions Légales" : "Legal"} onClick={() => onNavigate('legal', undefined, 'mentions')} />
            </FooterGroup>
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright & Disclaimers */}
      <div className="border-t border-white/5 bg-black/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.15em] text-white/20">
            <span>© 2026 Bloom by BotaniK</span>
            <span className="hidden md:inline">•</span>
            <span>{lang === 'fr' ? "La précision du geste botanique, à domicile" : lang === 'de' ? "Die Präzision der botanischen Geste, zu Hause" : "Precision botanical extraction at home"}</span>
          </div>
          
          <div className="text-[10px] text-white/40 text-center md:text-right leading-relaxed max-w-md">
            {lang === 'fr' 
              ? "BloomLab est un outil de préparation botanique domestique. Il ne remplace pas un avis médical, un diagnostic ou un traitement. Les informations fournies sont pédagogiques."
              : lang === 'de'
              ? "BloomLab ist ein häusliches botanisches Zubereitungswerkzeug. Es ersetzt keine medizinische Beratung, Diagnose oder Behandlung. Die bereitgestellten Informationen dienen Bildungszwecken."
              : "BloomLab is a domestic botanical preparation tool. It does not replace medical advice, diagnosis, or treatment. The information provided is educational."
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
