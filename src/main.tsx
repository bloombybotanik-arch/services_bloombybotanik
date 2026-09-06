import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) { 
    super(props); 
    this.state = { hasError: false, error: null }; 
  }
  
  static getDerivedStateFromError(error: Error) { 
    return { hasError: true, error }; 
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔥 Error caught by root boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:'20px', color:'white', background:'darkred', fontFamily:'sans-serif', minHeight: '100vh'}}>
          <h2>🔥 ERREUR D'AFFICHAGE DANS APP.TSX</h2>
          <p>Le composant App a craché au moment de s'afficher :</p>
          <pre style={{background:'black', padding:'10px', whiteSpace:'pre-wrap', borderRadius: '4px'}}>
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
