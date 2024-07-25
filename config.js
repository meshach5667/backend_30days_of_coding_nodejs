// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWSd9VXgCpaT4_XtTnnoznVllp9beueiE",
  authDomain: "authentication-51e63.firebaseapp.com",
  projectId: "authentication-51e63",
  storageBucket: "authentication-51e63.appspot.com",
  messagingSenderId: "1061937292496",
  appId: "1:1061937292496:web:fcca7c53e8d3d8ca11ead5",
  measurementId: "G-7ES2WP8QJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);