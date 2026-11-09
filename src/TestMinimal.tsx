import React from 'react';

export default function TestMinimal() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', background: '#3E4A3D', color: '#FAF7F2', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', background: '#1A3329', border: '1px solid #C5A059', borderRadius: '16px', padding: '2rem' }}>
        <h1 style={{ color: '#C5A059', margin: '0 0 1rem 0' }}>🌿 Test minimal fonctionnel</h1>
        <p style={{ color: '#FAF7F2', fontSize: '1.1rem' }}>Si vous voyez ce texte, l'environnement React fonctionne parfaitement.</p>
        <p style={{ color: '#E8DCC4', opacity: 0.7, fontSize: '0.875rem' }}>Horodatage : {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
