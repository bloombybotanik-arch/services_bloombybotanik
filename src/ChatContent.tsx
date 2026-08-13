import React, { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon, Sparkles, ArrowLeft, FlaskConical, ChevronRight, Star, RotateCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { wrapTitle } from './lib/textUtils';
import { translations, Language } from './translations';

import { getAlmaQuestions, Question } from './data/almaQuestions';

interface Message {
  id: string;
  text: string;
  sender: 'alma' | 'user';
  options?: { label: string; value: string }[];
}

export default function ChatContent({ 
  isPremium, 
  onNavigate, 
  user, 
  onRequireAuth, 
  onSaveAssessment,
  savedAssessment,
  onResetAssessment,
  lang
}: { 
  isPremium: boolean, 
  onNavigate: (v: any, productId?: string, type?: any) => void,
  user?: FirebaseUser | null,
  onRequireAuth: () => void,
  onSaveAssessment: (results: any) => void,
  savedAssessment?: any,
  onResetAssessment: () => void,
  lang: Language
}) {
  const QUESTIONS = React.useMemo(() => getAlmaQuestions(lang), [lang]);
  const t = translations[lang].alma;
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (savedAssessment) {
      setShowResults(true);
    } else if (!hasInitialized.current) {
      hasInitialized.current = true;
      // Start immediately with first question if no saved result
      askQuestion(0);
    }
  }, [savedAssessment]);

  // Handle auth success during the waiting state
  useEffect(() => {
    if (isWaitingForAuth && user) {
      setIsWaitingForAuth(false);
      handleComplete();
    }
  }, [user, isWaitingForAuth]);

  const askQuestion = (index: number) => {
    // Prevent duplicate questions if one is already being asked or present
    if (index === 0 && messages.some(m => m.id === `q-${QUESTIONS[0].id}`)) return;

    if (index >= QUESTIONS.length) {
      if (!user) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => {
            if (prev.some(m => m.id === 'auth-req')) return prev;
            return [...prev, {
              id: `auth-req`,
              sender: 'alma',
              text: t.auth_required
            }];
          });
          setIsWaitingForAuth(true);
          setTimeout(() => onRequireAuth(), 1500);
        }, 1000);
        return;
      }
      handleComplete();
      return;
    }

    const q = QUESTIONS[index];
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => {
        // Final guard against duplicates
        if (prev.some(m => m.id === `q-${q.id}`)) return prev;
        return [...prev, {
          id: `q-${q.id}`,
          sender: 'alma',
          text: q.question,
          options: q.options
        }];
      });
    }, 800);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText.trim();
    setInputText('');
    
    // Add user message to UI
    const newUserMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMsg
    };
    setMessages(prev => [...prev, newUserMsg]);
    
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory,
          userId: user?.uid
        })
      });

      const data = await response.json();
      
      if (data.text) {
        const almaMsg: Message = {
          id: `alma-${Date.now()}`,
          sender: 'alma',
          text: data.text
        };
        setMessages(prev => [...prev, almaMsg]);
        setChatHistory(prev => [
          ...prev, 
          { role: 'user', text: userMsg },
          { role: 'model', text: data.text }
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleComplete = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `bilan-wait`,
        sender: 'alma',
        text: t.preparing_bilan
      }]);
      
      const result = {
        title: "Verrouillage Systémique T8 (Inflammation) & T1",
        description: "Votre terrain exprime une saturation inflammatoire couplée à une fragilité de la barrière intestinale. Ce double verrouillage empêche une régulation fluide de votre énergie.",
        terrains: ["T8", "T1"],
        recommandation: "Bloom Complet"
      };

      setTimeout(() => {
        onSaveAssessment(result);
        setShowResults(true);
      }, 2500);
    }, 1500);
  };

  const handleOptionClick = (value: string, label: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: value }));
    
    const userMsg: Message = {
      id: `user-opt-${Date.now()}`,
      sender: 'user',
      text: label
    };
    setMessages(prev => [...prev, userMsg]);

    // Show validation briefly before next question
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `val-${Date.now()}`, 
        sender: 'alma', 
        text: QUESTIONS[currentQuestionIndex].validation || (lang === 'fr' ? "Merci pour votre réponse." : lang === 'en' ? "Thank you for your answer." : "Vielen Dank für Ihre Antwort.")
      }]);

      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        askQuestion(nextIndex);
      }, 1500);
    }, 600);
  };

  const getValidationText = (index: number) => {
    return QUESTIONS[index].validation || (lang === 'fr' ? "Merci pour votre réponse." : lang === 'en' ? "Thank you for your answer." : "Vielen Dank für Ihre Antwort.");
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-botanik-bg pb-20 animate-in fade-in duration-1000">
        <div className="bg-botanik-green text-white px-8 py-16 rounded-b-[48px] mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_70%)]" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="relative inline-block">
              <Sparkles className="w-16 h-16 text-botanik-orange mx-auto mb-6 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-botanik-orange/20 blur-2xl rounded-full -z-10"
              />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold mb-2 relative z-10">{t.diagnostic_title}</h2>
          <p className="text-white/60 font-medium tracking-widest uppercase text-[10px] relative z-10">{t.analysis_complete}</p>
        </div>

        <div className="px-6 space-y-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-[48px] border border-botanik-green/5 shadow-2xl relative overflow-hidden group hover:border-botanik-orange/20 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 p-8">
              <Sparkles className="w-8 h-8 text-botanik-orange/20" />
            </div>

            <div className="flex items-center gap-2 text-botanik-orange text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-botanik-orange animate-pulse" />
              {t.bilan_dominant}
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-botanik-green mb-8 leading-[1.1] font-serif">
              {t.verrouillage_title} <br />
              <span className="text-botanik-orange">{t.verrouillage_subtitle}</span>
            </h3>
            
            <div className="space-y-6 text-botanik-green/70 leading-relaxed text-base mb-10">
              <p>{t.bilan_desc}</p>
              <div className="bg-[#FFF8F0] p-6 rounded-2xl border border-botanik-orange/10">
                <p className="italic font-serif text-botanik-green text-lg text-center">{t.quote}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="p-6 bg-botanik-green/[0.03] rounded-3xl border border-botanik-green/5 hover:bg-botanik-green/[0.05] transition-colors">
                <p className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest mb-2">{t.priority_axe_1}</p>
                <p className="text-botanik-green font-bold">{t.axe_1_desc}</p>
              </div>
              <div className="p-6 bg-botanik-green/[0.03] rounded-3xl border border-botanik-green/5 hover:bg-botanik-green/[0.05] transition-colors">
                <p className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest mb-2">{t.priority_axe_2}</p>
                <p className="text-botanik-green font-bold">{t.axe_2_desc}</p>
              </div>
            </div>

            <div className="p-8 bg-botanik-green text-white rounded-[32px] flex flex-col md:flex-row items-center gap-8 border border-white/10 shadow-2xl shadow-botanik-green/20">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <FlaskConical className="w-10 h-10 text-botanik-orange" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black text-botanik-orange uppercase tracking-[0.2em] mb-2">{t.solution_recommended}</p>
                <p className="text-xl font-bold mb-4">{t.solution_title}</p>
                <button 
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="bg-botanik-orange text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-botanik-orange/20 hover:bg-botanik-orange/90 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  {t.discover_reset}
                </button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-botanik-green/40 px-2">{t.resolution_paths}</h3>
            
            <div className="space-y-4">
               {[
                 { id: 'bloom-lab', name: t.offers.lab.name, desc: t.offers.lab.desc, color: 'border-botanik-green/10' },
                 { id: 'bloom-complet', name: t.offers.complet.name, desc: t.offers.complet.desc, color: 'border-botanik-orange ring-4 ring-botanik-orange/10', featured: true },
                 { id: 'essentiel', name: t.offers.essentiel.name, desc: t.offers.essentiel.desc, color: 'border-botanik-green/10' }
               ].map((offer) => (
                 <div 
                   key={offer.id}
                   className={`bg-white p-8 rounded-[32px] border transition-all ${offer.color} ${offer.featured ? 'scale-105 shadow-xl' : ''}`}
                 >
                   {offer.featured && (
                     <div className="bg-botanik-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                       {t.recommended_for_you}
                     </div>
                   )}
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="text-xl font-bold text-botanik-green">{offer.name}</h4>
                   </div>
                   <p className="text-sm text-botanik-green/60 mb-8 leading-relaxed">{offer.desc}</p>
                   <button 
                    onClick={() => {
                      if (offer.id === 'bloom-complet') {
                        onNavigate('product-detail', 'bloomlab');
                      } else if (offer.id === 'essentiel') {
                        onNavigate('phytotherapie-reset');
                      } else {
                        onNavigate('boutique');
                      }
                    }}
                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${offer.featured ? 'bg-botanik-orange text-white shadow-lg shadow-botanik-orange/20' : 'bg-botanik-green/5 text-botanik-green hover:bg-botanik-green/10'}`}
                   >
                     {offer.featured ? t.choose_bloom_complet : t.discover}
                   </button>
                 </div>
               ))}
            </div>
          </div>

          <button 
            onClick={() => {
              onResetAssessment();
              setMessages([{ id: 'initial', sender: 'alma', text: QUESTIONS[0].question }]);
              setCurrentQuestionIndex(0);
              setAnswers({});
              setShowResults(false);
              setTimeout(() => askQuestion(0), 1000);
            }}
            className="w-full py-8 text-botanik-green/30 font-bold text-xs uppercase tracking-widest hover:text-botanik-green/60 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3 h-3" />
            {t.redo_diagnostic}
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-botanik-bg">
      {/* Header */}
      <div className="bg-white border-b border-botanik-green/5 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
        <div className="w-10 h-10 bg-botanik-green rounded-xl flex items-center justify-center text-botanik-orange">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-botanik-green">ALMA</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-botanik-green/40 font-bold uppercase tracking-widest">{t.online}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-[800px] mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 px-6 py-8 md:py-16 space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-botanik-green/5 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-botanik-orange animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-botanik-green mb-2">{t.diagnostic_title}</h3>
                <p className="text-botanik-green/60 max-w-xs text-sm leading-relaxed">
                  {t.guided_session}
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`w-full max-w-[90%] space-y-6 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`p-6 md:p-10 rounded-[32px] md:rounded-[48px] text-xl md:text-2xl font-medium leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-botanik-green text-white rounded-tr-none' 
                        : 'bg-white text-botanik-green border border-botanik-green/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Options */}
                  {msg.options && msg.sender === 'alma' && (
                    <div className="grid grid-cols-1 gap-3 mt-8">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleOptionClick(opt.value, opt.label)}
                          className="w-full p-6 md:p-8 bg-white border border-botanik-green/10 rounded-2xl md:rounded-3xl text-left text-base md:text-lg font-bold text-botanik-green hover:border-botanik-orange hover:text-botanik-orange transition-all flex justify-between items-center group shadow-sm active:scale-95"
                        >
                          {opt.label}
                          <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-botanik-green/5 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-botanik-green/20 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-botanik-green/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-botanik-green/20 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input & Info Area */}
        <div className="p-6 md:p-8 bg-white border-t border-botanik-green/5 sticky bottom-0 z-30 lg:bottom-0">
          <div className="w-full h-1 bg-botanik-green/5 rounded-full mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-botanik-orange"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <form onSubmit={handleSendMessage} className="flex gap-4 relative">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'fr' ? "Posez votre question à ALMA..." : "Ask ALMA a question..."}
              className="flex-1 bg-botanik-bg border border-botanik-green/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-botanik-orange transition-all text-botanik-green placeholder:text-botanik-green/30"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-botanik-green text-white p-4 rounded-2xl hover:bg-botanik-orange transition-all disabled:opacity-50 disabled:hover:bg-botanik-green shadow-lg shadow-botanik-green/10"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
          
          <p className="mt-4 text-[10px] text-center text-botanik-green/20 uppercase font-bold tracking-[0.2em]">
            {t.question} {currentQuestionIndex + 1} / {QUESTIONS.length} • {t.guided_session}
          </p>
        </div>
      </div>
    </div>
  );
}
