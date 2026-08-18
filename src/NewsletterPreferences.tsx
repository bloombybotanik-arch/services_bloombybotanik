import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Shield, Check, X, Save, AlertCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { updatePreferences, unsubscribe } from './lib/newsletter';
import { Subscriber, SubscriberPreferences, SchoolCalendarZone } from './types';

interface NewsletterPreferencesProps {
  subscriberId: string;
  lang: string;
}

export const NewsletterPreferences: React.FC<NewsletterPreferencesProps> = ({ subscriberId, lang }) => {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [prefs, setPrefs] = useState<SubscriberPreferences>({
    family_rhythm: false,
    school_calendar_zone: 'non_precise',
    content_context: ['routine_personnelle']
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'unsubscribed'>('idle');

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const docRef = doc(db, 'subscribers', subscriberId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Subscriber;
          setSubscriber(data);
          if (data.preferences) {
            setPrefs(data.preferences);
          }
        }
      } catch (error) {
        console.error("Error fetching subscriber:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriber();
  }, [subscriberId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences(subscriberId, prefs);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!window.confirm(lang === 'fr' ? 'Êtes-vous sûr de vouloir vous désinscrire ?' : 'Are you sure you want to unsubscribe?')) return;
    
    setSaving(true);
    try {
      await unsubscribe(subscriberId);
      setStatus('unsubscribed');
    } catch (error) {
      console.error("Error unsubscribing:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleContext = (val: string) => {
    setPrefs(prev => ({
      ...prev,
      content_context: prev.content_context.includes(val)
        ? prev.content_context.filter(c => c !== val)
        : [...prev.content_context, val]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C3F34]"></div>
      </div>
    );
  }

  if (status === 'unsubscribed') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-xl text-center space-y-6"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <X className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-black text-[#0F261E]">
            {lang === 'fr' ? 'Désinscription confirmée' : 'Unsubscription confirmed'}
          </h1>
          <p className="text-slate-600">
            {lang === 'fr' 
              ? 'Vous ne recevrez plus nos emails. Vous pouvez vous réinscrire à tout moment sur notre site.' 
              : 'You will no longer receive our emails. You can re-subscribe at any time on our site.'}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-[#1C3F34] text-white rounded-2xl font-bold"
          >
            {lang === 'fr' ? 'Retour au site' : 'Back to site'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Vos Préférences
          </div>
          <h1 className="text-4xl font-black text-[#0F261E]">
            {lang === 'fr' ? 'Personnalisez votre expérience Bloom' : 'Personalize your Bloom experience'}
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            {lang === 'fr' 
              ? `Gérez vos abonnements et aidez-nous à vous envoyer les contenus les plus pertinents pour ${subscriber?.email}.`
              : `Manage your subscriptions and help us send you the most relevant content for ${subscriber?.email}.`}
          </p>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-[#F3EEE6]">
          <div className="p-8 md:p-12 space-y-10">
            {/* Section Rythme Familial */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#0F261E]">
                    {lang === 'fr' ? 'Rythmes Familiaux' : 'Family Rhythms'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {lang === 'fr' ? 'Adapter les contenus aux vacances et à l\'organisation du foyer.' : 'Adapt content to holidays and household organization.'}
                  </p>
                </div>
                <button 
                  onClick={() => setPrefs(prev => ({ ...prev, family_rhythm: !prev.family_rhythm }))}
                  className={`w-14 h-8 rounded-full transition-colors relative ${prefs.family_rhythm ? 'bg-emerald-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${prefs.family_rhythm ? 'translate-x-6' : ''}`} />
                </button>
              </div>

              {prefs.family_rhythm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-slate-100"
                >
                  <label className="text-xs font-black text-[#0F261E] uppercase tracking-widest mb-3 block">
                    {lang === 'fr' ? 'Zone de vacances scolaires' : 'School holiday zone'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {(['A', 'B', 'C', 'hors_france', 'non_precise'] as SchoolCalendarZone[]).map(zone => (
                      <button
                        key={zone}
                        onClick={() => setPrefs(prev => ({ ...prev, school_calendar_zone: zone }))}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                          prefs.school_calendar_zone === zone 
                            ? 'bg-[#1C3F34] text-white border-[#1C3F34]' 
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {zone === 'hors_france' ? (lang === 'fr' ? 'Hors Fr' : 'Outside Fr') : zone}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Section Centres d'intérêt */}
            <div className="space-y-6 pt-10 border-t border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#0F261E]">
                  {lang === 'fr' ? 'Centres d\'intérêt' : 'Interests'}
                </h3>
                <p className="text-sm text-slate-500">
                  {lang === 'fr' ? 'Sélectionnez les sujets que vous souhaitez explorer.' : 'Select the topics you want to explore.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'routine_personnelle', fr: 'Routine perso', en: 'Personal routine' },
                  { id: 'organisation_familiale', fr: 'Organisation', en: 'Organization' },
                  { id: 'cuisine', fr: 'Cuisine', en: 'Cooking' },
                  { id: 'cosmetique', fr: 'Cosmétique', en: 'Cosmetics' },
                  { id: 'botanique', fr: 'Botanique', en: 'Botany' },
                  { id: 'bloomlab', fr: 'BloomLab®', en: 'BloomLab®' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleContext(item.id)}
                    className={`py-4 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      prefs.content_context.includes(item.id)
                        ? 'bg-[#E8F1EE] text-[#1C3F34] border-[#1C3F34]' 
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {prefs.content_context.includes(item.id) && <Check className="w-4 h-4" />}
                    {lang === 'fr' ? item.fr : item.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="pt-10 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#1C3F34] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {status === 'success' ? (
                  <>
                    <Check className="w-6 h-6" />
                    {lang === 'fr' ? 'Enregistré' : 'Saved'}
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    {lang === 'fr' ? 'Enregistrer les modifications' : 'Save changes'}
                  </>
                )}
              </button>
              <button 
                onClick={handleUnsubscribe}
                disabled={saving}
                className="px-8 py-5 rounded-2xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all disabled:opacity-50"
              >
                {lang === 'fr' ? 'Se désabonner' : 'Unsubscribe'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
          <AlertCircle className="w-4 h-4" />
          {lang === 'fr' 
            ? 'Vos modifications sont prises en compte pour les prochaines newsletters.' 
            : 'Your changes are taken into account for the next newsletters.'}
        </div>
      </div>
    </div>
  );
};
