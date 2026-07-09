// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSH1HUsE50pWUjmNc2coe5e8z7njt_NsQ",
    authDomain: "makwacha-accounting-app.firebaseapp.com",
    projectId: "makwacha-accounting-app",
    storageBucket: "makwacha-accounting-app.firebasestorage.app",
    messagingSenderId: "463625191206",
    appId: "1:463625191206:web:58fe07598446aa098a0be7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };