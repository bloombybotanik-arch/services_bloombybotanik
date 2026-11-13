import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBTYEyKqE3pL8FElyt_UkjaaphYjp9-r6Q",
  authDomain: "gen-lang-client-0781708429.firebaseapp.com",
  projectId: "gen-lang-client-0781708429",
  storageBucket: "gen-lang-client-0781708429.firebasestorage.app",
  messagingSenderId: "224466673114",
  appId: "1:224466673114:web:8c843edae8205a6ae034e3",
  firestoreDatabaseId: "ai-studio-bloombybotaniksi-1e04d90f-3878-4981-8138-5c8a14f59353"
};

let appInstance: any;
if (!getApps().length) {
  try {
    appInstance = initializeApp(firebaseConfig);
  } catch (e) {
    console.warn("[Firebase] Init fallback activated:", e);
    appInstance = initializeApp({
      apiKey: "AIzaSyFakeKeyForTestingOnly",
      authDomain: "fake-project.firebaseapp.com",
      projectId: "fake-project",
      storageBucket: "fake-project.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef"
    });
  }
} else {
  appInstance = getApp();
}

export const app = appInstance;

let authInstance: any;
try {
  authInstance = getAuth(app);
} catch (e) {
  console.warn("[Firebase] getAuth fallback:", e);
  authInstance = {
    onAuthStateChanged: (cb: any) => { cb(null); return () => {}; },
    currentUser: null
  } as any;
}
export const auth = authInstance;

let dbInstance: any;
try {
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch (e) {
  try {
    dbInstance = getFirestore(app);
  } catch (err) {
    console.warn("[Firebase] getFirestore fallback:", err);
    dbInstance = {} as any;
  }
}
export const db = dbInstance;

export default firebaseConfig;
