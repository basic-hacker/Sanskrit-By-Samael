// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCuhvEMYDWytuPbL0FW_5bLDQIg-KO3bI",
    authDomain: "blog-website-3b584.firebaseapp.com",
    projectId: "blog-website-3b584",
    storageBucket: "blog-website-3b584.firebasestorage.app",
    messagingSenderId: "602129092149",
    appId: "1:602129092149:web:0fe385633e59dafd59ab7c",
    measurementId: "G-37H7L2E91N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to HTML elements
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDisplay = document.getElementById('user-info');
const guestModeBtn = document.getElementById('guest-mode-btn'); // Optional Guest Button

// Google Sign-In Functionality
googleLoginBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // Display user info
            userInfoDisplay.innerHTML = `
                <p>Welcome, ${user.displayName}!</p>
                <img src="${user.photoURL}" alt="User Photo" width="50" height="50">
            `;
            googleLoginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        })
        .catch((error) => {
            console.error('Error during sign-in:', error.message);
            alert('Login failed: ' + error.message);
        });
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            userInfoDisplay.innerHTML = `<p>You are logged out.</p>`;
            googleLoginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error during logout:', error.message);
            alert('Logout failed: ' + error.message);
        });
});

// Optional: Handle Guest Mode
guestModeBtn?.addEventListener('click', () => {
    userInfoDisplay.innerHTML = `<p>Browsing as Guest.</p>`;
    googleLoginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
});

// Persist Login State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        userInfoDisplay.innerHTML = `
            <p>Welcome back, ${user.displayName}!</p>
            <img src="${user.photoURL}" alt="User Photo" width="50" height="50">
        `;
        googleLoginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        // User is not logged in
        userInfoDisplay.innerHTML = `<p>You are not logged in.</p>`;
        googleLoginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
});
