import React from 'react';
import { ArrowLeft, Shield, Scale, FileText } from 'lucide-react';
import { translations, Language } from './translations';

interface LegalPagesProps {
  type: 'cgv' | 'cgu' | 'privacy' | 'mentions';
  onBack: () => void;
  lang?: Language;
}

export default function LegalPages({ type, onBack, lang = 'fr' }: LegalPagesProps) {
  const t = translations[lang].legal;
  const pageData = t[type];
  
  const getIcon = () => {
    switch (type) {
      case 'cgv': return Scale;
      case 'privacy': return Shield;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-[#1B3022]/60 hover:text-[#F97316] mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5" /> {t.back}
      </button>

      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-[#1B3022]/5 rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#1B3022]" />
        </div>
        <h1 className="text-4xl font-bold text-[#1B3022]">{pageData.title}</h1>
      </div>

      <div className="prose prose-botanik max-w-none prose-headings:text-[#1B3022] prose-p:text-[#1B3022]/70">
        <section className="mb-12">
          {type !== 'mentions' ? (
            <>
              <p className="text-xl leading-relaxed mb-8">{(pageData as any).intro}</p>
              {(pageData as any).sections.map((section: any, idx: number) => (
                <div key={idx} className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="mb-6 whitespace-pre-line">{section.text}</p>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">{(pageData as any).publisher.title}</h3>
                <p className="mb-6 whitespace-pre-line">{(pageData as any).publisher.text}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{(pageData as any).director.title}</h3>
                <p className="mb-6 whitespace-pre-line">{(pageData as any).director.text}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{(pageData as any).hosting.title}</h3>
                <p className="mb-6 whitespace-pre-line">{(pageData as any).hosting.text}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{(pageData as any).contact.title}</h3>
                <p className="mb-6 whitespace-pre-line">{(pageData as any).contact.text}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
