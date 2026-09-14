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
        className="text-sm text-white/60 hover:text-botanik-orange transition-colors text-left py-1 inline-flex items-center min-h-[36px] sm:min-h-0"
      >
        {label}
      </a>
    </li>
  );

  return (
    <footer className="bg-[#0F261E] text-[#F9F9F7] border-t border-white/5 selection:bg-botanik-orange/30 w-full">
      {/* Upper Footer: Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-24">
          
          {/* Column 1: Brand & Mantra */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <div
              className="flex items-center gap-4 cursor-pointer group/f-logo w-fit"
              onClick={() => onNavigate('home')}
            >
              <img 
                src="/assets/images/logo_sidebar_1784886108085.png" 
                alt="Bloom by BotaniK" 
                className="h-10 sm:h-12 w-auto"
              />
              <div className="ml-2 sm:ml-3 font-semibold tracking-wide flex flex-col leading-tight text-[#F9F9F7]">
                <span className="text-base sm:text-lg">Bloom</span>
                <span className="text-xs sm:text-sm">by BotaniK</span>
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

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors p-2 rounded-lg -m-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label={social.label}
                >
                  {social.customIcon ? social.customIcon : <social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Groups */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
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

      {/* Lower Footer: Regulatory Warning & Copyright */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-24 py-8 sm:py-10 space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-xs text-white/70 leading-relaxed text-center sm:text-left">
            <strong className="text-white font-bold block mb-1.5 uppercase tracking-wider text-[11px] text-[#D97706]">
              Avertissement réglementaire & Vocation éducative
            </strong>
            {lang === 'fr' ? (
              <p>
                Les informations, préparations et protocoles présentés sur ce site ont une vocation exclusivement éducative et d'autonomie personnelle. Ils ne constituent en aucun cas un avis médical, ne posent aucun diagnostic et ne remplacent en rien la consultation d'un professionnel de santé qualifié. En cas de pathologie avérée, de traitement en cours, de grossesse ou d'allaitement, demandez conseil à votre médecin avant toute utilisation de plantes médicinales.
              </p>
            ) : lang === 'de' ? (
              <p>
                Die auf dieser Website präsentierten Informationen, Zubereitungen und Protokolle dienen ausschließlich Bildungszwecken und der persönlichen Eigenverantwortung. Sie stellen in keiner Weise eine medizinische Beratung dar, stellen keine Diagnosen und ersetzen keinesfalls die Konsultation eines qualifizierten Arztes.
              </p>
            ) : (
              <p>
                The information, preparations and protocols presented on this website are exclusively for educational purposes and personal autonomy. They do not constitute medical advice, provide diagnoses, or replace professional healthcare consultations.
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 uppercase tracking-[0.15em] text-center sm:text-left">
              <span>© 2026 Bloom by BotaniK</span>
              <span className="hidden sm:inline">•</span>
              <span>Extraction Botanique de Précision & Santé du Terrain</span>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="/mentions-legales"
                onClick={(e) => { e.preventDefault(); onNavigate('legal', undefined, 'mentions'); }}
                className="hover:text-white transition-colors"
              >
                Mentions Légales
              </a>
              <a 
                href="/cgu"
                onClick={(e) => { e.preventDefault(); onNavigate('legal', undefined, 'cgu'); }}
                className="hover:text-white transition-colors"
              >
                CGV & CGU
              </a>
              <a 
                href="/politique-de-confidentialite"
                onClick={(e) => { e.preventDefault(); onNavigate('legal', undefined, 'confidentialite'); }}
                className="hover:text-white transition-colors"
              >
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
