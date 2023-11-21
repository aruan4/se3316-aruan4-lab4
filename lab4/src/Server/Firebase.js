// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1iggIQhfsllbNHIK0Zf44aVwWQDHm3Iw",
  authDomain: "se3316-aruan4-lab4.firebaseapp.com",
  projectId: "se3316-aruan4-lab4",
  storageBucket: "se3316-aruan4-lab4.appspot.com",
  messagingSenderId: "297630781353",
  appId: "1:297630781353:web:0c43c277fda27d2d1dfeb8",
  measurementId: "G-YM4TR39SGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
// Collection refrences
const supInfo = collection(db,'superhero_info');
const supPowers = collection(db, 'superhero_powers');
// Get collection data
getDocs(colRef)

export default app;