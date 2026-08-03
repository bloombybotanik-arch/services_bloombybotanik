import React, { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon, Sparkles, ArrowLeft, FlaskConical, ChevronRight, Star, RotateCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { wrapTitle } from './lib/textUtils';

interface Message {
  id: string;
  text: string;
  sender: 'alma' | 'user';
  options?: { label: string; value: string }[];
}

const QUESTIONS = [
  {
    id: 1,
    question: "Bonjour, je suis ALMA. 'Votre corps n'est pas cassé. Il est verrouillé.' Pour commencer notre exploration, quel est votre niveau de vitalité globale aujourd'hui ?",
    options: [
      { label: "Pleine d'énergie", value: "high" },
      { label: "Fatiguée mais stable", value: "medium" },
      { label: "Épuisement chronique", value: "low" },
      { label: "Énergie en dents de scie", value: "unstable" }
    ]
  },
  {
    id: 2,
    question: "Je comprends. Votre vitalité est le reflet de vos ressources profondes. Concernant votre digestion, ressentez-vous des ballonnements ou des inconforts après les repas ?",
    options: [
      { label: "Quasiment à chaque repas", value: "often" },
      { label: "De temps en temps", value: "sometimes" },
      { label: "Jamais, digestion fluide", value: "never" }
    ]
  },
  {
    id: 3,
    question: "C'est noté. La barrière intestinale est la porte d'entrée du terrain. Au niveau du foie, avez-vous des réveils fréquents entre 1h et 3h du matin ?",
    options: [
      { label: "Oui, très souvent", value: "yes" },
      { label: "Rarement", value: "rarely" },
      { label: "Non, je dors d'une traite", value: "no" }
    ]
  },
  {
    id: 4,
    question: "Le foie est le grand chef d'orchestre de la détoxication. Côté immunité, vous sentez-vous vulnérable au moindre virus qui circule ?",
    options: [
      { label: "Oui, je tombe souvent malade", value: "weak" },
      { label: "1 ou 2 épisodes par an", value: "normal" },
      { label: "Très rarement malade", value: "strong" }
    ]
  },
  {
    id: 5,
    question: "Une immunité réactive est un signe de force vitale. Sur le plan émotionnel, comment gérez-vous le stress actuellement ?",
    options: [
      { label: "Je me sens souvent dépassée", value: "overwhelmed" },
      { label: "Je stresse mais je tiens le coup", value: "coping" },
      { label: "Je me sens calme et ancrée", value: "calm" }
    ]
  },
  {
    id: 6,
    question: "L'équilibre nerveux est le pilier du reset. Ressentez-vous des douleurs inflammatoires (articulations, muscles, tendons) ?",
    options: [
      { label: "Douleurs chroniques", value: "chronic" },
      { label: "Douleurs passagères", value: "transient" },
      { label: "Aucune douleur", value: "none" }
    ]
  },
  {
    id: 7,
    question: "L'inflammation est souvent un signal de surcharge. Côté circulation, avez-vous les jambes lourdes ou les extrémités froides ?",
    options: [
      { label: "Oui, c'est fréquent", value: "yes" },
      { label: "Seulement en fin de journée", value: "evening" },
      { label: "Non, pas du tout", value: "no" }
    ]
  },
  {
    id: 8,
    question: "La fluidité du sang assure l'apport en nutriments. Votre peau présente-t-elle des signes d'inconfort (boutons, sécheresse, rougeurs) ?",
    options: [
      { label: "Oui, c'est mon point sensible", value: "sensitive" },
      { label: "Quelques imperfections", value: "mild" },
      { label: "Peau saine et lumineuse", value: "clear" }
    ]
  },
  {
    id: 9,
    question: "La peau est le miroir de votre pharmacie intérieure. Votre respiration est-elle fluide ou vous sentez-vous souvent oppressée ?",
    options: [
      { label: "Respiration courte / Oppression", value: "short" },
      { label: "Parfois bloquée par le stress", value: "stress" },
      { label: "Fluide et profonde", value: "fluid" }
    ]
  },
  {
    id: 10,
    question: "Le souffle libère les toxines volatiles. Vos reins vous semblent-ils sollicités (cernes, rétention, maux de dos) ?",
    options: [
      { label: "Oui, je le sens physiquement", value: "yes" },
      { label: "Peut-être un peu", value: "maybe" },
      { label: "Non, tout va bien", value: "no" }
    ]
  },
  {
    id: 11,
    question: "Les reins filtrent votre histoire liquide. Votre concentration est-elle altérée par un brouillard mental ?",
    options: [
      { label: "Oui, j'ai du mal à réfléchir", value: "foggy" },
      { label: "Par intermittence", value: "sometimes" },
      { label: "Esprit vif et clair", value: "clear" }
    ]
  },
  {
    id: 12,
    question: "La clarté mentale dépend de la pureté du terrain. Ressentez-vous des déséquilibres hormonaux (cycle, libido, humeur) ?",
    options: [
      { label: "Déséquilibre marqué", value: "marked" },
      { label: "Légères variations", value: "mild" },
      { label: "Équilibre stable", value: "stable" }
    ]
  },
  {
    id: 13,
    question: "Les hormones sont les messagers de votre équilibre. Votre métabolisme réagit-il fortement au sucre ou au sel ?",
    options: [
      { label: "Envies irrésistibles", value: "cravings" },
      { label: "Besoin de grignoter", value: "snacking" },
      { label: "Appétit régulé", value: "regulated" }
    ]
  },
  {
    id: 14,
    question: "La régulation du sucre est la clé de l'énergie constante. Vos articulations manquent-elles de souplesse ?",
    options: [
      { label: "Raideurs matinales", value: "stiff" },
      { label: "Manque de souplesse global", value: "limited" },
      { label: "Grande liberté de mouvement", value: "free" }
    ]
  },
  {
    id: 15,
    question: "Enfin, vos cheveux et ongles sont-ils fragiles ou cassants ?",
    options: [
      { label: "Chute de cheveux / Ongles mous", value: "fragile" },
      { label: "Assez ternes", value: "dull" },
      { label: "Forts et brillants", value: "healthy" }
    ]
  }
];

export default function ChatContent({ 
  isPremium, 
  onNavigate, 
  user, 
  onRequireAuth, 
  onSaveAssessment,
  savedAssessment,
  onResetAssessment
}: { 
  isPremium: boolean, 
  onNavigate: (v: any, productId?: string, type?: any) => void,
  user?: FirebaseUser | null,
  onRequireAuth: () => void,
  onSaveAssessment: (results: any) => void,
  savedAssessment?: any,
  onResetAssessment: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (savedAssessment) {
      setShowResults(true);
    } else {
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
    if (index >= QUESTIONS.length) {
      if (!user) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([{
            id: `auth-req`,
            sender: 'alma',
            text: "Votre terrain est cartographié. Pour finaliser votre bilan et enregistrer votre profil dans votre espace personnel, merci de vous connecter ou de créer votre compte."
          }]);
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
      setMessages([{
        id: `q-${q.id}`,
        sender: 'alma',
        text: q.question,
        options: q.options
      }]);
    }, 800);
  };

  const handleComplete = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: `bilan-wait`,
        sender: 'alma',
        text: "Merci pour toutes ces précisions. Votre terrain est désormais cartographié. Je prépare votre bilan systémique... Cela ne prendra qu'un instant."
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
    
    // Show validation briefly before next question
    setIsTyping(true);
    setMessages([{ 
      id: `val-${Date.now()}`, 
      sender: 'alma', 
      text: getValidationText(currentQuestionIndex) 
    }]);

    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      askQuestion(nextIndex);
    }, 2000);
  };

  const getValidationText = (index: number) => {
    const validations = [
      "Merci pour cette précision. Votre vitalité globale est le point de départ de notre reset.",
      "C'est noté. L'intestin est souvent le premier verrou à libérer.",
      "Le foie est en effet le grand chef d'orchestre de votre homéostasie.",
      "Une immunité stable est le signe d'un terrain qui sait se défendre.",
      "L'équilibre émotionnel est indispensable pour que le corps s'autorise à lâcher prise.",
      "Ces signaux inflammatoires indiquent une saturation de certains émonctoires.",
      "La circulation est le fleuve qui nourrit et nettoie vos cellules.",
      "La peau exprime souvent ce que l'intérieur ne parvient plus à gérer.",
      "Le souffle est votre premier outil de régulation systémique.",
      "Les reins filtrent et préservent l'équilibre minéral de votre terrain.",
      "Le brouillard mental est souvent le signe d'une surcharge métabolique.",
      "Vos hormones régulent la danse de votre équilibre intérieur.",
      "Le métabolisme est votre moteur énergétique principal.",
      "La souplesse du corps reflète souvent la souplesse du terrain.",
      "Merci. Ces derniers indices complètent votre cartographie systémique."
    ];
    return validations[index] || "Merci pour votre réponse, c'est très précieux.";
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
          <h2 className="text-3xl font-bold mb-2 relative z-10">Diagnostic ALMA</h2>
          <p className="text-white/60 font-medium tracking-widest uppercase text-[10px] relative z-10">Analyse de Terrain Terminée</p>
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
              Bilan Systémique Dominant
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-botanik-green mb-8 leading-[1.1] font-serif">
              Verrouillage Systémique <br />
              <span className="text-botanik-orange">T8 (Inflammation) & T1</span>
            </h3>
            
            <div className="space-y-6 text-botanik-green/70 leading-relaxed text-base mb-10">
              <p>Votre terrain exprime une saturation inflammatoire couplée à une fragilité de la barrière intestinale. Ce double verrouillage empêche une régulation fluide de votre énergie.</p>
              <div className="bg-[#FFF8F0] p-6 rounded-2xl border border-botanik-orange/10">
                <p className="italic font-serif text-botanik-green text-lg text-center">"Votre corps n'est pas cassé. Il est verrouillé."</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="p-6 bg-botanik-green/[0.03] rounded-3xl border border-botanik-green/5 hover:bg-botanik-green/[0.05] transition-colors">
                <p className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest mb-2">Axe Prioritaire 1</p>
                <p className="text-botanik-green font-bold">Apaisement T8</p>
              </div>
              <div className="p-6 bg-botanik-green/[0.03] rounded-3xl border border-botanik-green/5 hover:bg-botanik-green/[0.05] transition-colors">
                <p className="text-[10px] font-bold text-botanik-green/40 uppercase tracking-widest mb-2">Axe Prioritaire 2</p>
                <p className="text-botanik-green font-bold">Perméabilité T1</p>
              </div>
            </div>

            <div className="p-8 bg-botanik-green text-white rounded-[32px] flex flex-col md:flex-row items-center gap-8 border border-white/10 shadow-2xl shadow-botanik-green/20">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <FlaskConical className="w-10 h-10 text-botanik-orange" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black text-botanik-orange uppercase tracking-[0.2em] mb-2">Solution Recommandée</p>
                <p className="text-xl font-bold mb-4">Le Reset Homéostatique Bloom</p>
                <button 
                  onClick={() => onNavigate('phytotherapie-reset')}
                  className="bg-botanik-orange text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-botanik-orange/20 hover:bg-botanik-orange/90 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Découvrir le Reset Homéostatique
                </button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-botanik-green/40 px-2">Chemins de Résolution</h3>
            
            <div className="space-y-4">
               {[
                 { id: 'bloom-lab', name: 'Bloom Lab', price: '289€', desc: "L'autonomie totale. Idéal pour les profils explorateurs souhaitant maîtriser leurs extractions.", color: 'border-botanik-green/10' },
                 { id: 'bloom-complet', name: 'Bloom Complet', price: '59€/mois', desc: "La Voie Royale. Le protocole complet, guidé et sans équipement. Le choix de la simplicité.", color: 'border-botanik-orange ring-4 ring-botanik-orange/10', featured: true },
                 { id: 'essentiel', name: 'Essentiel', price: '29€/mois', desc: "Une approche douce pour initier les premiers changements de terrain.", color: 'border-botanik-green/10' }
               ].map((offer) => (
                 <div 
                   key={offer.id}
                   className={`bg-white p-8 rounded-[32px] border transition-all ${offer.color} ${offer.featured ? 'scale-105 shadow-xl' : ''}`}
                 >
                   {offer.featured && (
                     <div className="bg-botanik-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                       Recommandé pour vous
                     </div>
                   )}
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="text-xl font-bold text-botanik-green">{offer.name}</h4>
                     <span className="text-lg font-bold text-botanik-green">{offer.price}</span>
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
                     {offer.featured ? 'Choisir Bloom Complet' : 'Découvrir'}
                   </button>
                 </div>
               ))}
            </div>
          </div>

          <button 
            onClick={() => {
              onResetAssessment();
              setMessages([{ id: 'initial', sender: 'alma', text: "Bienvenue dans votre espace d'accompagnement Bloom. Je suis ALMA, votre guide vers l'équilibre systémique. 'Votre corps n'est pas cassé. Il est verrouillé.'" }]);
              setCurrentQuestionIndex(0);
              setAnswers({});
              setShowResults(false);
              setTimeout(() => askQuestion(0), 1000);
            }}
            className="w-full py-8 text-botanik-green/30 font-bold text-xs uppercase tracking-widest hover:text-botanik-green/60 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3 h-3" />
            Refaire le diagnostic
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-[100vh] bg-botanik-bg">
      {/* Header */}
      <div className="bg-white border-b border-botanik-green/5 px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-botanik-green rounded-xl flex items-center justify-center text-botanik-orange">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-botanik-green">ALMA</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-botanik-green/40 font-bold uppercase tracking-widest">En ligne</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-[800px] mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:py-16 space-y-6 no-scrollbar">
          <AnimatePresence mode="wait">
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

        {/* Info Area */}
        <div className="p-8 mt-auto">
          <div className="w-full h-1 bg-botanik-green/5 rounded-full mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-botanik-orange"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-[10px] text-center text-botanik-green/20 uppercase font-bold tracking-[0.2em]">
            Question {currentQuestionIndex + 1} / {QUESTIONS.length} • Session guidée par ALMA
          </p>
        </div>
      </div>
    </div>
  );
}
