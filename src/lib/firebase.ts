import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const isDevelopment = import.meta.env.DEV;

// Default development configuration
const devConfig = {
  apiKey: "AIzaSyDevelopmentKeyForTesting123",
  authDomain: "demo-crm-dev.firebaseapp.com",
  projectId: "demo-crm-dev",
  storageBucket: "demo-crm-dev.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Production configuration from environment variables
const prodConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Use development config in development, production config in production
const firebaseConfig = isDevelopment ? devConfig : prodConfig;

let app;
let db;
let auth;

try {
  if (!isDevelopment) {
    // Validate environment variables in production
    const missingVars = Object.entries(prodConfig)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing Firebase configuration variables: ${missingVars.join(', ')}`
      );
    }
  }

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

  console.log(`Firebase initialized in ${isDevelopment ? 'development' : 'production'} mode`);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

export { db, auth };