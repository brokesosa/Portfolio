// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Configuration pour Netlify (variables d'environnement + fallback)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || 
          process.env.VITE_API_KEY || 
          "AIzaSyC6Kq4z8uHPubFZWXkf252GB8_4_LdNchI",
  
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || 
              process.env.VITE_AUTH_DOMAIN || 
              "meolang-32686.firebaseapp.com",
  
  projectId: import.meta.env.VITE_PROJECT_ID || 
             process.env.VITE_PROJECT_ID || 
             "meolang-32686",
  
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 
                 process.env.VITE_STORAGE_BUCKET || 
                 "meolang-32686.firebasestorage.app",
  
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || 
                     process.env.VITE_MESSAGING_SENDER_ID || 
                     "272809274306",
  
  appId: import.meta.env.VITE_APP_ID || 
         process.env.VITE_APP_ID || 
         "1:272809274306:web:40f0fa2f9c3a724b4c845b",
  
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || 
                 process.env.VITE_MEASUREMENT_ID || 
                 "G-EYEXM2BFW5"
};

// Debug: Vérifie si les variables sont chargées
console.log("Env vars:", import.meta.env);
console.log("Process env:", process.env);
console.log("Project ID:", firebaseConfig.projectId);

// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  
  console.log("✅ Firebase initialisé avec succès!");
  
  export { app, analytics, db, collection, addDoc, serverTimestamp };
} catch (error) {
  console.error("❌ Erreur Firebase:", error);
  throw error;
}