import React, { useState, useEffect } from 'react';
import { User, Mail, ShieldCheck, CreditCard, Clock, Check, ChevronRight, Lock, LogOut, Award, Star, Settings, BookOpen } from 'lucide-react';
import { auth, db } from './lib/firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { translations, Language } from './translations';

interface AccountContentProps {
  user: any;
  onNavigate: (view: any) => void;
  onLogout: () => void;
  lang?: Language;
}

export default function AccountContent({ user, onNavigate, onLogout, lang = 'fr' }: AccountContentProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const t = translations[lang].account;

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    }
    fetchUserData();
  }, [user]);

  const handleVerifyEmail = async () => {
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      setVerificationSent(true);
    }
  };

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, {
      isPremium: true,
      subscriptionPlan: plan,
      subscriptionDate: new Date().toISOString()
    });
    setUserData((prev: any) => ({ ...prev, isPremium: true, subscriptionPlan: plan }));
    setShowSubscription(false);
  };

  if (!user) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-botanik-green/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <User className="w-10 h-10 text-botanik-green" />
        </div>
        <h1 className="text-4xl font-bold text-botanik-green mb-4">{t.title}</h1>
        <p className="text-botanik-green/60 mb-12">{t.subtitle}</p>
        <button 
          onClick={() => onNavigate('home')} 
          className="px-10 py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-botanik-green/90 transition-all"
        >
          {t.back_home}
        </button>
      </div>
    );
  }

  if (showSubscription) {
    return (
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-botanik-green mb-6 tracking-tight">{t.plans.title}</h1>
          <p className="text-botanik-green/60 text-lg max-w-2xl mx-auto">{t.plans.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-white border-2 border-botanik-green/10 rounded-[40px] p-10 hover:border-botanik-orange transition-all group flex flex-col">
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-botanik-green opacity-40">{t.plans.monthly.name}</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-5xl font-black text-botanik-green">{t.plans.monthly.price}</span>
                <span className="text-botanik-green/40">{t.plans.monthly.period}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              {t.plans.monthly.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-botanik-green/80">
                  <Check className="w-4 h-4 text-botanik-orange" /> {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleSubscribe('monthly')}
              className="w-full py-4 bg-botanik-green text-white rounded-2xl font-bold hover:bg-[#293228] transition-all"
            >
              {t.plans.monthly.button}
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-botanik-green rounded-[40px] p-10 shadow-2xl relative overflow-hidden group flex flex-col">
            <div className="absolute top-6 right-6 bg-botanik-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {t.plans.yearly.save}
            </div>
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t.plans.yearly.name}</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-5xl font-black text-white">{t.plans.yearly.price}</span>
                <span className="text-white/40">{t.plans.yearly.period}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              {t.plans.yearly.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <Star className="w-4 h-4 text-botanik-orange fill-botanik-orange" /> {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleSubscribe('yearly')}
              className="w-full py-4 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-botanik-orange/90 transition-all shadow-xl"
            >
              {t.plans.yearly.button}
            </button>
          </div>
        </div>

        <button 
          onClick={() => setShowSubscription(false)}
          className="mt-12 text-sm font-bold text-botanik-green/40 uppercase tracking-widest block mx-auto hover:text-botanik-green transition-colors"
        >
          {t.plans.back}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar Info */}
        <div className="w-full md:w-80 space-y-8">
          <div className="bg-[#F5F3EB] rounded-[40px] p-8 text-center border border-botanik-green/5">
            <div className="w-24 h-24 bg-botanik-green rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <User className="w-12 h-12 text-white" />
              {userData?.isPremium && (
                <div className="absolute -bottom-2 -right-2 bg-botanik-orange text-white p-2 rounded-full shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-botanik-green mb-1">{user.email?.split('@')[0]}</h2>
            <p className="text-sm text-botanik-green/60 mb-6">{user.email}</p>
            <button 
              onClick={onLogout}
              className="text-xs font-bold text-botanik-magenta uppercase tracking-widest flex items-center gap-2 justify-center mx-auto hover:underline"
            >
              <LogOut className="w-4 h-4" /> {t.logout}
            </button>
            {user.email === 'bloombybotanik@gmail.com' && (
              <button 
                onClick={() => onNavigate('admin')}
                className="mt-4 w-full py-3 bg-botanik-green text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-botanik-green/90 transition-all flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" /> Admin Dashboard
              </button>
            )}
          </div>

          <div className="bg-white border border-botanik-green/10 rounded-[32px] p-6 space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-botanik-green/5 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3 text-botanik-green">
                <Settings className="w-4 h-4" /> <span className="font-semibold text-sm">{t.settings}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-botanik-green/20 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-botanik-green/5 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3 text-botanik-green">
                <ShieldCheck className="w-4 h-4" /> <span className="font-semibold text-sm">{t.security}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-botanik-green/20 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Account Area */}
        <div className="flex-1 space-y-8">
          {/* Email Verification Banner */}
          {!user.emailVerified && (
            <div className="bg-botanik-orange/10 border border-botanik-orange/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-botanik-orange/20 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-8 h-8 text-botanik-orange" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-botanik-green mb-1">{t.verify_email.title}</h3>
                <p className="text-sm text-botanik-green/70">{t.verify_email.description}</p>
              </div>
              <button 
                onClick={handleVerifyEmail}
                disabled={verificationSent}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${verificationSent ? 'bg-botanik-green/10 text-botanik-green/40' : 'bg-botanik-orange text-white hover:bg-botanik-orange/90 shadow-lg shadow-botanik-orange/20'}`}
              >
                {verificationSent ? t.verify_email.sent : t.verify_email.button}
              </button>
            </div>
          )}

          {/* Subscription Status Card */}
          <div className="bg-white border border-botanik-green/10 rounded-[40px] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
              <div>
                <h3 className="text-2xl font-bold text-botanik-green mb-2">{t.subscription.title}</h3>
                <p className="text-botanik-green/60">{t.subscription.manage}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] ${userData?.isPremium ? 'bg-botanik-green text-white' : 'bg-botanik-green/5 text-botanik-green/40'}`}>
                {userData?.isPremium ? t.subscription.premium : t.subscription.free}
              </div>
            </div>

            {userData?.isPremium ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-[#F5F3EB] rounded-2xl border border-botanik-green/5">
                    <span className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest block mb-2">{t.subscription.current_plan}</span>
                    <p className="text-lg font-bold text-botanik-green capitalize">{userData.subscriptionPlan === 'monthly' ? t.plans.monthly.name.split(' ')[1] : t.plans.yearly.name.split(' ')[1]}</p>
                  </div>
                  <div className="p-6 bg-[#F5F3EB] rounded-2xl border border-botanik-green/5">
                    <span className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest block mb-2">{t.subscription.next_payment}</span>
                    <p className="text-lg font-bold text-botanik-green">
                      {new Date(new Date(userData.subscriptionDate).setMonth(new Date(userData.subscriptionDate).getMonth() + (userData.subscriptionPlan === 'monthly' ? 1 : 12))).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'de-DE')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 border border-botanik-green/10 rounded-2xl font-bold text-botanik-green hover:bg-botanik-green/5 transition-all text-sm uppercase tracking-widest">{t.subscription.manage_payment}</button>
                  <button className="flex-1 py-4 border border-botanik-magenta/10 text-botanik-magenta rounded-2xl font-bold hover:bg-botanik-magenta/5 transition-all text-sm uppercase tracking-widest">{t.subscription.cancel}</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-botanik-green/[0.02] rounded-[32px] border border-dashed border-botanik-green/10">
                <div className="w-16 h-16 bg-botanik-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-botanik-orange" />
                </div>
                <h4 className="text-xl font-bold text-botanik-green mb-4">{t.subscription.upgrade_title}</h4>
                <p className="text-sm text-botanik-green/60 max-w-md mx-auto mb-8">{t.subscription.upgrade_desc}</p>
                <button 
                  onClick={() => setShowSubscription(true)}
                  className="px-10 py-4 bg-botanik-orange text-white rounded-2xl font-bold hover:bg-botanik-orange/90 transition-all shadow-xl shadow-botanik-orange/20 uppercase tracking-widest text-sm"
                >
                  {t.subscription.upgrade_button}
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats / History */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-botanik-green/10 p-8 rounded-[32px] text-center">
              <BookOpen className="w-8 h-8 text-botanik-green mx-auto mb-4" />
              <div className="text-2xl font-black text-botanik-green">04</div>
              <div className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest">{t.stats.extractions}</div>
            </div>
            <div className="bg-white border border-botanik-green/10 p-8 rounded-[32px] text-center">
              <Star className="w-8 h-8 text-botanik-orange mx-auto mb-4" />
              <div className="text-2xl font-black text-botanik-green">12</div>
              <div className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest">{t.stats.favorites}</div>
            </div>
            <div className="bg-white border border-botanik-green/10 p-8 rounded-[32px] text-center">
              <CreditCard className="w-8 h-8 text-botanik-green mx-auto mb-4" />
              <div className="text-2xl font-black text-botanik-green">02</div>
              <div className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest">{t.stats.orders}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
