import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, Sparkles, ShieldCheck, Thermometer, FlaskConical, Package, ArrowRight, MessageCircle } from 'lucide-react';
import { translations, Language } from './translations';

interface FaqContentProps {
  onNavigate: (view: any, id?: string) => void;
  lang?: string;
}

interface FaqItem {
  id: string;
  category: 'machine' | 'extraction' | 'usages' | 'commandes';
  q: string;
  a: string;
}

export default function FaqContent({ onNavigate, lang = 'fr' }: FaqContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'q1': true });

  const isFR = lang === 'fr';
  const isDE = lang === 'de';

  const categories = [
    { id: 'all', label: isFR ? 'Toutes les questions' : isDE ? 'Alle Fragen' : 'All questions' },
    { id: 'machine', label: isFR ? 'L\'Extracteur BloomLab®' : isDE ? 'Der BloomLab® Extraktor' : 'BloomLab® Extractor' },
    { id: 'extraction', label: isFR ? 'Extraction & Totum Végétal' : isDE ? 'Extraktion & Totum' : 'Extraction & Totum' },
    { id: 'usages', label: isFR ? 'Usages : Soins, Cuisine & Santé' : isDE ? 'Anwendungen: Pflege, Küche & Gesundheit' : 'Uses: Skincare, Culinary & Health' },
    { id: 'commandes', label: isFR ? 'Garantie, Livraison & Service' : isDE ? 'Garantie, Versand & Service' : 'Warranty, Shipping & Service' },
  ];

  const faqList: FaqItem[] = useMemo(() => [
    {
      id: 'q1',
      category: 'machine',
      q: isFR 
        ? "Faut-il des compétences particulières en herboristerie pour utiliser BloomLab® ?" 
        : isDE 
        ? "Benötigt man besondere Kenntnisse in Kräuterkunde für den BloomLab®?" 
        : "Do you need special herbalism skills to use BloomLab®?",
      a: isFR 
        ? "Absolument pas. BloomLab® a été conçu pour guider chaque étape avec une ergonomie intuitive. Nos protocoles documentés et notre bibliothèque de recettes indiquent précisément la température, le solvant adapté (eau, huile végétale, glycérine ou solvant hydroalcoolique) et la durée optimale pour chaque plante." 
        : isDE 
        ? "Absolut nicht. BloomLab® führt Sie Schritt für Schritt durch jedes Protokoll mit exakten Temperatur- und Lösungsmittelangaben." 
        : "Not at all. BloomLab® is designed to guide each step with precision recipes indicating temperature, solvent, and duration."
    },
    {
      id: 'q2',
      category: 'machine',
      q: isFR 
        ? "Pourquoi une précision thermique à ±0,5°C est-elle indispensable ?" 
        : isDE 
        ? "Warum ist eine Temperaturgenauigkeit von ±0,5°C unverzichtbar?" 
        : "Why is ±0.5°C thermal precision indispensable?",
      a: isFR 
        ? "Les principes actifs végétaux (flavonoïdes, terpènes, polyphénols) sont thermolabiles : au-delà de 75°C à 85°C selon les espèces végétales, ils se dénaturent et perdent leur vitalité. Une régulation millimétrique protège l'intégrité moléculaire du Totum sans brûler les principes précieux." 
        : isDE 
        ? "Pflanzliche Wirkstoffe sind hitzeempfindlich. Eine exakte thermische Kontrolle schützt das Totum vor Hitzeschäden." 
        : "Botanical active ingredients are thermosensitive. Millimetric thermal control protects molecular integrity without overheating."
    },
    {
      id: 'q3',
      category: 'machine',
      q: isFR 
        ? "Comment se déroule le nettoyage et l'entretien de l'appareil ?" 
        : isDE 
        ? "Wie wird das Gerät gereinigt und gepflegt?" 
        : "How do you clean and maintain the appliance?",
      a: isFR 
        ? "La cuve en acier Inoxydable 304 certifié contact alimentaire et le panier filtrant micro-perforé se nettoient en moins de deux minutes à l'eau tiède avec un savon doux naturel. Un cycle d'auto-nettoyage rapide à l'eau chaude permet également un rinçage impeccable entre deux préparations botaniques." 
        : isDE 
        ? "Der Edelstahlbehälter und der Filterkorb lassen sich in weniger als zwei Minuten mit warmem Wasser und Seife reinigen." 
        : "The food-grade 304 stainless steel chamber and filter basket clean in under two minutes with warm water and mild soap."
    },
    {
      id: 'q4',
      category: 'extraction',
      q: isFR 
        ? "Quelle est la différence entre une tisane classique, un bain-marie et BloomLab® ?" 
        : isDE 
        ? "Was ist der Unterschied zwischen einem Tee, einem Wasserbad und dem BloomLab®?" 
        : "What is the difference between classic herbal tea, a bain-marie, and BloomLab®?",
      a: isFR 
        ? "L'eau bouillante d'une tisane classique dégrade souvent les principes fragiles tout en laissant prisonniers les actifs liposolubles. Le bain-marie traditionnel souffre d'à-coups thermiques incontrôlés. BloomLab® régule en continu la température, la durée et l'agitation vortex pour libérer jusqu'à 98% du Totum végétal sans altération." 
        : isDE 
        ? "Herkömmliche Methoden verbrennen oder verpassen fettlösliche Wirkstoffe. BloomLab kontrolliert Temperatur und Agitation für maximale Ausbeute." 
        : "Boiling water degrades thermosensitive actives while traditional bain-marie suffers from uneven heat. BloomLab stabilizes continuous extraction to capture up to 98% of the Totum."
    },
    {
      id: 'q5',
      category: 'extraction',
      q: isFR 
        ? "Quels solvants peut-on employer dans la cuve d'extraction ?" 
        : isDE 
        ? "Welche Lösungsmittel können im Extraktionsbehälter verwendet werden?" 
        : "What solvents can be used in the extraction chamber?",
      a: isFR 
        ? "BloomLab® accepte l'ensemble des solvants nobles de l'herboristerie moderne : eau pure osmosée ou minérale, huiles végétales biologiques de première pression à froid (jojoba, sésame, olive, argan...), glycérine végétale, beurres végétaux, ainsi que les solutions hydroalcooliques douces." 
        : isDE 
        ? "Wasser, Pflanzenöle (Jojoba, Sesam, Olive...), pflanzliches Glycerin und milde hydroalkoholische Lösungen." 
        : "Purified water, cold-pressed organic carrier oils (jojoba, sesame, olive, argan), vegetable glycerin, and mild hydroalcoholic solutions."
    },
    {
      id: 'q6',
      category: 'extraction',
      q: isFR 
        ? "Qu'appelle-t-on la méthode séquentielle A/B ?" 
        : isDE 
        ? "Was versteht man unter der sequenziellen A/B-Methode?" 
        : "What is the sequential A/B method?",
      a: isFR 
        ? "Certaines plantes nécessitent des températures ou des solvants distincts pour révéler toutes leurs vertus. La méthode séquentielle A/B permet d'extraire d'abord la fraction la plus sensible (fleurs tendres ou composés volatils du Sachet A à basse température), puis la fraction dense (racines, écorces ou résines du Sachet B à température supérieure), avant réunion synergique du Totum." 
        : isDE 
        ? "Trennung hitzeempfindlicher Blüten (Sachet A) von dichten Wurzeln (Sachet B) für eine optimale Extraktion." 
        : "Extracting delicate flowers at lower temperatures (Pouch A) followed by denser roots/barks (Pouch B) before synergistic reunion."
    },
    {
      id: 'q7',
      category: 'usages',
      q: isFR 
        ? "Quelles sont les trois dimensions d'usage au quotidien ?" 
        : isDE 
        ? "Was sind die drei täglichen Anwendungsdimensionen?" 
        : "What are the three daily usage dimensions?",
      a: isFR 
        ? "1. Culinaire : huiles infusées gastronomiques, vinaigres botaniques et beurres aromatiques d'exception. 2. Cosmétique : sérums visage purs, macérats régénérants sans conservateurs synthétiques. 3. Systémique : protocoles d'extraits concentrés pour soutenir le terrain biologique et la vitalité naturelle." 
        : isDE 
        ? "1. Kulinarik (Aromaöle, Kräuterbutter). 2. Kosmetik (Sera, reine Pflegeöle). 3. Systemik (Konzentrierte Extrakte zur Terrainunterstützung)." 
        : "1. Culinary (infused culinary oils, botanical butters). 2. Cosmetics (pure facial serums, regenerative macerates). 3. Systemic protocols."
    },
    {
      id: 'q8',
      category: 'usages',
      q: isFR 
        ? "Peut-on utiliser ses propres plantes du jardin ou de cueillette locale ?" 
        : isDE 
        ? "Kann man eigene Gartenkräuter oder gesammelte Wildkräuter verwenden?" 
        : "Can you use your own garden herbs or wild-foraged plants?",
      a: isFR 
        ? "Oui, tout à fait ! BloomLab® est un instrument d'autonomie et de souveraineté. Vous pouvez utiliser vos propres récoltes séchées avec soin, des plantes d'herboristerie biologique certifiée, ou nos kits pré-dosés grade Totum." 
        : isDE 
        ? "Ja, absolut. BloomLab unterstützt Ihre botanische Souveränität mit eigenen Pflanzen oder zertifizierten Kräutern." 
        : "Yes, absolutely! BloomLab® supports your botanical autonomy using your own harvests, organic herbs, or our Totum grade kits."
    },
    {
      id: 'q9',
      category: 'commandes',
      q: isFR 
        ? "Quels sont les délais d'expédition et de livraison ?" 
        : isDE 
        ? "Wie lange dauern Versand und Lieferung?" 
        : "What are the shipping and delivery times?",
      a: isFR 
        ? "Toutes les commandes sont expédiées sous 24 à 48 heures ouvrées depuis notre atelier logistique en France métropolitaine. La livraison est effectuée via Colissimo suivi à domicile ou en point relais Mondial Relay avec numéro de suivi en temps réel." 
        : isDE 
        ? "Versand innerhalb von 24-48 Stunden mit Sendungsverfolgung in ganz Europa." 
        : "Shipped within 24-48 business hours with tracked delivery across France and Europe."
    },
    {
      id: 'q10',
      category: 'commandes',
      q: isFR 
        ? "Quelle est la garantie de la machine BloomLab® ?" 
        : isDE 
        ? "Welche Garantie gilt für den BloomLab®?" 
        : "What is the warranty on BloomLab®?",
      a: isFR 
        ? "L'extracteur BloomLab® bénéficie d'une garantie constructeur de 1 an pièces et main d'œuvre. Nous disposons d'un service après-vente basé en France et tenons les pièces détachées à disposition pour assurer la longévité de votre appareil." 
        : isDE 
        ? "1 Jahr Herstellergarantie (Teile und Arbeitsleistung) mit Kundenservice in Frankreich." 
        : "1-year comprehensive manufacturer warranty (parts & labor) with customer support based in France."
    },
    {
      id: 'q11',
      category: 'commandes',
      q: isFR 
        ? "Proposez-vous le paiement en plusieurs fois ?" 
        : isDE 
        ? "Bieten Sie Ratenzahlung an?" 
        : "Do you offer split payments?",
      a: isFR 
        ? "Oui. Grâce à notre partenaire sécurisé Klarna, vous pouvez régler votre BloomLab® en 3 fois sans frais par carte bancaire lors du passage de votre commande." 
        : isDE 
        ? "Ja, 3 zinslose Raten mit Klarna sind im Checkout verfügbar." 
        : "Yes, 3-installment interest-free payment is available at checkout via Klarna."
    },
    {
      id: 'q12',
      category: 'commandes',
      q: isFR 
        ? "Existe-t-il une période d'essai 'Satisfait ou Remboursé' ?" 
        : isDE 
        ? "Gibt es eine 30-Tage-Geld-zurück-Garantie?" 
        : "Is there a 30-day money-back guarantee?",
      a: isFR 
        ? "Oui. Vous disposez de 30 jours à compter de la réception de votre machine pour tester la précision de vos extractions à domicile en toute sérénité." 
        : isDE 
        ? "Ja, Sie können das Gerät 30 Tage lang risikofrei zu Hause testen." 
        : "Yes, you have a 30-day trial period from delivery to test your machine in complete confidence."
    }
  ], [isFR, isDE]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return faqList.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchQuery = !searchQuery.trim() || 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [faqList, activeCategory, searchQuery]);

  return (
    <div className="animate-in fade-in duration-500 bg-[#F9F9F7] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 md:py-24 bg-[#0F261E] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C3F34] border border-[#D8CBB7]/30 text-[#D97706] text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>{isFR ? 'Support & Transmission' : 'Support & Knowledge'}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            {isFR ? 'Questions Fréquentes' : isDE ? 'Häufig Gestellte Fragen' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-base md:text-xl text-[#E8F1EE]/80 max-w-2xl mx-auto leading-relaxed mb-10">
            {isFR 
              ? "Toutes les réponses pour maîtriser l'extraction de précision, choisir vos solvants et libérer le Totum de vos plantes en toute sécurité."
              : isDE 
              ? "Alle Antworten zur Beherrschung der Präzisionsextraktion und der sicheren Freisetzung des Totums Ihrer Pflanzen."
              : "Everything you need to master precision extraction, choose noble solvents, and safely liberate the Totum of your herbs."}
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder={isFR ? "Rechercher une réponse (température, solvant, garantie...)" : "Search a question..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#0F261E] placeholder-white/50 focus:placeholder-slate-400 rounded-2xl border border-white/20 focus:border-[#D97706] focus:outline-hidden transition-all shadow-xl backdrop-blur-md text-base"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-12 md:py-20 max-w-5xl mx-auto px-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#1C3F34] text-white border border-[#1C3F34] shadow-md' 
                  : 'bg-white text-[#1C3F34] border border-[#D8CBB7] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D8CBB7]/40 p-8">
            <HelpCircle className="w-12 h-12 text-[#1C3F34]/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0F261E] mb-2">
              {isFR ? "Aucune réponse trouvée pour cette recherche" : "No answer found"}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {isFR 
                ? "Vous avez une question spécifique sur vos protocoles ou votre matériel ?" 
                : "Do you have a specific question about your machine or protocols?"}
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C3F34] text-white font-bold text-sm hover:bg-[#D97706] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isFR ? "Contacter notre équipe" : "Contact our team"}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#D8CBB7]/50 shadow-xs hover:border-[#1C3F34]/40 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-base md:text-lg text-[#0F261E] group-hover:text-[#D97706] transition-colors">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                      isOpen ? 'bg-[#1C3F34] text-white rotate-180' : 'bg-[#F9F9F7] text-[#1C3F34] group-hover:bg-[#E8F1EE]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-[#1C3F34]/80 text-sm md:text-base leading-relaxed border-t border-[#F3EEE6] animate-in fade-in duration-300">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Banner */}
        <div className="mt-16 bg-[#0F261E] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[#D97706] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{isFR ? "Besoin d'un accompagnement personnalisé ?" : "Need personal guidance?"}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {isFR ? "Une question précise sur votre protocole ?" : "A specific question about your protocol?"}
            </h3>
            <p className="text-sm text-[#E8F1EE]/80 max-w-xl">
              {isFR 
                ? "Nos experts en extraction botanique et notre support technique sont disponibles du lundi au vendredi de 9h à 18h."
                : "Our botanical extraction experts and technical support are available Monday to Friday from 9am to 6pm."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D97706] hover:bg-[#b86303] text-white font-bold text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isFR ? "Nous Contacter" : "Contact Us"}</span>
            </button>
            <button
              onClick={() => onNavigate('boutique')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              <span>{isFR ? "Voir la Boutique" : "Browse Store"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
