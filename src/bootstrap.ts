// Bootstrap module externe — Ne charge statiquement AUCUNE dépendance lourde

console.log('[BOOTSTRAP] Bootstrap module démarré');

const badge = document.getElementById('bloom-boot-badge');
if (badge) {
  badge.textContent = '⚡ Bootstrap module exécuté — chargement applicatif…';
}

// Fonction de mesure et de diagnostic réseau same-origin
async function runResourceCheck() {
  const paths = [
    '/early-diag.js',
    '/src/bootstrap.ts',
    '/@vite/client',
    '/node_modules/vite/dist/client/env.mjs',
    '/src/main.tsx',
    '/src/App.tsx',
    '/src/index.css'
  ];

  const results: {
    path: string;
    status: number | string;
    redirected?: boolean;
    url?: string;
    type?: string;
    snippet?: string;
    error?: string;
  }[] = [];

  for (const p of paths) {
    try {
      const res = await fetch(p, {
        credentials: 'same-origin',
        cache: 'no-store'
      });
      const text = await res.text();
      let cleanUrl = res.url;
      try {
        const u = new URL(res.url);
        u.searchParams.delete('token');
        u.searchParams.delete('__aistudio_auth_token');
        cleanUrl = u.pathname;
      } catch (_) {}

      results.push({
        path: p,
        status: res.status,
        redirected: res.redirected,
        url: cleanUrl,
        type: res.headers.get('content-type') || '',
        snippet: text.slice(0, 35).replace(/[\r\n\t]+/g, ' ')
      });
    } catch (err: any) {
      results.push({
        path: p,
        status: 'FETCH_ERR',
        error: err?.message || String(err)
      });
    }
  }

  // Afficher les résultats dans le panneau de diagnostic
  const reportFn = (window as any).__reportEarlyDiag;
  if (typeof reportFn === 'function') {
    const tableText = results
      .map((r) => {
        if (r.error) return `${r.path} ➔ ERREUR: ${r.error}`;
        return `${r.path} ➔ Statut: ${r.status} | Type: ${r.type} | Redir: ${r.redirected} | Début: "${r.snippet}..."`;
      })
      .join('\n');
    reportFn('Vérification Ressources (fetch same-origin)', 'Résultat des contrôles de livraison :', tableText, {});
  }
}

// Ajout du bouton « Vérifier les ressources » sur le badge ou panneau
function attachVerifyButton() {
  let btnContainer = document.getElementById('bloom-verify-btn-container');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.id = 'bloom-verify-btn-container';
    btnContainer.style.cssText = 'position:fixed;top:38px;left:8px;z-index:999999;';
    const btn = document.createElement('button');
    btn.textContent = '🔍 Vérifier les ressources';
    btn.style.cssText = 'background:#1A3329;color:#C5A059;border:1px solid #C5A059;border-radius:4px;padding:3px 8px;font-family:monospace;font-size:10px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.5);';
    btn.onclick = () => {
      btn.textContent = '⏳ Vérification en cours…';
      runResourceCheck().finally(() => {
        btn.textContent = '🔍 Vérifier les ressources';
      });
    };
    btnContainer.appendChild(btn);
    document.body ? document.body.appendChild(btnContainer) : window.addEventListener('DOMContentLoaded', () => document.body.appendChild(btnContainer!));
  }
}

attachVerifyButton();

// Chargement dynamique sécurisé du point d'entrée applicatif (src/main.tsx)
import('./main')
  .then(() => {
    console.log('[BOOTSTRAP] ./main chargé avec succès');
  })
  .catch((err: any) => {
    console.error('[BOOTSTRAP CRASH] Échec du chargement dynamique de ./main:', err);
    if (badge) {
      badge.textContent = '❌ Échec import ./main — voir diagnostic';
      badge.style.borderColor = '#ff8080';
      badge.style.color = '#ff8080';
    }
    const reportFn = (window as any).__reportEarlyDiag;
    if (typeof reportFn === 'function') {
      reportFn(
        'Bootstrap Import',
        'Échec lors de import("./main"): ' + (err?.message || String(err)),
        err?.stack || '',
        { src: '/src/main.tsx' }
      );
    }
    // Lancer automatiquement la vérification des ressources pour diagnostic immédiat
    runResourceCheck();
  });
