// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7x1RHZa51-hJTeQk7yGiCFilsa495OaE",
  authDomain: "customer-count-cdb7c.firebaseapp.com",
  projectId: "customer-count-cdb7c",
  storageBucket: "customer-count-cdb7c.appspot.com",
  messagingSenderId: "755125360809",
  appId: "1:755125360809:web:43cd6cf5f2adf2d0e3b1b8",
  measurementId: "G-VPP3M4GTX8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
