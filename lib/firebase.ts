import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bora-churrasco.firebaseapp.com",
  projectId: "bora-churrasco",
  storageBucket: "bora-churrasco.appspot.com",
  messagingSenderId: "692979667177",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-3DLL7GKQ7W"
};

const app = initializeApp(firebaseConfig);
let analytics = null;

isSupported().then((result) => {
  if (result) {
      analytics = getAnalytics(app);
  }
})

export const storage = getStorage(app);
export const db = getFirestore(app);


