import http from 'http';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const URLs = [
  { path: '/', expectedStatus: [200] },
  { path: '/bloomlab', expectedStatus: [200, 301] },
  { path: '/bloomlab/', expectedStatus: [200] },
  { path: '/boutique/', expectedStatus: [200] },
  { path: '/boutique/pack-signature', expectedStatus: [200, 301] },
  { path: '/boutique/duo-argiles', expectedStatus: [200, 301] },
  { path: '/boutique/seve-fondamentale', expectedStatus: [200, 301] },
  { path: '/boutique/nuit-profonde', expectedStatus: [200, 301] },
  { path: '/boutique/confort-digestif', expectedStatus: [200, 301] },
  { path: '/boutique/feu-articulaire', expectedStatus: [200, 301] },
  { path: '/boutique/bouclier-hiver', expectedStatus: [200, 301] },
  { path: '/boutique/herbier-complet-rentree-2026', expectedStatus: [200, 301] },
  { path: '/herbier/', expectedStatus: [200] },
  { path: '/recettes/', expectedStatus: [200] },
  { path: '/manifeste/', expectedStatus: [200] },
  { path: '/lexique/', expectedStatus: [200] },
  { path: '/lexique', expectedStatus: [200, 301] },
  { path: '/sitemap.xml', expectedStatus: [200] },
  { path: '/robots.txt', expectedStatus: [200] },
  { path: '/feed/google-merchant.xml', expectedStatus: [200] },
];

function checkUrl(entry) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${entry.path}`;
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const isOk = entry.expectedStatus.includes(res.statusCode);
        resolve({
          path: entry.path,
          status: res.statusCode,
          passed: isOk,
          length: data.length
        });
      });
    }).on('error', (err) => {
      resolve({
        path: entry.path,
        status: 'ERROR',
        passed: false,
        error: err.message
      });
    });
  });
}

async function runSmokeTests() {
  console.log(`\n🔍 Lancement des Smoke Tests Bloom by BotaniK sur ${BASE_URL}...\n`);
  let failures = 0;

  for (const entry of URLs) {
    const result = await checkUrl(entry);
    if (result.passed) {
      console.log(`  ✅ [${result.status}] ${result.path} (${result.length} bytes)`);
    } else {
      console.error(`  ❌ [${result.status}] ${result.path} - Attendu: ${entry.expectedStatus.join(', ')}`);
      failures++;
    }
  }

  console.log(`\n========================================`);
  if (failures === 0) {
    console.log(`🎉 Tous les smoke tests ont réussi (${URLs.length}/${URLs.length}) !`);
    process.exit(0);
  } else {
    console.error(`⚠️  ${failures} test(s) échoué(s).`);
    process.exit(1);
  }
}

runSmokeTests();
