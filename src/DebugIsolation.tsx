import React, { Suspense, lazy, Component, ReactNode } from 'react';

class SectionBoundary extends Component<
  { name: string; children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error('[SECTION CRASH]', this.props.name, error); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ border: '2px solid #8b3a3a', background: '#2a0f0f', color: '#ffb4b4',
                      padding: '1rem', margin: '1rem', fontFamily: 'monospace' }}>
          <h2>❌ {this.props.name} : CRASH</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.message}
{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Fallback = ({ name }: { name: string }) => (
  <div style={{ padding: '1rem', margin: '1rem', background: '#eee', fontFamily: 'monospace' }}>
    ⏳ Chargement de {name}…
  </div>
);

const Ok = ({ name }: { name: string }) => (
  <div style={{ border: '2px solid #2d5016', background: '#e8f5e0', color: '#2d5016',
                padding: '1rem', margin: '1rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
    ✅ {name} : RENDU OK
  </div>
);

function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <SectionBoundary name={name}>
      <Suspense fallback={<Fallback name={name} />}>
        {children}
        <Ok name={name} />
      </Suspense>
    </SectionBoundary>
  );
}

const BloomLogoInner = lazy(() => import('./components/ui/BloomLogo'));
const NavigationSidebarLazy = lazy(() => import('./components/NavigationSidebar'));
const FooterLazy = lazy(() => import('./components/Footer'));
const IndexBisLazy = lazy(() => import('./IndexBisContent'));
const StoreLazy = lazy(() => import('./StoreContent'));

export default function DebugIsolation() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', padding: '1rem' }}>
      <h1 style={{ fontFamily: 'monospace', color: '#1B3022' }}>🔬 PAGE DE DIAGNOSTIC — 6 SUSPECTS</h1>

      <Section name="BloomLogo">
        <BloomLogoInner />
      </Section>

      <Section name="NavigationSidebar">
        <NavigationSidebarLazy currentView="indexbis" onNavigate={() => {}} lang="fr" setLang={() => {}} cartCount={0} user={null} onOpenAuth={() => {}} onOpenCalculator={() => {}} />
      </Section>

      <Section name="Footer">
        <FooterLazy onNavigate={() => {}} lang="fr" />
      </Section>

      <Section name="IndexBisContent">
        <IndexBisLazy onNavigate={() => {}} lang="fr" />
      </Section>

      <Section name="StoreContent">
        <StoreLazy currentView="boutique" onNavigate={() => {}} lang="fr" onAddToCart={() => {}} onNavigatePending={() => {}} onNavigateDetail={() => {}} />
      </Section>

      <Section name="Firebase (init module)">
        <FirebaseProbe />
      </Section>
    </div>
  );
}

function FirebaseProbe() {
  const [state, setState] = React.useState('init…');
  React.useEffect(() => {
    import('./lib/firebase')
      .then(m => setState('auth=' + (m.auth ? 'OK' : 'null') + ' db=' + (m.db ? 'OK' : 'null')))
      .catch(e => setState('ERREUR: ' + e.message));
  }, []);
  return <div style={{ fontFamily: 'monospace', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>Firebase : {state}</div>;
}
