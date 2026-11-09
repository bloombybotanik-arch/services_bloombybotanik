import React from 'react';
import IndexBisContent from './IndexBisContent';

console.log('🟠 [App] Rendu d\'IndexBisContent seul');

export default function App() {
  const navigateTo = (view: any, param?: string) => {
    console.log('🟠 [App] Navigation vers :', view, param);
  };

  const addToCart = (product: any) => {
    console.log('🟠 [App] Ajout au panier :', product);
  };

  return (
    <IndexBisContent
      onNavigate={navigateTo}
      onAddToCart={addToCart}
      lang="fr"
    />
  );
}
