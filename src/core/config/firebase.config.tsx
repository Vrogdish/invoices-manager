
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { get } from "http";


const firebaseConfig = {
  apiKey: "AIzaSyDMj1iCvTwQJn8SIWHdz3tNqA7vHjaXKSs",
  authDomain: "invoices-manager-f3507.firebaseapp.com",
  projectId: "invoices-manager-f3507",
  storageBucket: "invoices-manager-f3507.appspot.com",
  messagingSenderId: "363155152062",
  appId: "1:363155152062:web:fba421503e48311a3b92ef"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

