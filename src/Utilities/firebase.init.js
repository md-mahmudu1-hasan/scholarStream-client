// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJG5_CmiCaDBvnvsk3Bagn-4ehHc-jTIQ",
  authDomain: "scoller-auth.firebaseapp.com",
  projectId: "scoller-auth",
  storageBucket: "scoller-auth.firebasestorage.app",
  messagingSenderId: "75624304854",
  appId: "1:75624304854:web:799927b4e1fa50dee47977"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);