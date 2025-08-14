// firebase credentials :)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlLCV6rg7aP62PJA4exkc8RUpgQ3mABZY",
    authDomain: "hustlee-01.firebaseapp.com",
    projectId: "hustlee-01",
    storageBucket: "hustlee-01.firebasestorage.app",
    messagingSenderId: "1012219550298",
    appId: "1:1012219550298:web:27d9e52a74374535d05663",
    measurementId: "G-N57FBBZK8J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
