// Firebase Init (MODULAR SDK)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export-like global object (simple structure for your project)
window.db = db;

window.firebaseAPI = {
    collection,
    getDocs,
    addDoc
};
