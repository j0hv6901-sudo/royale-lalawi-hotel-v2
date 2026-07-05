// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Firestore (Database)
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6HW7VWRiVg0tEF3qbS7oe44Nktpl-H8",
  authDomain: "royale-lalawi-hms.firebaseapp.com",
  projectId: "royale-lalawi-hms",
  storageBucket: "royale-lalawi-hms.appspot.com",
  messagingSenderId: "274804451260",
  appId: "1:274804451260:web:48a374f1a03edf49682db9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make Firebase available globally (important for your current structure)
window.db = db;
window.firebaseAPI = {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
};
