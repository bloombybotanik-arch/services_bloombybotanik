import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

function getHttp(url: string): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode || 0, headers: res.headers, body });
      });
    }).on('error', reject);
  });
}

async function runIsolatedProductionBuildTest() {
  console.log('=== Test isolé du build de production (dist/server.js sur port 3333) ===');

  const ISOLATED_PORT = 3333;
  const BASE_URL = `http://127.0.0.1:${ISOLATED_PORT}`;

  // Récupérer le nom réel des assets compilés dans dist/assets
  const assetsFiles = fs.readdirSync(path.resolve(process.cwd(), 'dist/assets'));
  const jsFile = assetsFiles.find(f => f.endsWith('.js'));
  const cssFile = assetsFiles.find(f => f.endsWith('.css'));

  if (!jsFile || !cssFile) {
    throw new Error('Assets compilés manquants dans dist/assets');
  }

  // Démarrer dist/server.js dans un sous-processus isolé
  const child = spawn('node', ['dist/server.js', '--port', String(ISOLATED_PORT)], {
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(ISOLATED_PORT),
      DEFAULT_APP_PORT: String(ISOLATED_PORT)
    },
    stdio: 'pipe'
  });

  child.stderr.on('data', (data) => {
    console.error(`[Child stderr] ${data}`);
  });

  // Attendre le démarrage du serveur
  let serverReady = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await getHttp(`${BASE_URL}/health`);
      if (res.statusCode === 200) {
        serverReady = true;
        break;
      }
    } catch {
      // Attente active
    }
  }

  if (!serverReady) {
    child.kill();
    throw new Error('Le serveur dist/server.js n\'a pas répondu dans le délai imparti sur le port 3333');
  }

  try {
    // 1. /health
    const health = await getHttp(`${BASE_URL}/health`);
    if (health.statusCode !== 200 || !health.body.includes('healthy')) {
      throw new Error(`Échec /health sur dist/server.js : code ${health.statusCode}`);
    }
    console.log('[PASS] /health -> 200 JSON');

    // 2. / (Accueil)
    const home = await getHttp(`${BASE_URL}/`);
    if (home.statusCode !== 200 || !home.body.includes('id="root"')) {
      throw new Error(`Échec / sur dist/server.js : code ${home.statusCode}`);
    }
    console.log('[PASS] / -> 200 HTML');

    // 3. Fichier JS compilé réel
    const jsRes = await getHttp(`${BASE_URL}/assets/${jsFile}`);
    const jsType = jsRes.headers['content-type'] || '';
    if (jsRes.statusCode !== 200 || !jsType.includes('javascript') || jsRes.body.includes('<!DOCTYPE html>')) {
      throw new Error(`Échec JS compilé /assets/${jsFile} (Type: ${jsType}, Code: ${jsRes.statusCode})`);
    }
    console.log(`[PASS] /assets/${jsFile} -> 200 application/javascript (vrai JS, pas de HTML)`);

    // 4. Fichier CSS compilé réel
    const cssRes = await getHttp(`${BASE_URL}/assets/${cssFile}`);
    const cssType = cssRes.headers['content-type'] || '';
    if (cssRes.statusCode !== 200 || !cssType.includes('css') || cssRes.body.includes('<!DOCTYPE html>')) {
      throw new Error(`Échec CSS compilé /assets/${cssFile} (Type: ${cssType}, Code: ${cssRes.statusCode})`);
    }
    console.log(`[PASS] /assets/${cssFile} -> 200 text/css (vrai CSS, pas de HTML)`);

    // 5. Fiche recette valide
    const recipeRes = await getHttp(`${BASE_URL}/recettes/culinaires/huile-infusee-romarin/`);
    if (recipeRes.statusCode !== 200) {
      throw new Error(`Échec recette existante : code ${recipeRes.statusCode}`);
    }
    console.log('[PASS] /recettes/culinaires/huile-infusee-romarin/ -> 200 HTML');

    // 6. Recette inconnue (vrai HTTP 404 en production)
    const notFoundRes = await getHttp(`${BASE_URL}/recettes/culinaires/recette-inexistante-404/`);
    if (notFoundRes.statusCode !== 404) {
      throw new Error(`Échec recette inexistante : attendu 404, reçu ${notFoundRes.statusCode}`);
    }
    console.log('[PASS] /recettes/culinaires/recette-inexistante-404/ -> 404 HTML');

    // 7. Sitemap XML
    const sitemapRes = await getHttp(`${BASE_URL}/sitemap-recettes.xml`);
    const sitemapType = sitemapRes.headers['content-type'] || '';
    if (sitemapRes.statusCode !== 200 || !sitemapType.includes('xml')) {
      throw new Error(`Échec sitemap XML : code ${sitemapRes.statusCode}`);
    }
    console.log('[PASS] /sitemap-recettes.xml -> 200 XML');

    console.log('=== Succès : 7/7 tests du serveur de production dist/server.js validés en isolation ! ===\n');
  } finally {
    // Fermeture propre du serveur de test isolé
    child.kill('SIGTERM');
  }
}

runIsolatedProductionBuildTest().catch((err) => {
  console.error('Erreur critique build de production isolé :', err);
  process.exit(1);
});
