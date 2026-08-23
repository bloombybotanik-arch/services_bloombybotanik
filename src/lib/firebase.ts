import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Note: In Vite, we can import JSON files directly
import firebaseConfig from '../../firebase-applet-config.json';

// Detect bot/prerender to avoid Firebase Auth domain errors during indexing
const isBot = typeof window !== 'undefined' && (
  /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent) ||
  navigator.webdriver ||
  window.location.search.includes('prerender=true')
);

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// For SEO: ensure we don't block indexing if Firebase fails or is unauthorized
if (isBot) {
  // Disable persistence for bots to avoid some IndexedDB errors in headless environments
  auth.setPersistence({ type: 'NONE' }).catch(() => {});
}
