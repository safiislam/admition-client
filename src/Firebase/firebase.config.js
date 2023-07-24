// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd9vYhjlmzAsybBHuykIncbhf1qsK53O4",
  authDomain: "admission-school-36dca.firebaseapp.com",
  projectId: "admission-school-36dca",
  storageBucket: "admission-school-36dca.appspot.com",
  messagingSenderId: "635407288834",
  appId: "1:635407288834:web:2053f82924cce9c03af51b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app