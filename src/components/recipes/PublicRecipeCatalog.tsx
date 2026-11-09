import React from 'react';
import RecipesContent from '../../RecipesContent';
import { Language, translations } from '../../translations';

interface PublicRecipeCatalogProps {
  initialPath?: string;
  onNavigate?: (targetPath: string) => void;
  lang: Language;
}

export default function PublicRecipeCatalog({ initialPath, onNavigate, lang }: PublicRecipeCatalogProps) {
  const t = translations[lang] || translations.fr;

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('/');
    }
  };

  return (
    <RecipesContent
      onBack={handleBack}
      lang={lang}
      t={t}
    />
  );
}
