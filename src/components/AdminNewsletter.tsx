
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Settings, 
  History, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Calendar, 
  TrendingUp, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Layout, 
  Loader2,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { generateNewsletter, approveCampaign } from '../lib/newsletter';
import { NewsletterCampaign, NewsletterGenerationSession } from '../types';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const AdminNewsletter: React.FC<{ lang: string }> = ({ lang }) => {
  const [view, setView] = useState<'dashboard' | 'generate' | 'review'>('dashboard');
  const [sessions, setSessions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);

  // Generation Context
  const [season, setSeason] = useState('Hiver');
  const [manualQuestions, setManualQuestions] = useState('');
  const [manualTrends, setManualTrends] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'newsletter_generation_sessions'), orderBy('created_at', 'desc'), limit(10));
      const snap = await getDocs(q);
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));

      const cq = query(collection(db, 'newsletter_campaigns'), orderBy('created_at', 'desc'), limit(10));
      const csnap = await getDocs(cq);
      setCampaigns(csnap.docs.map(d => ({ id: d.id, ...d.data() } as NewsletterCampaign)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await generateNewsletter(season, {
        questions: manualQuestions.split('\n').filter(l => l.trim()),
        popular_topics: manualTrends.split('\n').filter(l => l.trim())
      });
      if (result.success) {
        await fetchData();
        setView('dashboard');
      }
    } catch (e) {
      alert("Erreur lors de la génération");
    } finally {
      setGenerating(false);
    }
  };

  const handleApprove = async (id: string) => {
    const res = await approveCampaign(id);
    if (res.success) {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0F261E]">Orchestrateur Newsletter</h1>
            <p className="text-slate-500 font-medium">Système multi-agents Bloom by BotaniK</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-[#1C3F34] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setView('generate')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'generate' ? 'bg-[#1C3F34] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              Générer
            </button>
          </div>
        </div>

        {view === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Campaigns Drafts */}
              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-[#0F261E] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Brouillons & Validations
                  </h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {campaigns.map(camp => (
                    <div key={camp.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[#0F261E]">{camp.subject || camp.theme}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            camp.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {camp.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Créé le {new Date(camp.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {camp.status !== 'approved' && (
                          <button 
                            onClick={() => handleApprove(camp.id!)}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {campaigns.length === 0 && (
                    <div className="p-10 text-center text-slate-400 text-sm font-medium">Aucune campagne récente</div>
                  )}
                </div>
              </div>

              {/* Sessions Audit */}
              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-[#0F261E] flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" />
                    Journal des Agents
                  </h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {sessions.map(sess => (
                    <div key={sess.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0F261E]">Session Agent - {sess.shared_memory?.selected_topic?.selected_topic || 'En cours'}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            sess.risk_level === 'low' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            Risque {sess.risk_level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Score Qualité: {sess.shared_memory?.quality_report?.score}%</p>
                      </div>
                      <button 
                        onClick={() => { setSelectedSession(sess); setView('review'); }}
                        className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Stats & Health */}
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-bold text-[#0F261E]">Statut Réseau</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Orchestrateur', status: 'OK' },
                    { label: 'Analyste Besoins', status: 'OK' },
                    { label: 'Fact Checker', status: 'OK' },
                    { label: 'Claims Safety', status: 'OK' }
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">{agent.label}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'generate' && (
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#0F261E]">Nouvelle Génération</h2>
              <p className="text-slate-500 font-medium">Configurez le contexte pour la chaîne multi-agents.</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-[#0F261E] uppercase tracking-widest pl-1">Saison Actuelle</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Hiver', 'Printemps', 'Été', 'Automne'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${season === s ? 'bg-[#1C3F34] text-white border-[#1C3F34]' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-[#0F261E] uppercase tracking-widest pl-1 flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  Besoins du Public (Questions Manuelles)
                </label>
                <textarea 
                  value={manualQuestions}
                  onChange={(e) => setManualQuestions(e.target.value)}
                  placeholder="Comment extraire le curcuma ?&#10;Recette pour le sommeil"
                  className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1C3F34]/20 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-[#0F261E] uppercase tracking-widest pl-1 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  Tendances & Buzz
                </label>
                <textarea 
                  value={manualTrends}
                  onChange={(e) => setManualTrends(e.target.value)}
                  placeholder="Boissons adaptogènes&#10;Extraction totum à froid"
                  className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1C3F34]/20 transition-all text-sm font-medium"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {generating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                Lancer la Chaîne Collaborative
              </button>
            </div>
          </div>
        )}

        {view === 'review' && selectedSession && (
          <div className="space-y-10 pb-20">
            <button 
              onClick={() => setView('dashboard')}
              className="text-slate-400 font-bold flex items-center gap-2 hover:text-[#1C3F34] transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Retour au Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                {[
                  { id: 'audience_needs', label: 'Besoins Public', icon: Search },
                  { id: 'trends', label: 'Tendances', icon: TrendingUp },
                  { id: 'seasonal_context', label: 'Contexte', icon: Calendar },
                  { id: 'customer_voice', label: 'Voix Client', icon: MessageSquare },
                  { id: 'selected_topic', label: 'Sélection Sujet', icon: Layout },
                  { id: 'fact_research', label: 'Recherche Faits', icon: FileText },
                  { id: 'editorial_draft', label: 'Rédaction', icon: FileText },
                  { id: 'claims_review', label: 'Sécurité', icon: ShieldCheck },
                  { id: 'html_output', label: 'Rendu Final', icon: Eye }
                ].map((step, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-[#1C3F34]" />
                      </div>
                      <span className="text-sm font-bold text-[#0F261E]">{step.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 space-y-8">
                {/* Draft Preview */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-[#0F261E]">Draft Editorial</h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest">Vérifié</span>
                  </div>
                  <div className="prose max-w-none prose-slate">
                    <h1 className="text-xl font-bold">{selectedSession.shared_memory?.editorial_draft?.subject}</h1>
                    <p className="text-slate-500 font-medium italic">{selectedSession.shared_memory?.editorial_draft?.preheader}</p>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 mt-6">
                      {selectedSession.shared_memory?.editorial_draft?.body_markdown}
                    </div>
                    <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Note de Sécurité</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic">{selectedSession.shared_memory?.editorial_draft?.safety_note}</p>
                    </div>
                  </div>
                </div>

                {/* Agent Raw Data Accordion (Simplified) */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
                  <h3 className="font-bold text-[#0F261E]">Données Agents (Brut)</h3>
                  <pre className="text-[10px] bg-slate-50 p-6 rounded-2xl overflow-auto max-h-96 text-slate-500 border border-slate-100">
                    {JSON.stringify(selectedSession.shared_memory, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
