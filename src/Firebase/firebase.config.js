// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpo9Ep9NCAYU3pKU5wTcxSzkhxuIdvgaQ",
  authDomain: "admition-project.firebaseapp.com",
  projectId: "admition-project",
  storageBucket: "admition-project.appspot.com",
  messagingSenderId: "1098849416948",
  appId: "1:1098849416948:web:31f01e1cf22d6a15b610a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app