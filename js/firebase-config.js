// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Helper to safely get environment variables
// Works with both Vite build-time injection and runtime window config
function getEnvVar(key) {
  // First try Vite's import.meta.env (available when bundled with Vite)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {
    // import.meta.env not available
  }

  // Fallback to window.__FIREBASE_CONFIG__ for runtime injection
  if (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__ && window.__FIREBASE_CONFIG__[key]) {
    return window.__FIREBASE_CONFIG__[key];
  }

  return undefined;
}

const firebaseConfig = {
  apiKey: getEnvVar('VITE_API_KEY'),
  authDomain: getEnvVar('VITE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_APP_ID'),
  measurementId: getEnvVar('VITE_MEASUREMENT_ID')
};

// Validate that required config values are present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error(
    `Firebase configuration error: Missing required fields: ${missingFields.join(', ')}.\n` +
    `Please ensure the following environment variables are set:\n` +
    `- VITE_API_KEY\n` +
    `- VITE_AUTH_DOMAIN\n` +
    `- VITE_PROJECT_ID\n` +
    `- VITE_APP_ID\n` +
    `You can set these in Netlify via Project configuration > Environment variables.`
  );
}

// Initialize Firebase only if config is valid
let app = null;
let analytics = null;
let db = null;

if (missingFields.length === 0) {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  db = getFirestore(app);
} else {
  console.warn('Firebase not initialized due to missing configuration.');
}

export { app, analytics, db };

// Exporte les fonctions Firebase dont tu as besoin
export { collection, addDoc, serverTimestamp };