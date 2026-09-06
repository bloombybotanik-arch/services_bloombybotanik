import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          background: '#fff0f0',
          color: '#d00',
          fontFamily: 'monospace',
          minHeight: '100vh',
          overflow: 'auto'
        }}>
          <h1 style={{ borderBottom: '2px solid #d00', paddingBottom: '10px' }}>
            🚨 Application Crash Detected
          </h1>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Message:</strong> {this.state.error?.message}</p>
            <p><strong>Stack Trace:</strong></p>
            <pre style={{ 
              background: '#333', 
              color: '#fff', 
              padding: '15px', 
              borderRadius: '5px',
              whiteSpace: 'pre-wrap',
              fontSize: '12px'
            }}>
              {this.state.error?.stack}
            </pre>
          </div>
          {this.state.errorInfo && (
            <div style={{ marginTop: '20px' }}>
              <p><strong>Component Stack:</strong></p>
              <pre style={{ 
                background: '#444', 
                color: '#ddd', 
                padding: '15px', 
                borderRadius: '5px',
                whiteSpace: 'pre-wrap',
                fontSize: '12px'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#d00',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Tenter de recharger
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
