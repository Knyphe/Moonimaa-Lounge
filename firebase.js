// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo6FWLaQunAMZ8WIiw6EeCCf1Nbcqjxso",
  authDomain: "moonimalounge.firebaseapp.com",
  projectId: "moonimalounge",
  storageBucket: "moonimalounge.firebasestorage.app",
  messagingSenderId: "146754118519",
  appId: "1:146754118519:web:927fdf48b49995e3abb772",
  measurementId: "G-0KHBK9KTK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;