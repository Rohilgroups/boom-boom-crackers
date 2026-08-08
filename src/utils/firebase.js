import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF7m_vxF0aKZVegCQTrjPEVqyVAKKInAY",
  authDomain: "boom-boom-8e2a9.firebaseapp.com",
  projectId: "boom-boom-8e2a9",
  storageBucket: "boom-boom-8e2a9.firebasestorage.app",
  messagingSenderId: "279150072807",
  appId: "1:279150072807:web:d2020d4c1c006779712342",
  measurementId: "G-ZPH0XHEF7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
