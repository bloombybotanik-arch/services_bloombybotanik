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

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'monospace', background: '#FAF7F2', color: '#0F261E', minHeight: '100vh' }}>
          <h1 style={{ fontSize: 20 }}>Erreur d'affichage Bloom by Botanik</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #E7DFD3' }}>
            {this.state.error?.message}
          </pre>
          <p>Copiez ce message et envoyez-le à l'équipe technique.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
