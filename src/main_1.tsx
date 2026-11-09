import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log('[main.tsx] Module évalué avec succès');

function AppMountObserver({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('[REACT MOUNT SUCCESS] Composant React monté dans le DOM');
    const badge = document.getElementById('bloom-boot-badge');
    if (badge) {
      badge.textContent = '✅ React monté avec succès';
      badge.style.borderColor = '#4ade80';
      badge.style.color = '#4ade80';
      badge.style.background = 'rgba(62, 74, 61,0.95)';
    }
  }, []);

  return <>{children}</>;
}

function mount() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('[main.tsx] Conteneur #root introuvable dans le DOM');
    const badge = document.getElementById('bloom-boot-badge');
    if (badge) {
      badge.textContent = '❌ Conteneur #root introuvable';
      badge.style.borderColor = '#ff8080';
      badge.style.color = '#ff8080';
    }
    return;
  }

  // Vérifier si un nœud a déjà été monté pour éviter les montages multiples
  if (rootElement.getAttribute('data-react-mounted') === 'true') {
    console.warn('[main.tsx] Application déjà montée, montage ignoré');
    return;
  }
  rootElement.setAttribute('data-react-mounted', 'true');

  console.log('[main.tsx] Appel de ReactDOM.createRoot().render()');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppMountObserver>
          <App />
        </AppMountObserver>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
