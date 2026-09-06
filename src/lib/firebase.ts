import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-bloomlab.firebaseapp.com",
  projectId: "demo-bloomlab",
  storageBucket: "demo-bloomlab.appspot.com",
  messagingSenderId: "000000000",
  appId: "1:000000000:web:000000000"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
