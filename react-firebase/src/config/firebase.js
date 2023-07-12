// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDJ1oIRT42zIT3Kihr9CPqQ4cjyQun19vw",
    authDomain: "fir-tutorial-8466d.firebaseapp.com",
    projectId: "fir-tutorial-8466d",
    storageBucket: "fir-tutorial-8466d.appspot.com",
    messagingSenderId: "859815339633",
    appId: "1:859815339633:web:7f02b5956418c0d8bf5dd0",
    measurementId: "G-H301Y6TSEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);