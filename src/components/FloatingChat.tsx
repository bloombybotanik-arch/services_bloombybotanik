import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { translations, Language } from '../translations';

interface Message {
  id: string;
  text: string;
  sender: 'alma' | 'user';
}

export const FloatingChat = ({ user, lang }: { user?: FirebaseUser | null, lang: Language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (messages.length === 0) {
        // Initial greeting
        const greeting = lang === 'fr' 
          ? "Bonjour ! Je suis ALMA. Comment puis-je vous aider aujourd'hui ?" 
          : lang === 'en' 
          ? "Hello! I am ALMA. How can I help you today?" 
          : "Hallo! Ich bin ALMA. Wie kann ich Ihnen heute helfen?";
        setMessages([{ id: 'welcome', text: greeting, sender: 'alma' }]);
      }
    }
  }, [isOpen, messages.length]);

  const [lastMessage, setLastMessage] = useState<string>('');

  const handleSendMessage = async (e?: React.FormEvent, retryText?: string) => {
    if (e) e.preventDefault();
    const textToSubmit = retryText || inputText.trim();
    if (!textToSubmit || isTyping) return;

    if (!retryText) {
      setLastMessage(textToSubmit);
      setInputText('');
    }
    setError(null);
    
    if (!retryText) {
      const newUserMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: textToSubmit
      };
      setMessages(prev => [...prev, newUserMsg]);
    }
    setIsTyping(true);
    setTimeout(scrollToBottom, 50);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSubmit,
          history: chatHistory,
          userId: user?.uid,
          anonymousSessionId: sessionId,
          language: lang,
          pageUrl: window.location.href
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
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
          { role: 'user', text: textToSubmit },
          { role: 'model', text: data.text }
        ]);
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      console.error("Chat error:", error);
      setError(lang === 'fr' ? "Alma n'a pas pu répondre. Réessayez ?" : "Alma couldn't answer. Try again?");
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-botanik-green/10"
          >
            {/* Header */}
            <div className="bg-botanik-green p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-botanik-orange" />
                </div>
                <div>
                  <h3 className="font-bold">ALMA</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Assistant Bloom</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-botanik-bg">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'alma' ? 'bg-botanik-green/5 text-botanik-green' : 'bg-botanik-orange/10 text-botanik-orange'
                  }`}>
                    {msg.sender === 'alma' ? <Sparkles className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'alma' 
                      ? 'bg-white text-botanik-green shadow-sm border border-botanik-green/5' 
                      : 'bg-botanik-green text-white shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-botanik-green/40 text-xs italic ml-11">
                  <span className="w-1.5 h-1.5 bg-botanik-green/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-botanik-green/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-botanik-green/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs flex flex-col gap-2 items-center border border-red-100">
                  <p>{error}</p>
                  <button 
                    onClick={() => handleSendMessage(undefined, lastMessage)}
                    className="text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {lang === 'fr' ? 'Réessayer' : 'Retry'}
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-botanik-green/5 flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang === 'fr' ? "Écrivez ici..." : "Write here..."}
                className="flex-1 bg-botanik-bg border border-botanik-green/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-botanik-orange transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-botanik-green text-white p-3 rounded-xl hover:bg-botanik-orange transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-botanik-green text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-botanik-orange transition-all relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute bottom-full mb-4 right-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-full lg:mr-4 bg-botanik-green text-white px-4 py-2 rounded-xl text-xs lg:text-sm font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl transform translate-y-2 group-hover:translate-y-0 lg:group-hover:-translate-y-1/2">
            {lang === 'fr' ? "Besoin d'aide ?" : "Need help?"}
          </span>
        )}
      </motion.button>
    </div>
  );
};
