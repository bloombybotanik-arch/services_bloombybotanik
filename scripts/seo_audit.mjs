import fetch from 'node-fetch';
import fs from 'fs';

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/bloomlab',
  'http://localhost:3000/boutique',
  'http://localhost:3000/infuseur-botanique',
  'http://localhost:3000/manifeste',
  'http://localhost:3000/phytotherapie-reset',
  'http://localhost:3000/bibliotheque',
  'http://localhost:3000/cosmetiques',
  'http://localhost:3000/culinaire',
  'http://localhost:3000/herbier',
  'http://localhost:3000/legal',
  'http://localhost:3000/blog',
  'http://localhost:3000/boutique/kit-starter',
  'http://localhost:3000/boutique/pack-signature'
];

async function audit() {
  const results = [['URL', 'Statut HTTP', 'URL finale', 'Robots Meta', 'X-Robots-Tag', 'Canonical', 'Indexable', 'Anomalie']];

  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const status = res.status;
      const finalUrl = res.url;
      const xRobots = res.headers.get('x-robots-tag') || 'N/A';
      
      const text = await res.text();
      const robotsMatch = text.match(/<meta name="robots" content="([^"]+)"/i);
      const robotsMeta = robotsMatch ? robotsMatch[1] : 'N/A';
      
      const canonicalMatch = text.match(/<link rel="canonical" href="([^"]+)"/i);
      const canonical = canonicalMatch ? canonicalMatch[1] : 'N/A';
      
      const isIndexable = !robotsMeta.includes('noindex') && !xRobots.includes('noindex') && status === 200;
      
      let anomaly = '';
      if (status !== 200) anomaly += `Status ${status}. `;
      if (url !== finalUrl && status === 200) anomaly += `Redirected to ${finalUrl}. `;
      if (canonical !== 'N/A' && canonical !== finalUrl) anomaly += `Canonical mismatch: ${canonical}. `;

      results.push([url, status.toString(), finalUrl, robotsMeta, xRobots, canonical, isIndexable ? 'Oui' : 'Non', anomaly]);
    } catch (e) {
      results.push([url, 'Error', 'N/A', 'N/A', 'N/A', 'N/A', 'Non', e.message]);
    }
  }

  const csv = results.map(row => row.join(',')).join('\n');
  fs.writeFileSync('seo_audit_results.csv', csv);
  console.log('Audit completed. Results saved to seo_audit_results.csv');
}

audit();
