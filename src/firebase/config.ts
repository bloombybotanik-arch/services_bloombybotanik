import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

export const firebaseConfig = {
  id: "1e04d90f-3878-4981-8138-5c8a14f59353",
  name: "bloom-by-botanik",
  apiKey: rawConfig.apiKey || "",
  authDomain: rawConfig.authDomain || "",
  projectId: rawConfig.projectId || "",
  storageBucket: rawConfig.storageBucket || "",
  messagingSenderId: rawConfig.messagingSenderId || "",
  appId: rawConfig.appId || "",
  measurementId: rawConfig.measurementId || undefined,
  firestoreDatabaseId: rawConfig.firestoreDatabaseId || "ai-studio-bloombybotaniksi-1e04d90f-3878-4981-8138-5c8a14f59353"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export default firebaseConfig;
