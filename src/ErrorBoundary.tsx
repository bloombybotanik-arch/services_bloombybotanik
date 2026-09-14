import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Bloom by BotaniK - ErrorBoundary captured:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1B3B2B] text-[#F3F4F1] flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-[#142D21] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl text-center">
            {/* Logo / Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-emerald-300 mb-6 border border-white/15">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Une interruption momentanée est survenue
            </h1>

            <p className="text-sm md:text-base text-white/70 mb-8 leading-relaxed">
              L'affichage a été temporairement suspendu suite à un événement imprévu. Vous pouvez relancer la session ou revenir à l'accueil en toute sécurité.
            </p>

            {/* Emergency Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-6 py-3 bg-[#E08A5E] hover:bg-[#c9754b] text-white font-medium text-sm rounded-xl transition shadow-md"
              >
                Recharger la page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl transition border border-white/15"
              >
                Retour à l'accueil
              </button>
            </div>

            {/* Quick Navigation fallback */}
            <div className="pt-6 border-t border-white/10 text-xs text-white/60">
              <span className="block mb-3 font-semibold uppercase tracking-wider text-white/40">Navigation d'urgence :</span>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/bloomlab" className="hover:text-white underline underline-offset-4">L'Extracteur BloomLab®</a>
                <a href="/boutique/" className="hover:text-white underline underline-offset-4">La Boutique</a>
                <a href="/herbier/" className="hover:text-white underline underline-offset-4">L'Herbier</a>
                <a href="/manifeste/" className="hover:text-white underline underline-offset-4">Le Manifeste</a>
              </div>
            </div>

            {/* Optional Collapsible Technical Detail */}
            {this.state.error && (
              <details className="mt-8 text-left bg-black/30 rounded-lg p-3 text-[11px] font-mono text-white/50">
                <summary className="cursor-pointer text-white/60 hover:text-white">Détails techniques (rapport de crash)</summary>
                <div className="mt-2 overflow-x-auto text-red-300">
                  {this.state.error.toString()}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
