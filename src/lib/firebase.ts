import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

export const firebaseConfig = {
  id: rawConfig?.id || "1e04d90f-3878-4981-8138-5c8a14f59353",
  name: rawConfig?.name || "bloom-by-botanik",
  apiKey: rawConfig?.apiKey || "AIzaSyBTYEyKqE3pL8FElyt_UkjaaphYjp9-r6Q",
  authDomain: rawConfig?.authDomain || "gen-lang-client-0781708429.firebaseapp.com",
  projectId: rawConfig?.projectId || "gen-lang-client-0781708429",
  storageBucket: rawConfig?.storageBucket || "gen-lang-client-0781708429.firebasestorage.app",
  messagingSenderId: rawConfig?.messagingSenderId || "224466673114",
  appId: rawConfig?.appId || "1:224466673114:web:8c843edae8205a6ae034e3",
  measurementId: rawConfig?.measurementId || undefined,
  firestoreDatabaseId: rawConfig?.firestoreDatabaseId || "ai-studio-bloombybotaniksi-1e04d90f-3878-4981-8138-5c8a14f59353"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  const existingApps = getApps();
  app = existingApps.length === 0 ? initializeApp(firebaseConfig) : existingApps[0];
} catch (error) {
  console.warn("[Firebase Init Fallback]", error);
  const fallbackConfig = {
    id: "fallback-id",
    name: "fallback-app",
    apiKey: "AIzaSyDummyFallbackKeyForDev00000000000000",
    authDomain: "demo-fallback.firebaseapp.com",
    projectId: "demo-fallback",
    storageBucket: "demo-fallback.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000000000"
  };
  try {
    const existingApps = getApps();
    app = existingApps.length === 0 ? initializeApp(fallbackConfig, "fallback") : existingApps[0];
  } catch (fallbackError) {
    console.warn("[Firebase Fallback App Disabled]", fallbackError);
    app = {} as FirebaseApp;
  }
}

try {
  auth = getAuth(app);
} catch (error) {
  console.warn("[Firebase Auth Fallback]", error);
  auth = {
    onAuthStateChanged: (cb: any) => {
      if (typeof cb === 'function') cb(null);
      return () => {};
    },
    currentUser: null
  } as unknown as Auth;
}

try {
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch (error) {
  try {
    db = getFirestore(app);
  } catch (err) {
    console.warn("[Firebase Firestore Fallback]", err);
    db = {} as Firestore;
  }
}

export { app, auth, db };
export default app;