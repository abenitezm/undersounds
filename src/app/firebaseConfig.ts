// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzmNsBMGv0qi8UqUuev4FlnaycU5lj-nk",
  authDomain: "undersounds-cd613.firebaseapp.com",
  projectId: "undersounds-cd613",
  storageBucket: "undersounds-cd613.firebasestorage.app",
  messagingSenderId: "630912171869",
  appId: "1:630912171869:web:30440f07d30eff9ae232b4",
  measurementId: "G-XN673S4VT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);