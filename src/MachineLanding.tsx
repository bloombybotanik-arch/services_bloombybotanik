import React from 'react';
import { ChevronRight, ShieldCheck, Zap, FlaskConical, Award, Star, Activity, ArrowRight, Check, Utensils, CheckCircle } from 'lucide-react';
import { wrapTitle } from './lib/textUtils';
import bloomLabImg from './assets/images/bloomlab_main_1784887530345.jpeg';
import bloomSoinsImg from './assets/images/Bloom_Soins.jpg';
import fourMmImg from './assets/images/4MM.jpg';

export default function MachineLanding({ onNavigate }: { onNavigate: (view: any) => void }) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#293228]">
        <div className="absolute inset-0 opacity-20">
          <img src={bloomLabImg} alt="BloomLab background" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#F97316] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
              <Zap className="w-4 h-4" /> Souveraineté Botanique
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              BloomLab :<br />
              <span className="text-[#F97316]">L'Extraction Intégrale.</span>
            </h1>
            <p className="text-base md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed font-light">
              Bien plus qu'une machine, un instrument de précision clinique pour capturer le Totum des plantes et restaurer votre homéostasie en toute autonomie.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => onNavigate('boutique')}
                className="px-10 py-5 bg-[#F97316] text-white rounded-2xl font-bold text-lg hover:bg-[#EA580C] transition-all shadow-2xl shadow-[#F97316]/20 flex items-center gap-3 group"
              >
                Acquérir ma BloomLab <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Découvrir la technologie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What is the machine? */}
      <section id="details" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-[#F97316] mb-4 block italic">L'Instrument</span>
              <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-8 leading-tight">
                La quintessence de l'ingénierie au service du vivant.
              </h2>
              <div className="space-y-8">
                <p className="text-lg text-botanik-green/70 leading-relaxed">
                  Conçue en France avec des standards de grade chirurgical, la BloomLab est le premier extracteur domestique capable de maintenir une précision thermique de ±0,5°C sur des cycles longs.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                    <ShieldCheck className="w-10 h-10 text-botanik-green mb-4" />
                    <h4 className="font-bold text-botanik-green mb-2">Inox 304 Alimentaire</h4>
                    <p className="text-sm text-botanik-green/60">Aucune migration de métaux lourds. Pureté absolue de vos extraits.</p>
                  </div>
                  <div className="p-6 bg-[#F9F9F7] rounded-3xl border border-botanik-green/5">
                    <Activity className="w-10 h-10 text-botanik-green mb-4" />
                    <h4 className="font-bold text-botanik-green mb-2">Contrôle Digital</h4>
                    <p className="text-sm text-botanik-green/60">Algorithmes de chauffe intelligents pour préserver les principes actifs fragiles.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F97316]/5 rounded-[60px] blur-3xl"></div>
              <img src={bloomLabImg} alt="BloomLab Details" className="relative rounded-[40px] shadow-2xl border border-botanik-green/5 w-full object-cover aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* Why it exists */}
      <section className="py-24 bg-botanik-green text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-6xl font-bold mb-12 leading-tight italic">"Votre corps n'est pas cassé. Il est verrouillé."</h2>
            <p className="text-lg md:text-2xl text-white/80 mb-12 leading-relaxed font-light">
              Nous avons créé Bloom pour redonner à chacun la clé de sa propre pharmacie intérieure. Le système industriel actuel standardise les remèdes, oubliant que chaque terrain biologique est unique.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-white/90"><strong>Sortez de la dépendance :</strong> Ne subissez plus les formulations génériques du commerce.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg text-white/90"><strong>Précision Thérapeutique :</strong> Adaptez chaque gramme, chaque minute, chaque degré à vos besoins réels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Niveaux d'Expertise */}
      <section id="niveaux" className="py-24 bg-[#F9F9F7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#F97316] mb-4 block italic">Parcours de Souveraineté</span>
            <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6">Un Seul Instrument. 3 Voies d'Expertise.</h2>
            <p className="text-base md:text-xl text-botanik-green/60 max-w-2xl mx-auto">La BloomLab est un outil évolutif qui s'adapte à votre cheminement.</p>
          </div>

          <div className="space-y-12">
            {/* Niveau 1 */}
            <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-700 group">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                    <Utensils className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>Niveau 1</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>Libre accès</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">Découvrir : L'Art Culinaire</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  "Relancez vos sens et vos fonctions digestives par la cuisine vivante."
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    Ce premier niveau s'adresse à tous. Ici, la BloomLab devient l'alliée de votre cuisine. Apprenez à extraire les terpènes et les saveurs délicates des plantes.
                  </p>
                  <div className="bg-[#F5F3EB] p-8 rounded-3xl">
                    <h4 className="font-bold text-botanik-green mb-4">Ce que vous apprenez :</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Extraction thermique douce</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Synergies aromatiques</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('culinaire')} className="flex items-center gap-3 px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg group">
                  Explorer l'Atelier Culinaire <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block">
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Culinaire" />
              </div>
            </div>

            {/* Niveau 2 */}
            <div className="grid lg:grid-cols-[450px_1fr] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-botanik-green/5 shadow-sm hover:shadow-xl transition-all duration-700 group">
              <div className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block">
                <img src={bloomSoinsImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Cosmétique" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F5F3EB] rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                    <FlaskConical className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>Niveau 2</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>Approfondissement</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">Approfondir : Cosmétique Systémique</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  "La peau est le miroir de votre terrain. Soignez-la de l'extérieur vers l'intérieur."
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    Passez à l'étape supérieure en formulant vos propres soins topiques. La BloomLab vous permet d'extraire des actifs puissants pour créer des sérums et élixirs.
                  </p>
                  <div className="bg-[#F5F3EB] p-8 rounded-3xl">
                    <h4 className="font-bold text-botanik-green mb-4">Ce que vous maîtrisez :</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Extractions biphasiques</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Logique peau/émonctoire</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('cosmetiques')} className="flex items-center gap-3 px-8 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all shadow-lg group">
                  Découvrir l'Espace Cosmétique <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Niveau 3 */}
            <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-center bg-white rounded-[60px] p-8 md:p-16 border border-[#F97316]/20 shadow-[0_20px_50px_rgba(249,115,22,0.05)] hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#F97316]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                    <Activity className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F97316] mb-1">
                      <span>Niveau 3</span>
                      <span className="w-1 h-1 rounded-full bg-[#F97316]/40"></span>
                      <span>Expertise Premium</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-botanik-green">Maîtriser : Phytothérapie de Précision</h2>
                  </div>
                </div>
                <p className="text-lg text-botanik-green/70 mb-8 leading-relaxed italic">
                  "Le Totum intégral : le dialogue sacré entre la plante et votre homéostasie."
                </p>
                <div className="space-y-6 mb-10">
                  <p className="text-botanik-green/60 text-sm leading-relaxed">
                    Le sommet de la souveraineté. Accédez aux 56 protocoles de précision BloomLab. Ici, vous utilisez la machine comme un outil de laboratoire clinique.
                  </p>
                  <div className="bg-[#F9F9F7] p-8 rounded-3xl border border-[#F97316]/10">
                    <h4 className="font-bold text-botanik-green mb-4">Votre niveau d'expertise :</h4>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Protocoles Totum 56</li>
                      <li className="flex items-center gap-3 text-sm font-medium text-botanik-green/80"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Reset Homéostatique</li>
                    </ul>
                  </div>
                </div>
                <button onClick={() => onNavigate('library')} className="flex items-center gap-3 px-8 py-4 bg-[#F97316] text-white rounded-2xl font-bold hover:bg-[#EA580C] transition-all shadow-xl shadow-[#F97316]/20 group">
                  Accéder aux Protocoles Experts <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative aspect-square rounded-[40px] overflow-hidden bg-[#F5F3EB] hidden lg:block">
                <img src={fourMmImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Expert" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (From UsageLevels) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-botanik-green mb-6">Tarification Souveraine</h2>
            <p className="text-base md:text-xl text-botanik-green/60 max-w-2xl mx-auto">Choisissez la voie qui correspond à votre rythme d'apprentissage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mensuel */}
            <div className="bg-[#F9F9F7] rounded-3xl p-8 border border-botanik-green/5 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-botanik-green mb-2">Mensuel</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-botanik-green">9,90€</span>
                  <span className="text-botanik-green/60 font-medium">/mois</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Accès Bibliothèque Complète</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Support Communauté</li>
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-botanik-green text-white rounded-xl font-bold hover:bg-botanik-green/90 transition-all">S'abonner</button>
            </div>

            {/* Annuel */}
            <div className="bg-botanik-green rounded-3xl p-8 border-4 border-[#F97316] flex flex-col relative transform scale-105 shadow-2xl shadow-botanik-green/20">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F97316] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommandé</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Annuel</h3>
                <div className="flex items-baseline gap-1 mb-4 text-white">
                  <span className="text-4xl font-black">99€</span>
                  <span className="opacity-60 font-medium">/an</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1 text-white">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Tout l'Accès Premium</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> 2 mois d'économie</li>
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-[#F97316] text-white rounded-xl font-bold hover:bg-[#EA580C] transition-all">S'engager pour l'année</button>
            </div>

            {/* Lifetime */}
            <div className="bg-[#F9F9F7] rounded-3xl p-8 border border-botanik-green/5 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-botanik-green mb-2">À vie</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-botanik-green">297€</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Accès Éternel</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle className="w-4 h-4 text-[#F97316]" /> Aucun abonnement</li>
              </ul>
              <button onClick={() => onNavigate('boutique')} className="w-full py-4 bg-botanik-green text-white rounded-xl font-bold hover:bg-botanik-green/90 transition-all">Membre à Vie</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#293228] text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-7xl font-bold mb-8 leading-tight">Reprenez les clés de votre terrain.</h2>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto italic font-light">
            La BloomLab est disponible dès maintenant pour vous accompagner vers une souveraineté santé retrouvée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('boutique')}
              className="w-full sm:w-auto px-12 py-6 bg-[#F97316] text-white rounded-2xl font-bold text-xl hover:bg-[#EA580C] transition-all flex items-center justify-center gap-3"
            >
              Commander ma Machine <ChevronRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onNavigate('guide')}
              className="w-full sm:w-auto px-12 py-6 bg-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
            >
              Voir le Guide d'Usage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
