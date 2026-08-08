import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { MessageSquare, Users, AlertCircle, TrendingUp, Calendar, ChevronRight, Brain, Filter, User } from 'lucide-react';

interface AdminDashboardProps {
  lang?: 'fr' | 'en' | 'de';
}

export default function AdminDashboard({ lang = 'fr' }: AdminDashboardProps) {
  const [concerns, setConcerns] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'concerns' | 'users'>('concerns');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Concerns
        const concernsRef = collection(db, 'customer_concerns');
        const concernsQuery = query(concernsRef, orderBy('createdAt', 'desc'), limit(50));
        const concernsSnap = await getDocs(concernsQuery);
        setConcerns(concernsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch Users
        const usersRef = collection(db, 'users');
        const usersQuery = query(usersRef, orderBy('createdAt', 'desc'), limit(50));
        const usersSnap = await getDocs(usersQuery);
        setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-botanik-green/20 border-t-botanik-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-botanik-green mb-2">Tableau de Bord Alma</h1>
          <p className="text-botanik-green/60">Analyse des besoins et gestion de la communauté Bloom.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-botanik-green/10 shadow-sm">
          <button 
            onClick={() => setActiveTab('concerns')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'concerns' ? 'bg-botanik-green text-white shadow-lg' : 'text-botanik-green/40 hover:text-botanik-green'}`}
          >
            <Brain className="w-4 h-4" /> Feedback Bot
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-botanik-green text-white shadow-lg' : 'text-botanik-green/40 hover:text-botanik-green'}`}
          >
            <Users className="w-4 h-4" /> Utilisateurs
          </button>
        </div>
      </div>

      {activeTab === 'concerns' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-botanik-green/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-botanik-orange/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-botanik-orange" />
                </div>
                <h3 className="font-bold text-botanik-green">Total Interactions</h3>
              </div>
              <p className="text-3xl font-black text-botanik-green">{concerns.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-botanik-green/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-botanik-green/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-botanik-green" />
                </div>
                <h3 className="font-bold text-botanik-green">Top Catégorie</h3>
              </div>
              <p className="text-3xl font-black text-botanik-green">
                {concerns.length > 0 ? Object.entries(concerns.reduce((acc, c) => ({ ...acc, [c.category]: (acc[c.category] || 0) + 1 }), {} as any)).sort((a: any, b: any) => b[1] - a[1])[0][0] : '-'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-botanik-green/5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-botanik-green">Alertes Sévères</h3>
              </div>
              <p className="text-3xl font-black text-red-500">{concerns.filter(c => c.severity === 'élevée').length}</p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-botanik-green/10 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-botanik-green/5 bg-botanik-green/[0.02] flex justify-between items-center">
              <h3 className="font-bold text-botanik-green">Derniers retours Alma</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-botanik-green/5 rounded-lg transition-colors"><Filter className="w-4 h-4 text-botanik-green/40" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-botanik-green/40">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Question</th>
                    <th className="px-6 py-4">Catégorie</th>
                    <th className="px-6 py-4">Émotion</th>
                    <th className="px-6 py-4">Sévérité</th>
                    <th className="px-6 py-4">Amélioration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-botanik-green/5">
                  {concerns.map((c) => (
                    <tr key={c.id} className="hover:bg-botanik-green/[0.01] transition-colors group">
                      <td className="px-6 py-4 text-xs text-botanik-green/60 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs md:max-w-md">
                          <p className="text-sm font-bold text-botanik-green truncate group-hover:whitespace-normal">{c.userQuestion}</p>
                          <p className="text-[10px] text-botanik-green/40 truncate">{c.answerSummary}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-botanik-green/5 text-botanik-green text-[10px] font-bold rounded-full uppercase tracking-tighter">
                          {c.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs ${c.emotion === 'frustration' || c.emotion === 'colère' ? 'text-red-500' : 'text-botanik-green'}`}>
                          {c.emotion}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`w-2 h-2 rounded-full ${c.severity === 'élevée' ? 'bg-red-500' : c.severity === 'moyenne' ? 'bg-botanik-orange' : 'bg-green-400'}`} />
                      </td>
                      <td className="px-6 py-4 text-xs italic text-botanik-green/60">
                        {c.suggestedImprovement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-botanik-green/10 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-botanik-green/5 bg-botanik-green/[0.02]">
            <h3 className="font-bold text-botanik-green">Communauté Bloom</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-botanik-green/40">
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Inscrit le</th>
                  <th className="px-6 py-4">Expire le</th>
                  <th className="px-6 py-4">Machine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-botanik-green/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-botanik-green/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-botanik-green/5 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-botanik-green" />
                        </div>
                        <span className="text-sm font-bold text-botanik-green">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.isPremium ? 'bg-botanik-orange text-white' : 'bg-botanik-green/5 text-botanik-green/40'}`}>
                        {u.isPremium ? 'Premium' : 'Gratuit'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-botanik-green/60">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-xs text-botanik-green/60">
                      {u.isPremiumUntil ? new Date(u.isPremiumUntil).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {u.machineOwned ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-botanik-green/10" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
}

function X({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
}
