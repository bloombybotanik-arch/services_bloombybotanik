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

  const initialCategory = React.useMemo(() => {
    if (!initialPath) return 'All';
    if (initialPath.startsWith('/recettes/culinaires') || initialPath.startsWith('/recettes/gastronomie')) {
      return 'culinaire';
    }
    if (initialPath.startsWith('/recettes/cosmetiques')) {
      return 'cosmetique';
    }
    if (initialPath.startsWith('/recettes/parcours-botaniques')) {
      return 'parcours-guide';
    }
    return 'All';
  }, [initialPath]);

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
      initialCategory={initialCategory}
    />
  );
}
