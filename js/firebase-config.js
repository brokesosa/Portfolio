// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

let app;
let analytics;
let db;
let initialized = false;
let initPromise = null;

// Fetch Firebase config from serverless function at runtime
async function fetchFirebaseConfig() {
  const response = await fetch('/api/firebase-config');
  if (!response.ok) {
    throw new Error('Failed to fetch Firebase configuration');
  }
  return response.json();
}

// Initialize Firebase asynchronously
async function initializeFirebase() {
  if (initialized) {
    return { app, analytics, db };
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const firebaseConfig = await fetchFirebaseConfig();

    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    initialized = true;

    return { app, analytics, db };
  })();

  return initPromise;
}

// Export a promise that resolves to the Firebase instances
export const firebaseReady = initializeFirebase();

// Export getters that wait for initialization
export async function getApp() {
  await firebaseReady;
  return app;
}

export async function getAnalyticsInstance() {
  await firebaseReady;
  return analytics;
}

export async function getDb() {
  await firebaseReady;
  return db;
}

// Export Firebase functions for convenience
export { collection, addDoc, serverTimestamp };
