// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais reais
const firebaseConfig = {
  apiKey: "AIzaSyDmZQZLPNyst79a5SK2evxdYEpomSQHJKU",
  authDomain: "meu-perfume-e28d8.firebaseapp.com",
  projectId: "meu-perfume-e28d8",
  storageBucket: "meu-perfume-e28d8.appspot.com",
  messagingSenderId: "653123872657",
  appId: "1:653123872657:web:df5f784092d0d1f326dc30",
  measurementId: "G-L21T1LNLQW",
};

// Evita erro de re-inicialização
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
