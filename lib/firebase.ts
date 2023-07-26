// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bora-churrasco.firebaseapp.com",
  projectId: "bora-churrasco",
  storageBucket: "bora-churrasco.appspot.com",
  messagingSenderId: "692979667177",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-3DLL7GKQ7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);