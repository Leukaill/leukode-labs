import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCbk9e4xJiJ5N0B_FonY-siDmhjb_HicQ8",
  authDomain: "leukail-tech.firebaseapp.com",
  projectId: "leukail-tech",
  storageBucket: "leukail-tech.firebasestorage.app",
  messagingSenderId: "729284346183",
  appId: "1:729284346183:web:00ba50c67d5a982650cc62",
  measurementId: "G-P9CB0FR0X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Development emulator setup (uncomment for local development)
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth, 'http://localhost:9099');
//     connectStorageEmulator(storage, 'localhost', 9199);
//   } catch (error) {
//     console.log('Firebase emulators already connected');
//   }
// }

export default app;