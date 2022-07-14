import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAlCSARqmH0d0MdPoM4v5pLQiwXLPQriNw",
  authDomain: "system-vacaciones-f2a1c.firebaseapp.com",
  databaseURL: "https://system-vacaciones-f2a1c-default-rtdb.firebaseio.com",
  projectId: "system-vacaciones-f2a1c",
  storageBucket: "system-vacaciones-f2a1c.appspot.com",
  messagingSenderId: "1041965215826",
  appId: "1:1041965215826:web:0476fd052e0d95e5f9af8b",
  measurementId: "G-0LGLJ3F96V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 