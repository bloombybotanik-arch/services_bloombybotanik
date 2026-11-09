/**
 * Script de publication automatique vers WordPress via REST API
 */
import fetch from 'node-fetch';

async function publishToWordPress() {
  const WP_URL = 'https://blog.bloombybotanik.com/wp-json/wp/v2/posts';
  const WP_USER = process.env.WP_USERNAME;
  const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('Erreur : Identifiants WordPress manquants (WP_USERNAME, WP_APP_PASSWORD)');
    process.exit(1);
  }

  // Ces données devraient normalement être générées par un script IA amont
  const postData = {
    title: process.env.POST_TITLE || 'Nouvel article généré',
    content: process.env.POST_CONTENT || '<p>Contenu généré automatiquement.</p>',
    status: 'publish', // ou 'draft' pour relecture
    categories: [1], // ID de la catégorie par défaut
    tags: [],
    format: 'standard'
  };

  const auth = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

  console.log(`Tentative de publication sur : ${WP_URL}`);
  console.log(`Sujet : ${postData.title}`);

  try {
    const response = await fetch(WP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Article publié avec succès !');
      console.log(`🔗 URL : ${result.link}`);
      console.log(`🆔 ID : ${result.id}`);
    } else {
      console.error('❌ Échec de la publication WordPress');
      console.error(result);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur réseau lors de la publication :', error);
    process.exit(1);
  }
}

publishToWordPress();
