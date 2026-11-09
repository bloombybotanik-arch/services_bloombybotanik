import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

export const firebaseConfig = {
  id: rawConfig.id || "1e04d90f-3878-4981-8138-5c8a14f59353",
  name: rawConfig.name || "bloom-by-botanik",
  apiKey: rawConfig.apiKey || "AIzaSyBTYEyKqE3pL8FElyt_UkjaaphYjp9-r6Q",
  authDomain: rawConfig.authDomain || "gen-lang-client-0781708429.firebaseapp.com",
  projectId: rawConfig.projectId || "gen-lang-client-0781708429",
  storageBucket: rawConfig.storageBucket || "gen-lang-client-0781708429.firebasestorage.app",
  messagingSenderId: rawConfig.messagingSenderId || "224466673114",
  appId: rawConfig.appId || "1:224466673114:web:8c843edae8205a6ae034e3",
  measurementId: rawConfig.measurementId || undefined,
  firestoreDatabaseId: rawConfig.firestoreDatabaseId || "ai-studio-bloombybotaniksi-1e04d90f-3878-4981-8138-5c8a14f59353"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export default app;