import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeb3WfksO160bq48potmNhDj1JUB7OgDk",
  authDomain: "codesnippet-659a8.firebaseapp.com",
  projectId: "codesnippet-659a8",
  storageBucket: "codesnippet-659a8.firebasestorage.app",
  messagingSenderId: "988668311938",
  appId: "1:988668311938:web:89bae1214943f954e8379b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      
export const db = getFirestore(app);    